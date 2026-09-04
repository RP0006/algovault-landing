export interface DownloadOption {
  platform: 'mac' | 'windows';
  title: string;
  osName: string;
  architecture: string;
  badge: string;
  requirements: string;
  fileSize: string;
  primaryDownloadUrl: string; // Placeholder URL
  secondaryDownloadUrl?: string; // Optional alternative (e.g. Intel dmg or portable zip)
  secondaryLabel?: string;
  cliCommand: string;
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
}

export const APP_CONFIG = {
  appName: 'AlgoVault',
  version: 'v1.4.2',
  releaseTag: 'v1.4.2 Stable · March 2026',
  heroHeadline: 'Your Personal DSA Knowledge Vault.',
  heroDescription:
    'Save coding problems, record approaches and mistakes, organize problems by DSA patterns, and revise them systematically with spaced repetition.',
  
  // Easily replaceable URLs
  downloads: {
    mac: {
      url: 'https://github.com/algovault/algovault/releases/download/v1.4.2/AlgoVault-1.4.2-arm64.dmg',
      intelUrl: 'https://github.com/algovault/algovault/releases/download/v1.4.2/AlgoVault-1.4.2-x64.dmg',
      cli: 'brew install --cask algovault',
      version: '1.4.2',
      fileSize: '84.6 MB',
      osReq: 'macOS 12.0 Monterey or later (Apple Silicon & Intel)',
    },
    windows: {
      url: 'https://github.com/algovault/algovault/releases/download/v1.4.2/AlgoVault-Setup-1.4.2-x64.exe',
      portableUrl: 'https://github.com/algovault/algovault/releases/download/v1.4.2/AlgoVault-1.4.2-portable.zip',
      cli: 'winget install AlgoVault.AlgoVault',
      version: '1.4.2',
      fileSize: '91.2 MB',
      osReq: 'Windows 10 / 11 64-bit',
    },
  },

  // Video Demo placeholder settings
  demoVideo: {
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', // Replace with your real demo video embed or MP4 URL
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
      question: 'Is AlgoVault completely free and offline-first?',
      answer:
        'Yes! AlgoVault is 100% offline-first. All your problems, notes, code snippets, and review history are saved directly on your local disk in clean Markdown (.md) files. There is no telemetry, no mandatory cloud sync, and zero internet connection required to use the app.',
    },
    {
      question: 'How is this better than Notion, Obsidian, or an Excel spreadsheet?',
      answer:
        'Spreadsheets lack native code syntax highlighting and require tedious manual date calculations for spaced repetition. Generic note tools like Notion become sluggish and lack DSA-specific abstractions like time/space complexity badges, pattern taxonomy links, interactive code diffs, and the automated SM-2 review scheduler built into AlgoVault.',
    },
    {
      question: 'How does the Spaced Repetition (SRS) system work for coding?',
      answer:
        'When you finish solving or logging a problem, AlgoVault places it in your review queue. Instead of forcing you to re-type 50 lines of boilerplate, you can do a "Rapid Invariant Check" (5 minutes): review the core condition, verify edge cases, and self-assess whether the mental model is crystal clear. The SM-2 algorithm adjusts future intervals accordingly.',
    },
    {
      question: 'Can I export or backup my notes?',
      answer:
        'Because your entire vault is a folder of standard Markdown and JSON files on your machine, you can initialize a private Git repo with a single click, push to GitHub/GitLab, or sync it via iCloud, Google Drive, or Dropbox effortlessly.',
    },
    {
      question: 'What programming languages are supported?',
      answer:
        'AlgoVault supports syntax highlighting and template snippets for all major languages: C++20, Python 3, Java, TypeScript/JavaScript, Go, Rust, and C#. You can store multiple language implementations side-by-side for each problem.',
    },
    {
      question: 'How do I update to newer versions?',
      answer:
        'Both the macOS and Windows versions come with built-in lightweight update checkers that notify you when a new release is available on GitHub. If you use Homebrew (`brew install --cask algovault`) or Winget (`winget install AlgoVault.AlgoVault`), updates can be installed with a standard terminal command.',
    },
  ] as FAQItem[],
};
