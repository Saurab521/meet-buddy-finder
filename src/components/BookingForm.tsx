import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { CalendarDays, Clock, Users, X } from "lucide-react";
import { MeetingRoom, Booking } from "@/types/meeting";

interface BookingFormProps {
  room: MeetingRoom;
  onSubmit: (booking: Omit<Booking, 'id' | 'isActive'>) => void;
  onCancel: () => void;
}

export const BookingForm = ({ room, onSubmit, onCancel }: BookingFormProps) => {
  const { user } = useAuth();
  const defaultName = user?.user_metadata?.full_name || (user?.email?.split("@")[0] ?? "");
  const defaultEmail = user?.email || "";
  const [formData, setFormData] = useState({
    title: '',
    organizer: defaultName,
    organizerEmail: defaultEmail,
    department: '',
    startTime: '',
    endTime: '',
    attendees: 1,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking: Omit<Booking, 'id' | 'isActive'> = {
      roomId: room.id,
      title: formData.title,
      organizer: formData.organizer,
      organizerEmail: formData.organizerEmail,
      department: formData.department,
      startTime: new Date(`${new Date().toISOString().split('T')[0]}T${formData.startTime}`),
      endTime: new Date(`${new Date().toISOString().split('T')[0]}T${formData.endTime}`),
      attendees: formData.attendees,
      description: formData.description
    };
    
    onSubmit(booking);
  };


  return (
    <Card className="max-w-2xl mx-auto bg-gradient-card shadow-elevated">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Book {room.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter meeting title"
                required
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer Name *</Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
                placeholder="Your name"
                required
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.organizerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, organizerEmail: e.target.value }))}
                placeholder="your.email@company.com"
                required
                readOnly
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                type="text"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="Type your department"
                required
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time *
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                End Time *
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                required
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attendees" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Attendees
              </Label>
              <Input
                id="attendees"
                type="number"
                min="1"
                max={room.capacity}
                value={formData.attendees}
                onChange={(e) => setFormData(prev => ({ ...prev, attendees: parseInt(e.target.value) }))}
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Meeting agenda or additional notes"
              className="bg-background min-h-[80px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Book Room
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};