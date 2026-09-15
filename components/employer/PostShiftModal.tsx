'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { CategoryType } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Clock01Icon,
  Location01Icon,
  Coins01Icon,
  UserGroupIcon,
  File01Icon,
} from '@hugeicons/core-free-icons';

const CATEGORY_OPTIONS: { id: CategoryType; label: string }[] = [
  { id: 'Cafe', label: 'Café & Food' },
  { id: 'Promotion', label: 'Promo & Sales' },
  { id: 'Events', label: 'Events & Ushers' },
  { id: 'Logistics', label: 'Logistics & Expo' },
  { id: 'Retail', label: 'Retail Store' },
  { id: 'Delivery', label: 'Express Delivery' },
];

export function PostShiftModal() {
  const { isHireModalOpen, setIsHireModalOpen, addJob, user } =
    useMarketplace();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Cafe');
  const [wage, setWage] = useState<number>(500);
  const [wageUnit, setWageUnit] = useState('per shift');
  const [duration, setDuration] = useState('4 Hours');
  const [slots, setSlots] = useState<number>(1);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClose = () => {
    sounds.playTap();
    setIsHireModalOpen(false);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a shift title');
      return;
    }
    if (!wage || wage <= 0) {
      setErrorMsg('Please enter a valid wage amount');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please specify a landmark or location');
      return;
    }

    addJob({
      title: title.trim(),
      employer: `${user.name}'s Enterprise`,
      employerAvatar: user.avatar,
      employerRating: 5.0,
      category: category,
      wage: wage,
      wageUnit: wageUnit,
      duration: duration,
      timeSlot: 'Today, Immediate Start',
      distanceKm: 0.6,
      location: location.trim(),
      coords: {
        x: Math.floor(Math.random() * 55) + 22,
        y: Math.floor(Math.random() * 55) + 22,
      },
      tags: ['Recently Posted', 'Immediate Start', 'Verified Hirer'],
      description:
        description.trim() ||
        'Looking for reliable part-time talent to join our on-ground shift immediately.',
      openSlots: slots,
      checkInPin: '6767',
      isUrgent: true,
      badgeColor: 'cyan',
    });

    // Reset form
    setTitle('');
    setLocation('');
    setDescription('');
  };

  return (
    <Dialog open={isHireModalOpen} onOpenChange={setIsHireModalOpen}>
      <DialogContent
        showCloseButton={true}
        className="w-full max-w-lg bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828] rounded-2xl p-6 shadow-xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto text-black dark:text-white"
      >
        {/* Header */}
        <DialogHeader className="gap-1 text-left">
          <span className="text-xs font-normal text-[#5e5e5e] dark:text-[#afafaf]">
            Employer quick post
          </span>
          <DialogTitle className="text-xl font-bold text-black dark:text-white tracking-tight leading-tight">
            Post a shift in 60s
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium">Shift title (Title)</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="e.g. Artisan Coffee Barista or Event Usher"
              className="w-full px-4 py-2.5 h-auto bg-[#efefef] text-black placeholder-[#afafaf] text-xs rounded-full border border-transparent focus:outline-none focus:border-black dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#707070] dark:focus:border-white transition-colors"
            />
          </div>

          {/* Category & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium">Category</label>
              <Select value={category} onValueChange={(val) => setCategory(val as CategoryType)}>
                <SelectTrigger className="w-full px-4 py-2.5 h-auto bg-[#efefef] text-black text-xs rounded-full border border-transparent dark:bg-[#1a1a1a] dark:text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium flex items-center gap-1">
                <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>Duration</span>
              </label>
              <Input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="4 Hours"
                className="w-full px-4 py-2.5 h-auto bg-[#efefef] text-black placeholder-[#afafaf] text-xs rounded-full border border-transparent focus:outline-none focus:border-black dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#707070] dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* Wage & Slots */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium flex items-center gap-1">
                <HugeiconsIcon icon={Coins01Icon} className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>Wage (₹)</span>
              </label>
              <Input
                type="number"
                value={wage}
                onChange={(e) => setWage(parseInt(e.target.value, 10) || 0)}
                placeholder="500"
                min={50}
                className="w-full px-4 py-2.5 h-auto bg-[#efefef] text-black font-mono font-medium text-xs rounded-full border border-transparent focus:outline-none focus:border-black dark:bg-[#1a1a1a] dark:text-white dark:focus:border-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium flex items-center gap-1">
                <HugeiconsIcon icon={UserGroupIcon} className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>Available slots</span>
              </label>
              <Input
                type="number"
                value={slots}
                onChange={(e) => setSlots(parseInt(e.target.value, 10) || 1)}
                min={1}
                max={20}
                className="w-full px-4 py-2.5 h-auto bg-[#efefef] text-black font-mono font-medium text-xs rounded-full border border-transparent focus:outline-none focus:border-black dark:bg-[#1a1a1a] dark:text-white dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* Location / Landmark */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium flex items-center gap-1">
              <HugeiconsIcon icon={Location01Icon} className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>Location / landmark</span>
            </label>
            <Input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="e.g. 100ft Road, Indiranagar, Bangalore"
              className="w-full px-4 py-2.5 h-auto bg-[#efefef] text-black placeholder-[#afafaf] text-xs rounded-full border border-transparent focus:outline-none focus:border-black dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#707070] dark:focus:border-white transition-colors"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium flex items-center gap-1">
              <HugeiconsIcon icon={File01Icon} className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>Shift duties & brief</span>
            </label>
            <Textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief shift responsibilities, dress code, refreshments..."
              className="w-full px-4 py-2.5 bg-[#efefef] text-black placeholder-[#afafaf] text-xs rounded-2xl border border-transparent focus:outline-none focus:border-black resize-none dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#707070] dark:focus:border-white transition-colors"
            />
          </div>

          {/* Error display */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-[#efefef] border border-black/10 text-black text-xs dark:bg-[#1a1a1a] dark:border-white/10 dark:text-white">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 h-auto rounded-full bg-[#efefef] hover:bg-[#e2e2e2] text-black font-medium dark:bg-[#242424] dark:hover:bg-[#2e2e2e] dark:text-white transition-transform duration-150 ease-out active:scale-[0.98] border-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-[2] flex items-center justify-center gap-2 py-3 h-auto rounded-full bg-black hover:bg-[#282828] text-white font-medium dark:bg-white dark:hover:bg-[#e2e2e2] dark:text-black transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
            >
              <span>Publish vacancy live</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
