import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../data/config';

export const FeaturesPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '64px' }}>
          <span className="section-tag">Engineering Specifications</span>
          <h1 className="section-title">
            Built for <span className="text-gradient">Relentless Problem Solvers</span>
          </h1>
          <p className="section-desc">
            Explore every capability designed to replace scattered Notion pages and spreadsheet logs with a high-performance,
            offline-first knowledge vault.
          </p>
        </div>

        {/* Feature Deep Dive Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '80px' }}>
          {APP_CONFIG.features.map((feat, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={feat.id}
                className="glass-card"
                style={{
                  padding: '44px 36px',
                  borderRadius: '24px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '40px',
                  alignItems: 'center',
                }}
              >
                <div style={{ order: isEven ? 1 : 2 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      background: 'rgba(0, 240, 255, 0.12)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      color: '#00f0ff',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      marginBottom: '16px',
                    }}
                  >
                    <span>{feat.highlightBadge}</span>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                    {feat.title}
                  </h2>
                  <p style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>
                    {feat.tagline}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '24px' }}>
                    {feat.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {feat.previewDetails.map((detail, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff' }} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    order: isEven ? 2 : 1,
                    background: 'rgba(6, 10, 22, 0.9)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '8px', fontFamily: 'var(--font-mono)' }}>
                      algovault://system/{feat.id}
                    </span>
                  </div>

                  <pre
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.84rem',
                      color: '#94a3b8',
                      lineHeight: 1.6,
                      overflowX: 'auto',
                    }}
                  >
                    <code>{`// Invariant Verification & Offline Persistence
struct ${feat.id.replace(/-/g, '_').toUpperCase()} {
    const char* module = "${feat.title}";
    bool is_offline_first = true;
    uint32_t query_latency_us = 340; // < 1ms
    const char* pattern_class = "Production Grade";
};`}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          className="glass-card"
          style={{
            padding: '50px 40px',
            borderRadius: '24px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(14, 25, 52, 0.9) 0%, rgba(6, 10, 22, 0.9) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
            Ready to Build Your Personal Invariant Vault?
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 28px', fontSize: '1rem', lineHeight: 1.6 }}>
            Download the desktop client or get the Pro Lifetime license for multi-machine synchronization and offline signing.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pricing" className="btn-primary" style={{ padding: '12px 28px', textDecoration: 'none' }}>
              <span>View Pricing & Plans</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/download" className="btn-secondary" style={{ padding: '12px 28px', textDecoration: 'none' }}>
              <span>Download Free</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
