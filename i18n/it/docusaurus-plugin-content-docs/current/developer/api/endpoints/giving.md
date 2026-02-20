---
title: "Endpoint Giving"
---

# Endpoint Giving

<div class="article-intro">

Il modulo Giving gestisce le donazioni, i fondi, l'elaborazione dei pagamenti, gli abbonamenti e le operazioni finanziarie correlate. Supporta più gateway di pagamento (Stripe, PayPal), gestisce donazioni una tantum e ricorrenti, traccia i lotti di donazioni e fornisce l'elaborazione dei webhook per eventi di pagamento asincroni.

</div>

**Percorso base:** `/giving`

## Donazioni

Percorso base: `/giving/donations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.View o proprio personId | Elenca tutte le donazioni. Filtra per `?batchId=` o `?personId=` |
| GET | `/:id` | JWT | Donations.View | Ottieni una donazione per ID |
| GET | `/my` | JWT | — | Ottieni le donazioni dell'utente corrente |
| GET | `/summary` | JWT | Donations.ViewSummary | Ottieni il riepilogo delle donazioni. Filtra per `?startDate=&endDate=&type=`. Usa `type=person` per il dettaglio per persona |
| GET | `/testEmail` | Pubblico | — | Invia un'email di test (sviluppo/debug) |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna donazioni (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donazione |

### Esempio: Elenca Donazioni per Lotto

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

### Esempio: Ottieni Riepilogo Donazioni

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

## Lotti di Donazioni

Percorso base: `/giving/donationbatches`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. L'operazione di eliminazione rimuove anche tutte le donazioni all'interno del lotto.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i lotti di donazioni |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un lotto di donazioni per ID |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna lotti di donazioni |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un lotto e tutte le sue donazioni |

## Dona

Percorso base: `/giving/donate`

Gestisce il flusso di donazione pubblica inclusi addebiti, abbonamenti, webhook e calcolo delle commissioni. Nessuna route CRUD base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/gateways/:churchId` | Pubblico | — | Ottieni i gateway di pagamento disponibili per una chiesa (solo chiavi pubbliche) |
| POST | `/client-token` | JWT | — | Genera un token client per l'inizializzazione del gateway |
| POST | `/create-order` | JWT | — | Crea un ordine di pagamento (checkout stile PayPal) |
| POST | `/charge` | JWT | — | Elabora un addebito di donazione una tantum |
| POST | `/subscribe` | JWT | — | Crea un abbonamento per donazione ricorrente |
| POST | `/log` | Pubblico | — | Registra una donazione. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pubblico | — | Ricevi eventi webhook di pagamento (Stripe, PayPal). Richiede `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Riproduce gli eventi Stripe per un intervallo di date. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pubblico | — | Calcola le commissioni di transazione. Body: `{ type, provider, gatewayId, amount, currency }`. Richiede `?churchId=` |
| POST | `/captcha-verify` | Pubblico | — | Verifica il token reCAPTCHA. Body: `{ token }` |

### Esempio: Elabora un Addebito di Donazione

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

### Esempio: Crea un Abbonamento Ricorrente

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

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. Il permesso `view` è `null` (nessun permesso richiesto per visualizzare i fondi).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i fondi |
| GET | `/:id` | JWT | — | Ottieni un fondo per ID |
| GET | `/churchId/:churchId` | Pubblico | — | Ottieni tutti i fondi per una chiesa specifica (pubblico) |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna fondi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo |

## Donazioni ai Fondi

Percorso base: `/giving/funddonations`

Traccia come le singole donazioni vengono allocate tra i fondi. Nessuna route CRUD base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.View | Elenca le donazioni ai fondi. Filtra per `?donationId=`, `?personId=`, `?fundId=`, o `?fundName=`. Opzionalmente aggiungi `?startDate=&endDate=` per filtrare per date |
| GET | `/:id` | JWT | Donations.View | Ottieni una donazione al fondo per ID |
| GET | `/my` | JWT | — | Ottieni le donazioni ai fondi dell'utente corrente |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna donazioni ai fondi (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donazione al fondo |

## Gateway

Percorso base: `/giving/gateways`

Gestisce le configurazioni dei gateway di pagamento (Stripe, PayPal, ecc.). Nessuna route CRUD base è abilitata; tutti gli endpoint sono personalizzati. I segreti del gateway sono crittografati a riposo.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gateway per la chiesa |
| GET | `/:id` | JWT | Settings.Edit | Ottieni un gateway per ID |
| GET | `/churchId/:churchId` | Pubblico | — | Ottieni i gateway per una chiesa (solo chiavi pubbliche) |
| GET | `/configured/:churchId` | Pubblico | — | Verifica se una chiesa ha un gateway di pagamento configurato |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna gateway (crittografa le chiavi, provisiona webhook e prodotti) |
| PATCH | `/:id` | JWT | Settings.Edit | Aggiorna parzialmente un gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Elimina un gateway (rimuove anche i suoi webhook) |

### Esempio: Verifica Configurazione Gateway

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

Estende `GenericCrudController` con le route CRUD: `getAll`, `delete`. Collega le persone ai loro record cliente del gateway di pagamento.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i clienti |
| GET | `/:id` | JWT | Donations.ViewSummary o proprio record | Ottieni un cliente per ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o proprio record | Ottieni gli abbonamenti del gateway per un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un cliente |

## Abbonamenti

Percorso base: `/giving/subscriptions`

Gestisce gli abbonamenti per donazioni ricorrenti. Nessuna route CRUD base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti gli abbonamenti |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un abbonamento per ID |
| POST | `/` | JWT | Donations.Edit o proprio abbonamento | Aggiorna gli abbonamenti con il gateway di pagamento |
| DELETE | `/:id` | JWT | Donations.Edit o proprio abbonamento | Cancella un abbonamento e rimuovilo dal database. Body: `{ provider, reason }` |

## Fondi Abbonamento

Percorso base: `/giving/subscriptionfunds`

Traccia le allocazioni dei fondi per gli abbonamenti ricorrenti. Nessuna route CRUD base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.View o proprio abbonamento | Elenca i fondi degli abbonamenti. Filtra per `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un fondo abbonamento per ID |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo abbonamento |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o proprio abbonamento | Elimina tutti i fondi per un abbonamento |

## Metodi di Pagamento

Percorso base: `/giving/paymentmethods`

Gestisce i metodi di pagamento memorizzati (carte, conti bancari) tramite le API del gateway di pagamento. Nessuna route CRUD base è abilitata; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o proprio personId | Ottieni tutti i metodi di pagamento memorizzati per una persona (carte, conti bancari) |
| POST | `/addcard` | JWT | — | Aggiungi un metodo di pagamento con carta. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o proprio personId | Aggiorna i dettagli della carta. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o proprio personId | Crea un SetupIntent ACH Stripe per il collegamento del conto bancario. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pubblico | — | Crea un SetupIntent ACH anonimo per donazioni ospite. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o proprio personId | Aggiungi un conto bancario tramite token (deprecato; usa `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o proprio personId | Aggiorna i dettagli del conto bancario. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o proprio cliente | Verifica un conto bancario con micro-depositi. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o proprio cliente | Elimina un metodo di pagamento (carta o conto bancario) |

## Log Eventi

Percorso base: `/giving/eventLog`

Estende `GenericCrudController` con le route CRUD: `getById`, `getAll`, `post`, `delete`. Traccia gli eventi webhook del gateway di pagamento per audit e deduplicazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|----------|------|----------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i log degli eventi |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un log evento per ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ottieni i log degli eventi filtrati per tipo di evento |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna log degli eventi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un log evento |

## Pagine Correlate

- [Endpoint Membership](./membership) — Persone, chiese, gruppi, ruoli e permessi
- [Autenticazione e Permessi](./authentication) — Flusso di login, JWT, OAuth, modello dei permessi
- [Struttura dei Moduli](../module-structure) — Pattern di organizzazione del codice
