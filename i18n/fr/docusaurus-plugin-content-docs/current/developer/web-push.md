---
title: "Notifications push web"
description: "Configurer les clés VAPID, le client WebPushHelper et le service worker pour que B1.church et B1 Admin envoient des notifications push aux membres."
---

# Notifications push web

<div class="article-intro">

Les applications web de ChurchApps livrent les notifications push par l'API Web Push du W3C — le même mécanisme que Firebase Cloud Messaging côté serveur, mais livré par le `PushManager` natif du navigateur plutôt que par FCM. Une seule paire de clés VAPID sur le MessagingApi couvre tous les consommateurs (B1Admin, B1App, les futures PWA).

</div>

## Quand le push est déclenché {#when-push-fires}

Le push est un palier d'une même passe de livraison à l'intérieur de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) : une porte de préférence dans l'application, puis la livraison par socket et le push tentés dans la même passe (chacun derrière sa propre porte de préférence), puis le courriel. Un destinataire qui a mis la catégorie en sourdine n'atteint jamais le push. La livraison par socket qui réussit n'arrête plus le push — chaque type de notification se comporte désormais comme les messages privés l'ont toujours fait, de sorte qu'une PWA installée en arrière-plan affiche tout de même une notification au niveau du système d'exploitation même lorsqu'une livraison par socket a déjà abouti ; les bandeaux en double sont supprimés côté client par le service worker (voir [Exigence de service worker](#service-worker-requirement)). Les rappels programmés et les diffusions lancées par le personnel démarrent directement au palier push, en sautant complètement l'étape socket. Le courriel reste piloté par une minuterie : il relance les lignes non lues selon son propre calendrier, et non dans le cadre de cette passe.

Les chemins les plus courants qui atteignent le push :

1. **Notifications de contenu** — une réponse à une conversation suivie par la personne, une mention, ou un autre événement acheminé par `NotificationHelper.createNotifications()`.
2. **Messages privés** — un message direct passe par la même fonction de livraison et tente toujours le push en parallèle de la livraison par socket.
3. **Rappels programmés** — rappels d'événements, de tâches et de service, développés et envoyés par le moteur de rappels, qui démarre les nouvelles occurrences directement au palier push.
4. **Pushs lancés par le personnel** — `POST /messaging/notifications/create`, `/ping` et `/group/send` pour des diffusions ponctuelles ou de groupe.

## Flux côté serveur

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ porte de préférence de l'application      ← les destinataires en sourdine s'arrêtent ici, sans push
       ├─ même passe, les deux tentées (aucune ne conditionne l'autre) :
       │    ├─ livraison par socket via DeliveryHelper  ← ignorée pour les rappels/diffusions (ils démarrent au push)
       │    └─ porte de préférence du push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ bibliothèque web-push → POST signé VAPID → service de push du navigateur
       └─ porte de préférence du courriel → minuterie, relance séparément les lignes non lues
```

### Variables d'environnement requises

Les clés VAPID sont stockées dans `Environment` et doivent être présentes pour activer le push :

| Variable d'environnement | Paramètre `Environment` | Description |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Clé publique VAPID (base64url). Renvoyée aux clients par `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Clé privée VAPID. Sert à signer chaque push sortant |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` communiquée aux services de push. Par défaut `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` renvoie `false` lorsqu'une des deux clés manque — le module de messagerie continue de fonctionner, et les livraisons push ne font simplement rien. Le site mobile B1App indique alors aux membres que le push n'est pas activé, au lieu de proposer une configuration.

### Générer une paire de clés VAPID

```bash
npx web-push generate-vapid-keys
```

Ajoutez le résultat à votre `.env` (en local) ou au Parameter Store d'AWS SSM (en déploiement). Changer de clés invalide tous les abonnements existants — les clients doivent s'inscrire à nouveau au prochain chargement de page.

## Modèle de stockage

Les abonnements Web Push sont stockés dans la table `devices` existante, à côté des enregistrements d'appareils FCM. Ils se distinguent par un préfixe `webpush:` dans la colonne `fcmToken` :

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Cela permet à un seul appel `loadByPersonId` de renvoyer tous les appareils inscrits par un utilisateur, quelle que soit la plateforme. `WebPushHelper.isWebPushToken(token)` et `decodeSubscription(token)` gèrent la logique du préfixe.

## Points de terminaison

Chemin de base : `/messaging/webpush`

| Méthode | Chemin | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Publique | Renvoie `{ publicKey, enabled }`. Les clients transmettent `publicKey` à `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Enregistre (ou met à jour) un abonnement pour l'utilisateur authentifié. Corps : `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Publique | Supprime toute ligne d'appareil dont `fcmToken` contient le point de terminaison donné. Corps : `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Supprime une ligne d'appareil précise par son identifiant côté serveur |

## Primitive côté client : `WebPushHelper`

Le `WebPushHelper` de `@churchapps/apphelper` est l'unique point d'entrée côté client. Les hôtes le configurent une fois au démarrage et appellent `subscribe()` après la connexion.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Dans l'amorçage de votre application (par exemple _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // portée du service worker ; correspond à l'enregistrement de sw.js
  appName: "B1AppPwa"        // stocké sur la ligne de l'appareil, utile pour filtrer par surface
});

// Après la connexion (et après chaque changement de userChurch)
await WebPushHelper.subscribe();
```

Comportements dont bénéficient gratuitement les consommateurs :

- **Vérification de la prise en charge** — `isSupported()` renvoie `false` sur les navigateurs sans `serviceWorker` / `PushManager` / `Notification`.
- **Délai d'attente** — `canPromptNow()` impose un délai de 7 jours entre deux demandes, via `localStorage`, afin que les utilisateurs qui refusent l'invite du système d'exploitation ne soient pas sollicités à chaque session.
- **Retrait** — `setOptedOut(true)` et `unsubscribe()` empêchent de solliciter à nouveau et suppriment la ligne d'appareil côté serveur.
- **Détection de la PWA installée** — `isStandalone()` permet aux hôtes de conditionner l'invite push sur iOS à « l'utilisateur a installé la PWA sur son écran d'accueil » (iOS n'autorise le push que depuis les PWA installées).
- **Réinscription au changement d'église** — `refreshEnrollment()` renvoie l'abonnement existant du navigateur pour le nouveau `userChurch`, sans solliciter à nouveau l'utilisateur. Appelez-le depuis le gestionnaire de changement de `userChurch`.

### Exigence de service worker {#service-worker-requirement}

Le `PushManager` du navigateur ne résout un abonnement que lorsqu'un service worker est enregistré à la portée configurée. Les PWA de ChurchApps utilisent [Serwist](https://serwist.dev/) (applications Next.js) ou workbox pour générer le service worker. Puisque le serveur tente désormais toujours le push en parallèle de la livraison par socket (voir [Quand le push est déclenché](#when-push-fires)), le service worker est le point de déduplication : son gestionnaire `push` doit supprimer `showNotification` lorsqu'un client focalisé ou visible se trouve déjà sur la cible de lien profond de la notification, mais doit toujours mettre à jour le badge de l'application, que le bandeau soit affiché ou non :

```javascript
// public/sw.js (ou ce que Serwist/workbox produit)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // s'exécute toujours, même si le bandeau est supprimé

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Même chemin ; pour les messages privés, aussi même conversationId.
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
    if (exact) return exact.focus(); // déjà sur la cible : on donne le focus, on ne navigue pas

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` et `clientMatchesTarget` dépendent de chaque consommateur — voir `B1App/src/app/sw.ts` pour l'implémentation de référence. B1App achemine `privateMessage` vers `/mobile/messages/:personId`, B1Admin achemine `notification` vers son panneau d'alertes, etc.

## Notes d'exploitation

- **Résultats `gone: true`** — `WebPushHelper.sendBulk` renvoie `{ token, success, gone, errorMessage }` pour chaque destinataire. Un résultat `gone: true` (le service de push a répondu `404` ou `410`) signifie que l'abonnement est définitivement invalide ; le code en aval dans `NotificationHelper` supprime ces lignes d'appareil pour ne plus les essayer.
- **TTL** — les messages push sont envoyés avec `TTL: 86400` (24 heures). Si le navigateur de l'utilisateur ne se connecte pas au service de push dans les 24 heures, le push est abandonné.
- **Aucune nouvelle tentative** — un échec transitoire (délai dépassé, erreur 5xx) est journalisé sans nouvelle tentative. Le push est fait au mieux ; le socket en page et le palier de notification par courriel assurent la persistance.
- **Environnements désactivés** — les environnements de développement peuvent laisser les clés VAPID vides ; `WebPushHelper.isEnabled()` renverra alors `false` et les pushs seront court-circuités. C'est le comportement voulu pour les environnements sans leur propre identité VAPID.

## Pages connexes

- [Architecture des notifications](./architecture/notifications.md) -- l'entonnoir complet de l'application, du push et du courriel, et le moteur de rappels
- [Temps réel](./realtime.md) -- livraison par WebSocket ; le push se déclenche désormais depuis le même entonnoir de l'application, en parallèle de la livraison par socket dans la même passe, et non plus seulement en repli lorsqu'une livraison par socket n'aboutit pas
- [Points de terminaison Messaging](./api/endpoints/messaging.md) -- notifications, appareils et le reste de la surface de messagerie
- [AppHelper](./shared-libraries/app-helper.md) -- le paquet npm qui fournit `WebPushHelper`
