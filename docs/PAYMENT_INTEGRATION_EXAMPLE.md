# Payment Integration Example

## Adding "Purchase Full Report" to Estimate Results Page

Here's how to add a payment button to your existing estimate results page:

### Step 1: Import Dependencies

```tsx
import { useNavigate } from 'react-router-dom';
```

### Step 2: Add Navigation Handler

```tsx
const EstimateResults: React.FC = () => {
  const navigate = useNavigate();
  
  // Your existing state and logic...
  
  const handlePurchaseReport = () => {
    navigate('/payment', {
      state: {
        amount: 49.99, // or calculate dynamically
        description: 'Complete Home Renovation ROI Report',
        propertyAddress: propertyData.address // from your property data
      }
    });
  };
  
  return (
    // Your existing JSX...
  );
};
```

### Step 3: Add Purchase Button

```tsx
<div className="report-cta">
  <h3>Want the Complete Analysis?</h3>
  <p>Get detailed ROI projections, contractor matches, and permit tracking</p>
  
  <button 
    className="purchase-button"
    onClick={handlePurchaseReport}
  >
    Get Full Report - $49.99
  </button>
  
  <ul className="benefits">
    <li>✓ Detailed cost breakdowns</li>
    <li>✓ Vetted contractor matches</li>
    <li>✓ Permit requirements</li>
    <li>✓ Timeline estimates</li>
  </ul>
</div>
```

### Step 4: Add Styling

```css
.report-cta {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 2rem;
}

.report-cta h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.report-cta p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.purchase-button {
  background: white;
  color: #10b981;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.purchase-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.benefits {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  text-align: left;
  display: inline-block;
}

.benefits li {
  padding: 0.25rem 0;
  font-size: 0.875rem;
}
```

## Alternative: Inline Payment Modal

If you prefer a modal instead of a separate page:

```tsx
import { useState } from 'react';
import PaymentCheckout from '../components/PaymentCheckout';

const EstimateResults: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Payment successful!', paymentIntentId);
    setShowPaymentModal(false);
    // Unlock full report, update user access, etc.
  };
  
  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    // Show error message
  };
  
  return (
    <div>
      {/* Your existing content */}
      
      <button onClick={() => setShowPaymentModal(true)}>
        Purchase Full Report
      </button>
      
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowPaymentModal(false)}
            >
              ×
            </button>
            
            <PaymentCheckout
              amount={49.99}
              description="Complete Home Renovation ROI Report"
              metadata={{
                property_address: propertyData.address,
                user_id: userData.id
              }}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      )}
    </div>
  );
};
```

### Modal Styling

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  line-height: 1;
}

.modal-close:hover {
  color: #111827;
}
```

## Pricing Strategies

### Basic Report (Free)
- Property value estimate
- High-level ROI overview
- 3 renovation suggestions

### Premium Report ($49.99)
- Everything in Basic
- Detailed cost breakdowns
- 10+ renovation options
- Contractor recommendations
- Permit requirements
- Timeline estimates
- Priority support

### Pro Subscription ($29.99/month)
- Unlimited reports
- Real-time market updates
- Direct contractor messaging
- Project management tools
- Custom analytics

## Payment Flow Examples

### Example 1: Freemium Model
```tsx
// Show limited free report, then paywall
{!userHasPaid && (
  <div className="paywall">
    <div className="blur-overlay">
      {/* Blurred premium content */}
    </div>
    <div className="unlock-cta">
      <h3>Unlock Full Report</h3>
      <button onClick={handlePurchase}>
        Get Access - $49.99
      </button>
    </div>
  </div>
)}
```

### Example 2: Tiered Pricing
```tsx
const pricingTiers = [
  { name: 'Basic', price: 0, features: ['...'] },
  { name: 'Premium', price: 49.99, features: ['...'] },
  { name: 'Pro', price: 99.99, features: ['...'] }
];

{pricingTiers.map(tier => (
  <div key={tier.name} className="pricing-card">
    <h3>{tier.name}</h3>
    <div className="price">${tier.price}</div>
    <ul>
      {tier.features.map(f => <li>{f}</li>)}
    </ul>
    {tier.price > 0 && (
      <button onClick={() => handlePurchase(tier.price, tier.name)}>
        Select Plan
      </button>
    )}
  </div>
))}
```

## Post-Payment Actions

After successful payment, you'll typically want to:

1. **Grant access to premium content**
2. **Update user record in database**
3. **Send confirmation email**
4. **Generate PDF report**
5. **Redirect to dashboard**

Example:

```tsx
const handlePaymentSuccess = async (paymentIntentId: string) => {
  try {
    // 1. Verify payment on backend
    const response = await fetch(`/api/payment-status/${paymentIntentId}`);
    const { status } = await response.json();
    
    if (status === 'succeeded') {
      // 2. Update user access
      await updateUserAccess(userId, 'premium');
      
      // 3. Generate report
      const report = await generateReport(propertyData);
      
      // 4. Send confirmation
      await sendConfirmationEmail(userEmail, report);
      
      // 5. Redirect
      navigate('/report', { state: { reportData: report } });
    }
  } catch (error) {
    console.error('Post-payment error:', error);
  }
};
```
