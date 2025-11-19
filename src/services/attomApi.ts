// ATTOM Data Property API Service
// Documentation: https://api.developer.attomdata.com/docs

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

// Building Permit Interfaces
export interface BuildingPermit {
  permitNumber?: string;
  permitType?: string;
  permitTypeDesc?: string;
  permitClass?: string;
  permitClassMapped?: string;
  workType?: string;
  workTypeDesc?: string;
  description?: string;
  issueDate?: string;
  statusDate?: string;
  status?: string;
  statusDesc?: string;
  cost?: number;
  estimatedCost?: number;
  sqft?: number;
  contractorName?: string;
  contractorLicense?: string;
  contractorType?: string;
  contractorPhone?: string;
  completionDate?: string;
  address?: {
    line1?: string;
    locality?: string;
    countrySubd?: string;
    postal1?: string;
  };
}

export interface AttomBuildingPermitProperty {
  identifier?: {
    Id?: string;
    fips?: string;
    apn?: string;
    attomId?: number;
  };
  address?: {
    line1?: string;
    line2?: string;
    locality?: string;
    countrySubd?: string;
    postal1?: string;
  };
  permit?: BuildingPermit[];
}

export interface AttomBuildingPermitResponse {
  status: {
    version: string;
    code: number;
    msg: string;
    total: number;
    page: number;
    pagesize: number;
  };
  property?: AttomBuildingPermitProperty[];
}

// ATTOM API Response Interfaces - Updated to match actual API response
export interface AttomPropertyResponse {
  status: {
    version: string;
    code: number;
    msg: string;
    total: number;
    page: number;
    pagesize: number;
    responseDateTime: string;
    transactionID: string;
    attomId: number;
  };
  property: AttomProperty[];
}

export interface AttomProperty {
  identifier: {
    Id: string;
    fips: string;
    apn: string;
    attomId: number;
  };
  address: {
    country: string;
    countrySubd: string;
    line1: string;
    line2: string;
    locality: string;
    matchCode: string;
    oneLine: string;
    postal1: string;
    postal2: string;
    postal3: string;
  };
  lot: {
    lotNum: string;
    lotSize1: number;
    lotSize2: number;
    poolType: string;
  };
  area: {
    blockNum: string;
    censusBlock: string;
    censusCounty: string;
    censusFips: string;
    censusTract: string;
    munCode: string;
    munName: string;
    subdivision: string;
  };
  building: {
    size: {
      bldgSize: number;
      grossSize: number;
      grossSizeAdjusted: number;
      livingSize: number;
      groundFloorSize: number;
    };
    rooms: {
      beds: number;
      baths: number;
      partialBaths: number;
      rooms: number;
    };
    construction: {
      condition: string;
      constructionType: string;
      exteriorWalls: string;
      fireplace: string;
      foundationType: string;
      frame: string;
      heating: string;
      heatingType: string;
      roofCover: string;
      roofFrame: string;
      stories: number;
      style: string;
      unitsCount: number;
      yearBuilt: number;
    };
  };
  summary: {
    propclass: string;
    propsubtype: string;
    proptype: string;
    yearbuilt: number;
    propLandUse: string;
    propIndicator: string;
  };
  utilities: {
    coolingType: string;
    energyType: string;
    fuelType: string;
    heatingType: string;
    sewerType: string;
    waterType: string;
  };
  vintage: {
    lastModified: string;
    pubDate: string;
  };
}

export interface AttomAVMResponse {
  status: {
    version: string;
    code: number;
    msg: string;
    total: number;
    page: number;
    pagesize: number;
  };
  avm: AttomAVM[];
}

export interface AttomAVM {
  identifier: {
    Id: string;
    fips: string;
    apn: string;
    attomId: number;
  };
  address: {
    country: string;
    countrySubd: string;
    line1: string;
    line2: string;
    locality: string;
    matchCode: string;
    oneLine: string;
    postal1: string;
    postal2: string;
    postal3: string;
  };
  amount: {
    value: number;
    high: number;
    low: number;
    valueRange: number;
    ttlValue: number;
    ttlValueRange: number;
  };
  eventDate: string;
  calcDate: string;
  source: string;
  onMkt: string;
  scr: number; // Confidence score
  version: string;
}

class AttomApiService {
  // private baseUrl = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0';
  private apiKey = import.meta.env.VITE_ATTOM_API_KEY;
  private proxyUrl = import.meta.env.VITE_PROXY_URL 
    ? `${import.meta.env.VITE_PROXY_URL}/api/attom-property-search`
    : 'http://localhost:3001/api/attom-property-search';

  /**
   * Search property details using ATTOM Property API
   * @param searchParams Property search request
   * @returns Promise resolving to ATTOM property response
   */
  async searchProperty(searchParams: PropertySearchRequest): Promise<AttomPropertyResponse> {
    if (!this.apiKey) {
      throw new Error('ATTOM API Key is required. Please set VITE_ATTOM_API_KEY in your .env file.');
    }

    // Build search parameters for ATTOM API
    const attomParams = this.buildAttomSearchParams(searchParams);
    
    const response = await fetch(this.proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        endpoint: 'property/detail',
        params: attomParams
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ATTOM Property API Error:', errorText);
      throw new Error(`ATTOM Property API failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.status?.code !== 0 && data.status?.code !== 400) {
      throw new Error(`ATTOM API Error: ${data.status?.msg || 'Unknown error'}`);
    }

    return data;
  }

  /**
   * Get AVM (Automated Valuation Model) for a property
   * @param searchParams Property search request
   * @returns Promise resolving to ATTOM AVM response
   */
  async getAVM(searchParams: PropertySearchRequest): Promise<AttomAVMResponse> {
    if (!this.apiKey) {
      throw new Error('ATTOM API Key is required. Please set VITE_ATTOM_API_KEY in your .env file.');
    }

    const attomParams = this.buildAttomSearchParams(searchParams);
    
    const response = await fetch(this.proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        endpoint: 'attomavm/detail',
        params: attomParams
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ATTOM AVM API Error:', errorText);
      throw new Error(`ATTOM AVM API failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.status?.code !== 0 && data.status?.code !== 400) {
      throw new Error(`ATTOM AVM API Error: ${data.status?.msg || 'Unknown error'}`);
    }

    return data;
  }

  /**
   * Get comprehensive property valuation using ATTOM AVM endpoint
   * @param searchRequest Property search request
   * @returns Promise resolving to PropertyValuation
   */
  async getPropertyValuation(searchRequest: PropertySearchRequest): Promise<PropertyValuation> {
    try {
      console.log('Getting ATTOM property valuation for:', searchRequest);
      
      // Use AVM endpoint which includes property details + valuation
      const attomParams = this.buildAttomSearchParams(searchRequest);
      
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: this.apiKey,
          endpoint: 'attomavm/detail',
          params: attomParams
        })
      });

      if (!response.ok) {
        throw new Error(`ATTOM API failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status?.code !== 0) {
        throw new Error(`ATTOM API Error: ${data.status?.msg || 'Unknown error'}`);
      }

      return this.parseAttomResponse(data, searchRequest);
    } catch (error) {
      console.error('ATTOM property valuation failed:', error);
      throw error;
    }
  }

  /**
   * Build ATTOM API search parameters from PropertySearchRequest
   * @param searchParams Property search request
   * @returns ATTOM API compatible parameters
   */
  private buildAttomSearchParams(searchParams: PropertySearchRequest): any {
    const params: any = {};

    // ATTOM API expects address1 (street) and address2 (city, state zip)
    if (searchParams.address) {
      params.address1 = searchParams.address;
    }

    // Build address2 string: "City, State Zip" format
    let address2Parts = [];
    if (searchParams.city) address2Parts.push(searchParams.city);
    if (searchParams.state) {
      if (searchParams.zip) {
        address2Parts.push(`${searchParams.state} ${searchParams.zip}`);
      } else {
        address2Parts.push(searchParams.state);
      }
    } else if (searchParams.zip) {
      address2Parts.push(searchParams.zip);
    }
    
    if (address2Parts.length > 0) {
      params.address2 = address2Parts.join(', ');
    }

    return params;
  }

  /**
   * Parse ATTOM API response into PropertyValuation format
   * @param propertyResponse ATTOM API response
   * @param searchRequest Original search request
   * @returns Parsed PropertyValuation object
   */
  private parseAttomResponse(
    propertyResponse: any,
    searchRequest: PropertySearchRequest
  ): PropertyValuation {
    console.log('=== FULL ATTOM Response ===');
    console.log(JSON.stringify(propertyResponse, null, 2));
    
    if (!propertyResponse?.property?.[0]) {
      throw new Error('No property data found in ATTOM response');
    }
    
    const property = propertyResponse.property[0];
    console.log('=== Property Object ===');
    console.log(JSON.stringify(property, null, 2));
    
    // Extract AVM data if available
    const avm = property.avm;
    console.log('=== AVM Data ===');
    console.log(JSON.stringify(avm, null, 2));
    
    // Use AVM value as primary estimate
    let estimatedValue = 0;
    let valueRange = { low: 0, high: 0 };
    let confidence: 'high' | 'medium' | 'low' = 'medium';

    if (avm?.amount) {
      estimatedValue = avm.amount.value || avm.amount.ttlValue || 0;
      valueRange = {
        low: avm.amount.low || estimatedValue * 0.85,
        high: avm.amount.high || estimatedValue * 1.15
      };
      
      // Convert ATTOM confidence score to our confidence levels
      if (avm.scr >= 80) confidence = 'high';
      else if (avm.scr >= 60) confidence = 'medium';
      else confidence = 'low';
    } else {
      // Estimate based on property characteristics if no AVM
      estimatedValue = this.estimateValueFromPropertyResponse(property, searchRequest);
      const variance = estimatedValue * 0.2;
      valueRange = {
        low: estimatedValue - variance,
        high: estimatedValue + variance
      };
      confidence = 'low';
    }

    return {
      estimatedValue: Math.floor(estimatedValue),
      valueRange: {
        low: Math.floor(valueRange.low),
        high: Math.floor(valueRange.high)
      },
      confidence,
      marketValue: {
        land: Math.floor(estimatedValue * 0.25),
        building: Math.floor(estimatedValue * 0.75),
        total: Math.floor(estimatedValue)
      },
      propertyInfo: {
        county: property?.area?.munName || '',
        city: property?.address?.locality || searchRequest.city || '',
        state: property?.address?.countrySubd || searchRequest.state || '',
        zip: property?.address?.postal1 || searchRequest.zip || '',
        acreage: property?.lot?.lotSize1 ? property.lot.lotSize1 / 43560 : 0,
        yearBuilt: property?.building?.construction?.yearBuilt || property?.summary?.yearbuilt
      }
    };
  }

  /**
   * Estimate property value based on ATTOM property response
   * @param property ATTOM property response object
   * @param searchRequest Original search request
   * @returns Estimated property value
   */
  private estimateValueFromPropertyResponse(property: any, searchRequest: PropertySearchRequest): number {
    const stateAverages: { [key: string]: number } = {
      'CA': 850000, 'NY': 650000, 'FL': 400000, 'TX': 350000,
      'NJ': 500000, 'MA': 650000, 'WA': 750000, 'OH': 200000,
    };

    let baseValue = stateAverages[searchRequest.state || ''] || 400000;
    
    // Adjust based on property characteristics
    if (property.building?.size?.livingSize) {
      const sqftValue = property.building.size.livingSize * (baseValue / 2000);
      baseValue = sqftValue;
    }

    // Age adjustment
    if (property.summary?.yearbuilt) {
      const age = new Date().getFullYear() - property.summary.yearbuilt;
      if (age < 10) baseValue *= 1.1;
      else if (age > 50) baseValue *= 0.9;
    }

    return baseValue;
  }

  /**
   * Estimate property value based on property characteristics (legacy method)
   * @param property ATTOM property data
   * @param searchRequest Original search request
   * @returns Estimated property value
   */
  /*
  private estimateValueFromProperty(property: AttomProperty, searchRequest: PropertySearchRequest): number {
    const stateAverages: { [key: string]: number } = {
      'CA': 850000, 'NY': 650000, 'FL': 400000, 'TX': 350000,
      'NJ': 500000, 'MA': 650000, 'WA': 750000, 'OH': 200000,
    };

    let baseValue = stateAverages[searchRequest.state || ''] || 400000;
    
    // Adjust based on property characteristics
    if (property.building?.size?.livingSize) {
      const sqftValue = property.building.size.livingSize * (baseValue / 2000); // Assume 2000 sq ft average
      baseValue = sqftValue;
    }

    // Age adjustment
    if (property.summary?.yearbuilt) {
      const age = new Date().getFullYear() - property.summary.yearbuilt;
      if (age < 10) baseValue *= 1.1; // 10% bonus for new properties
      else if (age > 50) baseValue *= 0.9; // 10% discount for old properties
    }

    return baseValue;
  }
  */

  /**
   * Get building permits for a property by address
   * @param searchParams Property search request
   * @returns Promise resolving to building permits response
   */
  async getBuildingPermits(searchParams: PropertySearchRequest): Promise<AttomBuildingPermitResponse> {
    if (!this.apiKey) {
      throw new Error('ATTOM API Key is required. Please set VITE_ATTOM_API_KEY in your .env file.');
    }

    // Build query parameters for GET request
    const params = new URLSearchParams();
    
    // address1 is the street address
    if (searchParams.address) {
      params.append('address1', searchParams.address);
    }
    
    // address2 is city, state zip
    let address2Parts = [];
    if (searchParams.city) address2Parts.push(searchParams.city);
    if (searchParams.state) {
      if (searchParams.zip) {
        address2Parts.push(`${searchParams.state} ${searchParams.zip}`);
      } else {
        address2Parts.push(searchParams.state);
      }
    } else if (searchParams.zip) {
      address2Parts.push(searchParams.zip);
    }
    
    if (address2Parts.length > 0) {
      params.append('address2', address2Parts.join(', '));
    }
    
    // Use direct ATTOM API call with proper headers
    const url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/buildingpermits?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'apikey': this.apiKey
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ATTOM Building Permit API Error:', errorText);
      console.error('Endpoint tried:', url);
      throw new Error(`ATTOM Building Permit API failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if the response indicates "Not found"
    if (data.status === 'Not found') {
      // Return empty result instead of error
      return {
        status: {
          version: '',
          code: 404,
          msg: 'No building permits found for this address',
          total: 0,
          page: 0,
          pagesize: 0
        },
        property: []
      };
    }
    
    if (data.status?.code !== 0 && data.status?.code !== 400) {
      throw new Error(`ATTOM API Error: ${data.status?.msg || 'Unknown error'}`);
    }

    return data;
  }

  /**
   * Search building permits by contractor name or license number
   * Note: ATTOM API may not support contractor-based search directly.
   * This is a placeholder that would need specific endpoint support.
   * @param contractorName Contractor name to search for
   * @param licenseNumber Optional contractor license number
   * @returns Promise resolving to building permits response
   */
  async searchPermitsByContractor(contractorName: string, licenseNumber?: string): Promise<AttomBuildingPermitResponse> {
    if (!this.apiKey) {
      throw new Error('ATTOM API Key is required. Please set VITE_ATTOM_API_KEY in your .env file.');
    }

    // Build query parameters
    const params = new URLSearchParams();
    params.append('contractorname', contractorName);
    
    if (licenseNumber) {
      params.append('contractorlicense', licenseNumber);
    }
    
    // Note: This endpoint may not exist in ATTOM API
    // Contractor-based search might require a different API tier or endpoint
    const url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/buildingpermits?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'apikey': this.apiKey
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ATTOM Building Permit API Error:', errorText);
      console.error('Endpoint tried:', url);
      
      // If contractor search is not supported, return helpful error
      if (response.status === 404 || response.status === 400) {
        throw new Error('Contractor-based permit search is not available with your current ATTOM API subscription. Please contact ATTOM for advanced search capabilities.');
      }
      
      throw new Error(`ATTOM Building Permit API failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if the response indicates "Not found"
    if (data.status === 'Not found') {
      return {
        status: {
          version: '',
          code: 404,
          msg: 'No building permits found for this contractor',
          total: 0,
          page: 0,
          pagesize: 0
        },
        property: []
      };
    }
    
    if (data.status?.code !== 0 && data.status?.code !== 400) {
      throw new Error(`ATTOM API Error: ${data.status?.msg || 'Unknown error'}`);
    }

    return data;
  }

  /**
   * Parse address string into PropertySearchRequest
   * @param addressString Full address string
   * @returns Parsed PropertySearchRequest
   */
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

export const attomApiService = new AttomApiService();