import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { FileText, MessageSquare, Camera, Clock, TrendingUp, Home, Search, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import AIVisualizer from "../components/AIVisualizer";
import BuildingPermitsHistory from "../components/BuildingPermitsHistory";
import { useState } from "react";
import { attomApiService } from "../services/attomApi";
import type { PropertySearchRequest } from "../services/attomApi";

const EnhancedHomeownerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [projectProgress] = useState(65);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [addressInput, setAddressInput] = useState("");
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [propertyError, setPropertyError] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSubject, setMessageSubject] = useState("");

  // Example property address - in real app, get from user profile
  const propertyAddress = "123 Main St, San Francisco, CA 94102";

  const handlePropertySearch = async () => {
    if (!addressInput.trim()) {
      setPropertyError("Please enter a property address");
      return;
    }

    setIsLoadingProperty(true);
    setPropertyError(null);

    try {
      // Parse the address input
      const parts = addressInput.split(',').map(p => p.trim());
      const searchParams: PropertySearchRequest = {
        address: parts[0] || '',
        city: parts[1] || '',
        state: parts[2]?.split(' ')[0] || '',
        zip: parts[2]?.split(' ')[1] || ''
      };

      console.log('Searching property with params:', searchParams);
      const data = await attomApiService.getPropertyValuation(searchParams);
      console.log('Got property data:', data);
      setPropertyData(data);
      setPropertyError(null);
    } catch (error) {
      console.error("Failed to load property data:", error);
      setPropertyError("Failed to fetch property data. Please check the address and try again.");
    } finally {
      setIsLoadingProperty(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual message sending logic
    console.log('Sending message:', { subject: messageSubject, message: messageText });
    alert(`Message sent to contractor!\n\nSubject: ${messageSubject}\nMessage: ${messageText}`);
    setShowMessageModal(false);
    setMessageSubject("");
    setMessageText("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{color: '#10B981'}}>{t("myProjects")}</h1>
          <LanguageSelector />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{color: '#10B981'}}>Kitchen Remodel</h2>
          <p className="mb-4" style={{color: '#10B981'}}>
            {t("projectStatus")}: <span className="font-medium" style={{color: '#10B981'}}>{t("inProgress")}</span>
          </p>
          
          <Card className="border" style={{borderColor: '#000'}}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold" style={{color: '#10B981'}}>{t("projectProgress")}</h3>
                  <span className="text-2xl font-bold" style={{color: '#10B981'}}>{projectProgress}%</span>
                </div>
                <Progress value={projectProgress} className="h-3" />
                <p className="text-sm" style={{color: '#10B981'}}>
                  {projectProgress >= 75
                    ? t("excellentProgress")
                    : projectProgress >= 50
                    ? t("greatProgress")
                    : projectProgress >= 25
                    ? t("goodStart")
                    : t("justBegun")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Value and AI Visualizer Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Property Value Section */}
          <Card className="border" style={{borderColor: '#000'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t("propertyValue")}
              </CardTitle>
              <CardDescription style={{color: '#10B981'}}>Enter your property address to get an estimated value</CardDescription>
            </CardHeader>
            <CardContent>
            {/* Address Input */}
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePropertySearch()}
                    placeholder="Enter address (e.g., 123 Main St, San Francisco, CA 94102)"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    disabled={isLoadingProperty}
                  />
                </div>
                <Button
                  onClick={handlePropertySearch}
                  disabled={isLoadingProperty}
                  className="gap-2"
                  style={{backgroundColor: '#059669', color: 'white'}}
                >
                  <Search className="h-4 w-4" />
                  {isLoadingProperty ? 'Searching...' : 'Search'}
                </Button>
              </div>
              {propertyError && (
                <p className="text-sm text-destructive mt-2">{propertyError}</p>
              )}
              {propertyData && (
                <p className="text-sm mt-2" style={{color: '#10B981'}}>
                  ✓ Property data loaded successfully
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Home className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm" style={{color: '#000'}}>{t("currentValue")}</p>
                    <p className="text-2xl font-bold" style={{color: '#10B981'}}>
                      {propertyData ? `$${propertyData.estimatedValue.toLocaleString()}` : "$425,000"}
                    </p>
                  </div>
                </div>
                <p className="text-sm" style={{color: '#10B981'}}>
                  Your property's estimated market value before renovation
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm" style={{color: '#000'}}>{t("postRenovationValue")}</p>
                    <p className="text-2xl font-bold" style={{color: '#10B981'}}>$485,000</p>
                  </div>
                </div>
                <p className="text-sm" style={{color: '#10B981'}}>
                  Estimated value after kitchen renovation completion
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{color: '#10B981'}}>{t("estimatedIncrease")}</p>
                  <p className="text-lg font-semibold" style={{color: '#10B981'}}>$60,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{color: '#10B981'}}>{t("roi")}</p>
                  <p className="text-lg font-semibold" style={{color: '#10B981'}}>+14.1%</p>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-6"
              onClick={() => navigate('/tool')}
              style={{borderColor: '#10B981', color: '#10B981'}}
            >
              Analyze More Renovations
            </Button>
            </CardContent>
          </Card>

          {/* AI Visualizer */}
          <div>
            <AIVisualizer roomType="kitchen" propertyAddress={propertyAddress} title={t("aiRenovationVisualizer")} />
          </div>
        </div>

        {/* Building Permits History */}
        {addressInput && (
          <div className="mb-8">
            <BuildingPermitsHistory
              address={addressInput.split(',')[0]?.trim() || ''}
              city={addressInput.split(',')[1]?.trim() || ''}
              state={addressInput.split(',')[2]?.trim().split(' ')[0] || ''}
              zip={addressInput.split(',')[2]?.trim().split(' ')[1] || ''}
            />
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border" style={{borderColor: '#000'}}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm" style={{color: '#10B981'}}>{t("timeline")}</p>
                  <p className="text-xl font-bold" style={{color: '#10B981'}}>4 {t("weeks")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border" style={{borderColor: '#000'}}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm" style={{color: '#10B981'}}>{t("documents")}</p>
                  <p className="text-xl font-bold" style={{color: '#10B981'}}>12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border" style={{borderColor: '#000'}}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm" style={{color: '#10B981'}}>{t("photos")}</p>
                  <p className="text-xl font-bold" style={{color: '#10B981'}}>28</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border" style={{borderColor: '#000'}}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm" style={{color: '#10B981'}}>{t("messages")}</p>
                  <p className="text-xl font-bold" style={{color: '#10B981'}}>5 {t("new")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Updates & Milestones */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border" style={{borderColor: '#000'}}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl" style={{color: '#10B981'}}>{t("recentUpdates")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-200">
                  <p className="font-medium text-base" style={{color: '#10B981'}}>Cabinets Installed</p>
                  <p className="text-sm mt-0.5" style={{color: '#10B981'}}>2 days ago</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="font-medium text-base" style={{color: '#10B981'}}>Countertops Ordered</p>
                  <p className="text-sm mt-0.5" style={{color: '#10B981'}}>5 days ago</p>
                </div>
                <div className="pb-0">
                  <p className="font-medium text-base" style={{color: '#10B981'}}>Permit Approved</p>
                  <p className="text-sm mt-0.5" style={{color: '#10B981'}}>1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border" style={{borderColor: '#000'}}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl" style={{color: '#10B981'}}>{t("upcomingMilestones")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-200">
                  <p className="font-medium text-base" style={{color: '#10B981'}}>Appliance Installation</p>
                  <p className="text-sm mt-0.5" style={{color: '#10B981'}}>Next Monday</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="font-medium text-base" style={{color: '#10B981'}}>Final Inspection</p>
                  <p className="text-sm mt-0.5" style={{color: '#10B981'}}>In 2 weeks</p>
                </div>
                <div className="pb-0">
                  <p className="font-medium text-base" style={{color: '#10B981'}}>Project Completion</p>
                  <p className="text-sm mt-0.5" style={{color: '#10B981'}}>In 4 weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Contractor */}
        <Card className="mt-6 border" style={{borderColor: '#000'}}>
          <CardHeader>
            <CardTitle style={{color: '#10B981'}}>{t("contactContractor")}</CardTitle>
            <CardDescription style={{color: '#10B981'}}>{t("contactDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="gap-2" 
              style={{backgroundColor: '#059669', color: 'white'}}
              onClick={() => setShowMessageModal(true)}
            >
              <MessageSquare className="h-4 w-4" />
              {t("sendMessage")}
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Message Contractor Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMessageModal(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#10B981'}}>Send Message to Contractor</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowMessageModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{color: '#10B981'}}>To</label>
                  <div className="px-4 py-3 bg-muted rounded-lg">
                    <p className="font-medium" style={{color: '#10B981'}}>John's Construction LLC</p>
                    <p className="text-sm" style={{color: '#10B981'}}>contractor@johnsconst.com</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{color: '#10B981'}}>Subject</label>
                  <input 
                    type="text" 
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background" 
                    placeholder="e.g., Question about timeline"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{color: '#10B981'}}>Message</label>
                  <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none" 
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowMessageModal(false)}
                    style={{borderColor: '#10B981', color: '#10B981'}}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    style={{backgroundColor: '#059669', color: 'white'}}
                    className="flex-1 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </form>

              {/* Recent Messages */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4" style={{color: '#10B981'}}>Recent Messages</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm" style={{color: '#10B981'}}>Contractor: Update on cabinets</p>
                      <span className="text-xs" style={{color: '#10B981'}}>2 days ago</span>
                    </div>
                    <p className="text-sm" style={{color: '#10B981'}}>The cabinets have been installed! Moving on to countertops next week.</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm" style={{color: '#10B981'}}>You: Timeline question</p>
                      <span className="text-xs" style={{color: '#10B981'}}>5 days ago</span>
                    </div>
                    <p className="text-sm" style={{color: '#10B981'}}>Are we still on track for completion in 4 weeks?</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedHomeownerDashboard;
