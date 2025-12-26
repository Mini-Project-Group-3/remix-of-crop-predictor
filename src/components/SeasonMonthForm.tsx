import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, Leaf, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

interface SeasonMonthFormProps {
  onNext: (data: { season: string; month: string }) => void;
  onBack: () => void;
}

const SeasonMonthForm = ({ onNext, onBack }: SeasonMonthFormProps) => {
  const [season, setSeason] = useState("");
  const [month, setMonth] = useState("");

  const seasonOptions = [
    { value: "Kharif", emoji: "🌧️", description: "Monsoon season (June - October)" },
    { value: "Rabi", emoji: "❄️", description: "Winter season (October - March)" },
    { value: "Zaid", emoji: "☀️", description: "Summer season (March - June)" },
  ];

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleNext = () => {
    if (season && month) {
      onNext({ season, month });
    }
  };

  const isValid = season !== "" && month !== "";

  const getSeasonInfo = (selectedSeason: string) => {
    const info: Record<string, { crops: string; tip: string }> = {
      Kharif: {
        crops: "Rice, Maize, Cotton, Sugarcane, Groundnut",
        tip: "Best suited for crops that require high moisture and warm temperatures."
      },
      Rabi: {
        crops: "Wheat, Barley, Mustard, Peas, Gram",
        tip: "Ideal for crops that need cool temperatures during growth."
      },
      Zaid: {
        crops: "Watermelon, Muskmelon, Cucumber, Vegetables",
        tip: "Short-duration crops that can tolerate hot and dry conditions."
      }
    };
    return info[selectedSeason] || null;
  };

  const seasonInfo = season ? getSeasonInfo(season) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 bg-gradient-to-br from-card to-accent/5 shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-primary font-semibold">Step 5 of 6</span>
            <span className="text-muted-foreground">83% Complete</span>
          </div>
          <div className="mb-4 h-2 bg-progress-bg rounded-full overflow-hidden">
            <div className="h-full w-[83%] progress-enhanced rounded-full animate-progress transition-all duration-1000"></div>
          </div>
          
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 animate-glow">
              <Calendar className="h-8 w-8 text-primary animate-pulse-slow" />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-foreground">
            Season & Month Selection
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Choose the cropping season and sowing month for accurate yield prediction.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Season Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Select Cropping Season
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {seasonOptions.map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    season === option.value 
                      ? "border-2 border-primary bg-primary/5 shadow-lg" 
                      : "border border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSeason(option.value)}
                >
                  <CardContent className="p-4 text-center space-y-2">
                    <span className="text-3xl">{option.emoji}</span>
                    <h4 className="font-semibold text-foreground">{option.value}</h4>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Season Info */}
          {seasonInfo && (
            <Card className="bg-gradient-to-br from-accent/10 to-background border border-primary/20 shadow-sm animate-fade-in">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold text-foreground text-sm">Common {season} Crops:</h4>
                <p className="text-sm text-muted-foreground">{seasonInfo.crops}</p>
                <p className="text-xs text-primary/80 mt-2">{seasonInfo.tip}</p>
              </CardContent>
            </Card>
          )}

          {/* Month Selection */}
          <div className="space-y-3">
            <Label htmlFor="month" className="text-base font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Select Sowing Month
            </Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-full border-border focus:ring-primary focus:shadow-lg transition-all duration-300">
                <SelectValue placeholder="Choose sowing month..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                {monthOptions.map((m) => (
                  <SelectItem key={m} value={m} className="cursor-pointer hover:bg-accent">
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tip */}
          <div className="rounded-lg bg-warning/10 border border-warning/20 p-4 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-warning mt-0.5 flex-shrink-0 animate-glow" />
              <p className="text-sm text-foreground">
                <strong>Tip:</strong> Selecting the correct season and month helps the model predict yields based on typical weather patterns and crop cycles for your region.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 hover:bg-muted/50 transition-all duration-300 group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!isValid}
            className="flex items-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
          >
            Next
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeasonMonthForm;
