import React, { useState } from 'react';
import { Apple, Monitor, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import { Link } from 'react-router-dom';
import { CheckoutModal } from './CheckoutModal';

export const Hero: React.FC = () => {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <section
      style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Top Release Pill */}
        <div
          className="badge-pill"
          style={{
            marginBottom: '28px',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
          }}
        >
          <span className="pulse-dot" />
          <span>{APP_CONFIG.releaseTag}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: '#e2e8f0' }}>Commercial Desktop Application</span>
        </div>

        {/* Hero Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            maxWidth: '960px',
            marginBottom: '24px',
          }}
        >
          Your Personal{' '}
          <span className="text-gradient" style={{ display: 'inline-block' }}>
            DSA Knowledge
          </span>{' '}
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <span className="text-gradient-electric text-glow">Vault.</span>
            <svg
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '100%',
                height: '8px',
              }}
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q50,0 100,5"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </span>
        </h1>

        {/* Hero Short Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.28rem)',
            color: '#94a3b8',
            maxWidth: '740px',
            lineHeight: 1.65,
            marginBottom: '36px',
            fontWeight: 400,
          }}
        >
          Save coding problems, record approaches and mistakes, organize problems by{' '}
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>DSA patterns</span>, and revise them systematically with{' '}
          <span style={{ color: '#00f0ff', fontWeight: 600 }}>scientific spaced repetition</span> on your desktop.
        </p>

        {/* Dual Primary Commercial CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '24px',
            width: '100%',
            maxWidth: '640px',
          }}
        >
          <button
            onClick={() => setShowCheckout(true)}
            className="btn-primary"
            style={{ flex: '1 1 240px', minWidth: '220px', cursor: 'pointer' }}
            title="Buy AlgoVault Pro Lifetime License"
            id="hero-buy-pro"
          >
            <Sparkles size={20} />
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.98rem', lineHeight: 1.2 }}>Get Pro Lifetime (₹1,499)</span>
              <span style={{ fontSize: '0.72rem', opacity: 0.9, fontWeight: 500 }}>3 Machines · One-time Payment</span>
            </div>
          </button>

          <Link
            to="/download"
            className="btn-secondary"
            style={{ flex: '1 1 240px', minWidth: '220px', textDecoration: 'none' }}
            title="Download Free Community Edition"
            id="hero-download-free"
          >
            <Zap size={20} color="#38bdf8" />
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.98rem', lineHeight: 1.2 }}>Download Desktop App</span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>macOS, Windows, Linux</span>
            </div>
          </Link>
        </div>

        {/* Secondary Navigation Links */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', fontSize: '0.9rem' }}>
          <a href="#showcase" style={{ color: '#00f0ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Explore Native UI Demo</span>
            <ArrowRight size={14} />
          </a>
          <span style={{ color: '#334155' }}>•</span>
          <Link to="/dsa" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Browse 11 DSA Patterns</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick specs & trust points */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.86rem',
            color: '#64748b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="#00f0ff" />
            <span>100% Offline-First</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="#00f0ff" />
            <span>Local Markdown Storage</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="#00f0ff" />
            <span>SM-2 Spaced Repetition</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          planId="pro_lifetime"
          planName="AlgoVault Pro — Lifetime License"
          amountInr={1499}
        />
      )}
    </section>
  );
};
