import React from 'react';
import { Layers, ShieldCheck, Terminal, Heart, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div className="section-header">
          <span className="section-tag">Our Mission & Values</span>
          <h1 className="section-title">
            Why We Built <span className="text-gradient">AlgoVault</span>
          </h1>
          <p className="section-desc">
            The story behind replacing messy Google Docs, bloated Notion databases, and repetitive LeetCode grinding
            with a permanent, offline-first personal knowledge vault.
          </p>
        </div>

        {/* Story Section */}
        <div className="glass-card" style={{ padding: '40px', borderRadius: '24px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '18px' }}>
            The Endless "LeetCode Amnesia" Cycle
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8, marginBottom: '20px' }}>
            Every engineer knows the ritual: you spend 4 months grinding 400 LeetCode problems before job hunting. You get an
            offer, accept it, and don’t touch algorithm puzzles for two years.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8, marginBottom: '20px' }}>
            Two years later, when you decide to explore new opportunities, you discover you remember virtually nothing. You have
            to start from two-sum again. Your old code snippets are buried in random scratch folders, untagged Notion pages that
            take 8 seconds to load, or lost completely.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8 }}>
            We realized the problem isn't intelligence or effort—it's the absence of a <strong style={{ color: '#00f0ff' }}>structured personal vault</strong>.
            You don't need to re-type 60 lines of boilerplate every time. You only need to remember the <em style={{ color: '#38bdf8' }}>invariant condition</em>,
            the edge-case bug that bit you, and review it on a scientific spaced repetition schedule.
          </p>
        </div>

        {/* Core Principles */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '24px', textAlign: 'center' }}>
          Our Engineering Principles
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ShieldCheck size={22} color="#00f0ff" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>100% Offline First</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Your problems and notes reside on your hard drive in plain Markdown (.md) files. No mandatory cloud sync, no tracking, and no downtime.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Zap size={22} color="#38bdf8" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Sub-1ms Latency</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Written in optimized native C++ and modern desktop runtimes. Searching 1,000 problems by company tag or code regex takes under a millisecond.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Terminal size={22} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Git & Open Formats</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Your vault is a standard folder. Run `git init`, push to private GitHub or GitLab, or sync with iCloud or Dropbox with zero vendor lock-in.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/pricing" className="btn-primary" style={{ display: 'inline-flex', padding: '14px 32px', textDecoration: 'none' }}>
            Join Engineers Building Their Vault →
          </Link>
        </div>
      </div>
    </div>
  );
};
