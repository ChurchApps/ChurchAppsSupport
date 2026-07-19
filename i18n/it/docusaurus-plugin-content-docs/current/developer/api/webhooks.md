---
title: "Webhook"
---

# Webhook

<div class="article-intro">

I webhook consentono a una chiesa di inviare notifiche in tempo reale a strumenti di terze parti — piattaforme di automazione (Zapier, Make, n8n), CRM, sistemi contabili o qualsiasi cosa che accetti un POST HTTP. Quando una persona, gruppo o nucleo familiare cambia in B1, B1 invia un payload JSON firmato a ogni URL iscritto a quell'evento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni chiesa** registra e gestisce i webhook
- L'endpoint ricevente deve essere raggiungibile su **HTTPS** a un indirizzo pubblico
- Avere un modo per archiviare il segreto di firma in modo sicuro — viene visualizzato solo una volta

</div>

## Panoramica

I webhook sono **solo in uscita**: B1 chiama il tuo endpoint, non il contrario. Ogni webhook è una sottoscrizione per chiesa costituita da un URL di destinazione, un segreto di firma e un elenco di eventi sottoscritti.

La consegna utilizza un **outbox durevole**: quando si verifica un evento sottoscritto, B1 registra una riga di consegna e un worker di sfondo lo PUBBLICA entro circa un minuto. Le consegne non riuscite vengono ritentate con backoff esponenziale. Nulla va perso se una consegna è lenta o il tuo endpoint è brevemente inattivo.

## Registrazione di un Webhook

### In B1Admin

Vai a **Impostazioni → Webhook → Nuovo Webhook**. Immetti un nome, l'URL del payload, e seleziona gli eventi a cui sottoscriversi. Al salvataggio, il **segreto di firma viene visualizzato una volta** — copialo immediatamente e archivialo con la tua integrazione. Non viene mai più mostrato (puoi ruotarlo in seguito, ma non puoi recuperare l'originale).

### Tramite API

Tutti gli endpoint si trovano nel percorso base del modulo Membership `/membership/webhooks` e richiedono un JWT di un amministratore della chiesa con il permesso `Settings / Edit`, **oppure una [chiave API](./api-keys) coniata con l'ambito `settings:write`**. Le stesse route accettano entrambi. Questo è ciò che consente a Zapier e Make di registrare webhook per conto della chiesa quando uno Zap o uno scenario viene attivato.

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
| `GET /membership/webhooks` | Elencare i webhook della chiesa (segreto omesso) |
| `GET /membership/webhooks/events` | Il catalogo dei nomi di eventi validi |
| `GET /membership/webhooks/:id` | Caricare un webhook |
| `POST /membership/webhooks` | Creare (senza `id`) o aggiornare (con `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Ruotare il segreto di firma; restituisce il nuovo valore una volta |
| `DELETE /membership/webhooks/:id` | Eliminare un webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentativi di consegna recenti per un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload completo e risposta per una consegna |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Rimettere in coda una consegna |

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
| `donation.created` | Una donazione viene registrata — inserimento manuale, online o transizione in sospeso → completamento |
| `donation.updated` | Un record di donazione viene modificato |
| `attendance.recorded` | Una visita viene registrata (inserimento manuale o check-in) |
| `session.created` | Una nuova sessione di presenza viene creata (manualmente o automaticamente al primo check-in) |
| `form.submission.created` | Un modulo viene inviato |
| `event.created` | Un evento del calendario viene aggiunto |
| `event.updated` | Un evento del calendario viene modificato |
| `event.destroyed` | Un evento del calendario viene eliminato |

## Formato del payload

Ogni consegna è un HTTP `POST` con un corpo JSON e questi intestazioni:

| Intestazione | Descrizione |
|---|---|
| `Content-Type` | Sempre `application/json` |
| `X-B1-Event` | Il nome dell'evento, ad esempio `person.created` |
| `X-B1-Delivery-Id` | Id univoco per questo tentativo di consegna — usalo per deduplicare |
| `X-B1-Signature` | Firma HMAC-SHA256 del corpo grezzo (vedi sotto) |
| `X-B1-Timestamp` | Unix epoch secondi quando la richiesta è stata inviata |
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

Per gli eventi `*.destroyed`, `data` contiene solo `id` e `churchId` del record eliminato.

## Tipi di connettore

Il formato di consegna predefinito è l'involucro JSON sopra — `connectorType: "standard"`. Per [Slack e Discord](/docs/b1-admin/integrations/slack-discord) lo stesso motore webhook invece pubblica un messaggio di chat che questi servizi accettano direttamente:

| `connectorType` | Corpo inviato | Usa quando |
|---|---|---|
| `"standard"` (predefinito) | Involucro `{event, churchId, occurredAt, data}`, firmato | Stai scrivendo la tua integrazione, oppure puntando a Zapier / Make / un server personalizzato |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Stai pubblicando direttamente a un URL Webhook in arrivo Slack |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Stai pubblicando direttamente a un URL webhook del canale Discord |

Il tipo di connettore viene impostato nel menu a discesa **Tipo di connettore** nell'editor webhook, o tramite `connectorType` nel corpo `POST /membership/webhooks`. L'intestazione firmata `X-B1-Signature` viene comunque inviata per le consegne Slack/Discord (le ignorano innocuamente), quindi passare un webhook a `standard` in seguito non richiede una nuova firma.

## Consegne di prova

Ogni editor webhook ha un pulsante **Invia evento di prova** — la chiamata API corrispondente è `POST /membership/webhooks/:id/test`. La route di prova costruisce un payload sintetico per il primo evento sottoscritto, lo invia sincronamente attraverso il percorso di consegna firmato reale (e attraverso `formatForConnector` per Slack/Discord), e restituisce la riga di consegna risultante incluso `responseStatus` e `responseBody`. Usalo per confermare la connettività e la gestione della firma prima di attivare l'integrazione per davvero.

## Verifica delle firme

Verifica sempre `X-B1-Signature` prima di fidarti di un payload. La firma è `sha256=` seguito dal valore esadecimale HMAC-SHA256 del **corpo della richiesta grezzo** codificato con il tuo segreto di firma. Calcola su i byte che hai ricevuto — non ri-serializzare il JSON analizzato.

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

Rifiuta qualsiasi richiesta la cui firma non corrisponde. Facoltativamente, rifiuta anche le richieste il cui `X-B1-Timestamp` è più vecchio di pochi minuti per limitare le finestre di replay.

## Supporto SDK

Per Node.js, `@churchapps/integration-sdk` fornisce un verificatore tipizzato e un middleware Express che gestisce la cattura del corpo grezzo, il controllo della firma e l'analisi dell'involucro per te:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Cattura il corpo grezzo prima dell'analisi JSON — necessario affinché la firma continui a verificarsi.
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

## Consegna e tentativi

Il tuo endpoint dovrebbe rispondere con uno stato `2xx` il più rapidamente possibile — idealmente dopo solo aver messo in coda il lavoro, non dopo averlo elaborato. Qualsiasi risposta non-`2xx`, un errore di connessione o una risposta più lenta di **10 secondi** conta come una consegna non riuscita.

Le consegne non riuscite vengono ritentate con backoff esponenziale — **16 tentativi in circa 5 giorni**. L'intervallo cresce da 1 minuto, attraverso ore, fino a intervalli di 3 giorni per i tentativi finali. Dopo il 16° tentativo non riuscito la consegna è contrassegnata come `exhausted` e abbandonata.

La consegna è **almeno una volta**: una consegna può arrivare più di una volta (ad esempio, se il tuo endpoint ha successo ma la risposta va persa). Usa l'intestazione `X-B1-Delivery-Id` per deduplicare — elabora ogni id una sola volta e tratta i duplicati come no-op.

### Disabilitazione automatica

Se un webhook produce **tre consegne esaurite consecutive**, B1 lo disabilita automaticamente. Correggi il tuo endpoint, quindi riabilita il webhook in B1Admin (o tramite `POST /membership/webhooks` con `"active": true`).

## Ispezione e rimessa

L'editor webhook in B1Admin mostra una tabella **Consegne recenti** — evento, stato, numero di tentativi, codice di risposta e timestamp. Selezionando una riga viene rivelato il payload completo che è stato inviato e la risposta che è tornata.

Usa **Rimetti** per rimettere in coda qualsiasi consegna passata con il suo payload originale — utile dopo aver corretto un bug nel tuo endpoint, o per retroattivare gli eventi che il tuo endpoint ha perso mentre era inattivo.

## Requisiti dell'URL

Poiché gli URL webhook sono forniti dalla chiesa, B1 applica protezioni contro la falsificazione di richieste lato server. Un URL webhook viene rifiutato — alla registrazione e ricontrollato prima di ogni consegna — se:

- non utilizza **`https`**
- punta a `localhost`, un nome host `.local` / `.internal`, o
- si risolve in un indirizzo IP **privato, loopback, link-local o metadati cloud**

Il tuo endpoint deve essere un servizio HTTPS pubblicamente raggiungibile.
