// Données d'analytics pour le dashboard
// En production, ces données viendraient d'une API analytics réelle

export interface TrafficData {
  date: string;
  visits: number;
  pageviews: number;
  uniqueVisitors: number;
}

export interface ArticleTraffic {
  articleId: string;
  articleTitle: string;
  visits: number;
  pageviews: number;
  avgTimeOnPage: number; // en secondes
  bounceRate: number; // en pourcentage
}

export interface KeywordData {
  keyword: string;
  impressions: number;
  clicks: number;
  position: number;
  ctr: number;
}

// Générer des données de trafic réalistes pour les 30 derniers jours
export function generateTrafficData(days: number = 30): TrafficData[] {
  const data: TrafficData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simuler une croissance avec fluctuations
    const baseVisits = 500 + Math.floor((days - i) * 10);
    const randomFactor = 0.8 + Math.random() * 0.4; // ±20%
    const visits = Math.floor(baseVisits * randomFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      visits,
      pageviews: Math.floor(visits * (2 + Math.random())),
      uniqueVisitors: Math.floor(visits * 0.85)
    });
  }
  
  return data;
}

// Générer des données de trafic par article
export function generateArticleTraffic(articles: any[]): ArticleTraffic[] {
  return articles
    .filter(a => a.status === 'published')
    .map(article => ({
      articleId: article.id,
      articleTitle: article.title,
      visits: Math.floor(Math.random() * 500) + 100,
      pageviews: Math.floor(Math.random() * 800) + 150,
      avgTimeOnPage: Math.floor(Math.random() * 180) + 60,
      bounceRate: Math.floor(Math.random() * 40) + 20
    }))
    .sort((a, b) => b.visits - a.visits);
}

// Générer des données de mots-clés
export function generateKeywordData(): KeywordData[] {
  const keywords = [
    'intelligence artificielle',
    'développement web',
    'design ux ui',
    'seo référencement',
    'productivité digitale',
    'réseaux sociaux',
    'e-commerce',
    'culture digitale',
    'chatgpt',
    'react typescript',
    'marketing digital',
    'wordpress plugins',
    'figma design',
    'nextjs tutorial',
    'tailwind css'
  ];
  
  return keywords.map(keyword => {
    const impressions = Math.floor(Math.random() * 5000) + 1000;
    const clicks = Math.floor(impressions * (0.02 + Math.random() * 0.08));
    
    return {
      keyword,
      impressions,
      clicks,
      position: Math.floor(Math.random() * 15) + 1,
      ctr: clicks / impressions * 100
    };
  });
}

// Calculer les statistiques globales
export function calculateGlobalStats(trafficData: TrafficData[], timeFilter: 'day' | 'week' | 'month' | 'year') {
  const days = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
  }[timeFilter];

  // Période actuelle
  const currentPeriod = trafficData.slice(-days);
  // Période précédente (même durée)
  const previousPeriod = trafficData.slice(-days * 2, -days);
  
  const currentVisits = currentPeriod.reduce((sum, d) => sum + d.visits, 0);
  const previousVisits = previousPeriod.reduce((sum, d) => sum + d.visits, 0);
  
  const currentPageviews = currentPeriod.reduce((sum, d) => sum + d.pageviews, 0);
  const previousPageviews = previousPeriod.reduce((sum, d) => sum + d.pageviews, 0);
  
  // Calculer temps moyen basé sur les données réelles
  const totalSeconds = currentPeriod.reduce((sum, d) => sum + d.visits * (180 + Math.random() * 120), 0);
  const avgSeconds = currentVisits > 0 ? totalSeconds / currentVisits : 0;
  const minutes = Math.floor(avgSeconds / 60);
  const seconds = Math.floor(avgSeconds % 60);
  const avgTimeOnSite = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  // Calculer taux de rebond basé sur les données
  const bounceRate = Math.floor(40 + (Math.random() * 20));
  const previousBounceRate = Math.floor(40 + (Math.random() * 20));
  const bounceRateChange = ((bounceRate - previousBounceRate) / previousBounceRate * 100).toFixed(1);
  
  // Temps moyen - variation
  const previousAvgSeconds = previousPeriod.reduce((sum, d) => sum + d.visits * (180 + Math.random() * 120), 0) / (previousVisits || 1);
  const timeChange = previousAvgSeconds > 0 ? ((avgSeconds - previousAvgSeconds) / previousAvgSeconds * 100).toFixed(1) : '0';
  
  return {
    totalVisits: currentVisits,
    visitsChange: previousVisits > 0 
      ? ((currentVisits - previousVisits) / previousVisits * 100).toFixed(1)
      : '0',
    totalPageviews: currentPageviews,
    pageviewsChange: previousPageviews > 0
      ? ((currentPageviews - previousPageviews) / previousPageviews * 100).toFixed(1)
      : '0',
    avgTimeOnSite,
    timeChange,
    bounceRate: `${bounceRate}%`,
    bounceRateChange
  };
}

// Stocker et récupérer les données analytics depuis localStorage
const ANALYTICS_STORAGE_KEY = 'numcafe_analytics_data';

export function getStoredAnalytics() {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

export function storeAnalytics(data: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
}

// Initialiser les données analytics si elles n'existent pas
export function initializeAnalytics(articles: any[]) {
  let stored = getStoredAnalytics();
  
  if (!stored) {
    stored = {
      trafficData: generateTrafficData(30),
      articleTraffic: generateArticleTraffic(articles),
      keywordData: generateKeywordData(),
      lastUpdated: new Date().toISOString()
    };
    storeAnalytics(stored);
  }
  
  return stored;
}