import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './EstimateResults.css';
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';

const EstimateResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const address = searchParams.get('address') || '';
  const estimatedValue = Number(searchParams.get('value')) || 0;
  const valueLow = Number(searchParams.get('low')) || 0;
  const valueHigh = Number(searchParams.get('high')) || 0;
  const [propertyData, setPropertyData] = useState<any>(null);
  const [showBudgetEntry, setShowBudgetEntry] = useState(false);
  const [budget, setBudget] = useState('');
  
  // Helper function to format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Check if we have raw property data in sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem('lastPropertyData');
    if (storedData) {
      try {
        setPropertyData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing stored property data:', error);
      }
    }
  }, []);

  const handleBudgetEntry = () => {
    setShowBudgetEntry(true);
  };

  const handleTalkToAgent = () => {
    setUserType('homeowner');
    navigate('/guided-flow');
  };

  const handlePurchaseReport = () => {
    navigate('/payment', {
      state: {
        amount: 49.99,
        description: 'Complete Home Renovation ROI Report',
        propertyAddress: address
      }
    });
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
            <div className="value-amount">{formatCurrency(estimatedValue)}</div>
            <div className="value-range">Range: {formatCurrency(valueLow)} - {formatCurrency(valueHigh)}</div>
            <p className="value-disclaimer">
              Based on recent comparable sales and current market conditions
            </p>
          </div>
          
          {/* Detailed Property Information */}
          {propertyData && (
            <div className="property-details-section">
              <h2>Property Details</h2>
              <div className="property-details-grid">
                <div className="property-detail-card">
                  <h3>Property Information</h3>
                  <div className="detail-item">
                    <span className="label">County:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.COUNTY_NAME || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Municipality:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.MUNI_NAME || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">State:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.STATE_ABBR || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">ZIP:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.PHYSZIP || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Parcel ID:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.PARCEL_ID || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Acreage:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.ACREAGE || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Owner:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.OWNER || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Owner Occupied:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.OWNER_OCCUPIED || 'Unknown'}</span>
                  </div>
                </div>
                
                <div className="property-detail-card">
                  <h3>Valuation Details</h3>
                  <div className="detail-item">
                    <span className="label">Total Market Value:</span>
                    <span className="value">
                      {propertyData.Data?.PROPERTY?.MKT_VAL_TOT ? 
                        formatCurrency(Number(propertyData.Data?.PROPERTY?.MKT_VAL_TOT)) : 'Not Available'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Land Value:</span>
                    <span className="value">
                      {propertyData.Data?.PROPERTY?.MKT_VAL_LAND ? 
                        formatCurrency(Number(propertyData.Data?.PROPERTY?.MKT_VAL_LAND)) : 'Not Available'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Building Value:</span>
                    <span className="value">
                      {propertyData.Data?.PROPERTY?.MKT_VAL_BLDG ? 
                        formatCurrency(Number(propertyData.Data?.PROPERTY?.MKT_VAL_BLDG)) : 'Not Available'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Last Sale Price:</span>
                    <span className="value">
                      {propertyData.Data?.PROPERTY?.SALE_PRICE ? 
                        formatCurrency(Number(propertyData.Data?.PROPERTY?.SALE_PRICE)) : 'Not Available'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Sale Date:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.TRANS_DATE || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Building Square Footage:</span>
                    <span className="value">
                      {propertyData.Data?.PROPERTY?.BLDG_SQFT ? 
                        `${propertyData.Data?.PROPERTY?.BLDG_SQFT} sq ft` : 'Not Available'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Land Use:</span>
                    <span className="value">{propertyData.Data?.PROPERTY?.LAND_USE_CLASS || 'Not Available'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Last Updated:</span>
                    <span className="value highlight">{propertyData.Data?.PROPERTY?.LAST_UPDATED || 'Not Available'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Renovation Recommendations */}
          <div className="renovation-recommendation">
            <h3>Top Renovation Opportunities</h3>
            
            <div className="renovation-cards-grid">
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

            <div className="opportunity-card">
              <div className="opportunity-header">
                <h4>Bathroom Remodel</h4>
                <span className="impact-badge">High Impact</span>
              </div>
              <div className="investment-details">
                <div className="investment-item">
                  <span className="label">Investment Range</span>
                  <span className="value">$10,000 - $25,000</span>
                </div>
                <div className="investment-item">
                  <span className="label">Value Increase</span>
                  <span className="value positive">$15,000 - $35,000</span>
                </div>
                <div className="investment-item">
                  <span className="label">Return on Investment</span>
                  <span className="value highlight">120% ROI</span>
                </div>
              </div>
            </div>

            <div className="opportunity-card">
              <div className="opportunity-header">
                <h4>Flooring Upgrade</h4>
                <span className="impact-badge">Medium Impact</span>
              </div>
              <div className="investment-details">
                <div className="investment-item">
                  <span className="label">Investment Range</span>
                  <span className="value">$5,000 - $15,000</span>
                </div>
                <div className="investment-item">
                  <span className="label">Value Increase</span>
                  <span className="value positive">$8,000 - $20,000</span>
                </div>
                <div className="investment-item">
                  <span className="label">Return on Investment</span>
                  <span className="value highlight">110% ROI</span>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Premium Report CTA Section */}
          <div className="premium-report-section">
            <div className="premium-report-container">
              <div className="premium-header">
                <Lock size={24} className="lock-icon" />
                <h2>Unlock the Complete Analysis</h2>
              </div>
              
              <p className="premium-tagline">
                Get a detailed renovation roadmap backed by local market data
              </p>
              
              <div className="premium-benefits">
                <div className="benefit-item">
                  <CheckCircle size={20} className="benefit-icon" />
                  <span>10+ renovation options analyzed for your property</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={20} className="benefit-icon" />
                  <span>Contractor recommendations with verified ratings</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={20} className="benefit-icon" />
                  <span>Permit requirements & timelines by local area</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={20} className="benefit-icon" />
                  <span>Month-by-month project execution plan</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={20} className="benefit-icon" />
                  <span>Direct access to Assemble support team</span>
                </div>
              </div>
              
              <div className="premium-price-section">
                <div className="price-info">
                  <span className="price-label">One-time investment:</span>
                  <span className="price-value">$49.99</span>
                </div>
                <button 
                  className="purchase-report-btn" 
                  onClick={handlePurchaseReport}
                >
                  Get Full Report
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <p className="secure-note">🔒 Secure payment • Instant access • 100% satisfaction guaranteed</p>
            </div>
          </div>

          {/* Budget Section - Now flows naturally */}
          <div className="renovation-budget-section">
            <h4 className="budget-section-title">Ready to get started?</h4>
            <p className="budget-section-subtitle">
              Enter your renovation budget and we'll connect you with the right professionals
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