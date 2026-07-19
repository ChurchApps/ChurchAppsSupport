---
title: "Endpoint di Donazione"
---

# Endpoint di Donazione

<div class="article-intro">

Il modulo Giving gestisce le donazioni, i fondi, l'elaborazione dei pagamenti, gli abbonamenti e le operazioni finanziarie correlate. Supporta più gateway di pagamento (Stripe, PayPal), gestisce donazioni una tantum e ricorrenti, traccia i lotti di donazioni e fornisce l'elaborazione dei webhook per gli eventi di pagamento asincroni.

</div>

**Percorso di base:** `/giving`

## Donazioni

Percorso di base: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own personId | Elenca tutte le donazioni |
| GET | `/:id` | JWT | Donations.View | Ottenere una donazione per ID |
| GET | `/my` | JWT | — | Ottieni le donazioni dell'utente corrente |
| GET | `/summary` | JWT | Donations.ViewSummary | Ottieni il riepilogo delle donazioni |
| POST | `/` | JWT | Donations.Edit | Creare o aggiornare donazioni |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminare una donazione |

## Fondi

Percorso di base: `/giving/funds`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Elenca tutti i fondi |
| GET | `/:id` | JWT | — | Ottenere un fondo per ID |
| GET | `/churchId/:churchId` | Public | — | Ottieni tutti i fondi per una chiesa specifica |
| POST | `/` | JWT | Donations.Edit | Creare o aggiornare fondi |
| DELETE | `/:id` | JWT | Donations.Edit | Eliminare un fondo |

## Pagine Correlate

- [Membership Endpoints](./membership)
- [Authentication & Permissions](./authentication)
- [Module Structure](../module-structure)
