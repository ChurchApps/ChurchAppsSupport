---
title: "API-Schlüssel"
---

# API-Schlüssel

<div class="article-intro">

API-Schlüssel (persönliche Zugriffstoken) sind der einfachste Weg, sich von einem serverseitigen Skript, einem Drittanbieter-Connector (Zapier, Make, Google Tabellen) oder überall dort an der B1-API anzumelden, wo ein vollständiger OAuth-Ablauf übertrieben wäre. Ein Schlüssel ist an eine bestimmte Person in einer bestimmten Kirche gebunden und übernimmt deren Berechtigungen, die optional durch eine Auswahl von Scopes eingeschränkt werden können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Eine Kirchenadministration mit der Berechtigung **Einstellungen bearbeiten** erstellt und verwaltet Schlüssel.
- Der Schlüssel wird beim Erstellen **einmal** angezeigt – bewahren Sie ihn sofort an einem sicheren Ort auf.
- Alle API-Anfragen müssen **HTTPS** verwenden.

</div>

## Format des Schlüssels

Ein B1-API-Schlüssel sieht so aus:

```
cak_<prefix>.<secret>
```

- `cak_` – feste Kennung (das Präfix, auf das die Authentifizierungsschicht prüft)
- `<prefix>` – öffentlicher Suchabschnitt mit 8 Zeichen
- `<secret>` – Geheimnis mit 48 Zeichen; auf dem Server wird nur ein SHA-256-Hash gespeichert

Der vollständige Schlüssel wird dem Server im üblichen Bearer-Header übergeben:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Die Authentifizierungsschicht der API leitet jedes Token, das mit `cak_` beginnt, an den API-Schlüssel-Pfad weiter, bildet einen Hash des Geheimnisses, sucht den Schlüssel anhand des Präfixes und ermittelt die aktuellen Berechtigungen der Person hinter dem Schlüssel. Wird also eine Berechtigung in B1 Admin entzogen, gilt dies bereits bei der nächsten Anfrage, und der Schlüssel läuft nie aus dem Takt mit der Rolle.

## Einen Schlüssel erstellen (B1 Admin)

1. Melden Sie sich in B1 Admin als Benutzer mit der Berechtigung **Einstellungen bearbeiten** an.
2. Öffnen Sie **Einstellungen → Entwickler → API-Schlüssel**.
3. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm einen eindeutigen Namen (z. B. „Zapier – Spendenabgleich“), wählen Sie die Scopes aus, die der Schlüssel haben soll, und klicken Sie auf **Speichern**.
4. Der vollständige Schlüssel `cak_…` wird in einem Dialog **einmal** angezeigt. Kopieren Sie ihn in die Konfiguration Ihrer Integration, bevor Sie den Dialog schließen – später lässt er sich nicht mehr abrufen. Sie können jederzeit einen neuen Schlüssel erstellen.

## Scopes {#scopes}

Ein Scope **schränkt** ein, was ein Schlüssel tun kann – er kann niemals eine Berechtigung gewähren, die die zugrunde liegende Person nicht besitzt. Ohne Scopes (leere Auswahl) umfasst der Schlüssel den vollständigen Berechtigungssatz der Person.

| Scope | Erlaubt |
|---|---|
| `people:read` / `people:write` | Personen, Haushalte und Gruppenmitglieder anzeigen / bearbeiten |
| `groups:read` / `groups:write` | Gruppen und ihre Mitgliedschaft anzeigen / bearbeiten |
| `donations:read` / `donations:write` | Spenden anzeigen / erfassen |
| `attendance:read` / `attendance:write` | Anwesenheit, Sitzungen und Check-ins anzeigen / erfassen |
| `forms:write` | Formulare verwalten (Lesezugriff ist im Schreibzugriff enthalten) |
| `content:read` / `content:write` | Website-Inhalte, Anmeldungen und Streaming anzeigen / bearbeiten |
| `messaging:read` / `messaging:write` | Nachrichten lesen; Schreibzugriff erlaubt außerdem den Versand von SMS |
| `roles:read` / `roles:write` | Rollendefinitionen anzeigen / bearbeiten |
| `settings:read` / `settings:write` | Kircheneinstellungen anzeigen / bearbeiten (**erforderlich**, um Webhooks programmatisch zu registrieren) |
| `workflows:read` / `workflows:write` | Workflows und Aufgaben anzeigen / Workflows ausführen und bearbeiten. Das Ausführen eines Workflows kann E-Mails und SMS senden, Webhooks auslösen und Gruppenmitgliedschaften ändern |
| `offline_access` | Langlebige Refresh-Token erlauben (nur für OAuth-Abläufe; hat bei API-Schlüsseln keine Wirkung) |

`write`-Scopes enthalten implizit den passenden `read`-Scope. Administrative Berechtigungen auf Server- und Domänenebene werden bewusst nicht als Scopes angeboten – ein eingeschränktes Zugangsdatum kann niemals zur Website-Administration aufsteigen.

:::tip
Wenn Sie den Schlüssel zum Registrieren von Webhooks verwenden (etwa für eine Zapier- oder Make-Integration), benötigt der Schlüssel `settings:write`. Ein Schlüssel nur mit `people:read` scheitert bei `POST /membership/webhooks` stillschweigend mit 403.
:::

## Einen Schlüssel verwenden

Wie bei jedem Bearer-Token: Jeder authentifizierte Endpunkt akzeptiert API-Schlüssel genauso wie JWTs.

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Hat der Schlüssel nicht die nötigen Scopes, antwortet die Anfrage mit **403 Forbidden** im gleichen Format wie jeder andere Berechtigungsfehler.

## Schlüssel über die API verwalten

Alle Endpunkte liegen unter dem Pfad `/membership/apiKeys` des Membership-Moduls und erfordern ein JWT (keinen API-Schlüssel) einer Kirchenadministration mit der Berechtigung **Einstellungen bearbeiten**.

| Methode & Pfad | Zweck |
|---|---|
| `GET /membership/apiKeys` | Listet die Schlüssel der Kirche auf (ohne Geheimnis – nur `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste aller verfügbaren Scope-Namen – für eine Oberfläche zum Erstellen von Schlüsseln |
| `POST /membership/apiKeys` | Erstellt einen neuen Schlüssel. Body: `{ "name": "...", "scopes": ["people:read"] }`. Die Antwort enthält den vollständigen Schlüssel `cak_…` **einmal**. |
| `DELETE /membership/apiKeys/:id` | Widerruft einen Schlüssel – gilt ab der nächsten Anfrage |

Ein widerrufener Schlüssel ist sofort ungültig – es gibt keine Schonfrist.

## Bewährte Vorgehensweisen

- **Ein Schlüssel pro Integration.** Wird einer kompromittiert, widerrufen Sie nur diesen einen, ohne die anderen zu unterbrechen.
- **Vergeben Sie die engsten Scopes, die funktionieren.** Ein Export nach Google Tabellen braucht nur `people:read`, nicht `settings:write`.
- **Binden Sie den Schlüssel an ein Dienstkonto, nicht an eine echte Mitarbeiterperson.** Verlässt eine Mitarbeiterin die Kirche, endet ihr Zugang zu B1 – und mit ihm alle Schlüssel, die unter ihrer Identität erstellt wurden.
- **Bewahren Sie Schlüssel in einem Geheimnisverwalter auf** (Umgebungsvariablen Ihres Hostinganbieters, AWS Secrets Manager usw.) – niemals in der Quellcodeverwaltung.
- **Tauschen Sie Schlüssel aus**, wenn Sie einen Verlust vermuten: Erstellen Sie einen neuen Schlüssel, aktualisieren Sie die Integration und löschen Sie danach den alten.

## Unterschied zu OAuth

API-Schlüssel eignen sich, wenn **Ihre Kirche die einzige ist, die die Integration nutzt**. Für einen Connector, der auf viele Kirchen mit jeweils ausdrücklicher Zustimmung zugreifen muss – etwa eine SaaS-App, die von der B1-Gemeinschaft genutzt wird – verwenden Sie stattdessen [OAuth und verbundene Apps](./connected-apps).

| | API-Schlüssel | OAuth |
|---|---|---|
| Wer installiert ihn | Eine Kirchenadministration | Jede Kirchenadministration autorisiert die App |
| Authentifizierungs-Header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Gültigkeitsdauer des Tokens | Bis zum Widerruf | Zugriff ca. 7 Tage, Refresh ca. 90 Tage |
| Am besten für | Interne Skripte, Zapier-/Make-/Sheets-Connectoren | Mandantenfähige Drittanbieter-Apps |
