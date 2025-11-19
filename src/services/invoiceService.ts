import type { ProjectInvoice, ProjectMilestone, Project } from '../types/project';

// In-memory storage for invoices (will be replaced with backend database)
const invoiceStore: Map<string, ProjectInvoice[]> = new Map();
const invoiceCounters: Map<string, number> = new Map();

/**
 * Generate a unique invoice number based on project and sequential counter
 */
export const generateInvoiceNumber = (projectId: string): string => {
  const counter = (invoiceCounters.get(projectId) || 0) + 1;
  invoiceCounters.set(projectId, counter);
  const timestamp = new Date().getTime().toString().slice(-6);
  return `INV-${projectId.slice(0, 8).toUpperCase()}-${counter.toString().padStart(3, '0')}-${timestamp}`;
};

/**
 * Check if a milestone has reached and create invoice if needed
 */
export const generateInvoiceForMilestone = (
  milestone: ProjectMilestone,
  project: Project
): ProjectInvoice | null => {
  // Only generate invoice if milestone is completed and not already invoiced
  if (milestone.status !== 'completed' || milestone.invoiceId) {
    return null;
  }

  const invoice: ProjectInvoice = {
    id: `invoice-${milestone.id}-${Date.now()}`,
    projectId: project.id,
    milestoneId: milestone.id,
    invoiceNumber: generateInvoiceNumber(project.id),
    homeownerId: project.homeownerId,
    contractorId: project.contractorId,
    amount: milestone.amountDue,
    percentage: milestone.percentage,
    description: milestone.description,
    issueDate: new Date().toISOString(),
    dueDate: milestone.dueDate,
    status: 'sent',
  };

  // Store invoice
  const projectInvoices = invoiceStore.get(project.id) || [];
  projectInvoices.push(invoice);
  invoiceStore.set(project.id, projectInvoices);

  return invoice;
};

/**
 * Get all invoices for a project
 */
export const getProjectInvoices = (projectId: string): ProjectInvoice[] => {
  return invoiceStore.get(projectId) || [];
};

/**
 * Get a single invoice by ID
 */
export const getInvoiceById = (invoiceId: string): ProjectInvoice | null => {
  for (const invoices of invoiceStore.values()) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) return invoice;
  }
  return null;
};

/**
 * Update invoice status
 */
export const updateInvoiceStatus = (
  invoiceId: string,
  status: ProjectInvoice['status'],
  paymentData?: { stripeInvoiceId?: string; paymentIntentId?: string; paymentMethod?: string }
): ProjectInvoice | null => {
  for (const invoices of invoiceStore.values()) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      invoice.status = status;
      if (status === 'paid') {
        invoice.paidDate = new Date().toISOString();
      }
      if (paymentData) {
        if (paymentData.stripeInvoiceId) invoice.stripeInvoiceId = paymentData.stripeInvoiceId;
        if (paymentData.paymentIntentId) invoice.paymentIntentId = paymentData.paymentIntentId;
        if (paymentData.paymentMethod) invoice.paymentMethod = paymentData.paymentMethod;
      }
      return invoice;
    }
  }
  return null;
};

/**
 * Get pending invoices for a homeowner (across all projects)
 */
export const getPendingInvoicesForHomeowner = (homeownerId: string): ProjectInvoice[] => {
  const pending: ProjectInvoice[] = [];
  for (const invoices of invoiceStore.values()) {
    pending.push(...invoices.filter(
      inv => inv.homeownerId === homeownerId && (inv.status === 'sent' || inv.status === 'overdue')
    ));
  }
  return pending;
};

/**
 * Process milestone completion and generate invoice
 * Call this when contractor marks progress milestone
 */
export const processMilestoneCompletion = (
  project: Project,
  previousProgress: number,
  newProgress: number
): ProjectInvoice[] => {
  const generatedInvoices: ProjectInvoice[] = [];

  // Check which milestones have been newly completed
  for (const milestone of project.milestones) {
    if (previousProgress < milestone.percentage && newProgress >= milestone.percentage) {
      if (milestone.status === 'in_progress') {
        milestone.status = 'completed';
        milestone.completedDate = new Date().toISOString();
      }

      const invoice = generateInvoiceForMilestone(milestone, project);
      if (invoice) {
        generatedInvoices.push(invoice);
      }
    }
  }

  return generatedInvoices;
};

/**
 * Get payment summary for a project
 */
export const getPaymentSummary = (projectId: string, totalBudget: number) => {
  const invoices = getProjectInvoices(projectId);
  
  const summary = {
    totalBudget,
    totalInvoiced: 0,
    totalPaid: 0,
    totalPending: 0,
    pendingInvoices: 0,
    paidInvoices: 0,
    overueInvoices: 0,
    invoices: invoices,
  };

  invoices.forEach(inv => {
    summary.totalInvoiced += inv.amount;
    if (inv.status === 'paid') {
      summary.totalPaid += inv.amount;
      summary.paidInvoices += 1;
    } else if (inv.status === 'sent') {
      summary.totalPending += inv.amount;
      summary.pendingInvoices += 1;
    } else if (inv.status === 'overdue') {
      summary.totalPending += inv.amount;
      summary.overueInvoices += 1;
    }
  });

  return summary;
};

/**
 * Create sample invoices for testing
 */
export const createSampleInvoices = (projectId: string, homeownerId: string, contractorId: string) => {
  const invoices: ProjectInvoice[] = [
    {
      id: `invoice-1-${projectId}`,
      projectId,
      milestoneId: `milestone-10-${projectId}`,
      invoiceNumber: `INV-${projectId.slice(0, 8)}-001-${Date.now() % 1000000}`,
      homeownerId,
      contractorId,
      amount: 1000,
      percentage: 10,
      description: 'Foundation and site preparation',
      issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
      paidDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'stripe',
    },
    {
      id: `invoice-2-${projectId}`,
      projectId,
      milestoneId: `milestone-20-${projectId}`,
      invoiceNumber: `INV-${projectId.slice(0, 8)}-002-${Date.now() % 1000000}`,
      homeownerId,
      contractorId,
      amount: 1000,
      percentage: 20,
      description: 'Framing and structural work',
      issueDate: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
      paidDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'stripe',
    },
    {
      id: `invoice-3-${projectId}`,
      projectId,
      milestoneId: `milestone-30-${projectId}`,
      invoiceNumber: `INV-${projectId.slice(0, 8)}-003-${Date.now() % 1000000}`,
      homeownerId,
      contractorId,
      amount: 1000,
      percentage: 30,
      description: 'Electrical and plumbing installation',
      issueDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'sent',
    },
  ];

  invoiceStore.set(projectId, invoices);
  invoiceCounters.set(projectId, 3);
};
