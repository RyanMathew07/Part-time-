'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ShiftCard } from './ShiftCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchRemoveIcon, RotateLeft01Icon } from '@hugeicons/core-free-icons';
import { sounds } from '@/lib/soundEngine';

export function ShiftFeed() {
  const {
    jobs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedWageTier,
    setSelectedWageTier,
    radarRadiusKm,
  } = useMarketplace();

  const handleResetFilters = () => {
    sounds.playTap();
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedWageTier(null);
  };

  const isFiltering =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedWageTier !== null;

  return (
    <div className="flex flex-col gap-4 font-sans">
      {/* Count & Telemetry Header */}
      <div className="flex items-center justify-between text-xs text-[#5e5e5e] dark:text-[#afafaf] px-1">
        <div className="flex items-center gap-2 font-normal">
          <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
          <span>
            Showing <strong className="text-black dark:text-white font-mono">{jobs.length}</strong>{' '}
            {jobs.length === 1 ? 'shift' : 'shifts'} within{' '}
            <strong className="text-black dark:text-white font-mono">{radarRadiusKm} km</strong>
          </span>
        </div>
        {isFiltering && (
          <Button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 px-3 py-1 h-auto rounded-full bg-[#efefef] hover:bg-[#e2e2e2] text-black dark:bg-[#1a1a1a] dark:hover:bg-[#242424] dark:text-white text-xs font-medium transition-transform duration-150 ease-out active:scale-[0.98] border-0"
          >
            <HugeiconsIcon icon={RotateLeft01Icon} className="w-3 h-3" />
            <span>Reset filters</span>
          </Button>
        )}
      </div>

      {/* Shifts Grid / Empty State */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-3.5">
          {jobs.map((job) => (
            <ShiftCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828]">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="w-12 h-12 rounded-full bg-[#efefef] dark:bg-[#1a1a1a] flex items-center justify-center text-black dark:text-white mb-3">
              <HugeiconsIcon icon={SearchRemoveIcon} className="w-6 h-6 text-[#5e5e5e] dark:text-[#afafaf]" />
            </div>
            <h4 className="text-base font-bold text-black dark:text-white leading-tight mb-1">
              No shifts matching your criteria
            </h4>
            <p className="text-xs text-[#5e5e5e] dark:text-[#afafaf] max-w-xs mb-5 font-normal">
              Try expanding your search radius, selecting a different category, or resetting active wage tiers.
            </p>
            <Button
              onClick={handleResetFilters}
              aria-label="Reset All Filters"
              className="px-5 py-2.5 min-h-[44px] h-auto rounded-full bg-black text-white hover:bg-[#282828] dark:bg-white dark:text-black dark:hover:bg-[#e2e2e2] text-xs font-medium transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
            >
              Reset All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
