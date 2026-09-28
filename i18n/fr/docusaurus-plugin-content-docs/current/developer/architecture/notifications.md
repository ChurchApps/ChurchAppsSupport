---
title: "Architecture des Notifications et Rappels"
---

# Architecture des Notifications et Rappels

<div class="article-intro">

Chaque message qu'un membre de l'église voit en dehors de la page qu'il consulte — un badge de compteur, une notification push, un email de résumé — passe par l'une des deux portes du MessagingApi. Cette page documente l'entonnoir, le moteur de rappels qui l'alimente selon un horaire, et le modèle de préférence qui décide ce qui atteint réellement une personne.

</div>

## Vue d'ensemble — deux portes

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Tout ce qui dit quelque chose à une personne** passe par `NotificationHelper.createNotifications()` dans le module de messagerie. Il persiste une ligne `notifications` et escalade socket → push → email, évaluant `PreferenceGateHelper` par canal — incluant `in_app` au niveau 0.
2. **Tout ce qui est programmé** est une `reminderDefinition` (au niveau de l'entité ou au niveau de la portée) développée en `reminderOccurrences` et envoyée par `ReminderEngine.scan()` sur une minuterie récurrente. Un expanseur, un dispatcher, un registre d'envoi (`reminderSentLog`).
3. **L'email direct** n'existe que derrière `TransactionalEmailHelper.sendTransactional()`. Une règle ESLint l'applique au moment de la compilation — voir ci-dessous.

:::tip La porte d'email est appliquée par lint, pas seulement par convention
`Api/tools/eslint-rules/email-door.cjs` définit `no-direct-email-helper` : tout appel à `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` en dehors de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` échoue lint. Si vous devez envoyer un email, acheminez-le par l'entonnoir (`createNotifications` avec `emailImmediate`) ou par `TransactionalEmailHelper.sendTransactional()` — il n'y a pas de troisième voie qui passe l'IC.
:::

## L'entonnoir de notification

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

Pour chaque destinataire, elle enregistre une ligne dans `notifications` et appelle `attemptDeliveryWithEscalation`, qui descend l'échelle des canaux ci-dessous. Une ligne non lue pour la même `(contentType, contentId)` supprime la recréation — cette garde de dédup est ignorée pour les envois `emailImmediate` (décalages de rappel, email d'équipe « envoyer à tous », les étapes de flux possèdent leur propre dédup) et pour les messages directs, qui pinguent toujours le socket.

`shared/helpers/NotificationService.ts` reflète la même signature (`NotificationServiceOptions`) pour les appelants en dehors du module de messagerie et est enregistré auprès du module de messagerie au démarrage.

## Chaîne d'escalade de canal

La livraison commence à un niveau (0 par défaut, ou supérieur pour les rappels/envois explicites) et ne procède au canal suivant que si le précédent a échoué. Chaque niveau est régi par `PreferenceGateHelper` avant toute tentative.

| Niveau | Canal | Comportement |
|-------|---------|----------|
| 0 | **in_app / socket** | La porte `in_app` est vérifiée en premier. Si supprimée (muette), la ligne est persistée avec `isNew=false` et la livraison s'arrête entièrement — pas de socket ping, pas de badge, pas d'escalade supplémentaire. Sinon, le serveur recherche les connexions de socket ouvertes pour la salle `alerts` de la personne et pousse une trame `notification` (ou `privateMessage`). Pour les notifications ordinaires, une livraison socket réussie arrête la chaîne ici — la minuterie de 30 minutes re-vérifie les éléments non lus et les escalade plus tard. Les messages directs ne s'arrêtent jamais au socket : une PWA installée peut tenir le socket d'alertes ouvert en arrière-plan, ce qui supprimerait sinon le push au niveau du système d'exploitation. |
| 1 | **push** | Régi sur `allowPush` / category opt-out / quiet hours. Envoie à la fois aux tokens Expo push et aux abonnements Web Push trouvés sur les lignes `devices` de la personne, en déduplicant par point de terminaison et en élagant les tokens obsolètes le long du chemin. |
| 2 | **email** | Régi sur `emailFrequency` et category opt-out. Les envois immédiats (`emailImmediate`) rendent immédiatement et écrivent une ligne `deliveryLogs` ; sinon la notification est laissée en attente du résumé du lot, décrit ci-dessous. |
| — | **sms** | La plomberie de préférence (`allowSms`, listes de canaux par catégorie) tient déjà compte d'un canal SMS, mais aucun producteur n'envoie par lui aujourd'hui — il reste réservé au produit SMS en vrac, qui s'exécute en tant que flux séparé et isolé via `TextingController` / `@churchapps/texting`. |

Les notifications non lues laissées au socket ou au push sont escaladées par la minuterie de 30 minutes (`NotificationHelper.escalateDelivery`). L'email par lot est envoyé par `NotificationHelper.sendEmailNotifications(frequency)`, entraîné par la préférence `emailFrequency` de chaque personne : `individual` s'exécute sur la minuterie de 30 minutes, `daily` s'exécute sur la minuterie de nuit. (`weekly` est une valeur de préférence valide mais n'a pas encore de série de lots dédiée.)

## Moteur de Rappels

Les rappels programmés — rappels d'événements, dates d'échéance de tâches, rappels d'affectation de service/plan — passent tous par un moteur généralisé plutôt que par une logique cron spécifique à chaque fonctionnalité.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Définitions** (`reminderDefinitions`) sont soit au niveau de l'entité (`entityId` défini — un événement, une tâche, ou un plan spécifique) soit au niveau de la portée (`entityId` null, `scopeId` défini — par exemple, tout plan sous un type de plan de service). Une définition porte un CSV de décalages de minutes (`offsets`, par exemple `"1440,60"` pour un jour et une heure avant), une heure d'envoi locale (`sendLocalTime`), un CSV de canaux (`channels` — incluant `email` déclenche un email riche immédiat à l'heure d'envoi), un `recipientMode`, et un `message` personnalisé optionnel.

**Expansion** matérialise des lignes de tir pour l'horizon à l'avant (une fenêtre glissante multi-jour). Elle s'exécute sur la minuterie nocturne, et de manière synchrone chaque fois qu'une définition est enregistrée pour qu'un rappel pour un événement de dernière minute se déclenche toujours. Les définitions de portée se déploient via le `loadScopeEntities` de l'adaptateur, produisant un ensemble d'occurrences par entité concrète ; les occurrences au niveau de l'entité utilisent la clé `definitionId:occurrenceISO:offset`, tandis que les occurrences à portée sont espacées par l'ID d'entité pour qu'elles ne se heurtent jamais. Upsert une occurrence **ressuscite** une ligne précédemment annulée — annuler puis re-développer est le moyen standard de re-synchroniser un rappel après que l'entité sous-jacente change ; les lignes déjà `sent`, `failed`, ou `processing` sont laissées intactes.

**Dispatch** (`ReminderEngine.scan()`) s'exécute sur la minuterie de 30 minutes. Il réclame les occurrences dues (un bail empêche le double-traitement), charge les destinataires via l'adaptateur de l'entité, filtre les personnes déjà enregistrées dans `reminderSentLog` pour cette occurrence, et appelle `createNotifications` avec `deliveryStartLevel: 1` (sauter directement au push) plus `emailImmediate`/`emailByPerson` lorsque les canaux de la définition incluent email.

Un bus d'événements interne réagit aux mutations d'entité sans attendre l'expansion nocturne : les événements de contenu (via le dispatcher de webhook) et les événements de mise à jour de plan/tâche déclenchent la re-expansion ou l'annulation immédiate pour l'entité affectée, et une mise à jour de plan re-développe également tout définition de portée liée à son type de plan.

### Adaptateurs

Le moteur est agnostique aux entités ; chaque type d'entité supporté se branche via un adaptateur (`helpers/adapters/`) :

| Type d'entité | Adaptateur | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Les destinataires sont limités aux inscrits ou aux membres du groupe en fonction de l'événement et du `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Les destinataires sont les affectations de plan Acceptées + Non confirmées. `buildEmails` appelle dans `DoingModuleGateway.buildPlanReminderEmails`, qui rend les postes, notes, et un message personnalisé via `doing/helpers/PlanReminderEmailHelper`, incluant les boutons Accepter/Refuser signés par `ReminderTokenHelper` qui envoient à un point de terminaison public de réponse d'affectation. |
| `task` | `TaskReminderAdapter` | Les destinataires sont le ou les assignés de la tâche. |

### Points de terminaison

| Méthode | Chemin | Objectif |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Charger ou enregistrer la définition de rappel pour une entité. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Charger ou enregistrer une définition de rappel au niveau de la portée (hérités). |
| `DELETE` | `/messaging/reminders/:defId` | Supprimer une définition et annuler ses occurrences en attente. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Aperçu du nombre de destinataires et des prochains délais de tir pour un rappel d'événement avant d'enregistrer. |
| `GET` | `/messaging/reminders/log` | Historique d'occurrence de rappel récent pour une église. |
| `POST` | `/messaging/reminders/mute` | Rendre les rappels muets pour une entité spécifique. |

L'enregistrement d'une définition déclenche une re-expansion synchrone pour cette entité ou portée, donc les éditeurs voient les « prochains tirs » à jour sans attendre le travail nocturne.

## Messages directs

Les messages directs empruntent le même entonnoir que tout le reste plutôt qu'un chemin d'escalade séparé. Chaque conversation non lue obtient une **ligne d'ombre** dans `notifications` (`contentType='privateMessage'`, `contentId` = l'ID du message privé, `category='direct_messages'`) qui possède tout l'état de livraison — escalade socket/push/email, suivi de lecture, tout. La table `privateMessages` elle-même conserve le charge utile du message et une colonne `notifyPersonId`, qui est la source du badge non lu et s'efface lorsque le destinataire lit la conversation.

Les lignes d'ombre sont invisibles pour la cloche de notifications : elles sont exclues de la requête de comptage non lue, de la requête de liste de notification, et des requêtes de marque-lecture/suppression, qui filtrent toutes `contentType <> 'privateMessage'`. Chaque ping DM frappe le socket quel que soit l'état non lu (sémantique de chat en direct — pas de dédup), et les DM ne s'arrêtent jamais à la livraison socket comme les notifications ordinaires le font, puisqu'une PWA en arrière-plan peut tenir un socket ouvert tout en ayant besoin d'un push au niveau du système d'exploitation. Si une personne rend les notifications DM muettes, la ligne d'ombre est parquée (`isNew=false`, `notifyPersonId` effacé) — toujours visible dans la conversation elle-même, juste sans badges ou alertes.

## Préférences et gating

Chaque envoi passe par `PreferenceGateHelper.evaluate()`, une fonction pure (tout l'état transmis, pas d'appels DB sur le chemin chaud) qui retourne `allow`, `suppress`, ou `defer`. Les couches s'exécutent dans l'ordre, et la première qui décide gagne :

1. **Catégorie verrouillée** — certaines catégories sont obligatoires (niveau 0) et contournent chaque autre couche.
2. **Sourdine maître / suppression de canal** — `masterMute`, `allowPush`, `allowSms`, ou `emailFrequency='never'` suppriment purement et simplement.
3. **Heures de tranquillité** — push et SMS uniquement (email est considéré comme non-intrusif). Si l'heure murale actuelle du fuseau horaire de la personne tombe dans sa fenêtre tranquille, une catégorie transactionnelle passe quand même ; une catégorie non transactionnelle est reportée à la fin de la fenêtre tranquille, calculée comme un instant UTC correct DST via `TimezoneHelper.wallClockToUtc`.
4. **Remplacement de préférence par catégorie** — un opt-out explicite pour une paire de catégorie × canal ; l'absence signifie la valeur par défaut de la catégorie.
5. **Sourdine par entité** — une sourdine enregistrée contre une entité spécifique (par exemple, un événement, un plan) restreint davantage que le paramètre au niveau de la catégorie, mais s'applique uniquement lorsque l'appelant fournit un ID/type d'entité à côté de la notification.

Tableaux impliqués : `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, fenêtre de heures tranquilles + fuseau horaire, `allowSms`), `notificationPreferenceOverrides` (par catégorie × canal), et `notificationEntityMutes` (par entité).

Cette porte est appliquée pour in-app (niveau 0), push (niveau 1), et email (niveau 2) à l'intérieur de l'entonnoir — incluant les emails de rappel/résumé immédiats. L'email transactionnel (codes d'authentification, réinitialisations de mot de passe, invitations, reçus de donation) la contourne par conception ; c'est tout l'intérêt de la deuxième porte.

## Limites d'email rédigées par l'église

L'email dont le contenu une église a rédigé sort de l'identité SES partagée ChurchApps, il est donc mesuré par église par `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Quatre chemins l'appellent : envois de groupe/template (`EmailTemplateController`, type de contenu `email`), emails de suivi de formulaire (`FormSubmissionController`, `formFollowUp`), actions de flux **Envoyer un email** (`NotificationHelper` avec `churchAuthored`, `workflowEmail`), et invitations de compte B1 (`UserController.sendInviteEmail`, `invite`). Le courrier système (codes d'authentification, reçus, rappels) n'est pas mesuré.

- **Porte d'approbation.** Une église n'envoie rien jusqu'à ce qu'un administrateur serveur défisse `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → puce **Group Email**). Les églises archivées sont toujours bloquées. La boîte de dialogue Envoyer un Email de B1Admin lit `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) et, lorsque non approuvée, affiche une carte **Request review** au lieu de l'éditeur. `POST /messaging/emailTemplates/requestApproval` email support, au maximum une fois par église par semaine.
- **Allocation gagnée.** Une église approuvée obtient `max(150, 2 × son meilleur jour rédigé par l'église au cours des 30 derniers jours)`, plafonné à 2 000 par roulement de 24 heures. Les 24 heures actuelles sont exclues du « meilleur jour » pour qu'une rafale ne puisse pas augmenter sa propre limite.
- **Réserve, puis règle.** `reserve()` écrit une ligne `deliveryLogs` par destinataire avant d'envoyer, re-vérifie l'allocation avec ces lignes comptées, et se retire si deux requêtes se sont précipitées au-delà de la limite (l'envoi retourne 429). `settle()` marque chaque ligne envoyée ou échouée.
- **Pause de plainte.** Le Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, nourri par SES → SNS) épingle chaque rebond permanent ou plainte à l'église dont l'email rédigé par l'église a atteint cette adresse autour de ce moment-là, stocké en tant que `deliveryMethod` `sesBounce` / `sesComplaint`. Une église est mise en pause à 2+ plaintes (≥ 0,3 % des envois) ou 10+ rebonds durs (≥ 5 %) sur 7 jours.

## Planification

Le moteur de rappel et le résumé de notification empruntent des minuteurs programmés existants plutôt que d'introduire une nouvelle infrastructure :

| Minuteur | Horaire | Exécutions |
|-------|----------|------|
| Minuteur de 30 minutes | toutes les 30 minutes | Escalader les notifications non lues ; envoyer les emails de résumé de fréquence `individual` ; dispatcher les occurrences de rappel dues (`ReminderEngine.scan`) ; résumés d'approbation ; exécutions d'automatisation dues |
| Minuteur nocturne | 05:00 UTC | Rappels de participation en groupe ; avancer les services de diffusion en continu récurrents ; rafraîchir les listes à rafraîchissement automatique ; développer les occurrences de rappel pour l'horizon suivant (`ReminderEngine.expandAll`) ; envoyer les emails de résumé de fréquence `daily` |

Localement, la même logique peut être déclenchée à la demande avec `npm run timer:30min` et `npm run timer:midnight` à partir du projet `Api`.

## Inventaire des fichiers

| Aire | Fichiers |
|------|-------|
| Entonnoir | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrée partagée | `Api/src/shared/helpers/NotificationService.ts` |
| Porte transactionnelle | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, règle lint `Api/tools/eslint-rules/email-door.cjs` |
| Limites d'email église | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Moteur de rappel | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Référentiels de rappel | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email de service/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Éditeurs de rappel (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Éditeur de rappel / préférences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pages connexes

- [Real-time Architecture](../realtime) — le protocole WebSocket et les primitives client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sur lesquels le niveau de livraison in-app s'appuie
- [Web Push Notifications](../web-push) — configuration VAPID et le chemin Browser Push API utilisé par le niveau d'escalade push
- [Messaging Endpoints](../api/endpoints/messaging) — surface REST complète pour les messages, conversations, connexions, et routes de notification/rappel
