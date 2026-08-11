---
title: "Gestion des sermons"
---

# Gestion des sermons

<div class="article-intro">

La page Sermons affiche votre bibliothèque de sermons entière. De là, vous pouvez ajouter de nouveaux sermons, modifier les entrées existantes et organiser votre contenu par playlist. Chaque sermon peut se lier à une vidéo ou un audio hébergé sur YouTube, Vimeo, Facebook ou une URL personnalisée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **contentApi.streamingServices.edit**. Voir [Rôles et permissions](../settings/roles-permissions.md) si vous n'avez pas l'accès.
- Créez au moins une [playlist](playlists) pour organiser vos sermons dans
- Ayez vos IDs vidéo ou URLs à portée de main de YouTube, Vimeo ou Facebook

</div>

## Affichage de votre bibliothèque de sermons

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Sermons**.
2. La page Sermons affiche tous vos entrées de sermon, organisées par playlist. Chaque sermon affiche sa miniature, son titre et sa date.
3. Cliquez sur n'importe quel sermon pour afficher ou modifier ses détails.

## Ajout d'un sermon

1. Cliquez sur le bouton **Ajouter un sermon** dans le coin supérieur droit et sélectionnez **Ajouter un sermon** dans le menu déroulant.
2. Sélectionnez une **Playlist** pour assigner le sermon dans.
3. Choisissez votre **Fournisseur vidéo** -- YouTube, Vimeo, Facebook ou URL personnalisée. Nous recommandons YouTube car il fonctionne mieux avec le système B1.
4. Entrez l'ID vidéo ou l'URL et cliquez sur **Récupérer**. Pour YouTube, l'ID vidéo est la chaîne de caractères après `v=` dans l'URL YouTube.
5. Quand vous cliquez sur **Récupérer**, les détails du sermon sont importés automatiquement, incluant la date de publication, la durée, le titre, la description et la miniature.
6. Apportez les changements que vous voulez et cliquez sur **Enregistrer**.

:::tip
Vous pouvez aussi ajouter une URL de diffusion en direct permanente en sélectionnant **Ajouter une URL de diffusion permanente** dans le menu déroulant **Ajouter un sermon**. Cela crée une connexion persistante au flux en direct de votre chaîne YouTube en utilisant votre ID de chaîne. Voir [Diffusion en direct](live-streaming) pour plus de détails.
:::

## Modification d'un sermon

1. Cliquez sur n'importe quel sermon dans votre bibliothèque pour ouvrir ses détails.
2. Mettez à jour le titre, l'orateur, la date, la description, la miniature ou les liens médias selon vos besoins.
3. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Détails du sermon

Chaque entrée de sermon peut inclure :

- **Titre** -- Le nom du sermon affiché aux visiteurs
- **Orateur** -- Qui a donné le sermon
- **Date** -- La date de publication ou de livraison
- **Description** -- Un résumé du contenu du sermon
- **Miniature** -- Une image d'aperçu montée dans votre bibliothèque de sermons
- **Liens vidéo/audio** -- URLs vers les médias du sermon sur YouTube, Vimeo, Facebook ou un hôte personnalisé

## Planification d'un sermon pour la diffusion en direct

Après avoir ajouté un sermon, vous pouvez le planifier pour la diffusion sur votre page de flux en direct :

1. Allez à l'onglet **Heures de diffusion en direct**.
2. Modifiez un service et sous **Paramètres vidéo**, sélectionnez votre sermon dans le menu déroulant.
3. Le sermon jouera à l'heure de service planifiée.

:::info
Pour importer plusieurs sermons à la fois au lieu de les ajouter un par un, utilisez l'outil [Importation en masse](bulk-import) pour extraire les vidéos directement de votre compte YouTube ou Vimeo.
:::

## Prochaines étapes

- [Playlists](playlists) -- Organisez les sermons en séries
- [Diffusion en direct](live-streaming) -- Configurez votre horaire de diffusion
- [Importation en masse](bulk-import) -- Importez plusieurs sermons à la fois
