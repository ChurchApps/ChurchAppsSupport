---
title: "Rapports de Don"
---

# Rapports de Don

<div class="article-intro">

B1 Admin vous offre plusieurs façons d'afficher et d'analyser les données de dons de votre église. La page Résumé des Dons fournit un aperçu visuel avec des graphiques et des filtres, tandis que la section Rapports offre un rapport Résumé des Dons plus détaillé. Utilisez ces outils pour suivre les tendances de dons, préparer les réunions du conseil d'administration ou rapprocher vos registres.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les dons ont été [enregistrés par lots](recording-donations.md) ou [importés depuis Stripe](stripe-import.md)
- Vérifiez que vos [fonds](funds.md) sont correctement configurés pour que les dons soient correctement catégorisés

</div>

## Tableau de bord des dons

Le **Tableau de bord des dons** est la première chose que vous voyez lorsque vous ouvrez la section **Dons**. Il fournit une vue de haut niveau de votre activité de dons avec des indicateurs clés de performance.

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Dons** pour ouvrir le tableau de bord.
2. En haut, quatre **cartes KPI** affichent vos mesures de dons d'un coup d'oeil :
   - **Total des dons** -- Le montant total donné dans la période sélectionnée.
   - **Moyen don** -- Le montant moyen du don.
   - **Donateurs uniques** -- Le nombre de personnes différentes qui ont donné.
   - **Total des dons** -- Le nombre total de dons individuels.
3. Utilisez le **commutateur de période** pour basculer entre les vues **Hebdomadaire**, **Mensuelle** et **Trimestrielle**.
4. Sous les KPI, un graphique affiche les tendances de dons pour la période sélectionnée.
5. Cliquez sur **Télécharger** pour exporter un fichier CSV avec les totaux de dons.

Si les dons de la période ont été donnés dans plus d'une devise, les totaux KPI sont convertis dans la devise de votre église et une note **Converti aux taux de change actuels** apparaît sous les cartes. Voir [Support Multi-Devises](./multi-currency.md#converted-totals) pour les détails.

## Donateurs inactifs

L'onglet **Donateurs inactifs** à côté du tableau de bord répertorie les personnes qui ont donné au cours d'une période mais pas depuis. Par défaut, il compare l'année calendaire dernière avec cette année à ce jour ; modifiez l'une ou l'autre plage de dates pour élargir ou réduire la recherche. Chaque ligne affiche la personne, la date de son dernier don et son total pour la période antérieure, et **Exporter** télécharge la liste sous forme de CSV pour un envoi de suivi ou une liste d'appels.

## Page Résumé des dons

La page **Résumé** fournit des données de dons agrégées plus détaillées.

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Dons** pour ouvrir la page Résumé.
2. Utilisez le **filtre de plage de dates** pour sélectionner la période que vous souhaitez examiner. Définissez la date antérieure en haut et la date plus récente en bas.
3. La page affiche un graphique de dons hebdomadaire afin que vous puissiez voir les tendances d'un coup d'oeil.
4. Cliquez sur **Télécharger** pour exporter un fichier CSV avec le montant total donné, la semaine au cours de laquelle il a été donné et le fonds auquel il a été donné.

:::info
La page Résumé affiche les données de dons agrégées. Elle n'inclut pas les noms de donateurs individuels. Pour les détails au niveau des donateurs, utilisez la page [Lots](batches.md).
:::

## Affichage des détails au niveau des donateurs

Pour une ventilation de qui a donné, combien et à quel fonds :

1. Accédez à **Dons > Lots**.
2. Cliquez sur un **nom de lot** pour l'ouvrir.
3. La page de détail du lot répertorie chaque don avec le nom du donateur, le montant, le fonds, la date et le mode de paiement.
4. Cliquez sur le **nom d'un donateur** pour voir une ventilation du nombre de fois où il a donné et du montant de chaque fois.
5. Cliquez sur un **ID de don** pour ouvrir un panneau latéral avec les détails complets de ce don individuel.
6. Cliquez sur **Télécharger** pour exporter un CSV avec toutes les informations de donateur et de don pour ce lot.

## Rapport de résumé des dons

La création de rapports de dons est intégrée directement dans la section Dons -- la page Résumé sert de rapport de résumé des dons :

1. Ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Dons** pour ouvrir la page Résumé.
2. Utilisez le **filtre de plage de dates** pour sélectionner la période sur laquelle vous souhaitez rendre compte.
3. Cliquez sur **Télécharger** pour exporter le rapport en tant que fichier CSV.

## Exportation de données

Vous pouvez exporter les données de dons à partir de plusieurs endroits :

- **Page Résumé** -- téléchargez un CSV des totaux de dons hebdomadaires par fonds
- **Page de détail du lot** -- téléchargez un CSV des dons individuels avec les détails des donateurs
- **Page de détail du fonds** -- téléchargez l'historique des dons pour un fonds spécifique

:::tip
Pour la création de rapports de fin d'année, combinez l'exportation de la page Résumé avec l'outil [Déclarations de dons](giving-statements.md) pour obtenir à la fois les tendances agrégées et les déclarations individuelles des donateurs.
:::

## Prochaines étapes

- Générez des [Déclarations de dons](giving-statements.md) pour vos donateurs à la fin de l'année
- Examinez les [lots](batches.md) individuels pour vérifier les détails des dons
- Consultez les pages de détail du [fonds](funds.md) pour les ventilations de dons par catégorie
