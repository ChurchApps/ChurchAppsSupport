---
title: "Modèles de courriel"
description: "Créez des modèles de courriel et de texto dans B1 Admin, avec des champs de fusion, des options pour les textos et des aperçus pour les communications de masse."
---

# Modèles de courriel

<div class="article-intro">

Les modèles de courriel vous permettent d'enregistrer du contenu réutilisable (un message de bienvenue, un rappel d'événement, un remerciement pour un don) afin que vous, ou un [flux de travail](../serving/workflows.md), puissiez l'envoyer en un clic au lieu de le rédiger à chaque fois. La même liste contient aussi les modèles de texto pour les fenêtres Texto des groupes et des personnes, ainsi que pour l'action **Envoyer un texto** des flux de travail.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un accès à la zone Paramètres de B1 Admin.

</div>

## Accéder aux modèles de courriel

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Modèles de courriel**.
3. Vous verrez la liste des modèles existants, avec leur objet, leur catégorie et la date de dernière modification.

## Créer un modèle

1. Cliquez sur **Nouveau modèle**.
2. Saisissez un **nom de modèle** pour le reconnaître dans la liste, et choisissez une **catégorie** (Général, Événements, Groupes, Dons, Bienvenue ou Texte) pour aider à organiser vos modèles. Choisissez **Texte** pour créer un modèle de texto plutôt qu'un modèle de courriel (voir [Modèles de texte](#text-templates) ci-dessous).
3. Saisissez la ligne **Objet**.
4. Rédigez le **corps** à l'aide de l'éditeur de texte enrichi.
5. Cliquez sur **Enregistrer**.

## Champs de fusion {#merge-fields}

Cliquez sur une pastille de champ de fusion au-dessus de l'objet ou du corps pour l'insérer à l'emplacement du curseur. Cliquez d'abord dans le texte à l'endroit voulu, puis cliquez sur la pastille. Votre curseur reste en place, vous pouvez donc continuer à taper juste après le champ inséré. Si vous cliquez sur une pastille du corps sans avoir d'abord cliqué dans le corps, le champ est ajouté à la fin du corps. Lors de l'envoi du courriel, chaque champ de fusion est remplacé par les renseignements réels du destinataire :

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` : le nom du destinataire
- `{{email}}` : l'adresse courriel du destinataire
- `{{churchName}}` : le nom de votre église

### Champs de fusion de don {#gift-merge-fields}

Ces champs ne se remplissent que lorsque le courriel est envoyé par un [flux de travail](../serving/workflows.md#sending-email) lancé par un déclencheur **Don · Créé**. Dans tout autre courriel, ils restent vides.

- `{{amount}}` : le montant du don, par exemple 50,00 $
- `{{giftDate}}` : la date du don
- `{{fund}}` : le ou les fonds auxquels le don a été affecté
- `{{receipt}}` : un résumé du don, avec la date et le mode de paiement, une ligne pour chaque fonds avec son montant, et le total. Utilisez-le pour envoyer au donateur un reçu dans le même courriel que votre remerciement. Il n'est proposé que pour le corps, et non pour l'objet.

## Modèles de texte {#text-templates}

Un modèle de la catégorie **Texte** est un message en texte brut destiné aux textos, et non aux courriels :

- Il n'a pas d'objet. L'éditeur de texte enrichi est remplacé par une simple zone **Message texte** qui accepte jusqu'à 1 600 caractères.
- Les pastilles de champs de fusion au-dessus de la zone insèrent `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`, ou les [champs de fusion de don](#gift-merge-fields) à l'emplacement du curseur. Dans un texto, `{{receipt}}` devient une seule ligne, par exemple *50,00 $ au Fonds général le 8 nov. 2026*.
- Les modèles de texte apparaissent dans le sélecteur **Charger un modèle (facultatif)** de la fenêtre Texto d'un [groupe](../groups/group-members.md#texting-group-members) ou d'une personne. En en choisissant un, le message est rempli, et vous pouvez encore le modifier avant l'envoi.
- Ils apparaissent aussi dans la liste **Partir d'un modèle** de l'action [Envoyer un texto](../serving/workflows.md#sending-a-text) des flux de travail.
- Ils sont exclus des sélecteurs de modèles de courriel, y compris de l'action **Envoyer un courriel** des flux de travail.

L'envoi de textos exige un [fournisseur de messages texte](./church-settings.md#texting) connecté.

## Prévisualiser un modèle

Cliquez sur **Aperçu** pour voir comment l'objet et le corps s'afficheront, avec des données fictives dans les champs de fusion, avant d'enregistrer ou d'envoyer.

## Utiliser un modèle

Les modèles enregistrés peuvent être choisis lors de la rédaction d'un courriel destiné à des personnes ou à un groupe, et ils sont disponibles comme action dans les [flux de travail](../serving/workflows.md). Avant que votre église puisse les envoyer, l'équipe de ChurchApps doit l'approuver une fois pour l'envoi de courriels de groupe. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modifier et supprimer

Cliquez sur l'icône **Modifier** à côté d'un modèle pour le mettre à jour, ou sur l'icône **Supprimer** pour le retirer définitivement.

## Et ensuite

- [Flux de travail](../serving/workflows.md) : déclencher automatiquement l'envoi d'un modèle de courriel selon des règles
