export type UserType = 'homeowner' | 'agent' | 'contractor' | 'supplier';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  photo?: string;
  rating?: number;
  specialty?: string;
  verified?: boolean;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  budgetRange: string;
  photos: string[];
  assignedTeam: {
    agent?: User;
    contractor?: User;
    supplier?: User;
  };
}

export interface GuidedFlowStep {
  type: 'agent' | 'contractor' | 'scheduling';
  completed: boolean;
}