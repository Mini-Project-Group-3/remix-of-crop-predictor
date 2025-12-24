import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Leaf, Zap, CloudRain, Package, ArrowLeft, Droplets, Thermometer, Shield, Building2, Target, Lightbulb, MapPin, Layers, TestTube, Edit2, Calculator, Sparkles } from "lucide-react";
import { useState } from "react";

interface ResultsProps {
  mainScore: number;
  confidence: number;
  location: string;
  factorScores: {
    soilQuality: number;
    nutrientBalance: number;
    weatherConditions: number;
    fertilizerEfficiency: number;
  };
  inputSummary: {
    location: string;
    soilColor: string;
    crop: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    pH: number;
    rainfall: number;
    minTemp: number;
    maxTemp: number;
    fertilizer: string;
  };
  alternatives: Array<{
    name: string;
    suitability: number;
    benefit: string;
  }>;
}

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
  crop?: { crop: string };
}

interface PredictionResultsProps {
  results: ResultsProps;
  onCalculateAnother: () => void;
  formData: FormData;
  onEditField: (field: string, data: any) => void;
}

const PredictionResults = ({ results, onCalculateAnother, formData, onEditField }: PredictionResultsProps) => {
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

    // Rain categories
    if (rainfall >= 1500) rainCategory = 'High';
    else if (rainfall >= 800) rainCategory = 'Medium';
    else rainCategory = 'Low';

    // Temperature categories
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
  return (
    <div className="min-h-screen p-6 md:p-8">
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
            Based on your agricultural data for <span className="font-semibold text-foreground">{results.location}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Quick Edit Summary Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-card/95 via-card/98 to-card border-2 border-primary/20 backdrop-blur-md shadow-2xl">
          {/* Decorative gradient overlay */}
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
                  <p className="text-foreground font-bold">{formData.location?.district}, {formData.location?.taluka}</p>
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
                  <p className="text-foreground font-bold">{formData.soilData?.soilColor}</p>
                  <p className="text-xs text-muted-foreground mt-1">N:{formData.soilData?.nitrogen} P:{formData.soilData?.phosphorus} K:{formData.soilData?.potassium} pH:{formData.soilData?.pH}</p>
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
                  <p className="text-foreground font-bold">{formData.fertilizer?.fertilizerType}</p>
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
                  <p className="text-foreground font-bold">{formData.rainfall?.rainfall}mm rainfall</p>
                  <p className="text-xs text-muted-foreground mt-1">Temp: {formData.rainfall?.minTemp}°C - {formData.rainfall?.maxTemp}°C</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Edit2 className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Crop - Full Width */}
              <div 
                onClick={() => handleOpenEdit('crop')}
                className="md:col-span-2 group flex items-start justify-between p-5 bg-background/95 rounded-xl border-2 border-border/50 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Selected Crop</p>
                  </div>
                  <p className="text-foreground font-bold text-xl">{formData.crop?.crop}</p>
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
              <div className="space-y-2">
                <Label htmlFor="taluka">Taluka</Label>
                <Input
                  id="taluka"
                  value={tempData.taluka || ''}
                  onChange={(e) => setTempData({ ...tempData, taluka: e.target.value })}
                  placeholder="Enter taluka"
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
                    <SelectItem value="Red">Red Soil</SelectItem>
                    <SelectItem value="Black">Black Soil</SelectItem>
                    <SelectItem value="Loam">Loam Soil</SelectItem>
                    <SelectItem value="Sandy">Sandy Soil</SelectItem>
                    <SelectItem value="Clay">Clay Soil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    value={tempData.nitrogen || ''}
                    onChange={(e) => setTempData({ ...tempData, nitrogen: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    value={tempData.phosphorus || ''}
                    onChange={(e) => setTempData({ ...tempData, phosphorus: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (kg/ha)</Label>
                  <Input
                    id="potassium"
                    type="number"
                    value={tempData.potassium || ''}
                    onChange={(e) => setTempData({ ...tempData, potassium: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pH">pH Level</Label>
                  <Input
                    id="pH"
                    type="number"
                    step="0.1"
                    value={tempData.pH || ''}
                    onChange={(e) => setTempData({ ...tempData, pH: Number(e.target.value) })}
                  />
                </div>
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
              <DialogDescription>Select a different fertilizer type</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                <Select value={tempData.fertilizerType || ''} onValueChange={(value) => setTempData({ ...tempData, fertilizerType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fertilizer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urea">Urea (46-0-0)</SelectItem>
                    <SelectItem value="DAP">DAP (18-46-0)</SelectItem>
                    <SelectItem value="NPK 19:19:19">NPK (19:19:19)</SelectItem>
                    <SelectItem value="Organic Compost">Organic Compost</SelectItem>
                    <SelectItem value="Vermicompost">Vermicompost</SelectItem>
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
                <Droplets className="h-5 w-5 text-primary" />
                Edit Weather Conditions
              </DialogTitle>
              <DialogDescription>Update rainfall and temperature data</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  value={tempData.rainfall || ''}
                  onChange={(e) => setTempData({ ...tempData, rainfall: Number(e.target.value) })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minTemp">Min Temperature (°C)</Label>
                  <Input
                    id="minTemp"
                    type="number"
                    value={tempData.minTemp || ''}
                    onChange={(e) => setTempData({ ...tempData, minTemp: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTemp">Max Temperature (°C)</Label>
                  <Input
                    id="maxTemp"
                    type="number"
                    value={tempData.maxTemp || ''}
                    onChange={(e) => setTempData({ ...tempData, maxTemp: Number(e.target.value) })}
                  />
                </div>
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
                Edit Crop Selection
              </DialogTitle>
              <DialogDescription>Choose a different crop for prediction</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Select Crop</Label>
                <Select value={tempData.crop || ''} onValueChange={(value) => setTempData({ ...tempData, crop: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rice">🌾 Rice</SelectItem>
                    <SelectItem value="Wheat">🌾 Wheat</SelectItem>
                    <SelectItem value="Cotton">☁️ Cotton</SelectItem>
                    <SelectItem value="Sugarcane">🎋 Sugarcane</SelectItem>
                    <SelectItem value="Jowar">🌾 Jowar (Sorghum)</SelectItem>
                    <SelectItem value="Bajra">🌾 Bajra (Pearl Millet)</SelectItem>
                    <SelectItem value="Maize">🌽 Maize</SelectItem>
                    <SelectItem value="Groundnut">🥜 Groundnut</SelectItem>
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


        {/* Main Result Card */}
        <Card className="border-2 border-border bg-card/95 backdrop-blur-md shadow-2xl text-center overflow-hidden">
          <CardContent className="p-10">
            <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Average Yield Potential</p>
            <div className="relative inline-block">
              <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                {results.mainScore.toFixed(1)}%
              </div>
            </div>
            <p className="text-xl font-semibold text-foreground mb-2">Predicted Yield Efficiency</p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              Confidence Level: <span className="font-semibold text-foreground">{results.confidence}%</span>
            </div>
            <div className="max-w-md mx-auto">
              <Progress value={results.mainScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Factor Scorecard */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Performance Breakdown
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-border bg-card/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">Soil Quality</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-3">
                  {results.factorScores.soilQuality}<span className="text-lg text-muted-foreground">/100</span>
                </div>
                <Progress value={results.factorScores.soilQuality} className="mb-3 h-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Soil color and nutrient content
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-card/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">Nutrient Balance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-3">
                  {results.factorScores.nutrientBalance}<span className="text-lg text-muted-foreground">/100</span>
                </div>
                <Progress value={results.factorScores.nutrientBalance} className="mb-3 h-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nitrogen and phosphorus levels
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-card/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <CloudRain className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">Weather</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-3">
                  {results.factorScores.weatherConditions}<span className="text-lg text-muted-foreground">/100</span>
                </div>
                <Progress value={results.factorScores.weatherConditions} className="mb-3 h-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Rainfall adequacy for crop
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-card/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">Fertilizer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-3">
                  {results.factorScores.fertilizerEfficiency}<span className="text-lg text-muted-foreground">/100</span>
                </div>
                <Progress value={results.factorScores.fertilizerEfficiency} className="mb-3 h-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Type match for crop needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Input Summary */}
        <Card className="border-2 border-border bg-card/95 backdrop-blur-md shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 justify-center">
              <div className="rounded-xl bg-primary/10 p-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-center text-foreground">
                Your Input Summary
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Layers className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Soil Color</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.soilColor}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Crop Type</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.crop}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Nitrogen (ppm)</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.nitrogen}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Phosphorus (ppm)</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.phosphorus}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Potassium (ppm)</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.potassium}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <TestTube className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">pH Level</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.pH}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <CloudRain className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Annual Rainfall (mm)</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.rainfall}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Thermometer className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Temperature Range (°C)</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.minTemp} - {results.inputSummary.maxTemp}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background/95 border-2 border-border backdrop-blur-sm hover:border-primary/50 transition-colors shadow-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Fertilizer Type</p>
                  <p className="text-sm font-semibold text-foreground">{results.inputSummary.fertilizer}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Crops */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            Alternative Crop Recommendations
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Based on your soil, nutrient, and rainfall data
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "WHEAT", yield: 92, fertilizer: "DAP (18-46-0)", month: "October - November" },
              { name: "SORGHUM (JOWAR)", yield: 88, fertilizer: "NPK (12-32-16)", month: "June - July" },
              { name: "PEARL MILLET (BAJRA)", yield: 85, fertilizer: "Urea (46-0-0)", month: "July - August" }
            ].map((crop, index) => (
              <Card key={index} className="border-2 border-border bg-card/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-fit">
                    <div className="rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors px-4 py-2">
                      <span className="text-2xl font-bold text-primary">{crop.yield}%</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-foreground">
                    {crop.name}
                  </CardTitle>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Package className="h-3.5 w-3.5" />
                      <span>{crop.fertilizer}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Target className="h-3.5 w-3.5" />
                      <span>{crop.month}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actionable Insights Section */}
        <ActionableInsights 
          rainfall={results.inputSummary.rainfall}
          minTemp={results.inputSummary.minTemp}
          maxTemp={results.inputSummary.maxTemp}
        />

        {/* Footer Action */}
        <div className="text-center pb-8">
          <Button 
            onClick={onCalculateAnother}
            size="lg" 
            className="flex items-center gap-2 mx-auto rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Calculate Another Prediction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;