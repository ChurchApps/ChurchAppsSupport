---
title: "Einen Gottesdienst auswählen"
---

# Einen Gottesdienst auswählen

<div class="article-intro">

Der erste Schritt jedes Check-ins ist die Auswahl des Gottesdienstes, den Sie besuchen. Der Bildschirm der Gottesdienste erscheint, sobald die App fertig geladen ist. Er bestimmt, welche Gottesdienstzeiten und Gruppen für den restlichen Check-in-Ablauf verfügbar sind.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Melden Sie sich](../getting-started/logging-in) bei der App B1 Church Checkin an und wählen Sie Ihre Kirche aus.
- Stellen Sie sicher, dass Ihre Kirchenverwaltung [Gottesdienste und Gottesdienstzeiten konfiguriert hat](../../b1-admin/attendance/setup.md) in B1 Admin.

</div>

## So funktioniert es

1. Nach der Anmeldung (oder nach der automatischen Anmeldung bei späteren Besuchen) zeigt die App den **Bildschirm der Gottesdienste**.
2. Sie sehen eine Liste aller Gottesdienste, die für Ihre Kirche eingerichtet wurden. Jeder Gottesdienst erscheint als Karte mit seinem Namen (zum Beispiel „Sonntagmorgen“ oder „Mittwochabend“).
3. Tippen Sie auf den Gottesdienst, den Sie besuchen.

Die App lädt die Gottesdienstzeiten und Gruppen, die zu diesem Gottesdienst gehören, und bringt Sie dann zum [Suchbildschirm für Mitglieder](./looking-up-members).

## Wenn der Check-in nicht geöffnet ist

Hat Ihre Administration einer Gottesdienstzeit einen [Check-in-Zeitplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) gegeben, lässt die App Familien diese Gottesdienstzeit nur wählen, solange ihr Check-in-Fenster geöffnet ist. Gottesdienstzeiten, deren Fenster gerade geschlossen ist, erscheinen trotzdem auf dem [Haushaltsbildschirm](./household-review). Sie sind dort aber als **Geschlossen** markiert (zum Beispiel **Geschlossen · öffnet So 9:30 Uhr**) und bieten keine Gruppenschaltfläche an.

Sind alle Gottesdienstzeiten des von Ihnen angetippten Gottesdienstes geschlossen, nennt die App den Zeitpunkt, zu dem der Check-in öffnet, etwa **„Der Check-in für diesen Gottesdienst öffnet So 9:30 Uhr.“** (Kann kein Öffnungszeitpunkt angezeigt werden, heißt es **„Der Check-in für diesen Gottesdienst ist gerade nicht geöffnet.“**) Tippen Sie auf **Zurück**, um zur Liste der Gottesdienste zurückzukehren und einen anderen Gottesdienst zu wählen, oder warten Sie, bis das Fenster öffnet, und versuchen Sie es erneut.

:::info
Check-in-Fenster richten sich nach der Zeitzone des Standorts des Gottesdienstes. Hat dieser Standort keine Zeitzone, gilt stattdessen die Zeitzone Ihrer Kirche. Öffnet eine Gottesdienstzeit scheinbar zur falschen Stunde, bitten Sie Ihre Administration, die Zeitzone in den Standort- oder Kircheneinstellungen zu prüfen. Auf dem Haushaltsbildschirm nutzt der Kiosk außerdem die Uhr des Tablets, um Gottesdienstzeiten zu öffnen und zu schließen. Achten Sie also darauf, dass das Tablet auf die richtige Uhrzeit und Zeitzone eingestellt ist.
:::

:::info
Gottesdienste werden von Ihrer Kirchenverwaltung in B1 Admin im Bereich Anwesenheit eingerichtet. Wenn Sie den erwarteten Gottesdienst nicht sehen, bitten Sie die Verwaltung zu prüfen, ob er im [Anwesenheits-Setup](../../b1-admin/attendance/setup.md) angelegt wurde.
:::

## Was im Hintergrund passiert

Wenn Sie einen Gottesdienst auswählen, ruft die App drei Dinge vom Server ab:

- die **Gottesdienstzeiten** dieses Gottesdienstes (zum Beispiel könnte ein einzelner Gottesdienst einen Slot um 9:00 Uhr und einen um 11:00 Uhr haben),
- die **Gruppen**, die zu jeder Gottesdienstzeit angeboten werden (zum Beispiel Krippe, Vorschule, Grundschule),
- die **Verknüpfungen von Gruppen und Gottesdienstzeiten**, die festlegen, welche Gruppen zu welchen Zeiten verfügbar sind.

Diese Daten werden lokal zwischengespeichert, damit der restliche Check-in-Ablauf schnell und reaktionsschnell ist.

:::tip
Ist für Ihre Kirche nur ein Gottesdienst eingerichtet, müssen Sie ihn trotzdem antippen, um fortzufahren. Die App wählt einen einzelnen Gottesdienst nicht automatisch aus.
:::

## Nächster Schritt

Nachdem Sie einen Gottesdienst ausgewählt haben, suchen Sie Ihre Familie [anhand der Telefonnummer oder des Namens](./looking-up-members).
