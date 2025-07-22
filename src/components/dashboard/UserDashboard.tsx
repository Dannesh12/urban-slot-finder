import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Play, Users, Gift, AlertCircle, CheckCircle } from 'lucide-react';
import { adStorage, adViewStorage } from '@/utils/mockData';
import type { Ad, AdView } from '@/types';

const UserDashboard = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [userAdViews, setUserAdViews] = useState<AdView[]>([]);

  useEffect(() => {
    setAds(adStorage.getAll());
    const allViews = adViewStorage.getAll();
    setUserAdViews(allViews.filter(view => view.userId === user?.id));
  }, [user?.id]);

  const handleWatchAd = (adId: string) => {
    if (!user?.isActivated) return;

    const ad = ads.find(a => a.id === adId);
    if (ad) {
      const newView = adViewStorage.add({
        userId: user.id,
        adId: adId,
        earnedAmount: ad.reward,
        watchedAt: new Date().toISOString(),
        duration: ad.duration
      });
      
      setUserAdViews(prev => [...prev, newView]);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-gradient-primary text-white border-0">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">🎉 Welcome to EarnKE!</h1>
          <p className="text-white/90">Turn your time into money by watching ads, referring friends, and spinning for bonuses.</p>
        </CardContent>
      </Card>

      {!user?.isActivated && (
        <Alert className="border-accent bg-accent/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            🚀 <strong>Activate your account with KES 100</strong> to unlock ad watching and start earning instantly!
          </AlertDescription>
          <Button className="mt-3" size="sm">Activate Account</Button>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">KES {user?.walletBalance?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ads Watched</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.adsWatched || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.totalReferrals || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={user?.isActivated ? "default" : "secondary"}>
              {user?.isActivated ? "Activated" : "Not Activated"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            📺 Watch & Earn
          </CardTitle>
          <CardDescription>Watch short ads and earn KES 10 per view. It's that simple!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ads.map((ad) => (
              <Card key={ad.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover rounded-md mb-2" />
                  <CardTitle className="text-sm">{ad.title}</CardTitle>
                  <CardDescription className="text-xs">{ad.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-primary-glow text-primary">KES {ad.reward}</Badge>
                    <span className="text-xs text-muted-foreground">{ad.duration}s</span>
                  </div>
                  <Button 
                    onClick={() => handleWatchAd(ad.id)}
                    className="w-full"
                    disabled={!user?.isActivated}
                  >
                    {user?.isActivated ? 'Watch Ad' : 'Activate to Watch'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;