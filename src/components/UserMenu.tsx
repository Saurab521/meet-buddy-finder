import { useState } from 'react';
import { User, LogOut, Calendar, Settings, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { EditProfileDialog } from './EditProfileDialog';
import { MyMeetingsDialog } from './MyMeetingsDialog';
import { ChangePasswordDialog } from './ChangePasswordDialog';

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showMyMeetings, setShowMyMeetings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 text-black bg-white hover:bg-white/90">
            <User className="h-4 w-4" />
            {user.user_metadata?.full_name || user.email?.split('@')[0]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => setShowEditProfile(true)}>
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowMyMeetings(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            My Meetings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowChangePassword(true)}>
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProfileDialog 
        open={showEditProfile} 
        onOpenChange={setShowEditProfile} 
      />
      <MyMeetingsDialog 
        open={showMyMeetings} 
        onOpenChange={setShowMyMeetings} 
      />
      <ChangePasswordDialog 
        open={showChangePassword} 
        onOpenChange={setShowChangePassword} 
      />
    </>
  );
};