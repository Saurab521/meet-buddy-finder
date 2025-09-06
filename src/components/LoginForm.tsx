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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
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

    // Check password confirmation for signup
    if (isSignUp && password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Company Header */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-3">
            <img 
              src={baazBikeLogo} 
              alt="Baaz Bike Logo" 
              className="w-12 h-12 rounded-lg"
            />
            <span className="text-2xl font-bold text-gray-800">Baaz Bike</span>
          </div>
        </div>

        <div className="relative h-[800px] overflow-hidden">
          {/* Sign Up Section */}
          <div 
            className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${
              isSignUp ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            {/* Orange Background for Sign Up */}
            <div className="h-1/2 bg-gradient-to-br from-orange-400 to-orange-600 flex flex-col justify-center items-center text-white p-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Hello, Bazigar!</h2>
                <p className="text-lg text-white/90">Register with your company detail</p>
                <Button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-6 py-2 font-semibold rounded-full transition-all duration-300"
                >
                  Already have an account? Sign In
                </Button>
              </div>
            </div>

            {/* Sign Up Form */}
            <div className="h-1/2 bg-white flex flex-col justify-center items-center p-8">
              <div className="w-full max-w-sm space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={`your.name@${ALLOWED_DOMAIN}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold rounded-lg transition-all duration-300" 
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
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
                    className="w-full border-gray-300 hover:bg-gray-50 py-3"
                    onClick={() => signInWithGoogle()}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Only @{ALLOWED_DOMAIN} accounts are allowed
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sign In Section */}
          <div 
            className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${
              isSignUp ? 'translate-y-full' : 'translate-y-0'
            }`}
          >
            {/* White Background for Sign In */}
            <div className="h-1/2 bg-white flex flex-col justify-center items-center p-8">
              <div className="w-full max-w-sm space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-gray-700">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder={`your.name@${ALLOWED_DOMAIN}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-gray-700">Password</Label>
                    <Input
                      id="signin-password"
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
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold rounded-lg transition-all duration-300" 
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
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
                    className="w-full border-gray-300 hover:bg-gray-50 py-3"
                    onClick={() => signInWithGoogle()}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Only @{ALLOWED_DOMAIN} accounts are allowed
                  </div>
                </form>
              </div>
            </div>

            {/* Orange Background for Sign In */}
            <div className="h-1/2 bg-gradient-to-br from-orange-400 to-orange-600 flex flex-col justify-center items-center text-white p-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Welcome back Bazigar!</h2>
                <p className="text-lg text-white/90">Enter your company detail and password</p>
                <Button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-6 py-2 font-semibold rounded-full transition-all duration-300"
                >
                  Don't have an account? Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};