import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { attomApiService } from '@/services/attomApi';
import type { BuildingPermit } from '@/services/attomApi';
import { FileText, Search, MapPin, Calendar, DollarSign, Building2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from 'react-router-dom';

interface PropertyWithPermits {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  permits: BuildingPermit[];
}

const ContractorPermitsTracking = () => {
  const navigate = useNavigate();
  const [contractorName, setContractorName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groupedPermits, setGroupedPermits] = useState<PropertyWithPermits[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contractorName.trim()) {
      setError('Please enter a contractor name');
      return;
    }

    setLoading(true);
    setError(null);
    setGroupedPermits([]);

    try {
      const response = await attomApiService.searchPermitsByContractor(
        contractorName,
        licenseNumber || undefined
      );

      // Group permits by property
      if (response.property && response.property.length > 0) {
        const properties: PropertyWithPermits[] = response.property.map((prop: any) => ({
          address: `${prop.address?.line1 || ''} ${prop.address?.line2 || ''}`.trim(),
          city: prop.address?.locality,
          state: prop.address?.countrySubd,
          zip: prop.address?.postal1,
          permits: prop.permit || []
        }));

        setGroupedPermits(properties);
      } else {
        setError('No permits found for this contractor');
      }
    } catch (err) {
      console.error('Error searching permits:', err);
      setError(err instanceof Error ? err.message : 'Failed to search permits');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalPermitValue = (permits: BuildingPermit[]) => {
    return permits.reduce((sum, permit) => sum + (permit.estimatedCost || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/contractor/dashboard')}
              className="text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-emerald-900">Permits Tracking</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search Form */}
        <Card className="mb-8 border-emerald-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <Search className="w-6 h-6" />
              Search Your Permits
            </CardTitle>
            <CardDescription className="text-emerald-700">
              Find all properties where you've pulled building permits
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractorName" className="text-emerald-900">
                    Contractor Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contractorName"
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                    placeholder="Enter contractor name"
                    className="border-emerald-200 focus:border-emerald-500"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="text-emerald-900">
                    License Number (Optional)
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="Enter license number"
                    className="border-emerald-200 focus:border-emerald-500"
                    disabled={loading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Permits
                  </>
                )}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        {groupedPermits.length > 0 && (
          <Card className="mb-6 border-emerald-200 bg-gradient-to-r from-emerald-100 to-green-100">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-900">
                    {groupedPermits.length}
                  </p>
                  <p className="text-sm text-emerald-700">Properties</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-900">
                    {groupedPermits.reduce((sum, prop) => sum + prop.permits.length, 0)}
                  </p>
                  <p className="text-sm text-emerald-700">Total Permits</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-900">
                    {formatCurrency(
                      groupedPermits.reduce((sum, prop) => sum + getTotalPermitValue(prop.permits), 0)
                    )}
                  </p>
                  <p className="text-sm text-emerald-700">Total Value</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-900">
                    {new Set(groupedPermits.flatMap(p => p.permits.map(permit => permit.permitType))).size}
                  </p>
                  <p className="text-sm text-emerald-700">Permit Types</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Properties with Permits */}
        {groupedPermits.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-emerald-900">Your Properties</h2>
            {groupedPermits.map((property, propIndex) => (
              <Card key={propIndex} className="border-emerald-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-emerald-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        {property.address || 'Unknown Address'}
                      </CardTitle>
                      {(property.city || property.state || property.zip) && (
                        <CardDescription className="flex items-center gap-2 mt-2 text-emerald-700">
                          <MapPin className="w-4 h-4" />
                          {[property.city, property.state, property.zip].filter(Boolean).join(', ')}
                        </CardDescription>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-700">Total Permits</p>
                      <p className="text-2xl font-bold text-emerald-900">{property.permits.length}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {property.permits.map((permit, permitIndex) => (
                      <Card key={permitIndex} className="border-emerald-100">
                        <CardContent className="pt-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-gray-500">Permit Number</p>
                                <p className="font-semibold text-emerald-900">{permit.permitNumber || 'N/A'}</p>
                              </div>
                              {permit.permitType && (
                                <div>
                                  <p className="text-xs text-gray-500">Type</p>
                                  <p className="text-sm text-gray-800">{permit.permitType}</p>
                                </div>
                              )}
                              {permit.status && (
                                <div>
                                  <p className="text-xs text-gray-500">Status</p>
                                  <p className="text-sm font-medium text-emerald-700">{permit.status}</p>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              {permit.issueDate && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-emerald-600" />
                                  <div>
                                    <p className="text-xs text-gray-500">Issue Date</p>
                                    <p className="text-sm">{formatDate(permit.issueDate)}</p>
                                  </div>
                                </div>
                              )}
                              {permit.estimatedCost && (
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-emerald-600" />
                                  <div>
                                    <p className="text-xs text-gray-500">Estimated Cost</p>
                                    <p className="text-sm font-medium">{formatCurrency(permit.estimatedCost)}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {permit.description && (
                            <div className="mt-3 pt-3 border-t border-emerald-100">
                              <p className="text-xs text-gray-500">Description</p>
                              <p className="text-sm text-gray-800 mt-1">{permit.description}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-emerald-900">Property Total Value:</p>
                      <p className="text-lg font-bold text-emerald-900">
                        {formatCurrency(getTotalPermitValue(property.permits))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && groupedPermits.length === 0 && !error && (
          <Card className="border-emerald-200">
            <CardContent className="pt-12 pb-12">
              <div className="text-center text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No permits found</p>
                <p className="text-sm mt-2">Enter your contractor information above to search for permits</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ContractorPermitsTracking;
