import React from 'react';
import { Hero } from '../components/Hero';
import { AppShowcase } from '../components/AppShowcase';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { PricingSection } from '../components/PricingSection';
import { Testimonials } from '../components/Testimonials';
import { DownloadSection } from '../components/DownloadSection';
import { FAQ } from '../components/FAQ';

export const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <AppShowcase />
      <Features />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
      <DownloadSection />
      <FAQ />
    </>
  );
};
