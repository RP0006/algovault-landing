import React, { useState } from 'react';
import { Apple, Monitor, Terminal, Copy, Check, Download, ShieldCheck, HardDrive, Cpu, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import { useToast } from '../context/ToastContext';
import { trackEvent } from '../services/analytics';
import { Link } from 'react-router-dom';

export const DownloadPage: React.FC = () => {
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadClick = (platform: string) => {
    trackEvent('download_clicked', { platform, version: APP_CONFIG.version });
  };

  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Direct Desktop Downloads</span>
          <h1 className="section-title">
            Download <span className="text-gradient">AlgoVault Desktop</span>
          </h1>
          <p className="section-desc">
            Production-ready native installers for macOS, Windows, and Linux. Zero telemetry, sub-millisecond local search,
            and cryptographic offline verification.
          </p>
        </div>

        {/* 3 Large Platform Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '60px',
          }}
        >
          {/* macOS Card */}
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '22px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Apple size={26} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>macOS</h3>
                <span style={{ fontSize: '0.8rem', color: '#00f0ff' }}>Apple Silicon (M1–M4) & Intel</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
              {APP_CONFIG.downloads.mac.osReq}. Native ARM64 build utilizes vector NEON SIMD instructions for sub-millisecond search.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <a
                href={APP_CONFIG.downloads.mac.url}
                onClick={() => handleDownloadClick('mac-arm64')}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none' }}
              >
                <Download size={16} />
                <span>Download Apple Silicon (.dmg)</span>
              </a>

              <a
                href={APP_CONFIG.downloads.mac.intelUrl}
                onClick={() => handleDownloadClick('mac-intel')}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none' }}
              >
                <Download size={16} />
                <span>Download Intel x64 (.dmg)</span>
              </a>
            </div>

            {/* CLI Command */}
            <div style={{ background: 'rgba(6, 10, 20, 0.8)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase' }}>Homebrew Cask</span>
                <button
                  onClick={() => handleCopy(APP_CONFIG.downloads.mac.cli, 'mac-brew', 'Homebrew command')}
                  style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.76rem' }}
                >
                  {copiedKey === 'mac-brew' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code style={{ fontSize: '0.82rem', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
                {APP_CONFIG.downloads.mac.cli}
              </code>
            </div>
          </div>

          {/* Windows Card */}
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '22px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Monitor size={26} color="#38bdf8" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Windows</h3>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8' }}>Windows 10 / 11 64-bit</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
              {APP_CONFIG.downloads.windows.osReq}. Features Fluent dark acrylic theming and native Windows file association.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <a
                href={APP_CONFIG.downloads.windows.url}
                onClick={() => handleDownloadClick('win-exe')}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none' }}
              >
                <Download size={16} />
                <span>Download Windows Installer (.exe)</span>
              </a>

              <a
                href={APP_CONFIG.downloads.windows.portableUrl}
                onClick={() => handleDownloadClick('win-zip')}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none' }}
              >
                <Download size={16} />
                <span>Download Portable (.zip)</span>
              </a>
            </div>

            {/* Winget CLI */}
            <div style={{ background: 'rgba(6, 10, 20, 0.8)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase' }}>Winget Package</span>
                <button
                  onClick={() => handleCopy(APP_CONFIG.downloads.windows.cli, 'win-cli', 'Winget command')}
                  style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.76rem' }}
                >
                  {copiedKey === 'win-cli' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code style={{ fontSize: '0.82rem', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
                {APP_CONFIG.downloads.windows.cli}
              </code>
            </div>
          </div>

          {/* Linux Card */}
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '22px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Terminal size={26} color="#10b981" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Linux</h3>
                <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Ubuntu, Fedora, Arch</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
              {APP_CONFIG.downloads.linux.osReq}. Self-contained AppImage bundle requiring zero external dependencies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <a
                href={APP_CONFIG.downloads.linux.url}
                onClick={() => handleDownloadClick('linux-appimage')}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none' }}
              >
                <Download size={16} />
                <span>Download AppImage (x86_64)</span>
              </a>

              <a
                href={APP_CONFIG.downloads.linux.debUrl}
                onClick={() => handleDownloadClick('linux-deb')}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none' }}
              >
                <Download size={16} />
                <span>Download Debian (.deb)</span>
              </a>
            </div>

            {/* Snap CLI */}
            <div style={{ background: 'rgba(6, 10, 20, 0.8)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase' }}>Snap Package</span>
                <button
                  onClick={() => handleCopy(APP_CONFIG.downloads.linux.cli, 'linux-cli', 'Snap command')}
                  style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.76rem' }}
                >
                  {copiedKey === 'linux-cli' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code style={{ fontSize: '0.82rem', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
                {APP_CONFIG.downloads.linux.cli}
              </code>
            </div>
          </div>
        </div>

        {/* Checksums & Verification Box */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <ShieldCheck size={22} color="#10b981" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Cryptographic Verification & Checksums</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
            Verify installer authenticity using SHA-256 before launching on your local workstation:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
              <span style={{ color: '#cbd5e1' }}>macOS Apple Silicon (v1.4.2):</span>
              <code style={{ color: '#00f0ff' }}>{APP_CONFIG.downloads.mac.sha256}</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
              <span style={{ color: '#cbd5e1' }}>Windows x64 Installer (v1.4.2):</span>
              <code style={{ color: '#00f0ff' }}>{APP_CONFIG.downloads.windows.sha256}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
