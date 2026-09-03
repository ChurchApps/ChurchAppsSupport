---
title: "Check-In-Sicherheit"
---

# Check-In-Sicherheit

<div class="article-intro">

B1 umfasst eine Reihe von Kindsicherheitsmaßnahmen für Check-ins: Raumkapazitätsgrenzen und Verhältnisse von Freiwilligen zu Kindern, Alters- und Klasseneinstufungen am Kiosk, Check-in-Typen, die Mitglieder, Gäste und Freiwillige unterscheiden, sowie eine Liste vertrauenswürdiger Personen pro Haushalt, die bei der Abreise überprüft wird. Diese Seite behandelt die Konfiguration der einzelnen Sicherheitsfunktionen in B1 Admin.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Anwesenheitsstruktur](setup.md) und [Check-In-Kioske](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Servicezeiten verknüpft sind – die folgenden Sicherheitseinstellungen befinden sich in der Gruppe
- Page-a-parent und Notfallbenachrichtigungen erfordern einen verbundenen Textinganbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Schließen eines Raums

Jeder Check-In-Raum (Gruppe) kann seine eigenen Grenzen durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Stiftsymbol**, um ihre Einstellungen zu bearbeiten, und finden Sie den Abschnitt **Check-In-Kapazität**:

- **Kapazität** – Die maximale Anzahl von Personen, die gleichzeitig in diesen Raum eingecheckt werden können. Wenn der Raum voll ist, ist der Check-In blockiert und der Kiosk nennt den vollen Raum.
- **Gästekapazität** – Eine optionale separate Obergrenze für die Anzahl der Gäste, die der Raum fassen kann.
- **Für Check-In geschlossen** – Setzen Sie auf **Ja**, um alle Check-ins in diesen Raum sofort zu stoppen (z. B. wenn eine Klasse abgesagt oder ein Raum nicht verfügbar ist). Abreisen funktionieren weiterhin.

## Verhältnisse von Freiwilligen

Der gleiche Abschnitt **Check-In-Kapazität** in der Gruppe enthält Personalregeln:

- **Kinder pro Freiwilliger** – Die maximale Anzahl von Kindern, die jeder eingecheckte Freiwillige abdecken kann (z. B. 5 bedeutet einen Freiwilligen für fünf Kinder).
- **Mindestanzahl Freiwilliger** – Die kleinste Anzahl von Freiwilligen, die eingecheckt sein müssen, bevor Kinder in den Raum einchecken können.

Freiwillige zählen zu diesen Regeln, wenn sie am Kiosk mit dem Typ **Freiwilliger** einchecken (siehe [Check-In-Typen](#check-in-typen) unten).

### Warnungen versus Blockierung wählen

Wie streng die Verhältnisse durchgesetzt werden, ist eine kirchenweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die Kachel **Check-In**.
2. Setzen Sie **Durchsetzung des Freiwilligenverhältnisses**:
   - **Warnen (mit Bestätigung erlauben)** – Der Kiosk zeigt eine Warnung, wenn ein Raum über dem Verhältnis liegt oder unter dem Mindestfreiwilligen hat, und ein Mitarbeiter kann bestätigen, um trotzdem fortzufahren. Dies ist die Standardeinstellung.
   - **Blockieren (Check-In verhindern)** – Das Check-in zum Raum wird verweigert, bis genügend Freiwillige eingecheckt sind.

:::info
Kapazität und Für Check-In geschlossen sind immer harte Grenzen – die Wahlmöglichkeit Warnen/Blockieren gilt nur für Freiwilligenverhältnisse.
:::

## Check-In-Typen

Jedes Check-in verzeichnet, ob die Person ein **Mitglied**, ein **Gast** oder ein **Freiwilliger** ist. Der Typ wird mit Chips auf dem Haushaltskiosk-Bildschirm gewählt (Mitglied ist der Standard). Typen speisen die Sicherheitsregeln – Freiwillige bieten Verhältnisschutz, und Gäste zählen gegen die Gästekapazität des Raums.

## Alters- und Klasseneinstufungsanleitungen für Räume

Sie können jedes Zimmer mit Alters- oder Klassengrenzen versehen, damit der Kiosk Familien zu angemessenen Räumen führt:

- Verwenden Sie im Abschnitt **Altersangaben & Klasse** der Gruppeneinstellungen, um das Mindest-/Höchstalter (Jahre und Monate) und/oder die Klasse für den Raum einzustellen.
- Am Kiosk werden Räume hervorgehoben, für die sich ein Kind qualifiziert, und Räume, für die es nicht geeignet ist, sind gedimmt. Ein gedimmter Raum kann mit einer Mitarbeiterbestätigung weiterhin ausgewählt werden – die Anleitung blockiert nie hart.

Klassen rollen an Ihrem **Klassenpromotionstag** der Kirche über:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die Kachel zur Klassenpromtion.
2. Setzen Sie den Monat und Tag, an dem Ihre Kirche Schüler befördert (z. B. 1. August). Alter und Klassen am Kiosk werden ab dem letzten Promotionstag berechnet.

## Vertrauenswürdige und nicht autorisierte Personen zur Abholung

Jeder Haushalt kann eine Liste von Personen führen, die berechtigt sind – oder nicht berechtigt sind – ihre Kinder abzuholen.

1. Öffnen Sie die Seite einer Person in **Personen** und finden Sie die Karte **Abholung**.
2. Klicken Sie auf **Hinzufügen**. Suchen Sie nach einer bestehenden Person, oder fügen Sie jemanden, der nicht im System ist, hinzu, indem Sie seinen **Namen**, **Beziehung** und ein Foto eingeben.
3. Stellen Sie den **Status** ein:
   - **Vertraut** – Bei der Abreise erscheint diese Person als antippbare Abholkarte mit ihrem Foto, was schnelle, vertrauenswürdige Abholungen ermöglicht.
   - **Nicht autorisiert** – Falls jemand versucht, unter diesem Namen abzuholen, blockiert der Kiosk die Abreise mit einer Warnung. Ein Mitarbeiter kann überschreiben, und die Überschreibung wird im Anwesenheitsdatensatz aufgezeichnet.

Klicken Sie auf den Status-Chip einer Person auf der Karte, um zwischen Vertraut und Nicht autorisiert umzuschalten.

:::tip
Fügen Sie vertrauenswürdigen Abhol-Personen wann immer möglich Fotos hinzu – der Abreisebildschirm zeigt das Foto, damit Freiwillige die Person vor ihnen visuell überprüfen können.
:::

## Page-a-Parent und Notfallbenachrichtigung

Beide Funktionen senden Textnachrichten über den verbundenen Textinganbieter Ihrer Kirche – es gibt keinen integrierten SMS-Dienst, also muss zuerst einer der unterstützten Anbieter konfiguriert werden.

- **Rufen Sie einen Elternteil an** – Vom Abreisebildschirm eines bemannten Kiosks können Mitarbeiter die Eltern/Erziehungsberechtigten eines eingecheckten Kindes anschreiben (z. B. „Bitte kommen Sie in die Krippe").
- **Notfallbenachrichtigung** – Aus den Verwaltungseinstellungen des Kiosks können Mitarbeiter jeden eingecheckten Haushalt von Erziehungsberechtigten für den ausgewählten Service auf einmal anschreiben. Zum Senden ist das Eingeben von **NOTFALL** erforderlich.

Personen, die sich von Texten abgemeldet haben, oder die keine Mobilfunknummer auf Datei haben, werden automatisch übersprungen – der Kiosk zeigt an, wie viele Nachrichten gesendet wurden und wie viele übersprungen wurden.

Siehe die Kiosk-seitige Anleitung unter [Abreise & Kindsicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Check-In](check-in.md) – Kiosk-Setup und Hardware
- [Abreise & Kindsicherheit](../../b1-checkin/check-in/checking-out) – Der Kiosk-Abreiseprozess, die Überprüfung der Abholung und Benachrichtigungsflows
- [Gruppen erstellen](../groups/creating-groups.md) – Wo sich die Raumeinstellungen befinden
- [Anwesenheitssetup](setup.md) – Services, Servicezeiten und Raumzuweisungen
- [Mindestalter für private Nachrichten](../settings/mobile-app.md#member-directory--messaging-settings) – Blockiert neue private-Nachricht-Konversationen mit Kindern, während diese im Verzeichnis bleiben
