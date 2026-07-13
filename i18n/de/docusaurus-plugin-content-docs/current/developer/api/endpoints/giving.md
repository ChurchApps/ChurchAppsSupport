---
title: "Giving-Endpunkte"
---

# Giving-Endpunkte

<div class="article-intro">

Das Giving-Modul verwaltet Spenden, Fonds, Zahlungsabwicklung, Abonnements und verwandte Finanzoperationen. Es unterstützt mehrere Zahlungs-Gateways (Stripe, PayPal), verarbeitet einmalige und wiederkehrende Spenden, verfolgt Spendenbatches und bietet Webhook-Verarbeitung für asynchrone Zahlungsereignisse.

</div>

**Basispfad:** `/giving`

## Spenden

Basispfad: `/giving/donations`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Donations.View oder eigene personId | Auflisten aller Spenden. Filter nach `?batchId=` oder `?personId=` |
| GET | `/:id` | JWT | Donations.View | Eine Spende nach ID abrufen |
| GET | `/my` | JWT | — | Spenden des aktuellen Benutzers abrufen |
| GET | `/summary` | JWT | Donations.ViewSummary | Spendenzusammenfassung abrufen. Filter nach `?startDate=&endDate=&type=`. Verwenden Sie `type=person` für Aufschlüsselung pro Person |
| GET | `/testEmail` | Public | — | Test-E-Mail senden (Entwicklung/Debugging) |
| POST | / | JWT | Donations.Edit | Erstellen oder aktualisieren Sie Spenden (Batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Löschen Sie eine Spende |

### Beispiel: Auflisten von Spenden nach Batch

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

## Spendenbatches

Basispfad: `/giving/donationbatches`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Der Löschvorgang entfernt auch alle Spenden innerhalb des Batch.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Donations.ViewSummary | Auflisten aller Spendenbatches |
| GET | `/:id` | JWT | Donations.ViewSummary | Einen Spendenbatch nach ID abrufen |
| POST | / | JWT | Donations.Edit | Erstellen oder aktualisieren Sie Spendenbatches |
| DELETE | `/:id` | JWT | Donations.Edit | Löschen Sie einen Batch und all seine Spenden |

## Donate

Basispfad: `/giving/donate`

Verwaltet den öffentlich zugänglichen Spendendfluss einschließlich Gebühren, Abonnements, Webhooks und Gebührenberechnungen. Keine Standard-CRUD-Routen sind aktiviert; alle Endpunkte sind benutzerdefiniert.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Abrufen verfügbarer Zahlungs-Gateways für eine Kirche (nur öffentliche Schlüssel) |
| POST | `/client-token` | JWT | — | Generieren Sie ein Client-Token für die Gateway-Initialisierung |
| POST | `/create-order` | JWT | — | Erstellen Sie eine Zahlungsbestellung (PayPal-Stil-Checkout) |
| POST | `/charge` | JWT | — | Verarbeiten Sie eine einmalige Spendenzahlung |
| POST | `/subscribe` | JWT | — | Erstellen Sie ein wiederkehrend Spenden-Abonnement |
| POST | `/log` | Public | — | Protokollieren Sie eine Spende. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Empfangen Sie Zahlungs-Webhook-Ereignisse (Stripe, PayPal). Erfordert `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Wiedergabe von Stripe-Ereignissen für einen Datumsbereich. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Berechnen Sie Transaktionsgebühren. Body: `{ type, provider, gatewayId, amount, currency }`. Erfordert `?churchId=` |
| POST | `/captcha-verify` | Public | — | Überprüfen Sie das reCAPTCHA-Token. Body: `{ token }` |

### Beispiel: Verarbeiten Sie eine Spendenzahlung

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

### Beispiel: Erstellen Sie ein wiederkehrendes Abonnement

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

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Die Berechtigung `view` ist 
ull (keine Berechtigung erforderlich zum Anzeigen von Fonds).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | — | Auflisten aller Fonds |
| GET | `/:id` | JWT | — | Einen Fonds nach ID abrufen |
| GET | `/churchId/:churchId` | Public | — | Abrufen aller Fonds für eine bestimmte Kirche (öffentlich) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Abrufen des Spendentotals eines Fonds: `{ fundId, totalAmount, donationCount }`. Betreibt das Element `campaignProgress` des Website-Builders |
| POST | / | JWT | Donations.Edit | Erstellen oder aktualisieren Sie Fonds |
| DELETE | `/:id` | JWT | Donations.Edit | Löschen Sie einen Fonds |

## Fonds-Spenden

Basispfad: `/giving/funddonations`

Verfolgt, wie einzelne Spenden auf Fonds verteilt werden. Keine Standard-CRUD-Routen sind aktiviert; alle Endpunkte sind benutzerdefiniert.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Donations.View | Auflisten von Fonds-Spenden. Filter nach `?donationId=`, `?personId=`, `?fundId=` oder `?fundName=`. Optional hinzufügen `?startDate=&endDate=` für Datumsfil Terbilir |
| GET | `/:id` | JWT | Donations.View | Eine Fonds-Spende nach ID abrufen |
| GET | `/my` | JWT | — | Fonds-Spenden des aktuellen Benutzers abrufen |
| POST | / | JWT | Donations.Edit | Erstellen oder aktualisieren Sie Fonds-Spenden (Batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Löschen Sie eine Fonds-Spende |

## Gateways

Basispfad: `/giving/gateways`

Verwaltet Zahlungs-Gateway-Konfigurationen (Stripe, PayPal, etc.). Keine Standard-CRUD-Routen sind aktiviert; alle Endpunkte sind benutzerdefiniert. Gateway-Geheimnisse sind in Ruhe verschlüsselt.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | — | Auflisten aller Gateways für die Kirche |
| GET | `/:id` | JWT | Settings.Edit | Ein Gateway nach ID abrufen |
| GET | `/churchId/:churchId` | Public | — | Abrufen von Gateways für eine Kirche (nur öffentliche Schlüssel) |
| GET | `/configured/:churchId` | Public | — | Überprüfen Sie, ob eine Kirche ein konfiguriertes Zahlungs-Gateway hat |
| POST | / | JWT | Settings.Edit | Erstellen oder aktualisieren Sie Gateways (verschlüsselt Schlüssel, stellt Webhooks und Produkte bereit) |
| PATCH | `/:id` | JWT | Settings.Edit | Gateways teilweise aktualisieren |
| DELETE | `/:id` | JWT | Settings.Edit | Löschen Sie ein Gateway (entfernt auch dessen Webhooks) |

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

Erweitert `GenericCrudController` mit CRUD-Routen: `getAll`, `delete`. Verbindet Personen mit ihren Zahlungs-Gateway-Kundendaten.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Donations.ViewSummary | Auflisten aller Kunden |
| GET | `/:id` | JWT | Donations.ViewSummary oder eigener Datensatz | Einen Kunden nach ID abrufen |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary oder eigener Datensatz | Abrufen von Gateway-Abonnements für einen Kunden |
| DELETE | `/:id` | JWT | Donations.Edit | Löschen Sie einen Kunden |

## Abonnements

Basispfad: `/giving/subscriptions`

Verwaltet wiederkehrende Spenden-Abonnements. Keine Standard-CRUD-Routen sind aktiviert; alle Endpunkte sind benutzerdefiniert.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Donations.ViewSummary | Auflisten aller Abonnements |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Abonnement nach ID abrufen |
| POST | / | JWT | Donations.Edit oder eigenes Abonnement | Aktualisieren Sie Abonnements mit dem Zahlungs-Gateway |
| DELETE | `/:id` | JWT | Donations.Edit oder eigenes Abonnement | Kündigen Sie ein Abonnement und entfernen Sie es aus der Datenbank. Body: `{ provider, reason }` |

## Abonnement-Fonds

Basispfad: `/giving/subscriptionfunds`

Verfolgt Fonds-Zuweisungen für wiederkehrende Abonnements. Keine Standard-CRUD-Routen sind aktiviert; alle Endpunkte sind benutzerdefiniert.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Donations.View oder eigenes Abonnement | Auflisten von Abonnement-Fonds. Filter nach `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Abonnement-Fonds nach ID abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Löschen Sie einen Abonnement-Fonds |
| DELETE | `/subscription/:id` | JWT | Donations.Edit oder eigenes Abonnement | Löschen Sie alle Fonds für ein Abonnement |

## Zahlungsmethoden

Basispfad: `/giving/paymentmethods`

Verwaltet gespeicherte Zahlungsmethoden (Karten, Bankkonten) über Zahlungs-Gateway-APIs. Keine Standard-CRUD-Routen sind aktiviert; alle Endpunkte sind benutzerdefiniert.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View oder eigene personId | Abrufen aller gespeicherten Zahlungsmethoden für eine Person (Karten, Bankkonten) |
| POST | `/addcard` | JWT | — | Hängen Sie eine Kartenzahlungsmethode an. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit oder eigene personId | Aktualisieren Sie Kartendaten. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit oder eigene personId | Erstellen Sie eine Stripe ACH SetupIntent für die Bankkontoverbindung. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Erstellen Sie einen anonymen ACH SetupIntent für Gastspenden. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit oder eigene personId | Fügen Sie ein Bankkonto über Token hinzu (veraltet; verwenden Sie `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit oder eigene personId | Aktualisieren Sie Bankkontodetails. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit oder eigener Kunde | Überprüfen Sie ein Bankkonto mit Mikro-Einzahlungen. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit oder eigener Kunde | Löschen Sie eine Zahlungsmethode (Karte oder Bankkonto) |

## Ereignisprotokoll

Basispfad: `/giving/eventLog`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Verfolgt Zahlungs-Gateway-Webhook-Ereignisse zur Revisionierung und Deduplication.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Donations.ViewSummary | Auflisten aller Ereignisprotokolle |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Ereignisprotokoll nach ID abrufen |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ereignisprotokolle nach Ereignistyp filtern |
| POST | / | JWT | Donations.Edit | Erstellen oder aktualisieren Sie Ereignisprotokolle |
| DELETE | `/:id` | JWT | Donations.Edit | Löschen Sie ein Ereignisprotokoll |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Kirchen, Gruppen, Rollen und Berechtigungen
- [Authentifizierung & Berechtigungen](./authentication) — Anmeldefluss, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Codeorganisationsmuster
