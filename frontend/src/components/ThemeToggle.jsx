'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-muted/50 animate-pulse" />;
  }

  const getNextTheme = () => {
    if (theme === 'system') return 'light';
    if (theme === 'light') return 'dark';
    return 'system';
  };

  const getIcon = () => {
    if (theme === 'system') return <FiMonitor size={18} />;
    if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
      return <FiSun size={18} />;
    }
    return <FiMoon size={18} />;
  };

  const getLabel = () => {
    if (theme === 'system') return 'System theme';
    if (theme === 'dark') return 'Dark mode';
    return 'Light mode';
  };

  return (
    <button
      onClick={() => setTheme(getNextTheme())}
      className="relative p-2 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      aria-label={getLabel()}
      title={getLabel()}
    >
      <div className="transition-transform duration-200 hover:rotate-12">
        {getIcon()}
      </div>
    </button>
  );
};
