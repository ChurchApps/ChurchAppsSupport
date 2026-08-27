---
title: "Rappels d'événements"
---

# Rappels d'événements

<div class="article-intro">

Les rappels d'événements envoient automatiquement des notifications aux personnes appropriées avant un événement -- par exemple, « N'oubliez pas ! L'atelier sur la santé commence demain à 9h00. » Vous configurez un rappel une fois sur l'événement, et B1 l'envoie selon le calendrier via des notifications push et des e-mails. Les membres peuvent contrôler les rappels qu'ils reçoivent à partir de leurs propres [Préférences de notification](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez l'événement pour lequel vous souhaitez rappeler les gens (consultez [Création de calendriers](creating-calendars))
- Pour atteindre les participants enregistrés, [activez l'enregistrement](creating-calendars) sur l'événement
- Pour atteindre un groupe entier, assurez-vous que l'événement appartient à un [groupe](../groups/creating-groups) avec des membres

</div>

## Configuration d'un rappel

Vous configurez les rappels dans la section **Rappels** de l'événement.

- Lorsque vous **créez un nouvel événement**, développez la section **Rappels** dans l'éditeur d'événement avant d'enregistrer.
- Pour un **événement existant**, ouvrez la page **Détails d'enregistrement** de l'événement (à partir de la section **Enregistrements**) pour ajouter ou modifier son rappel.

1. Activez **Activer les rappels**.
2. Choisissez **Quand** envoyer. Choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **1 jour avant** et **Le jour même**.
3. Définissez l'**heure du jour** à laquelle le rappel doit être envoyé (par défaut **9h00**, dans le fuseau horaire local de votre église).
4. Choisissez **Qui** doit être rappelé (consultez [Qui reçoit les rappels](#who-gets-reminded) ci-dessous).
5. Ajoutez éventuellement un **Message**. Laissez vide pour utiliser le libellé par défaut, ou écrivez le vôtre -- vous pouvez inclure \{{eventTitle}}\ et il sera remplacé par le nom de l'événement.
6. Choisissez les **Canaux** : notification **Push**, **E-mail**, ou les deux.
7. Enregistrez l'événement.

Au fur et à mesure que vous apportez des modifications, un **aperçu en direct** affiche approximativement le nombre de personnes qui seront rappelées, le nombre de participants qui ne peuvent pas être joints, et les prochaines heures d'envoi programmées -- afin que vous puissiez confirmer que le rappel semble correct avant d'enregistrer.

## Qui reçoit les rappels

Le paramètre **Qui** contrôle à qui le rappel va :

- **Participants uniquement** -- Tous les inscrits à l'événement qui sont liés à un dossier de personne. C'est la valeur par défaut lorsque l'événement a l'enregistrement activé, donc un rappel pour un petit événement enregistré ne va jamais accidentellement à un groupe entier.
- **Responsables / participants uniquement** -- Un rappel par enregistrement (la personne qui s'est inscrite), plutôt que tous les membres de la famille sur l'enregistrement.
- **Membres du groupe** -- Tous les membres du groupe de l'événement. C'est la valeur par défaut lorsque l'événement n'utilise pas l'enregistrement.
- **Automatique** -- Utilise les participants lorsque l'enregistrement est activé, sinon le groupe.

:::info
Les invités ajoutés par nom uniquement (sans un dossier de personne lié) ne peuvent pas recevoir de rappel, car il n'y a pas de compte, d'appareil ou d'e-mail auquel envoyer. L'aperçu vous indique le nombre de participants qui entrent dans ce groupe afin qu'il n'y ait pas de surprise. Les membres qui se sont désabonnés de la communication sont également ignorés.
:::

## Quand les rappels sont envoyés

- Les rappels sont envoyés à l'**heure du jour que vous choisissez**, dans le fuseau horaire local de votre église, à chacun des décalages que vous avez sélectionnés.
- Si vous **modifiez la date ou l'heure de l'événement**, les rappels en attente sont automatiquement reprogrammés -- vous n'avez pas besoin de modifier le rappel.
- Si vous **supprimez l'événement** (ou annulez une occurrence unique d'un événement récurrent), ses rappels en attente sont automatiquement annulés.
- Les événements récurrents sont gérés automatiquement : chaque occurrence à venir reçoit son propre rappel.

:::tip
Les rappels sont envoyés **push en premier, avec e-mail comme solution de secours**. Si un membre a les notifications push activées, il recevra un push ; sinon, il recevra un e-mail à la place. Les membres choisissent les canaux qu'ils veulent par type de notification dans leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences).
:::

## Ce que les membres peuvent contrôler

Les rappels respectent toujours les [Préférences de notification](../../b1-church/getting-started/notification-preferences) de chaque membre. Un membre peut :

- Désactiver **les rappels d'événements** pour les notifications push ou e-mail tout en gardant les autres notifications activées.
- Définir **les heures silencieuses** afin que les notifications non urgentes attendent un moment raisonnable.

Vous ne pouvez pas annuler le choix d'un membre de se désabonner des rappels d'événements -- cela maintient B1 en conformité avec les règles anti-spam et garde les membres en contrôle de leur boîte de réception.

## Rappels de service

Les bénévoles programmés sur un plan reçoivent un **rappel de service** séparé avec les détails du plan et, lorsqu'ils n'ont pas encore répondu, des boutons **Accepter / Refuser** directement dans l'e-mail. Ces rappels sont configurés sur le type de plan plutôt que sur un événement de calendrier -- consultez [Bénévoles du dimanche](../guides/sunday-volunteers) pour savoir comment fonctionnent la planification des bénévoles et les rappels.

## Étapes suivantes

- [Préférences de notification](../../b1-church/getting-started/notification-preferences) -- Ce que les membres peuvent contrôler
- [Guide d'enregistrement aux événements](../guides/event-registration) -- Configurez l'enregistrement afin que les rappels puissent atteindre les participants
- [Création de calendriers](creating-calendars) -- Retour à la configuration du calendrier
