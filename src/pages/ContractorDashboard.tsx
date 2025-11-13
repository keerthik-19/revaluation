import { useState } from 'react';
import { Calendar, DollarSign, FileText, CheckSquare, Users, Plus, Mail, Phone, MapPin, X, TrendingUp, Eye } from "lucide-react";
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
}

const ContractorDashboard = () => {
  const navigate = useNavigate();
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newProgress, setNewProgress] = useState(0);

  // Mock data - replace with real data later
  const [clients, setClients] = useState<Client[]>([
    { 
      id: "1", 
      name: "John Smith", 
      project: "Kitchen Remodel", 
      status: "In Progress", 
      progress: 65,
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Boston, MA",
      startDate: "2024-10-01",
      budget: 45000
    },
    { 
      id: "2", 
      name: "Sarah Johnson", 
      project: "Bathroom Renovation", 
      status: "Planning", 
      progress: 25,
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, Cambridge, MA",
      startDate: "2024-10-20",
      budget: 28000
    },
    { 
      id: "3", 
      name: "Mike Davis", 
      project: "Deck Addition", 
      status: "In Progress", 
      progress: 80,
      email: "mike.davis@email.com",
      phone: "(555) 345-6789",
      address: "789 Pine Rd, Somerville, MA",
      startDate: "2024-09-15",
      budget: 35000
    },
  ]);

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleUpdateProgress = (client: Client) => {
    setSelectedClient(client);
    setNewProgress(client.progress);
    setShowProgressModal(true);
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
      budget: Number(formData.get('budget'))
    };
    setClients([...clients, newClient]);
    setShowAddClientModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{color: '#10B981'}}>Contractor Dashboard</h1>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contractor/clients")}
                className="gap-2"
                style={{borderColor: '#10B981', color: '#10B981'}}
              >
                <Users className="h-4 w-4" />
                Clients
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contractor/permits")}
                className="gap-2"
                style={{borderColor: '#10B981', color: '#10B981'}}
              >
                <FileText className="h-4 w-4" />
                Permits
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contractor/tasks")}
                className="gap-2"
                style={{borderColor: '#10B981', color: '#10B981'}}
              >
                <CheckSquare className="h-4 w-4" />
                Tasks
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contractor/revenue")}
                className="gap-2"
                style={{borderColor: '#10B981', color: '#10B981'}}
              >
                <DollarSign className="h-4 w-4" />
                Revenue
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate("/calendar")}
                className="gap-2"
                style={{backgroundColor: '#059669', color: 'white'}}
              >
                <Calendar className="h-5 w-5" />
                Calendar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{color: '#10B981'}}>Client Management</h2>
            <p style={{color: '#10B981'}}>
              Manage permits, tasks, and client dashboards
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
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2" 
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    onClick={() => handleViewDetails(client)}
                  >
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2" 
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    onClick={() => navigate('/contractor/permits')}
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
                    onClick={() => handleViewDetails(client)}
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

      {/* View Details Modal */}
      {showDetailsModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDetailsModal(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Client Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowDetailsModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                  <p className="text-lg" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {selectedClient.email && (
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium" style={{color: '#10B981'}}>Email</p>
                          <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.email}</p>
                        </div>
                      </div>
                    )}
                    {selectedClient.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium" style={{color: '#10B981'}}>Phone</p>
                          <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.phone}</p>
                        </div>
                      </div>
                    )}
                    {selectedClient.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium" style={{color: '#10B981'}}>Address</p>
                          <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Status</p>
                      <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.status}</p>
                    </div>
                    {selectedClient.startDate && (
                      <div>
                        <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Start Date</p>
                        <p className="text-sm" style={{color: '#10B981'}}>{new Date(selectedClient.startDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedClient.budget && (
                      <div>
                        <p className="text-sm font-medium mb-1" style={{color: '#10B981'}}>Budget</p>
                        <p className="text-sm" style={{color: '#10B981'}}>${selectedClient.budget.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium" style={{color: '#10B981'}}>Project Progress</p>
                    <p className="text-sm font-bold" style={{color: '#10B981'}}>{selectedClient.progress}%</p>
                  </div>
                  <Progress value={selectedClient.progress} className="h-3" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDetailsModal(false)}
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowDetailsModal(false);
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

      {/* Client Tasks Modal - In Progress Tasks */}
      {showTasksModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTasksModal(false)}>
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Client Tasks - In Progress</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowTasksModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                {/* In Progress Tasks */}
                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <h4 className="font-semibold" style={{color: '#10B981'}}>Review architectural plans</h4>
                          <p className="text-sm" style={{color: '#10B981'}}>Due: Today</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        High Priority
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <h4 className="font-semibold" style={{color: '#10B981'}}>Coordinate with electrician</h4>
                          <p className="text-sm" style={{color: '#10B981'}}>Due: Tomorrow</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Medium Priority
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <h4 className="font-semibold" style={{color: '#10B981'}}>Prepare cost estimate for client review</h4>
                          <p className="text-sm" style={{color: '#10B981'}}>Due: This week</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Medium Priority
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <h4 className="font-semibold" style={{color: '#10B981'}}>Schedule subcontractor meetings</h4>
                          <p className="text-sm" style={{color: '#10B981'}}>Due: Next week</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Low Priority
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

export default ContractorDashboard;
