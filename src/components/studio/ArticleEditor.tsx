import { useState, useEffect } from 'react';
import {
  Save,
  Send,
  Calendar,
  CheckCircle,
  Search,
  X,
} from 'lucide-react';
import { AdminArticle, generateSlug, canPublishArticle } from '../../data/adminArticles';
import { User } from '../../utils/auth';
import { AdvancedEditor } from './AdvancedEditor';
import { EnhancedSEOPanel } from './EnhancedSEOPanel';
import { Modal } from './Modal';
import { MediaLibrary } from './MediaLibrary';
import { PromoBlockPicker } from './PromoBlockPicker';
import { PromoBlock } from '../../data/promoBlocks';
import { analyzeSEO, SEOData } from '../../data/seoPlugin';

interface ArticleEditorProps {
  article: AdminArticle | null;
  currentUser: User;
  onSave: (article: Partial<AdminArticle>) => void;
  onCancel: () => void;
}

export function ArticleEditor({ article, currentUser, onSave, onCancel }: ArticleEditorProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'seo'>('editor');
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showPromoBlocks, setShowPromoBlocks] = useState(false);
  const [seoData, setSeoData] = useState<SEOData>({
    metaTitle: '',
    metaDescription: '',
    ogImage: '',
    focusKeyword: '',
    slug: '',
  });

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setExcerpt(article.excerpt);
      setContent(article.content);
      setCategory(article.category);
      if (article.published_at) {
        const date = new Date(article.published_at);
        const formatted = date.toISOString().slice(0, 16);
        setScheduledDate(formatted);
      }
      setSeoData({
        metaTitle: article.seo_title || article.title,
        metaDescription: article.seo_description || article.excerpt,
        ogImage: article.seo_og_image || '',
        focusKeyword: article.seo_focus_keyword || '',
        slug: article.slug,
      });
    } else {
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
      setCategory('');
      setScheduledDate('');
      setSeoData({
        metaTitle: '',
        metaDescription: '',
        ogImage: '',
        focusKeyword: '',
        slug: '',
      });
    }
  }, [article]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!article) {
      const newSlug = generateSlug(newTitle);
      setSlug(newSlug);
      setSeoData(prev => ({ ...prev, slug: newSlug }));
    }
  };

  const handleSaveDraft = () => {
    const analysis = analyzeSEO(title, content, seoData);
    
    onSave({
      title,
      slug,
      excerpt,
      content,
      category,
      status: 'draft',
      author_id: currentUser.id,
      author_name: currentUser.name,
      published_at: null,
      seo_title: seoData.metaTitle,
      seo_description: seoData.metaDescription,
      seo_og_image: seoData.ogImage,
      seo_focus_keyword: seoData.focusKeyword,
      seo_score: analysis.score,
    });
  };

  const handleSendReview = () => {
    const analysis = analyzeSEO(title, content, seoData);
    
    onSave({
      title,
      slug,
      excerpt,
      content,
      category,
      status: 'review',
      author_id: article?.author_id || currentUser.id,
      author_name: article?.author_name || currentUser.name,
      published_at: null,
      seo_title: seoData.metaTitle,
      seo_description: seoData.metaDescription,
      seo_og_image: seoData.ogImage,
      seo_focus_keyword: seoData.focusKeyword,
      seo_score: analysis.score,
    });
  };

  const handlePublish = () => {
    const analysis = analyzeSEO(title, content, seoData);
    
    onSave({
      title,
      slug,
      excerpt,
      content,
      category,
      status: 'published',
      author_id: article?.author_id || currentUser.id,
      author_name: article?.author_name || currentUser.name,
      published_at: new Date().toISOString(),
      seo_title: seoData.metaTitle,
      seo_description: seoData.metaDescription,
      seo_og_image: seoData.ogImage,
      seo_focus_keyword: seoData.focusKeyword,
      seo_score: analysis.score,
    });
  };

  const handleSchedule = () => {
    if (!scheduledDate) {
      alert('Veuillez sélectionner une date de publication');
      return;
    }
    
    const analysis = analyzeSEO(title, content, seoData);
    
    onSave({
      title,
      slug,
      excerpt,
      content,
      category,
      status: 'scheduled',
      author_id: article?.author_id || currentUser.id,
      author_name: article?.author_name || currentUser.name,
      published_at: new Date(scheduledDate).toISOString(),
      seo_title: seoData.metaTitle,
      seo_description: seoData.metaDescription,
      seo_og_image: seoData.ogImage,
      seo_focus_keyword: seoData.focusKeyword,
      seo_score: analysis.score,
    });
  };

  const handleSelectImage = (url: string) => {
    // Insert image in editor
    const img = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />`;
    setContent(prev => prev + img);
    setShowMediaLibrary(false);
  };

  const categories = [
    'IA & Automatisation',
    'Développement & Code',
    'Design & Créativité',
    'Data & Analytics',
    'Marketing Digital',
    'E-commerce & Business',
    'Cybersécurité',
    'Productivité & Outils',
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-3 text-sm transition-colors border-b-2 ${
              activeTab === 'editor'
                ? 'border-[#C69C6D] text-[#C69C6D]'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Éditeur
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-3 text-sm transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'seo'
                ? 'border-[#C69C6D] text-[#C69C6D]'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <Search className="w-4 h-4" />
            SEO
          </button>
        </div>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Annuler
        </button>
      </div>

      {activeTab === 'editor' && (
        <div className="space-y-4">
          {/* Titre */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="Titre de l'article"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Slug */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">Slug (URL)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                placeholder="slug-de-l-article"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Extrait */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Extrait (résumé court)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="Un court résumé de l'article..."
            />
          </div>

          {/* Éditeur riche */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Contenu</label>
            <AdvancedEditor
              content={content}
              onChange={setContent}
              onOpenMediaLibrary={() => setShowMediaLibrary(true)}
              onOpenPromoBlocks={() => setShowPromoBlocks(true)}
            />
          </div>

          {/* Date planifiée (admin only) */}
          {canPublishArticle(currentUser.role) && (
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Date de publication (optionnel)
              </label>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'seo' && (
        <EnhancedSEOPanel
          articleTitle={title}
          articleContent={content}
          seoData={seoData}
          onUpdate={setSeoData}
        />
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={handleSaveDraft}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          Sauvegarder brouillon
        </button>

        {currentUser.role === 'writer' && (
          <button
            onClick={handleSendReview}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Envoyer en review
          </button>
        )}

        {canPublishArticle(currentUser.role) && (
          <>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Publier maintenant
            </button>

            {scheduledDate && (
              <button
                onClick={handleSchedule}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Planifier
              </button>
            )}
          </>
        )}
      </div>

      {/* Media Library Modal */}
      <Modal
        isOpen={showMediaLibrary}
        onClose={() => setShowMediaLibrary(false)}
        title="Bibliothèque de médias"
        size="xl"
      >
        <MediaLibrary onSelectImage={handleSelectImage} isModal />
      </Modal>

      {/* Promo Blocks Modal */}
      <Modal
        isOpen={showPromoBlocks}
        onClose={() => setShowPromoBlocks(false)}
        title="Blocs promotionnels"
        size="xl"
      >
        <PromoBlockPicker
          onSelect={(block: PromoBlock) => {
            const promoHTML = `<div style="background-color: ${block.backgroundColor}; color: ${block.textColor}; padding: 24px; border-radius: 8px; margin: 16px 0;">
              <h4 style="font-size: 18px; margin-bottom: 8px; color: ${block.textColor};">${block.title}</h4>
              <p style="color: ${block.textColor}; opacity: 0.9;">${block.content}</p>
            </div>`;
            setContent(prev => prev + promoHTML);
            setShowPromoBlocks(false);
          }}
          onClose={() => setShowPromoBlocks(false)}
        />
      </Modal>
    </div>
  );
}