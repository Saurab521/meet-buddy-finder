import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Building2, Chrome } from 'lucide-react';

interface LoginFormProps {
  onClose?: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const ALLOWED_DOMAIN = 'electorq.com';
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email ends with @electorq.com
    if (!email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
      toast({
        title: 'Access Denied',
        description: `Please use your company email (@${ALLOWED_DOMAIN})`,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: 'Success',
          description: 'Account created successfully! Please check your email to verify your account.',
        });
      } else {
        await signIn(email, password);
        toast({
          title: 'Welcome back!',
          description: 'You have been logged in successfully.',
        });
      }
      onClose?.();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">Baaz Bike</span>
        </div>
        <CardTitle>{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Create your Baaz Bike account to book meeting rooms'
            : 'Sign in with your Baaz Bike company email'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Company Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={`your.name@${ALLOWED_DOMAIN}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>

          <div className="relative">
            <div className="my-2 text-center text-xs text-muted-foreground">or</div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signInWithGoogle()}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="text-center text-xs text-muted-foreground mt-2">
            Only @{ALLOWED_DOMAIN} accounts are allowed
          </div>
          
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary"
            >
              {isSignUp 
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};