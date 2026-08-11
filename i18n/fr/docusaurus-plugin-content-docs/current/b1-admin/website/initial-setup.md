---
title: "Configuration initiale"
---

# Configuration initiale

<div class="article-intro">

Chaque compte B1 est livré avec un site web prêt à l'emploi. Ce guide vous guide dans la configuration de votre domaine d'église, la configuration de l'apparence de votre site, la création de vos premières pages et l'organisation de votre navigation.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1.church avec accès administratif
- Si vous utilisez un domaine personnalisé, ayez vos identifiants de connexion du fournisseur DNS prêts (par exemple, GoDaddy, Cloudflare ou AWS)
- Préparez le logo de votre église au format PNG avec un arrière-plan transparent pour de meilleurs résultats

</div>

## Configuration de votre domaine

Votre église reçoit automatiquement un sous-domaine sur B1.church (par exemple, `votreeglise.b1.church`). Vous pouvez également pointer votre propre domaine personnalisé vers votre site B1.

1. Allez à **B1.church Admin** en visitant admin.b1.church ou en cliquant sur votre liste déroulante de profil et en choisissant **Changer d'application**.
2. Ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
3. Cliquez sur **Gérer** pour afficher votre sous-domaine. Définissez-le sur quelque chose de court et reconnaissable sans espaces.
4. Pour utiliser un domaine personnalisé, connectez-vous à votre fournisseur DNS (tel que GoDaddy, Cloudflare ou AWS) et ajoutez deux enregistrements :
   - Un **enregistrement A** pour votre domaine racine pointant vers `3.23.251.61`
   - Un **enregistrement CNAME** pour `www` pointant vers `proxy.b1.church`
5. Retournez à B1.church Admin, ajoutez votre domaine personnalisé à la liste et cliquez sur **Ajouter** puis **Enregistrer**. Votre site sera accessible à partir de votre domaine personnalisé en quelques minutes.

:::tip
Si vous ne voyez pas l'option Paramètres, demandez à la personne qui a configuré votre compte d'église de vous accorder la permission « Modifier les paramètres de l'église ». Consultez [Rôles & Permissions](../settings/roles-permissions.md) pour plus de détails.
:::

## Création de votre première page

1. Dans B1 Admin, cliquez sur **Site web** dans le menu de gauche pour ouvrir la vue Pages du site web.
2. Cliquez sur **Ajouter une page** dans le coin supérieur droit.
3. Choisissez **Vierge** comme type de page et nommez-la « Accueil ».
4. Cliquez sur **Paramètres de page** et définissez le chemin d'URL sur `/` (une barre oblique sans texte) pour votre page d'accueil. Les autres pages utilisent `/nom-page`.
5. Cliquez sur **Modifier le contenu** pour commencer à construire. Chaque page doit commencer par une **Section** -- c'est le conteneur pour tous les autres éléments.
6. Après avoir ajouté une section, cliquez à nouveau sur **Ajouter du contenu** pour insérer du texte, des images, des vidéos, des cartes, des formulaires et bien d'autres choses en les faisant glisser dans votre section.

:::info
Pour des instructions détaillées sur le travail avec les pages et la navigation, voir [Gestion des pages](managing-pages). Pour un guide complet de l'éditeur visuel, voir [Utilisation de l'éditeur de page](page-editor).
:::

## Configuration de l'apparence du site

1. À partir de la vue Pages du site web, cliquez sur l'onglet **Apparence** en haut.
2. Utilisez la **Palette de couleurs** pour définir vos couleurs de marque pour les tons principaux, secondaires et d'accent.
3. Sous **Paramètres de typographie**, choisissez vos polices de titre et de corps dans le navigateur de polices.
4. Téléchargez le logo de votre église sous **Logo** dans les Paramètres de style. Fournissez une version pour fond clair et une version pour fond sombre.
5. Configurez votre **Pied de page du site** avec les coordonnées et les liens de votre église.

:::info
Les modifications que vous apportez dans Apparence s'appliquent sur l'ensemble de votre site web. Voir la page [Apparence](appearance) pour des instructions détaillées sur chaque paramètre.
:::

## Configuration de la navigation

Vos liens de navigation apparaissent dans la vue Pages du site web. Pour les organiser :

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation et le pointer vers l'une de vos pages.
2. Faites glisser et déposez les liens pour les réorganiser ou imbriquez-les sous des éléments parents.
3. Prévisualisez votre site pour confirmer que la navigation s'affiche correctement.

## Prochaines étapes

- [Gestion des pages](managing-pages) -- Apprenez à travailler avec les pages et la navigation en détail
- [Apparence](appearance) -- Affinez les couleurs, les polices et la disposition de votre site
- [Fichiers](files) -- Téléchargez les images et les documents de votre site web
