'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useMarketplace();

  const handleClear = () => {
    sounds.playTap();
    setSearchQuery('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5e5e5e] dark:text-[#afafaf] z-10">
        <HugeiconsIcon icon={Search01Icon} className="w-4 h-4" />
      </div>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search gigs, cafes, events, indiranagar..."
        className="w-full min-h-[44px] pl-10 pr-10 py-2.5 bg-[#efefef] hover:bg-[#e8e8e8] focus:bg-white text-black placeholder-[#afafaf] text-sm rounded-full border border-transparent focus:border-black focus-visible:ring-0 shadow-none transition-colors dark:bg-[#1a1a1a] dark:hover:bg-[#242424] dark:focus:bg-[#1e1e1e] dark:text-white dark:placeholder-[#afafaf] dark:focus:border-white/30"
      />
      {searchQuery ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5e5e5e] hover:text-black dark:text-[#afafaf] dark:hover:text-white transition-colors w-auto h-auto bg-transparent hover:bg-transparent border-0 active:scale-95"
        >
          <span className="w-5 h-5 rounded-full bg-[#e2e2e2] hover:bg-[#d5d5d5] dark:bg-[#2e2e2e] dark:hover:bg-[#383838] dark:text-white flex items-center justify-center text-black">
            <HugeiconsIcon icon={Cancel01Icon} className="w-3.5 h-3.5" />
          </span>
        </Button>
      ) : (
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-[#737373] dark:text-[#a3a3a3] bg-white/80 dark:bg-[#262626] border border-[#e5e5e5] dark:border-[#383838] rounded-md shadow-2xs select-none">
            /
          </kbd>
        </div>
      )}
    </div>
  );
}
