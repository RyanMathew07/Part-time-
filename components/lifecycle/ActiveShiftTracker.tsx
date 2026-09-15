'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Clock01Icon,
  ShieldCheckIcon,
  CheckmarkCircle02Icon,
} from '@hugeicons/core-free-icons';

export function ActiveShiftTracker() {
  const { activeShift, verifyCheckIn, completeShift } = useMarketplace();
  const [pinInput, setPinInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!activeShift) return null;

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyCheckIn(pinInput);
    if (success) {
      setPinInput('');
      setIsVerifying(false);
    }
  };

  const handleQuickVerify = () => {
    sounds.playTap();
    verifyCheckIn('6767');
  };

  const handleComplete = () => {
    sounds.playTap();
    completeShift(activeShift.jobId, activeShift.wage);
  };

  return (
    <Card className="w-full bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828] rounded-2xl p-4 shadow-sm flex flex-col gap-3 text-black dark:text-white font-sans">
      {/* Top row: Status, Title & Employer */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              activeShift.isCheckedIn
                ? 'bg-black dark:bg-white animate-pulse'
                : 'bg-[#5e5e5e] dark:bg-[#afafaf]'
            }`}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-black dark:text-white leading-tight">
                {activeShift.title}
              </span>
              <Badge
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border-0 ${
                  activeShift.isCheckedIn
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-[#efefef] text-[#5e5e5e] dark:bg-[#1a1a1a] dark:text-[#afafaf]'
                }`}
              >
                {activeShift.isCheckedIn ? 'Checked in • On-site' : 'Scheduled'}
              </Badge>
            </div>
            <div className="text-[11px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">
              {activeShift.employer} • {formatCurrency(activeShift.wage)}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-medium text-black dark:text-white">
            {formatCurrency(activeShift.wage)}
          </span>
        </div>
      </div>

      {/* Dynamic Status / Actions */}
      {!activeShift.isCheckedIn ? (
        <div className="p-3.5 bg-[#f3f3f3] border border-[#efefef] dark:bg-[#1a1a1a] dark:border-[#282828] rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-[#5e5e5e] dark:text-[#afafaf] font-normal">
            <span className="flex items-center gap-1.5">
              <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5 text-black dark:text-white" />
              Starts in ~{activeShift.countdownMinutes || 35} mins
            </span>
            <span className="font-mono font-medium text-black dark:text-white">PIN: 6767</span>
          </div>

          {isVerifying ? (
            <form onSubmit={handleCheckInSubmit} className="flex items-center gap-2">
              <Input
                type="text"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN 6767"
                maxLength={4}
                className="flex-1 px-4 py-2 h-auto bg-white text-black font-mono font-medium text-sm rounded-full border border-[#efefef] focus:outline-none focus:border-black dark:bg-[#121212] dark:text-white dark:border-[#282828] dark:focus:border-white transition-colors"
              />
              <Button
                type="submit"
                className="px-4 py-2 h-auto bg-black hover:bg-[#282828] text-white dark:bg-white dark:hover:bg-[#e2e2e2] dark:text-black text-xs font-medium rounded-full transition-transform duration-150 ease-out active:scale-[0.98] border-0"
              >
                Verify
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsVerifying(false)}
                className="px-3 py-2 h-auto text-[#5e5e5e] hover:text-black dark:text-[#afafaf] dark:hover:text-white text-xs font-medium border-0"
              >
                Cancel
              </Button>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleQuickVerify}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 h-auto bg-black hover:bg-[#282828] text-white dark:bg-white dark:hover:bg-[#e2e2e2] dark:text-black text-xs font-medium rounded-full transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
              >
                <HugeiconsIcon icon={ShieldCheckIcon} className="w-3.5 h-3.5" />
                <span>Quick verify (PIN 6767)</span>
              </Button>
              <Button
                onClick={() => setIsVerifying(true)}
                className="px-4 py-2 h-auto bg-[#efefef] hover:bg-[#e2e2e2] text-black dark:bg-[#242424] dark:hover:bg-[#2e2e2e] dark:text-white text-xs font-medium rounded-full transition-transform duration-150 ease-out active:scale-[0.98] border-0"
              >
                Manual PIN
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3.5 bg-[#f3f3f3] border border-[#efefef] dark:bg-[#1a1a1a] dark:border-[#282828] rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-black dark:text-white font-normal">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-black dark:text-white shrink-0" />
            <span>
              Shift checked in at <strong>{activeShift.startedAt || '4:02 PM'}</strong>. Attendance verified.
            </span>
          </div>

          <Button
            onClick={handleComplete}
            className="px-4 py-2 h-auto bg-black hover:bg-[#282828] text-white dark:bg-white dark:hover:bg-[#e2e2e2] dark:text-black text-xs font-medium rounded-full transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] shrink-0 border-0"
          >
            Complete shift
          </Button>
        </div>
      )}
    </Card>
  );
}
