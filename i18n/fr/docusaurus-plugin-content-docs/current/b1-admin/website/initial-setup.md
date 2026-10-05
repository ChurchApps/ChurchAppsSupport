---
title: "Configuration initiale"
---

# Configuration initiale

<div class="article-intro">

Chaque compte B1 est livré avec un site web prêt à l'emploi. Ce guide vous guide à travers la configuration de votre domaine d'église, la configuration de l'apparence de votre site, la création de vos premières pages et l'organisation de votre navigation.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1.church avec un accès administratif
- Si vous utilisez un domaine personnalisé, préparez vos identifiants de fournisseur DNS (par exemple, GoDaddy, Cloudflare ou AWS)
- Préparez le logo de votre église au format PNG avec un fond transparent pour de meilleurs résultats

</div>

## Configuration de votre domaine

Votre église reçoit automatiquement un sous-domaine sur B1.church (par exemple, `yourchurch.b1.church`). Vous pouvez également pointer votre propre domaine personnalisé vers votre site B1.

1. Allez à **B1.church Admin** en visitant admin.b1.church ou en cliquant sur votre menu déroulant de profil et en choisissant **Changer d'application**.
2. Ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres** et cliquez sur **Paramètres**.
3. Ouvrez la section **Informations de l'église** pour afficher votre sous-domaine. Définissez-le sur quelque chose de court et reconnaissable sans espaces.
4. Pour utiliser un domaine personnalisé, connectez-vous à votre fournisseur DNS (tel que GoDaddy, Cloudflare ou AWS) et ajoutez deux enregistrements :
   - Un **enregistrement A** pour votre domaine racine pointant vers `3.23.251.61`
   - Un **enregistrement CNAME** pour `www` pointant vers `proxy.b1.church`
5. Retournez à B1.church Admin, ajoutez votre domaine personnalisé à la liste et cliquez sur **Ajouter** puis **Enregistrer**. Votre site sera accessible à partir de votre domaine personnalisé dans quelques minutes.

:::tip
Si vous ne voyez pas l'option Paramètres, demandez à la personne qui a configuré votre compte d'église de vous accorder la permission « Modifier les paramètres de l'église ». Consultez [Rôles et permissions](../settings/roles-permissions.md) pour plus de détails.
:::

## Création de votre première page

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web** et cliquez sur **Pages**.
2. Cliquez sur **Ajouter une page** dans le coin supérieur droit.
3. Choisissez **Vierge** comme type de page et nommez-la « Accueil ».
4. Cliquez sur **Paramètres de la page** et définissez le chemin d'URL sur `/` (une barre oblique sans texte) pour votre page d'accueil. Les autres pages utilisent `/page-name`.
5. Cliquez sur **Éditer le contenu** pour commencer. Chaque page doit commencer par une **Section** -- c'est le conteneur de tous les autres éléments.
6. Après avoir ajouté une section, cliquez sur **Ajouter du contenu** à nouveau pour insérer du texte, des images, des vidéos, des cartes, des formulaires et plus encore en les faisant glisser dans votre section.

:::info
Pour des instructions détaillées sur l'utilisation des pages et de la navigation, consultez [Gestion des pages](managing-pages). Pour un guide complet de l'éditeur visuel, consultez [Utilisation de l'éditeur de page](page-editor).
:::

## Configuration de l'apparence du site

1. Dans le menu Sauter, choisissez **Site web > Apparence**.
2. Utilisez la **Palette de couleurs** pour définir vos couleurs de marque pour les tons principaux, secondaires et d'accent.
3. Sous **Paramètres de typographie**, choisissez vos polices de titre et de corps dans le navigateur de polices.
4. Téléchargez le logo de votre église sous **Logo** dans les paramètres de style. Fournissez une version pour fond clair et une version pour fond sombre.
5. Configurez votre **Pied de page du site** avec les informations de contact et les liens de votre église.

:::info
Les modifications que vous apportez dans Apparence s'appliquent à l'ensemble de votre site web. Consultez la page [Apparence](appearance) pour des instructions détaillées sur chaque paramètre.
:::

## Configuration de la navigation

Vos liens de navigation apparaissent dans la vue Pages du site web. Pour les organiser :

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation et pointez-le vers l'une de vos pages.
2. Faites glisser et déposez les liens pour les réorganiser ou les imbriquer sous des éléments parents.
3. Prévisualisez votre site pour confirmer que la navigation s'affiche correctement.

## Étapes suivantes

- [Gestion des pages](managing-pages) -- Apprenez à travailler en détail avec les pages et la navigation
- [Apparence](appearance) -- Affinez les couleurs, les polices et la mise en page de votre site
- [Fichiers](files) -- Téléchargez les images et documents de votre site web
