---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows führen Personen auf einer visuellen Tafel durch eine Reihe von Schritten. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert – von der Nachbereitung für einen Erstgast über einen Mitgliedschaftsprozess bis zum Dankeschön für einen Erstspender und alles andere, bei dem Sie viele Personen durch dieselben Stufen verfolgen müssen. Ein Schritt kann eine Ehrenamtliche Person um etwas bitten (anrufen, ein Gespräch führen) **und** eigenständig automatische Aktionen ausführen – eine E-Mail oder SMS senden, ein paar Tage warten, die Person einer Gruppe hinzufügen. Workflows übernehmen so sowohl die persönliche Nachbereitung als auch die Routinearbeit drumherum. Workflows erweitern die [Aufgaben](./tasks.md) zu einer Kanban-Tafel mit Drag-and-Drop, damit niemand und nichts durch das Raster fällt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin vorhanden sind.
- Machen Sie sich damit vertraut, wie [Aufgaben](./tasks.md) funktionieren, denn jede Karte auf einer Tafel ist eine Aufgabe.
- Um die Aktion **E-Mail senden** zu verwenden, erstellen Sie zuerst die E-Mail-Vorlagen, die Sie versenden möchten (diese verwalten Sie unter **Einstellungen → E-Mail-Vorlagen**).
- Um die Aktion **SMS senden** zu verwenden, verbinden Sie zuerst einen [Anbieter für Textnachrichten](../settings/church-settings.md#texting).
- Sie benötigen die passende Berechtigung für Aufgaben. Anzeigen, Karten bearbeiten und Workflows verwalten sind getrennte Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md)).

</div>

## Workflows anzeigen

Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin), klappen Sie **Dienste** auf und klicken Sie auf **Workflows**. Ihre Workflows werden in einer Tabelle aufgelistet, mit ihrer **Kategorie** und ihrem **Status** (**Aktiv** oder **Inaktiv**). Wenn Sie Kategorien verwenden, können Sie die Liste über die Reiter oberhalb nach Kategorie filtern. Klicken Sie auf einen Workflow, um seine Tafel zu öffnen.

## Einen Workflow erstellen

1. Klicken Sie auf der Seite Workflows auf **Workflow hinzufügen**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Leerer Workflow** – von Grund auf neu beginnen und eigene Schritte aufbauen.
   - **Aus einer Vorlage** – mit einem fertigen Satz von Schritten beginnen, den Sie bearbeiten können. Zu den integrierten Vorlagen gehören:
     - **Nachbereitung für neue Besucher** – Willkommens-E-Mail senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftskurs** – Interesse bekunden → Für den Kurs anmelden → Kurs besuchen → Mitgliedschaft abschließen
     - **Dank an Erstspender** – Dankeskarte senden → Wirkung der Gabe teilen → Verwaltet
3. Geben Sie dem Workflow einen **Namen**.
4. Weisen Sie optional eine **Kategorie** zu, um zusammengehörige Workflows zu gruppieren. Sie können direkt im Auswahlmenü eine neue Kategorie anlegen.
5. Lassen Sie den Workflow auf **Aktiv**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inaktiv**, um ihn aus den Listen zum Hinzufügen auszublenden.
6. Klicken Sie auf **Speichern**.

:::tip
Verwenden Sie die Schaltfläche **Duplizieren** in der Liste der Workflows, um einen bestehenden Workflow – einschließlich seiner Schritte, automatischen Aktionen und Weiterleitungen – als Ausgangspunkt für einen neuen zu kopieren.
:::

## Die Tafel mit Schritten aufbauen

Jede Workflow-Tafel besteht aus **Schritten**, die von links nach rechts als Spalten angezeigt werden. Öffnen Sie einen Workflow und verwenden Sie **Schritt hinzufügen**, um jede Phase Ihres Prozesses anzulegen.

Beim Hinzufügen oder Bearbeiten eines Schritts können Sie folgendes festlegen:

- **Schrittname** – die Spaltenüberschrift (zum Beispiel „Willkommensanruf“ oder „Warten auf Anmeldung“).
- **Fällig in (Tagen)** – legt automatisch ein Fälligkeitsdatum fest, sobald eine Karte in diesen Schritt gelangt. Karten, deren Fälligkeitsdatum überschritten ist, werden als **Überfällig** markiert.
- **Standardzuständige Person** – die Person oder Gruppe, der neue Karten in diesem Schritt automatisch zugewiesen werden. Ist die Standardzuständige Person eine einzelne Person, erhält sie eine Benachrichtigung, dass ihr eine Karte zugewiesen wurde.
- **Automatische Aktionen** – Dinge, die das System selbstständig ausführt, sobald eine Karte ankommt (siehe unten).
- **Weiterleitung** – wohin die Karte gelangt, wenn sie den Schritt verlässt (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie die Schrittspalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge legt außerdem den Standardweg fest, den eine Karte nimmt, wenn keine andere Weiterleitung greift.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen gehören zum Schritt, daher werden diese Bereiche im Editor erst freigeschaltet, sobald der Schritt existiert.
:::

## Automatische Aktionen

Jeder Schritt kann eine Liste **automatischer Aktionen** enthalten. Diese laufen von selbst in dem Moment, in dem eine Karte den Schritt **betritt** – noch bevor jemand sie anfasst. So unterstützt ein Schritt sowohl eine Ehrenamtliche Person *als auch* übernimmt die Routinearbeit rund um die Nachbereitung.

Im Schritt-Editor öffnen Sie **Automatische Aktionen**, klicken auf **Aktion hinzufügen**, wählen einen Typ, füllen die Einstellungen aus und klicken auf das Speichern-Symbol dieser Aktion. Sie können beliebig viele hinzufügen; sie laufen **von oben nach unten in Reihenfolge** ab.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine E-Mail-Vorlage Ihrer Wahl. Sie können die Betreffzeile überschreiben. |
| **SMS senden** | Sendet der Person eine von Ihnen verfasste Nachricht über den [Anbieter für Textnachrichten](../settings/church-settings.md#texting) Ihrer Kirche. |
| **Warten** | Hält die Karte für eine Anzahl von Tagen an, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person einer [Gruppe](../groups/index.md) Ihrer Wahl hinzu. |
| **Aus Gruppe entfernen** | Entfernt die Person aus einer Gruppe Ihrer Wahl. |
| **Zum Workflow hinzufügen** | Startet für die Person einen anderen Workflow – nützlich, um zwischen Prozessen zu übergeben. |
| **Notiz hinzufügen** | Hält eine Notiz im Verlauf der Karte fest. |
| **Feld setzen** | Aktualisiert ein Feld im Personendatensatz: Mitgliedsstatus, Familienstand, Geschlecht, Ort, Bundesland oder Postleitzahl. |
| **Webhook** | Sendet die Angaben der Karte an eine externe Webadresse (URL), die Sie angeben, zur Anbindung an andere Systeme. |
| **Aufgabe erstellen** | Erstellt eine [Aufgabe](./tasks.md) mit dem Titel und der Beschreibung, die Sie eingeben, zugewiesen an die Person Ihrer Wahl. |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **bleibt die Karte in diesem Schritt**, damit eine Person sie bearbeiten kann – außer der Schritt besitzt eine automatische Weiterleitung, die sie weiterschiebt (siehe [Vollautomatische Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte über den regulären Ablauf ankommt – wenn sie zum ersten Mal hinzugefügt wird, wenn ein Ergebnis oder eine automatische Weiterleitung sie hereinbringt oder nachdem eine Wartezeit abgelaufen ist. Sie laufen **nicht** erneut, wenn ein Mitarbeitender eine Karte manuell auf den Schritt zieht oder zurückschickt. So erhält eine Person nicht dieselbe E-Mail zweimal.
:::

### E-Mails senden

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional eine eigene Betreffzeile ein. Sobald eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Hat die Person keine E-Mail-Adresse hinterlegt, überspringt der Schritt diese Aktion einfach.) [Platzhalter](../settings/email-templates.md#merge-fields) in der Vorlage, etwa `{{firstName}}`, werden mit den persönlichen Angaben der jeweiligen Person ausgefüllt.

:::info
Workflow-E-Mails werden nur versendet, nachdem Ihre Kirche die Freigabe für den Versand von Gruppen-E-Mails erhalten hat. Sie zählen außerdem zum täglichen E-Mail-Limit Ihrer Kirche. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Eine SMS senden {#sending-a-text}

Wählen Sie **SMS senden** und tippen Sie die **Textnachricht** ein (bis zu 1.600 Zeichen). Sobald eine Karte den Schritt betritt, erhält die Person diese SMS auf ihr Mobiltelefon. Sie können die Nachricht mit `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` persönlich gestalten. Diese Platzhalter werden beim Versand mit den Angaben der Person ersetzt.

- Ist für die Person keine Mobilnummer hinterlegt, wird keine SMS versendet, und der Verlauf der Karte vermerkt **SMS übersprungen: keine Mobilnummer**.
- Hat die Person sich abgemeldet, wird keine SMS versendet, und der Verlauf der Karte vermerkt **SMS übersprungen: abgemeldet**.
- Wenn die SMS versendet wird, vermerkt der Verlauf der Karte **SMS gesendet**. Schlägt der Versand fehl – etwa weil kein Anbieter für Textnachrichten verbunden ist oder Ihrer Kirche das Textguthaben ausgegangen ist –, wird der Fehler im Verlauf der Karte protokolliert, und die übrigen Aktionen des Schritts werden trotzdem ausgeführt.

:::warning
Textnachrichten werden über den eigenen [Anbieter für Textnachrichten](../settings/church-settings.md#texting) Ihrer Kirche versendet. Ist kein Anbieter verbunden, warnt der Aktionseditor mit *„Kein Anbieter für Textnachrichten eingerichtet“*, und es werden keine Nachrichten gesendet.
:::

### Ein paar Tage warten (Serien von Nachrichten)

Die Aktion **Warten** hält eine Karte für die von Ihnen festgelegte Anzahl von Tagen an. Während sie wartet, wird die Karte als **Zurückgestellt** angezeigt. B1 prüft alle 30 Minuten, ob Wartezeiten abgelaufen sind. Eine Karte wird daher innerhalb von etwa einer halben Stunde nach Ende der Wartezeit fortgesetzt. Wenn die Wartezeit vorbei ist:

1. Laufen alle **übrigen Aktionen desselben Schritts**. So können Sie eine Serie bauen wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden**.
2. Danach wandert die Karte weiter, falls der Schritt eine automatische Weiterleitung besitzt. Andernfalls bleibt sie im Schritt, bis eine Person sie übernimmt.

:::tip
Eine **Warten**-Aktion am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zurückzuhalten, bevor sie einer Ehrenamtlichen Person angezeigt wird – zum Beispiel *7 Tage warten, dann meldet sich ein Coach*.
:::

## Personen als Karten hinzufügen

Es gibt mehrere Wege, Personen auf eine Tafel zu bringen:

- **Von der Tafel aus** – Klicken Sie unten in einer Schrittspalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe wählen; dann wird jedes Mitglied der Gruppe als Karte hinzugefügt.
- **Von der Personenseite aus** – Verwenden Sie auf der Seite einer Person **Zum Workflow hinzufügen**, um sie in einen Workflow zu setzen.
- **Über die Personensuche** – Wählen Sie mehrere Personen aus und verwenden Sie die Sammelaktion **Zum Workflow hinzufügen**, um alle auf einmal hinzuzufügen.
- **Automatisch durch einen Auslöser** – Personen werden hinzugefügt, wenn etwas passiert, etwa eine Formularübermittlung oder eine Erstgabe (siehe [Auslöser](#triggers) unten).

## Mit der Tafel arbeiten

Öffnen Sie einen Workflow, um seine Tafel zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, und ein Fälligkeitsdatum oder Status-Chip (**Überfällig** oder **Zurückgestellt**). Eine Schrittspalte zeigt außerdem kleine Abzeichen für die automatischen Aktionen, die sie ausführt, und Hinweise zu ihrer Weiterleitung. So sehen Sie auf einen Blick, wie die Karten fließen.

- **Eine Karte verschieben** – Ziehen Sie eine Karte von einer Spalte zur nächsten, sobald die Person weiterkommt.
- **Eine Karte öffnen** – Doppelklicken Sie auf eine Karte (oder klicken Sie darauf), um die Detailschublade zu öffnen. Dort können Sie den Schritt ändern, die Karte neu zuweisen, Notizen hinzufügen und den bisherigen Verlauf prüfen.

In der Kartenschublade können Sie außerdem:

- die Karte einer anderen Person oder Gruppe **zuweisen**,
- die Karte für 1 Tag, 3 Tage oder 1 Woche **zurückstellen**, um ihr Fälligkeitsdatum vorübergehend auszublenden,
- **Zurücksenden** an den vorherigen Schritt oder **Überspringen** zum nächsten Schritt,
- **Zuständigkeit festpinnen** – behält dieselbe verantwortliche Person auf der Karte, auch wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte beim Wechsel in einen neuen Schritt der dortigen Standardzuständigen Person zugewiesen. Mit dem Festpinnen bleibt die aktuelle Person durchgehend verantwortlich.
- die Karte **abschließen**, um sie zu beenden, oder eine Schaltfläche für ein **Ergebnis** wählen, falls der Schritt Ergebnisse konfiguriert hat (siehe [Weiterleitung](#routing-cards-with-outcomes-and-conditions)),
- **Notizen hinzufügen** und die **Aktivität** der Karte einsehen – ein Protokoll der bereits gelaufenen automatischen Aktionen (gesendete E-Mails, Wartezeiten usw.).

Bei einer Karte zu einer Person zeigt die Schublade außerdem Mobilnummer und E-Mail-Adresse der Person als Links, über die Sie anrufen oder eine E-Mail schreiben können, sowie einen Link **Profil anzeigen**, sofern Sie die Berechtigung haben, Personen anzusehen. Die Person, der die Karte zugewiesen ist, sieht Telefonnummer und E-Mail-Adresse auch dann, wenn sie keinen Zugriff auf Personen hat.

Notizen werden mit der Karte gespeichert. Wer die Karte öffnen kann – einschließlich der Person oder Gruppe, der sie zugewiesen ist –, kann die Notizen lesen und eigene hinzufügen. Personen, die die Karte nicht öffnen können, sehen ihre Notizen nicht.

### Sammelaktionen

Markieren Sie die Kontrollkästchen mehrerer Karten, um sie gemeinsam zu bearbeiten. Eine Werkzeugleiste erscheint, mit der Sie für alle ausgewählten Karten gleichzeitig **Abschließen**, **Zurückstellen**, **Zuweisen** (neu zuordnen) oder **Verschieben nach…** einen anderen Schritt wählen können.

## Karten mit Ergebnissen und Bedingungen weiterleiten {#routing-cards-with-outcomes-and-conditions}

Die Weiterleitung legt fest, wohin eine Karte gelangt, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten der Weiterleitung zu konfigurieren.

### Ergebnis-Schaltflächen

Ergebnisse sind Schaltflächen in der Kartenschublade, wenn Sie eine Karte in diesem Schritt abschließen. Statt einer einzigen Schaltfläche **Abschließen** können Sie Auswahlmöglichkeiten wie „Einer Gruppe beigetreten“ oder „Kein Interesse“ anbieten. Jedes Ergebnis kann:

- die Karte zu **einem anderen Schritt** in diesem Workflow schicken,
- die Karte an einen **anderen Workflow übergeben**, oder
- die Karte **schließen**.

So kann eine einzige Entscheidung die Person auf verschiedene Wege führen.

### Automatische Weiterleitung (bedingt)

Automatische Weiterleitungen verschieben eine Karte weiter, **sobald sie einen Schritt betritt** (und nachdem die automatischen Aktionen beendet sind), ohne dass jemand klicken muss, sofern die Person die festgelegten Bedingungen erfüllt. Fügen Sie eine Weiterleitung hinzu, wählen Sie den Zielschritt und definieren Sie eine oder mehrere **Bedingungen** (zum Beispiel Standort, Alter oder Mitgliedsstatus einer Person). Textfelder können exakt oder mit **enthält**, **beginnt mit** oder **endet mit** verglichen werden. Eine Weiterleitung ohne Bedingungen trifft auf alle zu.

Kann die Prüfung der Bedingungen aus irgendeinem Grund nicht durchgeführt werden, gilt die Weiterleitung als nicht zutreffend. Die Karte bleibt dann im Schritt (oder folgt einer anderen zutreffenden Weiterleitung), statt festzuhängen.

:::info
Auf der Tafel zeigt jede Schrittspalte kleine Hinweise zu ihrer Weiterleitung – zum Beispiel eine Ergebnisbezeichnung oder „wenn zutrifft“, gefolgt von einem Pfeil zum Zielschritt oder Workflow.
:::

## Vollautomatische Schritte {#fully-automated-steps}

Sie können einen Schritt vollständig selbstständig ablaufen lassen, ohne dass jemand daran arbeitet. Geben Sie dem Schritt seine **automatischen Aktionen** und fügen Sie eine **automatische Weiterleitung** (ohne Bedingungen) zum nächsten Schritt hinzu. Sobald eine Karte den Schritt betritt, laufen die Aktionen, und die Weiterleitung schiebt die Karte sofort weiter – die Karte durchläuft den Schritt ohne Halt.

:::tip
Kombinieren Sie dies mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf“ weitergehen.* E-Mail und Timing übernimmt das System, und eine Ehrenamtliche Person sieht die Karte erst, wenn der persönliche Kontakt ansteht.
:::

## Auslöser {#triggers}

Auslöser fügen Personen automatisch zu einem Workflow hinzu, sobald etwas passiert, sodass Sie Karten nie von Hand hinzufügen müssen. Klicken Sie auf der Tafel eines Workflows auf den Reiter **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Ereignisauslöser

Sie werden ausgelöst, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur passende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** – z. B. jede Person hinzufügen, deren Status auf *Besucher* wechselt.
- **Spende · Erstellt** – z. B. eine Erstgabe oder eine größere Gabe in einen Dankes-Workflow aufnehmen (nach Betrag, Fonds oder Methode filtern).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Übermittelt** – fügt jede Person hinzu, die ein ausgewähltes Formular absendet (ideal für eine Karte „Ich bin neu“ oder „Kontakt“).

### Zeitauslöser

Sie laufen wiederkehrend – täglich, wöchentlich, monatlich oder jährlich – und prüfen dabei eine Reihe von Bedingungen. Nutzen Sie sie für zeitbasierte Kontakte, etwa *alle, deren Mitgliedschaftsjubiläum heute ist*, oder einen *monatlichen* Besuchskontakt.

Für jeden Auslöser können Sie außerdem festlegen:

- den **Startschritt**, auf dem die neue Karte landet (Standard ist der erste Schritt),
- **Nur einmal pro Person** – damit dieselbe Person durch den Auslöser nicht zweimal in den Workflow gelangt,
- **Aktiv** – den Auslöser ein- oder ausschalten, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen Auslöser **Formular · Übermittelt** mit der Vorlage **Nachbereitung für neue Besucher**, um Ihr „Kontaktkärtchen“ oder Formular „Ich bin neu“ in eine automatische Nachbereitungs-Pipeline zu verwandeln.
:::

## Meine Karten

Ehrenamtliche und Mitarbeitende müssen sich nicht durch jede Tafel wühlen, um ihre Arbeit zu finden. Die Liste **Meine Karten** auf der Seite **Meine Arbeit** zeigt jede Karte, die dem aktuellen Benutzer zugewiesen ist, über alle Workflows hinweg. Dorthin gelangen Sie über **Meine Karten** oben auf der Seite Workflows oder über **Dienste > Meine Arbeit** im Sprungmenü. Ein Klick auf eine Karte öffnet die Tafel, zu der sie gehört.

## Berichte

Öffnen Sie einen Workflow und klicken Sie auf **Berichte**, um Auswertungen für diesen Workflow zu sehen:

- **Überfällig** – die Anzahl der Karten, deren Fälligkeitsdatum überschritten ist.
- **Karten pro Schritt** – wie viele Karten derzeit in jedem Schritt liegen, als Säulendiagramm dargestellt.
- **Abgeschlossen (30 Tage)** – Durchsatz der letzten 30 Tage, als Liniendiagramm dargestellt.

Damit erkennen Sie Engpässe – etwa einen Schritt, in dem sich Karten stauen und nie weiterkommen.

## Verwandte Artikel

- [Aufgaben](./tasks.md) – die einzelnen Aktionspunkte, auf denen Workflow-Karten aufbauen
- [Formulare](../forms/index.md) – Formulare erstellen, die Workflows auslösen können
- [Gruppen](../groups/index.md) – die Gruppen, in die eine Aktion „Zur Gruppe hinzufügen“ Personen aufnehmen kann
- [Rollen & Berechtigungen](../settings/roles-permissions.md) – legt fest, wer Workflows anzeigen, bearbeiten und verwalten darf
