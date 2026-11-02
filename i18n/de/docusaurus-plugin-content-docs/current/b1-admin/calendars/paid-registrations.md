---
title: "Kostenpflichtige Anmeldungen"
---

# Kostenpflichtige Anmeldungen

<div class="article-intro">

Veranstaltungsanmeldungen können mehr sein als eine einfache Teilnehmerzählung. Sie können preisierte Teilnehmertypen definieren (etwa Erwachsener und Kind), optionale Zusatzoptionen mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und bei der Anmeldung über den bestehenden Spendenanbieter Ihrer Kirche Zahlungen einziehen. Wenn eine Veranstaltung voll ist, hält eine optionale Warteliste interessierte Mitglieder auf dem Laufenden und rückt sie automatisch nach, sobald Plätze frei werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zuerst die Anmeldung für die Veranstaltung – siehe [Kalender erstellen](creating-calendars#enabling-event-registration)
- Um Zahlungen online einzuziehen, muss Ihre Kirche [Online-Spenden eingerichtet haben](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Veranstaltungen benötigen keine Spendeneinrichtung. Ohne Online-Spenden funktionieren kostenpflichtige Anmeldungen trotzdem, die Menschen bezahlen die Kirche jedoch direkt – siehe [Kirchen ohne Online-Spenden](#churches-without-online-giving).

</div>

## Die Anmeldeeinstellungen öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), wählen Sie **Kalender > Anmeldungen** und öffnen Sie Ihre Veranstaltung (oder öffnen Sie sie aus dem zugehörigen Kalender).
2. Die Karte **Anmeldeeinstellungen** zeigt die Grundlagen – **Anmeldung aktivieren**, **Kapazität**, **Anmeldung öffnet/schließt**, **Schlagwörter** und **Fragen zur Anmeldung**.
3. Unter den Grundlagen finden Sie drei Akkordeons: **Teilnehmertypen**, **Auswahlmöglichkeiten** und **Rabattcodes**.

## Teilnehmertypen

Teilnehmertypen erlauben es, für verschiedene Arten von Teilnehmenden unterschiedliche Preise zu verlangen – und jede Art einzeln zu begrenzen.

1. Öffnen Sie das Akkordeon **Teilnehmertypen** und klicken Sie auf **Typ hinzufügen**.
2. Geben Sie einen **Namen** ein (z. B. „Erwachsener“, „Kind“, „Schüler“).
3. Legen Sie einen **Preis** fest. Verwenden Sie 0 für einen kostenlosen Typ.
4. Legen Sie optional eine **Kapazität** nur für diesen Typ fest (z. B. nur 20 Plätze für Kinder). Leer lassen für keine Begrenzung pro Typ.
5. Klicken Sie auf **Speichern**.

Bei der Anmeldung wählt jede teilnehmende Person einen Typ; ausverkaufte Typen werden als **Ausverkauft** angezeigt und können nicht ausgewählt werden. Die Teilnehmerliste zeigt den Typ jeder Person und die laufenden Zählungen pro Typ.

## Auswahlmöglichkeiten

Auswahlmöglichkeiten sind optionale, kostenpflichtige Zusatzoptionen – T-Shirts, Verpflegungspakete, Aufwertungen von Aktivitäten.

1. Öffnen Sie das Akkordeon **Auswahlmöglichkeiten** und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, optional eine **Beschreibung** und einen **Preis** ein (0 wird als „Kostenlos“ angezeigt).
3. Legen Sie optional eine **Kapazität** (Gesamtzahl verfügbarer Stück über alle Anmeldungen) und eine **Max. Menge** (die höchste Anzahl, die eine Anmeldung bestellen kann) fest.
4. Klicken Sie auf **Speichern**.

Anmeldende wählen bei der Anmeldung die Mengen, und die Summen werden auf die Kapazität angerechnet, sodass Sie nie überbuchen.

## Rabattcodes

1. Öffnen Sie das Akkordeon **Rabattcodes** und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Anmeldende eintippen werden.
3. Wählen Sie den **Typ** – **Prozent** oder **Betrag** – und dessen **Wert**.
4. Begrenzen Sie den Code optional mit einem **Startdatum** / **Enddatum**, einer **Mindestanzahl Mitglieder** (die minimale Anzahl Teilnehmender in der Anmeldung) und **Max. Einlösungen**.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt eine Zählung **Einlösungen**, damit Sie sehen, wie oft er verwendet wurde. Anmeldende erhalten sofort eine Rückmeldung, wenn sie einen Code anwenden – einschließlich klarer Hinweise, wenn ein Code abgelaufen ist, noch nicht gültig ist oder mehr Teilnehmende erfordert.

## Warteliste {#waitlist}

Aktivieren Sie **Warteliste aktivieren** in der Karte Anmeldeeinstellungen. Erreicht die Veranstaltung die Kapazität:

- Neue Anmeldende erhalten einen Platz auf der Warteliste statt einer Absage. Sie schließen dieselbe Anmeldung ab (die Zahlung wird auf der Warteliste übersprungen).
- Wenn jemand storniert, rückt die älteste Anmeldung auf der Warteliste **automatisch nach** und erhält eine E-Mail, dass ein Platz frei geworden ist. Schuldet die Person einen Betrag, verlinkt die E-Mail auf [Meine Anmeldungen](../../b1-church/events/my-registrations) auf der B1-Seite Ihrer Kirche, wo die Zahlung abgeschlossen werden kann.
- Sie können jemanden jederzeit manuell über die Aktion **Nachrücken** in einer Zeile der Warteliste nachrücken lassen – nützlich, nachdem Sie die Kapazität der Veranstaltung erhöht haben.

:::info
Nachgerückte Anmeldungen bleiben *ausstehend*, bis ein offener Betrag bezahlt ist; mit der Zahlung (oder wenn nichts zu zahlen ist) werden sie bestätigt.
:::

## Die Teilnehmerliste {#the-registration-roster}

Öffnen Sie eine Veranstaltung auf der Seite Anmeldungen, um jede Anmeldung zu sehen. Der Kartentitel zeigt, wie viele Anmeldungen gegen die Kapazität einen Platz belegen (zum Beispiel *Anmeldungen (18 / 20)*). Nur ausstehende und bestätigte Anmeldungen zählen; sind Personen auf der Warteliste, ergänzt der Titel die Anzahl (zum Beispiel *· 3 auf der Warteliste*), und dieselbe Anzahl erscheint unter dem Kapazitätsbalken. Die Tabelle zeigt **Name**, **Mitglieder**, **Typ** (den Typ jeder teilnehmenden Person), **Bezahlt / Gesamt** (mit einem Hinweis, wenn noch Geld offen ist), **Status** und **Datum**, zusätzlich Zählungen pro Typ als Chips über der Tabelle.

- Klicken Sie auf das Symbol für Details einer Zeile, um den Dialog **Anmeldedetails** zu öffnen – mit Mitgliedern, Auswahlmöglichkeiten, Bezahlt/Offen und einer Tabelle **Zahlungen**, die jede Buchung auflistet (Betrag, Zahlungsart, Datum).
- **CSV exportieren** lädt die vollständige Teilnehmerliste mit Spalten für Mitglieder, Teilnehmertypen, Auswahlmöglichkeiten, Bezahlt/Gesamt/Offen, Status und eine Spalte pro Anmeldefrage herunter.
- **Teilnehmer hinzufügen** erfasst eine Anmeldung offline oder telefonisch für jede Person in Ihrer Kirche. Wählen Sie die Person und bei einer kostenpflichtigen Veranstaltung ihren Teilnehmertyp. Ihre Karte wird nicht belastet: Eine kostenpflichtige Anmeldung wird als **ausstehend** mit dem vollen Betrag als offenem Saldo gespeichert. Hat Ihre Kirche Online-Spenden, kann die Person den Betrag über [Meine Anmeldungen](../../b1-church/events/my-registrations) bezahlen; andernfalls kassieren Sie persönlich. Zum Hinzufügen von Teilnehmenden benötigen Sie die Berechtigung **Anmeldungen bearbeiten**.

:::info
Rückerstattungen werden in B1 nicht abgewickelt. Müssen Sie eine stornierte kostenpflichtige Anmeldung erstatten, veranlassen Sie die Rückerstattung im Dashboard Ihres Zahlungsanbieters (z. B. Stripe).
:::

## So funktioniert die Zahlung

Zahlungen laufen über denselben Spendenzahlungsdienst, den Ihre Kirche bereits für Spenden nutzt – Kartendaten gehen direkt an den Anbieter und erreichen nie die Server von B1. Preise werden immer auf dem Server aus Ihren konfigurierten Typen, Auswahlmöglichkeiten und Rabattcodes berechnet, sodass Anmeldende den Gesamtbetrag nicht manipulieren können. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen. Gäste geben ihre Karte an der Kasse ein und müssen vor der Zahlung das Kästchen **Ich bin kein Roboter** aktivieren.

### Kirchen ohne Online-Spenden {#churches-without-online-giving}

Hat Ihre Kirche keinen Zahlungsanbieter für Spenden eingerichtet, können kostenpflichtige Veranstaltungen trotzdem Anmeldungen annehmen. Der Zahlungsschritt teilt Anmeldenden mit, dass Online-Zahlung nicht verfügbar ist und sie direkt an die Kirche zahlen können. Eine Schaltfläche **Anmelden und später bezahlen** speichert die Anmeldung. Sie wird als **ausstehend** mit dem vollen Betrag als offenem Saldo gespeichert und erscheint in der Teilnehmerliste mit einem Hinweis auf den offenen Betrag. Ziehen Sie das Geld so ein, wie Ihre Kirche es üblicherweise tut.

:::info
B1 kann eine Offline-Zahlung nicht als eingegangen markieren. Der offene Betrag bleibt in der Teilnehmerliste und auf der Karte der anmeldenden Person unter [Meine Anmeldungen](../../b1-church/events/my-registrations), auch nachdem Sie ihn eingezogen haben. Führen Sie deshalb eine eigene Aufstellung darüber, wer bezahlt hat.
:::

## Verwandte Artikel

- [Kalender erstellen](creating-calendars#enabling-event-registration) – Anmeldung aktivieren und die grundlegenden Einstellungen
- [Online-Spenden einrichten](../donations/online-giving-setup.md) – den Zahlungsdienst konfigurieren, der beim Bezahlen genutzt wird
- [Für Veranstaltungen anmelden](../../b1-church/events/registering) – was Mitglieder bei der Anmeldung sehen
- [Meine Anmeldungen](../../b1-church/events/my-registrations) – wie Mitglieder Salden bezahlen und Anmeldungen bearbeiten
