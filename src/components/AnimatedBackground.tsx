import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Agricultural background images
const backgroundImages = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80", // Golden wheat field
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80", // Green rice paddy
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80", // Soil texture
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&q=80", // Farm landscape
];

interface AnimatedBackgroundProps {
  variant?: "hero" | "subtle" | "minimal";
  overlay?: boolean;
  children?: React.ReactNode;
}

const AnimatedBackground = ({ 
  variant = "subtle", 
  overlay = true,
  children 
}: AnimatedBackgroundProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const getAnimationProps = () => {
    if (shouldReduceMotion) {
      return { animate: {}, transition: {} };
    }

    switch (variant) {
      case "hero":
        return {
          animate: {
            scale: [1, 1.05, 1],
            x: [0, -20, 0],
          },
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear" as const,
          },
        };
      case "subtle":
        return {
          animate: {
            x: [0, -30, 0],
            y: [0, -15, 0],
          },
          transition: {
            duration: 30,
            repeat: Infinity,
            ease: "linear" as const,
          },
        };
      case "minimal":
        return {
          animate: {
            scale: [1, 1.02, 1],
          },
          transition: {
            duration: 40,
            repeat: Infinity,
            ease: "linear" as const,
          },
        };
      default:
        return { animate: {}, transition: {} };
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Background images with crossfade */}
      {backgroundImages.map((img, index) => (
        <motion.div
          key={img}
          className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentImage === index ? 1 : 0,
            ...(!shouldReduceMotion && getAnimationProps().animate),
          }}
          transition={{
            opacity: { duration: 2, ease: "easeInOut" },
            ...getAnimationProps().transition,
          }}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Gradient overlays */}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </>
      )}

      {/* Subtle animated particles/grain effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {children}
    </div>
  );
};

export default AnimatedBackground;
