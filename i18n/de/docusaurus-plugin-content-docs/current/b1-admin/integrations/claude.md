---
title: "Claude"
description: "Verbinden Sie B1 Admin mit Claude, damit Sie in einfacher Sprache nach Anwesenheit, Spenden und Gruppen fragen können – mit einer Anmeldeoption und einer Option mit eingeschränktem Schlüssel."
---

# Claude

<div class="article-intro">

Fragen Sie Claude in einfacher Sprache nach Ihrer Gemeinde, und die Antworten stammen aus Ihren B1-Daten – einschließlich Ihrer FreePlay-Lektionen und Klassenräume. Fragen wie *„Wie viele Erstbesucher kamen am Sonntag?“* oder *„Wer hat diesen Monat einer Kleingruppe angehört?“* – oder bitten Sie Claude, etwas zu tun, etwa *„Füge unserer Website eine neue Seite namens Veranstaltungen hinzu.“* Die Einrichtung dauert weniger als 3 Minuten, und Sie brauchen keine technischen Kenntnisse oder Software zur Installation.

</div>

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- **Ein Claude-Konto.** Der **kostenlose Tarif funktioniert** – eine gute Möglichkeit, es auszuprobieren. Kostenlose Konten haben allerdings ein tägliches Nachrichtenlimit, und Abfragen in B1 verbrauchen Nachrichten schnell. Wenn Sie es regelmäßig nutzen, empfehlen wir daher **Claude Pro** (etwa 20 $ pro Monat).
- **Ihr B1-Login** – derselbe, den Sie für B1 Admin verwenden.

</div>

:::tip Empfohlen – zum Ausprobieren kostenlos
Claude ist der einfachste Weg, B1 mit KI zu verbinden, und es funktioniert im **kostenlosen Tarif** von Claude – ideal, damit Ihre Gemeinde es ausprobieren kann, bevor sie für etwas bezahlt.
:::

Es gibt zwei Wege zur Verbindung. **Option 1 ist am einfachsten** – kein Schlüssel und nichts zu installieren.

## Option 1 — Mit B1 anmelden (am einfachsten) {#option-1--sign-in-with-b1-easiest}

Funktioniert auf der Claude-Website, in der Claude-Desktop-App und in der Claude-Handy-App – einmal einrichten, und es ist auf allen verfügbar.

### Schritt 1 — Öffnen Sie die Connector-Einstellungen von Claude {#step-1--open-claudes-connector-settings}

1. Gehen Sie zu [claude.ai](https://claude.ai) und melden Sie sich an (oder erstellen Sie ein kostenloses Konto).
2. Klicken Sie unten links auf Ihren Namen und dann auf **Einstellungen** → **Connectors**.

### Schritt 2 — B1 hinzufügen {#step-2--add-b1}

1. Klicken Sie auf **Hinzufügen** und dann auf **Benutzerdefinierten Connector hinzufügen**.
2. **Name:** Geben Sie `B1` ein.
3. **URL:** Fügen Sie `https://api.churchapps.org/mcp` ein.
4. Lassen Sie die anderen Optionen unverändert und klicken Sie auf **Hinzufügen**.

### Schritt 3 — Bei B1 anmelden {#step-3--sign-in-to-b1}

1. Klicken Sie auf **Verbinden**. Eine Anmeldeseite von B1 öffnet sich.
2. Melden Sie sich mit Ihrem B1-Konto an. Wenn Sie mehreren Gemeinden angehören, prüfen Sie, ob die Seite die richtige Gemeinde nennt („Möchten Sie auf die folgenden Daten von *Ihrer Gemeinde* zugreifen…“).
3. B1 zeigt an, was Claude anfordert (**Alles, worauf Ihr B1-Konto zugreifen kann**), weist darauf hin, dass sich die App bei B1 registriert hat, und bestätigt, dass Sie zurück zu **claude.ai** geleitet werden. Klicken Sie auf **Zulassen**.

Sie sind wieder in Claude, und B1 wird als verbunden angezeigt.

### Schritt 4 — Stellen Sie eine Frage {#step-4--ask-it-something}

Starten Sie einen **neuen Chat** und probieren Sie zum Beispiel:

- *„Wie viele Personen gehören zu unserer Gemeinde?“*
- *„Liste unsere aktiven Gruppen auf.“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen.“*
- *„Wer ist in den letzten 30 Tagen der Gemeinde beigetreten?“*

Beim ersten Mal fragt Claude nach der Erlaubnis, B1 zu verwenden – klicken Sie auf **Zulassen**.

## Option 2 — Desktop-Erweiterung mit einem B1-Schlüssel {#option-2--desktop-extension-with-a-b1-key}

Nutzen Sie diese Option, wenn Sie Claude lieber einen Schlüssel mit eingeschränkten Berechtigungen geben möchten (zum Beispiel nur Leserechte). Sie funktioniert in der Claude-Desktop-App für Mac oder Windows. Zum Erstellen eines Schlüssels benötigen Sie die Berechtigung, Gemeindeeinstellungen in B1 zu verwalten.

### Schritt 1 — Holen Sie sich die Claude-App {#step-1--get-the-claude-app}

Laden Sie die Claude-App über [claude.com/download](https://claude.com/download) herunter, installieren Sie sie, öffnen Sie sie und melden Sie sich an.

### Schritt 2 — Erstellen Sie Ihren B1-Schlüssel {#step-2--make-your-b1-key}

Der Schlüssel ist das, was Claude Zugang zu *Ihrer* B1-Gemeinde verschafft – denken Sie an ein Passwort, das nur für Claude gilt.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und gehen Sie zu [Einstellungen → Entwickler](https://admin.b1.church/settings/developer).
2. Klicken Sie auf dem Reiter **API-Schlüssel** auf **Neuer API-Schlüssel**.
3. **Name:** Geben Sie `Claude` ein.
4. **Berechtigungen:** Markieren Sie, was Claude tun darf. Die meisten Bereiche haben ein Feld **Lesen** (nur ansehen) und ein Feld **Schreiben** (Änderungen vornehmen). Formulare hat nur **forms:write**. Sie sind unsicher? Markieren Sie zu Beginn nur die Felder **Lesen** – später können Sie jederzeit einen neuen Schlüssel mit mehr Rechten erstellen.
5. Klicken Sie auf **Speichern** und dann auf **Kopieren**, um den Schlüssel zu kopieren. Er wird nur einmal angezeigt, gehen Sie daher direkt zu Schritt 3.

### Schritt 3 — B1 zu Claude hinzufügen {#step-3--add-b1-to-claude}

1. [Laden Sie die B1-Erweiterung herunter](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Doppelklicken** Sie auf die heruntergeladene Datei (`b1-churchapps.mcpb`). Claude öffnet sich und zeigt **B1 (ChurchApps)** an.
3. Klicken Sie auf **Installieren**.
4. Wenn nach Ihrem **B1-API-Schlüssel** gefragt wird, fügen Sie den Schlüssel aus Schritt 2 ein und speichern Sie.
5. **Beenden Sie Claude vollständig** (Mac: **Cmd+Q** · Windows: Rechtsklick auf das Claude-Symbol in der Taskleiste → **Beenden**) und öffnen Sie es erneut.

Falls ein Doppelklick Claude nicht öffnet, gehen Sie in Claude zu **Einstellungen → Erweiterungen → Erweiterte Einstellungen → Erweiterung installieren…** und wählen Sie die heruntergeladene Datei. Starten Sie dann einen neuen Chat und stellen Sie eine Frage.

:::tip Erweiterung bereits installiert?
Sie müssen nichts tun – FreePlay funktioniert über dieselbe Verbindung. Eine Ausnahme bildet Version 1.1.0, die nach einer B1-E-Mail-Adresse und einem Passwort fragte: Installieren Sie die Erweiterung erneut, um sie zu aktualisieren. Ihr Schlüssel bleibt erhalten.
:::

## Ist das sicher? {#is-it-safe}

- Claude kann nur die Daten **Ihrer Gemeinde** sehen.
- **Mit Anmeldung (Option 1):** Claude kann nie mehr tun als Ihr eigenes B1-Login. Die Anmeldeseite von B1 zeigt, was Claude anfordert, bevor Sie auf **Zulassen** klicken.
- **Mit Schlüssel (Option 2):** Claude kann nur tun, was der Schlüssel in B1 erlaubt – ein Schlüssel, bei dem nur die Felder **Lesen** markiert sind, kann Daten ansehen, aber nie etwas ändern. FreePlay funktioniert auf dieselbe Weise, mit demselben Schlüssel.
- **So schalten Sie es ab:** Gehen Sie in B1 Admin zu **Einstellungen → Entwickler** und widerrufen Sie die App unter **Verbundene Apps** (Option 1) oder löschen Sie den Schlüssel unter **API-Schlüssel** (Option 2). Der Zugriff endet sofort. Sie können auch in Claude auf **Trennen** beim B1-Connector klicken.

## Was kostet es? {#what-does-it-cost}

Die B1-Verbindung ist kostenlos – sie ist Teil von ChurchApps. Claude selbst hat einen kostenlosen Tarif; Claude Pro (etwa 20 $ pro Monat) bietet deutlich mehr Nutzung. Siehe [claude.com/pricing](https://claude.com/pricing).

## Technische Details {#technical-details}

Der Rest dieser Seite richtet sich an technisch versierte Nutzer und KI-Assistenten: Berechtigungen, andere Verbindungswege und wie es funktioniert.

### Berechtigungen {#scopes}

Claude kommuniziert mit B1 über den **Model Context Protocol (MCP)-Server**, der in die B1-API integriert ist (`https://api.churchapps.org/mcp`). Jeder Aufruf läuft über dieselben Authentifizierungs-, Berechtigungs- und Gemeinde-Regeln wie eine Anfrage aus B1 Admin. Claude ist auf die **Berechtigungen und Scopes** des API-Schlüssels beschränkt und kann weder Zahlungsanbieter-Webhooks noch Verwaltungs-Endpunkte für OAuth-Clients oder Anmelde- und Passwort-Endpunkte erreichen.

Gängige Startpakete von Berechtigungen:

- **Assistent mit reinem Lesezugriff:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lesen + Notizen/Aufgaben hinzufügen:** zusätzlich `people:write`
- **Vollständiger Betriebsassistent:** fügen Sie die passenden `:write`-Berechtigungen hinzu, die Sie möchten

Ein Schlüssel mit `donations:read` erlaubt Claude, Spenden zusammenzufassen, kann aber keine Gabe erfassen. Ein Schlüssel mit `people:write` kann eine Person hinzufügen, aber keine Spenden einsehen. Was jede Berechtigung erlaubt, finden Sie unter [API-Schlüssel](/docs/developer/api/api-keys).

### Weitere Verbindungswege {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

Im Terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Das war's. Geben Sie in jeder Claude-Code-Sitzung `/mcp` ein, um zu prüfen, ob der Server `b1` verbunden ist, und stellen Sie dann Claude eine beliebige Frage zu Ihrer Gemeinde.

#### Claude Desktop — manuelle Konfiguration (fortgeschritten) {#claude-desktop--manual-config-advanced}

Wenn Sie die Erweiterung nicht verwenden möchten, bearbeiten Sie die Konfigurationsdatei von Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Fügen Sie einen Eintrag für den Server `b1` hinzu, der über `mcp-remote` mit B1 verbindet (benötigt [Node.js](https://nodejs.org)):

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

#### Claude.ai (Web) — Benutzerdefinierter Connector {#claudeai-web--custom-connector}

Siehe **Option 1** oben. Der Connector verwendet OAuth 2.1: Claude ermittelt den Autorisierungsserver von B1 über `https://api.churchapps.org/.well-known/oauth-protected-resource`, registriert sich selbst über Dynamic Client Registration und meldet sich mit PKCE an. In den Tarifen Team und Enterprise muss ein Inhaber den Connector unter Umständen zuerst für die Organisation hinzufügen. Claude fordert keine bestimmten Scopes an, daher bietet die Zustimmungsseite alles an, worauf das angemeldete B1-Konto zugreifen kann. Widerrufen Sie ihn unter **Einstellungen → Entwickler → Verbundene Apps** in B1 Admin.

### So funktioniert es {#how-it-works}

Die B1-API stellt einen einzigen MCP-Endpunkt unter `/mcp` bereit. Claude verbindet sich damit, authentifiziert sich mit Ihrem `cak_…`-Schlüssel und erhält Zugriff auf vier Werkzeuge:

| Werkzeug | Was es tut |
|---|---|
| `list_endpoints` | Listet die REST-Endpunkte auf, die Claude aufrufen kann, filterbar nach Pfad. Dient der Erkundung. |
| `describe_endpoint` | Liefert eine kurze Zusammenfassung und ein Beispiel für Anfrage/Antwort zu einem bestimmten Endpunkt. |
| `api_call` | Ruft einen REST-Endpunkt tatsächlich als authentifizierter Benutzer auf. |
| `describe_page_builder` | Eine Anleitung zum Erstellen und Bearbeiten der Seiten Ihrer Gemeindewebsite, die Claude liest, bevor es an Website-Inhalten arbeitet. |

Das ist dieselbe Schnittstelle wie `/membership/people`, `/giving/donations`, `/attendance/visits` usw., die auch B1 Admin verwendet – jede Berechtigungsregel gilt identisch. Die FreePlay-Endpunkte (lessons.church) sind unter `/lessons/*` aufgelistet; Claudes Aufrufe an sie werden als derselbe Benutzer mit denselben Berechtigungen an FreePlay weitergeleitet.

### Sicherheit und Grenzen {#safety-and-limits}

- **Trennung pro Gemeinde.** Der API-Schlüssel gehört zu genau einer Gemeinde. Claude hat keine Möglichkeit, Daten anderer Gemeinden zu sehen.
- **Auf Berechtigungen beschränkt.** Wenn Sie in B1 Admin einer Person, die den Schlüssel erstellt hat, eine Berechtigung entziehen, verliert Claude sie beim nächsten Aufruf – sofort.
- **Widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, dann endet der Zugriff von Claude sofort.
- **Sperrliste.** Webhook-Endpunkte von Zahlungsanbietern, Verwaltungs-Endpunkte für OAuth-Clients sowie Endpunkte für Anmeldung, Registrierung, Passwort und Zwei-Faktor-Authentifizierung können über MCP nicht aufgerufen werden.
- **Begrenzung der Antwortgröße.** Eine einzelne Werkzeugantwort ist auf 64 KB begrenzt, damit lange Listen Claudes Kontext nicht sprengen. Tritt dies auf, verengt Claude die Abfrage mit Filtern.
- **Prüfprotokoll.** Änderungen laufen über dasselbe Prüfprotokoll wie die Aktionen in B1 Admin; Sie können sie unter **Einstellungen → Prüfprotokoll** einsehen.

### Fehlerbehebung {#troubleshooting}

**Claude fragt nach einer B1-E-Mail-Adresse und einem Passwort, um FreePlay zu nutzen:** Sie haben Version 1.1.0 der Desktop-Erweiterung. Installieren Sie sie erneut, um zu aktualisieren – neuere Versionen verwenden nur Ihren Schlüssel.

**Claude meldet „Unauthorized“ oder 401:** Das Bearer-Token fehlt, ist fehlerhaft, oder der Schlüssel wurde widerrufen. Haben Sie die Erweiterung verwendet, öffnen Sie in Claude **Einstellungen → Erweiterungen → B1 (ChurchApps)** und fügen Sie den Schlüssel erneut ein. Andernfalls prüfen Sie den Header `Authorization: Bearer cak_…` erneut (achten Sie auf das Leerzeichen und das wörtliche `Bearer`).

**Ein Werkzeugaufruf liefert 403:** Der API-Schlüssel hat keine Berechtigung für diesen Endpunkt. Fügen Sie die Berechtigung unter **Einstellungen → Entwickler → API-Schlüssel** hinzu (Sie müssen einen neuen Schlüssel erstellen – Berechtigungen lassen sich nicht nachträglich ändern) und fügen Sie den neuen Schlüssel in die Einstellungen der Erweiterung oder in die Konfiguration von Claude ein.

**Claude findet einen Endpunkt nicht:** Bitten Sie Claude, `list_endpoints` mit einem Filter aufzurufen, z. B. *„Verwende list_endpoints mit dem Filter 'donations', um den richtigen Pfad zu finden“*. Das Verzeichnis der Routen wird aus der laufenden API erzeugt, daher ist alles vorhanden, was Sie mit `curl` erreichen können.

**Lokale Entwicklung:** Ersetzen Sie `https://api.churchapps.org/mcp` durch `http://localhost:8084/mcp` – gleiche Authentifizierung, gleiche Werkzeuge.

## Verwandt {#related}

- [API-Schlüssel](/docs/developer/api/api-keys) – vollständige Referenz der Berechtigungen
- [MCP-Server (Entwickler-Referenz)](/docs/developer/api/mcp) – Protokolldetails und Tool-Schemas
- [ChatGPT](./chatgpt.md) – dasselbe Prinzip, für die Modelle von OpenAI
