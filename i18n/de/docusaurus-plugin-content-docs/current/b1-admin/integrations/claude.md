---
title: "Claude"
---

# Claude

<div class="article-intro">

Stellen Sie Claude Fragen zu Ihrer Kirche in einfacher Sprache, und die Antwort stammt aus Ihren B1-Daten. Fragen wie *"Wie viele Erstbesucher kamen am Sonntag?"* oder *"Wer ist diesen Monat einer Kleingruppe beigetreten?"* -- oder bitten Sie Claude, etwas zu tun, etwa *"Füge unserer Website eine neue Seite namens Veranstaltungen hinzu."* Die Einrichtung dauert weniger als 3 Minuten, und Sie brauchen keine technischen Kenntnisse und keine Software zu installieren.

</div>

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- **Ein Claude-Konto.** Der **kostenlose Tarif funktioniert** -- ein guter Weg, es auszuprobieren. Kostenlose Konten haben jedoch ein tägliches Nachrichtenlimit, und Abfragen in B1 verbrauchen Nachrichten schnell. Wenn Sie es regelmäßig nutzen, empfehlen wir daher **Claude Pro** (etwa 20 $ pro Monat).
- **Ihr B1-Login** -- dasselbe, das Sie für B1 Admin verwenden.

</div>

:::tip Empfohlen -- kostenlos zum Testen
Claude ist der einfachste Weg, B1 mit KI zu verbinden, und es funktioniert im **kostenlosen Tarif** von Claude -- ideal, damit Ihre Kirche es testen kann, bevor sie für etwas bezahlt.
:::

Es gibt zwei Wege zur Verbindung. **Option 1 ist am einfachsten** -- kein Schlüssel und keine Installation nötig.

## Option 1 -- Mit B1 anmelden (am einfachsten)

Funktioniert auf der Claude-Website, in der Claude-Desktop-App und in der Claude-Handy-App -- einmal einrichten, und es steht auf allen zur Verfügung.

### Schritt 1 -- Claude-Connector-Einstellungen öffnen

1. Gehen Sie zu [claude.ai](https://claude.ai) und melden Sie sich an (oder erstellen Sie ein kostenloses Konto).
2. Klicken Sie unten links auf Ihren Namen und dann auf **Einstellungen** → **Connectors**.

### Schritt 2 -- B1 hinzufügen

1. Klicken Sie auf **Hinzufügen** und dann auf **Benutzerdefinierten Connector hinzufügen**.
2. **Name:** Geben Sie `B1` ein.
3. **URL:** Fügen Sie `https://api.churchapps.org/mcp` ein.
4. Lassen Sie die übrigen Optionen unverändert und klicken Sie auf **Hinzufügen**.

### Schritt 3 -- Bei B1 anmelden

1. Klicken Sie auf **Verbinden**. Eine B1-Anmeldeseite öffnet sich.
2. Melden Sie sich mit Ihrem B1-Konto an. Falls Sie mehreren Kirchen angehören, prüfen Sie oben, ob die richtige Kirche angezeigt wird.
3. B1 zeigt an, was Claude tun möchte, und bestätigt, dass Sie zurück zu **claude.ai** geleitet werden. Klicken Sie auf **Zulassen**.

Sie sind wieder in Claude, und B1 wird als verbunden angezeigt.

### Schritt 4 -- Etwas fragen

Starten Sie einen **neuen Chat** und probieren Sie zum Beispiel:

- *"Wie viele Personen gehören zu unserer Kirche?"*
- *"Liste unsere aktiven Gruppen auf."*
- *"Fasse die Spenden dieses Monats nach Fonds zusammen."*
- *"Wer ist in den letzten 30 Tagen unserer Kirche beigetreten?"*

Beim ersten Mal fragt Claude um Erlaubnis, B1 zu verwenden -- klicken Sie auf **Zulassen**.

## Option 2 -- Desktop-Erweiterung mit einem B1-Schlüssel

Verwenden Sie diese Option, wenn Sie Claude lieber einen Schlüssel mit eingeschränkten Rechten geben möchten (zum Beispiel nur Leserechte). Sie funktioniert in der Claude-Desktop-App für Mac oder Windows, und Sie benötigen die Berechtigung, Kircheneinstellungen in B1 zu verwalten, um einen Schlüssel zu erstellen.

### Schritt 1 -- Claude-App holen

Laden Sie die Claude-App über [claude.com/download](https://claude.com/download) herunter, installieren, öffnen und anmelden.

### Schritt 2 -- Ihren B1-Schlüssel erstellen

Der Schlüssel ermöglicht Claude den Zugang zu *Ihrer* B1-Umgebung der Kirche -- stellen Sie sich ihn wie ein Passwort nur für Claude vor.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und gehen Sie zu [Einstellungen → Entwickler](https://admin.b1.church/settings/developer).
2. Klicken Sie auf dem Reiter **API-Schlüssel** auf **Neuer API-Schlüssel**.
3. **Name:** Geben Sie `Claude` ein.
4. **Bereiche:** Markieren Sie, was Claude tun darf. Jeder Bereich hat ein Kästchen **Lesen** (nur ansehen) und ein Kästchen **Schreiben** (Änderungen vornehmen). Unsicher? Markieren Sie zunächst nur die Kästchen **Lesen** -- später können Sie jederzeit einen neuen Schlüssel mit mehr Rechten erstellen.
5. Klicken Sie auf **Speichern** und dann auf **Kopieren**. Der Schlüssel wird nur einmal angezeigt, gehen Sie daher direkt zu Schritt 3.

### Schritt 3 -- B1 zu Claude hinzufügen

1. [Laden Sie die B1-Erweiterung herunter](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Doppelklicken** Sie auf die heruntergeladene Datei (`b1-churchapps.mcpb`). Claude öffnet sich und zeigt **B1 (ChurchApps)** an.
3. Klicken Sie auf **Installieren**.
4. Wenn nach Ihrem **B1-API-Schlüssel** gefragt wird, fügen Sie den Schlüssel aus Schritt 2 ein und speichern Sie.
5. **Beenden Sie Claude vollständig** (Mac: **Cmd+Q** · Windows: Rechtsklick auf das Claude-Symbol in der Taskleiste → **Beenden**) und öffnen Sie es erneut.

Falls ein Doppelklick Claude nicht öffnet, gehen Sie in Claude zu **Einstellungen → Erweiterungen → Erweiterte Einstellungen → Erweiterung installieren…** und wählen Sie die heruntergeladene Datei aus. Starten Sie danach einen neuen Chat und stellen Sie eine Frage.

## Ist das sicher?

- Claude kann nur die Daten **Ihrer Kirche** sehen.
- **Mit Anmeldung (Option 1):** Claude kann nie mehr tun, als Ihr eigener B1-Login darf. Die B1-Anmeldeseite listet alles auf, was Claude tun darf, bevor Sie auf **Zulassen** klicken.
- **Mit Schlüssel (Option 2):** Claude kann nur das tun, was der Schlüssel erlaubt -- ein Schlüssel mit nur angekreuzten **Lesen**-Kästchen kann ansehen, aber nie etwas ändern.
- **So schalten Sie es ab:** Gehen Sie in B1 Admin zu **Einstellungen → Entwickler** und widerrufen Sie die App unter **Verbundene Apps** (Option 1) oder löschen Sie den Schlüssel unter **API-Schlüssel** (Option 2). Der Zugriff endet sofort. Sie können auch in Claude auf **Trennen** beim B1-Connector klicken.

## Was kostet es?

Die B1-Verbindung ist kostenlos -- sie ist Teil von ChurchApps. Claude selbst hat einen kostenlosen Tarif; Claude Pro (etwa 20 $ pro Monat) bietet deutlich mehr Nutzung. Siehe [claude.com/pricing](https://claude.com/pricing).

## Technische Details

Der Rest dieser Seite richtet sich an technisch versierte Nutzer und KI-Assistenten: Bereiche, andere Verbindungswege und die Funktionsweise.

### Bereiche

Claude kommuniziert mit B1 über den **Model Context Protocol (MCP)-Server**, der in die B1-API integriert ist (`https://api.churchapps.org/mcp`). Jeder Aufruf durchläuft dieselben Regeln für Authentifizierung, Berechtigungen und Kirchenzuordnung wie eine Anfrage aus B1 Admin. Claude ist auf die **Berechtigungen und Bereiche** des API-Schlüssels beschränkt und kann nicht auf Webhooks, OAuth-Admin-Endpunkte oder andere dem Betreiber vorbehaltene Pfade zugreifen.

Gängige Startkombinationen von Bereichen:

- **Nur-Lese-Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lesen + Notizen/Aufgaben hinzufügen:** `people:write` ergänzen
- **Vollständiger Betriebsassistent:** die gewünschten passenden `:write`-Bereiche ergänzen

Ein Schlüssel mit `donations:read` lässt Claude Spenden zusammenfassen, kann aber keine Gabe erfassen. Ein Schlüssel mit `people:write` kann eine Person hinzufügen, aber keine Spenden einsehen. Was jeder Bereich erlaubt, finden Sie unter [API-Schlüssel](/docs/developer/api/api-keys).

### Andere Verbindungswege

#### Claude Code (CLI)

Im Terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Das war's. Geben Sie in einer beliebigen Claude-Code-Sitzung `/mcp` ein, um zu prüfen, ob der Server `b1` verbunden ist, und stellen Sie dann Claude eine beliebige Frage zu Ihrer Kirche.

#### Claude Desktop -- manuelle Konfiguration (fortgeschritten)

Wenn Sie die Erweiterung nicht verwenden möchten, bearbeiten Sie die Konfigurationsdatei von Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Fügen Sie einen Eintrag für den Server `b1` hinzu, der über `mcp-remote` eine Verbindung zu B1 herstellt (erfordert [Node.js](https://nodejs.org)):

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

Starten Sie Claude Desktop neu. Das Connector-Menü im Chat-Eingabefeld zeigt dann `b1` mit seinen Werkzeugen an.

#### Claude.ai (Web) -- benutzerdefinierter Connector

Siehe **Option 1** oben. Der Connector verwendet OAuth 2.1: Claude ermittelt den Autorisierungsserver von B1 über `https://api.churchapps.org/.well-known/oauth-protected-resource`, registriert sich mit Dynamic Client Registration und meldet sich mit PKCE an. Bei Team- und Enterprise-Tarifen muss ein Eigentümer den Connector möglicherweise zuerst für die Organisation hinzufügen. Claude fordert keine bestimmten Bereiche an, daher bietet die Zustimmungsseite alles an, worauf das angemeldete B1-Konto zugreifen kann. Widerrufen Sie den Zugriff unter **Einstellungen → Entwickler → Verbundene Apps** in B1 Admin.

### So funktioniert es

Die B1-API stellt einen einzelnen MCP-Endpunkt unter `/mcp` bereit. Claude verbindet sich damit, authentifiziert sich mit Ihrem `cak_…`-Schlüssel und erhält Zugriff auf vier Werkzeuge:

| Werkzeug | Was es tut |
|---|---|
| `list_endpoints` | Listet die REST-Endpunkte auf, die Claude aufrufen kann, filterbar nach Pfad. Dient der Erkundung. |
| `describe_endpoint` | Gibt eine kurze Zusammenfassung und ein Beispiel für Anfrage und Antwort für einen bestimmten Endpunkt zurück. |
| `api_call` | Ruft einen REST-Endpunkt tatsächlich als authentifizierter Benutzer auf. |
| `describe_page_builder` | Eine Anleitung zum Erstellen und Bearbeiten der Seiten Ihrer Kirchenwebsite, die Claude liest, bevor es an Website-Inhalten arbeitet. |

Dies ist dieselbe Schnittstelle wie `/membership/people`, `/giving/donations`, `/attendance/visits` usw., die Ihr B1Admin verwendet -- jede Berechtigungsregel gilt identisch.

### Sicherheit und Grenzen

- **Trennung pro Kirche.** Der API-Schlüssel gehört zu genau einer Kirche. Claude kann die Daten anderer Kirchen nicht sehen.
- **Berechtigungsbasiert.** Wenn Sie in B1Admin einer Person, die den Schlüssel erstellt hat, eine Berechtigung entziehen, verliert Claude sie beim nächsten Aufruf -- sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, und Claudes Zugriff endet sofort.
- **Sperrliste.** Webhooks von Anbietern, Admin-Endpunkte für OAuth-Clients und die dem Betreiber vorbehaltene Route `apiEmails` können nicht über MCP aufgerufen werden.
- **Begrenzung der Antwortgröße.** Eine einzelne Werkzeugantwort ist auf 64 KB begrenzt, damit lange Listen Claudes Kontext nicht sprengen -- Claude wird in diesem Fall die Abfrage mit Filtern eingrenzen.
- **Prüfprotokoll.** Änderungen laufen über dasselbe Audit-Log wie Aktionen in B1Admin; Sie können sie unter **Einstellungen → Audit-Log** einsehen.

### Fehlerbehebung

**Claude meldet "Unauthorized" oder 401:** Das Bearer-Token fehlt, ist fehlerhaft oder der Schlüssel wurde widerrufen. Falls Sie die Erweiterung verwendet haben, öffnen Sie in Claude **Einstellungen → Erweiterungen → B1 (ChurchApps)** und fügen Sie den Schlüssel erneut ein. Andernfalls prüfen Sie den Header `Authorization: Bearer cak_…` erneut (auf das Leerzeichen und das wörtliche `Bearer` achten).

**Ein Werkzeugaufruf gibt 403 zurück:** Der API-Schlüssel hat nicht den Bereich für diesen Endpunkt. Fügen Sie den Bereich unter **Einstellungen → Entwickler → API-Schlüssel** hinzu (Sie müssen dafür einen neuen Schlüssel erstellen -- Bereiche lassen sich nicht nachträglich ändern) und fügen Sie den neuen Schlüssel in die Einstellungen der Erweiterung oder in die Konfiguration von Claude ein.

**Claude findet einen Endpunkt nicht:** Bitten Sie Claude, `list_endpoints` mit einem Filter aufzurufen, z. B. *"Verwende list_endpoints mit dem Filter 'donations', um den richtigen Pfad zu finden"*. Das Verzeichnis der Routen wird aus der laufenden API erzeugt, daher ist alles, was Sie mit `curl` erreichen können, dort enthalten.

**Lokale Entwicklung:** Ersetzen Sie `https://api.churchapps.org/mcp` durch `http://localhost:8084/mcp` -- dieselbe Authentifizierung, dieselben Werkzeuge.

## Verwandte Themen

- [API-Schlüssel](/docs/developer/api/api-keys) -- vollständige Referenz der Bereiche
- [MCP-Server (Entwicklerreferenz)](/docs/developer/api/mcp) -- Protokolldetails und Werkzeugschemata
- [ChatGPT](./chatgpt) -- dieselbe Idee, für die Modelle von OpenAI
