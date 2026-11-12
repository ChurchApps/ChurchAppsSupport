---
title: "ChatGPT"
description: "Verbinden Sie ChatGPT mit den B1-Daten Ihrer Gemeinde über einen API-Schlüssel, damit Sie in B1 Admin Fragen zu Personen, Spenden und Anwesenheit in einfacher Sprache stellen können."
---

# ChatGPT

<div class="article-intro">

Verbinden Sie ChatGPT mit den B1-Daten Ihrer Gemeinde und stellen Sie Fragen in einfacher Sprache – die Antworten stammen aus Ihren aktuellen Gemeindedaten. Sie können ChatGPT auch bitten, bei Aufgaben zu helfen, die in B1 Admin mehrere Schritte erfordern würden.

**Einige Beispielfragen:**
- *„Zeig mir alle, die letzte Woche da waren, aber noch keiner Kleingruppe zugeordnet sind“*
- *„Fasse die Spenden dieses Monats nach Fonds zusammen“*
- *„Wer sind unsere neuesten Mitglieder, und haben wir uns bei ihnen gemeldet?“*
- *„Ich weiß nicht, wie ich in B1 X mache – kannst du mich durch den Ablauf führen?“*

</div>

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- **Die ChatGPT-Desktop-App** für Mac oder Windows
- **Ein kostenpflichtiges ChatGPT-Abo** (Plus oder höher). Kostenlose ChatGPT-Konten können sich nicht mit B1 verbinden.
- **Ihr B1-Login** mit der Berechtigung, Gemeindeeinstellungen zu verwalten (wird benötigt, um einen Schlüssel zu erstellen). Haben Sie diese nicht? Fragen Sie die B1-Administration Ihrer Gemeinde.

</div>

:::tip Empfehlung: Probieren Sie zuerst Claude aus – es ist kostenlos
[Claude](./claude.md) verbindet sich im **kostenlosen Tarif** mit B1 und ist in weniger als 3 Minuten eingerichtet – fügen Sie einfach B1 als Connector hinzu und melden Sie sich mit Ihrem B1-Konto an. Kein Schlüssel nötig. Es ist der einfachste Weg für Ihre Gemeinde, KI mit B1 auszuprobieren, bevor Sie für etwas bezahlen.
:::

## So richten Sie es ein {#set-it-up}

Die Bildschirme können in Ihrer Version von ChatGPT etwas anders aussehen.

---

**Schritt 1 — Erstellen Sie Ihren B1-Schlüssel**

Der Schlüssel ist das, was ChatGPT Zugang zu *Ihrer* B1-Gemeinde verschafft – denken Sie an ein Passwort, das nur für ChatGPT gilt.

1. Melden Sie sich bei [B1 Admin](https://admin.b1.church) an und gehen Sie zu [Einstellungen → Entwickler](https://admin.b1.church/settings/developer).
2. Klicken Sie auf dem Reiter **API-Schlüssel** auf **Neuer API-Schlüssel** und benennen Sie ihn `ChatGPT`.
3. **Berechtigungen:** Markieren Sie, was ChatGPT tun darf. Jeder Bereich hat ein Feld **Lesen** (nur ansehen) und ein Feld **Schreiben** (Änderungen vornehmen). Sie sind unsicher? Markieren Sie zu Beginn nur die Felder **Lesen**.
4. Klicken Sie auf **Speichern** und dann auf **Kopieren**, um den Schlüssel zu kopieren (er beginnt mit `cak_`). Er wird nur einmal angezeigt.

---

**Schritt 2 — Klicken Sie unten links in ChatGPT auf Ihren Namen**

![Klicken Sie auf Ihren Profilnamen](/img/guides/chatgpt-mcp/01.png)

---

**Schritt 3 — Klicken Sie auf Einstellungen**

![Klicken Sie im Menü auf Einstellungen](/img/guides/chatgpt-mcp/02.png)

---

**Schritt 4 — Klicken Sie in der linken Seitenleiste auf Plugins**

![Klicken Sie unter Integrationen auf Plugins](/img/guides/chatgpt-mcp/03.png)

---

**Schritt 5 — Klicken Sie auf den Reiter MCPs**

![Klicken Sie auf den Reiter MCPs](/img/guides/chatgpt-mcp/04.png)

Hier sehen Sie alle MCP-Server, die Sie bereits hinzugefügt haben.

---

**Schritt 6 — Klicken Sie auf Hinzufügen → MCP-Server hinzufügen**

![Klicken Sie auf Hinzufügen und dann auf MCP-Server hinzufügen](/img/guides/chatgpt-mcp/06.png)

---

**Schritt 7 — Füllen Sie das Formular aus und klicken Sie auf Speichern**

![Formular für die Verbindung mit einem benutzerdefinierten MCP](/img/guides/chatgpt-mcp/07.png)

Klicken Sie auf **Streamable HTTP** und füllen Sie dann aus:

| Feld | Was einzugeben ist |
|---|---|
| **Name** | `B1 Church` (oder ein beliebiger Name) |
| **Typ** | Klicken Sie auf **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Umgebungsvariable für Bearer-Token** | Leer lassen |
| **Header** | Klicken Sie auf **+ Header hinzufügen** → Schlüssel: `Authorization` → Wert: siehe unten |

![Ausgefülltes Beispiel mit Authorization als Schlüssel und Bearer-Schlüssel als Wert](/img/guides/chatgpt-mcp/08.png)

- **Schlüssel:** `Authorization`
- **Wert:** `Bearer cak_yourkey` – das Wort Bearer, ein Leerzeichen und dann Ihr Schlüssel

Klicken Sie auf **Speichern**.

Das war's! Gehen Sie zurück in einen Chat und fragen Sie etwas wie *„Wie viele Personen gehören zu unserer Gemeinde?“* – ChatGPT holt die Antwort direkt aus B1.

---

## Ist das sicher? {#is-it-safe}

- ChatGPT kann nur **die Daten Ihrer Gemeinde** sehen.
- Es kann nur tun, was Ihr Schlüssel erlaubt – ein Schlüssel, bei dem nur die Felder **Lesen** markiert sind, kann Daten ansehen, aber nie etwas ändern.
- Um es abzuschalten, löschen Sie den Schlüssel in B1 Admin unter **Einstellungen → Entwickler**. Der Zugriff endet sofort.

## Was kostet es? {#what-does-it-cost}

Die B1-Verbindung ist kostenlos – sie ist Teil von ChurchApps. Für die Verbindung benötigt ChatGPT ein kostenpflichtiges Abo (Plus oder höher); siehe die Preise von OpenAI.

## Technische Details {#technical-details}

Der Rest dieser Seite richtet sich an technisch versierte Nutzer und KI-Assistenten. Der MCP-Server von B1 erreicht man unter `https://api.churchapps.org/mcp` (Streamable HTTP) und er nimmt den API-Schlüssel als Header `Authorization: Bearer cak_…` entgegen. Siehe die [Referenz zum MCP-Server für Entwickler](/docs/developer/api/mcp).

### Benutzerdefiniertes GPT mit Aktionen {#custom-gpt-with-actions}

Ein benutzerdefiniertes GPT ermöglicht es Ihnen, einen eigenen Assistenten zu erstellen, den Ihr ganzes Team gemeinsam nutzen kann – sie öffnen einen Link und können ohne jede Einrichtung Fragen stellen. Es erfordert ein ChatGPT-Konto mit Plus, Team oder Enterprise und etwa 10 Minuten.

#### 1. Einen API-Schlüssel erstellen {#1-create-an-api-key}

Folgen Sie Schritt 1 unter „So richten Sie es ein“ oben, falls Sie das noch nicht getan haben.

#### 2. Das benutzerdefinierte GPT erstellen {#2-build-the-custom-gpt}

1. Klicken Sie in ChatGPT auf Ihr Profil → **Meine GPTs** → **GPT erstellen**.
2. Wechseln Sie zum Reiter **Konfigurieren**, geben Sie dem GPT einen Namen (z. B. „B1-Assistent“) und fügen Sie Anweisungen hinzu:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scrollen Sie zu **Aktionen** → **Neue Aktion erstellen** → **Authentifizierung**.
   - **Authentifizierungstyp:** API-Schlüssel
   - **API-Schlüssel:** fügen Sie Ihren `cak_…`-Schlüssel ein
   - **Auth-Typ:** Bearer
   - Speichern.

4. Fügen Sie in das Feld **Schema** diese Start-Spezifikation (OpenAPI) ein:

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Speichern Sie die Aktion. Testen Sie sie mit: *„Wie viele Personen gehören zur Gemeinde?“* – ChatGPT ruft `listPeople` auf und antwortet.
6. **Veröffentlichen** Sie das GPT (Nur ich / Jeder mit Link / Organisation) und teilen Sie den Link mit Ihrem Team.

#### 3. Verwenden {#3-use-it}

Jeder, der den Link hat, kann Fragen in natürlicher Sprache stellen. Die Berechtigungen des Schlüssels gelten weiterhin – ein Schlüssel nur mit Leserechten lehnt Schreibvorgänge ab, unabhängig davon, was das Aktionsschema vorsieht.

---

### Sicherheit und Grenzen {#safety-and-limits}

- **Trennung pro Gemeinde.** Der API-Schlüssel gehört zu genau einer Gemeinde. ChatGPT kann die Daten anderer Gemeinden nicht sehen.
- **Auf Berechtigungen beschränkt.** Der Schlüssel trägt nur die Berechtigungen, die Sie vergeben haben. Wenn Sie eine Berechtigung entfernen (indem Sie den Schlüssel löschen und neu erstellen), endet dieser Zugriff beim nächsten Aufruf.
- **Sofort widerrufbar.** Löschen Sie den Schlüssel unter **Einstellungen → Entwickler → API-Schlüssel**, dann endet der Zugriff sofort.
- **Das Teilen eines benutzerdefinierten GPT teilt auch die Daten.** Jeder mit Zugriff auf das GPT kann alles sehen, was die Berechtigungen des Schlüssels erlauben. Verwenden Sie für weit geteilte GPTs bevorzugt engere Berechtigungen (z. B. ohne `donations:read`).
- **Prüfprotokoll.** Alle Änderungen, die über ChatGPT vorgenommen werden, laufen über dasselbe Prüfprotokoll wie die Aktionen in B1 Admin – Sie finden sie unter **Einstellungen → Prüfprotokoll**.

### Fehlerbehebung {#troubleshooting}

**Der MCP-Connector meldet „Unauthorized“ oder zeigt einen Fehler 401:** Ihr API-Schlüssel fehlt oder ist falsch. Öffnen Sie die Connector-Einstellungen und prüfen Sie den Header **Authorization**: Der Wert sollte das Wort `Bearer`, ein Leerzeichen und dann den vollständigen `cak_…`-Schlüssel ohne zusätzliche Leerzeichen enthalten.

**ChatGPT sagt, es kann bestimmte Daten nicht finden:** Dem Schlüssel fehlen möglicherweise die richtigen Berechtigungen. Erstellen Sie unter **Einstellungen → Entwickler → API-Schlüssel** einen neuen Schlüssel mit den zusätzlichen Berechtigungen und aktualisieren Sie den Connector.

**Aktion des benutzerdefinierten GPT liefert 401:** Prüfen Sie im Authentifizierungsbereich der Aktion, ob **Auth-Typ: Bearer** ausgewählt ist, und dass der Schlüssel nicht das Wort `Bearer` enthält (ChatGPT fügt es automatisch hinzu).

**Aktion des benutzerdefinierten GPT liefert 403:** Der Schlüssel hat keine Berechtigung für diesen Endpunkt. Erstellen Sie einen neuen Schlüssel mit den richtigen Berechtigungen und aktualisieren Sie das GPT.

**Das Aktionsschema wird abgelehnt:** ChatGPT verlangt OpenAPI 3.1 mit mindestens einem Eintrag unter `paths` und einer `servers`-URL. Prüfen Sie das YAML auf [editor.swagger.io](https://editor.swagger.io), bevor Sie es einfügen.

## Verwandt {#related}

- [API-Schlüssel](/docs/developer/api/api-keys) – vollständige Referenz der Berechtigungen
- [MCP-Server (Entwickler-Referenz)](/docs/developer/api/mcp) – Protokolldetails und Tool-Schemas
- [Claude](./claude.md) – dasselbe Prinzip, für die Modelle von Anthropic
- [REST-API-Referenz](/docs/developer/api/endpoints) – jeder Endpunkt, den eine Aktion eines benutzerdefinierten GPT aufrufen kann
