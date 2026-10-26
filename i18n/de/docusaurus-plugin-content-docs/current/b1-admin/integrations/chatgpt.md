---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Verbinden Sie ChatGPT mit den Daten Ihrer Gemeinde in B1 und stellen Sie Fragen in einfacher Sprache – es antwortet anhand Ihrer aktuellen Gemeindedaten. Sie können es auch bitten, bei Aufgaben zu helfen, die in B1 Admin mehrere Schritte erfordern würden.

**Einige Beispiele für Fragen:**
- *„Zeig mir alle, die letzte Woche da waren, aber noch keiner Kleingruppe zugeordnet sind“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen“*
- *„Wer sind unsere neuesten Mitglieder, und haben wir uns bei ihnen gemeldet?“*
- *„Ich komme in B1 bei X nicht weiter – kannst du mir Schritt für Schritt erklären, wie es geht?“*

</div>

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- **Die ChatGPT-Desktop-App** für Mac oder Windows
- **Ein kostenpflichtiger ChatGPT-Tarif** (Plus oder höher). Kostenlose ChatGPT-Konten können sich nicht mit B1 verbinden.
- **Ihr B1-Login** mit der Berechtigung, Gemeindeeinstellungen zu verwalten (nötig, um einen Schlüssel zu erstellen). Haben Sie diese nicht? Fragen Sie die B1-Administration Ihrer Gemeinde.

</div>

:::tip Empfohlen: Probieren Sie zuerst Claude – es ist kostenlos
[Claude](./claude) verbindet sich im **kostenlosen Tarif** mit B1 und ist in weniger als 3 Minuten eingerichtet – fügen Sie B1 einfach als Connector hinzu und melden Sie sich mit Ihrem B1-Konto an. Es ist kein Schlüssel nötig. So kann Ihre Gemeinde KI mit B1 am einfachsten ausprobieren, bevor sie für etwas bezahlt.
:::

## Einrichtung

Die Bildschirme in Ihrer Version von ChatGPT können etwas anders aussehen.

---

**Schritt 1 — Erstellen Sie Ihren B1-Schlüssel**

Der Schlüssel ist das, was ChatGPT Zugang zu *Ihrer* Gemeinde in B1 verschafft – stellen Sie ihn sich wie ein Passwort nur für ChatGPT vor.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und gehen Sie zu [Settings → Developer](https://admin.b1.church/settings/developer).
2. Klicken Sie auf dem Reiter **API Keys** auf **New API Key** und nennen Sie ihn `ChatGPT`.
3. **Scopes:** Kreuzen Sie an, was ChatGPT tun darf. Jeder Bereich hat ein Kästchen **read** (nur ansehen) und ein Kästchen **write** (Änderungen vornehmen). Sie sind unsicher? Kreuzen Sie zum Einstieg nur die **read**-Kästchen an.
4. Klicken Sie auf **Save** und dann auf **Copy**, um den Schlüssel zu kopieren (er beginnt mit `cak_`). Er wird nur einmal angezeigt.

---

**Schritt 2 — Klicken Sie unten links in ChatGPT auf Ihren Namen**

![Klicken Sie auf Ihren Profilnamen](/img/guides/chatgpt-mcp/01.png)

---

**Schritt 3 — Klicken Sie auf Settings**

![Klicken Sie im Menü auf Settings](/img/guides/chatgpt-mcp/02.png)

---

**Schritt 4 — Klicken Sie in der linken Seitenleiste auf Plugins**

![Klicken Sie unter Integrations auf Plugins](/img/guides/chatgpt-mcp/03.png)

---

**Schritt 5 — Klicken Sie auf den Reiter MCPs**

![Klicken Sie auf den Reiter MCPs](/img/guides/chatgpt-mcp/04.png)

Hier sehen Sie alle MCP-Server, die Sie bereits hinzugefügt haben.

---

**Schritt 6 — Klicken Sie auf Add → Add MCP server**

![Klicken Sie auf Add und dann auf Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Schritt 7 — Füllen Sie das Formular aus und klicken Sie auf Save**

![Formular Mit einem benutzerdefinierten MCP verbinden](/img/guides/chatgpt-mcp/07.png)

Klicken Sie auf **Streamable HTTP** und füllen Sie dann aus:

| Feld | Was einzutragen ist |
|---|---|
| **Name** | `B1 Church` (oder ein beliebiger Name) |
| **Type** | Klicken Sie auf **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Leer lassen |
| **Headers** | Klicken Sie auf **+ Add header** → Key: `Authorization` → Value: siehe unten |

![Ausgefülltes Beispiel mit Authorization als Key und Bearer-Schlüssel als Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_ihrschluessel` — das Wort Bearer, ein Leerzeichen und dann Ihr Schlüssel

Klicken Sie auf **Save**.

Das war's! Gehen Sie zurück in einen Chat und fragen Sie etwas wie *„Wie viele Personen gehören zu unserer Gemeinde?“* – ChatGPT holt die Antwort direkt aus B1.

---

## Ist das sicher?

- ChatGPT kann nur **die Daten Ihrer Gemeinde** sehen.
- Es kann nur das tun, was Ihr Schlüssel erlaubt – ein Schlüssel, bei dem nur **read**-Kästchen angekreuzt sind, kann ansehen, aber nie etwas ändern.
- Um es abzuschalten, löschen Sie den Schlüssel in B1 Admin unter **Settings → Developer**. Der Zugriff endet sofort.

## Was kostet das?

Die Verbindung zu B1 ist kostenlos – sie ist Teil von ChurchApps. Für die Verbindung mit ChatGPT benötigen Sie einen kostenpflichtigen Tarif (Plus oder höher); siehe die Preise von OpenAI.

## Technische Details

Der Rest dieser Seite richtet sich an technisch versierte Nutzerinnen und Nutzer sowie KI-Assistenten. Der MCP-Server von B1 ist unter `https://api.churchapps.org/mcp` (Streamable HTTP) erreichbar und erwartet den API-Schlüssel als Header `Authorization: Bearer cak_…`. Siehe die [Entwicklerreferenz zum MCP-Server](/docs/developer/api/mcp).

### Custom GPT mit Actions

Ein Custom GPT ermöglicht es Ihnen, einen eigenen Assistenten zu erstellen, den Ihr ganzes Team gemeinsam nutzen kann – alle öffnen einen Link und können ohne eigene Einrichtung Fragen stellen. Dafür benötigen Sie ein ChatGPT-Plus-, Team- oder Enterprise-Konto und etwa 10 Minuten.

#### 1. Einen API-Schlüssel erstellen

Folgen Sie Schritt 1 unter „Einrichtung“ weiter oben, falls Sie das noch nicht getan haben.

#### 2. Den Custom GPT erstellen

1. Klicken Sie in ChatGPT auf Ihr Profil → **My GPTs** → **Create a GPT**.
2. Wechseln Sie zum Reiter **Configure**, geben Sie dem GPT einen Namen (z. B. „B1 Assistant“) und fügen Sie Anweisungen hinzu:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scrollen Sie zu **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** Fügen Sie Ihren `cak_…`-Schlüssel ein
   - **Auth Type:** Bearer
   - Speichern.

4. Fügen Sie im Feld **Schema** diese Start-Spezifikation im OpenAPI-Format ein:

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

5. Speichern Sie die Action. Testen Sie sie mit: *„Wie viele Personen gehören zur Gemeinde?“* – ChatGPT ruft `listPeople` auf und beantwortet die Frage.
6. **Veröffentlichen** Sie den GPT (Only me / Anyone with link / Organization) und teilen Sie den Link mit Ihrem Team.

#### 3. Verwenden

Jeder, der den Link hat, kann Fragen in natürlicher Sprache stellen. Die Scopes des Schlüssels gelten weiterhin – ein Schlüssel mit nur Leserechten lehnt Schreibvorgänge ab, unabhängig davon, was das Action-Schema vorsieht.

---

### Sicherheit und Grenzen

- **Trennung pro Gemeinde.** Der API-Schlüssel gehört zu genau einer Gemeinde. ChatGPT kann die Daten anderer Gemeinden nicht sehen.
- **Auf Berechtigungen beschränkt.** Der Schlüssel enthält nur die Scopes, die Sie vergeben haben. Entfernen Sie einen Scope (indem Sie den Schlüssel löschen und neu erstellen), endet dieser Zugriff beim nächsten Aufruf.
- **Sofort widerrufbar.** Löschen Sie den Schlüssel unter **Settings → Developer → API Keys**, und der Zugriff endet sofort.
- **Das Teilen eines Custom GPT teilt auch die Daten.** Alle, die Zugriff auf den GPT haben, können alles sehen, was die Scopes des Schlüssels erlauben. Wählen Sie für weit geteilte GPTs lieber engere Scopes (z. B. ohne `donations:read`).
- **Audit-Protokoll.** Änderungen, die über ChatGPT vorgenommen werden, durchlaufen dasselbe Audit-Protokoll wie Aktionen in B1 Admin – Sie finden sie unter **Settings → Audit Log**.

### Fehlerbehebung

**Der MCP-Connector meldet „Unauthorized“ oder zeigt einen Fehler 401:** Ihr API-Schlüssel fehlt oder ist falsch. Öffnen Sie die Connector-Einstellungen und prüfen Sie den Header **Authorization**: Der Wert sollte das Wort `Bearer`, ein Leerzeichen und dann den vollständigen `cak_…`-Schlüssel ohne zusätzliche Leerzeichen enthalten.

**ChatGPT sagt, es kann bestimmte Daten nicht finden:** Dem Schlüssel fehlen möglicherweise die passenden Scopes. Erstellen Sie unter **Settings → Developer → API Keys** einen neuen Schlüssel mit den zusätzlichen Scopes und aktualisieren Sie den Connector.

**Custom-GPT-Action liefert 401:** Prüfen Sie im Authentifizierungsbereich der Action, ob **Auth Type: Bearer** ausgewählt ist und der Schlüssel das Wort `Bearer` nicht selbst enthält (ChatGPT fügt es automatisch hinzu).

**Custom-GPT-Action liefert 403:** Dem Schlüssel fehlt der Scope für diesen Endpunkt. Erstellen Sie einen neuen Schlüssel mit den passenden Scopes und aktualisieren Sie den GPT.

**Das Action-Schema wird abgelehnt:** ChatGPT verlangt OpenAPI 3.1 mit mindestens einem Eintrag unter `paths` und einer `servers`-URL. Prüfen Sie das YAML auf [editor.swagger.io](https://editor.swagger.io), bevor Sie es einfügen.

## Verwandt

- [API-Schlüssel](/docs/developer/api/api-keys) — vollständige Übersicht der Scopes
- [MCP-Server (Entwicklerreferenz)](/docs/developer/api/mcp) — Protokolldetails und Tool-Schemas
- [Claude](./claude) — dasselbe Prinzip für die Modelle von Anthropic
- [REST-API-Referenz](/docs/developer/api/endpoints) — alle Endpunkte, die eine Custom-GPT-Action aufrufen kann
