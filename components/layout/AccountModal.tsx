'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShieldCheckIcon,
  StarIcon,
  Briefcase01Icon,
} from '@hugeicons/core-free-icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function AccountModal() {
  const {
    user,
    toggleUserRole,
    isAccountModalOpen,
    setIsAccountModalOpen,
  } = useMarketplace();

  const handleClose = () => {
    sounds.playTap();
    setIsAccountModalOpen(false);
  };

  return (
    <Dialog open={isAccountModalOpen} onOpenChange={setIsAccountModalOpen}>
      <DialogContent
        showCloseButton={true}
        className="w-full max-w-md bg-white dark:bg-[#121212] border border-[#efefef] dark:border-[#282828] rounded-2xl p-6 shadow-xl flex flex-col gap-4 text-black dark:text-white"
      >
        {/* Header */}
        <DialogHeader className="gap-1 text-left">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-full border border-[#efefef] dark:border-[#282828]">
              <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
              <AvatarFallback className="bg-[#efefef] dark:bg-[#1a1a1a] text-black dark:text-white font-medium text-sm">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-base font-bold text-black dark:text-white leading-tight">
                {user.name}
              </DialogTitle>
              <p className="text-xs text-[#5e5e5e] dark:text-[#afafaf] font-normal">{user.role}</p>
            </div>
          </div>
        </DialogHeader>

        {/* KYC Verification Card */}
        <Card className="p-3.5 rounded-2xl bg-[#f3f3f3] dark:bg-[#1a1a1a] border border-[#efefef] dark:border-[#282828] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <HugeiconsIcon icon={ShieldCheckIcon} className="w-5 h-5 text-black dark:text-white shrink-0" />
            <div>
              <div className="text-xs font-medium text-black dark:text-white leading-tight">
                Government KYC verified
              </div>
              <div className="text-[11px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">
                Age {user.age} (≥ 18) • {user.kycIdType} ({user.kycDocNumber})
              </div>
            </div>
          </div>
          <Badge className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black dark:bg-white text-white dark:text-black shadow-sm border-0">
            Verified
          </Badge>
        </Card>

        {/* Theme Appearance Setting Row */}
        <ThemeToggle variant="full" />

        {/* Telemetry Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <Card className="p-3 rounded-2xl bg-[#efefef] dark:bg-[#1a1a1a] border border-transparent">
            <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-mono font-normal">Rating</div>
            <div className="text-sm font-medium text-black dark:text-white flex items-center justify-center gap-1 mt-0.5">
              <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 fill-black dark:fill-white text-black dark:text-white" />
              {user.rating}
            </div>
          </Card>

          <Card className="p-3 rounded-2xl bg-[#efefef] dark:bg-[#1a1a1a] border border-transparent">
            <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-mono font-normal">Shifts</div>
            <div className="text-sm font-medium text-black dark:text-white mt-0.5">
              {user.completedGigsCount}
            </div>
          </Card>

          <Card className="p-3 rounded-2xl bg-[#efefef] dark:bg-[#1a1a1a] border border-transparent">
            <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-mono font-normal">Hourly rate</div>
            <div className="text-sm font-medium text-black dark:text-white mt-0.5 font-mono">
              ₹{user.hourlyRateRange.min}-{user.hourlyRateRange.max}
            </div>
          </Card>
        </div>

        {/* Role Switcher */}
        <Card className="p-3.5 rounded-2xl bg-[#efefef] dark:bg-[#1a1a1a] border border-transparent flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-black dark:text-white">
            <HugeiconsIcon icon={Briefcase01Icon} className="w-4 h-4 text-[#5e5e5e] dark:text-[#afafaf]" />
            <span className="text-[#5e5e5e] dark:text-[#afafaf] font-normal">Operating mode:</span>
            <strong className="text-black dark:text-white capitalize font-medium">{user.userType}</strong>
          </div>

          <Button
            onClick={toggleUserRole}
            className="flex items-center gap-1.5 px-3.5 py-1.5 h-auto rounded-full bg-black dark:bg-white hover:bg-[#282828] dark:hover:bg-[#efefef] text-xs font-medium text-white dark:text-black transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
          >
            <span>Switch to {user.userType === 'employee' ? 'Employer' : 'Worker'}</span>
          </Button>
        </Card>

        {/* Skills */}
        <div className="space-y-1.5 text-xs">
          <div className="text-[#5e5e5e] dark:text-[#afafaf] font-medium">Verified badges & skills</div>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill) => (
              <Badge
                key={skill}
                className="px-3 py-1 rounded-full text-[11px] bg-[#efefef] dark:bg-[#242424] text-black dark:text-white font-medium border-0"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Close */}
        <Button
          onClick={handleClose}
          className="w-full py-3 h-auto rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#282828] dark:hover:bg-[#efefef] text-xs font-medium transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] mt-1 border-0"
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
