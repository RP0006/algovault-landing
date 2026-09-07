import React from 'react';
import { Layers, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../data/config';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(56, 189, 248, 0.15)',
        background: 'rgba(3, 5, 10, 0.98)',
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
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', textDecoration: 'none' }}>
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
            </Link>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '18px' }}>
              Your Personal DSA Knowledge Vault. Offline-first desktop software engineered for competitive programmers and software engineers.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
              <ShieldCheck size={16} color="#10b981" />
              <span>Offline Cryptographic Signing · Zero Telemetry</span>
            </div>
          </div>

          {/* Column 2: Product & Features */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', marginBottom: '18px' }}>
              Product
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <Link to="/features" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Features Breakdown
              </Link>
              <Link to="/pricing" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Pricing & Plans
              </Link>
              <Link to="/download" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Download Desktop App
              </Link>
              <Link to="/changelog" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Changelog (v1.4.2)
              </Link>
              <Link to="/dsa" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                DSA Knowledge Vault (11 Topics)
              </Link>
            </div>
          </div>

          {/* Column 3: Resources & Support */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', marginBottom: '18px' }}>
              Resources & Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <Link to="/help" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Help Center & Guides
              </Link>
              <Link to="/faq" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Frequently Asked Questions
              </Link>
              <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                About AlgoVault
              </Link>
              <Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Contact & Enterprise
              </Link>
              <Link to="/login" style={{ color: '#38bdf8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Account Login / Dashboard
              </Link>
            </div>
          </div>

          {/* Column 4: Legal & Policies */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f8fafc', marginBottom: '18px' }}>
              Legal & Policies
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Terms of Service
              </Link>
              <Link to="/refund" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                30-Day Refund Policy
              </Link>
              <Link to="/license-agreement" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                License Agreement (EULA)
              </Link>
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
            © {new Date().getFullYear()} {APP_CONFIG.appName} Inc. All rights reserved. Built for relentless problem solvers.
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
