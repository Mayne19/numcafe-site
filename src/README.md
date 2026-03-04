# Numcafé - Média Digital Moderne

Site web complet pour "Numcafé", un média digital moderne en français, avec un design minimaliste et professionnel.

## 🎨 Design

- Couleurs : `#C69C6D` (accent café), `#1D1D1D`, `#FFFFFF`
- Typographie : Poppins
- Design aéré avec formes, couleurs et illustrations simples
- Responsive sur tous les appareils

## ✨ Fonctionnalités

### Pages principales
- 🏠 **Accueil** - Présentation et articles en vedette
- 📰 **Blog** - 18 articles complets sur le numérique et la tech
- 👥 **À propos** - Présentation de Numcafé
- 📧 **Contact** - Formulaire de contact
- ⚖️ **Mentions légales** - Informations légales

### Fonctionnalités des articles
- 📱 **Partage social** - Facebook, Twitter, LinkedIn, Email, Copie de lien
- 📬 **Newsletter** - Inscription à la newsletter
- 💬 **Commentaires** - Système de commentaires avec localStorage
- 🔗 **Articles similaires** - Recommandations automatiques

### SEO optimisé
- ✅ Sitemap.xml généré
- ✅ Robots.txt configuré
- ✅ Balises OpenGraph et Twitter Cards
- ✅ Schémas JSON-LD (Article, Organization, BreadcrumbList)
- ✅ Meta descriptions personnalisées
- ✅ URLs sémantiques

## 📦 Stack technique

- **Framework** : React 18 + Vite 5
- **Styling** : Tailwind CSS 4
- **Routing** : React Router 7
- **TypeScript** : 5.5
- **Icons** : Lucide React
- **Markdown** : React Markdown
- **Notifications** : Sonner

## 🚀 Installation

### 1. Cloner et installer

```bash
git clone https://github.com/USERNAME/numcafe.git
cd numcafe
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur http://localhost:3000

### 3. Build pour production

```bash
npm run build
npm run preview  # Pour tester le build localement
```

## 📁 Structure du projet

```
numcafe/
├── components/              # Composants React
│   ├── SocialShare.tsx      # Partage social
│   ├── NewsletterSubscribe.tsx  # Newsletter
│   ├── Comments.tsx         # Commentaires
│   ├── ArticlePage.tsx      # Page d'article complète
│   ├── Header.tsx           # En-tête
│   ├── Footer.tsx           # Pied de page
│   └── ...
├── data/
│   ├── articles.ts          # 18 articles complets
│   └── authors.ts           # Auteurs
├── pages/
│   ├── Home.tsx             # Page d'accueil
│   ├── Blog.tsx             # Liste des articles
│   ├── Article.tsx          # Page article (utilise ArticlePage)
│   ├── About.tsx            # À propos
│   └── Contact.tsx          # Contact
├── public/
│   ├── sitemap.xml          # SEO
│   └── robots.txt           # SEO
├── styles/
│   └── globals.css          # Tailwind + styles globaux
├── .gitignore
├── vercel.json              # Configuration Vercel
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Déploiement

### Déploiement rapide sur Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Poussez votre code sur GitHub
2. Importez le repository dans Vercel
3. Vercel détectera automatiquement Vite
4. Cliquez sur "Deploy"

**Configuration automatique :**
- Build Command : `npm run build`
- Output Directory : `dist`
- Install Command : `npm install`

### Guide complet

📖 Voir le fichier `/GITHUB_SYNC_GUIDE.md` pour un guide détaillé de synchronisation GitHub et déploiement Vercel.

## 📊 SEO et Performance

### Optimisations incluses
- ✅ Code splitting automatique
- ✅ Lazy loading des composants
- ✅ Compression des assets
- ✅ Source maps désactivées en production
- ✅ Sitemap XML généré
- ✅ Données structurées JSON-LD
- ✅ Meta tags optimisés

### Tester les performances

```bash
# Build de production
npm run build

# Tests recommandés
- Google PageSpeed Insights
- Google Rich Results Test
- Lighthouse (Chrome DevTools)
```

## 🔧 Configuration

### Tailwind CSS 4

Le projet utilise Tailwind CSS 4 avec le plugin Vite. Les styles globaux et tokens sont définis dans `/styles/globals.css`.

### React Router

Navigation avec React Router 7 en mode Data Router pour une meilleure gestion de l'état et des transitions.

## 💾 Stockage des données

### Frontend seulement (version actuelle)
- **Newsletter :** localStorage (côté client)
- **Commentaires :** localStorage (côté client)
- **Articles :** Fichiers statiques TypeScript

### Migration vers backend (optionnel)

Pour une version production avec backend :
1. Configurer une base de données (Supabase, Firebase)
2. Créer une API pour les commentaires
3. Intégrer un service d'email marketing (Mailchimp, SendGrid)

Voir `/MISE_EN_PRODUCTION.md` pour plus de détails.

## 🛠️ Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build pour production
npm run preview  # Preview du build
npm run lint     # Linter (si configuré)
```

## 📝 Articles

Le projet inclut 18 articles complets sur des thématiques :
- 🤖 Intelligence Artificielle
- 💻 Technologie
- 🌐 Numérique et société
- 🔒 Cybersécurité
- 🎮 Gaming et Metaverse
- 📱 Innovation digitale

Tous les articles sont dans `/data/articles.ts` avec :
- Contenu complet en Markdown
- Meta descriptions SEO
- Images optimisées
- Catégories et tags
- Temps de lecture

## 🤝 Contribution

Ce projet est configuré avec :
- ESLint (linting)
- TypeScript (typage fort)
- Prettier (formatage - à configurer)

## 🔒 Sécurité

- ✅ Pas de données sensibles dans le code
- ✅ `.gitignore` configuré
- ✅ Headers de sécurité dans `vercel.json`
- ✅ Validation des formulaires côté client

## 📄 Documentation complète

- 📘 **GITHUB_SYNC_GUIDE.md** - Guide de synchronisation GitHub et déploiement
- 📗 **MISE_EN_PRODUCTION.md** - Checklist complète de mise en production
- 📙 **SEO_DOCUMENTATION.md** - Documentation SEO détaillée
- 📕 **GUIDE_DEPLOIEMENT.md** - Guide de déploiement complet

## 📞 Support

Pour toute question ou problème :
1. Consultez la documentation dans les fichiers MD
2. Vérifiez les issues GitHub
3. Contactez l'équipe Numcafé

## 📝 Licence

© 2026 Numcafé. Tous droits réservés.

---

**Développé avec ❤️ et ☕ par l'équipe Numcafé**