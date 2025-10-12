'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground">Welcome to Modern Notes</h1>
        <p className="text-muted-foreground mt-2">Sign in to create and manage your notes</p>
      </div>
      <button
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        className="flex items-center gap-3 px-6 py-3 bg-card text-foreground font-semibold rounded-lg shadow-sm border border-muted hover:bg-muted transition-colors duration-300"
      >
        <FcGoogle size={24} />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}