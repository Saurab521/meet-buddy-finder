import { useState, useEffect } from 'react';
import { MeetingRoom, Booking } from '@/types/meeting';

// Baaz Bike Company Meeting Rooms
const mockRooms: MeetingRoom[] = [
  // Ground Floor Rooms
  {
    id: 'turf-001',
    name: 'Turf 001',
    capacity: 8,
    location: 'Ground Floor',
    isAvailable: false,
    hasTV: true,
    currentBooking: {
      id: 'booking-001',
      roomId: 'turf-001',
      title: 'Sales Team Meeting',
      organizer: 'Rahul Sharma',
      organizerEmail: 'rahul.sharma@baazbike.com',
      department: 'Sales',
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 30, 0, 0)),
      attendees: 6,
      description: 'Monthly sales review',
      isActive: true
    }
  },
  {
    id: 'turf-002',
    name: 'Turf 002',
    capacity: 12,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-003',
    name: 'Turf 003',
    capacity: 9,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-004',
    name: 'Turf 004',
    capacity: 9,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-005',
    name: 'Turf 005',
    capacity: 7,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-006',
    name: 'Turf 006',
    capacity: 7,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-007',
    name: 'Turf 007',
    capacity: 4,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: false
  },
  {
    id: 'turf-008',
    name: 'Turf 008',
    capacity: 4,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: false
  },
  {
    id: 'turf-009',
    name: 'Turf 009',
    capacity: 7,
    location: 'Ground Floor',
    isAvailable: true,
    hasTV: true
  },
  // First Floor Rooms
  {
    id: 'turf-101',
    name: 'Turf 101',
    capacity: 7,
    location: 'First Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-102',
    name: 'Turf 102',
    capacity: 7,
    location: 'First Floor',
    isAvailable: false,
    hasTV: true,
    currentBooking: {
      id: 'booking-002',
      roomId: 'turf-102',
      title: 'Product Review',
      organizer: 'Priya Patel',
      organizerEmail: 'priya.patel@baazbike.com',
      department: 'Product',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(15, 0, 0, 0)),
      attendees: 5,
      isActive: true
    }
  },
  {
    id: 'turf-103',
    name: 'Turf 103',
    capacity: 9,
    location: 'First Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-104',
    name: 'Turf 104',
    capacity: 7,
    location: 'First Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'turf-105',
    name: 'Turf 105',
    capacity: 5,
    location: 'First Floor',
    isAvailable: true,
    hasTV: false
  },
  {
    id: 'turf-106',
    name: 'Turf 106',
    capacity: 4,
    location: 'First Floor',
    isAvailable: true,
    hasTV: false
  },
  {
    id: 'turf-107',
    name: 'Turf 107',
    capacity: 4,
    location: 'First Floor',
    isAvailable: true,
    hasTV: false
  },
  {
    id: 'turf-108',
    name: 'Turf 108',
    capacity: 4,
    location: 'First Floor',
    isAvailable: true,
    hasTV: false
  },
  {
    id: 'turf-109',
    name: 'Turf 109',
    capacity: 5,
    location: 'First Floor',
    isAvailable: true,
    hasTV: true
  },
  // Conference Room
  {
    id: 'the-eyrie',
    name: 'The Eyrie',
    capacity: 10,
    location: 'Conference Room',
    isAvailable: true,
    hasTV: true,
    nextBooking: {
      id: 'booking-003',
      roomId: 'the-eyrie',
      title: 'Board Meeting',
      organizer: 'Amit Singh',
      organizerEmail: 'amit.singh@baazbike.com',
      department: 'Executive',
      startTime: new Date(new Date().setHours(16, 0, 0, 0)),
      endTime: new Date(new Date().setHours(18, 0, 0, 0)),
      attendees: 8,
      isActive: false
    }
  },
  // Second Floor Rooms
  {
    id: 'turf-201',
    name: 'Turf 201',
    capacity: 8,
    location: 'Second Floor',
    isAvailable: true,
    hasTV: true
  },
  {
    id: 'training-room',
    name: 'Training Room',
    capacity: 20,
    location: 'Second Floor',
    isAvailable: true,
    hasTV: true
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