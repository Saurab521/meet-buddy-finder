-- Insert meeting rooms data
INSERT INTO public.meeting_rooms (id, name, capacity, location, has_tv) VALUES
-- Ground Floor Rooms
('turf-001', 'Turf 001', 8, 'Ground Floor', true),
('turf-002', 'Turf 002', 12, 'Ground Floor', true),
('turf-003', 'Turf 003', 9, 'Ground Floor', true),
('turf-004', 'Turf 004', 9, 'Ground Floor', true),
('turf-005', 'Turf 005', 7, 'Ground Floor', true),
('turf-006', 'Turf 006', 7, 'Ground Floor', true),
('turf-007', 'Turf 007', 4, 'Ground Floor', false),
('turf-008', 'Turf 008', 4, 'Ground Floor', false),
('turf-009', 'Turf 009', 7, 'Ground Floor', true),
-- First Floor Rooms
('turf-101', 'Turf 101', 7, 'First Floor', true),
('turf-102', 'Turf 102', 7, 'First Floor', true),
('turf-103', 'Turf 103', 9, 'First Floor', true),
('turf-104', 'Turf 104', 7, 'First Floor', true),
('turf-105', 'Turf 105', 5, 'First Floor', false),
('turf-106', 'Turf 106', 4, 'First Floor', false),
('turf-107', 'Turf 107', 4, 'First Floor', false),
('turf-108', 'Turf 108', 4, 'First Floor', false),
('turf-109', 'Turf 109', 5, 'First Floor', true),
-- Conference Room
('the-eyrie', 'The Eyrie', 10, 'Conference Room', true),
-- Second Floor Rooms
('turf-201', 'Turf 201', 8, 'Second Floor', true),
('training-room', 'Training Room', 20, 'Second Floor', true);