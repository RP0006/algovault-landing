import React, { useState } from 'react';
import { Key, Copy, Check, ShieldCheck, Sparkles, Laptop, Calendar, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { desktopService } from '../../services/desktopService';
import { Link } from 'react-router-dom';

export const LicenseView: React.FC = () => {
  const { user, license, hasProLicense } = useAuth();
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState(false);

  const licenseKey = license?.licenseKey || 'ALGO-PRO-88F2-A4D1-9842';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    showToast('License key copied to clipboard!', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDeepLinkConnect = () => {
    const deepLink = desktopService.generateActivationDeepLink(licenseKey, user?.id || 'usr_rohit');
    window.location.href = deepLink;
    showToast('Sent activation authorization to desktop application!', 'success', 'Deep Link Triggered');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          License & Entitlements
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Manage your perpetual software license, machine seats, and cryptographic offline certificates.
        </p>
      </div>

      {/* Main License Card */}
      <div
        className="glass-card"
        style={{
          padding: '36px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(14, 25, 52, 0.9) 0%, rgba(6, 12, 28, 0.9) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8), 0 0 35px -10px rgba(0, 240, 255, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.76rem', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Perpetual Desktop Tier
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              AlgoVault Pro — Lifetime License
            </h2>
          </div>
          <span className="badge-status badge-active" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
            Active · Verified
          </span>
        </div>

        {/* License Key Box */}
        <div
          style={{
            background: 'rgba(6, 10, 22, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '14px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
              Personal License Key
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.18rem', fontWeight: 700, color: '#00f0ff', letterSpacing: '0.05em' }}>
              {licenseKey}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopyKey}
              className="copy-btn"
              style={{ padding: '8px 14px', fontSize: '0.84rem' }}
            >
              {copiedKey ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
            </button>

            <button
              onClick={handleDeepLinkConnect}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <Sparkles size={15} />
              <span>Connect Desktop App</span>
            </button>
          </div>
        </div>

        {/* Meta Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>Registered Machine Seats</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Laptop size={18} color="#38bdf8" />
              <span>{license?.activeDevicesCount || 2} of {license?.maxDevices || 3} Active</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>Purchase Order ID</div>
            <div style={{ fontSize: '0.96rem', fontWeight: 600, color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
              {license?.orderId || 'ORD-2026-0215-9921'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>License Validity</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
              Perpetual (Never Expires)
            </div>
          </div>
        </div>
      </div>

      {/* Offline Verification Notice */}
      <div className="glass-card" style={{ padding: '24px 28px', borderRadius: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <ShieldCheck size={22} color="#10b981" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
            Zero Telemetry & Offline Verification Guarantee
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
          When activated, AlgoVault downloads an Ed25519 digitally signed certificate to your local disk.
          You do not need to stay online or verify with our servers to continue problem solving and revision.
        </p>
        <Link to="/dashboard/devices" style={{ color: '#00f0ff', fontSize: '0.86rem', textDecoration: 'none', fontWeight: 600 }}>
          Manage Activated Devices & Machine Seats →
        </Link>
      </div>
    </div>
  );
};
