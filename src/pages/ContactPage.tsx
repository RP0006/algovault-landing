import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Licensing & Purchases');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    // Simulate support ticket dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Message received! Our team will respond shortly.', 'success', 'Inquiry Sent');
    }, 800);
  };

  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div className="section-header">
          <span className="section-tag">Direct Engineering Support</span>
          <h1 className="section-title">
            Get in Touch with <span className="text-gradient">AlgoVault</span>
          </h1>
          <p className="section-desc">
            Need help with desktop installation, device activation, license transfers, or enterprise team licensing?
            We are here to assist.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          {/* Contact Information & Commitments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <Mail size={22} color="#00f0ff" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Official Support Channel</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
                For general inquiries, refunds, and desktop troubleshooting, contact us directly at:
              </p>
              <a
                href="mailto:support@algovault.dev"
                style={{
                  color: '#00f0ff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                support@algovault.dev
              </a>
            </div>

            <div className="glass-card" style={{ padding: '28px', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <Clock size={22} color="#10b981" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Response SLA</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#94a3b8' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span><strong>Pro License Holders:</strong> &lt; 4 hours</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
                  <span><strong>General & Community:</strong> Within 24 hours</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff' }} />
                  <span><strong>Refund Requests:</strong> Processed instantly</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="glass-card" style={{ padding: '36px 30px', borderRadius: '20px' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Message Received!
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you for reaching out, {name}. A ticket has been created and our team will respond to{' '}
                  <strong style={{ color: '#fff' }}>{email}</strong> within our SLA window.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setMessage('');
                  }}
                  className="btn-secondary"
                  style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '18px' }}>
                  Send an Inquiry
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohit Pal"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="form-input"
                    style={{ background: 'rgba(10, 16, 32, 0.95)' }}
                  >
                    <option value="Licensing & Purchases">Licensing & Purchases</option>
                    <option value="Desktop App Support">Desktop App Technical Support</option>
                    <option value="Device Seat Reset">Device Seat Reset Request</option>
                    <option value="Refund Request">30-Day Refund Request</option>
                    <option value="Enterprise & Team Seats">Enterprise & Team Licensing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query or operating system..."
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
