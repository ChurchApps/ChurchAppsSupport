---
title: "Guide : Générer les relevés de dons de fin d'année"
description: "Dans B1 Admin, finalisez les enregistrements de dons de l'année, vérifiez les paramètres fiscaux des fonds et générez les relevés de dons déductibles d'impôt pour chaque donateur."
---

# Générer les relevés de dons de fin d'année

<div class="article-intro">

Suivez le processus de fin d'année pour finaliser vos enregistrements de dons, vérifier les paramètres des fonds et générer les relevés de dons déductibles d'impôt pour chaque donateur. Cette opération se fait généralement début janvier pour l'année civile précédente.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec accès aux finances
- Des dons enregistrés tout au long de l'année (en ligne via Stripe et/ou saisis manuellement)
- Un accès à votre compte Stripe si vous acceptez les dons en ligne

</div>

## Étape 1 : Importer les dernières transactions Stripe

Assurez-vous que tous les dons en ligne de la fin de l'année sont présents dans votre système.

Suivez le guide [Importation Stripe](../donations/stripe-import.md) pour :

1. Accéder à Dons > Importation Stripe
2. Sélectionner une plage de dates couvrant la fin de l'année (par exemple, du 1er au 31 décembre)
3. Cliquer d'abord sur Aperçu pour vérifier, puis sur Importer les manquants pour finaliser

:::warning
Effectuez cette importation avant de générer les relevés. Les transactions non importées n'apparaîtront pas sur les relevés des donateurs.
:::

## Étape 2 : Examiner les rapports de dons

Vérifiez l'exactitude de vos enregistrements avant de générer les relevés.

Suivez le guide [Rapports de dons](../donations/donation-reports.md) pour :

1. Consulter la page de synthèse des dons pour l'année complète
2. Examiner les totaux par fonds et les comparer à vos relevés bancaires afin de repérer d'éventuels écarts
3. Cliquer sur les lots individuels pour vérifier, si nécessaire, les détails par donateur

## Étape 3 : Vérifier le statut fiscal des fonds

Assurez-vous que le paramètre de déductibilité fiscale de chaque fonds est correct afin que les relevés soient exacts.

Suivez le guide [Fonds](../donations/funds.md) pour :

1. Ouvrir chaque fonds et confirmer que le paramètre de déductibilité fiscale est correct

:::info
Seuls les dons versés à des fonds marqués comme déductibles d'impôt apparaîtront sur les relevés de dons. Si un fonds devrait être déductible d'impôt sans être marqué ainsi, mettez-le à jour avant de générer les relevés.
:::

## Étape 4 : Générer les relevés de dons

Créez les relevés de dons officiels pour vos donateurs.

Suivez le guide [Relevés de dons](../donations/giving-statements.md) pour :

1. Accéder à **Dons > Relevés de dons**
2. Sélectionner l'année dans la liste déroulante et examiner les statistiques récapitulatives
3. Choisir votre méthode de téléchargement :
   - **Télécharger le ZIP** — fichiers CSV individuels, un par donateur
   - **Tout imprimer** — vue imprimable avec chaque relevé sur une page distincte, avec le logo de votre église en haut (si vous en avez téléchargé un)

:::tip
Générez les relevés tôt en janvier, tant que les données sont fraîches. Cela vous laisse le temps de corriger les éventuels problèmes avant de les envoyer.
:::

## Étape 5 : Distribuer aux donateurs

Faites parvenir les relevés entre les mains de vos donateurs.

1. Imprimez et envoyez les relevés par courrier, ou envoyez les fichiers CSV individuels par e-mail aux donateurs
2. Les membres peuvent également consulter leur historique de dons et imprimer leurs relevés sur [B1.church ou dans l'application B1](../../b1-church/giving/donation-history.md)

## Terminé !

Vos relevés de dons de fin d'année sont prêts. Les donateurs disposent de leurs relevés déductibles d'impôt, et vos registres financiers sont finalisés pour l'année.

## Articles connexes

- [Importation Stripe](../donations/stripe-import.md) — importer les transactions en ligne
- [Rapports de dons](../donations/donation-reports.md) — consulter les tendances et les totaux des dons
- [Fonds](../donations/funds.md) — gérer les fonds et les paramètres de déductibilité fiscale
- [Relevés de dons](../donations/giving-statements.md) — générer les relevés de fin d'année
- [Enregistrer des dons](../donations/recording-donations.md) — saisir manuellement les dons en espèces ou par chèque
- [Historique des dons (Web)](../../b1-church/giving/donation-history.md) — vue en libre-service pour les membres
- [Guide : Configurer les dons en ligne](./online-giving.md) — configuration initiale de Stripe et des dons
