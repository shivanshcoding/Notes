'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogOut, FiEdit3 } from 'react-icons/fi';
import { ThemeToggle } from './ThemeToggle';
import ConfirmationModal from './ConfirmationModal';

export default function Navbar() {
  const { data: session } = useSession();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <nav className="sticky top-0 z-50 animate-slide-in-down">
      <div className="bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
            >
              <div className="p-2 bg-brand/10 rounded-xl group-hover:bg-brand/20 transition-colors duration-200">
                <FiEdit3 size={20} className="text-brand" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground group-hover:text-brand transition-colors duration-200">
                  Modern Notes
                </h1>
                <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Your digital workspace
                </p>
              </div>
            </Link>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {session?.user && (
                <div className="flex items-center gap-3">
                  {/* User info */}
                  <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-xl">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User Avatar'}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-border shadow-sm"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-foreground truncate max-w-24">
                        {session.user.name?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-24">
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  {/* Mobile avatar only */}
                  <div className="sm:hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User Avatar'}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-border shadow-sm"
                    />
                  </div>
                  
                  {/* Sign out button */}
                  <button 
                    onClick={() => setShowLogoutConfirm(true)} 
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 transform hover:scale-110"
                    title="Sign out"
                  >
                    <FiLogOut size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => signOut({ callbackUrl: '/login' })}
        title="Sign Out? 👋"
        message={`Hey ${session?.user?.name?.split(' ')[0] || 'there'}! Are you sure you want to sign out? You'll need to sign in again to access your notes.`}
        type="warning"
        confirmText="🚪 Sign Out"
        cancelText="❌ Stay Signed In"
      />
    </nav>
  );
}
