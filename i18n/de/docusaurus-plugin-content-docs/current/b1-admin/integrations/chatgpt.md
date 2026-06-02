---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Verbinden Sie ChatGPT von OpenAI mit Ihren B1-Daten Ihrer Kirchengemeinde, damit Sie Fragen wie "wer war dieses Quartal nicht in einer Gruppe?" oder "fassen Sie die Spenden für den Baufonds diesen Monat zusammen" stellen können und ChatGPT die Antworten direkt aus B1 abruft. Zwei Wege werden unterstützt: ein **Custom GPT**, das auf jedem ChatGPT Plus-Plan funktioniert, und der **MCP-Server** für Entwickler-Werkzeuge, die ihn unterstützen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchengemeinde-Admin mit der Berechtigung **Einstellungen bearbeiten** (zum Erstellen eines API-Schlüssels)
- Ein **ChatGPT Plus, Pro, Team oder Enterprise**-Konto (der kostenlose Plan kann Custom GPTs oder Connectors nicht verwenden)
- Die vollständige URL Ihrer B1 API -- normalerweise `https://api.churchapps.org` für gehostete Kirchengemeinden oder Ihr selbst gehosteter Api-Host

</div>

## Wählen Sie den richtigen Weg

| Weg | Plan erforderlich | Aufwand | Was Sie erhalten |
|---|---|---|---|
| **Custom GPT mit Actions** | ChatGPT Plus / Team / Enterprise | 10 Minuten | Ein teilbares GPT, das B1s REST API für alle Teamkollegen aufruft |
| **MCP über OpenAI-Werkzeuge** | Entwickler / Agent SDK / Pro Connectors | Mehr | Vollständige Entdeckung über den MCP-Server, geeignet für Codierungs-Werkzeuge und Agent-Plattformen |

Für die meisten Kirchengemeinden ist der **Custom GPT**-Weg die richtige Antwort -- er erfordert keine Entwickler-Einrichtung, funktioniert in der regulären ChatGPT-App und mobilen Clients und kann mit Ihrem Team geteilt werden. Der MCP-Weg ist unten für technisches Personal dokumentiert, das OpenAI-Entwickler-Werkzeuge oder Agent-Plattformen verwendet.

## Weg A -- Custom GPT mit Actions

Dies verbindet ChatGPT direkt mit B1s REST API. Ihr Custom GPT kann B1-Datensätze im Namen von wem auch immer ihn verwendet, lesen und (optional) schreiben.

### 1. Erstellen Sie einen API-Schlüssel

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm den Namen `ChatGPT` und wählen Sie Bereiche aus. Häufige Starter-Sets:
   - **Nur-Lesen-Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Lesen + Schreiben:** fügen Sie die entsprechenden `:write`-Bereiche hinzu
3. Speichern und kopieren Sie den vollständigen `cak_…`-Schlüssel.

Siehe [API-Schlüssel](/docs/developer/api/api-keys) für die vollständige Scope-Liste.

### 2. Erstellen Sie das Custom GPT

1. Klicken Sie in ChatGPT auf Ihr Profil → **Meine GPTs** → **Erstellen Sie ein GPT**.
2. Wechseln Sie zur Registerkarte **Konfigurieren** und geben Sie dem GPT einen Namen (z.B. "B1-Assistent") und Anweisungen wie:

```
Sie helfen dem Kirchenpersonal, ihre B1-Datensätze abzufragen. Verwenden Sie die B1 API-Aktionen
zum Nachschlagen von Personen, Gruppen, Anwesenheit, Spenden und Inhalten. Beschränken Sie immer
Antworten auf Daten, die der Benutzer einsehen darf. Seien Sie prägnant.
```

3. Scrollen Sie zu **Aktionen** → **Neue Aktion erstellen** → **Authentifizierung**.
   - **Authentifizierungstyp:** API-Schlüssel
   - **API-Schlüssel:** `cak_<prefix>.<secret>`
   - **Auth-Typ:** Bearer
   - Speichern.

4. Fügen Sie im **Schema**-Feld eine minimale OpenAPI-Spezifikation ein (siehe Original-Datei für YAML-Code)

5. Speichern Sie die Aktion. Testen Sie sie mit einer Eingabeaufforderung wie *"wie viele Personen gibt es in der Kirchengemeinde?"* -- ChatGPT ruft `listPeople` auf und beantwortet.
6. **Veröffentlichen** Sie das GPT (Nur ich / Jeder mit Link / Organisation) und teilen Sie es mit Ihrem Team.

### 3. Nutzen Sie es

Jeder, mit dem Sie das GPT teilen, kann natürlichsprachige Fragen stellen -- ChatGPT wählt die richtige Aktion aus, ruft B1 auf und antwortet. Die Bereiche des Schlüssels gelten immer noch: Ein Nur-Lesen-Schlüssel verweigert Schreibvorgänge, unabhängig von der in der Schemadefinierten Aktion.

## Weg B -- MCP über OpenAI-Werkzeuge

Die B1 API enthält einen MCP-Server unter `/mcp`, den jedes MCP-bewusste OpenAI-Werkzeug verwenden kann -- zum Beispiel das [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), das Responses API MCP-Werkzeug oder Drittanbieter-Agent-Plattformen, die MCP-Server verwenden.

Authentifizieren Sie sich mit demselben `cak_…`-Schlüssel im `Authorization: Bearer`-Header. Drei Werkzeuge sind verfügbar: `list_endpoints`, `describe_endpoint` und `api_call`. Siehe die [MCP-Server-Entwickler-Referenz](/docs/developer/api/mcp) für Protokoll-, Transport- und Werkzeug-Schemas.

ChatGPTs integrierte "Connectors" (Pro/Business/Enterprise) erwarten derzeit MCP-Server mit spezifischen `search`- und `fetch`-Werkzeug-Formen und OAuth-basierter Authentifizierung, die der B1 MCP-Server nicht anbietet. Für ChatGPT in der Consumer-App ist der Custom GPT-Weg oben die praktische Wahl.

## Sicherheit und Grenzen

- **Pro-Kirchengemeinde-Isolation.** Der API-Schlüssel wird zu einer Kirchengemeinde aufgelöst. ChatGPT kann die Daten anderer Kirchengemeinden nicht einsehen.
- **Berechtigung-limitiert.** Wenn Sie eine Berechtigung von der Person wegnehmen, die den Schlüssel erstellt hat, verliert ChatGPT sie beim nächsten Aufruf -- sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel in **Einstellungen → Entwickler → API-Schlüssel** und ChatGPTs Zugriff endet sofort.
- **Sharing eines Custom GPT teilt die Daten.** Jeder mit Zugriff auf das GPT kann Fragen stellen und sehen, was die Bereiche des Schlüssels zulassen. Teilen Sie Sharing auf Personal, das diese Daten einsehen sollte, und ziehen Sie engere Bereiche vor (z.B. `donations:read` für ein GPT, das weit verteilt ist, weglassen).
- **Audit-Trail.** Mutationen gehen durch das gleiche Audit-Log wie B1Admin-Aktionen; überprüfen Sie sie unter **Berichte → Audit-Log**.

## Kosten

ChurchApps ist kostenlos und Open Source -- die API, die Ihr Custom GPT aufruft, ist Teil der API, die Ihre Kirchengemeinde bereits ausführt. OpenAI berechnet die Nutzung von ChatGPT nach ihren Plänen. Es gibt keine pro-Aufruf-Kosten von ChurchApps.

## Problemlösung

**Aktion gibt 401 zurück:** der Bearer-Header ist nicht richtig eingestellt. Stellen Sie im Authentifizierungs-Fenster der Aktion sicher, dass **Auth-Typ: Bearer** ausgewählt ist und der Schlüsselwert das Wort `Bearer` nicht enthält (ChatGPT stellt es für Sie voran).

**Aktion gibt 403 zurück:** der Schlüssel hat nicht den Scope für diesen Endpunkt. Erstellen Sie einen neuen Schlüssel mit den richtigen Bereichen und aktualisieren Sie das GPT.

**ChatGPT ruft die falsche Aktion auf:** verengen Sie die `summary`- und `description`-Felder in Ihrem OpenAPI-Schema, sodass das Modell die richtige aussucht. Das Hinzufügen von Beispiel-Abfragen zu den GPT-Anweisungen hilft auch.

**Das Aktions-Fenster lehnt das Schema ab:** ChatGPT erfordert OpenAPI 3.1 mit mindestens einem `paths`-Eintrag und eine `servers`-URL. Validieren Sie das YAML in einem beliebigen Online-OpenAPI-Validator, bevor Sie es einfügen.

**Lokale Entwicklung:** zeigen Sie die `servers`-URL der Aktion auf Ihren lokalen Api (z.B. `http://localhost:8084`) -- aber beachten Sie, dass ChatGPTs Aktionen nur öffentliche URLs aufrufen, also verwenden Sie für lokale Tests einen Tunnel wie `ngrok` oder treffen Sie die API direkt mit `curl`, um den Schlüssel zunächst zu bestätigen.

## Verwandt

- [API-Schlüssel](/docs/developer/api/api-keys) -- vollständige Scope-Referenz
- [MCP-Server (Entwickler-Referenz)](/docs/developer/api/mcp) -- Protokoll-Details und Werkzeug-Schemas
- [Claude](./claude) -- gleiche Idee für Anthropic-Modelle
- [REST API-Referenz](/docs/developer/api/endpoints) -- alle Endpunkte, die ein Custom GPT aufrufen kann
