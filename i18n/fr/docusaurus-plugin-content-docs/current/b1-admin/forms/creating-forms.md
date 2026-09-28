---
title: "Créer des Formulaires"
---

# Créer des Formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour collecter des informations auprès de votre congrégation. Vous pouvez créer des formulaires pour les inscriptions à des événements, les sondages, les cartes de visiteurs, les demandes d'adhésion, etc. Les formulaires peuvent être liés aux personnes dans votre base de données ou utilisés comme des pages autonomes avec leur propre URL publique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires **Personnes** (liés aux dossiers de personnes), vous avez besoin de [personnes dans votre base de données](../people/adding-people.md) d'abord.
- Pour les formulaires qui collectent des **paiements**, vous devez avoir [Stripe configuré pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire

1. Ouvrez **Personnes** à partir du menu de section, puis cliquez sur **Formulaires** dans la barre de navigation.
2. Cliquez sur **Ajouter un Formulaire**.
3. Entrez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante :
   - **Personnes** — Associe les soumissions aux [dossiers de personnes](../people/adding-people.md) dans votre base de données.
   - **Autonome** — Crée un formulaire indépendant avec sa propre URL publique, idéal pour les inscriptions externes.
5. Cliquez sur **Enregistrer** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Impression d'un formulaire vierge

Besoin d'une copie papier à distribuer -- pour une carte de visiteur à l'accueil, ou un formulaire que quelqu'un sans accès à Internet peut remplir à la main ? Cliquez sur l'**icône d'impression** à côté d'un formulaire sur la liste principale des Formulaires pour ouvrir un aperçu, puis cliquez sur **Imprimer**. Les champs vierges sont imprimés avec un tiret ou une case à cocher pour chaque question afin que les gens puissent les remplir à la main ; les questions obligatoires sont marquées d'un astérisque. Il n'y a pas d'autres options d'impression -- imprimez le formulaire entier ou rien.

## Ajouter des questions

1. Ouvrez votre formulaire et allez à l'onglet **Questions**.
2. Cliquez sur **Ajouter une Question**.
3. Sélectionnez un **type de champ** dans la liste déroulante Provider. Les types disponibles incluent :
   - **Zone de texte** — Pour les réponses en texte court
   - **Date** — Pour les sélections de date
   - **Email** — Pour les adresses e-mail
   - **Numéro de téléphone** — Pour l'entrée de téléphone
   - **Choix multiple** — Pour sélectionner parmi les options prédéfinies
   - **Paiement** — Pour collecter les paiements
4. Entrez un **Titre** et une **Description** optionnelle pour la question.
5. Cochez **Exiger une réponse** si le champ est obligatoire.
6. Cliquez sur **Enregistrer**.
7. Répétez pour ajouter d'autres questions.

:::warning
Le type de champ **Paiement** nécessite que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Gérer les membres du formulaire

1. Ouvrez votre formulaire et allez à l'onglet **Membres**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Admin** — Peut éditer le formulaire et consulter tous les soumissions.
   - **Affichage uniquement** — Peut consulter les soumissions mais ne peut pas éditer le formulaire.

## Ajouter automatiquement les soumissionnaires à un groupe

Quand **Créer un enregistrement de personne à partir des soumissions** est activé, vous pouvez également lier le formulaire à un groupe afin que chaque soumissionnaire soit ajouté au registre du groupe automatiquement :

1. Ouvrez les **Détails** de votre formulaire, et activez **Créer un enregistrement de personne à partir des soumissions**.
2. Sous **Ajouter les soumissionnaires à un groupe**, sélectionnez le groupe auquel ajouter les soumissionnaires, ou laissez-le défini sur **Aucun**.
3. Cliquez sur **Enregistrer**.

Chaque fois que quelqu'un soumet le formulaire, la personne correspondante ou nouvellement créée est ajoutée au groupe (les membres existants du groupe sont ignorés). Ceci est utile pour des choses comme un formulaire d'inscription à un camp qui devrait construire automatiquement le groupe du registre du camp.

### Envoyer un E-mail de suivi

Avec **Créer un enregistrement de personne à partir des soumissions** activé, vous pouvez également envoyer un e-mail à chaque personne qui soumet le formulaire. Remplissez **Objet du suivi par e-mail** et **Corps du suivi par e-mail** dans les détails du formulaire. Vous pouvez utiliser les jetons `{firstName}` et `{churchName}` dans les deux. L'e-mail n'est envoyé que lorsque les deux champs sont remplis.

:::info
Les e-mails de suivi ne sont envoyés que après que votre église ait été approuvée pour envoyer des e-mails de groupe, et ils comptent vers la limite d'e-mails quotidienne de votre église. Voir [Activation de l'E-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Dupliquer un formulaire

Pour réutiliser un formulaire comme point de départ pour un nouveau, cliquez sur l'icône **Dupliquer** (icône de copie) à côté du formulaire dans la liste Formulaires. B1 crée une copie exacte du formulaire -- y compris toutes les questions -- que vous pouvez ensuite renommer et éditer indépendamment.

:::tip
La duplication est pratique pour les événements récurrents où les questions d'inscription restent les mêmes d'année en année. Dupliquez le formulaire de l'année dernière, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configuration des propriétés du formulaire

Vous pouvez mettre à jour le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires Autonomes, vous verrez également une **URL publique** unique que vous pouvez partager avec n'importe qui, ainsi qu'un champ **Description** -- texte affiché au-dessus des questions sur la page du formulaire public, utile pour dire aux gens à quoi sert le formulaire avant qu'ils ne commencent à le remplir.

:::tip
Les formulaires autonomes sont excellents pour les inscriptions à des événements. Partagez l'URL publique par e-mail, les réseaux sociaux, ou intégrez le formulaire directement sur le site Web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site Web B1, allez à votre éditeur de site Web, ajoutez une nouvelle section et sélectionnez l'élément **Formulaire**. Ensuite, choisissez le formulaire que vous souhaitez afficher. Voir [Gestion des pages](../website/managing-pages.md) pour les détails sur l'édition de votre site Web.
:::
