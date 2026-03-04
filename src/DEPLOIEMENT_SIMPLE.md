# Déploiement Numcafé (sans Supabase)

## ✅ Configuration actuelle

Ce projet **N'UTILISE PAS** Supabase. Les fichiers Supabase présents sont des fichiers système qui sont automatiquement ignorés lors du déploiement.

## 🚀 Déploiement

### Fichiers de configuration
- `.vercelignore` - Ignore le dossier `supabase/` et les fichiers Supabase
- `.makeignore` - Ignore Supabase pour Figma Make
- `.gitignore` - Ignore Supabase pour Git
- `vercel.json` - Configuration de déploiement sans Edge Functions

### Build local
```bash
npm install
npm run build
```

### Preview local
```bash
npm run preview
```

## 📁 Architecture

Le projet utilise :
- **Frontend uniquement** : React + Vite
- **Stockage** : localStorage (navigateur)
- **Authentification** : Frontend simple (localStorage)
- **Pas de backend** : Tout en frontend

## 🔧 Studio Admin

L'interface d'administration (`/studio`) utilise localStorage pour :
- Authentification des utilisateurs
- Stockage des articles
- Gestion des médias (base64)

**Important** : En production, migrez vers une vraie base de données et authentification backend.

## 🚫 Erreurs résolues

Si vous voyez des erreurs liées à Supabase lors du déploiement, vérifiez que :
1. `.vercelignore` existe et contient `supabase/`
2. `vercel.json` ne contient pas de configuration Edge Functions
3. Aucun import Supabase dans vos fichiers `.tsx` personnalisés

---

**Statut** : ✅ Prêt pour déploiement sans Supabase
