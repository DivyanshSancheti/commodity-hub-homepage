
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  Robot, 
  ShieldAlert, 
  CircleDollarSign, 
  LineChart as LineChartIcon, 
  BarChart2, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlayCircle, 
  PauseCircle,
  Settings,
  Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const AiTrading = () => {
  // State for trading bot activation
  const [activeBots, setActiveBots] = useState<{ [key: string]: boolean }>({
    "gold-momentum": false,
    "oil-reversal": false,
    "multi-commodity": false,
  });
  
  // State for risk tolerance slider
  const [riskTolerance, setRiskTolerance] = useState(50);
  
  // State for the selected commodity in forecasting
  const [selectedCommodity, setSelectedCommodity] = useState("gold");
  
  // Mock forecast data
  const forecastData = {
    gold: [
      { date: 'Today', actual: 2011.25, predicted: 2011.25, min: 2011.25, max: 2011.25 },
      { date: 'Day 1', actual: null, predicted: 2018.50, min: 2010.75, max: 2026.25 },
      { date: 'Day 2', actual: null, predicted: 2025.75, min: 2012.80, max: 2038.70 },
      { date: 'Day 3', actual: null, predicted: 2030.40, min: 2013.90, max: 2046.90 },
      { date: 'Day 4', actual: null, predicted: 2036.80, min: 2016.20, max: 2057.40 },
      { date: 'Day 5', actual: null, predicted: 2042.10, min: 2018.30, max: 2065.90 },
      { date: 'Day 6', actual: null, predicted: 2047.65, min: 2019.85, max: 2075.45 },
      { date: 'Day 7', actual: null, predicted: 2053.20, min: 2021.40, max: 2085.00 },
    ],
    oil: [
      { date: 'Today', actual: 78.42, predicted: 78.42, min: 78.42, max: 78.42 },
      { date: 'Day 1', actual: null, predicted: 77.85, min: 76.90, max: 78.80 },
      { date: 'Day 2', actual: null, predicted: 77.40, min: 76.20, max: 78.60 },
      { date: 'Day 3', actual: null, predicted: 78.10, min: 76.80, max: 79.40 },
      { date: 'Day 4', actual: null, predicted: 78.85, min: 77.35, max: 80.35 },
      { date: 'Day 5', actual: null, predicted: 79.40, min: 77.65, max: 81.15 },
      { date: 'Day 6', actual: null, predicted: 80.05, min: 78.05, max: 82.05 },
      { date: 'Day 7', actual: null, predicted: 80.75, min: 78.50, max: 83.00 },
    ],
    silver: [
      { date: 'Today', actual: 23.76, predicted: 23.76, min: 23.76, max: 23.76 },
      { date: 'Day 1', actual: null, predicted: 23.95, min: 23.55, max: 24.35 },
      { date: 'Day 2', actual: null, predicted: 24.10, min: 23.60, max: 24.60 },
      { date: 'Day 3', actual: null, predicted: 24.25, min: 23.65, max: 24.85 },
      { date: 'Day 4', actual: null, predicted: 24.45, min: 23.75, max: 25.15 },
      { date: 'Day 5', actual: null, predicted: 24.70, min: 23.90, max: 25.50 },
      { date: 'Day 6', actual: null, predicted: 24.95, min: 24.05, max: 25.85 },
      { date: 'Day 7', actual: null, predicted: 25.20, min: 24.20, max: 26.20 },
    ],
    copper: [
      { date: 'Today', actual: 4.05, predicted: 4.05, min: 4.05, max: 4.05 },
      { date: 'Day 1', actual: null, predicted: 4.08, min: 4.02, max: 4.14 },
      { date: 'Day 2', actual: null, predicted: 4.12, min: 4.04, max: 4.20 },
      { date: 'Day 3', actual: null, predicted: 4.15, min: 4.05, max: 4.25 },
      { date: 'Day 4', actual: null, predicted: 4.18, min: 4.06, max: 4.30 },
      { date: 'Day 5', actual: null, predicted: 4.22, min: 4.08, max: 4.36 },
      { date: 'Day 6', actual: null, predicted: 4.26, min: 4.10, max: 4.42 },
      { date: 'Day 7', actual: null, predicted: 4.30, min: 4.12, max: 4.48 },
    ],
  };
  
  // Mock trading bot data
  const tradingBots = [
    { 
      id: "gold-momentum", 
      name: "Gold Momentum Trader", 
      description: "Uses momentum indicators to identify potential entry and exit points for gold trading",
      commodity: "Gold",
      strategy: "Momentum",
      successRate: "76%",
      monthlyReturn: "+3.2%",
      riskLevel: "Medium",
    },
    { 
      id: "oil-reversal", 
      name: "Oil Reversal Strategy", 
      description: "Identifies potential reversal points in crude oil prices using pattern recognition",
      commodity: "Crude Oil",
      strategy: "Reversal",
      successRate: "68%",
      monthlyReturn: "+4.1%",
      riskLevel: "High",
    },
    { 
      id: "multi-commodity", 
      name: "Multi-Commodity Arbitrage", 
      description: "Exploits price differences between related commodities across different markets",
      commodity: "Multiple",
      strategy: "Arbitrage",
      successRate: "82%",
      monthlyReturn: "+2.8%",
      riskLevel: "Low",
    },
  ];
  
  // Mock risk analysis data
  const riskAnalysisData = [
    { factor: "Market Volatility", status: "Elevated", impact: "High", recommendation: "Reduce position sizes by 15%" },
    { factor: "Liquidity Risk", status: "Normal", impact: "Low", recommendation: "Standard operations" },
    { factor: "Correlation Risk", status: "Elevated", impact: "Medium", recommendation: "Diversify commodity selections" },
    { factor: "Geopolitical Risk", status: "High", impact: "High", recommendation: "Implement hedging strategies" },
    { factor: "Regulatory Risk", status: "Low", impact: "Low", recommendation: "Standard operations" },
  ];
  
  // Mock recent alerts
  const recentAlerts = [
    { id: 1, type: "fraud", title: "Suspicious Trading Pattern Detected", description: "Unusual volume in silver trades detected from IP 192.168.1.45", severity: "high", time: "5 minutes ago" },
    { id: 2, type: "risk", title: "Risk Threshold Exceeded", description: "Gold position exceeds 25% of portfolio allocation", severity: "medium", time: "27 minutes ago" },
    { id: 3, type: "system", title: "API Connection Issue", description: "Temporary connection issue with market data provider", severity: "low", time: "1 hour ago" },
    { id: 4, type: "fraud", title: "Multiple Failed Authentication", description: "5 failed login attempts from unknown location", severity: "medium", time: "2 hours ago" },
  ];
  
  // Chart config
  const chartConfig = {
    actual: { color: '#1a365d' },   // commodity-blue
    predicted: { color: '#c99a28' }, // commodity-gold
    min: { color: '#f7fafc' },      // commodity-gray
    max: { color: '#2d3748' },      // commodity-dark-gray
  };
  
  // Toggle trading bot status
  const toggleBot = (botId: string) => {
    setActiveBots(prev => ({
      ...prev,
      [botId]: !prev[botId]
    }));
  };
  
  // Handle risk tolerance change
  const handleRiskToleranceChange = (value: number[]) => {
    setRiskTolerance(value[0]);
  };
  
  // Handle commodity selection change for forecast
  const handleCommodityChange = (value: string) => {
    setSelectedCommodity(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-commodity-blue">AI & Automated Trading</h1>
          <p className="text-gray-600">Advanced AI tools for forecasting, trading automation, and risk management</p>
        </div>
        
        <Tabs defaultValue="forecast" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Price Forecasting</span>
              <span className="sm:hidden">Forecast</span>
            </TabsTrigger>
            <TabsTrigger value="bots" className="flex items-center gap-2">
              <Robot className="h-4 w-4" />
              <span className="hidden sm:inline">Trading Bots</span>
              <span className="sm:hidden">Bots</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span className="hidden sm:inline">Risk Management</span>
              <span className="sm:hidden">Risk</span>
            </TabsTrigger>
            <TabsTrigger value="fraud" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Fraud Detection</span>
              <span className="sm:hidden">Fraud</span>
            </TabsTrigger>
          </TabsList>
          
          {/* AI Price Forecasting Tab */}
          <TabsContent value="forecast" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LineChartIcon className="h-5 w-5" />
                      AI Price Forecast
                    </CardTitle>
                    <Select value={selectedCommodity} onValueChange={handleCommodityChange}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select commodity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="oil">Crude Oil</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="copper">Copper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <CardDescription>
                    7-day price forecast using machine learning models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={chartConfig}>
                      <LineChart 
                        data={forecastData[selectedCommodity as keyof typeof forecastData]} 
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          name="Actual" 
                          stroke="#1a365d" 
                          strokeWidth={2} 
                          dot={{ r: 5 }} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          name="Predicted" 
                          stroke="#c99a28" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          strokeDasharray="5 5"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="min" 
                          name="Min Range" 
                          stroke="#94a3b8" 
                          strokeWidth={1} 
                          dot={false}
                          strokeDasharray="3 3"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="max" 
                          name="Max Range" 
                          stroke="#64748b" 
                          strokeWidth={1} 
                          dot={false}
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5" />
                    Price Predictions
                  </CardTitle>
                  <CardDescription>
                    AI-powered price targets for {selectedCommodity.charAt(0).toUpperCase() + selectedCommodity.slice(1)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Time Frame</span>
                      <span className="font-medium">Prediction</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>24 Hours</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">
                          {forecastData[selectedCommodity as keyof typeof forecastData][1].predicted}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>3 Days</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">
                          {forecastData[selectedCommodity as keyof typeof forecastData][3].predicted}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>7 Days</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">
                          {forecastData[selectedCommodity as keyof typeof forecastData][7].predicted}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Prediction Confidence</AlertTitle>
                        <AlertDescription>
                          These predictions have a 78% historical accuracy rate for {selectedCommodity}
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="w-full bg-commodity-blue hover:bg-blue-800">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Generate Detailed Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Trading Bots Tab */}
          <TabsContent value="bots" className="mt-6">
            <div className="grid gap-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Robot className="h-5 w-5" />
                    Automated Trading Agents
                  </CardTitle>
                  <CardDescription>
                    Configure and manage AI-powered trading bots to automate your trading strategy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {tradingBots.map((bot) => (
                      <div key={bot.id} className="p-4 border rounded-lg">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                          <div>
                            <h3 className="font-bold text-commodity-blue flex items-center gap-2">
                              {bot.name}
                              <Badge className={
                                bot.riskLevel === "Low" ? "bg-green-100 text-green-800" : 
                                bot.riskLevel === "Medium" ? "bg-amber-100 text-amber-800" : 
                                "bg-red-100 text-red-800"
                              }>
                                {bot.riskLevel} Risk
                              </Badge>
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">{bot.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {activeBots[bot.id] ? "Active" : "Inactive"}
                            </span>
                            <Switch 
                              checked={activeBots[bot.id]} 
                              onCheckedChange={() => toggleBot(bot.id)} 
                            />
                            <Button variant="outline" size="sm" className="ml-2">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                          <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Commodity</div>
                            <div className="font-medium">{bot.commodity}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Strategy</div>
                            <div className="font-medium">{bot.strategy}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Success Rate</div>
                            <div className="font-medium">{bot.successRate}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Monthly Return</div>
                            <div className="font-medium text-green-600">{bot.monthlyReturn}</div>
                          </div>
                        </div>
                        
                        {activeBots[bot.id] && (
                          <div className="mt-4 p-3 border border-green-200 bg-green-50 rounded-md flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <PlayCircle className="h-5 w-5 text-green-600" />
                              <span className="text-green-800">Bot is actively monitoring market conditions</span>
                            </div>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => toggleBot(bot.id)}>
                              <PauseCircle className="mr-2 h-4 w-4" />
                              Pause Bot
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button className="bg-commodity-gold hover:bg-amber-600">
                      <Robot className="mr-2 h-4 w-4" />
                      Create New Trading Bot
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Risk Management Tab */}
          <TabsContent value="risk" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" />
                    Risk Analysis
                  </CardTitle>
                  <CardDescription>
                    AI-powered analysis of current market risks and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Risk Factor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Recommendation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {riskAnalysisData.map((risk, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{risk.factor}</TableCell>
                          <TableCell>
                            <Badge className={
                              risk.status === "Normal" ? "bg-green-100 text-green-800" :
                              risk.status === "Elevated" ? "bg-amber-100 text-amber-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {risk.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{risk.impact}</TableCell>
                          <TableCell>{risk.recommendation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Risk Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your risk tolerance and management settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-medium">Risk Tolerance Level</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Conservative</span>
                        <Slider
                          value={[riskTolerance]}
                          onValueChange={handleRiskToleranceChange}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-500">Aggressive</span>
                      </div>
                      <div className="text-center mt-2">
                        <Badge className={
                          riskTolerance < 33 ? "bg-green-100 text-green-800" :
                          riskTolerance < 66 ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {riskTolerance < 33 ? "Low Risk" :
                           riskTolerance < 66 ? "Medium Risk" :
                           "High Risk"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>Stop Loss Protection</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>Volatile Market Alerts</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>Exposure Limits</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>Hedging Automation</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <Button className="w-full bg-commodity-blue hover:bg-blue-800">
                      Save Risk Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Fraud Detection Tab */}
          <TabsContent value="fraud" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Fraud Detection & Security Alerts
                </CardTitle>
                <CardDescription>
                  Real-time monitoring system to detect suspicious activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 border rounded-lg ${
                      alert.severity === "high" ? "border-red-300 bg-red-50" :
                      alert.severity === "medium" ? "border-amber-300 bg-amber-50" :
                      "border-blue-300 bg-blue-50"
                    }`}>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {alert.title}
                            </h3>
                            <Badge className={
                              alert.severity === "high" ? "bg-red-100 text-red-800" :
                              alert.severity === "medium" ? "bg-amber-100 text-amber-800" :
                              "bg-blue-100 text-blue-800"
                            }>
                              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700">{alert.description}</p>
                        </div>
                        <div className="text-sm text-gray-500">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold">Security Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Unusual Activity Detection</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>IP-based Authentication</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Transaction Verification</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>Advanced Pattern Detection</span>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Security Status</AlertTitle>
                    <AlertDescription>
                      Your account is protected by multi-factor authentication and AI fraud detection
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AiTrading;
