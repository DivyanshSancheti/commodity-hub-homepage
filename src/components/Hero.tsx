
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-20 lg:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl font-bold text-commodity-blue sm:text-5xl mb-6">
              The Global Commodities Exchange Platform
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Discover opportunities in raw materials and agricultural products with real-time data, 
              advanced analytics, and a community of professional traders.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-commodity-gold hover:bg-amber-600 text-white font-medium">
                Start Trading Now
              </Button>
              <Button size="lg" variant="outline" className="border-commodity-blue text-commodity-blue hover:bg-commodity-blue hover:text-white">
                Explore Markets
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1518183225770-6e68f0a558af?q=80&w=800&auto=format&fit=crop" 
                alt="Commodity trading visualization" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
