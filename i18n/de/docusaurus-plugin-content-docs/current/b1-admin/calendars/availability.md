---
title: "Verfügbarkeitskalender"
description: "Richten Sie in B1 Admin buchbare Räume und Geräte ein und buchen Sie sie dann im Kalender, fügen Sie Puffer für Aufbau und Abbau hinzu und behandeln Sie wiederkehrende oder genehmigungspflichtige Buchungen."
---

# Verfügbarkeitskalender

<div class="article-intro">

Der Verfügbarkeitskalender bietet Ihnen eine Gesamtübersicht über alle Raum- und Ressourcenbuchungen in Ihrer Kirche. Hier sehen Sie, was geplant ist, erkennen Konflikte, bevor sie entstehen, und buchen einen Raum oder eine Ressource direkt für jedes beliebige Ereignis.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie mindestens einen [Raum oder eine Ressource](./rooms-resources.md) im Bereich Räume & Ressourcen ein
- Sie benötigen die Berechtigung **Inhalte bearbeiten**

</div>

## Den Verfügbarkeitskalender öffnen {#opening-the-availability-calendar}

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Verfügbarkeit**.

## Den Kalender lesen {#reading-the-calendar}

Der Kalender zeigt standardmäßig den aktuellen Monat. Verwenden Sie oben **Heute**, **Zurück** und **Weiter**, um zu navigieren, und **Monat**, **Woche**, **Tag** oder **Agenda**, um die Ansicht zu ändern.

Jede Buchung ist nach Status farblich gekennzeichnet:

| Farbe | Bedeutung |
|-------|---------|
| Grün | Genehmigt |
| Orange | Genehmigung ausstehend |
| Grau | Gesperrt (nicht verfügbar), angezeigt als *Gesperrt: Grund* |

Jede Buchung zeigt den Ereignistitel, gefolgt von den Räumen und Ressourcen, die sie nutzt. Fahren Sie mit der Maus über eine Buchung, um den vollständigen Text zu sehen. Klicken Sie auf eine Buchung, um das zugehörige Ereignis zu öffnen und zu bearbeiten.

## Nach Raum oder Ressource filtern {#filtering-by-room-or-resource}

Verwenden Sie das Dropdown-Menü **Raum / Ressource** oben links, um den Kalender auf einen einzelnen Raum oder eine einzelne Ressource einzugrenzen. Wählen Sie **Alle Räume & Ressourcen**, um zur vollständigen Ansicht zurückzukehren.

## Einen Raum oder eine Ressource buchen {#booking-a-room-or-resource}

1. Klicken Sie oben auf der Seite auf die Schaltfläche **Buchen**.
2. Der Dialog **Neues Ereignis** öffnet sich – derselbe Editor, der auch im Kalender verwendet wird (siehe [Ereignisse hinzufügen und bearbeiten](./creating-calendars.md#adding-and-editing-events)). Füllen Sie die Ereignisdetails aus:
   - **Gruppe** *(erforderlich)* – die Gruppe, zu der das Ereignis gehört. Wenn Sie [Vorlagen](./rooms-resources.md#event-templates) haben, können Sie außerdem eine **Vorlage** wählen, um den Rest auszufüllen.
   - **Titel** *(erforderlich)*
   - **Beginn** und **Ende** als Datum/Uhrzeit *(erforderlich; das Ende muss nach dem Beginn liegen)*
   - **Sichtbarkeit** – Öffentlich oder Privat
   - **Räume** – wählen Sie einen oder mehrere Räume zur Reservierung
   - **Ressourcen** – wählen Sie eine oder mehrere Ressourcen zur Reservierung
3. Sobald ein Raum oder eine Ressource ausgewählt ist, können Sie **Aufbau (Min. vorher)** und **Abbau (Min. nachher)** festlegen. Diese Puffer verlängern die Buchung an beiden Enden, sodass der Raum für Aufbau und Aufräumen reserviert ist, auch wenn die Start- und Endzeiten des Ereignisses gleich bleiben.
4. Um die Buchung zu wiederholen, legen Sie zuerst den **Beginn** fest und aktivieren Sie dann **Wiederholen** und konfigurieren Sie die Wiederholung:
   - **Intervall** – wie oft sie sich wiederholt (zum Beispiel 2 mit Woche für alle 2 Wochen).
   - **Häufigkeit** – Tag, Woche oder Monat. Bei Wochen können Sie bestimmte Wochentage auswählen; bei Monaten einen festen Tag im Monat oder ein relatives Muster wie „der zweite Dienstag“.
   - **Endet** – **Nie**, **Am** einem bestimmten **Enddatum** oder **Nach** einer festgelegten Anzahl von Terminen.
5. Um ein eigenes Buchungsfenster festzulegen (abweichend von Beginn und Ende des Ereignisses), aktivieren Sie **Benutzerdefiniertes Reservierungsfenster** und geben Sie **Reservieren ab** und **Reservieren bis** ein. Dies ersetzt die Minuten für Aufbau und Abbau. Nutzen Sie es, wenn ein Raum außerhalb der angegebenen Zeiten des Ereignisses zugänglich sein muss.
6. Klicken Sie auf **Speichern**, um die Buchung einzureichen.

:::info
Ist für den Raum oder die Ressource eine **Genehmigungsgruppe** konfiguriert, erscheint die Buchung als **Ausstehend**, bis sie auf der Seite Genehmigungen bestätigt wird – außer Sie sind Mitglied dieser Gruppe, dann wird sie sofort genehmigt. Den Genehmigungsablauf finden Sie unter [Kalender-Genehmigungen](./approvals.md).
:::

:::tip
Der Editor zeigt vor dem Speichern eine Warnung an, wenn ein Raum oder eine Ressource zu diesem Zeitpunkt bereits gebucht oder gesperrt ist. Wenn Sie eine Konfliktwarnung sehen, passen Sie Ihre Zeiten an oder wählen Sie einen anderen Raum.
:::

## Verwandte Artikel {#related-articles}

- [Räume, Ressourcen & Terminplanung](./rooms-resources.md) — buchbare Räume und Geräte einrichten
- [Kalender-Genehmigungen](./approvals.md) — Buchungsanfragen genehmigen oder ablehnen
- [Kalender erstellen](./creating-calendars.md) — Ereigniskalender verwalten
