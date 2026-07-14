---
title: "Verfügbarkeitskalender"
---

# Verfügbarkeitskalender

<div class="article-intro">

Der Verfügbarkeitskalender gibt Ihnen einen Überblick über alle Raum- und Ressourcenbuchungen in Ihrer Kirche. Von hier aus können Sie sehen, was geplant ist, Konflikte erkennen, bevor sie auftreten, und einen Raum oder eine Ressource direkt für jede Veranstaltung buchen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie mindestens einen [Raum oder eine Ressource](rooms-resources) im Bereich Räume & Ressourcen ein
- Sie benötigen Bearbeitungszugriff auf den Bereich Kalender in B1 Admin

</div>

## Öffnen des Verfügbarkeitskalenders

Gehen Sie in B1 Admin zu **Kalender** und wählen Sie **Verfügbarkeit** aus der Seitenleiste.

## Den Kalender lesen

Der Kalender zeigt standardmäßig den aktuellen Monat an. Sie können mit den Pfeilen oben vor- und zurücknavigieren oder zwischen Monats-, Wochen- und Tagesansichten wechseln.

Jede Veranstaltung ist nach Buchungsstatus farblich gekennzeichnet:

| Farbe | Bedeutung |
|-------|---------|
| Grün | Genehmigt |
| Orange | Genehmigung ausstehend |
| Grau | Gesperrt (nicht verfügbar) |

Wenn Sie mit der Maus über eine Veranstaltung fahren, werden der Veranstaltungstitel und der zugehörige Raum bzw. die zugehörige Ressource angezeigt.

## Nach Raum oder Ressource filtern

Verwenden Sie das Dropdown-Feld **Filter** oben links, um den Kalender auf einen einzelnen Raum oder eine Ressource einzugrenzen. Wählen Sie **Alle Räume & Ressourcen**, um zur Vollansicht zurückzukehren.

## Einen Raum oder eine Ressource buchen

1. Klicken Sie oben rechts auf der Seite auf die Schaltfläche **Buchen**.
2. Füllen Sie im geöffneten Dialogfeld die Veranstaltungsdetails aus:
   - **Titel** -- der Name der Veranstaltung
   - **Start**- und **End**-Datum/Uhrzeit
   - **Sichtbarkeit** -- Öffentlich oder Privat
   - **Räume** -- einen oder mehrere zu reservierende Räume auswählen
   - **Ressourcen** -- eine oder mehrere zu reservierende Ressourcen auswählen
3. Legen Sie optional **Auf-** und **Abbau**-Zeiten fest (in Minuten). Diese verlängern die Buchung an beiden Enden, sodass der Raum für Auf- und Abbau reserviert ist, auch wenn die Start-/Endzeit der Veranstaltung gleich bleibt.
4. Um die Buchung zu wiederholen, aktivieren Sie **Wiederholungen** und konfigurieren Sie die Wiederholung:
   - **Wiederholen alle** -- legen Sie das Intervall fest (zum Beispiel alle 2 Wochen).
   - **Häufigkeit** -- Täglich, Wöchentlich oder Monatlich. Bei Wöchentlich können Sie bestimmte Wochentage auswählen; bei Monatlich können Sie einen festen Monatstag oder ein relatives Muster wie „der zweite Dienstag" wählen.
   - **Endet** -- Nie, an einem bestimmten Datum oder nach einer festgelegten Anzahl von Vorkommen.
5. Um ein benutzerdefiniertes Buchungsfenster anzugeben (abweichend von Start/Ende der Veranstaltung), aktivieren Sie **Benutzerdefiniertes Buchungsfenster** und geben Sie die Start- und Endzeiten des Fensters ein. Verwenden Sie dies, wenn ein Raum außerhalb der angegebenen Veranstaltungszeiten zugänglich sein muss.
6. Klicken Sie auf **Speichern**, um die Buchung zu übermitteln.

:::info
Wenn für den Raum oder die Ressource eine **Genehmigungsgruppe** konfiguriert ist, erscheint die Buchung als **Ausstehend**, bis ein Leiter dieser Gruppe sie genehmigt. Den Genehmigungsworkflow finden Sie unter [Kalendergenehmigungen](approvals).
:::

:::tip
Der Kalender hebt eventuelle Konflikte hervor, bevor Sie speichern. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel

- [Räume, Ressourcen & Terminplanung](rooms-resources) -- Buchbare Räume und Ausrüstung einrichten
- [Kalendergenehmigungen](approvals) -- Buchungsanfragen genehmigen oder ablehnen
- [Kalender erstellen](creating-calendars) -- Ereigniskalender verwalten
