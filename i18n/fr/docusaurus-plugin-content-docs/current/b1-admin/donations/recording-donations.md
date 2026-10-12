---
title: "Enregistrement des donations"
---

# Enregistrement des donations

<div class="article-intro">

L'enregistrement des donations dans B1 Admin se fait via le système Batches. Vous créez un lot pour représenter une collecte (comme une offrande du dimanche), puis vous ajoutez des dons individuels à ce lot. Cela maintient vos dossiers de donation organisés et faciles à rapprocher.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds](funds.md) pour pouvoir attribuer les donations aux bonnes catégories
- Créez un [lot](batches.md) pour contenir les donations que vous êtes sur le point d'entrer
- Assurez-vous que les donateurs se trouvent dans votre [répertoire des personnes](../people/adding-people.md) pour pouvoir les rechercher lors de l'entrée des dons

</div>

## Créer un lot et ajouter des donations

1. Dans **B1 Admin**, ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Donations**, et cliquez sur **Batches**.
2. Cliquez sur **Add Batch** en haut de la page.
3. Entrez un nom pour le lot (par exemple, « Sunday Offering - Jan 5 ») et sélectionnez la date. Cliquez sur **Save**.
4. Votre nouveau lot apparaît dans la liste affichant zéro donation et $0.00.
5. Cliquez sur le **nom du lot** pour l'ouvrir.

## Entrer des donations individuelles

1. Sur la page de détail du lot, le panneau de saisie des dons apparaît à côté de la liste des dons. Sous **Sélectionner une personne ou anonyme**, tapez le nom du donateur dans le champ de recherche pour le trouver, ou cliquez sur **Anonyme**. (Cliquer sur **Add Donation** en haut de la page vous amène à ce panneau.)
2. Après avoir sélectionné une personne, le formulaire affiche les champs **Date**, **Method** (Check, Cash, Card ou In-Kind), **Fund**, **Notes**, **Amount** et **Check #** (ou **Last 4 digits** pour les dons par carte). Cliquez sur **Change** à côté du nom du donateur pour en choisir un autre.
3. Remplissez les détails et cliquez sur **Add Donation** (ou appuyez sur Entrée).
4. La donation est ajoutée à la liste des dons, et le formulaire se réinitialise pour que vous puissiez en entrer une autre.

:::tip
Vous pouvez rapidement entrer plusieurs donations d'affilée sans quitter la page du lot. Le formulaire se réinitialise après chaque entrée pour que vous puissiez traiter rapidement une pile de chèques ou d'enveloppes.
:::

## Enregistrer un don depuis la fiche d'une personne {#logging-a-gift-from-a-persons-record}

Pour enregistrer un seul don sans ouvrir de lot, ouvrez la fiche du donateur dans **Personnes** et cliquez sur **Log a gift** (dans le résumé des dons, ou dans la vue des dons de la personne).

1. Définissez la **Date** et le **Montant**.
2. Choisissez le **Fonds** et la **Méthode** (Check, Cash, Card ou In-Kind), puis saisissez le **Check #** ou les **Last 4 digits** si nécessaire.
3. Ajoutez éventuellement des **Notes**, puis cliquez sur **Save**.

Le don est enregistré dans le lot de cette date. Si aucun lot n'existe encore pour cette date, un lot est créé automatiquement, nommé d'après la date.

## Répartir une donation entre plusieurs fonds

Parfois, un seul donateur donne à plus d'un fonds en une seule transaction. Pour gérer cela :

1. Sous le panneau de saisie, cliquez sur le lien **éditeur complet de don** (ou cliquez sur **Edit** sur une ligne de don existante).
2. Dans l'éditeur complet, ajoutez des montants à différents fonds. Le total sera automatiquement calculé à partir des montants des fonds individuels.
3. Cliquez sur **Save** pour mettre à jour la donation.

:::info
La répartition des donations entre les fonds est courante quand un donateur écrit un seul chèque désigné à plusieurs fins, comme le Fonds général et les Missions.
:::

## Éditer ou supprimer des donations

Pour modifier une donation, cliquez sur le bouton **Edit** dans sa ligne du lot. Vous pouvez modifier la date, le montant, le fonds, la méthode de paiement ou tout autre détail. Cliquez sur **Save** une fois terminé.

:::tip
La ligne sous le nom du lot en haut de la page se met à jour automatiquement pour afficher la date du lot, le nombre de dons et le montant en dollars combiné à mesure que vous ajoutez ou modifiez les entrées. Utilisez cela pour rapprocher avec votre bordereau de dépôt.
:::

## Rembourser une donation

Si un donateur a été facturé par erreur ou demande le remboursement, vous pouvez rembourser une donation complétée directement à partir de son écran d'édition -- pas besoin d'aller au tableau de bord de votre passerelle de paiement.

1. Ouvrez la donation et cliquez sur **Edit**.
2. Cliquez sur le bouton **Refund** à côté de Delete en bas du formulaire.
3. Confirmez la boîte de dialogue : « Refund this donation in full through the payment gateway? This cannot be undone. »

La donation est remboursée en totalité via la passerelle de paiement originale et marquée **Refunded** dans vos listes de donation.

:::warning
Les remboursements ne sont que des remboursements complets -- il n'y a aucun moyen de rembourser un montant partiel depuis B1 Admin. Le remboursement ne peut pas non plus être annulé une fois confirmé.
:::

:::info
Le bouton **Refund** n'apparaît que pour les donations qui ont été payées en ligne (elles ont une transaction de passerelle) et qui sont toujours dans le statut **Complete**. Les donations saisies manuellement (espèces, chèque) n'ont pas de transaction de passerelle à rembourser -- modifiez-les ou supprimez-les plutôt.
:::

## Prochaines étapes

- Examinez vos entrées en utilisant [Donation Reports](donation-reports.md) pour vérifier la précision
- En fin d'année, générez [Giving Statements](giving-statements.md) pour vos donateurs
