'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Key01Icon, Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';

export function OtpBanner() {
  const { user, showToast } = useMarketplace();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    sounds.playTap();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(user.activeOtp || '6767');
    }
    setCopied(true);
    showToast(`Universal PIN ${user.activeOtp || '6767'} copied to clipboard!`, 'pin');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828] rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4 shadow-sm text-black dark:text-white font-sans">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#efefef] dark:bg-[#1a1a1a] flex items-center justify-center text-black dark:text-white shrink-0">
          <HugeiconsIcon icon={Key01Icon} className="w-5 h-5 text-black dark:text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium tracking-wide text-[#5e5e5e] dark:text-[#afafaf]">
              Universal attendance PIN
            </span>
            <Badge className="px-2 py-0.5 rounded-full bg-[#efefef] text-[10px] font-mono font-medium text-black dark:bg-[#1a1a1a] dark:text-white border-0">
              Active
            </Badge>
          </div>
          <p className="text-xs text-[#5e5e5e] dark:text-[#afafaf] mt-0.5 font-normal">
            Share code with on-ground supervisor to check in
          </p>
        </div>
      </div>

      <Button
        onClick={handleCopy}
        aria-label="Copy attendance PIN"
        className="flex items-center gap-2 px-4 py-2 min-h-[44px] h-auto rounded-full bg-black hover:bg-[#282828] text-white dark:bg-white dark:hover:bg-[#e2e2e2] dark:text-black font-mono font-medium text-sm transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] shrink-0 border-0"
      >
        <span className="tracking-wider">{user.activeOtp || '6767'}</span>
        {copied ? (
          <HugeiconsIcon icon={Tick02Icon} className="w-3.5 h-3.5 text-white dark:text-black stroke-[3]" />
        ) : (
          <HugeiconsIcon icon={Copy01Icon} className="w-3.5 h-3.5 text-white dark:text-black stroke-[2.5]" />
        )}
      </Button>
    </Card>
  );
}
