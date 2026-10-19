---
title: "Notifiche push web"
---

# Notifiche push web

<div class="article-intro">

Le web app di ChurchApps inviano notifiche push tramite la Web Push API del W3C — lo stesso meccanismo usato lato server da Firebase Cloud Messaging, ma consegnato tramite il `PushManager` nativo del browser invece che tramite FCM. Una singola coppia di chiavi VAPID sul MessagingApi copre tutti i consumer (B1Admin, B1App, future PWA).

</div>

## Quando parte la push {#when-push-fires}

La push è un livello di un unico processo di consegna all'interno di `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): prima un controllo delle preferenze in-app, poi la consegna via socket e la push tentate nello stesso passaggio (ciascuna dietro il proprio controllo delle preferenze), infine l'email. Un destinatario che ha silenziato la categoria non raggiunge mai la push. Il successo della consegna via socket non blocca più la push — ogni tipo di notifica ora si comporta come hanno sempre fatto i messaggi privati, quindi una PWA installata in background mostra comunque una notifica a livello di sistema anche quando la consegna via socket è già andata a buon fine; i banner duplicati vengono soppressi lato client dal service worker (vedi [Requisito del service worker](#service-worker-requirement)). Le promemoria programmate e le trasmissioni avviate dallo staff partono direttamente dal livello push, saltando completamente il passaggio via socket. L'email resta guidata da un timer, che fa salire di livello le righe non lette secondo la propria pianificazione, anziché far parte di questo passaggio.

I percorsi più comuni che arrivano alla push:

1. **Notifiche di contenuto** — una risposta a una conversazione che la persona segue, una menzione o un altro evento instradato tramite `NotificationHelper.createNotifications()`.
2. **Messaggi privati** — un messaggio diretto passa dalla stessa funzione di consegna e tenta sempre la push insieme alla consegna via socket.
3. **Promemoria programmati** — promemoria di eventi, attività e servizi espansi e inviati dal motore dei promemoria, che avvia direttamente le nuove occorrenze al livello push.
4. **Push avviate dallo staff** — `POST /messaging/notifications/create`, `/ping` e `/group/send` per trasmissioni singole o di gruppo.

## Flusso lato server

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

### Variabili d'ambiente richieste

Le chiavi VAPID sono memorizzate in `Environment` e devono essere presenti perché la push sia abilitata:

| Variabile | Descrizione |
|----------|-------------|
| `webPushPublicKey` | Chiave pubblica VAPID (base64url). Restituita ai client tramite `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Chiave privata VAPID. Usata per firmare ogni push in uscita |
| `webPushSubject` | URI `mailto:` riportato ai servizi push. Il valore predefinito è `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` restituisce `false` quando manca una delle due chiavi — il modulo di messaggistica continua a funzionare, semplicemente le consegne push non vengono eseguite.

### Generazione di una coppia di chiavi VAPID

```bash
npx web-push generate-vapid-keys
```

Aggiungi l'output al tuo `.env` (in locale) oppure al Parameter Store di AWS SSM (in produzione). Rigenerare le chiavi invalida tutte le sottoscrizioni esistenti — i client devono registrarsi di nuovo al caricamento successivo della pagina.

## Modello di archiviazione

Le sottoscrizioni Web Push sono memorizzate nella tabella `devices` esistente, insieme ai record dei dispositivi FCM. Si distinguono per un prefisso `webpush:` nella colonna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Questo permette a una singola chiamata `loadByPersonId` di restituire tutti i dispositivi registrati da un utente, indipendentemente dalla piattaforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` gestiscono la logica del prefisso.

## Endpoint

Percorso base: `/messaging/webpush`

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|----------|----------------|-------------|
| GET | `/publicKey` | Pubblico | Restituisce `{ publicKey, enabled }`. I client passano `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o aggiorna) una sottoscrizione per l'utente autenticato. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pubblico | Elimina qualsiasi riga di dispositivo il cui `fcmToken` contiene l'endpoint indicato. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una specifica riga di dispositivo tramite il suo ID lato server |

## Primitiva lato client: `WebPushHelper`

Il `WebPushHelper` di `@churchapps/apphelper` è l'unico punto di accesso lato client. Gli host lo configurano una volta all'avvio e chiamano `subscribe()` dopo il login.

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

Comportamenti che i consumer ottengono automaticamente:

- **Verifica delle funzionalità** — `isSupported()` restituisce `false` sui browser privi di `serviceWorker` / `PushManager` / `Notification`.
- **Intervallo di attesa** — `canPromptNow()` impone un intervallo di 7 giorni tra una richiesta e l'altra tramite `localStorage`, così chi ha chiuso la richiesta del sistema operativo non viene interrogato a ogni sessione.
- **Disattivazione** — `setOptedOut(true)` e `unsubscribe()` impediscono nuove richieste e rimuovono la riga del dispositivo lato server.
- **Rilevamento della PWA in modalità standalone** — `isStandalone()` permette agli host di subordinare le richieste push su iOS al fatto che l'utente abbia installato la PWA nella schermata Home (su iOS la push è consentita solo dalle PWA installate).
- **Ri-registrazione al cambio di chiesa** — `refreshEnrollment()` ripubblica la sottoscrizione esistente del browser sul nuovo `userChurch` senza richiedere di nuovo il permesso all'utente. Chiamalo dal gestore del cambio di `userChurch`.

### Requisito del service worker {#service-worker-requirement}

Il `PushManager` del browser risolve una sottoscrizione solo quando un service worker è registrato all'ambito configurato. Le PWA di ChurchApps usano [Serwist](https://serwist.dev/) (app Next.js) oppure workbox per generare il service worker. Poiché il server ora tenta sempre la push insieme alla consegna via socket (vedi [Quando parte la push](#when-push-fires)), il service worker è il punto di deduplicazione: il suo gestore `push` deve sopprimere `showNotification` quando un client in primo piano o visibile è già sulla destinazione di deep link della notifica, ma deve sempre aggiornare il badge dell'app, indipendentemente dal fatto che il banner sia stato mostrato o meno:

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

`deepLinkFor` / `clientMatchesTarget` dipendono dal singolo consumer — vedi `B1App/src/app/sw.ts` per l'implementazione di riferimento. B1App instrada `privateMessage` verso `/mobile/messages/:personId`, B1Admin instrada `notification` verso il pannello degli avvisi, e così via.

## Note operative

- **Risultati `gone: true`** — `WebPushHelper.sendBulk` restituisce `{ token, success, gone, errorMessage }` per ogni destinatario. Un risultato `gone: true` (il servizio push ha risposto `404` o `410`) significa che la sottoscrizione non è più valida in modo permanente; il codice a valle in `NotificationHelper` elimina queste righe di dispositivo perché non vengano più tentate.
- **TTL** — i messaggi push vengono inviati con `TTL: 86400` (24 ore). Se il browser dell'utente non si connette al servizio push entro 24 ore, la push viene scartata.
- **Nessun nuovo tentativo** — un errore transitorio (timeout, 5xx) viene registrato e non ritentato. La push è una consegna del tipo «al meglio»: la durata della consegna è garantita dal socket nella pagina e dal livello email.
- **Ambienti disabilitati** — gli ambienti di sviluppo possono lasciare vuote le chiavi VAPID; `WebPushHelper.isEnabled()` restituirà `false` e le push verranno scartate subito. È il comportamento previsto per gli ambienti senza una propria identità VAPID.

## Pagine correlate

- [Architettura delle notifiche](./architecture/notifications) -- L'intero imbuto di escalation in-app/push/email e il motore dei promemoria
- [Architettura in tempo reale](./realtime) -- consegna via WebSocket; la push ora parte dallo stesso imbuto in-app insieme alla consegna via socket nello stesso passaggio, non solo come ripiego quando una consegna via socket non va a buon fine
- [Endpoint di messaggistica](./api/endpoints/messaging) -- Notifiche, dispositivi e il resto della superficie di messaggistica
- [AppHelper](./shared-libraries/app-helper) -- Il pacchetto npm che distribuisce `WebPushHelper`
