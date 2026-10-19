---
title: "Gottesdienst auswählen"
---

# Gottesdienst auswählen

<div class="article-intro">

Der erste Schritt jedes Check-ins ist die Auswahl des Gottesdienstes, den Sie besuchen. Der Bildschirm mit den Gottesdiensten erscheint direkt nach dem Laden der App und bestimmt, welche Gottesdienstzeiten und Gruppen für den restlichen Check-in-Ablauf verfügbar sind.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Melden Sie sich an](../getting-started/logging-in) bei der App B1 Church Checkin an und wählen Sie Ihre Gemeinde aus
- Stellen Sie sicher, dass Ihr Gemeindeadministrator [Gottesdienste und Gottesdienstzeiten eingerichtet](../../b1-admin/attendance/setup.md) hat, und zwar in B1 Admin

</div>

## So funktioniert es

1. Nach der Anmeldung (oder nach der automatischen Anmeldung bei späteren Besuchen) zeigt die App den **Bildschirm mit den Gottesdiensten**.
2. Sie sehen eine Liste aller Gottesdienste, die für Ihre Gemeinde eingerichtet wurden. Jeder Gottesdienst erscheint als Karte mit dem Namen des Gottesdienstes (zum Beispiel „Sonntagmorgen“ oder „Mittwochabend“).
3. Tippen Sie auf den Gottesdienst, den Sie besuchen.

Die App lädt die Gottesdienstzeiten und Gruppen, die mit diesem Gottesdienst verbunden sind, und öffnet anschließend den [Bildschirm zur Personensuche](./looking-up-members).

## Wenn der Check-in nicht geöffnet ist {#when-check-in-isnt-open}

Hat Ihr Administrator einer Gottesdienstzeit einen [Check-in-Zeitplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) zugewiesen, bietet die App diese Gottesdienstzeit nur an, solange ihr Check-in-Fenster geöffnet ist. Gottesdienstzeiten, deren Fenster gerade geschlossen ist, werden ausgeblendet, damit Familien sie später im Ablauf nicht auswählen können.

Wenn für den von Ihnen gewählten Gottesdienst alle Gottesdienstzeiten geschlossen sind, zeigt die App die Meldung **„Der Check-in ist für diesen Gottesdienst im Moment nicht geöffnet.“** Tippen Sie auf **Zurück**, um zur Liste der Gottesdienste zurückzukehren und einen anderen Gottesdienst zu wählen, oder warten Sie, bis das Fenster öffnet, und versuchen Sie es erneut.

:::info
Check-in-Fenster richten sich nach der Zeitzone Ihrer Gemeinde. Wenn für Ihre Gemeinde keine Zeitzone festgelegt ist, wird stattdessen die Zeitzone Ihres Standorts verwendet. Öffnet eine Gottesdienstzeit zur falschen Uhrzeit, bitten Sie Ihren Administrator, die Zeitzone in den Einstellungen Ihrer Gemeinde oder Ihres Standorts zu prüfen.
:::

:::info
Gottesdienste werden von Ihrem Gemeindeadministrator in B1 Admin im Bereich Anwesenheit eingerichtet. Wenn Sie den erwarteten Gottesdienst nicht sehen, bitten Sie Ihren Administrator, zu prüfen, ob er in der [Anwesenheitseinrichtung](../../b1-admin/attendance/setup.md) angelegt wurde.
:::

## Was im Hintergrund passiert

Wenn Sie einen Gottesdienst auswählen, ruft die App drei Dinge vom Server ab:

- Die **Gottesdienstzeiten** dieses Gottesdienstes (zum Beispiel könnte ein Gottesdienst einen Zeitblock um 9:00 Uhr und einen um 11:00 Uhr haben).
- Die **Gruppen**, die zu jeder Gottesdienstzeit verfügbar sind (zum Beispiel Krabbelgruppe, Vorschule, Grundschule).
- Die **Verknüpfungen zwischen Gruppen und Gottesdienstzeiten**, die festlegen, welche Gruppen zu welchen Zeiten verfügbar sind.

Diese Daten werden lokal zwischengespeichert, damit der restliche Check-in-Vorgang schnell und reaktionsfreudig bleibt.

:::tip
Wenn Ihre Gemeinde nur einen Gottesdienst eingerichtet hat, müssen Sie ihn trotzdem antippen, um fortzufahren. Die App wählt einen einzelnen Gottesdienst nicht automatisch aus.
:::

## Nächster Schritt

Nach der Auswahl eines Gottesdienstes suchen Sie Ihre Familie [nach Telefonnummer oder Namen](./looking-up-members).
