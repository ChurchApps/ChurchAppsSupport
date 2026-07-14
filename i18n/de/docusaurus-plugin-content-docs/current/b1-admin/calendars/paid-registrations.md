---
title: "Bezahlte Registrierungen"
---

# Bezahlte Registrierungen

<div class="article-intro">

Event-Registrierung kann über eine einfache Kopfzahl hinausgehen. Sie können Preise für Teilnehmertypen (wie Erwachsene und Kind) definieren, optionale Add-ons mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und Zahlungen bei der Registrierung über den vorhandenen Spendengeber Ihrer Kirche einziehen. Wenn ein Event ausgebucht ist, hält eine optionale Warteliste interessierte Mitglieder auf dem Laufenden und befördert sie automatisch, wenn Plätze frei werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zunächst die Registrierung für das Event -- siehe [Kalender erstellen](creating-calendars#enabling-event-registration)
- Um Zahlungen einzuziehen, benötigt Ihre Kirche [Online-Spenden konfiguriert](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Events benötigen kein Spenden-Setup.

</div>

## Registrierungseinstellungen öffnen

1. Gehen Sie in B1 Admin zur Seite **Registrierungen** und öffnen Sie Ihr Event (oder öffnen Sie das Event von seinem Kalender).
2. Die Karte **Registrierungseinstellungen** zeigt die Grundlagen -- **Registrierung aktivieren**, **Kapazität**, **Registrierung öffnet/schließt**, **Tags** und **Registrierungsfragen**.
3. Unter den Grundlagen befinden sich drei Akkordeons: **Teilnehmertypen**, **Auswahlmöglichkeiten** und **Rabattcodes**.

## Teilnehmertypen

Teilnehmertypen ermöglichen es Ihnen, verschiedene Preise für verschiedene Arten von Teilnehmern zu berechnen – und jede separate zu begrenzen.

1. Erweitern Sie das Akkordeon **Teilnehmertypen** und klicken Sie **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z.B. "Erwachsener", "Kind", "Student").
3. Stellen Sie einen **Preis** ein. Verwenden Sie 0 für einen kostenlosen Typ.
4. Stellen Sie optional eine **Kapazität** nur für diesen Typ ein (z.B. nur 20 Kind-Plätze). Leer lassen für keine Pro-Typ-Grenze.
5. Klicken Sie **Speichern**.

Während der Registrierung wählt jeder Teilnehmer einen Typ; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Die Namensliste zeigt den Typ jedes Teilnehmers und laufende Pro-Typ-Zählungen an.

## Auswahlmöglichkeiten

Auswahlmöglichkeiten sind optionale preisgekrönte Add-ons – T-Shirts, Mahlzeitenpläne, Aktivitätsupgrades.

1. Erweitern Sie das Akkordeon **Auswahlmöglichkeiten** und klicken Sie **Auswahlmöglichkeit hinzufügen**.
2. Geben Sie einen **Namen**, optionale **Beschreibung** und einen **Preis** ein (0 wird als "Kostenlos" angezeigt).
3. Stellen Sie optional eine **Kapazität** (insgesamt verfügbar über alle Registrierungen) und **Max Menge** (die meisten eine Registrierung kann bestellen) ein.
4. Klicken Sie **Speichern**.

Registranden wählen Mengen während der Anmeldung aus, und die Gesamtzahlen zählen gegen die Kapazität, damit Sie niemals zu viel verkaufen.

## Rabattcodes

1. Erweitern Sie das Akkordeon **Rabattcodes** und klicken Sie **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Registranden eingeben.
3. Wählen Sie den **Typ** -- **Prozent** oder **Betrag** -- und seinen **Wert**.
4. Begrenzung Sie den Code optional mit **Startdatum** / **Enddatum**, **Mindestmitglieder** (Mindestanzahl der Teilnehmer bei der Registrierung) und **Max. Verwendungen**.
5. Klicken Sie **Speichern**.

Jeder Code zeigt eine **Verwendungsanzahl**, damit Sie sehen können, wie oft er eingelöst wurde. Registranden erhalten sofortiges Feedback, wenn sie einen Code anwenden – einschließlich klarer Meldungen, wenn ein Code abgelaufen ist, nicht gestartet hat oder mehr Teilnehmer benötigt.

## Warteliste

Schalten Sie **Warteliste aktivieren** in der Karte Registrierungseinstellungen ein. Wenn das Event die Kapazität erreicht:

- Neue Registranden wird ein Wartelistenplatz angeboten, statt sie abzuweisen. Sie füllen die gleiche Anmeldung aus (Zahlung wird übersprungen, während auf der Warteliste).
- Wenn jemand storniert, wird die älteste Wartelistenregistrierung **automatisch befördert** und erhält eine E-Mail, dass ein Platz frei wurde. Falls sie einen Restbetrag schulden, verlinkt die E-Mail sie zum Abschließen der Zahlung.
- Sie können jemanden jederzeit manuell mit der Aktion **Befördern** auf einer Wartelistezeile befördern – nützlich nach Erhöhung der Event-Kapazität.

:::info
Beförderte Registrierungen bleiben *ausstehend*, bis ein Restbetrag bezahlt wird; Zahlung (oder nichts zu zahlen) bestätigt sie.
:::

## Die Registrierungs-Namensliste

Öffnen Sie ein Event von der Registrierungsseite, um jede Registrierung zu sehen. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (Typ jedes Teilnehmers), **Bezahlt / Gesamtbetrag** (mit Warnung bei Restbetrag), **Status** und **Datum**, plus Pro-Typ-Zählungs-Chips über der Tabelle.

- Klicken Sie auf das Details-Symbol einer Zeile, um das Dialogfeld **Registrierungsdetails** zu öffnen -- Mitglieder, Auswahlmöglichkeiten, Bezahlt/Restbetrag und eine Tabelle **Zahlungen**, die jede Belastung (Betrag, Methode, Datum) auflistet.
- **CSV exportieren** lädt die vollständige Namensliste mit Spalten für Mitglieder, Teilnehmertypen, Auswahlmöglichkeiten, Bezahlt/Gesamtbetrag/Restbetrag, Status und eine Spalte pro Registrierungsfrage herunter.
- **Teilnehmer hinzufügen** ermöglicht es Ihnen, Offline-Anmeldungen manuell zu erfassen.

:::info
Rückerstattungen werden nicht in B1 bearbeitet. Wenn Sie eine stornierte bezahlte Registrierung erstatten müssen, stellen Sie die Rückerstattung vom Dashboard Ihres Spendendanbieters aus (z.B. Stripe) aus.
:::

## Wie Zahlungen funktionieren

Zahlungen laufen über das gleiche Spenden-Gateway, das Ihre Kirche bereits für Spenden verwendet – Kartendaten gehen direkt an den Anbieter und berühren niemals die Server von B1. Preise werden immer vom Server aus Ihren konfigurierten Typen, Auswahlmöglichkeiten und Rabattcodes berechnet, daher kann ein Registrand den Gesamtbetrag nicht manipulieren. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen; Gäste geben eine Karte beim Checkout ein.

## Verwandte Artikel

- [Kalender erstellen](creating-calendars#enabling-event-registration) -- Registrierung aktivieren und die grundlegenden Einstellungen
- [Online-Spenden-Setup](../donations/online-giving-setup.md) -- Konfigurieren Sie das Spenden-Gateway, das beim Checkout verwendet wird
- [Registrierung für Events](../../b1-church/events/registering) -- was Mitglieder sehen, wenn sie sich anmelden
- [Meine Registrierungen](../../b1-church/events/my-registrations) -- wie Mitglieder Restbeträge zahlen und Registrierungen bearbeiten
