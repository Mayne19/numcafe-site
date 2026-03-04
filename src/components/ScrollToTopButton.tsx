import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScroll / scrollHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(currentScroll > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#1D1D1D] text-white rounded-full shadow-2xl hover:shadow-xl transition-all flex items-center justify-center cursor-pointer group"
          aria-label="Retour en haut"
        >
          {/* Progress Circle */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#C69C6D"
              strokeWidth="3"
              fill="none"
              opacity="0.2"
            />
            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#C69C6D"
              strokeWidth="3"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          
          {/* Arrow Icon */}
          <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
