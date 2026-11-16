---
title: "Workflows"
description: "Erstellen Sie Kanban-artige Boards in B1 Admin, um Personen durch Nachfassschritte zu führen, mit automatischen E-Mails, SMS und Auslösern, die Personen automatisch hinzufügen."
---

# Workflows {#workflows}

<div class="article-intro">

Workflows führen Personen über eine Reihe von Schritten auf einem visuellen Board. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert -- von der Nachbetreuung eines Gastes beim ersten Besuch über ein Mitgliedschaftsverfahren bis zum Dankeschön für eine Erstspende und allem anderen, bei dem Sie viele Personen durch dieselben Phasen verfolgen müssen. Ein Schritt kann einen Freiwilligen bitten, etwas zu tun (anrufen, ein Gespräch führen) **und** zugleich automatische Aktionen ausführen -- eine E-Mail oder SMS senden, ein paar Tage warten, die Person einer Gruppe hinzufügen --, sodass Workflows sowohl die persönliche Nachbetreuung als auch die Routinearbeit drumherum übernehmen. Workflows erweitern [Aufgaben](./tasks.md) zu einem Drag-and-Drop-Kanban-Board, damit niemand und nichts durch das Raster fällt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin vorhanden sind
- Machen Sie sich mit der Funktionsweise von [Aufgaben](./tasks.md) vertraut, da jede Karte auf einem Board eine Aufgabe ist
- Um die Aktion **E-Mail senden** zu nutzen, erstellen Sie zuerst die E-Mail-Vorlagen, die Sie versenden möchten (verwaltet unter **Einstellungen → E-Mail-Vorlagen**)
- Um die Aktion **SMS senden** zu nutzen, verbinden Sie zuerst einen [SMS-Anbieter](../settings/church-settings.md#texting)
- Sie benötigen die passende Berechtigung für Aufgaben. Anzeigen, Bearbeiten von Karten und Verwalten von Workflows sind getrennte Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Workflows ansehen {#viewing-workflows}

Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Dienste** auf und klicken Sie auf **Workflows**. Ihre Workflows werden in einer Tabelle aufgelistet, die jeweils **Kategorie** und **Status** (**Aktiv** oder **Inaktiv**) zeigt. Wenn Sie Kategorien verwenden, können Sie die Liste über die Reiter oberhalb nach Kategorie filtern. Klicken Sie auf einen beliebigen Workflow, um sein Board zu öffnen.

## Einen Workflow erstellen {#creating-a-workflow}

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Leerer Workflow** -- von vorn beginnen und eigene Schritte aufbauen.
   - **Aus einer Vorlage** -- mit einer fertigen Schrittfolge beginnen, die Sie bearbeiten können. Integrierte Vorlagen sind:
     - **Nachbetreuung neuer Gäste** -- Willkommens-E-Mail senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftskurs** -- Interesse bekunden → Für den Kurs anmelden → Kurs besuchen → Mitgliedschaft abschließen
     - **Dankeschön an Erstspender** -- Dankeskarte senden → Wirkung der Spende teilen → Betreut
     - **Bestätigung einer Dienstzuweisung** -- Anfrage senden und auf Antwort warten → Freiwilligen zu unbeantworteter Anfrage anrufen (siehe [Bestätigungen von Dienstzuweisungen](#serving-assignment-confirmations))

   Das Erstellen der Schritte einer Vorlage dauert einen Moment. Während es läuft, zeigt die Schaltfläche **Workflow hinzufügen** den Text **Wird erstellt...** und lässt sich nicht erneut anklicken, sodass kein Duplikat entsteht. Schlägt etwas fehl, zeigt die Seite *„Der Workflow konnte nicht erstellt werden. Bitte versuchen Sie es erneut.“*
3. Geben Sie dem Workflow einen **Name**.
4. Ordnen Sie optional eine **Kategorie** zu, um zusammengehörige Workflows zu gruppieren. Sie können im Dropdown direkt eine neue Kategorie anlegen.
   Bei einem leeren Workflow wählen Sie außerdem den **Zweck des Workflows**: **Nachbetreuung von Personen** (der übliche Typ) oder **Bestätigung einer Dienstzuweisung**. Der Zweck lässt sich nach dem Erstellen des Workflows nicht mehr ändern.
5. Lassen Sie den Workflow auf **Aktiv**, damit Personen hinzugefügt werden können, oder stellen Sie ihn auf **Inaktiv**, um ihn aus den Listen „Zu Workflow hinzufügen“ auszublenden.
6. Klicken Sie auf **Speichern**.

:::tip
Nutzen Sie die Schaltfläche **Duplizieren** in der Liste der Workflows, um einen vorhandenen Workflow zu kopieren -- einschließlich seiner Schritte, automatischen Aktionen und Weiterleitungen -- als Ausgangspunkt für einen neuen.
:::

## Das Board mit Schritten aufbauen {#building-the-board-with-steps}

Jedes Workflow-Board besteht aus **Schritten**, die von links nach rechts als Spalten dargestellt werden. Öffnen Sie einen Workflow und nutzen Sie **Schritt hinzufügen**, um jede Phase Ihres Prozesses anzulegen.

Beim Hinzufügen oder Bearbeiten eines Schritts können Sie Folgendes einstellen:

- **Schrittname** -- die Spaltenüberschrift (zum Beispiel „Willkommensanruf“ oder „Warten auf Anmeldung“).
- **Fällig in (Tagen)** -- legt beim Eintritt einer Karte in diesen Schritt automatisch ein Fälligkeitsdatum fest. Karten nach ihrem Fälligkeitsdatum werden als **Überfällig** markiert. Lassen Sie das Feld leer, damit kein Fälligkeitsdatum gilt; Sie können auch eine zuvor gesetzte Zahl löschen.
- **Standardzuständige Person** -- die Person oder Gruppe, der neue Karten in diesem Schritt automatisch zugewiesen werden. Ist der Standardzuständige eine Person, erhält sie eine Benachrichtigung, dass ihr eine Karte zugewiesen wurde.
- **Automatische Aktionen** -- Aktionen, die das System selbstständig ausführt, sobald eine Karte eintrifft (siehe unten).
- **Weiterleitung** -- wohin die Karte wandert, wenn sie den Schritt verlässt (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie die Schrittspalten in die Reihenfolge Ihres Prozesses. Die Reihenfolge legt außerdem den Standardweg fest, den eine Karte nimmt, wenn keine andere Weiterleitung greift.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen gehören zum Schritt; der Editor schaltet diese Abschnitte erst frei, wenn der Schritt existiert.
:::

## Automatische Aktionen {#automated-actions}

Jeder Schritt kann eine Liste von **automatischen Aktionen** enthalten, die von selbst ausgeführt werden, sobald eine Karte den Schritt **betritt** -- noch bevor jemand sie anfasst. So kann ein Schritt sowohl einen Freiwilligen zum Handeln auffordern als auch die Routinearbeit rund um die Nachbetreuung erledigen.

Öffnen Sie im Schritt-Editor den Bereich **Automatische Aktionen**, klicken Sie auf **Aktion hinzufügen**, wählen Sie einen Typ und füllen Sie seine Einstellungen aus. Fügen Sie so viele hinzu, wie Sie brauchen; sie laufen **von oben nach unten in der Reihenfolge**. Klicken Sie auf **Speichern** des Schritts, um den Schritt und alle seine Aktionen gemeinsam zu speichern. Eine Aktion über das Papierkorb-Symbol zu entfernen, wirkt sofort.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine E-Mail-Vorlage Ihrer Wahl. Sie können die Betreffzeile überschreiben. |
| **SMS senden** | Sendet der Person eine SMS mit einer Nachricht, die Sie schreiben, über den [SMS-Anbieter](../settings/church-settings.md#texting) Ihrer Gemeinde. |
| **Warten** | Hält die Karte für eine Anzahl Tage an, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person einer [Gruppe](../groups/index.md) Ihrer Wahl hinzu. |
| **Aus Gruppe entfernen** | Entfernt die Person aus einer Gruppe Ihrer Wahl. |
| **Anwesenheit erfassen** | Markiert die Person als anwesend bei der laufenden Gottesdienstzeit einer Gruppe (siehe unten). |
| **Zu Workflow hinzufügen** | Startet die Person in einem anderen Workflow -- nützlich für die Übergabe zwischen Prozessen. |
| **Notiz hinzufügen** | Hält eine Notiz im Verlauf der Karte fest. |
| **Feld setzen** | Aktualisiert ein Feld im Datensatz der Person: Mitgliedschaftsstatus, Familienstand, Geschlecht, Ort, Bundesland oder PLZ. |
| **Webhook** | Sendet die Angaben der Karte an eine externe Webadresse (URL), die Sie angeben, um andere Systeme anzubinden. |
| **Aufgabe erstellen** | Erstellt eine [Aufgabe](./tasks.md) mit dem Titel und der Beschreibung, die Sie eingeben, zugewiesen an die Person Ihrer Wahl. |
| **Person benachrichtigen** | Sendet einer Mitarbeiterin, einem Mitarbeiter oder einem Freiwilligen Ihrer Wahl eine E-Mail und eine B1-Benachrichtigung zur Karte (siehe unten). |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **bleibt die Karte in diesem Schritt**, damit eine Person sie bearbeiten kann -- es sei denn, der Schritt hat eine automatische Weiterleitung, die sie weiterschiebt (siehe [Vollautomatische Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte über den regulären Ablauf eintrifft -- wenn sie erstmals hinzugefügt wird, wenn ein Ergebnis oder eine automatische Weiterleitung sie hereinbringt oder nachdem ein Wait abgelaufen ist. Sie laufen **nicht** erneut, wenn eine Mitarbeiterin oder ein Mitarbeiter eine Karte manuell auf den Schritt zieht oder zurückschickt, damit niemand dieselbe E-Mail zweimal erhält.
:::

### E-Mails senden {#sending-email}

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional eine eigene Betreffzeile ein. Sobald eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Ist für die Person keine E-Mail-Adresse hinterlegt, überspringt der Schritt diese Aktion einfach.) [Platzhalter](../settings/email-templates.md#merge-fields) in der Vorlage, etwa `{{firstName}}`, werden mit den eigenen Angaben der Person gefüllt. Wurde der Workflow durch einen Auslöser **Spende · Erstellt** gestartet, werden die Spendenfelder `{{amount}}`, `{{giftDate}}`, `{{fund}}` und `{{receipt}}` aus dieser Spende gefüllt -- auch in Schritten, die nach einem Wait laufen. Siehe [Platzhalter für Spenden](../settings/email-templates.md#gift-merge-fields).

Wenn die E-Mail versendet wird, hält der Verlauf der Karte **E-Mail gesendet** fest. Kann sie nicht versendet werden -- etwa weil die E-Mail Ihrer Gemeinde noch nicht freigegeben ist oder das Tageslimit erreicht wurde --, wird kein Eintrag „E-Mail gesendet“ angelegt.

:::info
Workflow-E-Mails werden erst versandt, nachdem Ihre Gemeinde für Gruppen-E-Mails freigegeben wurde, und sie zählen zum täglichen E-Mail-Limit Ihrer Gemeinde. Siehe [Gruppen-E-Mail für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Die Aktion **E-Mail senden** warnt Sie im Schritt-Editor, wenn diese E-Mails nicht versandt werden: *„Die E-Mail Ihrer Gemeinde wurde noch nicht freigegeben...“*, wenn die Freigabe noch aussteht, oder *„Die E-Mail Ihrer Gemeinde ist pausiert...“*, wenn neuere Nachrichten zurückgewiesen oder als Spam gemeldet wurden.
:::

### Anwesenheit erfassen {#recording-attendance}

Wählen Sie **Anwesenheit erfassen** und klicken Sie auf **Gruppe wählen**, um die Gruppe auszuwählen, deren Anwesenheit erfasst werden soll. Wenn die Aktion läuft, wird die Person als anwesend bei der laufenden Gottesdienstzeit dieser Gruppe markiert -- genau so, als hätte sie sich eingecheckt. Das ist nützlich zusammen mit einem Auslöser, der Personen beim Eintreffen in den Workflow aufnimmt, sodass sie ohne separaten Check-in gezählt werden.

- Die Anwesenheit wird zum Zeitpunkt gemessen, zu dem die Karte **erstellt** wurde. Ein **Warten** früher im Workflow schiebt sie also nicht über den Gottesdienst hinaus.
- Nur Gottesdienstzeiten mit Wochentag und Startzeit zählen. Läuft zu diesem Zeitpunkt keine Gottesdienstzeit der Gruppe, wird nichts erfasst, und der Verlauf der Karte vermerkt **Kein geplanter Gottesdienst läuft – Anwesenheit nicht erfasst**.
- Wird die Anwesenheit erfasst, zeigt der Verlauf der Karte **Anwesenheit erfasst** gefolgt vom Namen der Gruppe. Führen Sie die Aktion für denselben Gottesdienst erneut aus, wird die Person nicht doppelt gezählt.

### Eine Person benachrichtigen {#notifying-a-person}

Wählen Sie **Person benachrichtigen**, klicken Sie auf **Person wählen** und geben Sie optional eine **Nachricht** ein. Sobald eine Karte den Schritt betritt, erhält diese Person eine E-Mail und eine B1-Benachrichtigung mit dem Namen der Person auf der Karte, den Namen des Workflows und des Schritts, Ihrer Nachricht und einem Link zum Öffnen der Karte. Nutzen Sie dies, um einer Mitarbeiterin, einem Mitarbeiter oder einer Gemeindeleitung einen Hinweis zu geben -- etwa *„Informiere den Pastor, sobald jemand den Schritt Membership Interview erreicht.“* Der Verlauf der Karte hält **Benachrichtigt** gefolgt vom Namen der Person fest.

### Eine SMS senden {#sending-a-text}

Wählen Sie **SMS senden** und geben Sie die **Textnachricht** ein (bis zu 1.600 Zeichen). Hat Ihre Gemeinde gespeicherte [SMS-Vorlagen](../settings/email-templates.md) angelegt, erscheint oberhalb des Feldes eine Liste **Aus einer Vorlage starten**. Wählen Sie eine Vorlage, wird ihr Text in die Nachricht kopiert, und Sie können ihn weiterhin bearbeiten. Der Schritt behält eine eigene Kopie, sodass spätere Änderungen an der Vorlage den Schritt nicht verändern. Sobald eine Karte den Schritt betritt, erhält die Person die SMS auf ihrem Mobiltelefon. Um die Nachricht zu personalisieren, klicken Sie unter dem Nachrichtenfeld auf einen Chip -- **Vorname**, **Nachname**, **Anzeigename** oder **Gemeindename** --, um an der Cursorposition `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` einzufügen. Jeder wird beim Versand mit den Angaben der Person gefüllt. Die Chips **Betrag**, **Spendendatum**, **Fonds** und **Beleg** fügen die Spendenfelder ein, die nur gefüllt werden, wenn ein Auslöser **Spende · Erstellt** den Workflow gestartet hat. Zum Beispiel: `Danke {{firstName}} für Ihre Spende über {{amount}} für {{fund}}!`

- Hat die Person keine Mobilnummer hinterlegt, wird keine SMS gesendet und der Verlauf der Karte vermerkt **SMS übersprungen: keine Mobilnummer**.
- Hat sich die Person abgemeldet, wird keine SMS gesendet und der Verlauf der Karte vermerkt **SMS übersprungen: abgemeldet**.
- Wird die SMS versandt, hält der Verlauf der Karte **SMS gesendet** fest. Schlägt der Versand fehl -- etwa weil kein SMS-Anbieter verbunden ist oder Ihrer Gemeinde das SMS-Guthaben ausgegangen ist --, wird der Fehler im Verlauf der Karte protokolliert, und die übrigen Aktionen des Schritts laufen trotzdem weiter.

:::warning
SMS werden über den eigenen [SMS-Anbieter](../settings/church-settings.md#texting) Ihrer Gemeinde versendet. Ist kein Anbieter verbunden, warnt der Aktionseditor *„Es ist kein SMS-Anbieter eingerichtet“*, und die SMS werden nicht versendet.
:::

### Ein paar Tage warten (Drip-Sequenzen) {#waiting-a-few-days-drip-sequences}

Die Aktion **Warten** hält eine Karte für die Anzahl Tage, die Sie festlegen. Während sie wartet, wird die Karte als **Zurückgestellt** angezeigt. B1 prüft alle 30 Minuten, ob Wartezeiten abgelaufen sind, daher nimmt eine Karte die Bearbeitung innerhalb von etwa einer halben Stunde nach Ende ihrer Wartezeit wieder auf. Ist die Wartezeit vorbei:

1. Laufen alle **übrigen Aktionen desselben Schritts** -- so können Sie eine Drip-Sequenz bauen wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden**.
2. Hat der Schritt danach eine automatische Weiterleitung, wandert die Karte weiter; andernfalls bleibt sie im Schritt, damit eine Person sie übernehmen kann.

:::tip
Ein **Warten** ganz am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte „zurückzuhalten“, bevor sie einem Freiwilligen angezeigt wird -- etwa *7 Tage warten, dann meldet sich ein Coach*.
:::

## Personen als Karten hinzufügen {#adding-people-as-cards}

Es gibt mehrere Wege, Personen auf ein Board zu bringen:

- **Vom Board aus** -- Klicken Sie unten in einer Schrittspalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe auswählen; dann wird jedes Mitglied der Gruppe als Karte hinzugefügt.
- **Aus dem Datensatz einer Person** -- Nutzen Sie **Zu Workflow hinzufügen** auf der Seite einer Person, um sie auf einen Workflow zu setzen.
- **Aus der Personensuche** -- Wählen Sie mehrere Personen aus und nutzen Sie die Sammelaktion **Zu Workflow hinzufügen**, um alle auf einmal hinzuzufügen.
- **Automatisch mit einem Auslöser** -- Personen werden bei einem Ereignis hinzugefügt, etwa bei einem Formulareingang oder einer ersten Spende (siehe [Auslöser](#triggers) unten).

Wenn Sie jemanden von Hand oder mit der Schrittaktion **Zu Workflow hinzufügen** hinzufügen, erhält diese Person nie eine zweite offene Karte im selben Workflow. Hat sie bereits eine offene Karte, wird sie übersprungen (bei einem Sammelhinzufügen erhalten nur die Personen ohne Karte eine neue). Ist ihre Karte geschlossen, können Sie sie erneut hinzufügen. Auslöser folgen stattdessen ihrer eigenen Einstellung **Nur einmal pro Person**.

## Mit dem Board arbeiten {#working-the-board}

Öffnen Sie einen Workflow, um sein Board zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, sowie ein Fälligkeits- oder Statusabzeichen (**Überfällig** oder **Zurückgestellt**). Eine Schrittspalte zeigt außerdem kleine Abzeichen für die automatischen Aktionen, die sie ausführt, und Anmerkungen zu ihrer Weiterleitung -- so haben Sie einen Überblick, wie die Karten fließen. Innerhalb jeder Spalte steht die Karte, die den Schritt zuletzt betreten hat, ganz oben.

- **Eine Karte verschieben** -- Ziehen Sie eine Karte von einer Spalte in die nächste, sobald die Person weiterkommt.
- **Eine Karte öffnen** -- Doppelklicken Sie auf eine Karte (oder klicken Sie darauf), um ihr Detailfenster zu öffnen. Dort können Sie den Schritt ändern, die Karte neu zuweisen, Notizen hinzufügen und sehen, was bereits passiert ist.

Im Kartenfenster können Sie:

- Die Karte einer anderen Person oder Gruppe **zuweisen**. Die Änderung wird in der **Aktivität** der Karte festgehalten, zum Beispiel „Neu zugewiesen von Jane Smith an John Doe“.
- Die Karte für 1 Tag, 3 Tage oder 1 Woche **zurückstellen**, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- **Zurück senden** zum vorherigen Schritt oder **Überspringen** zum nächsten Schritt.
- **Zuweisung fixieren** -- behält denselben Zuständigen auf der Karte, auch wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte beim Wechsel in einen neuen Schritt dem Standardzuständigen dieses Schritts neu zugewiesen; durch das Anheften bleibt die aktuelle Person durchgehend verantwortlich.
- Die Karte **abschließen**, um sie zu beenden, oder eine Schaltfläche **Ergebnis** wählen, wenn für den Schritt Ergebnisse konfiguriert sind (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).
- **Karte entfernen** -- nimmt eine Karte vom Board, ohne sie abzuschließen, etwa wenn jemand versehentlich hinzugefügt wurde. Nach Bestätigung wird die Karte geschlossen und von allen Listen entfernt. Keine Ergebnisse, Weiterleitungen oder Schrittaktionen laufen, und der Verlauf bleibt mit einem Eintrag **Entfernt** erhalten. Bei einer Karte für eine [Bestätigung einer Dienstzuweisung](#serving-assignment-confirmations) schließt das Entfernen die Anfrage auf dieselbe Weise.
- **Notizen hinzufügen** und die **Aktivität** der Karte einsehen -- ein Protokoll der ausgeführten automatischen Aktionen (gesendete E-Mails, Wartezeiten usw.), jeweils mit Datum und Uhrzeit.

Bei einer Karte zu einer Person zeigt das Fenster außerdem die Mobilnummer und E-Mail-Adresse der Person als Links, auf die Sie tippen können, um anzurufen oder eine E-Mail zu schreiben, sowie einen Link **Profil ansehen**, wenn Sie die Berechtigung haben, Personen anzusehen. Die Person, der eine Karte zugewiesen ist, sieht Telefonnummer und E-Mail-Adresse auch ohne Zugriff auf Personen.

Notizen werden mit der Karte gespeichert. Jede Person, die die Karte öffnen kann -- einschließlich der zugewiesenen Person oder Gruppe -- kann die Notizen lesen und eigene hinzufügen. Personen, die die Karte nicht öffnen können, sehen ihre Notizen nicht.

### Sammelaktionen {#bulk-actions}

Wählen Sie die Kontrollkästchen mehrerer Karten aus, um sie gemeinsam zu bearbeiten. Um alle Karten eines Schritts auf einmal auszuwählen, aktivieren Sie das Kästchen **Alle auswählen** in der Kopfzeile der Schrittspalte; erneut aktivieren hebt die Auswahl wieder auf. Eine Werkzeugleiste erscheint, mit der Sie für alle ausgewählten Karten auf einmal **Abschließen**, **Zurückstellen**, **Zuweisen** (neu zuweisen) oder **Verschieben nach…** einen anderen Schritt ausführen können.

## Weiterleitung mit Ergebnissen und Bedingungen {#routing-cards-with-outcomes-and-conditions}

Die Weiterleitung bestimmt, wohin eine Karte wandert, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten der Weiterleitung zu konfigurieren.

### Ergebnis-Schaltflächen {#outcome-buttons}

Ergebnisse sind Schaltflächen im Kartenfenster, die erscheinen, wenn Sie eine Karte in diesem Schritt abschließen. Statt einer einzigen Schaltfläche **Abschließen** können Sie Auswahlmöglichkeiten anbieten, etwa „Einer Gruppe beigetreten“ oder „Kein Interesse“. Jedes Ergebnis kann:

- die Karte zu **einem anderen Schritt** in diesem Workflow senden,
- die Karte vollständig an einen **anderen Workflow übergeben**, oder
- die Karte **schließen**.

So kann eine einzige Entscheidung die Person auf unterschiedliche Wege führen.

### Automatische Weiterleitung (bedingt) {#automatic-routing-conditional}

Automatische Weiterleitungen bewegen eine Karte weiter, **sobald sie einen Schritt betritt** (und nachdem die automatischen Aktionen fertig sind), ohne dass jemand klicken muss, sofern die Person einer Reihe von Bedingungen entspricht. Fügen Sie eine Weiterleitung hinzu, wählen Sie den Zielschritt und legen Sie eine oder mehrere **Bedingungen** fest (zum Beispiel Standort, Alter oder Mitgliedschaftsstatus einer Person). Textfelder lassen sich genau oder mit **enthält**, **beginnt mit** oder **endet mit** abgleichen. Eine Weiterleitung ohne Bedingungen trifft auf alle zu.

Datumsbedingungen (Heutiges Datum, Geburtsdatum oder Hochzeitstag) können das vollständige Datum oder nur einen Teil davon vergleichen -- den Wochentag, den **Tag des Monats**, den **Monat** oder die vergangenen Jahre. Für Geburtsdatum oder Hochzeitstag einer Person bietet **Tag des Monats** die relative Option **Heute**, sodass eine Bedingung wie *Geburtsdatum · Tag des Monats = Heute* Personen trifft, deren Geburtstag auf den heutigen Tag des Monats fällt. **Monat** bietet **Vormonat**, **Aktueller Monat** und **Nächster Monat**. Solche relativen Werte werden anhand der Zeitzone Ihrer Gemeinde berechnet, damit sie zum Kalendertag Ihrer Gemeinde passen und nicht zur Serverzeit.

Die Gruppe **Spenden** der Bedingungen enthält **Früher regelmäßiger Spender**. Sie findet Personen, die früher regelmäßig gespendet haben und dann aufgehört haben. Legen Sie drei Zahlen fest: *Hat in mindestens* **3** *der letzten* **12** *Wochen gespendet, dann nichts in den letzten* **3** *Wochen* (das sind die Voreinstellungen). Die Wochen werden ab heute in der Zeitzone Ihrer Gemeinde zurückgezählt, und eine erstattete Spende zählt nicht mit. Am nützlichsten ist diese Bedingung bei einem [Zeitplan-Auslöser](#schedule-triggers) -- etwa einer wöchentlichen Regel, die Dauerspender mit nachlassenden Spenden auf ein Board für die Seelsorge setzt. Die Bedingung betrachtet nur Spendendaten, niemals Beträge, und Karten und Benachrichtigungen zeigen nie Beträge. Da sie offenlegt, wer nicht mehr spendet, sehen nur Personen, die Spenden einsehen dürfen, diese Option und können sie hinzufügen, ändern oder entfernen.

Können die Bedingungen einer Weiterleitung aus einem Grund nicht geprüft werden, gilt diese Weiterleitung als nicht zutreffend. Die Karte bleibt im Schritt (oder folgt einer anderen zutreffenden Weiterleitung), statt festzustecken.

:::info
Auf dem Board zeigt jede Schrittspalte kleine Anmerkungen zu ihrer Weiterleitung -- zum Beispiel eine Ergebnisbezeichnung oder „trifft zu“ gefolgt von einem Pfeil zum Zielschritt oder Zielworkflow.
:::

## Vollautomatische Schritte {#fully-automated-steps}

Sie können einen Schritt vollständig selbstständig laufen lassen, ohne dass jemand daran arbeitet. Geben Sie dem Schritt seine **automatischen Aktionen** und fügen Sie eine **automatische Weiterleitung** (ohne Bedingungen) hinzu, die auf den nächsten Schritt zeigt. Sobald eine Karte eintrifft, laufen die Aktionen, und anschließend schiebt die Weiterleitung die Karte sofort weiter -- die Karte durchläuft den Schritt direkt.

:::tip
Kombinieren Sie dies mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf“ weiterleiten.* Die E-Mail und das Timing übernimmt das System, und ein Freiwilliger sieht die Karte erst, wenn der persönliche Kontakt an der Reihe ist.
:::

## Auslöser {#triggers}

Auslöser fügen Personen automatisch zu einem Workflow hinzu, sobald etwas passiert, sodass Sie nie Karten von Hand anlegen müssen. Klicken Sie auf dem Workflow-Board auf den Reiter **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Ereignis-Auslöser {#event-triggers}

Sie werden ausgelöst, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur passende Personen aufgenommen werden:

- **Person · Erstellt / Aktualisiert** -- z. B. alle hinzufügen, deren Status zu *Besucher* oder *Gast* wird (der Status für Personen, die sich selbst registriert haben).
- **Spende · Erstellt** -- z. B. eine Erstspende oder große Spende in einen Dankeschön-Workflow aufnehmen (nach Betrag, Fonds oder Zahlungsart filtern).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** -- fügt jede Person hinzu, die ein bestimmtes Formular absendet (ideal für eine Karte „I'm New“ oder „Connect“).

### Zeitplan-Auslöser {#schedule-triggers}

Sie laufen regelmäßig -- täglich, wöchentlich, monatlich oder jährlich -- anhand einer Reihe von Bedingungen. Nutzen Sie sie für zeitgesteuerte Ansprache, etwa *alle, deren Geburtstag heute ist* (Geburtsdatum · Tag des Monats = **Heute**, mit dem Monat auf **Aktueller Monat**) oder einen *monatlichen* Check-in. Selbst ohne **Nur einmal pro Person** fügt ein Zeitplan-Auslöser dieselbe Person innerhalb eines Wiederholungszeitraums nicht erneut hinzu (ein Tag, eine Woche, ein Monat oder ein Jahr, je nachdem, wie oft er läuft).

Für jeden Auslöser können Sie außerdem festlegen:

- Den **Startschritt**, auf dem die neue Karte landet (Standard ist der erste Schritt).
- **Nur einmal pro Person** -- damit dieselbe Person durch den Auslöser nicht zweimal in den Workflow kommt. Ist dies aktiviert, werden alle übersprungen, die bereits eine Karte in diesem Workflow haben.
  - **Nach Abschluss der Karte erneut hinzufügen** -- erscheint, wenn **Nur einmal pro Person** aktiviert ist. Aktivieren Sie es, damit der Auslöser eine Person erneut hinzufügt, sobald ihre frühere Karte in diesem Workflow geschlossen ist. Eine Person hat trotzdem nie gleichzeitig zwei offene Karten im Workflow. Nutzen Sie dies für Dinge, die mehr als einmal vorkommen können, etwa einen wiederkehrenden Gast oder einen jährlichen Prozess.
- **Aktiv** -- schaltet den Auslöser ein oder aus, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen Auslöser **Formular · Eingereicht** mit der Vorlage **Nachbetreuung neuer Gäste**, um Ihr Formular „Connect Card“ oder „I'm New“ in eine automatische Nachbetreuungs-Pipeline zu verwandeln.
:::

## Bestätigungen von Dienstzuweisungen {#serving-assignment-confirmations}

Eine besondere Art von Workflow kann [Dienstanfragen](./plans.md#assigning-team-members) nachverfolgen, bis jeder Freiwillige zusagt oder absagt. Statt Personen trackt jede Karte auf diesem Board **eine Zuweisung** -- eine Person auf einer Position an einem Plan. Zwei Rollen oder zwei Gottesdienste für dieselbe Person erhalten getrennte Karten. Dies ist optional: Für einen Plan ändert sich nichts, bis Sie in seinen Einstellungen einen Bestätigungs-Workflow auswählen.

### Einrichten {#setting-one-up}

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen** und wählen Sie die Vorlage **Bestätigung einer Dienstzuweisung**. (Oder beginnen Sie mit einem **Leerer Workflow** und setzen Sie den **Zweck des Workflows** auf **Bestätigung einer Dienstzuweisung**.) Das Erstellen aus der Vorlage erfordert die Berechtigung, SMS zu senden, da sie einen SMS-Schritt enthält.
2. Prüfen Sie die Schritte. Die Vorlage beginnt mit:
   - **Anfrage senden und auf Antwort warten** -- sendet die Dienstanfrage per E-Mail und SMS, wartet 2 Tage, sendet eine Erinnerungs-E-Mail, wartet einen weiteren Tag und schiebt die Karte dann automatisch weiter.
   - **Freiwilligen zu unbeantworteter Anfrage anrufen** -- ein Schritt, in dem eine Person den Freiwilligen anruft, mit Fälligkeit in 1 Tag. Legen Sie in diesem Schritt eine **Standardzuständige Person** fest. Ist keine gesetzt, geht die Karte an die Leitung des Dienstbereichs oder, falls es keine gibt, an das Dienstteam.
3. Passen Sie Wartezeiten, Nachrichten und Schritte an Ihre Gemeinde an.
4. Öffnen Sie die [Einstellungen eines Plans](./plans.md#plan-settings) und wählen Sie diesen Workflow unter **Bestätigungs-Workflow**.

Diese Workflows verwenden statt **E-Mail senden** und **SMS senden** die Aktion **Dienstanfrage senden**. Wählen Sie **E-Mail** oder **Textnachricht** und schreiben Sie optional eine **Anfragenachricht**. Die Anfrage enthält immer die Rolle, den Plan, das Gottesdienstdatum und einen Link zur Antwort; in Ihrer Nachricht können Sie `{{planName}}`, `{{positionName}}` und `{{serviceDate}}` verwenden. Lassen Sie die Nachricht leer, um die Standardanfrage zu nutzen. Benachrichtigungseinstellungen der Freiwilligen, deren Einwilligung zu SMS, Ihr SMS-Anbieter und die E-Mail-Freigabe Ihrer Gemeinde gelten alle, und jeder übersprungene oder blockierte Versuch wird auf der Karte vermerkt. **E-Mail senden**, **SMS senden** und **Zu Workflow hinzufügen** stehen auf diesen Boards nicht zur Verfügung.

Der Reiter **Auslöser** eines Bestätigungs-Workflows erklärt, wie Karten gestartet werden, statt Auslöser anzubieten, und diese Workflows erscheinen nicht in den Listen **Zu Workflow hinzufügen** für Personen. Das Board hat keine Schaltfläche **Karte hinzufügen**, da Karten nur aus Dienstanfragen eines Plans entstehen.

### So werden Karten gestartet und geschlossen {#how-cards-are-started-and-closed}

- Karten entstehen, wenn Sie Freiwillige in einem veröffentlichten Plan **benachrichtigen** (siehe [Freiwillige benachrichtigen](./plan-validation.md#notifying-volunteers)). Jede neue, unbeantwortete Zuweisung erhält genau eine Karte. Speichern, Veröffentlichen, Kopieren oder automatisches Befüllen eines Plans kontaktiert von selbst niemanden, und vorläufig eingeplante Pläne versenden nichts.
- Freiwillige erhalten weiterhin die übliche In-App-Benachrichtigung. Die E-Mail- und SMS-Nachverfolgung kommt vom Workflow.
- Wenn der Freiwillige **zusagt oder absagt**, wird seine Karte automatisch geschlossen, zusammen mit allen damit verknüpften Nachfass-Aufgaben.
- Das Kartenfenster zeigt die Position, das Gottesdienstdatum und einen Link zum Plan. Statt **Abschließen** lautet die Schaltfläche **Nachverfolgung erledigt erfassen**. Ein Klick vermerkt, dass nachgefasst wurde, aber die Karte bleibt offen und zugewiesen (angezeigt als **Warten auf Antwort**), bis der Freiwillige antwortet oder die Antwortfrist verstreicht.
- Die Antwortfrist ist das Ende der letzten Gottesdienstzeit, in der das Team der Position dient. Hat der Plan keine passenden Zeiten, ist es das Ende des Gottesdiensttages. Hat bis dahin niemand geantwortet, schließt sich die Karte mit **Antwortfrist abgelaufen**, und eine Aufgabe **Unbeantwortete Dienstanfrage prüfen** geht an den aktuellen Zuständigen der Karte oder an die Leitung des Dienstbereichs, damit jemand entscheiden kann, wie der Platz besetzt wird. Die Zuweisung bleibt **Unbestätigt**.
- Wird die Zuweisung entfernt, ihre Person, Position oder das Plandatum geändert, der Plan wieder vorläufig eingeplant oder auf einen anderen Bestätigungs-Workflow umgestellt, wird die Karte geschlossen. Eine geschlossene Karte wird durch ein weiteres **benachrichtigen** nie wieder geöffnet; fügen Sie eine neue Zuweisung hinzu, um eine frische Anfrage zu senden.

:::info
Bei Anfragen über einen Bestätigungs-Workflow erhalten [Erinnerungen an Freiwillige](./plans.md#volunteer-reminders) nur Freiwillige, die **zugesagt** haben, damit Personen, die noch auf eine Antwort warten, nicht zusätzlich zu den Nachfassaktionen des Workflows Erinnerungen bekommen.
:::

## Meine Karten {#my-cards}

Freiwillige und Mitarbeitende müssen sich nicht durch jedes Board graben, um ihre Arbeit zu finden. Die Liste **Meine Karten** auf der Seite **Meine Arbeit** zeigt jede Karte, die dem aktuellen Benutzer über alle Workflows hinweg zugewiesen ist. Dorthin gelangen Sie, indem Sie oben auf der Seite Workflows auf **Meine Karten** klicken oder im Sprungmenü **Dienste > Meine Arbeit** öffnen. Ein Klick auf eine Karte öffnet ihr Detailfenster direkt auf der Seite Meine Arbeit, wo Sie die Karte bearbeiten oder entfernen können, ohne die Seite zu verlassen. Wenn Sie Workflows einsehen dürfen, enthält das Fenster außerdem den Link **Workflow-Tafel öffnen** zum Board, zu dem die Karte gehört.

## Auswertungen {#reports}

Öffnen Sie einen Workflow und klicken Sie auf **Auswertungen**, um Analysen für diesen Workflow zu sehen:

- **Überfällig** -- die Anzahl der Karten, deren Fälligkeitsdatum überschritten ist.
- **Karten pro Schritt** -- wie viele Karten derzeit in jedem Schritt liegen, als Säulendiagramm.
- **Abgeschlossen (30 Tage)** -- Durchsatz der letzten 30 Tage, als Liniendiagramm.

Nutzen Sie diese Auswertungen, um Engpässe zu erkennen -- etwa einen Schritt, in dem sich Karten stauen und nie weiterkommen.

## Verwandte Artikel {#related-articles}

- [Aufgaben](./tasks.md) -- die einzelnen Handlungsschritte, aus denen Workflow-Karten bestehen
- [Formulare](../forms/index.md) -- die Formulare erstellen, die Workflows auslösen können
- [Gruppen](../groups/index.md) -- die Gruppen, in die eine Aktion „Zur Gruppe hinzufügen“ Personen einordnen kann
- [Dienstpläne](./plans.md) -- einen Bestätigungs-Workflow für die Dienstanfragen eines Plans wählen
- [Rollen & Berechtigungen](../settings/roles-permissions.md) -- steuern, wer Workflows einsehen, bearbeiten und verwalten darf
