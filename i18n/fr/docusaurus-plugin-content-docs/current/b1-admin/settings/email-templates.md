---
title: "Modèles d'e-mail"
---

# Modèles d'e-mail

<div class="article-intro">

Les modèles d'e-mail vous permettent de enregistrer du contenu d'e-mail réutilisable -- un message de bienvenue, un rappel d'événement, un remerciement pour un don -- afin que vous (ou un [flux de travail](../serving/workflows.md)) puissiez l'envoyer en un clic plutôt que de l'écrire à partir de zéro chaque fois.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez accès à la zone Paramètres dans B1 Admin.

</div>

## Accès aux modèles d'e-mail

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Modèles d'e-mail**.
3. Vous verrez une liste de modèles existants avec leur sujet, catégorie et date de dernière modification.

## Création d'un modèle

1. Cliquez sur **Nouveau modèle**.
2. Entrez un **Nom du modèle** pour l'identifier dans la liste, et choisissez une **Catégorie** (Général, Événements, Groupes, Dons, ou Bienvenue) pour aider à organiser vos modèles.
3. Entrez la ligne **Sujet**.
4. Écrivez le **Corps** en utilisant l'éditeur de texte enrichi.
5. Cliquez sur **Enregistrer**.

## Champs de fusion

Cliquez sur une puce de champ de fusion au-dessus du Sujet ou du Corps pour l'insérer à votre curseur -- cliquez d'abord dans le texte où vous souhaitez que le champ aille, puis cliquez sur la puce. Votre curseur reste en place, afin que vous puissiez continuer à taper juste après le champ inséré. Si vous cliquez sur une puce de Corps sans d'abord cliquer dans le corps, le champ est ajouté à la fin du corps. Lorsque l'e-mail est envoyé, chaque champ de fusion est remplacé par les informations réelles du destinataire :

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Le nom du destinataire
- `{{email}}` -- L'adresse e-mail du destinataire
- `{{churchName}}` -- Le nom de votre église

## Aperçu d'un modèle

Cliquez sur **Aperçu** pour voir à quoi ressembleront le sujet et le corps avec des données d'exemple remplies pour les champs de fusion, avant de vous enregistrer ou envoyer.

## Utilisation d'un modèle

Les modèles enregistrés sont disponibles pour sélection lors de la composition d'un e-mail aux personnes ou à un groupe, et en tant qu'action dans les [Flux de travail](../serving/workflows.md). Avant que votre église puisse les envoyer, l'équipe ChurchApps doit l'approuver pour l'e-mail de groupe une fois. Voir [Activation de l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modification et suppression

Cliquez sur l'icône **Modifier** à côté d'un modèle pour le mettre à jour, ou sur l'icône **Supprimer** pour le supprimer définitivement.

## Prochaines étapes

- [Flux de travail](../serving/workflows.md) -- Déclencher automatiquement un e-mail de modèle en fonction des règles

