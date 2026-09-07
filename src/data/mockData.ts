export interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  avatarUrl: string;
  createdAt: string;
}

export interface LicenseRecord {
  id: string;
  userId: string;
  userEmail: string;
  licenseKey: string;
  planType: 'pro_lifetime' | 'pro_annual' | 'team_license';
  status: 'active' | 'suspended' | 'revoked';
  maxDevices: number;
  activeDevicesCount: number;
  orderId: string;
  issuedAt: string;
  expiresAt: string | null;
  lastVerifiedAt: string;
}

export interface DeviceRecord {
  id: string;
  licenseId: string;
  deviceName: string;
  platform: 'macOS Apple Silicon' | 'macOS Intel' | 'Windows 11' | 'Linux';
  osVersion: string;
  hardwareFingerprint: string;
  appVersion: string;
  isActive: boolean;
  activatedAt: string;
  lastActiveAt: string;
  locationCity: string;
}

export interface PaymentRecord {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  gatewayOrderId: string;
  gatewayPaymentId: string;
  amount: number; // in INR
  currency: string;
  paymentMethod: 'UPI' | 'Credit Card' | 'NetBanking';
  status: 'captured' | 'refunded' | 'failed';
  createdAt: string;
  planName: string;
  receiptUrl: string;
}

export interface ReleaseRecord {
  version: string;
  releaseTag: string;
  releaseDate: string;
  isLatest: boolean;
  highlights: string[];
  macArm64: { url: string; sha256: string; size: string };
  macIntel: { url: string; sha256: string; size: string };
  windowsExe: { url: string; sha256: string; size: string };
  windowsZip: { url: string; sha256: string; size: string };
  linuxAppImage: { url: string; sha256: string; size: string };
}

export interface LearningProgress {
  totalSolved: number;
  totalProblemsInVault: number;
  currentStreakDays: number;
  retentionRatePercent: number;
  topicsProgress: {
    name: string;
    percentage: number;
    solved: number;
    total: number;
    color: string;
  }[];
  recentActivity: {
    id: string;
    action: string;
    problemName: string;
    pattern: string;
    timestamp: string;
    srsBox: number;
  }[];
}

// Initial seed data
export const INITIAL_USERS: UserRecord[] = [
  {
    id: 'usr_rohit_001',
    email: 'rohit@algovault.dev',
    fullName: 'Rohit Pal',
    role: 'user',
    isEmailVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15T10:30:00Z',
  },
  {
    id: 'usr_admin_999',
    email: 'admin@algovault.dev',
    fullName: 'AlgoVault Administrator',
    role: 'admin',
    isEmailVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    createdAt: '2025-11-01T08:00:00Z',
  },
  {
    id: 'usr_sarah_002',
    email: 'sarah.chen@tech.org',
    fullName: 'Sarah Chen (Senior SWE @ Meta)',
    role: 'user',
    isEmailVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-02-10T14:20:00Z',
  },
];

export const INITIAL_LICENSES: LicenseRecord[] = [
  {
    id: 'lic_rohit_pro',
    userId: 'usr_rohit_001',
    userEmail: 'rohit@algovault.dev',
    licenseKey: 'ALGO-PRO-88F2-A4D1-9842',
    planType: 'pro_lifetime',
    status: 'active',
    maxDevices: 3,
    activeDevicesCount: 2,
    orderId: 'ORD-2026-0215-9921',
    issuedAt: '2026-02-15T11:45:00Z',
    expiresAt: null, // Lifetime
    lastVerifiedAt: '2026-03-05T18:30:00Z',
  },
  {
    id: 'lic_sarah_pro',
    userId: 'usr_sarah_002',
    userEmail: 'sarah.chen@tech.org',
    licenseKey: 'ALGO-PRO-31C9-B702-6619',
    planType: 'pro_lifetime',
    status: 'active',
    maxDevices: 3,
    activeDevicesCount: 1,
    orderId: 'ORD-2026-0210-4412',
    issuedAt: '2026-02-10T14:25:00Z',
    expiresAt: null,
    lastVerifiedAt: '2026-03-04T09:12:00Z',
  },
];

export const INITIAL_DEVICES: DeviceRecord[] = [
  {
    id: 'dev_mac_001',
    licenseId: 'lic_rohit_pro',
    deviceName: "Rohit's MacBook Pro M3 Max",
    platform: 'macOS Apple Silicon',
    osVersion: 'macOS 15.2 Sequoia',
    hardwareFingerprint: 'f49a8820c7e812d8a43f...821b',
    appVersion: '1.4.2',
    isActive: true,
    activatedAt: '2026-02-15T12:00:00Z',
    lastActiveAt: '2026-03-05T18:30:00Z',
    locationCity: 'Bengaluru, India',
  },
  {
    id: 'dev_win_002',
    licenseId: 'lic_rohit_pro',
    deviceName: 'Studio Workstation PC',
    platform: 'Windows 11',
    osVersion: 'Windows 11 Pro 24H2',
    hardwareFingerprint: '77b209d1c92a188f6190...002a',
    appVersion: '1.4.2',
    isActive: true,
    activatedAt: '2026-02-18T09:15:00Z',
    lastActiveAt: '2026-03-02T14:10:00Z',
    locationCity: 'Bengaluru, India',
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay_001',
    orderNumber: 'ORD-2026-0215-9921',
    userId: 'usr_rohit_001',
    userEmail: 'rohit@algovault.dev',
    userName: 'Rohit Pal',
    gatewayOrderId: 'order_RZP882910398',
    gatewayPaymentId: 'pay_RZP_991823901',
    amount: 1499,
    currency: 'INR',
    paymentMethod: 'UPI',
    status: 'captured',
    createdAt: '2026-02-15T11:45:00Z',
    planName: 'AlgoVault Pro — Lifetime License',
    receiptUrl: 'https://algovault.dev/receipts/ORD-2026-0215-9921.pdf',
  },
  {
    id: 'pay_002',
    orderNumber: 'ORD-2026-0210-4412',
    userId: 'usr_sarah_002',
    userEmail: 'sarah.chen@tech.org',
    userName: 'Sarah Chen',
    gatewayOrderId: 'order_RZP771920019',
    gatewayPaymentId: 'pay_RZP_881920031',
    amount: 1499,
    currency: 'INR',
    paymentMethod: 'Credit Card',
    status: 'captured',
    createdAt: '2026-02-10T14:25:00Z',
    planName: 'AlgoVault Pro — Lifetime License',
    receiptUrl: 'https://algovault.dev/receipts/ORD-2026-0210-4412.pdf',
  },
  {
    id: 'pay_003',
    orderNumber: 'ORD-2026-0301-1194',
    userId: 'usr_david_003',
    userEmail: 'david.k@quantfunds.ch',
    userName: 'David Keller (HFT Systems)',
    gatewayOrderId: 'order_RZP661928371',
    gatewayPaymentId: 'pay_RZP_771920941',
    amount: 1499,
    currency: 'INR',
    paymentMethod: 'Credit Card',
    status: 'captured',
    createdAt: '2026-03-01T16:20:00Z',
    planName: 'AlgoVault Pro — Lifetime License',
    receiptUrl: 'https://algovault.dev/receipts/ORD-2026-0301-1194.pdf',
  },
];

export const INITIAL_RELEASES: ReleaseRecord[] = [
  {
    version: '1.4.2',
    releaseTag: 'v1.4.2 Stable',
    releaseDate: 'March 1, 2026',
    isLatest: true,
    highlights: [
      'Added Invariant-Check Mode in spaced repetition popups',
      'Native Apple Silicon M3/M4 NEON vector optimizations for sub-millisecond local fuzzy search',
      'Windows 11 Fluent dark acrylic backdrop support',
      'Automated local Git repository commit-on-save option',
      'Added LaTeX formula and ASCII tree visualizer parser',
    ],
    macArm64: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2-arm64.dmg',
      sha256: '9a72df882b5f6e80b2a7e4b9319e09d1c7f4621c8b939f82d091e92f7b889311',
      size: '84.6 MB',
    },
    macIntel: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2-x64.dmg',
      sha256: '3f82a1c0989d28e71b2390ab82910cd982f6e100a7b9821ef9a8276f10928a44',
      size: '89.2 MB',
    },
    windowsExe: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-Setup-1.4.2-x64.exe',
      sha256: '710928a443f82a1c0989d28e71b2390ab82910cd982f6e100a7b9821ef9a8276',
      size: '91.2 MB',
    },
    windowsZip: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2-portable.zip',
      sha256: 'a8276f10928a443f82a1c0989d28e71b2390ab82910cd982f6e100a7b9821ef9',
      size: '94.8 MB',
    },
    linuxAppImage: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2.AppImage',
      sha256: 'b2390ab82910cd982f6e100a7b9821ef9a8276f10928a443f82a1c0989d28e71',
      size: '96.4 MB',
    },
  },
  {
    version: '1.4.1',
    releaseTag: 'v1.4.1 Maintenance',
    releaseDate: 'February 12, 2026',
    isLatest: false,
    highlights: [
      'Resolved LeetCode premium session cookie parsing glitch',
      'Added dark mode contrast calibration for OLED displays',
      'Fixed Windows clipboard capture shortcut conflict',
    ],
    macArm64: {
      url: 'https://releases.algovault.dev/v1.4.1/AlgoVault-1.4.1-arm64.dmg',
      sha256: '6e80b2a7e4b9319e09d1c7f4621c8b939f82d091e92f7b8893119a72df882b5f',
      size: '83.9 MB',
    },
    macIntel: {
      url: 'https://releases.algovault.dev/v1.4.1/AlgoVault-1.4.1-x64.dmg',
      sha256: '1b2390ab82910cd982f6e100a7b9821ef9a8276f10928a443f82a1c0989d28e7',
      size: '88.5 MB',
    },
    windowsExe: {
      url: 'https://releases.algovault.dev/v1.4.1/AlgoVault-Setup-1.4.1-x64.exe',
      sha256: '982f6e100a7b9821ef9a8276710928a443f82a1c0989d28e71b2390ab82910cd',
      size: '90.4 MB',
    },
    windowsZip: {
      url: 'https://releases.algovault.dev/v1.4.1/AlgoVault-1.4.1-portable.zip',
      sha256: '82910cd982f6e100a7b9821ef9a8276f10928a443f82a1c0989d28e71b2390ab',
      size: '93.9 MB',
    },
    linuxAppImage: {
      url: 'https://releases.algovault.dev/v1.4.1/AlgoVault-1.4.1.AppImage',
      sha256: '0989d28e71b2390ab82910cd982f6e100a7b9821ef9a8276f10928a443f82a1c',
      size: '95.8 MB',
    },
  },
];

export const MOCK_USER_PROGRESS: LearningProgress = {
  totalSolved: 142,
  totalProblemsInVault: 280,
  currentStreakDays: 19,
  retentionRatePercent: 94,
  topicsProgress: [
    { name: 'Arrays & Two Pointers', percentage: 72, solved: 36, total: 50, color: '#00f0ff' },
    { name: 'Trees & BST', percentage: 48, solved: 24, total: 50, color: '#38bdf8' },
    { name: 'Graphs & BFS/DFS', percentage: 31, solved: 14, total: 45, color: '#6366f1' },
    { name: 'Dynamic Programming', percentage: 54, solved: 27, total: 50, color: '#10b981' },
    { name: 'Stack & Monotonic Stack', percentage: 65, solved: 26, total: 40, color: '#ec4899' },
    { name: 'Binary Search Invariants', percentage: 80, solved: 16, total: 20, color: '#f59e0b' },
  ],
  recentActivity: [
    {
      id: 'act_01',
      action: 'Revised Invariant (Box 4)',
      problemName: 'Trapping Rain Water (LeetCode 42)',
      pattern: 'Two Pointers Monotonicity',
      timestamp: '2 hours ago',
      srsBox: 4,
    },
    {
      id: 'act_02',
      action: 'Saved Solution & Pitfall',
      problemName: 'Course Schedule II (LeetCode 210)',
      pattern: "Topological Sort Kahn's Algo",
      timestamp: 'Yesterday at 9:15 PM',
      srsBox: 1,
    },
    {
      id: 'act_03',
      action: 'Mastered SRS Review (Box 5)',
      problemName: 'Coin Change (LeetCode 322)',
      pattern: '1D Tabulation Space Rolling',
      timestamp: '2 days ago',
      srsBox: 5,
    },
    {
      id: 'act_04',
      action: 'Added Bug Post-Mortem',
      problemName: 'Binary Search Rotated (LeetCode 33)',
      pattern: 'Boundary Invariant Off-By-One',
      timestamp: '3 days ago',
      srsBox: 2,
    },
  ],
};
