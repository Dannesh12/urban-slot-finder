import { ParkingSlot, Booking } from '@/types';

export const mockParkingSlots: ParkingSlot[] = [
  {
    id: '1',
    name: 'Downtown Central Parking',
    location: {
      address: '123 Main St, Downtown',
      lat: 40.7128,
      lng: -74.0060
    },
    capacity: 50,
    currentOccupancy: 35,
    hourlyRate: 15,
    adminId: '1',
    amenities: ['CCTV', 'Covered', '24/7 Security'],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Airport Express Lot',
    location: {
      address: '456 Airport Rd, Terminal 1',
      lat: 40.6892,
      lng: -74.1745
    },
    capacity: 200,
    currentOccupancy: 120,
    hourlyRate: 8,
    adminId: '1',
    amenities: ['Shuttle Service', 'Covered', 'Electric Charging'],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Mall Plaza Parking',
    location: {
      address: '789 Shopping Blvd, Mall District',
      lat: 40.7589,
      lng: -73.9851
    },
    capacity: 100,
    currentOccupancy: 45,
    hourlyRate: 12,
    adminId: '1',
    amenities: ['Covered', 'Valet Service', 'Car Wash'],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Business District Garage',
    location: {
      address: '321 Corporate Ave, Business Center',
      lat: 40.7614,
      lng: -73.9776
    },
    capacity: 75,
    currentOccupancy: 75,
    hourlyRate: 20,
    adminId: '1',
    amenities: ['CCTV', 'Covered', 'Reserved Spots'],
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '2',
    slotId: '1',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
    duration: 3,
    totalCost: 45,
    status: 'confirmed',
    paymentStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    slotId: '2',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    endTime: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    duration: 4,
    totalCost: 32,
    status: 'completed',
    paymentStatus: 'success',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

export const slotStorage = {
  getAll(): ParkingSlot[] {
    try {
      const stored = localStorage.getItem('parking_slots');
      return stored ? JSON.parse(stored) : mockParkingSlots;
    } catch {
      return mockParkingSlots;
    }
  },

  save(slots: ParkingSlot[]): void {
    localStorage.setItem('parking_slots', JSON.stringify(slots));
  },

  add(slot: Omit<ParkingSlot, 'id' | 'createdAt'>): ParkingSlot {
    const slots = this.getAll();
    const newSlot: ParkingSlot = {
      ...slot,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    slots.push(newSlot);
    this.save(slots);
    return newSlot;
  },

  update(id: string, updates: Partial<ParkingSlot>): ParkingSlot | null {
    const slots = this.getAll();
    const index = slots.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    slots[index] = { ...slots[index], ...updates };
    this.save(slots);
    return slots[index];
  },

  delete(id: string): boolean {
    const slots = this.getAll();
    const filtered = slots.filter(s => s.id !== id);
    if (filtered.length === slots.length) return false;
    
    this.save(filtered);
    return true;
  }
};

export const bookingStorage = {
  getAll(): Booking[] {
    try {
      const stored = localStorage.getItem('parking_bookings');
      return stored ? JSON.parse(stored) : mockBookings;
    } catch {
      return mockBookings;
    }
  },

  save(bookings: Booking[]): void {
    localStorage.setItem('parking_bookings', JSON.stringify(bookings));
  },

  add(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const bookings = this.getAll();
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    this.save(bookings);
    return newBooking;
  },

  updateStatus(id: string, status: Booking['status'], paymentStatus?: Booking['paymentStatus']): boolean {
    const bookings = this.getAll();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return false;
    
    bookings[index].status = status;
    if (paymentStatus) bookings[index].paymentStatus = paymentStatus;
    this.save(bookings);
    return true;
  }
};