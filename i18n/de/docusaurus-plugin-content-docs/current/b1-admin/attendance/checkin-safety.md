---
title: "Check-In-Sicherheit"
---

# Check-In-Sicherheit

<div class="article-intro">

B1 bietet eine umfassende Reihe von Kindersicherheitsmaßnahmen für Check-ins: Raumkapazitätsgrenzen und Freiwilligenverhältnisse, Alters- und Klassenleitfaden am Kiosk, Check-in-Typen zur Unterscheidung von Mitgliedern, Gästen und Freiwilligen, sowie eine vertrauenswürdige Abholiste pro Haushalt, die beim Check-Out überprüft wird. Diese Seite beschreibt, wie Sie jede Sicherheitsfunktion in B1 Admin konfigurieren.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre [Teilnahmestruktur](setup.md) und [Check-In-Kioske](check-in.md) ein
- Räume sind [Gruppen](../groups/creating-groups.md), die mit Gottesdiensten verknüpft sind – die Sicherheitseinstellungen befinden sich auf der Gruppe
- Page-a-Parent und Notfallübertragung erfordern einen verbundenen SMS-Anbieter ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) oder Mutual Ministry)

</div>

## Raumkapazität und Schließen eines Raums

Jeder Check-In-Raum (Gruppe) kann seine eigenen Kapazitätsgrenzen durchsetzen. Öffnen Sie die Gruppe, klicken Sie auf das **Stiftsymbol**, um die Einstellungen zu bearbeiten, und suchen Sie den Abschnitt **Check-In-Kapazität**:

- **Kapazität** – Die maximale Anzahl von Personen, die gleichzeitig in diesen Raum eingecheckt werden können. Wenn der Raum voll ist, wird der Check-In blockiert und der Kiosk zeigt an, dass der Raum voll ist.
- **Gästekapazität** – Eine optionale separate Obergrenze für die Anzahl der Gäste, die der Raum aufnehmen kann.
- **Für Check-In geschlossen** – Auf **Ja** setzen, um alle Check-Ins zu diesem Raum sofort zu stoppen (z. B., wenn eine Klasse ausfällt oder ein Raum nicht verfügbar ist). Check-Outs funktionieren weiterhin.

## Freiwilligenverhältnisse

Der gleiche Abschnitt **Check-In-Kapazität** auf der Gruppe enthält auch Personalregeln:

- **Kinder pro Freiwilliger** – Die maximale Anzahl von Kindern, die jeder eingecheckte Freiwillige beaufsichtigen kann (z. B. 5 bedeutet einen Freiwilligen pro fünf Kindern).
- **Mindestanzahl Freiwilliger** – Die kleinste Anzahl von Freiwilligen, die eingecheckt sein müssen, bevor Kinder in den Raum eingecheckt werden können.

Freiwillige zählen zu diesen Regeln, wenn sie am Kiosk mit dem Typ **Freiwilliger** einchecken (siehe [Check-In-Typen](#check-in-typen) unten).

### Auswahl zwischen Warnung und Blockierung

Wie streng die Verhältnisse durchgesetzt werden, ist eine kirchenweite Einstellung:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die Kachel **Check-In**.
2. Legen Sie **Durchsetzung des Freiwilligenverhältnisses** fest:
   - **Warnen (mit Bestätigung erlauben)** – Der Kiosk zeigt eine Warnung an, wenn ein Raum das Verhältnis überschreitet oder nicht über genug Freiwillige verfügt, und ein Mitarbeiter kann bestätigen, um dennoch fortzufahren. Dies ist die Standardeinstellung.
   - **Blockieren (Check-In verhindern)** – Der Check-In in den Raum wird verweigert, bis genug Freiwillige eingecheckt sind.

:::info
Kapazität und „Für Check-In geschlossen" sind immer strikte Grenzen – die Auswahl „Warnung/Blockieren" gilt nur für Freiwilligenverhältnisse.
:::

## Check-In-Typen

Jeder Check-In erfasst, ob die Person ein **Mitglied**, **Gast** oder **Freiwilliger** ist. Der Typ wird mit Chips auf dem Haushaltbildschirm des Kiosks ausgewählt (Mitglied ist die Standardeinstellung). Typen beeinflussen die Sicherheitsregeln – Freiwillige tragen zum Verhältnis bei, und Gäste zählen gegen die Gästekapazität des Raums.

## Alters- und Klassenleitfaden für Räume

Sie können jedem Raum Alters- oder Klassengrenzen zuweisen, damit der Kiosk Familien zu geeigneten Räumen führt:

- Verwenden Sie in den Gruppeneinstellungen den Abschnitt **Alter & Klasse**, um das minimale/maximale Alter (in Jahren und Monaten) und/oder die Klassenstufe für den Raum festzulegen.
- Am Kiosk werden Räume, für die ein Kind geeignet ist, hervorgehoben und Räume, für die es nicht geeignet ist, abgeblendet. Ein abgeblendeter Raum kann immer noch mit einer Mitarbeiterbestätigung gewählt werden – die Anleitung blockiert niemals hart.

Klassenstufen werden am **Klassenstufen-Beförderungsdatum** Ihrer Kirche aktualisiert:

1. Gehen Sie in B1 Admin zu **Einstellungen > Kirche verwalten** und öffnen Sie die Kachel für die Klassenstufen-Beförderung.
2. Legen Sie den Monat und Tag fest, an dem Ihre Kirche Schüler befördert (z. B. 1. August). Altersangaben und Klassenstufen am Kiosk werden ab dem letzten Beförderungsdatum berechnet.

## Vertrauenswürdige und nicht autorisierte Abholpersonen

Jeder Haushalt kann eine Liste von Personen führen, die berechtigt sind (oder nicht berechtigt sind), die Kinder abzuholen.

1. Öffnen Sie eine Personenseite unter **Personen** und suchen Sie die Karte **Abholung**.
2. Klicken Sie auf **Hinzufügen**. Suchen Sie nach einer vorhandenen Person, oder fügen Sie eine nicht im System vorhandene Person hinzu, indem Sie ihren **Namen**, ihre **Beziehung** und ein Foto eingeben.
3. Legen Sie den **Status** fest:
   - **Vertrauenswürdig** – Beim Check-Out erscheint diese Person als tippbare Abholkarte mit ihrem Foto, was eine schnelle überprüfte Abholung ermöglicht.
   - **Nicht autorisiert** – Wenn jemand versucht, unter diesem Namen abzuholen, blockiert der Kiosk den Check-Out mit einer Warnung. Ein Mitarbeiter kann die Blockierung überschreiben, und die Überschreibung wird in der Anwesenheitsaufzeichnung notiert.

Klicken Sie auf das Status-Chip einer Person auf der Karte, um zwischen Vertrauenswürdig und Nicht autorisiert zu wechseln.

:::tip
Fügen Sie Fotos vertrauenswürdiger Abholpersonen hinzu, wann immer möglich – der Check-Out-Bildschirm zeigt das Foto an, damit Freiwillige die vor ihnen stehende Person visuell überprüfen können.
:::

## Page-a-Parent und Notfallübertragung

Beide Funktionen senden Textnachrichten über den SMS-Anbieter Ihrer Kirche – es gibt keinen integrierten SMS-Dienst, daher muss zunächst ein unterstützter Anbieter konfiguriert werden.

- **Page a parent** – Von einem besetzten Kiosk aus können Mitarbeiter die Eltern/Erziehungsberechtigten eines eingecheckten Kindes per SMS benachrichtigen (z. B. „Bitte kommen Sie zur Kinderbetreuung").
- **Notfallübertragung** – Von den Admin-Einstellungen des Kiosks können Mitarbeiter alle eingecheckten Haushalte der Erziehungsberechtigten für den ausgewählten Gottesdienst auf einmal benachrichtigen. Das Versenden erfordert die Eingabe von **NOTFALL** zur Bestätigung.

Personen, die sich von Texten abgemeldet haben, oder Personen ohne Mobilnummer in der Datei, werden automatisch übersprungen – der Kiosk meldet, wie viele Nachrichten gesendet wurden und wie viele übersprungen wurden.

Siehe die kioskseitige Anleitung in [Check-Out & Kindersicherheit](../../b1-checkin/check-in/checking-out).

## Verwandte Artikel

- [Check-In](check-in.md) – Kiosk-Einrichtung und Hardware
- [Check-Out & Kindersicherheit](../../b1-checkin/check-in/checking-out) – Der Kiosk-Check-Out, Abholüberprüfung und Paging-Workflows
- [Gruppen erstellen](../groups/creating-groups.md) – Wo Raumeinstellungen gespeichert sind
- [Teilnahme-Einrichtung](setup.md) – Gottesdienste, Gottesdienststunden und Raumzuweisungen
