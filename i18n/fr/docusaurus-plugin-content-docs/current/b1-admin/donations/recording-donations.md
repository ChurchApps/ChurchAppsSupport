---
title: "Enregistrement des donations"
---

# Enregistrement des donations

<div class="article-intro">

L'enregistrement des donations dans B1 Admin se fait via le système de lots (Batches). Vous créez un lot pour représenter une collecte (comme une offrande du dimanche), puis vous ajoutez les donations individuelles à ce lot. Cela permet de garder vos registres de dons organisés et faciles à rapprocher.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds](funds.md) afin de pouvoir affecter les donations aux bonnes catégories
- Créez un [lot](batches.md) pour contenir les donations que vous allez saisir
- Assurez-vous que les donateurs figurent dans votre [répertoire des personnes](../people/adding-people.md) afin de pouvoir les rechercher lors de la saisie des dons
- Vous devez disposer de **Edit Donations** (Modifier les donations), ou de **Enter Donations** (Saisir les donations) combiné à **View Donations** (Voir les donations), pour saisir des dons dans un lot (voir [Qui peut modifier un lot](batches.md#who-can-change-a-batch))

</div>

## Créer un lot et ajouter des donations

1. Dans **B1 Admin**, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Donations** (Donations), puis cliquez sur **Batches** (Lots).
2. Cliquez sur **Add Batch** (Ajouter un lot) en haut de la page.
3. Saisissez un nom pour le lot (par exemple « Offrande du dimanche - 5 janvier ») et sélectionnez la date. Cliquez sur **Save** (Enregistrer).
4. Votre nouveau lot apparaît dans la liste, avec zéro donation et 0,00 $.
5. Cliquez sur le **nom du lot** pour l'ouvrir.

## Saisir les donations individuelles

1. Sur la page de détail du lot, le panneau de saisie des donations apparaît à côté de la liste des donations. Sous **Select Person or Anonymous** (Sélectionner une personne ou anonyme), saisissez le nom du donateur dans le champ de recherche pour le trouver, ou cliquez sur **Anonymous** (Anonyme). (Cliquer sur **Add Donation** (Ajouter une donation) en haut de la page vous amène directement à ce panneau.)
2. Après avoir sélectionné une personne, le formulaire de saisie affiche les champs **Date**, **Method** (Mode : Check (Chèque), Cash (Espèces), Card (Carte) ou In-Kind (En nature)), **Fund** (Fonds), **Notes** (Notes), **Amount** (Montant) et **Check #** (N° de chèque) (ou **Last 4 digits** (4 derniers chiffres) pour les dons par carte, ou **Item** (Article) pour décrire un don en nature). Cliquez sur **Change** (Modifier) à côté du nom du donateur pour choisir une autre personne.
3. Remplissez les informations et cliquez sur **Add Donation** (Ajouter une donation), ou appuyez sur Entrée.
4. La donation est ajoutée à la liste des donations, et le formulaire se réinitialise pour que vous puissiez saisir la suivante.

:::info
Si le lot a été [clôturé](batches.md#closing-and-reopening-a-batch), le panneau de saisie et les liens **Edit** (Modifier) sont masqués pour toute personne qui ne dispose pas de **Edit Donations**, et un avis en haut du lot indique qu'il est clôturé. Demandez à une personne disposant de **Edit Donations** de le rouvrir.
:::

:::tip
Vous pouvez saisir rapidement plusieurs donations à la suite sans quitter la page du lot. Le formulaire se réinitialise après chaque saisie, afin que vous puissiez traiter efficacement une pile de chèques ou d'enveloppes.
:::

## Enregistrer un don depuis la fiche d'une personne

Pour enregistrer un seul don sans ouvrir de lot, ouvrez la fiche du donateur dans **People** (Personnes) et cliquez sur **Log a gift** (Enregistrer un don) (dans le résumé des dons, ou dans la vue des dons de la personne).

1. Renseignez la **Date** et le **Amount** (Montant).
2. Choisissez le **Fund** (Fonds) et le **Method** (Mode) (Check (Chèque), Cash (Espèces), Card (Carte) ou In-Kind (En nature)), puis saisissez le **Check #** (N° de chèque), les **Last 4 digits** (4 derniers chiffres) ou l'**Item** (Article) (pour les dons en nature) si nécessaire.
3. Ajoutez éventuellement des **Notes** (Notes), puis cliquez sur **Save** (Enregistrer).

Le don est enregistré dans le lot correspondant à cette date. Si aucun lot n'existe encore pour cette date, un lot est créé automatiquement, portant le nom de la date.

## Répartir une donation entre plusieurs fonds

Il arrive qu'un donateur donne à plusieurs fonds au cours d'une même transaction. Pour gérer ce cas :

1. Sous le panneau de saisie, cliquez sur le lien **full donation editor** (éditeur complet de donation) (ou cliquez sur **Edit** (Modifier) sur une ligne de donation existante).
2. Dans l'éditeur complet, ajoutez des montants à différents fonds. Le total se calcule automatiquement à partir des montants par fonds.
3. Cliquez sur **Save** (Enregistrer) pour mettre à jour la donation.

:::info
Répartir une donation entre plusieurs fonds est courant lorsqu'un donateur rédige un seul chèque affecté à plusieurs objectifs, par exemple le Fonds général et les Missions.
:::

## Modifier ou supprimer des donations

Pour modifier une donation, cliquez sur le bouton **Edit** (Modifier) de sa ligne dans le lot. Vous pouvez changer la date, le montant, le fonds, le mode de paiement (Check (Chèque), Cash (Espèces), Card (Carte) ou In-Kind (En nature)) ou tout autre détail. Pour un don en nature, l'éditeur intitule le champ de détail **Item** (Article) afin que vous puissiez décrire ce qui a été donné. Cliquez sur **Save** (Enregistrer) lorsque vous avez terminé.

:::tip
La ligne sous le nom du lot, en haut de la page, se met automatiquement à jour pour afficher la date du lot, le nombre de dons et le montant total en dollars à mesure que vous ajoutez ou modifiez des entrées. Utilisez-la pour vérifier vos chiffres par rapport à votre bordereau de dépôt.
:::

## Rembourser une donation

Si un donateur a été débité par erreur ou demande le remboursement de son argent, vous pouvez rembourser une donation terminée directement depuis son écran de modification — inutile de vous rendre dans le tableau de bord de votre passerelle de paiement.

1. Ouvrez la donation et cliquez sur **Edit** (Modifier).
2. Cliquez sur le bouton **Refund** (Rembourser), à côté de Delete (Supprimer), en bas du formulaire.
3. Confirmez la boîte de dialogue : « Rembourser intégralement cette donation via la passerelle de paiement ? Cette action est irréversible. »

La donation est remboursée intégralement via la passerelle de paiement d'origine et marquée **Refunded** (Remboursée) dans vos listes de donations.

:::warning
Les remboursements ne peuvent être que intégraux — il n'est pas possible de rembourser un montant partiel depuis B1 Admin. Une fois confirmé, le remboursement ne peut pas non plus être annulé.
:::

:::info
Le bouton **Refund** (Rembourser) n'apparaît que pour les donations payées en ligne (qui possèdent une transaction sur la passerelle) et qui sont encore au statut **Complete** (Terminée). Les donations saisies manuellement (espèces, chèque) n'ont pas de transaction sur la passerelle à rembourser — modifiez-les ou supprimez-les plutôt.
:::

## Étapes suivantes

- Vérifiez vos saisies à l'aide des [Rapports de donations](donation-reports.md) pour vous assurer de leur exactitude
- En fin d'année, générez les [Attestations de dons](giving-statements.md) pour vos donateurs
