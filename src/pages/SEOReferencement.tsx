import { Search, TrendingUp, Target, CheckCircle, ArrowRight, BarChart, Globe, FileText } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";

export function SEOReferencement() {
  return (
    <div className="bg-white">
      <SEOHead 
        title="SEO & Référencement Naturel - Stratégie & Services | Numcafé"
        description="Expertise en SEO et référencement naturel : guides complets, stratégies de visibilité Google, optimisation on-page/off-page et services SEO professionnels."
        keywords="SEO, référencement naturel, optimisation Google, stratégie SEO, visibilité web, référencement local, backlinks, mots-clés, audit SEO"
        canonical="https://numcafe.com/seo-referencement"
        url="https://numcafe.com/seo-referencement"
      />
      <StructuredData type="webpage" />

      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-[#C69C6D] rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#C69C6D] rounded-2xl -rotate-12"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Search className="w-12 h-12 text-[#C69C6D]" />
            <TrendingUp className="w-8 h-8 text-[#C69C6D]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] text-center mb-6 leading-tight">
            SEO & référencement naturel
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Maîtrisez le référencement naturel avec nos guides SEO, stratégies de visibilité Google et services d'optimisation pour dominer les résultats de recherche.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/blog?category=SEO%20%26%20R%C3%A9f%C3%A9rencement" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105">
              Nos guides SEO
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1D] text-white rounded-xl hover:bg-[#2D2D2D] transition-all shadow-lg hover:scale-105">
              Audit SEO gratuit
              <Target className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Ce que nous couvrons en SEO
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Contenus experts pour optimiser votre visibilité sur Google et générer du trafic qualifié.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <FileText className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                SEO on-page
              </h3>
              <p className="text-gray-600 text-sm">
                Optimisation de contenu, balises meta, structure HTML, mots-clés et rédaction SEO-friendly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Globe className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                SEO technique
              </h3>
              <p className="text-gray-600 text-sm">
                Performance, Core Web Vitals, crawlabilité, sitemap XML et optimisation de la structure technique.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Target className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                SEO off-page & netlinking
              </h3>
              <p className="text-gray-600 text-sm">
                Stratégies de backlinks, autorité de domaine, link building et partenariats SEO.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <BarChart className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Analyse & suivi
              </h3>
              <p className="text-gray-600 text-sm">
                Google Analytics, Search Console, outils SEO et reporting de performance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Search className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Recherche de mots-clés
              </h3>
              <p className="text-gray-600 text-sm">
                Stratégies de ciblage, longue traîne, intention de recherche et analyse concurrentielle.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <TrendingUp className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                SEO local
              </h3>
              <p className="text-gray-600 text-sm">
                Google My Business, citations locales et stratégies de référencement géolocalisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#FFF8F0] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Nos services SEO
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Solutions SEO complètes pour booster votre visibilité et attirer plus de clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Audit SEO complet
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Analyse approfondie de votre site : technique, contenu, backlinks et recommandations priorisées.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Audit technique complet (200+ points)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Analyse de la concurrence SEO</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Plan d'action détaillé et priorisé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Optimisation on-page
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Optimisation de vos pages pour le référencement : contenu, balises, structure et UX.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Optimisation des balises title, meta et Hn</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Rédaction et optimisation de contenu SEO</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Amélioration du maillage interne</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Stratégie de netlinking
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Acquisition de backlinks de qualité pour renforcer votre autorité et votre positionnement.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Analyse de profil de backlinks</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Campagnes de link building éthiques</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Suivi et désaveu de liens toxiques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Suivi & reporting SEO
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Monitoring continu de vos performances SEO avec rapports détaillés et recommandations.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Suivi des positions et du trafic organique</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Rapports mensuels personnalisés</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Optimisations continues basées sur la data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#1D1D1D] to-[#2D2D2D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Prêt à booster votre visibilité sur Google ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Obtenez un audit SEO gratuit et découvrez comment améliorer votre référencement naturel.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105">
              Demander un audit SEO
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D1D1D] rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105">
              Lire nos guides SEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}