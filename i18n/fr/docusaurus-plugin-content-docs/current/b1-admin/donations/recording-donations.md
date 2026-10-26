---
title: "Enregistrer les dons"
---

# Enregistrer les dons

<div class="article-intro">

L'enregistrement des dons dans B1 Admin se fait via le système de lots (Batches). Vous créez un lot pour représenter une collecte (par exemple, une offrande du dimanche), puis vous ajoutez les dons individuels à ce lot. Cela permet de garder vos registres de dons organisés et faciles à rapprocher.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds](funds.md) afin de pouvoir attribuer les dons aux bonnes catégories
- Créez un [lot](batches.md) pour regrouper les dons que vous êtes sur le point de saisir
- Assurez-vous que les donateurs figurent dans votre [répertoire des personnes](../people/adding-people.md) afin de pouvoir les rechercher lors de la saisie des dons
- Vous devez disposer de l'autorisation **Modifier les dons**, ou de **Saisir les dons** avec **Voir les dons**, pour saisir des dons dans un lot (voir [Qui peut modifier un lot](batches.md#who-can-change-a-batch))

</div>

## Créer un lot et ajouter des dons

1. Dans **B1 Admin**, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Donations**, puis cliquez sur **Batches**.
2. Cliquez sur **Add Batch** en haut de la page.
3. Saisissez un nom pour le lot (par exemple, « Offrande du dimanche - 5 janvier ») et sélectionnez la date. Cliquez sur **Save**.
4. Votre nouveau lot apparaît dans la liste avec zéro don et 0,00 $.
5. Cliquez sur le **nom du lot** pour l'ouvrir.

## Saisir les dons individuels

1. Sur la page de détail du lot, le panneau de saisie des dons apparaît à côté de la liste des dons. Sous **Select Person or Anonymous**, saisissez le nom du donateur dans le champ de recherche pour le trouver, ou cliquez sur **Anonymous**. (Cliquer sur **Add Donation** en haut de la page vous amène directement à ce panneau.)
2. Une fois la personne sélectionnée, le formulaire de saisie affiche les champs **Date**, **Method** (Check, Cash, Card ou In-Kind), **Fund**, **Notes**, **Amount** et **Check #** (ou **Last 4 digits** pour les dons par carte, ou **Item** pour décrire un don en nature). Cliquez sur **Change** à côté du nom du donateur pour en choisir un autre.
3. Remplissez les informations et cliquez sur **Add Donation** (ou appuyez sur Entrée).
4. Le don est ajouté à la liste des dons, et le formulaire se réinitialise pour que vous puissiez saisir le suivant.

:::info
Si le lot a été [fermé](batches.md#closing-and-reopening-a-batch), le panneau de saisie et les liens **Edit** sont masqués pour toute personne qui ne dispose pas de l'autorisation **Modifier les dons**, et un avis en haut du lot indique qu'il est fermé. Demandez à une personne disposant de l'autorisation **Modifier les dons** de le rouvrir.
:::

:::tip
Vous pouvez saisir rapidement plusieurs dons à la suite sans quitter la page du lot. Le formulaire se réinitialise après chaque saisie, ce qui vous permet de traiter efficacement une pile de chèques ou d'enveloppes.
:::

## Importer des dons depuis un fichier CSV {#importing-donations-from-a-csv-file}

Si vos dons sont déjà dans un tableur, par exemple une exportation d'un autre système de dons ou la feuille de comptage d'une équipe, vous pouvez les importer dans un lot au lieu de les saisir un par un.

1. Ouvrez le lot et cliquez sur **Import CSV** en haut de la page. (Le bouton apparaît lorsque vous pouvez modifier le lot et que votre église dispose d'au moins un [fonds](funds.md).)
2. Cliquez sur **Choose CSV File** et sélectionnez votre fichier. Le fichier doit comporter une ligne d'en-tête, et les colonnes peuvent être dans n'importe quel ordre :
   - **Amount** (obligatoire ; `Total` fonctionne aussi) -- Les symboles monétaires et les virgules sont ignorés, donc `1 250,00 $` est accepté. Le montant doit être supérieur à zéro.
   - **Date** -- Utilisez un format comme `2026-10-25` ou `10/25/2026`. Si la cellule est vide, la date du lot est utilisée.
   - **Fund** -- Le nom du fonds, sans tenir compte des majuscules. S'il est vide, votre premier fonds est utilisé.
   - **Method** -- **Check**, **Cash**, **Card** ou **In-Kind**. S'il est vide, **Check** est utilisé.
   - **Check Number** -- Le numéro du chèque (ou un autre détail de paiement).
   - **Notes**
   - **Email**, **Name**, ou **First Name** et **Last Name** -- Utilisés pour associer le donateur à une personne de votre base de données. Un nom écrit « Smith, John » est lu comme « John Smith ».
3. Vérifiez l'aperçu. Chaque ligne affiche son numéro, le donateur indiqué dans le fichier, la **Match** (correspondance), le fonds et le montant :
   - Le nom d'une personne signifie que le donateur a été associé. B1 effectue d'abord la correspondance par courriel, puis par nom exact, et seulement lorsqu'une seule personne correspond.
   - **Not found — anonymous** signifie qu'aucune correspondance unique n'a été trouvée. Le don est importé comme anonyme, et la mention « Imported as: » suivie du nom du donateur est ajoutée à ses notes afin que vous puissiez l'attribuer plus tard.
   - Un message en rouge comme **Invalid amount**, **Unknown fund**, **Unknown method** ou **Invalid date** signifie que la ligne sera ignorée. Corrigez le fichier et sélectionnez-le à nouveau pour inclure la ligne.
4. Cliquez sur **Import** (le bouton indique le nombre de lignes qui seront importées). Les dons sont ajoutés au lot.

:::tip
Après l'importation, utilisez **Edit** sur un don anonyme pour choisir la bonne personne. La mention « Imported as: » vous indique de qui le fichier disait qu'il provenait.
:::

## Enregistrer un don depuis la fiche d'une personne

Pour enregistrer un seul don sans ouvrir de lot, ouvrez la fiche du donateur dans **People** et cliquez sur **Log a gift** (dans le résumé des dons, ou dans la vue des dons de la personne).

1. Définissez la **Date** et le **Amount**.
2. Choisissez le **Fund** et la **Method** (Check, Cash, Card ou In-Kind), puis saisissez le **Check #**, les **Last 4 digits** ou l'**Item** (pour les dons en nature) si nécessaire.
3. Ajoutez éventuellement des **Notes**, puis cliquez sur **Save**.

Le don est enregistré dans le lot de cette date. Si aucun lot n'existe encore pour cette date, un lot est créé automatiquement, portant le nom de la date.

## Répartir un don entre plusieurs fonds

Il arrive qu'un donateur donne à plusieurs fonds dans une même transaction. Pour gérer ce cas :

1. Sous le panneau de saisie, cliquez sur le lien **full donation editor** (ou cliquez sur **Edit** dans la ligne d'un don existant).
2. Dans l'éditeur complet, ajoutez des montants à différents fonds. Le total se calcule automatiquement à partir des montants de chaque fonds.
3. Cliquez sur **Save** pour mettre à jour le don.

:::info
Répartir un don entre plusieurs fonds est courant lorsqu'un donateur rédige un seul chèque destiné à plusieurs usages, par exemple le fonds général et les missions.
:::

## Modifier ou supprimer des dons

Pour modifier un don, cliquez sur le bouton **Edit** sur sa ligne dans le lot. Vous pouvez changer la date, le montant, le fonds, le mode de paiement (Check, Cash, Card ou In-Kind) ou tout autre détail. Pour un don en nature, l'éditeur intitule le champ de détail **Item** afin que vous puissiez décrire ce qui a été donné. Cliquez sur **Save** une fois terminé.

:::tip
La ligne sous le nom du lot en haut de la page se met à jour automatiquement pour afficher la date du lot, le nombre de dons et le montant total en dollars à mesure que vous ajoutez ou modifiez des entrées. Utilisez-la pour rapprocher les totaux de votre bordereau de dépôt.
:::

## Rembourser un don

Si un donateur a été débité par erreur ou demande le remboursement de son argent, vous pouvez rembourser un don terminé directement depuis son écran de modification, sans passer par le tableau de bord de votre passerelle de paiement.

1. Ouvrez le don et cliquez sur **Edit**.
2. Cliquez sur le bouton **Refund**, à côté de Delete, au bas du formulaire.
3. Confirmez la boîte de dialogue : « Refund this donation in full through the payment gateway? This cannot be undone. »

Le don est remboursé intégralement via la passerelle de paiement d'origine et marqué **Refunded** dans vos listes de dons.

:::warning
Les remboursements ne sont possibles que pour la totalité du montant : il n'est pas possible de rembourser une partie seulement depuis B1 Admin. Une fois confirmé, le remboursement ne peut pas non plus être annulé.
:::

:::info
Le bouton **Refund** n'apparaît que pour les dons payés en ligne (ils ont une transaction de passerelle) et qui sont toujours au statut **Complete**. Les dons saisis manuellement (espèces, chèque) n'ont pas de transaction de passerelle à rembourser ; modifiez-les ou supprimez-les à la place.
:::

## Étapes suivantes

- Vérifiez vos saisies à l'aide des [rapports de dons](donation-reports.md) pour en confirmer l'exactitude
- En fin d'année, générez des [relevés de dons](giving-statements.md) pour vos donateurs
