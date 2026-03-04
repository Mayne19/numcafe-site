// Assistant IA pour la rédaction et le SEO
// Interface pour connexion à des APIs IA externes (ChatGPT, Perplexity, etc.)

export interface AIConfig {
  provider: 'chatgpt' | 'perplexity' | 'claude' | 'none';
  apiKey: string;
  enabled: boolean;
}

export interface KeywordSuggestion {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  relevance: number;
}

export interface ContentSuggestion {
  title: string;
  description: string;
  potentialScore: number;
  trendingScore: number;
  competitionLevel: 'low' | 'medium' | 'high';
}

export interface OutlineSection {
  type: 'h1' | 'h2' | 'h3';
  title: string;
  description: string;
  keywords: string[];
}

export interface TitleSuggestion {
  title: string;
  score: number;
  type: 'clickbait' | 'seo' | 'informative' | 'question';
}

export type WritingTone = 'professional' | 'conversational' | 'humorous' | 'technical' | 'casual';

const STORAGE_KEY = 'numcafe_ai_config';

// Charger la configuration IA
export function getAIConfig(): AIConfig {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return getDefaultConfig();
    }
  }
  return getDefaultConfig();
}

function getDefaultConfig(): AIConfig {
  return {
    provider: 'none',
    apiKey: '',
    enabled: false
  };
}

// Sauvegarder la configuration IA
export function saveAIConfig(config: AIConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// Générer des suggestions de mots-clés
export async function suggestKeywords(
  topic: string,
  category: string
): Promise<KeywordSuggestion[]> {
  // Simulation - En production, appeler l'API IA
  const config = getAIConfig();
  
  if (!config.enabled) {
    return getMockKeywords(topic, category);
  }
  
  // TODO: Implémenter l'appel API réel
  // const response = await callAIAPI(config, 'keywords', { topic, category });
  
  return getMockKeywords(topic, category);
}

// Mock de suggestions de mots-clés
function getMockKeywords(topic: string, category: string): KeywordSuggestion[] {
  const baseKeywords = [
    { keyword: `${topic} guide complet`, volume: 1200, difficulty: 45, cpc: 1.5, relevance: 95 },
    { keyword: `${topic} débutant`, volume: 2400, difficulty: 38, cpc: 1.2, relevance: 88 },
    { keyword: `meilleur ${topic}`, volume: 1800, difficulty: 52, cpc: 2.1, relevance: 82 },
    { keyword: `${topic} 2026`, volume: 950, difficulty: 42, cpc: 1.8, relevance: 90 },
    { keyword: `comment ${topic}`, volume: 3200, difficulty: 35, cpc: 0.9, relevance: 85 },
    { keyword: `${topic} gratuit`, volume: 2100, difficulty: 48, cpc: 1.1, relevance: 78 },
    { keyword: `tutoriel ${topic}`, volume: 1600, difficulty: 40, cpc: 1.4, relevance: 87 },
    { keyword: `${topic} avancé`, volume: 780, difficulty: 55, cpc: 2.5, relevance: 75 }
  ];
  
  return baseKeywords.sort((a, b) => b.relevance - a.relevance);
}

// Générer des suggestions de sujets
export async function suggestTopics(
  category: string,
  keywords: string[]
): Promise<ContentSuggestion[]> {
  const config = getAIConfig();
  
  if (!config.enabled) {
    return getMockTopics(category);
  }
  
  // TODO: Implémenter l'appel API réel
  return getMockTopics(category);
}

// Mock de suggestions de sujets
function getMockTopics(category: string): ContentSuggestion[] {
  const topics = [
    {
      title: `Les tendances ${category} à suivre en 2026`,
      description: 'Un aperçu complet des dernières innovations et pratiques émergentes',
      potentialScore: 92,
      trendingScore: 88,
      competitionLevel: 'medium' as const
    },
    {
      title: `Guide complet pour débutants en ${category}`,
      description: 'Un tutoriel étape par étape accessible à tous',
      potentialScore: 85,
      trendingScore: 75,
      competitionLevel: 'high' as const
    },
    {
      title: `Comment optimiser votre stratégie ${category}`,
      description: 'Des conseils pratiques pour améliorer vos résultats',
      potentialScore: 88,
      trendingScore: 82,
      competitionLevel: 'medium' as const
    },
    {
      title: `${category} : erreurs courantes à éviter`,
      description: 'Les pièges classiques et comment les contourner',
      potentialScore: 80,
      trendingScore: 70,
      competitionLevel: 'low' as const
    },
    {
      title: `L'avenir du ${category} : ce qui nous attend`,
      description: 'Analyse prospective des évolutions à venir',
      potentialScore: 78,
      trendingScore: 85,
      competitionLevel: 'low' as const
    }
  ];
  
  return topics.sort((a, b) => b.potentialScore - a.potentialScore);
}

// Générer un plan d'article
export async function generateOutline(
  topic: string,
  keyword: string,
  tone: WritingTone
): Promise<OutlineSection[]> {
  const config = getAIConfig();
  
  if (!config.enabled) {
    return getMockOutline(topic, keyword);
  }
  
  // TODO: Implémenter l'appel API réel
  return getMockOutline(topic, keyword);
}

// Mock de plan d'article
function getMockOutline(topic: string, keyword: string): OutlineSection[] {
  return [
    {
      type: 'h1',
      title: topic,
      description: 'Introduction captivante et mise en contexte',
      keywords: [keyword]
    },
    {
      type: 'h2',
      title: `Qu'est-ce que ${topic} ?`,
      description: 'Définition et concepts clés',
      keywords: [keyword, 'définition', 'concept']
    },
    {
      type: 'h2',
      title: `Pourquoi ${topic} est important`,
      description: 'Bénéfices et enjeux',
      keywords: [keyword, 'avantages', 'bénéfices']
    },
    {
      type: 'h2',
      title: 'Comment commencer',
      description: 'Guide étape par étape pour les débutants',
      keywords: [keyword, 'tutoriel', 'guide']
    },
    {
      type: 'h3',
      title: 'Étape 1 : Les bases',
      description: 'Fondamentaux à maîtriser',
      keywords: [keyword, 'bases']
    },
    {
      type: 'h3',
      title: 'Étape 2 : Pratique',
      description: 'Mise en application concrète',
      keywords: [keyword, 'pratique']
    },
    {
      type: 'h2',
      title: 'Bonnes pratiques et conseils',
      description: 'Astuces d\'experts et erreurs à éviter',
      keywords: [keyword, 'conseils', 'bonnes pratiques']
    },
    {
      type: 'h2',
      title: 'Conclusion',
      description: 'Récapitulatif et prochaines étapes',
      keywords: [keyword]
    }
  ];
}

// Générer des suggestions de titres
export async function generateTitles(
  topic: string,
  keyword: string,
  count: number = 10
): Promise<TitleSuggestion[]> {
  const config = getAIConfig();
  
  if (!config.enabled) {
    return getMockTitles(topic, keyword);
  }
  
  // TODO: Implémenter l'appel API réel
  return getMockTitles(topic, keyword);
}

// Mock de suggestions de titres
function getMockTitles(topic: string, keyword: string): TitleSuggestion[] {
  return [
    {
      title: `${topic} : le guide complet pour 2026`,
      score: 92,
      type: 'seo'
    },
    {
      title: `Découvrez comment maîtriser ${topic} en 7 étapes`,
      score: 88,
      type: 'informative'
    },
    {
      title: `${topic} : tout ce que vous devez savoir`,
      score: 85,
      type: 'clickbait'
    },
    {
      title: `Pourquoi ${topic} va révolutionner votre quotidien`,
      score: 90,
      type: 'clickbait'
    },
    {
      title: `Comment ${topic} peut transformer votre stratégie digitale`,
      score: 87,
      type: 'question'
    },
    {
      title: `${topic} pour les débutants : par où commencer ?`,
      score: 83,
      type: 'question'
    },
    {
      title: `Les 10 meilleures pratiques en ${topic}`,
      score: 86,
      type: 'informative'
    },
    {
      title: `${topic} expliqué simplement`,
      score: 80,
      type: 'informative'
    },
    {
      title: `Optimisez votre ${topic} en 5 minutes`,
      score: 89,
      type: 'clickbait'
    },
    {
      title: `${topic} : erreurs courantes et solutions`,
      score: 84,
      type: 'seo'
    }
  ].sort((a, b) => b.score - a.score);
}

// Générer du contenu
export async function generateContent(
  outline: OutlineSection[],
  tone: WritingTone,
  targetLength: number
): Promise<string> {
  const config = getAIConfig();
  
  if (!config.enabled) {
    return getMockContent(outline);
  }
  
  // TODO: Implémenter l'appel API réel
  return getMockContent(outline);
}

// Mock de génération de contenu
function getMockContent(outline: OutlineSection[]): string {
  return outline.map(section => {
    const tag = section.type;
    return `<${tag}>${section.title}</${tag}>\n<p>${section.description}</p>\n`;
  }).join('\n');
}

// Vérifier l'unicité du contenu
export async function checkPlagiarism(content: string): Promise<{
  uniqueness: number;
  sources: { url: string; similarity: number }[];
}> {
  // Simulation - En production, utiliser une API de détection de plagiat
  const uniqueness = Math.floor(Math.random() * 15) + 85; // 85-100%
  
  return {
    uniqueness,
    sources: uniqueness < 95 ? [
      { url: 'https://example.com/article-1', similarity: 8 },
      { url: 'https://example.com/article-2', similarity: 5 }
    ] : []
  };
}
