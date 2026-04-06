import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const screens = [
  {
    title: "Discover Unique Items",
    description: "Find pre-loved premium products from sellers around you safely and easily.",
    image: "https://images.unsplash.com/photo-1513116476489-7635e79feb27?w=800&q=80"
  },
  {
    title: "Sell What You Don't Need",
    description: "Turn your unused items into cash by listing them on our secure marketplace.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80"
  }
];

export default function OnboardingPage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < screens.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="flex flex-col min-h-screen bg-black relative max-w-lg mx-auto w-full">
      <div className="absolute top-6 right-6 z-10 antialiased">
        <button onClick={onComplete} className="px-4 py-2 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md rounded-full text-white/90 font-semibold text-xs tracking-wider uppercase">Skip</button>
      </div>
      
      <div className="flex-1 relative w-full h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={step}
            src={screens[step].image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      </div>

      <div className="bg-background w-full px-8 pb-12 pt-6 flex flex-col items-center relative z-20">
        <div className="flex gap-2 mb-10">
          {screens.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === step ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'}`} />
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center w-full"
          >
            <h2 className="text-3xl font-extrabold mb-4 text-foreground tracking-tight">{screens[step].title}</h2>
            <p className="text-muted-foreground text-[17px] mb-12 leading-relaxed max-w-sm mx-auto">{screens[step].description}</p>
          </motion.div>
        </AnimatePresence>
        
        <button onClick={next} className="w-full py-4 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold text-lg active:scale-[0.98] transition-all">
          {step === screens.length - 1 ? "Get Started" : "Continue"}
        </button>
      </div>
    </div>
  );
}
