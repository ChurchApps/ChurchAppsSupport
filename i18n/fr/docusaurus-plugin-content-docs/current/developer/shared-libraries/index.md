---
title: "Bibliothèques partagées"
---

# Bibliothèques partagées

<div class="article-intro">

Le code partagé ChurchApps est publié sur npm sous le scope `@churchapps/*`. Ces paquets fournissent les utilitaires communs, les helpers côté serveur et les composants React qui sont consommés par tous les projets ChurchApps en tant que dépendances npm régulières.

</div>

## Paquets

| Paquet | Description | Utilisé par |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Utilitaires de base (DateHelper, ApiHelper, etc.) | Tous les projets |
| [`@churchapps/apihelper`](./api-helper) | Utilitaires du serveur Express.js | Toutes les APIs |
| [`@churchapps/apphelper`](./app-helper) | Composants React partagés et utilitaires | Toutes les applications web |

## Développement local avec `npm link`

Quand vous développez une bibliothèque partagée aux côtés d'un projet de consommation, utilisez `npm link` pour tester les changements sans publier sur npm :

```bash
# Construire et lier la bibliothèque
cd Helpers && npm run build && npm link

# La lier dans le projet de consommation
cd ../Api && npm link @churchapps/helpers
```

Cela crée un lien symbolique du dossier `node_modules/@churchapps/helpers` du projet de consommation vers votre sortie de build local, de sorte que les changements sont reflétés immédiatement après reconstruction.

:::tip
N'oubliez pas d'exécuter `npm run build` dans le projet de la bibliothèque après avoir apporté des changements -- le projet de consommation lit à partir du dossier `dist/` compilé, pas à partir de la source.
:::

:::warning
Les connexions `npm link` sont réinitialisées quand vous exécutez `npm install` dans le projet de consommation. Vous devrez réexécuter la commande `npm link @churchapps/<package>` après l'installation des dépendances.
:::
