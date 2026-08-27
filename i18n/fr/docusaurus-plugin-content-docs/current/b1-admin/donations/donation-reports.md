---
title: "Rapports de donation"
---

# Rapports de donation

<div class="article-intro">

B1 Admin vous donne plusieurs façons d'afficher et d'analyser les données de donation de votre église. La page Résumé des donations fournit un aperçu visuel avec des graphiques et des filtres, tandis que la section Rapports offre un rapport Résumé des donations plus détaillé. Utilisez ces outils pour suivre les tendances de donation, préparer les réunions du conseil d'administration ou réconcilier vos dossiers.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les donations ont été [enregistrées en lots](recording-donations.md) ou [importées à partir de Stripe](stripe-import.md)
- Vérifiez que vos [fonds](funds.md) sont correctement configurés afin que les donations soient correctement catégorisées

</div>

## Tableau de bord de donation

Le **Tableau de bord de donation** est la première chose que vous voyez lorsque vous ouvrez la section **Donations**. Il fournit une vue de haut niveau de votre activité de donation avec des indicateurs clés de performance.

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Donations** pour ouvrir le tableau de bord.
2. En haut, quatre **cartes KPI** affichent vos métriques de donation en un coup d'œil :
   - **Total de donation** -- Le montant total donné dans la période sélectionnée.
   - **Don moyen** -- Le montant moyen du don.
   - **Donateurs uniques** -- Le nombre de personnes distinctes qui ont donné.
   - **Total des donations** -- Le nombre total de donations individuelles.
3. Utilisez le **bouton bascule de période** pour basculer entre les vues **Hebdomadaire**, **Mensuelle** et **Trimestrielle**.
4. Sous les KPI, un graphique affiche les tendances de donation pour la période sélectionnée.
5. Cliquez sur **Télécharger** pour exporter un fichier CSV avec les totaux de donation.

## Page Résumé des donations

La page **Résumé** fournit des données de donation cumulée plus détaillées.

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Donations** pour ouvrir la page Résumé.
2. Utilisez le **filtre de plage de dates** pour sélectionner la période que vous souhaitez consulter. Définissez la date antérieure en haut et la date plus récente en bas.
3. La page affiche un graphique de donation hebdomadaire afin que vous puissiez voir les tendances en un coup d'œil.
4. Cliquez sur **Télécharger** pour exporter un fichier CSV avec le montant total donné, la semaine où il a été donné et le fonds auquel il a été donné.

:::info
La page Résumé affiche des données de donation cumulée. Elle n'inclut pas les noms de donateurs individuels. Pour les détails au niveau des donateurs, utilisez la page [Lots](batches.md).
:::

## Affichage des détails au niveau du donateur

Pour une ventilation de qui a donné, combien et à quel fonds :

1. Naviguez vers **Donations > Lots**.
2. Cliquez sur un **nom de lot** pour l'ouvrir.
3. La page de détail du lot liste chaque donation avec le nom du donateur, le montant, le fonds, la date et la méthode de paiement.
4. Cliquez sur le **nom d'un donateur** pour voir une ventilation du nombre de fois qu'il a donné et combien chaque fois.
5. Cliquez sur un **ID de donation** pour ouvrir un panneau latéral avec les détails complets de cette donation individuelle.
6. Cliquez sur **Télécharger** pour exporter un CSV avec toutes les informations de donateur et de donation pour ce lot.

## Rapport Résumé des donations

La génération de rapports de donation est construite directement dans la section Donations -- la page Résumé sert de rapport résumé de donation :

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Donations** pour ouvrir la page Résumé.
2. Utilisez le **filtre de plage de dates** pour sélectionner la période sur laquelle vous souhaitez générer un rapport.
3. Cliquez sur **Télécharger** pour exporter le rapport en tant que fichier CSV.

## Exportation de données

Vous pouvez exporter les données de donation à partir de plusieurs endroits :

- **Page Résumé** -- téléchargez un CSV des totaux de donation hebdomadaires par fonds
- **Page de détail du lot** -- téléchargez un CSV des donations individuelles avec les détails du donateur
- **Page de détail du fonds** -- téléchargez l'historique de donation pour un fonds spécifique

:::tip
Pour la génération de rapports de fin d'année, combinez l'export de la page Résumé avec l'outil [Relevés de donation](giving-statements.md) pour obtenir à la fois les tendances cumulée et les relevés de donateurs individuels.
:::

## Étapes suivantes

- Générez des [Relevés de donation](giving-statements.md) pour vos donateurs en fin d'année
- Examinez des [lots](batches.md) individuels pour vérifier les détails de donation
- Consultez les pages de détail des [fonds](funds.md) pour les ventilations de donation par catégorie
