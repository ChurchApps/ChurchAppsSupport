---
title: "Veranstaltungsanmeldungen"
---

# Veranstaltungsanmeldungen

<div class="article-intro">

Die native Veranstaltungsanmeldung lebt im Content-Modul und trägt seit der Welle der kostenpflichtigen Anmeldungen ein vollständiges Commerce-Modell: bepreiste Teilnehmertypen, bepreiste Zusatzauswahlen, Rabattcodes, Zahlungen über das bestehende Giving-Gateway der Gemeinde und eine statusgesteuerte Warteliste. Der Zahlungsweg nutzt bewusst denselben Giving-Stack — der Anmeldungs-Controller belastet über dieselbe `GatewayService`-/`IGatewayProvider`-Abstraktion, die unter [Giving](./giving) dokumentiert ist, sodass keine Kartendaten oder Gateway-SDK-Kenntnisse im Content-Modul liegen. Diese Seite bildet das Datenmodell, die Preis- und Kapazitätsregeln sowie die Anmelde-, Zahlungs- und Wartelisten-Abläufe ab.

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

Drei Regeln gelten über den gesamten Stack:

1. **Der Server besitzt den Preis.** Clients übermitteln Typ-IDs, Auswahl-IDs und Mengen; `RegistrationPricingHelper.computeTotal()` berechnet die Summe serverseitig, und Gutscheine werden zum Zeitpunkt der Belastung erneut validiert. Einem vom Client gelieferten Betrag wird nie vertraut.
2. **Kapazität wird atomar zum Einfügezeitpunkt durchgesetzt.** Jedes kapazitätsbegrenzte Insert verwendet eine `INSERT … SELECT … FROM dual WHERE (Anzahl aktiver Zeilen) < Kapazität`-Anweisung, sodass zwei gleichzeitige Anmeldungen nicht beide den letzten Platz belegen können. Zählungen werden aus dem Status abgeleitet (`pending`/`confirmed`), niemals gespeichert.
3. **Zahlungen laufen über die Giving-Schienen.** `RegistrationController` ruft das gemeinsame `GatewayService.processCharge` mit dem konfigurierten Gateway der Gemeinde auf — dieselbe Provider-Abstraktion, dasselbe Tokenisierungsmodell und dieselbe SCA-Behandlung wie bei Spenden.

## Datenmodell (`Api/src/modules/content`)

Modelle liegen in `models/Registration.ts`; Tabellenzuordnungen in `db/DatabaseTypes.ts`; ein Repo pro Tabelle unter `repositories/`.

| Tabelle | Bedeutung | Schlüsselfelder |
|-------|---------|-----------|
| `registrations` | Eine Anmeldung (ein Haushalt/eine Gruppe für eine Veranstaltung) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Ein Teilnehmer einer Anmeldung | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Teilnehmertypen pro Veranstaltung (z. B. Erwachsener / Kind) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Benannte Zusatzoptionen mit einem Preis (z. B. T-Shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (Obergrenze pro Anmeldung), sort, active |
| `registrationSelectionChoices` | Menge einer von einer Anmeldung/einem Mitglied gewählten Auswahl | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Eine erfolgreiche Belastung gegen eine Anmeldung | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabattcodes pro Veranstaltung | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Anmerkungen:

- **Es gibt keine Wartelisten-Tabelle.** Wartende Gruppen sind `registrations`-Zeilen mit `status = 'waitlisted'`; der gesamte Wartelisten-Lebenszyklus besteht aus Statusübergängen auf dieser einen Tabelle.
- **Keine gespeicherten Zähler.** „Verkauft"-/„Verwendet"-Zählungen (Veranstaltungskapazität, Kapazität pro Typ, Kapazität pro Auswahl, Gutscheinnutzung) werden mit korrelierten Unterabfragen über Zeilen berechnet, deren Status in `('pending','confirmed')` liegt (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Das Stornieren einer Anmeldung gibt daher Kapazität ohne jede Buchhaltung frei.
- Preise sind MySQL-DECIMAL-Spalten (Strings auf der Leitung), die im Pricing-Helper mit `Number()` umgewandelt werden.

## REST-Oberfläche

Alles liegt unter `/content/registrations` (`controllers/RegistrationController.ts`), abgesichert durch `Permissions.registrations` (`view` / `edit`):

| Route | Zugriff | Zweck |
|-------|--------|-------|
| `POST /register` | anonym | Vollständige Einreichung: Gast oder Mitglied, serverseitige Preisberechnung, Kapazitätsprüfungen, optionale Belastung |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | öffentlich | Typen/Auswahlen mit abgeleitetem `used` / `remainingCapacity` für den Assistenten |
| `POST /types`, `DELETE /types/:id` (ebenso für `/selections`, `/coupons`) | `registrations.edit` | CRUD für Mitarbeiter-Einstellungen |
| `POST /coupons/validate` | öffentlich | Inline-Validierung von Rabattcodes während des Assistenten |
| `GET /coupons/event/:eventId` | Mitarbeiter | Gutscheine mit Nutzungszählungen |
| `GET /event/:eventId` · `GET /event/:eventId/count` | Mitarbeiter · öffentlich | Teilnehmerliste; aktive Zählung für die Kapazitätsanzeige |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authentifiziert | Meine Anmeldungen, Detailansicht, Zahlungshistorie |
| `PUT /:id` | Inhaber/Mitarbeiter | Bearbeitung nach der Einreichung — ersetzt Mitglieder und Auswahl-Entscheidungen mit neuen atomaren Kapazitätsprüfungen, berechnet `totalAmount` neu; belastet oder erstattet nie automatisch |
| `POST /:id/pay` | Inhaber | „Zahlung abschließen": belastet `totalAmount − amountPaid`, wechselt `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | Mitarbeiter | Manuelle Wartelisten-Beförderung |
| `POST /:id/cancel` · `DELETE /:id` | Inhaber · Mitarbeiter | Stornieren / Löschen; beide lösen eine automatische Wartelisten-Beförderung aus |

Eine nicht stornierte bestehende Anmeldung derselben `personId` für dieselbe Veranstaltung wird mit einem 409 abgelehnt, und jede erstellte Anmeldung löst einen `registration.created`-Webhook über `WebhookDispatcher` aus.

## Preisgestaltung und Rabattcodes

`helpers/RegistrationPricingHelper.ts` ist die einzige Instanz für die Geldberechnung:

- `computeTotal()` summiert den Typpreis jedes Mitglieds plus `price × quantity` jeder Auswahlentscheidung.
- `validateCoupon()` erzwingt das Aktiv-Flag, das Datumsfenster (`startDate`/`endDate`), `minMembers` gegen die eingereichte Gruppengröße und `maxUses` gegen die statusabgeleitete Einlösungszählung.
- `applyDiscount()` — `percent` zieht `total × value/100` ab; `amount` zieht `value` ab; beide sind bei null gedeckelt.

Der Assistent ruft `POST /coupons/validate` für unmittelbares Feedback auf, aber `register` validiert und wendet den Gutschein serverseitig erneut an — die angezeigte Gesamtsumme des Clients ist nur ein Hinweis.

## Das atomare Kapazitäts-Idiom

Jedes kapazitätsbegrenzte Insert läuft ohne Transaktionen oder Sperren sicher gleichzeitig ab, indem die Kapazitätsprüfung Teil des `INSERT` selbst wird. Auf Veranstaltungsebene (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Null betroffene Zeilen bedeutet „an der Kapazitätsgrenze". Dasselbe Idiom schützt Inserts pro Typ (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, das Mitglieder zählt, die mit aktiven Anmeldungen verknüpft sind) und Mengen pro Auswahl (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, mit `COALESCE(SUM(quantity),0) + ? <= capacity`). Wenn ein Mitglieds- oder Auswahl-Insert mitten in der Anmeldung fehlschlägt, macht der Controller die Teilanmeldung mit `deleteCascade()` rückgängig und meldet, welcher Typ oder welche Auswahl ausverkauft ist.

## Zahlungsablauf

`processRegistrationCharge` im Controller ist die einzige Stelle, an der Anmeldungen Geld berühren, und ist ein dünner Client des Giving-Stacks:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Die Tokenisierung erfolgt im Browser genau wie bei Spenden (siehe [Giving](./giving)) — der Assistent nutzt dieselbe apphelper-Zahlungsanbieter-Registry wieder, sodass angemeldete Mitglieder mit gespeicherten Karten bezahlen können und Gäste eine neue Karte tokenisieren. Der Controller spiegelt die Eigenheiten der `DonateController`-Anbieter wider (Kingdom-Funding-`pm-{id}`-Zahlungsmethoden-IDs, Stripe-SCA-`requires_action`-Antworten, die an den Client zurückgegeben werden, ohne eine Zahlung zu verbuchen). Eine erfolgreiche Belastung schreibt eine `registrationPayments`-Zeile, erhöht `amountPaid` und bestätigt die Anmeldung. **Rückerstattungen sind nicht implementiert** — eine stornierte bezahlte Anmeldung behält ihre Zahlungszeilen, und jede Rückerstattung wird außerhalb des Systems im Gateway-Dashboard abgewickelt.

Beide Einstiegspunkte laufen über denselben Codepfad: `register` (Zahlung bei Anmeldung) und `pay` (Restzahlung / Wartelisten-Abschluss).

## Wartelisten-Lebenszyklus

Wenn die Veranstaltung voll ist und das `waitlistEnabled`-Flag der Veranstaltung aktiv ist, speichert `register` die Gruppe als `waitlisted` (Kapazitätsprüfungen werden übersprungen) und sendet die normale Bestätigungs-E-Mail, markiert als Wartelistenplatz. Die Beförderung erfolgt auf drei Wegen — `cancel`, `delete` und der Mitarbeiter-Endpunkt `promote` — die alle in `RegistrationRepo.promoteFromWaitlist` münden, das die älteste wartende Zeile wählt und sie atomar umschaltet:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Die `status='waitlisted'`-Bedingung stellt sicher, dass gleichzeitige Beförderungen eine Zeile nicht doppelt befördern können, und die Kapazitäts-Unterabfrage stellt sicher, dass eine Beförderung nicht überverkaufen kann. Beförderte Zeilen landen bei `pending` — nicht bei `confirmed` — weil möglicherweise noch ein Restbetrag geschuldet wird; `RegistrationHelper.sendWaitlistAvailabilityEmail` teilt dem Anmelder mit, dass sein Platz frei geworden ist, und verlinkt, wenn `totalAmount − amountPaid > 0`, zur Seite für die Restzahlung. Das Bezahlen (oder kein ausstehender Restbetrag) bestätigt die Anmeldung.

:::info
Eine Kapazitätserhöhung befördert nicht automatisch selbst — Mitarbeiter nutzen die Beförderungs-Aktion der Teilnehmerliste nach einer Kapazitätserhöhung. Stornierungen und Löschungen befördern automatisch.
:::

## Client-Oberflächen

- **B1App-Assistent** — ein gemeinsamer Hook, `B1App/src/components/registration/useEventRegistration.ts`, steuert sowohl die Website-Komponente (`components/registration/EventRegister.tsx`) als auch den mobilen Portal-Screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) durch die Schritte `info → members → selections → questions → payment → confirm` (die mittleren Schritte werden nur gerendert, wenn die Veranstaltung Auswahlen, ein angehängtes Formular oder eine von null verschiedene Gesamtsumme hat). Die Info-/Mitglieder-Schritte zeigen Auswahlfelder pro Teilnehmertyp mit live aktualisierter verbleibender Kapazität und Ausverkauft-Zuständen; die Zahlung (`RegistrationPaymentForm.tsx`) zeigt die Bestellübersicht, die Eingabe des Rabattcodes und — für angemeldete Mitglieder — gespeicherte Zahlungsmethoden über die apphelper-Anbieter-Registry, wobei Gäste eine neue Karte tokenisieren. Der mobile Screen **Registrations** (`screens/RegistrationsPage.tsx`) ist „Meine Anmeldungen": Status, offener Restbetrag, Zahlung abschließen (`POST /:id/pay`), Bearbeiten (`PUT /:id` — Kontakt, Mitgliedstypen, Auswahlmengen) und Stornieren.
- **B1Admin-Einstellungen** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` fügt den Schalter „Warteliste aktivieren" sowie Akkordeons für Teilnehmertypen, Auswahlen und Rabattcodes hinzu (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), alle als CRUD gegen die Routen `/types`, `/selections`, `/coupons`.
- **B1Admin-Teilnehmerliste** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: Spalte für den Teilnehmertyp pro Teilnehmer, Spalte Bezahlt/Gesamt mit Restbetrags-Chip, Zählungs-Chips pro Typ, ein Zahlungsdetail-Dialog (`RegistrationDetailDialog.tsx`, aus `GET /payments/:registrationId`), die Zeilenaktion „Warteliste befördern" und CSV-Export einschließlich Teilnehmertypen, Auswahlen, Bezahlt/Gesamt/Restbetrag und Antworten auf Fragen.

Modulübergreifende Lookups (Auflösen oder Anlegen der Gastperson, Laden der Gemeinde für E-Mails) laufen über `getMembershipModuleGateway()` — das Content-Modul liest niemals direkt Membership-Tabellen.

## Verwandte Seiten

- [Giving](./giving) — die Gateway-Abstraktion, die Anbieter-Registry und das Tokenisierungsmodell, die diese Funktion wiederverwendet
- [Content-Endpunkte](../api/endpoints/content) — die REST-Oberfläche des Content-Moduls
- [Webhooks](../api/webhooks) — das `registration.created`-Ereignis
- [Modulstruktur](../api/module-structure) — wie das Content-Modul serverseitig organisiert ist
