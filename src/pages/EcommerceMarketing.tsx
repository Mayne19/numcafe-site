import { ShoppingCart, TrendingUp, Target, CheckCircle, ArrowRight, BarChart, DollarSign, MessageCircle } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";

export function EcommerceMarketing() {
  return (
    <div className="bg-white">
      <SEOHead 
        title="E-commerce & Marketing Digital - Stratégies de Vente en Ligne & Publicité | Numcafé"
        description="Découvrez nos conseils en e-commerce et marketing digital : stratégies de conversion, publicité en ligne, optimisation de boutiques et techniques pour booster vos ventes."
        keywords="e-commerce, marketing digital, vente en ligne, publicité digitale, conversion, Shopify, WooCommerce, Google Ads, Facebook Ads, tunnel de vente"
        canonical="https://numcafe.com/ecommerce-marketing"
        url="https://numcafe.com/ecommerce-marketing"
      />
      <StructuredData type="webpage" />

      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#C69C6D] rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C69C6D] rounded-2xl rotate-12"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <ShoppingCart className="w-12 h-12 text-[#C69C6D]" />
            <TrendingUp className="w-8 h-8 text-[#C69C6D]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] text-center mb-6 leading-tight">
            E-commerce & marketing digital
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Maîtrisez l'e-commerce avec Numcafé : stratégies de vente en ligne, publicité digitale, optimisation des conversions et techniques pour développer votre activité commerciale.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="/blog?category=E-commerce%20%26%20Marketing%20Digital" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105"
            >
              Nos articles e-commerce
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
              Ce que nous abordons en e-commerce & marketing
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Guides complets et stratégies pour développer votre activité e-commerce et maximiser vos ventes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <ShoppingCart className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Plateformes e-commerce
              </h3>
              <p className="text-gray-600 text-sm">
                Comparaisons Shopify, WooCommerce, PrestaShop et conseils pour choisir la meilleure plateforme selon vos besoins.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Target className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Optimisation des conversions
              </h3>
              <p className="text-gray-600 text-sm">
                Techniques pour transformer vos visiteurs en clients : tunnel de vente, UX, fiches produits et checkout optimisé.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <TrendingUp className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Google Ads & Facebook Ads
              </h3>
              <p className="text-gray-600 text-sm">
                Maîtrisez la publicité digitale pour générer du trafic qualifié et maximiser votre retour sur investissement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <DollarSign className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Stratégies de pricing
              </h3>
              <p className="text-gray-600 text-sm">
                Définissez vos prix, créez des promotions efficaces et utilisez la psychologie des prix pour augmenter vos ventes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <BarChart className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Analytics & performances
              </h3>
              <p className="text-gray-600 text-sm">
                Suivez vos KPIs, analysez vos données et prenez des décisions basées sur les chiffres pour optimiser vos résultats.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <MessageCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Email marketing & automation
              </h3>
              <p className="text-gray-600 text-sm">
                Créez des campagnes emails performantes, récupérez les paniers abandonnés et fidélisez vos clients automatiquement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#FFF8F0] to-[#FFFBF5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Pourquoi développer votre e-commerce avec Numcafé ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <CheckCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                Stratégies actionnables immédiatement
              </h3>
              <p className="text-gray-600 text-sm">
                Des conseils pratiques que vous pouvez appliquer dès aujourd'hui pour améliorer vos performances de vente.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <CheckCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                Comparatifs et benchmarks
              </h3>
              <p className="text-gray-600 text-sm">
                Des analyses détaillées des outils et plateformes pour vous aider à faire les meilleurs choix pour votre business.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <CheckCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-3">
                ROI et performances mesurables
              </h3>
              <p className="text-gray-600 text-sm">
                Focus sur les résultats concrets : taux de conversion, panier moyen, ROI publicitaire et croissance du chiffre d'affaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#1D1D1D] to-[#2D2D2D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingCart className="w-16 h-16 text-[#C69C6D] mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Prêt à développer votre activité e-commerce ?
          </h2>
          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
            Découvrez nos articles détaillés sur l'e-commerce et le marketing digital pour booster vos ventes en ligne.
          </p>
          <a 
            href="/blog?category=E-commerce%20%26%20Marketing%20Digital" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105 text-base"
          >
            Explorer nos articles e-commerce
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
