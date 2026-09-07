import React from 'react';
import { adminService } from '../../services/adminService';
import { paymentService } from '../../services/paymentService';
import { Users, CreditCard, Key, Laptop, Download, TrendingUp, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOverview: React.FC = () => {
  const stats = adminService.getStats();
  const recentPayments = paymentService.getAllPayments().slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Platform Analytics & Operations
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Real-time metrics on users, Razorpay revenue, active licenses, and desktop seat allocation.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Revenue
            </span>
            <TrendingUp size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
            ₹{stats.totalRevenueInr.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
            Razorpay Captured
          </div>
        </div>

        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Paid Pro Licenses
            </span>
            <Key size={18} color="#00f0ff" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f0ff' }}>
            {stats.activeLicenses}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
            100% Perpetual Licenses
          </div>
        </div>

        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Registered Users
            </span>
            <Users size={18} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            {stats.totalUsers}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
            Accounts created
          </div>
        </div>

        <div className="glass-card" style={{ padding: '22px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Desktop Activations
            </span>
            <Laptop size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>
            {stats.activeDevices}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
            Hardware seats allocated
          </div>
        </div>
      </div>

      {/* Recent Purchases Table */}
      <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
            Recent Commercial Purchases
          </h3>
          <Link to="/admin/payments" style={{ color: '#00f0ff', fontSize: '0.84rem', textDecoration: 'none', fontWeight: 600 }}>
            View All Payments →
          </Link>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>User / Email</th>
                <th>Plan Tier</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#38bdf8' }}>
                    {p.orderNumber}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{p.userName}</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{p.userEmail}</div>
                  </td>
                  <td>{p.planName}</td>
                  <td style={{ fontWeight: 700, color: '#fff' }}>₹{p.amount.toLocaleString()}</td>
                  <td>
                    <span style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem' }}>
                      {p.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <span className="badge-status badge-active" style={{ fontSize: '0.72rem' }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backend Infrastructure Health */}
      <div className="glass-card" style={{ padding: '24px 28px', borderRadius: '18px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
          Production Infrastructure Services
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              <strong style={{ fontSize: '0.88rem', color: '#fff' }}>Razorpay Webhook Listener</strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Endpoint: /api/v1/payments/webhook</div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              <strong style={{ fontSize: '0.88rem', color: '#fff' }}>Ed25519 License Signer</strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Algorithm: Ed25519 (Air-gapped)</div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              <strong style={{ fontSize: '0.88rem', color: '#fff' }}>PostgreSQL 14 Cluster</strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Schema: algovault_prod (SSL Active)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
