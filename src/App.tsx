
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OnboardingScreen from "./components/onboarding/OnboardingScreen";
import DataSourceScreen from "./components/data/DataSourceScreen";
import ModelSelectionScreen from "./components/models/ModelSelectionScreen";
import ForecastSetupScreen from "./components/forecast/ForecastSetupScreen";
import ConstraintsScreen from "./components/constraints/ConstraintsScreen";
import DashboardScreen from "./components/dashboard/DashboardScreen";
import GoogleSheetsLayout from "./components/layout/GoogleSheetsLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleSheetsLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/data-source" element={<DataSourceScreen />} />
            <Route path="/model-selection" element={<ModelSelectionScreen />} />
            <Route path="/forecast-setup" element={<ForecastSetupScreen />} />
            <Route path="/constraints" element={<ConstraintsScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            {/* Fallback route for unknown paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GoogleSheetsLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
