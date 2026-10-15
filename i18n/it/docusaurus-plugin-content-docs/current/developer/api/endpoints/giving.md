---
title: "Endpoint Giving"
---

# Endpoint Giving

<div class="article-intro">

Il modulo Giving gestisce donazioni, fondi, elaborazione dei pagamenti, abbonamenti e le relative operazioni finanziarie. Supporta più gateway di pagamento (Stripe, PayPal), gestisce donazioni una tantum e ricorrenti, tiene traccia dei lotti di donazioni e fornisce l'elaborazione dei webhook per gli eventi di pagamento asincroni.

</div>

**Percorso base:** `/giving`

## Donazioni

Percorso base: `/giving/donations`

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o il proprio personId | Elenca tutte le donazioni. Filtra con `?batchId=` o `?personId=`. Con `?personId=`, i doni a fondi non deducibili vengono esclusi (come negli attestati di donazione) a meno che un chiamante con Donations.View non aggiunga `&includeNonDeductible=1`, cosa che fa la scheda persona di B1Admin |
| GET | `/:id` | JWT | Donations.View | Ottieni una donazione tramite ID |
| GET | `/my` | JWT | — | Ottieni le donazioni dell'utente corrente |
| GET | `/my/summary?year=` | JWT | — | Totale delle offerte dell'utente corrente per un anno (per impostazione predefinita quest'anno): `{ year, total, count, currency, isConverted }`, con i totali convertiti nella valuta della chiesa. Alimenta l'anteprima delle offerte nella home del membro |
| GET | `/summary` | JWT | Donations.ViewSummary | Ottieni il riepilogo delle donazioni. Filtra con `?startDate=&endDate=&type=`. Usa `type=person` per la suddivisione per persona |
| GET | `/testEmail` | Pubblico | — | Invia un'email di prova (sviluppo/debug) |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna donazioni (lotto) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donazione |

### Esempio: elencare le donazioni di un lotto

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

## Lotti di donazioni

Percorso base: `/giving/donationbatches`

Estende `GenericCrudController` con le rotte CRUD: `getById`, `getAll`, `post`, `delete`. L'operazione di eliminazione rimuove anche tutte le donazioni contenute nel lotto.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i lotti di donazioni |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un lotto di donazioni tramite ID |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna lotti di donazioni |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un lotto e tutte le sue donazioni |

## Donate

Percorso base: `/giving/donate`

Gestisce il flusso di donazione rivolto al pubblico, inclusi addebiti, abbonamenti, webhook e calcolo delle commissioni. Non sono abilitate rotte CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Pubblico | — | Ottieni i gateway di pagamento disponibili per una chiesa (solo chiavi pubbliche) |
| POST | `/client-token` | JWT | — | Genera un token client per l'inizializzazione del gateway |
| POST | `/create-order` | JWT | — | Crea un ordine di pagamento (checkout in stile PayPal) |
| POST | `/charge` | JWT | — | Elabora un addebito per una donazione una tantum |
| POST | `/subscribe` | JWT | — | Crea un abbonamento a una donazione ricorrente |
| POST | `/log` | Pubblico | — | Registra una donazione. Corpo: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Pubblico | — | Ricevi eventi webhook di pagamento (Stripe, PayPal). Richiede `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Riproduci gli eventi Stripe per un intervallo di date. Corpo: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Pubblico | — | Calcola le commissioni di transazione. Corpo: `{ type, provider, gatewayId, amount, currency }`. Richiede `?churchId=` |
| POST | `/captcha-verify` | Pubblico | — | Verifica il token reCAPTCHA. Corpo: `{ token }` |

### Esempio: elaborare l'addebito di una donazione

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

## Fondi

Percorso base: `/giving/funds`

Estende `GenericCrudController` con le rotte CRUD: `getById`, `getAll`, `post`, `delete`. Il permesso `view` è `null` (per visualizzare i fondi non serve alcun permesso).

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i fondi |
| GET | `/:id` | JWT | — | Ottieni un fondo tramite ID |
| GET | `/churchId/:churchId` | Pubblico | — | Ottieni tutti i fondi di una specifica chiesa (pubblico) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Pubblico | — | Ottieni il totale delle donazioni di un fondo: `{ fundId, totalAmount, donationCount }`. Alimenta l'elemento `campaignProgress` del costruttore di siti web |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna fondi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo |

## Donazioni ai fondi

Percorso base: `/giving/funddonations`

Tiene traccia di come le singole donazioni vengono ripartite tra i fondi. Non sono abilitate rotte CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Elenca le donazioni ai fondi. Filtra con `?donationId=`, `?personId=`, `?fundId=` o `?fundName=`. Facoltativamente aggiungi `?startDate=&endDate=` per filtrare per data |
| GET | `/:id` | JWT | Donations.View | Ottieni una donazione a fondo tramite ID |
| GET | `/my` | JWT | — | Ottieni le donazioni ai fondi dell'utente corrente |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna donazioni ai fondi (lotto) |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina una donazione a fondo |

## Gateway

Percorso base: `/giving/gateways`

Gestisce le configurazioni dei gateway di pagamento (Stripe, PayPal, ecc.). Non sono abilitate rotte CRUD di base; tutti gli endpoint sono personalizzati. I segreti dei gateway sono cifrati a riposo.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i gateway della chiesa |
| GET | `/:id` | JWT | Settings.Edit | Ottieni un gateway tramite ID |
| GET | `/churchId/:churchId` | Pubblico | — | Ottieni i gateway di una chiesa (solo chiavi pubbliche) |
| GET | `/configured/:churchId` | Pubblico | — | Verifica se una chiesa ha un gateway di pagamento configurato |
| POST | `/` | JWT | Settings.Edit | Crea o aggiorna gateway (cifra le chiavi, configura webhook e prodotti) |
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

## Clienti

Percorso base: `/giving/customers`

Estende `GenericCrudController` con le rotte CRUD: `getAll`, `delete`. Collega le persone ai loro record cliente presso il gateway di pagamento.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i clienti |
| GET | `/:id` | JWT | Donations.ViewSummary o il proprio record | Ottieni un cliente tramite ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary o il proprio record | Ottieni gli abbonamenti del gateway di un cliente |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un cliente |

## Abbonamenti

Percorso base: `/giving/subscriptions`

Gestisce gli abbonamenti a donazioni ricorrenti. Non sono abilitate rotte CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti gli abbonamenti |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un abbonamento tramite ID |
| POST | `/` | JWT | Donations.Edit o abbonamento proprio | Aggiorna gli abbonamenti presso il gateway di pagamento |
| DELETE | `/:id` | JWT | Donations.Edit o abbonamento proprio | Annulla un abbonamento e rimuovilo dal database. Corpo: `{ provider, reason }` |

## Fondi degli abbonamenti

Percorso base: `/giving/subscriptionfunds`

Tiene traccia della ripartizione sui fondi per gli abbonamenti ricorrenti. Non sono abilitate rotte CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View o abbonamento proprio | Elenca i fondi degli abbonamenti. Filtra con `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un fondo di abbonamento tramite ID |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un fondo di abbonamento |
| DELETE | `/subscription/:id` | JWT | Donations.Edit o abbonamento proprio | Elimina tutti i fondi di un abbonamento |

## Metodi di pagamento

Percorso base: `/giving/paymentmethods`

Gestisce i metodi di pagamento memorizzati (carte, conti bancari) tramite le API dei gateway di pagamento. Non sono abilitate rotte CRUD di base; tutti gli endpoint sono personalizzati.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View o il proprio personId | Ottieni tutti i metodi di pagamento memorizzati di una persona (carte, conti bancari) |
| POST | `/addcard` | JWT | — | Collega un metodo di pagamento con carta. Corpo: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit o il proprio personId | Aggiorna i dati della carta. Corpo: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit o il proprio personId | Crea un SetupIntent ACH di Stripe per il collegamento del conto bancario. Corpo: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Pubblico | — | Crea un SetupIntent ACH anonimo per le donazioni di ospiti. Corpo: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit o il proprio personId | Aggiunge un conto bancario tramite token (obsoleto; usa `ach-setup-intent`). Corpo: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit o il proprio personId | Aggiorna i dati del conto bancario. Corpo: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit o il proprio cliente | Verifica un conto bancario con micro-depositi. Corpo: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit o il proprio cliente | Elimina un metodo di pagamento (carta o conto bancario) |

## Registro eventi

Percorso base: `/giving/eventLog`

Estende `GenericCrudController` con le rotte CRUD: `getById`, `getAll`, `post`, `delete`. Tiene traccia degli eventi webhook dei gateway di pagamento per audit e deduplicazione.

| Metodo | Percorso | Auth | Permesso | Descrizione |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Elenca tutti i registri eventi |
| GET | `/:id` | JWT | Donations.ViewSummary | Ottieni un registro evento tramite ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ottieni i registri eventi filtrati per tipo di evento |
| POST | `/` | JWT | Donations.Edit | Crea o aggiorna registri eventi |
| DELETE | `/:id` | JWT | Donations.Edit | Elimina un registro evento |

## Pagine correlate

- [Endpoint Membership](./membership) — Persone, chiese, gruppi, ruoli e permessi
- [Autenticazione e permessi](./authentication) — Flusso di accesso, JWT, OAuth, modello dei permessi
- [Struttura del modulo](../module-structure) — Schemi di organizzazione del codice
