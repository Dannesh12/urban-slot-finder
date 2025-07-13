import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { bookingStorage, slotStorage } from '@/utils/mockData';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users,
  Plus,
  Settings,
  TrendingUp,
  Car
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const slots = slotStorage.getAll().filter(s => s.adminId === user?.id);
  const allBookings = bookingStorage.getAll();
  const mySlotBookings = allBookings.filter(b => 
    slots.some(s => s.id === b.slotId)
  );
  
  const totalRevenue = mySlotBookings
    .filter(b => b.paymentStatus === 'success')
    .reduce((sum, b) => sum + b.totalCost, 0);

  const totalCapacity = slots.reduce((sum, s) => sum + s.capacity, 0);
  const totalOccupied = slots.reduce((sum, s) => sum + s.currentOccupancy, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-glow">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-primary-foreground/80">
          Manage your parking slots and track performance across all locations.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="gradient" size="lg" className="h-20 flex flex-col space-y-2">
          <Plus className="w-6 h-6" />
          <span>Add New Slot</span>
        </Button>
        <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2">
          <Settings className="w-6 h-6" />
          <span>Manage Slots</span>
        </Button>
        <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2">
          <Calendar className="w-6 h-6" />
          <span>View Bookings</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{slots.length}</p>
                <p className="text-sm text-muted-foreground">Total Slots</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success-light rounded-lg">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalRevenue}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-warning-light rounded-lg">
                <Car className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round((totalOccupied / totalCapacity) * 100) || 0}%</p>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success-light rounded-lg">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mySlotBookings.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Slots Overview */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Your Parking Slots</span>
          </CardTitle>
          <CardDescription>Overview of all your managed parking locations</CardDescription>
        </CardHeader>
        <CardContent>
          {slots.length > 0 ? (
            <div className="space-y-4">
              {slots.slice(0, 5).map((slot) => (
                <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{slot.name}</p>
                    <p className="text-sm text-muted-foreground">{slot.location.address}</p>
                    <p className="text-xs text-muted-foreground">${slot.hourlyRate}/hour</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={slot.currentOccupancy < slot.capacity ? 'default' : 'secondary'}>
                      {slot.currentOccupancy}/{slot.capacity} occupied
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {slot.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No parking slots yet</p>
              <Button variant="outline" size="sm" className="mt-4">
                Create your first slot
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};