---
title: "Rappels d'événements"
---

# Rappels d'événements

<div class="article-intro">

Les rappels d'événements informent automatiquement les bonnes personnes avant qu'un événement n'ait lieu -- par exemple, « Ne le manquez pas ! L'atelier sur la santé commence demain à 9 h. » Vous configurez un rappel une seule fois sur l'événement, et B1 l'envoie à l'heure prévue par notification push, par courriel et, si votre église a configuré la messagerie texte, par SMS. Les membres peuvent contrôler les rappels qu'ils reçoivent depuis leurs propres [Préférences de notification](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez l'événement pour lequel vous souhaitez envoyer un rappel (voir [Créer des calendriers](creating-calendars))
- Pour joindre les personnes inscrites, [activez l'inscription](creating-calendars) pour l'événement
- Pour joindre un groupe entier, assurez-vous que l'événement appartient à un [groupe](../groups/creating-groups) comportant des membres

</div>

## Configurer un rappel

Vous configurez les rappels dans la section **Rappels** de l'événement.

- Lorsque vous **créez un nouvel événement**, développez la section **Rappels** dans l'éditeur d'événement avant d'enregistrer.
- Pour un **événement existant**, ouvrez la page **Détails de l'inscription** de l'événement (depuis la section **Inscriptions**) pour ajouter ou modifier son rappel.

1. Activez **Activer les rappels**.
2. Choisissez **Quand** envoyer le rappel. Sélectionnez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **1 jour avant** et **Le jour même**.
3. Définissez l'**Heure** d'envoi du rappel (par défaut **9 h**, dans le [fuseau horaire](../settings/church-settings.md#time-zone) de votre église).
4. Choisissez **Qui** doit recevoir le rappel (voir [Qui reçoit le rappel](#who-gets-reminded) ci-dessous).
5. Ajoutez facultativement un **Message**. Laissez-le vide pour utiliser le texte par défaut, ou rédigez le vôtre -- vous pouvez inclure `{{eventTitle}}`, qui sera remplacé par le nom de l'événement.
6. Choisissez les **Canaux** : notification **Push**, **Courriel** et, si votre église a connecté un [fournisseur de SMS](../settings/church-settings.md#texting), **SMS**.
7. Enregistrez l'événement.

Au fur et à mesure de vos modifications, un **aperçu en direct** indique approximativement combien de personnes recevront le rappel, combien de participants ne pourront pas être joints, et les prochaines dates d'envoi prévues -- vous pouvez ainsi vérifier que le rappel est correct avant d'enregistrer.

## Qui reçoit le rappel

Le paramètre **Qui** détermine les destinataires du rappel :

- **Inscrits uniquement** -- Toutes les personnes inscrites à l'événement et liées à une fiche personne. C'est la valeur par défaut lorsque l'inscription est activée pour l'événement, afin qu'un rappel pour un petit événement avec inscription ne soit jamais envoyé par erreur à un groupe entier.
- **Responsables / inscrits uniquement** -- Un rappel par inscription (la personne qui s'est inscrite), plutôt qu'à chaque membre de la famille figurant dans l'inscription.
- **Membres du groupe** -- Toutes les personnes du groupe de l'événement. C'est la valeur par défaut lorsque l'événement n'utilise pas l'inscription.
- **Automatique** -- Utilise les inscrits lorsque l'inscription est activée, sinon le groupe.

:::info
Les invités ajoutés uniquement par leur nom (sans fiche personne liée) ne peuvent pas recevoir de rappel, car il n'existe ni compte, ni appareil, ni courriel vers lequel l'envoyer. L'aperçu indique combien de participants entrent dans cette catégorie afin d'éviter les surprises. Les membres qui ont refusé les communications sont aussi ignorés.
:::

## Quand les rappels sont envoyés

- Les rappels partent à **l'heure que vous avez choisie**, dans le fuseau horaire local de votre église, à chacun des décalages que vous avez sélectionnés.
- Si vous **modifiez la date ou l'heure de l'événement**, les rappels en attente sont automatiquement reprogrammés -- vous n'avez pas besoin de modifier le rappel.
- Si vous **supprimez l'événement** (ou annulez une seule occurrence d'un événement récurrent), ses rappels en attente sont automatiquement annulés.
- Les événements récurrents sont gérés automatiquement : chaque occurrence à venir reçoit son propre rappel.

:::tip
Les rappels sont envoyés **par notification push en premier, le courriel servant de solution de secours**. Si un membre a activé les notifications push, il recevra une notification push ; sinon, il recevra un courriel à la place. Les membres choisissent les canaux qu'ils souhaitent pour chaque type de notification dans leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences).
:::

## Rappels par SMS

Le canal **SMS** n'apparaît que lorsque votre église a connecté un fournisseur de messagerie texte. Les SMS passent par le fournisseur de messagerie texte de votre église, et chaque SMS peut coûter de l'argent à votre église. Ils sont envoyés en plus de tout rappel push ou par courriel, et uniquement aux personnes qui :

- ont activé les **Messages SMS** dans leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences), et
- ont un numéro de téléphone mobile sur leur profil.

Chaque SMS commence par le nom de votre église, tient en un seul message et se termine par « Répondez STOP pour vous désabonner ». Toute personne qui répond STOP cesse de recevoir des SMS de votre église. Pour que les réponses STOP parviennent à B1, collez l'**URL du webhook des messages entrants (STOP)** depuis vos [paramètres de messagerie texte](../settings/church-settings.md#texting) dans le webhook de messages entrants de votre fournisseur.

## Ce que les membres peuvent contrôler

Les rappels respectent toujours les [Préférences de notification](../../b1-church/getting-started/notification-preferences) de chaque membre. Un membre peut :

- désactiver les **Rappels d'événements** pour le push, le courriel ou le SMS tout en gardant les autres notifications activées ;
- activer ou désactiver les rappels par SMS avec **Messages SMS** ;
- définir des **heures de silence** afin que les notifications non urgentes attendent un moment raisonnable.

Vous ne pouvez pas passer outre le choix d'un membre de se désabonner des rappels d'événements -- cela permet à B1 de respecter les règles anti-spam et de laisser les membres maîtres de leur boîte de réception.

## Rappels pour le service

Les bénévoles planifiés sur un plan reçoivent un **rappel de service** distinct, avec les détails du plan et, s'ils n'ont pas encore répondu, des boutons **Accepter / Refuser** directement dans le courriel. Ces rappels sont configurés sur le type de plan plutôt que sur un événement du calendrier, et peuvent aussi être envoyés par SMS -- consultez [Rappels aux bénévoles](../serving/plans#volunteer-reminders) et [Bénévoles du dimanche](../guides/sunday-volunteers) pour savoir comment fonctionnent la planification des bénévoles et leurs rappels.

## Et ensuite

- [Préférences de notification](../../b1-church/getting-started/notification-preferences) -- Ce que les membres peuvent contrôler
- [Guide d'inscription aux événements](../guides/event-registration) -- Configurer l'inscription pour que les rappels puissent atteindre les participants
- [Créer des calendriers](creating-calendars) -- Retour à la configuration des calendriers
