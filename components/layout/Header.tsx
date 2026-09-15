'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignCircleIcon,
  Key01Icon,
} from '@hugeicons/core-free-icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  const {
    user,
    wallet,
    activeShift,
    setIsHireModalOpen,
    setIsAccountModalOpen,
    setIsCashoutModalOpen,
    showToast,
  } = useMarketplace();

  const handleDynamicIslandClick = () => {
    sounds.playTap();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('6767');
    }
    showToast('PIN 6767 copied to clipboard!', 'pin');
  };

  return (
    <header className="w-full bg-white/95 dark:bg-[#121212]/95 border-b border-[#efefef] dark:border-[#282828] px-3 sm:px-4 py-2.5 sticky top-0 z-30 flex items-center justify-between gap-1.5 sm:gap-2.5 text-black dark:text-white backdrop-blur-xl transition-colors duration-200">
      {/* Brand & Dynamic Island indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold flex items-center justify-center text-xs shadow-sm transition-colors duration-200 shrink-0">
            P
          </div>
          <span className="font-sans font-semibold tracking-tight text-xs text-black dark:text-white hidden lg:inline">
            Part-Time
          </span>
        </div>

        {/* Dynamic Island Shift Indicator (Compact on mobile, expanded on tablet/desktop) */}
        {activeShift && (
          <Button
            onClick={handleDynamicIslandClick}
            aria-label="Copy attendance PIN"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 min-h-[36px] sm:min-h-[40px] h-auto rounded-full bg-[#efefef] dark:bg-[#1a1a1a] hover:bg-[#e2e2e2] dark:hover:bg-[#282828] border-0 text-[11px] sm:text-xs text-black dark:text-white transition-transform duration-150 ease-out active:scale-[0.98] shadow-sm group shrink-0"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                activeShift.isCheckedIn
                  ? 'bg-black dark:bg-white'
                  : 'bg-[#5e5e5e] dark:bg-[#afafaf]'
              }`}
            />
            <span className="font-medium text-black dark:text-white truncate max-w-[90px] md:max-w-[180px] hidden md:inline">
              {activeShift.title}
            </span>
            <span className="text-[#afafaf] dark:text-[#5e5e5e] hidden md:inline">•</span>
            <div className="flex items-center gap-1 text-black dark:text-white font-mono font-medium">
              <HugeiconsIcon icon={Key01Icon} className="w-3 h-3 text-[#5e5e5e] dark:text-[#afafaf] shrink-0" />
              <span>PIN 6767</span>
            </div>
          </Button>
        )}
      </div>

      {/* Right Controls: Wallet, Theme Toggle, +HIRE & Profile (Mobile only where sidebar is not present) */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Wallet Balance Chip */}
        <Button
          onClick={() => {
            sounds.playTap();
            setIsCashoutModalOpen(true);
          }}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1 min-h-[36px] sm:min-h-[40px] h-auto rounded-full bg-[#efefef] dark:bg-[#1a1a1a] hover:bg-[#e2e2e2] dark:hover:bg-[#282828] border-0 transition-transform duration-150 ease-out active:scale-[0.98] text-[11px] sm:text-xs font-mono font-medium text-black dark:text-white shadow-sm shrink-0"
        >
          <span className="text-[#5e5e5e] dark:text-[#afafaf] font-normal hidden sm:inline">Bal:</span>
          <span className="text-black dark:text-white font-medium">{formatCurrency(wallet.balance)}</span>
        </Button>

        {/* Dark Mode Toggle (Desktop & Mobile accessible) */}
        <ThemeToggle variant="icon" className="min-w-[36px] min-h-[36px] w-9 h-9 sm:w-10 sm:h-10 shrink-0" />

        {/* +HIRE button (Visible on mobile; on desktop this is present in the navigation sidebar) */}
        <Button
          onClick={() => {
            sounds.playTap();
            setIsHireModalOpen(true);
          }}
          className="flex md:hidden items-center gap-1 px-2.5 sm:px-3 py-1 min-h-[36px] sm:min-h-[40px] h-auto rounded-full bg-black dark:bg-white hover:bg-[#282828] dark:hover:bg-[#efefef] text-white dark:text-black font-medium text-[11px] sm:text-xs transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0 shrink-0"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} className="w-3.5 h-3.5 text-white dark:text-black stroke-[2.5]" />
          <span>+ Hire</span>
        </Button>

        {/* Profile Avatar (Visible on mobile; on desktop this is present in the navigation sidebar user card) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            sounds.playTap();
            setIsAccountModalOpen(true);
          }}
          className="flex md:hidden relative min-w-[36px] min-h-[36px] w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-full overflow-hidden border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-transform duration-150 ease-out active:scale-[0.98] shrink-0 bg-transparent p-0"
        >
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-transparent">
            <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback className="bg-[#efefef] dark:bg-[#1a1a1a] text-black dark:text-white text-[10px] font-medium">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
