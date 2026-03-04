# Comment désactiver Supabase dans Figma Make

## ⚠️ Erreur actuelle
```
Error while deploying: XHR for "/api/integrations/supabase/.../edge_functions/make-server/deploy" failed with status 544
```

## 🔧 Solution

### Méthode 1 : Déconnecter Supabase de Figma Make

1. Allez dans les paramètres de votre projet Figma Make
2. Cherchez la section "Integrations" ou "Connected Services"
3. Trouvez Supabase et cliquez sur "Disconnect" ou "Remove"
4. Confirmez la déconnexion

### Méthode 2 : Ignorer l'erreur de déploiement

Si le site fonctionne malgré l'erreur 544 :
- L'erreur concerne uniquement les Edge Functions Supabase
- Le site principal (frontend) devrait être déployé correctement
- Vérifiez que votre site est accessible à l'URL de déploiement

### Méthode 3 : Déploiement manuel

Si l'erreur bloque tout :

1. **Téléchargez le projet** depuis Figma Make
2. **Supprimez le dossier** `supabase/` complètement
3. **Déployez sur Vercel/Netlify** manuellement :
   ```bash
   npm install
   npm run build
   # Uploadez le dossier 'dist' sur votre hébergeur
   ```

## ✅ Ce projet n'utilise PAS Supabase

- Tout fonctionne en frontend (localStorage)
- Pas de base de données externe
- Pas d'authentification backend
- Les fichiers Supabase sont des fichiers système inutilisés

## 📁 Fichiers créés pour désactiver Supabase

- `.vercelignore` - Ignore Supabase pour Vercel
- `.makeignore` - Ignore Supabase pour Make
- `supabase/config.toml` - Configuration Supabase désactivée
- `.supabase/config.toml` - Configuration locale désactivée
- `figma.config.json` - Config Make sans Supabase

## 🆘 Si l'erreur persiste

L'erreur 544 indique que Figma Make essaie de déployer des Edge Functions mais ne peut pas se connecter à Supabase.

**Solution définitive** : Déconnectez Supabase de votre projet Figma Make dans les paramètres du projet.

Le site devrait quand même fonctionner car seules les Edge Functions échouent, pas le build principal du frontend.
