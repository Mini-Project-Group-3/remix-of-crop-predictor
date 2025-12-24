import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Code, Database, Palette, Cpu } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition, { FadeIn, ScaleIn } from "@/components/PageTransition";

const CreatorsPage = () => {
  const creators = [
    {
      name: "Arjun Patel",
      role: "Full Stack Developer",
      bio: "Passionate about building scalable agricultural solutions. Specializes in React and Node.js development.",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      socials: {
        github: "#",
        linkedin: "#",
        email: "arjun@agroyield.com",
      },
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist",
      bio: "Expert in machine learning and predictive analytics. Leads the development of our yield prediction models.",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      socials: {
        github: "#",
        linkedin: "#",
        email: "priya@agroyield.com",
      },
    },
    {
      name: "Rahul Deshmukh",
      role: "UI/UX Designer",
      bio: "Creates intuitive and beautiful interfaces. Focused on making complex data accessible to farmers.",
      icon: Palette,
      color: "from-orange-500 to-yellow-500",
      socials: {
        github: "#",
        linkedin: "#",
        email: "rahul@agroyield.com",
      },
    },
    {
      name: "Sneha Kulkarni",
      role: "Agricultural Specialist",
      bio: "Agronomist with 10+ years of experience. Ensures our predictions align with real-world farming practices.",
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
      socials: {
        github: "#",
        linkedin: "#",
        email: "sneha@agroyield.com",
      },
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
                Meet the Creators
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate team behind AgroYield, working together to 
                revolutionize agricultural predictions.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Team Grid */}
        <section className="px-4 py-12 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              {creators.map((creator, index) => (
                <ScaleIn key={creator.name} delay={0.1 * index}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full border-0 bg-card/90 backdrop-blur-sm shadow-xl overflow-hidden group">
                      {/* Gradient header */}
                      <div className={`h-2 bg-gradient-to-r ${creator.color}`} />
                      
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Avatar placeholder with icon */}
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className={`w-16 h-16 rounded-full bg-gradient-to-br ${creator.color} flex items-center justify-center shadow-lg`}
                          >
                            <creator.icon className="h-8 w-8 text-white" />
                          </motion.div>

                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground">
                              {creator.name}
                            </h3>
                            <p className="text-sm font-medium text-primary mb-3">
                              {creator.role}
                            </p>
                            <p className="text-muted-foreground text-sm mb-4">
                              {creator.bio}
                            </p>

                            {/* Social links */}
                            <div className="flex gap-2">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <a href={creator.socials.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                  </a>
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <a href={creator.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-4 w-4" />
                                  </a>
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <a href={`mailto:${creator.socials.email}`}>
                                    <Mail className="h-4 w-4" />
                                  </a>
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <Card className="border-0 bg-gradient-to-br from-primary/10 via-card to-accent/10 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Join Our Team
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    We're always looking for passionate individuals who want to make 
                    a difference in agriculture. If you're excited about using technology 
                    to help farmers, we'd love to hear from you.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-primary/80 shadow-xl"
                      asChild
                    >
                      <a href="mailto:careers@agroyield.com">
                        <Mail className="mr-2 h-5 w-5" />
                        Get in Touch
                      </a>
                    </Button>
                  </motion.div>
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
