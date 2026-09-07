import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { APP_CONFIG, FAQItem } from '../data/config';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ['All', 'Licensing & Pricing', 'Security & Offline', 'General', 'Technical'];

  const filteredFaqs = APP_CONFIG.faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        <div className="section-header">
          <span className="section-tag">Knowledge & Support</span>
          <h1 className="section-title">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="section-desc">
            Everything you need to know about licensing, offline cryptographic verification, device seats, and spaced repetition.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '28px' }}>
          <Search
            size={18}
            color="#64748b"
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search questions (e.g. offline, license, refund, git sync, mac)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '46px', paddingRight: '16px', height: '48px', borderRadius: '12px' }}
          />
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: selectedCategory === cat ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                background: selectedCategory === cat ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedCategory === cat ? '#00f0ff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '60px' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '22px 26px',
                    borderRadius: '16px',
                    borderColor: isOpen ? 'rgba(0, 240, 255, 0.4)' : 'rgba(56, 189, 248, 0.12)',
                    boxShadow: isOpen ? '0 10px 30px -10px rgba(0, 240, 255, 0.2)' : 'var(--shadow-card)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {faq.category && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#38bdf8',
                            background: 'rgba(56, 189, 248, 0.1)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 600,
                          }}
                        >
                          {faq.category}
                        </span>
                      )}
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: isOpen ? '#00f0ff' : '#f8fafc' }}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      color={isOpen ? '#00f0ff' : '#64748b'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.7 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* Support Callout */}
        <div
          className="glass-card"
          style={{
            padding: '28px 32px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
              Still have questions?
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              Our engineering support team typically responds in under 4 hours.
            </p>
          </div>
          <Link to="/contact" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 20px' }}>
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
};
