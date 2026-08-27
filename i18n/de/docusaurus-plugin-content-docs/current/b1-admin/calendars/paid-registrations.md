---
title: "Kostenpflichtige Anmeldungen"
---

# Kostenpflichtige Anmeldungen

<div class="article-intro">

Veranstaltungsanmeldungen können über eine einfache Personenzählung hinausgehen. Sie können Besuchertypkosten definieren (wie Erwachsene und Kinder), optionale Add-ons mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und Zahlungen bei der Anmeldung über den bestehenden Spendenprovider Ihrer Kirche einziehen. Wenn eine Veranstaltung voll ist, kann eine optionale Warteliste interessierte Mitglieder verwalten und sie automatisch befördern, wenn Plätze frei werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zunächst die Anmeldung für das Event – siehe [Creating Calendars](creating-calendars#enabling-event-registration)
- Um Zahlungen einzuziehen, muss Ihre Kirche [Online-Spenden konfiguriert haben](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Events benötigen kein Setup für Spenden.

</div>

## Öffnen der Anmeldungseinstellungen

1. Gehen Sie in B1 Admin auf die Seite **Anmeldungen** und öffnen Sie Ihr Event (oder öffnen Sie das Event aus seinem Kalender).
2. Die Karte **Anmeldungseinstellungen** zeigt die Grundlagen – **Anmeldung aktivieren**, **Kapazität**, **Anmeldung öffnet/schließt**, **Tags** und **Anmeldungsfragen**.
3. Unter den Grundlagen befinden sich drei Akkordeons: **Besuchertypen**, **Auswahlen** und **Rabattcodes**.

## Besuchertypen

Besuchertypen ermöglichen es Ihnen, verschiedenen Arten von Besuchern unterschiedliche Preise zu berechnen – und jede Kategorie separat zu begrenzen.

1. Erweitern Sie das Akkordeon **Besuchertypen** und klicken Sie auf **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z. B. „Erwachsener", „Kind", „Student").
3. Setzen Sie einen **Preis**. Verwenden Sie 0 für einen kostenlosen Typ.
4. Optional können Sie eine **Kapazität** nur für diesen Typ einstellen (z. B. nur 20 Kindplätze). Lassen Sie das Feld leer, wenn es kein Limit pro Typ gibt.
5. Klicken Sie auf **Speichern**.

Bei der Anmeldung wählt jeder Besucher einen Typ; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Das Verzeichnis zeigt den Besuchertyp jedes Teilnehmers und laufende Zählungen pro Typ.

## Auswahlen

Auswahlen sind optionale bezahlte Add-ons – T-Shirts, Mahlzeitenpläne, Aktivitäts-Upgrades.

1. Erweitern Sie das Akkordeon **Auswahlen** und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, optionale **Beschreibung** und einen **Preis** ein (0 wird als „Kostenlos" angezeigt).
3. Optional können Sie eine **Kapazität** (insgesamt verfügbar für alle Anmeldungen) und eine **Max. Menge** (maximal eine Anmeldung bestellen) einstellen.
4. Klicken Sie auf **Speichern**.

Die Anmeldenden wählen Mengen während der Anmeldung aus, und die Gesamtmengen werden gegen die Kapazität angerechnet, damit Sie nie zu viel verkaufen.

## Rabattcodes

1. Erweitern Sie das Akkordeon **Rabattcodes** und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den die Anmeldenden eingeben.
3. Wählen Sie den **Typ** – **Prozentsatz** oder **Betrag** – und seinen **Wert**.
4. Optional können Sie den Code mit einem **Startdatum** / **Enddatum**, einer **Min. Anzahl Mitglieder** (Mindestzahl der Teilnehmer bei der Anmeldung) und **Max. Verwendungen** begrenzen.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt eine **Verwendungs**zählung, damit Sie sehen können, wie oft er eingelöst wurde. Die Anmeldenden erhalten sofortiges Feedback, wenn sie einen Code eingeben – einschließlich klarer Meldungen, wenn ein Code abgelaufen ist, nicht gestartet wurde oder mehr Teilnehmer benötigt.

## Warteliste

Aktivieren Sie **Warteliste aktivieren** in der Karte Anmeldungseinstellungen. Wenn die Veranstaltung die Kapazität erreicht:

- Neue Anmeldungen werden angeboten, sich auf die Warteliste zu setzen, anstatt abgelehnt zu werden. Sie schließen die gleiche Anmeldung ab (die Zahlung wird übersprungen, während sie auf der Warteliste stehen).
- Wenn jemand kündigt, wird die älteste Wartelisten-Anmeldung **automatisch befördert** und erhält eine E-Mail, dass sich ein Platz geöffnet hat. Wenn sie noch einen Restbetrag schulden, verlinkt die E-Mail sie zum Abschließen der Zahlung.
- Sie können jemanden jederzeit manuell mit der Aktion **Befördern** auf einer Zeile auf der Warteliste befördern – nützlich nach Erhöhung der Veranstaltungskapazität.

:::info
Beförderte Anmeldungen bleiben *ausstehend*, bis ein Restbetrag bezahlt ist; Zahlen (oder Nichts schulden) bestätigt sie.
:::

## Das Anmeldungsverzeichnis

Öffnen Sie ein Event von der Seite Anmeldungen, um jede Anmeldung zu sehen. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (Besuchertyp jedes Teilnehmers), **Bezahlt / Gesamt** (mit Restbetragwarnung, wenn noch Geld schulden ist), **Status** und **Datum**, plus Chips für die Zählung pro Typ über der Tabelle.

- Klicken Sie auf das Detailsymbol einer Zeile, um das Dialogfeld **Anmeldungsdetails** zu öffnen – Mitglieder, Auswahlen, Bezahlt/Restbetrag und eine **Zahlungstabelle**, in der jede Belastung aufgelistet ist (Betrag, Methode, Datum).
- **CSV exportieren** lädt das vollständige Verzeichnis mit Spalten für Mitglieder, Besuchertypen, Auswahlen, Bezahlt/Gesamt/Restbetrag, Status und eine Spalte pro Anmeldungsfrage herunter.
- **Teilnehmer hinzufügen** ermöglicht es Ihnen, Offline-Anmeldungen immer noch manuell zu erfassen.

:::info
Rückerstattungen werden nicht in B1 verarbeitet. Wenn Sie eine stornierte, bezahlte Anmeldung erstatten müssen, geben Sie die Erstattung vom Dashboard Ihres Spendendanbieters aus (z. B. Stripe) aus.
:::

## Wie Zahlungen funktionieren

Zahlungen erfolgen über das gleiche Zahlungs-Gateway, das Ihre Kirche bereits für Spenden nutzt – Kartendaten gehen direkt an den Anbieter und berühren B1-Server nie. Preise werden immer vom Server aus Ihren konfigurierten Typen, Auswahlen und Rabattcodes berechnet, daher kann ein Anmeldender nicht mit dem Gesamtbetrag manipulieren. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen; Gäste geben eine Karte beim Checkout ein.

## Verwandte Artikel

- [Creating Calendars](creating-calendars#enabling-event-registration) – Aktivieren Sie die Anmeldung und die Grundeinstellungen
- [Online Giving Setup](../donations/online-giving-setup.md) – Konfigurieren Sie das Zahlungs-Gateway, das beim Checkout verwendet wird
- [Registering for Events](../../b1-church/events/registering) – Was Mitglieder sehen, wenn sie sich anmelden
- [My Registrations](../../b1-church/events/my-registrations) – Wie Mitglieder Restbeträge bezahlen und Anmeldungen bearbeiten
