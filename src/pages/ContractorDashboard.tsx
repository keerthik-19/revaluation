import { useState } from 'react';
import { Calendar, DollarSign, FileText, CheckSquare, Users, Plus, Mail, X, TrendingUp, Link as LinkIcon, Copy, Package, MessageSquare, Send } from "lucide-react";
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
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);
  const [showClientDetailsModal, setShowClientDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newProgress, setNewProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  
  // Mock message thread data
  const [messages, setMessages] = useState<{[key: string]: Array<{id: string, sender: 'contractor' | 'client', text: string, timestamp: string}>}>({
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
                variant="outline"
                size="lg"
                onClick={() => navigate("/contractor/materials")}
                className="gap-2"
                style={{borderColor: '#10B981', color: '#10B981'}}
              >
                <Package className="h-4 w-4" />
                Materials
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
            <Card key={client.id} className="hover:shadow-lg transition-shadow relative cursor-pointer" onClick={() => {
              setSelectedClient(client);
              setShowClientDetailsModal(true);
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{color: '#10B981'}}>
                  <Users className="h-5 w-5 text-primary" />
                  {client.name}
                </CardTitle>
                <CardDescription style={{color: '#10B981'}}>{client.project}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{color: '#10B981'}}>Progress</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{color: '#10B981'}}>{client.progress}%</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-6 px-2" 
                        style={{color: '#10B981'}}
                        onClick={() => handleUpdateProgress(client)}
                      >
                        <TrendingUp className="h-3 w-3" />
                      </Button>
                    </div>
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
                    onClick={() => handleOpenMessaging(client)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
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
                    onClick={() => handleShareLink(client)}
                  >
                    <LinkIcon className="h-4 w-4" />
                    Share
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

      {/* Share Link Modal */}
      {showShareLinkModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowShareLinkModal(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Share Homeowner Dashboard</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowShareLinkModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.project}</p>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm" style={{color: '#10B981'}}>
                    Share this link with your client to give them access to their personalized homeowner dashboard. 
                    They'll be able to view project progress, property value estimates, and communicate with you directly.
                  </p>
                  
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      readOnly
                      value={generateClientLink(selectedClient.id)}
                      className="flex-1 px-4 py-3 border border-border rounded-lg bg-muted" 
                    />
                    <Button
                      onClick={() => copyToClipboard(generateClientLink(selectedClient.id))}
                      style={{backgroundColor: copiedLink ? '#10B981' : '#059669', color: 'white'}}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedLink ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <LinkIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-blue-900">How it works</p>
                        <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
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
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      const mailtoLink = `mailto:${selectedClient.email}?subject=Your Project Dashboard&body=Hi ${selectedClient.name},%0D%0A%0D%0AI've set up a dashboard for you to track your ${selectedClient.project} project. You can access it here:%0D%0A%0D%0A${generateClientLink(selectedClient.id)}%0D%0A%0D%0ABest regards`;
                      window.location.href = mailtoLink;
                    }}
                    style={{backgroundColor: '#059669', color: 'white'}}
                    className="flex-1 gap-2"
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

      {/* Messaging Thread Modal */}
      {showMessagingModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMessagingModal(false)}>
          <Card className="w-full max-w-3xl mx-4 h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Messages</h2>
                  <p className="text-sm" style={{color: '#10B981'}}>{selectedClient.name} - {selectedClient.project}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowMessagingModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{minHeight: 0}}>
              {(messages[selectedClient.id] || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'contractor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.sender === 'contractor'
                        ? 'bg-primary text-white'
                        : 'bg-muted'
                    }`}
                    style={message.sender === 'contractor' ? {backgroundColor: '#059669'} : {}}
                  >
                    <p className={`text-sm ${
                      message.sender === 'contractor' ? 'text-white' : 'text-foreground'
                    }`} style={message.sender === 'contractor' ? {color: 'white'} : {color: '#10B981'}}>
                      {message.text}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'contractor' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {new Date(message.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-6 border-t">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  type="submit"
                  size="lg"
                  style={{backgroundColor: '#059669', color: 'white'}}
                  className="gap-2 px-6"
                  disabled={!messageInput.trim()}
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Client Details Modal */}
      {showClientDetailsModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowClientDetailsModal(false)}>
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Client Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowClientDetailsModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Client Header */}
                <div className="pb-6 border-b">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" style={{color: '#10B981'}} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold" style={{color: '#10B981'}}>{selectedClient.name}</h3>
                      <p style={{color: '#10B981'}}>{selectedClient.project}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold mb-4" style={{color: '#10B981'}}>Contact Information</h4>
                  <div className="space-y-3">
                    {selectedClient.email && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span style={{color: '#10B981'}}>Email</span>
                        <span className="font-medium" style={{color: '#10B981'}}>{selectedClient.email}</span>
                      </div>
                    )}
                    {selectedClient.phone && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span style={{color: '#10B981'}}>Phone</span>
                        <span className="font-medium" style={{color: '#10B981'}}>{selectedClient.phone}</span>
                      </div>
                    )}
                    {selectedClient.address && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span style={{color: '#10B981'}}>Address</span>
                        <span className="font-medium" style={{color: '#10B981'}}>{selectedClient.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Information */}
                <div>
                  <h4 className="text-lg font-semibold mb-4" style={{color: '#10B981'}}>Project Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span style={{color: '#10B981'}}>Project Status</span>
                      <span className="font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{selectedClient.status}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span style={{color: '#10B981'}}>Progress</span>
                      <span className="font-medium" style={{color: '#10B981'}}>{selectedClient.progress}%</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Progress value={selectedClient.progress} className="h-2" />
                    </div>
                    {selectedClient.startDate && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span style={{color: '#10B981'}}>Start Date</span>
                        <span className="font-medium" style={{color: '#10B981'}}>{new Date(selectedClient.startDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {selectedClient.budget && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span style={{color: '#10B981'}}>Budget</span>
                        <span className="font-medium" style={{color: '#10B981'}}>${selectedClient.budget.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="gap-2" 
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    onClick={() => {
                      setShowClientDetailsModal(false);
                      handleOpenMessaging(selectedClient);
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-2" 
                    style={{backgroundColor: '#059669', color: 'white'}}
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
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    onClick={() => {
                      setShowClientDetailsModal(false);
                      handleViewTasks(selectedClient);
                    }}
                  >
                    <CheckSquare className="h-4 w-4" />
                    View Tasks
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-2" 
                    style={{backgroundColor: '#10B981', color: 'white'}}
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
