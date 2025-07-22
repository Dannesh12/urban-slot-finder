import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { authStorage, authenticateUser } from '@/utils/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: 'admin' | 'user') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Load auth state from localStorage on app start
    const storedAuth = authStorage.get();
    setAuthState(storedAuth);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = authenticateUser(email, password);
      if (user) {
        authStorage.set(user);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.role}`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
        
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
        
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      
      return false;
    }
  };

  const logout = () => {
    authStorage.clear();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const register = async (email: string, password: string, name: string, role: 'admin' | 'user'): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would call an API to register the user
      const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        phone: '+254700000000', // Default phone
        role,
        isActivated: false,
        walletBalance: 0,
        adsWatched: 0,
        referralCode,
        hasSpun: false,
        totalEarnings: 0,
        totalReferrals: 0,
        createdAt: new Date().toISOString()
      };
      
      authStorage.set(newUser);
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast({
        title: "Account created!",
        description: `Welcome, ${name}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive"
      });
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      
      return false;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};