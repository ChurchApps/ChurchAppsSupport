---
title: "Einchecken abschließen"
---

# Einchecken abschließen

<div class="article-intro">

Nachdem Sie Ihren Haushalt überprüft und alle notwendigen Gruppenzuweisungen vorgenommen haben, sind Sie bereit, das Einchecken zu finalisieren. Dies ist der letzte Schritt im Kiosk-Workflow -- die App sendet Anwesenheit, druckt Etiketten und setzt für die nächste Familie zurück.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- [Überprüfen Sie Ihren Haushalt](./household-review) auf der Haushalts-Überprüfungsseite
- [Weisen Sie Gruppen zu](./group-assignment) zu Familienmitgliedern, die sich in eine bestimmte Klasse oder ein bestimmtes Programm einchecken müssen
- Optional [fügen Sie alle Gäste hinzu](./adding-guests), die Ihre Familie besuchen

</div>

## Wie man sich einloggt

1. Tippen Sie von der **Haushalts-Überprüfungsseite** auf die Schaltfläche **Einchecken** am unteren Ende des Bildschirms.
2. Die App sendet die Anwesenheitsdaten an den Server und zeigt einen **Erfolgreiches-Bildschirm** mit einem grünen Häkchen und einer Willkommensnachricht.

Das ist alles, was nötig ist. Die Anwesenheit Ihrer Familie wurde aufgezeichnet.

## Volle Räume und Freiwilligenquoten

Wenn Ihre Kirche [Sicherheitsgrenzen](../../b1-admin/attendance/checkin-safety) für ihre Räume konfiguriert hat, überprüft der Server sie vor dem Speichern:

- Wenn ein gewählter Raum **voll oder geschlossen** ist, wird das Einchecken nicht durchgeführt und die App nennt den Raum, damit Sie einen anderen wählen können.
- Wenn ein Kinderraum **wenig Freiwillige** für sein Verhältnis hat, zeigt die App entweder eine Warnung an, die ein Mitarbeiter bestätigen kann, um fortzufahren, oder blockiert das Einchecken vollständig -- je nachdem, wie Ihre Kirche die Verhältnisverordnung konfiguriert hat.

## Etikett-Druck

Wenn ein Netzwerkdrucker konfiguriert ist, druckt die App nach dem Einchecken automatisch Etiketten:

- **Namensetiketten** werden für jede Person gedruckt, die einer Gruppe zugewiesen ist, die die Einstellung **Namensschilddruck** aktiviert hat. Namensetiketten enthalten den Namen der Person, die Gruppenzuweisung und Allergie-/Notiz-Informationen, falls vorhanden.
- **Abholscheine für Eltern** werden gedruckt, wenn eine eingecheckte Person in einer Gruppe ist, die die Einstellung **Elterliche Abholung** aktiviert hat. Der Abholschein listet die Kinder, ihre Gruppenzuweisungen und einen eindeutigen **4-stelligen Sicherheitscode** auf.

:::info
Derselbe Sicherheitscode wird sowohl auf dem Namensschildetikett des Kindes als auch auf dem Abholschein des Elternteils angezeigt. Zum Zeitpunkt der Abholung passen Freiwillige die Codes ab, um zu überprüfen, dass der richtige Erwachsene jedes Kind abholt.
:::

Der Sicherheitscode wird bei jedem Einchecken neu generiert und verwendet nur Konsonanten und Ziffern (Vokale werden ausgeschlossen, um unangemessene Wörter zu vermeiden).

:::warning
Wenn die Etiketten nicht gedruckt werden, öffnen Sie die Admin-Einstellungen, indem Sie siebenmal auf das **Kirchenlogo** tippen, und tippen Sie auf **Drucker ändern**, um die Druckerverbindung zu überprüfen. Siehe [Drucker-Einrichtung](../getting-started/printer-setup) für Fehlerbehebungsschritte.
:::

## Was nach dem Einchecken passiert

- Wenn ein Drucker konfiguriert ist, druckt die App alle Etiketten und kehrt dann automatisch zum **Suchbildschirm** zurück, bereit für die nächste Familie.
- Wenn kein Drucker konfiguriert ist, wird der Erfolgreiches-Bildschirm einige Sekunden lang angezeigt und kehrt dann automatisch zum **Suchbildschirm** zurück.

Sie müssen nichts tippen, um zum Suchbildschirm zurückzukehren -- die App handhabt den Übergang automatisch.

:::tip
Die App setzt sich nach jedem Einchecken vollständig zurück, daher besteht kein Risiko, dass eine Familie die Informationen einer anderen Familie sieht.
:::

## Was aufgezeichnet wird

Wenn Sie auf **Einchecken** tippen, sendet die App den folgenden Inhalt an den Server für jedes Haushalts-Mitglied, das eine Gruppenzuweisung hat:

- Die **Person**, die eingecheckt wird
- Der **Gottesdienst**, an dem sie teilnehmen
- Die **Servicezeit** und **Gruppe**, der sie zugewiesen sind

Diese Daten werden in B1 Admin unter dem Anwesenheitsbereich angezeigt, wo Ihre Kirchenadministratoren Anwesenheitsdatensätze anzeigen und verwalten können. Siehe den [Einchecken-Verwaltungsleitfaden](../../b1-admin/attendance/check-in.md) für Details.
