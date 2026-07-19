---
title: "Arbeitsabläufe"
---

# Arbeitsabläufe

<div class="article-intro">

Arbeitsabläufe bewegen Personen durch eine Serie von Schritten auf einem visuellen Board. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten übergeht – von einer Erstkontakt-Nachverfolgung über einen Mitgliedschaftsprozess bis zu einem Erstsender-Dankeschön und alles andere, wo Sie viele Menschen durch die gleiche Reihe von Phasen verfolgen müssen. Ein Schritt kann einen Freiwilligen bitten, etwas zu tun (anrufen, ein Gespräch führen) **und** automatische Aktionen selbstständig ausführen – E-Mail senden, ein paar Tage warten, Person zu einer Gruppe hinzufügen – sodass Arbeitsabläufe sowohl die menschliche Nachverfolgung als auch die Routine-Arbeit drumherum übernehmen. Arbeitsabläufe erweitern [Aufgaben](./tasks.md) in ein Drag-and-Drop-Kanban-Board, damit niemand und nichts durchs Netz geht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Stellen Sie sicher, dass die Personen, die Sie verfolgen möchten, in B1 Admin vorhanden sind
- Machen Sie sich damit vertraut, wie [Aufgaben](./tasks.md) funktionieren, da jede Karte auf einem Board eine Aufgabe ist
- Um die **E-Mail senden**-Aktion zu verwenden, erstellen Sie zuerst die E-Mail-Vorlagen, die Sie senden möchten (verwaltet unter **Messaging → Vorlagen verwalten**)
- Sie benötigen die entsprechende Aufgabenberechtigung. Anzeigen, Bearbeitung von Karten und Verwaltung von Arbeitsabläufen sind separate Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Arbeitsabläufe anzeigen

Navigieren Sie zu **Dienst**, öffnen Sie den Bereich **Aufgaben**, und wählen Sie **Arbeitsabläufe** aus dem Menü. Sie sehen Ihre Arbeitsabläufe aufgelistet und nach Kategorie gruppiert, mit aktiven Arbeitsabläufen hervorgehoben. Klicken Sie auf einen beliebigen Arbeitsablauf, um sein Board zu öffnen.

## Arbeitsablauf erstellen

1. Klicken Sie auf der Seite Arbeitsabläufe auf **Arbeitsablauf hinzufügen**.
2. Wählen Sie, wie Sie beginnen möchten:
   - **Arbeitsablauf von Grund auf** – Beginnen Sie von vorne und erstellen Sie Ihre eigenen Schritte.
   - **Aus einer Vorlage** – Beginnen Sie mit einer vorgefertigten Reihe von Schritten, die Sie bearbeiten können. Eingebaute Vorlagen umfassen:
     - **Erstkontakt-Nachverfolgung** – Willkommens-E-Mail senden → Persönlicher Telefonanruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftsklasse** – Interesse zeigen → Für Klasse anmelden → Klasse besuchen → Mitgliedschaft abschließen
     - **Erstsender-Dankeschön** – Dankesschreiben senden → Spenden-Auswirkungen teilen → Gemanagt
3. Geben Sie dem Arbeitsablauf einen **Namen**.
4. Weisen Sie optional eine **Kategorie** zu, um verwandte Arbeitsabläufe zu gruppieren. Sie können eine neue Kategorie direkt aus dem Dropdown erstellen.
5. Lassen Sie den Arbeitsablauf **Aktiv**, damit Personen hinzugefügt werden können, oder setzen Sie ihn auf **Inaktiv**, um ihn aus den Listen zum Hinzufügen zum Arbeitsablauf auszublenden.
6. Klicken Sie auf **Speichern**.

:::tip
Verwenden Sie die Schaltfläche **Duplizieren** in der Arbeitsablauf-Liste, um einen bestehenden Arbeitsablauf – einschließlich seiner Schritte, automatisierten Aktionen und Weiterleitungen – als Ausgangspunkt für einen neuen zu kopieren.
:::

## Erstellen Sie das Board mit Schritten

Jedes Arbeitsablauf-Board besteht aus **Schritten**, die als Spalten von links nach rechts dargestellt werden. Öffnen Sie einen Arbeitsablauf und verwenden Sie **Schritt hinzufügen**, um jede Stufe Ihres Prozesses zu erstellen.

Wenn Sie einen Schritt hinzufügen oder bearbeiten, können Sie konfigurieren:

- **Schritt-Name** – die Spaltenüberschrift (z. B. „Willkommens-Anruf" oder „Wartet auf Registrierung").
- **Fällig in (Tage)** – setzt automatisch ein Fälligkeitsdatum, wenn eine Karte in diesen Schritt eintritt. Karten, deren Fälligkeitsdatum überschritten ist, werden als **Überfällig** markiert.
- **Standard-Zugewiesener** – die Person oder Gruppe, der neue Karten auf diesem Schritt automatisch zugewiesen werden.
- **Automatisierte Aktionen** – Dinge, die das System selbst tut, wenn eine Karte eintritt (siehe unten).
- **Weiterleitungen** – wohin die Karte geht, wenn sie den Schritt verlässt (siehe [Weiterleitungen](#routing-cards-with-outcomes-and-conditions)).

Ziehen Sie Schritt-Spalten in die Reihenfolge, die Ihrem Prozess entspricht. Die Reihenfolge definiert auch den Standard-Pfad, den eine Karte nimmt, wenn keine anderen Weiterleitungen gelten.

:::info
Speichern Sie einen neuen Schritt zuerst. Automatische Aktionen und Weiterleitungen fügen sich dem Schritt an, sodass der Editor diese Abschnitte entsperrt, sobald der Schritt vorhanden ist.
:::

## Automatisierte Aktionen

Jeder Schritt kann eine Liste von **automatisierten Aktionen** tragen, die sich selbst ausführen, in dem Moment, in dem eine Karte **in den Schritt eintritt** – bevor jemand sie anfasst. So kann ein Schritt sowohl einen Freiwilligen auffordern *als auch* sich um die Routine-Arbeit rundherum kümmern.

Öffnen Sie im Schritt-Editor **Automatische Aktionen**, klicken Sie auf **Aktion hinzufügen**, wählen Sie einen Typ aus, füllen Sie seine Einstellungen aus und klicken Sie auf das Speichersymbol auf dieser Aktion. Fügen Sie so viele hinzu, wie Sie benötigen; sie laufen **von oben nach unten in Reihenfolge**.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine E-Mail-Vorlage Ihrer Wahl. Sie können die Betreffzeile überschreiben. |
| **Warten** | Pausiert die Karte für eine Anzahl von Tagen, bevor sie fortfährt (siehe unten). |
| **Zu Gruppe hinzufügen** | Fügt die Person zu einer [Gruppe](../groups/index.md) Ihrer Wahl hinzu. |
| **Zu Arbeitsablauf hinzufügen** | Startet die Person auf einem anderen Arbeitsablauf – nützlich für die Übergabe zwischen Prozessen. |
| **Notiz hinzufügen** | Zeichnet eine Notiz im Kartenverlauf auf. |
| **Feld setzen** | Aktualisiert ein Feld in der Personendatei: Mitgliedschaftsstatus, Familienstand, Geschlecht, Stadt, Bundesland oder PLZ. |
| **Webhook** | Sendet die Kartendaten an eine externe Webadresse (URL) Ihrer Wahl, zum Verbinden mit anderen Systemen. |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **verbleibt die Karte auf diesem Schritt**, damit eine Person daran arbeitet – es sei denn, der Schritt hat eine automatische Route, die sie voranbringt (siehe [Vollautomatisierte Schritte](#fully-automated-steps)).

:::info
Automatische Aktionen laufen nur, wenn eine Karte durch den normalen Fluss ankommt – wenn sie zuerst hinzugefügt wird, wenn ein Ergebnis oder eine automatische Route sie herbringt oder nachdem ein Warten endet. Sie tun **nicht** erneut ausführen, wenn ein Mitarbeiter eine Karte manuell auf den Schritt zieht oder sie zurücksendet, sodass eine Person nicht zwei Mal die gleiche E-Mail erhält.
:::

### E-Mail versenden

Wählen Sie **E-Mail senden**, wählen Sie eine Ihrer E-Mail-Vorlagen aus und geben Sie optional eine benutzerdefinierte Betreffzeile ein. Wenn eine Karte in den Schritt eintritt, erhält die Person diese E-Mail automatisch. (Wenn die Person keine E-Mail-Adresse auf Datei hat, überspringt der Schritt diese Aktion einfach.)

### Ein paar Tage warten (Drip-Sequenzen)

Die **Warten**-Aktion hält eine Karte für die Anzahl von Tagen, die Sie eingestellt haben. Während sie wartet, wird die Karte als **Schlafend** angezeigt. Wenn das Warten vorbei ist:

1. Alle **verbleibenden Aktionen auf dem gleichen Schritt** werden ausgeführt – sodass Sie ein Drip wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden** erstellen können.
2. Dann, wenn der Schritt eine automatische Route hat, bewegt sich die Karte weiter; sonst ruht sie auf dem Schritt, damit eine Person sie aufgreift.

:::tip
Ein **Warten** am sehr Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zu „halten", bevor sie einem Freiwilligen auftaucht – zum Beispiel, *7 Tage warten, dann kontaktiert ein Coach*.
:::

## Fügen Sie Personen als Karten hinzu

Es gibt mehrere Möglichkeiten, Personen auf ein Board zu setzen:

- **Vom Board** – Klicken Sie am Ende einer Schritt-Spalte auf **Karte hinzufügen** und wählen Sie eine Person. Sie können auch eine Gruppe wählen, und jedes Mitglied dieser Gruppe wird als Karte hinzugefügt.
- **Aus der Personendatei** – Verwenden Sie **Zu Arbeitsablauf hinzufügen** auf der Seite einer Person, um sie auf einen Arbeitsablauf zu setzen.
- **Aus der Personensuche** – Wählen Sie mehrere Personen und verwenden Sie die Massen-Aktion **Zu Arbeitsablauf hinzufügen**, um sie alle auf einmal hinzuzufügen.
- **Automatisch mit einem Trigger** – Fügen Sie Personen hinzu, wenn etwas passiert, wie eine Formulareinreichung oder eine erste Gabe (siehe [Trigger](#triggers) unten).

## Arbeiten Sie das Board

Öffnen Sie einen Arbeitsablauf, um sein Board zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, und ein Fälligkeitsdatum oder einen Status-Chip (**Überfällig** oder **Schlafend**). Eine Schritt-Spalte zeigt auch kleine Abzeichen für alle automatisierten Aktionen, die sie ausführt, und Anmerkungen für ihre Weiterleitungen, was Ihnen eine schnelle Übersicht bietet, wie Karten fließen.

- **Verschieben Sie eine Karte** – Ziehen Sie eine Karte von einer Spalte zur nächsten, während die Person vorankommt.
- **Öffnen Sie eine Karte** – Doppelklicken Sie auf eine Karte (oder klicken Sie auf sie), um ihre Detail-Schublade zu öffnen, wo Sie den Schritt ändern, sie erneut zuweisen, Notizen hinzufügen und überprüfen können, was bereits passiert ist.

Aus der Karten-Schublade können Sie:

- **Zuweisen** Sie die Karte einer anderen Person oder Gruppe zu.
- **Schlummern** Sie die Karte für 1 Tag, 3 Tage oder 1 Woche, um ihr Fälligkeitsdatum vorübergehend auszublenden.
- **Zurückschicken** zum vorherigen Schritt oder **Überspringen** zum nächsten Schritt.
- **Zuordnung festlegen** – behalten Sie denselben Eigentümer auf der Karte, auch wenn sie zwischen Schritten bewegt wird. Standardmäßig wird das Verschieben einer Karte zu einem neuen Schritt neu zum Standard-Zugewiesenen dieses Schritts zugewiesen; das Festlegen behält die aktuelle Person verantwortlich.
- **Beendigen** Sie die Karte, um sie fertigzustellen, oder wählen Sie einen **Ergebnis**-Button, wenn der Schritt Ergebnisse konfiguriert hat (siehe [Weiterleitungen](#routing-cards-with-outcomes-and-conditions)).
- **Notizen hinzufügen** und überprüfen Sie den **Verlauf** der Karte – einschließlich eines Protokolls von automatisierten Aktionen, die ausgeführt wurden (E-Mails gesendet, wartet usw.).

### Massen-Aktionen

Wählen Sie die Kontrollkästchen auf mehreren Karten aus, um auf sie zusammen einzuwirken. Eine Symbolleiste erscheint, die Ihnen ermöglicht, alle ausgewählten Karten auf einmal zu **Beendigen**, **Schlummern**, **Erneut zuweisen** oder **Verschieben** in einen anderen Schritt.

## Weiterleitungen von Karten mit Ergebnissen und Bedingungen

Weiterleitungen steuern, wohin eine Karte geht, wenn sie einen Schritt verlässt. Öffnen Sie den Editor eines Schritts, um zwei Arten von Weiterleitungen zu konfigurieren.

### Ergebnis-Buttons

Ergebnisse sind Buttons, die in der Karten-Schublade angezeigt werden, wenn Sie eine Karte auf diesem Schritt beendigen. Anstatt eines einzelnen **Beendigen**-Buttons können Sie Optionen wie „Zu einer Gruppe beigetreten" oder „Nicht interessiert" anbieten. Jedes Ergebnis kann:

- Die Karte zu **einem anderen Schritt** in diesem Arbeitsablauf senden,
- **Die Karte übergeben** an einen ganz anderen Arbeitsablauf, oder
- **Die Karte schließen**.

Dies ermöglicht es einer Entscheidung, die Person verschiedene Wege hinab zu verzweigen.

### Automatische Weiterleitungen (bedingt)

Automatische Routen bewegen eine Karte weiter **in dem Moment, in dem sie in einen Schritt eintritt** (und nachdem ihre automatisierten Aktionen endet), ohne dass jemand klickt, wenn die Person eine Reihe von Bedingungen erfüllt. Fügen Sie eine Route hinzu, wählen Sie den Zielschritt und definieren Sie eine oder mehrere **Bedingungen** (z. B. den Standort, das Alter oder den Mitgliedschaftsstatus einer Person). Eine Route ohne Bedingungen entspricht jedem.

:::info
Auf dem Board zeigt jede Schritt-Spalte kleine Anmerkungen, die ihre Weiterleitungen beschreiben – z. B. ein Ergebnis-Label oder „if matches" gefolgt von einem Pfeil zum Zielschritt oder Arbeitsablauf.
:::

## Vollautomatisierte Schritte

Sie können einen Schritt vollständig selbst ausführen lassen, ohne dass jemand ihn bearbeitet. Geben Sie dem Schritt seine **automatisierten Aktionen** und fügen Sie eine **automatische Route** (ohne Bedingungen) hinzu, die auf den nächsten Schritt zeigt. Wenn eine Karte eintritt, führen die Aktionen aus, und dann die Route, die sie sofort vorbringt – die Karte passiert direkt hindurch.

:::tip
Kombinieren Sie dies mit **Warten**: *Willkommens-E-Mail senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf" vorbringen.* Die E-Mail und die Zeitplanung werden für Sie bearbeitet, und ein Freiwilliger sieht die Karte nur, wenn es Zeit für die menschliche Note ist.
:::

## Trigger

Trigger fügen Personen automatisch einem Arbeitsablauf hinzu, wenn etwas passiert, sodass Sie Karten nie von Hand hinzufügen müssen. Klicken Sie auf einem Arbeitsablauf-Board auf die Registerkarte **Trigger**, dann **Trigger hinzufügen**. Es gibt zwei Arten:

### Ereignis-Trigger

Werden sofort ausgelöst, wenn sich ein Datensatz in B1 ändert. Wählen Sie das Ereignis aus, dann optional **Bedingungen** hinzu, sodass nur übereinstimmende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** – z. B. alle hinzufügen, deren Status *Besucher* wird.
- **Spende · Erstellt** – z. B. eine erste oder große Gabe zu einem Dankeschön-Arbeitsablauf (abgleichen nach Betrag, Fonds oder Methode).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** – alle hinzufügen, die ein gewähltes Formular einreichen (großartig für eine „Ich bin Neu" oder „Verbinden"-Karte).

### Zeitplan-Trigger

Laufen auf wiederkehrender Basis – täglich, wöchentlich, monatlich oder jährlich – gegen eine Reihe von Bedingungen. Verwenden Sie diese für zeitbasierte Gemeindearbeit, wie *jeder, dessen Jubiläum heute ist* oder ein *monatlicher* Check-in.

Für jeden Trigger können Sie auch einstellen:

- Der **Eingangsschritt**, auf dem die neue Karte startet (Standard ist der erste Schritt).
- **Einmal pro Person** – sodass die gleiche Person nicht zweimal von dem Trigger zum Arbeitsablauf hinzugefügt wird.
- **Aktiv** – schalten Sie den Trigger an oder aus, ohne ihn zu löschen.

:::tip
Kombinieren Sie einen **Formular · Eingereicht**-Trigger mit der Vorlage **Erstkontakt-Nachverfolgung**, um Ihr „Connect-Kartchen" oder „Ich bin Neu"-Formular in eine automatische Nachverfolgungs-Pipeline zu verwandeln.
:::

## Meine Karten

Freiwillige und Mitarbeiter müssen nicht durch jedes Board graben, um ihre Arbeit zu finden. Die Seite **Meine Karten** (verlinkt von der Seite Arbeitsabläufe) listet alle Karten auf, die dem aktuellen Benutzer über alle Arbeitsabläufe hinweg zugewiesen sind. Das Klicken auf eine Karte öffnet das Board, zu dem sie gehört.

## Berichte

Öffnen Sie einen Arbeitsablauf und klicken Sie auf **Berichte**, um Analysen für diesen Arbeitsablauf zu sehen:

- **Überfällig** – die Anzahl der Karten, deren Fälligkeitsdatum überschritten ist.
- **Karten pro Schritt** – wie viele Karten derzeit auf jedem Schritt sitzen, als Balkendiagramm angezeigt.
- **Abgeschlossen (30 Tage)** – Durchsatz über die letzten 30 Tage, als Liniendiagramm angezeigt.

Verwenden Sie diese, um Engpässe zu erkennen – zum Beispiel einen Schritt, wo Karten sich ansammeln und nie vorbringen.

## Verwandte Artikel

- [Aufgaben](./tasks.md) – die Aktionselemente, auf denen Arbeitsablauf-Karten aufgebaut sind
- [Automatisierungen](./automations.md) – erstellen Sie wiederkehrende Aufgaben nach Zeitplan
- [Formulare](../forms/index.md) – erstellen Sie die Formulare, die Arbeitsabläufe auslösen können
- [Gruppen](../groups/index.md) – die Gruppen, denen eine „Zu Gruppe hinzufügen"-Aktion Personen zuordnen kann
- [Rollen & Berechtigungen](../settings/roles-permissions.md) – steuern Sie, wer Arbeitsabläufe sehen, bearbeiten und verwalten kann
