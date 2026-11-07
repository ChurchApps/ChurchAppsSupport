---
title: "Claude"
description: "Verbinden Sie B1 Admin mit Claude, um in einfacher Sprache nach Anwesenheit, Spenden und Gruppen zu fragen, mit Anmeldeoption und einem Schlüssel mit eingeschränkten Berechtigungen."
---

# Claude

<div class="article-intro">

Fragen Sie Claude in einfacher Sprache nach Ihrer Kirche, und es antwortet anhand Ihrer B1-Daten – einschließlich Ihrer FreePlay-Lektionen und Klassenräume. Fragen wie *„Wie viele Erstbesucher kamen am Sonntag?“* oder *„Wer hat diesen Monat einem Hauskreis angehört?“* – oder bitten Sie Claude, etwas zu tun, etwa *„Füge unserer Website eine neue Seite namens Veranstaltungen hinzu.“* Die Einrichtung dauert weniger als 3 Minuten, und Sie brauchen keine technischen Kenntnisse und keine Software zu installieren.

</div>

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- **Ein Claude-Konto.** Der **kostenlose Tarif funktioniert** – eine gute Möglichkeit, es auszuprobieren. Kostenlose Konten haben allerdings ein tägliches Nachrichtenlimit, und Abfragen in B1 verbrauchen Nachrichten schnell. Wenn Sie es regelmäßig nutzen, empfehlen wir **Claude Pro** (etwa 20 $ pro Monat).
- **Ihr B1-Login** – derselbe, den Sie für B1 Admin verwenden.

</div>

:::tip Empfohlen – kostenlos testbar
Claude ist der einfachste Weg, B1 mit KI zu verbinden, und es funktioniert im **kostenlosen Tarif** von Claude – eine ideale Möglichkeit für Ihre Kirche, es auszuprobieren, bevor Sie für etwas bezahlen.
:::

Es gibt zwei Wege, die Verbindung herzustellen. **Option 1 ist der einfachste** – kein Schlüssel und nichts zu installieren.

## Option 1 – Mit B1 anmelden (am einfachsten)

Funktioniert auf der Claude-Website, in der Claude-Desktop-App und in der Claude-Handy-App – einmal einrichten, und es ist auf allen verfügbar.

### Schritt 1 – Die Konnektor-Einstellungen von Claude öffnen

1. Gehen Sie zu [claude.ai](https://claude.ai) und melden Sie sich an (oder erstellen Sie ein kostenloses Konto).
2. Klicken Sie unten links auf Ihren Namen und dann auf **Einstellungen** → **Konnektoren**.

### Schritt 2 – B1 hinzufügen

1. Klicken Sie auf **Hinzufügen** und dann auf **Benutzerdefinierten Konnektor hinzufügen**.
2. **Name:** Geben Sie `B1` ein.
3. **URL:** Fügen Sie `https://api.churchapps.org/mcp` ein.
4. Lassen Sie die übrigen Optionen unverändert und klicken Sie auf **Hinzufügen**.

### Schritt 3 – Bei B1 anmelden

1. Klicken Sie auf **Verbinden**. Eine Anmeldeseite von B1 öffnet sich.
2. Melden Sie sich mit Ihrem B1-Konto an. Gehören Sie zu mehr als einer Kirche, prüfen Sie, ob oben die richtige Kirche angezeigt wird.
3. B1 listet auf, was Claude tun möchte, und bestätigt, dass Sie zurück zu **claude.ai** geleitet werden. Klicken Sie auf **Zulassen**.

Sie sind wieder in Claude, und B1 wird als verbunden angezeigt.

### Schritt 4 – Etwas fragen

Starten Sie einen **neuen Chat** und probieren Sie zum Beispiel:

- *„Wie viele Menschen gehören unserer Kirche an?“*
- *„Liste unsere aktiven Gruppen auf.“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen.“*
- *„Wer ist in den letzten 30 Tagen unserer Kirche beigetreten?“*

Beim ersten Mal fragt Claude um Erlaubnis, B1 zu verwenden – klicken Sie auf **Zulassen**.

## Option 2 – Desktop-Erweiterung mit einem B1-Schlüssel

Verwenden Sie dies, wenn Sie Claude lieber einen Schlüssel mit eingeschränkten Rechten geben möchten (zum Beispiel nur zum Lesen). Es funktioniert in der Claude-Desktop-App für Mac oder Windows, und Sie benötigen die Berechtigung, Kircheneinstellungen in B1 zu verwalten, um einen Schlüssel zu erstellen.

### Schritt 1 – Die Claude-App herunterladen

Laden Sie die Claude-App von [claude.com/download](https://claude.com/download) herunter, installieren Sie sie, öffnen Sie sie und melden Sie sich an.

### Schritt 2 – Ihren B1-Schlüssel erstellen

Der Schlüssel ist das, was Claude Zugang zu *Ihrer* Kirche in B1 gibt – stellen Sie ihn sich wie ein Passwort nur für Claude vor.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und gehen Sie zu [Einstellungen → Entwickler](https://admin.b1.church/settings/developer).
2. Klicken Sie auf der Registerkarte **API-Schlüssel** auf **Neuer API-Schlüssel**.
3. **Name:** Geben Sie `Claude` ein.
4. **Bereiche:** Wählen Sie, was Claude tun darf. Jeder Bereich hat ein Kästchen **Lesen** (nur ansehen) und ein Kästchen **Schreiben** (Änderungen vornehmen). Sie sind unsicher? Aktivieren Sie zunächst nur die Kästchen **Lesen** – später können Sie einen neuen Schlüssel mit mehr Rechten erstellen.
5. Klicken Sie auf **Speichern** und dann auf **Kopieren** bei dem Schlüssel. Er wird nur einmal angezeigt, gehen Sie also direkt zu Schritt 3.

### Schritt 3 – B1 zu Claude hinzufügen

1. [Laden Sie die B1-Erweiterung herunter](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Doppelklicken** Sie auf die heruntergeladene Datei (`b1-churchapps.mcpb`). Claude öffnet sich und zeigt **B1 (ChurchApps)**.
3. Klicken Sie auf **Installieren**.
4. Wenn nach Ihrem **B1-API-Schlüssel** gefragt wird, fügen Sie den Schlüssel aus Schritt 2 ein und speichern Sie.
5. **Beenden Sie Claude vollständig** (Mac: **Cmd+Q** · Windows: Rechtsklick auf das Claude-Symbol in der Taskleiste → **Beenden**) und öffnen Sie es erneut.

Öffnet sich Claude nicht per Doppelklick, gehen Sie in Claude zu **Einstellungen → Erweiterungen → Erweiterte Einstellungen → Erweiterung installieren…** und wählen Sie die heruntergeladene Datei aus. Starten Sie dann einen neuen Chat und stellen Sie eine Frage.

:::tip Erweiterung bereits installiert?
Sie müssen nichts tun – FreePlay funktioniert über dieselbe Verbindung. Eine Ausnahme ist Version 1.1.0, die nach einer B1-E-Mail-Adresse und einem Passwort fragte: Laden Sie die Erweiterung erneut herunter und installieren Sie sie, um sie zu aktualisieren. Ihr Schlüssel bleibt erhalten.
:::

## Ist das sicher?

- Claude kann nur die Daten **Ihrer Kirche** sehen.
- **Mit Anmeldung (Option 1):** Claude kann nie mehr tun, als Ihr eigenes B1-Login darf. Die Anmeldeseite von B1 listet alles auf, was Claude tun darf, bevor Sie auf **Zulassen** klicken.
- **Mit Schlüssel (Option 2):** Claude kann nur das tun, was der Schlüssel in B1 erlaubt – ein Schlüssel mit nur angekreuzten **Lesen**-Kästchen kann ansehen, aber nie etwas ändern. FreePlay funktioniert auf dieselbe Weise, mit demselben Schlüssel.
- **So schalten Sie es aus:** Gehen Sie in B1 Admin zu **Einstellungen → Entwickler** und widerrufen Sie die App unter **Verbundene Apps** (Option 1) oder löschen Sie den Schlüssel unter **API-Schlüssel** (Option 2). Der Zugriff endet sofort. Sie können auch in Claude beim B1-Konnektor auf **Trennen** klicken.

## Was kostet es?

Die B1-Verbindung ist kostenlos – sie ist Teil von ChurchApps. Claude selbst hat einen kostenlosen Tarif; Claude Pro (etwa 20 $ pro Monat) bietet deutlich mehr Nutzung. Siehe [claude.com/pricing](https://claude.com/pricing).

## Technische Details

Der Rest dieser Seite richtet sich an technische Nutzende und KI-Assistenten: Bereiche, andere Verbindungswege und die Funktionsweise.

### Bereiche {#scopes}

Claude kommuniziert mit B1 über den **Model Context Protocol (MCP)-Server**, der in die B1-API eingebaut ist (`https://api.churchapps.org/mcp`). Jeder Aufruf läuft über dieselben Regeln für Authentifizierung, Berechtigungen und Kirchenzuordnung wie eine Anfrage aus B1 Admin. Claude ist auf die **Berechtigungen und Bereiche** des API-Schlüssels beschränkt und kann nicht auf Webhooks, OAuth-Admin-Endpunkte oder andere Pfade zugreifen, die nur dem Betreiber vorbehalten sind.

Übliche Bereichssätze für den Einstieg:

- **Nur-Lese-Assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lesen + Notizen/Aufgaben hinzufügen:** `people:write` ergänzen
- **Vollständiger Betriebsassistent:** die passenden `:write`-Bereiche ergänzen, die Sie möchten

Ein Schlüssel mit `donations:read` lässt Claude Spenden zusammenfassen, kann aber keine Gabe erfassen. Ein Schlüssel mit `people:write` kann eine Person hinzufügen, aber keine Spenden einsehen. Was jeder Bereich erlaubt, finden Sie unter [API-Schlüssel](/docs/developer/api/api-keys).

### Andere Verbindungswege

#### Claude Code (CLI)

Im Terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Das war's. Geben Sie in jeder Claude-Code-Sitzung `/mcp` ein, um zu prüfen, ob der Server `b1` verbunden ist, und stellen Sie dann Claude eine beliebige Frage zu Ihrer Kirche.

#### Claude Desktop – manuelle Konfiguration (fortgeschritten)

Wenn Sie die Erweiterung nicht verwenden möchten, bearbeiten Sie die Konfigurationsdatei von Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Fügen Sie einen Eintrag für den Server `b1` hinzu, der über `mcp-remote` zu B1 führt (erfordert [Node.js](https://nodejs.org)):

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

Starten Sie Claude Desktop neu. Das Konnektor-Menü im Chat-Eingabefeld zeigt `b1` mit seinen Werkzeugen.

#### Claude.ai (Web) – Benutzerdefinierter Konnektor

Siehe **Option 1** oben. Der Konnektor verwendet OAuth 2.1: Claude ermittelt den Autorisierungsserver von B1 über `https://api.churchapps.org/.well-known/oauth-protected-resource`, registriert sich selbst über Dynamic Client Registration und meldet sich mit PKCE an. In den Tarifen Team und Enterprise muss ein Eigentümer den Konnektor eventuell zuerst für die Organisation hinzufügen. Claude fordert keine bestimmten Bereiche an, daher bietet die Zustimmungsseite alles an, worauf das angemeldete B1-Konto zugreifen kann. Widerrufen Sie ihn unter **Einstellungen → Entwickler → Verbundene Apps** in B1 Admin.

### So funktioniert es

Die B1-API stellt einen einzigen MCP-Endpunkt unter `/mcp` bereit. Claude verbindet sich damit, authentifiziert sich mit Ihrem Schlüssel `cak_…` und erhält Zugriff auf vier Werkzeuge:

| Werkzeug | Was es tut |
|---|---|
| `list_endpoints` | Listet die REST-Endpunkte auf, die Claude aufrufen kann, filterbar nach Pfad. Dient der Erkundung. |
| `describe_endpoint` | Liefert eine kurze Beschreibung und eine Beispielanfrage/-antwort für einen bestimmten Endpunkt. |
| `api_call` | Ruft tatsächlich einen REST-Endpunkt als authentifizierte Person auf. |
| `describe_page_builder` | Eine Anleitung zum Erstellen und Bearbeiten der Seiten Ihrer Kirchenwebsite, die Claude liest, bevor es an Inhalten der Website arbeitet. |

Das ist dieselbe Oberfläche wie `/membership/people`, `/giving/donations`, `/attendance/visits` usw., die Ihr B1 Admin verwendet – jede Berechtigungsregel gilt identisch. FreePlay-Endpunkte (lessons.church) sind unter `/lessons/*` aufgeführt; Claudes Aufrufe an sie werden als dieselbe Person mit denselben Berechtigungen an FreePlay weitergeleitet.

### Sicherheit und Grenzen

- **Trennung pro Kirche.** Der API-Schlüssel gehört zu genau einer Kirche. Claude kann die Daten anderer Kirchen nicht sehen.
- **Auf Berechtigungen beschränkt.** Entziehen Sie der Person, die den Schlüssel erstellt hat, in B1 Admin eine Berechtigung, verliert Claude sie beim nächsten Aufruf – sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, und der Zugriff von Claude endet sofort.
- **Sperrliste.** Webhooks von Anbietern, Admin-Endpunkte für OAuth-Clients und die nur dem Betreiber vorbehaltene Route `apiEmails` sind über MCP nicht aufrufbar.
- **Begrenzung der Antwortgröße.** Eine einzelne Werkzeugantwort ist auf 64 KB begrenzt, damit lange Listen Claudes Kontext nicht sprengen – in diesem Fall verengt Claude die Abfrage mit Filtern.
- **Prüfprotokoll.** Änderungen laufen über dasselbe Prüfprotokoll wie Aktionen in B1 Admin; Sie können sie unter **Einstellungen → Prüfprotokoll** einsehen.

### Fehlerbehebung

**Claude fragt nach einer B1-E-Mail-Adresse und einem Passwort, um FreePlay zu verwenden:** Sie haben Version 1.1.0 der Desktop-Erweiterung. Laden Sie sie erneut herunter und installieren Sie sie, um zu aktualisieren – neuere Versionen verwenden nur Ihren Schlüssel.

**Claude meldet „Unauthorized“ oder 401:** Das Bearer-Token fehlt, ist fehlerhaft oder der Schlüssel wurde widerrufen. Haben Sie die Erweiterung verwendet, öffnen Sie in Claude **Einstellungen → Erweiterungen → B1 (ChurchApps)** und fügen Sie den Schlüssel erneut ein. Andernfalls prüfen Sie den Header `Authorization: Bearer cak_…` erneut (achten Sie auf das Leerzeichen und das wörtliche `Bearer`).

**Ein Werkzeugaufruf liefert 403:** Der API-Schlüssel hat nicht den Bereich für diesen Endpunkt. Fügen Sie den Bereich unter **Einstellungen → Entwickler → API-Schlüssel** hinzu (Sie müssen dazu einen neuen Schlüssel erstellen – Bereiche können nicht nachträglich geändert werden) und fügen Sie den neuen Schlüssel in die Einstellungen der Erweiterung oder in die Konfiguration von Claude ein.

**Claude findet einen Endpunkt nicht:** Bitten Sie Claude, `list_endpoints` mit einem Filter aufzurufen, z. B. *„Verwende list_endpoints mit dem Filter ‚donations‘, um den richtigen Pfad zu finden“*. Das Inventar der Routen wird aus der laufenden API erzeugt, daher ist alles, was Sie mit `curl` erreichen, auch hier enthalten.

**Lokale Entwicklung:** Ersetzen Sie `https://api.churchapps.org/mcp` durch `http://localhost:8084/mcp` – dieselbe Authentifizierung, dieselben Werkzeuge.

## Verwandt

- [API-Schlüssel](/docs/developer/api/api-keys) – vollständige Referenz der Bereiche
- [MCP-Server (Entwicklerreferenz)](/docs/developer/api/mcp) – Protokolldetails und Werkzeugschemata
- [ChatGPT](./chatgpt.md) – dasselbe Prinzip, für die Modelle von OpenAI
