---
title: "Check-in abschliessen"
---

# Check-in abschliessen

<div class="article-intro">

Sobald Sie Ihren Haushalt ueberprueft und alle notwendigen Gruppenzuweisungen vorgenommen haben, sind Sie bereit, den Check-in abzuschliessen. Dies ist der letzte Schritt im Kiosk-Workflow -- die App uebermittelt die Anwesenheit, druckt Etiketten und setzt sich fuer die naechste Familie zurueck.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ueberpruefen Sie Ihren Haushalt auf dem Haushaltsuebersicht-Bildschirm
- Weisen Sie allen Familienmitgliedern, die sich in eine bestimmte Klasse oder ein Programm einchecken muessen, Gruppen zu
- Fuegen Sie optional Gaeste hinzu, die mit Ihrer Familie zu Besuch sind

</div>

## So checken Sie ein

1. Tippen Sie auf dem Haushaltsuebersicht-Bildschirm unten auf die Schaltflaeche Check-in.
2. Die App uebermittelt die Anwesenheitsdaten an den Server und zeigt einen Erfolgsbildschirm mit einem gruenen Haekchen und einer Willkommensnachricht an.

Das ist alles, was noetig ist. Die Anwesenheit Ihrer Familie wurde erfasst.

## Volle Raeume und Freiwilligenverhaeltnisse

Wenn Ihre Kirche Sicherheitsgrenzen fuer ihre Raeume konfiguriert hat, prueft der Server diese vor dem Speichern:

- Wenn ein ausgewaehlter Raum voll oder geschlossen ist, geht der Check-in nicht durch, und die App nennt den Raum, damit Sie einen anderen waehlen koennen.
- Wenn einem Kinderraum Freiwillige fuer sein Verhaeltnis fehlen, zeigt die App entweder eine Warnung an, die ein Mitarbeiter bestaetigen kann, um fortzufahren, oder blockiert den Check-in vollstaendig -- abhaengig davon, wie Ihre Kirche die Durchsetzung des Verhaeltnisses konfiguriert hat.

## Etikettendruck

Wenn ein Netzwerkdrucker konfiguriert ist, druckt die App nach dem Check-in automatisch Etiketten:

- Namensetiketten werden fuer jede Person gedruckt, die einer Gruppe zugewiesen ist, bei der die Einstellung Namensschild drucken aktiviert ist. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuweisung und Allergie-/Hinweisinformationen, falls vorhanden.
- Abholzettel fuer Eltern werden gedruckt, wenn eine eingecheckte Person in einer Gruppe ist, bei der die Einstellung Elternabholung aktiviert ist. Der Abholzettel listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen 4-stelligen Sicherheitscode auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Namensetikett des Kindes als auch auf dem Abholzettel der Eltern. Bei der Abholung gleichen Freiwillige die Codes ab, um zu bestaetigen, dass die richtige erwachsene Person das jeweilige Kind abholt.
:::

Der Sicherheitscode wird fuer jeden Check-in neu generiert und verwendet nur Konsonanten und Ziffern (Vokale sind ausgeschlossen, um die Bildung unangemessener Woerter zu vermeiden).

:::warning
Wenn Etiketten nicht gedruckt werden, oeffnen Sie die Admin-Einstellungen, indem Sie siebenmal auf das Kirchenlogo tippen, und tippen Sie dann auf Drucker aendern, um die Druckerverbindung zu ueberpruefen. Siehe Druckereinrichtung fuer Schritte zur Fehlerbehebung.
:::

## Was nach dem Check-in passiert

- Wenn ein Drucker konfiguriert ist, druckt die App alle Etiketten und kehrt dann automatisch zum Suchbildschirm zurueck, bereit fuer die naechste Familie.
- Wenn kein Drucker konfiguriert ist, wird der Erfolgsbildschirm einige Sekunden lang angezeigt und kehrt dann automatisch zum Suchbildschirm zurueck.

Sie muessen nichts antippen, um zum Suchbildschirm zurueckzukehren -- die App uebernimmt den Uebergang automatisch.

:::tip
Die App setzt sich nach jedem Check-in vollstaendig zurueck, sodass keine Gefahr besteht, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was erfasst wird

Wenn Sie auf Check-in tippen, sendet die App fuer jedes Haushaltsmitglied mit einer Gruppenzuweisung Folgendes an den Server:

- Die Person, die eingecheckt wird
- Den Gottesdienst, den sie besucht
- Die Gottesdienstzeit und Gruppe, der sie zugewiesen ist

Diese Daten erscheinen in B1 Admin im Bereich Anwesenheit, wo die Administratoren Ihrer Kirche Anwesenheitsdatensaetze anzeigen und verwalten koennen. Details finden Sie in der Anleitung zur Verwaltung des Check-ins.
