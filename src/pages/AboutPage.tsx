import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Target, BarChart3, Globe, Shield, Zap } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition, { FadeIn, SlideIn } from "@/components/PageTransition";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Accurate predictions based on scientific agricultural models and real-world data",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making advanced agricultural technology available to farmers everywhere",
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Trusted predictions you can depend on for planning your farming operations",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our algorithms with the latest research",
    },
  ];

  const stats = [
    { value: "95%", label: "Prediction Accuracy" },
    { value: "10K+", label: "Farmers Helped" },
    { value: "50+", label: "Crop Types" },
    { value: "100+", label: "Districts Covered" },
  ];

  return (
    <div className="min-h-screen pt-16">
      <AnimatedBackground variant="subtle" />
      
      <PageTransition>
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-flex mb-8"
              >
                <div className="rounded-full bg-primary/10 p-6 backdrop-blur-sm border border-primary/20">
                  <Leaf className="h-12 w-12 text-primary" />
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About AgroYield
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Empowering farmers with AI-powered agricultural insights to maximize 
                crop yields and make informed decisions.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <SlideIn direction="left">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Our Mission
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    At AgroYield, we believe that every farmer deserves access to 
                    cutting-edge agricultural technology. Our mission is to bridge 
                    the gap between advanced data science and practical farming.
                  </p>
                  <p className="text-muted-foreground">
                    By analyzing soil conditions, weather patterns, and crop 
                    characteristics, we provide actionable insights that help 
                    farmers optimize their yields and reduce waste.
                  </p>
                </div>
              </SlideIn>

              <SlideIn direction="right">
                <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center"
                        >
                          <div className="text-3xl font-bold text-primary mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Values
                </h2>
                <p className="text-lg text-muted-foreground">
                  The principles that guide everything we do
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <FadeIn key={value.title} delay={0.1 * index}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all group">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          whileHover={{ rotate: 10 }}
                          className="inline-flex mb-4"
                        >
                          <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                            <value.icon className="h-6 w-6 text-primary" />
                          </div>
                        </motion.div>
                        <h3 className="font-bold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <Card className="border-0 bg-gradient-to-br from-primary/10 via-card to-accent/10 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 md:p-12 text-center">
                  <BarChart3 className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Powered by Advanced Analytics
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our prediction models are built on decades of agricultural research 
                    and trained on millions of data points from farms across the country. 
                    We combine machine learning with domain expertise to deliver 
                    predictions you can trust.
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

export default AboutPage;
