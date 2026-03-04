import { Share2, Users, TrendingUp, CheckCircle, ArrowRight, Heart, MessageCircle, Instagram } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";

export function ReseauxSociaux() {
  return (
    <div className="bg-white">
      <SEOHead 
        title="Réseaux Sociaux - Stratégies Social Media & Community Management | Numcafé"
        description="Découvrez nos conseils sur les réseaux sociaux : stratégies social media, community management, tendances virales et bonnes pratiques pour optimiser votre présence en ligne."
        keywords="réseaux sociaux, social media, community management, stratégies réseaux sociaux, marketing social media, Instagram, TikTok, LinkedIn, tendances virales"
        canonical="https://numcafe.com/reseaux-sociaux"
        url="https://numcafe.com/reseaux-sociaux"
      />
      <StructuredData type="webpage" />

      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#C69C6D] rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C69C6D] rounded-2xl rotate-12"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Share2 className="w-12 h-12 text-[#C69C6D]" />
            <Users className="w-8 h-8 text-[#C69C6D]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] text-center mb-6 leading-tight">
            Réseaux sociaux & stratégies social media
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Maîtrisez les réseaux sociaux avec Numcafé : stratégies social media, community management, tendances virales et conseils pour développer votre présence en ligne.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="/blog?category=R%C3%A9seaux%20sociaux" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105"
            >
              Nos articles réseaux sociaux
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1D] text-white rounded-xl hover:bg-[#2D2D2D] transition-all shadow-lg hover:scale-105"
            >
              Demander conseil
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Ce que nous abordons sur les réseaux sociaux
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Guides complets et stratégies pour optimiser votre présence sur les réseaux sociaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Instagram className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Stratégies Instagram & TikTok
              </h3>
              <p className="text-gray-600 text-sm">
                Créez du contenu viral, augmentez votre engagement et développez votre communauté sur Instagram et TikTok.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Users className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Community management
              </h3>
              <p className="text-gray-600 text-sm">
                Animez votre communauté, gérez les interactions et créez une relation de confiance avec votre audience.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <TrendingUp className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Tendances virales
              </h3>
              <p className="text-gray-600 text-sm">
                Suivez les dernières tendances social media pour créer du contenu qui capte l'attention et génère de l'engagement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Heart className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Création de contenu engageant
              </h3>
              <p className="text-gray-600 text-sm">
                Techniques et astuces pour créer des posts, reels et stories qui génèrent likes, commentaires et partages.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Share2 className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Marketing d'influence
              </h3>
              <p className="text-gray-600 text-sm">
                Collaborez avec des influenceurs et développez des partenariats stratégiques pour amplifier votre portée.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <MessageCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                LinkedIn & professionnel
              </h3>
              <p className="text-gray-600 text-sm">
                Optimisez votre présence professionnelle sur LinkedIn et développez votre personal branding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#FFF8F0] to-[#FFFBF5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Pourquoi maîtriser les réseaux sociaux avec Numcafé ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <CheckCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                Conseils pratiques & applicables
              </h3>
              <p className="text-gray-600 text-sm">
                Des stratégies concrètes que vous pouvez appliquer immédiatement pour améliorer votre présence social media.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <CheckCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                Tendances à jour
              </h3>
              <p className="text-gray-600 text-sm">
                Restez informé des dernières tendances et mises à jour des algorithmes pour maximiser votre reach.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <CheckCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                Stratégies multi-plateformes
              </h3>
              <p className="text-gray-600 text-sm">
                Apprenez à adapter votre contenu pour chaque réseau social et maximiser votre impact global.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#1D1D1D] to-[#2D2D2D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Prêt à booster votre présence sur les réseaux sociaux ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Explorez nos articles et guides pour développer une stratégie social media efficace et engageante.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="/blog?category=R%C3%A9seaux%20sociaux" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105"
            >
              Découvrir nos articles
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D1D1D] rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              Demander un accompagnement
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
