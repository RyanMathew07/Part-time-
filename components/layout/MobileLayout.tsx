'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Header } from './Header';
import { BottomDock } from './BottomDock';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/discovery/SearchBar';
import { CategoryPills } from '@/components/discovery/CategoryPills';
import { WageTierFilter } from '@/components/discovery/WageTierFilter';
import { ShiftFeed } from '@/components/discovery/ShiftFeed';
import { RadarCanvas } from '@/components/radar/RadarCanvas';
import { RadiusControl } from '@/components/radar/RadiusControl';
import { ShiftInspector } from '@/components/radar/ShiftInspector';
import { OtpBanner } from '@/components/lifecycle/OtpBanner';
import { ActiveShiftTracker } from '@/components/lifecycle/ActiveShiftTracker';
import { ChatView } from '@/components/chat/ChatView';
import { WalletCard } from '@/components/wallet/WalletCard';
import { TransactionHistory } from '@/components/wallet/TransactionHistory';
import { PostShiftModal } from '@/components/employer/PostShiftModal';
import { ApplyModal } from '@/components/lifecycle/ApplyModal';
import { CashoutModal } from '@/components/wallet/CashoutModal';
import { AccountModal } from './AccountModal';
import { ToastContainer } from './ToastContainer';

export function MobileLayout() {
  const { activeTab, selectedJob, setSelectedJob, recentActivities } =
    useMarketplace();

  return (
    <div className="w-full min-h-[100dvh] bg-white dark:bg-[#000000] text-black dark:text-white flex flex-col font-sans relative pb-36 overflow-x-hidden border-white/[0.08] /* bg-black */ transition-colors duration-200">
      {/* Mobile Top Header */}
      <Header />

      {/* Main Tab Views */}
      <main className="flex-1 p-4 flex flex-col gap-4">
        {activeTab === 'home' && (
          <>
            {/* 1. Search & Filters on top */}
            <Card className="flex flex-col gap-2.5 p-3.5 bg-white dark:bg-[#121212] border border-[#efefef] dark:border-[#282828] rounded-2xl transition-colors duration-200">
              <SearchBar />
              <CategoryPills />
              <WageTierFilter />
            </Card>

            {/* 2. Universal OTP 6767 Attendance Banner */}
            <OtpBanner />

            {/* 3. Active Shift Tracker */}
            <ActiveShiftTracker />

            {/* 4. Opportunities Feed */}
            <ShiftFeed />
          </>
        )}

        {activeTab === 'map' && (
          <div className="flex flex-col gap-3 flex-1 min-h-[500px]">
            <RadiusControl />
            <div className="flex-1 h-[420px] relative">
              <RadarCanvas />
            </div>
            {selectedJob && (
              <div className="fixed inset-x-0 bottom-16 z-50 p-2">
                <ShiftInspector
                  isMobileDrawer
                  onClose={() => setSelectedJob(null)}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && <ChatView />}

        {activeTab === 'recent' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#efefef] dark:border-[#282828]">
              <h3 className="text-sm font-bold tracking-tight text-black dark:text-white leading-tight">
                Recent audit trail
              </h3>
              <span className="text-[11px] font-mono text-[#5e5e5e] dark:text-[#afafaf]">
                {recentActivities.length} events
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {recentActivities.map((act) => (
                <Card
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#efefef] dark:border-[#282828] flex items-center justify-between gap-3 transition-colors duration-200"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-black dark:text-white truncate leading-tight">
                      {act.title}
                    </h4>
                    <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] mt-0.5 font-mono truncate">
                      {act.type} • PIN: {act.pinUsed} • {act.date}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-medium text-black dark:text-white">
                      {act.wage}
                    </div>
                    <Badge
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium mt-0.5 ${
                        act.statusColor === 'emerald'
                          ? 'bg-[#efefef] dark:bg-[#282828] text-black dark:text-white border border-transparent'
                          : act.statusColor === 'cyan'
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'bg-[#efefef] dark:bg-[#282828] text-[#5e5e5e] dark:text-[#afafaf]'
                      }`}
                    >
                      {act.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="flex flex-col gap-4">
            <WalletCard />
            <TransactionHistory />
          </div>
        )}
      </main>

      {/* Touch-first 5-tab Bottom Navigation Dock */}
      <BottomDock />

      {/* Global Modals */}
      <PostShiftModal />
      <ApplyModal />
      <CashoutModal />
      <AccountModal />
      <ToastContainer />
    </div>
  );
}
