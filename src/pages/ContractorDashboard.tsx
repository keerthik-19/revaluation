import { useState } from 'react';
import { Calendar, DollarSign, FileText, CheckSquare, Users, Plus, Mail, X, TrendingUp, Link as LinkIcon, Copy, Package, MessageSquare, Image, Send, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";
import { Progress } from "../components/ui/progress";
import ContractorTimeline from "../components/ContractorTimeline";
import PaymentTracker from "../components/PaymentTracker";
import MaterialsTracker from "../components/MaterialsTracker";
import TeamManagement from "../components/TeamManagement";

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
  imageUrl?: string;
}

const ContractorDashboard = () => {
  const navigate = useNavigate();
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);
  const [showClientDetailsModal, setShowClientDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [detailsTab, setDetailsTab] = useState<'timeline' | 'payments' | 'materials' | 'team'>('timeline');
  const [newProgress, setNewProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  // Mock message thread data
  const [messages, setMessages] = useState<{ [key: string]: Array<{ id: string, sender: 'contractor' | 'client', text: string, timestamp: string }> }>({
    "1": [
      { id: "1", sender: "client", text: "Hi! When can we expect the cabinets to be installed?", timestamp: "2024-11-12T10:30:00" },
      { id: "2", sender: "contractor", text: "Hello! The cabinets are scheduled to be installed this Thursday, November 14th.", timestamp: "2024-11-12T11:15:00" },
      { id: "3", sender: "client", text: "Perfect! Will you need access to the house all day?", timestamp: "2024-11-12T11:20:00" },
      { id: "4", sender: "contractor", text: "Yes, we'll need access from 8am to 5pm. We'll make sure everything is clean before we leave.", timestamp: "2024-11-12T11:25:00" },
    ],
    "2": [
      { id: "1", sender: "client", text: "Can we discuss the tile options for the bathroom?", timestamp: "2024-11-11T14:00:00" },
      { id: "2", sender: "contractor", text: "Of course! I'll bring some samples by tomorrow afternoon.", timestamp: "2024-11-11T14:30:00" },
    ],
    "3": [
      { id: "1", sender: "client", text: "The deck looks great! Thank you!", timestamp: "2024-11-10T16:45:00" },
      { id: "2", sender: "contractor", text: "Thank you! Let me know if you need anything else.", timestamp: "2024-11-10T17:00:00" },
    ],
  });

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
      budget: 45000,
      imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop"
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
      budget: 28000,
      imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop"
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
      budget: 35000,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
    },
  ]);

  const handleUpdateProgress = (client: Client) => {
    setSelectedClient(client);
    setNewProgress(client.progress);
    setShowProgressModal(true);
  };

  const handleViewTasks = (client: Client) => {
    setSelectedClient(client);
    setShowTasksModal(true);
  };

  const handleShareLink = (client: Client) => {
    setSelectedClient(client);
    setShowShareLinkModal(true);
    setCopiedLink(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const generateClientLink = (clientId: string) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/homeowner/dashboard?clientId=${clientId}`;
  };

  const handleOpenMessaging = (client: Client) => {
    setSelectedClient(client);
    setShowMessagingModal(true);
    setMessageInput("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedClient) return;

    const newMessage = {
      id: String(Date.now()),
      sender: 'contractor' as const,
      text: messageInput,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => ({
      ...prev,
      [selectedClient.id]: [...(prev[selectedClient.id] || []), newMessage]
    }));
    setMessageInput("");
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
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
                <img
                  src="/logo.png"
                  alt="Assemble Logo"
                  className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { label: "Clients", icon: Users, path: "/contractor/clients" },
                  { label: "Permits", icon: FileText, path: "/contractor/permits" },
                  { label: "Revenue", icon: DollarSign, path: "/contractor/revenue" },
                  { label: "Materials", icon: Package, path: "/contractor/materials" },
                  { label: "Drawings", icon: Image, path: "/contractor/drawings" },
                  { label: "Calendar", icon: Calendar, path: "/calendar" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium text-sm transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Client Management</h2>
            <p className="text-muted-foreground">
              Manage permits, tasks, and client dashboards
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
                onClick={() => {
                  setSelectedClient(client);
                  setShowClientDetailsModal(true);
                }}
              >
                {/* Background Image Overlay */}
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
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${client.status === 'In Progress'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
                      : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800'
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

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="gap-2 w-full justify-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMessaging(client);
                      }}
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 w-full justify-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/contractor/permits');
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
                        handleShareLink(client);
                      }}
                    >
                      <LinkIcon className="h-3.5 w-3.5" />
                      Share
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

      {/* Update Progress Modal */}
      {showProgressModal && selectedClient && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowProgressModal(false)}>
          <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Update Progress</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowProgressModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-1 text-lg">{selectedClient.name}</p>
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

                {/* Payment Tracker */}
                <div className="border-t pt-6">
                  <PaymentTracker
                    totalBudget={selectedClient.budget || 45000}
                    currentWeek={Math.floor((newProgress / 100) * 4)}
                    clientName={selectedClient.name}
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

      {/* Client Details Modal */}
      {showClientDetailsModal && selectedClient && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowClientDetailsModal(false)}>
          <Card className="w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Client Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowClientDetailsModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Client Header */}
                <div className="pb-6 border-b">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold">{selectedClient.name}</h3>
                      <p className="text-muted-foreground">{selectedClient.project}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    {selectedClient.email && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium">{selectedClient.email}</span>
                      </div>
                    )}
                    {selectedClient.phone && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">{selectedClient.phone}</span>
                      </div>
                    )}
                    {selectedClient.address && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground">Address</span>
                        <span className="font-medium">{selectedClient.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-t pt-6">
                  <div className="flex gap-4 mb-6 border-b overflow-x-auto">
                    {[
                      { id: 'timeline', label: 'Timeline & Subs' },
                      { id: 'payments', label: 'Payment Schedule' },
                      { id: 'materials', label: 'Materials' },
                      { id: 'team', label: 'Project Team' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setDetailsTab(tab.id as any)}
                        className={`pb-3 px-2 font-semibold transition-colors whitespace-nowrap ${detailsTab === tab.id
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[300px]">
                    {detailsTab === 'timeline' && (
                      <ContractorTimeline currentWeek={3} totalWeeks={4} />
                    )}

                    {detailsTab === 'payments' && (
                      <PaymentTracker
                        totalBudget={selectedClient.budget || 45000}
                        currentWeek={3}
                        clientName={selectedClient.name}
                      />
                    )}

                    {detailsTab === 'materials' && (
                      <MaterialsTracker />
                    )}

                    {detailsTab === 'team' && (
                      <TeamManagement />
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={() => {
                      setShowClientDetailsModal(false);
                      handleOpenMessaging(selectedClient);
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                  <Button
                    className="gap-2"
                    style={{ backgroundColor: '#F59E0B', color: 'white' }}
                    onClick={() => {
                      setShowClientDetailsModal(false);
                      handleUpdateProgress(selectedClient);
                    }}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Update Progress
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      setShowClientDetailsModal(false);
                      handleViewTasks(selectedClient);
                    }}
                  >
                    <CheckSquare className="h-4 w-4" />
                    View Schedule
                  </Button>

                  <Button
                    className="gap-2"
                    onClick={() => {
                      setShowClientDetailsModal(false);
                      handleShareLink(selectedClient);
                    }}
                  >
                    <LinkIcon className="h-4 w-4" />
                    Share Link
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Share Link Modal */}
      {showShareLinkModal && selectedClient && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowShareLinkModal(false)}>
          <Card className="w-full max-w-2xl mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Share Homeowner Dashboard</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowShareLinkModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClient.project}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Share this link with your client to give them access to their personalized homeowner dashboard.
                    They'll be able to view project progress, property value estimates, and communicate with you directly.
                  </p>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      readOnly
                      value={generateClientLink(selectedClient.id)}
                      className="flex-1 h-10 rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button
                      onClick={() => copyToClipboard(generateClientLink(selectedClient.id))}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedLink ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </div>

                  <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <LinkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-blue-900 dark:text-blue-100">How it works</p>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1 list-disc list-inside">
                          <li>Send this link to your client via email or text</li>
                          <li>Client can access their dashboard without creating an account</li>
                          <li>Dashboard shows real-time project updates and progress</li>
                          <li>Client can message you directly through the dashboard</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowShareLinkModal(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      const mailtoLink = `mailto:${selectedClient.email}?subject=Your Project Dashboard&body=Hi ${selectedClient.name},%0D%0A%0D%0AI've set up a dashboard for you to track your ${selectedClient.project} project. You can access it here:%0D%0A%0D%0A${generateClientLink(selectedClient.id)}%0D%0A%0D%0ABest regards`;
                      window.location.href = mailtoLink;
                    }}
                    className="flex-1 gap-2 shadow-md hover:shadow-lg"
                    disabled={!selectedClient.email}
                  >
                    <Mail className="h-4 w-4" />
                    Send via Email
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

      {/* Messaging Modal */}
      {showMessagingModal && selectedClient && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowMessagingModal(false)}>
          <Card className="w-full max-w-2xl mx-4 h-[600px] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedClient.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedClient.project}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowMessagingModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedClient.id]?.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'contractor' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'contractor'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                    }`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-[10px] opacity-70 mt-1 block">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {!messages[selectedClient.id] && (
                <div className="text-center text-muted-foreground py-8">
                  No messages yet. Start the conversation!
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContractorDashboard;
