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
  SparklesIcon,
  Compass01Icon,
  Comment01Icon,
  Clock01Icon,
  Wallet01Icon,
  PlusSignCircleIcon,
  VolumeHighIcon,
  VolumeMute01Icon,
  ShieldCheckIcon,
  StarIcon,
} from '@hugeicons/core-free-icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function NavigationSidebar() {
  const {
    user,
    activeTab,
    setActiveTab,
    wallet,
    chats,
    setIsHireModalOpen,
    setIsAccountModalOpen,
    soundEnabled,
    toggleSound,
  } = useMarketplace();

  const totalUnreadChats = chats.reduce(
    (acc, c) => acc + (c.unreadCount || 0),
    0
  );

  const handleNav = (tab: 'home' | 'map' | 'chat' | 'recent' | 'wallet') => {
    sounds.playTap();
    setActiveTab(tab);
  };

  const navItems = [
    {
      id: 'home' as const,
      label: 'Opportunities',
      icon: SparklesIcon,
      badge: null,
    },
    {
      id: 'map' as const,
      label: 'Radar map',
      icon: Compass01Icon,
      badge: 'Live',
    },
    {
      id: 'chat' as const,
      label: 'Direct chat',
      icon: Comment01Icon,
      badge: totalUnreadChats > 0 ? totalUnreadChats.toString() : null,
      badgeColor: 'bg-black text-white',
    },
    {
      id: 'recent' as const,
      label: 'Shift history',
      icon: Clock01Icon,
      badge: null,
    },
    {
      id: 'wallet' as const,
      label: 'Digital wallet',
      icon: Wallet01Icon,
      badge: formatCurrency(wallet.balance),
      badgeColor: 'bg-[#efefef] text-black',
    },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between bg-white dark:bg-[#121212] border-r border-[#efefef] dark:border-[#282828] p-4 select-none shrink-0 font-sans text-black dark:text-white transition-colors duration-200">
      {/* Top: Brand & User Profile */}
      <div className="flex flex-col gap-5">
        {/* Brand */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium flex items-center justify-center text-sm shadow-sm transition-colors duration-200">
              P
            </div>
            <div>
              <span className="font-sans font-bold tracking-tight text-sm text-black dark:text-white block leading-none">
                Part-Time
              </span>
              <span className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-normal tracking-wide mt-0.5 block">
                Hyper-local shifts
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
            <span className="text-[10px] font-mono text-[#5e5e5e] dark:text-[#afafaf] font-medium">
              Live
            </span>
          </div>
        </div>

        {/* User Card */}
        <Button
          variant="ghost"
          onClick={() => {
            sounds.playTap();
            setIsAccountModalOpen(true);
          }}
          className="w-full p-3 h-auto rounded-2xl bg-[#efefef] dark:bg-[#1a1a1a] hover:bg-[#e2e2e2] dark:hover:bg-[#242424] border-0 transition-transform duration-150 ease-out active:scale-[0.98] flex items-center gap-3 text-left group justify-start"
        >
          <div className="relative shrink-0">
            <Avatar className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10">
              <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
              <AvatarFallback className="bg-white dark:bg-[#242424] text-black dark:text-white text-xs font-medium">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white border-2 border-white dark:border-[#1a1a1a] absolute -bottom-0.5 -right-0.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-xs font-medium text-black dark:text-white truncate">
              <span>{user.name}</span>
              <HugeiconsIcon icon={ShieldCheckIcon} className="w-3.5 h-3.5 text-black dark:text-white shrink-0" />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#5e5e5e] dark:text-[#afafaf] mt-0.5 font-normal">
              <span className="flex items-center text-black dark:text-white font-medium">
                <HugeiconsIcon icon={StarIcon} className="w-3 h-3 fill-black dark:fill-white text-black dark:text-white inline mr-0.5" />
                {user.rating}
              </span>
              <span>•</span>
              <span className="capitalize">{user.userType}</span>
            </div>
          </div>
        </Button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <Button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 h-auto rounded-full text-xs font-medium border-0 transition-transform duration-150 ease-out active:scale-[0.98] ${
                  isActive
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm hover:bg-black/90 dark:hover:bg-white/90'
                    : 'text-[#5e5e5e] dark:text-[#afafaf] hover:text-black dark:hover:text-white bg-transparent hover:bg-[#efefef] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={item.icon}
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-white dark:text-black'
                        : 'text-[#5e5e5e] dark:text-[#afafaf]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <Badge
                    className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border-0 ${
                      isActive
                        ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black'
                        : 'bg-[#efefef] dark:bg-[#282828] text-black dark:text-white'
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions: +HIRE, Sound Toggle, and Theme Toggle */}
      <div className="flex flex-col gap-3 pt-4 border-t border-[#efefef] dark:border-[#282828]">
        <Button
          onClick={() => {
            sounds.playTap();
            setIsHireModalOpen(true);
          }}
          className="w-full flex items-center justify-center gap-2 py-3 h-auto rounded-full bg-black dark:bg-white hover:bg-[#282828] dark:hover:bg-[#efefef] text-white dark:text-black font-medium text-xs transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} className="w-4 h-4 text-white dark:text-black stroke-[2.5]" />
          <span>+ Hire workers</span>
        </Button>

        <div className="flex items-center justify-between px-2 text-xs text-[#5e5e5e] dark:text-[#afafaf]">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            aria-label={`Sound ${soundEnabled ? 'on' : 'off'}`}
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors h-auto p-1 font-normal"
          >
            {soundEnabled ? (
              <HugeiconsIcon icon={VolumeHighIcon} className="w-3.5 h-3.5 text-black dark:text-white" />
            ) : (
              <HugeiconsIcon icon={VolumeMute01Icon} className="w-3.5 h-3.5 text-[#afafaf] dark:text-[#5e5e5e]" />
            )}
            <span className="text-[11px] font-mono">
              Sound {soundEnabled ? 'on' : 'off'}
            </span>
          </Button>

          {/* Theme appearance toggle in Sidebar */}
          <ThemeToggle variant="compact" />
        </div>

        <div className="flex items-center justify-between px-2 text-[10px] font-mono text-[#afafaf] dark:text-[#5e5e5e]">
          <span>Bangalore</span>
          <span>Live shifts</span>
        </div>
      </div>
    </aside>
  );
}
