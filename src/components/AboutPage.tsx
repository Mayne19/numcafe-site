import { Coffee, Target, Users, TrendingUp, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import coffeeBullet from "figma:asset/6344bb84b68e22c4c443ddb47f5bb06ee02ab43f.png";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1D1D1D] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="mb-4">À propos de Numcafé</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Le média digital qui vous accompagne dans la compréhension du monde numérique
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#C69C6D', color: '#FFFFFF' }}>
                <Coffee className="w-5 h-5" />
                <span>Notre Mission</span>
              </div>
              <h2 className="mb-6">Décrypter le digital avec clarté et passion</h2>
              <p className="text-lg text-gray-600 mb-6">
                Numcafé est né d'une conviction simple : l'information tech doit être accessible, 
                claire et inspirante. Comme un bon café qui stimule l'esprit, nos contenus vous 
                donnent l'énergie et les connaissances pour naviguer dans le monde numérique.
              </p>
              <p className="text-lg text-gray-600">
                Nous croyons que la technologie façonne notre avenir, et que chacun devrait 
                pouvoir comprendre ces transformations pour en saisir les opportunités.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1549482219-7ee3849dfc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd29ya3NwYWNlJTIwbGFwdG9wJTIwY29mZmVlJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3MTAxNTMxOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Numcafé workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* L'auteur */}
      <section id="auteur" className="py-20 bg-[#FFF8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="mb-4">L'auteur</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-[#E8DCCB]">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] flex items-center justify-center text-white shadow-lg">
                  <User className="w-10 h-10" />
                </div>
              </div>
              
              {/* Author Info */}
              <div className="flex-1">
                <h3 className="mb-2 text-[#1D1D1D]">Sophie Martin</h3>
                <p className="text-sm text-[#C69C6D] mb-4 font-medium">Rédactrice en chef & Fondatrice de Numcafé</p>
                
                <div className="space-y-3 text-gray-600">
                  <p>
                    Passionnée par la tech et le digital depuis plus de 10 ans, Sophie a fondé Numcafé avec 
                    l'ambition de démocratiser l'information technologique. Diplômée en communication digitale 
                    et forte d'une expérience en rédaction web, elle explore au quotidien les innovations 
                    qui transforment notre société.
                  </p>
                  <p>
                    À travers Numcafé, Sophie partage sa vision d'un numérique accessible à tous, où la 
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

      {/* Valeurs */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nos valeurs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des principes qui guident notre approche éditoriale et notre engagement 
              envers notre communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-[#C69C6D]/10 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8" style={{ color: '#C69C6D' }} />
              </div>
              <h3 className="mb-4">Clarté</h3>
              <p className="text-gray-600">
                Nous rendons la tech accessible en expliquant les concepts complexes avec des mots simples, 
                sans jargon inutile.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-[#C69C6D]/10 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8" style={{ color: '#C69C6D' }} />
              </div>
              <h3 className="mb-4">Pertinence</h3>
              <p className="text-gray-600">
                Nous sélectionnons les sujets qui comptent vraiment et qui auront un impact 
                sur votre vie professionnelle et personnelle.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-[#C69C6D]/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" style={{ color: '#C69C6D' }} />
              </div>
              <h3 className="mb-4">Communauté</h3>
              <p className="text-gray-600">
                Nous créons un espace de partage et d'échange pour les passionnés de tech 
                et les curieux du numérique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que nous couvrons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4">Ce que nous couvrons</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trois grands axes pour vous tenir informé des évolutions du monde numérique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 pl-6" style={{ borderColor: '#C69C6D' }}>
              <h3 className="mb-3">Actualité numérique</h3>
              <p className="text-gray-600 mb-4">
                Les dernières news tech, les innovations, les lancements de produits et les 
                tendances qui façonnent l'industrie.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Startups et scale-ups</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Cybersécurité</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Design et UX</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: '#C69C6D' }}>
              <h3 className="mb-3">IA & Futur</h3>
              <p className="text-gray-600 mb-4">
                L'intelligence artificielle, les technologies émergentes et les innovations 
                qui dessinent notre avenir.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>IA générative</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Web3 et blockchain</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Technologies quantiques</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: '#C69C6D' }}>
              <h3 className="mb-3">Café du jour</h3>
              <p className="text-gray-600 mb-4">
                Nos réflexions sur le travail, l'entrepreneuriat et la productivité à 
                l'ère du numérique.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Remote work</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Productivité et outils</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Culture d'entreprise</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1D1D1D] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Coffee className="w-16 h-16 mx-auto mb-6" style={{ color: '#C69C6D' }} />
          <h2 className="mb-6">Rejoignez la communauté Numcafé</h2>
          <p className="text-xl text-gray-300 mb-8">
            Ne manquez aucun article. Recevez notre newsletter hebdomadaire avec le meilleur 
            de l'actualité numérique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-6 py-3 rounded-full text-[#1D1D1D] focus:outline-none"
            />
            <button className="px-8 py-3 bg-[#C69C6D] rounded-full hover:bg-[#b08a5d] transition-colors whitespace-nowrap">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}