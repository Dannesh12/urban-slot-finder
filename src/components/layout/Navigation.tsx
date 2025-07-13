import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  MapPin, 
  Calendar, 
  Settings, 
  PlusCircle,
  History,
  Map
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { 
    to: '/admin', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    description: 'Overview & Analytics'
  },
  { 
    to: '/admin/slots', 
    icon: MapPin, 
    label: 'Manage Slots',
    description: 'Add & Edit Parking Slots'
  },
  { 
    to: '/admin/bookings', 
    icon: Calendar, 
    label: 'Bookings',
    description: 'View All Bookings'
  },
  { 
    to: '/admin/settings', 
    icon: Settings, 
    label: 'Settings',
    description: 'Account & Preferences'
  }
];

const userNavItems = [
  { 
    to: '/dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    description: 'Your Bookings Overview'
  },
  { 
    to: '/find-parking', 
    icon: Map, 
    label: 'Find Parking',
    description: 'Search Available Slots'
  },
  { 
    to: '/book', 
    icon: PlusCircle, 
    label: 'Book Slot',
    description: 'Make New Booking'
  },
  { 
    to: '/history', 
    icon: History, 
    label: 'Booking History',
    description: 'Past & Current Bookings'
  }
];

export const Navigation: React.FC = () => {
  const { user } = useAuth();
  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  return (
    <nav className="w-64 bg-card border-r min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-start space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={cn(
                    "w-5 h-5 mt-0.5 transition-transform duration-200",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                    "group-hover:scale-110"
                  )} 
                />
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-medium text-sm",
                    isActive ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {item.label}
                  </div>
                  <div className={cn(
                    "text-xs mt-0.5 leading-tight",
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <Badge variant="secondary" className="ml-auto bg-primary-foreground/20 text-primary-foreground text-xs">
                    Active
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-medium text-sm mb-3 text-foreground">Quick Info</h3>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Account Type:</span>
            <Badge variant="outline" className="text-xs capitalize">
              {user?.role}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Member Since:</span>
            <span>{new Date(user?.createdAt || '').toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};