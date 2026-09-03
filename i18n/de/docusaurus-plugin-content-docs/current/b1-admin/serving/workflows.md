---
title: "Arbeitsabläufe"
---

# Arbeitsabläufe

<div class="article-intro">

Arbeitsabläufe bewegen Menschen durch eine Reihe von Schritten auf einem visuellen Board. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten geht — von einer Erstgast-Verfolgung, zu einem Mitgliedschaftsprozess, zu einer Erstspender-Danksagung und alles andere, wo Sie viele Menschen durch den gleichen Satz von Phasen verfolgen müssen. Ein Schritt kann einen Freiwilligen auffordern, etwas zu tun (einen Anruf tätigen, ein Gespräch führen) **und** automatisierte Aktionen auf eigene Faust ausführen — eine E-Mail senden, ein paar Tage warten, die Person zu einer Gruppe hinzufügen — daher behandeln Arbeitsabläufe sowohl das menschliche Folge-up als auch die Routine-Arbeit rundherum. Arbeitsabläufe erweitern [Tasks](./tasks.md) in ein Drag-and-Drop-Kanban-Board, daher fällt niemand und nichts durch die Risse.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin vorhanden sind
- Machen Sie sich damit vertraut, wie [Tasks](./tasks.md) funktionieren, da jede Karte auf einem Board eine Aufgabe ist
- Um die Aktion **Send email** zu verwenden, erstellen Sie zuerst die E-Mail-Vorlagen, die Sie senden möchten (verwaltet unter **Messaging → Manage Templates**)
- Sie benötigen die entsprechende Tasks-Berechtigung. Karten anzeigen, bearbeiten und Arbeitsabläufe verwalten sind separate Berechtigungsstufen (siehe [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Anzeigen von Arbeitsabläufen

Navigieren Sie zu **Serving**, öffnen Sie den Bereich **Tasks** und wählen Sie **Workflows** aus dem Menü. Sie sehen Ihre Arbeitsabläufe aufgelistet und nach Kategorie gruppiert, wobei aktive Arbeitsabläufe hervorgehoben werden. Klicken Sie auf einen beliebigen Arbeitsablauf, um sein Board zu öffnen.

## Erstellen eines Arbeitsablaufs

1. Klicken Sie auf der Seite Workflows auf **Add Workflow**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Blank workflow** — beginnen Sie von Grund auf und erstellen Sie Ihre eigenen Schritte.
   - **From a template** — beginnen Sie mit einem vorgefertigten Schritte-Set, das Sie bearbeiten können. Integrierte Vorlagen sind:
     - **New Visitor Follow-up** — Willkommens-E-Mail senden → Persönlicher Anruf → Einladung zum nächsten Schritt → Connected
     - **Membership Class** — Express interest → Register for class → Attend class → Complete membership
     - **First-time Giver Thank-you** — Dankschreiben senden → Spendenauswirkungen teilen → Verwiesene
3. Geben Sie dem Arbeitsablauf einen **Name**.
4. Ordnen Sie optional eine **Category** zu, um zugehörige Arbeitsabläufe zu gruppieren. Sie können eine neue Kategorie direkt aus dem Dropdown erstellen.
5. Lassen Sie den Arbeitsablauf **Active**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inactive**, um ihn aus den Add-to-workflow-Listen zu verbergen.
6. Klicken Sie auf **Save**.

:::tip
Verwenden Sie die Schaltfläche **Duplicate** in der Workflows-Liste, um einen vorhandenen Arbeitsablauf zu kopieren — einschließlich seiner Schritte, automatisierten Aktionen und Routing — als Ausgangspunkt für einen neuen.
:::

## Aufbau des Boards mit Schritten

Jedes Workflow-Board besteht aus **Schritten**, die als Spalten von links nach rechts angezeigt werden. Öffnen Sie einen Arbeitsablauf und verwenden Sie **Add Step**, um jede Phase Ihres Prozesses zu erstellen.

Wenn Sie einen Schritt hinzufügen oder bearbeiten, können Sie konfigurieren:

- **Step Name** — die Spaltenüberschrift (z. B. „Welcome Call" oder „Awaiting Registration").
- **Due in (days)** — legt automatisch ein Fälligkeitsdatum fest, wenn eine Karte diesen Schritt erreicht. Karten nach ihrem Fälligkeitsdatum werden als **Overdue** gekennzeichnet.
- **Default assignee** — die Person oder Gruppe, der neue Karten auf diesem Schritt automatisch zugewiesen werden.
- **Automated actions** — Dinge, die das System auf eigene Faust ausführt, wenn eine Karte ankommt (siehe unten).
- **Routing** — wo die Karte geht, wenn sie den Schritt verlässt (siehe [Routing](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie Schritte-Spalten in die Reihenfolge, die zu Ihrem Prozess passt. Die Reihenfolge definiert auch den Standardpfad, den eine Karte nimmt, wenn kein anderes Routing angewendet wird.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatisierte Aktionen und Routing hängen an dem Schritt an, daher werden diese Abschnitte entsperrt, sobald der Schritt vorhanden ist.
:::

## Automatisierte Aktionen

Jeder Schritt kann eine Liste von **automatisierten Aktionen** tragen, die von selbst laufen, sobald eine Karte **den Schritt betritt** — bevor jemand sie berührt. So macht ein Schritt einen Freiwilligen aufmerksam *und* kümmert sich um die Routine-Arbeit um das Folge-up herum.

Öffnen Sie im Schritt-Editor **Automated actions**, klicken Sie auf **Add Action**, wählen Sie einen Typ, füllen Sie seine Einstellungen aus und klicken Sie auf das Speichersymbol auf dieser Aktion. Addieren Sie so viele, wie Sie benötigen; sie laufen **von oben nach unten in Reihenfolge**.

| Aktion | Was es tut |
|---|---|
| **Send email** | Sendet der Person eine E-Mail-Vorlage, die Sie auswählen. Sie können die Betreffzeile außer Kraft setzen. |
| **Wait** | Hält die Karte für eine Anzahl von Tagen an, bevor sie fortgesetzt wird (siehe unten). |
| **Add to group** | Fügt die Person einer [Gruppe](../groups/index.md) hinzu, die Sie wählen. |
| **Add to workflow** | Startet die Person auf einem anderen Arbeitsablauf — nützlich zum Übergeben zwischen Prozessen. |
| **Add note** | Zeichnet eine Notiz in der Kartenhistorie auf. |
| **Set field** | Aktualisiert ein Feld im Personendatensatz: Mitgliedschaftsstatus, Familienstand, Geschlecht, Stadt, Staat oder PLZ. |
| **Webhook** | Sendet die Kartendetails an eine externe Web-Adresse (URL), die Sie angeben, um eine Verbindung zu anderen Systemen herzustellen. |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **ruht die Karte auf diesem Schritt**, damit eine Person sie bearbeiten kann — es sei denn, der Schritt hat eine automatische Route, die sie voranbringt (siehe [Fully automated steps](#fully-automated-steps)).

:::info
Automatisierte Aktionen werden nur ausgeführt, wenn eine Karte durch den normalen Fluss ankommt — wenn sie zunächst hinzugefügt wird, wenn ein Ergebnis oder automatisches Routing es bringt, oder nach einem Wait endet. Sie werden **nicht** erneut ausgeführt, wenn ein Mitarbeiter eine Karte manuell auf den Schritt zieht oder zurücksendet, daher erhält eine Person nicht zweimal die gleiche E-Mail.
:::

### Senden einer E-Mail

Wählen Sie **Send email**, wählen Sie eine Ihrer E-Mail-Vorlagen und geben Sie optional einen benutzerdefinierten Betreff ein. Wenn eine Karte den Schritt betritt, erhält die Person diese E-Mail automatisch. (Wenn die Person keine E-Mail-Adresse in der Datei hat, überspringt der Schritt diese Aktion einfach.)

### Warten Sie ein paar Tage (Drip-Sequenzen)

Die Aktion **Wait** hält eine Karte für die Anzahl der Tage an, die Sie einstellen. Während es wartet, wird die Karte als **Snoozed** angezeigt. Wenn das Warten vorbei ist:

1. Alle **verbleibenden Aktionen auf dem gleichen Schritt** laufen — daher können Sie einen Drip wie **Send email → Wait 3 days → Send a reminder email** erstellen.
2. Dann, wenn der Schritt eine automatische Route hat, bewegt sich die Karte weiter; andernfalls ruht es auf dem Schritt, damit eine Person es abholen kann.

:::tip
Ein **Wait** ganz am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zu „halten", bevor sie auf einem Freiwilligen-Bildschirm angezeigt wird — z. B. *Wait 7 days, then a coach reaches out*.
:::

## Hinzufügen von Personen als Karten

Es gibt mehrere Möglichkeiten, Personen auf ein Board zu setzen:

- **From the board** — Klicken Sie am unteren Rand einer Schritte-Spalte auf **Add Card** und wählen Sie eine Person. Sie können auch eine Gruppe wählen, und jedes Mitglied dieser Gruppe wird als Karte hinzugefügt.
- **From a person's record** — Verwenden Sie **Add to Workflow** auf einer Personenseite, um sie auf einen Arbeitsablauf zu legen.
- **From People search** — Wählen Sie mehrere Personen und verwenden Sie die Massenoperation **Add to Workflow**, um sie alle auf einmal hinzuzufügen.
- **Automatically with a trigger** — Fügen Sie Personen hinzu, wenn etwas passiert, wie eine Formulareinreichung oder ein erstes Geschenk (siehe [Triggers](#triggers) unten).

## Arbeite das Board

Öffnen Sie einen Arbeitsablauf, um sein Board zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, und einen Chip für Fälligkeitsdatum oder Status (**Overdue** oder **Snoozed**). Eine Schritte-Spalte zeigt auch kleine Badges für alle automatisierten Aktionen, die sie ausführt, und Anmerkungen für ihr Routing, die Ihnen eine Übersichtskarte geben, wie Karten fließen.

- **Move a card** — Ziehen Sie eine Karte von einer Spalte zur nächsten, während die Person fortschreitet.
- **Open a card** — Doppelklicken Sie auf eine Karte (oder klicken Sie darauf), um ihre Detailschublade zu öffnen, in der Sie den Schritt ändern, neu zuweisen, Notizen hinzufügen und überprüfen können, was bereits passiert ist.

Aus der Karten-Schublade können Sie:

- **Assign** die Karte einer anderen Person oder Gruppe.
- **Snooze** die Karte für 1 Tag, 3 Tage oder 1 Woche, um sein Fälligkeitsdatum vorübergehend zu verbergen.
- **Send Back** zum vorherigen Schritt oder **Skip** zum nächsten Schritt.
- **Pin assignment** — behalten Sie den gleichen Eigentümer auf der Karte, auch wenn sie zwischen Schritten wechselt. Standardmäßig werden Karten auf einen neuen Schritt mit dem Standardzuweisenden dieses Schritts neu zugewiesen; Festspulung hält die aktuelle Person in den gesamten Prozess verantwortlich.
- **Complete** die Karte, um sie zu beenden, oder wählen Sie einen **Outcome** Knopf, wenn der Schritt Ergebnisse konfiguriert hat (siehe [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** und überprüfen Sie die **history** der Karte — einschließlich einer Protokoll der automatisierten Aktionen, die ausgeführt wurden (E-Mails gesendet, wartet usw.).

### Massenaktionen

Wählen Sie die Kontrollkästchen auf mehreren Karten, um auf sie zusammen zu wirken. Eine Symbolleiste erscheint, die Ihnen ermöglicht, alle ausgewählten Karten **Complete**, **Snooze**, **Reassign** oder **Move** auf einmal zu einem anderen Schritt zu verschieben.

## Routing von Karten mit Ergebnissen und Bedingungen

Routing steuert, wo eine Karte geht, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten von Routing zu konfigurieren.

### Outcome-Knöpfe

Ergebnisse sind Knöpfe, die in der Karten-Schublade angezeigt werden, wenn Sie eine Karte auf diesem Schritt fertigstellen. Anstelle einer einzelnen Schaltfläche **Complete** können Sie Auswahlmöglichkeiten wie „Joined a Group" oder „Not Interested" anbieten. Jedes Ergebnis kann:

- Sende die Karte zu **einem anderen Schritt** in diesem Arbeitsablauf,
- **Übergabe der Karte** zu einem ganz anderen Arbeitsablauf oder
- **Close** die Karte.

Dies ermöglicht einer Entscheidung, die Person nach verschiedenen Pfaden zu verzweigen.

### Automatisches Routing (bedingt)

Automatische Routen verschieben eine Karte **in dem Moment, in dem sie einen Schritt betritt** (und nachdem seine automatisierten Aktionen abgeschlossen sind), ohne dass jemand klickt, wenn die Person einen Satz von Bedingungen erfüllt. Addieren Sie eine Route, wählen Sie den Zielschritt und definieren Sie eine oder mehrere **Bedingungen** (z. B. den Campus, das Alter oder den Mitgliedschaftsstatus einer Person). Eine Route ohne Bedingungen passt zu allen.

:::info
Auf dem Board zeigt jede Schritte-Spalte kleine Anmerkungen, die ihr Routing beschreiben — z. B. eine Outcome-Bezeichnung oder „if matches" gefolgt von einem Pfeil zum Zielschritt oder Arbeitsablauf.
:::

## Vollständig automatisierte Schritte

Sie können einen Schritt laufen lassen, völlig auf eigene Faust, ohne dass jemand ihn bearbeitet. Geben Sie dem Schritt seine **automatisierten Aktionen** und addieren Sie ein **automatisches Route** (ohne Bedingungen), das auf den nächsten Schritt zeigt. Wenn eine Karte eintritt, laufen die Aktionen und dann bewegt die Route sie sofort — die Karte geht direkt durch.

:::tip
Kombinieren Sie dies mit **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* Die E-Mail und das Timing werden für Sie bearbeitet, und ein Freiwilliger sieht die Karte nur, wenn es Zeit für den menschlichen Touch ist.
:::

## Trigger

Trigger fügen Personen automatisch zu einem Arbeitsablauf hinzu, wenn etwas passiert, daher müssen Sie nie Karten von Hand hinzufügen. Klicken Sie auf einem Workflow-Board auf die Registerkarte **Triggers**, dann auf **Add Trigger**. Es gibt zwei Arten:

### Event-Trigger

Auslösen, sobald sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis, dann fügen Sie optional **Bedingungen** hinzu, damit nur übereinstimmende Personen hinzugefügt werden:

- **Person · Created / Updated** — z. B. eine Person hinzufügen, deren Status *Visitor* wird.
- **Donation · Created** — z. B. ein erstes oder großes Geschenk zu einem Dank-Arbeitsablauf hinzufügen (Match auf Betrag, Fonds oder Methode).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** — fügen Sie jemanden hinzu, der ein ausgewähltes Formular einreicht (großartig für eine „I'm New" oder „Connect" Karte).

### Schedule-Trigger

Regelmäßig laufen — täglich, wöchentlich, monatlich oder jährlich — gegen eine Reihe von Bedingungen. Verwenden Sie diese für zeitbasierte Reichweite wie *jeder, dessen Mitgliedschaftsjahrestag heute ist* oder ein *monatlicher* Check-in.

Für jeden Trigger können Sie auch einstellen:

- Der **entry step** die neue Karte startet auf (Standardwert ist der erste Schritt).
- **Once per person** — damit dieselbe Person nicht zweimal vom Trigger zum Arbeitsablauf hinzugefügt wird.
- **Active** — schalten Sie den Trigger ein oder aus, ohne ihn zu löschen.

:::tip
Paaren Sie einen **Form · Submitted** Trigger mit der Vorlage **New Visitor Follow-up**, um Ihr „Connect Card" oder „I'm New" Formular in eine automatische Folgepipeline zu verwandeln.
:::

## Meine Karten

Freiwillige und Mitarbeiter müssen nicht in jedem Board graben, um ihre Arbeit zu finden. Die Seite **My Cards** (von der Seite Workflows verknüpft) listet jede Karte auf, die dem aktuellen Benutzer über alle Arbeitsabläufe hinweg zugewiesen ist. Wenn Sie auf eine Karte klicken, wird das Board geöffnet, zu dem sie gehört.

## Reports

Öffnen Sie einen Arbeitsablauf und klicken Sie auf **Reports**, um Analysen für diesen Arbeitsablauf zu sehen:

- **Overdue** — die Anzahl der Karten nach ihrem Fälligkeitsdatum.
- **Cards per Step** — wie viele Karten derzeit auf jedem Schritt sitzen, als Säulendiagramm angezeigt.
- **Completed (30 days)** — Durchsatz in den letzten 30 Tagen, als Liniendiagramm angezeigt.

Verwenden Sie diese, um Engpässe zu finden — z. B. einen Schritt, an dem Karten sich stapeln und sich nie bewegen.

## Verwandte Artikel

- [Tasks](./tasks.md) — die einzelnen Aktionselemente, auf denen Workflow-Karten aufgebaut sind
- [Automations](./automations.md) — erstellen Sie wiederkehrende Aufgaben nach Plan
- [Forms](../forms/index.md) — erstellen Sie die Formulare, die Arbeitsabläufe auslösen können
- [Groups](../groups/index.md) — die Gruppen, die eine „Add to group" Aktion Personen platzieren kann
- [Roles & Permissions](../settings/roles-permissions.md) — kontrollieren Sie, wer Arbeitsabläufe anzeigen, bearbeiten und verwalten kann
