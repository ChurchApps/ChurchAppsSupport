---
title: "Kostenpflichtige Anmeldungen"
---

# Kostenpflichtige Anmeldungen

<div class="article-intro">

Die Veranstaltungsanmeldung kann mehr sein als eine einfache Teilnehmerzählung. Sie können preisgestaltete Teilnehmertypen festlegen (etwa Erwachsener und Kind), optionale Zusatzoptionen mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und die Zahlung bei der Anmeldung über den bestehenden Spendenanbieter Ihrer Kirche abwickeln. Wenn eine Veranstaltung voll ist, hält eine optionale Warteliste interessierte Mitglieder auf dem Laufenden und rückt sie automatisch nach, sobald Plätze frei werden.

</div>

## Einführungsvideo

<YouTube id="eGSZv24Dlzk" title="Veranstaltungsanmeldung und kostenpflichtige Veranstaltungen in B1" next="Eine Kirchenwebsite in B1 starten" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zuerst die Anmeldung für die Veranstaltung -- siehe [Kalender erstellen](creating-calendars#enabling-event-registration)
- Um Zahlungen online entgegenzunehmen, muss Ihre Kirche [Online-Spenden eingerichtet haben](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Veranstaltungen benötigen keine Einrichtung für Spenden. Ohne Online-Spenden funktionieren kostenpflichtige Anmeldungen weiterhin, aber die Teilnehmenden bezahlen direkt an die Kirche -- siehe [Kirchen ohne Online-Spenden](#churches-without-online-giving).

</div>

## Die Anmeldeeinstellungen öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Kalender > Anmeldungen** und öffnen Sie Ihre Veranstaltung (oder öffnen Sie sie aus ihrem Kalender).
2. Die Karte **Anmeldeeinstellungen** zeigt die Grundlagen -- **Anmeldung aktivieren**, **Kapazität**, **Anmeldung öffnet/schließt**, **Tags** und **Anmeldefragen**.
3. Unterhalb der Grundlagen befinden sich drei Akkordeons: **Teilnehmertypen**, **Auswahlmöglichkeiten** und **Rabattcodes**.

## Teilnehmertypen

Mit Teilnehmertypen können Sie für unterschiedliche Arten von Teilnehmenden unterschiedliche Preise verlangen -- und jede Art separat begrenzen.

1. Klappen Sie das Akkordeon **Teilnehmertypen** auf und klicken Sie auf **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z. B. "Erwachsener", "Kind", "Schüler").
3. Legen Sie einen **Preis** fest. Verwenden Sie 0 für einen kostenlosen Typ.
4. Legen Sie optional eine **Kapazität** nur für diesen Typ fest (z. B. nur 20 Plätze für Kinder). Leer lassen für keine Begrenzung pro Typ.
5. Klicken Sie auf **Speichern**.

Bei der Anmeldung wählt jede teilnehmende Person einen Typ aus; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Die Teilnehmerliste zeigt den Typ jeder Person sowie die laufenden Zähler pro Typ.

## Auswahlmöglichkeiten

Auswahlmöglichkeiten sind optionale, kostenpflichtige Zusatzangebote -- T-Shirts, Verpflegungspakete, Aufwertungen für Aktivitäten.

1. Klappen Sie das Akkordeon **Auswahlmöglichkeiten** auf und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, optional eine **Beschreibung** und einen **Preis** ein (0 wird als "Kostenlos" angezeigt).
3. Legen Sie optional eine **Kapazität** (insgesamt verfügbar über alle Anmeldungen) und eine **Maximale Menge** (die höchste Anzahl, die eine Anmeldung bestellen kann) fest.
4. Klicken Sie auf **Speichern**.

Anmeldende wählen bei der Anmeldung die Mengen aus, und die Summen werden auf die Kapazität angerechnet, sodass Sie nie zu viel verkaufen.

## Rabattcodes

1. Klappen Sie das Akkordeon **Rabattcodes** auf und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Anmeldende eintippen werden.
3. Wählen Sie den **Typ** -- **Prozent** oder **Betrag** -- und den dazugehörigen **Wert**.
4. Beschränken Sie den Code optional mit einem **Startdatum** / **Enddatum**, einer **Mindestanzahl an Mitgliedern** (der Mindestzahl an Teilnehmenden in der Anmeldung) und einer **Maximalen Anzahl an Verwendungen**.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt einen Zähler **Verwendungen**, damit Sie sehen, wie oft er eingelöst wurde. Anmeldende erhalten sofort eine Rückmeldung, wenn sie einen Code anwenden -- einschließlich klarer Hinweise, wenn ein Code abgelaufen ist, noch nicht begonnen hat oder mehr Teilnehmende erfordert.

## Warteliste {#waitlist}

Aktivieren Sie **Warteliste aktivieren** in der Karte Anmeldeeinstellungen. Wenn die Veranstaltung die Kapazität erreicht:

- Neue Anmeldende erhalten einen Platz auf der Warteliste, statt abgewiesen zu werden. Sie schließen dieselbe Anmeldung ab (die Zahlung entfällt, solange sie auf der Warteliste stehen).
- Sobald jemand storniert, rückt die älteste Anmeldung auf der Warteliste **automatisch nach** und erhält eine E-Mail, dass ein Platz frei geworden ist. Wenn noch ein Betrag offen ist, verlinkt die E-Mail auf [Meine Anmeldungen](../../b1-church/events/my-registrations) auf der B1-Website Ihrer Kirche, wo die Zahlung abgeschlossen werden kann.
- Sie können jemanden jederzeit manuell mit der Aktion **Nachrücken** in einer Zeile der Warteliste nachrücken lassen -- etwa nach einer Erhöhung der Kapazität der Veranstaltung.

:::info
Nachgerückte Anmeldungen bleiben *ausstehend*, bis ein offener Betrag bezahlt ist; mit der Zahlung (oder wenn nichts zu bezahlen ist) werden sie bestätigt.
:::

## Die Teilnehmerliste {#the-registration-roster}

Öffnen Sie eine Veranstaltung über die Seite Anmeldungen, um alle Anmeldungen zu sehen. Der Kartentitel zeigt, wie viele Anmeldungen einen Platz im Verhältnis zur Kapazität belegen (zum Beispiel *Anmeldungen (18 / 20)*). Nur ausstehende und bestätigte Anmeldungen zählen; sind Personen auf der Warteliste, ergänzt der Titel die Anzahl (zum Beispiel *· 3 auf der Warteliste*), und dieselbe Anzahl erscheint unter der Kapazitätsleiste. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (der Teilnehmertyp jeder Person), **Bezahlt / Gesamt** (mit einem Warnhinweis, wenn noch Geld offen ist), **Status** und **Datum** sowie Zähler pro Typ oberhalb der Tabelle.

- Klicken Sie im Detailsymbol einer Zeile, um den Dialog **Anmeldungsdetails** zu öffnen -- Mitglieder, Auswahlmöglichkeiten, bezahlt/offen und eine Tabelle **Zahlungen** mit jeder Buchung (Betrag, Zahlungsart, Datum).
- **CSV exportieren** lädt die vollständige Teilnehmerliste mit Spalten für Mitglieder, Teilnehmertypen, Auswahlmöglichkeiten, bezahlt/gesamt/offen, Status und eine Spalte pro Anmeldefrage herunter.
- **Teilnehmer hinzufügen** erfasst eine Anmeldung, die offline oder telefonisch eingegangen ist, für jede Person Ihrer Kirche. Wählen Sie die Person aus und bei einer kostenpflichtigen Veranstaltung ihren Teilnehmertyp. Ihre Karte wird nicht belastet: Eine kostenpflichtige Anmeldung wird als **ausstehend** mit dem vollen Betrag als offenem Saldo gespeichert. Wenn Ihre Kirche Online-Spenden nutzt, kann die Person den Betrag über [Meine Anmeldungen](../../b1-church/events/my-registrations) bezahlen; andernfalls kassieren Sie ihn persönlich. Zum Hinzufügen von Teilnehmenden benötigen Sie die Berechtigung **Anmeldungen bearbeiten**.

:::info
Erstattungen werden nicht innerhalb von B1 abgewickelt. Wenn Sie eine stornierte kostenpflichtige Anmeldung erstatten müssen, veranlassen Sie die Erstattung im Dashboard Ihres Spendenanbieters (z. B. Stripe).
:::

## So funktioniert die Zahlung

Zahlungen laufen über dasselbe Spendenportal, das Ihre Kirche bereits für Spenden nutzt -- Kartendaten gehen direkt an den Anbieter und erreichen niemals die Server von B1. Preise werden immer auf dem Server aus Ihren konfigurierten Typen, Auswahlmöglichkeiten und Rabattcodes berechnet, sodass Anmeldende den Gesamtbetrag nicht manipulieren können. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen. Gäste geben ihre Karte beim Bezahlvorgang ein und müssen vor der Zahlung das Kästchen **Ich bin kein Roboter** anklicken.

### Kirchen ohne Online-Spenden {#churches-without-online-giving}

Wenn Ihre Kirche keinen Spendenanbieter eingerichtet hat, können kostenpflichtige Veranstaltungen trotzdem Anmeldungen annehmen. Der Zahlungsschritt teilt den Anmeldenden mit, dass Online-Zahlung nicht verfügbar ist und sie direkt an die Kirche zahlen können. Eine Schaltfläche **Anmelden und später bezahlen** speichert die Anmeldung. Sie wird als **ausstehend** mit dem vollen Betrag als offenem Saldo gespeichert und in der Teilnehmerliste mit einem Warnhinweis zum Saldo angezeigt. Ziehen Sie das Geld so ein, wie Ihre Kirche es üblicherweise tut.

:::info
B1 kann eine Offline-Zahlung nicht als eingegangen markieren. Der offene Saldo bleibt in der Teilnehmerliste und auf der Karte [Meine Anmeldungen](../../b1-church/events/my-registrations) der anmeldenden Person auch nach dem Einziehen bestehen. Führen Sie deshalb eigene Unterlagen darüber, wer bezahlt hat.
:::

## Verwandte Artikel

- [Kalender erstellen](creating-calendars#enabling-event-registration) -- Anmeldung aktivieren und die Grundeinstellungen
- [Einrichtung von Online-Spenden](../donations/online-giving-setup.md) -- das Zahlungsgateway für den Bezahlvorgang einrichten
- [Für Veranstaltungen anmelden](../../b1-church/events/registering) -- was Mitglieder bei der Anmeldung sehen
- [Meine Anmeldungen](../../b1-church/events/my-registrations) -- wie Mitglieder Salden bezahlen und Anmeldungen bearbeiten
