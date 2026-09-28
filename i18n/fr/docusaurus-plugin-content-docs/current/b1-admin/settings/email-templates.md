---
title: "Modèles de courrier électronique"
---

# Modèles de courrier électronique

<div class="article-intro">

Les modèles de courrier électronique vous permettent d'enregistrer le contenu des e-mails réutilisables -- un message de bienvenue, un rappel d'événement, un merci pour un don -- pour que vous (ou un [flux de travail](../serving/workflows.md)) puissiez l'envoyer en un clic au lieu de l'écrire à partir de zéro à chaque fois.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'accès à la zone Paramètres dans B1 Admin.

</div>

## Accès aux modèles de courrier électronique

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Settings**.
2. Cliquez sur **Email Templates**.
3. Vous verrez une liste des modèles existants avec leur sujet, catégorie et date de dernière modification.

## Création d'un modèle

1. Cliquez sur **New Template**.
2. Entrez un **Template Name** pour l'identifier dans la liste, et choisissez une **Category** (General, Events, Groups, Giving, or Welcome) pour aider à organiser vos modèles.
3. Entrez la ligne de **Subject**.
4. Écrivez le **Body** en utilisant l'éditeur de texte enrichi.
5. Cliquez sur **Save**.

## Champs de fusion

Cliquez sur une puce de champ de fusion au-dessus du Sujet ou du Corps pour l'insérer à votre curseur. Lorsque l'e-mail est envoyé, chaque champ de fusion est remplacé par les informations réelles du destinataire:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Le nom du destinataire
- `{{email}}` -- L'adresse e-mail du destinataire
- `{{churchName}}` -- Le nom de votre église

## Aperçu d'un modèle

Cliquez sur **Preview** pour voir comment le sujet et le corps apparaîtront avec des exemples de données remplies pour les champs de fusion, avant de l'enregistrer ou de l'envoyer.

## Utilisation d'un modèle

Les modèles enregistrés sont disponibles à la sélection lors de la composition d'un e-mail à des personnes ou un groupe, et en tant qu'action dans les [Flux de travail](../serving/workflows.md). Avant que votre église puisse les envoyer, l'équipe ChurchApps doit l'approuver pour l'e-mail de groupe une fois. Voir [Activation de la messagerie groupée pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).

## Édition et suppression

Cliquez sur l'icône **Edit** à côté d'un modèle pour le mettre à jour, ou sur l'icône **Delete** pour le supprimer définitivement.

## Prochaines étapes

- [Workflows](../serving/workflows.md) -- Déclencher un e-mail de modèle automatiquement en fonction des règles
