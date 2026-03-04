import { useState, useRef, useEffect } from "react";
import { ArrowRight, BookOpen, ShieldCheck, Zap, Mail, Cpu, Palette, Code, Search, Globe, TrendingUp, Share2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { articles, getCategoryColor } from "../data/articles";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";
import { InfiniteCarousel } from "../components/InfiniteCarousel";

export function Home() {
  // Sort articles by date (newest first) and take the 3 most recent
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselRef = useRef(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="bg-white">
      <SEOHead 
        title="Numcafé - Actualité Numérique, Intelligence Artificielle & Tendances Tech 2025"
        description="Découvrez l'actualité numérique et les tendances tech expliquées simplement. Intelligence artificielle, culture digitale, outils IA gratuits et guides numériques avec votre café digital quotidien."
        keywords="actualité numérique, tendances tech, intelligence artificielle, culture digitale, nouveautés numériques, café digital, innovations tech, futur du numérique, guides numériques, outils IA gratuits, technologie simple, comprendre le numérique, tech 2025 expliquée"
        canonical="https://numcafe.com/"
        url="https://numcafe.com/"
      />
      <StructuredData type="website" />
      <StructuredData type="organization" />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FFF8F0] to-white min-h-screen flex items-center">
        {/* Decorative Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Coffee Cup Shape - Top Left */}
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-80 opacity-10"
            animate={{
              rotate: [0, 5, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 60 L40 180 C40 200 50 220 80 220 L120 220 C150 220 160 200 160 180 L160 60 Z" fill="#8B6F5C" />
              <path d="M35 50 C35 45 38 40 45 40 L155 40 C162 40 165 45 165 50 L165 70 L35 70 Z" fill="#8B6F5C" />
              <path d="M50 100 Q100 110 150 100" stroke="white" strokeWidth="3" opacity="0.3" />
            </svg>
          </motion.div>

          {/* Coffee Beans - Top Right */}
          <motion.div
            className="absolute top-32 right-20 opacity-10"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${i * 30}px`,
                  top: `${i * 25}px`,
                }}
              >
                <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
                  <ellipse cx="20" cy="25" rx="18" ry="23" fill="#8B6F5C" />
                  <path d="M20 10 Q20 25 20 40" stroke="white" strokeWidth="2" opacity="0.3" />
                </svg>
              </motion.div>
            ))}
          </motion.div>

          {/* Geometric Circles */}
          <motion.div
            className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-[#C69C6D] opacity-5"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-[#B88C5D] opacity-5"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Abstract Rectangles */}
          <motion.div
            className="absolute bottom-32 right-20 w-24 h-24 bg-[#C69C6D] opacity-5 rounded-2xl rotate-12"
            animate={{
              rotate: [12, 20, 12],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] mb-6 leading-tight">
              Votre dose quotidienne d'actualité numérique et tendances tech
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Intelligence artificielle, culture digitale et nouveautés numériques — servies comme un bon café.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/blog';
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Découvrir
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1D] text-white rounded-xl hover:bg-[#2D2D2D] transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Intelligence artificielle & culture digitale expliquées simplement
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Numcafé décrypte l'actualité numérique et les tendances tech avec clarté. De l'IA aux innovations digitales, nous rendons la technologie accessible sans jargon.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Block 1 - Chaque jour */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              className="relative bg-gradient-to-br from-white to-[#FFF8F0] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative circle background */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C69C6D]/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative">
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white">
                    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 10 L16 16 L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                  Chaque jour
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Des articles frais et pertinents sur l'actualité numérique et les tendances tech qui façonnent le futur du numérique.
                </p>
              </div>
            </motion.div>

            {/* Block 2 - Contenu vérifié */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative bg-gradient-to-br from-white to-[#FFF8F0] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative circle background */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C69C6D]/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative">
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white">
                    <path d="M10 16 L14 20 L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                  Contenu vérifié
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Chaque information est vérifiée et sourcée pour garantir fiabilité et précision.
                </p>
              </div>
            </motion.div>

            {/* Block 3 - Technologie Simple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative bg-gradient-to-br from-white to-[#FFF8F0] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative circle background */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C69C6D]/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative">
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white">
                    <path d="M16 8 L19 14 L25 14 L20 18 L22 24 L16 20 L10 24 L12 18 L7 14 L13 14 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                  Technologie simple
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Un style clair et direct pour comprendre le numérique sans effort ni jargon technique.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Follow Us Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#FFF8F0] to-[#FFFBF5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Pourquoi nous suivre ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div
              className="bg-white rounded-2xl p-10 text-center border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all"
            >
              <div className="mb-4">
                <BookOpen className="w-12 h-12 text-[#C69C6D] mx-auto" />
              </div>
              <div className="text-3xl font-semibold text-[#C69C6D] mb-2">
                +100
              </div>
              <p className="text-base font-semibold text-[#1D1D1D] mb-2">
                Articles publiés
              </p>
              <p className="text-gray-600 text-sm">
                Des contenus riches sur la tech et l'innovation
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-2xl p-10 text-center border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all">
              <div className="mb-4">
                <ShieldCheck className="w-12 h-12 text-[#C69C6D] mx-auto" />
              </div>
              <div className="text-3xl font-semibold text-[#C69C6D] mb-2">
                100%
              </div>
              <p className="text-base font-semibold text-[#1D1D1D] mb-2">
                Actualités vérifiées
              </p>
              <p className="text-gray-600 text-sm">
                Information sourcée et fiable à chaque publication
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-2xl p-10 text-center border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all">
              <div className="mb-4">
                <Zap className="w-12 h-12 text-[#C69C6D] mx-auto" />
              </div>
              <div className="text-3xl font-semibold text-[#C69C6D] mb-2">
                5 min
              </div>
              <p className="text-base font-semibold text-[#1D1D1D] mb-2">
                Lecture rapide
              </p>
              <p className="text-gray-600 text-sm">
                Contenu clair et rapide à lire, parfait avec un café
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section - 6 categories */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Nos expertises & services digitaux
            </h2>
            <p className="text-base text-gray-600">Découvrez nos thématiques, nos passions et les services que nous proposons</p>
          </motion.div>

          {/* Infinite Scrolling Carousel */}
          <InfiniteCarousel />
        </div>
      </section>

      {/* Final CTA Section - NOW BEFORE Latest Articles */}
      <section className="py-20 bg-gradient-to-br from-[#1D1D1D] via-[#2D2D2D] to-[#1D1D1D] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-40 h-40 border-2 border-[#C69C6D] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 border-2 border-[#C69C6D] rounded-2xl"
            animate={{
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Nos derniers articles tech & IA
            </h2>
            <p className="text-base text-gray-300">Actualités numériques et tendances tech récentes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/blog';
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explorer les articles
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Rejoignez l'univers Section */}
      <section className="py-8 lg:py-10 bg-gradient-to-br from-[#FFF8F0] to-[#FFFBF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1D1D1D] mb-3">
              Rejoignez l'univers Numcafé - votre dose tech quotidienne
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-0 max-w-2xl mx-auto">
              Découvrez les tendances tech et l'actualité numérique servies avec passion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section - STAYS AT THE END */}
      <section className="py-4 bg-gradient-to-br from-[#FFFBF5] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#C69C6D] to-[#B88C5D] rounded-2xl p-8 text-center shadow-lg"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Newsletter Numcafé
            </h3>
            <p className="text-white/90 mb-6 text-sm">
              Les meilleurs articles tech, chaque semaine.
            </p>

            {subscribed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg"
              >
                <p className="text-white text-sm">
                  ✓ Merci pour votre inscription !
                </p>
              </motion.div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-[#1D1D1D] bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1D1D1D] text-white rounded-lg hover:bg-[#2D2D2D] transition-colors font-semibold"
                >
                  S'inscrire
                </button>
              </div>
              <p className="text-xs text-white/70 mt-3 text-center">
                Vous consentez à recevoir les communications Numcafé par email. Consultez notre{' '}
                <a href="/politique-de-confidentialite" className="underline hover:text-white transition-colors">
                  Politique de Confidentialité
                </a>.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Article Card Component
function ArticleCard({ article, index }: { article: any; index: number }) {
  // Generate abstract illustration based on index
  const illustrations = [
    // Illustration 1 - Coffee Cup
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="200" fill="#FFF8F0" />
      <path d="M60 70 L60 150 C60 165 70 175 90 175 L110 175 C130 175 140 165 140 150 L140 70 Z" fill="#C69C6D" />
      <path d="M55 60 C55 55 58 50 65 50 L135 50 C142 50 145 55 145 60 L145 75 L55 75 Z" fill="#8B6F5C" />
      <path d="M70 100 Q100 105 130 100" stroke="white" strokeWidth="3" opacity="0.3" />
      <circle cx="150" cy="105" r="15" stroke="#C69C6D" strokeWidth="3" fill="none" />
    </svg>,
    // Illustration 2 - Coffee Beans
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="200" fill="#FFF8F0" />
      <ellipse cx="70" cy="80" rx="25" ry="35" fill="#8B6F5C" transform="rotate(-15 70 80)" />
      <path d="M70 55 Q70 80 70 105" stroke="white" strokeWidth="3" opacity="0.3" transform="rotate(-15 70 80)" />
      <ellipse cx="130" cy="90" rx="25" ry="35" fill="#C69C6D" transform="rotate(20 130 90)" />
      <path d="M130 65 Q130 90 130 115" stroke="white" strokeWidth="3" opacity="0.3" transform="rotate(20 130 90)" />
      <ellipse cx="100" cy="130" rx="25" ry="35" fill="#8B6F5C" transform="rotate(-5 100 130)" />
      <path d="M100 105 Q100 130 100 155" stroke="white" strokeWidth="3" opacity="0.3" transform="rotate(-5 100 130)" />
    </svg>,
    // Illustration 3 - Abstract Shapes
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="200" fill="#FFF8F0" />
      <circle cx="100" cy="70" r="35" fill="#C69C6D" opacity="0.8" />
      <rect x="70" y="110" width="60" height="60" rx="10" fill="#8B6F5C" opacity="0.8" />
      <circle cx="140" cy="140" r="25" fill="#C69C6D" opacity="0.6" />
      <rect x="40" y="90" width="40" height="40" rx="20" fill="#B88C5D" opacity="0.6" />
    </svg>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <a href={`/article/${article.slug}`}>
        <div className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all h-full flex flex-col">
          {/* Abstract Illustration */}
          <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {illustrations[index % 3]}
            </motion.div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
            </div>
            
            <h3 className="text-base font-semibold text-[#1D1D1D] mb-3 group-hover:text-[#C69C6D] transition-colors line-clamp-2 flex-1">
              {article.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                {article.readTime}
              </span>
              <span className="text-[#C69C6D] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold text-sm">
                Lire
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}