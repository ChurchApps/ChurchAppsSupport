---
title: "Bibliothèques partagées"
---

# Bibliothèques partagées

<div class="article-intro">

Le code partagé de ChurchApps est publié sur npm sous le périmètre `@churchapps/*`. Tous les paquets partagés se trouvent dans un seul dépôt — [Packages](https://github.com/ChurchApps/Packages) — géré comme un espace de travail Yarn (Berry) et versionné avec [changesets](https://github.com/changesets/changesets).

</div>

## Paquets

| Paquet | Description | Utilisé par |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Couche de base : fonctions d'aide indépendantes de tout framework et interfaces TypeScript partagées qui forment le contrat de données commun entre les applications | Tous les projets |
| [`@churchapps/apihelper`](./api-helper) | Utilitaires Express côté serveur : authentification, contrôleurs de base, accès à la base de données, intégrations AWS et e-mail | Toutes les API |
| [`@churchapps/apphelper`](./app-helper) | Composants React partagés et modules fonctionnels (connexion, dons, formulaires, markdown, site web) | Toutes les applications web |
| `@churchapps/content-providers` | Couche d'abstraction au-dessus des fournisseurs de contenu tiers (Lessons.church, Planning Center, Dropbox et d'autres) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Boîte à outils pour créer des intégrations B1.church : vérification des webhooks, client REST typé, aides OAuth | Développeurs d'intégrations externes |
| `@churchapps/texting` | Abstraction des fournisseurs de SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

La dépendance ne va que vers le bas : les applications dépendent de `apihelper` et `apphelper`, qui déclarent `@churchapps/helpers` comme **dépendance de pair** afin que chaque application n'ait qu'une seule copie de ce paquet.

## Configuration de l'espace de travail

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Le dépôt utilise Yarn Berry (le champ `packageManager` de la racine fait foi) avec un fichier de verrouillage unique. `yarn build` compile chaque paquet dans l'ordre des dépendances ; `yarn test` exécute les tests de tous les paquets.

## Publier avec Changesets

Chaque modification d'un paquet est livrée avec un changeset :

1. Exécutez `yarn changeset` à la racine de l'espace de travail. Sélectionnez le ou les paquets modifiés, le type de montée de version (patch = correctif, minor = nouvel export ou fonctionnalité, major = changement incompatible) et rédigez un résumé d'une ligne — il devient l'entrée du CHANGELOG.
2. Validez le fichier `.changeset/*.md` généré avec votre modification de code. Un hook pre-commit bloque les validations qui modifient le code source d'un paquet sans changeset indexé.
3. Lorsque vous êtes prêt à publier, exécutez `yarn publish-all` à la racine. Cela consomme les changesets en attente (en incrémentant les versions, en rédigeant les CHANGELOG et en synchronisant les plages de dépendances internes), compile tout dans l'ordre des dépendances, puis publie sur npm les paquets dont la version a été incrémentée. Validez et poussez ensuite les montées de version.

:::warning
N'exécutez jamais de `npm publish` brut dans un paquet individuel — cela contourne l'ordre de compilation et la gestion des versions prise en charge par le script de publication. La publication exige un compte npm disposant des droits de publication sur le périmètre `@churchapps`.
:::

## Développement local avec une application cliente

Dans l'espace de travail, les paquets se compilent directement à partir de leurs voisins — aucun lien n'est nécessaire. Pour tester une version non publiée d'un paquet dans une application cliente (B1Admin, B1App, etc.), ajoutez un portail Yarn temporaire dans l'application cliente :

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Compilez d'abord le paquet (`yarn build` à la racine de l'espace de travail) — l'application cliente lit la sortie compilée `dist/`, et non le code source.

:::warning
`yarn link` écrit une résolution de type portail dans le `package.json` de l'application cliente. Ne la validez jamais — exécutez toujours `yarn unlink` puis réinstallez lorsque vous avez terminé.
:::
