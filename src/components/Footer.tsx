import { Facebook, Instagram } from 'lucide-react';
import logoImage from 'figma:asset/e92cbdb68eadb4d48e29e75a1cbdf01da561a426.png';
import xLogo from 'figma:asset/eaa0b96109d22de05aa2748e5c6ee0ab69d34925.png';

export function Footer() {
  return (
    <footer className="bg-[#1D1D1D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <a href="/" className="flex items-center mb-6 w-fit" onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}>
              <img src={logoImage} alt="Numcafé" className="h-12 sm:h-16 w-auto hover:opacity-80 transition-opacity" />
            </a>
            <p className="text-gray-400 max-w-md text-xs sm:text-sm">
              Votre média digital pour rester informé sur l'actualité numérique, 
              l'intelligence artificielle et les tendances technologiques.
            </p>
          </div>

          {/* Navigation principale */}
          <div>
            <h4 className="mb-4 text-xs sm:text-sm" style={{ color: '#C69C6D' }}>Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}>
                  Accueil
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/blog';
                }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="/a-propos" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/a-propos';
                }}>
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Catégories / Sous-pages */}
          <div>
            <h4 className="mb-4 text-xs sm:text-sm" style={{ color: '#C69C6D' }}>Autres liens</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="/categorie/ia-automatisation" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/ia-automatisation';
                }}>
                  IA & Automatisation
                </a>
              </li>
              <li>
                <a href="/categorie/developpement-code" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/developpement-code';
                }}>
                  Développement & Code
                </a>
              </li>
              <li>
                <a href="/categorie/design-creativite" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/design-creativite';
                }}>
                  Design & Créativité
                </a>
              </li>
              <li>
                <a href="/categorie/data-analytics" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/data-analytics';
                }}>
                  Data & Analytics
                </a>
              </li>
              <li>
                <a href="/categorie/marketing-digital" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/marketing-digital';
                }}>
                  Marketing Digital
                </a>
              </li>
              <li>
                <a href="/categorie/ecommerce-business" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/ecommerce-business';
                }}>
                  E-commerce & Business
                </a>
              </li>
              <li>
                <a href="/categorie/cybersecurite" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/cybersecurite';
                }}>
                  Cybersécurité
                </a>
              </li>
              <li>
                <a href="/categorie/productivite-outils" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/categorie/productivite-outils';
                }}>
                  Productivité & Outils
                </a>
              </li>
              <li>
                <a href="/auteurs" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/auteurs';
                }}>
                  Auteurs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact email */}
          <div>
            <h4 className="mb-4 text-xs sm:text-sm" style={{ color: '#C69C6D' }}>Contact</h4>
            <a href="mailto:contact@numcafe.fr" className="text-gray-400 hover:text-[#C69C6D] transition-colors text-xs sm:text-sm">
              contact@numcafe.fr
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-xs">
          <p>© 2025 Numcafé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}