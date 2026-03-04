// Système complet de gestion des auteurs

export interface AuthorProfile {
  id: string;
  name: string;
  slug: string;
  email: string;
  role: string; // Rôle affiché publiquement
  bio: string;
  avatar?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  stats: {
    publishedArticles: number;
    drafts: number;
    totalViews: number;
    averageReadTime: string;
  };
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'numcafe_authors_profiles';

// Charger les profils d'auteurs
export function getAuthorProfiles(): AuthorProfile[] {
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

// Sauvegarder les profils
function saveAuthorProfiles(profiles: AuthorProfile[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

// Créer un nouveau profil auteur
export function createAuthorProfile(
  profile: Omit<AuthorProfile, 'id' | 'created_at' | 'updated_at' | 'stats'>
): AuthorProfile {
  const profiles = getAuthorProfiles();
  const newProfile: AuthorProfile = {
    ...profile,
    id: `author-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    stats: {
      publishedArticles: 0,
      drafts: 0,
      totalViews: 0,
      averageReadTime: '0 min'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  profiles.push(newProfile);
  saveAuthorProfiles(profiles);
  return newProfile;
}

// Mettre à jour un profil auteur
export function updateAuthorProfile(
  id: string,
  updates: Partial<AuthorProfile>
): AuthorProfile | null {
  const profiles = getAuthorProfiles();
  const index = profiles.findIndex((p) => p.id === id);
  if (index === -1) return null;

  profiles[index] = {
    ...profiles[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveAuthorProfiles(profiles);
  return profiles[index];
}

// Supprimer un profil auteur
export function deleteAuthorProfile(id: string): boolean {
  const profiles = getAuthorProfiles();
  const filtered = profiles.filter((p) => p.id !== id);
  if (filtered.length === profiles.length) return false;
  saveAuthorProfiles(filtered);
  return true;
}

// Obtenir un profil par ID
export function getAuthorProfileById(id: string): AuthorProfile | null {
  const profiles = getAuthorProfiles();
  return profiles.find((p) => p.id === id) || null;
}

// Obtenir un profil par slug
export function getAuthorProfileBySlug(slug: string): AuthorProfile | null {
  const profiles = getAuthorProfiles();
  return profiles.find((p) => p.slug === slug) || null;
}

// Calculer les stats d'un auteur basées sur ses articles
export function calculateAuthorStats(authorId: string, articles: any[]): AuthorProfile['stats'] {
  const authorArticles = articles.filter(a => a.author_id === authorId);
  const published = authorArticles.filter(a => a.status === 'published');
  const drafts = authorArticles.filter(a => a.status === 'draft' || a.status === 'review');
  
  return {
    publishedArticles: published.length,
    drafts: drafts.length,
    totalViews: Math.floor(Math.random() * 10000) + 1000, // Simulé pour l'instant
    averageReadTime: '5 min' // Simulé pour l'instant
  };
}

// Mettre à jour les stats de tous les auteurs
export function updateAllAuthorsStats(articles: any[]): void {
  const profiles = getAuthorProfiles();
  profiles.forEach(profile => {
    const stats = calculateAuthorStats(profile.id, articles);
    updateAuthorProfile(profile.id, { stats });
  });
}

// Initialiser les auteurs par défaut depuis /data/authors.ts
export function initializeDefaultAuthors() {
  const profiles = getAuthorProfiles();
  
  if (profiles.length === 0) {
    const defaultAuthors = [
      {
        name: 'Mayne',
        slug: 'mayne',
        email: 'mayne@numcafe.com',
        role: 'Fondateur & Rédacteur en chef',
        bio: 'Depuis plus de 10 ans, je contribue à faire rayonner nos sites en imaginant des stratégies qui renforcent notre visibilité et notre position de référence dans l\'univers du digital, de la tech et de l\'IA.',
        socialLinks: {
          twitter: 'https://twitter.com/numcafe',
          linkedin: 'https://linkedin.com/in/numcafe'
        }
      },
      {
        name: 'Sophie Laurent',
        slug: 'sophie-laurent',
        email: 'sophie@numcafe.com',
        role: 'Spécialiste IA',
        bio: 'Passionnée par l\'intelligence artificielle et ses applications pratiques, je décrypte les dernières innovations IA et leur impact sur notre quotidien professionnel et créatif.',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/sophie-laurent'
        }
      },
      {
        name: 'Thomas Durand',
        slug: 'thomas-durand',
        email: 'thomas@numcafe.com',
        role: 'Expert SEO',
        bio: 'Expert en référencement naturel avec plus de 8 ans d\'expérience, je partage mes stratégies SEO pour améliorer la visibilité en ligne et générer du trafic qualifié.',
        socialLinks: {
          twitter: 'https://twitter.com/thomasdurand',
          website: 'https://thomasdurand.fr'
        }
      },
      {
        name: 'Marie Chen',
        slug: 'marie-chen',
        email: 'marie@numcafe.com',
        role: 'Designer UX/UI',
        bio: 'Designer UX/UI créative, je m\'attache à créer des expériences utilisateur mémorables et des interfaces élégantes qui allient esthétique et fonctionnalité.',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/marie-chen',
          website: 'https://mariechen.design'
        }
      },
      {
        name: 'Lucas Martin',
        slug: 'lucas-martin',
        email: 'lucas@numcafe.com',
        role: 'Développeur Web',
        bio: 'Développeur web full-stack, je me spécialise dans les technologies modernes comme React, TypeScript et Next.js pour créer des applications performantes et scalables.',
        socialLinks: {
          github: 'https://github.com/lucasmartin',
          twitter: 'https://twitter.com/lucasmartin'
        }
      }
    ];
    
    defaultAuthors.forEach(author => createAuthorProfile(author));
  }
}
