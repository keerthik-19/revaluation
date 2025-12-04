import { useState } from 'react';
import { Mail, Phone, FileText, TrendingUp, Eye, Plus, X, MapPin, CheckSquare, ArrowLeft } from "lucide-react";
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
  imageUrl?: string;
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
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null); // Track selected week for detail view
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
      imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
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
      // alert(`Progress updated to ${newProgress}% for ${selectedClient.name}`); // Removed alert for better UX
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
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/contractor/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-foreground">Client Management</h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Manage Your Clients</h2>
            <p className="text-muted-foreground">
              Contact clients, track permits, and manage project progress
            </p>
          </div>
          <Button className="gap-2 shadow-sm hover:shadow-md" onClick={() => setShowAddClientModal(true)}>
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => {
            return (
              <Card
                key={client.id}
                className="group hover:shadow-lg transition-all duration-300 relative cursor-pointer overflow-hidden border-border/50 bg-card/50 hover:bg-card"
                onClick={() => handleViewProgress(client)}
              >
                {/* Background Image */}
                {client.imageUrl && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500"
                    style={{ backgroundImage: `url(${client.imageUrl})` }}
                  />
                )}

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        {client.name}
                      </CardTitle>
                      <CardDescription className="font-medium text-primary">
                        {client.project}
                      </CardDescription>
                    </div>
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${client.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800' :
                      client.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800' :
                        client.status === 'Planning' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                      {client.status}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Progress</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{client.progress}%</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-muted-foreground hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateProgress(client);
                          }}
                        >
                          <TrendingUp className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={client.progress} className="h-2 bg-muted" />
                  </div>

                  {/* 4 Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="gap-2 w-full justify-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactClient(client);
                      }}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 w-full justify-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPermits(client);
                      }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Permits
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 w-full justify-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewTasks(client);
                      }}
                    >
                      <CheckSquare className="h-3.5 w-3.5" />
                      Schedule
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 w-full justify-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProgress(client);
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddClientModal(false)}>
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Add New Client</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddClientModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name *</label>
                    <input
                      type="text"
                      name="project"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Kitchen Remodel"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="client@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="123 Main St, City, State ZIP"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget</label>
                    <input
                      type="number"
                      name="budget"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="50000"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddClientModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 shadow-md hover:shadow-lg"
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Contact Client</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowContactModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClient.project}</p>
                </div>

                <div className="space-y-4">
                  {selectedClient.email && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="shadow-sm hover:shadow-md"
                        onClick={() => sendEmail(selectedClient.email!)}
                      >
                        Send Email
                      </Button>
                    </div>
                  )}

                  {selectedClient.phone && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="shadow-sm hover:shadow-md"
                        onClick={() => makeCall(selectedClient.phone!)}
                      >
                        Call
                      </Button>
                    </div>
                  )}

                  {selectedClient.address && (
                    <div className="p-4 border border-border rounded-lg bg-card">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium mb-1">Address</p>
                          <p className="text-sm text-muted-foreground">{selectedClient.address}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => setShowContactModal(false)}
                  variant="outline"
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowPermitsModal(false)}>
          <Card className="w-full max-w-2xl mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Client Permits</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowPermitsModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClient.project}</p>
                </div>

                {selectedClient.permits && selectedClient.permits.length > 0 ? (
                  <div className="space-y-4">
                    {selectedClient.permits.map((permit) => (
                      <div key={permit.id} className="p-4 border border-border rounded-lg bg-card">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{permit.type}</h4>
                            <p className="text-sm text-muted-foreground">ID: {permit.id}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${permit.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              permit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              }`}
                          >
                            {permit.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {permit.submittedDate && (
                            <div>
                              <p className="font-medium text-muted-foreground">Submitted</p>
                              <p>{new Date(permit.submittedDate).toLocaleDateString()}</p>
                            </div>
                          )}
                          {permit.approvalDate && (
                            <div>
                              <p className="font-medium text-muted-foreground">Approved</p>
                              <p>{new Date(permit.approvalDate).toLocaleDateString()}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No permits on file</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowPermitsModal(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowPermitsModal(false);
                      navigate('/contractor/permits');
                    }}
                    className="flex-1 shadow-md hover:shadow-lg"
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowProgressModal(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Update Progress</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowProgressModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-1">{selectedClient.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedClient.project}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Progress</label>
                    <span className="text-2xl font-bold text-primary">{newProgress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <Progress value={newProgress} className="h-3" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Progress Notes (Optional)</label>
                  <textarea
                    value={progressNotes}
                    onChange={(e) => setProgressNotes(e.target.value)}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add notes about this progress update..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowProgressModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveProgress}
                    className="flex-1 shadow-md hover:shadow-lg"
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowViewProgressModal(false)}>
          <Card className="w-full max-w-2xl mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Project Progress</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowViewProgressModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClient.project}</p>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-medium text-primary">Overall Progress</p>
                    <p className="text-4xl font-bold text-primary">{selectedClient.progress}%</p>
                  </div>
                  <Progress value={selectedClient.progress} className="h-4" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg bg-card">
                    <p className="text-sm font-medium mb-1 text-muted-foreground">Status</p>
                    <p className="text-lg font-semibold">{selectedClient.status}</p>
                  </div>
                  {selectedClient.startDate && (
                    <div className="p-4 border border-border rounded-lg bg-card">
                      <p className="text-sm font-medium mb-1 text-muted-foreground">Start Date</p>
                      <p className="text-lg font-semibold">
                        {new Date(selectedClient.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {selectedClient.budget && (
                    <div className="p-4 border border-border rounded-lg bg-card">
                      <p className="text-sm font-medium mb-1 text-muted-foreground">Budget</p>
                      <p className="text-lg font-semibold">
                        ${selectedClient.budget.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {selectedClient.permits && (
                    <div className="p-4 border border-border rounded-lg bg-card">
                      <p className="text-sm font-medium mb-1 text-muted-foreground">Permits</p>
                      <p className="text-lg font-semibold">
                        {selectedClient.permits.length} Active
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowViewProgressModal(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowViewProgressModal(false);
                      handleUpdateProgress(selectedClient);
                    }}
                    className="flex-1 shadow-md hover:shadow-lg"
                  >
                    Update Progress
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Schedule Modal - Monthly Calendar with Week Bubbles */}
      {showTasksModal && selectedClient && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => {
          setShowTasksModal(false);
          setSelectedWeek(null);
        }}>
          <Card className="w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {selectedWeek && (
                    <Button variant="ghost" size="icon" onClick={() => setSelectedWeek(null)}>
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedWeek ? `Week ${selectedWeek} Schedule` : 'Project Schedule'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">{selectedClient.name} - {selectedClient.project}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => {
                  setShowTasksModal(false);
                  setSelectedWeek(null);
                }}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Conditional Rendering: Monthly Calendar or Weekly Detail */}
              {!selectedWeek ? (
                // Monthly Calendar View with Week Bubbles
                <div className="space-y-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">October 2024</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Project Duration: Oct 1 - Oct 28</span>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="border border-border rounded-lg overflow-hidden">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 bg-muted/50">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="p-3 text-center font-semibold text-sm border-r border-border last:border-r-0">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7">
                      {/* Row 1: Oct 1-5 (Tue-Sat) with Week 1 bubble */}
                      {[null, null].map((_, index) => (
                        <div key={`empty-${index}`} className="min-h-[100px] p-2 border-r border-b border-border bg-muted/20" />
                      ))}
                      {/* Week 1 bubble spanning Tue-Sat (5 columns) */}
                      <div className="col-span-5 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedWeek(1)}
                          className="absolute bottom-3 left-2 right-2 h-8 flex items-center justify-center bg-transparent border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold text-xs rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300"
                        >
                          Week 1: Oct 1-7 (5/5 Done)
                        </button>
                      </div>

                      {/* Row 2: Oct 6-12 with Week 1 end + Week 2 start */}
                      {/* Week 1 end: Sun-Mon (6-7) */}
                      <div className="col-span-2 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[6, 7].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                      </div>
                      {/* Week 2 start: Tue-Sat (8-12) */}
                      <div className="col-span-5 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[8, 9, 10, 11, 12].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedWeek(2)}
                          className="absolute bottom-3 left-2 right-2 h-8 flex items-center justify-center bg-transparent border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold text-xs rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300"
                        >
                          Week 2: Oct 8-14 (6/6 Done)
                        </button>
                      </div>

                      {/* Row 3: Oct 13-19 with Week 2 end + Week 3 start */}
                      {/* Week 2 end: Sun-Mon (13-14) */}
                      <div className="col-span-2 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[13, 14].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                      </div>
                      {/* Week 3 start: Tue-Sat (15-19) */}
                      <div className="col-span-5 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[15, 16, 17, 18, 19].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedWeek(3)}
                          className="absolute bottom-3 left-2 right-2 h-8 flex items-center justify-center bg-transparent border-2 border-amber-500 text-amber-700 dark:text-amber-400 font-semibold text-xs rounded-full hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300"
                        >
                          Week 3: Oct 15-21 (3/7 Done)
                        </button>
                      </div>

                      {/* Row 4: Oct 20-26 with Week 3 end + Week 4 start */}
                      {/* Week 3 end: Sun-Mon (20-21) */}
                      <div className="col-span-2 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[20, 21].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                      </div>
                      {/* Week 4 start: Tue-Sat (22-26) */}
                      <div className="col-span-5 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[22, 23, 24, 25, 26].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedWeek(4)}
                          className="absolute bottom-3 left-2 right-2 h-8 flex items-center justify-center bg-transparent border-2 border-gray-400 text-gray-700 dark:text-gray-400 font-semibold text-xs rounded-full hover:bg-gray-50 dark:hover:bg-gray-950/30 transition-all duration-300"
                        >
                          Week 4: Oct 22-28 (0/5 Done)
                        </button>
                      </div>

                      {/* Row 5: Oct 27-31 (Week 4 end) */}
                      <div className="col-span-2 min-h-[100px] p-2 border-r border-b border-border bg-card relative">
                        <div className="flex gap-2 mb-2">
                          {[27, 28].map((day) => (
                            <div key={day} className="flex-1 text-sm font-medium">{day}</div>
                          ))}
                        </div>
                      </div>
                      {[29, 30, 31].map((day) => (
                        <div key={day} className="min-h-[100px] p-2 border-r border-b border-border bg-card">
                          <div className="text-sm font-medium">{day}</div>
                        </div>
                      ))}
                      {[null, null].map((_, index) => (
                        <div key={`empty-end-${index}`} className="min-h-[100px] p-2 border-r border-b border-border bg-muted/20" />
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-muted-foreground">Completed Week</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                      <span className="text-sm text-muted-foreground">In Progress Week</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                      <span className="text-sm text-muted-foreground">Pending Week</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowTasksModal(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                // Weekly Detail View - Daily Tasks
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Week {selectedWeek}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedWeek === 1 ? 'Oct 1 - Oct 7' :
                            selectedWeek === 2 ? 'Oct 8 - Oct 14' :
                              selectedWeek === 3 ? 'Oct 15 - Oct 21' :
                                'Oct 22 - Oct 28'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="text-lg font-bold">
                          {selectedWeek === 1 ? '5/5' :
                            selectedWeek === 2 ? '6/6' :
                              selectedWeek === 3 ? '3/7' :
                                '0/5'} Tasks
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-3">
                    {/* Days of the week */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      // Mock data for tasks - you can customize this
                      const dayTasks = selectedWeek === 1 && index < 5 ? [
                        { name: 'Site prep', status: 'completed' },
                        ...(index === 0 ? [{ name: 'Materials delivery', status: 'completed' }] : [])
                      ] : selectedWeek === 2 && index < 6 ? [
                        { name: 'Foundation work', status: 'completed' }
                      ] : selectedWeek === 3 && index < 3 ? [
                        { name: 'Framing', status: 'completed' }
                      ] : selectedWeek === 3 && index >= 3 && index < 7 ? [
                        { name: 'Electrical rough-in', status: 'pending' }
                      ] : selectedWeek === 4 ? [
                        { name: 'Plumbing', status: 'pending' }
                      ] : [];

                      const hasCompleted = dayTasks.some(t => t.status === 'completed');
                      const hasPending = dayTasks.some(t => t.status === 'pending');
                      const bgColor = hasCompleted && !hasPending ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' :
                        hasPending ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' :
                          'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800';

                      return (
                        <div key={day} className={`p-3 border-2 rounded-lg ${bgColor} min-h-[120px]`}>
                          <div className="font-semibold text-sm mb-2 text-center">{day}</div>
                          <div className="text-xs text-center text-muted-foreground mb-3">
                            Oct {selectedWeek ? ((selectedWeek - 1) * 7 + index + 1) : index + 1}
                          </div>
                          <div className="space-y-1">
                            {dayTasks.map((task, taskIndex) => (
                              <div
                                key={taskIndex}
                                className={`text-xs p-1.5 rounded ${task.status === 'completed'
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-amber-500 text-white'
                                  }`}
                              >
                                {task.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Task Legend */}
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-emerald-500"></div>
                      <span className="text-sm text-muted-foreground">Completed Task</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-amber-500"></div>
                      <span className="text-sm text-muted-foreground">Pending Task</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setSelectedWeek(null)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back to Calendar
                    </Button>
                    <Button
                      onClick={() => {
                        setShowTasksModal(false);
                        setSelectedWeek(null);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
