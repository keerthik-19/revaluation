import React, { useState, useEffect, useRef } from 'react';
import './AddressAutocomplete.css';

interface AddressSuggestion {
  id: string;
  fullAddress: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string, addressData: { address: string; city: string; state: string; zip: string }) => void;
  placeholder?: string;
  className?: string;
}

// Mock address database - in production, this would come from Google Places API
const mockAddresses: AddressSuggestion[] = [
  { id: '1', fullAddress: '123 Main Street, New York, NY 10001', street: '123 Main Street', city: 'New York', state: 'NY', zip: '10001' },
  { id: '2', fullAddress: '456 Oak Avenue, Los Angeles, CA 90210', street: '456 Oak Avenue', city: 'Los Angeles', state: 'CA', zip: '90210' },
  { id: '3', fullAddress: '789 Elm Street, Chicago, IL 60601', street: '789 Elm Street', city: 'Chicago', state: 'IL', zip: '60601' },
  { id: '4', fullAddress: '321 Pine Road, Miami, FL 33101', street: '321 Pine Road', city: 'Miami', state: 'FL', zip: '33101' },
  { id: '5', fullAddress: '654 Cedar Lane, Seattle, WA 98101', street: '654 Cedar Lane', city: 'Seattle', state: 'WA', zip: '98101' },
  { id: '6', fullAddress: '987 Maple Drive, Austin, TX 78701', street: '987 Maple Drive', city: 'Austin', state: 'TX', zip: '78701' },
  { id: '7', fullAddress: '147 Broadway, Boston, MA 02101', street: '147 Broadway', city: 'Boston', state: 'MA', zip: '02101' },
  { id: '8', fullAddress: '258 Park Avenue, Denver, CO 80201', street: '258 Park Avenue', city: 'Denver', state: 'CO', zip: '80201' },
  { id: '9', fullAddress: '369 5th Street, San Francisco, CA 94101', street: '369 5th Street', city: 'San Francisco', state: 'CA', zip: '94101' },
  { id: '10', fullAddress: '100 Short Court, Chardon, OH 44024', street: '100 Short Court', city: 'Chardon', state: 'OH', zip: '44024' },
  { id: '11', fullAddress: '525 University Avenue, Palo Alto, CA 94301', street: '525 University Avenue', city: 'Palo Alto', state: 'CA', zip: '94301' },
  { id: '12', fullAddress: '888 Washington Street, Portland, OR 97201', street: '888 Washington Street', city: 'Portland', state: 'OR', zip: '97201' },
];

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  placeholder = 'Enter your address',
  className = ''
}) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterSuggestions = (query: string) => {
    if (query.length < 2) return [];
    
    return mockAddresses.filter(address =>
      address.fullAddress.toLowerCase().includes(query.toLowerCase()) ||
      address.street.toLowerCase().includes(query.toLowerCase()) ||
      address.city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6); // Limit to 6 suggestions
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue, { address: '', city: '', state: '', zip: '' });
    
    const filtered = filterSuggestions(inputValue);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    onChange(suggestion.fullAddress, {
      address: suggestion.street,
      city: suggestion.city,
      state: suggestion.state,
      zip: suggestion.zip
    });
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="address-autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`${className} autocomplete-input`}
        autoComplete="off"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-main">
                <span className="suggestion-address">{suggestion.street}</span>
              </div>
              <div className="suggestion-details">
                {suggestion.city}, {suggestion.state} {suggestion.zip}
              </div>
            </div>
          ))}
          <div className="suggestions-footer">
            <span className="powered-by">
              Address suggestions
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;