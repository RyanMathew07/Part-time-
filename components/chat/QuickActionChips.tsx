'use client';

import React from 'react';
import { sounds } from '@/lib/soundEngine';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Key01Icon, Coins01Icon, Location01Icon } from '@hugeicons/core-free-icons';

interface QuickActionChipsProps {
  onSelectAction: (text: string) => void;
}

export function QuickActionChips({ onSelectAction }: QuickActionChipsProps) {
  const chips = [
    {
      label: 'Share PIN 6767',
      text: 'Here is my Universal Check-in PIN: 6767',
      icon: Key01Icon,
    },
    {
      label: 'Request Pay',
      text: 'Shift completed! Request Pay of ₹500 to my wallet.',
      icon: Coins01Icon,
    },
    {
      label: "I've arrived",
      text: "I've arrived at the location and ready to check in.",
      icon: Location01Icon,
    },
  ];

  const handleChipClick = (text: string) => {
    sounds.playTap();
    onSelectAction(text);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
      {chips.map((chip) => (
        <Button
          key={chip.label}
          type="button"
          onClick={() => handleChipClick(chip.text)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 h-auto rounded-full text-xs font-medium whitespace-nowrap bg-[#efefef] hover:bg-[#e2e2e2] text-black dark:bg-[#1a1a1a] dark:hover:bg-[#242424] dark:text-[#afafaf] dark:hover:text-white border-0 transition-transform duration-150 ease-out active:scale-[0.98]"
        >
          <HugeiconsIcon icon={chip.icon} className="w-3.5 h-3.5 text-black dark:text-white shrink-0" />
          <span>{chip.label}</span>
        </Button>
      ))}
    </div>
  );
}
