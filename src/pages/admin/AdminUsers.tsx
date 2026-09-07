import React, { useState } from 'react';
import { adminService } from '../../services/adminService';
import { licenseService } from '../../services/licenseService';
import { Search, UserPlus, Shield, CheckCircle2, Key, Mail } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminUsers: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(adminService.getAllUsers());

  const filtered = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleGrantProLicense = async (userId: string, email: string) => {
    await licenseService.createLicenseForUser(userId, email, 'pro_lifetime', `MANUAL-ADMIN-${Date.now()}`);
    showToast(`Granted Pro Lifetime license to ${email}!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            User Management ({users.length})
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
            Inspect user profiles, manage administrative roles, and manually provision licenses.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <Search
          size={18}
          color="#64748b"
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Search by user name or email address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '46px', maxWidth: '440px' }}
        />
      </div>

      {/* Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Email Verified</th>
              <th>Account Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const hasLic = Boolean(licenseService.getUserLicense(u.id));
              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={u.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${u.email}`}
                        alt={u.fullName}
                        style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{u.fullName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: u.role === 'admin' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        color: u.role === 'admin' ? '#f472b6' : '#94a3b8',
                        border: u.role === 'admin' ? '1px solid rgba(236, 72, 153, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: u.isEmailVerified ? '#10b981' : '#f59e0b' }}>
                      <CheckCircle2 size={15} />
                      <span>{u.isEmailVerified ? 'Verified' : 'Pending'}</span>
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {!hasLic ? (
                      <button
                        onClick={() => handleGrantProLicense(u.id, u.email)}
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Key size={13} color="#00f0ff" />
                        <span>Grant Pro License</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#00f0ff', fontWeight: 600 }}>
                        Pro Active
                      </span>
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
