import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-tag">Privacy & Data Governance</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Last updated: March 1, 2026</p>
        </div>

        <div className="glass-card" style={{ padding: '40px', borderRadius: '20px', lineHeight: 1.8, color: '#cbd5e1' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            1. Fundamental Commitment: 100% Offline-First
          </h2>
          <p style={{ marginBottom: '24px' }}>
            AlgoVault is engineered as an offline-first desktop application. <strong>We do not collect, read, analyze, or transmit your private coding problems, notes, solutions, mistakes, or code snippets.</strong> Everything you write in AlgoVault is stored locally on your physical machine in open Markdown and JSON files.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            2. Commercial Transactions & Payment Data
          </h2>
          <p style={{ marginBottom: '24px' }}>
            When you purchase an AlgoVault Pro license, payment processing is handled strictly through certified, PCI-DSS Level 1 compliant payment gateways (such as Razorpay). AlgoVault never sees, stores, or transmits your credit card numbers, CVVs, or UPI PINs. We only receive verification tokens, transaction IDs, and order numbers required to generate and validate your software license.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            3. Device Activation & License Verification
          </h2>
          <p style={{ marginBottom: '24px' }}>
            To enforce our 3-device personal license limit, the desktop app generates a non-reversible cryptographic hash (hardware fingerprint) derived from system hardware identifiers. This hash cannot be reverse-engineered to identify you or inspect your hardware contents.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            4. Web Analytics
          </h2>
          <p style={{ marginBottom: '24px' }}>
            On our commercial website (algovault.dev), we record aggregate, non-identifying conversion events (e.g. landing page views, checkout completions) to understand platform performance. We do not sell user data to advertising brokers.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            5. Contact Information
          </h2>
          <p>
            If you have any questions or data requests regarding this Privacy Policy, please email{' '}
            <a href="mailto:privacy@algovault.dev" style={{ color: '#00f0ff' }}>
              privacy@algovault.dev
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};
