---
title: "Importation en masse"
description: "Importez en masse des vidéos de prédication depuis une chaîne YouTube ou un compte Vimeo, ou des épisodes de balado depuis un flux RSS, dans B1 Admin, puis classez-les dans une playlist."
---

# Importation en masse

<div class="article-intro">

La page Importation en masse vous permet de remplir rapidement votre bibliothèque de prédications en important des vidéos depuis YouTube ou Vimeo, ou des épisodes d'un flux RSS de balados. C'est le moyen le plus rapide d'intégrer vos contenus de prédication existants, plutôt que d'ajouter chaque prédication une à une.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **Modifier les services** dans la section **Contenu** de votre rôle. Voir [Rôles et autorisations](../settings/roles-permissions.md) si vous n'y avez pas accès.
- Créez au moins une [playlist](./playlists.md) dans laquelle importer vos prédications
- Ayez à portée de main l'identifiant de votre chaîne YouTube, les informations de votre compte Vimeo ou l'adresse de votre flux de balado

</div>

## Choisir votre source {#choosing-your-source}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Prédications** et cliquez sur **Prédications**. Cliquez sur **Ajouter une prédication** et choisissez **Importation en masse** dans le menu.
2. Sous **Choisir la source d'importation**, vous verrez trois options :
   - **YouTube** -- Importer des vidéos depuis une chaîne YouTube
   - **Vimeo** -- Importer des vidéos depuis un compte Vimeo
   - **Flux RSS de balado** -- Importer des épisodes d'un balado comme prédications audio
3. Cliquez sur l'option de la plateforme où sont hébergées vos prédications (ou cliquez sur **Importer depuis YouTube**, **Importer depuis Vimeo** ou **Importer depuis le flux de balado** sous sa description). Cliquez sur **Retour** en haut de la page pour revenir au choix de la source.

:::tip
Vous pouvez revenir en arrière et changer de source à tout moment si vos vidéos se trouvent sur les deux plateformes.
:::

## Avant d'importer {#before-you-import}

Avant d'importer des vidéos, vous avez besoin d'au moins une playlist pour les organiser. Si vous n'avez encore créé aucune playlist :

1. Retournez à la page **Prédications** et repérez le panneau **Playlists**.
2. Cliquez sur **Créer la première playlist** et renseignez le nom, la description, la date de publication et la miniature.
3. Cliquez sur **Enregistrer**, puis revenez à l'importation en masse en cliquant sur **Ajouter une prédication** et en choisissant **Importation en masse**.

Voir [Playlists](./playlists.md) pour des instructions détaillées sur la création et la gestion des playlists.

## Importer des vidéos {#importing-videos}

1. Après avoir choisi YouTube ou Vimeo, saisissez votre **identifiant de chaîne YouTube** ou **identifiant de chaîne Vimeo** dans le champ prévu.
2. Cliquez sur le bouton **Récupérer** pour obtenir les vidéos de votre chaîne. Si les vidéos ne peuvent pas être chargées ou si la chaîne n'en contient aucune, un message l'indique ; vérifiez l'identifiant et réessayez.
3. Une fois la récupération terminée, vous verrez la liste de vos vidéos, chacune avec une case à cocher sous **Importer**.
4. Cochez la case de chaque vidéo que vous souhaitez importer.
5. Cliquez sur la liste déroulante **Importer dans la playlist** pour choisir la playlist à laquelle ajouter ces vidéos.
6. Cliquez sur le bouton **Importer** pour terminer l'importation en masse. Vous revenez au choix de la source à la fin de l'opération.

Si vous cliquez sur **Importer** sans avoir choisi de playlist ni coché de vidéo, B1 vous demande d'abord de le faire. Cliquez sur **Annuler** pour quitter sans importer.

Vos vidéos sont importées avec tous leurs détails, y compris les titres, les descriptions, les dates et les miniatures. Les caractères spéciaux présents dans les titres et descriptions YouTube, comme `&`, les apostrophes et les guillemets, sont conservés tels quels plutôt que sous forme de codes comme `&amp;`.

:::info
L'importation en masse est idéale pour démarrer lorsque vous migrez depuis une autre plateforme. Pour ajouter des prédications individuelles par la suite, utilisez plutôt la page [Gérer les prédications](./managing-sermons.md).
:::

## Importer des épisodes de balado {#importing-podcast-episodes}

Si vos prédications sont publiées sous forme de balado (Spotify pour les créateurs / Anchor, Buzzsprout, Podbean, etc.), vous pouvez importer les épisodes comme prédications audio.

1. Choisissez **Flux RSS de balado** et collez l'adresse de votre flux dans **URL du flux de balado**. Où la trouver :
   - **Spotify pour les créateurs (Anchor)** -- **Paramètres** > **Disponibilité** > **Diffusion RSS**. L'adresse ressemble à `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- le lien **Flux RSS** sur le tableau de bord de votre balado.
   - La plupart des autres hébergeurs affichent l'adresse du flux RSS dans les paramètres ou la page de diffusion du balado.
2. Cliquez sur **Récupérer**. Le nom du balado apparaît au-dessus d'une liste de ses épisodes avec leurs dates de publication. Si le flux ne peut pas être chargé ou ne comporte aucun épisode audio, un message l'indique ; vérifiez l'adresse et réessayez.
3. Les nouveaux épisodes sont cochés pour vous. Les épisodes déjà présents dans votre bibliothèque de prédications sont marqués **Déjà importé** et ne peuvent pas être cochés, afin de ne rien ajouter deux fois.
4. Décochez les épisodes que vous ne voulez pas, choisissez une playlist sous **Importer dans la playlist**, puis cliquez sur **Importer**.

Chaque épisode devient une prédication audio avec son titre, sa description, sa date, son image et sa durée. Les membres voient **Écouter** et **Télécharger l'audio** sur ces prédications dans l'application B1.

L'importation est une copie ponctuelle, et non un lien en direct vers le flux. Lorsque vous publiez de nouveaux épisodes, revenez exécuter l'importation avec la même adresse de flux ; seuls les nouveaux épisodes sont cochés.

:::note
Seul l'audio est importé. Les épisodes de balado vidéo ne sont pas importés ; ajoutez-les plutôt via YouTube, Vimeo ou [Gérer les prédications](./managing-sermons.md).
:::

:::tip
Vous voulez une liste sur votre site web ou dans votre application qui reflète toujours votre balado sans réimporter ? Ajoutez l'élément **Balado** à une page du créateur de site web, puis ajoutez cette page comme onglet **Page** dans votre application mobile.
:::

## Étapes suivantes {#next-steps}

- [Gérer les prédications](./managing-sermons.md) -- Modifier les détails des prédications importées
- [Playlists](./playlists.md) -- Créer et gérer les séries de prédications
- [Diffusion en direct](./live-streaming.md) -- Configurer la diffusion en direct de vos services
