---
title: "Giving-Endpunkte"
---

# Giving-Endpunkte

<div class="article-intro">

Das Giving-Modul verwaltet Spenden, Fonds, Zahlungsabwicklung, Abonnements und damit verbundene Finanzvorgänge. Es unterstützt mehrere Zahlungsanbieter (Stripe, PayPal), verarbeitet einmalige und wiederkehrende Spenden, verfolgt Spendenstapel und stellt Webhook-Verarbeitung für asynchrone Zahlungsereignisse bereit.

</div>

**Basispfad:** `/giving`

## Spenden

Basispfad: `/giving/donations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigene personId | Alle Spenden auflisten. Filtern mit `?batchId=` oder `?personId=`. Bei `?personId=` werden Gaben an nicht absetzbare Fonds ausgelassen (wie auf Spendenbescheinigungen), es sei denn, ein Aufrufer mit Donations.View fügt `&includeNonDeductible=1` hinzu, was der Personendatensatz von B1Admin tut |
| GET | `/:id` | JWT | Donations.View | Eine Spende anhand der ID abrufen |
| GET | `/my` | JWT | — | Spenden des aktuellen Benutzers abrufen |
| GET | `/my/summary?year=` | JWT | — | Gesamtspenden des aktuellen Benutzers für ein Jahr (Standard: dieses Jahr): `{ year, total, count, currency, isConverted }`, wobei die Summen in die Währung der Kirche umgerechnet werden. Liefert die Spendenvorschau auf der Startseite der Mitglieder |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Spenden innerhalb des Zeitraums (einschließlich). Beide Daten sind als `YYYY-MM-DD` erforderlich, andernfalls `400`. Die Spendenbescheinigungs-Seiten von B1Admin fragen auf diese Weise ein Kalenderjahr ab, anstatt die gesamte Historie der Kirche |
| GET | `/summary` | JWT | Donations.ViewSummary | Spendenübersicht abrufen. Filtern mit `?startDate=&endDate=&type=`. Verwenden Sie `type=person` für eine Aufschlüsselung pro Person |
| GET | `/testEmail` | Öffentlich | — | Eine Test-E-Mail senden (Entwicklung/Fehlersuche) |
| POST | `/` | JWT | Donations.Edit oder Donations.Enter | Spenden anlegen oder aktualisieren (Stapelverarbeitung). Nur mit Donations.Enter müssen sowohl der Zielstapel als auch (bei einer Aktualisierung) der aktuelle Stapel der Spende offen sein, und Gaben über ein Gateway (mit einer `transactionId`) können nicht geändert werden; andernfalls `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit oder Donations.Enter | Eine Spende löschen. Nur Donations.Enter: Die Spende muss in einem offenen Stapel liegen und darf keine Gabe über ein Gateway sein, andernfalls `403` |

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

## Spendenstapel {#donation-batches}

Basispfad: `/giving/donationbatches`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Der Löschvorgang entfernt außerdem alle Spenden im Stapel.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary oder Donations.Enter | Alle Spendenstapel auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary oder Donations.Enter | Einen Spendenstapel anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit oder Donations.Enter | Spendenstapel anlegen oder aktualisieren. Nur Donations.Enter: Das Aktualisieren eines bestehenden Stapels erfordert, dass dieser offen ist, andernfalls `403 { "error": "This batch is closed." }`. `status` wird hier ignoriert, daher kann ein Stapel durch Speichern nicht wieder geöffnet werden |
| POST | `/:id/close` | JWT | Donations.Edit | Einen Stapel schließen: setzt `status` auf `closed`, `closedDate` auf jetzt und `closedBy` auf die Benutzer-ID des Aufrufers. Gibt den Stapel zurück |
| POST | `/:id/reopen` | JWT | Donations.Edit | Einen Stapel wieder öffnen: setzt `status` auf `open` und leert `closedDate` und `closedBy`. Gibt den Stapel zurück |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Stapel und alle zugehörigen Spenden löschen |

Jeder Stapel enthält `status` (`open` oder `closed`; neue und bestehende Stapel sind `open`), `closedDate` und `closedBy`. Donations.Edit kann Spenden in jedem Stapel ändern; Donations.Enter (im Rollen-Editor als **Spenden erfassen** angezeigt) kann Spenden und Fondsaufteilungen nur hinzufügen, ändern oder löschen, solange der Stapel offen ist.

## Spenden (Donate)

Basispfad: `/giving/donate`

Behandelt den öffentlichen Spendenablauf einschließlich Belastungen, Abonnements, Webhooks und Gebührenberechnungen. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Öffentlich | — | Verfügbare Zahlungs-Gateways einer Kirche abrufen (nur öffentliche Schlüssel) |
| POST | `/client-token` | JWT | — | Ein Client-Token zur Initialisierung des Gateways erzeugen |
| POST | `/create-order` | JWT | — | Eine Zahlungsbestellung erstellen (PayPal-artiger Checkout) |
| POST | `/charge` | JWT | — | Eine einmalige Spendenbelastung verarbeiten |
| POST | `/subscribe` | JWT | — | Ein wiederkehrendes Spenden-Abonnement erstellen |
| POST | `/log` | Öffentlich | — | Eine Spende protokollieren. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Öffentlich | — | Zahlungs-Webhook-Ereignisse empfangen (Stripe, PayPal). Erfordert `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Stripe-Ereignisse für einen Zeitraum erneut abspielen. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Öffentlich | — | Transaktionsgebühren berechnen. Body: `{ type, provider, gatewayId, amount, currency }`. Erfordert `?churchId=` |
| POST | `/captcha-verify` | Öffentlich | — | reCAPTCHA-Token prüfen. Body: `{ token }` |

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

## Fonds

Basispfad: `/giving/funds`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Die Berechtigung `view` ist `null` (zum Anzeigen von Fonds ist keine Berechtigung erforderlich).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Fonds auflisten |
| GET | `/:id` | JWT | — | Einen Fonds anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Alle Fonds einer bestimmten Kirche abrufen (öffentlich) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Öffentlich | — | Die Spendensumme eines Fonds abrufen: `{ fundId, totalAmount, donationCount }`. Liefert das Element `campaignProgress` des Website-Builders |
| POST | `/` | JWT | Donations.Edit | Fonds anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Fonds löschen |

## Fondsspenden

Basispfad: `/giving/funddonations`

Verfolgt, wie einzelne Spenden auf Fonds verteilt werden. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Fondsspenden auflisten. Filtern mit `?donationId=`, `?personId=`, `?fundId=` oder `?fundName=`. Optional mit `?startDate=&endDate=` nach Datum filtern |
| GET | `/:id` | JWT | Donations.View | Eine Fondsspende anhand der ID abrufen |
| GET | `/my` | JWT | — | Fondsspenden des aktuellen Benutzers abrufen |
| POST | `/` | JWT | Donations.Edit oder Donations.Enter | Fondsspenden anlegen oder aktualisieren (Stapelverarbeitung). Nur Donations.Enter: Die übergeordnete Spende muss in einem offenen Stapel liegen und darf keine Gabe über ein Gateway sein, andernfalls `403` |
| DELETE | `/:id` | JWT | Donations.Edit oder Donations.Enter | Eine Fondsspende löschen. Dieselbe Regel für offene Stapel gilt für Donations.Enter |

## Gateways

Basispfad: `/giving/gateways`

Verwaltet die Konfigurationen der Zahlungs-Gateways (Stripe, PayPal usw.). Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert. Gateway-Geheimnisse werden im Ruhezustand verschlüsselt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gateways der Kirche auflisten |
| GET | `/:id` | JWT | Settings.Edit | Ein Gateway anhand der ID abrufen |
| GET | `/churchId/:churchId` | Öffentlich | — | Gateways einer Kirche abrufen (nur öffentliche Schlüssel) |
| GET | `/configured/:churchId` | Öffentlich | — | Prüfen, ob für eine Kirche ein Zahlungs-Gateway konfiguriert ist |
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

Erweitert `GenericCrudController` mit CRUD-Routen: `getAll`, `delete`. Verknüpft Personen mit ihren Kundendatensätzen beim Zahlungs-Gateway.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Kunden auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary oder eigener Datensatz | Einen Kunden anhand der ID abrufen |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary oder eigener Datensatz | Die Gateway-Abonnements eines Kunden abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Kunden löschen |

## Abonnements

Basispfad: `/giving/subscriptions`

Verwaltet wiederkehrende Spenden-Abonnements. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Abonnements auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Abonnement anhand der ID abrufen |
| POST | `/` | JWT | Donations.Edit oder eigenes Abonnement | Abonnements beim Zahlungs-Gateway aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit oder eigenes Abonnement | Ein Abonnement kündigen und aus der Datenbank entfernen. Body: `{ provider, reason }` |

## Abonnement-Fonds

Basispfad: `/giving/subscriptionfunds`

Verfolgt die Fondszuordnungen für wiederkehrende Abonnements. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View oder eigenes Abonnement | Abonnement-Fonds auflisten. Filtern mit `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Einen Abonnement-Fonds anhand der ID abrufen |
| DELETE | `/:id` | JWT | Donations.Edit | Einen Abonnement-Fonds löschen |
| DELETE | `/subscription/:id` | JWT | Donations.Edit oder eigenes Abonnement | Alle Fonds eines Abonnements löschen |

## Zahlungsmethoden

Basispfad: `/giving/paymentmethods`

Verwaltet gespeicherte Zahlungsmethoden (Karten, Bankkonten) über die APIs der Zahlungs-Gateways. Es sind keine CRUD-Basisrouten aktiviert; alle Endpunkte sind benutzerdefiniert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View oder eigene personId | Alle gespeicherten Zahlungsmethoden einer Person abrufen (Karten, Bankkonten) |
| POST | `/addcard` | JWT | — | Eine Kartenzahlungsmethode hinzufügen. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit oder eigene personId | Kartendaten aktualisieren. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit oder eigene personId | Einen Stripe-ACH-SetupIntent für die Verknüpfung eines Bankkontos erstellen. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Öffentlich | — | Einen anonymen ACH-SetupIntent für Gastspenden erstellen. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit oder eigene personId | Ein Bankkonto über ein Token hinzufügen (veraltet; verwenden Sie `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit oder eigene personId | Bankkontodaten aktualisieren. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit oder eigener Kunde | Ein Bankkonto mit Kleinstbeträgen (Micro-Deposits) verifizieren. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit oder eigener Kunde | Eine Zahlungsmethode (Karte oder Bankkonto) löschen |

## Ereignisprotokoll

Basispfad: `/giving/eventLog`

Erweitert `GenericCrudController` mit CRUD-Routen: `getById`, `getAll`, `post`, `delete`. Protokolliert Webhook-Ereignisse der Zahlungs-Gateways zur Prüfung und Duplikatserkennung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Alle Ereignisprotokolle auflisten |
| GET | `/:id` | JWT | Donations.ViewSummary | Ein Ereignisprotokoll anhand der ID abrufen |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ereignisprotokolle nach Ereignistyp filtern |
| POST | `/` | JWT | Donations.Edit | Ereignisprotokolle anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Donations.Edit | Ein Ereignisprotokoll löschen |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Kirchen, Gruppen, Rollen und Berechtigungen
- [Authentifizierung & Berechtigungen](./authentication) — Anmeldevorgang, JWT, OAuth, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Organisationsmuster des Codes
