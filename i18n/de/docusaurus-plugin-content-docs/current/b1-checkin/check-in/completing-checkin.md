---
title: "Check-In abschließen"
---

# Check-In abschließen

<div class="article-intro">

Sobald Sie Ihren Haushalt überprüft und die nötigen Gruppenzuweisungen vorgenommen haben, sind Sie bereit, den Check-In abzuschließen. Dies ist der letzte Schritt im Kiosk-Ablauf -- die App übermittelt die Anwesenheit, druckt Etiketten und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Überprüfen Sie Ihren Haushalt](./household-review) auf dem Bildschirm zur Haushaltsübersicht
- [Weisen Sie Gruppen zu](./group-assignment) für alle Familienmitglieder, die sich für eine bestimmte Klasse oder ein bestimmtes Programm einchecken müssen
- Optional können Sie [Gäste hinzufügen](./adding-guests), die Ihre Familie begleiten

</div>

## So checken Sie ein

1. Tippen Sie auf dem **Bildschirm zur Haushaltsübersicht** unten auf die Schaltfläche **Check-in**.
2. Die App übermittelt die Anwesenheitsdaten an den Server und zeigt einen **Erfolgsbildschirm** mit einem grünen Häkchen und einer Willkommensnachricht an.

Das ist bereits alles. Die Anwesenheit Ihrer Familie wurde erfasst.

## Volle Räume und Betreuerverhältnisse

Wenn Ihre Kirche [Sicherheitsgrenzwerte](../../b1-admin/attendance/checkin-safety) für ihre Räume konfiguriert hat, prüft der Server diese vor dem Speichern:

- Wenn ein ausgewählter Raum **voll oder geschlossen** ist, wird der Check-in nicht durchgeführt, und die App nennt den Raum, damit Sie einen anderen auswählen können.
- Wenn in einem Kinderraum **zu wenige Betreuer** für das festgelegte Verhältnis vorhanden sind, zeigt die App entweder eine Warnung an, die ein Mitarbeiter bestätigen kann, um fortzufahren, oder blockiert den Check-in vollständig -- je nachdem, wie Ihre Kirche die Durchsetzung des Verhältnisses konfiguriert hat.

## Etikettendruck

Wenn ein Netzwerkdrucker konfiguriert ist, druckt die App nach dem Check-in automatisch Etiketten:

- **Namensetiketten** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, bei der die Einstellung **Namensschild drucken** aktiviert ist. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuweisung sowie Allergie-/Hinweisinformationen, falls vorhanden.
- **Abholzettel für Eltern** werden gedruckt, wenn eine eingecheckte Person einer Gruppe zugewiesen ist, bei der die Einstellung **Abholung durch Eltern** aktiviert ist. Der Abholzettel listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen **4-stelligen Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Namensetikett des Kindes als auch auf dem Abholzettel der Eltern. Bei der Abholung gleichen Mitarbeiter die Codes ab, um zu überprüfen, dass die richtige erwachsene Person das jeweilige Kind abholt.
:::

Der Sicherheitscode wird für jeden Check-in neu generiert und verwendet nur Konsonanten und Ziffern (Vokale werden ausgeschlossen, um unangemessene Wörter zu vermeiden).

:::warning
Wenn Etiketten nicht gedruckt werden, öffnen Sie die Admin-Einstellungen, indem Sie siebenmal auf das **Kirchenlogo** tippen, und tippen Sie dann auf **Drucker wechseln**, um die Druckerverbindung zu überprüfen. Siehe [Druckereinrichtung](../getting-started/printer-setup) für Schritte zur Fehlerbehebung.
:::

## Was nach dem Check-in geschieht

- Wenn ein Drucker konfiguriert ist, druckt die App alle Etiketten und kehrt dann automatisch zum **Suchbildschirm** zurück, bereit für die nächste Familie.
- Wenn kein Drucker konfiguriert ist, wird der Erfolgsbildschirm einige Sekunden lang angezeigt und kehrt dann automatisch zum **Suchbildschirm** zurück.

Sie müssen nichts antippen, um zum Suchbildschirm zurückzukehren -- die App übernimmt den Übergang automatisch.

:::tip
Die App wird nach jedem Check-in vollständig zurückgesetzt, sodass keine Gefahr besteht, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was aufgezeichnet wird

Wenn Sie auf **Check-in** tippen, sendet die App für jedes Haushaltsmitglied mit einer Gruppenzuweisung Folgendes an den Server:

- Die **Person**, die eingecheckt wird
- Den **Gottesdienst**, den sie besucht
- Die **Gottesdienstzeit** und die **Gruppe**, der sie zugewiesen ist

Diese Daten erscheinen in B1 Admin im Bereich Anwesenheit, wo die Verwalter Ihrer Kirche Anwesenheitsdatensätze einsehen und verwalten können. Siehe den [Leitfaden zur Check-in-Verwaltung](../../b1-admin/attendance/check-in.md) für Details.
