import React, { useState, useEffect } from 'react';
import { Layers, Download, Menu, X, Sun, Moon } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'electric'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'electric' : 'dark';
    setThemeMode(next);
    if (next === 'electric') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'rgba(4, 6, 13, 0.82)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(56, 189, 248, 0.12)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#"
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
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          <a href="#features" className="nav-link">Features</a>
          <a href="#showcase" className="nav-link">App Showcase</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#download" className="nav-link">Download</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        {/* Actions (Theme toggle + Download CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTheme}
            title={themeMode === 'dark' ? 'Switch to High-Contrast Cyber mode' : 'Switch to Stealth Dark mode'}
            aria-label="Toggle Theme"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#38bdf8',
              transition: 'all 0.2s ease',
            }}
          >
            {themeMode === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          <a
            href="#download"
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.88rem',
              display: 'none',
            }}
            id="nav-download-btn"
          >
            <Download size={16} />
            <span>Get {APP_CONFIG.version}</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(5, 8, 18, 0.96)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}
          >
            Features
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}
          >
            App Showcase
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}
          >
            How It Works
          </a>
          <a
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}
          >
            Download
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}
          >
            FAQ
          </a>
          <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <Download size={18} />
              <span>Download AlgoVault Free</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
        }
        .nav-link:hover {
          color: #00f0ff;
        }
        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-download-btn {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
