'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import { apiClient } from '../../lib/api';
import * as XLSX from 'xlsx';

interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  is_superuser: boolean;
}

interface ExcelFile {
  id: string;
  filename: string;
  created_at: string;
  size: number;
  download_url: string;
}

interface ExcelData {
  sheetNames: string[];
  currentSheet: string;
  data: any[][];
  workbook: XLSX.WorkBook | null;
}

export default function ComptablePage() {
  const [user, setUser] = useState<User | null>(null);
  const [excelFiles, setExcelFiles] = useState<ExcelFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'files' | 'viewer'>('files');
  const [excelData, setExcelData] = useState<ExcelData>({
    sheetNames: [],
    currentSheet: '',
    data: [],
    workbook: null
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
    fetchExcelFiles();
  }, []);

  const fetchUserProfile = async () => {
    const response = await apiClient.getUserProfile();
    
    if (response.data) {
      setUser(response.data as User);
    } else if (response.status === 401) {
      router.push('/login');
    } else {
      console.error('Erreur lors de la récupération du profil utilisateur :', response.error);
      router.push('/login');
    }
  };

  const fetchExcelFiles = async () => {
    try {
      setExcelFiles([]);
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers Excel :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (file: ExcelFile) => {
    console.log('Téléchargement du fichier :', file.filename);
    const link = document.createElement('a');
    link.href = file.download_url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteFile = async (fileId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      return;
    }

    try {
      setExcelFiles(excelFiles.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier :', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / (1024 * 1024)) + ' MB';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      readExcelFile(file);
    }
  };

  const readExcelFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        if (workbook.SheetNames.length > 0) {
          const firstSheet = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheet];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          setExcelData({
            sheetNames: workbook.SheetNames,
            currentSheet: firstSheet,
            data: jsonData as any[][],
            workbook
          });
          
          setCurrentView('viewer');
          setErrorMessage('');
          setHasUnsavedChanges(false);
        }
      } catch (error) {
        setErrorMessage('Erreur lors de la lecture du fichier Excel : ' + (error as Error).message);
      }
    };
    
    reader.onerror = () => {
      setErrorMessage('Erreur lors de la lecture du fichier');
    };
    
    reader.readAsArrayBuffer(file);
  };

  const changeSheet = (sheetName: string) => {
    if (excelData.workbook) {
      const worksheet = excelData.workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      setExcelData(prev => ({
        ...prev,
        currentSheet: sheetName,
        data: jsonData as any[][]
      }));
      setHasUnsavedChanges(false);
    }
  };

  const updateCellData = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...excelData.data];
    
    while (newData.length <= rowIndex) {
      newData.push([]);
    }
    
    while (newData[rowIndex].length <= colIndex) {
      newData[rowIndex].push('');
    }
    
    newData[rowIndex][colIndex] = value;
    
    setExcelData(prev => ({
      ...prev,
      data: newData
    }));
    setHasUnsavedChanges(true);
  };

  const saveChanges = () => {
    if (!excelData.workbook || !uploadedFile) return;
    
    try {
      const ws = XLSX.utils.aoa_to_sheet(excelData.data);
      excelData.workbook.Sheets[excelData.currentSheet] = ws;
      
      const wbout = XLSX.write(excelData.workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      
      const originalName = uploadedFile.name.split('.').slice(0, -1).join('.');
      const extension = uploadedFile.name.split('.').pop();
      downloadLink.download = `${originalName}_modifié.${extension}`;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setHasUnsavedChanges(false);
      setErrorMessage('');
      
      setTimeout(() => {
        alert('Fichier sauvegardé avec succès !');
      }, 100);
      
    } catch (error) {
      setErrorMessage('Erreur lors de la sauvegarde : ' + (error as Error).message);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setExcelData({
      sheetNames: [],
      currentSheet: '',
      data: [],
      workbook: null
    });
    setCurrentView('files');
    setHasUnsavedChanges(false);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-3xl transform -rotate-12">X</span>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-3 text-white shadow-xl flex-1 mr-4">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-black mb-2">Interface Comptable </h1>
                  <p className="text-green-50 text-lg">
                    {currentView === 'files' 
                      ? "Gérez et visualisez vos fichiers Excel"
                      : "Éditez votre fichier Excel en temps réel"
                    }
                  </p>
                </div>
              </div>
            </div>
            {currentView === 'viewer' && (
              <button
                onClick={clearFile}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all font-bold flex items-center shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                Retour
              </button>
            )}
          </div>
        </div>

        {currentView === 'files' ? (
          <>
            {/* Section de téléchargement */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl mr-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Télécharger un fichier Excel </h2>
                  <p className="text-base text-gray-600 font-medium">Uploadez votre fichier pour vérification et correction</p>
                </div>
              </div>
              <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-green-400 hover:bg-green-50/30 transition-all duration-300">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="excel-upload"
                />
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <label htmlFor="excel-upload" className="cursor-pointer">
                  <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-black text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                    Choisir un fichier Excel
                  </span>
                </label>
                <p className="text-sm text-gray-500 mt-4 font-medium">
                   Formats supportés : .xlsx, .xls
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Informations du fichier */}
            {uploadedFile && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-green-500 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-green-900 font-black text-lg block">{uploadedFile.name}</span>
                      <span className="text-green-700 text-sm font-medium">{formatFileSize(uploadedFile.size)}</span>
                    </div>
                  </div>
                  <button
                    onClick={clearFile}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition-all font-bold flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Fermer
                  </button>
                </div>
              </div>
            )}

            {/* Sélecteur de feuille */}
            {excelData.sheetNames.length > 1 && (
              <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
                <label className="block text-sm font-black text-gray-700 mb-3">
                   Feuille à afficher :
                </label>
                <select
                  value={excelData.currentSheet}
                  onChange={(e) => changeSheet(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl bg-white min-w-64 focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-gray-900"
                >
                  {excelData.sheetNames.map((sheetName) => (
                    <option key={sheetName} value={sheetName}>
                      {sheetName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Affichage des données Excel */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-5 border-b-2 border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-xl mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900">
                    {excelData.currentSheet}
                  </h3>
                </div>
                <button
                  onClick={saveChanges}
                  disabled={!hasUnsavedChanges}
                  className={`px-6 py-3 rounded-xl text-white font-black transition-all shadow-lg ${
                    hasUnsavedChanges
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-2xl transform hover:scale-105'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                   Sauvegarder
                </button>
              </div>
              
              <div className="overflow-auto max-h-96">
                <ExcelTable
                  data={excelData.data}
                  onCellChange={updateCellData}
                />
              </div>

              {excelData.data.length > 100 && (
                <div className="bg-yellow-50 px-8 py-4 text-center text-yellow-800 text-sm font-bold border-t-2 border-yellow-200">
                  Affichage limité aux 100 premières lignes pour des raisons de performance
                </div>
              )}
            </div>

            {hasUnsavedChanges && (
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-400 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-yellow-900 font-black text-base">
                    Modifications non sauvegardées ! N'oubliez pas de sauvegarder vos changements.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Message d'erreur */}
        {errorMessage && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-xl p-5">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-bold">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

// Composant ExcelTable
interface ExcelTableProps {
  data: any[][];
  onCellChange: (rowIndex: number, colIndex: number, value: string) => void;
}

function ExcelTable({ data, onCellChange }: ExcelTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-16 text-center text-gray-500">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-xl font-black text-gray-900 mb-2">Aucune donnée 📭</p>
        <p className="text-gray-600">Le fichier Excel est vide ou n'a pas pu être lu</p>
      </div>
    );
  }

  const maxCols = Math.max(...data.map(row => row.length));
  const displayData = data.slice(0, 100);

  const handleCellEdit = (rowIndex: number, colIndex: number, value: string) => {
    onCellChange(rowIndex, colIndex, value);
  };

  return (
    <table className="min-w-full border-collapse">
      <thead className="bg-gradient-to-r from-green-50 to-emerald-50 sticky top-0">
        <tr>
          {Array.from({ length: maxCols }, (_, colIndex) => (
            <th
              key={colIndex}
              className="px-4 py-3 text-left text-xs font-black text-gray-700 border-b-2 border-green-200 uppercase tracking-wide"
            >
              {data[0] && data[0][colIndex] ? String(data[0][colIndex]) : `Col ${colIndex + 1}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayData.slice(1).map((row, rowIndex) => (
          <tr
            key={rowIndex + 1}
            className={`${(rowIndex + 1) % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50/30 transition-colors border-b border-gray-100`}
          >
            {Array.from({ length: maxCols }, (_, colIndex) => (
              <td
                key={colIndex}
                className="px-4 py-2 text-gray-700 border-r border-gray-100"
              >
                <input
                  type="text"
                  value={row[colIndex] || ''}
                  onChange={(e) => handleCellEdit(rowIndex + 1, colIndex, e.target.value)}
                  className="w-full border-none bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 px-2 py-1.5 rounded font-medium"
                  onFocus={(e) => e.target.select()}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}