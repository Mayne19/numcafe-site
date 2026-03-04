import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, FileText, Eye, Twitter, Linkedin, Github, Globe } from 'lucide-react';
import {
  getAuthorProfiles,
  createAuthorProfile,
  updateAuthorProfile,
  deleteAuthorProfile,
  calculateAuthorStats,
  AuthorProfile
} from '../../data/authorsSystem';
import { getAdminArticles } from '../../data/adminArticles';

export function CompleteAuthorsManager() {
  const [authors, setAuthors] = useState<AuthorProfile[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorProfile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    email: '',
    role: '',
    bio: '',
    avatar: '',
    twitter: '',
    linkedin: '',
    github: '',
    website: ''
  });

  useEffect(() => {
    loadAuthors();
    setArticles(getAdminArticles());
  }, []);

  const loadAuthors = () => {
    const profiles = getAuthorProfiles();
    const articlesData = getAdminArticles();
    
    // Mettre à jour les stats de chaque auteur
    const updatedProfiles = profiles.map(profile => ({
      ...profile,
      stats: calculateAuthorStats(profile.id, articlesData)
    }));
    
    setAuthors(updatedProfiles);
  };

  const handleEdit = (author: AuthorProfile) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      slug: author.slug,
      email: author.email,
      role: author.role,
      bio: author.bio,
      avatar: author.avatar || '',
      twitter: author.socialLinks.twitter || '',
      linkedin: author.socialLinks.linkedin || '',
      github: author.socialLinks.github || '',
      website: author.socialLinks.website || ''
    });
    setShowDialog(true);
  };

  const handleCreate = () => {
    setEditingAuthor(null);
    setFormData({
      name: '',
      slug: '',
      email: '',
      role: '',
      bio: '',
      avatar: '',
      twitter: '',
      linkedin: '',
      github: '',
      website: ''
    });
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profileData = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      email: formData.email,
      role: formData.role,
      bio: formData.bio,
      avatar: formData.avatar,
      socialLinks: {
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        github: formData.github,
        website: formData.website
      }
    };

    if (editingAuthor) {
      updateAuthorProfile(editingAuthor.id, profileData);
    } else {
      createAuthorProfile(profileData);
    }

    setShowDialog(false);
    loadAuthors();
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
      deleteAuthorProfile(id);
      loadAuthors();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des auteurs</h1>
          <p className="text-gray-500 mt-1">Gérez les profils et statistiques des auteurs</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvel auteur
        </button>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#C69C6D]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total auteurs</p>
              <p className="text-2xl font-semibold text-gray-900">{authors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Articles publiés</p>
              <p className="text-2xl font-semibold text-gray-900">
                {authors.reduce((sum, a) => sum + a.stats.publishedArticles, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vues totales</p>
              <p className="text-2xl font-semibold text-gray-900">
                {authors.reduce((sum, a) => sum + a.stats.totalViews, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Authors list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Articles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brouillons
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vues totales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réseaux sociaux
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.map((author) => (
                <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#C69C6D] rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{author.name}</div>
                        <div className="text-sm text-gray-500">{author.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{author.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {author.stats.publishedArticles}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {author.stats.drafts}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {author.stats.totalViews.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {author.socialLinks.twitter && (
                        <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-4 h-4 text-gray-400 hover:text-[#1DA1F2]" />
                        </a>
                      )}
                      {author.socialLinks.linkedin && (
                        <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 text-gray-400 hover:text-[#0A66C2]" />
                        </a>
                      )}
                      {author.socialLinks.github && (
                        <a href={author.socialLinks.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 text-gray-400 hover:text-gray-900" />
                        </a>
                      )}
                      {author.socialLinks.website && (
                        <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 text-gray-400 hover:text-[#C69C6D]" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(author)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(author.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Author dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingAuthor ? 'Modifier l\'auteur' : 'Nouvel auteur'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                    placeholder="Auto-généré"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                    placeholder="Ex: Rédacteur en chef"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio *
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo de profil (URL)
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Réseaux sociaux</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Twitter className="w-4 h-4 inline mr-1" />
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                      placeholder="https://twitter.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Linkedin className="w-4 h-4 inline mr-1" />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Github className="w-4 h-4 inline mr-1" />
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Site web
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
                >
                  {editingAuthor ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
