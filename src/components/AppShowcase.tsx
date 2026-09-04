import React, { useState } from 'react';
import {
  Play,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Flame,
  BrainCircuit,
  Search,
  BookOpen,
  Calendar,
} from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const AppShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'video'>('preview');
  const [activeProblemTab, setActiveProblemTab] = useState<'intuition' | 'code' | 'pitfalls' | 'srs'>('intuition');
  const [copiedCode, setCopiedCode] = useState(false);
  const [srsLevel, setSrsLevel] = useState(4);
  const [srsFeedback, setSrsFeedback] = useState<string | null>(null);

  const sampleCode = `// O(N) Time, O(1) Space - Two Pointer Invariant
int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxLeft = 0, maxRight = 0;
    int totalWater = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= maxLeft) maxLeft = height[left];
            else totalWater += maxLeft - height[left];
            left++;
        } else {
            if (height[right] >= maxRight) maxRight = height[right];
            else totalWater += maxRight - height[right];
            right--;
        }
    }
    return totalWater;
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSrsReview = (rating: 'hard' | 'good' | 'easy') => {
    if (rating === 'easy') {
      setSrsLevel((prev) => Math.min(prev + 1, 6));
      setSrsFeedback('Mastered! Next review scheduled in 14 days.');
    } else if (rating === 'good') {
      setSrsFeedback('Solid recall. Next review in 5 days.');
    } else {
      setSrsLevel(1);
      setSrsFeedback('Reset to Box 1. Will reappear tomorrow morning.');
    }
    setTimeout(() => setSrsFeedback(null), 4000);
  };

  return (
    <section id="showcase" style={{ padding: '60px 0 100px', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Cinematic Desktop Experience</span>
          <h2 className="section-title">
            Engineered for <span className="text-gradient">Relentless Problem Solvers</span>
          </h2>
          <p className="section-desc">
            A native interface that gets out of your way. Fast, offline-first, and purpose-built to turn random LeetCode
            grinding into a permanent mental model.
          </p>
        </div>

        {/* Mode Switcher Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '4px',
              background: 'rgba(12, 18, 36, 0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '9999px',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setActiveTab('preview')}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                border: 'none',
                background: activeTab === 'preview' ? 'linear-gradient(135deg, #00f0ff 0%, #0284c7 100%)' : 'transparent',
                color: activeTab === 'preview' ? '#04060d' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
              }}
            >
              <BrainCircuit size={16} />
              <span>Interactive App Showcase</span>
            </button>

            <button
              onClick={() => setActiveTab('video')}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                border: 'none',
                background: activeTab === 'video' ? 'linear-gradient(135deg, #00f0ff 0%, #0284c7 100%)' : 'transparent',
                color: activeTab === 'video' ? '#04060d' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
              }}
            >
              <Play size={16} />
              <span>Video Demo Placeholder</span>
            </button>
          </div>
        </div>

        {/* Main Window Mockup Container */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(8, 12, 24, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '24px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 50px -10px rgba(0, 240, 255, 0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Top Window Chrome (macOS / Windows controls) */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(5, 8, 18, 0.9)',
            }}
          >
            {/* Traffic Light Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
              <span
                style={{
                  marginLeft: '12px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#64748b',
                }}
              >
                AlgoVault Desktop — v1.4.2 [~/dsa-vault]
              </span>
            </div>

            {/* Quick Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  color: '#38bdf8',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Flame size={14} color="#f97316" />
                <span>42-day streak</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  color: '#10b981',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                <span>Vault Synced (Offline)</span>
              </div>
            </div>
          </div>

          {/* CONTENT AREA: TAB 1 (Interactive Preview) vs TAB 2 (Video Demo Placeholder) */}
          {activeTab === 'preview' ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 280px) 1fr',
                minHeight: '620px',
              }}
              className="app-mockup-grid"
            >
              {/* Sidebar: DSA Patterns Taxonomy */}
              <div
                style={{
                  borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(5, 8, 16, 0.65)',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
                className="mockup-sidebar"
              >
                {/* Search in app */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(56, 189, 248, 0.15)',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    color: '#64748b',
                  }}
                >
                  <Search size={14} color="#38bdf8" />
                  <span>Quick search (⌘K)...</span>
                </div>

                {/* Collections */}
                <div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#64748b',
                      letterSpacing: '0.08em',
                      marginBottom: '10px',
                      paddingLeft: '6px',
                    }}
                  >
                    DSA Pattern Taxonomy
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {[
                      { name: 'Two Pointers', count: 24, active: true },
                      { name: 'Monotonic Stack', count: 18, active: false },
                      { name: 'Sliding Window', count: 16, active: false },
                      { name: 'Fast & Slow Pointers', count: 12, active: false },
                      { name: 'Binary Search (Bounds)', count: 28, active: false },
                      { name: 'Graph BFS & DFS', count: 32, active: false },
                      { name: 'Dynamic Programming (2D)', count: 45, active: false },
                      { name: 'Trie & Prefix Trees', count: 14, active: false },
                    ].map((pattern, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '0.84rem',
                          fontWeight: pattern.active ? 600 : 500,
                          color: pattern.active ? '#00f0ff' : '#94a3b8',
                          background: pattern.active ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                          border: pattern.active ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <BookOpen size={14} />
                          <span>{pattern.name}</span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#64748b',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {pattern.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SRS Queue Status */}
                <div
                  style={{
                    marginTop: 'auto',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.06) 0%, rgba(37, 99, 235, 0.08) 100%)',
                    border: '1px solid rgba(0, 240, 255, 0.18)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f8fafc' }}>Daily Review Queue</span>
                    <span style={{ fontSize: '0.72rem', color: '#00f0ff', fontWeight: 700 }}>5 due today</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #00f0ff, #38bdf8)' }} />
                  </div>
                </div>
              </div>

              {/* Main Problem Detail Panel */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Problem Meta Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#f87171',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                        }}
                      >
                        Hard
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                        LeetCode #42 · Frequency: 98%
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                      42. Trapping Rain Water
                    </h3>
                  </div>

                  {/* SRS Reminder Banner */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                    }}
                  >
                    <Calendar size={15} color="#10b981" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>
                        Spaced Review: Box {srsLevel} / 6
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Next scheduled in 4 days</div>
                    </div>
                  </div>
                </div>

                {/* Problem Tabs */}
                <div
                  style={{
                    display: 'flex',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    gap: '18px',
                  }}
                >
                  {[
                    { id: 'intuition', label: '1. Core Invariant & Mental Model' },
                    { id: 'code', label: '2. Optimal Implementation' },
                    { id: 'pitfalls', label: '3. Pitfalls & Tricky Bugs' },
                    { id: 'srs', label: '4. Quick Spaced Self-Test' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveProblemTab(tab.id as any)}
                      style={{
                        padding: '10px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeProblemTab === tab.id ? '2px solid #00f0ff' : '2px solid transparent',
                        color: activeProblemTab === tab.id ? '#00f0ff' : '#94a3b8',
                        fontWeight: activeProblemTab === tab.id ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content 1: Intuition */}
                {activeProblemTab === 'intuition' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem', color: '#cbd5e1' }}>
                    <div
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: 'rgba(0, 240, 255, 0.05)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#00f0ff', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} />
                        <span>The Underlying Invariant (Why Two Pointers Work)</span>
                      </div>
                      <p style={{ lineHeight: 1.6 }}>
                        Water trapped at index <code>i</code> is strictly governed by:{' '}
                        <code style={{ color: '#38bdf8' }}>min(maxLeft, maxRight) - height[i]</code>.
                        Because we only care about the smaller boundary, when <code>height[left] &lt;= height[right]</code>,
                        we already know that <code>maxLeft &lt;= maxRight</code> is guaranteed. Hence, we can safely compute trapped
                        water using <code>maxLeft</code> and advance <code>left++</code> without ever needing the exact <code>maxRight</code>!
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block' }}>Time Complexity</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-mono)' }}>O(N) single pass</span>
                      </div>
                      <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block' }}>Space Complexity</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>O(1) auxiliary</span>
                      </div>
                      <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block' }}>Alternative Pattern</span>
                        <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f59e0b' }}>Monotonic Stack (Horizontal bars)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Code */}
                {activeProblemTab === 'code' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                        solution.cpp · Verified against LeetCode 0ms (100% Beat)
                      </span>
                      <button onClick={handleCopyCode} className="copy-btn">
                        {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'rgba(4, 6, 14, 0.95)',
                        border: '1px solid rgba(56, 189, 248, 0.15)',
                        color: '#93c5fd',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.84rem',
                        lineHeight: 1.6,
                        overflowX: 'auto',
                      }}
                    >
                      <code>{sampleCode}</code>
                    </pre>
                  </div>
                )}

                {/* Tab Content 3: Pitfalls */}
                {activeProblemTab === 'pitfalls' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: 'rgba(245, 158, 11, 0.08)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 700, marginBottom: '6px' }}>
                        <AlertTriangle size={16} />
                        <span>Crucial Boundary Mistake (Happened in Mock #3)</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                        Do NOT check <code>height[left] &lt; height[right]</code> strictly! When heights are equal, either pointer
                        can advance. Failing to handle the <code>=</code> condition leads to an infinite while loop or missed column accumulation.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontWeight: 700, marginBottom: '6px' }}>
                        <AlertTriangle size={16} />
                        <span>Empty / Under 3 Elements Edge Case</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                        Arrays of length 0, 1, or 2 can never trap any water. Ensure the loop termination <code>left &lt; right</code> handles this
                        natively or add early return <code>if (height.size() &lt; 3) return 0;</code>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab Content 4: SRS Review Test */}
                {activeProblemTab === 'srs' && (
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      background: 'rgba(12, 20, 42, 0.75)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      textAlign: 'center',
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                      How clearly did you recall the Two-Pointer Invariant?
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '20px' }}>
                      Self-grade your mental clarity. AlgoVault will update the next review interval according to your retention decay.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleSrsReview('hard')}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '8px',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Forgot / Hard (Reset)
                      </button>
                      <button
                        onClick={() => handleSrsReview('good')}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '8px',
                          background: 'rgba(245, 158, 11, 0.15)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          color: '#fbbf24',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Good (5 Days)
                      </button>
                      <button
                        onClick={() => handleSrsReview('easy')}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '8px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          color: '#34d399',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Flawless Recall (14 Days)
                      </button>
                    </div>

                    {srsFeedback && (
                      <div
                        style={{
                          marginTop: '16px',
                          fontSize: '0.85rem',
                          color: '#00f0ff',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                        }}
                      >
                        ✦ {srsFeedback}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* VIDEO DEMO PLACEHOLDER */
            <div
              style={{
                position: 'relative',
                minHeight: '560px',
                background: 'radial-gradient(circle at 50% 50%, rgba(13, 27, 62, 0.8) 0%, rgba(4, 7, 16, 0.95) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px',
                textAlign: 'center',
              }}
            >
              {/* Glowing Play Circle */}
              <a
                href={APP_CONFIG.demoVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to play demo video"
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0284c7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 45px rgba(0, 240, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textDecoration: 'none',
                  color: '#04060d',
                }}
                className="play-pulse-btn"
              >
                <Play size={38} fill="#04060d" style={{ marginLeft: '4px' }} />
              </a>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginBottom: '10px' }}>
                {APP_CONFIG.demoVideo.videoTitle}
              </h3>
              <p style={{ fontSize: '0.98rem', color: '#94a3b8', maxWidth: '580px', marginBottom: '28px' }}>
                Watch how AlgoVault accelerates coding interview prep with instant problem imports, pattern taxonomies,
                and systematic spaced retention.
              </p>

              {/* Video Specs Badges */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
                <span className="badge-pill">
                  <span>Duration: {APP_CONFIG.demoVideo.duration}</span>
                </span>
                <span className="badge-pill">
                  <span>{APP_CONFIG.demoVideo.resolution}</span>
                </span>
                <span className="badge-pill">
                  <span>Offline Ready</span>
                </span>
              </div>

              {/* Easy-to-replace placeholder developer notice */}
              <div
                style={{
                  maxWidth: '680px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  background: 'rgba(0, 240, 255, 0.05)',
                  border: '1px dashed rgba(0, 240, 255, 0.3)',
                  fontSize: '0.84rem',
                  color: '#94a3b8',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: '#00f0ff', fontWeight: 700 }}>💡 Easy Replacement Note:</span> You can embed your real
                walkthrough video by updating the <code>demoVideo.videoUrl</code> property in{' '}
                <code style={{ color: '#38bdf8' }}>src/data/config.ts</code>.
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .app-mockup-grid {
            grid-template-columns: 1fr !important;
          }
          .mockup-sidebar {
            display: none !important;
          }
        }
        .play-pulse-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </section>
  );
};
