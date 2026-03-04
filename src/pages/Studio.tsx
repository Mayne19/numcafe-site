import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { getCurrentUser, logout, isAuthenticated } from '../utils/auth';
import {
  getArticlesForUser,
  createArticle,
  updateArticle,
  moveToTrash,
  AdminArticle,
} from '../data/adminArticles';
import { Sidebar } from '../components/studio/Sidebar';
import { AdvancedDashboard } from '../components/studio/AdvancedDashboard';
import { SEODashboard } from '../components/studio/SEODashboard';
import { EnhancedArticlesTable } from '../components/studio/EnhancedArticlesTable';
import { EnhancedArticleEditor } from '../components/studio/EnhancedArticleEditor';
import { MediaLibrary } from '../components/studio/MediaLibrary';
import { UsersManager } from '../components/studio/UsersManager';
import { Settings } from '../components/studio/Settings';
import { Trash } from '../components/studio/Trash';
import { RealPluginsMarketplace } from '../components/studio/RealPluginsMarketplace';
import { CompleteAuthorsManager } from '../components/studio/CompleteAuthorsManager';
import { PromoBlocksManager } from '../components/studio/PromoBlocksManager';
import { initializeDefaultAuthors } from '../data/authorsSystem';
import { initializeDefaultPromoBlocks } from '../data/promoBlocksSystem';
import '../data/syncArticles';

type Page =
  | 'dashboard'
  | 'seo-dashboard'
  | 'articles'
  | 'editor'
  | 'media'
  | 'authors'
  | 'users'
  | 'settings'
  | 'trash'
  | 'plugins'
  | 'promo-blocks';

export function Studio() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login-studio';
      return;
    }

    // Initialiser les systèmes
    initializeDefaultAuthors();
    initializeDefaultPromoBlocks();

    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      const userArticles = getArticlesForUser(user.id, user.role);
      setArticles(userArticles);
    }
  }, []);

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleNavigate = (page: string) => {
    setActivePage(page as Page);
    if (page === 'editor') {
      setEditingArticle(null);
    }
  };

  const handleEditArticle = (article: AdminArticle) => {
    setEditingArticle(article);
    setActivePage('editor');
  };

  const handleDeleteArticle = (id: string) => {
    if (moveToTrash(id)) {
      const userArticles = getArticlesForUser(currentUser.id, currentUser.role);
      setArticles(userArticles);
    }
  };

  const handleSaveArticle = (articleData: Partial<AdminArticle>) => {
    if (editingArticle) {
      updateArticle(editingArticle.id, articleData);
    } else {
      createArticle(articleData as Omit<AdminArticle, 'id' | 'created_at' | 'updated_at'>);
    }

    const userArticles = getArticlesForUser(currentUser.id, currentUser.role);
    setArticles(userArticles);
    setActivePage('articles');
    setEditingArticle(null);
  };

  const handleCancelEdit = () => {
    setEditingArticle(null);
    setActivePage('articles');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdvancedDashboard articles={articles} currentUser={currentUser} />;

      case 'seo-dashboard':
        return <SEODashboard articles={articles} currentUser={currentUser} />;

      case 'articles':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl">Articles</h1>
              <button
                onClick={() => {
                  setEditingArticle(null);
                  setActivePage('editor');
                }}
                className="px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
              >
                Créer un article
              </button>
            </div>
            <EnhancedArticlesTable
              articles={articles}
              currentUser={currentUser}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
              onChangeStatus={() => {}}
            />
          </div>
        );

      case 'editor':
        return (
          <EnhancedArticleEditor
            article={editingArticle}
            currentUser={currentUser}
            onSave={handleSaveArticle}
            onCancel={handleCancelEdit}
          />
        );

      case 'media':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl">Bibliothèque de médias</h1>
            <MediaLibrary />
          </div>
        );

      case 'authors':
        return <CompleteAuthorsManager />;

      case 'users':
        return <UsersManager />;

      case 'settings':
        return <Settings />;

      case 'trash':
        return (
          <Trash
            currentUser={currentUser}
            onRestore={() => {
              const userArticles = getArticlesForUser(currentUser.id, currentUser.role);
              setArticles(userArticles);
            }}
          />
        );

      case 'plugins':
        return <RealPluginsMarketplace />;

      case 'promo-blocks':
        return <PromoBlocksManager />;

      default:
        return <AdvancedDashboard articles={articles} currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        currentUser={currentUser}
        activePage={activePage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C69C6D] rounded-full flex items-center justify-center text-white text-sm">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}