// Test utility for SearchBug Property Records API
// Run this to test your SearchBug API implementation

import { searchBugApiService } from '../services/searchbugApi';
import type { PropertySearchRequest } from '../services/searchbugApi';

/**
 * Test SearchBug Property Records API with a sample address
 */
export async function testSearchBugApi() {
  console.log('Testing SearchBug Property Records API...');
  
  // Sample property search request
  const testRequest: PropertySearchRequest = {
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701'
  };

  try {
    console.log('Search request:', testRequest);
    
    // Test property data retrieval
    console.log('\n1. Testing getPropertyData...');
    const propertyData = await searchBugApiService.getPropertyData(testRequest);
    console.log('Property data response:', JSON.stringify(propertyData, null, 2));

    // Test property valuation
    console.log('\n2. Testing getPropertyValuation...');
    const valuation = await searchBugApiService.getPropertyValuation(testRequest);
    console.log('Property valuation:', JSON.stringify(valuation, null, 2));

    // Test property records with pagination
    console.log('\n3. Testing getPropertyRecords...');
    const records = await searchBugApiService.getPropertyRecords(testRequest, 1, 5);
    console.log('Property records:', JSON.stringify(records, null, 2));

    // Test owner name search
    console.log('\n4. Testing searchByOwnerName...');
    const ownerRecords = await searchBugApiService.searchByOwnerName('Smith', 'Springfield', 'IL');
    console.log('Owner search results:', JSON.stringify(ownerRecords, null, 2));

    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ SearchBug API test failed:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      
      // Check for common issues
      if (error.message.includes('Account Number')) {
        console.log('\n💡 Tip: Make sure you have set VITE_SEARCHBUG_ACCOUNT_NUMBER in your .env file');
      }
      
      if (error.message.includes('API Key')) {
        console.log('\n💡 Tip: Make sure you have set VITE_SEARCHBUG_API_KEY in your .env file');
      }
      
      if (error.message.includes('404') || error.message.includes('endpoint')) {
        console.log('\n💡 Tip: Verify the API endpoint URL is correct');
      }
      
      if (error.message.includes('401') || error.message.includes('403')) {
        console.log('\n💡 Tip: Check your API key is valid and has the right permissions');
      }
    }
  }
}

/**
 * Test individual SearchBug API methods
 */
export const searchBugApiTests = {
  
  // Test property search by address
  async testPropertySearch(address: string, city?: string, state?: string, zip?: string) {
    const request: PropertySearchRequest = { address, city, state, zip };
    console.log(`Testing property search for: ${address}`);
    
    try {
      const result = await searchBugApiService.getPropertyValuation(request);
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('Property search failed:', error);
      throw error;
    }
  },

  // Test owner search
  async testOwnerSearch(ownerName: string, city?: string, state?: string) {
    console.log(`Testing owner search for: ${ownerName}`);
    
    try {
      const result = await searchBugApiService.searchByOwnerName(ownerName, city, state);
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('Owner search failed:', error);
      throw error;
    }
  },

  // Test parcel number search
  async testParcelSearch(parcelNumber: string, county?: string) {
    console.log(`Testing parcel search for: ${parcelNumber}`);
    
    try {
      const result = await searchBugApiService.searchByParcelNumber(parcelNumber, county);
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('Parcel search failed:', error);
      throw error;
    }
  }
};

// Export for use in console or other files
if (typeof window !== 'undefined') {
  // @ts-ignore - Adding to window for browser testing
  window.testSearchBugApi = testSearchBugApi;
  // @ts-ignore - Adding to window for browser testing
  window.searchBugApiTests = searchBugApiTests;
}