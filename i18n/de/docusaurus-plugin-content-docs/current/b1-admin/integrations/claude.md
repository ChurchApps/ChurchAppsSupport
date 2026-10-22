---
title: "Claude"
---

# Claude

<div class="article-intro">

Stellen Sie Claude Fragen zu Ihrer Gemeinde in ganz normaler Sprache, und Claude antwortet anhand Ihrer B1-Daten. Fragen wie *„Wie viele Erstbesucher sind am Sonntag gekommen?“* oder *„Wer ist diesen Monat einer Kleingruppe beigetreten?“* – oder bitten Sie Claude, etwas zu erledigen, etwa *„Füge unserer Website eine neue Seite namens Veranstaltungen hinzu.“* Die Einrichtung dauert weniger als 3 Minuten, und Sie brauchen weder technische Kenntnisse noch Software, die Sie installieren müssten.

</div>

<div class="prereqs">
<h4>Was Sie brauchen</h4>

- **Ein Claude-Konto.** Der **kostenlose Plan funktioniert** – eine gute Möglichkeit, es auszuprobieren. Kostenlose Konten haben allerdings ein tägliches Nachrichtenlimit, und Abfragen in B1 verbrauchen Nachrichten schnell. Wenn Sie es regelmäßig nutzen, empfehlen wir daher **Claude Pro** (etwa 20 US-Dollar/Monat).
- **Ihre B1-Anmeldung** – dieselbe, die Sie für B1 Admin verwenden.

</div>

:::tip Empfohlen – kostenlos ausprobieren
Claude ist der einfachste Weg, B1 mit KI zu verbinden, und es funktioniert mit dem **kostenlosen Plan** von Claude – ideal, damit Ihre Gemeinde es ausprobieren kann, bevor Sie für irgendetwas bezahlen.
:::

Es gibt zwei Möglichkeiten, die Verbindung herzustellen. **Option 1 ist die einfachste** – kein Schlüssel und nichts zu installieren.

## Option 1 – Mit B1 anmelden (am einfachsten)

Funktioniert auf der Claude-Website, in der Claude Desktop-App und in der Claude-Smartphone-App – einmal einrichten, und es ist überall verfügbar.

### Schritt 1 – Connector-Einstellungen von Claude öffnen

1. Gehen Sie zu [claude.ai](https://claude.ai) und melden Sie sich an (oder erstellen Sie ein kostenloses Konto).
2. Klicken Sie unten links auf Ihren Namen und dann auf **Settings** (Einstellungen) → **Connectors** (Connectoren).

### Schritt 2 – B1 hinzufügen

1. Klicken Sie auf **Add** (Hinzufügen) und dann auf **Add custom connector** (Benutzerdefinierten Connector hinzufügen).
2. **Name:** Geben Sie `B1` ein.
3. **URL:** Fügen Sie `https://api.churchapps.org/mcp` ein.
4. Lassen Sie die anderen Optionen unverändert und klicken Sie auf **Add** (Hinzufügen).

### Schritt 3 – Bei B1 anmelden

1. Klicken Sie auf **Connect** (Verbinden). Eine B1-Anmeldeseite öffnet sich.
2. Melden Sie sich mit Ihrem B1-Konto an. Wenn Sie zu mehr als einer Gemeinde gehören, prüfen Sie, ob oben die richtige Gemeinde angezeigt wird.
3. B1 listet auf, was Claude tun möchte, und bestätigt, dass Sie zu **claude.ai** zurückgeleitet werden. Klicken Sie auf **Allow** (Erlauben).

Sie sind wieder in Claude, und B1 wird als verbunden angezeigt.

### Schritt 4 – Etwas fragen

Starten Sie einen **neuen Chat** und probieren Sie:

- *„Wie viele Personen gehören zu unserer Gemeinde?“*
- *„Liste unsere aktiven Gruppen auf.“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen.“*
- *„Wer ist in den letzten 30 Tagen der Gemeinde beigetreten?“*

Beim ersten Mal bittet Claude um Erlaubnis, B1 zu verwenden – klicken Sie auf **Allow** (Erlauben).

## Option 2 – Desktop-Erweiterung mit einem B1-Schlüssel

Verwenden Sie diese Option, wenn Sie Claude lieber einen Schlüssel mit eingeschränkten Berechtigungen geben möchten (zum Beispiel nur zum Ansehen). Sie funktioniert in der Claude Desktop-App für Mac oder Windows, und Sie benötigen in B1 die Berechtigung, Gemeindeeinstellungen zu verwalten, um einen Schlüssel zu erstellen.

### Schritt 1 – Claude-App besorgen

Laden Sie die Claude-App von [claude.com/download](https://claude.com/download) herunter, installieren und öffnen Sie sie, und melden Sie sich an.

### Schritt 2 – B1-Schlüssel erstellen

Der Schlüssel ist das, was Claude Zugang zu B1 *Ihrer* Gemeinde gibt – stellen Sie sich ihn wie ein Passwort nur für Claude vor.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und gehen Sie zu [Einstellungen → Entwickler](https://admin.b1.church/settings/developer).
2. Klicken Sie auf der Registerkarte **API-Schlüssel** auf **Neuer API-Schlüssel**.
3. **Name:** Geben Sie `Claude` ein.
4. **Geltungsbereiche:** Wählen Sie aus, was Claude tun darf. Jeder Bereich hat ein Kästchen **read** (nur ansehen) und ein Kästchen **write** (Änderungen vornehmen). Unsicher? Aktivieren Sie zu Beginn nur die **read**-Kästchen – Sie können später einen neuen Schlüssel mit mehr Rechten erstellen.
5. Klicken Sie auf **Speichern** und dann auf **Kopieren**, um den Schlüssel zu kopieren. Er wird nur einmal angezeigt, also machen Sie direkt mit Schritt 3 weiter.

### Schritt 3 – B1 zu Claude hinzufügen

1. [Laden Sie die B1-Erweiterung herunter](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Doppelklicken** Sie auf die heruntergeladene Datei (`b1-churchapps.mcpb`). Claude öffnet sich und zeigt **B1 (ChurchApps)** an.
3. Klicken Sie auf **Install** (Installieren).
4. Wenn nach Ihrem **B1 API key** gefragt wird, fügen Sie den Schlüssel aus Schritt 2 ein und speichern Sie.
5. **Beenden Sie Claude vollständig** (Mac: **Cmd+Q** · Windows: Rechtsklick auf das Claude-Symbol in der Taskleiste → **Quit** (Beenden)) und öffnen Sie es erneut.

Wenn sich Claude per Doppelklick nicht öffnet, gehen Sie in Claude zu **Settings → Extensions → Advanced settings → Install Extension…** (Einstellungen → Erweiterungen → Erweiterte Einstellungen → Erweiterung installieren) und wählen Sie die heruntergeladene Datei. Starten Sie dann einen neuen Chat und stellen Sie Claude eine Frage.

## Ist es sicher?

- Claude kann nur die Daten **Ihrer Gemeinde** sehen.
- **Angemeldet (Option 1):** Claude kann nie mehr tun als Ihre eigene B1-Anmeldung. Die B1-Anmeldeseite listet alles auf, was Claude tun darf, bevor Sie auf **Allow** (Erlauben) klicken.
- **Mit einem Schlüssel (Option 2):** Claude kann nur das tun, was der Schlüssel erlaubt – ein Schlüssel, bei dem nur **read**-Kästchen aktiviert sind, kann nachsehen, aber niemals etwas ändern.
- **Zum Abschalten:** Gehen Sie in B1 Admin zu **Einstellungen → Entwickler** und widerrufen Sie die App unter **Verbundene Apps** (Option 1), oder löschen Sie den Schlüssel unter **API-Schlüssel** (Option 2). Der Zugriff endet sofort. Sie können auch beim B1-Connector in Claude auf **Disconnect** (Trennen) klicken.

## Was kostet es?

Die B1-Verbindung ist kostenlos – sie ist Teil von ChurchApps. Claude selbst hat einen kostenlosen Plan; Claude Pro (etwa 20 US-Dollar/Monat) bietet Ihnen deutlich mehr Nutzung. Siehe [claude.com/pricing](https://claude.com/pricing).

## Technische Details

Der Rest dieser Seite richtet sich an technisch versierte Benutzer und KI-Assistenten: Geltungsbereiche, andere Verbindungswege und die Funktionsweise.

### Geltungsbereiche

Claude spricht mit B1 über den **Model Context Protocol (MCP) Server**, der in die B1 API integriert ist (`https://api.churchapps.org/mcp`). Jeder Aufruf durchläuft die gleichen Authentifizierungs-, Berechtigungs- und Gemeinde-Scoping-Regeln wie eine Anfrage von B1 Admin. Claude ist auf die **Berechtigungen und Geltungsbereiche** des API-Schlüssels beschränkt und kann nicht auf Webhooks, OAuth-Admin-Endpoints oder andere Operator-only-Pfade zugreifen.

Häufige Starter-Sets für Geltungsbereiche:

- **Schreibgeschützter Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lesen + Notizen/Aufgaben hinzufügen:** fügen Sie `people:write` hinzu
- **Vollständiger operativer Assistent:** fügen Sie die entsprechenden `:write`-Geltungsbereiche hinzu, die Sie möchten

Ein `donations:read`-Schlüssel lässt Claude die Spenden zusammenfassen, kann aber keine Gabe erfassen. Ein `people:write`-Schlüssel kann eine Person hinzufügen, aber keine Spenden sehen. Siehe [API-Schlüssel](/docs/developer/api/api-keys) für die Details zu jedem Geltungsbereich.

### Andere Verbindungswege

#### Claude Code (CLI)

Geben Sie in einem Terminal ein:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Das ist alles. In jeder Claude Code-Sitzung können Sie `/mcp` eingeben, um zu bestätigen, dass der `b1`-Server verbunden ist, und Claude dann jede Frage zu Ihrer Gemeinde stellen.

#### Claude Desktop – manuelle Konfiguration (fortgeschritten)

Wenn Sie die Erweiterung nicht verwenden möchten, bearbeiten Sie die Konfigurationsdatei von Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Fügen Sie einen `b1`-Server-Eintrag hinzu, der über `mcp-remote` eine Brücke zu B1 schlägt (erfordert [Node.js](https://nodejs.org)):

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

Starten Sie Claude Desktop neu. Das Connector-Menü im Chat-Eingabefeld zeigt `b1` mit seinen Tools.

#### Claude.ai (Web) – Benutzerdefinierter Connector

Siehe **Option 1** oben. Der Connector verwendet OAuth 2.1: Claude ermittelt den Autorisierungsserver von B1 über `https://api.churchapps.org/.well-known/oauth-protected-resource`, registriert sich per Dynamic Client Registration und meldet sich mit PKCE an. Bei Team- und Enterprise-Plänen muss möglicherweise zuerst ein Owner (Inhaber) den Connector für die Organisation hinzufügen. Claude fordert keine bestimmten Geltungsbereiche an, daher bietet die Zustimmungsseite alles an, worauf das angemeldete B1-Konto zugreifen kann. Widerrufen Sie den Zugriff in B1 Admin unter **Einstellungen → Entwickler → Verbundene Apps**.

### Wie es funktioniert

Die B1 API stellt einen einzelnen MCP-Endpoint unter `/mcp` bereit. Claude stellt eine Verbindung her, authentifiziert sich mit Ihrem `cak_…`-Schlüssel und erhält Zugriff auf vier Tools:

| Tool | Was es tut |
|---|---|
| `list_endpoints` | Listet die REST-Endpoints auf, die Claude aufrufen kann, filterbar nach Pfad. Wird zur Ermittlung verwendet. |
| `describe_endpoint` | Gibt eine kurze Zusammenfassung und ein Beispiel für Request/Response für einen bestimmten Endpoint zurück. |
| `api_call` | Ruft tatsächlich einen REST-Endpoint als authentifizierter Benutzer auf. |
| `describe_page_builder` | Eine Anleitung zum Erstellen und Bearbeiten der Seiten Ihrer Gemeinde-Website, die Claude liest, bevor es an Website-Inhalten arbeitet. |

Dies ist die gleiche Oberfläche (`/membership/people`, `/giving/donations`, `/attendance/visits` usw.), die Ihr B1 Admin verwendet – jede Autorisierungsregel gilt identisch.

### Sicherheit und Limits

- **Isolation pro Gemeinde.** Der API-Schlüssel gehört zu genau einer Gemeinde. Claude hat keine Möglichkeit, Daten anderer Gemeinden zu sehen.
- **Durch Berechtigungen begrenzt.** Wenn Sie der Person, die den Schlüssel in B1 Admin erstellt hat, eine Berechtigung entziehen, verliert Claude diese beim nächsten Aufruf – sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, und Claudes Zugriff endet sofort.
- **Blockliste.** Provider-Webhooks, OAuth-Client-Admin-Endpoints und die Operator-only-Route `apiEmails` können nicht über MCP aufgerufen werden.
- **Begrenzung der Antwortgröße.** Eine einzelne Tool-Antwort ist auf 64 KB begrenzt, damit lange Listen Claudes Kontext nicht sprengen – Claude engt die Abfrage in diesem Fall mit Filtern ein.
- **Audit-Trail.** Änderungen durchlaufen das gleiche Audit-Log wie B1 Admin-Aktionen; Sie können sie unter **Einstellungen → Audit-Log** überprüfen.

### Fehlerbehebung

**Claude meldet „Unauthorized“ oder 401:** Das Bearer-Token fehlt, ist fehlerhaft oder der Schlüssel wurde widerrufen. Wenn Sie die Erweiterung verwendet haben, öffnen Sie in Claude **Settings → Extensions → B1 (ChurchApps)** (Einstellungen → Erweiterungen) und fügen Sie den Schlüssel erneut ein. Andernfalls überprüfen Sie den Header `Authorization: Bearer cak_…` noch einmal (beachten Sie das Leerzeichen und das wörtliche `Bearer`).

**Ein Tool-Aufruf gibt 403 zurück:** Der API-Schlüssel hat nicht den Geltungsbereich für diesen Endpoint. Fügen Sie den Geltungsbereich unter **Einstellungen → Entwickler → API-Schlüssel** hinzu (Sie müssen einen neuen Schlüssel erstellen – Geltungsbereiche können nachträglich nicht geändert werden) und fügen Sie den neuen Schlüssel in die Einstellungen der Erweiterung oder in Claudes Konfiguration ein.

**Claude kann einen Endpoint nicht finden:** Bitten Sie Claude, `list_endpoints` mit einem Filter aufzurufen, z. B. *„Verwende list_endpoints mit dem Filter 'donations', um den richtigen Pfad zu finden“*. Das Routen-Inventar wird aus der Live-API generiert – alles, was Sie mit `curl` erreichen können, ist dort enthalten.

**Lokale Entwicklung:** Ersetzen Sie `https://api.churchapps.org/mcp` durch `http://localhost:8084/mcp` – gleiche Authentifizierung, gleiche Tools.

## Verwandt

- [API-Schlüssel](/docs/developer/api/api-keys) – vollständige Referenz der Geltungsbereiche
- [MCP Server (Entwickler-Referenz)](/docs/developer/api/mcp) – Protokoll-Details und Tool-Schemata
- [ChatGPT](./chatgpt) – gleiche Idee, für die Modelle von OpenAI
