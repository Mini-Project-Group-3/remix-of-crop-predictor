import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Leaf, CloudRain, Package, Droplets, Thermometer, Shield, Building2, Target, Lightbulb, MapPin, Layers, Edit2, Sparkles, Calendar } from "lucide-react";
import { useState } from "react";

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

interface PredictionResultsProps {
  predictedYield: number;
  onCalculateAnother: () => void;
  formData: FormData;
  onEditField: (field: string, data: any) => void;
}

const PredictionResults = ({ predictedYield, onCalculateAnother, formData, onEditField }: PredictionResultsProps) => {
  const [editDialog, setEditDialog] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>({});

  const handleOpenEdit = (field: string) => {
    setEditDialog(field);
    switch (field) {
      case 'location':
        setTempData(formData.location || { district: '', taluka: '' });
        break;
      case 'soil':
        setTempData(formData.soilData || { soilColor: '', nitrogen: 0, phosphorus: 0, potassium: 0, pH: 0 });
        break;
      case 'fertilizer':
        setTempData(formData.fertilizer || { fertilizerType: '' });
        break;
      case 'rainfall':
        setTempData(formData.rainfall || { rainfall: 0, minTemp: 0, maxTemp: 0 });
        break;
      case 'seasonMonth':
        setTempData(formData.seasonMonth || { season: '', month: '' });
        break;
      case 'crop':
        setTempData(formData.crop || { crop: '' });
        break;
    }
  };

  const handleSave = () => {
    if (editDialog) {
      onEditField(editDialog, tempData);
      setEditDialog(null);
    }
  };

  // Climate case logic
  const getClimateCase = (rainfall: number, minTemp: number, maxTemp: number) => {
    const avgTemp = (minTemp + maxTemp) / 2;
    let rainCategory = '';
    let tempCategory = '';

    if (rainfall >= 1500) rainCategory = 'High';
    else if (rainfall >= 800) rainCategory = 'Medium';
    else rainCategory = 'Low';

    if (avgTemp <= 15) tempCategory = 'Cool';
    else if (avgTemp <= 25) tempCategory = 'Moderate';
    else if (avgTemp <= 35) tempCategory = 'Warm';
    else tempCategory = 'Hot';

    return { rainCategory, tempCategory, title: `${rainCategory} Rain, ${tempCategory} Temp` };
  };

  const getActionableSuggestions = (rainfall: number, minTemp: number, maxTemp: number) => {
    const { rainCategory, tempCategory, title } = getClimateCase(rainfall, minTemp, maxTemp);
    const caseKey = `${rainCategory}-${tempCategory}`;

    const suggestions: Record<string, Array<{ icon: any, category: string, action: string, description: string }>> = {
      'Low-Hot': [
        { icon: Droplets, category: 'Water Management', action: 'Implement Drip Irrigation', description: 'Schedule timed irrigation for peak efficiency to handle acute water scarcity.' },
        { icon: Shield, category: 'Protection', action: 'Apply Sun Protection', description: 'Use shade nets or row covers during peak heat hours (11 am-3 pm) to reduce heat stress.' },
        { icon: Leaf, category: 'Soil Health', action: 'Incorporate Clay/Organic Matter', description: 'Significantly boost the soil\'s water-holding capacity.' },
        { icon: Building2, category: 'Government Schemes', action: 'Drought Mitigation Schemes', description: 'Refer to schemes on Drought Mitigation and Micro-Irrigation (e.g., \'Per Drop More Crop\').' }
      ],
      'Low-Warm': [
        { icon: Droplets, category: 'Water Management', action: 'Prioritize Water Conservation', description: 'Implement mulching (organic or plastic) to retain existing moisture.' },
        { icon: Shield, category: 'Protection', action: 'Select Drought-Tolerant Varieties', description: 'Choose varieties specifically suited to handle long dry spells.' },
        { icon: Leaf, category: 'Soil Health', action: 'Deep Cultivation', description: 'Cultivate soil deeply before planting to improve water infiltration when rain occurs.' }
      ],
      'Low-Moderate': [
        { icon: Droplets, category: 'Water Management', action: 'Harvest Rainwater', description: 'Build check dams or storage ponds to capture any available rainfall.' },
        { icon: Leaf, category: 'Soil Health', action: 'Use Tillage Practices', description: 'Minimize soil disturbance to preserve capillary moisture (zero or reduced tillage).' },
        { icon: Building2, category: 'Government Schemes', action: 'Farm Pond Construction', description: 'Check eligibility for state-level schemes supporting farm pond construction.' }
      ],
      'High-Cool': [
        { icon: Droplets, category: 'Drainage', action: 'Improve Field Drainage', description: 'Implement raised beds or sub-surface drainage to remove excess water rapidly.' },
        { icon: Leaf, category: 'Soil Health', action: 'Monitor Soil pH', description: 'Low temperatures often restrict availability of key nutrients like Phosphorus.' },
        { icon: Shield, category: 'Protection', action: 'Use Crop Covers', description: 'Use low tunnels or temporary covers for cold-sensitive crops to prevent chill injury.' }
      ],
      'High-Moderate': [
        { icon: Droplets, category: 'Drainage', action: 'Ensure Soil Aeration', description: 'Use light inter-row cultivation to prevent compaction and improve gas exchange.' },
        { icon: Target, category: 'Nutrient Management', action: 'Apply Fertilizers in Split Doses', description: 'Minimize leaching loss due to heavy rainfall.' },
        { icon: Shield, category: 'Protection', action: 'Fungicide Application', description: 'Apply prophylactic fungicide treatment due to high risk of fungal diseases in humid conditions.' }
      ],
      'High-Warm': [
        { icon: Droplets, category: 'Drainage', action: 'Create Emergency Trenches', description: 'Have deep field trenches ready to handle sudden, large volumes of water.' },
        { icon: Shield, category: 'Weed Control', action: 'Aggressive Weeding', description: 'This climate promotes rapid weed growth and requires frequent, proactive control.' },
        { icon: Shield, category: 'Protection', action: 'Staking/Support', description: 'Provide support for taller crops to prevent lodging in high winds/rain.' }
      ],
      'Medium-Hot': [
        { icon: Droplets, category: 'Water Management', action: 'Irrigate at Dawn/Dusk', description: 'Schedule irrigation during coolest hours to maximize absorption and reduce evaporation.' },
        { icon: Leaf, category: 'Soil Health', action: 'Avoid Deep Tillage', description: 'Preserve residual soil moisture during dry periods.' },
        { icon: Shield, category: 'Protection', action: 'Monitor for Sunscald', description: 'Light shading or proper leaf canopy management is essential for fruits.' }
      ],
      'Medium-Cool': [
        { icon: Target, category: 'Nutrient Management', action: 'Focus on Potassium and Phosphorus', description: 'These nutrients are crucial for crop resilience in cooler conditions.' },
        { icon: Droplets, category: 'Drainage', action: 'Ensure Adequate Surface Runoff', description: 'Prevent shallow waterlogging during continuous, moderate rain.' },
        { icon: Leaf, category: 'Future Preparation', action: 'Utilize Crop Rotation', description: 'Maintain ideal soil health during this favorable growing season.' }
      ],
      'Medium-Moderate': [
        { icon: Target, category: 'Optimization', action: 'Focus on Precision Fertilization', description: 'Near-ideal conditions maximize nutrient uptake efficiency.' },
        { icon: Shield, category: 'Monitoring', action: 'Regularly Scout for Pests', description: 'Vigilance is key when conditions are perfect for both crops and threats.' },
        { icon: Leaf, category: 'Future Preparation', action: 'Practice Integrated Pest Management', description: 'Maintain long-term soil and environmental health.' }
      ],
      'Medium-Warm': [
        { icon: Target, category: 'Optimization', action: 'Focus on Precision Fertilization', description: 'Near-ideal conditions maximize nutrient uptake efficiency.' },
        { icon: Shield, category: 'Monitoring', action: 'Regularly Scout for Pests', description: 'Vigilance is key when conditions are perfect for both crops and threats.' },
        { icon: Leaf, category: 'Future Preparation', action: 'Practice Integrated Pest Management', description: 'Maintain long-term soil and environmental health.' }
      ]
    };

    return { suggestions: suggestions[caseKey] || [], title };
  };

  const ActionableInsights = ({ rainfall, minTemp, maxTemp }: { rainfall: number; minTemp: number; maxTemp: number }) => {
    const { suggestions, title } = getActionableSuggestions(rainfall, minTemp, maxTemp);

    if (!suggestions.length) return null;

    return (
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
          Actionable Insights
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Tailored advice for {title} conditions
        </p>
        
        <Card className="border-2 border-border bg-card/95 backdrop-blur-md shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 justify-center">
              <div className="rounded-xl bg-primary/10 p-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-center text-foreground">
                Optimize Your Yield
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <div key={index} className="flex gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-all group shadow-sm">
                    <div className="flex-shrink-0">
                      <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs font-medium rounded-full px-2 py-0.5">
                          {suggestion.category}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-foreground mb-1.5 text-sm">
                        {suggestion.action}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const soilOptions = ["Black", "Brown", "Red", "Sandy", "Clay", "Loam"];
  const fertilizerOptions = [
    "NPK (20-20-20)", "Urea (46-0-0)", "DAP (18-46-0)", 
    "Potash (0-0-60)", "Complex (12-32-16)", "Organic Compost"
  ];
  const seasonOptions = ["Kharif", "Rabi", "Zaid"];
  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const cropOptions = ["Rice", "Wheat", "Corn", "Cotton", "Sugarcane", "Soybean", "Potato", "Tomato"];

  return (
    <div className="min-h-screen p-6 md:p-8 bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Header Banner */}
      <div className="mb-8 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/30 p-8 text-center backdrop-blur-md shadow-xl">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-foreground">Yield Prediction Results</h1>
          <p className="text-muted-foreground text-lg">
            Based on your agricultural data for <span className="font-semibold text-foreground">{formData.location?.district || "Your Location"}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Main Prediction Score */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/30 backdrop-blur-md shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <CardContent className="relative p-8 text-center">
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Predicted Crop Yield</span>
            </div>
            <div className="text-7xl font-bold text-primary mb-4">
              {predictedYield.toFixed(2)}
            </div>
            <div className="text-xl text-muted-foreground mb-6">
              kg/hectare
            </div>
            <p className="text-xs text-muted-foreground">
              Powered by machine learning prediction model
            </p>
          </CardContent>
        </Card>

        {/* Quick Edit Summary Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-card/95 via-card/98 to-card border-2 border-primary/20 backdrop-blur-md shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3 animate-pulse">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Quick Edit & Recalculate</h3>
                  <p className="text-sm text-muted-foreground">Click any field to instantly update your prediction</p>
                </div>
              </div>
            </div>
          
            <div className="grid md:grid-cols-2 gap-4">
              {/* Location */}
              <div 
                onClick={() => handleOpenEdit('location')}
                className="group flex items-start justify-between p-5 bg-background/95 rounded-xl border-2 border-border/50 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Location</p>
                  </div>
                  <p className="text-foreground font-bold">{formData.location?.district || "Not set"}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Edit2 className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Soil */}
              <div 
                onClick={() => handleOpenEdit('soil')}
                className="group flex items-start justify-between p-5 bg-background/95 rounded-xl border-2 border-border/50 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <Layers className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Soil & Nutrients</p>
                  </div>
                  <p className="text-foreground font-bold">{formData.soilData?.soilColor || "Not set"}</p>
                  <p className="text-xs text-muted-foreground mt-1">N:{formData.soilData?.nitrogen || 0} P:{formData.soilData?.phosphorus || 0} K:{formData.soilData?.potassium || 0} pH:{formData.soilData?.pH || 0}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Edit2 className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Fertilizer */}
              <div 
                onClick={() => handleOpenEdit('fertilizer')}
                className="group flex items-start justify-between p-5 bg-background/95 rounded-xl border-2 border-border/50 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Fertilizer</p>
                  </div>
                  <p className="text-foreground font-bold">{formData.fertilizer?.fertilizerType || "Not set"}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Edit2 className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Weather */}
              <div 
                onClick={() => handleOpenEdit('rainfall')}
                className="group flex items-start justify-between p-5 bg-background/95 rounded-xl border-2 border-border/50 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <Droplets className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Weather</p>
                  </div>
                  <p className="text-foreground font-bold">{formData.rainfall?.rainfall || 0}mm rainfall</p>
                  <p className="text-xs text-muted-foreground mt-1">Temp: {formData.rainfall?.minTemp || 0}°C - {formData.rainfall?.maxTemp || 0}°C</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Edit2 className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Season & Month */}
              <div 
                onClick={() => handleOpenEdit('seasonMonth')}
                className="group flex items-start justify-between p-5 bg-background/95 rounded-xl border-2 border-border/50 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Season & Month</p>
                  </div>
                  <p className="text-foreground font-bold">{formData.seasonMonth?.season || "Not set"}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formData.seasonMonth?.month || ""}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Edit2 className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Crop */}
              <div 
                onClick={() => handleOpenEdit('crop')}
                className="group flex items-start justify-between p-5 bg-background/95 rounded-xl border-2 border-border/50 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Selected Crop</p>
                  </div>
                  <p className="text-foreground font-bold text-xl">{formData.crop?.crop || "Not set"}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Edit2 className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Live editing enabled</span>
              </div>
              <span>•</span>
              <span>Click any card to update instantly</span>
            </div>
          </div>
        </Card>

        {/* Edit Dialogs */}
        {/* Location Dialog */}
        <Dialog open={editDialog === 'location'} onOpenChange={() => setEditDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Edit Location
              </DialogTitle>
              <DialogDescription>Update your location details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={tempData.district || ''}
                  onChange={(e) => setTempData({ ...tempData, district: e.target.value })}
                  placeholder="Enter district"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialog(null)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Sparkles className="h-4 w-4" />
                Save & Recalculate
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Soil Dialog */}
        <Dialog open={editDialog === 'soil'} onOpenChange={() => setEditDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Edit Soil & Nutrients
              </DialogTitle>
              <DialogDescription>Update soil composition and nutrient levels</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="soilColor">Soil Color</Label>
                <Select value={tempData.soilColor || ''} onValueChange={(value) => setTempData({ ...tempData, soilColor: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil color" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilOptions.map(soil => (
                      <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nitrogen (ppm): {tempData.nitrogen || 0}</Label>
                <Slider
                  value={[tempData.nitrogen || 0]}
                  onValueChange={(value) => setTempData({ ...tempData, nitrogen: value[0] })}
                  max={300}
                  min={0}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Phosphorus (ppm): {tempData.phosphorus || 0}</Label>
                <Slider
                  value={[tempData.phosphorus || 0]}
                  onValueChange={(value) => setTempData({ ...tempData, phosphorus: value[0] })}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Potassium (ppm): {tempData.potassium || 0}</Label>
                <Slider
                  value={[tempData.potassium || 0]}
                  onValueChange={(value) => setTempData({ ...tempData, potassium: value[0] })}
                  max={400}
                  min={0}
                  step={10}
                />
              </div>
              <div className="space-y-2">
                <Label>pH Level: {tempData.pH || 0}</Label>
                <Slider
                  value={[tempData.pH || 0]}
                  onValueChange={(value) => setTempData({ ...tempData, pH: value[0] })}
                  max={14}
                  min={0}
                  step={0.1}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialog(null)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Sparkles className="h-4 w-4" />
                Save & Recalculate
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Fertilizer Dialog */}
        <Dialog open={editDialog === 'fertilizer'} onOpenChange={() => setEditDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Edit Fertilizer
              </DialogTitle>
              <DialogDescription>Select your fertilizer type</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Fertilizer Type</Label>
                <Select value={tempData.fertilizerType || ''} onValueChange={(value) => setTempData({ ...tempData, fertilizerType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fertilizer" />
                  </SelectTrigger>
                  <SelectContent>
                    {fertilizerOptions.map(fert => (
                      <SelectItem key={fert} value={fert}>{fert}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialog(null)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Sparkles className="h-4 w-4" />
                Save & Recalculate
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Rainfall Dialog */}
        <Dialog open={editDialog === 'rainfall'} onOpenChange={() => setEditDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-primary" />
                Edit Weather
              </DialogTitle>
              <DialogDescription>Update rainfall and temperature</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Rainfall (mm): {tempData.rainfall || 0}</Label>
                <Slider
                  value={[tempData.rainfall || 0]}
                  onValueChange={(value) => setTempData({ ...tempData, rainfall: value[0] })}
                  max={4000}
                  min={0}
                  step={50}
                />
              </div>
              <div className="space-y-2">
                <Label>Min Temperature (°C): {tempData.minTemp || 0}</Label>
                <Slider
                  value={[tempData.minTemp || 0]}
                  onValueChange={(value) => setTempData({ ...tempData, minTemp: value[0] })}
                  max={40}
                  min={0}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Temperature (°C): {tempData.maxTemp || 0}</Label>
                <Slider
                  value={[tempData.maxTemp || 0]}
                  onValueChange={(value) => setTempData({ ...tempData, maxTemp: value[0] })}
                  max={50}
                  min={10}
                  step={1}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialog(null)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Sparkles className="h-4 w-4" />
                Save & Recalculate
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Season & Month Dialog */}
        <Dialog open={editDialog === 'seasonMonth'} onOpenChange={() => setEditDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Edit Season & Month
              </DialogTitle>
              <DialogDescription>Update cropping season and sowing month</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Season</Label>
                <Select value={tempData.season || ''} onValueChange={(value) => setTempData({ ...tempData, season: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasonOptions.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Month</Label>
                <Select value={tempData.month || ''} onValueChange={(value) => setTempData({ ...tempData, month: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthOptions.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialog(null)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Sparkles className="h-4 w-4" />
                Save & Recalculate
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Crop Dialog */}
        <Dialog open={editDialog === 'crop'} onOpenChange={() => setEditDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Edit Crop
              </DialogTitle>
              <DialogDescription>Select your crop</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                {cropOptions.map(crop => (
                  <div
                    key={crop}
                    onClick={() => setTempData({ crop })}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      tempData.crop === crop 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        tempData.crop === crop ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}>
                        {tempData.crop === crop && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </div>
                      <span className="font-medium">{crop}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialog(null)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Sparkles className="h-4 w-4" />
                Save & Recalculate
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Actionable Insights */}
        {formData.rainfall && (
          <ActionableInsights 
            rainfall={formData.rainfall.rainfall} 
            minTemp={formData.rainfall.minTemp} 
            maxTemp={formData.rainfall.maxTemp} 
          />
        )}

        {/* Calculate Another Button */}
        <div className="text-center pt-4">
          <Button 
            onClick={onCalculateAnother}
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl transition-all"
          >
            Calculate Another Prediction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;