---
title: "Configuration initiale"
---

# Configuration initiale

<div class="article-intro">

Chaque compte B1 est livré avec un site Web prêt à l'emploi. Ce guide vous guide à travers la configuration de votre domaine d'église, la configuration de l'apparence de votre site, la création de vos premières pages et l'organisation de votre navigation.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1.church avec accès administratif
- Si vous utilisez un domaine personnalisé, ayez vos identifiants de fournisseur DNS prêts (par exemple, GoDaddy, Cloudflare ou AWS)
- Préparez le logo de votre église au format PNG avec un arrière-plan transparent pour de meilleurs résultats

</div>

## Configuration de votre domaine

Votre église reçoit automatiquement un sous-domaine sur B1.church (par exemple, `votreglise.b1.church`). Vous pouvez également pointer votre propre domaine personnalisé vers votre site B1.

1. Allez à **B1.church Admin** en visitant admin.b1.church ou en cliquant sur votre menu déroulant de profil et en choisissant **Switch App**.
2. Ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Settings**.
3. Ouvrez la section **Church Information** pour afficher votre sous-domaine. Réglez-le sur quelque chose de court et reconnaissable sans espaces.
4. Pour utiliser un domaine personnalisé, connectez-vous à votre fournisseur DNS (tel que GoDaddy, Cloudflare ou AWS) et ajoutez deux enregistrements:
   - Un **enregistrement A** pour votre domaine racine pointant vers `3.23.251.61`
   - Un **enregistrement CNAME** pour `www` pointant vers `proxy.b1.church`
5. Retournez à B1.church Admin, ajoutez votre domaine personnalisé à la liste, et cliquez sur **Add** puis **Save**. Votre site sera accessible à partir de votre domaine personnalisé dans quelques minutes.

:::tip
Si vous ne voyez pas l'option Paramètres, demandez à la personne qui a configuré votre compte d'église de vous accorder la permission "Edit Church Settings". Voir [Rôles et permissions](../settings/roles-permissions.md) pour les détails.
:::

## Création de votre première page

1. Dans B1 Admin, cliquez sur **Website** dans le menu de gauche pour ouvrir la vue des pages du site Web.
2. Cliquez sur **Add Page** dans le coin supérieur droit.
3. Choisissez **Blank** comme type de page et nommez-la "Home."
4. Cliquez sur **Page Settings** et réglez le chemin URL sur `/` (une barre oblique sans texte) pour votre page d'accueil. Les autres pages utilisent `/page-name`.
5. Cliquez sur **Edit Content** pour commencer à construire. Chaque page doit commencer par une **Section** -- c'est le conteneur pour tous les autres éléments.
6. Après avoir ajouté une section, cliquez à nouveau sur **Add Content** pour insérer du texte, des images, des vidéos, des cartes, des formulaires et plus en les faisant glisser dans votre section.

:::info
Pour des instructions détaillées sur le travail avec les pages et la navigation, voir [Managing Pages](managing-pages). Pour un guide complet de l'éditeur visuel, voir [Using the Page Editor](page-editor).
:::

## Configuration de l'apparence du site

1. À partir de la vue Pages du site Web, cliquez sur l'onglet **Appearance** en haut.
2. Utilisez la **Color Palette** pour définir vos couleurs de marque pour les tons primaires, secondaires et d'accent.
3. Sous **Typography Settings**, choisissez vos polices de titre et de corps dans le navigateur de polices.
4. Téléchargez votre logo d'église sous **Logo** dans les paramètres de style. Fournissez une version pour fond clair et une version pour fond foncé.
5. Configurez votre **Site Footer** avec les informations de contact et les liens de votre église.

:::info
Les modifications que vous apportez dans Appearance s'appliquent à l'ensemble de votre site Web. Voir la page [Appearance](appearance) pour des instructions détaillées sur chaque paramètre.
:::

## Configuration de la navigation

Vos liens de navigation apparaissent dans la vue Pages du site Web. Pour les organiser:

1. Cliquez sur **Add** pour créer un nouveau lien de navigation et le pointer vers l'une de vos pages.
2. Faites glisser et déposez les liens pour les réorganiser ou les imbriquer sous des éléments parents.
3. Prévisualisez votre site pour confirmer que la navigation semble correcte.

## Prochaines étapes

- [Managing Pages](managing-pages) -- Découvrez comment travailler avec les pages et la navigation en détail
- [Appearance](appearance) -- Affiner les couleurs, les polices et la mise en page de votre site
- [Files](files) -- Téléchargez des images et des documents pour votre site Web
