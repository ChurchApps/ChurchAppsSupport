---
title: "Arbeitsabläufe"
---

# Arbeitsabläufe

<div class="article-intro">

Arbeitsabläufe führen Menschen durch eine Reihe von Schritten auf einer visuellen Tafel. Jede Person wird zu einer Karte, die von einem Schritt zum nächsten wandert – von einer Nachfassung für erstmalige Besucher über einen Mitgliedschaftsprozess bis hin zu einer Dankbarkeit für erstmalige Spender und alles andere, wo du viele Menschen durch die gleichen Stufen verfolgst. Ein Schritt kann einen Freiwilligen bitten, etwas zu tun (anrufen, ein Gespräch führen) **und** automatisierte Aktionen ausführen – eine E-Mail senden, ein paar Tage warten, die Person zu einer Gruppe hinzufügen – damit Arbeitsabläufe sowohl die menschliche Nachfassung als auch die Routineaufgaben erledigen. Arbeitsabläufe erweitern [Aufgaben](./tasks.md) zu einer Drag-and-Drop-Kanban-Tafel, damit niemand durch die Ritzen fällt.

</div>

<div class="prereqs">
<h4>Bevor du anfängst</h4>

- Stelle sicher, dass die Personen, die du verfolgen möchtest, in B1 Admin vorhanden sind
- Mache dich damit vertraut, wie [Aufgaben](./tasks.md) funktionieren, da jede Karte auf einer Tafel eine Aufgabe ist
- Um die Aktion **E-Mail senden** zu verwenden, erstelle zunächst die E-Mail-Vorlagen, die du senden möchtest (verwaltet unter **Messaging → Vorlagen verwalten**)
- Du benötigst die entsprechende Berechtigung für Aufgaben. Das Anzeigen, Bearbeiten von Karten und das Verwalten von Arbeitsabläufen sind separate Berechtigungsstufen (siehe [Rollen & Berechtigungen](../settings/roles-permissions.md))

</div>

## Arbeitsabläufe anzeigen

Navigiere zu **Dienstleistung** und wähle **Arbeitsabläufe** aus dem Menü. Du siehst deine Arbeitsabläufe aufgelistet und nach Kategorie gruppiert, wobei aktive Arbeitsabläufe hervorgehoben sind. Klicke auf einen Arbeitsablauf, um seine Tafel zu öffnen.

## Einen Arbeitsablauf erstellen

1. Klicke auf der Seite Arbeitsabläufe auf **Arbeitsablauf hinzufügen**.
2. Wähle aus, wie du anfangen möchtest:
   - **Leerer Arbeitsablauf** – starten Sie von vorne und bauen Sie Ihre eigenen Schritte auf.
   - **Aus einer Vorlage** – beginne mit einem vorgefertigten Satz von Schritten, den du bearbeiten kannst. Integrierte Vorlagen umfassen:
     - **Nachbearbeitung für neue Besucher** – Willkommensmitteilung senden → Persönlicher Anruf → Zum nächsten Schritt einladen → Verbunden
     - **Mitgliedschaftsklasse** – Interesse ausdrücken → Zur Klasse anmelden → Klasse besuchen → Mitgliedschaft abschließen
     - **Danksagung für erstmalige Spender** – Danksagung senden → Spendenwirkung teilen → Verwaltet
3. Gib dem Arbeitsablauf einen **Namen**.
4. Weise optional eine **Kategorie** zu, um verwandte Arbeitsabläufe zu gruppieren. Du kannst direkt aus dem Dropdown eine neue Kategorie erstellen.
5. Lasse den Arbeitsablauf **Aktiv**, damit Personen hinzugefügt werden können, oder setze ihn auf **Inaktiv**, um ihn aus den Arbeitsablauf-Hinzufügungslisten auszublenden.
6. Klicke auf **Speichern**.

:::tip
Nutze die Schaltfläche **Duplizieren** in der Arbeitsabläufe-Liste, um einen bestehenden Arbeitsablauf zu kopieren – einschließlich seiner Schritte, automatisierten Aktionen und Weiterleitung – als Ausgangspunkt für einen neuen Arbeitsablauf.
:::

## Die Tafel mit Schritten erstellen

Jede Arbeitsablauf-Tafel besteht aus **Schritten**, die von links nach rechts als Spalten angezeigt werden. Öffne einen Arbeitsablauf und verwende **Schritt hinzufügen**, um jede Phase deines Prozesses zu erstellen.

Wenn du einen Schritt hinzufügst oder bearbeitest, kannst du konfigurieren:

- **Schrittname** – die Spaltenüberschrift (z. B. „Willkommensanruf" oder „Wartet auf Anmeldung").
- **Fällig in (Tage)** – legt automatisch ein Fälligkeitsdatum fest, wenn eine Karte diesen Schritt betritt. Karten, die nach ihrem Fälligkeitsdatum liegen, werden als **Überfällig** gekennzeichnet.
- **Standard-Bearbeiter** – die Person oder Gruppe, der neue Karten in diesem Schritt automatisch zugewiesen werden.
- **Automatisierte Aktionen** – Dinge, die das System von selbst tut, wenn eine Karte ankommt (siehe unten).
- **Weiterleitung** – wohin die Karte geht, wenn sie den Schritt verlässt (siehe [Routing](#routing-cards-with-outcomes-and-conditions)).

Ziehe Schrittspalten in die Reihenfolge, die deinen Prozess entspricht. Die Reihenfolge definiert auch den Standardweg, den eine Karte nimmt, wenn keine andere Weiterleitung zutrifft.

:::info
Speichere zunächst einen neuen Schritt. Automatisierte Aktionen und Weiterleitung sind an den Schritt gebunden, daher entsperrt der Editor diese Bereiche, sobald der Schritt vorhanden ist.
:::

## Automatisierte Aktionen

Jeder Schritt kann eine Liste von **automatisierten Aktionen** enthalten, die von selbst ablaufen, in dem Moment, in dem eine Karte **den Schritt betritt** – bevor jemand sie anfasst. So kann ein Schritt sowohl einen Freiwilligen auffordern *als auch* die Routineaufgaben rund um die Nachfassung erledigen.

Öffne im Schritt-Editor **Automatisierte Aktionen**, klicke auf **Aktion hinzufügen**, wähle einen Typ, fülle seine Einstellungen aus und klicke auf das Speichersymbol für diese Aktion. Füge so viele hinzu wie nötig; sie werden **von oben nach unten der Reihe nach** ausgeführt.

| Aktion | Was sie tut |
|---|---|
| **E-Mail senden** | Sendet der Person eine von dir gewählte E-Mail-Vorlage. Du kannst die Betreffzeile überschreiben. |
| **Warten** | Pausiert die Karte für eine Anzahl von Tagen, bevor es weitergeht (siehe unten). |
| **Zur Gruppe hinzufügen** | Fügt die Person zu einer [Gruppe](../groups/index.md), die du auswählst, hinzu. |
| **Zu Arbeitsablauf hinzufügen** | Startet die Person mit einem anderen Arbeitsablauf – nützlich zum Übergeben zwischen Prozessen. |
| **Notiz hinzufügen** | Zeichnet eine Notiz in der Historie der Karte auf. |
| **Feld einstellen** | Aktualisiert ein Feld in der Personenakte: Mitgliedschaftsstatus, Familienstand, Geschlecht, Stadt, Bundesland oder Postleitzahl. |
| **Webhook** | Sendet die Details der Karte an eine externe Webadresse (URL), die du zur Verbindung mit anderen Systemen angibst. |

Nachdem alle Aktionen eines Schritts abgeschlossen sind, **ruht die Karte auf dem Schritt**, damit eine Person sie bearbeiten kann – es sei denn, der Schritt hat eine automatische Route, die sie weiterleitet (siehe [Vollständig automatisierte Schritte](#fully-automated-steps)).

:::info
Automatisierte Aktionen werden nur ausgeführt, wenn eine Karte durch den normalen Fluss ankommt – wenn sie zuerst hinzugefügt wird, wenn ein Ergebnis oder eine automatische Route sie hereinbringt oder nachdem ein Warten endet. Sie werden **nicht erneut ausgeführt**, wenn ein Mitarbeiter eine Karte manuell auf den Schritt zieht oder zurücksendet, daher erhält eine Person nicht zweimal die gleiche E-Mail.
:::

### E-Mail senden

Wähle **E-Mail senden**, wähle eine deiner E-Mail-Vorlagen und tippe optional ein benutzerdefiniertes Betreff ein. Wenn eine Karte den Schritt betritt, erhält die Person automatisch diese E-Mail. (Wenn die Person keine E-Mail-Adresse in der Datei hat, überspringt der Schritt diese Aktion einfach.)

:::info
Arbeitsablauf-E-Mails werden nur versendet, nachdem deine Kirche zum Versand von Gruppen-E-Mails genehmigt wurde, und sie zählen zum täglichen E-Mail-Limit deiner Kirche. Siehe [Aktivierung von Gruppen-E-Mail für deine Kirche](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Ein paar Tage warten (Drip-Sequenzen)

Die Aktion **Warten** hält eine Karte für die Anzahl der Tage an, die du festlegst. Während es wartet, wird die Karte als **Schlummend** angezeigt. Wenn das Warten vorbei ist:

1. Alle **verbleibenden Aktionen auf dem gleichen Schritt** werden ausgeführt – damit du einen Drip wie **E-Mail senden → 3 Tage warten → Erinnerungs-E-Mail senden** erstellen kannst.
2. Dann, wenn der Schritt eine automatische Route hat, wird die Karte weiterleitet; sonst ruht sie auf dem Schritt, damit eine Person sie aufgreift.

:::tip
Ein **Warten** ganz am Anfang eines Schritts ist eine einfache Möglichkeit, eine Karte zu "halten", bevor sie einem Freiwilligen angezeigt wird – zum Beispiel, *7 Tage warten, dann kontaktiert dich ein Coach*.
:::

## Menschen als Karten hinzufügen

Es gibt mehrere Möglichkeiten, Menschen auf eine Tafel zu bringen:

- **Vom Board** – Klicke auf **Karte hinzufügen** am unteren Ende einer Schrittspalte und wähle eine Person. Du kannst auch eine Gruppe auswählen, und jedes Mitglied dieser Gruppe wird als Karte hinzugefügt.
- **Aus dem Personensatz** – Nutze **Zu Arbeitsablauf hinzufügen** auf der Seite einer Person, um sie auf einen Arbeitsablauf zu setzen.
- **Aus der Personensuche** – Wähle mehrere Personen aus und nutze die Sammelaktion **Zu Arbeitsablauf hinzufügen**, um sie alle gleichzeitig hinzuzufügen.
- **Automatisch mit einem Auslöser** – Füge Menschen hinzu, wenn etwas passiert, wie eine Formulareinreichung oder ein erstes Geschenk (siehe [Auslöser](#triggers) unten).

## Die Tafel bearbeiten

Öffne einen Arbeitsablauf, um seine Tafel zu sehen. Jede Karte zeigt den Namen der Person, wem sie zugewiesen ist, und einen Fälligkeitstermin oder Status-Chip (**Überfällig** oder **Schlummend**). Eine Schrittspalte zeigt auch kleine Abzeichen für alle automatisierten Aktionen, die sie ausführt, und Anmerkungen für ihre Weiterleitung, was dir einen schnellen Überblick darüber gibt, wie Karten fließen.

- **Eine Karte verschieben** – Ziehe eine Karte von einer Spalte zur nächsten, während die Person voranschreitet.
- **Eine Karte öffnen** – Doppelklicke auf eine Karte (oder klicke darauf), um ihr Detail-Drawer zu öffnen, in dem du den Schritt ändern, neu zuweisen, Notizen hinzufügen und überprüfen kannst, was bereits passiert ist.

Aus dem Karten-Drawer kannst du:

- **Zuweisen** die Karte einer anderen Person oder Gruppe.
- **Schlummern** die Karte für 1 Tag, 3 Tage oder 1 Woche, um sein Fälligkeitsdatum vorübergehend auszublenden.
- **Zurücksendet** zum vorherigen Schritt oder **Überspringen** zum nächsten Schritt.
- **Zuweisung fixieren** – behalte den gleichen Besitzer auf der Karte, auch wenn sie zwischen Schritten wandert. Standardmäßig wird eine Karte, die zu einem neuen Schritt verschoben wird, dem Standard-Bearbeiter dieses Schritts zugewiesen; Das Fixieren behält die aktuelle verantwortliche Person während des gesamten Prozesses bei.
- **Fertigstellen** die Karte zum Abschluss oder wähle einen **Ergebnis**-Button, wenn der Schritt konfigurierte Ergebnisse hat (siehe [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Notizen hinzufügen** und die **Verlaufsverlauf** der Karte überprüfen – einschließlich eines Protokolls der automatisierten Aktionen, die ausgeführt wurden (gesendete E-Mails, Wartezeiten usw.).

### Sammelaktionen

Wähle die Kontrollkästchen auf mehreren Karten aus, um sie gemeinsam zu bearbeiten. Es wird eine Symbolleiste angezeigt, mit der du alle ausgewählten Karten gleichzeitig **Fertigstellen**, **Schlummern**, **Neu zuweisen** oder **Verschieben** kannst zu einem anderen Schritt.

## Routing-Karten mit Ergebnissen und Bedingungen

Das Routing steuert, wohin eine Karte geht, wenn sie einen Schritt verlässt. Öffne den Editor eines Schritts, um zwei Arten von Routing zu konfigurieren.

### Ergebnis-Buttons

Ergebnisse sind Buttons, die im Karten-Drawer angezeigt werden, wenn du eine Karte auf diesem Schritt fertigstellst. Anstelle eines einzelnen **Fertigstellen**-Buttons kannst du Optionen wie „Einer Gruppe beigetreten" oder „Nicht interessiert" anbieten. Jedes Ergebnis kann:

- Die Karte zu **einem anderen Schritt** in diesem Arbeitsablauf senden,
- **Die Karte an** einen völlig anderen Arbeitsablauf übergeben oder
- **Die Karte schließen**.

Dies ermöglicht, dass eine Entscheidung die Person verschiedene Pfade hinunter verzweigt.

### Automatisches Routing (bedingt)

Automatische Routen verschieben eine Karte **in dem Moment, in dem sie einen Schritt betritt** (und nachdem ihre automatisierten Aktionen abgeschlossen sind), ohne dass jemand klickt, wenn die Person einem Satz von Bedingungen entspricht. Füge eine Route hinzu, wähle den Zielschritt und definiere eine oder mehrere **Bedingungen** (zum Beispiel den Campus einer Person, Alter oder Mitgliedschaftsstatus). Eine Route ohne Bedingungen passt zu jedem.

:::info
Auf der Tafel zeigt jede Schrittspalte kleine Anmerkungen an, die ihre Weiterleitung beschreiben – zum Beispiel eine Ergebnis-Bezeichnung oder „wenn passt", gefolgt von einem Pfeil zum Zielschritt oder Arbeitsablauf.
:::

## Vollständig automatisierte Schritte

Du kannst einen Schritt völlig von selbst laufen lassen, ohne dass jemand ihn bearbeitet. Gib dem Schritt seine **automatisierten Aktionen** und füge eine **automatische Route** (ohne Bedingungen) ein, die auf den nächsten Schritt zeigt. Wenn eine Karte eintritt, werden die Aktionen ausgeführt, und dann leitet die Route sie sofort weiter – die Karte geht direkt durch.

:::tip
Kombiniere dies mit **Warten**: *Willkommensmitteilung senden → 3 Tage warten → automatisch zum Schritt „Persönlicher Anruf" vorrücken.* Die E-Mail und das Timing werden für dich erledigt, und ein Freiwilliger sieht die Karte nur, wenn es Zeit für die menschliche Note ist.
:::

## Auslöser

Auslöser fügen Menschen automatisch zu einem Arbeitsablauf hinzu, wenn etwas passiert, damit du Karten nie von Hand hinzufügen musst. Klicke auf einer Arbeitsablauf-Tafel auf die Registerkarte **Auslöser** und dann auf **Auslöser hinzufügen**. Es gibt zwei Arten:

### Event-Auslöser

Feuern sofort, wenn sich ein Satz in B1 ändert. Wähle das Event und füge optional **Bedingungen** hinzu, damit nur übereinstimmende Personen hinzugefügt werden:

- **Person · Erstellt / Aktualisiert** – z. B. füge jeden hinzu, dessen Status *Besucher* wird.
- **Spende · Erstellt** – z. B. füge ein erstmaliges oder großes Geschenk zu einem Dankbarkeits-Arbeitsablauf hinzu (passt auf Betrag, Fonds oder Methode).
- **Gruppe · Mitglied beigetreten** / **Gruppe · Erstellt**.
- **Formular · Eingereicht** – füge jeden hinzu, der ein ausgewähltes Formular einreicht (großartig für eine „Ich bin neu" oder „Verbindung" Karte).

### Zeitplan-Auslöser

Laufe auf wiederkehrender Basis – täglich, wöchentlich, monatlich oder jährlich – gegen einen Satz von Bedingungen. Nutze diese für zeitbasierte Außenarbeit wie *jeder, dessen Mitgliedschaftsjubiläum heute ist* oder ein *monatliches* Check-in.

Für jeden Auslöser kannst du auch einstellen:

- Der **Eintrittsschritt**, auf dem die neue Karte startet (standardmäßig der erste Schritt).
- **Einmal pro Person** – daher wird die gleiche Person nicht zweimal durch den Auslöser zum Arbeitsablauf hinzugefügt.
- **Aktiv** – schalte den Auslöser ein oder aus, ohne ihn zu löschen.

:::tip
Paare einen **Formular · Eingereicht**-Auslöser mit der Vorlage **Nachbearbeitung für neue Besucher**, um dein „Verbindungskarte" oder „Ich bin neu"-Formular in eine automatische Nachbearbeitungs-Pipeline zu verwandeln.
:::

## Meine Karten

Freiwillige und Mitarbeiter müssen nicht jede Tafel durchsuchen, um ihre Arbeit zu finden. Die Seite **Meine Karten** (verlinkt von der Arbeitsabläufe-Seite) listet jede Karte, die dem aktuellen Benutzer zugewiesen ist, über alle Arbeitsabläufe hinweg auf. Durch Klicken auf eine Karte wird die Tafel geöffnet, der sie angehört.

## Berichte

Öffne einen Arbeitsablauf und klicke auf **Berichte**, um Analysen für diesen Arbeitsablauf zu sehen:

- **Überfällig** – die Anzahl der Karten nach ihrem Fälligkeitsdatum.
- **Karten pro Schritt** – wie viele Karten derzeit auf jedem Schritt sitzen, als Säulendiagramm angezeigt.
- **Fertiggestellt (30 Tage)** – Durchsatz in den letzten 30 Tagen, als Liniendiagramm angezeigt.

Nutze diese, um Engpässe zu finden – zum Beispiel einen Schritt, wo Karten aufgestapelt werden und nie vorrücken.

## Verwandte Artikel

- [Aufgaben](./tasks.md) – die einzelnen Aktionselemente, auf denen Arbeitsablauf-Karten aufgebaut sind
- [Formulare](../forms/index.md) – erstelle die Formulare, die Arbeitsabläufe auslösen können
- [Gruppen](../groups/index.md) – die Gruppen, die eine "Zur Gruppe hinzufügen"-Aktion Menschen in platzieren kann
- [Rollen & Berechtigungen](../settings/roles-permissions.md) – steuere, wer Arbeitsabläufe anzeigen, bearbeiten und verwalten kann
