---
title: "Lots de dons"
---

# Lots de dons

<div class="article-intro">

Les lots regroupent vos dons pour faciliter le suivi et le rapprochement. Un lot typique représente une seule collecte, comme une offrande du dimanche ou un événement spécial. Utiliser des lots vous aide à rester organisé et permet de vérifier facilement que vos registres correspondent aux dépôts réels.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous d'avoir [configuré vos fonds](funds.md) afin qu'ils soient disponibles lors de l'enregistrement des dons
- Vous devez avoir l'autorisation **Voir les sommaires de dons**, **Modifier les dons** ou **Saisir les dons** pour voir la page des lots (voir [Qui peut modifier un lot](#who-can-change-a-batch))

</div>

## La page des lots

Lorsque vous accédez à **Dons > Lots**, vous voyez une liste de vos lots. Chaque ligne affiche :

- **Nom** -- l'étiquette que vous avez donnée au lot
- **Date** -- la date de la collecte
- **Dons** -- le nombre de dons individuels dans le lot
- **Total** -- le montant total en dollars
- **Statut** -- **Ouvert** ou **Fermé** (voir [Fermer et rouvrir un lot](#closing-and-reopening-a-batch))

Au-dessus de la liste, des boutons d'année vous permettent d'afficher uniquement les lots d'une année, ou **Tous** les lots. Un résumé d'une ligne indique le nombre de lots, le nombre de dons et le montant total pour les lots affichés.

## Créer un nouveau lot

1. Cliquez sur **Ajouter un lot** en haut de la page.
2. Saisissez un nom descriptif (par exemple « Offrande du dimanche - 9 févr. »).
3. Sélectionnez la date de la collecte.
4. Cliquez sur **Enregistrer**.

Votre nouveau lot apparaît dans la liste, prêt à recevoir des dons.

## Travailler avec les lots

- **Voir les dons** -- cliquez sur le nom d'un lot pour l'ouvrir et voir tous les dons individuels qu'il contient. De là, vous pouvez ajouter, modifier ou retirer des dons, ou cliquer sur **Importer un CSV** pour ajouter de nombreux dons en une fois à partir d'un tableur (voir [Importer des dons depuis un fichier CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Modifier les détails du lot** -- cliquez sur le bouton **Modifier** sur la ligne d'un lot pour changer son nom ou sa date. Seules les personnes disposant de l'autorisation **Modifier les dons** peuvent supprimer un lot.
- **Trier** -- utilisez les en-têtes de colonnes pour trier les lots par nom ou par date.
- **Exporter** -- cliquez sur **Exporter** en haut de la page pour télécharger les lots affichés sous forme de tableur (CSV).
- **Événements en échec** -- si votre passerelle de paiement a signalé des problèmes, un bouton **Événements en échec** (avec le nombre d'événements non résolus) apparaît en haut de la page. Cliquez dessus pour afficher ou masquer la liste des événements sous les lots.
- **Importer depuis Stripe** -- cliquez sur **Importer les transactions Stripe manquantes** en haut de la page pour ouvrir l'outil [Importation Stripe](stripe-import.md).

## Fermer et rouvrir un lot {#closing-and-reopening-a-batch}

Une fois qu'un lot a été compté et déposé, fermez-le afin que ses dons restent exactement tels qu'ils étaient lors de la fermeture.

1. Ouvrez le lot.
2. Cliquez sur **Fermer le lot** en haut de la page.

L'étiquette de statut à côté du nom du lot passe de **Ouvert** à **Fermé**, le lot affiche **Fermé** dans la colonne **Statut** de la page Lots, et un avis en haut du lot indique qu'il est fermé. Pendant qu'un lot est fermé, les personnes disposant de l'autorisation **Saisir les dons** peuvent toujours le consulter, mais elles ne peuvent pas ajouter, modifier ou supprimer ses dons, ni modifier le nom ou la date du lot.

Pour apporter à nouveau des modifications, ouvrez le lot et cliquez sur **Rouvrir le lot**. Les nouveaux lots commencent toujours ouverts.

:::info
Seules les personnes disposant de l'autorisation **Modifier les dons** voient les boutons **Fermer le lot** et **Rouvrir le lot**. Elles peuvent aussi modifier les dons d'un lot fermé si une correction est nécessaire, sans le rouvrir.
:::

## Qui peut modifier un lot {#who-can-change-a-batch}

Deux [autorisations de rôle](../settings/roles-permissions.md) permettent à quelqu'un de travailler avec les lots :

- **Modifier les dons** -- accès complet : ajouter et supprimer des lots, les fermer et les rouvrir, et ajouter, modifier ou supprimer n'importe quel don, que le lot soit ouvert ou fermé.
- **Saisir les dons** -- pour les équipes de comptage et les bénévoles qui saisissent les offrandes. Ils peuvent ajouter des lots et ajouter, modifier ou supprimer des dons, mais uniquement lorsque le lot est ouvert. Ils ne peuvent pas supprimer les lots, les fermer ou les rouvrir, ni modifier les dons reçus par les dons en ligne.

Une personne disposant de **Saisir les dons** mais pas de **Voir les sommaires de dons** voit **Dons** dans le menu de B1 Admin, qui mène directement à la page des lots. **Sommaire**, **Fonds**, **Campagnes** et **Relevés de dons** lui restent masqués. Pour ouvrir un lot et voir les dons qu'il contient, le rôle doit aussi avoir **Voir les dons**.

:::tip
Une configuration courante consiste à créer un rôle « Équipe de comptage » avec **Saisir les dons** et **Voir les dons**, et un trésorier avec **Modifier les dons** qui ferme chaque lot une fois le dépôt rapproché.
:::

## Imprimer un lot

Ouvrez un lot et cliquez sur **Imprimer** au-dessus de la liste des dons pour imprimer une copie papier destinée à votre équipe de comptage ou à vos dossiers de dépôt. L'impression comprend :

- L'en-tête officiel de votre église -- votre logo (le **Logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de votre église en dessous -- puis le nom du lot et la date du lot
- Chaque don du lot, avec le nom du donateur, le mode de paiement, les notes, la date et le montant (les dons remboursés sont barrés et marqués comme remboursés)
- **Sous-totaux par fonds** -- le total donné à chaque fonds dans le lot
- **Total du lot** -- le montant combiné pour l'ensemble du lot

Le bouton **Imprimer** n'apparaît que lorsque le lot contient au moins un don.

### Imprimer plusieurs lots à la fois

Pour imprimer tous les lots d'une période en une seule fois -- par exemple, tous les dépôts du mois dernier -- cliquez sur **Imprimer** en haut de la page **Lots**, à côté d'**Exporter**. La page **Imprimer les lots** s'ouvre avec une **Date de début** et une **Date de fin** qui correspondent aux lots affichés à l'écran : du 1er janvier au 31 décembre de l'année choisie, ou de la date de lot la plus ancienne à la plus récente lorsque **Tous** est sélectionné. Modifiez l'une ou l'autre date pour choisir une autre plage.

Chaque lot daté dans la plage (y compris les dates de début et de fin) s'imprime dans l'ordre chronologique, un lot par page, selon la même mise en page qu'une impression d'un seul lot. Les lots sans dons sont exclus, et si aucun lot de la plage ne contient de dons, vous verrez le message « Aucun lot avec des dons dans cette plage de dates. » Cliquez sur **Imprimer** pour ouvrir la boîte de dialogue d'impression de votre navigateur, ou sur **Fermer** pour revenir à la liste des lots.

## Exporter un lot vers QuickBooks Online

Ouvrez un lot et cliquez sur **Exporter pour QuickBooks** pour télécharger le lot sous forme d'écriture de journal que QuickBooks Online peut importer (**Paramètres > Importer des données > Écritures de journal**). Le fichier contient un débit vers **Fonds non déposés** pour le total du lot, et un crédit par fonds, en utilisant le nom de chaque fonds comme nom de compte. QuickBooks vous demande de faire correspondre ces noms à votre plan comptable lors de l'importation ; nommez donc vos fonds comme votre comptable nomme les comptes de revenus, ou faites la correspondance une fois lors de l'importation.

:::tip
Nommez vos lots de façon cohérente pour les retrouver facilement plus tard. Inclure la date et le type de collecte (par exemple « Matin du dimanche - 2025-02-09 ») garde votre liste organisée à mesure qu'elle s'allonge.
:::

## Étapes suivantes

Une fois que vous avez un lot, consultez [Enregistrer des dons](recording-donations.md) pour apprendre à y ajouter des dons individuels. Vous pouvez aussi [importer des transactions Stripe](stripe-import.md) pour créer automatiquement des lots à partir des dons en ligne.
