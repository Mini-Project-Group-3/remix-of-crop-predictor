import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Code, Database, Palette } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition, { FadeIn, ScaleIn } from "@/components/PageTransition";

const CreatorsPage = () => {
  const creators = [
    {
      name: "Jitesh Karale",
      role: "ML Engineer, Backend Developer & NLP Expert",
      icon: Database,
      color: "from-emerald-500 to-green-600",
      linkedin: "https://www.linkedin.com/in/jitesh-karale/",
    },
    {
      name: "Shravani Dhuri",
      role: "Frontend Developer & UI Designer",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      linkedin: "https://www.linkedin.com/in/shravani-dhuri-986b6a317/",
    },
    {
      name: "Maitreya More",
      role: "Developer & Researcher",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      linkedin: "https://www.linkedin.com/in/maitreyamore/",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <AnimatedBackground variant="subtle" />
      
      <PageTransition>
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Meet the Creators
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate team behind AgroYield, dedicated to revolutionizing 
                agricultural predictions with cutting-edge technology.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Team Cards - Center Aligned */}
        <section className="px-4 py-12 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8">
              {creators.map((creator, index) => (
                <ScaleIn key={creator.name} delay={0.15 * index}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full sm:w-[320px]"
                  >
                    <Card className="h-full border-0 bg-card/95 backdrop-blur-md shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-300">
                      {/* Gradient header bar */}
                      <div className={`h-2 bg-gradient-to-r ${creator.color}`} />
                      
                      <CardContent className="p-8 flex flex-col items-center text-center">
                        {/* Profile Image Placeholder with Icon */}
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className={`w-24 h-24 rounded-full bg-gradient-to-br ${creator.color} flex items-center justify-center shadow-xl mb-6 ring-4 ring-background`}
                        >
                          <creator.icon className="h-12 w-12 text-white" />
                        </motion.div>

                        {/* Name */}
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {creator.name}
                        </h3>
                        
                        {/* Role - Green highlighted */}
                        <p className="text-sm font-semibold text-primary mb-6 bg-primary/10 px-4 py-1.5 rounded-full">
                          {creator.role}
                        </p>

                        {/* LinkedIn Button */}
                        <motion.div 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            asChild
                          >
                            <a 
                              href={creator.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="h-5 w-5" />
                              Connect on LinkedIn
                            </a>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Quote Section */}
        <section className="px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <Card className="border-0 bg-gradient-to-br from-primary/15 via-card/90 to-accent/10 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="text-5xl mb-4">🌾</div>
                  <p className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto">
                    "Empowering farmers with data-driven insights to maximize crop yields 
                    and build a sustainable future for agriculture."
                  </p>
                  <p className="text-sm text-primary font-semibold mt-4">
                    — The AgroYield Team
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      </PageTransition>
    </div>
  );
};

export default CreatorsPage;