
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Database, Upload, FileSpreadsheet, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import GlassMorphCard from '../ui/GlassMorphCard';
import ProgressIndicator from '../ui/ProgressIndicator';
import { staggerContainer, staggerItem } from '@/utils/transitions';
import AIAnnotation from '@/components/ui/AIAnnotation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const steps = ["Onboarding", "Data Source", "Model Selection", "Forecast Setup", "Constraints", "Dashboard"];
const routes = ["/", "/data-source", "/model-selection", "/forecast-setup", "/constraints", "/dashboard"];

const DataSourceScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Business context state
  const [businessType, setBusinessType] = useState('');
  const [productLifecycle, setProductLifecycle] = useState('');
  const [salesChannels, setSalesChannels] = useState({ online: '', offline: '' });
  const [forecastingGoals, setForecastingGoals] = useState({
    replenishment: false,
    newProduct: false,
    promotions: false,
    seasonality: false
  });
  
  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    
    // Simulate file upload if a file source is selected
    if (source === 'csv' || source === 'excel') {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
      }, 2000);
    }
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  const handleContinue = () => {
    navigate('/model-selection');
  };

  return (
    <div className="max-w-full mx-auto">
      <ProgressIndicator steps={steps} currentStep={1} routes={routes} />
      
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight mb-2">Data Connection</h1>
        <p className="text-gray-600">Connect your data source to generate accurate forecasts.</p>
      </motion.div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Business Context</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Business Type</label>
              <select 
                className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="apparel">Apparel</option>
                <option value="beauty">Beauty</option>
                <option value="electronics">Electronics</option>
                <option value="homeGoods">Home Goods</option>
                <option value="food">Food & Beverage</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Product Lifecycle</label>
              <div className="grid grid-cols-3 gap-2">
                {['Seasonal', 'Evergreen', 'Short'].map((type) => (
                  <label 
                    key={type}
                    className={`flex items-center justify-center p-1.5 text-xs border rounded-md cursor-pointer transition-colors ${
                      productLifecycle === type.toLowerCase() 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="productLifecycle"
                      value={type.toLowerCase()}
                      checked={productLifecycle === type.toLowerCase()}
                      onChange={(e) => setProductLifecycle(e.target.value)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Sales Channel Split (%)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Online</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 60"
                  className="w-full p-1.5 text-sm"
                  value={salesChannels.online}
                  onChange={(e) => setSalesChannels({...salesChannels, online: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Offline</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 40"
                  className="w-full p-1.5 text-sm"
                  value={salesChannels.offline}
                  onChange={(e) => setSalesChannels({...salesChannels, offline: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Forecasting Goals</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'replenishment', label: 'Replenishment' },
                { id: 'newProduct', label: 'New Product Launch' },
                { id: 'promotions', label: 'Promotions' },
                { id: 'seasonality', label: 'Seasonality' }
              ].map((goal) => (
                <label 
                  key={goal.id}
                  className={`flex items-center p-2 text-xs border rounded-md cursor-pointer transition-colors ${
                    forecastingGoals[goal.id as keyof typeof forecastingGoals] 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-1.5 h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={forecastingGoals[goal.id as keyof typeof forecastingGoals]}
                    onChange={(e) => setForecastingGoals({...forecastingGoals, [goal.id]: e.target.checked})}
                  />
                  <span className="text-xs">{goal.label}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <h2 className="text-lg font-semibold mb-4">Connect Your Data</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={staggerItem}>
          <GlassMorphCard 
            className={`h-full ${selectedSource === 'sheets' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleSourceSelect('sheets')}
          >
            <div className="flex flex-col items-center text-center h-full p-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Use Current Sheet Data</h3>
              <p className="text-gray-600 mb-4 text-sm">
                We will read the data from your currently active sheet. Please ensure it follows the template structure.
              </p>
              <div className="bg-green-50 p-3 rounded-lg w-full mt-auto">
                <p className="text-sm text-green-700">
                  <span className="font-medium">Ready to use:</span> This option works with your existing sheet data.
                </p>
              </div>
            </div>
          </GlassMorphCard>
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <GlassMorphCard 
            className={`h-full ${['shopify', 'csv', 'excel'].includes(selectedSource || '') ? 'ring-2 ring-primary' : ''}`}
            onClick={() => {}}
            hover={false}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <Database size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">Connect External Source</h3>
                <p className="text-gray-600 text-sm">
                  Import data from external sources like Shopify, CSV, or other spreadsheets.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <button 
                  className={`p-3 rounded-lg border transition-all ${
                    selectedSource === 'shopify' 
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  } flex flex-col items-center`}
                  onClick={() => handleSourceSelect('shopify')}
                >
                  <ShoppingBag size={20} className="text-gray-700 mb-2" />
                  <span className="text-xs font-medium">Shopify</span>
                </button>
                
                <button 
                  className={`p-3 rounded-lg border transition-all ${
                    selectedSource === 'csv' 
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  } flex flex-col items-center`}
                  onClick={() => handleSourceSelect('csv')}
                >
                  <Upload size={20} className="text-gray-700 mb-2" />
                  <span className="text-xs font-medium">CSV</span>
                </button>
                
                <button 
                  className={`p-3 rounded-lg border transition-all ${
                    selectedSource === 'excel' 
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  } flex flex-col items-center`}
                  onClick={() => handleSourceSelect('excel')}
                >
                  <FileSpreadsheet size={20} className="text-gray-700 mb-2" />
                  <span className="text-xs font-medium">Excel</span>
                </button>
              </div>
              
              {isUploading && (
                <div className="bg-blue-50 p-3 rounded-lg mt-auto">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 animate-pulse">
                      <Upload size={16} className="text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-blue-700">Uploading file...</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full animate-shimmer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 background-size-200" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
              
              {selectedSource === 'shopify' && (
                <div className="bg-blue-50 p-3 rounded-lg mt-auto">
                  <p className="text-xs text-blue-700">
                    <span className="font-medium">Connect your Shopify store:</span> You'll be prompted to authorize access to your store data.
                  </p>
                </div>
              )}
            </div>
          </GlassMorphCard>
        </motion.div>
      </motion.div>
      
      <AIAnnotation title="Data Structure Information">
        <div className="space-y-2">
          <p className="text-sm">We'll automatically interpret your columns (SKU, sales, inventory) once data is connected.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {['SKU', 'Product Name', 'Category', 'Price', 'Cost', 'Daily Sales', 'Lead Time', 'Min Stock'].map((column) => (
              <div key={column} className="bg-gray-100 px-2 py-1 rounded-md text-xs">{column}</div>
            ))}
          </div>
        </div>
      </AIAnnotation>
      
      <div className="flex justify-between mt-6">
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
          disabled={!selectedSource}
        >
          Next
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default DataSourceScreen;
