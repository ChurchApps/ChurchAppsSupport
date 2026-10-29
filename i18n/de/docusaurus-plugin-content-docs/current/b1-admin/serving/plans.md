---
title: "Dienstpläne"
---

# Dienstpläne

<div class="article-intro">

Dienstpläne legen fest, wer wann dient. Jeder Plan ist einem bestimmten Datum und Dienstbereich zugeordnet. So lassen sich Ihre Ehrenamtsteams Woche für Woche koordinieren und jeder Gottesdienst ist vollständig besetzt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie Ihre Dienstbereiche und Teams im Bereich Dienst ein
- Stellen Sie sicher, dass Ehrenamtliche im [Personenverzeichnis](../people/adding-people.md) erfasst und Teams zugewiesen sind

</div>

## Zugriff auf Pläne

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Dienst** auf und klicken Sie auf **Pläne**.
2. Wählen Sie oben auf der Seite einen **Dienstbereich-Reiter** aus.
3. Klicken Sie auf einen **Plantyp**, um die Liste der Pläne dieses Typs zu sehen. Mit **Bevorstehend** und **Vergangen** oberhalb der Liste wechseln Sie zwischen künftigen und früheren Plänen. **Bevorstehend** listet Pläne ab heute auf, den nächsten zuerst, undatierte Pläne stehen am Ende. **Vergangen** listet nur frühere Pläne auf, den neuesten zuerst.
4. Klicken Sie auf einen bestimmten Plan, um ihn zu öffnen.

Jede Planseite enthält Links zurück zu ihrem Plantyp und zu **Pläne**, sodass Sie ohne die Zurück-Funktion des Browsers nach oben navigieren können.

:::info
Für die Verwaltung von Plänen sind keine vollständigen Administratorrechte nötig. Wer Mitglied eines Dienstbereichs ist, kann zum Dienst navigieren und Pläne für seinen eigenen Dienstbereich anlegen, bearbeiten und planen, ohne die Berechtigung Pläne bearbeiten zu benötigen. Redakteure mit der Rolle Pläne bearbeiten können Pläne in allen Dienstbereichen verwalten.
:::

## Einen Plan anlegen

1. Klicken Sie auf der Seite des Plantyps oben auf **Neuer Plan**.
2. Geben Sie dem Plan einen Namen oder verwenden Sie das Datum als Namen. Wählen Sie das **Datum** des Gottesdienstes.
3. Wenn Ihr Dienstbereich [Vorlagen](./plan-templates.md) hat, können Sie unter **Von Vorlage starten** eine auswählen, um Gottesdienstablauf, Positionen und Notizen in einem Schritt zu übernehmen.
4. Wollen Sie stattdessen aus einem früheren Plan kopieren, verwenden Sie **Aus vorherigem Plan kopieren** und wählen Sie **Nur Positionen** oder **Positionen und Zuweisungen**. Möchten Sie nicht kopieren, wählen Sie **Nichts**. Außerdem können Sie **Gottesdienstablauf kopieren** ankreuzen. Beim Kopieren aus einem früheren Plan übernimmt der neue Plan auch dessen **Notizen**, **Anmeldefrist**, **Freiwillige Namen auf der Anmeldeseite anzeigen** und die Einstellung für den automatischen Ersatz. So müssen Sie diese nicht jede Woche neu eingeben. Sie können jede davon in den Einstellungen des neuen Plans ändern.
5. Um beim Kopieren gleich mehrere Wochen anzulegen, geben Sie unter **Diese Anzahl Wochen wiederholen** eine Zahl ein (bis zu 12). B1 erstellt pro Woche einen Plan, jeweils kopiert aus dem vorherigen. Trägt der Plan sein Datum als Namen, wird jeder neue Plan nach seinem eigenen Datum benannt.
6. Legen Sie optional die **Anmeldefrist (Stunden vor dem Gottesdienst)** fest. Ein neuer Plan übernimmt die Frist des vorherigen Plans, und Sie können sie hier ändern. Lassen Sie das Feld leer für keine Frist. Wie die Frist berechnet wird, erfahren Sie unter [Planeinstellungen](#plan-settings).
7. Speichern Sie den Plan. Sie können nun Teammitglieder zuweisen und die [Gottesdienstablaufplanung](./service-order.md) aufbauen.

:::tip
**Diese Anzahl Wochen wiederholen** ist nur verfügbar, während Sie etwas aus dem vorherigen Plan kopieren (Positionen, Zuweisungen oder Gottesdienstablauf).
:::

## Die Detailseite eines Plans

Öffnen Sie einen Plan, erscheinen oben Name, Dienstbereich, Plantyp und Gottesdienstdatum des Plans sowie die Schaltflächen **Bearbeiten** und **Drucken**. Darunter befindet sich alles auf einer Seite:

- **[Gottesdienstablauf](./service-order.md)** -- Erstellen Sie den Ablauf mit Elementen wie Lobpreisliedern, Gebeten, Ankündigungen und der Predigt.
- **Dienstteam-Zuweisungen** -- Verwalten Sie, welche Teammitglieder diesem Plan zugeordnet sind. Sie können Personen aus Ihren bestehenden Teams hinzufügen und sehen, wer bestätigt hat oder noch ausstehend ist. Links über den Positionen öffnen die **Notizen** und **Zeiten** des Plans.

## Teammitglieder zuweisen

1. Öffnen Sie einen Plan und scrollen Sie zu **Dienstteam-Zuweisungen**.
2. Klicken Sie auf **Position hinzufügen**. Füllen Sie das Formular für die Position aus. Als Kategoriennamen können Sie eine beliebige Kategorie wählen. Damit jeder in Ihrer Kirche die Position besetzen kann (nicht nur Mitglieder eines Teams), lassen Sie **Freiwilligengruppe** auf **Keine** stehen.
3. Klicken Sie auf **Benötigte Personen** und wählen Sie Ehrenamtliche für die Position aus. Hat die Position eine **Freiwilligengruppe**, wählen Sie aus den Mitgliedern dieser Gruppe. Ist deren Freiwilligengruppe auf **Keine** gesetzt, können Sie stattdessen jede Person in Ihrer Kirche suchen.
4. Fügen Sie Mitglieder aus Ihrer Teamliste hinzu, indem Sie auf **Hinzufügen** klicken.
5. Zugewiesene Mitglieder erscheinen unter ihrem Team mit ihrem Zuweisungsstatus.
6. Klicken Sie auf **Ehrenamtliche benachrichtigen**, um sie in der B1-App oder per E-Mail zu informieren. Verwendet der Plan einen [Bestätigungs-Workflow](#plan-settings), startet das Benachrichtigen außerdem eine Workflow-Karte, die jede Anfrage nachverfolgt, bis der Ehrenamtliche antwortet.

Jede Position zeigt eine Zählmarke (zum Beispiel "2/3"), sodass Sie auf einen Blick sehen, wie viele Plätze besetzt sind. Unter der Überschrift **Dienstteam-Zuweisungen** zeigt eine Zusammenfassung ("X von Y Positionen besetzt") die Gesamtbesetzung des Plans sowie, wie viele noch fehlen. Sobald jede Position besetzt ist, wechselt sie zu **Vollständig besetzt**.

:::tip
Richten Sie Ihre Teams in den Einstellungen des Dienstbereichs ein, bevor Sie Pläne anlegen. So haben Sie einen fertigen Pool an Ehrenamtlichen, aus dem Sie zuweisen können.
:::

### Positionen in einen leeren Plan kopieren

Hat ein Plan noch keine Positionen und gibt es einen früheren Plan desselben Typs, erscheint unter **Dienstteam-Zuweisungen** ein Link **Aus vorherigem Plan kopieren**. Wählen Sie **Nur Positionen** oder **Positionen und Zuweisungen**, um den geöffneten Plan mit den Positionen (und Ehrenamtlichen) des vorherigen Plans zu füllen. Die Kopie landet im aktuellen Plan; es wird kein zweiter Plan für dasselbe Datum angelegt.

## Planeinstellungen

Jeder Plan hat weitere Einstellungen, die Sie über **Bearbeiten** neben dem Plan in der Liste des Plantyps oder über die Schaltfläche **Bearbeiten** oben auf der Planseite öffnen. Klicken Sie auf **Fertig** (oder auf den Namen des Plans), um zum Plan zurückzukehren. Dazu gehören:

- **Anmeldefrist (Stunden vor dem Gottesdienst)** -- die Anzahl der Stunden vor dem Gottesdienst, zu denen die Anmeldung Ehrenamtlicher schließt. Die Stunden werden vom ersten **Gottesdienst**-Zeitpunkt des Plans rückwärts gezählt (Proben und andere Zeiten werden übersprungen, sofern der Plan nichts anderes hat). Eine Frist von 2 Stunden bei einem Gottesdienst um 10:00 Uhr schließt die Anmeldung also um 8:00 Uhr am selben Morgen. Hat der Plan keine Zeiten, wird die Frist ab 9:00 Uhr am Gottesdiensttag gemäß der Zeitzone Ihrer Kirche gezählt. Ist sie abgelaufen, können sich Ehrenamtliche weder anmelden noch austragen. Geben Sie eine negative Zahl ein, um die Anmeldung über den Gottesdienstbeginn hinaus offen zu halten. Lassen Sie das Feld leer oder löschen Sie den Inhalt für keine Frist.
- **Bestätigungs-Workflow** -- wählen Sie einen [Workflow für Dienstzuweisungsbestätigungen](./workflows.md#serving-assignment-confirmations), um die Dienstanfragen dieses Plans per E-Mail und SMS nachzuverfolgen, bis jeder Ehrenamtliche zusagt oder absagt. Wenn Sie Ehrenamtliche im veröffentlichten Plan **benachrichtigen**, erhält jede neue Anfrage eine eigene Karte auf der Tafel dieses Workflows, und ein Hinweis über dem Benachrichtigungslink lautet *"Neue Anfragen verwenden den Bestätigungs-Workflow."* Belassen Sie es bei **Bestehende Zuweisungsbenachrichtigungen verwenden**, um die üblichen Benachrichtigungen zu behalten. In der Liste erscheinen nur aktive Bestätigungs-Workflows; legen Sie zuerst unter **Dienst > Workflows** einen an.
- **Freiwillige Namen auf der Anmeldeseite anzeigen** -- ist das Kästchen aktiviert, können angemeldete Ehrenamtliche auf der Anmeldeseite von B1.church sehen, wer sich für jede Position bereits eingetragen hat. Namen werden Besuchern, die nicht angemeldet sind, nie angezeigt.
- **Vorläufig eingeplant** -- blendet die Zuweisungen vor Ehrenamtlichen aus, bis Sie den Dienstplan veröffentlichen möchten.
- **Automatisch einen Ersatz planen, wenn ein Ehrenamtlicher absagt** -- ist das Kästchen aktiviert, kontaktiert B1 bei einer Absage automatisch die nächste verfügbare Person auf der Teamliste und fragt, ob sie dienen kann. Dies wiederholt sich die Liste entlang, bis jemand zusagt. So bleiben Ihre Positionen ohne manuelles Nachfassen besetzt.

:::tip
Auf der Anmeldeseite für Mitglieder sind die offenen Positionen jedes Plans nach Kategorie und dann nach Name aufgelistet. Mitglieder sehen jede bevorstehende Woche mit offenen Positionen, sofern Sie nicht unter [Einstellungen > Freiwilligen-Anmeldung](../settings/church-settings.md#volunteer-signup) die Option **Nur die nächste Woche jedes Plantyps anzeigen** aktivieren.
:::

## Erinnerungen an Ehrenamtliche {#volunteer-reminders}

B1 kann Ehrenamtliche automatisch vor den Gottesdiensten erinnern, für die sie eingeplant sind, sodass Sie Ihr Team nicht jede Woche einzeln nachfassen müssen. Erinnerungen gehen an **alle Eingeplanten** -- sowohl an die, die bestätigt haben, als auch an die, die noch nicht geantwortet haben. Eine Ausnahme bildet eine Anfrage, die über einen [Bestätigungs-Workflow](./workflows.md#serving-assignment-confirmations) gesendet wurde: Diese Person erhält Erinnerungen erst, nachdem sie zugesagt hat, da der Workflow das Nachfassen bis dahin übernimmt. Jede Erinnerungs-E-Mail enthält die Position(en) des Ehrenamtlichen, das Gottesdienstdatum, die Planotizen und Ihre eigene Nachricht.

Zeitpunkt und Inhalt der Erinnerungen werden pro **Plantyp** festgelegt, sodass jede Art von Gottesdienst ihren eigenen Zeitplan haben kann.

1. Wählen Sie im Bereich **Dienst** den Dienstbereich, der den Plantyp enthält.
2. Klicken Sie in der Liste **Plantypen** neben dem Plantyp auf **Bearbeiten**.
3. Klappen Sie den Abschnitt **Erinnerungen** auf und aktivieren Sie **Erinnerungen für Pläne dieses Typs senden**.
4. Wählen Sie unter **Wann sollen Erinnerungen versendet werden?** bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **2 Tage vorher**, **1 Tag vorher** oder **Am Tag selbst**.
5. Legen Sie die **Uhrzeit**, zu der die Erinnerungen versendet werden, fest.
6. Fügen Sie optional eine **Nachricht** hinzu. Lassen Sie das Feld leer, um den Standardtext der Erinnerung zu verwenden.
7. Wählen Sie unter **Senden über** **Push**, **E-Mail** und, falls Ihre Kirche einen [SMS-Anbieter](../settings/church-settings.md#texting) verbunden hat, **SMS**.
8. Klicken Sie auf **Erinnerungen speichern**.

Für einen Plantyp sind Erinnerungen ausgeschaltet, bis Sie sie aktivieren.

:::tip
Ehrenamtliche, die noch nicht bestätigt haben, erhalten in der Erinnerungs-E-Mail direkt die Schaltflächen **Zusagen** und **Absagen**, sodass sie ohne Anmeldung antworten können.
:::

### SMS-Erinnerungen

Die Option **SMS** erscheint nur, wenn Ihre Kirche einen SMS-Anbieter verbunden hat. Die SMS werden über den SMS-Anbieter Ihrer Kirche versendet, und jede SMS kann Ihre Kirche Geld kosten. Eine SMS-Erinnerung erhält ein Ehrenamtlicher nur, wenn er unter seinen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **SMS-Nachrichten** aktiviert hat und in seinem Profil eine Mobilnummer hinterlegt ist. Jede SMS beginnt mit dem Namen Ihrer Kirche, bleibt auf eine einzige SMS begrenzt und endet mit "Antworten Sie mit STOP, um sich abzumelden." Wer mit STOP antwortet, erhält keine SMS mehr von Ihrer Kirche. Damit Abmeldungen mit STOP bei B1 ankommen, fügen Sie die **Eingehende (STOP-)Webhook-URL** aus Ihren [SMS-Einstellungen](../settings/church-settings.md#texting) in den eingehenden Nachrichten-Webhook Ihres Anbieters ein.

Um alle Eingeplanten über einen Datumsbereich sofort per SMS zu erreichen, nutzen Sie **Ehrenamtliche per SMS** in der [Planübersicht](./plans-overview.md#texting-everyone-scheduled).

:::info
Jede Erinnerung wird einmal gesendet. SMS-Erinnerungen kommen zusätzlich zu Push und E-Mail, nicht statt dieser.
:::

## Dienstbereiche mit einem Plantyp verknüpfen

Unterhalb der Planliste auf der Seite des Plantyps legt der Abschnitt **Verknüpfte Gruppen** fest, welche Gruppen die Pläne dieses Plantyps in ihrem Mitgliederbereich sehen können. So machen Sie kommende Gottesdienste schnell den richtigen Teams sichtbar, ohne dass diese Administratorzugriff brauchen.

1. Klicken Sie auf der Seite des Plantyps oben (oder scrollen Sie zu diesem Abschnitt) auf **Verknüpfte Gruppen**.
2. Klicken Sie auf **Gruppe hinzufügen** und wählen Sie im Auswahlfeld eine Gruppe.
3. Wählen Sie in der Spalte **Zeigt** aus, ob die Mitglieder dieser Gruppe für diesen Plantyp **Nur vergangene Pläne**, **Nur bevorstehende Pläne** oder **Vergangene und bevorstehende Pläne** sehen sollen.
4. Wiederholen Sie dies, um weitere Gruppen zu verknüpfen, oder klicken Sie auf das Papierkorbsymbol, um eine Gruppe zu entfernen.

:::info
Im Auswahlfeld erscheinen nur Gruppen mit der Kennzeichnung **Standard**. Die Mitglieder einer verknüpften Gruppe sehen die Pläne dieses Plantyps automatisch auf der Gruppenseite im B1-Mitgliederbereich -- beschränkt auf den von Ihnen gewählten Zeitraum.
:::

Handelt es sich bei den Plänen um Lektionen von Lessons.church, sehen die Mitglieder der verknüpften Gruppe außerdem eine Karte **Lektion dieser Woche** auf der Gruppenseite (Kernaussage, Vers und eine Frage für Eltern). Verknüpfen Sie hier eine Elterngruppe und stellen Sie den Filter auf **Nur vergangene Pläne**, damit die heutige Lektion enthalten ist. Dienstteams verwenden üblicherweise **Nur bevorstehende Pläne** oder **Vergangene und bevorstehende Pläne**.

## Pläne drucken

Sie können einen Plan an Ihr Team verteilen. Öffnen Sie den Plan und klicken Sie oben auf der Seite auf **Drucken**, um eine druckbare Fassung mit Zuweisungen und Gottesdienstablauf zu erzeugen. Oben auf dem Ausdruck steht das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter sowie der Name des Plans, damit lose Blätter leicht zuzuordnen sind. Das ist nützlich zum Verteilen bei Proben oder zum Aushang in einem Gemeinschaftsraum.

Der Ausdruck lässt alles weg, was leer wäre. Sind keine Ehrenamtlichen zugewiesen, gibt es keinen Teamkasten, und der Gottesdienstablauf nutzt die volle Seitenbreite. Hat kein Element eine Länge, entfällt die Spalte **Länge**, und hat der Plan weder Gottesdienstzeiten noch Längen, entfällt auch die Spalte **Zeit**. Um die schwarze Kopfleiste **Gottesdienstablauf** mit dem Gottesdienstdatum wegzulassen, deaktivieren Sie auf der Druckseite oben **Kopfzeile Gottesdienstablauf anzeigen**; B1 Admin merkt sich Ihre Wahl in diesem Browser.

:::info
Pläne sind nach Dienstbereich geordnet. Achten Sie darauf, dass Sie den richtigen Dienstbereich-Reiter gewählt haben, bevor Sie Pläne anlegen oder ansehen.
:::

## Wie geht es weiter?

- Nutzen Sie die [Planübersicht](./plans-overview.md), um alle kommenden Zuweisungen über mehrere Wochen in einem Raster zu sehen, unbesetzte Positionen zu erkennen und Ehrenamtliche direkt im Raster zuzuweisen
- Speichern Sie den Aufbau eines Plans als [Planvorlage](./plan-templates.md), um ihn mit einem Klick auf künftige Pläne anzuwenden
- Bauen Sie Ihren [Gottesdienstablauf](./service-order.md) mit Liedern, Lesungen und anderen Elementen aus
- Fügen Sie [Lieder](./songs.md) aus Ihrer Bibliothek direkt in den Gottesdienstablauf ein
- Nutzen Sie [Aufgaben](./tasks.md), um Teammitgliedern Nachfassaufgaben zuzuweisen
- Zeigen Sie aktuelle Lektionsinhalte mit [Digitaler Beschilderung](./digital-signage.md) auf einem Fernseher in der Lobby an
