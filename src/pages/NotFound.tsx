import { Home, Coffee, ArrowLeft, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import logoImage from "figma:asset/88c228adcadce986f43573b7b3f79ab894398c2f.png";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFF8F0] to-white flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#C69C6D] opacity-10"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#B88C5D] opacity-10"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating Coffee Beans */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <svg width="30" height="40" viewBox="0 0 30 40" fill="none" className="opacity-20">
              <ellipse cx="15" cy="20" rx="13" ry="18" fill="#8B6F5C" />
              <path d="M15 8 Q15 20 15 32" stroke="white" strokeWidth="2" opacity="0.3" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Logo */}
          <motion.div
            className="mb-8 flex justify-center"
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={logoImage} 
              alt="Numcafé Logo" 
              className="w-64 h-auto opacity-90"
            />
          </motion.div>

          {/* 404 Number with Coffee Steam Effect */}
          <motion.div
            className="mb-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="font-bold text-[#1D1D1D] mb-2" style={{ fontSize: '120px', lineHeight: '1' }}>
              404
            </h1>
            
            {/* Steam Effect */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-8 bg-[#C69C6D] opacity-30 rounded-full"
                  style={{
                    left: `${i * 15 - 15}px`,
                  }}
                  animate={{
                    y: [-20, -60],
                    opacity: [0.3, 0],
                    scaleX: [1, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Fun Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-10"
          >
            <h2 className="font-semibold text-[#1D1D1D]" style={{ fontSize: '32px' }}>
              Oups ! Le café s'est renversé ! ☕
            </h2>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              La page que vous cherchez semble s'être échappée... Peut-être qu'elle a besoin d'une pause café ?
            </p>
            <div className="flex items-center justify-center gap-2 text-[#C69C6D]">
              <Coffee className="w-5 h-5" />
              <p className="font-medium">
                Pendant qu'on nettoie, retournons à l'accueil !
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all font-semibold"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </a>
            
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/blog';
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D1D1D] border-2 border-[#C69C6D] rounded-xl hover:bg-[#FFF8F0] transition-all font-semibold"
            >
              <BookOpen className="w-5 h-5" />
              Explorer le blog
            </a>
          </motion.div>

          {/* Fun Coffee Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#C69C6D]/20 max-w-lg mx-auto"
          >
            <p className="text-gray-600 italic">
              "Même une erreur 404 mérite un bon café !"
            </p>
            <p className="text-[#C69C6D] font-semibold mt-2">
              — L'équipe Numcafé
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}