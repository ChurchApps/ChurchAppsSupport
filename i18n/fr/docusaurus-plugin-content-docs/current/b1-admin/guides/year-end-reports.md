---
title: "Guide : générer les rapports de dons de fin d'année"
---

# Générer les rapports de dons de fin d'année

<div class="article-intro">

Suivez le processus de fin d'année de finalisation de vos enregistrements de dons, de vérification des paramètres de fonds et de génération de relevés de dons déductibles des impôts pour chaque donateur. Ceci est généralement fait en début janvier pour l'année civile précédente.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Compte B1 Admin avec accès financier
- Dons enregistrés tout au long de l'année (en ligne via Stripe et/ou entrée manuelle)
- Accès à votre compte Stripe si vous acceptez les dons en ligne

</div>

## Étape 1 : importer les transactions finales de Stripe

Assurez-vous que tous les dons en ligne de la fin de l'année se trouvent dans votre système.

Suivez le guide [Importation Stripe](../donations/stripe-import.md) pour :

1. Accédez à Dons > Lots > Importation Stripe
2. Sélectionnez une plage de dates couvrant la fin de l'année (par exemple, 1er décembre - 31 décembre)
3. Cliquez d'abord sur Aperçu pour examiner, puis sur Importer les manquants pour finaliser

:::warning
Exécutez cette importation avant de générer les relevés. Toute transaction que vous n'avez pas importée n'apparaîtra pas sur les relevés des donateurs.
:::

## Étape 2 : consulter les rapports de dons

Vérifiez que vos enregistrements sont exacts avant de générer les relevés.

Suivez le guide [Rapports de dons](../donations/donation-reports.md) pour :

1. Consultez la page du résumé des dons pour l'année complète
2. Vérifiez les totaux par fonds et comparez-les avec vos relevés bancaires pour détecter toute divergence
3. Cliquez sur les lots individuels pour vérifier les détails au niveau du donateur, si nécessaire

## Étape 3 : vérifier le statut fiscal des fonds

Assurez-vous que la définition de déductibilité fiscale de chaque fonds est correcte afin que les relevés soient exacts.

Suivez le guide [Fonds](../donations/funds.md) pour :

1. Ouvrez chaque fonds et confirmez que le paramètre de déductibilité fiscale est correct

:::info
Seuls les dons aux fonds marqués comme déductibles des impôts apparaîtront sur les relevés de dons. Si un fonds doit être déductible des impôts mais n'est pas marqué de cette façon, mettez-le à jour avant de générer les relevés.
:::

## Étape 4 : générer les relevés de dons

Créez les relevés de dons officiels pour vos donateurs.

Suivez le guide [Relevés de dons](../donations/giving-statements.md) pour :

1. Accédez à **Dons > Relevés de dons**
2. Sélectionnez l'année dans la liste déroulante et consultez les statistiques du résumé
3. Choisissez votre méthode de téléchargement :
   - **Télécharger ZIP** — fichiers CSV individuels, un par donateur
   - **Tout imprimer** — vue imprimable avec chaque relevé sur une nouvelle page

:::tip
Générez les relevés en début janvier lorsque les enregistrements sont à jour. Cela vous donne le temps de détecter tout problème avant de les envoyer par la poste.
:::

## Étape 5 : distribuer aux donateurs

Mettez les relevés entre les mains de vos donateurs.

1. Imprimez et envoyez par la poste les relevés, ou envoyez les CSV individuels par e-mail aux donateurs
2. Les membres peuvent également consulter leur propre historique de dons et imprimer les relevés à partir de [B1.church](../../b1-church/giving/donation-history.md) et l'[application mobile B1](../../b1-mobile/giving/donation-history.md)

## C'est fini !

Vos rapports de dons de fin d'année sont complets. Les donateurs ont leurs relevés déductibles des impôts et vos enregistrements financiers sont finalisés pour l'année.

## Articles connexes

- [Importation Stripe](../donations/stripe-import.md) — importer les transactions en ligne
- [Rapports de dons](../donations/donation-reports.md) — voir les tendances de dons et les totaux
- [Fonds](../donations/funds.md) — gérer les fonds et les paramètres de déductibilité fiscale
- [Relevés de dons](../donations/giving-statements.md) — générer les relevés de fin d'année
- [Enregistrement des dons](../donations/recording-donations.md) — entrer manuellement les dons en espèces/chèques
- [Historique des dons (Web)](../../b1-church/giving/donation-history.md) — affichage libre-service des membres
- [Guide de configuration des dons en ligne](./online-giving.md) — configuration initiale de Stripe et des dons
