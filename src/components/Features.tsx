import React from 'react';
import {
  FolderGit2,
  Network,
  PenTool,
  Repeat,
  Zap,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import type { FeatureItem } from '../data/config';

const iconMap: Record<string, React.ReactNode> = {
  FolderGit2: <FolderGit2 size={24} color="#00f0ff" />,
  Network: <Network size={24} color="#38bdf8" />,
  PenTool: <PenTool size={24} color="#60a5fa" />,
  Repeat: <Repeat size={24} color="#00f0ff" />,
  Zap: <Zap size={24} color="#38bdf8" />,
  TrendingUp: <TrendingUp size={24} color="#60a5fa" />,
};

export const Features: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="features" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Title */}
        <div className="section-header">
          <span className="section-tag">Core Capabilities</span>
          <h2 className="section-title">
            Built for <span className="text-gradient">Engineers Who Want Retention</span>
          </h2>
          <p className="section-desc">
            Stop losing track of solutions in random markdown files or scattered Notion boards. Every feature is
            custom-tailored to solve the specific pain points of technical interview preparation.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {APP_CONFIG.features.map((feature: FeatureItem) => (
            <div
              key={feature.id}
              className="glass-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header with Icon and Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '14px',
                      background: 'rgba(0, 240, 255, 0.08)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)',
                    }}
                  >
                    {iconMap[feature.iconName] || <Zap size={24} color="#00f0ff" />}
                  </div>

                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {feature.highlightBadge}
                  </span>
                </div>

                {/* Title and Tagline */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#f8fafc',
                    marginBottom: '6px',
                  }}
                >
                  {feature.title}
                </h3>
                <div
                  style={{
                    fontSize: '0.84rem',
                    color: '#38bdf8',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}
                >
                  {feature.tagline}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.94rem',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Preview Details / Checklist */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {feature.previewDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      color: '#cbd5e1',
                    }}
                  >
                    <CheckCircle2 size={14} color="#00f0ff" style={{ flexShrink: 0 }} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
