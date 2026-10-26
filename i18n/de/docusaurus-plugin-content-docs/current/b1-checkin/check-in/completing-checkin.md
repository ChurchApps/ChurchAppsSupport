---
title: "Check-in abschließen"
---

# Check-in abschließen

<div class="article-intro">

Sobald Sie Ihren Haushalt überprüft und gegebenenfalls Gruppen zugewiesen haben, können Sie den Check-in abschließen. Dies ist der letzte Schritt im Kiosk-Ablauf: Die App übermittelt die Anwesenheit, druckt Etiketten aus und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Überprüfen Sie Ihren Haushalt](./household-review) auf dem Bildschirm zur Haushaltsprüfung.
- [Weisen Sie Gruppen zu](./group-assignment) für Familienmitglieder, die sich in eine bestimmte Klasse oder ein Programm einchecken sollen.
- Optional können Sie [Gäste hinzufügen](./adding-guests), die Ihre Familie begleiten.

</div>

## So checken Sie ein

1. Tippen Sie auf dem Bildschirm zur **Haushaltsprüfung** unten auf die Schaltfläche **Check-in**.
2. Die App übermittelt die Anwesenheitsdaten an den Server und zeigt einen **Erfolgsbildschirm** mit einem grünen Häkchen und einer Willkommensnachricht.

Mehr ist nicht nötig. Die Anwesenheit Ihrer Familie wurde erfasst.

## Volle Räume und Betreuungsschlüssel

Wenn Ihre Gemeinde [Sicherheitsgrenzen](../../b1-admin/attendance/checkin-safety) für ihre Räume festgelegt hat, prüft der Server diese vor dem Speichern:

- Ist ein ausgewählter Raum **voll oder geschlossen**, wird der Check-in nicht durchgeführt, und die App nennt den Raum, damit Sie einen anderen auswählen können.
- Hat die Gottesdienstzeit einen [Check-in-Zeitplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) und ist das Check-in-Fenster gerade nicht geöffnet, wird der Check-in in die Räume dieser Gottesdienstzeit ebenfalls abgelehnt. Der Bildschirm **Check-in noch nicht möglich** nennt den Raum mit dem Grund „Check-in ist gerade nicht geöffnet“. Tippen Sie auf **Räume ändern**, um eine andere Gottesdienstzeit oder Gruppe auszuwählen. (Bereits geschlossene Gottesdienstzeiten werden im [Haushaltsbildschirm](./household-review) als **Geschlossen** angezeigt und können nicht ausgewählt werden. Diese Meldung erscheint daher meist nur, wenn ein Fenster während eines Check-ins schließt.)
- Ein Haushalt, der für eine frühere Gottesdienstzeit eingecheckt hat, kann später zurückkommen und eine geöffnete Gottesdienstzeit hinzufügen, auch wenn das frühere Fenster bereits geschlossen ist. Die bestehenden Check-ins bleiben erhalten und führen nicht dazu, dass der neue Check-in abgelehnt wird.
- Ist ein Kinderraum **knapp an Ehrenamtlichen** für sein Betreuungsverhältnis, zeigt die App entweder eine Warnung, die eine Mitarbeitende Person bestätigen kann, um fortzufahren, oder sie blockiert den Check-in vollständig. Das hängt davon ab, wie Ihre Gemeinde die Einhaltung der Betreuungsverhältnisse konfiguriert hat.

## Etikettendruck

Ist ein Netzwerkdrucker eingerichtet, druckt die App nach dem Check-in automatisch Etiketten:

- **Namensschilder** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, bei der die Einstellung **Namensschild drucken** aktiviert ist. Namensschilder enthalten den Namen der Person, ihre Gruppenzuordnung sowie Allergie- und Hinweisangaben, sofern vorhanden.
- **Abholzettel für Eltern** werden gedruckt, sobald eine eingecheckte Person in einer Gruppe ist, bei der die Einstellung **Abholung durch Eltern** aktiviert ist. Personen, die als **Ehrenamtliche** eingecheckt wurden, werden übersprungen. Eine Betreuungsperson, die in einem Raum für die Abholung durch Eltern dient, erhält daher keinen Abholzettel. Der Abholzettel listet die Kinder, ihre Gruppenzuordnungen und einen eindeutigen **vierstelligen Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Namensschild des Kindes als auch auf dem Abholzettel der Eltern. Bei der Abholung gleichen Ehrenamtliche die Codes ab, um sicherzustellen, dass der richtige Erwachsene das jeweilige Kind abholt.
:::

Der Sicherheitscode wird bei jedem Check-in neu erzeugt und enthält nur Konsonanten und Ziffern. Vokale werden ausgeschlossen, damit keine unpassenden Wörter entstehen.

:::warning
Werden keine Etiketten gedruckt, öffnen Sie die Administratoreinstellungen, indem Sie siebenmal auf das **Gemeindelogo** tippen, und tippen Sie dann auf **Drucker ändern**, um die Druckerverbindung zu prüfen. Schritte zur Fehlerbehebung finden Sie unter [Druckereinrichtung](../getting-started/printer-setup).
:::

## Was nach dem Check-in geschieht

- Ist ein Drucker eingerichtet, druckt die App alle Etiketten und kehrt danach automatisch zum **Suchbildschirm** zurück, bereit für die nächste Familie.
- Ist kein Drucker eingerichtet, kehrt die App ebenfalls automatisch zum **Suchbildschirm** zurück.

In beiden Fällen bleibt der Erfolgsbildschirm mindestens 6 Sekunden ab seinem Erscheinen sichtbar (8 Sekunden, wenn er den Meilenstein der Anwesenheit einer Person feiert), damit Familien sehen, dass der Check-in funktioniert hat. Dauert das Drucken länger, kehrt die App etwa eineinhalb Sekunden nach Abschluss des Druckvorgangs zurück.

Sie müssen nichts antippen, um zum Suchbildschirm zurückzukehren. Die App übernimmt den Übergang automatisch. Sobald der Bildschirm einen Moment angezeigt wurde, können Sie ihn antippen, um sofort zurückzukehren. Ein Tippen in der ersten eineinhalb Sekunden wird ignoriert, sodass ein schnelles Doppeltippen auf **Check-in** den Bildschirm nicht überspringt.

:::tip
Die App setzt sich nach jedem Check-in vollständig zurück. So besteht keine Gefahr, dass eine Familie die Informationen einer anderen sieht.
:::

## Was gespeichert wird

Wenn Sie auf **Check-in** tippen, sendet die App folgende Daten an den Server, und zwar für jedes Haushaltsmitglied mit einer Gruppenzuordnung:

- Die **Person**, die eingecheckt wird
- Den **Gottesdienst**, den sie besucht
- Die **Gottesdienstzeit** und die **Gruppe**, denen sie zugewiesen ist

Diese Daten erscheinen im Bereich Anwesenheit in B1 Admin, wo die Administratoren Ihrer Gemeinde Anwesenheitsdaten einsehen und verwalten können. Einzelheiten finden Sie im [Leitfaden zur Check-in-Verwaltung](../../b1-admin/attendance/check-in.md).
