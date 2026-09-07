import React, { useState, useEffect } from 'react';
import { Layers, Download, Menu, X, Sun, Moon, User, Shield, LogOut, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { APP_CONFIG } from '../data/config';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'electric'>('dark');

  const { user, isAdmin, hasProLicense, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'electric' : 'dark';
    setThemeMode(next);
    if (next === 'electric') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'DSA Vault', path: '/dsa' },
    { label: 'Downloads', path: '/download' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '18px 0',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
        background: scrolled ? 'rgba(4, 6, 13, 0.88)' : 'rgba(4, 6, 13, 0.4)',
        borderBottom: scrolled ? '1px solid rgba(56, 189, 248, 0.15)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(37, 99, 235, 0.4) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
            }}
          >
            <Layers size={20} color="#00f0ff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
              Algo<span style={{ color: '#00f0ff' }}>Vault</span>
            </span>
            <span style={{ fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Desktop App
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-link"
              style={{
                color: location.pathname === link.path ? '#00f0ff' : undefined,
                fontWeight: location.pathname === link.path ? 700 : 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions (Theme toggle + Auth CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Toggle visual theme"
            title="Toggle Theme"
          >
            {themeMode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* User Auth CTAs */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="desktop-nav">
              {isAdmin && (
                <Link
                  to="/admin"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(236, 72, 153, 0.15)',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                    color: '#f472b6',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <Shield size={14} />
                  <span>Admin</span>
                </Link>
              )}

              <Link
                to="/dashboard"
                className="btn-secondary"
                style={{
                  padding: '7px 14px',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <LayoutDashboard size={15} color="#00f0ff" />
                <span>Dashboard</span>
                {hasProLicense && (
                  <span
                    style={{
                      background: 'rgba(0, 240, 255, 0.15)',
                      color: '#00f0ff',
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}
                  >
                    PRO
                  </span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                title="Sign Out"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="desktop-nav">
              <Link
                to="/login"
                style={{
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  padding: '8px 14px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#00f0ff')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#cbd5e1')}
              >
                Log In
              </Link>

              <Link
                to="/pricing"
                className="btn-primary"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Get AlgoVault</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            background: 'rgba(5, 8, 18, 0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'slideDown 0.25s ease',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? '#00f0ff' : '#e2e8f0',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="btn-primary"
                  style={{ textAlign: 'center', textDecoration: 'none', padding: '12px' }}
                >
                  Go to Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="btn-secondary"
                    style={{ textAlign: 'center', textDecoration: 'none', padding: '12px' }}
                  >
                    Admin Portal
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    padding: '10px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-secondary"
                  style={{ textAlign: 'center', textDecoration: 'none', padding: '12px' }}
                >
                  Log In
                </Link>
                <Link
                  to="/pricing"
                  className="btn-primary"
                  style={{ textAlign: 'center', textDecoration: 'none', padding: '12px' }}
                >
                  Buy Pro License (₹1,499)
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
