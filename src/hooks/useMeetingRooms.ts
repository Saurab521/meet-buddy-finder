import { useState, useEffect } from 'react';
import { MeetingRoom, Booking } from '@/types/meeting';

// Mock data - in real app this would come from API
const mockRooms: MeetingRoom[] = [
  {
    id: 'room-001',
    name: 'Conference Room A',
    capacity: 8,
    location: 'Floor 1, East Wing',
    isAvailable: false,
    currentBooking: {
      id: 'booking-001',
      roomId: 'room-001',
      title: 'Product Strategy Meeting',
      organizer: 'Rahul Sharma',
      organizerEmail: 'rahul.sharma@company.com',
      department: 'Product',
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 30, 0, 0)),
      attendees: 6,
      description: 'Q4 product roadmap discussion',
      isActive: true
    },
    nextBooking: {
      id: 'booking-002',
      roomId: 'room-001',
      title: 'Team Standup',
      organizer: 'Priya Patel',
      organizerEmail: 'priya.patel@company.com',
      department: 'Engineering',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(14, 30, 0, 0)),
      attendees: 5,
      isActive: false
    }
  },
  {
    id: 'room-002',
    name: 'Meeting Room B',
    capacity: 4,
    location: 'Floor 2, West Wing',
    isAvailable: true
  },
  {
    id: 'room-003',
    name: 'Executive Boardroom',
    capacity: 12,
    location: 'Floor 3, Center',
    isAvailable: true,
    nextBooking: {
      id: 'booking-003',
      roomId: 'room-003',
      title: 'Board Meeting',
      organizer: 'Amit Singh',
      organizerEmail: 'amit.singh@company.com',
      department: 'Executive',
      startTime: new Date(new Date().setHours(16, 0, 0, 0)),
      endTime: new Date(new Date().setHours(18, 0, 0, 0)),
      attendees: 8,
      isActive: false
    }
  },
  {
    id: 'room-004',
    name: 'Training Room',
    capacity: 20,
    location: 'Floor 1, West Wing',
    isAvailable: true
  },
  {
    id: 'room-005',
    name: 'Focus Pod 1',
    capacity: 2,
    location: 'Floor 2, East Wing',
    isAvailable: false,
    currentBooking: {
      id: 'booking-004',
      roomId: 'room-005',
      title: 'Client Call',
      organizer: 'Neha Gupta',
      organizerEmail: 'neha.gupta@company.com',
      department: 'Sales',
      startTime: new Date(new Date().setHours(11, 0, 0, 0)),
      endTime: new Date(new Date().setHours(12, 0, 0, 0)),
      attendees: 2,
      isActive: true
    }
  },
  {
    id: 'room-006',
    name: 'Creative Studio',
    capacity: 6,
    location: 'Floor 3, East Wing',
    isAvailable: true
  }
];

export const useMeetingRooms = () => {
  const [rooms, setRooms] = useState<MeetingRoom[]>(mockRooms);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRooms(prevRooms => [...prevRooms]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const bookRoom = (booking: Omit<Booking, 'id' | 'isActive'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      isActive: true
    };

    // Update room status
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === booking.roomId
          ? {
              ...room,
              isAvailable: false,
              currentBooking: newBooking
            }
          : room
      )
    );

    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Update room status
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === booking.roomId
          ? {
              ...room,
              isAvailable: true,
              currentBooking: undefined
            }
          : room
      )
    );

    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  return {
    rooms,
    bookings,
    bookRoom,
    cancelBooking
  };
};