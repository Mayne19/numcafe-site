// Système de plugins réel avec marketplace
// Permet l'installation, activation et désactivation de plugins

export interface Plugin {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  version: string;
  author: string;
  category: 'seo' | 'analytics' | 'content' | 'social' | 'productivity' | 'other';
  icon: string;
  features: string[];
  screenshots?: string[];
  rating: number;
  downloads: number;
  price: number; // 0 = gratuit
  installed: boolean;
  active: boolean;
  settings?: Record<string, any>;
  dependencies?: string[];
}

const STORAGE_KEY = 'numcafe_plugins';

// Liste des plugins disponibles dans le marketplace
const MARKETPLACE_PLUGINS: Omit<Plugin, 'installed' | 'active'>[] = [
  {
    id: 'seo-advanced',
    name: 'SEO avancé',
    slug: 'seo-advanced',
    description: 'Optimisation SEO complète type Yoast avec analyse en temps réel',
    longDescription: 'Plugin SEO professionnel offrant une analyse complète de vos articles avec score coloré, suggestions d\'amélioration, optimisation des balises meta et bien plus.',
    version: '2.5.0',
    author: 'Numcafé Team',
    category: 'seo',
    icon: 'Search',
    features: [
      'Analyse SEO en temps réel avec score coloré',
      'Optimisation mot-clé principal et secondaires',
      'Prévisualisation Google et réseaux sociaux',
      'Suggestions d\'amélioration automatiques',
      'Analyse de lisibilité',
      'Détection de contenu dupliqué',
      'Optimisation des balises meta',
      'Fil d\'Ariane personnalisable'
    ],
    rating: 4.9,
    downloads: 15420,
    price: 0
  },
  {
    id: 'reading-time',
    name: 'Durée de lecture',
    slug: 'reading-time',
    description: 'Calcule automatiquement le temps de lecture des articles',
    longDescription: 'Affiche le temps de lecture estimé basé sur le nombre de mots et les statistiques de lecture moyenne.',
    version: '1.2.0',
    author: 'Numcafé Team',
    category: 'content',
    icon: 'Clock',
    features: [
      'Calcul automatique du temps de lecture',
      'Personnalisation du format d\'affichage',
      'Support des différentes langues',
      'Prise en compte des images'
    ],
    rating: 4.7,
    downloads: 8230,
    price: 0
  },
  {
    id: 'analytics-pro',
    name: 'Analytics Pro',
    slug: 'analytics-pro',
    description: 'Statistiques avancées et suivi du trafic en temps réel',
    longDescription: 'Intégration complète avec Google Analytics, Search Console et autres plateformes pour un suivi détaillé de vos performances.',
    version: '3.1.0',
    author: 'Numcafé Team',
    category: 'analytics',
    icon: 'BarChart3',
    features: [
      'Intégration Google Analytics 4',
      'Intégration Search Console',
      'Tableaux de bord personnalisés',
      'Suivi des conversions',
      'Rapports automatisés',
      'Alertes de performance',
      'Export de données',
      'Analyse des mots-clés'
    ],
    rating: 4.8,
    downloads: 12850,
    price: 0
  },
  {
    id: 'social-share',
    name: 'Partage social',
    slug: 'social-share',
    description: 'Boutons de partage et optimisation pour les réseaux sociaux',
    longDescription: 'Optimisez vos articles pour le partage sur les réseaux sociaux avec des boutons personnalisables et des prévisualisations optimisées.',
    version: '2.0.0',
    author: 'Numcafé Team',
    category: 'social',
    icon: 'Share2',
    features: [
      'Boutons de partage personnalisables',
      'Compteurs de partages',
      'Open Graph optimisé',
      'Twitter Cards',
      'Click to Tweet',
      'Partage WhatsApp',
      'LinkedIn optimization'
    ],
    rating: 4.6,
    downloads: 9540,
    price: 0
  },
  {
    id: 'content-ai',
    name: 'Assistant IA rédaction',
    slug: 'content-ai',
    description: 'Intelligence artificielle pour vous aider à rédiger du contenu optimisé',
    longDescription: 'Utilisez l\'IA pour générer des idées, rédiger du contenu, optimiser vos titres et améliorer votre SEO.',
    version: '1.5.0',
    author: 'Numcafé Team',
    category: 'content',
    icon: 'Sparkles',
    features: [
      'Génération de titres optimisés',
      'Suggestions de plan d\'article',
      'Recherche de mots-clés IA',
      'Rédaction assistée',
      'Amélioration de texte',
      'Vérification de plagiat',
      'Optimisation SEO automatique',
      'Support multi-langues'
    ],
    rating: 4.9,
    downloads: 18920,
    price: 0
  },
  {
    id: 'grammar-check',
    name: 'Correcteur grammatical',
    slug: 'grammar-check',
    description: 'Correction orthographique et grammaticale en temps réel',
    longDescription: 'Détectez et corrigez automatiquement les fautes d\'orthographe, de grammaire et de style dans vos articles.',
    version: '1.8.0',
    author: 'Numcafé Team',
    category: 'content',
    icon: 'FileCheck',
    features: [
      'Correction orthographique',
      'Vérification grammaticale',
      'Suggestions de style',
      'Détection de répétitions',
      'Vérification de ponctuation',
      'Support français avancé'
    ],
    rating: 4.5,
    downloads: 7630,
    price: 0
  },
  {
    id: 'image-optimizer',
    name: 'Optimiseur d\'images',
    slug: 'image-optimizer',
    description: 'Compression et optimisation automatique des images',
    longDescription: 'Optimisez automatiquement toutes vos images pour améliorer la vitesse de chargement sans perte de qualité.',
    version: '2.3.0',
    author: 'Numcafé Team',
    category: 'productivity',
    icon: 'Image',
    features: [
      'Compression automatique',
      'Conversion WebP',
      'Redimensionnement intelligent',
      'Lazy loading',
      'Alt text automatique',
      'CDN integration'
    ],
    rating: 4.7,
    downloads: 11240,
    price: 0
  },
  {
    id: 'internal-links',
    name: 'Liens internes automatiques',
    slug: 'internal-links',
    description: 'Suggestions et ajout automatique de liens internes pertinents',
    longDescription: 'Améliorez votre maillage interne avec des suggestions intelligentes de liens vers vos autres articles.',
    version: '1.4.0',
    author: 'Numcafé Team',
    category: 'seo',
    icon: 'Link',
    features: [
      'Suggestions automatiques',
      'Analyse du maillage interne',
      'Liens contextuels',
      'Anchor text optimization',
      'Rapports de linking'
    ],
    rating: 4.6,
    downloads: 6420,
    price: 0
  },
  {
    id: 'schema-markup',
    name: 'Schema Markup Pro',
    slug: 'schema-markup',
    description: 'Génération automatique de données structurées JSON-LD',
    longDescription: 'Améliorez votre référencement avec des données structurées complètes et validées pour tous vos contenus.',
    version: '1.6.0',
    author: 'Numcafé Team',
    category: 'seo',
    icon: 'Code',
    features: [
      'Article Schema',
      'FAQ Schema',
      'HowTo Schema',
      'Breadcrumb Schema',
      'Author Schema',
      'Validation automatique',
      'Rich Snippets preview'
    ],
    rating: 4.8,
    downloads: 5830,
    price: 0
  },
  {
    id: 'content-calendar',
    name: 'Calendrier éditorial',
    slug: 'content-calendar',
    description: 'Planification et organisation de votre contenu',
    longDescription: 'Vue calendrier complète pour planifier, organiser et suivre tous vos contenus éditoriaux.',
    version: '2.2.0',
    author: 'Numcafé Team',
    category: 'productivity',
    icon: 'Calendar',
    features: [
      'Vue calendrier mensuelle',
      'Drag & drop planning',
      'Rappels automatiques',
      'Workflow de validation',
      'Templates de contenu',
      'Statistiques de publication'
    ],
    rating: 4.7,
    downloads: 9120,
    price: 0
  }
];

// Charger les plugins installés
export function getInstalledPlugins(): Plugin[] {
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

// Sauvegarder les plugins
function savePlugins(plugins: Plugin[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plugins));
}

// Obtenir tous les plugins (marketplace + installés)
export function getAllPlugins(): Plugin[] {
  const installed = getInstalledPlugins();
  
  return MARKETPLACE_PLUGINS.map(mp => {
    const installedPlugin = installed.find(p => p.id === mp.id);
    return {
      ...mp,
      installed: !!installedPlugin,
      active: installedPlugin?.active || false,
      settings: installedPlugin?.settings
    };
  });
}

// Rechercher des plugins
export function searchPlugins(query: string, category?: string): Plugin[] {
  const allPlugins = getAllPlugins();
  let filtered = allPlugins;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.features.some(f => f.toLowerCase().includes(lowerQuery))
    );
  }
  
  return filtered;
}

// Installer un plugin
export function installPlugin(pluginId: string): boolean {
  const allPlugins = getAllPlugins();
  const plugin = allPlugins.find(p => p.id === pluginId);
  
  if (!plugin || plugin.installed) return false;
  
  const installed = getInstalledPlugins();
  installed.push({
    ...plugin,
    installed: true,
    active: false
  });
  
  savePlugins(installed);
  return true;
}

// Désinstaller un plugin
export function uninstallPlugin(pluginId: string): boolean {
  const installed = getInstalledPlugins();
  const filtered = installed.filter(p => p.id !== pluginId);
  
  if (filtered.length === installed.length) return false;
  
  savePlugins(filtered);
  return true;
}

// Activer un plugin
export function activatePlugin(pluginId: string): boolean {
  const installed = getInstalledPlugins();
  const plugin = installed.find(p => p.id === pluginId);
  
  if (!plugin) return false;
  
  plugin.active = true;
  savePlugins(installed);
  return true;
}

// Désactiver un plugin
export function deactivatePlugin(pluginId: string): boolean {
  const installed = getInstalledPlugins();
  const plugin = installed.find(p => p.id === pluginId);
  
  if (!plugin) return false;
  
  plugin.active = false;
  savePlugins(installed);
  return true;
}

// Vérifier si un plugin est actif
export function isPluginActive(pluginId: string): boolean {
  const installed = getInstalledPlugins();
  const plugin = installed.find(p => p.id === pluginId);
  return plugin?.active || false;
}

// Obtenir les plugins actifs
export function getActivePlugins(): Plugin[] {
  return getInstalledPlugins().filter(p => p.active);
}

// Mettre à jour les paramètres d'un plugin
export function updatePluginSettings(
  pluginId: string,
  settings: Record<string, any>
): boolean {
  const installed = getInstalledPlugins();
  const plugin = installed.find(p => p.id === pluginId);
  
  if (!plugin) return false;
  
  plugin.settings = { ...plugin.settings, ...settings };
  savePlugins(installed);
  return true;
}

// Obtenir les statistiques des plugins
export function getPluginStats(): {
  total: number;
  installed: number;
  active: number;
  byCategory: Record<string, number>;
} {
  const allPlugins = getAllPlugins();
  const installed = allPlugins.filter(p => p.installed);
  const active = installed.filter(p => p.active);
  
  const byCategory: Record<string, number> = {};
  installed.forEach(p => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });
  
  return {
    total: allPlugins.length,
    installed: installed.length,
    active: active.length,
    byCategory
  };
}
