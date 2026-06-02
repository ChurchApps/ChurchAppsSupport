---
title: "Notifiche web push"
---

# Notifiche web push

<div class="article-intro">

Le app web di ChurchApps forniscono notifiche push tramite l'API Web Push W3C — lo stesso meccanismo utilizzato da Firebase Cloud Messaging lato server, ma consegnato tramite il `PushManager` nativo del browser invece di FCM. Una singola coppia di chiavi VAPID sul MessagingApi copre ogni consumatore (B1Admin, B1App, future PWA).

</div>

## Quando il push si attiva

Il MessagingApi fornisce un messaggio Web Push in tre situazioni, tutte instradate attraverso `Api/src/modules/messaging/helpers/NotificationHelper.ts`:

1. **Notifiche di gruppo / contenuto** — qualcuno risponde a un thread che l'utente segue o è menzionato in.
2. **Messaggi privati** — `POST /messaging/privatemessages` attiva un push ai dispositivi iscritti del destinatario.
3. **Notifiche generiche** — chiamate dirette a `POST /messaging/notifications/create` o `/ping`.

Push è il **tier del last-resort** nella scala di escalation di `NotificationHelper`. Se un destinatario ha una connessione WebSocket attiva nella stanza rilevante (vedi [Architettura in tempo reale](./realtime)), riceve il messaggio in-app e il push viene soppresso per quella consegna. Push si attiva solo quando l'utente è offline o non è stato visto di recente.

## Flusso lato server

```
NotificationHelper.checkShouldNotify(...)
  │
  ├─ consegna socket in-page tramite DeliveryHelper  ← preferito
  │
  └─ NotificationHelper.<sendXxx>(...)
       └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
            └─ libreria web-push → POST firmato VAPID → servizio push del browser
```

### Variabili di ambiente richieste

Le chiavi VAPID vengono archiviate in `Environment` e devono essere presenti affinché il push sia abilitato:

| Variabile | Descrizione |
|----------|-------------|
| `webPushPublicKey` | Chiave pubblica VAPID (base64url). Restituita ai client tramite `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Chiave privata VAPID. Utilizzata per firmare ogni push in uscita |
| `webPushSubject` | URI `mailto:` segnalato ai servizi push. Impostazione predefinita `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` restituisce `false` quando manca una chiave — il modulo di messaggistica continua a funzionare, le consegne push semplicemente no-op.

### Generazione di una coppia di chiavi VAPID

```bash
npx web-push generate-vapid-keys
```

Aggiungi l'output al tuo `.env` (locale) o AWS SSM Parameter Store (distribuito). La rotazione delle chiavi invalida ogni sottoscrizione esistente — i client devono ri-iscriversi al caricamento della pagina successiva.

## Modello di archiviazione

Le sottoscrizioni web push vengono archiviate nella tabella `devices` esistente insieme ai record del dispositivo FCM. Si distinguono per un prefisso `webpush:` sulla colonna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Questo consente a una singola chiamata `loadByPersonId` di restituire ogni dispositivo a cui un utente si è iscritto, indipendentemente dalla piattaforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` gestiscono la logica del prefisso.

## Endpoint

Percorso base: `/messaging/webpush`

| Metodo | Percorso | Auth | Descrizione |
|--------|------|------|-------------|
| GET | `/publicKey` | Pubblico | Restituisce `{ publicKey, enabled }`. I client passano `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o upsert) una sottoscrizione per l'utente autenticato. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pubblico | Elimina qualsiasi riga di dispositivo il cui `fcmToken` contiene l'endpoint dato. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una specifica riga di dispositivo per il suo id lato server |

## Primitivo client: `WebPushHelper`

Il `WebPushHelper` di `@churchapps/apphelper` è il singolo punto di ingresso lato client. Gli host lo configurano una volta all'avvio e chiamano `subscribe()` dopo il login.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Nel bootstrap della tua app (ad es. _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // ambito del service worker; corrisponde alla registrazione sw.js
  appName: "B1AppPwa"        // archiviato sulla riga del dispositivo, utile per filtrare per superficie
});

// Dopo il login (e dopo ogni cambio userChurch)
await WebPushHelper.subscribe();
```

I comportamenti che i consumatori ottengono gratuitamente:

- **Verifica della capacità** — `isSupported()` restituisce `false` nei browser senza `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** — `canPromptNow()` applica un periodo di raffreddamento di 7 giorni tra i prompt tramite `localStorage` in modo che gli utenti che rifiutano il prompt del SO non vengano chiesti ad ogni sessione.
- **Opt-out** — `setOptedOut(true)` e `unsubscribe()` bloccano la riprompting e rimuovono la riga del dispositivo lato server.
- **Rilevamento PWA autonomo** — `isStandalone()` consente agli host di gate i prompt di push iOS dietro "l'utente ha installato il PWA nella schermata iniziale" (iOS consente il push solo dai PWA installati).
- **Ri-iscrizione al cambio di chiesa** — `refreshEnrollment()` ripubblica la sottoscrizione del browser esistente rispetto al nuovo `userChurch` senza ripromptare l'utente. Chiamalo dal gestore di modifica `userChurch`.

### Requisito del service worker

Il `PushManager` del browser risolve una sottoscrizione solo quando un service worker è registrato nell'ambito configurato. I PWA di ChurchApps utilizzano [Serwist](https://serwist.dev/) (app Next.js) o workbox per la generazione del service worker. Il service worker deve includere un gestore dell'evento `push` che chiama `self.registration.showNotification(title, options)` per renderizzare la notifica a livello del SO quando il push arriva:

```javascript
// public/sw.js (o quello che Serwist/workbox emette)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body,
    data: { type: data.type, contentId: data.contentId },
    icon: "/icons/icon-192.png"
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { type, contentId } = event.notification.data || {};
  event.waitUntil(self.clients.openWindow(deepLinkFor(type, contentId)));
});
```

`deepLinkFor` è specifico del consumatore — B1App instrada `privateMessage` a `/mobile/messages/:id`, B1Admin instrada `notification` al suo pannello di avvisi, ecc.

## Note operative

- **Risultati `gone: true`** — `WebPushHelper.sendBulk` restituisce `{ token, success, gone, errorMessage }` per destinatario. Un risultato `gone: true` (il servizio push ha risposto `404` o `410`) significa che la sottoscrizione è permanentemente non valida; il codice a valle in `NotificationHelper` elimina quelle righe di dispositivo in modo da non essere riprovate di nuovo.
- **TTL** — i messaggi push vengono inviati con `TTL: 86400` (24 ore). Se il browser dell'utente non si connette al servizio push entro 24 ore, il push viene eliminato.
- **Nessun retry** — un errore transitorio (timeout, 5xx) viene registrato e non riprovato. Push è best-effort; il socket in-page e il tier di notifica email gestiscono la storia della durabilità.
- **Ambienti disabilitati** — gli ambienti di staging e dev possono lasciare le chiavi VAPID vuote; `WebPushHelper.isEnabled()` restituirà `false` e i push short-circuit. Questo è il comportamento previsto per gli ambienti senza la loro identità VAPID.

## Pagine correlate

- [Real-time Architecture](./realtime) -- Consegna WebSocket; il push è il fallback offline per le stesse notifiche
- [Messaging Endpoints](./api/endpoints/messaging) -- Notifiche, dispositivi e il resto della superficie di messaggistica
- [AppHelper](./shared-libraries/app-helper) -- Il pacchetto npm che fornisce `WebPushHelper`
