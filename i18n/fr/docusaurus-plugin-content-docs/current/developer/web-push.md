---
title: "Notifications push web"
---

# Notifications push web

<div class="article-intro">

Les applications web de ChurchApps envoient des notifications push via l'API W3C Web Push -- le même mécanisme que Firebase Cloud Messaging côté serveur, mais livré par le `PushManager` natif du navigateur plutôt que par FCM. Une seule paire de clés VAPID sur le MessagingApi couvre tous les consommateurs (B1Admin, B1App, les futures PWA).

</div>

## Quand la notification push est envoyée {#when-push-fires}

Le push est un palier d'une même passe de diffusion dans `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) : un filtre de préférences in-app, puis la diffusion par socket et le push tentés dans la même passe (chacun derrière son propre filtre de préférences), puis l'e-mail. Un destinataire qui a désactivé la catégorie n'atteint jamais le push. La réussite de la diffusion par socket n'arrête plus le push : chaque type de notification se comporte désormais comme les messages privés l'ont toujours fait, de sorte qu'une PWA installée et exécutée en arrière-plan affiche tout de même une notification au niveau du système d'exploitation, même si une diffusion par socket a déjà abouti ; les bannières en double sont plutôt supprimées côté client par le service worker (voir [Exigence du service worker](#service-worker-requirement)). Les rappels planifiés et les diffusions déclenchées par le personnel démarrent directement au palier push, en sautant entièrement l'étape socket. L'e-mail reste piloté par une minuterie, et fait escalader les lignes non lues selon son propre calendrier plutôt que dans le cadre de cette passe.

Les chemins les plus courants qui atteignent le push :

1. **Notifications de contenu** -- une réponse à une conversation suivie par la personne, une mention, ou un autre événement routé par `NotificationHelper.createNotifications()`.
2. **Messages privés** -- un message direct passe par la même fonction de diffusion et tente toujours le push en parallèle de la diffusion par socket.
3. **Rappels planifiés** -- rappels d'événements, de tâches et de service développés et envoyés par le moteur de rappels, qui démarre les nouvelles occurrences directement au palier push.
4. **Envois push déclenchés par le personnel** -- `POST /messaging/notifications/create`, `/ping` et `/group/send` pour des diffusions ponctuelles ou de groupe.

## Flux côté serveur

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

### Variables d'environnement requises

Les clés VAPID sont stockées dans `Environment` et doivent être présentes pour activer le push :

| Variable | Description |
|----------|-------------|
| `webPushPublicKey` | Clé publique VAPID (base64url). Renvoyée aux clients par `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Clé privée VAPID. Sert à signer chaque push sortant |
| `webPushSubject` | URI `mailto:` communiquée aux services push. Par défaut `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` renvoie `false` si l'une des deux clés est absente : le module de messagerie continue de fonctionner, et les envois push ne font simplement rien.

### Générer une paire de clés VAPID

```bash
npx web-push generate-vapid-keys
```

Ajoutez le résultat à votre `.env` (en local) ou au Parameter Store AWS SSM (en production). La rotation des clés invalide chaque abonnement existant : les clients doivent se réinscrire au prochain chargement de la page.

## Modèle de stockage

Les abonnements Web Push sont stockés dans la table `devices` existante, aux côtés des enregistrements d'appareils FCM. Ils se distinguent par un préfixe `webpush:` dans la colonne `fcmToken` :

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Cela permet à un seul appel `loadByPersonId` de renvoyer tous les appareils inscrits par un utilisateur, quelle que soit la plateforme. `WebPushHelper.isWebPushToken(token)` et `decodeSubscription(token)` gèrent la logique du préfixe.

## Points de terminaison

Chemin de base : `/messaging/webpush`

| Méthode | Chemin | Auth | Description |
|----------|------|------|------------|
| GET | `/publicKey` | Public | Renvoie `{ publicKey, enabled }`. Les clients transmettent `publicKey` à `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Enregistre (ou met à jour) un abonnement pour l'utilisateur authentifié. Corps : `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Supprime toute ligne d'appareil dont `fcmToken` contient le point de terminaison donné. Corps : `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Supprime une ligne d'appareil précise par son identifiant côté serveur |

## Primitive côté client : `WebPushHelper`

Le `WebPushHelper` de `@churchapps/apphelper` est l'unique point d'entrée côté client. Les hôtes le configurent une fois au démarrage et appellent `subscribe()` après la connexion.

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

- **Vérification de compatibilité** -- `isSupported()` renvoie `false` sur les navigateurs sans `serviceWorker` / `PushManager` / `Notification`.
- **Délai d'attente** -- `canPromptNow()` impose un délai de 7 jours entre deux demandes, via `localStorage`, afin que les utilisateurs qui refusent l'invite du système ne soient pas sollicités à chaque session.
- **Désinscription** -- `setOptedOut(true)` et `unsubscribe()` empêchent de redemander l'accord et suppriment la ligne d'appareil côté serveur.
- **Détection de PWA installée** -- `isStandalone()` permet aux hôtes de conditionner les invites push sur iOS au fait que l'utilisateur a installé la PWA sur son écran d'accueil (iOS n'autorise le push que depuis une PWA installée).
- **Réinscription lors d'un changement d'église** -- `refreshEnrollment()` renvoie l'abonnement existant du navigateur pour le nouveau `userChurch`, sans redemander l'accord de l'utilisateur. Appelez-la depuis le gestionnaire de changement de `userChurch`.

### Exigence du service worker {#service-worker-requirement}

Le `PushManager` du navigateur ne résout un abonnement que si un service worker est enregistré à la portée configurée. Les PWA de ChurchApps utilisent [Serwist](https://serwist.dev/) (applications Next.js) ou workbox pour générer le service worker. Comme le serveur tente désormais toujours le push en parallèle de la diffusion par socket (voir [Quand la notification push est envoyée](#when-push-fires)), le service worker est le point de déduplication : son gestionnaire `push` doit supprimer `showNotification` lorsqu'un client actif ou visible se trouve déjà sur la cible de lien profond de la notification, mais doit toujours mettre à jour le badge de l'application, que la bannière soit affichée ou non :

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

`deepLinkFor` et `clientMatchesTarget` dépendent de chaque consommateur -- voir `B1App/src/app/sw.ts` pour l'implémentation de référence. B1App dirige `privateMessage` vers `/mobile/messages/:personId`, B1Admin dirige `notification` vers son panneau d'alertes, etc.

## Notes d'exploitation

- **Résultats `gone: true`** -- `WebPushHelper.sendBulk` renvoie `{ token, success, gone, errorMessage }` pour chaque destinataire. Un résultat `gone: true` (le service push a répondu `404` ou `410`) signifie que l'abonnement n'est plus valide de façon permanente ; le code en aval de `NotificationHelper` supprime ces lignes d'appareil afin qu'elles ne soient plus essayées.
- **TTL** -- les messages push sont envoyés avec `TTL: 86400` (24 heures). Si le navigateur de l'utilisateur ne se connecte pas au service push dans les 24 heures, le push est abandonné.
- **Aucune nouvelle tentative** -- un échec transitoire (délai dépassé, erreur 5xx) est journalisé et n'est pas réessayé. Le push se fait au mieux ; la socket dans la page et le palier e-mail assurent la durabilité.
- **Environnements désactivés** -- les environnements de développement peuvent laisser les clés VAPID vides ; `WebPushHelper.isEnabled()` renverra alors `false` et les envois seront court-circuités. C'est le comportement voulu pour les environnements qui n'ont pas leur propre identité VAPID.

## Pages connexes

- [Architecture des notifications](./architecture/notifications) -- l'entonnoir complet in-app/push/e-mail et le moteur de rappels
- [Architecture temps réel](./realtime) -- diffusion WebSocket ; le push part désormais du même entonnoir in-app en parallèle de la diffusion par socket, dans la même passe, et non plus seulement en repli lorsqu'une diffusion par socket n'aboutit pas
- [Points de terminaison de messagerie](./api/endpoints/messaging) -- notifications, appareils et le reste de la surface de messagerie
- [AppHelper](./shared-libraries/app-helper) -- le paquet npm qui fournit `WebPushHelper`
