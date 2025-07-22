import { User, AuthState } from '@/types';

const AUTH_STORAGE_KEY = 'earning_auth';

export const authStorage = {
  get(): AuthState {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) {
        return { user: null, isAuthenticated: false, isLoading: false };
      }
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user,
        isAuthenticated: !!parsed.user,
        isLoading: false
      };
    } catch {
      return { user: null, isAuthenticated: false, isLoading: false };
    }
  },

  set(user: User | null): void {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  clear(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@earnke.com',
    name: 'Admin User',
    phone: '+254700000000',
    role: 'admin',
    isActivated: true,
    walletBalance: 50000,
    adsWatched: 0,
    referralCode: generateReferralCode(),
    hasSpun: false,
    totalEarnings: 50000,
    totalReferrals: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'user@earnke.com',
    name: 'Demo User',
    phone: '+254700000001',
    role: 'user',
    isActivated: false,
    walletBalance: 0,
    adsWatched: 0,
    referralCode: generateReferralCode(),
    hasSpun: false,
    totalEarnings: 0,
    totalReferrals: 0,
    createdAt: new Date().toISOString()
  }
];

export const authenticateUser = (email: string, password: string): User | null => {
  // Mock authentication - in real app, this would call an API
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password') {
    return user;
  }
  return null;
};