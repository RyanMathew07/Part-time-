'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Wallet01Icon,
  ArrowUpRight01Icon,
  ShieldCheckIcon,
  CreditCardIcon,
  Building01Icon,
} from '@hugeicons/core-free-icons';

export function WalletCard() {
  const { wallet, user, setIsCashoutModalOpen } = useMarketplace();

  const handleOpenCashout = () => {
    sounds.playTap();
    setIsCashoutModalOpen(true);
  };

  return (
    <Card className="relative w-full rounded-2xl p-6 bg-black text-white dark:bg-[#121212] dark:border-[#282828] border border-black/15 shadow-sm overflow-hidden group">
      {/* Card Header: Brand & KYC Badge */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
            <HugeiconsIcon icon={Wallet01Icon} className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium tracking-wide text-[#afafaf]">
            Digital wallet
          </span>
        </div>

        <Badge className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border-0 text-xs font-medium">
          <HugeiconsIcon icon={ShieldCheckIcon} className="w-3.5 h-3.5 text-white" />
          <span>KYC verified ≥ 18</span>
        </Badge>
      </div>

      {/* Available Balance Display */}
      <div className="relative mb-6">
        <span className="text-xs text-[#afafaf] font-normal tracking-wide block mb-1">
          Available earnings
        </span>
        <div className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight flex items-baseline gap-1.5">
          <span>{formatCurrency(wallet.balance)}</span>
          <span className="text-xs font-mono font-normal text-[#afafaf]">
            INR
          </span>
        </div>
      </div>

      {/* Account Details & Withdraw Button */}
      <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <div className="text-xs font-medium text-white tracking-wide">
            {user.name}
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-[#afafaf]">
            <span className="flex items-center gap-1 font-normal">
              <HugeiconsIcon icon={CreditCardIcon} className="w-3 h-3 text-[#afafaf]" />
              {wallet.upiId}
            </span>
            <span className="flex items-center gap-1 font-normal">
              <HugeiconsIcon icon={Building01Icon} className="w-3 h-3 text-[#afafaf]" />
              {wallet.linkedBank}
            </span>
          </div>
        </div>

        <Button
          onClick={handleOpenCashout}
          className="flex items-center justify-center gap-2 px-6 py-3 h-auto rounded-full bg-white text-black hover:bg-[#efefef] font-medium text-xs tracking-wide transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] shrink-0 border-0"
        >
          <span>Instant UPI cashout</span>
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
