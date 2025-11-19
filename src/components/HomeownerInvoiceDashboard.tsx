import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, DollarSign, Eye, Download } from 'lucide-react';
import '../styles/HomeownerInvoiceDashboard.css';

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

interface InvoiceDashboardProps {
  projectTitle: string;
  totalBudget: number;
  invoices: Invoice[];
  onPayInvoice: (invoiceId: string) => void;
}

const HomeownerInvoiceDashboard: React.FC<InvoiceDashboardProps> = ({
  projectTitle,
  totalBudget,
  invoices,
  onPayInvoice
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'overdue');
  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const totalPaid = paidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPending = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);
  const amountPaidPercent = (totalPaid / totalBudget) * 100;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return { icon: CheckCircle, color: 'green', label: 'Paid', bg: 'bg-green-100' };
      case 'pending':
        return { icon: Clock, color: 'yellow', label: 'Pending', bg: 'bg-yellow-100' };
      case 'overdue':
        return { icon: AlertCircle, color: 'red', label: 'Overdue', bg: 'bg-red-100' };
      default:
        return { icon: Clock, color: 'gray', label: 'Unknown', bg: 'bg-gray-100' };
    }
  };

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedInvoice(null), 300);
  };

  return (
    <div className="invoice-dashboard">
      {/* Header */}
      <div className="invoice-header">
        <h2>Project Invoices & Payments</h2>
        <p className="project-title">{projectTitle}</p>
      </div>

      {/* Payment Summary */}
      <div className="payment-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <DollarSign size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Budget</span>
            <span className="summary-amount">${totalBudget.toLocaleString()}</span>
          </div>
        </div>

        <div className="summary-card paid">
          <div className="summary-icon">
            <CheckCircle size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Amount Paid</span>
            <span className="summary-amount">${totalPaid.toLocaleString()}</span>
            <span className="summary-percent">{amountPaidPercent.toFixed(0)}% of budget</span>
          </div>
        </div>

        <div className="summary-card pending">
          <div className="summary-icon">
            <AlertCircle size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Amount Pending</span>
            <span className="summary-amount">${totalPending.toLocaleString()}</span>
            <span className="summary-percent">{pendingInvoices.length} invoice(s)</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Payment Progress</span>
          <span className="progress-percent">{amountPaidPercent.toFixed(0)}% Paid</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${amountPaidPercent}%` }}></div>
        </div>
        <div className="progress-milestones">
          <span>${totalPaid.toLocaleString()} paid</span>
          <span>${totalPending.toLocaleString()} pending</span>
          <span>${(totalBudget - totalPaid - totalPending).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <div className="invoices-section pending-section">
          <h3 className="section-title">
            <AlertCircle size={20} />
            Pending Invoices ({pendingInvoices.length})
          </h3>
          <div className="invoices-list">
            {pendingInvoices.map((invoice) => {
              const badge = getStatusBadge(invoice.status);
              const StatusIcon = badge.icon;
              return (
                <div key={invoice.id} className={`invoice-card ${invoice.status}`}>
                  <div className="invoice-main">
                    <div className="invoice-info">
                      <div className="invoice-header-row">
                        <h4 className="invoice-title">{invoice.milestonePercentage}% Milestone</h4>
                        <span className={`status-badge ${badge.bg}`}>
                          <StatusIcon size={14} />
                          {badge.label}
                        </span>
                      </div>
                      <p className="invoice-description">{invoice.description}</p>
                      <div className="invoice-details">
                        <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="invoice-amount">
                      <div className="amount-value">${invoice.amount.toLocaleString()}</div>
                      <div className="amount-label">Due Now</div>
                    </div>
                  </div>
                  <div className="invoice-actions">
                    <button
                      className="btn-details"
                      onClick={() => handleViewDetails(invoice)}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button
                      className="btn-pay"
                      onClick={() => onPayInvoice(invoice.id)}
                    >
                      Pay ${invoice.amount.toLocaleString()}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Paid Invoices */}
      {paidInvoices.length > 0 && (
        <div className="invoices-section paid-section">
          <h3 className="section-title">
            <CheckCircle size={20} />
            Payment History ({paidInvoices.length})
          </h3>
          <div className="invoices-list">
            {paidInvoices.map((invoice) => (
              <div key={invoice.id} className="invoice-card paid">
                <div className="invoice-main">
                  <div className="invoice-info">
                    <div className="invoice-header-row">
                      <h4 className="invoice-title">{invoice.milestonePercentage}% Milestone</h4>
                      <span className="status-badge bg-green-100">
                        <CheckCircle size={14} />
                        Paid
                      </span>
                    </div>
                    <p className="invoice-description">{invoice.description}</p>
                    <div className="invoice-details">
                      <span>Paid: {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="invoice-amount paid">
                    <div className="amount-value">${invoice.amount.toLocaleString()}</div>
                    <div className="amount-label">Paid</div>
                  </div>
                </div>
                <div className="invoice-actions">
                  <button
                    className="btn-details"
                    onClick={() => handleViewDetails(invoice)}
                  >
                    <Eye size={16} />
                    View Receipt
                  </button>
                  <button className="btn-download">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {showDetails && selectedInvoice && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Invoice Details - {selectedInvoice.milestonePercentage}% Milestone</h3>
              <button className="modal-close" onClick={handleCloseDetails}>✕</button>
            </div>

            <div className="modal-body">
              {/* Invoice Info */}
              <div className="detail-section">
                <h4>Invoice Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Amount</span>
                    <span className="detail-value">${selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span className={`detail-value status-${selectedInvoice.status}`}>
                      {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Due Date</span>
                    <span className="detail-value">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</span>
                  </div>
                  {selectedInvoice.paidDate && (
                    <div className="detail-item">
                      <span className="detail-label">Paid Date</span>
                      <span className="detail-value">{new Date(selectedInvoice.paidDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="detail-section">
                <h4>Work Description</h4>
                <p className="detail-description">{selectedInvoice.description}</p>
              </div>

              {/* Contractor Notes */}
              {selectedInvoice.contractorNotes && (
                <div className="detail-section">
                  <h4>Contractor Notes</h4>
                  <p className="detail-description">{selectedInvoice.contractorNotes}</p>
                </div>
              )}

              {/* Progress Photos */}
              {selectedInvoice.photos && selectedInvoice.photos.length > 0 && (
                <div className="detail-section">
                  <h4>Progress Photos ({selectedInvoice.photos.length})</h4>
                  <div className="photos-grid">
                    {selectedInvoice.photos.map((photo, index) => (
                      <div key={index} className="photo-item">
                        <img src={photo} alt={`Progress ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            {selectedInvoice.status === 'pending' && (
              <div className="modal-actions">
                <button className="btn-cancel" onClick={handleCloseDetails}>Close</button>
                <button className="btn-pay-modal" onClick={() => {
                  onPayInvoice(selectedInvoice.id);
                  handleCloseDetails();
                }}>
                  Pay ${selectedInvoice.amount.toLocaleString()}
                </button>
              </div>
            )}
            {selectedInvoice.status === 'paid' && (
              <div className="modal-actions">
                <button className="btn-close-modal" onClick={handleCloseDetails}>Close</button>
                <button className="btn-download-modal">
                  <Download size={16} />
                  Download Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeownerInvoiceDashboard;
