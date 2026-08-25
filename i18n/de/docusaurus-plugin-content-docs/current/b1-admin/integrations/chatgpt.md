---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Verbinden Sie ChatGPT von OpenAI mit Ihren B1-Daten und lassen Sie es für Sie arbeiten. Wenn Sie eine Verbindung hergestellt haben, kann ChatGPT Ihre Live-Kirchenaufzeichnungen einsehen und Ihnen dabei helfen, Aufgaben zu erledigen, die sonst mehrere Schritte in B1 Admin erfordern würden.

**Einige Dinge, die Sie es bitten können:**
- *"Richten Sie Sonntagsschulklassenzimmer ein und setzen Sie jede Lehrkraft in den richtigen Raum basierend auf ihrer Gruppe"*
- *"Zeige mir jeden, der letzte Woche teilgenommen hat, aber noch keiner Kleingruppe zugewiesen ist"*
- *"Fassen Sie die Gaben dieses Monats nach Fonds zusammen"*
- *"Wer sind unsere neuesten Mitglieder und haben wir sie kontaktiert?"*
- *"Ich kann nicht herausfinden, wie man X in B1 macht -- kannst du mir den Weg zeigen oder es für mich tun?"*

ChatGPT zieht die Antworten direkt aus Ihren B1-Daten, nur für Ihre Kirche beschränkt.

:::tip Empfohlen: Claude Code
Für die glatteste MCP-Erfahrung ist [Claude Code](./claude) der empfohlene Client -- das Setup dauert einen Befehl und es funktioniert sofort einsatzbereit. ChatGPT funktioniert auch gut, wenn Ihr Team ihn bereits verwendet.
:::

Zwei Pfade werden unterstützt: der **MCP-Connector** (in ChatGPT integriert) und eine **Custom GPT** für Teams, die einen gemeinsam nutzbaren Assistenten möchten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchenadministrator mit der Berechtigung **Einstellungen bearbeiten** in B1 Admin (zum Erstellen eines API-Schlüssels erforderlich)
- Ein **ChatGPT Plus, Pro, Team oder Enterprise** Konto

</div>

## Schnelleinstieg

Befolgen Sie diese Schritte in der **ChatGPT Desktop-App** (Mac/Windows). Die Bildschirme können in anderen Versionen leicht unterschiedlich aussehen.

---

**Schritt 1 — Holen Sie sich zuerst Ihren API-Schlüssel aus B1 Admin**

Bevor Sie ChatGPT anfassen, erstellen Sie einen API-Schlüssel in B1 Admin, damit Sie ihn einfügen können:

1. Gehen Sie zu **Einstellungen → Entwickler → API-Schlüssel** in B1 Admin
2. Klicken Sie auf **Neuer API-Schlüssel**, benennen Sie ihn \ChatGPT\, wählen Sie Ihre Bereiche (beginnen Sie mit \people:read\, \groups:read\, \ttendance:read\, \donations:read\) und klicken Sie auf **Speichern**
3. Kopieren Sie den \cak_…\ Schlüssel -- er wird nur einmal angezeigt

---

**Schritt 2 — Klicken Sie auf Ihren Namen in der unteren linken Ecke von ChatGPT**

![Klicken Sie auf Ihren Profilnamen](/img/guides/chatgpt-mcp/01.png)

---

**Schritt 3 — Klicken Sie auf Einstellungen**

![Klicken Sie auf Einstellungen aus dem Menü](/img/guides/chatgpt-mcp/02.png)

---

**Schritt 4 — Klicken Sie auf Plugins in der linken Seitenleiste**

![Klicken Sie auf Plugins unter Integrationen](/img/guides/chatgpt-mcp/03.png)

---

**Schritt 5 — Klicken Sie auf die Registerkarte MCPs**

![Klicken Sie auf die Registerkarte MCPs](/img/guides/chatgpt-mcp/04.png)

Sie sehen alle MCP-Server, die Sie bereits hinzugefügt haben.

---

**Schritt 6 — Klicken Sie auf Hinzufügen → MCP-Server hinzufügen**

![Klicken Sie auf Hinzufügen, dann MCP-Server hinzufügen](/img/guides/chatgpt-mcp/06.png)

---

**Schritt 7 — Füllen Sie das Formular aus und klicken Sie auf Speichern**

![Verbinden Sie sich mit einem benutzerdefinierten MCP-Formular](/img/guides/chatgpt-mcp/07.png)

Klicken Sie auf **Streamable HTTP**, dann füllen Sie aus:

| Feld | Was eintragen |
|---|---|
| **Name** | \B1 Church\ (oder einen beliebigen Namen) |
| **Typ** | Klicken Sie auf **Streamable HTTP** |
| **URL** | \https://api.churchapps.org/mcp\ |
| **Bearer-Token-Umgebungsvariable** | Leer lassen |
| **Header** | Klicken Sie auf **+ Header hinzufügen** → Schlüssel: \Authorization\ → Wert: siehe unten |

![Ausgefülltes Beispiel mit Authorization als Schlüssel und Bearer-Schlüssel als Wert](/img/guides/chatgpt-mcp/08.png)

- **Schlüssel:** \Authorization\
- **Wert:** \Bearer cak_yourkey\ -- das Wort Bearer, ein Leerzeichen, dann Ihr Schlüssel

Klicken Sie auf **Speichern**.

Das ist alles! Gehen Sie zurück zu einem Chat und fragen Sie etwas wie *"Wie viele Menschen sind in unserer Kirche?"* und ChatGPT zieht die Antwort direkt aus B1.

---

## Schritt 1 — Erstellen Sie einen API-Schlüssel in B1 Admin

Jede Verbindung zu B1 verwendet einen API-Schlüssel, den Sie erstellen. Dieser Schlüssel identifiziert Ihre Kirche, steuert, was ChatGPT sehen kann, und kann jederzeit widerrufen werden.

1. Öffnen Sie **B1 Admin** und gehen Sie zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**.
3. Geben Sie dem Schlüssel einen Namen -- \ChatGPT\ funktioniert gut.
4. Wählen Sie die Bereiche (Berechtigungen), die ChatGPT haben soll. Ein guter Startsatz für einen schreibgeschützten Assistenten:
   - \people:read\
   - \groups:read\
   - \ttendance:read\
   - \donations:read\
5. Klicken Sie auf **Speichern**.
6. Kopieren Sie den vollständigen Schlüssel, der angezeigt wird -- er beginnt mit \cak_\ und wird **nur einmal** angezeigt. Speichern Sie ihn an einem sicheren Ort.

:::tip
Wenn Sie ChatGPT-Zugriff jemals widerrufen müssen, gehen Sie zurück zu **Einstellungen → Entwickler → API-Schlüssel** und löschen Sie den Schlüssel. Der Zugriff endet sofort.
:::

---

## Pfad A — ChatGPT MCP-Connector (Empfohlen)

Dies ist der einfachste Weg zum Verbinden. ChatGPT hat einen eingebauten Dialog "Mit benutzerdefiniertem MCP verbinden", der direkt mit B1s MCP-Server funktioniert -- keine Custom GPT erforderlich.

### Was Sie benötigen

- Ihren \cak_…\ Schlüssel aus Schritt 1

### Öffnen Sie den MCP-Connector in ChatGPT

Gehen Sie in ChatGPT zu **Einstellungen → Plugins → MCPs** und klicken Sie auf **Hinzufügen → MCP-Server hinzufügen**.

### Füllen Sie den Dialog aus

Klicken Sie auf **Streamable HTTP**, verwenden Sie dann diese Werte:

| Feld | Wert |
|---|---|
| **Name** | \B1 Church\ (oder einen beliebigen Namen) |
| **Typ** | **Streamable HTTP** |
| **URL** | \https://api.churchapps.org/mcp\ |
| **Bearer-Token-Umgebungsvariable** | Leer lassen |
| **Header** | Schlüssel: \Authorization\ / Wert: \Bearer cak_yourprefix.yoursecret\ |

Geben Sie im Wertfeld das Wort \Bearer\ ein, ein Leerzeichen, dann fügen Sie Ihren Schlüssel ein -- alles in das gleiche Feld. Beispiel: \Bearer cak_prefix.secret\.

Klicken Sie auf **Speichern**.

### Fragen Sie ChatGPT etwas

Nachdem Sie verbunden sind, fragen Sie einfach in natürlicher Sprache -- keine speziellen Befehle erforderlich:

- *"Wie viele Menschen sind in unserer Kirche?"*
- *"Wer ist in den letzten 30 Tagen beigetreten?"*
- *"Welche Gruppen sind jetzt aktiv?"*
- *"Fassen Sie die Gaben dieses Monats nach Fonds zusammen."*

ChatGPT ruft B1 im Hintergrund auf und antwortet aus Ihren Live-Daten.

---

## Pfad B — Custom GPT mit Aktionen

Eine Custom GPT ermöglicht es Ihnen, einen dedizierten Assistenten zu erstellen, den Ihr ganzes Team teilen kann -- sie öffnen einen Link und beginnen, Fragen zu stellen, ohne dass auf ihrer Seite ein Setup erforderlich ist. Es erfordert ein ChatGPT Plus, Team oder Enterprise Konto und etwa 10 Minuten.

### 1. Erstellen Sie einen API-Schlüssel

Befolgen Sie Schritt 1 oben, wenn Sie noch nicht getan haben.

### 2. Erstellen Sie die Custom GPT

1. Klicken Sie in ChatGPT auf Ihr Profil → **Meine GPTs** → **GPT erstellen**.
2. Wechseln Sie zur Registerkarte **Konfigurieren**, geben Sie der GPT einen Namen (z. B. "B1 Assistent") und fügen Sie Anweisungen hinzu:

   \\\
   Sie helfen Kirchenmitarbeitern, ihre B1-Aufzeichnungen abzufragen. Verwenden Sie die B1 API-Aktionen zu
   Personen, Gruppen, Anwesenheit, Spenden und Inhalte zu recherchieren. Begrenzen Sie Antworten immer
   auf Daten, die der Benutzer sehen darf. Seien Sie kurz und prägnant.
   \\\

3. Scrollen Sie zu **Aktionen** → **Neue Aktion erstellen** → **Authentifizierung**.
   - **Authentifizierungstyp:** API-Schlüssel
   - **API-Schlüssel:** fügen Sie Ihren \cak_…\ Schlüssel ein
   - **Auth-Typ:** Bearer
   - Speichern.

4. Fügen Sie in das **Schema**-Feld diese OpenAPI-Spezifikation ein.

---
