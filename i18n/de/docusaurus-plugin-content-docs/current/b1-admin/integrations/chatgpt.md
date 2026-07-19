---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Verbinden Sie OpenAIs ChatGPT mit den B1-Daten Ihrer Kirche, damit Sie Fragen wie "Wer war dieses Quartal nicht in einer Gruppe?" oder "Fasse die Spenden für den Baufonds diesen Monat zusammen" stellen können und ChatGPT die Antworten direkt aus B1 abruft. Zwei Wege werden unterstützt: ein **Custom GPT**, das mit jedem ChatGPT-Plus-Plan funktioniert, und der **MCP-Server** für Entwicklerwerkzeuge, die ihn unterstützen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchen-Admin mit der Berechtigung **Einstellungen bearbeiten** (um einen API-Schlüssel zu erstellen)
- Ein **ChatGPT Plus-, Pro-, Team- oder Enterprise**-Konto (die kostenlose Stufe kann keine Custom GPTs oder Connectors verwenden)
- Die vollständige URL Ihrer B1-API — üblicherweise `https://api.churchapps.org` für gehostete Kirchen oder Ihr selbst gehosteter Api-Host

</div>

## Den richtigen Weg wählen

| Weg | Benötigter Plan | Aufwand | Was Sie bekommen |
|---|---|---|---|
| **Custom GPT mit Actions** | ChatGPT Plus / Team / Enterprise | 10 Minuten | Ein teilbares GPT, das die REST-API von B1 für jedes Teammitglied aufruft |
| **MCP über OpenAI-Werkzeuge** | Developer / Agent SDK / Pro Connectors | Mehr | Vollständige Discovery über den MCP-Server, geeignet für Coding-Tools und Agenten-Plattformen |

Für die meisten Kirchen ist der **Custom-GPT**-Weg die richtige Wahl — er erfordert keine Entwickler-Einrichtung, funktioniert in der regulären ChatGPT-App und den mobilen Clients und kann mit Ihrem Team geteilt werden. Der MCP-Weg ist unten für technisches Personal dokumentiert, das OpenAIs Entwicklerwerkzeuge oder Agenten-Plattformen einsetzt.

## Weg A — Custom GPT mit Actions

Dies verdrahtet ChatGPT direkt mit der REST-API von B1. Ihr Custom GPT kann im Auftrag jedes Nutzers B1-Datensätze lesen und (optional) schreiben.

### 1. Einen API-Schlüssel erstellen

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, nennen Sie ihn `ChatGPT` und wählen Sie Scopes aus. Gängige Starter-Sets:
   - **Nur-Lese-Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Lesen + Schreiben:** die passenden `:write`-Scopes hinzufügen
3. Speichern und den vollständigen `cak_…`-Schlüssel kopieren.

Die vollständige Scope-Liste finden Sie unter [API-Schlüssel](/docs/developer/api/api-keys).

### 2. Das Custom GPT erstellen

1. Klicken Sie in ChatGPT auf Ihr Profil → **Meine GPTs** → **GPT erstellen**.
2. Wechseln Sie zum Tab **Konfigurieren** und geben Sie dem GPT einen Namen (z. B. "B1-Assistent") sowie Anweisungen wie:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scrollen Sie zu **Actions** → **Neue Action erstellen** → **Authentifizierung**.
   - **Authentifizierungstyp:** API-Schlüssel
   - **API-Schlüssel:** `cak_<prefix>.<secret>`
   - **Auth-Typ:** Bearer
   - Speichern.
4. Fügen Sie im Feld **Schema** eine minimale OpenAPI-Spezifikation ein, die die Endpunkte beschreibt, die das GPT verwenden soll. Ein Starter, der die häufigsten Lesevorgänge abdeckt:

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

   Erweitern Sie das Schema bei Bedarf um weitere Endpunkte — jede authentifizierte Route in B1 akzeptiert denselben `cak_…`-Schlüssel. Die [REST-API-Referenz](/docs/developer/api/endpoints) listet auf, was verfügbar ist.

5. Speichern Sie die Action. Testen Sie sie mit einer Eingabeaufforderung wie *"Wie viele Personen gibt es in der Kirche?"* — ChatGPT ruft `listPeople` auf und antwortet.
6. **Veröffentlichen** Sie das GPT (Nur ich / Jeder mit Link / Organisation) und teilen Sie es mit Ihrem Team.

### 3. Verwendung

Jeder, mit dem Sie das GPT teilen, kann Fragen in natürlicher Sprache stellen — ChatGPT wählt die richtige Action aus, ruft B1 auf und antwortet. Die Scopes des Schlüssels gelten weiterhin: Ein Nur-Lese-Schlüssel verweigert Schreibvorgänge, unabhängig davon, welche Action im Schema definiert ist.

## Weg B — MCP über OpenAI-Werkzeuge

Die B1-API enthält einen MCP-Server unter `/mcp`, den jedes MCP-fähige OpenAI-Werkzeug verwenden kann — zum Beispiel das [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), das MCP-Tool der Responses-API oder Agenten-Plattformen von Drittanbietern, die MCP-Server konsumieren.

Authentifizieren Sie sich mit demselben `cak_…`-Schlüssel im `Authorization: Bearer`-Header. Drei Werkzeuge werden bereitgestellt: `list_endpoints`, `describe_endpoint` und `api_call`. Protokoll, Transport und Werkzeug-Schemas finden Sie in der [MCP-Server-Entwicklerreferenz](/docs/developer/api/mcp).

Die integrierten "Connectors" von ChatGPT (Pro/Business/Enterprise) erwarten derzeit MCP-Server mit bestimmten `search`- und `fetch`-Werkzeug-Formen sowie OAuth-basierter Authentifizierung, was der B1-MCP-Server nicht anbietet. Für ChatGPT innerhalb der Consumer-App ist der Custom-GPT-Weg oben die praktische Wahl.

## Sicherheit und Limits

- **Isolation je Kirche.** Der API-Schlüssel löst sich zu genau einer Kirche auf. ChatGPT kann keine Daten anderer Kirchen sehen.
- **Berechtigungsbeschränkt.** Wenn Sie einer Person, die den Schlüssel erstellt hat, eine Berechtigung entziehen, verliert ChatGPT diese beim nächsten Aufruf — sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, und der Zugriff von ChatGPT endet sofort.
- **Ein geteiltes Custom GPT teilt die Daten.** Jeder mit Zugriff auf das GPT kann ihm Fragen stellen und alles sehen, wofür der Schlüssel Scopes hat. Beschränken Sie das Teilen auf Mitarbeitende, die diese Daten sehen sollten, und bevorzugen Sie engere Scopes (z. B. `donations:read` bei einem breit geteilten GPT weglassen).
- **Audit-Trail.** Mutationen durchlaufen dasselbe Audit-Log wie Aktionen in B1Admin; überprüfen Sie diese unter **Berichte → Audit-Protokoll**.

## Kosten

ChurchApps ist kostenlos und quelloffen — die API, die Ihr Custom GPT aufruft, ist Teil der API, die Ihre Kirche bereits betreibt. OpenAI berechnet die ChatGPT-Nutzung nach den eigenen Plänen. Es entstehen keine Kosten pro Aufruf durch ChurchApps.

## Fehlerbehebung

**Action liefert 401:** Der Bearer-Header ist nicht korrekt gesetzt. Stellen Sie im Authentifizierungsbereich der Action sicher, dass **Auth-Typ: Bearer** ausgewählt ist und der Schlüsselwert nicht das Wort `Bearer` enthält (ChatGPT stellt es automatisch voran).

**Action liefert 403:** Der Schlüssel hat nicht den Scope für diesen Endpunkt. Erstellen Sie einen neuen Schlüssel mit den richtigen Scopes und aktualisieren Sie das GPT.

**ChatGPT ruft die falsche Action auf:** Verschärfen Sie die Felder `summary` und `description` in Ihrem OpenAPI-Schema, damit das Modell die richtige auswählt. Auch das Hinzufügen von Beispiel-Anfragen zu den Anweisungen des GPT hilft.

**Der Action-Bereich lehnt das Schema ab:** ChatGPT verlangt OpenAPI 3.1 mit mindestens einem `paths`-Eintrag und einer `servers`-URL. Validieren Sie das YAML in einem beliebigen Online-OpenAPI-Validator, bevor Sie es einfügen.

**Lokale Entwicklung:** Richten Sie die `servers`-URL der Action auf Ihre lokale Api (z. B. `http://localhost:8084`) — beachten Sie jedoch, dass Actions von ChatGPT nur öffentliche URLs aufrufen. Verwenden Sie für lokale Tests daher einen Tunnel wie `ngrok`, oder sprechen Sie die API direkt mit `curl` an, um den Schlüssel zunächst zu bestätigen.

## Verwandte Themen

- [API-Schlüssel](/docs/developer/api/api-keys) — vollständige Scope-Referenz
- [MCP-Server (Entwicklerreferenz)](/docs/developer/api/mcp) — Protokolldetails und Werkzeug-Schemas
- [Claude](./claude) — dieselbe Idee, für die Modelle von Anthropic
- [REST-API-Referenz](/docs/developer/api/endpoints) — jeder Endpunkt, den eine Custom-GPT-Action erreichen kann
