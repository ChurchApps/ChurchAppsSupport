---
title: "Gérer les prédications"
---

# Gérer les prédications

<div class="article-intro">

La page Prédications affiche l'intégralité de votre bibliothèque de prédications. Depuis cette page, vous pouvez ajouter de nouvelles prédications, modifier les entrées existantes et organiser votre contenu par playlist. Chaque prédication peut être associée à de la vidéo ou de l'audio hébergé sur YouTube, Vimeo, Facebook ou une URL personnalisée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **contentApi.streamingServices.edit**. Consultez [Rôles et permissions](../settings/roles-permissions.md) si vous n'avez pas accès.
- Créez au moins une [playlist](playlists) pour organiser vos prédications
- Ayez vos identifiants de vidéo ou URL prêts depuis YouTube, Vimeo ou Facebook

</div>

## Consulter votre bibliothèque de prédications

1. Dans B1 Admin, cliquez sur **Prédications** dans la barre latérale gauche.
2. La page Prédications affiche toutes vos entrées de prédications, organisées par playlist. Chaque prédication affiche sa miniature, son titre et sa date.
3. Cliquez sur n'importe quelle prédication pour consulter ou modifier ses détails.

## Ajouter une prédication

1. Cliquez sur le bouton **Ajouter une prédication** dans le coin supérieur droit et sélectionnez **Ajouter une prédication** dans le menu déroulant.
2. Sélectionnez une **Playlist** à laquelle affecter la prédication.
3. Choisissez votre **Fournisseur vidéo** -- YouTube, Vimeo, Facebook ou URL personnalisée. Nous recommandons YouTube car il fonctionne le mieux avec le système B1.
4. Saisissez l'identifiant de vidéo ou l'URL et cliquez sur **Récupérer**. Pour YouTube, l'identifiant de vidéo est la chaîne de caractères après `v=` dans l'URL YouTube.
5. Lorsque vous cliquez sur **Récupérer**, les détails de la prédication sont importés automatiquement, y compris la date de publication, la durée, le titre, la description et la miniature.
6. Apportez les modifications souhaitées et cliquez sur **Enregistrer**.

:::tip
Vous pouvez également ajouter une URL de diffusion en direct permanente en sélectionnant **Ajouter une URL de direct permanente** dans le menu déroulant **Ajouter une prédication**. Cela crée une connexion persistante avec la diffusion en direct de votre chaîne YouTube en utilisant votre identifiant de chaîne. Consultez [Diffusion en direct](live-streaming) pour plus de détails.
:::

## Modifier une prédication

1. Cliquez sur n'importe quelle prédication dans votre bibliothèque pour ouvrir ses détails.
2. Mettez à jour le titre, le prédicateur, la date, la description, la miniature ou les liens média selon vos besoins.
3. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Détails de la prédication

Chaque entrée de prédication peut inclure :

- **Titre** -- Le nom de la prédication affiché aux visiteurs
- **Prédicateur** -- La personne qui a donné la prédication
- **Date** -- La date de publication ou de diffusion
- **Description** -- Un résumé du contenu de la prédication
- **Miniature** -- Une image d'aperçu affichée dans votre bibliothèque de prédications
- **Liens vidéo/audio** -- Les URL vers le média de la prédication sur YouTube, Vimeo, Facebook ou un hébergeur personnalisé

## Programmer une prédication pour la diffusion en direct

Après avoir ajouté une prédication, vous pouvez la programmer pour diffusion sur votre page de direct :

1. Allez dans l'onglet **Horaires de diffusion en direct**.
2. Modifiez un service et dans **Paramètres vidéo**, sélectionnez votre prédication dans le menu déroulant.
3. La prédication sera diffusée à l'horaire de service prévu.

:::info
Pour importer plusieurs prédications à la fois plutôt que de les ajouter une par une, utilisez l'outil [Import en masse](bulk-import) pour récupérer les vidéos directement depuis votre compte YouTube ou Vimeo.
:::

## Prochaines étapes

- [Playlists](playlists) -- Organiser les prédications en séries
- [Diffusion en direct](live-streaming) -- Configurer votre programme de diffusion
- [Import en masse](bulk-import) -- Importer plusieurs prédications à la fois
