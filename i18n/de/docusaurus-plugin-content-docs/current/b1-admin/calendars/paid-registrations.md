---
title: "Kostenpflichtige Anmeldungen"
description: "Kostenpflichtige Veranstaltungsanmeldungen in B1 Admin einrichten: Teilnehmendentypen mit Preisen, Zusatzleistungen, Rabattcodes, Wartelisten und Zahlungen über Ihren Zahlungsanbieter."
---

# Kostenpflichtige Anmeldungen

<div class="article-intro">

Veranstaltungsanmeldungen können mehr sein als eine einfache Teilnehmerzählung. Sie können kostenpflichtige Teilnehmendentypen festlegen (etwa Erwachsene und Kinder), optionale Zusatzleistungen mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und die Zahlung bei der Anmeldung über den bestehenden Zahlungsanbieter Ihrer Gemeinde abwickeln. Wenn eine Veranstaltung ausgebucht ist, hält eine optionale Warteliste Interessierte auf dem Laufenden und rückt sie automatisch nach, sobald Plätze frei werden.

</div>

## Schulungsvideo

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zuerst die Anmeldung für die Veranstaltung. Siehe [Kalender erstellen](./creating-calendars.md#enabling-event-registration)
- Um Zahlungen online einzuziehen, muss Ihre Gemeinde [Online-Spenden eingerichtet](../donations/online-giving-setup.md) haben (Stripe, PayPal oder Kingdom Funding). Kostenlose Veranstaltungen benötigen keine Spendeneinrichtung. Ohne Online-Spenden funktionieren kostenpflichtige Anmeldungen trotzdem, die Menschen bezahlen jedoch direkt an die Gemeinde. Siehe [Gemeinden ohne Online-Spenden](#churches-without-online-giving).

</div>

## Die Anmeldeeinstellungen öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Kalender > Anmeldungen** und öffnen Sie Ihre Veranstaltung (oder öffnen Sie sie aus ihrem Kalender).
2. Die Karte **Anmeldeeinstellungen** zeigt die Grundlagen: **Anmeldung aktivieren**, **Kapazität**, **Anmeldung öffnet/schließt**, **Schlagwörter** und **Anmeldefragen**.
3. Unterhalb der Grundlagen finden Sie drei Akkordeons: **Teilnehmendentypen**, **Auswahlmöglichkeiten** und **Rabattcodes**.

## Teilnehmendentypen

Teilnehmendentypen ermöglichen es, für verschiedene Arten von Teilnehmenden unterschiedliche Preise zu verlangen und jede Art separat zu begrenzen.

1. Öffnen Sie das Akkordeon **Teilnehmendentypen** und klicken Sie auf **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z. B. „Erwachsene“, „Kind“, „Schüler“).
3. Legen Sie einen **Preis** fest. Verwenden Sie 0 für einen kostenlosen Typ.
4. Legen Sie optional eine **Kapazität** nur für diesen Typ fest (z. B. nur 20 Plätze für Kinder). Lassen Sie das Feld leer, wenn es für diesen Typ kein eigenes Limit gibt.
5. Klicken Sie auf **Speichern**.

Bei der Anmeldung wählt jede teilnehmende Person einen Typ aus. Ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Die Teilnehmerliste zeigt den Typ jeder Person und die laufenden Zahlen pro Typ.

## Auswahlmöglichkeiten

Auswahlmöglichkeiten sind optionale, kostenpflichtige Zusatzleistungen, etwa T-Shirts, Essenspakete oder Aufwertungen für Aktivitäten.

1. Öffnen Sie das Akkordeon **Auswahlmöglichkeiten** und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, optional eine **Beschreibung** und einen **Preis** ein (0 wird als „Kostenlos“ angezeigt).
3. Legen Sie optional eine **Kapazität** (insgesamt verfügbar über alle Anmeldungen) und eine **Max. Menge** (die höchste Anzahl, die eine einzelne Anmeldung bestellen kann) fest.
4. Klicken Sie auf **Speichern**.

Anmeldende wählen bei der Registrierung die Mengen aus. Die Summen werden auf die Kapazität angerechnet, sodass nie mehr verkauft wird, als verfügbar ist.

## Rabattcodes

1. Öffnen Sie das Akkordeon **Rabattcodes** und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Anmeldende eintippen sollen.
3. Wählen Sie den **Typ** -- **Prozent** oder **Betrag** -- und den **Wert**.
4. Begrenzen Sie den Code optional mit einem **Startdatum** / **Enddatum**, einer **Mindestanzahl Personen** (die minimale Zahl an Teilnehmenden in der Anmeldung) und **Maximale Verwendungen**.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt eine Anzahl **Verwendungen**, damit Sie sehen, wie oft er eingelöst wurde. Anmeldende erhalten sofort eine Rückmeldung, wenn sie einen Code anwenden. Dazu gehören klare Hinweise, wenn ein Code abgelaufen ist, noch nicht begonnen hat oder mehr Teilnehmende erfordert.

## Warteliste {#waitlist}

Aktivieren Sie in der Karte **Anmeldeeinstellungen** die Option **Warteliste aktivieren**. Wenn die Veranstaltung die Kapazität erreicht:

- Neue Anmeldende erhalten einen Platz auf der Warteliste, statt abgewiesen zu werden. Sie schließen dieselbe Anmeldung ab. Während sie auf der Warteliste stehen, entfällt die Zahlung.
- Sobald jemand storniert, wird die älteste Anmeldung auf der Warteliste **automatisch nachgerückt**. Die Person erhält eine E-Mail, dass ein Platz frei geworden ist. Wenn sie noch einen Betrag offen hat, enthält die E-Mail einen Link zu [Meine Anmeldungen](../../b1-church/events/my-registrations.md) auf der B1-Seite Ihrer Gemeinde, wo sie die Zahlung abschließen kann.
- Sie können jemanden jederzeit manuell nachrücken lassen, indem Sie in einer Zeile der Warteliste die Aktion **Nachrücken** verwenden. Das ist zum Beispiel hilfreich, nachdem Sie die Kapazität der Veranstaltung erhöht haben.

:::info
Nachgerückte Anmeldungen bleiben *ausstehend*, bis ein offener Betrag bezahlt ist. Mit der Zahlung (oder wenn nichts zu zahlen ist) werden sie bestätigt.
:::

## Die Teilnehmerliste {#the-registration-roster}

Öffnen Sie eine Veranstaltung über die Seite Anmeldungen, um alle Anmeldungen zu sehen. Der Kartentitel zeigt, wie viele Anmeldungen einen Platz im Verhältnis zur Kapazität belegen (zum Beispiel *Anmeldungen (18 / 20)*). Gezählt werden nur ausstehende und bestätigte Anmeldungen. Wenn Personen auf der Warteliste stehen, ergänzt der Titel die Anzahl (zum Beispiel *· 3 auf der Warteliste*), und dieselbe Anzahl erscheint unter der Kapazitätsleiste. Die größere Zahl über der Kapazitätsleiste zählt **Personen** statt Anmeldungen, also alle Personen in jeder ausstehenden oder bestätigten Anmeldung. Eine Familie mit vier Personen zählt daher als vier. Das Kapazitätslimit selbst zählt weiterhin Anmeldungen. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (den Typ jeder teilnehmenden Person), **Bezahlt / Gesamt** (mit einem Warnhinweis, wenn noch ein Betrag offen ist), **Status** und **Datum** sowie oberhalb der Tabelle Chips mit den Zahlen pro Typ.

- Klicken Sie in einer Zeile auf das Symbol für Details, um den Dialog **Anmeldedetails** zu öffnen. Dort sehen Sie Mitglieder, Auswahlmöglichkeiten, bezahlt/offen und eine Tabelle **Zahlungen** mit jeder Buchung (Betrag, Zahlungsart, Datum).
- **CSV exportieren** lädt die vollständige Teilnehmerliste mit Spalten für Mitglieder, Teilnehmendentypen, Auswahlmöglichkeiten, bezahlt/gesamt/offen, Status und eine Spalte für jede Anmeldefrage herunter.
- **Teilnehmende hinzufügen** erfasst eine Anmeldung, die offline oder telefonisch erfolgt ist, für jede Person Ihrer Gemeinde. Wählen Sie die Person aus und bei einer kostenpflichtigen Veranstaltung auch den Teilnehmendentyp. Ihre Karte wird nicht belastet: Eine kostenpflichtige Anmeldung wird als **ausstehend** mit dem vollen Betrag als offener Posten gespeichert. Wenn Ihre Gemeinde Online-Spenden nutzt, kann die Person den Betrag über [Meine Anmeldungen](../../b1-church/events/my-registrations.md) bezahlen. Andernfalls ziehen Sie ihn persönlich ein. Zum Hinzufügen von Teilnehmenden benötigen Sie die Berechtigung **Anmeldungen bearbeiten**.

:::info
Rückerstattungen werden in B1 nicht abgewickelt. Wenn Sie eine stornierte kostenpflichtige Anmeldung erstatten müssen, veranlassen Sie die Rückerstattung im Dashboard Ihres Zahlungsanbieters (z. B. Stripe).
:::

## So funktioniert die Zahlung

Zahlungen laufen über dasselbe Zahlungssystem, das Ihre Gemeinde bereits für Spenden nutzt. Kartendaten gehen direkt an den Anbieter und erreichen niemals die Server von B1. Preise werden auf dem Server anhand Ihrer festgelegten Typen, Auswahlmöglichkeiten und Rabattcodes berechnet. Dadurch kann eine anmeldende Person den Gesamtbetrag nicht manipulieren. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen. Gäste geben ihre Karte an der Kasse ein und müssen vor der Zahlung das Kästchen **Ich bin kein Roboter** anklicken.

### Gemeinden ohne Online-Spenden {#churches-without-online-giving}

Wenn Ihre Gemeinde keinen Zahlungsanbieter für Spenden eingerichtet hat, können kostenpflichtige Veranstaltungen trotzdem Anmeldungen annehmen. Der Zahlungsschritt teilt den Anmeldenden mit, dass Online-Zahlung nicht verfügbar ist und sie direkt an die Gemeinde zahlen können. Eine Schaltfläche **Anmelden und später bezahlen** speichert die Anmeldung. Sie wird als **ausstehend** mit dem vollen Betrag als offenem Posten gespeichert und in der Teilnehmerliste mit einem Warnhinweis zum offenen Betrag angezeigt. Den Betrag ziehen Sie auf dem Weg ein, den Ihre Gemeinde üblicherweise nutzt.

:::info
B1 kann eine Offline-Zahlung nicht als eingegangen markieren. Der offene Betrag bleibt in der Teilnehmerliste und auf der Karte [Meine Anmeldungen](../../b1-church/events/my-registrations.md) der anmeldenden Person auch dann stehen, wenn Sie ihn eingezogen haben. Führen Sie deshalb eine eigene Übersicht darüber, wer bezahlt hat.
:::

## Verwandte Artikel

- [Kalender erstellen](./creating-calendars.md#enabling-event-registration) — Anmeldung aktivieren und die Grundeinstellungen
- [Online-Spenden einrichten](../donations/online-giving-setup.md) — den Zahlungsdienst einrichten, der an der Kasse genutzt wird
- [Für Veranstaltungen anmelden](../../b1-church/events/registering.md) — was Mitglieder bei der Anmeldung sehen
- [Meine Anmeldungen](../../b1-church/events/my-registrations.md) — wie Mitglieder Beträge bezahlen und Anmeldungen bearbeiten
