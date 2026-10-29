---
title: "Modèles d'e-mail"
---

# Modèles d'e-mail

<div class="article-intro">

Les modèles d'e-mail vous permettent d'enregistrer du contenu d'e-mail réutilisable -- un message de bienvenue, un rappel d'événement, un remerciement pour un don -- afin que vous (ou un [flux de travail](../serving/workflows.md)) puissiez l'envoyer en un clic au lieu de le rédiger à chaque fois. La même liste contient aussi les modèles de messages texte pour les fenêtres Texto des groupes et des personnes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir accès à la zone Paramètres de B1 Admin.

</div>

## Accéder aux modèles d'e-mail

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Modèles d'e-mail**.
3. Vous verrez une liste des modèles existants avec leur objet, leur catégorie et leur date de dernière modification.

## Créer un modèle

1. Cliquez sur **Nouveau modèle**.
2. Saisissez un **nom de modèle** pour l'identifier dans la liste, et choisissez une **catégorie** (Général, Événements, Groupes, Dons, Bienvenue ou Texte) pour bien organiser vos modèles. Choisissez **Texte** pour créer plutôt un modèle de message texte (voir [Modèles de texte](#text-templates) ci-dessous).
3. Saisissez la ligne d'**objet**.
4. Rédigez le **corps** à l'aide de l'éditeur de texte enrichi.
5. Cliquez sur **Enregistrer**.

## Champs de fusion {#merge-fields}

Cliquez sur une puce de champ de fusion au-dessus de l'objet ou du corps pour l'insérer à l'emplacement de votre curseur -- cliquez d'abord dans le texte à l'endroit où vous voulez le champ, puis cliquez sur la puce. Votre curseur reste en place, de sorte que vous pouvez continuer à taper juste après le champ inséré. Si vous cliquez sur une puce du corps sans avoir d'abord cliqué dans le corps, le champ est ajouté à la fin du corps. Lorsque l'e-mail est envoyé, chaque champ de fusion est remplacé par les renseignements réels du destinataire :

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Le nom du destinataire
- `{{email}}` -- L'adresse e-mail du destinataire
- `{{churchName}}` -- Le nom de votre église

## Modèles de texte {#text-templates}

Un modèle de la catégorie **Texte** est un message en texte brut destiné à la messagerie texte plutôt qu'Ã  l'e-mail :

- Il n'a pas d'objet. L'éditeur de texte enrichi est remplacé par une simple zone **Message texte** qui contient jusqu'à 1 600 caractères.
- Les puces de champs de fusion au-dessus de la zone insèrent `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` ou `{{churchName}}` à l'emplacement de votre curseur.
- Les modèles de texte apparaissent dans le sélecteur **Charger un modèle (facultatif)** fenêtre Texto d'un [groupe](../groups/group-members.md#texting-group-members) ou d'une personne. Choisir un modèle remplit le message, et vous pouvez toujours le modifier avant l'envoi.
- Ils sont exclus des sélecteurs de modèles d'e-mail, y compris l'action **Envoyer un e-mail** des flux de travail.

La messagerie texte nécessite un [fournisseur de messagerie texte](./church-settings.md#texting) connecté.

## Aperçu d'un modèle

Cliquez sur **Aperçu** pour voir à quoi ressemblera l'objet et le corps avec des données d'exemple remplies dans les champs de fusion, avant d'enregistrer ou d'envoyer.

## Utiliser un modèle

Les modèles enregistrés sont disponibles dans la liste de sélection lors de la rédaction d'un e-mail à des personnes ou à un groupe, ainsi que comme action dans les [Flux de travail](../serving/workflows.md). Avant que votre église puisse les envoyer, l'équipe de ChurchApps doit d'abord l'approuver une fois pour l'e-mail de groupe. Consultez [Activer l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modifier et supprimer

Cliquez sur l'**icône de modification** à côté d'un modèle pour le mettre à jour, ou sur l'**icône de suppression** pour le retirer définitivement.

## Étapes suivantes

- [Flux de travail](../serving/workflows.md) -- Déclenchez automatiquement un e-mail à partir d'un modèle selon des règles
