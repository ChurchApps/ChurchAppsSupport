---
title: "Workflows"
description: "Kanban-artige Boards in B1 Admin erstellen, um Personen durch Nachfolgeschritte zu führen, mit automatischen E-Mails, Textnachrichten und Auslösern, die Personen selbstständig hinzufügen."
---

# Workflows

<div class="article-intro">

Workflows führen Personen auf einem visuellen Board durch eine Reihe von Schritten. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert. Das kann vom Nachfassen bei einer Erstbesuchenden Person über einen Mitgliedsprozess bis zum Dankeschön für eine erste Spende reichen, überall dort, wo Sie viele Personen durch dieselben Stufen begleiten möchten. Ein Schritt kann eine ehrenamtliche Person um eine Aufgabe bitten (anrufen, ein Gespräch führen) **und** zugleich automatische Aktionen ausführen, etwa eine E-Mail oder Textnachricht senden, ein paar Tage warten oder die Person einer Gruppe hinzufügen. Workflows übernehmen so sowohl die persönliche Nachbetreuung als auch die Routinearbeit drumherum. Workflows erweitern [Aufgaben](./tasks.md) zu einem Kanban-Board mit Drag-and-drop, damit niemand durch das Raster fällt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin vorhanden sind
- Machen Sie sich mit den [Aufgaben](./tasks.md) vertraut, denn jede Karte auf einem Board ist eine Aufgabe
- Um die Aktion **E-Mail senden** zu nutzen, legen Sie zuerst die E-Mail-Vorlagen an, die Sie versenden möchten (verwaltet unter **Einstellungen → E-Mail-Vorlagen**)
- Um die Aktion **Textnachricht senden** zu nutzen, verbinden Sie zuerst einen [Anbieter für Textnachrichten](../settings/church-settings.md#texting)
- Sie benötigen die passende Berechtigung für Aufgaben. Anzeigen, Karten bearbeiten und Workflows verwalten sind getrennte Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Workflows ansehen

Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Dienste** auf und klicken Sie auf **Workflows**. Ihre Workflows werden in einer Tabelle mit **Kategorie** und **Status** (**Aktiv** oder **Inaktiv**) aufgelistet. Wenn Sie Kategorien verwenden, können Sie die Liste über die Reiter oberhalb nach Kategorie filtern. Klicken Sie auf einen Workflow, um sein Board zu öffnen.

## Einen Workflow erstellen

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Leerer Workflow** -- Beginnen Sie bei null und erstellen Sie Ihre eigenen Schritte.
   - **Aus einer Vorlage** -- Beginnen Sie mit einer fertigen Schrittfolge, die Sie anpassen können. Zu den eingebauten Vorlagen gehören:
     - **Nachfassen bei neuen Besuchenden** -- Willkommens-E-Mail senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Vernetzt
     - **Mitgliedschaftskurs** -- Interesse bekunden → Für den Kurs anmelden → Kurs besuchen → Mitgliedschaft abschließen
     - **Dank an Erstspendende** -- Dankesschreiben senden → Wirkung der Spende teilen → Verantwortungsvoll begleitet
     - **Bestätigung einer Dienstzusage** -- Antwort anfordern und abwarten → Ehrenamtliche Person zu unbeantworteter Anfrage anrufen (siehe [Bestätigungen von Dienstaufgaben](#serving-assignment-confirmations))

   Das Erstellen der Schritte einer Vorlage kann einen Moment dauern. Während es läuft, zeigt die Schaltfläche **Workflow hinzufügen** den Text **Wird erstellt...** und lässt sich nicht erneut anklicken. So entsteht kein Duplikat. Schlägt etwas fehl, zeigt die Seite die Meldung *„Der Workflow konnte nicht erstellt werden. Bitte versuchen Sie es erneut.“*
3. Geben Sie dem Workflow einen **Namen**.
4. Weisen Sie optional eine **Kategorie** zu, um zusammengehörige Workflows zu gruppieren. Im Dropdown-Menü können Sie direkt eine neue Kategorie anlegen.
   Bei einem leeren Workflow wählen Sie außerdem seinen **Zweck**: **Nachfassen bei Personen** (der übliche Fall) oder **Bestätigung einer Dienstzusage**. Der Zweck lässt sich nach dem Erstellen des Workflows nicht mehr ändern.
5. Lassen Sie den Workflow auf **Aktiv**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inaktiv**, um ihn aus den Listen zum Hinzufügen zu verbergen.
6. Klicken Sie auf **Speichern**.

:::tip
Mit der Schaltfläche **Duplizieren** in der Liste der Workflows kopieren Sie einen bestehenden Workflow, einschließlich seiner Schritte, automatischen Aktionen und Weiterleitungen, als Ausgangspunkt für einen neuen.
:::

## Das Board mit Schritten aufbauen

Jedes Workflow-Board besteht aus **Schritten**, die von links nach rechts als Spalten angezeigt werden. Öffnen Sie einen Workflow und verwenden Sie **Schritt hinzufügen**, um jede Phase Ihres Prozesses anzulegen.

Beim Hinzufügen oder Bearbeiten eines Schritts können Sie Folgendes festlegen:

- **Schrittname** -- die Spaltenüberschrift (zum Beispiel „Willkommensanruf“ oder „Warten auf Anmeldung“).
- **Fällig in (Tagen)** -- legt automatisch ein Fälligkeitsdatum fest, sobald eine Karte in diesen Schritt wechselt. Karten nach ihrem Fälligkeitsdatum werden als **Überfällig** markiert.
- **Standardzuständige Person** -- die Person oder Gruppe, der neue Karten dieses Schritts automatisch zugewiesen werden. Ist die Standardzuständigkeit eine Person, erhält sie eine Benachrichtigung, dass ihr eine Karte zugewiesen wurde.
- **Automatische Aktionen** -- Dinge, die das System von selbst ausführt, sobald eine Karte ankommt (siehe unten).
- **Weiterleitung** -- wohin die Karte geht, wenn sie den Schritt verlässt (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie die Schrittspalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge legt außerdem den Standardweg fest, den eine Karte nimmt, wenn keine andere Weiterleitung greift.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen hängen am Schritt. Der Editor schaltet diese Bereiche erst frei, wenn der Schritt existiert.
:::

## Automatische Aktionen

Jeder Schritt kann eine Liste **automatischer Aktionen** enthalten. Sie laufen von selbst ab, sobald eine Karte den Schritt **betritt**, noch bevor jemand die Karte anfasst. So fordert ein Schritt sowohl eine ehrenamtliche Person zum Handeln auf als auch die Routinearbeit rund um die Nachbetreuung.

Im Schritt-Editor öffnen Sie **Automatische Aktionen**, klicken auf **Aktion hinzufügen**, wählen einen Typ und füllen die Einstellungen aus. Sie können beliebig viele Aktionen hinzufügen. Sie laufen **von oben nach unten in dieser Reihenfolge** ab. Klicken Sie auf **Speichern** des Schritts, um den Schritt und alle seine Aktionen gemeinsam zu sichern. Eine Aktion, die Sie mit dem Papierkorb-Symbol entfernen, wirkt sofort.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine E-Mail-Vorlage Ihrer Wahl. Sie können die Betreffzeile überschreiben. |
| **Textnachricht senden** | Sendet der Person eine Nachricht, die Sie schreiben, über den [Anbieter für Textnachrichten](../settings/church-settings.md#texting) Ihrer Gemeinde. |
| **Warten** | Hält die Karte für eine Anzahl von Tagen an, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person einer [Gruppe](../groups/index.md) Ihrer Wahl hinzu. |
| **Aus Gruppe entfernen** | Entfernt die Person aus einer Gruppe Ihrer Wahl. |
| **Anwesenheit erfassen** | Markiert die Person als anwesend beim gerade laufenden Gottesdienst einer Gruppe (siehe unten). |
| **Zum Workflow hinzufügen** | Startet die Person in einem anderen Workflow, nützlich für die Übergabe zwischen Prozessen. |
| **Notiz hinzufügen** | Hält eine Notiz im Verlauf der Karte fest. |
| **Feld setzen** | Aktualisiert ein Feld im Datensatz der Person: Mitgliedsstatus, Familienstand, Geschlecht, Ort, Bundesland oder PLZ. |
| **Webhook** | Sendet die Angaben der Karte an eine externe Web-Adresse (URL), die Sie angeben, zur Verbindung mit anderen Systemen. |
| **Aufgabe erstellen** | Erstellt eine [Aufgabe](./tasks.md) mit dem Titel und der Beschreibung, die Sie eingeben, zugewiesen an die Person Ihrer Wahl. |
| **Person benachrichtigen** | Sendet einer Mitarbeitenden oder ehrenamtlichen Person Ihrer Wahl eine E-Mail und eine B1-Benachrichtigung zur Karte (siehe unten). |

Sobald alle Aktionen eines Schritts abgeschlossen sind, **bleibt die Karte auf diesem Schritt**, damit eine Person sie bearbeiten kann. Das gilt nicht, wenn der Schritt eine automatische Weiterleitung hat, die die Karte weiterschiebt (siehe [Vollautomatische Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte den normalen Ablauf durchläuft: wenn sie zum ersten Mal hinzugefügt wird, wenn ein Ergebnis oder eine automatische Weiterleitung sie hereinbringt oder wenn ein Warten endet. Sie laufen **nicht** erneut, wenn eine mitarbeitende Person die Karte manuell auf den Schritt zieht oder zurückschickt. So erhält eine Person nicht dieselbe E-Mail zweimal.
:::

### E-Mail senden {#sending-email}

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional einen eigenen Betreff ein. Sobald eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Hat die Person keine E-Mail-Adresse hinterlegt, überspringt der Schritt diese Aktion einfach.) [Platzhalter](../settings/email-templates.md#merge-fields) in der Vorlage, etwa `{{firstName}}`, werden mit den Angaben der Person gefüllt. Hat ein Auslöser **Spende · Erstellt** den Workflow gestartet, werden die Felder `{{amount}}`, `{{giftDate}}`, `{{fund}}` und `{{receipt}}` aus dieser Spende gefüllt, auch in Schritten, die nach einem Warten laufen. Siehe [Platzhalter für Spenden](../settings/email-templates.md#gift-merge-fields).

Wenn die E-Mail versendet wird, hält der Verlauf der Karte **E-Mail gesendet** fest. Kann sie nicht gesendet werden, weil die E-Mail Ihrer Gemeinde zum Beispiel noch nicht freigegeben ist oder das Tageslimit erreicht wurde, wird kein Eintrag „E-Mail gesendet“ angelegt.

:::info
Workflow-E-Mails werden erst versendet, nachdem Ihre Gemeinde für den Versand von Gruppen-E-Mails freigegeben wurde. Sie zählen außerdem zum täglichen E-Mail-Limit Ihrer Gemeinde. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Die Aktion **E-Mail senden** warnt Sie im Schritt-Editor, wenn diese E-Mails nicht versendet werden. Die Meldung lautet *„Die E-Mail Ihrer Gemeinde wurde noch nicht freigegeben...“*, solange die Freigabe aussteht, oder *„Der E-Mail-Versand Ihrer Gemeinde ist pausiert...“*, wenn kürzlich gesendete Nachrichten nicht zugestellt oder als Spam gemeldet wurden.
:::

### Anwesenheit erfassen

Wählen Sie **Anwesenheit erfassen** und klicken Sie auf **Gruppe auswählen**, um die Gruppe zu bestimmen, deren Anwesenheit erfasst werden soll. Beim Ausführen der Aktion wird die Person als anwesend beim gerade laufenden Gottesdienst dieser Gruppe markiert, genauso wie bei einem Check-in. Das ist nützlich zusammen mit einem Auslöser, der Personen beim Eintreffen zum Workflow hinzufügt, sodass sie ohne separates Check-in gezählt werden.

- Die Anwesenheit wird zum Zeitpunkt der **Erstellung** der Karte gemessen. Ein **Warten** früher im Workflow schiebt sie daher nicht über den Gottesdienst hinaus.
- Gezählt werden nur Gottesdienstzeiten mit Wochentag und Startzeit. Läuft in diesem Moment keine Gottesdienstzeit der Gruppe, wird nichts erfasst, und der Verlauf der Karte vermerkt **Kein geplanter Gottesdienst läuft — Anwesenheit nicht erfasst**.
- Wurde die Anwesenheit erfasst, zeigt der Verlauf der Karte **Anwesenheit erfasst** gefolgt vom Namen der Gruppe. Wird die Aktion für denselben Gottesdienst erneut ausgeführt, wird die Person nicht doppelt gezählt.

### Eine Person benachrichtigen

Wählen Sie **Person benachrichtigen**, klicken Sie auf **Person auswählen** und geben Sie optional eine **Nachricht** ein. Sobald eine Karte den Schritt betritt, erhält diese Person eine E-Mail und eine B1-Benachrichtigung mit dem Namen der Person auf der Karte, den Namen des Workflows und des Schritts, Ihrer Nachricht und einem Link zum Öffnen der Karte. Nutzen Sie das, um einer mitarbeitenden Person oder Leitung eines Bereichs einen Hinweis zu geben, zum Beispiel: *„Informiere die Pastorin, sobald jemand den Schritt Mitgliedschaftsgespräch erreicht.“* Der Verlauf der Karte hält **Benachrichtigt** gefolgt vom Namen der Person fest.

### Eine Textnachricht senden {#sending-a-text}

Wählen Sie **Textnachricht senden** und geben Sie die **Textnachricht** ein (bis zu 1.600 Zeichen). Hat Ihre Gemeinde gespeicherte [Textvorlagen](../settings/email-templates.md) angelegt, erscheint oberhalb des Felds eine Liste **Mit einer Vorlage beginnen**. Wenn Sie eine auswählen, wird ihr Text in die Nachricht kopiert, und Sie können ihn noch bearbeiten. Der Schritt behält seine eigene Kopie, daher wirken sich spätere Änderungen an der Vorlage nicht auf den Schritt aus. Sobald eine Karte den Schritt betritt, erhält die Person die Textnachricht auf ihr Mobiltelefon. Um die Nachricht zu personalisieren, klicken Sie unter dem Nachrichtenfeld auf einen Chip, also **Vorname**, **Nachname**, **Anzeigename** oder **Gemeindename**. So wird `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` an Ihrer Cursorposition eingefügt. Jeder davon wird beim Senden mit den Angaben der Person gefüllt. Die Chips **Betrag**, **Spendendatum**, **Fonds** und **Beleg** fügen die Felder einer Spende ein. Sie werden nur gefüllt, wenn ein Auslöser **Spende · Erstellt** den Workflow gestartet hat. Zum Beispiel: `Danke, {{firstName}}, für deine Spende von {{amount}} an {{fund}}!`

- Hat die Person keine Mobilnummer hinterlegt, wird keine Textnachricht gesendet, und der Verlauf der Karte vermerkt **Text übersprungen: keine Mobilnummer**.
- Hat die Person den Empfang abbestellt, wird keine Textnachricht gesendet, und der Verlauf der Karte vermerkt **Text übersprungen: abbestellt**.
- Wird die Textnachricht gesendet, vermerkt der Verlauf der Karte **Text gesendet**. Schlägt der Versand fehl, weil zum Beispiel kein Anbieter für Textnachrichten verbunden ist oder Ihre Gemeinde keine Textguthaben mehr hat, wird der Fehler im Verlauf der Karte festgehalten. Die übrigen Aktionen des Schritts laufen dennoch weiter.

:::warning
Textnachrichten werden über den eigenen [Anbieter für Textnachrichten](../settings/church-settings.md#texting) Ihrer Gemeinde gesendet. Ist kein Anbieter verbunden, warnt der Aktionseditor mit *„Es ist kein Anbieter für Textnachrichten eingerichtet“*, und die Nachrichten werden nicht versendet.
:::

### Ein paar Tage warten (Drip-Sequenzen)

Die Aktion **Warten** hält eine Karte für die Anzahl der Tage, die Sie festlegen. Während sie wartet, wird die Karte als **Zurückgestellt** angezeigt. B1 prüft alle 30 Minuten, ob Wartezeiten abgelaufen sind. Eine Karte nimmt die Arbeit daher innerhalb von etwa einer halben Stunde nach Ende der Wartezeit wieder auf. Ist das Warten vorbei:

1. Laufen alle **übrigen Aktionen desselben Schritts** ab. So können Sie eine Drip-Sequenz bauen, zum Beispiel **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden**.
2. Hat der Schritt danach eine automatische Weiterleitung, zieht die Karte weiter. Andernfalls bleibt sie auf dem Schritt, damit eine Person sie übernehmen kann.

:::tip
Ein **Warten** ganz am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zurückzuhalten, bevor sie einer ehrenamtlichen Person angezeigt wird. Zum Beispiel: *7 Tage warten, dann meldet sich eine Begleitperson.*
:::

## Personen als Karten hinzufügen

Es gibt mehrere Wege, Personen auf ein Board zu bringen:

- **Vom Board aus** -- Klicken Sie unten in einer Schrittspalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe wählen. Dann wird jedes Mitglied dieser Gruppe als Karte hinzugefügt.
- **Aus dem Datensatz einer Person** -- Verwenden Sie auf der Seite einer Person die Option **Zum Workflow hinzufügen**, um sie in einen Workflow zu setzen.
- **Aus der Personensuche** -- Wählen Sie mehrere Personen aus und verwenden Sie die Sammelaktion **Zum Workflow hinzufügen**, um sie alle auf einmal hinzuzufügen.
- **Automatisch mit einem Auslöser** -- Personen werden hinzugefügt, wenn etwas geschieht, etwa eine Formulareinsendung oder eine erste Spende (siehe unten unter [Auslöser](#triggers)).

Wenn Sie jemanden von Hand oder mit der Schrittaktion **Zum Workflow hinzufügen** hinzufügen, erhält diese Person nie eine zweite offene Karte im selben Workflow. Hat sie bereits eine offene Karte, wird sie übersprungen. (Bei einem Sammel-Hinzufügen erhalten nur Personen ohne offene Karte eine neue.) Sobald ihre Karte geschlossen ist, können Sie sie erneut hinzufügen. Auslöser folgen stattdessen ihrer eigenen Einstellung **Nur einmal pro Person**.

## Mit dem Board arbeiten {#working-the-board}

Öffnen Sie einen Workflow, um sein Board zu sehen. Jede Karte zeigt den Namen der Person, die zuständige Person und einen Chip mit Fälligkeitsdatum oder Status (**Überfällig** oder **Zurückgestellt**). Eine Schrittspalte zeigt außerdem kleine Abzeichen für die automatischen Aktionen, die sie ausführt, und Hinweise zu ihrer Weiterleitung. So sehen Sie auf einen Blick, wie die Karten fließen.

- **Eine Karte verschieben** -- Ziehen Sie eine Karte von einer Spalte in die nächste, sobald die Person weiterkommt.
- **Eine Karte öffnen** -- Doppelklicken Sie auf eine Karte (oder klicken Sie darauf), um ihr Detailfenster zu öffnen. Dort können Sie den Schritt ändern, die Karte neu zuweisen, Notizen hinzufügen und den bisherigen Verlauf prüfen.

Im Detailfenster der Karte können Sie:

- Die Karte einer anderen Person oder Gruppe **zuweisen**.
- Die Karte für 1 Tag, 3 Tage oder 1 Woche **zurückstellen**, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- Zum vorherigen Schritt **zurücksenden** oder zum nächsten Schritt **überspringen**.
- **Zuständigkeit festhalten** -- Die gleiche zuständige Person bleibt auf der Karte, auch wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte beim Wechsel in einen neuen Schritt der Standardzuständigen Person dieses Schritts zugewiesen. Mit dem Festhalten bleibt die bisherige Person durchgehend verantwortlich.
- Die Karte **abschließen**, oder eine Schaltfläche **Ergebnis** wählen, falls der Schritt Ergebnisse konfiguriert hat (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).
- **Karte entfernen** -- Nehmen Sie eine Karte vom Board, ohne sie abzuschließen, zum Beispiel wenn eine Person versehentlich hinzugefügt wurde. Nach der Bestätigung wird die Karte geschlossen und von allen Listen entfernt. Keine Ergebnisse, Weiterleitungen oder Schrittaktionen laufen, und der Verlauf bleibt mit dem Eintrag **Entfernt** erhalten. Bei einer [Bestätigung einer Dienstzusage](#serving-assignment-confirmations) schließt das Entfernen der Karte die Anfrage auf dieselbe Weise.
- **Notizen hinzufügen** und die **Aktivität** der Karte einsehen -- ein Protokoll der ausgeführten automatischen Aktionen (gesendete E-Mails, Wartezeiten usw.) mit Datum und Uhrzeit.

Bei einer Karte zu einer Person zeigt das Detailfenster außerdem Mobilnummer und E-Mail-Adresse dieser Person als Links, über die Sie anrufen oder eine E-Mail schreiben können. Außerdem gibt es einen Link **Profil ansehen**, wenn Sie Personen ansehen dürfen. Die Person, der die Karte zugewiesen ist, sieht Telefon und E-Mail auch ohne Zugriff auf Personen.

Notizen werden mit der Karte gespeichert. Wer die Karte öffnen kann, einschließlich der zugewiesenen Person oder Gruppe, kann die Notizen lesen und eigene hinzufügen. Wer die Karte nicht öffnen kann, sieht ihre Notizen nicht.

### Sammelaktionen

Wählen Sie die Kästchen mehrerer Karten aus, um sie gemeinsam zu bearbeiten. Um alle Karten eines Schritts auf einmal auszuwählen, setzen Sie das Häkchen **Alle auswählen** im Spaltenkopf dieses Schritts. Ein erneutes Anklicken hebt die Auswahl auf. Eine Symbolleiste erscheint, mit der Sie für alle ausgewählten Karten **Abschließen**, **Zurückstellen**, **Zuweisen** (neu zuweisen) oder **Verschieben nach…** einen anderen Schritt wählen können.

## Weiterleitung mit Ergebnissen und Bedingungen {#routing-cards-with-outcomes-and-conditions}

Die Weiterleitung legt fest, wohin eine Karte geht, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten der Weiterleitung zu konfigurieren.

### Ergebnis-Schaltflächen

Ergebnisse sind Schaltflächen im Detailfenster der Karte, wenn Sie eine Karte in diesem Schritt abschließen. Statt einer einzigen Schaltfläche **Abschließen** können Sie Wahlmöglichkeiten anbieten, etwa „Einer Gruppe beigetreten“ oder „Kein Interesse“. Jedes Ergebnis kann:

- Die Karte an **einen anderen Schritt** in diesem Workflow senden,
- Die Karte vollständig an einen **anderen Workflow übergeben**, oder
- Die Karte **schließen**.

So kann eine einzelne Entscheidung die Person auf verschiedene Wege führen.

### Automatische Weiterleitung (mit Bedingungen)

Automatische Weiterleitungen schieben eine Karte weiter, **sobald sie einen Schritt betritt** (und nachdem die automatischen Aktionen abgeschlossen sind), ohne dass jemand klicken muss, sofern die Person die festgelegten Bedingungen erfüllt. Fügen Sie eine Weiterleitung hinzu, wählen Sie den Zielschritt und legen Sie eine oder mehrere **Bedingungen** fest, zum Beispiel Standort, Alter oder Mitgliedsstatus einer Person. Textfelder lassen sich exakt oder mit **enthält**, **beginnt mit** oder **endet mit** abgleichen. Eine Weiterleitung ohne Bedingungen trifft auf alle zu.

Datumsbedingungen (Heutiges Datum, Geburtsdatum oder Jubiläum) können das vollständige Datum oder nur einen Teil davon vergleichen, also den Wochentag, den **Tag des Monats**, den **Monat** oder die verstrichenen Jahre. Beim Geburtsdatum oder Jubiläum einer Person bietet **Tag des Monats** die relative Option **Heute**. So trifft eine Bedingung wie *Geburtsdatum · Tag des Monats = Heute* auf Personen zu, deren Geburtstag auf den heutigen Tag des Monats fällt. Der **Monat** bietet **Vorheriger Monat**, **Aktueller Monat** und **Nächster Monat**. Relative Werte wie diese werden anhand der Zeitzone Ihrer Gemeinde berechnet. So stimmen sie mit dem Kalendertag Ihrer Gemeinde überein und nicht mit dem des Servers.

Die Gruppe **Spenden** der Bedingungen enthält **Ehemals regelmäßig Spendende**. Damit werden Personen gefunden, die früher regelmäßig gegeben und dann aufgehört haben. Legen Sie drei Zahlen fest: *Gab in mindestens* **3** *der letzten* **12** *Wochen, dann nichts in den letzten* **3** *Wochen* (das sind die Standardwerte). Die Wochen werden von heute aus in der Zeitzone Ihrer Gemeinde zurückgezählt, und eine erstattete Spende zählt nicht. Am nützlichsten ist die Bedingung bei einem [Zeitplan-Auslöser](#schedule-triggers), zum Beispiel einer wöchentlichen Regel, die ehemals regelmäßig Spendende einem Board für seelsorgerliche Nachbetreuung hinzufügt. Die Bedingung betrachtet nur Spendendaten, nie Beträge, und Karten und Benachrichtigungen zeigen nie Beträge. Da sie offenlegt, wer aufgehört hat zu geben, sehen diese Option nur Personen, die Spenden einsehen dürfen, und nur sie können sie hinzufügen, ändern oder entfernen.

Kann eine Bedingung einer Weiterleitung aus irgendeinem Grund nicht geprüft werden, gilt diese Weiterleitung als nicht zutreffend. Die Karte bleibt auf dem Schritt (oder folgt einer anderen Weiterleitung, die zutrifft), statt festzuhängen.

:::info
Auf dem Board zeigt jede Schrittspalte kleine Hinweise zu ihrer Weiterleitung, zum Beispiel eine Ergebnisbezeichnung oder „wenn zutreffend“, gefolgt von einem Pfeil zum Zielschritt oder Zielworkflow.
:::

## Vollautomatische Schritte {#fully-automated-steps}

Sie können einen Schritt vollständig von selbst laufen lassen, ohne dass jemand daran arbeitet. Geben Sie dem Schritt seine **automatischen Aktionen** und fügen Sie eine **automatische Weiterleitung** ohne Bedingungen hinzu, die auf den nächsten Schritt zeigt. Sobald eine Karte den Schritt betritt, laufen die Aktionen, und die Weiterleitung schiebt die Karte sofort weiter. Die Karte durchläuft den Schritt also direkt.

:::tip
Kombinieren Sie das mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf“ weiterleiten.* E-Mail und Timing übernimmt das System, und eine ehrenamtliche Person sieht die Karte erst, wenn der persönliche Kontakt ansteht.
:::

## Auslöser {#triggers}

Auslöser fügen Personen automatisch einem Workflow hinzu, wenn etwas geschieht. So müssen Sie nie Karten von Hand anlegen. Klicken Sie auf einem Workflow-Board auf den Reiter **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Ereignisauslöser

Sie greifen, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur passende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** -- z. B. jede Person hinzufügen, deren Status zu *Besuchende* oder *Gäste* wird (der Status für Personen, die sich selbst registrieren).
- **Spende · Erstellt** -- z. B. eine erste oder große Spende einem Dankes-Workflow hinzufügen (nach Betrag, Fonds oder Zahlungsart filtern).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** -- jede Person hinzufügen, die ein bestimmtes Formular absendet (ideal für eine Karte „Ich bin neu“ oder „Kontakt“).

### Zeitplan-Auslöser {#schedule-triggers}

Sie laufen wiederkehrend, täglich, wöchentlich, monatlich oder jährlich, und prüfen dabei eine Reihe von Bedingungen. Nutzen Sie sie für zeitgesteuerte Kontaktaufnahme wie *alle, deren Geburtstag heute ist* (Geburtsdatum · Tag des Monats = **Heute**, mit dem Monat auf **Aktueller Monat**) oder einen *monatlichen* Besuchsanruf. Auch ohne **Nur einmal pro Person** fügt ein Zeitplan-Auslöser dieselbe Person innerhalb eines Wiederholungszeitraums nicht erneut hinzu. Der Zeitraum ist ein Tag, eine Woche, ein Monat oder ein Jahr, je nachdem, wie oft er läuft.

Für jeden Auslöser können Sie außerdem festlegen:

- Den **Startschritt**, in dem die neue Karte landet (standardmäßig der erste Schritt).
- **Nur einmal pro Person** -- damit dieselbe Person durch den Auslöser nicht zweimal in den Workflow kommt. Ist diese Option aktiv, wird jede Person übersprungen, die bereits eine Karte in diesem Workflow hat.
  - **Nach Abschluss ihrer Karte erneut hinzufügen** -- erscheint, wenn **Nur einmal pro Person** aktiv ist. Setzen Sie das Häkchen, damit der Auslöser eine Person erneut hinzufügt, sobald ihre frühere Karte in diesem Workflow geschlossen ist. Eine Person hat trotzdem nie zwei offene Karten im selben Workflow gleichzeitig. Nutzen Sie dies für Dinge, die mehr als einmal passieren können, etwa einen wiederkehrenden Gast oder einen jährlichen Prozess.
- **Aktiv** -- schaltet den Auslöser ein oder aus, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen Auslöser **Formular · Eingereicht** mit der Vorlage **Nachfassen bei neuen Besuchenden**, um Ihre Karte „Kontakt“ oder „Ich bin neu“ in eine automatische Nachfassstrecke zu verwandeln.
:::

## Bestätigungen von Dienstaufgaben {#serving-assignment-confirmations}

Eine besondere Art von Workflow kann [Dienstanfragen](./plans.md#assigning-team-members) nachverfolgen, bis jede ehrenamtliche Person zusagt oder absagt. Statt Personen verfolgt jede Karte auf diesem Board **eine Zuweisung**, also eine Person in einer Position an einem Plan. Zwei Rollen oder zwei Gottesdienste für dieselbe Person erhalten getrennte Karten. Die Funktion ist optional. Für einen Plan ändert sich nichts, bis Sie in seinen Einstellungen einen Bestätigungs-Workflow wählen.

### Einrichten

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen** und wählen Sie die Vorlage **Bestätigung einer Dienstzusage**. (Oder starten Sie einen **leeren Workflow** und setzen Sie seinen **Zweck** auf **Bestätigung einer Dienstzusage**.) Das Erstellen aus der Vorlage erfordert die Berechtigung, Textnachrichten zu senden, da ein Textschritt enthalten ist.
2. Prüfen Sie die Schritte. Die Vorlage beginnt mit:
   - **Anfrage senden und auf Antwort warten** -- sendet die Dienstanfrage per E-Mail und Textnachricht, wartet 2 Tage, sendet eine Erinnerungs-E-Mail, wartet einen weiteren Tag und schiebt die Karte dann automatisch weiter.
   - **Ehrenamtliche Person zu unbeantworteter Anfrage anrufen** -- ein Schritt, in dem eine Person die ehrenamtliche Person anruft, mit Fälligkeit in 1 Tag. Legen Sie in diesem Schritt eine **Standardzuständige Person** fest. Ist keine gesetzt, geht die Karte an die Leitung des Bereichs oder, falls es keine gibt, an das Team des Bereichs.
3. Passen Sie die Wartezeiten, Nachrichten und Schritte an Ihre Gemeinde an.
4. Öffnen Sie die [Einstellungen eines Plans](./plans.md#plan-settings) und wählen Sie unter **Bestätigungs-Workflow** diesen Workflow.

Diese Workflows verwenden die Aktion **Dienstanfrage senden** statt **E-Mail senden** und **Textnachricht senden**. Wählen Sie **E-Mail** oder **Textnachricht** und schreiben Sie optional eine **Anfragenachricht**. Die Anfrage enthält immer Rolle, Plan, Gottesdienstdatum und einen Link zur Antwort. In Ihrer Nachricht können Sie `{{planName}}`, `{{positionName}}` und `{{serviceDate}}` verwenden. Lassen Sie die Nachricht leer, wird die Standardanfrage verwendet. Benachrichtigungseinstellungen der Ehrenamtlichen, deren Zustimmung zu Textnachrichten, Ihr Anbieter für Textnachrichten und die E-Mail-Freigabe Ihrer Gemeinde gelten alle. Jeder übersprungene oder blockierte Versuch wird auf der Karte festgehalten. **E-Mail senden**, **Textnachricht senden** und **Zum Workflow hinzufügen** sind auf diesen Boards nicht verfügbar.

Der Reiter **Auslöser** eines Bestätigungs-Workflows erklärt, wie Karten gestartet werden, statt Auslöser anzubieten. Diese Workflows erscheinen außerdem nicht in den Listen **Zum Workflow hinzufügen** für Personen.

### Wie Karten gestartet und geschlossen werden

- Karten starten, wenn Sie Ehrenamtliche zu einem veröffentlichten Plan **benachrichtigen** (siehe [Ehrenamtliche benachrichtigen](./plan-validation.md#notifying-volunteers)). Jede neue, unbeantwortete Zuweisung erhält eine Karte. Speichern, Veröffentlichen, Kopieren oder automatisches Ausfüllen eines Plans kontaktiert von selbst niemanden. Vorläufig geplante Pläne versenden nichts.
- Ehrenamtliche erhalten weiterhin die übliche Benachrichtigung in der App. Die Nachfassung per E-Mail und Textnachricht kommt vom Workflow.
- Wenn die ehrenamtliche Person **zusagt oder absagt**, wird ihre Karte automatisch geschlossen, zusammen mit allen damit verknüpften Nachfass-Aufgaben.
- Das Detailfenster der Karte zeigt Position, Gottesdienstdatum und einen Link zum Plan. Statt **Abschließen** lautet die Schaltfläche **Nachfassen erledigt**. Ein Klick darauf vermerkt, dass nachgefasst wurde. Die Karte bleibt aber offen und zugewiesen (angezeigt als **Warte auf Antwort**), bis die ehrenamtliche Person antwortet oder die Antwortfrist abläuft.
- Die Antwortfrist ist das Ende des letzten Gottesdienstes, in dem das Team der Position dient. Hat der Plan keine passenden Zeiten, ist es das Ende des Gottesdiensttages. Hat bis dahin niemand geantwortet, schließt sich die Karte mit **Antwortfrist abgelaufen**. Eine Aufgabe **Unbeantwortete Dienstanfrage prüfen** geht an die aktuell zuständige Person der Karte oder an die Leitung des Bereichs, damit jemand entscheiden kann, wie der Platz besetzt wird. Die Zuweisung bleibt **Unbestätigt**.
- Das Entfernen der Zuweisung, das Ändern ihrer Person, Position oder des Plandatums, das Zurücksetzen des Plans auf vorläufig geplant oder der Wechsel des Plans zu einem anderen Bestätigungs-Workflow schließt die Karte. Eine geschlossene Karte wird durch kein erneutes **Benachrichtigen** wieder geöffnet. Fügen Sie eine neue Zuweisung hinzu, um eine frische Anfrage zu senden.

:::info
Bei Anfragen, die über einen Bestätigungs-Workflow gesendet werden, gehen [Erinnerungen an Ehrenamtliche](./plans.md#volunteer-reminders) nur an Ehrenamtliche, die **zugesagt** haben. So erhalten Personen, die noch auf eine Antwort warten, keine Erinnerungen zusätzlich zu den Nachfassungen des Workflows.
:::

## Meine Karten

Ehrenamtliche und Mitarbeitende müssen nicht jedes Board durchsuchen, um ihre Arbeit zu finden. Die Liste **Meine Karten** auf der Seite **Meine Arbeit** zeigt jede Karte, die der aktuell angemeldeten Person zugewiesen ist, über alle Workflows hinweg. Um dorthin zu gelangen, klicken Sie oben auf der Seite Workflows auf **Meine Karten** oder öffnen Sie im Sprungmenü **Dienste > Meine Arbeit**. Ein Klick auf eine Karte öffnet ihr Detailfenster direkt auf der Seite Meine Arbeit. Dort können Sie die Karte bearbeiten oder entfernen, ohne die Seite zu verlassen. Wenn Sie Workflows ansehen dürfen, enthält das Fenster außerdem einen Link **Workflow-Board öffnen** zum Board, zu dem die Karte gehört.

## Berichte

Öffnen Sie einen Workflow und klicken Sie auf **Berichte**, um Auswertungen für diesen Workflow zu sehen:

- **Überfällig** -- die Anzahl der Karten nach ihrem Fälligkeitsdatum.
- **Karten pro Schritt** -- wie viele Karten derzeit auf jedem Schritt liegen, als Säulendiagramm dargestellt.
- **Abgeschlossen (30 Tage)** -- der Durchsatz der letzten 30 Tage, als Liniendiagramm dargestellt.

Nutzen Sie diese Werte, um Engpässe zu erkennen, etwa einen Schritt, an dem sich Karten stauen und nie weiterkommen.

## Verwandte Artikel

- [Aufgaben](./tasks.md) -- die einzelnen Aktionspunkte, auf denen die Workflow-Karten aufbauen
- [Formulare](../forms/index.md) -- die Formulare erstellen, die Workflows auslösen können
- [Gruppen](../groups/index.md) -- die Gruppen, denen eine Aktion „Zur Gruppe hinzufügen“ Personen zuordnen kann
- [Gottesdienstpläne](./plans.md) -- einen Bestätigungs-Workflow für die Dienstanfragen eines Plans wählen
- [Rollen & Berechtigungen](../settings/roles-permissions.md) -- festlegen, wer Workflows anzeigen, bearbeiten und verwalten darf
