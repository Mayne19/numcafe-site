import { Link } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';
import { authors } from '../data/authors';
import { articles } from '../data/articles';
import { SEOHead } from '../components/SEOHead';

export function Authors() {
  // Calculer le nombre d'articles par auteur
  const authorsWithCount = authors.map(author => {
    const articleCount = articles.filter(article => article.author === author.name).length;
    return {
      ...author,
      articlesCount: articleCount
    };
  }).sort((a, b) => b.articlesCount - a.articlesCount); // Trier par nombre d'articles décroissant

  return (
    <>
      <SEOHead 
        title="Auteurs - Numcafé"
        description="Découvrez l'équipe talentueuse derrière Numcafé : experts en IA, SEO, design et développement web qui partagent leur expertise et passion pour le digital."
      />

      <div className="min-h-screen bg-[#FAFAFA] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 style={{ fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.2', color: '#1D1D1D', marginBottom: '1rem' }}>
              Nos auteurs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Découvrez les experts passionnés qui partagent leur expertise et leur vision du digital, de la tech et de l'innovation.
            </p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {authorsWithCount.map((author) => (
              <Link
                key={author.slug}
                to={`/auteur/${author.slug}`}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-[#C69C6D] hover:shadow-lg transition-all h-full flex flex-col">
                  
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#C69C6D] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <User size={48} strokeWidth={2.5} />
                  </div>

                  {/* Name */}
                  <h2 className="text-xl font-semibold text-[#1D1D1D] text-center mb-2 group-hover:text-[#C69C6D] transition-colors">
                    {author.name}
                  </h2>

                  {/* Role */}
                  <p className="text-sm font-medium text-[#C69C6D] text-center mb-4">
                    {author.role}
                  </p>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 text-center leading-relaxed mb-6 flex-1">
                    {author.bio}
                  </p>

                  {/* Article Count */}
                  <div className="flex items-center justify-center gap-2 text-gray-500 pt-4 border-t border-gray-100">
                    <BookOpen size={18} />
                    <span className="text-sm font-medium">
                      {author.articlesCount} article{author.articlesCount > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69C6D] hover:bg-[#B88C5D] text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <BookOpen size={20} />
              <span>Découvrir tous les articles</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
