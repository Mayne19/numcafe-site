-- 📝 Exemple d'article pour tester votre blog Numcafé
-- Copiez et collez ce SQL dans l'éditeur SQL de Supabase

-- Créer un article de test
INSERT INTO public.articles (
  title,
  slug,
  content,
  published,
  category,
  excerpt,
  author,
  read_time,
  image
)
VALUES (
  'Premier article de test',
  'premier-article-test',
  E'## Bienvenue sur Numcafé !\n\nCeci est un article de test pour vérifier que l''intégration Supabase fonctionne correctement.\n\n## Fonctionnalités testées\n\nVoici les éléments que nous testons :\n\n- Affichage du titre\n- Affichage de la date\n- Affichage du contenu Markdown\n- Catégorie et image\n- Temps de lecture\n\n## Conclusion\n\nSi vous voyez cet article sur votre blog, félicitations ! L''intégration Supabase fonctionne parfaitement. 🎉',
  true,
  'Culture Digitale',
  'Un article de test pour vérifier l''intégration Supabase de votre blog Numcafé.',
  'Mayne',
  '3 min',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80'
);

-- Vérifier que l'article a bien été créé
SELECT * FROM public.articles WHERE slug = 'premier-article-test';
