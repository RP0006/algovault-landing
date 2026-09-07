import React, { useState } from 'react';
import { licenseService } from '../../services/licenseService';
import { adminService } from '../../services/adminService';
import { Search, Key, ShieldAlert, CheckCircle2, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminLicenses: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [licenses, setLicenses] = useState(licenseService.getAllLicenses());

  const filtered = licenses.filter(
    (l) =>
      l.licenseKey.toLowerCase().includes(search.toLowerCase()) ||
      l.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  const handleRevoke = (id: string) => {
    adminService.revokeLicense(id);
    setLicenses(licenseService.getAllLicenses());
    showToast('License has been suspended / revoked', 'error', 'License Revoked');
  };

  const handleReactivate = (id: string) => {
    adminService.reactivateLicense(id);
    setLicenses(licenseService.getAllLicenses());
    showToast('License reactivated successfully', 'success', 'License Active');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Issued Software Licenses ({licenses.length})
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Inspect cryptographic license keys, hardware seat limits, and manage suspension/revocation.
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        <Search
          size={18}
          color="#64748b"
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Search by license key or user email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '46px', maxWidth: '440px' }}
        />
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>License Key</th>
              <th>Customer Email</th>
              <th>Plan</th>
              <th>Device Seats</th>
              <th>Status</th>
              <th>Issued At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lic) => {
              const isActive = lic.status === 'active';
              return (
                <tr key={lic.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: '#00f0ff', fontWeight: 700 }}>
                    {lic.licenseKey}
                  </td>
                  <td style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>{lic.userEmail}</td>
                  <td>
                    <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                      {lic.planType === 'pro_lifetime' ? 'Pro Lifetime' : 'Pro Annual'}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: '#38bdf8', fontWeight: 600 }}>
                      {lic.activeDevicesCount} / {lic.maxDevices}
                    </span>
                  </td>
                  <td>
                    <span
                      className={isActive ? 'badge-status badge-active' : 'badge-status badge-revoked'}
                      style={{ fontSize: '0.72rem' }}
                    >
                      {lic.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    {new Date(lic.issuedAt).toLocaleDateString()}
                  </td>
                  <td>
                    {isActive ? (
                      <button
                        onClick={() => handleRevoke(lic.id)}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          color: '#f87171',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Revoke
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReactivate(lic.id)}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          color: '#10b981',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
