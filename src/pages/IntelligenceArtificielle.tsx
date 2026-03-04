import { Cpu, Sparkles, Target, CheckCircle, ArrowRight, Brain, Zap, MessageCircle } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";

export function IntelligenceArtificielle() {
  return (
    <div className="bg-white">
      {/* SEO */}
      <SEOHead 
        title="Intelligence Artificielle - Expertise IA & Solutions ChatGPT | Numcafé"
        description="Découvrez notre expertise en intelligence artificielle : articles IA, guides ChatGPT, outils IA gratuits et services d'automatisation intelligente pour votre entreprise."
        keywords="intelligence artificielle, ChatGPT, outils IA gratuits, automatisation IA, expertise IA, solutions IA entreprise, guides IA, tendances IA 2025"
        canonical="https://numcafe.com/intelligence-artificielle"
        url="https://numcafe.com/intelligence-artificielle"
      />
      <StructuredData type="webpage" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0] py-20 lg:py-28 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#C69C6D] rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C69C6D] rounded-2xl rotate-12"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Cpu className="w-12 h-12 text-[#C69C6D]" />
            <Sparkles className="w-8 h-8 text-[#C69C6D]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] text-center mb-6 leading-tight">
            Intelligence artificielle & automatisation
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Découvrez l'univers de l'IA avec Numcafé : articles experts, guides pratiques ChatGPT et solutions d'automatisation pour transformer votre activité digitale.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/blog?category=Intelligence%20Artificielle"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105"
            >
              Nos articles IA
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1D] text-white rounded-xl hover:bg-[#2D2D2D] transition-all shadow-lg hover:scale-105"
            >
              Demander un devis
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* What We Cover Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Ce que nous abordons en IA
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Des contenus complets pour maîtriser l'intelligence artificielle et ses applications concrètes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Topic 1 */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Brain className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                ChatGPT & assistants IA
              </h3>
              <p className="text-gray-600 text-sm">
                Guides complets, prompts efficaces et bonnes pratiques pour exploiter ChatGPT et autres assistants conversationnels.
              </p>
            </div>

            {/* Topic 2 */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Zap className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Outils IA gratuits
              </h3>
              <p className="text-gray-600 text-sm">
                Sélection et tests d'outils IA accessibles : génération d'images, rédaction, analyse de données et plus encore.
              </p>
            </div>

            {/* Topic 3 */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Target className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Automatisation intelligente
              </h3>
              <p className="text-gray-600 text-sm">
                Stratégies et workflows pour automatiser vos tâches avec l'IA : marketing, productivité, service client.
              </p>
            </div>

            {/* Topic 4 */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <CheckCircle className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Actualités IA
              </h3>
              <p className="text-gray-600 text-sm">
                Veille technologique sur les dernières innovations en intelligence artificielle et leurs impacts business.
              </p>
            </div>

            {/* Topic 5 */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Sparkles className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                IA générative
              </h3>
              <p className="text-gray-600 text-sm">
                Explorez Midjourney, DALL-E, Stable Diffusion et autres outils de génération créative par IA.
              </p>
            </div>

            {/* Topic 6 */}
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Cpu className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Machine Learning
              </h3>
              <p className="text-gray-600 text-sm">
                Introduction au ML, frameworks populaires et applications pratiques pour les développeurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#FFF8F0] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Nos services en intelligence artificielle
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Accompagnement expert pour intégrer l'IA dans votre stratégie digitale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Conseil & stratégie IA
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Audit de vos processus, identification des opportunités d'automatisation et élaboration d'une stratégie IA sur mesure.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Analyse de vos besoins et processus métier</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Roadmap d'implémentation IA personnalisée</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Formation de vos équipes aux outils IA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Automatisation & chatbots
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Développement de chatbots intelligents et workflows d'automatisation pour optimiser votre productivité.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Chatbots customer service & support client</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Automatisation marketing & lead generation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Intégration d'API IA (OpenAI, Anthropic...)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Solutions IA personnalisées
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Développement d'outils IA sur mesure adaptés à vos besoins spécifiques et votre secteur d'activité.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Analyse de données & business intelligence</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Génération de contenu automatisée</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Modèles ML personnalisés pour votre secteur</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Formation & accompagnement
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Sessions de formation pratiques pour maîtriser ChatGPT, les outils IA et les bonnes pratiques d'automatisation.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Ateliers ChatGPT & prompt engineering</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Formation outils IA pour votre équipe</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Support continu & mise à jour des compétences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1D1D1D] to-[#2D2D2D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Prêt à intégrer l'IA dans votre stratégie ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons de vos besoins en intelligence artificielle et élaborons ensemble une solution adaptée.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D1D1D] rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              Lire nos articles IA
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}