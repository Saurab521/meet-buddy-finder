export interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  location: string;
  isAvailable: boolean;
  hasTV: boolean;
  currentBooking?: Booking;
  nextBooking?: Booking;
  todayBookings?: Booking[];
}

export interface Booking {
  id: string;
  roomId: string;
  title: string;
  organizer: string;
  organizerEmail: string;
  department: string;
  startTime: Date;
  endTime: Date;
  attendees: number;
  description?: string;
  isActive: boolean;
  date: string; // YYYY-MM-DD format
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
}