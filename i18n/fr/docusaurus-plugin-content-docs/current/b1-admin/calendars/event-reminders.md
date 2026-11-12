---
title: "Rappels d'événements"
description: "Configurez les rappels d'événements dans B1 Admin par notification push, courriel et texto, en choisissant le calendrier, les destinataires et un message personnalisé pour que les personnes soient avisées à temps."
---

# Rappels d'événements

<div class="article-intro">

Les rappels d'événements avisent automatiquement les bonnes personnes avant un événement -- par exemple : « Ne le manquez pas ! L'atelier de santé commence demain à 9 h 00. » Vous configurez un rappel une seule fois sur l'événement, et B1 l'envoie à l'heure prévue par notification push, par courriel et, si votre église a configuré la messagerie texte, par message texte. Les membres peuvent contrôler les rappels qu'ils reçoivent depuis leurs propres [Préférences de notification](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez l'événement pour lequel vous voulez envoyer des rappels (voir [Création de calendriers](./creating-calendars.md))
- Pour joindre les participants inscrits, [activez l'inscription](./creating-calendars.md) sur l'événement
- Pour joindre un groupe entier, assurez-vous que l'événement appartient à un [groupe](../groups/creating-groups.md) comptant des membres

</div>

## Configurer un rappel {#setting-up-a-reminder}

Vous configurez les rappels dans la section **Rappels** de l'événement. Développez-la pour voir les paramètres.

- Lorsque vous **créez un nouvel événement**, développez la section **Rappels** au bas de l'éditeur **Nouvel événement** ; le rappel est enregistré lorsque vous enregistrez l'événement.
- Pour un **événement existant**, utilisez la section **Rappels** à l'un de ces endroits, puis cliquez sur le bouton **Enregistrer** à l'intérieur de la section : la boîte de dialogue qui s'ouvre lorsque vous cliquez sur l'événement dans un calendrier, l'éditeur **Modifier l'événement**, ou la page d'inscription de l'événement (**Calendriers > Inscriptions**, puis l'événement).

1. Activez **Activer les rappels**.
2. Choisissez **Quand (jusqu'à 3)** pour envoyer : **7 jours avant**, **3 jours avant**, **1 jour avant** et **Le jour même**. Une fois trois choix faits, les autres sont désactivés jusqu'à ce que vous en décochiez un.
3. Définissez l'**Heure d'envoi** du rappel (par défaut **9 h 00**, dans le [fuseau horaire](../settings/church-settings.md#time-zone) de votre église).
4. Choisissez **Destinataires** -- qui doit être rappelé (voir [Qui reçoit les rappels](#who-gets-reminded) ci-dessous).
5. Ajoutez éventuellement un **Message (facultatif)**. Laissez-le vide pour utiliser la formulation par défaut, ou rédigez le vôtre -- vous pouvez inclure `{{eventTitle}}`, qui sera remplacé par le nom de l'événement.
6. Choisissez les **Canaux** : **Notification push** et **Courriel** (tous deux activés par défaut), et, si votre église a un [fournisseur de messagerie texte](../settings/church-settings.md#texting) connecté, **Texto**.
7. Cliquez sur **Enregistrer** (ou enregistrez le nouvel événement).

Pour arrêter les rappels d'un événement, désactivez **Activer les rappels** et enregistrez.

Pour un événement déjà enregistré, un **aperçu en direct** indique approximativement combien de personnes seront rappelées, combien de participants ne peuvent pas être joints, et les prochaines dates d'envoi prévues à mesure que vous modifiez les paramètres -- afin que vous puissiez vérifier que le rappel est correct avant de l'enregistrer. Un événement tout juste créé n'a pas d'aperçu tant qu'il n'a pas été enregistré.

## Qui reçoit les rappels {#who-gets-reminded}

Le paramètre **Destinataires** détermine à qui le rappel est envoyé :

- **Inscrits seulement** -- Toutes les personnes inscrites à l'événement et liées à une fiche personne. C'est la valeur par défaut lorsque l'inscription est activée pour l'événement, afin qu'un rappel pour un petit événement avec inscriptions ne soit jamais envoyé accidentellement à un groupe entier.
- **Responsables / inscrits seulement** -- Un rappel par inscription (la personne qui s'est inscrite), plutôt qu'à chaque membre de la famille figurant sur l'inscription.
- **Membres du groupe** -- Toutes les personnes du groupe de l'événement. C'est la valeur par défaut lorsque l'événement n'utilise pas les inscriptions.
- **Automatique** -- Utilise les inscrits lorsque l'inscription est activée, sinon le groupe.

:::info
Les invités ajoutés seulement par leur nom (sans fiche personne liée) ne peuvent pas recevoir de rappel, car il n'existe ni compte, ni appareil, ni courriel vers lequel l'envoyer. L'aperçu vous indique combien de participants entrent dans cette catégorie afin qu'il n'y ait pas de surprises. Les membres qui ont refusé les communications sont aussi ignorés.
:::

## Moment d'envoi des rappels {#when-reminders-are-sent}

- Les rappels sont envoyés à l'**heure que vous avez choisie**, dans le fuseau horaire local de votre église, pour chacun des décalages sélectionnés.
- Si vous **modifiez la date ou l'heure de l'événement**, les rappels en attente sont automatiquement reprogrammés -- vous n'avez pas besoin de modifier le rappel.
- Si vous **supprimez l'événement** (ou annulez une seule occurrence d'un événement récurrent), ses rappels en attente sont automatiquement annulés.
- Les événements récurrents sont gérés automatiquement : chaque occurrence à venir reçoit son propre rappel.

:::tip
Les rappels sont envoyés **par notification push en premier, le courriel servant de solution de secours**. Si un membre a activé les notifications push, il reçoit une notification push ; sinon, il reçoit plutôt un courriel. Les membres choisissent les canaux souhaités pour chaque type de notification dans leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences.md).
:::

## Rappels par texto {#text-reminders}

Le canal **Texto** n'apparaît que lorsque votre église a un fournisseur de messagerie texte connecté. Les textos sont envoyés par l'intermédiaire du fournisseur de messagerie texte de votre église, et chaque texto peut coûter de l'argent à votre église. Ils sont envoyés en plus de tout rappel par notification push ou courriel, et uniquement aux personnes qui :

- Ont activé les **Messages texte** dans leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences.md), et
- Ont un numéro de téléphone mobile dans leur profil.

Chaque texto commence par le nom de votre église, tient en un seul message texte, et se termine par « Répondez STOP pour vous désabonner. » Toute personne qui répond STOP cesse de recevoir des textos de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook des messages entrants (STOP)** de vos [paramètres de messagerie texte](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

## Ce que les membres peuvent contrôler {#what-members-can-control}

Les rappels respectent toujours les [Préférences de notification](../../b1-church/getting-started/notification-preferences.md) de chaque membre. Un membre peut :

- Désactiver les **Rappels d'événements** pour la notification push, le courriel ou le texto tout en gardant les autres notifications activées.
- Activer ou désactiver les rappels par texto avec **Messages texte**.
- Définir des **heures de silence** pour que les notifications non urgentes attendent une heure raisonnable.

Vous ne pouvez pas passer outre le choix d'un membre qui s'est désabonné des rappels d'événements -- cela permet à B1 de respecter les règles anti-pourriel et de laisser les membres contrôler leur boîte de réception.

## Rappels pour le service {#serving-reminders}

Les bénévoles inscrits à un plan reçoivent un **rappel de service** distinct, avec les détails du plan et, s'ils n'ont pas encore répondu, des boutons **Accepter / Refuser** directement dans le courriel. Ces rappels sont configurés sur le type de plan plutôt que sur un événement de calendrier, et peuvent aussi être envoyés par texto -- voir [Rappels aux bénévoles](../serving/plans.md#volunteer-reminders) et [Bénévoles du dimanche](../guides/sunday-volunteers.md) pour savoir comment fonctionnent la planification des bénévoles et les rappels.

## Étapes suivantes {#next-steps}

- [Préférences de notification](../../b1-church/getting-started/notification-preferences.md) -- Ce que les membres peuvent contrôler
- [Guide d'inscription aux événements](../guides/event-registration.md) -- Configurer l'inscription pour que les rappels puissent atteindre les participants
- [Création de calendriers](./creating-calendars.md) -- Revenir à la configuration des calendriers
