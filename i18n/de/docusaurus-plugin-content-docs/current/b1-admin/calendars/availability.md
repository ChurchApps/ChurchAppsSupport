---
title: "Verfügbarkeitskalender"
---

# Verfügbarkeitskalender

<div class="article-intro">

Der Verfügbarkeitskalender gibt Ihnen einen Überblick über alle Raum- und Ressourcenbuchungen in Ihrer Kirche. Von hier aus können Sie sehen, was geplant ist, Konflikte vermeiden, bevor sie passieren, und einen Raum oder eine Ressource für ein beliebiges Ereignis direkt buchen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie mindestens einen [Raum oder eine Ressource](rooms-resources) im Bereich Rooms & Resources ein
- Sie benötigen Bearbeitungszugriff auf den Bereich Calendars in B1 Admin

</div>

## Öffnen des Verfügbarkeitskalenders

Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke und wählen Sie **Calendars**, dann wählen Sie **Availability**.

## Lesen des Kalenders

Der Kalender zeigt standardmäßig den aktuellen Monat. Sie können vorwärts und rückwärts mit den Pfeilen oben navigieren oder zwischen Monats-, Wochen- und Tagesansichten wechseln.

Jedes Ereignis ist nach Buchungsstatus farbcodiert:

| Farbe | Bedeutung |
|-------|---------|
| Grün | Genehmigt |
| Orange | Ausstehend Genehmigung |
| Grau | Blockiert (nicht verfügbar) |

Wenn Sie über ein Ereignis fahren, werden der Ereignistitel und der Raum oder die Ressource angezeigt, an den das Ereignis gebunden ist.

## Filtern nach Raum oder Ressource

Verwenden Sie das Dropdown-Menü **Filter** oben links, um den Kalender auf einen einzelnen Raum oder eine Ressource einzugrenzen. Wählen Sie **All Rooms & Resources**, um zur vollständigen Ansicht zurückzukehren.

## Buchen eines Raums oder einer Ressource

1. Klicken Sie oben rechts auf der Seite auf die Schaltfläche **Book**.
2. Füllen Sie in dem geöffneten Dialog die Ereignisdetails aus:
   - **Title** — der Name des Ereignisses
   - **Start** und **End** Datum/Uhrzeit
   - **Visibility** — Public oder Private
   - **Rooms** — wählen Sie einen oder mehrere Räume zum Reservieren
   - **Resources** — wählen Sie eine oder mehrere Ressourcen zum Reservieren
3. Stellen Sie optional **Setup** und **Teardown** Zeiten ein (in Minuten). Dies dehnt die Buchung an beiden Enden aus, damit der Platz für Setup und Cleanup reserviert ist, obwohl die Start-/Endzeiten des Ereignisses gleich bleiben.
4. Um die Buchung zu wiederholen, aktivieren Sie **Repeats** und konfigurieren Sie die Wiederholung:
   - **Repeat every** — legen Sie das Intervall fest (z. B. alle 2 Wochen).
   - **Frequency** — Daily, Weekly oder Monthly. Weekly lässt Sie bestimmte Wochentage auswählen; Monthly lässt Sie einen festen Tag des Monats oder ein relatives Muster wie „der zweite Dienstag" auswählen.
   - **Ends** — Never, an einem bestimmten Datum oder nach einer festgelegten Anzahl von Vorkommen.
5. Um ein benutzerdefiniertes Buchungsfenster (anders als Start/End des Ereignisses) anzugeben, aktivieren Sie **Custom Booking Window** und geben Sie die Start- und Endzeiten des Fensters ein. Verwenden Sie dies, wenn ein Raum außerhalb der Ereigniszeiten zugänglich sein muss.
6. Klicken Sie auf **Save**, um die Buchung einzureichen.

:::info
Wenn der Raum oder die Ressource eine **Approval Group** konfiguriert hat, wird die Buchung als **Pending** angezeigt, bis ein Leiter dieser Gruppe sie genehmigt. Siehe [Calendar Approvals](approvals) für den Genehmigungsablauf.
:::

:::tip
Der Kalender hebt alle Konflikte vor dem Speichern hervor. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel

- [Rooms, Resources & Scheduling](rooms-resources) — richten Sie buchbare Räume und Ausrüstungen ein
- [Calendar Approvals](approvals) — genehmigen oder lehnen Sie Buchungsanfragen ab
- [Creating Calendars](creating-calendars) — verwalten Sie Ereigniskalender
