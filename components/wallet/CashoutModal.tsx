'use client';

import React, { useState, useEffect } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency, isValidUpiId } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  ShieldCheckIcon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';

const PROVIDERS = [
  {
    id: 'Google Pay',
    label: 'Google Pay',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h5.9c-.3 1.4-1.1 2.6-2.3 3.4v2.8h3.7c2.2-2 3.4-5 3.4-8.4z" fill="#4285F4" />
        <path d="M12 23c3.1 0 5.7-1 7.6-2.8l-3.7-2.8c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3c1.9 3.8 5.8 6.2 10.2 6.2z" fill="#34A853" />
        <path d="M5.6 13.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.2H1.8C.7 8.4 0 10.8 0 12s.7 3.6 1.8 5.8l3.8-2.9z" fill="#FBBC05" />
        <path d="M12 4.8c1.7 0 3.2.6 4.4 1.8l3.3-3.3C17.7 1.3 15.1 0 12 0 7.6 0 3.7 2.4 1.8 6.2l3.8 2.9c.9-2.7 3.4-4.3 6.4-4.3z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    id: 'PhonePe',
    label: 'PhonePe',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" className="text-[#5f259f]" fill="currentColor" />
        <path d="M14.8 7.5H9.2v9h2.2v-3.2h3.4c2 0 3.4-1.2 3.4-2.9s-1.4-2.9-3.4-2.9zm0 3.8h-3.4V9.5h3.4c.8 0 1.4.4 1.4 1s-.6.8-1.4.8z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 'Paytm',
    label: 'Paytm',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#002E6E" />
        <path d="M5 9h2.8c1.2 0 2 .7 2 1.8 0 1.2-.8 1.9-2 1.9H6.8V15H5V9zm1.8 2.3h1c.3 0 .6-.2.6-.5s-.3-.5-.6-.5h-1v1zM11.5 15V9h1.7l1.8 3.8L16.8 9h1.7v6h-1.6v-3.6l-1.6 3.4h-.6l-1.6-3.4V15h-1.6z" fill="#00BAF2" />
      </svg>
    ),
  },
  {
    id: 'BHIM UPI',
    label: 'BHIM UPI',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#000000" className="dark:fill-white" />
        <path d="M7 7h3v10H7zm7 0h3v10h-3z" fill="#ffffff" className="dark:fill-black" />
      </svg>
    ),
  },
];

export function CashoutModal() {
  const { wallet, isCashoutModalOpen, setIsCashoutModalOpen, cashoutWallet } =
    useMarketplace();

  const [selectedProvider, setSelectedProvider] = useState('Google Pay');
  const [amount, setAmount] = useState<number>(500);
  const [customAmountStr, setCustomAmountStr] = useState<string>('500');
  const [upiId, setUpiId] = useState(wallet.upiId || 'alexchen@okaxis');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (wallet.upiId) {
      setUpiId(wallet.upiId);
    }
  }, [wallet.upiId]);

  const handleClose = () => {
    sounds.playTap();
    setIsCashoutModalOpen(false);
    setErrorMsg(null);
  };

  const handlePresetClick = (presetAmount: number) => {
    sounds.playTap();
    const actual = Math.min(presetAmount, wallet.balance);
    setAmount(actual);
    setCustomAmountStr(actual.toString());
    setErrorMsg(null);
  };

  const handleFullBalance = () => {
    sounds.playTap();
    setAmount(wallet.balance);
    setCustomAmountStr(wallet.balance.toString());
    setErrorMsg(null);
  };

  const handleAmountChange = (valStr: string) => {
    setCustomAmountStr(valStr);
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed)) {
      setAmount(parsed);
    } else {
      setAmount(0);
    }
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg('Please enter a valid cashout amount.');
      return;
    }
    if (amount > wallet.balance) {
      setErrorMsg(`Insufficient balance. Max available: ${formatCurrency(wallet.balance)}`);
      return;
    }
    if (!isValidUpiId(upiId)) {
      setErrorMsg('Please enter a valid UPI ID (e.g. name@okaxis)');
      return;
    }

    const result = cashoutWallet(amount, upiId, selectedProvider);
    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <Dialog open={isCashoutModalOpen} onOpenChange={setIsCashoutModalOpen}>
      <DialogContent
        showCloseButton={true}
        className="w-full max-w-md bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828] rounded-2xl p-6 shadow-xl flex flex-col gap-4 text-black dark:text-white"
      >
        {/* Header */}
        <DialogHeader className="gap-1 text-left">
          <span className="text-xs font-normal text-[#5e5e5e] dark:text-[#afafaf]">
            Instant payout
          </span>
          <DialogTitle className="text-xl font-bold text-black dark:text-white tracking-tight leading-tight">
            Withdraw to UPI
          </DialogTitle>
          <p className="text-xs text-[#5e5e5e] dark:text-[#afafaf] mt-0.5 font-normal">
            Available balance:{' '}
            <strong className="text-black dark:text-white font-mono">
              {formatCurrency(wallet.balance)}
            </strong>
          </p>
        </DialogHeader>

        {/* UPI Rail Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#5e5e5e] dark:text-[#afafaf] font-medium">
            Select UPI rail
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PROVIDERS.map((p) => {
              const isSelected = selectedProvider === p.id;
              return (
                <Button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setSelectedProvider(p.id);
                  }}
                  className={`flex items-center gap-2 p-2.5 h-auto rounded-full text-xs font-medium border transition-transform duration-150 ease-out active:scale-[0.98] ${
                    isSelected
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm'
                      : 'bg-[#efefef] text-black border-transparent hover:bg-[#e2e2e2] dark:bg-[#1a1a1a] dark:text-[#afafaf] dark:hover:bg-[#242424] dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-center shrink-0">{p.icon}</span>
                  <span className="truncate">{p.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Amount Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="text-[#5e5e5e] dark:text-[#afafaf] font-medium">
                Withdrawal amount (₹)
              </label>
              <Button
                type="button"
                variant="link"
                onClick={handleFullBalance}
                className="text-black dark:text-white font-medium hover:underline text-xs p-0 h-auto"
              >
                Full balance ({formatCurrency(wallet.balance)})
              </Button>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-medium text-black dark:text-white text-sm z-10">
                ₹
              </span>
              <Input
                type="number"
                value={customAmountStr}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="500"
                min={1}
                max={wallet.balance}
                className="w-full pl-8 pr-4 py-3 h-auto bg-[#efefef] text-black font-mono font-medium text-base rounded-full border border-transparent focus:border-black focus:outline-none dark:bg-[#1a1a1a] dark:text-white dark:focus:border-white transition-colors"
              />
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-2 pt-1">
              {[100, 250, 500, 1000].map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  disabled={preset > wallet.balance}
                  className={`flex-1 py-1.5 h-auto rounded-full text-xs font-mono font-medium transition-transform duration-150 ease-out active:scale-[0.98] border-0 ${
                    amount === preset
                      ? 'bg-black text-white shadow-sm dark:bg-white dark:text-black'
                      : 'bg-[#efefef] text-black hover:bg-[#e2e2e2] disabled:opacity-40 disabled:pointer-events-none dark:bg-[#1a1a1a] dark:text-[#afafaf] dark:hover:bg-[#242424] dark:hover:text-white'
                  }`}
                >
                  ₹{preset}
                </Button>
              ))}
            </div>
          </div>

          {/* Destination UPI ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#5e5e5e] dark:text-[#afafaf] font-medium">
              Destination Virtual Payment Address (VPA)
            </label>
            <Input
              type="text"
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="e.g. yourname@okaxis"
              className="w-full px-4 py-3 h-auto bg-[#efefef] text-black font-mono text-xs rounded-full border border-transparent focus:border-black focus:outline-none dark:bg-[#1a1a1a] dark:text-white dark:focus:border-white transition-colors"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#efefef] border border-black/10 text-black text-xs font-normal dark:bg-[#1a1a1a] dark:border-white/10 dark:text-white">
              <HugeiconsIcon icon={AlertCircleIcon} className="w-4 h-4 text-black dark:text-white shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Zero Fee Guarantee */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#f3f3f3] text-xs text-[#5e5e5e] font-normal dark:bg-[#1a1a1a] dark:text-[#afafaf]">
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon icon={ShieldCheckIcon} className="w-4 h-4 text-black dark:text-white" />
              <span>Zero transaction fees</span>
            </div>
            <span className="font-mono text-black dark:text-white font-medium">₹0.00 Fee</span>
          </div>

          {/* Submit CTA */}
          <div className="flex items-center gap-3 pt-1">
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 h-auto rounded-full bg-[#efefef] hover:bg-[#e2e2e2] text-black font-medium text-xs dark:bg-[#242424] dark:hover:bg-[#2e2e2e] dark:text-white transition-transform duration-150 ease-out active:scale-[0.98] border-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-[2] flex items-center justify-center gap-2 py-3 h-auto rounded-full bg-black hover:bg-[#282828] text-white font-medium text-xs dark:bg-white dark:hover:bg-[#e2e2e2] dark:text-black transition-transform duration-150 ease-out shadow-sm active:scale-[0.98] border-0"
            >
              <span>Confirm instant payout</span>
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
