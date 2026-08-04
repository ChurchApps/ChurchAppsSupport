---
title: "Endpoint Giving"
---

# Endpoint Giving

<div class="article-intro">

Il modulo Giving gestisce le donazioni, i fondi, l'elaborazione dei pagamenti, gli abbonamenti e le altre operazioni finanziarie correlate. Supporta più gateway di pagamento (Stripe, PayPal), gestisce le donazioni una tantum e ricorrenti, traccia i lotti di donazioni e fornisce l'elaborazione dei webhook per gli eventi di pagamento asincroni.

</div>

**Percorso base:** `/giving`

## Donations

Percorso base: `/giving/donations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oppure proprio personId | Elenca tutte le donazioni. Filtra con `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donations.View | Ottiene una donazione per ID |
| GET | `/my` | JWT | — | Ottiene le donazioni dell'utente corrente |
| GET | `/summary` | JWT | Donations.ViewSummary | Ottiene il riepilogo delle donazioni. Filtra con `?startDate=&endDate=&type=`. Usa `type=person` per la ripartizione per persona |
| GET | `/testEmail` | Public | — | Invia un'email di test (sviluppo/debug) |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna donazioni (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donazione |

### Esempio: elencare le donazioni per lotto

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

### Esempio: ottenere il riepilogo delle donazioni

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

## Donation Batches

Percorso base: `/giving/donationbatches`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. L'operazione di eliminazione rimuove anche tutte le donazioni all'interno del lotto.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i lotti di donazioni |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottiene un lotto di donazioni per ID |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna lotti di donazioni |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un lotto e tutte le sue donazioni |

## Donate

Percorso base: `/giving/donate`

Gestisce il flusso di donazione rivolto al pubblico, comprese le addebiti, gli abbonamenti, i webhook e i calcoli delle commissioni. Nessuna route CRUD di base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Ottiene i gateway di pagamento disponibili per una chiesa (solo chiavi pubbliche) |
| POST | `/client-token` | JWT | — | Genera un token client per l'inizializzazione del gateway |
| POST | `/create-order` | JWT | — | Crea un ordine di pagamento (checkout in stile PayPal) |
| POST | `/charge` | JWT | — | Elabora un addebito per una donazione una tantum |
| POST | `/subscribe` | JWT | — | Crea un abbonamento per una donazione ricorrente |
| POST | `/log` | Public | — | Registra una donazione. Corpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Riceve gli eventi webhook di pagamento (Stripe, PayPal). Richiede `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Riproduce gli eventi Stripe per un intervallo di date. Corpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calcola le commissioni di transazione. Corpo: `{ type, provider, gatewayId, amount, currency }`. Richiede `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verifica il token reCAPTCHA. Corpo: `{ token }` |

### Esempio: elaborare un addebito di donazione

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

### Esempio: creare un abbonamento ricorrente

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

## Funds

Percorso base: `/giving/funds`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. Il permesso `view` è `null` (nessun permesso richiesto per visualizzare i fondi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i fondi |
| GET | `/:id` | JWT | — | Ottiene un fondo per ID |
| GET | `/churchId/:churchId` | Public | — | Ottiene tutti i fondi per una chiesa specifica (pubblico) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Ottiene il totale delle donazioni di un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta l'elemento `campaignProgress` del website builder |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna fondi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo |

## Fund Donations

Percorso base: `/giving/funddonations`

Traccia come le singole donazioni sono ripartite tra i fondi. Nessuna route CRUD di base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Elenca le donazioni per fondo. Filtra con `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Aggiungi facoltativamente `?startDate=&endDate=` per il filtro per data |
| GET | `/:id` | JWT | Donations.View | Ottiene una donazione per fondo per ID |
| GET | `/my` | JWT | — | Ottiene le donazioni per fondo dell'utente corrente |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna donazioni per fondo (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donazione per fondo |

## Gateways

Percorso base: `/giving/gateways`

Gestisce le configurazioni dei gateway di pagamento (Stripe, PayPal, ecc.). Nessuna route CRUD di base è abilitata; tutti gli endpoint sono personalizzati. I segreti dei gateway sono criptati a riposo.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gateway della chiesa |
| GET | `/:id` | JWT | Settings.Edit | Ottiene un gateway per ID |
| GET | `/churchId/:churchId` | Public | — | Ottiene i gateway di una chiesa (solo chiavi pubbliche) |
| GET | `/configured/:churchId` | Public | — | Verifica se una chiesa ha un gateway di pagamento configurato |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna gateway (cripta le chiavi, predispone webhook e prodotti) |
| PATCH | `/:id` | JWT | Settings.Edit | Aggiorna parzialmente un gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un gateway (rimuove anche i suoi webhook) |

### Esempio: verificare la configurazione del gateway

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customers

Percorso base: `/giving/customers`

Estende `GenericCrudController` con le route CRUD: `getAll`, `delete`. Collega le persone ai propri record cliente del gateway di pagamento.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i clienti |
| GET | `/:id` | JWT | Donations.ViewSummary o proprio record | Ottiene un cliente per ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o proprio record | Ottiene gli abbonamenti al gateway per un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un cliente |

## Subscriptions

Percorso base: `/giving/subscriptions`

Gestisce gli abbonamenti per le donazioni ricorrenti. Nessuna route CRUD di base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti gli abbonamenti |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottiene un abbonamento per ID |
| POST | `/` | JWT | Donations.Edit o proprio abbonamento | Aggiorna gli abbonamenti presso il gateway di pagamento |
| DELETE | `/:id` | JWT | Donations.Edit o proprio abbonamento | Annulla un abbonamento e lo rimuove dal database. Corpo: `{ provider, reason }` |

## Subscription Funds

Percorso base: `/giving/subscriptionfunds`

Traccia le ripartizioni dei fondi per gli abbonamenti ricorrenti. Nessuna route CRUD di base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o proprio abbonamento | Elenca i fondi degli abbonamenti. Filtra con `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottiene un fondo di abbonamento per ID |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo di abbonamento |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o proprio abbonamento | Elimina tutti i fondi per un abbonamento |

## Payment Methods

Percorso base: `/giving/paymentmethods`

Gestisce i metodi di pagamento salvati (carte, conti correnti) tramite le API dei gateway di pagamento. Nessuna route CRUD di base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o proprio personId | Ottiene tutti i metodi di pagamento salvati per una persona (carte, conti correnti) |
| POST | `/addcard` | JWT | — | Allega un metodo di pagamento con carta. Corpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o proprio personId | Aggiorna i dettagli della carta. Corpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o proprio personId | Crea un SetupIntent ACH Stripe per il collegamento di un conto corrente. Corpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Crea un SetupIntent ACH anonimo per donazioni ospite. Corpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o proprio personId | Aggiunge un conto corrente tramite token (deprecato; usa `ach-setup-intent`). Corpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o proprio personId | Aggiorna i dettagli del conto corrente. Corpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o proprio cliente | Verifica un conto corrente con micro-depositi. Corpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o proprio cliente | Elimina un metodo di pagamento (carta o conto corrente) |

## Event Log

Percorso base: `/giving/eventLog`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. Traccia gli eventi webhook dei gateway di pagamento per audit e deduplicazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i log eventi |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottiene un log evento per ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ottiene i log eventi filtrati per tipo di evento |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna log eventi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un log evento |

## Pagine correlate

- [Endpoint Membership](./membership) — Persone, chiese, gruppi, ruoli e permessi
- [Autenticazione e permessi](./authentication) — Flusso di login, JWT, OAuth, modello dei permessi
- [Struttura dei moduli](../module-structure) — Pattern di organizzazione del codice
