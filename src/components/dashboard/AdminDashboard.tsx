import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Eye, TrendingUp } from 'lucide-react';
import { adStorage, adViewStorage, referralStorage } from '@/utils/mockData';
import type { Ad, AdView, Referral } from '@/types';

const AdminDashboard = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [adViews, setAdViews] = useState<AdView[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    setAds(adStorage.getAll());
    setAdViews(adViewStorage.getAll());
    setReferrals(referralStorage.getAll());
  }, []);

  const totalRevenue = adViews.reduce((sum, view) => sum + view.earnedAmount, 0);
  const totalAdViews = adViews.length;
  const totalActiveUsers = new Set(adViews.map(view => view.userId)).size;
  const totalReferrals = referrals.length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage ads, track performance, and monitor earnings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">KES {totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ad Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdViews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferrals}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ad Management</CardTitle>
          <CardDescription>Manage your advertising campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ads.map((ad) => {
              const views = adViews.filter(view => view.adId === ad.id).length;
              const earnings = adViews.filter(view => view.adId === ad.id)
                .reduce((sum, view) => sum + view.earnedAmount, 0);
              
              return (
                <Card key={ad.id}>
                  <CardHeader className="pb-3">
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover rounded-md mb-2" />
                    <CardTitle className="text-sm">{ad.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Views:</span>
                        <span className="font-semibold">{views}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Earnings:</span>
                        <span className="font-semibold">KES {earnings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Reward:</span>
                        <Badge>KES {ad.reward}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;