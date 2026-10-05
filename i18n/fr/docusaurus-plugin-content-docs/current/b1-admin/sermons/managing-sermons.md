---
title: "Gestion des sermons"
---

# Gestion des sermons

<div class="article-intro">

La page Sermons affiche votre bibliothèque complète de sermons. De là, vous pouvez ajouter de nouveaux sermons, modifier les entrées existantes et organiser votre contenu par playlist. Chaque sermon peut être lié à une vidéo ou un audio hébergé sur YouTube, Vimeo, Facebook ou une URL personnalisée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **contentApi.streamingServices.edit**. Consultez [Rôles & Autorisations](../settings/roles-permissions.md) si vous n'avez pas accès.
- Créez au moins une [playlist](playlists) pour organiser vos sermons
- Ayez vos identifiants vidéo ou vos URL prêts à partir de YouTube, Vimeo ou Facebook

</div>

## Affichage de votre bibliothèque de sermons

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Sermons**, et cliquez sur **Sermons**.
2. La page Sermons affiche toutes vos entrées de sermons, organisées par playlist. Chaque sermon affiche sa miniature, son titre et sa date.
3. Cliquez sur n'importe quel sermon pour afficher ou modifier ses détails.

## Ajout d'un sermon

1. Cliquez sur le bouton **Ajouter un sermon** en haut à droite et sélectionnez **Ajouter un sermon** dans le menu déroulant.
2. Sélectionnez une **Playlist** pour attribuer le sermon.
3. Choisissez votre **Fournisseur vidéo** -- YouTube, Vimeo, Facebook ou URL personnalisée. Nous recommandons YouTube car il fonctionne mieux avec le système B1.
4. Entrez l'identifiant vidéo ou l'URL et cliquez sur **Récupérer**. Pour YouTube, l'identifiant vidéo est la chaîne de caractères après `v=` dans l'URL YouTube.
5. Lorsque vous cliquez sur **Récupérer**, les détails du sermon sont importés automatiquement, y compris la date de publication, la durée, le titre, la description et la miniature.
6. Apportez les modifications souhaitées et cliquez sur **Enregistrer**.

:::tip
Vous pouvez également ajouter une URL de diffusion en direct permanente en sélectionnant **Ajouter une URL de diffusion en direct permanente** dans le menu déroulant **Ajouter un sermon**. Cela crée une connexion persistante à la diffusion en direct de votre chaîne YouTube à l'aide de votre ID de chaîne. Consultez [Diffusion en direct](live-streaming) pour plus de détails.
:::

## Modification d'un sermon

1. Cliquez sur n'importe quel sermon de votre bibliothèque pour ouvrir ses détails.
2. Mettez à jour le titre, l'orateur, la date, la description, la miniature ou les liens médias selon vos besoins.
3. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Détails du sermon

Chaque entrée de sermon peut inclure :

- **Titre** -- Le nom du sermon affiché aux visiteurs
- **Orateur** -- Qui a livré le sermon
- **Date** -- La date de publication ou de présentation
- **Description** -- Un résumé du contenu du sermon
- **Miniature** -- Une image d'aperçu affichée dans votre bibliothèque de sermons
- **Liens vidéo/audio** -- URL vers le média du sermon sur YouTube, Vimeo, Facebook ou un hôte personnalisé
- **URL du fichier audio (pour podcast)** -- Un lien direct vers un fichier MP3/M4A pour ce sermon. Soit coller une URL, soit cliquer sur **Télécharger un audio** pour télécharger un fichier et le remplir automatiquement. Seuls les sermons avec ce champ (ou un lien de fichier vidéo direct) défini sont inclus dans votre flux de podcast.

## Votre flux de podcast

Une fois qu'au moins un sermon a un fichier audio ou vidéo attaché, B1 Admin génère automatiquement un flux RSS de podcast pour votre église -- il n'y a rien à activer. Trouvez-le dans le panneau **Flux de podcast** sous la liste des sermons : cliquez sur l'icône de copie pour copier l'URL du flux, puis soumettez cette URL à Apple Podcasts, Spotify ou tout autre répertoire de podcast.

:::info
Les sermons qui ne font que lier à un lecteur intégré (comme un identifiant vidéo YouTube ou Vimeo) n'apparaîtront pas dans le flux de podcast -- les applications de podcast ont besoin d'un fichier média direct et téléchargeable. Ajoutez une **URL de fichier audio** pour inclure un sermon.
:::

## Planification d'un sermon pour la diffusion en direct

Après avoir ajouté un sermon, vous pouvez le planifier pour la diffusion sur votre page de diffusion en direct :

1. Dans le menu Sauter, choisissez **Sermons > Heures de diffusion en direct**.
2. Modifiez un service et sous **Paramètres vidéo**, sélectionnez votre sermon dans le menu déroulant.
3. Le sermon sera diffusé à l'heure de service planifiée.

:::info
Pour importer plusieurs sermons à la fois au lieu de les ajouter un par un, utilisez l'outil [Importation en masse](bulk-import) pour extraire les vidéos directement de votre compte YouTube ou Vimeo.
:::

## Prochaines étapes

- [Playlists](playlists) -- Organiser les sermons en séries
- [Diffusion en direct](live-streaming) -- Configurer votre calendrier de diffusion
- [Importation en masse](bulk-import) -- Importer plusieurs sermons à la fois
