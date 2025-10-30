export type UserType = 'homeowner' | 'contractor' | 'supplier';

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
    contractor?: User;
    supplier?: User;
  };
}

export interface GuidedFlowStep {
  type: 'contractor' | 'scheduling';
  completed: boolean;
}
