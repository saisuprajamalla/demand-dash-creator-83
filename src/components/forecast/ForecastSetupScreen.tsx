
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, RefreshCw, LineChart, BarChart3, Sparkles } from 'lucide-react';
import GlassMorphCard from '../ui/GlassMorphCard';
import ProgressIndicator from '../ui/ProgressIndicator';
import AIAnnotation from '@/components/ui/AIAnnotation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const steps = ["Onboarding", "Data Source", "Model Selection", "Forecast Setup", "Constraints", "Dashboard"];
const routes = ["/", "/data-source", "/model-selection", "/forecast-setup", "/constraints", "/dashboard"];

const ForecastSetupScreen: React.FC = () => {
  const navigate = useNavigate();
  const [horizon, setHorizon] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Constraints state
  const [minOrderQty, setMinOrderQty] = useState('10');
  const [maxOrderQty, setMaxOrderQty] = useState('1000');
  const [safetyStock, setSafetyStock] = useState('15');
  const [leadTime, setLeadTime] = useState('21');
  const [fillRate, setFillRate] = useState('95');
  const [promotionDate, setPromotionDate] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [forecastReady, setForecastReady] = useState(false);
  
  const handleForecastGenerate = () => {
    setIsLoading(true);
    // Simulate forecast generation
    setTimeout(() => {
      setIsLoading(false);
      setForecastReady(true);
    }, 3000);
  };
  
  const handleBack = () => {
    navigate('/model-selection');
  };
  
  const handleContinue = () => {
    navigate('/constraints');
  };

  // Sample forecast data
  const forecastData = [
    { sku: 'SHIRT-001', product: 'Men\'s T-Shirt', forecast: 124, lower: 112, upper: 136, confidence: 'High' },
    { sku: 'DRESS-102', product: 'Summer Dress', forecast: 87, lower: 76, upper: 98, confidence: 'Medium' },
    { sku: 'SHOE-153', product: 'Running Shoes', forecast: 56, lower: 42, upper: 71, confidence: 'Low' },
    { sku: 'BAG-022', product: 'Tote Bag', forecast: 103, lower: 94, upper: 112, confidence: 'High' },
    { sku: 'HAT-034', product: 'Baseball Cap', forecast: 67, lower: 59, upper: 75, confidence: 'Medium' },
  ];

  return (
    <div className="max-w-full mx-auto">
      <ProgressIndicator steps={steps} currentStep={3} routes={routes} />
      
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight mb-2">Forecast Setup & Constraints</h1>
        <p className="text-gray-600">Define your forecast horizon and business constraints.</p>
      </motion.div>
      
      <ResizablePanelGroup direction="horizontal" className="min-h-[500px] mb-6">
        <ResizablePanel defaultSize={forecastReady ? 30 : 50}>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">Forecast Horizon</h2>
              
              <div className="grid grid-cols-4 gap-3 mb-6">
                {['30', '60', '90', '180'].map((days) => (
                  <button
                    key={days}
                    className={`py-2 px-3 rounded-lg border transition-all flex flex-col items-center ${
                      horizon === days 
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 text-gray-600'
                    }`}
                    onClick={() => setHorizon(days)}
                  >
                    <span className="text-lg font-medium">{days}</span>
                    <span className="text-xs">Days</span>
                  </button>
                ))}
              </div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium">Custom Range</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input 
                      type="date" 
                      className="w-full p-1.5 text-sm border border-gray-300 rounded"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input 
                      type="date" 
                      className="w-full p-1.5 text-sm border border-gray-300 rounded"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <h2 className="text-lg font-medium mb-4 pt-2 border-t border-gray-100">Business Constraints</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Min Order Qty</label>
                    <Input
                      type="number"
                      value={minOrderQty}
                      onChange={(e) => setMinOrderQty(e.target.value)}
                      className="w-full p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Max Order Qty</label>
                    <Input
                      type="number"
                      value={maxOrderQty}
                      onChange={(e) => setMaxOrderQty(e.target.value)}
                      className="w-full p-2 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Safety Stock (%)</label>
                  <Input
                    type="number"
                    value={safetyStock}
                    onChange={(e) => setSafetyStock(e.target.value)}
                    className="w-full p-2 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Lead Time (days)</label>
                  <Input
                    type="number"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    className="w-full p-2 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Desired Fill Rate (%)</label>
                  <Input
                    type="number"
                    value={fillRate}
                    onChange={(e) => setFillRate(e.target.value)}
                    className="w-full p-2 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Promotion Event Date (Optional)</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      value={promotionDate}
                      onChange={(e) => setPromotionDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                className="w-full mt-6"
                onClick={handleForecastGenerate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    Generating Forecast...
                  </>
                ) : (
                  <>
                    <LineChart size={18} className="mr-2" />
                    Apply & Forecast
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </ResizablePanel>
        
        {(isLoading || forecastReady) && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={forecastReady ? 70 : 50}>
              {isLoading && (
                <GlassMorphCard hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Generating Forecast</h3>
                    <div className="flex items-center">
                      <RefreshCw size={16} className="text-primary animate-spin mr-2" />
                      <span className="text-sm text-gray-600">Processing...</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Analyzing historical patterns</span>
                        <span>Done</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Applying Prophet model</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Calculating confidence intervals</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Applying business constraints</span>
                        <span>Pending</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </GlassMorphCard>
              )}
              
              {forecastReady && (
                <AIAnnotation title="AI-Generated Forecast">
                  <GlassMorphCard hover={false}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Forecast Results</h3>
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                          <BarChart3 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast ({horizon} days)</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">95% CI Low</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">95% CI High</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {forecastData.map((item, index) => (
                            <tr key={item.sku} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.sku}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.product}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.forecast.toLocaleString()}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-500">{item.lower.toLocaleString()}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-500">{item.upper.toLocaleString()}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                                  ${item.confidence === 'High' ? 'bg-green-100 text-green-800' : 
                                    item.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'}`}>
                                  {item.confidence}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="flex items-center mt-4 bg-green-50 p-3 rounded-lg">
                      <Sparkles size={18} className="text-green-600 mr-2 flex-shrink-0" />
                      <div className="text-sm text-green-700">
                        <p className="font-medium">AI Insights</p>
                        <p>We identified a seasonal pattern with a peak expected in 30 days. SHIRT-001 and BAG-022 show highest growth potential. Consider increasing inventory for these items as they show the highest demand forecast accuracy.</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-700 mb-2">Why did the model pick these numbers?</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        The forecast is based on several key factors from your historical data:
                      </p>
                      <ul className="list-disc pl-5 text-sm text-blue-700">
                        <li>Strong weekly seasonality with peaks on weekends</li>
                        <li>Last year's sales spike during the same period</li>
                        <li>Recent 3-month upward trend in overall demand</li>
                        <li>Similar products showing correlated demand patterns</li>
                      </ul>
                    </div>
                  </GlassMorphCard>
                </AIAnnotation>
              )}
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <Button
          onClick={handleContinue}
          className="flex items-center gap-1"
          disabled={!forecastReady}
        >
          Continue to Constraints
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ForecastSetupScreen;
