---
title: "Import Stripe"
---

# Import Stripe

<div class="article-intro">

Si vous acceptez les dons en ligne via Stripe, l'outil Import Stripe vous permet d'importer ces transactions dans B1 Admin afin que toutes vos données de dons soient au même endroit. Cela est particulièrement utile pour récupérer les transactions qui n'ont pas été synchronisées automatiquement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [Configuration des dons en ligne](online-giving-setup.md) pour connecter votre compte Stripe à B1 Admin
- Vérifiez que vous avez des dons dans votre tableau de bord Stripe pour la plage de dates que vous souhaitez importer

</div>

## Comment ça fonctionne

Le processus d'importation utilise un flux de travail en deux étapes : d'abord vous prévisualisez ce qui serait importé, puis vous confirmez l'importation. Cette approche de simulation vous permet de tout vérifier avant qu'aucune donnée ne soit créée.

## Importer des transactions

1. Dans **B1 Admin**, accédez à **Dons > Lots**.
2. Cliquez sur le lien **Import Stripe** en bas de la page des Lots.
3. Sélectionnez une **plage de dates** pour les transactions que vous souhaitez importer.
4. Cliquez sur **Aperçu** pour lancer une vérification de simulation.

## Examiner l'aperçu

L'aperçu affiche chaque transaction de Stripe avec un indicateur de statut :

- **Nouveau** -- cette transaction n'a pas encore été importée et sera incluse si vous poursuivez.
- **Déjà importé** -- cette transaction existe déjà dans B1 Admin et sera ignorée.
- **Ignoré** -- cette transaction a été exclue pour une autre raison (par exemple, un remboursement ou un paiement échoué).

Une section de résumé en haut affiche le nombre total de transactions dans chaque catégorie et les montants en dollars concernés.

:::info
L'étape d'aperçu ne crée aucun enregistrement. C'est une vérification en lecture seule pour que vous puissiez confirmer ce qui va se passer avant de valider.
:::

## Finaliser l'importation

1. Examinez les résultats de l'aperçu et les totaux du résumé.
2. Cliquez sur **Importer les manquants** pour importer toutes les transactions marquées comme **Nouveau**.
3. Une fois l'importation terminée, les indicateurs de statut à côté de chaque transaction se mettent à jour pour afficher le résultat.

## Conseils pour utiliser l'Import Stripe

- Lancez l'importation régulièrement (hebdomadairement ou mensuellement) pour garder vos registres à jour.
- Si une transaction s'affiche comme **Déjà importé**, cela signifie que B1 Admin possède déjà un enregistrement correspondant -- aucune action n'est nécessaire.
- Utilisez le filtre de plage de dates pour vous concentrer sur une période spécifique si vous recherchez des transactions particulières.

:::tip
Après l'importation, visitez la page [Lots](batches.md) pour vérifier que les dons importés apparaissent correctement et que les totaux correspondent à ce que vous voyez dans votre tableau de bord Stripe.
:::

## Prochaines étapes

- Consultez les [Rapports de dons](donation-reports.md) pour examiner les transactions importées aux côtés de vos autres données de dons
- Assurez-vous que les dons importés sont affectés aux bons [fonds](funds.md) pour des [reçus fiscaux](giving-statements.md) précis
