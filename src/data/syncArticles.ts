// Synchronisation des articles publiés avec l'admin
import { articles } from './articles';
import { authors } from './authors';
import { getAdminArticles, createArticle, AdminArticle } from './adminArticles';

export function syncPublishedArticlesToAdmin() {
  const adminArticles = getAdminArticles();
  
  // Synchroniser uniquement si aucun article n'existe encore
  if (adminArticles.length === 0) {
    articles.forEach((article) => {
      // Trouver l'auteur correspondant
      const author = authors.find(a => a.name === article.author) || authors[0];
      
      createArticle({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        status: 'published',
        author_id: author.slug,
        author_name: author.name,
        published_at: article.date,
        seo_title: article.title,
        seo_description: article.excerpt,
        seo_score: 'green'
      });
    });
  }
}

// Appeler au démarrage de l'app
if (typeof window !== 'undefined') {
  syncPublishedArticlesToAdmin();
}
