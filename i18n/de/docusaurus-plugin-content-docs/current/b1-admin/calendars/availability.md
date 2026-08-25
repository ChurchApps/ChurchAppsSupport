---
title: "Verfügbarkeitskalender"
---

# Verfügbarkeitskalender

<div class="article-intro">

Der Verfügbarkeitskalender gibt Ihnen einen umfassenden Überblick über alle Raum- und Ressourcenbuchungen in Ihrer Kirche. Von hier aus können Sie sehen, was geplant ist, Konflikte vor ihrem Auftreten erkennen und einen Raum oder eine Ressource für jedes Ereignis direkt buchen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie mindestens einen [Raum oder Ressource](rooms-resources) im Abschnitt Räume und Ressourcen ein
- Sie benötigen Bearbeitungszugriff auf den Abschnitt „Kalender" in B1 Admin

</div>

## Den Verfügbarkeitskalender öffnen

Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke und wählen Sie **Kalender**, wählen Sie dann **Verfügbarkeit**.

## Den Kalender lesen

Der Kalender zeigt standardmäßig den aktuellen Monat an. Sie können mit den Pfeilen oben vorwärts und rückwärts navigieren oder zwischen Monats-, Wochen- und Tagesansichten wechseln.

Jedes Ereignis ist farblich nach Buchungsstatus codiert:

| Farbe | Bedeutung |
|-------|---------|
| Grün | Genehmigt |
| Orange | Genehmigung ausstehend |
| Grau | Blockiert (nicht verfügbar) |

Das Hover über einem Ereignis zeigt den Ereignistitel und den Raum oder die Ressource, an den es angehängt ist.

## Nach Raum oder Ressource filtern

Verwenden Sie das Dropdown-Menü **Filter** oben links, um den Kalender auf einen einzelnen Raum oder eine Ressource einzugrenzen. Wählen Sie **Alle Räume und Ressourcen**, um zur vollständigen Ansicht zurückzukehren.

## Einen Raum oder eine Ressource buchen

1. Klicken Sie auf die Schaltfläche **Buchen** in der oberen rechten Ecke der Seite.
2. Füllen Sie im angezeigten Dialog die Ereignisdetails aus:
   - **Titel** — der Name des Ereignisses
   - **Start**- und **End**-Datum/-Zeit
   - **Sichtbarkeit** — Öffentlich oder Privat
   - **Räume** — einen oder mehrere Räume zum Reservieren auswählen
   - **Ressourcen** — eine oder mehrere Ressourcen zum Reservieren auswählen
3. Legen Sie optional **Setup**- und **Abbau**-Zeiten fest (in Minuten). Diese erweitern die Buchung auf beiden Seiten, sodass der Raum für Setup und Cleanup reserviert ist, auch wenn die Start-/Endzeiten des Ereignisses gleich bleiben.
4. Um die Buchung zu wiederholen, aktivieren Sie **Wiederholt** und konfigurieren Sie die Wiederholung:
   - **Wiederholt jeden** – legen Sie das Intervall fest (z. B. alle 2 Wochen).
   - **Häufigkeit** – Täglich, Wöchentlich oder Monatlich. Wöchentlich ermöglicht Ihnen die Auswahl bestimmter Wochentage; Monatlich ermöglicht Ihnen die Auswahl eines festen Tages des Monats oder eines relativen Musters wie „der zweite Dienstag".
   - **Endet** – Nie, an einem bestimmten Datum oder nach einer festgelegten Anzahl von Vorkommen.
5. Um ein benutzerdefiniertes Buchungsfenster anzugeben (unterschiedlich von Start- und Endzeit des Ereignisses), aktivieren Sie **Benutzerdefiniertes Buchungsfenster** und geben Sie die Start- und Endzeit des Fensters ein. Verwenden Sie dies, wenn ein Raum außerhalb der aufgelisteten Stunden des Ereignisses zugänglich sein muss.
6. Klicken Sie auf **Speichern**, um die Buchung einzureichen.

:::info
Wenn der Raum oder die Ressource eine konfigurierte **Genehmigungsgruppe** hat, wird die Buchung als **Genehmigung ausstehend** angezeigt, bis ein Anführer dieser Gruppe sie genehmigt. Siehe [Kalendergenehmigungen](approvals) für den Genehmigungsworkflow.
:::

:::tip
Der Kalender hebt alle Konflikte vor dem Speichern hervor. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel

- [Räume, Ressourcen und Planung](rooms-resources) – buchbare Räume und Ausrüstungen einrichten
- [Kalendergenehmigungen](approvals) – Buchungsanfragen genehmigen oder ablehnen
- [Kalender erstellen](creating-calendars) – Ereigniskalender verwalten
