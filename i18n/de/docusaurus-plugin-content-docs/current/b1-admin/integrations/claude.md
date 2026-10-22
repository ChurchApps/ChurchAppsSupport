---
title: "Claude"
---

# Claude

<div class="article-intro">

Verbinden Sie Claude von Anthropic mit den B1-Daten Ihrer Kirche. Fügen Sie B1 als benutzerdefinierten Connector in claude.ai hinzu und melden Sie sich an, oder verwenden Sie einen API-Schlüssel mit Claude Code oder Claude Desktop. Nach wenigen Minuten Einrichtung können Sie Claude Fragen stellen wie „Wie viele Erstbesucher kamen am Sonntag?“ oder „Entwirf eine Dankes-E-Mail an alle, die diesen Monat für den Gebäudefonds gespendet haben“ – und Claude liest die Antworten direkt aus den Unterlagen Ihrer Kirche, beschränkt auf Ihre Berechtigungen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Konto **Claude Pro/Max/Team/Enterprise** (für den benutzerdefinierten Connector in claude.ai) oder **Claude Code** (CLI / IDE-Erweiterung) oder **Claude Desktop** (Mac/Windows)
- Für die Einrichtung mit API-Schlüssel: eine Kirchenadministration mit der Berechtigung **Einstellungen bearbeiten** (um einen API-Schlüssel zu erstellen)
- Die vollständige URL Ihrer B1-API – meist `https://api.churchapps.org` für gehostete Kirchen oder der Host Ihrer eigenen Api-Installation

</div>

## Was Claude sehen kann

Claude kommuniziert mit B1 über den **Model Context Protocol (MCP)-Server**, der in die B1-API integriert ist. Jeder Aufruf, den Claude macht, durchläuft dieselben Authentifizierungs-, Berechtigungs- und Kirchenzuordnungsregeln wie eine Anfrage aus B1 Admin. Das bedeutet, Claude:

- sieht nur Daten Ihrer **eigenen** Kirche,
- ist auf die **Berechtigungen und Scopes** beschränkt, die der API-Schlüssel oder die Anmeldung besitzt, die Sie ihm geben,
- kann keine Webhooks, OAuth-Administrationsendpunkte oder andere Pfade erreichen, die nur dem Betreiber vorbehalten sind (diese sind gesperrt).

Ein Schlüssel mit `donations:read` lässt Claude Spenden zusammenfassen, aber keine Gabe erfassen. Ein Schlüssel mit `people:write` kann eine Person hinzufügen, aber keine Spenden einsehen. Wählen Sie die Berechtigungen, die zur Aufgabe passen.

## Einrichtung

Es gibt zwei Möglichkeiten, die Verbindung herzustellen:

- **Claude.ai-Connector** – am einfachsten. Sie melden sich bei B1 an und erteilen den Zugriff in Ihrem Browser, ohne einen Schlüssel kopieren zu müssen. Der Connector funktioniert auch in Claude Desktop und in den mobilen Claude-Apps, sobald er Ihrem Konto hinzugefügt wurde.
- **API-Schlüssel** – für Claude Code oder eine Konfigurationsdatei von Claude Desktop. Sie erstellen einen Schlüssel und fügen ihn in die Einstellungen von Claude ein.

### Claude.ai (Web) – benutzerdefinierter Connector

1. Öffnen Sie in Claude **Einstellungen → Connectors** und klicken Sie auf **Benutzerdefinierten Connector hinzufügen**. (In den Tarifen Team und Enterprise muss ein Eigentümer den Connector möglicherweise zuerst für die Organisation hinzufügen.)
2. Benennen Sie ihn `B1` und geben Sie die Server-URL `https://api.churchapps.org/mcp` ein. Klicken Sie anschließend auf **Hinzufügen**.
3. Klicken Sie auf **Verbinden**. Ein B1-Anmeldefenster öffnet sich. Melden Sie sich mit Ihrem B1-Konto an und wählen Sie gegebenenfalls Ihre Kirche aus.
4. Die Seite **ZUGRIFF ERFORDERLICH** zeigt den Namen der App, die Daten, die sie anfordert (zum Beispiel **Personen, Haushalte und Kontaktdaten einsehen** oder **Alles, worauf Ihr B1-Konto zugreifen kann**, falls nichts Engeres angefragt wurde), und die Adresse, zu der Sie nach Ihrer Auswahl zurückgeleitet werden. Prüfen Sie, dass dort **claude.ai** steht.
5. Klicken Sie auf **Erlauben**. Sie gelangen zurück zu Claude, und B1 wird als verbunden angezeigt.

Claude registriert sich beim ersten Verbinden bei B1. Deshalb vermerkt die Seite außerdem, dass sich die App selbst registriert hat und niemals mehr tun kann als Ihr eigenes B1-Konto. Um die Verbindung später zu trennen, gehen Sie in B1 Admin zu **Einstellungen → Entwickler → Verbundene Apps** und widerrufen Sie sie.

### Verwendung eines API-Schlüssels

#### 1. Einen API-Schlüssel erstellen

1. Gehen Sie in B1 Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, nennen Sie ihn `Claude` und wählen Sie die Scopes aus, die Claude haben soll. Übliche Ausgangssätze:
   - **Reiner Lese-Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lesen sowie Notizen/Aufgaben hinzufügen:** zusätzlich `people:write`
   - **Vollständiger Betriebsassistent:** zusätzlich die passenden `:write`-Scopes, die Sie wünschen
3. Speichern Sie. Der vollständige Schlüssel `cak_…` wird **einmal** angezeigt – kopieren Sie ihn.

Welche Berechtigung jeder Scope erlaubt, steht unter [API-Schlüssel](/docs/developer/api/api-keys).

#### 2. Claude verbinden

Wählen Sie den Claude-Client, den Sie verwenden:

##### Claude Code (CLI)

Im Terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Das war's. Geben Sie in einer beliebigen Claude-Code-Sitzung `/mcp` ein, um zu prüfen, ob der Server `b1` verbunden ist, und stellen Sie dann Claude eine beliebige Frage zu Ihrer Kirche.

##### Claude Desktop

Bearbeiten Sie die Konfigurationsdatei von Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Fügen Sie einen Eintrag für den Server `b1` hinzu. Neuere Versionen von Claude Desktop unterstützen HTTP-MCP direkt:

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

Falls Ihre Version von Claude Desktop nur stdio-Server unterstützt, leiten Sie die Verbindung über `mcp-remote` weiter:

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

Starten Sie Claude Desktop neu. Das Connector-Symbol im Chat-Eingabefeld zeigt `b1` mit drei Werkzeugen (`list_endpoints`, `describe_endpoint`, `api_call`).

### Claude etwas fragen

Nach der Verbindung ist keine spezielle Syntax nötig – Claude findet die verfügbaren Funktionen selbst. Beispiele:

- *„Wie viele Personen gehören zu meiner Kirche, und welche Gruppen sind aktiv?“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen.“*
- *„Liste die Personen auf, die beim Gottesdienst um 10 Uhr am letzten Sonntag anwesend waren, aber in den letzten 60 Tagen an keiner Mittwochsgruppe teilgenommen haben.“*
- *„Entwirf eine Willkommens-E-Mail für die vier Personen, die diese Woche hinzugefügt wurden, mit Anrede über den Vornamen.“*

Im Hintergrund ruft Claude die MCP-Werkzeuge auf – zuerst, um den richtigen Endpunkt zu finden, dann, um die Daten abzurufen – und antwortet in einfacher Sprache.

## So funktioniert es

Die B1-API stellt einen einzigen MCP-Endpunkt unter `/mcp` bereit. Claude verbindet sich damit, authentifiziert sich mit Ihrem Schlüssel `cak_…` oder der Anmeldung, die Sie bestätigt haben, und erhält Zugriff auf drei Werkzeuge:

| Werkzeug | Was es tut |
|---|---|
| `list_endpoints` | Listet die REST-Endpunkte auf, die Claude aufrufen kann, filterbar nach Pfad. Dient zur Suche. |
| `describe_endpoint` | Liefert eine kurze Beschreibung und ein Beispiel für Anfrage und Antwort eines bestimmten Endpunkts. |
| `api_call` | Ruft einen REST-Endpunkt tatsächlich im Namen des angemeldeten Benutzers auf. |

Dies ist dieselbe Oberfläche wie `/membership/people`, `/giving/donations`, `/attendance/visits` usw., die auch B1 Admin nutzt – alle Autorisierungsregeln gelten identisch.

## Sicherheit und Grenzen

- **Trennung pro Kirche.** Der API-Schlüssel oder die Anmeldung gehört zu genau einer Kirche. Claude kann die Daten anderer Kirchen nicht sehen.
- **Auf Berechtigungen beschränkt.** Wenn Sie in B1 Admin einer Person, die den Schlüssel erstellt (oder sich angemeldet) hat, eine Berechtigung entziehen, verliert Claude sie beim nächsten Aufruf – sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel** oder widerrufen Sie die claude.ai-Verbindung unter **Einstellungen → Entwickler → Verbundene Apps**. Der Zugriff von Claude endet sofort.
- **Sperrliste.** Webhooks von Anbietern, Administrationsendpunkte von OAuth-Clients und die nur dem Betreiber vorbehaltene Route `apiEmails` sind über MCP nicht aufrufbar.
- **Begrenzung der Antwortgröße.** Eine einzelne Werkzeugantwort ist auf 64 KB begrenzt, damit lange Listen nicht Claudes Kontext sprengen. Claude verengt die Abfrage in diesem Fall mit Filtern.
- **Prüfprotokoll.** Änderungen laufen über dasselbe Änderungsprotokoll wie die Aktionen in B1 Admin. Sie können sie unter **Einstellungen → Prüfprotokoll** einsehen.

## Kosten

ChurchApps ist kostenlos und Open Source – der MCP-Server ist Teil der API, die Ihre Kirche ohnehin betreibt. Anthropic berechnet die Nutzung von Claude gemäß den eigenen Tarifen. Von ChurchApps fallen keine Kosten pro Aufruf an.

## Fehlerbehebung

**Claude meldet „Unauthorized“ oder 401:** Das Bearer-Token fehlt, ist fehlerhaft oder der Schlüssel wurde widerrufen. Prüfen Sie den Header `Authorization: Bearer cak_…` erneut (beachten Sie das Leerzeichen und das wörtliche `Bearer`). Trennen Sie auf claude.ai den B1-Connector und verbinden Sie ihn neu, um sich erneut anzumelden.

**Ein Werkzeugaufruf liefert 403:** Der API-Schlüssel hat keine Berechtigung für diesen Endpunkt. Fügen Sie die Berechtigung unter **Einstellungen → Entwickler → API-Schlüssel** hinzu (Sie müssen dazu einen neuen Schlüssel erstellen – Scopes lassen sich nicht nachträglich ändern) und aktualisieren Sie die Konfiguration von Claude.

**Claude findet einen Endpunkt nicht:** Bitten Sie Claude, `list_endpoints` mit einem Filter aufzurufen, z. B. *„Verwende list_endpoints mit dem Filter 'donations', um den richtigen Pfad zu finden“*. Das Verzeichnis der Routen wird aus der laufenden API erzeugt, daher ist alles darin enthalten, was Sie auch mit `curl` erreichen können.

**Lokale Entwicklung:** Ersetzen Sie `https://api.churchapps.org/mcp` durch `http://localhost:8084/mcp` – dieselbe Authentifizierung, dieselben Werkzeuge.

## Verwandte Themen

- [API-Schlüssel](/docs/developer/api/api-keys) – vollständige Referenz der Berechtigungen
- [MCP-Server (Entwicklerreferenz)](/docs/developer/api/mcp) – Protokolldetails und Tool-Schemata
- [ChatGPT](./chatgpt) – dasselbe Prinzip für die Modelle von OpenAI
