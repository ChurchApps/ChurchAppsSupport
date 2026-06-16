---
title: "Gestion des pages"
---

# Gestion des pages

<div class="article-intro">

La vue Pages du site Web est votre centre central pour créer, modifier et organiser toutes les pages de votre site Web d'église. Vous pouvez gérer à la fois le contenu de votre page et la navigation de votre site à partir d'un seul écran.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [Configuration initiale](initial-setup) pour configurer votre domaine et les paramètres de site de base
- Disposez de votre contenu et de vos images prêts. Utilisez le gestionnaire [Fichiers](files) pour télécharger d'abord les ressources multimédia.

</div>

## Comprendre les types de pages

Le tableau **Pages** répertorie toutes les pages de votre site avec son statut :

- **Généré** -- Pages qui ont été créées automatiquement par le système en fonction des données de votre église (par exemple, une page Groupes ou une page Sermons). Ces pages se mettent à jour automatiquement au fur et à mesure que vos données changent.
- **Personnalisé** -- Pages que vous avez créées vous-même avec votre propre contenu et mise en page.

Vous pouvez convertir n'importe quelle page auto-générée en page personnalisée si vous souhaitez contrôler complètement son contenu et sa conception.

## Ajouter et modifier des pages

1. Cliquez sur le bouton **Ajouter une page** dans le coin supérieur droit du tableau Pages.
2. Choisissez un type de page (vierge ou un modèle) et donnez-lui un nom.
3. Cliquez sur **Modifier** à côté de n'importe quelle page pour ouvrir l'[éditeur de page](page-editor), où vous pouvez ajouter des sections, du texte, des images et d'autres éléments.
4. Cliquez sur **Paramètres de la page** pour mettre à jour le titre de la page, le chemin d'URL et d'autres métadonnées.
5. Utilisez le bouton **Aperçu** pour ouvrir votre page dans une nouvelle fenêtre et voir exactement comment elle s'affichera pour les visiteurs.

:::tip
Pour votre page d'accueil, définissez le chemin d'URL sur simplement `/`. Pour toutes les autres pages, utilisez un chemin descriptif comme `/about` ou `/contact`.
:::

## Gestion de la navigation

La barre latérale gauche de la vue Pages du site Web affiche vos liens de navigation. Ces liens contrôlent le menu que les visiteurs voient sur votre site Web.

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation. Vous pouvez le pointer vers n'importe quelle page de votre site ou vers une URL externe.
2. Pour réorganiser les liens, faites-les glisser et déposez-les dans l'ordre souhaité. Vous pouvez également imbriquer les liens sous un élément parent pour créer des menus déroulants.
3. Cliquez sur l'icône **Modifier** à côté de n'importe quel lien pour changer son étiquette, son URL ou sa position.
4. Pour supprimer un lien de la navigation, cliquez sur l'icône **Supprimer**.

:::info
La suppression d'un lien de navigation ne supprime pas la page elle-même. La page existe toujours et peut être accessible directement par son URL -- elle n'apparaîtra simplement pas dans le menu.
:::

## Conseils pour organiser votre site

- Limitez votre navigation de niveau supérieur à cinq ou six éléments pour que les visiteurs trouvent rapidement ce qu'ils cherchent.
- Utilisez les liens imbriqués pour les sous-pages connexes (par exemple, une liste déroulante « À propos » avec « Notre équipe », « Croyances » et « Historique »).
- Vérifiez votre navigation sur mobile en cliquant sur **Aperçu mobile** pour vous assurer qu'elle fonctionne bien sur les écrans plus petits.
- Donnez aux pages des noms clairs et descriptifs qui aident les visiteurs à comprendre ce qu'ils trouveront.

:::tip
Vous pouvez ajouter des [formulaires](../forms/creating-forms.md) à vos pages pour collecter des inscriptions, des demandes de prière ou d'autres informations auprès des visiteurs.
:::

## Commencer avec un modèle de site

Si vous construisez votre site à partir de zéro, vous pouvez l'amorcer à l'aide d'un **Modèle de site** au lieu de créer des pages une par une. Un modèle de site crée un ensemble de pages préconstruites — accueil, à propos, connexion, contribution et autres — avec du contenu d'espace réservé et des liens de navigation déjà connectés.

1. Sur l'écran Pages, cliquez sur le bouton **Modèles de site** (à côté du bouton **Ajouter une page**).
2. Parcourez les modèles disponibles et cliquez sur celui-ci pour prévisualiser sa structure de page.
3. Quand vous trouvez celui que vous aimez, cliquez sur **Appliquer le modèle**.
4. Les pages qui n'existent pas encore sont créées et ajoutées à votre navigation. Les pages existantes sont laissées telles quelles.

Après l'application d'un modèle, ouvrez chaque page dans l'[éditeur de page](page-editor) pour remplacer le texte d'espace réservé et les images par le vrai contenu de votre église.

:::info
Les modèles de site créent une structure de page et une navigation. Ils ne remplacent pas le schéma de couleurs ou les polices de votre site -- ceux-ci sont contrôlés par [Apparence](appearance).
:::

## Galerie d'images

Quand les visiteurs cliquent sur une image de votre site Web, elle s'ouvre dans une superposition de galerie plein écran. Cela permet aux gens de consulter les photos à une taille plus grande sans quitter la page. Aucune configuration n'est requise -- la galerie est activée automatiquement pour les images de votre contenu de page.

## Prochaines étapes

- [Configuration initiale](initial-setup) -- Instructions de configuration première
- [Utilisation de l'éditeur de page](page-editor) -- Apprenez à créer et styliser le contenu de la page
- [Apparence](appearance) -- Personnalisez le thème visuel de votre site
- [Fichiers](files) -- Téléchargez et gérez les ressources multimédia pour vos pages
