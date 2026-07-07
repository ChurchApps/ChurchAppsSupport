---
title: "Bezahlte Registrierungen"
---

# Bezahlte Registrierungen

<div class="article-intro">

Die Ereignisregistrierung kann über eine einfache Kopfzahl hinausgehen. Sie können Preise für verschiedene Teilnehmertypen (wie Erwachsene und Kinder) definieren, optionale Zusätze mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und die Zahlung bei der Registrierung über Ihren vorhandenen Spendenprovider Ihrer Gemeinde einziehen. Wenn ein Ereignis voll ist, hält eine optionale Warteliste interessierte Mitglieder in der Schlange und befördert sie automatisch, wenn Plätze verfügbar werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zunächst die Registrierung des Ereignisses — siehe [Kalender erstellen](creating-calendars#enabling-event-registration)
- Um Zahlungen zu sammeln, benötigt Ihre Gemeinde [Online-Spenden konfiguriert](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Ereignisse benötigen keine Spenden-Einrichtung.

</div>

## Öffnen der Registrierungseinstellungen

1. Gehen Sie in B1 Admin zur Seite **Registrierungen** und öffnen Sie Ihr Ereignis (oder öffnen Sie das Ereignis aus seinem Kalender).
2. Die **Registrierungseinstellungen**-Karte zeigt die Grundlagen — **Registrierung aktivieren**, **Kapazität**, **Registrierung öffnet/schließt**, **Tags** und **Registrierungsfragen**.
3. Unter den Grundlagen befinden sich drei Akkordeons: **Teilnehmertypen**, **Auswahl** und **Rabattcodes**.

## Teilnehmertypen

Teilnehmertypen ermöglichen es Ihnen, verschiedene Preise für verschiedene Arten von Teilnehmern zu berechnen — und jeden separaten Deckel zu setzen.

1. Erweitern Sie das Akkordeon **Teilnehmertypen** und klicken Sie auf **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z. B. „Erwachsener", „Kind", „Student").
3. Legen Sie einen **Preis** fest. Verwenden Sie 0 für einen kostenlosen Typ.
4. Legen Sie optional eine **Kapazität** nur für diesen Typ fest (z. B. nur 20 Kind-Plätze). Lassen Sie es leer für kein Limit pro Typ.
5. Klicken Sie auf **Speichern**.

Während der Registrierung wählt jeder Teilnehmer einen Typ; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Das Verzeichnis zeigt den Typ jedes Teilnehmers und laufende Pro-Typ-Zähler an.

## Auswahl

Auswahl sind optionale Zuschläge mit Preis — T-Shirts, Mahlzeitenpläne, Aktivitäts-Upgrades.

1. Erweitern Sie das Akkordeon **Auswahl** und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, optionale **Beschreibung** und einen **Preis** ein (0 zeigt sich als „Frei").
3. Legen Sie optional eine **Kapazität** fest (insgesamt verfügbar in allen Registrierungen) und eine **Max. Menge** (das meiste, das eine Registrierung bestellen kann).
4. Klicken Sie auf **Speichern**.

Teilnehmende wählen während der Anmeldung Mengen, und die Gesamtmenge zählt gegen die Kapazität, damit Sie niemals überverkaufen.

## Rabattcodes

1. Erweitern Sie das Akkordeon **Rabattcodes** und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Teilnehmende eingeben.
3. Wählen Sie den **Typ** — **Prozent** oder **Betrag** — und seinen **Wert**.
4. Begrenzen Sie den Code optional mit einem **Startdatum** / **Enddatum**, einem **Min. Mitglieder** (Mindestanzahl der Teilnehmenden in der Registrierung) und **Max. Verwendet**.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt einen **Verwendet**-Zähler an, damit Sie sehen können, wie oft er eingelöst wurde. Teilnehmende erhalten sofortiges Feedback, wenn sie einen Code anwenden — einschließlich klarer Nachrichten, wenn ein Code abgelaufen ist, nicht gestartet ist oder mehr Teilnehmende benötigt.

## Warteliste

Aktivieren Sie **Warteliste aktivieren** in der Registrierungseinstellungs-Karte. Wenn das Ereignis die Kapazität erreicht:

- Neue Teilnehmende wird ein Wartelisten-Platz angeboten, anstatt sie wegzuweisen. Sie füllen dieselbe Anmeldung aus (die Zahlung wird übersprungen, während sie auf der Warteliste stehen).
- Wenn sich jemand abmeldet, wird die älteste Wartelisten-Registrierung **automatisch befördert** und erhält eine E-Mail, dass ein Platz frei wurde. Wenn sie einen Restbetrag schuldig sind, verlinkt die E-Mail sie zum Abschluss der Zahlung.
- Sie können jemanden jederzeit manuell mit der Aktion **Befördern** auf einer Wartelisten-Zeile befördern — nützlich nach Erhöhung der Ereigniskapazität.

:::info
Beförderte Registrierungen bleiben *ausstehend*, bis etwaige Restbeträge bezahlt werden; zahlen (oder haben nichts zu zahlen) bestätigt sie.
:::

## Das Registrierungsverzeichnis

Öffnen Sie ein Ereignis von der Registrierungsseite, um jede Registrierung zu sehen. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (Typ jedes Teilnehmers), **Zahlung / Gesamt** (mit einer Restbetragswarnung, wenn noch Geld geschuldet wird), **Status** und **Datum**, plus Pro-Typ-Zähler-Chips über der Tabelle.

- Klicken Sie auf das Details-Symbol einer Zeile, um das Dialogfeld **Registrierungsdetails** zu öffnen — Mitglieder, Auswahl, Zahlung/Restbetrag und eine **Zahlungen**-Tabelle mit jeder Ladung (Betrag, Methode, Datum).
- **In CSV exportieren** lädt das vollständige Verzeichnis mit Spalten für Mitglieder, Teilnehmertypen, Auswahl, Zahlung/Gesamt/Restbetrag, Status und eine Spalte pro Registrierungsfrage herunter.
- **Teilnehmer hinzufügen** ermöglicht es Ihnen immer noch, Offline-Anmeldungen manuell zu erfassen.

:::info
Rückerstattungen werden nicht in B1 verarbeitet. Wenn Sie eine stornierte bezahlte Registrierung rückerstatte müssen, geben Sie die Rückerstattung aus dem Dashboard Ihres Spendenproviders aus (z. B. Stripe).
:::

## Wie Zahlung funktioniert

Zahlungen laufen über dasselbe Spenden-Gateway, das Ihre Gemeinde bereits für Spenden verwendet — Kartendaten gehen direkt zum Anbieter und erreichen nie B1-Server. Preise werden immer auf dem Server aus Ihren konfigurierten Typen, Auswahl und Rabattcodes berechnet, daher kann ein Teilnehmender den Gesamtbetrag nicht manipulieren. Eingeloggte Mitglieder können mit einer gespeicherten Karte zahlen; Gäste geben eine Karte beim Auschecken ein.

## Verwandte Artikel

- [Kalender erstellen](creating-calendars#enabling-event-registration) — Registrierung aktivieren und Grundeinstellungen
- [Online-Spenden-Einrichtung](../donations/online-giving-setup.md) — Konfigurieren Sie das Spenden-Gateway, das beim Auschecken verwendet wird
- [Registrierung für Ereignisse](../../b1-church/events/registering) — was Mitglieder sehen, wenn sie sich anmelden
- [Meine Registrierungen](../../b1-church/events/my-registrations) — wie Mitglieder Restbeträge zahlen und Registrierungen bearbeiten
