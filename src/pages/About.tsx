import { Coffee, Heart, Users, Zap, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  return (
    <div className="bg-white">
      <SEOHead 
        title="À Propos de Numcafé - Média Digital Spécialisé en Tech & IA"
        description="Découvrez Numcafé, votre média digital spécialisé dans l'actualité numérique, l'intelligence artificielle et les tendances tech. Notre mission : rendre la culture digitale accessible à tous."
        keywords="à propos numcafé, média digital, actualité numérique, intelligence artificielle, tendances tech, culture digitale, innovations, futur du numérique"
        canonical="https://numcafe.com/a-propos"
      />
      {/* Hero */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1D] mb-4 sm:mb-6">
            À propos de Numcafé - média digital tech & IA
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Numcafé est né de la passion pour la technologie et d'un amour inconditionnel pour le café. Nous sommes un
            média digital moderne qui décrypte l'actualité numérique et les tendances tech avec authenticité et expertise.
          </p>
        </div>
      </section>

      {/* Mission with smaller image */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1D1D] mb-4 sm:mb-6">Notre mission</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  Nous croyons que l'actualité numérique et les tendances tech doivent être accessibles, engageantes et inspirantes. Notre mission
                  est de démystifier les innovations numériques et de rendre la culture digitale compréhensible pour tous.
                </p>
                <p>
                  Chaque jour, nous explorons les dernières nouveautés numériques en intelligence artificielle, les outils IA gratuits,
                  le design digital et les guides numériques. Nous partageons également notre passion pour le café, cette tasse de café
                  fidèle de tout professionnel du numérique.
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF8F0] to-[#FFFBF5] border-2 border-gray-200 hover:border-[#C69C6D] transition-all relative order-1 lg:order-2">
              {/* Illustration minimaliste simple - Café + Tech */}
              <div className="w-full h-full flex items-center justify-center p-8 sm:p-12 relative">
                
                {/* Tasse de café stylisée au centre */}
                <motion.svg
                  width="200"
                  height="180"
                  viewBox="0 0 200 180"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Corps de la tasse - forme simple */}
                  <path
                    d="M 60 70 L 60 130 Q 60 145 75 145 L 125 145 Q 140 145 140 130 L 140 70 Z"
                    fill="#C69C6D"
                    opacity="0.85"
                  />
                  
                  {/* Ouverture de la tasse */}
                  <ellipse cx="100" cy="70" rx="40" ry="10" fill="#8B6F5C" />
                  
                  {/* Surface du café */}
                  <ellipse cx="100" cy="72" rx="38" ry="8" fill="#8B6F5C" opacity="0.6" />
                  
                  {/* Anse simple */}
                  <path
                    d="M 140 85 Q 160 85 165 100 Q 165 115 155 120 Q 150 120 148 115 Q 152 110 152 100 Q 150 90 140 90"
                    fill="none"
                    stroke="#C69C6D"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  
                  {/* Reflet lumineux */}
                  <path
                    d="M 75 85 Q 80 105 78 120"
                    stroke="#FFF8F0"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.5"
                    strokeLinecap="round"
                  />
                  
                  {/* Vapeur simple qui monte */}
                  <motion.path
                    d="M 85 60 Q 80 45 85 30"
                    stroke="#C69C6D"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                    animate={{
                      opacity: [0.4, 0.2, 0.4],
                      d: [
                        "M 85 60 Q 80 45 85 30",
                        "M 85 60 Q 82 43 87 28",
                        "M 85 60 Q 80 45 85 30"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.path
                    d="M 100 58 Q 100 40 100 25"
                    stroke="#C69C6D"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.5"
                    animate={{
                      opacity: [0.5, 0.25, 0.5],
                      d: [
                        "M 100 58 Q 100 40 100 25",
                        "M 100 58 Q 98 38 102 22",
                        "M 100 58 Q 100 40 100 25"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6
                    }}
                  />
                  
                  <motion.path
                    d="M 115 60 Q 120 45 115 30"
                    stroke="#C69C6D"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                    animate={{
                      opacity: [0.4, 0.2, 0.4],
                      d: [
                        "M 115 60 Q 120 45 115 30",
                        "M 115 60 Q 118 43 113 28",
                        "M 115 60 Q 120 45 115 30"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2
                    }}
                  />
                </motion.svg>

                {/* Symbole code simple < > à gauche */}
                <motion.svg
                  className="absolute"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  style={{ left: '18%', top: '35%' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.4, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <path
                    d="M 35 15 L 20 30 L 35 45"
                    stroke="#1D1D1D"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>

                <motion.svg
                  className="absolute"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  style={{ right: '18%', top: '35%' }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 0.4, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <path
                    d="M 25 15 L 40 30 L 25 45"
                    stroke="#1D1D1D"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>

                {/* Grain de café simple en haut à gauche */}
                <motion.svg
                  width="40"
                  height="48"
                  viewBox="0 0 40 48"
                  className="absolute"
                  style={{ left: '22%', top: '18%' }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ellipse cx="20" cy="24" rx="17" ry="22" fill="#8B6F5C" opacity="0.5" />
                  <path d="M20 5 Q20 24 20 43" stroke="#FFF8F0" strokeWidth="2.5" opacity="0.4" />
                </motion.svg>

                {/* Grain de café simple en haut à droite */}
                <motion.svg
                  width="35"
                  height="42"
                  viewBox="0 0 35 42"
                  className="absolute"
                  style={{ right: '22%', top: '20%' }}
                  animate={{ rotate: [0, -12, 12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <ellipse cx="17.5" cy="21" rx="15" ry="19" fill="#C69C6D" opacity="0.5" />
                  <path d="M17.5 5 Q17.5 21 17.5 37" stroke="#FFF8F0" strokeWidth="2" opacity="0.4" />
                </motion.svg>

                {/* Cercle simple en bas */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full border-3 border-[#C69C6D]"
                  style={{ left: '50%', bottom: '12%', transform: 'translateX(-50%)', borderWidth: '3px', opacity: 0.2 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1D1D] mb-4 sm:mb-6">Notre vision</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Numcafé n'est pas qu'un simple média : c'est une communauté de passionnés qui croient en
              l'innovation, la créativité et le pouvoir d'une bonne tasse de café pour transformer une journée de
              travail. Nous aspirons à devenir la référence francophone pour tous ceux qui veulent rester informés
              des tendances tech tout en savourant les plaisirs simples de la vie.
            </p>
          </div>
        </div>
      </section>

      {/* L'auteur */}
      <section id="auteur" className="py-12 md:py-16 bg-[#FFF8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1D1D] mb-4">L'auteur</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#E8DCCB]">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Icon */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] flex items-center justify-center text-white shadow-lg">
                  <User className="w-10 h-10" />
                </div>
              </div>
              
              {/* Author Info */}
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#1D1D1D] text-center md:text-left">Mayne</h3>
                <p className="text-sm text-[#C69C6D] mb-4 font-medium text-center md:text-left">Rédacteur en chef & Fondateur de Numcafé</p>
                
                <div className="space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                  <p>
                    Passionné par la tech et le digital depuis plus de 10 ans, Mayne a fondé Numcafé avec 
                    l'ambition de démocratiser l'information technologique. Diplômé en communication digitale 
                    et fort d'une expérience en rédaction web, il explore au quotidien les innovations 
                    qui transforment notre société.
                  </p>
                  <p>
                    À travers Numcafé, Mayne partage sa vision d'un numérique accessible à tous, où la 
                    complexité technique laisse place à la clarté et à l'inspiration. Chaque article est 
                    pensé comme une conversation autour d'un café, pour rendre la tech aussi plaisante 
                    qu'enrichissante.
                  </p>
                  <p className="italic text-[#C69C6D]">
                    "Mon objectif est simple : vous donner les clés pour comprendre et apprivoiser 
                    le monde numérique, une tasse de café à la fois."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1D1D] mb-4">Nos valeurs</h2>
            <p className="text-sm sm:text-base text-gray-600">Ce qui guide notre travail au quotidien</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-[#C69C6D]" />
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1D] mb-3">Innovation</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nous explorons constamment les nouvelles technologies et tendances pour vous offrir un contenu à la
                pointe.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#C69C6D]" />
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1D] mb-3">Passion</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Notre amour pour la tech et le café transparaît dans chaque article que nous publions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Coffee className="w-7 h-7 sm:w-8 sm:h-8 text-[#C69C6D]" />
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1D] mb-3">Authenticité</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nous partageons nos opinions honnêtes et nos expériences réelles, sans compromis.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border-2 border-gray-200 hover:border-[#C69C6D] hover:shadow-xl transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#C69C6D]" />
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1D] mb-3">Communauté</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nous créons un espace d'échange et de partage pour tous les passionnés de tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-[#1D1D1D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Coffee className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-[#C69C6D]" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Rejoignez l'aventure</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Vous partagez notre passion pour la tech et le café ? Restez connecté avec nous et ne manquez aucune de
            nos publications.
          </p>
          <a
            href="mailto:hello@numcafe.com"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#C69C6D] text-white rounded-full hover:bg-[#B88C5D] transition-all hover:scale-105 text-sm sm:text-base"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Contactez-nous</span>
          </a>
        </div>
      </section>

      {/* Message de l'équipe */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#FFF8F0] to-[#FFFBF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg border-2 border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1D1D]">L'équipe Numcafé</h2>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                Derrière Numcafé se trouve une équipe de professionnels passionnés du numérique, réunis autour 
                d'une vision commune : rendre l'actualité tech accessible et inspirante. Nous sommes journalistes 
                spécialisés, développeurs, designers UX/UI et experts en intelligence artificielle.
              </p>
              <p>
                Notre rédaction travaille quotidiennement à décrypter les innovations technologiques, analyser 
                les tendances du digital et tester les nouveaux outils qui transforment nos métiers. Chaque 
                membre apporte son expertise unique pour garantir la qualité et la pertinence de nos contenus.
              </p>
              <p>
                Nous collaborons également avec des contributeurs externes, experts reconnus dans leurs domaines 
                respectifs : cybersécurité, blockchain, data science, design thinking et entrepreneuriat digital. 
                Cette diversité de profils nous permet d'offrir des perspectives variées et enrichissantes.
              </p>
              <p className="text-[#C69C6D] font-medium italic">
                Ensemble, nous construisons le média tech francophone de référence, une tasse de café à la fois. ☕
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}