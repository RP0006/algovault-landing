import React from 'react';
import { Download, Laptop, Key, Flame, BrainCircuit, CheckCircle2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USER_PROGRESS } from '../../data/mockData';
import { desktopService } from '../../services/desktopService';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

export const DashboardOverview: React.FC = () => {
  const { user, license, hasProLicense } = useAuth();
  const { showToast } = useToast();

  const handleLaunchDeepLink = () => {
    if (!license) {
      showToast('No active Pro license found. Please purchase a license first.', 'error');
      return;
    }
    const deepLink = desktopService.generateActivationDeepLink(license.licenseKey, user?.id || 'usr');
    window.location.href = deepLink;
    showToast('Sent activation signal to AlgoVault desktop client!', 'success', 'Deep Link Triggered');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome & License Status Banner */}
      <div
        className="glass-card"
        style={{
          padding: '32px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, rgba(14, 25, 52, 0.9) 0%, rgba(6, 12, 28, 0.9) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              Welcome back, {user?.fullName?.split(' ')[0] || 'Engineer'}!
            </h1>
            <span
              className={hasProLicense ? 'badge-status badge-active' : 'badge-status badge-warning'}
            >
              {hasProLicense ? 'Pro License — Active' : 'Community Tier'}
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.94rem', maxWidth: '580px', lineHeight: 1.5 }}>
            Your personal invariant vault is ready. You have{' '}
            <strong style={{ color: '#00f0ff' }}>
              {license?.activeDevicesCount || 2} of {license?.maxDevices || 3}
            </strong>{' '}
            personal machine seats registered.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleLaunchDeepLink}
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <Sparkles size={16} />
            <span>Connect Desktop App</span>
          </button>
          <Link
            to="/dashboard/downloads"
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <Download size={16} />
            <span>Download App</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Problems Solved
            </span>
            <CheckCircle2 size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            {MOCK_USER_PROGRESS.totalSolved}{' '}
            <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 500 }}>
              / {MOCK_USER_PROGRESS.totalProblemsInVault}
            </span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Review Streak
            </span>
            <Flame size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            {MOCK_USER_PROGRESS.currentStreakDays} Days
          </div>
        </div>

        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              SM-2 Retention Rate
            </span>
            <BrainCircuit size={18} color="#00f0ff" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f0ff' }}>
            {MOCK_USER_PROGRESS.retentionRatePercent}%
          </div>
        </div>

        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Active Machine Seats
            </span>
            <Laptop size={18} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>
            {license?.activeDevicesCount || 2} / {license?.maxDevices || 3}
          </div>
        </div>
      </div>

      {/* Topic Completion Progress Bars */}
      <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
            Pattern Completion & Topic Mastery
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
            Arrays 72% | Trees 48% | Graphs 31% | DP 54%
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {MOCK_USER_PROGRESS.topicsProgress.map((topic, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{topic.name}</span>
                <span style={{ color: topic.color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {topic.percentage}% ({topic.solved}/{topic.total})
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${topic.percentage}%`, background: topic.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Activity Heatmap & Recent Activity Log */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Recent Activity */}
        <div className="glass-card" style={{ padding: '26px', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '18px' }}>
            Recent Vault Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {MOCK_USER_PROGRESS.recentActivity.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: 'rgba(0, 240, 255, 0.12)',
                    color: '#00f0ff',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    flexShrink: 0,
                  }}
                >
                  Box {act.srsBox}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {act.problemName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {act.pattern} · <span style={{ color: '#64748b' }}>{act.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Simulation Card */}
        <div className="glass-card" style={{ padding: '26px', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
            Spaced Repetition Review Consistency
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '20px' }}>
            142 problems reviewed across the last 90 days. Daily streak: 19 days.
          </p>

          {/* GitHub-style Heatmap Grid Simulation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(16, 1fr)',
              gap: '6px',
              padding: '16px',
              background: 'rgba(6, 10, 20, 0.7)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {[...Array(96)].map((_, i) => {
              const active = i % 3 === 0 || i % 7 === 0 || i > 75;
              const opacity = active ? (i % 2 === 0 ? 0.9 : 0.5) : 0.08;
              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '3px',
                    background: active ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)',
                    opacity,
                  }}
                  title={`Day ${i + 1}: ${active ? '3 to 5 problems reviewed' : 'Rest day'}`}
                />
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginTop: '12px', fontSize: '0.74rem', color: '#64748b' }}>
            <span>Less</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#00f0ff', opacity: 0.4 }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#00f0ff', opacity: 0.9 }} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};
