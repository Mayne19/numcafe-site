import { useState } from 'react';
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  FileText,
  ArrowUpDown,
  Circle,
} from 'lucide-react';
import { AdminArticle, canEditArticle, canDeleteArticle } from '../../data/adminArticles';
import { User } from '../../utils/auth';
import { getScoreColor, getScoreLabel } from '../../data/seoPlugin';

interface EnhancedArticlesTableProps {
  articles: AdminArticle[];
  currentUser: User;
  onEdit: (article: AdminArticle) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: string) => void;
}

type SortField = 'title' | 'updated_at' | 'published_at' | 'status';
type SortOrder = 'asc' | 'desc';

export function EnhancedArticlesTable({
  articles,
  currentUser,
  onEdit,
  onDelete,
  onChangeStatus,
}: EnhancedArticlesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('updated_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Filtrer les articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Trier les articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === 'updated_at') {
      comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    } else if (sortField === 'published_at') {
      const aDate = a.published_at ? new Date(a.published_at).getTime() : 0;
      const bDate = b.published_at ? new Date(b.published_at).getTime() : 0;
      comparison = aDate - bDate;
    } else if (sortField === 'status') {
      comparison = a.status.localeCompare(b.status);
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Badge de statut
  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      review: 'bg-blue-100 text-blue-700',
      scheduled: 'bg-purple-100 text-purple-700',
      published: 'bg-green-100 text-green-700',
    };
    const icons = {
      draft: <FileText className="w-3 h-3" />,
      review: <Eye className="w-3 h-3" />,
      scheduled: <Clock className="w-3 h-3" />,
      published: <CheckCircle className="w-3 h-3" />,
    };
    const labels = {
      draft: 'Brouillon',
      review: 'En review',
      scheduled: 'Planifié',
      published: 'Publié',
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
          styles[status as keyof typeof styles]
        }`}
      >
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  // SEO Score Badge
  const getSEOBadge = (score?: 'green' | 'yellow' | 'orange' | 'red') => {
    if (!score) {
      return (
        <Circle
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
        />
      );
    }
    
    return (
      <Circle
        className="w-5 h-5"
        fill={getScoreColor(score)}
        stroke="none"
        title={getScoreLabel(score)}
      />
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        >
          <option value="all">Tous les statuts</option>
          <option value="draft">Brouillons</option>
          <option value="review">En review</option>
          <option value="scheduled">Planifiés</option>
          <option value="published">Publiés</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  <button
                    onClick={() => handleSort('title')}
                    className="flex items-center gap-2 hover:text-gray-700"
                  >
                    Titre
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  SEO
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-2 hover:text-gray-700"
                  >
                    Statut
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Catégorie
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Modifié le
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Modifié à
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Équipe
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedArticles.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucun article trouvé</p>
                  </td>
                </tr>
              ) : (
                sortedArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-500 font-mono">
                        #{article.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm mb-1 max-w-md truncate font-medium">{article.title}</p>
                    </td>
                    <td className="px-4 py-4">
                      {getSEOBadge(article.seo_score)}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(article.status)}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{article.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">{formatDate(article.updated_at)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-500">{formatTime(article.updated_at)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#C69C6D] text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {article.author_name.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-700">{article.author_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        {canEditArticle(article, currentUser.id, currentUser.role) && (
                          <button
                            onClick={() => onEdit(article)}
                            className="p-2 text-gray-600 hover:text-[#C69C6D] hover:bg-gray-100 rounded transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {canDeleteArticle(currentUser.role) && (
                          <button
                            onClick={() => {
                              if (confirm(`Déplacer "${article.title}" vers la corbeille ?`)) {
                                onDelete(article.id);
                              }
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          {sortedArticles.length} article{sortedArticles.length > 1 ? 's' : ''}{' '}
          {statusFilter !== 'all' && `(filtrés)`}
        </p>
      </div>
    </div>
  );
}