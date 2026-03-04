import { FileText, Eye, Clock, CheckCircle, TrendingUp, Users as UsersIcon } from 'lucide-react';
import { AdminArticle } from '../../data/adminArticles';
import { User } from '../../utils/auth';

interface DashboardProps {
  articles: AdminArticle[];
  currentUser: User;
}

export function Dashboard({ articles, currentUser }: DashboardProps) {
  // Stats
  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === 'published').length,
    draft: articles.filter((a) => a.status === 'draft').length,
    review: articles.filter((a) => a.status === 'review').length,
    scheduled: articles.filter((a) => a.status === 'scheduled').length,
  };

  // Articles récents
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  const statCards = [
    { label: 'Total articles', value: stats.total, icon: FileText, color: 'bg-blue-500' },
    { label: 'Publiés', value: stats.published, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Brouillons', value: stats.draft, icon: Eye, color: 'bg-gray-500' },
    { label: 'En review', value: stats.review, icon: Clock, color: 'bg-orange-500' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      review: 'bg-blue-100 text-blue-700',
      scheduled: 'bg-purple-100 text-purple-700',
      published: 'bg-green-100 text-green-700',
    };
    const labels = {
      draft: 'Brouillon',
      review: 'En review',
      scheduled: 'Planifié',
      published: 'Publié',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl mb-2">Bonjour, {currentUser.name.split(' ')[0]} 👋</h1>
        <p className="text-gray-600">Voici un aperçu de votre activité sur Numcafé</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg">Articles récents</h2>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="divide-y divide-gray-200">
          {recentArticles.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500 text-sm">
              Aucun article pour le moment
            </div>
          ) : (
            recentArticles.map((article) => (
              <div key={article.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-1 truncate">{article.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{article.author_name}</span>
                      <span>•</span>
                      <span>{formatDate(article.updated_at)}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(article.status)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[#C69C6D] to-[#B88C5D] rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <UsersIcon className="w-6 h-6" />
          <h2 className="text-lg">Action rapide</h2>
        </div>
        <p className="mb-4 text-white/90">
          {currentUser.role === 'admin'
            ? 'Gérez votre contenu, publiez des articles, et suivez les performances de votre média.'
            : 'Créez du contenu de qualité et envoyez vos articles en review pour publication.'}
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-[#C69C6D] rounded-lg hover:bg-gray-100 transition-colors text-sm">
            Créer un article
          </button>
          {currentUser.role === 'admin' && (
            <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm">
              Voir les statistiques
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
