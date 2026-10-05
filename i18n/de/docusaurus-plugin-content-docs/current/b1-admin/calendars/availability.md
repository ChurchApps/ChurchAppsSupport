---
title: "Verfügbarkeitskalender"
---

# Verfügbarkeitskalender

<div class="article-intro">

Der Verfügbarkeitskalender gibt Ihnen einen Überblick über alle Raum- und Ressourcenbuchungen in Ihrer Kirche. Von hier aus können Sie sehen, was geplant ist, Konflikte vor deren Auftreten erkennen und direkt einen Raum oder eine Ressource für ein Ereignis buchen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie mindestens einen [Raum oder eine Ressource](rooms-resources) im Abschnitt "Räume & Ressourcen" ein
- Sie benötigen Bearbeitungszugriff auf den Abschnitt "Kalender" in B1 Admin

</div>

## Verfügbarkeitskalender öffnen

Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Kalender**, und klicken Sie auf **Verfügbarkeit**.

## Kalender lesen

Der Kalender zeigt standardmäßig den aktuellen Monat an. Sie können mit den Pfeilen oben vorwärts und rückwärts navigieren oder zwischen Monats-, Wochen- und Tagesansichten wechseln.

Jedes Ereignis ist nach Buchungsstatus farbcodiert:

| Farbe | Bedeutung |
|-------|----------|
| Grün | Genehmigt |
| Orange | Genehmigung ausstehend |
| Grau | Blockiert (nicht verfügbar) |

Wenn Sie mit der Maus über ein Ereignis fahren, werden der Ereignistitel und der Raum oder die Ressource angezeigt, an die es angebunden ist.

## Nach Raum oder Ressource filtern

Verwenden Sie das Dropdown-Menü **Filter** oben links, um den Kalender auf einen einzelnen Raum oder eine Ressource zu begrenzen. Wählen Sie **Alle Räume & Ressourcen** aus, um zur vollständigen Ansicht zurückzukehren.

## Raum oder Ressource buchen

1. Klicken Sie auf die Schaltfläche **Buchen** in der oberen rechten Ecke der Seite.
2. Füllen Sie im geöffneten Dialog die Ereignisdetails aus:
   - **Titel** – der Name des Ereignisses
   - **Start-** und **End-Datum/Uhrzeit**
   - **Sichtbarkeit** – Öffentlich oder Privat
   - **Räume** – wählen Sie einen oder mehrere Räume zu reservieren
   - **Ressourcen** – wählen Sie eine oder mehrere Ressourcen zu reservieren
3. Optional können Sie **Setup-** und **Abbau-Zeiten** festlegen (in Minuten). Diese erweitern die Buchung auf beide Seiten, sodass der Raum für Setup und Reinigung reserviert ist, auch wenn die Ereignis-Start/End-Zeiten gleich bleiben.
4. Um die Buchung zu wiederholen, überprüfen Sie **Wiederholt** und konfigurieren Sie die Wiederholung:
   - **Alle wiederholen** – legen Sie das Intervall fest (z.B. alle 2 Wochen).
   - **Häufigkeit** – Täglich, Wöchentlich oder Monatlich. Wöchentlich ermöglicht es Ihnen, spezifische Wochentage auszuwählen; Monatlich ermöglicht es Ihnen, einen festen Tag des Monats oder ein relatives Muster wie "der zweite Dienstag" zu wählen.
   - **Endet** – Nie, an einem bestimmten Datum oder nach einer bestimmten Anzahl von Vorkommen.
5. Um ein benutzerdefiniertes Buchungsfenster zu festzulegen (anders als Ereignis-Start/End), schalten Sie **Benutzerdefiniertes Buchungsfenster** um und geben Sie die Fenster-Start- und End-Zeiten ein. Verwenden Sie dies, wenn ein Raum außerhalb der aufgelisteten Ereigniszeiten zugänglich sein muss.
6. Klicken Sie auf **Speichern**, um die Buchung einzureichen.

:::info
Wenn der Raum oder die Ressource eine konfigurierte **Genehmigungsgruppe** hat, wird die Buchung als **Genehmigung ausstehend** angezeigt, bis ein Leiter dieser Gruppe sie genehmigt. Siehe [Kalender-Genehmigungen](approvals) für den Genehmigungsworkflow.
:::

:::tip
Der Kalender hebt vor dem Speichern Konflikte hervor. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel

- [Räume, Ressourcen & Zeitplanung](rooms-resources) – richten Sie buchbare Räume und Ausrüstung ein
- [Kalender-Genehmigungen](approvals) – genehmigen oder lehnen Sie Buchungsanfragen ab
- [Kalender erstellen](creating-calendars) – verwalten Sie Ereigniskalender
