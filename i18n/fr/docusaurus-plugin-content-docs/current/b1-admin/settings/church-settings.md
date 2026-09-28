---
title: "Paramètres de l'église"
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église est l'endroit où vous configurez les informations de base, les coordonnées et l'image de marque de votre église. Ces détails sont utilisés dans tous les outils ChurchApps, y compris votre site Web B1.church et l'application mobile B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission "Edit Church Settings". Voir [Rôles et permissions](./roles-permissions.md) si vous n'avez pas accès.
- Ayez l'adresse de votre église, les informations de contact et le logo prêts

</div>

## Modification des informations de votre église

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Settings**.
2. Ouvrez la section **Church Information** et cliquez sur son icône d'édition (crayon).
3. Mettez à jour l'un des champs suivants:
   - **Church Name** -- Le nom affiché dans tous les produits ChurchApps.
   - **Address** -- L'adresse physique de votre église.
   - **Contact Information** -- Numéro de téléphone, e-mail et autres coordonnées.
4. Cliquez sur **Save** pour appliquer vos modifications.

## Configuration de votre sous-domaine

Votre église obtient un sous-domaine gratuit à **votreglise.1.church**. C'est l'adresse Web où les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, localisez le champ **Subdomain**.
2. Entrez votre sous-domaine préféré (par exemple, "gracechurch" pour gracechurch.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique dans toutes les églises ChurchApps. Si votre nom préféré est pris, essayez d'ajouter votre ville ou votre état (par exemple, "gracechurch-dallas").
:::

Si vous souhaitez que les visiteurs accèdent à votre site à votre propre domaine (par exemple, **www.gracechurch.org**), voir [Custom Domain](./custom-domain.md).

## Configuration de l'image de marque

Personnalisez l'apparence de votre église dans tous les outils ChurchApps:

1. Téléchargez votre **logo d'église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez toutes les **images d'église** supplémentaires utilisées sur votre site Web et [application mobile](./mobile-app.md).

:::tip
Pour de meilleurs résultats, utilisez un logo avec un arrière-plan transparent au format PNG. Cela garantit qu'il a l'air formidable sur les fonds clair et foncé.
:::

## Premier jour de la semaine

Choisissez le jour où vos calendriers commencent. La liste déroulante **First Day of Week** sur la section Church Info est par défaut **Sunday**, mais peut être définie sur n'importe quel jour. Une fois modifié, il est honoré dans tous les grilles de calendrier dans B1 Admin et le portail des membres B1.church -- les calendriers de groupe, les calendriers organisés et l'éditeur d'événements sont tous disposés au cours de la semaine en commençant par le jour que vous choisissez.

## Stockage de fichiers

Par défaut, les fichiers que vous téléchargez sur votre site Web (via [Files](../website/files.md)) et d'autres zones de contenu utilisent le stockage hébergé gratuitement de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez plutôt connecter votre propre stockage en nuage -- les nouveaux téléchargements vont alors directement vers votre compte sans limite de plate-forme.

1. Sur la page Paramètres, trouvez la carte **File Storage** et cliquez pour la modifier.
2. Choisissez un fournisseur: **Google Drive**, **Dropbox**, **OneDrive**, ou un **bucket compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connect** et connectez-vous pour autoriser l'accès. Pour un bucket compatible S3, entrez votre clé d'accès, secret, nom du bucket et URL de base publique.
4. Cliquez sur **Save**.

:::info
Cela n'affecte que les nouveaux téléchargements sur vos fichiers de site Web et les zones de contenu similaires. Les images de la galerie, les miniatures, les logos et les photos des personnes restent toujours sur le stockage par défaut de B1.
:::

## Promotion de grade

Si vous suivez le **Grade** sur les enfants et les étudiants, B1 peut automatiquement faire monter tout le monde d'un niveau à une date que vous choisissez (par exemple, le 1er août) plutôt que de vous demander de modifier chaque profil à la main.

1. Sur la page Paramètres, trouvez l'option **Grade Promotion**.
2. Activez-la et choisissez le **mois et le jour** pour promouvoir les grades chaque année.
3. Enregistrez vos modifications.

## Import et export

Le bouton **Import/Export** dans l'en-tête des paramètres ouvre un outil dédié dans une nouvelle fenêtre de navigateur. Utilisez ceci pour:

- Importer les données des membres d'un autre système de gestion d'église.
- Exporter vos données ChurchApps à des fins de sauvegarde ou de migration.

C'est particulièrement utile lorsque vous mettez en place votre église pour la première fois et que vous devez transférer les enregistrements existants dans ChurchApps.

:::warning
Lors de l'importation de données, sauvegardez toujours vos enregistrements existants en premier. Les opérations d'importation ajoutent des données à votre système et peuvent créer des entrées en double si elles sont exécutées plusieurs fois.
:::
