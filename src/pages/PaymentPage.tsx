import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PaymentCheckout from '../components/PaymentCheckout';
import '../styles/PaymentPage.css';

interface PaymentPageState {
  amount?: number;
  description?: string;
  propertyAddress?: string;
  invoiceId?: string; // Invoice payments skip plan selection
  projectId?: string;
  percentage?: number;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PaymentPageState || {};
  
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');

  // Default values if not provided via route state
  const amount = state.amount || 49.99;
  const description = state.description || 'Home Renovation ROI Report';
  const propertyAddress = state.propertyAddress || 'Your Property';

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentStatus('success');
    
    // Redirect to success page after 2 seconds
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          paymentId: paymentIntentId,
          amount,
          propertyAddress 
        } 
      });
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error');
    console.error('Payment failed:', error);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="payment-page">
        <div className="payment-success-message">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Redirecting you to your report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>Secure Checkout</h1>
      </div>

      <div className="payment-page-content">
        <div className="payment-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span className="summary-label">Product:</span>
            <span className="summary-value">{description}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Property:</span>
            <span className="summary-value">{propertyAddress}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item total">
            <span className="summary-label">Total:</span>
            <span className="summary-value">${amount.toFixed(2)}</span>
          </div>
          
          <div className="benefits-list">
            <h3>What You'll Get:</h3>
            <ul>
              <li>✓ Detailed ROI analysis for all renovations</li>
              <li>✓ Property value projections</li>
              <li>✓ Contractor recommendations</li>
              <li>✓ Permit requirement tracking</li>
              <li>✓ Lifetime access to your report</li>
            </ul>
          </div>
        </div>

        <div className="payment-form-container">
          <PaymentCheckout
            amount={amount}
            description={description}
            metadata={{
              property_address: propertyAddress,
              product_type: 'roi_report',
            }}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
          
          {paymentStatus === 'error' && (
            <div className="error-retry">
              <p>Payment failed. Please try again or contact support.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
