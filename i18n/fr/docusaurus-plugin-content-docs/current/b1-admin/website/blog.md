---
title: "Blog"
---

# Blog

<div class="article-intro">

La page Blog vous permet de publier des actualités, des mises à jour et des dévotionnels sur le site web de votre église. Les articles apparaissent dans une liste de cartes à `/blog`, à leur propre URL et dans un flux RSS que d'autres outils (comme Zapier) peuvent surveiller pour les nouveaux articles.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [configuration initiale](initial-setup) de votre site web
- Ajoutez un lien de navigation vers `/blog` à partir de [Gestion des pages](managing-pages) si vous souhaitez que les visiteurs trouvent votre blog dans le menu

</div>

## Accès au blog

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**.
2. Cliquez sur **Blog**.
3. La page Blog répertorie chaque article ainsi que son état et sa date de publication.

## Ajouter un article

1. Cliquez sur **Ajouter un article** dans le coin supérieur droit.
2. Entrez un **Titre**. Un slug convivial pour les URL est généré automatiquement au fur et à mesure que vous tapez -- vous pouvez le modifier directement si vous souhaitez une adresse différente.
3. Ajoutez un **Extrait** -- un court résumé affiché dans la liste des articles, les métadescriptions et le flux RSS. Si vous le laissez vide, un est généré automatiquement à partir du début du contenu de votre article.
4. Écrivez le corps de l'article dans l'éditeur de **Contenu** en utilisant Markdown. Cliquez sur **Aperçu** pour voir comment l'article formaté ressemblera.
5. Choisissez une **Catégorie** (sélectionnez une existante ou tapez-en une nouvelle) et optionnellement des **Étiquettes** séparées par des virgules.
6. Cliquez sur **Sélectionner une image** pour choisir une photo de votre galerie [Fichiers](files), ou téléchargez-en une nouvelle. Les photos téléchargées s'ouvrent dans un outil de recadrage intégré verrouillé sur un rapport 16:9, afin que vous puissiez cadrer n'importe quelle photo pour l'en-tête de l'article et les cartes de liste.
7. Définissez l'**Auteur** -- il adopte par défaut vos paramètres, mais vous pouvez rechercher et sélectionner n'importe quelle personne de votre base de données.
8. Activez **Publié** et définissez une **Date de publication** lorsque vous êtes prêt à rendre l'article public. Laissez-le désactivé pour enregistrer l'article sous forme de brouillon.

:::tip
Définissez une **Date de publication** dans le futur pour planifier un article. Il reste caché des visiteurs et affiche une puce **Planifié** dans la liste Blog jusqu'à cette date.
:::

## États des articles

Chaque article de la liste affiche l'un des trois états :

- **Brouillon** -- Non publié. Visible uniquement dans l'admin.
- **Planifié** -- Publié est activé, mais la date de publication est dans le futur.
- **Publié** -- En direct sur votre site web et inclus dans le flux RSS.

## Édition, aperçu et suppression d'articles

- Cliquez sur l'icône **Éditer** à côté d'un article pour apporter des modifications.
- Cliquez sur l'icône **Afficher** (visible sur les articles publiés) pour ouvrir l'article en direct sur votre site web dans un nouvel onglet.
- Cliquez sur l'icône **Supprimer** pour supprimer définitivement un article.

## Comment les visiteurs voient votre blog

Les articles publiés apparaissent à `{yoursite}/blog`, 10 par page avec des liens **Plus ancien**/**Plus récent** pour parcourir votre archive, ainsi qu'un filtre de catégorie et la signature et la photo de chaque article. Les étiquettes se rendent également en tant que puces cliquables, permettant aux visiteurs de filtrer la liste par étiquette de la même manière. Les articles individuels se trouvent à `{yoursite}/blog/{slug}` et incluent les articles connexes de la même catégorie. La page de blog publie également un flux RSS, détectable automatiquement par les lecteurs de flux et les outils d'automatisation comme Zapier.

:::info
Les articles de blog sont un type de contenu séparé des pages de site web ordinaires -- ils ne sont pas construits dans l'[éditeur de page](page-editor) et n'apparaissent pas dans la liste des pages. Cela maintient la rédaction de blog rapide et concentrée sur l'écriture.
:::

## Étapes suivantes

- [Gestion des pages](managing-pages) -- Ajoutez un lien de navigation vers votre blog
- [Fichiers](files) -- Téléchargez des photos à utiliser dans vos articles
- [Intégration Zapier](../integrations/zapier.md) -- Déclenchez des automatisations lorsque de nouveaux articles sont publiés
