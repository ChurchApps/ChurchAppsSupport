---
title: "Rédiger des articles pour votre site dans B1 Admin"
sidebar_label: "Blogue"
description: "Créez, planifiez et publiez des articles sur votre site dans B1 Admin : extraits, catégories, étiquettes, photos d'en-tête et intégrations de commentaires."
---

# Blogue

<div class="article-intro">

La page Blogue vous permet de publier des nouvelles, des mises à jour et des méditations sur le site web de votre église. Les articles apparaissent dans une liste de cartes à `/blog`, à leur propre adresse, et dans un flux RSS que d'autres outils (comme Zapier) peuvent surveiller pour détecter les nouveaux articles.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Effectuez la [configuration initiale](./initial-setup.md) de votre site web
- Ajoutez un lien de navigation vers `/blog` depuis [Gérer les pages](./managing-pages.md) si vous voulez que les visiteurs trouvent votre blogue depuis le menu

</div>

## Accéder au blogue

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**.
2. Cliquez sur **Blogue**.
3. La page Blogue liste chaque article avec son état et sa date de publication.

## Ajouter un article

1. Cliquez sur **Ajouter un article** dans le coin supérieur droit.
2. Saisissez un **titre**. Une **adresse web** (identifiant de l'URL) conviviale est générée automatiquement pendant que vous tapez -- vous pouvez la modifier directement si vous voulez une autre adresse.
3. Ajoutez un **extrait** -- un court résumé affiché dans la liste des articles, les métadonnées de description et le flux RSS. Si vous le laissez vide, il est généré automatiquement à partir du début du contenu de l'article.
4. Rédigez le corps de l'article dans l'éditeur **Contenu** en utilisant Markdown. Cliquez sur **Aperçu** pour voir l'apparence de l'article mis en forme.
5. Choisissez une **catégorie** (sélectionnez-en une existante ou tapez-en une nouvelle) et des **étiquettes** facultatives séparées par des virgules.
6. Cliquez sur **Choisir une image** pour sélectionner une photo dans votre galerie de [Fichiers](./files.md), ou téléversez-en une nouvelle. Les photos téléversées s'ouvrent dans un outil de recadrage intégré verrouillé au format 16:9, afin que vous puissiez cadrer n'importe quelle photo pour l'adapter à l'en-tête de l'article et aux cartes de la liste.
7. Définissez l'**auteur** -- il est réglé par défaut sur vous, mais vous pouvez rechercher et sélectionner n'importe quelle personne de votre base de données.
8. Activez **Publié** et définissez une **date de publication** lorsque vous êtes prêt à rendre l'article public. Laissez-le désactivé pour enregistrer l'article comme brouillon.

:::tip
Réglez une **date de publication** future pour programmer un article. Il reste masqué des visiteurs et affiche une pastille **Programmé** dans la liste du blogue jusqu'à ce que cette date arrive.
:::

## États des articles

Chaque article de la liste affiche l'un des trois états suivants :

- **Brouillon** -- Non publié. Visible uniquement dans l'administration.
- **Programmé** -- Publié est activé, mais la date de publication est dans le futur.
- **Publié** -- En ligne sur votre site web et inclus dans le flux RSS.

## Modifier, prévisualiser et supprimer des articles

- Cliquez sur **Modifier** à côté d'un article pour y apporter des changements.
- Cliquez sur **Voir sur le site** (affiché sur les articles publiés) pour ouvrir l'article en ligne sur votre site web dans un nouvel onglet.
- Cliquez sur **Supprimer** pour retirer définitivement un article.

## Comment les visiteurs voient votre blogue

Les articles publiés apparaissent à `{votresite}/blog`, 10 par page avec des liens **Plus anciens** et **Plus récents** pour parcourir vos archives, ainsi qu'un filtre par catégorie et la signature et la photo de chaque auteur. Les étiquettes s'affichent aussi comme des pastilles cliquables, permettant aux visiteurs de filtrer la liste par étiquette de la même façon. Chaque article a sa propre adresse à `{votresite}/blog/{identifiant}` et affiche des articles connexes de la même catégorie. La page du blogue publie aussi un flux RSS, détectable automatiquement par les lecteurs de flux et les outils d'automatisation comme Zapier.

:::info
Les articles de blogue sont un type de contenu distinct des pages ordinaires du site web -- ils ne sont pas créés dans l'[éditeur de pages](./page-editor.md) et n'apparaissent pas dans la liste des pages. Cela rend la rédaction des articles rapide et axée sur l'écriture.
:::

## Ajouter des commentaires sous les articles

B1 n'héberge pas lui-même les commentaires des articles, mais vous pouvez ajouter un service de commentaires. Vous pouvez aussi placer n'importe quel autre élément sous chaque article, comme une inscription à un bulletin d'information ou un bouton de dons.

1. Inscrivez-vous à un service de commentaires comme [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) ou [Disqus](https://disqus.com) et copiez son code d'intégration.
2. Sur la page Blogue, faites défiler jusqu'à **Sous chaque article**.
3. Collez le code d'intégration et cliquez sur **Enregistrer**.

Le code apparaît sous le contenu de chaque article publié. Votre service de commentaires gère la modération et le filtrage des pourriels, alors consultez régulièrement son tableau de bord.

:::tip
Videz la zone et cliquez sur **Enregistrer** pour retirer le code de chaque article. Seules les personnes qui peuvent modifier les paramètres de l'église voient cette zone.
:::

## Et ensuite

- [Gérer les pages](./managing-pages.md) -- Ajouter un lien de navigation vers votre blogue
- [Fichiers](./files.md) -- Téléverser des photos à utiliser dans vos articles
- [Intégration Zapier](../integrations/zapier.md) -- Déclencher des automatisations lorsque de nouveaux articles sont publiés
