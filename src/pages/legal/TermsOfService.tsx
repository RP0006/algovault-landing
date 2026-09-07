import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-tag">Terms & Agreement</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            Terms of Service
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Last updated: March 1, 2026</p>
        </div>

        <div className="glass-card" style={{ padding: '40px', borderRadius: '20px', lineHeight: 1.8, color: '#cbd5e1' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: '24px' }}>
            By downloading, purchasing, or using AlgoVault and its associated web platform, you agree to be bound by these Terms of Service. If you do not agree, do not install or use the software.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            2. Commercial License Grant
          </h2>
          <p style={{ marginBottom: '24px' }}>
            A Pro Lifetime license grants you a perpetual, non-exclusive, non-transferable license to install and use AlgoVault on up to three (3) personal hardware workstations concurrently. You may not distribute, resell, or sublicense your license key to third parties.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            3. Disclaimer of Warranties
          </h2>
          <p style={{ marginBottom: '24px' }}>
            AlgoVault is provided "AS IS" without warranty of any kind. While we rigorously test our desktop software on macOS and Windows, AlgoVault does not guarantee interview offers or specific competitive programming ranks.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            4. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without giving effect to any principles of conflicts of law.
          </p>
        </div>
      </div>
    </div>
  );
};
