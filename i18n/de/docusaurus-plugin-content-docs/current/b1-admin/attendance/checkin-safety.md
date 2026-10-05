---
title: "Anmeldungssicherheit"
---

# Anmeldungssicherheit

<div class="article-intro">

B1 enthält eine Reihe von Kindsicherheitsmaßnahmen für die Anmeldung: Raumkapazitätsgrenzen und Verhältnisse von Freiwilligen zu Kindern, Alter und Klassenstufenanleitung am Kiosk, Anmeldungstypen, die Mitglieder, Gäste und Freiwillige unterscheiden, und eine vertrauenswürdige Abholerliste pro Haushalt, die beim Auschecken überprüft wird. Diese Seite beschreibt, wie Sie die einzelnen Sicherheitsfunktionen in B1 Admin konfigurieren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Anmeldekioske](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Gottesdienstzeiten verknüpft sind – die Sicherheitseinstellungen unten befinden sich in der Gruppe
- Page-a-Parent und Notfall-Broadcast erfordern einen verbundenen SMS-Anbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Schließung eines Raums

Jeder Anmeldungsraum (Gruppe) kann seine eigenen Limits durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Stift-Symbol**, um ihre Einstellungen zu bearbeiten, und finden Sie den Abschnitt **Anmeldungskapazität**:

- **Kapazität** – Die maximale Anzahl von Personen, die gleichzeitig in diesem Raum angemeldet sein können. Wenn der Raum voll ist, wird die Anmeldung darin blockiert und der Kiosk zeigt den vollen Raum an.
- **Gastkapazität** – Eine optionale separate Obergrenze für die Anzahl der Gäste, die der Raum aufnehmen kann.
- **Für Anmeldung geschlossen** – Setzen Sie auf **Ja**, um alle Anmeldungen in diesem Raum sofort zu stoppen (z.B. wenn eine Klasse abgesagt ist oder ein Raum nicht verfügbar ist). Abmeldungen funktionieren weiterhin.

## Freiwilligenverhältnisse

Der gleiche Abschnitt **Anmeldungskapazität** in der Gruppe enthält auch Personalregeln:

- **Kinder pro Freiwilligem** – Die maximale Anzahl von Kindern, die jeder angemeldete Freiwillige betreuen kann (z.B. 5 bedeutet einen Freiwilligen pro fünf Kinder).
- **Mindestanzahl der Freiwilligen** – Die kleinste Anzahl von Freiwilligen, die angemeldet sein müssen, bevor Kinder sich im Raum anmelden können.

Freiwillige zählen zu diesen Regeln, wenn sie am Kiosk mit dem Typ **Freiwilliger** angemeldet sind (siehe [Anmeldungstypen](#check-in-types) unten).

### Warnung vs. Blockierung wählen

Wie streng die Verhältnisse durchgesetzt werden, ist eine kirchenweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen** und öffnen Sie den Abschnitt **Anmeldung**.
2. Stellen Sie die **Freiwilligenverhältnis-Durchsetzung** ein:
   - **Warnung (mit Bestätigung erlauben)** – Der Kiosk zeigt eine Warnung an, wenn ein Raum das Verhältnis überschreitet oder unter der Mindestanzahl von Freiwilligen liegt, und ein Mitarbeiter kann bestätigen, um trotzdem fortzufahren. Dies ist die Standardeinstellung.
   - **Blockieren (Anmeldung verhindern)** – Die Anmeldung zum Raum wird verweigert, bis genügend Freiwillige angemeldet sind.

:::info
Kapazität und Für Anmeldung geschlossen sind immer harte Grenzen – die Wahl zwischen Warnung und Blockierung gilt nur für Freiwilligenverhältnisse.
:::

## Anmeldungstypen

Jede Anmeldung erfasst, ob die Person ein **Mitglied**, ein **Gast** oder ein **Freiwilliger** ist. Der Typ wird am Kiosk über Chips auf dem Haushaltsbildschirm ausgewählt (Mitglied ist die Standardeinstellung). Typen werden in den Sicherheitsregeln verwendet – Freiwillige bieten Abdeckung der Verhältnisse, und Gäste zählen gegen die Gastkapazität des Raums.

## Alter und Klassenstufe Raumanleitung

Sie können für jeden Raum Alters- oder Klassenstufengrenzen festlegen, damit der Kiosk Familien zu passenden Räumen führt:

- Verwenden Sie in den Gruppeneinstellungen den Abschnitt **Alter & Klassenstufe**, um das Mindestalter/Maximalalter (Jahre und Monate) und/oder die Klassenstufe für den Raum festzulegen.
- Am Kiosk werden Räume, für die ein Kind geeignet ist, hervorgehoben und Räume, für die es nicht geeignet ist, sind abgeblendet. Ein abgeblendeter Raum kann mit einer Bestätigung des Personals weiterhin gewählt werden – die Anleitung blockiert nie hart.

Klassenstufen werden am **Klassenstufenüberlegungs-Datum** Ihrer Kirche überarbeitet:

1. Gehen Sie in B1 Admin zu **Einstellungen** und öffnen Sie den Abschnitt **Klassenstufenüberleitung**.
2. Stellen Sie den Monat und Tag ein, an dem Ihre Kirche Schüler befördert (z.B. 1. August). Alter und Klassenstufen am Kiosk werden bis zum letzten Klassenstufenüberlegungs-Datum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholpersonen

Jeder Haushalt kann eine Liste von Personen haben, denen es gestattet ist – oder nicht – seine Kinder abzuholen.

1. Öffnen Sie die Seite einer Person unter **Personen** und finden Sie die Karte **Abholung**.
2. Klicken Sie auf **Hinzufügen**. Suchen Sie nach einer bestehenden Person oder fügen Sie jemanden, der nicht im System ist, hinzu, indem Sie seinen **Namen**, **Beziehung** und ein Foto eingeben.
3. Legen Sie den **Status** fest:
   - **Vertrauenswürdig** – Beim Auschecken erscheint diese Person als anklickbare Abholkarte mit ihrem Foto, was verifizierte Abhol schnell macht.
   - **Nicht autorisiert** – Wenn jemand versucht, unter diesem Namen abzuholen, blockiert der Kiosk das Auschecken mit einer Warnung. Ein Mitarbeiter kann das übergeordnete Menü aufrufen, und das Übergeordnete wird im Teilnahmeeintrag aufgezeichnet.

Klicken Sie auf den Status-Chip einer Person auf der Karte, um zwischen Vertrauenswürdig und Nicht autorisiert umzuschalten.

:::tip
Fügen Sie nach Möglichkeit Fotos zu vertrauenswürdigen Abholpersonen hinzu – der Auschecken-Bildschirm zeigt das Foto, damit Freiwillige die Person vor ihnen visuell überprüfen können.
:::

## Page-a-Parent und Notfall-Broadcast

Beide Funktionen senden Textnachrichten über den verbundenen SMS-Anbieter Ihrer Kirche – es gibt keinen integrierten SMS-Service, daher muss zunächst einer der unterstützten Anbieter konfiguriert werden.

- **Page a Parent** – Vom Auschecken-Bildschirm eines bemannten Kiosks können Mitarbeiter eine Textnachricht an die Eltern/Erziehungsberechtigten eines angemeldeten Kindes senden (z.B. "Bitte kommen Sie zur Krabbelstubestube").
- **Notfall-Broadcast** – Vom Verwaltungsbereich des Kiosks können Mitarbeiter alle angemeldeten Haushalts-Erziehungsberechtigten für den ausgewählten Gottesdienst auf einmal anrufen. Das Senden erfordert das Tippen von **NOTFALL**, um zu bestätigen.

Personen, die sich von Texten abgemeldet haben, oder die keine Mobilnummer gespeichert haben, werden automatisch übersprungen – der Kiosk meldet, wie viele Nachrichten gesendet wurden und wie viele übersprungen wurden.

Siehe die Kiosk-seitige Anleitung unter [Auschecken & Kindsicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Anmeldung](check-in.md) – Kiosk-Setup und Hardware
- [Auschecken & Kindsicherheit](../../b1-checkin/check-in/checking-out) – der Kiosk-Auschecken, Abholüberprüfung und Anrufen-Abläufe
- [Gruppen erstellen](../groups/creating-groups.md) – wo Raumeinstellungen gespeichert sind
- [Anwesenheitseinrichtung](setup.md) – Gottesdienste, Gottesdienstzeiten und Raumzuweisungen
- [Mindestalter für private Nachrichten](../settings/mobile-app.md#member-directory--messaging-settings) – blockiert neue private Nachrichtenkonversationen mit Kindern, während sie weiterhin im Verzeichnis angezeigt werden
