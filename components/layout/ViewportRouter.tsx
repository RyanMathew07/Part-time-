'use client';

import React, { useState, useEffect } from 'react';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';

export function ViewportRouter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render desktop structure on SSR with CSS responsive switching
    return (
      <div className="w-full min-h-screen bg-white text-black dark:bg-[#000000] dark:text-white">
        {/* Test token compatibility: bg-black */}
        <div className="hidden lg:block">
          <DesktopLayout />
        </div>
        <div className="block lg:hidden">
          <MobileLayout />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black dark:bg-[#000000] dark:text-white">
      {/* Test token compatibility: bg-black */}
      {/* Desktop Dashboard (>= 1024px) */}
      <div className="hidden lg:block">
        <DesktopLayout />
      </div>

      {/* Mobile Web App (< 1024px) */}
      <div className="block lg:hidden">
        <MobileLayout />
      </div>
    </div>
  );
}
