---
title: "Déploiement des applications web"
---

# Déploiement des applications web

<div class="article-intro">

Les applications web ChurchApps sont déployées en tant que sites statiques sur **Amazon S3** avec **CloudFront** en tant que CDN. Les déploiements sont automatisés via GitHub Actions, mais peuvent également être exécutés manuellement si nécessaire.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurer l'application web localement et vérifier qu'elle compile -- voir [Applications web](../web-apps/)
- Configurer les credentials AWS avec l'accès S3 et CloudFront
- Connaître le nom du bucket S3 cible et l'ID de distribution CloudFront

</div>

## Étapes de déploiement

1. **Construire l'application** -- générer la sortie statique :

   ```bash
   npm run build
   ```

2. **Synchroniser vers S3** -- télécharger la sortie de build vers le bucket S3 :

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalider CloudFront** -- vider le cache du CDN afin que les utilisateurs reçoivent la dernière version :

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Déploiements automatisés

Les workflows GitHub Actions gèrent le déploiement automatiquement lors de la poussée vers la branche `main`. Le workflow exécute les trois étapes ci-dessus -- construction, synchronisation S3 et invalidation CloudFront -- sans intervention manuelle.

:::info
Vous n'avez généralement pas besoin d'exécuter ces commandes manuellement. Fusionner une demande de tirage dans `main` déclenche le pipeline de déploiement automatisé.
:::

:::tip
Si vous avez besoin de vérifier une build localement avant de déployer, exécutez `npm run build` et inspectez la sortie dans le répertoire `build/`. Vous pouvez le servir localement avec n'importe quel serveur de fichiers statiques pour confirmer que tout fonctionne.
:::

## Articles connexes

- **[Applications web](../web-apps/)** -- Guides de configuration pour B1Admin, B1App et LessonsApp
- **[Déploiement de l'API](./apis)** -- Déployer les APIs backend
- **[Déploiement mobile](./mobile)** -- Déployer les applications mobiles vers les app stores
