import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/88c228adcadce986f43573b7b3f79ab894398c2f.png';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = (path: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.location.href = path;
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group" onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}>
            <motion.img
              src={logoImage}
              alt="Numcafé"
              className="h-8 sm:h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a 
              href="/" 
              onClick={(e) => handleNavClick('/', e)}
              className={`relative transition-all hover:scale-110 hover:-translate-y-0.5 ${
                isActive('/') ? 'text-[#C69C6D]' : 'text-[#1D1D1D] hover:text-[#C69C6D]'
              }`}
            >
              {t.nav.home}
              {isActive('/') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C69C6D]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
            <a 
              href="/blog" 
              onClick={(e) => handleNavClick('/blog', e)}
              className={`relative transition-all hover:scale-110 hover:-translate-y-0.5 ${
                isActive('/blog') ? 'text-[#C69C6D]' : 'text-[#1D1D1D] hover:text-[#C69C6D]'
              }`}
            >
              {t.nav.blog}
              {isActive('/blog') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C69C6D]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
            <a 
              href="/a-propos" 
              onClick={(e) => handleNavClick('/a-propos', e)}
              className={`relative transition-all hover:scale-110 hover:-translate-y-0.5 ${
                isActive('/a-propos') ? 'text-[#C69C6D]' : 'text-[#1D1D1D] hover:text-[#C69C6D]'
              }`}
            >
              {t.nav.about}
              {isActive('/a-propos') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C69C6D]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/contact" 
                onClick={(e) => handleNavClick('/contact', e)}
                className={`px-4 xl:px-6 py-2 rounded-full transition-all shadow-lg hover:shadow-xl ${
                  isActive('/contact') 
                    ? 'bg-[#C69C6D] text-white shadow-[#C69C6D]/30' 
                    : 'bg-[#1D1D1D] text-white hover:bg-[#C69C6D] shadow-[#1D1D1D]/20 hover:shadow-[#C69C6D]/30'
                }`}
                style={{
                  transform: 'translateZ(0)',
                }}
              >
                {t.nav.contact}
              </a>
            </motion.div>
            
            {/* Language Selector */}
            <LanguageSelector />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#1D1D1D] hover:text-[#C69C6D] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 space-y-3"
          >
            <a 
              href="/" 
              onClick={(e) => handleNavClick('/', e)}
              className={`block py-2 px-4 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-[#C69C6D] text-white' 
                  : 'text-[#1D1D1D] hover:bg-[#FFF8F0] hover:text-[#C69C6D]'
              }`}
            >
              {t.nav.home}
            </a>
            <a 
              href="/blog" 
              onClick={(e) => handleNavClick('/blog', e)}
              className={`block py-2 px-4 rounded-lg transition-all ${
                isActive('/blog') 
                  ? 'bg-[#C69C6D] text-white' 
                  : 'text-[#1D1D1D] hover:bg-[#FFF8F0] hover:text-[#C69C6D]'
              }`}
            >
              {t.nav.blog}
            </a>
            <a 
              href="/a-propos" 
              onClick={(e) => handleNavClick('/a-propos', e)}
              className={`block py-2 px-4 rounded-lg transition-all ${
                isActive('/a-propos') 
                  ? 'bg-[#C69C6D] text-white' 
                  : 'text-[#1D1D1D] hover:bg-[#FFF8F0] hover:text-[#C69C6D]'
              }`}
            >
              {t.nav.about}
            </a>
            <a 
              href="/contact" 
              onClick={(e) => handleNavClick('/contact', e)}
              className={`block py-2 px-4 rounded-lg transition-all ${
                isActive('/contact') 
                  ? 'bg-[#C69C6D] text-white' 
                  : 'bg-[#1D1D1D] text-white hover:bg-[#C69C6D]'
              }`}
            >
              {t.nav.contact}
            </a>
          </motion.nav>
        )}
      </div>
    </header>
  );
}