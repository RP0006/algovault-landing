import React, { useState } from 'react';
import { User, Mail, Lock, Shield, FileText, Download, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services/authService';

export const SettingsView: React.FC = () => {
  const { user, refreshAuth } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || 'Rohit Pal');
  const [email] = useState(user?.email || 'rohit@algovault.dev');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authService.updateProfile({ fullName });
      refreshAuth();
      showToast('Profile information updated!', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadInvoice = () => {
    showToast('Commercial tax invoice PDF generated!', 'success', 'Receipt Downloaded');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Account Settings
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Manage your account profile, credentials, and payment receipts.
        </p>
      </div>

      {/* Profile Card */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
          Personal Information
        </h3>

        <form onSubmit={handleUpdateProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '20px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Registered Email</label>
              <input
                type="email"
                disabled
                value={email}
                className="form-input"
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.88rem', cursor: isSaving ? 'not-allowed' : 'pointer' }}
          >
            {isSaving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>

      {/* Billing & Receipts */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
          Commercial Invoices & Tax Receipts
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '20px' }}>
          Download official GST/VAT invoices with your order number and timestamp.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={20} color="#00f0ff" />
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                Invoice ORD-2026-0215-9921
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                AlgoVault Pro Lifetime · ₹1,499 (Paid via UPI) · Feb 15, 2026
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadInvoice}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <Download size={14} />
            <span>Download PDF Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
