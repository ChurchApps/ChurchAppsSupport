---
title: "Rappels d'événements"
---

# Rappels d'événements {#event-reminders}

<div class="article-intro">

Les rappels d'événements avertissent automatiquement les bonnes personnes avant un événement -- par exemple, « Ne manquez pas ça ! L'atelier sur la santé commence demain à 9 h. » Vous configurez un rappel une seule fois sur l'événement, et B1 l'envoie à l'heure prévue par notification push, par courriel et, si votre église a configuré la messagerie texte, par texto. Les membres peuvent choisir les rappels qu'ils reçoivent depuis leurs propres [préférences de notification](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez l'événement dont vous voulez rappeler la tenue (voir [Créer des calendriers](creating-calendars))
- Pour joindre les personnes inscrites, [activez l'inscription](creating-calendars) pour l'événement
- Pour joindre tout un groupe, assurez-vous que l'événement appartient à un [groupe](../groups/creating-groups) comptant des membres

</div>

## Configurer un rappel {#setting-up-a-reminder}

Vous configurez les rappels dans la section **Rappels** de l'événement.

- Lorsque vous **créez un nouvel événement**, développez la section **Rappels** dans l'éditeur d'événement avant d'enregistrer.
- Pour un **événement existant**, ouvrez la page **Détails de l'inscription** de l'événement (depuis la section **Inscriptions**) pour ajouter ou modifier son rappel.

1. Activez **Activer les rappels**.
2. Choisissez le moment **Quand** envoyer. Sélectionnez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **1 jour avant** et **Le jour même**.
3. Définissez l'**heure** d'envoi du rappel (par défaut **9 h 00**, selon le [fuseau horaire](../settings/church-settings.md#time-zone) de votre église).
4. Choisissez **Qui** doit recevoir le rappel (voir [Qui reçoit le rappel](#who-gets-reminded) ci-dessous).
5. Ajoutez facultativement un **message**. Laissez-le vide pour utiliser le texte par défaut, ou rédigez le vôtre -- vous pouvez inclure `{{eventTitle}}`, qui sera remplacé par le nom de l'événement.
6. Choisissez les **canaux** : notification **Push**, **Courriel** et, si votre église a connecté un [fournisseur de messagerie texte](../settings/church-settings.md#texting), **Texto**.
7. Enregistrez l'événement.

Au fil de vos modifications, un **aperçu en direct** indique approximativement combien de personnes seront jointes, combien de participants ne peuvent pas être rejoints, et les prochaines heures d'envoi prévues -- vous pouvez ainsi vérifier que le rappel est correct avant d'enregistrer.

## Qui reçoit le rappel {#who-gets-reminded}

Le paramètre **Qui** détermine à qui le rappel est envoyé :

- **Personnes inscrites seulement** -- Toutes les personnes inscrites à l'événement et liées à une fiche de personne. C'est la valeur par défaut lorsque l'inscription est activée pour l'événement, afin qu'un rappel pour un petit événement avec inscriptions ne soit jamais envoyé accidentellement à tout un groupe.
- **Responsables / personnes inscrites seulement** -- Un rappel par inscription (la personne qui s'est inscrite), plutôt que chaque membre de la famille figurant sur l'inscription.
- **Membres du groupe** -- Toutes les personnes du groupe de l'événement. C'est la valeur par défaut lorsque l'événement n'utilise pas d'inscription.
- **Automatique** -- Utilise les personnes inscrites lorsque l'inscription est activée, sinon le groupe.

:::info
Les invités ajoutés uniquement par leur nom (sans fiche de personne liée) ne peuvent pas recevoir de rappel, car il n'y a ni compte, ni appareil, ni courriel vers lequel l'envoyer. L'aperçu indique combien de participants entrent dans cette catégorie pour qu'il n'y ait pas de surprise. Les membres qui ont refusé les communications sont également ignorés.
:::

## Quand les rappels sont envoyés {#when-reminders-are-sent}

- Les rappels partent à **l'heure que vous avez choisie**, selon le fuseau horaire local de votre église, pour chacun des décalages sélectionnés.
- Si vous **modifiez la date ou l'heure de l'événement**, les rappels en attente sont automatiquement reprogrammés -- vous n'avez pas besoin de modifier le rappel.
- Si vous **supprimez l'événement** (ou annulez une seule occurrence d'un événement récurrent), ses rappels en attente sont automatiquement annulés.
- Les événements récurrents sont gérés automatiquement : chaque occurrence à venir reçoit son propre rappel.

:::tip
Les rappels sont envoyés **par push en premier, avec le courriel en solution de repli**. Si un membre a activé les notifications push, il reçoit un push ; sinon, il reçoit un courriel. Les membres choisissent les canaux qu'ils souhaitent pour chaque type de notification dans leurs [préférences de notification](../../b1-church/getting-started/notification-preferences).
:::

## Rappels par texto {#text-reminders}

Le canal **Texto** n'apparaît que lorsque votre église a connecté un fournisseur de messagerie texte. Les textos sont envoyés par le fournisseur de votre église, et chaque texto peut coûter de l'argent à votre église. Ils sont envoyés en plus de tout rappel push ou par courriel, et uniquement aux personnes qui :

- ont activé les **Messages texte** dans leurs [préférences de notification](../../b1-church/getting-started/notification-preferences), et
- ont un numéro de téléphone mobile dans leur profil.

Chaque texto commence par le nom de votre église, tient en un seul message et se termine par « Répondez STOP pour vous désabonner ». Toute personne qui répond STOP cesse de recevoir des textos de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook de réponse (STOP)** depuis vos [paramètres de messagerie texte](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

## Ce que les membres peuvent contrôler {#what-members-can-control}

Les rappels respectent toujours les [préférences de notification](../../b1-church/getting-started/notification-preferences) de chaque membre. Un membre peut :

- Désactiver les **Rappels d'événements** pour le push, le courriel ou le texto tout en gardant les autres notifications actives.
- Activer ou désactiver les rappels par texto avec **Messages texte**.
- Définir des **heures calmes** pour que les notifications non urgentes attendent un moment raisonnable.

Vous ne pouvez pas passer outre le choix d'un membre de se désabonner des rappels d'événements -- cela permet à B1 de respecter les règles anti-pourriel et de laisser les membres contrôler leur boîte de réception.

## Rappels pour le service {#serving-reminders}

Les bénévoles prévus dans un plan reçoivent un **rappel de service** distinct, avec les détails du plan et, s'ils n'ont pas encore répondu, des boutons **Accepter / Refuser** directement dans le courriel. Ces rappels se configurent sur le type de plan plutôt que sur un événement du calendrier, et peuvent aussi être envoyés par texto -- voir [Rappels aux bénévoles](../serving/plans#volunteer-reminders) et [Bénévoles du dimanche](../guides/sunday-volunteers) pour savoir comment fonctionnent la planification des bénévoles et leurs rappels.

## Étapes suivantes {#next-steps}

- [Préférences de notification](../../b1-church/getting-started/notification-preferences) -- ce que les membres peuvent contrôler
- [Guide d'inscription aux événements](../guides/event-registration) -- configurer l'inscription pour que les rappels puissent joindre les participants
- [Créer des calendriers](creating-calendars) -- revenir à la configuration des calendriers
