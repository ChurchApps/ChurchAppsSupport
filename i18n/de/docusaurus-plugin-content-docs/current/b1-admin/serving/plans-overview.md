---
title: "Planübersicht"
description: "Behalten Sie die Freiwilligenzuweisungen für viele Gottesdiensttermine in B1 Admin im Blick, erkennen Sie unbesetzte Positionen und besetzen Sie Plätze oder schreiben Sie Ihrem Team per E-Mail – alles aus einem Raster."
---

# Planübersicht

<div class="article-intro">

Die Planübersicht gibt Ihnen einen Gesamtblick auf alle Freiwilligenzuweisungen über mehrere Gottesdiensttermine hinweg. Statt jeden Plan einzeln zu öffnen, sehen Sie in einem einzigen Raster, wer in jeder Position über die kommenden Wochen dient, und erkennen schnell alle Lücken, die noch besetzt werden müssen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie im Bereich Dienste mindestens einen Dienstbereich und eine Planart an
- Erstellen Sie [Dienstpläne](./plans.md) mit Terminen und Freiwilligenzuweisungen
- Stellen Sie sicher, dass Ihre Freiwilligen im [Personenverzeichnis](../people/adding-people.md) erfasst sind

</div>

## Die Übersicht öffnen {#accessing-the-overview}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Dienste** auf und klicken Sie auf **Pläne**.
2. Wählen Sie oben auf der Seite einen **Dienstbereich-Reiter** aus.
3. Klicken Sie in der Liste **Planarten** neben der Planart auf **Übersicht**, oder öffnen Sie die Planart und klicken Sie oben auf der Seite auf **Übersicht**.

Die Übersicht bezieht sich auf die Planart, aus der Sie sie geöffnet haben. Klicken Sie oben in der Übersicht auf den Namen der Planart, um zurück zu deren Planliste zu gelangen.

## Das Übersichtsraster lesen {#reading-the-overview-grid}

Die Übersicht zeigt ein Raster, in dem:

- **Zeilen** jede Position darstellen (z. B. „Musik: Gitarre“, „Technik: Projektion“), nach Kategorie gruppiert
- **Spalten** die kommenden Gottesdiensttermine darstellen (z. B. „14. Apr.“, „21. Apr.“)
- **Zellen** den Namen des Freiwilligen zeigen, der für diese Position an diesem Termin eingeplant ist

Zellen, die **rot** markiert sind, sind unbesetzt – noch niemand wurde zugewiesen. So erkennen Sie Personallücken auf einen Blick, ohne jeden Plan einzeln zu öffnen.

:::tip
Die Namen der Freiwilligen werden verkürzt angezeigt (Vorname und Initial des Nachnamens, z. B. „John D.“), damit das Raster bei vielen Positionen übersichtlich bleibt.
:::

## Freiwillige direkt aus der Übersicht zuweisen {#assigning-volunteers-directly-from-the-overview}

Sie müssen keine einzelnen Pläne öffnen, um freie Plätze zu besetzen. Klicken Sie auf eine beliebige Zelle im Raster, um ein Zuweisungsfenster für diese Position und diesen Termin zu öffnen. Dort können Sie:

- Auf den Namen eines Teammitglieds klicken, um es der Position zuzuweisen (oder bei einer Position ohne Freiwilligengruppe nach einer beliebigen Person in Ihrer Gemeinde suchen)
- Bei einer bereits zugewiesenen Person auf das Symbol **Entfernen** (X) klicken und bestätigen, um sie von diesem Platz zu nehmen
- Auf **Fertig** klicken, um das Fenster zu schließen, ohne die Übersicht zu verlassen

So können Sie einen ganzen Dienstplan in einem Durchgang besetzen – über Wochen und Positionen hinweg, ohne ein- und auszuwechseln zwischen einzelnen Plänen.

## Automatisch aus der Übersicht einplanen {#auto-scheduling-from-the-overview}

Klicken Sie auf **Automatisch einplanen** und bestätigen Sie, damit B1 jeden offenen, unbesetzten Platz im aktuellen Raster auf einmal besetzt. Für jeden angezeigten Plan holt es Kandidatinnen und Kandidaten aus der Gruppe, die jeder Position zugeordnet ist, und füllt leere Plätze automatisch. Dabei wird gemeldet, bei wie vielen der angezeigten Pläne es Plätze besetzen konnte (z. B. „3 von 4 Plänen automatisch eingeplant“). Positionen ohne Freiwilligengruppe werden übersprungen. Die Pläne werden nacheinander bearbeitet, damit dieselbe Person bei einem Durchgang nicht an zwei Terminen doppelt eingeplant wird.

:::info
Die automatische Einplanung besetzt nur Plätze, die bereits frei sind – sie ersetzt niemals eine bestehende Zuweisung.
:::

## Alle Eingeplanten per E-Mail benachrichtigen {#emailing-everyone-scheduled}

Klicken Sie auf **Freiwillige per E-Mail benachrichtigen** und bestätigen Sie, um mit einer Aktion eine Benachrichtigung an jeden Freiwilligen zu senden, der im aktuell gefilterten Datumsbereich und Dienstbereich irgendwo eingeplant ist – statt Plan für Plan eine E-Mail zu verschicken. B1 meldet, wie viele E-Mails versendet wurden und wie viele fehlgeschlagen sind.

## Alle Eingeplanten per SMS anschreiben {#texting-everyone-scheduled}

Wenn Ihre Gemeinde einen [SMS-Anbieter](../settings/church-settings.md#texting) verbunden hat und Sie sowohl Pläne bearbeiten als auch SMS senden dürfen, erscheint oben in der Übersicht die Schaltfläche **Freiwillige per SMS anschreiben**.

1. Klicken Sie auf **Freiwillige per SMS anschreiben**.
2. Das Dialogfeld zeigt, wie viele Freiwillige die Nachricht erhalten werden (z. B. „12 von 14 Freiwilligen erhalten diese Nachricht“), außerdem, wie viele sich von SMS abgemeldet haben und wie viele keine Telefonnummer hinterlegt haben.
3. Geben Sie Ihre **Nachricht** ein. Sie können auf einen Platzhalter klicken, um den Namen jedes Freiwilligen oder den Namen Ihrer Gemeinde einzufügen.
4. Klicken Sie auf **Senden**. B1 meldet, wie viele SMS versendet wurden.

Jeder im Datumsbereich eingeplante Freiwillige erhält genau eine SMS an die Mobilnummer in seinem Profil, auch wenn er an mehreren Terminen dient. Personen, die sich eine Telefonnummer teilen (etwa ein Familientelefon), erhalten nur eine SMS. Freiwillige, die auf eine frühere SMS mit STOP geantwortet haben, werden übersprungen.

:::info
SMS werden über den eigenen SMS-Anbieter Ihrer Gemeinde versendet, daher gilt dessen Preismodell. Wenn Ihrer Gemeinde die SMS-Guthaben ausgehen, wird der Versand angehalten, und das Dialogfeld weist darauf hin. Ein einzelner Versand erreicht höchstens 200 Freiwillige; engen Sie den Datumsbereich ein, wenn Sie mehr haben.
:::

## Den Dienstplan eines Freiwilligen hervorheben {#highlighting-a-volunteers-schedule}

Verwenden Sie das Dropdown-Menü **Hervorheben**, um eine Person aus Ihrem Team auszuwählen – jede Zelle, in der sie eingeplant ist, wird im Raster hervorgehoben. So sehen Sie, wo sie bereits dient, bevor Sie sie einem anderen Platz zuweisen. Wählen Sie **Alle**, um die Hervorhebung auszuschalten.

## Die Übersicht filtern {#filtering-the-overview}

Über dem Raster können Sie einstellen, was die Übersicht anzeigt. Das Raster aktualisiert sich, sobald Sie etwas ändern.

- **Alle Positionen / Nur unbesetzte** — Wählen Sie **Nur unbesetzte**, um Zeilen auszublenden, in denen alle Termine bereits besetzt sind, damit Sie sich nur auf Positionen konzentrieren, die noch eine Person brauchen.
- **Startdatum / Enddatum** — Standardmäßig zeigt die Übersicht 12 Wochen in die Zukunft. Geben Sie eigene Daten ein, um den Zeitraum zu erweitern oder einzugrenzen.

## Als CSV exportieren {#exporting-to-csv}

Klicken Sie auf **CSV exportieren**, um das aktuelle Raster als Tabelle herunterzuladen. Der Export enthält alle Positionen und Freiwilligenzuweisungen des gefilterten Datumsbereichs und lässt sich so leicht mit Dienstleitenden teilen oder für Planungstreffen ausdrucken.

:::info
Der CSV-Export berücksichtigt die aktuell angewendeten Filter – im Download sind nur die Termine und die Planart enthalten, die im Raster angezeigt werden.
:::

## Verwandte Artikel {#related-articles}

- [Dienstpläne](./plans.md) — Einzelne Dienstpläne erstellen und verwalten
- [Gottesdienstordnung](./service-order.md) — Die Gottesdienstordnung innerhalb eines Plans aufbauen
- [Lektionen planen](./scheduling-lessons.md) — Lektionen zusammen mit Ihren Dienstplänen planen
