---
title: "Endpoint Giving"
---

# Endpoint Giving

<div class="article-intro">

Il modulo Giving gestisce donazioni, fondi, elaborazione dei pagamenti, abbonamenti e relative operazioni finanziarie. Supporta più gateway di pagamento (Stripe, PayPal), gestisce donazioni una tantum e ricorrenti, tiene traccia dei lotti di donazioni e fornisce l'elaborazione dei webhook per gli eventi di pagamento asincroni.

</div>

**Percorso base:** `/giving`

## Donazioni

Percorso base: `/giving/donations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.View o personId proprio | Elenca tutte le donazioni. Filtra con `?batchId=` o `?personId=`. Con `?personId=`, i regali verso fondi non deducibili vengono esclusi (come negli estratti conto delle donazioni) a meno che un chiamante con Donations.View non aggiunga `&includeNonDeductible=1`, cosa che fa il record persona di B1Admin |
| GET | `/:id` | JWT | Donations.View | Ottieni una donazione tramite ID |
| GET | `/my` | JWT | — | Ottieni le donazioni dell'utente corrente |
| GET | `/my/summary?year=` | JWT | — | Totale delle donazioni dell'utente corrente per un anno (predefinito: anno in corso): `{ year, total, count, currency, isConverted }`, con i totali convertiti nella valuta della chiesa. Alimenta l'anteprima delle donazioni nella home page dei membri |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Donazioni con data compresa nell'intervallo (estremi inclusi). Entrambe le date sono obbligatorie nel formato `YYYY-MM-DD`, altrimenti `400`. Le pagine degli estratti conto di B1Admin richiedono in questo modo un anno solare anziché l'intera cronologia della chiesa |
| GET | `/summary` | JWT | Donations.ViewSummary | Ottieni il riepilogo delle donazioni. Filtra con `?startDate=&endDate=&type=`. Usa `type=person` per il dettaglio per persona |
| GET | `/testEmail` | Public | — | Invia un'email di prova (sviluppo/debug) |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crea o aggiorna donazioni (lotto). Con solo Donations.Enter, sia il lotto di destinazione sia (per un aggiornamento) il lotto attuale della donazione devono essere aperti, e i regali da gateway (quelli con un `transactionId`) non possono essere modificati; altrimenti `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Elimina una donazione. Solo Donations.Enter: la donazione deve trovarsi in un lotto aperto e non essere un regalo da gateway, altrimenti `403` |

### Esempio: elenco delle donazioni per lotto

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Esempio: ottieni il riepilogo delle donazioni

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Lotti di donazioni

Percorso base: `/giving/donationbatches`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. L'operazione di eliminazione rimuove anche tutte le donazioni contenute nel lotto.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary o Donations.Enter | Elenca tutti i lotti di donazioni |
| GET | `/:id` | JWT | Donations.ViewSummary o Donations.Enter | Ottieni un lotto di donazioni tramite ID |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crea o aggiorna lotti di donazioni. Solo Donations.Enter: aggiornare un lotto esistente richiede che sia aperto, altrimenti `403 { "error": "This batch is closed." }`. `status` viene ignorato qui, quindi salvare un lotto non può riaprirlo |
| POST | `/:id/close` | JWT | Donations.Edit | Chiudi un lotto: imposta `status` su `closed`, `closedDate` all'ora attuale e `closedBy` all'ID utente del chiamante. Restituisce il lotto |
| POST | `/:id/reopen` | JWT | Donations.Edit | Riapri un lotto: imposta `status` su `open` e azzera `closedDate` e `closedBy`. Restituisce il lotto |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un lotto e tutte le sue donazioni |

Ogni lotto include `status` (`open` o `closed`; i lotti nuovi ed esistenti sono `open`), `closedDate` e `closedBy`. Donations.Edit può modificare le donazioni in qualsiasi lotto; Donations.Enter (mostrato come **Inserisci donazioni** nell'editor dei ruoli) può solo aggiungere, modificare o eliminare donazioni e suddivisioni per fondo mentre il loro lotto è aperto.

## Donazione

Percorso base: `/giving/donate`

Gestisce il flusso di donazione pubblico, inclusi addebiti, abbonamenti, webhook e calcolo delle commissioni. Non sono abilitate route CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/gateways/:churchId` | Public | — | Ottieni i gateway di pagamento disponibili per una chiesa (solo chiavi pubbliche) |
| POST | `/client-token` | JWT | — | Genera un token client per l'inizializzazione del gateway |
| POST | `/create-order` | JWT | — | Crea un ordine di pagamento (checkout in stile PayPal) |
| POST | `/charge` | JWT | — | Elabora un addebito per una donazione una tantum |
| POST | `/subscribe` | JWT | — | Crea un abbonamento a donazioni ricorrenti |
| POST | `/log` | Public | — | Registra una donazione. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Ricevi gli eventi webhook di pagamento (Stripe, PayPal). Richiede `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Riproduci gli eventi Stripe per un intervallo di date. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calcola le commissioni sulla transazione. Body: `{ type, provider, gatewayId, amount, currency }`. Richiede `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verifica il token reCAPTCHA. Body: `{ token, churchId? }`. Una risposta umana restituisce `{ response: "human", pass }`, dove `pass` è un pass firmato per donazioni da ospite valido per 10 minuti (e solo per `churchId`, se ne viene inviato uno) |

Quando l'Api viene eseguita con `CAPTCHA_ENFORCE=true`, le chiamate degli ospiti (non autenticati) a `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` e `/giving/paymentmethods/ach-setup-intent-anon` devono includere quel `captchaPass` nel body, altrimenti restituiscono 403 `Captcha verification required`. Il pass può essere riutilizzato finché non scade, perché il flusso ospite di Stripe effettua due chiamate (aggiunta della carta, poi addebito). Le chiamate di utenti autenticati non sono interessate. `CAPTCHA_ENFORCE` ha come valore predefinito `false`; i moduli di donazione per ospiti di `@churchapps/apphelper` inviano automaticamente il pass.

### Esempio: elaborazione di un addebito per donazione

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Esempio: crea un abbonamento ricorrente

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Fondi

Percorso base: `/giving/funds`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. Il permesso `view` è `null` (per visualizzare i fondi non è richiesto alcun permesso).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i fondi |
| GET | `/:id` | JWT | — | Ottieni un fondo tramite ID |
| GET | `/churchId/:churchId` | Public | — | Ottieni tutti i fondi di una specifica chiesa (pubblico) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Ottieni il totale delle donazioni di un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta l'elemento `campaignProgress` del website builder |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna fondi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo |

## Donazioni per fondo

Percorso base: `/giving/funddonations`

Tiene traccia di come le singole donazioni vengono ripartite tra i fondi. Non sono abilitate route CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.View | Elenca le donazioni per fondo. Filtra con `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Facoltativamente aggiungi `?startDate=&endDate=` per filtrare per data |
| GET | `/:id` | JWT | Donations.View | Ottieni una donazione per fondo tramite ID |
| GET | `/my` | JWT | — | Ottieni le donazioni per fondo dell'utente corrente |
| POST | `/` | JWT | Donations.Edit o Donations.Enter | Crea o aggiorna donazioni per fondo (lotto). Solo Donations.Enter: la donazione principale deve trovarsi in un lotto aperto e non essere un regalo da gateway, altrimenti `403` |
| DELETE | `/:id` | JWT | Donations.Edit o Donations.Enter | Elimina una donazione per fondo. Stessa regola del lotto aperto per Donations.Enter |

## Gateway

Percorso base: `/giving/gateways`

Gestisce le configurazioni dei gateway di pagamento (Stripe, PayPal, ecc.). Non sono abilitate route CRUD di base; tutti gli endpoint sono personalizzati. I segreti dei gateway sono cifrati a riposo.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gateway della chiesa |
| GET | `/:id` | JWT | Settings.Edit | Ottieni un gateway tramite ID |
| GET | `/churchId/:churchId` | Public | — | Ottieni i gateway di una chiesa (solo chiavi pubbliche) |
| GET | `/configured/:churchId` | Public | — | Verifica se una chiesa ha un gateway di pagamento configurato |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna gateway (cifra le chiavi, configura webhook e prodotti) |
| PATCH | `/:id` | JWT | Settings.Edit | Aggiorna parzialmente un gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un gateway (rimuove anche i suoi webhook) |

### Esempio: verifica della configurazione del gateway

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Clienti

Percorso base: `/giving/customers`

Estende `GenericCrudController` con le route CRUD: `getAll`, `delete`. Collega le persone ai rispettivi record cliente del gateway di pagamento.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i clienti |
| GET | `/:id` | JWT | Donations.ViewSummary o record proprio | Ottieni un cliente tramite ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o record proprio | Ottieni gli abbonamenti del gateway per un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un cliente |

## Abbonamenti

Percorso base: `/giving/subscriptions`

Gestisce gli abbonamenti a donazioni ricorrenti. Non sono abilitate route CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti gli abbonamenti |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un abbonamento tramite ID |
| POST | `/` | JWT | Donations.Edit o abbonamento proprio | Aggiorna gli abbonamenti con il gateway di pagamento |
| DELETE | `/:id` | JWT | Donations.Edit o abbonamento proprio | Annulla un abbonamento e rimuovilo dal database. Body: `{ provider, reason }` |

## Fondi degli abbonamenti

Percorso base: `/giving/subscriptionfunds`

Tiene traccia delle ripartizioni per fondo degli abbonamenti ricorrenti. Non sono abilitate route CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.View o abbonamento proprio | Elenca i fondi degli abbonamenti. Filtra con `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un fondo di abbonamento tramite ID |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo di abbonamento |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o abbonamento proprio | Elimina tutti i fondi di un abbonamento |

## Metodi di pagamento

Percorso base: `/giving/paymentmethods`

Gestisce i metodi di pagamento salvati (carte, conti bancari) tramite le API del gateway di pagamento. Non sono abilitate route CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o personId proprio | Ottieni tutti i metodi di pagamento salvati per una persona (carte, conti bancari) |
| POST | `/addcard` | JWT | — | Collega un metodo di pagamento con carta. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o personId proprio | Aggiorna i dettagli della carta. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o personId proprio | Crea un SetupIntent ACH di Stripe per il collegamento di un conto bancario. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Crea un SetupIntent ACH anonimo per le donazioni degli ospiti. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o personId proprio | Aggiungi un conto bancario tramite token (obsoleto; usa `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o personId proprio | Aggiorna i dettagli del conto bancario. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o cliente proprio | Verifica un conto bancario con micro-depositi. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o cliente proprio | Elimina un metodo di pagamento (carta o conto bancario) |

## Registro eventi

Percorso base: `/giving/eventLog`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. Tiene traccia degli eventi webhook dei gateway di pagamento per audit e deduplicazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i registri degli eventi |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un registro evento tramite ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ottieni i registri degli eventi filtrati per tipo di evento |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna registri degli eventi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un registro evento |

## Pagine correlate

- [Endpoint Membership](./membership) — Persone, chiese, gruppi, ruoli e permessi
- [Autenticazione e permessi](./authentication) — Flusso di login, JWT, OAuth, modello dei permessi
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
