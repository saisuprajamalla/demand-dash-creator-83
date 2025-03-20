
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Info, CheckCircle, LineChart, Brain } from 'lucide-react';
import GlassMorphCard from '../ui/GlassMorphCard';
import ProgressIndicator from '../ui/ProgressIndicator';
import AIAnnotation from '@/components/ui/AIAnnotation';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const steps = ["Onboarding", "Data Source", "Model Selection", "Forecast Setup", "Constraints", "Dashboard"];

const models = [
  {
    id: 'prophet',
    name: 'Prophet',
    description: 'Best for seasonal patterns and trends with multiple seasonality.',
    strengths: ['Handles holidays', 'Multiple seasonality', 'Trend changepoints'],
    dataNeeded: 'At least 1 year of historical data preferred',
    complexity: 'Medium',
  },
  {
    id: 'sarima',
    name: 'SARIMA',
    description: 'Powerful for stable time series with clear seasonal patterns.',
    strengths: ['Strong with stable patterns', 'Good with regular seasonality', 'Statistical rigor'],
    dataNeeded: 'At least 2-3 complete seasonal cycles',
    complexity: 'High',
  },
  {
    id: 'lightgbm',
    name: 'LightGBM',
    description: 'Machine learning approach for complex patterns and many features.',
    strengths: ['Handles many variables', 'Can incorporate external factors', 'Non-linear patterns'],
    dataNeeded: 'Large dataset with multiple features preferred',
    complexity: 'Medium-High',
  },
  {
    id: 'ensemble',
    name: 'Ensemble',
    description: 'Combines multiple models for more robust forecasts.',
    strengths: ['Reduces individual model errors', 'More stable predictions', 'Best overall performance'],
    dataNeeded: 'Sufficient data for all component models',
    complexity: 'High',
  },
];

const ModelSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [recommendedModel, setRecommendedModel] = useState('prophet');
  const [selectedModel, setSelectedModel] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  
  useEffect(() => {
    // Simulate data analysis to determine best model
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setSelectedModel('prophet');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };
  
  const handleBack = () => {
    navigate('/data-source');
  };
  
  const handleContinue = () => {
    navigate('/forecast-setup');
  };

  return (
    <div className="max-w-full mx-auto">
      <ProgressIndicator steps={steps} currentStep={2} />
      
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight mb-2">Recommended Forecast Model</h1>
        <p className="text-gray-600">We'll automatically select the best model based on your data.</p>
      </motion.div>
      
      <AIAnnotation title="AI Model Selection">
        <GlassMorphCard className="mb-6" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Auto-Inferred Model</h2>
            {isAnalyzing ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2">
                  <LineChart className="text-primary" size={20} />
                </div>
                <span className="text-sm">Analyzing data patterns...</span>
              </div>
            ) : (
              <div className="flex items-center text-green-600">
                <CheckCircle size={20} className="mr-2" />
                <span className="text-sm font-medium">Analysis complete</span>
              </div>
            )}
          </div>
          
          {isAnalyzing ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Brain className="text-primary" size={24} />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Prophet is recommended for your data</h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Based on your business type (Apparel) and product lifecycle (Seasonal), 
                    we recommend Prophet for its ability to handle seasonal patterns.
                  </p>
                  
                  <h4 className="font-medium mb-1 text-sm">Why this model?</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                    <li>Detected weekly & yearly seasonality in your data</li>
                    <li>Multiple trend changes found in your time series</li>
                    <li>Sufficient historical data (14 months) for accurate forecasting</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </GlassMorphCard>
      </AIAnnotation>
      
      <div className="mb-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <button 
              className="flex items-center text-primary mb-4"
            >
              <span className="font-medium mr-2">Advanced Model Override</span>
              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Info size={18} className="text-amber-500 mr-2" />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Choose a different model if needed, or keep the AI recommendation.</span> Our recommended model is optimized based on your data characteristics.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {models.map((model) => (
                  <div 
                    key={model.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedModel === model.id 
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                    onClick={() => handleModelSelect(model.id)}
                  >
                    <div className="flex items-start">
                      <div className={`mt-1 w-5 h-5 rounded-full border ${
                        selectedModel === model.id ? 'border-primary' : 'border-gray-300'
                      } flex items-center justify-center mr-3`}>
                        {selectedModel === model.id && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{model.name}</h4>
                          {model.id === recommendedModel && !isAnalyzing && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Recommended</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                        
                        <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-medium block mb-1">Key Strengths:</span>
                            <ul className="list-disc pl-4 text-gray-700 space-y-0.5">
                              {model.strengths.map((strength, i) => (
                                <li key={i}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium block mb-1">Data Requirements:</span>
                            <p className="text-gray-700">{model.dataNeeded}</p>
                            <span className="font-medium block mt-2 mb-1">Complexity:</span>
                            <p className="text-gray-700">{model.complexity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
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
          disabled={isAnalyzing}
        >
          Continue to Forecast Setup
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ModelSelectionScreen;
