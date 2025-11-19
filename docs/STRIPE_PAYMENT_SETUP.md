# Stripe Payment Integration Guide

## Overview
Assemble now includes Stripe payment processing to accept payments for ROI reports, contractor services, and other premium features.

## Setup Instructions

### 1. Get Stripe API Keys

1. Sign up for a Stripe account at https://stripe.com
2. Navigate to **Developers → API keys**
3. Copy your **Publishable key** and **Secret key**
4. For testing, use **Test mode** keys (they start with `pk_test_` and `sk_test_`)

### 2. Configure Environment Variables

Add your Stripe keys to `.env`:

```bash
# Stripe Payment Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**Important Security Notes:**
- `VITE_STRIPE_PUBLISHABLE_KEY` is safe to expose in the frontend (starts with `pk_`)
- `STRIPE_SECRET_KEY` should NEVER be exposed to the frontend (starts with `sk_`)
- The secret key is only used in the proxy server (`proxy-server.js`)

### 3. Start the Services

```bash
# Terminal 1: Start the proxy server (handles payment intents)
node proxy-server.js

# Terminal 2: Start the React app
npm run dev
```

## How It Works

### Architecture

```
User Browser
    ↓
React App (PaymentCheckout component)
    ↓
Proxy Server (/api/create-payment-intent)
    ↓
Stripe API (creates payment intent)
    ↓
Returns client secret
    ↓
Stripe Elements (secure card input)
    ↓
Payment processed
```

### Payment Flow

1. **User navigates to payment page** (`/payment`)
2. **PaymentCheckout component** creates a payment intent via proxy server
3. **Stripe Elements** renders secure card input form
4. **User enters card details** (never touches your server)
5. **Payment is confirmed** via Stripe's API
6. **Success callback** redirects user to confirmation page

## Using the Payment Components

### Basic Usage

Navigate to the payment page with route state:

```tsx
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate('/payment', {
      state: {
        amount: 49.99,
        description: 'Home Renovation ROI Report',
        propertyAddress: '123 Main St, Denver, CO'
      }
    });
  };

  return <button onClick={handlePurchase}>Purchase Report</button>;
};
```

### Direct Component Usage

For custom implementations:

```tsx
import PaymentCheckout from '../components/PaymentCheckout';

<PaymentCheckout
  amount={49.99}
  description="Home Renovation ROI Report"
  metadata={{
    property_address: '123 Main St',
    user_id: 'user_123'
  }}
  onSuccess={(paymentIntentId) => {
    console.log('Payment successful!', paymentIntentId);
    // Grant access to report, update database, etc.
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
    // Show error message to user
  }}
/>
```

## Testing

### Test Card Numbers

Stripe provides test card numbers for development:

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0027 6000 3184 | 3D Secure authentication required |

- Use any future expiration date (e.g., 12/34)
- Use any 3-digit CVC
- Use any valid US ZIP code

### Testing the Integration

1. Start both servers:
   ```bash
   node proxy-server.js  # Terminal 1
   npm run dev           # Terminal 2
   ```

2. Navigate to: http://localhost:5173/payment

3. Test the payment flow with test card `4242 4242 4242 4242`

## API Endpoints

### Create Payment Intent
**POST** `/api/create-payment-intent`

Request body:
```json
{
  "amount": 49.99,
  "currency": "usd",
  "description": "Product description",
  "metadata": {
    "property_address": "123 Main St",
    "product_type": "roi_report"
  }
}
```

Response:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### Check Payment Status
**GET** `/api/payment-status/:paymentIntentId`

Response:
```json
{
  "status": "succeeded",
  "amount": 49.99,
  "currency": "usd"
}
```

## Components Reference

### `PaymentCheckout`
Main wrapper component that handles payment intent creation.

**Props:**
- `amount` (number): Amount in dollars (e.g., 49.99)
- `description` (string): Payment description
- `metadata` (object): Optional metadata to attach to payment
- `onSuccess` (function): Callback when payment succeeds
- `onError` (function): Callback when payment fails

### `PaymentForm`
Internal form component with Stripe Elements.

### `PaymentPage`
Full-page payment experience with order summary.

## Security Best Practices

1. **Never expose secret keys** - Keep `STRIPE_SECRET_KEY` server-side only
2. **Use HTTPS in production** - Required for Stripe to work
3. **Validate amounts server-side** - Don't trust client-sent amounts
4. **Implement webhooks** - For reliable payment confirmation (see below)
5. **Handle errors gracefully** - Show user-friendly error messages

## Next Steps

### Implement Webhooks (Recommended)

Webhooks provide reliable payment confirmation:

```javascript
// Add to proxy-server.js
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      // Grant access to purchased content
      console.log('Payment succeeded:', paymentIntent.id);
    }
    
    res.json({received: true});
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

### Add Subscription Billing

For recurring payments:

```javascript
// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: 'price_xxx' }],
});
```

### Connect Platform (for contractor payments)

Use Stripe Connect to split payments between platform and contractors:

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10000,
  currency: 'usd',
  application_fee_amount: 1000, // Platform fee
  transfer_data: {
    destination: contractorAccountId,
  },
});
```

## Troubleshooting

### "Stripe publishable key not found"
- Check `.env` file has `VITE_STRIPE_PUBLISHABLE_KEY`
- Restart dev server after adding env variables

### "Payment processing is not configured"
- Check `.env` file has `STRIPE_SECRET_KEY`
- Restart proxy server after adding env variables

### Payment form doesn't appear
- Check browser console for errors
- Verify Stripe keys are correct
- Ensure proxy server is running on port 3001

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com)

## Support

For issues specific to this integration, check:
1. Browser console for frontend errors
2. Proxy server logs for backend errors
3. Stripe Dashboard → Logs for API errors
