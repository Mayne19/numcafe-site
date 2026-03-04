# Guide de déploiement Numcafé

## 🎯 Objectif

Ce guide vous explique comment synchroniser votre code source Numcafé depuis Figma Make vers GitHub, puis le déployer sur Vercel.

## 📋 Prérequis

- Un compte GitHub actif
- Un compte Vercel (peut être lié à GitHub)
- Accès au code source dans Figma Make

## 🔄 Étape 1 : Créer un repository GitHub

### Option A : Via l'interface GitHub

1. Connectez-vous à [GitHub](https://github.com)
2. Cliquez sur le bouton **"New"** (en haut à gauche) ou **"+"** → **"New repository"**
3. Configurez votre repository :
   - **Repository name** : `numcafe` (ou le nom de votre choix)
   - **Description** : "Site Numcafé - Média digital moderne"
   - **Visibility** : Private ou Public (selon vos préférences)
   - **Ne cochez PAS** "Initialize this repository with a README"
4. Cliquez sur **"Create repository"**

### Option B : Via GitHub CLI

```bash
gh repo create numcafe --private --description "Site Numcafé - Média digital moderne"
```

## 📥 Étape 2 : Télécharger le code depuis Figma Make

### Méthode 1 : Téléchargement direct

1. Dans Figma Make, cherchez l'option **"Download"** ou **"Export project"**
2. Téléchargez le projet complet en format ZIP
3. Décompressez le fichier sur votre ordinateur

### Méthode 2 : Copier manuellement

Si le téléchargement n'est pas disponible :
1. Créez un dossier local nommé `numcafe`
2. Copiez tous les fichiers de votre projet Figma Make dans ce dossier

## 🚀 Étape 3 : Initialiser Git et pousser vers GitHub

### 1. Ouvrir le terminal

**Windows** : 
- Git Bash ou PowerShell
- Naviguez vers votre dossier : `cd chemin/vers/numcafe`

**Mac/Linux** :
- Terminal
- Naviguez vers votre dossier : `cd chemin/vers/numcafe`

### 2. Initialiser le repository Git

```bash
# Initialiser Git dans le dossier
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Site Numcafé avec SEO optimisé"
```

### 3. Lier au repository GitHub

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub :

```bash
# Ajouter l'origine remote
git remote add origin https://github.com/VOTRE_USERNAME/numcafe.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

### 4. Vérification

Rafraîchissez la page de votre repository GitHub - vous devriez voir tous vos fichiers !

## ⚡ Étape 4 : Déployer sur Vercel

### Option A : Via l'interface Vercel (Recommandé)

#### 1. Connexion à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** ou **"Login"**
3. Choisissez **"Continue with GitHub"** pour lier vos comptes

#### 2. Importer le projet

1. Une fois connecté, cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez votre repository GitHub `numcafe`
3. Cliquez sur **"Import"**

#### 3. Configurer le projet

Vercel détecte automatiquement qu'il s'agit d'un projet Vite. Vérifiez :

- **Framework Preset** : Vite
- **Root Directory** : `./` (racine)
- **Build Command** : `npm run build` ou `vite build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`

#### 4. Variables d'environnement (optionnel)

Si votre projet utilise des variables d'environnement :
1. Cliquez sur **"Environment Variables"**
2. Ajoutez vos variables (format : `NOM_VARIABLE` = `valeur`)

#### 5. Déployer

1. Cliquez sur **"Deploy"**
2. Attendez la fin du build (1-3 minutes généralement)
3. Une fois terminé, Vercel vous donne une URL de production !

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions interactives
```

## 🌐 Étape 5 : Configurer le domaine personnalisé (Optionnel)

### Si vous avez un nom de domaine (ex: numcafe.com)

1. Dans Vercel, allez dans votre projet
2. Cliquez sur **"Settings"** → **"Domains"**
3. Ajoutez votre domaine : `numcafe.com`
4. Suivez les instructions pour configurer les DNS :
   - **Type A** : Pointez vers l'IP de Vercel
   - **Type CNAME** : `cname.vercel-dns.com`

5. Attendez la propagation DNS (jusqu'à 48h, souvent 1-2h)

### Configuration DNS chez votre registrar

Exemple pour Cloudflare, OVH, GoDaddy, etc. :

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔧 Étape 6 : Vérifications post-déploiement

### 1. Tester le site

Visitez votre URL Vercel (ex: `numcafe.vercel.app`)

✅ Vérifiez :
- La page d'accueil se charge
- Le blog affiche les articles
- Les liens de navigation fonctionnent
- Le design s'affiche correctement
- Le site est responsive

### 2. Vérifier le SEO

#### Sitemap
Testez : `https://votre-domaine.com/sitemap.xml`

#### Robots.txt
Testez : `https://votre-domaine.com/robots.txt`

#### Balises Meta
Utilisez l'outil : [metatags.io](https://metatags.io) pour prévisualiser

#### Données structurées
Testez avec : [Rich Results Test](https://search.google.com/test/rich-results)

### 3. Soumettre aux moteurs de recherche

#### Google Search Console
1. Allez sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajoutez votre propriété
3. Vérifiez la propriété (méthode DNS ou fichier HTML)
4. Soumettez le sitemap : `https://votre-domaine.com/sitemap.xml`

#### Bing Webmaster Tools
1. Allez sur [bing.com/webmasters](https://www.bing.com/webmasters)
2. Ajoutez votre site
3. Soumettez le sitemap

## 🔄 Mises à jour futures

### Workflow de mise à jour

1. **Modifier le code** localement ou dans Figma Make
2. **Télécharger** les modifications si nécessaire
3. **Commiter** les changements :

```bash
git add .
git commit -m "Description de vos modifications"
git push origin main
```

4. **Vercel redéploie automatiquement** dès le push !

### Déploiement automatique

✨ **Avantage Vercel** : Chaque fois que vous poussez du code vers GitHub, Vercel redéploie automatiquement votre site.

## 📊 Surveillance et Analytics

### Activer Vercel Analytics

1. Dans votre projet Vercel
2. Allez dans **"Analytics"**
3. Activez **Vercel Analytics**
4. Cela vous donnera des métriques de performance

### Configurer Google Analytics

Ajoutez le code de suivi dans `/index.html` (entre les balises `<head>`) :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🛠️ Résolution de problèmes

### Problème : Build échoue sur Vercel

**Solution** :
1. Vérifiez les logs de build dans Vercel
2. Assurez-vous que toutes les dépendances sont dans `package.json`
3. Testez le build localement : `npm run build`

### Problème : Le site ne charge pas correctement

**Solution** :
1. Vérifiez la console du navigateur (F12)
2. Regardez les erreurs réseau
3. Vérifiez que les chemins des assets sont corrects

### Problème : Le sitemap n'est pas accessible

**Solution** :
1. Vérifiez que `/public/sitemap.xml` existe
2. Assurez-vous que le dossier `public` est bien configuré dans Vite
3. Redéployez si nécessaire

### Problème : Git push refusé

**Solution** :
```bash
# Forcer le push (utiliser avec précaution)
git push -f origin main

# Ou récupérer les changements distants d'abord
git pull origin main --rebase
git push origin main
```

## 📞 Support

### Documentation officielle
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Guides](https://guides.github.com/)
- [Vite Documentation](https://vitejs.dev/)

### Communauté
- Discord Vercel
- GitHub Community
- Stack Overflow

## ✅ Checklist finale

- [ ] Repository GitHub créé
- [ ] Code source poussé sur GitHub
- [ ] Projet déployé sur Vercel
- [ ] Site accessible via URL Vercel
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible
- [ ] Sitemap soumis à Google Search Console
- [ ] Sitemap soumis à Bing Webmaster Tools
- [ ] Google Analytics configuré (optionnel)
- [ ] Tests de performance effectués

## 🎉 Félicitations !

Votre site Numcafé est maintenant en ligne et optimisé pour le SEO !

---

**Dernière mise à jour** : 13 février 2026
**Auteur** : Équipe Numcafé
