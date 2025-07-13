export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface ParkingSlot {
  id: string;
  name: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  capacity: number;
  currentOccupancy: number;
  hourlyRate: number;
  adminId: string;
  amenities: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  startTime: string;
  endTime: string;
  duration: number; // in hours
  totalCost: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'success' | 'failed';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SlotFilter {
  location?: string;
  maxPrice?: number;
  availableOnly?: boolean;
  amenities?: string[];
}