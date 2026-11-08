---
title: "Check-in abschließen"
description: "Schließen Sie den Kiosk-Check-in einer Familie in B1 Checkin ab. Die Seite behandelt Raumlimits, Etikettendruck, Abholsicherheitscodes und die nächsten Schritte der App."
---

# Check-in abschließen

<div class="article-intro">

Sobald Sie Ihren Haushalt überprüft und gegebenenfalls Gruppenzuweisungen vorgenommen haben, können Sie den Check-in abschließen. Dies ist der letzte Schritt im Kiosk-Ablauf: Die App übermittelt die Anwesenheit, druckt Etiketten und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Haushalt überprüfen](./household-review.md) auf dem Bildschirm zur Haushaltsprüfung
- [Gruppen zuweisen](./group-assignment.md) für Familienmitglieder, die sich in einer bestimmte Klasse oder ein Programm einchecken sollen
- Optional [Gäste hinzufügen](./adding-guests.md), die Ihre Familie begleiten

</div>

## So checken Sie ein

1. Tippen Sie auf dem **Bildschirm zur Haushaltsprüfung** unten auf die Schaltfläche **Check-in**.
2. Die App übermittelt die Anwesenheitsdaten an den Server und zeigt einen **Erfolgsbildschirm** mit einem grünen Häkchen und einer Willkommensnachricht.

Mehr ist nicht nötig. Die Anwesenheit Ihrer Familie wurde erfasst.

Wenn eine der ausgewählten Personen heute bereits für diesen Gottesdienst eingecheckt wurde, erscheint zunächst ein Fenster **Bereits eingecheckt**, das die betreffenden Personen nennt. Tippen Sie auf **Erneut einchecken**, um ihre neuen Gruppenauswahlen zu speichern, oder auf **Abbrechen**, um zum Haushaltsbildschirm zurückzukehren.

## Volle Räume und Betreuungsschlüssel

Wenn Ihre Gemeinde für ihre Räume [Sicherheitsgrenzen](../../b1-admin/attendance/checkin-safety.md) festgelegt hat, prüft der Server diese, bevor er speichert:

- Ist ein ausgewählter Raum **voll oder geschlossen**, wird der Check-in nicht durchgeführt. Die App nennt den Raum, damit Sie einen anderen auswählen können.
- Hat der Gottesdienst einen [Check-in-Zeitplan](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) und ist dessen Check-in-Zeitfenster gerade nicht geöffnet, wird der Check-in in die Räume dieses Gottesdienstes ebenfalls abgelehnt. Der Bildschirm **Noch kein Check-in möglich** listet den Raum mit dem Grund „Check-in ist gerade nicht geöffnet“ auf. Tippen Sie auf **Räume ändern**, um einen anderen Gottesdienst oder eine andere Gruppe auszuwählen. (Bereits abgeschlossene Gottesdienste werden auf dem [Haushaltsbildschirm](./household-review.md) als **Geschlossen** angezeigt und können nicht ausgewählt werden. Diese Meldung erscheint daher meist nur, wenn ein Zeitfenster während eines Check-ins schließt.)
- Ein Haushalt, der für einen früheren Gottesdienst eingecheckt war, kann später zurückkehren und einen geöffneten Gottesdienst hinzufügen, auch wenn das frühere Zeitfenster bereits geschlossen ist. Die bestehenden Check-ins bleiben erhalten und führen nicht dazu, dass der neue Check-in abgelehnt wird.
- Ist in einem Kinderraum zu wenig Betreuungspersonal für den vorgegebenen Schlüssel vorhanden, zeigt die App entweder eine Warnung, die eine Betreuungsperson zur Fortsetzung bestätigen kann, oder sie blockiert den Check-in vollständig. Das hängt davon ab, wie Ihre Gemeinde die Einhaltung des Betreuungsschlüssels konfiguriert hat.

## Etikettendruck

Wenn ein Netzwerkdrucker eingerichtet ist, druckt die App nach dem Check-in automatisch Etiketten:

- **Namensetiketten** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, für die die Einstellung **Namensschild drucken** aktiviert ist. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuweisung sowie Allergie- und Hinweisangaben, sofern vorhanden.
- **Abholzettel** werden gedruckt, sobald eine eingecheckte Person einer Gruppe angehört, für die die Einstellung **Abholung durch Eltern** aktiviert ist. Personen, die als **Volunteer** eingecheckt wurden, werden übersprungen. Eine Betreuungsperson, die in einem Raum mit Abholung durch Eltern eingesetzt ist, erhält daher keinen Abholzettel. Der Abholzettel listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen **vierstelligen Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Namensetikett des Kindes als auch auf dem Abholzettel der Eltern. Bei der Abholung gleichen Ehrenamtliche die Codes ab, um zu überprüfen, dass die richtige erwachsene Person das jeweilige Kind abholt.
:::

Der Sicherheitscode wird bei jedem Check-in neu erzeugt und besteht nur aus Konsonanten und Ziffern. Vokale werden ausgelassen, damit keine unpassenden Wörter entstehen.

:::warning
Wenn keine Etiketten gedruckt werden, öffnen Sie die Administratoreinstellungen, indem Sie siebenmal auf das **Gemeindelogo** tippen. Tippen Sie anschließend auf **Drucker ändern**, um die Druckerverbindung zu prüfen. Schritte zur Fehlerbehebung finden Sie unter [Druckereinrichtung](../getting-started/printer-setup.md).
:::

## Was nach dem Check-in passiert

- Ist ein Drucker eingerichtet, druckt die App alle Etiketten und kehrt danach automatisch zum **Suchbildschirm** zurück, bereit für die nächste Familie.
- Ist kein Drucker eingerichtet, kehrt die App ebenfalls automatisch zum **Suchbildschirm** zurück.

In beiden Fällen bleibt der Erfolgsbildschirm mindestens 6 Sekunden ab seinem Erscheinen sichtbar (8 Sekunden, wenn er den Meilenstein der Anwesenheit einer Person feiert), damit Familien sehen, dass der Check-in funktioniert hat. Dauert das Drucken länger, kehrt die App etwa eineinhalb Sekunden nach Abschluss des Druckvorgangs zurück.

Sie müssen nichts tippen, um zum Suchbildschirm zurückzukehren. Die App übernimmt den Übergang automatisch. Sobald der Bildschirm einen Moment angezeigt wurde, können Sie darauf tippen, um sofort zurückzukehren. Ein Tippen in den ersten eineinhalb Sekunden wird ignoriert, sodass ein schnelles Doppeltippen auf **Check-in** den Bildschirm nicht überspringt.

:::tip
Die App wird nach jedem Check-in vollständig zurückgesetzt. Es besteht daher keine Gefahr, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was gespeichert wird

Wenn Sie auf **Check-in** tippen, sendet die App für jedes Haushaltsmitglied mit einer Gruppenzuweisung folgende Daten an den Server:

- Die **Person**, die eingecheckt wird
- Den **Gottesdienst**, den sie besucht
- Die **Gottesdienstzeit** und die **Gruppe**, denen sie zugewiesen ist

Diese Daten erscheinen in B1 Admin im Bereich Anwesenheit, wo die Verwaltung Ihrer Gemeinde Anwesenheitsdaten einsehen und pflegen kann. Einzelheiten finden Sie im [Verwaltungshandbuch für den Check-in](../../b1-admin/attendance/check-in.md).
