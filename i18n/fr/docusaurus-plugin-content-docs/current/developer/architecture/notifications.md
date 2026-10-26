---
title: "Architecture des notifications et des rappels"
---

# Architecture des notifications et des rappels

<div class="article-intro">

Chaque message qu'un membre de l'église voit en dehors de la page qu'il consulte — un compteur de badge, une notification push, un e-mail récapitulatif — passe par l'une des deux portes de la MessagingApi. Cette page décrit l'entonnoir, le moteur de rappels qui l'alimente selon un calendrier, et le modèle de préférences qui décide ce qui atteint réellement une personne.

</div>

## Vue d'ensemble — deux portes

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Tout ce qui informe une personne** passe par `NotificationHelper.createNotifications()` dans le module de messagerie. Elle enregistre une ligne `notifications` et fait remonter la notification du socket vers la push, puis vers l'e-mail, en évaluant `PreferenceGateHelper` pour chaque canal — y compris `in_app` au niveau 0.
2. **Tout ce qui est planifié** est une `reminderDefinition` (au niveau de l'entité ou de la portée) développée en `reminderOccurrences` et envoyée par `ReminderEngine.scan()` à intervalles réguliers. Un seul développeur, un seul distributeur, un seul journal d'envoi (`reminderSentLog`).
3. **L'envoi direct d'e-mails** n'existe que derrière `TransactionalEmailHelper.sendTransactional()`. Une règle ESLint l'impose à la compilation — voir ci-dessous.

:::tip La porte e-mail est imposée par le linter, et pas seulement par convention
`Api/tools/eslint-rules/email-door.cjs` définit `no-direct-email-helper` : tout appel à `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` en dehors de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` échoue au linter. Si vous devez envoyer un e-mail, passez par l'entonnoir (`createNotifications` avec `emailImmediate`) ou par `TransactionalEmailHelper.sendTransactional()` — il n'existe pas de troisième voie qui passe la CI.
:::

## L'entonnoir de notifications

`NotificationHelper.createNotifications()` est le point d'entrée unique pour tout ce qui n'est ni planifié ni transactionnel :

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
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Pour chaque destinataire, la fonction enregistre une ligne dans `notifications` et appelle `attemptDeliveryWithEscalation`, qui parcourt l'échelle de canaux décrite ci-dessous. Une ligne encore non lue pour le même couple `(contentType, contentId)` empêche sa recréation — ce garde-fou contre les doublons est ignoré pour les envois `emailImmediate` (décalages de rappel, « envoyer à tous » côté personnel, les étapes de workflow gèrent leur propre dédoublonnage) et pour les messages directs, qui envoient toujours un signal au socket.

`shared/helpers/NotificationService.ts` reprend la même signature (`NotificationServiceOptions`) pour les appelants situés hors du module de messagerie, et il est enregistré auprès du module de messagerie au démarrage.

## Échelle de remise en cas d'escalade

La remise commence à un niveau (0 par défaut, ou plus haut pour les rappels ou les envois explicites) et ne passe au canal suivant que si le précédent n'a pas réussi. Chaque niveau est filtré par `PreferenceGateHelper` avant toute tentative.

| Niveau | Canal | Comportement |
|-------|---------|----------|
| 0 | **in_app / socket** | Le filtre `in_app` est vérifié en premier. Si la notification est supprimée (en sourdine), la ligne est enregistrée avec `isNew=false` et la remise s'arrête complètement — ni signal socket, ni badge, ni escalade ultérieure. Sinon, le serveur recherche les connexions socket ouvertes vers la salle `alerts` de la personne et envoie une trame `notification` (ou `privateMessage`). Pour les notifications ordinaires, une remise réussie par socket arrête la chaîne ici — la minuterie de 30 minutes revérifie les éléments non lus et les escalade plus tard. Les messages directs ne s'arrêtent jamais au socket : une PWA installée peut garder le socket d'alertes ouvert en arrière-plan, ce qui empêcherait sinon la notification push au niveau du système d'exploitation. |
| 1 | **push** | Conditionné par `allowPush` / le refus de la catégorie / les heures calmes. Envoie à la fois aux jetons push Expo et aux abonnements Web Push trouvés dans les lignes `devices` de la personne, en dédoublonnant par point de terminaison et en supprimant les jetons périmés au passage. |
| 2 | **e-mail** | Conditionné par `emailFrequency` et le refus de la catégorie. Les envois immédiats (`emailImmediate`) sont générés tout de suite et écrivent une ligne `deliveryLogs` ; sinon, la notification reste en attente pour le récapitulatif par lots décrit plus bas. |
| — | **sms** | Ce n'est pas un niveau de l'échelle d'escalade. Le seul producteur de SMS soumis à filtrage est le moteur de rappels : lorsque les `channels` d'une définition incluent `sms`, `ReminderEngine.sendSms()` envoie un SMS à chaque destinataire **en plus** de la notification push ou e-mail (voir [Rappels par SMS](#text-reminders)). L'envoi de SMS en masse (`TextingController` / `@churchapps/texting`), l'action **Text Volunteers** de l'aperçu des services (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) et l'action d'étape de workflow **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) envoient tous des SMS directement via le fournisseur de l'église. Les préférences de notification et les heures calmes ne s'appliquent donc pas à eux — seul l'indicateur `optedOut` de la personne est respecté. |

Les notifications non lues restées au niveau socket ou push sont escaladées par la minuterie de 30 minutes (`NotificationHelper.escalateDelivery`). L'envoi groupé d'e-mails est assuré par `NotificationHelper.sendEmailNotifications(frequency)`, piloté par la préférence `emailFrequency` de chaque personne : `individual` s'exécute sur la minuterie de 30 minutes, `daily` s'exécute sur la minuterie nocturne. (`weekly` est une valeur de préférence valide, mais il n'existe pas encore de traitement par lots dédié.)

## Moteur de rappels

Les rappels planifiés — rappels d'événements, échéances de tâches, rappels d'affectation au service ou au plan — passent tous par un moteur généralisé plutôt que par une logique cron propre à chaque fonctionnalité.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Définitions** (`reminderDefinitions`) sont soit au niveau de l'entité (`entityId` renseigné — un événement, une tâche ou un plan précis), soit au niveau de la portée (`entityId` nul, `scopeId` renseigné — par exemple, chaque plan sous un type de plan de service). Une définition contient une liste CSV de décalages en minutes (`offsets`, par exemple `"1440,60"` pour un jour et une heure avant), une heure d'envoi locale (`sendLocalTime`), une liste CSV de canaux (`channels` — y compris `email`, qui déclenche un e-mail enrichi immédiat au moment de l'envoi), un `recipientMode` et un `message` personnalisé facultatif.

**L'expansion** matérialise les lignes d'envoi pour l'horizon à venir (une fenêtre glissante de plusieurs jours). Elle s'exécute sur la minuterie nocturne, et de façon synchrone à chaque enregistrement d'une définition, afin qu'un rappel pour un événement de dernière minute parte bien. Les définitions de portée se répartissent via `loadScopeEntities` de l'adaptateur, ce qui produit un ensemble d'occurrences par entité concrète ; les occurrences au niveau de l'entité utilisent la clé `definitionId:occurrenceISO:offset`, tandis que les occurrences de portée sont espacées par identifiant d'entité pour ne jamais entrer en collision. Insérer ou mettre à jour une occurrence **ressuscite** une ligne précédemment annulée — annuler puis réétendre est la méthode standard pour resynchroniser un rappel après une modification de l'entité sous-jacente ; les lignes déjà `sent`, `failed` ou `processing` restent inchangées.

**Envoi** (`ReminderEngine.scan()`) s'exécute sur la minuterie de 30 minutes. Il réserve les occurrences échues (un bail empêche le double traitement), charge les destinataires via l'adaptateur de l'entité, écarte toute personne déjà consignée dans `reminderSentLog` pour cette occurrence, puis appelle `createNotifications` avec `deliveryStartLevel: 1` (passer directement à la push) ainsi que `emailImmediate` / `emailByPerson` lorsque les canaux de la définition incluent l'e-mail.

### Rappels par SMS

Lorsque les `channels` d'une définition incluent `sms`, `scan()` appelle `ReminderEngine.sendSms()` après la création des notifications push ou e-mail, pour les mêmes destinataires récents. L'envoi de SMS est un choix par membre :

- Chaque destinataire passe par `PreferenceGateHelper.evaluate(..., "sms", ...)` : `allowSms` doit être activé (il est désactivé par défaut et se règle à partir du commutateur **Text messages** de B1App), et le canal `sms` de la catégorie ne doit pas être désactivé. `event_reminders`, `serving_schedule` et `tasks` listent `sms` à la fois dans `defaultChannels` et dans `allowedChannels`.
- Les personnes sans `mobilePhone` ou avec `optedOut` activé sont exclues. Si l'église ne dispose d'aucun fournisseur de SMS, le reste du lot est supprimé avec le motif `no_provider`.
- Le corps du message est construit par `ReminderEngine.smsBody()` : `"<Church name>: <message> Reply STOP to opt out."`, tronqué à un seul segment de 160 caractères.
- Chaque destinataire reçoit sa propre ligne `reminderSentLog` avec `channel: "sms"` et le statut `sent` / `suppressed` / `failed`, distincte de la ligne push/e-mail, de sorte qu'un SMS en échec ne renvoie jamais la push ou l'e-mail.

Les éditeurs ne proposent **Text** que lorsque `GET /messaging/texting/status` renvoie `{ enabled: true }` (le premier fournisseur de SMS de l'église est activé).

**Désabonnement par STOP.** `POST /messaging/texting/inbound/:churchId/:token` est un webhook anonyme que l'église colle chez son fournisseur (B1Admin affiche l'URL issue de `GET /messaging/texting/inboundUrl` dans les paramètres de SMS). Le jeton est un HMAC de l'identifiant de l'église (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accepte les champs de formulaire de type Twilio et le JSON de type Clearstream/TextInChurch ; si la réponse est exactement un mot d'arrêt de l'opérateur (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), chaque personne non supprimée de l'église dont le numéro mobile correspond reçoit `people.optedOut = true` et `allowSms = false`. Les autres réponses sont accusées réception mais ignorées.

Un bus d'événements interne réagit aux modifications d'entités sans attendre l'expansion nocturne : les événements de contenu (via le distributeur de webhooks) et les événements de mise à jour de plan et de tâche déclenchent une réexpansion ou une annulation immédiate pour l'entité concernée, et une mise à jour de plan réexpand également les définitions de portée liées à son type de plan.

### Adaptateurs

Le moteur est indépendant du type d'entité ; chaque type d'entité pris en charge se branche via un adaptateur (`helpers/adapters/`) :

| Type d'entité | Adaptateur | Remarques |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinataires limités aux inscrits ou aux membres du groupe, selon l'événement et le `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Les destinataires sont les affectations Acceptées et Non confirmées sur les plans publiés (non brouillons). Les affectations non confirmées émises par un workflow de confirmation de service sont exclues tant qu'elles n'ont pas été acceptées (voir ci-dessous). `buildEmails` fait appel à `DoingModuleGateway.buildPlanReminderEmails`, qui génère les positions, les notes et un message personnalisé via `doing/helpers/PlanReminderEmailHelper`, y compris les boutons Accepter/Refuser signés par `ReminderTokenHelper` qui envoient des requêtes POST vers un point de terminaison public de réponse aux affectations. |
| `task` | `TaskReminderAdapter` | Les destinataires sont le ou les responsables de la tâche. |

### Points de terminaison

| Méthode | Chemin | Rôle |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Charger ou enregistrer la définition de rappel d'une entité. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Charger ou enregistrer une définition de rappel de portée (héritée). |
| `DELETE` | `/messaging/reminders/:defId` | Supprimer une définition et annuler ses occurrences en attente. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Prévisualiser le nombre de destinataires et les prochaines dates d'envoi d'un rappel d'événement avant l'enregistrement. |
| `GET` | `/messaging/reminders/log` | Historique récent des occurrences de rappel pour une église. |
| `POST` | `/messaging/reminders/mute` | Mettre en sourdine les rappels pour une entité précise. |

L'enregistrement d'une définition déclenche une réexpansion synchrone pour cette entité ou cette portée, afin que les éditeurs voient les « prochains envois » à jour sans attendre la tâche nocturne.

## Messages directs

Les messages directs empruntent le même entonnoir que tout le reste, plutôt qu'un chemin d'escalade séparé. Chaque conversation non lue obtient une **ligne fantôme** dans `notifications` (`contentType='privateMessage'`, `contentId` = l'identifiant du message privé, `category='direct_messages'`) qui porte tout l'état de remise — escalade socket/push/e-mail, suivi de lecture, tout. La table `privateMessages` conserve elle-même le contenu du message et une colonne `notifyPersonId`, qui alimente le badge des messages non lus et est effacée lorsque le destinataire lit la conversation.

Les lignes fantômes sont invisibles dans la cloche de notifications : elles sont exclues de la requête de comptage des non lues, de la requête de liste des notifications et des requêtes de marquage comme lu ou de suppression, qui filtrent toutes `contentType <> 'privateMessage'`. Chaque notification de message direct atteint le socket quel que soit l'état de lecture (sémantique de chat en direct — pas de dédoublonnage), et les messages directs ne s'arrêtent jamais au socket comme le font les notifications ordinaires, car une PWA en arrière-plan peut garder un socket ouvert tout en ayant encore besoin d'une notification push au niveau du système. Si une personne met en sourdine les notifications de messages directs, la ligne fantôme est mise en attente (`isNew=false`, `notifyPersonId` effacé) — elle reste visible dans la conversation elle-même, mais sans badges ni alertes.

## Préférences et filtrage

Chaque envoi passe par `PreferenceGateHelper.evaluate()`, une fonction pure (tout l'état est transmis en paramètre, aucun appel à la base de données sur le chemin critique) qui renvoie `allow`, `suppress` ou `defer`. Les couches s'exécutent dans l'ordre, et la première qui tranche l'emporte :

1. **Catégorie verrouillée** — certaines catégories sont obligatoires (niveau 0) et contournent toutes les autres couches.
2. **Sourdine globale / coupure de canal** — `masterMute`, `allowPush`, `allowSms` (désactivé par défaut — les membres doivent l'activer) ou `emailFrequency='never'` suppriment l'envoi directement.
3. **Heures calmes** — push et SMS uniquement (l'e-mail est considéré comme non intrusif). Si l'heure murale actuelle dans le fuseau horaire de la personne tombe dans sa plage calme, une catégorie transactionnelle passe quand même ; une catégorie non transactionnelle est différée à la fin de la plage calme, calculée sous forme d'instant UTC correct au regard de l'heure d'été via `TimezoneHelper.wallClockToUtc`.
4. **Dérogation de préférence par catégorie** — un refus explicite pour un couple catégorie × canal ; l'absence signifie la valeur par défaut de la catégorie.
5. **Sourdine par entité** — une sourdine enregistrée pour une entité précise (par exemple un événement ou un plan) restreint davantage que le paramètre de catégorie, mais ne s'applique que si l'appelant fournit un identifiant et un type d'entité avec la notification.

Tables concernées : `notificationPreferences` (globale — `masterMute`, `emailFrequency` au format `individual|daily|weekly|never`, `allowPush`, fenêtre d'heures calmes et fuseau horaire, `allowSms`), `notificationPreferenceOverrides` (par catégorie × canal) et `notificationEntityMutes` (par entité).

Ce filtre est appliqué pour l'in-app (niveau 0), la push (niveau 1) et l'e-mail (niveau 2) à l'intérieur de l'entonnoir — y compris les e-mails immédiats de rappel ou de récapitulatif — et pour les SMS de rappel dans `ReminderEngine.sendSms()`. Les e-mails transactionnels (codes d'authentification, réinitialisations de mot de passe, invitations, reçus de dons) le contournent par conception ; c'est tout l'intérêt de la seconde porte.

### Workflows de confirmation de service

Un plan peut opter pour un workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publier/Notifier appelle alors `POST /doing/plans/:id/issueRequests` au lieu de la notification par affectation : chaque nouvelle affectation Non confirmée reçoit `notified` + `confirmationWorkflowId` et une carte de workflow (`tasks.assignmentId`, `followupKey` unique). La carte envoie une alerte réservée à l'application (`appOnly: true` — pas d'escalade push ni e-mail), puis exécute les actions `sendAssignmentRequest` du workflow, qui passent par `MessagingModuleGateway.sendServingWorkflowMessage` : e-mail via `NotificationHelper.sendWorkflowEmail` (filtre de préférences + `ChurchEmailLimiter`, compté comme `workflowEmail`), SMS via `sendPersonText` uniquement avec `allowSms` et le filtre de catégorie `serving_schedule`. Accepter/Refuser (`assignment.updated` sur le bus d'événements) ferme la carte ; la minuterie de 30 minutes (`AssignmentWorkflowHelper.processPending`) rattrape les démarrages et événements manqués, et transforme une demande restée sans réponse à l'échéance de relance en tâche de révision pour le responsable. Cycle de vie complet : `Api/docs/assignment-confirmation-workflows.md`.

## Limites des e-mails rédigés par l'église

Les e-mails dont le contenu a été rédigé par une église partent de l'identité SES partagée de ChurchApps, ils sont donc comptabilisés par église par `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatre chemins l'appellent : les envois de groupe et de modèle (`EmailTemplateController`, type de contenu `email`), les e-mails de suivi de formulaire (`FormSubmissionController`, `formFollowUp`), les actions de workflow **Send email** (`NotificationHelper` avec `churchAuthored`, `workflowEmail`) et les e-mails de demande de confirmation de service (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Les e-mails système (codes d'authentification, reçus, rappels) ainsi que les invitations de rôles et de groupes (`UserController.sendInviteEmail`, un modèle fixe) ne sont pas comptabilisés.

- **Porte d'approbation.** Une église n'envoie rien tant qu'un administrateur serveur n'a pas défini `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Admin serveur → Églises → puce **Group Email**). Les églises archivées sont toujours bloquées. La boîte de dialogue Send Email de B1Admin lit `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) et, si l'église n'est pas approuvée, affiche une carte **Request review** à la place de l'éditeur. L'éditeur d'étape de workflow lit le même point de terminaison (accessible aussi à `tasks.admin` en plus de `groupMembers.edit`) pour avertir sur les actions **Send email** lorsque l'église n'est pas approuvée ou est suspendue. Au moment de l'envoi, `MessagingModuleGateway.sendTemplatedEmail` renvoie `false` sans créer de notification lorsque `ChurchEmailLimiter.remaining()` est inférieur à 1, afin que l'historique de la carte n'affirme jamais **Email sent** pour un courrier abandonné. `POST /messaging/emailTemplates/requestApproval` envoie un e-mail au support, au plus une fois par semaine et par église.
- **Quota gagné.** Une église approuvée obtient `max(150, 2 × son meilleur jour d'e-mails rédigés par l'église sur les 30 derniers jours)`, plafonné à 2 000 par période glissante de 24 heures. Les 24 heures en cours sont exclues du calcul du « meilleur jour » afin qu'une rafale ne puisse pas relever sa propre limite.
- **Réserver, puis régler.** `reserve()` écrit une ligne `deliveryLogs` par destinataire avant l'envoi, revérifie le quota en comptant ces lignes, et annule si deux requêtes concurrentes ont dépassé la limite (l'envoi renvoie 429). `settle()` marque chaque ligne comme envoyée ou en échec.
- **Suspension après plaintes.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentée par SES → SNS) rattache chaque rebond permanent ou plainte à l'église dont l'e-mail rédigé a atteint cette adresse à peu près au même moment, stocké sous les `deliveryMethod` `sesBounce` / `sesComplaint`. Une église est suspendue à partir de 2 plaintes ou plus (≥ 0,3 % des envois) ou de 10 rebonds définitifs ou plus (≥ 5 %) sur 7 jours.

## Planification

Le moteur de rappels comme le récapitulatif des notifications reposent sur les minuteries planifiées existantes plutôt que sur une nouvelle infrastructure :

| Minuterie | Planification | Exécute |
|-------|---------|------|
| Minuterie de 30 minutes | toutes les 30 minutes | Escalader les notifications non lues ; envoyer les e-mails récapitulatifs de fréquence `individual` ; envoyer les occurrences de rappel échues (`ReminderEngine.scan`) ; récapitulatifs d'approbation ; exécutions d'automatisation échues |
| Minuterie nocturne | 05:00 UTC | Rappels de présence aux groupes ; faire avancer les services en streaming récurrents ; rafraîchir les listes à actualisation automatique ; étendre les occurrences de rappel pour le prochain horizon (`ReminderEngine.expandAll`) ; envoyer les e-mails récapitulatifs de fréquence `daily` |

En local, la même logique peut être déclenchée à la demande avec `npm run timer:30min` et `npm run timer:midnight` depuis le projet `Api`.

## Inventaire des fichiers

| Domaine | Fichiers |
|------|-------|
| Entonnoir | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Point d'entrée partagé | `Api/src/shared/helpers/NotificationService.ts` |
| Porte transactionnelle | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, règle de linter `Api/tools/eslint-rules/email-door.cjs` |
| Limites d'e-mails de l'église | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Moteur de rappels | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS / désabonnement STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (action **Text Volunteers** de l'aperçu des services) |
| Dépôts de rappels | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mails de service / de plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Éditeurs de rappels (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Éditeur de rappels / préférences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pages connexes

- [Architecture temps réel](../realtime) — le protocole WebSocket et les primitives côté client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sur lesquels repose le niveau de remise in-app
- [Notifications push Web](../web-push) — configuration VAPID et chemin de l'API Push du navigateur utilisé par le niveau d'escalade push
- [Points de terminaison de messagerie](../api/endpoints/messaging) — l'API REST complète pour les messages, les conversations, les connexions et les routes de notifications et de rappels
