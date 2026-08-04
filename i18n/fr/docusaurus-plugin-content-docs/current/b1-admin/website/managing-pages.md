---
title: "Gestion des pages"
---

# Gestion des pages

<div class="article-intro">

La vue Pages du site web est votre centre névralgique pour créer, modifier et organiser toutes les pages de votre site web d'église. Vous pouvez gérer à la fois le contenu de vos pages et la navigation de votre site depuis cet unique écran.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [Configuration initiale](initial-setup) pour configurer votre domaine et les paramètres de base du site
- Préparez votre contenu et vos images. Utilisez le gestionnaire de [Fichiers](files) pour téléverser d'abord vos ressources multimédias.

</div>

:::info
Si votre église possède plusieurs sites web (par exemple, des sites distincts par campus), utilisez le sélecteur de site en haut de la vue Pages du site web pour passer de l'un à l'autre. Chaque site a ses propres pages, sa propre navigation et ses propres paramètres d'[apparence](appearance).
:::

## Comprendre les types de pages

Le tableau **Pages** répertorie chaque page de votre site ainsi que son statut :

- **Générée** -- Pages créées automatiquement par le système à partir des données de votre église (par exemple, une page Groupes, une page Prédications, ou une page individuelle pour chaque prédication de votre bibliothèque). Ces pages se mettent à jour d'elles-mêmes lorsque vos données changent.
- **Personnalisée** -- Pages que vous avez créées vous-même avec votre propre contenu et mise en page.

Vous pouvez convertir n'importe quelle page générée automatiquement en page personnalisée si vous souhaitez un contrôle total sur son contenu et sa conception.

## Ajouter et modifier des pages

1. Cliquez sur le bouton **Ajouter une page** dans le coin supérieur droit du tableau Pages.
2. Choisissez un type de page (vierge ou un modèle) et donnez-lui un nom.
3. Cliquez sur **Modifier** à côté de n'importe quelle page pour ouvrir l'[éditeur de page](page-editor), où vous pouvez ajouter des sections, du texte, des images et d'autres éléments.
4. Cliquez sur **Paramètres de la page** pour mettre à jour le titre de la page, le chemin d'URL et d'autres métadonnées.
5. Utilisez le bouton **Aperçu** pour ouvrir votre page dans une nouvelle fenêtre et voir exactement comment elle apparaîtra aux visiteurs.

:::tip
Pour votre page d'accueil, définissez le chemin d'URL sur simplement `/`. Pour toutes les autres pages, utilisez un chemin descriptif comme `/a-propos` ou `/contact`.
:::

### Paramètres de la page

Ouvrez **Paramètres de la page** sur n'importe quelle page pour configurer :

- **Titre et chemin d'URL** -- Le nom de la page et son adresse sur votre site.
- **Visibilité** -- Choisissez qui peut voir la page : tout le monde, membres uniquement, personnel uniquement, ou membres de groupes spécifiques. C'est un moyen rapide de restreindre une page privée (comme une page de ressources pour le personnel) sans mot de passe distinct.
- **Méta-description** -- Un court résumé affiché dans les résultats des moteurs de recherche et les aperçus de liens sur les réseaux sociaux.
- **Redirections** -- Pointez un ancien chemin d'URL vers cette page, afin que les liens et signets vers une page retirée continuent de fonctionner.

## Gérer la navigation

La barre latérale gauche de la vue Pages du site web affiche vos liens de navigation. Ces liens contrôlent le menu que les visiteurs voient sur votre site web.

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation. Vous pouvez le faire pointer vers n'importe quelle page de votre site ou vers une URL externe.
2. Pour réorganiser les liens, faites-les glisser-déposer dans l'ordre souhaité. Vous pouvez également imbriquer des liens sous un élément parent pour créer des menus déroulants.
3. Cliquez sur l'icône **Modifier** à côté de n'importe quel lien pour changer son libellé, son URL ou sa position.
4. Pour retirer un lien de la navigation, cliquez sur l'icône **Supprimer**.

:::info
Retirer un lien de navigation ne supprime pas la page elle-même. La page existe toujours et reste accessible directement via son URL -- elle n'apparaîtra simplement plus dans le menu.
:::

## Conseils pour organiser votre site

- Limitez votre navigation de premier niveau à cinq ou six éléments pour que les visiteurs trouvent rapidement ce qu'ils cherchent.
- Utilisez des liens imbriqués pour les sous-pages associées (par exemple, un menu déroulant « À propos » avec « Notre équipe », « Croyances » et « Historique »).
- Vérifiez votre navigation sur mobile en cliquant sur **Aperçu mobile** pour vous assurer qu'elle fonctionne bien sur les petits écrans.
- Donnez aux pages des noms clairs et descriptifs qui aident les visiteurs à comprendre ce qu'ils y trouveront.

:::tip
Vous pouvez ajouter des [formulaires](../forms/creating-forms.md) à vos pages pour recueillir des inscriptions, des demandes de prière ou d'autres informations auprès des visiteurs.
:::

## Démarrer à partir d'un modèle de site

Si vous construisez votre site depuis zéro, vous pouvez l'amorcer à l'aide d'un **Modèle de site** plutôt que de créer les pages une par une. Un modèle de site crée un ensemble de pages préconstruites — accueil, à propos, contact, don, et d'autres — avec un contenu d'espace réservé et des liens de navigation déjà en place.

1. Sur l'écran Pages, cliquez sur le bouton **Modèles de site** (à côté du bouton **Ajouter une page**).
2. Parcourez les modèles disponibles et cliquez sur l'un d'eux pour prévisualiser sa structure de pages.
3. Lorsque vous en trouvez un qui vous plaît, cliquez sur **Appliquer le modèle**.
4. Les pages qui n'existent pas encore sont créées et ajoutées à votre navigation. Les pages existantes restent inchangées.

Après avoir appliqué un modèle, ouvrez chaque page dans l'[éditeur de page](page-editor) pour remplacer le texte et les images d'espace réservé par le contenu réel de votre église.

:::info
Les modèles de site créent la structure des pages et la navigation. Ils ne remplacent pas le jeu de couleurs ou les polices de votre site — ceux-ci sont contrôlés par [Apparence](appearance).
:::

## Visionneuse d'images (lightbox)

Lorsque les visiteurs cliquent sur une image de votre site web, elle s'ouvre dans une superposition plein écran. Cela permet aux visiteurs de voir les photos en plus grand sans quitter la page. Aucune configuration n'est requise — la visionneuse est activée automatiquement pour les images du contenu de vos pages.

## Étapes suivantes

- [Configuration initiale](initial-setup) -- Instructions de première configuration
- [Utiliser l'éditeur de page](page-editor) -- Apprenez à construire et à styliser le contenu des pages
- [Apparence](appearance) -- Personnalisez le thème visuel de votre site
- [Fichiers](files) -- Téléversez et gérez les ressources multimédias de vos pages
