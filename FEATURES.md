# New Features Documentation

## Overview
This document describes the newly implemented features for the Assemble renovation platform.

## Features Implemented

### 1. User Authentication System
Complete signup and login system with support for both homeowners and contractors.

#### Components
- **SignupPage** (`src/pages/SignupPage.tsx`)
  - User type selection (Homeowner/Contractor)
  - Separate form fields for contractors (license, company name, experience)
  - Password confirmation validation
  - Links to login page

- **LoginPage** (`src/pages/LoginPage.tsx`)
  - Email/password authentication
  - Forgot password link (placeholder)
  - Links to signup page

#### Routes
- `/signup` - User registration
- `/login` - User authentication

#### Styling
- Modern gradient design with purple theme
- Responsive layout for mobile and desktop
- Styled in `src/styles/AuthPages.css`

#### TODO for Production
- Implement backend authentication API
- Add JWT token management
- Implement password reset functionality
- Add OAuth providers (Google, Facebook)
- Add email verification

### 2. Clickable Logo Navigation
The Assemble logo now functions as a home button throughout the application.

#### Changes
- Updated `Logo` component to accept `onClick` prop
- Default behavior navigates to homepage (`/`)
- Cursor changes to pointer on hover
- Works across all pages that use the Logo component

### 3. AI-Powered Renovation Recommendations
Intelligent renovation recommendations using AI APIs (OpenAI or Anthropic).

#### Service API (`src/services/aiApi.ts`)

**Features:**
- Get renovation recommendations based on property data
- Chat interface for renovation questions
- ROI analysis for specific renovations
- Supports both OpenAI (GPT-4) and Anthropic (Claude)
- Graceful fallback to mock data when API keys not configured

**Key Methods:**
```typescript
// Get AI-powered recommendations
aiApiService.getRenovationRecommendations(
  propertyValue: number,
  propertyType: string,
  location: string,
  yearBuilt?: number
)

// Chat with AI
aiApiService.chat({
  messages: ChatMessage[],
  propertyContext?: {
    address: string,
    propertyValue: number,
    propertyType?: string,
    yearBuilt?: number
  }
})

// Get ROI analysis
aiApiService.getROIAnalysis(
  renovationType: string,
  propertyValue: number,
  location: string
)
```

**Configuration:**
Add one of these to your `.env` file:
```bash
# For OpenAI (GPT-4)
VITE_OPENAI_API_KEY=sk-your-key-here

# OR for Anthropic (Claude)
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Mock Data:**
When no API key is configured, the service returns realistic mock renovation recommendations including:
- Kitchen Remodel (85% ROI)
- Bathroom Upgrade (75% ROI)
- Energy-Efficient Windows (70% ROI)
- Landscaping & Curb Appeal (100% ROI)
- Basement Finishing (65% ROI)

### 4. Contractor Locating Service
Find and connect with local contractors using ATTOM API location data.

#### Service API (`src/services/contractorApi.ts`)

**Features:**
- Search contractors by location and specialty
- Filter by rating, price range, and service area
- Verify contractor licenses
- Get contractors near a specific property
- Mock data with realistic contractor profiles

**Key Methods:**
```typescript
// Search for contractors
contractorApiService.searchContractors({
  location: string,
  city?: string,
  state?: string,
  zip?: string,
  specialty?: string,
  radius?: number,
  minRating?: number,
  priceRange?: 'budget' | 'mid-range' | 'premium'
})

// Get contractors near property
contractorApiService.getContractorsNearProperty(
  address: string,
  city: string,
  state: string,
  zip: string,
  specialty?: string
)

// Verify contractor license
contractorApiService.verifyContractor(
  licenseNumber: string,
  state: string
)

// Get contractor by ID
contractorApiService.getContractorById(contractorId: string)
```

**Contractor Data Includes:**
- Name and company information
- Specialties (Kitchen, Bathroom, General, etc.)
- Ratings and review counts
- License verification status
- Years in business
- Contact information
- Service area
- Insurance and bonding status
- Price range category
- Completed projects count

**Mock Contractors:**
Currently returns 6 mock contractors with varied:
- Specialties (Kitchen, Bathroom, Energy-Efficient, etc.)
- Price ranges (Budget, Mid-range, Premium)
- Ratings (4.5 - 5.0 stars)
- Service areas in San Francisco Bay Area

**TODO for Production:**
- Integrate with real contractor databases:
  - HomeAdvisor API
  - Angi (Angie's List) API
  - Thumbtack API
- Connect to state licensing databases
- Add real-time availability checking
- Implement contractor matching algorithm
- Add review and rating system

## Environment Variables

Required environment variables in `.env`:

```bash
# ATTOM API (for property data)
VITE_ATTOM_API_KEY=your_attom_api_key_here

# AI API (choose one)
VITE_OPENAI_API_KEY=your_openai_api_key_here
# OR
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: Proxy server URL
VITE_PROXY_URL=http://localhost:3001

# Development mode
VITE_USE_MOCK_DATA=true
```

## Usage Examples

### Using AI Recommendations in a Component

```typescript
import { aiApiService } from '../services/aiApi';

// Get recommendations
const analysis = await aiApiService.getRenovationRecommendations(
  500000, // property value
  'Single Family',
  'San Francisco, CA',
  1995 // year built
);

console.log(analysis.recommendations); // Array of RenovationRecommendation
console.log(analysis.summary); // AI-generated summary
console.log(analysis.marketTrends); // Current market insights
```

### Finding Contractors

```typescript
import { contractorApiService } from '../services/contractorApi';

// Search for kitchen contractors
const results = await contractorApiService.searchContractors({
  location: 'San Francisco, CA',
  specialty: 'Kitchen Remodeling',
  minRating: 4.5,
  priceRange: 'mid-range'
});

console.log(results.contractors); // Array of matching contractors
console.log(results.total); // Total count
```

### Using Authentication Pages

```typescript
// Navigate to signup
navigate('/signup');

// Navigate to login
navigate('/login');

// After successful auth, navigate to dashboard
navigate('/dashboard');
```

## Integration Checklist

- [x] Sign up pages created
- [x] Login page created
- [x] Logo navigation implemented
- [x] AI API service created
- [x] Contractor API service created
- [x] Routes added to App.tsx
- [x] Environment variables documented
- [ ] Backend authentication API
- [ ] Real AI API integration
- [ ] Real contractor database integration
- [ ] Testing on all pages

## Next Steps

1. **Backend Development**
   - Create authentication API endpoints
   - Set up database for user accounts
   - Implement JWT token management
   - Add password hashing and security

2. **AI Integration**
   - Obtain OpenAI or Anthropic API key
   - Test AI recommendations with real data
   - Fine-tune prompts for better results
   - Implement rate limiting and caching

3. **Contractor Database**
   - Partner with contractor databases
   - Implement real contractor search
   - Add contractor verification system
   - Build review and rating system

4. **UI/UX Enhancements**
   - Add loading states
   - Implement error boundaries
   - Add toast notifications
   - Create contractor comparison tool
   - Build AI chat interface component

5. **Testing**
   - Unit tests for services
   - Integration tests for auth flow
   - E2E tests for critical paths
   - Performance testing

## Support

For questions or issues with these features, please contact the development team or create an issue in the repository.
