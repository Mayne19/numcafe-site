# Documentation SEO - Numcafé

## 📋 Vue d'ensemble

Cette documentation décrit les optimisations SEO mises en place pour le site Numcafé, incluant le sitemap, robots.txt, balises OpenGraph et schémas JSON-LD.

## 🗺️ Sitemap XML

### Emplacement
`/public/sitemap.xml`

### Contenu
Le sitemap contient toutes les pages importantes du site :
- Page d'accueil (priorité 1.0)
- Page Blog (priorité 0.9)
- Page À propos (priorité 0.7)
- Page Contact (priorité 0.6)
- Pages légales (priorité 0.3)
- 21 articles du blog (priorité 0.8)

### Configuration
- **Format** : XML standard conformément à sitemaps.org
- **Fréquence de mise à jour** : 
  - Accueil et Blog : `daily`
  - Articles : `monthly`
  - Pages statiques : `monthly` ou `yearly`
- **URL de base** : `https://numcafe.com`

### Soumission aux moteurs de recherche

#### Google Search Console
1. Connectez-vous à [Google Search Console](https://search.google.com/search-console)
2. Sélectionnez votre propriété
3. Allez dans "Sitemaps" (menu de gauche)
4. Ajoutez l'URL : `https://numcafe.com/sitemap.xml`
5. Cliquez sur "Soumettre"

#### Bing Webmaster Tools
1. Connectez-vous à [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sélectionnez votre site
3. Allez dans "Sitemaps"
4. Ajoutez : `https://numcafe.com/sitemap.xml`
5. Cliquez sur "Soumettre"

### Mise à jour du Sitemap
⚠️ **Important** : Lors de l'ajout de nouveaux articles, mettez à jour manuellement le fichier `/public/sitemap.xml` en ajoutant une nouvelle entrée `<url>` avec :
- La nouvelle URL de l'article
- La date de publication (`lastmod`)
- Changefreq : `monthly`
- Priority : `0.8`

## 🤖 Robots.txt

### Emplacement
`/public/robots.txt`

### Configuration actuelle

```txt
User-agent: *
Allow: /

# Optimisations pour Google et Bing
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bloquer les pages sans intérêt SEO
Disallow: /api/
Disallow: /*.json$

# Sitemap
Sitemap: https://numcafe.com/sitemap.xml
```

### Robots bloqués pour optimisation
- AhrefsBot (crawl-delay: 2)
- SemrushBot (crawl-delay: 2)
- MJ12bot (bloqué)

### Vérification
Testez votre robots.txt avec l'[outil de test Google](https://www.google.com/webmasters/tools/robots-testing-tool)

## 🏷️ Balises Meta & OpenGraph

### Composant SEOHead
Emplacement : `/components/SEOHead.tsx`

#### Fonctionnalités
- **Balises Meta standards** : title, description, keywords
- **OpenGraph** : og:title, og:description, og:type, og:image, og:url, og:locale, og:site_name
- **Twitter Cards** : twitter:card, twitter:title, twitter:description, twitter:image
- **Balises supplémentaires** : robots, author, language, canonical

#### Utilisation

```tsx
import { SEOHead } from "../components/SEOHead";

<SEOHead 
  title="Titre de la page | Numcafé"
  description="Description optimisée pour le SEO"
  keywords="mot-clé 1, mot-clé 2, mot-clé 3"
  ogImage="https://numcafe.com/image.jpg"
  ogType="article"
  canonical="https://numcafe.com/page"
  url="https://numcafe.com/page"
/>
```

### Balises OpenGraph par type de page

#### Page d'accueil
- **og:type** : `website`
- **og:image** : Image générique du site
- **og:url** : `https://numcafe.com/`

#### Articles de blog
- **og:type** : `article`
- **og:image** : Image spécifique de l'article
- **og:url** : `https://numcafe.com/article/{slug}`

## 📊 Données Structurées JSON-LD

### Composant StructuredData
Emplacement : `/components/StructuredData.tsx`

### Types de schémas implémentés

#### 1. WebSite Schema (Page d'accueil)
```tsx
<StructuredData type="website" />
```

Contient :
- Nom du site
- URL
- Description
- Logo
- Action de recherche
- Réseaux sociaux (sameAs)

#### 2. Organization Schema (Page d'accueil)
```tsx
<StructuredData type="organization" />
```

Contient :
- Informations sur l'organisation
- Logo
- Point de contact
- Réseaux sociaux

#### 3. Article Schema (Pages d'articles)
```tsx
<StructuredData 
  type="article" 
  data={{
    title: "Titre de l'article",
    description: "Description",
    image: "URL de l'image",
    author: "Nom de l'auteur",
    datePublished: "2025-11-28",
    dateModified: "2025-11-28",
    category: "Catégorie",
    url: "URL complète de l'article",
  }}
/>
```

### Validation des données structurées

Utilisez le [Test des résultats enrichis de Google](https://search.google.com/test/rich-results) pour valider vos schémas JSON-LD :

1. Entrez l'URL de votre page
2. Cliquez sur "Tester l'URL"
3. Vérifiez qu'il n'y a pas d'erreurs
4. Vérifiez que les données sont correctement reconnues

## 🎯 Mots-clés optimisés

### Mots-clés principaux
- actualité numérique
- tendances tech
- intelligence artificielle
- culture digitale
- nouveautés numériques
- innovations tech
- outils IA gratuits
- guides numériques
- café digital

### Stratégie par catégorie

#### Intelligence Artificielle
- IA générative
- ChatGPT
- automatisation
- outils IA
- machine learning

#### Développement Web
- React
- TypeScript
- performance web
- web development
- frontend

#### Design & UX
- UI/UX design
- design system
- UX writing
- prototypage
- wireframing

#### SEO & Référencement
- référencement naturel
- stratégie SEO
- mots-clés
- linking interne
- optimisation

#### Culture Digitale
- métavers
- NFT
- blockchain
- web3
- innovation

#### Productivité & Café
- productivité
- café
- méthode Pomodoro
- efficacité
- workspace

## 📈 Monitoring & Analytics

### Outils recommandés

#### Google Search Console
- Suivi de l'indexation
- Performances de recherche
- Core Web Vitals
- Couverture du sitemap

#### Google Analytics 4
- Trafic organique
- Comportement des utilisateurs
- Taux de conversion
- Pages de destination

#### Autres outils
- **Ahrefs** : Analyse de backlinks et mots-clés
- **SEMrush** : Audit SEO et suivi de positions
- **Screaming Frog** : Crawl technique du site
- **PageSpeed Insights** : Performance et Core Web Vitals

## ✅ Checklist SEO

### Configuration initiale
- [x] Sitemap XML créé et optimisé
- [x] Robots.txt configuré
- [x] Balises OpenGraph sur toutes les pages
- [x] Schémas JSON-LD implémentés
- [x] Meta descriptions uniques
- [x] Balises canonical

### Maintenance régulière
- [ ] Mettre à jour le sitemap lors de nouveaux articles
- [ ] Vérifier les erreurs dans Search Console
- [ ] Analyser les performances SEO mensuellement
- [ ] Optimiser les meta descriptions sous-performantes
- [ ] Surveiller les Core Web Vitals
- [ ] Mettre à jour les mots-clés selon les tendances

### Optimisations avancées
- [ ] Backlinks de qualité
- [ ] Guest posting sur sites pertinents
- [ ] Partage sur réseaux sociaux
- [ ] Newsletter pour engagement
- [ ] Optimisation des images (alt text, compression)
- [ ] Amélioration du temps de chargement

## 🔗 Ressources utiles

### Documentation officielle
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [OpenGraph Protocol](https://ogp.me/)
- [Sitemaps.org](https://www.sitemaps.org/)

### Outils de test
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Meta Tags Validator](https://metatags.io/)
- [Structured Data Testing Tool](https://validator.schema.org/)

## 🚀 Prochaines étapes

1. **Soumettre le sitemap** à Google Search Console et Bing
2. **Configurer Google Analytics 4** pour le suivi
3. **Créer une stratégie de contenu** basée sur les mots-clés
4. **Optimiser les images** avec alt text descriptif
5. **Construire des backlinks** de qualité
6. **Surveiller les performances** hebdomadairement

## 📞 Support

Pour toute question sur l'optimisation SEO de Numcafé, consultez la documentation technique ou contactez l'équipe via la page Contact du site.

---

**Dernière mise à jour** : 13 février 2026
**Responsable SEO** : Équipe Numcafé
