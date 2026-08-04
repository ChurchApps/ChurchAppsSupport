---
title: "Giving-Endpunkte"
---

# Giving-Endpunkte

<div class="article-intro">

Das Giving-Modul verwaltet Spenden, Fonds, Zahlungsabwicklung, Abonnements und verwandte Finanzvorgänge. Es unterstützt mehrere Zahlungs-Gateways (Stripe, PayPal), verarbeitet einmalige und wiederkehrende Spenden, verfolgt Spendenstapel (Batches) und bietet Webhook-Verarbeitung für asynchrone Zahlungsereignisse.

</div>

**Basispfad:** `/giving`

## Spenden (Donations)

Basispfad: `/giving/donations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigene personId | Alle Spenden auflisten. Filterbar über `?batchId=` oder `?personId=` |
| GET | `/:id` | JWT | Donations.View | Eine Spende anhand der ID abrufen |
| GET | `/my` | JWT | — | Spenden des aktuellen Benutzers abrufen |
| GET | `/summary` | JWT | Donations.ViewSummary | Spendenübersicht abrufen. Filterbar über `?startDate=&endDate=&type=`. Mit `type=person` für eine Aufschlüsselung nach Person |
| GET | `/testEmail` | Öffentlich | — | Eine Test-E-Mail senden (Entwicklung/Debugging) |
| POST | `/` | JWT | Donations.Edit | Spenden erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Eine Spende löschen |

### Beispiel: Spenden nach Batch auflisten

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

### Beispiel: Spendenübersicht abrufen

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

## Spendenstapel (Donation Batches)

Basispfad: `/giving/donationbatches`

Erweitert `GenericCrudController` um die CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Der Löschvorgang entfernt außerdem alle Spenden innerhalb des Stapels.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Spendenstapel auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Einen Spendenstapel anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit | Spendenstapel erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Stapel und alle seine Spenden löschen |

## Spenden (Donate)

Basispfad: `/giving/donate`

Steuert den öffentlich zugänglichen Spendenablauf einschließlich Belastungen, Abonnements, Webhooks und Gebührenberechnungen. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Öffentlich | — | Verfügbare Zahlungs-Gateways einer Kirche abrufen (nur öffentliche Schlüssel) |
| POST | `/client-token` | JWT | — | Ein Client-Token zur Gateway-Initialisierung erzeugen |
| POST | `/create-order` | JWT | — | Eine Zahlungsbestellung erstellen (PayPal-artiger Checkout) |
| POST | `/charge` | JWT | — | Eine einmalige Spendenbelastung verarbeiten |
| POST | `/subscribe` | JWT | — | Ein wiederkehrendes Spendenabonnement erstellen |
| POST | `/log` | Öffentlich | — | Eine Spende protokollieren. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Öffentlich | — | Zahlungs-Webhook-Ereignisse empfangen (Stripe, PayPal). Erfordert `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Stripe-Ereignisse für einen Datumsbereich erneut abspielen. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Öffentlich | — | Transaktionsgebühren berechnen. Body: `{ type, provider, gatewayId, amount, currency }`. Erfordert `?churchId=` |
| POST | `/captcha-verify` | Öffentlich | — | reCAPTCHA-Token verifizieren. Body: `{ token }` |

### Beispiel: Eine Spendenbelastung verarbeiten

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

### Beispiel: Ein wiederkehrendes Abonnement erstellen

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

## Fonds (Funds)

Basispfad: `/giving/funds`

Erweitert `GenericCrudController` um die CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Die `view`-Berechtigung ist `null` (für das Ansehen von Fonds ist keine Berechtigung erforderlich).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Fonds auflisten |
| GET | `/:id` | JWT | — | Einen Fonds anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Alle Fonds einer bestimmten Kirche abrufen (öffentlich) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Öffentlich | — | Die Spendensumme eines Fonds abrufen: `{ fundId, totalAmount, donationCount }`. Treibt das `campaignProgress`-Element des Website-Builders an |
| POST | `/` | JWT | Donations.Edit | Fonds erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Fonds löschen |

## Fonds-Spenden (Fund Donations)

Basispfad: `/giving/funddonations`

Verfolgt, wie einzelne Spenden auf Fonds aufgeteilt werden. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Fonds-Spenden auflisten. Filterbar über `?donationId=`, `?personId=`, `?fundId=` oder `?fundName=`. Optional zusätzlich `?startDate=&endDate=` für die Datumsfilterung |
| GET | `/:id` | JWT | Donations.View | Eine Fonds-Spende anhand der ID abrufen |
| GET | `/my` | JWT | — | Fonds-Spenden des aktuellen Benutzers abrufen |
| POST | `/` | JWT | Donations.Edit | Fonds-Spenden erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Eine Fonds-Spende löschen |

## Gateways

Basispfad: `/giving/gateways`

Verwaltet Konfigurationen von Zahlungs-Gateways (Stripe, PayPal usw.). Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind benutzerdefiniert. Gateway-Geheimnisse werden im Ruhezustand verschlüsselt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gateways der Kirche auflisten |
| GET | `/:id` | JWT | Settings.Edit | Ein Gateway anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Gateways einer Kirche abrufen (nur öffentliche Schlüssel) |
| GET | `/configured/:churchId` | Öffentlich | — | Prüfen, ob eine Kirche über ein konfiguriertes Zahlungs-Gateway verfügt |
| POST | `/` | JWT | Settings.Edit | Gateways erstellen oder aktualisieren (verschlüsselt Schlüssel, richtet Webhooks und Produkte ein) |
| PATCH | `/:id` | JWT | Settings.Edit | Ein Gateway teilweise aktualisieren |
| DELETE | `/:id` | JWT | Settings.Edit | Ein Gateway löschen (entfernt auch dessen Webhooks) |

### Beispiel: Gateway-Konfiguration prüfen

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Kunden (Customers)

Basispfad: `/giving/customers`

Erweitert `GenericCrudController` um die CRUD-Routen: `getAll`, `delete`. Verknüpft Personen mit ihren Kundendatensätzen beim Zahlungs-Gateway.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Kunden auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary oder eigener Datensatz | Einen Kunden anhand der ID abrufen |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary oder eigener Datensatz | Gateway-Abonnements eines Kunden abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Kunden löschen |

## Abonnements (Subscriptions)

Basispfad: `/giving/subscriptions`

Verwaltet wiederkehrende Spendenabonnements. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Abonnements auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Abonnement anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit oder eigenes Abonnement | Abonnements beim Zahlungs-Gateway aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit oder eigenes Abonnement | Ein Abonnement kündigen und aus der Datenbank entfernen. Body: `{ provider, reason }` |

## Abonnement-Fonds (Subscription Funds)

Basispfad: `/giving/subscriptionfunds`

Verfolgt Fondszuweisungen für wiederkehrende Abonnements. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigenes Abonnement | Abonnement-Fonds auflisten. Filterbar über `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Einen Abonnement-Fonds anhand der ID abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Abonnement-Fonds löschen |
| DELETE | `/subscription/:id` | JWT | Donations.Edit oder eigenes Abonnement | Alle Fonds eines Abonnements löschen |

## Zahlungsmethoden (Payment Methods)

Basispfad: `/giving/paymentmethods`

Verwaltet gespeicherte Zahlungsmethoden (Karten, Bankkonten) über die APIs der Zahlungs-Gateways. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View oder eigene personId | Alle gespeicherten Zahlungsmethoden einer Person abrufen (Karten, Bankkonten) |
| POST | `/addcard` | JWT | — | Eine Karten-Zahlungsmethode hinzufügen. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit oder eigene personId | Kartendetails aktualisieren. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit oder eigene personId | Eine Stripe-ACH-SetupIntent für die Verknüpfung eines Bankkontos erstellen. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Öffentlich | — | Eine anonyme ACH-SetupIntent für Gastspenden erstellen. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit oder eigene personId | Ein Bankkonto per Token hinzufügen (veraltet; verwenden Sie `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit oder eigene personId | Bankkontodetails aktualisieren. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit oder eigener Kunde | Ein Bankkonto per Mikroeinzahlungen verifizieren. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit oder eigener Kunde | Eine Zahlungsmethode löschen (Karte oder Bankkonto) |

## Ereignisprotokoll (Event Log)

Basispfad: `/giving/eventLog`

Erweitert `GenericCrudController` um die CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Verfolgt Webhook-Ereignisse der Zahlungs-Gateways für Auditing und Deduplizierung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Ereignisprotokolle auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Ereignisprotokoll anhand der ID abrufen |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ereignisprotokolle nach Ereignistyp gefiltert abrufen |
| POST | `/` | JWT | Donations.Edit | Ereignisprotokolle erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Ein Ereignisprotokoll löschen |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Kirchen, Gruppen, Rollen und Berechtigungen
- [Authentifizierung & Berechtigungen](./authentication) — Anmeldeablauf, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
