---
title: "Gottesdienst auswählen"
---

# Gottesdienst auswählen

<div class="article-intro">

Der erste Schritt jedes Check-ins ist die Auswahl des Gottesdienstes, den Sie besuchen. Der Gottesdienstbildschirm erscheint direkt nach dem Laden der App und legt fest, welche Gottesdienstzeiten und Gruppen für den restlichen Check-in-Ablauf verfügbar sind.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Melden Sie sich an](../getting-started/logging-in) bei der App B1 Church Checkin an und wählen Sie Ihre Gemeinde aus.
- Stellen Sie sicher, dass Ihr Gemeindeadministrator [Gottesdienste und Gottesdienstzeiten konfiguriert](../../b1-admin/attendance/setup.md) hat, in B1 Admin.

</div>

## So funktioniert es

1. Nach der Anmeldung (oder nach der automatischen Anmeldung bei späteren Besuchen) zeigt die App den **Gottesdienstbildschirm**.
2. Sie sehen eine Liste aller Gottesdienste, die für Ihre Gemeinde eingerichtet wurden. Jeder Gottesdienst erscheint als Karte mit dem Namen des Gottesdienstes (zum Beispiel „Sonntagmorgen“ oder „Mittwochabend“).
3. Tippen Sie auf den Gottesdienst, den Sie besuchen.

Die App lädt die Gottesdienstzeiten und Gruppen, die diesem Gottesdienst zugeordnet sind, und bringt Sie dann zum [Suchbildschirm für Gemeindemitglieder](./looking-up-members).

## Wenn der Check-in nicht geöffnet ist

Hat Ihr Administrator einer Gottesdienstzeit einen [Check-in-Zeitplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) zugewiesen, lässt die App Familien diese Gottesdienstzeit nur auswählen, während ihr Check-in-Fenster geöffnet ist. Gottesdienstzeiten, deren Fenster gerade geschlossen ist, werden weiterhin auf dem [Haushaltsbildschirm](./household-review) angezeigt. Sie sind jedoch als **Geschlossen** markiert (zum Beispiel **Geschlossen · öffnet So 9:30 Uhr**) und bieten keine Gruppenschaltfläche an.

Sind alle Gottesdienstzeiten des von Ihnen angetippten Gottesdienstes geschlossen, teilt Ihnen die App mit, wann der Check-in öffnet – zum Beispiel **„Der Check-in für diesen Gottesdienst öffnet So 9:30 Uhr.“**. (Kann kein Öffnungszeitpunkt angezeigt werden, lautet die Meldung **„Der Check-in für diesen Gottesdienst ist derzeit nicht geöffnet.“**) Tippen Sie auf **Zurück**, um zur Gottesdienstliste zurückzukehren und einen anderen Gottesdienst zu wählen, oder warten Sie, bis das Fenster öffnet, und versuchen Sie es erneut.

:::info
Check-in-Fenster richten sich nach der Zeitzone des Standorts des Gottesdienstes. Ist für diesen Standort keine Zeitzone hinterlegt, wird stattdessen die Zeitzone Ihrer Gemeinde verwendet. Öffnet eine Gottesdienstzeit zur falschen Stunde, bitten Sie Ihren Administrator, die Zeitzone in den Standort- oder Gemeindeeinstellungen zu prüfen. Auf dem Haushaltsbildschirm verwendet der Kiosk außerdem die Uhr des Tablets, um Gottesdienstzeiten zu öffnen und zu schließen. Achten Sie daher darauf, dass das Tablet die richtige Uhrzeit und Zeitzone hat.
:::

:::info
Gottesdienste werden von Ihrem Gemeindeadministrator in B1 Admin im Bereich Anwesenheit eingerichtet. Wenn Sie den erwarteten Gottesdienst nicht sehen, bitten Sie Ihren Administrator zu prüfen, ob er in der [Einrichtung der Anwesenheit](../../b1-admin/attendance/setup.md) angelegt wurde.
:::

## Was im Hintergrund geschieht

Wenn Sie einen Gottesdienst auswählen, ruft die App drei Dinge vom Server ab:

- Die **Gottesdienstzeiten** dieses Gottesdienstes (ein einzelner Gottesdienst kann zum Beispiel einen Zeitblock um 9:00 Uhr und einen um 11:00 Uhr haben).
- Die **Gruppen**, die zu jeder Gottesdienstzeit verfügbar sind (zum Beispiel Krippe, Vorschule, Grundschule).
- Die **Verknüpfungen von Gruppen und Gottesdienstzeiten**, die festlegen, welche Gruppen zu welchen Zeiten verfügbar sind.

Diese Daten werden lokal zwischengespeichert, damit der restliche Check-in-Ablauf schnell und reaktionsschnell bleibt.

:::tip
Ist für Ihre Gemeinde nur ein Gottesdienst eingerichtet, müssen Sie ihn trotzdem antippen, um fortzufahren. Die App wählt einen einzelnen Gottesdienst nicht automatisch aus.
:::

## Nächster Schritt

Nach der Auswahl eines Gottesdienstes suchen Sie Ihre Familie [anhand der Telefonnummer oder des Namens](./looking-up-members).
