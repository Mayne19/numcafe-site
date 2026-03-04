import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { XLogo } from "./XLogo";
import logoImage from "figma:asset/e92cbdb68eadb4d48e29e75a1cbdf01da561a426.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-white via-[#FFF8F0] to-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <a href="/" className="flex items-center group py-2" onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}>
              <img src={logoImage} alt="Numcafé" className="h-16 w-auto hover:opacity-80 transition-opacity" />
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}
                className={`transition-colors ${
                  isActive("/") ? "text-[#C69C6D]" : "text-[#1D1D1D] hover:text-[#C69C6D]"
                }`}
              >
                Accueil
              </a>
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/blog';
                }}
                className={`transition-colors ${
                  isActive("/blog") ? "text-[#C69C6D]" : "text-[#1D1D1D] hover:text-[#C69C6D]"
                }`}
              >
                Blog
              </a>
              <a
                href="/a-propos"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/a-propos';
                }}
                className={`transition-colors ${
                  isActive("/a-propos") ? "text-[#C69C6D]" : "text-[#1D1D1D] hover:text-[#C69C6D]"
                }`}
              >
                À propos
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}
                className={`px-6 py-3 rounded-xl transition-all shadow-md ${
                  isActive("/contact")
                    ? "bg-[#C69C6D] text-white shadow-[#C69C6D]/30"
                    : "bg-[#1D1D1D] text-white hover:bg-[#C69C6D] shadow-[#1D1D1D]/20 hover:shadow-[#C69C6D]/30"
                }`}
              >
                Contact
              </a>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-[#1D1D1D] hover:text-[#C69C6D] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-100 bg-gradient-to-br from-white via-[#FFF8F0] to-white overflow-hidden"
            >
              <nav className="px-4 py-6 space-y-4">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/';
                  }}
                  className={`block py-2.5 px-4 rounded-lg transition-colors ${
                    isActive("/") 
                      ? "bg-[#C69C6D] text-white" 
                      : "text-[#1D1D1D] hover:bg-[#FFF8F0]"
                  }`}
                >
                  Accueil
                </a>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/blog';
                  }}
                  className={`block py-2.5 px-4 rounded-lg transition-colors ${
                    isActive("/blog") 
                      ? "bg-[#C69C6D] text-white" 
                      : "text-[#1D1D1D] hover:bg-[#FFF8F0]"
                  }`}
                >
                  Blog
                </a>
                <a
                  href="/a-propos"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/a-propos';
                  }}
                  className={`block py-2.5 px-4 rounded-lg transition-colors ${
                    isActive("/a-propos") 
                      ? "bg-[#C69C6D] text-white" 
                      : "text-[#1D1D1D] hover:bg-[#FFF8F0]"
                  }`}
                >
                  À propos
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/contact';
                  }}
                  className="block py-2.5 px-4 bg-[#C69C6D] text-white text-center rounded-lg hover:bg-[#B88C5D] transition-colors"
                >
                  Contact
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1D1D1D] text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Logo & Description - Gauche */}
            <div className="lg:max-w-md">
              <a href="/" className="flex items-center mb-6 w-fit" onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}>
                <img src={logoImage} alt="Numcafé" className="h-12 sm:h-16 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <p className="text-gray-400 text-xs sm:text-sm">
                Votre média digital pour rester informé sur l'actualité numérique, 
                l'intelligence artificielle et les tendances technologiques.
              </p>
            </div>

            {/* Navigation, Catégories, Contact - Droite avec espaces réduits */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              {/* Navigation principale */}
              <div>
                <h3 className="font-semibold mb-4 text-xs sm:text-sm" style={{ color: '#C69C6D' }}>Navigation</h3>
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

              {/* Catégories (vraies pages services) */}
              <div>
                <h3 className="font-semibold mb-4 text-xs sm:text-sm" style={{ color: '#C69C6D' }}>Catégories</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <a href="/intelligence-artificielle" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/intelligence-artificielle';
                    }}>
                      Intelligence Artificielle
                    </a>
                  </li>
                  <li>
                    <a href="/developpement-web" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/developpement-web';
                    }}>
                      Développement Web
                    </a>
                  </li>
                  <li>
                    <a href="/design-ux" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/design-ux';
                    }}>
                      Design & UX
                    </a>
                  </li>
                  <li>
                    <a href="/seo-referencement" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/seo-referencement';
                    }}>
                      SEO & Référencement
                    </a>
                  </li>
                  <li>
                    <a href="/culture-digitale" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/culture-digitale';
                    }}>
                      Culture Digitale
                    </a>
                  </li>
                  <li>
                    <a href="/productivite-cafe" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/productivite-cafe';
                    }}>
                      Productivité & Café
                    </a>
                  </li>
                  <li>
                    <a href="/reseaux-sociaux" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/reseaux-sociaux';
                    }}>
                      Réseaux sociaux
                    </a>
                  </li>
                  <li>
                    <a href="/ecommerce-marketing" className="text-gray-400 hover:text-[#C69C6D] transition-colors" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/ecommerce-marketing';
                    }}>
                      E-commerce & Marketing Digital
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact email + Réseaux sociaux */}
              <div>
                <h3 className="font-semibold mb-4 text-xs sm:text-sm" style={{ color: '#C69C6D' }}>Contact</h3>
                <a href="mailto:contact@numcafe.fr" className="text-gray-400 hover:text-[#C69C6D] transition-colors text-xs sm:text-sm block mb-6">
                  contact@numcafe.fr
                </a>
                
                {/* Icônes réseaux sociaux - horizontales */}
                <div className="flex items-center gap-3">
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                    <Instagram className="w-5 h-5 text-[#C69C6D]" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="X (Twitter)">
                    <XLogo className="w-5 h-5 text-[#C69C6D]" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                    <Facebook className="w-5 h-5 text-[#C69C6D]" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5 text-[#C69C6D]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-[12px]">&copy; {new Date().getFullYear()} Numcafé. Tous droits réservés.</p>
              <div className="flex gap-6 text-sm">
                <a href="/mentions-legales" className="text-gray-400 hover:text-[#C69C6D] transition-colors">
                  Mentions légales
                </a>
                <a href="/politique-de-confidentialite" className="text-gray-400 hover:text-[#C69C6D] transition-colors">
                  Politique de confidentialité
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}