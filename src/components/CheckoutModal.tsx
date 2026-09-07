import React, { useState } from 'react';
import { Modal } from './Modal';
import { ShieldCheck, Lock, QrCode, CreditCard, Landmark, CheckCircle2, ArrowRight } from 'lucide-react';
import { paymentService } from '../services/paymentService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: 'pro_lifetime' | 'pro_annual';
  planName: string;
  amountInr: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  planId,
  planName,
  amountInr,
}) => {
  const { user, refreshAuth } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [name, setName] = useState(user?.fullName || 'Rohit Pal');
  const [email, setEmail] = useState(user?.email || 'rohit@algovault.dev');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessKey, setPaymentSuccessKey] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      showToast('Please provide a valid email address', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const order = await paymentService.startCheckout({
        planId,
        planName,
        amount: amountInr,
        userEmail: email,
        userName: name,
        userId: user?.id || 'usr_guest_' + Date.now(),
        onSuccess: (licenseKey) => {
          setIsProcessing(false);
          setPaymentSuccessKey(licenseKey);
          refreshAuth();
          showToast('Payment verified! License activated successfully.', 'success', 'Order Confirmed');
        },
        onError: (err) => {
          setIsProcessing(false);
          showToast(err || 'Payment verification failed', 'error');
        },
      });

      // Simulate razorpay popup completion & HMAC verification
      setTimeout(() => {
        const mockGatewayPaymentId = `pay_RZP_${Date.now()}`;
        const selectedMethod = paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Credit Card' : 'NetBanking';
        order.fulfillPayment(mockGatewayPaymentId, selectedMethod);
      }, 1500);
    } catch (err: any) {
      setIsProcessing(false);
      showToast(err.message || 'Payment initiation failed', 'error');
    }
  };

  const handleFinish = () => {
    setPaymentSuccessKey(null);
    onClose();
    navigate('/dashboard');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={paymentSuccessKey ? 'Purchase Successful!' : 'Secure Razorpay Checkout'}>
      {paymentSuccessKey ? (
        <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <CheckCircle2 size={36} color="#10b981" />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            Welcome to AlgoVault Pro!
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.5 }}>
            Your transaction was verified via 256-bit server HMAC signature. Your license key has been generated and tied to your account.
          </p>

          <div
            style={{
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px dashed rgba(0, 240, 255, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
              Your Pro License Key
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#00f0ff' }}>
              {paymentSuccessKey}
            </span>
          </div>

          <button
            onClick={handleFinish}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span>Go to User Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <form onSubmit={handlePay}>
          {/* Plan Recap */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>{planName}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>3 Machines · Lifetime Updates · Offline Ready</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#00f0ff' }}>₹{amountInr.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>One-time</div>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  fontSize: '0.92rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                Email Address (License will be delivered here)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  fontSize: '0.92rem',
                }}
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>
              Payment Method (Razorpay India & Global)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '10px',
                  background: paymentMethod === 'upi' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: paymentMethod === 'upi' ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: paymentMethod === 'upi' ? '#00f0ff' : '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                <QrCode size={20} />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '10px',
                  background: paymentMethod === 'card' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: paymentMethod === 'card' ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: paymentMethod === 'card' ? '#00f0ff' : '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                <CreditCard size={20} />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                style={{
                  padding: '12px 8px',
                  borderRadius: '10px',
                  background: paymentMethod === 'netbanking' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: paymentMethod === 'netbanking' ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: paymentMethod === 'netbanking' ? '#00f0ff' : '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                <Landmark size={20} />
                <span>NetBanking</span>
              </button>
            </div>
          </div>

          {/* Security Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              marginBottom: '22px',
              fontSize: '0.8rem',
              color: '#a7f3d0',
            }}
          >
            <ShieldCheck size={18} color="#10b981" />
            <span>256-bit encrypted checkout. 30-day money-back guarantee.</span>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isProcessing ? 0.7 : 1,
              cursor: isProcessing ? 'not-allowed' : 'pointer',
            }}
          >
            <Lock size={16} />
            <span>{isProcessing ? 'Verifying with Razorpay...' : `Pay ₹${amountInr.toLocaleString()} & Activate Vault`}</span>
          </button>
        </form>
      )}
    </Modal>
  );
};
