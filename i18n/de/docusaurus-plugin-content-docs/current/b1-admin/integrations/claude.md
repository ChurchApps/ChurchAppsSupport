---
title: "Claude"
---

# Claude

<div class="article-intro">

Verbinden Sie Anthropics Claude mit den Daten Ihrer Gemeinde in B1. Mit einem API-Schlüssel und wenigen Minuten Setup können Sie Claude Fragen wie „Wie viele Erstbesucher sind am Sonntag gekommen?" oder „Verfassen Sie eine Dankesmail an die Personen, die diesen Monat zum Gebäudefonds gespendet haben" stellen – und Claude liest die Antworten direkt aus den Aufzeichnungen Ihrer Gemeinde, begrenzt auf Ihre Berechtigungen.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein Gemeinde-Admin mit der Berechtigung **Einstellungen bearbeiten** (um einen API-Schlüssel zu erstellen)
- Eines davon: **Claude Code** (CLI / IDE-Erweiterung), **Claude Desktop** (Mac/Windows) oder ein **Claude Pro/Max/Team**-Konto
- Die vollständige URL Ihrer B1 API – normalerweise `https://api.churchapps.org` für gehostete Gemeinden, oder Ihr selbstgehosteter Api-Host

</div>

## Was Claude sehen kann

Claude spricht mit B1 über den **Model Context Protocol (MCP) Server**, der in die B1 API integriert ist. Jeder Aufruf, den Claude tätigt, durchläuft die gleichen Authentifizierungs-, Genehmigungs- und Kirchen-Scoping-Regeln wie eine Anfrage von B1Admin – das bedeutet, Claude:

- Sieht nur Daten **Ihrer** Gemeinde
- Ist auf die **Berechtigungen und Geltungsbereiche** beschränkt, die der von Ihnen bereitgestellte API-Schlüssel trägt
- Kann nicht auf Webhooks, OAuth-Admin-Endpoints oder andere Operator-only-Pfade zugreifen (diese sind auf einer Blockliste)

Ein `donations:read`-Schlüssel lässt Claude die Spenden zusammenfassen, kann aber keine Gabe aufzeichnen. Ein `people:write`-Schlüssel kann eine Person hinzufügen, kann aber keine Spenden sehen. Wählen Sie die Geltungsbereiche, die zu Ihrer Arbeit passen.

## Setup

### 1. Erstellen Sie einen API-Schlüssel

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm den Namen `Claude` und wählen Sie die Geltungsbereiche aus, die Claude haben soll. Häufige Starter-Sets:
   - **Schreibgeschützter Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lesen + Notizen/Aufgaben hinzufügen:** fügen Sie `people:write` hinzu
   - **Vollständiger operativer Assistent:** fügen Sie die entsprechenden `:write`-Geltungsbereiche hinzu, die Sie möchten
3. Speichern. Der vollständige `cak_…`-Schlüssel wird **einmalig** angezeigt – kopieren Sie ihn.

Siehe [API-Schlüssel](/docs/developer/api/api-keys) für die Details zu jedem Geltungsbereich.

### 2. Verbinden Sie Claude

Wählen Sie den Claude-Client, den Sie verwenden:

#### Claude Code (CLI)

Geben Sie in einem Terminal ein:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Das ist alles. In jeder Claude Code-Sitzung können Sie `/mcp` eingeben, um zu bestätigen, dass der `b1`-Server verbunden ist, und Claude dann jede Frage zu Ihrer Gemeinde stellen.

#### Claude Desktop

Bearbeiten Sie die Konfigurationsdatei von Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Fügen Sie einen `b1`-Server-Eintrag hinzu. Neuere Versionen von Claude Desktop unterstützen HTTP MCP nativ:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

Wenn Ihre Claude Desktop-Version nur stdio-Server unterstützt, überbrücken Sie über `mcp-remote`:

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Starten Sie Claude Desktop neu. Das Connector-Symbol in der Chat-Composer zeigt `b1` mit drei Tools (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (Web) – Benutzerdefinierten Connector

Das Feature „Benutzerdefinierten Connector hinzufügen" von Claude.ai erfordert OAuth, das der B1 MCP Server heute nicht unterstützt. Verwenden Sie stattdessen Claude Code oder Claude Desktop.

### 3. Fragen Sie Claude etwas

Nach der Verbindung ist keine spezielle Syntax erforderlich – Claude erkennt automatisch, was verfügbar ist. Beispiele:

- *„Wie viele Personen sind in meiner Gemeinde und welche sind die aktiven Gruppen?"*
- *„Fassen Sie die Spenden dieses Monats nach Fonds zusammen."*
- *„Zeichnen Sie die Personen auf, die am letzten Sonntag den 10-Uhr-Gottesdienst besucht haben, aber in den letzten 60 Tagen nicht zu einer Mittwoch-Gruppe gegangen sind."*
- *„Verfassen Sie eine Willkommens-E-Mail für die vier Personen, die diese Woche hinzugefügt wurden, adressiert mit Vornamen."*

Hinter den Kulissen ruft Claude die MCP-Tools auf – zuerst um den richtigen Endpoint zu entdecken, dann um die Daten zu holen – und antwortet in klarer Sprache.

## Wie es funktioniert

Die B1 API stellt einen einzelnen MCP-Endpoint unter `/mcp` bereit. Claude stellt eine Verbindung her, authentifiziert sich mit Ihrem `cak_…`-Schlüssel und erhält Zugriff auf drei Tools:

| Tool | Was es tut |
|---|---|
| `list_endpoints` | Listet die REST-Endpoints auf, die Claude aufrufen kann, filtert nach Pfad. Wird zur Ermittlung verwendet. |
| `describe_endpoint` | Gibt eine kurze Zusammenfassung und ein Beispiel für Request/Response für einen bestimmten Endpoint zurück. |
| `api_call` | Ruft tatsächlich einen REST-Endpoint als authentifizierter Benutzer auf. |

Dies ist die gleiche `/membership/people`, `/giving/donations`, `/attendance/visits` usw. Oberfläche, die Ihre B1Admin verwendet – jede Autorisierungsregel gilt identisch.

## Sicherheit und Limits

- **Pro-Gemeinde-Isolation.** Der API-Schlüssel löst sich zu einer Gemeinde auf. Claude hat keine Möglichkeit, Daten anderer Gemeinden zu sehen.
- **Berechtigung-gescoped.** Wenn Sie eine Berechtigung von der Person entfernen, die den Schlüssel in B1Admin erstellt hat, verliert Claude diese beim nächsten Aufruf – sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel** und Claudes Zugriff endet sofort.
- **Blockliste.** Provider-Webhooks, OAuth-Client-Admin-Endpoints und die Operator-only-Route `apiEmails` können nicht über MCP aufgerufen werden.
- **Antwortgrößenbegrenzung.** Eine einzelne Tool-Antwort ist auf 64 KB begrenzt, damit lange Listen Claudes Kontext nicht überlasten – Claude wird die Abfrage mit Filtern einengen, wenn dies passiert.
- **Audit-Trail.** Mutationen durchlaufen das gleiche Audit-Log wie B1Admin-Aktionen; Sie können diese unter **Berichte → Audit-Log** überprüfen.

## Kosten

ChurchApps ist kostenlos und Open-Source – der MCP Server ist Teil der API, die Ihre Gemeinde bereits ausführt. Anthropic berechnet die Claude-Nutzung nach ihren Plänen. Es gibt keine Pro-Aufruf-Kosten von ChurchApps.

## Fehlerbehebung

**Claude meldet „Unauthorized" oder 401:** Das Bearer-Token fehlt, ist malformed oder der Schlüssel wurde widerrufen. Überprüfen Sie den Header `Authorization: Bearer cak_…` nochmal (beachten Sie das Leerzeichen und das Literal `Bearer`).

**Ein Tool-Aufruf gibt 403 zurück:** Der API-Schlüssel hat nicht den Geltungsbereich für diesen Endpoint. Fügen Sie den Geltungsbereich unter **Einstellungen → Entwickler → API-Schlüssel** hinzu (Sie müssen einen neuen Schlüssel erstellen – Geltungsbereiche können nicht geändert werden) und aktualisieren Sie Claudes Konfiguration.

**Claude kann einen Endpoint nicht finden:** Bitten Sie ihn, `list_endpoints` mit einem Filter aufzurufen, z.B. *„Verwenden Sie list_endpoints mit dem Filter ‚donations', um den richtigen Pfad zu finden"*. Das Route-Inventar wird aus der Live-API generiert, also ist alles, was Sie mit `curl` treffen können, dort.

**Lokale Entwicklung:** Tauschen Sie `https://api.churchapps.org/mcp` gegen `http://localhost:8084/mcp` – gleiche Auth, gleiche Tools.

## Verwandt

- [API-Schlüssel](/docs/developer/api/api-keys) – Vollständige Geltungsbereichs-Referenz
- [MCP Server (Entwickler-Referenz)](/docs/developer/api/mcp) – Protokoll-Details und Tool-Schemata
- [ChatGPT](./chatgpt) – Gleiche Idee, für OpenAIs Modelle
