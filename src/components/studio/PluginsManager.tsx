import { useState } from 'react';
import { Plug, Check, X, Info } from 'lucide-react';
import { getPluginsConfig, togglePlugin, isPluginEnabled } from '../../data/plugins';

// Liste des plugins disponibles
const AVAILABLE_PLUGINS = [
  {
    id: 'seo-optimizer',
    name: 'SEO Optimizer',
    description:
      'Optimisez le référencement de vos articles avec des recommandations en temps réel, un score SEO et des conseils personnalisés.',
    version: '1.0.0',
    author: 'Numcafé Team',
    icon: '🔍',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description:
      'Suivez les performances de vos articles avec des statistiques détaillées de trafic, engagement et conversions.',
    version: '1.0.0',
    author: 'Numcafé Team',
    icon: '📊',
  },
  {
    id: 'social-share',
    name: 'Social Share',
    description:
      'Partagez automatiquement vos articles sur les réseaux sociaux lors de leur publication.',
    version: '1.0.0',
    author: 'Numcafé Team',
    icon: '📱',
  },
  {
    id: 'reading-time',
    name: 'Reading Time',
    description:
      'Calculez automatiquement le temps de lecture estimé pour chaque article.',
    version: '1.0.0',
    author: 'Numcafé Team',
    icon: '⏱️',
  },
];

export function PluginsManager() {
  const [pluginsConfig, setPluginsConfig] = useState(getPluginsConfig());

  const handleToggle = (pluginId: string) => {
    togglePlugin(pluginId);
    setPluginsConfig(getPluginsConfig());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl mb-1">Plugins</h1>
        <p className="text-sm text-gray-600">
          Gérez les fonctionnalités de votre Studio Numcafé
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="mb-1">
            <strong>Système de plugins</strong>
          </p>
          <p>
            Activez ou désactivez des plugins pour personnaliser votre expérience
            d'édition. Les plugins peuvent ajouter des fonctionnalités dans l'éditeur,
            des colonnes dans le tableau d'articles, ou des statistiques sur le
            tableau de bord.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {AVAILABLE_PLUGINS.map((plugin) => {
          const enabled = isPluginEnabled(plugin.id);
          return (
            <div
              key={plugin.id}
              className={`bg-white rounded-lg border-2 transition-all ${
                enabled
                  ? 'border-[#C69C6D] shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{plugin.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg">{plugin.name}</h3>
                        {enabled && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Activé
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {plugin.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Version {plugin.version}</span>
                        <span>•</span>
                        <span>Par {plugin.author}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(plugin.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                      enabled
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-[#C69C6D] text-white hover:bg-[#B88C5D]'
                    }`}
                  >
                    {enabled ? (
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
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg mb-4">Statistiques</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-2xl mb-1">
              {AVAILABLE_PLUGINS.filter((p) => isPluginEnabled(p.id)).length}
            </p>
            <p className="text-sm text-gray-600">Plugins activés</p>
          </div>
          <div>
            <p className="text-2xl mb-1">{AVAILABLE_PLUGINS.length}</p>
            <p className="text-sm text-gray-600">Plugins disponibles</p>
          </div>
          <div>
            <p className="text-2xl mb-1">0</p>
            <p className="text-sm text-gray-600">Mises à jour</p>
          </div>
        </div>
      </div>
    </div>
  );
}
