import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { DollarSign, TrendingUp, Users, FileText, ArrowLeft } from "lucide-react";
import { LanguageSelector } from "../components/LanguageSelector";

const Revenue = () => {
  const navigate = useNavigate();

  const revenueData = [
    { month: "Jan", revenue: 24500 },
    { month: "Feb", revenue: 28200 },
    { month: "Mar", revenue: 31800 },
    { month: "Apr", revenue: 35400 },
  ];

  const currentRevenue = 42300;
  const growthPercent = "+8.7%";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/contractor/dashboard")}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold" style={{color: '#10B981'}}>Revenue Analytics</h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{color: '#10B981'}}>Revenue Overview</h2>
          <p style={{color: '#10B981'}}>
            Track your earnings and manage your client management tool subscription
          </p>
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{color: '#10B981'}}>Total Revenue</p>
                <p className="text-3xl font-bold" style={{color: '#10B981'}}>
                  ${currentRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-primary mt-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {growthPercent} from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{color: '#10B981'}}>Active Clients</p>
                <p className="text-3xl font-bold" style={{color: '#10B981'}}>8</p>
                <p className="text-sm mt-2" style={{color: '#10B981'}}>
                  2 new this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{color: '#10B981'}}>Active Projects</p>
                <p className="text-3xl font-bold" style={{color: '#10B981'}}>12</p>
                <p className="text-sm mt-2" style={{color: '#10B981'}}>
                  5 in progress
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{color: '#10B981'}}>Avg Project Value</p>
                <p className="text-3xl font-bold" style={{color: '#10B981'}}>$5,288</p>
                <p className="text-sm mt-2" style={{color: '#10B981'}}>
                  Per client
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="p-6 bg-card border-border mb-8">
          <h3 className="text-xl font-semibold mb-6" style={{color: '#10B981'}}>Monthly Revenue Trend</h3>
          <div className="space-y-4">
            {revenueData.map((data) => {
              const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
              const barWidth = (data.revenue / maxRevenue) * 100;
              
              return (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{color: '#10B981'}} className="font-medium">{data.month}</span>
                    <span style={{color: '#10B981'}} className="font-semibold">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-lg transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Revenue;
