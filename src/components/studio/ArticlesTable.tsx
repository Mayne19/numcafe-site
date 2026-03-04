import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Clock, CheckCircle, FileText, ArrowUpDown } from 'lucide-react';
import { AdminArticle, canEditArticle, canDeleteArticle } from '../../data/adminArticles';
import { User } from '../../utils/auth';

interface ArticlesTableProps {
  articles: AdminArticle[];
  currentUser: User;
  onEdit: (article: AdminArticle) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: string) => void;
}

type SortField = 'title' | 'updated_at' | 'published_at' | 'status';
type SortOrder = 'asc' | 'desc';

export function ArticlesTable({
  articles,
  currentUser,
  onEdit,
  onDelete,
  onChangeStatus,
}: ArticlesTableProps) {
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
  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sortField === 'title') {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortField === 'updated_at') {
      return sortOrder === 'asc'
        ? new Date(a.updated_at!).getTime() - new Date(b.updated_at!).getTime()
        : new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime();
    } else if (sortField === 'published_at') {
      return sortOrder === 'asc'
        ? new Date(a.published_at!).getTime() - new Date(b.published_at!).getTime()
        : new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime();
    } else if (sortField === 'status') {
      return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
    return 0;
  });

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

  // Formater la date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Recherche */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>

        {/* Filtre par statut */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        >
          <option value="all">Tous les statuts</option>
          <option value="draft">Brouillon</option>
          <option value="review">En review</option>
          <option value="scheduled">Planifié</option>
          <option value="published">Publié</option>
        </select>
      </div>

      {/* Tableau */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600">Titre</th>
                <th className="px-4 py-3 text-left text-xs text-gray-600">Statut</th>
                <th className="px-4 py-3 text-left text-xs text-gray-600">Auteur</th>
                <th className="px-4 py-3 text-left text-xs text-gray-600">Catégorie</th>
                <th className="px-4 py-3 text-left text-xs text-gray-600">Publié le</th>
                <th className="px-4 py-3 text-left text-xs text-gray-600">Modifié le</th>
                <th className="px-4 py-3 text-right text-xs text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">
                    Aucun article trouvé
                  </td>
                </tr>
              ) : (
                sortedArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm">
                      <div className="max-w-xs">
                        <p className="truncate">{article.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(article.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{article.author_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{article.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(article.published_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(article.updated_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {/* Bouton Modifier */}
                        {canEditArticle(article, currentUser.id, currentUser.role) && (
                          <button
                            onClick={() => onEdit(article)}
                            className="p-2 text-gray-600 hover:text-[#C69C6D] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}

                        {/* Bouton Supprimer (admin only) */}
                        {canDeleteArticle(currentUser.role) && (
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Êtes-vous sûr de vouloir supprimer cet article ?'
                                )
                              )
                                onDelete(article.id);
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
      <div className="text-sm text-gray-600">
        {sortedArticles.length} article{sortedArticles.length > 1 ? 's' : ''} affiché
        {sortedArticles.length > 1 ? 's' : ''}
      </div>
    </div>
  );
}