# Milestone-Based Invoice Generation System

## Overview

The invoice generation system automatically creates and manages invoices when homeowners and contractors reach project milestones. The system is milestone-triggered, meaning invoices are generated when contractors mark work as 10%, 20%, 30% complete, etc.

## Architecture

### Frontend Components

#### `HomeownerInvoiceDashboard.tsx`
The core display component showing:
- Project payment summary (total budget, amount paid, amount pending)
- Payment progress bar with visual representation
- Separate sections for pending and paid invoices
- Invoice cards with status badges and action buttons
- Modal for detailed invoice view with contractor photos and notes

**Props:**
- `projectTitle: string` - Name of the project
- `totalBudget: number` - Total project budget
- `invoices: Invoice[]` - Array of invoice objects
- `onPayInvoice: (invoiceId: string) => void` - Callback when pay button is clicked

#### `InvoiceDashboardContainer.tsx`
Container component that connects the display component to backend data:
- Fetches invoices from the backend API
- Handles loading and error states
- Maps `ProjectInvoice` to `Invoice` format
- Manages navigation to payment page

### Backend Endpoints

All endpoints are in `proxy-server.js`:

#### `GET /api/invoices/project/:projectId`
Retrieves all invoices for a specific project.

**Response:**
```json
[
  {
    "id": "invoice-1-project-123",
    "projectId": "project-123",
    "milestoneId": "milestone-30",
    "invoiceNumber": "INV-PROJECT-001-123456",
    "homeownerId": "homeowner-1",
    "contractorId": "contractor-1",
    "amount": 1000,
    "percentage": 30,
    "description": "Electrical and plumbing installation",
    "issueDate": "2025-11-19T01:48:54.000Z",
    "dueDate": "2025-11-25T01:48:54.000Z",
    "status": "sent",
    "paidDate": null,
    "paymentMethod": null
  }
]
```

#### `GET /api/invoices/:invoiceId`
Retrieves a single invoice by ID.

#### `POST /api/invoices/:invoiceId/payment-intent`
Creates a Stripe payment intent for an invoice.

**Request:**
```json
{
  "amount": 1000,
  "description": "Kitchen Remodel - 30% Milestone"
}
```

**Response:**
```json
{
  "clientSecret": "pi_1234567890_secret_abcdefghij",
  "paymentIntentId": "pi_1234567890"
}
```

#### `PATCH /api/invoices/:invoiceId/status`
Updates the status of an invoice after payment.

**Request:**
```json
{
  "status": "paid",
  "paymentIntentId": "pi_1234567890",
  "paymentMethod": "stripe"
}
```

### Services

#### `invoiceService.ts`
TypeScript service with utility functions:

- `generateInvoiceNumber(projectId: string): string` - Creates unique invoice numbers
- `generateInvoiceForMilestone(milestone, project): ProjectInvoice | null` - Creates invoice when milestone completed
- `getProjectInvoices(projectId: string): ProjectInvoice[]` - Retrieves project invoices
- `getInvoiceById(invoiceId: string): ProjectInvoice | null` - Gets single invoice
- `updateInvoiceStatus(invoiceId, status, paymentData): ProjectInvoice | null` - Updates invoice after payment
- `processMilestoneCompletion(project, previousProgress, newProgress): ProjectInvoice[]` - Main entry point for invoice generation
- `getPaymentSummary(projectId, totalBudget)` - Calculates payment statistics
- `createSampleInvoices(projectId, homeownerId, contractorId)` - Creates test data

### Hooks

#### `useInvoices(projectId: string)`
Fetches and manages invoices for a project.

**Returns:**
```typescript
{
  invoices: ProjectInvoice[],
  loading: boolean,
  error: string | null,
  refetch: () => Promise<void>
}
```

#### `useInvoicePayment()`
Manages payment-related API calls.

**Methods:**
- `createPaymentIntent(invoiceId, amount, description)` - Creates payment intent
- `updateInvoiceStatus(invoiceId, status, paymentIntentId, paymentMethod)` - Updates status

**Returns:**
```typescript
{
  loading: boolean,
  error: string | null,
  createPaymentIntent: (invoiceId, amount, description) => Promise<{clientSecret, paymentIntentId}>,
  updateInvoiceStatus: (invoiceId, status, paymentIntentId?, paymentMethod?) => Promise<UpdatedInvoice>
}
```

## Data Models

### ProjectInvoice (from `project.ts`)
```typescript
interface ProjectInvoice {
  id: string;
  projectId: string;
  milestoneId: string;
  invoiceNumber: string;
  homeownerId: string;
  contractorId: string;
  amount: number;
  percentage: number; // 10, 20, 30, etc.
  description: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  stripeInvoiceId?: string;
  paymentIntentId?: string;
  paidDate?: string;
  paymentMethod?: string;
}
```

### ProjectMilestone (from `project.ts`)
```typescript
interface ProjectMilestone {
  id: string;
  projectId: string;
  percentage: number; // 10, 20, 30, etc.
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'paid';
  amountDue: number;
  dueDate: string;
  completedDate?: string;
  paymentDate?: string;
  invoiceId?: string;
}
```

## Payment Flow

1. **Contractor Updates Progress**: Contractor marks work as X% complete via `ContractorProgressUpdate` component
2. **Milestone Detection**: System checks if new progress has hit a milestone (10%, 20%, 30%, etc.)
3. **Invoice Generation**: If milestone reached, system calls `processMilestoneCompletion()` which:
   - Marks milestone as completed
   - Generates invoice with auto-incremented number
   - Sets invoice status to "sent"
   - Stores in backend
4. **Homeowner Notification**: Homeowner sees new pending invoice in `HomeownerInvoiceDashboard`
5. **Payment Initiation**: Homeowner clicks "Pay" button, triggering payment flow
6. **Stripe Payment**: System creates payment intent and directs to Stripe Elements form
7. **Payment Confirmation**: After successful payment:
   - Invoice status updated to "paid"
   - Payment date recorded
   - Stripe payment intent ID stored
8. **Contractor Notification**: Contractor receives notification that payment was received

## Integration Points

### With ContractorProgressUpdate
The progress update component should call `processMilestoneCompletion()` when progress is updated:

```typescript
const newInvoices = processMilestoneCompletion(project, previousProgress, newProgress);
if (newInvoices.length > 0) {
  // Notify homeowner of new invoices
  // Update UI
}
```

### With Payment Page
When homeowner initiates payment, the payment page receives:
- `invoiceId` - Which invoice to pay
- `projectId` - Which project
- `amount` - Payment amount (from invoice)
- `percentage` - Milestone percentage
- `description` - Payment description

## Status Mappings

### Invoice Statuses
- `draft` - Invoice created but not sent to homeowner
- `sent` - Invoice sent to homeowner (payment pending)
- `viewed` - Homeowner has viewed the invoice
- `paid` - Payment received and confirmed
- `overdue` - Due date has passed but not paid
- `cancelled` - Invoice was cancelled

### Milestone Statuses
- `pending` - Milestone not yet started
- `in_progress` - Contractor has begun work on milestone
- `completed` - Contractor marked milestone as complete, invoice generated
- `paid` - Payment received for this milestone

## Current Implementation Notes

### Database Persistence
Currently uses in-memory storage (`Map` structures in `invoiceService.ts`). When backend database is ready, replace:
- `invoiceStore` Map with database queries
- `invoiceCounters` Map with database sequences

### Mock Endpoints
Backend currently returns mock data. When implementing database layer:
- Update `/api/invoices/project/:projectId` to query database
- Update `/api/invoices/:invoiceId` to fetch specific invoice
- Update `/api/invoices/:invoiceId/status` to persist status changes

### Next Steps
1. **Stripe Invoice API Integration**: Use Stripe's Invoice API for additional features
2. **Webhook Handling**: Listen for Stripe webhooks to auto-update invoice status
3. **Email Notifications**: Send invoice emails when generated
4. **Overdue Management**: Auto-mark invoices as overdue and send reminders
5. **Receipt Generation**: Create PDF receipts after payment

## Testing

### Sample Data
`createSampleInvoices()` creates test invoices:
- Invoice 1 (10%): Paid 25 days ago
- Invoice 2 (20%): Paid 18 days ago  
- Invoice 3 (30%): Pending (due in 6 days)

### Testing Invoice Flow
1. Call `EnhancedHomeownerDashboard` which integrates `HomeownerInvoiceDashboard`
2. Visit http://localhost:5173/homeowner/dashboard
3. View invoice dashboard with sample data
4. Click "Pay" on pending invoice to trigger payment flow

## Performance Considerations

- Invoice list is fetched once on component mount via `useInvoices` hook
- Use `refetch()` to manually refresh if needed
- Consider pagination for projects with many invoices (>100)
- Memoize invoice calculations in `getPaymentSummary()`
