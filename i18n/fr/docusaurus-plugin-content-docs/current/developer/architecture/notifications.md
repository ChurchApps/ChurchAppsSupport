---
title: "Architecture des notifications et rappels"
description: "Comment l'API B1 Admin achemine les notifications, les rappels programmés, les limites de courriels de l'église et les désabonnements aux textos par un seul entonnoir de livraison et une seule barrière de préférences."
---

# Architecture des notifications et rappels

<div class="article-intro">

Chaque message qu'un membre de l'église voit en dehors de la page qu'il consulte — un compteur de badge, une notification push, un courriel récapitulatif — passe par l'une des deux portes du module de messagerie (MessagingApi). Cette page documente l'entonnoir, le moteur de rappels qui l'alimente selon un calendrier, et le modèle de préférences qui décide de ce qui parvient réellement à une personne.

</div>

## Vue d'ensemble — deux portes {#overview--two-doors}

```
tout envoi programmé ──▶ ReminderEngine (définitions → occurrences → scan) ─┐
push staff programmé ──▶ scheduledNotifications (minuteur d'une minute) ─────┤
discussions / demandes / workflow / envois en masse ─────────────────────────┼─▶ createNotifications()
                                                                              │    porte in_app → socket → push → courriel
     (les canaux de rappel incluent sms) ──▶ ReminderEngine.sendSms() ──▶ porte sms → sendPersonText() via le fournisseur de l'église
réponse STOP du fournisseur ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
courriel de compte / juridique ──▶ TransactionalEmailHelper.sendTransactional()  [liste blanche, imposée par lint]
```

1. **Tout ce qui informe une personne** passe par `NotificationHelper.createNotifications()` dans le module de messagerie. Il enregistre une ligne `notifications` et escalade socket → push → courriel, en évaluant `PreferenceGateHelper` pour chaque canal — y compris `in_app` au niveau 0.
2. **Tout ce qui est programmé** est une `reminderDefinition` (au niveau de l'entité ou de la portée), développée en `reminderOccurrences` et envoyée par `ReminderEngine.scan()` sur un minuteur récurrent. Un seul développeur, un seul expéditeur, un seul journal d'envois (`reminderSentLog`). La seule exception est un push staff programmé depuis la page **Mobile > Notifications push** de B1Admin ou depuis la boîte de dialogue **Notifier** d'un groupe : il s'agit d'une ligne `scheduledNotifications` (audience `church` ou `group`), envoyée par `ScheduledNotificationHelper.dispatchDue()` sur le minuteur d'une minute. Une ligne dont la date `sendAt` est dépassée de plus de 30 minutes lors de sa première tentative est marquée en échec avec `missed send window` au lieu d'être envoyée en retard, et un envoi échoué est réessayé jusqu'à 3 fois. Les destinataires sont déterminés au moment de l'envoi par `PushAudienceHelper`, le même assistant qu'utilise l'envoi immédiat à un groupe, et livrés via `createNotifications()` sous la forme `churchPushNotification` (catégorie de préférence `announcements`) ou `groupPushNotification`.
3. **Le courriel direct** n'existe que derrière `TransactionalEmailHelper.sendTransactional()`. Une règle ESLint l'impose à la compilation — voir ci-dessous.

:::tip La porte du courriel est imposée par le linter, pas seulement par convention
`Api/tools/eslint-rules/email-door.cjs` définit `no-direct-email-helper` : tout appel à `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` en dehors de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` échoue au lint. Si vous devez envoyer un courriel, passez par l'entonnoir (`createNotifications` avec `emailImmediate`) ou par `TransactionalEmailHelper.sendTransactional()` — il n'existe aucune troisième voie qui passe la CI.
:::

## L'entonnoir de notifications {#the-notification-funnel}

`NotificationHelper.createNotifications()` est le point d'entrée unique pour tout ce qui n'est ni programmé ni transactionnel :

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (par défaut), 1 push, 2 courriel seulement
    category?: string;                // axe de préférence ; déduit de contentType si omis
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // envoyer le courriel maintenant au lieu d'attendre le récapitulatif
  }
)
```

Pour chaque destinataire, il enregistre une ligne dans `notifications` et appelle `attemptDeliveryWithEscalation`, qui parcourt l'échelle de canaux ci-dessous. Une ligne encore non lue pour le même `(contentType, contentId)` empêche sa recréation — ce garde-fou de déduplication est ignoré pour les envois `emailImmediate` (décalages de rappel, « courriel à tous » du staff, étapes de workflow qui gèrent leur propre déduplication) et pour les messages directs, qui envoient toujours un signal au socket.

`shared/helpers/NotificationService.ts` reprend la même signature (`NotificationServiceOptions`) pour les appelants situés hors du module de messagerie, et est enregistré auprès du module de messagerie au démarrage.

## Chaîne d'escalade des canaux {#channel-escalation-chain}

La livraison commence à un niveau (0 par défaut, ou plus haut pour les rappels et les envois explicites) et ne passe au canal suivant que si le précédent n'a pas réussi. Chaque niveau est filtré par `PreferenceGateHelper` avant toute tentative.

| Niveau | Canal | Comportement |
|-------|---------|----------|
| 0 | **in_app / socket** | La porte `in_app` est vérifiée en premier. Si elle bloque (en sourdine), la ligne est enregistrée avec `isNew=false` et la livraison s'arrête complètement — pas de signal socket, pas de badge, pas d'escalade. Sinon, le serveur recherche les connexions socket ouvertes dans la salle `alerts` de la personne et envoie une trame `notification` (ou `privateMessage`). Pour les notifications ordinaires, une livraison réussie par socket arrête la chaîne ici — le minuteur de 30 minutes revérifie les éléments non lus et les escalade plus tard. Les messages directs ne s'arrêtent jamais au socket : une PWA installée peut garder le socket d'alertes ouvert en arrière-plan, ce qui supprimerait sinon le push au niveau du système d'exploitation. |
| 1 | **push** | Filtré par `allowPush` / désactivation par catégorie / heures de silence. Envoie aux jetons push Expo et aux abonnements Web Push trouvés dans les lignes `devices` de la personne, en dédupliquant par point de terminaison et en supprimant les jetons périmés au passage. |
| 2 | **courriel** | Filtré par `emailFrequency` et désactivation par catégorie. Les envois immédiats (`emailImmediate`) sont générés tout de suite et écrivent une ligne `deliveryLogs` ; sinon, la notification reste en attente du récapitulatif par lot décrit ci-dessous. |
| — | **sms** | Ce n'est pas un niveau de l'échelle d'escalade. Le seul producteur de SMS filtré est le moteur de rappels : lorsque les `channels` d'une définition incluent `sms`, `ReminderEngine.sendSms()` envoie un texto à chaque destinataire **en plus** de la notification push/courriel (voir [Rappels par texto](#text-reminders)). Les envois de textos en masse (`TextingController` / `@churchapps/texting`), l'envoi **Texter les bénévoles** de l'aperçu des services (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) et l'action d'étape de workflow **Envoyer un texto** (`StepActionHelper.sendText` → `sendPersonText`) envoient tous directement des textos via le fournisseur de l'église ; les préférences de notification et les heures de silence ne s'appliquent donc pas à eux — seul l'indicateur `optedOut` de la personne est respecté. |

Les notifications non lues restées au niveau socket ou push sont escaladées par le minuteur de 30 minutes (`NotificationHelper.escalateDelivery`). Le courriel par lot est envoyé par `NotificationHelper.sendEmailNotifications(frequency)`, piloté par la préférence `emailFrequency` de chaque personne : `individual` s'exécute sur le minuteur de 30 minutes, `daily` s'exécute sur le minuteur nocturne. (`weekly` est une valeur de préférence valide mais n'a pas encore d'exécution par lot dédiée.)

## Moteur de rappels {#reminder-engine}

Les rappels programmés — rappels d'événements, échéances de tâches, rappels d'affectations de service ou de plan — passent tous par un moteur généralisé plutôt que par une logique cron propre à chaque fonctionnalité.

```
reminderDefinitions ──développement──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                       │                                    │
     ▼                                       ▼                                    ▼
 niveau entité ou portée              une ligne par (définition,            deliveryStartLevel : 1
 décalages/canaux/message             entité, occurrence, décalage)         + journal reminderSentLog
```

**Définitions** (`reminderDefinitions`) sont soit au niveau de l'entité (`entityId` renseigné — un événement, une tâche ou un plan précis), soit au niveau de la portée (`entityId` nul, `scopeId` renseigné — par exemple, chaque plan d'un type de plan de service). Une définition porte une liste CSV de décalages en minutes (`offsets`, par exemple `"1440,60"` pour un jour et une heure avant), une heure locale d'envoi (`sendLocalTime`), une liste CSV de canaux (`channels` — y compris `email`, qui déclenche un courriel riche immédiat au moment de l'envoi), un `recipientMode`, et un `message` personnalisé facultatif.

Le **développement** matérialise les lignes d'envoi pour l'horizon à venir (une fenêtre glissante de plusieurs jours). Il s'exécute sur le minuteur nocturne, et de façon synchrone chaque fois qu'une définition est enregistrée, afin qu'un rappel pour un événement de dernière minute soit tout de même envoyé. Les définitions de portée se déploient via `loadScopeEntities` de l'adaptateur, produisant un ensemble d'occurrences par entité concrète ; les occurrences au niveau de l'entité utilisent la clé `definitionId:occurrenceISO:offset`, tandis que les occurrences de portée sont espacées par identifiant d'entité pour ne jamais entrer en collision. L'insertion d'une occurrence **réactive** une ligne précédemment annulée — annuler puis redévelopper est la méthode standard pour resynchroniser un rappel après la modification de l'entité sous-jacente ; les lignes déjà `sent`, `failed` ou `processing` restent intactes.

L'**envoi** (`ReminderEngine.scan()`) s'exécute sur le minuteur de 30 minutes. Il réserve les occurrences échues (un bail empêche le double traitement), charge les destinataires via l'adaptateur de l'entité, écarte toute personne déjà enregistrée dans `reminderSentLog` pour cette occurrence, et appelle `createNotifications` avec `deliveryStartLevel: 1` (passer directement au push) ainsi que `emailImmediate`/`emailByPerson` lorsque les canaux de la définition incluent le courriel.

### Rappels par texto {#text-reminders}

Lorsque les `channels` d'une définition incluent `sms`, `scan()` appelle `ReminderEngine.sendSms()` après la création des notifications push/courriel, pour les mêmes destinataires récents. L'envoi de textos est un choix (opt-in) par membre :

- Chaque destinataire passe par `PreferenceGateHelper.evaluate(..., "sms", ...)`, donc `allowSms` doit être activé (il est désactivé par défaut et se règle depuis l'interrupteur **Messages texte** de B1App) et le canal `sms` de la catégorie ne doit pas être désactivé par une substitution. `event_reminders`, `serving_schedule` et `tasks` listent `sms` à la fois dans `defaultChannels` et `allowedChannels`.
- Les personnes sans `mobilePhone` ou avec `optedOut` activé sont exclues. Si l'église n'a aucun fournisseur de textos, le reste du lot est exclu avec la raison `no_provider`.
- Le corps est construit par `ReminderEngine.smsBody()` : `"<Church name>: <message> Reply STOP to opt out."`, tronqué à un seul segment de 160 caractères.
- Chaque destinataire reçoit sa propre ligne `reminderSentLog` avec `channel: "sms"` et le statut `sent` / `suppressed` / `failed`, enregistrée séparément de la ligne push/courriel, de sorte qu'un texto en échec ne renvoie jamais le push ou le courriel.

Les éditeurs ne proposent **Texto** que lorsque `GET /messaging/texting/status` renvoie `{ enabled: true }` (le premier fournisseur de textos de l'église est activé).

**Désabonnement STOP.** `POST /messaging/texting/inbound/:churchId/:token` est un webhook anonyme que l'église colle chez son fournisseur (B1Admin affiche l'URL issue de `GET /messaging/texting/inboundUrl` dans les paramètres de textos). Le jeton est un HMAC de l'identifiant de l'église (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accepte les champs de formulaire de type Twilio et le JSON de type Clearstream/TextInChurch ; si la réponse est exactement un mot d'arrêt d'opérateur (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), chaque personne non supprimée de l'église dont le numéro de mobile correspond reçoit `people.optedOut = true` et `allowSms = false`. Les autres réponses sont accusées réception et ignorées.

Un bus d'événements interne réagit aux modifications d'entités sans attendre le développement nocturne : les événements de contenu (via le répartiteur de webhooks) et les événements de mise à jour de plan et de tâche déclenchent un redéveloppement ou une annulation immédiats pour l'entité concernée, et une mise à jour de plan redéveloppe aussi les définitions de portée liées à son type de plan.

### Adaptateurs {#adapters}

Le moteur est indépendant des entités ; chaque type d'entité pris en charge s'y branche via un adaptateur (`helpers/adapters/`) :

| Type d'entité | Adaptateur | Remarques |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinataires limités aux inscrits ou aux membres du groupe, selon l'événement et le `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Les destinataires sont les affectations Acceptées + Non confirmées sur les plans publiés (non brouillons). Les affectations non confirmées émises via un workflow de confirmation de service sont exclues jusqu'à leur acceptation (voir ci-dessous). `buildEmails` appelle `DoingModuleGateway.buildPlanReminderEmails`, qui génère les postes, les notes et un message personnalisé via `doing/helpers/PlanReminderEmailHelper`, y compris les boutons Accepter/Refuser signés par `ReminderTokenHelper` qui envoient une requête à un point de terminaison public de réponse aux affectations. |
| `task` | `TaskReminderAdapter` | Les destinataires sont le ou les assignés de la tâche. |

### Points de terminaison {#endpoints}

| Méthode | Chemin | Rôle |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Charge ou enregistre la définition de rappel d'une entité. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Charge ou enregistre une définition de rappel de portée (héritée). |
| `DELETE` | `/messaging/reminders/:defId` | Supprime une définition et annule ses occurrences en attente. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Prévisualise le nombre de destinataires et les prochaines dates d'envoi d'un rappel d'événement avant enregistrement. |
| `GET` | `/messaging/reminders/log` | Historique récent des occurrences de rappel d'une église. |
| `POST` | `/messaging/reminders/mute` | Met en sourdine les rappels d'une entité précise. |

Enregistrer une définition déclenche un développement synchrone pour cette entité ou cette portée, afin que les éditeurs voient des « prochains envois » à jour sans attendre la tâche nocturne.

## Messages directs {#direct-messages}

Les messages directs empruntent le même entonnoir que tout le reste, plutôt qu'un chemin d'escalade distinct. Chaque conversation non lue obtient une **ligne fantôme** dans `notifications` (`contentType='privateMessage'`, `contentId` = l'identifiant du message privé, `category='direct_messages'`) qui porte tout l'état de livraison — escalade socket/push/courriel, suivi de lecture, tout. La table `privateMessages` conserve elle-même le contenu du message et une colonne `notifyPersonId`, qui est la source du badge non lu et qui est effacée lorsque le destinataire lit la conversation.

Les lignes fantômes sont invisibles dans la cloche des notifications : elles sont exclues de la requête de comptage des non lus, de la requête de liste des notifications et des requêtes de marquage comme lu/suppression, qui filtrent toutes `contentType <> 'privateMessage'`. Chaque signal de message direct passe par le socket quel que soit l'état de lecture (sémantique du chat en direct — pas de déduplication), et les messages directs ne s'arrêtent jamais au socket comme le font les notifications ordinaires, puisqu'une PWA en arrière-plan peut garder un socket ouvert tout en ayant encore besoin d'un push au niveau du système d'exploitation. Si une personne désactive les notifications de messages directs, la ligne fantôme est mise en attente (`isNew=false`, `notifyPersonId` effacé) — elle reste visible dans la conversation elle-même, mais sans badges ni alertes.

## Préférences et filtrage {#preferences--gating}

Chaque envoi passe par `PreferenceGateHelper.evaluate()`, une fonction pure (tout l'état est transmis en entrée, aucun appel à la base sur le chemin critique) qui renvoie `allow`, `suppress` ou `defer`. Les couches s'exécutent dans l'ordre, et la première qui décide l'emporte :

1. **Catégorie verrouillée** — certaines catégories sont obligatoires (niveau 0) et contournent toutes les autres couches.
2. **Coupure générale / canal** — `masterMute`, `allowPush`, `allowSms` (désactivé par défaut — les membres doivent y consentir) ou `emailFrequency='never'` suppriment directement l'envoi.
3. **Heures de silence** — push et SMS uniquement (le courriel est considéré comme non intrusif). Si l'heure locale actuelle du fuseau de la personne tombe dans sa plage de silence, une catégorie transactionnelle passe quand même ; une catégorie non transactionnelle est reportée à la fin de la plage de silence, calculée comme un instant UTC tenant compte de l'heure d'été via `TimezoneHelper.wallClockToUtc`.
4. **Substitution de préférence par catégorie** — un refus explicite pour une paire catégorie × canal ; l'absence signifie la valeur par défaut de la catégorie.
5. **Sourdine par entité** — une sourdine enregistrée pour une entité précise (par exemple un événement ou un plan) restreint davantage que le réglage de catégorie, mais ne s'applique que si l'appelant fournit un identifiant et un type d'entité avec la notification.

Tables concernées : `notificationPreferences` (globale — `masterMute`, `emailFrequency` parmi `individual|daily|weekly|never`, `allowPush`, plage d'heures de silence et fuseau horaire, `allowSms`), `notificationPreferenceOverrides` (par catégorie × canal) et `notificationEntityMutes` (par entité).

Ce filtre est appliqué pour l'in-app (niveau 0), le push (niveau 1) et le courriel (niveau 2) à l'intérieur de l'entonnoir — y compris les courriels de rappel et de récapitulatif immédiats — ainsi que pour les textos de rappel dans `ReminderEngine.sendSms()`. Le courriel transactionnel (codes d'authentification, réinitialisations de mot de passe, invitations, reçus de dons) le contourne par conception ; c'est tout l'intérêt de la seconde porte.

### Workflows de confirmation de service {#serving-confirmation-workflows}

Un plan peut opter pour un workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publier/Notifier appelle alors `POST /doing/plans/:id/issueRequests` au lieu de la notification par affectation : chaque nouvelle affectation Non confirmée reçoit `notified` + `confirmationWorkflowId` et une fiche de workflow (`tasks.assignmentId`, `followupKey` unique). La fiche envoie une alerte réservée à l'application (`appOnly: true` — pas d'escalade push/courriel), puis exécute les actions `sendAssignmentRequest` du workflow, qui passent par `MessagingModuleGateway.sendServingWorkflowMessage` : courriel via `NotificationHelper.sendWorkflowEmail` (filtre de préférence + `ChurchEmailLimiter`, compté comme `workflowEmail`), SMS via `sendPersonText` uniquement avec `allowSms` et le filtre de catégorie `serving_schedule`. Accepter/Refuser (`assignment.updated` sur le bus d'événements) ferme la fiche ; le minuteur de 30 minutes (`AssignmentWorkflowHelper.processPending`) répare les démarrages et événements manqués, et transforme une demande sans réponse à l'échéance de relance en tâche de révision pour le responsable. Cycle de vie complet : `Api/docs/assignment-confirmation-workflows.md`.

## Limites des courriels rédigés par l'église {#church-authored-email-limits}

Les courriels dont le contenu a été rédigé par une église sont envoyés depuis l'identité SES partagée de ChurchApps, donc leur volume est mesuré par église par `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatre chemins l'utilisent : les envois de groupe/modèle (`EmailTemplateController`, type de contenu `email`), les courriels de suivi de formulaire (`FormSubmissionController`, `formFollowUp`), les actions **Envoyer un courriel** des workflows (`NotificationHelper` avec `churchAuthored`, `workflowEmail`), et les courriels de demande de confirmation de service (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Les courriels système (codes d'authentification, reçus, rappels) et les invitations de rôle et de groupe (`UserController.sendInviteEmail`, un modèle fixe) ne sont pas mesurés.

- **Filtre d'approbation.** Une église n'envoie rien tant qu'un administrateur serveur n'a pas défini `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → puce **Group Email**). Les églises archivées sont toujours bloquées. La boîte de dialogue Envoyer un courriel de B1Admin lit `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) et, si l'église n'est pas approuvée, affiche une carte **Demander une révision** au lieu de l'éditeur. L'éditeur d'étapes de workflow lit le même point de terminaison (ouvert à `tasks.admin` comme à `groupMembers.edit`) pour avertir sur les actions **Envoyer un courriel** lorsque l'église n'est pas approuvée ou est suspendue. Au moment de l'envoi, `MessagingModuleGateway.sendTemplatedEmail` renvoie `false` sans créer de notification lorsque `ChurchEmailLimiter.remaining()` est inférieur à 1, afin que l'historique de la fiche n'affirme jamais **Courriel envoyé** pour un courriel abandonné. `POST /messaging/emailTemplates/requestApproval` envoie un courriel au support, au plus une fois par église et par semaine.
- **Allocation gagnée.** Une église approuvée obtient `max(150, 2 × its best church-authored day in the prior 30 days)`, plafonnée à 2 000 par période glissante de 24 heures. Les 24 heures en cours sont exclues du « meilleur jour » afin qu'une rafale ne puisse pas élever sa propre limite.
- **Réserver, puis régler.** `reserve()` écrit une ligne `deliveryLogs` par destinataire avant l'envoi, revérifie l'allocation en comptant ces lignes, et recule si deux requêtes ont dépassé la limite en même temps (l'envoi renvoie 429). `settle()` marque chaque ligne comme envoyée ou en échec.
- **Suspension pour plaintes.** La fonction Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentée par SES → SNS) rattache chaque rebond permanent ou plainte à l'église dont le courriel rédigé a atteint cette adresse à peu près au même moment, stocké sous les `deliveryMethod` `sesBounce` / `sesComplaint`. Une église est suspendue à partir de 2 plaintes ou plus (≥ 0,3 % des envois) ou de 10 rebonds définitifs ou plus (≥ 5 %) sur 7 jours.

## Planification {#scheduling}

Le moteur de rappels et le récapitulatif de notifications s'appuient tous deux sur des minuteurs programmés existants plutôt que d'introduire une nouvelle infrastructure :

| Minuteur | Fréquence | Exécute |
|-------|----------|----------|
| Minuteur de 30 minutes | toutes les 30 minutes | Escalade des notifications non lues ; envoi des courriels récapitulatifs de fréquence `individual` ; envoi des occurrences de rappel échues (`ReminderEngine.scan`) ; récapitulatifs d'approbation ; exécutions d'automatisation échues |
| Minuteur d'une minute (`timerWebhooks`) | chaque minute | Envoi des notifications push programmées échues (`ScheduledNotificationHelper.dispatchDue`, tâche `scheduledNotifications`) |
| Minuteur nocturne | 05:00 UTC | Rappels de présence de groupe ; avancement des services de diffusion récurrents ; rafraîchissement des listes à actualisation automatique ; développement des occurrences de rappel jusqu'au prochain horizon (`ReminderEngine.expandAll`) ; envoi des courriels récapitulatifs de fréquence `daily` |

En local, la même logique peut être déclenchée à la demande avec `npm run timer:30min` et `npm run timer:midnight` depuis le projet `Api`.

## Inventaire des fichiers {#file-inventory}

| Domaine | Fichiers |
|------|------|
| Entonnoir | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Point d'entrée partagé | `Api/src/shared/helpers/NotificationService.ts` |
| Porte transactionnelle | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, règle lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites de courriels de l'église | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Moteur de rappels | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textos / désabonnement STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Texter les bénévoles** de l'aperçu des services) |
| Dépôts de rappels | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Courriel de service/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Éditeurs de rappels (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Éditeur de rappels / préférences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pages connexes {#related-pages}

- [Architecture temps réel](../realtime.md) — le protocole WebSocket et les primitives client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sur lesquelles repose le niveau de livraison in-app
- [Notifications push web](../web-push.md) — configuration VAPID et chemin de l'API Push du navigateur utilisé par le niveau d'escalade push
- [Points de terminaison de messagerie](../api/endpoints/messaging.md) — surface REST complète pour les messages, conversations, connexions, et routes de notifications/rappels
