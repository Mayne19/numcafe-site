# 🚀 Guide Post-Téléchargement - Numcafé

Vous venez de télécharger le code source de Numcafé depuis Figma Make. Suivez ce guide pour synchroniser vers GitHub et déployer sur Vercel.

## 📥 Étape 1 : Extraction et préparation

1. **Extraire le ZIP téléchargé**
   ```bash
   # Extraire dans un dossier de votre choix
   unzip numcafe-figma-make.zip -d ~/numcafe
   cd ~/numcafe
   ```

2. **Vérifier que tous les fichiers sont présents**
   - [ ] `/components/` avec tous les composants
   - [ ] `/data/articles.ts` avec les 18 articles
   - [ ] `/public/sitemap.xml` et `/public/robots.txt`
   - [ ] `/package.json`, `/vite.config.ts`, `/tsconfig.json`
   - [ ] `/index.html` et `/main.tsx`
   - [ ] `/.gitignore` et `/vercel.json`
   - [ ] Fichiers de documentation (`.md`)

## 🔧 Étape 2 : Installation locale (optionnel mais recommandé)

Testez le projet en local avant de pousser sur GitHub :

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez http://localhost:3000 et vérifiez :
- [ ] La page d'accueil s'affiche correctement
- [ ] Le blog affiche les 18 articles
- [ ] Les articles individuels s'ouvrent
- [ ] Le partage social, newsletter et commentaires fonctionnent

**Si tout fonctionne, continuez ! 🎉**

## 🌐 Étape 3 : Créer le repository GitHub

### Option A : Via l'interface web GitHub

1. Allez sur https://github.com/new
2. **Repository name :** `numcafe`
3. **Description :** "Numcafé - Média digital moderne en français"
4. **Visibility :** Public ou Private (votre choix)
5. ⚠️ **NE PAS** cocher "Add a README file"
6. ⚠️ **NE PAS** cocher "Add .gitignore"
7. ⚠️ **NE PAS** choisir une licence pour l'instant
8. Cliquez sur **"Create repository"**

### Option B : Via GitHub CLI (si installé)

```bash
gh repo create numcafe --public --description "Numcafé - Média digital moderne en français"
```

## 📤 Étape 4 : Pousser le code sur GitHub

Dans votre terminal, depuis le dossier `~/numcafe` :

```bash
# 1. Initialiser Git (si pas déjà fait)
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Vérifier ce qui va être commité
git status

# 4. Créer le premier commit
git commit -m "Initial commit - Numcafé complet avec SEO et fonctionnalités sociales

- 5 pages principales (Accueil, Blog, À propos, Contact, Mentions légales)
- 18 articles de blog complets
- Partage social (Facebook, Twitter, LinkedIn, Email)
- Newsletter avec inscription
- Système de commentaires
- Optimisations SEO complètes (sitemap, robots.txt, meta tags, JSON-LD)
- Design responsive et moderne
- Configuration Vite et Vercel incluse"

# 5. Renommer la branche en main
git branch -M main

# 6. Ajouter le remote GitHub (REMPLACEZ 'USERNAME' par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/numcafe.git

# 7. Pousser vers GitHub
git push -u origin main
```

**✅ Votre code est maintenant sur GitHub !**

Vérifiez sur https://github.com/USERNAME/numcafe que tous les fichiers sont bien présents.

## 🚀 Étape 5 : Déployer sur Vercel

### Option A : Import depuis l'interface Vercel (Recommandé)

1. **Aller sur Vercel**
   - https://vercel.com/login
   - Connectez-vous (ou créez un compte)

2. **Créer un nouveau projet**
   - Cliquez sur "Add New..." → "Project"
   - Cliquez sur "Import Git Repository"
   - Autorisez Vercel à accéder à GitHub si nécessaire
   - Sélectionnez le repository `numcafe`

3. **Configuration du projet**
   - **Project Name :** `numcafe` (ou laissez par défaut)
   - **Framework Preset :** Vercel détectera automatiquement "Vite"
   - **Root Directory :** `./` (laisser par défaut)
   - **Build and Output Settings :**
     - Build Command : `npm run build` (détecté automatiquement)
     - Output Directory : `dist` (détecté automatiquement)
     - Install Command : `npm install` (détecté automatiquement)

4. **Environment Variables** (optionnel pour l'instant)
   - Vous pouvez laisser vide pour le moment
   - À ajouter plus tard si vous migrez vers un backend

5. **Deploy**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes pendant le build

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les prompts :
# ? Set up and deploy "~/numcafe"? [Y/n] y
# ? Which scope do you want to deploy to? [Votre compte]
# ? Link to existing project? [y/N] n
# ? What's your project's name? numcafe
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n
```

## ✅ Étape 6 : Vérifications post-déploiement

Une fois le déploiement terminé, vous recevrez une URL comme :
`https://numcafe-xxxxx.vercel.app`

### Checklist de vérification

Testez ces éléments :

#### Pages principales
- [ ] Accueil : https://votre-url.vercel.app/
- [ ] Blog : https://votre-url.vercel.app/blog
- [ ] À propos : https://votre-url.vercel.app/about
- [ ] Contact : https://votre-url.vercel.app/contact

#### SEO
- [ ] Sitemap : https://votre-url.vercel.app/sitemap.xml
- [ ] Robots : https://votre-url.vercel.app/robots.txt

#### Fonctionnalités
1. **Ouvrir un article depuis le blog**
2. **Tester le partage social :**
   - [ ] Bouton Facebook ouvre une popup
   - [ ] Bouton Twitter ouvre une popup
   - [ ] Bouton LinkedIn ouvre une popup
   - [ ] Bouton Email ouvre le client mail
   - [ ] Bouton "Copier le lien" affiche une notification

3. **Tester la newsletter :**
   - [ ] Entrer un email et cliquer sur "S'abonner"
   - [ ] Vérifier la notification de succès
   - [ ] Réessayer avec le même email → message "déjà inscrit"

4. **Tester les commentaires :**
   - [ ] Remplir le formulaire et publier un commentaire
   - [ ] Vérifier que le commentaire s'affiche
   - [ ] Recharger la page → le commentaire est toujours là
   - [ ] Supprimer le commentaire

#### Performance et SEO
- [ ] Tester sur [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Tester sur [Google Rich Results Test](https://search.google.com/test/rich-results)

## 🎯 Prochaines étapes

### Déploiements automatiques configurés ✅

Vercel a automatiquement configuré les déploiements automatiques :
- Chaque push sur `main` → déploiement en production
- Chaque pull request → preview deployment

### Ajouter un domaine personnalisé (optionnel)

1. Dans Vercel Dashboard → votre projet
2. Settings → Domains
3. Ajouter votre domaine (ex: `numcafe.fr`)
4. Suivre les instructions DNS
5. Vercel configurera automatiquement HTTPS

### Configurer Analytics (optionnel)

**Vercel Analytics (recommandé - gratuit)**
1. Project Settings → Analytics
2. Enable Analytics
3. Aucun code à ajouter !

**Google Analytics**
1. Créer une propriété GA4
2. Copier l'ID de mesure (G-XXXXXXXXXX)
3. Ajouter à votre code dans `/index.html`

## 🔄 Workflow de mise à jour

Pour mettre à jour le site après des modifications dans Figma Make :

```bash
# 1. Télécharger le nouveau code depuis Figma Make
# 2. Remplacer les fichiers dans ~/numcafe
# 3. Vérifier les changements
git status
git diff

# 4. Ajouter et commiter
git add .
git commit -m "Mise à jour: [description des changements]"

# 5. Pousser vers GitHub
git push

# Vercel redéploiera automatiquement ! 🎉
```

## ❓ Dépannage

### Erreur : "Git repository not found"
```bash
# Vérifier que vous êtes dans le bon dossier
pwd

# Vérifier que Git est initialisé
git status
```

### Erreur : "Permission denied" lors du push
```bash
# Vérifier votre remote
git remote -v

# Si besoin, utiliser HTTPS avec token
git remote set-url origin https://TOKEN@github.com/USERNAME/numcafe.git
```

### Build échoue sur Vercel
1. Vérifier les logs dans Vercel Dashboard
2. Tester le build localement :
   ```bash
   npm run build
   ```
3. Vérifier que `package.json` est correct

### Images ne s'affichent pas
1. Vérifier que le dossier `public/` a été poussé sur GitHub
2. Vérifier les URLs dans le code

## 📚 Documentation complète

- 📘 **GITHUB_SYNC_GUIDE.md** - Guide détaillé GitHub et Vercel
- 📗 **MISE_EN_PRODUCTION.md** - Checklist de production complète
- 📙 **README.md** - Documentation principale du projet

## 🎉 Félicitations !

Votre site Numcafé est maintenant :
- ✅ Versionné sur GitHub
- ✅ Déployé sur Vercel
- ✅ Accessible publiquement
- ✅ Configuré pour les déploiements automatiques

**URL de votre site :** https://numcafe-xxxxx.vercel.app

Partagez-le avec le monde ! 🌍☕

---

**Besoin d'aide ?** Consultez les fichiers de documentation ou la documentation officielle de Vercel et GitHub.
