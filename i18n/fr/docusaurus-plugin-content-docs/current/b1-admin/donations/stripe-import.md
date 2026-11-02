---
title: "Importation Stripe"
---

# Importation Stripe

<div class="article-intro">

Si vous acceptez des dons en ligne via Stripe, l'outil d'importation Stripe vous permet de récupérer ces transactions dans B1 Admin afin que toutes vos données de dons se trouvent au même endroit. Il est particulièrement utile pour rattraper les transactions qui n'ont pas été synchronisées automatiquement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Effectuez la [configuration des dons en ligne](online-giving-setup.md) pour connecter votre compte Stripe à B1 Admin. L'élément de menu **Importation Stripe** et le bouton de la page Lots n'apparaissent que lorsque la passerelle de dons de votre église est Stripe, et uniquement pour les personnes autorisées à modifier les dons
- Vérifiez que vous avez des dons dans votre tableau de bord Stripe pour la plage de dates que vous voulez importer

</div>

## Fonctionnement

Le processus d'importation suit un flux en deux étapes : vous prévisualisez d'abord ce qui serait importé, puis vous confirmez l'importation. Cette approche à blanc vous permet de tout examiner avant que des données ne soient créées.

## Importer des transactions

1. Dans **B1 Admin**, allez dans **Dons > Importation Stripe**. (Vous pouvez aussi cliquer sur **Importer les transactions Stripe manquantes** en haut de la page **Lots**.)
2. La page **Importation Stripe** s'ouvre.
3. Sélectionnez une **plage de dates** pour les transactions que vous voulez importer.
4. Cliquez sur **Prévisualiser** pour lancer une vérification à blanc.

## Examiner la prévisualisation

La prévisualisation affiche chaque transaction provenant de Stripe avec un indicateur d'état :

- **Nouvelle** -- cette transaction n'a pas encore été importée et sera incluse si vous poursuivez.
- **Déjà importée** -- cette transaction existe déjà dans B1 Admin et sera ignorée.
- **Ignorée** -- cette transaction a été exclue pour une autre raison (par exemple un remboursement ou un débit en échec).

Une section de résumé en haut indique le nombre total de transactions dans chaque catégorie ainsi que les montants en dollars concernés.

:::info
L'étape de prévisualisation ne crée aucun enregistrement. Il s'agit d'une vérification en lecture seule pour que vous puissiez contrôler ce qui va se passer avant de vous engager.
:::

## Finaliser l'importation

1. Examinez les résultats de la prévisualisation et les totaux du résumé.
2. Cliquez sur **Importer les manquantes** pour importer toutes les transactions marquées comme **Nouvelles**.
3. Une fois l'importation terminée, les badges d'état à côté de chaque transaction se mettent à jour pour indiquer le résultat.

## Conseils pour utiliser l'importation Stripe

- Lancez l'importation régulièrement (chaque semaine ou chaque mois) pour garder vos registres à jour.
- Si une transaction apparaît comme **Déjà importée**, cela signifie que B1 Admin dispose déjà d'un enregistrement correspondant -- aucune action n'est nécessaire.
- Utilisez le filtre de plage de dates pour vous concentrer sur une période précise si vous recherchez des transactions particulières.

:::tip
Après l'importation, consultez la page [Lots](batches.md) pour vérifier que les dons importés apparaissent correctement et que les totaux correspondent à ce que vous voyez dans votre tableau de bord Stripe.
:::

## Et ensuite

- Consultez les [Rapports de dons](donation-reports.md) pour examiner les transactions importées avec vos autres données de dons
- Assurez-vous que les dons importés sont attribués aux bons [fonds](funds.md) pour des [reçus de dons](giving-statements.md) exacts
