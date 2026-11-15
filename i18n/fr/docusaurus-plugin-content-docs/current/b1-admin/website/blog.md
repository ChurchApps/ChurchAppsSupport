---
title: "Rédiger des billets de blogue pour votre site web dans B1 Admin"
sidebar_label: "Blogue"
description: "Créez, programmez et publiez des billets de blogue sur le site web de votre église dans B1 Admin, avec les extraits, les catégories, les étiquettes, les photos d'en-tête et les intégrations de commentaires."
---

# Blogue

<div class="article-intro">

La page Blogue vous permet de publier des nouvelles, des mises à jour et des méditations sur le site web de votre église. Les billets apparaissent dans une liste de cartes à `/blog`, à leur propre adresse, et dans un flux RSS que d'autres outils (comme Zapier) peuvent surveiller pour détecter les nouveaux billets.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [configuration initiale](./initial-setup.md) de votre site web
- Ajoutez un lien de navigation vers `/blog` depuis [Gérer les pages](./managing-pages.md) si vous voulez que les visiteurs trouvent votre blogue depuis le menu

</div>

## Accéder au blogue {#accessing-the-blog}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**.
2. Cliquez sur **Blogue**.
3. La page Blogue liste chaque billet avec son état et sa date de publication.

## Ajouter un billet {#adding-a-post}

1. Cliquez sur **Ajouter un billet** dans le coin supérieur droit.
2. Saisissez un **titre**. Une **adresse web** conviviale (segment d'URL) est générée automatiquement pendant votre saisie -- vous pouvez la modifier directement si vous voulez une autre adresse.
3. Ajoutez un **extrait** -- un court résumé affiché dans la liste des billets, les métadonnées de description et le flux RSS. Si vous le laissez vide, il est généré automatiquement à partir du début du contenu de votre billet.
4. Rédigez le corps du billet dans l'éditeur **Contenu** en Markdown. Cliquez sur **Aperçu** pour voir l'apparence du billet mis en forme.
5. Choisissez une **catégorie** (sélectionnez une catégorie existante ou tapez-en une nouvelle) et des **étiquettes** facultatives séparées par des virgules.
6. Cliquez sur **Choisir une image** pour sélectionner une photo dans votre galerie [Fichiers](./files.md), ou téléversez-en une nouvelle. Les photos téléversées s'ouvrent dans un outil de recadrage intégré verrouillé au ratio 16:9, afin que vous puissiez cadrer n'importe quelle photo pour l'en-tête du billet et les cartes de la liste.
7. Définissez l'**auteur** -- il correspond par défaut à vous, mais vous pouvez rechercher et sélectionner n'importe quelle personne de votre base de données.
8. Activez **Publié** lorsque vous êtes prêt à rendre le billet public. Un champ **Date de publication** apparaît, réglé sur aujourd'hui ; modifiez-le si vous voulez une autre date. Laissez le commutateur sur **Brouillon** pour enregistrer le billet comme brouillon.
9. Cliquez sur **Enregistrer**. Un billet doit avoir un titre et une adresse web qu'aucun autre billet n'utilise.

:::tip
Définissez une **date de publication** future pour programmer un billet. Il reste masqué des visiteurs et affiche une puce **Programmé** dans la liste du blogue jusqu'à ce que cette date arrive.
:::

## États des billets {#post-states}

Chaque billet de la liste affiche l'un de trois états :

- **Brouillon** -- Non publié. Visible seulement dans l'administration.
- **Programmé** -- Publié est activé, mais la date de publication est dans le futur.
- **Publié** -- En ligne sur votre site web et inclus dans le flux RSS.

## Modifier, prévisualiser et supprimer les billets {#editing-previewing-and-deleting-posts}

- Cliquez sur **Modifier** à côté d'un billet pour y apporter des changements.
- Cliquez sur **Voir sur le site** (affiché sur les billets publiés) pour ouvrir le billet en ligne sur votre site web dans un nouvel onglet.
- Cliquez sur **Supprimer** pour retirer définitivement un billet.

## Comment les visiteurs voient votre blogue {#how-visitors-see-your-blog}

Les billets publiés apparaissent à `{yoursite}/blog`, 10 par page avec des liens **Billets plus anciens** / **Billets plus récents** pour parcourir vos archives, ainsi que des puces de catégories qui filtrent la liste, et la signature et la photo de chaque billet. Les étiquettes s'affichent sous forme de puces cliquables au bas de chaque billet, ce qui permet aux visiteurs de filtrer la liste par étiquette de la même façon. Les billets individuels se trouvent à `{yoursite}/blog/{slug}` et se terminent par une section **Plus dans** *catégorie* qui liste jusqu'à trois autres billets de la même catégorie. Voir [Blogue](../../b1-church/content/blog.md) dans le guide B1.church pour ce que voient les visiteurs. La page du blogue publie aussi un flux RSS, détectable automatiquement par les lecteurs de flux et les outils d'automatisation comme Zapier.

Les billets publiés peuvent aussi apparaître dans une section **Nouvelles** sur l'écran d'accueil de l'application de votre église, si vous l'activez -- voir [Sections de l'écran d'accueil](../settings/mobile-app.md#home-screen-sections).

:::info
Les billets de blogue sont un type de contenu distinct des pages ordinaires du site web -- ils ne sont pas créés dans l'[éditeur de pages](./page-editor.md) et n'apparaissent pas dans la liste des pages. Cela permet une rédaction rapide et centrée sur l'écriture.
:::

## Ajouter des commentaires sous les billets {#adding-comments-below-posts}

B1 n'héberge pas lui-même les commentaires du blogue, mais vous pouvez ajouter un service de commentaires. Vous pouvez aussi placer n'importe quel autre élément sous chaque billet, comme une inscription à un bulletin ou un bouton de don.

1. Inscrivez-vous à un service de commentaires comme [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) ou [Disqus](https://disqus.com) et copiez son code d'intégration.
2. Sur la page Blogue, faites défiler jusqu'à **Sous chaque billet**.
3. Collez le code d'intégration et cliquez sur **Enregistrer**.

Le code apparaît sous le contenu de chaque billet publié. Votre service de commentaires gère la modération et le filtrage des pourriels ; consultez donc régulièrement son tableau de bord.

:::tip
Effacez la case et cliquez sur **Enregistrer** pour retirer le code de chaque billet. Seules les personnes pouvant modifier les paramètres de l'église voient cette case.
:::

## Étapes suivantes {#next-steps}

- [Gérer les pages](./managing-pages.md) -- Ajouter un lien de navigation vers votre blogue
- [Fichiers](./files.md) -- Téléverser des photos à utiliser dans vos billets
- [Intégration Zapier](../integrations/zapier.md) -- Déclencher des automatisations lorsque de nouveaux billets sont publiés
