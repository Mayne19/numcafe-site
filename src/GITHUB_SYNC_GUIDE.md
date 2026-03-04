# Guide de synchronisation GitHub et déploiement Vercel

## 📋 Prérequis

- Un compte GitHub
- Un compte Vercel
- Git installé localement
- Node.js 18+ installé

## 🚀 Étape 1 : Créer un repository GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur "New repository"
3. Nom du repository : `numcafe`
4. Description : "Numcafé - Média digital moderne en français"
5. Choisissez "Public" ou "Private"
6. **NE PAS** initialiser avec README, .gitignore ou license
7. Cliquez sur "Create repository"

## 📦 Étape 2 : Préparer le code localement

### Télécharger le code depuis Figma Make

1. Dans Figma Make, cliquez sur le bouton "Download" ou "Export"
2. Téléchargez tout le projet en ZIP
3. Extrayez le ZIP dans un dossier local, par exemple : `~/numcafe`

### Initialiser Git

Ouvrez un terminal dans le dossier du projet :

```bash
cd ~/numcafe

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Numcafé site complet avec optimisations SEO"

# Ajouter le repository distant (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/numcafe.git

# Renommer la branche en main
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

## 🌐 Étape 3 : Déployer sur Vercel

### Option A : Depuis le site Vercel (Recommandé)

1. Allez sur [Vercel](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub `numcafe`
4. Vercel détectera automatiquement que c'est un projet Vite
5. **Configurations importantes :**
   - **Framework Preset :** Vite
   - **Build Command :** `npm run build`
   - **Output Directory :** `dist`
   - **Install Command :** `npm install`
6. Cliquez sur "Deploy"

### Option B : Depuis la CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions :
# - Link to existing project? No
# - Project name: numcafe
# - Directory: ./
# - Override settings? No
```

## ✅ Vérifications post-déploiement

Une fois déployé, vérifiez :

### 1. Pages principales
- ✅ Page d'accueil : `https://votre-site.vercel.app/`
- ✅ Blog : `https://votre-site.vercel.app/blog`
- ✅ À propos : `https://votre-site.vercel.app/about`
- ✅ Contact : `https://votre-site.vercel.app/contact`

### 2. Fichiers SEO
- ✅ Sitemap : `https://votre-site.vercel.app/sitemap.xml`
- ✅ Robots : `https://votre-site.vercel.app/robots.txt`

### 3. Articles
Testez quelques articles pour vérifier :
- ✅ Affichage correct
- ✅ Partage social fonctionne
- ✅ Newsletter s'affiche
- ✅ Commentaires fonctionnent

### 4. SEO
Utilisez ces outils :
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Vérifiez les balises meta avec l'inspecteur de votre navigateur

## 🔄 Workflow de mise à jour

Pour mettre à jour le site après des modifications :

```bash
# 1. Télécharger le nouveau code depuis Figma Make
# 2. Remplacer les fichiers dans votre dossier local
# 3. Vérifier les changements
git status

# 4. Ajouter les modifications
git add .

# 5. Créer un commit
git commit -m "Description des modifications"

# 6. Pousser vers GitHub
git push

# Vercel redéploiera automatiquement !
```

## 🎯 Configuration du domaine personnalisé (Optionnel)

1. Dans Vercel, allez dans Project Settings > Domains
2. Ajoutez votre domaine personnalisé (ex: `numcafe.fr`)
3. Suivez les instructions pour configurer les DNS
4. Vercel configurera automatiquement le HTTPS

## 🛠️ Dépannage

### Erreur de build

Si le build échoue sur Vercel :

1. Vérifiez les logs dans Vercel Dashboard
2. Assurez-vous que `package.json` est présent
3. Testez le build localement :
   ```bash
   npm install
   npm run build
   ```

### Pages 404

Si vous obtenez des erreurs 404 sur les routes :

1. Vérifiez que `vercel.json` est présent
2. Vérifiez les rewrites dans `vercel.json`

### Images ne s'affichent pas

1. Vérifiez que le dossier `public` est bien poussé sur GitHub
2. Vérifiez les chemins des images dans le code

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- Documentation Vite : https://vitejs.dev/
- GitHub Help : https://docs.github.com/

## 📝 Checklist finale

- [ ] Repository GitHub créé et code poussé
- [ ] Projet déployé sur Vercel
- [ ] Toutes les pages fonctionnent
- [ ] SEO vérifié (sitemap, robots.txt)
- [ ] Performance testée (PageSpeed)
- [ ] Partage social testé
- [ ] Newsletter testée
- [ ] Commentaires testés
- [ ] Responsive vérifié (mobile, tablet, desktop)

---

**Félicitations ! Votre site Numcafé est maintenant en ligne ! 🎉**
