import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const VerifyEmailPage: React.FC = () => {
  const { user, refreshAuth } = useAuth();
  const { showToast } = useToast();
  const [isVerified, setIsVerified] = useState(user?.isEmailVerified || false);

  const handleSimulateVerification = () => {
    setIsVerified(true);
    showToast('Email verified successfully!', 'success');
    refreshAuth();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px' }}>
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 32px',
          borderRadius: '24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: isVerified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 240, 255, 0.15)',
            border: isVerified ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(0, 240, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          {isVerified ? <CheckCircle2 size={32} color="#10b981" /> : <ShieldCheck size={32} color="#00f0ff" />}
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          {isVerified ? 'Email Verified' : 'Verify Your Email'}
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
          {isVerified
            ? 'Your email address is verified. You have full access to your license, device seats, and downloads.'
            : `We sent a confirmation link to ${user?.email || 'your email'}. Click the button below to confirm.`}
        </p>

        {!isVerified ? (
          <button onClick={handleSimulateVerification} className="btn-primary" style={{ width: '100%', padding: '12px' }}>
            Simulate Email Verification Link Click
          </button>
        ) : (
          <Link to="/dashboard" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none' }}>
            <span>Continue to Dashboard</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};
