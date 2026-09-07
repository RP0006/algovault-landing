import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  highlight: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Sarah Chen',
    role: 'Staff Software Engineer',
    company: 'Meta (Instagram Core)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    quote:
      'I used to have 8 different Google Docs and Notion tables that took 10 seconds to load. AlgoVault opens in 100ms offline. Logging problem invariants and pitfalls saved me during my E6 system coding rounds.',
    highlight: 'Saved me in E6 system rounds',
  },
  {
    name: 'Aditya V. Sharma',
    role: 'L5 Software Development Engineer',
    company: 'Amazon Web Services (AWS)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    quote:
      'The spaced repetition engine (SM-2) is the killer feature. Instead of re-solving 400 LeetCode problems blindly every 6 months, a 15-minute daily invariant warmup keeps all 24 core patterns razor-sharp.',
    highlight: '15-minute daily invariant warmup',
  },
  {
    name: 'David Keller',
    role: 'Quant Execution Engineer',
    company: 'High-Frequency Trading Systems',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    quote:
      'As a C++ engineer, zero telemetry and native speed matter to me. The local Markdown files sit directly in my private Git repo. You own your data completely. Worth 10x the one-time ₹1,499 price.',
    highlight: 'Zero telemetry & native local Git sync',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Tested by Top Engineers</span>
          <h2 className="section-title">
            From LeetCode Grinding to <span className="text-gradient">Asymptotic Mastery</span>
          </h2>
          <p className="section-desc">
            Trusted by engineers at top tech companies, quant funds, and ambitious startups preparing for high-stakes rounds.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '32px 28px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#00f0ff" color="#00f0ff" />
                  ))}
                </div>

                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#00f0ff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '12px',
                  }}
                >
                  "{t.highlight}"
                </div>

                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '24px' }}>
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '18px' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {t.role} · <span style={{ color: '#38bdf8' }}>{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
