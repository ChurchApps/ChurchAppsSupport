---
title: "Rappels d'Événement"
---

# Rappels d'Événement

<div class="article-intro">

Les rappels d'événement avertissent automatiquement les bonnes personnes avant un événement — par exemple, "Ne le manquez pas! L'atelier de soins de santé commence demain à 9h00." Vous configurez un rappel une fois sur l'événement, et B1 l'envoie selon l'horaire via des notifications push et des e-mails. Les membres peuvent contrôler quels rappels ils reçoivent dans leurs propres [Préférences de Notification](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez l'événement pour lequel vous souhaitez rappeler les gens (voir [Création de Calendriers](creating-calendars))
- Pour atteindre les participants inscrits, [activez l'inscription](creating-calendars) sur l'événement
- Pour atteindre un groupe entier, assurez-vous que l'événement appartient à un [groupe](../groups/creating-groups) avec des membres

</div>

## Configuration d'un Rappel

Vous configurez les rappels dans la section **Rappels** de l'événement.

- Lorsque vous **créez un nouvel événement**, développez la section **Rappels** dans l'éditeur d'événement avant d'enregistrer.
- Pour un **événement existant**, ouvrez la page **Détails de l'Inscription** de l'événement (à partir de la section **Inscriptions**) pour ajouter ou modifier son rappel.

1. Activez **Activer les rappels**.
2. Choisissez **Quand** envoyer. Choisissez jusqu'à trois timings : **7 jours avant**, **3 jours avant**, **1 jour avant**, et **Le jour même**.
3. Définissez l'**Heure de la journée** à laquelle le rappel doit être envoyé (par défaut **9h00**, dans le fuseau horaire local de votre église).
4. Choisissez **Qui** devrait être rappelé (voir [Qui Gets Reminded](#qui-est-rappelé) ci-dessous).
5. Ajoutez éventuellement un **Message**. Laissez-le vide pour utiliser la formulation par défaut, ou écrivez la vôtre -- vous pouvez inclure `{{eventTitle}}` et il sera remplacé par le nom de l'événement.
6. Choisissez les **Canaux** : notification **Push**, **Email**, ou les deux.
7. Enregistrez l'événement.

Au fur et à mesure que vous apportez des modifications, un **aperçu en direct** affiche approximativement combien de personnes seront rappelées, combien de participants ne peuvent pas être contactés, et les prochaines heures d'envoi prévues -- pour que vous puissiez confirmer que le rappel semble correct avant d'enregistrer.

## Qui Est Rappelé

Le paramètre **Qui** contrôle à qui le rappel va :

- **Participants uniquement** -- Tous ceux qui se sont inscrits à l'événement et qui sont liés à un dossier de personne. C'est la valeur par défaut lorsque l'événement a l'inscription activée, donc un rappel pour un petit événement inscrit ne va jamais accidentellement à un groupe entier.
- **Chefs / participants uniquement** -- Un rappel par inscription (la personne qui s'est inscrite), plutôt que chaque membre de la famille sur l'inscription.
- **Membres du groupe** -- Tous dans le groupe de l'événement. C'est la valeur par défaut lorsque l'événement n'utilise pas l'inscription.
- **Auto** -- Utilise les participants lorsque l'inscription est activée, sinon le groupe.

:::info
Les invités ajoutés par nom uniquement (sans dossier de personne lié) ne peuvent pas recevoir de rappel, car il n'y a pas de compte, d'appareil ou d'e-mail pour envoyer à. L'aperçu vous dit combien de participants tombent dans ce groupe pour qu'il n'y ait pas de surprises. Les membres qui se sont désinscrites de la communication sont également ignorés.
:::

## Quand Les Rappels Sont Envoyés

- Les rappels se déclenchent à l'**heure de la journée que vous choisissez**, dans le fuseau horaire local de votre église, à chacun des décalages que vous avez sélectionnés.
- Si vous **modifiez la date ou l'heure de l'événement**, les rappels en attente sont automatiquement reprogrammés -- vous n'avez pas besoin de modifier le rappel.
- Si vous **supprimez l'événement** (ou annulez une occurrence unique d'un événement récurrent), ses rappels en attente sont automatiquement annulés.
- Les événements récurrents sont gérés automatiquement : chaque occurrence à venir reçoit son propre rappel.

:::tip
Les rappels sont envoyés **push en premier, avec e-mail en secours**. Si un membre a les notifications push activées, il recevra un push ; sinon, il recevra un e-mail à la place. Les membres choisissent les canaux qu'ils veulent par type de notification dans leurs [Préférences de Notification](../../b1-church/getting-started/notification-preferences).
:::

## Ce Que Les Membres Peuvent Contrôler

Les rappels respectent toujours les [Préférences de Notification](../../b1-church/getting-started/notification-preferences) de chaque membre. Un membre peut :

- Activer/désactiver les **Rappels d'Événement** pour le push ou l'e-mail tout en gardant les autres notifications activées.
- Définir des **heures calmes** pour que les notifications non urgentes attendent une heure raisonnable.

Vous ne pouvez pas ignorer le choix d'un membre de se désinscrire des rappels d'événement -- cela maintient B1 conforme aux règles anti-spam et garde les membres en contrôle de leur boîte de réception.

## Rappels de Service

Les bénévoles programmés sur un plan reçoivent un **rappel de service** séparé avec les détails du plan et, lorsqu'ils n'ont pas encore répondu, les boutons **Accepter / Refuser** directement dans l'e-mail. Ces rappels sont configurés sur le type de plan plutôt que sur un événement de calendrier -- voir [Bénévoles du Dimanche](../guides/sunday-volunteers) pour voir comment la programmation et les rappels des bénévoles fonctionnent.

## Étapes Suivantes

- [Préférences de Notification](../../b1-church/getting-started/notification-preferences) -- Ce que les membres peuvent contrôler
- [Guide d'Inscription aux Événements](../guides/event-registration) -- Configurer l'inscription pour que les rappels puissent atteindre les participants
- [Création de Calendriers](creating-calendars) -- Retour à la configuration du calendrier
