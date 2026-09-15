'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency, formatDistance } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon, Clock01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

export function ApplyModal() {
  const {
    selectedJob,
    isApplyModalOpen,
    setIsApplyModalOpen,
    applyToJob,
    user,
  } = useMarketplace();

  if (!selectedJob) return null;

  const handleClose = () => {
    sounds.playTap();
    setIsApplyModalOpen(false);
  };

  const handleConfirm = () => {
    applyToJob(selectedJob);
  };

  return (
    <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
      <DialogContent
        showCloseButton={true}
        className="w-full max-w-md bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828] rounded-2xl p-6 shadow-xl flex flex-col gap-4 text-black dark:text-white"
      >
        <DialogHeader className="gap-1 text-left">
          <span className="text-xs font-normal text-[#5e5e5e] dark:text-[#afafaf]">
            Shift application
          </span>
          <DialogTitle className="text-xl font-bold text-black dark:text-white tracking-tight leading-tight">
            {selectedJob.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-[#5e5e5e] dark:text-[#afafaf] mt-0.5 font-normal">
            {selectedJob.employer} • {formatCurrency(selectedJob.wage)} (
            {selectedJob.wageUnit})
          </DialogDescription>
        </DialogHeader>

        {/* Shift Details Box */}
        <div className="p-4 bg-[#f3f3f3] border border-[#efefef] dark:bg-[#1a1a1a] dark:border-[#282828] rounded-2xl flex flex-col gap-2 text-xs text-black dark:text-white">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Location01Icon} className="w-3.5 h-3.5 text-black dark:text-white shrink-0" />
            <span>
              <strong>Location:</strong> {selectedJob.location} (
              {formatDistance(selectedJob.distanceKm)})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5 text-black dark:text-white shrink-0" />
            <span>
              <strong>Shift time:</strong> {selectedJob.timeSlot} • {selectedJob.duration}
            </span>
          </div>
          <div className="mt-1 pt-2 border-t border-[#efefef] dark:border-[#282828] text-[#5e5e5e] dark:text-[#afafaf] font-normal">
            {selectedJob.description}
          </div>
        </div>

        {/* Universal PIN 6767 notice */}
        <div className="p-3.5 bg-[#efefef] dark:bg-[#1a1a1a] rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono font-medium text-sm shrink-0 flex items-center justify-center">
            {user.activeOtp || '6767'}
          </div>
          <div className="text-xs">
            <div className="font-medium text-black dark:text-white leading-tight">
              Universal check-in handshake
            </div>
            <div className="text-[11px] text-[#5e5e5e] dark:text-[#afafaf] font-normal">
              When arriving on-site, present code{' '}
              <strong className="font-mono text-black dark:text-white">
                {user.activeOtp || '6767'}
              </strong>{' '}
              to the supervisor.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={handleClose}
            className="flex-1 py-3 h-auto rounded-full bg-[#efefef] hover:bg-[#e2e2e2] text-black dark:bg-[#242424] dark:hover:bg-[#2e2e2e] dark:text-white text-xs font-medium transition-transform duration-150 ease-out active:scale-[0.98] border-0"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-3 h-auto rounded-full bg-black text-white hover:bg-[#282828] dark:bg-white dark:text-black dark:hover:bg-[#e2e2e2] text-xs font-medium transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
          >
            <span>Confirm & apply</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-3.5 h-3.5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
