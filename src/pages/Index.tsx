import { useState } from "react";
import { toast } from "sonner";
import LandingPage from "@/components/LandingPage";
import LocationForm from "@/components/LocationForm";
import SoilNutrientForm from "@/components/SoilNutrientForm";
import FertilizerTypeForm from "@/components/FertilizerTypeForm";
import RainfallInputForm from "@/components/RainfallInputForm";
import SeasonMonthForm from "@/components/SeasonMonthForm";
import CropSelectionForm from "@/components/CropSelectionForm";
import PredictionResults from "@/components/PredictionResults";

type Step = 'landing' | 'location' | 'soil' | 'fertilizer' | 'rainfall' | 'season' | 'crop' | 'loading' | 'results' | 'error';

interface FormData {
  location?: { district: string; taluka: string };
  soilData?: {
    soilColor: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    pH: number;
  };
  fertilizer?: { fertilizerType: string };
  rainfall?: { rainfall: number; minTemp: number; maxTemp: number };
  seasonMonth?: { season: string; month: string };
  crop?: { crop: string };
}

interface PredictionResult {
  predicted_yield: number;
}

const API_URL = "http://127.0.0.1:8000/predict";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [formData, setFormData] = useState<FormData>({});
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchPrediction = async (data: FormData) => {
    setCurrentStep('loading');
    setPredictionResult(null);
    setErrorMessage("");

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
      setCurrentStep('results');
    } catch (error) {
      console.error("Prediction API error:", error);
      const message = error instanceof Error ? error.message : "Failed to connect to prediction server";
      setErrorMessage(message);
      setCurrentStep('error');
      toast.error("Prediction Failed", {
        description: message,
      });
    }
  };

  const handleStartPrediction = () => {
    setCurrentStep('location');
  };

  const handleLocationData = (locationData: { district: string; taluka: string }) => {
    setFormData(prev => ({ ...prev, location: locationData }));
    setCurrentStep('soil');
  };

  const handleSoilData = (soilData: {
    soilColor: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    pH: number;
  }) => {
    setFormData(prev => ({ ...prev, soilData }));
    setCurrentStep('fertilizer');
  };

  const handleFertilizerData = (fertilizerData: { fertilizerType: string }) => {
    setFormData(prev => ({ ...prev, fertilizer: fertilizerData }));
    setCurrentStep('rainfall');
  };

  const handleRainfallData = (rainfallData: { rainfall: number; minTemp: number; maxTemp: number }) => {
    setFormData(prev => ({ ...prev, rainfall: rainfallData }));
    setCurrentStep('season');
  };

  const handleSeasonMonthData = (seasonMonthData: { season: string; month: string }) => {
    setFormData(prev => ({ ...prev, seasonMonth: seasonMonthData }));
    setCurrentStep('crop');
  };

  const handleCropData = (cropData: { crop: string }) => {
    const finalData = { ...formData, crop: cropData };
    setFormData(finalData);
    fetchPrediction(finalData);
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'location':
        setCurrentStep('landing');
        break;
      case 'soil':
        setCurrentStep('location');
        break;
      case 'fertilizer':
        setCurrentStep('soil');
        break;
      case 'rainfall':
        setCurrentStep('fertilizer');
        break;
      case 'season':
        setCurrentStep('rainfall');
        break;
      case 'crop':
        setCurrentStep('season');
        break;
      case 'results':
        setCurrentStep('crop');
        break;
    }
  };

  const handleCalculateAnother = () => {
    setFormData({});
    setPredictionResult(null);
    setErrorMessage("");
    setCurrentStep('landing');
  };

  const handleRetry = () => {
    if (formData.crop) {
      fetchPrediction(formData);
    } else {
      setCurrentStep('crop');
    }
  };

  const handleEditField = (field: string, data: any) => {
    const updatedData = { ...formData, [field === 'soil' ? 'soilData' : field]: data };
    setFormData(updatedData);
    fetchPrediction(updatedData);
  };

  switch (currentStep) {
    case 'landing':
      return <LandingPage onStartPrediction={handleStartPrediction} />;
    
    case 'location':
      return <LocationForm onNext={handleLocationData} onBack={handleBack} />;
    
    case 'soil':
      return <SoilNutrientForm onNext={handleSoilData} onBack={handleBack} />;
    
    case 'fertilizer':
      return <FertilizerTypeForm onNext={handleFertilizerData} onBack={handleBack} />;
    
    case 'rainfall':
      return <RainfallInputForm onNext={handleRainfallData} onBack={handleBack} />;
    
    case 'season':
      return <SeasonMonthForm onNext={handleSeasonMonthData} onBack={handleBack} />;
    
    case 'crop':
      return <CropSelectionForm onSubmit={handleCropData} onBack={handleBack} />;
    
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
      return <LandingPage onStartPrediction={handleStartPrediction} />;
  }
};

export default Index;