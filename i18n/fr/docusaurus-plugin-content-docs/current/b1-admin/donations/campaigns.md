---
title: "Campagnes et engagements"
description: "Créez des campagnes de collecte de fonds dans B1 Admin, enregistrez les engagements des membres et suivez la progression vers un objectif par rapport aux dons réels versés à chaque fonds."
---

# Campagnes et engagements

<div class="article-intro">

Les campagnes vous permettent de mener une collecte de fonds vers un objectif précis -- un fonds de construction, un voyage missionnaire, un projet spécial -- et de suivre les engagements des membres en parallèle des dons réels, afin de voir votre progression en temps réel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de dons](./funds.md) -- chaque campagne est liée à un fonds
- Vous devez disposer de l'autorisation **Consulter les résumés des dons** pour voir les campagnes, et de **Modifier les dons** pour ajouter ou modifier des campagnes et des engagements

</div>

## Ouvrir les campagnes {#opening-campaigns}

Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Dons** et cliquez sur **Campagnes**. Vous verrez un tableau de toutes les campagnes avec leur fonds, leurs dates, leur montant objectif, le total des engagements et le total donné à ce jour. Une ligne de résumé au-dessus du tableau indique le nombre de campagnes ainsi que les montants cumulés des engagements et des dons.

## Créer une campagne {#creating-a-campaign}

1. Cliquez sur **Ajouter une campagne** en haut de la page.
2. Remplissez les détails de la campagne :
   - **Nom** *(obligatoire)* — le nom affiché de cette campagne (par exemple « Fonds de construction 2026 »).
   - **Fonds** *(obligatoire)* — le fonds de dons auquel cette campagne est associée.
   - **Montant objectif** *(facultatif)* — le montant visé pour la campagne. Sans objectif, la campagne n'affiche aucune barre de progression.
   - **Date de début** *(obligatoire, commence aujourd'hui)* et **Date de fin** *(facultatif)* — la période de collecte. Sans date de fin, la campagne s'affiche comme **En cours**.
   - **Description** — une courte description de la campagne.
   - **Afficher la progression sur la page de dons** — montre la progression de la campagne aux donateurs sur votre page de dons.
   - **Permettre aux donateurs de faire un engagement** — permet aux donateurs de prendre leurs propres engagements envers la campagne.
3. Cliquez sur **Enregistrer**. Si le nom, le fonds ou la date de début manque, le formulaire indique lequel remplir.

## Suivre la progression {#tracking-progress}

Chaque ligne de campagne affiche :

- **Objectif** — le montant visé
- **Engagé** — le montant total que les membres se sont engagés à donner
- **Donné** — le montant total réellement donné au fonds de cette campagne pendant la période de collecte
- **Progression** — une barre et un pourcentage indiquant où vous en êtes par rapport à l'objectif

Cliquez sur le nom d'une campagne pour ouvrir la vue détaillée. Elle affiche le pourcentage de l'objectif atteint et liste les engagements individuels, avec les montants engagés et donnés de chaque donateur ainsi qu'un statut (**Non commencé**, **En cours**, **Honoré**, **Au-delà de l'engagement** ou **Sans engagement** pour les donateurs qui ont donné sans s'engager). Les donateurs sont classés par nom de famille, puis par prénom ; cliquez sur un en-tête de colonne pour trier plutôt par cette colonne. Cliquez sur **Exporter** en haut de la vue détaillée pour télécharger la liste des engagements au format CSV.

## Ajouter des engagements {#adding-pledges}

Les engagements sont des promesses de dons faites par les membres pour une campagne. Pour enregistrer un engagement :

1. Ouvrez une campagne.
2. Cliquez sur **Ajouter un engagement** en haut de la page.
3. Recherchez la **personne** qui prend l'engagement et ajoutez-la.
4. Saisissez le **Montant de l'engagement**. Il doit être supérieur à zéro.
5. Cliquez sur **Enregistrer**.

Les engagements apparaissent dans le détail de la campagne et contribuent au total **Engagé** dans la liste des campagnes. Pour modifier le montant d'un engagement, cliquez sur **Modifier** sur sa ligne ; pour retirer l'engagement, cliquez sur **Modifier**, puis sur **Supprimer**.

:::tip
Les engagements sont distincts des dons réels. Un engagement consigne une promesse ; un don consigne le don effectif. Les deux sont affichés sur la campagne afin que vous puissiez voir dans quelle mesure les engagements sont honorés.
:::

## Modifier ou supprimer une campagne {#editing-or-deleting-a-campaign}

Cliquez sur **Modifier** sur n'importe quelle ligne de campagne (ou sur **Modifier la campagne** en haut de la vue détaillée de la campagne) pour mettre à jour l'un de ses détails. Dans le formulaire de modification, cliquez sur **Supprimer** pour retirer définitivement la campagne et ses engagements ; vous revenez alors à la liste des campagnes. La suppression d'une campagne ne supprime aucun don enregistré dans son fonds.

## Articles connexes {#related-articles}

- [Enregistrer des dons](./recording-donations.md) — enregistrer les dons réels qui honorent les engagements
- [Fonds](./funds.md) — configurer le fonds à associer à une campagne
- [Rapports sur les dons](./donation-reports.md) — rapports sur les dons par fonds
