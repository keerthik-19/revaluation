import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTranslation } from '../context/TranslationContext';
import PropertySearchForm from '../components/PropertySearchForm';
import Logo from '../components/Logo';
import LanguageSelector from '../components/LanguageSelector';
import type { UserType } from '../types';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const { t } = useTranslation();

  const handleUserTypeLogin = (type: UserType) => {
    setUserType(type);
    navigate('/dashboard');
  };

  const handleSearchStart = () => {
    console.log('🔍 Property search started...');
  };

  const handleSearchComplete = (results: any) => {
    console.log('✅ Property search completed:', results);
  };

  const handleSearchError = (error: string) => {
    console.error('❌ Property search error:', error);
    alert(`Search failed: ${error}`);
  };

  return (
    <div className="landing-page">
      {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-container">
            <div className="logo">
              <Logo width={140} height={140} className="logo-icon" />
              <h2>Assemble</h2>
            </div>
            <div className="nav-links">
              <LanguageSelector />
              <span className="nav-separator">|</span>
              <button 
                className="nav-link"
                onClick={() => handleUserTypeLogin('contractor')}
              >
                {t('nav.contractor')}
              </button>
            </div>
          </div>
        </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="main-title">
                {t('landing.title')}
              </h1>
              <p className="main-subtitle">
                {t('landing.subtitle')}
              </p>
            </div>
          </div>

          {/* Property Search Form */}
          <div className="search-section">
            <PropertySearchForm 
              onSearchStart={handleSearchStart}
              onSearchComplete={handleSearchComplete}
              onSearchError={handleSearchError}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
