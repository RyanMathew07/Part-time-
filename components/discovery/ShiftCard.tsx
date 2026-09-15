'use client';

import React from 'react';
import { JobShift } from '@/types';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency, formatDistance } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  StarIcon,
  Location01Icon,
  UserGroupIcon,
  FlashIcon,
  Comment01Icon,
  ArrowUpRight01Icon,
  Clock01Icon,
} from '@hugeicons/core-free-icons';

interface ShiftCardProps {
  job: JobShift;
  compact?: boolean;
}

export function ShiftCard({ job, compact = false }: ShiftCardProps) {
  const {
    setSelectedJob,
    setIsApplyModalOpen,
    setActiveTab,
    setActiveChatId,
    chats,
  } = useMarketplace();

  const handleCardClick = () => {
    sounds.playTap();
    setSelectedJob(job);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playTap();
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playTap();
    const matchingChat = chats.find(
      (c) =>
        c.company.toLowerCase().includes(job.employer.toLowerCase()) ||
        job.employer.toLowerCase().includes(c.company.toLowerCase()) ||
        job.employer.toLowerCase().includes(c.contactName.toLowerCase())
    );
    if (matchingChat) {
      setActiveChatId(matchingChat.id);
    }
    setActiveTab('chat');
  };

  const isUrgent = job.isUrgent;

  return (
    <Card
      onClick={handleCardClick}
      className={`group relative rounded-2xl p-5 transition-colors duration-150 ease-out cursor-pointer flex flex-col justify-between active:scale-[0.99] ${
        compact ? 'gap-3' : 'gap-4'
      } bg-white dark:bg-[#161616] text-black dark:text-white border ${
        isUrgent
          ? 'border-black/30 dark:border-white/30 shadow-sm ring-1 ring-black/5 dark:ring-white/5'
          : 'border-[#efefef] dark:border-[#282828] hover:border-black/30 dark:hover:border-white/30'
      }`}
    >
      {/* Top row: Employer info & Wage Telemetry */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="w-11 h-11 rounded-2xl shrink-0 border border-[#efefef] dark:border-[#282828]">
            <AvatarImage src={job.employerAvatar} alt={job.employer} className="rounded-2xl object-cover" />
            <AvatarFallback className="rounded-2xl">{job.employer.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-normal text-[#5e5e5e] dark:text-[#afafaf]">
                {job.employer}
              </span>
              <span className="text-[11px] font-medium flex items-center text-black dark:text-white">
                <HugeiconsIcon icon={StarIcon} className="w-3 h-3 inline mr-0.5 fill-black dark:fill-white text-black dark:text-white" />
                {job.employerRating.toFixed(1)}
              </span>
            </div>
            <h3 className="text-base font-bold leading-tight group-hover:underline mt-0.5 line-clamp-1 text-black dark:text-white">
              {job.title}
            </h3>
          </div>
        </div>

        {/* Wage Telemetry */}
        <div className="text-right shrink-0">
          <div className="text-lg md:text-xl font-mono font-bold tracking-tight text-black dark:text-white tabular-nums">
            {formatCurrency(job.wage)}
          </div>
          <div className="text-xs font-normal text-[#5e5e5e] dark:text-[#afafaf]">
            /{job.wageUnit}
          </div>
        </div>
      </div>

      {/* Middle row: Badges, Telemetry & Location */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <Badge className="px-3 py-1 rounded-full text-xs font-medium border-0 bg-[#efefef] dark:bg-[#242424] text-black dark:text-white">
          {job.category}
        </Badge>

        {job.isUrgent && (
          <Badge className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-black text-white dark:bg-white dark:text-black border-0 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
            <HugeiconsIcon icon={FlashIcon} className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
            <span>Urgent</span>
          </Badge>
        )}

        <Badge className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-normal border-0 bg-[#efefef] dark:bg-[#242424] text-[#5e5e5e] dark:text-[#afafaf]">
          <HugeiconsIcon icon={Location01Icon} className="w-3 h-3" />
          {formatDistance(job.distanceKm)}
        </Badge>

        <Badge className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-normal border-0 bg-[#efefef] dark:bg-[#242424] text-[#5e5e5e] dark:text-[#afafaf]">
          <HugeiconsIcon icon={UserGroupIcon} className="w-3 h-3" />
          {job.openSlots} {job.openSlots === 1 ? 'slot' : 'slots'}
        </Badge>
      </div>

      {/* Location line */}
      <div className="text-xs line-clamp-1 flex items-center gap-1.5 font-normal text-[#5e5e5e] dark:text-[#afafaf]">
        <HugeiconsIcon icon={Location01Icon} className="w-3.5 h-3.5 shrink-0 text-[#737373] dark:text-[#a3a3a3]" />
        <span>{job.location}</span>
      </div>

      {/* Bottom row: Duration & Action Buttons */}
      <div className="flex items-center justify-between pt-3 mt-0.5 border-t border-[#efefef] dark:border-[#282828]">
        <span className="text-xs font-normal text-[#5e5e5e] dark:text-[#afafaf] flex items-center gap-1.5">
          <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5 shrink-0 text-[#737373] dark:text-[#a3a3a3]" />
          <span>{job.duration}</span>
        </span>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleChatClick}
            aria-label="Chat with employer"
            size="icon"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-transform duration-150 ease-out active:scale-[0.97] border-0 bg-[#efefef] dark:bg-[#242424] hover:bg-[#e2e2e2] dark:hover:bg-[#2e2e2e] text-black dark:text-white"
          >
            <HugeiconsIcon icon={Comment01Icon} className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleApplyClick}
            className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full text-xs font-medium transition-transform duration-150 ease-out shadow-sm active:scale-[0.97] border-0 bg-black dark:bg-white text-white dark:text-black hover:bg-[#282828] dark:hover:bg-[#efefef]"
          >
            <span>Quick apply</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
