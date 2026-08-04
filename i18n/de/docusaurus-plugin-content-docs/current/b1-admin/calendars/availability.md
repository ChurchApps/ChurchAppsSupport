---
title: "Verfügbarkeitskalender"
---

# Verfügbarkeitskalender

<div class="article-intro">

Der Verfügbarkeitskalender gibt Ihnen einen Überblick über alle Raum- und Ressourcenbuchungen in Ihrer Kirche. Von hier aus können Sie sehen, was geplant ist, Konflikte erkennen, bevor sie auftreten, und einen Raum oder eine Ressource direkt für ein beliebiges Ereignis buchen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie mindestens einen [Raum oder eine Ressource](rooms-resources) im Bereich Räume & Ressourcen ein
- Sie benötigen Bearbeitungszugriff auf den Bereich Kalender in B1 Admin

</div>

## Öffnen Sie den Verfügbarkeitskalender

Gehen Sie in B1 Admin zu **Kalender** und wählen Sie **Verfügbarkeit** aus der Seitenleiste.

## Lesen Sie den Kalender

Der Kalender zeigt standardmäßig den aktuellen Monat an. Sie können mit den Pfeilen oben vorwärts und rückwärts navigieren oder zwischen Monats-, Wochen- und Tagesansichten wechseln.

Jedes Ereignis ist nach Buchungsstatus farbcodiert:

| Farbe | Bedeutung |
|-------|---------|
| Grün | Genehmigt |
| Orange | Genehmigung ausstehend |
| Grau | Blockiert (nicht verfügbar) |

Das Hovern über ein Ereignis zeigt den Ereignistitel und den Raum oder die Ressource, an den er angehängt ist.

## Filter nach Raum oder Ressource

Verwenden Sie das Dropdown-Menü **Filter** oben links, um den Kalender auf einen einzelnen Raum oder eine Ressource zu begrenzen. Wählen Sie **Alle Räume & Ressourcen**, um zur Vollansicht zurückzukehren.

## Buchen Sie einen Raum oder eine Ressource

1. Klicken Sie auf die Schaltfläche **Buchen** in der oberen rechten Ecke der Seite.
2. Füllen Sie im geöffneten Dialogfeld die Ereignisdetails aus:
   - **Titel** – der Name des Ereignisses
   - **Start** und **End** Datum/Uhrzeit
   - **Sichtbarkeit** – Öffentlich oder Privat
   - **Räume** – wählen Sie einen oder mehrere Räume zu reservieren
   - **Ressourcen** – wählen Sie eine oder mehrere Ressourcen zu reservieren
3. Stellen Sie optional **Setup**- und **Teardown**-Zeiten ein (in Minuten). Diese rahmen die Buchung auf beiden Seiten ein, sodass der Raum für Aufbau und Abbau reserviert wird, auch wenn die Ereignisstart-/Endzeiten gleich bleiben.
4. Um die Buchung zu wiederholen, aktivieren Sie **Wiederholung** und konfigurieren Sie die Wiederholung:
   - **Alle wiederholen** – stellen Sie das Intervall ein (z. B. alle 2 Wochen).
   - **Häufigkeit** – Täglich, Wöchentlich oder Monatlich. Wöchentlich ermöglicht Ihnen die Auswahl bestimmter Wochentage; Monatlich ermöglicht Ihnen die Auswahl eines festen Tages des Monats oder eines relativen Musters wie „der zweite Dienstag".
   - **Endet** – Nie, an einem bestimmten Datum oder nach einer bestimmten Anzahl von Vorkommen.
5. Um ein benutzerdefiniertes Buchungsfenster anzugeben (unterschiedlich von Ereignisstart/-ende), schalten Sie **Benutzerdefiniertes Buchungsfenster** um und geben Sie die Fensterstart- und Endzeiten ein. Verwenden Sie dies, wenn ein Raum außerhalb der aufgelisteten Ereigniszeiten zugänglich sein muss.
6. Klicken Sie auf **Speichern**, um die Buchung einzureichen.

:::info
Wenn der Raum oder die Ressource eine **Genehmigungsgruppe** konfiguriert hat, wird die Buchung als **Ausstehend** angezeigt, bis ein Leiter dieser Gruppe sie genehmigt. Siehe [Kalender Genehmigungen](approvals) für den Genehmigungsablauf.
:::

:::tip
Der Kalender hebt alle Konflikte vor dem Speichern hervor. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel

- [Räume, Ressourcen & Zeitplanung](rooms-resources) – richten Sie buchbare Räume und Ausrüstungen ein
- [Kalender Genehmigungen](approvals) – genehmigen oder lehnen Sie Buchungsanfragen ab
- [Kalender erstellen](creating-calendars) – verwalten Sie Ereigniskalender
