import { User, AuthState } from '@/types';

const AUTH_STORAGE_KEY = 'parking_auth';

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

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@parking.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'user@parking.com',
    name: 'Regular User',
    role: 'user',
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