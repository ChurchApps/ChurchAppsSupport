---
title: "Service-Pläne"
---

# Service-Pläne

<div class="article-intro">

Service-Pläne organisieren, wer dient und wann. Jeder Plan ist an ein bestimmtes Datum und Ministerium gebunden, was es einfach macht, Ihre Freiwilligen-Teams von Woche zu Woche zu koordinieren und sicherzustellen, dass jeder Service vollständig besetzt ist.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie Ihre Ministerien und Teams im Bereich Serving ein
- Stellen Sie sicher, dass Freiwillige [Ihrem Verzeichnis](../people/adding-people.md) hinzugefügt wurden und Teams zugewiesen wurden

</div>

## Zugriff auf Pläne

1. Navigieren Sie zu **Serving** im Hauptmenü.
2. Wählen Sie einen **ministry tab** oben auf der Seite.
3. Klicken Sie auf einen **Plantyp**, um die Planliste für diesen Typ zu sehen.
4. Klicken Sie auf einen bestimmten Plan, um ihn zu öffnen.

:::info
Vollständiger Admin-Zugriff ist nicht erforderlich, um Pläne zu verwalten. Jeder, der Mitglied eines Ministeriums ist, kann zu Serving navigieren und Pläne für sein eigenes Ministerium erstellen, bearbeiten und planen, ohne die Berechtigung Plans Edit zu benötigen. Redakteure mit der Rolle Plans Edit können Pläne über alle Ministerien hinweg verwalten.
:::

## Erstellen eines Plans

1. Klicken Sie in der Plan-Typ-Ansicht auf **New Plan**.
2. Geben Sie dem Plan einen Namen oder verwenden Sie das Datum als Namen. Wählen Sie das **date** für den Service.
3. Wenn Sie aus einem vorherigen Plan kopieren möchten, wählen Sie nur Positionen oder Positionen und Zuweisungen. Wenn Sie nicht kopieren möchten, wählen Sie einfach nichts. Sie können auch die Serviceordnung aus meinem vorherigen Plan kopieren.
4. Speichern Sie den Plan. Sie können jetzt mit der Zuweisung von Teammitgliedern und dem Erstellen der [Serviceordnung](./service-order.md) beginnen.

## Die Plan-Detailseite

Wenn Sie einen Plan öffnen, sehen Sie zwei Registerkarten:

- **Assignments** — Verwalten Sie, welche Teammitglieder diesem Plan zugewiesen sind. Sie können Personen aus Ihren vorhandenen Teams hinzufügen und sehen, wer bestätigt hat oder noch ausstehend ist.
- **[Service Order](./service-order.md)** — Erstellen Sie die Serviceordnung mit Elementen wie Lobgesängen, Gebeten, Ankündigungen und der Predigt.

## Zuweisung von Teammitgliedern

1. Öffnen Sie einen Plan und gehen Sie zur Registerkarte **Assignments**.
2. Klicken Sie auf **add Position**, um es zu erweitern. Füllen Sie die Informationen im Formular zum Hinzufügen einer Position aus. Für den Kategorienamen fügen Sie eine beliebige Kategorie hinzu.
3. Klicken Sie auf **People Needed** und wählen Sie Freiwillige, um diese Position zu füllen.
4. Fügen Sie Mitglieder aus Ihrem Team-Verzeichnis hinzu, indem Sie auf **Add** klicken.
5. Zugewiesene Mitglieder werden unter ihrem Team mit ihrem Zuweisungsstatus angezeigt.
6. Klicken Sie auf Freiwillige benachrichtigen, um sie in der B1-App oder per E-Mail zu benachrichtigen.

Jede Position zeigt einen Zählchip (z. B. „2/3") an, damit Sie auf einen Blick sehen können, wie viele Plätze besetzt sind. Oben auf der Registerkarte Assignments zeigen eine Fortschrittsleiste und ein Zusammenfassungschip („X of Y positions filled") Ihren allgemeinen Personalbestand für den Plan an, wobei zu **Fully staffed** wechselt, sobald jede Position abgedeckt ist.

:::tip
Richten Sie Ihre Teams in den Ministeriumseinstellungen ein, bevor Sie Pläne erstellen. Auf diese Weise haben Sie einen bereiten Pool von Freiwilligen, um aus ihnen zu wählen.
:::

## Plan-Einstellungen

Jeder Plan hat zusätzliche Einstellungen, die Sie konfigurieren können, indem Sie auf das Bearbeitungssymbol (Stiftsymbol) auf dem Plan klicken. Dazu gehören:

- **Signup Deadline** — die Anzahl der Stunden vor dem Service, wenn sich Freiwillige abmelden. Geben Sie eine negative Zahl ein, um die Anmeldung nach der Servicestart-Zeit offen zu halten.
- **Show volunteer names on signup page** — wenn aktiviert, können Freiwillige sehen, wer sich bereits für jede Position angemeldet hat.
- **Penciled in** — verbirgt Zuweisungen vor Freiwilligen, bis Sie bereit sind, den Zeitplan zu veröffentlichen.
- **Automatically schedule a replacement when a volunteer declines** — wenn aktiviert und ein zugewiesener Freiwilliger seine Position ablehnt, kontaktiert B1 automatisch die nächste verfügbare Person in der Team-Liste und fragt, ob sie dienen können. Dies geht die Liste hinunter, bis jemand akzeptiert, füllt Ihre Positionen ohne manuelle Verfolgung auf.

## Freiwillige Erinnerungen

B1 kann Freiwillige automatisch vor den Services erinnern, für die sie eingeplant sind, daher müssen Sie Ihr Team nicht jede Woche hinterherlaufen. Erinnerungen gehen an **alle geplanten** — sowohl diejenigen, die bestätigt haben, als auch diejenigen, die noch nicht geantwortet haben — per E-Mail und als In-App-/Push-Benachrichtigung. Jede Erinnerung enthält die Positionen des Freiwilligen, das Service-Datum, die Plan-Notizen und Ihre benutzerdefinierte Nachricht.

Erinnerungszeitpunkt und -inhalt werden pro **Plantyp** eingestellt, damit jede Service-Art ihren eigenen Zeitplan einhalten kann.

1. Wählen Sie aus dem Bereich **Serving** das Ministerium aus, das den Plantyp enthält.
2. Klicken Sie auf das Symbol **edit (pencil)** neben dem Plantyp.
3. Legen Sie im Bereich **Reminders** fest:
   - **Reminder days before service** — eine kommagetrennte Liste, wie viele Tage voraus zu senden, z. B. `7,1,0`. Verwenden Sie `0`, um eine Erinnerung am Tag des Services zu senden. Lassen Sie dieses Feld leer, um Erinnerungen für diesen Plantyp zu deaktivieren.
   - **Custom reminder message** *(optional)* — zusätzlicher Text in der Erinnerung, z. B. „Kommen Sie 30 Minuten früher an, um zu proben."
4. Speichern Sie den Plantyp.

Neue Plantypen erinnern Freiwillige standardmäßig **2 Tage vor** jedem Service, bis Sie dies ändern.

:::tip
Freiwillige, die noch nicht bestätigt haben, erhalten **Accept** und **Decline** Schaltflächen direkt in der Erinnerungs-E-Mail, damit sie antworten können, ohne sich anzumelden.
:::

:::info
Jede Erinnerung wird einmal gesendet. Pläne, die noch eingegeben sind (noch nicht an das Team gesendet), auslösen keine Erinnerungen.
:::

## Zuordnung von Gruppen zu einem Plantyp

Unterhalb der Planliste auf der Seite Plantyp können Sie im Bereich **Groups** entscheiden, welche Gruppen die Pläne für diesen Plantyp über ihr Mitgliedschaftsportal sehen können. Dies ist eine schnelle Möglichkeit, bevorstehende Services an die richtigen Teams anzuzeigen, ohne ihnen Admin-Zugriff zu geben.

1. Scrollen Sie auf der Seite Plantyp nach unten zum Bereich **Groups**.
2. Klicken Sie auf **Add Group** und wählen Sie eine Gruppe aus dem Dropdown.
3. Wählen Sie in der Spalte **Shows**, ob Mitglieder dieser Gruppe **Past**, **Future** oder **Both** Pläne für diesen Plantyp sehen sollten.
4. Wiederholen Sie, um zusätzliche Gruppen zuzuordnen, oder klicken Sie auf das Papierkorbsymbol, um eine Gruppe zu entfernen.

:::info
Nur Gruppen, die als **Standard** gekennzeichnet sind, erscheinen in der Auswahl. Mitglieder einer zugeordneten Gruppe sehen automatisch die Pläne dieses Plantyps auf der Gruppenseite im B1-Mitgliedschaftsportal — beschränkt auf das Fenster Past/Future/Both, das Sie ausgewählt haben.
:::

Wenn die Pläne Lessons.church-Lektionen sind, sehen Mitglieder der zugeordneten Gruppe auch eine Karte **This week's lesson** auf der Gruppenseite (Untere Zeile, Vers und eine Frage für Eltern). Ordnen Sie hier eine Elterngruppe zu und stellen Sie den Filter auf **Past** ein, damit die heutige Lektion enthalten ist. Freiwilligen-Teams verwenden normalerweise **Future** oder **Both**.

## Drucken von Plänen

Sie können einen Plan zur Verteilung an Ihr Team drucken. Öffnen Sie den Plan, öffnen Sie die Registerkarte Serviceordnung und verwenden Sie die Option **Print**, um eine druckbare Version zu generieren, die Zuweisungen und Serviceordnung enthält. Dies ist nützlich, um bei Proben auszuteilen oder in einem gemeinsamen Bereich zu posten.

:::info
Pläne sind nach Ministerium organisiert. Stellen Sie sicher, dass Sie auf der richtigen Ministeriums-Registerkarte sind, bevor Sie Pläne erstellen oder anzeigen.
:::

## Nächste Schritte

- Verwenden Sie die [Plans Overview](./plans-overview.md), um alle bevorstehenden Zuweisungen über mehrere Wochen in einem Raster anzuzeigen und unausgefüllte Positionen zu finden — und weisen Sie Freiwillige direkt aus dem Raster zu
- Speichern Sie die Struktur eines Plans als [Plan Template](./plan-templates.md), damit Sie ihn mit einem Klick auf zukünftige Pläne stempeln können
- Erstellen Sie Ihre [Serviceordnung](./service-order.md) mit Liedern, Lesungen und anderen Elementen
- Addieren Sie [Songs](./songs.md) aus Ihrer Bibliothek direkt in die Serviceordnung
- Verwenden Sie [Tasks](./tasks.md), um Folgemaßnahmen an Teammitglieder zuzuweisen
- Zeigen Sie aktuellen Unterrichtsinhalt auf einem Lobby-TV mit [Digital Signage](./digital-signage.md) an
