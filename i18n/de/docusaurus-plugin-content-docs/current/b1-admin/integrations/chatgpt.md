---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Verbinden Sie ChatGPT von OpenAI mit den B1-Daten Ihrer Kirche und lassen Sie es die Hauptarbeit übernehmen. Nach der Verbindung kann ChatGPT Ihre aktuellen Kirchendaten einsehen und Ihnen bei Aufgaben helfen, die in B1 Admin sonst mehrere Schritte erfordern würden – oder die Sie gar nicht herausgefunden hätten.

**Einige Dinge, die Sie es fragen können:**
- *„Richte Klassenräume für die Sonntagsschule ein und ordne jede Lehrkraft anhand ihrer Gruppe dem richtigen Raum zu“*
- *„Zeig mir alle, die letzte Woche anwesend waren, aber noch keiner Kleingruppe zugeordnet sind“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen“*
- *„Wer sind unsere neuesten Mitglieder und haben wir uns bei ihnen gemeldet?“*
- *„Ich komme in B1 mit X nicht weiter – kannst du mir das erklären oder es für mich erledigen?“*

ChatGPT holt die Antworten und führt Aktionen direkt auf Basis Ihrer B1-Daten aus, beschränkt auf Ihre Kirche.

:::tip Empfohlen: Claude Code
Für das reibungsloseste MCP-Erlebnis ist [Claude Code](./claude) der empfohlene Client – die Einrichtung dauert einen Befehl und funktioniert sofort. ChatGPT funktioniert ebenfalls und ist eine gute Wahl, wenn Ihr Team es bereits verwendet.
:::

Es werden zwei Wege unterstützt: der **MCP-Connector** (in ChatGPT integriert) und ein **Custom GPT** für Teams, die einen teilbaren Assistenten möchten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Eine Kirchenadministration mit der Berechtigung **Einstellungen bearbeiten** in B1 Admin (nötig, um einen API-Schlüssel zu erstellen)
- Ein Konto **ChatGPT Plus, Pro, Team oder Enterprise**

</div>

## Kurzanleitung

Folgen Sie diesen Schritten in der **ChatGPT-Desktop-App** (Mac/Windows). Die Bildschirme können in anderen Versionen leicht abweichen.

---

**Schritt 1 – Holen Sie sich zuerst Ihren API-Schlüssel aus B1 Admin**

Erstellen Sie vor dem Wechsel zu ChatGPT in B1 Admin einen API-Schlüssel, damit Sie ihn zum Einfügen bereit haben:

1. Gehen Sie in B1 Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, nennen Sie ihn `ChatGPT`, wählen Sie Ihre Berechtigungen (Scopes) aus (beginnen Sie mit `people:read`, `groups:read`, `attendance:read`, `donations:read`) und klicken Sie auf **Speichern**.
3. Kopieren Sie den Schlüssel `cak_…` – er wird nur einmal angezeigt.

---

**Schritt 2 – Klicken Sie unten links in ChatGPT auf Ihren Namen**

![Klicken Sie auf Ihren Profilnamen](/img/guides/chatgpt-mcp/01.png)

---

**Schritt 3 – Klicken Sie auf Einstellungen**

![Klicken Sie im Menü auf Einstellungen](/img/guides/chatgpt-mcp/02.png)

---

**Schritt 4 – Klicken Sie in der linken Seitenleiste auf Plugins**

![Klicken Sie unter Integrationen auf Plugins](/img/guides/chatgpt-mcp/03.png)

---

**Schritt 5 – Klicken Sie auf den Tab MCPs**

![Klicken Sie auf den Tab MCPs](/img/guides/chatgpt-mcp/04.png)

Hier sehen Sie alle MCP-Server, die Sie bereits hinzugefügt haben.

---

**Schritt 6 – Klicken Sie auf Hinzufügen → MCP-Server hinzufügen**

![Klicken Sie auf Hinzufügen und dann auf MCP-Server hinzufügen](/img/guides/chatgpt-mcp/06.png)

---

**Schritt 7 – Füllen Sie das Formular aus und klicken Sie auf Speichern**

![Formular „Mit einem benutzerdefinierten MCP verbinden“](/img/guides/chatgpt-mcp/07.png)

Klicken Sie auf **Streamable HTTP** und füllen Sie dann Folgendes aus:

| Feld | Was Sie eingeben |
|---|---|
| **Name** | `B1 Church` (oder ein beliebiger Name) |
| **Typ** | Klicken Sie auf **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Umgebungsvariable für Bearer-Token** | Leer lassen |
| **Header** | Klicken Sie auf **+ Header hinzufügen** → Schlüssel: `Authorization` → Wert: siehe unten |

![Ausgefülltes Beispiel mit Authorization als Schlüssel und Bearer-Schlüssel als Wert](/img/guides/chatgpt-mcp/08.png)

- **Schlüssel:** `Authorization`
- **Wert:** `Bearer cak_ihrschluessel` – das Wort Bearer, ein Leerzeichen und dann Ihr Schlüssel

Klicken Sie auf **Speichern**.

Das war's! Wechseln Sie zurück in einen Chat und fragen Sie etwa *„Wie viele Personen gehören zu unserer Kirche?“*. ChatGPT holt die Antwort direkt aus B1.

---

## Schritt 1 – Einen API-Schlüssel in B1 Admin erstellen

Jede Verbindung zu B1 verwendet einen API-Schlüssel, den Sie erstellen. Dieser Schlüssel identifiziert Ihre Kirche, legt fest, was ChatGPT sehen kann, und kann jederzeit widerrufen werden.

1. Öffnen Sie **B1 Admin** und gehen Sie zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**.
3. Geben Sie dem Schlüssel einen Namen – `ChatGPT` eignet sich gut.
4. Wählen Sie die Berechtigungen (Scopes), die ChatGPT haben soll. Ein guter Ausgangssatz für einen reinen Lese-Assistenten:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Klicken Sie auf **Speichern**.
6. Kopieren Sie den vollständigen Schlüssel, der angezeigt wird – er beginnt mit `cak_` und wird **nur einmal** angezeigt. Bewahren Sie ihn sicher auf.

:::tip
Wenn Sie den Zugriff von ChatGPT jemals widerrufen möchten, gehen Sie zurück zu **Einstellungen → Entwickler → API-Schlüssel** und löschen Sie den Schlüssel. Der Zugriff endet sofort.
:::

---

## Pfad A – ChatGPT-MCP-Connector (empfohlen)

Dies ist der einfachste Weg zur Verbindung. ChatGPT verfügt über einen integrierten Dialog „Mit einem benutzerdefinierten MCP verbinden“, der direkt mit dem MCP-Server von B1 arbeitet – ganz ohne Custom GPT.

### Was Sie benötigen

- Ihren Schlüssel `cak_…` aus Schritt 1

### Den MCP-Connector in ChatGPT öffnen

Gehen Sie in ChatGPT zu **Einstellungen → Plugins → MCPs** und klicken Sie auf **Hinzufügen → MCP-Server hinzufügen**.

### Den Dialog ausfüllen

Klicken Sie auf **Streamable HTTP** und verwenden Sie dann diese Werte:

| Feld | Wert |
|---|---|
| **Name** | `B1 Church` (oder ein beliebiger Name) |
| **Typ** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Umgebungsvariable für Bearer-Token** | Leer lassen |
| **Header** | Schlüssel: `Authorization` / Wert: `Bearer cak_ihrpraefix.ihrgeheimnis` |

Geben Sie im Feld Wert das Wort `Bearer`, ein Leerzeichen und dann Ihren eingefügten Schlüssel ein – alles im selben Feld. Beispiel: `Bearer cak_praefix.geheimnis`.

Klicken Sie auf **Speichern**.

### Stellen Sie ChatGPT eine Frage

Nach der Verbindung fragen Sie einfach in Alltagssprache – es sind keine speziellen Befehle nötig:

- *„Wie viele Personen gehören zu unserer Kirche?“*
- *„Wer ist in den letzten 30 Tagen beigetreten?“*
- *„Welche Gruppen sind gerade aktiv?“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen.“*

ChatGPT ruft im Hintergrund B1 auf und antwortet aus Ihren aktuellen Daten.

---

## Pfad B – Custom GPT mit Aktionen

Ein Custom GPT ermöglicht es Ihnen, einen eigenen Assistenten zu erstellen, den Ihr ganzes Team nutzen kann – alle öffnen einen Link und stellen Fragen, ohne selbst etwas einrichten zu müssen. Dafür benötigen Sie ein Konto ChatGPT Plus, Team oder Enterprise und etwa 10 Minuten.

### 1. Einen API-Schlüssel erstellen

Folgen Sie Schritt 1 oben, falls Sie das noch nicht getan haben.

### 2. Den Custom GPT erstellen

1. Klicken Sie in ChatGPT auf Ihr Profil → **Meine GPTs** → **GPT erstellen**.
2. Wechseln Sie zum Tab **Konfigurieren**, geben Sie dem GPT einen Namen (z. B. „B1-Assistent“) und fügen Sie Anweisungen hinzu:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scrollen Sie zu **Aktionen** → **Neue Aktion erstellen** → **Authentifizierung**.
   - **Authentifizierungstyp:** API-Schlüssel
   - **API-Schlüssel:** fügen Sie Ihren Schlüssel `cak_…` ein
   - **Auth-Typ:** Bearer
   - Speichern.

4. Fügen Sie im Feld **Schema** diese Start-OpenAPI-Spezifikation ein:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Speichern Sie die Aktion. Testen Sie sie mit *„Wie viele Personen gehören zur Kirche?“* – ChatGPT ruft `listPeople` auf und antwortet.
6. **Veröffentlichen** Sie den GPT (Nur ich / Jeder mit dem Link / Organisation) und teilen Sie den Link mit Ihrem Team.

### 3. Verwenden

Jede Person mit dem Link kann Fragen in natürlicher Sprache stellen. Die Berechtigungen des Schlüssels gelten weiterhin – ein Schlüssel nur mit Leserechten lehnt Schreibvorgänge ab, unabhängig davon, was das Aktionsschema vorsieht.

---

## Sicherheit und Grenzen

- **Trennung pro Kirche.** Der API-Schlüssel gehört zu genau einer Kirche. ChatGPT kann die Daten anderer Kirchen nicht sehen.
- **Auf Berechtigungen beschränkt.** Der Schlüssel enthält nur die Berechtigungen, die Sie vergeben haben. Wenn Sie eine Berechtigung entfernen (indem Sie den Schlüssel löschen und neu erstellen), endet dieser Zugriff beim nächsten Aufruf.
- **Sofort widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, und der Zugriff endet sofort.
- **Ein geteilter Custom GPT teilt die Daten.** Alle, die Zugriff auf den GPT haben, sehen alles, was die Berechtigungen des Schlüssels erlauben. Verwenden Sie für weit geteilte GPTs möglichst enge Berechtigungen (z. B. ohne `donations:read`).
- **Prüfprotokoll.** Alle Änderungen, die über ChatGPT vorgenommen werden, laufen über dasselbe Änderungsprotokoll wie die Aktionen in B1 Admin – Sie finden sie unter **Einstellungen → Prüfprotokoll**.

## Kosten

ChurchApps ist kostenlos und Open Source – die API, die ChatGPT aufruft, ist Teil dessen, was Ihre Kirche ohnehin betreibt. OpenAI berechnet die Nutzung von ChatGPT gemäß den eigenen Tarifen. Von ChurchApps fallen keine Kosten pro Aufruf an.

## Fehlerbehebung

**Der MCP-Connector meldet „Unauthorized“ oder zeigt einen Fehler 401:** Ihr API-Schlüssel fehlt oder ist falsch. Öffnen Sie die Connector-Einstellungen und prüfen Sie, ob der Schlüssel im Argument `Authorization:Bearer` der vollständige Wert `cak_…` ohne zusätzliche Leerzeichen ist.

**ChatGPT sagt, es kann bestimmte Daten nicht finden:** Der Schlüssel hat möglicherweise nicht die richtigen Berechtigungen. Erstellen Sie unter **Einstellungen → Entwickler → API-Schlüssel** einen neuen Schlüssel mit den zusätzlichen Berechtigungen und aktualisieren Sie den Connector.

**Der Befehl `npx` schlägt fehl:** Node.js ist möglicherweise nicht installiert. Laden Sie es unter [nodejs.org](https://nodejs.org) herunter, installieren Sie es und speichern Sie den Connector erneut.

**Die Custom-GPT-Aktion liefert 401:** Prüfen Sie im Authentifizierungsbereich der Aktion, ob **Auth-Typ: Bearer** ausgewählt ist, und ob der Schlüssel nicht das Wort `Bearer` enthält (ChatGPT ergänzt es automatisch).

**Die Custom-GPT-Aktion liefert 403:** Der Schlüssel hat keine Berechtigung für diesen Endpunkt. Erstellen Sie einen neuen Schlüssel mit den passenden Berechtigungen und aktualisieren Sie den GPT.

**Das Aktionsschema wird abgelehnt:** ChatGPT erfordert OpenAPI 3.1 mit mindestens einem Eintrag unter `paths` und einer `servers`-URL. Prüfen Sie das YAML auf [editor.swagger.io](https://editor.swagger.io), bevor Sie es einfügen.

## Verwandte Themen

- [API-Schlüssel](/docs/developer/api/api-keys) – vollständige Referenz der Berechtigungen
- [MCP-Server (Entwicklerreferenz)](/docs/developer/api/mcp) – Protokolldetails und Tool-Schemata
- [Claude](./claude) – dasselbe Prinzip für die Modelle von Anthropic
- [REST-API-Referenz](/docs/developer/api/endpoints) – jeder Endpunkt, den eine Custom-GPT-Aktion aufrufen kann
