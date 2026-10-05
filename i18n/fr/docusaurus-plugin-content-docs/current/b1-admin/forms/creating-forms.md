---
title: "Créer des formulaires"
---

# Créer des formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour recueillir des informations auprès de votre congrégation. Vous pouvez créer des formulaires pour les inscriptions aux événements, les enquêtes, les cartes de visite, les demandes d'adhésion, et plus encore. Les formulaires peuvent être liés aux personnes de votre base de données ou utilisés comme pages autonomes avec leur propre URL publique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires **Personnes** (liés aux dossiers de personnes), vous avez besoin d'avoir [des personnes dans votre base de données](../people/adding-people.md) d'abord.
- Pour les formulaires qui collectent des **paiements**, vous devez avoir [Stripe configuré pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire

1. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **People**, et cliquez sur **Forms**.
2. Cliquez sur **Add Form**.
3. Entrez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante :
   - **People** — Associe les soumissions aux [dossiers de personnes](../people/adding-people.md) dans votre base de données.
   - **Stand Alone** — Crée un formulaire indépendant avec sa propre URL publique, idéal pour les inscriptions externes.
5. Cliquez sur **Save** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Imprimer un formulaire vierge

Vous avez besoin d'une copie papier à distribuer -- pour une carte de visite à l'accueil, ou un formulaire que quelqu'un sans accès Internet peut remplir à la main ? Cliquez sur l'**icône d'impression** à côté d'un formulaire dans la liste principale des formulaires pour ouvrir un aperçu, puis cliquez sur **Print**. Les champs vierges s'impriment avec un trait de soulignement ou une case à cocher pour chaque question afin que les gens puissent les remplir à la main ; les questions requises sont marquées d'un astérisque. Le nom de votre église s'imprime en haut au-dessus du nom du formulaire. Il n'y a pas d'autres options d'impression -- imprimez le formulaire complet ou rien.

## Ajouter des questions

1. Ouvrez votre formulaire et allez à l'onglet **Questions**.
2. Cliquez sur **Add Question**.
3. Sélectionnez un **type de champ** dans la liste déroulante Provider. Les types disponibles incluent :
   - **Textbox** — Pour les réponses de texte court
   - **Date** — Pour les sélections de date
   - **Email** — Pour les adresses email
   - **Phone Number** — Pour l'entrée téléphonique
   - **Multiple Choice** — Pour sélectionner parmi des options prédéfinies
   - **Payment** — Pour collecter les paiements
4. Entrez un **Title** et une **Description** optionnelle pour la question.
5. Cochez **Require an answer** si le champ est obligatoire.
6. Cliquez sur **Save**.
7. Répétez pour ajouter d'autres questions.

:::warning
Le type de champ **Payment** nécessite que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Online Giving Setup](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Gérer les membres du formulaire

1. Ouvrez votre formulaire et allez à l'onglet **Form Members**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Admin** — Peut modifier le formulaire et consulter toutes les soumissions.
   - **View Only** — Peut consulter les soumissions mais ne peut pas modifier le formulaire.

## Ajouter automatiquement les soumetteurs à un groupe

Quand **Create a person record from submissions** est activé, vous pouvez également lier le formulaire à un groupe pour que chaque soumetteur soit ajouté automatiquement à la liste du groupe :

1. Ouvrez le **Details** de votre formulaire, et activez **Create a person record from submissions**.
2. Sous **Add submitters to a group**, sélectionnez le groupe auquel ajouter les soumetteurs, ou laissez-le défini sur **None**.
3. Cliquez sur **Save**.

Chaque fois que quelqu'un soumet le formulaire, la personne appariée ou nouvellement créée est ajoutée au groupe (les membres existants du groupe sont ignorés). Ceci est utile pour des choses comme un formulaire d'inscription à un camp qui devrait automatiquement construire la liste du groupe du camp.

### Envoyer un email de suivi

Avec **Create a person record from submissions** activé, vous pouvez également envoyer un email à chaque personne qui soumet le formulaire. Remplissez **Follow-up Email Subject** et **Follow-up Email Body** dans les détails du formulaire. Vous pouvez utiliser les jetons `{firstName}` et `{churchName}` dans les deux. L'email n'est envoyé que lorsque les deux champs sont remplis.

:::info
Les emails de suivi ne sont envoyés qu'après que votre église a été approuvée pour envoyer des emails de groupe, et ils comptent dans la limite d'emails quotidiens de votre église. Voir [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Dupliquer un formulaire

Pour réutiliser un formulaire comme point de départ pour un nouveau, cliquez sur l'**icône Duplicate** (icône de copie) à côté du formulaire dans la liste des formulaires. B1 crée une copie exacte du formulaire — y compris toutes les questions — que vous pouvez ensuite renommer et modifier indépendamment.

:::tip
La duplication est pratique pour les événements récurrents où les questions d'inscription restent les mêmes d'année en année. Dupliquez le formulaire de l'année dernière, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configuration des propriétés du formulaire

Vous pouvez mettre à jour le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires Stand Alone, vous verrez également une **URL publique** unique que vous pouvez partager avec n'importe qui, ainsi qu'un champ **Description** -- texte affiché au-dessus des questions sur la page de formulaire public, utile pour dire aux gens à quoi sert le formulaire avant qu'ils commencent à le remplir.

Utilisez le champ **Thank You Message** pour définir ce que les gens voient après avoir soumis le formulaire, y compris sur la page d'URL publique du formulaire. Si vous le laissez vide, ils voient « Thank you for submitting the form! »

:::tip
Les formulaires Stand Alone sont parfaits pour les inscriptions aux événements. Partagez l'URL publique par email, sur les réseaux sociaux ou intégrez le formulaire directement sur le site web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site web B1, allez dans votre éditeur de site web, ajoutez une nouvelle section, et sélectionnez l'élément **Form**. Ensuite, choisissez le formulaire que vous voulez afficher. Voir [Managing Pages](../website/managing-pages.md) pour plus de détails sur l'édition de votre site web.
:::
