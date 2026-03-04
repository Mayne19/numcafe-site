import { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import {
  getPromoBlocks,
  createPromoBlock,
  updatePromoBlock,
  deletePromoBlock,
  PromoBlock,
} from '../../data/promoBlocks';

interface PromoBlockPickerProps {
  onSelect: (block: PromoBlock) => void;
  onClose: () => void;
}

export function PromoBlockPicker({ onSelect, onClose }: PromoBlockPickerProps) {
  const [blocks, setBlocks] = useState(getPromoBlocks());
  const [editingBlock, setEditingBlock] = useState<PromoBlock | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    backgroundColor: '#C69C6D',
    textColor: '#FFFFFF',
  });

  const handleCreateNew = () => {
    setFormData({
      title: '',
      content: '',
      category: '',
      backgroundColor: '#C69C6D',
      textColor: '#FFFFFF',
    });
    setEditingBlock(null);
    setShowEditor(true);
  };

  const handleEdit = (block: PromoBlock) => {
    setFormData({
      title: block.title,
      content: block.content,
      category: block.category,
      backgroundColor: block.backgroundColor,
      textColor: block.textColor,
    });
    setEditingBlock(block);
    setShowEditor(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (editingBlock) {
      updatePromoBlock(editingBlock.id, formData);
    } else {
      createPromoBlock(formData);
    }

    setBlocks(getPromoBlocks());
    setShowEditor(false);
    setEditingBlock(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce bloc promo ?')) {
      deletePromoBlock(id);
      setBlocks(getPromoBlocks());
    }
  };

  if (showEditor) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg">
            {editingBlock ? 'Modifier le bloc promo' : 'Créer un bloc promo'}
          </h3>
          <button
            onClick={() => setShowEditor(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Retour
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Titre</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="Formation IA"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Contenu</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="Description du bloc promo..."
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Catégorie</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
              placeholder="IA & Automatisation"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Couleur de fond</label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Couleur du texte</label>
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Aperçu</label>
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: formData.backgroundColor,
                color: formData.textColor,
              }}
            >
              <h4 className="text-lg mb-2" style={{ color: formData.textColor }}>
                {formData.title || 'Titre du bloc'}
              </h4>
              <p style={{ color: formData.textColor, opacity: 0.9 }}>
                {formData.content || 'Contenu du bloc promo...'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowEditor(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D]"
            >
              {editingBlock ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Sélectionner un bloc promo</h3>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] text-sm"
        >
          <Plus className="w-4 h-4" />
          Nouveau bloc
        </button>
      </div>

      <div className="grid gap-3 max-h-[500px] overflow-y-auto">
        {blocks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Aucun bloc promo</p>
            <button
              onClick={handleCreateNew}
              className="mt-3 text-[#C69C6D] hover:underline text-sm"
            >
              Créer le premier
            </button>
          </div>
        ) : (
          blocks.map((block) => (
            <div
              key={block.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#C69C6D] transition-colors"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => onSelect(block)}
                style={{
                  backgroundColor: block.backgroundColor,
                  color: block.textColor,
                }}
              >
                <h4 className="font-medium mb-1" style={{ color: block.textColor }}>
                  {block.title}
                </h4>
                <p className="text-sm" style={{ color: block.textColor, opacity: 0.9 }}>
                  {block.content}
                </p>
                {block.category && (
                  <p className="text-xs mt-2" style={{ color: block.textColor, opacity: 0.7 }}>
                    {block.category}
                  </p>
                )}
              </div>
              <div className="bg-white border-t border-gray-200 px-3 py-2 flex gap-2 justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(block);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#C69C6D] transition-colors"
                  title="Modifier"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(block.id);
                  }}
                  className="p-1.5 text-gray-600 hover:text-red-600 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
