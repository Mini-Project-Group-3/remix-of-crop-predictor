import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Leaf, Target, BarChart3, Sprout, ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import HeroBackground from "@/components/HeroBackground";
import PageTransition, { FadeIn, ScaleIn } from "@/components/PageTransition";
import AgriculturalChatBot from "@/components/AgriculturalChatBot";

interface HomePageProps {
  onStartPrediction: () => void;
}

const HomePage = ({ onStartPrediction }: HomePageProps) => {
  const features = [
    {
      icon: Target,
      title: "Input Your Data",
      description: "Provide details about your location, soil, nutrients, rainfall, fertilizer, and crop type",
    },
    {
      icon: BarChart3,
      title: "AI Analysis",
      description: "Our algorithm processes your data considering crop requirements and seasonal growing conditions",
    },
    {
      icon: Sprout,
      title: "Get Predictions",
      description: "Receive detailed yield predictions with factor breakdowns and actionable insights",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Premium Hero Background */}
      <HeroBackground />
      
      <PageTransition>
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="inline-flex mb-8"
              >
                <div className="rounded-full bg-primary/15 p-6 backdrop-blur-md border border-primary/25 shadow-lg">
                  <Leaf className="h-16 w-16 text-primary drop-shadow-sm" />
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 drop-shadow-sm">
                Agricultural Yield
                <span className="block bg-gradient-to-r from-primary via-primary/85 to-emerald-600 bg-clip-text text-transparent">
                  Predictor
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Get accurate yield predictions for your crops based on soil conditions, 
                nutrients, rainfall, and fertilizer data using advanced agricultural analytics.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={onStartPrediction}
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-emerald-600 shadow-xl hover:shadow-2xl transition-all gap-2 border-0"
                  >
                    <Sparkles className="h-5 w-5" />
                    Start Yield Prediction
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-sm text-muted-foreground mt-6 font-medium">
                ✅ Free analysis • Instant results
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our advanced algorithm analyzes multiple factors to predict your crop yield percentage
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <ScaleIn key={feature.title} delay={0.1 * index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full border-0 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="pb-4 relative">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="mb-4 flex justify-center"
                        >
                          <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                            <feature.icon className="h-8 w-8 text-primary" />
                          </div>
                        </motion.div>
                        <h3 className="text-center text-xl font-bold">{feature.title}</h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <Card className="border-0 bg-gradient-to-br from-primary/10 via-card to-accent/10 backdrop-blur-sm shadow-xl p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to Optimize Your Crop Yield?
                </h3>
                <p className="text-muted-foreground mb-8">
                  Get started with your yield prediction in just a few minutes
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={onStartPrediction}
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 shadow-xl"
                  >
                    Start Your Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Card>
            </div>
          </FadeIn>
        </section>
      </PageTransition>

      {/* Chatbot */}
      <AgriculturalChatBot onStartPrediction={onStartPrediction} />
    </div>
  );
};

export default HomePage;
