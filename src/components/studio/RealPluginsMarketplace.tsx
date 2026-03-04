import { useState, useEffect } from 'react';
import { Search, Download, Check, Settings, Trash2, Power, Star, TrendingUp, Filter } from 'lucide-react';
import {
  getAllPlugins,
  searchPlugins,
  getPluginsByCategory,
  installPlugin,
  uninstallPlugin,
  activatePlugin,
  deactivatePlugin,
  Plugin
} from '../../data/pluginsMarketplace';

export function RealPluginsMarketplace() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [filteredPlugins, setFilteredPlugins] = useState<Plugin[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [view, setView] = useState<'all' | 'installed'>('all');

  const categories = [
    { value: 'all', label: 'Tous les plugins', icon: TrendingUp },
    { value: 'seo', label: 'SEO', icon: TrendingUp },
    { value: 'analytics', label: 'Analytics', icon: TrendingUp },
    { value: 'content', label: 'Contenu', icon: TrendingUp },
    { value: 'social', label: 'Réseaux sociaux', icon: TrendingUp },
    { value: 'productivity', label: 'Productivité', icon: TrendingUp },
    { value: 'monetization', label: 'Monétisation', icon: TrendingUp }
  ];

  useEffect(() => {
    loadPlugins();
  }, []);

  useEffect(() => {
    filterPlugins();
  }, [searchQuery, selectedCategory, view, plugins]);

  const loadPlugins = () => {
    setPlugins(getAllPlugins());
  };

  const filterPlugins = () => {
    let filtered = plugins;

    // Filtrer par vue
    if (view === 'installed') {
      filtered = filtered.filter(p => p.installed);
    }

    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filtrer par recherche
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredPlugins(filtered);
  };

  const handleInstall = (pluginId: string) => {
    if (installPlugin(pluginId)) {
      loadPlugins();
    }
  };

  const handleUninstall = (pluginId: string) => {
    if (confirm('Êtes-vous sûr de vouloir désinstaller ce plugin ?')) {
      if (uninstallPlugin(pluginId)) {
        loadPlugins();
        if (selectedPlugin?.id === pluginId) {
          setSelectedPlugin(null);
        }
      }
    }
  };

  const handleToggleActive = (pluginId: string, active: boolean) => {
    if (active) {
      deactivatePlugin(pluginId);
    } else {
      activatePlugin(pluginId);
    }
    loadPlugins();
  };

  const installedCount = plugins.filter(p => p.installed).length;
  const activeCount = plugins.filter(p => p.active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Marketplace de plugins</h1>
        <p className="text-gray-500 mt-1">
          Installez et activez des plugins pour étendre les fonctionnalités de Numcafé
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Plugins installés</p>
              <p className="text-2xl font-semibold text-gray-900">{installedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Plugins actifs</p>
              <p className="text-2xl font-semibold text-gray-900">{activeCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-[#C69C6D]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Plugins disponibles</p>
              <p className="text-2xl font-semibold text-gray-900">{plugins.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un plugin..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
            />
          </div>

          {/* View toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setView('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'all'
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setView('installed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'installed'
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Installés
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plugins grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <div
            key={plugin.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{plugin.name}</h3>
                  <p className="text-sm text-gray-500">
                    v{plugin.version} · par {plugin.author}
                  </p>
                </div>
                {plugin.installed && (
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    plugin.active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {plugin.active ? 'Actif' : 'Inactif'}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {plugin.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{plugin.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{plugin.downloads.toLocaleString()}</span>
                </div>
                {plugin.price === 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Gratuit
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!plugin.installed ? (
                  <button
                    onClick={() => handleInstall(plugin.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Installer
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleToggleActive(plugin.id, plugin.active)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        plugin.active
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Power className="w-4 h-4" />
                      {plugin.active ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      onClick={() => handleUninstall(plugin.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Désinstaller"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedPlugin(plugin)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Détails"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPlugins.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun plugin trouvé</h3>
          <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche</p>
        </div>
      )}

      {/* Plugin details modal */}
      {selectedPlugin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {selectedPlugin.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Version {selectedPlugin.version} · par {selectedPlugin.author}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlugin(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{selectedPlugin.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Fonctionnalités</h3>
                <ul className="space-y-2">
                  {selectedPlugin.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Note</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedPlugin.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléchargements</p>
                  <p className="font-semibold mt-1">{selectedPlugin.downloads.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prix</p>
                  <p className="font-semibold mt-1">
                    {selectedPlugin.price === 0 ? 'Gratuit' : `${selectedPlugin.price}€`}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                {!selectedPlugin.installed ? (
                  <button
                    onClick={() => {
                      handleInstall(selectedPlugin.id);
                      setSelectedPlugin(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Installer ce plugin
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleToggleActive(selectedPlugin.id, selectedPlugin.active);
                        setSelectedPlugin(null);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                        selectedPlugin.active
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {selectedPlugin.active ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      onClick={() => {
                        handleUninstall(selectedPlugin.id);
                        setSelectedPlugin(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Désinstaller
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
