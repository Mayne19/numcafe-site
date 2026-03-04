import { Palette, Figma, Sparkles, CheckCircle, ArrowRight, Brush, Layout, Eye } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";

export function DesignUX() {
  return (
    <div className="bg-white">
      <SEOHead 
        title="Design UX/UI - Création d'Interfaces & Identité Visuelle | Numcafé"
        description="Expertise en design UX/UI : création d'interfaces, identité visuelle, design system et services de design graphique pour votre marque digitale."
        keywords="design UX, design UI, interface utilisateur, expérience utilisateur, identité visuelle, design graphique, Figma, wireframes, prototypage"
        canonical="https://numcafe.com/design-ux"
        url="https://numcafe.com/design-ux"
      />
      <StructuredData type="webpage" />

      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#C69C6D] rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C69C6D] rounded-2xl rotate-12"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Palette className="w-12 h-12 text-[#C69C6D]" />
            <Brush className="w-8 h-8 text-[#C69C6D]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] text-center mb-6 leading-tight">
            Design UX/UI & identité visuelle
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Découvrez nos contenus sur le design digital : tendances UI/UX, outils de création, guides Figma et services de design sur mesure pour votre marque.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/blog?category=Design%20%26%20UX" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105">
              Nos articles design
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1D] text-white rounded-xl hover:bg-[#2D2D2D] transition-all shadow-lg hover:scale-105">
              Démarrer un projet design
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Ce que nous abordons en design
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Contenus experts pour maîtriser le design digital et créer des expériences utilisateur mémorables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Eye className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                UX & expérience utilisateur
              </h3>
              <p className="text-gray-600 text-sm">
                Principes UX, recherche utilisateur, personas, user flows et architecture de l'information.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Layout className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                UI & interfaces visuelles
              </h3>
              <p className="text-gray-600 text-sm">
                Design d'interfaces modernes, typographie, couleurs, grilles et systèmes de design cohérents.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Figma className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Outils de design
              </h3>
              <p className="text-gray-600 text-sm">
                Maîtrise de Figma, Adobe XD, prototypage interactif et collaboration design-développement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Palette className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Identité visuelle
              </h3>
              <p className="text-gray-600 text-sm">
                Création de logos, chartes graphiques, branding digital et guidelines de marque.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Sparkles className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Tendances & inspirations
              </h3>
              <p className="text-gray-600 text-sm">
                Veille des tendances design, meilleures pratiques et inspiration pour vos créations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Brush className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Illustrations & graphisme
              </h3>
              <p className="text-gray-600 text-sm">
                Techniques d'illustration digitale, iconographie et création de visuels impactants.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#FFF8F0] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Nos services de design UX/UI
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Créations visuelles sur mesure pour une identité digitale forte et cohérente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Identité visuelle & branding
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Création complète de votre identité de marque : logo, charte graphique et guidelines.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Logo unique et déclinaisons</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Charte graphique complète</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Brand guidelines et assets</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Layout className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Design UX/UI de sites & apps
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Conception d'interfaces utilisateur modernes, intuitives et engageantes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Wireframes et maquettes UX</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Design UI haute-fidélité (Figma)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Prototypes interactifs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Audit UX & optimisation
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Analyse de votre interface existante et recommandations d'amélioration UX.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Audit heuristique complet</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Tests utilisateurs et analytics</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Recommandations actionnables</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Design system & composants
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Création de bibliothèques de composants réutilisables pour votre cohérence visuelle.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Composants UI modulaires (Figma)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Documentation design system</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Tokens & variables de design</span>
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
            Prêt à créer une identité visuelle unique ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons de votre vision et créons ensemble un design qui marque les esprits.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105">
              Demander un devis design
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D1D1D] rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105">
              Lire nos articles design
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}