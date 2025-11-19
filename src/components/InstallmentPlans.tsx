import React, { useState } from 'react';
import { Check } from 'lucide-react';
import '../styles/InstallmentPlans.css';

interface InstallmentPlan {
  id: string;
  name: string;
  months: number;
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  interestRate: number;
  description: string;
  badge?: string;
}

interface InstallmentPlansProps {
  totalAmount: number;
  onSelectPlan: (plan: InstallmentPlan, paymentType: 'immediate' | 'subscription') => void;
  isLoading?: boolean;
}

const InstallmentPlans: React.FC<InstallmentPlansProps> = ({
  totalAmount,
  onSelectPlan,
  isLoading = false
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('immediate');

  // Define payment plans
  const plans: InstallmentPlan[] = [
    {
      id: 'immediate',
      name: 'Pay Now',
      months: 1,
      monthlyPayment: totalAmount,
      totalAmount: totalAmount,
      totalInterest: 0,
      interestRate: 0,
      description: 'Get instant access to your complete report',
      badge: 'Best Value'
    },
    {
      id: '3-month',
      name: '3-Month Plan',
      months: 3,
      monthlyPayment: Math.round((totalAmount / 3 + Number.EPSILON) * 100) / 100,
      totalAmount: Math.round((totalAmount / 3 * 3 + Number.EPSILON) * 100) / 100,
      totalInterest: 0,
      interestRate: 0,
      description: 'Split payments over 3 months - No interest'
    },
    {
      id: '6-month',
      name: '6-Month Plan',
      months: 6,
      monthlyPayment: Math.round((totalAmount / 6 + Number.EPSILON) * 100) / 100,
      totalAmount: Math.round((totalAmount / 6 * 6 + Number.EPSILON) * 100) / 100,
      totalInterest: 0,
      interestRate: 0,
      description: 'Spread payments over 6 months - No interest'
    },
    {
      id: '12-month',
      name: '12-Month Plan',
      months: 12,
      monthlyPayment: Math.round((totalAmount / 12 + Number.EPSILON) * 100) / 100,
      totalAmount: Math.round((totalAmount / 12 * 12 + Number.EPSILON) * 100) / 100,
      totalInterest: 0,
      interestRate: 0,
      description: 'Most flexible - 12 monthly payments, no interest'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(planId);
      const paymentType = planId === 'immediate' ? 'immediate' : 'subscription';
      onSelectPlan(plan, paymentType);
    }
  };

  return (
    <div className="installment-plans-container">
      <div className="plans-header">
        <h2>Choose Your Payment Plan</h2>
        <p>Select how you'd like to pay for your premium report</p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}

            <div className="plan-header">
              <h3>{plan.name}</h3>
              <p className="plan-duration">{plan.months} month{plan.months > 1 ? 's' : ''}</p>
            </div>

            <div className="plan-pricing">
              <div className="monthly-payment">
                <span className="label">Monthly Payment</span>
                <span className="amount">${plan.monthlyPayment.toFixed(2)}</span>
              </div>
              <div className="total-payment">
                <span className="label">Total</span>
                <span className="amount">${plan.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <p className="plan-description">{plan.description}</p>

            {plan.totalInterest === 0 && plan.months > 1 && (
              <div className="interest-free-badge">✓ No Interest</div>
            )}

            <div className="plan-features">
              <div className="feature">
                <Check size={16} />
                <span>Instant access to report</span>
              </div>
              <div className="feature">
                <Check size={16} />
                <span>Automatic monthly billing</span>
              </div>
              <div className="feature">
                <Check size={16} />
                <span>Cancel anytime</span>
              </div>
              <div className="feature">
                <Check size={16} />
                <span>24/7 support</span>
              </div>
            </div>

            <button
              className={`plan-select-btn ${selectedPlan === plan.id ? 'active' : ''}`}
              disabled={isLoading}
            >
              {selectedPlan === plan.id ? '✓ Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="plans-footer">
        <div className="security-info">
          <span>🔒</span>
          <p>All payments are secured and encrypted by Stripe</p>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPlans;
