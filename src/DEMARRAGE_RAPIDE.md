# 🚀 Démarrage rapide - Numcafé

## Installation en 5 minutes

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Configurer Supabase

Créez le fichier `/.env` à la racine :

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
```

**Obtenez vos clés :**
1. https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Settings > API
4. Copiez **Project URL** et **anon/public key**

### 3️⃣ Créer la table `articles`

Dans votre dashboard Supabase :
1. SQL Editor > New query
2. Copiez le contenu de `/supabase_example_article.sql`
3. Run

### 4️⃣ Lancer le serveur

```bash
npm run dev
```

### 5️⃣ Tester

1. http://localhost:5173
2. Naviguez vers `/blog`
3. Articles Supabase visibles
4. Aucune erreur console (F12)

---

## 🚀 Déployer

1. Commitez sur Git
2. Importez sur Vercel/Netlify/Render/Cloudflare
3. Ajoutez les variables dans le dashboard :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Déployez

**Guide complet : `/CHECKLIST_PRODUCTION.md`**

---

## 💡 Problèmes courants

### Articles ne s'affichent pas
1. Vérifiez que `/.env` existe et est rempli
2. Vérifiez la table `articles` dans Supabase
3. Au moins un article avec `published = true`
4. Redémarrez : Ctrl+C puis `npm run dev`

### Variables manquantes
- Vérifiez que les variables commencent par `VITE_`
- Redémarrez le serveur après modification du `.env`

---

## 🎉 Prêt !
