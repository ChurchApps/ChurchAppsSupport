---
title: "Giving-Endpunkte"
---

# Giving-Endpunkte

<div class="article-intro">

Das Modul Giving verwaltet Spenden, Fonds, Zahlungsabwicklung, Abonnements und die damit verbundenen Finanzvorgänge. Es unterstützt mehrere Zahlungsgateways (Stripe, PayPal), verarbeitet einmalige und wiederkehrende Spenden, verfolgt Spendenbündel und bietet eine Webhook-Verarbeitung für asynchrone Zahlungsereignisse.

</div>

**Basispfad:** `/giving`

## Spenden

Basispfad: `/giving/donations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigene personId | Alle Spenden auflisten. Filter über `?batchId=` oder `?personId=`. Bei `?personId=` werden Gaben an nicht absetzbare Fonds ausgelassen (wie auf Spendenbescheinigungen), sofern der Aufrufer mit Donations.View nicht `&includeNonDeductible=1` angibt. Das tut der Personendatensatz in B1Admin |
| GET | `/:id` | JWT | Donations.View | Eine Spende anhand der ID abrufen |
| GET | `/my` | JWT | — | Spenden des aktuellen Benutzers abrufen |
| GET | `/my/summary?year=` | JWT | — | Spendensumme des aktuellen Benutzers für ein Jahr (Standard: dieses Jahr): `{ year, total, count, currency, isConverted }`, wobei die Summen in die Währung der Gemeinde umgerechnet werden. Wird für die Spendenvorschau auf der Startseite des Mitglieds verwendet |
| GET | `/summary` | JWT | Donations.ViewSummary | Spendenübersicht abrufen. Filter über `?startDate=&endDate=&type=`. Mit `type=person` erhält man die Aufschlüsselung je Person |
| GET | `/testEmail` | Öffentlich | — | Eine Test-E-Mail senden (Entwicklung/Fehlersuche) |
| POST | `/` | JWT | Donations.Edit | Spenden (als Bündel) anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Eine Spende löschen |

### Beispiel: Spenden eines Bündels auflisten

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

## Spendenbündel

Basispfad: `/giving/donationbatches`

Erweitert `GenericCrudController` mit den CRUD-Routen `getById`, `getAll`, `post` und `delete`. Beim Löschen werden außerdem alle Spenden im Bündel entfernt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Spendenbündel auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Spendenbündel anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit | Spendenbündel anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Ein Bündel und alle seine Spenden löschen |

## Spenden (Donate)

Basispfad: `/giving/donate`

Verarbeitet den öffentlichen Spendenablauf einschließlich Belastungen, Abonnements, Webhooks und Gebührenberechnungen. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Öffentlich | — | Verfügbare Zahlungsgateways einer Gemeinde abrufen (nur öffentliche Schlüssel) |
| POST | `/client-token` | JWT | — | Ein Client-Token zur Initialisierung des Gateways erzeugen |
| POST | `/create-order` | JWT | — | Eine Zahlungsbestellung anlegen (Checkout im PayPal-Stil) |
| POST | `/charge` | JWT | — | Eine einmalige Spendenbelastung verarbeiten |
| POST | `/subscribe` | JWT | — | Ein Abonnement für wiederkehrende Spenden anlegen |
| POST | `/log` | Öffentlich | — | Eine Spende protokollieren. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Öffentlich | — | Webhook-Ereignisse von Zahlungsanbietern empfangen (Stripe, PayPal). Erfordert `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Stripe-Ereignisse für einen Zeitraum erneut abspielen. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Öffentlich | — | Transaktionsgebühren berechnen. Body: `{ type, provider, gatewayId, amount, currency }`. Erfordert `?churchId=` |
| POST | `/captcha-verify` | Öffentlich | — | reCAPTCHA-Token prüfen. Body: `{ token }` |

### Beispiel: Eine einmalige Spendenbelastung verarbeiten

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

### Beispiel: Ein Abonnement für wiederkehrende Spenden anlegen

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

Erweitert `GenericCrudController` mit den CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Berechtigung `view` ist `null` (zum Anzeigen von Fonds ist keine Berechtigung erforderlich).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Fonds auflisten |
| GET | `/:id` | JWT | — | Einen Fonds anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Alle Fonds einer bestimmten Gemeinde abrufen (öffentlich) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Öffentlich | — | Die Spendensumme eines Fonds abrufen: `{ fundId, totalAmount, donationCount }`. Versorgt das Element `campaignProgress` des Website-Editors |
| POST | `/` | JWT | Donations.Edit | Fonds anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Fonds löschen |

## Fondsspenden

Basispfad: `/giving/funddonations`

Erfasst, wie einzelne Spenden auf Fonds verteilt werden. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Fondsspenden auflisten. Filter über `?donationId=`, `?personId=`, `?fundId=` oder `?fundName=`. Optional mit `?startDate=&endDate=` nach Datum filtern |
| GET | `/:id` | JWT | Donations.View | Eine Fondsspende anhand der ID abrufen |
| GET | `/my` | JWT | — | Fondsspenden des aktuellen Benutzers abrufen |
| POST | `/` | JWT | Donations.Edit | Fondsspenden (als Bündel) anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Eine Fondsspende löschen |

## Gateways

Basispfad: `/giving/gateways`

Verwaltet die Konfigurationen der Zahlungsgateways (Stripe, PayPal usw.). Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert. Gateway-Geheimnisse werden im Ruhezustand verschlüsselt gespeichert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gateways der Gemeinde auflisten |
| GET | `/:id` | JWT | Settings.Edit | Ein Gateway anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Gateways einer Gemeinde abrufen (nur öffentliche Schlüssel) |
| GET | `/configured/:churchId` | Öffentlich | — | Prüfen, ob für eine Gemeinde ein Zahlungsgateway konfiguriert ist |
| POST | `/` | JWT | Settings.Edit | Gateways anlegen oder aktualisieren (verschlüsselt Schlüssel, richtet Webhooks und Produkte ein) |
| PATCH | `/:id` | JWT | Settings.Edit | Ein Gateway teilweise aktualisieren |
| DELETE | `/:id` | JWT | Settings.Edit | Ein Gateway löschen (entfernt auch seine Webhooks) |

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

Erweitert `GenericCrudController` mit den CRUD-Routen `getAll` und `delete`. Verknüpft Personen mit ihren Kundendatensätzen beim Zahlungsgateway.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Kunden auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary oder eigener Datensatz | Einen Kunden anhand der ID abrufen |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary oder eigener Datensatz | Abonnements eines Kunden beim Gateway abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Kunden löschen |

## Abonnements

Basispfad: `/giving/subscriptions`

Verwaltet Abonnements für wiederkehrende Spenden. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Abonnements auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Abonnement anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit oder eigenes Abonnement | Abonnements beim Zahlungsgateway aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit oder eigenes Abonnement | Ein Abonnement kündigen und aus der Datenbank entfernen. Body: `{ provider, reason }` |

## Abonnement-Fonds

Basispfad: `/giving/subscriptionfunds`

Erfasst die Fondszuordnungen für wiederkehrende Abonnements. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigenes Abonnement | Abonnement-Fonds auflisten. Filter über `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Einen Abonnement-Fonds anhand der ID abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Abonnement-Fonds löschen |
| DELETE | `/subscription/:id` | JWT | Donations.Edit oder eigenes Abonnement | Alle Fonds eines Abonnements löschen |

## Zahlungsmethoden

Basispfad: `/giving/paymentmethods`

Verwaltet gespeicherte Zahlungsmethoden (Karten, Bankkonten) über die APIs der Zahlungsgateways. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View oder eigene personId | Alle gespeicherten Zahlungsmethoden einer Person abrufen (Karten, Bankkonten) |
| POST | `/addcard` | JWT | — | Eine Kartenzahlungsmethode hinzufügen. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit oder eigene personId | Kartendaten aktualisieren. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit oder eigene personId | Einen Stripe-ACH-SetupIntent zur Verknüpfung eines Bankkontos anlegen. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Öffentlich | — | Einen anonymen ACH-SetupIntent für Gastspenden anlegen. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit oder eigene personId | Ein Bankkonto über ein Token hinzufügen (veraltet; stattdessen `ach-setup-intent` verwenden). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit oder eigene personId | Bankkontodaten aktualisieren. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit oder eigener Kunde | Ein Bankkonto über Kleinstbeträge verifizieren. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit oder eigener Kunde | Eine Zahlungsmethode (Karte oder Bankkonto) löschen |

## Ereignisprotokoll

Basispfad: `/giving/eventLog`

Erweitert `GenericCrudController` mit den CRUD-Routen `getById`, `getAll`, `post` und `delete`. Protokolliert Webhook-Ereignisse der Zahlungsgateways zur Nachvollziehbarkeit und zur Vermeidung von Dubletten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Ereignisprotokolle auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Ereignisprotokoll anhand der ID abrufen |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ereignisprotokolle nach Ereignistyp gefiltert abrufen |
| POST | `/` | JWT | Donations.Edit | Ereignisprotokolle anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Ein Ereignisprotokoll löschen |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Gemeinden, Gruppen, Rollen und Berechtigungen
- [Authentifizierung & Berechtigungen](./authentication) — Anmeldung, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Muster zur Code-Organisation
