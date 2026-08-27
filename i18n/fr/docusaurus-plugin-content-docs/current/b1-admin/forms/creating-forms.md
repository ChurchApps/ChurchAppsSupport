---
title: "Création de formulaires"
---

# Création de formulaires

<div class="article-intro">

Construisez des formulaires personnalisés pour collecter des informations de votre congrégation. Vous pouvez créer des formulaires pour les enregistrements aux événements, les sondages, les cartes de visiteurs, les demandes d'adhésion et bien plus. Les formulaires peuvent être liés aux personnes de votre base de données ou utilisés comme pages autonomes avec leur propre URL publique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires **Personnes** (liés aux dossiers de personne), vous avez besoin de [personnes dans votre base de données](../people/adding-people.md) d'abord.
- Pour les formulaires qui collectent **les paiements**, vous devez avoir [Stripe configuré pour la donation en ligne](../donations/online-giving-setup.md).

</div>

## Création d'un nouveau formulaire

1. Naviguez vers **Formulaires** à partir du menu principal.
2. Cliquez sur **Ajouter un formulaire**.
3. Entrez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante :
   - **Personnes** — Associe les soumissions aux [dossiers de personnes](../people/adding-people.md) de votre base de données.
   - **Autonome** — Crée un formulaire indépendant avec sa propre URL publique, idéal pour les enregistrements externes.
5. Cliquez sur **Enregistrer** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Ajout de questions

1. Ouvrez votre formulaire et allez à l'onglet **Questions**.
2. Cliquez sur **Ajouter une question**.
3. Sélectionnez un **type de champ** dans la liste déroulante Fournisseur. Les types disponibles incluent :
   - **Textbox** — Pour les réponses de texte court
   - **Date** — Pour les sélections de date
   - **E-mail** — Pour les adresses e-mail
   - **Numéro de téléphone** — Pour l'entrée de téléphone
   - **Choix multiples** — Pour sélectionner parmi des options prédéfinies
   - **Paiement** — Pour collecter les paiements
4. Entrez un **Titre** et une **Description** optionnelle pour la question.
5. Cochez **Demander une réponse** si le champ est obligatoire.
6. Cliquez sur **Enregistrer**.
7. Répétez pour ajouter plus de questions.

:::warning
Le type de champ **Paiement** nécessite que Stripe soit configuré. Si vous n'avez pas encore configuré la donation en ligne, consultez [Configuration de la donation en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Gestion des membres du formulaire

1. Ouvrez votre formulaire et allez à l'onglet **Membres**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Admin** — Peut modifier le formulaire et afficher toutes les soumissions.
   - **Affichage uniquement** — Peut afficher les soumissions mais ne peut pas modifier le formulaire.

## Ajout automatique des auteurs de soumission à un groupe

Lorsque **Créer un dossier de personne à partir des soumissions** est activé, vous pouvez également lier le formulaire à un groupe afin que chaque auteur de soumission soit automatiquement ajouté à la liste du groupe :

1. Ouvrez les **Détails** de votre formulaire et activez **Créer un dossier de personne à partir des soumissions**.
2. Sous **Ajouter les auteurs de soumission à un groupe**, sélectionnez le groupe auquel ajouter les auteurs de soumission, ou laissez-le défini sur **Aucun**.
3. Cliquez sur **Enregistrer**.

Chaque fois que quelqu'un soumet le formulaire, la personne appariée ou nouvellement créée est ajoutée au groupe (les membres existants du groupe sont ignorés). Ceci est utile pour des choses comme un formulaire d'inscription à un camp qui devrait construire automatiquement le groupe de liste du camp.

## Duplication d'un formulaire

Pour réutiliser un formulaire comme point de départ pour un nouveau, cliquez sur l'icône **Dupliquer** (icône de copie) en regard du formulaire dans la liste Formulaires. B1 crée une copie exacte du formulaire -- y compris toutes les questions -- que vous pouvez ensuite renommer et modifier indépendamment.

:::tip
La duplication est pratique pour les événements récurrents où les questions d'enregistrement restent les mêmes d'année en année. Dupliquez le formulaire de l'année dernière, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configuration des propriétés du formulaire

Vous pouvez mettre à jour le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires autonomes, vous verrez également une **URL publique** unique que vous pouvez partager avec n'importe qui.

:::tip
Les formulaires autonomes sont parfaits pour les enregistrements aux événements. Partagez l'URL publique par e-mail, sur les médias sociaux, ou intégrez le formulaire directement sur votre site web ecclésial.
:::

:::info
Pour intégrer un formulaire sur votre site web B1, allez à votre éditeur de site web, ajoutez une nouvelle section et sélectionnez l'élément **Formulaire**. Ensuite, choisissez le formulaire que vous souhaitez afficher. Consultez [Gestion des pages](../website/managing-pages.md) pour plus de détails sur l'édition de votre site web.
:::
