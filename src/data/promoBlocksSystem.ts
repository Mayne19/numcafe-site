// Système de blocs promotionnels réutilisables

export type PromoBlockType = 'banner' | 'sidebar' | 'inline' | 'popup';
export type PromoBlockPosition = 'top' | 'middle' | 'bottom' | 'sidebar';

export interface PromoBlock {
  id: string;
  title: string;
  content: string;
  type: PromoBlockType;
  backgroundColor: string;
  textColor: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaColor?: string;
  imageUrl?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'numcafe_promo_blocks';

// Charger les blocs promo
export function getPromoBlocks(): PromoBlock[] {
  if (typeof window === 'undefined') return [];
  
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

// Sauvegarder les blocs
function savePromoBlocks(blocks: PromoBlock[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
}

// Créer un nouveau bloc promo
export function createPromoBlock(
  block: Omit<PromoBlock, 'id' | 'created_at' | 'updated_at'>
): PromoBlock {
  const blocks = getPromoBlocks();
  const newBlock: PromoBlock = {
    ...block,
    id: `promo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    updated_at: new Date().toISOString(),
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

// Obtenir un bloc par ID
export function getPromoBlockById(id: string): PromoBlock | null {
  const blocks = getPromoBlocks();
  return blocks.find((b) => b.id === id) || null;
}

// Obtenir les blocs actifs par type
export function getActivePromoBlocksByType(type: PromoBlockType): PromoBlock[] {
  const blocks = getPromoBlocks();
  return blocks.filter((b) => b.active && b.type === type);
}

// Initialiser des blocs promo par défaut
export function initializeDefaultPromoBlocks() {
  const blocks = getPromoBlocks();
  
  if (blocks.length === 0) {
    // Bloc newsletter
    createPromoBlock({
      title: 'Rejoignez notre communauté',
      content: 'Recevez chaque semaine nos meilleurs articles sur le digital, la tech et l\'IA directement dans votre boîte mail.',
      type: 'banner',
      backgroundColor: '#C69C6D',
      textColor: '#FFFFFF',
      ctaText: 'S\'abonner à la newsletter',
      ctaUrl: '#newsletter',
      ctaColor: '#1D1D1D',
      active: true
    });
    
    // Bloc formation
    createPromoBlock({
      title: 'Formation SEO gratuite',
      content: 'Découvrez nos 10 techniques SEO pour améliorer votre visibilité sur Google en 2026.',
      type: 'inline',
      backgroundColor: '#F5F5F5',
      textColor: '#1D1D1D',
      ctaText: 'Accéder gratuitement',
      ctaUrl: '/formations/seo',
      ctaColor: '#C69C6D',
      active: true
    });
    
    // Bloc outil IA
    createPromoBlock({
      title: 'Découvrez notre outil IA',
      content: 'Générez des articles optimisés SEO en quelques minutes avec notre assistant IA intégré.',
      type: 'sidebar',
      backgroundColor: '#1D1D1D',
      textColor: '#FFFFFF',
      ctaText: 'Essayer gratuitement',
      ctaUrl: '/outils/ia',
      ctaColor: '#C69C6D',
      active: true
    });
  }
}

// Générer le HTML d'un bloc promo pour l'insertion dans le contenu
export function renderPromoBlock(block: PromoBlock): string {
  return `
    <div class="promo-block promo-block-${block.type}" style="background-color: ${block.backgroundColor}; color: ${block.textColor}; padding: 2rem; border-radius: 0.5rem; margin: 2rem 0;">
      ${block.imageUrl ? `<img src="${block.imageUrl}" alt="${block.title}" style="max-width: 100%; height: auto; margin-bottom: 1rem;">` : ''}
      <h3 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600;">${block.title}</h3>
      <p style="margin-bottom: 1.5rem; line-height: 1.6;">${block.content}</p>
      ${block.ctaText && block.ctaUrl ? `
        <a href="${block.ctaUrl}" style="display: inline-block; padding: 0.75rem 1.5rem; background-color: ${block.ctaColor || '#C69C6D'}; color: ${block.textColor}; text-decoration: none; border-radius: 0.25rem; font-weight: 600;">
          ${block.ctaText}
        </a>
      ` : ''}
    </div>
  `;
}
