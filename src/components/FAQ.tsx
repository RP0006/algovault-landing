import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import type { FAQItem } from '../data/config';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ padding: '80px 0 100px', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Frequently Asked Questions</span>
          <h2 className="section-title">
            Everything You Need <span className="text-gradient">to Know</span>
          </h2>
          <p className="section-desc">
            Common questions about local storage, offline mode, spaced repetition, and compatibility.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {APP_CONFIG.faqs.map((faq: FAQItem, idx: number) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '24px 28px',
                  borderRadius: '16px',
                  borderColor: isOpen ? 'rgba(0, 240, 255, 0.4)' : 'rgba(56, 189, 248, 0.12)',
                  boxShadow: isOpen ? '0 10px 30px -10px rgba(0, 240, 255, 0.2)' : 'var(--shadow-card)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => toggleFaq(idx)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      color: isOpen ? '#00f0ff' : '#f8fafc',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {faq.question}
                  </h3>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      color: isOpen ? '#00f0ff' : '#64748b',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.94rem',
                      color: '#94a3b8',
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
