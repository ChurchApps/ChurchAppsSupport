---
title: "Blog"
---

# Blog

<div class="article-intro">

La page Blog vous permet de publier des actualités, des mises à jour et des méditations sur le site web de votre église. Les articles apparaissent dans une liste de cartes à `/blog`, à leur propre URL, et dans un flux RSS que d'autres outils (comme Zapier) peuvent surveiller pour détecter de nouveaux articles.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [Configuration initiale](initial-setup) de votre site web
- Ajoutez un lien de navigation vers `/blog` depuis [Gérer les pages](managing-pages) si vous souhaitez que les visiteurs trouvent votre blog depuis le menu

</div>

## Accéder au Blog

1. Dans B1 Admin, cliquez sur **Site web** dans le menu de gauche.
2. Cliquez sur l'onglet **Blog** en haut de la vue Pages du site web.
3. La page Blog liste chaque article avec son état et sa date de publication.

## Ajouter un article

1. Cliquez sur **Ajouter un article** dans le coin supérieur droit.
2. Saisissez un **Titre**. Un identifiant d'URL adapté est généré automatiquement au fur et à mesure que vous tapez -- vous pouvez le modifier directement si vous souhaitez une adresse différente.
3. Ajoutez un **Extrait** -- un court résumé affiché dans la liste des articles, les méta-descriptions et le flux RSS. Si vous le laissez vide, un extrait est généré automatiquement à partir du début du contenu de votre article.
4. Rédigez le corps de l'article dans l'éditeur **Contenu** en utilisant le Markdown. Cliquez sur **Aperçu** pour voir à quoi ressemblera l'article formaté.
5. Choisissez une **Catégorie** (sélectionnez-en une existante ou saisissez-en une nouvelle) et des **Étiquettes** facultatives séparées par des virgules.
6. Cliquez sur **Sélectionner une image** pour choisir une photo dans votre galerie [Fichiers](files), ou téléversez-en une nouvelle. Les photos téléversées s'ouvrent dans un outil de recadrage intégré verrouillé sur un ratio 16:9, afin que vous puissiez cadrer n'importe quelle photo pour qu'elle s'adapte à l'en-tête de l'article et aux cartes de liste.
7. Définissez l'**Auteur** -- il vous est attribué par défaut, mais vous pouvez rechercher et sélectionner n'importe quelle personne de votre base de données.
8. Activez **Publié** et définissez une **Date de publication** lorsque vous êtes prêt à rendre l'article public. Laissez désactivé pour enregistrer l'article comme brouillon.

:::tip
Définissez une **Date de publication** future pour programmer un article. Il reste caché aux visiteurs et affiche une puce **Programmé** dans la liste du Blog jusqu'à ce que cette date arrive.
:::

## États des articles

Chaque article de la liste affiche l'un des trois états suivants :

- **Brouillon** -- Non publié. Visible uniquement dans l'administration.
- **Programmé** -- Publié est activé, mais la date de publication est dans le futur.
- **Publié** -- En ligne sur votre site web et inclus dans le flux RSS.

## Modifier, prévisualiser et supprimer des articles

- Cliquez sur l'icône **Modifier** à côté d'un article pour apporter des modifications.
- Cliquez sur l'icône **Voir** (visible sur les articles publiés) pour ouvrir l'article en ligne sur votre site web dans un nouvel onglet.
- Cliquez sur l'icône **Supprimer** pour retirer définitivement un article.

## Comment les visiteurs voient votre blog

Les articles publiés apparaissent sur `{yoursite}/blog`, 10 par page avec des liens **Plus anciens**/**Plus récents** pour parcourir vos archives, ainsi qu'un filtre de catégorie et la signature et la photo de chaque article. Les étiquettes s'affichent également sous forme de puces cliquables, permettant aux visiteurs de filtrer la liste par étiquette de la même manière. Les articles individuels se trouvent à `{yoursite}/blog/{slug}` et incluent des articles associés de la même catégorie. La page du blog publie également un flux RSS, détectable automatiquement par les lecteurs de flux et les outils d'automatisation comme Zapier.

:::info
Les articles de blog sont un type de contenu distinct des pages web ordinaires -- ils ne sont pas créés dans l'[éditeur de pages](page-editor) et n'apparaissent pas dans la liste des Pages. Cela permet de garder la rédaction du blog rapide et centrée sur l'écriture.
:::

## Prochaines étapes

- [Gérer les pages](managing-pages) -- Ajouter un lien de navigation vers votre blog
- [Fichiers](files) -- Téléverser des photos à utiliser dans vos articles
- [Intégration Zapier](../integrations/zapier.md) -- Déclencher des automatisations lorsque de nouveaux articles sont publiés
