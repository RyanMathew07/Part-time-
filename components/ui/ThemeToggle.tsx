'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sun01Icon, Moon01Icon } from '@hugeicons/core-free-icons';

interface ThemeToggleProps {
  variant?: 'icon' | 'full' | 'compact';
  className?: string;
}

export function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, showToast } = useMarketplace();
  const isDark = theme === 'dark';

  const handleToggle = () => {
    toggleTheme();
    showToast(
      isDark ? 'Light mode enabled' : 'Dark mode enabled (Uber black)',
      isDark ? 'sun' : 'moon'
    );
  };

  if (variant === 'full') {
    return (
      <div
        className={`flex items-center justify-between p-3 rounded-2xl bg-[#efefef] dark:bg-[#1a1a1a] border border-transparent transition-colors duration-200 select-none ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#242424] flex items-center justify-center text-black dark:text-white shadow-sm transition-colors duration-200">
            <div className="t-icon-swap" data-state={isDark ? 'dark' : 'light'}>
              <span className="t-icon" data-icon="dark">
                <HugeiconsIcon icon={Moon01Icon} className="w-4 h-4 text-white" />
              </span>
              <span className="t-icon" data-icon="light">
                <HugeiconsIcon icon={Sun01Icon} className="w-4 h-4 text-black" />
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-black dark:text-white leading-tight">
              Theme appearance
            </div>
            <div className="text-[11px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">
              {isDark ? 'Uber deep black (#000000)' : 'High contrast light'}
            </div>
          </div>
        </div>

        <Switch
          checked={isDark}
          onCheckedChange={handleToggle}
          aria-label="Toggle dark mode theme"
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors duration-150 active:scale-[0.98] text-[#5e5e5e] dark:text-[#afafaf] h-auto p-1 font-normal ${className}`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div className="t-icon-swap" data-state={isDark ? 'dark' : 'light'}>
            <span className="t-icon" data-icon="dark">
              <HugeiconsIcon icon={Sun01Icon} className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="t-icon" data-icon="light">
              <HugeiconsIcon icon={Moon01Icon} className="w-3.5 h-3.5 text-[#5e5e5e] hover:text-black" />
            </span>
          </div>
        </div>
        <span className="text-[11px] font-mono">
          {isDark ? 'Light' : 'Dark'}
        </span>
      </Button>
    );
  }

  // Default 'icon' variant (with Apple HIG min 44x44px touch target)
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center bg-[#efefef] dark:bg-[#1a1a1a] hover:bg-[#e2e2e2] dark:hover:bg-[#282828] text-black dark:text-white border-0 transition-transform duration-150 ease-out active:scale-[0.98] shadow-sm ${className}`}
    >
      <div className="t-icon-swap w-5 h-5 flex items-center justify-center" data-state={isDark ? 'dark' : 'light'}>
        <span className="t-icon flex items-center justify-center" data-icon="dark">
          <HugeiconsIcon icon={Sun01Icon} className="w-4 h-4 text-white" />
        </span>
        <span className="t-icon flex items-center justify-center" data-icon="light">
          <HugeiconsIcon icon={Moon01Icon} className="w-4 h-4 text-black" />
        </span>
      </div>
    </Button>
  );
}
