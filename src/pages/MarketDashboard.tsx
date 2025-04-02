
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, BarChart2, Globe, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MarketDashboard = () => {
  // State for time period selection 
  const [timePeriod, setTimePeriod] = useState('week');
  // State for selected commodity to highlight
  const [selectedCommodity, setSelectedCommodity] = useState('all');

  // Mock data for live market prices
  const liveMarketData = [
    { name: 'Gold', price: 2011.25, change: 0.4, unit: 'USD/oz' },
    { name: 'Crude Oil (WTI)', price: 78.42, change: -0.85, unit: 'USD/bbl' },
    { name: 'Silver', price: 23.76, change: 0.2, unit: 'USD/oz' },
    { name: 'Copper', price: 4.05, change: -0.3, unit: 'USD/lb' },
    { name: 'Natural Gas', price: 2.48, change: 1.2, unit: 'USD/MMBtu' },
    { name: 'Wheat', price: 603.25, change: 0.75, unit: 'USc/bu' },
    { name: 'Coffee', price: 247.35, change: 2.1, unit: 'USc/lb' },
    { name: 'Soybeans', price: 1204.50, change: -0.45, unit: 'USc/bu' },
  ];

  // Historical data for different time periods
  const historicalDataByPeriod = {
    week: [
      { name: 'Mon', Gold: 2005.40, Oil: 79.10, Silver: 23.55, Copper: 4.10 },
      { name: 'Tue', Gold: 2008.75, Oil: 78.85, Silver: 23.62, Copper: 4.08 },
      { name: 'Wed', Gold: 2010.20, Oil: 78.60, Silver: 23.70, Copper: 4.07 },
      { name: 'Thu', Gold: 2007.50, Oil: 78.40, Silver: 23.65, Copper: 4.06 },
      { name: 'Fri', Gold: 2009.80, Oil: 78.75, Silver: 23.72, Copper: 4.04 },
      { name: 'Sat', Gold: 2010.90, Oil: 78.30, Silver: 23.75, Copper: 4.02 },
      { name: 'Sun', Gold: 2011.25, Oil: 78.42, Silver: 23.76, Copper: 4.05 },
    ],
    month: [
      { name: 'Week 1', Gold: 1985.30, Oil: 77.20, Silver: 22.85, Copper: 3.95 },
      { name: 'Week 2', Gold: 1992.45, Oil: 77.85, Silver: 23.10, Copper: 4.00 },
      { name: 'Week 3', Gold: 2001.75, Oil: 78.40, Silver: 23.45, Copper: 4.04 },
      { name: 'Week 4', Gold: 2011.25, Oil: 78.42, Silver: 23.76, Copper: 4.05 },
    ],
    quarter: [
      { name: 'Jan', Gold: 1950.20, Oil: 75.30, Silver: 22.10, Copper: 3.85 },
      { name: 'Feb', Gold: 1975.40, Oil: 76.70, Silver: 22.80, Copper: 3.92 },
      { name: 'Mar', Gold: 2011.25, Oil: 78.42, Silver: 23.76, Copper: 4.05 },
    ],
    year: [
      { name: 'Q1', Gold: 1890.10, Oil: 72.15, Silver: 21.40, Copper: 3.60 },
      { name: 'Q2', Gold: 1925.60, Oil: 74.80, Silver: 22.20, Copper: 3.75 },
      { name: 'Q3', Gold: 1965.30, Oil: 76.50, Silver: 22.90, Copper: 3.90 },
      { name: 'Q4', Gold: 2011.25, Oil: 78.42, Silver: 23.76, Copper: 4.05 },
    ]
  };

  // Get the correct historical data based on selected time period
  const historicalData = historicalDataByPeriod[timePeriod as keyof typeof historicalDataByPeriod];

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: 'Gold prices hit new record high amid global economic uncertainty',
      source: 'Financial Times',
      time: '2 hours ago',
      snippet: 'Gold prices surged to a record high today as investors seek safe-haven assets amid growing concerns about global economic stability.'
    },
    {
      id: 2,
      title: 'Oil prices drop on increased US production reports',
      source: 'Reuters',
      time: '4 hours ago',
      snippet: 'Crude oil prices fell by nearly 1% following reports of increased production in US shale regions and higher than expected inventory levels.'
    },
    {
      id: 3,
      title: 'Agricultural commodities rally on adverse weather forecasts',
      source: 'Bloomberg',
      time: '6 hours ago',
      snippet: 'Wheat, corn and soybean futures rallied as weather forecasts predicted drier conditions in key growing regions, potentially impacting crop yields.'
    },
    {
      id: 4,
      title: 'Copper demand expected to surge with EV market growth',
      source: 'Commodity Insider',
      time: '9 hours ago',
      snippet: 'Analysis suggests copper demand could double by 2035 due to electric vehicle manufacturing and renewable energy infrastructure needs.'
    },
  ];

  // Chart config with more colors
  const chartConfig = {
    Gold: { color: '#F59E0B' }, // gold
    Oil: { color: '#374151' },  // dark gray
    Silver: { color: '#94A3B8' }, // silver
    Copper: { color: '#B45309' }, // copper brown
  };

  // Time period options
  const timeOptions = [
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'quarter', label: 'Quarterly' },
    { value: 'year', label: 'Yearly' },
  ];
  
  // Commodity options
  const commodityOptions = [
    { value: 'all', label: 'All Commodities' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Oil', label: 'Crude Oil' },
    { value: 'Silver', label: 'Silver' },
    { value: 'Copper', label: 'Copper' },
  ];

  // Handle time period change
  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
  };

  // Handle commodity selection change
  const handleCommodityChange = (value: string) => {
    setSelectedCommodity(value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-commodity-blue">Market Dashboard</h1>
          <p className="text-gray-600">Real-time commodity market insights and analysis</p>
        </div>

        {/* Live Market Data Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-commodity-blue mb-4 flex items-center">
            <BarChart2 className="h-5 w-5 mr-2" />
            Live Market Data
          </h2>
          <div className="overflow-auto">
            <Table className="border rounded-lg">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveMarketData.map((item) => (
                  <TableRow key={item.name} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "flex items-center",
                        item.change >= 0 ? "text-commodity-green text-green-600" : "text-commodity-red text-red-600"
                      )}>
                        {item.change >= 0 ? 
                          <TrendingUp className="h-4 w-4 mr-1" /> : 
                          <TrendingDown className="h-4 w-4 mr-1" />
                        }
                        <span>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Historical Data & Charts Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-xl font-semibold text-commodity-blue flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Historical Price Trends
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 mt-3 md:mt-0">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Select value={timePeriod} onValueChange={handleTimePeriodChange}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-gray-500" />
                <Select value={selectedCommodity} onValueChange={handleCommodityChange}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    {commodityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {timeOptions.find(o => o.value === timePeriod)?.label} Price Movement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 pt-2">
                <ChartContainer config={chartConfig}>
                  <LineChart data={historicalData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {(selectedCommodity === 'all' || selectedCommodity === 'Gold') && (
                      <Line 
                        type="monotone" 
                        dataKey="Gold" 
                        stroke="#F59E0B" 
                        strokeWidth={selectedCommodity === 'Gold' ? 3 : 2} 
                        dot={{ r: selectedCommodity === 'Gold' ? 5 : 4 }} 
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {(selectedCommodity === 'all' || selectedCommodity === 'Oil') && (
                      <Line 
                        type="monotone" 
                        dataKey="Oil" 
                        stroke="#374151" 
                        strokeWidth={selectedCommodity === 'Oil' ? 3 : 2} 
                        dot={{ r: selectedCommodity === 'Oil' ? 5 : 4 }} 
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {(selectedCommodity === 'all' || selectedCommodity === 'Silver') && (
                      <Line 
                        type="monotone" 
                        dataKey="Silver" 
                        stroke="#94A3B8" 
                        strokeWidth={selectedCommodity === 'Silver' ? 3 : 2} 
                        dot={{ r: selectedCommodity === 'Silver' ? 5 : 4 }} 
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {(selectedCommodity === 'all' || selectedCommodity === 'Copper') && (
                      <Line 
                        type="monotone" 
                        dataKey="Copper" 
                        stroke="#B45309" 
                        strokeWidth={selectedCommodity === 'Copper' ? 3 : 2} 
                        dot={{ r: selectedCommodity === 'Copper' ? 5 : 4 }} 
                        activeDot={{ r: 8 }}
                      />
                    )}
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* News Feed Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-commodity-blue mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Market News
          </h2>
          <div className="grid gap-4">
            {newsItems.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1 text-commodity-blue">{news.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-medium">{news.source}</span>
                    <span className="mx-2">•</span>
                    <span>{news.time}</span>
                  </div>
                  <p className="text-gray-700">{news.snippet}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketDashboard;
