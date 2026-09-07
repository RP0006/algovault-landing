import React from 'react';
import { Tag, Calendar, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { INITIAL_RELEASES } from '../data/mockData';
import { Link } from 'react-router-dom';

export const ChangelogPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div className="section-header">
          <span className="section-tag">Release History</span>
          <h1 className="section-title">
            AlgoVault <span className="text-gradient">Changelog</span>
          </h1>
          <p className="section-desc">
            Discover what’s new in each version of the AlgoVault desktop client. We ship fast and focus on performance,
            offline reliability, and deep algorithmic workflows.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {INITIAL_RELEASES.map((rel) => (
            <div
              key={rel.version}
              className="glass-card"
              style={{
                padding: '36px',
                borderRadius: '20px',
                border: rel.isLatest ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(56, 189, 248, 0.15)',
                boxShadow: rel.isLatest ? '0 10px 30px -10px rgba(0, 240, 255, 0.2)' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>v{rel.version}</span>
                  {rel.isLatest && (
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        background: 'rgba(0, 240, 255, 0.15)',
                        border: '1px solid #00f0ff',
                        color: '#00f0ff',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      Latest Release
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#64748b' }}>
                  <Calendar size={15} />
                  <span>{rel.releaseDate}</span>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                  What's New in this Version:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {rel.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#94a3b8' }}>
                      <CheckCircle2 size={16} color="#00f0ff" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ color: '#cbd5e1' }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installers checksums */}
              <div
                style={{
                  background: 'rgba(6, 10, 20, 0.7)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  color: '#64748b',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: '#38bdf8' }}>macOS (Apple Silicon arm64):</span>
                  <span>SHA256: {rel.macArm64.sha256.substring(0, 20)}...</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: '#38bdf8' }}>Windows 10/11 x64 Installer:</span>
                  <span>SHA256: {rel.windowsExe.sha256.substring(0, 20)}...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
