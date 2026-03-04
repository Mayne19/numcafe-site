# 📂 Structure du projet Numcafé

## 🌳 Arborescence complète

```
numcafe/
│
├── 📄 Configuration racine
│   ├── .gitignore                   # Fichiers ignorés par Git
│   ├── .env.example                 # Template variables d'environnement
│   ├── package.json                 # Dépendances et scripts
│   ├── vite.config.ts              # Configuration Vite
│   ├── tsconfig.json               # Configuration TypeScript
│   ├── vercel.json                 # Configuration déploiement Vercel
│   ├── index.html                  # Point d'entrée HTML
│   ├── main.tsx                    # Point d'entrée React
│   └── App.tsx                     # Composant racine React
│
├── 📚 Documentation
│   ├── README.md                   # Documentation principale
│   ├── CHANGELOG.md                # 🆕 Historique des changements
│   ├── QUICK_START.md              # 🆕 Démarrage rapide
│   ├── GITHUB_SYNC_GUIDE.md        # 🆕 Guide GitHub et Vercel
│   ├── POST_DOWNLOAD_GUIDE.md      # 🆕 Guide post-téléchargement
│   ├── MISE_EN_PRODUCTION.md       # 🆕 Checklist production
│   ├── STRUCTURE_PROJET.md         # 🆕 Ce fichier
│   ├── SEO_DOCUMENTATION.md        # Documentation SEO
│   ├── SEO_OPTIMISATIONS_RECAP.md  # Récap optimisations SEO
│   ├── GUIDE_DEPLOIEMENT.md        # Guide déploiement
│   ├── CHECKLIST_PRODUCTION.md     # Checklist production
│   ├── DEMARRAGE_RAPIDE.md         # Guide démarrage rapide
│   ├── CONFIGURATION_VITE_FINALE.md # Config Vite
│   ├── SUPABASE_SETUP.md           # Setup Supabase (optionnel)
│   └── Attributions.md             # Attributions
│
├── 🧩 Components (/components)
│   ├── 🆕 SocialShare.tsx          # Partage sur réseaux sociaux
│   ├── 🆕 NewsletterSubscribe.tsx  # Inscription newsletter
│   ├── 🆕 Comments.tsx             # Système de commentaires
│   ├── 🔄 ArticlePage.tsx          # Page article (mise à jour)
│   ├── AboutPage.tsx               # Composant page À propos
│   ├── AuthorModal.tsx             # Modal auteur
│   ├── BlogPage.tsx                # Composant page Blog
│   ├── CategoryDescription.tsx     # Description catégorie
│   ├── Footer.tsx                  # Pied de page
│   ├── Header.tsx                  # En-tête
│   ├── HomePage.tsx                # Composant page Accueil
│   ├── LanguageSelector.tsx        # Sélecteur langue
│   ├── Layout.tsx                  # Layout général
│   ├── LoadingScreen.tsx           # Écran de chargement
│   ├── RelatedArticle.tsx          # Article similaire
│   ├── SEOHead.tsx                 # Composant SEO head
│   ├── ScrollToTop.tsx             # Scroll to top navigation
│   ├── ScrollToTopButton.tsx       # Bouton scroll to top
│   ├── StructuredData.tsx          # Données structurées JSON-LD
│   │
│   ├── 🎨 UI Components (/components/ui)
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   ├── use-mobile.ts
│   │   └── utils.ts
│   │
│   └── 🖼️ Figma Components (/components/figma)
│       └── ImageWithFallback.tsx   # Composant image avec fallback
│
├── 📄 Pages (/pages)
│   ├── Home.tsx                    # Page d'accueil
│   ├── Blog.tsx                    # Page liste des articles
│   ├── Article.tsx                 # Page article (wrapper)
│   ├── About.tsx                   # Page à propos
│   ├── Contact.tsx                 # Page contact
│   ├── LegalNotice.tsx            # Mentions légales
│   ├── PrivacyPolicy.tsx          # Politique de confidentialité
│   └── NotFound.tsx               # Page 404
│
├── 💾 Data (/data)
│   ├── articles.ts                 # 18 articles complets
│   └── authors.ts                  # Informations auteurs
│
├── 🌐 Internationalisation (/i18n)
│   ├── LanguageContext.tsx         # Context React pour i18n
│   └── translations.ts             # Traductions FR/EN
│
├── 🎨 Styles (/styles)
│   └── globals.css                 # Tailwind + styles globaux
│
├── 📁 Public (/public)
│   ├── sitemap.xml                # Sitemap SEO
│   ├── robots.txt                 # Robots SEO
│   └── 🆕 favicon.svg             # Favicon du site
│
├── 🔧 Guidelines (/guidelines)
│   └── Guidelines.md              # Guidelines du projet
│
├── 🗄️ Supabase (optionnel) (/supabase)
│   ├── functions/
│   │   └── server/
│   │       ├── index.tsx
│   │       └── kv_store.tsx
│   └── supabase_example_article.sql
│
└── 🛠️ Utils (/utils)
    └── supabase/
        └── info.tsx               # Info Supabase
```

## 📊 Statistiques du projet

### Fichiers par type
- **TypeScript/TSX :** ~90 fichiers
- **Documentation (MD) :** 14 fichiers
- **Configuration :** 6 fichiers
- **Données :** 2 fichiers
- **Styles :** 1 fichier
- **HTML :** 1 fichier
- **Public :** 3 fichiers

### Lignes de code (estimation)
- **Components :** ~5000 lignes
- **Pages :** ~1500 lignes
- **Data :** ~2500 lignes (articles)
- **Utils/Config :** ~500 lignes
- **Documentation :** ~8000 lignes

### Taille estimée
- **Total projet :** ~30-40 MB (avec node_modules)
- **Build production :** ~500 KB (gzippé)
- **Documentation :** ~100 KB

## 🎯 Fichiers clés par fonctionnalité

### 🚀 Déploiement
```
/.gitignore              → Exclusions Git
/vercel.json            → Config Vercel
/package.json           → Dépendances
/vite.config.ts         → Build config
```

### 📱 Fonctionnalités sociales (NOUVEAU)
```
/components/SocialShare.tsx         → Partage FB, Twitter, LinkedIn
/components/NewsletterSubscribe.tsx → Inscription newsletter
/components/Comments.tsx            → Système commentaires
/components/ArticlePage.tsx         → Intégration des 3 composants
```

### 🎨 Design et Layout
```
/components/Layout.tsx     → Layout principal
/components/Header.tsx     → Navigation
/components/Footer.tsx     → Pied de page
/styles/globals.css        → Styles Tailwind
```

### 📄 Contenu
```
/data/articles.ts          → 18 articles
/data/authors.ts           → Auteurs
/pages/*.tsx               → Pages du site
```

### 🔍 SEO
```
/public/sitemap.xml                → Sitemap
/public/robots.txt                 → Robots
/components/SEOHead.tsx            → Meta tags
/components/StructuredData.tsx     → JSON-LD
```

### 📚 Documentation
```
/QUICK_START.md            → Démarrage rapide ⚡
/POST_DOWNLOAD_GUIDE.md    → Guide complet 📖
/GITHUB_SYNC_GUIDE.md      → GitHub + Vercel 🚀
/MISE_EN_PRODUCTION.md     → Checklist prod ✅
/README.md                 → Doc principale 📘
/CHANGELOG.md              → Historique 📝
```

## 🔄 Flux de données

### Navigation utilisateur
```
index.html
    ↓
main.tsx (Bootstrap React)
    ↓
App.tsx (Router + Toaster + Language)
    ↓
Layout (Header + Content + Footer)
    ↓
Pages (Home, Blog, Article, etc.)
    ↓
Components (ArticlePage, SocialShare, etc.)
```

### Données article
```
/data/articles.ts (Source statique)
    ↓
getArticleBySlug() / getAllArticles()
    ↓
ArticlePage component
    ↓
SocialShare + Newsletter + Comments
    ↓
localStorage (Newsletter, Comments)
```

### SEO et Meta
```
Page component
    ↓
SEOHead component (meta tags)
    ↓
StructuredData component (JSON-LD)
    ↓
<head> de la page
```

## 🧩 Dépendances entre composants

### Composants parents
```
App.tsx
├── LanguageProvider (context)
├── Toaster (notifications)
├── LoadingScreen
└── Router
    └── Layout
        ├── Header
        │   └── LanguageSelector
        ├── Pages (content)
        └── Footer
```

### Composant ArticlePage (détail)
```
ArticlePage
├── ImageWithFallback (header image)
├── ReactMarkdown (content)
├── SocialShare 🆕
├── NewsletterSubscribe 🆕
├── Comments 🆕
└── RelatedArticle[] (recommandations)
```

## 📦 Bundles de production

### Main bundle
- App.tsx + routing
- Layout components
- Pages
- **Taille :** ~150 KB

### Vendor bundle
- React + React DOM
- React Router
- Motion
- **Taille :** ~200 KB

### Components bundle
- UI components
- Utility functions
- **Taille :** ~100 KB

### Data bundle
- Articles
- Authors
- **Taille :** ~50 KB

## 🎨 Système de design

### Couleurs (globals.css)
```css
--color-primary: #C69C6D
--color-dark: #1D1D1D
--color-light: #FFFFFF
--color-bg-secondary: #F5F5F5
--color-text-secondary: #555555
```

### Typographie
```
Font family: Poppins (Google Fonts)
Weights: 300, 400, 500, 600, 700
```

### Spacing
```
Conteneur max-width: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
```

### Breakpoints Tailwind
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## 🔐 Sécurité

### Fichiers sensibles (gitignore)
```
.env                  → Variables d'environnement
node_modules/         → Dépendances
dist/                 → Build
.vercel/              → Config Vercel locale
```

### Headers HTTP (vercel.json)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

## 🧪 Tests recommandés

### Tests manuels
1. **Navigation** - Toutes les pages accessibles
2. **Articles** - 18 articles s'ouvrent correctement
3. **Partage social** - Tous les boutons fonctionnent
4. **Newsletter** - Inscription réussie
5. **Commentaires** - Ajout/suppression/persistance
6. **Responsive** - Mobile, tablet, desktop
7. **SEO** - Sitemap, robots, meta tags

### Tests automatisés (à implémenter)
- Unit tests (Vitest)
- Component tests (React Testing Library)
- E2E tests (Playwright)

## 📈 Métriques cibles

### Performance
- Lighthouse Score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Total Bundle Size < 500 KB

### SEO
- Google PageSpeed SEO > 95
- Rich Results validés
- Sitemap indexé
- Robots.txt valide

### Accessibilité
- WCAG 2.1 AA compliant
- Lighthouse Accessibility > 90
- Keyboard navigation complète
- Screen reader compatible

## 🚀 Workflow de développement

### Développement local
```bash
npm install           # Installation
npm run dev          # Dev server (port 3000)
# Modifier les fichiers
# Hot reload automatique
```

### Build et test
```bash
npm run build        # Build production
npm run preview      # Test du build
```

### Déploiement
```bash
git add .
git commit -m "message"
git push             # Auto-deploy sur Vercel
```

## 🎯 Points d'entrée

### Pour le développement
1. **Ajouter un article** → `/data/articles.ts`
2. **Modifier un composant** → `/components/`
3. **Ajouter une page** → `/pages/` + route dans `App.tsx`
4. **Modifier les styles** → `/styles/globals.css`

### Pour le contenu
1. **Articles** → `/data/articles.ts`
2. **Auteurs** → `/data/authors.ts`
3. **Traductions** → `/i18n/translations.ts`
4. **SEO** → `SEOHead.tsx` + `StructuredData.tsx`

### Pour le déploiement
1. **Configuration** → `vercel.json`, `package.json`
2. **Build** → `vite.config.ts`
3. **Documentation** → Fichiers `.md`
4. **Tests** → Suivre les guides

---

## ✅ Résumé

**Structure organisée et professionnelle**
- 📁 Séparation claire des responsabilités
- 🎨 Design system cohérent
- 📚 Documentation exhaustive
- 🔧 Configuration complète
- 🚀 Prêt pour la production

**Total : ~100 fichiers organisés pour un site complet et optimisé**

---

*Dernière mise à jour : Février 2026*
