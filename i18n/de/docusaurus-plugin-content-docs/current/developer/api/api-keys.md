---
title: "API-Schlüssel"
---

# API-Schlüssel

<div class="article-intro">

API-Schlüssel (persönliche Zugriffstoken) sind der einfachste Weg, sich serverseitig an der B1-API zu authentifizieren – etwa aus einem Skript, einem Drittanbieter-Connector (Zapier, Make, Google Sheets) oder überall dort, wo ein vollständiger OAuth-Ablauf zu aufwendig wäre. Ein Schlüssel ist an eine bestimmte Person in einer bestimmten Gemeinde gebunden und übernimmt deren Berechtigungen, eingeschränkt durch eine optionale Auswahl an Bereichen (Scopes).

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Gemeindeadministrator mit der Berechtigung **Einstellungen bearbeiten** erstellt und verwaltet Schlüssel
- Der vollständige Schlüssel wird beim Erstellen **einmalig** angezeigt – speichern Sie ihn sofort an einem sicheren Ort
- Alle API-Anfragen müssen **HTTPS** verwenden

</div>

## Schlüsselformat

Ein B1-API-Schlüssel sieht so aus:

```
cak_<prefix>.<secret>
```

- `cak_` – feste Kennung (das API-Schlüsselpräfix, auf das die Authentifizierungsschicht prüft)
- `<prefix>` – 8-stelliges öffentliches Suchsegment
- `<secret>` – 48-stelliges Geheimnis; auf dem Server wird nur ein SHA-256-Hash gespeichert

Der vollständige Schlüssel wird dem Server im Standard-Bearer-Header übergeben:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Die API-Authentifizierungsschicht leitet jedes Token, das mit `cak_` beginnt, an den API-Schlüssel-Pfad weiter, bildet einen Hash des Geheimnisses, sucht den Schlüssel anhand des Präfixes und ermittelt die aktuellen Berechtigungen der Person des Schlüssels. Wird eine Berechtigung in B1Admin entzogen, wirkt sich das daher bereits bei der nächsten Anfrage aus, und der Schlüssel gerät nie aus dem Gleichklang mit der Rolle.

## Einen Schlüssel erstellen (B1Admin)

1. Melden Sie sich bei B1Admin als Benutzer mit der Berechtigung **Einstellungen bearbeiten** an.
2. Öffnen Sie **Einstellungen → Entwickler → API-Schlüssel**.
3. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm einen aussagekräftigen Namen (z. B. „Zapier – Spendensynchronisierung“), wählen Sie die Bereiche aus, die der Schlüssel haben soll, und klicken Sie auf **Speichern**.
4. Der vollständige Schlüssel `cak_…` wird **einmalig** in einem Dialogfeld angezeigt. Kopieren Sie ihn in die Konfiguration Ihrer Integration, bevor Sie das Fenster schließen – später ist er nicht mehr abrufbar. Sie können jederzeit einen neuen Schlüssel erstellen.

## Bereiche (Scopes)

Ein Bereich **schränkt** ein, was ein Schlüssel tun kann – er kann niemals eine Berechtigung gewähren, die die zugrunde liegende Person nicht hat. Ohne Bereiche besitzt der Schlüssel die gesamte Berechtigungsmenge der Person.

| Bereich | Erlaubt |
|---|---|
| `people:read` / `people:write` | Personen, Haushalte und Gruppenmitglieder ansehen / bearbeiten |
| `groups:read` / `groups:write` | Gruppen und ihre Mitgliedschaft ansehen / bearbeiten |
| `donations:read` / `donations:write` | Spenden ansehen / erfassen |
| `attendance:read` / `attendance:write` | Anwesenheit, Sitzungen und Check-ins ansehen / erfassen |
| `forms:write` | Formulare verwalten (Leserecht ist implizit im Schreibrecht enthalten) |
| `content:read` / `content:write` | Website-Inhalte, Anmeldungen und Streaming ansehen / bearbeiten |
| `messaging:read` / `messaging:write` | Nachrichten lesen; Schreibrecht erlaubt zusätzlich das Versenden von SMS |
| `roles:read` / `roles:write` | Rollendefinitionen ansehen / bearbeiten |
| `settings:read` / `settings:write` | Gemeindeeinstellungen ansehen / bearbeiten (**erforderlich**, um Webhooks programmatisch zu registrieren) |
| `workflows:read` / `workflows:write` | Workflows und Aufgaben ansehen / Workflows ausführen und bearbeiten. Das Ausführen eines Workflows kann E-Mails und SMS versenden, Webhooks auslösen und Gruppenmitgliedschaften ändern |
| `offline_access` | Langlebige Refresh-Token erlauben (nur für OAuth-Abläufe – bei API-Schlüsseln ohne Wirkung) |

`write`-Bereiche schließen das entsprechende `read` implizit ein. Berechtigungen für Server- und Domänenadministratoren werden bewusst nicht als Bereiche bereitgestellt – ein eingeschränktes Zugangsdatum kann sich nie zur Website-Administration erheben.

:::tip
Wenn Sie den Schlüssel zum Registrieren von Webhooks verwenden (z. B. für eine Zapier- oder Make-Integration), benötigt der Schlüssel `settings:write`. Ein Schlüssel nur mit `people:read` wird bei `POST /membership/webhooks` stillschweigend mit 403 abgelehnt.
:::

## Einen Schlüssel verwenden

Wie bei jedem Bearer-Token – jeder authentifizierte Endpunkt akzeptiert API-Schlüssel genau so, wie er JWTs akzeptiert:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Hat der Schlüssel nicht ausreichende Bereiche, antwortet die API mit **403 Forbidden** im selben Format, das auch bei verweigerten Berechtigungen verwendet wird.

## Schlüssel über die API verwalten

Alle Endpunkte liegen unter dem Pfad `/membership/apiKeys` des Membership-Moduls und erfordern ein JWT (keinen API-Schlüssel) eines Gemeindeadministrators mit der Berechtigung **Einstellungen bearbeiten**.

| Methode und Pfad | Zweck |
|---|---|
| `GET /membership/apiKeys` | Die Schlüssel der Gemeinde auflisten (ohne Geheimnis – nur `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste aller verfügbaren Bereichsnamen – für eine Oberfläche zum Erstellen von Schlüsseln |
| `POST /membership/apiKeys` | Einen neuen Schlüssel erstellen. Body: `{ "name": "...", "scopes": ["people:read"] }`. Die Antwort enthält den vollständigen Schlüssel `cak_…` **einmalig**. |
| `DELETE /membership/apiKeys/:id` | Einen Schlüssel widerrufen – wirkt sich bei der nächsten Anfrage aus |

Ein widerrufener Schlüssel ist sofort ungültig – es gibt keine Nachfrist.

## Bewährte Vorgehensweisen

- **Ein Schlüssel pro Integration.** Wird etwas kompromittiert, widerrufen Sie nur diesen einen Schlüssel, ohne die anderen zu beeinträchtigen.
- **Vergeben Sie möglichst eingeschränkte Bereiche.** Ein Google-Sheets-Export benötigt nur `people:read`, nicht `settings:write`.
- **Binden Sie den Schlüssel an ein Dienstkonto, nicht an einen echten Mitarbeitenden.** Verlässt ein Mitarbeitender die Gemeinde, endet sein B1-Zugang – und mit ihm alle Schlüssel, die unter seiner Identität erstellt wurden.
- **Speichern Sie Schlüssel in einem Geheimnisverwalter** (den Umgebungsvariablen Ihres Hosting-Anbieters, AWS Secrets Manager usw.) – niemals in der Quellcodeverwaltung.
- **Rotieren Sie Schlüssel**, wenn Sie einen Verdacht auf Offenlegung haben: Erstellen Sie einen neuen Schlüssel, aktualisieren Sie die Integration und löschen Sie dann den alten.

## Unterschied zu OAuth

API-Schlüssel eignen sich, wenn **Ihre Gemeinde die einzige ist, die die Integration nutzt**. Für einen Connector, der auf viele Gemeinden zugreifen muss, wobei jede Gemeinde ausdrücklich zustimmt – etwa eine SaaS-Anwendung, die in der B1-Community geteilt wird –, verwenden Sie stattdessen [OAuth und verbundene Apps](./connected-apps).

| | API-Schlüssel | OAuth |
|---|---|---|
| Wer installiert es | Ein Gemeindeadministrator | Jeder Gemeindeadministrator autorisiert die App |
| Auth-Header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Gültigkeitsdauer des Tokens | Bis zum Widerruf | Zugriff ca. 7 Tage, Refresh ca. 90 Tage |
| Geeignet für | Interne Skripte, Zapier-/Make-/Sheets-Connectors | Mandantenfähige Drittanbieter-Apps |
