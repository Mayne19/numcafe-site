import { Globe } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { useState, useRef, useEffect } from 'react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
    // Force page reload to apply translations everywhere
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-lg">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[#FFF8F0] transition-colors ${
                language === lang.code ? 'bg-[#FFF8F0] text-[#C69C6D]' : 'text-gray-700'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-[#C69C6D]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
