import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Key,
  Laptop,
  Download,
  Settings,
  HelpCircle,
  LogOut,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user, license, hasProLicense, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Overview', to: '/dashboard', end: true, icon: <LayoutDashboard size={18} /> },
    { label: 'License & Plan', to: '/dashboard/license', icon: <Key size={18} /> },
    { label: 'Devices', to: '/dashboard/devices', icon: <Laptop size={18} /> },
    { label: 'Downloads', to: '/dashboard/downloads', icon: <Download size={18} /> },
    { label: 'Settings', to: '/dashboard/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', paddingBottom: '60px' }}>
      <div className="container">
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
            {/* User Profile Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 8px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '8px' }}>
              <img
                src={user?.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email || 'user'}`}
                alt={user?.fullName || 'User'}
                style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.1)' }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.fullName || 'Rohit Pal'}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email}
                </div>
              </div>
            </div>

            {/* License Status Callout */}
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                background: hasProLicense ? 'rgba(0, 240, 255, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                border: hasProLicense ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: hasProLicense ? '#00f0ff' : '#f59e0b' }}>
                  {hasProLicense ? 'Pro License — Active' : 'Community Edition'}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {hasProLicense ? `${license?.activeDevicesCount || 0} of ${license?.maxDevices || 3} devices` : '1 device trial'}
                </div>
              </div>
              {hasProLicense && <Sparkles size={16} color="#00f0ff" />}
            </div>

            {/* Navigation links */}
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

            <Link to="/help" className="sidebar-link">
              <HelpCircle size={18} />
              <span>Help & Guides</span>
            </Link>

            <button
              onClick={handleLogout}
              className="sidebar-link"
              style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#f87171' }}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </aside>

          {/* Main Content Area */}
          <main style={{ minWidth: 0 }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
