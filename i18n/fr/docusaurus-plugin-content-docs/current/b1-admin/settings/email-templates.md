---
title: "Modèles de courriel"
description: "Configurez les modèles de courriel et de messages texte dans B1 Admin, avec les champs de fusion, les options de messages texte et les aperçus pour les communications de masse."
---

# Modèles de courriel

<div class="article-intro">

Les modèles de courriel vous permettent d'enregistrer du contenu de courriel réutilisable -- un message de bienvenue, un rappel d'événement, un remerciement pour un don -- afin que vous (ou un [flux de travail](../serving/workflows.md)) puissiez l'envoyer en un clic au lieu de le rédiger à chaque fois. La même liste contient aussi des modèles de messages texte, utilisés dans les fenêtres d'envoi de texto aux groupes et aux personnes, ainsi que dans l'action **Envoyer un texto** des flux de travail.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **Modifier les paramètres de l'église** (l'élément de menu **Modèles de courriel** n'apparaît qu'avec elle). Les personnes disposant de l'autorisation **Modifier les membres du groupe** peuvent aussi ouvrir la page directement à l'adresse **/settings/email-templates**.

</div>

## Accéder aux modèles de courriel {#accessing-email-templates}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Modèles de courriel**.
3. Vous verrez la liste des modèles existants avec leur **nom**, leur **objet**, leur **catégorie** et la date de **modification**.

## Créer un modèle {#creating-a-template}

1. Cliquez sur **Nouveau modèle**.
2. Saisissez un **nom de modèle** pour l'identifier dans la liste, et choisissez une **catégorie** (Général, Événements, Groupes, Dons, Bienvenue ou Texte) pour mieux organiser vos modèles. Choisissez **Texte** pour créer plutôt un modèle de message texte (voir [Modèles de texte](#text-templates) ci-dessous).
3. Saisissez la ligne **Objet**.
4. Rédigez le **corps** du message à l'aide de l'éditeur de texte enrichi.
5. Cliquez sur **Enregistrer**.

## Champs de fusion {#merge-fields}

Cliquez sur une puce de champ de fusion au-dessus de l'objet ou du corps pour l'insérer à l'emplacement de votre curseur -- cliquez d'abord dans le texte à l'endroit voulu, puis cliquez sur la puce. Votre curseur reste en place, ce qui vous permet de continuer à écrire juste après le champ inséré. Si vous cliquez sur une puce du corps sans avoir d'abord cliqué dans le corps, le champ est ajouté à la fin du corps. Lorsque le courriel est envoyé, chaque champ de fusion est remplacé par les renseignements réels du destinataire :

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Le nom du destinataire
- `{{email}}` -- L'adresse courriel du destinataire
- `{{churchName}}` -- Le nom de votre église

### Champs de fusion des dons {#gift-merge-fields}

Ces champs ne se remplissent que lorsque le courriel est envoyé par un [flux de travail](../serving/workflows.md#sending-email) démarré par un déclencheur **Don · Créé**. Dans tout autre courriel, ils restent vides.

- `{{amount}}` -- Le montant du don, par exemple 50,00 $
- `{{giftDate}}` -- La date du don
- `{{fund}}` -- Le ou les fonds auxquels le don a été affecté
- `{{receipt}}` -- Un résumé du don : la date et le mode de paiement, une ligne pour chaque fonds avec son montant, et le total. Utilisez-le pour envoyer au donateur un reçu dans le même courriel que votre remerciement. Il n'est proposé que pour le corps du message, et non pour l'objet.

## Modèles de texte {#text-templates}

Un modèle de la catégorie **Texte** est un message en texte brut destiné aux messages texte plutôt qu'aux courriels :

- Il n'a pas d'objet. L'éditeur de texte enrichi est remplacé par une simple zone **Message texte** qui accepte jusqu'à 1 600 caractères.
- Les puces de champs de fusion au-dessus de la zone insèrent `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` ou les [champs de fusion des dons](#gift-merge-fields) à l'emplacement de votre curseur. Dans un texte, `{{receipt}}` devient une seule ligne, par exemple *50,00 $ au Fonds général le 8 nov. 2026*.
- Les modèles de texte apparaissent dans le sélecteur **Charger un modèle (facultatif)** de la fenêtre d'envoi de texto à un [groupe](../groups/group-members.md#texting-group-members) ou à une seule personne. En en choisissant un, le message est rempli, et vous pouvez encore le modifier avant l'envoi.
- Ils apparaissent aussi dans la liste **Démarrer à partir d'un modèle** de l'action [Envoyer un texto](../serving/workflows.md#sending-a-text) des flux de travail.
- Ils sont exclus des sélecteurs de modèles de courriel, y compris de l'action **Envoyer un courriel** des flux de travail.

L'envoi de messages texte exige un [fournisseur de messages texte](./church-settings.md#texting) connecté.

## Aperçu d'un modèle {#previewing-a-template}

Cliquez sur **Aperçu** pour voir l'apparence de l'objet et du corps avec des données fictives remplissant les champs de fusion, avant d'enregistrer ou d'envoyer.

## Utiliser un modèle {#using-a-template}

Les modèles enregistrés peuvent être sélectionnés lors de la rédaction d'un courriel à des personnes ou à un groupe, et sont disponibles comme action dans les [flux de travail](../serving/workflows.md). Avant que votre église puisse les envoyer, l'équipe ChurchApps doit approuver une fois l'envoi de courriels de groupe. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modifier et supprimer {#editing-and-deleting}

Cliquez sur **Modifier** dans la ligne d'un modèle pour le mettre à jour, ou sur **Supprimer** pour le retirer définitivement. B1 vous demande de confirmer avant de supprimer.

## Étapes suivantes {#next-steps}

- [Flux de travail](../serving/workflows.md) -- Déclencher automatiquement l'envoi d'un courriel modèle selon des règles
