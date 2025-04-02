
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Wheat, Diamond, Leaf } from 'lucide-react';

const CommoditiesOverview = () => {
  const categories = [
    {
      title: "Energy",
      description: "Crude oil, natural gas, gasoline, and other fuels that power global economies.",
      icon: <Droplets className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Agriculture", 
      description: "Wheat, corn, soybeans, coffee, and other food and fiber products essential for daily life.",
      icon: <Wheat className="h-10 w-10 text-amber-500" />
    },
    {
      title: "Metals",
      description: "Gold, silver, copper, and other metals used in industries, technology, and as stores of value.",
      icon: <Diamond className="h-10 w-10 text-gray-500" />
    },
    {
      title: "Environmental",
      description: "Carbon credits, renewable energy certificates, and other sustainability-focused commodities.",
      icon: <Leaf className="h-10 w-10 text-green-500" />
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-commodity-blue mb-4">What Are Commodities?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Commodities are raw materials or primary agricultural products that can be bought, sold, or traded. 
            These physical goods form the foundation of the global economy and are essential inputs for products we use every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.title} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-commodity-blue">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommoditiesOverview;
