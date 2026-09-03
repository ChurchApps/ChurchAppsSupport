---
title: "Bezahlte Anmeldungen"
---

# Bezahlte Anmeldungen

<div class="article-intro">

Die Ereignisregistrierung kann über eine einfache Kopfzahl hinausgehen. Sie können Teilnehmertypen mit Preisen definieren (wie Erwachsener und Kind), optionale Add-ons mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und Zahlungen bei der Registrierung über den bestehenden Spendenanbieter Ihrer Kirche erfassen. Wenn ein Ereignis voll wird, hält eine optionale Warteliste interessierte Mitglieder bereit und befördert sie automatisch, wenn sich Plätze öffnen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Aktivieren Sie zunächst die Registrierung für das Ereignis — siehe [Creating Calendars](creating-calendars#enabling-event-registration)
- Um Zahlungen zu erfassen, benötigt Ihre Kirche [Online Giving konfiguriert](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Ereignisse benötigen keine Spendeneinrichtung.

</div>

## Öffnen der Registrierungseinstellungen

1. Gehen Sie in B1 Admin zur Seite **Registrations** und öffnen Sie Ihr Ereignis (oder öffnen Sie das Ereignis aus seinem Kalender).
2. Die Karte **Registration Settings** zeigt die Grundlagen — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** und **Registration Questions**.
3. Unter den Grundlagen befinden sich drei Akkordeons: **Attendee Types**, **Selections** und **Discount Codes**.

## Teilnehmertypen

Mit Teilnehmertypen können Sie verschiedene Preise für verschiedene Arten von Teilnehmern berechnen — und jede separat begrenzen.

1. Erweitern Sie das Akkordeon **Attendee Types** und klicken Sie auf **Add Type**.
2. Geben Sie einen **Name** ein (z. B. „Adult", „Child", „Student").
3. Legen Sie einen **Price** fest. Verwenden Sie 0 für einen kostenlosen Typ.
4. Stellen Sie optional eine **Capacity** nur für diesen Typ ein (z. B. nur 20 Kinderplätze). Lassen Sie leer, um keine Pro-Typ-Grenze zu setzen.
5. Klicken Sie auf **Save**.

Während der Registrierung wählt jeder Teilnehmer einen Typ; ausverkaufte Typen werden als **Sold out** angezeigt und können nicht ausgewählt werden. Der Bericht zeigt den Typ jedes Teilnehmers und laufende Pro-Typ-Zählungen.

## Auswahlen

Selections sind optionale Preisgestaltungs-Add-ons — T-Shirts, Essenspläne, Aktivitätsupgrades.

1. Erweitern Sie das Akkordeon **Selections** und klicken Sie auf **Add Selection**.
2. Geben Sie einen **Name**, optionale **Description** und einen **Price** ein (0 wird als „Free" angezeigt).
3. Legen Sie optional eine **Capacity** fest (Gesamtzahl verfügbar über alle Registrierungen) und eine **Max Qty** (die meisten eine Registrierung kann bestellen).
4. Klicken Sie auf **Save**.

Registranten wählen Mengen während der Anmeldung, und die Summen werden gegen die Kapazität gezählt, so dass Sie niemals überverkaufen.

## Rabattcodes

1. Erweitern Sie das Akkordeon **Discount Codes** und klicken Sie auf **Add Discount Code**.
2. Geben Sie den **Code** ein, den Registranten eingeben.
3. Wählen Sie den **Type** — **Percent** oder **Amount** — und seinen **Value**.
4. Beschränken Sie den Code optional mit einem **Start Date** / **End Date**, einer **Min Members** (Mindestzahl der Teilnehmer bei der Registrierung) und **Max Uses**.
5. Klicken Sie auf **Save**.

Jeder Code zeigt einen **Uses**-Zähler, damit Sie sehen können, wie oft er eingelöst wurde. Registranten erhalten sofortiges Feedback, wenn sie einen Code anwenden — einschließlich klarer Meldungen, wenn ein Code abgelaufen ist, nicht gestartet hat oder mehr Teilnehmer benötigt.

## Warteliste

Aktivieren Sie **Enable Waitlist** in der Karte Registrierungseinstellungen. Wenn das Ereignis die Kapazität erreicht:

- Neue Registranten werden stattdessen ein Wartelisten-Spot angeboten, anstatt abgewiesen zu werden. Sie füllen die gleiche Anmeldung aus (Zahlung wird übersprungen, während sie auf der Warteliste stehen).
- Wenn sich jemand abmeldet, wird die älteste Wartelisten-Registrierung **automatisch befördert** und erhält eine E-Mail, dass sich ein Platz geöffnet hat. Wenn sie einen Restsaldo schulden, verlinkt die E-Mail sie zur Zahlung.
- Sie können jemanden jederzeit manuell mit der Aktion **Promote** auf einer Wartelisten-Zeile befördern — nützlich nach Erhöhung der Ereigniskapazität.

:::info
Beförderte Registrierungen bleiben *pending*, bis etwaige Salden bezahlt sind; Zahlen (oder nichts zu zahlen haben) bestätigt sie.
:::

## Das Registrierungs-Roster

Öffnen Sie ein Ereignis von der Registrierungsseite, um alle Registrierungen zu sehen. Die Tabelle zeigt **Name**, **Members**, **Type** (Teilnehmertyp jeder), **Paid / Total** (mit einer Saldowarnung, wenn noch Geld schuldig ist), **Status** und **Date**, plus Pro-Typ-Zählchips über der Tabelle.

- Klicken Sie auf das Detailsymbol einer Zeile, um das Dialog **Registration Details** zu öffnen — Mitglieder, Auswahlen, bezahlt/Saldo und eine **Payments**-Tabelle, die jeden Ladungsvorgang auflistet (Betrag, Methode, Datum).
- **Export CSV** lädt das vollständige Bericht mit Spalten für Mitglieder, Teilnehmertypen, Auswahlen, bezahlt/gesamt/Saldo, Status und eine Spalte pro Registrierungsfrage herunter.
- **Add Attendee** ermöglicht es Ihnen immer noch, Offline-Registrierungen manuell zu erfassen.

:::info
Rückerstattungen werden nicht in B1 bearbeitet. Wenn Sie eine abgesagte bezahlte Registrierung erstatten müssen, geben Sie die Rückerstattung über das Dashboard Ihres Spendenanbieters aus (z. B. Stripe).
:::

## Wie Zahlungen funktionieren

Zahlungen laufen über das gleiche Spendenarrangement Ihrer Kirche bereits für Spenden — Kartendaten gehen direkt an den Anbieter und werden B1s Server nicht berührt. Preise werden immer auf dem Server aus Ihren konfigurierten Typen, Auswahlen und Rabattcodes berechnet, so dass ein Registrant den Gesamt nicht manipulieren kann. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen; Gäste geben eine Karte beim Kassengang ein.

## Verwandte Artikel

- [Creating Calendars](creating-calendars#enabling-event-registration) — aktivieren Sie die Registrierung und die Grundeinstellungen
- [Online Giving Setup](../donations/online-giving-setup.md) — konfigurieren Sie das Spendenarrangement, das beim Kassengang verwendet wird
- [Registering for Events](../../b1-church/events/registering) — was Mitglieder sehen, wenn sie sich anmelden
- [My Registrations](../../b1-church/events/my-registrations) — wie Mitglieder Salden bezahlen und Registrierungen bearbeiten
