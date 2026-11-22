---
title: "Dienstpläne"
description: "Richten Sie die Freiwilligenplanung in B1 Admin ein: Erstellen Sie Dienstpläne nach Datum, kopieren Sie sie aus früheren Wochen, weisen Sie Teammitglieder Positionen zu und verwalten Sie Anmeldefristen und Erinnerungen."
---

# Dienstpläne

<div class="article-intro">

Dienstpläne organisieren, wer wann dient. Jeder Plan ist an ein bestimmtes Datum und einen Dienstbereich gebunden, sodass Sie Ihre Freiwilligenteams Woche für Woche koordinieren und sicherstellen können, dass jeder Gottesdienst vollständig besetzt ist.

</div>

## Schulungsvideo {#training-video}

<YouTube id="_ekj0UR6H5g" title="Pläne erstellen und Freiwillige in B1 einplanen" next="Gottesdienstordnung und Liedbibliothek in B1 aufbauen" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre Dienstbereiche und Teams im Bereich Dienste ein
- Stellen Sie sicher, dass Freiwillige im [Personenverzeichnis](../people/adding-people.md) erfasst und Teams zugeordnet sind

</div>

## Auf Pläne zugreifen {#accessing-plans}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Dienste** auf und klicken Sie auf **Pläne**.
2. Wählen Sie oben auf der Seite einen **Dienstbereich-Reiter** aus.
3. Klicken Sie auf eine **Planart**, um die Pläne dieser Art zu sehen. Mit **Anstehend** und **Vergangen** über der Liste wechseln Sie zwischen künftigen und früheren Plänen. **Anstehend** zeigt Pläne ab heute, den nächsten zuerst, Pläne ohne Datum stehen am Ende. **Vergangen** zeigt nur frühere Pläne, den neuesten zuerst.
4. Klicken Sie auf einen bestimmten Plan, um ihn zu öffnen.

Jede Planseite enthält Links zurück zu ihrer Planart und zu **Pläne**, sodass Sie ohne die Zurück-Schaltfläche des Browsers wieder nach oben gelangen.

:::info
Für die Verwaltung von Plänen ist kein voller Administratorzugang nötig. Jedes Mitglied eines Dienstbereichs kann zu Dienste wechseln und Pläne für seinen Dienstbereich erstellen, bearbeiten und planen – ohne die Berechtigung Pläne bearbeiten. Bearbeitende mit der Rolle Pläne bearbeiten können Pläne in allen Dienstbereichen verwalten.
:::

## Einen Plan erstellen {#creating-a-plan}

1. Klicken Sie auf der Seite der Planart oben auf **Neuer Plan**. Das Formular **Plan hinzufügen** öffnet sich.
2. Geben Sie dem Plan einen Namen oder verwenden Sie das Datum als Namen. Wählen Sie das **Gottesdienstdatum**. Hat Ihre Gemeinde mehr als einen Standort, können Sie außerdem den **Standort** des Plans auswählen.
3. Wenn Ihr Dienstbereich [Vorlagen](./plan-templates.md) hat, können Sie unter **Aus Vorlage starten** eine auswählen, um Gottesdienstordnung, Positionen und Notizen in einem Schritt zu übernehmen.
4. Andernfalls können Sie mit **Aus vorherigem Plan kopieren** einen früheren Plan übernehmen und **Nur Positionen** oder **Positionen und Zuweisungen** wählen. Wenn Sie nichts kopieren möchten, wählen Sie **Nichts**. Außerdem können Sie **Gottesdienstordnung kopieren** aktivieren. Beim Kopieren aus einem früheren Plan übernimmt der neue Plan außerdem dessen **Notizen**, **Anmeldefrist**, die Einstellung **Namen der Freiwilligen auf der Anmeldeseite anzeigen** und die Einstellung für automatischen Ersatz, sodass Sie diese nicht jede Woche neu eingeben müssen. Sie können alles davon in den Einstellungen des neuen Plans ändern.
5. Um mehrere Pläne gleichzeitig zu erstellen, wählen Sie beim Kopieren **Wiederholen alle** und **Häufigkeit** (Tag, Woche oder Monat) und geben Sie dann die **Anzahl der Pläne** ein (bis zu 12). Bei Monat können Sie mit **Am** denselben Tag des Monats oder denselben Wochentag beibehalten, etwa den zweiten Samstag. B1 zeigt die Termine vor dem Speichern an und erstellt für jeden Termin einen Plan, der jeweils aus dem vorherigen kopiert wird. Ist der Plan nach seinem Datum benannt, wird jeder neue Plan nach seinem eigenen Datum benannt.
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

Die Seiten der Gottesdienstordnung und des Dienst-Teams haben jeweils einen Link **Zurück zum Plan**, der Sie zur Übersicht zurückbringt.

## Gottesdienstzeiten {#service-times}

Zeiten teilen B1 mit, wann der Gottesdienst und etwaige Proben stattfinden. Sie werden für die Anmeldefrist, die [Planprüfung](./plan-validation.md), Erinnerungen für Freiwillige und die Uhrzeiten in der Gottesdienstordnung verwendet.

1. Klicken Sie auf der Planseite neben **Zeiten** auf **Zeit hinzufügen**.
2. Wählen Sie den **Typ**: **Gottesdienst**, **Probe** oder **Sonstiges**.
3. Geben Sie einen **Anzeigenamen** ein (zum Beispiel „Sonntagsgottesdienst“ oder „Probe“).
4. Legen Sie die **Startzeit** und die **Endzeit** fest.
5. Aktivieren Sie unter **Benötigte Dienst-Teams** die Positionskategorien (zum Beispiel Anbetung oder Technik), die zu dieser Zeit dienen.
6. Klicken Sie auf **Speichern**.

Klicken Sie auf den Namen einer Zeit, um sie zu bearbeiten oder zu löschen.

## Teammitglieder zuweisen {#assigning-team-members}

1. Öffnen Sie einen Plan und klicken Sie auf **Dienst-Team verwalten**.
2. Klicken Sie auf **Position hinzufügen**. Wählen oder tippen Sie im Dialog **Position hinzufügen** einen **Kategorienamen** ein (zum Beispiel Anbetung oder Gastfreundschaft), geben Sie den **Namen** der Position und die **Anzahl der Freiwilligen** ein und wählen Sie eine **Freiwilligengruppe**. Damit jede Person in Ihrer Gemeinde die Position besetzen kann (nicht nur Mitglieder eines Teams), belassen Sie die **Freiwilligengruppe** auf **Keine**. Aktivieren Sie **Selbstanmeldung erlauben**, damit sich Freiwillige selbst für freie Plätze anmelden können, und fügen Sie optional eine **Beschreibung** hinzu, die Freiwillige sehen, wenn sie Dienstmöglichkeiten durchsehen. Klicken Sie auf **Speichern**.
3. Klicken Sie neben der Position auf den Link **Benötigte Personen** (zum Beispiel „2 benötigte Personen“).
4. Klicken Sie im Dialog **Position zuweisen** auf den Namen eines Teammitglieds, um es zuzuweisen. Ist die Freiwilligengruppe der Position auf **Keine** gesetzt, suchen Sie stattdessen nach einer beliebigen Person in Ihrer Gemeinde und klicken Sie neben der Person auf das Symbol zum Hinzufügen. Klicken Sie auf **Fertig**, wenn Sie fertig sind.
5. Zugewiesene Freiwillige erscheinen neben der Position. Ein grüner Punkt auf ihrem Bild bedeutet, dass sie zugesagt haben, ein roter Punkt, dass sie abgesagt haben.
6. Benachrichtigen Sie die Freiwilligen über die Ansicht **Prüfung** (siehe [Freiwillige benachrichtigen](./plan-validation.md#notifying-volunteers)). Verwendet der Plan einen [Bestätigungs-Workflow](#plan-settings), startet das Benachrichtigen außerdem eine Workflow-Karte, die jede Anfrage verfolgt, bis der Freiwillige antwortet.

Um eine Zuweisung zu ändern oder zu entfernen, klicken Sie auf den Namen des Freiwilligen und im Dialog **Zuweisung bearbeiten** auf **Löschen**. Um eine Position zu ändern, klicken Sie auf ihren Namen; mit **Löschen** im Dialog **Position bearbeiten** entfernen Sie die Position und nehmen allen zugewiesenen Personen die Einplanung.

Jede Position zeigt einen Zähler (zum Beispiel „2/3“ oder „1/2 Anmeldung“ bei Positionen mit Selbstanmeldung), damit Sie auf einen Blick sehen, wie viele Plätze besetzt sind. Oben auf der Seite des Dienst-Teams zeigt eine Zusammenfassung („X von Y Positionen besetzt“) Ihre gesamte Besetzung für den Plan, zusammen mit der Zahl der noch benötigten Personen; sobald jede Position besetzt ist, wechselt die Anzeige zu **Vollständig besetzt**.

:::tip
Richten Sie Ihre Teams in den Einstellungen des Dienstbereichs ein, bevor Sie Pläne erstellen. So haben Sie einen fertigen Pool an Freiwilligen, aus dem Sie zuweisen können.
:::

### Automatisch zuweisen {#auto-assign}

Klicken Sie auf der Seite des Dienst-Teams auf **Automatisch zuweisen**, um jeden freien Platz aus der Freiwilligengruppe der Position zu besetzen. Positionen ohne Freiwilligengruppe werden übersprungen. Um die gerade hinzugefügten Freiwilligen wieder zurückzunehmen, klicken Sie auf **Automatische Zuweisung rückgängig machen**. Sie können außerdem über die [Planübersicht](./plans-overview.md#auto-scheduling-from-the-overview) viele Pläne gleichzeitig besetzen.

### Planungspräferenzen {#scheduling-preferences}

Klicken Sie im Dialog **Position zuweisen** neben einem Teammitglied auf das Symbol der Schieberegler, um dessen **Planungspräferenzen** festzulegen: **Maximale Anzahl pro Monat**, **Bevorzugte Gottesdienstzeiten** und **Haushaltsplanung** (den Haushalt gemeinsam einplanen oder nicht am selben Tag). Die [Planprüfung](./plan-validation.md) warnt Sie, wenn eine Zuweisung diesen Präferenzen widerspricht.

### Positionen in einen leeren Plan kopieren {#copying-positions-into-an-empty-plan}

Wenn ein Plan noch keine Positionen hat und es einen früheren Plan derselben Planart gibt, erscheint auf der Seite des Dienst-Teams ein Link **Aus vorherigem Plan kopieren**. Wählen Sie **Nur Positionen** oder **Positionen und Zuweisungen**, um den geöffneten Plan mit den Positionen (und Freiwilligen) des vorherigen Plans zu füllen. Die Kopie landet im aktuellen Plan; es entsteht kein zweiter Plan für dasselbe Datum.

## Planeinstellungen {#plan-settings}

Jeder Plan hat weitere Einstellungen, die Sie konfigurieren können, indem Sie in der Liste der Planart neben dem Plan auf **Bearbeiten** klicken oder oben auf der Planseite auf **Details bearbeiten**. Klicken Sie auf **Fertig** (oder auf den Namen des Plans über dem Formular), um zum Plan zurückzukehren. Im selben Formular gibt es eine Schaltfläche **Löschen**, mit der Sie den Plan samt Positionen, Zuweisungen und Gottesdienstordnung entfernen. Zu den Einstellungen gehören:

- **Anmeldefrist (Stunden vor dem Gottesdienst)** — die Anzahl der Stunden vor dem Gottesdienst, zu denen die Anmeldung der Freiwilligen schließt. Die Stunden werden ab der ersten **Gottesdienst**-Zeit des Plans zurückgerechnet (Proben und andere Zeiten werden übersprungen, sofern der Plan nichts anderes hat). Eine Frist von 2 Stunden bei einem Gottesdienst um 10:00 Uhr schließt die Anmeldung also am selben Morgen um 8:00 Uhr. Hat der Plan keine Zeiten, wird die Frist ab 9:00 Uhr am Gottesdienstdatum in der Zeitzone Ihrer Gemeinde gerechnet. Nach Ablauf können sich Freiwillige weder anmelden noch abmelden. Geben Sie eine negative Zahl ein, um die Anmeldung über den Gottesdienstbeginn hinaus offen zu halten. Lassen Sie das Feld leer oder löschen Sie den Inhalt, wenn es keine Frist geben soll.
- **Bestätigungs-Workflow** — wählen Sie einen [Workflow zur Bestätigung von Dienstzuweisungen](./workflows.md#serving-assignment-confirmations), um die Dienstanfragen dieses Plans per E-Mail und SMS nachzuverfolgen, bis jeder Freiwillige zusagt oder absagt. Wenn Sie den veröffentlichten Plan an die Freiwilligen **benachrichtigen**, erhält jede neue Anfrage eine eigene Karte auf der Tafel dieses Workflows, und ein Hinweis über dem Benachrichtigungslink lautet *„Neue Anfragen verwenden den Bestätigungs-Workflow.“* Belassen Sie es bei **Vorhandene Zuweisungsbenachrichtigungen verwenden**, um die üblichen Benachrichtigungen beizubehalten. In der Liste erscheinen nur aktive Bestätigungs-Workflows; erstellen Sie einen solchen zuerst unter **Dienste > Workflows**.
- **Namen der Freiwilligen auf der Anmeldeseite anzeigen** — ist diese Option aktiviert, können angemeldete Freiwillige auf der Anmeldeseite von B1.church sehen, wer sich bereits für jede Position angemeldet hat. Namen werden Besuchern, die nicht angemeldet sind, nie angezeigt. Außerdem wird gesteuert, ob die Freiwilligen, die jeden Punkt der Gottesdienstordnung betreuen, neben diesem Punkt gedruckt werden (siehe [Pläne drucken](#printing-plans)).
- **Vorläufig eingeplant** — verbirgt Zuweisungen vor den Freiwilligen, bis Sie bereit sind, den Plan zu veröffentlichen. Solange ein Plan vorläufig eingeplant ist, zeigt die Ansicht **Prüfung** auf der Seite des Dienst-Teams eine Schaltfläche **Plan veröffentlichen** (oder **Veröffentlichen und benachrichtigen**, wenn die Freiwilligen noch nicht benachrichtigt wurden), mit der die Zuweisungen sichtbar werden.
- **Automatisch einen Ersatz einplanen, wenn ein Freiwilliger absagt** — ist diese Option aktiviert, kontaktiert B1 bei einer Absage eines zugewiesenen Freiwilligen automatisch die nächste verfügbare Person aus der Teamliste und fragt, ob sie dienen kann. Dies setzt sich fort, bis jemand zusagt, sodass Ihre Positionen ohne manuelle Nachverfolgung besetzt bleiben.

:::tip
Auf der Anmeldeseite für Mitglieder sind die offenen Positionen jedes Plans nach Kategorie und dann nach Name aufgeführt. Mitglieder sehen jede kommende Woche mit offenen Positionen, sofern Sie nicht unter [Einstellungen > Freiwilligen-Anmeldung](../settings/church-settings.md#volunteer-signup) die Option **Nur die nächste Woche jeder Planart anzeigen** aktivieren.
:::

## Erinnerungen für Freiwillige {#volunteer-reminders}

B1 kann Freiwillige automatisch vor den Gottesdiensten erinnern, für die sie eingeplant sind, sodass Sie Ihr Team nicht jede Woche einzeln nachfassen müssen. Erinnerungen gehen an **alle Eingeplanten** – sowohl an jene, die zugesagt haben, als auch an jene, die noch nicht geantwortet haben. Eine Ausnahme bildet eine Anfrage, die über einen [Bestätigungs-Workflow](./workflows.md#serving-assignment-confirmations) gesendet wurde: Dieser Freiwillige erhält Erinnerungen erst, nachdem er zugesagt hat, da der Workflow das Nachfassen bis dahin übernimmt. Jede Erinnerungs-E-Mail enthält die Position(en) des Freiwilligen, das Gottesdienstdatum, die Plannotizen und Ihre eigene Nachricht.

Zeitpunkt und Inhalt der Erinnerungen werden pro **Planart** festgelegt, sodass jede Art von Gottesdienst ihren eigenen Zeitplan beibehalten kann.

1. Wählen Sie im Bereich **Dienste** den Dienstbereich, der die Planart enthält.
2. Klicken Sie in der Liste **Planarten** neben der Planart auf **Bearbeiten**.
3. Klappen Sie den Abschnitt **Erinnerungen** auf und aktivieren Sie **Erinnerungen für Pläne dieser Art senden**.
4. Wählen Sie unter **Wann sollen Erinnerungen versendet werden?** bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **2 Tage vorher**, **1 Tag vorher** oder **Am Tag selbst**.
5. Legen Sie die **Uhrzeit**, zu der die Erinnerungen versendet werden, fest.
6. Fügen Sie optional eine **Nachricht** hinzu. Lassen Sie das Feld leer, um den Standardtext der Erinnerung zu verwenden.
7. Wählen Sie unter **Senden über** **Push**, **E-Mail** und, falls Ihre Gemeinde einen [SMS-Anbieter](../settings/church-settings.md#texting) verbunden hat, **SMS**.
8. Klicken Sie auf **Erinnerungen speichern**.

Erinnerungen sind für eine Planart so lange deaktiviert, bis Sie sie einschalten.

:::tip
Freiwillige, die noch nicht zugesagt haben, erhalten die Schaltflächen **Zusagen** und **Absagen** direkt in der Erinnerungs-E-Mail, sodass sie ohne Anmeldung antworten können.
:::

### SMS-Erinnerungen {#text-reminders}

Die Option **SMS** erscheint nur, wenn Ihre Gemeinde einen SMS-Anbieter verbunden hat. SMS werden über den SMS-Anbieter Ihrer Gemeinde versendet, und jede SMS kann Ihre Gemeinde Geld kosten. Eine Freiwillige oder ein Freiwilliger erhält nur dann eine SMS-Erinnerung, wenn sie oder er unter den [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) die **Textnachrichten** aktiviert hat und im Profil eine Mobilnummer hinterlegt ist. Mitarbeitende mit der Berechtigung, SMS zu senden, können für eine Freiwillige oder einen Freiwilligen über deren [Datensatz](../people/adding-people.md#text-reminders) die **SMS-Erinnerungen** einschalten. Jede SMS beginnt mit dem Namen Ihrer Gemeinde, passt in eine einzige Textnachricht und endet mit „Antworten Sie mit STOP, um sich abzumelden.“ Wer mit STOP antwortet, erhält keine SMS mehr von Ihrer Gemeinde. Damit STOP-Antworten B1 erreichen, fügen Sie die **Eingehende (STOP-)Webhook-URL** aus Ihren [SMS-Einstellungen](../settings/church-settings.md#texting) in den Webhook für eingehende Nachrichten Ihres Anbieters ein.

Um allen Eingeplanten in einem Datumsbereich sofort eine SMS zu senden, verwenden Sie **Freiwillige per SMS anschreiben** in der [Planübersicht](./plans-overview.md#texting-everyone-scheduled).

:::info
Jede Erinnerung wird einmal gesendet. SMS-Erinnerungen werden zusätzlich zu Push und E-Mail versendet, nicht stattdessen.
:::

## Planarten Gruppen zuordnen {#associating-groups-with-a-plan-type}

Unterhalb der Planliste auf der Seite der Planart können Sie im Abschnitt **Zugeordnete Gruppen** festlegen, welche Gruppen die Pläne dieser Planart über ihr Mitgliederportal sehen können. So bringen Sie kommende Gottesdienste schnell zu den richtigen Teams, ohne ihnen Administratorzugang zu geben.

1. Klicken Sie auf der Seite der Planart oben auf **Zugeordnete Gruppen** (oder scrollen Sie zu diesem Abschnitt).
2. Klicken Sie auf **Gruppe hinzufügen** und wählen Sie im Dropdown-Menü eine Gruppe aus.
3. Wählen Sie in der Spalte **Zeigt** aus, ob Mitglieder dieser Gruppe für diese Planart **Nur vergangene Pläne**, **Nur kommende Pläne** oder **Vergangene und kommende Pläne** sehen sollen.
4. Wiederholen Sie dies, um weitere Gruppen zuzuordnen, oder klicken Sie auf das Papierkorbsymbol, um eine Gruppe zu entfernen.

:::info
Im Auswahlfeld erscheinen nur Gruppen, die als **Standard** gekennzeichnet sind. Mitglieder einer zugeordneten Gruppe sehen die Pläne dieser Planart automatisch auf der Gruppenseite im B1-Mitgliederportal – beschränkt auf den von Ihnen gewählten Zeitraum.
:::

Handelt es sich bei den Plänen um Lektionen von Lessons.church, sehen Mitglieder der zugeordneten Gruppe auf der Gruppenseite außerdem eine Karte **Lektion dieser Woche** (Kernaussage, Vers und eine Frage für Eltern). Ordnen Sie hier eine Elterngruppe zu und stellen Sie den Filter auf **Nur vergangene Pläne**, damit die heutige Lektion enthalten ist. Dienstteams verwenden meist **Nur kommende Pläne** oder **Vergangene und kommende Pläne**.

## Pläne drucken {#printing-plans}

Sie können einen Plan zur Verteilung an Ihr Team drucken. Öffnen Sie den Plan und klicken Sie oben auf der Seite auf **Drucken**, um eine druckbare Version zu erzeugen, die Zuweisungen und die Gottesdienstordnung enthält. Oben im Ausdruck erscheint das Logo Ihrer Gemeinde (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), sofern Sie eines hochgeladen haben), darunter der Name Ihrer Gemeinde und der Name des Plans, damit lose Seiten leicht zuzuordnen sind. Das ist nützlich zum Verteilen bei Proben oder zum Aushängen in einem Gemeinschaftsbereich.

Hat der Plan mehr als eine Gottesdienstzeit, enthält der Ausdruck für jeden Gottesdienst eine Zeitspalte mit dessen Startzeit als Überschrift. Ein Punkt, der aus einem Gottesdienst ausgeschlossen wurde (siehe [Punkte für bestimmte Gottesdienstzeiten einschließen](./service-order.md#including-items-in-specific-service-times)), zeigt in der Spalte dieses Gottesdienstes einen Strich.

Der Ausdruck lässt alles weg, was leer wäre. Sind keine Freiwilligen zugewiesen, entfällt der Teamkasten, und die Gottesdienstordnung nutzt die volle Seitenbreite. Haben keine Punkte eine Länge, entfällt die Spalte **Länge**, und fehlen dem Plan Gottesdienstzeiten und Längen, entfällt außerdem die Spalte **Zeit**. Um die schwarze Kopfleiste **Gottesdienstordnung** mit dem Gottesdienstdatum auszublenden, deaktivieren Sie oben auf der Druckseite **Kopfzeile Gottesdienstordnung anzeigen**; B1 Admin merkt sich Ihre Wahl für diesen Browser.

:::info
Pläne sind nach Dienstbereichen geordnet. Achten Sie darauf, dass Sie den richtigen Dienstbereich-Reiter gewählt haben, bevor Sie Pläne erstellen oder ansehen.
:::

## Nächste Schritte {#next-steps}

- Nutzen Sie die [Planübersicht](./plans-overview.md), um alle kommenden Zuweisungen über mehrere Wochen in einem Raster zu sehen, unbesetzte Positionen zu erkennen und Freiwillige direkt aus dem Raster zuzuweisen
- Speichern Sie die Struktur eines Plans als [Planvorlage](./plan-templates.md), um sie mit einem Klick auf künftige Pläne anzuwenden
- Bauen Sie Ihre [Gottesdienstordnung](./service-order.md) mit Liedern, Lesungen und anderen Elementen auf
- Fügen Sie [Lieder](./songs.md) aus Ihrer Bibliothek direkt in die Gottesdienstordnung ein
- Verwenden Sie [Aufgaben](./tasks.md), um Nachfassaufgaben an Teammitglieder zuzuweisen
- Zeigen Sie aktuelle Lektionsinhalte mit [Digitaler Beschilderung](./digital-signage.md) auf einem Fernseher im Foyer an
