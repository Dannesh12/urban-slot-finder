import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { bookingStorage, slotStorage } from '@/utils/mockData';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Car,
  Plus,
  History,
  Map as MapIcon
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const bookings = bookingStorage.getAll().filter(b => b.userId === user?.id);
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const slots = slotStorage.getAll();
  
  const totalSpent = bookings
    .filter(b => b.paymentStatus === 'success')
    .reduce((sum, b) => sum + b.totalCost, 0);

  const upcomingBooking = activeBookings
    .filter(b => new Date(b.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-glow">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-primary-foreground/80">
          Find and book parking slots in seconds. Your next spot is just a click away.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="gradient" size="lg" className="h-20 flex flex-col space-y-2">
          <MapIcon className="w-6 h-6" />
          <span>Find Parking</span>
        </Button>
        <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2">
          <Plus className="w-6 h-6" />
          <span>Quick Book</span>
        </Button>
        <Button variant="outline" size="lg" className="h-20 flex flex-col space-y-2">
          <History className="w-6 h-6" />
          <span>View History</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success-light rounded-lg">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeBookings.length}</p>
                <p className="text-sm text-muted-foreground">Active Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <History className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{bookings.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-warning-light rounded-lg">
                <DollarSign className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalSpent}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success-light rounded-lg">
                <Car className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{slots.filter(s => s.currentOccupancy < s.capacity).length}</p>
                <p className="text-sm text-muted-foreground">Available Slots</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Booking */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Next Booking</span>
            </CardTitle>
            <CardDescription>Your upcoming parking reservation</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBooking ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="font-medium">
                      {slots.find(s => s.id === upcomingBooking.slotId)?.name}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{slots.find(s => s.id === upcomingBooking.slotId)?.location.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(upcomingBooking.startTime).toLocaleDateString()}</span>
                      <span>{new Date(upcomingBooking.startTime).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <Badge variant={upcomingBooking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {upcomingBooking.status}
                  </Badge>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>{upcomingBooking.duration} hours</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium mt-1">
                    <span>Total Cost:</span>
                    <span>${upcomingBooking.totalCost}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming bookings</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Book a slot
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest parking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => {
                const slot = slots.find(s => s.id === booking.slotId);
                return (
                  <div key={booking.id} className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{slot?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge 
                        variant={booking.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {booking.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">${booking.totalCost}</p>
                    </div>
                  </div>
                );
              })}
              {bookings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No booking history yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};