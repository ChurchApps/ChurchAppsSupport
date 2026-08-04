---
title: "Kostenpflichtige Anmeldungen"
---

# Kostenpflichtige Anmeldungen

<div class="article-intro">

Die Veranstaltungsanmeldung kann mehr als eine einfache Teilnehmerzählung leisten. Sie können bepreiste Teilnehmertypen definieren (wie Erwachsener und Kind), optionale Zusatzoptionen mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und bei der Anmeldung über den bestehenden Spendenanbieter Ihrer Gemeinde Zahlungen entgegennehmen. Wenn eine Veranstaltung ausgebucht ist, hält eine optionale Warteliste interessierte Mitglieder in der Warteschlange und befördert sie automatisch, sobald Plätze frei werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zunächst die Anmeldung für die Veranstaltung — siehe [Kalender erstellen](creating-calendars#enabling-event-registration)
- Um Zahlungen entgegenzunehmen, benötigt Ihre Gemeinde [eingerichtetes Online-Spenden](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Veranstaltungen benötigen keine Spendeneinrichtung.

</div>

## Anmeldeeinstellungen öffnen

1. Gehen Sie in B1 Admin zur Seite **Anmeldungen** und öffnen Sie Ihre Veranstaltung (oder öffnen Sie die Veranstaltung über ihren Kalender).
2. Die Karte **Anmeldeeinstellungen** zeigt die Grundlagen — **Anmeldung aktivieren**, **Kapazität**, **Anmeldung öffnet/schließt**, **Tags** und **Anmeldefragen**.
3. Unterhalb der Grundlagen befinden sich drei Akkordeons: **Teilnehmertypen**, **Auswahlmöglichkeiten** und **Rabattcodes**.

## Teilnehmertypen

Mit Teilnehmertypen können Sie unterschiedliche Preise für unterschiedliche Teilnehmerarten verlangen — und jede davon separat begrenzen.

1. Erweitern Sie das Akkordeon **Teilnehmertypen** und klicken Sie auf **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z. B. „Erwachsener", „Kind", „Student").
3. Legen Sie einen **Preis** fest. Verwenden Sie 0 für einen kostenlosen Typ.
4. Legen Sie optional eine **Kapazität** nur für diesen Typ fest (z. B. nur 20 Plätze für Kinder). Leer lassen für kein typspezifisches Limit.
5. Klicken Sie auf **Speichern**.

Während der Anmeldung wählt jeder Teilnehmer einen Typ; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Die Teilnehmerliste zeigt den Typ jedes Teilnehmers sowie laufende Zählungen pro Typ.

## Auswahlmöglichkeiten

Auswahlmöglichkeiten sind optionale bepreiste Zusatzoptionen — T-Shirts, Essenspläne, Aktivitäts-Upgrades.

1. Erweitern Sie das Akkordeon **Auswahlmöglichkeiten** und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, eine optionale **Beschreibung** und einen **Preis** ein (0 wird als „Kostenlos" angezeigt).
3. Legen Sie optional eine **Kapazität** (insgesamt verfügbar über alle Anmeldungen hinweg) und eine **Max. Menge** (die höchste Anzahl, die eine Anmeldung bestellen kann) fest.
4. Klicken Sie auf **Speichern**.

Teilnehmer wählen Mengen bei der Anmeldung, und die Summen werden gegen die Kapazität gezählt, sodass Sie nie überbuchen.

## Rabattcodes

1. Erweitern Sie das Akkordeon **Rabattcodes** und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Teilnehmer eingeben werden.
3. Wählen Sie den **Typ** — **Prozent** oder **Betrag** — und dessen **Wert**.
4. Beschränken Sie den Code optional mit einem **Startdatum** / **Enddatum**, einer **Mindestanzahl Mitglieder** (Mindestanzahl an Teilnehmern in der Anmeldung) und **Max. Nutzungen**.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt eine **Nutzungen**-Zählung an, damit Sie sehen können, wie oft er eingelöst wurde. Teilnehmer erhalten sofortiges Feedback, wenn sie einen Code anwenden — einschließlich klarer Meldungen, wenn ein Code abgelaufen ist, noch nicht begonnen hat oder mehr Teilnehmer erfordert.

## Warteliste

Aktivieren Sie **Warteliste aktivieren** in der Karte Anmeldeeinstellungen. Wenn die Veranstaltung die Kapazität erreicht:

- Neuen Anmeldern wird stattdessen ein Wartelistenplatz angeboten, anstatt sie abzuweisen. Sie durchlaufen dieselbe Anmeldung (die Zahlung wird auf der Warteliste übersprungen).
- Wenn jemand storniert, wird die älteste Anmeldung auf der Warteliste **automatisch befördert** und erhält eine E-Mail, dass ein Platz frei geworden ist. Falls noch ein Betrag offen ist, verlinkt die E-Mail zum Abschluss der Zahlung.
- Sie können jederzeit manuell jemanden mit der Aktion **Befördern** in einer Wartelistenzeile befördern — nützlich, nachdem Sie die Veranstaltungskapazität erhöht haben.

:::info
Beförderte Anmeldungen bleiben *ausstehend*, bis ein offener Betrag bezahlt ist; das Bezahlen (oder wenn nichts zu zahlen ist) bestätigt sie.
:::

## Die Anmeldeliste

Öffnen Sie eine Veranstaltung über die Seite Anmeldungen, um jede Anmeldung zu sehen. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (Typ jedes Teilnehmers), **Bezahlt / Gesamt** (mit einer Warnung bei offenem Betrag), **Status** und **Datum**, sowie Zählchips pro Typ oberhalb der Tabelle.

- Klicken Sie auf das Detail-Symbol einer Zeile, um den Dialog **Anmeldedetails** zu öffnen — Mitglieder, Auswahlmöglichkeiten, Bezahlt/Saldo und eine **Zahlungen**-Tabelle mit jeder Belastung (Betrag, Methode, Datum).
- **CSV exportieren** lädt die vollständige Teilnehmerliste mit Spalten für Mitglieder, Teilnehmertypen, Auswahlmöglichkeiten, Bezahlt/Gesamt/Saldo, Status und eine Spalte pro Anmeldefrage herunter.
- **Teilnehmer hinzufügen** ermöglicht weiterhin die manuelle Erfassung von Offline-Anmeldungen.

:::info
Rückerstattungen werden nicht innerhalb von B1 verarbeitet. Wenn Sie eine stornierte, bezahlte Anmeldung erstatten müssen, veranlassen Sie die Rückerstattung über das Dashboard Ihres Spendenanbieters (z. B. Stripe).
:::

## So funktioniert die Zahlung

Zahlungen laufen über dasselbe Spenden-Gateway, das Ihre Gemeinde bereits für Spenden verwendet — Kartendaten gehen direkt an den Anbieter und berühren nie die Server von B1. Preise werden immer serverseitig anhand Ihrer konfigurierten Typen, Auswahlmöglichkeiten und Rabattcodes berechnet, sodass ein Teilnehmer die Summe nicht manipulieren kann. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen; Gäste geben eine Karte an der Kasse ein.

## Verwandte Artikel

- [Kalender erstellen](creating-calendars#enabling-event-registration) — Anmeldung aktivieren und die grundlegenden Einstellungen
- [Online-Spenden einrichten](../donations/online-giving-setup.md) — das an der Kasse verwendete Zahlungs-Gateway konfigurieren
- [Für Veranstaltungen anmelden](../../b1-church/events/registering) — was Mitglieder bei der Anmeldung sehen
- [Meine Anmeldungen](../../b1-church/events/my-registrations) — wie Mitglieder offene Beträge bezahlen und Anmeldungen bearbeiten
