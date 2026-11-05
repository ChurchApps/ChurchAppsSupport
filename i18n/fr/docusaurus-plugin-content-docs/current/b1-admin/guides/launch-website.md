---
title: "Guide : Lancer votre site Web d'église"
---

# Lancer votre site Web d'église

<div class="article-intro">

B1.church comprend un constructeur de sites web complet, sans frais supplémentaires. Ce guide vous accompagne dans la création de votre site web d'église à partir de zéro : configuration de votre page d'accueil, personnalisation de l'apparence, ajout des pages essentielles, et, si vous le souhaitez, connexion des formulaires de dons en ligne et d'inscription aux événements.

</div>

## Vidéo de formation

<YouTube id="aA4UahZpmXg" title="Lancer le site web de votre église dans B1" next="Modifier les pages et la navigation dans B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Ayez le logo de votre église prêt (un PNG à fond transparent donne les meilleurs résultats)
- Choisissez 2 à 3 couleurs de marque pour votre site
- Si vous utilisez un domaine personnalisé (par exemple votreeglise.ca), ayez accès à votre fournisseur DNS (GoDaddy, Cloudflare, etc.)
- Si vous souhaitez des dons en ligne sur votre site, effectuez d'abord la [Configuration des dons en ligne](../donations/online-giving-setup.md) (Stripe)

</div>

## Étape 1 : configuration initiale du site web

Commencez par créer votre page d'accueil et la structure de base de votre site.

Suivez le guide [Configuration initiale du site web](../website/initial-setup.md) pour :

1. Accéder à **Site web** dans B1 Admin
2. Créer votre page d'accueil avec une section héros, un message de bienvenue et les informations essentielles
3. Ajouter le nom et la devise de votre église

## Étape 2 : configurer l'apparence

Définissez l'identité visuelle de votre site -- couleurs, polices, logo et pied de page.

Suivez le guide [Apparence](../website/appearance.md) pour :

1. Téléverser le logo de votre église
2. Définir vos couleurs principale et d'accent
3. Configurer la barre de navigation et le pied de page
4. Prévisualiser vos modifications

:::tip
Gardez une palette de couleurs simple : une couleur principale et une couleur d'accent suffisent généralement. Le constructeur de sites web s'occupe du reste.
:::

## Étape 3 : ajouter des pages de contenu

Créez les pages dont vos visiteurs ont le plus besoin.

Suivez le guide [Gérer les pages](../website/managing-pages.md) pour créer des pages comme :

- **À propos** -- L'histoire, les croyances et la direction de votre église
- **Sermons** -- Un lien vers votre [bibliothèque de sermons](../sermons/managing-sermons.md)
- **Événements** -- Les événements à venir et les inscriptions
- **Dons** -- Page de dons en ligne (nécessite la [configuration de Stripe](../donations/online-giving-setup.md))
- **Contact** -- Emplacement, horaires des services et coordonnées

## Étape 4 : connecter votre domaine

Si vous voulez utiliser votre propre nom de domaine (comme votreeglise.ca) au lieu de l'adresse B1 par défaut :

1. Allez à **Paramètres** dans B1 Admin et ouvrez la section **Domaines**
2. Saisissez votre domaine personnalisé
3. Mettez à jour les enregistrements DNS chez votre fournisseur de domaine pour pointer vers B1

:::info
Les modifications DNS peuvent prendre jusqu'à 48 heures pour se propager. Votre site peut ne pas être accessible depuis votre domaine personnalisé immédiatement. L'adresse B1 par défaut continuera de fonctionner pendant ce temps.
:::

## Étape 5 : ajouter les dons et les formulaires

Enrichissez votre site avec des éléments interactifs :

- **Dons en ligne** -- Ajoutez une section de dons pour que les membres puissent donner directement depuis votre site web. Consultez la [Configuration des dons en ligne](../donations/online-giving-setup.md) pour configurer Stripe au préalable.
- **Formulaires d'inscription** -- Intégrez des [formulaires autonomes](../forms/creating-forms.md) pour les inscriptions aux événements, les fiches de visiteurs ou les candidatures de bénévoles. Consultez [Gérer les pages](../website/managing-pages.md) pour savoir comment ajouter un élément formulaire à n'importe quelle page.

## C'est fini !

Votre site web d'église est en ligne. Partagez l'adresse avec votre communauté et sur les réseaux sociaux. Vous pouvez mettre à jour le contenu, ajouter de nouvelles pages et modifier l'apparence à tout moment depuis le tableau de bord de B1 Admin.

## Articles connexes

- [Configuration initiale du site web](../website/initial-setup.md) -- parcours de configuration détaillé
- [Gérer les pages](../website/managing-pages.md) -- ajouter et modifier des pages
- [Apparence](../website/appearance.md) -- couleurs, logo et mise en page
- [Gérer les fichiers](../website/files.md) -- téléverser des images et des documents
- [Configuration des dons en ligne](../donations/online-giving-setup.md) -- configurer Stripe
- [Créer des formulaires](../forms/creating-forms.md) -- créer des formulaires d'inscription et de sondage
