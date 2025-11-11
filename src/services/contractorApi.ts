// Contractor Locating Service
// Uses ATTOM API data and third-party contractor databases to locate contractors

export interface Contractor {
  id: string;
  name: string;
  companyName: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  licenseNumber: string;
  yearsInBusiness: number;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  serviceArea: string[];
  verified: boolean;
  insurance: boolean;
  bondedAndInsured: boolean;
  photoUrl?: string;
  website?: string;
  priceRange: 'budget' | 'mid-range' | 'premium';
  completedProjects: number;
}

export interface ContractorSearchRequest {
  location: string;
  city?: string;
  state?: string;
  zip?: string;
  specialty?: string;
  radius?: number; // in miles
  minRating?: number;
  priceRange?: 'budget' | 'mid-range' | 'premium';
}

export interface ContractorSearchResponse {
  contractors: Contractor[];
  total: number;
  location: string;
}

class ContractorApiService {
  // Note: ATTOM API key and proxy URL will be used when integrating with real contractor databases
  // For now, using mock data

  /**
   * Search for contractors in a specific area
   */
  async searchContractors(request: ContractorSearchRequest): Promise<ContractorSearchResponse> {
    // For now, return mock data since we need to integrate with contractor databases
    // In production, this would call ATTOM API for location data and contractor databases
    
    console.log('Searching for contractors:', request);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return this.getMockContractors(request);
  }

  /**
   * Get contractor details by ID
   */
  async getContractorById(contractorId: string): Promise<Contractor | null> {
    console.log('Fetching contractor:', contractorId);
    
    const mockContractors = this.getMockContractors({ location: 'any' });
    return mockContractors.contractors.find(c => c.id === contractorId) || null;
  }

  /**
   * Get contractors by specialty
   */
  async getContractorsBySpecialty(
    specialty: string,
    location: string
  ): Promise<ContractorSearchResponse> {
    return this.searchContractors({
      location,
      specialty
    });
  }

  /**
   * Verify contractor license using ATTOM data
   * In production, this would call state licensing databases
   */
  async verifyContractor(licenseNumber: string, state: string): Promise<{
    verified: boolean;
    status: string;
    expirationDate?: string;
  }> {
    console.log(`Verifying contractor license ${licenseNumber} in ${state}`);
    
    // Mock verification
    return {
      verified: true,
      status: 'Active',
      expirationDate: '2025-12-31'
    };
  }

  /**
   * Get contractors near a property using ATTOM location data
   */
  async getContractorsNearProperty(
    _address: string,
    city: string,
    state: string,
    zip: string,
    specialty?: string
  ): Promise<ContractorSearchResponse> {
    const location = `${city}, ${state} ${zip}`;
    
    // In production, _address would be used to get precise location data from ATTOM API
    return this.searchContractors({
      location,
      city,
      state,
      zip,
      specialty,
      radius: 25
    });
  }

  /**
   * Get mock contractor data
   * In production, this would integrate with:
   * - HomeAdvisor API
   * - Angi (Angie's List) API
   * - Thumbtack API
   * - Local contractor databases
   * - State licensing databases
   */
  private getMockContractors(request: ContractorSearchRequest): ContractorSearchResponse {
    const mockData: Contractor[] = [
      {
        id: 'c1',
        name: 'John Smith',
        companyName: 'Premier Renovations LLC',
        specialties: ['Kitchen Remodeling', 'Bathroom Renovation', 'General Contracting'],
        rating: 4.9,
        reviewCount: 127,
        licenseNumber: 'CL-12345',
        yearsInBusiness: 15,
        phone: '(555) 123-4567',
        email: 'john@premierreno.com',
        address: '123 Main St',
        city: request.city || 'San Francisco',
        state: request.state || 'CA',
        zip: request.zip || '94102',
        serviceArea: ['San Francisco', 'Oakland', 'San Jose'],
        verified: true,
        insurance: true,
        bondedAndInsured: true,
        website: 'https://premierreno.com',
        priceRange: 'premium',
        completedProjects: 250
      },
      {
        id: 'c2',
        name: 'Maria Garcia',
        companyName: 'Quality Home Improvements',
        specialties: ['Kitchen Remodeling', 'Flooring', 'Painting'],
        rating: 4.8,
        reviewCount: 89,
        licenseNumber: 'CL-23456',
        yearsInBusiness: 10,
        phone: '(555) 234-5678',
        email: 'maria@qualityhome.com',
        address: '456 Oak Ave',
        city: request.city || 'San Francisco',
        state: request.state || 'CA',
        zip: request.zip || '94103',
        serviceArea: ['San Francisco', 'Daly City', 'South San Francisco'],
        verified: true,
        insurance: true,
        bondedAndInsured: true,
        website: 'https://qualityhome.com',
        priceRange: 'mid-range',
        completedProjects: 180
      },
      {
        id: 'c3',
        name: 'David Chen',
        companyName: 'Modern Build & Design',
        specialties: ['Bathroom Renovation', 'Tile Work', 'Plumbing'],
        rating: 4.7,
        reviewCount: 64,
        licenseNumber: 'CL-34567',
        yearsInBusiness: 8,
        phone: '(555) 345-6789',
        email: 'david@modernbuild.com',
        address: '789 Pine St',
        city: request.city || 'San Francisco',
        state: request.state || 'CA',
        zip: request.zip || '94104',
        serviceArea: ['San Francisco', 'Berkeley', 'Richmond'],
        verified: true,
        insurance: true,
        bondedAndInsured: true,
        priceRange: 'mid-range',
        completedProjects: 120
      },
      {
        id: 'c4',
        name: 'Sarah Johnson',
        companyName: 'Energy Smart Renovations',
        specialties: ['Energy-Efficient Upgrades', 'Window Installation', 'Insulation'],
        rating: 4.9,
        reviewCount: 98,
        licenseNumber: 'CL-45678',
        yearsInBusiness: 12,
        phone: '(555) 456-7890',
        email: 'sarah@energysmart.com',
        address: '321 Elm St',
        city: request.city || 'San Francisco',
        state: request.state || 'CA',
        zip: request.zip || '94105',
        serviceArea: ['San Francisco', 'San Mateo', 'Palo Alto'],
        verified: true,
        insurance: true,
        bondedAndInsured: true,
        website: 'https://energysmart.com',
        priceRange: 'premium',
        completedProjects: 200
      },
      {
        id: 'c5',
        name: 'Robert Williams',
        companyName: 'Budget Home Solutions',
        specialties: ['General Contracting', 'Painting', 'Carpentry'],
        rating: 4.5,
        reviewCount: 156,
        licenseNumber: 'CL-56789',
        yearsInBusiness: 20,
        phone: '(555) 567-8901',
        email: 'rob@budgethome.com',
        address: '654 Birch Rd',
        city: request.city || 'San Francisco',
        state: request.state || 'CA',
        zip: request.zip || '94106',
        serviceArea: ['San Francisco', 'Alameda', 'San Leandro'],
        verified: true,
        insurance: true,
        bondedAndInsured: false,
        priceRange: 'budget',
        completedProjects: 400
      },
      {
        id: 'c6',
        name: 'Jennifer Lee',
        companyName: 'Luxury Living Renovations',
        specialties: ['High-End Remodeling', 'Kitchen Remodeling', 'Basement Finishing'],
        rating: 5.0,
        reviewCount: 42,
        licenseNumber: 'CL-67890',
        yearsInBusiness: 7,
        phone: '(555) 678-9012',
        email: 'jennifer@luxuryliving.com',
        address: '987 Cedar Ln',
        city: request.city || 'San Francisco',
        state: request.state || 'CA',
        zip: request.zip || '94107',
        serviceArea: ['San Francisco', 'Marin County', 'Napa'],
        verified: true,
        insurance: true,
        bondedAndInsured: true,
        website: 'https://luxuryliving.com',
        priceRange: 'premium',
        completedProjects: 85
      }
    ];

    // Filter by specialty if provided
    let filtered = mockData;
    if (request.specialty) {
      filtered = filtered.filter(c => 
        c.specialties.some(s => 
          s.toLowerCase().includes(request.specialty!.toLowerCase())
        )
      );
    }

    // Filter by rating if provided
    if (request.minRating) {
      filtered = filtered.filter(c => c.rating >= request.minRating!);
    }

    // Filter by price range if provided
    if (request.priceRange) {
      filtered = filtered.filter(c => c.priceRange === request.priceRange);
    }

    // Sort by rating descending
    filtered.sort((a, b) => b.rating - a.rating);

    return {
      contractors: filtered,
      total: filtered.length,
      location: request.location
    };
  }
}

export const contractorApiService = new ContractorApiService();
