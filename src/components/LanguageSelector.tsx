import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import type { Language } from '../context/TranslationContext';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <span className="language-flag">{currentLanguage?.flag}</span>
        <span className="language-name">{currentLanguage?.name}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;