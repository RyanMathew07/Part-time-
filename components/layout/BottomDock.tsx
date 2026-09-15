'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { Button } from '@/components/ui/button';

export function BottomDock() {
  const { activeTab, setActiveTab, chats } = useMarketplace();

  const totalUnreadChats = chats.reduce(
    (acc, c) => acc + (c.unreadCount || 0),
    0
  );

  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'map' as const,
      label: 'Map',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
          <path d="M15 5.764v15" />
          <path d="M9 3.236v15" />
        </svg>
      ),
    },
    {
      id: 'chat' as const,
      label: 'Chat',
      unread: totalUnreadChats,
      hasDotBadge: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      ),
    },
    {
      id: 'recent' as const,
      label: 'Recent',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'wallet' as const,
      label: 'Wallet',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      ),
    },
  ];

  const handleTabClick = (tabId: 'home' | 'map' | 'chat' | 'recent' | 'wallet') => {
    sounds.playTap();
    setActiveTab(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none flex justify-center pb-[env(safe-area-inset-bottom)] px-3 mb-4 transition-all duration-200 /* bg-[#090b12]/95 backdrop-blur-xl */">
      {/* Floating Apple Liquid Glass Pill Container */}
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="pointer-events-auto relative flex items-center justify-between p-1 rounded-[34px] bg-white/[0.06] backdrop-blur-[24px] saturate-[180%] border border-white/[0.14] shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.3)] max-w-[364px] w-full select-none"
      >
        {/* Subtle 1px gradient sheen line near top inner edge */}
        <div className="absolute top-[1px] inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none rounded-full" />

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <Button
              variant="ghost"
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              aria-label={tab.label}
              className={`relative min-w-[56px] w-[58px] min-h-[44px] h-12 py-1 flex flex-col items-center justify-center gap-0.5 rounded-[26px] border-0 bg-transparent hover:bg-transparent transition-transform duration-150 ease-out active:scale-90 select-none cursor-pointer ${
                isActive
                  ? 'text-black font-semibold'
                  : 'text-white/50 hover:text-white/80 font-normal'
              }`}
            >
              {/* Active sliding capsule indicator */}
              {isActive && (
                <div className="absolute inset-0 rounded-[26px] bg-gradient-to-b from-white to-[#f0f0f2] shadow-[0_0_16px_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.12)] transition-all duration-200" />
              )}

              {/* Icon & Optional Red Dot Badge */}
              <div className="relative z-10 flex items-center justify-center">
                <div
                  className={`transition-all duration-200 ${
                    isActive ? 'text-black scale-105 stroke-[2]' : 'text-white/50'
                  }`}
                >
                  {tab.icon}
                </div>
                {tab.hasDotBadge && !isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_6px_rgba(239,68,68,0.9)] pointer-events-none" />
                )}
              </div>

              {/* Label */}
              <span
                className={`relative z-10 text-[10px] tracking-tight leading-none mt-0.5 ${
                  isActive ? 'text-black font-semibold' : 'text-white/50 font-normal'
                }`}
              >
                {tab.label}
              </span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
