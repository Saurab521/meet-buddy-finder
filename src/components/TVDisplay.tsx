import { Clock, Calendar, Users, MapPin, Building } from "lucide-react";
import { MeetingRoom } from "@/types/meeting";
import { format } from "date-fns";

interface TVDisplayProps {
  room: MeetingRoom;
}

export const TVDisplay = ({ room }: TVDisplayProps) => {
  const currentTime = format(new Date(), 'HH:mm');
  const currentDate = format(new Date(), 'EEEE, MMMM do, yyyy');

  if (!room.currentBooking && !room.nextBooking) {
    return (
      <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center text-white p-8">
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-8xl font-bold">{room.name}</h1>
            <div className="flex items-center justify-center gap-4 text-3xl text-white/80">
              <MapPin className="h-8 w-8" />
              <span>{room.location}</span>
              <Users className="h-8 w-8 ml-8" />
              <span>{room.capacity} seats</span>
            </div>
          </div>
          
          <div className="bg-available/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="text-6xl font-bold text-available-foreground mb-4">AVAILABLE</div>
            <div className="text-3xl text-white/90">Ready for booking</div>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-2xl text-white/70">
            <div className="flex items-center gap-3">
              <Calendar className="h-7 w-7" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-7 w-7" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (room.currentBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-occupied to-occupied/80 flex flex-col items-center justify-center text-white p-8">
        <div className="text-center space-y-8 max-w-5xl w-full">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold">{room.name}</h1>
            <div className="flex items-center justify-center gap-4 text-2xl text-white/80">
              <MapPin className="h-7 w-7" />
              <span>{room.location}</span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 space-y-8">
            <div className="text-4xl font-bold text-occupied-foreground mb-4">MEETING IN PROGRESS</div>
            
            <div className="space-y-6">
              <div className="text-5xl font-bold">{room.currentBooking.title}</div>
              
              <div className="grid grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
                <div className="space-y-3">
                  <div className="text-2xl">
                    <span className="text-white/70">Organizer:</span>
                    <div className="font-semibold">{room.currentBooking.organizer}</div>
                  </div>
                  <div className="text-2xl">
                    <span className="text-white/70">Department:</span>
                    <div className="font-semibold">{room.currentBooking.department}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-2xl">
                    <span className="text-white/70">Time:</span>
                    <div className="font-semibold">
                      {format(room.currentBooking.startTime, 'HH:mm')} - {format(room.currentBooking.endTime, 'HH:mm')}
                    </div>
                  </div>
                  <div className="text-2xl">
                    <span className="text-white/70">Attendees:</span>
                    <div className="font-semibold">{room.currentBooking.attendees} people</div>
                  </div>
                </div>
              </div>
              
              {room.currentBooking.description && (
                <div className="text-xl text-white/90 max-w-3xl mx-auto">
                  <span className="text-white/70">Agenda:</span>
                  <div className="mt-2">{room.currentBooking.description}</div>
                </div>
              )}
            </div>
          </div>
          
          {room.nextBooking && (
            <div className="bg-warning/20 backdrop-blur-sm rounded-2xl p-8 border border-warning/30">
              <div className="text-2xl font-bold text-warning-foreground mb-4">NEXT MEETING</div>
              <div className="text-xl">
                <span className="font-semibold">{room.nextBooking.title}</span> by {room.nextBooking.organizer}
              </div>
              <div className="text-lg text-white/80 mt-2">
                {format(room.nextBooking.startTime, 'HH:mm')} - {format(room.nextBooking.endTime, 'HH:mm')}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-8 text-xl text-white/70">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};