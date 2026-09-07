import React, { useState } from 'react';
import { Apple, Monitor, Terminal, Download, ShieldCheck, Copy, Check } from 'lucide-react';
import { APP_CONFIG } from '../../data/config';
import { useToast } from '../../context/ToastContext';
import { trackEvent } from '../../services/analytics';

export const DownloadsView: React.FC = () => {
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (platform: string) => {
    trackEvent('download_clicked', { platform, source: 'dashboard' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Desktop Application Downloads
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Download verified binaries for your active Pro license. Current build: v{APP_CONFIG.version}.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* macOS */}
        <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Apple size={28} color="#fff" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>macOS Universal</h3>
              <span style={{ fontSize: '0.78rem', color: '#00f0ff' }}>Apple Silicon (M1–M4) & Intel</span>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
            {APP_CONFIG.downloads.mac.osReq}. Size: {APP_CONFIG.downloads.mac.fileSize}.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            <a
              href={APP_CONFIG.downloads.mac.url}
              onClick={() => handleDownload('mac-arm64')}
              className="btn-primary"
              style={{ padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <Download size={16} />
              <span>Download Apple Silicon DMG</span>
            </a>
            <a
              href={APP_CONFIG.downloads.mac.intelUrl}
              onClick={() => handleDownload('mac-intel')}
              className="btn-secondary"
              style={{ padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <Download size={16} />
              <span>Download Intel DMG</span>
            </a>
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Terminal: <code>{APP_CONFIG.downloads.mac.cli}</code>
          </div>
        </div>

        {/* Windows */}
        <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Monitor size={28} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Windows 10 / 11</h3>
              <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>64-bit Installer & Portable</span>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
            {APP_CONFIG.downloads.windows.osReq}. Size: {APP_CONFIG.downloads.windows.fileSize}.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            <a
              href={APP_CONFIG.downloads.windows.url}
              onClick={() => handleDownload('win-exe')}
              className="btn-primary"
              style={{ padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <Download size={16} />
              <span>Download Windows Setup .exe</span>
            </a>
            <a
              href={APP_CONFIG.downloads.windows.portableUrl}
              onClick={() => handleDownload('win-zip')}
              className="btn-secondary"
              style={{ padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <Download size={16} />
              <span>Download Portable ZIP</span>
            </a>
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Winget: <code>{APP_CONFIG.downloads.windows.cli}</code>
          </div>
        </div>

        {/* Linux */}
        <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Terminal size={28} color="#10b981" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Linux Builds</h3>
              <span style={{ fontSize: '0.78rem', color: '#10b981' }}>Ubuntu, Fedora, Arch</span>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
            {APP_CONFIG.downloads.linux.osReq}. Size: {APP_CONFIG.downloads.linux.fileSize}.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            <a
              href={APP_CONFIG.downloads.linux.url}
              onClick={() => handleDownload('linux-appimage')}
              className="btn-primary"
              style={{ padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <Download size={16} />
              <span>Download AppImage</span>
            </a>
            <a
              href={APP_CONFIG.downloads.linux.debUrl}
              onClick={() => handleDownload('linux-deb')}
              className="btn-secondary"
              style={{ padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <Download size={16} />
              <span>Download .deb Package</span>
            </a>
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Snap: <code>{APP_CONFIG.downloads.linux.cli}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
