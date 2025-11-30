import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Plus, FileText, Calendar, MapPin } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';

interface Permit {
  id: string;
  projectName: string;
  permitType: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submittedDate: string;
  expiryDate?: string;
  permitNumber?: string;
  address: string;
}

const Permits: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');
  const [showNewPermitForm, setShowNewPermitForm] = useState(false);

  const mockPermits: Permit[] = [
    {
      id: '1',
      projectName: 'Kitchen Renovation - Smith Residence',
      permitType: 'Building Permit',
      status: 'approved',
      submittedDate: '2024-10-01',
      expiryDate: '2025-10-01',
      permitNumber: 'BP-2024-1234',
      address: '123 Main St, Boston, MA'
    },
    {
      id: '2',
      projectName: 'Bathroom Remodel - Wilson Home',
      permitType: 'Plumbing Permit',
      status: 'pending',
      submittedDate: '2024-10-20',
      address: '456 Oak Ave, Cambridge, MA'
    },
    {
      id: '3',
      projectName: 'Home Addition - Davis Property',
      permitType: 'Electrical Permit',
      status: 'approved',
      submittedDate: '2024-09-15',
      expiryDate: '2025-09-15',
      permitNumber: 'EP-2024-5678',
      address: '789 Pine Rd, Somerville, MA'
    }
  ];

  const filteredPermits = mockPermits.filter(permit => {
    if (activeTab === 'all') return true;
    return permit.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/contractor/dashboard')}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold" style={{color: 'black'}}>Permits Management</h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{color: 'black'}}>Permits</h2>
            <p className="text-gray-600">Track and manage construction permits for your projects</p>
          </div>
          <Button 
            onClick={() => setShowNewPermitForm(true)}
            style={{backgroundColor: '#3B82F6', color: 'white'}}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Permit Application
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            style={activeTab === 'all' ? {backgroundColor: '#3B82F6', color: 'white'} : {borderColor: '#6B7280', color: '#6B7280'}}
          >
            All Permits ({mockPermits.length})
          </Button>
          <Button 
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
            style={activeTab === 'pending' ? {backgroundColor: '#F59E0B', color: 'white'} : {borderColor: '#6B7280', color: '#6B7280'}}
          >
            Pending ({mockPermits.filter(p => p.status === 'pending').length})
          </Button>
          <Button 
            variant={activeTab === 'approved' ? 'default' : 'outline'}
            onClick={() => setActiveTab('approved')}
            style={activeTab === 'approved' ? {backgroundColor: '#10B981', color: 'white'} : {borderColor: '#6B7280', color: '#6B7280'}}
          >
            Approved ({mockPermits.filter(p => p.status === 'approved').length})
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredPermits.map(permit => {
            const statusColor = 
              permit.status === 'approved' ? '#10B981' :
              permit.status === 'pending' ? '#F59E0B' :
              permit.status === 'rejected' ? '#EF4444' : '#6B7280';
            
            return (
            <Card key={permit.id} className="p-6 border-l-4" style={{borderLeftColor: statusColor}}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{backgroundColor: statusColor + '20'}}>
                          <FileText className="h-5 w-5" style={{color: statusColor}} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {permit.projectName}
                        </h3>
                      </div>
                      <Badge 
                        className="ml-2"
                        style={{
                          backgroundColor: statusColor + '20',
                          color: statusColor,
                          borderColor: statusColor
                        }}
                      >
                        {permit.status.charAt(0).toUpperCase() + permit.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-2 text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>{permit.permitType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-4 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{permit.address}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Submitted: {permit.submittedDate}</span>
                      </div>
                      {permit.expiryDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Expires: {permit.expiryDate}</span>
                        </div>
                      )}
                      {permit.permitNumber && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Permit #: {permit.permitNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    View Details
                  </Button>
                  {permit.status === 'approved' && (
                    <Button variant="outline" size="sm" style={{borderColor: '#10B981', color: '#10B981'}}>
                      Download PDF
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
          })}
        </div>

        {showNewPermitForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewPermitForm(false)}>
            <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>New Permit Application</h2>
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNewPermitForm(false)}
                  >
                    ×
                  </Button>
                </div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Project Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter project name" 
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Permit Type</label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select permit type</option>
                      <option value="building">Building Permit</option>
                      <option value="electrical">Electrical Permit</option>
                      <option value="plumbing">Plumbing Permit</option>
                      <option value="mechanical">Mechanical Permit</option>
                      <option value="demolition">Demolition Permit</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Property Address</label>
                    <input 
                      type="text" 
                      placeholder="Enter property address" 
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Description of Work</label>
                    <textarea 
                      rows={4} 
                      placeholder="Describe the work to be done"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowNewPermitForm(false)}
                      style={{borderColor: '#10B981', color: '#10B981'}}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      style={{backgroundColor: '#059669', color: 'white'}}
                      className="flex-1"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Permits;
