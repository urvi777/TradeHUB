import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SplashPage({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-primary/20 rounded-[2rem] flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          <span className="text-6xl font-black text-primary">T</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-3">TradeHub</h1>
        <p className="text-muted-foreground font-medium text-lg">Your Premium Marketplace</p>
      </motion.div>
    </div>
  );
}
