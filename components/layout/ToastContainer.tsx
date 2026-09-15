'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Key01Icon,
  Compass01Icon,
  Sun01Icon,
  Moon01Icon,
  Call02Icon,
  Coins01Icon,
  CheckmarkCircle02Icon,
} from '@hugeicons/core-free-icons';

function renderToastIcon(icon?: string) {
  if (!icon) {
    return <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />;
  }
  switch (icon) {
    case 'pin':
    case '🔑':
      return <HugeiconsIcon icon={Key01Icon} className="w-4 h-4 text-white shrink-0" />;
    case 'radar':
    case 'compass':
    case '🧭':
      return <HugeiconsIcon icon={Compass01Icon} className="w-4 h-4 text-white shrink-0" />;
    case 'sun':
    case '☀️':
      return <HugeiconsIcon icon={Sun01Icon} className="w-4 h-4 text-white shrink-0" />;
    case 'moon':
    case '🌙':
      return <HugeiconsIcon icon={Moon01Icon} className="w-4 h-4 text-white shrink-0" />;
    case 'phone':
    case '📞':
      return <HugeiconsIcon icon={Call02Icon} className="w-4 h-4 text-white shrink-0" />;
    case 'pay':
    case '💰':
      return <HugeiconsIcon icon={Coins01Icon} className="w-4 h-4 text-white shrink-0" />;
    case 'check':
    case '✅':
      return <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-white shrink-0" />;
    default:
      return <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />;
  }
}

export function ToastContainer() {
  const { toasts } = useMarketplace();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full font-sans">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-5 py-3 bg-black text-white dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-[#282828] rounded-full shadow-xl text-xs animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-auto"
        >
          {renderToastIcon(toast.icon)}
          <span className="font-medium flex-1 text-white leading-tight">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
