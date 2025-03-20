
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Database, Upload, FileSpreadsheet, ShoppingBag, ArrowLeft, Download, ArrowRight } from 'lucide-react';
import GlassMorphCard from '../ui/GlassMorphCard';
import ProgressIndicator from '../ui/ProgressIndicator';
import { staggerContainer, staggerItem } from '@/utils/transitions';
import AIAnnotation from '@/components/ui/AIAnnotation';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const steps = ["Onboarding", "Data Source", "Model Selection", "Forecast Setup", "Constraints", "Dashboard"];

// Define the form schema
const formSchema = z.object({
  businessType: z.string().min(1, { message: "Please select a business type" }),
  productLifecycle: z.string().min(1, { message: "Please select a product lifecycle" }),
  salesChannels: z.object({
    online: z.string().refine(val => !val || !isNaN(Number(val)), { message: "Must be a number" }),
    offline: z.string().refine(val => !val || !isNaN(Number(val)), { message: "Must be a number" }),
  }),
  forecastingGoals: z.object({
    replenishment: z.boolean().default(false),
    newProduct: z.boolean().default(false),
    promotions: z.boolean().default(false),
    seasonality: z.boolean().default(false)
  })
});

type FormValues = z.infer<typeof formSchema>;

const DataSourceScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
      productLifecycle: '',
      salesChannels: {
        online: '',
        offline: '',
      },
      forecastingGoals: {
        replenishment: false,
        newProduct: false,
        promotions: false,
        seasonality: false
      }
    }
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
    form.handleSubmit((data) => {
      console.log('Form data:', data);
      navigate('/model-selection');
    })();
  };

  return (
    <div className="max-w-full mx-auto">
      <ProgressIndicator steps={steps} currentStep={1} />
      
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight mb-2">Business Context & Data Connection</h1>
        <p className="text-gray-600">Tell us about your business and connect your data source.</p>
      </motion.div>
      
      <Form {...form}>
        <form>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-base font-semibold mb-4">Business Context</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-gray-700">Business Type</FormLabel>
                      <select 
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        {...field}
                      >
                        <option value="">Select Type</option>
                        <option value="apparel">Apparel</option>
                        <option value="beauty">Beauty</option>
                        <option value="electronics">Electronics</option>
                        <option value="homeGoods">Home Goods</option>
                        <option value="food">Food & Beverage</option>
                        <option value="other">Other</option>
                      </select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productLifecycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-gray-700">Product Lifecycle</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-3 gap-2"
                      >
                        {['Seasonal', 'Evergreen', 'Short'].map((type) => (
                          <FormItem key={type} className="flex items-center space-x-0">
                            <label 
                              className={`flex items-center justify-center p-1.5 text-xs border rounded-md cursor-pointer transition-colors w-full ${
                                field.value === type.toLowerCase() 
                                  ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={type.toLowerCase()}
                                  className="sr-only"
                                />
                              </FormControl>
                              <span>{type}</span>
                            </label>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormLabel className="block text-xs font-medium text-gray-700 mb-1">Sales Channel Split (%)</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="salesChannels.online"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs text-gray-600 mb-1">Online</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 60"
                            className="w-full p-1.5 text-sm"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salesChannels.offline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs text-gray-600 mb-1">Offline</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 40"
                            className="w-full p-1.5 text-sm"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <FormLabel className="block text-xs font-medium text-gray-700 mb-1">Forecasting Goals</FormLabel>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'replenishment', label: 'Replenishment' },
                    { id: 'newProduct', label: 'New Product Launch' },
                    { id: 'promotions', label: 'Promotions' },
                    { id: 'seasonality', label: 'Seasonality' }
                  ].map((goal) => (
                    <FormField
                      key={goal.id}
                      control={form.control}
                      name={`forecastingGoals.${goal.id}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <label 
                            className={`flex items-center p-2 text-xs border rounded-md cursor-pointer transition-colors ${
                              field.value 
                                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="mr-1.5 h-3 w-3"
                              />
                            </FormControl>
                            <span className="text-xs">{goal.label}</span>
                          </label>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
      
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
          <button className="inline-flex items-center px-3 py-1.5 border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors text-sm">
            <Download size={16} className="mr-1.5" />
            Download Template
          </button>
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
