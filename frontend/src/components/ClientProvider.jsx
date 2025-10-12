'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

export default function ClientProvider({ children, session }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session}>
        {children}
        <Toaster position="bottom-right" toastOptions={{
            className: '!bg-card !text-foreground !border !border-muted',
          }}
        />
      </SessionProvider>
    </ThemeProvider>
  );
}
