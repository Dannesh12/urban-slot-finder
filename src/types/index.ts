export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'user';
  isActivated: boolean;
  walletBalance: number;
  adsWatched: number;
  referralCode: string;
  referredBy?: string;
  hasSpun: boolean;
  totalEarnings: number;
  totalReferrals: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  duration: number; // in seconds
  reward: number; // KES amount
  isActive: boolean;
  createdAt: string;
}

export interface AdView {
  id: string;
  userId: string;
  adId: string;
  earnedAmount: number;
  watchedAt: string;
  duration: number;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referredEmail: string;
  isActivated: boolean;
  earnedAmount: number;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  paymentMethod: string;
  accountDetails: string;
}

export interface SpinResult {
  id: string;
  userId: string;
  amount: number;
  spunAt: string;
}

export interface ActivationPayment {
  id: string;
  userId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}