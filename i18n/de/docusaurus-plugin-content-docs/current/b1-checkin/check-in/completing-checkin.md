---
title: "Check-in abschliessen"
---

# Check-in abschliessen

<div class="article-intro">

Sobald Sie Ihren Haushalt ueberprueft und alle notwendigen Gruppenzuweisungen vorgenommen haben, koennen Sie den Check-in abschliessen. Dies ist der letzte Schritt im Kiosk-Ablauf -- die App uebermittelt die Anwesenheit, druckt Etiketten und setzt sich fuer die naechste Familie zurueck.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Ueberpruefen Sie Ihren Haushalt](./household-review) auf dem Haushaltsuebersichts-Bildschirm
- [Weisen Sie Gruppen zu](./group-assignment) fuer alle Familienmitglieder, die in eine bestimmte Klasse oder ein Programm einchecken muessen
- Optional: [Fuegen Sie Gaeste hinzu](./adding-guests), die mit Ihrer Familie zu Besuch sind

</div>

## So checken Sie ein

1. Tippen Sie auf dem **Haushaltsuebersichts-Bildschirm** auf die Schaltflaeche **Check-in** am unteren Bildschirmrand.
2. Die App uebermittelt die Anwesenheitsdaten an den Server und zeigt einen **Erfolgsbildschirm** mit einem gruenen Haekchen und einer Willkommensnachricht an.

Das ist alles. Die Anwesenheit Ihrer Familie wurde erfasst.

## Etikettendruck

Wenn ein Netzwerkdrucker konfiguriert ist, druckt die App nach dem Check-in automatisch Etiketten:

- **Namensetiketten** werden fuer jede Person gedruckt, die einer Gruppe zugewiesen ist, bei der die Einstellung **Print Nametag** aktiviert ist. Namensetiketten enthalten den Namen der Person, ihre Gruppenzuweisung und gegebenenfalls Allergie-/Hinweisinformationen.
- **Abholscheine fuer Eltern** werden gedruckt, wenn eine eingecheckte Person in einer Gruppe ist, bei der die Einstellung **Parent Pickup** aktiviert ist. Der Abholschein listet die Kinder, ihre Gruppenzuweisungen und einen einzigartigen **4-stelligen Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode erscheint sowohl auf dem Namensetikett des Kindes als auch auf dem Abholschein der Eltern. Bei der Abholung gleichen Ehrenamtliche die Codes ab, um sicherzustellen, dass die richtige erwachsene Person jedes Kind abholt.
:::

Der Sicherheitscode wird bei jedem Check-in neu generiert und verwendet nur Konsonanten und Ziffern (Vokale werden ausgeschlossen, um die Bildung ungeeigneter Woerter zu vermeiden).

:::warning
Wenn keine Etiketten gedruckt werden, ueberpruefen Sie die Drucker-Statusleiste am oberen Bildschirmrand. Tippen Sie darauf, um die Druckereinstellungen aufzurufen und die Verbindung zu ueberpruefen. Siehe [Druckereinrichtung](../getting-started/printer-setup) fuer Schritte zur Fehlerbehebung.
:::

## Was nach dem Check-in passiert

- Wenn ein Drucker konfiguriert ist, druckt die App alle Etiketten und kehrt dann automatisch zum **Such-Bildschirm** zurueck, bereit fuer die naechste Familie.
- Wenn kein Drucker konfiguriert ist, wird der Erfolgsbildschirm einige Sekunden lang angezeigt und kehrt dann automatisch zum **Such-Bildschirm** zurueck.

Sie muessen nichts antippen, um zum Such-Bildschirm zurueckzukehren -- die App uebernimmt den Uebergang automatisch.

:::tip
Die App setzt sich nach jedem Check-in vollstaendig zurueck, sodass keine Gefahr besteht, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was erfasst wird

Wenn Sie auf **Check-in** tippen, sendet die App fuer jedes Haushaltsmitglied mit einer Gruppenzuweisung folgende Daten an den Server:

- Die **Person**, die eingecheckt wird
- Der **Gottesdienst**, an dem sie teilnimmt
- Die **Gottesdienstzeit** und **Gruppe**, der sie zugewiesen ist

Diese Daten erscheinen in B1 Admin im Bereich Anwesenheit, wo Ihre Gemeinde-Administratoren Anwesenheitsdatensaetze einsehen und verwalten koennen. Weitere Informationen finden Sie in der [Anleitung zur Check-in-Verwaltung](../../b1-admin/attendance/check-in.md).
