import { Code, Layers, Rocket, CheckCircle, ArrowRight, Globe, Smartphone, Database } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";

export function DeveloppementWeb() {
  return (
    <div className="bg-white">
      {/* SEO */}
      <SEOHead 
        title="Développement Web - Création Sites & Applications | Numcafé"
        description="Expert en développement web moderne : création de sites web, applications React, bonnes pratiques développement et services de développement front-end & back-end."
        keywords="développement web, création site web, React, frameworks JavaScript, développement front-end, développement back-end, applications web, TypeScript, Node.js"
        canonical="https://numcafe.com/developpement-web"
        url="https://numcafe.com/developpement-web"
      />
      <StructuredData type="webpage" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-[#C69C6D] rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#C69C6D] rounded-2xl -rotate-12"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Code className="w-12 h-12 text-[#C69C6D]" />
            <Layers className="w-8 h-8 text-[#C69C6D]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D1D1D] text-center mb-6 leading-tight">
            Développement web moderne & performant
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Découvrez nos contenus sur le développement web : tutoriels, frameworks modernes, bonnes pratiques et services de création de sites web sur mesure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/blog?category=D%C3%A9veloppement%20Web"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105"
            >
              Nos tutoriels dev
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1D] text-white rounded-xl hover:bg-[#2D2D2D] transition-all shadow-lg hover:scale-105"
            >
              Démarrer un projet
              <Rocket className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* What We Cover Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1D] mb-4">
              Ce que nous couvrons en développement web
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Des articles techniques et tutoriels pour maîtriser les technologies web modernes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Code className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Frameworks JavaScript
              </h3>
              <p className="text-gray-600 text-sm">
                React, Vue, Angular, Next.js : guides complets et comparatifs des frameworks front-end modernes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Layers className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                TypeScript & langages
              </h3>
              <p className="text-gray-600 text-sm">
                Maîtrisez TypeScript, JavaScript ES6+, et les meilleures pratiques de programmation moderne.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Database className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Backend & bases de données
              </h3>
              <p className="text-gray-600 text-sm">
                Node.js, API REST, GraphQL, MongoDB, PostgreSQL et architecture serveur moderne.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Smartphone className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Responsive & mobile-first
              </h3>
              <p className="text-gray-600 text-sm">
                Design responsive, Tailwind CSS, et approches mobile-first pour des expériences optimales.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Rocket className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Performance & optimisation
              </h3>
              <p className="text-gray-600 text-sm">
                Techniques d'optimisation, lazy loading, SEO technique et Core Web Vitals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#C69C6D] transition-all">
              <Globe className="w-10 h-10 text-[#C69C6D] mb-4" />
              <h3 className="text-lg font-semibold text-[#1D1D1D] mb-2">
                Deployment & DevOps
              </h3>
              <p className="text-gray-600 text-sm">
                CI/CD, hébergement cloud, Vercel, Netlify, Docker et bonnes pratiques de déploiement.
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
              Nos services de développement web
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Solutions web sur mesure pour propulser votre présence digitale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Création de sites web
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Sites vitrine, portfolios et landing pages performants avec design moderne et responsive.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Design sur mesure et responsive</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Optimisation SEO intégrée</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Performance et temps de chargement optimaux</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Applications web complexes
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Développement d'applications React/Next.js avec architecture moderne et scalable.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Applications SaaS et dashboards</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Intégration API et services tiers</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Architecture frontend moderne (React, TypeScript)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Développement backend & API
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Architecture serveur, API REST/GraphQL et intégration de bases de données.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>API Node.js sécurisées et performantes</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Bases de données SQL/NoSQL (PostgreSQL, MongoDB)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Authentication et gestion des utilisateurs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#C69C6D]/30 hover:border-[#C69C6D] transition-all shadow-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-[#C69C6D]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1D] mb-3">
                    Maintenance & évolution
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Support technique, optimisation continue et évolution de vos applications existantes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Maintenance corrective et évolutive</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Optimisation des performances</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#C69C6D] mt-0.5 flex-shrink-0" />
                      <span>Migration vers nouvelles technologies</span>
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
            Un projet web en tête ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons de votre projet et créons ensemble une solution web moderne et performante.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-xl hover:bg-[#B88C5D] transition-all shadow-lg hover:scale-105"
            >
              Démarrer votre projet
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D1D1D] rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              Lire nos tutoriels dev
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}