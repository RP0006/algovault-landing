import React, { useState } from 'react';
import { paymentService } from '../../services/paymentService';
import { Search, CreditCard, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminPayments: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const payments = paymentService.getAllPayments();

  const filtered = payments.filter(
    (p) =>
      p.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      p.gatewayPaymentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Payment & Transaction Ledger ({payments.length})
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Inspect verified commercial gateway orders, UPI/Card transaction references, and receipts.
        </p>
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
          placeholder="Search order number, user email, or Razorpay ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '46px', maxWidth: '440px' }}
        />
      </div>

      {/* Payments Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Gateway Payment ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: '#00f0ff', fontWeight: 600 }}>
                  {p.orderNumber}
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{p.userName}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{p.userEmail}</div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  {p.gatewayPaymentId}
                </td>
                <td style={{ fontWeight: 700, color: '#10b981' }}>
                  ₹{p.amount.toLocaleString()}
                </td>
                <td>
                  <span style={{ background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem' }}>
                    {p.paymentMethod}
                  </span>
                </td>
                <td>
                  <span className="badge-status badge-active" style={{ fontSize: '0.72rem' }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
