import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { DollarSign, TrendingUp, Users, FileText, ArrowLeft, CheckCircle, Clock, XCircle, Plus } from "lucide-react";
import { LanguageSelector } from "../components/LanguageSelector";
import { useState } from "react";

const Revenue = () => {
  const navigate = useNavigate();
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  const revenueData = [
    { month: "Jan", revenue: 24500 },
    { month: "Feb", revenue: 28200 },
    { month: "Mar", revenue: 31800 },
    { month: "Apr", revenue: 35400 },
  ];

  const [payments, setPayments] = useState([
    { id: "1", clientName: "John Smith", project: "Kitchen Remodel", amount: 15000, status: "paid", dueDate: "2024-11-01", paidDate: "2024-10-28" },
    { id: "2", clientName: "Sarah Johnson", project: "Bathroom Renovation", amount: 8500, status: "pending", dueDate: "2024-11-15", paidDate: null },
    { id: "3", clientName: "Mike Davis", project: "Deck Addition", amount: 12000, status: "paid", dueDate: "2024-10-20", paidDate: "2024-10-20" },
    { id: "4", clientName: "Emily Wilson", project: "Basement Finishing", amount: 18500, status: "overdue", dueDate: "2024-11-05", paidDate: null },
  ]);

  const currentRevenue = 42300;
  const growthPercent = "+8.7%";

  const handleAddPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPayment = {
      id: String(payments.length + 1),
      clientName: formData.get('clientName') as string,
      project: formData.get('project') as string,
      amount: Number(formData.get('amount')),
      status: 'pending',
      dueDate: formData.get('dueDate') as string,
      paidDate: null
    };
    setPayments([...payments, newPayment]);
    setShowAddPaymentModal(false);
  };

  const togglePaymentStatus = (paymentId: string) => {
    setPayments(payments.map(p => {
      if (p.id === paymentId) {
        if (p.status === 'paid') {
          return { ...p, status: 'pending', paidDate: null };
        } else {
          return { ...p, status: 'paid', paidDate: new Date().toISOString().split('T')[0] };
        }
      }
      return p;
    }));
  };

  const totalPending = payments.filter(p => p.status === 'pending' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

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
              <h1 className="text-2xl font-bold" style={{ color: '#10B981' }}>Revenue Analytics</h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#10B981' }}>Revenue Overview</h2>
          <p className="text-gray-600">
            Track your earnings and manage your client management tool subscription
          </p>
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="p-6 bg-card border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 text-emerald-600">Total Revenue</p>
                <p className="text-3xl font-bold text-emerald-700">
                  ${currentRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {growthPercent} from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-emerald-100">
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 text-purple-600">Active Clients</p>
                <p className="text-3xl font-bold text-purple-700">8</p>
                <p className="text-sm mt-2 text-purple-600">
                  2 new this month
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 text-blue-600">Active Projects</p>
                <p className="text-3xl font-bold text-blue-700">12</p>
                <p className="text-sm mt-2 text-blue-600">
                  5 in progress
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1 text-orange-600">Avg Project Value</p>
                <p className="text-3xl font-bold text-orange-700">$5,288</p>
                <p className="text-sm mt-2 text-orange-600">
                  Per client
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="p-6 bg-card border-t-4 border-emerald-500 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-100">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-700">Monthly Revenue Trend</h3>
          </div>
          <div className="space-y-4">
            {revenueData.map((data) => {
              const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
              const barWidth = (data.revenue / maxRevenue) * 100;

              return (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{data.month}</span>
                    <span className="font-semibold text-emerald-700">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-8 bg-muted rounded-full overflow-hidden border border-emerald-100">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-400 to-emerald-600"
                      style={{
                        width: `${barWidth}%`,
                        boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Payment Tracking Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold" style={{ color: '#10B981' }}>Payment Tracking</h3>
              <p className="text-sm text-gray-600">Track payments from clients</p>
            </div>
            <Button
              className="gap-2"
              style={{ backgroundColor: '#10B981', color: 'white' }}
              onClick={() => setShowAddPaymentModal(true)}
            >
              <Plus className="h-4 w-4" />
              Add Payment
            </Button>
          </div>

          {/* Payment Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="p-6 bg-card border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1 text-green-600">Total Paid</p>
                  <p className="text-3xl font-bold text-green-700">
                    ${totalPaid.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1 text-yellow-600">Total Pending</p>
                  <p className="text-3xl font-bold text-yellow-700">
                    ${totalPending.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Payments List */}
          <Card className="bg-card border-t-4 border-emerald-500">
            <div className="p-6">
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border-l-4 border border-border rounded-lg hover:bg-muted/50 transition-colors" style={{ borderLeftColor: payment.status === 'paid' ? '#10B981' : payment.status === 'pending' ? '#3B82F6' : '#EF4444' }}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg text-gray-800">{payment.clientName}</h4>
                        {payment.status === 'paid' && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Paid
                          </span>
                        )}
                        {payment.status === 'pending' && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                        {payment.status === 'overdue' && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-black flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            Overdue
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{payment.project}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                        {payment.paidDate && <span>Paid: {new Date(payment.paidDate).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                          ${payment.amount.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePaymentStatus(payment.id)}
                        style={{ borderColor: '#10B981', color: '#10B981' }}
                      >
                        {payment.status === 'paid' ? 'Mark Unpaid' : 'Mark Paid'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddPaymentModal(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#10B981' }}>Add Payment</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddPaymentModal(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>
              <form onSubmit={handleAddPayment} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#10B981' }}>Client Name *</label>
                    <input
                      type="text"
                      name="clientName"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#10B981' }}>Project Name *</label>
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
                    <label className="text-sm font-medium" style={{ color: '#10B981' }}>Amount *</label>
                    <input
                      type="number"
                      name="amount"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="5000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#10B981' }}>Due Date *</label>
                    <input
                      type="date"
                      name="dueDate"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddPaymentModal(false)}
                    style={{ borderColor: '#10B981', color: '#10B981' }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: '#059669', color: 'white' }}
                    className="flex-1"
                  >
                    Add Payment
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Revenue;
