import { useState } from "react";
import { Building2, Calendar, Clock, Search, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoomCard } from "@/components/RoomCard";
import { BookingForm } from "@/components/BookingForm";
import { useMeetingRooms } from "@/hooks/useMeetingRooms";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { rooms, bookRoom } = useMeetingRooms();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableRooms = filteredRooms.filter(room => room.isAvailable);
  const occupiedRooms = filteredRooms.filter(room => !room.isAvailable);

  const handleBookRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleBookingSubmit = (booking: any) => {
    try {
      bookRoom(booking);
      toast({
        title: "Room Booked Successfully!",
        description: `${booking.title} has been scheduled.`,
      });
      setSelectedRoomId(null);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectedRoom = rooms.find(room => room.id === selectedRoomId);

  if (selectedRoom) {
    return (
      <div className="min-h-screen bg-background p-4">
        <BookingForm
          room={selectedRoom}
          onSubmit={handleBookingSubmit}
          onCancel={() => setSelectedRoomId(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-elevated">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Company Name */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Baaz Bike
            </h1>
            <p className="text-lg sm:text-xl text-white/80">Meeting Room Booking System</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 sm:h-10 sm:w-10" />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold">Conference Rooms</h2>
                <p className="text-sm sm:text-base text-white/80">Book your meeting space</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/tv/room-001')}
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white text-sm sm:text-base"
              size="sm"
            >
              <Monitor className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">TV Display Demo</span>
              <span className="sm:hidden">TV Demo</span>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-center">{format(new Date(), 'EEEE, MMMM do, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{format(new Date(), 'HH:mm')}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Search and Stats */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card shadow-card h-10 sm:h-12 text-sm sm:text-base"
              />
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Card className="bg-gradient-card shadow-card flex-1 max-w-[120px] sm:max-w-none">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-available">{availableRooms.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Available</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card shadow-card flex-1 max-w-[120px] sm:max-w-none">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-occupied">{occupiedRooms.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Occupied</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Rooms */}
        {availableRooms.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Available Rooms</h2>
              <Badge className="bg-available hover:bg-available/90 text-available-foreground">
                {availableRooms.length} rooms
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {availableRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBook={handleBookRoom}
                />
              ))}
            </div>
          </section>
        )}

        {/* Occupied Rooms */}
        {occupiedRooms.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Currently Occupied</h2>
              <Badge className="bg-occupied hover:bg-occupied/90 text-occupied-foreground">
                {occupiedRooms.length} rooms
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {occupiedRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBook={handleBookRoom}
                />
              ))}
            </div>
          </section>
        )}

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
