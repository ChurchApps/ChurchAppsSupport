---
title: "Modèles d'email"
---

# Modèles d'email

<div class="article-intro">

Les modèles d'email vous permettent d'enregistrer le contenu d'email réutilisable -- un message de bienvenue, un rappel d'événement, un remerciement de contribution -- afin que vous (ou un [flux de travail](../serving/workflows.md)) puissiez l'envoyer en un clic au lieu de l'écrire à partir de zéro à chaque fois.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'accès à la zone Paramètres dans B1 Admin.

</div>

## Accès aux modèles d'email

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
2. Cliquez sur **Modèles d'email**.
3. Vous verrez une liste des modèles existants avec leur sujet, catégorie et date de dernière modification.

## Création d'un modèle

1. Cliquez sur **Nouveau modèle**.
2. Entrez un **Nom de modèle** pour l'identifier dans la liste, et choisissez une **Catégorie** (Général, Événements, Groupes, Contributions ou Bienvenue) pour aider à organiser vos modèles.
3. Entrez la ligne d'**Objet**.
4. Rédigez le **Corps** en utilisant l'éditeur de texte enrichi.
5. Cliquez sur **Enregistrer**.

## Champs de fusion

Cliquez sur une puce de champ de fusion au-dessus du Sujet ou du Corps pour l'insérer à votre position de curseur. Lorsque l'email est envoyé, chaque champ de fusion est remplacé par les informations réelles du destinataire :

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Le nom du destinataire
- `{{email}}` -- L'adresse email du destinataire
- `{{churchName}}` -- Le nom de votre église

## Aperçu d'un modèle

Cliquez sur **Aperçu** pour voir comment le sujet et le corps auront l'air avec des données d'exemple remplies pour les champs de fusion, avant de sauvegarder ou d'envoyer.

## Utilisation d'un modèle

Les modèles enregistrés sont disponibles pour la sélection lors de la composition d'un email à des personnes ou un groupe, et comme action dans les [Flux de travail](../serving/workflows.md).

## Édition et suppression

Cliquez sur l'icône **Éditer** à côté d'un modèle pour le mettre à jour, ou l'icône **Supprimer** pour le supprimer définitivement.

## Prochaines étapes

- [Flux de travail](../serving/workflows.md) -- Déclenchez un email de modèle automatiquement en fonction de règles
