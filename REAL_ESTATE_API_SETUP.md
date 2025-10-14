# Real Estate API Setup Guide

This guide will help you set up real estate APIs to get actual property valuations in your Assemble app.

## Option 1: RealtyMole API (Recommended - Has Free Tier)

### Steps:
1. **Sign up for RapidAPI**: Go to [rapidapi.com](https://rapidapi.com)
2. **Subscribe to RealtyMole**: Search for "RealtyMole Property API"
3. **Get API Key**: Copy your RapidAPI key from your dashboard
4. **Add to Environment**: Create a `.env` file in your project root:

```bash
# Create .env file in your project root
REACT_APP_REALTYMOLE_API_KEY=your_rapidapi_key_here
```

### Pricing:
- **Free Tier**: 500 requests/month
- **Basic**: $29/month - 10,000 requests
- **Pro**: $99/month - 50,000 requests

---

## Option 2: Zillow API (via RapidAPI)

### Steps:
1. **Sign up for RapidAPI**: Go to [rapidapi.com](https://rapidapi.com)
2. **Subscribe to Zillow API**: Search for "Zillow.com API"
3. **Get API Key**: Copy your RapidAPI key
4. **Add to Environment**:

```bash
# Add to your .env file
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key_here
```

### Pricing:
- **Basic**: $10/month - 1,000 requests
- **Pro**: $50/month - 10,000 requests

---

## Option 3: Rentspree Property API

### Steps:
1. **Sign up**: Go to [rentspree.com/api](https://rentspree.com/api)
2. **Get API Key**: From your developer dashboard
3. **Add to Environment**:

```bash
# Add to your .env file
REACT_APP_RENTSPREE_API_KEY=your_api_key_here
```

---

## Setting Up Environment Variables

1. **Create `.env` file** in your project root (next to `package.json`):

```bash
# Real Estate APIs
REACT_APP_REALTYMOLE_API_KEY=your_rapidapi_key_here
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key_here
REACT_APP_RENTSPREE_API_KEY=your_rentspree_key_here
```

2. **Add `.env` to `.gitignore`** (if not already there):

```bash
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

3. **Restart your development server** after adding environment variables:

```bash
npm run dev
```

---

## Testing the Integration

1. **Start your app**: `npm run dev`
2. **Enter a real address**: Try "1600 Pennsylvania Avenue NW, Washington, DC 20500"
3. **Check the results**: You should see real property data or mock data if APIs aren't configured

---

## API Response Examples

### RealtyMole Property Data:
```json
{
  "address": "123 Main St, City, ST 12345",
  "estimatedValue": 475000,
  "valueRange": {
    "low": 427500,
    "high": 522500
  },
  "confidence": "High",
  "propertyDetails": {
    "bedrooms": 3,
    "bathrooms": 2,
    "sqft": 1850,
    "yearBuilt": 1995
  }
}
```

---

## Troubleshooting

### Common Issues:

1. **"API key not found" error**: 
   - Make sure `.env` file is in project root
   - Restart development server after adding keys
   - Check environment variable names match exactly

2. **"Property lookup failed" error**:
   - Verify your API subscription is active
   - Check if address format is correct
   - Some APIs only work with US addresses

3. **CORS errors**:
   - Real estate APIs should work from browser
   - If issues persist, you may need a backend proxy

### Getting Help:
- Check API documentation on RapidAPI
- Test API endpoints in RapidAPI dashboard first
- Contact API providers for specific issues

---

## Next Steps for Production

1. **Choose your preferred API** based on pricing and features
2. **Set up error handling** for failed API requests
3. **Add rate limiting** to prevent API quota overruns
4. **Consider caching** property data to reduce API calls
5. **Set up monitoring** to track API usage and costs

---

## Cost Estimates

For a typical property valuation app:

- **Development/Testing**: Free tiers are sufficient
- **Small Scale** (100 searches/month): ~$10-30/month
- **Medium Scale** (1,000 searches/month): ~$30-100/month  
- **Large Scale** (10,000+ searches/month): ~$100-500/month

The app will automatically fall back to mock data if APIs aren't configured, so you can develop and test without API keys initially.