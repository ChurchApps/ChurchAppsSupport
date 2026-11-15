---
title: "Guide : Lancer le site web de votre église"
description: "Configurez un site web d'église dans B1 Admin : créez votre page d'accueil, harmonisez les couleurs et le logo, ajoutez les pages principales, connectez un domaine personnalisé et ajoutez les formulaires de dons."
---

# Lancer le site web de votre église

<div class="article-intro">

B1.church comprend un générateur de site web complet, sans frais supplémentaires. Ce guide vous accompagne dans la création du site web de votre église à partir de zéro -- configuration de votre page d'accueil, de votre apparence, ajout des pages principales et, facultativement, connexion des formulaires de dons en ligne et d'inscription aux événements.

</div>

## Vidéo de formation {#training-video}

<YouTube id="aA4UahZpmXg" title="Lancer le site web de votre église dans B1" next="Modifier les pages et la navigation dans B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Ayez votre logo d'église prêt (un PNG à fond transparent donne les meilleurs résultats)
- Choisissez 2 ou 3 couleurs de marque pour votre site
- Si vous utilisez un domaine personnalisé (par exemple votre-eglise.org), ayez accès à votre fournisseur DNS (GoDaddy, Cloudflare, etc.)
- Si vous voulez les dons en ligne sur votre site, effectuez d'abord la [Configuration des dons en ligne](../donations/online-giving-setup.md) (Stripe)

</div>

## Étape 1 : Configuration initiale du site web {#step-1-initial-website-setup}

Commencez par créer votre page d'accueil et la structure de base de votre site.

Suivez le guide [Configuration initiale du site web](../website/initial-setup.md) pour :

1. Dans le [menu Jump](../introduction.md#getting-around-with-the-jump-menu), choisissez **Site web > Pages**
2. Cliquez sur **Ajouter une page**, choisissez **Vierge**, saisissez « Accueil » comme **Titre de la page**, puis cliquez sur **Enregistrer**. Dans **Paramètres de la page**, réglez le **Chemin d'URL** sur `/`
3. Cliquez sur **Modifier le contenu**, ajoutez une **Section**, puis ajoutez votre bannière, votre message de bienvenue, le nom de votre église et votre slogan, ainsi que les autres renseignements clés

:::tip
Vous partez de zéro ? Un [modèle de site](../website/managing-pages.md#starting-from-a-site-template) crée un ensemble de pages prêtes à l'emploi (accueil, à propos, se connecter, donner et autres) avec les liens de navigation déjà configurés -- remplacez simplement le contenu de remplacement par le vôtre.
:::

## Étape 2 : Configurer l'apparence {#step-2-configure-appearance}

Définissez l'identité visuelle de votre site -- couleurs, polices, logo et pied de page.

Suivez le guide [Apparence](../website/appearance.md) pour :

1. Dans le menu Jump, choisissez **Site web > Apparence**
2. Sous **Logo**, téléversez un **logo pour fond clair** et un **logo pour fond foncé**
3. Sous **Palette de couleurs**, définissez les couleurs de votre marque et cliquez sur **Enregistrer la palette**, puis choisissez vos **Polices**
4. Utilisez **Navigation** pour styliser la barre de navigation et **Pied de page du site** pour construire le pied de page qui apparaît sur chaque page

:::tip
Gardez votre palette de couleurs simple -- une couleur principale et une couleur d'accent suffisent généralement. Le générateur de site web se charge du reste.
:::

## Étape 3 : Ajouter les pages de contenu {#step-3-add-content-pages}

Créez les pages dont vos visiteurs ont le plus besoin.

Suivez le guide [Gérer les pages](../website/managing-pages.md) pour créer des pages comme :

- **À propos** -- l'histoire, les croyances et la direction de votre église
- **Prédications** -- un lien vers votre [bibliothèque de prédications](../sermons/managing-sermons.md)
- **Événements** -- les événements à venir et les inscriptions
- **Donner** -- la page de dons en ligne (nécessite la [configuration de Stripe](../donations/online-giving-setup.md))
- **Contact** -- l'emplacement, les horaires des services et les coordonnées

## Étape 4 : Connecter votre domaine {#step-4-connect-your-domain}

Si vous voulez utiliser votre propre nom de domaine (comme votre-eglise.org) au lieu de l'adresse B1 par défaut :

Suivez le guide [Domaine personnalisé](../settings/custom-domain.md) pour :

1. Chez votre fournisseur de domaine, ajoutez un enregistrement **CNAME** pour `www` pointant vers `proxy.b1.church` (ou un enregistrement **A** pour votre domaine racine pointant vers `3.23.251.61`)
2. Dans le menu Jump, choisissez **Paramètres > Paramètres**, cliquez sur **Modifier** dans la section **Domaines**, saisissez votre domaine, puis cliquez sur **Enregistrer**

:::info
Configurez d'abord le DNS : B1 enregistre le domaine immédiatement, mais ne charge pas votre site (et n'obtient pas son certificat SSL) tant que le DNS ne pointe pas vers B1. Les modifications DNS peuvent prendre de quelques minutes à quelques heures. L'adresse B1 par défaut continue de fonctionner pendant ce temps.
:::

## Étape 5 : Ajouter les dons et les formulaires {#step-5-add-giving-and-forms}

Enrichissez votre site avec des éléments interactifs :

- **Dons en ligne** -- Ajoutez un élément **Don** pour que les membres puissent donner directement depuis votre site web. Consultez la [Configuration des dons en ligne](../donations/online-giving-setup.md) pour configurer Stripe au préalable.
- **Formulaires d'inscription** -- Intégrez des [formulaires Autonomes](../forms/creating-forms.md) pour les inscriptions aux événements, les cartes de visiteur ou les candidatures de bénévoles avec l'élément **Formulaire**. Consultez l'[Éditeur de pages](../website/page-editor.md) pour savoir comment ajouter des éléments à n'importe quelle page.

## Terminé ! {#youre-done}

Le site web de votre église est en ligne. Partagez l'adresse avec votre communauté et sur les réseaux sociaux. Vous pouvez mettre à jour le contenu, ajouter de nouvelles pages et ajuster l'apparence à tout moment depuis la section **Site web** de B1 Admin.

## Articles connexes {#related-articles}

- [Configuration initiale du site web](../website/initial-setup.md) — parcours de configuration détaillé
- [Gérer les pages](../website/managing-pages.md) — ajouter et modifier des pages
- [Apparence](../website/appearance.md) — couleurs, logo et mise en page
- [Éditeur de pages](../website/page-editor.md) — ajouter des sections, du texte, des images, des formulaires et des dons
- [Domaine personnalisé](../settings/custom-domain.md) — utiliser votre propre adresse web
- [Gestion des fichiers](../website/files.md) — téléverser des images et des documents
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — configurer Stripe
- [Créer des formulaires](../forms/creating-forms.md) — créer des formulaires d'inscription et de sondage
