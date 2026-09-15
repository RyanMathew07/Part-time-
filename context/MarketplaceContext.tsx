'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {
  UserProfile,
  JobShift,
  WalletState,
  ChatContact,
  RecentActivity,
  AppNotification,
  ActiveShift,
  CategoryType,
  WageTierType,
} from '@/types';
import {
  INITIAL_USER,
  INITIAL_WALLET,
  INITIAL_JOBS,
  INITIAL_CHATS,
  INITIAL_ACTIVITIES,
  INITIAL_NOTIFICATIONS,
} from '@/lib/seedData';
import { sounds } from '@/lib/soundEngine';
import { isValidUpiId } from '@/lib/utils';

export interface ToastMessage {
  id: string;
  message: string;
  icon?: string;
}

export interface MarketplaceContextType {
  // User & Roles
  user: UserProfile;
  toggleUserRole: () => void;

  // Job Discovery & Filters
  allJobs: JobShift[];
  jobs: JobShift[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  selectedWageTier: WageTierType | null;
  setSelectedWageTier: (tier: WageTierType | null) => void;
  radarRadiusKm: number;
  setRadarRadiusKm: (radius: number) => void;
  selectedJob: JobShift | null;
  setSelectedJob: (job: JobShift | null) => void;

  // Active View & Navigation
  activeTab: 'home' | 'map' | 'chat' | 'recent' | 'wallet';
  setActiveTab: (tab: 'home' | 'map' | 'chat' | 'recent' | 'wallet') => void;

  // Shift Lifecycle & OTP
  activeShift: ActiveShift | null;
  applyToJob: (job: JobShift) => void;
  verifyCheckIn: (pin: string) => boolean;
  completeShift: (jobId: string, payoutAmount?: number) => void;

  // Chat
  chats: ChatContact[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  sendMessage: (contactId: string, text: string) => void;

  // Wallet & Cashout
  wallet: WalletState;
  cashoutWallet: (
    amount: number,
    upiId: string,
    provider: string
  ) => { success: boolean; message: string };

  // Employer Actions
  addJob: (jobData: Omit<JobShift, 'id'>) => void;

  // Activities & Notifications
  recentActivities: RecentActivity[];
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;

  // Modals & UI Sheet State
  isHireModalOpen: boolean;
  setIsHireModalOpen: (open: boolean) => void;
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  isCashoutModalOpen: boolean;
  setIsCashoutModalOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;

  // Sound Engine
  soundEnabled: boolean;
  toggleSound: () => void;

  // Theme & Dark Mode
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Toast System
  toasts: ToastMessage[];
  showToast: (msg: string, icon?: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | null>(null);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  // Profile & Role
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Gigs & Vacancies
  const [allJobs, setAllJobs] = useState<JobShift[]>(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('All');
  const [selectedWageTier, setSelectedWageTier] =
    useState<WageTierType | null>(null);
  const [radarRadiusKm, setRadarRadiusKm] = useState<number>(5);
  const [selectedJob, setSelectedJob] = useState<JobShift | null>(null);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    'home' | 'map' | 'chat' | 'recent' | 'wallet'
  >('home');

  // Active Shift Lifecycle (Seed with upcoming shift at Arun's Cafe or null)
  const [activeShift, setActiveShift] = useState<ActiveShift | null>({
    jobId: 'job-101',
    title: 'Express Flyer & Promo Distributor',
    employer: "Arun's Cafe & Roasters",
    wage: 100,
    status: 'scheduled',
    checkInPin: '6767',
    isCheckedIn: false,
    countdownMinutes: 35,
    location: 'Metro Station Exit 3, Indiranagar',
    timeSlot: 'Today, 4:00 PM - 6:00 PM',
  });

  // Chats
  const [chats, setChats] = useState<ChatContact[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>('chat-arun');

  // Wallet
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET);

  // Recent & Notifications
  const [recentActivities, setRecentActivities] =
    useState<RecentActivity[]>(INITIAL_ACTIVITIES);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isCashoutModalOpen, setIsCashoutModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Sound Engine
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Theme & Dark Mode State (persisted in localStorage, updates document.documentElement)
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('part_time_theme') as 'light' | 'dark' | null;
      if (saved === 'dark' || saved === 'light') {
        setThemeState(saved);
        if (saved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeState('dark');
        document.documentElement.classList.add('dark');
      }

      if (window.matchMedia) {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = (e: MediaQueryListEvent) => {
          const currentSaved = localStorage.getItem('part_time_theme');
          if (!currentSaved) {
            const next = e.matches ? 'dark' : 'light';
            setThemeState(next);
            if (next === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        };
        if (mql.addEventListener) {
          mql.addEventListener('change', handleSystemChange);
          return () => mql.removeEventListener('change', handleSystemChange);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setTheme = useCallback((nextTheme: 'light' | 'dark') => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem('part_time_theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    sounds.playTap();
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('part_time_theme', next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const showToast = useCallback((message: string, icon = '✨') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sounds.enabled = next;
      if (next) sounds.playTap();
      return next;
    });
  }, []);

  const toggleUserRole = useCallback(() => {
    sounds.playTap();
    setUser((prev) => ({
      ...prev,
      userType: prev.userType === 'employee' ? 'employer' : 'employee',
    }));
  }, []);

  // Filtered jobs derivation
  const jobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const catA = job.category.toLowerCase();
        const catB = selectedCategory.toLowerCase();
        if (catA !== catB && !catA.includes(catB) && !catB.includes(catA)) {
          return false;
        }
      }

      // Wage tier filter
      if (selectedWageTier !== null) {
        if (selectedWageTier === 100 && job.wage !== 100) return false;
        if (selectedWageTier === 500 && job.wage !== 500) return false;
        if (selectedWageTier === 1000 && job.wage !== 1000) return false;
        if (selectedWageTier === 10000 && job.wage !== 10000) return false;
      }

      // Radius filter
      if (job.distanceKm > radarRadiusKm) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchEmployer = job.employer.toLowerCase().includes(q);
        const matchCategory = job.category.toLowerCase().includes(q);
        const matchLocation = job.location.toLowerCase().includes(q);
        const matchTags = job.tags.some((t) => t.toLowerCase().includes(q));
        if (
          !matchTitle &&
          !matchEmployer &&
          !matchCategory &&
          !matchLocation &&
          !matchTags
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allJobs, selectedCategory, selectedWageTier, radarRadiusKm, searchQuery]);

  // Apply to Job
  const applyToJob = useCallback(
    (job: JobShift) => {
      sounds.playSuccess();
      const newActivity: RecentActivity = {
        id: 'act-' + Date.now(),
        title: job.title,
        type: 'Application Sent',
        wage: `₹${job.wage.toLocaleString()}`,
        date: 'Today, Just now',
        status: 'Confirmed',
        statusColor: 'cyan',
        pinUsed: '6767',
      };
      setRecentActivities((prev) => [newActivity, ...prev]);

      const newNotif: AppNotification = {
        id: 'notif-' + Date.now(),
        title: `Applied to ${job.employer} 🎉`,
        message: `Application submitted for ₹${job.wage}. Your check-in PIN is 6767.`,
        time: 'Just now',
        type: 'job',
        unread: true,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      setActiveShift({
        jobId: job.id,
        title: job.title,
        employer: job.employer,
        wage: job.wage,
        status: 'scheduled',
        checkInPin: '6767',
        isCheckedIn: false,
        countdownMinutes: 20,
        location: job.location,
        timeSlot: job.timeSlot,
      });

      showToast(`Applied! Check-in PIN is 6767`, '🚀');
      setIsApplyModalOpen(false);
    },
    [showToast]
  );

  // OTP Verification Handshake (PIN 6767)
  const verifyCheckIn = useCallback(
    (pin: string): boolean => {
      if (pin.trim() === '6767') {
        sounds.playSuccess();
        setActiveShift((prev) =>
          prev
            ? {
                ...prev,
                status: 'checked_in',
                isCheckedIn: true,
                startedAt: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              }
            : null
        );

        const newNotif: AppNotification = {
          id: 'notif-' + Date.now(),
          title: 'Shift Checked In! 🔑',
          message: 'Universal PIN 6767 verified on-site. Shift tracking is now live.',
          time: 'Just now',
          type: 'security',
          unread: true,
        };
        setNotifications((prev) => [newNotif, ...prev]);

        showToast('PIN 6767 verified! Shift check-in confirmed.', '✅');
        return true;
      } else {
        showToast('Invalid PIN. Please use Universal OTP 6767.', '⚠️');
        return false;
      }
    },
    [showToast]
  );

  // Shift Completion & Settlement
  const completeShift = useCallback(
    (jobId: string, payoutAmount?: number) => {
      sounds.playSuccess();
      const payout = payoutAmount || activeShift?.wage || 500;
      setWallet((prev) => ({
        ...prev,
        balance: prev.balance + payout,
        transactions: [
          {
            id: 'tx-' + Date.now(),
            title: `${activeShift?.employer || 'Shift'} Settlement`,
            category: 'Shift Payout',
            amount: payout,
            type: 'credit',
            date: 'Just now',
            status: 'Completed',
            icon: 'sparkles',
            badge: 'Shift Settlement',
          },
          ...prev.transactions,
        ],
      }));

      setActiveShift((prev) =>
        prev && prev.jobId === jobId ? { ...prev, status: 'completed' } : prev
      );

      setRecentActivities((prev) => [
        {
          id: 'act-' + Date.now(),
          title: `${activeShift?.title || 'Shift'} Completed`,
          type: 'Completed Shift',
          wage: `₹${payout}`,
          date: 'Just now',
          status: 'Settled',
          statusColor: 'emerald',
          pinUsed: '6767',
        },
        ...prev,
      ]);

      showToast(`Shift completed! ₹${payout} credited to wallet.`, '💰');
    },
    [activeShift, showToast]
  );

  // Cashout / Withdrawal
  const cashoutWallet = useCallback(
    (
      amount: number,
      upiId: string,
      provider: string
    ): { success: boolean; message: string } => {
      if (isNaN(amount) || amount <= 0) {
        showToast('Please enter a valid cashout amount', '⚠️');
        return { success: false, message: 'Invalid amount' };
      }
      if (amount > wallet.balance) {
        showToast(`Insufficient balance. Max: ₹${wallet.balance}`, '⚠️');
        return { success: false, message: 'Insufficient balance' };
      }
      if (!isValidUpiId(upiId)) {
        showToast('Please enter a valid UPI ID (e.g. name@okaxis)', '⚠️');
        return { success: false, message: 'Invalid UPI ID format' };
      }

      setWallet((prev) => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [
          {
            id: 'tx-' + Date.now(),
            title: `UPI Payout to ${upiId}`,
            category: `${provider} / UPI Withdrawal`,
            amount: amount,
            type: 'debit',
            date: 'Just now',
            status: 'Completed',
            icon: 'arrow-up-right',
            badge: provider,
            method: provider,
          },
          ...prev.transactions,
        ],
      }));

      sounds.playCashout();
      setIsCashoutModalOpen(false);

      const successMsg = `₹${amount.toLocaleString()} sent to ${upiId} via ${provider}!`;
      showToast(successMsg, '🎉');

      setNotifications((prev) => [
        {
          id: 'notif-' + Date.now(),
          title: 'Withdrawal Successful 💸',
          message: successMsg,
          time: 'Just now',
          type: 'wallet',
          unread: true,
        },
        ...prev,
      ]);

      return { success: true, message: successMsg };
    },
    [wallet.balance, showToast]
  );

  // +HIRE Shift Creation
  const addJob = useCallback(
    (jobData: Omit<JobShift, 'id'>) => {
      sounds.playSuccess();
      const newJob: JobShift = {
        ...jobData,
        id: 'job-' + Date.now(),
      };
      setAllJobs((prev) => [newJob, ...prev]);
      setIsHireModalOpen(false);
      showToast(`Vacancy "${newJob.title}" published live for ₹${newJob.wage}!`, '📢');

      setNotifications((prev) => [
        {
          id: 'notif-' + Date.now(),
          title: 'New Shift Published 📢',
          message: `Your shift "${newJob.title}" is live for ₹${newJob.wage}.`,
          time: 'Just now',
          type: 'job',
          unread: true,
        },
        ...prev,
      ]);
    },
    [showToast]
  );

  // Chat Messaging with Intelligent Auto-replies
  const sendMessage = useCallback(
    (contactId: string, text: string) => {
      if (!text || !text.trim()) return;
      sounds.playTap();

      const timeStr = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const userMsg = {
        id: 'm-' + Date.now(),
        sender: 'me' as const,
        text: text.trim(),
        time: timeStr,
      };

      setChats((prev) =>
        prev.map((contact) =>
          contact.id === contactId
            ? {
                ...contact,
                lastMessageTime: 'Just now',
                messages: [...contact.messages, userMsg],
              }
            : contact
        )
      );

      // Automated Employer Reply after 1200ms
      setTimeout(() => {
        sounds.playTap();
        let replyText =
          "Received! Looking forward to your shift. Please have the OTP 6767 ready.";

        if (text.includes('6767') || text.toUpperCase().includes('PIN')) {
          replyText =
            'PIN 6767 confirmed! Shift checked in successfully. Have a great shift!';
          verifyCheckIn('6767');
        } else if (
          text.includes('Request Pay') ||
          text.toLowerCase().includes('request pay') ||
          text.includes('completed')
        ) {
          replyText =
            "Great work! I've approved your payout of ₹500 to your PART-TIME wallet right now.";
          completeShift('job-102', 500);
        } else if (text.includes('Arrived') || text.includes('arrived')) {
          replyText =
            "Great! Head to Counter 2 or the main desk, we're ready for you.";
        }

        const replyMsg = {
          id: 'm-reply-' + Date.now(),
          sender: 'them' as const,
          text: replyText,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setChats((prev) =>
          prev.map((contact) =>
            contact.id === contactId
              ? {
                  ...contact,
                  lastMessageTime: 'Just now',
                  messages: [...contact.messages, replyMsg],
                }
              : contact
          )
        );

        showToast('New employer reply received', '💬');
      }, 1200);
    },
    [verifyCheckIn, completeShift, showToast]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{
        user,
        toggleUserRole,
        allJobs,
        jobs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedWageTier,
        setSelectedWageTier,
        radarRadiusKm,
        setRadarRadiusKm,
        selectedJob,
        setSelectedJob,
        activeTab,
        setActiveTab,
        activeShift,
        applyToJob,
        verifyCheckIn,
        completeShift,
        chats,
        activeChatId,
        setActiveChatId,
        sendMessage,
        wallet,
        cashoutWallet,
        addJob,
        recentActivities,
        notifications,
        markNotificationRead,
        isHireModalOpen,
        setIsHireModalOpen,
        isApplyModalOpen,
        setIsApplyModalOpen,
        isCashoutModalOpen,
        setIsCashoutModalOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        soundEnabled,
        toggleSound,
        theme,
        setTheme,
        toggleTheme,
        toasts,
        showToast,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error(
      'useMarketplace must be used within a MarketplaceProvider'
    );
  }
  return context;
}
