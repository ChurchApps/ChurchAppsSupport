---
title: "Créer des formulaires"
description: "Créez des formulaires personnalisés dans B1 Admin pour les inscriptions aux événements, les sondages et les cartes de visiteurs, puis partagez-les par lien, code QR ou impression."
---

# Créer des formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour recueillir des informations auprès de votre congrégation. Vous pouvez créer des formulaires pour les inscriptions à des événements, les sondages, les cartes de visiteurs, les demandes d'adhésion, et bien plus. Les formulaires peuvent être liés à des personnes de votre base de données ou utilisés comme pages autonomes avec leur propre URL publique.

</div>

## Vidéo de formation

<YouTube id="sr9wxEj9ghQ" title="Créer des formulaires et gérer les soumissions dans B1" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires **Personnes** (liés aux fiches de personnes), vous devez d'abord avoir [des personnes dans votre base de données](../people/adding-people.md).
- Pour les formulaires qui recueillent des **paiements**, vous devez avoir [configuré Stripe pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire

1. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, et cliquez sur **Formulaires**.
2. Cliquez sur **Ajouter un formulaire**.
3. Saisissez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante **Associer à** :
   - **Personnes** — Associe les soumissions aux [fiches de personnes](../people/adding-people.md) de votre base de données. Les formulaires Personnes sont remplis à partir de la fiche d'une personne, ils n'ont donc pas de lien partageable.
   - **Autonome** — Crée un formulaire indépendant avec sa propre URL publique, idéal pour les inscriptions externes. Seuls les formulaires Autonomes proposent une [photo d'en-tête](#adding-a-header-photo), un [code QR](#sharing-a-form-with-a-qr-code), un [groupe lié](#linking-a-form-to-a-group) et **Créer une fiche de personne à partir des soumissions**.
5. Cliquez sur **Enregistrer** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Imprimer un formulaire vierge {#printing-a-blank-form}

Vous avez besoin d'une copie papier à distribuer -- pour une carte de visiteur au bureau d'accueil, ou un formulaire qu'une personne sans accès à Internet peut remplir à la main ? Cliquez sur **Imprimer** à côté d'un formulaire dans la liste principale des Formulaires pour ouvrir un aperçu, puis cliquez sur **Imprimer**. Les champs vides s'impriment avec un soulignement ou une case pour chaque question afin que les personnes puissent les remplir à la main ; les questions obligatoires sont marquées d'un astérisque. En haut de la page figure le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de votre église en dessous, puis le nom du formulaire. Il n'y a pas d'autre option d'impression -- imprimez le formulaire entier ou rien.

## Partager un formulaire avec un code QR {#sharing-a-form-with-a-qr-code}

Les formulaires Autonomes ont un lien **Code QR** à côté d'eux dans la liste principale des Formulaires (les formulaires archivés n'en ont pas). Cliquez dessus pour ouvrir un code QR pour l'URL publique du formulaire, avec le lien affiché en dessous. Cliquez sur **Télécharger le PNG** pour enregistrer le code sous forme d'image que vous pouvez imprimer sur les bulletins ou afficher sur des diapositives. Quiconque le scanne ouvre le formulaire sur son téléphone.

## Ajouter des questions {#adding-questions}

1. Ouvrez votre formulaire et allez dans l'onglet **Questions**.
2. Cliquez sur **Ajouter une question**.
3. Sélectionnez un **type de champ** dans la liste déroulante Fournisseur. Les types disponibles comprennent :
   - **Zone de texte** — Pour de courtes réponses textuelles
   - **Date** — Pour sélectionner une date
   - **Courriel** — Pour les adresses courriel
   - **Numéro de téléphone** — Pour la saisie d'un téléphone
   - **Choix multiple** — Pour choisir parmi des options prédéfinies
   - **Paiement** — Pour encaisser des paiements
4. Saisissez un **titre** et une **description** facultative pour la question. La description apparaît sous la question lorsque les personnes remplissent le formulaire ; utilisez-la pour donner des indications comme « Indiquez les allergies que nous devrions connaître ».
5. Cochez **Exiger une réponse** si le champ est obligatoire.
6. Cliquez sur **Enregistrer**.
7. Répétez pour ajouter d'autres questions.

:::warning
Le type de champ **Paiement** exige que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement. Les personnes qui paient sur un formulaire sans se connecter doivent cocher la case **Je ne suis pas un robot** avant que la carte soit acceptée.
:::

## Gérer les membres du formulaire {#managing-form-members}

1. Ouvrez votre formulaire et allez dans l'onglet **Membres du formulaire**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Administrateur** — Peut modifier le formulaire et voir toutes les soumissions.
   - **Consultation seulement** — Peut voir les soumissions mais ne peut pas modifier le formulaire.

## Lier un formulaire à un groupe {#linking-a-form-to-a-group}

Vous pouvez lier n'importe quel formulaire Autonome à un groupe -- par exemple, un formulaire de demandes de prière pour un petit groupe, ou une autorisation médicale pour un voyage de jeunes :

1. Ouvrez les **Détails** de votre formulaire.
2. Sous **Groupe lié**, sélectionnez le groupe, ou laissez la valeur sur **Aucun**.
3. Cliquez sur **Enregistrer**.

Une fois un formulaire lié :

- **Les membres du groupe** voient le formulaire dans une section **Formulaires** sur la page du groupe sur B1.church tant que le formulaire est ouvert, avec un bouton **Remplir** qui l'ouvre (voir [Détails du groupe](../../b1-church/groups/group-details.md#linked-forms)).
- **Les responsables de groupe** voient aussi les formulaires fermés, et peuvent lire les réponses de chaque soumission et les imprimer (une soumission ou **Tout imprimer**). Les responsables ne peuvent que consulter les réponses -- ils ne peuvent pas modifier le formulaire, sauf s'ils sont aussi [membres du formulaire](#managing-form-members).
- **Dans B1 Admin**, la page du groupe affiche une section **Formulaires liés** qui énumère chaque formulaire lié comme **Ouvert** ou **Fermé**. Elle apparaît pour les responsables du groupe et pour les personnes qui peuvent administrer les formulaires. Voir [Membres du groupe](../groups/group-members.md#linked-forms).

Un formulaire est fermé lorsqu'il se trouve hors de sa période de disponibilité. Les formulaires archivés ne sont pas affichés sur la page du groupe.

### Ajouter automatiquement les personnes qui soumettent au groupe {#automatically-adding-submitters-to-a-group}

Lier un formulaire à un groupe n'ajoute personne au groupe à lui seul. Pour ajouter chaque personne qui soumet le formulaire à la liste du groupe lié, activez aussi **Créer une fiche de personne à partir des soumissions** dans les détails du formulaire et cliquez sur **Enregistrer**.

Chaque fois qu'une personne soumet le formulaire, la personne trouvée ou nouvellement créée est ajoutée au groupe (les membres déjà présents sont ignorés). C'est utile, par exemple, pour un formulaire d'inscription à un camp qui doit créer automatiquement le groupe-liste du camp.

### Envoyer un courriel de suivi {#sending-a-follow-up-email}

Lorsque **Créer une fiche de personne à partir des soumissions** est activé, vous pouvez aussi envoyer un courriel à chaque personne qui soumet le formulaire. Remplissez **Objet du courriel de suivi** et **Corps du courriel de suivi** dans les détails du formulaire. Vous pouvez utiliser les jetons `{firstName}` et `{churchName}` dans les deux. Le courriel n'est envoyé que lorsque les deux champs sont remplis.

:::info
Les courriels de suivi ne sont envoyés qu'après l'approbation de votre église pour envoyer des courriels de groupe, et ils comptent dans la limite quotidienne de courriels de votre église. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Dupliquer un formulaire

Pour réutiliser un formulaire comme point de départ pour un nouveau, cliquez sur **Dupliquer** à côté du formulaire dans la liste des Formulaires, puis confirmez. B1 crée une copie exacte du formulaire -- y compris toutes les questions -- que vous pouvez ensuite renommer et modifier indépendamment.

:::tip
La duplication est pratique pour les événements récurrents dont les questions d'inscription restent les mêmes d'une année à l'autre. Dupliquez le formulaire de l'année précédente, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configurer les propriétés du formulaire

Vous pouvez modifier le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires Autonomes, vous verrez aussi une **URL publique** unique que vous pouvez partager avec n'importe qui, ainsi qu'un champ **Description** -- un texte affiché au-dessus des questions sur la page publique du formulaire, utile pour expliquer à quoi sert le formulaire avant que les personnes ne commencent à le remplir.

### Ajouter une photo d'en-tête {#adding-a-header-photo}

Les formulaires Autonomes peuvent afficher une **Photo d'en-tête** en haut du formulaire. Dans les détails du formulaire, cliquez sur la case photo ou sur **Ajouter une photo**, puis choisissez ou téléversez une image (elle est recadrée au format 16:9). Cliquez sur **Enregistrer**. La photo apparaît sous le nom du formulaire, au-dessus de la description, sur la page de l'URL publique du formulaire et partout où le formulaire est intégré avec l'élément **Formulaire** du site web. Utilisez **Changer la photo** pour la remplacer ou **Supprimer** pour la retirer.

Utilisez le champ **Message de remerciement** pour définir ce que les personnes voient après avoir soumis le formulaire, y compris sur la page de l'URL publique du formulaire. S'il est laissé vide, elles voient « Merci d'avoir soumis le formulaire! ».

:::tip
Les formulaires Autonomes sont parfaits pour les inscriptions à des événements. Partagez l'URL publique par courriel, sur les réseaux sociaux, ou intégrez directement le formulaire sur le site web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site web B1, allez dans l'éditeur de votre site web, ajoutez une nouvelle section et sélectionnez l'élément **Formulaire**. Choisissez ensuite le formulaire à afficher. Voir [Gérer les pages](../website/managing-pages.md) pour plus de détails sur la modification de votre site web.
:::
