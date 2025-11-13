import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Users, Calendar, FileText, MessageSquare, TrendingUp, CheckSquare, Camera, Clock } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { Chatbot } from "@/components/Chatbot";

const GeneralLanding = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const contractorFeatures = [
    {
      icon: Users,
      titleKey: "clientManagement",
      descKey: "clientManagementDesc"
    },
    {
      icon: Calendar,
      titleKey: "projectScheduling",
      descKey: "projectSchedulingDesc"
    },
    {
      icon: FileText,
      titleKey: "permitTracking",
      descKey: "permitTrackingDesc"
    },
    {
      icon: CheckSquare,
      titleKey: "taskManagement",
      descKey: "taskManagementDesc"
    },
  ];

  const homeownerFeatures = [
    {
      icon: TrendingUp,
      titleKey: "propertyValueTracking",
      descKey: "propertyValueTrackingDesc"
    },
    {
      icon: Clock,
      titleKey: "realTimeUpdates",
      descKey: "realTimeUpdatesDesc"
    },
    {
      icon: Camera,
      titleKey: "photoDocumentation",
      descKey: "photoDocumentationDesc"
    },
    {
      icon: MessageSquare,
      titleKey: "directCommunication",
      descKey: "directCommunicationDesc"
    },
  ];

  const pricingPlans = [
    {
      name: "Homeowner",
      price: "$5",
      description: "Perfect for homeowners tracking renovations",
      features: [
        "Single project tracking",
        "Real-time progress updates",
        "Photo gallery & documents",
        "Contractor messaging",
        "Property value estimates"
      ],
      userType: "homeowner"
    },
    {
      name: "Contractor Starter",
      price: "$10",
      description: "For small contractors getting started",
      features: [
        "Up to 10 active clients",
        "Client management tools",
        "Calendar scheduling",
        "Task management",
        "Email support"
      ],
      userType: "contractor"
    },
    {
      name: "Contractor Pro",
      price: "$25",
      description: "Ideal for growing contractor businesses",
      features: [
        "Up to 50 active clients",
        "All Starter features",
        "Permit tracking",
        "Revenue analytics",
        "Priority support"
      ],
      popular: true,
      userType: "contractor"
    },
    {
      name: "Enterprise",
      price: "$50",
      description: "For large contractor teams and agencies",
      features: [
        "Unlimited clients",
        "All Pro features",
        "Team collaboration",
        "Custom integrations",
        "Advanced reporting",
        "Dedicated account manager"
      ],
      userType: "contractor"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
            <img src="/logo.svg" alt="Assemble" className="h-12 w-auto drop-shadow-md" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">Assemble</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button 
              onClick={() => navigate("/select-role")}
              className="shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
              style={{backgroundColor: '#059669', color: 'white'}}
            >
              {t("getStarted")}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-50/30 via-white to-green-50/20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-block mb-4 px-4 py-2 bg-emerald-100 rounded-full">
                <span className="text-sm font-semibold" style={{color: '#059669'}}>🚀 Transform Your Projects</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent leading-tight">
                {t("heroTitle")}
              </h1>
              <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                {t("heroSubtitle")}
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/select-role")} 
                  className="shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
                  style={{backgroundColor: '#059669', color: 'white'}}
                >
                  {t("getStartedFree")}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
                  style={{borderColor: '#10B981', color: '#10B981', borderWidth: '2px'}}
                >
                  {t("watchDemo")}
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform hover:scale-[1.02] transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" 
                  alt="Modern home renovation"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl overflow-hidden shadow-2xl w-48 hidden lg:block border-4 border-white hover:scale-110 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" 
                  alt="Construction team"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative dot pattern */}
              <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(16)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full" style={{backgroundColor: '#10B981'}}></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" 
                alt="Contractor working"
                className="w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4" style={{color: '#10B981'}}>
                {t("forContractors")}
              </h2>
              <p className="text-lg mb-6" style={{color: '#10B981'}}>
                {t("contractorSubtitle")}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contractorFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 border-transparent hover:border-emerald-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg font-bold" style={{color: '#10B981'}}>{t(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Homeowner Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-4" style={{color: '#10B981'}}>
                {t("forHomeowners")}
              </h2>
              <p className="text-lg mb-6" style={{color: '#10B981'}}>
                {t("homeownerSubtitle")}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
                alt="Modern kitchen renovation"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeownerFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 border-transparent hover:border-emerald-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg font-bold" style={{color: '#10B981'}}>{t(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4" style={{color: '#10B981'}}>
            {t("pricing")}
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{color: '#10B981'}}>
            {t("pricingSubtitle")}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:-translate-y-2 transition-all duration-300 ${plan.popular ? 'border-emerald-500 border-2 shadow-2xl shadow-emerald-500/20 scale-105' : 'border-2 hover:border-emerald-300 hover:shadow-xl'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      ✨ {t("mostPopular")}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl" style={{color: '#10B981'}}>{plan.name}</CardTitle>
                  <CardDescription style={{color: '#10B981'}}>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold" style={{color: '#10B981'}}>{plan.price}</span>
                    <span style={{color: '#10B981'}}>{t("perMonth")}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs" style={{color: '#10B981'}}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate("/select-role")}
                  >
                    {t("startFreeTrial")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-green-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t("readyToStart")}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t("readySubtitle")}
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/select-role")}
            className="bg-white hover:bg-gray-50 text-emerald-600 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg px-8 py-6 h-auto"
          >
            {t("getStartedToday")} →
          </Button>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default GeneralLanding;
