'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CategoryType } from '@/types';
import { sounds } from '@/lib/soundEngine';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SparklesIcon,
  Coffee01Icon,
  Megaphone01Icon,
  Calendar01Icon,
  PackageIcon,
  ShoppingBag01Icon,
  FlashIcon,
} from '@hugeicons/core-free-icons';

interface CategoryItem {
  id: CategoryType;
  label: string;
  icon: any;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'All', label: 'All gigs', icon: SparklesIcon },
  { id: 'Cafe', label: 'Café & food', icon: Coffee01Icon },
  { id: 'Promotion', label: 'Promo & sales', icon: Megaphone01Icon },
  { id: 'Events', label: 'Events & ushers', icon: Calendar01Icon },
  { id: 'Logistics', label: 'Logistics & expo', icon: PackageIcon },
  { id: 'Retail', label: 'Retail store', icon: ShoppingBag01Icon },
  { id: 'Delivery', label: 'Express delivery', icon: FlashIcon },
];

export function CategoryPills() {
  const { selectedCategory, setSelectedCategory } = useMarketplace();

  const handleSelect = (category: CategoryType) => {
    sounds.playTap();
    setSelectedCategory(category);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;

        return (
          <Button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] h-11 rounded-full text-xs font-medium whitespace-nowrap transition-transform duration-150 ease-out active:scale-[0.98] border-0 ${
              isSelected
                ? 'bg-black text-white shadow-sm dark:bg-white dark:text-black'
                : 'bg-[#efefef] text-black hover:bg-[#e2e2e2] dark:bg-[#1a1a1a] dark:text-[#afafaf] dark:hover:bg-[#242424] dark:hover:text-white'
            }`}
          >
            <HugeiconsIcon
              icon={cat.icon}
              className={`w-3.5 h-3.5 ${
                isSelected ? 'text-white dark:text-black' : 'text-[#5e5e5e] dark:text-[#afafaf]'
              }`}
            />
            <span>{cat.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
