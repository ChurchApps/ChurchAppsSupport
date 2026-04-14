---
title: "Rapports de donations"
---

# Rapports de donations

<div class="article-intro">

B1 Admin vous donne plusieurs façons de voir et d'analyser les données de dons de votre église. La page de résumé des donations fournit une vue d'ensemble visuelle avec des graphiques et des filtres, tandis que la section Rapports offre un rapport de résumé des donations plus détaillé. Utilisez ces outils pour suivre les tendances de dons, préparer les réunions du conseil ou réconcilier vos enregistrements.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les donations ont été [enregistrées par lots](recording-donations.md) ou [importées de Stripe](stripe-import.md)
- Vérifiez que vos [fonds](funds.md) sont correctement configurés pour que les donations soient correctement catégorisées

</div>

## Tableau de bord des dons

Le **Tableau de bord des dons** est la première chose que vous voyez lorsque vous cliquez sur **Donations** dans la barre latérale. Il fournit une vue d'ensemble de haut niveau de votre activité de dons avec des indicateurs de performance clés.

1. Allez à **Donations** dans la barre latérale pour ouvrir le tableau de bord.
2. En haut, quatre **cartes KPI** affichent vos mesures de dons en un coup d'œil :
   - **Total des dons** -- Le montant total donné au cours de la période sélectionnée.
   - **Cadeau moyen** -- Le montant moyen du don.
   - **Donateurs uniques** -- Le nombre de personnes distinctes qui ont donné.
   - **Total des donations** -- Le nombre total de donations individuelles.
3. Utilisez le **curseur de période** pour basculer entre les vues **Hebdomadaire**, **Mensuelle** et **Trimestrielle**.
4. Sous les KPI, un graphique affiche les tendances de dons pour la période sélectionnée.
5. Cliquez sur **Télécharger** pour exporter un fichier CSV avec les totaux des dons.

## Page de résumé des donations

La page **Résumé** fournit des données de dons agrégées plus détaillées.

1. Allez à **Donations** dans la barre latérale pour ouvrir la page de résumé.
2. Utilisez le **filtre de plage de dates** pour sélectionner la période à examiner. Réglez la date antérieure en haut et la date plus récente en bas.
3. La page affiche un graphique de dons hebdomadaire pour que vous puissiez voir les tendances en un coup d'œil.
4. Cliquez sur **Télécharger** pour exporter un fichier CSV avec le montant total donné, la semaine au cours de laquelle il a été donné et le fonds auquel il a été donné.

:::info
La page de résumé affiche les données de dons agrégées. Elle n'inclut pas les noms des donateurs individuels. Pour les détails au niveau des donateurs, utilisez la page [Lots](batches.md).
:::

## Affichage des détails au niveau des donateurs

Pour une répartition de qui a donné, combien et à quel fonds :

1. Allez à **Donations > Lots**.
2. Cliquez sur un **nom de lot** pour l'ouvrir.
3. La page de détail du lot liste chaque donation avec le nom du donateur, le montant, le fonds, la date et le mode de paiement.
4. Cliquez sur le **nom d'un donateur** pour voir une répartition du nombre de fois qu'il a donné et du montant à chaque fois.
5. Cliquez sur un **ID de donation** pour ouvrir un panneau latéral avec les détails complets de cette donation individuelle.
6. Cliquez sur **Télécharger** pour exporter un CSV avec toutes les informations de donateurs et de donations pour ce lot.

## Rapport de résumé des donations

B1 Admin inclut également un rapport **Résumé des donations** dans la section Rapports :

1. Cliquez sur **Rapports** dans la barre latérale.
2. Sélectionnez le rapport **Résumé des donations**.
3. Choisissez vos filtres (plage de dates, fonds, campus, etc.) et exécutez le rapport.

## Export de données

Vous pouvez exporter les données de donations de plusieurs endroits :

- **Page de résumé** -- télécharger un CSV des totaux de dons hebdomadaires par fonds
- **Page de détail du lot** -- télécharger un CSV des donations individuelles avec les détails des donateurs
- **Page de détail du fonds** -- télécharger l'historique des donations pour un fonds spécifique

:::tip
Pour les rapports de fin d'année, combinez l'export de la page de résumé avec l'outil [Relevés de dons](giving-statements.md) pour obtenir à la fois les tendances agrégées et les relevés des donateurs individuels.
:::

## Prochaines étapes

- Générez [Relevés de dons](giving-statements.md) pour vos donateurs en fin d'année
- Examinez les [lots](batches.md) individuels pour vérifier les détails des donations
- Consultez les pages de détail des [fonds](funds.md) pour les répartitions de dons par catégorie
