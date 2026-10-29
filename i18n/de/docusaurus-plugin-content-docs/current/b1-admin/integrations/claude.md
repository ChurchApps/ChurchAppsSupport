---
title: "Claude"
---

# Claude

<div class="article-intro">

Stellen Sie Claude eine Frage zu Ihrer Kirche in einfacher Sprache, und die Antwort stammt aus Ihren B1-Daten -- einschließlich Ihrer FreePlay-Lektionen und Klassenzimmer. Fragen wie *"Wie viele Erstbesucher kamen am Sonntag?"* oder *"Wer ist diesen Monat einer Kleingruppe beigetreten?"* -- oder bitten Sie Claude, etwas zu tun, etwa *"Füge unserer Website eine neue Seite namens Veranstaltungen hinzu."* Die Einrichtung dauert weniger als 3 Minuten, und Sie brauchen keine technischen Kenntnisse und keine Software zu installieren.

</div>

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- **Ein Claude-Konto.** Der **kostenlose Tarif funktioniert** -- ein guter Weg, es auszuprobieren. Kostenlose Konten haben allerdings ein tägliches Nachrichtenlimit, und Abfragen in B1 verbrauchen Nachrichten schnell. Wenn Sie es regelmäßig nutzen, empfehlen wir **Claude Pro** (etwa 20 $ im Monat).
- **Ihre B1-Anmeldung** -- dieselbe, die Sie für B1 Admin verwenden.

</div>

:::tip Empfohlen -- kostenlos testen
Claude ist der einfachste Weg, B1 mit KI zu verbinden, und funktioniert im **kostenlosen Tarif** von Claude -- ideal, damit Ihre Kirche es ausprobieren kann, bevor sie für etwas bezahlt.
:::

Es gibt zwei Möglichkeiten zur Verbindung. **Option 1 ist die einfachste** -- kein Schlüssel und nichts zu installieren.

## Option 1 -- Mit B1 anmelden (am einfachsten)

Funktioniert auf der Claude-Website, in der Claude-Desktop-App und in der Claude-Handy-App -- einmal einrichten, und es ist auf allen verfügbar.

### Schritt 1 -- Die Connector-Einstellungen von Claude öffnen

1. Rufen Sie [claude.ai](https://claude.ai) auf und melden Sie sich an (oder erstellen Sie ein kostenloses Konto).
2. Klicken Sie unten links auf Ihren Namen und dann auf **Einstellungen** → **Connectors**.

### Schritt 2 -- B1 hinzufügen

1. Klicken Sie auf **Hinzufügen** und dann auf **Benutzerdefinierten Connector hinzufügen**.
2. **Name:** Geben Sie `B1` ein.
3. **URL:** Fügen Sie `https://api.churchapps.org/mcp` ein.
4. Lassen Sie die übrigen Optionen unverändert und klicken Sie auf **Hinzufügen**.

### Schritt 3 -- Bei B1 anmelden

1. Klicken Sie auf **Verbinden**. Eine Anmeldeseite von B1 öffnet sich.
2. Melden Sie sich mit Ihrem B1-Konto an. Gehören Sie zu mehr als einer Kirche, prüfen Sie, ob oben die richtige Kirche angezeigt wird.
3. B1 zeigt an, was Claude tun möchte, und bestätigt, dass Sie zurück zu **claude.ai** geleitet werden. Klicken Sie auf **Zulassen**.

Sie sind zurück bei Claude, und B1 wird als verbunden angezeigt.

### Schritt 4 -- Stellen Sie eine Frage

Starten Sie einen **neuen Chat** und probieren Sie zum Beispiel:

- *"Wie viele Menschen gehören zu unserer Kirche?"*
- *"Liste unsere aktiven Gruppen auf."*
- *"Fasse die Spenden dieses Monats nach Fonds zusammen."*
- *"Wer ist in den letzten 30 Tagen unserer Kirche beigetreten?"*

Beim ersten Mal fragt Claude um Erlaubnis, B1 zu verwenden -- klicken Sie auf **Zulassen**.

## Option 2 -- Desktop-Erweiterung mit einem B1-Schlüssel

Nutzen Sie diese Option, wenn Sie Claude lieber einen Schlüssel mit eingeschränkten Rechten geben möchten (zum Beispiel nur Lesezugriff). Sie funktioniert in der Claude-Desktop-App für Mac oder Windows, und Sie benötigen die Berechtigung, Kircheneinstellungen in B1 zu verwalten, um einen Schlüssel zu erstellen.

### Schritt 1 -- Die Claude-App holen

Laden Sie die Claude-App unter [claude.com/download](https://claude.com/download) herunter, installieren Sie sie, öffnen Sie sie und melden Sie sich an.

### Schritt 2 -- Ihren B1-Schlüssel erstellen

Der Schlüssel ermöglicht Claude den Zugriff auf *Ihre* B1-Daten der Kirche -- stellen Sie ihn sich wie ein Passwort nur für Claude vor.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und öffnen Sie [Einstellungen → Entwickler](https://admin.b1.church/settings/developer).
2. Klicken Sie auf dem Reiter **API-Schlüssel** auf **Neuer API-Schlüssel**.
3. **Name:** Geben Sie `Claude` ein.
4. **Berechtigungen:** Markieren Sie, was Claude tun darf. Jeder Bereich hat ein Kästchen **Lesen** (nur ansehen) und ein Kästchen **Schreiben** (Änderungen vornehmen). Unsicher? Markieren Sie zunächst nur die Kästchen **Lesen** -- später können Sie einen neuen Schlüssel mit mehr Rechten erstellen.
5. Klicken Sie auf **Speichern** und dann auf **Kopieren**, um den Schlüssel zu kopieren. Er wird nur einmal angezeigt, gehen Sie daher direkt zu Schritt 3.

### Schritt 3 -- B1 zu Claude hinzufügen

1. [Laden Sie die B1-Erweiterung herunter](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Doppelklicken** Sie auf die heruntergeladene Datei (`b1-churchapps.mcpb`). Claude öffnet sich und zeigt **B1 (ChurchApps)** an.
3. Klicken Sie auf **Installieren**.
4. Wenn nach Ihrem **B1-API-Schlüssel** gefragt wird, fügen Sie den Schlüssel aus Schritt 2 ein und speichern Sie.
5. **Beenden Sie Claude vollständig** (Mac: **Cmd+Q** · Windows: Rechtsklick auf das Claude-Symbol in der Taskleiste → **Beenden**) und öffnen Sie es erneut.

Öffnet sich Claude beim Doppelklick nicht, gehen Sie in Claude zu **Einstellungen → Erweiterungen → Erweiterte Einstellungen → Erweiterung installieren…** und wählen Sie die heruntergeladene Datei aus. Starten Sie dann einen neuen Chat und stellen Sie eine Frage.

:::tip Erweiterung bereits installiert?
Sie müssen nichts tun -- FreePlay funktioniert über dieselbe Verbindung. Eine Ausnahme bildet Version 1.1.0, die nach einer B1-E-Mail-Adresse und einem Passwort fragte: Laden Sie die Erweiterung erneut herunter und installieren Sie sie, um sie zu aktualisieren. Ihr Schlüssel bleibt erhalten.
:::

## Ist das sicher?

- Claude kann nur die Daten **Ihrer Kirche** sehen.
- **Mit Anmeldung (Option 1):** Claude kann nie mehr tun, als Ihre eigene B1-Anmeldung darf. Die Anmeldeseite von B1 zeigt alles, was Claude tun darf, bevor Sie auf **Zulassen** klicken.
- **Mit Schlüssel (Option 2):** Claude kann nur das tun, was der Schlüssel in B1 erlaubt -- ein Schlüssel mit nur angekreuzten Lesen-Kästchen kann ansehen, aber niemals etwas ändern. FreePlay funktioniert auf die gleiche Weise, mit demselben Schlüssel.
- **So schalten Sie es ab:** Gehen Sie in B1 Admin zu **Einstellungen → Entwickler** und widerrufen Sie die App unter **Verbundene Apps** (Option 1) oder löschen Sie den Schlüssel unter **API-Schlüssel** (Option 2). Der Zugriff endet sofort. Sie können auch auf den B1-Connector in Claude auf **Trennen** klicken.

## Was kostet es?

Die B1-Verbindung ist kostenlos -- sie ist Teil von ChurchApps. Claude selbst hat einen kostenlosen Tarif; Claude Pro (etwa 20 $ im Monat) bietet deutlich mehr Nutzung. Siehe [claude.com/pricing](https://claude.com/pricing).

## Technische Details

Der Rest dieser Seite richtet sich an technisch versierte Nutzer und KI-Assistenten: Berechtigungen (Scopes), weitere Verbindungsmöglichkeiten und die Funktionsweise.

### Berechtigungen (Scopes)

Claude spricht mit B1 über den **Model Context Protocol (MCP)-Server**, der in die B1-API integriert ist (`https://api.churchapps.org/mcp`). Jeder Aufruf läuft über dieselben Regeln für Authentifizierung, Berechtigungen und Kirchenzuordnung wie eine Anfrage aus B1 Admin. Claude ist auf die **Berechtigungen und Scopes** des API-Schlüssels beschränkt und kann weder Webhooks, OAuth-Administrations-Endpunkte noch andere Pfade erreichen, die nur dem Betreiber vorbehalten sind.

Gängige Startgruppen von Berechtigungen:

- **Nur-Lese-Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lesen + Notizen/Aufgaben hinzufügen:** zusätzlich `people:write`
- **Vollständiger Betriebsassistent:** fügen Sie die passenden `:write`-Berechtigungen hinzu, die Sie möchten

Ein Schlüssel mit `donations:read` ermöglicht es Claude, Spenden zusammenzufassen, kann aber keine Gabe erfassen. Ein Schlüssel mit `people:write` kann eine Person anlegen, aber keine Spenden einsehen. Was jede Berechtigung erlaubt, finden Sie unter [API-Schlüssel](/docs/developer/api/api-keys).

### Weitere Verbindungsmöglichkeiten

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

Starten Sie Claude Desktop neu. Das Connector-Menü im Chat-Eingabefeld zeigt `b1` mit seinen Werkzeugen an.

#### Claude.ai (Web) -- benutzerdefinierter Connector

Siehe **Option 1** oben. Der Connector verwendet OAuth 2.1: Claude ermittelt den Autorisierungsserver von B1 über `https://api.churchapps.org/.well-known/oauth-protected-resource`, registriert sich selbst über Dynamic Client Registration und meldet sich mit PKCE an. In Team- und Enterprise-Tarifen muss ein Inhaber den Connector unter Umständen zuerst für die Organisation hinzufügen. Claude fordert keine bestimmten Scopes an, daher bietet die Zustimmungsseite alles an, worauf das angemeldete B1-Konto zugreifen kann. Widerrufen können Sie ihn in B1 Admin unter **Einstellungen → Entwickler → Verbundene Apps**.

### So funktioniert es

Die B1-API stellt einen einzigen MCP-Endpunkt unter `/mcp` bereit. Claude verbindet sich damit, authentifiziert sich mit Ihrem Schlüssel `cak_…` und erhält Zugriff auf vier Werkzeuge:

| Werkzeug | Funktion |
|---|---|
| `list_endpoints` | Listet die REST-Endpunkte auf, die Claude aufrufen kann, filterbar nach Pfad. Dient der Erkundung. |
| `describe_endpoint` | Liefert eine kurze Zusammenfassung und ein Beispiel für Anfrage und Antwort zu einem bestimmten Endpunkt. |
| `api_call` | Ruft einen REST-Endpunkt tatsächlich als authentifizierter Benutzer auf. |
| `describe_page_builder` | Eine Anleitung zum Erstellen und Bearbeiten der Seiten Ihrer Kirchenwebsite, die Claude liest, bevor es an Website-Inhalten arbeitet. |

Dies ist dieselbe Schnittstelle wie `/membership/people`, `/giving/donations`, `/attendance/visits` usw., die auch Ihr B1 Admin nutzt -- jede Berechtigungsregel gilt identisch. Die FreePlay-Endpunkte (lessons.church) sind unter `/lessons/*` aufgeführt; Claudes Aufrufe dorthin werden als derselbe Benutzer mit denselben Berechtigungen an FreePlay weitergeleitet.

### Sicherheit und Grenzen

- **Trennung pro Kirche.** Der API-Schlüssel gehört zu genau einer Kirche. Claude kann die Daten anderer Kirchen nicht sehen.
- **Berechtigungsgebunden.** Entziehen Sie der Person, die den Schlüssel in B1 Admin erstellt hat, eine Berechtigung, verliert Claude sie beim nächsten Aufruf -- sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, und Claudes Zugriff endet sofort.
- **Sperrliste.** Webhooks von Anbietern, Administrations-Endpunkte für OAuth-Clients und die nur dem Betreiber vorbehaltene Route `apiEmails` sind über MCP nicht aufrufbar.
- **Begrenzung der Antwortgröße.** Eine einzelne Werkzeugantwort ist auf 64 KB begrenzt, damit lange Listen den Kontext von Claude nicht sprengen -- Claude grenzt die Abfrage dann mit Filtern ein.
- **Prüfprotokoll.** Änderungen laufen über dasselbe Audit-Protokoll wie Aktionen in B1 Admin; Sie können sie unter **Einstellungen → Audit-Protokoll** einsehen.

### Fehlerbehebung

**Claude fragt nach einer B1-E-Mail-Adresse und einem Passwort, um FreePlay zu nutzen:** Sie haben Version 1.1.0 der Desktop-Erweiterung. Laden Sie sie erneut herunter und installieren Sie sie, um sie zu aktualisieren -- neuere Versionen benötigen nur Ihren Schlüssel.

**Claude meldet "Unauthorized" oder 401:** Der Bearer-Token fehlt, ist fehlerhaft oder der Schlüssel wurde widerrufen. Haben Sie die Erweiterung verwendet, öffnen Sie in Claude **Einstellungen → Erweiterungen → B1 (ChurchApps)** und fügen Sie den Schlüssel erneut ein. Andernfalls prüfen Sie den Header `Authorization: Bearer cak_…` erneut (auf das Leerzeichen und das wörtliche `Bearer` achten).

**Ein Werkzeugaufruf gibt 403 zurück:** Der API-Schlüssel hat nicht die Berechtigung für diesen Endpunkt. Fügen Sie die Berechtigung unter **Einstellungen → Entwickler → API-Schlüssel** hinzu (dazu müssen Sie einen neuen Schlüssel erstellen -- Berechtigungen lassen sich nicht nachträglich ändern) und fügen Sie den neuen Schlüssel in den Einstellungen der Erweiterung oder in der Konfiguration von Claude ein.

**Claude findet einen Endpunkt nicht:** Bitten Sie Claude, `list_endpoints` mit einem Filter aufzurufen, z. B. *"Verwende list_endpoints mit dem Filter 'donations', um den richtigen Pfad zu finden"*. Das Verzeichnis der Routen wird aus der laufenden API erzeugt, daher ist alles, was Sie mit `curl` erreichen können, dort enthalten.

**Lokale Entwicklung:** Ersetzen Sie `https://api.churchapps.org/mcp` durch `http://localhost:8084/mcp` -- dieselbe Authentifizierung, dieselben Werkzeuge.

## Verwandt

- [API-Schlüssel](/docs/developer/api/api-keys) -- vollständige Übersicht der Scopes
- [MCP-Server (Entwicklerreferenz)](/docs/developer/api/mcp) -- Protokolldetails und Werkzeugschemata
- [ChatGPT](./chatgpt) -- dasselbe Prinzip für die Modelle von OpenAI
