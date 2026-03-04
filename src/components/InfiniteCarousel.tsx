import { Cpu, Code, Palette, Search, Globe, TrendingUp, Share2, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import coffeeIcon from "figma:asset/7144e1968d926663741218e5a60ae530189746ac.png";

export function InfiniteCarousel() {
  const topics = [
    {
      icon: Cpu,
      title: "Intelligence Artificielle",
      description: "ChatGPT, outils IA gratuits et automatisation intelligente.",
      href: "/intelligence-artificielle"
    },
    {
      icon: Code,
      title: "Développement Web",
      description: "Langages, frameworks modernes et bonnes pratiques tech.",
      href: "/developpement-web"
    },
    {
      icon: Palette,
      title: "Design & UX",
      description: "UI/UX, tendances graphiques et outils de création digitale.",
      href: "/design-ux"
    },
    {
      icon: Search,
      title: "SEO & Référencement",
      description: "Optimisation SEO, stratégies de visibilité et référencement naturel.",
      href: "/seo-referencement"
    },
    {
      icon: Globe,
      title: "Culture Digitale",
      description: "Actualité numérique, tendances tech et innovations digitales.",
      href: "/culture-digitale"
    },
    {
      icon: TrendingUp,
      title: "Productivité & Café",
      description: "Outils et astuces pour booster votre efficacité au quotidien.",
      href: "/productivite-cafe"
    },
    {
      icon: Share2,
      title: "Réseaux sociaux",
      description: "Stratégies social media, community management et tendances virales.",
      href: "/reseaux-sociaux"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce & Marketing Digital",
      description: "Stratégies e-commerce, publicité digitale et optimisation des conversions.",
      href: "/ecommerce-marketing"
    }
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Triple the topics for seamless infinite scroll
  const tripledTopics = [...topics, ...topics, ...topics];
  const cardWidth = 320; // Width of each card + gap
  const totalWidth = topics.length * cardWidth;

  // Start at the middle set to allow bidirectional scrolling
  const [initialPositionSet, setInitialPositionSet] = useState(false);

  useEffect(() => {
    if (!initialPositionSet) {
      setScrollPosition(totalWidth); // Start at middle set
      setInitialPositionSet(true);
    }
  }, [initialPositionSet, totalWidth]);

  useEffect(() => {
    if (isPaused || isTransitioning || !initialPositionSet) return;

    const animate = () => {
      setScrollPosition((prev) => {
        const newPos = prev + 0.5; // Speed of auto-scroll
        
        // Seamlessly loop: reset to middle when reaching end of middle set
        if (newPos >= totalWidth * 2) {
          return newPos - totalWidth;
        }
        return newPos;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isTransitioning, totalWidth, initialPositionSet]);

  const handleScrollLeft = () => {
    setIsTransitioning(true);
    setScrollPosition((prev) => {
      let newPos = prev - cardWidth;
      
      // If going too far left, jump to equivalent position in next set
      if (newPos < totalWidth * 0.5) {
        newPos = newPos + totalWidth;
      }
      
      return newPos;
    });
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const handleScrollRight = () => {
    setIsTransitioning(true);
    setScrollPosition((prev) => {
      let newPos = prev + cardWidth;
      
      // If going too far right, jump to equivalent position in previous set
      if (newPos >= totalWidth * 2.5) {
        newPos = newPos - totalWidth;
      }
      
      return newPos;
    });
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  return (
    <div className="relative">
      {/* Left Navigation Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-4 border-2 border-gray-200 hover:border-[#C69C6D] transition-all hover:scale-110"
        aria-label="Défiler vers la gauche"
      >
        <ChevronLeft className="w-6 h-6 text-[#C69C6D]" />
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-4 border-2 border-gray-200 hover:border-[#C69C6D] transition-all hover:scale-110"
        aria-label="Défiler vers la droite"
      >
        <ChevronRight className="w-6 h-6 text-[#C69C6D]" />
      </button>

      {/* Carousel Container */}
      <div 
        className="overflow-hidden py-12"
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-8"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            transition: (isPaused || isTransitioning) ? 'transform 1.2s ease-in-out' : 'none',
          }}
        >
          {tripledTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <a
                key={index}
                href={topic.href}
                className="group flex-shrink-0"
                style={{ width: "280px" }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = topic.href;
                }}
              >
                {/* Service Card - Simple Design */}
                <motion.div
                  className="relative h-[160px] cursor-pointer bg-[#FFF8F0] rounded-2xl p-6 border border-gray-200 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-md"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Content */}
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-4">
                      <Icon className="w-9 h-9 text-[#C69C6D]" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-[#1D1D1D] mb-2 leading-tight">
                      {topic.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </motion.div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}