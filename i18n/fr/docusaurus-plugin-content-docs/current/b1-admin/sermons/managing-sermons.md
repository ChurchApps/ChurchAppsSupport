---
title: "Gérer les prédications"
description: "Gérez votre bibliothèque de prédications dans B1 Admin : ajoutez des prédications depuis YouTube, Vimeo ou Facebook, modifiez leurs détails et obtenez un flux de balados pour votre église."
---

# Gérer les prédications

<div class="article-intro">

La page Prédications affiche l'ensemble de votre bibliothèque de prédications. Vous pouvez y ajouter de nouvelles prédications, modifier les entrées existantes et organiser votre contenu par playlist. Chaque prédication peut renvoyer à une vidéo ou un audio hébergé sur YouTube, Vimeo, Facebook ou une URL personnalisée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **Modifier les services** dans la section **Contenu** de votre rôle. Voir [Rôles et autorisations](../settings/roles-permissions.md) si vous n'y avez pas accès.
- Créez au moins une [playlist](./playlists.md) pour y organiser vos prédications
- Ayez à portée de main les identifiants ou URL de vos vidéos provenant de YouTube, Vimeo ou Facebook

</div>

## Consulter votre bibliothèque de prédications {#viewing-your-sermon-library}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Prédications** et cliquez sur **Prédications**.
2. La page Prédications affiche vos prédications dans un tableau avec la **Playlist** de chaque prédication, son titre (**Prédication**) et sa **Date de publication**, de la plus récente à la plus ancienne, avec un compte tel que « 11 prédications sur 11 ». Saisissez dans la case **Rechercher des prédications par titre ou playlist...** pour filtrer la liste. Vos playlists sont listées dans un panneau **Playlists** à côté du tableau, et le panneau **Flux de balados** se trouve sous celui-ci.
3. Survolez une ligne de prédication et cliquez sur **Modifier** pour afficher ou modifier ses détails.

## Ajouter une prédication {#adding-a-sermon}

1. Cliquez sur le bouton **Ajouter une prédication** en haut à droite et sélectionnez **Ajouter une prédication** dans la liste déroulante. Un formulaire **Modifier la prédication** s'ouvre au-dessus de la liste.
2. Sélectionnez une **Playlist** à laquelle rattacher la prédication (ou laissez **Aucune**).
3. Choisissez votre **fournisseur vidéo** -- **YouTube**, **Vimeo**, **Facebook** ou **URL d'intégration personnalisée**. Nous recommandons YouTube, qui fonctionne le mieux avec le système B1.
4. Saisissez l'**identifiant YouTube**, l'**identifiant Vimeo**, l'**identifiant de prédication** (Facebook) ou l'**URL d'intégration de la prédication** de la vidéo. Vous pouvez coller le lien complet de la vidéo ; B1 ne conserve que l'identifiant. Pour YouTube, l'identifiant de la vidéo est la suite de caractères qui suit `v=` dans l'URL YouTube.
5. Pour YouTube et Vimeo, cliquez sur **Récupérer** pour importer automatiquement les détails de la prédication, notamment la date de publication, la durée, le titre, la description et la miniature. Si les détails ne peuvent pas être chargés, un message l'indique et vous pouvez les renseigner vous-même.
6. Apportez les modifications souhaitées et cliquez sur **Enregistrer**.

:::tip
Vous pouvez aussi ajouter une URL de diffusion en direct permanente en sélectionnant **Ajouter une URL de diffusion en direct permanente** dans la liste déroulante **Ajouter une prédication**. Cela crée une connexion permanente au direct de votre chaîne YouTube à partir de votre identifiant de chaîne. Voir [Diffusion en direct](./live-streaming.md) pour plus de détails.
:::

## Modifier une prédication {#editing-a-sermon}

1. Cliquez sur **Modifier** sur n'importe quelle ligne de prédication de votre bibliothèque pour ouvrir ses détails.
2. Mettez à jour le titre, la date, la description, la miniature, la durée ou les liens média selon vos besoins.
3. Cliquez sur **Enregistrer** pour appliquer vos modifications, ou sur **Annuler** pour fermer le formulaire.

Pour supprimer une prédication, ouvrez-la, cliquez sur **Supprimer** et confirmez.

### Ajouter une prédication à une autre playlist {#adding-a-sermon-to-another-playlist}

Pour faire figurer la même prédication dans une deuxième playlist (par exemple, une prédication qui appartient à la fois à une série et à une collection « Meilleurs moments »), ouvrez la prédication, cliquez sur **Ajouter à une autre playlist**, choisissez la playlist, puis cliquez sur **Ajouter**. Cela enregistre une copie de la prédication dans cette playlist.

## Détails d'une prédication {#sermon-details}

Chaque entrée de prédication peut comprendre :

- **Playlist** -- La série à laquelle appartient la prédication
- **Fournisseur vidéo** et identifiant vidéo -- L'endroit où la vidéo est hébergée : YouTube, Vimeo, Facebook ou une URL d'intégration personnalisée
- **Date de publication** -- La date de publication de la prédication ; les prédications sans date affichent **Non planifiée** dans la liste
- **Durée totale de la prédication** -- La durée de la prédication en minutes et secondes
- **Miniature** -- Une image d'aperçu affichée dans votre bibliothèque de prédications. Cliquez sur l'image pour la recadrer ou la remplacer (16:9).
- **Titre** -- Le nom de la prédication affiché aux visiteurs
- **Description** -- Un résumé du contenu de la prédication
- **URL du fichier audio (pour le balado)** -- Un lien direct vers **un seul** fichier MP3/M4A pour cette prédication. Ce champ n'est pas destiné à l'adresse d'un flux de balado ; un flux collé ici ne se lira pas. Pour importer un balado complet, utilisez [Importation en masse](./bulk-import.md#importing-podcast-episodes). Collez une URL ou, une fois la prédication enregistrée, cliquez sur **Téléverser l'audio** pour téléverser un fichier et le renseigner automatiquement. Seules les prédications dont ce champ (ou un lien direct vers un fichier vidéo) est renseigné sont incluses dans votre flux de balados.

## Votre flux de balados {#your-podcast-feed}

Dès qu'au moins une prédication dispose d'un fichier audio ou vidéo associé, B1 Admin génère automatiquement un flux RSS de balados pour votre église -- il n'y a rien à activer. Vous le trouverez dans le panneau **Flux de balados**, à côté de la liste des prédications (sous le panneau **Playlists**) : cliquez sur l'icône de copie pour copier l'URL du flux, puis soumettez cette URL à Apple Podcasts, Spotify ou tout autre répertoire de balados.

:::info
Les prédications qui renvoient uniquement vers un lecteur intégré (comme un identifiant de vidéo YouTube ou Vimeo) n'apparaîtront pas dans le flux de balados : les applications de balados ont besoin d'un fichier média direct et téléchargeable. Ajoutez une **URL du fichier audio** pour inclure une prédication.
:::

## Programmer une prédication pour la diffusion en direct {#scheduling-a-sermon-for-live-stream}

Après avoir ajouté une prédication, vous pouvez la programmer pour la diffusion sur votre page de diffusion en direct :

1. Dans le menu de navigation rapide, choisissez **Prédications > Horaires de diffusion en direct**.
2. Modifiez un service et, sous **Paramètres vidéo**, sélectionnez votre prédication dans la liste déroulante **Prédication**.
3. La prédication sera diffusée à l'heure prévue du service.

:::info
Pour importer plusieurs prédications à la fois au lieu de les ajouter une par une, utilisez l'outil [Importation en masse](./bulk-import.md) pour récupérer directement les vidéos de votre compte YouTube ou Vimeo.
:::

## Étapes suivantes {#next-steps}

- [Playlists](./playlists.md) -- Organiser les prédications en séries
- [Diffusion en direct](./live-streaming.md) -- Configurer votre calendrier de diffusion
- [Importation en masse](./bulk-import.md) -- Importer plusieurs prédications à la fois
