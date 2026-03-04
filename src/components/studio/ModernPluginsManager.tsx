import { useState, useEffect } from 'react';
import {
  Search,
  Download,
  Trash2,
  Settings,
  Star,
  TrendingUp,
  Check,
  X,
  Filter,
  Package
} from 'lucide-react';
import {
  getAllPlugins,
  searchPlugins,
  installPlugin,
  uninstallPlugin,
  activatePlugin,
  deactivatePlugin,
  getPluginStats,
  Plugin
} from '../../data/pluginsSystem';
import * as LucideIcons from 'lucide-react';

export function ModernPluginsManager() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'marketplace' | 'installed'>('marketplace');

  useEffect(() => {
    loadPlugins();
  }, [searchQuery, categoryFilter]);

  const loadPlugins = () => {
    const results = searchPlugins(
      searchQuery,
      categoryFilter === 'all' ? undefined : categoryFilter
    );
    setPlugins(results);
  };

  const handleInstall = (pluginId: string) => {
    installPlugin(pluginId);
    loadPlugins();
  };

  const handleUninstall = (pluginId: string) => {
    if (confirm('Êtes-vous sûr de vouloir désinstaller ce plugin ?')) {
      uninstallPlugin(pluginId);
      loadPlugins();
    }
  };

  const handleToggleActive = (plugin: Plugin) => {
    if (plugin.active) {
      deactivatePlugin(plugin.id);
    } else {
      activatePlugin(plugin.id);
    }
    loadPlugins();
  };

  const stats = getPluginStats();
  const filteredPlugins =
    activeTab === 'marketplace'
      ? plugins
      : plugins.filter((p) => p.installed);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl mb-2">Gestionnaire de plugins</h1>
        <p className="text-gray-600">
          Étendez les fonctionnalités de Numcafé avec des plugins
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{stats.total}</p>
              <p className="text-sm text-gray-600">Disponibles</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{stats.installed}</p>
              <p className="text-sm text-gray-600">Installés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Check className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{stats.active}</p>
              <p className="text-sm text-gray-600">Actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">4.8</p>
              <p className="text-sm text-gray-600">Note moyenne</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs et recherche */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'marketplace'
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => setActiveTab('installed')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'installed'
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Installés ({stats.installed})
            </button>
          </div>

          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un plugin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
            />
          </div>

          {/* Filtre par catégorie */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
            >
              <option value="all">Toutes catégories</option>
              <option value="seo">SEO</option>
              <option value="analytics">Analytics</option>
              <option value="content">Contenu</option>
              <option value="social">Réseaux sociaux</option>
              <option value="productivity">Productivité</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des plugins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlugins.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Aucun plugin trouvé</p>
          </div>
        ) : (
          filteredPlugins.map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              onInstall={handleInstall}
              onUninstall={handleUninstall}
              onToggleActive={handleToggleActive}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Carte de plugin
interface PluginCardProps {
  plugin: Plugin;
  onInstall: (id: string) => void;
  onUninstall: (id: string) => void;
  onToggleActive: (plugin: Plugin) => void;
}

function PluginCard({
  plugin,
  onInstall,
  onUninstall,
  onToggleActive
}: PluginCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Obtenir l'icône Lucide
  const IconComponent = (LucideIcons as any)[plugin.icon] || Package;

  const getCategoryColor = (category: string) => {
    const colors = {
      seo: 'bg-blue-100 text-blue-700',
      analytics: 'bg-green-100 text-green-700',
      content: 'bg-purple-100 text-purple-700',
      social: 'bg-pink-100 text-pink-700',
      productivity: 'bg-orange-100 text-orange-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-[#C69C6D] bg-opacity-10 rounded-lg">
            <IconComponent className="w-6 h-6 text-[#C69C6D]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{plugin.name}</h3>
              {plugin.installed && (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                  Installé
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">v{plugin.version}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
            plugin.category
          )}`}
        >
          {plugin.category === 'seo' && 'SEO'}
          {plugin.category === 'analytics' && 'Analytics'}
          {plugin.category === 'content' && 'Contenu'}
          {plugin.category === 'social' && 'Social'}
          {plugin.category === 'productivity' && 'Productivité'}
          {plugin.category === 'other' && 'Autre'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{plugin.description}</p>

      {/* Informations */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>{plugin.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Download className="w-4 h-4" />
          <span>{(plugin.downloads / 1000).toFixed(1)}k</span>
        </div>
        <div className="text-gray-400">•</div>
        <div>{plugin.author}</div>
      </div>

      {/* Fonctionnalités principales */}
      {showDetails && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Fonctionnalités :</p>
          <ul className="space-y-1">
            {plugin.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {plugin.features.length > 4 && (
            <p className="text-sm text-gray-500 mt-2">
              +{plugin.features.length - 4} autres fonctionnalités
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {!plugin.installed ? (
          <>
            <button
              onClick={() => onInstall(plugin.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
            >
              <Download className="w-4 h-4" />
              Installer
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showDetails ? 'Masquer' : 'Détails'}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onToggleActive(plugin)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                plugin.active
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {plugin.active ? (
                <>
                  <X className="w-4 h-4" />
                  Désactiver
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Activer
                </>
              )}
            </button>
            <button
              onClick={() => onUninstall(plugin.id)}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showDetails ? 'Masquer' : 'Détails'}
            </button>
          </>
        )}
      </div>

      {plugin.active && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Plugin actif et opérationnel
          </p>
        </div>
      )}
    </div>
  );
}
