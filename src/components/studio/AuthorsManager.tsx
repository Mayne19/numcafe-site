import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Mail,
  FileText,
  Eye,
  BarChart3,
  X,
  Twitter,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';
import {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  generateAuthorSlug,
  AuthorProfile
} from '../../data/authorsManagement';
import { getAdminArticles } from '../../data/adminArticles';

export function AuthorsManager() {
  const [authors, setAuthors] = useState<AuthorProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorProfile | null>(null);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = () => {
    const loadedAuthors = getAuthors();
    // Calculer les statistiques pour chaque auteur
    const articles = getAdminArticles();
    
    const authorsWithStats = loadedAuthors.map(author => {
      const authorArticles = articles.filter(a => a.author_id === author.id);
      return {
        ...author,
        stats: {
          totalArticles: authorArticles.length,
          publishedArticles: authorArticles.filter(a => a.status === 'published').length,
          draftArticles: authorArticles.filter(a => a.status === 'draft').length,
          reviewArticles: authorArticles.filter(a => a.status === 'review').length,
          totalViews: Math.floor(Math.random() * 50000) + 5000
        }
      };
    });
    
    setAuthors(authorsWithStats);
  };

  const handleCreateAuthor = () => {
    setEditingAuthor(null);
    setShowCreateModal(true);
  };

  const handleEditAuthor = (author: AuthorProfile) => {
    setEditingAuthor(author);
    setShowCreateModal(true);
  };

  const handleDeleteAuthor = (authorId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
      deleteAuthor(authorId);
      loadAuthors();
    }
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">Gestion des auteurs</h1>
          <p className="text-gray-600">
            Gérez les profils et statistiques de vos auteurs
          </p>
        </div>
        <button
          onClick={handleCreateAuthor}
          className="flex items-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvel auteur
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un auteur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
        />
      </div>

      {/* Liste des auteurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.map((author) => (
          <div
            key={author.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#C69C6D] rounded-full flex items-center justify-center text-white text-lg font-medium">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{author.name}</h3>
                  <p className="text-sm text-gray-500">{author.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditAuthor(author)}
                  className="p-2 text-gray-600 hover:text-[#C69C6D] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAuthor(author.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Mail className="w-4 h-4" />
              {author.email}
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{author.bio}</p>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">Articles</span>
                </div>
                <p className="text-xl font-semibold">{author.stats?.totalArticles || 0}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">Vues</span>
                </div>
                <p className="text-xl font-semibold">
                  {((author.stats?.totalViews || 0) / 1000).toFixed(1)}k
                </p>
              </div>
            </div>

            {/* Réseaux sociaux */}
            {author.social && Object.keys(author.social).length > 0 && (
              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-[#1DA1F2] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-[#0A66C2] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {author.social.github && (
                  <a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-[#333] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {author.social.website && (
                  <a
                    href={author.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-[#C69C6D] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de création/édition */}
      {showCreateModal && (
        <AuthorModal
          author={editingAuthor}
          onClose={() => {
            setShowCreateModal(false);
            setEditingAuthor(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setEditingAuthor(null);
            loadAuthors();
          }}
        />
      )}
    </div>
  );
}

// Modal de création/édition d'auteur
interface AuthorModalProps {
  author: AuthorProfile | null;
  onClose: () => void;
  onSave: () => void;
}

function AuthorModal({ author, onClose, onSave }: AuthorModalProps) {
  const [formData, setFormData] = useState({
    name: author?.name || '',
    email: author?.email || '',
    role: author?.role || '',
    bio: author?.bio || '',
    twitter: author?.social?.twitter || '',
    linkedin: author?.social?.linkedin || '',
    github: author?.social?.github || '',
    website: author?.social?.website || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const authorData = {
      name: formData.name,
      slug: author?.slug || generateAuthorSlug(formData.name),
      email: formData.email,
      role: formData.role,
      bio: formData.bio,
      social: {
        ...(formData.twitter && { twitter: formData.twitter }),
        ...(formData.linkedin && { linkedin: formData.linkedin }),
        ...(formData.github && { github: formData.github }),
        ...(formData.website && { website: formData.website })
      }
    };

    if (author) {
      updateAuthor(author.id, authorData);
    } else {
      createAuthor(authorData);
    }

    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl">
            {author ? 'Modifier l\'auteur' : 'Nouvel auteur'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Rôle / Titre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Ex: Spécialiste SEO, Expert IA..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Biographie <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent resize-none"
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium mb-3">Réseaux sociaux (optionnel)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Twitter</label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://twitter.com/username"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">GitHub</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Site web personnel
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
            >
              {author ? 'Mettre à jour' : 'Créer l\'auteur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
