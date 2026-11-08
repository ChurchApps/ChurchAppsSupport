---
title: "Guide : configurer les dons en ligne"
description: "Configurez les dons en ligne dans B1 Admin en créant des fonds de dons, en connectant Stripe et en ajoutant une page Faire un don à votre site B1.church pour vos membres."
---

# Configurer les dons en ligne

<div class="article-intro">

Parcourez tout ce qui est nécessaire pour accepter des dons en ligne dans votre église, de la création des fonds de dons à la connexion de Stripe pour le traitement des paiements, jusqu'au partage de la page de dons avec votre communauté. À la fin, vos membres pourront donner en ligne via votre site web et votre application mobile.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec accès administrateur — voir [Rôles et autorisations](../people/roles-permissions.md)
- Un compte Stripe (créez-en un gratuitement sur [stripe.com](https://stripe.com) si nécessaire)

</div>

## Étape 1 : créer les fonds de dons

Les fonds sont les catégories auxquelles les donateurs peuvent contribuer. Vous devez avoir au moins un fonds avant de pouvoir accepter des dons.

Suivez le guide [Fonds](../donations/funds.md) pour configurer vos catégories de dons :

1. Créez vos fonds les plus courants (par exemple « Fonds général », « Fonds de construction », « Missions »)
2. Indiquez correctement les fonds déductibles d'impôt — cela influe sur les relevés annuels de dons

:::tip
Vous pouvez ajouter d'autres fonds à tout moment. Commencez par vos catégories de dons les plus courantes.
:::

## Étape 2 : connecter Stripe

Stripe gère l'ensemble du traitement des paiements. Vous connecterez votre compte Stripe à B1 Admin afin que les dons soient versés sur votre compte bancaire.

Suivez le guide [Configuration des dons en ligne](../donations/online-giving-setup.md) pour connecter Stripe :

1. Connectez-vous au tableau de bord Stripe et récupérez votre clé publiable et votre clé secrète
2. Dans B1 Admin, accédez aux paramètres et saisissez ces deux clés

:::warning
Stripe n'affiche votre clé secrète qu'une seule fois. Copiez-la et enregistrez-la avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez en générer une nouvelle.
:::

## Étape 3 : ajouter une page de dons à votre site web

Rendez les dons accessibles en ajoutant une page de dons à votre site B1.

Suivez les guides [Configuration des dons en ligne](../donations/online-giving-setup.md) et [Gérer les pages](../website/managing-pages.md) pour :

1. Ajouter un onglet « Faire un don » à votre site B1.church
2. Votre URL de dons sera : `https://votresoussdomaine.b1.church/donate`
3. Les membres peuvent donner sans se connecter (page publique) ou se connecter pour enregistrer leurs moyens de paiement et consulter leur historique de dons

## Étape 4 : effectuer un don test

Avant d'annoncer les dons à votre communauté, vérifiez que tout fonctionne.

1. Effectuez un petit don test pour vérifier que le processus fonctionne de bout en bout
2. Vérifiez que le don apparaît dans B1 Admin, sous Dons

:::tip
Utilisez d'abord le mode test de Stripe si vous souhaitez vérifier sans effectuer de véritables prélèvements, puis passez en mode réel avant d'annoncer les dons à votre communauté.
:::

## Étape 5 : annoncer les dons à votre communauté

Faites savoir à vos membres qu'ils peuvent donner en ligne.

1. Partagez l'URL de dons via votre site web, vos lettres d'information par courriel, vos bulletins et les réseaux sociaux
2. Les membres peuvent également donner via l'[application B1](../../b1-church/giving/index.md) — la fonction de dons y est intégrée

:::info
Les membres connectés peuvent enregistrer leurs moyens de paiement, configurer des dons récurrents et consulter leur historique de dons. Les dons anonymes sont également possibles, sans connexion requise.
:::

## Étape 6 : gestion continue

Tenez vos registres de dons à jour et générez des rapports tout au long de l'année.

1. [Importez les transactions Stripe](../donations/stripe-import.md) régulièrement (chaque semaine ou chaque mois) pour garder vos registres à jour
2. [Consultez les rapports de dons](../donations/donation-reports.md) pour suivre les tendances de dons et les totaux par fonds
3. [Générez les relevés annuels de dons](../donations/giving-statements.md) pour les dossiers fiscaux de vos donateurs

:::tip
Effectuez les importations Stripe au moins une fois par mois afin que vos registres restent à jour. Consultez le [guide des rapports de fin d'année](./year-end-reports.md) pour le processus complet de fin d'année.
:::

## C'est terminé !

Votre église accepte désormais les dons en ligne. Les membres peuvent donner via votre site web, l'application B1 ou tout appareil doté d'un navigateur web. Tous les dons sont automatiquement enregistrés dans B1 Admin.

## Articles connexes

- [Fonds](../donations/funds.md) — créer et gérer les catégories de dons
- [Lots](../donations/batches.md) — regrouper les dons en lots
- [Enregistrer les dons](../donations/recording-donations.md) — saisir manuellement les dons en espèces et par chèque
- [Importation Stripe](../donations/stripe-import.md) — importer les transactions en ligne dans B1 Admin
- [Rapports de dons](../donations/donation-reports.md) — consulter les tendances et les totaux de dons
- [Relevés de dons](../donations/giving-statements.md) — générer les relevés fiscaux annuels
- [Faire un don](../../b1-church/giving/making-donations.md) — l'expérience de don des membres sur B1.church et dans l'application B1
