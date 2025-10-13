'use client';

import React, { useState } from 'react';

interface ExtractionParametersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (params: {
    documentNumber: string;
    bankCode: string;
    accountNumber: string;
  }) => Promise<void>;
  title?: string;
  description?: string;
}

export default function ExtractionParametersModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Paramètres d'extraction",
  description = "Veuillez fournir les informations suivantes pour le traitement de votre relevé bancaire :"
}: ExtractionParametersModalProps) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extractionError, setExtractionError] = useState<string>('');

  const resetForm = () => {
    setDocumentNumber('');
    setBankCode('');
    setAccountNumber('');
    setErrors({});
    setIsSubmitting(false);
    setExtractionError('');
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!documentNumber.trim()) {
      newErrors.documentNumber = 'Le numéro de document est requis';
    }
    
    if (!bankCode.trim()) {
      newErrors.bankCode = 'Le code banque est requis';
    }
    
    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Le numéro de compte est requis';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors({});
    setExtractionError('');
    setIsSubmitting(true);

    try {
      // Submit the form
      await onSubmit({
        documentNumber: documentNumber.trim(),
        bankCode: bankCode.trim(),
        accountNumber: accountNumber.trim()
      });

      // If we get here, the extraction was successful
      resetForm();
    } catch (error: any) {
      // Handle extraction errors
      let errorMessage = 'Une erreur est survenue lors de l\'extraction';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error) {
        errorMessage = error.error;
      }
      
      setExtractionError(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Extraction Error Alert */}
          {extractionError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800 mb-1">Erreur d'extraction</h3>
                  <p className="text-sm text-red-700">{extractionError}</p>
                  <div className="mt-2">
                    <p className="text-xs text-red-600">
                      Conseils : Vérifiez que le PDF contient du texte lisible et des données de transactions bancaires clairement formatées.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isSubmitting && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <svg className="animate-spin w-5 h-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-800">Extraction en cours...</p>
                  <p className="text-xs text-blue-600">Traitement de votre document, veuillez patienter.</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Document Number */}
            <div>
              <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de document
              </label>
              <input
                type="text"
                id="documentNumber"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.documentNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Entrez le numéro de document"
              />
              {errors.documentNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.documentNumber}</p>
              )}
            </div>

            {/* Bank Code */}
            <div>
              <label htmlFor="bankCode" className="block text-sm font-medium text-gray-700 mb-2">
                Code banque
              </label>
              <input
                type="text"
                id="bankCode"
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.bankCode ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Entrez le code banque"
              />
              {errors.bankCode && (
                <p className="text-red-600 text-sm mt-1">{errors.bankCode}</p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de compte
              </label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.accountNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Entrez le numéro de compte"
              />
              {errors.accountNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.accountNumber}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement...
                  </>
                ) : (
                  'Continuer'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
