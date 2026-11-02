---
title: "Dienstpläne"
---

# Dienstpläne

<div class="article-intro">

Dienstpläne organisieren, wer wann dient. Jeder Plan ist an ein bestimmtes Datum und einen bestimmten Dienstbereich gebunden. So koordinieren Sie Ihre Ehrenamtsteams Woche für Woche und stellen sicher, dass jeder Gottesdienst vollständig besetzt ist.

</div>

## Schulungsvideo

<YouTube id="47DstBXKl74" title="Pläne erstellen und Ehrenamtliche einteilen in B1" next="Gottesdienstablauf und Liedbibliothek in B1 aufbauen" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre Dienstbereiche und Teams im Bereich Dienst ein
- Stellen Sie sicher, dass Ehrenamtliche in Ihrem [Personenverzeichnis](../people/adding-people.md) erfasst und Teams zugeordnet sind

</div>

## Auf Pläne zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Dienst** auf und klicken Sie auf **Pläne**.
2. Wählen Sie oben auf der Seite einen **Dienstbereich-Reiter** aus.
3. Klicken Sie auf einen **Plantyp**, um die Pläne dieses Typs zu sehen. Verwenden Sie **Kommende** und **Vergangene** oberhalb der Liste, um zwischen künftigen und früheren Plänen zu wechseln. **Kommende** listet Pläne ab heute auf, den nächsten zuerst, Pläne ohne Datum am Ende. **Vergangene** listet nur frühere Pläne, den neuesten zuerst.
4. Klicken Sie auf einen bestimmten Plan, um ihn zu öffnen.

Jede Planseite enthält Links zurück zu ihrem Plantyp und zu **Pläne**, sodass Sie ohne die Zurück-Schaltfläche des Browsers nach oben navigieren können.

:::info
Für die Verwaltung von Plänen ist kein vollständiger Administratorzugriff nötig. Jedes Mitglied eines Dienstbereichs kann zum Dienst navigieren und Pläne für den eigenen Dienstbereich anlegen, bearbeiten und planen, ohne die Berechtigung „Pläne bearbeiten“ zu benötigen. Bearbeitende mit der Rolle „Pläne bearbeiten“ können Pläne in allen Dienstbereichen verwalten.
:::

## Einen Plan anlegen

1. Klicken Sie auf der Seite des Plantyps oben auf **Neuer Plan**.
2. Geben Sie dem Plan einen Namen oder verwenden Sie das Datum als Namen. Wählen Sie das **Datum** des Gottesdienstes.
3. Wenn Ihr Dienstbereich [Vorlagen](./plan-templates.md) hat, können Sie unter **Aus Vorlage starten** eine auswählen, um Gottesdienstablauf, Positionen und Notizen in einem Schritt zu übernehmen.
4. Andernfalls können Sie mit **Von vorherigem Plan kopieren** aus einem früheren Plan kopieren, und zwar **Nur Positionen** oder **Positionen und Einteilungen**. Möchten Sie nicht kopieren, wählen Sie **Nichts**. Außerdem können Sie **Gottesdienstablauf kopieren** aktivieren. Beim Kopieren aus einem früheren Plan übernimmt der neue Plan auch dessen **Notizen**, **Anmeldefrist**, die Einstellung **Namen der Ehrenamtlichen auf der Anmeldeseite anzeigen** und die Einstellung zur automatischen Ersatzbesetzung, sodass Sie sie nicht jede Woche neu eingeben müssen. Sie können alles davon in den Einstellungen des neuen Plans ändern.
5. Um beim Kopieren gleich mehrere Pläne anzulegen, wählen Sie **Wiederholen alle** und **Häufigkeit** (Tag, Woche oder Monat) und geben Sie dann die **Anzahl der Pläne** ein (bis zu 12). Bei Monat erlaubt **Am** entweder denselben Tag des Monats oder denselben Wochentag beizubehalten, etwa den zweiten Samstag. B1 listet die Termine vor dem Speichern auf und legt für jeden Termin einen Plan an, jeweils kopiert aus dem vorherigen. Ist der Plan nach seinem Datum benannt, erhält jeder neue Plan den Namen seines eigenen Datums.
6. Legen Sie optional die **Anmeldefrist (Stunden vor dem Gottesdienst)** fest. Ein neuer Plan übernimmt die Frist des vorherigen Plans, die Sie hier ändern können. Lassen Sie das Feld leer für keine Frist. Wie die Frist berechnet wird, erfahren Sie unter [Planeinstellungen](#plan-settings).
7. Speichern Sie den Plan. Sie können nun Teammitglieder zuweisen und den [Gottesdienstablauf](./service-order.md) aufbauen.

:::tip
Die Einstellungen zur Wiederholung sind nur verfügbar, während Sie etwas aus dem vorherigen Plan kopieren (Positionen, Einteilungen oder den Gottesdienstablauf).
:::

## Die Detailseite des Plans

Wenn Sie einen Plan öffnen, erscheinen oben Name, Dienstbereich, Plantyp und Datum des Gottesdienstes, mit den Schaltflächen **Bearbeiten** und **Drucken**. Darunter befindet sich alles auf einer einzigen Seite:

- **[Gottesdienstablauf](./service-order.md)** – Erstellen Sie den Ablauf mit Elementen wie Lobpreisliedern, Gebeten, Ankündigungen und der Predigt.
- **Einteilung des Dienstteams** – Verwalten Sie, welche Teammitglieder diesem Plan zugewiesen sind. Sie können Personen aus Ihren bestehenden Teams hinzufügen und sehen, wer bestätigt hat oder noch ausstehend ist. Links oberhalb der Positionen öffnen die **Notizen** und **Zeiten** des Plans.

## Teammitglieder zuweisen {#assigning-team-members}

1. Öffnen Sie einen Plan und scrollen Sie zu **Einteilung des Dienstteams**.
2. Klicken Sie auf **Position hinzufügen**. Füllen Sie die Angaben im Formular zur Position aus. Als Kategorienamen können Sie beliebige Kategorien verwenden. Damit jede Person in Ihrer Kirche die Position übernehmen kann (nicht nur Mitglieder eines Teams), lassen Sie **Ehrenamtsgruppe** auf **Keine**.
3. Klicken Sie auf **Benötigte Personen** und wählen Sie Ehrenamtliche für diese Position aus. Hat die Position eine **Ehrenamtsgruppe**, wählen Sie aus den Mitgliedern dieser Gruppe. Ist deren Ehrenamtsgruppe auf **Keine** gesetzt, können Sie stattdessen nach jeder Person Ihrer Kirche suchen.
4. Fügen Sie Mitglieder aus Ihrer Teamliste hinzu, indem Sie auf **Hinzufügen** klicken.
5. Zugewiesene Mitglieder erscheinen unter ihrem Team mit ihrem Einteilungsstatus.
6. Klicken Sie auf **Ehrenamtliche benachrichtigen**, um sie innerhalb der B1-App oder per E-Mail zu informieren. Verwendet der Plan einen [Bestätigungs-Workflow](#plan-settings), startet das Benachrichtigen außerdem eine Workflow-Karte, die jede Anfrage verfolgt, bis die Ehrenamtliche oder der Ehrenamtliche antwortet.

Jede Position zeigt einen Zähl-Chip (zum Beispiel „2/3“), damit Sie auf einen Blick sehen, wie viele Plätze besetzt sind. Unter der Überschrift **Einteilung des Dienstteams** zeigt eine Zusammenfassung („X von Y Positionen besetzt“) die Gesamtbesetzung des Plans, einschließlich der noch benötigten Personen, und wechselt zu **Vollständig besetzt**, sobald jede Position abgedeckt ist.

:::tip
Richten Sie Ihre Teams in den Einstellungen des Dienstbereichs ein, bevor Sie Pläne anlegen. So haben Sie einen fertigen Pool an Ehrenamtlichen, aus dem Sie einteilen können.
:::

### Positionen in einen leeren Plan kopieren

Hat ein Plan noch keine Positionen und gibt es einen früheren Plan desselben Typs, erscheint in der **Einteilung des Dienstteams** ein Link **Von vorherigem Plan kopieren**. Wählen Sie **Nur Positionen** oder **Positionen und Einteilungen**, um den geöffneten Plan mit den Positionen (und Ehrenamtlichen) des vorherigen Plans zu füllen. Die Kopie landet im aktuellen Plan; es wird kein zweiter Plan für dasselbe Datum angelegt.

## Planeinstellungen {#plan-settings}

Jeder Plan hat weitere Einstellungen, die Sie konfigurieren können, indem Sie in der Liste des Plantyps neben dem Plan auf **Bearbeiten** klicken oder oben auf der Planseite die Schaltfläche **Bearbeiten** verwenden. Klicken Sie auf **Fertig** (oder auf den Namen des Plans), um zum Plan zurückzukehren. Dazu gehören:

- **Anmeldefrist (Stunden vor dem Gottesdienst)** – die Anzahl der Stunden vor dem Gottesdienst, zu denen die Anmeldung der Ehrenamtlichen schließt. Die Stunden werden vom ersten **Gottesdienst**-Termin des Plans rückwärts gezählt (Proben und andere Termine werden übersprungen, sofern der Plan nichts anderes hat). Eine Frist von 2 Stunden bei einem Gottesdienst um 10:00 Uhr schließt die Anmeldung also am selben Morgen um 8:00 Uhr. Hat der Plan keine Termine, wird die Frist ab 9:00 Uhr am Datum des Gottesdienstes in der Zeitzone Ihrer Kirche gerechnet. Ist sie abgelaufen, können sich Ehrenamtliche weder anmelden noch austragen. Geben Sie eine negative Zahl ein, um Anmeldungen über den Gottesdienstbeginn hinaus offen zu halten. Lassen Sie das Feld leer oder löschen Sie es für keine Frist.
- **Bestätigungs-Workflow** – wählen Sie einen [Workflow für die Bestätigung von Dienstaufgaben](./workflows.md#serving-assignment-confirmations), der die Dienstanfragen dieses Plans per E-Mail und Textnachricht nachverfolgt, bis jede Ehrenamtliche oder jeder Ehrenamtliche annimmt oder ablehnt. Wenn Sie den veröffentlichten Plan **benachrichtigen**, erhält jede neue Anfrage eine eigene Karte auf dem Board dieses Workflows, und ein Hinweis über dem Benachrichtigungslink lautet *„Neue Anfragen verwenden den Bestätigungs-Workflow.“* Belassen Sie es bei **Bestehende Einteilungsbenachrichtigungen verwenden**, um die üblichen Benachrichtigungen beizubehalten. In der Liste erscheinen nur aktive Bestätigungs-Workflows; legen Sie zuerst einen unter **Dienst > Workflows** an.
- **Namen der Ehrenamtlichen auf der Anmeldeseite anzeigen** – ist die Option aktiviert, können angemeldete Ehrenamtliche auf der Anmeldeseite auf B1.church sehen, wer sich bereits für jede Position eingetragen hat. Namen werden Besuchern, die nicht angemeldet sind, nie angezeigt.
- **Vorläufig eingeplant** – blendet die Einteilungen vor den Ehrenamtlichen aus, bis Sie bereit sind, den Plan zu veröffentlichen.
- **Automatisch Ersatz einplanen, wenn eine Ehrenamtliche oder ein Ehrenamtlicher ablehnt** – ist die Option aktiviert, kontaktiert B1 bei einer Ablehnung automatisch die nächste verfügbare Person aus der Teamliste und fragt, ob sie dienen kann. Dies wiederholt sich die Liste hinunter, bis jemand annimmt, sodass Ihre Positionen ohne manuelles Nachfassen besetzt bleiben.

:::tip
Auf der Anmeldeseite für Mitglieder sind die offenen Positionen jedes Plans nach Kategorie und dann nach Name aufgelistet. Mitglieder sehen jede kommende Woche mit offenen Positionen, es sei denn, Sie aktivieren **Nur die nächste Woche jedes Plantyps anzeigen** unter [Einstellungen > Ehrenamtliche Anmeldung](../settings/church-settings.md#volunteer-signup).
:::

## Erinnerungen für Ehrenamtliche {#volunteer-reminders}

B1 kann Ehrenamtliche automatisch vor den Gottesdiensten erinnern, für die sie eingeplant sind, sodass Sie Ihr Team nicht jede Woche einzeln verfolgen müssen. Erinnerungen gehen an **alle eingeplanten Personen** – sowohl an jene, die bestätigt haben, als auch an jene, die noch nicht geantwortet haben. Eine Ausnahme bildet eine Anfrage, die über einen [Bestätigungs-Workflow](./workflows.md#serving-assignment-confirmations) gesendet wurde: Diese Ehrenamtliche erhält Erinnerungen erst, nachdem sie angenommen hat, da der Workflow das Nachfassen bis dahin übernimmt. Jede Erinnerungs-E-Mail enthält die Position(en) der Ehrenamtlichen, das Datum des Gottesdienstes, die Notizen des Plans und Ihre eigene Nachricht.

Zeitpunkt und Inhalt der Erinnerungen werden je **Plantyp** festgelegt, sodass jede Art von Gottesdienst ihren eigenen Zeitplan haben kann.

1. Wählen Sie im Bereich **Dienst** den Dienstbereich, der den Plantyp enthält.
2. Klicken Sie in der Liste **Plantypen** neben dem Plantyp auf **Bearbeiten**.
3. Klappen Sie den Abschnitt **Erinnerungen** auf und aktivieren Sie **Erinnerungen für Pläne dieses Typs senden**.
4. Wählen Sie unter **Wann sollen Erinnerungen versendet werden?** bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **2 Tage vorher**, **1 Tag vorher** oder **Am Tag selbst**.
5. Legen Sie die **Uhrzeit**fest, zu der die Erinnerungen versendet werden.
6. Fügen Sie optional eine **Nachricht** hinzu. Lassen Sie das Feld leer, um den Standardtext der Erinnerung zu verwenden.
7. Wählen Sie unter **Versand über** **Push**, **E-Mail** und – falls Ihre Kirche einen [Anbieter für Textnachrichten](../settings/church-settings.md#texting) verbunden hat – **Text**.
8. Klicken Sie auf **Erinnerungen speichern**.

Für einen Plantyp sind Erinnerungen ausgeschaltet, bis Sie sie aktivieren.

:::tip
Ehrenamtliche, die noch nicht bestätigt haben, erhalten direkt in der Erinnerungs-E-Mail die Schaltflächen **Annehmen** und **Ablehnen**, sodass sie ohne Anmeldung antworten können.
:::

### Textnachrichten-Erinnerungen {#text-reminders}

Die Option **Text** erscheint nur, wenn Ihre Kirche einen Anbieter für Textnachrichten verbunden hat. Textnachrichten werden über den Anbieter Ihrer Kirche versendet, und jede Nachricht kann Ihre Kirche Geld kosten. Eine Ehrenamtliche oder ein Ehrenamtlicher erhält nur dann eine Textnachricht als Erinnerung, wenn sie oder er unter den [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **Textnachrichten** aktiviert hat und auf dem Profil eine Mobilnummer hinterlegt ist. Jede Nachricht beginnt mit dem Namen Ihrer Kirche, bleibt auf eine einzige Textnachricht beschränkt und endet mit „Mit STOP antworten, um sich abzumelden.“ Wer mit STOP antwortet, erhält keine Textnachrichten mehr von Ihrer Kirche. Damit Antworten mit STOP bei B1 ankommen, fügen Sie die **URL des eingehenden Webhooks (STOP)** aus Ihren [Einstellungen für Textnachrichten](../settings/church-settings.md#texting) in den Webhook für eingehende Nachrichten Ihres Anbieters ein.

Um allen eingeplanten Personen über einen Datumsbereich sofort eine Textnachricht zu senden, verwenden Sie **Ehrenamtliche per Text erreichen** in der [Plan-Übersicht](./plans-overview.md#texting-everyone-scheduled).

:::info
Jede Erinnerung wird einmal gesendet. Textnachrichten-Erinnerungen werden zusätzlich zu Push und E-Mail versendet, nicht stattdessen.
:::

## Dienstbereiche mit einem Plantyp verknüpfen

Unterhalb der Planliste auf der Seite des Plantyps legt der Abschnitt **Verknüpfte Gruppen** fest, welche Gruppen die Pläne dieses Plantyps in ihrem Mitgliederbereich sehen können. So bringen Sie kommende Gottesdienste schnell zu den richtigen Teams, ohne diesen Administratorzugriff zu geben.

1. Klicken Sie auf der Seite des Plantyps oben auf **Verknüpfte Gruppen** (oder scrollen Sie zu diesem Abschnitt).
2. Klicken Sie auf **Gruppe hinzufügen** und wählen Sie eine Gruppe aus dem Dropdown-Menü.
3. Wählen Sie in der Spalte **Zeigt** aus, ob Mitglieder dieser Gruppe für diesen Plantyp **Nur vergangene Pläne**, **Nur kommende Pläne** oder **Vergangene und kommende Pläne** sehen sollen.
4. Wiederholen Sie dies, um weitere Gruppen zu verknüpfen, oder klicken Sie auf das Papierkorbsymbol, um eine Gruppe zu entfernen.

:::info
Nur Gruppen mit der Kennzeichnung **Standard** erscheinen in der Auswahl. Mitglieder einer verknüpften Gruppe sehen die Pläne dieses Plantyps automatisch auf der Seite der Gruppe im B1-Mitgliederbereich – beschränkt auf den von Ihnen gewählten Zeitraum.
:::

Handelt es sich bei den Plänen um Lektionen von Lessons.church, sehen Mitglieder der verknüpften Gruppe außerdem auf der Seite der Gruppe eine Karte **Die Lektion dieser Woche** (Kernaussage, Bibelvers und eine Frage für Eltern). Verknüpfen Sie hier eine Elterngruppe und stellen Sie den Filter auf **Nur vergangene Pläne**, damit die heutige Lektion enthalten ist. Ehrenamtsteams verwenden meist **Nur kommende Pläne** oder **Vergangene und kommende Pläne**.

## Pläne drucken {#printing-plans}

Sie können einen Plan an Ihr Team verteilen, indem Sie ihn drucken. Öffnen Sie den Plan und klicken Sie oben auf der Seite auf **Drucken**, um eine druckbare Version zu erzeugen, die Einteilungen und den Gottesdienstablauf enthält. Oben auf dem Ausdruck erscheint das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter sowie der Name des Plans, damit lose Seiten leicht zuzuordnen sind. Das ist nützlich für die Ausgabe bei Proben oder zum Aushang in einem Gemeinschaftsbereich.

Der Ausdruck lässt alles weg, was leer wäre. Sind keine Ehrenamtlichen eingeteilt, gibt es kein Teamfeld, und der Gottesdienstablauf nutzt die volle Seitenbreite. Hat kein Element eine Länge, entfällt die Spalte **Länge**; hat der Plan außerdem keine Gottesdienstzeiten und keine Längen, entfällt auch die Spalte **Zeit**. Um die schwarze Kopfleiste **Gottesdienstablauf** mit dem Datum des Gottesdienstes auszublenden, deaktivieren Sie auf der Druckseite oben **Überschrift „Gottesdienstablauf“ anzeigen**; B1 Admin merkt sich Ihre Wahl in diesem Browser.

:::info
Pläne sind nach Dienstbereich organisiert. Achten Sie darauf, dass Sie vor dem Anlegen oder Ansehen von Plänen auf dem richtigen Reiter des Dienstbereichs sind.
:::

## Nächste Schritte

- Verwenden Sie die [Plan-Übersicht](./plans-overview.md), um alle kommenden Einteilungen über mehrere Wochen in einem Raster zu sehen, unbesetzte Positionen zu erkennen und Ehrenamtliche direkt aus dem Raster einzuteilen
- Speichern Sie die Struktur eines Plans als [Planvorlage](./plan-templates.md), um sie mit einem Klick auf künftige Pläne anzuwenden
- Bauen Sie Ihren [Gottesdienstablauf](./service-order.md) mit Liedern, Lesungen und weiteren Elementen auf
- Fügen Sie [Lieder](./songs.md) aus Ihrer Bibliothek direkt in den Gottesdienstablauf ein
- Verwenden Sie [Aufgaben](./tasks.md), um Nachfass-Aufgaben an Teammitglieder zu verteilen
- Zeigen Sie aktuelle Lektionsinhalte mit [Digitaler Beschilderung](./digital-signage.md) auf einem Fernseher im Foyer an
