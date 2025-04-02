
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CommoditiesOverview from '@/components/CommoditiesOverview';
import MarketSnapshot from '@/components/MarketSnapshot';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CommoditiesOverview />
        <MarketSnapshot />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
