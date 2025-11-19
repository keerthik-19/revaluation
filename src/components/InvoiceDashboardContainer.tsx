import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeownerInvoiceDashboard from './HomeownerInvoiceDashboard';
import { useInvoices } from '../hooks/useInvoices';

interface InvoiceDashboardContainerProps {
  projectId: string;
  projectTitle: string;
  totalBudget: number;
}

const InvoiceDashboardContainer: React.FC<InvoiceDashboardContainerProps> = ({
  projectId,
  projectTitle,
  totalBudget,
}) => {
  const navigate = useNavigate();
  const { invoices, loading, error, refetch } = useInvoices(projectId);

  const handlePayInvoice = (invoiceId: string) => {
    // Find the invoice to get amount
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) {
      console.error('Invoice not found:', invoiceId);
      return;
    }

    // Navigate to payment page with invoice details
    navigate('/payment', {
      state: {
        invoiceId,
        projectId,
        amount: invoice.amount,
        percentage: invoice.percentage,
        description: `${projectTitle} - ${invoice.percentage}% Milestone`,
      },
    });
  };

  if (loading) {
    return (
      <div className="p-6 bg-card rounded-lg border border-border">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-card rounded-lg border border-border">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error loading invoices: {error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Transform ProjectInvoice to Invoice format for HomeownerInvoiceDashboard
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

  return (
    <HomeownerInvoiceDashboard
      projectTitle={projectTitle}
      totalBudget={totalBudget}
      invoices={transformedInvoices}
      onPayInvoice={handlePayInvoice}
    />
  );
};

export default InvoiceDashboardContainer;
