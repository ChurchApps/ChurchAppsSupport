---
title: "Veranstaltungsanmeldungen"
---

# Veranstaltungsanmeldungen

<div class="article-intro">

Die native Anmeldung zu Veranstaltungen liegt im Content-Modul und umfasst seit der Welle der kostenpflichtigen Anmeldungen ein vollständiges Handelsmodell: Preise nach Teilnehmertyp, kostenpflichtige Zusatzoptionen, Rabattcodes, Zahlungen über das bestehende Giving-Gateway der Gemeinde und eine statusgesteuerte Warteliste. Der Zahlungsweg nutzt bewusst den Giving-Stack — der Anmeldecontroller belastet über dieselbe Abstraktion `GatewayService` / `IGatewayProvider`, die in [Giving](./giving.md) beschrieben ist. Dadurch liegen im Content-Modul weder Kartendaten noch Wissen über SDKs von Gateways. Diese Seite beschreibt das Datenmodell, die Regeln zu Preisen und Kapazität sowie die Abläufe für Anmeldung, Zahlung und Warteliste.

</div>

## Überblick

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Drei Grundregeln gelten im gesamten Stack:

1. **Der Server bestimmt den Preis.** Clients senden Typ-IDs, Auswahl-IDs und Mengen; `RegistrationPricingHelper.computeTotal()` berechnet die Summe serverseitig, und Gutscheine werden zum Zeitpunkt der Belastung erneut geprüft. Ein vom Client übermittelter Betrag wird nie übernommen.
2. **Die Kapazität wird beim Einfügen atomar durchgesetzt.** Jede kapazitätsbegrenzte Einfügung verwendet eine Anweisung `INSERT … SELECT … FROM dual WHERE (Anzahl aktiver Zeilen) < Kapazität`, sodass zwei gleichzeitige Anmeldungen nicht beide den letzten Platz belegen können. Die Anzahlen werden aus dem Status abgeleitet (`pending`/`confirmed`) und nie gespeichert.
3. **Zahlungen laufen über die Giving-Infrastruktur.** `RegistrationController` ruft das gemeinsame `GatewayService.processCharge` mit dem konfigurierten Gateway der Gemeinde auf — dieselbe Anbieter-Abstraktion, dieselbe Tokenisierung und dieselbe SCA-Behandlung wie bei Spenden.

## Datenmodell (`Api/src/modules/content`)

Die Modelle liegen in `models/Registration.ts`, die Tabellenzuordnungen in `db/DatabaseTypes.ts`; pro Tabelle gibt es ein Repository unter `repositories/`.

| Tabelle | Bedeutung | Wichtige Felder |
|-------|---------|-----------|
| `registrations` | Eine Anmeldung (ein Haushalt oder eine Gruppe für eine Veranstaltung) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Ein Teilnehmer einer Anmeldung | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Teilnehmertypen je Veranstaltung (z. B. Erwachsener / Kind) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Benannte Zusatzoptionen mit Preis (z. B. T-Shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (Obergrenze je Anmeldung), sort, active |
| `registrationSelectionChoices` | Gewählte Menge einer Option durch eine Anmeldung oder ein Mitglied | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Eine erfolgreiche Belastung für eine Anmeldung | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabattcodes je Veranstaltung | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Hinweise:

- **Es gibt keine Warteliste als eigene Tabelle.** Wartende Gruppen sind Zeilen in `registrations` mit `status = 'waitlisted'`; der gesamte Lebenszyklus der Warteliste besteht aus Statusübergängen in dieser einen Tabelle.
- **Keine gespeicherten Zähler.** Die Zahlen für „verkauft“ bzw. „genutzt“ (Kapazität der Veranstaltung, Kapazität je Typ, Kapazität je Option, Nutzungen eines Gutscheins) werden mit korrelierten Unterabfragen über Zeilen berechnet, deren Status in `('pending','confirmed')` liegt (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Eine Stornierung gibt die Kapazität daher ohne jede Buchführung frei.
- Preise sind DECIMAL-Spalten in MySQL (über die Leitung als Zeichenketten übertragen) und werden im Preishelfer mit `Number()` umgewandelt.

## REST-Schnittstelle

Alles liegt unter `/content/registrations` (`controllers/RegistrationController.ts`) und ist durch `Permissions.registrations` (`view` / `edit`) geschützt:

| Route | Zugriff | Zweck |
|-------|---------|--------|
| `POST /register` | anonym | Vollständige Übermittlung: Gast oder Mitglied, Serverpreise, Kapazitätsprüfungen, optionale Belastung |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | öffentlich | Typen/Optionen mit abgeleiteten Werten `used` / `remainingCapacity` für den Assistenten |
| `POST /types`, `DELETE /types/:id` (ebenso für `/selections`, `/coupons`) | `registrations.edit` | CRUD der Einstellungen für Mitarbeitende |
| `POST /coupons/validate` | öffentlich | Prüfung des Rabattcodes direkt während des Assistenten |
| `GET /coupons/event/:eventId` | Mitarbeitende | Gutscheine mit Nutzungszahlen |
| `GET /event/:eventId` · `GET /event/:eventId/count` | Mitarbeitende · öffentlich | Teilnehmerliste; Anzahl aktiver Anmeldungen zur Anzeige der Kapazität |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | angemeldet | Meine Anmeldungen, Details, Zahlungsverlauf |
| `PUT /:id` | Inhaber/Mitarbeitende | Bearbeitung nach der Übermittlung — ersetzt Teilnehmer und Optionsauswahl mit neuen atomaren Kapazitätsprüfungen und berechnet `totalAmount` neu; belastet oder erstattet nie automatisch |
| `POST /:id/pay` | Inhaber | „Zahlung abschließen“: belastet `totalAmount − amountPaid` und setzt `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | Mitarbeitende | Manuelles Nachrücken von der Warteliste |
| `POST /:id/cancel` · `DELETE /:id` | Inhaber · Mitarbeitende | Stornieren / Löschen; beides löst das automatische Nachrücken von der Warteliste aus |

Eine bestehende, nicht stornierte Anmeldung derselben `personId` für dieselbe Veranstaltung wird mit 409 abgelehnt, und jede neu angelegte Anmeldung sendet über `WebhookDispatcher` einen Webhook `registration.created`.

## Preise und Rabattcodes

`helpers/RegistrationPricingHelper.ts` ist die einzige maßgebliche Stelle für die Preisberechnung:

- `computeTotal()` addiert den Typpreis jedes Teilnehmers und für jede Optionswahl `Preis × Menge`.
- `validateCoupon()` prüft das Aktiv-Kennzeichen, den Gültigkeitszeitraum (`startDate`/`endDate`), `minMembers` gegenüber der übermittelten Gruppengröße und `maxUses` gegenüber der aus dem Status abgeleiteten Anzahl an Einlösungen.
- `applyDiscount()` — `percent` zieht `total × value/100` ab; `amount` zieht `value` ab; beide begrenzen das Ergebnis auf mindestens null.

Der Assistent ruft `POST /coupons/validate` für eine direkte Rückmeldung auf, doch `register` prüft und wendet den Gutschein serverseitig erneut an — die im Client angezeigte Summe ist nur informativ.

## Das atomare Kapazitätsmuster

Jede kapazitätsbegrenzte Einfügung verarbeitet konkurrierende Zugriffe sicher, ohne Transaktionen oder Sperren, indem die Kapazitätsprüfung Teil des `INSERT` selbst ist. Auf Veranstaltungsebene (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Null betroffene Zeilen bedeuten „Kapazität erreicht“. Dasselbe Muster schützt Einfügungen je Typ (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, das Teilnehmer zählt, die mit aktiven Anmeldungen verbunden sind) und Mengen je Option (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, mit `COALESCE(SUM(quantity),0) + ? <= capacity`). Schlägt eine Einfügung eines Teilnehmers oder einer Option während der Anmeldung fehl, macht der Controller die teilweise Anmeldung mit `deleteCascade()` rückgängig und meldet, welcher Typ oder welche Option ausverkauft ist.

## Zahlungsablauf {#payment-flow}

`processRegistrationCharge` im Controller ist die einzige Stelle, an der Anmeldungen mit Geld in Berührung kommen, und er ist ein schlanker Client des Giving-Stacks:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Die Tokenisierung erfolgt im Browser genau wie bei Spenden (siehe [Giving](./giving.md)) — der Assistent nutzt die Registry der Zahlungsanbieter aus apphelper, sodass angemeldete Mitglieder gespeicherte Karten verwenden können und Gäste eine neue Karte tokenisieren. Der Controller übernimmt die Eigenheiten der Anbieter aus `DonateController` (Kennungen für Zahlungsmethoden bei Kingdom Funding `pm-{id}`, Antworten `requires_action` nach SCA bei Stripe, die an den Client zurückgegeben werden, ohne eine Zahlung zu erfassen). Eine erfolgreiche Belastung schreibt eine Zeile `registrationPayments`, erhöht `amountPaid` und bestätigt die Anmeldung. **Rückerstattungen sind nicht implementiert** — eine stornierte bezahlte Anmeldung behält ihre Zahlungszeilen, und eine Rückerstattung wird außerhalb des Systems im Dashboard des Gateways abgewickelt.

Beide Einstiegspunkte laufen über denselben Codepfad: `register` (Zahlung bei der Anmeldung) und `pay` (Zahlung des Restbetrags bzw. Abschluss der Warteliste).

## Ablauf der Warteliste

Ist die Veranstaltung voll und das Flag `waitlistEnabled` der Veranstaltung aktiv, speichert `register` die Gruppe als `waitlisted` (unter Auslassung der Kapazitätsprüfungen) und sendet die übliche Bestätigungs-E-Mail, die als Platz auf der Warteliste gekennzeichnet ist. Das Nachrücken erfolgt auf drei Wegen — `cancel`, `delete` und der Endpunkt `promote` für Mitarbeitende. Alle münden in `RegistrationRepo.promoteFromWaitlist`, das die älteste wartende Zeile auswählt und sie atomar umstellt:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Die Bedingung `status='waitlisted'` verhindert, dass gleichzeitige Nachrückvorgänge dieselbe Zeile doppelt befördern, und die Unterabfrage der Kapazität verhindert, dass durch ein Nachrücken überbucht wird. Nachgerückte Zeilen landen im Status `pending` — nicht `confirmed` —, weil möglicherweise noch ein Betrag offen ist. `RegistrationHelper.sendWaitlistAvailabilityEmail` teilt dem Anmeldenden mit, dass sein Platz frei geworden ist, und verlinkt bei `totalAmount − amountPaid > 0` auf die Seite zum Abschluss der Zahlung. Mit der Zahlung (oder wenn kein Restbetrag offen ist) wird die Anmeldung bestätigt.

:::info
Eine Erhöhung der Kapazität löst nicht automatisch ein Nachrücken aus — Mitarbeitende verwenden nach der Erhöhung die Aktion Promote in der Teilnehmerliste. Stornierungen und Löschungen rücken automatisch nach.
:::

## Client-Oberflächen

- **Assistent in B1App** — ein gemeinsamer Hook, `B1App/src/components/registration/useEventRegistration.ts`, steuert sowohl die Website-Komponente (`components/registration/EventRegister.tsx`) als auch den Bildschirm im Mitgliederportal für Mobilgeräte (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) durch die Schritte `info → members → selections → questions → payment → confirm` (die mittleren Schritte werden nur angezeigt, wenn die Veranstaltung Optionen, ein angehängtes Formular oder eine Summe ungleich null hat). Die Schritte Info und Teilnehmer zeigen Auswahlfelder je Teilnehmertyp mit der verbleibenden Kapazität in Echtzeit und den Zuständen „ausverkauft“. Der Zahlungsschritt (`RegistrationPaymentForm.tsx`) zeigt die Bestellübersicht, die Eingabe des Rabattcodes und — für angemeldete Mitglieder — gespeicherte Zahlungsmethoden über die Registry der Zahlungsanbieter aus apphelper; Gäste tokenisieren eine neue Karte. Der Bildschirm **Registrations** für Mobilgeräte (`screens/RegistrationsPage.tsx`) ist „Meine Anmeldungen“: Status, offener Betrag, Zahlung abschließen (`POST /:id/pay`), Bearbeiten (`PUT /:id` — Kontakt, Teilnehmertypen, Mengen der Optionen) und Stornieren.
- **Einstellungen in B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` ergänzt den Schalter Enable Waitlist sowie Akkordeons für Attendee Types, Selections und Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), die alle über CRUD-Routen unter `/types`, `/selections`, `/coupons` arbeiten.
- **Teilnehmerliste in B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: Spalte Typ je Teilnehmer, Spalte Bezahlt/Gesamt mit Chip für den offenen Betrag, Anzahl-Chips je Typ, ein Dialog mit den Zahlungsdetails (`RegistrationDetailDialog.tsx`, aus `GET /payments/:registrationId`), die Zeilenaktion Promote für die Warteliste und der CSV-Export mit Teilnehmertypen, Optionen, Bezahlt/Gesamt/Offen sowie den Antworten auf Fragen.

Abfragen über Modulgrenzen hinweg (Auflösen oder Anlegen der Gastperson, Laden der Gemeinde für E-Mails) laufen über `getMembershipModuleGateway()` — das Content-Modul liest nie direkt Tabellen des Membership-Moduls.

## Verwandte Seiten

- [Giving](./giving.md) — die Gateway-Abstraktion, die Registry der Anbieter und das Tokenisierungsmodell, die diese Funktion wiederverwendet
- [Content-Endpunkte](../api/endpoints/content.md) — die REST-Schnittstelle des Content-Moduls
- [Webhooks](../api/webhooks.md) — das Ereignis `registration.created`
- [Modulstruktur](../api/module-structure.md) — wie das Content-Modul serverseitig organisiert ist
