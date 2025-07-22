import { Ad, AdView, Referral, WithdrawalRequest, SpinResult } from '@/types';

export const mockAds: Ad[] = [
  {
    id: '1',
    title: 'Safaricom Data Bundles',
    description: 'Get the best data deals from Kenya\'s leading network',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    duration: 30,
    reward: 10,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'KCB Bank Services',
    description: 'Open your account today and enjoy great banking benefits',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop',
    duration: 45,
    reward: 10,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Jumia Flash Sale',
    description: 'Massive discounts on electronics and fashion',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop',
    duration: 35,
    reward: 10,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const mockAdViews: AdView[] = [
  {
    id: '1',
    userId: '2',
    adId: '1',
    earnedAmount: 10,
    watchedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    duration: 30
  }
];

export const adStorage = {
  getAll(): Ad[] {
    try {
      const stored = localStorage.getItem('earn_ads');
      return stored ? JSON.parse(stored) : mockAds;
    } catch {
      return mockAds;
    }
  },

  save(ads: Ad[]): void {
    localStorage.setItem('earn_ads', JSON.stringify(ads));
  }
};

export const adViewStorage = {
  getAll(): AdView[] {
    try {
      const stored = localStorage.getItem('earn_ad_views');
      return stored ? JSON.parse(stored) : mockAdViews;
    } catch {
      return mockAdViews;
    }
  },

  save(views: AdView[]): void {
    localStorage.setItem('earn_ad_views', JSON.stringify(views));
  },

  add(view: Omit<AdView, 'id'>): AdView {
    const views = this.getAll();
    const newView: AdView = {
      ...view,
      id: Date.now().toString()
    };
    views.push(newView);
    this.save(views);
    return newView;
  }
};

export const referralStorage = {
  getAll(): Referral[] {
    try {
      const stored = localStorage.getItem('earn_referrals');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  save(referrals: Referral[]): void {
    localStorage.setItem('earn_referrals', JSON.stringify(referrals));
  },

  add(referral: Omit<Referral, 'id'>): Referral {
    const referrals = this.getAll();
    const newReferral: Referral = {
      ...referral,
      id: Date.now().toString()
    };
    referrals.push(newReferral);
    this.save(referrals);
    return newReferral;
  }
};

export const withdrawalStorage = {
  getAll(): WithdrawalRequest[] {
    try {
      const stored = localStorage.getItem('earn_withdrawals');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  save(withdrawals: WithdrawalRequest[]): void {
    localStorage.setItem('earn_withdrawals', JSON.stringify(withdrawals));
  },

  add(withdrawal: Omit<WithdrawalRequest, 'id'>): WithdrawalRequest {
    const withdrawals = this.getAll();
    const newWithdrawal: WithdrawalRequest = {
      ...withdrawal,
      id: Date.now().toString()
    };
    withdrawals.push(newWithdrawal);
    this.save(withdrawals);
    return newWithdrawal;
  }
};