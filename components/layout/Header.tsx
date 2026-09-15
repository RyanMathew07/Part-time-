'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShieldCheckIcon,
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
    <header className="w-full bg-white/95 dark:bg-[#121212]/95 border-b border-[#efefef] dark:border-[#282828] px-4 py-3 sticky top-0 z-30 flex items-center justify-between gap-3 text-black dark:text-white backdrop-blur-xl transition-colors duration-200">
      {/* Brand & Dynamic Island indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium flex items-center justify-center text-sm shadow-sm transition-colors duration-200">
            P
          </div>
          <span className="font-sans font-medium tracking-tight text-sm text-black dark:text-white md:hidden">
            Part-Time
          </span>
        </div>

        {/* Dynamic Island Shift Indicator */}
        {activeShift && (
          <Button
            onClick={handleDynamicIslandClick}
            aria-label="Copy attendance PIN"
            className="flex items-center gap-2 px-3.5 py-1.5 min-h-[44px] h-auto rounded-full bg-[#efefef] dark:bg-[#1a1a1a] hover:bg-[#e2e2e2] dark:hover:bg-[#282828] border-0 text-xs text-black dark:text-white transition-transform duration-150 ease-out active:scale-[0.98] shadow-sm group"
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  activeShift.isCheckedIn
                    ? 'bg-black dark:bg-white'
                    : 'bg-[#5e5e5e] dark:bg-[#afafaf]'
                }`}
              />
              <span className="font-medium text-black dark:text-white truncate max-w-[130px] md:max-w-[200px]">
                {activeShift.title}
              </span>
            </div>
            <span className="text-[#afafaf] dark:text-[#5e5e5e]">•</span>
            <div className="flex items-center gap-1 text-black dark:text-white font-mono font-medium">
              <HugeiconsIcon icon={Key01Icon} className="w-3 h-3 text-[#5e5e5e] dark:text-[#afafaf]" />
              <span>PIN 6767</span>
            </div>
          </Button>
        )}
      </div>

      {/* Right Controls: KYC telemetry badge, Wallet, Theme Toggle, +HIRE & Profile */}
      <div className="flex items-center gap-2 md:gap-2.5">
        {/* KYC Badge (Desktop) */}
        <Badge className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efefef] dark:bg-[#1a1a1a] text-black dark:text-white border-0 text-xs font-medium">
          <HugeiconsIcon icon={ShieldCheckIcon} className="w-3.5 h-3.5 text-black dark:text-white" />
          <span>KYC verified ≥ 18</span>
        </Badge>

        {/* Wallet Balance Chip */}
        <Button
          onClick={() => {
            sounds.playTap();
            setIsCashoutModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 min-h-[44px] h-auto rounded-full bg-[#efefef] dark:bg-[#1a1a1a] hover:bg-[#e2e2e2] dark:hover:bg-[#282828] border-0 transition-transform duration-150 ease-out active:scale-[0.98] text-xs font-mono font-medium text-black dark:text-white shadow-sm"
        >
          <span className="text-[#5e5e5e] dark:text-[#afafaf] font-normal">Bal:</span>
          <span className="text-black dark:text-white font-medium">{formatCurrency(wallet.balance)}</span>
        </Button>

        {/* Dark Mode Toggle (Desktop & Mobile accessible) */}
        <ThemeToggle variant="icon" />

        {/* +HIRE button */}
        <Button
          onClick={() => {
            sounds.playTap();
            setIsHireModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 min-h-[44px] h-auto rounded-full bg-black dark:bg-white hover:bg-[#282828] dark:hover:bg-[#efefef] text-white dark:text-black font-medium text-xs transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} className="w-3.5 h-3.5 text-white dark:text-black stroke-[2.5]" />
          <span>+ Hire</span>
        </Button>

        {/* Profile Avatar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            sounds.playTap();
            setIsAccountModalOpen(true);
          }}
          className="relative min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full overflow-hidden border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-transform duration-150 ease-out active:scale-[0.98] shrink-0 bg-transparent p-0"
        >
          <Avatar className="w-8 h-8 rounded-full border border-transparent">
            <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback className="bg-[#efefef] dark:bg-[#1a1a1a] text-black dark:text-white text-xs font-medium">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
