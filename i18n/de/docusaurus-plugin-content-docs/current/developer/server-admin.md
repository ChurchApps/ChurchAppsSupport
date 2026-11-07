---
title: "Serververwaltung"
description: "Nur für Server.Admin-Benutzer: Zwei-Faktor-Anmeldung zurücksetzen, Konten übernehmen, Commons moderieren und Kirchen-E-Mails in B1 Admin freigeben."
---

# Serververwaltung

<div class="article-intro">

Die Funktionen zur Serververwaltung in ChurchApps stehen nur Benutzern mit der Berechtigung **Server.Admin** zur Verfügung. Diese Werkzeuge dienen dem Betrieb der Plattform, dem Support und der Fehlersuche über alle Gemeinden im System hinweg.

</div>

:::warning Zugriff eingeschränkt
Die auf dieser Seite beschriebenen Funktionen erfordern die Berechtigung **Server.Admin** und stehen regulären Gemeindeadministratoren nicht zur Verfügung. Sie sind ausschließlich für Plattformbetreiber und Supportmitarbeitende bestimmt.
:::

## Zugriff auf die Serververwaltung

Benutzer mit der Berechtigung Server.Admin können das Panel der Serververwaltung über B1 Admin aufrufen:

1. Melden Sie sich unter [admin.b1.church](https://admin.b1.church) an.
2. Öffnen Sie das [Sprungmenü](../b1-admin/introduction.md#getting-around-with-the-jump-menu), klappen Sie **Settings** (Einstellungen) auf und klicken Sie auf **Server Admin**. (Sie können auch direkt `admin.b1.church/admin` aufrufen.)
3. Das Panel der Serververwaltung listet seine Bereiche links in drei Gruppen auf: **Directory** (Verzeichnis: Churches, Users, Impersonate User), **Operations** (Betrieb: Background Jobs, Commons, Usage Trends) und **System** (Translation Lookups, Server Health, Database Migrations)

## Zwei-Faktor-Anmeldung zurücksetzen

Wenn ein Benutzer die [Zwei-Faktor-Anmeldung](../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiviert hat und sowohl sein Telefon als auch seine Backup-Codes verloren hat, kann ein Server-Admin sie deaktivieren:

1. Öffnen Sie im Panel der Serververwaltung den Bereich **Users** und suchen Sie den Benutzer.
2. Benutzer mit aktivierter Zwei-Faktor-Anmeldung zeigen ein Abzeichen **Two-factor on** an. Klicken Sie daneben auf **Reset 2FA**.
3. Bestätigen Sie die Abfrage. Tun Sie dies erst, nachdem Sie geprüft haben, mit wem Sie sprechen.

Der Benutzer kann sich danach nur mit seinem Passwort anmelden und die Zwei-Faktor-Anmeldung in seinem Profil erneut einrichten. Zurücksetzungen werden im Audit-Log als `mfa_reset` protokolliert. Der Endpunkt lautet `POST /membership/users/mfa/reset/:userId` und erfordert Server.Admin.

## Identitätsübernahme (Impersonation)

Mit der Identitätsübernahme können Server-Admins sich für Support- und Fehlersuchzwecke als ein anderer Benutzer anmelden. Das ist hilfreich, wenn Probleme untersucht werden, die Benutzer gemeldet haben, oder wenn Gemeinden bei der Konfiguration ihres Systems unterstützt werden.

### So übernehmen Sie die Identität eines Benutzers

1. Öffnen Sie den Bereich **Impersonate User** im Panel der Serververwaltung.
2. Geben Sie den Namen oder die E-Mail-Adresse des Benutzers in das Suchfeld ein.
3. Klicken Sie auf **Search** oder drücken Sie die Eingabetaste.
4. Klicken Sie in den Suchergebnissen auf den Benutzer, dessen Identität Sie übernehmen möchten.
5. Bestätigen Sie die Übernahme im angezeigten Dialog.
6. Sie sind danach als dieser Benutzer angemeldet und werden zu dessen Konto weitergeleitet.

### Wichtige Hinweise

- Die Übernahme erzeugt eine neue Sitzung mit den Berechtigungen und dem Gemeindezugang des Zielbenutzers.
- Ihre ursprüngliche Administrator-Sitzung endet, sobald Sie die Identität eines anderen Benutzers übernehmen.
- Alle Aktionen, die während der Übernahme ausgeführt werden, werden im Prüfprotokoll erfasst.
- Um zu Ihrem Administratorkonto zurückzukehren, melden Sie sich ab und mit Ihren Zugangsdaten wieder an.
- Nutzen Sie die Übernahme nur, wenn sie für den Support nötig ist, und informieren Sie die Benutzer immer, wenn Sie auf ihre Konten zugreifen.

### API-Endpunkt

Die Funktion zur Identitätsübernahme basiert auf dem Endpunkt `/users/:userId/impersonate` der Membership-API. Technische Einzelheiten finden Sie unter [Membership-Endpunkte](/docs/developer/api/endpoints/membership#users).

### Sicherheitsaspekte

- Die Identitätsübernahme erfordert die Berechtigung Server.Admin — diese Berechtigung sollte sparsam und nur vertrauenswürdigen Plattformbetreibern erteilt werden.
- Alle Ereignisse der Identitätsübernahme werden mit der ID des Administrators und der ID des Zielbenutzers protokolliert.
- Gemeinden werden nicht benachrichtigt, wenn eine Identitätsübernahme stattfindet. Legen Sie daher klare Richtlinien fest, wann und wie diese Funktion eingesetzt werden darf.
- Erwägen Sie, Ereignisse der Identitätsübernahme in Ihrem Ticketsystem für den Support zu dokumentieren, um die Nachvollziehbarkeit sicherzustellen.

## Moderation von Commons

Commons ist die gemeinsame Moderationswarteschlange für nutzerseitig eingereichte Inhalte über mehrere Produkte hinweg. WorshipCommons-Lieder, Lessons.church-Lektionen, FreeShow-Vorlagen und Vorlagen des Website-Builders von B1 laufen alle über dieselbe Warteschlange, statt über getrennte Prüfwerkzeuge für jedes Produkt.

### Auf Commons zugreifen

1. Öffnen Sie im Panel der Serververwaltung den Tab **Commons**.
2. Sie sehen drei Unter-Tabs: **Queue** (Warteschlange), **Reports** (Meldungen) und **Assets** (Inhalte).

Eine eingeschränkte Rolle **Musikbearbeitung** kann ebenfalls den Tab Queue sehen, ist aber daran gehindert, Einreichungen zu genehmigen, die die Rechte oder die Lizenzierung eines Liedes ändern.

### Warteschlange

Die Queue listet alle ausstehenden Einreichungen aller Produkte auf, filterbar nach Produkt und Inhaltstyp. Jede Zeile zeigt an, ob die Einreichung ein neuer Inhalt, eine Änderung durch den ursprünglichen Autor oder eine Änderung durch einen Dritten ist, außerdem die bisherige Genehmigungsbilanz der einreichenden Person und wie lange die Einreichung wartet (sie wird markiert, sobald sie 72 Stunden überschreitet).

Klicken Sie auf **Review**, um eine Seitenleiste mit Unterschieden auf Feldebene, Dateivorschauen und einer eingebetteten, schreibgeschützten Vorschau des Eintrags zu öffnen. Mit den Tastenkürzeln **a** / **r** genehmigen oder lehnen Sie ab; mit **j** / **k** wechseln Sie zur nächsten bzw. vorherigen Einreichung, ohne die Seitenleiste zu verlassen. Beim Ablehnen müssen Sie einen Grund (zum Beispiel Qualität, Dublette, Lizenzierung, CCLI, KI oder themenfremd) und eine Notiz angeben.

### Meldungen

Der Tab Reports bearbeitet Urheberrechts- und Richtlinien-/Qualitätsmeldungen zu bereits veröffentlichten Inhalten. Sie sind in die getrennten Warteschlangen Copyright und Policy & Other sowie in den Verlauf Resolved aufgeteilt. Übernehmen Sie eine Meldung, um mit der Bearbeitung zu beginnen, und schließen Sie sie dann mit einer Entscheidung (upheld, dismissed oder duplicate) und einer Maßnahme (none, unpublish oder remove) ab.

### Inhalte

Der Tab Assets ist eine durchsuchbare Übersicht veröffentlichter Inhalte mit Aktionen, um einen Inhalt **Feature** (auf der Startseite des Produkts hervorzuheben), ihn **Unpublish** / **Republish** (zurückzuziehen bzw. wieder zu veröffentlichen) oder ihn **Remove** (mit einem Grund zu Urheberrecht oder Richtlinie) zu entfernen.

Speziell für Lieder ist dies auch der Ort, an dem ein Lied **Sunday-ready** wird und in der Liedsuche der B1-Administration einer Gemeinde erscheinen darf: Ein Prüfer öffnet den Inhalt und markiert jede veröffentlichte Tonart als **Listened**, sobald er sie durchgehört und bestätigt hat, dass Noten, Akkorde und Folien vollständig vorhanden sind. Ein Lied wird erst dann Sunday-ready, wenn jede Tonart abgehakt ist.

:::info
Die Moderation von Commons ist nur für Mitarbeitende bestimmt — einzelne Gemeinden sehen diese Warteschlange nie. Die einzige Stelle, an der die B1-Administration einer Gemeinde mit Commons-Daten in Berührung kommt, ist der Bereich „WorshipCommons — free“ in der [Liedsuche](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons). Dort erscheinen nur Lieder, die diesen Prüfprozess bereits durchlaufen haben.
:::

Die zugrunde liegende Datenstruktur und den Lebenszyklus von Einreichungen finden Sie auf der Seite [Architektur von Content Commons](/docs/developer/architecture/commons).

## Genehmigung von E-Mails an Gruppen

Gemeinden können von Gemeinde verfasste E-Mails (E-Mails an Gruppen, Nachfass-E-Mails aus Formularen, E-Mails aus Workflows und Einladungen zu Konten) erst versenden, nachdem ein Server-Admin sie genehmigt hat. So wird verhindert, dass von Bots registrierte Gemeinden die gemeinsame Absenderadresse von ChurchApps für Spam missbrauchen.

1. Öffnen Sie im Panel der Serververwaltung den Tab **Churches**.
2. Jede Gemeinde zeigt einen Chip **Group Email**: **Approved** (grün) oder **Not approved** (umrandet).
3. Klicken Sie auf den Chip und bestätigen Sie, um die Gemeinde zu genehmigen oder eine Genehmigung zu widerrufen.

Mitarbeitende einer Gemeinde beantragen die Genehmigung über die Schaltfläche **Request review** im Dialog Send Email der B1-Administration. Die Anfrage wird an die Support-Adresse gesendet und enthält den Namen der Gemeinde, ihre ID, das Registrierungsdatum, den Standort und die anfragende Person. Eine Gemeinde kann einmal pro Woche eine Anfrage stellen. Das tägliche Kontingent und die automatische Pausierung bei Bounces und Beschwerden finden Sie unter [Limits für von Gemeinden verfasste E-Mails](/docs/developer/architecture/notifications#church-authored-email-limits).

## Datenbankmigrationen {#database-migrations}

Der Workflow **Deploy Prod** wendet ausstehende Migrationen selbst an. Die gehosteten Datenbanken akzeptieren nur Verbindungen aus dem Netzwerk der API, sodass ein GitHub-Runner sie nicht erreichen kann. Stattdessen ruft der Workflow unmittelbar nach `serverless deploy` die Lambda-Funktion `migrate` der API auf (`api-Prod-migrate`). Diese führt alle ausstehenden Migrationen jedes Moduls mit demselben Runner aus wie dieser Tab und lässt die Bereitstellung fehlschlagen, wenn ein Modul einen Fehler meldet oder abgelehnt wird. **Rollback Prod** setzt nur den Code der Lambda-Funktion zurück; bereits angewendete Migrationen bleiben angewendet. Der Tab **Database Migrations** dient dazu, den Status zu prüfen, alles auszuführen, was eine Bereitstellung nicht ausgeführt hat (zum Beispiel in der Demo-Umgebung, deren Bereitstellung nicht migriert), und Module ohne Verlauf zu initialisieren. (Selbst betriebene Docker-Installationen führen Migrationen weiterhin automatisch beim Start des API-Containers aus.)

Der Tab zeigt die aktuelle Umgebung und eine Zeile je Modul (membership, attendance, giving usw.) mit dessen Status, der Anzahl angewendeter und ausstehender Migrationen sowie der zuletzt angewendeten Migration.

- **Run Pending Migrations** wendet jede ausstehende Migration an, Modul für Modul und in der richtigen Reihenfolge. Beim ersten Fehler bricht es ab und zeigt, was für jedes Modul angewendet wurde.
- Ein Modul mit der Markierung **No history** hat eine Datenbank, die älter ist als die Nachverfolgung von Migrationen. Es wird nie automatisch ausgeführt, da dabei alte Datenmigrationen über die Live-Tabellen erneut laufen würden. Klicken Sie stattdessen bei diesem Modul auf **Check Schema**. Die API vergleicht die Tabellen, Spalten und Indizes, die jede Migration anlegt, mit der Live-Datenbank und markiert jede Migration als **Already applied**, **Missing**, **Partly applied** oder **Data only**. Die Prüfung verändert nichts.
- In den Prüfergebnissen schreibt **Record as Already Applied** die erkannten Migrationen in den Migrationsverlauf, ohne sie auszuführen (nach einer Bestätigung). Alles bis zur letzten Migration mit **Already applied** wird erfasst, einschließlich der **Data only**-Migrationen in diesem Bereich; **Missing**-Migrationen bleiben ausstehend und können danach regulär mit **Run Pending Migrations** ausgeführt werden.
- Eine **Partly applied**-Migration verhindert das Erfassen. Ist die Migration gefahrlos erneut ausführbar (lesen Sie sie zuerst), setzen Sie den Haken bei **Re-run**, damit sie ausstehend bleibt und von vorn ausgeführt wird.

Das Panel der Serververwaltung und die CLI (`yarn migrate:up`) verwenden denselben Kysely-Migrator und dieselbe Tabelle `kysely_migration`, sodass sie immer übereinstimmen, was angewendet wurde. Die zugrunde liegenden Endpunkte sind `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` und `POST .../:module/baseline`; alle sind nur für Server.Admin verfügbar.

## Verwandte Seiten

- [Authentifizierung und Berechtigungen](/docs/developer/api/endpoints/authentication) — Berechtigungsmodell und JWT-Authentifizierung
- [Membership-Endpunkte](/docs/developer/api/endpoints/membership) — Verwaltungs-API für Benutzer und Gemeinden
- [Audit-Log](/docs/b1-admin/reports/audit-log) — Aktivitätsprotokolle einer Gemeinde einsehen
- [Architektur von Content Commons](/docs/developer/architecture/commons) — gemeinsames Inhaltsmodell und Lebenszyklus der Moderation
