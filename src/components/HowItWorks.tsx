import React from 'react';
import { ArrowRight, Target } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import type { HowItWorksStep } from '../data/config';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Systematic Methodology</span>
          <h2 className="section-title">
            From Blank Screen to <span className="text-gradient">Instant Pattern Recall</span>
          </h2>
          <p className="section-desc">
            The 4-step learning feedback loop designed to build deep algorithmic intuition and eliminate the anxiety
            of forgetting previous solutions.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            position: 'relative',
          }}
        >
          {APP_CONFIG.howItWorks.map((step: HowItWorksStep) => (
            <div
              key={step.stepNumber}
              className="glass-card"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              {/* Step indicator pill */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      fontFamily: 'var(--font-mono)',
                      color: '#00f0ff',
                      textShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
                    }}
                  >
                    {step.stepNumber}
                  </span>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                    }}
                  >
                    {step.metric}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#00f0ff', fontWeight: 600, marginBottom: '14px' }}>
                  {step.subtitle}
                </div>

                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
                  {step.description}
                </p>
              </div>

              {/* Code/Tag pill */}
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'rgba(6, 10, 22, 0.85)',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: '#38bdf8',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <code>{step.codeOrTag}</code>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Banner / Quote */}
        <div
          style={{
            marginTop: '48px',
            padding: '24px 32px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(0, 240, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00f0ff',
                flexShrink: 0,
              }}
            >
              <Target size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#f8fafc' }}>
                "Don't practice until you get it right. Practice until you can't get it wrong."
              </div>
              <div style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
                AlgoVault shifts your focus from volume brute-forcing to long-term memory consolidation.
              </div>
            </div>
          </div>

          <a href="#download" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
            <span>Get Started Free</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
