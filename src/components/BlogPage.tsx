import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { articles } from '../data/articles';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BlogPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFilter);

  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  const categories = Array.from(new Set(articles.map(a => a.category)));

  const filteredArticles = articles.filter(article => {
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#1D1D1D] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="mb-4">Blog Numcafé</h1>
          <p className="text-xl text-gray-300">
            Découvrez nos analyses, décryptages et réflexions sur le monde du numérique
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles principale */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#C69C6D]"
                />
              </div>
            </div>

            <div className="space-y-8">
              {filteredArticles.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <p className="text-gray-500">Aucun article trouvé pour cette recherche.</p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <article 
                    key={article.id} 
                    className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="md:flex">
                      <Link to={`/article/${article.slug}`} className="md:w-2/5">
                        <div className="aspect-[16/10] md:h-full overflow-hidden">
                          <ImageWithFallback
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      
                      <div className="p-6 md:w-3/5">
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
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                        
                        <Link to={`/article/${article.slug}`}>
                          <h3 className="mb-3 hover:text-[#C69C6D] transition-colors">
                            {article.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-4">
                          {article.excerpt}
                        </p>
                        
                        <Link 
                          to={`/article/${article.slug}`}
                          className="inline-flex items-center gap-2 text-[#C69C6D] hover:gap-3 transition-all"
                        >
                          Lire la suite
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Catégories */}
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5" style={{ color: '#C69C6D' }} />
                  <h4>Catégories</h4>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      !selectedCategory 
                        ? 'bg-[#C69C6D] text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Tous les articles
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category 
                          ? 'bg-[#C69C6D] text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[#1D1D1D] text-white rounded-2xl p-6">
                <h4 className="mb-3">Newsletter</h4>
                <p className="text-gray-300 mb-4 text-sm">
                  Recevez nos derniers articles directement dans votre boîte mail.
                </p>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-2 rounded-lg mb-3 text-[#1D1D1D] focus:outline-none"
                />
                <button className="w-full px-4 py-2 bg-[#C69C6D] rounded-lg hover:bg-[#b08a5d] transition-colors">
                  S'inscrire
                </button>
              </div>

              {/* Articles populaires */}
              <div className="bg-white rounded-2xl p-6">
                <h4 className="mb-4">Articles populaires</h4>
                <div className="space-y-4">
                  {articles.slice(0, 3).map((article) => (
                    <Link 
                      key={article.id}
                      to={`/article/${article.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm mb-1 line-clamp-2 group-hover:text-[#C69C6D] transition-colors">
                            {article.title}
                          </h5>
                          <span className="text-xs text-gray-500">
                            {new Date(article.date).toLocaleDateString('fr-FR', { 
                              day: 'numeric', 
                              month: 'short'
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
