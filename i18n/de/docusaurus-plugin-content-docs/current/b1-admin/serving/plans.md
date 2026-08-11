---
title: "Dienstpläne"
---

# Dienstpläne

<div class="article-intro">

Dienstpläne organisieren, wer dient und wann. Jeder Plan ist an ein bestimmtes Datum und Ministerium gebunden, was es einfach macht, Ihre Freiwilligenteams Woche für Woche zu koordinieren und sicherzustellen, dass jeder Gottesdienst vollständig besetzt ist.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Richten Sie Ihre Ministerien und Teams im Dienst-Bereich ein
- Stellen Sie sicher, dass Freiwillige [zu Ihrem Personenverzeichnis](../people/adding-people.md) hinzugefügt wurden und Teams zugewiesen wurden

</div>

## Zugriff auf Pläne

1. Navigieren Sie vom Hauptmenü zum Dienst.
2. Wählen Sie eine **Ministeriums-Registerkarte** oben auf der Seite.
3. Klicken Sie auf einen **Plantyp**, um die Liste der Pläne für diesen Typ zu sehen.
4. Klicken Sie auf einen bestimmten Plan, um ihn zu öffnen.

:::info
Vollständiger Admin-Zugriff ist nicht erforderlich, um Pläne zu verwalten. Jeder, der Mitglied eines Ministeriums ist, kann zum Dienst navigieren und Pläne für ihr eigenes Ministerium ohne die "Pläne bearbeiten"-Berechtigung erstellen, bearbeiten und planen. Herausgeber mit der Rolle "Pläne bearbeiten" können Pläne über alle Ministerien hinweg verwalten.
:::

## Erstellen eines Plans

1. Klicken Sie aus der Plantypansicht auf **Neuer Plan**.
2. Geben Sie dem Plan einen Namen oder verwenden Sie das Datum als Namen. Wählen Sie das **Datum** für den Gottesdienst.
3. Wenn Sie von einem vorherigen Plan kopieren möchten, wählen Sie nur Positionen oder Positionen und Zuordnungen. Wenn Sie nicht kopieren möchten, wählen Sie einfach nichts. Sie können auch die Reihenfolge des Gottesdienstes von meinem vorherigen Plan kopieren.
4. Speichern Sie den Plan. Sie können jetzt beginnen, Teammitglieder zuzuweisen und die [Dienstleistungsreihenfolge](./service-order.md) zu erstellen.

## Die Plan-Detail-Seite

Wenn Sie einen Plan öffnen, sehen Sie zwei Registerkarten:

- **Zuordnungen** -- Verwalten Sie, welche Teammitglieder diesem Plan zugewiesen sind. Sie können Personen aus Ihren bestehenden Teams hinzufügen und sehen, wer bestätigt oder noch ausstehend ist.
- **[Dienstleistungsreihenfolge](./service-order.md)** -- Erstellen Sie die Reihenfolge des Gottesdienstes mit Elementen wie Lobpreis-Liedern, Gebeten, Ankündigungen und der Predigt.

## Zuweisen von Teammitgliedern

1. Öffnen Sie einen Plan und gehen Sie zur **Zuordnungs**-Registerkarte.
2. Klicken Sie auf **Position hinzufügen**, um sie zu erweitern. Füllen Sie die Informationen im Formular "Position hinzufügen" aus. Für den Kategorienamen, fügen Sie eine beliebige Kategorie hinzu.
3. Klicken Sie auf **Benötigte Personen** und wählen Sie Freiwillige, um diese Position zu füllen.
4. Fügen Sie Mitglieder aus Ihrem Team-Kader hinzu, indem Sie auf **Hinzufügen** klicken.
5. Zugewiesene Mitglieder werden unter ihrem Team mit ihrem Zuweisungsstatus angezeigt.
6. Klicken Sie auf Freiwillige benachrichtigen, um sie in der B1-App oder per E-Mail zu benachrichtigen.

Jede Position zeigt einen Zählchip (z.B. "2/3"), sodass Sie auf einen Blick sehen können, wie viele Stellen besetzt sind. Oben auf der Registerkarte "Zuordnungen" zeigen eine Fortschrittsleiste und ein Zusammenfassungschip ("X von Y Positionen besetzt") Ihren gesamten Personalbestand für den Plan, wechselt zu **Vollständig besetzt**, sobald jede Position abgedeckt ist.

:::tip
Richten Sie Ihre Teams in den Ministeriums-Einstellungen ein, bevor Sie Pläne erstellen. Auf diese Weise haben Sie einen bereiten Pool von Freiwilligen zum Zuweisen.
:::

## Plan-Einstellungen

Jeder Plan hat zusätzliche Einstellungen, die Sie konfigurieren können, indem Sie auf das Bearbeitungssymbol (Stift) auf dem Plan klicken. Diese enthalten:

- **Anmelde-Frist** -- die Anzahl der Stunden vor dem Gottesdienst, wenn sich Freiwillige abmelden. Geben Sie eine negative Zahl ein, um die Anmeldungen nach Dienstbeginn offen zu halten.
- **Namen der Freiwilligen auf der Anmeldeseite anzeigen** -- wenn aktiviert, können Freiwillige sehen, wer sonst noch für jede Position angemeldet ist.
- **Stift-weise** -- verbirgt Zuordnungen vor Freiwilligen, bis Sie bereit sind, den Plan zu veröffentlichen.
- **Automatisch einen Ersatz planen, wenn sich ein Freiwilliger ablehnt** -- wenn aktiviert und ein zugewiesener Freiwilliger seine Position ablehnt, kontaktiert B1 automatisch die nächste verfügbare Person auf der Team-Kader und fragt, ob sie dienen kann. Dies setzt sich die Liste entlang fort, bis jemand annimmt, indem die Positionen gefüllt bleiben, ohne manuelle Nachverfolgung.

## Freiwilligen-Erinnerungen

B1 kann Freiwillige automatisch an die Gottesdienste erinnern, zu denen sie eingeplant sind, sodass Sie Ihr Team nicht jede Woche nachverfolgen müssen. Erinnerungen gehen an **alle eingeplanten** -- sowohl diejenigen, die bestätigt haben als auch diejenigen, die noch nicht reagiert haben -- per E-Mail und als In-App-/Push-Benachrichtigung. Jede Erinnerung enthält die Position des Freiwilligen, das Dienstdatum, die Plan-Notizen und Ihre benutzerdefinierte Nachricht.

Erinnerungszeitpunkt und Inhalte werden pro **Plantyp** eingestellt, sodass jede Art von Dienstleistung ihren eigenen Plan halten kann.

1. Wählen Sie aus dem **Dienst**-Bereich das Ministerium, das den Plantyp enthält.
2. Klicken Sie auf das **Bearbeitungs** (Stift) Symbol neben dem Plantyp.
3. Stellen Sie im **Erinnerungen**-Abschnitt Folgendes ein:
   - **Erinnerungstage vor Gottesdienst** -- eine kommagetrennte Liste der Anzahl der Tage voraus zum Senden, zum Beispiel `7,1,0`. Verwenden Sie `0`, um eine Erinnerung am Tag des Gottesdienstes zu senden. Lassen Sie dieses Feld leer, um Erinnerungen für diesen Plantyp auszuschalten.
   - **Benutzerdefinierte Erinnerungsnachricht** *(optional)* -- zusätzlicher Text, der der Erinnerung hinzugefügt wird, wie "Kommen Sie 30 Minuten früh an, um zu üben."
4. Speichern Sie den Plantyp.

Neue Planttypen erinnern Freiwillige **2 Tage vor** jedem Gottesdienst standardmäßig, bis Sie dies ändern.

:::tip
Freiwillige, die noch nicht bestätigt haben, erhalten **Annehmen** und **Ablehnen**-Schaltflächen direkt in der Erinnerungsnachricht, sodass sie ohne Anmeldung reagieren können.
:::

:::info
Jede Erinnerung wird einmal gesendet. Pläne, die noch stiftweise sind (nicht an das Team gesendet), lösen keine Erinnerungen aus.
:::

## Verknüpfen von Gruppen mit einem Plantyp

Unterhalb der Planliste auf der Plantyp-Seite können Sie mit dem **Gruppen**-Bereich entscheiden, welche Gruppen die Pläne für diesen Plantyp aus ihrem Mitgliedertörlum sehen können. Dies ist eine schnelle Möglichkeit, anstehende Gottesdienste dem richtigen Team zu zeigen, ohne ihnen Admin-Zugriff zu geben.

1. Scrollen Sie auf der Plantyp-Seite zum **Gruppen**-Bereich.
2. Klicken Sie auf **Gruppe hinzufügen** und wählen Sie eine Gruppe aus dem Dropdown.
3. Wählen Sie in der Spalte **Zeigt** aus, ob Mitglieder dieser Gruppe **Vergangen**, **Zukunft** oder **Beide** Pläne für diesen Plantyp sehen sollten.
4. Wiederholen Sie dies, um zusätzliche Gruppen zu verbinden, oder klicken Sie auf das Trash-Symbol, um eine Gruppe zu entfernen.

:::info
Nur Gruppen, die als **Standard** gekennzeichnet sind, werden in der Auswahl angezeigt. Mitglieder einer zugehörigen Gruppe sehen automatisch Pläne von diesem Plantyp auf der [Pläne](/docs/b1-church/plans/)-Registerkarte im B1-Mitgliedertörlum -- begrenzt auf das Fenster "Vergangenheit/Zukunft/Beide", das Sie ausgewählt haben.
:::

## Drucken von Plänen

Sie können einen Plan für die Verteilung an Ihr Team drucken. Öffnen Sie den Plan, öffnen Sie die Dienstleistungsreihenfolge-Registerkarte und verwenden Sie die **Drucken**-Option, um eine druckbare Version zu generieren, die Zuordnungen und die Dienstleistungsreihenfolge enthält. Dies ist nützlich für die Verteilung bei Proben oder zum Posten in einem gemeinsamen Bereich.

:::info
Pläne sind nach Ministerium organisiert. Stellen Sie sicher, dass Sie auf der richtigen Ministeriums-Registerkarte sind, bevor Sie Pläne erstellen oder ansehen.
:::

## Nächste Schritte

- Verwenden Sie die [Pläne-Übersicht](./plans-overview.md), um alle anstehenden Zuordnungen über mehrere Wochen in einem Raster zu sehen und unbefüllte Positionen zu erkennen -- und Freiwillige direkt aus dem Raster zu zuweisen
- Speichern Sie die Struktur eines Plans als [Planvorlage](./plan-templates.md), sodass Sie ihn mit einem Klick auf zukünftige Pläne stempeln können
- Bauen Sie Ihre [Dienstleistungsreihenfolge](./service-order.md) mit Liedern, Lesungen und anderen Elementen
- Fügen Sie [Lieder](./songs.md) aus Ihrer Bibliothek direkt in die Dienstleistungsreihenfolge ein
- Verwenden Sie [Aufgaben](./tasks.md), um Nachverfolgungsaktionselemente Teammitgliedern zuzuweisen
