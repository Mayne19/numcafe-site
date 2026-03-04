# Interface d'Administration Numcafé - Documentation

## 🔐 Accès à l'interface admin

### URL d'accès
**Route protégée :** `/studio`

**Important :** Les utilisateurs non authentifiés seront automatiquement redirigés vers `/login-studio`, puis vers `/studio` après connexion réussie.

### Sécurité
- ✅ La route `/admin` et `/wp-admin` retournent une page 404 (pas d'indice)
- ✅ La route `/studio` redirige automatiquement vers `/login-studio` si non authentifié
- ✅ Authentification requise pour accéder au dashboard
- ✅ Contrôle des rôles sur toutes les actions (admin vs writer)
- ✅ Interface moderne avec sidebar et éditeur WYSIWYG

## 👤 Comptes de démonstration

### Compte Admin
- **Email :** `admin@numcafe.fr`
- **Mot de passe :** `admin123`
- **Permissions :**
  - Accès à toutes les pages (Dashboard, Articles, Éditeur, Médias, Utilisateurs, SEO, Réglages)
  - Créer, modifier, supprimer des articles
  - Publier et dépublier des articles
  - Planifier des publications
  - Gérer les utilisateurs
  - Voir tous les articles

### Compte Writer
- **Email :** `writer@numcafe.fr`
- **Mot de passe :** `writer123`
- **Permissions :**
  - Accès limité (Dashboard, Articles, Éditeur, Médias, SEO, Réglages)
  - Créer des articles
  - Modifier ses propres articles
  - Envoyer des articles en review
  - ❌ NE PEUT PAS publier
  - ❌ NE PEUT PAS supprimer
  - ❌ NE PEUT PAS accéder à la gestion des utilisateurs
  - Voir uniquement ses propres articles

## 📋 Fonctionnalités du Studio

### Navigation (Sidebar)
L'interface utilise une sidebar fixe à gauche avec les sections suivantes :
1. **Tableau de bord** - Vue d'ensemble et statistiques
2. **Articles** - Gestion de tous les articles
3. **Éditeur** - Créer/modifier des articles avec éditeur WYSIWYG
4. **Médias** - Bibliothèque d'images
5. **Utilisateurs** - Gestion des utilisateurs (admin uniquement)
6. **SEO** - Informations et conseils SEO
7. **Réglages** - Configuration du site

### 1. Tableau de bord
- **Statistiques** : Total articles, publiés, brouillons, en review
- **Articles récents** : 5 derniers articles modifiés
- **Actions rapides** : Boutons pour créer un article

### 2. Page Articles
- **Liste complète** avec tableau responsive
- **Recherche** par titre
- **Filtrage** par statut (draft, review, scheduled, published)
- **Tri** par date, titre, statut
- **Actions selon rôle** :
  - **Writer :** Créer, Modifier ses articles
  - **Admin :** Créer, Modifier, Supprimer, Publier

### 3. Éditeur WYSIWYG
- **Éditeur riche** type GitLab/Notion (pas de Markdown manuel)
- **Toolbar** avec boutons :
  - Text style (Normal, H2, H3)
  - Bold, Italic
  - Listes (à puces, numérotées)
  - Lien, Image, Quote, Code
  - Bloc promo (insère `[[PROMO:xxx]]`)
- **Preview** : Affiche le rendu final
- **Onglet SEO** : Intégré dans l'éditeur
  - Meta title, meta description
  - Image Open Graph
  - Score SEO basique
- **Actions** :
  - **Writer :** Sauvegarder brouillon, Envoyer en review
  - **Admin :** Publier, Planifier, Sauvegarder

### 4. Médias
- **Upload** d'images (drag & drop)
- **Grille** de toutes les images
- **Actions** : Copier URL, Supprimer
- **Intégration** : Insérer directement dans l'éditeur

### 5. Utilisateurs (Admin uniquement)
- **Liste** de tous les utilisateurs
- **Modal Modifier** : Nom, email, rôle
- **Modal Ajouter** : Créer un nouvel utilisateur
- **Rôles** : Admin ou Writer

### 6. SEO
- Page d'information sur le SEO
- Conseils d'optimisation
- Lien vers l'onglet SEO de l'éditeur

### 7. Réglages
- **Informations générales** : Nom du site, description, URL
- **Contact** : Email de contact
- **Fonctionnalités** : Toggle pour newsletter, commentaires, notifications

## 📊 Statuts des articles

| Statut | Description | Qui peut le définir |
|--------|-------------|---------------------|
| **draft** | Brouillon en cours de rédaction | Writer, Admin |
| **review** | En attente de validation | Writer (envoyer), Admin |
| **scheduled** | Planifié pour publication future | Admin uniquement |
| **published** | Publié et visible sur le site | Admin uniquement |

## 🔄 Workflow de publication

### Pour un Writer :
1. Créer un nouvel article
2. Rédiger le contenu
3. Sauvegarder comme brouillon (draft)
4. Envoyer en review quand prêt
5. ⏳ Attendre la validation d'un admin

### Pour un Admin :
1. Créer un nouvel article OU consulter les articles en review
2. Rédiger/modifier le contenu
3. Choisir :
   - **Publier maintenant** : statut → published
   - **Planifier** : définir une date → statut → scheduled
   - **Sauvegarder** : garder en brouillon ou review

## 💾 Stockage des données

**IMPORTANT :** Cette version utilise localStorage pour le stockage des données.

- Les données sont stockées localement dans le navigateur
- Les articles créés dans le Studio sont indépendants des articles statiques
- Pour une version production, intégrez une vraie base de données (MongoDB, PostgreSQL, etc.)

### Fichiers concernés :
- `/utils/auth.ts` - Authentification
- `/data/adminArticles.ts` - Gestion des articles admin
- Les données sont stockées dans le localStorage du navigateur

## 🎨 Design

L'interface respecte la charte graphique Numcafé :
- Couleur primaire : `#C69C6D`
- Couleurs sombres : `#1D1D1D`
- Interface sobre, moderne et rapide
- Responsive pour desktop et mobile

## 🚀 Améliorations futures (production)

### Sécurité
- [ ] Remplacer l'auth localStorage par un système backend (JWT, OAuth)
- [ ] Validation côté serveur de toutes les actions
- [ ] Rate limiting sur les endpoints
- [ ] HTTPS obligatoire

### Fonctionnalités
- [ ] Upload d'images directement dans l'éditeur
- [ ] Prévisualisation de l'article tel qu'il apparaîtra sur le site
- [ ] Gestion des médias (bibliothèque d'images)
- [ ] Historique des modifications
- [ ] Commentaires entre admin et writers
- [ ] Notifications (article en review, publié, etc.)
- [ ] Export/Import d'articles

### Base de données
- [ ] Migration vers PostgreSQL, MongoDB ou MySQL
- [ ] Relations entre articles, auteurs, catégories
- [ ] Gestion des tags
- [ ] Analytics intégrés

## 📝 Notes importantes

1. **Route cachée** : `/studio` n'est pas indexée ni visible dans les menus publics
2. **Page 404 pour /admin** : Les routes classiques d'admin retournent 404
3. **Redirection automatique** : Les utilisateurs connectés sur `/login-studio` sont redirigés vers `/studio`
4. **Déconnexion** : Bouton de déconnexion visible dans le header du Studio
5. **Pas de Layout public** : Le Studio a sa propre interface sans header/footer du site

## 🔗 Liens utiles

- Interface admin : `https://votre-domaine.com/studio`
- Page de connexion : `https://votre-domaine.com/login-studio`
- Site public : `https://votre-domaine.com/`

---

**Créé pour Numcafé** - Média digital moderne ☕