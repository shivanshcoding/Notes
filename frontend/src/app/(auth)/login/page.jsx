'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiEdit3, FiArrowRight } from 'react-icons/fi';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FiEdit3 size={24} className="text-brand" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand/10 via-background to-brand/5 items-center justify-center p-12">
        <div className="max-w-md animate-fade-in">
          <div className="w-20 h-20 bg-brand/20 rounded-2xl flex items-center justify-center mb-8">
            <FiEdit3 size={32} className="text-brand" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Your thoughts, <span className="text-brand">beautifully organized</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Create, edit, and organize your notes with our elegant markdown editor. 
            Your ideas deserve a beautiful home.
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-brand rounded-full"></div>
              Real-time markdown preview
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-brand rounded-full"></div>
              Beautiful, distraction-free interface
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-brand rounded-full"></div>
              Secure Google authentication
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md animate-slide-in-up">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-12">
            <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiEdit3 size={24} className="text-brand" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Modern Notes</h1>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-lg">
              Sign in to continue to your notes
            </p>
          </div>
          
          <div className="space-y-6">
            <button
              onClick={handleSignIn}
              disabled={isLoading || status === 'loading'}
              className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-card border border-border rounded-xl font-semibold text-foreground hover:bg-muted transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FcGoogle size={24} />
              )}
              <span className="flex-1 text-left">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
              {!isLoading && <FiArrowRight size={20} className="text-muted-foreground" />}
            </button>
            
            <p className="text-center text-xs text-muted-foreground">
              By signing in, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
