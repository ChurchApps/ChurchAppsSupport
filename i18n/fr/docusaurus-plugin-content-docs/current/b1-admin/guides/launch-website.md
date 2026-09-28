---
title: "Guide : Lancer votre site Web d'église"
---

# Lancer votre site Web d'église

<div class="article-intro">

B1.church inclut un constructeur de site Web complet sans frais supplémentaires. Ce guide vous montre comment créer votre site Web d'église à partir de zéro - configuration de votre page d'accueil, configuration de votre apparence, ajout de pages clés et, éventuellement, connexion des dons en ligne et des formulaires d'inscription aux événements.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Ayez votre logo d'église prêt (PNG avec fond transparent fonctionne mieux)
- Choisissez 2-3 couleurs de marque pour votre site
- Si vous utilisez un domaine personnalisé (par exemple, votreeglise.com), accédez à votre fournisseur DNS (GoDaddy, Cloudflare, etc.)
- Si vous souhaitez des dons en ligne sur votre site, complétez d'abord [Configuration des dons en ligne](../donations/online-giving-setup.md) (Stripe)

</div>

## Étape 1 : configuration initiale du site Web

Commencez par créer votre page d'accueil et la structure de base du site.

Suivez le guide [Configuration initiale du site Web](../website/initial-setup.md) pour :

1. Accéder à **Site Web** dans B1 Admin
2. Créer votre page d'accueil avec une section de héros, un message de bienvenue et des informations clés
3. Ajouter le nom et la devise de votre église

## Étape 2 : configurer l'apparence

Définissez l'identité visuelle de votre site - couleurs, polices, logo et pied de page.

Suivez le guide [Apparence](../website/appearance.md) pour :

1. Télécharger votre logo d'église
2. Définir vos couleurs primaire et d'accent
3. Configurer la barre de navigation et le pied de page
4. Prévisualiser vos modifications

:::tip
Gardez votre palette de couleurs simple - une couleur primaire plus une couleur d'accent suffit généralement. Le constructeur de site Web gérera le reste.
:::

## Étape 3 : ajouter des pages de contenu

Construisez les pages dont vos visiteurs ont le plus besoin.

Suivez le guide [Gestion des pages](../website/managing-pages.md) pour créer des pages comme :

- **À propos** — L'histoire, les croyances et le leadership de votre église
- **Sermons** — Lien vers votre [bibliothèque de sermons](../sermons/managing-sermons.md)
- **Événements** — Événements à venir et inscription
- **Donner** — Page de dons en ligne (nécessite [configuration Stripe](../donations/online-giving-setup.md))
- **Contact** — Localisation, heures de service et informations de contact

## Étape 4 : connecter votre domaine

Si vous souhaitez utiliser votre propre nom de domaine (comme votreeglise.com) au lieu de l'URL B1 par défaut :

1. Allez à **Paramètres** dans B1 Admin et ouvrez la section **Domaines**
2. Entrez votre domaine personnalisé
3. Mettez à jour vos enregistrements DNS chez votre fournisseur de domaine pour pointer vers B1

:::info
Les modifications DNS peuvent prendre jusqu'à 48 heures pour se propager. Votre site peut ne pas être accessible depuis votre domaine personnalisé immédiatement. L'URL B1 par défaut continuera à fonctionner pendant ce temps.
:::

## Étape 5 : ajouter des dons et des formulaires

Améliorez votre site avec des éléments interactifs :

- **Dons en ligne** — Ajoutez une section de dons pour que les membres puissent faire des dons directement depuis votre site Web. Voir [Configuration des dons en ligne](../donations/online-giving-setup.md) pour configurer Stripe d'abord.
- **Formulaires d'inscription** — Intégrez des [formulaires autonomes](../forms/creating-forms.md) pour les inscriptions aux événements, les cartes de visiteur ou les candidatures de bénévoles. Voir [Gestion des pages](../website/managing-pages.md) pour savoir comment ajouter un élément de formulaire à n'importe quelle page.

## C'est fini !

Votre site Web d'église est en direct. Partagez l'URL avec votre congrégation et sur les médias sociaux. Vous pouvez mettre à jour le contenu, ajouter de nouvelles pages et ajuster l'apparence à tout moment à partir du tableau de bord B1 Admin.

## Articles connexes

- [Configuration initiale du site Web](../website/initial-setup.md) — guide détaillé de configuration
- [Gestion des pages](../website/managing-pages.md) — ajouter et modifier des pages
- [Apparence](../website/appearance.md) — couleurs, logo et mise en page
- [Gestion des fichiers](../website/files.md) — télécharger des images et des documents
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — configurer Stripe
- [Créer des formulaires](../forms/creating-forms.md) — créer des formulaires d'inscription et d'enquête
