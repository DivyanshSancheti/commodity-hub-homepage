
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CommodityData {
  name: string;
  price: number;
  change: number;
  unit: string;
}

const MarketSnapshot = () => {
  // This would normally be fetched from an API
  const commodities: CommodityData[] = [
    { name: 'Gold', price: 2011.25, change: 0.4, unit: 'USD/oz' },
    { name: 'Crude Oil (WTI)', price: 78.42, change: -0.85, unit: 'USD/bbl' },
    { name: 'Silver', price: 23.76, change: 0.2, unit: 'USD/oz' },
    { name: 'Copper', price: 4.05, change: -0.3, unit: 'USD/lb' },
    { name: 'Natural Gas', price: 2.48, change: 1.2, unit: 'USD/MMBtu' },
    { name: 'Wheat', price: 603.25, change: 0.75, unit: 'USc/bu' },
  ];

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-commodity-blue mb-2">Quick Market Snapshot</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Track real-time commodity prices and market trends across major categories including energy, metals, and agricultural products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodities.map((commodity) => (
            <Card key={commodity.name} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2 border-b bg-gray-50">
                <CardTitle className="text-lg">{commodity.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{commodity.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">{commodity.unit}</p>
                  </div>
                  <div className={`flex items-center ${commodity.change >= 0 ? 'text-commodity-green' : 'text-commodity-red'}`}>
                    {commodity.change >= 0 ? 
                      <TrendingUp className="h-5 w-5 mr-1" /> : 
                      <TrendingDown className="h-5 w-5 mr-1" />
                    }
                    <span className="font-semibold">
                      {commodity.change >= 0 ? '+' : ''}{commodity.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketSnapshot;
