// Gestion des blocs promo réutilisables

export interface PromoBlock {
  id: string;
  title: string;
  content: string;
  category: string;
  backgroundColor: string;
  textColor: string;
  created_at: string;
}

const STORAGE_KEY = 'numcafe_promo_blocks';

// Charger les blocs promo
export function getPromoBlocks(): PromoBlock[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return getDefaultPromoBlocks();
    }
  }
  return getDefaultPromoBlocks();
}

// Sauvegarder les blocs promo
function savePromoBlocks(blocks: PromoBlock[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
}

// Créer un bloc promo
export function createPromoBlock(
  block: Omit<PromoBlock, 'id' | 'created_at'>
): PromoBlock {
  const blocks = getPromoBlocks();
  const newBlock: PromoBlock = {
    ...block,
    id: `promo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  blocks.push(newBlock);
  savePromoBlocks(blocks);
  return newBlock;
}

// Mettre à jour un bloc promo
export function updatePromoBlock(
  id: string,
  updates: Partial<PromoBlock>
): PromoBlock | null {
  const blocks = getPromoBlocks();
  const index = blocks.findIndex((b) => b.id === id);
  if (index === -1) return null;

  blocks[index] = {
    ...blocks[index],
    ...updates,
  };
  savePromoBlocks(blocks);
  return blocks[index];
}

// Supprimer un bloc promo
export function deletePromoBlock(id: string): boolean {
  const blocks = getPromoBlocks();
  const filtered = blocks.filter((b) => b.id !== id);
  if (filtered.length === blocks.length) return false;
  savePromoBlocks(filtered);
  return true;
}

// Obtenir un bloc promo par ID
export function getPromoBlockById(id: string): PromoBlock | null {
  const blocks = getPromoBlocks();
  return blocks.find((b) => b.id === id) || null;
}

// Blocs promo par défaut
function getDefaultPromoBlocks(): PromoBlock[] {
  return [
    {
      id: 'promo-default-1',
      title: 'Formation IA',
      content: 'Découvrez notre formation complète sur l\'Intelligence Artificielle et devenez expert en Machine Learning.',
      category: 'IA & Automatisation',
      backgroundColor: '#C69C6D',
      textColor: '#FFFFFF',
      created_at: new Date().toISOString(),
    },
    {
      id: 'promo-default-2',
      title: 'Newsletter Numcafé',
      content: 'Recevez chaque semaine les meilleures ressources tech et culture digitale directement dans votre boîte mail.',
      category: 'Newsletter',
      backgroundColor: '#1D1D1D',
      textColor: '#FFFFFF',
      created_at: new Date().toISOString(),
    },
  ];
}
