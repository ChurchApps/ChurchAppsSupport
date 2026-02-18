---
title: "Guide : Lancer le site web de votre église"
---

# Lancer le site web de votre église

<div class="article-intro">

B1.church inclut un constructeur de site web complet sans coût supplémentaire. Ce guide vous accompagne dans la création de votre site web d'église de A à Z -- configuration de votre page d'accueil, personnalisation de l'apparence, ajout de pages essentielles, et connexion optionnelle des dons en ligne et des formulaires d'inscription aux événements.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Préparez le logo de votre église (un PNG avec fond transparent fonctionne le mieux)
- Choisissez 2 à 3 couleurs de marque pour votre site
- Si vous utilisez un domaine personnalisé (par exemple, votreeglise.com), ayez accès à votre fournisseur DNS (GoDaddy, Cloudflare, etc.)
- Si vous souhaitez les dons en ligne sur votre site, complétez d'abord la [Configuration des dons en ligne](../donations/online-giving-setup.md) (Stripe)

</div>

## Étape 1 : Configuration initiale du site web

Commencez par créer votre page d'accueil et la structure de base du site.

Suivez le guide [Configuration initiale du site web](../website/initial-setup.md) pour :

1. Accéder à **Site web** dans B1 Admin
2. Créer votre page d'accueil avec une section héro, un message de bienvenue et les informations clés
3. Ajouter le nom et le slogan de votre église

## Étape 2 : Configurer l'apparence

Définissez l'identité visuelle de votre site -- couleurs, polices, logo et pied de page.

Suivez le guide [Apparence](../website/appearance.md) pour :

1. Télécharger le logo de votre église
2. Définir vos couleurs principales et d'accentuation
3. Configurer la barre de navigation et le pied de page
4. Prévisualiser vos modifications

:::tip
Gardez votre palette de couleurs simple -- une couleur principale plus une couleur d'accentuation suffit généralement. Le constructeur de site web s'occupe du reste.
:::

## Étape 3 : Ajouter des pages de contenu

Créez les pages dont vos visiteurs ont le plus besoin.

Suivez le guide [Gestion des pages](../website/managing-pages.md) pour créer des pages telles que :

- **À propos** — L'histoire de votre église, vos croyances et votre équipe dirigeante
- **Prédications** — Lien vers votre [bibliothèque de prédications](../sermons/managing-sermons.md)
- **Événements** — Événements à venir et inscriptions
- **Donner** — Page de dons en ligne (nécessite la [configuration Stripe](../donations/online-giving-setup.md))
- **Contact** — Localisation, horaires des cultes et coordonnées

## Étape 4 : Connecter votre domaine

Si vous souhaitez utiliser votre propre nom de domaine (comme votreeglise.com) au lieu de l'URL B1 par défaut :

1. Allez dans **Site web > Paramètres** dans B1 Admin
2. Saisissez votre domaine personnalisé
3. Mettez à jour vos enregistrements DNS chez votre fournisseur de domaine pour pointer vers B1

:::info
Les modifications DNS peuvent prendre jusqu'à 48 heures pour se propager. Votre site peut ne pas être accessible depuis votre domaine personnalisé immédiatement. L'URL B1 par défaut continuera de fonctionner pendant cette période.
:::

## Étape 5 : Ajouter les dons et les formulaires

Enrichissez votre site avec des éléments interactifs :

- **Dons en ligne** — Ajoutez une section de dons pour que les membres puissent faire des dons directement depuis votre site web. Consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) pour configurer Stripe au préalable.
- **Formulaires d'inscription** — Intégrez des [formulaires autonomes](../forms/creating-forms.md) pour les inscriptions aux événements, les fiches de visiteurs ou les candidatures de bénévoles. Consultez [Gestion des pages](../website/managing-pages.md) pour savoir comment ajouter un élément de formulaire à n'importe quelle page.

## C'est terminé !

Le site web de votre église est en ligne. Partagez l'URL avec votre assemblée et sur les réseaux sociaux. Vous pouvez mettre à jour le contenu, ajouter de nouvelles pages et ajuster l'apparence à tout moment depuis le tableau de bord B1 Admin.

## Articles connexes

- [Configuration initiale du site web](../website/initial-setup.md) — guide de configuration détaillé
- [Gestion des pages](../website/managing-pages.md) — ajouter et modifier des pages
- [Apparence](../website/appearance.md) — couleurs, logo et mise en page
- [Gestion des fichiers](../website/files.md) — télécharger des images et des documents
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — configurer Stripe
- [Créer des formulaires](../forms/creating-forms.md) — créer des formulaires d'inscription et de sondage
