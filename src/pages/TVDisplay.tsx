import { useParams } from "react-router-dom";
import { TVDisplay } from "@/components/TVDisplay";
import { useMeetingRooms } from "@/hooks/useMeetingRooms";

const TVDisplayPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms } = useMeetingRooms();
  
  const room = rooms.find(r => r.id === roomId);
  
  if (!room) {
    return (
      <div className="min-h-screen bg-destructive flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Room Not Found</h1>
          <p className="text-2xl">Please check the room ID</p>
        </div>
      </div>
    );
  }
  
  return <TVDisplay room={room} />;
};

export default TVDisplayPage;