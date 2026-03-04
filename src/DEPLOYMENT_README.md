# 🚀 Déploiement Numcafé

## ⚠️ IMPORTANT : Ce projet N'UTILISE PAS Supabase

Si vous voyez une erreur liée à Supabase Edge Functions (erreur 544), **ignorez-la**. 
Le site principal devrait se déployer correctement malgré cette erreur.

## 🔍 Vérification du déploiement

Après le déploiement, vérifiez que :

1. ✅ Le site public est accessible (page d'accueil, blog, etc.)
2. ✅ La navigation fonctionne
3. ✅ Les articles s'affichent correctement
4. ✅ L'interface `/studio` est accessible (avec login)

**L'erreur Supabase n'affecte PAS ces fonctionnalités.**

## 🛠️ Architecture du projet

```
Frontend uniquement (React + Vite)
    ↓
localStorage (navigateur)
    ↓
Pas de backend requis
```

### Ce qui fonctionne en frontend :
- ✅ Site public complet
- ✅ Blog avec articles
- ✅ Pages statiques
- ✅ Interface admin `/studio`
- ✅ Authentification simple (localStorage)
- ✅ Gestion d'articles (localStorage)

### Ce qui N'EST PAS utilisé :
- ❌ Supabase
- ❌ Edge Functions
- ❌ Base de données externe
- ❌ API backend

## 📦 Déploiement manuel (alternative)

Si l'erreur Supabase bloque le déploiement automatique :

### Option 1 : Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Build le projet
npm run build

# Déployer
vercel --prod
```

### Option 2 : Netlify
```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Build le projet
npm run build

# Déployer
netlify deploy --prod --dir=dist
```

### Option 3 : Build + Upload manuel
```bash
# Build le projet
npm install
npm run build

# Le dossier 'dist' contient le site complet
# Uploadez-le sur votre hébergeur (FTP, SSH, etc.)
```

## 🔧 Désactiver Supabase dans Figma Make

Pour éviter l'erreur 544 :

1. Ouvrez les paramètres du projet dans Figma Make
2. Allez dans "Integrations" ou "Services"
3. Trouvez "Supabase" et cliquez "Disconnect"
4. Redéployez le projet

## ✅ Test en local

Avant de déployer, testez en local :

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ou build + preview
npm run build
npm run preview
```

Vérifiez que tout fonctionne à `http://localhost:3000`

## 📋 Checklist pré-déploiement

- [ ] `npm install` fonctionne sans erreur
- [ ] `npm run build` génère le dossier `dist/`
- [ ] Le site fonctionne en local (`npm run preview`)
- [ ] L'interface `/studio` est accessible
- [ ] Les comptes admin/writer fonctionnent

Si tout est ✅, le déploiement devrait fonctionner (même avec l'erreur Supabase).

## 🆘 Support

Si le site ne se déploie pas du tout :

1. **Vérifiez les logs de build** : L'erreur peut être ailleurs que Supabase
2. **Testez le build local** : `npm run build` doit réussir
3. **Contactez le support Figma Make** : Demandez à désactiver Supabase pour ce projet

---

**Note** : Les fichiers Supabase présents dans le projet sont des fichiers système de Figma Make et ne sont PAS utilisés par l'application.
