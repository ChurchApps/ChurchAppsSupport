---
title: "Notifications push web"
description: "Configurez les clés VAPID, le client WebPushHelper et la gestion du service worker pour que B1.church et B1 Admin puissent envoyer des notifications push du navigateur aux membres."
---

# Notifications push web {#web-push-notifications}

<div class="article-intro">

Les applications web ChurchApps envoient des notifications push via l'API Web Push du W3C -- le même mécanisme que Firebase Cloud Messaging côté serveur, mais livré par le `PushManager` natif du navigateur plutôt que par FCM. Une seule paire de clés VAPID sur le MessagingApi couvre tous les consommateurs (B1Admin, B1App, les futures PWA).

</div>

## Quand le push est déclenché {#when-push-fires}

Le push est un niveau dans une seule passe de livraison à l'intérieur de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) : une barrière de préférence in-app, puis la livraison par socket et le push tentés dans la même passe (chacun derrière sa propre barrière de préférence), puis le courriel. Un destinataire qui a mis la catégorie en sourdine n'atteint jamais le push. Une livraison socket réussie n'arrête plus le push : chaque type de notification se comporte désormais comme le faisaient toujours les messages privés, si bien qu'une PWA installée et restée en arrière-plan affiche toujours une notification au niveau du système d'exploitation, même lorsqu'une livraison socket a déjà abouti. Les bannières en double sont supprimées côté client par le service worker (voir [Exigence du service worker](#service-worker-requirement)). Les rappels programmés et les diffusions déclenchées par le personnel démarrent directement au niveau push, en sautant entièrement l'étape socket. Le courriel reste piloté par minuteur : il fait remonter les lignes non lues selon son propre calendrier, et non dans le cadre de cette passe.

Les chemins les plus courants qui aboutissent au push :

1. **Notifications de contenu** -- une réponse à une conversation suivie par la personne, une mention, ou un autre événement routé par `NotificationHelper.createNotifications()`.
2. **Messages privés** -- un message direct passe par la même fonction de livraison et tente toujours le push en plus de la livraison par socket.
3. **Rappels programmés** -- rappels d'événements, de tâches et de service, développés et envoyés par le moteur de rappels, qui démarre les nouvelles occurrences directement au niveau push.
4. **Pushs déclenchés par le personnel** -- `POST /messaging/notifications/create`, `/ping` et `/group/send` pour des diffusions ponctuelles ou de groupe.
5. **Pushs programmés par le personnel** -- `POST /messaging/scheduledNotifications` enregistre un push destiné à toutes les personnes disposant de l'application (`audience: "church"`) ou à un seul groupe, et le minuteur d'une minute l'envoie à l'échéance (voir [Architecture des notifications](./architecture/notifications.md)). Un push à toute l'église sans lien ouvre `/mobile/notifications` ; un push de groupe sans lien ouvre ce groupe.

## Flux côté serveur {#server-flow}

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### Variables d'environnement requises {#required-environment-variables}

Les clés VAPID sont stockées dans `Environment` et doivent être présentes pour que le push soit activé :

| Variable d'environnement | Paramètre `Environment` | Description |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Clé publique VAPID (base64url). Renvoyée aux clients via `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Clé privée VAPID. Sert à signer chaque push sortant |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` communiquée aux services de push. Valeur par défaut : `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` renvoie `false` lorsque l'une des deux clés est absente : le module de messagerie continue de fonctionner, mais les envois push ne font rien. Le site mobile B1App indique alors aux membres que le push n'est pas activé, au lieu de proposer la configuration.

### Générer une paire de clés VAPID {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Ajoutez le résultat à votre `.env` (en local) ou au Parameter Store AWS SSM (en déploiement). La rotation des clés invalide chaque abonnement existant : les clients doivent se réinscrire au prochain chargement de page.

## Modèle de stockage {#storage-model}

Les abonnements Web Push sont stockés dans la table `devices` existante, à côté des enregistrements d'appareils FCM. Ils se distinguent par un préfixe `webpush:` dans la colonne `fcmToken` :

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Ainsi, un seul appel à `loadByPersonId` renvoie tous les appareils qu'un utilisateur a inscrits, quelle que soit la plateforme. `WebPushHelper.isWebPushToken(token)` et `decodeSubscription(token)` gèrent la logique du préfixe.

## Points de terminaison {#endpoints}

Chemin de base : `/messaging/webpush`

| Méthode | Chemin | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Publique | Renvoie `{ publicKey, enabled }`. Les clients passent `publicKey` à `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Enregistre (ou met à jour) un abonnement pour l'utilisateur authentifié. Corps : `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Publique | Supprime toute ligne d'appareil dont le `fcmToken` contient le point de terminaison donné. Corps : `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Supprime une ligne d'appareil précise par son identifiant côté serveur |

## Primitive client : `WebPushHelper` {#client-primitive-webpushhelper}

`WebPushHelper` de `@churchapps/apphelper` est l'unique point d'entrée côté client. Les applications hôtes le configurent une fois au démarrage, puis appellent `subscribe()` après la connexion.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

Comportements dont les consommateurs bénéficient automatiquement :

- **Vérification de prise en charge** -- `isSupported()` renvoie `false` sur les navigateurs sans `serviceWorker`, `PushManager` ni `Notification`.
- **Délai d'attente** -- `canPromptNow()` impose un délai de 7 jours entre deux demandes, via `localStorage`, afin que les utilisateurs qui refusent l'invite du système ne soient pas sollicités à chaque session.
- **Désabonnement** -- `setOptedOut(true)` et `unsubscribe()` empêchent toute nouvelle demande et suppriment la ligne d'appareil côté serveur.
- **Détection de PWA installée** -- `isStandalone()` permet aux hôtes de conditionner l'invite push sur iOS à « l'utilisateur a installé la PWA sur son écran d'accueil » (iOS n'autorise le push que pour les PWA installées).
- **Réinscription lors d'un changement d'église** -- `refreshEnrollment()` renvoie l'abonnement existant du navigateur pour le nouveau `userChurch`, sans redemander l'autorisation à l'utilisateur. Appelez-la depuis le gestionnaire de changement de `userChurch`.

### Exigence du service worker {#service-worker-requirement}

Le `PushManager` du navigateur ne résout un abonnement que lorsqu'un service worker est enregistré pour le périmètre configuré. Les PWA ChurchApps utilisent [Serwist](https://serwist.dev/) (applications Next.js) ou workbox pour générer leur service worker. Comme le serveur tente désormais toujours le push en plus de la livraison par socket (voir [Quand le push est déclenché](#when-push-fires)), le service worker est le point de déduplication : son gestionnaire `push` doit supprimer `showNotification` lorsqu'un client focalisé ou visible se trouve déjà sur la cible de lien profond de la notification, mais il doit toujours mettre à jour le badge de l'application, que la bannière soit affichée ou non :

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` et `clientMatchesTarget` dépendent de chaque application -- voir `B1App/src/app/sw.ts` pour l'implémentation de référence. B1App envoie `privateMessage` vers `/mobile/messages/:personId`, B1Admin envoie `notification` vers son panneau d'alertes, etc.

## Notes d'exploitation {#operational-notes}

- **Résultats `gone: true`** -- `WebPushHelper.sendBulk` renvoie `{ token, success, gone, errorMessage }` pour chaque destinataire. Un résultat `gone: true` (le service de push a répondu `404` ou `410`) signifie que l'abonnement est définitivement invalide ; le code en aval de `NotificationHelper` supprime ces lignes d'appareils pour qu'elles ne soient plus tentées.
- **TTL** -- les messages push sont envoyés avec `TTL: 86400` (24 heures). Si le navigateur de l'utilisateur ne se connecte pas au service de push dans les 24 heures, le push est abandonné.
- **Aucune nouvelle tentative** -- un échec transitoire (délai dépassé, erreur 5xx) est journalisé et n'est pas réessayé. Le push est au mieux : la socket de la page et le niveau courriel assurent la durabilité de la notification.
- **Environnements désactivés** -- les environnements de développement peuvent laisser les clés VAPID vides ; `WebPushHelper.isEnabled()` renvoie alors `false` et les pushs sont court-circuités. C'est le comportement voulu pour les environnements qui n'ont pas leur propre identité VAPID.

## Pages connexes {#related-pages}

- [Architecture des notifications](./architecture/notifications.md) -- L'entonnoir d'escalade in-app, push et courriel, ainsi que le moteur de rappels
- [Architecture temps réel](./realtime.md) -- Livraison WebSocket ; le push se déclenche désormais depuis le même entonnoir in-app, en parallèle de la livraison par socket dans la même passe, et non seulement en repli lorsqu'une livraison par socket n'aboutit pas
- [Points de terminaison Messaging](./api/endpoints/messaging.md) -- Notifications, appareils et le reste de la surface de messagerie
- [AppHelper](./shared-libraries/app-helper.md) -- Le paquet npm qui livre `WebPushHelper`
