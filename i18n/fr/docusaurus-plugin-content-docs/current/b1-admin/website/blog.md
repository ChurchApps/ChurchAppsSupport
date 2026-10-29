---
title: "Blog"
---

# Blog

<div class="article-intro">

La page Blog vous permet de publier des nouvelles, des mises à jour et des méditations sur le site web de votre église. Les billets apparaissent dans une liste de cartes à `/blog`, à leur propre adresse, et dans un flux RSS que d'autres outils (comme Zapier) peuvent surveiller pour détecter les nouveaux billets.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [Configuration initiale](initial-setup) de votre site web
- Ajoutez un lien de navigation vers `/blog` depuis [Gérer les pages](managing-pages) si vous voulez que les visiteurs trouvent votre blog depuis le menu

</div>

## Accéder au blog

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**.
2. Cliquez sur **Blog**.
3. La page Blog liste chaque billet avec son état et sa date de publication.

## Ajouter un billet

1. Cliquez sur **Ajouter un billet** dans le coin supérieur droit.
2. Saisissez un **titre**. Une **adresse web** (slug) conviviale est générée automatiquement pendant que vous tapez -- vous pouvez la modifier directement si vous voulez une autre adresse.
3. Ajoutez un **extrait** -- un court résumé affiché dans la liste des billets, les métadonnées de description et le flux RSS. Si vous le laissez vide, un extrait est généré automatiquement à partir du début du contenu de votre billet.
4. Rédigez le corps du billet dans l'éditeur **Contenu** en utilisant Markdown. Cliquez sur **Aperçu** pour voir l'apparence du billet mis en forme.
5. Choisissez une **catégorie** (sélectionnez-en une existante ou tapez-en une nouvelle) et des **étiquettes** facultatives séparées par des virgules.
6. Cliquez sur **Choisir une image** pour sélectionner une photo dans votre galerie [Fichiers](files), ou téléversez-en une nouvelle. Les photos téléversées s'ouvrent dans un outil de recadrage intégré verrouillé sur un format 16:9, afin que vous puissiez cadrer n'importe quelle photo pour l'adapter à l'en-tête du billet et aux cartes de la liste.
7. Définissez l'**auteur** -- il est réglé par défaut sur vous, mais vous pouvez rechercher et sélectionner n'importe quelle personne de votre base de données.
8. Activez **Publié** et définissez une **date de publication** lorsque vous êtes prêt à rendre le billet public. Laissez l'option désactivée pour enregistrer le billet comme brouillon.

:::tip
Définissez une **date de publication** future pour programmer un billet. Il reste masqué aux visiteurs et affiche une étiquette **Programmé** dans la liste des billets jusqu'à ce que cette date arrive.
:::

## États des billets

Chaque billet de la liste affiche l'un de trois états :

- **Brouillon** -- Non publié. Visible uniquement dans l'administration.
- **Programmé** -- Publié est activé, mais la date de publication est dans le futur.
- **Publié** -- En ligne sur votre site web et inclus dans le flux RSS.

## Modifier, prévisualiser et supprimer des billets

- Cliquez sur **Modifier** à côté d'un billet pour faire des changements.
- Cliquez sur **Voir sur le site** (affiché sur les billets publiés) pour ouvrir le billet en ligne sur votre site web dans un nouvel onglet.
- Cliquez sur **Supprimer** pour retirer définitivement un billet.

## Comment les visiteurs voient votre blog

Les billets publiés apparaissent à `{yoursite}/blog`, 10 par page avec des liens **Plus anciens**/**Plus récents** pour parcourir vos archives, accompagnés d'un filtre par catégorie et de la signature et de la photo de chaque billet. Les étiquettes s'affichent aussi comme des puces cliquables, permettant aux visiteurs de filtrer la liste par étiquette de la même façon. Chaque billet a sa propre adresse, à `{yoursite}/blog/{slug}`, et comprend des billets connexes de la même catégorie. La page du blog publie aussi un flux RSS, détectable automatiquement par les lecteurs de flux et les outils d'automatisation comme Zapier.

:::info
Les billets de blog sont un type de contenu distinct des pages ordinaires du site web -- ils ne sont pas créés dans l'[éditeur de pages](page-editor) et n'apparaissent pas dans la liste des pages. Cela garde la rédaction des billets rapide et concentrée sur l'écriture.
:::

## Ajouter des commentaires sous les billets

B1 n'héberge pas lui-même les commentaires des billets, mais vous pouvez ajouter un service de commentaires. Vous pouvez aussi placer n'importe quel autre élément sous chaque billet, comme une inscription à une newsletter ou un bouton de don.

1. Inscrivez-vous à un service de commentaires comme [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) ou [Disqus](https://disqus.com) et copiez son code d'intégration.
2. Sur la page Blog, faites défiler jusqu'à **Sous chaque billet**.
3. Collez le code d'intégration et cliquez sur **Enregistrer**.

Le code apparaît sous le contenu de chaque billet publié. Votre service de commentaires gère la modération et le filtrage des pourriels, alors vérifiez régulièrement son tableau de bord.

:::tip
Videz la zone et cliquez sur **Enregistrer** pour retirer le code de chaque billet. Seules les personnes qui peuvent modifier les paramètres de l'église voient cette zone.
:::

## Étapes suivantes

- [Gérer les pages](managing-pages) -- Ajoutez un lien de navigation vers votre blog
- [Fichiers](files) -- Téléversez des photos à utiliser dans vos billets
- [Intégration Zapier](../integrations/zapier.md) -- Déclenchez des automatisations lorsque de nouveaux billets sont publiés
