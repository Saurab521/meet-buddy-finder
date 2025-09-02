import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useMeetingRooms } from '@/hooks/useMeetingRooms';
import { format } from 'date-fns';
import { Booking } from '@/types/meeting';

interface MyMeetingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MyMeetingsDialog = ({ open, onOpenChange }: MyMeetingsDialogProps) => {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useMeetingRooms();
  const { toast } = useToast();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user && bookings) {
      const userEmail = user.email;
      const myBookings = bookings.filter(booking => 
        booking.organizerEmail === userEmail
      );
      setUserBookings(myBookings);
    }
  }, [user, bookings]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      cancelBooking(bookingId);
      toast({
        title: 'Meeting Cancelled',
        description: 'Your meeting has been cancelled successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const upcomingBookings = userBookings.filter(booking => 
    new Date(booking.endTime) > new Date()
  );

  const pastBookings = userBookings.filter(booking => 
    new Date(booking.endTime) <= new Date()
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Meetings</DialogTitle>
          <DialogDescription>
            View and manage your booked meetings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Meetings ({upcomingBookings.length})
            </h3>
            {upcomingBookings.length === 0 ? (
              <p className="text-muted-foreground">No upcoming meetings.</p>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{booking.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge 
                            variant={new Date(booking.startTime) <= new Date() && new Date(booking.endTime) > new Date() ? "default" : "secondary"}
                          >
                            {new Date(booking.startTime) <= new Date() && new Date(booking.endTime) > new Date() ? 'Active' : 'Scheduled'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{format(booking.startTime, 'MMM dd, yyyy • HH:mm')} - {format(booking.endTime, 'HH:mm')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Room ID: {booking.roomId}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div><strong>Attendees:</strong> {booking.attendees}</div>
                          <div><strong>Department:</strong> {booking.department}</div>
                        </div>
                      </div>
                      {booking.description && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <strong>Description:</strong> {booking.description}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Past Meetings */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Past Meetings ({pastBookings.length})
            </h3>
            {pastBookings.length === 0 ? (
              <p className="text-muted-foreground">No past meetings.</p>
            ) : (
              <div className="space-y-3">
                {pastBookings.slice(0, 5).map((booking) => (
                  <Card key={booking.id} className="opacity-75">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{booking.title}</CardTitle>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{format(booking.startTime, 'MMM dd, yyyy • HH:mm')} - {format(booking.endTime, 'HH:mm')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Room ID: {booking.roomId}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div><strong>Attendees:</strong> {booking.attendees}</div>
                          <div><strong>Department:</strong> {booking.department}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {pastBookings.length > 5 && (
                  <p className="text-center text-muted-foreground">
                    Showing 5 of {pastBookings.length} past meetings
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};