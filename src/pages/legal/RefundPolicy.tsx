import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RefundPolicy: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-tag">Guarantee & Returns</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            30-Day Money-Back Guarantee
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Last updated: March 1, 2026</p>
        </div>

        <div className="glass-card" style={{ padding: '40px', borderRadius: '20px', lineHeight: 1.8, color: '#cbd5e1' }}>
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <ShieldCheck size={32} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                100% Risk-Free Guarantee
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#a7f3d0' }}>
                If you aren't completely thrilled with how AlgoVault organizes your DSA preparation, we will refund 100% of your payment.
              </p>
            </div>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            1. Eligibility Period
          </h2>
          <p style={{ marginBottom: '24px' }}>
            You are entitled to a full refund within thirty (30) calendar days from the original date of purchase of your AlgoVault Pro Lifetime or Annual license.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            2. No Interrogations or Complicated Conditions
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We believe engineers should only pay for software they truly love. You do not need to prove that you solved a minimum number of problems or justify your decision.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            3. How to Request a Refund
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Simply send an email to <a href="mailto:support@algovault.dev" style={{ color: '#00f0ff' }}>support@algovault.dev</a> with your Order ID or the email address used during purchase. Our billing system will process your refund through Razorpay within 24 to 48 business hours.
          </p>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px', marginTop: '32px' }}>
            <Link to="/contact" className="btn-secondary" style={{ display: 'inline-flex', padding: '10px 20px', textDecoration: 'none' }}>
              <span>Contact Support</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
