// SearchBug Property Records API Service
// Based on SearchBug Property Records API: https://www.searchbug.com/info/api/property-records-api/

export interface PropertySearchRequest {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface PropertyValuation {
  estimatedValue: number;
  valueRange: {
    low: number;
    high: number;
  };
  confidence: 'high' | 'medium' | 'low';
  assessedValue?: number;
  marketValue?: {
    land: number;
    building: number;
    total: number;
  };
  salePrice?: number;
  owner?: string;
  propertyInfo?: {
    county: string;
    city: string;
    state: string;
    zip: string;
    acreage: number;
    yearBuilt?: number;
  };
}

// SearchBug Property Records API Request Interface
export interface PropertyRecordsRequest {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  county?: string;
  'parcel-number'?: string;
  'owner-name'?: string;
  'records-per-page'?: number;
  'page-number'?: number;
  'return-format'?: 'json' | 'xml';
}

// SearchBug Property Records API Response Interfaces
export interface PropertyRecord {
  'record-id': string;
  'parcel-number': string;
  'property-address': string;
  'property-city': string;
  'property-state': string;
  'property-zip': string;
  'property-county': string;
  'owner-name': string;
  'owner-address'?: string;
  'owner-city'?: string;
  'owner-state'?: string;
  'owner-zip'?: string;
  'assessed-value'?: number;
  'market-value'?: number;
  'appraised-value'?: number;
  'tax-amount'?: number;
  'tax-year'?: string;
  'sale-price'?: number;
  'sale-date'?: string;
  'deed-date'?: string;
  'year-built'?: number;
  'square-feet'?: number;
  'lot-size'?: number;
  'property-type'?: string;
  'property-use'?: string;
  'number-of-bedrooms'?: number;
  'number-of-bathrooms'?: number;
  'number-of-stories'?: number;
  'construction-type'?: string;
  'roof-type'?: string;
  'heating-type'?: string;
  'air-conditioning'?: string;
  'legal-description'?: string;
  'subdivision'?: string;
  'zoning'?: string;
  'school-district'?: string;
  'last-updated'?: string;
}

export interface PropertyRecordsApiResponse {
  status: 'success' | 'error';
  'records-returned': number;
  'total-records': number;
  'page-number': number;
  'records-per-page': number;
  'total-pages': number;
  data: PropertyRecord[];
  error?: string;
  'error-message'?: string;
}

class SearchBugApiService {
  // private baseUrl = import.meta.env.VITE_SEARCHBUG_API_URL || 'https://www.searchbug.com';
  private accountNumber = import.meta.env.VITE_SEARCHBUG_ACCOUNT_NUMBER;
  private apiKey = import.meta.env.VITE_SEARCHBUG_API_KEY;

  /**
   * Search property records using SearchBug Property Records API
   * @param searchParams Property records search parameters
   * @returns Promise resolving to property records API response
   */
  async searchPropertyRecords(searchParams: PropertyRecordsRequest): Promise<any> {
    // Validate required credentials
    if (!this.accountNumber) {
      throw new Error('SearchBug Account Number is required. Please set VITE_SEARCHBUG_ACCOUNT_NUMBER in your .env file.');
    }
    if (!this.apiKey) {
      throw new Error('SearchBug API Key is required. Please set VITE_SEARCHBUG_API_KEY in your .env file.');
    }

    // Prepare form data for POST request
    const formData = new FormData();
    
    // Add search parameters to form data
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });  

    // Use proxy server to bypass CORS (localhost for dev, Render URL for production)
    const proxyUrl = import.meta.env.VITE_PROXY_URL 
      ? `${import.meta.env.VITE_PROXY_URL}/api/searchbug-property-search`
      : 'http://localhost:3001/api/searchbug-property-search';
    
    // Convert FormData to regular object for JSON
    const requestData: any = {
      'CO_CODE': this.accountNumber,
      'PASS': this.apiKey,
    };
    
    // Add search parameters
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        requestData[key] = value.toString();
      }
    });
    
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('SearchBug API Response:', responseText);
      throw new Error(`SearchBug Property Records API failed: ${response.status} ${response.statusText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      const responseText = await response.text();
      console.error('Invalid JSON response:', responseText);
      throw new Error(`SearchBug API returned invalid JSON response`);
    }
    
    // SearchBug uses uppercase Status, not lowercase status
    if (data.Status === 'Error' || data.Error) {
      throw new Error(`SearchBug API Error: ${data.Error || 'Unknown error'}`);
    }

    return data;
  }

  /**
   * Get property data by address using Property Records API
   * @param searchRequest Property search request
   * @returns Promise resolving to property records API response
   */
  async getPropertyData(searchRequest: PropertySearchRequest): Promise<any> {
    const searchParams: PropertyRecordsRequest = {
      address: searchRequest.address,
      city: searchRequest.city,
      state: searchRequest.state,
      zip: searchRequest.zip
    };

    return this.searchPropertyRecords(searchParams);
  }

  /**
   * Search property records by owner name
   * @param ownerName Owner name to search for
   * @param city Optional city filter
   * @param state Optional state filter
   * @returns Promise resolving to property records API response
   */
  async searchByOwnerName(
    ownerName: string,
    city?: string,
    state?: string
  ): Promise<PropertyRecordsApiResponse> {
    const searchParams: PropertyRecordsRequest = {
      'owner-name': ownerName,
      city,
      state,
      'records-per-page': 25,
      'page-number': 1,
      'return-format': 'json'
    };

    return this.searchPropertyRecords(searchParams);
  }

  /**
   * Search property records by parcel number
   * @param parcelNumber Parcel number to search for
   * @param county Optional county filter
   * @returns Promise resolving to property records API response
   */
  async searchByParcelNumber(
    parcelNumber: string,
    county?: string
  ): Promise<PropertyRecordsApiResponse> {
    const searchParams: PropertyRecordsRequest = {
      'parcel-number': parcelNumber,
      county,
      'records-per-page': 10,
      'page-number': 1,
      'return-format': 'json'
    };

    return this.searchPropertyRecords(searchParams);
  }

  /**
   * Parse property records API response into PropertyValuation format
   * @param data Property Records API response
   * @returns Parsed PropertyValuation object
   */
  parsePropertyResponse(data: any): PropertyValuation {
    console.log('=== FULL SearchBug Response ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('=== Response Analysis ===');
    console.log('Status:', data.Status);
    console.log('Data:', data.Data);
    console.log('Error:', data.Error);
    
    // Handle SearchBug NoResults response
    if (data.Status === 'NoResults' || !data.Data) {
      console.log('SearchBug returned no results');
      throw new Error('No property records found for this address. Try a different address.');
    }
    
    // Check if we have the expected structure
    if (data.Status === 'Success' && data.Data && data.Data.PROPERTY) {
      console.log('Found property data!');
      
      // Handle both single property and array of properties
      const properties = Array.isArray(data.Data.PROPERTY) ? data.Data.PROPERTY : [data.Data.PROPERTY];
      const property = properties[0]; // Use the first property if multiple found
      
      // Extract numeric values from SearchBug response format
      const marketValueTotal = parseFloat(property.MKT_VAL_TOT || '0');
      const marketValueLand = parseFloat(property.MKT_VAL_LAND || '0');
      const marketValueBldg = parseFloat(property.MKT_VAL_BLDG || '0');
      const salePrice = parseFloat(property.SALE_PRICE || '0');
      const acreage = parseFloat(property.ACREAGE_CALC || property.ACREAGE || '0');
      
      // Use market value as primary estimate
      const estimatedValue = marketValueTotal > 0 ? marketValueTotal : 
                            salePrice > 0 ? salePrice : 500000;
      
      const variance = estimatedValue * 0.12;
      
      return {
        estimatedValue: Math.floor(estimatedValue),
        valueRange: {
          low: Math.floor(estimatedValue - variance),
          high: Math.floor(estimatedValue + variance),
        },
        confidence: marketValueTotal > 0 ? 'high' : 'medium',
        marketValue: {
          land: marketValueLand > 0 ? marketValueLand : Math.floor(estimatedValue * 0.25),
          building: marketValueBldg > 0 ? marketValueBldg : Math.floor(estimatedValue * 0.75),
          total: marketValueTotal,
        },
        salePrice: salePrice > 0 ? salePrice : undefined,
        owner: property.OWNER || undefined,
        propertyInfo: {
          county: property.COUNTY_NAME || '',
          city: property.PHYSCITY || '',
          state: property.STATE_ABBR || '',
          zip: property.PHYSZIP || '',
          acreage: acreage,
          yearBuilt: undefined,
        },
      };
    }
    
    // If we get here, the response structure is unexpected
    console.error('Unexpected SearchBug response structure');
    if (data.Data) {
      console.log('Available Data keys:', Object.keys(data.Data));
    }
    throw new Error('No property records found');
  }

  /**
   * Get property valuation using Property Records API
   * @param searchRequest Property search request
   * @returns Promise resolving to PropertyValuation
   */
  async getPropertyValuation(searchRequest: PropertySearchRequest): Promise<PropertyValuation> {
    try {
      // Try primary search first
      let propertyData = await this.getPropertyData(searchRequest);
      
      // If no results, try fallback searches
      if (propertyData.Status === 'NoResults') {
        console.log('No results with primary search, trying fallbacks...');
        
        // Try with just ZIP code as location
        if (searchRequest.zip) {
          console.log('Trying search with ZIP code location...');
          const zipSearchParams = {
            address: searchRequest.address,
            zip: searchRequest.zip
          };
          propertyData = await this.searchPropertyRecords(zipSearchParams);
        }
        
        // If still no results and we have state, try with state as location
        if (propertyData.Status === 'NoResults' && searchRequest.state) {
          console.log('Trying search with state location...');
          const stateSearchParams = {
            address: searchRequest.address,
            state: searchRequest.state
          };
          propertyData = await this.searchPropertyRecords(stateSearchParams);
        }
        
        // Try with abbreviated street types (Ave -> Avenue, St -> Street)
        if (propertyData.Status === 'NoResults') {
          console.log('Trying search with expanded street names...');
          const expandedAddress = this.expandStreetTypes(searchRequest.address);
          if (expandedAddress !== searchRequest.address) {
            const expandedSearchParams = {
              ...searchRequest,
              address: expandedAddress
            };
            propertyData = await this.getPropertyData(expandedSearchParams);
          }
        }
      }
      
      return this.parsePropertyResponse(propertyData);
    } catch (error) {
      console.error('SearchBug property search failed:', error);
      throw error;
    }
  }
  
  private expandStreetTypes(address: string): string {
    const expansions: { [key: string]: string } = {
      'Ave': 'Avenue',
      'St': 'Street',
      'Rd': 'Road',
      'Dr': 'Drive',
      'Ct': 'Court',
      'Pl': 'Place',
      'Blvd': 'Boulevard',
      'Ln': 'Lane'
    };
    
    let expandedAddress = address;
    Object.entries(expansions).forEach(([abbr, full]) => {
      const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
      expandedAddress = expandedAddress.replace(regex, full);
    });
    
    return expandedAddress;
  }

  /**
   * Get multiple property records with pagination
   * @param searchRequest Property search request
   * @param pageNumber Page number (default: 1)
   * @param recordsPerPage Records per page (default: 10)
   * @returns Promise resolving to PropertyRecordsApiResponse
   */
  async getPropertyRecords(
    searchRequest: PropertySearchRequest,
    pageNumber: number = 1,
    recordsPerPage: number = 10
  ): Promise<PropertyRecordsApiResponse> {
    const searchParams: PropertyRecordsRequest = {
      address: searchRequest.address,
      city: searchRequest.city,
      state: searchRequest.state,
      zip: searchRequest.zip,
      'records-per-page': recordsPerPage,
      'page-number': pageNumber
    };

    return this.searchPropertyRecords(searchParams);
  }

  parseAddress(addressString: string): PropertySearchRequest {
    const parts = addressString.split(',').map(p => p.trim());
    
    if (parts.length >= 2) {
      const stateZip = parts[parts.length - 1];
      const stateZipMatch = stateZip.match(/^([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?$/);
      
      return {
        address: parts[0],
        city: parts.length > 2 ? parts[1] : undefined,
        state: stateZipMatch?.[1],
        zip: stateZipMatch?.[2],
      };
    }
    
    return { address: addressString };
  }
}

export const searchBugApiService = new SearchBugApiService();