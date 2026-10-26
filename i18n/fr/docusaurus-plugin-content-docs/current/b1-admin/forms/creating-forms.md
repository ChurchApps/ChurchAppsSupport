---
title: "Créer des formulaires"
---

# Créer des formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour recueillir des informations auprès de votre congrégation. Vous pouvez créer des formulaires pour les inscriptions à des événements, les sondages, les fiches de visiteurs, les demandes d'adhésion, et bien plus encore. Les formulaires peuvent être liés aux personnes de votre base de données ou utilisés comme pages autonomes disposant de leur propre URL publique.

</div>

## Vidéo de formation

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires **People** (liés aux fiches de personnes), vous devez d'abord avoir [des personnes dans votre base de données](../people/adding-people.md).
- Pour les formulaires qui recueillent des **paiements**, vous devez avoir [configuré Stripe pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **People**, puis cliquez sur **Forms**.
2. Cliquez sur **Add Form**.
3. Saisissez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante **Associate With** :
   - **People** — Associe les réponses aux [fiches de personnes](../people/adding-people.md) de votre base de données. Les formulaires People sont remplis à partir de la fiche d'une personne, ils n'ont donc pas de lien partageable.
   - **Stand Alone** — Crée un formulaire indépendant avec sa propre URL publique, idéal pour les inscriptions externes. Seuls les formulaires Stand Alone proposent une [photo d'en-tête](#adding-a-header-photo), un [code QR](#sharing-a-form-with-a-qr-code), un [groupe lié](#linking-a-form-to-a-group) et l'option **Create a person record from submissions**.
5. Cliquez sur **Save** pour créer le formulaire.

Votre nouveau formulaire apparaît dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Imprimer un formulaire vierge {#printing-a-blank-form}

Vous avez besoin d'une copie papier à distribuer, par exemple une fiche de visiteur à l'accueil, ou un formulaire que quelqu'un sans accès à Internet peut remplir à la main ? Cliquez sur **Print** à côté d'un formulaire dans la liste principale des Forms pour ouvrir un aperçu, puis cliquez sur **Print**. Les champs vides s'impriment avec un trait de soulignement ou une case à cocher pour chaque question afin que les personnes puissent les remplir à la main ; les questions obligatoires sont marquées d'un astérisque. En haut de la page figurent le logo de votre église (le **Light Background Logo** de [Website > Appearance](../website/appearance.md), si vous en avez téléversé un) accompagné du nom de votre église, puis le nom du formulaire. Il n'existe pas d'autres options d'impression : vous imprimez le formulaire entier ou rien.

## Partager un formulaire avec un code QR {#sharing-a-form-with-a-qr-code}

Les formulaires Stand Alone ont un lien **QR Code** à côté d'eux dans la liste principale des Forms (les formulaires archivés n'en ont pas). Cliquez dessus pour ouvrir un code QR menant à l'URL publique du formulaire, avec le lien affiché en dessous. Cliquez sur **Download PNG** pour enregistrer le code sous forme d'image que vous pourrez imprimer sur les bulletins ou afficher sur les diapositives. Quiconque le scanne ouvre le formulaire sur son téléphone.

## Ajouter des questions {#adding-questions}

1. Ouvrez votre formulaire et accédez à l'onglet **Questions**.
2. Cliquez sur **Add Question**.
3. Sélectionnez un **field type** dans la liste déroulante Provider. Les types disponibles incluent :
   - **Textbox** — Pour de courtes réponses textuelles
   - **Date** — Pour la sélection de dates
   - **Email** — Pour les adresses courriel
   - **Phone Number** — Pour la saisie d'un numéro de téléphone
   - **Multiple Choice** — Pour choisir parmi des options prédéfinies
   - **Payment** — Pour recueillir des paiements
4. Saisissez un **Title** et une **Description** facultative pour la question. La description apparaît sous la question lorsque les personnes remplissent le formulaire ; utilisez-la pour donner des indications comme « Indiquez les allergies que nous devrions connaître. »
5. Cochez **Require an answer** si le champ est obligatoire.
6. Cliquez sur **Save**.
7. Répétez l'opération pour ajouter d'autres questions.

:::warning
Le type de champ **Payment** nécessite que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Gérer les membres du formulaire {#managing-form-members}

1. Ouvrez votre formulaire et accédez à l'onglet **Form Members**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Admin** — Peut modifier le formulaire et consulter toutes les réponses.
   - **View Only** — Peut consulter les réponses mais ne peut pas modifier le formulaire.

## Lier un formulaire à un groupe {#linking-a-form-to-a-group}

Vous pouvez lier n'importe quel formulaire Stand Alone à un groupe, par exemple un formulaire de demande de prière pour un petit groupe, ou une autorisation médicale pour un voyage de jeunes :

1. Ouvrez les **Details** de votre formulaire.
2. Sous **Linked group**, sélectionnez le groupe, ou laissez la valeur **None**.
3. Cliquez sur **Save**.

Une fois le formulaire lié :

- **Les membres du groupe** voient le formulaire dans une section **Forms** de la page du groupe sur B1.church tant que le formulaire est ouvert, avec un bouton **Fill out** qui l'ouvre (voir [Détails du groupe](../../b1-church/groups/group-details.md#linked-forms)).
- **Les responsables du groupe** voient aussi les formulaires fermés, et peuvent lire les réponses de chaque envoi et les imprimer (un envoi ou **Print all**). Les responsables peuvent seulement consulter les réponses : ils ne peuvent pas modifier le formulaire, sauf s'ils sont également [membres du formulaire](#managing-form-members).
- **Dans B1 Admin**, la page du groupe affiche une section **Linked forms** qui liste chaque formulaire lié avec le statut **Open** ou **Closed**. Elle est visible pour les responsables du groupe et pour les personnes pouvant administrer les formulaires. Voir [Membres du groupe](../groups/group-members.md#linked-forms).

Un formulaire est fermé lorsqu'il se trouve en dehors de sa période de disponibilité. Les formulaires archivés ne sont pas affichés sur la page du groupe.

### Ajouter automatiquement les personnes qui envoient un formulaire à un groupe {#automatically-adding-submitters-to-a-group}

Lier un formulaire à un groupe n'ajoute personne au groupe par lui-même. Pour ajouter chaque personne ayant envoyé le formulaire à la liste du groupe lié, activez également **Create a person record from submissions** dans les détails du formulaire, puis cliquez sur **Save**.

Chaque fois qu'une personne envoie le formulaire, la personne correspondante ou nouvellement créée est ajoutée au groupe (les membres déjà présents sont ignorés). C'est utile, par exemple, pour un formulaire d'inscription à un camp qui doit créer automatiquement la liste du groupe du camp.

### Envoyer un courriel de suivi

Lorsque **Create a person record from submissions** est activé, vous pouvez également envoyer un courriel à chaque personne qui envoie le formulaire. Renseignez **Follow-up Email Subject** et **Follow-up Email Body** dans les détails du formulaire. Vous pouvez utiliser les jetons `{firstName}` et `{churchName}` dans les deux champs. Le courriel n'est envoyé que si les deux champs sont remplis.

:::info
Les courriels de suivi ne sont envoyés qu'après que votre église a été approuvée pour envoyer des courriels de groupe, et ils comptent dans la limite quotidienne de courriels de votre église. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Dupliquer un formulaire

Pour réutiliser un formulaire comme point de départ d'un nouveau formulaire, cliquez sur **Duplicate** à côté du formulaire dans la liste des Forms, puis confirmez. B1 crée une copie exacte du formulaire, y compris toutes les questions, que vous pouvez ensuite renommer et modifier indépendamment.

:::tip
La duplication est pratique pour les événements récurrents dont les questions d'inscription restent les mêmes d'une année à l'autre. Dupliquez le formulaire de l'année précédente, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configurer les propriétés du formulaire

Vous pouvez modifier le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires Stand Alone, vous verrez également une **URL publique** unique que vous pouvez partager avec n'importe qui, ainsi qu'un champ **Description**, c'est-à-dire un texte affiché au-dessus des questions sur la page publique du formulaire, utile pour expliquer aux personnes à quoi sert le formulaire avant qu'elles ne le remplissent.

### Ajouter une photo d'en-tête {#adding-a-header-photo}

Les formulaires Stand Alone peuvent afficher une **Header Photo** en haut du formulaire. Dans les détails du formulaire, cliquez sur la zone de la photo ou sur **Add Photo**, puis choisissez ou téléversez une image (elle est recadrée au format 16:9). Cliquez sur **Save**. La photo apparaît sous le nom du formulaire, au-dessus de la description, sur la page de l'URL publique du formulaire et partout où le formulaire est intégré avec l'élément **Form** du site web. Utilisez **Change Photo** pour la remplacer ou **Remove** pour la supprimer.

Utilisez le champ **Thank You Message** pour définir ce que les personnes voient après l'envoi du formulaire, y compris sur la page de l'URL publique du formulaire. Si vous le laissez vide, elles voient « Thank you for submitting the form! »

:::tip
Les formulaires Stand Alone sont idéaux pour les inscriptions à des événements. Partagez l'URL publique par courriel, sur les réseaux sociaux, ou intégrez directement le formulaire sur le site web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site B1, accédez à l'éditeur de votre site web, ajoutez une nouvelle section et sélectionnez l'élément **Form**. Choisissez ensuite le formulaire à afficher. Consultez [Gérer les pages](../website/managing-pages.md) pour plus de détails sur la modification de votre site web.
:::
