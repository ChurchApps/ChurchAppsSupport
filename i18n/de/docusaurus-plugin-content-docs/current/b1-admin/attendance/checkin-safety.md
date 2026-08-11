---
title: "Check-In-Sicherheit"
---

# Check-In-Sicherheit

<div class="article-intro">

B1 umfasst eine Reihe von Kindsicherheitskontrollen für Check-ins: Raumkapazitätsgrenzen und Freiwilligenquoten, Alters- und Klassenstufen-Leitfaden am Kiosk, Check-in-Typen, die Mitglieder, Gäste und Freiwillige unterscheiden, und eine vertrauenswürdige Abholungsliste pro Haushalt, die beim Auschecken überprüft wird. Diese Seite behandelt die Konfiguration jeder Sicherheitsfunktion in B1 Admin.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Check-in-Kioske](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Gottesdienstzeiten verknüpft sind -- die Sicherheitseinstellungen unten befinden sich auf der Gruppe
- Page-a-parent und Notfall-Rundfunk erfordern einen verbundenen SMS-Anbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Schließen eines Raums

Jeder Check-in-Raum (Gruppe) kann seine eigenen Grenzen durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Stift-Symbol**, um ihre Einstellungen zu bearbeiten, und finden Sie den Bereich **Check-In-Kapazität**:

- **Kapazität** -- Die maximale Anzahl von Personen, die gleichzeitig in diesem Raum einchecken können. Wenn der Raum voll ist, wird das Check-in darin blockiert und der Kiosk benennt den vollen Raum.
- **Gast-Kapazität** -- Eine optionale separate Obergrenze für Gäste, die der Raum halten kann.
- **Geschlossen für Check-In** -- Auf **Ja** setzen, um alle Check-ins in diesem Raum sofort zu stoppen (z.B. wenn eine Klasse abgesagt ist oder ein Raum nicht verfügbar ist). Auschecken funktioniert noch.

## Freiwilligenquoten

Der gleiche **Check-In-Kapazität**-Bereich auf der Gruppe beinhaltet Personalregeln:

- **Kinder pro Freiwilliger** -- Die maximale Anzahl von Kindern, die jeder eingecheckter Freiwilliger abdecken kann (z.B. 5 bedeutet ein Freiwilliger pro fünf Kinder).
- **Mindestanzahl Freiwillige** -- Die kleinste Anzahl von Freiwilligen, die einchecken müssen, bevor Kinder in den Raum einchecken können.

Freiwillige zählen zu diesen Regeln, wenn sie mit dem Typ **Freiwilliger** am Kiosk einchecken (siehe [Check-in-Typen](#check-in-types) unten).

### Wählen zwischen Warnung und Blockierung

Wie streng Quoten durchgesetzt werden, ist eine kirchenweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die **Check-In**-Kachel.
2. Stellen Sie **Freiwilligenquoten-Durchsetzung** ein:
   - **Warnung (mit Bestätigung zulassen)** -- Der Kiosk zeigt eine Warnung an, wenn ein Raum über Quote oder unter seinen Mindestfreiwilligen ist, und ein Mitarbeiter kann bestätigen, um trotzdem fortzufahren. Dies ist die Standardeinstellung.
   - **Blockieren (Check-in verhindern)** -- Check-in zum Raum wird verweigert, bis genug Freiwillige einchecken.

:::info
Kapazität und Geschlossen für Check-In sind immer harte Grenzen -- die Wahl zwischen Warnung und Blockierung gilt nur für Freiwilligenquoten.
:::

## Check-in-Typen

Jedes Check-in zeichnet auf, ob die Person ein **Mitglied**, **Gast** oder **Freiwilliger** ist. Der Typ wird mit Chips auf dem Kiosk-Haushalt-Bildschirm gewählt (Mitglied ist die Standardeinstellung). Typen speisen die Sicherheitsregeln -- Freiwillige bieten Quotenabdeckung, und Gäste zählen gegen die Gast-Kapazität des Raums.

## Alters- und Klassenstufen-Raumleitfaden

Sie können jeder Raum Alters- oder Klassenstufengrenzen geben, damit der Kiosk Familien zu angemessenen Räumen leitet:

- Verwenden Sie auf den Einstellungen der Gruppe den Abschnitt **Alter & Klassenstufe**, um das Mindestalter/Maximalalter (Jahre und Monate) und/oder die Klassenstufe für den Raum festzulegen.
- Am Kiosk sind Räume, für die ein Kind qualifiziert ist, hervorgehoben, und Räume, für die nicht qualifiziert, sind abgeblendet. Ein abgeblendeter Raum kann mit einer Mitarbeiternbestätigung immer noch gewählt werden -- der Leitfaden blockiert niemals hart.

Klassenstufen rollen über Ihrer Kirche am **Datum der Klassenstufen-Beförderung**:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die Kachel zur Klassenstufen-Beförderung.
2. Stellen Sie den Monat und Tag ein, an dem Ihre Kirche Schüler befördert (z.B. 1. August). Alter und Klassenstufen am Kiosk werden ab dem letzten Beförderungsdatum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholpersonen

Jeder Haushalt kann eine Liste von Personen führen, die -- oder nicht -- berechtigt sind, seine Kinder abzuholen.

1. Öffnen Sie eine Personenseite unter **Personen** und suchen Sie die **Abhol**-Karte.
2. Klicken Sie auf **Hinzufügen**. Suchen Sie eine bereits existierende Person, oder fügen Sie jemanden hinzu, der nicht im System ist, indem Sie seinen **Namen**, **Beziehung** und ein Foto eingeben.
3. Stellen Sie den **Status** ein:
   - **Vertrauenswürdig** -- Diese Person erscheint am Auschecken als tappbare Abholkarte mit Foto, was schnelles verifizielles Abholen ermöglicht.
   - **Nicht autorisiert** -- Wenn jemand versucht, unter diesem Namen abzuholen, blockiert der Kiosk das Auschecken mit einer Warnung. Ein Mitarbeiter kann überschreiben, und die Überschreibung wird im Anwesenheitsdatensatz aufgezeichnet.

Klicken Sie auf den Status-Chip der Person auf der Karte, um zwischen Vertrauenswürdig und Nicht autorisiert zu wechseln.

:::tip
Fügen Sie Fotos zu vertrauenswürdigen Abholpersonen hinzu, wenn möglich -- der Auschecken-Bildschirm zeigt das Foto an, damit Freiwillige die Person vor ihnen visuell überprüfen können.
:::

## Page-a-Parent und Notfall-Rundfunk

Beide Features senden Textnachrichten über den SMS-Anbieter Ihrer Kirche -- es gibt keinen integrierten SMS-Service, daher muss zunächst einer der unterstützten Anbieter konfiguriert werden.

- **Page a parent** -- Aus dem Auschecken-Bildschirm eines bemannten Kiosks können Mitarbeiter die Eltern/Erziehungsberechtigten eines eingecheckten Kindes per SMS benachrichtigen (z.B. "Bitte kommen Sie zur Kinderbetreuung").
- **Notfall-Rundfunk** -- Aus den Admin-Einstellungen des Kiosks können Mitarbeiter alle Haushalte der ausgewählten Veranstaltung gleichzeitig per SMS benachrichtigen. Das Senden erfordert die Eingabe von **NOTFALL**, um zu bestätigen.

Personen, die sich von SMS abgemeldet haben, oder die keine Mobilnummer auf Datei haben, werden automatisch übersprungen -- der Kiosk zeigt an, wie viele Nachrichten gesendet und wie viele übersprungen wurden.

Siehe die Kiosk-seitige Anleitung in [Auschecken & Kindsicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Check-In](check-in.md) -- Kiosk-Setup und Hardware
- [Auschecken & Kindsicherheit](../../b1-checkin/check-in/checking-out) -- Auschecken, Abholverifikation und Paging-Flows
- [Gruppen erstellen](../groups/creating-groups.md) -- wo die Raumeinstellungen erfolgen
- [Anwesenheit Einrichtung](setup.md) -- Dienstleistungen, Dienstzeiten und Raumzuordnungen
- [Mindestalter für private Nachrichten](../settings/mobile-app.md#member-directory--messaging-settings) -- blockiert neue private Nachrichtenkonversationen mit Kindern, während sie im Verzeichnis bleiben
