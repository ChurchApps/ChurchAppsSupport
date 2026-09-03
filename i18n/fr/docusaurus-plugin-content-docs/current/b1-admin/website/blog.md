---
title: "Blog"
---

# Blog

<div class="article-intro">

La page Blog vous permet de publier des nouvelles, des mises à jour et des dévotionnels sur le site web de votre église. Les articles apparaissent dans une liste de cartes à `/blog`, à leur propre URL, et dans un flux RSS que d'autres outils (comme Zapier) peuvent surveiller pour les nouveaux articles.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [Configuration Initiale](initial-setup) pour votre site web
- Ajoutez un lien de navigation à `/blog` à partir de [Gestion des Pages](managing-pages) si vous voulez que les visiteurs trouvent votre blog depuis le menu

</div>

## Accès au Blog

1. Dans B1 Admin, cliquez sur **Site Web** dans le menu de gauche.
2. Cliquez sur l'onglet **Blog** en haut de la vue Pages du Site Web.
3. La page Blog énumère chaque article avec son état et sa date de publication.

## Ajout d'un Article

1. Cliquez sur **Ajouter un Article** dans le coin supérieur droit.
2. Entrez un **Titre**. Un slug convivial pour l'URL est généré automatiquement au fur et à mesure de votre saisie -- vous pouvez l'éditer directement si vous voulez une adresse différente.
3. Ajoutez un **Résumé** -- un court résumé affiché dans la liste des articles, les descriptions méta, et le flux RSS. Si vous le laissez vide, un est généré automatiquement à partir du début du contenu de votre article.
4. Écrivez le corps de l'article dans l'éditeur de **Contenu** en utilisant Markdown. Cliquez sur **Prévisualiser** pour voir à quoi ressemblera l'article formaté.
5. Choisissez une **Catégorie** (choisissez une existante ou tapez une nouvelle) et des **Étiquettes** facultatives séparées par des virgules.
6. Cliquez sur **Sélectionner une Image** pour choisir une photo de votre galerie [Fichiers](files), ou en charger une nouvelle. Les photos chargées s'ouvrent dans un outil de recadrage intégré verrouillé à un rapport 16:9, pour que vous puissiez cadrer n'importe quelle photo pour s'adapter à l'en-tête de l'article et aux cartes de liste.
7. Réglez l'**Auteur** -- il devient vous par défaut, mais vous pouvez rechercher et sélectionner n'importe quelle personne dans votre base de données.
8. Activez **Publié** et réglez une **Date de Publication** lorsque vous êtes prêt à rendre l'article public. Laissez-le désactivé pour enregistrer l'article en tant que brouillon.

:::tip
Réglez une **Date de Publication** dans le futur pour programmer un article. Il reste caché des visiteurs et affiche un jeton **Programmé** dans la liste Blog jusqu'à ce que cette date arrive.
:::

## États d'Article

Chaque article de la liste affiche l'un des trois états :

- **Brouillon** -- Non publié. Uniquement visible dans l'admin.
- **Programmé** -- La publication est activée, mais la date de publication est dans le futur.
- **Publié** -- En direct sur votre site web et inclus dans le flux RSS.

## Édition, Prévisualisation et Suppression d'Articles

- Cliquez sur l'icône **Éditer** à côté d'un article pour apporter des modifications.
- Cliquez sur l'icône **Afficher** (visible sur les articles publiés) pour ouvrir l'article en direct sur votre site web dans un nouvel onglet.
- Cliquez sur l'icône **Supprimer** pour supprimer définitivement un article.

## Comment les Visiteurs Voient Votre Blog

Les articles publiés apparaissent à `{votresite}/blog`, 10 par page avec les liens **Anciens**/**Plus Récents** pour parcourir votre archive, ainsi qu'un filtre de catégorie et la signature et la photo de chaque article. Les étiquettes s'affichent aussi en tant que puces cliquables, permettant aux visiteurs de filtrer la liste par étiquette de la même façon. Les articles individuels vivent à `{votresite}/blog/{slug}` et incluent des articles connexes de la même catégorie. La page blog publie aussi un flux RSS, auto-découvrable par les lecteurs de flux et les outils d'automatisation comme Zapier.

:::info
