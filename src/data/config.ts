export interface DownloadOption {
  platform: 'mac' | 'windows' | 'linux';
  title: string;
  osName: string;
  architecture: string;
  badge: string;
  requirements: string;
  fileSize: string;
  primaryDownloadUrl: string;
  secondaryDownloadUrl?: string;
  secondaryLabel?: string;
  cliCommand: string;
  sha256?: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  tagline: string;
  description: string;
  highlightBadge: string;
  previewDetails: string[];
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  codeOrTag: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: 'General' | 'Licensing & Pricing' | 'Security & Offline' | 'Technical';
}

export interface PricingPlan {
  id: 'free_trial' | 'pro_lifetime' | 'pro_annual';
  name: string;
  badge?: string;
  popular?: boolean;
  priceInr: number;
  priceUsd: number;
  billingPeriod: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaSubtext: string;
}

export const APP_CONFIG = {
  appName: 'AlgoVault',
  tagline: 'Your Personal DSA Knowledge Vault',
  version: 'v1.4.2',
  releaseTag: 'v1.4.2 Stable · March 2026',
  heroHeadline: 'Your Personal DSA Knowledge Vault.',
  heroDescription:
    'Save coding problems, record approaches and mistakes, organize problems by DSA patterns, and revise them systematically with spaced repetition.',
  
  // Pricing tiers
  pricing: [
    {
      id: 'free_trial',
      name: 'Community Edition',
      priceInr: 0,
      priceUsd: 0,
      billingPeriod: 'Free Forever',
      description: 'Ideal for getting started with local markdown problem logging and basic organization.',
      features: [
        'Single device local vault (1 machine)',
        'Store up to 50 problems with Markdown notes',
        'Basic 3-day spaced repetition intervals',
        'Syntax highlighting for C++, Python, Java',
        'Community Discord support',
      ],
      ctaLabel: 'Download Community',
      ctaSubtext: 'No credit card required',
    },
    {
      id: 'pro_lifetime',
      name: 'Pro Lifetime',
      badge: 'Best Value · Early Supporter',
      popular: true,
      priceInr: 1499,
      priceUsd: 29,
      billingPeriod: 'One-time payment · Lifetime Access',
      description: 'The ultimate desktop toolkit for engineers targeting top-tier tech interviews.',
      features: [
        '3 Activated Machines (Mac, Windows, Linux)',
        'Unlimited problems, invariant notes & tags',
        'Full SuperMemo SM-2 spaced repetition engine',
        'One-click LeetCode, Codeforces & CodeChef importer',
        'Interactive DSA pattern radar & heatmap analytics',
        '100% Offline cryptographic license with zero telemetry',
        'One-click local Git sync & automated backup',
        'Free lifetime software updates & all future v1.x / v2.x releases',
        '30-Day No-Questions-Asked Money Back Guarantee',
      ],
      ctaLabel: 'Get Pro Lifetime',
      ctaSubtext: 'Instant license delivery · Secure Razorpay Checkout',
    },
    {
      id: 'pro_annual',
      name: 'Pro Annual',
      priceInr: 799,
      priceUsd: 15,
      billingPeriod: 'Billed annually',
      description: 'Full Pro features for engineers actively preparing for an upcoming interview loop.',
      features: [
        '2 Activated Machines (Mac & Windows)',
        'Unlimited problems & invariant notes',
        'Full SM-2 spaced repetition engine',
        'One-click contest importer & Git sync',
        'Annual software updates included',
        'Email customer support within 24 hours',
      ],
      ctaLabel: 'Start Pro Annual',
      ctaSubtext: 'Cancel anytime in dashboard',
    },
  ] as PricingPlan[],

  // Download settings
  downloads: {
    mac: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2-arm64.dmg',
      intelUrl: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2-x64.dmg',
      cli: 'brew install --cask algovault',
      version: '1.4.2',
      fileSize: '84.6 MB',
      osReq: 'macOS 12.0 Monterey or later (Apple Silicon M1/M2/M3/M4 & Intel)',
      sha256: '9a72df882b5f6e80b2a7e4b9319e09d1c7f4621c8b939f82d091e92f7b889311',
    },
    windows: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-Setup-1.4.2-x64.exe',
      portableUrl: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2-portable.zip',
      cli: 'winget install AlgoVault.AlgoVault',
      version: '1.4.2',
      fileSize: '91.2 MB',
      osReq: 'Windows 10 / 11 64-bit (x64)',
      sha256: '710928a443f82a1c0989d28e71b2390ab82910cd982f6e100a7b9821ef9a8276',
    },
    linux: {
      url: 'https://releases.algovault.dev/v1.4.2/AlgoVault-1.4.2.AppImage',
      debUrl: 'https://releases.algovault.dev/v1.4.2/algovault_1.4.2_amd64.deb',
      cli: 'snap install algovault',
      version: '1.4.2',
      fileSize: '96.4 MB',
      osReq: 'Ubuntu 20.04+, Fedora 36+, Arch Linux x86_64',
      sha256: 'b2390ab82910cd982f6e100a7b9821ef9a8276f10928a443f82a1c0989d28e71',
    },
  },

  // Video Demo placeholder settings
  demoVideo: {
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    videoTitle: 'AlgoVault 3-Minute Walkthrough: From Invariant to Interview Offer',
    duration: '03:42',
    resolution: '4K 60fps Native UI',
  },

  features: [
    {
      id: 'problem-management',
      iconName: 'FolderGit2',
      title: 'Problem Management',
      tagline: 'Zero-friction problem capture',
      description:
        'Store and catalog problems from LeetCode, Codeforces, and CodeChef. Automatically extract problem statement, input constraints, and company tags into offline Markdown files.',
      highlightBadge: 'Offline First',
      previewDetails: ['Single-key LeetCode import', 'Custom Markdown with LaTeX math', 'Local Git sync & file backup'],
    },
    {
      id: 'dsa-patterns',
      iconName: 'Network',
      title: 'DSA Patterns Taxonomy',
      tagline: 'Think in templates, not ad-hoc tricks',
      description:
        'Map every problem into 24+ foundational algorithmic patterns: Two Pointers, Monotonic Stack, Sliding Window, Topological Sort, and 2D DP memoization.',
      highlightBadge: '24+ Patterns',
      previewDetails: ['Structural invariant cheat-sheets', 'Pattern correlation graph', 'Cross-problem similarities'],
    },
    {
      id: 'notes-pitfalls',
      iconName: 'PenTool',
      title: 'Intuition & Pitfall Notes',
      tagline: 'Never repeat the same bug twice',
      description:
        'Differentiate between your initial brute force, optimal invariant, and specific edge-case bugs (off-by-one, overflow, empty inputs) with dedicated pitfall callouts.',
      highlightBadge: 'Bug Prevention',
      previewDetails: ['"Aha! Moment" callout boxes', 'Before/After code diff visualizer', 'Interview blunders log'],
    },
    {
      id: 'revision-engine',
      iconName: 'Repeat',
      title: 'Systematic Revision',
      tagline: 'SuperMemo SM-2 spaced repetition',
      description:
        'Problems resurface right before memory decay kicks in. Rate your retention (Hard, Good, Easy) to schedule optimal revision intervals with zero mental overhead.',
      highlightBadge: 'SRS Algorithm',
      previewDetails: ['SM-2 interval calculation', 'Daily 15-minute warmup queue', 'Forgetting-curve optimizer'],
    },
    {
      id: 'search-filter',
      iconName: 'Zap',
      title: 'Instant Fuzzy Search',
      tagline: 'Sub-millisecond global lookup',
      description:
        'Find any problem, code snippet, or pattern in under 1ms. Filter instantly by company (Google, Meta, Citadel), difficulty, pattern tag, or time complexity.',
      highlightBadge: 'Sub-1ms Speed',
      previewDetails: ['⌘K Global command palette', 'Filter by O(N) vs O(1) space', 'Regex & code snippet querying'],
    },
    {
      id: 'progress-analytics',
      iconName: 'TrendingUp',
      title: 'Progress & Mastery',
      tagline: 'Visual interview readiness score',
      description:
        'Watch your pattern mastery evolve with GitHub-style activity heatmaps, retention decay curves, and categorical confidence radar diagrams.',
      highlightBadge: 'Retention Index',
      previewDetails: ['Streak tracking & streak freeze', 'Pattern coverage radar', 'Readiness score for interviews'],
    },
  ] as FeatureItem[],

  howItWorks: [
    {
      stepNumber: '01',
      title: 'Capture Problem & Context',
      subtitle: 'Import in one keystroke',
      description:
        'Save any problem straight from your browser or editor. AlgoVault populates problem constraints, sample test cases, and your first thought attempt.',
      metric: '< 5 sec import',
      codeOrTag: 'leetcode.com/problems/trapping-rain-water',
    },
    {
      stepNumber: '02',
      title: 'Isolate the Invariant & Pitfalls',
      subtitle: 'Deconstruct into core patterns',
      description:
        'Categorize by algorithmic pattern (e.g. Monotonic Decreasing Stack). Write down the critical condition and the exact mistake that caused a TLE or Wrong Answer.',
      metric: '24 Core Patterns',
      codeOrTag: 'Invariant: stack[top] >= height[i]',
    },
    {
      stepNumber: '03',
      title: 'Automated Spaced Repetition',
      subtitle: 'The SM-2 interval engine',
      description:
        'AlgoVault schedules your next review at day 1, 3, 7, 16, and 35. Instead of re-solving 500 problems from scratch, review key invariants in 15 minutes a day.',
      metric: '94% Retention Rate',
      codeOrTag: 'Next Review: Day 7 (Box 4)',
    },
    {
      stepNumber: '04',
      title: 'Master Real Technical Rounds',
      subtitle: 'Pattern recognition under pressure',
      description:
        'When an interviewer asks a variation, you recognize the pattern signature in seconds rather than panicking. Speak with crisp asymptotic confidence.',
      metric: 'Interview Ready',
      codeOrTag: 'Result: Offer Secured 🎉',
    },
  ] as HowItWorksStep[],

  faqs: [
    {
      question: 'How does the commercial license work? Is it a subscription or one-time payment?',
      answer:
        'The Pro Lifetime plan is a single one-time payment of ₹1,499 (or $29 USD). You own the desktop software perpetually with no recurring fees, no surprise renewals, and free lifetime updates for all v1.x and v2.x releases. We also offer an annual option for shorter preparation horizons.',
      category: 'Licensing & Pricing',
    },
    {
      question: 'How many computers or devices can I activate with one license?',
      answer:
        'Each Pro Lifetime license permits activation on up to 3 personal machines concurrently (for example, your MacBook, your Windows gaming PC, and a Linux workstation). You can seamlessly manage, rename, or deactivate old devices anytime directly from your User Dashboard.',
      category: 'Licensing & Pricing',
    },
    {
      question: 'Do I need an active internet connection to use AlgoVault?',
      answer:
        'No! AlgoVault is 100% offline-first. When you purchase, a cryptographically signed offline license certificate is delivered to your desktop app. From that point forward, all problem storage, note editing, SRS interval calculations, search, and visualizations run entirely locally on your hardware with zero network connectivity required.',
      category: 'Security & Offline',
    },
    {
      question: 'How does device activation work? Do I have to manually paste long license keys?',
      answer:
        'No manual key typing is needed! After purchase, simply click "Connect Desktop App" in your web dashboard. It triggers a custom OS deep-link (algovault://activate?token=...) that automatically authorizes and binds your desktop client in under 2 seconds. Alternatively, you can log in directly inside the desktop app using your account credentials.',
      category: 'Licensing & Pricing',
    },
    {
      question: 'What payment methods do you support? Is checkout safe?',
      answer:
        'We use Razorpay (India & international). You can pay seamlessly via UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit cards (Visa, Mastercard, RuPay, American Express), and NetBanking. All transactions are 256-bit SSL encrypted, PCI-DSS Level 1 compliant, and verified via secure server-side HMAC signatures.',
      category: 'Licensing & Pricing',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'We offer a full 30-day "No-Questions-Asked" money-back guarantee. If you decide within 30 days that AlgoVault does not dramatically streamline your DSA preparation, simply send an email to support@algovault.dev or click Request Refund in your dashboard for an instant, full refund.',
      category: 'Licensing & Pricing',
    },
    {
      question: 'How is this better than Notion, Obsidian, or an Excel spreadsheet?',
      answer:
        'Spreadsheets lack native code syntax highlighting and require tedious manual date calculations for spaced repetition. Generic note tools like Notion become sluggish and lack DSA-specific abstractions like time/space complexity badges, pattern taxonomy links, interactive code diffs, and the automated SM-2 review scheduler built into AlgoVault.',
      category: 'General',
    },
    {
      question: 'How does the Spaced Repetition (SRS) system work for coding?',
      answer:
        'When you finish solving or logging a problem, AlgoVault places it in your review queue. Instead of forcing you to re-type 50 lines of boilerplate, you can do a "Rapid Invariant Check" (5 minutes): review the core condition, verify edge cases, and self-assess whether the mental model is crystal clear. The SM-2 algorithm adjusts future intervals accordingly.',
      category: 'General',
    },
    {
      question: 'Can I export or backup my notes?',
      answer:
        'Because your entire vault is a folder of standard Markdown and JSON files on your machine, you can initialize a private Git repo with a single click, push to GitHub/GitLab, or sync it via iCloud, Google Drive, or Dropbox effortlessly.',
      category: 'Technical',
    },
    {
      question: 'What programming languages are supported?',
      answer:
        'AlgoVault supports syntax highlighting and template snippets for all major languages: C++20, Python 3, Java, TypeScript/JavaScript, Go, Rust, and C#. You can store multiple language implementations side-by-side for each problem.',
      category: 'Technical',
    },
  ] as FAQItem[],
};
