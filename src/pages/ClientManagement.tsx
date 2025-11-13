import { useState } from 'react';
import { Mail, Phone, FileText, TrendingUp, Eye, Users, Plus, X, MapPin, CheckSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";
import { Progress } from "../components/ui/progress";

interface Client {
  id: string;
  name: string;
  project: string;
  status: string;
  progress: number;
  email?: string;
  phone?: string;
  address?: string;
  startDate?: string;
  budget?: number;
  permits?: Permit[];
}

interface Permit {
  id: string;
  type: string;
  status: string;
  submittedDate?: string;
  approvalDate?: string;
}

const ClientManagement = () => {
  const navigate = useNavigate();
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPermitsModal, setShowPermitsModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showViewProgressModal, setShowViewProgressModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newProgress, setNewProgress] = useState(0);
  const [progressNotes, setProgressNotes] = useState('');

  // Mock data - replace with real data later (Past Completed Clients)
  const [clients, setClients] = useState<Client[]>([
    { 
      id: "1", 
      name: "Allision Smith", 
      project: "Kitchen Remodel", 
      status: "Completed", 
      progress: 100,
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Boston, MA",
      startDate: "2024-10-01",
      budget: 45000,
      permits: [
        { id: "P1", type: "Building Permit", status: "Approved", submittedDate: "2024-09-20", approvalDate: "2024-09-28" },
        { id: "P2", type: "Electrical Permit", status: "Approved", submittedDate: "2024-10-05", approvalDate: "2024-10-12" }
      ]
    },
    { 
      id: "2", 
      name: "Nate Johnson", 
      project: "Bathroom Renovation", 
      status: "Completed", 
      progress: 100,
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, Cambridge, MA",
      startDate: "2024-10-20",
      budget: 28000,
      permits: [
        { id: "P3", type: "Plumbing Permit", status: "Approved", submittedDate: "2024-10-15", approvalDate: "2024-10-22" }
      ]
    },
    { 
      id: "3", 
      name: "Frank Davis", 
      project: "Deck Addition", 
      status: "Completed", 
      progress: 100,
      email: "mike.davis@email.com",
      phone: "(555) 345-6789",
      address: "789 Pine Rd, Somerville, MA",
      startDate: "2024-09-15",
      budget: 35000,
      permits: [
        { id: "P4", type: "Building Permit", status: "Approved", submittedDate: "2024-09-05", approvalDate: "2024-09-12" }
      ]
    },
  ]);

  const handleContactClient = (client: Client) => {
    setSelectedClient(client);
    setShowContactModal(true);
  };

  const handleViewPermits = (client: Client) => {
    setSelectedClient(client);
    setShowPermitsModal(true);
  };

  const handleUpdateProgress = (client: Client) => {
    setSelectedClient(client);
    setNewProgress(client.progress);
    setProgressNotes('');
    setShowProgressModal(true);
  };

  const handleViewProgress = (client: Client) => {
    setSelectedClient(client);
    setShowViewProgressModal(true);
  };

  const handleViewTasks = (client: Client) => {
    setSelectedClient(client);
    setShowTasksModal(true);
  };

  const saveProgress = () => {
    if (selectedClient) {
      setClients(clients.map(c => 
        c.id === selectedClient.id ? { ...c, progress: newProgress } : c
      ));
      setShowProgressModal(false);
      alert(`Progress updated to ${newProgress}% for ${selectedClient.name}`);
    }
  };

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClient: Client = {
      id: String(clients.length + 1),
      name: formData.get('name') as string,
      project: formData.get('project') as string,
      status: 'Planning',
      progress: 0,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      startDate: formData.get('startDate') as string,
      budget: Number(formData.get('budget')),
      permits: []
    };
    setClients([...clients, newClient]);
    setShowAddClientModal(false);
  };

  const sendEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const makeCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{color: '#10B981'}}>Client Management</h1>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contractor/dashboard")}
                className="gap-2"
                style={{borderColor: '#10B981', color: '#10B981'}}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{color: '#10B981'}}>Manage Your Clients</h2>
            <p style={{color: '#10B981'}}>
              Contact clients, track permits, and manage project progress
            </p>
          </div>
          <Button className="gap-2" style={{backgroundColor: '#059669', color: 'white'}} onClick={() => setShowAddClientModal(true)}>
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow relative">
              <CardHeader>
                <div className="absolute top-4 right-4">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="gap-1 h-8 px-2" 
                    style={{color: '#10B981'}}
                    onClick={() => handleUpdateProgress(client)}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Update
                  </Button>
                </div>
                <CardTitle className="flex items-center gap-2 pr-20" style={{color: '#10B981'}}>
                  <Users className="h-5 w-5 text-primary" />
                  {client.name}
                </CardTitle>
                <CardDescription style={{color: '#10B981'}}>{client.project}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{color: '#10B981'}}>Progress</span>
                    <span className="text-sm" style={{color: '#10B981'}}>{client.progress}%</span>
                  </div>
                  <Progress value={client.progress} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{color: '#10B981'}}>Status</span>
                  <span className="text-sm font-medium text-primary">{client.status}</span>
                </div>
                
                {/* 4 Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2" 
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    onClick={() => handleContactClient(client)}
                  >
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2" 
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    onClick={() => handleViewPermits(client)}
                  >
                    <FileText className="h-4 w-4" />
                    Permits
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-2" 
                    style={{backgroundColor: '#059669', color: 'white'}}
                    onClick={() => handleViewTasks(client)}
                  >
                    <CheckSquare className="h-4 w-4" />
                    Tasks
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-2" 
                    style={{backgroundColor: '#10B981', color: 'white'}}
                    onClick={() => handleViewProgress(client)}
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddClientModal(false)}>
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Add New Client</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddClientModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Client Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Project Name *</label>
                    <input 
                      type="text" 
                      name="project"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="Kitchen Remodel"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="client@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{color: '#10B981'}}>Address</label>
                  <input 
                    type="text" 
                    name="address"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="123 Main St, City, State ZIP"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Start Date</label>
                    <input 
                      type="date" 
                      name="startDate"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Budget</label>
                    <input 
                      type="number" 
                      name="budget"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="50000"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddClientModal(false)}
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
                    Add Client
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Contact Client Modal */}
      {showContactModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
          <Card className="w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Contact Client</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowContactModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                <div className="space-y-4">
                  {selectedClient.email && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium" style={{color: '#10B981'}}>Email</p>
                          <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.email}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        style={{backgroundColor: '#059669', color: 'white'}}
                        onClick={() => sendEmail(selectedClient.email!)}
                      >
                        Send Email
                      </Button>
                    </div>
                  )}
                  
                  {selectedClient.phone && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium" style={{color: '#10B981'}}>Phone</p>
                          <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.phone}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        style={{backgroundColor: '#059669', color: 'white'}}
                        onClick={() => makeCall(selectedClient.phone!)}
                      >
                        Call
                      </Button>
                    </div>
                  )}
                  
                  {selectedClient.address && (
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Address</p>
                          <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.address}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => setShowContactModal(false)}
                  style={{backgroundColor: '#059669', color: 'white'}}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Client Permits Modal */}
      {showPermitsModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPermitsModal(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Client Permits</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowPermitsModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                {selectedClient.permits && selectedClient.permits.length > 0 ? (
                  <div className="space-y-4">
                    {selectedClient.permits.map((permit) => (
                      <div key={permit.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold" style={{color: '#10B981'}}>{permit.type}</h4>
                            <p className="text-sm" style={{color: '#10B981'}}>ID: {permit.id}</p>
                          </div>
                          <span 
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              permit.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              permit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {permit.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {permit.submittedDate && (
                            <div>
                              <p className="font-medium" style={{color: '#10B981'}}>Submitted</p>
                              <p style={{color: '#10B981'}}>{new Date(permit.submittedDate).toLocaleDateString()}</p>
                            </div>
                          )}
                          {permit.approvalDate && (
                            <div>
                              <p className="font-medium" style={{color: '#10B981'}}>Approved</p>
                              <p style={{color: '#10B981'}}>{new Date(permit.approvalDate).toLocaleDateString()}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p style={{color: '#10B981'}}>No permits on file</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowPermitsModal(false)}
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowPermitsModal(false);
                      navigate('/contractor/permits');
                    }}
                    style={{backgroundColor: '#059669', color: 'white'}}
                    className="flex-1"
                  >
                    Add New Permit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Update Progress Modal */}
      {showProgressModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowProgressModal(false)}>
          <Card className="w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Update Progress</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowProgressModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-1" style={{color: '#10B981'}}>{selectedClient.name}</p>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium" style={{color: '#10B981'}}>Progress</label>
                    <span className="text-2xl font-bold" style={{color: '#10B981'}}>{newProgress}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <Progress value={newProgress} className="h-3" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{color: '#10B981'}}>Progress Notes (Optional)</label>
                  <textarea 
                    value={progressNotes}
                    onChange={(e) => setProgressNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]" 
                    placeholder="Add notes about this progress update..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowProgressModal(false)}
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={saveProgress}
                    style={{backgroundColor: '#059669', color: 'white'}}
                    className="flex-1"
                  >
                    Save Progress
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* View Progress Modal */}
      {showViewProgressModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowViewProgressModal(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Project Progress</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowViewProgressModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-medium" style={{color: '#10B981'}}>Overall Progress</p>
                    <p className="text-4xl font-bold" style={{color: '#10B981'}}>{selectedClient.progress}%</p>
                  </div>
                  <Progress value={selectedClient.progress} className="h-4" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Status</p>
                    <p className="text-lg font-semibold" style={{color: '#10B981'}}>{selectedClient.status}</p>
                  </div>
                  {selectedClient.startDate && (
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Start Date</p>
                      <p className="text-lg font-semibold" style={{color: '#10B981'}}>
                        {new Date(selectedClient.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {selectedClient.budget && (
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Budget</p>
                      <p className="text-lg font-semibold" style={{color: '#10B981'}}>
                        ${selectedClient.budget.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {selectedClient.permits && (
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Permits</p>
                      <p className="text-lg font-semibold" style={{color: '#10B981'}}>
                        {selectedClient.permits.length} Active
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowViewProgressModal(false)}
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowViewProgressModal(false);
                      handleUpdateProgress(selectedClient);
                    }}
                    style={{backgroundColor: '#059669', color: 'white'}}
                    className="flex-1"
                  >
                    Update Progress
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Client Tasks Modal */}
      {showTasksModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTasksModal(false)}>
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Client Tasks - Completed</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowTasksModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                {/* Completed Tasks - Past Clients */}
                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <div>
                          <h4 className="font-semibold line-through text-gray-500">Schedule site inspection</h4>
                          <p className="text-sm text-gray-500">Completed on Oct 15, 2024</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <div>
                          <h4 className="font-semibold line-through text-gray-500">Order materials</h4>
                          <p className="text-sm text-gray-500">Completed on Oct 18, 2024</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <div>
                          <h4 className="font-semibold line-through text-gray-500">Submit permit application</h4>
                          <p className="text-sm text-gray-500">Completed on Oct 22, 2024</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <div>
                          <h4 className="font-semibold line-through text-gray-500">Final walkthrough with client</h4>
                          <p className="text-sm text-gray-500">Completed on Nov 5, 2024</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowTasksModal(false)}
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowTasksModal(false);
                      navigate('/contractor/tasks');
                    }}
                    style={{backgroundColor: '#059669', color: 'white'}}
                    className="flex-1"
                  >
                    Manage All Tasks
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
