---
title: "Giveldes slutpunkter"
description: "Reference for Giving-API-endpoints i ChurchApps: donationer, batches, gateways, abonnementer og betalingsmetoder, med godkendelses- og tilladelsesregler."
---

# Giveldes slutpunkter

<div class="article-intro">

Giveldes modulet administrerer donationer, fonde, betalings behandling, abonnementer og relaterede finansielle operationer. Det understøtter flere betalings gateways (Stripe, PayPal), håndterer engangsgaver og tilbagevendende donationer, sporer donationsbatches og giver webhook behandling til asynkron betalings begivenheder.

</div>

**Basesti:** `/giving`

## Donationer

Basesti: `/giving/donations`

| Metode | Sti | Auth | Tilladelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View eller egen personId | List alle donationer. Filtrer efter `?batchId=` eller `?personId=` |
| GET | `/:id` | JWT | Donations.View | Få en donation efter ID |
| GET | `/my` | JWT | — | Få nuværende brugers donationer |
| GET | `/summary` | JWT | Donations.ViewSummary | Få donations opsummering. Filtrer efter `?startDate=&endDate=&type=`. Brug `type=person` til per-person opdeling |
| POST | `/` | JWT | Donations.Edit | Opret eller opdater donationer (batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Slet en donation |

## Fonde

Basesti: `/giving/funds`

Udvider `GenericCrudController` med CRUD ruter: `getById`, `getAll`, `post`, `delete`. `view` tilladelsen er `null` (ingen tilladelse påkrævet til at se fonde).

| Metode | Sti | Auth | Tilladelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle fonde |
| GET | `/:id` | JWT | — | Få en fond efter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Få alle fonde til en bestemt kirke (offentlig) |
| POST | `/` | JWT | Donations.Edit | Opret eller opdater fonde |
| DELETE | `/:id` | JWT | Donations.Edit | Slet en fond |

## Gateways

Basesti: `/giving/gateways`

Administrerer betalings gateway konfigurationer (Stripe, PayPal osv). Ingen base CRUD ruter er aktiveret; alle slutpunkter er tilpassede. Gateway hemmeligheder er krypteret i hvile.

| Metode | Sti | Auth | Tilladelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gateways til kirken |
| GET | `/:id` | JWT | Settings.Edit | Få en gateway efter ID |
| GET | `/churchId/:churchId` | Offentlig | — | Få gateways til en kirke (kun offentlige nøgler) |
| GET | `/configured/:churchId` | Offentlig | — | Tjek om en kirke har en konfigureret betalings gateway |
| POST | `/` | JWT | Settings.Edit | Opret eller opdater gateways (krypterer nøgler, leverer webhooks og produkter) |
| PATCH | `/:id` | JWT | Settings.Edit | Delvist opdater en gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Slet en gateway (fjerner også dens webhooks) |

## Relaterede sider

- [Medlemskab slutpunkter](./membership.md) — Mennesker, kirker, grupper, roller og tilladelser
- [Godkendelse & Tilladelser](./authentication.md) -- Login flow, JWT, OAuth, tilladels model
- [Modul struktur](../module-structure.md) -- Kode organiserings mønstre
