---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows bewegen Personen durch eine Reihe von Schritten auf einer visuellen Tafel. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert – von der Verfolgung von Ersttäufigen bis hin zu einem Mitgliedschaftsprozess, von Dankesschreiben an Ersttäter bis hin zu allem anderen, bei dem Sie viele Menschen durch denselben Satz von Stufen verfolgen müssen. Ein Schritt kann einen Freiwilligen auffordern, etwas zu tun (einen Anruf zu tätigen, ein Gespräch zu führen) **und** automatisierte Aktionen auf eigene Faust ausführen – eine E-Mail oder SMS senden, ein paar Tage warten, die Person zu einer Gruppe hinzufügen – damit Workflows sowohl die menschliche Verfolgung als auch die damit verbundene Routinearbeit übernehmen. Workflows erweitern [Tasks](./tasks.md) in ein Drag-and-Drop-Kanban-Board, damit nichts und niemand verloren geht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin existieren
- Machen Sie sich vertraut, wie [Tasks](./tasks.md) funktionieren, da jede Karte auf der Tafel eine Task ist
- Um die **E-Mail senden** Aktion zu verwenden, erstellen Sie zunächst die E-Mail-Vorlagen, die Sie senden möchten (verwaltet unter **Messaging → Manage Templates**)
- Um die **Text senden** Aktion zu verwenden, verbinden Sie zuerst einen [Texting-Anbieter](../settings/church-settings.md#texting)
- Sie benötigen die entsprechende Tasks-Berechtigung. Das Anzeigen, Bearbeiten von Karten und das Verwalten von Workflows sind separate Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Workflows anzeigen

Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), erweitern Sie **Serving** und klicken Sie auf **Workflows**. Sie sehen Ihre Workflows aufgelistet und nach Kategorie gruppiert, wobei aktive Workflows hervorgehoben werden. Klicken Sie auf einen Workflow, um sein Board zu öffnen.

## Einen Workflow erstellen

1. Klicken Sie auf der Workflows-Seite auf **Add Workflow**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Blank workflow** – von Grund auf beginnen und Ihre eigenen Schritte erstellen.
   - **From a template** – mit einem vorgefertigten Satz von Schritten beginnen, den Sie bearbeiten können. Integrierte Vorlagen sind:
     - **New Visitor Follow-up** – Willkommens-E-Mail senden → Persönlicher Telefonanruf → Zu nächstem Schritt einladen → Verbunden
     - **Membership Class** – Interesse bekunden → Sich für Klasse anmelden → Klasse besuchen → Mitgliedschaft abschließen
     - **First-time Giver Thank-you** – Dankesschreiben senden → Auswirkungen von Spenden teilen → Verwaltet
3. Geben Sie dem Workflow einen **Namen**.
4. Weisen Sie optional eine **Category** zu, um verwandte Workflows zu gruppieren. Sie können eine neue Kategorie direkt in der Dropdown-Liste erstellen.
5. Lassen Sie den Workflow **Active**, damit Personen hinzugefügt werden können, oder stellen Sie ihn auf **Inactive**, um ihn aus den Add-to-Workflow-Listen auszublenden.
6. Klicken Sie auf **Save**.

:::tip
Verwenden Sie die **Duplicate**-Schaltfläche in der Workflows-Liste, um einen vorhandenen Workflow zu kopieren – einschließlich seiner Schritte, automatisierten Aktionen und Routing – als Ausgangspunkt für einen neuen.
:::

## Die Tafel mit Schritten erstellen

Jedes Workflow-Board besteht aus **Schritten**, die als Spalten von links nach rechts angezeigt werden. Öffnen Sie einen Workflow und verwenden Sie **Add Step**, um jede Stufe Ihres Prozesses zu erstellen.

Wenn Sie einen Schritt hinzufügen oder bearbeiten, können Sie Folgendes konfigurieren:

- **Step Name** – die Spaltenüberschrift (z. B. "Welcome Call" oder "Awaiting Registration").
- **Due in (days)** – legt automatisch ein Fälligkeitsdatum fest, wenn eine Karte diesen Schritt betritt. Karten, deren Fälligkeitsdatum überschritten ist, werden als **Overdue** gekennzeichnet.
- **Default assignee** – die Person oder Gruppe, der neue Karten in diesem Schritt automatisch zugewiesen werden.
- **Automated actions** – Dinge, die das System von selbst tut, wenn eine Karte ankommt (siehe unten).
- **Routing** – wohin die Karte geht, wenn sie den Schritt verlässt (siehe [Routing](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie Schrittsspalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge definiert auch den Standardpfad, den eine Karte nimmt, wenn kein anderes Routing gilt.

:::info
Speichern Sie zunächst einen neuen Schritt. Automatisierte Aktionen und Routing sind an den Schritt gebunden, daher werden diese Abschnitte entsperrt, sobald der Schritt vorhanden ist.
:::

## Automatisierte Aktionen

Jeder Schritt kann eine Liste von **automatisierten Aktionen** tragen, die sich selbst ausführen, in dem Moment, in dem eine Karte **in den Schritt eintritt** – bevor jemand sie anrührt. Auf diese Weise können Sie in einem Schritt sowohl einen Freiwilligen auffordern *als auch* die Routinearbeit um die Verfolgung übernehmen.

Öffnen Sie im Schritt-Editor **Automated actions**, klicken Sie auf **Add Action**, wählen Sie einen Typ, füllen Sie seine Einstellungen aus und klicken Sie auf das Speichersymbol für diese Aktion. Fügen Sie so viele hinzu, wie Sie benötigen; sie werden **von oben nach unten der Reihe nach** ausgeführt.

| Action | Was es tut |
|---|---|
| **Send email** | Sendet der Person eine E-Mail-Vorlage, die Sie auswählen. Sie können die Betreffzeile überschreiben. |
| **Send text** | Sendet der Person eine von Ihnen geschriebene Nachricht per Text über den [Texting-Anbieter](../settings/church-settings.md#texting) Ihrer Kirche. |
| **Wait** | Pausiert die Karte für eine bestimmte Anzahl von Tagen, bevor sie fortfährt (siehe unten). |
| **Add to group** | Fügt die Person zu einer [Gruppe](../groups/index.md) hinzu, die Sie auswählen. |
| **Remove from group** | Entfernt die Person aus einer Gruppe, die Sie auswählen. |
| **Add to workflow** | Startet die Person auf einem anderen Workflow – nützlich für die Übergabe zwischen Prozessen. |
| **Add note** | Notiert sich eine Notiz in der Verlaufshistorie der Karte. |
| **Set field** | Aktualisiert ein Feld in der Personenakte: Membership Status, Marital Status, Gender, City, State oder Zip. |
| **Webhook** | Sendet die Details der Karte an eine externe Web-Adresse (URL), die Sie bereitstellen, um eine Verbindung zu anderen Systemen herzustellen. |
| **Create task** | Erstellt eine [Task](./tasks.md) mit dem Titel und der Beschreibung, die Sie eingeben, zugewiesen an die Person, die Sie auswählen. |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **ruht die Karte auf diesem Schritt**, damit eine Person daran arbeiten kann – es sei denn, der Schritt hat ein automatisches Routing, das sie vorwärts bewegt (siehe [Vollständig automatisierte Schritte](#fully-automated-steps)).

:::info
Automatisierte Aktionen werden nur ausgeführt, wenn eine Karte durch den normalen Fluss ankommt – wenn sie zuerst hinzugefügt wird, wenn ein Ergebnis oder ein automatisches Routing sie hineinbringt, oder nachdem eine Wartezeit endet. Sie werden **nicht** erneut ausgeführt, wenn ein Mitarbeiter eine Karte manuell auf den Schritt zieht oder sie zurücksendet, daher erhält eine Person nicht zwei Mal die gleiche E-Mail.
:::

### E-Mail senden

Wählen Sie **Send email**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional einen benutzerdefinierten Betreff ein. Wenn eine Karte in den Schritt eintritt, erhält die Person diese E-Mail automatisch. (Wenn die Person keine E-Mail-Adresse in der Datei hat, überspringt der Schritt einfach diese Aktion.) [Merge Fields](../settings/email-templates.md#merge-fields) in der Vorlage, wie `{{firstName}}`, werden mit den eigenen Details der Person gefüllt.

:::info
Workflow-E-Mails werden nur versendet, nachdem Ihre Kirche für den Versand von Gruppen-E-Mails genehmigt wurde, und sie zählen zu Ihrem täglichen E-Mail-Limit der Kirche. Siehe [Aktivieren von Gruppen-E-Mails für Ihre Kirche](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Einen Text senden

Wählen Sie **Send Text** und geben Sie die **Text message** ein (bis zu 1.600 Zeichen). Wenn eine Karte in den Schritt eintritt, erhält die Person diesen Text auf ihrem Mobiltelefon. Sie können die Nachricht mit `{{firstName}}`, `{{lastName}}`, `{{displayName}}` oder `{{churchName}}` personalisieren, die mit den Details der Person gefüllt werden, wenn der Text gesendet wird.

- Wenn die Person keine Mobiltelefonnummer in der Datei hat, wird die Aktion übersprungen.
- Wenn die Person sich abgemeldet hat, wird kein Text gesendet und der Verlauf der Karte zeigt **Text skipped: opted out**.
- Wenn der Text versendet wird, zeigt der Verlauf der Karte **Text sent**. Wenn der Versand fehlschlägt – zum Beispiel, weil kein Texting-Anbieter verbunden ist oder Ihre Kirche nicht genügend Texting-Gutschriften hat – wird der Fehler im Verlauf der Karte protokolliert und die restlichen Aktionen des Schritts werden immer noch ausgeführt.

:::warning
Texte werden über den [Texting-Anbieter](../settings/church-settings.md#texting) Ihrer Kirche versendet. Wenn kein Anbieter verbunden ist, warnt der Action-Editor *"No texting provider is set up"* und Texte werden nicht versendet.
:::

### Ein paar Tage warten (Drip-Sequenzen)

Die **Wait** Aktion hält eine Karte für die Anzahl der von Ihnen festgelegten Tage. Während des Wartens zeigt die Karte **Snoozed**. Wenn die Wartezeit vorbei ist:

1. Alle **verbleibenden Aktionen in demselben Schritt** werden ausgeführt – damit Sie einen Drip wie **E-Mail senden → 3 Tage warten → Eine Erinnerungs-E-Mail senden** erstellen können.
2. Wenn der Schritt dann ein automatisches Routing hat, wechselt die Karte; andernfalls bleibt sie im Schritt, damit eine Person sie aufgreift.

:::tip
Eine **Wait** am ganz Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zu "halten", bevor sie an einen Freiwilligen weitergeleitet wird – zum Beispiel, *Warten Sie 7 Tage, dann kontaktiert ein Coach Sie*.
:::

## Personen als Karten hinzufügen

Es gibt mehrere Möglichkeiten, Personen auf ein Board zu bringen:

- **From the board** – Klicken Sie auf **Add Card** am unteren Ende einer Schritt-Spalte und wählen Sie eine Person. Sie können auch eine Gruppe auswählen, und jedes Mitglied dieser Gruppe wird als Karte hinzugefügt.
- **From a person's record** – Verwenden Sie **Add to Workflow** auf der Seite einer Person, um sie auf einen Workflow zu legen.
- **From People search** – Wählen Sie mehrere Personen aus und verwenden Sie die Bulk-Aktion **Add to Workflow**, um sie alle auf einmal hinzuzufügen.
- **Automatically with a trigger** – Fügen Sie Personen hinzu, wenn etwas passiert, z. B. eine Formularübermittlung oder ein erstes Geschenk (siehe [Triggers](#triggers) unten).

## Die Tafel arbeiten

Öffnen Sie einen Workflow, um sein Board zu sehen. Jede Karte zeigt den Namen der Person, dem die Karte zugewiesen ist, und ein Fälligkeitsdatum oder Status-Chip (**Overdue** oder **Snoozed**). Eine Schrittsspalte zeigt auch kleine Abzeichen für alle automatisierten Aktionen, die sie ausführt, und Anmerkungen für sein Routing, was Ihnen eine Übersichtskarte darüber gibt, wie Karten fließen.

- **Move a card** – Ziehen Sie eine Karte von einer Spalte zur nächsten, während die Person vorwärts kommt.
- **Open a card** – Doppelklicken Sie auf eine Karte (oder klicken Sie darauf), um ihre Detail-Schublade zu öffnen, in der Sie den Schritt ändern, sie neu zuweisen, Notizen hinzufügen und überprüfen können, was bereits passiert ist.

Aus der Kartenschublade können Sie:

- **Assign** die Karte einer anderen Person oder Gruppe zuweisen.
- **Snooze** die Karte für 1 Tag, 3 Tage oder 1 Woche, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- **Send Back** zum vorherigen Schritt oder **Skip** zum nächsten Schritt.
- **Pin assignment** – behalte denselben Besitzer der Karte bei, während sie zwischen Schritten wechselt. Standardmäßig wird eine Karte auf einen neuen Schritt dem Standard-Bevollmächtigten des Schritts neu zugewiesen; das Anheften behält die aktuelle verantwortliche Person durchgehend bei.
- **Complete** die Karte, um sie zu beenden, oder wählen Sie eine **Outcome**-Schaltfläche, wenn der Schritt Ergebnisse konfiguriert hat (siehe [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** und überprüfen Sie den **history** der Karte – einschließlich eines Protokolls von automatisierten Aktionen, die ausgeführt wurden (E-Mails versendet, Wartezeiten usw.).

### Massenaktionen

Wählen Sie die Kontrollkästchen auf mehreren Karten, um mit ihnen zusammen zu arbeiten. Eine Symbolleiste wird angezeigt, mit der Sie alle ausgewählten Karten auf einmal **Complete**, **Snooze**, **Reassign** oder **Move** zu einem anderen Schritt verschieben können.

## Routing-Karten mit Ergebnissen und Bedingungen

Routing kontrolliert, wohin eine Karte geht, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten von Routing zu konfigurieren.

### Ergebnis-Schaltflächen

Ergebnisse sind Schaltflächen, die in der Kartenschublade angezeigt werden, wenn Sie eine Karte in diesem Schritt fertig stellen. Anstelle einer einzelnen **Complete**-Schaltfläche können Sie Auswahlmöglichkeiten wie "Joined a Group" oder "Not Interested" anbieten. Jedes Ergebnis kann:

- die Karte zu **einem anderen Schritt** in diesem Workflow senden,
- **die Karte übernehmen** auf einen vollständig anderen Workflow oder
- **Schließe** die Karte.

Dies ermöglicht es einer Entscheidung, die Person auf verschiedene Wege zu verzweigen.

### Automatisches Routing (bedingt)

Automatische Routen bewegen eine Karte vorwärts **in dem Moment, in dem sie einen Schritt betritt** (und nachdem ihre automatisierten Aktionen abgeschlossen sind), ohne dass jemand klickt, wenn die Person eine Reihe von Bedingungen erfüllt. Fügen Sie eine Route hinzu, wählen Sie den Zielschritt und definieren Sie eine oder mehrere **Bedingungen** (z. B. den Campus einer Person, das Alter oder den Mitgliedschaftsstatus). Eine Route ohne Bedingungen passt zu jedem.

:::info
Auf der Tafel zeigt jede Schrittsspalte kleine Anmerkungen, die sein Routing beschreiben – zum Beispiel ein Ergebnis-Label oder "if matches" gefolgt von einem Pfeil zum Zielschritt oder Workflow.
:::

## Vollständig automatisierte Schritte

Sie können einen Schritt so einrichten, dass er sich vollständig von selbst abspielt, ohne dass jemand daran arbeitet. Geben Sie dem Schritt seine **automatisierten Aktionen** und fügen Sie ein **automatisches Routing** hinzu (ohne Bedingungen), das auf den nächsten Schritt zeigt. Wenn eine Karte eintritt, werden die Aktionen ausgeführt und dann der Routing-Fortsätze – die Karte geht direkt durch.

:::tip
Kombinieren Sie dies mit **Wait**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt "Personal Call" weitergeleitet.* Die E-Mail und die Zeitplanung werden für Sie übernommen, und ein Freiwilliger sieht die Karte nur, wenn es Zeit für den menschlichen Touch ist.
:::

## Trigger

Trigger fügen Personen automatisch zu einem Workflow hinzu, wenn etwas passiert, sodass Sie nie Karten von Hand hinzufügen müssen. Klicken Sie auf einem Workflow-Board auf die Registerkarte **Triggers** und dann **Add Trigger**. Es gibt zwei Arten:

### Event-Trigger

Werden ausgelöst, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis und fügen Sie optional **Bedingungen** hinzu, damit nur übereinstimmende Personen hinzugefügt werden:

- **Person · Created / Updated** – z. B. jeden hinzufügen, dessen Status zu *Visitor* wird.
- **Donation · Created** – z. B. einen ersten oder großen Geschenk zu einem Dankesschreiben-Workflow hinzufügen (nach Betrag, Fonds oder Methode abgleichen).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** – jeden hinzufügen, der ein ausgewähltes Formular einreicht (ideal für ein "I'm New" oder "Connect" Formular).

### Zeitplan-Trigger

Werden regelmäßig ausgeführt – täglich, wöchentlich, monatlich oder jährlich – gegen einen Satz von Bedingungen. Verwenden Sie diese für zeitbasierte Outreach wie *alle, deren Mitgliedschaftsjubiläum heute ist* oder ein *monatliches* Check-in.

Für jeden Trigger können Sie auch folgende Einstellungen vornehmen:

- Der **entry step**, auf dem die neue Karte beginnt (standardmäßig der erste Schritt).
- **Once per person** – damit dieselbe Person nicht zweimal vom Trigger zu dem Workflow hinzugefügt wird.
- **Active** – Aktivieren oder deaktivieren Sie den Trigger, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen **Form · Submitted**-Trigger mit der **New Visitor Follow-up**-Vorlage, um Ihr "Connect Card"- oder "I'm New"-Formular in eine automatische Verfolgungspipeline umzuwandeln.
:::

## Meine Karten

Freiwillige und Mitarbeiter müssen nicht durch jedes Board graben, um ihre Arbeit zu finden. Die Seite **My Cards** (verlinkt von der Workflows-Seite) listet alle Karten auf, die dem aktuellen Benutzer über alle Workflows hinweg zugewiesen sind. Wenn Sie auf eine Karte klicken, wird das Board geöffnet, zu dem sie gehört.

## Reports

Öffnen Sie einen Workflow und klicken Sie auf **Reports**, um Analysen für diesen Workflow zu sehen:

- **Overdue** – die Anzahl der Karten, deren Fälligkeitsdatum überschritten ist.
- **Cards per Step** – wie viele Karten sich derzeit auf jedem Schritt befinden, angezeigt als Säulendiagramm.
- **Completed (30 days)** – Durchsatz über die letzten 30 Tage, angezeigt als Liniendiagramm.

Verwenden Sie diese, um Engpässe zu erkennen – zum Beispiel einen Schritt, in dem sich Karten ansammeln und nie weitergehen.

## Verwandte Artikel

- [Tasks](./tasks.md) – die einzelnen Aktionselemente, auf denen Workflow-Karten aufgebaut sind
- [Forms](../forms/index.md) – erstellen Sie die Formulare, die Workflows auslösen können
- [Groups](../groups/index.md) – die Gruppen, in die eine "Add to group"-Aktion Personen platzieren kann
- [Rollen & Berechtigungen](../settings/roles-permissions.md) – kontrollieren Sie, wer Workflows anzeigen, bearbeiten und verwalten kann
