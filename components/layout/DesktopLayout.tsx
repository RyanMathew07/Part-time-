'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { NavigationSidebar } from './NavigationSidebar';
import { Header } from './Header';
import { HugeiconsIcon } from '@hugeicons/react';
import { Compass01Icon } from '@hugeicons/core-free-icons';
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

export function DesktopLayout() {
  const { activeTab, selectedJob, recentActivities } = useMarketplace();

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white flex overflow-x-hidden font-sans border-white/[0.08] /* bg-black */ transition-colors duration-200">
      {/* 1. Left Column: Persistent Navigation Sidebar */}
      <NavigationSidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 flex gap-6 overflow-y-auto max-w-[1700px] w-full mx-auto">
          {/* Central Column: Switchable based on activeTab */}
          <div className="flex flex-col gap-5 max-w-4xl w-full mx-auto">
            {activeTab === 'home' && (
              <>
                {/* 1. Search Bar & Filters on Top */}
                <Card className="flex flex-col gap-3.5 p-5 bg-white dark:bg-[#121212] border border-[#efefef] dark:border-[#282828] rounded-2xl transition-colors duration-200">
                  <SearchBar />
                  <CategoryPills />
                  <WageTierFilter />
                </Card>

                {/* 2. Attendance OTP Banner */}
                <OtpBanner />

                {/* 3. Active Shift Tracker */}
                <ActiveShiftTracker />

                {/* 4. Shifts Opportunity Feed */}
                <ShiftFeed />
              </>
            )}

            {activeTab === 'map' && (
              <div className="flex flex-col gap-4 h-[calc(100vh-140px)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-tight text-black dark:text-white leading-tight">
                    Live radar scanner and map pins
                  </h2>
                  <div className="w-64">
                    <RadiusControl />
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 h-full min-h-[500px]">
                    <RadarCanvas />
                  </div>
                  <div className="h-full overflow-y-auto">
                    {selectedJob ? (
                      <ShiftInspector />
                    ) : (
                      <Card className="h-full flex flex-col items-center justify-center p-6 bg-white dark:bg-[#121212] border border-[#efefef] dark:border-[#282828] rounded-2xl text-center text-[#5e5e5e] dark:text-[#afafaf] transition-colors duration-200">
                        <div className="w-10 h-10 rounded-full bg-[#efefef] dark:bg-[#1a1a1a] flex items-center justify-center text-black dark:text-white mb-2">
                          <HugeiconsIcon icon={Compass01Icon} className="w-5 h-5 stroke-[1.75]" />
                        </div>
                        <p className="text-sm font-medium text-black dark:text-white leading-tight">
                          Select a wage pin
                        </p>
                        <p className="text-xs text-[#5e5e5e] dark:text-[#afafaf] mt-1 max-w-xs font-normal">
                          Click any geo-tagged wage pin on the radar map to inspect shift details and apply.
                        </p>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && <ChatView />}

            {activeTab === 'recent' && (
              <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-[#efefef] dark:border-[#282828]">
                  <h2 className="text-base font-bold tracking-tight text-black dark:text-white leading-tight">
                    Audit trail and recent shifts
                  </h2>
                  <span className="text-xs font-mono text-[#5e5e5e] dark:text-[#afafaf]">
                    {recentActivities.length} records
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {recentActivities.map((act) => (
                    <Card
                      key={act.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#efefef] dark:border-[#282828] flex items-center justify-between gap-4 transition-colors duration-200"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-black dark:text-white leading-tight">
                          {act.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#5e5e5e] dark:text-[#afafaf] mt-1 font-mono">
                          <span>{act.type}</span>
                          <span>•</span>
                          <span>PIN used: {act.pinUsed}</span>
                          <span>•</span>
                          <span>{act.date}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-mono font-medium text-black dark:text-white">
                          {act.wage}
                        </div>
                        <Badge
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium mt-1 ${
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
              <div className="flex flex-col gap-6 max-w-4xl w-full mx-auto">
                <WalletCard />
                <TransactionHistory />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Global Command Modals */}
      <PostShiftModal />
      <ApplyModal />
      <CashoutModal />
      <AccountModal />
      <ToastContainer />
    </div>
  );
}
