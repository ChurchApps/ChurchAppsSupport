---
title: "Importation Stripe"
description: "Importez les dons Stripe dans B1 Admin grâce à un import avec aperçu préalable qui marque chaque paiement comme nouveau, déjà importé ou ignoré avant de valider."
---

# Importation Stripe

<div class="article-intro">

Si vous acceptez des dons en ligne par Stripe, l'outil Importation Stripe vous permet d'importer ces transactions dans B1 Admin afin que l'ensemble de vos données de dons soit au même endroit. C'est particulièrement utile pour rattraper les transactions qui n'ont pas été synchronisées automatiquement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Effectuez la [Configuration des dons en ligne](online-giving-setup.md) pour connecter votre compte Stripe à B1 Admin. L'élément de menu **Importation Stripe** et le bouton de la page Lots n'apparaissent que lorsque la passerelle de dons de votre église est Stripe, et uniquement pour les personnes autorisées à modifier les dons
- Vérifiez que vous avez des dons dans votre tableau de bord Stripe pour la période que vous souhaitez importer

</div>

## Fonctionnement {#how-it-works}

Le processus d'importation se déroule en deux étapes : vous prévisualisez d'abord ce qui serait importé, puis vous confirmez l'importation. Cette approche à blanc vous permet de tout examiner avant que des données ne soient créées.

## Importer des transactions {#importing-transactions}

1. Dans **B1 Admin**, accédez à **Dons > Importation Stripe**. (Vous pouvez aussi cliquer sur **Importer les transactions Stripe manquantes** en haut de la page **Lots**.)
2. La page **Importer des transactions Stripe** s'ouvre.
3. Dans **Sélectionner la période**, définissez la **Date de début** et la **Date de fin** des transactions que vous souhaitez importer. La période commence le 1er janvier de cette année jusqu'à aujourd'hui.
4. Cliquez sur **Aperçu** pour exécuter une vérification à blanc. **Importer les manquantes** reste désactivé tant qu'un aperçu ne trouve pas de nouvelles transactions, et la modification de l'une des dates efface l'aperçu afin que vous prévisualisiez d'abord la nouvelle période.

## Examiner l'aperçu {#reviewing-the-preview}

L'aperçu liste chaque événement Stripe avec son **ID d'événement**, son **Type**, son **Montant**, sa **Date** et un **Statut** :

- **Nouveau** -- cette transaction n'a pas encore été importée et sera incluse si vous poursuivez.
- **Déjà importé** -- cette transaction existe déjà dans B1 Admin et sera ignorée.
- **Ignoré** -- cette transaction a été exclue pour une autre raison (par exemple un remboursement ou un débit échoué).

Un résumé en haut affiche le **Total** des événements et le nombre de **Nouveaux**, de **Déjà importés** et d'**Ignorés**. Si un événement n'a pas pu être lu, un compteur **Erreurs** apparaît et la ligne de l'événement affiche le message dans la colonne **Notes**.

:::info
L'étape d'aperçu ne crée aucun enregistrement. C'est une vérification en lecture seule qui vous permet de contrôler ce qui va se passer avant de valider.
:::

## Terminer l'importation {#completing-the-import}

1. Examinez les résultats de l'aperçu et les totaux du résumé.
2. Cliquez sur **Importer les manquantes** pour importer toutes les transactions marquées comme **Nouveau**.
3. Une fois l'importation terminée, la liste devient **Résultats de l'importation** : chaque transaction ajoutée affiche **Importé**, et le résumé ajoute un compteur **Importés**.

## Conseils pour utiliser l'importation Stripe {#tips-for-using-stripe-import}

- Lancez l'importation régulièrement (chaque semaine ou chaque mois) pour garder vos registres à jour.
- Si une transaction apparaît comme **Déjà importé**, cela signifie que B1 Admin contient déjà un enregistrement correspondant -- aucune action n'est nécessaire.
- Utilisez le filtre de période pour vous concentrer sur une période donnée si vous recherchez des transactions particulières.

:::tip
Après l'importation, consultez la page [Lots](batches.md) pour vérifier que les dons importés apparaissent correctement et que les totaux correspondent à ce que vous voyez dans votre tableau de bord Stripe.
:::

## Étapes suivantes {#next-steps}

- Consultez les [Rapports sur les dons](donation-reports.md) pour examiner les transactions importées avec le reste de vos données de dons
- Assurez-vous que les dons importés sont affectés aux bons [fonds](funds.md) pour des [relevés de dons](giving-statements.md) exacts
