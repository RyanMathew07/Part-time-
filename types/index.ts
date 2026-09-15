export type CategoryType = 'All' | 'Cafe' | 'Promotion' | 'Events' | 'Logistics' | 'Retail' | 'Delivery';

export type WageTierType = 100 | 500 | 1000 | 10000;

export interface JobShift {
  id: string;
  title: string;
  employer: string;
  employerAvatar: string;
  employerRating: number;
  category: CategoryType | string;
  wage: number;
  wageUnit: string;
  duration: string;
  timeSlot: string;
  distanceKm: number;
  location: string;
  coords: { x: number; y: number };
  tags: string[];
  description: string;
  openSlots: number;
  checkInPin: string;
  isUrgent: boolean;
  badgeColor?: 'cyan' | 'amber' | 'emerald' | 'purple' | 'indigo' | 'rose' | string;
}

export interface UserProfile {
  name: string;
  role: string;
  userType: 'employee' | 'employer';
  avatar: string;
  phone: string;
  email: string;
  upiId: string;
  age: number;
  isAgeVerified: boolean;
  kycStatus: 'verified' | 'pending' | 'unverified';
  kycIdType: string;
  kycDocNumber: string;
  hourlyRateRange: { min: number; max: number };
  skills: string[];
  activeOtp: string;
  completedGigsCount: number;
  rating: number;
}

export interface WalletTransaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  icon: string;
  badge?: string;
  method?: string;
}

export interface WalletState {
  balance: number;
  currency: string;
  upiId: string;
  linkedBank: string;
  transactions: WalletTransaction[];
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface ChatContact {
  id: string;
  contactName: string;
  role: string;
  company: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  unreadCount: number;
  lastMessageTime: string;
  jobReference: string;
  messages: ChatMessage[];
}

export interface RecentActivity {
  id: string;
  title: string;
  type: string;
  wage: string;
  date: string;
  status: string;
  statusColor: 'emerald' | 'cyan' | 'amber' | 'purple' | string;
  pinUsed: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'wallet' | 'security' | 'job' | 'kyc';
  unread: boolean;
}

export interface ActiveShift {
  jobId: string;
  title: string;
  employer: string;
  wage: number;
  status: 'scheduled' | 'checked_in' | 'in_progress' | 'completed';
  checkInPin: string;
  isCheckedIn: boolean;
  startedAt?: string;
  countdownMinutes?: number;
  location?: string;
  timeSlot?: string;
}
