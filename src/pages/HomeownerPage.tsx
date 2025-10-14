import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import type { UserType } from '../types';

const HomeownerPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const [searchAddress, setSearchAddress] = useState('');
  const [showValuation, setShowValuation] = useState(false);
  const [showBudgetEntry, setShowBudgetEntry] = useState(false);
  const [budget, setBudget] = useState('');

  React.useEffect(() => {
    setUserType('homeowner');
  }, [setUserType]);

  const handleUserTypeLogin = (type: UserType) => {
    setUserType(type);
    navigate('/dashboard');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      setShowValuation(true);
    }
  };

  const handleBudgetEntry = () => {
    setShowBudgetEntry(true);
  };

  const handleTalkToAgent = () => {
    navigate('/guided-flow');
  };

  return (
    <div className="homeowner-page">
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
      <main className="homeowner-main-content">
        <div className="homeowner-container">
          {/* Header Section */}
          <div className="homeowner-header">
            <h1 className="homeowner-title">
              Discover Your Property's True Value & Get Expert Help
            </h1>
            <p className="homeowner-subtitle">
              Find your home's current value, plan renovations, and connect with trusted professionals.
            </p>
          </div>

          {/* Search Section */}
          <div className="property-search-section">
            <form onSubmit={handleSearchSubmit} className="property-search-form">
              <div className="property-search-container">
                <input
                  type="text"
                  placeholder="Enter your home address…"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="property-search-input"
                />
                <button type="submit" className="property-search-button">
                  Get Free Estimate
                </button>
              </div>
              <p className="property-search-disclaimer">
                Free instant estimate • No signup required • Trusted by thousands
              </p>
            </form>
          </div>

          {/* Property Valuation Results */}
          {showValuation && (
            <div className="property-results">
              {/* Market Value Card */}
              <div className="market-value-card">
                <h3 className="market-value-title">Estimated Market Value</h3>
                <div className="market-value-amount">$475,000</div>
                <div className="market-value-range">$450,000 – $500,000</div>
                <p className="market-value-disclaimer">
                  This estimate is based on recent sales of similar properties in your area, current market conditions, and property characteristics.
                </p>
              </div>

              {/* Top Recommendation */}
              <div className="top-recommendation-card">
                <div className="recommendation-header">
                  <h4 className="recommendation-label">Top Recommendation</h4>
                  <span className="high-impact-badge">High Impact</span>
                </div>
                <div className="recommendation-details">
                  <h5>Kitchen Renovation</h5>
                  <p className="recommendation-description">
                    Modern kitchen updates provide excellent ROI and appeal to buyers
                  </p>
                  
                  <div className="investment-breakdown">
                    <div className="investment-column">
                      <span className="investment-label">Investment:</span>
                      <span className="investment-value">$15,000 - $30,000</span>
                    </div>
                    <div className="value-increase-column">
                      <span className="value-increase-label">Value Increase:</span>
                      <span className="value-increase-amount">$30,000 - $45,000</span>
                    </div>
                  </div>

                  <div className="roi-indicator">
                    <div className="roi-checkmark">✓</div>
                    <span>Excellent Return on Investment</span>
                  </div>
                </div>
              </div>

              {/* Budget Section */}
              <div className="renovation-budget-section">
                <h4 className="budget-section-title">Renovation Budget</h4>
                <p className="budget-section-subtitle">
                  Set your renovation budget to see tailored recommendations
                </p>
                
                {!showBudgetEntry ? (
                  <button className="enter-budget-btn" onClick={handleBudgetEntry}>
                    Enter Budget
                  </button>
                ) : (
                  <div className="budget-input-section">
                    <input
                      type="text"
                      placeholder="Enter your budget (e.g., $25,000)"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="budget-input-field"
                    />
                    <button className="talk-to-agent-btn" onClick={handleTalkToAgent}>
                      Talk to Your Agent
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomeownerPage;
