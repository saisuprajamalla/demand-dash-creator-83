
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Refresh, Calendar, AlertTriangle, Info } from 'lucide-react';
import GlassMorphCard from '../ui/GlassMorphCard';
import ProgressIndicator from '../ui/ProgressIndicator';
import { pageTransition } from '@/utils/transitions';

const steps = ["Onboarding", "Data Source", "Model Selection", "Forecast Setup", "Constraints", "Dashboard"];

// Sample forecast data
const initialForecastData = [
  { sku: 'ALX-001', name: 'Men\'s Basic Tee', forecast: 215, confidence: '±35', initialOrder: 250, optimizedOrder: 250 },
  { sku: 'ALX-002', name: 'Women\'s V-Neck Tee', forecast: 340, confidence: '±42', initialOrder: 400, optimizedOrder: 420 },
  { sku: 'ALX-003', name: 'Slim Fit Jeans', forecast: 120, confidence: '±18', initialOrder: 130, optimizedOrder: 140 },
  { sku: 'ALX-004', name: 'Hooded Sweatshirt', forecast: 85, confidence: '±12', initialOrder: 100, optimizedOrder: 100 },
  { sku: 'ALX-005', name: 'Casual Shorts', forecast: 175, confidence: '±28', initialOrder: 210, optimizedOrder: 230 },
];

const ConstraintsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [forecastData, setForecastData] = useState(initialForecastData);
  const [minOrderQty, setMinOrderQty] = useState('10');
  const [maxOrderQty, setMaxOrderQty] = useState('1000');
  const [safetyStock, setSafetyStock] = useState('15');
  const [leadTime, setLeadTime] = useState('21');
  const [fillRate, setFillRate] = useState('95');
  const [promotionDate, setPromotionDate] = useState('');
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  
  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      setIsOptimized(true);
      // Simulate changes to orders based on constraints
      setForecastData(prev => prev.map(item => ({
        ...item,
        optimizedOrder: Math.max(
          parseInt(minOrderQty), 
          Math.min(
            parseInt(maxOrderQty),
            Math.ceil(item.forecast * (1 + parseInt(safetyStock) / 100))
          )
        )
      })));
    }, 1500);
  };
  
  const handleBack = () => {
    navigate('/forecast-setup');
  };
  
  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div 
      className="container max-w-5xl px-4 py-12 mx-auto"
      {...pageTransition}
    >
      <ProgressIndicator steps={steps} currentStep={4} />
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Business Constraints & Optimization</h1>
        <p className="text-lg text-gray-600">Fine-tune your forecast with real-world business constraints.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <GlassMorphCard className="h-full" hover={false}>
            <h2 className="text-xl font-semibold mb-6">Business Constraints</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Order Qty</label>
                  <input
                    type="number"
                    value={minOrderQty}
                    onChange={(e) => setMinOrderQty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Order Qty</label>
                  <input
                    type="number"
                    value={maxOrderQty}
                    onChange={(e) => setMaxOrderQty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Safety Stock (%)</label>
                <input
                  type="number"
                  value={safetyStock}
                  onChange={(e) => setSafetyStock(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Time (days)</label>
                <input
                  type="number"
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desired Fill Rate (%)</label>
                <input
                  type="number"
                  value={fillRate}
                  onChange={(e) => setFillRate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Event Date</label>
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
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full flex items-center justify-center mt-6"
                onClick={handleRecalculate}
                disabled={isRecalculating}
              >
                {isRecalculating ? (
                  <>
                    <div className="animate-spin mr-2">
                      <Refresh size={18} />
                    </div>
                    Recalculating...
                  </>
                ) : (
                  <>
                    <Refresh size={18} className="mr-2" />
                    Apply & Recalculate
                  </>
                )}
              </motion.button>
            </div>
          </GlassMorphCard>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Optimized Order Quantities</h2>
              
              {isOptimized && (
                <div className="flex items-center text-green-600 text-sm">
                  <Info size={16} className="mr-1" />
                  Orders optimized based on your constraints
                </div>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initial Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimized Order</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forecastData.map((item, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${isOptimized && item.initialOrder !== item.optimizedOrder ? 'bg-blue-50' : ''}`}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.forecast} <span className="text-gray-500 text-xs">{item.confidence}</span></td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.initialOrder}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className={`font-medium ${isOptimized && item.initialOrder !== item.optimizedOrder ? 'text-blue-600' : 'text-gray-900'}`}>
                            {item.optimizedOrder}
                          </span>
                          
                          {isOptimized && item.initialOrder !== item.optimizedOrder && (
                            <span className={`ml-2 text-xs font-medium ${item.optimizedOrder > item.initialOrder ? 'text-green-600' : 'text-amber-600'}`}>
                              {item.optimizedOrder > item.initialOrder ? '+' : ''}{item.optimizedOrder - item.initialOrder}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {isOptimized && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-1">Total Forecast Demand</h3>
                  <p className="text-2xl font-bold text-blue-900">935 units</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-1">Fill Rate Achieved</h3>
                  <p className="text-2xl font-bold text-green-900">97.5%</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-medium text-amber-700 mb-1">Inventory Cost Impact</h3>
                  <p className="text-2xl font-bold text-amber-900">+$1,250</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
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
          className={`btn-primary ${!isOptimized ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isOptimized}
          onClick={handleContinue}
        >
          Continue to Dashboard
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ConstraintsScreen;
