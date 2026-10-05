---
title: "Gestion des pages"
---

# Gestion des pages

<div class="article-intro">

La vue Pages du site web est votre centre d'accueil central pour créer, éditer et organiser toutes les pages de votre site web d'église. Vous pouvez gérer à la fois le contenu de votre page et la navigation de votre site à partir de cet écran unique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [configuration initiale](initial-setup) pour configurer votre domaine et vos paramètres de site de base
- Préparez votre contenu et vos images. Utilisez d'abord le gestionnaire [Fichiers](files) pour télécharger les ressources médias.

</div>

:::info
Si votre église a plus d'un site web (par exemple, des sites distincts par campus), utilisez le sélecteur de site en haut de la vue Pages du site web pour basculer entre eux. Chaque site a ses propres pages, navigation et paramètres d'[apparence](appearance).
:::

## Comprendre les types de pages

Le tableau **Pages** répertorie chaque page de votre site avec son statut :

- **Généré** -- Pages qui ont été créées automatiquement par le système en fonction des données de votre église (par exemple, une page Groupes, une page Sermons ou une page individuelle pour chaque sermon de votre bibliothèque). Ces pages se mettent à jour d'elles-mêmes à mesure que vos données changent.
- **Personnalisé** -- Pages que vous avez créées vous-même avec votre propre contenu et mise en page.

Vous pouvez convertir n'importe quelle page générée automatiquement en page personnalisée si vous souhaitez un contrôle total sur son contenu et sa conception.

## Ajout et édition de pages

1. Cliquez sur le bouton **Ajouter une page** dans le coin supérieur droit du tableau Pages.
2. Choisissez un type de page (vierge ou un modèle) et donnez-lui un nom.
3. Cliquez sur **Éditer le contenu** à côté de n'importe quelle page pour ouvrir l'[éditeur de page](page-editor), où vous pouvez ajouter des sections, du texte, des images et d'autres éléments.
4. Cliquez sur **Paramètres de la page** (l'icône d'engrenage) pour mettre à jour le titre de la page, le chemin d'URL et autres métadonnées.
5. Utilisez le bouton **Afficher la page en direct** pour ouvrir votre page dans une nouvelle fenêtre et voir exactement comment elle s'affichera pour les visiteurs.

:::tip
Pour votre page d'accueil, définissez le chemin d'URL sur simplement `/`. Pour toutes les autres pages, utilisez un chemin descriptif comme `/about` ou `/contact`.
:::

### Paramètres de la page

Ouvrez **Paramètres de la page** sur n'importe quelle page pour configurer :

- **Titre et chemin d'URL** -- Le nom de la page et son adresse sur votre site.
- **Visibilité** -- Choisissez qui peut voir la page : tout le monde, les membres uniquement, le personnel uniquement ou les membres de groupes spécifiques. C'est un moyen rapide de restreindre une page privée (comme une page de ressources du personnel) sans mot de passe distinct.
- **Métadescription** -- Un court résumé affiché dans les résultats des moteurs de recherche et les aperçus de lien sur les réseaux sociaux.
- **Redirections** -- Pointez un ancien chemin d'URL vers cette page, afin que les liens et les signets vers une page retirée continuent à fonctionner.

## Gestion de la navigation

La vue Pages du site web affiche vos liens de navigation. Ces liens contrôlent le menu que les visiteurs voient sur votre site web.

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation. Vous pouvez le pointer vers n'importe quelle page de votre site ou vers une URL externe.
2. Pour réorganiser les liens, faites-les glisser dans l'ordre souhaité. Vous pouvez également imbriquer les liens sous un élément parent pour créer des menus déroulants.
3. Cliquez sur l'icône **Éditer** à côté de n'importe quel lien pour modifier son libellé, son URL ou sa position.
4. Pour supprimer un lien de la navigation, cliquez sur l'icône **Supprimer**.

:::info
La suppression d'un lien de navigation ne supprime pas la page elle-même. La page existe toujours et est accessible directement par son URL -- elle n'apparaît simplement pas dans le menu.
:::

## Commutateurs à l'échelle du site

Au-dessus de la **Navigation principale** sur le côté gauche de la vue Pages du site web se trouvent deux commutateurs qui s'appliquent à l'ensemble de votre site web d'église :

- **Afficher la connexion** -- Affiche un bouton **Connexion** dans la barre de navigation de votre site web.
- **Désactiver le site web public** -- Désactive votre site web public. Utilisez-le si votre église utilise B1 uniquement pour son portail membres, les dons et les inscriptions, et maintient son site web principal ailleurs.

### Que fait la désactivation du site web public

Lorsque **Désactiver le site web public** est activé :

- Chaque page publique, y compris la page d'accueil et vos pages personnalisées, envoie les visiteurs non connectés à l'écran de connexion. Après sa connexion, ils reviennent à la page qu'ils ont demandée.
- Les membres connectés voient le site web complet comme d'habitude, y compris votre navigation et les pages **Généré** intégrées (comme Groupes et Sermons). Les pages générées n'apparaissent plus dans le tableau Pages.
- Les moteurs de recherche sont informés de ne pas indexer le site. Le sitemap est vide et `robots.txt` bloque tout le rapatriement.

Ces liens continuent à fonctionner, afin que les membres et les invités puissent toujours les atteindre :

- Connexion et déconnexion
- Le portail des membres (tout ce qui se trouve sous `/mobile`)
- Les liens d'[inscription aux événements](../guides/event-registration.md) et l'inscription des invités

Un avertissement apparaît sous le commutateur tandis que le site web public est désactivé. Réactivez le commutateur pour réintégrer vos pages. Rien n'est supprimé pendant que le site est désactivé.

:::info
Ce paramètre s'applique à votre église entière. Si vous avez plusieurs sites, il désactive tous, pas seulement celui sélectionné dans le sélecteur de site.
:::

## Conseils pour organiser votre site

- Limitez votre navigation de premier niveau à cinq ou six éléments afin que les visiteurs trouvent rapidement ce qu'ils cherchent.
- Utilisez les liens imbriqués pour les sous-pages connexes (par exemple, un menu déroulant « À propos » avec « Notre équipe », « Croyances » et « Historique »).
- Prévisualisez votre navigation sur mobile en cliquant sur **Aperçu mobile** pour vous assurer qu'elle fonctionne bien sur les petits écrans.
- Donnez aux pages des noms clairs et descriptifs qui aident les visiteurs à comprendre ce qu'ils y trouveront.

:::tip
Vous pouvez ajouter des [formulaires](../forms/creating-forms.md) à vos pages pour collecter des inscriptions, des demandes de prière ou d'autres informations provenant de visiteurs.
:::

## Commencer par un modèle de site

Si vous construisez votre site à partir de zéro, vous pouvez l'amorcer à l'aide d'un **Modèle de site** au lieu de créer les pages une par une. Un modèle de site crée un ensemble de pages prédéfinies -- accueil, à propos, se connecter, donner et autres -- avec du contenu d'espace réservé et des liens de navigation déjà connectés.

1. Sur l'écran Pages, cliquez sur le bouton **Modèles de site** (à côté du bouton **Ajouter une page**).
2. Parcourez les modèles disponibles et cliquez sur l'un d'eux pour en prévisualiser la structure de page.
3. Lorsque vous en trouvez un qui vous plaît, cliquez sur **Appliquer le modèle**.
4. Les pages qui n'existent pas encore sont créées et ajoutées à votre navigation. Les pages existantes sont laissées telles quelles.

Après l'application d'un modèle, ouvrez chaque page dans l'[éditeur de page](page-editor) pour remplacer le texte et les images d'espace réservé par le contenu réel de votre église.

:::info
Les modèles de site créent la structure de page et la navigation. Ils ne remplacent pas le schéma de couleurs ou les polices de votre site -- ceux-ci sont contrôlés par l'[Apparence](appearance).
:::

## Lightbox d'image

Lorsque les visiteurs cliquent sur une image de votre site web, elle s'ouvre dans une superposition de lightbox en plein écran. Cela permet aux gens de voir les photos à une taille plus grande sans quitter la page. Aucune configuration n'est requise -- le lightbox est activé automatiquement pour les images de votre contenu de page.

## Étapes suivantes

- [Configuration initiale](initial-setup) -- Instructions de configuration initiale
- [Utilisation de l'éditeur de page](page-editor) -- Apprenez à créer et styliser le contenu de la page
- [Apparence](appearance) -- Personnalisez le thème visuel de votre site
- [Fichiers](files) -- Téléchargez et gérez les ressources médias de vos pages
