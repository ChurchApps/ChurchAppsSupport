---
title: "Check-in-Sicherheit"
---

# Check-in-Sicherheit

<div class="article-intro">

B1 enthält eine Reihe von Kindersicherheitskontrollen für Check-in: Raumkapazitätsgrenzen und Verhältnis von Freiwilligen zu Kindern, Alters- und Klassenleitlinie beim Kiosk, Check-in-Typen, die Mitglieder, Gäste und Freiwillige unterscheiden, und eine vertrauenswürdige Abholperson pro Haushalt, die beim Abholen überprüft wird. Diese Seite behandelt die Konfiguration jeder Sicherheitsfunktion in B1 Admin.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Check-in-Kiosks](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Servicezeiträumen verknüpft sind – die Sicherheitseinstellungen unten befinden sich in der Gruppe
- Page-a-parent und Notfall-Broadcast erfordern einen verbundenen Texting-Anbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Schließen eines Raums

Jeder Check-in-Raum (Gruppe) kann seine eigenen Grenzen durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Bleistiftsymbol**, um ihre Einstellungen zu bearbeiten, und suchen Sie den Abschnitt **Check-in-Kapazität**:

- **Kapazität** -- Die maximale Anzahl von Personen, die gleichzeitig in diesem Raum eingecheckt werden können. Wenn der Raum voll ist, wird das Check-in blockiert und der Kiosk benennt den vollen Raum.
- **Gast-Kapazität** -- Eine optionale separate Obergrenze, wie viele Gäste der Raum halten kann.
- **Für Check-in geschlossen** -- Auf **Ja** setzen, um alle Check-ins in diesem Raum sofort zu stoppen (z.B. wenn eine Klasse abgesagt ist oder ein Raum nicht verfügbar ist). Check-outs funktionieren weiterhin.

## Verhältnis von Freiwilligen

Der gleiche Abschnitt **Check-in-Kapazität** in der Gruppe enthält Personalregeln:

- **Kinder pro Freiwilligem** -- Die maximale Anzahl von Kindern, die ein eingecheckter Freiwilliger abdecken kann (z.B. 5 bedeutet einen Freiwilligen pro fünf Kindern).
- **Mindestanzahl der Freiwilligen** -- Die kleinste Anzahl von Freiwilligen, die eingecheckt werden müssen, bevor Kinder in den Raum eingecheckt werden können.

Freiwillige zählen zu diesen Regeln, wenn sie sich beim Kiosk mit dem Typ **Freiwilliger** einchecken (siehe [Check-in-Typen](#check-in-typen) unten).

### Warn vs. Block auswählen

Wie streng Verhältnisse durchgesetzt werden, ist eine kirchenweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die Kachel **Check-in**.
2. Stellen Sie **Durchsetzung des Freiwilligenverh ältnisses** ein:
   - **Warnen (mit Bestätigung erlauben)** -- Der Kiosk zeigt eine Warnung an, wenn ein Raum über dem Verhältnis oder unter seinen Mindestvereiwilligen liegt, und ein Mitarbeiter kann bestätigen, um trotzdem fortzufahren. Dies ist die Voreinstellung.
   - **Block (Check-in verhindern)** -- Check-in zum Raum wird verweigert, bis genug Freiwillige eingecheckt sind.

:::info
Kapazität und Für Check-in geschlossen sind immer harte Grenzen – die Warn-/Block-Wahl gilt nur für Freiwilligenverhältnisse.
:::

## Check-in-Typen

Jeder Check-in dokumentiert, ob die Person ein **Mitglied**, **Gast** oder **Freiwilliger** ist. Der Typ wird mit Chips auf dem Kiosk-Haushaltsbildschirm ausgewählt (Mitglied ist die Voreinstellung). Typen nutzen die Sicherheitsregeln – Freiwillige bieten Verhältnisabdeckung, und Gäste zählen gegen die Gast-Kapazität des Raums.

## Alters- und Klassenleitlinie für Räume

Sie können jedem Raum Alters- oder Klassengrenzen geben, damit der Kiosk Familien zu angemessenen Räumen führt:

- Verwenden Sie im Gruppeneinstellungen den Abschnitt **Alter & Klasse**, um das Mindest-/Höchstalter (Jahre und Monate) und/oder die Klasse für den Raum festzulegen.
- Am Kiosk werden Räume, für die sich ein Kind qualifiziert, hervorgehoben und Räume, für die es sich nicht qualifiziert, abgeblendet. Ein abgeblendeter Raum kann dennoch mit Bestätigung durch einen Mitarbeiter ausgewählt werden – die Leitlinie blockiert niemals hart.

Klassen rollen an Ihrem Kirchenfortsetzungsdatum **Klassenbeförderungsdatum**:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die Kachel Klassenbeförderung.
2. Stellen Sie den Monat und Tag ein, an dem Ihre Kirche Schüler befördert (z.B. 1. August). Altersangaben und Klassen am Kiosk werden zum letzten Klassenbeförderungsdatum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholpersonen

Jeder Haushalt kann eine Liste von Personen führen, die erlaubt sind – oder nicht erlaubt sind – seine Kinder abzuholen.

1. Öffnen Sie die Seite einer Person in **Personen** und suchen Sie die Karte **Abholen**.
2. Klicken Sie **Hinzufügen**. Suchen Sie nach einer vorhandenen Person, oder fügen Sie eine Person außerhalb des Systems hinzu, indem Sie ihren **Namen**, **Beziehung** und ein Foto eingeben.
3. Stellen Sie den **Status** ein:
   - **Vertrauenswürdig** -- Beim Check-out erscheint diese Person als anklickbare Abholkarte mit ihrem Foto, was verifiziertes Abholen schnell macht.
   - **Nicht autorisiert** -- Falls jemand Abholen unter diesem Namen versucht, blockiert der Kiosk den Check-out mit einer Warnung. Ein Mitarbeiter kann die Blockierung aufheben, und die Aufhebung wird im Anwesenheitsdatensatz vermerkt.

Klicken Sie auf den Statuschip einer Person auf der Karte, um zwischen Vertrauenswürdig und Nicht autorisiert umzuschalten.

:::tip
Fügen Sie Fotos zu vertrauenswürdigen Abholpersonen hinzu, wann immer möglich – der Check-out-Bildschirm zeigt das Foto an, damit Freiwillige die Person vor sich visuell überprüfen können.
:::

## Page-a-Parent und Notfall-Broadcast

Beide Funktionen senden Textnachrichten über den Texting-Anbieter Ihrer Kirche – es gibt keinen integrierten SMS-Dienst, daher muss zuerst einer der unterstützten Anbieter konfiguriert werden.

- **Parent anrufen** -- Von einer bemannten Kiosk-Check-out-Bildschirm können Mitarbeiter die Eltern oder Erziehungsberechtigten eines eingecheckten Kindes per SMS kontaktieren (z.B. "Bitte kommen Sie zur Kinderbetreuung").
- **Notfall-Broadcast** -- Vom Kiosk-Admin-Einstellungen können Mitarbeiter alle Erziehungsberechtigten von eingecheckten Haushalten für den ausgewählten Dienst gleichzeitig per SMS kontaktieren. Das Senden erfordert das Eingeben von **NOTFALL** zur Bestätigung.

Personen, die sich von SMS abgemeldet haben, oder die keine Mobilnummer in der Datei haben, werden automatisch übersprungen – der Kiosk meldet, wie viele Nachrichten gesendet wurden und wie viele übersprungen wurden.

Siehe die Kiosk-seitige Anleitung in [Check-Out & Kindersicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Check-in](check-in.md) — Kiosk-Setup und Hardware
- [Check-Out & Kindersicherheit](../../b1-checkin/check-in/checking-out) — der Kiosk-Check-Out, Abholverifikation und Paging-Flows
- [Gruppen erstellen](../groups/creating-groups.md) — wo Raumeinstellungen leben
- [Anwesenheits-Setup](setup.md) -- Dienste, Servicezeiträume und Raumzuweisungen
