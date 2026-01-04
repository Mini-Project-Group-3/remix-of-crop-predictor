import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Wheat, ChevronLeft, Lightbulb, Sparkles, Loader2 } from "lucide-react";

interface FormData {
  location?: { district: string; taluka: string };
  soilData?: { soilColor: string; nitrogen: number; phosphorus: number; potassium: number; pH: number };
  fertilizer?: { fertilizerType: string };
  rainfall?: { rainfall: number; minTemp: number; maxTemp: number };
  seasonMonth?: { season: string; month: string };
}

interface CropRecommendation {
  crop: string;
  confidence: number;
  reason: string;
}

interface CropSelectionFormProps {
  onSubmit: (data: { crop: string }) => void;
  onBack: () => void;
  formData?: FormData;
}

const CropSelectionForm = ({ onSubmit, onBack, formData }: CropSelectionFormProps) => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Fetch recommendations when component mounts or formData changes
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!formData) return;
      
      setIsLoadingRecommendations(true);
      try {
        // TODO: Replace with actual ML model endpoint
        // const response = await fetch('http://127.0.0.1:8000/recommend', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     district: formData.location?.district,
        //     nitrogen: formData.soilData?.nitrogen,
        //     phosphorus: formData.soilData?.phosphorus,
        //     potassium: formData.soilData?.potassium,
        //     pH: formData.soilData?.pH,
        //     rainfall: formData.rainfall?.rainfall,
        //     temperature: formData.rainfall ? (formData.rainfall.minTemp + formData.rainfall.maxTemp) / 2 : 0,
        //     soil_color: formData.soilData?.soilColor,
        //     season: formData.seasonMonth?.season,
        //     fertilizer: formData.fertilizer?.fertilizerType,
        //   }),
        // });
        // const data = await response.json();
        // setRecommendations(data.recommendations);

        // Placeholder recommendations until ML model is connected
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecommendations([
          { crop: "Rice", confidence: 92, reason: "Ideal for your soil pH and rainfall levels" },
          { crop: "Sugarcane", confidence: 85, reason: "Good nutrient match and seasonal fit" },
          { crop: "Wheat", confidence: 78, reason: "Suitable temperature and soil conditions" },
        ]);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [formData]);

  const cropOptions = [
    { value: "Rice", emoji: "🌾", description: "Water-intensive, requires flooded fields" },
    { value: "Wheat", emoji: "🌾", description: "Cool season crop, moderate water needs" },
    { value: "Corn", emoji: "🌽", description: "High nitrogen requirement, warm season" },
    { value: "Cotton", emoji: "🌱", description: "Long growing season, moderate water needs" },
    { value: "Sugarcane", emoji: "🎋", description: "High water and nutrient requirements" },
    { value: "Soybean", emoji: "🌿", description: "Nitrogen-fixing legume, moderate needs" },
    { value: "Potato", emoji: "🥔", description: "Cool season, well-drained soil preferred" },
    { value: "Tomato", emoji: "🍅", description: "High nutrient needs, consistent moisture" }
  ];

  const handleSubmit = () => {
    if (selectedCrop) {
      onSubmit({ crop: selectedCrop });
    }
  };

  const isValid = selectedCrop.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-0 bg-gradient-to-br from-card to-accent/5 shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-primary font-semibold">Step 6 of 6</span>
            <span className="text-muted-foreground">100% Complete</span>
          </div>
          <div className="mb-4 h-2 bg-progress-bg rounded-full overflow-hidden">
            <div className="h-full w-full progress-enhanced rounded-full animate-progress transition-all duration-1500"></div>
          </div>
          
          <div className="mb-4 flex justify-center animate-bounce-subtle">
            <div className="rounded-full bg-primary/10 p-4 animate-glow">
              <Wheat className="h-8 w-8 text-primary animate-pulse-slow" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-foreground">
            Crop Selection
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Select the crop you are planning to grow or currently growing.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* AI Recommendations Section */}
          <div className="rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <h3 className="font-semibold text-foreground">AI Recommended Crops</h3>
            </div>
            
            {isLoadingRecommendations ? (
              <div className="flex items-center justify-center py-4 gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing your parameters...</span>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-3">
                {recommendations.map((rec, index) => (
                  <Card
                    key={rec.crop}
                    className={`cursor-pointer border transition-all duration-300 hover:shadow-md ${
                      selectedCrop === rec.crop
                        ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCrop(rec.crop)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          {index === 0 && <span className="text-yellow-500">🥇</span>}
                          {index === 1 && <span className="text-gray-400">🥈</span>}
                          {index === 2 && <span className="text-amber-600">🥉</span>}
                          {rec.crop}
                        </span>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {rec.confidence}% match
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{rec.reason}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">
                Unable to load recommendations. Please select manually.
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or choose from all crops</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cropOptions.map((crop) => (
              <Card
                key={crop.value}
                className={`group cursor-pointer border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-accent/5 ${
                  selectedCrop === crop.value
                    ? "border-primary ring-2 ring-primary/30 shadow-lg selected-glow"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedCrop(crop.value)}
              >
                <CardContent className="p-4 text-center relative">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{crop.emoji}</div>
                  <div className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {crop.value}
                  </div>
                  <div className="text-xs text-muted-foreground mb-4">
                    {crop.description}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 mx-auto flex items-center justify-center ${
                    selectedCrop === crop.value
                      ? "border-primary bg-primary"
                      : "border-border group-hover:border-primary/50"
                  }`}>
                    {selectedCrop === crop.value && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full animate-scale" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="rounded-lg bg-warning/10 border border-warning/20 p-4 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-warning mt-0.5 flex-shrink-0 animate-glow" />
              <p className="text-sm text-foreground">
                <strong>Tip:</strong> Different crops have varying nutrient and water requirements for optimal yield.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className="group flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-xl px-12 py-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold"
          >
            <span className="group-hover:animate-pulse">Get Prediction</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CropSelectionForm;