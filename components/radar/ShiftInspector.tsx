'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency, formatDistance } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  StarIcon,
  Location01Icon,
  Clock01Icon,
  UserGroupIcon,
  Comment01Icon,
  ArrowUpRight01Icon,
  ShieldCheckIcon,
  FlashIcon,
} from '@hugeicons/core-free-icons';

interface ShiftInspectorProps {
  isMobileDrawer?: boolean;
  onClose?: () => void;
}

export function ShiftInspector({
  isMobileDrawer = false,
  onClose,
}: ShiftInspectorProps) {
  const {
    selectedJob,
    setSelectedJob,
    setIsApplyModalOpen,
    setActiveTab,
    setActiveChatId,
    chats,
  } = useMarketplace();

  if (!selectedJob) return null;

  const handleClose = () => {
    sounds.playTap();
    setSelectedJob(null);
    if (onClose) onClose();
  };

  const handleApply = () => {
    sounds.playTap();
    setIsApplyModalOpen(true);
  };

  const handleChat = () => {
    sounds.playTap();
    const matchingChat = chats.find(
      (c) =>
        c.company.toLowerCase().includes(selectedJob.employer.toLowerCase()) ||
        selectedJob.employer.toLowerCase().includes(c.company.toLowerCase()) ||
        selectedJob.employer.toLowerCase().includes(c.contactName.toLowerCase())
    );
    if (matchingChat) {
      setActiveChatId(matchingChat.id);
    }
    setActiveTab('chat');
  };

  const content = (
    <>
      {/* Mobile Drag Handle */}
      {isMobileDrawer && (
        <div className="flex justify-center -mt-2 mb-3">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>
      )}

      {/* Header: Employer, Rating & Close */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="w-12 h-12 rounded-full border border-[#efefef] dark:border-[#282828] shrink-0">
            <AvatarImage src={selectedJob.employerAvatar} alt={selectedJob.employer} className="rounded-full object-cover" />
            <AvatarFallback>{selectedJob.employer.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-normal text-[#5e5e5e] dark:text-[#afafaf]">
                {selectedJob.employer}
              </span>
              <div className="flex items-center text-xs font-medium text-black dark:text-white">
                <HugeiconsIcon icon={StarIcon} className="w-3 h-3 fill-black text-black dark:fill-white dark:text-white inline mr-0.5" />
                {selectedJob.employerRating.toFixed(1)}
              </div>
            </div>
            <h3 className="text-base font-bold text-black dark:text-white leading-tight mt-0.5">
              {selectedJob.title}
            </h3>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          aria-label="Close inspector"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#efefef] hover:bg-[#e2e2e2] text-black dark:bg-[#1a1a1a] dark:hover:bg-[#242424] dark:text-white flex items-center justify-center transition-transform duration-150 ease-out active:scale-[0.98] border-0"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
        </Button>
      </div>

      {/* Wage & Category Pill Row */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f3f3f3] border border-[#efefef] dark:bg-[#1a1a1a] dark:border-[#282828]">
        <div>
          <span className="text-xs text-[#5e5e5e] dark:text-[#afafaf] block font-normal">Offered wage</span>
          <div className="text-xl font-mono font-medium text-black dark:text-white">
            {formatCurrency(selectedJob.wage)}
            <span className="text-xs font-sans text-[#5e5e5e] dark:text-[#afafaf] font-normal ml-1">
              /{selectedJob.wageUnit}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Badge className="px-3 py-1 rounded-full text-xs font-medium bg-black text-white dark:bg-white dark:text-black shadow-sm border-0">
            {selectedJob.category}
          </Badge>
          {selectedJob.isUrgent && (
            <Badge variant="secondary" className="flex items-center gap-1 text-[11px] font-medium text-black dark:text-white border-0 bg-transparent p-0">
              <HugeiconsIcon icon={FlashIcon} className="w-3 h-3 fill-black text-black dark:fill-white dark:text-white" />
              Priority urgent
            </Badge>
          )}
        </div>
      </div>

      {/* Telemetry Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#efefef] text-black dark:bg-[#1a1a1a] dark:text-white">
          <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-black dark:text-white shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">Distance</div>
            <div className="font-medium truncate text-black dark:text-white">
              {formatDistance(selectedJob.distanceKm)} • {selectedJob.location}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#efefef] text-black dark:bg-[#1a1a1a] dark:text-white">
          <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-black dark:text-white shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">Shift time</div>
            <div className="font-medium truncate text-black dark:text-white">{selectedJob.timeSlot}</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#efefef] text-black dark:bg-[#1a1a1a] dark:text-white">
          <HugeiconsIcon icon={UserGroupIcon} className="w-4 h-4 text-black dark:text-white shrink-0" />
          <div>
            <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">Available slots</div>
            <div className="font-medium text-black dark:text-white">
              {selectedJob.openSlots} {selectedJob.openSlots === 1 ? 'open vacancy' : 'open vacancies'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#efefef] text-black dark:bg-[#1a1a1a] dark:text-white">
          <HugeiconsIcon icon={ShieldCheckIcon} className="w-4 h-4 text-black dark:text-white shrink-0" />
          <div>
            <div className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">Handshake PIN</div>
            <div className="font-mono font-medium text-black dark:text-white">OTP 6767</div>
          </div>
        </div>
      </div>

      {/* Description & Tags */}
      <div className="text-xs text-[#5e5e5e] dark:text-[#afafaf] bg-[#f3f3f3] dark:bg-[#1a1a1a] p-3.5 rounded-2xl border border-[#efefef] dark:border-[#282828]">
        <p className="leading-relaxed font-normal">{selectedJob.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {selectedJob.tags.map((tag) => (
            <Badge
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#efefef] text-black dark:bg-[#242424] dark:text-white border-0"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-1">
        <Button
          onClick={handleChat}
          className="flex-1 flex items-center justify-center gap-2 py-3 h-auto rounded-full bg-[#efefef] hover:bg-[#e2e2e2] text-black dark:bg-[#1a1a1a] dark:hover:bg-[#242424] dark:text-white text-xs font-medium transition-transform duration-150 ease-out active:scale-[0.98] border-0"
        >
          <HugeiconsIcon icon={Comment01Icon} className="w-4 h-4" />
          <span>Chat hirer</span>
        </Button>

        <Button
          onClick={handleApply}
          className="flex-[2] flex items-center justify-center gap-2 py-3 h-auto rounded-full bg-black text-white hover:bg-[#282828] dark:bg-white dark:text-black dark:hover:bg-[#e2e2e2] text-xs font-medium transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
        >
          <span>Apply now (PIN 6767)</span>
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4" />
        </Button>
      </div>
    </>
  );

  if (isMobileDrawer) {
    return (
      <div className="w-full bg-white text-black dark:bg-[#121212] dark:text-white rounded-t-3xl border-t border-[#efefef] dark:border-[#282828] p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {content}
      </div>
    );
  }

  return (
    <Card className="w-full bg-white text-black dark:bg-[#121212] dark:text-white rounded-2xl border border-[#efefef] dark:border-[#282828] p-5 shadow-sm flex flex-col gap-4">
      {content}
    </Card>
  );
}
