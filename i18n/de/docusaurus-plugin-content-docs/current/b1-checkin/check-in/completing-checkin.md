---
title: "Check-In abschließen"
---

# Check-In abschließen

<div class="article-intro">

Sobald Sie Ihren Haushalt überprüft und notwendige Gruppenzuweisungen getätigt haben, sind Sie bereit, den Check-In zu finalisieren. Dies ist der letzte Schritt im Kiosk-Workflow — die App sendet Anwesenheit, druckt Labels und setzt sich für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Überprüfen Sie Ihren Haushalt](./household-review) auf dem Haushalt-Überprüfungs-Bildschirm
- [Weisen Sie Gruppen](./group-assignment) zu jedem Familienmitglied zu, das sich in eine spezifische Klasse oder ein Programm einchecken muss
- [Fügen Sie optional Gäste](./adding-guests) hinzu, die mit Ihrer Familie zu Besuch sind

</div>

## Wie man sich eincheckt

1. Tippen Sie auf dem **Haushalt-Überprüfungs-Bildschirm** auf die Schaltfläche **Check-In** am unteren Bildschirmrand.
2. Die App sendet die Anwesenheitsdaten an den Server und zeigt einen **Erfolgs-Bildschirm** mit einem grünen Häkchen und einer Willkommensnachricht.

Das ist alles, was nötig ist. Die Anwesenheit Ihrer Familie wurde aufgezeichnet.

## Label-Druck

Wenn ein Netzwerk-Drucker konfiguriert ist, druckt die App nach dem Check-In automatisch Labels:

- **Name-Labels** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, die die **Nametag drucken**-Einstellung aktiviert hat. Name-Labels enthalten den Namen der Person, ihre Gruppen-Zuweisung und Allergie-/Notiz-Informationen, falls auf Datei vorhanden.
- **Eltern-Abhol-Slips** werden gedruckt, wenn jede eingecheckte Person in einer Gruppe ist, die die **Eltern-Abhol**-Einstellung aktiviert hat. Der Abhol-Slip listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen **4-Zeichen-Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Nametag des Kindes als auch auf dem Eltern-Abhol-Slip. Beim Abhol-Zeit koordinieren Freiwillige die Codes, um zu überprüfen, dass der richtige Erwachsene jedes Kind abholt.
:::

Der Sicherheitscode wird bei jedem Check-In frisch erstellt und verwendet nur Konsonanten und Ziffern (Vokale werden ausgeschlossen, um unangemessene Wörter zu vermeiden).

:::warning
Wenn Labels nicht drucken, öffnen Sie die Admin-Einstellungen, indem Sie siebenmal auf das **Kirchenlogo** tippen, dann tippen Sie auf **Drucker ändern**, um die Drucker-Verbindung zu überprüfen. Siehe [Drucker-Konfiguration](../getting-started/printer-setup) für Behebungs-Schritte.
:::

## Was nach dem Check-In passiert

- Wenn ein Drucker konfiguriert ist, druckt die App alle Labels und gibt automatisch zum **Nachschlage-Bildschirm** zurück, bereit für die nächste Familie.
- Wenn kein Drucker konfiguriert ist, zeigt der Erfolgs-Bildschirm für einige Sekunden an und gibt dann automatisch zum **Nachschlage-Bildschirm** zurück.

Sie müssen nicht auf dem Nachschlage-Bildschirm auf etwas klicken — die App verarbeitet den Übergang automatisch.

:::tip
Die App setzt sich nach jedem Check-In vollständig zurück, daher besteht kein Risiko, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was wird aufgezeichnet

Wenn Sie auf **Check-In** tippen, sendet die App das Folgende an den Server für jeden Haushalt-Mitglied, der eine Gruppen-Zuweisung hat:

- Die **Person**, die eingecheckt wird
- Der **Gottesdienst**, an dem sie teilnehmen
- Die **Gottesdienst-Zeit** und **Gruppe**, der sie zugewiesen sind

Diese Daten erscheinen in B1 Admin im Anwesenheits-Bereich, wo Ihre Kirchen-Administratoren Anwesenheit-Datensätze anzeigen und verwalten können. Siehe das [Check-In-Verwaltungs-Handbuch](../../b1-admin/attendance/check-in.md) für Details.
