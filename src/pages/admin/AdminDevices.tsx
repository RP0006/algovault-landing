import React, { useState } from 'react';
import { licenseService } from '../../services/licenseService';
import { adminService } from '../../services/adminService';
import { Laptop, Apple, Monitor, Search, Trash2, Shield } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminDevices: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [devices, setDevices] = useState(licenseService.getAllDevices());

  const filtered = devices.filter(
    (d) =>
      d.deviceName.toLowerCase().includes(search.toLowerCase()) ||
      d.platform.toLowerCase().includes(search.toLowerCase()) ||
      d.hardwareFingerprint.toLowerCase().includes(search.toLowerCase())
  );

  const handleForceDeactivate = (id: string, name: string) => {
    adminService.forceDeactivateDevice(id);
    setDevices(licenseService.getAllDevices());
    showToast(`Force deactivated ${name}`, 'info', 'Device Seat Cleared');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Registered Hardware Devices ({devices.length})
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Inspect active hardware fingerprints, operating systems, and force-release stale machines.
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
          placeholder="Search by device name, OS platform, or hardware ID..."
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
              <th>Device Name</th>
              <th>Platform & OS</th>
              <th>Hardware Fingerprint</th>
              <th>Status</th>
              <th>Activated</th>
              <th>Last Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((dev) => {
              const isMac = dev.platform.toLowerCase().includes('mac');
              return (
                <tr key={dev.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {isMac ? <Apple size={16} color="#00f0ff" /> : <Monitor size={16} color="#38bdf8" />}
                      <span style={{ fontWeight: 600, color: '#fff' }}>{dev.deviceName}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                    {dev.platform} ({dev.osVersion})
                  </td>
                  <td>
                    <code style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                      {dev.hardwareFingerprint}
                    </code>
                  </td>
                  <td>
                    <span
                      className={dev.isActive ? 'badge-status badge-active' : 'badge-status badge-revoked'}
                      style={{ fontSize: '0.72rem' }}
                    >
                      {dev.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    {new Date(dev.activatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    {new Date(dev.lastActiveAt).toLocaleDateString()}
                  </td>
                  <td>
                    {dev.isActive ? (
                      <button
                        onClick={() => handleForceDeactivate(dev.id, dev.deviceName)}
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
                        Force Reset
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.76rem', color: '#64748b' }}>Cleared</span>
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
