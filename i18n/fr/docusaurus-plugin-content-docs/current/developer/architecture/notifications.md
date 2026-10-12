---
title: "Architecture des notifications et rappels"
---

# Architecture des notifications et rappels

<div class="article-intro">

Chaque message qu'un membre d'église voit en dehors de la page qu'il consulte — un badge de compteur, une notification push, un email de synthèse — passe par l'une des deux portes de MessagingApi. Cette page documente le tunnel, le moteur de rappels qui l'alimente selon un horaire, et le modèle de préférence qui décide ce qui atteint réellement une personne.

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

1. **Tout ce qui communique quelque chose à une personne** passe par `NotificationHelper.createNotifications()` dans le module de messagerie. Il persiste une ligne `notifications` et l'escalade socket → push → email, en évaluant `PreferenceGateHelper` par canal — y compris `in_app` au niveau 0.
2. **Tout ce qui est programmé** est une `reminderDefinition` (au niveau de l'entité ou du périmètre) développée en `reminderOccurrences` et expédiée par `ReminderEngine.scan()` sur un minuteur récurrent. Un moteur d'expansion, un distributeur, un ledger d'envoi (`reminderSentLog`).
3. **Email direct** n'existe que derrière `TransactionalEmailHelper.sendTransactional()`. Une règle ESLint l'enforce au moment de la compilation — voir ci-dessous.

:::tip La porte email est enforced par lint, pas seulement par convention
`Api/tools/eslint-rules/email-door.cjs` définit `no-direct-email-helper` : tout appel à `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` en dehors de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` échoue le lint. Si vous devez envoyer un email, routez-le par le tunnel (`createNotifications` avec `emailImmediate`) ou via `TransactionalEmailHelper.sendTransactional()` — il n'y a pas de troisième voie qui passe l'IC.
:::

## Le tunnel de notifications

`NotificationHelper.createNotifications()` est le point d'entrée unique pour tout ce qui n'est pas programmé ou transactionnel :

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

Pour chaque destinataire, il enregistre une ligne dans `notifications` et appelle `attemptDeliveryWithEscalation`, qui parcourt l'échelle des canaux ci-dessous. Une ligne non lue existante pour le même `(contentType, contentId)` supprime la recréation — cette garde de dédup est sautée pour les envois `emailImmediate` (décalages de rappels, envoi par le personnel « tous », les étapes de workflow possèdent leurs propres dedups) et pour les messages directs, qui pingent toujours le socket.

`shared/helpers/NotificationService.ts` reflète la même signature (`NotificationServiceOptions`) pour les appelants en dehors du module de messagerie et est enregistré avec le module de messagerie au démarrage.

## Chaîne d'escalade des canaux

La livraison commence à un niveau (0 par défaut, ou plus élevé pour les rappels/envois explicites) et ne passe au canal suivant que si le précédent n'a pas réussi. Chaque niveau est gated par `PreferenceGateHelper` avant toute tentative.

| Niveau | Canal | Comportement |
|-------|---------|----------|
| 0 | **in_app / socket** | La porte `in_app` est vérifiée en premier. Si supprimée (sourdine), la ligne est persistante avec `isNew=false` et la livraison s'arrête complètement — pas de ping socket, pas de badge, pas d'escalade ultérieure. Sinon, le serveur recherche les connexions socket ouvertes pour la salle `alerts` de la personne et pousse une trame `notification` (ou `privateMessage`). Pour les notifications ordinaires, une livraison socket réussie arrête la chaîne ici — le minuteur de 30 minutes revérifie les éléments non lus et les escalade plus tard. Les messages directs n'arrêtent jamais au socket : une PWA installée peut garder le socket d'alerte ouvert en arrière-plan, ce qui supprimerait autrement le push au niveau OS. |
| 1 | **push** | Gated sur `allowPush` / désabonnement de catégorie / heures silencieuses. Envoie aux jetons de poussée Expo et aux abonnements Web Push trouvés sur les lignes `devices` de la personne, en dédupliquant par endpoint et en élaguant les jetons obsolètes en cours de route. |
| 2 | **email** | Gated sur `emailFrequency` et désabonnement de catégorie. Les envois immédiats (`emailImmediate`) s'affichent immédiatement et écrivent une ligne `deliveryLogs` ; sinon la notification est laissée en attente pour le digest en lot, décrit ci-dessous. |
| — | **sms** | Pas un niveau de l'échelle d'escalade. Le seul producteur SMS soumis au contrôle est le moteur de rappels : lorsque les `channels` d'une définition incluent `sms`, `ReminderEngine.sendSms()` envoie un texte à chaque destinataire **en plus** de la notification push/email (voir [Rappels par texte](#text-reminders)). Les envois de textos en masse (`TextingController` / `@churchapps/texting`), l'envoi **Text Volunteers** de la vue d'ensemble des services (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) et l'étape d'action de workflow **Envoyer du texte** (`StepActionHelper.sendText` → `sendPersonText`) envoient tous directement du texte via le fournisseur de l'église, donc les préférences de notification et les heures silencieuses ne s'appliquent pas à eux — seul l'indicateur `optedOut` de la personne est honoré. |

Les notifications non lues laissées au socket ou à la poussée sont escaladées par le minuteur de 30 minutes (`NotificationHelper.escalateDelivery`). L'email par lot est envoyé par `NotificationHelper.sendEmailNotifications(frequency)`, géré par la préférence `emailFrequency` de chaque personne : `individual` s'exécute sur le minuteur de 30 minutes, `daily` s'exécute sur le minuteur nocturne. (`weekly` est une valeur de préférence valide mais n'a pas encore d'exécution par lot dédiée.)

## Moteur de rappels

Les rappels programmés — rappels d'événements, dates d'échéance de tâches, rappels d'affectation de service/plan — passent tous par un moteur généralisé plutôt que par une logique cron bespoke par fonctionnalité.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Les définitions** (`reminderDefinitions`) sont soit au niveau de l'entité (`entityId` défini — un événement, une tâche ou un plan spécifique) soit au niveau du périmètre (`entityId` null, `scopeId` défini — par exemple chaque plan sous un type de plan de service). Une définition porte un CSV de décalages en minutes (`offsets`, par ex. `"1440,60"` pour un jour et une heure avant), une heure d'envoi locale (`sendLocalTime`), un CSV de canaux (`channels` — y compris `email` déclenche un email riche immédiat au moment de l'envoi), un `recipientMode`, et un `message` personnalisé facultatif.

**L'expansion** matérialise les lignes de feu pour l'horizon à venir (une fenêtre mobile de plusieurs jours). Elle s'exécute sur le minuteur nocturne et synchronement chaque fois qu'une définition est enregistrée afin qu'un rappel pour un événement de dernière minute se déclenche toujours. Les définitions de périmètre se ramifient via le `loadScopeEntities` de l'adaptateur, produisant un ensemble d'occurrences par entité concrète ; les occurrences au niveau de l'entité utilisent la clé `definitionId:occurrenceISO:offset`, tandis que les occurrences limitées sont namespaced par ID d'entité afin qu'elles ne collisionnent jamais. L'upsert d'une occurrence **ressuscite** une ligne précédemment annulée — l'annulation puis la ré-expansion est la méthode standard pour resynchroniser un rappel après que l'entité sous-jacente change ; les lignes déjà `sent`, `failed`, ou `processing` sont laissées intactes.

**La répartition** (`ReminderEngine.scan()`) s'exécute sur le minuteur de 30 minutes. Elle réclame les occurrences attendues (un bail empêche le double traitement), charge les destinataires via l'adaptateur de l'entité, filtre toute personne déjà enregistrée dans `reminderSentLog` pour cette occurrence, et appelle `createNotifications` avec `deliveryStartLevel: 1` (sauter directement à la poussée) plus `emailImmediate`/`emailByPerson` quand les canaux de la définition incluent email.

### Rappels par texte {#text-reminders}

Lorsque les `channels` d'une définition incluent `sms`, `scan()` appelle `ReminderEngine.sendSms()` après la création des notifications push/email, pour les mêmes destinataires récents. L'envoi de textos est soumis à l'accord de chaque membre :

- Chaque destinataire passe par `PreferenceGateHelper.evaluate(..., "sms", ...)`, donc `allowSms` doit être activé (il est désactivé par défaut et se règle depuis l'interrupteur **Text messages** de B1App) et le canal `sms` de la catégorie ne doit pas être désactivé par une exception. `event_reminders`, `serving_schedule` et `tasks` listent `sms` à la fois dans `defaultChannels` et `allowedChannels`.
- Les personnes sans `mobilePhone` ou avec `optedOut` activé sont supprimées. Si l'église n'a pas de fournisseur de texte, le reste du lot est supprimé avec le motif `no_provider`.
- Le corps est construit par `ReminderEngine.smsBody()` : `"<Nom de l'église> : <message> Reply STOP to opt out."`, tronqué à un seul segment de 160 caractères.
- Chaque destinataire obtient sa propre ligne `reminderSentLog` avec `channel: "sms"` et le statut `sent` / `suppressed` / `failed`, indexée séparément de la ligne push/email, de sorte qu'un texte en échec ne renvoie jamais le push ou l'email.

Les éditeurs ne proposent **Text** que lorsque `GET /messaging/texting/status` renvoie `{ enabled: true }` (le premier fournisseur de texte de l'église est activé).

**Opt-out STOP.** `POST /messaging/texting/inbound/:churchId/:token` est un webhook anonyme que l'église colle dans son fournisseur (B1Admin affiche l'URL issue de `GET /messaging/texting/inboundUrl` dans les paramètres de texto). Le jeton est un HMAC de l'ID de l'église (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` accepte les champs de formulaire de style Twilio et le JSON de style Clearstream/TextInChurch ; si la réponse est exactement un mot d'arrêt de l'opérateur (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), chaque personne non supprimée de l'église dont le numéro de portable correspond reçoit `people.optedOut = true` et `allowSms = false`. Les autres réponses sont accusées de réception et ignorées.

Un bus d'événements interne réagit aux mutations d'entités sans attendre l'expansion nocturne : les événements de contenu (via le distributeur webhook) et les événements de mise à jour de plan/tâche déclenchent une ré-expansion ou une annulation immédiate pour l'entité affectée, et une mise à jour de plan ré-expand aussi les définitions de périmètre liées à son type de plan.

### Adaptateurs

Le moteur est agnostique de l'entité ; chaque type d'entité pris en charge se branche via un adaptateur (`helpers/adapters/`) :

| Type d'entité | Adaptateur | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Les destinataires sont limités aux inscrits ou aux membres du groupe selon l'événement et le `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Les destinataires sont les affectations de plan acceptées + non confirmées. `buildEmails` appelle dans `DoingModuleGateway.buildPlanReminderEmails`, qui restitue les positions, les notes, et un message personnalisé via `doing/helpers/PlanReminderEmailHelper`, y compris les boutons Accepter/Refuser signés par `ReminderTokenHelper` qui envoient à un endpoint public de réponse d'affectation. |
| `task` | `TaskReminderAdapter` | Les destinataires sont le ou les assignés de la tâche. |

### Endpoints

| Méthode | Chemin | Objectif |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Charger ou enregistrer la définition de rappel pour une entité. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Charger ou enregistrer une définition de rappel au niveau du périmètre (hérité). |
| `DELETE` | `/messaging/reminders/:defId` | Supprimer une définition et annuler ses occurrences en attente. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Aperçu du nombre de destinataires et des prochains temps de tir pour un rappel d'événement avant enregistrement. |
| `GET` | `/messaging/reminders/log` | Historique des occurrences de rappels récents pour une église. |
| `POST` | `/messaging/reminders/mute` | Couper les rappels pour une entité spécifique. |

L'enregistrement d'une définition déclenche une ré-expansion synchrone pour cette entité ou ce périmètre, afin que les éditeurs voient les « prochains tirs » à jour sans attendre le travail nocturne.

## Messages directs

Les messages directs utilisent le même tunnel que tout le reste plutôt qu'un chemin d'escalade séparé. Chaque conversation non lue obtient une **ligne d'ombre** dans `notifications` (`contentType='privateMessage'`, `contentId` = l'ID du message privé, `category='direct_messages'`) qui possède tout l'état de livraison — escalade socket/push/email, suivi des lectures, tout. Le tableau `privateMessages` lui-même garde la charge utile du message et une colonne `notifyPersonId`, qui est la source du badge non lu et s'efface quand le destinataire lit la conversation.

Les lignes d'ombre sont invisibles à la cloche de notifications : elles sont exclues de la requête de comptage non lu, de la requête de liste de notifications, et des requêtes de lecture/suppression de marque, qui filtrent toutes `contentType <> 'privateMessage'`. Chaque ping DM accède au socket indépendamment de l'état non lu (sémantique de chat en direct — pas de dedup), et les DM n'arrêtent jamais à la livraison socket de la façon dont le font les notifications ordinaires, puisqu'une PWA backgrounded peut garder un socket ouvert tout en ayant besoin d'une poussée au niveau OS. Si une personne coupe les notifications DM, la ligne d'ombre est garée (`isNew=false`, `notifyPersonId` effacé) — toujours visible à l'intérieur de la conversation elle-même, juste sans badges ni alertes.

## Préférences et gating

Chaque envoi passe par `PreferenceGateHelper.evaluate()`, une fonction pure (tout l'état passé, pas d'appels DB sur le chemin critique) qui retourne `allow`, `suppress`, ou `defer`. Les couches s'exécutent dans l'ordre, et la première qui décide gagne :

1. **Catégorie verrouillée** — certaines catégories sont obligatoires (niveau 0) et contournent toutes les autres couches.
2. **Mute maître / mise à mort de canal** — `masterMute`, `allowPush`, `allowSms` (désactivé par défaut — les membres s'inscrivent), ou `emailFrequency='never'` supprime catégoriquement.
3. **Heures silencieuses** — push et SMS uniquement (email est considéré comme non intrusif). Si l'heure mur actuelle dans le fuseau horaire de la personne tombe dans sa fenêtre silencieuse, une catégorie transactionnelle passe quand même ; une catégorie non transactionnelle est différée à la fin de la fenêtre silencieuse, calculée comme un instant UTC correct DST via `TimezoneHelper.wallClockToUtc`.
4. **Remplacement de préférence par catégorie** — une exclusion explicite pour une paire de catégorie × canal ; l'absence signifie la valeur par défaut de la catégorie.
5. **Coupe au niveau de l'entité** — une coupure enregistrée contre une entité spécifique (par ex. un événement, un plan) restreint davantage que le paramètre au niveau de la catégorie, mais ne s'applique que lorsque l'appelant fournit un ID/type d'entité aux côtés de la notification.

Tableaux impliqués : `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, fenêtre de heures silencieuses + fuseau horaire, `allowSms`), `notificationPreferenceOverrides` (par catégorie × canal), et `notificationEntityMutes` (par entité).

Cette porte est enforced pour in-app (niveau 0), push (niveau 1), et email (niveau 2) à l'intérieur du tunnel — y compris les emails de rappel/digest immédiats — ainsi que pour les textes de rappel dans `ReminderEngine.sendSms()`. L'email transactionnel (codes d'authentification, réinitialisation de mot de passe, invitations, reçus de dons) le contourne par conception ; c'est tout l'intérêt de la deuxième porte.

## Limites d'email rédigé par l'église

L'email dont le contenu une église a écrit sort de l'identité ChurchApps SES partagée, donc il est mesuré par église par `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatre chemins l'appellent : envois de groupe/modèle (`EmailTemplateController`, type de contenu `email`), emails de suivi de formulaire (`FormSubmissionController`, `formFollowUp`), actions de workflow **Envoyer email** (`NotificationHelper` avec `churchAuthored`, `workflowEmail`), et invitations de compte B1 (`UserController.sendInviteEmail`, `invite`). Le courrier système (codes d'authentification, reçus, rappels) n'est pas mesuré.

- **Porte d'approbation.** Une église n'envoie rien tant qu'un administrateur serveur ne définit pas `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → puce **Group Email**). Les églises archivées sont toujours bloquées. La boîte de dialogue Send Email de B1Admin lit `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) et, si non approuvée, affiche une carte **Request review** à la place de l'éditeur. `POST /messaging/emailTemplates/requestApproval` envoie le support, au maximum une fois par église par semaine.
- **Allocation gagnée.** Une église approuvée obtient `max(150, 2 × son meilleur jour rédigé par l'église au cours des 30 jours précédents)`, plafonné à 2 000 par 24 heures roulantes. Les 24 heures actuelles sont exclues du « meilleur jour » afin qu'une rafale ne puisse pas augmenter sa propre limite.
- **Réservez, puis réglez.** `reserve()` écrit une ligne `deliveryLogs` par destinataire avant d'envoyer, revérifie l'allocation avec ces lignes comptées, et se retire si deux requêtes ont dépassé la limite (l'envoi retourne 429). `settle()` marque chaque ligne comme envoyée ou échouée.
- **Pause de plainte.** Le Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, nourri par SES → SNS) épingle chaque rebond permanent ou plainte à l'église dont l'email rédigé par l'église a atteint cette adresse autour de cette période, stockée comme `deliveryMethod` `sesBounce` / `sesComplaint`. Une église est suspendue à 2+ plaintes (≥ 0,3 % des envois) ou 10+ rebonds durs (≥ 5 %) sur 7 jours.

## Planification

Le moteur de rappels et la synthèse de notifications utilisent des minuteurs programmés existants plutôt que d'introduire une nouvelle infrastructure :

| Minuteur | Horaire | Exécutions |
|-------|----------|------|
| Minuteur 30 minutes | toutes les 30 minutes | Escalader les notifications non lues ; envoyer les emails de synthèse à fréquence `individual` ; expédier les occurrences de rappels dues (`ReminderEngine.scan`) ; synthèses d'approbation ; exécutions d'automatisation dues |
| Minuteur nocturne | 05:00 UTC | Rappels d'assistance de groupe ; avancer les services de diffusion en direct récurrents ; actualiser les listes d'actualisation automatique ; étendre les occurrences de rappels pour l'horizon suivant (`ReminderEngine.expandAll`) ; envoyer les emails de synthèse à fréquence `daily` |

Localement, la même logique peut être déclenchée à la demande avec `npm run timer:30min` et `npm run timer:midnight` depuis le projet `Api`.

## Inventaire des fichiers

| Zone | Fichiers |
|------|-------|
| Tunnel | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrée partagée | `Api/src/shared/helpers/NotificationService.ts` |
| Porte transactionnelle | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, règle lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites d'email de l'église | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Moteur de rappels | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textos / opt-out STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (vue d'ensemble des services **Text Volunteers**) |
| Repositories de rappels | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email de service/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Éditeurs de rappels (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Éditeur de rappels / préférences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pages connexes

- [Architecture temps réel](../realtime) — le protocole WebSocket et les primitives client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sur lequel le niveau de livraison in-app chevauche
- [Notifications Web Push](../web-push) — configuration VAPID et le chemin de l'API Push du navigateur utilisé par le niveau d'escalade de poussée
- [Endpoints de messagerie](../api/endpoints/messaging) — surface REST complète pour les messages, les conversations, les connexions, et les routes de notification/rappel
