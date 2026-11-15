---
title: "Gérer les pages"
description: "Créez, modifiez et organisez les pages et la navigation dans la vue Pages du site de B1 Admin, y compris les paramètres de page, les redirections et les modèles de site."
---

# Gérer les pages

<div class="article-intro">

La vue Pages du site web est votre centre de contrôle pour créer, modifier et organiser toutes les pages du site web de votre église. Vous gérez à la fois le contenu de vos pages et la navigation de votre site depuis cet écran unique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Terminez la [configuration initiale](./initial-setup.md) pour configurer votre domaine et les paramètres de base du site
- Ayez votre contenu et vos images prêts. Utilisez d'abord le gestionnaire de [Fichiers](./files.md) pour téléverser les ressources médias.
- Utilisez un ordinateur ou une tablette. La vue Pages du site web et l'éditeur de pages ont besoin d'un écran d'au moins environ 880 pixels de large ; sur un téléphone, un message vous invite à passer à un écran plus grand.

</div>

:::info
Si votre église dispose de plusieurs sites web (par exemple, des sites distincts par campus), utilisez le sélecteur de site en haut de la vue Pages du site web pour passer de l'un à l'autre. Chaque site a ses propres pages, sa propre navigation et ses propres paramètres d'[apparence](./appearance.md). Voir [Plusieurs sites web](#multiple-websites) ci-dessous.
:::

## Comprendre les types de pages {#understanding-page-types}

Le tableau **Pages** liste chaque page de votre site par **chemin** et **titre**. Il existe deux types de pages :

- **Généré** -- Pages créées automatiquement par le système à partir des données de votre église (par exemple, une page Groupes, une page Prédications, ou une page individuelle pour chaque prédication de votre bibliothèque). Ces pages affichent un insigne **Généré** et se mettent à jour d'elles-mêmes lorsque vos données changent.
- **Personnalisé** -- Pages que vous avez créées vous-même, avec votre propre contenu et votre propre mise en page.

Vous pouvez convertir n'importe quelle page générée automatiquement en page personnalisée si vous voulez un contrôle total sur son contenu et sa conception. Cliquez sur **Convertir** à côté de la page générée, puis cliquez sur **Confirmer**. La boîte de dialogue **Nouvelle page** s'ouvre ; donnez un titre à la page et cliquez sur **Enregistrer**. Votre nouvelle page personnalisée reprend le chemin de la page générée, et vous pouvez ensuite la construire dans l'[éditeur de pages](./page-editor.md).

## Ajouter et modifier des pages {#adding-and-editing-pages}

1. Cliquez sur le bouton **Ajouter une page** en haut à droite de la vue Pages du site web.
2. Choisissez un type de page et saisissez un **titre de la page**, puis cliquez sur **Enregistrer**. **Vierge** crée une page vide ; **Prédications**, **À propos de nous**, **Don** et **Emplacement** proposent un titre suggéré pour ce type de page ; **IA** construit une première version de la page à partir d'une courte description que vous saisissez. Le chemin de la page est formé à partir de son titre (par exemple, « Notre équipe » devient `/our-team`), et vous pouvez le modifier plus tard dans **Paramètres de la page**.
3. Cliquez sur **Modifier le contenu** à côté de n'importe quelle page pour ouvrir l'[éditeur de pages](./page-editor.md), où vous pouvez ajouter des sections, du texte, des images et d'autres éléments.
4. Cliquez sur **Paramètres de la page** à côté d'une page pour mettre à jour son titre, son chemin d'URL et ses autres métadonnées.
5. Cliquez sur le chemin d'une page dans la colonne **Chemin** pour ouvrir la page en ligne dans un nouvel onglet et voir exactement son apparence pour les visiteurs.

:::tip
Pour votre page d'accueil, réglez le chemin d'URL sur simplement `/`. Pour toutes les autres pages, utilisez un chemin descriptif comme `/about` ou `/contact`.
:::

### Paramètres de la page {#page-settings}

Ouvrez **Paramètres de la page** sur n'importe quelle page pour configurer :

- **Titre de la page** -- Le nom de la page.
- **Mise en page** -- **En-tête et pied de page** (la barre de navigation et le pied de page de votre site autour de la page, valeur par défaut) ou **Contenu épuré et centré** (seulement le contenu de la page, dans une carte centrée sur un arrière-plan gris clair, sans barre de navigation ni pied de page -- pratique pour une simple page d'inscription ou d'accueil).
- **Chemin d'URL** -- L'adresse de la page sur votre site. Cliquez sur le crayon pour la modifier, puis cliquez sur **Vérifier** pour vous assurer que le chemin est valide et qu'il n'est pas déjà utilisé.
- **Visibilité** -- Choisissez qui peut voir la page : **Tout le monde**, **Utilisateurs connectés**, **Membres et personnel**, **Personnel seulement**, **Membres de l'équipe** ou **Groupes précis** (puis cochez les groupes). C'est un moyen rapide de restreindre une page privée (comme une page de ressources pour le personnel) sans mot de passe séparé. Les visiteurs qui ne sont pas connectés voient « Cette page est réservée aux membres de l'église » avec un bouton **Connexion** ; les personnes connectées auxquelles la page n'est pas partagée voient « Vous n'avez pas accès à cette page. » Les pages restreintes sont exclues de votre plan du site.
- **Description méta** -- Un bref résumé affiché dans les résultats des moteurs de recherche et les aperçus de liens sur les réseaux sociaux. Visez environ 155 caractères, ou cliquez sur **Générer avec l'IA** pour en rédiger une à partir du contenu de la page.

La boîte de dialogue comporte aussi un bouton **Dupliquer**, qui crée une copie de la page et de tout son contenu, et un bouton **Supprimer**, qui supprime définitivement la page.

:::tip
Pour envoyer une ancienne adresse vers une page (par exemple, après avoir renommé `/about-us` en `/about`), ajoutez une redirection sous **Redirections et analytique** dans [Apparence](./appearance.md#redirects--analytics).
:::

## Gérer la navigation {#managing-navigation}

Le panneau **Navigation principale**, à droite de la vue Pages du site web, affiche vos liens de navigation. Ces liens contrôlent le menu que voient les visiteurs sur votre site web.

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation. Vous pouvez le faire pointer vers n'importe quelle page de votre site ou vers une URL externe.
2. Pour réordonner les liens, glissez-déposez-les dans l'ordre souhaité. Vous pouvez aussi imbriquer des liens sous un élément parent pour créer des menus déroulants.
3. Cliquez sur n'importe quel lien pour ouvrir ses **Paramètres du lien**, où vous pouvez modifier son texte, son URL ou sa page parente.
4. Pour retirer un lien de la navigation, ouvrez ses **Paramètres du lien** et cliquez sur **Supprimer**.

:::info
Retirer un lien de navigation ne supprime pas la page elle-même. La page existe toujours et reste accessible directement par son URL -- elle n'apparaît simplement plus dans le menu.
:::

## Commutateurs à l'échelle du site {#site-wide-switches}

Sous les liens du panneau **Navigation principale**, deux commutateurs s'appliquent à l'ensemble du site web de votre église :

- **Afficher la connexion** -- Affiche un bouton **Connexion** dans la barre de navigation de votre site web.
- **Désactiver le site public** -- Désactive votre site web public. Utilisez-le si votre église n'utilise B1 que pour son portail des membres, les dons et les inscriptions, et héberge son site principal ailleurs.

### Ce que fait la désactivation du site public {#what-disabling-the-public-website-does}

Lorsque **Désactiver le site public** est activé :

- Chaque page publique, y compris la page d'accueil et vos pages personnalisées, renvoie les visiteurs non connectés vers l'écran de connexion. Après s'être connectés, ils retournent à la page demandée.
- Les membres connectés voient le site complet comme d'habitude, y compris votre navigation et les pages **Générées** intégrées (comme Groupes et Prédications). Les pages générées n'apparaissent plus dans le tableau des pages.
- Les moteurs de recherche sont invités à ne pas indexer le site. Le plan du site est vide et le fichier `robots.txt` bloque toute exploration.

Ces liens continuent de fonctionner, de sorte que les membres et les invités peuvent toujours y accéder :

- La connexion et la déconnexion
- Le portail des membres (tout ce qui se trouve sous `/mobile`)
- Les liens d'[inscription à un événement](../guides/event-registration.md) et l'inscription des visiteurs

Un avertissement apparaît sous le commutateur tant que le site public est désactivé. Désactivez à nouveau le commutateur pour rétablir vos pages. Rien n'est supprimé pendant que le site est désactivé.

:::info
Ce paramètre s'applique à toute votre église. Si vous avez plusieurs sites, il les désactive tous, et non seulement celui sélectionné dans le sélecteur de site.
:::

## Conseils pour organiser votre site {#tips-for-organizing-your-site}

- Limitez votre navigation de premier niveau à cinq ou six éléments pour que les visiteurs trouvent rapidement ce qu'ils cherchent.
- Utilisez des liens imbriqués pour les sous-pages liées (par exemple, un menu déroulant « À propos » avec « Notre équipe », « Croyances » et « Histoire »).
- Vérifiez votre navigation sur un téléphone pour vous assurer qu'elle fonctionne bien sur les petits écrans.
- Donnez aux pages des noms clairs et descriptifs qui aident les visiteurs à comprendre ce qu'ils vont y trouver.

:::tip
Vous pouvez ajouter des [formulaires](../forms/creating-forms.md) à vos pages pour recueillir des inscriptions, des demandes de prière ou d'autres renseignements auprès des visiteurs.
:::

## Démarrer à partir d'un modèle de site {#starting-from-a-site-template}

Si vous construisez votre site à partir de zéro, vous pouvez l'amorcer à l'aide d'un **modèle de site** au lieu de créer les pages une à une. Un modèle de site crée un ensemble de pages prédéfinies -- accueil, à propos, rejoindre, donner et d'autres -- avec un contenu provisoire et des liens de navigation déjà reliés.

1. Sur l'écran Pages, cliquez sur le bouton **Démarrer à partir d'un modèle** (à côté du bouton **Ajouter une page**).
2. Parcourez les modèles disponibles (comme **Classique**, **Moderne**, **Communauté** et **Orienté visiteurs**) et cliquez sur l'un d'eux pour prévisualiser ses pages et les liens de navigation qu'il ajoute.
3. Lorsque vous en trouvez un qui vous plaît, cliquez sur **Créer le site**.
4. Les pages qui n'existent pas encore sont créées et ajoutées à votre navigation. Les pages que vous avez déjà sont marquées **Existe déjà** et laissées telles quelles. La première nouvelle page s'ouvre ensuite pour que vous puissiez la parcourir.

Après avoir appliqué un modèle, ouvrez chaque page dans l'[éditeur de pages](./page-editor.md) pour remplacer le texte et les images provisoires par le contenu réel de votre église.

:::info
Un modèle ne définit les couleurs et les polices que sur un site qui n'a jamais eu de palette de couleurs enregistrée. Une fois que vous avez choisi votre propre palette, l'application d'un modèle laisse vos couleurs et vos polices intactes -- elles restent gérées dans [Apparence](./appearance.md).
:::

## Plusieurs sites web {#multiple-websites}

Une église peut exploiter plusieurs sites web à partir du même compte -- par exemple, un site par campus ou un site distinct pour une école.

1. Sur l'écran Pages, ouvrez le sélecteur de site (il affiche d'abord **Site principal**) et choisissez **Gérer les sites web…**.
2. Dans la boîte de dialogue **Sites web**, saisissez un **nom** et un **sous-domaine** (lettres minuscules et chiffres seulement -- il devient `{subdomain}.b1.church`), puis cliquez sur **Ajouter un site web**.
3. Sélectionnez le nouveau site dans le sélecteur de site pour construire ses pages, sa navigation, ses blocs et son apparence.

Pour supprimer un site, ouvrez **Gérer les sites web…** et cliquez sur **Supprimer** à côté de celui-ci. Ses pages, sa navigation et son apparence sont supprimées définitivement, et les domaines personnalisés qu'il avait passent au site principal.

## Visionneuse d'images {#image-lightbox}

Lorsque les visiteurs cliquent sur une image de votre site web, elle s'ouvre dans une superposition plein écran. Les personnes peuvent ainsi voir les photos en plus grand sans quitter la page. Aucune configuration n'est nécessaire : la visionneuse est activée automatiquement pour les images de votre contenu de page.

## Étapes suivantes {#next-steps}

- [Configuration initiale](./initial-setup.md) -- Instructions de première configuration
- [Utiliser l'éditeur de pages](./page-editor.md) -- Apprendre à construire et à mettre en forme le contenu des pages
- [Apparence](./appearance.md) -- Personnaliser le thème visuel de votre site
- [Fichiers](./files.md) -- Téléverser et gérer les ressources médias de vos pages
