---
title: "Check-in abschließen"
---

# Check-in abschließen

<div class="article-intro">

Sobald Sie Ihren Haushalt überprüft und gegebenenfalls Gruppen zugewiesen haben, können Sie den Check-in abschließen. Dies ist der letzte Schritt im Kiosk-Ablauf: Die App übermittelt die Anwesenheit, druckt Etiketten und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Überprüfen Sie Ihren Haushalt](./household-review) auf dem Bildschirm zur Haushaltsprüfung
- [Weisen Sie Gruppen zu](./group-assignment) für Familienmitglieder, die sich für einen bestimmten Kurs oder ein bestimmtes Programm einchecken sollen
- Optional: [Fügen Sie Gäste hinzu](./adding-guests), die Ihre Familie begleiten

</div>

## So checken Sie ein

1. Tippen Sie auf dem **Bildschirm zur Haushaltsprüfung** unten auf die Schaltfläche **Check-in**.
2. Die App übermittelt die Anwesenheitsdaten an den Server und zeigt einen **Erfolgsbildschirm** mit einem grünen Häkchen und einer Willkommensnachricht an.

Mehr ist nicht nötig. Die Anwesenheit Ihrer Familie wurde erfasst.

## Volle Räume und Betreuungsschlüssel

Wenn Ihre Kirche [Sicherheitsgrenzen](../../b1-admin/attendance/checkin-safety) für ihre Räume festgelegt hat, prüft der Server diese vor dem Speichern:

- Ist ein ausgewählter Raum **voll oder geschlossen**, wird der Check-in nicht durchgeführt, und die App nennt den Raum, damit Sie einen anderen auswählen können.
- Hat die Gottesdienstzeit einen [Check-in-Zeitplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) und ist deren Check-in-Fenster gerade nicht geöffnet, wird der Check-in in die Räume dieser Gottesdienstzeit ebenfalls abgelehnt. Der Bildschirm **Check-in noch nicht möglich** listet den Raum mit dem Grund „Check-in ist gerade nicht geöffnet“ auf; tippen Sie auf **Räume ändern**, um eine andere Gottesdienstzeit oder Gruppe auszuwählen. (Gottesdienstzeiten, die bereits geschlossen sind, wenn Sie einen [Gottesdienst auswählen](./selecting-service#when-check-in-isnt-open), werden ausgeblendet. Deshalb sehen Sie dies in der Regel nur, wenn ein Fenster während eines Check-ins schließt.)
- Ist in einem Kinderraum zu wenig Betreuung für den vorgesehenen Schlüssel vorhanden, zeigt die App entweder eine Warnung, die eine Mitarbeiterin bzw. ein Mitarbeiter bestätigen kann, um fortzufahren, oder sie blockiert den Check-in vollständig – je nachdem, wie Ihre Kirche die Einhaltung des Schlüssels konfiguriert hat.

## Etikettendruck

Ist ein Netzwerkdrucker eingerichtet, druckt die App nach dem Check-in automatisch Etiketten:

- **Namensetiketten** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, bei der die Einstellung **Namensschild drucken** aktiviert ist. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuordnung sowie Allergie- und Hinweisangaben, sofern hinterlegt.
- **Abholzettel für Eltern** werden gedruckt, wenn eine eingecheckte Person in einer Gruppe ist, bei der die Einstellung **Abholung durch Eltern** aktiviert ist. Personen, die als **Ehrenamtlicher** eingecheckt sind, werden übersprungen. Eine Betreuungsperson, die in einem Raum für die Abholung durch Eltern dient, erhält daher keinen Abholzettel. Der Abholzettel listet die Kinder, ihre Gruppenzuordnungen und einen eindeutigen **vierstelligen Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Namensetikett des Kindes als auch auf dem Abholzettel der Eltern. Bei der Abholung gleichen die Ehrenamtlichen die Codes ab, um zu überprüfen, dass die richtige erwachsene Person jedes Kind abholt.
:::

Der Sicherheitscode wird bei jedem Check-in neu erzeugt und verwendet nur Konsonanten und Ziffern (Vokale werden ausgeschlossen, damit keine unpassenden Wörter entstehen).

:::warning
Wenn keine Etiketten gedruckt werden, öffnen Sie die Admin-Einstellungen, indem Sie siebenmal auf das **Kirchenlogo** tippen, und tippen Sie dann auf **Drucker wechseln**, um die Druckerverbindung zu prüfen. Schritte zur Fehlerbehebung finden Sie unter [Druckereinrichtung](../getting-started/printer-setup).
:::

## Was nach dem Check-in passiert

- Ist ein Drucker eingerichtet, druckt die App alle Etiketten und kehrt danach automatisch zum **Suchbildschirm** zurück, bereit für die nächste Familie.
- Ist kein Drucker eingerichtet, wird der Erfolgsbildschirm einige Sekunden angezeigt und kehrt danach automatisch zum **Suchbildschirm** zurück.

Sie müssen nicht tippen, um zum Suchbildschirm zurückzukehren – die App übernimmt den Wechsel automatisch.

:::tip
Die App setzt sich nach jedem Check-in vollständig zurück. Daher besteht kein Risiko, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was erfasst wird

Wenn Sie auf **Check-in** tippen, sendet die App für jedes Haushaltsmitglied mit einer Gruppenzuweisung Folgendes an den Server:

- Die **Person**, die eingecheckt wird
- Den **Gottesdienst**, den sie besucht
- Die **Gottesdienstzeit** und die **Gruppe**, denen sie zugewiesen ist

Diese Daten erscheinen in B1 Admin im Bereich Anwesenheit, wo Ihre Kirchenverwaltung die Anwesenheitsdaten einsehen und verwalten kann. Einzelheiten finden Sie im [Verwaltungsleitfaden für den Check-in](../../b1-admin/attendance/check-in.md).
