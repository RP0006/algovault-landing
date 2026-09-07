import React from 'react';

export const LicenseAgreement: React.FC = () => {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-tag">Software Agreement</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            End User License Agreement (EULA)
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Last updated: March 1, 2026</p>
        </div>

        <div className="glass-card" style={{ padding: '40px', borderRadius: '20px', lineHeight: 1.8, color: '#cbd5e1' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            1. Software License
          </h2>
          <p style={{ marginBottom: '24px' }}>
            AlgoVault desktop software is licensed, not sold. When you purchase an AlgoVault license, you receive a personal, perpetual, worldwide right to install the executable binaries on up to three (3) personal computing devices concurrently.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            2. Offline Cryptographic Verification
          </h2>
          <p style={{ marginBottom: '24px' }}>
            AlgoVault uses public-key cryptography (Ed25519) to verify software licenses offline. You are permitted to execute the desktop application indefinitely in fully air-gapped environments without mandatory ongoing connection to AlgoVault servers.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            3. Restrictions
          </h2>
          <p style={{ marginBottom: '24px' }}>
            You may not: (a) reverse compile or disassemble the core proprietary desktop binary; (b) lease, rent, or sublicense your personal license key; or (c) tamper with cryptographic license validation signatures.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            4. User Content Ownership
          </h2>
          <p>
            You retain 100% unconditional ownership over all Markdown notes, code submissions, custom test cases, and solution invariants created within AlgoVault. AlgoVault claims zero rights or title to your algorithmic vault files.
          </p>
        </div>
      </div>
    </div>
  );
};
