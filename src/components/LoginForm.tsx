import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Chrome } from 'lucide-react';
import baazBikeLogo from '@/assets/baaz-bike-logo.png';

interface LoginFormProps {
  onClose?: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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
        await signUp(email, password, fullName?.trim() || undefined);
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="relative h-[600px] flex">
        {/* Animated Orange Panel */}
        <div 
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-orange-400 to-orange-600 transition-all duration-700 ease-in-out z-10 ${
            isSignUp ? 'left-0' : 'left-1/2'
          }`}
        >
          <div className="h-full flex flex-col justify-center items-center text-white p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img 
                  src={baazBikeLogo} 
                  alt="Baaz Bike Logo" 
                  className="w-12 h-12 rounded-lg bg-white/20 p-2"
                />
                <span className="text-3xl font-bold">Baaz Bike</span>
              </div>
              
              {isSignUp ? (
                <>
                  <h2 className="text-4xl font-bold">Hello, Bazigar!</h2>
                  <p className="text-xl text-white/90">Register with your company details</p>
                  <Button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold">Welcome Back, Bazigar!</h2>
                  <p className="text-xl text-white/90">Enter your company details and password</p>
                  <Button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className={`w-1/2 h-full transition-all duration-700 ease-in-out ${isSignUp ? 'ml-1/2' : 'ml-0'}`}>
          <div className="h-full flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-sm space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {!isSignUp ? 'Create Account' : 'Sign In'}
                </h3>
                <p className="text-gray-600">
                  {!isSignUp 
                    ? 'Create your Baaz Bike account to book meeting rooms'
                    : 'Sign in with your Baaz Bike company email'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Company Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`your.name@${ALLOWED_DOMAIN}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                {!isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {!isSignUp ? 'Create Account' : 'Sign In'}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 py-3 text-lg"
                  onClick={() => signInWithGoogle()}
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Continue with Google
                </Button>

                <div className="text-center text-sm text-gray-500 mt-4">
                  Only @{ALLOWED_DOMAIN} accounts are allowed
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};