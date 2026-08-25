---
title: "Paramètres de l'église"
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église est l'endroit où vous configurez les informations de base de votre église, les détails de contact et l'image de marque. Ces détails sont utilisés dans tous les outils ChurchApps, y compris votre site B1.church et l'application B1 Mobile.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission « Modification des paramètres de l'église ». Consultez [Rôles et permissions](./roles-permissions.md) si vous n'avez pas accès.
- Ayez l'adresse de votre église, les informations de contact et le logo prêts

</div>

## Édition des informations de votre église

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
2. Cliquez sur le bouton **Modifier les paramètres** dans l'en-tête.
3. Mettez à jour n'importe lequel des champs suivants :
   - **Nom de l'église** -- Le nom affiché dans tous les produits ChurchApps.
   - **Adresse** -- L'adresse physique de votre église.
   - **Informations de contact** -- Numéro de téléphone, e-mail et autres détails de contact.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Configuration de votre sous-domaine

Votre église obtient un sous-domaine gratuit à **votreeglise.b1.church**. C'est l'adresse web où les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, localisez le champ **Sous-domaine**.
2. Entrez le sous-domaine que vous préférez (par exemple, « eglisegrace » pour eglisegrace.b1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique dans toutes les églises ChurchApps. Si votre nom préféré est pris, essayez d'ajouter votre ville ou votre état (par exemple, « eglisegrace-paris »).
:::

## Configuration de l'image de marque

Personnalisez comment votre église apparaît dans tous les outils ChurchApps :

1. Téléchargez votre **logo de l'église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez toute **image supplémentaire de l'église** utilisée sur votre site web et [application mobile](./mobile-app.md).

:::tip
Pour de meilleurs résultats, utilisez un logo avec un arrière-plan transparent au format PNG. Cela garantit qu'il a l'air génial sur les arrière-plans clairs et sombres.
:::

## Premier jour de la semaine

Choisissez le jour par lequel vos calendriers commencent. La liste déroulante **Premier jour de la semaine** dans la section Information de l'église est par défaut **Dimanche**, mais peut être définie à n'importe quel jour. Une fois modifié, il est respecté dans tous les grilles de calendrier dans B1 Admin et le portail des membres B1.church -- les calendriers de groupe, les calendriers organisés et l'éditeur d'événements se présentent tous en commençant par le jour que vous choisissez.

## Stockage des fichiers

Par défaut, les fichiers que vous téléchargez sur votre site web (via [Fichiers](../website/files.md)) et d'autres zones de contenu utilisent le stockage gratuit hébergé de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez connecter votre propre stockage cloud à la place -- les nouveaux téléchargements vont ensuite directement sur votre compte sans limite de plate-forme.

1. Sur la page Paramètres, trouvez la carte **Stockage des fichiers** et cliquez pour l'éditer.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive** ou un **seau compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connecter** et connectez-vous pour autoriser l'accès. Pour un seau compatible S3, entrez votre clé d'accès, le secret, le nom du seau et l'URL de base publique.
4. Cliquez sur **Enregistrer**.

:::info
Cela n'affecte que les nouveaux téléchargements vers votre site Web Fichiers et zones de contenu similaires. Les images de galerie, les vignettes, les logos et les photos de personnes restent toujours sur le stockage par défaut de B1.
:::

## Promotion de classe

Si vous suivez **Grade** sur les enfants et les étudiants, B1 peut automatiquement augmenter tout le monde d'une classe à une date que vous choisissez (par exemple, le 1er août) au lieu de vous obliger à modifier chaque profil à la main.

1. Sur la page Paramètres, trouvez l'option **Promotion de classe**.
2. Activez-la et choisissez le **mois et le jour** pour promouvoir les classes chaque année.
3. Enregistrez vos modifications.

## Import et export

Le bouton **Import/Export** dans l'en-tête Paramètres ouvre un outil dédié dans une nouvelle fenêtre de navigateur. Utilisez-le pour :

- Importer les données des membres d'un autre système de gestion d'église.
- Exporter vos données ChurchApps à des fins de sauvegarde ou de migration.

Ceci est particulièrement utile quand vous configurez votre église pour la première fois et avez besoin de transférer les dossiers existants dans ChurchApps.

:::warning
Lors de l'importation de données, sauvegardez toujours d'abord vos dossiers existants. Les opérations d'importation ajoutent des données à votre système et peuvent créer des entrées en double si exécutées plusieurs fois.
:::
