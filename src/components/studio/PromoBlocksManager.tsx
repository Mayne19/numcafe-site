import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Palette, Type } from 'lucide-react';
import {
  getPromoBlocks,
  createPromoBlock,
  updatePromoBlock,
  deletePromoBlock,
  PromoBlock,
  PromoBlockType
} from '../../data/promoBlocksSystem';

export function PromoBlocksManager() {
  const [blocks, setBlocks] = useState<PromoBlock[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingBlock, setEditingBlock] = useState<PromoBlock | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'inline' as PromoBlockType,
    backgroundColor: '#C69C6D',
    textColor: '#FFFFFF',
    ctaText: '',
    ctaUrl: '',
    ctaColor: '#1D1D1D',
    imageUrl: '',
    active: true
  });

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = () => {
    setBlocks(getPromoBlocks());
  };

  const handleEdit = (block: PromoBlock) => {
    setEditingBlock(block);
    setFormData({
      title: block.title,
      content: block.content,
      type: block.type,
      backgroundColor: block.backgroundColor,
      textColor: block.textColor,
      ctaText: block.ctaText || '',
      ctaUrl: block.ctaUrl || '',
      ctaColor: block.ctaColor || '#1D1D1D',
      imageUrl: block.imageUrl || '',
      active: block.active
    });
    setShowDialog(true);
  };

  const handleCreate = () => {
    setEditingBlock(null);
    setFormData({
      title: '',
      content: '',
      type: 'inline',
      backgroundColor: '#C69C6D',
      textColor: '#FFFFFF',
      ctaText: '',
      ctaUrl: '',
      ctaColor: '#1D1D1D',
      imageUrl: '',
      active: true
    });
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBlock) {
      updatePromoBlock(editingBlock.id, formData);
    } else {
      createPromoBlock(formData);
    }

    setShowDialog(false);
    loadBlocks();
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
      deletePromoBlock(id);
      loadBlocks();
    }
  };

  const toggleActive = (id: string, active: boolean) => {
    updatePromoBlock(id, { active: !active });
    loadBlocks();
  };

  const blockTypes: { value: PromoBlockType; label: string }[] = [
    { value: 'banner', label: 'Bannière' },
    { value: 'sidebar', label: 'Barre latérale' },
    { value: 'inline', label: 'Dans le contenu' },
    { value: 'popup', label: 'Popup' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blocs promotionnels</h1>
          <p className="text-gray-500 mt-1">Créez et gérez vos blocs promotionnels réutilisables</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau bloc
        </button>
      </div>

      {/* Blocks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block) => (
          <div key={block.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Preview */}
            <div 
              className="p-6"
              style={{ 
                backgroundColor: block.backgroundColor,
                color: block.textColor
              }}
            >
              {block.imageUrl && (
                <img 
                  src={block.imageUrl} 
                  alt={block.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-semibold text-lg mb-2">{block.title}</h3>
              <p className="text-sm mb-4 opacity-90">{block.content}</p>
              {block.ctaText && (
                <button
                  className="px-4 py-2 rounded text-sm font-medium"
                  style={{ 
                    backgroundColor: block.ctaColor,
                    color: block.textColor
                  }}
                >
                  {block.ctaText}
                </button>
              )}
            </div>

            {/* Info & Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                  {blockTypes.find(t => t.value === block.type)?.label}
                </span>
                <button
                  onClick={() => toggleActive(block.id, block.active)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    block.active 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  title={block.active ? 'Actif' : 'Inactif'}
                >
                  {block.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(block)}
                  className="flex-1 px-3 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(block.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {blocks.length === 0 && (
        <div className="text-center py-12">
          <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun bloc promotionnel</h3>
          <p className="text-gray-500 mb-4">Créez votre premier bloc promotionnel réutilisable</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
          >
            Créer un bloc
          </button>
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingBlock ? 'Modifier le bloc' : 'Nouveau bloc promotionnel'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenu *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de bloc *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as PromoBlockType }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  >
                    {blockTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur de fond
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="w-12 h-10 rounded border border-gray-200"
                      />
                      <input
                        type="text"
                        value={formData.backgroundColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur du texte
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.textColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                        className="w-12 h-10 rounded border border-gray-200"
                      />
                      <input
                        type="text"
                        value={formData.textColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image (URL)
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Bouton d'action (optionnel)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texte du bouton
                      </label>
                      <input
                        type="text"
                        value={formData.ctaText}
                        onChange={(e) => setFormData(prev => ({ ...prev, ctaText: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                        placeholder="En savoir plus"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL du bouton
                      </label>
                      <input
                        type="url"
                        value={formData.ctaUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, ctaUrl: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Couleur du bouton
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={formData.ctaColor}
                          onChange={(e) => setFormData(prev => ({ ...prev, ctaColor: e.target.value }))}
                          className="w-12 h-10 rounded border border-gray-200"
                        />
                        <input
                          type="text"
                          value={formData.ctaColor}
                          onChange={(e) => setFormData(prev => ({ ...prev, ctaColor: e.target.value }))}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                    className="w-4 h-4 text-[#C69C6D] rounded focus:ring-[#C69C6D]"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Activer ce bloc immédiatement
                  </label>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
                >
                  {editingBlock ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
