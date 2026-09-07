import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  BarChart3,
  Users,
  CreditCard,
  Key,
  Laptop,
  Layers,
  ArrowLeft,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, login } = useAuth();
  const navigate = useNavigate();

  // If not admin, provide a dev shortcut banner to simulate admin authentication
  const handleSwitchToAdmin = async () => {
    await login('admin@algovault.dev', 'secret');
  };

  const navItems = [
    { label: 'Overview', to: '/admin', end: true, icon: <BarChart3 size={18} /> },
    { label: 'Users', to: '/admin/users', icon: <Users size={18} /> },
    { label: 'Payments', to: '/admin/payments', icon: <CreditCard size={18} /> },
    { label: 'Licenses', to: '/admin/licenses', icon: <Key size={18} /> },
    { label: 'Active Devices', to: '/admin/devices', icon: <Laptop size={18} /> },
    { label: 'Releases & Builds', to: '/admin/releases', icon: <Layers size={18} /> },
  ];

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px' }}>
        <div className="glass-card" style={{ maxWidth: '480px', padding: '36px', borderRadius: '20px', textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Shield size={26} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            Admin Access Required
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
            The route <code>/admin</code> is restricted to authorized platform administrators. You are currently logged in as{' '}
            <strong style={{ color: '#fff' }}>{user?.email || 'Guest'}</strong> ({user?.role || 'unauthenticated'}).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={handleSwitchToAdmin}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.92rem', cursor: 'pointer' }}
            >
              Sign In as Demo Admin (admin@algovault.dev)
            </button>
            <Link to="/dashboard" className="btn-secondary" style={{ width: '100%', padding: '10px', textDecoration: 'none', textAlign: 'center' }}>
              Back to User Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Top Admin Notice Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 18px',
            borderRadius: '12px',
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            marginBottom: '24px',
            fontSize: '0.84rem',
            color: '#f472b6',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} />
            <span><strong>Administrator Mode</strong>: You have elevated privileges to inspect transactions, licenses, and releases.</span>
          </div>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}>
            View User Dashboard →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '32px',
            alignItems: 'start',
          }}
          className="dashboard-layout-grid"
        >
          {/* Sidebar */}
          <aside
            className="glass-card"
            style={{
              padding: '24px 18px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              position: 'sticky',
              top: '90px',
            }}
          >
            <div style={{ padding: '6px 8px 14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '8px' }}>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f472b6', fontWeight: 700 }}>
                Administration
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                AlgoVault Control
              </div>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '14px 0 6px' }} />

            <Link to="/" className="sidebar-link">
              <ArrowLeft size={18} />
              <span>Exit to Website</span>
            </Link>
          </aside>

          {/* Main Area */}
          <main style={{ minWidth: 0 }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
