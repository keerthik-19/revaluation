import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { FileText, MessageSquare, Send, CreditCard, FileCheck, Mail } from "lucide-react";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import PaymentsTab from "../components/PaymentsTab";
import ProjectTimeline from "../components/ProjectTimeline";
import ProgressiveHouseVisualization from "../components/ProgressiveHouseVisualization";
import PropertyValueAIVisualizer from "../components/PropertyValueAIVisualizer";
import { useState } from "react";

const EnhancedHomeownerDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'permits' | 'documents' | 'messages'>('overview');
  const [projectProgress] = useState(65);
  const [currentWeek] = useState(3); // Week 3 of 4
  const [messageText, setMessageText] = useState("");
  const [messageSubject, setMessageSubject] = useState("");

  // Example property address - in real app, get from user profile
  const propertyAddress = "123 Main St, San Francisco, CA 94102";

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual message sending logic
    console.log('Sending message:', { subject: messageSubject, message: messageText });
    alert(`Message sent to contractor!\n\nSubject: ${messageSubject}\nMessage: ${messageText}`);
    setMessageSubject("");
    setMessageText("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Assemble" className="h-12 w-auto" />
            <h1 className="text-2xl font-bold" style={{ color: 'black' }}>{t("myProjects")}</h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'black' }}>House Remodel</h2>
          <p className="mb-4" style={{ color: 'black' }}>
            {t("projectStatus")}: <span className="font-medium" style={{ color: 'black' }}>{t("inProgress")}</span>
          </p>

          <Card className="border" style={{ borderColor: '#000' }}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold" style={{ color: 'black' }}>{t("projectProgress")}</h3>
                  <span className="text-2xl font-bold" style={{ color: 'black' }}>{projectProgress}%</span>
                </div>
                <Progress value={projectProgress} className="h-3" />
                <p className="text-sm" style={{ color: 'black' }}>
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

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-semibold transition-colors ${activeTab === 'overview'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Progress
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${activeTab === 'payments'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <CreditCard size={18} />
              Payments
            </button>
            <button
              onClick={() => setActiveTab('permits')}
              className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${activeTab === 'permits'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <FileCheck size={18} />
              Permits
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${activeTab === 'documents'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <FileText size={18} />
              Documents
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${activeTab === 'messages'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <Mail size={18} />
              Messages
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'payments' && (
          <div className="mb-8">
            <PaymentsTab
              projectId="project-house-remodel"
              projectTitle="House Remodel"
              totalBudget={10000}
            />
          </div>
        )}

        {activeTab === 'overview' && (
          <>
            {/* Timeline Section - Separate */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <Card className="border transition-all duration-300 hover:shadow-lg" style={{ borderColor: '#000' }}>
                <CardContent className="pt-6">
                  <ProjectTimeline currentWeek={currentWeek} />
                </CardContent>
              </Card>
            </div>

            {/* Project Progress Section - House Visualization + AI Visualizer Side by Side */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <Card className="border transition-all duration-300 hover:shadow-lg" style={{ borderColor: '#000' }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl" style={{ color: 'black' }}>Project Progress</CardTitle>
                  <CardDescription style={{ color: 'black' }}>Interactive house visualization and property insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left: Interactive House Visualization */}
                    <div>
                      <ProgressiveHouseVisualization currentWeek={currentWeek} projectProgress={projectProgress} />
                    </div>

                    {/* Right: Property Value + AI Visualizer */}
                    <div>
                      <PropertyValueAIVisualizer
                        roomType="house"
                        title="Property Value & AI Visualizer"
                        defaultAddress={propertyAddress}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent & Upcoming Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border animate-slide-in-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: '#000', backgroundColor: '#D1FAE5', animationDelay: '200ms' }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl" style={{ color: 'black' }}>Recent</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="pb-3 border-b border-gray-200">
                      <p className="font-medium text-base" style={{ color: 'black' }}>Drywall Installed</p>
                      <p className="text-sm mt-0.5" style={{ color: 'black' }}>2 days ago</p>
                    </div>
                    <div className="pb-3 border-b border-gray-200">
                      <p className="font-medium text-base" style={{ color: 'black' }}>Electrical Rough-In Complete</p>
                      <p className="text-sm mt-0.5" style={{ color: 'black' }}>4 days ago</p>
                    </div>
                    <div className="pb-0">
                      <p className="font-medium text-base" style={{ color: 'black' }}>Framing Inspection Passed</p>
                      <p className="text-sm mt-0.5" style={{ color: 'black' }}>1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border animate-slide-in-right transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: '#000', backgroundColor: '#FEF3C7', animationDelay: '300ms' }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl" style={{ color: 'black' }}>Upcoming</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="pb-3 border-b border-gray-200">
                      <p className="font-medium text-base" style={{ color: 'black' }}>Painting Begins</p>
                      <p className="text-sm mt-0.5" style={{ color: 'black' }}>Next Monday</p>
                    </div>
                    <div className="pb-3 border-b border-gray-200">
                      <p className="font-medium text-base" style={{ color: 'black' }}>Fixture Installation</p>
                      <p className="text-sm mt-0.5" style={{ color: 'black' }}>In 1 week</p>
                    </div>
                    <div className="pb-0">
                      <p className="font-medium text-base" style={{ color: 'black' }}>Final Inspection</p>
                      <p className="text-sm mt-0.5" style={{ color: 'black' }}>In 2 weeks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Contractor - Prominent Section */}
            <Card className="mb-8 border-2 animate-scale-in transition-all duration-300 hover:shadow-xl" style={{ borderColor: '#3B82F6', backgroundColor: '#DBEAFE', animationDelay: '400ms' }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'black' }}>Contact Your Contractor</h3>
                    <p className="text-sm" style={{ color: 'black' }}>John's Construction LLC • (555) 123-4567</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="gap-2"
                      style={{ backgroundColor: '#3B82F6', color: 'white' }}
                      onClick={() => setActiveTab('messages')}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </>
        )}

        {/* Permits Tab */}
        {activeTab === 'permits' && (
          <div className="mb-8">
            <Card className="border" style={{ borderColor: '#000' }}>
              <CardHeader>
                <CardTitle style={{ color: 'black' }}>Building Permits</CardTitle>
                <CardDescription style={{ color: '#059669' }}>Track the status of all permits for your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-2 border-green-600 bg-green-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" style={{ color: '#059669' }}>Electrical Permit</h4>
                        <p className="text-sm mb-2" style={{ color: '#059669' }}>Permit #EL-2024-1234</p>
                        <p className="text-sm" style={{ color: '#6b7280' }}>Approved on November 15, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">Approved</span>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-green-600 bg-green-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" style={{ color: '#059669' }}>Plumbing Permit</h4>
                        <p className="text-sm mb-2" style={{ color: '#059669' }}>Permit #PL-2024-5678</p>
                        <p className="text-sm" style={{ color: '#6b7280' }}>Approved on November 18, 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">Approved</span>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-yellow-500 bg-yellow-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" style={{ color: '#d97706' }}>Final Inspection</h4>
                        <p className="text-sm mb-2" style={{ color: '#d97706' }}>Scheduled for December 10, 2024</p>
                        <p className="text-sm" style={{ color: '#6b7280' }}>Pending completion of finishing work</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">Pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="mb-8">
            <Card className="border" style={{ borderColor: '#000' }}>
              <CardHeader>
                <CardTitle style={{ color: 'black' }}>Project Documents</CardTitle>
                <CardDescription style={{ color: '#059669' }}>View and download all project-related documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold" style={{ color: 'black' }}>Contract Agreement</h4>
                        <p className="text-sm text-gray-600">Signed on Oct 15, 2024</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold" style={{ color: 'black' }}>Building Permits</h4>
                        <p className="text-sm text-gray-600">Approved Nov 15, 2024</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-purple-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold" style={{ color: 'black' }}>Material Invoices</h4>
                        <p className="text-sm text-gray-600">Updated Nov 20, 2024</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-red-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold" style={{ color: 'black' }}>Progress Photos</h4>
                        <p className="text-sm text-gray-600">28 photos</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="mb-8">
            <Card className="border" style={{ borderColor: '#000' }}>
              <CardHeader>
                <CardTitle style={{ color: 'black' }}>Messages</CardTitle>
                <CardDescription style={{ color: '#059669' }}>Communicate with your contractor</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Send Message Form */}
                <form onSubmit={handleSendMessage} className="mb-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <h4 className="font-semibold mb-4" style={{ color: 'black' }}>Send New Message</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium" style={{ color: '#059669' }}>Subject</label>
                      <input
                        type="text"
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Question about timeline"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium" style={{ color: '#059669' }}>Message</label>
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        required
                        rows={4}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        placeholder="Type your message here..."
                      />
                    </div>
                    <Button
                      type="submit"
                      style={{ backgroundColor: '#059669', color: 'white' }}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </form>

                {/* Message History */}
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: 'black' }}>Message History</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold" style={{ color: '#2563eb' }}>John's Construction</p>
                          <p className="text-xs text-gray-600">2 days ago</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-1" style={{ color: '#1e40af' }}>Update on Progress</p>
                      <p className="text-sm text-gray-700">The drywall installation is complete! We're on schedule to start painting next week.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold" style={{ color: '#059669' }}>You</p>
                          <p className="text-xs text-gray-600">5 days ago</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-1" style={{ color: '#047857' }}>Timeline Check-in</p>
                      <p className="text-sm text-gray-700">Hi John, just wanted to confirm we're still on track for the December completion date?</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold" style={{ color: '#2563eb' }}>John's Construction</p>
                          <p className="text-xs text-gray-600">1 week ago</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-1" style={{ color: '#1e40af' }}>Permit Approved!</p>
                      <p className="text-sm text-gray-700">Great news - all permits have been approved. We can proceed with the electrical and plumbing work.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnhancedHomeownerDashboard;
