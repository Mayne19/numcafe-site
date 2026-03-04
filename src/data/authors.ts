export interface Author {
  name: string;
  slug: string;
  role: string;
  bio: string;
  articlesCount?: number; // Sera calculé dynamiquement
}

export const authors: Author[] = [
  {
    name: 'Mayne',
    slug: 'mayne',
    role: 'Fondateur & Rédacteur en chef',
    bio: 'Depuis plus de 10 ans, je contribue à faire rayonner nos sites en imaginant des stratégies qui renforcent notre visibilité et notre position de référence dans l\'univers du digital, de la tech et de l\'IA.'
  },
  {
    name: 'Sophie Laurent',
    slug: 'sophie-laurent',
    role: 'Spécialiste IA',
    bio: 'Passionnée par l\'intelligence artificielle et ses applications pratiques, je décrypte les dernières innovations IA et leur impact sur notre quotidien professionnel et créatif.'
  },
  {
    name: 'Thomas Durand',
    slug: 'thomas-durand',
    role: 'Expert SEO',
    bio: 'Expert en référencement naturel avec plus de 8 ans d\'expérience, je partage mes stratégies SEO pour améliorer la visibilité en ligne et générer du trafic qualifié.'
  },
  {
    name: 'Marie Chen',
    slug: 'marie-chen',
    role: 'Designer UX/UI',
    bio: 'Designer UX/UI créative, je m\'attache à créer des expériences utilisateur mémorables et des interfaces élégantes qui allient esthétique et fonctionnalité.'
  },
  {
    name: 'Lucas Martin',
    slug: 'lucas-martin',
    role: 'Développeur Web',
    bio: 'Développeur web full-stack, je me spécialise dans les technologies modernes comme React, TypeScript et Next.js pour créer des applications performantes et scalables.'
  }
];

export const getAuthor = (slug: string): Author | undefined => {
  return authors.find(author => author.slug === slug);
};
