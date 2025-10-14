import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, UserType, Project } from '../types';

interface UserContextType {
  currentUser: User | null;
  userType: UserType;
  setCurrentUser: (user: User | null) => void;
  setUserType: (type: UserType) => void;
  project: Project | null;
  setProject: (project: Project | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>('homeowner');
  const [project, setProject] = useState<Project | null>(null);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userType,
        setCurrentUser,
        setUserType,
        project,
        setProject,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};