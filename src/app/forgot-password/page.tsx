'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '../../lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    const response = await apiClient.forgotPassword(email);

    if (response.status >= 200 && response.status < 300) {
      setEmailSent(true);
      setMessage('Un email de réinitialisation a été envoyé à votre adresse email.');
    } else {
      setError(response.error || 'Une erreur est survenue lors de l\'envoi de l\'email.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-2xl rounded-2xl p-10 space-y-6 border border-gray-100">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg">
                <span className="text-white font-bold text-2xl transform -rotate-12">X</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                Speed<span className="text-red-500">X</span>
              </h1>
            </Link>
            
            <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-6 6c-1.2 0-2.28-.3-3.24-.84L7.5 17.5A2.5 2.5 0 015 20a2.5 2.5 0 01-2.5-2.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 .28-.05.54-.14.78l2.26-2.26C9.7 15.72 10 14.6 10 13.4c0-3.31 2.69-6 6-6s6 2.69 6 6z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Mot de passe oublié ?</h2>
            <p className="text-gray-600 text-base">
              {emailSent 
                ? "Vérifiez votre boîte de réception 📧" 
                : "Pas de souci ! Entrez votre email pour réinitialiser"
              }
            </p>
          </div>

          {emailSent ? (
            /* Success State */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Email envoyé ! ✅</h3>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  Nous avons envoyé un lien de réinitialisation à
                </p>
                <p className="text-red-500 font-bold text-lg mb-4">{email}</p>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-gray-700">
                  <p className="font-medium mb-1">💡 Conseil :</p>
                  <p>Si vous ne recevez pas l'email dans quelques minutes, vérifiez votre dossier <strong>spam</strong> ou <strong>courrier indésirable</strong>.</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail('');
                    setMessage('');
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Envoyer à une autre adresse
                </button>
                
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full text-center bg-gray-100 text-gray-800 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all font-bold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour à la connexion
                </Link>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 font-medium"
                    placeholder="votre.email@exemple.com"
                    disabled={isLoading}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Entrez l'adresse email associée à votre compte SpeedX
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {message && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" viewBox="0 0 24 24"></svg>
                    Envoi en cours...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    Envoyer le lien de réinitialisation
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                )}
              </button>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold mb-1">Sécurité garantie</p>
                    <p>Le lien de réinitialisation est valide pendant 1 heure et ne peut être utilisé qu'une seule fois.</p>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Vous vous souvenez de votre mot de passe ?{' '}
              <Link href="/login" className="text-red-500 hover:text-red-600 font-bold transition-colors inline-flex items-center gap-1">
                Se connecter
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}