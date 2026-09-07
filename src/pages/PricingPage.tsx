import React from 'react';
import { PricingSection } from '../components/PricingSection';
import { FAQ } from '../components/FAQ';

export const PricingPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      <PricingSection />

      {/* Feature Comparison Matrix */}
      <div className="container" style={{ marginBottom: '90px' }}>
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-tag">Feature Matrix</span>
          <h2 className="section-title">
            Compare <span className="text-gradient">Plans & Editions</span>
          </h2>
          <p className="section-desc">
            Everything you need to know about the differences between Community and Pro editions.
          </p>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Feature / Capability</th>
                <th style={{ width: '30%' }}>Community Edition (Free)</th>
                <th style={{ width: '30%', color: '#00f0ff' }}>Pro Lifetime (₹1,499)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Active Machine Seats</td>
                <td>1 Device</td>
                <td style={{ color: '#00f0ff', fontWeight: 700 }}>3 Devices (Simultaneous)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Problems & Invariant Notes</td>
                <td>Up to 50 problems</td>
                <td style={{ color: '#10b981', fontWeight: 700 }}>Unlimited Problems</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>SuperMemo SM-2 SRS Algorithm</td>
                <td>Basic 3-day intervals</td>
                <td style={{ color: '#10b981', fontWeight: 700 }}>Full Adaptive SM-2 Engine</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Local Git Sync & Backup</td>
                <td>Manual file copy</td>
                <td style={{ color: '#10b981', fontWeight: 700 }}>Automated 1-Click Git Sync</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Fuzzy Search Latency</td>
                <td>Sub-millisecond (&lt;1ms)</td>
                <td style={{ color: '#10b981', fontWeight: 700 }}>Sub-millisecond with NEON/AVX2</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Offline Signed Cryptographic License</td>
                <td>Standard local token</td>
                <td style={{ color: '#00f0ff', fontWeight: 700 }}>Ed25519 Signed Offline Certificate</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Future v1.x & v2.x Software Releases</td>
                <td>Patch fixes only</td>
                <td style={{ color: '#10b981', fontWeight: 700 }}>Free Lifetime Upgrades</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Money-Back Guarantee</td>
                <td>Free tier</td>
                <td style={{ color: '#10b981', fontWeight: 700 }}>30-Day Full Refund Guarantee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <FAQ />
    </div>
  );
};
