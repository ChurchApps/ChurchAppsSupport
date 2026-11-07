---
title: "Notifiche push web"
description: "Configurare le chiavi VAPID, il client WebPushHelper e la gestione del service worker, così B1.church e B1 Admin possono inviare notifiche push ai membri."
---

# Notifiche push web

<div class="article-intro">

Le web app di ChurchApps consegnano le notifiche push tramite la Web Push API del W3C -- lo stesso meccanismo usato da Firebase Cloud Messaging lato server, ma consegnato tramite il `PushManager` nativo del browser invece che tramite FCM. Un'unica coppia di chiavi VAPID sull'API di messaggistica copre tutti i consumatori (B1Admin, B1App, future PWA).

</div>

## Quando parte il push {#when-push-fires}

Il push è uno dei livelli di un unico passaggio di consegna all'interno di `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): un controllo delle preferenze in-app, poi la consegna via socket e il push tentati nello stesso passaggio (ciascuno dietro il proprio controllo delle preferenze), infine l'email. Un destinatario che ha disattivato la categoria non raggiunge mai il push. Il successo della consegna via socket non blocca più il push -- ogni tipo di notifica ora si comporta come hanno sempre fatto i messaggi privati, quindi una PWA installata in background mostra comunque una notifica a livello di sistema operativo anche quando una consegna via socket è già andata a buon fine; i banner duplicati vengono invece soppressi lato client dal service worker (vedi [Requisito del service worker](#service-worker-requirement)). I promemoria programmati e le trasmissioni avviate dallo staff partono direttamente dal livello push, saltando del tutto il passaggio socket. L'email resta guidata da un timer, che fa salire di livello le righe non lette secondo la propria pianificazione invece di farlo come parte di questo passaggio.

I percorsi più comuni che arrivano al push:

1. **Notifiche dei contenuti** -- una risposta a una conversazione che la persona segue, una menzione o un altro evento instradato tramite `NotificationHelper.createNotifications()`.
2. **Messaggi privati** -- un messaggio diretto passa dalla stessa funzione di consegna e tenta sempre il push insieme alla consegna via socket.
3. **Promemoria programmati** -- promemoria per eventi, attività e servizio espansi e inviati dal motore dei promemoria, che avvia le nuove occorrenze direttamente al livello push.
4. **Push avviati dallo staff** -- `POST /messaging/notifications/create`, `/ping` e `/group/send` per trasmissioni singole o di gruppo.

## Flusso lato server

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ controllo delle preferenze in-app      ← i destinatari silenziati si fermano qui, nessun push
       ├─ stesso passaggio, entrambi tentati (nessuno blocca l'altro):
       │    ├─ consegna via socket tramite DeliveryHelper  ← saltata per promemoria/trasmissioni (partono dal push)
       │    └─ controllo delle preferenze push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ libreria web-push → POST firmata VAPID → servizio push del browser
       └─ controllo delle preferenze email → guidato dal timer, fa salire di livello le righe non lette separatamente
```

### Variabili d'ambiente richieste

Le chiavi VAPID sono memorizzate in `Environment` e devono essere presenti perché il push sia attivo:

| Variabile d'ambiente | Impostazione `Environment` | Descrizione |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Chiave pubblica VAPID (base64url). Restituita ai client tramite `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Chiave privata VAPID. Usata per firmare ogni push in uscita |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` comunicato ai servizi push. Predefinito `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` restituisce `false` quando manca una delle due chiavi -- il modulo di messaggistica continua a funzionare, ma le consegne push non fanno nulla. Il sito mobile di B1App comunica quindi ai membri che il push non è attivo, invece di offrire la configurazione.

### Generare una coppia di chiavi VAPID

```bash
npx web-push generate-vapid-keys
```

Aggiungi l'output al tuo `.env` (in locale) oppure ad AWS SSM Parameter Store (nei deployment). Ruotare le chiavi invalida ogni iscrizione esistente -- i client devono registrarsi di nuovo al caricamento successivo della pagina.

## Modello di archiviazione

Le iscrizioni Web Push sono memorizzate nella tabella `devices` esistente, insieme ai record dei dispositivi FCM. Si distinguono per un prefisso `webpush:` nella colonna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Questo permette a un'unica chiamata `loadByPersonId` di restituire ogni dispositivo registrato da un utente, indipendentemente dalla piattaforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` gestiscono la logica del prefisso.

## Endpoint

Percorso base: `/messaging/webpush`

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|----------|----------------|-------------|
| GET | `/publicKey` | Pubblico | Restituisce `{ publicKey, enabled }`. I client passano `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o aggiorna) un'iscrizione per l'utente autenticato. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pubblico | Elimina ogni riga di dispositivo il cui `fcmToken` contiene l'endpoint indicato. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una specifica riga di dispositivo tramite il suo id lato server |

## Primitiva lato client: `WebPushHelper`

Il `WebPushHelper` di `@churchapps/apphelper` è l'unico punto di ingresso lato client. Le app host lo configurano una volta all'avvio e chiamano `subscribe()` dopo l'accesso.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Nel bootstrap dell'app (ad esempio _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // scope del service worker; corrisponde alla registrazione di sw.js
  appName: "B1AppPwa"        // salvato nella riga del dispositivo, utile per filtrare per superficie
});

// Dopo l'accesso (e dopo ogni variazione di userChurch)
await WebPushHelper.subscribe();
```

Comportamenti che i consumatori ottengono automaticamente:

- **Verifica delle funzionalità** — `isSupported()` restituisce `false` sui browser senza `serviceWorker` / `PushManager` / `Notification`.
- **Intervallo di attesa** — `canPromptNow()` impone un intervallo di 7 giorni tra due richieste tramite `localStorage`, così gli utenti che rifiutano il prompt del sistema operativo non vengono interpellati ad ogni sessione.
- **Disattivazione** — `setOptedOut(true)` e `unsubscribe()` bloccano le nuove richieste ed eliminano la riga del dispositivo lato server.
- **Rilevamento della PWA installata** — `isStandalone()` permette alle app host di subordinare il prompt push su iOS al fatto che "l'utente ha installato la PWA sulla schermata Home" (iOS consente il push solo dalle PWA installate).
- **Ri-registrazione al cambio di chiesa** — `refreshEnrollment()` ripropone l'iscrizione esistente del browser sul nuovo `userChurch` senza chiedere di nuovo all'utente. Chiamalo dal gestore del cambio di `userChurch`.

### Requisito del service worker {#service-worker-requirement}

Il `PushManager` del browser risolve un'iscrizione solo quando nello scope configurato è registrato un service worker. Le PWA di ChurchApps usano [Serwist](https://serwist.dev/) (app Next.js) oppure workbox per generare il service worker. Poiché il server ora tenta sempre il push insieme alla consegna via socket (vedi [Quando parte il push](#when-push-fires)), il service worker è il punto di deduplicazione: il suo gestore `push` deve sopprimere `showNotification` quando un client in primo piano o visibile è già sulla destinazione di deep-link della notifica, ma deve sempre aggiornare il badge dell'app, indipendentemente dal fatto che il banner sia stato mostrato:

```javascript
// public/sw.js (o qualunque cosa emetta Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // viene sempre eseguito, anche se il banner è soppresso

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Stesso pathname; per i messaggi privati, anche stesso conversationId.
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
    if (exact) return exact.focus(); // già sulla destinazione: metti a fuoco, non navigare

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` dipendono dal singolo consumatore -- vedi `B1App/src/app/sw.ts` per l'implementazione di riferimento. B1App instrada `privateMessage` verso `/mobile/messages/:personId`, B1Admin instrada `notification` verso il suo pannello degli avvisi, e così via.

## Note operative

- **Risultati `gone: true`** — `WebPushHelper.sendBulk` restituisce `{ token, success, gone, errorMessage }` per ogni destinatario. Un risultato `gone: true` (il servizio push ha risposto `404` o `410`) significa che l'iscrizione non è più valida in modo permanente; il codice a valle in `NotificationHelper` elimina quelle righe di dispositivo così non vengono più tentate.
- **TTL** — i messaggi push vengono inviati con `TTL: 86400` (24 ore). Se il browser dell'utente non si connette al servizio push entro 24 ore, il push viene scartato.
- **Nessun nuovo tentativo** — un errore transitorio (timeout, 5xx) viene registrato e non ritentato. Il push è best-effort; la durabilità è garantita dal socket in pagina e dal livello di notifica via email.
- **Ambienti disattivati** — gli ambienti di sviluppo possono lasciare vuote le chiavi VAPID; `WebPushHelper.isEnabled()` restituirà `false` e i push verranno saltati. È il comportamento previsto per gli ambienti senza una propria identità VAPID.

## Pagine correlate

- [Architettura delle notifiche](./architecture/notifications.md) -- l'intero imbuto di escalation in-app/push/email e il motore dei promemoria
- [Architettura in tempo reale](./realtime.md) -- consegna via WebSocket; il push ora parte dallo stesso imbuto in-app insieme alla consegna via socket nello stesso passaggio, non solo come ripiego quando una consegna via socket non va a buon fine
- [Endpoint Messaging](./api/endpoints/messaging.md) -- notifiche, dispositivi e il resto della superficie di messaggistica
- [AppHelper](./shared-libraries/app-helper.md) -- il pacchetto npm che distribuisce `WebPushHelper`
