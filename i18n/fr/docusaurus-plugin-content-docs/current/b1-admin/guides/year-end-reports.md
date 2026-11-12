---
title: "Guide : Générer les relevés de dons de fin d'année"
description: "Dans B1 Admin, finalisez les enregistrements de dons de l'année, vérifiez les paramètres fiscaux des fonds et générez les attestations de dons déductibles d'impôt pour chaque donateur."
---

# Générer les relevés de dons de fin d'année

<div class="article-intro">

Suivez le processus de fin d'année : finalisez vos enregistrements de dons, vérifiez les paramètres des fonds et générez les relevés de dons déductibles d'impôt pour chaque donateur. Cette opération se fait généralement début janvier pour l'année civile précédente.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec accès aux finances
- Des dons enregistrés tout au long de l'année (en ligne via Stripe et/ou saisis manuellement)
- Un accès à votre compte Stripe si vous acceptez des dons en ligne

</div>

## Étape 1 : Importer les dernières transactions Stripe {#step-1-import-final-stripe-transactions}

Assurez-vous que tous les dons en ligne de fin d'année figurent dans votre système.

Suivez le guide [Importation Stripe](../donations/stripe-import.md) pour :

1. Dans le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu), choisir **Dons > Importation Stripe** (cette option n'apparaît que lorsque votre fournisseur de dons est Stripe)
2. Définir la **Date de début** et la **Date de fin** pour couvrir la fin de l'année (par exemple du 1er au 31 décembre)
3. Cliquer d'abord sur **Aperçu** pour vérifier, puis sur **Importer les manquants** pour finaliser

:::warning
Lancez cette importation avant de générer les relevés. Les transactions non importées n'apparaîtront pas sur les relevés des donateurs.
:::

## Étape 2 : Vérifier les rapports de dons {#step-2-review-donation-reports}

Vérifiez l'exactitude de vos enregistrements avant de générer les relevés.

Suivez le guide [Rapports de dons](../donations/donation-reports.md) pour :

1. Dans le menu Accès rapide, choisir **Dons > Résumé**, définir la **Date de début** et la **Date de fin** dans **Filtrer le rapport** sur l'année complète, puis cliquer sur **Générer le rapport**
2. Vérifiez les totaux par fonds et comparez-les à vos relevés bancaires pour repérer les écarts. Cliquez sur **Options de téléchargement** et choisissez **Résumé** pour obtenir un fichier CSV
3. Ouvrez les lots individuels sous **Dons > Lots** pour vérifier les détails par donateur si nécessaire

## Étape 3 : Vérifier le statut fiscal des fonds {#step-3-verify-fund-tax-status}

Assurez-vous que le paramètre de déductibilité fiscale de chaque fonds est correct afin que les relevés soient exacts.

Suivez le guide [Fonds](../donations/funds.md) pour :

1. Dans le menu Accès rapide, choisir **Dons > Fonds** et vérifier le **Statut fiscal** de chaque fonds
2. Cliquez sur **Modifier** pour un fonds afin de changer son paramètre **Déductible d'impôt**

:::info
Seuls les dons versés à des fonds marqués comme déductibles d'impôt apparaîtront sur les relevés de dons. Si un fonds devrait être déductible d'impôt sans être marqué comme tel, mettez-le à jour avant de générer les relevés.
:::

## Étape 4 : Générer les relevés de dons {#step-4-generate-giving-statements}

Créez les relevés de dons officiels pour vos donateurs.

Suivez le guide [Relevés de dons](../donations/giving-statements.md) pour :

1. Dans le menu Accès rapide, choisir **Dons > Relevés de dons**
2. Sélectionner l'**Année** et examiner les statistiques récapitulatives. Les églises du Canada, d'Australie ou de Nouvelle-Zélande peuvent cliquer sur **Format du relevé** pour passer à la mise en page officielle de reçu de leur pays
3. Choisissez votre méthode de téléchargement :
   - **Télécharger le ZIP** — fichiers CSV individuels, un par donateur
   - **Tout imprimer** — vue imprimable avec chaque relevé sur une nouvelle page, avec le logo de votre église en haut (si vous en avez téléversé un)

:::tip
Générez les relevés tôt en janvier, pendant que les données sont fraîches. Vous aurez ainsi le temps de corriger d'éventuels problèmes avant de les envoyer.
:::

## Étape 5 : Distribuer aux donateurs {#step-5-distribute-to-donors}

Remettez les relevés à vos donateurs.

1. Imprimez et envoyez les relevés par la poste, ou envoyez par courriel les fichiers CSV individuels aux donateurs
2. Les membres peuvent aussi consulter leur historique de dons et imprimer leurs relevés sur [B1.church ou dans l'application B1](../../b1-church/giving/donation-history.md)

## C'est terminé ! {#youre-done}

Vos relevés de dons de fin d'année sont prêts. Les donateurs disposent de leurs relevés déductibles d'impôt, et vos registres financiers sont finalisés pour l'année.

## Articles connexes {#related-articles}

- [Importation Stripe](../donations/stripe-import.md) — importer les transactions en ligne
- [Rapports de dons](../donations/donation-reports.md) — consulter les tendances et les totaux des dons
- [Fonds](../donations/funds.md) — gérer les fonds et les paramètres de déductibilité fiscale
- [Relevés de dons](../donations/giving-statements.md) — générer les relevés de fin d'année
- [Enregistrer des dons](../donations/recording-donations.md) — saisir manuellement les dons en espèces ou par chèque
- [Historique des dons (web)](../../b1-church/giving/donation-history.md) — vue en libre-service pour les membres
- [Guide de configuration des dons en ligne](./online-giving.md) — configuration initiale de Stripe et des dons
