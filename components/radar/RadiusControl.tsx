'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Target01Icon } from '@hugeicons/core-free-icons';

const RADIUS_OPTIONS = [1, 5, 10, 25];

export function RadiusControl() {
  const { radarRadiusKm, setRadarRadiusKm, showToast } = useMarketplace();

  const handleSelect = (radius: number) => {
    sounds.playTap();
    setRadarRadiusKm(radius);
    showToast(`Radar radius set to ${radius} km`, 'radar');
  };

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#efefef] dark:bg-[#1a1a1a] rounded-full border border-transparent dark:border-[#282828]">
      <div className="flex items-center gap-1.5 text-xs text-[#5e5e5e] dark:text-[#afafaf] font-medium shrink-0 pl-1">
        <HugeiconsIcon icon={Target01Icon} className="w-3.5 h-3.5 text-black dark:text-white animate-spin" style={{ animationDuration: '6s' }} />
        <span>Radius:</span>
      </div>

      <div className="flex items-center gap-1">
        {RADIUS_OPTIONS.map((radius) => {
          const isSelected = radarRadiusKm === radius;
          return (
            <Button
              key={radius}
              onClick={() => handleSelect(radius)}
              className={`px-3 py-1 h-auto rounded-full text-xs font-mono transition-transform duration-150 ease-out active:scale-[0.98] border-0 ${
                isSelected
                  ? 'bg-black text-white font-medium shadow-sm dark:bg-white dark:text-black'
                  : 'text-[#5e5e5e] hover:text-black hover:bg-[#e2e2e2] bg-transparent dark:text-[#afafaf] dark:hover:text-white dark:hover:bg-[#242424]'
              }`}
            >
              {radius}km
            </Button>
          );
        })}
      </div>
    </div>
  );
}
