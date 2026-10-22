---
title: "Check-in abschließen"
---

# Check-in abschließen

<div class="article-intro">

Sobald Sie Ihren Haushalt geprüft und gegebenenfalls Gruppen zugewiesen haben, können Sie den Check-in abschließen. Dies ist der letzte Schritt im Ablauf des Kiosks: Die App übermittelt die Anwesenheit, druckt Etiketten und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Prüfen Sie Ihren Haushalt](./household-review) auf dem Bildschirm zur Haushaltsprüfung.
- [Weisen Sie Gruppen zu](./group-assignment) für Familienmitglieder, die sich in eine bestimmte Klasse oder ein bestimmtes Programm einchecken müssen.
- Optional [fügen Sie Gäste hinzu](./adding-guests), die Ihre Familie besuchen.

</div>

## So checken Sie ein

1. Tippen Sie auf dem **Bildschirm zur Haushaltsprüfung** unten auf die Schaltfläche **Einchecken**.
2. Die App übermittelt die Anwesenheitsdaten an den Server und zeigt einen **Erfolgsbildschirm** mit einem grünen Häkchen und einer Willkommensnachricht.

Mehr ist nicht nötig. Die Anwesenheit Ihrer Familie ist erfasst.

## Volle Räume und Betreuungsschlüssel

Wenn Ihre Kirche [Sicherheitsgrenzen](../../b1-admin/attendance/checkin-safety) für ihre Räume festgelegt hat, prüft der Server diese vor dem Speichern:

- Ist ein ausgewählter Raum **voll oder geschlossen**, wird der Check-in nicht durchgeführt, und die App nennt den Raum, damit Sie einen anderen auswählen können.
- Hat die Gottesdienstzeit einen [Check-in-Zeitplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) und ist das Check-in-Fenster gerade nicht geöffnet, wird der Check-in in die Räume dieser Gottesdienstzeit ebenfalls abgelehnt. Der Bildschirm **Noch nicht einchecken** nennt den Raum mit dem Grund „Check-in ist gerade nicht geöffnet“. Tippen Sie auf **Räume ändern**, um eine andere Gottesdienstzeit oder Gruppe zu wählen. (Gottesdienstzeiten, die bereits geschlossen sind, werden auf dem [Haushaltsbildschirm](./household-review) als **Geschlossen** angezeigt und können nicht ausgewählt werden. Diese Meldung sehen Sie daher in der Regel nur, wenn ein Fenster während eines Check-ins mittendrin schließt.)
- Ein Haushalt, der für eine frühere Gottesdienstzeit eingecheckt hat, kann später zurückkommen und eine geöffnete Gottesdienstzeit hinzufügen, auch wenn das frühere Fenster bereits geschlossen ist. Seine bestehenden Check-ins bleiben erhalten und führen nicht dazu, dass der neue Check-in abgelehnt wird.
- Ist ein Kinderraum für seinen Schlüssel **knapp an Ehrenamtlichen**, zeigt die App entweder eine Warnung, die eine Mitarbeiterin oder ein Mitarbeiter bestätigen kann, um fortzufahren, oder sie blockiert den Check-in vollständig. Das hängt davon ab, wie Ihre Kirche die Einhaltung der Schlüssel eingerichtet hat.

## Etiketten drucken

Ist ein Netzwerkdrucker eingerichtet, druckt die App nach dem Check-in automatisch Etiketten:

- **Namensetiketten** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, für die die Einstellung **Namensschild drucken** aktiviert ist. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuweisung und gegebenenfalls Allergie- oder Notizinformationen.
- **Abholzettel für Eltern** werden gedruckt, sobald eine eingecheckte Person in einer Gruppe ist, für die die Einstellung **Abholung durch Eltern** aktiviert ist. Personen, die als **Ehrenamtlich** eingecheckt wurden, werden übersprungen. Eine Betreuungsperson, die in einem Raum mit Abholung durch Eltern dient, bekommt also keinen Abholzettel. Der Abholzettel listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen **4-stelligen Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Namensetikett des Kindes als auch auf dem Abholzettel der Eltern. Bei der Abholung gleichen Ehrenamtliche die Codes ab, um zu prüfen, dass der richtige Erwachsene jedes Kind abholt.
:::

Der Sicherheitscode wird bei jedem Check-in neu erzeugt und verwendet nur Konsonanten und Ziffern (Vokale sind ausgeschlossen, damit keine unpassenden Wörter entstehen).

:::warning
Werden keine Etiketten gedruckt, öffnen Sie die Admin-Einstellungen, indem Sie siebenmal auf das **Kirchenlogo** tippen, und tippen Sie dann auf **Drucker ändern**, um die Verbindung zum Drucker zu prüfen. Schritte zur Fehlerbehebung finden Sie unter [Druckereinrichtung](../getting-started/printer-setup).
:::

## Was nach dem Check-in passiert

- Ist ein Drucker eingerichtet, druckt die App alle Etiketten und kehrt dann automatisch zum **Suchbildschirm** zurück, bereit für die nächste Familie.
- Ist kein Drucker eingerichtet, bleibt der Erfolgsbildschirm einige Sekunden angezeigt und kehrt dann automatisch zum **Suchbildschirm** zurück.

Sie müssen nichts tippen, um zum Suchbildschirm zurückzukehren. Die App übernimmt den Wechsel automatisch.

:::tip
Die App wird nach jedem Check-in vollständig zurückgesetzt. Daher besteht kein Risiko, dass eine Familie die Angaben einer anderen Familie sieht.
:::

## Was erfasst wird

Wenn Sie auf **Einchecken** tippen, sendet die App für jedes Haushaltsmitglied mit einer Gruppenzuweisung Folgendes an den Server:

- die **Person**, die eingecheckt wird,
- den **Gottesdienst**, den sie besucht,
- die **Gottesdienstzeit** und die **Gruppe**, denen sie zugewiesen ist.

Diese Daten erscheinen in B1 Admin im Bereich Anwesenheit, wo die Verantwortlichen Ihrer Kirche die Anwesenheitsdaten einsehen und verwalten können. Einzelheiten finden Sie im [Verwaltungsleitfaden für den Check-in](../../b1-admin/attendance/check-in.md).
