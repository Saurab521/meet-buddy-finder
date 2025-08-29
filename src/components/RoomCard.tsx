import { Clock, Users, MapPin, Monitor, MonitorX, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MeetingRoom } from "@/types/meeting";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  room: MeetingRoom;
  onBook: (roomId: string) => void;
}

export const RoomCard = ({ room, onBook }: RoomCardProps) => {
  const navigate = useNavigate();
  const getStatusColor = () => {
    if (room.isAvailable) return "available";
    return "occupied";
  };

  const getStatusText = () => {
    if (room.isAvailable) return "Available";
    return "Occupied";
  };

  return (
    <Card className="h-full bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold">{room.name}</CardTitle>
          <Badge 
            variant={room.isAvailable ? "default" : "destructive"}
            className={`${room.isAvailable ? 'bg-available hover:bg-available/90' : 'bg-occupied hover:bg-occupied/90'} text-white font-medium`}
          >
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{room.location}</span>
          </div>
          <div className={`flex items-center gap-1 ${room.hasTV ? 'text-green-600' : 'text-gray-400'}`}>
            {room.hasTV ? (
              <>
                <Monitor className="h-4 w-4" />
                <span>TV Available</span>
              </>
            ) : (
              <>
                <MonitorX className="h-4 w-4" />
                <span>No TV</span>
              </>
            )}
          </div>
        </div>

        {room.currentBooking && (
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="font-medium text-sm">Current Meeting</div>
            <div className="text-sm">
              <div className="font-semibold">{room.currentBooking.title}</div>
              <div className="text-muted-foreground">
                by {room.currentBooking.organizer}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                <span>
                  {format(room.currentBooking.startTime, 'HH:mm')} - {format(room.currentBooking.endTime, 'HH:mm')}
                </span>
              </div>
            </div>
          </div>
        )}

        {room.nextBooking && room.isAvailable && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 space-y-2">
            <div className="font-medium text-sm text-warning-foreground">Next Meeting</div>
            <div className="text-sm">
              <div className="font-semibold">{room.nextBooking.title}</div>
              <div className="text-muted-foreground">
                by {room.nextBooking.organizer}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                <span>
                  {format(room.nextBooking.startTime, 'HH:mm')} - {format(room.nextBooking.endTime, 'HH:mm')}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={() => onBook(room.id)}
            disabled={!room.isAvailable}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {room.isAvailable ? 'Book Room' : 'Room Occupied'}
          </Button>
          
          {room.hasTV && (
            <Button 
              variant="outline"
              size="sm"
              onClick={() => navigate(`/tv/${room.id}`)}
              className="px-3 border-primary/20 hover:bg-primary/10"
              title="View TV Display"
            >
              <Tv className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};