import React, { useState } from 'react';
import { Apple, Monitor, Download, Copy, Check, ShieldCheck, HardDrive, Cpu } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const DownloadSection: React.FC = () => {
  const [copiedMacCli, setCopiedMacCli] = useState(false);
  const [copiedWinCli, setCopiedWinCli] = useState(false);

  const copyCli = (command: string, platform: 'mac' | 'windows') => {
    navigator.clipboard.writeText(command);
    if (platform === 'mac') {
      setCopiedMacCli(true);
      setTimeout(() => setCopiedMacCli(false), 2200);
    } else {
      setCopiedWinCli(true);
      setTimeout(() => setCopiedWinCli(false), 2200);
    }
  };

  return (
    <section id="download" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Instant Access</span>
          <h2 className="section-title">
            Download <span className="text-gradient">AlgoVault for Desktop</span>
          </h2>
          <p className="section-desc">
            No signup. No tracking. Pure native performance with zero latency. Install on your primary workstation
            and start organizing your algorithmic knowledge in seconds.
          </p>
        </div>

        {/* Two Large Parallel Cards: macOS and Windows */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* macOS Card */}
          <div
            className="glass-card"
            style={{
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 35px -10px rgba(0, 240, 255, 0.2)',
            }}
          >
            <div>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Apple size={34} />
                </div>

                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#00f0ff',
                  }}
                >
                  Universal Binary (ARM & Intel)
                </span>
              </div>

              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
                macOS
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                Optimized for Apple Silicon (M1/M2/M3/M4) and Intel Macs. Notarized by Apple for instant, secure execution.
              </p>

              {/* Specs list */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '28px',
                  fontSize: '0.86rem',
                  color: '#cbd5e1',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HardDrive size={15} color="#38bdf8" />
                  <span>File size: {APP_CONFIG.downloads.mac.fileSize} (.dmg)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={15} color="#38bdf8" />
                  <span>{APP_CONFIG.downloads.mac.osReq}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={15} color="#10b981" />
                  <span>Signed & Notarized · Offline Verified</span>
                </div>
              </div>

              {/* Terminal Homebrew Command */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}>
                  Or install via Homebrew Cask:
                </div>
                <div className="code-block">
                  <span style={{ userSelect: 'all' }}>{APP_CONFIG.downloads.mac.cli}</span>
                  <button
                    onClick={() => copyCli(APP_CONFIG.downloads.mac.cli, 'mac')}
                    className="copy-btn"
                    title="Copy command"
                  >
                    {copiedMacCli ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copiedMacCli ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={APP_CONFIG.downloads.mac.url}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.02rem' }}
                title="Download Apple Silicon DMG (arm64)"
              >
                <Download size={18} />
                <span>Download for Mac (Apple Silicon DMG)</span>
              </a>

              <a
                href={APP_CONFIG.downloads.mac.intelUrl}
                style={{
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#00f0ff')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                Need Intel x86_64 DMG instead? Click here to download.
              </a>
            </div>
          </div>

          {/* Windows Card */}
          <div
            className="glass-card"
            style={{
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 35px -10px rgba(56, 189, 248, 0.15)',
            }}
          >
            <div>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                  }}
                >
                  <Monitor size={34} />
                </div>

                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#38bdf8',
                  }}
                >
                  64-Bit Installer & Portable
                </span>
              </div>

              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
                Windows
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                Full native Windows support for Windows 10 and 11. Includes standard installer and zero-install portable ZIP.
              </p>

              {/* Specs list */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '28px',
                  fontSize: '0.86rem',
                  color: '#cbd5e1',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HardDrive size={15} color="#38bdf8" />
                  <span>File size: {APP_CONFIG.downloads.windows.fileSize} (.exe)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={15} color="#38bdf8" />
                  <span>{APP_CONFIG.downloads.windows.osReq}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={15} color="#10b981" />
                  <span>Authenticode Signed · No Admin Rights Required</span>
                </div>
              </div>

              {/* Terminal Winget Command */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}>
                  Or install via Windows Package Manager:
                </div>
                <div className="code-block">
                  <span style={{ userSelect: 'all' }}>{APP_CONFIG.downloads.windows.cli}</span>
                  <button
                    onClick={() => copyCli(APP_CONFIG.downloads.windows.cli, 'windows')}
                    className="copy-btn"
                    title="Copy command"
                  >
                    {copiedWinCli ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copiedWinCli ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={APP_CONFIG.downloads.windows.url}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.02rem' }}
                title="Download Windows Installer (.exe)"
              >
                <Download size={18} />
                <span>Download for Windows (Installer .exe)</span>
              </a>

              <a
                href={APP_CONFIG.downloads.windows.portableUrl}
                style={{
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#00f0ff')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                Looking for portable zip (run from USB/thumbdrive)? Click here.
              </a>
            </div>
          </div>
        </div>

        {/* Easy URL Replacement Helper Banner */}
        <div
          style={{
            padding: '16px 24px',
            borderRadius: '14px',
            background: 'rgba(10, 16, 32, 0.7)',
            border: '1px dashed rgba(56, 189, 248, 0.25)',
            fontSize: '0.82rem',
            color: '#94a3b8',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span style={{ color: '#00f0ff', fontWeight: 600 }}>🛠️ Deployment Tip:</span> Update the download links in{' '}
          <code>src/data/config.ts</code> under <code>APP_CONFIG.downloads.mac.url</code> and{' '}
          <code>APP_CONFIG.downloads.windows.url</code> when pushing your GitHub releases.
        </div>
      </div>
    </section>
  );
};
