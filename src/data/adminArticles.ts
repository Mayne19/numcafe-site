// Gestion des articles pour l'admin
// Stockage en localStorage (pour production, utilisez une vraie base de données)

import { publishArticleToGitHub, deleteArticleFromGitHub } from '../lib/githubClient';

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
  image?: string;
  read_time?: string;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
  seo_focus_keyword?: string;
  seo_score?: 'green' | 'yellow' | 'orange' | 'red';
}

const STORAGE_KEY = 'numcafe_admin_articles';

export function getAdminArticles(): AdminArticle[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try { return JSON.parse(data); } catch { return []; }
  }
  return [];
}

function saveAdminArticles(articles: AdminArticle[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

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

export function updateArticle(
  id: string,
  updates: Partial<AdminArticle>
): AdminArticle | null {
  const articles = getAdminArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;
  articles[index] = { ...articles[index], ...updates, updated_at: new Date().toISOString() };
  saveAdminArticles(articles);
  return articles[index];
}

// NOUVELLE FONCTION — publie vers GitHub
export async function publishArticle(id: string): Promise<boolean> {
  const articles = getAdminArticles();
  const article = articles.find((a) => a.id === id);
  if (!article) return false;

  try {
    await publishArticleToGitHub({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author_name,
      read_time: article.read_time || '5 min',
      image: article.image || '',
      published_at: new Date().toISOString(),
    });

    // Mettre à jour le statut en local
    updateArticle(id, {
      status: 'published',
      published_at: new Date().toISOString(),
    });

    return true;
  } catch (err) {
    console.error('Erreur publication:', err);
    return false;
  }
}

export function moveToTrash(id: string): boolean {
  const article = getAdminArticles().find((a) => a.id === id);
  if (article?.status === 'published') {
    deleteArticleFromGitHub(article.slug).catch(console.error);
  }
  return updateArticle(id, { status: 'trash', deleted_at: new Date().toISOString() }) !== null;
}

export function restoreFromTrash(id: string, newStatus: ArticleStatus = 'draft'): boolean {
  return updateArticle(id, { status: newStatus, deleted_at: null }) !== null;
}

export function getTrashArticles(userId: string, role: 'admin' | 'writer'): AdminArticle[] {
  const articles = getAdminArticles().filter((a) => a.status === 'trash');
  if (role === 'admin') return articles;
  return articles.filter((a) => a.author_id === userId);
}

export function emptyTrash(): void {
  const articles = getAdminArticles().filter((a) => a.status !== 'trash');
  saveAdminArticles(articles);
}

export function getArticleById(id: string): AdminArticle | null {
  return getAdminArticles().find((a) => a.id === id) || null;
}

export function getArticlesForUser(userId: string, role: 'admin' | 'writer'): AdminArticle[] {
  const articles = getAdminArticles().filter((a) => a.status !== 'trash');
  if (role === 'admin') return articles;
  return articles.filter((a) => a.author_id === userId);
}

export function canEditArticle(article: AdminArticle, userId: string, role: 'admin' | 'writer'): boolean {
  if (role === 'admin') return true;
  return article.author_id === userId;
}

export function canPublishArticle(role: 'admin' | 'writer'): boolean {
  return role === 'admin';
}

export function canDeleteArticle(role: 'admin' | 'writer'): boolean {
  return role === 'admin';
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
