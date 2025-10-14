import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import type { UserType } from '../types';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const [searchAddress, setSearchAddress] = useState('');

  const handleUserTypeLogin = (type: UserType) => {
    setUserType(type);
    navigate('/dashboard');
  };

  const handleEstimateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      // Navigate to results page with the address
      navigate(`/estimate-results?address=${encodeURIComponent(searchAddress.trim())}`);
    }
  };

  return (
    <div className="landing-page">
      {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-container">
            <div className="logo">
            <h2>Assemble</h2>
            </div>
            <div className="nav-links">
              <button 
                className="nav-link"
                onClick={() => handleUserTypeLogin('agent')}
              >
                Login as Agent
              </button>
              <span className="nav-separator">|</span>
              <button 
                className="nav-link"
                onClick={() => handleUserTypeLogin('contractor')}
              >
                Contractor
              </button>
              <span className="nav-separator">|</span>
              <button 
                className="nav-link"
                onClick={() => handleUserTypeLogin('supplier')}
              >
                Supplier
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
                Discover Your Property's True Value
              </h1>
              <p className="main-subtitle">
                Get instant property valuations and connect with trusted professionals for your next renovation project.
              </p>
              
              {/* Main Search Form */}
              <form onSubmit={handleEstimateSearch} className="hero-search-form">
                <div className="hero-search-container">
                  <input
                    type="text"
                    placeholder="Enter your property address for instant estimate"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    className="hero-search-input"
                  />
                  <button type="submit" className="hero-search-btn">
                    Get Free Estimate
                  </button>
                </div>
                <p className="search-subtext">
                  Free instant estimate • No signup required • Trusted by thousands
                </p>
              </form>
            </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default LandingPage;
