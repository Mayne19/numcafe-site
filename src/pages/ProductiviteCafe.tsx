import { TrendingUp, Coffee, Clock, CheckCircle, ArrowRight, Zap, Target, Brain } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";

export function ProductiviteCafe() {
  return (
    <div className="bg-white">
      <SEOHead 
        title="Productivité & Café - Outils & Méthodes d'Efficacité | Numcafé"
        description="Boostez votre productivité avec nos guides : outils digitaux, méthodes d'organisation, gestion du temps et astuces pour travailler mieux tout en savourant votre café."
        keywords="productivité, outils productivité, gestion du temps, organisation travail, efficacité professionnelle, méthodes agiles, café et productivité, workspace"
        canonical="https://numcafe.com/productivite-cafe"
        url="https://numcafe.com/productivite-cafe"
      />
      <StructuredData type="webpage" />

      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-[#C69C6D] rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#C69C6D] rounded-2xl -rotate-12"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <TrendingUp className="w-12 h-12 text-[#C69C6D]" />
            <Coffee className="w-10 h-10 text-[#C69C6D]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] text-center mb-6 leading-tight">
            Productivité & café
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Découvrez nos méthodes, outils et astuces pour booster votre efficacité professionnelle — tout en savourant votre café quotidien.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/blog?category=Productivit%C3%A9%20%26%20Caf%C3%A9" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105">
              Nos guides productivité
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1D] text-white rounded-xl hover:bg-[#2D2D2D] transition-all shadow-lg hover:scale-105">
              Optimiser mon workflow
              <Zap className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Ce que nous abordons en productivité
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Contenus pratiques pour optimiser votre temps et travailler plus efficacement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Zap className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Outils de productivité
              </h3>
              <p className="text-gray-600 text-sm">
                Notion, Trello, Asana, ClickUp et autres outils digitaux pour organiser votre travail efficacement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Clock className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Gestion du temps
              </h3>
              <p className="text-gray-600 text-sm">
                Techniques Pomodoro, time-blocking, priorisation et méthodes pour maîtriser votre agenda.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Target className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Organisation & méthodes
              </h3>
              <p className="text-gray-600 text-sm">
                GTD, Agile, Kanban, OKR et frameworks d'organisation pour structurer votre travail.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Brain className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Focus & concentration
              </h3>
              <p className="text-gray-600 text-sm">
                Techniques de deep work, élimination des distractions et optimisation de votre espace de travail.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <TrendingUp className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Automatisation & workflows
              </h3>
              <p className="text-gray-600 text-sm">
                Zapier, Make, scripts et automatisations pour gagner du temps sur les tâches répétitives.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Coffee className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Workspace & café
              </h3>
              <p className="text-gray-600 text-sm">
                Aménagement d'espace de travail, rituels café et équilibre vie pro-perso pour mieux travailler.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#FFF8F0] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Nos services en productivité
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Accompagnement pour optimiser vos processus et maximiser votre efficacité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Audit de productivité
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Analyse de vos processus et identification des points d'amélioration pour gagner en efficacité.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Analyse de vos workflows actuels</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Identification des tâches chronophages</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Recommandations d'optimisation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Mise en place d'outils
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Configuration et déploiement d'outils de productivité adaptés à vos besoins.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Setup Notion, Trello, Asana personnalisés</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Templates et structures sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Intégration avec vos outils existants</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Automatisation de workflows
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Création d'automatisations pour éliminer les tâches répétitives et gagner du temps.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Automatisations Zapier / Make / n8n</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Scripts personnalisés pour vos besoins</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Synchronisation multi-outils</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Coaching productivité
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Accompagnement personnalisé pour adopter les meilleures méthodes et habitudes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Sessions de coaching individuel ou équipe</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Formation aux méthodes agiles</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Suivi et ajustements personnalisés</span>
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
            Prêt à booster votre productivité ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons de vos défis et mettons en place des solutions concrètes pour travailler plus efficacement.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105">
              Optimiser mon workflow
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D1D1D] rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105">
              Lire nos guides productivité
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}