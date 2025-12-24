import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, TestTube, Package, CloudRain, Wheat, BarChart3, ArrowDown, CheckCircle } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition, { FadeIn, ScaleIn } from "@/components/PageTransition";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: MapPin,
      step: 1,
      title: "Enter Location",
      description: "Start by entering your district name. This helps us consider local climate patterns, soil types, and regional growing conditions specific to your area.",
      details: ["District identification", "Regional climate data", "Local soil characteristics"],
    },
    {
      icon: TestTube,
      step: 2,
      title: "Soil & Nutrients",
      description: "Provide details about your soil composition including color, pH level, and NPK (Nitrogen, Phosphorus, Potassium) content in parts per million.",
      details: ["Soil color/type selection", "NPK levels in ppm", "pH measurement (0-14)"],
    },
    {
      icon: Package,
      step: 3,
      title: "Fertilizer Selection",
      description: "Choose the type of fertilizer you're using or planning to use. Different fertilizers affect crop growth differently based on soil conditions.",
      details: ["NPK ratios", "Organic options", "Targeted nutrition"],
    },
    {
      icon: CloudRain,
      step: 4,
      title: "Climate Conditions",
      description: "Enter your area's annual rainfall in millimeters and the average temperature range during the growing season.",
      details: ["Annual rainfall (mm)", "Min/Max temperatures", "Climate zone analysis"],
    },
    {
      icon: Wheat,
      step: 5,
      title: "Crop Selection",
      description: "Select the crop you want to grow. Our system analyzes compatibility with your soil, climate, and nutrient conditions.",
      details: ["Crop type selection", "Water requirements", "Nutrient matching"],
    },
    {
      icon: BarChart3,
      step: 6,
      title: "Get Predictions",
      description: "Receive comprehensive yield predictions with detailed factor analysis, actionable recommendations, and alternative crop suggestions.",
      details: ["Yield percentage", "Factor breakdown", "Improvement tips"],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <AnimatedBackground variant="subtle" />
      
      <PageTransition>
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                How It Works
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Follow our simple 6-step process to get accurate yield predictions 
                tailored to your specific farming conditions.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Steps Section */}
        <section className="px-4 py-12 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden md:block" />

              {steps.map((step, index) => (
                <div key={step.step} className="relative mb-12 last:mb-0">
                  <ScaleIn delay={0.1 * index}>
                    <div className={`flex flex-col md:flex-row gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Step number bubble */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg z-10"
                        >
                          <span className="text-xl font-bold text-primary-foreground">{step.step}</span>
                        </motion.div>
                      </div>

                      {/* Content card */}
                      <div className={`flex-1 ${index % 2 === 1 ? 'md:pr-24' : 'md:pl-24'}`}>
                        <motion.div
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className="border-0 bg-card/90 backdrop-blur-sm shadow-xl overflow-hidden group">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <motion.div
                                  whileHover={{ rotate: 10, scale: 1.1 }}
                                  className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors flex-shrink-0"
                                >
                                  <step.icon className="h-6 w-6 text-primary" />
                                </motion.div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="md:hidden text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                                      Step {step.step}
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground">
                                      {step.title}
                                    </h3>
                                  </div>
                                  <p className="text-muted-foreground mb-4">
                                    {step.description}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.details.map((detail) => (
                                      <span
                                        key={detail}
                                        className="inline-flex items-center gap-1 text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full"
                                      >
                                        <CheckCircle className="h-3 w-3 text-primary" />
                                        {detail}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </ScaleIn>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="hidden md:flex justify-center my-4"
                    >
                      <ArrowDown className="h-6 w-6 text-primary/30" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <Card className="border-0 bg-gradient-to-br from-primary/10 via-card to-accent/10 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Tips for Best Results
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "Use recent soil test results for accurate NPK values",
                      "Enter the average rainfall for your growing season",
                      "Consider the temperature range during crop maturity",
                      "Choose fertilizers that complement your soil deficiencies",
                    ].map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      </PageTransition>
    </div>
  );
};

export default HowItWorksPage;
