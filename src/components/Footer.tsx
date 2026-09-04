import React from 'react';
import { Layers, ArrowUp } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(56, 189, 248, 0.15)',
        background: 'rgba(3, 5, 10, 0.95)',
        padding: '70px 0 36px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(37, 99, 235, 0.4) 100%)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Layers size={18} color="#00f0ff" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Algo<span style={{ color: '#00f0ff' }}>Vault</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
              The native knowledge vault for competitive programmers and software engineers preparing for top tech interviews.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                  e.currentTarget.style.borderColor = '#00f0ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                title="Twitter / X"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                  e.currentTarget.style.borderColor = '#00f0ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                title="Discord Community"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                  e.currentTarget.style.borderColor = '#00f0ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Patterns */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', marginBottom: '18px' }}>
              DSA Patterns
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#94a3b8' }}>
              <span style={{ cursor: 'default' }}>Two Pointers & Sliding Window</span>
              <span style={{ cursor: 'default' }}>Monotonic Queue & Stack</span>
              <span style={{ cursor: 'default' }}>Dynamic Programming 2D</span>
              <span style={{ cursor: 'default' }}>Binary Search Invariants</span>
              <span style={{ cursor: 'default' }}>Topological Sort & BFS</span>
              <span style={{ cursor: 'default' }}>Disjoint Set Union (DSU)</span>
            </div>
          </div>

          {/* Column 3: App Downloads */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', marginBottom: '18px' }}>
              Downloads
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <a href={APP_CONFIG.downloads.mac.url} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                macOS Apple Silicon (M1/M2/M3)
              </a>
              <a href={APP_CONFIG.downloads.mac.intelUrl} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                macOS Intel DMG
              </a>
              <a href={APP_CONFIG.downloads.windows.url} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Windows 10/11 x64 Installer
              </a>
              <a href={APP_CONFIG.downloads.windows.portableUrl} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Windows Portable ZIP
              </a>
              <span style={{ color: '#38bdf8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                Release {APP_CONFIG.version}
              </span>
            </div>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', marginBottom: '18px' }}>
              Resources
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <a href="#showcase" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                App Showcase & Demo
              </a>
              <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Spaced Repetition Guide
              </a>
              <a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Offline Vault Security
              </a>
              <a href="#how-it-works" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                The 4-Step Learning Loop
              </a>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                Offline Architecture 100% Operational
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.84rem',
            color: '#64748b',
          }}
        >
          <div>
            © {new Date().getFullYear()} {APP_CONFIG.appName}. Engineered for competitive programmers worldwide.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.82rem',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#00f0ff';
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
