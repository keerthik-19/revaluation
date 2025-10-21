import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attomApiService } from '../services/attomApi';
import type { PropertySearchRequest } from '../services/attomApi';
import AddressAutocomplete from './AddressAutocomplete';
import './PropertySearchForm.css';

interface PropertySearchFormProps {
  onSearchStart?: () => void;
  onSearchComplete?: (results: any) => void;
  onSearchError?: (error: string) => void;
}

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];

const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
  onSearchStart,
  onSearchComplete,
  onSearchError
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PropertySearchRequest>({
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<PropertySearchRequest>>({});

  const handleInputChange = (field: keyof PropertySearchRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PropertySearchRequest> = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Please enter a complete address with street, city, and state';
      return false;
    }

    // For single-line input, we need at least address and either city or state info
    if (!formData.city?.trim() && !formData.state) {
      newErrors.address = 'Please include city and state (e.g. "123 Main St, New York, NY")';
    }

    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    // Validate zip code format if provided
    if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = 'ZIP code must be in format 12345 or 12345-6789';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    onSearchStart?.();

    try {
      console.log('Searching property with data:', formData);
      
      // Get property valuation using Attom API
      const valuation = await attomApiService.getPropertyValuation(formData);
      console.log('Got property valuation:', valuation);
      
      onSearchComplete?.(valuation);
      
      // Navigate to results with full address and valuation data
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip || ''}`.trim();
      navigate(`/estimate-results?address=${encodeURIComponent(fullAddress)}&value=${valuation.estimatedValue}&low=${valuation.valueRange.low}&high=${valuation.valueRange.high}`);
      
    } catch (error) {
      console.error('Property search failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Search failed. Please try again.';
      onSearchError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="property-search-form">
      <form onSubmit={handleSubmit} className="zillow-style-form">
        <div className="search-container">
          <div className="search-input-group">
            <AddressAutocomplete
              value={`${formData.address}${formData.city ? ', ' + formData.city : ''}${formData.state ? ', ' + formData.state : ''}${formData.zip ? ' ' + formData.zip : ''}`}
              onChange={(displayValue, addressData) => {
                if (addressData.address) {
                  // If we got structured data from autocomplete
                  handleInputChange('address', addressData.address);
                  handleInputChange('city', addressData.city);
                  handleInputChange('state', addressData.state);
                  handleInputChange('zip', addressData.zip);
                } else {
                  // Manual typing - parse the display value
                  const value = displayValue;
                  
                  if (value.includes(',')) {
                    const parts = value.split(',').map(part => part.trim());
                    
                    if (parts[0]) {
                      handleInputChange('address', parts[0]);
                    }
                    
                    if (parts[1]) {
                      handleInputChange('city', parts[1]);
                    }
                    
                    if (parts[2]) {
                      const stateZipPart = parts[2].trim();
                      const stateZipMatch = stateZipPart.match(/^([A-Za-z\s]+?)\s+(\d{5}(?:-\d{4})?)$/);
                      if (stateZipMatch) {
                        handleInputChange('state', stateZipMatch[1].trim());
                        handleInputChange('zip', stateZipMatch[2]);
                      } else {
                        handleInputChange('state', stateZipPart);
                      }
                    }
                  } else {
                    handleInputChange('address', value);
                    if (!value.includes(formData.city || '') && formData.city) {
                      handleInputChange('city', '');
                      handleInputChange('state', '');
                      handleInputChange('zip', '');
                    }
                  }
                }
              }}
              placeholder="Enter your address (e.g. 123 Main Street, New York, NY 10001)"
              className="zillow-search-input"
            />
            <button 
              type="submit" 
              className="zillow-search-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
          {errors.address && (
            <div className="search-error">
              {errors.address}
            </div>
          )}
        </div>
        
        {/* Hidden detailed form for validation fallback */}
        <div className="detailed-form" style={{ display: 'none' }}>
          <input value={formData.address} readOnly />
          <input value={formData.city} readOnly />
          <select value={formData.state} disabled>
            <option value="">Select State</option>
            {US_STATES.map(state => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          <input value={formData.zip} readOnly />
        </div>

      </form>
    </div>
  );
};

export default PropertySearchForm;