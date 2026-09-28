---
title: "Check-In abschließen"
---

# Check-In abschließen

<div class="article-intro">

Nachdem du deine Familie überprüft hast und die erforderlichen Gruppenzuweisungen vorgenommen hast, bist du bereit, das Check-In abzuschließen. Dies ist der letzte Schritt im Kiosk-Workflow – die App sendet Anwesenheit, druckt Etiketten und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor du anfängst</h4>

- [Überprüfe deine Familie](./household-review) auf dem Bildschirm zur Familienüberprüfung
- [Weise Gruppen](./group-assignment) den Familienmitgliedern zu, die sich in einer bestimmten Klasse oder einem bestimmten Programm anmelden müssen
- Füge optional [Gäste hinzu](./adding-guests), die deine Familie besuchen

</div>

## Wie du dich anmeldest

1. Tippe auf dem **Bildschirm zur Haushaltsüberprüfung** auf die Schaltfläche **Check-In** am unteren Ende des Bildschirms.
2. Die App sendet die Anwesenheitsdaten an den Server und zeigt einen **Erfolgreichbildschirm** mit einem grünen Häkchen und einer Willkommensnachricht.

Das ist alles, was erforderlich ist. Die Anwesenheit deiner Familie wurde aufgezeichnet.

## Volle Zimmer und Freiwilligen-Verhältnisse

Wenn deine Kirche [Sicherheitsgrenzen](../../b1-admin/attendance/checkin-safety) für ihre Zimmer konfiguriert hat, überprüft der Server sie vor dem Speichern:

- Wenn ein ausgewähltes Zimmer **voll oder geschlossen** ist, wird das Check-In nicht durchgeführt und die App nennt das Zimmer, damit du ein anderes auswählen kannst.
- Wenn ein Kinderzimmer **zu wenige Freiwillige** für sein Verhältnis hat, zeigt die App entweder eine Warnung an, die ein Mitarbeiter bestätigen kann, um fortzufahren, oder blockiert das Check-In vollständig – abhängig davon, wie deine Kirche die Durchsetzung des Verhältnisses konfiguriert hat.

## Etikettendruck

Wenn ein Netzwerkdrucker konfiguriert ist, druckt die App automatisch Etiketten nach dem Check-In:

- **Namensetiketten** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, bei der die Einstellung **Namensschild drucken** aktiviert ist. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuweisung und Allergie-/Notizenformationen, falls vorhanden.
- **Eltern-Abholscheine** werden gedruckt, wenn eine eingecheckte Person sich in einer Gruppe befindet, bei der die Einstellung **Eltern-Abholung** aktiviert ist. Personen, die sich als **Freiwilliger** anmelden, werden übersprungen, daher erhält ein Kinderbetreuer, der in einem Eltern-Abholzimmer dient, keinen Abholschein. Der Abholschein listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen **4-stelligen Sicherheitscode** auf.

:::info
Der gleiche Sicherheitscode erscheint sowohl auf dem Namensschildchen des Kindes als auch auf dem Abholschein des Elternteils. Bei der Abholung entsprechen Freiwillige die Codes, um zu überprüfen, dass der richtige Erwachsene jedes Kind abholt.
:::

Der Sicherheitscode wird für jeden Check-In neu generiert und verwendet nur Konsonanten und Ziffern (Vokale sind ausgeschlossen, um unangemessene Worte zu vermeiden).

:::warning
Wenn Etiketten nicht gedruckt werden, öffne die Admin-Einstellungen, indem du das **Kirchenlogo** siebenmal tippst, und tippe dann auf **Drucker ändern**, um die Druckerverbindung zu überprüfen. Siehe [Drucker-Setup](../getting-started/printer-setup) für Fehlerbehebungsschritte.
:::

## Was nach dem Check-In geschieht

- Wenn ein Drucker konfiguriert ist, druckt die App alle Etiketten und kehrt dann automatisch zum **Suchbildschirm** zurück, bereit für die nächste Familie.
- Wenn kein Drucker konfiguriert ist, wird der Erfolgreichbildschirm ein paar Sekunden lang angezeigt und kehrt dann automatisch zum **Suchbildschirm** zurück.

Du musst nichts tippen, um zum Suchbildschirm zurückzukehren – die App übernimmt den Übergang automatisch.

:::tip
Die App wird nach jedem Check-In vollständig zurückgesetzt, sodass es kein Risiko gibt, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was wird aufgezeichnet

Wenn du auf **Check-In** tippst, sendet die App folgende Informationen an den Server für jedes Haushaltsmitglied, das einer Gruppenzuweisung hat:

- Die **Person**, die sich anmeldet
- Den **Dienst**, den sie besucht
- Die **Dienstzeit** und **Gruppe**, denen sie zugewiesen ist

Diese Daten erscheinen in B1 Admin im Abschnitt Anwesenheit, wo deine Kirchenadministratoren Anwesenheitsdatensätze anzeigen und verwalten können. Weitere Details findest du im [Check-In-Administrations-Leitfaden](../../b1-admin/attendance/check-in.md).
