'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDownLeft01Icon,
  ArrowUpRight01Icon,
  Coffee01Icon,
  SparklesIcon,
  Award01Icon,
  Invoice01Icon,
} from '@hugeicons/core-free-icons';

export function TransactionHistory() {
  const { wallet } = useMarketplace();

  const getTxIcon = (iconName: string, type: 'credit' | 'debit') => {
    switch (iconName) {
      case 'coffee':
        return <HugeiconsIcon icon={Coffee01Icon} className="w-4 h-4 text-black dark:text-white" />;
      case 'award':
        return <HugeiconsIcon icon={Award01Icon} className="w-4 h-4 text-black dark:text-white" />;
      case 'sparkles':
        return <HugeiconsIcon icon={SparklesIcon} className="w-4 h-4 text-black dark:text-white" />;
      case 'arrow-up-right':
        return <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 text-black dark:text-white" />;
      default:
        return type === 'credit' ? (
          <HugeiconsIcon icon={ArrowDownLeft01Icon} className="w-4 h-4 text-black dark:text-white" />
        ) : (
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 text-black dark:text-white" />
        );
    }
  };

  return (
    <Card className="w-full bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828] rounded-2xl p-5 shadow-sm flex flex-col gap-4 text-black dark:text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#efefef] dark:border-[#282828]">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Invoice01Icon} className="w-4 h-4 text-black dark:text-white" />
          <h3 className="text-sm font-bold text-black dark:text-white tracking-tight leading-tight">
            Transaction receipts ledger
          </h3>
        </div>
        <span className="text-xs font-mono text-[#5e5e5e] dark:text-[#afafaf]">
          {wallet.transactions.length} entries
        </span>
      </div>

      {/* Transactions List */}
      <div className="flex flex-col divide-y divide-[#efefef] dark:divide-[#282828]">
        {wallet.transactions.map((tx) => {
          const isCredit = tx.type === 'credit';

          return (
            <div
              key={tx.id}
              className="py-3.5 flex items-center justify-between gap-3 group hover:bg-[#f3f3f3] dark:hover:bg-[#1a1a1a] px-2 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-[#efefef] dark:bg-[#1a1a1a] border border-transparent">
                  {getTxIcon(tx.icon, tx.type)}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-black dark:text-white truncate leading-tight">
                    {tx.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#5e5e5e] dark:text-[#afafaf] mt-0.5 font-mono">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span className="font-sans">{tx.category}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-mono font-medium text-black dark:text-white">
                  {isCredit ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#efefef] text-[#5e5e5e] dark:bg-[#1a1a1a] dark:text-[#afafaf] border-0">
                  {tx.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
