import { motion, useReducedMotion } from "framer-motion";

const HeroBackground = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base gradient - green to warm sunlight */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              hsl(142 40% 92%) 0%,
              hsl(120 30% 95%) 25%,
              hsl(80 35% 93%) 50%,
              hsl(45 50% 94%) 75%,
              hsl(38 55% 92%) 100%
            )
          `,
        }}
      />

      {/* Dark mode gradient overlay */}
      <div 
        className="absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(
              135deg,
              hsl(155 25% 10%) 0%,
              hsl(160 20% 12%) 25%,
              hsl(140 15% 11%) 50%,
              hsl(120 10% 10%) 75%,
              hsl(155 20% 8%) 100%
            )
          `,
        }}
      />

      {/* Organic shape - Large leaf/crop field (top left) */}
      <motion.div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] opacity-[0.08] dark:opacity-[0.12]"
        animate={shouldReduceMotion ? {} : {
          x: [0, 20, 0],
          y: [0, 15, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <path
            d="M200 20C280 20 340 80 360 160C380 240 340 320 260 360C180 400 80 360 40 280C0 200 40 100 120 60C160 40 200 20 200 20Z"
            fill="hsl(142 76% 36%)"
          />
          <path
            d="M180 80C220 100 260 160 260 220C260 280 220 320 180 320C140 320 100 280 100 220C100 160 140 100 180 80Z"
            fill="hsl(142 50% 45%)"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Organic shape - Soil layers (bottom) */}
      <motion.div
        className="absolute -bottom-20 left-0 right-0 h-[400px] opacity-[0.05] dark:opacity-[0.08]"
        animate={shouldReduceMotion ? {} : {
          y: [0, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0 200C240 150 480 250 720 200C960 150 1200 250 1440 200V400H0V200Z"
            fill="hsl(30 40% 35%)"
          />
          <path
            d="M0 250C240 200 480 300 720 250C960 200 1200 300 1440 250V400H0V250Z"
            fill="hsl(25 35% 30%)"
            opacity="0.7"
          />
          <path
            d="M0 300C240 260 480 340 720 300C960 260 1200 340 1440 300V400H0V300Z"
            fill="hsl(20 30% 25%)"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Organic shape - Small leaf (top right) */}
      <motion.div
        className="absolute top-20 right-10 md:right-32 w-[200px] h-[200px] opacity-[0.1] dark:opacity-[0.15]"
        animate={shouldReduceMotion ? {} : {
          x: [0, -15, 0],
          y: [0, 10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full blur-sm">
          <path
            d="M50 5C70 5 90 25 90 50C90 75 70 95 50 95C30 95 10 75 10 50C10 25 30 5 50 5Z"
            fill="hsl(142 60% 40%)"
          />
          <path
            d="M50 20C60 30 60 70 50 80C40 70 40 30 50 20Z"
            fill="hsl(142 70% 50%)"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Organic shape - Wheat/grain stalks (right side) */}
      <motion.div
        className="absolute top-1/3 -right-10 w-[300px] h-[400px] opacity-[0.06] dark:opacity-[0.1]"
        animate={shouldReduceMotion ? {} : {
          x: [0, 10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 150 300" fill="none" className="w-full h-full blur-[2px]">
          <ellipse cx="75" cy="40" rx="30" ry="40" fill="hsl(48 80% 55%)" />
          <ellipse cx="55" cy="70" rx="25" ry="35" fill="hsl(48 70% 50%)" opacity="0.8" />
          <ellipse cx="95" cy="80" rx="25" ry="35" fill="hsl(48 70% 50%)" opacity="0.8" />
          <rect x="70" y="60" width="10" height="240" fill="hsl(80 50% 40%)" />
        </svg>
      </motion.div>

      {/* Organic shape - Floating seed/circle (center-left) */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[150px] h-[150px] opacity-[0.08] dark:opacity-[0.12]"
        animate={shouldReduceMotion ? {} : {
          y: [0, -25, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/50 blur-xl" />
      </motion.div>

      {/* Additional floating orb (right-center) */}
      <motion.div
        className="absolute top-2/3 right-1/4 w-[100px] h-[100px] opacity-[0.1] dark:opacity-[0.15]"
        animate={shouldReduceMotion ? {} : {
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-400/50 to-yellow-300/30 blur-xl" />
      </motion.div>

      {/* Subtle grain/noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.3) 100%)`,
        }}
      />
    </div>
  );
};

export default HeroBackground;