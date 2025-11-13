import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle2, Users, Calendar, FileText, TrendingUp, CheckSquare, Home, DollarSign, BarChart, MessageSquare } from "lucide-react";
import { LanguageSelector } from "../components/LanguageSelector";
import Logo from '../components/Logo';
import PropertySearchForm from '../components/PropertySearchForm';

const ModernLandingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Logo width={40} height={40} />
            <h1 className="text-2xl font-bold text-foreground">Assemble</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-foreground transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-muted-foreground hover:text-foreground transition-colors">How it works</button>
            <button onClick={() => scrollToSection('pricing')} className="text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button variant="ghost" onClick={() => navigate('/login')}>Sign in</Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Free renovation planning tool
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Plan Renovations That<br />
                <span className="text-primary">Actually Add Value</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Not all renovations are worth it. A $30K deck might only add $8K to your home's value. 
                But a $22K kitchen remodel? That could add $45K. See the real numbers for YOUR property.
              </p>
              <div className="mb-8">
                <PropertySearchForm 
                  onSearchStart={() => console.log('Search started')}
                  onSearchComplete={(results) => navigate('/estimate-results', { state: { results } })}
                  onSearchError={(error) => console.error('Error:', error)}
                />
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Free tool</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No signup required</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="space-y-4">
                <Card className="border-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Home className="h-4 w-4" />
                      <span>EXAMPLE: CURRENT VALUE</span>
                    </div>
                    <CardTitle className="text-4xl font-bold">$450K</CardTitle>
                    <CardDescription>Before renovations</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-2 border-primary bg-primary/5">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>PROJECTED VALUE</span>
                    </div>
                    <CardTitle className="text-4xl font-bold text-primary">$595K</CardTitle>
                    <CardDescription className="text-primary/80">+$145K in improvements</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Permit Status</span>
                        <span className="text-sm text-muted-foreground">3 of 4 approved</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">JM</div>
                        <div>
                          <p className="font-medium">James Miller</p>
                          <p className="text-sm text-muted-foreground">⭐ 4.9</p>
                        </div>
                      </div>
                      <Button size="sm">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute -top-4 -right-4 bg-card border rounded-full px-4 py-2 shadow-lg">
                <span className="text-sm font-medium">⚡ Instant updates</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border rounded-full px-4 py-2 shadow-lg">
                <span className="text-sm font-medium">🔒 Bank-level security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Three simple steps to make smarter renovation decisions</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Enter Your Address', desc: 'We analyze your property\'s current value using real market data and comparable sales.' },
              { num: '2', title: 'See Renovation Options', desc: 'Get instant ROI for kitchen, bathroom, pool, and more—customized for your property.' },
              { num: '3', title: 'Make Smart Decisions', desc: 'Know which projects add value to your home and which ones do not.' }
            ].map((step) => (
              <Card key={step.num} className="border-2 hover:border-primary transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{step.num}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Features</h2>
          <p className="text-center text-muted-foreground mb-12">Powerful tools for homeowners and contractors</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: TrendingUp, title: 'Property Value Tracking', desc: 'Monitor your property\'s estimated value increase.' },
              { Icon: DollarSign, title: 'Instant ROI Analysis', desc: 'Get immediate ROI calculations for any improvement.' },
              { Icon: BarChart, title: 'Data-Driven Decisions', desc: 'Make smart choices backed by real market data.' },
              { Icon: MessageSquare, title: 'Direct Communication', desc: 'Message contractors and get quick responses.' },
              { Icon: Users, title: 'Client Management', desc: 'Track all your clients in one location.' },
              { Icon: Calendar, title: 'Project Scheduling', desc: 'Visualize project timelines with calendar.' },
              { Icon: FileText, title: 'Permit Tracking', desc: 'Monitor permit applications and approvals.' },
              { Icon: CheckSquare, title: 'Task Management', desc: 'Assign and track tasks across your team.' }
            ].map((feature, i) => (
              <Card key={i} className="border-2 hover:border-primary transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">Start free, upgrade anytime</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '$0', features: ['Property value estimate', 'Basic ROI calculations', '5 renovation comparisons', 'Market trends', 'Email support'], popular: false },
              { name: 'Pro', price: '$5', features: ['Everything in Free', 'Unlimited ROI analyses', 'Detailed breakdowns', 'Contractor connections', 'AI Visualizer', 'Priority support'], popular: true },
              { name: 'Contractor', price: '$25', features: ['Up to 50 clients', 'Project scheduling', 'Permit tracking', 'Revenue analytics', 'Team collaboration', 'Dedicated support'], popular: false }
            ].map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary border-2 shadow-lg' : 'border-2'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} onClick={() => navigate('/select-role')}>Get Started</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Make Smarter Renovation Decisions?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of homeowners who stopped guessing and started knowing their renovation ROI</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/select-role')}>Get Started Free</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/tool')}>Try Demo</Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2025 Assemble. Make smarter renovation decisions.</p>
        </div>
      </footer>
    </div>
  );
};

export default ModernLandingPage;
