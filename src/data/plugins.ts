// Système de plugins pour Studio Numcafé

export interface Plugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
  version: string;
  author: string;
  
  // Hooks
  onEditorFields?: () => React.ReactNode; // Ajoute des champs dans l'éditeur
  onArticleColumn?: (article: any) => React.ReactNode; // Ajoute une colonne dans la table
  onDashboardCard?: () => React.ReactNode; // Ajoute une carte sur le dashboard
  onArticleSave?: (article: any) => any; // Hook lors de la sauvegarde
}

const STORAGE_KEY = 'numcafe_plugins_config';

// Configuration des plugins
export function getPluginsConfig(): Record<string, boolean> {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return {};
}

export function savePluginsConfig(config: Record<string, boolean>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function togglePlugin(pluginId: string): void {
  const config = getPluginsConfig();
  config[pluginId] = !config[pluginId];
  savePluginsConfig(config);
}

export function isPluginEnabled(pluginId: string): boolean {
  const config = getPluginsConfig();
  return config[pluginId] ?? true; // Enabled by default
}
