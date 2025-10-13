'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <span className="text-white font-bold text-xl transform -rotate-12">X</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900">
                  Speed<span className="text-red-500">X</span>
                </h1>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Fonctionnalités
              </a>
              <a href="#partenaires" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Partenaires
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Contact
              </a>
              <Link href="/login" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Se connecter
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                  Fonctionnalités
                </a>
                <a href="#partenaires" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                  Partenaires
                </a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                  Contact
                </a>
                <Link href="/login" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold mx-4">
                  Se connecter
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🚀 Vitesse × Précision × Intelligence
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Vos relevés bancaires traités en 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"> quelques secondes</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
                Plus de saisie manuelle. Plus d'erreurs. SpeedX analyse vos documents PDF instantanément 
                et génère des exports Excel prêts à l'emploi. La révolution pour les experts-comptables.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  Essayer gratuitement
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <button className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 group">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Voir la démo
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Sans engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Installation immédiate</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Support 24/7</span>
                </div>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                {/* Main Illustration Container */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 lg:p-10 shadow-2xl border border-orange-100">
                  <div className="relative h-64 sm:h-72 bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                    {/* Animated Progress Bars */}
                    <div className="p-4 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-700">Analyse en cours...</span>
                        <span className="text-red-500 font-bold">98%</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-2000" style={{width: '98%'}}></div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Documents détectés</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Transactions extraites</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                          <span>Génération Excel...</span>
                        </div>
                      </div>

                      <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-red-500">247</div>
                            <div className="text-xs text-gray-500">Lignes</div>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-orange-500">12</div>
                            <div className="text-xs text-gray-500">Pages</div>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-green-500">3s</div>
                            <div className="text-xs text-gray-500">Temps</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Speed Indicators */}
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-br from-red-500 to-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-xl font-bold text-xs sm:text-sm animate-pulse">
                  ⚡ Ultra rapide
                </div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white border-2 border-green-400 text-green-600 px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg font-semibold text-xs sm:text-sm">
                  ✓ 100% précis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2 group-hover:scale-110 transition-transform">15x</div>
              <div className="text-gray-600 font-medium">Plus rapide</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-gray-600 font-medium">Précision</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-gray-600 font-medium">Cabinets</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2 group-hover:scale-110 transition-transform">100k+</div>
              <div className="text-gray-600 font-medium">Documents traités</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trois étapes simples pour transformer vos relevés PDF en données exploitables
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-red-200 transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                1
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center mb-6 mx-auto mt-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Déposez vos PDF</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Glissez-déposez vos relevés bancaires. Tous formats acceptés, traitement illimité.
              </p>
            </div>

            <div className="relative bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-red-200 transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                2
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex items-center justify-center mb-6 mx-auto mt-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">IA ultra-rapide</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Notre moteur analyse et extrait chaque transaction en quelques secondes avec une précision chirurgicale.
              </p>
            </div>

            <div className="relative bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-red-200 transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                3
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center mb-6 mx-auto mt-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Téléchargez Excel</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Récupérez vos fichiers Excel parfaitement formatés, prêts pour votre logiciel comptable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Dites adieu aux tâches répétitives
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                SpeedX libère votre équipe des corvées de saisie pour se concentrer sur l'essentiel : 
                l'analyse et le conseil client.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Économisez des heures chaque semaine</h4>
                    <p className="text-gray-600">Un relevé de 50 pages ? Traité en moins de 30 secondes.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Zéro erreur de saisie</h4>
                    <p className="text-gray-600">Validation automatique et contrôles de cohérence intégrés.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Compatible avec tous les formats</h4>
                    <p className="text-gray-600">Tous types de relevés bancaires supportés, quelle que soit la banque.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Sécurité bancaire</h4>
                    <p className="text-gray-600">Chiffrement de bout en bout et conformité RGPD garantie.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-xl border border-red-100">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <span className="font-bold text-gray-900">Comparaison</span>
                    <span className="text-sm text-gray-500">Temps moyen</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Méthode manuelle</span>
                        <span className="text-sm font-bold text-gray-900">2h 30min</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-400 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-600 flex items-center gap-2">
                          <span className="font-black">SpeedX</span>
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">-95%</span>
                        </span>
                        <span className="text-sm font-bold text-red-600">7min</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse-soft" style={{width: '5%'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                      2h 23min économisées
                    </p>
                    <p className="text-sm text-gray-500 mt-1">par relevé de 50 pages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenariats */}
      <section id="partenaires" className="py-20 bg-gradient-to-br from-orange-50 to-red-50 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Cabinets d'expertise comptable partenaires</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16">
            {/* Cabinet 1 */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-xl border-4 border-orange-200 flex items-center justify-center mb-6 mx-auto hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <span className="text-white font-black text-lg sm:text-xl">FC</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">FIDUCIA CONSEIL</h3>
              <p className="text-xs sm:text-sm text-gray-500">Expert-Comptable</p>
            </div>

            {/* Cabinet 2 */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-xl border-4 border-orange-200 flex items-center justify-center mb-6 mx-auto hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <span className="text-white font-black text-lg sm:text-xl">AC</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">AUDIT & COMPTA</h3>
              <p className="text-xs sm:text-sm text-gray-500">Cabinet d'Expertise</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Et <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-bold">150+ autres cabinets</span> qui nous font confiance
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-500 via-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Prêt à gagner du temps ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Rejoignez les centaines de cabinets comptables qui ont déjà choisi SpeedX pour automatiser leur traitement de relevés.
          </p>
          <Link 
            href="/login"
            className="inline-flex items-center bg-white text-red-600 px-10 py-5 rounded-xl text-lg font-black hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Démarrer maintenant - C'est gratuit
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-white/80 text-sm mt-6">Aucune carte bancaire requise • Configuration en 2 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center transform rotate-12">
                  <span className="text-white font-bold text-xl transform -rotate-12">X</span>
                </div>
                <h3 className="text-3xl font-black">
                  Speed<span className="text-red-500">X</span>
                </h3>
              </div>
              <p className="text-gray-400 text-lg mb-6">
                L'extraction de relevés bancaires à la vitesse de l'éclair
              </p>
              <p className="text-gray-500 text-sm">
                Transformez vos processus comptables avec l'IA la plus avancée du marché.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: <a href="mailto:exaucehounga@yahoo.com" className="hover:text-red-400 transition-colors">contact@speedx.fr</a></p>
                <p>Support: <a href="mailto:exaucehounga@yahoo.com" className="hover:text-red-400 transition-colors">support@speedx.fr</a></p>
                <p>Téléphone: +33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex space-x-6 text-gray-400 mb-4 md:mb-0">
              <a href="#" className="hover:text-red-400 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-red-400 transition-colors">CGU</a>
              <a href="#" className="hover:text-red-400 transition-colors">Mentions légales</a>
            </div>
            <p className="text-gray-500 text-sm">© 2025 SpeedX. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}