---
title: "Enregistrer les dons"
---

# Enregistrer les dons

<div class="article-intro">

L'enregistrement des dons dans B1 Admin se fait à l'aide du système de lots. Vous créez un lot pour représenter une collecte (comme une offrande du dimanche), puis vous y ajoutez les dons individuels. Vos registres de dons restent ainsi organisés et faciles à rapprocher.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds](funds.md) afin de pouvoir attribuer les dons aux bonnes catégories
- Créez un [lot](batches.md) pour accueillir les dons que vous êtes sur le point de saisir
- Assurez-vous que les donateurs figurent dans votre [répertoire des personnes](../people/adding-people.md) afin de pouvoir les rechercher lors de la saisie des dons
- Vous avez besoin de **Modifier les dons**, ou de **Saisir les dons** avec **Voir les dons**, pour saisir des dons dans un lot (voir [Qui peut modifier un lot](batches.md#who-can-change-a-batch))

</div>

## Créer un lot et ajouter des dons

1. Dans **B1 Admin**, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Dons**, puis cliquez sur **Lots**.
2. Cliquez sur **Ajouter un lot** en haut de la page.
3. Saisissez un nom pour le lot (par exemple « Offrande du dimanche - 5 janv. ») et sélectionnez la date. Cliquez sur **Enregistrer**.
4. Votre nouveau lot apparaît dans la liste, avec zéro don et 0,00 $.
5. Cliquez sur le **nom du lot** pour l'ouvrir.

## Saisir les dons individuels

1. Sur la page de détail du lot, le panneau de saisie des dons apparaît à côté de la liste des dons. Sous **Sélectionner une personne ou Anonyme**, saisissez le nom du donateur dans le champ de recherche pour le trouver, ou cliquez sur **Anonyme**. (Cliquer sur **Ajouter un don** en haut de la page vous amène directement à ce panneau.)
2. Après avoir sélectionné une personne, le formulaire de saisie affiche les champs **Date**, **Mode** (Chèque, Espèces, Carte ou En nature), **Fonds**, **Notes**, **Montant** et **N° de chèque** (ou **4 derniers chiffres** pour les dons par carte, ou **Article** pour décrire un don en nature). Cliquez sur **Modifier** à côté du nom du donateur pour choisir une autre personne.
3. Remplissez les détails et cliquez sur **Ajouter un don** (ou appuyez sur Entrée).
4. Le don est ajouté à la liste des dons, et le formulaire se réinitialise pour vous permettre de saisir le suivant.

:::info
Si le lot a été [fermé](batches.md#closing-and-reopening-a-batch), le panneau de saisie et les liens **Modifier** sont masqués pour quiconque ne dispose pas de l'autorisation **Modifier les dons**, et un avis en haut du lot indique qu'il est fermé. Demandez à une personne disposant de **Modifier les dons** de le rouvrir.
:::

:::tip
Vous pouvez saisir rapidement plusieurs dons à la suite sans quitter la page du lot. Le formulaire se réinitialise après chaque saisie, ce qui vous permet de parcourir efficacement une pile de chèques ou d'enveloppes.
:::

## Importer des dons depuis un fichier CSV {#importing-donations-from-a-csv-file}

Si vos dons sont déjà dans un tableur -- par exemple une exportation d'un autre système de dons ou la feuille de comptage d'une équipe -- vous pouvez les importer dans un lot au lieu de les saisir un à un.

1. Ouvrez le lot et cliquez sur **Importer un CSV** en haut de la page. (Le bouton apparaît lorsque vous pouvez modifier le lot et que votre église dispose d'au moins un [fonds](funds.md).)
2. Cliquez sur **Choisir un fichier CSV** et sélectionnez votre fichier. Le fichier doit comporter une ligne d'en-tête, et les colonnes peuvent être dans n'importe quel ordre :
   - **Montant** (obligatoire ; `Total` fonctionne aussi) -- Les symboles monétaires et les virgules sont ignorés, de sorte que `1 250,00 $` convient. Le montant doit être supérieur à zéro.
   - **Date** -- Utilisez un format comme `2026-10-25` ou `25/10/2026`. Si la cellule est vide, la date du lot est utilisée.
   - **Fonds** -- Le nom du fonds, reconnu sans tenir compte des majuscules. Si la cellule est vide, votre premier fonds est utilisé.
   - **Mode** -- **Chèque**, **Espèces**, **Carte** ou **En nature**. Si la cellule est vide, **Chèque** est utilisé.
   - **Numéro de chèque** -- Le numéro du chèque (ou un autre détail du paiement).
   - **Notes**
   - **Courriel**, **Nom**, ou **Prénom** et **Nom de famille** -- Utilisés pour associer le donateur à une personne de votre base de données. Un nom écrit « Tremblay, Jean » est lu comme « Jean Tremblay ».
3. Vérifiez l'aperçu. Chaque ligne affiche son numéro, le donateur indiqué dans le fichier, la **Correspondance**, le fonds et le montant :
   - Le nom d'une personne signifie que le donateur a été associé. B1 fait correspondre d'abord par courriel, puis par nom exact, et seulement lorsqu'une seule personne correspond.
   - **Introuvable -- anonyme** signifie qu'aucune correspondance unique n'a été trouvée. Le don est importé comme anonyme, et « Importé sous : » suivi du nom du donateur est ajouté à ses notes afin que vous puissiez l'attribuer plus tard.
   - Un message rouge tel que **Montant non valide**, **Fonds inconnu**, **Mode inconnu** ou **Date non valide** signifie que cette ligne sera ignorée. Corrigez le fichier et sélectionnez-le à nouveau pour l'inclure.
4. Cliquez sur **Importer** (le bouton indique le nombre de lignes qui seront importées). Les dons sont ajoutés au lot.

:::tip
Après l'importation, utilisez **Modifier** sur n'importe quel don anonyme pour choisir la bonne personne. La note « Importé sous : » vous indique de qui le fichier disait qu'il provenait.
:::

## Enregistrer un don depuis la fiche d'une personne

Pour enregistrer un seul don sans ouvrir de lot, ouvrez la fiche du donateur dans **Personnes** et cliquez sur **Enregistrer un don** (dans le résumé des dons ou dans la vue des dons de la personne).

1. Définissez la **Date** et le **Montant**.
2. Choisissez le **Fonds** et le **Mode** (Chèque, Espèces, Carte ou En nature), puis saisissez le **N° de chèque**, les **4 derniers chiffres** ou l'**Article** (pour les dons en nature), si nécessaire.
3. Ajoutez éventuellement des **Notes**, puis cliquez sur **Enregistrer**.

Le don est enregistré dans le lot de cette date. Si aucun lot n'existe encore pour cette date, un lot est créé automatiquement, nommé d'après la date.

## Répartir un don entre plusieurs fonds

Il arrive qu'un même donateur verse un don à plus d'un fonds dans une seule transaction. Pour gérer ce cas :

1. Sous le panneau de saisie, cliquez sur le lien **éditeur complet du don** (ou cliquez sur **Modifier** sur la ligne d'un don existant).
2. Dans l'éditeur complet, ajoutez des montants à différents fonds. Le total se calcule automatiquement à partir des montants de chaque fonds.
3. Cliquez sur **Enregistrer** pour mettre à jour le don.

:::info
La répartition d'un don entre plusieurs fonds est courante lorsqu'un donateur rédige un seul chèque destiné à plusieurs fins, par exemple le Fonds général et les Missions.
:::

## Modifier ou supprimer des dons

Pour modifier un don, cliquez sur le bouton **Modifier** sur sa ligne dans le lot. Vous pouvez changer la date, le montant, le fonds, le mode de paiement (Chèque, Espèces, Carte ou En nature), ou tout autre détail. Pour un don en nature, l'éditeur intitule le champ de détail **Article** afin que vous puissiez décrire ce qui a été donné. Cliquez sur **Enregistrer** lorsque vous avez terminé.

:::tip
La ligne sous le nom du lot, en haut de la page, se met à jour automatiquement pour afficher la date du lot, le nombre de dons et le montant total en dollars à mesure que vous ajoutez ou modifiez des entrées. Utilisez-la pour la rapprocher de votre bordereau de dépôt.
:::

## Rembourser un don

Si un donateur a été débité par erreur ou demande le remboursement de son argent, vous pouvez rembourser un don complété directement depuis son écran de modification, sans passer par le tableau de bord de votre passerelle de paiement.

1. Ouvrez le don et cliquez sur **Modifier**.
2. Cliquez sur le bouton **Rembourser** à côté de **Supprimer**, au bas du formulaire.
3. Confirmez la boîte de dialogue : « Rembourser ce don en totalité par la passerelle de paiement ? Cette action est irréversible. »

Le don est remboursé en totalité par la passerelle de paiement d'origine et marqué **Remboursé** dans vos listes de dons.

:::warning
Les remboursements ne peuvent être que totaux -- il n'est pas possible de rembourser un montant partiel depuis B1 Admin. Une fois confirmé, le remboursement ne peut pas non plus être annulé.
:::

:::info
Le bouton **Rembourser** n'apparaît que pour les dons payés en ligne (ils ont une transaction de passerelle) et qui sont encore au statut **Complété**. Les dons saisis manuellement (espèces, chèque) n'ont pas de transaction de passerelle à rembourser -- modifiez-les ou supprimez-les à la place.
:::

## Imprimer un reçu pour un seul don

Lorsqu'une personne remet un chèque, paie un événement ou un t-shirt, ou qu'un organisme de passage apporte un don, vous pouvez imprimer un reçu pour ce seul don, au lieu d'un lot complet ou d'un relevé de fin d'année.

1. Ouvrez le lot qui contient le don.
2. Cliquez sur **Reçu** à côté de **Modifier**, sur la ligne du don. Vous pouvez aussi cliquer sur **Reçu** au bas du formulaire de modification du don.
3. Cliquez sur **Imprimer**, ou sur **Fermer** pour revenir en arrière.

Le reçu utilise la même mise en page que le relevé de dons : votre église et le donateur (ou « Anonyme »), la date et le mode du don, chaque fonds et montant, la note, votre Note de dons, ainsi que le bloc de reçu officiel si vous avez défini un **Format du relevé** (voir [Relevés de dons](giving-statements.md)). Le numéro de reçu figurant dans ce bloc est l'identifiant du don.

:::info
La mention « aucun bien ni service » n'est imprimée que lorsque tous les fonds du don sont marqués comme déductibles d'impôt. Si une partie du don a été versée à un fonds non déductible, comme des frais d'événement ou un achat, le reçu omet cette mention afin de se lire comme un paiement plutôt que comme un don de bienfaisance.
:::

:::tip
Les dons en ligne reçoivent déjà un courriel de remerciement automatique ; le reçu est donc surtout utile pour les dons que vous saisissez à la main.
:::

## Étapes suivantes

- Vérifiez vos saisies à l'aide des [Rapports de dons](donation-reports.md) pour en confirmer l'exactitude
- En fin d'année, générez les [Relevés de dons](giving-statements.md) pour vos donateurs
