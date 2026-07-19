---
title: "Check-In vervollständigen"
---

# Check-In vervollständigen

<div class="article-intro">

Sobald du deinen Haushalt überprüft und alle erforderlichen Gruppenzuweisungen vorgenommen hast, bist du bereit, das Check-In abzuschließen. Dies ist der letzte Schritt im Kiosk-Workflow – die App reicht die Anwesenheit ein, druckt Etiketten und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- [Überprüfe deinen Haushalt](./household-review) auf dem Haushalts-Überprüfungs-Bildschirm
- [Weise Gruppen](./group-assignment) jedem Familienmitglied zu, das in eine bestimmte Klasse oder ein Programm einchecken muss
- Optional [Füge Gäste hinzu](./adding-guests), die deine Familie besuchen

</div>

## Wie man eincheckt

1. Tippe vom **Haushalts-Überprüfungs-Bildschirm** auf die Schaltfläche **Check-In** unten auf dem Bildschirm.
2. Die App reicht die Anwesenheitsdaten auf dem Server ein und zeigt einen **Erfolgbildschirm** mit einem grünen Häkchen und einer Willkommensnachricht.

Das ist alles, was es braucht. Die Anwesenheit deiner Familie wurde aufgezeichnet.

## Volle Räume und Freiwilligenverhältnisse

Wenn deine Kirche [Sicherheitsgrenzen](../../b1-admin/attendance/checkin-safety) auf ihren Räumen konfiguriert hat, überprüft der Server diese vor dem Speichern:

- Wenn ein ausgewählter Raum **voll oder geschlossen** ist, wird das Check-In nicht durchgeführt und die App benennt den Raum, sodass du einen anderen auswählen kannst.
- Wenn einem Kinderraum **zu wenige Freiwillige** für sein Verhältnis fehlen, zeigt die App entweder eine Warnung, die ein Mitarbeiter bestätigen kann, um fortzufahren, oder blockiert das Check-In ganz – abhängig davon, wie deine Kirche die Verhältnis-Durchsetzung konfiguriert hat.

## Etikett-Druck

Wenn ein Netzwerkdrucker konfiguriert ist, druckt die App automatisch Etiketten nach dem Check-In:

- **Namensetiketten** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, die die Einstellung **Drucke Nametag** aktiviert hat. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuweisung und Allergie-/Notiz-Informationen, wenn vorhanden.
- **Eltern-Abhol-Quittungen** werden gedruckt, wenn eine eingecheckte Person in einer Gruppe ist, die die Einstellung **Eltern-Abholung** aktiviert hat. Die Abhol-Quittung listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen **4-stelligen Sicherheitscode** auf.

:::info
Der gleiche Sicherheitscode erscheint sowohl auf dem Namentag des Kindes als auch auf der Abhol-Quittung des Elternteils. Zum Abholzeitpunkt gleichen Freiwillige die Codes ab, um zu überprüfen, dass der richtige Erwachsene jedes Kind abholt.
:::

Der Sicherheitscode wird bei jedem Check-In neu generiert und verwendet nur Konsonanten und Ziffern (Vokale werden ausgeschlossen, um das Bilden unangemessener Wörter zu vermeiden).

:::warning
Wenn Etiketten nicht drucken, öffne die Admin-Einstellungen, indem du das **Kirchenlogo** siebenmal antippst, dann tippe auf **Drucker ändern**, um die Druckerverbindung zu überprüfen. Siehe [Drucker-Setup](../getting-started/printer-setup) für Fehlerbehebungsschritte.
:::

## Was nach dem Check-In passiert

- Wenn ein Drucker konfiguriert ist, druckt die App alle Etiketten und kehrt dann automatisch zum **Lookup-Bildschirm** zurück, bereit für die nächste Familie.
- Wenn kein Drucker konfiguriert ist, wird der Erfolgbildschirm ein paar Sekunden lang angezeigt und dann automatisch zum **Lookup-Bildschirm** zurückgekehrt.

Du brauchst nicht auf etwas zu tippen, um zum Lookup-Bildschirm zurückzukehren – die App übernimmt den Übergang automatisch.

:::tip
Die App wird nach jedem Check-In vollständig zurückgesetzt, sodass keine Risiko, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was wird aufgezeichnet

Wenn du auf **Check-In** tippst, sendet die App Folgendes an den Server für jedes Haushaltsmitglied, das eine Gruppenzuweisung hat:

- Die **Person**, die eingecheckt wird
- Der **Service**, den sie besucht
- Die **Servicezeit** und die **Gruppe**, denen sie zugewiesen ist

Diese Daten erscheinen in B1 Admin unter dem Bereich "Anwesenheit", in dem deine Kirchenverwalter Anwesenheitsdatensätze anzeigen und verwalten können. Siehe den [Check-In-Verwaltungs-Leitfaden](../../b1-admin/attendance/check-in.md) für Details.
