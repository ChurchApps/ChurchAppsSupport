---
title: "Configuration initiale"
---

# Configuration initiale

<div class="article-intro">

Chaque compte B1 est livré avec un site web prêt à l'emploi. Ce guide vous accompagne dans la configuration de votre domaine d'église, la personnalisation de l'apparence de votre site, la création de vos premières pages et l'organisation de votre navigation.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1.church avec un accès administrateur
- Si vous utilisez un domaine personnalisé, ayez vos identifiants de connexion de fournisseur DNS à portée de main (par exemple, GoDaddy, Cloudflare ou AWS)
- Préparez votre logo d'église au format PNG avec un fond transparent pour de meilleurs résultats

</div>

## Configurer votre domaine

Votre église reçoit automatiquement un sous-domaine sur B1.church (par exemple, `votreeglise.b1.church`). Vous pouvez également pointer votre propre domaine personnalisé vers votre site B1.

1. Allez dans **B1.church Admin** en visitant admin.b1.church ou en cliquant sur votre menu déroulant de profil et en choisissant **Changer d'application**.
2. Cliquez sur **Tableau de bord** dans la barre latérale gauche, puis sélectionnez **Paramètres** dans le menu déroulant.
3. Cliquez sur **Gérer** pour voir votre sous-domaine. Définissez-le comme quelque chose de court et reconnaissable, sans espaces.
4. Pour utiliser un domaine personnalisé, connectez-vous à votre fournisseur DNS (comme GoDaddy, Cloudflare ou AWS) et ajoutez deux enregistrements :
   - Un **enregistrement A** pour votre domaine racine pointant vers `3.23.251.61`
   - Un **enregistrement CNAME** pour `www` pointant vers `proxy.b1.church`
5. Retournez dans B1.church Admin, ajoutez votre domaine personnalisé à la liste et cliquez sur **Ajouter** puis **Enregistrer**. Votre site sera accessible depuis votre domaine personnalisé en quelques minutes.

:::tip
Si vous ne voyez pas l'option Paramètres, demandez à la personne qui a créé le compte de votre église de vous accorder la permission « Modifier les paramètres de l'église ». Consultez [Rôles et permissions](../settings/roles-permissions.md) pour plus de détails.
:::

## Créer votre première page

1. Dans B1 Admin, cliquez sur **Site web** dans le menu de gauche pour ouvrir la vue Pages du site web.
2. Cliquez sur **Ajouter une page** dans le coin supérieur droit.
3. Choisissez **Vierge** comme type de page et nommez-la « Accueil ».
4. Cliquez sur **Paramètres de la page** et définissez le chemin d'URL sur `/` (une barre oblique sans texte) pour votre page d'accueil. Les autres pages utilisent `/nom-de-page`.
5. Cliquez sur **Modifier le contenu** pour commencer la construction. Chaque page doit commencer par une **Section** -- c'est le conteneur pour tous les autres éléments.
6. Après avoir ajouté une section, cliquez à nouveau sur **Ajouter du contenu** pour insérer du texte, des images, des vidéos, des cartes, des formulaires et plus encore en les faisant glisser dans votre section.

:::info
Pour des instructions détaillées sur le travail avec les pages, la navigation et les types de pages, consultez [Gestion des pages](managing-pages).
:::

## Configurer l'apparence du site

1. Depuis la vue Pages du site web, cliquez sur l'onglet **Apparence** en haut.
2. Utilisez la **Palette de couleurs** pour définir vos couleurs de marque pour les tons primaire, secondaire et accent.
3. Dans **Paramètres de typographie**, choisissez vos polices de titres et de corps de texte dans l'explorateur de polices.
4. Téléversez votre logo d'église sous **Logo** dans les Paramètres de style. Fournissez une version pour fond clair et une version pour fond foncé.
5. Configurez le **Pied de page du site** avec les coordonnées et les liens de votre église.

:::info
Les modifications que vous apportez dans Apparence s'appliquent à l'ensemble de votre site web. Consultez la page [Apparence](appearance) pour des instructions détaillées sur chaque paramètre.
:::

## Configurer la navigation

Vos liens de navigation apparaissent dans la barre latérale gauche de la vue Pages du site web. Pour les organiser :

1. Cliquez sur **Ajouter** pour créer un nouveau lien de navigation et le pointer vers l'une de vos pages.
2. Glissez-déposez les liens pour les réorganiser ou les imbriquer sous des éléments parents.
3. Prévisualisez votre site pour confirmer que la navigation est correcte.

## Prochaines étapes

- [Gestion des pages](managing-pages) -- Apprendre à travailler en détail avec les pages et la navigation
- [Apparence](appearance) -- Affiner les couleurs, polices et la mise en page de votre site
- [Fichiers](files) -- Téléverser des images et des documents pour votre site web
