---
title: "Serveradministration"
---

# Serveradministration

<div class="article-intro">

Serveradministrationsfunktionen in ChurchApps sind nur für Benutzer mit der Berechtigung **Server.Admin** verfügbar. Diese Tools werden für Plattformbetrieb, Support und Fehlerbehebung über alle Kirchen im System hinweg verwendet.

</div>

:::warning Zugriff eingeschränkt
Die auf dieser Seite beschriebenen Funktionen erfordern die Berechtigung **Server.Admin** und sind für reguläre Kirchenadministratoren nicht verfügbar. Sie sind nur für Plattformbetreiber und Support-Personal vorgesehen.
:::

## Zugriff auf Server-Admin

Benutzer mit Server.Admin-Berechtigung können von B1 Admin aus auf den Server-Admin-Panel zugreifen:

1. Melden Sie sich bei [admin.b1.church](https://admin.b1.church) an
2. Öffnen Sie **Einstellungen** und klicken Sie dann im Menü Einstellungen auf **Server Admin**. (Sie können auch direkt zu `admin.b1.church/admin` gehen.)
3. Der Server-Admin-Panel hat Abschnitte für Kirchen, Benutzer, Benutzer nachahmen, Hintergrund-Aufträge, Commons, Verwendungstrends, Übersetzungs-Lookups, Server-Gesundheit und Datenbank-Migrationen

## Benutzer-Nachahmer

Die Nachahmer-Funktion ermöglicht es Server-Administratoren, sich für Support- und Fehlerbehebungszwecke als anderer Benutzer anzumelden. Dies ist nützlich, wenn Sie Probleme untersuchen, die von Benutzern gemeldet wurden, oder Kirchen helfen, ihre Systeme zu konfigurieren.

### Wie man einen Benutzer nachahmt

1. Öffnen Sie den Abschnitt **Benutzer nachahmen** des Server-Admin-Panels
2. Geben Sie den Namen oder die E-Mail-Adresse des Benutzers in das Suchfeld ein
3. Klicken Sie auf **Suchen** oder drücken Sie Enter
4. Klicken Sie in den Suchergebnissen auf den Benutzer, den Sie nachahmen möchten
5. Bestätigen Sie die Nachahmung im angezeigten Dialog
6. Sie werden als dieser Benutzer angemeldet und zu seinem Konto umgeleitet

### Wichtige Hinweise

- Die Nachahmung erstellt eine neue Sitzung mit den Berechtigungen und dem Kirchenzugriff des Zielbenutzers
- Ihre ursprüngliche Admin-Sitzung endet, wenn Sie einen anderen Benutzer nachahmen
- Alle Aktionen, die während der Nachahmung durchgeführt werden, werden im Audit-Protokoll protokolliert
- Um zu Ihrem Admin-Konto zurückzukehren, melden Sie sich ab und melden Sie sich mit Ihren Anmeldedaten wieder an
- Verwenden Sie die Nachahmung nur wenn notwendig für Support-Zwecke und informieren Sie Benutzer immer, wenn Sie auf ihre Konten für Support zugreifen

### API-Endpunkt

Die Nachahmer-Funktion wird durch den Endpunkt `/users/:userId/impersonate` in der Membership-API unterstützt. Siehe [Membership-Endpunkte](/docs/developer/api/endpoints/membership#users) für technische Details.

### Sicherheitsaspekte

- Die Nachahmung erfordert die Berechtigung Server.Admin – diese Berechtigung sollte sparsam und nur an vertraute Plattformbetreiber gewährt werden
- Alle Nachahmer-Ereignisse werden mit der Admin-Benutzer-ID und der Zielbenutzer-ID protokolliert
- Kirchen werden nicht benachrichtigt, wenn Nachahmung auftritt, daher sollten Sie klare Richtlinien für wann und wie diese Funktion verwendet werden sollte, aufstellen
- Erwägen Sie, Nachahmer-Ereignisse in Ihrem Support-Ticketing-System zu dokumentieren, um Rechenschaftspflicht sicherzustellen

## Commons-Moderation

Commons ist die gemeinsame Moderationswarteschlange für benutzereingereichte Inhalte über alle Produkte hinweg – WorshipCommons-Songs, Lessons.church-Lektionen, FreeShow-Vorlagen und B1-Website-Builder-Vorlagen fließen alle durch die gleiche Warteschlange statt separater Pro-Produkt-Review-Tools.

### Zugriff auf Commons

1. Navigieren Sie zur Registerkarte **Commons** im Server-Admin-Panel.
2. Sie sehen drei Unter-Registerkarten: **Warteschlange**, **Berichte** und **Vermögenswerte**.

Eine begrenzte Rolle **music editor** kann auch die Registerkarte Warteschlange sehen, ist aber daran gehindert, Einsendungen genehmigt zu werden, die Chanson-Rechte oder Lizenzen ändern.

### Warteschlange

Die Warteschlange listet jeden ausstehenden Eintrag über alle Produkte auf, filterbar nach Produkt und Asset-Typ. Jede Zeile zeigt, ob die Einreichung ein neues Vermögenswert ist, eine Bearbeitung durch seinen ursprünglichen Autor oder eine Bearbeitung durch einen Dritten, zusammen mit der Genehmigungsgeschichte des Einreichers und wie lange die Einreichung wartet (markiert, sobald sie 72 Stunden überschreitet).

Klicken Sie auf **Überprüfen**, um ein Schubfach mit Feld-Ebene-Unterschieden, Dateivorschauen und einer eingebetteten Vorschau des Elements zu öffnen. Verwenden Sie die Tastaturen-Verknüpfungen **a**/**r**, um zu genehmigen oder abzulehnen, und **j**/**k**, um zu dem nächsten oder vorherigen Eintrag zu wechseln, ohne das Schubfach zu verlassen. Das Ablehnen erfordert die Auswahl eines Grundes (z.B. Qualität, Duplikat, Lizenzierung, ccli, ai oder off-topic) und eine Notiz.

### Berichte

Die Registerkarte Berichte behandelt Urheberrechts- und Richtlinien-/Qualitätsberichte, die gegen bereits veröffentlichte Vermögenswerte eingereicht wurden, geteilt in separate Urheberrechts- und Richtlinien & Andere Warteschlangen plus eine gelöste Historie. Anspruch auf einen Bericht, um es zu beginnen, dann es mit einer Auflösung (bestätigt, abgewiesen oder Duplikat) und einer Aktion (keine, entfernen oder entfernen) lösen.

### Vermögenswerte

Die Registerkarte Vermögenswerte ist ein durchsuchbarer Browser von veröffentlichtem Inhalt mit Aktionen zum **Feature** eines Vermögenswerts (hebt es auf der Startseite des Produkts hervor), **Unzuveröffentlichung**/**Wiederveröffentlichung** oder **Entfernen** (mit einem Urheberrechts- oder Richtliniengrund).

Für Songs speziell ist dies auch dort, wo ein Song **sonntags-fertig** wird und berechtigt ist, in der Song-Suche einer Kirche B1 Admin zu erscheinen: ein Reviewer öffnet das Vermögenswert und markiert jeden veröffentlichten Schlüssel als **Gehört**, nachdem er es gehört hat und den Score, Akkorde und Folien alle bestätigt hat. Ein Song wird nur sonntags-fertig, sobald jeder Schlüssel abgehakt ist.

:::info
Commons-Moderation ist nur Mitarbeitern – einzelne Kirchen sehen diese Warteschlange nie. Der einzige Ort, wo die B1 Admin einer einzelnen Kirche Commons-Daten berührt, ist der Abschnitt „WorshipCommons – kostenlos" der [Song-Suche](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), die nur Songs Flächen, die bereits diesen Review-Prozess durchlaufen haben.
:::

Siehe die Seite [Content Commons-Architektur](/docs/developer/architecture/commons) für das zugrundeliegende Datenmodell und die Einreichungs-Lebenszyklus.

## Genehmigung von Gruppen-E-Mails

Kirchen können keine Kirchen-geschriebenen E-Mails (Gruppen-E-Mails, Formular-Folgeuppen, Workflow-E-Mails und Konto-Einladungen) senden, bis ein Server-Administrator diese genehmigt hat. Dies verhindert, dass Bot-registrierte Kirchen die gemeinsame ChurchApps-Sendungsadresse für Spam verwenden.

1. Öffnen Sie die Registerkarte **Kirchen** im Server-Admin-Panel.
2. Jede Kirche zeigt einen **Gruppen-E-Mail**-Chip: **Genehmigt** (grün) oder **Nicht genehmigt** (unklar).
3. Klicken Sie auf den Chip und bestätigen Sie, um die Kirche zu genehmigen, oder zu widerrufen Sie eine Genehmigung.

Kirchenpersonal bittet um Genehmigung mit der Schaltfläche **Überprüfung anfordern** in B1 Admin's E-Mail-Send-Dialog. Die Anfrage wird an die Support-Adresse per E-Mail gesendet und listet den Kirchennamen, die ID, das Registrierungsdatum, den Ort und wer gefragt hat. Eine Kirche kann eine Anfrage pro Woche senden. Siehe [Kirchenautoren-E-Mail-Limits](/docs/developer/architecture/notifications#church-authored-email-limits) für die tägliche Zulage und die automatische Pause bei Bounces und Beschwerden.

## Datenbank-Migrationen

Deploys ändern die Datenbank nicht. Die gehosteten Datenbanken akzeptieren nur Verbindungen von innen in das Netz der Api, daher wenden nach einer Veröffentlichung, die eine Migration hinzufügt, ein Server-Administrator es von der Registerkarte **Datenbank-Migrationen** an. (Self-Hosted Docker-Installationen führen weiterhin Migrationen automatisch aus, wenn der Api-Container startet.)

Die Registerkarte zeigt die aktuelle Umgebung und eine Zeile pro Modul (Mitgliedschaft, Anwesenheit, Geben usw.) mit seinem Status, die Anzahl der angewendeten und ausstehenden Migrationen und die zuletzt angewendete.

- **Ausstehende Migrationen ausführen** wendet jede ausstehende Migration an, ein Modul nach dem anderen, der Reihenfolge nach. Es stoppt beim ersten Fehler und zeigt, was für jedes Modul angewendet wurde.
- Ein Modul markiert **Keine Historie** hat eine Datenbank, die das Migrations-Tracking voraus ist. Es wird nie automatisch ausgeführt, da das alte Daten-Migrationen über Live-Tabellen widerholen würde. Klicken Sie stattdessen auf **Schema überprüfen** auf diesem Modul. Die Api vergleicht die Tabellen, Spalten und Indizes, die jede Migration erzeugt, mit der Live-Datenbank und markiert jede Migration **Bereits angewendet**, **Fehlend**, **Teilweise angewendet** oder **Nur Daten**. Nichts wird durch die Überprüfung geändert.
- In den Überprüfungs-Ergebnissen schreibt **Als bereits angewendet registrieren** die erkannten Migrationen in die Migrations-Historie, ohne sie auszuführen. Fehlende bleiben ausstehend und können dann normal ausgeführt werden.
- Eine **Teilweise angewendete** Migration blockiert Aufzeichnung. Wenn die Migration sicher erneut ausgeführt werden kann (lesen Sie sie zuerst), aktivieren Sie **Erneut ausführen**, damit sie ausstehend bleibt und erneut von oben ausgeführt wird.

Der Server-Admin-Panel und die CLI (`yarn migrate:up`) verwenden den gleichen Kysely-Migrator und die `kysely_migration`-Tabelle, daher sind sie immer einig, was angewendet wurde. Die Backing-Endpunkte sind `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` und `POST .../:module/baseline`, alle nur Server.Admin.

## Zugehörige Seiten

- [Authentifizierung & Berechtigungen](/docs/developer/api/endpoints/authentication) — Berechtigungsmodell und JWT-Authentifizierung
- [Membership-Endpunkte](/docs/developer/api/endpoints/membership) — Benutzer- und Kirchenverwaltungs-API
- [Audit-Protokoll](/docs/b1-admin/reports/audit-log) — Ansicht-Aktivitätsprotokolle für eine Kirche
- [Content Commons-Architektur](/docs/developer/architecture/commons) — Gemeinsames Asset-Modell und Moderations-Lebenszyklus
