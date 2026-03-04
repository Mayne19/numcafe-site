// Gestion avancée des auteurs avec profils complets
// Stockage en localStorage (pour production, utilisez une vraie base de données)

export interface AuthorProfile {
  id: string;
  name: string;
  slug: string;
  email: string;
  role: string;
  bio: string;
  photo?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  stats?: {
    totalArticles: number;
    publishedArticles: number;
    draftArticles: number;
    reviewArticles: number;
    totalViews: number;
  };
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'numcafe_authors';

// Charger les auteurs depuis localStorage
export function getAuthors(): AuthorProfile[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return getDefaultAuthors();
    }
  }
  return getDefaultAuthors();
}

// Auteurs par défaut
function getDefaultAuthors(): AuthorProfile[] {
  const defaultAuthors: AuthorProfile[] = [
    {
      id: 'author-1',
      name: 'Mayne',
      slug: 'mayne',
      email: 'mayne@numcafe.fr',
      role: 'Fondateur & Rédacteur en chef',
      bio: 'Depuis plus de 10 ans, je contribue à faire rayonner nos sites en imaginant des stratégies qui renforcent notre visibilité et notre position de référence dans l\'univers du digital, de la tech et de l\'IA.',
      social: {
        twitter: 'https://twitter.com/numcafe',
        linkedin: 'https://linkedin.com/in/mayne',
        website: 'https://numcafe.fr'
      },
      stats: {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        reviewArticles: 0,
        totalViews: 0
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'author-2',
      name: 'Sophie Laurent',
      slug: 'sophie-laurent',
      email: 'sophie@numcafe.fr',
      role: 'Spécialiste IA',
      bio: 'Passionnée par l\'intelligence artificielle et ses applications pratiques, je décrypte les dernières innovations IA et leur impact sur notre quotidien professionnel et créatif.',
      social: {
        linkedin: 'https://linkedin.com/in/sophie-laurent'
      },
      stats: {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        reviewArticles: 0,
        totalViews: 0
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'author-3',
      name: 'Thomas Durand',
      slug: 'thomas-durand',
      email: 'thomas@numcafe.fr',
      role: 'Expert SEO',
      bio: 'Expert en référencement naturel avec plus de 8 ans d\'expérience, je partage mes stratégies SEO pour améliorer la visibilité en ligne et générer du trafic qualifié.',
      social: {
        twitter: 'https://twitter.com/thomas_seo',
        linkedin: 'https://linkedin.com/in/thomas-durand'
      },
      stats: {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        reviewArticles: 0,
        totalViews: 0
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'author-4',
      name: 'Marie Chen',
      slug: 'marie-chen',
      email: 'marie@numcafe.fr',
      role: 'Designer UX/UI',
      bio: 'Designer UX/UI créative, je m\'attache à créer des expériences utilisateur mémorables et des interfaces élégantes qui allient esthétique et fonctionnalité.',
      social: {
        linkedin: 'https://linkedin.com/in/marie-chen',
        website: 'https://mariechen.design'
      },
      stats: {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        reviewArticles: 0,
        totalViews: 0
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'author-5',
      name: 'Lucas Martin',
      slug: 'lucas-martin',
      email: 'lucas@numcafe.fr',
      role: 'Développeur Web',
      bio: 'Développeur web full-stack, je me spécialise dans les technologies modernes comme React, TypeScript et Next.js pour créer des applications performantes et scalables.',
      social: {
        github: 'https://github.com/lucasmartin',
        linkedin: 'https://linkedin.com/in/lucas-martin'
      },
      stats: {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        reviewArticles: 0,
        totalViews: 0
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
  
  saveAuthors(defaultAuthors);
  return defaultAuthors;
}

// Sauvegarder les auteurs
function saveAuthors(authors: AuthorProfile[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
}

// Créer un nouvel auteur
export function createAuthor(
  author: Omit<AuthorProfile, 'id' | 'created_at' | 'updated_at' | 'stats'>
): AuthorProfile {
  const authors = getAuthors();
  const newAuthor: AuthorProfile = {
    ...author,
    id: `author-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    stats: {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      reviewArticles: 0,
      totalViews: 0
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  authors.push(newAuthor);
  saveAuthors(authors);
  return newAuthor;
}

// Mettre à jour un auteur
export function updateAuthor(
  id: string,
  updates: Partial<AuthorProfile>
): AuthorProfile | null {
  const authors = getAuthors();
  const index = authors.findIndex((a) => a.id === id);
  if (index === -1) return null;

  authors[index] = {
    ...authors[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveAuthors(authors);
  return authors[index];
}

// Supprimer un auteur
export function deleteAuthor(id: string): boolean {
  const authors = getAuthors();
  const filtered = authors.filter((a) => a.id !== id);
  if (filtered.length === authors.length) return false;
  saveAuthors(filtered);
  return true;
}

// Obtenir un auteur par ID
export function getAuthorById(id: string): AuthorProfile | null {
  const authors = getAuthors();
  return authors.find((a) => a.id === id) || null;
}

// Obtenir un auteur par slug
export function getAuthorBySlug(slug: string): AuthorProfile | null {
  const authors = getAuthors();
  return authors.find((a) => a.slug === slug) || null;
}

// Mettre à jour les statistiques d'un auteur
export function updateAuthorStats(
  authorId: string,
  stats: Partial<AuthorProfile['stats']>
): void {
  const author = getAuthorById(authorId);
  if (!author) return;

  updateAuthor(authorId, {
    stats: {
      ...author.stats!,
      ...stats
    }
  });
}

// Générer un slug depuis un nom
export function generateAuthorSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
