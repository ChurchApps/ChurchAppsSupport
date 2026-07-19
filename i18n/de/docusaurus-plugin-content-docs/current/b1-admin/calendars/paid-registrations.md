---
title: "Bezahlte Anmeldungen"
---

# Bezahlte Anmeldungen

<div class="article-intro">

Die Event-Registrierung kann über eine einfache Headcount hinausgehen. Du kannst Preis-Teilnehmertypen (wie Erwachsener und Kind) definieren, optionale Add-ons mit ihren eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und Zahlungen bei der Registrierung über den bestehenden Spendenanbieter deiner Kirche einziehen. Wenn ein Event voll ist, hält eine optionale Warteliste interessierte Mitglieder in der Reihe und befördert sie automatisch, wenn sich Plätze öffnen.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Aktiviere zuerst die Registrierung auf dem Event – siehe [Kalender erstellen](creating-calendars#enabling-event-registration)
- Um Zahlungen einzuziehen, muss deine Kirche [Online-Spenden konfiguriert](../donations/online-giving-setup.md) haben (Stripe, PayPal oder Kingdom Funding). Kostenlose Events benötigen kein Spendensetup.

</div>

## Öffnen der Registrierungseinstellungen

1. Gehe in B1 Admin zur Seite **Registrierungen** und öffne dein Event (oder öffne das Event von seinem Kalender).
2. Die Karte **Registrierungseinstellungen** zeigt die Grundlagen – **Registrierung aktivieren**, **Kapazität**, **Registrierung öffnet/schließt**, **Tags** und **Registrierungsfragen**.
3. Unterhalb der Grundlagen befinden sich drei Akkordeons: **Teilnehmertypen**, **Auswahlen** und **Rabattcodes**.

## Teilnehmertypen

Teilnehmertypen ermöglichen es dir, verschiedene Preise für verschiedene Arten von Teilnehmern in Rechnung zu stellen – und jede separat zu begrenzen.

1. Erweitere das Akkordeon **Teilnehmertypen** und klicke auf **Typ hinzufügen**.
2. Gib einen **Namen** ein (z. B. "Erwachsener", "Kind", "Student").
3. Stelle einen **Preis** ein. Verwende 0 für einen kostenlosen Typ.
4. Stelle optional eine **Kapazität** nur für diesen Typ ein (z. B. nur 20 Kind-Plätze). Lass das Feld leer für kein Pro-Typ-Limit.
5. Klicke auf **Speichern**.

Bei der Registrierung wählt jeder Teilnehmer einen Typ; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Das Roster zeigt den Typ jedes Teilnehmers und laufende Pro-Typ-Zählungen.

## Auswahlen

Auswahlen sind optionale Preis-Add-ons – T-Shirts, Essenspläne, Aktivitäts-Upgrades.

1. Erweitere das Akkordeon **Auswahlen** und klicke auf **Auswahl hinzufügen**.
2. Gib einen **Namen**, optionale **Beschreibung** und einen **Preis** ein (0 wird als "Kostenlos" angezeigt).
3. Stelle optional eine **Kapazität** (insgesamt verfügbar über alle Registrierungen) und eine **Max. Menge** (die meisten, die eine Registrierung bestellen kann) ein.
4. Klicke auf **Speichern**.

Anmeldende wählen während der Anmeldung Mengen aus, und die Summen zählen gegen die Kapazität, sodass du niemals überverkaufst.

## Rabattcodes

1. Erweitere das Akkordeon **Rabattcodes** und klicke auf **Rabattcode hinzufügen**.
2. Gib den **Code** ein, den Anmeldende eingeben werden.
3. Wähle den **Typ** – **Prozent** oder **Betrag** – und seinen **Wert**.
4. Begrenzte optional den Code mit einem **Startdatum** / **Enddatum**, eine **Min. Mitglieder** (Mindestanzahl der Teilnehmer bei der Registrierung) und **Max. Verwendungen**.
5. Klicke auf **Speichern**.

Jeder Code zeigt eine Zählung **Verwendungen**, sodass du sehen kannst, wie oft er eingelöst wurde. Anmeldende erhalten sofortiges Feedback, wenn sie einen Code anwenden – einschließlich klarer Nachrichten, wenn ein Code abgelaufen ist, noch nicht gestartet hat oder mehr Teilnehmer benötigt.

## Warteliste

Aktiviere **Warteliste aktivieren** in der Karte Registrierungseinstellungen. Wenn das Event die Kapazität erreicht:

- Neue Anmeldende werden mit einem Wartelistenplatz angeboten, anstatt abgewiesen zu werden. Sie vervollständigen die gleiche Anmeldung (Zahlung wird übersprungen, während sie auf der Warteliste stehen).
- Wenn jemand absagt, wird die älteste Wartelistenregistrierung **automatisch befördert** und erhält eine E-Mail, dass ein Platz verfügbar ist. Wenn sie einen Restbetrag schulden, verlinkt die E-Mail sie zur Zahlungsvervollständigung.
- Du kannst jemanden jederzeit manuell mit der Aktion **Befördern** auf einer Wartelistenzeile befördern – nützlich nach Erhöhung der Event-Kapazität.

:::info
Beförderte Registrierungen bleiben *ausstehend*, bis ein Restbetrag bezahlt wird; Zahlung (oder Nichts zu zahlen) bestätigt sie.
:::

## Die Registrierungs-Roster

Öffne ein Event von der Seite Registrierungen, um jede Registrierung zu sehen. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (Typ jedes Teilnehmers), **Bezahlt / Insgesamt** (mit einer Restbetrag-Warnung, wenn Geld noch geschuldet ist), **Status** und **Datum**, plus Zählung-Chips pro Typ über der Tabelle.

- Klicke auf das Symbol "Details" einer Zeile, um das Dialogfeld **Registrierungsdetails** zu öffnen – Mitglieder, Auswahlen, bezahlt/Restbetrag und eine Tabelle **Zahlungen**, die jede Gebühr auflistet (Betrag, Methode, Datum).
- **CSV exportieren** lädt das vollständige Roster herunter mit Spalten für Mitglieder, Teilnehmertypen, Auswahlen, bezahlt/Insgesamt/Restbetrag, Status und eine Spalte pro Registrierungsfrage.
- **Teilnehmer hinzufügen** ermöglicht es dir immer noch, Offline-Anmeldungen manuell aufzuzeichnen.

:::info
Rückerstattungen werden nicht in B1 verarbeitet. Wenn du eine stornierte bezahlte Registrierung erstatten musst, stelle die Rückerstattung vom Dashboard deines Spendenanbieters aus (z. B. Stripe).
:::

## Wie Zahlungen funktionieren

Zahlungen laufen über das gleiche Spendengateway, das deine Kirche bereits für Spenden verwendet – Kartendaten gehen direkt an den Anbieter und berühren niemals die Server von B1. Die Preise werden immer vom Server aus deinen konfigurierten Typen, Auswahlen und Rabattcodes berechnet, sodass eine Anmeldende die Summe nicht manipulieren kann. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen; Gäste geben eine Karte beim Checkout ein.

## Verwandte Artikel

- [Kalender erstellen](creating-calendars#enabling-event-registration) – Aktiviere Registrierung und die Grundeinstellungen
- [Online-Spenden-Setup](../donations/online-giving-setup.md) – Konfiguriere das Zahlungsgateway beim Checkout
- [Registrierung für Events](../../b1-church/events/registering) – Was Mitglieder sehen, wenn sie sich anmelden
- [Meine Registrierungen](../../b1-church/events/my-registrations) – Wie Mitglieder Salden bezahlen und Registrierungen bearbeiten
