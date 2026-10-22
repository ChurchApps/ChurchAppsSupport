---
title: "Architecture des notifications et rappels"
---

# Architecture des notifications et rappels {#notifications--reminders-architecture}

<div class="article-intro">

Chaque message qu'un membre d'église voit en dehors de la page qu'il consulte — un compteur sur une icône, une notification push, un courriel récapitulatif — passe par l'une des deux portes de MessagingApi. Cette page décrit l'entonnoir, le moteur de rappels qui l'alimente selon un calendrier, et le modèle de préférences qui détermine ce qui parvient réellement à une personne.

</div>

## Vue d'ensemble : deux portes {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Tout ce qui informe une personne** passe par `NotificationHelper.createNotifications()` dans le module messaging. Cette fonction enregistre une ligne `notifications` et fait monter la notification de socket à push puis à courriel, en évaluant `PreferenceGateHelper` pour chaque canal — y compris `in_app` au niveau 0.
2. **Tout ce qui est programmé** est une `reminderDefinition` (au niveau de l'entité ou de la portée), développée en `reminderOccurrences` et envoyée par `ReminderEngine.scan()` sur une minuterie récurrente. Un seul développeur, un seul distributeur, un seul registre d'envois (`reminderSentLog`).
3. **Les courriels directs** n'existent que derrière `TransactionalEmailHelper.sendTransactional()`. Une règle ESLint l'impose à la compilation — voir ci-dessous.

:::tip La porte des courriels est imposée par le linter, et pas seulement par convention
`Api/tools/eslint-rules/email-door.cjs` définit `no-direct-email-helper` : tout appel à `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` en dehors de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` échoue au lint. Si vous devez envoyer un courriel, passez par l'entonnoir (`createNotifications` avec `emailImmediate`) ou par `TransactionalEmailHelper.sendTransactional()` — il n'existe aucune troisième voie qui passe l'intégration continue.
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
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Pour chaque destinataire, la fonction enregistre une ligne dans `notifications` et appelle `attemptDeliveryWithEscalation`, qui parcourt l'échelle des canaux ci-dessous. Une ligne encore non lue pour le même couple `(contentType, contentId)` empêche sa recréation : ce garde-fou contre les doublons est ignoré pour les envois `emailImmediate` (échéances de rappel, « courriel à tous » du personnel, étapes de workflow qui gèrent leur propre dédoublonnage) et pour les messages directs, qui signalent toujours le socket.

`shared/helpers/NotificationService.ts` reprend la même signature (`NotificationServiceOptions`) pour les appelants situés hors du module messaging, et est enregistré auprès du module messaging au démarrage.

## Échelle d'escalade des canaux {#channel-escalation-chain}

La livraison commence à un niveau (0 par défaut, ou plus élevé pour les rappels et les envois explicites) et ne passe au canal suivant que si le précédent a échoué. Chaque niveau est filtré par `PreferenceGateHelper` avant toute tentative.

| Niveau | Canal | Comportement |
|-------|---------|----------|
| 0 | **in_app / socket** | Le filtre `in_app` est vérifié en premier. Si la notification est supprimée (mise en sourdine), la ligne est enregistrée avec `isNew=false` et la livraison s'arrête complètement — ni signal socket, ni badge, ni escalade supplémentaire. Sinon, le serveur recherche les connexions socket ouvertes de la salle `alerts` de la personne et envoie une trame `notification` (ou `privateMessage`). Pour les notifications ordinaires, une livraison réussie par socket arrête la chaîne ici — la minuterie de 30 minutes revérifie les éléments non lus et les escalade plus tard. Les messages directs ne s'arrêtent jamais au socket : une PWA installée peut garder le socket d'alertes ouvert en arrière-plan, ce qui empêcherait sinon la notification push au niveau du système d'exploitation. |
| 1 | **push** | Soumis à `allowPush`, au refus par catégorie et aux heures calmes. Envoie aux jetons de notification Expo et aux abonnements Web Push trouvés dans les lignes `devices` de la personne, en dédoublonnant par point de terminaison et en supprimant les jetons périmés au passage. |
| 2 | **courriel** | Soumis à `emailFrequency` et au refus par catégorie. Les envois immédiats (`emailImmediate`) sont générés tout de suite et écrivent une ligne `deliveryLogs` ; sinon, la notification reste en attente pour le courriel récapitulatif groupé décrit ci-dessous. |
| — | **SMS** | Ce n'est pas un niveau de l'échelle d'escalade. Le seul producteur de SMS soumis à filtrage est le moteur de rappels : lorsque les `channels` d'une définition incluent `sms`, `ReminderEngine.sendSms()` envoie un texto à chaque destinataire **en plus** de la notification push ou courriel (voir [Rappels par SMS](#text-reminders)). L'envoi massif de SMS (`TextingController` / `@churchapps/texting`), l'envoi **Text Volunteers** de l'aperçu des services (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) et l'action d'étape de workflow **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) passent tous directement par le fournisseur de l'église ; les préférences de notification et les heures calmes ne s'y appliquent donc pas — seul l'indicateur `optedOut` de la personne est respecté. |

Les notifications non lues restées au niveau socket ou push sont escaladées par la minuterie de 30 minutes (`NotificationHelper.escalateDelivery`). Le courriel groupé est envoyé par `NotificationHelper.sendEmailNotifications(frequency)`, piloté par la préférence `emailFrequency` de chaque personne : `individual` s'exécute sur la minuterie de 30 minutes, `daily` s'exécute sur la minuterie nocturne. (`weekly` est une valeur de préférence valide mais ne dispose pas encore d'un envoi groupé dédié.)

## Moteur de rappels {#reminder-engine}

Les rappels programmés — rappels d'événements, dates d'échéance des tâches, rappels d'affectation au service ou aux plans — passent tous par un seul moteur généralisé plutôt que par une logique cron propre à chaque fonctionnalité.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Définitions** (`reminderDefinitions`) sont soit au niveau de l'entité (`entityId` renseigné — un événement, une tâche ou un plan précis), soit au niveau de la portée (`entityId` nul, `scopeId` renseigné — par ex. chaque plan d'un type de plan de service). Une définition porte une liste CSV de décalages en minutes (`offsets`, par ex. `"1440,60"` pour un jour et une heure avant), une heure d'envoi locale (`sendLocalTime`), une liste CSV de canaux (`channels` — y compris `email`, qui déclenche un courriel riche immédiat au moment de l'envoi), un `recipientMode`, et un `message` personnalisé facultatif.

**L'expansion** matérialise les lignes de déclenchement pour l'horizon à venir (une fenêtre glissante de plusieurs jours). Elle s'exécute sur la minuterie nocturne, et de façon synchrone à chaque enregistrement d'une définition, afin qu'un rappel pour un événement de dernière minute soit tout de même déclenché. Les définitions de portée se répartissent via `loadScopeEntities` de l'adaptateur, en produisant un ensemble d'occurrences par entité concrète ; les occurrences au niveau de l'entité utilisent la clé `definitionId:occurrenceISO:offset`, tandis que les occurrences de portée sont espacées par identifiant d'entité pour ne jamais entrer en collision. L'insertion d'une occurrence **ressuscite** une ligne précédemment annulée — annuler puis redévelopper est la façon standard de resynchroniser un rappel après une modification de l'entité sous-jacente ; les lignes déjà `sent`, `failed` ou `processing` restent intactes.

**Distribution** (`ReminderEngine.scan()`) s'exécute sur la minuterie de 30 minutes. Elle réserve les occurrences échues (un bail empêche le double traitement), charge les destinataires via l'adaptateur de l'entité, écarte toute personne déjà consignée dans `reminderSentLog` pour cette occurrence, et appelle `createNotifications` avec `deliveryStartLevel: 1` (passage direct au push), ainsi que `emailImmediate`/`emailByPerson` lorsque les canaux de la définition incluent le courriel.

### Rappels par SMS {#text-reminders}

Lorsque les `channels` d'une définition incluent `sms`, `scan()` appelle `ReminderEngine.sendSms()` après la création des notifications push et courriel, pour les mêmes destinataires récents. L'envoi de textos est facultatif pour chaque membre :

- Chaque destinataire passe par `PreferenceGateHelper.evaluate(..., "sms", ...)` ; `allowSms` doit donc être activé (il est désactivé par défaut et se règle depuis le commutateur **Text messages** de B1App), et le canal `sms` de la catégorie ne doit pas être désactivé par une substitution. `event_reminders`, `serving_schedule` et `tasks` listent `sms` à la fois dans `defaultChannels` et `allowedChannels`.
- Les personnes sans `mobilePhone` ou dont `optedOut` est activé sont écartées. Si l'église n'a pas de fournisseur de SMS, le reste du lot est écarté avec le motif `no_provider`.
- Le corps est construit par `ReminderEngine.smsBody()` : `"<Church name>: <message> Reply STOP to opt out."`, tronqué à un seul segment de 160 caractères.
- Chaque destinataire reçoit sa propre ligne `reminderSentLog` avec `channel: "sms"` et le statut `sent` / `suppressed` / `failed`, enregistrée séparément de la ligne push/courriel ; ainsi, un texto en échec ne renvoie jamais le push ou le courriel.

Les éditeurs ne proposent **Text** que si `GET /messaging/texting/status` renvoie `{ enabled: true }` (le premier fournisseur de SMS de l'église est activé).

**Désabonnement par STOP.** `POST /messaging/texting/inbound/:churchId/:token` est un webhook anonyme que l'église colle dans son fournisseur (B1Admin affiche l'URL issue de `GET /messaging/texting/inboundUrl` dans les paramètres de SMS). Le jeton est un HMAC de l'identifiant de l'église (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accepte les champs de formulaire de type Twilio et le JSON de type Clearstream/TextInChurch ; si la réponse est exactement un mot d'arrêt de l'opérateur (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), chaque personne non supprimée de l'église dont le numéro de mobile correspond reçoit `people.optedOut = true` et `allowSms = false`. Les autres réponses sont accusées réception et ignorées.

Un bus d'événements interne réagit aux modifications des entités sans attendre l'expansion nocturne : les événements de contenu (via le distributeur de webhooks) et les événements de mise à jour de plan et de tâche déclenchent une réexpansion ou une annulation immédiate pour l'entité concernée, et une mise à jour de plan redéveloppe aussi les définitions de portée liées à son type de plan.

### Adaptateurs {#adapters}

Le moteur est indépendant des entités ; chaque type d'entité pris en charge se branche via un adaptateur (`helpers/adapters/`) :

| Type d'entité | Adaptateur | Remarques |
|-------------|-----------|-------|
| `event` | `EventReminderAdapter` | Destinataires limités aux inscrits ou aux membres du groupe selon l'événement et le `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Les destinataires sont les affectations de plan Accepted et Unconfirmed. `buildEmails` appelle `DoingModuleGateway.buildPlanReminderEmails`, qui génère les positions, les notes et un message personnalisé via `doing/helpers/PlanReminderEmailHelper`, y compris les boutons Accept/Decline signés par `ReminderTokenHelper` qui envoient une requête à un point de terminaison public de réponse à l'affectation. |
| `task` | `TaskReminderAdapter` | Les destinataires sont le ou les responsables de la tâche. |

### Points de terminaison {#endpoints}

| Méthode | Chemin | Rôle |
|--------|------|-------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Charge ou enregistre la définition de rappel d'une entité. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Charge ou enregistre une définition de rappel au niveau de la portée (héritée). |
| `DELETE` | `/messaging/reminders/:defId` | Supprime une définition et annule ses occurrences en attente. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Prévisualise le nombre de destinataires et les prochaines dates d'envoi d'un rappel d'événement avant l'enregistrement. |
| `GET` | `/messaging/reminders/log` | Historique récent des occurrences de rappel pour une église. |
| `POST` | `/messaging/reminders/mute` | Met en sourdine les rappels pour une entité précise. |

L'enregistrement d'une définition déclenche une réexpansion synchrone pour cette entité ou cette portée, afin que les éditeurs voient des « prochains envois » à jour sans attendre la tâche nocturne.

## Messages directs {#direct-messages}

Les messages directs empruntent le même entonnoir que tout le reste, plutôt qu'une voie d'escalade distincte. Chaque conversation non lue obtient une **ligne fantôme** dans `notifications` (`contentType='privateMessage'`, `contentId` = l'identifiant du message privé, `category='direct_messages'`) qui porte tout l'état de livraison — escalade socket/push/courriel, suivi de lecture, tout. La table `privateMessages` conserve elle-même le contenu du message et une colonne `notifyPersonId`, qui alimente le badge des non-lus et qui est effacée lorsque le destinataire lit la conversation.

Les lignes fantômes sont invisibles pour la cloche des notifications : elles sont exclues de la requête de comptage des non-lus, de la requête de liste des notifications et des requêtes de marquage comme lu et de suppression, qui filtrent toutes sur `contentType <> 'privateMessage'`. Chaque signal de DM atteint le socket quel que soit l'état de lecture (sémantique de messagerie en direct — sans dédoublonnage), et les DM ne s'arrêtent jamais au socket comme le font les notifications ordinaires, car une PWA en arrière-plan peut garder un socket ouvert tout en ayant encore besoin d'une notification push au niveau du système. Si une personne désactive les notifications de DM, la ligne fantôme est mise de côté (`isNew=false`, `notifyPersonId` effacé) — elle reste visible dans la conversation elle-même, mais sans badges ni alertes.

## Préférences et filtrage {#preferences--gating}

Chaque envoi passe par `PreferenceGateHelper.evaluate()`, une fonction pure (tout l'état est transmis en paramètre, aucun appel à la base de données sur le chemin critique) qui renvoie `allow`, `suppress` ou `defer`. Les couches s'exécutent dans l'ordre, et la première qui tranche l'emporte :

1. **Catégorie verrouillée** — certaines catégories sont obligatoires (niveau 0) et contournent toutes les autres couches.
2. **Coupure générale / coupure de canal** — `masterMute`, `allowPush`, `allowSms` (désactivé par défaut — les membres doivent s'inscrire) ou `emailFrequency='never'` suppriment directement l'envoi.
3. **Heures calmes** — push et SMS seulement (le courriel est considéré comme non intrusif). Si l'heure murale actuelle dans le fuseau horaire de la personne tombe dans sa plage calme, une catégorie transactionnelle passe quand même ; une catégorie non transactionnelle est reportée à la fin de la plage calme, calculée sous forme d'instant UTC tenant compte de l'heure d'été via `TimezoneHelper.wallClockToUtc`.
4. **Substitution par préférence de catégorie** — un refus explicite pour un couple catégorie × canal ; l'absence signifie la valeur par défaut de la catégorie.
5. **Sourdine par entité** — une sourdine enregistrée pour une entité précise (par ex. un événement ou un plan) restreint davantage que le paramètre de catégorie, mais ne s'applique que si l'appelant fournit un identifiant et un type d'entité avec la notification.

Tables concernées : `notificationPreferences` (global — `masterMute`, `emailFrequency` valant `individual|daily|weekly|never`, `allowPush`, plage et fuseau horaire des heures calmes, `allowSms`), `notificationPreferenceOverrides` (par catégorie × canal) et `notificationEntityMutes` (par entité).

Ce filtre est appliqué pour les notifications in-app (niveau 0), push (niveau 1) et courriel (niveau 2) à l'intérieur de l'entonnoir — y compris pour les courriels de rappel et récapitulatifs immédiats — ainsi que pour les textos de rappel dans `ReminderEngine.sendSms()`. Les courriels transactionnels (codes d'authentification, réinitialisations de mot de passe, invitations, reçus de dons) le contournent par conception ; c'est tout l'intérêt de la seconde porte.

## Limites des courriels rédigés par l'église {#church-authored-email-limits}

Les courriels dont le contenu a été rédigé par une église sont envoyés depuis l'identité SES partagée de ChurchApps ; leur volume est donc limité par église par `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Trois chemins l'appellent : les envois de groupe et de modèle (`EmailTemplateController`, type de contenu `email`), les courriels de suivi de formulaire (`FormSubmissionController`, `formFollowUp`) et les actions **Send email** des workflows (`NotificationHelper` avec `churchAuthored`, `workflowEmail`). Les courriels système (codes d'authentification, reçus, rappels) ainsi que les invitations de rôles et de groupes (`UserController.sendInviteEmail`, modèle fixe) ne sont pas limités.

- **Filtre d'approbation.** Une église n'envoie rien tant qu'un administrateur serveur n'a pas défini `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → pastille **Group Email**). Les églises archivées sont toujours bloquées. La boîte de dialogue Send Email de B1Admin lit `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) et, si l'église n'est pas approuvée, affiche une carte **Request review** au lieu de l'éditeur. `POST /messaging/emailTemplates/requestApproval` envoie un courriel au support, au plus une fois par semaine et par église.
- **Quota gagné.** Une église approuvée obtient `max(150, 2 × son meilleur jour de courriels rédigés par l'église au cours des 30 derniers jours)`, plafonné à 2 000 sur une période glissante de 24 heures. Les 24 heures en cours sont exclues du « meilleur jour » afin qu'une rafale ne puisse pas relever sa propre limite.
- **Réserver, puis régler.** `reserve()` écrit une ligne `deliveryLogs` par destinataire avant l'envoi, revérifie le quota en comptant ces lignes, et annule si deux requêtes concurrentes ont dépassé la limite (l'envoi renvoie alors 429). `settle()` marque chaque ligne comme envoyée ou en échec.
- **Suspension après plaintes.** La fonction Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentée par SES → SNS) rattache chaque rebond définitif ou plainte à l'église dont le courriel rédigé a atteint cette adresse à peu près au même moment, enregistré avec `deliveryMethod` `sesBounce` / `sesComplaint`. Une église est suspendue à partir de 2 plaintes ou plus (≥ 0,3 % des envois) ou de 10 rebonds définitifs ou plus (≥ 5 %) sur 7 jours.

## Planification {#scheduling}

Le moteur de rappels comme le récapitulatif des notifications utilisent les minuteries planifiées existantes plutôt que d'introduire une nouvelle infrastructure :

| Minuterie | Planification | Exécute |
|-------|----------|------|
| Minuterie de 30 minutes | toutes les 30 minutes | Escalader les notifications non lues ; envoyer les courriels récapitulatifs de fréquence `individual` ; distribuer les occurrences de rappel échues (`ReminderEngine.scan`) ; récapitulatifs d'approbation ; exécutions d'automatisation échues |
| Minuterie nocturne | 05:00 UTC | Rappels de présence des groupes ; faire avancer les services de diffusion récurrents ; rafraîchir les listes à actualisation automatique ; développer les occurrences de rappel jusqu'au prochain horizon (`ReminderEngine.expandAll`) ; envoyer les courriels récapitulatifs de fréquence `daily` |

En local, la même logique peut être déclenchée à la demande avec `npm run timer:30min` et `npm run timer:midnight` depuis le projet `Api`.

## Inventaire des fichiers {#file-inventory}

| Domaine | Fichiers |
|------|------|
| Entonnoir | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Point d'entrée partagé | `Api/src/shared/helpers/NotificationService.ts` |
| Porte transactionnelle | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, règle lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites des courriels d'église | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Moteur de rappels | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| SMS / désabonnement STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (aperçu des services **Text Volunteers**) |
| Dépôts de rappels | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Courriels de service/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Éditeurs de rappels (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Éditeur de rappels / préférences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pages connexes {#related-pages}

- [Architecture temps réel](../realtime) — le protocole WebSocket et les primitives côté client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sur lesquelles repose le niveau de livraison in-app
- [Notifications Web Push](../web-push) — configuration VAPID et chemin de l'API Push du navigateur utilisé par le niveau d'escalade push
- [Points de terminaison Messaging](../api/endpoints/messaging) — surface REST complète pour les messages, conversations, connexions et routes de notifications et de rappels
