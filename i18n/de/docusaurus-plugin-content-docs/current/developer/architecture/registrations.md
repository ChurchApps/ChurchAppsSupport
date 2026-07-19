---
title: "Event-Registrierungen"
---

# Event-Registrierungen

<div class="article-intro">

Native Event-Registrierung lebt im Content-Modul und trägt seit der Welle der zahlungspflichtigen Registrierungen ein vollständiges Commerce-Modell: bepreiste Teilnehmertypen, bepreiste Add-on-Auswahlen, Rabattcodes, Zahlungen über das bestehende Giving-Gateway der Kirche und eine statusgesteuerte Warteliste. Der Geldpfad nutzt bewusst den Giving-Stack wieder — der Registrierungs-Controller belastet über dieselbe `GatewayService`-/`IGatewayProvider`-Abstraktion, dokumentiert in [Giving](./giving), sodass kein Kartendaten- oder Gateway-SDK-Wissen im Content-Modul lebt. Diese Seite bildet das Datenmodell, die Preis- und Kapazitätsregeln sowie die Registrierungs-, Zahlungs- und Wartelisten-Abläufe ab.

</div>

## Überblick

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (Mitglieder-Portal)    │            │ Api — Content-Modul                          │
│  Registrierungs-Assistent ·  │   HTTPS    │  RegistrationController                     │
│  Meine Registrierungen       │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (Server-Pricing) │
│ B1Admin (Mitarbeiter)        │            │  RegistrationHelper (E-Mails)               │
│  Event-Registrierungseinstellungen │      └───────────────┬─────────────────────────────┘
│  · Roster · CSV-Export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ gemeinsame Gateway-Abstraktion (Giving)      │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Drei Regeln gelten durchgängig für den Stack:

1. **Der Server besitzt den Preis.** Clients übermitteln Typ-IDs, Auswahl-IDs und Mengen; `RegistrationPricingHelper.computeTotal()` berechnet die Summe serverseitig, und Gutscheine werden zum Zeitpunkt der Belastung erneut validiert. Ein vom Client übermittelter Betrag wird nie vertraut.
2. **Kapazität wird atomar zum Einfüge-Zeitpunkt erzwungen.** Jedes kapazitätsbegrenzte Insert verwendet eine `INSERT … SELECT … FROM dual WHERE (Anzahl aktiver Zeilen) < Kapazität`-Anweisung, sodass zwei gleichzeitige Registrierungen nicht beide den letzten Platz belegen können. Zählungen werden aus dem Status (`pending`/`confirmed`) abgeleitet, nie gespeichert.
3. **Zahlungen fahren über die Giving-Schienen.** `RegistrationController` ruft den gemeinsamen `GatewayService.processCharge` mit dem konfigurierten Gateway der Kirche auf — dieselbe Provider-Abstraktion, dasselbe Tokenisierungsmodell und dieselbe SCA-Behandlung wie bei Spenden.

## Datenmodell (`Api/src/modules/content`)

Modelle liegen in `models/Registration.ts`; Tabellenzuordnungen in `db/DatabaseTypes.ts`; ein Repo pro Tabelle unter `repositories/`.

| Tabelle | Bedeutung | Schlüsselfelder |
|-------|---------|-----------|
| `registrations` | Eine Registrierung (ein Haushalt/eine Partei für ein Event) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Ein Teilnehmer auf einer Registrierung | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Teilnehmertypen pro Event (z. B. Erwachsener / Kind) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Benannte Add-on-Optionen mit einem Preis (z. B. T-Shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (Deckel pro Registrierung), sort, active |
| `registrationSelectionChoices` | Menge einer Auswahl, gewählt von einer Registrierung/einem Mitglied | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Eine erfolgreiche Belastung gegen eine Registrierung | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabattcodes pro Event | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Anmerkungen:

- **Es gibt keine Wartelisten-Tabelle.** Wartende Parteien sind `registrations`-Zeilen mit `status = 'waitlisted'`; der gesamte Wartelisten-Lebenszyklus besteht aus Statusübergängen auf dieser einen Tabelle.
- **Keine gespeicherten Zähler.** „Verkauft“-/„verwendet“-Zählungen (Event-Kapazität, Kapazität pro Typ, Kapazität pro Auswahl, Gutschein-Nutzungen) werden mit korrelierten Unterabfragen über Zeilen berechnet, deren Status in `('pending','confirmed')` liegt (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Das Stornieren einer Registrierung gibt daher Kapazität frei, ohne dass eine Buchführung nötig ist.
- Preise sind MySQL-DECIMAL-Spalten (Strings über die Leitung), die im Pricing-Helper mit `Number()` konvertiert werden.

## REST-Oberfläche

Alles liegt unter `/content/registrations` (`controllers/RegistrationController.ts`), abgesichert über `Permissions.registrations` (`view` / `edit`):

| Route | Zugriff | Zweck |
|-------|--------|---------|
| `POST /register` | anonym | Vollständige Übermittlung: Gast oder Mitglied, Server-Pricing, Kapazitätsprüfungen, optionale Belastung |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | öffentlich | Typen/Auswahlen mit abgeleitetem `used`/`remainingCapacity` für den Assistenten |
| `POST /types`, `DELETE /types/:id` (ebenso für `/selections`, `/coupons`) | `registrations.edit` | Mitarbeiter-Einstellungen CRUD |
| `POST /coupons/validate` | öffentlich | Inline-Rabattcode-Validierung während des Assistenten |
| `GET /coupons/event/:eventId` | Mitarbeiter | Gutscheine mit Nutzungszählungen |
| `GET /event/:eventId` · `GET /event/:eventId/count` | Mitarbeiter · öffentlich | Roster; Aktiv-Zählung für die Kapazitätsanzeige |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authentifiziert | Meine Registrierungen, Detail, Zahlungsverlauf |
| `PUT /:id` | Besitzer/Mitarbeiter | Bearbeitung nach der Übermittlung — ersetzt Mitglieder und Auswahl-Choices mit frischen atomaren Kapazitätsprüfungen, berechnet `totalAmount` neu; belastet oder erstattet nie automatisch |
| `POST /:id/pay` | Besitzer | „Zahlung abschließen“: belastet `totalAmount − amountPaid`, kippt `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | Mitarbeiter | Manuelle Wartelisten-Beförderung |
| `POST /:id/cancel` · `DELETE /:id` | Besitzer · Mitarbeiter | Stornieren / Löschen; beide lösen automatische Wartelisten-Beförderung aus |

Eine nicht stornierte bestehende Registrierung für dieselbe `personId` auf demselben Event wird mit 409 abgelehnt, und jede erstellte Registrierung sendet einen `registration.created`-Webhook über `WebhookDispatcher`.

## Preisgestaltung und Rabattcodes

`helpers/RegistrationPricingHelper.ts` ist die einzige Autorität für Geld-Mathematik:

- `computeTotal()` summiert den Typpreis jedes Mitglieds plus `price × quantity` jeder Auswahl-Choice.
- `validateCoupon()` erzwingt das Active-Flag, das Datumsfenster (`startDate`/`endDate`), `minMembers` gegen die übermittelte Parteigröße und `maxUses` gegen die statusabgeleitete Einlösezählung.
- `applyDiscount()` — `percent` subtrahiert `total × value/100`; `amount` subtrahiert `value`; beide stoppen bei null.

Der Assistent ruft `POST /coupons/validate` für Inline-Feedback auf, aber `register` validiert und wendet den Gutschein serverseitig erneut an — die angezeigte Summe des Clients ist nur ein Richtwert.

## Das atomare Kapazitäts-Idiom

Jedes kapazitätsbegrenzte Insert wird sicher wettlauf-frei, ohne Transaktionen oder Sperren, indem die Kapazitätsprüfung Teil des `INSERT` selbst wird. Event-Ebene (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Null betroffene Zeilen bedeutet „an der Kapazitätsgrenze“. Dasselbe Idiom schützt Inserts pro Typ (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, zählt Mitglieder, die mit aktiven Registrierungen verknüpft sind) und Mengen pro Auswahl (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, verwendet `COALESCE(SUM(quantity),0) + ? <= capacity`). Wenn ein Mitglieds- oder Auswahl-Insert mitten in der Registrierung fehlschlägt, macht der Controller die Teil-Registrierung mit `deleteCascade()` rückgängig und meldet, welcher Typ oder welche Auswahl ausverkauft ist.

## Zahlungsablauf

`processRegistrationCharge` im Controller ist die einzige Stelle, an der Registrierungen Geld berühren, und ist ein dünner Client des Giving-Stacks:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Die Tokenisierung erfolgt im Browser genau wie bei Spenden (siehe [Giving](./giving)) — der Assistent nutzt die Zahlungsanbieter-Registry von apphelper wieder, sodass angemeldete Mitglieder mit gespeicherten Karten zahlen können und Gäste eine neue Karte tokenisieren. Der Controller spiegelt die Provider-Eigenheiten von `DonateController` (Kingdom-Funding-`pm-{id}`-Zahlungsmethoden-IDs, Stripe-SCA-`requires_action`-Antworten, die an den Client zurückgegeben werden, ohne eine Zahlung zu erfassen). Eine erfolgreiche Belastung schreibt eine `registrationPayments`-Zeile, erhöht `amountPaid` und bestätigt die Registrierung. **Erstattungen sind nicht implementiert** — eine stornierte, bezahlte Registrierung behält ihre Zahlungszeilen, und jede Erstattung wird außerhalb des Systems im Gateway-Dashboard behandelt.

Beide Einstiegspunkte laufen über denselben Codepfad: `register` (Zahlung bei Anmeldung) und `pay` (Restzahlung / Wartelisten-Abschluss).

## Wartelisten-Lebenszyklus

Wenn das Event voll ist und das `waitlistEnabled`-Flag des Events aktiviert ist, speichert `register` die Partei als `waitlisted` (Kapazitätsprüfungen werden übersprungen) und sendet die normale Bestätigungs-E-Mail, markiert als Wartelistenplatz. Beförderung geschieht auf drei Wegen — `cancel`, `delete` und den Mitarbeiter-Endpunkt `promote` — die alle in `RegistrationRepo.promoteFromWaitlist` münden, welches die älteste wartende Zeile auswählt und sie atomar umdreht:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…Aktiv-Zählung für das Event…) < ?
```

Die `status='waitlisted'`-Bedingung bedeutet, dass gleichzeitige Beförderungen eine Zeile nicht doppelt befördern können, und die Kapazitäts-Unterabfrage bedeutet, dass eine Beförderung nicht überverkaufen kann. Beförderte Zeilen landen auf `pending` — nicht `confirmed` — weil möglicherweise noch ein Restbetrag geschuldet wird; `RegistrationHelper.sendWaitlistAvailabilityEmail` teilt dem Registrierten mit, dass sein Platz frei geworden ist, und verlinkt, wenn `totalAmount − amountPaid > 0`, zur Seite zum Abschließen der Zahlung. Zahlen (oder kein Restbetrag) bestätigt sie.

:::info
Eine Kapazitätserhöhung befördert nicht automatisch von selbst — Mitarbeiter nutzen die Beförderungsaktion im Roster nach einer Kapazitätserhöhung. Stornierungen und Löschungen befördern automatisch.
:::

## Client-Oberflächen

- **B1App-Assistent** — ein gemeinsamer Hook, `B1App/src/components/registration/useEventRegistration.ts`, steuert sowohl die Website-Komponente (`components/registration/EventRegister.tsx`) als auch den Mobile-Portal-Screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) durch die Schritte `info → members → selections → questions → payment → confirm` (die mittleren Schritte rendern nur, wenn das Event Auswahlen, ein angehängtes Formular oder eine Summe ungleich null hat). Die info-/members-Schritte zeigen per-Teilnehmertyp-Picker mit Live-Restkapazität und Ausverkauft-Status; payment (`RegistrationPaymentForm.tsx`) zeigt die Bestellzusammenfassung, die Rabattcode-Eingabe und — für angemeldete Mitglieder — gespeicherte Zahlungsmethoden über die apphelper-Anbieter-Registry, wobei Gäste eine neue Karte tokenisieren. Der Mobile-Screen **Registrierungen** (`screens/RegistrationsPage.tsx`) ist Meine Registrierungen: Status, offener Restbetrag, Zahlung abschließen (`POST /:id/pay`), Bearbeiten (`PUT /:id` — Kontakt, Mitgliedertypen, Auswahlmengen) und Stornieren.
- **B1Admin-Einstellungen** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` fügt den Warteliste-aktivieren-Schalter plus Akkordeons für Teilnehmertypen, Auswahlen und Rabattcodes hinzu (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), alle CRUD gegen die Routen `/types`, `/selections`, `/coupons`.
- **B1Admin-Roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: Typ-Spalte pro Teilnehmer, Bezahlt-/Gesamt-Spalte mit Restbetrags-Chip, Zählungs-Chips pro Typ, ein Zahlungsdetail-Dialog (`RegistrationDetailDialog.tsx`, von `GET /payments/:registrationId`), die Wartelisten-Beförderungsaktion in der Zeile und CSV-Export einschließlich Teilnehmertypen, Auswahlen, Bezahlt/Gesamt/Rest und Frage-Antworten.

Modulübergreifende Lookups (Auflösen oder Erstellen der Gastperson, Laden der Kirche für E-Mails) laufen über `getMembershipModuleGateway()` — das Content-Modul liest niemals direkt aus Membership-Tabellen.

## Verwandte Seiten

- [Giving](./giving) — die Gateway-Abstraktion, Provider-Registry und das Tokenisierungsmodell, die dieses Feature wiederverwendet
- [Content-Endpunkte](../api/endpoints/content) — die REST-Oberfläche des Content-Moduls
- [Webhooks](../api/webhooks) — das `registration.created`-Event
- [Modulstruktur](../api/module-structure) — wie das Content-Modul serverseitig organisiert ist
