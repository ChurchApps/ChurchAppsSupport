---
title: "Notifiche Web Push"
---

# Notifiche Web Push

<div class="article-intro">

Le applicazioni web di ChurchApps consegnano notifiche push tramite l'API Web Push del W3C — lo stesso meccanismo usato da Firebase Cloud Messaging lato server, ma consegnato tramite il `PushManager` nativo del browser invece che tramite FCM. Un'unica coppia di chiavi VAPID sul MessagingApi copre ogni consumatore (B1Admin, B1App, future PWA).

</div>

## Quando si attiva il push

Il push è un livello all'interno di un unico passaggio di consegna in `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): un gate di preferenza in-app, poi la consegna via socket e il push vengono tentati nello stesso passaggio (ciascuno dietro il proprio gate di preferenza), quindi l'email. Un destinatario che ha silenziato la categoria non raggiunge mai il push. Il successo della consegna via socket non blocca più il push — ogni tipo di notifica ora si comporta come si sono sempre comportati i messaggi privati, quindi una PWA installata in background mostra comunque una notifica a livello di sistema operativo anche quando una consegna via socket è già arrivata; i banner duplicati vengono soppressi lato client dal service worker (vedi [Requisito del service worker](#requisito-del-service-worker)). I promemoria pianificati e le trasmissioni attivate dallo staff partono direttamente al livello push, saltando del tutto il passaggio via socket. L'email resta guidata da timer, escalando le righe non lette secondo il proprio programma anziché come parte di questo passaggio.

I percorsi più comuni che raggiungono il push sono:

1. **Notifiche di contenuto** — una risposta a una conversazione che la persona segue, una menzione, o un altro evento instradato tramite `NotificationHelper.createNotifications()`.
2. **Messaggi privati** — un messaggio diretto passa attraverso la stessa funzione di consegna e tenta sempre il push insieme alla consegna via socket.
3. **Promemoria pianificati** — promemoria di eventi, attività e servizio espansi e distribuiti dal motore di promemoria, che avvia le nuove occorrenze direttamente al livello push.
4. **Push attivati dallo staff** — `POST /messaging/notifications/create`, `/ping` e `/group/send` per trasmissioni singole o di gruppo.

## Flusso lato server

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ gate di preferenza in-app                  ← i destinatari silenziati si fermano qui, nessun push
       ├─ stesso passaggio, entrambi tentati (nessuno dei due blocca l'altro):
       │    ├─ consegna via socket tramite DeliveryHelper  ← saltata per promemoria/trasmissioni (partono direttamente al push)
       │    └─ gate di preferenza push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ libreria web-push → POST firmato VAPID → servizio push del browser
       └─ gate di preferenza email → guidato da timer, escala le righe non lette separatamente
```

### Variabili d'ambiente richieste

Le chiavi VAPID vengono archiviate in `Environment` e devono essere presenti affinché il push sia abilitato:

| Variabile | Descrizione |
|----------|-------------|
| `webPushPublicKey` | Chiave pubblica VAPID (base64url). Restituita ai client tramite `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Chiave privata VAPID. Usata per firmare ogni push in uscita |
| `webPushSubject` | URI `mailto:` segnalato ai servizi push. Predefinito a `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` restituisce `false` quando manca una delle due chiavi — il modulo di messaggistica continua a funzionare, le consegne push semplicemente diventano no-op.

### Generazione di una coppia di chiavi VAPID

```bash
npx web-push generate-vapid-keys
```

Aggiungi l'output al tuo `.env` (locale) o ad AWS SSM Parameter Store (distribuito). Ruotare le chiavi invalida ogni sottoscrizione esistente — i client devono ri-iscriversi al successivo caricamento della pagina.

## Modello di archiviazione

Le sottoscrizioni Web Push sono archiviate nella tabella `devices` esistente insieme ai record dei dispositivi FCM. Sono distinte da un prefisso `webpush:` sulla colonna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Questo permette a una singola chiamata `loadByPersonId` di restituire ogni dispositivo che un utente ha registrato, indipendentemente dalla piattaforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` gestiscono la logica del prefisso.

## Endpoint

Percorso base: `/messaging/webpush`

| Metodo | Percorso | Auth | Descrizione |
|--------|------|------|-------------|
| GET | `/publicKey` | Pubblico | Restituisce `{ publicKey, enabled }`. I client passano `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o effettua l'upsert) una sottoscrizione per l'utente autenticato. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pubblico | Elimina qualsiasi riga di dispositivo il cui `fcmToken` contiene l'endpoint indicato. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una specifica riga di dispositivo tramite il suo id lato server |

## Primitivo client: `WebPushHelper`

`WebPushHelper` di `@churchapps/apphelper` è l'unico punto di ingresso lato client. Gli host lo configurano una volta all'avvio e chiamano `subscribe()` dopo il login.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Nel bootstrap della tua app (ad es. _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // ambito del service worker; corrisponde alla registrazione di sw.js
  appName: "B1AppPwa"        // archiviato sulla riga del dispositivo, utile per filtrare per superficie
});

// Dopo il login (e dopo ogni cambio di userChurch)
await WebPushHelper.subscribe();
```

Comportamenti che i consumatori ottengono gratuitamente:

- **Verifica delle capacità** — `isSupported()` restituisce `false` sui browser senza `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** — `canPromptNow()` applica un periodo di raffreddamento di 7 giorni tra i prompt tramite `localStorage`, così gli utenti che chiudono il prompt del sistema operativo non vengono richiesti a ogni sessione.
- **Opt-out** — `setOptedOut(true)` e `unsubscribe()` bloccano il re-prompt e rimuovono la riga del dispositivo lato server.
- **Rilevamento PWA standalone** — `isStandalone()` permette agli host di condizionare i prompt di push su iOS a "l'utente ha installato la PWA sulla schermata home" (iOS consente il push solo dalle PWA installate).
- **Ri-iscrizione al cambio chiesa** — `refreshEnrollment()` ripubblica la sottoscrizione del browser esistente rispetto al nuovo `userChurch` senza richiedere nuovamente il consenso all'utente. Chiamalo dal gestore di modifica di `userChurch`.

### Requisito del service worker

Il `PushManager` del browser risolve una sottoscrizione solo quando un service worker è registrato nell'ambito configurato. Le PWA di ChurchApps utilizzano [Serwist](https://serwist.dev/) (app Next.js) o workbox per la generazione del service worker. Poiché il server ora tenta sempre il push insieme alla consegna via socket (vedi [Quando si attiva il push](#quando-si-attiva-il-push)), il service worker è il punto di deduplicazione: il suo handler `push` deve sopprimere `showNotification` quando un client focalizzato/visibile è già sul target di deep-link della notifica, ma deve sempre aggiornare il badge dell'app indipendentemente dal fatto che il banner sia stato mostrato:

```javascript
// public/sw.js (o quello che Serwist/workbox genera)
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
    if (exact) return exact.focus(); // già sul target: metti a fuoco, non navigare

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` sono specifici del consumatore — vedi `B1App/src/app/sw.ts` per l'implementazione di riferimento. B1App instrada `privateMessage` a `/mobile/messages/:personId`, B1Admin instrada `notification` al suo pannello di avvisi, ecc.

## Note operative

- **Risultati `gone: true`** — `WebPushHelper.sendBulk` restituisce `{ token, success, gone, errorMessage }` per destinatario. Un risultato `gone: true` (il servizio push ha risposto `404` o `410`) significa che la sottoscrizione è permanentemente non valida; il codice a valle in `NotificationHelper` elimina quelle righe di dispositivo così da non essere riprovate di nuovo.
- **TTL** — i messaggi push vengono inviati con `TTL: 86400` (24 ore). Se il browser dell'utente non si connette al servizio push entro 24 ore, il push viene scartato.
- **Nessun retry** — un fallimento transitorio (timeout, 5xx) viene registrato e non riprovato. Il push è best-effort; il socket in pagina e il livello di notifica email gestiscono la storia della durabilità.
- **Ambienti disabilitati** — gli ambienti di staging e dev possono lasciare vuote le chiavi VAPID; `WebPushHelper.isEnabled()` restituirà `false` e i push andranno in short-circuit. Questo è il comportamento previsto per gli ambienti senza una propria identità VAPID.

## Pagine Correlate

- [Architettura delle Notifiche](./architecture/notifications) -- L'intero imbuto di escalation in-app/push/email e il motore di promemoria
- [Architettura in Tempo Reale](./realtime) -- Consegna WebSocket; il push ora si attiva dallo stesso imbuto in-app insieme alla consegna via socket nello stesso passaggio, non solo come fallback quando una consegna via socket non arriva
- [Endpoint di Messaggistica](./api/endpoints/messaging) -- Notifiche, dispositivi e il resto della superficie di messaggistica
- [AppHelper](./shared-libraries/app-helper) -- Il pacchetto npm che fornisce `WebPushHelper`
