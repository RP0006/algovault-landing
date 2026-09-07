import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRecord, LicenseRecord } from '../data/mockData';
import { authService } from '../services/authService';
import { licenseService } from '../services/licenseService';

interface AuthContextType {
  user: UserRecord | null;
  license: LicenseRecord | null;
  isLoading: boolean;
  isAdmin: boolean;
  hasProLicense: boolean;
  login: (email: string, password?: string) => Promise<UserRecord>;
  signup: (fullName: string, email: string, password?: string) => Promise<UserRecord>;
  logout: () => Promise<void>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [license, setLicense] = useState<LicenseRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSession = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      const userLic = licenseService.getUserLicense(currentUser.id);
      setLicense(userLic);
    } else {
      setLicense(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const loggedIn = await authService.login(email, password);
      setUser(loggedIn);
      const userLic = licenseService.getUserLicense(loggedIn.id);
      setLicense(userLic);
      return loggedIn;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (fullName: string, email: string, password?: string) => {
    setIsLoading(true);
    try {
      const created = await authService.signup(fullName, email, password);
      setUser(created);
      setLicense(null);
      return created;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setLicense(null);
  };

  const refreshAuth = () => {
    loadSession();
  };

  const isAdmin = user?.role === 'admin';
  const hasProLicense = Boolean(license && license.status === 'active');

  return (
    <AuthContext.Provider
      value={{
        user,
        license,
        isLoading,
        isAdmin,
        hasProLicense,
        login,
        signup,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
