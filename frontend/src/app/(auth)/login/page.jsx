'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiEdit3, FiArrowRight, FiZap, FiShield, FiStar } from 'react-icons/fi';

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto border border-white/10 shadow-2xl">
              <FiEdit3 size={32} className="text-cyan-300 drop-shadow-lg animate-pulse" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-32 bg-gradient-to-r from-cyan-400/40 to-purple-600/40 rounded-full mx-auto animate-pulse"></div>
            <div className="h-2 w-24 bg-gradient-to-r from-purple-400/40 to-pink-600/40 rounded-full mx-auto animate-pulse delay-300"></div>
            <div className="h-2 w-28 bg-gradient-to-r from-pink-400/40 to-cyan-600/40 rounded-full mx-auto animate-pulse delay-700"></div>
          </div>
          <p className="text-cyan-100/60 mt-6 font-medium tracking-wide">Initializing login interface...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-400/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
        
        {/* Floating liquid elements */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-purple-600/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-blue-600/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="flex min-h-screen relative z-10">
        {/* Left side - Futuristic Branding */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            {/* Logo section */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-cyan-400/20">
                      <FiEdit3 size={28} className="text-cyan-300 drop-shadow-lg" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl blur-md -z-10"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                      Modern Notes
                    </h1>
                    <p className="text-cyan-100/60 text-sm">v2.0.8 • Markdown Edition</p>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Note, Learn, <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">Conquer</span>
                </h2>
                <p className="text-cyan-100/80 text-lg leading-relaxed mb-8">
                  Master any skill with our advanced note making app. 
                  Document algorithms, save syntax, memorize frameworks, achieve greatness.
                </p>
                
                {/* Feature highlights */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors">
                      <FiZap size={16} className="text-cyan-300" />
                    </div>
                    <span className="text-cyan-100/80 group-hover:text-cyan-100 transition-colors">Live Markdown Preview</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-purple-400/20 group-hover:border-purple-400/40 transition-colors">
                      <FiStar size={16} className="text-purple-300" />
                    </div>
                    <span className="text-cyan-100/80 group-hover:text-cyan-100 transition-colors">CRUD Operations Available</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-lg flex items-center justify-center border border-pink-400/20 group-hover:border-pink-400/40 transition-colors">
                      <FiShield size={16} className="text-pink-300" />
                    </div>
                    <span className="text-cyan-100/80 group-hover:text-cyan-100 transition-colors">Secure JWT and Google Login</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-black/10 backdrop-blur-xl border border-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Guide</div>
                <div className="text-cyan-100/60 text-sm">Markdown</div>
              </div>
              <div className="text-center bg-black/10 backdrop-blur-xl border border-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Live</div>
                <div className="text-cyan-100/60 text-sm">Preview</div>
              </div>
              <div className="text-center bg-black/10 backdrop-blur-xl border border-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-cyan-300 bg-clip-text text-transparent">∞</div>
                <div className="text-cyan-100/60 text-sm">Notes</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Futuristic Login */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-12">
              <div className="relative group inline-block">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-xl rounded-xl flex items-center justify-center mx-auto mb-3 border border-cyan-400/20">
                    <FiEdit3 size={20} className="text-cyan-300" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Neural Notes</h1>
                </div>
              </div>
            </div>
            
            {/* Login card */}
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
              <div className="relative bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    Access <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">Portal</span>
                  </h1>
                  <p className="text-cyan-100/70 text-lg">
                    Connect to your note making workspace
                  </p>
                  
                  {/* Scanning animation */}
                  <div className="mt-6 relative">
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <button
                    onClick={handleSignIn}
                    disabled={isLoading || status === 'loading'}
                    className="w-full group relative"
                  >
                    {/* Subtle background glow */}
                    <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    {/* Main button */}
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-4 transition-all duration-300 ease-out group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                          <span className="text-white/80 font-medium">Connecting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 w-full">
                          <FcGoogle size={22} className="flex-shrink-0" />
                          <span className="flex-1 text-left text-white/90 font-medium group-hover:text-white transition-colors duration-300">
                            Continue with Google
                          </span>
                          <FiArrowRight size={18} className="text-white/60 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      )}
                    </div>
                  </button>
                  
                  {/* Status indicators */}
                  <div className="flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-2 text-cyan-300/60">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Secure Auth
                    </div>
                    <div className="flex items-center gap-2 text-purple-300/60">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                      MongoDB Sync
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-cyan-100/40 leading-relaxed">
                      By signing in, you agree to our <span className="text-cyan-300/60">Terms of Service</span> and <span className="text-purple-300/60">Privacy Policy</span>.
                      Your data is encrypted and secure.
                    </p>
                  </div>
                </div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              </div>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/60 rounded-full animate-ping delay-1000"></div>
              <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-pink-400/60 rounded-full animate-ping delay-2000"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
