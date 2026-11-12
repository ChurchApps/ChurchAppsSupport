---
title: "Premiers pas avec votre site web B1 Admin"
sidebar_label: "Configuration initiale"
description: "Configurez le site web de votre église dans B1 Admin : pointez un sous-domaine ou un domaine personnalisé, créez votre page d'accueil, choisissez les couleurs de marque et le logo, puis construisez la navigation."
---

# Configuration initiale

<div class="article-intro">

Chaque compte B1 est livré avec un site web prêt à l'emploi. Ce guide vous accompagne dans la configuration du domaine de votre église, la personnalisation de l'apparence de votre site, la création de vos premières pages et l'organisation de votre navigation.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1.church avec un accès administrateur
- Si vous utilisez un domaine personnalisé, ayez à portée de main les identifiants de connexion de votre fournisseur DNS (par exemple, GoDaddy, Cloudflare ou AWS)
- Préparez le logo de votre église au format PNG, avec un arrière-plan transparent pour de meilleurs résultats

</div>

## Configurer votre domaine {#setting-up-your-domain}

Votre église reçoit automatiquement un sous-domaine sur B1.church (par exemple, `yourchurch.b1.church`). Vous pouvez aussi faire pointer votre propre domaine personnalisé vers votre site B1.

1. Rendez-vous sur **B1.church Admin** en visitant admin.b1.church ou en cliquant sur le menu déroulant de votre profil et en choisissant **Changer d'application**.
2. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, puis cliquez sur **Paramètres**.
3. Ouvrez la section **Informations sur l'église** pour voir votre sous-domaine. Choisissez-en un court et reconnaissable, sans espaces.
4. Pour utiliser un domaine personnalisé, connectez-vous à votre fournisseur DNS (comme GoDaddy, Cloudflare ou AWS) et ajoutez deux enregistrements :
   - Un **enregistrement A** pour votre domaine racine pointant vers `3.23.251.61`
   - Un **enregistrement CNAME** pour `www` pointant vers `proxy.b1.church`
5. Revenez dans B1.church Admin, ouvrez la section **Domaines** de la même page Paramètres, ajoutez votre domaine personnalisé à la liste, puis cliquez sur **Ajouter** puis sur **Enregistrer**. Votre site sera accessible depuis votre domaine personnalisé en quelques minutes.

:::tip
Si vous ne voyez pas l'option Paramètres, demandez à la personne qui a configuré le compte de votre église de vous accorder l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](../settings/roles-permissions.md) pour plus de détails.
:::

## Créer votre première page {#creating-your-first-page}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Site web**, puis cliquez sur **Pages**.
2. Cliquez sur **Ajouter une page** dans le coin supérieur droit.
3. Choisissez **Vierge** comme type de page, saisissez « Accueil » comme **titre de la page**, puis cliquez sur **Enregistrer**.
4. Cliquez sur **Paramètres de la page** dans la ligne de la nouvelle page et remplacez le **chemin d'URL** par `/` (une barre oblique sans texte) pour votre page d'accueil. Les autres pages utilisent `/page-name`.
5. Cliquez sur **Modifier le contenu** pour commencer à construire. Chaque page doit commencer par une **section** -- c'est le conteneur de tous les autres éléments. Cliquez sur **Ajouter du contenu** et glissez **Section** sur la page, puis choisissez une disposition de section prête à l'emploi ou une **Section vierge**.
6. Après avoir ajouté une section, cliquez à nouveau sur **Ajouter du contenu** pour insérer du texte, des images, des vidéos, des cartes, des formulaires et plus encore, en les glissant dans votre section.

:::info
Pour des instructions détaillées sur les pages et la navigation, voir [Gérer les pages](./managing-pages.md). Pour un guide complet de l'éditeur visuel, voir [Utiliser l'éditeur de pages](./page-editor.md).
:::

## Configurer l'apparence du site {#configuring-site-appearance}

1. Dans le menu de navigation rapide, choisissez **Site web > Apparence**.
2. Utilisez la **Palette de couleurs** pour définir les couleurs de votre marque -- les nuances claire, d'accent et foncée de base, ainsi que les couleurs des boutons principal et secondaire -- puis cliquez sur **Enregistrer la palette**.
3. Sous **Polices**, choisissez vos polices de titres et de texte dans le navigateur de polices, puis cliquez sur **Enregistrer les polices**.
4. Téléversez le logo de votre église sous **Logo** dans les Paramètres de style. Fournissez une version pour fond clair et une version pour fond foncé, puis cliquez sur **Enregistrer les modifications**.
5. Cliquez sur **Pied de page du site** pour ouvrir le pied de page dans l'éditeur de blocs, puis ajoutez les coordonnées et les liens de votre église.

:::info
Les modifications apportées dans Apparence s'appliquent à l'ensemble de votre site web. Voir la page [Apparence](./appearance.md) pour des instructions détaillées sur chaque réglage.
:::

## Configurer la navigation {#setting-up-navigation}

Vos liens de navigation apparaissent dans la vue Pages du site web. Pour les organiser :

1. Dans le panneau **Navigation principale**, cliquez sur **Ajouter**, saisissez le **texte du lien** et le chemin de la page (par exemple, `/about`) comme **URL**, puis cliquez sur **Enregistrer**.
2. Glissez-déposez les liens pour les réordonner ou les imbriquer sous des éléments parents.
3. Prévisualisez votre site pour vérifier que la navigation s'affiche correctement.

## Étapes suivantes {#next-steps}

- [Gérer les pages](./managing-pages.md) -- Apprendre à travailler en détail avec les pages et la navigation
- [Apparence](./appearance.md) -- Peaufiner les couleurs, les polices et la mise en page de votre site
- [Fichiers](./files.md) -- Téléverser des images et des documents pour votre site web
