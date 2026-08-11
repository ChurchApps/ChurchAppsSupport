---
title: "Gestion des pages"
---

# Gestion des pages

<div class="article-intro">

La vue Pages du site web est votre centre névralgique pour créer, modifier et organiser toutes les pages de votre site web d'église. Vous pouvez gérer le contenu de vos pages et la navigation de votre site à partir d'un seul écran.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [Configuration initiale](initial-setup) pour configurer votre domaine et les paramètres de site de base
- Ayez votre contenu et vos images prêts. Utilisez le gestionnaire [Fichiers](files) pour d'abord télécharger les ressources multimédias.

</div>

:::info
Si votre église a plus d'un site web (par exemple, des sites séparés par campus), utilisez le commutateur de site en haut de la vue Pages du site web pour basculer entre eux. Chaque site a ses propres pages, navigation et paramètres [d'apparence](appearance).
:::

## Comprendre les types de pages

Le tableau **Pages** énumère chaque page de votre site avec son statut :

- **Généré** -- Pages qui ont été automatiquement créées par le système en fonction des données de votre église (par exemple, une page Groupes, une page Sermons ou une page individuelle pour chaque sermon dans votre bibliothèque). Ces pages se mettent à jour d'elles-mêmes à mesure que vos données changent.
- **Personnalisé** -- Pages que vous avez créées vous-même avec votre propre contenu et disposition.

Vous pouvez convertir n'importe quelle page générée automatiquement en page personnalisée si vous souhaitez un contrôle total sur son contenu et sa conception.

## Ajout et modification de pages

1. Cliquez sur le bouton **Ajouter une page** dans le coin supérieur droit du tableau Pages.
2. Choisissez un type de page (vierge ou modèle) et donnez-lui un nom.
3. Cliquez sur **Modifier** à côté de n'importe quelle page pour ouvrir l'[éditeur de page](page-editor), où vous pouvez ajouter des sections, du texte, des images et d'autres éléments.
4. Cliquez sur **Paramètres de page** pour mettre à jour le titre de la page, le chemin d'URL et d'autres métadonnées.
5. Utilisez le bouton **Aperçu** pour ouvrir votre page dans une nouvelle fenêtre et voir exactement comment elle sera affichée aux visiteurs.

:::tip
Pour votre page d'accueil, définissez le chemin d'URL sur juste `/`. Pour toutes les autres pages, utilisez un chemin descriptif comme `/a-propos` ou `/contact`.
:::

### Paramètres de page

Ouvrez **Paramètres de page** sur n'importe quelle page pour configurer :

- **Titre et chemin d'URL** -- Le nom de la page et son adresse sur votre site.
- **Visibilité** -- Choisissez qui peut voir la page : tout le monde, membres uniquement, personnel uniquement ou membres de groupes spécifiques. C'est un moyen rapide de gater une page privée (comme une page de ressources du personnel) sans mot de passe séparé.
- **Meta Description** -- Un résumé court affiché dans les résultats des moteurs de recherche et les aperçus des liens des réseaux sociaux.
- **Redirections** -- Pointez un ancien chemin d'URL vers cette page, afin que les liens et les signets vers une page supprimée restent fonctionnels.

## Gestion de la navigation

La vue Pages du site web affiche vos liens de navigation. Ces liens contrôlent le menu que les visiteurs voient sur votre site web.

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation. Vous pouvez le pointer vers n'importe quelle page de votre site ou vers une URL externe.
2. Pour réorganiser les liens, faites-les glisser et déposez-les dans l'ordre souhaité. Vous pouvez également imbriquer les liens sous un élément parent pour créer des menus déroulants.
3. Cliquez sur l'icône **Modifier** à côté de n'importe quel lien pour modifier son label, son URL ou sa position.
4. Pour supprimer un lien de la navigation, cliquez sur l'icône **Supprimer**.

:::info
La suppression d'un lien de navigation ne supprime pas la page elle-même. La page existe toujours et peut être accédée directement par son URL -- elle n'apparaît simplement pas dans le menu.
:::

## Conseils pour organiser votre site

- Gardez votre navigation de haut niveau à cinq ou six éléments pour que les visiteurs trouvent facilement les choses.
- Utilisez les liens imbriqués pour les sous-pages connexes (par exemple, une liste déroulante « À propos » avec « Notre équipe », « Croyances » et « Histoire »).
- Vérifiez votre navigation sur mobile en cliquant sur **Aperçu mobile** pour vous assurer qu'elle fonctionne bien sur les petits écrans.
- Donnez aux pages des noms clairs et descriptifs qui aident les visiteurs à comprendre ce qu'ils trouveront.

:::tip
Vous pouvez ajouter des [formulaires](../forms/creating-forms.md) à vos pages pour collecter les inscriptions, les demandes de prière ou d'autres informations des visiteurs.
:::

## Démarrage à partir d'un modèle de site

Si vous créez votre site à partir de zéro, vous pouvez l'amorcer en utilisant un **Modèle de site** au lieu de créer des pages une à la fois. Un modèle de site crée un ensemble de pages prédéfinies -- accueil, à propos, connexion, donner et autres -- avec du contenu placeholder et des liens de navigation déjà configurés.

1. Sur l'écran Pages, cliquez sur le bouton **Modèles de site** (à côté du bouton **Ajouter une page**).
2. Parcourez les modèles disponibles et cliquez sur l'un d'eux pour prévisualiser sa structure de page.
3. Lorsque vous en trouvez un que vous aimez, cliquez sur **Appliquer le modèle**.
4. Les pages qui n'existent pas déjà sont créées et ajoutées à votre navigation. Les pages existantes restent inchangées.

Après l'application d'un modèle, ouvrez chaque page dans l'[éditeur de page](page-editor) pour remplacer le texte et les images placeholder par le vrai contenu de votre église.

:::info
Les modèles de site créent la structure et la navigation des pages. Ils ne remplacent pas le schéma de couleurs ou les polices de votre site -- ceux-ci sont contrôlés par [Apparence](appearance).
:::

## Lightbox d'image

Lorsque les visiteurs cliquent sur une image de votre site web, elle s'ouvre dans une superposition lightbox en plein écran. Cela permet aux personnes de voir les photos à une taille plus grande sans quitter la page. Aucune configuration n'est requise -- la lightbox est activée automatiquement pour les images du contenu de votre page.

## Prochaines étapes

- [Configuration initiale](initial-setup) -- Instructions de configuration pour la première fois
- [Utilisation de l'éditeur de page](page-editor) -- Apprenez à construire et styler le contenu de la page
- [Apparence](appearance) -- Personnalisez le thème visuel de votre site
- [Fichiers](files) -- Téléchargez et gérez les ressources multimédias pour vos pages
