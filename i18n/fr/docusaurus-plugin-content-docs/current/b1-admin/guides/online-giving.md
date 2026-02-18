---
title: "Guide : Configurer les dons en ligne"
---

# Configurer les dons en ligne

<div class="article-intro">

Parcourez toutes les étapes nécessaires pour accepter les dons en ligne dans votre église -- de la création de fonds de dons, à la connexion de Stripe pour le traitement des paiements, jusqu'au partage de la page de dons avec votre assemblée. À la fin, les membres pourront donner en ligne via votre site web et votre application mobile.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec un accès administrateur -- voir [Rôles et permissions](../people/roles-permissions.md)
- Un compte Stripe (créez-en un gratuitement sur [stripe.com](https://stripe.com) si nécessaire)

</div>

## Étape 1 : Créer les fonds de dons

Les fonds sont les catégories auxquelles les donateurs peuvent contribuer. Vous devez avoir au moins un fonds avant de pouvoir accepter des dons.

Suivez le guide [Fonds](../donations/funds.md) pour configurer vos catégories de dons :

1. Créez vos fonds les plus courants (par ex. « Fonds général », « Fonds bâtiment », « Missions »)
2. Indiquez correctement les fonds déductibles des impôts -- cela affecte les relevés de dons de fin d'année

:::tip
Vous pouvez ajouter d'autres fonds à tout moment. Commencez par vos catégories de dons les plus courantes.
:::

## Étape 2 : Connecter Stripe

Stripe gère tout le traitement des paiements. Vous allez connecter votre compte Stripe à B1 Admin pour que les dons soient versés sur votre compte bancaire.

Suivez le guide [Configuration des dons en ligne](../donations/online-giving-setup.md) pour connecter Stripe :

1. Connectez-vous à votre tableau de bord Stripe et récupérez votre clé publique et votre clé secrète
2. Dans B1 Admin, allez dans Paramètres et saisissez les deux clés

:::warning
Stripe n'affiche votre clé secrète qu'une seule fois. Copiez-la et sauvegardez-la avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez en générer une nouvelle.
:::

## Étape 3 : Ajouter une page de dons à votre site web

Rendez les dons accessibles en ajoutant une page de dons à votre site B1.

Suivez les guides [Configuration des dons en ligne](../donations/online-giving-setup.md) et [Gestion des pages](../website/managing-pages.md) pour :

1. Ajouter un onglet « Don » à votre site B1.church
2. Votre URL de dons sera : `https://yoursubdomain.b1.church/donate`
3. Les membres peuvent donner sans se connecter (page publique) ou se connecter pour accéder à leurs moyens de paiement enregistrés et à leur historique de dons

## Étape 4 : Effectuer un don test

Avant de l'annoncer à votre assemblée, vérifiez que tout fonctionne correctement.

1. Effectuez un petit don test pour vérifier que le processus fonctionne de bout en bout
2. Vérifiez que le don apparaît dans B1 Admin sous Dons

:::tip
Utilisez d'abord le mode test de Stripe si vous souhaitez vérifier sans frais réels, puis passez en mode production avant de l'annoncer à votre assemblée.
:::

## Étape 5 : Annoncer à votre assemblée

Faites passer le mot pour que les membres sachent qu'ils peuvent donner en ligne.

1. Partagez l'URL de dons via votre site web, vos newsletters par e-mail, vos bulletins et les réseaux sociaux
2. Les membres peuvent également donner via l'[application B1 Mobile](../../b1-mobile/giving/) -- la fonctionnalité de don est intégrée

:::info
Les membres qui se connectent peuvent enregistrer leurs moyens de paiement, configurer des dons récurrents et consulter leur historique de dons. Le don anonyme fonctionne aussi -- aucune connexion requise.
:::

## Étape 6 : Gestion courante

Maintenez vos enregistrements de dons à jour et générez des rapports tout au long de l'année.

1. [Importez les transactions Stripe](../donations/stripe-import.md) régulièrement (chaque semaine ou chaque mois) pour maintenir vos enregistrements à jour
2. [Consultez les rapports de dons](../donations/donation-reports.md) pour suivre les tendances de dons et les totaux par fonds
3. [Générez les relevés de dons de fin d'année](../donations/giving-statements.md) pour les déclarations fiscales de vos donateurs

:::tip
Exécutez les imports Stripe au moins une fois par mois pour que vos enregistrements restent à jour. Consultez le [Guide des rapports de fin d'année](./year-end-reports.md) pour le processus complet de fin d'année.
:::

## C'est terminé !

Votre église accepte désormais les dons en ligne. Les membres peuvent donner via votre site web, l'application B1 Mobile ou tout appareil doté d'un navigateur web. Tous les dons sont automatiquement suivis dans B1 Admin.

## Articles connexes

- [Fonds](../donations/funds.md) -- créer et gérer les catégories de dons
- [Lots](../donations/batches.md) -- organiser les dons en groupes
- [Enregistrement des dons](../donations/recording-donations.md) -- saisir manuellement les dons en espèces et par chèque
- [Import Stripe](../donations/stripe-import.md) -- importer les transactions en ligne dans B1 Admin
- [Rapports de dons](../donations/donation-reports.md) -- consulter les tendances et les totaux des dons
- [Relevés de dons](../donations/giving-statements.md) -- générer les relevés fiscaux de fin d'année
- [Effectuer un don (Web)](../../b1-church/giving/making-donations.md) -- l'expérience de don des membres
- [Effectuer un don (Mobile)](../../b1-mobile/giving/making-donations.md) -- donner depuis l'application mobile
