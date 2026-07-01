---
title: "Rappels d'événements"
---

# Rappels d'événements

<div class="article-intro">

Les rappels d'événements notifient automatiquement les bonnes personnes avant qu'un événement ne se produise — par exemple, « Ne le manquez pas ! L'atelier sur la santé commence demain à 9h00 ». Vous configurez un rappel une fois sur l'événement, et B1 l'envoie selon le calendrier via des notifications push et des e-mails. Les membres peuvent contrôler les rappels qu'ils reçoivent à partir de leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez l'événement pour lequel vous souhaitez rappeler aux gens (voir [Création de calendriers](creating-calendars))
- Pour joindre les participants inscrits, [activez l'enregistrement](creating-calendars) sur l'événement
- Pour joindre un groupe entier, assurez-vous que l'événement appartient à un [groupe](../groups/creating-groups) avec des membres

</div>

## Configuration d'un rappel

Vous configurez les rappels dans la section **Rappels** de l'événement.

- Lorsque vous **créez un nouvel événement**, développez la section **Rappels** dans l'éditeur d'événement avant d'enregistrer.
- Pour un **événement existant**, ouvrez la page **Détails de l'enregistrement** de l'événement (à partir de la section **Enregistrements**) pour ajouter ou modifier son rappel.

1. Activez **Activer les rappels**.
2. Choisissez **Quand** envoyer. Choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **1 jour avant** et **Le jour même**.
3. Définissez l'**Heure du jour** à laquelle le rappel devrait être envoyé (par défaut **9h00**, dans le fuseau horaire local de votre église).
4. Choisissez **À qui** devrait être rappelé (voir [À qui obtient un rappel](#à-qui-obtient-un-rappel) ci-dessous).
5. Ajoutez optionnellement un **Message**. Laissez-le vide pour utiliser le libellé par défaut, ou écrivez le vôtre — vous pouvez inclure `{{eventTitle}}` et il sera remplacé par le nom de l'événement.
6. Choisissez les **Canaux** : notification **Push**, **E-mail** ou les deux.
7. Enregistrez l'événement.

Au fur et à mesure que vous apportez des modifications, un **aperçu en direct** montre à peu près combien de personnes seront rappelées, combien de participants ne peuvent pas être atteints et les prochains moments d'envoi programmés — afin que vous puissiez confirmer que le rappel semble correct avant d'enregistrer.

## À qui obtient un rappel

Le paramètre **À qui** contrôle qui le rappel va à :

- **Participants inscrits uniquement** — Toutes les personnes inscrites à l'événement qui sont liées à un enregistrement de personne. C'est le paramètre par défaut lorsque l'événement a l'enregistrement activé, donc un rappel pour un petit événement enregistré ne va jamais accidentellement à un groupe entier.
- **Responsables / participants inscrits uniquement** — Un rappel par enregistrement (la personne qui s'est inscrite), plutôt que chaque membre de la famille sur l'enregistrement.
- **Membres du groupe** — Toutes les personnes du groupe de l'événement. C'est le paramètre par défaut lorsque l'événement n'utilise pas l'enregistrement.
- **Auto** — Utilise les participants inscrits lorsque l'enregistrement est activé, sinon le groupe.

:::info
Les invités ajoutés par nom uniquement (sans enregistrement de personne lié) ne peuvent pas recevoir de rappel, car il n'y a pas de compte, d'appareil ou d'e-mail auquel l'envoyer. L'aperçu vous indique combien de participants entrent dans ce groupe, il n'y a donc pas de surprises. Les membres qui ont refusé la communication sont également ignorés.
:::

## Quand les rappels sont envoyés

- Les rappels s'enclenchent à l'**heure du jour que vous choisissez**, dans le fuseau horaire local de votre église, sur chacun des décalages que vous avez sélectionnés.
- Si vous **modifiez la date ou l'heure de l'événement**, les rappels en attente sont automatiquement reprogrammés — vous n'avez pas besoin de modifier le rappel.
- Si vous **supprimez l'événement** (ou annulez une seule occurrence d'un événement récurrent), ses rappels en attente sont automatiquement annulés.
- Les événements récurrents sont gérés automatiquement : chaque occurrence à venir reçoit son propre rappel.

:::tip
Les rappels sont envoyés **d'abord par notification push, avec e-mail comme solution de secours**. Si un membre a les notifications push activées, il recevra une notification push ; sinon, il recevra plutôt un e-mail. Les membres choisissent les canaux qu'ils veulent par type de notification dans leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences).
:::

## Ce que les membres peuvent contrôler

Les rappels respectent toujours les [Préférences de notification](../../b1-church/getting-started/notification-preferences) de chaque membre. Un membre peut :

- Activer/désactiver les **Rappels d'événements** pour la notification push ou e-mail tout en gardant les autres notifications activées.
- Définir des **heures silencieuses** pour que les notifications non urgentes attendent un moment raisonnable.

Vous ne pouvez pas ignorer le choix d'un membre de refuser les rappels d'événements — cela maintient B1 conforme aux règles anti-spam et garde les membres en contrôle de leur boîte de réception.

## Rappels d'engagement

Les bénévoles planifiés sur un plan reçoivent un **rappel d'engagement** distinct avec les détails du plan et, lorsqu'ils n'ont pas encore répondu, des boutons **Accepter / Refuser** directement dans l'e-mail. Ces rappels sont configurés sur le type de plan plutôt que sur un événement calendaire — voir [Bénévoles du dimanche](../guides/sunday-volunteers) pour savoir comment fonctionnent la planification des bénévoles et les rappels.

## Étapes suivantes

- [Préférences de notification](../../b1-church/getting-started/notification-preferences) — Ce que les membres peuvent contrôler
- [Guide d'enregistrement aux événements](../guides/event-registration) — Configurez l'enregistrement pour que les rappels puissent joindre les participants
- [Création de calendriers](creating-calendars) — Retour à la configuration du calendrier
