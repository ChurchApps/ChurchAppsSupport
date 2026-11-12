---
title: "Notifications push web"
description: "Configurez les clés VAPID, le client WebPushHelper et la gestion du service worker pour que B1.church et B1 Admin puissent envoyer des notifications push du navigateur aux membres."
---

# Notifications push web

<div class="article-intro">

Les applications web ChurchApps envoient des notifications push via l'API Web Push du W3C — le même mécanisme que Firebase Cloud Messaging côté serveur, mais livré par le `PushManager` natif du navigateur plutôt que par FCM. Une seule paire de clés VAPID sur le MessagingApi couvre tous les consommateurs (B1Admin, B1App, les futures PWA).

</div>

## Quand le push est déclenché {#when-push-fires}

Le push est un niveau dans une seule passe de livraison à l'intérieur de `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) : une barrière de préférence in-app, puis la livraison par socket et le push tentés dans la même passe (chacun derrière sa propre barrière de préférence), puis le courriel. Un destinataire qui a mis la catégorie en sourdine n'atteint jamais le push. Une livraison socket réussie n'arrête plus le push — chaque type de notification se comporte désormais comme le faisaient toujours les messages privés, si bien qu'une PWA installée en arrière-plan affiche toujours une notification au niveau du système d'exploitation même lorsqu'une livraison socket a déjà abouti ; les bannières en double sont supprimées côté client par le service worker (voir [Exigence du service worker](#service-worker-requirement)). Les rappels programmés et les diffusions déclenchées par le staff démarrent directement au niveau push, en sautant entièrement l'étape socket. Le courriel reste piloté par minuteur, en escaladant les lignes non lues selon son propre calendrier plutôt que dans le cadre de cette passe.

Les chemins les plus courants qui aboutissent au push :

1. **Notifications de contenu** — une réponse à une conversation suivie par la personne, une mention, ou un autre événement routé par `NotificationHelper.createNotifications()`.
2. **Messages privés** — un message direct passe par la même fonction de livraison et tente toujours le push en plus de la livraison par socket.
3. **Rappels programmés** — rappels d'événements, de tâches et de service, développés et envoyés par le moteur de rappels, qui démarre les nouvelles occurrences directement au niveau push.
4. **Pushs déclenchés par le staff** — `POST /messaging/notifications/create`, `/ping` et `/group/send` pour des diffusions ponctuelles ou de groupe.
5. **Pushs programmés par le staff** — `POST /messaging/scheduledNotifications` enregistre un push pour toutes les personnes disposant de l'application (`audience: "church"`) ou pour un seul groupe, et le minuteur d'une minute l'envoie à l'échéance (voir [Architecture des notifications](./architecture/notifications.md)). Un push à toute l'église sans lien ouvre `/mobile/notifications` ; un push de groupe sans lien ouvre ce groupe.

## Flux côté serveur {#server-flow}

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ barrière de préférence in-app           ← les destinataires en sourdine s'arrêtent ici, sans push
       ├─ même passe, les deux tentées (aucune ne conditionne l'autre) :
       │    ├─ livraison socket via DeliveryHelper  ← ignorée pour les rappels/diffusions (ils démarrent au niveau push)
       │    └─ barrière de préférence push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ bibliothèque web-push → POST signé VAPID → service de push du navigateur
       └─ barrière de préférence courriel → piloté par minuteur, escalade les lignes non lues séparément
```

### Variables d'environnement requises {#required-environment-variables}

Les clés VAPID sont stockées dans `Environment` et doivent être présentes pour que le push soit activé :

| Variable d'environnement | Paramètre `Environment` | Description |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Clé publique VAPID (base64url). Renvoyée aux clients via `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Clé privée VAPID. Sert à signer chaque push sortant |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` signalée aux services de push. Valeur par défaut : `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` renvoie `false` lorsque l'une des deux clés est absente — le module de messagerie continue de fonctionner, les envois push ne font simplement rien. Le site mobile B1App indique alors aux membres que le push n'est pas activé, au lieu de proposer une configuration.

### Générer une paire de clés VAPID {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Ajoutez le résultat à votre `.env` (en local) ou au Parameter Store AWS SSM (en déploiement). Renouveler les clés invalide tous les abonnements existants — les clients doivent se réinscrire au prochain chargement de page.

## Modèle de stockage {#storage-model}

Les abonnements Web Push sont stockés dans la table `devices` existante, aux côtés des enregistrements d'appareils FCM. Ils se distinguent par un préfixe `webpush:` dans la colonne `fcmToken` :

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Cela permet à un seul appel `loadByPersonId` de renvoyer tous les appareils qu'un utilisateur a enregistrés, quelle que soit la plateforme. `WebPushHelper.isWebPushToken(token)` et `decodeSubscription(token)` gèrent la logique du préfixe.

## Points de terminaison {#endpoints}

Chemin de base : `/messaging/webpush`

| Méthode | Chemin | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Renvoie `{ publicKey, enabled }`. Les clients transmettent `publicKey` à `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Enregistre (ou met à jour) un abonnement pour l'utilisateur authentifié. Corps : `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Supprime toute ligne d'appareil dont `fcmToken` contient le point de terminaison donné. Corps : `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Supprime une ligne d'appareil précise par son identifiant côté serveur |

## Primitive client : `WebPushHelper` {#client-primitive-webpushhelper}

Le `WebPushHelper` de `@churchapps/apphelper` est le point d'entrée unique côté client. Les hôtes le configurent une fois au démarrage et appellent `subscribe()` après la connexion.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Dans le démarrage de votre application (par ex. _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // portée du service worker ; correspond à l'enregistrement de sw.js
  appName: "B1AppPwa"        // stocké sur la ligne de l'appareil, utile pour filtrer par surface
});

// Après la connexion (et après chaque changement de userChurch)
await WebPushHelper.subscribe();
```

Comportements que les consommateurs obtiennent gratuitement :

- **Vérification de compatibilité** — `isSupported()` renvoie `false` sur les navigateurs sans `serviceWorker` / `PushManager` / `Notification`.
- **Délai d'attente** — `canPromptNow()` impose un délai de 7 jours entre les demandes via `localStorage`, afin que les utilisateurs qui ferment la demande du système ne soient pas sollicités à chaque session.
- **Désinscription** — `setOptedOut(true)` et `unsubscribe()` bloquent les nouvelles demandes et suppriment la ligne d'appareil côté serveur.
- **Détection de PWA autonome** — `isStandalone()` permet aux hôtes de conditionner les demandes push sur iOS à « l'utilisateur a installé la PWA sur son écran d'accueil » (iOS n'autorise le push que depuis les PWA installées).
- **Réinscription lors d'un changement d'église** — `refreshEnrollment()` renvoie l'abonnement existant du navigateur pour le nouveau `userChurch` sans redemander l'autorisation à l'utilisateur. Appelez-la depuis le gestionnaire de changement de `userChurch`.

### Exigence du service worker {#service-worker-requirement}

Le `PushManager` du navigateur ne résout un abonnement que lorsqu'un service worker est enregistré à la portée configurée. Les PWA ChurchApps utilisent [Serwist](https://serwist.dev/) (applications Next.js) ou workbox pour générer le service worker. Comme le serveur tente désormais toujours le push en plus de la livraison par socket (voir [Quand le push est déclenché](#when-push-fires)), le service worker est le point de déduplication : son gestionnaire `push` doit supprimer `showNotification` lorsqu'un client focalisé ou visible se trouve déjà sur la cible de lien profond de la notification, mais doit toujours mettre à jour le badge de l'application, que la bannière ait été affichée ou non :

```javascript
// public/sw.js (ou le fichier généré par Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // s'exécute toujours, même si la bannière est supprimée

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Même chemin ; pour les messages privés, même conversationId également.
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
    if (exact) return exact.focus(); // déjà sur la cible : focaliser, ne pas naviguer

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` dépendent de chaque consommateur — voir `B1App/src/app/sw.ts` pour l'implémentation de référence. B1App achemine `privateMessage` vers `/mobile/messages/:personId`, B1Admin achemine `notification` vers son panneau d'alertes, etc.

## Notes d'exploitation {#operational-notes}

- **Résultats `gone: true`** — `WebPushHelper.sendBulk` renvoie `{ token, success, gone, errorMessage }` pour chaque destinataire. Un résultat `gone: true` (le service de push a répondu `404` ou `410`) signifie que l'abonnement n'est plus valide de façon permanente ; le code en aval de `NotificationHelper` supprime ces lignes d'appareil pour qu'elles ne soient plus essayées.
- **TTL** — les messages push sont envoyés avec `TTL: 86400` (24 heures). Si le navigateur de l'utilisateur ne se connecte pas au service de push dans les 24 heures, le push est abandonné.
- **Pas de nouvelles tentatives** — un échec transitoire (délai dépassé, erreur 5xx) est journalisé et non réessayé. Le push fonctionne au mieux ; le socket de la page et le niveau courriel assurent la persistance.
- **Environnements désactivés** — les environnements de développement peuvent laisser les clés VAPID vides ; `WebPushHelper.isEnabled()` renverra alors `false` et les pushs seront court-circuités. C'est le comportement voulu pour les environnements sans identité VAPID propre.

## Pages connexes {#related-pages}

- [Architecture des notifications](./architecture/notifications.md) -- L'entonnoir complet d'escalade in-app/push/courriel et le moteur de rappels
- [Architecture temps réel](./realtime.md) -- Livraison WebSocket ; le push se déclenche désormais depuis le même entonnoir in-app en parallèle de la livraison socket, dans la même passe, et non plus seulement comme solution de repli lorsqu'une livraison socket échoue
- [Points de terminaison de messagerie](./api/endpoints/messaging.md) -- Notifications, appareils et le reste de la surface de messagerie
- [AppHelper](./shared-libraries/app-helper.md) -- Le paquet npm qui livre `WebPushHelper`
