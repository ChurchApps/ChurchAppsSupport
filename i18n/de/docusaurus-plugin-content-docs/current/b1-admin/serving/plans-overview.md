---
title: "Planübersicht"
description: "Behalten Sie die Freiwilligeneinsätze über viele Gottesdiensttermine in B1 Admin im Blick, erkennen Sie unbesetzte Positionen und besetzen oder kontaktieren Sie Ihr Team aus einem einzigen Raster."
---

# Planübersicht {#plans-overview}

<div class="article-intro">

Die Planübersicht verschafft Ihnen einen Gesamtüberblick über alle Freiwilligeneinsätze über mehrere Gottesdiensttermine hinweg. Anstatt jeden Plan einzeln zu öffnen, sehen Sie in einem einzigen Raster, wer in jeder Position über die kommenden Wochen dient, und erkennen schnell alle Lücken, die noch besetzt werden müssen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie mindestens einen Dienstbereich und eine Planart im Bereich Dienste an
- Erstellen Sie [Dienstpläne](./plans.md) mit Terminen und Freiwilligenzuweisungen
- Stellen Sie sicher, dass Ihre Freiwilligen im [Personenverzeichnis](../people/adding-people.md) erfasst sind

</div>

## Die Übersicht öffnen {#accessing-the-overview}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Dienste** auf und klicken Sie auf **Pläne**.
2. Wählen Sie oben auf der Seite einen **Dienstbereich-Reiter** aus.
3. Klicken Sie in der Liste **Planarten** neben der Planart auf **Übersicht** oder öffnen Sie die Planart und klicken Sie oben auf der Seite auf **Übersicht**.

Die Übersicht bezieht sich auf die Planart, aus der Sie sie geöffnet haben. Klicken Sie oben in der Übersicht auf den Namen der Planart, um zurück zu deren Planliste zu gelangen.

## Das Übersichtsraster lesen {#reading-the-overview-grid}

Die Übersicht zeigt ein Raster, in dem:

- **Zeilen** jede Position darstellen (z. B. „Music: Guitar“, „Tech: Projection“), nach Kategorie gruppiert
- **Spalten** die kommenden Gottesdiensttermine darstellen (z. B. „Apr 14“, „Apr 21“)
- **Zellen** den Namen des Freiwilligen zeigen, der an diesem Termin für diese Position eingeplant ist. Ein kleines rotes Kalendersymbol hinter einem Namen bedeutet, dass dieser Freiwillige an diesem Tag einen [Sperrtermin](./plan-validation.md#blockout-dates) hat; wenn Sie darüberfahren, sehen Sie die Termine

Zellen, die **rot** markiert sind, sind unbesetzt -- es ist noch kein Freiwilliger zugewiesen. So erkennen Sie Lücken in der Besetzung auf einen Blick, ohne jeden Plan einzeln öffnen zu müssen.

:::tip
Freiwilligennamen werden verkürzt angezeigt (Vorname und Initial des Nachnamens, z. B. „John D.“), damit das Raster bei vielen Positionen übersichtlich bleibt.
:::

## Freiwillige direkt in der Übersicht einplanen {#assigning-volunteers-directly-from-the-overview}

Sie müssen nicht einzelne Pläne öffnen, um freie Plätze zu besetzen. Klicken Sie auf eine beliebige Zelle im Raster, um einen Zuweisungsbereich für diese Position und diesen Termin zu öffnen. Von dort aus können Sie:

- auf den Namen eines Teammitglieds klicken, um es der Position zuzuweisen (oder bei einer Position ohne Freiwilligengruppe nach jemandem in Ihrer Gemeinde suchen). Nutzen Sie **Team durchsuchen**, um jemanden in einem großen Team zu finden. Wer an diesem Tag gesperrt ist, zeigt ein Abzeichen **Nicht verfügbar** und steht ganz unten
- auf das Symbol **Entfernen** (X) neben einer bereits zugewiesenen Person klicken und bestätigen, um sie aus diesem Platz zu entfernen
- auf **Fertig** klicken, um den Bereich zu schließen, ohne die Übersicht zu verlassen

So lässt sich ein gesamter Dienstplan in einem Durchgang besetzen -- über Wochen und Positionen hinweg, ohne in einzelne Pläne hinein- und herauszuspringen.

## Automatische Planung aus der Übersicht {#auto-scheduling-from-the-overview}

Klicken Sie auf **Automatisch einplanen** und bestätigen Sie, damit B1 alle offenen, unbesetzten Plätze im aktuellen Raster auf einmal füllt. Für jeden angezeigten Plan holt es Kandidaten aus der Gruppe, die mit jeder Position verknüpft ist, und füllt leere Plätze automatisch. Anschließend meldet es, für wie viele der sichtbaren Pläne es Plätze besetzen konnte (z. B. „Automatisch eingeplant: 3 von 4 Plänen“). Positionen ohne Freiwilligengruppe werden übersprungen. Die Pläne werden nacheinander besetzt, damit dieselbe Person im selben Durchgang nicht an zwei Terminen doppelt eingeplant wird.

:::info
Die automatische Planung füllt nur bereits leere Plätze -- sie ersetzt niemals eine bestehende Zuweisung.
:::

## Alle eingeplanten Personen per E-Mail kontaktieren {#emailing-everyone-scheduled}

Klicken Sie auf **Freiwillige per E-Mail benachrichtigen** und bestätigen Sie, um mit einer Aktion eine Benachrichtigung an jeden Freiwilligen zu senden, der im aktuell gefilterten Datumsbereich und Dienstbereich irgendwo eingeplant ist -- statt Plan für Plan eine E-Mail zu verschicken. B1 meldet, wie viele E-Mails gesendet und wie viele nicht zugestellt wurden.

## Alle eingeplanten Personen per SMS kontaktieren {#texting-everyone-scheduled}

Ist bei Ihrer Gemeinde ein [SMS-Anbieter](../settings/church-settings.md#texting) verbunden und dürfen Sie sowohl Pläne bearbeiten als auch SMS senden, erscheint oben in der Übersicht die Schaltfläche **Freiwillige per SMS anschreiben**.

1. Klicken Sie auf **Freiwillige per SMS anschreiben**.
2. Der Dialog zeigt an, wie viele Freiwillige die SMS erhalten (z. B. „12 von 14 Freiwilligen erhalten diese SMS“), außerdem wie viele sich von SMS abgemeldet haben und wie viele keine Telefonnummer hinterlegt haben.
3. Geben Sie Ihre **Nachricht** ein. Sie können auf einen Platzhalter klicken, um den Namen jedes Freiwilligen oder den Namen Ihrer Gemeinde einzufügen.
4. Klicken Sie auf **Senden**. B1 meldet, wie viele SMS versendet wurden.

Jeder im Datumsbereich eingeplante Freiwillige erhält eine SMS an die Mobilnummer in seinem Profil, auch wenn er an mehreren Terminen dient. Personen, die sich eine Telefonnummer teilen (etwa ein Familientelefon), erhalten nur eine SMS. Freiwillige, die auf eine frühere SMS mit STOP geantwortet haben, werden übersprungen.

:::info
SMS werden über den eigenen SMS-Anbieter Ihrer Gemeinde versendet, es gelten also dessen Preise. Ist Ihrer Gemeinde das SMS-Guthaben ausgegangen, bricht der Versand ab und der Dialog teilt Ihnen das mit. Ein einzelner Versand erreicht höchstens 200 Freiwillige; grenzen Sie den Datumsbereich ein, wenn Sie mehr haben.
:::

## Den Einsatzplan einer Person hervorheben {#highlighting-a-volunteers-schedule}

Wählen Sie mit dem Dropdown **Hervorheben** eine Person aus Ihrem Team aus -- jede Zelle, in der sie eingeplant ist, wird im Raster hervorgehoben. So sehen Sie, wo sie bereits dient, bevor Sie sie einem weiteren Platz zuweisen. Wählen Sie **Alle**, um die Hervorhebung wieder auszuschalten.

## Die Übersicht filtern {#filtering-the-overview}

Sie können anpassen, was die Übersicht anzeigt, über die Bedienelemente oberhalb des Rasters. Das Raster aktualisiert sich, sobald Sie etwas ändern.

- **Alle Positionen / Nur unbesetzte** -- Wählen Sie **Nur unbesetzte**, um Zeilen auszublenden, in denen jeder Termin bereits besetzt ist, damit Sie sich nur auf Positionen konzentrieren, die noch eine Person benötigen.
- **Startdatum / Enddatum** -- Standardmäßig zeigt die Übersicht 12 Wochen in die Zukunft. Geben Sie eigene Daten ein, um den Zeitraum zu erweitern oder einzugrenzen.

## Als CSV exportieren {#exporting-to-csv}

Klicken Sie auf **CSV exportieren**, um das aktuelle Raster als Tabelle herunterzuladen. Der Export enthält alle Positionen und Freiwilligenzuweisungen für den gefilterten Datumsbereich und lässt sich leicht mit Verantwortlichen teilen oder für Planungstreffen ausdrucken.

:::info
Der CSV-Export berücksichtigt die aktuell angewendeten Filter -- im Download sind nur die Termine und die Planart enthalten, die im Raster angezeigt werden.
:::

## Verwandte Artikel {#related-articles}

- [Dienstpläne](./plans.md) -- einzelne Dienstpläne erstellen und verwalten
- [Gottesdienstordnung](./service-order.md) -- die Gottesdienstordnung innerhalb eines Plans aufbauen
- [Lektionen einplanen](./scheduling-lessons.md) -- Lektionen zusammen mit Ihren Dienstplänen einplanen
