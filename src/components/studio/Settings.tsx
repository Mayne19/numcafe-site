import { Save, Globe, Mail, Bell } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Numcafé',
    siteDescription: 'Média digital moderne en français',
    siteUrl: 'https://numcafe.fr',
    contactEmail: 'contact@numcafe.fr',
    newsletterEnabled: true,
    commentsEnabled: true,
    notificationsEnabled: true,
  });

  const handleSave = () => {
    // Mock save
    alert('Réglages sauvegardés !');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl mb-2">Réglages</h2>
        <p className="text-gray-600">Configurez les paramètres généraux de votre site</p>
      </div>

      {/* Général */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-[#C69C6D]" />
          <h3 className="text-lg">Informations générales</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Nom du site</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Description du site</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">URL du site</label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-[#C69C6D]" />
          <h3 className="text-lg">Contact</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Email de contact</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            />
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-[#C69C6D]" />
          <h3 className="text-lg">Fonctionnalités</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Newsletter</p>
              <p className="text-xs text-gray-500">Activer le formulaire d'inscription newsletter</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.newsletterEnabled}
                onChange={(e) => setSettings({ ...settings, newsletterEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#C69C6D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C69C6D]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Commentaires</p>
              <p className="text-xs text-gray-500">Permettre aux visiteurs de commenter les articles</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.commentsEnabled}
                onChange={(e) => setSettings({ ...settings, commentsEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#C69C6D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C69C6D]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Notifications</p>
              <p className="text-xs text-gray-500">Recevoir des notifications pour les nouveaux commentaires</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#C69C6D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C69C6D]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
        >
          <Save className="w-4 h-4" />
          Sauvegarder les réglages
        </button>
      </div>
    </div>
  );
}
