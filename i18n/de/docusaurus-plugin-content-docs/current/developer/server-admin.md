---
title: "Serververwaltung"
---

# Serververwaltung

<div class="article-intro">

Funktionen der Serververwaltung in ChurchApps sind nur für Benutzer mit der Berechtigung **Server.Admin** verfügbar. Diese Werkzeuge dienen dem Plattformbetrieb, dem Support und der Fehlerbehebung für alle Kirchen im System.

</div>

:::warning Zugriff eingeschränkt
Die auf dieser Seite beschriebenen Funktionen erfordern die Berechtigung **Server.Admin** und sind für reguläre Kirchenadministratoren nicht verfügbar. Sie sind ausschließlich für Plattformbetreiber und Supportmitarbeitende vorgesehen.
:::

## Zugriff auf die Serververwaltung

Benutzer mit der Berechtigung Server.Admin können das Serververwaltungs-Panel über B1 Admin öffnen:

1. Melden Sie sich unter [admin.b1.church](https://admin.b1.church) an.
2. Öffnen Sie das [Sprungmenü](../b1-admin/introduction.md#getting-around-with-the-jump-menu), klappen Sie **Einstellungen** auf und klicken Sie auf **Server Admin**. (Sie können auch direkt `admin.b1.church/admin` aufrufen.)
3. Das Serververwaltungs-Panel listet seine Bereiche links in drei Gruppen auf: **Verzeichnis** (Kirchen, Benutzer, Benutzer übernehmen), **Betrieb** (Hintergrundjobs, Commons, Nutzungstrends) und **System** (Übersetzungsabfragen, Serverzustand, Datenbankmigrationen)

## Benutzer übernehmen (Impersonation)

Mit der Funktion zur Benutzerübernahme können Serveradministratoren zu Support- und Fehlerbehebungszwecken als anderer Benutzer angemeldet werden. Das ist nützlich, um von Benutzern gemeldete Probleme zu untersuchen oder Kirchen bei der Einrichtung ihrer Systeme zu helfen.

### So übernehmen Sie einen Benutzer

1. Öffnen Sie den Bereich **Benutzer übernehmen** des Serververwaltungs-Panels.
2. Geben Sie den Namen oder die E-Mail-Adresse des Benutzers in das Suchfeld ein.
3. Klicken Sie auf **Suchen** oder drücken Sie die Eingabetaste.
4. Klicken Sie in den Suchergebnissen auf den Benutzer, den Sie übernehmen möchten.
5. Bestätigen Sie die Übernahme im angezeigten Dialog.
6. Sie sind dann als dieser Benutzer angemeldet und werden zu dessen Konto weitergeleitet.

### Wichtige Hinweise

- Bei der Übernahme wird eine neue Sitzung mit den Berechtigungen und dem Kirchenzugang des Zielbenutzers erstellt.
- Ihre ursprüngliche Administratorsitzung endet, sobald Sie einen anderen Benutzer übernehmen.
- Alle Aktionen, die während der Übernahme ausgeführt werden, werden im Prüfprotokoll erfasst.
- Um zu Ihrem Administratorkonto zurückzukehren, melden Sie sich ab und mit Ihren Zugangsdaten wieder an.
- Verwenden Sie die Übernahme nur, wenn es für den Support nötig ist, und informieren Sie Benutzer stets, wenn Sie für den Support auf ihr Konto zugreifen.

### API-Endpunkt

Die Übernahme-Funktion basiert auf dem Endpunkt `/users/:userId/impersonate` der Membership-API. Technische Details finden Sie unter [Membership-Endpunkte](/docs/developer/api/endpoints/membership#users).

### Sicherheitshinweise

- Die Übernahme erfordert die Berechtigung Server.Admin. Diese sollte sparsam und nur vertrauenswürdigen Plattformbetreibern erteilt werden.
- Alle Übernahme-Ereignisse werden mit der ID des Administrators und der ID des Zielbenutzers protokolliert.
- Kirchen werden bei einer Übernahme nicht benachrichtigt; legen Sie daher klare Richtlinien fest, wann und wie diese Funktion eingesetzt werden darf.
- Erwägen Sie, Übernahme-Ereignisse im Ticketsystem des Supports zu dokumentieren, um die Nachvollziehbarkeit sicherzustellen.

## Moderation der Commons

Commons ist die gemeinsame Moderationswarteschlange für von Nutzern eingereichte Inhalte aller Produkte. WorshipCommons-Lieder, Lessons.church-Lektionen, FreeShow-Vorlagen und Vorlagen des B1-Website-Builders laufen alle über dieselbe Warteschlange statt über getrennte Prüfwerkzeuge je Produkt.

### Zugriff auf Commons

1. Öffnen Sie den Reiter **Commons** im Serververwaltungs-Panel.
2. Sie sehen drei Unterreiter: **Warteschlange**, **Meldungen** und **Inhalte**.

Eine eingeschränkte Rolle **Musikredakteur** kann ebenfalls den Reiter Warteschlange sehen, ist aber davon ausgeschlossen, Einreichungen zu genehmigen, die die Rechte oder Lizenzen eines Liedes ändern.

### Warteschlange

Die Warteschlange listet alle ausstehenden Einreichungen aller Produkte auf, filterbar nach Produkt und Inhaltstyp. Jede Zeile zeigt, ob die Einreichung ein neuer Inhalt, eine Änderung durch den ursprünglichen Autor oder eine Änderung durch Dritte ist, dazu die bisherige Genehmigungsbilanz der einreichenden Person und wie lange die Einreichung wartet (ab 72 Stunden markiert).

Klicken Sie auf **Prüfen**, um ein Seitenfenster mit feldbezogenen Unterschieden, Dateivorschauen und einer eingebetteten Vorschau des Inhalts im Nur-Lese-Modus zu öffnen. Mit den Tastenkürzeln **a**/**r** genehmigen oder lehnen Sie ab, mit **j**/**k** wechseln Sie zur nächsten oder vorherigen Einreichung, ohne das Seitenfenster zu verlassen. Beim Ablehnen wählen Sie einen Grund (zum Beispiel quality, duplicate, licensing, ccli, ai oder off-topic) und geben eine Notiz an.

### Meldungen

Der Reiter Meldungen bearbeitet Urheberrechts- sowie Richtlinien- und Qualitätsmeldungen zu bereits veröffentlichten Inhalten. Sie sind auf getrennte Warteschlangen für Urheberrecht sowie Richtlinien und Sonstiges sowie einen Verlauf der erledigten Meldungen aufgeteilt. Übernehmen Sie eine Meldung, um mit der Bearbeitung zu beginnen, und erledigen Sie sie danach mit einer Entscheidung (bestätigt, verworfen oder Duplikat) und einer Maßnahme (keine, Veröffentlichung zurückziehen oder entfernen).

### Inhalte

Der Reiter Inhalte ist eine durchsuchbare Übersicht veröffentlichter Inhalte mit Aktionen, um einen Inhalt **hervorzuheben** (er wird auf der Startseite des Produkts angezeigt), ihn **zurückzuziehen** bzw. **erneut zu veröffentlichen** oder ihn **zu entfernen** (mit einem Urheberrechts- oder Richtliniengrund).

Bei Liedern wird hier außerdem festgelegt, ob ein Lied **sonntagsbereit** wird und in der Liedsuche von B1 Admin einer Kirche erscheinen darf: Ein Prüfer öffnet den Inhalt und markiert jede veröffentlichte Tonart als **Angehört**, sobald er das Lied durchgehört und bestätigt hat, dass Noten, Akkorde und Folien vollständig sind. Ein Lied wird erst sonntagsbereit, wenn jede Tonart abgehakt ist.

:::info
Die Moderation der Commons ist nur für Mitarbeitende des Dienstes bestimmt — einzelne Kirchen sehen diese Warteschlange nie. Die einzige Stelle, an der B1 Admin einer einzelnen Kirche Commons-Daten berührt, ist der Bereich „WorshipCommons — kostenlos“ der [Liedersuche](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons); dort erscheinen nur Lieder, die diese Prüfung bereits durchlaufen haben.
:::

Das zugrunde liegende Datenmodell und den Lebenszyklus von Einreichungen beschreibt die Seite [Architektur der Content Commons](/docs/developer/architecture/commons).

## Genehmigung von Gruppen-E-Mails

Kirchen können von der Kirche verfasste E-Mails (Gruppen-E-Mails, Nachfass-E-Mails zu Formularen, Workflow-E-Mails und Kontoeinladungen) erst versenden, nachdem ein Serveradministrator sie genehmigt hat. So wird verhindert, dass per Bot registrierte Kirchen die gemeinsame Absendeadresse von ChurchApps für Spam missbrauchen.

1. Öffnen Sie den Reiter **Kirchen** im Serververwaltungs-Panel.
2. Jede Kirche zeigt einen Chip **Gruppen-E-Mail**: **Genehmigt** (grün) oder **Nicht genehmigt** (umrandet).
3. Klicken Sie auf den Chip und bestätigen Sie, um die Kirche zu genehmigen oder eine Genehmigung zu widerrufen.

Mitarbeitende einer Kirche beantragen die Genehmigung über die Schaltfläche **Prüfung anfordern** im Dialog „E-Mail senden“ von B1 Admin. Die Anfrage wird an die Support-Adresse gesendet und enthält Name, ID, Registrierungsdatum und Standort der Kirche sowie die Person, die sie angefordert hat. Eine Kirche kann pro Woche eine Anfrage senden. Das tägliche Kontingent und die automatische Pause bei Bounces und Beschwerden finden Sie unter [Limits für von der Kirche verfasste E-Mails](/docs/developer/architecture/notifications#church-authored-email-limits).

## Datenbankmigrationen {#database-migrations}

Der Workflow **Deploy Prod** wendet ausstehende Migrationen selbst an. Die gehosteten Datenbanken akzeptieren nur Verbindungen aus dem Netzwerk der API, daher kann ein GitHub-Runner sie nicht erreichen. Stattdessen ruft der Workflow direkt nach `serverless deploy` die Lambda-Funktion `migrate` der API auf (`api-Prod-migrate`). Diese führt die ausstehenden Migrationen aller Module mit demselben Runner aus wie dieser Reiter und lässt das Deployment fehlschlagen, wenn ein Modul einen Fehler meldet oder abgelehnt wird. **Rollback Prod** setzt nur den Lambda-Code zurück; bereits angewendete Migrationen bleiben angewendet. Der Reiter **Datenbankmigrationen** dient dazu, den Status zu prüfen, alles auszuführen, was ein Deployment nicht ausgeführt hat (zum Beispiel in der Demo-Umgebung, deren Deployment keine Migrationen ausführt), und Module ohne Verlauf zu initialisieren (Baselining). Selbst gehostete Docker-Installationen führen Migrationen weiterhin automatisch aus, sobald der API-Container startet.

Der Reiter zeigt die aktuelle Umgebung und je Modul (membership, attendance, giving usw.) eine Zeile mit dem Status, der Anzahl angewendeter und ausstehender Migrationen sowie der zuletzt angewendeten Migration.

- **Ausstehende Migrationen ausführen** wendet jede ausstehende Migration an, ein Modul nach dem anderen, in der richtigen Reihenfolge. Beim ersten Fehler wird abgebrochen, und für jedes Modul wird angezeigt, was angewendet wurde.
- Ein Modul mit der Markierung **Kein Verlauf** hat eine Datenbank, die älter ist als die Migrationsverfolgung. Es wird niemals automatisch ausgeführt, da alte Datenmigrationen sonst über die Live-Tabellen erneut ablaufen würden. Klicken Sie stattdessen bei diesem Modul auf **Schema prüfen**. Die API vergleicht die Tabellen, Spalten und Indizes, die jede Migration anlegt, mit der Live-Datenbank und markiert jede Migration als **Bereits angewendet**, **Fehlt**, **Teilweise angewendet** oder **Nur Daten**. Die Prüfung ändert nichts.
- In den Prüfergebnissen schreibt **Als bereits angewendet erfassen** die erkannten Migrationen in den Migrationsverlauf, ohne sie auszuführen (nach einer Bestätigung). Alles bis zur letzten Migration **Bereits angewendet** wird erfasst, einschließlich der **Nur Daten**-Migrationen in diesem Bereich; **Fehlt**-Migrationen bleiben ausstehend und können danach regulär mit **Ausstehende Migrationen ausführen** gestartet werden.
- Eine **Teilweise angewendete** Migration verhindert das Erfassen. Wenn die Migration gefahrlos erneut ausgeführt werden kann (lesen Sie sie vorher), setzen Sie das Häkchen bei **Erneut ausführen**, damit sie ausstehend bleibt und von vorne neu ausgeführt wird.

Das Serververwaltungs-Panel und die CLI (`yarn migrate:up`) verwenden denselben Kysely-Migrator und dieselbe Tabelle `kysely_migration`, sodass sie immer übereinstimmen, was bereits angewendet wurde. Die zugrunde liegenden Endpunkte sind `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` und `POST .../:module/baseline`, alle nur für Server.Admin.

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](/docs/developer/api/endpoints/authentication) — Berechtigungsmodell und JWT-Authentifizierung
- [Membership-Endpunkte](/docs/developer/api/endpoints/membership) — API für Benutzer- und Kirchenverwaltung
- [Audit-Protokoll](/docs/b1-admin/reports/audit-log) — Aktivitätsprotokolle für eine Kirche einsehen
- [Architektur der Content Commons](/docs/developer/architecture/commons) — gemeinsames Inhaltsmodell und Lebenszyklus der Moderation
