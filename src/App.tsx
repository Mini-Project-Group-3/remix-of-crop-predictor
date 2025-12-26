import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "sonner";
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

type PredictionStep = 'none' | 'location' | 'soil' | 'fertilizer' | 'rainfall' | 'season' | 'crop' | 'loading' | 'results' | 'error';

interface FormData {
  location?: { district: string; taluka: string };
  soilData?: { soilColor: string; nitrogen: number; phosphorus: number; potassium: number; pH: number };
  fertilizer?: { fertilizerType: string };
  rainfall?: { rainfall: number; minTemp: number; maxTemp: number };
  seasonMonth?: { season: string; month: string };
  crop?: { crop: string };
}

interface PredictionResult {
  predicted_yield: number;
}

const API_URL = "http://127.0.0.1:8000/predict";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [predictionStep, setPredictionStep] = useState<PredictionStep>('none');
  const [formData, setFormData] = useState<FormData>({});
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    setPredictionResult(null);
    setErrorMessage("");
  };

  const handleStartPrediction = () => setPredictionStep('location');

  const fetchPrediction = async (data: FormData) => {
    setPredictionStep('loading');
    setPredictionResult(null);
    setErrorMessage("");

    // Calculate average temperature from min and max
    const avgTemperature = data.rainfall 
      ? (data.rainfall.minTemp + data.rainfall.maxTemp) / 2 
      : 0;

    const requestBody = {
      District_Name: data.location?.district || "",
      Nitrogen: data.soilData?.nitrogen || 0,
      Phosphorus: data.soilData?.phosphorus || 0,
      Potassium: data.soilData?.potassium || 0,
      pH: data.soilData?.pH || 0,
      Rainfall: data.rainfall?.rainfall || 0,
      Temperature: avgTemperature,
      Soil_color: data.soilData?.soilColor || "",
      Season: data.seasonMonth?.season || "",
      Month: data.seasonMonth?.month || "",
      Crop: data.crop?.crop || "",
      Fertilizer: data.fertilizer?.fertilizerType || ""
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result: PredictionResult = await response.json();
      setPredictionResult(result);
      setPredictionStep('results');
    } catch (error) {
      console.error("Prediction API error:", error);
      const message = error instanceof Error ? error.message : "Failed to connect to prediction server";
      setErrorMessage(message);
      setPredictionStep('error');
      toast.error("Prediction Failed", {
        description: message,
      });
    }
  };

  const handleCropSubmit = (cropData: { crop: string }) => {
    const updatedFormData = { ...formData, crop: cropData };
    setFormData(updatedFormData);
    fetchPrediction(updatedFormData);
  };

  const handleRetry = () => {
    if (formData.crop) {
      fetchPrediction(formData);
    } else {
      setPredictionStep('crop');
    }
  };

  const handleCalculateAnother = () => {
    setFormData({});
    setPredictionResult(null);
    setErrorMessage("");
    setPredictionStep('none');
  };

  const handleEditField = (field: string, data: any) => {
    const updatedFormData = { ...formData, [field === 'soil' ? 'soilData' : field]: data };
    setFormData(updatedFormData);
    // Re-fetch prediction with updated data
    fetchPrediction(updatedFormData);
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
        return <CropSelectionForm onSubmit={handleCropSubmit} onBack={() => setPredictionStep('season')} />;
      case 'loading':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 flex items-center justify-center p-4">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Analyzing Your Data</h2>
                <p className="text-muted-foreground">Connecting to ML prediction model...</p>
              </div>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card rounded-2xl border-2 border-destructive/30 p-8 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Prediction Failed</h2>
                <p className="text-muted-foreground text-sm">{errorMessage}</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleRetry}
                  className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
                >
                  Retry Prediction
                </button>
                <button
                  onClick={handleCalculateAnother}
                  className="w-full py-3 px-6 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        );
      case 'results':
        if (!predictionResult) return null;
        return (
          <PredictionResults 
            predictedYield={predictionResult.predicted_yield}
            onCalculateAnother={handleCalculateAnother} 
            formData={formData} 
            onEditField={handleEditField}
          />
        );
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