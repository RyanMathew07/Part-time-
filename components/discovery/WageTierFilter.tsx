'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { WageTierType } from '@/types';
import { sounds } from '@/lib/soundEngine';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Coins01Icon } from '@hugeicons/core-free-icons';

interface WageTierItem {
  tier: WageTierType;
  label: string;
  sublabel: string;
}

const WAGE_TIERS: WageTierItem[] = [
  { tier: 100, label: '₹100', sublabel: 'Micro' },
  { tier: 500, label: '₹500', sublabel: 'Half-day' },
  { tier: 1000, label: '₹1,000', sublabel: 'Standard' },
  { tier: 10000, label: '₹10,000', sublabel: 'Weekend' },
];

export function WageTierFilter() {
  const { selectedWageTier, setSelectedWageTier } = useMarketplace();

  const handleToggle = (tier: WageTierType) => {
    sounds.playTap();
    if (selectedWageTier === tier) {
      setSelectedWageTier(null);
    } else {
      setSelectedWageTier(tier);
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
      <div className="flex items-center gap-1.5 text-xs text-[#5e5e5e] dark:text-[#afafaf] pl-0.5 pr-1 shrink-0 font-medium">
        <HugeiconsIcon icon={Coins01Icon} className="w-3.5 h-3.5 text-black dark:text-white" />
        <span>Tier:</span>
      </div>
      {WAGE_TIERS.map((item) => {
        const isSelected = selectedWageTier === item.tier;

        return (
          <Button
            key={item.tier}
            onClick={() => handleToggle(item.tier)}
            className={`flex items-center gap-1.5 px-3 py-1.5 h-auto rounded-full text-xs font-mono font-medium transition-transform duration-150 ease-out active:scale-[0.98] border-0 ${
              isSelected
                ? 'bg-black text-white shadow-sm dark:bg-white dark:text-black'
                : 'bg-[#efefef] text-black hover:bg-[#e2e2e2] dark:bg-[#1a1a1a] dark:text-[#afafaf] dark:hover:bg-[#242424] dark:hover:text-white'
            }`}
          >
            <span className="font-medium">{item.label}</span>
            <span className={`text-[10px] font-sans ${isSelected ? 'text-[#afafaf] dark:text-[#5e5e5e]' : 'text-[#5e5e5e] dark:text-[#8a8a8a]'}`}>
              {item.sublabel}
            </span>
          </Button>
        );
      })}
      {selectedWageTier !== null && (
        <Button
          onClick={() => {
            sounds.playTap();
            setSelectedWageTier(null);
          }}
          className="text-xs text-[#5e5e5e] hover:text-black dark:text-[#afafaf] dark:hover:text-white px-2.5 py-1 h-auto rounded-full bg-[#efefef] hover:bg-[#e2e2e2] dark:bg-[#1a1a1a] dark:hover:bg-[#242424] ml-1 shrink-0 transition-transform duration-150 ease-out active:scale-[0.98] font-medium border-0"
        >
          Reset
        </Button>
      )}
    </div>
  );
}
