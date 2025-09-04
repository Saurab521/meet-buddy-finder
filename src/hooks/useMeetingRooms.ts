import { useState, useEffect } from 'react';
import { MeetingRoom, Booking } from '@/types/meeting';
import { supabase } from '@/integrations/supabase/client';

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
      isActive: true,
      date: new Date().toISOString().split('T')[0]
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
      isActive: true,
      date: new Date().toISOString().split('T')[0]
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
      isActive: false,
      date: new Date().toISOString().split('T')[0]
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
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data and set up real-time subscriptions
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load meeting rooms
        console.log('Loading meeting rooms from database...');
        const { data: roomsData, error: roomsError } = await supabase
          .from('meeting_rooms')
          .select('*');

        console.log('Rooms data:', roomsData);
        console.log('Rooms error:', roomsError);

        if (roomsError) throw roomsError;

        // Load bookings for today
        const today = new Date().toISOString().split('T')[0];
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('date', today)
          .eq('is_active', true);

        if (bookingsError) throw bookingsError;

        // Transform database data to match our interface
        const transformedRooms: MeetingRoom[] = roomsData.map(room => ({
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          location: room.location,
          isAvailable: true,
          hasTV: room.has_tv
        }));

        console.log('Transformed rooms:', transformedRooms);

        const transformedBookings: Booking[] = bookingsData.map(booking => ({
          id: booking.id,
          roomId: booking.room_id,
          title: booking.title,
          organizer: booking.organizer,
          organizerEmail: booking.organizer_email,
          department: booking.department,
          startTime: new Date(booking.start_time),
          endTime: new Date(booking.end_time),
          attendees: booking.attendees,
          description: booking.description,
          date: booking.date,
          isActive: booking.is_active
        }));

        console.log('Transformed bookings:', transformedBookings);

        setBookings(transformedBookings);
        const updatedRooms = updateRoomsWithBookings(transformedRooms, transformedBookings);
        console.log('Updated rooms:', updatedRooms.length, 'rooms');
        setRooms(updatedRooms);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();

    // Set up real-time subscription for bookings
    const bookingsChannel = supabase
      .channel('room-bookings-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        async (payload) => {
          console.log('Real-time booking change:', payload);
          
          // Reload bookings when any booking changes
          const today = new Date().toISOString().split('T')[0];
          const { data: bookingsData } = await supabase
            .from('bookings')
            .select('*')
            .eq('date', today)
            .eq('is_active', true);

          if (bookingsData) {
            const transformedBookings: Booking[] = bookingsData.map(booking => ({
              id: booking.id,
              roomId: booking.room_id,
              title: booking.title,
              organizer: booking.organizer,
              organizerEmail: booking.organizer_email,
              department: booking.department,
              startTime: new Date(booking.start_time),
              endTime: new Date(booking.end_time),
              attendees: booking.attendees,
              description: booking.description,
              date: booking.date,
              isActive: booking.is_active
            }));

            console.log('Real-time updated bookings:', transformedBookings);
            setBookings(transformedBookings);
            
            // Update rooms with new bookings immediately
            setRooms(currentRooms => {
              const updatedRooms = updateRoomsWithBookings([...currentRooms], transformedBookings);
              console.log('Real-time updated rooms:', updatedRooms.filter(r => !r.isAvailable).length, 'occupied rooms');
              return updatedRooms;
            });
          }
        }
      )
      .subscribe();

    // Auto-refresh booking status every 30 seconds to handle time-based changes
    const interval = setInterval(() => {
      setRooms(currentRooms => {
        console.log('Auto-refresh: updating room status based on current time');
        return updateRoomsWithBookings([...currentRooms], bookings);
      });
    }, 30000);

    return () => {
      supabase.removeChannel(bookingsChannel);
      clearInterval(interval);
    };
  }, []);

  const updateRoomsWithBookings = (roomsList: MeetingRoom[], bookingsList: Booking[]) => {
    const today = new Date().toISOString().split('T')[0];
    
    return roomsList.map(room => {
      const todayBookings = bookingsList.filter((b: Booking) => 
        b.roomId === room.id && b.date === today && b.isActive
      );
      
      // Sort bookings by start time
      todayBookings.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      
      const now = new Date();
      
      // Current booking: started but not ended (no buffer - room available immediately after end time)
      const currentBooking = todayBookings.find((b: Booking) => {
        // Ensure we have Date objects
        const startTime = b.startTime instanceof Date ? b.startTime : new Date(b.startTime);
        const endTime = b.endTime instanceof Date ? b.endTime : new Date(b.endTime);
        
        const isCurrentlyActive = startTime <= now && endTime > now && b.isActive;
        
        if (isCurrentlyActive) {
          console.log(`Current booking found for ${room.name}:`, {
            title: b.title,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            now: now.toISOString(),
            isActive: b.isActive
          });
        }
        
        return isCurrentlyActive;
      });
      
      // Next booking: upcoming booking after current time
      const nextBooking = todayBookings.find((b: Booking) => {
        // Ensure we have Date objects
        const startTime = b.startTime instanceof Date ? b.startTime : new Date(b.startTime);
        return startTime > now && b.isActive;
      });
      
      const updatedRoom = {
        ...room,
        isAvailable: !currentBooking,
        currentBooking,
        nextBooking,
        todayBookings
      };
      
      console.log(`Room ${room.name}:`, {
        isAvailable: updatedRoom.isAvailable,
        hasCurrentBooking: !!currentBooking,
        hasNextBooking: !!nextBooking,
        totalBookings: todayBookings.length
      });
      
      return updatedRoom;
    });
  };

  const bookRoom = async (booking: Omit<Booking, 'id' | 'isActive'>) => {
    try {
      // Check for conflicts with existing bookings
      const { data: existingBookings, error: checkError } = await supabase
        .from('bookings')
        .select('*')
        .eq('room_id', booking.roomId)
        .eq('date', booking.date)
        .eq('is_active', true);

      if (checkError) throw checkError;

      const hasConflict = existingBookings?.some((existingBooking: any) => {
        const existingStart = new Date(existingBooking.start_time);
        const existingEnd = new Date(existingBooking.end_time);
        const newStart = booking.startTime;
        const newEnd = booking.endTime;
        
        return (newStart < existingEnd && newEnd > existingStart);
      });
      
      if (hasConflict) {
        throw new Error('Time slot conflict with existing booking');
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Insert booking into database
      const { data: newBookingData, error: insertError } = await supabase
        .from('bookings')
        .insert({
          room_id: booking.roomId,
          user_id: user.id,
          title: booking.title,
          organizer: booking.organizer,
          organizer_email: booking.organizerEmail,
          department: booking.department,
          start_time: booking.startTime.toISOString(),
          end_time: booking.endTime.toISOString(),
          attendees: booking.attendees,
          description: booking.description,
          date: booking.date,
          is_active: true
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const transformedBooking: Booking = {
        id: newBookingData.id,
        roomId: newBookingData.room_id,
        title: newBookingData.title,
        organizer: newBookingData.organizer,
        organizerEmail: newBookingData.organizer_email,
        department: newBookingData.department,
        startTime: new Date(newBookingData.start_time),
        endTime: new Date(newBookingData.end_time),
        attendees: newBookingData.attendees,
        description: newBookingData.description,
        date: newBookingData.date,
        isActive: newBookingData.is_active
      };

      console.log('New booking created:', transformedBooking);
      
      // Update local state immediately for instant UI feedback
      setBookings(currentBookings => [...currentBookings, transformedBooking]);
      setRooms(currentRooms => {
        const updatedRooms = updateRoomsWithBookings([...currentRooms], [...bookings, transformedBooking]);
        console.log('Immediately updated rooms after booking');
        return updatedRooms;
      });

      return transformedBooking;
    } catch (error) {
      console.error('Error booking room:', error);
      throw error;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      // Update booking to inactive in database
      const { error } = await supabase
        .from('bookings')
        .update({ is_active: false })
        .eq('id', bookingId);

      if (error) throw error;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  };

  return {
    rooms,
    bookings,
    bookRoom,
    cancelBooking,
    loading
  };
};