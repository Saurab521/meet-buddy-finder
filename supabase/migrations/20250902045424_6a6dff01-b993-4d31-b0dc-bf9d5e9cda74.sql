-- Create meeting_rooms table
CREATE TABLE public.meeting_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  location TEXT NOT NULL,
  has_tv BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.meeting_rooms(id),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  organizer TEXT NOT NULL,
  organizer_email TEXT NOT NULL,
  department TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  attendees INTEGER NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meeting_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for meeting_rooms (read-only for all authenticated users)
CREATE POLICY "Meeting rooms are viewable by everyone"
ON public.meeting_rooms
FOR SELECT
USING (true);

-- Create policies for bookings
CREATE POLICY "Bookings are viewable by everyone"
ON public.bookings
FOR SELECT
USING (true);

CREATE POLICY "Users can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON public.bookings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings"
ON public.bookings
FOR DELETE
USING (auth.uid() = user_id);

-- Insert meeting rooms data
INSERT INTO public.meeting_rooms (id, name, capacity, location, has_tv) VALUES
('turf-001', 'Turf 001', 8, 'Ground Floor', true),
('turf-002', 'Turf 002', 12, 'Ground Floor', true),
('turf-003', 'Turf 003', 9, 'Ground Floor', true),
('turf-004', 'Turf 004', 9, 'Ground Floor', true),
('turf-005', 'Turf 005', 7, 'Ground Floor', true),
('turf-006', 'Turf 006', 7, 'Ground Floor', true),
('turf-007', 'Turf 007', 4, 'Ground Floor', false),
('turf-008', 'Turf 008', 4, 'Ground Floor', false),
('turf-009', 'Turf 009', 7, 'Ground Floor', true),
('turf-101', 'Turf 101', 7, 'First Floor', true),
('turf-102', 'Turf 102', 7, 'First Floor', true),
('turf-103', 'Turf 103', 9, 'First Floor', true),
('turf-104', 'Turf 104', 7, 'First Floor', true),
('turf-105', 'Turf 105', 5, 'First Floor', false),
('turf-106', 'Turf 106', 4, 'First Floor', false),
('turf-107', 'Turf 107', 4, 'First Floor', false),
('turf-108', 'Turf 108', 4, 'First Floor', false),
('turf-109', 'Turf 109', 5, 'First Floor', true),
('the-eyrie', 'The Eyrie', 10, 'Conference Room', true),
('turf-201', 'Turf 201', 8, 'Second Floor', true),
('training-room', 'Training Room', 20, 'Second Floor', true);

-- Enable realtime for both tables
ALTER TABLE public.meeting_rooms REPLICA IDENTITY FULL;
ALTER TABLE public.bookings REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.meeting_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_meeting_rooms_updated_at
  BEFORE UPDATE ON public.meeting_rooms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();