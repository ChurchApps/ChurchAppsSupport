---
title: "Notifiche push web"
description: "Configura le chiavi VAPID, il client WebPushHelper e la gestione del service worker, così B1.church e B1 Admin possono inviare notifiche push del browser ai membri."
---

# Notifiche push web

<div class="article-intro">

Le app web di ChurchApps inviano notifiche push tramite la Web Push API del W3C -- lo stesso meccanismo che Firebase Cloud Messaging usa lato server, ma consegnato tramite il `PushManager` nativo del browser invece che tramite FCM. Una singola coppia di chiavi VAPID sul MessagingApi copre tutti i consumatori (B1Admin, B1App, le future PWA).

</div>

## Quando parte la push {#when-push-fires}

La push è un livello di un'unica passata di consegna dentro `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): prima un controllo delle preferenze in-app, poi la consegna via socket e la push tentate nella stessa passata (ciascuna dietro il proprio controllo delle preferenze), poi l'email. Un destinatario che ha silenziato la categoria non raggiunge mai la push. Una consegna via socket riuscita non blocca più la push -- ogni tipo di notifica ora si comporta come i messaggi privati hanno sempre fatto, quindi una PWA installata in background mostra comunque una notifica a livello di sistema operativo anche quando una consegna via socket è già andata a buon fine; i banner doppi vengono soppressi lato client dal service worker (vedi [Requisito del service worker](#service-worker-requirement)). I promemoria programmati e le comunicazioni avviate dallo staff partono direttamente dal livello push, saltando del tutto il passo socket. L'email resta guidata dal timer, e fa salire di livello le righe non lette secondo la propria pianificazione invece di farlo come parte di questa passata.

I percorsi più comuni che arrivano alla push:

1. **Notifiche di contenuto** -- una risposta a una conversazione seguita dalla persona, una menzione o un altro evento instradato tramite `NotificationHelper.createNotifications()`.
2. **Messaggi privati** -- un messaggio diretto passa dalla stessa funzione di consegna e tenta sempre la push insieme alla consegna via socket.
3. **Promemoria programmati** -- promemoria per eventi, attività e servizi, espansi e inviati dal motore dei promemoria, che avvia le nuove occorrenze direttamente al livello push.
4. **Push avviate dallo staff** -- `POST /messaging/notifications/create`, `/ping` e `/group/send` per comunicazioni una tantum o di gruppo.
5. **Push programmate dallo staff** -- `POST /messaging/scheduledNotifications` salva una push per tutti quelli con l'app (`audience: "church"`) oppure per un gruppo, e il timer di 1 minuto la invia alla scadenza (vedi [Architettura delle notifiche](./architecture/notifications.md)). Una push a tutta la chiesa senza link apre `/mobile/notifications`; una push di gruppo senza link apre quel gruppo.

## Flusso lato server {#server-flow}

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ controllo preferenze in-app                  ← i destinatari silenziati si fermano qui, senza push
       ├─ stessa passata, entrambe tentate (nessuna blocca l'altra):
       │    ├─ consegna via socket tramite DeliveryHelper  ← saltata per promemoria/comunicazioni (partono dalla push)
       │    └─ controllo preferenze push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ libreria web-push → POST firmato VAPID → servizio push del browser
       └─ controllo preferenze email → guidato dal timer, fa salire di livello le righe non lette separatamente
```

### Variabili d'ambiente richieste {#required-environment-variables}

Le chiavi VAPID sono memorizzate in `Environment` e devono essere presenti perché la push sia abilitata:

| Variabile d'ambiente | Impostazione di `Environment` | Descrizione |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Chiave pubblica VAPID (base64url). Restituita ai client tramite `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Chiave privata VAPID. Usata per firmare ogni push in uscita |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` comunicato ai servizi push. Predefinito `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` restituisce `false` quando manca una delle due chiavi -- il modulo messaging continua a funzionare, le consegne push semplicemente non vengono eseguite. Il sito mobile di B1App informa quindi i membri che le push non sono attive, invece di proporre la configurazione.

### Generare una coppia di chiavi VAPID {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Aggiungi l'output al tuo `.env` (in locale) oppure all'AWS SSM Parameter Store (in produzione). Ruotare le chiavi invalida ogni sottoscrizione esistente -- i client devono registrarsi di nuovo al caricamento successivo della pagina.

## Modello di archiviazione {#storage-model}

Le sottoscrizioni Web Push sono memorizzate nella tabella `devices` esistente, accanto ai record dei dispositivi FCM. Si distinguono per un prefisso `webpush:` nella colonna `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Questo permette a una singola chiamata `loadByPersonId` di restituire ogni dispositivo registrato da un utente, indipendentemente dalla piattaforma. `WebPushHelper.isWebPushToken(token)` e `decodeSubscription(token)` gestiscono la logica del prefisso.

## Endpoint {#endpoints}

Percorso base: `/messaging/webpush`

| Metodo | Percorso | Autenticazione | Descrizione |
|--------|------|------|-------------|
| GET | `/publicKey` | Pubblico | Restituisce `{ publicKey, enabled }`. I client passano `publicKey` a `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registra (o aggiorna) una sottoscrizione per l'utente autenticato. Corpo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Pubblico | Elimina ogni riga di dispositivo il cui `fcmToken` contiene l'endpoint indicato. Corpo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Elimina una specifica riga di dispositivo tramite il suo ID lato server |

## Primitiva lato client: `WebPushHelper` {#client-primitive-webpushhelper}

Il `WebPushHelper` di `@churchapps/apphelper` è l'unico punto di ingresso lato client. Gli host lo configurano una volta all'avvio e chiamano `subscribe()` dopo l'accesso.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Nel bootstrap dell'app (ad esempio _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // ambito del service worker; corrisponde alla registrazione di sw.js
  appName: "B1AppPwa"        // salvato nella riga del dispositivo, utile per filtrare per superficie
});

// Dopo l'accesso (e dopo ogni modifica di userChurch)
await WebPushHelper.subscribe();
```

Comportamenti che i consumatori ottengono gratuitamente:

- **Verifica delle funzionalità** -- `isSupported()` restituisce `false` sui browser senza `serviceWorker` / `PushManager` / `Notification`.
- **Intervallo di attesa** -- `canPromptNow()` impone un intervallo di 7 giorni tra una richiesta e l'altra tramite `localStorage`, così gli utenti che chiudono il prompt del sistema operativo non vengono interpellati a ogni sessione.
- **Disattivazione** -- `setOptedOut(true)` e `unsubscribe()` bloccano le nuove richieste e rimuovono la riga del dispositivo lato server.
- **Rilevamento della PWA in modalità standalone** -- `isStandalone()` permette agli host di subordinare le richieste push su iOS al fatto che l'utente abbia installato la PWA nella schermata Home (su iOS le push sono consentite solo dalle PWA installate).
- **Ri-registrazione al cambio di chiesa** -- `refreshEnrollment()` ripropone la sottoscrizione esistente del browser sul nuovo `userChurch` senza richiedere di nuovo il consenso all'utente. Chiamalo dal gestore del cambio di `userChurch`.

### Requisito del service worker {#service-worker-requirement}

La `PushManager` del browser risolve una sottoscrizione solo quando un service worker è registrato nell'ambito configurato. Le PWA di ChurchApps usano [Serwist](https://serwist.dev/) (app Next.js) oppure workbox per generare il service worker. Poiché il server ora tenta sempre la push insieme alla consegna via socket (vedi [Quando parte la push](#when-push-fires)), il service worker è il punto di deduplicazione: il suo gestore `push` deve sopprimere `showNotification` quando un client in primo piano o visibile si trova già sulla destinazione di deep link della notifica, ma deve sempre aggiornare il badge dell'app, indipendentemente dal fatto che il banner sia stato mostrato:

```javascript
// public/sw.js (o qualunque cosa generi Serwist/workbox)
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
    if (exact) return exact.focus(); // già sulla destinazione: metti a fuoco, senza navigare

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

## Note operative {#operational-notes}

- **Risultati `gone: true`** -- `WebPushHelper.sendBulk` restituisce `{ token, success, gone, errorMessage }` per ogni destinatario. Un risultato `gone: true` (il servizio push ha risposto `404` o `410`) significa che la sottoscrizione non è più valida in modo permanente; il codice a valle in `NotificationHelper` elimina quelle righe di dispositivo, così non vengono più tentate.
- **TTL** -- i messaggi push vengono inviati con `TTL: 86400` (24 ore). Se il browser dell'utente non si collega al servizio push entro 24 ore, la push viene scartata.
- **Nessun nuovo tentativo** -- un errore transitorio (timeout, 5xx) viene registrato e non ritentato. La push è a "best effort": la durabilità è garantita dal socket nella pagina e dal livello di notifica via email.
- **Ambienti disabilitati** -- gli ambienti di sviluppo possono lasciare vuote le chiavi VAPID; `WebPushHelper.isEnabled()` restituirà `false` e le push verranno scartate subito. È il comportamento previsto per gli ambienti senza una propria identità VAPID.

## Pagine correlate {#related-pages}

- [Architettura delle notifiche](./architecture/notifications.md) -- l'intero imbuto di escalation in-app/push/email e il motore dei promemoria
- [Architettura in tempo reale](./realtime.md) -- consegna via WebSocket; la push ora parte dallo stesso imbuto in-app insieme alla consegna via socket, nella stessa passata, e non solo come ripiego quando una consegna via socket non va a buon fine
- [Endpoint di messaggistica](./api/endpoints/messaging.md) -- notifiche, dispositivi e il resto della superficie di messaggistica
- [AppHelper](./shared-libraries/app-helper.md) -- il pacchetto npm che distribuisce `WebPushHelper`
