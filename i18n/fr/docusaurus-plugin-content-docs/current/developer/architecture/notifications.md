---
title: "Architecture des notifications et rappels"
---

# Architecture des notifications et rappels

<div class="article-intro">

Chaque message qu'un membre d'église voit en dehors de la page qu'il regarde — un compteur de badge, une notification push, un e-mail récapitulatif — passe par l'une des deux portes du MessagingApi. Cette page documente l'entonnoir, le moteur de rappel qui l'alimente selon un calendrier, et le modèle de préférences qui décide ce qui atteint réellement une personne.

</div>

## Vue d'ensemble — deux portes

```
tout ce qui est programmé ──▶ ReminderEngine (définitions → occurrences → scan) ─┐
chat / demandes / flux de travail / envois en masse ───────────────────────────┼─▶ createNotifications()
                                                                          │    portail in_app → socket → push → email (→ emplacement sms)
courrier compte/légal ──▶ TransactionalEmailHelper.sendTransactional()  [liste autorisée, imposé par lint]
```

1. **Tout ce qui signale quelque chose à une personne** passe par `NotificationHelper.createNotifications()` dans le module de messagerie. Il persiste une ligne `notifications` et fait escalader socket → push → email, en évaluant `PreferenceGateHelper` par canal — y compris `in_app` au niveau 0.
2. **Tout ce qui est programmé** est une `reminderDefinition` (au niveau entité ou au niveau portée) développée en `reminderOccurrences` et expédiée par `ReminderEngine.scan()` sur un minuteur récurrent. Un seul expandeur, un seul répartiteur, un seul registre d'envoi (`reminderSentLog`).
3. **L'e-mail direct** n'existe que derrière `TransactionalEmailHelper.sendTransactional()`. Une règle ESLint l'impose à la compilation — voir ci-dessous.

:::tip La porte e-mail est imposée par lint, pas seulement par convention
`Api/tools/eslint-rules/email-door.cjs` définit `no-direct-email-helper` : tout appel à `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` en dehors de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` fait échouer le lint. Si vous devez envoyer un e-mail, faites-le passer par l'entonnoir (`createNotifications` avec `emailImmediate`) ou par `TransactionalEmailHelper.sendTransactional()` — il n'existe pas de troisième voie qui passe la CI.
:::

## L'entonnoir de notification

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
    deliveryStartLevel?: number;      // 0 socket (défaut), 1 push, 2 email uniquement
    category?: string;                // axe de préférence ; dérivé de contentType si omis
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // envoyer l'e-mail immédiatement plutôt que d'attendre le récapitulatif
  }
)
```

Pour chaque destinataire, la fonction sauvegarde une ligne dans `notifications` et appelle `attemptDeliveryWithEscalation`, qui parcourt l'échelle de canaux ci-dessous. Une ligne non lue déjà existante pour le même `(contentType, contentId)` supprime la re-création — ce garde-fou de déduplication est contourné pour les envois `emailImmediate` (décalages de rappel, « tout envoyer par e-mail » du personnel, les étapes de flux de travail possèdent leur propre déduplication) et pour les messages directs, qui pingent toujours le socket.

`shared/helpers/NotificationService.ts` reflète la même signature (`NotificationServiceOptions`) pour les appelants en dehors du module de messagerie et est enregistré auprès du module de messagerie au démarrage.

## Chaîne d'escalade de canaux

La livraison commence à un niveau (0 par défaut, ou plus élevé pour les rappels/envois explicites) et ne passe au canal suivant que si le précédent n'a pas réussi. Chaque niveau est filtré par `PreferenceGateHelper` avant toute tentative.

| Niveau | Canal | Comportement |
|-------|---------|----------|
| 0 | **in_app / socket** | Le filtre `in_app` est vérifié en premier. S'il est supprimé (mode silencieux), la ligne est persistée avec `isNew=false` et la livraison s'arrête entièrement — pas de ping socket, pas de badge, pas d'escalade ultérieure. Sinon le serveur recherche les connexions socket ouvertes pour la salle `alerts` de la personne et pousse une trame `notification` (ou `privateMessage`). Pour les notifications ordinaires, une livraison socket réussie arrête la chaîne ici — le minuteur de 30 minutes revérifie les éléments non lus et les escalade plus tard. Les messages directs ne s'arrêtent jamais au socket : une PWA installée peut maintenir le socket d'alertes ouvert en arrière-plan, ce qui supprimerait sinon le push au niveau du système d'exploitation. |
| 1 | **push** | Filtré sur `allowPush` / désabonnement de catégorie / heures calmes. Envoie à la fois aux jetons push Expo et aux abonnements Web Push trouvés sur les lignes `devices` de la personne, en dédupliquant par point de terminaison et en élaguant les jetons obsolètes au passage. |
| 2 | **email** | Filtré sur `emailFrequency` et désabonnement de catégorie. Les envois immédiats (`emailImmediate`) sont rendus tout de suite et écrivent une ligne `deliveryLogs` ; sinon la notification reste en attente pour le récapitulatif par lot, décrit ci-dessous. |
| — | **sms** | La plomberie de préférences (`allowSms`, listes de canaux par catégorie) prend déjà en compte un canal SMS, mais aucun producteur n'envoie par ce canal aujourd'hui — il reste réservé au produit SMS en masse, qui fonctionne comme un flux séparé et cloisonné via `TextingController` / `@churchapps/texting`. |

Les notifications non lues restées au niveau socket ou push sont escaladées par le minuteur de 30 minutes (`NotificationHelper.escalateDelivery`). L'e-mail par lot est envoyé par `NotificationHelper.sendEmailNotifications(frequency)`, piloté par la préférence `emailFrequency` de chaque personne : `individual` s'exécute sur le minuteur de 30 minutes, `daily` sur le minuteur nocturne. (`weekly` est une valeur de préférence valide mais n'a pas encore d'exécution par lot dédiée.)

## Moteur de rappel

Les rappels programmés — rappels d'événement, échéances de tâche, rappels d'affectation de service/plan — passent tous par un moteur généralisé unique plutôt que par une logique de cron sur mesure par fonctionnalité.

```
reminderDefinitions ──expansion──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 décalages/canaux/message         une ligne par (définition,           deliveryStartLevel: 1
 au niveau entité ou portée       entité, occurrence, décalage)        + registre reminderSentLog
```

**Les définitions** (`reminderDefinitions`) sont soit au niveau entité (`entityId` défini — un événement, une tâche, ou un plan spécifique) soit au niveau portée (`entityId` nul, `scopeId` défini — par ex. tous les plans sous un type de plan de service). Une définition porte un CSV de décalages en minutes (`offsets`, par ex. `"1440,60"` pour un jour et une heure avant), une heure d'envoi locale (`sendLocalTime`), un CSV de canaux (`channels` — inclure `email` déclenche un e-mail riche immédiat au moment de l'envoi), un `recipientMode`, et un `message` personnalisé optionnel.

**L'expansion** matérialise les lignes de déclenchement pour l'horizon à venir (une fenêtre glissante de plusieurs jours). Elle s'exécute sur le minuteur nocturne, et de manière synchrone chaque fois qu'une définition est sauvegardée pour qu'un rappel pour un événement de dernière minute se déclenche quand même. Les définitions de portée se déploient via le `loadScopeEntities` de l'adaptateur, produisant un ensemble d'occurrences par entité concrète ; les occurrences au niveau entité utilisent la clé `definitionId:occurrenceISO:offset`, tandis que les occurrences à portée limitée s'espacent par id d'entité pour ne jamais entrer en collision. Faire un upsert sur une occurrence **ressuscite** une ligne précédemment annulée — annuler-puis-ré-étendre est la manière standard de resynchroniser un rappel après un changement de l'entité sous-jacente ; les lignes déjà `sent`, `failed`, ou `processing` restent intouchées.

**La répartition** (`ReminderEngine.scan()`) s'exécute sur le minuteur de 30 minutes. Elle réclame les occurrences dues (un bail empêche le double traitement), charge les destinataires via l'adaptateur de l'entité, filtre tous ceux déjà enregistrés dans `reminderSentLog` pour cette occurrence, et appelle `createNotifications` avec `deliveryStartLevel: 1` (sauter directement au push) plus `emailImmediate`/`emailByPerson` quand les canaux de la définition incluent l'e-mail.

Un bus d'événements interne réagit aux mutations d'entité sans attendre l'expansion nocturne : les événements de contenu (via le répartiteur de webhooks) et les événements de mise à jour de plan/tâche déclenchent une ré-expansion ou une annulation immédiate pour l'entité affectée, et une mise à jour de plan ré-étend aussi toute définition de portée liée à son type de plan.

### Adaptateurs

Le moteur est agnostique vis-à-vis de l'entité ; chaque type d'entité pris en charge se branche via un adaptateur (`helpers/adapters/`) :

| Type d'entité | Adaptateur | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinataires limités aux inscrits ou aux membres du groupe selon l'événement et le `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Les destinataires sont les affectations de plan Acceptées + Non confirmées. `buildEmails` appelle `DoingModuleGateway.buildPlanReminderEmails`, qui rend les postes, les notes, et un message personnalisé via `doing/helpers/PlanReminderEmailHelper`, y compris des boutons Accepter/Refuser signés par `ReminderTokenHelper` qui postent vers un point de terminaison public de réponse d'affectation. |
| `task` | `TaskReminderAdapter` | Les destinataires sont le(s) assigné(s) de la tâche. |

### Points de terminaison

| Méthode | Chemin | Objet |
|--------|--------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Charger ou sauvegarder la définition de rappel pour une entité. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Charger ou sauvegarder une définition de rappel au niveau portée (héritée). |
| `DELETE` | `/messaging/reminders/:defId` | Supprimer une définition et annuler ses occurrences en attente. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Aperçu du nombre de destinataires et des prochaines heures de déclenchement pour un rappel d'événement avant sauvegarde. |
| `GET` | `/messaging/reminders/log` | Historique récent des occurrences de rappel pour une église. |
| `POST` | `/messaging/reminders/mute` | Mettre en sourdine les rappels pour une entité spécifique. |

Sauvegarder une définition déclenche une ré-expansion synchrone pour cette entité ou portée, si bien que les éditeurs voient des « prochains déclenchements » à jour sans attendre le job nocturne.

## Messages directs

Les messages directs empruntent le même entonnoir que tout le reste plutôt qu'un chemin d'escalade séparé. Chaque conversation non lue obtient une **ligne fantôme** dans `notifications` (`contentType='privateMessage'`, `contentId` = l'id du message privé, `category='direct_messages'`) qui possède tout l'état de livraison — escalade socket/push/email, suivi de lecture, tout. La table `privateMessages` elle-même conserve la charge utile du message et une colonne `notifyPersonId`, qui est la source du badge non lu et qui s'efface quand le destinataire lit la conversation.

Les lignes fantômes sont invisibles à la cloche de notifications : elles sont exclues de la requête de compteur non lu, de la requête de liste de notifications, et des requêtes marquer-comme-lu/supprimer, qui filtrent toutes `contentType <> 'privateMessage'`. Chaque ping DM touche le socket indépendamment de l'état non lu (sémantique de chat en direct — pas de déduplication), et les DM ne s'arrêtent jamais à la livraison socket de la manière dont le font les notifications ordinaires, puisqu'une PWA mise en arrière-plan peut maintenir un socket ouvert tout en ayant quand même besoin d'un push au niveau du système d'exploitation. Si une personne met en sourdine les notifications DM, la ligne fantôme est garée (`isNew=false`, `notifyPersonId` effacé) — toujours visible à l'intérieur de la conversation elle-même, simplement sans badges ni alertes.

## Préférences et filtrage

Chaque envoi passe par `PreferenceGateHelper.evaluate()`, une fonction pure (tout l'état est passé en paramètre, aucun appel BD sur le chemin critique) qui renvoie `allow`, `suppress`, ou `defer`. Les couches s'exécutent dans l'ordre, et la première qui décide l'emporte :

1. **Catégorie verrouillée** — certaines catégories sont obligatoires (palier 0) et contournent toutes les autres couches.
2. **Sourdine générale / coupure de canal** — `masterMute`, `allowPush`, `allowSms`, ou `emailFrequency='never'` suppriment purement et simplement.
3. **Heures calmes** — push et SMS uniquement (l'e-mail est considéré comme non intrusif). Si l'heure murale actuelle dans le fuseau horaire de la personne tombe dans sa fenêtre calme, une catégorie transactionnelle passe quand même ; une catégorie non transactionnelle est différée jusqu'à la fin de la fenêtre calme, calculée comme un instant UTC correct vis-à-vis de l'heure d'été via `TimezoneHelper.wallClockToUtc`.
4. **Substitution de préférence par catégorie** — un désabonnement explicite pour une paire catégorie × canal ; l'absence signifie le défaut de la catégorie.
5. **Sourdine par entité** — une sourdine enregistrée contre une entité spécifique (par ex. un événement, un plan) restreint plus que le paramètre au niveau catégorie, mais ne s'applique que lorsque l'appelant fournit un id/type d'entité aux côtés de la notification.

Tables impliquées : `notificationPreferences` (globale — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, fenêtre d'heures calmes + fuseau horaire, `allowSms`), `notificationPreferenceOverrides` (par catégorie × canal), et `notificationEntityMutes` (par entité).

Ce filtre est appliqué pour in-app (niveau 0), push (niveau 1), et e-mail (niveau 2) à l'intérieur de l'entonnoir — y compris les e-mails immédiats de rappel/récapitulatif. L'e-mail transactionnel (codes d'authentification, réinitialisations de mot de passe, invitations, reçus de dons) le contourne délibérément ; c'est tout l'intérêt de la seconde porte.

## Planification

Le moteur de rappel et le récapitulatif de notification empruntent les minuteurs programmés existants plutôt que d'introduire une nouvelle infrastructure :

| Minuteur | Calendrier | Exécute |
|-------|----------|-------|
| Minuteur de 30 minutes | toutes les 30 minutes | Escalade des notifications non lues ; envoi des e-mails récapitulatifs de fréquence `individual` ; répartition des occurrences de rappel dues (`ReminderEngine.scan`) ; récapitulatifs d'approbation ; exécutions d'automatisation dues |
| Minuteur nocturne | 05:00 UTC | Rappels de présence de groupe ; avancement des services de streaming récurrents ; rafraîchissement des listes auto-actualisées ; expansion des occurrences de rappel pour l'horizon suivant (`ReminderEngine.expandAll`) ; envoi des e-mails récapitulatifs de fréquence `daily` |

Localement, la même logique peut être déclenchée à la demande avec `npm run timer:30min` et `npm run timer:midnight` depuis le projet `Api`.

## Inventaire des fichiers

| Zone | Fichiers |
|------|-------|
| Entonnoir | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Point d'entrée partagé | `Api/src/shared/helpers/NotificationService.ts` |
| Porte transactionnelle | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, règle lint `Api/tools/eslint-rules/email-door.cjs` |
| Moteur de rappel | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Référentiels de rappel | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-mail service/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Éditeurs de rappel (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Éditeur de rappel / préférences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pages connexes

- [Architecture temps réel](../realtime) — le protocole WebSocket et les primitives client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sur lesquels s'appuie le niveau de livraison in-app
- [Notifications push Web](../web-push) — la configuration VAPID et le chemin de l'API Push du navigateur utilisé par le niveau d'escalade push
- [Points de terminaison de messagerie](../api/endpoints/messaging) — surface REST complète pour les messages, conversations, connexions, et routes de notification/rappel
