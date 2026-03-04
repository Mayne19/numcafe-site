import { motion } from "motion/react";
import logoImage from "figma:asset/88c228adcadce986f43573b7b3f79ab894398c2f.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 1200);
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-white via-[#FFF8F0] to-white"
    >
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1],
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 0.8,
          times: [0, 0.6, 1],
          ease: "easeOut"
        }}
        className="relative"
      >
        {/* Glow effect behind logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
          className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#C69C6D] to-[#B88C5D] rounded-full"
        />
        
        {/* Logo */}
        <motion.img
          src={logoImage}
          alt="Numcafé"
          className="w-64 h-auto relative z-10"
          initial={{ rotate: -5 }}
          animate={{ rotate: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      </motion.div>

      {/* Coffee beans floating animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${20 + i * 30}%`,
              y: "100%",
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              y: "-20%",
              rotate: 360,
              opacity: [0, 0.15, 0]
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.15,
              ease: "easeOut"
            }}
            className="absolute"
          >
            <svg width="30" height="38" viewBox="0 0 30 38" fill="none">
              <ellipse cx="15" cy="19" rx="13" ry="17" fill="#8B6F5C" opacity="0.3" />
              <path d="M15 7 Q15 19 15 30" stroke="white" strokeWidth="1.5" opacity="0.2" />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
