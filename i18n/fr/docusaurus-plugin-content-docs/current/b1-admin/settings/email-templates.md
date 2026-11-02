---
title: "Modèles de courriel"
---

# Modèles de courriel

<div class="article-intro">

Les modèles de courriel vous permettent d'enregistrer du contenu de courriel réutilisable -- un message de bienvenue, un rappel d'événement, un remerciement pour un don -- afin que vous (ou un [flux de travail](../serving/workflows.md)) puissiez l'envoyer en un clic au lieu de le rédiger à chaque fois. La même liste contient aussi les modèles de messages texte pour les fenêtres Texto des groupes et des personnes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un accès au domaine Paramètres de B1 Admin.

</div>

## Accéder aux modèles de courriel

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Modèles de courriel**.
3. Vous verrez une liste des modèles existants avec leur objet, leur catégorie et la date de dernière modification.

## Créer un modèle

1. Cliquez sur **Nouveau modèle**.
2. Saisissez un **nom de modèle** pour le reconnaître dans la liste, et choisissez une **catégorie** (Général, Événements, Groupes, Dons, Accueil ou Texte) pour aider à organiser vos modèles. Choisissez **Texte** pour créer plutôt un modèle de message texte (voir [Modèles de texte](#text-templates) ci-dessous).
3. Saisissez la ligne **Objet**.
4. Rédigez le **corps** à l'aide de l'éditeur de texte enrichi.
5. Cliquez sur **Enregistrer**.

## Champs de fusion {#merge-fields}

Cliquez sur une pastille de champ de fusion au-dessus de l'objet ou du corps pour l'insérer à l'emplacement du curseur -- cliquez d'abord dans le texte à l'endroit voulu, puis cliquez sur la pastille. Votre curseur reste en place, de sorte que vous pouvez continuer à taper juste après le champ inséré. Si vous cliquez sur une pastille du corps sans avoir d'abord cliqué dans le corps, le champ est ajouté à la fin du corps. Lors de l'envoi du courriel, chaque champ de fusion est remplacé par les renseignements réels du destinataire :

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Le nom du destinataire
- `{{email}}` -- L'adresse courriel du destinataire
- `{{churchName}}` -- Le nom de votre église

## Modèles de texte {#text-templates}

Un modèle de la catégorie **Texte** est un message en texte brut destiné aux textos plutôt qu'aux courriels :

- Il n'a pas d'objet. L'éditeur de texte enrichi est remplacé par une simple zone **Message texte** qui contient jusqu'à 1 600 caractères.
- Les pastilles de champs de fusion au-dessus de la zone insèrent `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` ou `{{churchName}}` à l'emplacement du curseur.
- Les modèles de texte apparaissent dans le sélecteur **Charger un modèle (facultatif)** de la fenêtre Texto d'un [groupe](../groups/group-members.md#texting-group-members) ou d'une personne. En en choisissant un, le message est rempli, et vous pouvez encore le modifier avant l'envoi.
- Ils sont exclus des sélecteurs de modèles de courriel, y compris de l'action **Envoyer un courriel** des flux de travail.

L'envoi de textos exige un [fournisseur de messages texte](./church-settings.md#texting) connecté.

## Prévisualiser un modèle

Cliquez sur **Aperçu** pour voir l'apparence de l'objet et du corps avec des données fictives remplies dans les champs de fusion, avant d'enregistrer ou d'envoyer.

## Utiliser un modèle

Les modèles enregistrés peuvent être sélectionnés lors de la rédaction d'un courriel destiné à des personnes ou à un groupe, et sont disponibles comme action dans les [Flux de travail](../serving/workflows.md). Avant que votre église puisse les envoyer, l'équipe de ChurchApps doit d'abord l'approuver une fois pour les courriels de groupe. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modifier et supprimer

Cliquez sur l'icône **Modifier** à côté d'un modèle pour le mettre à jour, ou sur l'icône **Supprimer** pour le retirer définitivement.

## Et ensuite

- [Flux de travail](../serving/workflows.md) -- Déclencher automatiquement l'envoi d'un courriel modèle selon des règles
