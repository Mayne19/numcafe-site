import { useState, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Eye, User, Users, TrendingUp, Calendar } from 'lucide-react';
import { articles, getCategoryColor } from '../data/articles';
import { authors, getAuthor } from '../data/authors';
import { SEOHead } from '../components/SEOHead';

export function AuthorArticles() {
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const ARTICLES_PER_PAGE = 21; // 7 lignes × 3 colonnes
  
  // Récupérer l'auteur depuis le slug
  const currentAuthor = getAuthor(authorSlug || '');
  
  // Si l'auteur n'existe pas, rediriger vers la page 404
  if (!currentAuthor) {
    return <Navigate to="/404" replace />;
  }
  
  // État pour la pagination et le tri
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'views' | 'date'>('views'); // Par défaut par vues
  
  // Simuler les vues pour chaque article (en production, ça viendrait d'une base de données)
  const [articleViews] = useState<Record<number, number>>(() => {
    const views: Record<number, number> = {};
    articles.forEach(article => {
      // Générer un nombre aléatoire de vues pour la démo (entre 1000 et 10000)
      views[article.id] = Math.floor(Math.random() * 9000) + 1000;
    });
    return views;
  });

  // Filtrer et trier les articles de l'auteur
  const sortedArticles = useMemo(() => {
    const filteredArticles = articles
      .filter(article => article.author === currentAuthor.name)
      .map(article => ({
        ...article,
        views: articleViews[article.id] || 0
      }));

    // Trier selon le critère sélectionné
    if (sortBy === 'views') {
      return filteredArticles.sort((a, b) => b.views - a.views);
    } else {
      return filteredArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [articleViews, sortBy, currentAuthor.name]);

  // Calculer les auteurs avec leur nombre d'articles (excluant l'auteur actuel)
  const otherAuthors = useMemo(() => {
    return authors
      .filter(author => author.slug !== currentAuthor.slug) // Exclure l'auteur actuel
      .map(author => ({
        ...author,
        articlesCount: articles.filter(article => article.author === author.name).length
      }))
      .sort((a, b) => b.articlesCount - a.articlesCount); // Trier par nombre d'articles
  }, [currentAuthor.slug]);

  // Pagination
  const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = sortedArticles.slice(startIndex, endIndex);

  const totalViews = sortedArticles.reduce((sum, article) => sum + article.views, 0);

  // Réinitialiser la page lors du changement de tri
  const handleSortChange = (newSort: 'views' | 'date') => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <>
      <SEOHead 
        title={`Articles de ${currentAuthor.name} - Numcafé`}
        description={`Découvrez tous les articles rédigés par ${currentAuthor.name} sur Numcafé. ${sortedArticles.length} articles publiés avec ${formatViews(totalViews)} vues au total.`}
      />

      <div className="min-h-screen bg-[#FAFAFA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-[#C69C6D] hover:text-[#B88C5D] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Retour au blog</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#C69C6D] flex items-center justify-center text-white">
                <User size={40} className="sm:hidden" strokeWidth={2.5} />
                <User size={48} className="hidden sm:block" strokeWidth={2.5} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', lineHeight: '1.3', color: '#1D1D1D', marginBottom: '0.5rem' }}>
                  Articles de {currentAuthor.name}
                </h1>
                <p className="text-gray-600 text-lg">
                  {sortedArticles.length} article{sortedArticles.length > 1 ? 's' : ''} publié{sortedArticles.length > 1 ? 's' : ''} • {formatViews(totalViews)} vues au total
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-lg max-w-3xl leading-relaxed">
              {currentAuthor.bio}
            </p>
          </div>

          {/* Main content with sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Articles grid */}
            <div className="flex-1">
              
              {/* Filtres de tri */}
              <div className="mb-6 flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Trier par :</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange('views')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      sortBy === 'views'
                        ? 'bg-[#C69C6D] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <TrendingUp size={16} />
                    <span>Plus de vues</span>
                  </button>
                  <button
                    onClick={() => handleSortChange('date')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      sortBy === 'date'
                        ? 'bg-[#C69C6D] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Calendar size={16} />
                    <span>Plus récents</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#C69C6D] hover:shadow-lg transition-all group">
                    {/* Image */}
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Catégorie */}
                      <div className="mb-2">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="mb-3">
                        <span className="text-xs text-gray-500">
                          {formatDate(article.date)}
                        </span>
                      </div>

                      <h2 className="text-lg font-semibold text-[#1D1D1D] mb-2 group-hover:text-[#C69C6D] transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Views and read time */}
                      <div className="flex items-center gap-3 text-gray-500 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Eye size={14} />
                          <span className="font-medium">
                            {article.views.toLocaleString('fr-FR')} vues
                          </span>
                        </div>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Empty state */}
              {sortedArticles.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-500 text-lg">
                    Aucun article trouvé pour cet auteur.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    {getPageNumbers().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                            {page}
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as number)}
                          className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all ${
                            page === currentPage
                              ? 'bg-gray-200 text-gray-900'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-6 py-2.5 bg-[#C69C6D] hover:bg-[#B88C5D] text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                      SUIVANT
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - Autres auteurs */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-[#C69C6D]" />
                  <h3 className="font-semibold text-[#1D1D1D]">Autres auteurs</h3>
                </div>

                <div className="space-y-4">
                  {otherAuthors.map((author) => (
                    <Link
                      key={author.slug}
                      to={`/auteur/${author.slug}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#C69C6D]/20 flex items-center justify-center text-[#C69C6D] flex-shrink-0">
                        <User size={20} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#1D1D1D] text-sm mb-0.5 truncate">
                          {author.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {author.role}
                        </p>
                        <p className="text-xs text-gray-400">
                          {author.articlesCount} article{author.articlesCount > 1 ? 's' : ''}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}