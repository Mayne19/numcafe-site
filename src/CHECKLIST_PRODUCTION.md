# ✅ Checklist de déploiement en production

## 📋 Avant le déploiement

### Vérifications locales

- [ ] Le fichier `/.env` existe et contient vos clés Supabase
- [ ] Le serveur dev fonctionne sans erreur : `npm run dev`
- [ ] Les articles s'affichent correctement sur `/blog`
- [ ] Aucune erreur dans la console du navigateur
- [ ] Aucune clé hardcodée dans les fichiers `.ts` ou `.tsx`
- [ ] Le fichier `.env` est dans `.gitignore`
- [ ] Le build fonctionne : `npm run build`

### Vérifications Supabase

- [ ] Table `articles` créée dans Supabase
- [ ] Row Level Security (RLS) activé
- [ ] Policy de lecture publique configurée :
  ```sql
  create policy "Public articles are viewable by everyone"
  on articles for select
  using (published = true);
  ```
- [ ] Au moins un article avec `published = true` pour tester

### Vérifications Git

- [ ] `.env` est bien ignoré par Git (dans `.gitignore`)
- [ ] `.env.example` est présent et versionné
- [ ] Aucune clé Supabase dans l'historique Git
- [ ] Dernier commit poussé sur la branche principale

---

## 🚀 Déploiement selon la plateforme

### Option 1 : Vercel

#### 1️⃣ Importer le projet

1. Allez sur https://vercel.com
2. Cliquez sur **Add New** > **Project**
3. Importez votre repository Git
4. Sélectionnez le framework : **Vite**

#### 2️⃣ Configurer les variables d'environnement

1. Dans les paramètres de déploiement, trouvez **Environment Variables**
2. Ajoutez les variables suivantes :

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://votre-project-id.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `votre_anon_key_ici` | Production, Preview, Development |

**⚠️ Copiez les valeurs depuis votre fichier local `/.env`**

3. Cliquez sur **Add** pour chaque variable

#### 3️⃣ Déployer

1. Cliquez sur **Deploy**
2. Attendez la fin du build (1-3 minutes)
3. Vercel vous donnera une URL de production

#### 4️⃣ Vérifier le déploiement

- [ ] Ouvrez l'URL de production
- [ ] Naviguez vers `/blog`
- [ ] Vérifiez que les articles Supabase s'affichent
- [ ] Ouvrez la console du navigateur (F12) : aucune erreur
- [ ] Testez la navigation entre les pages
- [ ] Testez sur mobile (mode responsive)

#### 5️⃣ Redéployer après modification des variables

Si vous devez modifier les variables d'environnement :

1. Allez dans **Settings > Environment Variables**
2. Modifiez les valeurs
3. Allez dans **Deployments**
4. Cliquez sur **...** > **Redeploy** sur le dernier déploiement
5. Cochez **Use existing Build Cache** : **No**
6. Cliquez sur **Redeploy**

**Commande CLI :**
```bash
vercel --prod
```

---

### Option 2 : Netlify

#### 1️⃣ Importer le projet

1. Allez sur https://netlify.com
2. Cliquez sur **Add new site** > **Import an existing project**
3. Connectez votre repository Git
4. Sélectionnez le repository

#### 2️⃣ Configurer le build

- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Base directory** : (laisser vide)

#### 3️⃣ Configurer les variables d'environnement

1. Avant de déployer, cliquez sur **Show advanced**
2. Cliquez sur **New variable**
3. Ajoutez les variables suivantes :

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://votre-project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `votre_anon_key_ici` |

**⚠️ Copiez les valeurs depuis votre fichier local `/.env`**

#### 4️⃣ Déployer

1. Cliquez sur **Deploy site**
2. Attendez la fin du build (1-3 minutes)
3. Netlify vous donnera une URL de production

#### 5️⃣ Vérifier le déploiement

- [ ] Ouvrez l'URL de production
- [ ] Naviguez vers `/blog`
- [ ] Vérifiez que les articles Supabase s'affichent
- [ ] Ouvrez la console du navigateur (F12) : aucune erreur
- [ ] Testez la navigation entre les pages
- [ ] Testez sur mobile (mode responsive)

#### 6️⃣ Redéployer après modification des variables

Si vous devez modifier les variables d'environnement :

1. Allez dans **Site settings > Environment variables**
2. Modifiez les valeurs
3. Allez dans **Deploys**
4. Cliquez sur **Trigger deploy** > **Clear cache and deploy site**

**Commande CLI :**
```bash
netlify deploy --prod
```

---

### Option 3 : Render

#### 1️⃣ Créer un nouveau service

1. Allez sur https://render.com
2. Cliquez sur **New** > **Static Site**
3. Connectez votre repository Git
4. Sélectionnez le repository

#### 2️⃣ Configurer le build

- **Name** : `numcafe` (ou autre)
- **Branch** : `main` (ou votre branche)
- **Build Command** : `npm run build`
- **Publish Directory** : `dist`

#### 3️⃣ Configurer les variables d'environnement

1. Cliquez sur **Advanced**
2. Cliquez sur **Add Environment Variable**
3. Ajoutez les variables suivantes :

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://votre-project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `votre_anon_key_ici` |

**⚠️ Copiez les valeurs depuis votre fichier local `/.env`**

#### 4️⃣ Déployer

1. Cliquez sur **Create Static Site**
2. Attendez la fin du build (2-5 minutes)
3. Render vous donnera une URL de production

#### 5️⃣ Vérifier le déploiement

- [ ] Ouvrez l'URL de production
- [ ] Naviguez vers `/blog`
- [ ] Vérifiez que les articles Supabase s'affichent
- [ ] Ouvrez la console du navigateur (F12) : aucune erreur
- [ ] Testez la navigation entre les pages
- [ ] Testez sur mobile (mode responsive)

#### 6️⃣ Redéployer après modification des variables

Si vous devez modifier les variables d'environnement :

1. Allez dans **Environment**
2. Modifiez les valeurs
3. Le site sera automatiquement redéployé

---

### Option 4 : Cloudflare Pages

#### 1️⃣ Créer un nouveau projet

1. Allez sur https://pages.cloudflare.com
2. Cliquez sur **Create a project**
3. Connectez votre repository Git
4. Sélectionnez le repository

#### 2️⃣ Configurer le build

- **Framework preset** : Vite
- **Build command** : `npm run build`
- **Build output directory** : `dist`

#### 3️⃣ Configurer les variables d'environnement

1. Cliquez sur **Environment variables (advanced)**
2. Ajoutez les variables suivantes :

| Variable name | Value | Environment |
|---------------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://votre-project-id.supabase.co` | Production |
| `VITE_SUPABASE_ANON_KEY` | `votre_anon_key_ici` | Production |

Ajoutez aussi pour Preview (optionnel) :

| Variable name | Value | Environment |
|---------------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://votre-project-id.supabase.co` | Preview |
| `VITE_SUPABASE_ANON_KEY` | `votre_anon_key_ici` | Preview |

**⚠️ Copiez les valeurs depuis votre fichier local `/.env`**

#### 4️⃣ Déployer

1. Cliquez sur **Save and Deploy**
2. Attendez la fin du build (1-3 minutes)
3. Cloudflare vous donnera une URL de production

#### 5️⃣ Vérifier le déploiement

- [ ] Ouvrez l'URL de production
- [ ] Naviguez vers `/blog`
- [ ] Vérifiez que les articles Supabase s'affichent
- [ ] Ouvrez la console du navigateur (F12) : aucune erreur
- [ ] Testez la navigation entre les pages
- [ ] Testez sur mobile (mode responsive)

#### 6️⃣ Redéployer après modification des variables

Si vous devez modifier les variables d'environnement :

1. Allez dans **Settings > Environment variables**
2. Modifiez les valeurs
3. Allez dans **Deployments**
4. Cliquez sur **Retry deployment** sur le dernier déploiement

---

## 🔍 Debugging en production

### Erreur : Articles ne s'affichent pas

**Diagnostic :**
1. Ouvrez la console du navigateur (F12)
2. Cherchez les erreurs liées à Supabase

**Causes possibles :**
- Variables d'environnement mal configurées
  - ✅ Solution : Vérifiez dans le dashboard de l'hébergeur
- URL Supabase incorrecte
  - ✅ Solution : Copiez exactement depuis Supabase dashboard
- Anon key incorrecte
  - ✅ Solution : Copiez exactement depuis Supabase dashboard
- RLS mal configuré
  - ✅ Solution : Vérifiez les policies dans Supabase
- Aucun article `published = true`
  - ✅ Solution : Publiez au moins un article

### Erreur : `Failed to fetch`

**Cause :** Variables d'environnement non définies

**Solution :**
1. Allez dans le dashboard de l'hébergeur
2. Vérifiez que `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont définis
3. **Redéployez** l'application

### Erreur : `import.meta.env is undefined`

**Cause :** Build incorrect ou variables mal préfixées

**Solution :**
1. Vérifiez que les variables commencent par `VITE_`
2. Redéployez avec un cache vide (Clear cache)

---

## 📊 Checklist finale post-déploiement

### Tests fonctionnels

- [ ] Page d'accueil charge correctement
- [ ] Navigation entre les pages fonctionne
- [ ] Page `/blog` affiche les articles Supabase
- [ ] Clic sur un article ouvre la page article
- [ ] Filtres de catégories fonctionnent
- [ ] Images s'affichent correctement
- [ ] Footer et Header s'affichent
- [ ] Pas d'erreur dans la console du navigateur

### Tests responsive

- [ ] Desktop (1920px) : layout correct
- [ ] Laptop (1366px) : layout correct
- [ ] Tablet (768px) : layout correct
- [ ] Mobile (375px) : layout correct

### Tests SEO

- [ ] Balises meta présentes (title, description)
- [ ] Open Graph tags présents
- [ ] URL canoniques correctes
- [ ] Sitemap accessible (si configuré)

### Sécurité

- [ ] Aucune clé visible dans le code source (view-source)
- [ ] Variables d'environnement non exposées
- [ ] HTTPS activé (automatique sur Vercel/Netlify/Render/Cloudflare)

---

## 🎉 Déploiement réussi !

Votre site Numcafé est maintenant en production avec :

✅ **Configuration Supabase propre** (aucune clé hardcodée)
✅ **Variables d'environnement sécurisées** (dans le dashboard de l'hébergeur)
✅ **Build optimisé** pour la production
✅ **CDN** pour une livraison rapide
✅ **HTTPS** automatique
✅ **Déploiement continu** depuis Git

---

## 🔄 Workflow de mise à jour

### Modifier du code

```bash
# 1. Modifier le code localement
# 2. Tester
npm run dev

# 3. Commiter
git add .
git commit -m "Description des changements"

# 4. Pousser
git push origin main

# 5. Le site se redéploie automatiquement ! 🚀
```

### Modifier les variables d'environnement

1. Allez dans le dashboard de l'hébergeur
2. Modifiez les variables
3. **Redéployez manuellement** (voir section spécifique à votre hébergeur)

---

## 💡 Ressources

- **Supabase Dashboard** : https://supabase.com/dashboard
- **Vercel Dashboard** : https://vercel.com/dashboard
- **Netlify Dashboard** : https://app.netlify.com
- **Render Dashboard** : https://dashboard.render.com
- **Cloudflare Pages** : https://pages.cloudflare.com

- **Guide Supabase** : `/SUPABASE_SETUP.md`
- **README** : `/README.md`
