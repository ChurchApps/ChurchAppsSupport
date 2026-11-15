---
title: "Kostenpflichtige Anmeldungen"
description: "Richten Sie in B1 Admin kostenpflichtige Veranstaltungsanmeldungen ein: Teilnehmerarten mit Preisen, Zusatzleistungen, Rabattcodes, Wartelisten und Zahlungseingang über Ihren Zahlungsanbieter."
---

# Kostenpflichtige Anmeldungen

<div class="article-intro">

Die Anmeldung zu Veranstaltungen kann über eine einfache Personenzahl hinausgehen. Sie können kostenpflichtige Teilnehmerarten festlegen (etwa Erwachsene und Kinder), optionale Zusatzleistungen mit eigenen Preisen und Mengen anbieten, Rabattcodes erstellen und die Zahlung bei der Anmeldung über den bestehenden Zahlungsanbieter Ihrer Kirche einziehen. Ist ein Ereignis ausgebucht, hält eine optionale Warteliste interessierte Mitglieder in der Reihenfolge und rückt sie automatisch nach, sobald Plätze frei werden.

</div>

## Schulungsvideo {#training-video}

<YouTube id="eGSZv24Dlzk" title="Veranstaltungsanmeldung und kostenpflichtige Ereignisse in B1" next="Eine Gemeindewebsite in B1 starten" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Aktivieren Sie zuerst die Anmeldung für das Ereignis – siehe [Kalender erstellen](./creating-calendars.md#enabling-event-registration)
- Um Zahlungen online einzuziehen, muss Ihre Kirche [Online-Spenden eingerichtet haben](../donations/online-giving-setup.md) (Stripe, PayPal oder Kingdom Funding). Kostenlose Ereignisse benötigen keine Spendeneinrichtung. Ohne Online-Spenden funktionieren kostenpflichtige Anmeldungen trotzdem, die Personen zahlen dann aber direkt an die Kirche – siehe [Kirchen ohne Online-Spenden](#churches-without-online-giving).

</div>

## Die Anmeldeeinstellungen öffnen {#opening-registration-settings}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Kalender > Anmeldungen** und klicken Sie auf Ihr Ereignis (oder klicken Sie im Kalender auf das Ereignis und wählen Sie **Anmeldungen verwalten**).
2. Klicken Sie auf **Einstellungen bearbeiten**. Die Karte **Anmeldeeinstellungen** zeigt die Grundlagen – **Anmeldung aktivieren**, **Kapazität**, **Warteliste aktivieren**, **Anmeldung öffnet/schließt**, **Schlagwörter** und **Anmeldefragen** – mit der Schaltfläche **Einstellungen speichern**.
3. Unterhalb der Grundlagen gibt es drei aufklappbare Abschnitte: **Teilnehmerarten**, **Auswahlmöglichkeiten** und **Rabattcodes**. Jeder hat eine eigene Schaltfläche **Speichern**, getrennt von **Einstellungen speichern**; B1 warnt Sie, wenn Sie die Seite mit ungespeicherten Änderungen darin verlassen wollen. Klicken Sie auf **Zurück zu den Anmeldungen**, um zur Teilnehmerliste zurückzukehren.

## Teilnehmerarten {#attendee-types}

Teilnehmerarten ermöglichen es, für unterschiedliche Teilnehmende unterschiedliche Preise zu verlangen – und jede Art einzeln zu begrenzen.

1. Klappen Sie den Abschnitt **Teilnehmerarten** auf und klicken Sie auf **Art hinzufügen**.
2. Geben Sie einen **Namen** ein (z. B. „Erwachsene“, „Kind“, „Schüler“).
3. Legen Sie einen **Preis** fest. Verwenden Sie 0 für eine kostenlose Art.
4. Legen Sie optional eine **Kapazität** nur für diese Art fest (z. B. nur 20 Plätze für Kinder). Leer lassen für keine Begrenzung pro Art.
5. Legen Sie optional unter **Sortierung** die Reihenfolge fest, in der die Arten aufgelistet werden.
6. Klicken Sie auf **Speichern**.

Um eine gespeicherte Art zu entfernen, klicken Sie auf ihr Löschsymbol und bestätigen Sie; sie wird sofort entfernt. Auswahlmöglichkeiten und Rabattcodes werden auf die gleiche Weise entfernt.

Bei der Anmeldung wählt jede teilnehmende Person eine Art aus; ausverkaufte Arten werden als **Ausverkauft** angezeigt und können nicht gewählt werden. Die Teilnehmerliste zeigt die Art jeder teilnehmenden Person und die laufenden Zähler pro Art.

## Auswahlmöglichkeiten {#selections}

Auswahlmöglichkeiten sind optionale, kostenpflichtige Zusatzleistungen – T-Shirts, Verpflegungspakete, Aufwertungen für Aktivitäten.

1. Klappen Sie den Abschnitt **Auswahlmöglichkeiten** auf und klicken Sie auf **Auswahl hinzufügen**.
2. Geben Sie einen **Namen**, optional eine **Beschreibung** und einen **Preis** ein (0 wird als „Kostenlos“ angezeigt).
3. Legen Sie optional eine **Kapazität** (Gesamtzahl verfügbar über alle Anmeldungen) und eine **Höchstmenge** (die meisten Stück, die eine Anmeldung bestellen kann) fest.
4. Klicken Sie auf **Speichern**.

Anmeldende wählen die Mengen bei der Anmeldung, und die Summen werden auf die Kapazität angerechnet, sodass Sie nie mehr verkaufen, als vorhanden ist.

## Rabattcodes {#discount-codes}

1. Klappen Sie den Abschnitt **Rabattcodes** auf und klicken Sie auf **Rabattcode hinzufügen**.
2. Geben Sie den **Code** ein, den Anmeldende eingeben werden.
3. Wählen Sie den **Typ** – **Prozent** oder **Betrag** – und dessen **Wert**.
4. Schränken Sie den Code optional ein mit einem **Startdatum** / **Enddatum**, einer **Mindestanzahl Mitglieder** (Mindestzahl der Teilnehmenden auf der Anmeldung) und **Maximale Verwendungen**.
5. Klicken Sie auf **Speichern**.

Jeder Code zeigt einen Zähler **Verwendungen**, damit Sie sehen, wie oft er eingelöst wurde. Anmeldende erhalten sofortige Rückmeldung, wenn sie einen Code anwenden – einschließlich klarer Hinweise, wenn ein Code abgelaufen ist, noch nicht gültig ist oder mehr Teilnehmende erfordert.

## Warteliste {#waitlist}

Aktivieren Sie **Warteliste aktivieren** in der Karte Anmeldeeinstellungen. Wenn das Ereignis die Kapazität erreicht:

- Neue Anmeldende erhalten einen Platz auf der Warteliste statt einer Absage. Sie schließen dieselbe Anmeldung ab (die Zahlung entfällt, solange sie auf der Warteliste stehen).
- Wenn jemand absagt, rückt die älteste Anmeldung auf der Warteliste **automatisch nach** und erhält eine E-Mail, dass ein Platz frei geworden ist. Wenn sie noch einen Betrag schuldet, verlinkt die E-Mail auf [Meine Anmeldungen](../../b1-church/events/my-registrations.md) auf der B1-Seite Ihrer Kirche, wo sie die Zahlung abschließen kann.
- Sie können jemanden jederzeit manuell nachrücken lassen, mit der Aktion **Nachrücken** in einer Zeile auf der Warteliste – nützlich, nachdem Sie die Kapazität des Ereignisses erhöht haben.

:::info
Nachgerückte Anmeldungen bleiben *ausstehend*, bis ein offener Betrag bezahlt ist; mit der Zahlung (oder wenn nichts zu zahlen ist) werden sie bestätigt.
:::

## Die Teilnehmerliste {#the-registration-roster}

Öffnen Sie ein Ereignis über die Seite Anmeldungen, um jede Anmeldung zu sehen. Der Kartentitel zeigt, wie viele Anmeldungen einen Platz gegen die Kapazität belegen (zum Beispiel *Anmeldungen (18 / 20)*). Nur ausstehende und bestätigte Anmeldungen zählen; sind Personen auf der Warteliste, ergänzt der Titel die Anzahl (zum Beispiel *· 3 auf der Warteliste*), und dieselbe Anzahl erscheint unter dem Auslastungsbalken. Die größere Zahl über dem Auslastungsbalken zählt **Personen** statt Anmeldungen – alle auf jeder ausstehenden oder bestätigten Anmeldung –, sodass eine Familie mit vier Personen als vier zählt. Die Kapazitätsgrenze selbst zählt weiterhin Anmeldungen. Die Tabelle zeigt **Name**, **Mitglieder**, **Art** (die Art jeder teilnehmenden Person), **Bezahlt / Gesamt** (mit einem Hinweis, wenn noch ein Betrag offen ist), **Status** und **Datum**, dazu oberhalb der Tabelle die Zähler pro Art.

- Klicken Sie in einer Zeile auf das Symbol für Details, um den Dialog **Anmeldedetails** zu öffnen – Mitglieder, Auswahlmöglichkeiten, Bezahlt/Offen und eine Tabelle **Zahlungen** mit jeder Belastung (Betrag, Zahlungsart, Datum).
- **CSV exportieren** lädt die vollständige Teilnehmerliste herunter, mit Spalten für Mitglieder, Teilnehmerarten, Auswahlmöglichkeiten, Bezahlt/Gesamt/Offen, Status und eine Spalte pro Anmeldefrage.
- **Teilnehmende hinzufügen** erfasst eine Anmeldung, die offline oder telefonisch erfolgt ist, für jede Person in Ihrer Kirche. Wählen Sie die Person und bei einem kostenpflichtigen Ereignis ihre Teilnehmerart. Ihr Konto wird nicht belastet: Eine kostenpflichtige Anmeldung wird als **ausstehend** mit dem vollen Betrag als offener Saldo gespeichert. Hat Ihre Kirche Online-Spenden, kann die Person den Betrag über [Meine Anmeldungen](../../b1-church/events/my-registrations.md) bezahlen; andernfalls ziehen Sie ihn persönlich ein. Zum Hinzufügen von Teilnehmenden benötigen Sie die Berechtigung Anmeldungen bearbeiten.

:::info
Rückerstattungen werden nicht in B1 abgewickelt. Wenn Sie eine stornierte kostenpflichtige Anmeldung erstatten müssen, veranlassen Sie die Rückerstattung im Dashboard Ihres Zahlungsanbieters (z. B. Stripe).
:::

## So funktioniert die Zahlung {#how-payment-works}

Zahlungen laufen über dasselbe Zahlungsgateway, das Ihre Kirche bereits für Spenden nutzt – Kartendaten gehen direkt an den Anbieter und berühren nie die Server von B1. Preise werden immer auf dem Server aus Ihren konfigurierten Arten, Auswahlmöglichkeiten und Rabattcodes berechnet, sodass Anmeldende die Summe nicht manipulieren können. Angemeldete Mitglieder können mit einer gespeicherten Karte bezahlen. Gäste geben beim Bezahlvorgang eine Karte ein und müssen vor der Zahlung das Kontrollkästchen **Ich bin kein Roboter** aktivieren.

### Kirchen ohne Online-Spenden {#churches-without-online-giving}

Hat Ihre Kirche keinen Zahlungsanbieter eingerichtet, können kostenpflichtige Ereignisse trotzdem Anmeldungen annehmen. Der Zahlungsschritt teilt Anmeldenden mit, dass die Online-Zahlung nicht verfügbar ist und sie direkt an die Kirche zahlen können; die Schaltfläche **Anmelden und später bezahlen** speichert die Anmeldung. Sie wird als **ausstehend** mit dem vollen Betrag als offenem Saldo gespeichert und erscheint in der Teilnehmerliste mit einem Hinweis auf den offenen Saldo. Ziehen Sie das Geld so ein, wie Ihre Kirche es üblicherweise tut.

:::info
B1 hat keine Möglichkeit, eine Offline-Zahlung als eingegangen zu markieren. Der offene Saldo bleibt in der Teilnehmerliste und auf der Karte [Meine Anmeldungen](../../b1-church/events/my-registrations.md) der anmeldenden Person auch nach dem Einziehen bestehen. Führen Sie daher selbst eine Aufstellung, wer bezahlt hat.
:::

## Verwandte Artikel {#related-articles}

- [Kalender erstellen](./creating-calendars.md#enabling-event-registration) — Anmeldung und Grundeinstellungen aktivieren
- [Einrichtung der Online-Spenden](../donations/online-giving-setup.md) — das beim Bezahlen verwendete Zahlungsgateway konfigurieren
- [Für Veranstaltungen anmelden](../../b1-church/events/registering.md) — was Mitglieder sehen, wenn sie sich anmelden
- [Meine Anmeldungen](../../b1-church/events/my-registrations.md) — wie Mitglieder Salden bezahlen und Anmeldungen bearbeiten
