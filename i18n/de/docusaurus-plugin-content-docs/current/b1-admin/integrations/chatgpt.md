---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Verbinden Sie ChatGPT mit den B1-Daten Ihrer Gemeinde und stellen Sie Fragen in ganz normaler Sprache – ChatGPT antwortet anhand Ihrer aktuellen Gemeindedaten. Sie können ChatGPT auch bitten, bei Aufgaben zu helfen, die in B1 Admin mehrere Schritte erfordern würden.

**Einige Dinge, die Sie fragen können:**
- *„Zeige mir alle, die letzte Woche anwesend waren, aber noch keiner Kleingruppe zugeordnet sind“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen“*
- *„Wer sind unsere neuesten Mitglieder, und haben wir uns bei ihnen gemeldet?“*
- *„Ich weiß nicht, wie man X in B1 macht – kannst du mich Schritt für Schritt anleiten?“*

</div>

<div class="prereqs">
<h4>Was Sie brauchen</h4>

- **Die ChatGPT-Desktop-App** für Mac oder Windows
- **Einen kostenpflichtigen ChatGPT-Plan** (Plus oder höher). Kostenlose ChatGPT-Konten können sich nicht mit B1 verbinden.
- **Ihre B1-Anmeldung** mit der Berechtigung, Gemeindeeinstellungen zu verwalten (nötig, um einen Schlüssel zu erstellen). Haben Sie diese nicht? Fragen Sie den B1-Administrator Ihrer Gemeinde.

</div>

:::tip Empfehlung: Probieren Sie zuerst Claude aus – es ist kostenlos
[Claude](./claude) verbindet sich mit dem **kostenlosen Plan** mit B1 und ist in weniger als 3 Minuten eingerichtet – fügen Sie einfach B1 als Connector hinzu und melden Sie sich mit Ihrem B1-Konto an. Kein Schlüssel nötig. Das ist der einfachste Weg für Ihre Gemeinde, KI mit B1 auszuprobieren, bevor Sie für irgendetwas bezahlen.
:::

## Einrichtung

Die Bildschirme können in Ihrer ChatGPT-Version leicht anders aussehen.

---

**Schritt 1 – B1-Schlüssel erstellen**

Der Schlüssel ist das, was ChatGPT Zugang zu B1 *Ihrer* Gemeinde gibt – stellen Sie sich ihn wie ein Passwort nur für ChatGPT vor.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und gehen Sie zu [Einstellungen → Entwickler](https://admin.b1.church/settings/developer).
2. Klicken Sie auf der Registerkarte **API-Schlüssel** auf **Neuer API-Schlüssel** und nennen Sie ihn `ChatGPT`.
3. **Geltungsbereiche:** Wählen Sie aus, was ChatGPT tun darf. Jeder Bereich hat ein Kästchen **read** (nur ansehen) und ein Kästchen **write** (Änderungen vornehmen). Unsicher? Aktivieren Sie zu Beginn nur die **read**-Kästchen.
4. Klicken Sie auf **Speichern** und dann auf **Kopieren**, um den Schlüssel zu kopieren (er beginnt mit `cak_`). Er wird nur einmal angezeigt.

---

**Schritt 2 – Klicken Sie unten links in ChatGPT auf Ihren Namen**

![Klicken Sie auf Ihren Profilnamen](/img/guides/chatgpt-mcp/01.png)

---

**Schritt 3 – Klicken Sie auf Settings (Einstellungen)**

![Klicken Sie im Menü auf Settings](/img/guides/chatgpt-mcp/02.png)

---

**Schritt 4 – Klicken Sie in der linken Seitenleiste auf Plugins**

![Klicken Sie unter Integrationen auf Plugins](/img/guides/chatgpt-mcp/03.png)

---

**Schritt 5 – Klicken Sie auf die Registerkarte MCPs**

![Klicken Sie auf die Registerkarte MCPs](/img/guides/chatgpt-mcp/04.png)

Hier sehen Sie alle MCP-Server, die Sie bereits hinzugefügt haben.

---

**Schritt 6 – Klicken Sie auf Add → Add MCP server (Hinzufügen → MCP-Server hinzufügen)**

![Klicken Sie auf Add und dann auf Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Schritt 7 – Füllen Sie das Formular aus und klicken Sie auf Save (Speichern)**

![Formular zum Verbinden mit einem benutzerdefinierten MCP](/img/guides/chatgpt-mcp/07.png)

Klicken Sie auf **Streamable HTTP** und füllen Sie dann aus:

| Feld | Was eingeben |
|---|---|
| **Name** | `B1 Church` (oder ein beliebiger Name) |
| **Type** (Typ) | Klicken Sie auf **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Leer lassen |
| **Headers** (Header) | Klicken Sie auf **+ Add header** → Key: `Authorization` → Value: siehe unten |

![Ausgefülltes Beispiel mit Authorization unter Key und dem Bearer-Schlüssel unter Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_ihrschluessel` – das Wort Bearer, ein Leerzeichen, dann Ihr Schlüssel

Klicken Sie auf **Save** (Speichern).

Das war's! Gehen Sie zurück zu einem Chat und fragen Sie etwa *„Wie viele Personen gehören zu unserer Gemeinde?“* – ChatGPT holt die Antwort direkt aus B1.

---

## Ist es sicher?

- ChatGPT kann nur die Daten **Ihrer Gemeinde** sehen.
- ChatGPT kann nur das tun, was Ihr Schlüssel erlaubt – ein Schlüssel, bei dem nur **read**-Kästchen aktiviert sind, kann nachsehen, aber niemals etwas ändern.
- Zum Abschalten löschen Sie den Schlüssel in B1 Admin unter **Einstellungen → Entwickler**. Der Zugriff endet sofort.

## Was kostet es?

Die B1-Verbindung ist kostenlos – sie ist Teil von ChurchApps. ChatGPT benötigt für die Verbindung einen kostenpflichtigen Plan (Plus oder höher); siehe die Preise von OpenAI.

## Technische Details

Der Rest dieser Seite richtet sich an technisch versierte Benutzer und KI-Assistenten. Der MCP-Server von B1 befindet sich unter `https://api.churchapps.org/mcp` (Streamable HTTP) und erwartet den API-Schlüssel als Header `Authorization: Bearer cak_…`. Siehe die [MCP Server Entwickler-Referenz](/docs/developer/api/mcp).

### Custom GPT mit Actions

Mit einem Custom GPT können Sie einen eigenen Assistenten erstellen, den Ihr ganzes Team gemeinsam nutzen kann – die Teammitglieder öffnen einen Link und stellen sofort Fragen, ganz ohne eigene Einrichtung. Dafür benötigen Sie ein ChatGPT Plus-, Team- oder Enterprise-Konto und etwa 10 Minuten.

#### 1. API-Schlüssel erstellen

Folgen Sie Schritt 1 der Einrichtung oben, falls Sie das noch nicht getan haben.

#### 2. Custom GPT erstellen

1. Klicken Sie in ChatGPT auf Ihr Profil → **My GPTs** (Meine GPTs) → **Create a GPT** (GPT erstellen).
2. Wechseln Sie zur Registerkarte **Configure** (Konfigurieren), geben Sie dem GPT einen Namen (z. B. „B1 Assistent“) und fügen Sie Anweisungen hinzu:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scrollen Sie zu **Actions** → **Create new action** (Neue Aktion erstellen) → **Authentication** (Authentifizierung).
   - **Authentication type:** API Key
   - **API Key:** Fügen Sie Ihren `cak_…`-Schlüssel ein
   - **Auth Type:** Bearer
   - Speichern.

4. Fügen Sie in das Feld **Schema** diese OpenAPI-Starter-Spezifikation ein:

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

5. Speichern Sie die Action. Testen Sie sie: *„Wie viele Personen gehören zur Gemeinde?“* – ChatGPT ruft `listPeople` auf und antwortet.
6. **Veröffentlichen** Sie das GPT mit **Publish** (Only me / Anyone with link / Organization) und teilen Sie den Link mit Ihrem Team.

#### 3. Verwenden

Jeder mit dem Link kann Fragen in natürlicher Sprache stellen. Die Geltungsbereiche des Schlüssels gelten weiterhin – ein schreibgeschützter Schlüssel verweigert Schreibvorgänge, unabhängig davon, was das Action-Schema sagt.

---

### Sicherheit und Limits

- **Isolation pro Gemeinde.** Der API-Schlüssel gehört zu genau einer Gemeinde. ChatGPT kann keine Daten anderer Gemeinden sehen.
- **Durch Berechtigungen begrenzt.** Der Schlüssel trägt nur die Geltungsbereiche, die Sie gewährt haben. Wenn Sie einen Geltungsbereich entfernen (indem Sie den Schlüssel löschen und neu erstellen), endet dieser Zugriff beim nächsten Aufruf.
- **Sofort widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, und der Zugriff endet sofort.
- **Wer ein Custom GPT teilt, teilt die Daten.** Jeder mit Zugriff auf das GPT kann alles sehen, was die Geltungsbereiche des Schlüssels erlauben. Verwenden Sie für breit geteilte GPTs lieber engere Geltungsbereiche (z. B. ohne `donations:read`).
- **Audit-Trail.** Alle über ChatGPT vorgenommenen Änderungen durchlaufen das gleiche Audit-Log wie B1 Admin-Aktionen – Sie finden sie unter **Einstellungen → Audit-Log**.

### Fehlerbehebung

**Der MCP-Connector meldet „Unauthorized“ oder zeigt einen 401-Fehler:** Ihr API-Schlüssel fehlt oder ist falsch. Öffnen Sie die Connector-Einstellungen und prüfen Sie den Header **Authorization**: Der Wert sollte das Wort `Bearer` sein, ein Leerzeichen, dann der vollständige `cak_…`-Schlüssel ohne zusätzliche Leerzeichen.

**ChatGPT sagt, dass es bestimmte Daten nicht finden kann:** Dem Schlüssel fehlen möglicherweise die richtigen Geltungsbereiche. Erstellen Sie unter **Einstellungen → Entwickler → API-Schlüssel** einen neuen Schlüssel mit den zusätzlichen Geltungsbereichen und aktualisieren Sie den Connector.

**Die Custom-GPT-Action gibt 401 zurück:** Bestätigen Sie im Authentifizierungsbereich der Action, dass **Auth Type: Bearer** ausgewählt ist und der Schlüssel das Wort `Bearer` nicht enthält (ChatGPT fügt es automatisch hinzu).

**Die Custom-GPT-Action gibt 403 zurück:** Der Schlüssel hat nicht den Geltungsbereich für diesen Endpoint. Erstellen Sie einen neuen Schlüssel mit den richtigen Geltungsbereichen und aktualisieren Sie das GPT.

**Das Action-Schema wird abgelehnt:** ChatGPT verlangt OpenAPI 3.1 mit mindestens einem `paths`-Eintrag und einer `servers`-URL. Validieren Sie das YAML vor dem Einfügen unter [editor.swagger.io](https://editor.swagger.io).

## Verwandt

- [API-Schlüssel](/docs/developer/api/api-keys) – vollständige Referenz der Geltungsbereiche
- [MCP Server (Entwickler-Referenz)](/docs/developer/api/mcp) – Protokoll-Details und Tool-Schemata
- [Claude](./claude) – gleiche Idee, für die Modelle von Anthropic
- [REST-API-Referenz](/docs/developer/api/endpoints) – jeder Endpoint, den eine Custom-GPT-Action aufrufen kann
