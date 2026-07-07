---
title: "Verfügbarkeitkalender"
---

# Verfügbarkeitkalender

<div class="article-intro">

Der Verfügbarkeitkalender gibt Ihnen einen Überblick über alle Raum- und Ressourcenbuchungen in Ihrer Gemeinde. Von hier aus können Sie sehen, was geplant ist, Konflikte erkennen, bevor sie auftreten, und einen Raum oder eine Ressource für ein beliebiges Ereignis direkt buchen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie mindestens einen [Raum oder eine Ressource](rooms-resources) im Bereich Räume & Ressourcen ein
- Sie benötigen Bearbeitungszugriff auf den Bereich Kalender in B1 Admin

</div>

## Öffnen des Verfügbarkeitkalenders

Gehen Sie in B1 Admin zu **Kalender** und wählen Sie **Verfügbarkeit** aus der Seitenleiste.

## Kalender lesen

Der Kalender zeigt standardmäßig den aktuellen Monat an. Sie können mit den Pfeilen oben vorwärts und rückwärts navigieren oder zwischen Monats-, Wochen- und Tagesansichten wechseln.

Jede Veranstaltung ist farbcodiert nach Buchungsstatus:

| Farbe | Bedeutung |
|-------|-----------|
| Grün | Genehmigt |
| Orange | Genehmigung ausstehend |
| Grau | Blockiert (nicht verfügbar) |

Wenn Sie mit der Maus über eine Veranstaltung fahren, werden der Titel der Veranstaltung und der Raum oder die Ressource, an die sie angebunden ist, angezeigt.

## Nach Raum oder Ressource filtern

Verwenden Sie das Dropdown **Filter** oben links, um den Kalender auf einen einzelnen Raum oder eine Ressource einzugrenzen. Wählen Sie **Alle Räume & Ressourcen**, um zur vollständigen Ansicht zurückzukehren.

## Einen Raum oder eine Ressource buchen

1. Klicken Sie auf die Schaltfläche **Buchen** in der oberen rechten Ecke der Seite.
2. Füllen Sie im Dialogfeld die Veranstaltungsdetails aus:
   - **Titel** — der Name der Veranstaltung
   - **Start**- und **End**-Datum/Uhrzeit
   - **Sichtbarkeit** — Öffentlich oder Privat
   - **Räume** — wählen Sie einen oder mehrere Räume zum Reservieren
   - **Ressourcen** — wählen Sie eine oder mehrere Ressourcen zum Reservieren
3. Legen Sie optional **Aufbau**- und **Abbau**-Zeiten fest (in Minuten). Diese erweitern die Buchung auf beiden Seiten, damit der Raum für Auf- und Abbau reserviert ist, auch wenn die Ereignis-Start-/End-Zeiten gleich bleiben.
4. Um die Buchung zu wiederholen, aktivieren Sie **Wiederholt** und konfigurieren Sie die Wiederholung:
   - **Wiederhole jeden** -- legen Sie das Intervall fest (z. B. alle 2 Wochen).
   - **Häufigkeit** -- Täglich, Wöchentlich oder Monatlich. Wöchentlich können Sie bestimmte Wochentage auswählen; monatlich können Sie einen festen Monatstag oder ein relatives Muster wie „den zweiten Dienstag" auswählen.
   - **Endet** -- Nie, an einem bestimmten Datum oder nach einer bestimmten Anzahl von Vorkommen.
5. Um ein benutzerdefiniertes Buchungsfenster (unterschiedlich von der Ereignis-Start/End-Zeit) anzugeben, aktivieren Sie **Benutzerdefiniertes Buchungsfenster** und geben Sie die Fenster-Start- und -Endzeiten ein. Verwenden Sie dies, wenn ein Raum außerhalb der aufgeführten Ereigniszeiten zugänglich sein muss.
6. Klicken Sie auf **Speichern**, um die Buchung einzureichen.

:::info
Wenn der Raum oder die Ressource eine **Genehmigungsgruppe** konfiguriert hat, wird die Buchung als **Ausstehend** angezeigt, bis ein Leiter dieser Gruppe sie genehmigt. Weitere Informationen finden Sie unter [Kalendergenehmigungen](approvals).
:::

:::tip
Der Kalender hebt etwaige Konflikte hervor, bevor Sie speichern. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel

- [Räume, Ressourcen & Planung](rooms-resources) — Buchbare Räume und Ausrüstung einrichten
- [Kalendergenehmigungen](approvals) — Buchungsanfragen genehmigen oder ablehnen
- [Kalender erstellen](creating-calendars) — Ereigniskalender verwalten
