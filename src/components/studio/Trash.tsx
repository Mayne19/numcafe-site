import { useState, useEffect } from 'react';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import {
  getTrashArticles,
  restoreFromTrash,
  deleteArticle,
  emptyTrash,
  AdminArticle,
} from '../../data/adminArticles';
import { User } from '../../utils/auth';

interface TrashProps {
  currentUser: User;
  onRestore: () => void;
}

export function Trash({ currentUser, onRestore }: TrashProps) {
  const [articles, setArticles] = useState<AdminArticle[]>([]);

  useEffect(() => {
    loadTrashArticles();
  }, [currentUser]);

  const loadTrashArticles = () => {
    const trashArticles = getTrashArticles(currentUser.id, currentUser.role);
    setArticles(trashArticles);
  };

  const handleRestore = (id: string) => {
    if (restoreFromTrash(id)) {
      loadTrashArticles();
      onRestore();
    }
  };

  const handlePermanentDelete = (id: string) => {
    if (confirm('Supprimer définitivement cet article ? Cette action est irréversible.')) {
      if (deleteArticle(id)) {
        loadTrashArticles();
      }
    }
  };

  const handleEmptyTrash = () => {
    if (currentUser.role !== 'admin') {
      alert('Seuls les administrateurs peuvent vider la corbeille');
      return;
    }

    if (
      confirm(
        `Supprimer définitivement ${articles.length} article(s) ? Cette action est irréversible.`
      )
    ) {
      emptyTrash();
      loadTrashArticles();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Corbeille</h1>
          <p className="text-sm text-gray-600">
            {articles.length} article{articles.length > 1 ? 's' : ''} dans la corbeille
          </p>
        </div>
        {currentUser.role === 'admin' && articles.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Vider la corbeille
          </button>
        )}
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Trash2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg mb-2 text-gray-700">La corbeille est vide</h3>
          <p className="text-sm text-gray-500">
            Les articles supprimés apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Warning banner */}
          <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Les articles dans la corbeille peuvent être restaurés ou supprimés définitivement
            </p>
          </div>

          {/* Articles list */}
          <div className="divide-y divide-gray-200">
            {articles.map((article) => (
              <div
                key={article.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-1 truncate">{article.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{article.author_name}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>
                        Supprimé le{' '}
                        {article.deleted_at
                          ? formatDate(article.deleted_at)
                          : formatDate(article.updated_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRestore(article.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restaurer
                    </button>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => handlePermanentDelete(article.id)}
                        className="flex items-center gap-2 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
