---
title: "Workflows"
description: "Kanban-Boards in B1 Admin erstellen, um Personen mit automatischen E-Mails, SMS und Auslösern durch Nachfolgeschritte zu führen."
---

# Workflows

<div class="article-intro">

Workflows führen Personen auf einem visuellen Board durch eine Reihe von Schritten. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert – von der Nachbetreuung eines Gastes beim ersten Besuch über einen Mitgliedschaftsprozess bis zur Dankesnachricht an einen Erstgeber und allem anderen, bei dem Sie viele Personen durch dieselben Stationen verfolgen müssen. Ein Schritt kann eine ehrenamtliche Person bitten, etwas zu tun (anrufen, ein Gespräch führen) **und** eigenständig automatische Aktionen ausführen – eine E-Mail oder Textnachricht senden, ein paar Tage warten, die Person einer Gruppe hinzufügen. So übernehmen Workflows sowohl die persönliche Nachbetreuung als auch die Routinearbeit drumherum. Workflows erweitern [Aufgaben](./tasks.md) zu einem Drag-and-Drop-Kanban-Board, damit niemand und nichts durch das Raster fällt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie nachverfolgen möchten, in B1 Admin existieren
- Machen Sie sich mit der Funktionsweise von [Aufgaben](./tasks.md) vertraut, denn jede Karte auf einem Board ist eine Aufgabe
- Um die Aktion **E-Mail senden** zu nutzen, erstellen Sie zuerst die E-Mail-Vorlagen, die Sie versenden möchten (verwaltet unter **Einstellungen → E-Mail-Vorlagen**)
- Um die Aktion **Textnachricht senden** zu nutzen, verbinden Sie zuerst einen [Anbieter für Textnachrichten](../settings/church-settings.md#texting)
- Sie benötigen die passende Berechtigung für Aufgaben. Anzeigen, Bearbeiten von Karten und Verwalten von Workflows sind getrennte Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Workflows ansehen

Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin), klappen Sie **Dienst** auf und klicken Sie auf **Workflows**. Ihre Workflows sind in einer Tabelle aufgeführt, die jeweils **Kategorie** und **Status** (**Aktiv** oder **Inaktiv**) zeigt. Verwenden Sie Sie die Reiter oberhalb der Liste, um nach Kategorie zu filtern, sofern Sie Kategorien verwenden. Klicken Sie auf einen Workflow, um sein Board zu öffnen.

## Einen Workflow anlegen

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen**.
2. Wählen Sie, wie Sie starten möchten:
   - **Leerer Workflow** – von Grund auf neu beginnen und eigene Schritte aufbauen.
   - **Aus einer Vorlage** – mit einem fertigen Satz Schritte beginnen, den Sie bearbeiten können. Eingebaute Vorlagen sind:
     - **Nachbetreuung neuer Besucher** – Willkommens-E-Mail senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftskurs** – Interesse äußern → Zum Kurs anmelden → Kurs besuchen → Mitgliedschaft abschließen
     - **Dank an Erstgeber** – Dankesnotiz senden → Wirkung der Gabe teilen → Haushalterschaft
     - **Bestätigung einer Dienstaufgabe** – Anfrage senden und auf Antwort warten → Ehrenamtliche zu unbeantworteter Anfrage anrufen (siehe [Bestätigungen von Dienstaufgaben](#serving-assignment-confirmations))

   Das Anlegen der Schritte einer Vorlage kann einen Moment dauern. Während es läuft, lautet die Schaltfläche **Workflow hinzufügen** **Wird erstellt …** und lässt sich nicht erneut anklicken, sodass kein Doppel entsteht. Schlägt etwas fehl, zeigt die Seite *„Der Workflow konnte nicht erstellt werden. Bitte versuchen Sie es erneut.“*
3. Geben Sie dem Workflow einen **Namen**.
4. Weisen Sie optional eine **Kategorie** zu, um zusammengehörige Workflows zu gruppieren. Sie können direkt aus dem Dropdown-Menü eine neue Kategorie anlegen.
   Bei einem leeren Workflow wählen Sie außerdem seinen **Zweck**: **Nachbetreuung von Personen** (der übliche Fall) oder **Bestätigung einer Dienstaufgabe**. Der Zweck lässt sich nach dem Anlegen des Workflows nicht mehr ändern.
5. Lassen Sie den Workflow **Aktiv**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inaktiv**, um ihn aus den Listen „Zum Workflow hinzufügen“ auszublenden.
6. Klicken Sie auf **Speichern**.

:::tip
Verwenden Sie die Schaltfläche **Duplizieren** in der Liste der Workflows, um einen bestehenden Workflow – einschließlich seiner Schritte, automatischen Aktionen und Weiterleitungen – als Ausgangspunkt für einen neuen zu kopieren.
:::

## Das Board mit Schritten aufbauen

Jedes Workflow-Board besteht aus **Schritten**, die von links nach rechts als Spalten dargestellt werden. Öffnen Sie einen Workflow und verwenden Sie **Schritt hinzufügen**, um jede Station Ihres Prozesses anzulegen.

Wenn Sie einen Schritt hinzufügen oder bearbeiten, können Sie Folgendes konfigurieren:

- **Schrittname** – die Spaltenüberschrift (zum Beispiel „Willkommensanruf“ oder „Warten auf Anmeldung“).
- **Fällig in (Tagen)** – legt automatisch ein Fälligkeitsdatum fest, sobald eine Karte in diesen Schritt gelangt. Karten nach ihrem Fälligkeitsdatum werden als **Überfällig** markiert.
- **Standardzuständige Person** – die Person oder Gruppe, der neue Karten in diesem Schritt automatisch zugewiesen werden. Ist die Standardzuständigkeit eine Person, erhält sie eine Benachrichtigung, dass ihr eine Karte zugewiesen wurde.
- **Automatische Aktionen** – Dinge, die das System selbst erledigt, sobald eine Karte ankommt (siehe unten).
- **Weiterleitung** – wohin die Karte wandert, wenn sie den Schritt verlässt (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie die Schrittspalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge legt außerdem den Standardweg fest, den eine Karte nimmt, wenn keine andere Weiterleitung greift.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen gehören zum Schritt, daher werden diese Bereiche im Editor erst freigeschaltet, wenn der Schritt existiert.
:::

## Automatische Aktionen

Jeder Schritt kann eine Liste **automatischer Aktionen** enthalten, die von selbst in dem Moment ausgeführt werden, in dem eine Karte den Schritt **betritt** – noch bevor jemand sie anfasst. So übernimmt ein Schritt sowohl die Aufforderung an eine ehrenamtliche Person als auch die Routinearbeit rund um die Nachbetreuung.

Öffnen Sie im Schritt-Editor **Automatische Aktionen**, klicken Sie auf **Aktion hinzufügen**, wählen Sie einen Typ und füllen Sie seine Einstellungen aus. Fügen Sie so viele hinzu, wie Sie brauchen; sie laufen **von oben nach unten in der Reihenfolge**. Klicken Sie auf **Speichern** des Schritts, um den Schritt und alle seine Aktionen gemeinsam zu speichern. Eine Aktion mit ihrem Papierkorbsymbol zu entfernen, wirkt sofort.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine von Ihnen gewählte E-Mail-Vorlage. Sie können die Betreffzeile überschreiben. |
| **Textnachricht senden** | Sendet der Person eine Nachricht, die Sie schreiben, über den [Anbieter für Textnachrichten](../settings/church-settings.md#texting) Ihrer Kirche. |
| **Warten** | Hält die Karte für eine bestimmte Anzahl Tage an, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person einer [Gruppe](../groups/index.md) Ihrer Wahl hinzu. |
| **Aus Gruppe entfernen** | Entfernt die Person aus einer Gruppe Ihrer Wahl. |
| **Anwesenheit erfassen** | Markiert die Person als anwesend beim laufenden Gottesdienst einer Gruppe (siehe unten). |
| **Zum Workflow hinzufügen** | Startet die Person in einem anderen Workflow – nützlich, um zwischen Prozessen zu übergeben. |
| **Notiz hinzufügen** | Schreibt eine Notiz in den Verlauf der Karte. |
| **Feld setzen** | Aktualisiert ein Feld im Datensatz der Person: Mitgliedsstatus, Familienstand, Geschlecht, Ort, Bundesland oder PLZ. |
| **Webhook** | Sendet die Angaben der Karte an eine externe Webadresse (URL), die Sie angeben, um Verbindungen zu anderen Systemen herzustellen. |
| **Aufgabe erstellen** | Erstellt eine [Aufgabe](./tasks.md) mit dem Titel und der Beschreibung, die Sie eingeben, zugewiesen an die Person Ihrer Wahl. |
| **Person benachrichtigen** | Sendet einer Mitarbeiterin, einem Mitarbeiter oder einer ehrenamtlichen Person Ihrer Wahl eine E-Mail und eine B1-Benachrichtigung zur Karte (siehe unten). |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **bleibt die Karte an diesem Schritt**, damit eine Person sie bearbeiten kann – außer der Schritt hat eine automatische Weiterleitung, die sie sofort weiterschiebt (siehe [Vollautomatische Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte über den normalen Ablauf ankommt – wenn sie zum ersten Mal hinzugefügt wird, wenn ein Ergebnis oder eine automatische Weiterleitung sie hereinbringt oder nachdem eine Wartezeit abgelaufen ist. Sie laufen **nicht** erneut, wenn eine Mitarbeiterin oder ein Mitarbeiter eine Karte von Hand auf den Schritt zieht oder zurückschickt; so erhält eine Person nicht dieselbe E-Mail zweimal.
:::

### E-Mail senden

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional eine eigene Betreffzeile ein. Sobald eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Hat die Person keine E-Mail-Adresse hinterlegt, überspringt der Schritt diese Aktion einfach.) [Platzhalter](../settings/email-templates.md#merge-fields) in der Vorlage, etwa `{{firstName}}`, werden mit den eigenen Angaben der Person ausgefüllt.

Wird die E-Mail versendet, vermerkt der Verlauf der Karte **E-Mail gesendet**. Kann sie nicht versendet werden – etwa weil die E-Mail Ihrer Kirche noch nicht freigegeben ist oder das Tageslimit erreicht wurde –, wird kein Eintrag „E-Mail gesendet“ hinzugefügt.

:::info
E-Mails aus Workflows werden erst versendet, nachdem Ihre Kirche zum Versenden von Gruppen-E-Mails freigegeben wurde, und sie zählen auf das tägliche E-Mail-Limit Ihrer Kirche. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Die Aktion **E-Mail senden** warnt Sie im Schritt-Editor, wenn diese E-Mails nicht versendet werden: *„Die E-Mail Ihrer Kirche wurde noch nicht freigegeben …“*, falls die Freigabe noch aussteht, oder *„Der E-Mail-Versand Ihrer Kirche ist pausiert …“*, falls kürzlich Nachrichten zurückgewiesen oder als Spam gemeldet wurden.
:::

### Anwesenheit erfassen

Wählen Sie **Anwesenheit erfassen** und klicken Sie auf **Gruppe auswählen**, um die Gruppe zu bestimmen, deren Anwesenheit erfasst werden soll. Beim Ausführen der Aktion wird die Person als anwesend bei der laufenden Gottesdienstzeit dieser Gruppe markiert – genauso, als hätte sie sich eingecheckt. Das ist nützlich zusammen mit einem Auslöser, der Personen beim Eintreffen in den Workflow aufnimmt, sodass sie ohne separaten Check-in gezählt werden.

- Die Anwesenheit wird zum Zeitpunkt gemessen, zu dem die Karte **angelegt** wurde. Eine frühere **Wartezeit** im Workflow schiebt sie also nicht über den Gottesdienst hinaus.
- Nur Gottesdienstzeiten mit einem Tag und einer Startzeit zählen. Ist zu diesem Zeitpunkt keine Gottesdienstzeit der Gruppe im Gange, wird nichts erfasst, und der Verlauf der Karte vermerkt **Kein planmäßiger Gottesdienst im Gange – Anwesenheit nicht erfasst**.
- Wird die Anwesenheit erfasst, zeigt der Verlauf der Karte **Anwesenheit erfasst** gefolgt vom Namen der Gruppe. Führen Sie die Aktion für denselben Gottesdienst erneut aus, wird die Person nicht doppelt gezählt.

### Eine Person benachrichtigen

Wählen Sie **Person benachrichtigen**, klicken Sie auf **Person auswählen** und geben Sie optional eine **Nachricht** ein. Sobald eine Karte den Schritt betritt, erhält diese Person eine E-Mail und eine B1-Benachrichtigung mit dem Namen der Person auf der Karte, den Namen des Workflows und des Schritts, Ihrer Nachricht und einem Link zum Öffnen der Karte. Nutzen Sie dies, um einer Mitarbeiterin, einem Mitarbeiter oder einer Gemeindeleitung eine Vorwarnung zu geben – etwa *„Informiere den Pastor, wenn jemand den Schritt Mitgliedschaftsgespräch erreicht.“* Der Verlauf der Karte vermerkt **Benachrichtigt** gefolgt vom Namen der Person.

### Eine Textnachricht senden {#sending-a-text}

Wählen Sie **Textnachricht senden** und geben Sie die **Textnachricht** ein (bis zu 1.600 Zeichen). Sobald eine Karte den Schritt betritt, erhält die Person diese Textnachricht auf ihrem Mobiltelefon. Um die Nachricht zu personalisieren, klicken Sie unterhalb des Nachrichtenfeldes auf einen Chip – **Vorname**, **Nachname**, **Anzeigename** oder **Kirchenname** –, um `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` an der Cursorposition einzufügen. Jeder wird beim Versand mit den Angaben der Person ausgefüllt.

- Ist für die Person keine Mobilnummer hinterlegt, wird keine Nachricht gesendet, und der Verlauf der Karte vermerkt **Textnachricht übersprungen: keine Mobilnummer**.
- Hat sich die Person abgemeldet, wird keine Nachricht gesendet, und der Verlauf der Karte vermerkt **Textnachricht übersprungen: abgemeldet**.
- Geht die Textnachricht hinaus, vermerkt der Verlauf der Karte **Textnachricht gesendet**. Schlägt der Versand fehl – etwa weil kein Anbieter für Textnachrichten verbunden ist oder Ihrer Kirche das Guthaben für Textnachrichten ausgegangen ist –, wird der Fehler im Verlauf der Karte protokolliert, und die übrigen Aktionen des Schritts laufen trotzdem weiter.

:::warning
Textnachrichten werden über den eigenen [Anbieter für Textnachrichten](../settings/church-settings.md#texting) Ihrer Kirche versendet. Ist kein Anbieter verbunden, warnt der Aktions-Editor *„Es ist kein Anbieter für Textnachrichten eingerichtet“*, und Textnachrichten werden nicht versendet.
:::

### Ein paar Tage warten (Drip-Sequenzen)

Die Aktion **Warten** hält eine Karte für die Anzahl der Tage, die Sie festlegen. Während sie wartet, wird die Karte als **Zurückgestellt** angezeigt. B1 prüft abgelaufene Wartezeiten alle 30 Minuten, sodass eine Karte innerhalb von etwa einer halben Stunde nach Ende der Wartezeit weiterläuft. Ist die Wartezeit vorbei:

1. Laufen alle **übrigen Aktionen desselben Schritts** – sodass Sie eine Drip-Sequenz wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden** aufbauen können.
2. Dann wandert die Karte weiter, sofern der Schritt eine automatische Weiterleitung hat; andernfalls bleibt sie am Schritt, damit eine Person sie übernehmen kann.

:::tip
Eine **Wartezeit** am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zurückzuhalten, bevor sie einer ehrenamtlichen Person angezeigt wird – etwa *7 Tage warten, dann meldet sich eine Begleitperson*.
:::

## Personen als Karten hinzufügen

Es gibt mehrere Wege, Personen auf ein Board zu bringen:

- **Vom Board aus** – Klicken Sie unten in einer Schrittspalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe wählen; dann wird jedes Mitglied dieser Gruppe als Karte hinzugefügt.
- **Aus dem Datensatz einer Person** – Verwenden Sie auf der Seite einer Person **Zum Workflow hinzufügen**, um sie in einen Workflow einzuordnen.
- **Aus der Personensuche** – Wählen Sie mehrere Personen aus und verwenden Sie die Sammelaktion **Zum Workflow hinzufügen**, um alle auf einmal hinzuzufügen.
- **Automatisch mit einem Auslöser** – Personen werden hinzugefügt, wenn etwas geschieht, etwa eine Formulareinsendung oder eine erste Gabe (siehe [Auslöser](#triggers) unten).

Wird jemand von Hand oder mit der Aktion **Zum Workflow hinzufügen** eines Schritts hinzugefügt, erhält die Person nie eine zweite offene Karte im selben Workflow. Hat sie bereits eine offene Karte, wird sie übersprungen (bei einer Sammelaufnahme erhalten nur Personen ohne Karte eine neue). Sobald ihre Karte geschlossen ist, können Sie sie erneut hinzufügen. Auslöser folgen stattdessen ihrer eigenen Einstellung **Nur einmal pro Person**.

## Mit dem Board arbeiten {#working-the-board}

Öffnen Sie einen Workflow, um sein Board zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, und einen Chip für Fälligkeit oder Status (**Überfällig** oder **Zurückgestellt**). Eine Schrittspalte zeigt außerdem kleine Abzeichen für die automatischen Aktionen, die sie ausführt, und Anmerkungen zu ihrer Weiterleitung – so haben Sie auf einen Blick eine Übersicht darüber, wie die Karten fließen.

- **Eine Karte verschieben** – Ziehen Sie eine Karte von einer Spalte zur nächsten, sobald die Person vorankommt.
- **Eine Karte öffnen** – Doppelklicken Sie auf eine Karte (oder klicken Sie sie an), um ihr Detailfenster zu öffnen. Dort können Sie den Schritt ändern, sie neu zuweisen, Notizen hinzufügen und sehen, was bereits geschehen ist.

Aus dem Kartenfenster können Sie:

- Die Karte einer anderen Person oder Gruppe **zuweisen**.
- Die Karte für 1 Tag, 3 Tage oder 1 Woche **zurückstellen**, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- **Zurück schicken** zum vorherigen Schritt oder **Überspringen** zum nächsten Schritt.
- **Zuweisung fixieren** – die gleiche verantwortliche Person auf der Karte belassen, auch wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte beim Wechsel in einen neuen Schritt der Standardzuständigkeit dieses Schritts zugewiesen; durch Fixieren bleibt die aktuelle Person durchgehend verantwortlich.
- Die Karte **abschließen**, um sie zu beenden, oder einen **Ergebnis**-Button wählen, sofern der Schritt Ergebnisse konfiguriert hat (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).
- **Karte entfernen** – nimmt eine Karte vom Board, ohne sie abzuschließen, etwa wenn jemand versehentlich hinzugefügt wurde. Nach der Bestätigung wird die Karte geschlossen und von allen Listen entfernt. Keine Ergebnisse, Weiterleitungen oder Schrittaktionen laufen, und der Verlauf bleibt mit dem Eintrag **Entfernt** erhalten. Bei einer Karte für die [Bestätigung einer Dienstaufgabe](#serving-assignment-confirmations) schließt das Entfernen die Anfrage auf dieselbe Weise.
- **Notizen hinzufügen** und die **Aktivität** der Karte ansehen – ein Protokoll der automatischen Aktionen, die gelaufen sind (gesendete E-Mails, Wartezeiten usw.), jeweils mit Datum und Uhrzeit.

Für eine Karte zu einer Person zeigt das Fenster außerdem die Mobilnummer und E-Mail-Adresse dieser Person als Links, die Sie antippen können, um anzurufen oder zu schreiben, sowie einen Link **Profil ansehen**, sofern Sie die Berechtigung haben, Personen anzusehen. Die Person, der die Karte zugewiesen ist, sieht Telefon und E-Mail auch ohne Zugriff auf Personen.

Notizen werden mit der Karte gespeichert. Alle, die die Karte öffnen können – einschließlich der Person oder Gruppe, der sie zugewiesen ist –, können die Notizen lesen und eigene hinzufügen. Wer die Karte nicht öffnen kann, sieht ihre Notizen nicht.

### Sammelaktionen

Wählen Sie die Kontrollkästchen mehrerer Karten aus, um sie gemeinsam zu bearbeiten. Um jede Karte eines Schritts auf einmal auszuwählen, aktivieren Sie das Kästchen **Alle auswählen** in der Kopfzeile der Spalte; aktivieren Sie es erneut, um die Auswahl aufzuheben. Eine Werkzeugleiste erscheint, mit der Sie für alle ausgewählten Karten gleichzeitig **Abschließen**, **Zurückstellen**, **Zuweisen** (neu zuweisen) oder **Verschieben nach…** einen anderen Schritt wählen können.

## Karten mit Ergebnissen und Bedingungen weiterleiten {#routing-cards-with-outcomes-and-conditions}

Die Weiterleitung legt fest, wohin eine Karte wandert, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten der Weiterleitung zu konfigurieren.

### Ergebnis-Buttons

Ergebnisse sind Buttons im Kartenfenster, die erscheinen, wenn Sie eine Karte an diesem Schritt abschließen. Statt eines einzigen Buttons **Abschließen** können Sie Auswahlmöglichkeiten anbieten, etwa „Einer Gruppe beigetreten“ oder „Kein Interesse“. Jedes Ergebnis kann:

- Die Karte zu **einem anderen Schritt** in diesem Workflow senden,
- Die Karte an einen ganz anderen Workflow **übergeben**, oder
- Die Karte **schließen**.

So kann eine Entscheidung die Person auf unterschiedliche Wege führen.

### Automatische Weiterleitung (bedingt)

Automatische Weiterleitungen verschieben eine Karte weiter, **sobald sie einen Schritt betritt** (und nachdem dessen automatische Aktionen abgeschlossen sind), ohne dass jemand klickt – sofern die Person einen festgelegten Satz von Bedingungen erfüllt. Fügen Sie eine Weiterleitung hinzu, wählen Sie den Zielschritt und definieren Sie eine oder mehrere **Bedingungen** (zum Beispiel Standort, Alter oder Mitgliedsstatus einer Person). Textfelder lassen sich genau oder mit **enthält**, **beginnt mit** oder **endet mit** abgleichen. Eine Weiterleitung ohne Bedingungen trifft auf alle zu.

Datumsbedingungen (Heutiges Datum, Geburtsdatum oder Hochzeitstag) können das vollständige Datum oder nur einen Teil vergleichen – den Wochentag, den **Tag des Monats**, den **Monat** oder die verstrichenen Jahre. Beim Geburtsdatum oder Hochzeitstag bietet **Tag des Monats** eine relative Option **Heute** an, sodass eine Bedingung wie *Geburtsdatum · Tag des Monats = Heute* Personen trifft, deren Geburtstag auf den heutigen Tag im Monat fällt. **Monat** bietet **Vorheriger Monat**, **Aktueller Monat** und **Nächster Monat**. Solche relativen Werte werden anhand der Zeitzone Ihrer Kirche berechnet, sodass sie zum Kalendertag Ihrer Kirche passen und nicht zum Server.

Die Gruppe **Spenden** enthält **Ehemals regelmäßige Gebende**, die Personen findet, die früher regelmäßig gegeben haben und dann aufgehört haben. Legen Sie drei Zahlen fest: *Gegeben in mindestens* **3** *der letzten* **12** *Wochen, dann nichts in den letzten* **3** *Wochen* (das sind die Voreinstellungen). Die Wochen werden ab heute in der Zeitzone Ihrer Kirche gezählt, und eine erstattete Gabe zählt nicht. Am nützlichsten ist es bei einem [Zeitplan-Auslöser](#schedule-triggers) – etwa einer wöchentlichen Regel, die ehemals regelmäßige Gebende in ein Board für die seelsorgerliche Nachbetreuung aufnimmt. Die Bedingung betrachtet nur Gabendaten, nie Beträge, und Karten und Warnungen zeigen nie Beträge. Da sie offenlegt, wer aufgehört hat zu geben, sehen und ändern oder entfernen diese Option nur Personen, die Spenden einsehen dürfen.

Lässt sich die Bedingung einer Weiterleitung aus irgendeinem Grund nicht prüfen, gilt die Weiterleitung als nicht zutreffend. Die Karte bleibt am Schritt (oder folgt einer anderen zutreffenden Weiterleitung), statt festzuhängen.

:::info
Auf dem Board zeigt jede Schrittspalte kleine Anmerkungen zu ihrer Weiterleitung – etwa eine Ergebnisbezeichnung oder „falls zutrifft“ gefolgt von einem Pfeil zum Zielschritt oder Zielworkflow.
:::

## Vollautomatische Schritte {#fully-automated-steps}

Sie können einen Schritt vollständig von allein laufen lassen, ohne dass ihn jemand bearbeitet. Geben Sie dem Schritt seine **automatischen Aktionen** und fügen Sie eine **automatische Weiterleitung** (ohne Bedingungen) hinzu, die auf den nächsten Schritt zeigt. Sobald eine Karte eintrifft, laufen die Aktionen, und dann befördert die Weiterleitung sie sofort – die Karte geht direkt durch.

:::tip
Kombinieren Sie dies mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf“ weiterleiten.* E-Mail und Timing übernimmt das System, und eine ehrenamtliche Person sieht die Karte erst, wenn es Zeit für den persönlichen Kontakt ist.
:::

## Auslöser {#triggers}

Auslöser fügen Personen automatisch einem Workflow hinzu, sobald etwas geschieht, sodass Sie Karten nie von Hand anlegen müssen. Klicken Sie auf dem Board eines Workflows auf den Reiter **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Ereignisauslöser

Sie werden ausgelöst, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur passende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** – z. B. alle hinzufügen, deren Status *Besucher* oder *Gast* wird (der Status, den sich selbst registrierende Personen erhalten).
- **Spende · Erstellt** – z. B. eine erste oder große Gabe in einen Dank-Workflow aufnehmen (nach Betrag, Fonds oder Zahlungsart filtern).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** – fügt jede Person hinzu, die ein bestimmtes Formular absendet (ideal für eine Karte „Ich bin neu“ oder „Kontakt“).

### Zeitplan-Auslöser {#schedule-triggers}

Sie laufen wiederkehrend – täglich, wöchentlich, monatlich oder jährlich – gegen einen Satz Bedingungen. Verwenden Sie sie für zeitbezogene Kontaktaufnahmen, etwa *alle, deren Geburtstag heute ist* (Geburtsdatum · Tag des Monats = **Heute**, mit dem Monat auf **Aktueller Monat**) oder einen *monatlichen* Check-in. Auch ohne **Nur einmal pro Person** fügt ein Zeitplan-Auslöser dieselbe Person nicht erneut innerhalb einer Wiederholungsperiode hinzu (ein Tag, eine Woche, ein Monat oder ein Jahr, je nachdem, wie oft er läuft).

Für jeden Auslöser können Sie außerdem festlegen:

- Den **Startschritt**, auf dem die neue Karte landet (standardmäßig der erste Schritt).
- **Nur einmal pro Person** – damit dieselbe Person durch den Auslöser nicht zweimal in den Workflow gelangt. Ist dies aktiviert, wird jede Person übersprungen, die bereits eine Karte in diesem Workflow hat.
  - **Nach Schließen der Karte erneut hinzufügen** – erscheint, wenn **Nur einmal pro Person** aktiviert ist. Aktivieren Sie es, damit der Auslöser eine Person erneut hinzufügen darf, sobald ihre frühere Karte in diesem Workflow geschlossen ist. Eine Person hat trotzdem nie zwei offene Karten im Workflow gleichzeitig. Verwenden Sie dies für Dinge, die mehr als einmal vorkommen können, etwa einen wiederkehrenden Gast oder einen jährlichen Prozess.
- **Aktiv** – den Auslöser ein- oder ausschalten, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen Auslöser **Formular · Eingereicht** mit der Vorlage **Nachbetreuung neuer Besucher**, um Ihre Karte „Kontakt“ oder „Ich bin neu“ in eine automatische Nachbetreuungs-Pipeline zu verwandeln.
:::

## Bestätigungen von Dienstaufgaben {#serving-assignment-confirmations}

Eine besondere Art von Workflow kann [Dienstanfragen](./plans.md#assigning-team-members) nachverfolgen, bis jede ehrenamtliche Person annimmt oder ablehnt. Statt Personen verfolgt jede Karte auf diesem Board **eine Einteilung** – eine Person auf einer Position in einem Plan. Zwei Rollen oder zwei Gottesdienste für dieselbe Person erhalten getrennte Karten. Dies ist optional: Für einen Plan ändert sich nichts, bis Sie in seinen Einstellungen einen Bestätigungs-Workflow wählen.

### Einrichtung

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen** und wählen Sie die Vorlage **Bestätigung einer Dienstaufgabe**. (Oder beginnen Sie einen **Leeren Workflow** und setzen Sie seinen **Zweck** auf **Bestätigung einer Dienstaufgabe**.) Das Anlegen aus der Vorlage erfordert die Berechtigung, Textnachrichten zu senden, da sie einen Textschritt enthält.
2. Prüfen Sie die Schritte. Die Vorlage beginnt mit:
   - **Anfrage senden und auf Antwort warten** – sendet die Dienstanfrage per E-Mail und Textnachricht, wartet 2 Tage, sendet eine Erinnerungs-E-Mail, wartet einen weiteren Tag und schiebt die Karte dann automatisch weiter.
   - **Ehrenamtliche zu unbeantworteter Anfrage anrufen** – ein Schritt, in dem eine Person die ehrenamtliche Person anruft, fällig in 1 Tag. Legen Sie an diesem Schritt eine **Standardzuständige Person** fest. Hat er keine, geht die Karte an die Leitung des Dienstbereichs oder, falls es keine gibt, an das Dienstteam.
3. Passen Sie Wartezeiten, Nachrichten und Schritte an Ihre Kirche an.
4. Öffnen Sie die [Einstellungen eines Plans](./plans.md#plan-settings) und wählen Sie diesen Workflow unter **Bestätigungs-Workflow**.

Diese Workflows verwenden die Aktion **Dienstanfrage senden** statt **E-Mail senden** und **Textnachricht senden**. Wählen Sie **E-Mail** oder **Textnachricht** und schreiben Sie optional eine **Anfragenachricht**. Die Anfrage enthält immer die Rolle, den Plan, das Datum des Gottesdienstes und einen Link zur Antwort; in Ihrer Nachricht können Sie `{{planName}}`, `{{positionName}}` und `{{serviceDate}}` verwenden. Lassen Sie die Nachricht leer, um die Standardanfrage zu nutzen. Die Benachrichtigungseinstellungen der Ehrenamtlichen, deren Zustimmung zu Textnachrichten, Ihr Anbieter für Textnachrichten und die E-Mail-Freigabe Ihrer Kirche gelten alle, und jeder übersprungene oder blockierte Versuch wird auf der Karte vermerkt. **E-Mail senden**, **Textnachricht senden** und **Zum Workflow hinzufügen** stehen auf diesen Boards nicht zur Verfügung.

Der Reiter **Auslöser** eines Bestätigungs-Workflows erklärt, wie Karten gestartet werden, anstatt Auslöser anzubieten, und diese Workflows erscheinen nicht in den Listen „Zum Workflow hinzufügen“ für Personen.

### Wie Karten gestartet und geschlossen werden

- Karten starten, wenn Sie Ehrenamtliche zu einem veröffentlichten Plan **benachrichtigen** (siehe [Ehrenamtliche benachrichtigen](./plan-validation.md#notifying-volunteers)). Jede neue, unbeantwortete Einteilung erhält eine Karte. Speichern, Veröffentlichen, Kopieren oder automatisches Befüllen eines Plans kontaktiert von allein niemanden, und vorläufig eingeplante Pläne versenden nichts.
- Ehrenamtliche erhalten weiterhin die übliche Benachrichtigung in der App. E-Mail- und Textnachfassung kommen vom Workflow.
- Sobald die ehrenamtliche Person **annimmt oder ablehnt**, wird ihre Karte automatisch geschlossen, zusammen mit allen damit verknüpften Nachfass-Aufgaben.
- Das Kartenfenster zeigt die Position, das Datum des Gottesdienstes und einen Link zum Plan. Statt **Abschließen** lautet der Button **Nachfassen erledigt erfassen**. Ein Klick darauf vermerkt, dass nachgefasst wurde; die Karte bleibt jedoch offen und zugewiesen (angezeigt als **Warten auf Antwort**), bis die ehrenamtliche Person antwortet oder die Antwortfrist verstrichen ist.
- Die Antwortfrist ist das Ende des letzten Gottesdienstes, in dem das Team der Position dient. Hat der Plan keine passenden Zeiten, ist es das Ende des Gottesdiensttages. Hat bis dahin niemand geantwortet, wird die Karte mit **Antwortfrist abgelaufen** geschlossen, und eine Aufgabe **Unbeantwortete Dienstanfrage prüfen** geht an die aktuelle Zuständigkeit der Karte oder die Leitung des Dienstbereichs, damit jemand entscheiden kann, wie der Platz besetzt wird. Die Einteilung bleibt **unbestätigt**.
- Das Entfernen der Einteilung, das Ändern ihrer Person, Position oder des Plandatums, das Zurücksetzen des Plans auf vorläufig eingeplant oder der Wechsel des Plans zu einem anderen Bestätigungs-Workflow schließt die Karte. Eine geschlossene Karte wird durch kein weiteres **Benachrichtigen** wieder geöffnet; fügen Sie eine neue Einteilung hinzu, um eine frische Anfrage zu senden.

:::info
Bei Anfragen, die über einen Bestätigungs-Workflow gesendet wurden, gehen [Erinnerungen für Ehrenamtliche](./plans.md#volunteer-reminders) nur an Ehrenamtliche, die **angenommen** haben, sodass Personen, die noch auf eine Antwort warten, nicht zusätzlich zu den Nachfassungen des Workflows Erinnerungen erhalten.
:::

## Meine Karten

Ehrenamtliche und Mitarbeitende müssen nicht durch jedes Board blättern, um ihre Arbeit zu finden. Die Liste **Meine Karten** auf der Seite **Meine Arbeit** zeigt jede Karte, die dem aktuellen Benutzer zugewiesen ist, über alle Workflows hinweg. Um dorthin zu gelangen, klicken Sie oben auf der Seite Workflows auf **Meine Karten** oder öffnen Sie **Dienst > Meine Arbeit** im Sprungmenü. Ein Klick auf eine Karte öffnet ihr Detailfenster direkt auf der Seite Meine Arbeit, wo Sie die Karte bearbeiten oder entfernen können, ohne die Seite zu verlassen. Wenn Sie Workflows ansehen dürfen, enthält das Fenster außerdem einen Link **Workflow-Board öffnen** zum Board, zu dem die Karte gehört.

## Berichte

Öffnen Sie einen Workflow und klicken Sie auf **Berichte**, um Auswertungen für diesen Workflow zu sehen:

- **Überfällig** – die Anzahl der Karten, die über ihr Fälligkeitsdatum hinaus sind.
- **Karten pro Schritt** – wie viele Karten derzeit auf jedem Schritt liegen, als Säulendiagramm dargestellt.
- **Abgeschlossen (30 Tage)** – der Durchsatz der letzten 30 Tage, als Liniendiagramm dargestellt.

Nutzen Sie diese Werte, um Engpässe zu erkennen – etwa einen Schritt, an dem sich Karten stapeln und nie weiterkommen.

## Verwandte Artikel

- [Aufgaben](./tasks.md) – die einzelnen Handlungspunkte, auf denen Workflow-Karten aufbauen
- [Formulare](../forms/index.md) – die Formulare erstellen, die Workflows auslösen können
- [Gruppen](../groups/index.md) – die Gruppen, in die eine Aktion „Zur Gruppe hinzufügen“ Personen einordnen kann
- [Dienstpläne](./plans.md) – einen Bestätigungs-Workflow für die Dienstanfragen eines Plans wählen
- [Rollen & Berechtigungen](../settings/roles-permissions.md) – steuern, wer Workflows anzeigen, bearbeiten und verwalten darf
