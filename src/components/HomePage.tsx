import { ArrowRight, Newspaper, Brain, Coffee, Clock, Calendar } from 'lucide-react';
import { articles } from '../data/articles';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomePage() {
  const latestArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1744725134127-8ad8f63f1831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjb2ZmZWV8ZW58MXx8fHwxNzY0Mzc5NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="NumCafé Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1D]/90 to-[#1D1D1D]/60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="mb-6">
            Votre dose quotidienne<br />
            <span style={{ color: '#C69C6D' }}>d'actualité numérique</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Restez informé sur les dernières tendances tech, l'IA et le futur du digital. 
            Avec Numcafé, prenez de l'avance sur demain.
          </p>
          <a 
            href="/blog" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C69C6D] text-white rounded-full hover:bg-[#b08a5d] transition-all"
          >
            Découvrir les articles
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Présentation courte */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Un média digital moderne pour les passionnés de tech</h2>
            <p className="text-lg text-gray-600">
              Numcafé est votre source d'information privilégiée pour comprendre et anticiper 
              les évolutions du monde numérique. Nous décryptons l'actualité tech avec clarté 
              et expertise, le tout servi avec la chaleur d'un bon café.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Services/Blocs */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Actualité numérique */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#C69C6D]/10 flex items-center justify-center mb-6">
                <Newspaper className="w-7 h-7" style={{ color: '#C69C6D' }} />
              </div>
              <h3 className="mb-4">Actualité numérique</h3>
              <p className="text-gray-600 mb-6">
                Les dernières tendances, innovations et actualités du monde digital décryptées pour vous.
              </p>
              <a 
                href="/blog?category=Actualité numérique" 
                className="inline-flex items-center gap-2 text-[#C69C6D] hover:gap-3 transition-all"
              >
                Voir les articles
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* IA & Futur */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#C69C6D]/10 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7" style={{ color: '#C69C6D' }} />
              </div>
              <h3 className="mb-4">IA & Futur</h3>
              <p className="text-gray-600 mb-6">
                Explorez l'intelligence artificielle et les technologies qui façonnent notre avenir.
              </p>
              <a 
                href="/blog?category=IA & Futur" 
                className="inline-flex items-center gap-2 text-[#C69C6D] hover:gap-3 transition-all"
              >
                Voir les articles
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Café du jour */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#C69C6D]/10 flex items-center justify-center mb-6">
                <Coffee className="w-7 h-7" style={{ color: '#C69C6D' }} />
              </div>
              <h3 className="mb-4">Café du jour</h3>
              <p className="text-gray-600 mb-6">
                Réflexions, conseils et perspectives sur le monde du travail et de l'entrepreneuriat digital.
              </p>
              <a 
                href="/blog?category=Café du jour" 
                className="inline-flex items-center gap-2 text-[#C69C6D] hover:gap-3 transition-all"
              >
                Voir les articles
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Derniers articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2>Derniers articles</h2>
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[#C69C6D] hover:gap-3 transition-all"
            >
              Voir tous les articles
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <a href={`/article/${article.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </a>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <span 
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: '#C69C6D', color: '#FFFFFF' }}
                    >
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <a href={`/article/${article.slug}`}>
                    <h3 className="mb-3 hover:text-[#C69C6D] transition-colors">
                      {article.title}
                    </h3>
                  </a>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 mr-4">
                      {article.readTime}
                    </span>
                    <a 
                      href={`/article/${article.slug}`}
                      className="text-[#1D1D1D] hover:gap-2 inline-flex items-center gap-1 transition-all font-medium"
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}