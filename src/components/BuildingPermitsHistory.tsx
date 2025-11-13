import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { attomApiService } from '@/services/attomApi';
import type { BuildingPermit } from '@/services/attomApi';
import { FileText, Calendar, DollarSign, User, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BuildingPermitsHistoryProps {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
}

const BuildingPermitsHistory: React.FC<BuildingPermitsHistoryProps> = ({ address, city, state, zip }) => {
  const [permits, setPermits] = useState<BuildingPermit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPermits = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await attomApiService.getBuildingPermits({
        address,
        city,
        state,
        zip
      });

      if (response.property && response.property.length > 0) {
        const propertyPermits = response.property[0].permit || [];
        setPermits(propertyPermits);
      } else {
        setPermits([]);
        setError('No permit data available for this address');
      }
    } catch (err) {
      console.error('Error fetching building permits:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch building permits');
      setPermits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchPermits();
    }
  }, [address, city, state, zip]);

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

  const getPermitTypeColor = (type: string | undefined) => {
    if (!type) return 'bg-gray-100 text-gray-800';
    
    const lowerType = type.toLowerCase();
    if (lowerType.includes('residential')) return 'bg-emerald-100 text-emerald-800';
    if (lowerType.includes('commercial')) return 'bg-blue-100 text-blue-800';
    if (lowerType.includes('electrical')) return 'bg-yellow-100 text-yellow-800';
    if (lowerType.includes('plumbing')) return 'bg-cyan-100 text-cyan-800';
    if (lowerType.includes('mechanical')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('issued') || lowerStatus.includes('approved')) return 'bg-green-100 text-green-800';
    if (lowerStatus.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    if (lowerStatus.includes('expired') || lowerStatus.includes('cancelled')) return 'bg-red-100 text-red-800';
    if (lowerStatus.includes('completed')) return 'bg-emerald-100 text-emerald-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="border-emerald-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Building Permits History
          </CardTitle>
          <Button
            onClick={fetchPermits}
            disabled={loading}
            variant="outline"
            size="sm"
            className="border-emerald-300 hover:bg-emerald-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        )}

        {error && !loading && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && permits.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No building permits found for this property</p>
          </div>
        )}

        {!loading && permits.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Found {permits.length} permit{permits.length !== 1 ? 's' : ''} for this property
            </p>
            
            {permits.map((permit, index) => (
              <Card key={index} className="border-emerald-100 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {/* Permit Number and Type */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Permit Number</p>
                        <p className="font-semibold text-emerald-900">
                          {permit.permitNumber || 'N/A'}
                        </p>
                      </div>
                      {permit.permitType && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPermitTypeColor(permit.permitType)}`}>
                          {permit.permitType}
                        </span>
                      )}
                    </div>

                    {/* Status */}
                    {permit.status && (
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">Status:</p>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(permit.status)}`}>
                          {permit.status}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {permit.description && (
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-sm text-gray-800">{permit.description}</p>
                      </div>
                    )}

                    {/* Work Type */}
                    {permit.workType && (
                      <div>
                        <p className="text-sm text-gray-500">Work Type</p>
                        <p className="text-sm text-gray-800">{permit.workType}</p>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-emerald-100">
                      {permit.issueDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <div>
                            <p className="text-xs text-gray-500">Issue Date</p>
                            <p className="text-sm font-medium">{formatDate(permit.issueDate)}</p>
                          </div>
                        </div>
                      )}
                      {permit.completionDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <div>
                            <p className="text-xs text-gray-500">Completion</p>
                            <p className="text-sm font-medium">{formatDate(permit.completionDate)}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cost */}
                    {permit.estimatedCost && (
                      <div className="flex items-center gap-2 pt-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="text-xs text-gray-500">Estimated Cost</p>
                          <p className="text-sm font-medium">{formatCurrency(permit.estimatedCost)}</p>
                        </div>
                      </div>
                    )}

                    {/* Contractor Info */}
                    {(permit.contractorName || permit.contractorLicense) && (
                      <div className="pt-3 border-t border-emerald-100">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald-600" />
                          <p className="text-xs text-gray-500 font-medium">Contractor</p>
                        </div>
                        {permit.contractorName && (
                          <p className="text-sm text-gray-800 mt-1">{permit.contractorName}</p>
                        )}
                        {permit.contractorLicense && (
                          <p className="text-xs text-gray-600">License: {permit.contractorLicense}</p>
                        )}
                        {permit.contractorPhone && (
                          <p className="text-xs text-gray-600">Phone: {permit.contractorPhone}</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BuildingPermitsHistory;
