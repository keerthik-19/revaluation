// Project and payment types for milestone-based payments

export interface ProjectMilestone {
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

export interface Project {
  id: string;
  homeownerId: string;
  contractorId: string;
  title: string;
  description: string;
  address: string;
  totalBudget: number;
  startDate: string;
  estimatedCompletionDate: string;
  actualCompletionDate?: string;
  currentProgress: number; // 0-100
  status: 'pending' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  milestones: ProjectMilestone[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInvoice {
  id: string;
  projectId: string;
  milestoneId: string;
  invoiceNumber: string;
  homeownerId: string;
  contractorId: string;
  amount: number;
  percentage: number; // % of work completed
  description: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  stripeInvoiceId?: string;
  paymentIntentId?: string;
  paidDate?: string;
  paymentMethod?: string;
}

export interface ProgressUpdate {
  id: string;
  projectId: string;
  contractorId: string;
  previousProgress: number;
  newProgress: number;
  updatedAt: string;
  description: string;
  photos?: string[]; // URLs to progress photos
  notes?: string;
}

export interface PaymentSchedule {
  projectId: string;
  totalAmount: number;
  milestones: MilestonePaymentSchedule[];
}

export interface MilestonePaymentSchedule {
  percentage: number; // 10%, 20%, etc.
  amount: number;
  description: string;
}
