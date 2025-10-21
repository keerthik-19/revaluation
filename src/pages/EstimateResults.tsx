import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './EstimateResults.css';

const EstimateResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const address = searchParams.get('address') || '';
  const estimatedValue = Number(searchParams.get('value')) || 0;
  const valueLow = Number(searchParams.get('low')) || 0;
  const valueHigh = Number(searchParams.get('high')) || 0;
  const [propertyData, setPropertyData] = useState<any>(null);
  
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

  const handleStartRenovationFlow = () => {
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

          {/* Single Call-to-Action */}
          <div className="renovation-cta-section">
            <div className="cta-content">
              <h3>Ready to Start Your Renovation Project?</h3>
              <p>Connect with verified professionals and get expert guidance for your home improvement project.</p>
              <button className="start-renovation-btn" onClick={handleStartRenovationFlow}>
                Begin Renovation Planning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateResults;