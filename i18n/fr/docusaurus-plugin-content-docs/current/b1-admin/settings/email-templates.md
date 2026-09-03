---
title: "Modèles d'Email"
---

# Modèles d'Email

<div class="article-intro">

Les Modèles d'Email vous permettent de sauvegarder le contenu d'email réutilisable -- un message de bienvenue, un rappel d'événement, une présentation de don -- pour que vous (ou un [flux de travail](../serving/workflows.md)) puissiez l'envoyer en un clic au lieu de l'écrire à partir de zéro chaque fois.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'accès à la zone Paramètres dans B1 Admin.

</div>

## Accès aux Modèles d'Email

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
2. Cliquez sur **Modèles d'Email**.
3. Vous verrez une liste de modèles existants avec leur sujet, catégorie et dernière date de modification.

## Création d'un Modèle

1. Cliquez sur **Nouveau Modèle**.
2. Entrez un **Nom de Modèle** pour l'identifier dans la liste, et choisissez une **Catégorie** (Général, Événements, Groupes, Dons, ou Bienvenue) pour aider à organiser vos modèles.
3. Entrez la ligne **Sujet**.
4. Écrivez le **Corps** en utilisant l'éditeur de texte riche.
5. Cliquez sur **Enregistrer**.

## Champs de Fusion

Cliquez sur un jeton de champ de fusion au-dessus du Sujet ou du Corps pour l'insérer à votre curseur. Lorsque l'email est envoyé, chaque champ de fusion est remplacé par les informations réelles du destinataire :

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Le nom du destinataire
- `{{email}}` -- L'adresse email du destinataire
- `{{churchName}}` -- Le nom de votre église

## Prévisualisation d'un Modèle

Cliquez sur **Prévisualiser** pour voir comment le sujet et le corps ressembleront avec les données d'exemple remplies pour les champs de fusion, avant de sauvegarder ou d'envoyer.

## Utilisation d'un Modèle

Les modèles sauvegardés sont disponibles à sélectionner lors de la composition d'un email à des personnes ou un groupe, et comme action dans [Flux de Travail](../serving/workflows.md).

## Édition et Suppression

Cliquez sur l'icône **Éditer** à côté d'un modèle pour le mettre à jour, ou l'icône **Supprimer** pour le supprimer définitivement.

## Étapes Suivantes

- [Flux de Travail](../serving/workflows.md) -- Déclencher un email de modèle automatiquement basé sur des règles
