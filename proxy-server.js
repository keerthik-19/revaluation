import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// SearchBug Property Records API proxy
app.post('/api/searchbug-property-search', async (req, res) => {
  try {
    console.log('SearchBug Proxy: Received request:', req.body);
    
    // Prepare form data for SearchBug API in expected schema
    const formData = new URLSearchParams();
    // Required credentials
    formData.append('CO_CODE', req.body.CO_CODE || '');
    formData.append('PASS', req.body.PASS || '');
    // Search parameters
    if (req.body.address) formData.append('address', req.body.address);
    if (req.body.city) formData.append('city', req.body.city);
    if (req.body.state) formData.append('state', req.body.state);
    if (req.body.zip) formData.append('zip', req.body.zip);
    if (req.body['records-per-page']) formData.append('records-per-page', req.body['records-per-page']);
    if (req.body['page-number']) formData.append('page-number', req.body['page-number']);
    
    // SearchBug Property Records API - Correct endpoint from documentation
    const searchbugUrl = 'https://data.searchbug.com/api/search.aspx';
    
    // Add required SearchBug API parameters
    formData.append('TYPE', 'api_prop'); // Required for Property Records API
    formData.append('SRCH', 'A'); // Search by Address
    formData.append('FORMAT', 'JSON'); // Get JSON response
    
    // Map address to WHAT parameter (the search value) - be more specific
    const addressOnly = req.body.address || '';
    formData.append('WHAT', addressOnly);
    
    // Location is required - ZIP code often works best for property searches
    let location = '';
    if (req.body.zip) {
      location = req.body.zip;
    } else if (req.body.state) {
      location = req.body.state; // State as fallback
    } else if (req.body.city && req.body.state) {
      location = `${req.body.city}, ${req.body.state}`;
    } else if (req.body.city) {
      location = req.body.city;
    }
    formData.append('LOCATION', location);
    
    console.log('Making request to SearchBug API with data:', formData.toString());
    
    const response = await fetch(searchbugUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'PropertyValuationApp/1.0',
        'Accept': 'application/json'
      },
      body: formData
    });
    
    console.log('SearchBug API Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('SearchBug API Error Response:', errorText);
      return res.status(response.status).json({ 
        error: `SearchBug API failed: ${response.status} ${response.statusText}`,
        details: errorText
      });
    }
    
    const data = await response.json();
    console.log('SearchBug Proxy: Got response:', data);
    
    res.json(data);
  } catch (error) {
    console.error('SearchBug Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint with SearchBug's working example
app.get('/api/test-searchbug', async (req, res) => {
  try {
    const formData = new URLSearchParams();
    formData.append('CO_CODE', '12719561');
    formData.append('PASS', 'fbc806b6288ad393');
    formData.append('TYPE', 'api_prop');
    formData.append('SRCH', 'A');
    formData.append('FORMAT', 'JSON');
    formData.append('WHAT', '100 SHORT COURT');
    formData.append('LOCATION', 'CHARDON, OH');
    
    const response = await fetch('https://data.searchbug.com/api/search.aspx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ATTOM Data Property API proxy
app.post('/api/attom-property-search', async (req, res) => {
  try {
    console.log('ATTOM Proxy: Received request:', req.body);
    
    const { apiKey, endpoint, params } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'ATTOM API key is required' });
    }
    
    // Build ATTOM API URL
    const baseUrl = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0';
    const url = new URL(`${baseUrl}/${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
    
    console.log('Making request to ATTOM API:', url.toString());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'apikey': apiKey,
        'User-Agent': 'PropertyValuationApp/1.0'
      }
    });
    
    console.log('ATTOM API Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ATTOM API Error Response:', errorText);
      return res.status(response.status).json({ 
        error: `ATTOM API failed: ${response.status} ${response.statusText}`,
        details: errorText
      });
    }
    
    const data = await response.json();
    console.log('ATTOM Proxy: Got response:', data);
    
    res.json(data);
  } catch (error) {
    console.error('ATTOM Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test ATTOM API endpoint
app.get('/api/test-attom', async (req, res) => {
  try {
    const apiKey = '4628251512698c5e094d2ff90168d5d6';
    const testUrl = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address1=4529%20Winona%20Court&address2=Denver%2C%20CO';
    
    console.log('Testing ATTOM API with URL:', testUrl);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'apikey': apiKey
      }
    });
    
    console.log('ATTOM Test Response status:', response.status);
    
    const data = await response.json();
    console.log('ATTOM Test Response:', JSON.stringify(data, null, 2));
    
    res.json({
      status: response.status,
      data: data
    });
  } catch (error) {
    console.error('ATTOM Test Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
