# 🚀 Configuration Supabase - Vite standard

## ✅ Configuration Vite avec variables d'environnement

Ce projet utilise **Vite** avec des **variables d'environnement** pour gérer les clés Supabase.

**✅ Aucune clé hardcodée dans le code**

---

## 📁 Structure

```
/
├── .env                        # VOS CLÉS (non commité)
├── .env.example                # Template (commité)
├── .gitignore                  # Protège .env
└── lib/
    └── supabaseClient.ts       # Client (lit import.meta.env.VITE_*)
```

---

## 🔧 Configuration en développement

### 1️⃣ Créez le fichier `/.env`

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
```

### 2️⃣ Obtenez vos clés Supabase

1. https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Settings > API
4. Copiez **Project URL** et **anon/public key**

### 3️⃣ Lancez le serveur

```bash
npm run dev
```

**⚠️ Après modification du `.env`, redémarrez le serveur.**

---

## 📝 Fichiers

### `/.env` (non commité)

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
```

### `/lib/supabaseClient.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('❌ Variable manquante: VITE_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('❌ Variable manquante: VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 🚀 Déploiement en production

### Configurer les variables

Dans le dashboard de votre hébergeur :

**Vercel** : Settings > Environment Variables
**Netlify** : Site settings > Environment variables
**Render** : Environment > Environment Variables
**Cloudflare Pages** : Settings > Environment variables

Ajoutez :
- `VITE_SUPABASE_URL` = `https://votre-project-id.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `votre_anon_key_ici`

### Redéployer

- **Vercel** : Deployments > ... > Redeploy
- **Netlify** : Deploys > Trigger deploy
- **Render** : Automatique
- **Cloudflare** : Deployments > Retry deployment

---

## 📊 Checklist

### Développement
- [ ] Fichier `/.env` créé
- [ ] Variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` remplies
- [ ] Serveur démarré : `npm run dev`
- [ ] Page `/blog` affiche les articles
- [ ] Aucune erreur console

### Production
- [ ] Variables configurées dans le dashboard hébergeur
- [ ] Application redéployée
- [ ] Test sur URL production
- [ ] Articles visibles
- [ ] Aucune erreur console

---

## 🔐 Sécurité

- ✅ `.env` dans `.gitignore`
- ✅ Aucune clé hardcodée
- ✅ `anon key` protégée par RLS
- ❌ Ne JAMAIS exposer la `service_role` key

---

## 🎉 Résultat

Configuration Vite standard :
- ✅ Variables via `import.meta.env.VITE_*`
- ✅ Dev : `npm run dev` avec `.env`
- ✅ Prod : variables dans dashboard hébergeur
- ✅ Aucune clé hardcodée
