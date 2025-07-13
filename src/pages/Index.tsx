import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

const Index = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-pulse-glow w-16 h-16 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading ParkEase...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <LoginForm onToggleMode={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onToggleMode={() => setAuthMode('login')} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-6">
          {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </main>
      </div>
    </div>
  );
};

export default Index;
