// Gestion des articles pour l'admin
// Stockage en localStorage (pour production, utilisez une vraie base de données)

export type ArticleStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'trash';

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: ArticleStatus;
  author_id: string;
  author_name: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  
  // SEO data
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
  seo_focus_keyword?: string;
  seo_score?: 'green' | 'yellow' | 'orange' | 'red';
}

const STORAGE_KEY = 'numcafe_admin_articles';

// Charger les articles depuis localStorage
export function getAdminArticles(): AdminArticle[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

// Sauvegarder les articles
function saveAdminArticles(articles: AdminArticle[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

// Créer un nouvel article
export function createArticle(
  article: Omit<AdminArticle, 'id' | 'created_at' | 'updated_at'>
): AdminArticle {
  const articles = getAdminArticles();
  const newArticle: AdminArticle = {
    ...article,
    id: `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  articles.push(newArticle);
  saveAdminArticles(articles);
  return newArticle;
}

// Mettre à jour un article
export function updateArticle(
  id: string,
  updates: Partial<AdminArticle>
): AdminArticle | null {
  const articles = getAdminArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;

  articles[index] = {
    ...articles[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveAdminArticles(articles);
  return articles[index];
}

// Supprimer un article
export function deleteArticle(id: string): boolean {
  const articles = getAdminArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveAdminArticles(filtered);
  return true;
}

// Déplacer vers la corbeille (soft delete)
export function moveToTrash(id: string): boolean {
  return updateArticle(id, {
    status: 'trash',
    deleted_at: new Date().toISOString(),
  }) !== null;
}

// Restaurer depuis la corbeille
export function restoreFromTrash(id: string, newStatus: ArticleStatus = 'draft'): boolean {
  return updateArticle(id, {
    status: newStatus,
    deleted_at: null,
  }) !== null;
}

// Obtenir les articles dans la corbeille
export function getTrashArticles(userId: string, role: 'admin' | 'writer'): AdminArticle[] {
  const articles = getAdminArticles();
  const trashArticles = articles.filter((a) => a.status === 'trash');
  
  if (role === 'admin') return trashArticles;
  return trashArticles.filter((a) => a.author_id === userId);
}

// Vider la corbeille (hard delete)
export function emptyTrash(): void {
  const articles = getAdminArticles();
  const filtered = articles.filter((a) => a.status !== 'trash');
  saveAdminArticles(filtered);
}

// Obtenir un article par ID
export function getArticleById(id: string): AdminArticle | null {
  const articles = getAdminArticles();
  return articles.find((a) => a.id === id) || null;
}

// Filtrer les articles selon le rôle
export function getArticlesForUser(
  userId: string,
  role: 'admin' | 'writer'
): AdminArticle[] {
  const articles = getAdminArticles();
  // Exclure les articles dans la corbeille
  const activeArticles = articles.filter((a) => a.status !== 'trash');
  
  if (role === 'admin') return activeArticles;
  // Writer ne voit que ses propres articles
  return activeArticles.filter((a) => a.author_id === userId);
}

// Vérifier si un utilisateur peut modifier un article
export function canEditArticle(
  article: AdminArticle,
  userId: string,
  role: 'admin' | 'writer'
): boolean {
  if (role === 'admin') return true;
  return article.author_id === userId;
}

// Vérifier si un utilisateur peut publier un article
export function canPublishArticle(role: 'admin' | 'writer'): boolean {
  return role === 'admin';
}

// Vérifier si un utilisateur peut supprimer un article
export function canDeleteArticle(role: 'admin' | 'writer'): boolean {
  return role === 'admin';
}

// Générer un slug depuis un titre
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}