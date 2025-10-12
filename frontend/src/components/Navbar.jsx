'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-muted sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="text-xl font-bold text-foreground">
            Modern Notes
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session?.user && (
              <>
                <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign Out
                </button>
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User Avatar'}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-muted"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}