---
title: "Dienstpläne"
description: "Richten Sie die Freiwilligenplanung in B1 Admin ein: Erstellen Sie Dienstpläne nach Datum, kopieren Sie sie aus früheren Wochen, weisen Sie Teammitglieder Positionen zu und verwalten Sie Anmeldefristen und Erinnerungen."
---

# Dienstpläne {#service-plans}

<div class="article-intro">

Dienstpläne organisieren, wer wann dient. Jeder Plan ist an ein bestimmtes Datum und einen Dienstbereich gebunden, sodass Sie Ihre Freiwilligenteams Woche für Woche koordinieren und sicherstellen können, dass jeder Gottesdienst vollständig besetzt ist.

</div>

## Schulungsvideo {#training-video}

<YouTube id="47DstBXKl74" title="Pläne erstellen und Freiwillige in B1 einplanen" next="Gottesdienstordnung und Liedbibliothek in B1 aufbauen" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre Dienstbereiche und Teams im Bereich Dienste ein
- Stellen Sie sicher, dass Freiwillige im [Personenverzeichnis](../people/adding-people.md) erfasst und Teams zugeordnet sind

</div>

## Auf Pläne zugreifen {#accessing-plans}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Dienste** auf und klicken Sie auf **Pläne**.
2. Wählen Sie oben auf der Seite einen **Dienstbereich-Reiter** aus.
3. Klicken Sie auf eine **Planart**, um die Pläne dieser Art zu sehen. Mit **Anstehend** und **Vergangen** über der Liste wechseln Sie zwischen künftigen und früheren Plänen. **Anstehend** listet Pläne ab heute auf, die nächsten zuerst, Pläne ohne Datum stehen am Ende. **Vergangen** zeigt nur frühere Pläne, die neuesten zuerst.
4. Klicken Sie auf einen bestimmten Plan, um ihn zu öffnen.

Jede Planseite enthält Links zurück zu ihrer Planart und zu **Pläne**, sodass Sie ohne die Zurück-Schaltfläche des Browsers wieder nach oben gelangen.

:::info
Für die Verwaltung von Plänen ist kein voller Administratorzugang nötig. Jedes Mitglied eines Dienstbereichs kann in den Bereich Dienste wechseln und Pläne für seinen Dienstbereich erstellen, bearbeiten und planen -- ohne die Berechtigung **Pläne bearbeiten**. Bearbeitende mit der Rolle **Pläne bearbeiten** können Pläne in allen Dienstbereichen verwalten.
:::

## Einen Plan erstellen {#creating-a-plan}

1. Klicken Sie auf der Seite der Planart oben auf **Neuer Plan**. Das Formular **Plan hinzufügen** öffnet sich.
2. Geben Sie dem Plan einen Namen oder verwenden Sie das Datum als Namen. Wählen Sie das **Gottesdienstdatum**. Hat Ihre Gemeinde mehr als einen Standort, können Sie außerdem den **Standort** des Plans auswählen.
3. Wenn Ihr Dienstbereich [Vorlagen](./plan-templates.md) hat, können Sie unter **Aus Vorlage starten** eine auswählen, um Gottesdienstordnung, Positionen und Notizen in einem Schritt zu übernehmen.
4. Andernfalls können Sie mit **Aus vorherigem Plan kopieren** einen früheren Plan übernehmen und **Nur Positionen** oder **Positionen und Zuweisungen** wählen. Wenn Sie nichts kopieren möchten, wählen Sie **Nichts**. Außerdem können Sie **Gottesdienstordnung kopieren** aktivieren. Beim Kopieren aus einem früheren Plan übernimmt der neue Plan außerdem dessen **Notizen**, die **Anmeldefrist**, die Einstellung **Namen der Freiwilligen auf der Anmeldeseite anzeigen** und die Einstellung zum automatischen Ersatz, sodass Sie diese nicht jede Woche neu eintragen müssen. Sie können jede davon in den Einstellungen des neuen Plans ändern.
5. Um beim Kopieren mehrere Pläne auf einmal anzulegen, wählen Sie **Wiederholen alle** und **Häufigkeit** (Tag, Woche oder Monat) und geben Sie dann die **Anzahl der Pläne** ein (bis zu 12). Bei Monat können Sie mit **Am** denselben Tag des Monats oder denselben Wochentag beibehalten, etwa den zweiten Samstag. B1 zeigt die Termine vor dem Speichern an und erstellt für jeden Termin einen Plan, der jeweils aus dem vorherigen kopiert wird. Ist der Plan nach seinem Datum benannt, erhält jeder neue Plan den Namen seines eigenen Datums.
6. Legen Sie optional die **Anmeldefrist (Stunden vor dem Gottesdienst)** fest. Ein neuer Plan übernimmt die Frist des vorherigen Plans, und Sie können sie hier ändern. Lassen Sie das Feld leer, wenn es keine Frist geben soll. Wie die Frist berechnet wird, erfahren Sie unter [Planeinstellungen](#plan-settings).
7. Speichern Sie den Plan. Sie können nun Teammitglieder zuweisen und die [Gottesdienstordnung](./service-order.md) aufbauen.

:::tip
Die Wiederholungseinstellungen sind nur verfügbar, solange Sie etwas aus dem vorherigen Plan kopieren (Positionen, Zuweisungen oder die Gottesdienstordnung).
:::

## Die Planseite {#the-plan-page}

Wenn Sie einen Plan öffnen, erscheinen oben dessen Dienstbereich und Planart, Name und Gottesdienstdatum, daneben die Schaltflächen **Drucken** und **Details bearbeiten**. Die Seite gibt Ihnen einen Überblick über den gesamten Plan:

- Die Kacheln **Laufzeit**, **Dienst-Team** und **Rückmeldungen** zeigen die Länge der Gottesdienstordnung, wie viele Positionen besetzt sind (zum Beispiel „10 von 13 besetzt“), sowie wie viele Freiwillige zugesagt haben, noch ausstehen oder abgesagt haben.
- **Gottesdienstordnung** zeigt die ersten Punkte der [Gottesdienstordnung](./service-order.md) mit ihrer Länge. Klicken Sie auf **Gottesdienstordnung bearbeiten**, um die vollständige Gottesdienstordnung auf einer eigenen Seite zu öffnen.
- **Dienst-Team** listet jede Position nach Kategorie mit den zugewiesenen Freiwilligen und der Zahl der noch benötigten auf. Wenn etwas Aufmerksamkeit braucht, erscheint eine Zeile wie „1 Konflikt · 3 nicht benachrichtigt“ mit einem Link **Prüfen**. Klicken Sie auf **Dienst-Team verwalten**, um die vollständige Seite des Dienst-Teams zu öffnen.
- **Zeiten** listet die Gottesdienst- und Probenzeiten des Plans auf. Siehe [Gottesdienstzeiten](#service-times).
- **Notizen** enthält Notizen für das gesamte Team. Klicken Sie auf **Bearbeiten**, geben Sie Ihre Notizen ein und klicken Sie auf **Notizen speichern**.

Die Seiten für Gottesdienstordnung und Dienst-Team haben jeweils einen Link **Zurück zum Plan**, der Sie zurück zur Übersicht bringt.

## Gottesdienstzeiten {#service-times}

Zeiten teilen B1 mit, wann der Gottesdienst und eventuelle Proben stattfinden. Sie werden für die Anmeldefrist, die [Planprüfung](./plan-validation.md), Erinnerungen an Freiwillige und die Uhrzeiten in der Gottesdienstordnung verwendet.

1. Klicken Sie auf der Planseite neben **Zeiten** auf **Zeit hinzufügen**.
2. Wählen Sie den **Typ**: **Gottesdienst**, **Probe** oder **Sonstiges**.
3. Geben Sie einen **Anzeigenamen** ein (zum Beispiel „Sonntagsgottesdienst“ oder „Probe“).
4. Legen Sie die **Startzeit** und die **Endzeit** fest.
5. Aktivieren Sie unter **Benötigte Dienst-Teams** die Positionskategorien (zum Beispiel Worship oder Technik), die zu dieser Zeit dienen.
6. Klicken Sie auf **Speichern**.

Klicken Sie auf den Namen einer Zeit, um sie zu bearbeiten oder zu löschen.

## Teammitglieder zuweisen {#assigning-team-members}

1. Öffnen Sie einen Plan und klicken Sie auf **Dienst-Team verwalten**.
2. Klicken Sie auf **Position hinzufügen**. Wählen oder tippen Sie im Dialog **Position hinzufügen** einen **Kategorienamen** ein (zum Beispiel Worship oder Hospitality), geben Sie den **Namen** der Position und die **Anzahl der Freiwilligen** an und wählen Sie eine **Freiwilligengruppe**. Damit jede Person in Ihrer Gemeinde die Position besetzen kann (nicht nur Mitglieder eines bestimmten Teams), lassen Sie **Freiwilligengruppe** auf **Keine** stehen. Aktivieren Sie **Selbstanmeldung erlauben**, damit sich Freiwillige selbst für offene Plätze eintragen können, und ergänzen Sie optional eine **Beschreibung**, die Freiwillige sehen, wenn sie Anmeldemöglichkeiten durchsuchen. Klicken Sie auf **Speichern**.
3. Klicken Sie neben der Position auf den Link **Benötigte Personen** (zum Beispiel „2 benötigte Personen“).
4. Klicken Sie im Dialog **Position zuweisen** auf den Namen eines Teammitglieds, um es zuzuweisen. Bei einem großen Team geben Sie einen Teil eines Namens in **Team durchsuchen** ein, um die Liste einzugrenzen; die Liste scrollt selbstständig, sodass **Fertig** sichtbar bleibt. Teammitglieder mit einem [Sperrtermin](./plan-validation.md#blockout-dates) am Datum des Plans zeigen ein Abzeichen **Nicht verfügbar** und stehen ganz unten. Ist die Freiwilligengruppe der Position auf **Keine** gesetzt, suchen Sie stattdessen nach jemandem in Ihrer Gemeinde und klicken Sie auf das Symbol Person hinzufügen neben der Person. Klicken Sie auf **Fertig**, wenn Sie fertig sind.
5. Zugewiesene Freiwillige erscheinen neben der Position. Ein grüner Punkt auf ihrem Bild bedeutet, dass sie zugesagt haben, ein roter Punkt, dass sie abgesagt haben. Ein Abzeichen **Nicht verfügbar** bedeutet, dass sie das Datum des Plans gesperrt haben.
6. Benachrichtigen Sie die Freiwilligen über den Bereich **Prüfung** (siehe [Freiwillige benachrichtigen](./plan-validation.md#notifying-volunteers)). Verwendet der Plan einen [Bestätigungs-Workflow](#plan-settings), startet die Benachrichtigung zusätzlich eine Workflow-Karte, die jede Anfrage verfolgt, bis der Freiwillige antwortet.

Um eine Zuweisung zu ändern oder zu entfernen, klicken Sie auf den Namen des Freiwilligen und dann im Dialog **Zuweisung bearbeiten** auf **Löschen**. Um eine Position zu ändern, klicken Sie auf ihren Namen; **Löschen** im Dialog **Position bearbeiten** entfernt die Position und hebt die Einplanung aller dort eingeplanten Personen auf.

Jede Position zeigt eine Zählmarke (zum Beispiel „2/3“ oder „1/2 Anmeldung“ bei Positionen mit Selbstanmeldung), damit Sie auf einen Blick sehen, wie viele Plätze besetzt sind. Oben auf der Seite des Dienst-Teams zeigt eine Zusammenfassung („X von Y Positionen besetzt“) die Gesamtbesetzung des Plans, zusammen mit der Anzahl der noch benötigten Personen. Sobald jede Position besetzt ist, wechselt sie zu **Vollständig besetzt**.

:::tip
Richten Sie Ihre Teams in den Einstellungen des Dienstbereichs ein, bevor Sie Pläne erstellen. So haben Sie einen fertigen Pool an Freiwilligen, aus dem Sie zuweisen können.
:::

### Automatisch zuweisen {#auto-assign}

Klicken Sie auf der Seite des Dienst-Teams auf **Automatisch zuweisen**, um jeden offenen Platz aus der Freiwilligengruppe der Position zu besetzen. Positionen ohne Freiwilligengruppe werden übersprungen. Um die gerade hinzugefügten Freiwilligen wieder zurückzunehmen, klicken Sie auf **Automatische Zuweisung rückgängig machen**. Sie können auch viele Pläne auf einmal über die [Planübersicht](./plans-overview.md#auto-scheduling-from-the-overview) besetzen.

### Einplanungspräferenzen {#scheduling-preferences}

Klicken Sie im Dialog **Position zuweisen** neben einem Teammitglied auf das Schieberegler-Symbol, um dessen **Einplanungspräferenzen** festzulegen: **Maximale Anzahl pro Monat**, **Bevorzugte Gottesdienstzeiten** und **Haushaltsplanung** (den Haushalt gemeinsam einplanen oder nicht am selben Tag). Die [Planprüfung](./plan-validation.md) warnt Sie, wenn eine Zuweisung dagegen verstößt.

### Positionen in einen leeren Plan kopieren {#copying-positions-into-an-empty-plan}

Hat ein Plan noch keine Positionen und gibt es einen früheren Plan derselben Planart, erscheint auf der Seite des Dienst-Teams der Link **Aus vorherigem Plan kopieren**. Wählen Sie **Nur Positionen** oder **Positionen und Zuweisungen**, um den geöffneten Plan mit den Positionen (und Freiwilligen) des vorherigen Plans zu füllen. Die Kopie landet im aktuellen Plan; es wird kein zweiter Plan für denselben Termin angelegt.

## Planeinstellungen {#plan-settings}

Jeder Plan hat weitere Einstellungen, die Sie festlegen können, indem Sie in der Liste der Planart neben dem Plan auf **Bearbeiten** oder oben auf der Planseite auf **Details bearbeiten** klicken. Klicken Sie auf **Fertig** (oder auf den Namen des Plans über dem Formular), um zum Plan zurückzukehren. Dasselbe Formular hat eine Schaltfläche **Löschen**, die den Plan einschließlich Positionen, Zuweisungen und Gottesdienstordnung löscht. Zu den Einstellungen gehören:

- **Anmeldefrist (Stunden vor dem Gottesdienst)** -- die Anzahl der Stunden vor dem Gottesdienst, zu denen die Anmeldung der Freiwilligen schließt. Die Stunden werden ab der ersten **Gottesdienst**-Zeit des Plans zurückgerechnet (Proben und andere Zeiten werden übersprungen, sofern der Plan nichts anderes hat). Eine Frist von 2 Stunden bei einem Gottesdienst um 10:00 Uhr schließt die Anmeldung also am selben Morgen um 8:00 Uhr. Hat der Plan keine Zeiten, wird die Frist ab 9:00 Uhr am Gottesdienstdatum in der Zeitzone Ihrer Gemeinde gerechnet. Ist sie abgelaufen, können sich Freiwillige weder anmelden noch austragen. Geben Sie eine negative Zahl ein, damit Anmeldungen über den Gottesdienstbeginn hinaus offen bleiben. Lassen Sie das Feld leer oder löschen Sie den Wert, damit es keine Frist gibt.
- **Bestätigungs-Workflow** -- wählen Sie einen [Workflow „Bestätigung einer Dienstzuweisung“](./workflows.md#serving-assignment-confirmations), um die Dienstanfragen dieses Plans per E-Mail und SMS nachzuverfolgen, bis jeder Freiwillige zugesagt oder abgesagt hat. Wenn Sie Freiwillige im veröffentlichten Plan **benachrichtigen**, erhält jede neue Anfrage eine eigene Karte auf dem Board dieses Workflows, und ein Hinweis über dem Benachrichtigungslink lautet *„Neue Anfragen verwenden den Bestätigungs-Workflow.“* Belassen Sie es bei **Vorhandene Zuweisungsbenachrichtigungen verwenden**, um die üblichen Benachrichtigungen zu behalten. In der Liste erscheinen nur aktive Bestätigungs-Workflows; legen Sie zuerst unter **Dienste > Workflows** einen an.
- **Namen der Freiwilligen auf der Anmeldeseite anzeigen** -- ist das Kästchen aktiviert, können angemeldete Freiwillige auf der Anmeldeseite von B1.church sehen, wer sich bereits für jede Position eingetragen hat. Namen werden Besuchern, die nicht angemeldet sind, nie angezeigt. Diese Einstellung legt außerdem fest, ob die Freiwilligen, die jeden Punkt der Gottesdienstordnung betreuen, daneben gedruckt werden (siehe [Pläne drucken](#printing-plans)).
- **Vorläufig eingeplant** -- verbirgt die Zuweisungen vor den Freiwilligen, bis Sie den Dienstplan veröffentlichen möchten. Solange ein Plan vorläufig eingeplant ist, zeigt der Bereich **Prüfung** auf der Seite des Dienst-Teams eine Schaltfläche **Plan veröffentlichen** (oder **Veröffentlichen und benachrichtigen**, wenn Freiwillige noch nicht benachrichtigt wurden), die die Zuweisungen sichtbar macht.
- **Automatisch einen Ersatz einplanen, wenn ein Freiwilliger absagt** -- ist das Kästchen aktiviert, kontaktiert B1 bei einer Absage eines zugewiesenen Freiwilligen automatisch die nächste verfügbare Person aus der Teamliste und fragt, ob sie dienen kann. Dies wiederholt sich die Liste hinunter, bis jemand zusagt, sodass Ihre Positionen ohne manuelles Nachfassen besetzt bleiben.

:::tip
Auf der Anmeldeseite für Mitglieder sind die offenen Positionen jedes Plans nach Kategorie und dann nach Namen sortiert. Mitglieder sehen jede kommende Woche mit offenen Positionen, sofern Sie unter [Einstellungen > Volunteer Signup](../settings/church-settings.md#volunteer-signup) nicht die Option **Nur die nächste Woche jeder Planart anzeigen** aktivieren.
:::

## Erinnerungen an Freiwillige {#volunteer-reminders}

B1 kann Freiwillige automatisch vor den Gottesdiensten erinnern, für die sie eingeplant sind, sodass Sie Ihr Team nicht jede Woche einzeln hinterherlaufen müssen. Erinnerungen gehen an **alle Eingeplanten** -- sowohl an diejenigen, die bestätigt haben, als auch an diejenigen, die noch nicht geantwortet haben. Ausnahme ist eine Anfrage, die über einen [Bestätigungs-Workflow](./workflows.md#serving-assignment-confirmations) versandt wurde: Diese Freiwilligen erhalten erst nach der Zusage Erinnerungen, da der Workflow bis dahin das Nachfassen übernimmt. Jede Erinnerungs-E-Mail enthält die Position(en) des Freiwilligen, das Gottesdienstdatum, die Notizen des Plans und Ihre eigene Nachricht.

Timing und Inhalt der Erinnerungen werden je **Planart** festgelegt, sodass jede Art von Gottesdienst ihren eigenen Zeitplan haben kann.

1. Wählen Sie im Bereich **Dienste** den Dienstbereich, der die Planart enthält.
2. Klicken Sie in der Liste **Planarten** neben der Planart auf **Bearbeiten**.
3. Klappen Sie den Bereich **Erinnerungen** auf und aktivieren Sie **Erinnerungen für Pläne dieser Art senden**.
4. Wählen Sie unter **Wann sollen Erinnerungen versendet werden?** bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **2 Tage vorher**, **1 Tag vorher** oder **Am Tag selbst**.
5. Legen Sie die **Uhrzeit** fest, zu der die Erinnerungen versendet werden.
6. Ergänzen Sie optional eine **Nachricht**. Lassen Sie das Feld leer, um den Standardtext der Erinnerung zu verwenden.
7. Wählen Sie unter **Senden über** **Push**, **E-Mail** und, falls bei Ihrer Gemeinde ein [SMS-Anbieter](../settings/church-settings.md#texting) verbunden ist, **SMS**.
8. Klicken Sie auf **Erinnerungen speichern**.

Erinnerungen sind für eine Planart so lange ausgeschaltet, bis Sie sie aktivieren.

:::tip
Freiwillige, die noch nicht bestätigt haben, erhalten **Zusagen**- und **Absagen**-Schaltflächen direkt in der Erinnerungs-E-Mail, sodass sie ohne Anmeldung antworten können.
:::

### SMS-Erinnerungen {#text-reminders}

Die Option **SMS** erscheint nur, wenn bei Ihrer Gemeinde ein SMS-Anbieter verbunden ist. SMS werden über den SMS-Anbieter Ihrer Gemeinde versendet, und jede SMS kann Ihrer Gemeinde Kosten verursachen. Eine SMS-Erinnerung erreicht einen Freiwilligen nur, wenn er unter seinen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) die **Textnachrichten** aktiviert hat und eine Mobilnummer in seinem Profil hinterlegt ist. Jede SMS beginnt mit dem Namen Ihrer Gemeinde, bleibt auf eine einzelne SMS beschränkt und endet mit „Antworten Sie mit STOP, um sich abzumelden.“ Wer mit STOP antwortet, erhält keine SMS mehr von Ihrer Gemeinde. Damit STOP-Antworten B1 erreichen, fügen Sie die **Eingehende (STOP-)Webhook-URL** aus Ihren [SMS-Einstellungen](../settings/church-settings.md#texting) in den eingehenden Nachrichten-Webhook Ihres Anbieters ein.

Um allen Eingeplanten über einen Datumsbereich sofort eine SMS zu senden, nutzen Sie **Freiwillige per SMS anschreiben** in der [Planübersicht](./plans-overview.md#texting-everyone-scheduled).

:::info
Jede Erinnerung wird einmal gesendet. SMS-Erinnerungen werden zusätzlich zu Push und E-Mail versandt, nicht stattdessen.
:::

## Planarten mit Gruppen verknüpfen {#associating-groups-with-a-plan-type}

Unterhalb der Planliste auf der Seite der Planart können Sie im Bereich **Zugeordnete Gruppen** festlegen, welche Gruppen die Pläne dieser Planart über ihr Mitgliederportal sehen können. So bringen Sie kommende Gottesdienste schnell zu den richtigen Teams, ohne diesen Administratorzugang zu geben.

1. Klicken Sie auf der Seite der Planart oben auf **Zugeordnete Gruppen** (oder scrollen Sie zu diesem Bereich).
2. Klicken Sie auf **Gruppe hinzufügen** und wählen Sie im Dropdown eine Gruppe aus.
3. Wählen Sie in der Spalte **Zeigt**, ob Mitglieder dieser Gruppe **Nur vergangene Pläne**, **Nur kommende Pläne** oder **Vergangene und kommende Pläne** für diese Planart sehen sollen.
4. Wiederholen Sie dies, um weitere Gruppen zu verknüpfen, oder klicken Sie auf das Papierkorb-Symbol, um eine Gruppe zu entfernen.

:::info
Nur Gruppen mit der Kennzeichnung **Standard** erscheinen in der Auswahl. Mitglieder einer verknüpften Gruppe sehen die Pläne dieser Planart automatisch auf der Seite der Gruppe im Mitgliederportal von B1 -- beschränkt auf den von Ihnen gewählten Zeitraum.
:::

Handelt es sich bei den Plänen um Lektionen von Lessons.church, sehen Mitglieder der verknüpften Gruppe außerdem auf der Seite der Gruppe eine Karte **Lektion dieser Woche** (Kernaussage, Bibelvers und eine Frage für Eltern). Verknüpfen Sie hier eine Elterngruppe und stellen Sie den Filter auf **Nur vergangene Pläne**, damit die heutige Lektion enthalten ist. Volunteer-Teams nutzen meist **Nur kommende Pläne** oder **Vergangene und kommende Pläne**.

## Pläne drucken {#printing-plans}

Sie können einen Plan für Ihr Team ausdrucken. Öffnen Sie den Plan und klicken Sie oben auf der Seite auf **Drucken**, um eine druckbare Version mit Einsätzen und Gottesdienstordnung zu erzeugen. Oben im Ausdruck erscheint das Logo Ihrer Gemeinde (das **Logo für helle Hintergründe** aus [Website > Appearance](../website/appearance.md), sofern Sie eines hochgeladen haben) mit dem Namen Ihrer Gemeinde darunter sowie der Name des Plans, damit einzelne Blätter leicht zuzuordnen sind. Das ist praktisch zum Verteilen bei Proben oder zum Aushängen in einem Gemeinschaftsraum.

Hat der Plan mehr als eine Gottesdienstzeit, enthält der Ausdruck für jeden Gottesdienst eine Zeitspalte, die mit der jeweiligen Startzeit überschrieben ist. Ein Punkt, der aus einem Gottesdienst ausgeschlossen wurde (siehe [Punkte bestimmten Gottesdienstzeiten zuordnen](./service-order.md#including-items-in-specific-service-times)), zeigt in der Spalte dieses Gottesdienstes einen Strich.

Der Ausdruck lässt alles weg, was leer wäre. Ist niemand zugewiesen, gibt es keinen Teamkasten, und die Gottesdienstordnung nutzt die volle Seitenbreite. Hat kein Punkt eine Länge, entfällt die Spalte **Länge**; hat der Plan außerdem keine Gottesdienstzeiten und keine Längen, entfällt auch die Spalte **Zeit**. Um die schwarze Kopfleiste **Gottesdienstordnung** mit dem Gottesdienstdatum auszublenden, deaktivieren Sie auf der Druckseite oben **Kopfzeile Gottesdienstordnung anzeigen**; B1 Admin merkt sich Ihre Auswahl für diesen Browser.

:::info
Pläne sind nach Dienstbereich organisiert. Achten Sie darauf, dass Sie den richtigen Reiter des Dienstbereichs ausgewählt haben, bevor Sie Pläne erstellen oder ansehen.
:::

## Nächste Schritte {#next-steps}

- Nutzen Sie die [Planübersicht](./plans-overview.md), um alle kommenden Einsätze über mehrere Wochen in einem Raster zu sehen, unbesetzte Positionen zu erkennen und Freiwillige direkt aus dem Raster einzuplanen
- Speichern Sie den Aufbau eines Plans als [Planvorlage](./plan-templates.md), damit Sie ihn mit einem Klick auf künftige Pläne übertragen können
- Bauen Sie Ihre [Gottesdienstordnung](./service-order.md) mit Liedern, Lesungen und anderen Elementen auf
- Fügen Sie [Lieder](./songs.md) aus Ihrer Bibliothek direkt in die Gottesdienstordnung ein
- Nutzen Sie [Aufgaben](./tasks.md), um Teammitgliedern Nachverfolgungs-Aufgaben zuzuweisen
- Zeigen Sie aktuelle Lektionsinhalte mit [Digital Signage](./digital-signage.md) auf einem Fernseher im Foyer an
