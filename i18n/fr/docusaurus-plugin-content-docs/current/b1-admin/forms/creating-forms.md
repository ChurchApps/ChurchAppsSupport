---
title: "Créer des formulaires"
---

# Créer des formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour collecter des informations auprès de votre communauté. Vous pouvez créer des formulaires pour les inscriptions aux événements, les sondages, les fiches visiteurs, les demandes d'adhésion, et bien plus encore. Les formulaires peuvent être liés à des personnes de votre base de données ou utilisés comme pages autonomes avec leur propre URL publique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires de type **Personnes** (liés aux fiches de personnes), vous devez d'abord avoir des [personnes dans votre base de données](../people/adding-people.md).
- Pour les formulaires qui collectent des **paiements**, vous devez avoir [Stripe configuré pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire

1. Accédez à **Formulaires** depuis le menu principal.
2. Cliquez sur **Ajouter un formulaire**.
3. Saisissez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans le menu déroulant :
   - **Personnes** — Associe les soumissions aux [fiches de personnes](../people/adding-people.md) de votre base de données.
   - **Autonome** — Crée un formulaire indépendant avec sa propre URL publique, idéal pour les inscriptions externes.
5. Cliquez sur **Enregistrer** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Ajouter des questions

1. Ouvrez votre formulaire et allez dans l'onglet **Questions**.
2. Cliquez sur **Ajouter une question**.
3. Sélectionnez un **type de champ** dans le menu déroulant du fournisseur. Les types disponibles comprennent :
   - **Zone de texte** — Pour les réponses en texte court
   - **Date** — Pour les sélections de dates
   - **E-mail** — Pour les adresses e-mail
   - **Numéro de téléphone** — Pour la saisie de numéros de téléphone
   - **Choix multiple** — Pour sélectionner parmi des options prédéfinies
   - **Paiement** — Pour collecter des paiements
4. Saisissez un **Titre** et une **Description** facultative pour la question.
5. Cochez **Réponse obligatoire** si le champ est obligatoire.
6. Cliquez sur **Enregistrer**.
7. Répétez l'opération pour ajouter d'autres questions.

:::warning
Le type de champ **Paiement** nécessite que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Gérer les membres du formulaire

1. Ouvrez votre formulaire et allez dans l'onglet **Membres**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Administrateur** — Peut modifier le formulaire et consulter toutes les soumissions.
   - **Lecture seule** — Peut consulter les soumissions mais ne peut pas modifier le formulaire.

## Configurer les propriétés du formulaire

Vous pouvez mettre à jour le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires autonomes, vous verrez également une **URL publique** unique que vous pouvez partager avec n'importe qui.

:::tip
Les formulaires autonomes sont parfaits pour les inscriptions aux événements. Partagez l'URL publique par e-mail, sur les réseaux sociaux ou intégrez le formulaire directement sur le site web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site web B1, allez dans l'éditeur de votre site web, ajoutez une nouvelle section et sélectionnez l'élément **Formulaire**. Choisissez ensuite le formulaire que vous souhaitez afficher. Consultez [Gérer les pages](../website/managing-pages.md) pour plus de détails sur la modification de votre site web.
:::
