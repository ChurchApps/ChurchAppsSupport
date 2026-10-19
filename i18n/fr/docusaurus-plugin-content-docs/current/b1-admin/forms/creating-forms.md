---
title: "Créer des formulaires"
---

# Créer des formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour collecter des informations auprès de votre communauté. Vous pouvez créer des formulaires pour les inscriptions à des événements, les sondages, les fiches de visiteurs, les demandes d'adhésion, et plus encore. Les formulaires peuvent être liés à des personnes de votre base de données ou utilisés comme pages autonomes avec leur propre URL publique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires **Personnes** (liés aux fiches de personnes), vous devez d'abord avoir [des personnes dans votre base de données](../people/adding-people.md).
- Pour les formulaires qui collectent des **paiements**, vous devez avoir [configuré Stripe pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire

1. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, et cliquez sur **Formulaires**.
2. Cliquez sur **Ajouter un formulaire**.
3. Saisissez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante :
   - **Personnes** — Associe les réponses aux [fiches de personnes](../people/adding-people.md) de votre base de données.
   - **Autonome** — Crée un formulaire indépendant avec sa propre URL publique, idéal pour les inscriptions externes.
5. Cliquez sur **Enregistrer** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Imprimer un formulaire vierge

Besoin d'une copie papier à distribuer -- pour une fiche de visiteur au bureau d'accueil, ou un formulaire qu'une personne sans accès à Internet peut remplir à la main ? Cliquez sur **Imprimer** à côté d'un formulaire dans la liste principale des formulaires pour ouvrir un aperçu, puis cliquez sur **Imprimer**. Les champs vierges s'impriment avec un trait de soulignement ou une case à cocher pour chaque question afin que les personnes puissent les remplir à la main ; les questions obligatoires sont marquées d'un astérisque. En haut de la page figurent le logo de votre église (le **Logo pour fond clair** de [Site Web > Apparence](../website/appearance.md), si vous en avez téléchargé un) avec le nom de votre église dessous, puis le nom du formulaire. Il n'existe pas d'autres options d'impression -- vous imprimez le formulaire entier ou rien.

## Ajouter des questions

1. Ouvrez votre formulaire et accédez à l'onglet **Questions**.
2. Cliquez sur **Ajouter une question**.
3. Sélectionnez un **type de champ** dans la liste déroulante Provider. Les types disponibles incluent :
   - **Zone de texte** — Pour les réponses courtes en texte
   - **Date** — Pour la sélection de dates
   - **E-mail** — Pour les adresses e-mail
   - **Numéro de téléphone** — Pour la saisie de numéros de téléphone
   - **Choix multiple** — Pour sélectionner parmi des options prédéfinies
   - **Paiement** — Pour collecter des paiements
4. Saisissez un **Titre** et, facultativement, une **Description** pour la question. La description apparaît sous la question lorsque les personnes remplissent le formulaire ; utilisez-la pour donner des indications telles que "Indiquez toute allergie dont nous devrions être informés."
5. Cochez **Réponse obligatoire** si le champ est obligatoire.
6. Cliquez sur **Enregistrer**.
7. Répétez l'opération pour ajouter d'autres questions.

:::warning
Le type de champ **Paiement** nécessite la configuration de Stripe. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Gérer les membres du formulaire

1. Ouvrez votre formulaire et accédez à l'onglet **Membres du formulaire**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Administrateur** — Peut modifier le formulaire et consulter toutes les réponses.
   - **Consultation uniquement** — Peut consulter les réponses mais ne peut pas modifier le formulaire.

## Ajouter automatiquement les personnes qui répondent à un groupe

Lorsque l'option **Créer une fiche personne à partir des réponses** est activée, vous pouvez également associer le formulaire à un groupe afin que chaque personne qui répond soit automatiquement ajoutée à la liste de ce groupe :

1. Ouvrez les **Détails** de votre formulaire et activez **Créer une fiche personne à partir des réponses**.
2. Sous **Ajouter les personnes qui répondent à un groupe**, sélectionnez le groupe auquel ajouter les personnes, ou laissez la valeur sur **Aucun**.
3. Cliquez sur **Enregistrer**.

Chaque fois qu'une personne envoie le formulaire, la personne trouvée ou nouvellement créée est ajoutée au groupe (les membres déjà présents dans le groupe sont ignorés). Cela est utile, par exemple, pour un formulaire d'inscription à un camp qui doit automatiquement constituer la liste du groupe du camp.

### Envoyer un e-mail de suivi {#sending-a-follow-up-email}

Avec **Créer une fiche personne à partir des réponses** activé, vous pouvez également envoyer un e-mail à chaque personne qui répond au formulaire. Renseignez **Objet de l'e-mail de suivi** et **Corps de l'e-mail de suivi** dans les détails du formulaire. Vous pouvez utiliser les jetons `{firstName}` et `{churchName}` dans les deux champs. L'e-mail n'est envoyé que si les deux champs sont renseignés.

:::info
Les e-mails de suivi ne sont envoyés qu'après l'approbation de votre église pour l'envoi d'e-mails de groupe, et ils comptent dans la limite quotidienne d'e-mails de votre église. Voir [Activer l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Dupliquer un formulaire

Pour réutiliser un formulaire comme point de départ d'un nouveau, cliquez sur **Dupliquer** à côté du formulaire dans la liste des formulaires, puis confirmez. B1 crée une copie exacte du formulaire -- y compris toutes les questions -- que vous pouvez ensuite renommer et modifier de manière indépendante.

:::tip
La duplication est pratique pour les événements récurrents dont les questions d'inscription restent les mêmes d'une année à l'autre. Dupliquez le formulaire de l'année précédente, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configurer les propriétés du formulaire

Vous pouvez modifier le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires autonomes, vous verrez également une **URL publique** unique que vous pouvez partager avec n'importe qui, ainsi qu'un champ **Description** -- un texte affiché au-dessus des questions sur la page publique du formulaire, utile pour indiquer aux personnes à quoi sert le formulaire avant qu'elles ne le remplissent.

Utilisez le champ **Message de remerciement** pour définir ce que les personnes voient après avoir envoyé le formulaire, y compris sur la page de l'URL publique du formulaire. Si vous le laissez vide, elles voient "Merci d'avoir envoyé le formulaire !"

:::tip
Les formulaires autonomes conviennent parfaitement aux inscriptions à des événements. Partagez l'URL publique par e-mail, sur les réseaux sociaux, ou intégrez directement le formulaire sur le site Web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site Web B1, ouvrez l'éditeur de votre site, ajoutez une nouvelle section et sélectionnez l'élément **Formulaire**. Choisissez ensuite le formulaire à afficher. Voir [Gérer les pages](../website/managing-pages.md) pour plus de détails sur la modification de votre site Web.
:::
