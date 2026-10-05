---
title: "Rapports de dons"
---

# Rapports de dons

<div class="article-intro">

B1 Admin vous donne plusieurs façons de visualiser et d'analyser les données de dons de votre église. Le tableau de bord des dons sur la page **Résumé** des Dons offre un aperçu visuel avec des graphiques et des filtres, tandis que la section Rapports offre un rapport Résumé des dons plus détaillé. Utilisez ces outils pour suivre les tendances de dons, préparer des réunions du conseil, ou rapprocher vos dossiers.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les dons ont été [enregistrés en lots](recording-donations.md) ou [importés de Stripe](stripe-import.md)
- Vérifiez que vos [fonds](funds.md) sont configurés correctement pour que les dons soient correctement catégorisés

</div>

## Tableau de bord des dons

Le tableau de bord des dons est l'onglet **Tableau de bord** de la page **Résumé**, la première page que vous voyez quand vous ouvrez la section **Dons**.

1. Ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Dons**, et cliquez sur **Résumé**. La page **Résumé** s'ouvre sur l'onglet **Tableau de bord**.
2. Utilisez le bouton bascule **Hebdomadaire**, **Mensuel**, et **Trimestriel** au-dessus du rapport pour choisir comment les dons sont regroupés.
3. Dans le panneau **Filtre du rapport**, définissez la **Date de début** et la **Date de fin** (par défaut, l'année passée jusqu'à hier) et optionnellement choisissez un **Fonds**, puis cliquez sur **Exécuter le rapport**. Le rapport s'exécute automatiquement avec les paramètres par défaut quand la page s'ouvre.
4. Quatre **cartes KPI** affichent vos métriques de dons pour la plage sélectionnée :
   - **Total des dons** – Le montant total donné.
   - **Don moyen** – Le montant du don moyen.
   - **Donateurs uniques** – Le nombre de personnes distinctes qui ont donné.
   - **Nombre total de dons** – Le nombre total de dons individuels.
5. Sous les KPI, un graphique en barres montre les dons par semaine, mois ou trimestre, ventilés par fonds.
6. Cliquez sur **Options de téléchargement** et choisissez **Résumé** pour exporter un CSV des totaux par période et fonds, ou cliquez sur l'icône d'impression pour imprimer le rapport. Le nom de votre église apparaît en haut du rapport imprimé.

Si les dons de la période ont été faits en plus d'une devise, les totaux KPI sont convertis à la devise de votre église et une note **Converti aux taux de change actuels** apparaît sous les cartes. Consultez [Support multi-devise](./multi-currency.md#converted-totals) pour plus de détails.

:::info
Le tableau de bord affiche les données de dons agrégées. Il n'inclut pas les noms de donateurs individuels. Pour les détails au niveau du donateur, utilisez la page [Lots](batches.md).
:::

## Donateurs inactifs

L'onglet **Donateurs inactifs** à côté de l'onglet **Tableau de bord** répertorie les personnes qui ont donné pendant une période mais pas depuis. Par défaut, il compare l'année civile dernière à cette année à ce jour ; modifiez l'une ou l'autre plage de dates pour élargir ou réduire la recherche. Chaque ligne affiche la personne, la date de son dernier don et son total pour la période antérieure, et **Options de téléchargement > Résumé** télécharge la liste en CSV pour un courrier de suivi ou une liste d'appels.

## Affichage des détails au niveau du donateur

Pour une ventilation de qui a donné, combien, et à quel fonds :

1. Naviguez vers **Dons > Lots**.
2. Cliquez sur un **nom de lot** pour l'ouvrir.
3. La page de détail du lot répertorie chaque don avec le nom du donateur, le montant, le fonds, la date, et la méthode de paiement.
4. Cliquez sur le **nom d'un donateur** pour voir une ventilation de combien de fois il a donné et combien chaque fois.
5. Cliquez sur un **ID de don** pour ouvrir un panneau latéral avec les détails complets de ce don individuel.
6. Cliquez sur **Télécharger** pour exporter un CSV avec toutes les informations de donateur et de don pour ce lot.

## Rapport de résumé des dons

La génération de rapports de dons est intégrée directement dans la section Dons -- la page Résumé sert de rapport de résumé des dons :

1. Dans le menu Accès rapide, choisissez **Dons > Résumé**.
2. Sur l'onglet **Tableau de bord**, définissez la **Date de début** et la **Date de fin** dans le panneau **Filtre du rapport** et cliquez sur **Exécuter le rapport**.
3. Cliquez sur **Options de téléchargement** et choisissez **Résumé** pour exporter le rapport en tant que fichier CSV.

## Exportation de données

Vous pouvez exporter les données de dons de plusieurs endroits :

- **Page Résumé** – télécharger un CSV des totaux de dons par semaine, mois ou trimestre et fonds
- **Page de détail du lot** – télécharger un CSV des dons individuels avec les détails du donateur
- **Page de détail des fonds** – télécharger l'historique des dons pour un fonds spécifique

:::tip
Pour les rapports de fin d'année, combinez l'export de la page Résumé avec l'outil [Relevés de dons](giving-statements.md) pour obtenir à la fois les tendances agrégées et les relevés de donateurs individuels.
:::

## Étapes suivantes

- Générez des [Relevés de dons](giving-statements.md) pour vos donateurs à la fin de l'année
- Examinez les [lots](batches.md) individuels pour vérifier les détails des dons
- Vérifiez les pages de détail des [fonds](funds.md) pour les ventilations de dons par catégorie
