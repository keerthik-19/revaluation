import { useState, useEffect, useCallback } from 'react';
import type { ProjectInvoice } from '../types/project';

interface UseInvoicesState {
  invoices: ProjectInvoice[];
  loading: boolean;
  error: string | null;
}

export const useInvoices = (projectId: string) => {
  const [state, setState] = useState<UseInvoicesState>({
    invoices: [],
    loading: true,
    error: null,
  });

  const fetchInvoices = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch(`http://localhost:3001/api/invoices/project/${projectId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch invoices: ${response.statusText}`);
      }
      
      const invoices = await response.json();
      setState({ invoices, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error fetching invoices:', error);
      
      // Fallback: Use mock data for development if proxy server is not running
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Not Found')) {
        console.warn('Proxy server not available, using mock data');
        const mockInvoices: ProjectInvoice[] = [
          {
            id: `invoice-1-${projectId}`,
            projectId,
            milestoneId: `milestone-10-${projectId}`,
            invoiceNumber: `INV-${projectId.slice(0, 8)}-001`,
            homeownerId: 'homeowner-1',
            contractorId: 'contractor-1',
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
            invoiceNumber: `INV-${projectId.slice(0, 8)}-002`,
            homeownerId: 'homeowner-1',
            contractorId: 'contractor-1',
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
            invoiceNumber: `INV-${projectId.slice(0, 8)}-003`,
            homeownerId: 'homeowner-1',
            contractorId: 'contractor-1',
            amount: 1000,
            percentage: 30,
            description: 'Electrical and plumbing installation',
            issueDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
            dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'sent',
          },
        ];
        setState({ invoices: mockInvoices, loading: false, error: null });
      } else {
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      }
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchInvoices();
    }
  }, [projectId, fetchInvoices]);

  return {
    ...state,
    refetch: fetchInvoices,
  };
};

export const useInvoicePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = useCallback(async (
    invoiceId: string,
    amount: number,
    description?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3001/api/invoices/${invoiceId}/payment-intent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create payment intent: ${response.statusText}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  const updateInvoiceStatus = useCallback(async (
    invoiceId: string,
    status: ProjectInvoice['status'],
    paymentIntentId?: string,
    paymentMethod?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3001/api/invoices/${invoiceId}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status,
            paymentIntentId,
            paymentMethod,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update invoice status: ${response.statusText}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    createPaymentIntent,
    updateInvoiceStatus,
  };
};
