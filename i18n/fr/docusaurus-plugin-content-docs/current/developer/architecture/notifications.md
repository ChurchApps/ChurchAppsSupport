---
title: "Architecture des notifications et rappels"
---

# Architecture des notifications et rappels

<div class="article-intro">

Chaque message qu'un membre d'église voit en dehors de la page qu'il regarde — un nombre de badge, une notification de poussée, un e-mail condensé — passe par une des deux portes du MessagingApi. Cette page documente l'entonnoir, le moteur de rappel qui le nourrit selon un horaire, et le modèle de préférence qui décide ce qui atteint réellement une personne.

</div>

## Aperçu — deux portes

```
quoi que ce soit programmé ──▶ ReminderEngine (définitions → occurrences → scan) ─┐
chat / demandes / flux de travail / envois en masse ──────────────────────────────┼─▶ createNotifications()
                                                                          │    portail en-application → socket → poussée → email (→ slot sms)
mail compte/légal ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisté, lint-appliqué]
```

1. **N'importe quoi qui dit à une personne quelque chose** passe par `NotificationHelper.createNotifications()` dans le module de messagerie. Il persiste une ligne `notifications` et escalade socket → poussée → email, évaluant `PreferenceGateHelper` par canal — y compris `in_app` au niveau 0.
2. **N'importe quoi programmé** est une `reminderDefinition` (au niveau entité ou portée) étendue en `reminderOccurrences` et envoyée par `ReminderEngine.scan()` sur un minuteur récurrent. Un expandeur, un dispatcher, un registre d'envoi (`reminderSentLog`).
3. **L'e-mail direct** existe seulement derrière `TransactionalEmailHelper.sendTransactional()`. Une règle ESLint applique cela au moment de la compilation — voir ci-dessous.

:::tip La porte d'e-mail est lint-appliquée, pas seulement convention
`Api/tools/eslint-rules/email-door.cjs` définit `no-direct-email-helper` : tout appel à `EmailHelper.sendTemplatedEmail()` ou `EmailHelper.sendEmail()` en dehors de `NotificationHelper.ts` ou `TransactionalEmailHelper.ts` échoue lint. Si vous avez besoin d'envoyer un e-mail, routez-le via l'entonnoir (`createNotifications` avec `emailImmediate`) ou via `TransactionalEmailHelper.sendTransactional()` — il n'y a pas de troisième voie qui passe CI.
:::

## L'entonnoir de notification

`NotificationHelper.createNotifications()` est le seul point d'entrée pour quoi que ce soit qui n'est pas programmé ou transactionnel :

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
    deliveryStartLevel?: number;      // 0 socket (défaut), 1 poussée, 2 email-seulement
    category?: string;                // axe de préférence ; dérivé de contentType si omis
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // envoyer email maintenant au lieu d'attendre le condensé
  }
)
```

Pour chaque destinataire il sauvegarde une ligne dans `notifications` et appelle `attemptDeliveryWithEscalation`, qui marche l'échelle de canal ci-dessous. Une ligne non-lue toujours-existante pour le même `(contentType, contentId)` supprime la re-création — cette garde de dédup est ignorée pour les envois `emailImmediate` (décalages de rappel, "e-mail tout" du personnel, les étapes de flux de travail possèdent leur propre dédup) et pour les messages directs, qui pingent toujours le socket.

`shared/helpers/NotificationService.ts` reflète la même signature (`NotificationServiceOptions`) pour les appelants en dehors du module de messagerie et est enregistré avec le module de messagerie au démarrage.

## Chaîne d'escalade de canal

La livraison commence à un niveau (0 par défaut, ou plus élevé pour les rappels/envois explicites) et ne procède au canal suivant que si le précédent ne s'est pas réussi. Chaque niveau est ferme par `PreferenceGateHelper` avant que quoi que ce soit soit tenté.

| Niveau | Canal | Comportement |
|-------|---------|----------|
| 0 | **en-application / socket** | Le portail `in_app` est vérifié d'abord. Si supprimé (sourd), la ligne est persistée avec `isNew=false` et la livraison s'arrête entièrement — pas de ping socket, pas de badge, pas d'escalade ultérieure. Autrement le serveur cherche les connexions socket ouvertes pour la salle `alerts` de la personne et pousse une frame `notification` (ou `privateMessage`). Pour les notifications ordinaires, une livraison socket réussie arrête la chaîne ici — le minuteur de 30 minutes re-vérifie les éléments non-lus et les escalade plus tard. Les messages directs ne s'arrêtent jamais au socket : une PWA installée peut tenir le socket d'alertes ouvert en arrière-plan, ce qui supprimerait autrement la poussée au niveau du système d'exploitation. |
| 1 | **poussée** | Ferme sur `allowPush` / catégorie déabonnement / heures calmes. Envoie aux jetons de poussée Expo et aux abonnements Web Push trouvés sur les lignes `devices` de la personne, dédupliquant par point de terminaison et émondeant les jetons rassis en chemin. |
| 2 | **email** | Ferme sur `emailFrequency` et catégorie déabonnement. Les envois immédiats (`emailImmediate`) rendent droit maintenant et écrivent une ligne `deliveryLogs` ; autrement la notification est laissée en attente pour le condensé par lot, décrite ci-dessous. |
| — | **sms** | Le câblage de préférence (`allowSms`, listes de canaux par catégorie) déjà des comptes pour un canal SMS, mais aucun producteur n'envoie via lui aujourd'hui — il reste réservé pour le produit SMS en masse, qui court comme un flux séparé, silo via `TextingController` / `@churchapps/texting`. |

Les notifications non-lues laissées au socket ou poussée sont escaladées par le minuteur de 30 minutes (`NotificationHelper.escalateDelivery`). L'email par lot est envoyé par `NotificationHelper.sendEmailNotifications(frequency)`, pilotée par la préférence `emailFrequency` de chaque personne : `individual` court sur le minuteur de 30 minutes, `daily` court sur le minuteur de nuit. (`weekly` est une valeur de préférence valide mais n'a pas de course de lot dédiée encore.)

## Moteur de rappel

Les rappels programmés — rappels d'événement, dates d'échéance de tâche, rappels d'assignation de service/plan — passent tous via un moteur généralisé plutôt que de la logique de cron bespoke par fonctionnalité.

```
rappelDefinitions ──élargie──▶ rappelOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 définitions au niveau entité ou portée  une ligne par (définition,              deliveryStartLevel: 1
 décalages/canaux/message        entité, occurrence, décalage)           + registre reminderSentLog
```

**Les définitions** (`reminderDefinitions`) sont soit au niveau entité (`entityId` défini — un événement, tâche, ou plan spécifique) soit au niveau portée (`entityId` null, `scopeId` défini — par ex. chaque plan sous un type de plan de service). Une définition porte un CSV de décalages de minute (`offsets`, par ex. `"1440,60"` pour un jour et une heure avant), un heure d'envoi locale (`sendLocalTime`), un CSV de canaux (`channels` — y compris `email` déclenche un e-mail riche immédiat à l'heure d'envoi), un `recipientMode`, et un `message` optionnel personnalisé.

**L'expansion** matérialise les lignes de feu pour l'horizon en avant (une fenêtre multi-jours roulante). Elle court sur le minuteur de nuit, et de manière synchrone chaque fois qu'une définition est sauvegardée pour qu'un rappel pour un événement de dernière minute se déclenche toujours. Les définitions de portée se dispersent via l'`loadScopeEntities` de l'adaptateur, produisant un ensemble d'occurrence par entité concrète ; les occurrences au niveau entité utilisent la clé `definitionId:occurrenceISO:offset`, tandis que les occurrences limitées à la portée rendent le nom par id d'entité pour qu'elles ne collisionnent jamais. Upsertér une occurrence **résurrect** une ligne précédemment-annulée — annuler-puis-re-élargir est la manière standard de re-synchroniser un rappel après que l'entité sous-jacente change ; les lignes déjà `sent`, `failed`, ou `processing` sont laissées intouchées.

**Dispatch** (`ReminderEngine.scan()`) court sur le minuteur de 30 minutes. Il réclame les occurrences dues (un bail empêche le double-traitement), charge les destinataires via l'adaptateur de l'entité, filtre tous ceux déjà enregistrés dans `reminderSentLog` pour cette occurrence, et appelle `createNotifications` avec `deliveryStartLevel: 1` (ignorer droit à poussée) plus `emailImmediate`/`emailByPerson` quand les canaux de la définition incluent e-mail.

Un bus d'événement interne réagit aux mutations d'entité sans attendre l'expansion de nuit : les événements de contenu (via le dispatcher de webhook) et les événements de mise à jour de plan/tâche déclenchent la re-expansion ou l'annulation immédiate pour l'entité affectée, et une mise à jour de plan re-élargit aussi les définitions de portée liées à son type de plan.

### Adaptateurs

Le moteur est agnostique à l'entité ; chaque type d'entité supporté se branche via un adaptateur (`helpers/adapters/`) :

| Type d'entité | Adaptateur | Notes |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinataires limités aux inscrits ou aux membres du groupe selon l'événement et le `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Les destinataires sont les assignations de plan Accepté + Non confirmé. `buildEmails` appelle dans `DoingModuleGateway.buildPlanReminderEmails`, qui rend les positions, les notes, et un message personnalisé via `doing/helpers/PlanReminderEmailHelper`, y compris les boutons Accepter/Refuser signés par `ReminderTokenHelper` qui postent un point de terminaison de réponse d'assignation public. |
| `task` | `TaskReminderAdapter` | Les destinataires sont les assignataires de la tâche. |

### Points de terminaison

| Méthode | Chemin | Objet |
|--------|--------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Charger ou sauvegarder la définition de rappel pour une entité. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Charger ou sauvegarder une définition de rappel au niveau portée (hérité). |
| `DELETE` | `/messaging/reminders/:defId` | Supprimer une définition et annuler ses occurrences en attente. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Aperçu du nombre de destinataires et des prochains temps de feu pour un rappel d'événement avant la sauvegarde. |
| `GET` | `/messaging/reminders/log` | Historique d'occurrence de rappel récent pour une église. |
| `POST` | `/messaging/reminders/mute` | Assourdir les rappels pour une entité spécifique. |

Sauvegarder une définition déclenche une re-expansion synchrone pour cette entité ou portée, pour que les éditeurs voient les "prochains feux" à jour sans attendre le travail de nuit.

## Messages directs

Les messages directs montent le même entonnoir que tout le reste plutôt qu'un chemin d'escalade séparé. Chaque conversation non-lue obtient une **ligne d'ombre** dans `notifications` (`contentType='privateMessage'`, `contentId` = l'id de message privé, `category='direct_messages'`) qui possède tout l'état de livraison — escalade socket/poussée/email, suivi de lecture, tout. La table `privateMessages` elle-même garde la charge de message et une colonne `notifyPersonId`, qui est la source du badge non-lu et s'efface quand le destinataire lit la conversation.

Les lignes d'ombre sont invisibles à la cloche de notifications : elles sont exclues de la requête de nombre non-lu, de la requête de liste de notification, et des requêtes de marque-lu/suppression, qui toutes filtrent `contentType <> 'privateMessage'`. Chaque ping DM frappe le socket indépendamment de l'état non-lu (sémantique de chat en direct — pas de dédup), et les DMs ne s'arrêtent jamais à la livraison socket de la manière que les notifications ordinaires le font, puisqu'une PWA backgroundée peut tenir un socket ouvert tandis que toujours avoir besoin d'une poussée au niveau du système d'exploitation. Si une personne assourdit les notifications DM, la ligne d'ombre est garée (`isNew=false`, `notifyPersonId` effacé) — toujours visible à l'intérieur de la conversation elle-même, juste sans badges ou alertes.

## Préférences et fermeture

Chaque envoi passe par `PreferenceGateHelper.evaluate()`, une fonction pure (tout l'état passé, pas d'appels BD sur le chemin chaud) qui retourne `allow`, `suppress`, ou `defer`. Les couches courent dans l'ordre, et la première qui décide gagne :

1. **Catégorie verrouillée** — certaines catégories sont obligatoires (tier 0) et contournent chaque autre couche.
2. **Sourdine maître / meurtre de canal** — `masterMute`, `allowPush`, `allowSms`, ou `emailFrequency='never'` suppriment sans détour.
3. **Heures calmes** — poussée et SMS seulement (l'e-mail est considéré comme non-intrusif). Si l'heure mur-horloge actuelle dans le fuseau horaire de la personne tombe dans sa fenêtre calme, une catégorie transactionnelle traverse toujours ; une non-transactionnelle est déférée à la fin de la fenêtre calme, calculée comme un instant UTC correct DST via `TimezoneHelper.wallClockToUtc`.
4. **Substitution de préférence par catégorie** — un déabonnement explicite pour une paire catégorie × canal ; l'absence signifie le défaut de la catégorie.
5. **Sourdine par entité** — une sourdine enregistrée par rapport à une entité spécifique (par ex. un événement, un plan) restreint plus que le paramètre au niveau catégorie, mais ne s'applique seulement quand l'appelant fournit un id/type d'entité aux côtés de la notification.

Tables impliquées : `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, fenêtre heures calmes + fuseau horaire, `allowSms`), `notificationPreferenceOverrides` (par catégorie × canal), et `notificationEntityMutes` (par entité).

Ce portail est appliqué pour en-application (niveau 0), poussée (niveau 1), et email (niveau 2) à l'intérieur de l'entonnoir — y compris le rappel immédiat/emails condensés. L'email transactionnel (codes d'authentification, réinitialisation de mot de passe, invitations, reçus de dons) le contourne par conception ; c'est le point entier de la deuxième porte.

## Planification

Le moteur de rappel et le condensé de notification montent les minuteurs programmés existants plutôt que d'introduire une nouvelle infrastructure :

| Minuteur | Horaire | Court |
|-------|----------|-------|
| Minuteur de 30 minutes | toutes les 30 minutes | Escalader les notifications non-lues ; envoyer les e-mails condensés de fréquence `individual` ; dispatcher les occurrences de rappel dues (`ReminderEngine.scan`) ; condensés d'approbation ; exécutions d'automatisation due |
| Minuteur de nuit | 05:00 UTC | Rappels de présence de groupe ; avancer les services de streaming récurrents ; rafraîchir les listes auto-rafraîchissement ; élargir les occurrences de rappel pour l'horizon suivant (`ReminderEngine.expandAll`) ; envoyer les e-mails condensés de fréquence `daily` |

Localement, la même logique peut être déclenchée à la demande avec `npm run timer:30min` et `npm run timer:midnight` à partir du projet `Api`.

## Inventaire de fichiers

| Domaine | Fichiers |
|------|-------|
| Entonnoir | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrée partagée | `Api/src/shared/helpers/NotificationService.ts` |
| Porte transactionnelle | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, règle lint `Api/tools/eslint-rules/email-door.cjs` |
| Moteur de rappel | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Référentiels de rappel | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email de service/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Éditeurs de rappel (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Éditeur de rappel / préférences (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Pages connexes

- [Architecture en temps réel](../realtime) — le protocole WebSocket et les primitives client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) que le niveau de livraison en-application monte sur
- [Notifications de poussée Web](../web-push) — configuration VAPID et le chemin Push API du navigateur utilisé par le niveau d'escalade de poussée
- [Points de terminaison de messagerie](../api/endpoints/messaging) — surface REST complet pour les messages, conversations, connexions, et routes de notification/rappel
