import { useState, useEffect } from 'react';
import { Save, X, Eye, Calendar, User, Tag, FileText, Target, Sparkles } from 'lucide-react';
import { AdminArticle, ArticleStatus } from '../../data/adminArticles';
import { WYSIWYGEditor } from './WYSIWYGEditor';
import { IntegratedAIAssistant } from './IntegratedAIAssistant';
import { getAuthorProfiles } from '../../data/authorsSystem';
import { analyzeSEO, SEOAnalysis } from '../../data/seoPlugin';

interface EnhancedArticleEditorProps {
  article: AdminArticle | null;
  currentUser: any;
  onSave: (article: Partial<AdminArticle>) => void;
  onCancel: () => void;
}

const categories = [
  'Intelligence Artificielle',
  'Développement Web',
  'Design & UX',
  'SEO & Référencement',
  'Productivité & Café',
  'Réseaux Sociaux',
  'E-commerce & Marketing',
  'Culture Digitale'
];

const statuses: { value: ArticleStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Brouillon', color: '#94A3B8' },
  { value: 'review', label: 'En revue', color: '#F59E0B' },
  { value: 'scheduled', label: 'Planifié', color: '#3B82F6' },
  { value: 'published', label: 'Publié', color: '#10B981' }
];

export function EnhancedArticleEditor({ article, currentUser, onSave, onCancel }: EnhancedArticleEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: categories[0],
    status: 'draft' as ArticleStatus,
    author_id: currentUser.id,
    author_name: currentUser.name,
    published_at: '',
    seo_title: '',
    seo_description: '',
    seo_focus_keyword: '',
    seo_og_image: ''
  });

  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null);
  const [readTime, setReadTime] = useState('5 min');
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const authors = getAuthorProfiles();

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        category: article.category || categories[0],
        status: article.status || 'draft',
        author_id: article.author_id || currentUser.id,
        author_name: article.author_name || currentUser.name,
        published_at: article.published_at || '',
        seo_title: article.seo_title || '',
        seo_description: article.seo_description || '',
        seo_focus_keyword: article.seo_focus_keyword || '',
        seo_og_image: article.seo_og_image || ''
      });
    }
  }, [article, currentUser]);

  useEffect(() => {
    // Auto-générer le slug depuis le titre
    if (!article && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  useEffect(() => {
    // Calculer le temps de lecture
    const words = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    setReadTime(`${minutes} min`);
  }, [formData.content]);

  useEffect(() => {
    // Analyser le SEO
    if (formData.content && formData.seo_focus_keyword) {
      const analysis = analyzeSEO(
        formData.title,
        formData.content,
        formData.seo_focus_keyword,
        formData.seo_description
      );
      setSeoAnalysis(analysis);
    }
  }, [formData.title, formData.content, formData.seo_focus_keyword, formData.seo_description]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      seo_score: seoAnalysis?.score || 'yellow'
    };

    if (formData.status === 'published' && !formData.published_at) {
      articleData.published_at = new Date().toISOString();
    }

    onSave(articleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between sticky top-0 bg-gray-50 z-20 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {article ? 'Modifier l\'article' : 'Nouvel article'}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Assistant IA
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Annuler
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
          >
            <Save className="w-4 h-4" />
            Enregistrer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Left column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Assistant - Collapsible */}
          {showAIAssistant && (
            <IntegratedAIAssistant
              articleContent={formData.content}
              articleTitle={formData.title}
              category={formData.category}
              onInsertContent={(content) => {
                handleChange('content', formData.content + '\n\n' + content);
              }}
              onUpdateTitle={(title) => {
                handleChange('title', title);
              }}
            />
          )}

          {/* Title */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de l'article *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-3 text-2xl font-semibold border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
              placeholder="Entrez le titre de votre article..."
              required
            />
          </div>

          {/* Slug */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">numcafe.com/blog/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                placeholder="slug-de-larticle"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Résumé court *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent resize-none"
              rows={3}
              placeholder="Un résumé court et accrocheur de votre article..."
              required
            />
            <div className="mt-2 text-xs text-gray-500">
              {formData.excerpt.length} / 160 caractères recommandés
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Contenu de l'article *
            </label>
            <WYSIWYGEditor
              content={formData.content}
              onChange={(content) => handleChange('content', content)}
            />
          </div>

          {/* SEO Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-[#C69C6D]" />
              <h2 className="text-lg font-semibold text-gray-900">Optimisation SEO</h2>
              {seoAnalysis && (
                <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                  seoAnalysis.score === 'green' ? 'bg-green-100 text-green-700' :
                  seoAnalysis.score === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  seoAnalysis.score === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  Score: {seoAnalysis.score === 'green' ? 'Excellent' :
                          seoAnalysis.score === 'yellow' ? 'Bon' :
                          seoAnalysis.score === 'orange' ? 'Moyen' : 'Faible'}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot-clé principal
                </label>
                <input
                  type="text"
                  value={formData.seo_focus_keyword}
                  onChange={(e) => handleChange('seo_focus_keyword', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  placeholder="intelligence artificielle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta titre
                </label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => handleChange('seo_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  placeholder="Titre optimisé pour les moteurs de recherche"
                />
                <div className="mt-1 text-xs text-gray-500">
                  {formData.seo_title.length} / 60 caractères recommandés
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta description
                </label>
                <textarea
                  value={formData.seo_description}
                  onChange={(e) => handleChange('seo_description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Description optimisée pour les moteurs de recherche"
                />
                <div className="mt-1 text-xs text-gray-500">
                  {formData.seo_description.length} / 160 caractères recommandés
                </div>
              </div>

              {seoAnalysis && seoAnalysis.suggestions.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Suggestions d'amélioration</h3>
                  <ul className="space-y-1">
                    {seoAnalysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-700">• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Right column (1/3) */}
        <div className="space-y-6">
          {/* Status & Publication */}
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Publication</h3>
            
            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value as ArticleStatus)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Auteur
                </label>
                <select
                  value={formData.author_id}
                  onChange={(e) => {
                    const author = authors.find(a => a.id === e.target.value);
                    handleChange('author_id', e.target.value);
                    if (author) {
                      handleChange('author_name', author.name);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                >
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Publication date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date de publication
                </label>
                <input
                  type="datetime-local"
                  value={formData.published_at ? new Date(formData.published_at).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleChange('published_at', e.target.value ? new Date(e.target.value).toISOString() : '')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                />
              </div>

              {/* Read time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Durée de lecture
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}