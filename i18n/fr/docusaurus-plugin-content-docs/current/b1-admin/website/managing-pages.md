---
title: "Gestion des pages"
---

# Gestion des pages

<div class="article-intro">

La vue Pages du site Web est votre centre de contrôle central pour créer, modifier et organiser toutes les pages de votre site Web d'église. Vous pouvez gérer à la fois le contenu de votre page et la navigation de votre site à partir de cet écran unique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [Configuration initiale](initial-setup) pour configurer votre domaine et les paramètres de base du site
- Ayez votre contenu et vos images prêts. Utilisez le gestionnaire [Files](files) pour télécharger d'abord les éléments médias.

</div>

:::info
Si votre église a plus d'un site Web (par exemple, des sites séparés par campus), utilisez le sélecteur de site en haut de la vue Pages du site Web pour basculer entre eux. Chaque site a ses propres pages, navigation et paramètres [appearance](appearance).
:::

## Comprendre les types de pages

Le tableau **Pages** répertorie chaque page de votre site avec son statut:

- **Generated** -- Les pages qui ont été automatiquement créées par le système en fonction des données de votre église (par exemple, une page Groupes, une page Sermons ou une page individuelle pour chaque sermon de votre bibliothèque). Ces pages se mettent à jour d'elles-mêmes au fur et à mesure que vos données changent.
- **Custom** -- Les pages que vous avez créées vous-même avec votre propre contenu et mise en page.

Vous pouvez convertir n'importe quelle page auto-générée en une page personnalisée si vous souhaitez un contrôle total sur son contenu et sa conception.

## Ajout et édition de pages

1. Cliquez sur le bouton **Add Page** dans le coin supérieur droit du tableau Pages.
2. Choisissez un type de page (vierge ou un modèle) et donnez-lui un nom.
3. Cliquez sur **Edit Content** à côté de n'importe quelle page pour ouvrir l'[éditeur de page](page-editor), où vous pouvez ajouter des sections, du texte, des images et d'autres éléments.
4. Cliquez sur **Page Settings** (l'icône d'engrenage) pour mettre à jour le titre de la page, le chemin URL et d'autres métadonnées.
5. Utilisez le bouton **View live page** pour ouvrir votre page dans une nouvelle fenêtre et voir exactement comment elle apparaîtra aux visiteurs.

:::tip
Pour votre page d'accueil, réglez le chemin URL sur juste `/`. Pour toutes les autres pages, utilisez un chemin descriptif comme `/about` ou `/contact`.
:::

### Paramètres de la page

Ouvrez **Page Settings** sur n'importe quelle page pour configurer:

- **Title and URL Path** -- Le nom de la page et son adresse sur votre site.
- **Visibility** -- Choisissez qui peut voir la page: tout le monde, les membres uniquement, le personnel uniquement ou les membres de groupes spécifiques. C'est un moyen rapide de clôturer une page privée (comme une page de ressources du personnel) sans mot de passe distinct.
- **Meta Description** -- Un court résumé affiché dans les résultats des moteurs de recherche et dans les aperçus de lien des médias sociaux.
- **Redirects** -- Pointez un ancien chemin URL vers cette page, afin que les liens et les favoris vers une page supprimée continuent à fonctionner.

## Gestion de la navigation

La vue Pages du site Web affiche vos liens de navigation. Ces liens contrôlent le menu que les visiteurs voient sur votre site Web.

1. Cliquez sur **Add** pour créer un nouveau lien de navigation. Vous pouvez le pointer vers n'importe quelle page de votre site ou vers une URL externe.
2. Pour réorganiser les liens, faites-les glisser et déposez-les dans l'ordre souhaité. Vous pouvez également imbriquer les liens sous un élément parent pour créer des menus déroulants.
3. Cliquez sur l'icône **Edit** à côté de n'importe quel lien pour modifier son libellé, son URL ou sa position.
4. Pour supprimer un lien de la navigation, cliquez sur l'icône **Delete**.

:::info
La suppression d'un lien de navigation ne supprime pas la page elle-même. La page existe toujours et peut être accessible directement par son URL -- elle n'apparaîtra simplement pas dans le menu.
:::

## Commutateurs à l'échelle du site

Au-dessus de **Main Navigation** sur le côté gauche de la vue Pages du site Web se trouvent deux commutateurs qui s'appliquent à l'ensemble de votre site Web d'église:

- **Show Login** -- Affiche un bouton **Login** dans la barre de navigation de votre site Web.
- **Disable Public Website** -- Désactive votre site Web public. Utilisez-le si votre église utilise B1 uniquement pour son portail des membres, les dons et les inscriptions, et conserve son site Web principal ailleurs.

### Ce que le désactif du site Web public fait

Lorsque **Disable Public Website** est activé:

- Chaque page publique, y compris la page d'accueil et vos pages personnalisées, envoie les visiteurs à l'écran de connexion.
- Les pages **Generated** intégrées (telles que Groupes et Sermons) ne sont plus servies et n'apparaissent plus dans le tableau Pages.
- L'en-tête du site affiche uniquement le bouton **Login**, sans liens de navigation.
- Les moteurs de recherche sont informés de ne pas indexer le site. Le plan du site est vide et `robots.txt` bloque tout ragage.

Ces liens continuent à fonctionner, les membres et les invités peuvent donc toujours les atteindre:

- Connexion et déconnexion
- Le portail des membres (tout ce qui se trouve sous `/mobile`)
- Liens d'[inscriptions aux événements](../guides/event-registration.md) et inscription des invités

Un avertissement apparaît sous le commutateur tandis que le site Web public est désactivé. Déactivez à nouveau le commutateur pour ramener vos pages. Rien n'est supprimé lorsque le site est désactivé.

:::info
Ce paramètre s'applique à l'ensemble de votre église. Si vous avez plus d'un site, il désactive tous les sites, pas seulement celui sélectionné dans le sélecteur de site.
:::

## Conseils pour organiser votre site

- Gardez votre navigation de niveau supérieur à cinq ou six éléments pour que les visiteurs trouvent rapidement les choses.
- Utilisez les liens imbriqués pour les sous-pages associées (par exemple, une liste déroulante "About" avec "Our Team", "Beliefs" et "History").
- Examinez votre navigation sur mobile en cliquant sur **Mobile Preview** pour vous assurer qu'elle fonctionne bien sur les écrans plus petits.
- Donnez aux pages des noms clairs et descriptifs qui aident les visiteurs à comprendre ce qu'ils trouveront.

:::tip
Vous pouvez ajouter des [formulaires](../forms/creating-forms.md) à vos pages pour collecter des inscriptions, des demandes de prière ou d'autres informations auprès des visiteurs.
:::

## Démarrage à partir d'un modèle de site

Si vous construisez votre site à partir de zéro, vous pouvez l'amorcer en utilisant un **Site Template** au lieu de créer des pages une à la fois. Un modèle de site crée un ensemble de pages pré-construites -- accueil, à propos, connecter, donner et autres -- avec du contenu d'espace réservé et des liens de navigation déjà câblés.

1. Sur l'écran Pages, cliquez sur le bouton **Site Templates** (à côté du bouton **Add Page**).
2. Parcourez les modèles disponibles et cliquez sur l'un d'eux pour prévisualiser sa structure de page.
3. Lorsque vous en trouvez un qui vous plaît, cliquez sur **Apply Template**.
4. Les pages qui n'existent pas déjà sont créées et ajoutées à votre navigation. Les pages existantes sont laissées telles quelles.

Après l'application d'un modèle, ouvrez chaque page dans l'[éditeur de page](page-editor) pour remplacer le texte et les images d'espace réservé par le contenu réel de votre église.

:::info
Les modèles de site créent une structure de page et une navigation. Ils ne remplacent pas le modèle de couleur ou les polices de votre site -- ils sont contrôlés par [Appearance](appearance).
:::

## Lightbox d'image

Lorsque les visiteurs cliquent sur une image de votre site Web, elle s'ouvre dans un overlay de boîte de dialogue plein écran. Cela permet aux gens de voir les photos à une taille plus grande sans quitter la page. Aucune configuration n'est requise -- la lightbox est activée automatiquement pour les images dans le contenu de votre page.

## Prochaines étapes

- [Initial Setup](initial-setup) -- Instructions de configuration à la première utilisation
- [Using the Page Editor](page-editor) -- Découvrez comment créer et styliser le contenu de la page
- [Appearance](appearance) -- Personnaliser le thème visuel de votre site
- [Files](files) -- Téléchargez et gérez les éléments médias pour vos pages
