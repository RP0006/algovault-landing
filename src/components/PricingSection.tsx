import React, { useState } from 'react';
import { Check, Zap, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { APP_CONFIG, PricingPlan } from '../data/config';
import { CheckoutModal } from './CheckoutModal';
import { Link } from 'react-router-dom';

export const PricingSection: React.FC = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<{
    id: 'pro_lifetime' | 'pro_annual';
    name: string;
    amountInr: number;
  } | null>(null);

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === 'free_trial') {
      window.location.href = '#download';
      return;
    }
    setSelectedPlanForCheckout({
      id: plan.id,
      name: plan.name,
      amountInr: plan.priceInr,
    });
  };

  return (
    <section id="pricing" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Straightforward Pricing</span>
          <h2 className="section-title">
            Invest Once in Your <span className="text-gradient">Career Vault</span>
          </h2>
          <p className="section-desc">
            No recurring subscription traps. Keep all your notes, invariants, and problem diffs stored offline on your
            workstation forever.
          </p>

          {/* Currency Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '4px',
              marginTop: '24px',
            }}
          >
            <button
              onClick={() => setCurrency('INR')}
              style={{
                padding: '6px 18px',
                borderRadius: '9999px',
                border: 'none',
                background: currency === 'INR' ? '#00f0ff' : 'transparent',
                color: currency === 'INR' ? '#04060d' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              INR (₹) India
            </button>
            <button
              onClick={() => setCurrency('USD')}
              style={{
                padding: '6px 18px',
                borderRadius: '9999px',
                border: 'none',
                background: currency === 'USD' ? '#00f0ff' : 'transparent',
                color: currency === 'USD' ? '#04060d' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              USD ($) Global
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'stretch',
            marginBottom: '48px',
          }}
        >
          {APP_CONFIG.pricing.map((plan) => {
            const isPopular = plan.popular;
            const priceDisplay = currency === 'INR' ? `₹${plan.priceInr.toLocaleString()}` : `$${plan.priceUsd}`;

            return (
              <div
                key={plan.id}
                className="glass-card"
                style={{
                  position: 'relative',
                  padding: '36px 30px',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isPopular ? '2px solid rgba(0, 240, 255, 0.5)' : '1px solid rgba(56, 189, 248, 0.15)',
                  boxShadow: isPopular
                    ? '0 20px 45px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(0, 240, 255, 0.3)'
                    : 'var(--shadow-card)',
                  background: isPopular ? 'linear-gradient(180deg, rgba(14, 25, 52, 0.85) 0%, rgba(8, 14, 30, 0.85) 100%)' : undefined,
                  transform: isPopular ? 'scale(1.02)' : 'none',
                  zIndex: isPopular ? 2 : 1,
                }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #00f0ff 0%, #2563eb 100%)',
                      color: '#04060d',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 16px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 15px rgba(0, 240, 255, 0.4)',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', minHeight: '44px', marginBottom: '24px', lineHeight: 1.5 }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>
                      {priceDisplay}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                      / {plan.billingPeriod}
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#cbd5e1', marginBottom: '14px' }}>
                      What's Included:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#94a3b8' }}>
                          <Check size={18} color="#00f0ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ color: '#e2e8f0' }}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={isPopular ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '0.98rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    {isPopular && <Sparkles size={18} />}
                    <span>{plan.ctaLabel}</span>
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.76rem', color: '#64748b', marginTop: '10px' }}>
                    {plan.ctaSubtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 30-Day Guarantee Banner */}
        <div
          className="glass-card"
          style={{
            padding: '24px 32px',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            background: 'rgba(6, 30, 24, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={26} color="#10b981" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                30-Day No-Questions-Asked Refund Guarantee
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#a7f3d0', maxWidth: '640px' }}>
                If AlgoVault doesn't immediately elevate your pattern recognition and interview confidence, send an email
                for an instant, full refund.
              </p>
            </div>
          </div>
          <Link
            to="/refund"
            style={{
              fontSize: '0.86rem',
              fontWeight: 600,
              color: '#10b981',
              textDecoration: 'none',
              borderBottom: '1px dashed #10b981',
            }}
          >
            Read Refund Policy →
          </Link>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <CheckoutModal
          isOpen={Boolean(selectedPlanForCheckout)}
          onClose={() => setSelectedPlanForCheckout(null)}
          planId={selectedPlanForCheckout.id}
          planName={selectedPlanForCheckout.name}
          amountInr={selectedPlanForCheckout.amountInr}
        />
      )}
    </section>
  );
};
