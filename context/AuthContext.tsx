import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
