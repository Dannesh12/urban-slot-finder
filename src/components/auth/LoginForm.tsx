import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Car, MapPin, Shield, Users } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleDemoLogin = (role: 'admin' | 'user') => {
    const demoCredentials = role === 'admin' 
      ? { email: 'admin@parking.com', password: 'password' }
      : { email: 'user@parking.com', password: 'password' };
    
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    login(demoCredentials.email, demoCredentials.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary-glow/5 p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Car className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">ParkEase</h1>
          <p className="text-muted-foreground">Smart Parking Management System</p>
        </div>

        <Card className="shadow-medium border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  Or try demo accounts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('admin')}
                className="space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Demo</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('user')}
                className="space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>User Demo</span>
              </Button>
            </div>

            <div className="text-center">
              <Button variant="link" onClick={onToggleMode} className="text-sm">
                Don't have an account? Sign up
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="p-2 bg-success-light rounded-lg mx-auto w-fit">
              <MapPin className="w-5 h-5 text-success" />
            </div>
            <p className="text-xs text-muted-foreground">Real-time Availability</p>
          </div>
          <div className="space-y-2">
            <div className="p-2 bg-primary/10 rounded-lg mx-auto w-fit">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Easy Booking</p>
          </div>
          <div className="space-y-2">
            <div className="p-2 bg-warning-light rounded-lg mx-auto w-fit">
              <Shield className="w-5 h-5 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground">Secure Payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};