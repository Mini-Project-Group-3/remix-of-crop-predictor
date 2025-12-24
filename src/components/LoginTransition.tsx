import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface LoginTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoginTransition = ({ isVisible, onComplete }: LoginTransitionProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onComplete, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Animated background circles */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 4 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-3xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 3 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-primary/30 to-accent/20 blur-2xl"
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 200,
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl"
              />
              <div className="rounded-full bg-gradient-to-br from-primary to-primary/80 p-6 shadow-2xl">
                <Leaf className="h-12 w-12 text-primary-foreground" />
              </div>
              
              {/* Sparkles */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Welcome text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-3xl font-bold text-foreground mb-2"
              >
                Welcome to AgroYield
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-muted-foreground"
              >
                Preparing your dashboard...
              </motion.p>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-2 mt-4"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              ))}
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginTransition;
