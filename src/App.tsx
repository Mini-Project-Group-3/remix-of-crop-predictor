import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import CreatorsPage from "./pages/CreatorsPage";
import Navbar from "./components/Navbar";
import LoginTransition from "./components/LoginTransition";
import LocationForm from "./components/LocationForm";
import SoilNutrientForm from "./components/SoilNutrientForm";
import FertilizerTypeForm from "./components/FertilizerTypeForm";
import RainfallInputForm from "./components/RainfallInputForm";
import SeasonMonthForm from "./components/SeasonMonthForm";
import CropSelectionForm from "./components/CropSelectionForm";
import PredictionResults from "./components/PredictionResults";

const queryClient = new QueryClient();

type PredictionStep = 'none' | 'location' | 'soil' | 'fertilizer' | 'rainfall' | 'season' | 'crop' | 'results';

interface FormData {
  location?: { district: string; taluka: string };
  soilData?: { soilColor: string; nitrogen: number; phosphorus: number; potassium: number; pH: number };
  fertilizer?: { fertilizerType: string };
  rainfall?: { rainfall: number; minTemp: number; maxTemp: number };
  seasonMonth?: { season: string; month: string };
  crop?: { crop: string };
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [predictionStep, setPredictionStep] = useState<PredictionStep>('none');
  const [formData, setFormData] = useState<FormData>({});

  const handleLogin = () => {
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPredictionStep('none');
    setFormData({});
  };

  const handleStartPrediction = () => setPredictionStep('location');

  const calculatePrediction = (data: FormData) => {
    let score = 55;
    if (data.soilData) {
      if (['Loam', 'Black'].includes(data.soilData.soilColor)) score += 10;
      if (data.soilData.nitrogen >= 100 && data.soilData.nitrogen <= 300) score += 5;
      if (data.soilData.phosphorus >= 50 && data.soilData.phosphorus <= 150) score += 5;
      if (data.soilData.potassium >= 150 && data.soilData.potassium <= 400) score += 5;
      if (data.soilData.pH >= 6.0 && data.soilData.pH <= 8.0) score += 5;
    }
    if (data.rainfall) {
      if (data.rainfall.rainfall >= 500 && data.rainfall.rainfall <= 1500) score += 8;
      else if (data.rainfall.rainfall > 1500) score += 3;
    }
    if (data.fertilizer?.fertilizerType === 'Organic Compost') score += 5;
    score = Math.min(100, score);

    return {
      mainScore: score,
      confidence: 90,
      location: `${data.location?.district}, ${data.location?.taluka}`,
      factorScores: {
        soilQuality: Math.min(100, 70 + (data.soilData ? 15 : 0)),
        nutrientBalance: Math.min(100, 40 + (data.soilData?.nitrogen || 0) * 0.1),
        weatherConditions: Math.min(100, 30 + (data.rainfall ? 25 : 0)),
        fertilizerEfficiency: 65,
      },
      inputSummary: {
        location: `${data.location?.district}, ${data.location?.taluka}`,
        soilColor: data.soilData?.soilColor || 'Not provided',
        crop: data.crop?.crop || 'Not provided',
        nitrogen: data.soilData?.nitrogen || 0,
        phosphorus: data.soilData?.phosphorus || 0,
        potassium: data.soilData?.potassium || 0,
        pH: data.soilData?.pH || 0,
        rainfall: data.rainfall?.rainfall || 0,
        minTemp: data.rainfall?.minTemp || 0,
        maxTemp: data.rainfall?.maxTemp || 0,
        fertilizer: data.fertilizer?.fertilizerType || 'Not provided',
      },
      alternatives: [
        { name: 'Sorghum (Jowar)', suitability: 92, benefit: 'Tolerant to low rainfall' },
        { name: 'Pearl Millet (Bajra)', suitability: 88, benefit: 'Excellent drought tolerance' },
        { name: 'Finger Millet (Ragi)', suitability: 85, benefit: 'Thrives in marginal lands' },
      ],
    };
  };

  const renderPredictionFlow = () => {
    switch (predictionStep) {
      case 'location':
        return <LocationForm onNext={(d) => { setFormData(p => ({ ...p, location: d })); setPredictionStep('soil'); }} onBack={() => setPredictionStep('none')} />;
      case 'soil':
        return <SoilNutrientForm onNext={(d) => { setFormData(p => ({ ...p, soilData: d })); setPredictionStep('fertilizer'); }} onBack={() => setPredictionStep('location')} />;
      case 'fertilizer':
        return <FertilizerTypeForm onNext={(d) => { setFormData(p => ({ ...p, fertilizer: d })); setPredictionStep('rainfall'); }} onBack={() => setPredictionStep('soil')} />;
      case 'rainfall':
        return <RainfallInputForm onNext={(d) => { setFormData(p => ({ ...p, rainfall: d })); setPredictionStep('season'); }} onBack={() => setPredictionStep('fertilizer')} />;
      case 'season':
        return <SeasonMonthForm onNext={(d) => { setFormData(p => ({ ...p, seasonMonth: d })); setPredictionStep('crop'); }} onBack={() => setPredictionStep('rainfall')} />;
      case 'crop':
        return <CropSelectionForm onSubmit={(d) => { setFormData(p => ({ ...p, crop: d })); setPredictionStep('results'); }} onBack={() => setPredictionStep('season')} />;
      case 'results':
        return <PredictionResults results={calculatePrediction(formData)} onCalculateAnother={() => { setFormData({}); setPredictionStep('none'); }} formData={formData} onEditField={(field, data) => setFormData(p => ({ ...p, [field === 'soil' ? 'soilData' : field]: data }))} />;
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoginTransition isVisible={showTransition} onComplete={handleTransitionComplete} />
        
        <BrowserRouter>
          {!isAuthenticated ? (
            <Routes>
              <Route path="*" element={<Auth onLogin={handleLogin} />} />
            </Routes>
          ) : predictionStep !== 'none' ? (
            renderPredictionFlow()
          ) : (
            <>
              <Navbar onLogout={handleLogout} />
              <Routes>
                <Route path="/home" element={<HomePage onStartPrediction={handleStartPrediction} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/creators" element={<CreatorsPage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
