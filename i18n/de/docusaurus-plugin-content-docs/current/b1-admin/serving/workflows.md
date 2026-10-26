---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows führen Menschen über eine Reihe von Schritten auf einer visuellen Tafel. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert – von der Nachbetreuung eines Gastes beim ersten Besuch über einen Mitgliedschaftsprozess bis hin zu einem Dank an Erstspender und allem anderen, bei dem Sie viele Menschen durch dieselben Phasen verfolgen müssen. Ein Schritt kann eine ehrenamtliche Person bitten, etwas zu tun (anrufen, ein Gespräch führen) **und** eigenständig automatische Aktionen ausführen – eine E-Mail oder Textnachricht senden, ein paar Tage warten, die Person einer Gruppe hinzufügen. Workflows übernehmen daher sowohl die persönliche Nachbetreuung als auch die Routinearbeit drumherum. Workflows erweitern [Aufgaben](./tasks.md) zu einer Kanban-Tafel mit Drag-and-drop, damit niemand und nichts durchs Raster fällt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin vorhanden sind
- Machen Sie sich damit vertraut, wie [Aufgaben](./tasks.md) funktionieren, denn jede Karte auf einer Tafel ist eine Aufgabe
- Um die Aktion **E-Mail senden** zu nutzen, erstellen Sie zuerst die E-Mail-Vorlagen, die Sie verschicken möchten (verwaltet unter **Einstellungen → E-Mail-Vorlagen**)
- Um die Aktion **Text senden** zu nutzen, verbinden Sie zuerst einen [Texting-Anbieter](../settings/church-settings.md#texting)
- Sie benötigen die passende Berechtigung für Aufgaben. Anzeigen, Karten bearbeiten und Workflows verwalten sind getrennte Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Workflows anzeigen

Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Serving** auf und klicken Sie auf **Workflows**. Ihre Workflows werden in einer Tabelle aufgelistet, die jeweils die **Kategorie** und den **Status** (**Aktiv** oder **Inaktiv**) zeigt. Wenn Sie Kategorien verwenden, können Sie die Liste über Reiter oberhalb nach Kategorie filtern. Klicken Sie auf einen beliebigen Workflow, um seine Tafel zu öffnen.

## Einen Workflow erstellen

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Leerer Workflow** -- von Grund auf neu beginnen und Ihre eigenen Schritte erstellen.
   - **Aus einer Vorlage** -- mit einem vorgefertigten Satz von Schritten beginnen, den Sie bearbeiten können. Zu den integrierten Vorlagen gehören:
     - **Nachbetreuung neuer Besucher** -- Willkommens-E-Mail senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftskurs** -- Interesse bekunden → Für den Kurs anmelden → Kurs besuchen → Mitgliedschaft abschließen
     - **Dank an Erstspender** -- Dankesnotiz senden → Wirkung der Spende teilen → Bestärkt
     - **Bestätigung einer Dienstzuweisung** -- Anfrage senden und auf Antwort warten → Ehrenamtlichen zu unbeantworteter Anfrage anrufen (siehe [Bestätigung von Dienstzuweisungen](#serving-assignment-confirmations))

   Das Erstellen der Schritte einer Vorlage kann einen Moment dauern. Während dieser Zeit lautet die Schaltfläche **Workflow hinzufügen** **Wird erstellt...** und lässt sich nicht erneut anklicken, sodass keine Duplikate entstehen. Wenn etwas schiefgeht, zeigt die Seite die Meldung *„Der Workflow konnte nicht erstellt werden. Bitte versuchen Sie es erneut.“*
3. Geben Sie dem Workflow einen **Namen**.
4. Weisen Sie optional eine **Kategorie** zu, um zusammengehörige Workflows zu gruppieren. Im Dropdown können Sie direkt eine neue Kategorie anlegen.
   Bei einem leeren Workflow wählen Sie außerdem seinen **Workflow-Zweck**: **Nachbetreuung von Personen** (der übliche Fall) oder **Bestätigung einer Dienstzuweisung**. Der Zweck lässt sich nach dem Erstellen des Workflows nicht mehr ändern.
5. Lassen Sie den Workflow **Aktiv**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inaktiv**, um ihn aus den Listen zum Hinzufügen zu einem Workflow auszublenden.
6. Klicken Sie auf **Speichern**.

:::tip
Verwenden Sie die Schaltfläche **Duplizieren** in der Workflow-Liste, um einen bestehenden Workflow – einschließlich seiner Schritte, automatischen Aktionen und Weiterleitungen – als Ausgangspunkt für einen neuen zu kopieren.
:::

## Die Tafel mit Schritten aufbauen

Jede Workflow-Tafel besteht aus **Schritten**, die von links nach rechts als Spalten angezeigt werden. Öffnen Sie einen Workflow und verwenden Sie **Schritt hinzufügen**, um jede Phase Ihres Prozesses anzulegen.

Beim Hinzufügen oder Bearbeiten eines Schritts können Sie Folgendes konfigurieren:

- **Schrittname** -- die Spaltenüberschrift (zum Beispiel „Willkommensanruf“ oder „Warten auf Anmeldung“).
- **Fällig in (Tagen)** -- legt automatisch ein Fälligkeitsdatum fest, sobald eine Karte in diesen Schritt gelangt. Karten, deren Fälligkeitsdatum überschritten ist, werden als **Überfällig** markiert.
- **Standardzuständige Person** -- die Person oder Gruppe, der neue Karten dieses Schritts automatisch zugewiesen werden. Ist die Standardzuständigkeit eine Person, erhält sie eine Benachrichtigung, dass ihr eine Karte zugewiesen wurde.
- **Automatische Aktionen** -- Dinge, die das System selbstständig erledigt, sobald eine Karte eintrifft (siehe unten).
- **Weiterleitung** -- wohin die Karte wandert, wenn sie den Schritt verlässt (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie die Schrittspalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge legt außerdem den Standardweg fest, den eine Karte nimmt, wenn keine andere Weiterleitung greift.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen gehören zum Schritt, daher werden diese Bereiche im Editor erst freigeschaltet, sobald der Schritt existiert.
:::

## Automatische Aktionen

Jeder Schritt kann eine Liste **automatischer Aktionen** enthalten, die von selbst ausgeführt werden, sobald eine Karte den Schritt **betritt** – noch bevor jemand sie anfasst. So kann ein Schritt sowohl eine ehrenamtliche Person zum Handeln auffordern als auch die routinemäßige Arbeit rund um die Nachbetreuung übernehmen.

Öffnen Sie im Schritt-Editor den Bereich **Automatische Aktionen**, klicken Sie auf **Aktion hinzufügen**, wählen Sie einen Typ und füllen Sie seine Einstellungen aus. Fügen Sie so viele hinzu, wie Sie benötigen; sie werden **von oben nach unten in dieser Reihenfolge** ausgeführt. Klicken Sie auf **Speichern** beim Schritt, um den Schritt und alle seine Aktionen gemeinsam zu speichern. Das Entfernen einer Aktion über das Papierkorb-Symbol wirkt sofort.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine E-Mail-Vorlage Ihrer Wahl. Sie können die Betreffzeile überschreiben. |
| **Text senden** | Schickt der Person eine von Ihnen verfasste Nachricht über den [Texting-Anbieter](../settings/church-settings.md#texting) Ihrer Kirche. |
| **Warten** | Hält die Karte für eine bestimmte Anzahl Tage an, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person einer [Gruppe](../groups/index.md) Ihrer Wahl hinzu. |
| **Aus der Gruppe entfernen** | Entfernt die Person aus einer Gruppe Ihrer Wahl. |
| **Anwesenheit erfassen** | Markiert die Person als anwesend bei einem gerade laufenden Gottesdienstzeitpunkt einer Gruppe (siehe unten). |
| **Zu Workflow hinzufügen** | Startet die Person in einem anderen Workflow – nützlich für die Übergabe zwischen Prozessen. |
| **Notiz hinzufügen** | Trägt eine Notiz in den Verlauf der Karte ein. |
| **Feld setzen** | Aktualisiert ein Feld im Datensatz der Person: Mitgliedschaftsstatus, Familienstand, Geschlecht, Ort, Bundesland oder Postleitzahl. |
| **Webhook** | Sendet die Details der Karte an eine externe Webadresse (URL) Ihrer Wahl, um andere Systeme anzubinden. |
| **Aufgabe erstellen** | Erstellt eine [Aufgabe](./tasks.md) mit dem Titel und der Beschreibung, die Sie eingeben, zugewiesen an die Person Ihrer Wahl. |
| **Person benachrichtigen** | Sendet einer Mitarbeitenden Person oder einem Ehrenamtlichen Ihrer Wahl eine E-Mail und eine B1-Benachrichtigung zur Karte (siehe unten). |

Sobald alle Aktionen eines Schritts abgeschlossen sind, **bleibt die Karte bei diesem Schritt**, damit eine Person sie bearbeiten kann – es sei denn, der Schritt hat eine automatische Weiterleitung, die sie weiterschiebt (siehe [Vollautomatische Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte über den normalen Ablauf eintrifft – wenn sie zum ersten Mal hinzugefügt wird, wenn eine Ergebnis- oder automatische Weiterleitung sie hereinbringt oder nachdem eine Wartezeit abgelaufen ist. Sie werden **nicht** erneut ausgeführt, wenn eine Mitarbeitende Person eine Karte manuell auf den Schritt zieht oder sie zurückschickt, damit eine Person nicht dieselbe E-Mail zweimal erhält.
:::

### E-Mails senden

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional eine eigene Betreffzeile ein. Sobald eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Ist für die Person keine E-Mail-Adresse hinterlegt, überspringt der Schritt diese Aktion einfach.) [Platzhalter](../settings/email-templates.md#merge-fields) in der Vorlage, etwa `{{firstName}}`, werden mit den persönlichen Daten der Person ausgefüllt.

Wenn die E-Mail versendet wird, vermerkt der Verlauf der Karte **E-Mail gesendet**. Kann sie nicht versendet werden – etwa weil die E-Mail Ihrer Kirche noch nicht freigegeben wurde oder das tägliche Limit erreicht ist –, wird kein Eintrag „E-Mail gesendet“ hinzugefügt.

:::info
Workflow-E-Mails werden nur versendet, nachdem Ihre Kirche für den Versand von Gruppen-E-Mails freigegeben wurde, und sie zählen auf das tägliche E-Mail-Limit Ihrer Kirche. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Die Aktion **E-Mail senden** warnt Sie im Schritt-Editor, wenn diese E-Mails nicht versendet werden: *„Die E-Mail Ihrer Kirche wurde noch nicht freigegeben...“*, falls die Freigabe noch aussteht, oder *„Die E-Mail Ihrer Kirche ist pausiert...“*, falls kürzlich Nachrichten zurückgewiesen oder als Spam gemeldet wurden.
:::

### Anwesenheit erfassen

Wählen Sie **Anwesenheit erfassen** und klicken Sie auf **Gruppe wählen**, um die Gruppe auszuwählen, deren Anwesenheit erfasst werden soll. Wenn die Aktion ausgeführt wird, wird die Person für den gerade laufenden Gottesdienstzeitpunkt dieser Gruppe als anwesend markiert – genauso, als hätte sie sich eingecheckt. Das ist nützlich zusammen mit einem Auslöser, der Personen beim Eintreffen zum Workflow hinzufügt, sodass sie ohne separaten Check-in gezählt werden.

- Die Anwesenheit wird zum Zeitpunkt der **Erstellung** der Karte gemessen, sodass eine **Warten**-Aktion weiter vorne im Workflow sie nicht über den Gottesdienst hinausschiebt.
- Nur Gottesdienstzeiten mit Wochentag und Startzeit zählen. Läuft zu diesem Zeitpunkt keiner der Gottesdienste der Gruppe, wird nichts erfasst, und der Verlauf der Karte vermerkt **Kein Gottesdienst läuft gerade – Anwesenheit nicht erfasst**.
- Wenn Anwesenheit erfasst wird, zeigt der Verlauf der Karte **Anwesenheit erfasst** gefolgt vom Namen der Gruppe. Wird die Aktion für denselben Gottesdienst erneut ausgeführt, zählt die Person nicht doppelt.

### Eine Person benachrichtigen

Wählen Sie **Person benachrichtigen**, klicken Sie auf **Person wählen** und geben Sie optional eine **Nachricht** ein. Sobald eine Karte den Schritt betritt, erhält diese Person eine E-Mail und eine B1-Benachrichtigung mit dem Namen der Person auf der Karte, den Namen des Workflows und des Schritts, Ihrer Nachricht und einem Link zum Öffnen der Karte. Damit geben Sie einer Mitarbeitenden Person oder einer Leitung im Dienst einen Hinweis – zum Beispiel *„Den Pastor benachrichtigen, wenn jemand den Schritt Mitgliedschaftsgespräch erreicht.“* Der Verlauf der Karte vermerkt **Benachrichtigt** gefolgt vom Namen der Person.

### Eine Textnachricht senden

Wählen Sie **Text senden** und geben Sie die **Textnachricht** ein (bis zu 1.600 Zeichen). Sobald eine Karte den Schritt betritt, erhält die Person diesen Text auf ihrem Mobiltelefon. Sie können die Nachricht mit `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` personalisieren; diese werden beim Versand mit den Daten der Person ausgefüllt.

- Ist für die Person keine Mobilnummer hinterlegt, wird kein Text gesendet, und der Verlauf der Karte vermerkt **Text übersprungen: keine Mobilnummer**.
- Hat die Person sich abgemeldet, wird kein Text gesendet, und der Verlauf der Karte vermerkt **Text übersprungen: abgemeldet**.
- Wenn der Text versendet wird, vermerkt der Verlauf der Karte **Text gesendet**. Schlägt der Versand fehl – etwa weil kein Texting-Anbieter verbunden ist oder Ihrer Kirche die Textguthaben ausgegangen sind –, wird der Fehler im Verlauf der Karte protokolliert, und die übrigen Aktionen des Schritts werden trotzdem ausgeführt.

:::warning
Texte werden über den eigenen [Texting-Anbieter](../settings/church-settings.md#texting) Ihrer Kirche versendet. Ist kein Anbieter verbunden, warnt der Aktions-Editor mit *„Es ist kein Texting-Anbieter eingerichtet“*, und Texte werden nicht versendet.
:::

### Mehrere Tage warten (Drip-Sequenzen)

Die Aktion **Warten** hält eine Karte für die Anzahl an Tagen, die Sie festlegen. Während sie wartet, wird die Karte als **Zurückgestellt** angezeigt. B1 prüft alle 30 Minuten, ob Wartezeiten abgelaufen sind, sodass eine Karte innerhalb von etwa einer halben Stunde nach Ende der Wartezeit weitergeht. Nach Ablauf der Wartezeit:

1. Laufen alle **übrigen Aktionen im selben Schritt** – so können Sie eine Drip-Sequenz wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden** aufbauen.
2. Danach wandert die Karte weiter, falls der Schritt eine automatische Weiterleitung hat; andernfalls bleibt sie beim Schritt, damit eine Person sie übernehmen kann.

:::tip
Eine **Warten**-Aktion am allerersten Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte „festzuhalten“, bevor sie einer ehrenamtlichen Person angezeigt wird – zum Beispiel *7 Tage warten, dann meldet sich ein Coach*.
:::

## Personen als Karten hinzufügen

Es gibt mehrere Möglichkeiten, Personen auf eine Tafel zu bringen:

- **Von der Tafel aus** -- Klicken Sie unten in einer Schrittspalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe wählen; dann wird jedes Mitglied dieser Gruppe als Karte hinzugefügt.
- **Aus dem Datensatz einer Person** -- Verwenden Sie **Zu Workflow hinzufügen** auf der Seite einer Person, um sie einem Workflow zuzuordnen.
- **Aus der Personensuche** -- Wählen Sie mehrere Personen aus und verwenden Sie die Sammelaktion **Zu Workflow hinzufügen**, um sie alle auf einmal hinzuzufügen.
- **Automatisch mit einem Auslöser** -- Fügen Sie Personen hinzu, wenn etwas geschieht, etwa eine Formulareinsendung oder eine erste Spende (siehe unten [Auslöser](#triggers)).

## Mit der Tafel arbeiten

Öffnen Sie einen Workflow, um seine Tafel zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, und einen Fälligkeits- oder Statuschip (**Überfällig** oder **Zurückgestellt**). Eine Schrittspalte zeigt außerdem kleine Abzeichen für automatische Aktionen, die sie ausführt, sowie Anmerkungen zu ihrer Weiterleitung. So sehen Sie auf einen Blick, wie Karten fließen.

- **Eine Karte verschieben** -- Ziehen Sie eine Karte von einer Spalte in die nächste, sobald die Person weiterkommt.
- **Eine Karte öffnen** -- Doppelklicken Sie auf eine Karte (oder klicken Sie sie an), um ihr Detailfenster zu öffnen. Dort können Sie den Schritt ändern, die Zuständigkeit neu vergeben, Notizen hinzufügen und sehen, was bereits passiert ist.

Im Kartenfenster können Sie außerdem:

- Die Karte einer anderen Person oder Gruppe **zuweisen**.
- Die Karte für 1 Tag, 3 Tage oder 1 Woche **zurückstellen**, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- Zum vorherigen Schritt **zurücksenden** oder zum nächsten Schritt **überspringen**.
- **Zuständigkeit fixieren** -- behält dieselbe Zuständigkeit für die Karte, auch wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte beim Wechsel in einen neuen Schritt der Standardzuständigkeit dieses Schritts zugewiesen; das Fixieren hält die aktuelle Person durchgehend verantwortlich.
- Die Karte **abschließen**, um sie zu beenden, oder eine **Ergebnis**-Schaltfläche wählen, falls für den Schritt Ergebnisse konfiguriert sind (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).
- **Notizen hinzufügen** und die **Aktivität** der Karte einsehen – ein Protokoll der ausgeführten automatischen Aktionen (gesendete E-Mails, Wartezeiten usw.), jeweils mit Datum und Uhrzeit.

Bei einer Karte zu einer Person zeigt das Fenster außerdem Mobilnummer und E-Mail dieser Person als Links, über die Sie anrufen oder eine E-Mail schreiben können, sowie einen Link **Profil anzeigen**, sofern Sie die Berechtigung haben, Personen anzusehen. Die Person, der eine Karte zugewiesen ist, sieht Telefonnummer und E-Mail auch dann, wenn sie keinen Zugriff auf Personen hat.

Notizen werden mit der Karte gespeichert. Wer die Karte öffnen kann – einschließlich der Person oder Gruppe, der sie zugewiesen ist –, kann die Notizen lesen und eigene hinzufügen. Personen, die die Karte nicht öffnen können, sehen ihre Notizen nicht.

### Sammelaktionen

Wählen Sie die Kontrollkästchen mehrerer Karten aus, um sie gemeinsam zu bearbeiten. Um auf einmal jede Karte eines Schritts auszuwählen, aktivieren Sie das Kontrollkästchen **Alle auswählen** in der Kopfzeile der Schrittspalte; erneutes Anklicken hebt die Auswahl wieder auf. Eine Werkzeugleiste erscheint, mit der Sie für alle ausgewählten Karten gemeinsam **Abschließen**, **Zurückstellen**, **Zuweisen** (neu zuordnen) oder **Verschieben nach…** einen anderen Schritt ausführen können.

## Weiterleitung mit Ergebnissen und Bedingungen

Die Weiterleitung legt fest, wohin eine Karte wandert, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten der Weiterleitung zu konfigurieren.

### Ergebnis-Schaltflächen

Ergebnisse sind Schaltflächen, die im Kartenfenster angezeigt werden, wenn Sie eine Karte in diesem Schritt abschließen. Statt einer einzigen Schaltfläche **Abschließen** können Sie Auswahlmöglichkeiten wie „Einer Gruppe beigetreten“ oder „Kein Interesse“ anbieten. Jedes Ergebnis kann:

- Die Karte an **einen anderen Schritt** in diesem Workflow senden,
- die Karte vollständig an einen **anderen Workflow übergeben**, oder
- die Karte **schließen**.

So kann eine Entscheidung eine Person auf unterschiedliche Wege führen.

### Automatische Weiterleitung (bedingt)

Automatische Weiterleitungen bewegen eine Karte weiter, **sobald sie einen Schritt betritt** (und nachdem ihre automatischen Aktionen abgeschlossen sind), ohne dass jemand klicken muss – sofern die Person eine Reihe von Bedingungen erfüllt. Fügen Sie eine Weiterleitung hinzu, wählen Sie den Zielschritt und definieren Sie eine oder mehrere **Bedingungen** (zum Beispiel Standort, Alter oder Mitgliedschaftsstatus einer Person). Textfelder können exakt oder mit **enthält**, **beginnt mit** oder **endet mit** verglichen werden. Eine Weiterleitung ohne Bedingungen trifft auf alle zu.

Datumsbedingungen (Heutiges Datum, Geburtsdatum oder Jahrestag) können das vollständige Datum oder nur einen Teil davon vergleichen – den Wochentag, den **Tag des Monats**, den **Monat** oder die vergangenen Jahre. Bei Geburtsdatum oder Jahrestag einer Person bietet **Tag des Monats** die relative Option **Heute**, sodass eine Bedingung wie *Geburtsdatum · Tag des Monats = Heute* auf Personen passt, deren Geburtstag auf den heutigen Tag des Monats fällt. **Monat** bietet **Vormonat**, **Aktueller Monat** und **Nächster Monat**. Solche relativen Werte werden anhand der Zeitzone Ihrer Kirche berechnet, sodass sie mit dem Kalendertag Ihrer Kirche übereinstimmen und nicht mit der Serverzeit.

Lässt sich eine Bedingung einer Weiterleitung aus irgendeinem Grund nicht prüfen, gilt diese Weiterleitung als nicht zutreffend. Die Karte bleibt im Schritt (oder folgt einer anderen zutreffenden Weiterleitung), statt festzuhängen.

:::info
Auf der Tafel zeigt jede Schrittspalte kleine Anmerkungen zu ihrer Weiterleitung – zum Beispiel eine Ergebnisbezeichnung oder „wenn zutreffend“ gefolgt von einem Pfeil zum Zielschritt oder Zielworkflow.
:::

## Vollautomatische Schritte

Sie können einen Schritt vollständig selbstständig laufen lassen, ohne dass sich jemand damit befasst. Geben Sie dem Schritt seine **automatischen Aktionen** und fügen Sie eine **automatische Weiterleitung** (ohne Bedingungen) hinzu, die auf den nächsten Schritt zeigt. Sobald eine Karte eintrifft, laufen die Aktionen, und dann schiebt die Weiterleitung sie sofort weiter – die Karte durchläuft den Schritt direkt.

:::tip
Kombinieren Sie dies mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf“ weitergehen.* E-Mail und Timing übernimmt das System für Sie, und eine ehrenamtliche Person sieht die Karte erst, wenn es Zeit für den persönlichen Kontakt ist.
:::

## Auslöser

Auslöser fügen Personen automatisch einem Workflow hinzu, wenn etwas geschieht, sodass Sie nie Karten von Hand anlegen müssen. Klicken Sie auf der Tafel eines Workflows auf den Reiter **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Ereignisauslöser

Werden ausgelöst, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur passende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** -- z. B. jede Person hinzufügen, deren Status zu *Besucher* oder *Gast* wird (der Status für Personen, die sich selbst registrieren).
- **Spende · Erstellt** -- z. B. eine erste oder hohe Spende einem Dankes-Workflow hinzufügen (Abgleich nach Betrag, Fonds oder Zahlungsart).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** -- fügt jede Person hinzu, die ein ausgewähltes Formular absendet (ideal für eine Karte „Ich bin neu“ oder „Kontakt“).

### Zeitauslöser

Laufen wiederkehrend – täglich, wöchentlich, monatlich oder jährlich – anhand einer Reihe von Bedingungen. Verwenden Sie sie für zeitgesteuerte Kontaktaufnahme, etwa *alle, deren Geburtstag heute ist* (Geburtsdatum · Tag des Monats = **Heute**, mit dem Monat auf **Aktueller Monat**) oder einen *monatlichen* Check-in. Selbst ohne **Nur einmal pro Person** fügt ein Zeitauslöser dieselbe Person innerhalb eines Wiederholungszeitraums nicht erneut hinzu (ein Tag, eine Woche, ein Monat oder ein Jahr – je nachdem, wie oft er läuft).

Für jeden Auslöser können Sie außerdem festlegen:

- Den **Startschritt**, auf dem die neue Karte landet (Standard ist der erste Schritt).
- **Nur einmal pro Person** -- damit dieselbe Person durch den Auslöser nicht zweimal in den Workflow gelangt. Ist dies aktiviert, werden alle übersprungen, die bereits eine Karte in diesem Workflow haben.
  - **Erneut hinzufügen, nachdem ihre Karte geschlossen wurde** -- erscheint, wenn **Nur einmal pro Person** aktiviert ist. Aktivieren Sie es, damit der Auslöser eine Person erneut hinzufügen kann, sobald ihre frühere Karte in diesem Workflow geschlossen ist. Eine Person hat trotzdem nie gleichzeitig zwei offene Karten im Workflow. Verwenden Sie dies für Dinge, die mehr als einmal vorkommen können, etwa einen wiederkehrenden Gast oder einen jährlichen Prozess.
- **Aktiv** -- schaltet den Auslöser ein oder aus, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen Auslöser **Formular · Eingereicht** mit der Vorlage **Nachbetreuung neuer Besucher**, um Ihr „Connect Card“- oder „Ich bin neu“-Formular in eine automatische Nachbetreuungskette zu verwandeln.
:::

## Bestätigung von Dienstzuweisungen

Eine besondere Art von Workflow kann [Dienstanfragen](./plans.md#assigning-team-members) nachverfolgen, bis jede Ehrenamtliche bzw. jeder Ehrenamtliche zusagt oder absagt. Statt Personen verfolgt jede Karte auf dieser Tafel **eine Zuweisung** – eine Person in einer Position bei einem Plan. Zwei Rollen oder zwei Gottesdienste für dieselbe Person ergeben getrennte Karten. Dies ist eine Option, die Sie aktiv wählen: Für einen Plan ändert sich nichts, bis Sie in seinen Einstellungen einen Bestätigungs-Workflow auswählen.

### Einrichtung

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen** und wählen Sie die Vorlage **Bestätigung einer Dienstzuweisung**. (Oder beginnen Sie mit einem **Leeren Workflow** und setzen Sie dessen **Workflow-Zweck** auf **Bestätigung einer Dienstzuweisung**.) Das Erstellen aus der Vorlage erfordert die Berechtigung zum Senden von Texten, da sie einen Textschritt enthält.
2. Prüfen Sie die Schritte. Die Vorlage beginnt mit:
   - **Dienstanfrage senden und auf Antwort warten** -- sendet die Dienstanfrage per E-Mail und Text, wartet 2 Tage, sendet eine Erinnerungs-E-Mail, wartet einen weiteren Tag und bewegt die Karte dann automatisch weiter.
   - **Ehrenamtlichen zu unbeantworteter Anfrage anrufen** -- ein Schritt, in dem eine Person den Ehrenamtlichen anruft, fällig in 1 Tag. Legen Sie in diesem Schritt eine **Standardzuständige Person** fest. Ist keine hinterlegt, geht die Karte an die Leitung des Dienstes oder, falls es keine gibt, an das Dienstteam.
3. Passen Sie Wartezeiten, Nachrichten und Schritte an Ihre Kirche an.
4. Öffnen Sie die [Einstellungen eines Plans](./plans.md#plan-settings) und wählen Sie diesen Workflow unter **Bestätigungs-Workflow**.

Diese Workflows verwenden die Aktion **Dienstanfrage senden** statt **E-Mail senden** und **Text senden**. Wählen Sie **E-Mail** oder **Textnachricht** und schreiben Sie optional eine **Anfragenachricht**. Die Anfrage enthält immer die Rolle, den Plan, das Gottesdienstdatum und einen Link zur Antwort; in Ihrer Nachricht können Sie `{{planName}}`, `{{positionName}}` und `{{serviceDate}}` verwenden. Lassen Sie die Nachricht leer, um die Standardanfrage zu verwenden. Benachrichtigungseinstellungen der Ehrenamtlichen, deren Zustimmung zu Texten, Ihr Texting-Anbieter und die E-Mail-Freigabe Ihrer Kirche gelten alle, und jeder übersprungene oder blockierte Versuch wird auf der Karte vermerkt. **E-Mail senden**, **Text senden** und **Zu Workflow hinzufügen** stehen auf diesen Tafeln nicht zur Verfügung.

Der Reiter **Auslöser** eines Bestätigungs-Workflows erklärt, wie Karten gestartet werden, anstatt Auslöser anzubieten, und diese Workflows erscheinen nicht in den Listen **Zu Workflow hinzufügen** für Personen.

### Wie Karten gestartet und geschlossen werden

- Karten werden gestartet, wenn Sie Ehrenamtliche auf einem veröffentlichten Plan **benachrichtigen** (siehe [Ehrenamtliche benachrichtigen](./plan-validation.md#notifying-volunteers)). Jede neue, unbeantwortete Zuweisung erhält genau eine Karte. Speichern, Veröffentlichen, Kopieren oder automatisches Befüllen eines Plans kontaktiert von selbst niemanden, und vorgemerkte Pläne versenden nichts.
- Ehrenamtliche erhalten weiterhin die übliche In-App-Benachrichtigung. Die E-Mail- und Textnachfassung stammt vom Workflow.
- Wenn der Ehrenamtliche **zusagt oder absagt**, wird seine Karte automatisch geschlossen, zusammen mit allen damit verknüpften Nachfassaufgaben.
- Das Kartenfenster zeigt die Position, das Gottesdienstdatum und einen Link zum Plan. Statt **Abschließen** lautet die Schaltfläche **Nachfassen erledigt**. Ein Klick darauf vermerkt, dass jemand nachgefasst hat, aber die Karte bleibt offen und zugewiesen (angezeigt als **Warten auf Antwort**), bis der Ehrenamtliche antwortet oder die Antwortfrist abläuft.
- Die Antwortfrist ist das Ende des letzten Gottesdienstzeitpunkts, in dem das Team der Position dient. Hat der Plan keine passenden Zeiten, endet die Frist am Ende des Gottesdiensttages. Hat bis dahin niemand geantwortet, wird die Karte mit **Antwortfrist abgelaufen** geschlossen, und eine Aufgabe **Unbeantwortete Dienstanfrage prüfen** geht an die aktuelle Zuständige Person der Karte oder an die Leitung des Dienstes, damit jemand entscheiden kann, wie die Stelle besetzt wird. Die Zuweisung bleibt **unbestätigt**.
- Das Entfernen der Zuweisung, das Ändern ihrer Person, Position oder des Plandatums, das Zurücksetzen des Plans auf vorgemerkt oder das Umschalten des Plans auf einen anderen Bestätigungs-Workflow schließt die Karte. Eine geschlossene Karte wird durch ein weiteres **Benachrichtigen** nie wieder geöffnet; fügen Sie eine neue Zuweisung hinzu, um eine frische Anfrage zu senden.

:::info
Bei Anfragen, die über einen Bestätigungs-Workflow gesendet wurden, gehen [Erinnerungen an Ehrenamtliche](./plans.md#volunteer-reminders) nur an Ehrenamtliche, die **zugesagt** haben, damit Personen, die noch auf eine Antwort warten, nicht zusätzlich zu den Nachfassungen des Workflows Erinnerungen erhalten.
:::

## Meine Karten

Ehrenamtliche und Mitarbeitende müssen nicht durch jede Tafel blättern, um ihre Aufgaben zu finden. Die Liste **Meine Karten** auf der Seite **Meine Arbeit** zeigt jede Karte, die dem aktuellen Benutzer zugewiesen ist, über alle Workflows hinweg. Um dorthin zu gelangen, klicken Sie oben auf der Seite Workflows auf **Meine Karten** oder öffnen Sie im Sprungmenü **Serving > Meine Arbeit**. Ein Klick auf eine Karte öffnet die Tafel, zu der sie gehört.

## Berichte

Öffnen Sie einen Workflow und klicken Sie auf **Berichte**, um Auswertungen für diesen Workflow zu sehen:

- **Überfällig** -- die Anzahl der Karten, deren Fälligkeitsdatum überschritten ist.
- **Karten pro Schritt** -- wie viele Karten derzeit in jedem Schritt liegen, als Säulendiagramm dargestellt.
- **Abgeschlossen (30 Tage)** -- der Durchsatz der letzten 30 Tage, als Liniendiagramm dargestellt.

Nutzen Sie diese Werte, um Engpässe zu erkennen – etwa einen Schritt, in dem sich Karten stapeln und nie weiterkommen.

## Verwandte Artikel

- [Aufgaben](./tasks.md) -- die einzelnen Aktionspunkte, auf denen Workflow-Karten aufbauen
- [Formulare](../forms/index.md) -- erstellen Sie die Formulare, die Workflows auslösen können
- [Gruppen](../groups/index.md) -- die Gruppen, in die eine Aktion „Zur Gruppe hinzufügen“ Personen aufnehmen kann
- [Gottesdienstpläne](./plans.md) -- wählen Sie einen Bestätigungs-Workflow für die Dienstanfragen eines Plans
- [Rollen & Berechtigungen](../settings/roles-permissions.md) -- legen Sie fest, wer Workflows anzeigen, bearbeiten und verwalten darf
