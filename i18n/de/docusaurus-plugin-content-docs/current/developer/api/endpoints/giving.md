---
title: "Giving-Endpoints"
---

# Giving-Endpoints

<div class="article-intro">

Das Giving-Modul verwaltet Spenden, Fonds, Zahlungsabwicklung, Abos und zugehörige Finanzoperationen. Es unterstützt mehrere Payment-Gateways (Stripe, PayPal), verarbeitet einmalige und wiederkehrende Spenden, verfolgt Spendenstapel und bietet Webhook-Verarbeitung für asynchrone Zahlungsereignisse.

</div>

**Basispfad:** `/giving`

## Spenden

Basispfad: `/giving/donations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigene personId | Alle Spenden auflisten. Filter nach `?batchId=` oder `?personId=` |
| GET | `/:id` | JWT | Donations.View | Spende nach ID abrufen |
| GET | `/my` | JWT | — | Spenden des aktuellen Benutzers abrufen |
| GET | `/summary` | JWT | Donations.ViewSummary | Spendenzusammenfassung abrufen. Filter nach `?startDate=&endDate=&type=`. Nutzen Sie `type=person` für Aufschlüsselung nach Person |
| GET | `/testEmail` | Öffentlich | — | Test-E-Mail senden (Entwicklung/Debugging) |
| POST | `/` | JWT | Donations.Edit | Spenden erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Donations.Edit | Spende löschen |

### Beispiel: Spenden nach Stapel auflisten

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

### Beispiel: Spendenzusammenfassung abrufen

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

## Spendenstapel

Basispfad: `/giving/donationbatches`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Der Delete-Vorgang entfernt auch alle Spenden im Stapel.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Spendenstapel auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Spendenstapel nach ID abrufen |
| POST | `/` | JWT | Donations.Edit | Spendenstapel erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Stapel und alle seine Spenden löschen |

## Spenden

Basispfad: `/giving/donate`

Verarbeitet den öffentlichen Spendenfluss, einschließlich Gebühren, Abos, Webhooks und Gebührenberechnung. Keine CRUD-Basisrouten sind aktiviert; alle Endpoints sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Öffentlich | — | Verfügbare Payment-Gateways für eine Kirche (nur öffentliche Schlüssel) abrufen |
| POST | `/client-token` | JWT | — | Client-Token für Gateway-Initialisierung generieren |
| POST | `/create-order` | JWT | — | Zahlungsauftrag erstellen (PayPal-ähnliches Checkout) |
| POST | `/charge` | JWT | — | Einmalige Spendenlast verarbeiten |
| POST | `/subscribe` | JWT | — | Wiederkehrend Spendenabo erstellen |
| POST | `/log` | Öffentlich | — | Spende protokollieren. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Öffentlich | — | Zahlungswebhook-Ereignisse empfangen (Stripe, PayPal). Erfordert `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Stripe-Ereignisse für einen Datumsbereich erneut wiedergeben. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Öffentlich | — | Transaktionsgebühren berechnen. Body: `{ type, provider, gatewayId, amount, currency }`. Erfordert `?churchId=` |
| POST | `/captcha-verify` | Öffentlich | — | reCAPTCHA-Token verifizieren. Body: `{ token }` |

### Beispiel: Spendengebühr verarbeiten

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

### Beispiel: Wiederkehrend Spendenabo erstellen

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

## Fonds

Basispfad: `/giving/funds`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Die `view`-Berechtigung ist `null` (keine Berechtigung erforderlich zum Anzeigen von Fonds).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Fonds auflisten |
| GET | `/:id` | JWT | — | Fonds nach ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Alle Fonds für eine bestimmte Kirche (öffentlich) abrufen |
| POST | `/` | JWT | Donations.Edit | Fonds erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Fonds löschen |

## Fonds-Spenden

Basispfad: `/giving/funddonations`

Verfolgt, wie einzelne Spenden auf Fonds verteilt werden. Keine CRUD-Basisrouten sind aktiviert; alle Endpoints sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Fonds-Spenden auflisten. Filter nach `?donationId=`, `?personId=`, `?fundId=` oder `?fundName=`. Optionally add `?startDate=&endDate=` für Datumsfilterung |
| GET | `/:id` | JWT | Donations.View | Fonds-Spende nach ID abrufen |
| GET | `/my` | JWT | — | Fonds-Spenden des aktuellen Benutzers abrufen |
| POST | `/` | JWT | Donations.Edit | Fonds-Spenden erstellen oder aktualisieren (Stapel) |
| DELETE | `/:id` | JWT | Donations.Edit | Fonds-Spende löschen |

## Gateways

Basispfad: `/giving/gateways`

Verwaltet Payment-Gateway-Konfigurationen (Stripe, PayPal, etc.). Keine CRUD-Basisrouten sind aktiviert; alle Endpoints sind benutzerdefiniert. Gateway-Geheimnisse sind im Ruhezustand verschlüsselt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gateways für die Kirche auflisten |
| GET | `/:id` | JWT | Settings.Edit | Gateway nach ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Gateways für eine Kirche abrufen (nur öffentliche Schlüssel) |
| GET | `/configured/:churchId` | Öffentlich | — | Überprüfen, ob eine Kirche ein konfiguriertes Payment-Gateway hat |
| POST | `/` | JWT | Settings.Edit | Gateways erstellen oder aktualisieren (verschlüsselt Schlüssel, stellt Webhooks und Produkte bereit) |
| PATCH | `/:id` | JWT | Settings.Edit | Gateway teilweise aktualisieren |
| DELETE | `/:id` | JWT | Settings.Edit | Gateway löschen (entfernt auch seine Webhooks) |

### Beispiel: Gateway-Konfiguration überprüfen

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Kunden

Basispfad: `/giving/customers`

Erweitert `GenericCrudController` mit CRUD-Routen: `getAll`, `delete`. Verknüpft Personen mit ihren Payment-Gateway-Kundendatensätzen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Kunden auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary oder eigener Datensatz | Kunde nach ID abrufen |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary oder eigener Datensatz | Gateway-Abos für einen Kunden abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Kunden löschen |

## Abos

Basispfad: `/giving/subscriptions`

Verwaltet wiederkehrende Spendenabos. Keine CRUD-Basisrouten sind aktiviert; alle Endpoints sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Abos auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Abo nach ID abrufen |
| POST | `/` | JWT | Donations.Edit oder eigenes Abo | Abos mit dem Payment-Gateway aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit oder eigenes Abo | Abo kündigen und aus Datenbank entfernen. Body: `{ provider, reason }` |

## Abo-Fonds

Basispfad: `/giving/subscriptionfunds`

Verfolgt Fondsallokationen für wiederkehrende Abos. Keine CRUD-Basisrouten sind aktiviert; alle Endpoints sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigenes Abo | Abo-Fonds auflisten. Filter nach `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Abo-Fonds nach ID abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Abo-Fonds löschen |
| DELETE | `/subscription/:id` | JWT | Donations.Edit oder eigenes Abo | Alle Fonds für ein Abo löschen |

## Zahlungsmethoden

Basispfad: `/giving/paymentmethods`

Verwaltet gespeicherte Zahlungsmethoden (Karten, Bankkonten) über Payment-Gateway-APIs. Keine CRUD-Basisrouten sind aktiviert; alle Endpoints sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View oder eigene personId | Alle gespeicherten Zahlungsmethoden für eine Person abrufen (Karten, Bankkonten) |
| POST | `/addcard` | JWT | — | Kartenzahlungsmethode befestigen. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit oder eigene personId | Kartendetails aktualisieren. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit oder eigene personId | Stripe ACH SetupIntent für Bankkontoverknüpfung erstellen. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Öffentlich | — | Anonymen ACH SetupIntent für Gastspen den erstellen. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit oder eigene personId | Bankkonto via Token hinzufügen (veraltet; nutzen Sie `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit oder eigene personId | Bankkontodaten aktualisieren. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit oder eigener Kunde | Bankkonto mit Mikro-Einzahlungen verifizieren. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit oder eigener Kunde | Zahlungsmethode löschen (Karte oder Bankkonto) |

## Event-Protokoll

Basispfad: `/giving/eventLog`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Verfolgt Payment-Gateway-Webhook-Ereignisse für Audit und Deduplizierung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Event-Protokolle auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Event-Protokoll nach ID abrufen |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Event-Protokolle nach Ereignistyp filtern |
| POST | `/` | JWT | Donations.Edit | Event-Protokolle erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Event-Protokoll löschen |

## Verwandte Seiten

- [Membership-Endpoints](./membership) — Personen, Kirchen, Gruppen, Rollen und Berechtigungen
- [Authentifizierung & Berechtigungen](./authentication) — Login-Flow, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
