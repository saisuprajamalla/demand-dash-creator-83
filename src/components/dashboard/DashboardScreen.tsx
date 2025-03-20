
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  FileSpreadsheet, 
  FilePdf, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle,
  AlertTriangle,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import AIAnnotation from '@/components/ui/AIAnnotation';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';

// Sample data for demonstration
const forecastData = [
  { id: 1, sku: 'SHIRT-001', product: 'Classic T-Shirt', forecastDemand: 458, ciLow: 412, ciHigh: 504, optimizedOrder: 480, stockRisk: 'Low' },
  { id: 2, sku: 'BAG-022', product: 'Canvas Tote Bag', forecastDemand: 327, ciLow: 291, ciHigh: 360, optimizedOrder: 340, stockRisk: 'Low' },
  { id: 3, sku: 'PANT-114', product: 'Slim Fit Jeans', forecastDemand: 215, ciLow: 187, ciHigh: 243, optimizedOrder: 230, stockRisk: 'Medium' },
  { id: 4, sku: 'SHOE-078', product: 'Casual Sneakers', forecastDemand: 189, ciLow: 156, ciHigh: 218, optimizedOrder: 210, stockRisk: 'Medium' },
  { id: 5, sku: 'JACKET-045', product: 'Winter Jacket', forecastDemand: 143, ciLow: 119, ciHigh: 170, optimizedOrder: 160, stockRisk: 'High' },
  { id: 6, sku: 'HAT-033', product: 'Baseball Cap', forecastDemand: 278, ciLow: 245, ciHigh: 310, optimizedOrder: 290, stockRisk: 'Low' },
  { id: 7, sku: 'SOCK-061', product: 'Athletic Socks', forecastDemand: 526, ciLow: 490, ciHigh: 565, optimizedOrder: 550, stockRisk: 'Low' },
  { id: 8, sku: 'WATCH-017', product: 'Digital Watch', forecastDemand: 97, ciLow: 78, ciHigh: 120, optimizedOrder: 110, stockRisk: 'High' },
];

// Sample time series data for charts
const timeSeriesData = [
  { date: '2023-08', actual: 320, forecast: null, lower: null, upper: null },
  { date: '2023-09', actual: 350, forecast: null, lower: null, upper: null },
  { date: '2023-10', actual: 410, forecast: null, lower: null, upper: null },
  { date: '2023-11', actual: 490, forecast: null, lower: null, upper: null },
  { date: '2023-12', actual: 530, forecast: null, lower: null, upper: null },
  { date: '2024-01', actual: 510, forecast: null, lower: null, upper: null },
  { date: '2024-02', actual: 480, forecast: null, lower: null, upper: null },
  { date: '2024-03', actual: 450, forecast: 450, lower: 450, upper: 450 },
  { date: '2024-04', actual: null, forecast: 480, lower: 443, upper: 517 },
  { date: '2024-05', actual: null, forecast: 520, lower: 475, upper: 565 },
  { date: '2024-06', actual: null, forecast: 580, lower: 526, upper: 634 },
  { date: '2024-07', actual: null, forecast: 610, lower: 548, upper: 672 },
  { date: '2024-08', actual: null, forecast: 590, lower: 521, upper: 659 },
];

// Feature importance data for SHAP chart
const featureImportanceData = [
  { feature: 'Last Year Sales', importance: 0.35 },
  { feature: 'Seasonality', importance: 0.28 },
  { feature: 'Recent Trend', importance: 0.20 },
  { feature: 'Price Changes', importance: 0.12 },
  { feature: 'Holidays', importance: 0.05 },
];

const steps = ["Onboarding", "Data Source", "Model Selection", "Forecast Setup", "Constraints", "Dashboard"];

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>('SHIRT-001');
  const [expandedSection, setExpandedSection] = useState<string | null>('insights');
  
  const handleBackToConstraints = () => {
    navigate('/constraints');
  };
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleProductSelect = (sku: string) => {
    setSelectedProduct(sku);
  };

  return (
    <div className="max-w-full mx-auto">
      <ProgressIndicator steps={steps} currentStep={5} />
      
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight mb-2">Forecast Results & Optimization</h1>
        <p className="text-gray-600">View your AI-generated forecast with explanations and recommendations.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Forecast Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Forecast & Order Recommendations</CardTitle>
                <CardDescription>30-day forecast for your products with confidence intervals</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileSpreadsheet size={16} />
                  CSV
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FilePdf size={16} />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Forecast</TableHead>
                    <TableHead className="text-right">95% CI Low</TableHead>
                    <TableHead className="text-right">95% CI High</TableHead>
                    <TableHead className="text-right">Optimized Order</TableHead>
                    <TableHead>Stock Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forecastData.map((item) => (
                    <TableRow 
                      key={item.id}
                      className={`cursor-pointer hover:bg-muted/60 ${selectedProduct === item.sku ? 'bg-muted' : ''}`}
                      onClick={() => handleProductSelect(item.sku)}
                    >
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell className="text-right">{item.forecastDemand}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{item.ciLow}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{item.ciHigh}</TableCell>
                      <TableCell className="text-right font-semibold">{item.optimizedOrder}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span 
                            className={`w-2 h-2 rounded-full mr-2 ${
                              item.stockRisk === 'Low' ? 'bg-green-500' : 
                              item.stockRisk === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                          />
                          {item.stockRisk}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Insights Section */}
        <Card>
          <CardHeader 
            className="cursor-pointer pb-3" 
            onClick={() => toggleSection('insights')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <CardTitle>AI Insights & Observations</CardTitle>
              </div>
              {expandedSection === 'insights' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </CardHeader>
          
          {expandedSection === 'insights' && (
            <CardContent>
              <div className="space-y-4">
                <AIAnnotation title="Pattern Detection">
                  <p className="text-sm">We identified a <span className="font-medium">seasonal pattern</span> with a peak expected in approximately 30 days. Your product demand typically increases by 18-24% during summer months.</p>
                </AIAnnotation>
                
                <AIAnnotation title="Growth Opportunities">
                  <p className="text-sm"><span className="font-medium">SHIRT-001</span> and <span className="font-medium">BAG-022</span> show highest growth potential based on recent trend analysis. Consider increasing marketing or availability for these products.</p>
                </AIAnnotation>
                
                <AIAnnotation title="Risk Assessment">
                  <p className="text-sm">Products with "High" stock risk have more volatile demand patterns. <span className="font-medium">JACKET-045</span> and <span className="font-medium">WATCH-017</span> should be monitored closely as their forecast has wider confidence intervals.</p>
                </AIAnnotation>
              </div>
            </CardContent>
          )}
        </Card>
        
        {/* Selected Product Analysis */}
        {selectedProduct && (
          <Card>
            <CardHeader>
              <CardTitle>Product Analysis: {forecastData.find(item => item.sku === selectedProduct)?.product}</CardTitle>
              <CardDescription>Detailed forecast explanation for {selectedProduct}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="forecast">
                <TabsList className="mb-4">
                  <TabsTrigger value="forecast">Forecast Chart</TabsTrigger>
                  <TabsTrigger value="explanation">Model Explanation</TabsTrigger>
                  <TabsTrigger value="optimization">Order Optimization</TabsTrigger>
                </TabsList>
                
                <TabsContent value="forecast" className="space-y-4">
                  <div className="h-80">
                    <ChartContainer 
                      className="h-80" 
                      config={{
                        actual: { label: "Historical Sales", color: "#2563eb" },
                        forecast: { label: "Forecast", color: "#f97316" },
                        confidence: { label: "95% Confidence", color: "#f97316" }
                      }}
                    >
                      <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.05}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} fill="#2563eb" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="forecast" stroke="#f97316" strokeWidth={2} fill="none" />
                        <Area type="monotone" dataKey="upper" stroke="transparent" fillOpacity={1} fill="url(#colorConfidence)" />
                        <Area type="monotone" dataKey="lower" stroke="transparent" fillOpacity={1} fill="transparent" />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <div className="flex items-start gap-2">
                      <HelpCircle size={18} className="text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium mb-1">Why this forecast pattern?</h4>
                        <p className="text-sm text-muted-foreground">
                          This forecast shows an upward trend due to consistent historical growth and seasonal patterns observed in your data. The confidence interval widens over time to account for increasing uncertainty.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="explanation">
                  <div className="space-y-4">
                    <div className="h-64">
                      <ChartContainer 
                        className="h-64" 
                        config={{
                          importance: { label: "Feature Importance", color: "#8b5cf6" }
                        }}
                      >
                        <BarChart
                          data={featureImportanceData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                          <XAxis type="number" domain={[0, 'dataMax']} />
                          <YAxis type="category" dataKey="feature" />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Importance']} />
                          <Bar dataKey="importance" fill="#8b5cf6" barSize={20} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Key Factors Influencing This Forecast:</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-purple-700">1</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Last Year's Sales (35%)</p>
                            <p className="text-sm text-muted-foreground">Historical sales from the same period last year show a strong correlation with current demand.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-purple-700">2</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Seasonality (28%)</p>
                            <p className="text-sm text-muted-foreground">Summer demand patterns significantly impact this product, with peak sales occurring in June-July.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-purple-700">3</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Recent Trend (20%)</p>
                            <p className="text-sm text-muted-foreground">The product has shown a consistent 8% month-over-month growth over the last quarter.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="optimization">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="text-sm font-medium mb-1">Optimized Order Quantity</h4>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">480</span>
                          <span className="text-sm text-muted-foreground">units</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Based on forecast, lead time, and desired fill rate</p>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="text-sm font-medium mb-1">Safety Stock</h4>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">72</span>
                          <span className="text-sm text-muted-foreground">units (15%)</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Buffer to handle demand variability</p>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="text-sm font-medium mb-1">Current Inventory</h4>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">135</span>
                          <span className="text-sm text-muted-foreground">units</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Covers 28% of forecasted demand</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-start gap-2">
                        <Package size={18} className="text-green-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium mb-1">Order Recommendation</h4>
                          <p className="text-sm">
                            Place an order for <span className="font-bold">345 units</span> to meet projected demand plus safety stock, accounting for current inventory.
                          </p>
                        </div>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={18} className="text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium mb-1">Risk Assessment</h4>
                          <p className="text-sm text-muted-foreground">
                            Low stockout risk (5%) based on confidence intervals and safety stock. Order lead time of 14 days means placing this order by May 1st is recommended.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBackToConstraints}
          className="flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Adjust Constraints
        </Button>
        
        <Button
          className="flex items-center gap-1"
          onClick={() => {
            // Download or Next Action
            console.log('Export or complete action');
          }}
        >
          <Download size={16} />
          Export Results
        </Button>
      </div>
    </div>
  );
};

export default DashboardScreen;
