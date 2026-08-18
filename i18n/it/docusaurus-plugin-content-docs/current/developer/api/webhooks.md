---
title: "Webhook"
---

# Webhook

<div class="article-intro">

I webhook permettono a una chiesa di inviare notifiche in tempo reale a strumenti di terze parti — piattaforme di automazione (Zapier, Make, n8n), CRM, sistemi di contabilità, o qualsiasi cosa che accetti un POST HTTP. Quando una persona, un gruppo o un nucleo familiare cambia in B1, B1 invia un payload JSON firmato a ogni URL sottoscritto a quell'evento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni Chiesa** registra e gestisce i webhook
- Il tuo endpoint di ricezione deve essere raggiungibile su **HTTPS** a un indirizzo pubblico
- Avere un modo per memorizzare il segreto di firma in modo sicuro — è mostrato solo una volta

</div>

## Panoramica

I webhook sono **solo in uscita**: B1 chiama il tuo endpoint, tu non chiami B1. Ogni webhook è una sottoscrizione per chiesa consistente di un URL di destinazione, un segreto di firma e un elenco di eventi sottoscritti.

La consegna utilizza una **posta in uscita durevole**: quando si verifica un evento sottoscritto, B1 registra una riga di consegna e un worker in background POST la invia entro circa un minuto. Le consegne non riuscite vengono ritentate con backoff esponenziale. Nulla viene perso se una consegna è lenta o il tuo endpoint è brevemente inattivo.

## Registrazione di un webhook

### In B1Admin

Vai a **Impostazioni → Sviluppatore → Webhook → Nuovo webhook**. Inserisci un nome, l'URL del payload e seleziona gli eventi a cui sottoscriversi. Al salvataggio, il **segreto di firma viene visualizzato una volta** — copialo immediatamente e memorizzalo con il tuo integrazione. Non viene mai più visualizzato (puoi ruotarlo in seguito, ma non puoi recuperare l'originale).

### Via l'API

Tutti gli endpoint sono nel percorso base del modulo di iscrizione `/membership/webhooks` e richiedono un JWT da un amministratore della chiesa con il permesso `Settings / Edit`, **o una [chiave API](./api-keys) coniata con lo scope `settings:write`**. Gli stessi percorsi accettano entrambi. Questo è ciò che consente a Zapier e Make di registrare webhook per conto della chiesa quando uno Zap o uno scenario viene attivato.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

La risposta di creazione — e **solo** la risposta di creazione — include il `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Metodo e percorso | Scopo |
|---|---|
| `GET /membership/webhooks` | Elenca i webhook della chiesa (segreto omesso) |
| `GET /membership/webhooks/events` | Il catalogo dei nomi di eventi validi |
| `GET /membership/webhooks/:id` | Carica un webhook |
| `POST /membership/webhooks` | Crea (no `id`) o aggiorna (con `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Ruota il segreto di firma; restituisce il nuovo valore una volta |
| `DELETE /membership/webhooks/:id` | Elimina un webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentativi di consegna recenti per un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload e risposta completi per una consegna |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Rimetti in coda una consegna |

## Catalogo degli eventi

I nomi degli eventi seguono il modello `{entity}.{action}`. Recupera l'elenco live da `GET /membership/webhooks/events`.

| Evento | Si attiva quando |
|---|---|
| `person.created` | Una persona viene aggiunta |
| `person.updated` | Un record di persona viene modificato |
| `person.destroyed` | Una persona viene eliminata |
| `household.created` | Un nucleo familiare viene aggiunto |
| `household.updated` | Un nucleo familiare viene modificato |
| `household.destroyed` | Un nucleo familiare viene eliminato |
| `group.created` | Un gruppo viene aggiunto |
| `group.updated` | Un gruppo viene modificato |
| `group.destroyed` | Un gruppo viene eliminato |
| `group.member.added` | Una persona viene aggiunta a un gruppo |
| `group.member.removed` | Una persona viene rimossa da un gruppo |
| `donation.created` | Un regalo viene registrato — inserimento manuale, online o la transizione da in sospeso a completato |
| `donation.updated` | Un record di donazione viene modificato |
| `attendance.recorded` | Una visita viene registrata (inserimento manuale o check-in) |
| `session.created` | Una nuova sessione di partecipazione viene creata (manualmente o automaticamente al primo check-in) |
| `form.submission.created` | Un modulo viene inviato |
| `event.created` | Un evento di calendario viene aggiunto |
| `event.updated` | Un evento di calendario viene modificato |
| `event.destroyed` | Un evento di calendario viene eliminato |

## Formato del payload

Ogni consegna è un `POST` HTTP con un corpo JSON e questi intestazioni:

| Intestazione | Descrizione |
|---|---|
| `Content-Type` | Sempre `application/json` |
| `X-B1-Event` | Il nome dell'evento, ad es. `person.created` |
| `X-B1-Delivery-Id` | ID univoco per questo tentativo di consegna — usalo per deduplicare |
| `X-B1-Signature` | Firma HMAC-SHA256 del corpo grezzo (vedi sotto) |
| `X-B1-Timestamp` | Secondi Unix epoch quando la richiesta è stata inviata |
| `User-Agent` | `B1-Webhooks/1.0` |

Il corpo avvolge la risorsa modificata in un piccolo involucro:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

Per gli eventi `*.destroyed`, `data` contiene solo l'`id` e il `churchId` del record eliminato.

Gli eventi i cui payload fanno riferimento ad altri record per id portano anche nomi leggibili dall'uomo, risolti al momento della consegna: `personName` e `groupName` sugli eventi di iscrizione ai gruppi, `personName` su partecipazione, donazione e eventi di iscrizione alle liste, `groupName` su `session.created`, e `formName` (più `personName` quando l'invio è legato a una persona) su `form.submission.created`.

## Tipi di connettore

Il formato di consegna predefinito è l'involucro JSON sopra — `connectorType: "standard"`. Per [Slack e Discord](/docs/b1-admin/integrations/slack-discord) lo stesso motore webhook pubblica invece un messaggio a forma di chat che questi servizi accettano direttamente:

| `connectorType` | Corpo inviato | Usa quando |
|---|---|---|
| `"standard"` (predefinito) | `{event, churchId, occurredAt, data}` involucro, firmato | Stai scrivendo il tuo integrazione, o indicando a Zapier / Make / un server personalizzato |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Stai inviando direttamente a un URL Incoming Webhook Slack |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Stai inviando direttamente a un webhook del canale Discord |
| `"mailchimp"` | n/a — il connettore chiama l'API di Mailchimp stesso | Desideri [sincronizzazione del pubblico](/docs/b1-admin/integrations/services/mailchimp) senza URL da ospitare |

Il tipo di connettore è impostato nell'elenco a discesa **Tipo di connettore** nell'editor webhook, o tramite `connectorType` nel corpo `POST /membership/webhooks`. L'intestazione `X-B1-Signature` firmata è ancora inviata per consegne Slack/Discord (le ignorano innocuamente), quindi passare un webhook di nuovo a `standard` in seguito non richiede una nuova firma.

Slack e Discord sono pure modifiche del corpo — il motore POST ancora all'URL fornito dalla chiesa. `mailchimp` è il primo connettore che invece possiede il suo scambio HTTP: per evento emette richieste upsert/archive/tag autenticate contro l'API di Mailchimp (`MailchimpConnector.deliver`), e le sue credenziali (`{apiKey, audienceId}`) sono archiviate crittografate AES in `webhooks.connectorConfig`, scritte solo attraverso l'API. I webhook Mailchimp accettano solo persone, membri di gruppi e eventi di iscrizione alle liste; la rotta di salvataggio verifica la chiave e il pubblico rispetto a Mailchimp prima di accettare. Le righe di consegna memorizzano l'involucro standard, in modo che il registro di consegna mostri ciò che B1 ha visto insieme alla risposta di Mailchimp. Le situazioni non mappate (persona senza email, evento senza mapping) si completano come riuscite con un corpo di risposta `Skipped:` piuttosto che bruciare riprovazioni.

## Consegne di prova

Ogni editor webhook ha un pulsante **Invia evento di prova** — la chiamata API corrispondente è `POST /membership/webhooks/:id/test`. La rotta di prova crea un payload sintetico per il primo evento sottoscritto, lo invia sincronamente attraverso il percorso di consegna firmato reale (e attraverso `formatForConnector` per Slack/Discord), e restituisce la riga di consegna risultante incluso `responseStatus` e `responseBody`. Usalo per confermare la connettività e la gestione della firma prima di attivare l'integrazione per il reale. Per i webhook `mailchimp` la prova verifica invece le credenziali memorizzate rispetto all'API di Mailchimp (un evento sintetico scriverebbe un abbonato falso nel pubblico reale della chiesa) e restituisce un risultato a forma di consegna senza creare una riga.

## Verifica delle firme

Verifica sempre `X-B1-Signature` prima di fidati di un payload. La firma è `sha256=` seguito da l'esadecimale HMAC-SHA256 del **corpo della richiesta grezzo** codificato con il tuo segreto di firma. Calcolalo sui byte che hai ricevuto — non riseriallizzare l'JSON analizzato.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Rifiuta qualsiasi richiesta la cui firma non corrisponde. Opzionalmente anche rifiuta le richieste il cui `X-B1-Timestamp` è più di pochi minuti fa per limitare le finestre di riproduzione.

## Supporto SDK

Per Node.js, `@churchapps/integration-sdk` spedisce un verificatore tipizzato e un middleware Express che gestisce la cattura del corpo grezzo, il controllo della firma e l'analisi dell'involucro per te:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Cattura il corpo grezzo prima dell'analisi JSON — necessario in modo che la firma si verifichi ancora.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

L'SDK espone anche `WebhookVerifier.verify(secret, rawBody, signatureHeader)` per runtime non-Express (funzioni serverless, Fastify, ecc.). Vedi il pacchetto su npm.

## Consegna e riprovazioni

Il tuo endpoint deve rispondere con uno stato `2xx` il più rapidamente possibile — idealmente dopo solo aver messo in coda il lavoro, non dopo averlo elaborato. Qualsiasi risposta non-`2xx`, un guasto di connessione, o una risposta più lenta di **10 secondi** conta come una consegna fallita.

Le consegne non riuscite vengono ritentate con backoff esponenziale — **16 tentativi in circa 5 giorni**. L'intervallo cresce da 1 minuto, attraverso ore, fino a gap di 3 giorni per i tentativi finali. Dopo il 16º tentativo fallito la consegna è marcata `exhausted` e abbandonata.

La consegna è **almeno una volta**: una consegna può arrivare più di una volta (ad esempio, se il tuo endpoint ha successo ma la risposta viene persa). Usa l'intestazione `X-B1-Delivery-Id` per deduplicare — elabora ogni id solo una volta e tratta le ripetizioni come non-op.

### Disabilitazione automatica

Se un webhook produce **tre consegne esaurite consecutive**, B1 la disabilita automaticamente. Correggi il tuo endpoint, quindi riabilita il webhook in B1Admin (o tramite `POST /membership/webhooks` con `"active": true`).

## Ispezione e riconsegna

L'editor webhook in B1Admin mostra una tabella **Consegne recenti** — evento, stato, conteggio dei tentativi, codice di risposta e timestamp. Selezionare una riga rivela il payload completo che è stato inviato e la risposta che è tornata.

Usa **Riconsegna** per rimettere in coda qualsiasi consegna passata con il suo payload originale — utile dopo aver corretto un bug nel tuo endpoint, o per riempire gli eventi che il tuo endpoint ha perso mentre era inattivo.

## Requisiti dell'URL

Poiché gli URL webhook sono forniti dalla chiesa, B1 applica protezioni contro la falsificazione di richieste lato server. Un URL webhook viene rifiutato — al momento della registrazione e controllato di nuovo prima di ogni consegna — se:

- non usa **`https`**
- punta a `localhost`, un nome host `.local` / `.internal`, o
- si risolve a un **indirizzo privato, loopback, link-local o cloud-metadata** IP

Il tuo endpoint deve essere un servizio HTTPS pubblicamente raggiungibile.
