---
title: "Serveradministration"
---

# Serveradministration

<div class="article-intro">

Die Funktionen der Serveradministration in ChurchApps sind nur für Benutzer mit der Berechtigung **Server.Admin** verfügbar. Diese Werkzeuge dienen dem Betrieb der Plattform, dem Support und der Fehlersuche über alle Kirchen im System hinweg.

</div>

:::warning Zugriff eingeschränkt
Die auf dieser Seite beschriebenen Funktionen erfordern die Berechtigung **Server.Admin** und stehen regulären Kirchenadministratoren nicht zur Verfügung. Sie sind nur für Betreiber der Plattform und Supportmitarbeitende bestimmt.
:::

## Zugriff auf die Serveradministration

Benutzer mit der Berechtigung Server.Admin können das Panel der Serveradministration in B1 Admin öffnen:

1. Melden Sie sich bei [admin.b1.church](https://admin.b1.church) an.
2. Öffnen Sie das [Sprungmenü](../b1-admin/introduction.md#getting-around-with-the-jump-menu), klappen Sie **Einstellungen** auf und klicken Sie auf **Serveradministration**. (Sie können auch direkt `admin.b1.church/admin` aufrufen.)
3. Das Panel der Serveradministration listet seine Bereiche links in drei Gruppen auf: **Verzeichnis** (Kirchen, Benutzer, Benutzer imitieren), **Betrieb** (Hintergrundaufgaben, Commons, Nutzungstrends) und **System** (Übersetzungsnachschlagen, Serverzustand, Datenbankmigrationen).

## Zwei-Faktor-Anmeldung zurücksetzen

Hat ein Benutzer die [Zwei-Faktor-Anmeldung](../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiviert und sowohl sein Telefon als auch seine Sicherungscodes verloren, kann ein Serveradministrator sie ausschalten:

1. Öffnen Sie im Panel der Serveradministration den Bereich **Benutzer** und suchen Sie den Benutzer.
2. Benutzer mit Zwei-Faktor-Anmeldung zeigen das Abzeichen **Zwei-Faktor an**. Klicken Sie daneben auf **2FA zurücksetzen**.
3. Bestätigen Sie die Abfrage. Tun Sie dies erst, nachdem Sie sicher wissen, mit wem Sie sprechen.

Der Benutzer kann sich danach nur mit seinem Passwort anmelden und die Zwei-Faktor-Anmeldung in seinem Profil erneut einrichten. Zurücksetzungen werden als `mfa_reset` im Audit-Protokoll festgehalten. Der Endpunkt ist `POST /membership/users/mfa/reset/:userId` und erfordert Server.Admin.

## Benutzer imitieren

Die Funktion zum Imitieren erlaubt Serveradministratoren, sich zu Support- und Fehlersuchzwecken als anderer Benutzer anzumelden. Das ist hilfreich, wenn von Benutzern gemeldete Probleme untersucht werden oder Kirchen bei der Konfiguration ihrer Systeme geholfen wird.

### So imitieren Sie einen Benutzer

1. Öffnen Sie den Bereich **Benutzer imitieren** im Panel der Serveradministration.
2. Geben Sie Namen oder E-Mail-Adresse des Benutzers in das Suchfeld ein.
3. Klicken Sie auf **Suchen** oder drücken Sie Enter.
4. Klicken Sie in den Suchergebnissen auf den Benutzer, den Sie imitieren möchten.
5. Bestätigen Sie die Imitation im erscheinenden Dialog.
6. Sie sind als dieser Benutzer angemeldet und werden zu dessen Konto weitergeleitet.

### Wichtige Hinweise

- Die Imitation erstellt eine neue Sitzung mit den Berechtigungen und dem Kirchenzugang des Zielbenutzers.
- Ihre ursprüngliche Administratorsitzung endet, sobald Sie einen anderen Benutzer imitieren.
- Alle Aktionen während der Imitation werden im Prüfprotokoll festgehalten.
- Um zu Ihrem Administratorkonto zurückzukehren, melden Sie sich ab und mit Ihren Zugangsdaten erneut an.
- Verwenden Sie die Imitation nur, wenn sie für Supportzwecke nötig ist, und informieren Sie Benutzer immer, wenn Sie für den Support auf ihr Konto zugreifen.

### API-Endpunkt

Die Funktion zum Imitieren wird vom Endpunkt `/users/:userId/impersonate` der Mitgliedschafts-API getragen. Technische Details finden Sie unter [Mitgliedschafts-Endpunkte](/docs/developer/api/endpoints/membership#users).

### Sicherheitsaspekte

- Die Imitation erfordert die Berechtigung Server.Admin -- diese Berechtigung sollte sparsam und nur vertrauenswürdigen Betreibern der Plattform vergeben werden.
- Alle Ereignisse der Imitation werden mit der ID des Administrators und der ID des Zielbenutzers protokolliert.
- Kirchen werden bei einer Imitation nicht benachrichtigt. Legen Sie daher klare Richtlinien fest, wann und wie diese Funktion genutzt wird.
- Erwägen Sie, Ereignisse der Imitation in Ihrem System für Supportanfragen zu dokumentieren, um die Nachvollziehbarkeit sicherzustellen.

## Moderation der Commons

Commons ist die gemeinsame Moderationswarteschlange für von Benutzern eingereichte Inhalte über Produkte hinweg. WorshipCommons-Lieder, Lessons.church-Lektionen, FreeShow-Vorlagen und Vorlagen des Website-Builders von B1 laufen alle über dieselbe Warteschlange, statt über getrennte Prüfwerkzeuge je Produkt.

### Auf Commons zugreifen

1. Öffnen Sie im Panel der Serveradministration den Reiter **Commons**.
2. Sie sehen drei Unterreiter: **Warteschlange**, **Meldungen** und **Inhalte**.

Ein eingeschränkter Rolle **Musikredakteur** kann ebenfalls die Warteschlange sehen, ist aber davon ausgeschlossen, Einreichungen zu genehmigen, die Rechte oder Lizenzierung eines Liedes ändern.

### Warteschlange

Die Warteschlange listet jede ausstehende Einreichung aller Produkte, filterbar nach Produkt und Art des Inhalts. Jede Zeile zeigt, ob die Einreichung ein neues Element ist, eine Änderung durch den ursprünglichen Verfasser oder eine Änderung durch einen Dritten, dazu die Genehmigungsbilanz der einreichenden Person und wie lange die Einreichung schon wartet (ab 72 Stunden markiert).

Klicken Sie auf **Prüfen**, um eine Seitenleiste mit Unterschieden je Feld, Dateivorschauen und einer eingebetteten, nur lesbaren Vorschau des Elements zu öffnen. Mit den Tastenkürzeln **a** und **r** genehmigen oder lehnen Sie ab, mit **j** und **k** wechseln Sie zur nächsten oder vorherigen Einreichung, ohne die Seitenleiste zu verlassen. Zum Ablehnen wählen Sie einen Grund (zum Beispiel Qualität, Dublette, Lizenzierung, CCLI, KI oder themenfremd) und schreiben eine Notiz.

### Meldungen

Der Reiter Meldungen bearbeitet Meldungen zu Urheberrecht sowie zu Richtlinien und Qualität, die gegen bereits veröffentlichte Inhalte eingereicht wurden. Sie sind getrennt in die Warteschlangen **Urheberrecht** und **Richtlinien und Sonstiges** sowie einen Verlauf **Erledigt**. Übernehmen Sie eine Meldung, um mit der Bearbeitung zu beginnen, und erledigen Sie sie dann mit einer Entscheidung (bestätigt, verworfen oder Dublette) und einer Maßnahme (keine, Veröffentlichung zurücknehmen oder entfernen).

### Inhalte

Der Reiter Inhalte ist eine durchsuchbare Übersicht veröffentlichter Inhalte mit Aktionen, um einen Inhalt **hervorzuheben** (er erscheint auf der Startseite des Produkts), ihn **zurückzuziehen**/**wieder zu veröffentlichen** oder **zu entfernen** (mit einem Grund zum Urheberrecht oder zur Richtlinie).

Speziell für Lieder ist dies auch der Ort, an dem ein Lied **sonntagsbereit** wird und in der Liedersuche der B1-Admin einer Kirche erscheinen darf: Eine prüfende Person öffnet den Inhalt und markiert jede veröffentlichte Tonart als **Angehört**, sobald sie es durchgehört und bestätigt hat, dass Notensatz, Akkorde und Folien vollständig sind. Ein Lied wird erst sonntagsbereit, wenn jede Tonart abgehakt ist.

:::info
Die Moderation von Commons ist nur für Mitarbeitende des Betreibers bestimmt -- einzelne Kirchen sehen diese Warteschlange nie. Der einzige Ort, an dem die B1-Admin einer einzelnen Kirche Commons-Daten berührt, ist der Bereich "WorshipCommons -- kostenlos" in der [Liedersuche](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons); er zeigt nur Lieder, die diesen Prüfprozess bereits durchlaufen haben.
:::

Siehe die Seite [Architektur der Commons](/docs/developer/architecture/commons) für das zugrunde liegende Datenmodell und den Lebenszyklus der Einreichungen.

## Genehmigung der E-Mail von Gruppen

Kirchen können von Kirchen verfasste E-Mails (Gruppen-E-Mails, Nachfass-E-Mails zu Formularen, Workflow-E-Mails und Einladungen von Konten) erst versenden, wenn ein Serveradministrator sie genehmigt hat. So nutzen von Bots angemeldete Kirchen die gemeinsame Absendeadresse von ChurchApps nicht für Spam.

1. Öffnen Sie im Panel der Serveradministration den Reiter **Kirchen**.
2. Jede Kirche zeigt einen Chip **Gruppen-E-Mail**: **Genehmigt** (grün) oder **Nicht genehmigt** (umrandet).
3. Klicken Sie auf den Chip und bestätigen Sie, um die Kirche zu genehmigen oder eine Genehmigung zu widerrufen.

Die Mitarbeitenden einer Kirche bitten um Genehmigung über die Schaltfläche **Prüfung anfordern** im Dialog E-Mail senden in B1 Admin. Die Anfrage wird an die Support-Adresse gemailt und enthält Namen, ID, Registrierungsdatum und Standort der Kirche sowie die anfragende Person. Eine Kirche kann einmal pro Woche eine Anfrage stellen. Das tägliche Kontingent und die automatische Pause bei Unzustellbarkeiten und Beschwerden finden Sie unter [Limits für von der Kirche verfasste E-Mails](/docs/developer/architecture/notifications#church-authored-email-limits).

## Datenbankmigrationen

Der Workflow **Deploy Prod** wendet ausstehende Migrationen selbst an. Die gehosteten Datenbanken akzeptieren Verbindungen nur aus dem Netzwerk der API, daher kann ein GitHub-Runner sie nicht erreichen. Stattdessen ruft der Workflow direkt nach `serverless deploy` die Lambda-Funktion `migrate` der API auf (`api-Prod-migrate`). Sie führt alle ausstehenden Migrationen jedes Moduls mit demselben Ausführer aus wie dieser Reiter und lässt die Bereitstellung scheitern, wenn ein Modul einen Fehler meldet oder abgelehnt wird. **Rollback Prod** setzt nur den Code der Lambda-Funktion zurück; angewandte Migrationen bleiben angewandt. Der Reiter **Datenbankmigrationen** dient dazu, den Status zu prüfen, alles auszuführen, was eine Bereitstellung nicht ausgeführt hat (zum Beispiel in der Demo-Umgebung, deren Bereitstellung nicht migriert), und Module ohne Verlauf zu baselinen. (Selbst gehostete Docker-Installationen führen Migrationen weiterhin automatisch aus, sobald der Container der API startet.)

Der Reiter zeigt die aktuelle Umgebung und je Modul (Mitgliedschaft, Anwesenheit, Spenden usw.) eine Zeile mit dem Status, der Anzahl angewandter und ausstehender Migrationen und der zuletzt angewandten Migration.

- **Ausstehende Migrationen ausführen** wendet jede ausstehende Migration an, Modul für Modul und in Reihenfolge. Bei dem ersten Fehler wird abgebrochen, und es wird angezeigt, was je Modul angewandt wurde.
- Ein Modul mit der Kennzeichnung **Kein Verlauf** hat eine Datenbank, die älter ist als die Verfolgung der Migrationen. Es wird nie automatisch ausgeführt, da sonst alte Datenmigrationen auf die Live-Tabellen erneut angewandt würden. Klicken Sie bei diesem Modul stattdessen auf **Schema prüfen**. Die API vergleicht die Tabellen, Spalten und Indizes, die jede Migration anlegt, mit der Live-Datenbank und kennzeichnet jede Migration als **Bereits angewandt**, **Fehlt**, **Teilweise angewandt** oder **Nur Daten**. Die Prüfung ändert nichts.
- In den Prüfergebnissen schreibt **Als bereits angewandt erfassen** die erkannten Migrationen in den Verlauf der Migrationen, ohne sie auszuführen (nach einer Bestätigung). Alles bis zur letzten Migration **Bereits angewandt** wird erfasst, einschließlich der Migrationen **Nur Daten** in diesem Bereich; Migrationen **Fehlt** bleiben ausstehend und können danach normal mit **Ausstehende Migrationen ausführen** angewandt werden.
- Eine Migration **Teilweise angewandt** verhindert das Erfassen. Ist die Migration gefahrlos erneut ausführbar (lesen Sie sie vorher), setzen Sie das Häkchen **Erneut ausführen**, damit sie ausstehend bleibt und von vorn läuft.

Das Panel der Serveradministration und die CLI (`yarn migrate:up`) verwenden denselben Migrator von Kysely und dieselbe Tabelle `kysely_migration`, sodass sie immer übereinstimmen, was angewandt wurde. Die dahinterliegenden Endpunkte sind `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` und `POST .../:module/baseline`; alle sind nur für Server.Admin zugänglich.

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](/docs/developer/api/endpoints/authentication) — Berechtigungsmodell und JWT-Authentifizierung
- [Mitgliedschafts-Endpunkte](/docs/developer/api/endpoints/membership) — API zur Verwaltung von Benutzern und Kirchen
- [Prüfprotokoll](/docs/b1-admin/reports/audit-log) — Aktivitätsprotokolle einer Kirche einsehen
- [Architektur der Commons in Inhalten](/docs/developer/architecture/commons) — gemeinsames Modell der Inhalte und Lebenszyklus der Moderation
