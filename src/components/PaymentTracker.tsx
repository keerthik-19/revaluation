import { DollarSign, CheckCircle, Clock, Circle } from 'lucide-react';

interface PaymentMilestone {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'upcoming';
  week?: number;
}

interface PaymentTrackerProps {
  totalBudget: number;
  currentWeek?: number;
  clientName?: string;
}

const PaymentTracker = ({ totalBudget, currentWeek = 3, clientName }: PaymentTrackerProps) => {
  const milestones: PaymentMilestone[] = [
    {
      id: '1',
      name: 'Down Payment',
      percentage: 20,
      amount: totalBudget * 0.20,
      dueDate: 'Oct 1, 2024',
      status: 'paid',
      week: 0
    },
    {
      id: '2',
      name: 'Foundation Complete',
      percentage: 40,
      amount: totalBudget * 0.20,  // 20% increment
      dueDate: 'Oct 15, 2024',
      status: currentWeek >= 2 ? 'paid' : 'pending',
      week: 1
    },
    {
      id: '3',
      name: 'Framing Complete',
      percentage: 60,
      amount: totalBudget * 0.20,  // 20% increment
      dueDate: 'Oct 29, 2024',
      status: currentWeek >= 3 ? 'paid' : currentWeek === 2 ? 'pending' : 'upcoming',
      week: 2
    },
    {
      id: '4',
      name: 'Systems Complete',
      percentage: 90,
      amount: totalBudget * 0.30,  // 30% increment
      dueDate: 'Nov 12, 2024',
      status: currentWeek >= 4 ? 'paid' : currentWeek === 3 ? 'pending' : 'upcoming',
      week: 3
    },
    {
      id: '5',
      name: 'Final Payment',
      percentage: 100,
      amount: totalBudget * 0.10,  // 10% increment
      dueDate: 'Nov 26, 2024',
      status: currentWeek > 4 ? 'paid' : currentWeek === 4 ? 'pending' : 'upcoming',
      week: 4
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-600 animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Paid</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">Due Now</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-400 text-white">Upcoming</span>;
    }
  };

  // Calculate cumulative totals for display
  const cumulativePercentages = [20, 40, 60, 90, 100];
  
  const totalPaid = milestones
    .filter(m => m.status === 'paid')
    .reduce((sum, m) => sum + m.amount, 0);

  const paidPercentage = (totalPaid / totalBudget) * 100;

  return (
    <div className="payment-tracker-container">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold flex items-center gap-2" style={{color: '#10B981'}}>
            <DollarSign className="w-6 h-6" />
            Payment Schedule
          </h3>
          {clientName && (
            <span className="text-sm text-gray-600">{clientName}</span>
          )}
        </div>
        
        {/* Overall Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{color: '#059669'}}>Total Collected</span>
            <span className="text-lg font-bold" style={{color: '#10B981'}}>
              ${totalPaid.toLocaleString()} / ${totalBudget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-green-600 transition-all duration-500"
              style={{ width: `${paidPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{paidPercentage.toFixed(0)}% collected</p>
        </div>
      </div>

      {/* Timeline Visual */}
      <div className="relative mb-6 hidden md:block">
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-green-600 transition-all duration-500"
            style={{ width: `${((currentWeek) / 4) * 100}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex flex-col items-center">
              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                milestone.status === 'paid' ? 'bg-green-600' : 
                milestone.status === 'pending' ? 'bg-yellow-500' : 
                'bg-gray-300'
              }`}>
                <span className="text-white font-bold text-sm">{milestone.percentage}%</span>
              </div>
              <span className="text-xs text-center font-medium" style={{color: '#059669'}}>
                Week {milestone.week}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone List */}
      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <div 
            key={milestone.id}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              milestone.status === 'paid' 
                ? 'border-green-600 bg-green-50' 
                : milestone.status === 'pending'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(milestone.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-base" style={{
                      color: milestone.status === 'paid' ? '#059669' : 
                             milestone.status === 'pending' ? '#d97706' : 
                             '#6b7280'
                    }}>
                      {milestone.name}
                    </p>
                    {getStatusBadge(milestone.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">Due: {milestone.dueDate}</span>
                    {milestone.week !== undefined && milestone.week > 0 && (
                      <span className="text-gray-600">• Week {milestone.week}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold" style={{color: '#10B981'}}>
                  ${milestone.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">{index === 0 ? milestone.percentage : milestone.percentage - cumulativePercentages[index - 1]}% increment</p>
              </div>
            </div>

            {/* Cumulative total */}
            <div className="mt-3 pt-3 border-t border-gray-300 text-xs text-gray-600">
              <span>Cumulative total: ${((cumulativePercentages[index] / 100) * totalBudget).toLocaleString()} ({cumulativePercentages[index]}% of total)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h4 className="font-semibold text-sm mb-2 text-blue-900">Payment Schedule Notes</h4>
        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
          <li>Payments are tied to project milestones and inspection approvals</li>
          <li>Each payment unlocks the next phase of work</li>
          <li>Weekly reminders sent 3 days before payment due date</li>
          <li>All payments processed securely through the portal</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentTracker;
