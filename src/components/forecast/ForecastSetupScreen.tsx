
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, RefreshCw, LineChart, Download, BarChart3, Sparkles } from 'lucide-react';
import GlassMorphCard from '../ui/GlassMorphCard';
import ProgressIndicator from '../ui/ProgressIndicator';
import { staggerContainer, staggerItem } from '@/utils/transitions';
import AIAnnotation from '@/components/ui/AIAnnotation';

const steps = ["Onboarding", "Data Source", "Model Selection", "Forecast Setup", "Constraints", "Dashboard"];

const ForecastSetupScreen: React.FC = () => {
  const navigate = useNavigate();
  const [horizon, setHorizon] = useState('30');
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
      <ProgressIndicator steps={steps} currentStep={3} />
      
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight mb-2">Forecast Setup</h1>
        <p className="text-gray-600">Define your forecast horizon and generate predictions.</p>
      </motion.div>
      
      <GlassMorphCard className="mb-6" hover={false}>
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
              <input type="date" className="w-full p-1.5 text-sm border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <input type="date" className="w-full p-1.5 text-sm border border-gray-300 rounded" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            className={`inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                Generate Forecast
              </>
            )}
          </button>
        </div>
      </GlassMorphCard>
      
      {isLoading && (
        <div className="mb-6">
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
                  <span>Formatting results</span>
                  <span>Pending</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </GlassMorphCard>
        </div>
      )}
      
      {forecastReady && (
        <AIAnnotation title="AI-Generated Forecast">
          <GlassMorphCard className="mb-6" hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Forecast Results</h3>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <Download size={18} />
                </button>
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
              <Sparkles size={18} className="text-green-600 mr-2" />
              <div className="text-sm text-green-700">
                <p className="font-medium">AI Insights</p>
                <p>Based on your data, we've identified a strong seasonal pattern with peak demand expected in 30 days. Consider increasing inventory for SHIRT-001 and BAG-022 as they show the highest growth potential.</p>
              </div>
            </div>
          </GlassMorphCard>
        </AIAnnotation>
      )}
      
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-outline flex items-center"
          onClick={handleBack}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`btn-primary ${!forecastReady ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!forecastReady}
          onClick={handleContinue}
        >
          <ArrowRight size={18} className="ml-2 order-2" />
          <span className="order-1">Continue to Constraints</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ForecastSetupScreen;
