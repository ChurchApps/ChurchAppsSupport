---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows führen Personen auf einer visuellen Tafel durch eine Reihe von Schritten. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert -- von der Nachbetreuung eines Erstgastes über ein Mitgliedschaftsverfahren bis zum Dankeschön für eine erste Gabe und allem anderen, bei dem Sie viele Personen durch dieselben Stufen verfolgen müssen. Ein Schritt kann eine Person bitten, etwas zu tun (anrufen, ein Gespräch führen) **und** eigenständig automatische Aktionen ausführen -- eine E-Mail oder SMS senden, einige Tage warten, die Person einer Gruppe hinzufügen. So übernehmen Workflows sowohl die persönliche Nachbetreuung als auch die Routinearbeit drumherum. Workflows erweitern [Aufgaben](./tasks.md) zu einer Drag-and-Drop-Kanban-Tafel, damit niemand und nichts durch das Raster fällt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie nachverfolgen möchten, in B1 Admin vorhanden sind
- Machen Sie sich mit der Funktionsweise von [Aufgaben](./tasks.md) vertraut, da jede Karte auf einer Tafel eine Aufgabe ist
- Um die Aktion **E-Mail senden** zu nutzen, legen Sie zuerst die gewünschten E-Mail-Vorlagen an (verwaltet unter **Einstellungen → E-Mail-Vorlagen**)
- Um die Aktion **SMS senden** zu nutzen, verbinden Sie zuerst einen [SMS-Anbieter](../settings/church-settings.md#texting)
- Sie benötigen die passende Berechtigung für Aufgaben. Ansehen, Karten bearbeiten und Workflows verwalten sind getrennte Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Workflows ansehen

Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Dienst** auf und klicken Sie auf **Workflows**. Ihre Workflows sind in einer Tabelle aufgelistet, mit ihrer **Kategorie** und ihrem **Status** (**Aktiv** oder **Inaktiv**). Verwenden Sie Kategorien, können Sie über die Reiter oberhalb der Liste nach Kategorie filtern. Klicken Sie auf einen Workflow, um seine Tafel zu öffnen.

## Einen Workflow anlegen

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Leerer Workflow** -- von vorn beginnen und eigene Schritte aufbauen.
   - **Aus einer Vorlage** -- mit einer fertigen Schrittfolge starten, die Sie bearbeiten können. Die mitgelieferten Vorlagen umfassen:
     - **Nachbetreuung neuer Besucher** -- Willkommens-E-Mail senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftskurs** -- Interesse bekunden → Für den Kurs anmelden → Kurs besuchen → Mitgliedschaft abschließen
     - **Dankeschön für erste Gabe** -- Dankesbrief senden → Wirkung der Gabe teilen → Verwaltet
     - **Bestätigung einer Dienstzuweisung** -- Anfrage senden und auf Antwort warten → Ehrenamtlichen zu unbeantworteter Anfrage anrufen (siehe [Bestätigungen von Dienstzuweisungen](#serving-assignment-confirmations))

   Das Erstellen der Schritte einer Vorlage kann einen Moment dauern. Während es läuft, lautet die Schaltfläche **Workflow hinzufügen** **Wird erstellt...** und kann nicht erneut angeklickt werden, sodass kein Duplikat entsteht. Schlägt etwas fehl, zeigt die Seite die Meldung *"Der Workflow konnte nicht erstellt werden. Bitte versuchen Sie es erneut."*
3. Geben Sie dem Workflow einen **Namen**.
4. Weisen Sie optional eine **Kategorie** zu, um zusammengehörige Workflows zu gruppieren. Sie können über das Auswahlfeld direkt eine neue Kategorie anlegen.
   Bei einem leeren Workflow wählen Sie außerdem seinen **Zweck**: **Personen-Nachbetreuung** (die übliche Art) oder **Bestätigung einer Dienstzuweisung**. Der Zweck kann nach dem Erstellen des Workflows nicht mehr geändert werden.
5. Lassen Sie den Workflow **Aktiv**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inaktiv**, um ihn aus den Listen "Zu Workflow hinzufügen" auszublenden.
6. Klicken Sie auf **Speichern**.

:::tip
Nutzen Sie die Schaltfläche **Duplizieren** auf der Liste der Workflows, um einen vorhandenen Workflow -- einschließlich seiner Schritte, automatischen Aktionen und Weiterleitungen -- als Ausgangspunkt für einen neuen zu kopieren.
:::

## Die Tafel mit Schritten aufbauen

Jede Workflow-Tafel besteht aus **Schritten**, die von links nach rechts als Spalten angezeigt werden. Öffnen Sie einen Workflow und nutzen Sie **Schritt hinzufügen**, um jede Stufe Ihres Prozesses anzulegen.

Beim Hinzufügen oder Bearbeiten eines Schritts können Sie einstellen:

- **Schrittname** -- die Spaltenüberschrift (zum Beispiel "Willkommensanruf" oder "Warten auf Anmeldung").
- **Fällig in (Tage)** -- legt automatisch ein Fälligkeitsdatum fest, sobald eine Karte in diesen Schritt gelangt. Karten nach ihrem Fälligkeitsdatum werden als **Überfällig** markiert.
- **Standardverantwortliche** -- die Person oder Gruppe, der neue Karten in diesem Schritt automatisch zugewiesen werden. Ist die Standardverantwortliche eine Person, erhält sie eine Benachrichtigung, dass ihr eine Karte zugewiesen wurde.
- **Automatische Aktionen** -- Dinge, die das System von selbst ausführt, sobald eine Karte ankommt (siehe unten).
- **Weiterleitung** -- wohin die Karte geht, wenn sie den Schritt verlässt (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie die Schrittspalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge legt außerdem den Standardweg fest, den eine Karte nimmt, wenn keine andere Weiterleitung greift.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen gehören zum Schritt, daher werden diese Bereiche im Editor erst freigeschaltet, wenn der Schritt existiert.
:::

## Automatische Aktionen

Jeder Schritt kann eine Liste **automatischer Aktionen** enthalten, die selbstständig ablaufen, sobald eine Karte den Schritt **betritt** -- noch bevor jemand sie anfasst. So bittet ein Schritt sowohl eine Ehrenamtliche Person um Mithilfe *als auch* erledigt die Routinearbeit rund um die Nachbetreuung.

Öffnen Sie im Schritt-Editor **Automatische Aktionen**, klicken Sie auf **Aktion hinzufügen**, wählen Sie einen Typ und füllen Sie seine Einstellungen aus. Fügen Sie so viele hinzu, wie Sie brauchen; sie laufen **von oben nach unten in der Reihenfolge** ab. Klicken Sie auf **Speichern** des Schritts, um den Schritt und alle seine Aktionen gemeinsam zu sichern. Eine Aktion mit ihrem Papierkorbsymbol zu entfernen wirkt sofort.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine von Ihnen gewählte E-Mail-Vorlage. Sie können die Betreffzeile überschreiben. |
| **SMS senden** | Sendet der Person eine von Ihnen verfasste Nachricht über den [SMS-Anbieter](../settings/church-settings.md#texting) Ihrer Kirche. |
| **Warten** | Hält die Karte für eine Anzahl von Tagen an, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person einer von Ihnen gewählten [Gruppe](../groups/index.md) hinzu. |
| **Aus der Gruppe entfernen** | Entfernt die Person aus einer von Ihnen gewählten Gruppe. |
| **Anwesenheit erfassen** | Markiert die Person als anwesend bei der laufenden Gottesdienstzeit einer Gruppe (siehe unten). |
| **Zu Workflow hinzufügen** | Startet die Person in einem anderen Workflow -- nützlich, um zwischen Prozessen zu übergeben. |
| **Notiz hinzufügen** | Hält eine Notiz im Verlauf der Karte fest. |
| **Feld setzen** | Aktualisiert ein Feld im Personendatensatz: Mitgliedsstatus, Familienstand, Geschlecht, Ort, Bundesland oder PLZ. |
| **Webhook** | Sendet die Angaben der Karte an eine externe Webadresse (URL), die Sie angeben, um andere Systeme anzubinden. |
| **Aufgabe anlegen** | Legt eine [Aufgabe](./tasks.md) mit dem von Ihnen eingegebenen Titel und der Beschreibung an, zugewiesen an die von Ihnen gewählte Person. |
| **Person benachrichtigen** | Sendet einer von Ihnen gewählten Mitarbeiterin bzw. einem Mitarbeiter oder Ehrenamtlichen eine E-Mail und eine B1-Benachrichtigung zur Karte (siehe unten). |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **bleibt die Karte bei diesem Schritt**, damit eine Person sie bearbeiten kann -- es sei denn, der Schritt hat eine automatische Weiterleitung, die sie weiterschiebt (siehe [Vollautomatische Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte über den normalen Ablauf ankommt -- wenn sie zum ersten Mal hinzugefügt wird, wenn ein Ergebnis oder eine automatische Weiterleitung sie hereinbringt oder nachdem eine Wartezeit abgelaufen ist. Sie laufen **nicht** erneut, wenn ein Mitarbeiter eine Karte manuell auf den Schritt zieht oder zurückschickt, sodass eine Person nicht dieselbe E-Mail zweimal erhält.
:::

### E-Mail senden

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional eine eigene Betreffzeile ein. Sobald eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Ist für die Person keine E-Mail-Adresse hinterlegt, überspringt der Schritt diese Aktion einfach.) [Platzhalter](../settings/email-templates.md#merge-fields) in der Vorlage, etwa `{{firstName}}`, werden mit den persönlichen Angaben der Person ersetzt.

Wird die E-Mail versendet, vermerkt der Verlauf der Karte **E-Mail gesendet**. Kann sie nicht versendet werden -- zum Beispiel weil die E-Mail Ihrer Kirche noch nicht freigegeben ist oder das Tageslimit erreicht wurde --, wird kein Eintrag "E-Mail gesendet" hinzugefügt.

:::info
Workflow-E-Mails werden nur versendet, nachdem Ihre Kirche für den Versand von Gruppen-E-Mails freigegeben wurde, und sie zählen auf das Tageslimit für E-Mails Ihrer Kirche. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Die Aktion **E-Mail senden** warnt Sie im Schritt-Editor, wenn diese E-Mails nicht versendet werden: *"Die E-Mail Ihrer Kirche wurde noch nicht freigegeben..."*, wenn die Freigabe noch aussteht, oder *"Die E-Mail Ihrer Kirche ist pausiert..."*, wenn kürzlich Nachrichten unzustellbar waren oder als Spam gemeldet wurden.
:::

### Anwesenheit erfassen

Wählen Sie **Anwesenheit erfassen** und klicken Sie auf **Gruppe auswählen**, um die Gruppe festzulegen, deren Anwesenheit erfasst werden soll. Wenn die Aktion läuft, wird die Person für die laufende Gottesdienstzeit dieser Gruppe als anwesend markiert -- genau so, als hätte sie sich eingecheckt. Das ist nützlich zusammen mit einem Auslöser, der Personen beim Ankommen dem Workflow hinzufügt, sodass sie ohne separaten Check-in gezählt werden.

- Die Anwesenheit wird zum Zeitpunkt der **Erstellung** der Karte gemessen, daher schiebt eine **Wartezeit** früher im Workflow die Karte nicht über den Gottesdienst hinaus.
- Nur Gottesdienstzeiten mit einem Tag und einer Startzeit zählen. Ist zu diesem Zeitpunkt keine Gottesdienstzeit der Gruppe im Gange, wird nichts erfasst, und der Verlauf der Karte vermerkt **Kein geplanter Gottesdienst im Gange -- Anwesenheit nicht erfasst**.
- Wird die Anwesenheit erfasst, zeigt der Verlauf der Karte **Anwesenheit erfasst** gefolgt vom Namen der Gruppe. Führt man die Aktion für denselben Gottesdienst erneut aus, wird die Person nicht doppelt gezählt.

### Eine Person benachrichtigen

Wählen Sie **Person benachrichtigen**, klicken Sie auf **Person auswählen** und geben Sie optional eine **Nachricht** ein. Sobald eine Karte den Schritt betritt, erhält diese Person eine E-Mail und eine B1-Benachrichtigung mit dem Namen der Person auf der Karte, den Namen des Workflows und des Schritts, Ihrer Nachricht und einem Link zum Öffnen der Karte. Nutzen Sie sie, um einer Mitarbeiterin bzw. einem Mitarbeiter oder einer Gruppenleitung einen Hinweis zu geben -- zum Beispiel *"Informiere den Pastor, sobald jemand den Schritt Mitgliedschaftsgespräch erreicht."* Der Verlauf der Karte vermerkt **Benachrichtigt** gefolgt vom Namen der Person.

### Eine SMS senden

Wählen Sie **SMS senden** und geben Sie die **SMS-Nachricht** ein (bis zu 1.600 Zeichen). Sobald eine Karte den Schritt betritt, erhält die Person diese SMS auf ihr Mobiltelefon. Um die Nachricht zu personalisieren, klicken Sie auf einen Chip unter dem Nachrichtenfeld -- **Vorname**, **Nachname**, **Anzeigename** oder **Kirchenname** --, um `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` an Ihrer Cursorposition einzufügen. Jeder dieser Platzhalter wird beim Versand mit den Angaben der Person ersetzt.

- Hat die Person keine Mobilnummer hinterlegt, wird keine SMS gesendet, und der Verlauf der Karte vermerkt **SMS übersprungen: keine Mobilnummer**.
- Hat die Person sich abgemeldet, wird keine SMS gesendet, und der Verlauf der Karte vermerkt **SMS übersprungen: abgemeldet**.
- Wird die SMS versendet, vermerkt der Verlauf der Karte **SMS gesendet**. Schlägt der Versand fehl -- etwa weil kein SMS-Anbieter verbunden ist oder Ihrer Kirche das SMS-Guthaben ausgegangen ist --, wird der Fehler im Verlauf der Karte protokolliert, und die übrigen Aktionen des Schritts laufen trotzdem weiter.

:::warning
SMS werden über den eigenen [SMS-Anbieter](../settings/church-settings.md#texting) Ihrer Kirche versendet. Ist kein Anbieter verbunden, warnt der Aktionseditor *"Es ist kein SMS-Anbieter eingerichtet"*, und SMS werden nicht gesendet.
:::

### Einige Tage warten (Drip-Sequenzen)

Die Aktion **Warten** hält eine Karte für die von Ihnen festgelegte Anzahl von Tagen an. Während sie wartet, zeigt die Karte den Status **Zurückgestellt**. B1 prüft alle 30 Minuten, ob Wartezeiten abgelaufen sind, sodass eine Karte innerhalb von etwa einer halben Stunde nach Ende der Wartezeit weiterläuft. Ist die Wartezeit vorbei:

1. Laufen alle **übrigen Aktionen desselben Schritts** ab -- sodass Sie eine Drip-Sequenz wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden** aufbauen können.
2. Dann bewegt sich die Karte weiter, falls der Schritt eine automatische Weiterleitung hat; andernfalls bleibt sie beim Schritt, bis eine Person sie übernimmt.

:::tip
Eine **Wartezeit** am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zurückzuhalten, bevor sie einer Ehrenamtlichen Person angezeigt wird -- etwa *7 Tage warten, dann meldet sich eine Begleitperson*.
:::

## Personen als Karten hinzufügen

Es gibt mehrere Wege, Personen auf eine Tafel zu bringen:

- **Von der Tafel aus** -- Klicken Sie unten in einer Schrittspalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe wählen; dann wird jedes Mitglied dieser Gruppe als Karte hinzugefügt.
- **Aus dem Personendatensatz** -- Nutzen Sie auf der Seite einer Person die Option **Zu Workflow hinzufügen**, um sie in einen Workflow zu setzen.
- **Aus der Personensuche** -- Wählen Sie mehrere Personen aus und nutzen Sie die Massenaktion **Zu Workflow hinzufügen**, um sie alle auf einmal hinzuzufügen.
- **Automatisch durch einen Auslöser** -- Fügen Sie Personen hinzu, wenn etwas geschieht, etwa eine Formulareinreichung oder eine erste Gabe (siehe [Auslöser](#triggers) unten).

Wenn Sie jemanden von Hand oder mit der Schrittaktion **Zu Workflow hinzufügen** hinzufügen, erhält diese Person nie eine zweite offene Karte im selben Workflow. Hat sie bereits eine offene Karte, wird sie übersprungen (bei einer Massenhinzufügung erhalten nur die Personen ohne Karte eine neue). Sobald ihre Karte geschlossen ist, können Sie sie erneut hinzufügen. Auslöser folgen stattdessen ihrer eigenen Einstellung **Nur einmal pro Person**.

## Mit der Tafel arbeiten

Öffnen Sie einen Workflow, um seine Tafel zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, sowie einen Fälligkeits- oder Statuschip (**Überfällig** oder **Zurückgestellt**). Eine Schrittspalte zeigt außerdem kleine Abzeichen für die automatischen Aktionen, die sie ausführt, und Anmerkungen zu ihrer Weiterleitung. So erhalten Sie auf einen Blick einen Überblick, wie die Karten fließen.

- **Eine Karte verschieben** -- Ziehen Sie eine Karte von einer Spalte zur nächsten, sobald die Person Fortschritte macht.
- **Eine Karte öffnen** -- Doppelklicken Sie auf eine Karte (oder klicken Sie darauf), um ihre Detailansicht zu öffnen. Dort können Sie den Schritt ändern, neu zuweisen, Notizen hinzufügen und nachlesen, was bereits passiert ist.

In der Kartenansicht können Sie:

- Die Karte einer anderen Person oder Gruppe **zuweisen**.
- Die Karte für 1 Tag, 3 Tage oder 1 Woche **zurückstellen**, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- Zum vorherigen Schritt **zurücksenden** oder zum nächsten Schritt **überspringen**.
- **Zuweisung anheften** -- behält dieselbe verantwortliche Person auf der Karte, auch wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte beim Wechsel in einen neuen Schritt dem Standardverantwortlichen dieses Schritts neu zugewiesen; das Anheften hält die bisherige Person durchgehend verantwortlich.
- Die Karte **abschließen**, um sie zu beenden, oder eine Schaltfläche **Ergebnis** wählen, falls der Schritt Ergebnisse konfiguriert hat (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).
- **Karte entfernen** -- nimmt eine Karte von der Tafel, ohne sie abzuschließen, etwa wenn jemand versehentlich hinzugefügt wurde. Nach Bestätigung wird die Karte geschlossen und von allen Listen entfernt. Keine Ergebnisse, Weiterleitungen oder Schrittaktionen laufen, und ihr Verlauf bleibt mit einem Eintrag **Entfernt** erhalten. Bei einer Karte zur [Bestätigung einer Dienstzuweisung](#serving-assignment-confirmations) schließt das Entfernen die Anfrage auf dieselbe Weise.
- **Notizen hinzufügen** und die **Aktivität** der Karte einsehen -- ein Protokoll der ausgeführten automatischen Aktionen (gesendete E-Mails, Wartezeiten usw.), jeweils mit Datum und Uhrzeit.

Bei einer Karte zu einer Person zeigt die Detailansicht außerdem Mobilnummer und E-Mail-Adresse der Person als Links, über die Sie direkt anrufen oder eine E-Mail schreiben können, sowie einen Link **Profil ansehen**, sofern Sie die Berechtigung haben, Personen anzusehen. Die Person, der eine Karte zugewiesen ist, sieht Telefon und E-Mail auch ohne Zugriff auf Personen.

Notizen werden mit der Karte gespeichert. Wer die Karte öffnen kann -- einschließlich der Person oder Gruppe, der sie zugewiesen ist -- kann die Notizen lesen und eigene hinzufügen. Wer die Karte nicht öffnen kann, sieht ihre Notizen nicht.

### Massenaktionen

Wählen Sie die Kontrollkästchen mehrerer Karten aus, um sie gemeinsam zu bearbeiten. Um alle Karten eines Schritts auf einmal auszuwählen, setzen Sie das Häkchen **Alle auswählen** in der Kopfzeile der Schrittspalte; setzen Sie es erneut, um die Auswahl aufzuheben. Es erscheint eine Werkzeugleiste, mit der Sie für alle ausgewählten Karten gleichzeitig **Abschließen**, **Zurückstellen**, **Zuweisen** (neu zuweisen) oder **Verschieben nach…** einen anderen Schritt ausführen können.

## Karten mit Ergebnissen und Bedingungen weiterleiten

Die Weiterleitung legt fest, wohin eine Karte geht, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten von Weiterleitung zu konfigurieren.

### Ergebnis-Schaltflächen

Ergebnisse sind Schaltflächen in der Detailansicht der Karte, wenn Sie eine Karte in diesem Schritt abschließen. Statt einer einzigen Schaltfläche **Abschließen** können Sie Auswahlmöglichkeiten wie "Gruppe beigetreten" oder "Kein Interesse" anbieten. Jedes Ergebnis kann:

- Die Karte zu **einem anderen Schritt** in diesem Workflow senden,
- Die Karte an einen völlig anderen Workflow **übergeben**, oder
- Die Karte **schließen**.

So kann eine einzelne Entscheidung die Person auf verschiedene Wege führen.

### Automatische Weiterleitung (mit Bedingungen)

Automatische Weiterleitungen bewegen eine Karte weiter, **sobald sie einen Schritt betritt** (und nachdem dessen automatische Aktionen abgeschlossen sind), ohne dass jemand klicken muss, sofern die Person die festgelegten Bedingungen erfüllt. Fügen Sie eine Weiterleitung hinzu, wählen Sie den Zielschritt und legen Sie eine oder mehrere **Bedingungen** fest (etwa Standort, Alter oder Mitgliedsstatus einer Person). Textfelder können genau oder mit **enthält**, **beginnt mit** oder **endet mit** verglichen werden. Eine Weiterleitung ohne Bedingungen trifft auf alle zu.

Datumsbedingungen (Heutiges Datum, Geburtsdatum oder Hochzeitstag) können das vollständige Datum oder nur einen Teil davon vergleichen -- den Wochentag, den **Tag des Monats**, den **Monat** oder die verstrichenen Jahre. Für das Geburtsdatum oder den Hochzeitstag einer Person bietet **Tag des Monats** die relative Option **Heute**, sodass eine Bedingung wie *Geburtsdatum · Tag des Monats = Heute* auf Personen zutrifft, deren Geburtstag auf den heutigen Tag im Monat fällt. **Monat** bietet **Vorheriger Monat**, **Aktueller Monat** und **Nächster Monat**. Relative Werte wie diese werden anhand der Zeitzone Ihrer Kirche berechnet, sodass sie zum Kalendertag Ihrer Kirche passen und nicht zu dem des Servers.

Die Gruppe **Spenden** der Bedingungen enthält **Ehemals regelmäßig gebender Mensch**, die Personen findet, die früher regelmäßig gegeben haben und dann aufgehört haben. Legen Sie drei Zahlen fest: *Gab in mindestens* **3** *der letzten* **12** *Wochen, dann nichts in den letzten* **3** *Wochen* (das sind die Voreinstellungen). Die Wochen werden von heute aus in der Zeitzone Ihrer Kirche zurückgezählt, und eine erstattete Gabe zählt nicht. Die Bedingung ist vor allem bei einem [Zeitplan-Auslöser](#schedule-triggers) nützlich -- etwa einer wöchentlichen Regel, die ehemals regelmäßig gebende Menschen einer Tafel für die seelsorgerliche Nachbetreuung hinzufügt. Die Bedingung betrachtet nur Gabedaten, nie Beträge, und Karten und Benachrichtigungen zeigen nie Beträge. Da sie offenlegt, wer das Geben eingestellt hat, sehen diese Option und können sie hinzufügen, ändern oder entfernen nur Personen, die Spenden einsehen dürfen.

Lässt sich die Bedingung einer Weiterleitung aus irgendeinem Grund nicht prüfen, gilt diese Weiterleitung als nicht zutreffend. Die Karte bleibt im Schritt (oder folgt einer anderen zutreffenden Weiterleitung), anstatt hängen zu bleiben.

:::info
Auf der Tafel zeigt jede Schrittspalte kleine Anmerkungen zu ihrer Weiterleitung -- zum Beispiel eine Ergebnisbezeichnung oder "wenn zutrifft" gefolgt von einem Pfeil zum Zielschritt oder Zielworkflow.
:::

## Vollautomatische Schritte

Sie können einen Schritt vollständig selbstständig ablaufen lassen, ohne dass ihn jemand bearbeitet. Geben Sie dem Schritt seine **automatischen Aktionen** und fügen Sie eine **automatische Weiterleitung** (ohne Bedingungen) zum nächsten Schritt hinzu. Sobald eine Karte eintrifft, laufen die Aktionen, und dann schiebt die Weiterleitung sie sofort weiter -- die Karte durchläuft den Schritt ohne Halt.

:::tip
Kombinieren Sie dies mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt "Persönlicher Anruf" weiterleiten.* E-Mail und Timing werden für Sie erledigt, und eine Ehrenamtliche Person sieht die Karte erst, wenn der persönliche Kontakt ansteht.
:::

## Auslöser

Auslöser fügen Personen automatisch einem Workflow hinzu, wenn etwas geschieht, sodass Sie nie Karten von Hand anlegen müssen. Klicken Sie auf der Tafel eines Workflows auf den Reiter **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Ereignis-Auslöser

Sie greifen, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur passende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** -- z. B. alle hinzufügen, deren Status zu *Besucher* oder *Gast* wird (der Status für Personen, die sich selbst registrieren).
- **Spende · Erstellt** -- z. B. eine erste oder große Gabe einem Dankeschön-Workflow hinzufügen (nach Betrag, Fonds oder Zahlungsart filtern).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** -- fügt jede Person hinzu, die ein gewähltes Formular abschickt (ideal für eine Karte "Ich bin neu" oder "Kontakt").

### Zeitplan-Auslöser

Sie laufen wiederkehrend -- täglich, wöchentlich, monatlich oder jährlich -- anhand einer Reihe von Bedingungen. Nutzen Sie sie für zeitgesteuerte Ansprache, etwa *alle, deren Geburtstag heute ist* (Geburtsdatum · Tag des Monats = **Heute**, wobei der Monat auf **Aktueller Monat** gesetzt ist), oder einen *monatlichen* Kontrollkontakt. Selbst ohne **Nur einmal pro Person** fügt ein Zeitplan-Auslöser dieselbe Person innerhalb eines Wiederholungszeitraums nicht erneut hinzu (ein Tag, eine Woche, ein Monat oder ein Jahr, je nachdem, wie oft er läuft).

Für jeden Auslöser können Sie außerdem festlegen:

- Den **Startschritt**, in dem die neue Karte landet (Standard ist der erste Schritt).
- **Nur einmal pro Person** -- damit dieselbe Person durch den Auslöser nicht zweimal in den Workflow gelangt. Ist dies aktiviert, werden alle übersprungen, die bereits eine Karte in diesem Workflow haben.
  - **Nach Abschluss der Karte erneut hinzufügen** -- erscheint, wenn **Nur einmal pro Person** aktiv ist. Setzen Sie das Häkchen, damit der Auslöser eine Person erneut hinzufügt, sobald ihre frühere Karte in diesem Workflow geschlossen ist. Eine Person hat trotzdem nie gleichzeitig zwei offene Karten im Workflow. Nutzen Sie dies für Dinge, die mehr als einmal vorkommen können, etwa einen zurückkehrenden Gast oder einen jährlichen Prozess.
- **Aktiv** -- schaltet den Auslöser ein oder aus, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen Auslöser **Formular · Eingereicht** mit der Vorlage **Nachbetreuung neuer Besucher**, um Ihre Karte "Kontakt" oder "Ich bin neu" in eine automatische Nachbetreuungs-Pipeline zu verwandeln.
:::

## Bestätigungen von Dienstzuweisungen

Eine besondere Art von Workflow kann [Dienstanfragen](./plans.md#assigning-team-members) nachverfolgen, bis jeder Ehrenamtliche zusagt oder absagt. Statt Personen bildet jede Karte auf dieser Tafel **eine Zuweisung** ab -- eine Person in einer Position bei einem Plan. Zwei Rollen oder zwei Gottesdienste derselben Person erhalten getrennte Karten. Dies ist eine Option: Für einen Plan ändert sich nichts, bis Sie in seinen Einstellungen einen Bestätigungs-Workflow auswählen.

### Einrichtung

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen** und wählen Sie die Vorlage **Bestätigung einer Dienstzuweisung**. (Oder starten Sie einen **Leeren Workflow** und setzen Sie dessen **Zweck** auf **Bestätigung einer Dienstzuweisung**.) Das Erstellen aus der Vorlage erfordert die Berechtigung, SMS zu senden, da sie einen SMS-Schritt enthält.
2. Prüfen Sie die Schritte. Die Vorlage beginnt mit:
   - **Anfrage senden und auf Antwort warten** -- sendet die Dienstanfrage per E-Mail und SMS, wartet 2 Tage, sendet eine Erinnerungs-E-Mail, wartet einen weiteren Tag und schiebt die Karte dann automatisch weiter.
   - **Ehrenamtlichen zu unbeantworteter Anfrage anrufen** -- ein Schritt, in dem eine Person den Ehrenamtlichen anruft, fällig in 1 Tag. Legen Sie in diesem Schritt einen **Standardverantwortlichen** fest. Ist keiner gesetzt, geht die Karte an die Leitung des Dienstbereichs oder, falls es keine gibt, an das Team des Dienstbereichs.
3. Passen Sie die Wartezeiten, Nachrichten und Schritte an Ihre Kirche an.
4. Öffnen Sie die [Einstellungen des Plans](./plans.md#plan-settings) und wählen Sie diesen Workflow unter **Bestätigungs-Workflow**.

Diese Workflows verwenden die Aktion **Dienstanfrage senden** statt **E-Mail senden** und **SMS senden**. Wählen Sie **E-Mail** oder **Textnachricht** und schreiben Sie optional eine **Anfragenachricht**. Die Anfrage enthält immer Rolle, Plan, Gottesdienstdatum und einen Link zur Antwort; in Ihrer Nachricht können Sie `{{planName}}`, `{{positionName}}` und `{{serviceDate}}` verwenden. Lassen Sie die Nachricht leer, um die Standardanfrage zu verwenden. Benachrichtigungseinstellungen der Ehrenamtlichen, SMS-Einwilligung, Ihr SMS-Anbieter und die E-Mail-Freigabe Ihrer Kirche gelten alle, und jeder übersprungene oder blockierte Versuch wird auf der Karte vermerkt. **E-Mail senden**, **SMS senden** und **Zu Workflow hinzufügen** sind auf diesen Tafeln nicht verfügbar.

Der Reiter **Auslöser** eines Bestätigungs-Workflows erklärt, wie Karten gestartet werden, statt Auslöser anzubieten, und diese Workflows erscheinen nicht in den Listen "Zu Workflow hinzufügen" für Personen.

### Wie Karten gestartet und geschlossen werden

- Karten starten, wenn Sie Ehrenamtliche in einem veröffentlichten Plan **benachrichtigen** (siehe [Ehrenamtliche benachrichtigen](./plan-validation.md#notifying-volunteers)). Jede neue, unbeantwortete Zuweisung erhält eine Karte. Speichern, Veröffentlichen, Kopieren oder automatisches Besetzen eines Plans kontaktiert von selbst niemanden, und vorläufig eingeplante Pläne versenden nichts.
- Ehrenamtliche erhalten weiterhin die übliche Benachrichtigung in der App. E-Mail- und SMS-Nachfassaktionen stammen vom Workflow.
- Sobald der Ehrenamtliche **zusagt oder absagt**, wird seine Karte automatisch geschlossen, zusammen mit allen damit verknüpften Nachfassaufgaben.
- Die Detailansicht der Karte zeigt Position, Gottesdienstdatum und einen Link zum Plan. Statt **Abschließen** lautet die Schaltfläche **Nachfassen erledigt**. Ein Klick darauf vermerkt, dass nachgefasst wurde, aber die Karte bleibt offen und zugewiesen (angezeigt als **Warte auf Antwort**), bis der Ehrenamtliche antwortet oder die Antwortfrist verstrichen ist.
- Die Antwortfrist ist das Ende der letzten Gottesdienstzeit, in der das Team der Position dient. Hat der Plan keine passenden Zeiten, ist es das Ende des Gottesdiensttages. Hat bis dahin niemand geantwortet, wird die Karte mit **Antwortfrist abgelaufen** geschlossen, und eine Aufgabe **Unbeantwortete Dienstanfrage prüfen** geht an die aktuelle verantwortliche Person der Karte oder die Leitung des Dienstbereichs, damit jemand entscheiden kann, wie der Platz besetzt wird. Die Zuweisung bleibt **Unbestätigt**.
- Das Entfernen der Zuweisung, das Ändern ihrer Person, Position oder des Plandatums, das Zurücksetzen des Plans auf vorläufig eingeplant oder das Umstellen des Plans auf einen anderen Bestätigungs-Workflow schließt die Karte. Eine geschlossene Karte wird durch kein erneutes **Benachrichtigen** wieder geöffnet; fügen Sie eine neue Zuweisung hinzu, um eine frische Anfrage zu senden.

:::info
Bei Anfragen, die über einen Bestätigungs-Workflow gesendet wurden, gehen [Erinnerungen an Ehrenamtliche](./plans.md#volunteer-reminders) nur an Ehrenamtliche, die **zugesagt** haben, damit Personen, die noch auf Antwort warten, nicht zusätzlich zu den Nachfassaktionen des Workflows Erinnerungen erhalten.
:::

## Meine Karten

Ehrenamtliche und Mitarbeitende müssen nicht durch jede Tafel suchen, um ihre Arbeit zu finden. Die Liste **Meine Karten** auf der Seite **Meine Arbeit** zeigt jede Karte, die dem aktuellen Benutzer zugewiesen ist, über alle Workflows hinweg. Um dorthin zu gelangen, klicken Sie oben auf der Seite Workflows auf **Meine Karten** oder öffnen Sie im Sprungmenü **Dienst > Meine Arbeit**. Ein Klick auf eine Karte öffnet die Tafel, zu der sie gehört.

## Berichte

Öffnen Sie einen Workflow und klicken Sie auf **Berichte**, um Auswertungen für diesen Workflow zu sehen:

- **Überfällig** -- die Anzahl der Karten nach ihrem Fälligkeitsdatum.
- **Karten pro Schritt** -- wie viele Karten derzeit auf jedem Schritt liegen, als Säulendiagramm dargestellt.
- **Abgeschlossen (30 Tage)** -- Durchsatz der letzten 30 Tage, als Liniendiagramm dargestellt.

Nutzen Sie diese, um Engpässe zu erkennen -- etwa einen Schritt, in dem sich Karten stauen und nie weitergehen.

## Verwandte Artikel

- [Aufgaben](./tasks.md) -- die einzelnen Handlungsaufträge, aus denen Workflow-Karten bestehen
- [Formulare](../forms/index.md) -- Formulare erstellen, die Workflows auslösen können
- [Gruppen](../groups/index.md) -- die Gruppen, in die eine Aktion "Zur Gruppe hinzufügen" Personen einordnen kann
- [Dienstpläne](./plans.md) -- einen Bestätigungs-Workflow für die Dienstanfragen eines Plans wählen
- [Rollen & Berechtigungen](../settings/roles-permissions.md) -- steuern, wer Workflows ansehen, bearbeiten und verwalten darf
