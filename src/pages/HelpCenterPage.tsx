import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const HelpCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'install' | 'activation' | 'git' | 'hotkeys'>('install');

  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        <div className="section-header">
          <span className="section-tag">Documentation & Knowledge Base</span>
          <h1 className="section-title">
            AlgoVault <span className="text-gradient">Help Center</span>
          </h1>
          <p className="section-desc">
            Guides, cheat-sheets, and step-by-step instructions for installing and optimizing your desktop vault experience.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '36px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          <button
            onClick={() => setActiveTab('install')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              color: activeTab === 'install' ? '#00f0ff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'install' ? '2px solid #00f0ff' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Installation Guides
          </button>
          <button
            onClick={() => setActiveTab('activation')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              color: activeTab === 'activation' ? '#00f0ff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'activation' ? '2px solid #00f0ff' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Device & License Activation
          </button>
          <button
            onClick={() => setActiveTab('git')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              color: activeTab === 'git' ? '#00f0ff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'git' ? '2px solid #00f0ff' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Local Git Backup Setup
          </button>
          <button
            onClick={() => setActiveTab('hotkeys')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              color: activeTab === 'hotkeys' ? '#00f0ff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'hotkeys' ? '2px solid #00f0ff' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Keyboard Shortcuts (⌘K)
          </button>
        </div>

        {/* Tab Content */}
        <div className="glass-card" style={{ padding: '36px', borderRadius: '20px', lineHeight: 1.7, color: '#cbd5e1' }}>
          {activeTab === 'install' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                Installing on macOS and Windows
              </h3>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#00f0ff', fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>macOS (Apple Silicon & Intel)</h4>
                <p style={{ marginBottom: '10px', fontSize: '0.92rem' }}>
                  1. Download the universal <code>.dmg</code> installer from the <Link to="/download" style={{ color: '#38bdf8' }}>Downloads Page</Link>.<br />
                  2. Double-click the DMG and drag the AlgoVault icon into your Applications folder.<br />
                  3. If installing via Homebrew terminal:
                </p>
                <div className="code-block" style={{ marginBottom: '12px' }}>
                  <code>brew install --cask algovault</code>
                </div>
              </div>

              <div>
                <h4 style={{ color: '#00f0ff', fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Windows 10 / 11</h4>
                <p style={{ marginBottom: '10px', fontSize: '0.92rem' }}>
                  1. Run <code>AlgoVault-Setup-1.4.2-x64.exe</code> and follow the installation wizard.<br />
                  2. Or install via Windows Package Manager (Winget):
                </p>
                <div className="code-block">
                  <code>winget install AlgoVault.AlgoVault</code>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activation' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                How Device Activation Works
              </h3>
              <p style={{ marginBottom: '18px', fontSize: '0.95rem' }}>
                AlgoVault provides a seamless 2-second activation experience with zero manual copy-pasting required:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <strong style={{ color: '#fff' }}>Method 1: One-Click Deep Link (Recommended)</strong>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '4px' }}>
                    Open your <Link to="/dashboard" style={{ color: '#00f0ff' }}>User Dashboard</Link> and click "Connect Desktop App". It launches your desktop client and signs the offline certificate automatically.
                  </p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <strong style={{ color: '#fff' }}>Method 2: In-App Account Login</strong>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '4px' }}>
                    Launch AlgoVault on your desktop and log in with your registered email and password. Your active Pro license will be discovered and attached immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'git' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                Setting Up Local Git Sync & Automated Backup
              </h3>
              <p style={{ marginBottom: '16px', fontSize: '0.95rem' }}>
                Because your vault is a directory of standard Markdown files, syncing to a private GitHub repository is completely free and private:
              </p>
              <div className="code-block" style={{ marginBottom: '16px' }}>
                <code>cd ~/Documents/AlgoVault && git init && git remote add origin git@github.com:youruser/my-dsa-vault.git</code>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                In AlgoVault Settings → Git Sync, toggle <em>"Commit on Save"</em> to automatically snapshot your invariant revisions with clean Git diffs.
              </p>
            </div>
          )}

          {activeTab === 'hotkeys' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                Global Desktop Keyboard Shortcuts
              </h3>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>macOS</th>
                      <th>Windows / Linux</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Global Command Palette</td>
                      <td><code>⌘ + K</code></td>
                      <td><code>Ctrl + K</code></td>
                    </tr>
                    <tr>
                      <td>Quick Capture Problem</td>
                      <td><code>⌘ + N</code></td>
                      <td><code>Ctrl + N</code></td>
                    </tr>
                    <tr>
                      <td>Start Daily SRS Warmup</td>
                      <td><code>⌘ + R</code></td>
                      <td><code>Ctrl + R</code></td>
                    </tr>
                    <tr>
                      <td>Toggle Invariant / Pitfall Box</td>
                      <td><code>⌘ + I</code></td>
                      <td><code>Ctrl + I</code></td>
                    </tr>
                    <tr>
                      <td>Save & Git Snapshot</td>
                      <td><code>⌘ + S</code></td>
                      <td><code>Ctrl + S</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
