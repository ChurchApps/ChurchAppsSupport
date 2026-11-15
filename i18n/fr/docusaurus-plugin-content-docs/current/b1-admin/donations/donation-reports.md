---
title: "Rapports sur les dons"
description: "Consultez les totaux de dons, les donateurs inactifs et les détails au niveau des lots dans B1 Admin grâce au tableau de bord du Résumé des dons, à la vue Donateurs inactifs et aux exports CSV."
---

# Rapports sur les dons

<div class="article-intro">

B1 Admin vous offre plusieurs façons de consulter et d'analyser les données de dons de votre église. Le tableau de bord des dons, sur la page **Résumé** des dons, fournit une vue d'ensemble visuelle avec des graphiques et des filtres, tandis que la section Rapports propose un rapport Résumé des dons plus détaillé. Utilisez ces outils pour suivre les tendances des dons, préparer les réunions du conseil ou rapprocher vos registres.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les dons ont été [enregistrés par lots](recording-donations.md) ou [importés depuis Stripe](stripe-import.md)
- Vérifiez que vos [fonds](funds.md) sont correctement configurés afin que les dons soient bien classés

</div>

## Tableau de bord des dons {#giving-dashboard}

Le tableau de bord des dons correspond à la vue **Tableau de bord** de la page **Résumé**, la première page que vous voyez lorsque vous ouvrez la section **Dons**.

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Dons** et cliquez sur **Résumé**. La page **Résumé** s'ouvre sur la vue **Tableau de bord**. Le bouton **Affichage** en haut à droite permet de basculer entre **Tableau de bord** et **Donateurs inactifs**.
2. Utilisez le bouton **Hebdomadaire**, **Mensuel** et **Trimestriel** au-dessus du rapport pour choisir la manière dont les dons sont regroupés.
3. Dans le panneau **Filtrer le rapport**, définissez la **Date de début** et la **Date de fin** (par défaut, de l'année écoulée jusqu'à hier) et, si vous le souhaitez, choisissez un **Fonds**, puis cliquez sur **Exécuter le rapport**. Le rapport s'exécute automatiquement avec les valeurs par défaut à l'ouverture de la page.
4. Quatre **cartes d'indicateurs clés** affichent vos mesures de dons pour la période choisie :
   - **Total des dons** -- Le montant total donné.
   - **Don moyen** -- Le montant moyen d'un don.
   - **Donateurs uniques** -- Le nombre de personnes distinctes ayant donné.
   - **Nombre total de dons** -- Le nombre total de dons individuels.
5. Sous les indicateurs, un graphique à barres présente les dons par semaine, par mois ou par trimestre, ventilés par fonds.
6. Cliquez sur **Options de téléchargement** et choisissez **Résumé** pour exporter un CSV des totaux par période et par fonds, ou cliquez sur l'icône d'impression pour imprimer le rapport. Le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) et son nom apparaissent centrés en haut du rapport imprimé. L'impression utilise un texte foncé et un graphique clair, même si vous utilisez B1 Admin en mode sombre.

Si les dons de la période ont été faits dans plusieurs devises, les totaux des indicateurs sont convertis dans la devise de votre église, et une note **Converti aux taux de change actuels** apparaît sous les cartes. Voir [Prise en charge multidevise](./multi-currency.md#converted-totals) pour plus de détails.

:::info
Le tableau de bord affiche des données de dons agrégées. Il n'inclut pas le nom des donateurs individuels. Pour les détails par donateur, utilisez la page [Lots](batches.md).
:::

## Donateurs inactifs {#lapsed-givers}

Choisissez **Donateurs inactifs** dans le bouton **Affichage** pour lister les personnes qui ont donné pendant une période mais plus depuis. Par défaut, la vue compare l'année civile précédente à l'année en cours jusqu'à aujourd'hui ; modifiez la **Date de début de la période précédente**, la **Date de fin de la période précédente**, la **Date de début de la période actuelle** ou la **Date de fin de la période actuelle** dans le panneau **Filtrer le rapport**, puis cliquez sur **Exécuter le rapport** pour élargir ou restreindre la recherche. Cette vue nécessite l'autorisation **Consulter les dons**. Chaque ligne affiche la personne, la date de son dernier don, ainsi que son total pour la période précédente ; **Options de téléchargement > Résumé** télécharge la liste au format CSV pour une campagne de courriers ou une liste d'appels de suivi.

## Consulter les détails par donateur {#viewing-donor-level-details}

Pour voir qui a donné, combien et à quel fonds :

1. Accédez à **Dons > Lots**.
2. Cliquez sur le **nom d'un lot** pour l'ouvrir.
3. La page de détail du lot liste chaque don avec son mode de paiement (et le numéro de chèque ou les derniers chiffres de la carte), le nom du donateur, la date, les notes et le montant, avec un total en bas.
4. Cliquez sur **Modifier** sur la ligne d'un don pour ouvrir les détails complets de ce don individuel, y compris son fonds.
5. Cliquez sur **Exporter** au-dessus de la liste pour télécharger un CSV contenant toutes les informations sur les donateurs et les dons de ce lot.

## Rapport Résumé des dons {#donation-summary-report}

Le rapport sur les dons est intégré directement à la section Dons -- la page Résumé sert de rapport sommaire des dons :

1. Dans le menu Jump, choisissez **Dons > Résumé**.
2. Sur la vue **Tableau de bord**, définissez la **Date de début** et la **Date de fin** dans le panneau **Filtrer le rapport**, puis cliquez sur **Exécuter le rapport**.
3. Cliquez sur **Options de téléchargement** et choisissez **Résumé** pour exporter le rapport au format CSV.

## Exporter les données {#exporting-data}

Vous pouvez exporter les données de dons depuis plusieurs endroits :

- **Page Résumé** -- télécharger un CSV des totaux de dons par semaine, par mois ou par trimestre et par fonds
- **Page de détail d'un lot** -- télécharger un CSV des dons individuels avec les détails des donateurs
- **Page de détail d'un fonds** -- télécharger l'historique des dons d'un fonds précis

:::tip
Pour la déclaration de fin d'année, combinez l'export de la page Résumé avec l'outil [Relevés de dons](giving-statements.md) afin d'obtenir à la fois les tendances globales et les relevés individuels des donateurs.
:::

## Étapes suivantes {#next-steps}

- Générez les [Relevés de dons](giving-statements.md) de vos donateurs en fin d'année
- Passez en revue les [lots](batches.md) individuels pour vérifier les détails des dons
- Consultez les pages de détail des [fonds](funds.md) pour les répartitions de dons par catégorie
