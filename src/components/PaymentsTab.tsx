import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import { useInvoicePayment } from '../hooks/useInvoices';
import '../styles/PaymentsTab.css';

interface Invoice {
  id: string;
  milestonePercentage: number;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  paidDate?: string;
  contractorNotes?: string;
  photos?: string[];
}

interface PaymentsTabProps {
  projectId: string;
  projectTitle: string;
  totalBudget: number;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Checkout Form Component
const PaymentForm: React.FC<{
  invoice: Invoice;
  onSuccess: () => void;
  onError: (error: string) => void;
}> = ({ invoice, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { createPaymentIntent, updateInvoiceStatus, loading } = useInvoicePayment();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onError('Stripe not loaded');
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const { clientSecret, paymentIntentId } = await createPaymentIntent(
        invoice.id,
        invoice.amount,
        `Payment for ${invoice.description}`
      );

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {},
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        // Update invoice status
        await updateInvoiceStatus(invoice.id, 'paid', paymentIntentId, 'stripe');
        onSuccess();
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || processing || loading}
        className="payment-submit-btn"
      >
        {processing || loading ? 'Processing...' : `Pay $${invoice.amount.toFixed(2)}`}
      </button>
    </form>
  );
};

// Invoice Card Component
const InvoiceCard: React.FC<{
  invoice: Invoice;
  onSelectPayment: (invoice: Invoice) => void;
  isSelected: boolean;
}> = ({ invoice, onSelectPayment, isSelected }) => {
  const navigate = useNavigate();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'overdue':
        return { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const badge = getStatusBadge(invoice.status);
  const StatusIcon = badge.icon;

  return (
    <div className={`invoice-card-item ${isSelected ? 'selected' : ''} ${invoice.status}`}>
      <div className="invoice-card-header" onClick={() => onSelectPayment(invoice)}>
        <div className="invoice-card-left">
          <h4 className="invoice-card-title">{invoice.milestonePercentage}% Milestone</h4>
          <p className="invoice-card-description">{invoice.description}</p>
          <div className="invoice-card-meta">
            <span className="invoice-due-date">
              Due: {new Date(invoice.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="invoice-card-right">
          <div className="invoice-card-amount">${invoice.amount.toFixed(2)}</div>
          <span className={`invoice-card-badge ${badge.bg} ${badge.color}`}>
            <StatusIcon size={14} />
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
        </div>
      </div>

      {isSelected && invoice.status === 'pending' && (
        <div className="invoice-card-expand">
          <div className="portal-inline-actions">
            <button
              className="portal-link-btn"
              onClick={() =>
                navigate('/payment', {
                  state: {
                    invoiceId: invoice.id,
                    amount: invoice.amount,
                    description: `${invoice.milestonePercentage}% Milestone Payment`,
                  },
                })
              }
            >
              <ExternalLink size={14} /> Open in Payment Portal
            </button>
          </div>
          <Elements stripe={stripePromise}>
            <PaymentForm
              invoice={invoice}
              onSuccess={() => {
                alert('Payment successful!');
              }}
              onError={(error) => {
                alert(`Payment error: ${error}`);
              }}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

const PaymentsTabContent: React.FC<PaymentsTabProps> = ({
  projectId,
  projectTitle,
  totalBudget,
}) => {
  const navigate = useNavigate();
  const { invoices, loading, error } = useInvoices(projectId);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  // Transform invoices to match Invoice interface
  const transformedInvoices = invoices.map(inv => ({
    id: inv.id,
    milestonePercentage: inv.percentage,
    amount: inv.amount,
    description: inv.description,
    status: inv.status as 'pending' | 'paid' | 'overdue',
    dueDate: inv.dueDate,
    paidDate: inv.paidDate,
    contractorNotes: undefined,
    photos: undefined,
  }));

  const pendingInvoices = transformedInvoices.filter(i => i.status === 'pending' || i.status === 'overdue');
  const paidInvoices = transformedInvoices.filter(i => i.status === 'paid');
  const totalPaid = paidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPending = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);
  const amountPaidPercent = (totalPaid / totalBudget) * 100;

  if (loading) {
    return (
      <div className="payments-tab-loading">
        <p>Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payments-tab-error">
        <AlertCircle size={24} />
        <p>Error loading invoices: {error}</p>
      </div>
    );
  }

  return (
    <div className="payments-tab-container">
      {/* Header */}
      <div className="payments-tab-header">
        <div>
          <h2>Payments & Invoices</h2>
          <p className="payments-tab-subtitle">{projectTitle}</p>
        </div>
        <div className="payments-actions">
          <button
            className="open-portal-btn"
            onClick={() =>
              navigate('/payment', {
                state: {
                  amount: 49.99,
                  description: 'Premium ROI Report',
                },
              })
            }
          >
            <ExternalLink size={14} /> Open Payment Portal
          </button>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="payment-summary-cards">
        <div className="payment-summary-card">
          <div className="summary-card-icon">
            <DollarSign size={24} />
          </div>
          <div className="summary-card-content">
            <span className="summary-card-label">Total Budget</span>
            <span className="summary-card-amount">${totalBudget.toLocaleString()}</span>
          </div>
        </div>

        <div className="payment-summary-card paid">
          <div className="summary-card-icon">
            <CheckCircle size={24} />
          </div>
          <div className="summary-card-content">
            <span className="summary-card-label">Amount Paid</span>
            <span className="summary-card-amount">${totalPaid.toLocaleString()}</span>
            <span className="summary-card-percent">{amountPaidPercent.toFixed(0)}% of budget</span>
          </div>
        </div>

        <div className="payment-summary-card pending">
          <div className="summary-card-icon">
            <AlertCircle size={24} />
          </div>
          <div className="summary-card-content">
            <span className="summary-card-label">Amount Pending</span>
            <span className="summary-card-amount">${totalPending.toLocaleString()}</span>
            <span className="summary-card-percent">{pendingInvoices.length} invoice(s)</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="payment-progress-section">
        <div className="progress-header">
          <span className="progress-label">Payment Progress</span>
          <span className="progress-percent">{amountPaidPercent.toFixed(0)}% Paid</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${amountPaidPercent}%` }}></div>
        </div>
        <div className="progress-stats">
          <span>${totalPaid.toLocaleString()} paid</span>
          <span>${totalPending.toLocaleString()} pending</span>
          <span>${(totalBudget - totalPaid - totalPending).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <div className="invoices-section">
          <h3 className="invoices-section-title">
            <Clock size={20} />
            Pending Invoices ({pendingInvoices.length})
          </h3>
          <div className="invoices-list">
            {pendingInvoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onSelectPayment={(inv) => setSelectedInvoiceId(selectedInvoiceId === inv.id ? null : inv.id)}
                isSelected={selectedInvoiceId === invoice.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Paid Invoices */}
      {paidInvoices.length > 0 && (
        <div className="invoices-section">
          <h3 className="invoices-section-title">
            <CheckCircle size={20} />
            Payment History ({paidInvoices.length})
          </h3>
          <div className="invoices-list">
            {paidInvoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onSelectPayment={() => {}}
                isSelected={false}
              />
            ))}
          </div>
        </div>
      )}

      {transformedInvoices.length === 0 && (
        <div className="payments-tab-empty">
          <p>No invoices yet. Check back when work milestones are completed.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentsTabContent;
