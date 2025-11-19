import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

if (!stripe) {
  console.warn('⚠️  Stripe secret key not found. Payment endpoints will be disabled.');
}

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

// Stripe payment intent endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Payment processing is not configured' });
  }

  try {
    const { amount, currency = 'usd', description, metadata } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    console.log('Creating payment intent:', { amount, currency, description });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      description,
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Confirm payment status endpoint
app.get('/api/payment-status/:paymentIntentId', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Payment processing is not configured' });
  }

  try {
    const { paymentIntentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error('Stripe payment status error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Invoice Management Endpoints

// Get all invoices for a project
app.get('/api/invoices/project/:projectId', (req, res) => {
  try {
    const { projectId } = req.params;
    // Mock data - will be replaced with database queries
    const invoices = [
      {
        id: `invoice-1-${projectId}`,
        projectId,
        milestoneId: `milestone-10-${projectId}`,
        invoiceNumber: `INV-${projectId.slice(0, 8)}-001`,
        homeownerId: 'homeowner-1',
        contractorId: 'contractor-1',
        amount: 1000,
        percentage: 10,
        description: 'Foundation and site preparation',
        issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'paid',
        paidDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'stripe',
      },
      {
        id: `invoice-2-${projectId}`,
        projectId,
        milestoneId: `milestone-20-${projectId}`,
        invoiceNumber: `INV-${projectId.slice(0, 8)}-002`,
        homeownerId: 'homeowner-1',
        contractorId: 'contractor-1',
        amount: 1000,
        percentage: 20,
        description: 'Framing and structural work',
        issueDate: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'paid',
        paidDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'stripe',
      },
      {
        id: `invoice-3-${projectId}`,
        projectId,
        milestoneId: `milestone-30-${projectId}`,
        invoiceNumber: `INV-${projectId.slice(0, 8)}-003`,
        homeownerId: 'homeowner-1',
        contractorId: 'contractor-1',
        amount: 1000,
        percentage: 30,
        description: 'Electrical and plumbing installation',
        issueDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'sent',
      },
    ];
    
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single invoice
app.get('/api/invoices/:invoiceId', (req, res) => {
  try {
    const { invoiceId } = req.params;
    // Mock data - will be replaced with database query
    const invoice = {
      id: invoiceId,
      projectId: 'project-1',
      milestoneId: 'milestone-30',
      invoiceNumber: `INV-${invoiceId.slice(0, 8)}-003`,
      homeownerId: 'homeowner-1',
      contractorId: 'contractor-1',
      amount: 1000,
      percentage: 30,
      description: 'Electrical and plumbing installation',
      issueDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'sent',
    };
    
    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create payment intent for an invoice
app.post('/api/invoices/:invoiceId/payment-intent', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Payment processing is not configured' });
  }

  try {
    const { invoiceId } = req.params;
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    console.log('Creating payment intent for invoice:', { invoiceId, amount, description });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      description: description || `Invoice ${invoiceId}`,
      metadata: {
        invoiceId,
        type: 'invoice_payment',
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent for invoice:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update invoice payment status
app.patch('/api/invoices/:invoiceId/status', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { status, paymentIntentId, paymentMethod } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    console.log('Updating invoice status:', { invoiceId, status, paymentIntentId });

    // Mock response - will be replaced with database update
    const updatedInvoice = {
      id: invoiceId,
      status,
      paidDate: status === 'paid' ? new Date().toISOString() : undefined,
      paymentIntentId,
      paymentMethod,
    };

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Catch-all route: serve React app for any non-API routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
});
