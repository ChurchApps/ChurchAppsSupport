---
title: "Bezahlte Registrierungen"
---

# Bezahlte Registrierungen

<div class="article-intro">

Die Ereignisregistrierung kann über einen einfachen Kopfstand hinausgehen. Sie können Preis-Teilnehmertypen (wie Adult und Child) definieren, optionale Add-ons mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und Zahlungen bei der Registrierung über Ihren bestehenden Kirchengeber einziehen. Wenn ein Ereignis voll wird, hält eine optionale Warteliste interessierte Mitglieder in der Reihe und befördert sie automatisch, wenn Plätze frei werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zuerst die Registrierung für das Ereignis -- siehe [Kalender erstellen](creating-calendars#enabling-event-registration)
- Um Zahlungen einzuziehen, muss Ihre Kirche [Online-Geben konfiguriert](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Ereignisse benötigen keine Geben-Einrichtung.

</div>

## Registrierungseinstellungen öffnen

1. In B1 Admin öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Kalender > Registrierungen** und öffnen Sie Ihr Ereignis (oder öffnen Sie das Ereignis aus seinem Kalender).
2. Die Karte **Registrierungseinstellungen** zeigt die Grundlagen -- **Registrierung aktivieren**, **Kapazität**, **Registrierung öffnet/schließt**, **Tags** und **Registrierungsfragen**.
3. Unter den Grundlagen befinden sich drei Accordion: **Teilnehmertypen**, **Auswahl** und **Rabattcodes**.

## Teilnehmertypen

Mit Teilnehmertypen können Sie verschiedene Preise für verschiedene Arten von Teilnehmern berechnen -- und jede separat begrenzen.

1. Erweitern Sie das Accordion **Teilnehmertypen** und klicken Sie auf **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z.B. „Adult", „Child", „Student").
3. Legen Sie einen **Preis** fest. Verwenden Sie 0 für einen kostenlosen Typ.
4. Legen Sie optional eine **Kapazität** nur für diesen Typ fest (z.B. nur 20 Child-Plätze). Lassen Sie leer für keine Pro-Typ-Grenze.
5. Klicken Sie auf **Speichern**.

Während der Registrierung wählt jeder Teilnehmer einen Typ; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Die Tabelle zeigt den Typ jedes Teilnehmers und laufende Pro-Typ-Zählungen.

## Auswahl

Auswahl sind optionale Preis-Add-ons -- T-Shirts, Essenpläne, Aktivitäts-Upgrades.

1. Erweitern Sie das Accordion **Auswahl** und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, eine optionale **Beschreibung** und einen **Preis** ein (0 wird als „Kostenlos" angezeigt).
3. Legen Sie optional eine **Kapazität** (Gesamtmenge verfügbar über alle Registrierungen) und eine **Max Menge** (die meiste, die eine Registrierung bestellen kann) fest.
4. Klicken Sie auf **Speichern**.

Registranten wählen Mengen während der Anmeldung, und die Gesamtzahl zählt gegen die Kapazität, damit Sie nie überverkaufen.

## Rabattcodes

1. Erweitern Sie das Accordion **Rabattcodes** und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Registranten eingeben.
3. Wählen Sie den **Typ** -- **Prozent** oder **Betrag** -- und seinen **Wert**.
4. Begrenzen Sie den Code optional mit einem **Startdatum** / **Enddatum**, einer **Mindestmitglieder** (Mindestanzahl von Teilnehmern bei der Registrierung) und **Max Verwendungen**.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt eine **Verwendungen**-Zählung, damit Sie sehen können, wie oft er eingelöst wurde. Registranten erhalten sofortige Rückmeldung, wenn sie einen Code anwenden -- einschließlich klarer Meldungen, wenn ein Code abgelaufen ist, nicht gestartet hat oder mehr Teilnehmer benötigt.

## Warteliste

Schalten Sie **Warteliste aktivieren** in der Karte Registrierungseinstellungen ein. Wenn das Ereignis die Kapazität erreicht:

- Neue Registranten wird stattdessen ein Wartelisten-Platz angeboten, anstatt abgelehnt zu werden. Sie schließen die gleiche Anmeldung ab (Zahlung wird übersprungen, während sie auf der Warteliste sind).
- Wenn jemand storniert, wird die älteste Wartelisten-Registrierung **automatisch befördert** und erhält eine E-Mail, dass ein Platz frei wurde. Wenn sie einen Saldo schulden, verlinkt die E-Mail sie zur Zahlung abschließen.
- Sie können jemanden jederzeit manuell mit der Aktion **Befördern** auf einer Wartelisten-Reihe befördern -- praktisch nach Erhöhung der Ereigniskapazität.

:::info
Beförderte Registrierungen bleiben *ausstehend*, bis ein Saldo bezahlt wird; Zahlung (oder nichts zu zahlen) bestätigt sie.
:::

## Die Registrierungstabelle

Öffnen Sie ein Ereignis von der Seite Registrierungen aus, um jede Registrierung zu sehen. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (Typ jedes Teilnehmers), **Bezahlt / Gesamt** (mit einer Saldo-Warnung, wenn Geld noch geschuldet wird), **Status** und **Datum**, plus Pro-Typ-Zählungs-Chips über der Tabelle.

- Klicken Sie auf das Details-Symbol einer Reihe, um den Dialog **Registrierungsdetails** zu öffnen -- Mitglieder, Auswahl, Bezahlt/Saldo und eine Tabelle **Zahlungen**, die jede Ladung auflistet (Betrag, Methode, Datum).
- **CSV exportieren** lädt die vollständige Tabelle herunter mit Spalten für Mitglieder, Teilnehmertypen, Auswahl, Bezahlt/Saldo/Betrag, Status und eine Spalte pro Registrierungsfrage.
- **Teilnehmer hinzufügen** ermöglicht es Ihnen weiterhin, Offline-Anmeldungen manuell zu erfassen.

:::info
Erstattungen werden nicht innerhalb von B1 verarbeitet. Wenn Sie eine stornierte bezahlte Registrierung erstatten müssen, geben Sie die Erstattung aus dem Dashboard Ihres Gebers aus (z.B. Stripe).
:::

## Wie Zahlungen funktionieren

Zahlungen laufen durch das gleiche Geben-Gateway, das Ihre Kirche bereits für Spenden nutzt -- Kartendaten gehen direkt zum Anbieter und berühren niemals B1's Server. Preise werden immer vom Server aus Ihren konfigurierten Typen, Auswahl und Rabattcodes berechnet, daher kann ein Registrant die Gesamtsumme nicht manipulieren. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen; Gäste geben eine Karte beim Auschecken ein.

## Verwandte Artikel

- [Kalender erstellen](creating-calendars#enabling-event-registration) -- Aktivieren Sie die Registrierung und die Grundeinstellungen
- [Online-Geben einrichten](../donations/online-giving-setup.md) -- Konfigurieren Sie das Zahlungsgateway, das beim Auschecken verwendet wird
- [Registrierung für Ereignisse](../../b1-church/events/registering) -- Was Mitglieder sehen, wenn sie sich anmelden
- [Meine Registrierungen](../../b1-church/events/my-registrations) -- Wie Mitglieder Salden bezahlen und Registrierungen bearbeiten
