---
title: "Guide : Configurer les dons en ligne"
description: "Configurez les dons en ligne dans B1 Admin en créant des fonds de dons, en connectant Stripe et en ajoutant une page de dons à votre site B1.church pour les membres."
---

# Configurer les dons en ligne

<div class="article-intro">

Parcourez tout ce qu'il faut pour accepter les dons en ligne dans votre église -- de la création des fonds de dons à la connexion de Stripe pour le traitement des paiements, jusqu'au partage de la page de dons avec votre communauté. Au terme de ce guide, les membres pourront donner en ligne par votre site web et votre application mobile.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec un accès administrateur -- voir [Rôles et autorisations](../people/roles-permissions.md)
- Un compte Stripe (créez-en un gratuitement sur [stripe.com](https://stripe.com) si nécessaire)

</div>

## Étape 1 : Créer les fonds de dons {#step-1-create-donation-funds}

Les fonds sont les catégories auxquelles les donateurs peuvent donner. Vous devez avoir au moins un fonds avant de pouvoir accepter des dons.

Suivez le guide [Fonds](../donations/funds.md) pour configurer vos catégories de dons :

1. Dans le [menu Jump](../introduction.md#getting-around-with-the-jump-menu), choisissez **Dons > Fonds** et cliquez sur **Ajouter un fonds**
2. Créez vos fonds les plus courants (par exemple « Fonds général », « Fonds de construction », « Missions »)
3. Cochez **Déductible d'impôt** pour les fonds dont les dons doivent figurer sur les relevés de fin d'année, et laissez **Visible pour les donateurs** cochée pour les fonds que les donateurs doivent pouvoir choisir en ligne

:::tip
Vous pouvez ajouter d'autres fonds à tout moment. Commencez par vos catégories de dons les plus courantes.
:::

## Étape 2 : Connecter Stripe {#step-2-connect-stripe}

Stripe gère tout le traitement des paiements. Vous connecterez votre compte Stripe à B1 Admin afin que les dons soient versés sur votre compte bancaire.

Suivez le guide [Configuration des dons en ligne](../donations/online-giving-setup.md) pour connecter Stripe :

1. Connectez-vous à votre tableau de bord Stripe et accédez à **Développeurs > Clés API** pour trouver votre Clé publiable et votre Clé secrète
2. Dans B1 Admin, allez dans **Paramètres**, cliquez sur **Modifier** dans la section **Dons**, et réglez le **Fournisseur** sur **Stripe**
3. Collez la Clé publiable dans **Clé publique** et la Clé secrète dans **Clé secrète**, vérifiez la **Devise**, puis cliquez sur **Enregistrer**

B1 prend aussi en charge **Kingdom Funding** et **Paystack** (pour les églises d'Afrique) comme fournisseurs de dons -- consultez la [Configuration des dons en ligne](../donations/online-giving-setup.md).

:::warning
Stripe n'affiche votre Clé secrète qu'une seule fois. Copiez-la et enregistrez-la avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez en générer une nouvelle.
:::

## Étape 3 : Ajouter une page de dons à votre site web {#step-3-add-a-giving-page-to-your-website}

Rendez le don accessible en ajoutant une page de dons à votre site B1.

Suivez les guides [Configuration des dons en ligne](../donations/online-giving-setup.md) et [Gérer les pages](../website/managing-pages.md) pour :

1. Ajouter un onglet **Don** à votre site B1.church (ou un élément **Don** à une page dans le générateur de site web)
2. Votre adresse de dons sera : `https://yoursubdomain.b1.church/donate`
3. Les membres peuvent donner sans se connecter (page publique) ou se connecter pour enregistrer leurs modes de paiement et consulter leur historique de dons
4. Pour diriger les donateurs directement vers un fonds, cliquez sur **Lien de don** pour ce fonds dans **Dons > Fonds** afin de copier un lien (ou de télécharger un code QR) avec le fonds et le montant préremplis

## Étape 4 : Effectuer un don test {#step-4-make-a-test-donation}

Avant d'annoncer les dons à votre communauté, vérifiez que tout fonctionne.

1. Effectuez un petit don test pour vérifier que le parcours fonctionne de bout en bout
2. Vérifiez que le don apparaît dans B1 Admin, sous **Dons > Lots**

:::tip
Pour tester sans véritables débits, vous pouvez d'abord enregistrer les clés de test de Stripe, puis les remplacer par vos clés de production dans **Paramètres > Dons** avant d'annoncer les dons à votre communauté.
:::

## Étape 5 : Annoncer les dons à votre communauté {#step-5-announce-to-your-congregation}

Faites connaître la nouvelle option afin que les membres sachent qu'ils peuvent donner en ligne.

1. Partagez l'adresse de dons par votre site web, vos infolettres, vos feuillets et les réseaux sociaux
2. Les membres peuvent aussi donner par l'[application B1](../../b1-church/giving/index.md) -- la fonction de dons y est intégrée

:::info
Les membres connectés peuvent enregistrer des modes de paiement, configurer des dons récurrents et consulter leur historique de dons. Les dons anonymes fonctionnent aussi -- aucune connexion requise.
:::

## Étape 6 : Gestion continue {#step-6-ongoing-management}

Gardez vos registres de dons à jour et produisez des rapports tout au long de l'année.

1. Les dons en ligne sont enregistrés automatiquement. Utilisez l'[Importation Stripe](../donations/stripe-import.md) pour récupérer les transactions Stripe qui ne se seraient pas synchronisées -- cliquez sur **Aperçu** pour voir ce qui manque, puis sur **Importer les manquantes**
2. [Consultez les rapports de dons](../donations/donation-reports.md) sous **Dons > Résumé** pour suivre les tendances et les totaux de dons par fonds
3. Consultez **Dons > Dons échoués** pour les dons récurrents dont la carte a été refusée, et cliquez sur **Réessayer** une fois que le donateur a mis à jour son mode de paiement
4. [Générez les relevés de dons de fin d'année](../donations/giving-statements.md) pour les dossiers fiscaux de vos donateurs

:::tip
Effectuez un aperçu de l'Importation Stripe avant de clôturer chaque mois afin que vos registres correspondent à Stripe. Consultez le [Guide des rapports de fin d'année](./year-end-reports.md) pour le processus complet de fin d'année.
:::

## Terminé ! {#youre-done}

Votre église accepte maintenant les dons en ligne. Les membres peuvent donner par votre site web, l'application B1 ou tout appareil doté d'un navigateur web. Tous les dons sont automatiquement suivis dans B1 Admin.

## Articles connexes {#related-articles}

- [Fonds](../donations/funds.md) — créer et gérer les catégories de dons
- [Lots](../donations/batches.md) — regrouper les dons
- [Enregistrer des dons](../donations/recording-donations.md) — saisir manuellement les dons en espèces et par chèque
- [Importation Stripe](../donations/stripe-import.md) — importer les transactions en ligne dans B1 Admin
- [Rapports sur les dons](../donations/donation-reports.md) — consulter les tendances et les totaux de dons
- [Relevés de dons](../donations/giving-statements.md) — générer les relevés fiscaux de fin d'année
- [Faire un don](../../b1-church/giving/making-donations.md) — l'expérience de don des membres sur B1.church et dans l'application B1
