---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

I Webhooks permettono a una chiesa di inviare notifiche in tempo reale a strumenti di terze parti -- piattaforme di automazione (Zapier, Make, n8n), CRM, sistemi contabili o qualsiasi cosa accetti un HTTP POST. Quando una persona, un gruppo o una famiglia cambia in B1, B1 invia un payload JSON firmato a ogni URL iscritto a quell'evento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni della chiesa** registra e gestisce i webhooks
- Il tuo endpoint di ricezione deve essere raggiungibile tramite **HTTPS** a un indirizzo pubblico
- Devi avere un modo per memorizzare il segreto di firma in modo sicuro -- viene mostrato solo una volta

</div>

## Panoramica

I Webhooks sono **solo in uscita**: B1 chiama il tuo endpoint, tu non chiami B1. Ogni webhook è una sottoscrizione per chiesa costituita da un URL di destinazione, un segreto di firma e un elenco di eventi sottoscritti.

La consegna utilizza un **outbox durevole**: quando si verifica un evento sottoscritto, B1 registra una riga di consegna e un worker in background la invia tramite POST entro circa un minuto. Le consegne fallite vengono ritentate con backoff esponenziale. Nulla viene perso se una consegna è lenta o il tuo endpoint è temporaneamente inattivo.

## Registrazione di un Webhook

### In B1Admin

Vai su **Impostazioni → Webhooks → Nuovo Webhook**. Inserisci un nome, l'URL del payload e seleziona gli eventi a cui iscriverti. Al salvataggio, il **segreto di firma viene visualizzato una volta** -- copialo immediatamente e memorizzalo con la tua integrazione. Non viene mai più mostrato (puoi ruotarlo in seguito, ma non puoi recuperare l'originale).

### Tramite l'API

Tutti gli endpoint sono sotto il percorso base del modulo Membership `/membership/webhooks` e richiedono un JWT da un amministratore della chiesa con il permesso `Settings / Edit`.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — nuovi membri",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

La risposta di creazione -- e **solo** la risposta di creazione -- include il `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — nuovi membri",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Metodo e percorso | Scopo |
|---|---|
| `GET /membership/webhooks` | Elenca i webhooks della chiesa (segreto omesso) |
| `GET /membership/webhooks/events` | Il catalogo dei nomi di eventi validi |
| `GET /membership/webhooks/:id` | Carica un webhook |
| `POST /membership/webhooks` | Crea (senza `id`) o aggiorna (con `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Ruota il segreto di firma; restituisce il nuovo valore una volta |
| `DELETE /membership/webhooks/:id` | Elimina un webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentativi di consegna recenti per un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload completo e risposta per una consegna |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Rimetti in coda una consegna |

## Catalogo degli eventi

I nomi degli eventi seguono il pattern `{entità}.{azione}`. Recupera l'elenco live da `GET /membership/webhooks/events`.

| Evento | Si attiva quando |
|---|---|
| `person.created` | Una persona viene aggiunta |
| `person.updated` | Un record persona viene modificato |
| `person.destroyed` | Una persona viene eliminata |
| `household.created` | Una famiglia viene aggiunta |
| `household.updated` | Una famiglia viene modificata |
| `household.destroyed` | Una famiglia viene eliminata |
| `group.created` | Un gruppo viene aggiunto |
| `group.updated` | Un gruppo viene modificato |
| `group.destroyed` | Un gruppo viene eliminato |
| `group.member.added` | Una persona viene aggiunta a un gruppo |
| `group.member.removed` | Una persona viene rimossa da un gruppo |

## Formato del payload

Ogni consegna è un HTTP `POST` con un corpo JSON e questi header:

| Header | Descrizione |
|---|---|
| `Content-Type` | Sempre `application/json` |
| `X-B1-Event` | Il nome dell'evento, ad es. `person.created` |
| `X-B1-Delivery-Id` | Id univoco per questo tentativo di consegna -- usalo per deduplicare |
| `X-B1-Signature` | Firma HMAC-SHA256 del corpo grezzo (vedi sotto) |
| `X-B1-Timestamp` | Secondi epoch Unix quando è stata inviata la richiesta |
| `User-Agent` | `B1-Webhooks/1.0` |

Il corpo avvolge la risorsa modificata in una piccola busta:

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

## Verifica delle firme

Verifica sempre `X-B1-Signature` prima di fidarti di un payload. La firma è `sha256=` seguito dall'HMAC-SHA256 esadecimale del **corpo della richiesta grezzo** con chiave il tuo segreto di firma. Calcolalo sui byte ricevuti -- non ri-serializzare il JSON analizzato.

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

Rifiuta qualsiasi richiesta la cui firma non corrisponde. Facoltativamente rifiuta anche richieste il cui `X-B1-Timestamp` è più vecchio di pochi minuti per limitare le finestre di replay.

## Consegna e tentativi

Il tuo endpoint dovrebbe rispondere con uno stato `2xx` il più rapidamente possibile -- idealmente dopo aver solo messo in coda il lavoro, non dopo averlo elaborato. Qualsiasi risposta non `2xx`, un errore di connessione o una risposta più lenta di **10 secondi** conta come consegna fallita.

Le consegne fallite vengono ritentate con backoff esponenziale -- **16 tentativi in circa 5 giorni**. L'intervallo cresce da 1 minuto, attraverso ore, fino a intervalli di 3 giorni per i tentativi finali. Dopo il 16° tentativo fallito la consegna viene contrassegnata come `exhausted` e abbandonata.

La consegna è **at-least-once**: una consegna può arrivare più di una volta (ad esempio, se il tuo endpoint ha successo ma la risposta viene persa). Usa l'header `X-B1-Delivery-Id` per deduplicare -- elabora ogni id solo una volta e tratta le ripetizioni come no-op.

### Disabilitazione automatica

Se un webhook produce **tre consegne consecutive esaurite**, B1 lo disabilita automaticamente. Correggi il tuo endpoint, quindi riabilita il webhook in B1Admin (o tramite `POST /membership/webhooks` con `"active": true`).

## Ispezione e riconsegna

L'editor di webhook in B1Admin mostra una tabella **Consegne recenti** -- evento, stato, numero di tentativi, codice di risposta e timestamp. Selezionando una riga viene rivelato il payload completo che è stato inviato e la risposta ricevuta.

Usa **Riconsegna** per rimettere in coda qualsiasi consegna passata con il suo payload originale -- utile dopo aver corretto un bug nel tuo endpoint, o per recuperare eventi che il tuo endpoint ha perso mentre era inattivo.

## Requisiti URL

Poiché gli URL dei webhook sono forniti dalla chiesa, B1 applica protezioni contro il server-side request forgery. Un URL di webhook viene rifiutato -- alla registrazione e ricontrollato prima di ogni consegna -- se:

- non usa **`https`**
- punta a `localhost`, un hostname `.local` / `.internal`, o
- si risolve in un indirizzo IP **privato, loopback, link-local o cloud-metadata**

Il tuo endpoint deve essere un servizio HTTPS raggiungibile pubblicamente.
