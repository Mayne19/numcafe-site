import { useState, useEffect } from 'react';
import { Coffee, Lock, Mail } from 'lucide-react';
import { login, isAuthenticated } from '../utils/auth';
import logoImage from 'figma:asset/e92cbdb68eadb4d48e29e75a1cbdf01da561a426.png';

export function LoginStudio() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si déjà connecté, rediriger vers le studio
    if (isAuthenticated()) {
      window.location.href = '/studio';
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = login(email, password);
    if (user) {
      window.location.href = '/studio/articles';
    } else {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <img src={logoImage} alt="Numcafé" className="h-16 mx-auto mb-4" />
          </a>
          <h1 className="text-2xl mb-2">Studio Numcafé</h1>
          <p className="text-gray-600 text-sm">
            Connectez-vous pour accéder à l'interface d'administration
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  placeholder="role@numcafe.com"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C69C6D] text-white py-3 rounded-lg hover:bg-[#B88C5D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Coffee className="w-5 h-5" />
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Retour au site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-[#C69C6D] transition-colors"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}