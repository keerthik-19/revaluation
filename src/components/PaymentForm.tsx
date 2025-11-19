import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import '../styles/PaymentForm.css';

interface PaymentFormProps {
  amount: number;
  description: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  description, 
  onSuccess, 
  onError 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: email,
        },
        redirect: 'if_required',
      });

      if (error) {
        setMessage(error.message || 'An error occurred during payment');
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setMessage(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="payment-header">
        <h3>Complete Your Payment</h3>
        <div className="payment-amount">
          <span className="amount-label">Amount:</span>
          <span className="amount-value">${amount.toFixed(2)}</span>
        </div>
        <p className="payment-description">{description}</p>
      </div>

      <div className="email-input-container">
        <label htmlFor="email" className="email-label">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="email-input"
          required
          disabled={isProcessing}
        />
      </div>

      <div className="payment-element-container">
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {message && (
        <div className={`payment-message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || isProcessing || !email}
        className="payment-submit-btn"
      >
        {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>

      <p className="payment-secure-note">
        🔒 Your payment information is secure and encrypted
      </p>
    </form>
  );
};

export default PaymentForm;
