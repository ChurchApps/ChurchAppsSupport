---
title: "Notifications Web Push"
---

# Notifications Web Push

<div class="article-intro">

Les applications web ChurchApps livrent des notifications push via l'API Web Push du W3C -- le même mécanisme utilisé par Firebase Cloud Messaging côté serveur, mais livré via le `PushManager` natif du navigateur plutôt que FCM. Une seule paire de clés VAPID sur la MessagingApi couvre chaque consommateur (B1Admin, B1App, futures PWAs).

</div>

## Quand push se déclenche

Push est un niveau dans un seul passage de livraison à l'intérieur de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) : une porte de préférence in-app, puis la livraison par socket et push tentées dans le même passage (chacune derrière sa propre porte de préférence), puis l'e-mail. Un destinataire qui a sourdine la catégorie n'atteint jamais push. La livraison par socket réussie n'arrête plus push -- chaque type de notification se comporte maintenant de la manière dont les messages privés l'ont toujours fait, donc une PWA installée assise en arrière-plan surfacera toujours une notification au niveau de l'OS même quand une livraison par socket a déjà atterri ; les bannières dupliquées sont supprimées côté client par le service worker à la place (voir [Exigence du service worker](#service-worker-requirement)). Les rappels programmés et les diffusions déclenchées par le personnel commencent directement au niveau du push, en ignorant complètement l'étape du socket. L'e-mail reste piloté par la minuterie, l'escalade des lignes non lues selon son propre calendrier plutôt que dans le cadre de ce passage.

Les chemins les plus courants qui atteignent push :

1. **Notifications de contenu** -- une réponse à une conversation que la personne suit, une mention ou un autre événement routé via `NotificationHelper.createNotifications()`.
2. **Messages privés** -- un message direct passe par la même fonction de livraison et tente toujours push aux côtés de la livraison par socket.
3. **Rappels programmés** -- rappels d'événement, de tâche et de service développés et envoyés par le moteur de rappel, qui lance de nouvelles occurrences directement au niveau du push.
4. **Pushes déclenchés par le personnel** -- `POST /messaging/notifications/create`, `/ping` et `/group/send` pour les diffusions ponctuelles ou de groupe.

## Flux du serveur

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ porte de préférence in-app                  ← les destinataires en sourdine s'arrêtent ici, pas de push
       ├─ même passage, les deux tentées (ni l'une ni l'autre ne gâte l'autre) :
       │    ├─ livraison par socket via DeliveryHelper  ← ignorée pour les rappels/diffusions (ils commencent au push)
       │    └─ porte de préférence push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → service de push navigateur
       └─ porte de préférence e-mail → piloté par minuterie, escalade les lignes non lues séparément
```

### Variables d'environnement requises

Les clés VAPID sont stockées dans `Environment` et doivent être présentes pour que push soit activé :

| Variable | Description |
|----------|-------------|
| `webPushPublicKey` | Clé publique VAPID (base64url). Renvoyée aux clients via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Clé privée VAPID. Utilisée pour signer chaque push sortant |
| `webPushSubject` | URI `mailto:` signalé aux services de push. Par défaut `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` retourne `false` quand l'une des clés est manquante -- le module de messagerie continue à fonctionner, les livraisons push deviennent simplement no-op.

### Génération d'une paire de clés VAPID

```bash
npx web-push generate-vapid-keys
```

Ajoutez la sortie à votre `.env` (local) ou AWS SSM Parameter Store (déployé). Faire tourner les clés invalide chaque abonnement existant -- les clients doivent se réinscrire au prochain chargement de page.

## Modèle de stockage

Les abonnements Web Push sont stockés dans la table `devices` existante aux côtés des enregistrements d'appareil FCM. Ils sont distingués par un préfixe `webpush:` sur la colonne `fcmToken` :

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Cela permet à un seul appel `loadByPersonId` de retourner chaque appareil qu'un utilisateur a inscrit, quel que soit la plateforme. `WebPushHelper.isWebPushToken(token)` et `decodeSubscription(token)` gèrent la logique du préfixe.

## Points de terminaison

Chemin de base : `/messaging/webpush`

| Méthode | Chemin | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Retourne `{ publicKey, enabled }`. Les clients passent `publicKey` à `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Enregistre (ou upserts) un abonnement pour l'utilisateur authentifié. Corps : `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Supprime toute ligne d'appareil dont le `fcmToken` contient le point de terminaison donné. Corps : `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Supprime une ligne d'appareil spécifique par son id côté serveur |

## Primitive client : `WebPushHelper`

Le `WebPushHelper` de `@churchapps/apphelper` est le seul point d'entrée côté client. Les hôtes la configurent une fois au démarrage et appelent `subscribe()` après la connexion.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Dans le bootstrap de votre application (par ex., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // portée du service worker ; correspond à l'enregistrement sw.js
  appName: "B1AppPwa"        // stocké sur la ligne d'appareil, utile pour filtrer par surface
});

// Après la connexion (et après chaque changement de userChurch)
await WebPushHelper.subscribe();
```

Les comportements que les consommateurs obtiennent gratuitement :

- **Vérification de capacité** -- `isSupported()` retourne `false` sur les navigateurs sans `serviceWorker` / `PushManager` / `Notification`.
- **Refroidissement** -- `canPromptNow()` applique un refroidissement de 7 jours entre les invites via `localStorage` pour que les utilisateurs qui rejettent l'invite OS ne soient pas demandés à nouveau à chaque session.
- **Opt-out** -- `setOptedOut(true)` et `unsubscribe()` bloquent les ré-invites et suppriment la ligne d'appareil côté serveur.
- **Détection de PWA autonome** -- `isStandalone()` permet aux hôtes de gâter les invites push iOS derrière « l'utilisateur a installé la PWA sur son écran d'accueil » (iOS permet uniquement push des PWAs installées).
- **Réinscription lors du changement d'église** -- `refreshEnrollment()` renvoie l'abonnement du navigateur existant par rapport à la nouvelle `userChurch` sans ré-inviter l'utilisateur. Appelez-la du gestionnaire de changement `userChurch`.

### Exigence du service worker

Le `PushManager` du navigateur ne résout un abonnement que quand un service worker est enregistré à la portée configurée. Les PWAs ChurchApps utilisent [Serwist](https://serwist.dev/) (applications Next.js) ou workbox pour la génération du service worker. Parce que le serveur tente maintenant toujours push aux côtés de la livraison par socket (voir [Quand push se déclenche](#quand-push-se-déclenche)), le service worker est le point de dédup : son gestionnaire `push` doit supprimer `showNotification` quand un client focalisé/visible est déjà sur la cible de lien profond de la notification, mais devrait toujours mettre à jour le badge de l'application quel que soit le banneau ait été montré :

```javascript
// public/sw.js (ou ce que Serwist/workbox émet)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // tourne toujours, même si le banneau est supprimé

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Même chemin ; pour les messages privés, également même conversationId.
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
    if (exact) return exact.focus(); // déjà sur la cible : focalisez, ne naviguer pas

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` sont spécifiques au consommateur -- voir `B1App/src/app/sw.ts` pour l'implémentation de référence. B1App routes `privateMessage` vers `/mobile/messages/:personId`, B1Admin routes `notification` vers son panneau d'alertes, etc.

## Notes opérationnelles

- **Résultats `gone: true`** -- `WebPushHelper.sendBulk` retourne `{ token, success, gone, errorMessage }` par destinataire. Un résultat `gone: true` (le service push a répondu `404` ou `410`) signifie que l'abonnement est définitivement invalide ; le code en aval dans `NotificationHelper` supprime ces lignes d'appareil pour qu'elles ne soient pas essayées à nouveau.
- **TTL** -- les messages push sont envoyés avec `TTL: 86400` (24 heures). Si le navigateur de l'utilisateur ne se connecte pas au service de push dans les 24 heures, le push est abandonné.
- **Pas de nouvelle tentative** -- un défaut transitoire (timeout, 5xx) est enregistré et non retryé. Push est du mieux possible ; le socket dans la page et le niveau de notification par e-mail gèrent l'histoire de la durabilité.
- **Environnements désactivés** -- les environnements de staging et dev peuvent laisser les clés VAPID vides ; `WebPushHelper.isEnabled()` retournera `false` et les pushes court-circuiteront. C'est le comportement prévu pour les environnements sans leur propre identité VAPID.

## Pages connexes

- [Architecture des notifications](./architecture/notifications) -- L'entonnoir complet d'escalade in-app/push/e-mail et le moteur de rappel
- [Architecture en temps réel](./realtime) -- Livraison WebSocket ; push se déclenche maintenant à partir du même entonnoir in-app aux côtés de la livraison par socket dans le même passage, pas seulement en tant que fallback quand une livraison par socket n'atterrit pas
- [Points de terminaison de messagerie](./api/endpoints/messaging) -- Notifications, appareils et le reste de la surface de messagerie
- [AppHelper](./shared-libraries/app-helper) -- Le paquet npm qui envoie `WebPushHelper`
