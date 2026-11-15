---
title: "Workflows"
description: "Erstellen Sie Kanban-artige Tafeln in B1 Admin, die Personen durch Nachbetreuungsschritte führen – mit automatischen E-Mails, SMS und Auslösern, die Personen automatisch hinzufügen."
---

# Workflows

<div class="article-intro">

Workflows führen Personen auf einer visuellen Tafel durch eine Reihe von Schritten. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert – von der Nachbetreuung eines Erstgasts über einen Mitgliedschaftsprozess bis zum Dankeschön für einen Erstspender und allem anderen, wo Sie viele Personen durch dieselben Phasen verfolgen müssen. Ein Schritt kann eine ehrenamtlich tätige Person bitten, etwas zu tun (anrufen, ein Gespräch führen) **und** zugleich eigene automatische Aktionen ausführen – eine E-Mail oder SMS senden, ein paar Tage warten, die Person einer Gruppe hinzufügen. Workflows übernehmen so sowohl die persönliche Nachbetreuung als auch die Routinearbeit drumherum. Workflows erweitern die [Aufgaben](./tasks.md) zu einer Kanban-Tafel zum Ziehen und Ablegen, damit niemand durch das Raster fällt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin vorhanden sind
- Machen Sie sich mit der Funktionsweise von [Aufgaben](./tasks.md) vertraut, denn jede Karte auf einer Tafel ist eine Aufgabe
- Um die Aktion **E-Mail senden** zu verwenden, erstellen Sie zuerst die gewünschten E-Mail-Vorlagen (verwaltet unter **Einstellungen → E-Mail-Vorlagen**)
- Um die Aktion **SMS senden** zu verwenden, verbinden Sie zuerst einen [SMS-Anbieter](../settings/church-settings.md#texting)
- Sie benötigen die passende Berechtigung für Aufgaben. Anzeigen, Karten bearbeiten und Workflows verwalten sind getrennte Berechtigungsstufen (siehe [Rollen und Berechtigungen](../settings/roles-permissions.md))

</div>

## Workflows anzeigen {#viewing-workflows}

Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Dienste** auf und klicken Sie auf **Workflows**. Ihre Workflows werden in einer Tabelle aufgelistet, die jeweils die **Kategorie** und den **Status** (**Aktiv** oder **Inaktiv**) zeigt. Verwenden Sie Kategorien, können Sie über Reiter oberhalb der Liste nach Kategorie filtern. Klicken Sie auf einen Workflow, um seine Tafel zu öffnen.

## Einen Workflow erstellen {#creating-a-workflow}

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Leerer Workflow** -- von Grund auf neu beginnen und eigene Schritte aufbauen.
   - **Aus einer Vorlage** -- mit einer fertigen Reihe von Schritten starten, die Sie bearbeiten können. Zu den integrierten Vorlagen gehören:
     - **Nachbetreuung neuer Gäste** -- Willkommens-E-Mail senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftskurs** -- Interesse bekunden → Zum Kurs anmelden → Kurs besuchen → Mitgliedschaft abschließen
     - **Dankeschön an Erstspender** -- Dankeskarte senden → Wirkung der Spende teilen → Treuhänderschaft
     - **Bestätigung einer Dienstzuweisung** -- Anfrage senden und auf Antwort warten → Freiwillige zur unbeantworteten Anfrage anrufen (siehe [Bestätigungen von Dienstzuweisungen](#serving-assignment-confirmations))

   Das Erstellen der Schritte einer Vorlage kann einen Moment dauern. Während dieser Zeit lautet die Schaltfläche **Workflow hinzufügen** **Wird erstellt...** und kann nicht erneut angeklickt werden, sodass kein Duplikat entsteht. Schlägt etwas fehl, zeigt die Seite die Meldung *„Der Workflow konnte nicht erstellt werden. Bitte versuchen Sie es erneut.“*
3. Geben Sie dem Workflow einen **Namen**.
4. Weisen Sie optional eine **Kategorie** zu, um zusammengehörige Workflows zu gruppieren. Im Auswahlfeld können Sie direkt eine neue Kategorie anlegen.
   Bei einem leeren Workflow wählen Sie außerdem den **Zweck des Workflows**: **Nachbetreuung von Personen** (die übliche Art) oder **Bestätigung einer Dienstzuweisung**. Der Zweck lässt sich nach dem Erstellen nicht mehr ändern.
5. Lassen Sie den Workflow **Aktiv**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inaktiv**, um ihn aus den Listen zum Hinzufügen zu Workflows auszublenden.
6. Klicken Sie auf **Speichern**.

:::tip
Verwenden Sie die Schaltfläche **Duplizieren** in der Liste der Workflows, um einen vorhandenen Workflow – einschließlich seiner Schritte, automatischen Aktionen und Weiterleitungen – als Ausgangspunkt für einen neuen zu kopieren.
:::

## Die Tafel mit Schritten aufbauen {#building-the-board-with-steps}

Jede Workflow-Tafel besteht aus **Schritten**, die von links nach rechts als Spalten angezeigt werden. Öffnen Sie einen Workflow und verwenden Sie **Schritt hinzufügen**, um jede Phase Ihres Prozesses anzulegen.

Beim Hinzufügen oder Bearbeiten eines Schritts können Sie Folgendes einstellen:

- **Schrittname** -- die Spaltenüberschrift (zum Beispiel „Willkommensanruf“ oder „Warten auf Anmeldung“).
- **Fällig in (Tagen)** -- legt automatisch ein Fälligkeitsdatum fest, sobald eine Karte in diesen Schritt gelangt. Karten nach ihrem Fälligkeitsdatum werden als **Überfällig** markiert.
- **Standardzuständige Person** -- die Person oder Gruppe, der neue Karten in diesem Schritt automatisch zugewiesen werden. Ist die Standardzuständige eine Person, erhält sie eine Benachrichtigung, dass ihr eine Karte zugewiesen wurde.
- **Automatische Aktionen** -- Dinge, die das System selbst erledigt, sobald eine Karte eintrifft (siehe unten).
- **Weiterleitung** -- wohin die Karte wandert, wenn sie den Schritt verlässt (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie die Schrittspalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge legt außerdem den Standardweg fest, den eine Karte nimmt, wenn keine andere Weiterleitung greift.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen gehören zum Schritt, daher öffnet der Editor diese Bereiche erst, wenn der Schritt existiert.
:::

## Automatische Aktionen {#automated-actions}

Jeder Schritt kann eine Liste **automatischer Aktionen** enthalten, die von selbst ausgeführt werden, sobald eine Karte den Schritt **betritt** – noch bevor jemand sie anfasst. So spricht ein Schritt sowohl eine ehrenamtlich tätige Person an als auch die Routinearbeit rund um die Nachbetreuung übernimmt.

Öffnen Sie im Schritteditor den Bereich **Automatische Aktionen**, klicken Sie auf **Aktion hinzufügen**, wählen Sie einen Typ und füllen Sie seine Einstellungen aus. Fügen Sie so viele hinzu, wie Sie brauchen; sie werden **von oben nach unten in dieser Reihenfolge** ausgeführt. Klicken Sie auf **Speichern** des Schritts, um den Schritt und alle seine Aktionen gemeinsam zu speichern. Das Entfernen einer Aktion über ihr Papierkorbsymbol wirkt sofort.

| Aktion | Was sie bewirkt |
|---|---|
| **E-Mail senden** | Sendet der Person eine E-Mail-Vorlage Ihrer Wahl. Sie können die Betreffzeile überschreiben. |
| **SMS senden** | Sendet der Person eine von Ihnen verfasste Nachricht über den [SMS-Anbieter](../settings/church-settings.md#texting) Ihrer Gemeinde. |
| **Warten** | Hält die Karte für eine Anzahl von Tagen an, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person einer von Ihnen gewählten [Gruppe](../groups/index.md) hinzu. |
| **Aus Gruppe entfernen** | Entfernt die Person aus einer von Ihnen gewählten Gruppe. |
| **Anwesenheit erfassen** | Markiert die Person als anwesend bei einer laufenden Gottesdienstzeit einer Gruppe (siehe unten). |
| **Zu Workflow hinzufügen** | Startet die Person in einem anderen Workflow – nützlich für die Übergabe zwischen Prozessen. |
| **Notiz hinzufügen** | Hält eine Notiz im Verlauf der Karte fest. |
| **Feld setzen** | Aktualisiert ein Feld im Datensatz der Person: Mitgliedsstatus, Familienstand, Geschlecht, Ort, Bundesland oder Postleitzahl. |
| **Webhook** | Sendet die Angaben der Karte an eine externe Web-Adresse (URL), die Sie angeben, zur Anbindung an andere Systeme. |
| **Aufgabe erstellen** | Erstellt eine [Aufgabe](./tasks.md) mit dem Titel und der Beschreibung, die Sie eingeben, zugewiesen an die Person Ihrer Wahl. |
| **Person benachrichtigen** | Sendet einer Mitarbeiterin, einem Mitarbeiter oder einer ehrenamtlich tätigen Person Ihrer Wahl eine E-Mail und eine B1-Benachrichtigung zur Karte (siehe unten). |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **bleibt die Karte in diesem Schritt**, damit eine Person sie bearbeiten kann – außer der Schritt hat eine automatische Weiterleitung, die sie weiterschiebt (siehe [Vollautomatische Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte auf dem normalen Weg eintrifft – wenn sie zum ersten Mal hinzugefügt wird, wenn ein Ergebnis oder eine automatische Weiterleitung sie hereinbringt oder nachdem eine Wartezeit abgelaufen ist. Sie werden **nicht** erneut ausgeführt, wenn eine Mitarbeiterin oder ein Mitarbeiter eine Karte manuell auf den Schritt zieht oder zurückschickt. So erhält eine Person nicht dieselbe E-Mail zweimal.
:::

### E-Mails senden {#sending-email}

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional einen eigenen Betreff ein. Sobald eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Ist für die Person keine E-Mail-Adresse hinterlegt, überspringt der Schritt diese Aktion einfach.) [Platzhalter](../settings/email-templates.md#merge-fields) in der Vorlage, etwa `{{firstName}}`, werden mit den eigenen Angaben der Person gefüllt. Hat ein Auslöser **Spende · Erstellt** den Workflow gestartet, werden die Spendenfelder `{{amount}}`, `{{giftDate}}`, `{{fund}}` und `{{receipt}}` aus dieser Spende gefüllt – auch in Schritten, die nach einer Wartezeit laufen. Siehe [Platzhalter für Spenden](../settings/email-templates.md#gift-merge-fields).

Wenn die E-Mail versandt wird, hält der Verlauf der Karte **E-Mail gesendet** fest. Kann sie nicht versandt werden – etwa weil die E-Mail Ihrer Gemeinde noch nicht freigegeben ist oder das Tageslimit erreicht wurde –, wird kein Eintrag „E-Mail gesendet“ hinzugefügt.

:::info
Workflow-E-Mails werden erst versandt, nachdem Ihre Gemeinde für den Versand von Gruppen-E-Mails freigegeben wurde, und sie zählen auf das Tageslimit für E-Mails Ihrer Gemeinde. Siehe [Gruppen-E-Mails für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Die Aktion **E-Mail senden** warnt Sie im Schritteditor, wenn diese E-Mails nicht versandt werden: *„Die E-Mail Ihrer Gemeinde wurde noch nicht freigegeben...“*, wenn die Freigabe noch aussteht, oder *„Die E-Mail Ihrer Gemeinde ist pausiert...“*, wenn kürzlich Nachrichten zurückgewiesen oder als Spam gemeldet wurden.
:::

### Anwesenheit erfassen {#recording-attendance}

Wählen Sie **Anwesenheit erfassen** und klicken Sie auf **Gruppe wählen**, um die Gruppe auszuwählen, deren Anwesenheit erfasst werden soll. Wenn die Aktion läuft, wird die Person für die gerade laufende Gottesdienstzeit dieser Gruppe als anwesend markiert – genau so, als hätte sie sich eingecheckt. Das ist nützlich zusammen mit einem Auslöser, der Personen beim Eintreffen zum Workflow hinzufügt, sodass sie ohne separates Check-in gezählt werden.

- Die Anwesenheit wird zum Zeitpunkt erfasst, an dem die Karte **erstellt** wurde. Eine **Warten**-Aktion weiter vorne im Workflow schiebt sie daher nicht über den Gottesdienst hinaus.
- Gezählt werden nur Gottesdienstzeiten mit Wochentag und Startzeit. Läuft im Moment keine Gottesdienstzeit der Gruppe, wird nichts erfasst, und der Verlauf der Karte vermerkt **Kein geplanter Gottesdienst läuft – Anwesenheit nicht erfasst**.
- Wurde die Anwesenheit erfasst, zeigt der Verlauf der Karte **Anwesenheit erfasst** gefolgt vom Namen der Gruppe. Führt man die Aktion für denselben Gottesdienst erneut aus, wird die Person nicht doppelt gezählt.

### Eine Person benachrichtigen {#notifying-a-person}

Wählen Sie **Person benachrichtigen**, klicken Sie auf **Person wählen** und geben Sie optional eine **Nachricht** ein. Sobald eine Karte den Schritt betritt, erhält diese Person eine E-Mail und eine B1-Benachrichtigung mit dem Namen der Person auf der Karte, den Namen des Workflows und des Schritts, Ihrer Nachricht und einem Link zum Öffnen der Karte. Verwenden Sie dies, um einer Mitarbeiterin oder einem Gemeindeleiter Bescheid zu geben – zum Beispiel: *„Den Pastor benachrichtigen, sobald jemand den Schritt Mitgliedschaftsgespräch erreicht.“* Der Verlauf der Karte hält **Benachrichtigt** gefolgt vom Namen der Person fest.

### SMS senden {#sending-a-text}

Wählen Sie **SMS senden** und geben Sie die **Textnachricht** ein (bis zu 1.600 Zeichen). Hat Ihre Gemeinde [Textvorlagen](../settings/email-templates.md) gespeichert, erscheint oberhalb des Feldes eine Liste **Aus einer Vorlage starten**. Wählen Sie eine Vorlage, wird ihr Text in die Nachricht kopiert, und Sie können ihn trotzdem bearbeiten. Der Schritt behält seine eigene Kopie, sodass spätere Änderungen an der Vorlage den Schritt nicht verändern. Sobald eine Karte den Schritt betritt, erhält die Person die SMS auf ihrem Mobiltelefon. Um die Nachricht zu personalisieren, klicken Sie unter dem Nachrichtenfeld auf einen Chip – **Vorname**, **Nachname**, **Anzeigename** oder **Gemeindename** –, um `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` an der Cursorposition einzufügen. Jeder davon wird beim Versand mit den Angaben der Person gefüllt. Die Chips **Betrag**, **Spendendatum**, **Fonds** und **Beleg** fügen die Spendenfelder ein, die nur gefüllt werden, wenn ein Auslöser **Spende · Erstellt** den Workflow gestartet hat. Zum Beispiel: `Thanks {{firstName}} for your gift of {{amount}} to {{fund}}!`

- Ist für die Person keine Mobilnummer hinterlegt, wird keine SMS gesendet, und der Verlauf der Karte vermerkt **SMS übersprungen: keine Mobilnummer**.
- Hat sich die Person abgemeldet, wird keine SMS gesendet, und der Verlauf der Karte vermerkt **SMS übersprungen: abgemeldet**.
- Wenn die SMS versandt wird, vermerkt der Verlauf der Karte **SMS gesendet**. Schlägt der Versand fehl – etwa weil kein SMS-Anbieter verbunden ist oder Ihrer Gemeinde die SMS-Guthaben ausgegangen sind –, wird der Fehler im Verlauf der Karte protokolliert, und die übrigen Aktionen des Schritts laufen trotzdem weiter.

:::warning
SMS werden über den eigenen [SMS-Anbieter](../settings/church-settings.md#texting) Ihrer Gemeinde versendet. Ist kein Anbieter verbunden, warnt der Aktionseditor *„Es ist kein SMS-Anbieter eingerichtet“*, und SMS werden nicht versandt.
:::

### Einige Tage warten (Drip-Sequenzen) {#waiting-a-few-days-drip-sequences}

Die Aktion **Warten** hält eine Karte für die Anzahl der Tage an, die Sie festlegen. Während sie wartet, wird die Karte als **Zurückgestellt** angezeigt. B1 prüft abgelaufene Wartezeiten alle 30 Minuten, daher nimmt eine Karte ihren Weg innerhalb von etwa einer halben Stunde nach Ende der Wartezeit wieder auf. Ist die Wartezeit vorbei:

1. Laufen alle **übrigen Aktionen desselben Schritts** – so können Sie eine Drip-Sequenz bauen wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden**.
2. Dann wandert die Karte weiter, sofern der Schritt eine automatische Weiterleitung hat; andernfalls bleibt sie im Schritt, bis eine Person sie übernimmt.

:::tip
Eine **Warten**-Aktion ganz am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte „zurückzuhalten“, bevor sie einer ehrenamtlich tätigen Person angezeigt wird – zum Beispiel *7 Tage warten, dann meldet sich ein Coach*.
:::

## Personen als Karten hinzufügen {#adding-people-as-cards}

Es gibt mehrere Wege, Personen auf eine Tafel zu bringen:

- **Von der Tafel aus** -- Klicken Sie unten in einer Schrittspalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe wählen; dann wird jedes Mitglied dieser Gruppe als Karte hinzugefügt.
- **Aus dem Datensatz einer Person** -- Verwenden Sie **Zu Workflow hinzufügen** auf der Seite einer Person, um sie in einen Workflow einzuordnen.
- **Aus der Personensuche** -- Wählen Sie mehrere Personen aus und verwenden Sie die Sammelaktion **Zu Workflow hinzufügen**, um sie alle auf einmal hinzuzufügen.
- **Automatisch mit einem Auslöser** -- Personen werden hinzugefügt, wenn etwas geschieht, etwa eine Formulareinreichung oder eine erste Spende (siehe unten [Auslöser](#triggers)).

Wer von Hand hinzugefügt wird oder über eine Aktion **Zu Workflow hinzufügen** eines Schritts, erhält nie eine zweite offene Karte im selben Workflow. Hat die Person bereits eine offene Karte, wird sie übersprungen (bei einem Sammel-Hinzufügen erhalten nur Personen ohne Karte eine neue). Sobald ihre Karte geschlossen ist, können Sie sie erneut hinzufügen. Auslöser folgen stattdessen ihrer eigenen Einstellung **Nur einmal pro Person**.

## Mit der Tafel arbeiten {#working-the-board}

Öffnen Sie einen Workflow, um seine Tafel zu sehen. Jede Karte zeigt den Namen der Person, die zuständige Person und einen Chip mit Fälligkeitsdatum oder Status (**Überfällig** oder **Zurückgestellt**). Eine Schrittspalte zeigt außerdem kleine Abzeichen für die automatischen Aktionen, die sie ausführt, und Hinweise zu ihrer Weiterleitung – so haben Sie auf einen Blick einen Überblick, wie die Karten fließen. Innerhalb jeder Spalte steht die Karte, die den Schritt zuletzt betreten hat, ganz oben.

- **Karte verschieben** -- Ziehen Sie eine Karte von einer Spalte zur nächsten, sobald die Person vorankommt.
- **Karte öffnen** -- Doppelklicken Sie auf eine Karte (oder klicken Sie sie an), um ihre Detailschublade zu öffnen. Dort können Sie den Schritt ändern, sie neu zuweisen, Notizen hinzufügen und sehen, was bereits geschehen ist.

Aus der Kartenschublade können Sie:

- Die Karte einer anderen Person oder Gruppe **zuweisen**.
- Die Karte für 1 Tag, 3 Tage oder 1 Woche **zurückstellen**, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- **Zurück senden** zum vorherigen Schritt oder **Überspringen** zum nächsten Schritt.
- **Zuweisung fixieren** -- die gleiche zuständige Person auf der Karte behalten, selbst wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte beim Wechsel in einen neuen Schritt der Standardzuständigen dieses Schritts zugewiesen; das Fixieren hält die aktuelle Person durchgehend verantwortlich.
- Die Karte **abschließen**, um sie zu beenden, oder eine Schaltfläche **Ergebnis** wählen, falls der Schritt Ergebnisse konfiguriert hat (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).
- **Karte entfernen** -- nimmt eine Karte von der Tafel, ohne sie abzuschließen, zum Beispiel wenn jemand versehentlich hinzugefügt wurde. Nach Bestätigung wird die Karte geschlossen und von allen Listen entfernt. Keine Ergebnisse, Weiterleitungen oder Schrittaktionen laufen, und der Verlauf bleibt mit einem Eintrag **Entfernt** erhalten. Bei einer Karte zur [Bestätigung einer Dienstzuweisung](#serving-assignment-confirmations) schließt das Entfernen die Anfrage auf dieselbe Weise.
- **Notizen hinzufügen** und die **Aktivität** der Karte prüfen -- ein Protokoll der automatischen Aktionen, die gelaufen sind (gesendete E-Mails, Wartezeiten usw.), jeweils mit Datum und Uhrzeit.

Bei einer Karte zu einer Person zeigt die Schublade außerdem deren Mobilnummer und E-Mail als Links, über die Sie anrufen oder eine E-Mail schreiben können, sowie einen Link **Profil ansehen**, sofern Sie die Berechtigung haben, Personen anzuzeigen. Die Person, der eine Karte zugewiesen ist, sieht Telefonnummer und E-Mail auch dann, wenn sie keinen Zugriff auf Personen hat.

Notizen werden mit der Karte gespeichert. Alle, die die Karte öffnen können – einschließlich der Person oder Gruppe, der sie zugewiesen ist –, können die Notizen lesen und eigene hinzufügen. Personen, die die Karte nicht öffnen können, sehen ihre Notizen nicht.

### Sammelaktionen {#bulk-actions}

Wählen Sie die Kontrollkästchen bei mehreren Karten aus, um sie gemeinsam zu bearbeiten. Um alle Karten eines Schritts auf einmal auszuwählen, aktivieren Sie das Kontrollkästchen **Alle auswählen** in der Kopfzeile der Schrittspalte; ein erneutes Anklicken hebt die Auswahl wieder auf. Es erscheint eine Werkzeugleiste, mit der Sie für alle ausgewählten Karten gleichzeitig **Abschließen**, **Zurückstellen**, **Zuweisen** (neu zuweisen) oder **Verschieben nach…** einen anderen Schritt wählen können.

## Karten mit Ergebnissen und Bedingungen weiterleiten {#routing-cards-with-outcomes-and-conditions}

Die Weiterleitung legt fest, wohin eine Karte wandert, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten der Weiterleitung zu konfigurieren.

### Ergebnis-Schaltflächen {#outcome-buttons}

Ergebnisse sind Schaltflächen in der Kartenschublade, die erscheinen, wenn Sie eine Karte in diesem Schritt abschließen. Statt einer einzigen Schaltfläche **Abschließen** können Sie Auswahlmöglichkeiten anbieten wie „Einer Gruppe beigetreten“ oder „Kein Interesse“. Jedes Ergebnis kann:

- Die Karte an **einen anderen Schritt** in diesem Workflow senden,
- Die Karte an einen völlig anderen Workflow **übergeben** oder
- Die Karte **schließen**.

So kann eine Entscheidung die Person auf unterschiedliche Wege lenken.

### Automatische Weiterleitung (bedingt) {#automatic-routing-conditional}

Automatische Weiterleitungen bewegen eine Karte weiter, **sobald sie einen Schritt betritt** (und nachdem dessen automatische Aktionen abgeschlossen sind), ohne dass jemand klicken muss, sofern die Person die festgelegten Bedingungen erfüllt. Fügen Sie eine Weiterleitung hinzu, wählen Sie den Zielschritt und definieren Sie eine oder mehrere **Bedingungen** (zum Beispiel Standort, Alter oder Mitgliedsstatus einer Person). Textfelder können genau oder mit **enthält**, **beginnt mit** oder **endet mit** verglichen werden. Eine Weiterleitung ohne Bedingungen gilt für alle.

Datumsbedingungen (Heutiges Datum, Geburtsdatum oder Jubiläum) können das vollständige Datum oder nur einen Teil davon vergleichen – den Wochentag, den **Tag des Monats**, den **Monat** oder die vergangenen Jahre. Bei Geburtsdatum oder Jubiläum einer Person bietet **Tag des Monats** die relative Option **Heute**, sodass eine Bedingung wie *Geburtsdatum · Tag des Monats = Heute* Personen trifft, deren Geburtstag auf den heutigen Tag des Monats fällt. **Monat** bietet **Vormonat**, **Aktueller Monat** und **Nächster Monat**. Relative Werte wie diese werden anhand der Zeitzone Ihrer Gemeinde berechnet, sodass sie zum Kalendertag Ihrer Gemeinde passen und nicht zu dem des Servers.

Die Gruppe der Bedingungen **Spenden** enthält **Früher regelmäßiger Spender**, das Personen findet, die früher regelmäßig gegeben haben und dann aufgehört haben. Legen Sie drei Zahlen fest: *Gespendet in mindestens* **3** *der letzten* **12** *Wochen, danach nichts in den letzten* **3** *Wochen* (das sind die Standardwerte). Die Wochen werden ab heute anhand der Zeitzone Ihrer Gemeinde zurückgerechnet, und eine erstattete Spende zählt nicht. Am nützlichsten ist die Bedingung in einem [Zeitplan-Auslöser](#schedule-triggers) – zum Beispiel eine wöchentliche Regel, die früher regelmäßige Spender einer seelsorgerlichen Nachbetreuungs-Tafel hinzufügt. Die Bedingung betrachtet nur Spendendaten, niemals Beträge, und Karten und Benachrichtigungen zeigen nie Beträge. Da sie offenlegt, wer aufgehört hat zu geben, sehen diese Option nur Personen, die Spenden einsehen können, und nur sie können sie hinzufügen, ändern oder entfernen.

Lässt sich die Bedingung einer Weiterleitung aus irgendeinem Grund nicht prüfen, gilt die Weiterleitung als nicht zutreffend. Die Karte bleibt im Schritt (oder folgt einer anderen Weiterleitung, die zutrifft), statt stecken zu bleiben.

:::info
Auf der Tafel zeigt jede Schrittspalte kleine Hinweise zu ihrer Weiterleitung – etwa eine Ergebnisbezeichnung oder „falls zutreffend“, gefolgt von einem Pfeil zum Zielschritt oder Zielworkflow.
:::

## Vollautomatische Schritte {#fully-automated-steps}

Sie können einen Schritt vollständig von selbst laufen lassen, ohne dass jemand daran arbeitet. Geben Sie dem Schritt seine **automatischen Aktionen** und fügen Sie eine **automatische Weiterleitung** (ohne Bedingungen) zum nächsten Schritt hinzu. Sobald eine Karte eintrifft, laufen die Aktionen, und dann schiebt die Weiterleitung sie sofort weiter – die Karte durchläuft den Schritt ohne Halt.

:::tip
Kombinieren Sie dies mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf“ weiterleiten.* E-Mail und Timing werden für Sie erledigt, und eine ehrenamtlich tätige Person sieht die Karte erst, wenn der persönliche Kontakt an der Reihe ist.
:::

## Auslöser {#triggers}

Auslöser fügen Personen einem Workflow automatisch hinzu, wenn etwas geschieht, sodass Sie nie Karten von Hand hinzufügen müssen. Klicken Sie auf einer Workflow-Tafel auf den Reiter **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Ereignisauslöser {#event-triggers}

Sie greifen, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur passende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** -- z. B. jeden hinzufügen, dessen Status zu *Besucher* oder *Gast* wird (der Status für Personen, die sich selbst registriert haben).
- **Spende · Erstellt** -- z. B. eine Erstspende oder eine große Spende in einen Dankeschön-Workflow aufnehmen (nach Betrag, Fonds oder Zahlungsart filtern).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** -- jede Person hinzufügen, die ein gewähltes Formular absendet (ideal für eine Karte „Ich bin neu“ oder „Kontakt“).

### Zeitplan-Auslöser {#schedule-triggers}

Sie laufen regelmäßig – täglich, wöchentlich, monatlich oder jährlich – und prüfen dabei eine Reihe von Bedingungen. Verwenden Sie sie für zeitabhängige Kontaktaufnahmen, etwa *alle, deren Geburtstag heute ist* (Geburtsdatum · Tag des Monats = **Heute**, mit dem Monat **Aktueller Monat**), oder einen *monatlichen* Check-in. Auch ohne **Nur einmal pro Person** fügt ein Zeitplan-Auslöser dieselbe Person innerhalb einer Wiederholungsperiode nicht erneut hinzu (ein Tag, eine Woche, ein Monat oder ein Jahr – je nachdem, wie oft er läuft).

Für jeden Auslöser können Sie außerdem festlegen:

- Den **Startschritt**, auf dem die neue Karte landet (Standard ist der erste Schritt).
- **Nur einmal pro Person** -- damit dieselbe Person durch den Auslöser nicht zweimal in den Workflow kommt. Ist dies aktiviert, werden alle übersprungen, die bereits eine Karte in diesem Workflow haben.
  - **Nach Abschluss der Karte erneut hinzufügen** -- erscheint, wenn **Nur einmal pro Person** aktiviert ist. Aktivieren Sie es, damit der Auslöser eine Person erneut hinzufügen kann, sobald ihre frühere Karte in diesem Workflow geschlossen ist. Eine Person hat trotzdem nie zwei gleichzeitig offene Karten im Workflow. Nutzen Sie dies für Dinge, die mehr als einmal vorkommen können, etwa einen wiederkehrenden Gast oder einen jährlichen Prozess.
- **Aktiv** -- schaltet den Auslöser ein oder aus, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen Auslöser **Formular · Eingereicht** mit der Vorlage **Nachbetreuung neuer Gäste**, um Ihre Karte „Kontakt“ oder „Ich bin neu“ in eine automatische Nachbetreuungs-Pipeline zu verwandeln.
:::

## Bestätigungen von Dienstzuweisungen {#serving-assignment-confirmations}

Eine besondere Art von Workflow kann [Dienstanfragen](./plans.md#assigning-team-members) nachverfolgen, bis jede ehrenamtlich tätige Person zusagt oder absagt. Statt Personen trackt jede Karte auf dieser Tafel **eine Zuweisung** – eine Person auf einer Position in einem Plan. Zwei Rollen oder zwei Gottesdienste für dieselbe Person erhalten getrennte Karten. Dies ist eine Option, die Sie aktivieren: Für einen Plan ändert sich nichts, bis Sie in dessen Einstellungen einen Bestätigungs-Workflow auswählen.

### Einrichten {#setting-one-up}

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen** und wählen Sie die Vorlage **Bestätigung einer Dienstzuweisung**. (Oder starten Sie mit einem **Leeren Workflow** und setzen Sie dessen **Zweck des Workflows** auf **Bestätigung einer Dienstzuweisung**.) Das Erstellen aus der Vorlage erfordert die Berechtigung, SMS zu senden, da sie einen SMS-Schritt enthält.
2. Prüfen Sie die Schritte. Die Vorlage beginnt mit:
   - **Anfrage senden und auf Antwort warten** -- sendet die Dienstanfrage per E-Mail und SMS, wartet 2 Tage, sendet eine Erinnerungs-E-Mail, wartet einen weiteren Tag und schiebt die Karte dann automatisch weiter.
   - **Freiwillige zur unbeantworteten Anfrage anrufen** -- ein Schritt, in dem eine Person die ehrenamtlich tätige Person anruft, fällig in 1 Tag. Legen Sie in diesem Schritt eine **Standardzuständige Person** fest. Hat er keine, geht die Karte an die Leitung des Dienstbereichs oder, falls es keine gibt, an das Dienstteam.
3. Passen Sie die Wartezeiten, Nachrichten und Schritte an Ihre Gemeinde an.
4. Öffnen Sie die [Einstellungen eines Plans](./plans.md#plan-settings) und wählen Sie diesen Workflow unter **Bestätigungs-Workflow**.

Diese Workflows verwenden die Aktion **Dienstanfrage senden** statt **E-Mail senden** und **SMS senden**. Wählen Sie **E-Mail** oder **Textnachricht** und schreiben Sie optional eine **Anfragenachricht**. Die Anfrage enthält immer die Rolle, den Plan, das Gottesdienstdatum und einen Link zur Antwort; in Ihrer Nachricht können Sie `{{planName}}`, `{{positionName}}` und `{{serviceDate}}` verwenden. Lassen Sie die Nachricht leer, um die Standardanfrage zu verwenden. Die Benachrichtigungseinstellungen der Freiwilligen, deren Zustimmung zu SMS, Ihr SMS-Anbieter und die E-Mail-Freigabe Ihrer Gemeinde gelten alle, und jeder übersprungene oder blockierte Versuch wird auf der Karte festgehalten. **E-Mail senden**, **SMS senden** und **Zu Workflow hinzufügen** sind auf diesen Tafeln nicht verfügbar.

Der Reiter **Auslöser** eines Bestätigungs-Workflows erklärt, wie Karten gestartet werden, statt Auslöser anzubieten; außerdem erscheinen diese Workflows nicht in den Listen **Zu Workflow hinzufügen** für Personen.

### Wie Karten gestartet und geschlossen werden {#how-cards-are-started-and-closed}

- Karten entstehen, wenn Sie Freiwillige in einem veröffentlichten Plan **benachrichtigen** (siehe [Freiwillige benachrichtigen](./plan-validation.md#notifying-volunteers)). Jede neue, unbeantwortete Zuweisung erhält genau eine Karte. Speichern, Veröffentlichen, Kopieren oder automatisches Besetzen eines Plans kontaktiert von selbst niemanden, und vorläufig eingeplante Pläne versenden nichts.
- Freiwillige erhalten weiterhin die übliche Benachrichtigung in der App. Die E-Mail- und SMS-Nachverfolgung kommt vom Workflow.
- Wenn die ehrenamtlich tätige Person **zusagt oder absagt**, wird ihre Karte automatisch geschlossen, zusammen mit allen damit verknüpften Nachfassaufgaben.
- Die Kartenschublade zeigt die Position, das Gottesdienstdatum und einen Link zum Plan. Statt **Abschließen** lautet die Schaltfläche **Nachverfolgung erledigt erfassen**. Ein Klick darauf hält fest, dass jemand nachgefasst hat; die Karte bleibt aber offen und zugewiesen (angezeigt als **Warten auf Antwort**), bis die ehrenamtlich tätige Person antwortet oder die Antwortfrist verstreicht.
- Die Antwortfrist ist das Ende der letzten Gottesdienstzeit, in der das Team der Position dient. Hat der Plan keine passenden Zeiten, gilt das Ende des Gottesdiensttages. Hat bis dahin niemand geantwortet, wird die Karte mit **Antwortfrist abgelaufen** geschlossen, und eine Aufgabe **Unbeantwortete Dienstanfrage prüfen** geht an die aktuelle zuständige Person der Karte oder an die Leitung des Dienstbereichs, damit jemand entscheiden kann, wie der Platz besetzt wird. Die Zuweisung bleibt **Unbestätigt**.
- Das Entfernen der Zuweisung, das Ändern der Person, der Position oder des Plandatums, das Zurücksetzen des Plans auf vorläufig eingeplant oder das Umstellen des Plans auf einen anderen Bestätigungs-Workflow schließt die Karte. Eine geschlossene Karte wird durch ein weiteres **Benachrichtigen** nie wieder geöffnet; für eine neue Anfrage fügen Sie eine neue Zuweisung hinzu.

:::info
Für Anfragen über einen Bestätigungs-Workflow gehen [Erinnerungen für Freiwillige](./plans.md#volunteer-reminders) nur an Freiwillige, die **zugesagt** haben. Personen, die noch auf eine Antwort warten, erhalten so keine Erinnerungen zusätzlich zu den Nachfassaktionen des Workflows.
:::

## Meine Karten {#my-cards}

Freiwillige und Mitarbeitende müssen nicht jede Tafel durchsuchen, um ihre Aufgaben zu finden. Die Liste **Meine Karten** auf der Seite **Meine Arbeit** zeigt jede Karte, die dem aktuellen Benutzer zugewiesen ist, über alle Workflows hinweg. Um dorthin zu gelangen, klicken Sie oben auf der Seite Workflows auf **Meine Karten** oder öffnen Sie im Sprungmenü **Dienste > Meine Arbeit**. Ein Klick auf eine Karte öffnet ihre Detailansicht direkt auf der Seite Meine Arbeit, wo Sie die Karte bearbeiten oder entfernen können, ohne die Seite zu verlassen. Wenn Sie Workflows anzeigen dürfen, enthält die Ansicht außerdem einen Link **Workflow-Tafel öffnen** zur Tafel, zu der die Karte gehört.

## Auswertungen {#reports}

Öffnen Sie einen Workflow und klicken Sie auf **Auswertungen**, um Analysen für diesen Workflow zu sehen:

- **Überfällig** -- die Anzahl der Karten nach ihrem Fälligkeitsdatum.
- **Karten pro Schritt** -- wie viele Karten derzeit auf jedem Schritt liegen, als Säulendiagramm dargestellt.
- **Abgeschlossen (30 Tage)** -- der Durchsatz der letzten 30 Tage, als Liniendiagramm dargestellt.

Nutzen Sie diese Werte, um Engpässe zu erkennen – etwa einen Schritt, in dem sich Karten stauen und nie weiterkommen.

## Verwandte Artikel {#related-articles}

- [Aufgaben](./tasks.md) -- die einzelnen Handlungspunkte, auf denen die Workflow-Karten aufbauen
- [Formulare](../forms/index.md) -- Formulare erstellen, die Workflows auslösen können
- [Gruppen](../groups/index.md) -- die Gruppen, in die eine Aktion „Zur Gruppe hinzufügen“ Personen einordnen kann
- [Dienstpläne](./plans.md) -- einen Bestätigungs-Workflow für die Dienstanfragen eines Plans wählen
- [Rollen und Berechtigungen](../settings/roles-permissions.md) -- festlegen, wer Workflows anzeigen, bearbeiten und verwalten darf
