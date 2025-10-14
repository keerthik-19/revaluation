import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const EstimateResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const address = searchParams.get('address') || '';
  const [showBudgetEntry, setShowBudgetEntry] = useState(false);
  const [budget, setBudget] = useState('');

  const handleStartRenovationFlow = () => {
    setUserType('homeowner');
    navigate('/guided-flow');
  };

  const handleBudgetEntry = () => {
    setShowBudgetEntry(true);
  };

  const handleTalkToAgent = () => {
    setUserType('homeowner');
    navigate('/guided-flow');
  };

  return (
    <div className="estimate-results-page">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="logo">
            <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Assemble</h2>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => navigate('/')}>
              New Search
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="results-container">
          <div className="results-header">
            <h1>Property Estimate Results</h1>
            <p className="searched-address">For: {address}</p>
          </div>

          {/* Market Value Card */}
          <div className="market-value-card">
            <div className="value-header">
              <h3>Estimated Market Value</h3>
              <span className="confidence-badge">High Confidence</span>
            </div>
            <div className="value-amount">$475,000</div>
            <div className="value-range">Range: $450,000 - $500,000</div>
            <p className="value-disclaimer">
              Based on recent comparable sales and current market conditions
            </p>
          </div>

          {/* Renovation Recommendation */}
          <div className="renovation-recommendation">
            <h3>Top Renovation Opportunity</h3>
            <div className="opportunity-card">
              <div className="opportunity-header">
                <h4>Kitchen Renovation</h4>
                <span className="impact-badge">High Impact</span>
              </div>
              <div className="investment-details">
                <div className="investment-item">
                  <span className="label">Investment Range</span>
                  <span className="value">$15,000 - $30,000</span>
                </div>
                <div className="investment-item">
                  <span className="label">Value Increase</span>
                  <span className="value positive">$30,000 - $45,000</span>
                </div>
                <div className="investment-item">
                  <span className="label">Return on Investment</span>
                  <span className="value highlight">150% ROI</span>
                </div>
              </div>
            </div>
            
            <button className="start-renovation-btn" onClick={handleStartRenovationFlow}>
              Begin Renovation Planning
            </button>
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
      </div>
    </div>
  );
};

export default EstimateResults;