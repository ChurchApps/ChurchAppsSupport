---
title: "Relevés de dons"
---

# Relevés de dons

<div class="article-intro">

À la fin de chaque année, vos donateurs ont besoin d'un résumé de leurs dons déductibles fiscalement pour leurs dossiers. B1 Admin facilite la génération de ces relevés pour tous les donateurs à la fois, vous économisant des heures de travail manuel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vérifiez que vos [fonds](funds.md) sont correctement marqués comme **Déductibles fiscalement** -- seuls les dons aux fonds déductibles fiscalement apparaissent sur les relevés
- Assurez-vous que tous les dons ont été [enregistrés](recording-donations.md) et que toutes les transactions en ligne ont été [importées de Stripe](stripe-import.md)

</div>

## Accès aux relevés de dons

1. Dans **B1 Admin**, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Dons**.
2. Cliquez sur **Relevés de dons**.

## Génération des relevés

1. Sélectionnez l'**année** dans la liste déroulante en haut de la page. Vous pouvez choisir l'année en cours ou l'une des cinq années précédentes.
2. La page affiche les statistiques de synthèse pour cette année, notamment :
   - **Nombre total de donateurs** -- le nombre de personnes qui ont donné
   - **Nombre total de dons** -- le nombre de dossiers de don individuels
   - **Montant total** -- le montant en dollars combiné de tous les dons

## Téléchargement des relevés

Vous avez deux options pour transmettre les relevés à vos donateurs :

### Télécharger en tant que fichiers CSV

Cliquez sur **Télécharger ZIP** pour télécharger un fichier ZIP contenant un fichier CSV individuel pour chaque donateur. C'est utile si vous souhaitez envoyer par e-mail des relevés individuellement ou les importer dans un autre système.

### Imprimer tous les relevés

Cliquez sur **Imprimer tous** pour ouvrir une vue imprimable du relevé de chaque donateur dans votre navigateur. À partir de là, utilisez la fonction d'impression de votre navigateur pour les envoyer à une imprimante. Chaque relevé commence sur une nouvelle page pour qu'ils soient prêts à être pliés et envoyés par la poste.

:::tip
Exécutez vos relevés au début janvier tandis que vos dossiers sont frais. Double-vérifiez que vos fonds sont correctement marqués comme déductibles fiscalement avant de générer des relevés -- seuls les dons aux fonds déductibles fiscalement sont inclus.
:::

:::info
Les relevés de dons incluent seulement les dons assignés aux fonds qui ont le paramètre **Déductible fiscalement** activé. Si un fonds n'est pas marqué comme déductible fiscalement, ses dons n'apparaîtront pas sur le relevé. Vous pouvez gérer ce paramètre sur la page [Fonds](funds.md).
:::

## Formats de reçus pour le Canada, l'Australie et la Nouvelle-Zélande

Les églises en dehors des États-Unis peuvent passer le relevé à la présentation de reçu officielle de leur pays. Allez à **Paramètres**, ouvrez la section **Dons**, et définissez **Format du relevé** à **Canada**, **Australie** ou **Nouvelle-Zélande**, puis remplissez les champs qui apparaissent : votre numéro d'enregistrement (numéro d'enregistrement ARC, ABN ou numéro d'enregistrement de bienfaisance NZ), l'adresse de votre organisation, le nom de la personne autorisée à signer les reçus, et pour le Canada la ville où les reçus sont émis.

Les relevés portent ensuite le libellé que votre autorité fiscale attend (pour le Canada, « Reçu officiel à des fins d'impôt sur le revenu » avec la référence ARC), un numéro de reçu sous la forme `ANNÉE-ID-DONATEUR`, le montant admissible compté à partir des fonds déductibles fiscalement seulement, et une ligne séparée pour tout don aux fonds non déductibles. Les donateurs voient le même bloc de reçu quand ils impriment leur propre relevé à partir de B1.church.

## Étapes suivantes

Si vous avez besoin d'examiner les détails des dons avant de générer des relevés, visitez la page [Rapports de dons](donation-reports.md) ou vérifiez les [lots](batches.md) individuels.
