---
title: "Serververwaltung"
---

# Serververwaltung

<div class="article-intro">

Die Serververwaltungsfunktionen in ChurchApps sind nur für Benutzer mit der **Server.Admin**-Berechtigung verfügbar. Diese Tools werden für Plattformoperationen, Support und Fehlerbehebung über alle Kirchen im System verwendet.

</div>

:::warning Zugriff eingeschränkt
Die auf dieser Seite beschriebenen Funktionen erfordern **Server.Admin**-Berechtigung und sind für reguläre Kirchenadministratoren nicht verfügbar. Sie sind nur für Plattformoperatoren und Support-Mitarbeiter vorgesehen.
:::

## Zugriff auf Server Admin

Benutzer mit Server.Admin-Berechtigung können auf den Server-Admin-Panel aus B1 Admin zugreifen:

1. Melden Sie sich bei [admin.b1.church](https://admin.b1.church) an
2. Öffnen Sie das [Jump-Menü](../b1-admin/introduction.md#getting-around-with-the-jump-menu), erweitern Sie **Einstellungen** und klicken Sie auf **Server Admin**. (Sie können auch direkt zu `admin.b1.church/admin` gehen.)
3. Der Server-Admin-Panel hat Abschnitte für Kirchen, Benutzer, Benutzer-Identitätswechsel, Hintergrund-Jobs, Commons, Nutzungstrends, Übersetzungs-Lookups, Serverbehältnisse und Datenbank-Migrationen

## Benutzer-Identitätswechsel

Die Identitätswechsel-Funktion ermöglicht es Server-Admins, sich als anderer Benutzer für Support- und Fehlerbehebungszwecke anzumelden. Dies ist hilfreich, wenn Sie von Benutzern gemeldete Probleme untersuchen oder Kirchen bei der Systemkonfiguration helfen.

### So wechseln Sie die Identität eines Benutzers

1. Öffnen Sie den **Benutzer-Identitätswechsel**-Abschnitt des Server-Admin-Panels
2. Geben Sie den Namen oder die E-Mail-Adresse des Benutzers im Suchfeld ein
3. Klicken Sie auf **Suchen** oder drücken Sie die Eingabetaste
4. Klicken Sie aus den Suchergebnissen auf den Benutzer, dessen Identität Sie wechseln möchten
5. Bestätigen Sie den Identitätswechsel im angezeigten Dialog
6. Sie werden als dieser Benutzer angemeldet und zu seinem Konto weitergeleitet

### Wichtige Hinweise

- Der Identitätswechsel erstellt eine neue Sitzung mit den Berechtigungen und dem Kirchenzugriff des Zielbenutzers
- Ihre ursprüngliche Admin-Sitzung endet, wenn Sie einen anderen Benutzer anmelden
- Alle Aktionen, die während des Identitätswechsels unternommen werden, werden im Audit-Trail protokolliert
- Um zu Ihrem Admin-Konto zurückzukehren, melden Sie sich ab und melden Sie sich mit Ihren Anmeldedaten erneut an
- Verwenden Sie den Identitätswechsel nur bei Bedarf für Support-Zwecke und informieren Sie Benutzer immer, wenn Sie zu Unterstützungszwecken auf ihre Konten zugreifen

### API-Endpoint

Die Identitätswechsel-Funktion wird durch den `/users/:userId/impersonate`-Endpoint in der Membership-API unterstützt. Siehe [Membership Endpoints](/docs/developer/api/endpoints/membership#users) für technische Details.

### Sicherheitsüberlegungen

- Der Identitätswechsel erfordert Server.Admin-Berechtigung – diese Berechtigung sollte sparsam und nur für vertraute Plattformoperatoren gewährt werden
- Alle Identitätswechsel-Ereignisse werden mit der Admin-Benutzer-ID und der Zielbenutzer-ID protokolliert
- Kirchen werden nicht benachrichtigt, wenn ein Identitätswechsel auftritt, daher sollten Sie klare Richtlinien für wann und wie diese Funktion verwendet werden sollte, aufstellen
- Erwägen Sie, Identitätswechsel-Ereignisse in Ihrem Support-Ticket-System für Rechenschaftspflicht zu dokumentieren

## Commons-Moderation

Commons ist die gemeinsame Moderationsschlange für benutzer-eingereichte Inhalte über alle Produkte – WorshipCommons-Lieder, Lessons.church-Lektionen, FreeShow-Vorlagen und B1-Website-Builder-Vorlagen fließen alle durch dieselbe Schlange statt in separaten Pro-Produkt-Review-Tools.

### Zugriff auf Commons

1. Navigieren Sie zur Registerkarte **Commons** im Server-Admin-Panel.
2. Sie sehen drei Unterregisterkarten: **Queue**, **Reports** und **Assets**.

Eine begrenzte **Musikeditor**-Rolle kann auch die Queue-Registerkarte sehen, ist aber daran gehindert, Einreichungen zu genehmigen, die die Rechte oder Lizenzen eines Songs ändern.

### Queue

Die Queue listet jede ausstehende Einreichung über alle Produkte auf, filterbar nach Produkt und Asset-Typ. Jede Reihe zeigt, ob die Einreichung ein neues Asset, eine Bearbeitung durch seinen ursprünglichen Autor oder eine Bearbeitung durch einen Dritten ist, zusammen mit der Genehmigungsverfolgung des Absenders und wie lange die Einreichung wartet (gekennzeichnet, sobald sie 72 Stunden überschreitet).

Klicken Sie auf **Überprüfen**, um eine Schublade mit feldebenen Diffs, Dateivorschauen und einer eingebetteten Schreibvorschau des Elements zu öffnen. Verwenden Sie die Tastenkombinationen **a**/**r**, um zu genehmigen oder abzulehnen, und **j**/**k**, um zur nächsten oder vorherigen Einreichung zu wechseln, ohne die Schublade zu verlassen. Das Ablehnen erfordert das Auswählen eines Grundes (z. B. Qualität, Duplikat, Lizenzierung, CCLI, KI oder Off-Topic) und eines Notizs.

### Reports

Die Reports-Registerkarte behandelt Urheberrechts- und Richtlinien-/Qualitäts-Reports, die gegen bereits veröffentlichte Assets eingereicht wurden, aufgeteilt in separate Urheberrechts- und Richtlinien- & Sonstige Schlangen plus eine Resolved-Historie. Beanspruchen Sie einen Report, um mit ihm zu beginnen, lösen Sie ihn dann mit einer Auflösung (bestätigt, abgelehnt oder Duplikat) und einer Aktion (keine, Depublizierung oder Entfernung) auf.

### Assets

Die Assets-Registerkarte ist ein durchsuchbarer Browser veröffentlichter Inhalte mit Aktionen zum **Feature** eines Assets (hervorgehoben auf der Startseite des Produkts), zu **Depublizierung**/**Wiederveröffentlichung** oder **Entfernung** (mit einem Urheberrechts- oder Richtliniengrund).

Für Lieder speziell ist dies auch der Ort, an dem ein Lied **Sonntag-bereit** wird und berechtigt ist, in der Liedsuche einer Kirche B1 Admin erscheinen: Ein Reviewer öffnet das Asset und markiert jeden veröffentlichten Schlüssel als **Gehört**, sobald er es durchgehört hat und die Partitur, Akkorde und Folien bestätigt hat, sind alle vorhanden. Ein Lied wird nur Sonntag-bereit, sobald jeder Schlüssel abgehakt ist.

:::info
Commons-Moderation ist nur für Mitarbeiter – einzelne Kirchen sehen diese Schlange nie. Der einzige Ort, an dem ein individuelle Kirche's B1 Admin Commons-Daten berührt, ist der Abschnitt „WorshipCommons – kostenlos" der [Liedsuche](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), das nur Lieder aufzeigt, die bereits diesen Review-Prozess durchlaufen haben.
:::

Siehe die [Content Commons-Architektur](/docs/developer/architecture/commons)-Seite für das zugrunde liegende Datenmodell und den Einreichungs-Lebenszyklus.

## Gruppen-E-Mail-Genehmigung

Kirchen können keine kirchengeschriebene E-Mail (Gruppen-E-Mail, Formular-Folgemailer, Workflow-E-Mails und Kontoeinladungen) senden, bis ein Server-Admin sie genehmigt. Dies hält Bot-registrierte Kirchen davon ab, die gemeinsame ChurchApps-Sendadresse für Spam zu verwenden.

1. Öffnen Sie die **Kirchen**-Registerkarte im Server-Admin-Panel.
2. Jede Kirche zeigt einen **Gruppen-E-Mail**-Chip: **Genehmigt** (grün) oder **Nicht genehmigt** (outlined).
3. Klicken Sie auf den Chip und bestätigen Sie, um die Kirche zu genehmigen, oder widerrufen Sie eine Genehmigung.

Kirchenpersonal fragen mit der **Überprüfung anfordern**-Schaltfläche in B1 Admin's Send Email-Dialog um Genehmigung. Die Anfrage wird an die Support-Adresse E-Mailt und listet den Kirchennamen, die ID, das Registrierungsdatum, den Ort und wer gefragt hat. Eine Kirche kann eine Anfrage pro Woche senden. Siehe [Kirchen-geschriebene E-Mail-Limits](/docs/developer/architecture/notifications#church-authored-email-limits) für die tägliche Zulage und die automatische Pause bei Bounces und Beschwerden.

## Datenbank-Migrationen

Bereitstellungen ändern die Datenbank nicht. Die gehosteten Datenbanken akzeptieren nur Verbindungen von innen des Api's-Netzwerk, daher wendet ein Server-Admin nach einer Veröffentlichung, die eine Migration hinzufügt, sie von der **Datenbank-Migrationen**-Registerkarte an. (Selbstgehostete Docker-Installationen führen Migrationen immer noch automatisch aus, wenn der Api-Container gestartet wird.)

Die Registerkarte zeigt die aktuelle Umgebung und eine Reihe pro Modul (Membership, Attendance, Giving usw.) mit seinem Status, der Anzahl der angewendeten und ausstehenden Migrationen und der letzten angewendeten.

- **Run Pending Migrations** wendet jede ausstehende Migration an, ein Modul auf einmal, in Reihenfolge. Sie stoppt beim ersten Fehler und zeigt an, was für jedes Modul angewendet wurde.
- Ein Modul, das als **Keine Historie** gekennzeichnet ist, hat eine Datenbank, die der Migrations-Verfolgung vorangeht. Sie wird niemals automatisch ausgeführt, da dies alte Daten-Migrationen über Live-Tabellen zurückgeben würde. Klicken Sie stattdessen auf **Schema überprüfen** für dieses Modul. Die Api vergleicht die Tabellen, Spalten und Indizes, die jede Migration mit der Live-Datenbank erstellt, und markiert jede Migration **Already applied**, **Missing**, **Partly applied** oder **Data only**. Nichts wird durch die Überprüfung verändert.
- In den Überprüfungsergebnissen schreibt **Record as Already Applied** die erkannten Migrationen in die Migrations-Historie, ohne sie auszuführen (nach einer Bestätigung). Alles bis zur letzten **Already applied**-Migration wird aufgezeichnet, einschließlich **Data only**-Migrationen in diesem Bereich; **Missing**-Migrationen bleiben ausstehend und können dann normalerweise mit **Run Pending Migrations** ausgeführt werden.
- Eine **Partly applied**-Migration blockiert die Aufzeichnung. Falls die Migration sicher erneut ausgeführt werden kann (lesen Sie sie zuerst), markieren Sie **Re-run**, daher bleibt sie ausstehend und führt von oben aus erneut aus.

Der Server-Admin-Panel und die CLI (`yarn migrate:up`) verwenden denselben Kysely-Migranten und die `kysely_migration`-Tabelle, daher stimmen sie immer darüber überein, was angewendet wurde. Die Support-Endpoints sind `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` und `POST .../:module/baseline`, alle Server.Admin nur.

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](/docs/developer/api/endpoints/authentication) – Berechtigungsmodell und JWT-Authentifizierung
- [Membership Endpoints](/docs/developer/api/endpoints/membership) – Benutzer- und Kirchenmanagement-API
- [Audit-Log](/docs/b1-admin/reports/audit-log) – Aktivitätsprotokolle für eine Kirche ansehen
- [Content Commons Architektur](/docs/developer/architecture/commons) – Gemeinsames Asset-Modell und Moderations-Lebenszyklus
