// Système de marketplace de plugins fonctionnels

export interface Plugin {
  id: string;
  name: string;
  slug: string;
  description: string;
  version: string;
  author: string;
  category: 'seo' | 'analytics' | 'content' | 'social' | 'productivity' | 'monetization';
  price: number; // 0 pour gratuit
  rating: number;
  downloads: number;
  installed: boolean;
  active: boolean;
  features: string[];
  settings?: any;
}

const PLUGINS_STORAGE_KEY = 'numcafe_installed_plugins';

// Catalogue de plugins disponibles
export const availablePlugins: Omit<Plugin, 'installed' | 'active' | 'settings'>[] = [
  {
    id: 'seo-advanced',
    name: 'SEO Avancé Pro',
    slug: 'seo-advanced',
    description: 'Optimisation SEO complète avec analyse en temps réel, suggestions automatiques et score détaillé.',
    version: '2.5.0',
    author: 'Numcafé Team',
    category: 'seo',
    price: 0,
    rating: 4.8,
    downloads: 15420,
    features: [
      'Analyse SEO en temps réel',
      'Score de qualité avec code couleur',
      'Suggestions d\'optimisation automatiques',
      'Analyse de mots-clés',
      'Vérification meta title et description',
      'Optimisation des headings',
      'Détection du contenu dupliqué'
    ]
  },
  {
    id: 'reading-time',
    name: 'Temps de lecture',
    slug: 'reading-time',
    description: 'Calcule automatiquement le temps de lecture estimé de vos articles basé sur le nombre de mots.',
    version: '1.2.0',
    author: 'Numcafé Team',
    category: 'content',
    price: 0,
    rating: 4.9,
    downloads: 22150,
    features: [
      'Calcul automatique du temps de lecture',
      'Prise en compte des images et vidéos',
      'Personnalisation du taux de lecture',
      'Affichage dans l\'éditeur et sur le site'
    ]
  },
  {
    id: 'analytics-pro',
    name: 'Analytics Pro',
    slug: 'analytics-pro',
    description: 'Analyse de trafic avancée avec statistiques détaillées, graphiques interactifs et rapports automatiques.',
    version: '3.1.0',
    author: 'Numcafé Team',
    category: 'analytics',
    price: 0,
    rating: 4.7,
    downloads: 18230,
    features: [
      'Suivi du trafic en temps réel',
      'Graphiques interactifs personnalisables',
      'Rapports par article et par auteur',
      'Export des données en CSV/Excel',
      'Alertes de performance',
      'Tableau de bord dédié'
    ]
  },
  {
    id: 'social-share',
    name: 'Partage Social Avancé',
    slug: 'social-share',
    description: 'Boutons de partage optimisés pour tous les réseaux sociaux avec compteurs et personnalisation.',
    version: '2.0.0',
    author: 'Numcafé Team',
    category: 'social',
    price: 0,
    rating: 4.6,
    downloads: 12890,
    features: [
      'Boutons de partage pour 15+ réseaux sociaux',
      'Compteurs de partages en temps réel',
      'Personnalisation des couleurs et positions',
      'Preview cards optimisées',
      'Click to Tweet intégré',
      'Statistiques de partages'
    ]
  },
  {
    id: 'ai-content-assistant',
    name: 'Assistant IA Contenu',
    slug: 'ai-content-assistant',
    description: 'Assistant d\'écriture alimenté par l\'IA pour générer, améliorer et optimiser vos contenus.',
    version: '1.5.0',
    author: 'Numcafé AI',
    category: 'content',
    price: 0,
    rating: 4.9,
    downloads: 25670,
    features: [
      'Génération de contenu par IA',
      'Recherche de mots-clés intelligente',
      'Suggestions de titres accrocheurs',
      'Amélioration de style et ton',
      'Vérification orthographique avancée',
      'Détection de plagiat',
      'Génération de meta descriptions'
    ]
  },
  {
    id: 'content-planner',
    name: 'Planificateur de Contenu',
    slug: 'content-planner',
    description: 'Planifiez et organisez votre calendrier éditorial avec des rappels et suggestions de sujets.',
    version: '2.3.0',
    author: 'Numcafé Team',
    category: 'productivity',
    price: 0,
    rating: 4.5,
    downloads: 9340,
    features: [
      'Calendrier éditorial visuel',
      'Planification des publications',
      'Rappels et notifications',
      'Suggestions de sujets saisonniers',
      'Gestion des deadlines',
      'Vue par auteur et catégorie'
    ]
  },
  {
    id: 'image-optimizer',
    name: 'Optimiseur d\'Images',
    slug: 'image-optimizer',
    description: 'Optimise automatiquement vos images pour améliorer la vitesse de chargement et le SEO.',
    version: '1.8.0',
    author: 'Numcafé Team',
    category: 'seo',
    price: 0,
    rating: 4.7,
    downloads: 14560,
    features: [
      'Compression automatique des images',
      'Génération de formats WebP',
      'Ajout automatique des alt text',
      'Lazy loading intelligent',
      'Redimensionnement adaptatif',
      'Optimisation du poids'
    ]
  },
  {
    id: 'keyword-research',
    name: 'Recherche de Mots-Clés',
    slug: 'keyword-research',
    description: 'Trouvez les meilleurs mots-clés pour vos articles avec volumes de recherche et difficulté.',
    version: '2.1.0',
    author: 'Numcafé SEO',
    category: 'seo',
    price: 0,
    rating: 4.8,
    downloads: 11220,
    features: [
      'Recherche de mots-clés par thématique',
      'Volume de recherche mensuel',
      'Score de difficulté',
      'Mots-clés associés et LSI',
      'Analyse de la concurrence',
      'Suggestions basées sur les tendances'
    ]
  },
  {
    id: 'newsletter-builder',
    name: 'Constructeur de Newsletter',
    slug: 'newsletter-builder',
    description: 'Créez et envoyez des newsletters professionnelles à vos abonnés avec des templates personnalisables.',
    version: '3.0.0',
    author: 'Numcafé Email',
    category: 'monetization',
    price: 0,
    rating: 4.6,
    downloads: 8750,
    features: [
      'Templates de newsletter modernes',
      'Éditeur drag & drop',
      'Gestion des abonnés',
      'Statistiques d\'ouverture et clics',
      'Automatisation des envois',
      'Segmentation des listes'
    ]
  },
  {
    id: 'related-posts',
    name: 'Articles Connexes Intelligents',
    slug: 'related-posts',
    description: 'Suggère automatiquement des articles connexes basés sur le contenu et les catégories.',
    version: '1.4.0',
    author: 'Numcafé Team',
    category: 'content',
    price: 0,
    rating: 4.5,
    downloads: 13480,
    features: [
      'Suggestions basées sur l\'IA',
      'Analyse sémantique du contenu',
      'Personnalisation de l\'affichage',
      'Augmentation du temps sur site',
      'Amélioration du maillage interne',
      'Statistiques de clics'
    ]
  }
];

// Récupérer les plugins installés
export function getInstalledPlugins(): Plugin[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(PLUGINS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Sauvegarder les plugins installés
function saveInstalledPlugins(plugins: Plugin[]): void {
  localStorage.setItem(PLUGINS_STORAGE_KEY, JSON.stringify(plugins));
}

// Installer un plugin
export function installPlugin(pluginId: string): boolean {
  const plugin = availablePlugins.find(p => p.id === pluginId);
  if (!plugin) return false;

  const installed = getInstalledPlugins();
  
  // Vérifier si déjà installé
  if (installed.find(p => p.id === pluginId)) {
    return false;
  }

  const newPlugin: Plugin = {
    ...plugin,
    installed: true,
    active: false,
    settings: {}
  };

  installed.push(newPlugin);
  saveInstalledPlugins(installed);
  return true;
}

// Désinstaller un plugin
export function uninstallPlugin(pluginId: string): boolean {
  const installed = getInstalledPlugins();
  const filtered = installed.filter(p => p.id !== pluginId);
  
  if (filtered.length === installed.length) return false;
  
  saveInstalledPlugins(filtered);
  return true;
}

// Activer un plugin
export function activatePlugin(pluginId: string): boolean {
  const installed = getInstalledPlugins();
  const plugin = installed.find(p => p.id === pluginId);
  
  if (!plugin) return false;
  
  plugin.active = true;
  saveInstalledPlugins(installed);
  return true;
}

// Désactiver un plugin
export function deactivatePlugin(pluginId: string): boolean {
  const installed = getInstalledPlugins();
  const plugin = installed.find(p => p.id === pluginId);
  
  if (!plugin) return false;
  
  plugin.active = false;
  saveInstalledPlugins(installed);
  return true;
}

// Mettre à jour les paramètres d'un plugin
export function updatePluginSettings(pluginId: string, settings: any): boolean {
  const installed = getInstalledPlugins();
  const plugin = installed.find(p => p.id === pluginId);
  
  if (!plugin) return false;
  
  plugin.settings = { ...plugin.settings, ...settings };
  saveInstalledPlugins(installed);
  return true;
}

// Obtenir un plugin par ID
export function getPluginById(pluginId: string): Plugin | null {
  const installed = getInstalledPlugins();
  return installed.find(p => p.id === pluginId) || null;
}

// Vérifier si un plugin est actif
export function isPluginActive(pluginId: string): boolean {
  const plugin = getPluginById(pluginId);
  return plugin ? plugin.active : false;
}

// Obtenir tous les plugins (installés + disponibles)
export function getAllPlugins(): Plugin[] {
  const installed = getInstalledPlugins();
  const installedIds = installed.map(p => p.id);
  
  const available = availablePlugins
    .filter(p => !installedIds.includes(p.id))
    .map(p => ({
      ...p,
      installed: false,
      active: false,
      settings: {}
    }));
  
  return [...installed, ...available];
}

// Rechercher des plugins
export function searchPlugins(query: string): Plugin[] {
  const all = getAllPlugins();
  const lowerQuery = query.toLowerCase();
  
  return all.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

// Filtrer par catégorie
export function getPluginsByCategory(category: string): Plugin[] {
  const all = getAllPlugins();
  return all.filter(p => p.category === category);
}
