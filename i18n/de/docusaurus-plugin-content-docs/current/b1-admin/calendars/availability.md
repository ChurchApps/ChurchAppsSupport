---
title: "Verfügbarkeitskalender"
---

# Verfügbarkeitskalender

<div class="article-intro">

Der Verfügbarkeitskalender bietet einen Überblick über alle Raum- und Ressourcenbuchungen in Ihrer Kirche. Von hier aus können Sie sehen, was geplant ist, Konflikte erkennen, bevor sie auftreten, und einen Raum oder eine Ressource für jedes Ereignis direkt buchen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie mindestens einen [Raum oder eine Ressource](rooms-resources) im Abschnitt „Räume & Ressourcen" ein
- Sie benötigen Bearbeitungszugriff auf den Abschnitt „Kalender" in B1 Admin

</div>

## Öffnen des Verfügbarkeitskalenders

Gehen Sie in B1 Admin zu **Kalender** und wählen Sie **Verfügbarkeit** in der Seitenleiste aus.

## Lesen des Kalenders

Der Kalender zeigt standardmäßig den aktuellen Monat an. Sie können mit den Pfeilen oben vorwärts und rückwärts navigieren oder zwischen Monats-, Wochen- und Tagesansichten wechseln.

Jedes Ereignis ist farbcodiert nach Buchungsstatus:

| Farbe | Bedeutung |
|-------|---------|
| Grün | Genehmigt |
| Orange | Genehmigung ausstehend |
| Grau | Blockiert (nicht verfügbar) |

Wenn Sie über ein Ereignis fahren, werden der Ereignistitel und der zugehörige Raum oder die Ressource angezeigt.

## Filtern nach Raum oder Ressource

Verwenden Sie das Dropdown-Menü **Filter** oben links, um den Kalender auf einen einzelnen Raum oder eine einzelne Ressource einzugrenzen. Wählen Sie **Alle Räume & Ressourcen**, um zur Vollansicht zurückzukehren.

## Buchen eines Raums oder einer Ressource

1. Klicken Sie auf die Schaltfläche **Buchen** in der oberen rechten Ecke der Seite.
2. Füllen Sie im geöffneten Dialogfeld die Ereignisdetails aus:
   - **Titel** – Der Name des Ereignisses
   - **Start** und **Ende** Datum/Uhrzeit
   - **Sichtbarkeit** – Öffentlich oder Privat
   - **Räume** – Wählen Sie einen oder mehrere Räume aus, um sie zu reservieren
   - **Ressourcen** – Wählen Sie eine oder mehrere Ressourcen aus, um sie zu reservieren
3. Legen Sie optional **Aufbau** und **Abbau** Zeiten (in Minuten) fest. Diese puffern die Buchung auf beiden Seiten ab, sodass der Raum für Auf- und Abbau reserviert ist, während die Ereignisstart-/-endzeiten gleich bleiben.
4. Um die Buchung zu wiederholen, aktivieren Sie **Wiederholt** und konfigurieren Sie die Wiederholung:
   - **Alle wiederholen** – Legen Sie das Intervall fest (z. B. alle 2 Wochen).
   - **Häufigkeit** – Täglich, Wöchentlich oder Monatlich. Wöchentlich ermöglicht es Ihnen, bestimmte Wochentage auszuwählen; Monatlich ermöglicht es Ihnen, einen festen Tag des Monats oder ein relatives Muster wie „der zweite Dienstag" auszuwählen.
   - **Endet** – Niemals, an einem bestimmten Datum oder nach einer festgelegten Anzahl von Vorkommen.
5. Um ein benutzerdefiniertes Buchungsfenster (anders als die Ereignisstart-/-endzeiten) anzugeben, aktivieren Sie **Benutzerdefiniertes Buchungsfenster** und geben Sie die Start- und Endzeiten des Fensters ein. Verwenden Sie dies, wenn auf einen Raum außerhalb der aufgelisteten Ereigniszeiten zugegriffen werden muss.
6. Klicken Sie auf **Speichern**, um die Buchung zu übermitteln.

:::info
Wenn der Raum oder die Ressource eine konfigurierte **Genehmigungsgruppe** hat, wird die Buchung als **Genehmigung ausstehend** angezeigt, bis ein Leader dieser Gruppe sie genehmigt. Siehe [Kalendergenehmigungen](approvals) für den Genehmigungsworkflow.
:::

:::tip
Der Kalender hebt alle Konflikte hervor, bevor Sie speichern. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel

- [Räume, Ressourcen & Planung](rooms-resources) – Richten Sie buchbare Räume und Ausrüstung ein
- [Kalendergenehmigungen](approvals) – Buchungsanfragen genehmigen oder ablehnen
- [Kalender erstellen](creating-calendars) – Verwalten Sie Ereigniskalender
