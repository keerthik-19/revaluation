import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Users, Calendar, FileText, MessageSquare, TrendingUp, CheckSquare, Camera, Clock, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="Assemble" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold tracking-tight text-primary">Assemble</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button
              onClick={() => navigate("/select-role")}
              className="font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {t("getStarted")}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-primary bg-primary/10">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Transform Your Projects
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                {t("heroTitle")}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => navigate("/select-role")}
                  className="text-lg px-8 h-14 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("getStartedFree")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 h-14 border-2 hover:bg-secondary/50 transition-all duration-300"
                >
                  {t("watchDemo")}
                </Button>
              </div>
            </div>
            <div className="relative lg:ml-auto animate-fade-in-up delay-200">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-background/50 backdrop-blur-xl">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Modern home renovation"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-12 -left-12 w-64 rounded-xl overflow-hidden shadow-2xl ring-4 ring-background hidden lg:block animate-float">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80"
                  alt="Construction team"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Contractor working"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t("forContractors")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t("contractorSubtitle")}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {contractorFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-background/50 backdrop-blur-sm"
                  >
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base font-semibold">{t(feature.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Homeowner Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t("forHomeowners")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t("homeownerSubtitle")}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {homeownerFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-secondary/20"
                  >
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base font-semibold">{t(feature.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Modern kitchen renovation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t("pricing")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("pricingSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative flex flex-col transition-all duration-300 ${plan.popular
                    ? 'border-primary shadow-xl scale-105 z-10'
                    : 'hover:border-primary/50 hover:shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{t("perMonth")}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-20"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            {t("readyToStart")}
          </h2>
          <p className="text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto">
            {t("readySubtitle")}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/select-role")}
            variant="secondary"
            className="text-lg px-10 h-16 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 font-bold"
          >
            {t("getStartedToday")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default GeneralLanding;
