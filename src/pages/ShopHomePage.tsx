import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ShoppingBag, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Package,
    title: "Quality Products",
    description: "Premium agricultural products sourced from trusted suppliers",
  },
  {
    icon: Truck,
    title: "Cash on Delivery",
    description: "Pay conveniently when your order arrives at your doorstep",
  },
  {
    icon: ShoppingBag,
    title: "Wide Selection",
    description: "Fertilizers, seeds, pesticides, and farming tools available",
  },
];

const ShopHomePage = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm text-white">Agriculture Store</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Quality Products for{" "}
            <span className="text-primary">Better Farming</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Buy quality agricultural products for better farming. Fertilizers, seeds, pesticides, and tools - all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/shop/products">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-lg px-8">
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-muted-foreground mb-8">
            Browse our collection of quality agricultural products
          </p>
          <Link to="/shop/products">
            <Button size="lg" className="gap-2">
              <ShoppingBag className="h-5 w-5" />
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ShopHomePage;
