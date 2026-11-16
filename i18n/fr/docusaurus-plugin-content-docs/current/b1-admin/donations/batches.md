---
title: "Lots de dons"
description: "Regroupez les offrandes en lots de dons dans B1 Admin, puis fermez, imprimez ou exportez chacun d'eux afin que les totaux correspondent à vos dépôts bancaires."
---

# Lots de dons {#donation-batches}

<div class="article-intro">

Les lots regroupent vos dons pour faciliter le suivi et le rapprochement. Un lot type correspond à une seule collecte, comme une offrande du dimanche ou un événement spécial. Utiliser des lots vous aide à rester organisé et permet de vérifier simplement que vos registres correspondent aux dépôts réels.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous d'avoir [configuré vos fonds](funds.md) pour qu'ils soient disponibles lors de l'enregistrement des dons
- Vous aurez besoin de l'autorisation **Consulter les résumés des dons**, **Modifier les dons** ou **Saisir des dons** pour voir la page Lots (voir [Qui peut modifier un lot](#who-can-change-a-batch))

</div>

## La page Lots {#the-batches-page}

Lorsque vous accédez à **Dons > Lots**, vous voyez la liste de vos lots. Chaque ligne affiche :

- **Nom** -- l'étiquette que vous avez donnée au lot
- **Date** -- la date de la collecte
- **Dons** -- le nombre de dons individuels dans le lot
- **Total** -- le montant total en dollars
- **Statut** -- **Ouvert** ou **Fermé** (voir [Fermer et rouvrir un lot](#closing-and-reopening-a-batch))

Au-dessus de la liste, des boutons d'année vous permettent d'afficher uniquement les lots d'une année, ou **Tous** les lots. À côté, les boutons de statut -- **Tous**, **Ouvert** et **Fermé** -- restreignent la liste aux lots encore en cours ou à ceux que vous avez terminés. Les deux filtres se combinent : vous pouvez choisir **2026** et **Ouvert** pour voir les lots ouverts de cette année. Un résumé sur une ligne indique le nombre de lots, le nombre de dons et le montant total des lots affichés.

## Créer un nouveau lot {#creating-a-new-batch}

1. Cliquez sur **Ajouter un lot** en haut de la page.
2. Saisissez un nom descriptif (par exemple « Offrande du dimanche - 9 févr. »). Le nom est facultatif, mais un nom clair facilite la recherche du lot plus tard.
3. Sélectionnez la date de la collecte. Elle commence à la date du jour.
4. Cliquez sur **Enregistrer**.

Votre nouveau lot apparaît dans la liste, prêt à recevoir des dons.

## Travailler avec les lots {#working-with-batches}

- **Consulter les dons** -- cliquez sur le nom d'un lot pour l'ouvrir et voir tous les dons individuels qu'il contient. Vous pouvez ensuite ajouter, modifier ou supprimer des dons, ou cliquer sur **Importer un CSV** pour ajouter de nombreux dons en une fois depuis un tableur (voir [Importer des dons depuis un fichier CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Modifier les détails du lot** -- cliquez sur le bouton **Modifier** sur la ligne d'un lot (ou sur **Modifier le lot** en haut d'un lot ouvert) pour changer son nom ou sa date. Seules les personnes disposant de l'autorisation **Modifier les dons** voient le bouton **Supprimer** à cet endroit ; supprimer un lot retire les dons qu'il contient, et si vous le supprimez depuis sa propre page, vous revenez à la liste des lots.
- **Trier** -- utilisez les en-têtes de colonnes pour trier les lots par nom ou par date.
- **Exporter** -- cliquez sur **Exporter** en haut de la page pour télécharger les lots affichés sous forme de tableur (CSV).
- **Événements en échec** -- si votre passerelle de paiement a signalé des problèmes, un bouton **Événements en échec** (avec le nombre d'événements non résolus) apparaît en haut de la page. Cliquez dessus pour afficher ou masquer la liste des événements sous les lots.
- **Importer depuis Stripe** -- cliquez sur **Importer les transactions Stripe manquantes** en haut de la page pour ouvrir l'outil [Importation Stripe](stripe-import.md). Ce bouton n'apparaît que lorsque la passerelle de dons de votre église est Stripe.

## Qui a saisi chaque don {#who-entered-each-gift}

Chaque don saisi dans un lot affiche **Saisi par** et le nom de la personne sous le nom du donateur, afin que vous sachiez qui l'a saisi sans feuille de signatures. B1 l'enregistre automatiquement à partir de la personne connectée, et modifier le don par la suite ne change pas cette information. Les dons importés avec **Importer un CSV** affichent la personne qui a lancé l'importation.

Les dons en ligne, les dons ajoutés par l'outil [Importation Stripe](stripe-import.md) et les dons saisis avant l'ajout de cette fonctionnalité en novembre 2026 n'affichent pas de nom.

## Fermer et rouvrir un lot {#closing-and-reopening-a-batch}

Une fois qu'un lot a été compté et déposé, fermez-le pour que ses dons restent exactement tels qu'ils étaient à sa fermeture.

1. Ouvrez le lot.
2. Cliquez sur **Fermer le lot** en haut de la page.

L'étiquette de statut à côté du nom du lot passe de **Ouvert** à **Fermé**, le lot affiche **Fermé** dans la colonne **Statut** de la page Lots, et un avis en haut du lot indique qu'il est fermé. Tant qu'un lot est fermé, les personnes disposant de l'autorisation **Saisir des dons** peuvent encore le consulter, mais elles ne peuvent ni ajouter, ni modifier, ni supprimer ses dons, ni changer son nom ou sa date.

Pour apporter à nouveau des modifications, ouvrez le lot et cliquez sur **Rouvrir le lot**. Les nouveaux lots commencent toujours ouverts.

:::info
Seules les personnes disposant de l'autorisation **Modifier les dons** voient les boutons **Fermer le lot** et **Rouvrir le lot**. Elles peuvent aussi modifier les dons d'un lot fermé si une correction est nécessaire, sans le rouvrir.
:::

## Qui peut modifier un lot {#who-can-change-a-batch}

Deux [autorisations de rôle](../settings/roles-permissions.md) permettent de travailler sur les lots :

- **Modifier les dons** -- accès complet : ajouter et supprimer des lots, les fermer et les rouvrir, et ajouter, modifier ou supprimer n'importe quel don, que le lot soit ouvert ou fermé.
- **Saisir des dons** -- pour les équipes de comptage et les bénévoles qui saisissent les offrandes. Ils peuvent ajouter des lots et ajouter, modifier ou supprimer des dons, mais uniquement lorsque le lot est ouvert. Ils ne peuvent pas supprimer de lots, les fermer ou les rouvrir, ni modifier les dons reçus par les dons en ligne.

Une personne qui dispose de **Saisir des dons** sans **Consulter les résumés des dons** voit **Dons** dans le menu de B1 Admin, qui mène directement à la page Lots. **Résumé**, **Fonds**, **Campagnes** et **Relevés de dons** restent masqués pour elle. Pour ouvrir un lot et voir les dons qu'il contient, le rôle doit aussi disposer de **Consulter les dons**.

:::tip
Une configuration courante consiste à créer un rôle « Équipe de comptage » avec **Saisir des dons** et **Consulter les dons**, et à donner à un trésorier l'autorisation **Modifier les dons** pour qu'il ferme chaque lot une fois le dépôt rapproché.
:::

## Imprimer un lot {#printing-a-batch}

Ouvrez un lot et cliquez sur **Imprimer** au-dessus de la liste des dons pour imprimer une copie papier destinée à votre équipe de comptage ou à vos registres de dépôt. L'impression comprend :

- L'en-tête de votre église -- votre logo (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un), avec le nom de votre église en dessous -- puis le nom du lot et la date du lot
- Chaque don du lot, avec le nom du donateur, la personne qui l'a saisi, le mode de paiement, les notes, la date et le montant (les dons remboursés sont barrés et marqués comme remboursés)
- **Sous-totaux par fonds** -- le total donné à chaque fonds dans le lot
- **Total du lot** -- le montant total de l'ensemble du lot

Le bouton **Imprimer** n'apparaît que lorsque le lot contient au moins un don.

### Imprimer plusieurs lots à la fois {#printing-several-batches-at-once}

Pour imprimer en une seule fois tous les lots d'une période -- par exemple tous les dépôts du mois dernier -- cliquez sur **Imprimer** en haut de la page **Lots**, à côté de **Exporter**. La page **Imprimer les lots** s'ouvre avec une **Date de début** et une **Date de fin** qui correspondent aux lots affichés à l'écran : du 1er janvier au 31 décembre de l'année choisie, ou de la date du plus ancien à celle du plus récent lot lorsque **Tous** est sélectionné. Modifiez l'une de ces dates pour choisir une autre période.

Chaque lot daté dans la période (y compris les dates de début et de fin) s'imprime dans l'ordre chronologique, un lot par page, selon la même mise en page qu'une impression d'un seul lot. Les lots sans dons sont exclus ; si aucun lot de la période ne contient de dons, vous verrez le message « Aucun lot avec des dons dans cette période. ». Cliquez sur **Imprimer** pour ouvrir la boîte de dialogue d'impression de votre navigateur, ou sur **Fermer** pour revenir à la liste des lots.

## Exporter un lot vers QuickBooks Online {#exporting-a-batch-to-quickbooks-online}

Ouvrez un lot et cliquez sur **Exporter pour QuickBooks** pour télécharger le lot sous forme d'écriture de journal que QuickBooks Online peut importer (**Paramètres > Importer des données > Écritures de journal**). Le fichier contient un débit au compte **Fonds non déposés** pour le total du lot, et un crédit par fonds, en utilisant le nom de chaque fonds comme nom de compte. QuickBooks vous demande de faire correspondre ces noms à votre plan comptable lors de l'importation ; nommez donc vos fonds comme votre comptable nomme les comptes de revenus, ou établissez la correspondance une seule fois lors de l'importation.

:::tip
Nommez vos lots de façon cohérente pour les retrouver facilement plus tard. Inclure la date et le type de collecte (par exemple « Dimanche matin - 2025-02-09 ») garde votre liste organisée à mesure qu'elle s'allonge.
:::

## Étapes suivantes {#next-steps}

Une fois que vous avez un lot, consultez [Enregistrer des dons](recording-donations.md) pour apprendre à y ajouter des dons individuels. Vous pouvez aussi [importer les transactions Stripe](stripe-import.md) pour créer automatiquement des lots à partir des dons en ligne.
