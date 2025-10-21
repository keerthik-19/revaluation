import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertySearchForm from '../components/PropertySearchForm';

const PropertySearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearchStart = () => {
    console.log('🔍 Property search started...');
  };

  const handleSearchComplete = (results: any) => {
    console.log('✅ Property search completed:', results);
  };

  const handleSearchError = (error: string) => {
    console.error('❌ Property search error:', error);
  };

  return (
    <div className="property-search-page">
      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="logo">
            <h2>Assemble</h2>
          </div>
          <div className="nav-links">
            <button 
              className="nav-link"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="search-page-container">
          {/* Header */}
          <div className="search-page-header">
            <h1>Property Valuation Search</h1>
            <p>Enter your property details to get an instant, accurate valuation estimate powered by SearchBug's comprehensive property database.</p>
          </div>

          {/* Search Form */}
          <div className="search-form-section">
            <PropertySearchForm 
              onSearchStart={handleSearchStart}
              onSearchComplete={handleSearchComplete}
              onSearchError={handleSearchError}
            />
          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🏠</div>
                <h3>Comprehensive Data</h3>
                <p>Access to millions of property records with market values, sales history, and detailed property information.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Results</h3>
                <p>Get property valuations in seconds with our advanced API integration and real-time data processing.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Accurate Estimates</h3>
                <p>Professional-grade property valuation using market data, comparable sales, and property characteristics.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>Your searches are private and secure. No personal information required for property lookups.</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="how-it-works-section">
            <h2>How Property Valuation Works</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h4>Enter Property Details</h4>
                <p>Provide the street address, city, state, and optional ZIP code for the most accurate results.</p>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <h4>Data Analysis</h4>
                <p>Our system searches comprehensive property databases and analyzes market data, sales history, and property characteristics.</p>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <h4>Instant Valuation</h4>
                <p>Receive detailed property information including estimated market value, value ranges, and confidence levels.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertySearchPage;