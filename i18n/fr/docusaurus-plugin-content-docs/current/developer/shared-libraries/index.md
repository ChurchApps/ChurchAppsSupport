---
title: "Bibliothèques partagées"
---

# Bibliothèques partagées

<div class="article-intro">

Le code partagé ChurchApps est publié sur npm sous le scope `@churchapps/*`. Tous les paquets partagés vivent dans un seul référentiel -- [Packages](https://github.com/ChurchApps/Packages) -- géré en tant qu'espace de travail Yarn (Berry) et versionnés avec [changesets](https://github.com/changesets/changesets).

</div>

## Paquets

| Paquet | Description | Utilisé par |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Couche de fondation : fonctions d'assistance sans framework et les interfaces TypeScript partagées qui forment le contrat de données inter-applications | Tous les projets |
| [`@churchapps/apihelper`](./api-helper) | Utilitaires du serveur Express : authentification, contrôleurs de base, accès à la base de données, intégrations AWS et e-mail | Toutes les APIs |
| [`@churchapps/apphelper`](./app-helper) | Composants React partagés et modules de fonctionnalités (connexion, donations, formulaires, markdown, site web) | Toutes les applications web |
| `@churchapps/content-providers` | Abstraction sur les fournisseurs de contenu tiers (Lessons.church, Planning Center, Dropbox, et autres) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Ensemble d'outils pour créer des intégrations B1.church : vérification de webhook, client REST typé, assistants OAuth | Développeurs d'intégration externes |
| `@churchapps/texting` | Abstraction de fournisseur SMS (Text In Church, Clearstream, Mutual Ministry) | Api |

La direction des dépendances est strictement descendante : les applications dépendent de `apihelper` et `apphelper`, qui déclarent `@churchapps/helpers` comme une **dépendance peer** afin que chaque application résolve exactement une copie de celui-ci.

## Configuration de l'espace de travail

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Le repo utilise Yarn Berry (le champ `packageManager` racine fait autorité) avec un seul fichier de verrouillage. `yarn build` construit chaque paquet dans l'ordre des dépendances ; `yarn test` exécute tous les tests des paquets.

## Publication avec Changesets

Chaque changement à un paquet est livré avec un changeset :

1. Exécutez `yarn changeset` à la racine de l'espace de travail. Choisissez le(s) paquet(s) que vous avez touché, le type de bump (patch = correction, minor = nouvelle exportation ou fonctionnalité, major = rupture), et écrivez un résumé d'une ligne -- c'est l'entrée du CHANGELOG.
2. Committez le fichier `.changeset/*.md` généré avec votre changement de code. Un hook pre-commit bloque les commits qui changent la source d'un paquet sans un changeset staging.
3. Quand vous êtes prêt à publier, exécutez `yarn publish-all` à la racine. Cela consomme les changesets en attente (bumping versions, écrivant CHANGELOGs, synchronisant les plages de dépendances internes), construit tout dans l'ordre des dépendances et publie les paquets bumpés sur npm. Puis committez et poussez les bumps de version.

:::warning
Ne jamais exécuter un `npm publish` brut à l'intérieur d'un seul paquet -- cela saute la commande de construction et la comptabilité de version que le script de publication gère. La publication nécessite un compte npm avec des droits de publication au scope `@churchapps`.
:::

## Développement local contre une application consommatrice

À l'intérieur de l'espace de travail, les paquets se construisent directement contre leurs frères et sœurs -- aucune liaison requise. Pour tester une construction non publiée d'un paquet à l'intérieur d'une application consommatrice (B1Admin, B1App, etc.), ajoutez un portail Yarn temporaire dans le consommateur :

```bash
# dans le projet de consommation
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Construisez le paquet en premier (`yarn build` à la racine de l'espace de travail) -- le consommateur lit la sortie compilée `dist/`, pas la source.

:::warning
`yarn link` écrit une résolution de portail dans le `package.json` du consommateur. Ne jamais le committer -- toujours `yarn unlink` et réinstaller quand vous avez fini.
:::
