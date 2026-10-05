---
title: "Bibliothèques partagées"
---

# Bibliothèques partagées

<div class="article-intro">

Le code partagé ChurchApps est publié sur npm sous la portée `@churchapps/*`. Tous les packages partagés vivent dans un seul référentiel -- [Packages](https://github.com/ChurchApps/Packages) -- géré en tant qu'espace de travail Yarn (Berry) et versionné avec [changesets](https://github.com/changesets/changesets).

</div>

## Packages

| Package | Description | Utilisé par |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Couche de fondation : fonctions d'aide indépendantes du cadre et les interfaces TypeScript partagées qui forment le contrat de données inter-app | Tous les projets |
| [`@churchapps/apihelper`](./api-helper) | Utilitaires Express côté serveur : authentification, contrôleurs de base, accès à la base de données, intégrations AWS et email | Tous les API |
| [`@churchapps/apphelper`](./app-helper) | Composants React partagés et modules de fonctionnalités (connexion, dons, formulaires, markdown, site Web) | Toutes les applications Web |
| `@churchapps/content-providers` | Abstraction sur les fournisseurs de contenu tiers (Lessons.church, Planning Center, Dropbox, et autres) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Boîte à outils pour créer des intégrations B1.church : vérification webhook, client REST typé, aides OAuth | Développeurs d'intégration externes |
| `@churchapps/texting` | Abstraction de fournisseur SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

La direction de la dépendance est strictement descendante : les applications dépendent de `apihelper` et `apphelper`, qui déclarent `@churchapps/helpers` comme une **dépendance d'égal** afin que chaque application résolve exactement une copie de lui.

## Configuration de l'espace de travail

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Le référentiel utilise Yarn Berry (le champ `packageManager` racine est autoritaire) avec un seul lockfile. `yarn build` construit chaque package dans l'ordre des dépendances ; `yarn test` exécute tous les tests du package.

## Publication avec Changesets

Chaque modification d'un package est expédiée avec un changeset :

1. Exécutez `yarn changeset` à la racine de l'espace de travail. Choisissez le(s) package(s) que vous avez touché, le type de bump (patch = correction, minor = nouvelle exportation ou fonctionnalité, major = rupture), et écrivez un résumé d'une ligne -- il devient l'entrée CHANGELOG.
2. Validez le fichier `.changeset/*.md` généré avec votre modification de code. Un crochet pre-commit bloque les validations qui modifient une source de package sans un changeset staged.
3. Quand prêt à publier, exécutez `yarn publish-all` à la racine. Ceci consomme les changesets en attente (versions de bumping, écrivant CHANGELOGs, synchronisant les plages de dépendances internes), construit tout dans l'ordre des dépendances, et publie les packages bumpés sur npm. Puis validez et poussez les bumps de version.

:::warning
Ne lancez jamais un `npm publish` brut à l'intérieur d'un seul package -- il ignore l'ordre de construction et la tenue de livres de version que le script de publication gère. La publication nécessite un compte npm avec des droits de publication à la portée `@churchapps`.
:::

## Développement local contre une application consommatrice

À l'intérieur de l'espace de travail, les packages se construisent directement par rapport à leurs frères et soeurs -- aucun lien nécessaire. Pour tester une construction de package non publiée à l'intérieur d'une application consommatrice (B1Admin, B1App, etc.), ajoutez un portail Yarn temporaire dans le consommateur :

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Construisez d'abord le package (`yarn build` à la racine de l'espace de travail) -- le consommateur lit la sortie `dist/` compilée, pas la source.

:::warning
`yarn link` écrit une résolution de portail dans le `package.json` du consommateur. Ne le validez jamais -- toujours `yarn unlink` et réinstallez quand fait.
:::
