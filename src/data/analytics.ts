// Système d'analytics pour le dashboard
// Génère des données réalistes basées sur les articles existants

import { AdminArticle } from './adminArticles';

export interface TrafficData {
  date: string;
  visits: number;
  pageviews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgDuration: number;
}

export interface ArticleTraffic {
  articleId: string;
  title: string;
  visits: number;
  pageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  entrances: number;
}

export interface SEOMetrics {
  keyword: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
  change: number;
}

export interface TrafficSource {
  name: string;
  visits: number;
  percentage: number;
  color: string;
}

// Générer des données de trafic pour une période
export function generateTrafficData(
  period: 'day' | 'month' | 'year',
  articles: AdminArticle[]
): TrafficData[] {
  const now = new Date();
  const data: TrafficData[] = [];
  
  let days = 0;
  let dateFormat = '';
  
  switch (period) {
    case 'day':
      days = 24; // 24 heures
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setHours(now.getHours() - i);
        data.push({
          date: `${String(date.getHours()).padStart(2, '0')}h`,
          visits: Math.floor(Math.random() * 200) + 50,
          pageviews: Math.floor(Math.random() * 500) + 100,
          uniqueVisitors: Math.floor(Math.random() * 150) + 40,
          bounceRate: Math.floor(Math.random() * 30) + 40,
          avgDuration: Math.floor(Math.random() * 180) + 120
        });
      }
      break;
      
    case 'month':
      days = 30;
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        data.push({
          date: `${date.getDate()} ${date.toLocaleDateString('fr-FR', { month: 'short' })}`,
          visits: Math.floor(Math.random() * 1500) + 800,
          pageviews: Math.floor(Math.random() * 4000) + 2000,
          uniqueVisitors: Math.floor(Math.random() * 1200) + 600,
          bounceRate: Math.floor(Math.random() * 25) + 35,
          avgDuration: Math.floor(Math.random() * 200) + 150
        });
      }
      break;
      
    case 'year':
      days = 12; // 12 mois
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);
        data.push({
          date: date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
          visits: Math.floor(Math.random() * 15000) + 10000,
          pageviews: Math.floor(Math.random() * 40000) + 25000,
          uniqueVisitors: Math.floor(Math.random() * 12000) + 8000,
          bounceRate: Math.floor(Math.random() * 20) + 38,
          avgDuration: Math.floor(Math.random() * 180) + 160
        });
      }
      break;
  }
  
  return data;
}

// Générer des données de trafic par article
export function generateArticleTraffic(articles: AdminArticle[]): ArticleTraffic[] {
  const publishedArticles = articles.filter(a => a.status === 'published');
  
  return publishedArticles.map(article => ({
    articleId: article.id,
    title: article.title,
    visits: Math.floor(Math.random() * 5000) + 500,
    pageviews: Math.floor(Math.random() * 8000) + 1000,
    avgTimeOnPage: Math.floor(Math.random() * 300) + 120,
    bounceRate: Math.floor(Math.random() * 40) + 30,
    entrances: Math.floor(Math.random() * 3000) + 300
  })).sort((a, b) => b.visits - a.visits);
}

// Obtenir le top 5 des articles
export function getTopArticles(articles: AdminArticle[]): ArticleTraffic[] {
  const articleTraffic = generateArticleTraffic(articles);
  return articleTraffic.slice(0, 5);
}

// Générer des sources de trafic
export function generateTrafficSources(): TrafficSource[] {
  const sources = [
    { name: 'Recherche organique', base: 45, color: '#10b981' },
    { name: 'Réseaux sociaux', base: 25, color: '#3b82f6' },
    { name: 'Direct', base: 18, color: '#C69C6D' },
    { name: 'Referral', base: 12, color: '#f59e0b' }
  ];
  
  // Ajouter une variation aléatoire
  const total = sources.reduce((sum, s) => sum + s.base, 0);
  
  return sources.map(source => {
    const variation = (Math.random() - 0.5) * 10;
    const percentage = Math.max(5, Math.min(60, source.base + variation));
    
    return {
      name: source.name,
      visits: Math.floor(percentage * 100),
      percentage: Math.round(percentage * 10) / 10,
      color: source.color
    };
  });
}

// Générer des métriques SEO
export function generateSEOMetrics(articles: AdminArticle[]): SEOMetrics[] {
  const keywords = [
    'intelligence artificielle',
    'chatgpt',
    'développement web',
    'design ux',
    'seo référencement',
    'e-commerce',
    'productivité',
    'réseaux sociaux',
    'culture digitale',
    'marketing digital'
  ];
  
  return keywords.map(keyword => ({
    keyword,
    position: Math.floor(Math.random() * 20) + 1,
    impressions: Math.floor(Math.random() * 10000) + 1000,
    clicks: Math.floor(Math.random() * 500) + 50,
    ctr: Math.round((Math.random() * 5 + 1) * 100) / 100,
    change: Math.round((Math.random() - 0.5) * 10 * 10) / 10
  }));
}

// Calculer les statistiques globales
export function calculateGlobalStats(
  articles: AdminArticle[],
  period: 'day' | 'month' | 'year'
): {
  visits: number;
  pageviews: number;
  avgDuration: string;
  bounceRate: number;
  visitsChange: number;
  pageviewsChange: number;
  durationChange: number;
  bounceRateChange: number;
} {
  const trafficData = generateTrafficData(period, articles);
  const totalVisits = trafficData.reduce((sum, d) => sum + d.visits, 0);
  const totalPageviews = trafficData.reduce((sum, d) => sum + d.pageviews, 0);
  const avgDuration = trafficData.reduce((sum, d) => sum + d.avgDuration, 0) / trafficData.length;
  const avgBounceRate = trafficData.reduce((sum, d) => sum + d.bounceRate, 0) / trafficData.length;
  
  // Simuler des changements
  const visitsChange = Math.round((Math.random() - 0.3) * 30 * 10) / 10;
  const pageviewsChange = Math.round((Math.random() - 0.3) * 25 * 10) / 10;
  const durationChange = Math.round((Math.random() - 0.5) * 15 * 10) / 10;
  const bounceRateChange = Math.round((Math.random() - 0.6) * 10 * 10) / 10;
  
  return {
    visits: totalVisits,
    pageviews: totalPageviews,
    avgDuration: formatDuration(avgDuration),
    bounceRate: Math.round(avgBounceRate * 10) / 10,
    visitsChange,
    pageviewsChange,
    durationChange,
    bounceRateChange
  };
}

// Formater la durée en format lisible
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}m ${secs}s`;
}

// Formater un nombre avec K, M suffixes
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
