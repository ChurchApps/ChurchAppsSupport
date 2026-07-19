---
title: "Spenden-Endpunkte"
---

# Spenden-Endpunkte

<div class="article-intro">

Das Giving-Modul verwaltet Spenden, Fonds, Zahlungsabwicklung, Abonnements und damit verbundene finanzielle Vorgänge. Es unterstützt mehrere Zahlungs-Gateways (Stripe, PayPal), verarbeitet einmalige und wiederkehrende Spenden, verfolgt Spenden-Batches und stellt die Webhook-Verarbeitung für asynchrone Zahlungsereignisse bereit.

</div>

**Basispfad:** `/giving`

## Spenden

Basispfad: `/giving/donations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigene personId | Alle Spenden auflisten. Mit `?batchId=` oder `?personId=` filtern |
| GET | `/:id` | JWT | Donations.View | Eine Spende anhand der ID abrufen |
| GET | `/my` | JWT | — | Spenden des aktuellen Benutzers abrufen |
| GET | `/summary` | JWT | Donations.ViewSummary | Spendenzusammenfassung abrufen. Filter mit `?startDate=&endDate=&type=`. `type=person` für eine Aufschlüsselung pro Person verwenden |
| GET | `/testEmail` | Öffentlich | — | Eine Test-E-Mail senden (Entwicklung/Fehlersuche) |
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

## Spenden-Batches

Basispfad: `/giving/donationbatches`

Erweitert `GenericCrudController` um die CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Das Löschen entfernt auch alle Spenden innerhalb des Batches.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Spenden-Batches auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Einen Spenden-Batch anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit | Spenden-Batches erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Batch und alle seine Spenden löschen |

## Spenden abgeben

Basispfad: `/giving/donate`

Behandelt den öffentlichen Spendenablauf einschließlich Zahlungen, Abonnements, Webhooks und Gebührenberechnungen. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Öffentlich | — | Verfügbare Zahlungs-Gateways für eine Kirche abrufen (nur öffentliche Schlüssel) |
| POST | `/client-token` | JWT | — | Ein Client-Token zur Gateway-Initialisierung generieren |
| POST | `/create-order` | JWT | — | Eine Zahlungsbestellung erstellen (PayPal-artiger Checkout) |
| POST | `/charge` | JWT | — | Eine einmalige Spendenzahlung verarbeiten |
| POST | `/subscribe` | JWT | — | Ein wiederkehrendes Spendenabonnement erstellen |
| POST | `/log` | Öffentlich | — | Eine Spende protokollieren. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Öffentlich | — | Zahlungs-Webhook-Ereignisse empfangen (Stripe, PayPal). Erfordert `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Stripe-Ereignisse für einen Zeitraum erneut abspielen. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Öffentlich | — | Transaktionsgebühren berechnen. Body: `{ type, provider, gatewayId, amount, currency }`. Erfordert `?churchId=` |
| POST | `/captcha-verify` | Öffentlich | — | reCAPTCHA-Token überprüfen. Body: `{ token }` |

### Beispiel: Eine Spendenzahlung verarbeiten

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

## Fonds

Basispfad: `/giving/funds`

Erweitert `GenericCrudController` um die CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Die Berechtigung `view` ist `null` (keine Berechtigung erforderlich, um Fonds anzuzeigen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Fonds auflisten |
| GET | `/:id` | JWT | — | Einen Fonds anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Alle Fonds für eine bestimmte Kirche abrufen (öffentlich) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Öffentlich | — | Die Spendensumme eines Fonds abrufen: `{ fundId, totalAmount, donationCount }`. Treibt das `campaignProgress`-Element des Website-Builders an |
| POST | `/` | JWT | Donations.Edit | Fonds erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Fonds löschen |

## Fonds-Spenden

Basispfad: `/giving/funddonations`

Verfolgt, wie einzelne Spenden auf Fonds aufgeteilt werden. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Fonds-Spenden auflisten. Mit `?donationId=`, `?personId=`, `?fundId=` oder `?fundName=` filtern. Optional `?startDate=&endDate=` für die Datumsfilterung hinzufügen |
| GET | `/:id` | JWT | Donations.View | Eine Fonds-Spende anhand der ID abrufen |
| GET | `/my` | JWT | — | Fonds-Spenden des aktuellen Benutzers abrufen |
| POST | `/` | JWT | Donations.Edit | Fonds-Spenden erstellen oder aktualisieren (Batch) |
| DELETE | `/:id` | JWT | Donations.Edit | Eine Fonds-Spende löschen |

## Gateways

Basispfad: `/giving/gateways`

Verwaltet Konfigurationen für Zahlungs-Gateways (Stripe, PayPal usw.). Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind eigene Implementierungen. Gateway-Geheimnisse werden im Ruhezustand verschlüsselt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gateways der Kirche auflisten |
| GET | `/:id` | JWT | Settings.Edit | Ein Gateway anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Gateways für eine Kirche abrufen (nur öffentliche Schlüssel) |
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

## Kunden

Basispfad: `/giving/customers`

Erweitert `GenericCrudController` um die CRUD-Routen: `getAll`, `delete`. Verknüpft Personen mit ihren Kundendatensätzen beim Zahlungs-Gateway.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Kunden auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary oder eigener Datensatz | Einen Kunden anhand der ID abrufen |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary oder eigener Datensatz | Gateway-Abonnements für einen Kunden abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Kunden löschen |

## Abonnements

Basispfad: `/giving/subscriptions`

Verwaltet wiederkehrende Spendenabonnements. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Abonnements auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Abonnement anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit oder eigenes Abonnement | Abonnements beim Zahlungs-Gateway aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit oder eigenes Abonnement | Ein Abonnement kündigen und aus der Datenbank entfernen. Body: `{ provider, reason }` |

## Abonnement-Fonds

Basispfad: `/giving/subscriptionfunds`

Verfolgt Fondszuweisungen für wiederkehrende Abonnements. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigenes Abonnement | Abonnement-Fonds auflisten. Mit `?subscriptionId=` filtern |
| GET | `/:id` | JWT | Donations.ViewSummary | Einen Abonnement-Fonds anhand der ID abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Abonnement-Fonds löschen |
| DELETE | `/subscription/:id` | JWT | Donations.Edit oder eigenes Abonnement | Alle Fonds für ein Abonnement löschen |

## Zahlungsmethoden

Basispfad: `/giving/paymentmethods`

Verwaltet gespeicherte Zahlungsmethoden (Karten, Bankkonten) über die APIs der Zahlungs-Gateways. Es sind keine Basis-CRUD-Routen aktiviert; alle Endpunkte sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View oder eigene personId | Alle gespeicherten Zahlungsmethoden einer Person abrufen (Karten, Bankkonten) |
| POST | `/addcard` | JWT | — | Eine Karten-Zahlungsmethode hinzufügen. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit oder eigene personId | Kartendetails aktualisieren. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit oder eigene personId | Ein Stripe-ACH-SetupIntent zur Bankkontoverknüpfung erstellen. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Öffentlich | — | Ein anonymes ACH-SetupIntent für Gastspenden erstellen. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit oder eigene personId | Ein Bankkonto per Token hinzufügen (veraltet; `ach-setup-intent` verwenden). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit oder eigene personId | Bankkontodetails aktualisieren. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit oder eigener Kunde | Ein Bankkonto mit Mikroeinzahlungen verifizieren. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit oder eigener Kunde | Eine Zahlungsmethode löschen (Karte oder Bankkonto) |

## Ereignisprotokoll

Basispfad: `/giving/eventLog`

Erweitert `GenericCrudController` um die CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Verfolgt Zahlungs-Gateway-Webhook-Ereignisse für Auditing und Deduplizierung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Ereignisprotokolle auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Ereignisprotokoll anhand der ID abrufen |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ereignisprotokolle nach Ereignistyp gefiltert abrufen |
| POST | `/` | JWT | Donations.Edit | Ereignisprotokolle erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Ein Ereignisprotokoll löschen |

## Verwandte Seiten

- [Mitgliedschafts-Endpunkte](./membership) — Personen, Kirchen, Gruppen, Rollen und Berechtigungen
- [Authentifizierung & Berechtigungen](./authentication) — Anmeldeablauf, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
