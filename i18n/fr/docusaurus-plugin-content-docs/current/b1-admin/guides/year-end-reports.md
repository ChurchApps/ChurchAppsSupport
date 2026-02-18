---
title: "Guide : Générer les rapports de dons de fin d'année"
---

# Générer les rapports de dons de fin d'année

<div class="article-intro">

Parcourez le processus de fin d'année pour finaliser vos enregistrements de dons, vérifier les paramètres des fonds et générer les relevés de dons déductibles des impôts pour chaque donateur. Cette procédure est généralement réalisée début janvier pour l'année civile précédente.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec un accès financier
- Des dons enregistrés tout au long de l'année (en ligne via Stripe et/ou saisis manuellement)
- Un accès à votre compte Stripe si vous acceptez les dons en ligne

</div>

## Étape 1 : Importer les dernières transactions Stripe

Assurez-vous que tous les dons en ligne de fin d'année sont bien dans votre système.

Suivez le guide [Import Stripe](../donations/stripe-import.md) pour :

1. Accéder à Dons > Lots > Import Stripe
2. Sélectionner une plage de dates couvrant la fin de l'année (par ex. 1er décembre - 31 décembre)
3. Cliquer d'abord sur Aperçu pour vérifier, puis sur Importer les manquants pour finaliser

:::warning
Exécutez cet import avant de générer les relevés. Toute transaction non importée n'apparaîtra pas sur les relevés des donateurs.
:::

## Étape 2 : Vérifier les rapports de dons

Vérifiez l'exactitude de vos enregistrements avant de générer les relevés.

Suivez le guide [Rapports de dons](../donations/donation-reports.md) pour :

1. Consulter la page de synthèse des dons pour l'année complète
2. Vérifier les totaux par fonds et les comparer avec vos relevés bancaires pour détecter tout écart
3. Cliquer sur les lots individuels pour vérifier les détails au niveau des donateurs si nécessaire

## Étape 3 : Vérifier le statut fiscal des fonds

Assurez-vous que le paramètre de déductibilité fiscale de chaque fonds est correct afin que les relevés soient exacts.

Suivez le guide [Fonds](../donations/funds.md) pour :

1. Ouvrir chaque fonds et confirmer que le paramètre de déductibilité fiscale est correct

:::info
Seuls les dons aux fonds marqués comme déductibles des impôts apparaîtront sur les relevés de dons. Si un fonds devrait être déductible mais n'est pas marqué comme tel, mettez-le à jour avant de générer les relevés.
:::

## Étape 4 : Générer les relevés de dons

Créez les relevés de dons officiels pour vos donateurs.

Suivez le guide [Relevés de dons](../donations/giving-statements.md) pour :

1. Accéder à Dons > Relevés
2. Sélectionner l'année dans le menu déroulant et consulter les statistiques récapitulatives
3. Choisir votre méthode de téléchargement :
   - **Télécharger ZIP** -- fichiers CSV individuels, un par donateur
   - **Tout imprimer** -- vue imprimable avec chaque relevé sur une nouvelle page

:::tip
Générez les relevés dès le début du mois de janvier, tant que les enregistrements sont récents. Cela vous laisse le temps de détecter d'éventuels problèmes avant de les envoyer.
:::

## Étape 5 : Distribuer aux donateurs

Transmettez les relevés à vos donateurs.

1. Imprimez et envoyez les relevés par courrier, ou envoyez les fichiers CSV individuels par e-mail aux donateurs
2. Les membres peuvent également consulter leur propre historique de dons et imprimer leurs relevés depuis [B1.church](../../b1-church/giving/donation-history.md) et l'[application B1 Mobile](../../b1-mobile/giving/donation-history.md)

## C'est terminé !

Vos rapports de dons de fin d'année sont complets. Les donateurs disposent de leurs relevés déductibles des impôts, et vos enregistrements financiers sont finalisés pour l'année.

## Articles connexes

- [Import Stripe](../donations/stripe-import.md) -- importer les transactions en ligne
- [Rapports de dons](../donations/donation-reports.md) -- consulter les tendances et les totaux des dons
- [Fonds](../donations/funds.md) -- gérer les fonds et les paramètres de déductibilité fiscale
- [Relevés de dons](../donations/giving-statements.md) -- générer les relevés de fin d'année
- [Enregistrement des dons](../donations/recording-donations.md) -- saisir manuellement les dons en espèces/chèques
- [Historique des dons (Web)](../../b1-church/giving/donation-history.md) -- vue en libre-service pour les membres
- [Guide de configuration des dons en ligne](./online-giving.md) -- configuration initiale de Stripe et des dons
