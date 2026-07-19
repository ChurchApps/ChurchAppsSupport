---
title: "API-Schlüssel"
---

# API-Schlüssel

<div class="article-intro">

API-Schlüssel (persönliche Zugriffstoken) sind der einfachste Weg, sich gegenüber der B1-API aus einem serverseitigen Skript, einem Drittanbieter-Connector (Zapier, Make, Google Sheets) oder überall dort zu authentifizieren, wo ein vollständiger OAuth-Flow übertrieben wäre. Ein Schlüssel ist an eine bestimmte Person in einer bestimmten Kirche gebunden und erbt die Berechtigungen dieser Person, eingeschränkt durch eine optionale Menge von Scopes.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Kirchen-Admin mit der Berechtigung **Einstellungen bearbeiten** erstellt und verwaltet Schlüssel
- Der rohe Schlüssel wird bei der Erstellung **einmalig** angezeigt — speichern Sie ihn sofort an einem sicheren Ort
- Alle API-Anfragen müssen **HTTPS** verwenden

</div>

## Schlüsselformat

Ein B1-API-Schlüssel sieht so aus:

```
cak_<prefix>.<secret>
```

- `cak_` — fester Bezeichner (das API-Schlüssel-Präfix, auf das die Auth-Schicht abgleicht)
- `<prefix>` — 8-stelliges öffentliches Nachschlagesegment
- `<secret>` — 48-stelliges Geheimnis; serverseitig wird nur ein SHA-256-Hash gespeichert

Der vollständige Schlüssel wird dem Server im standardmäßigen Bearer-Header übergeben:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Die API-Auth-Schicht leitet jedes Token, das mit `cak_` beginnt, auf den API-Schlüssel-Pfad um, hasht das Geheimnis, sucht es anhand des Präfixes nach und löst die aktuellen Berechtigungen der zum Schlüssel gehörenden Person auf — das Widerrufen einer Berechtigung in B1Admin wirkt sich also bereits auf die nächste Anfrage aus, und der Schlüssel gerät nie außer Sync mit der Rolle.

## Einen Schlüssel erstellen (B1Admin)

1. Melden Sie sich bei B1Admin als Benutzer mit **Einstellungen bearbeiten** an.
2. Öffnen Sie **Einstellungen → Entwickler → API-Schlüssel**.
3. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm einen erkennbaren Namen (z. B. "Zapier — Spendenabgleich"), wählen Sie die Scopes aus, die der Schlüssel haben soll, und klicken Sie auf **Speichern**.
4. Der vollständige `cak_…`-Schlüssel wird **einmalig** in einem Dialog angezeigt. Kopieren Sie ihn in die Konfiguration Ihrer Integration, bevor Sie den Dialog schließen — es gibt keine Möglichkeit, ihn später abzurufen. Sie können jederzeit einen neuen Schlüssel erstellen.

## Scopes

Ein Scope **schränkt ein**, was ein Schlüssel tun kann — er kann nie eine Berechtigung gewähren, die die zugrunde liegende Person nicht hat. Leere/keine Scopes bedeutet, dass der Schlüssel den vollständigen Berechtigungssatz der Person trägt.

| Scope | Erlaubt |
|---|---|
| `people:read` / `people:write` | Personen, Haushalte, Gruppenmitglieder ansehen / bearbeiten |
| `groups:read` / `groups:write` | Gruppen und deren Mitgliedschaft ansehen / bearbeiten |
| `donations:read` / `donations:write` | Spenden ansehen / erfassen |
| `attendance:read` / `attendance:write` | Anwesenheit, Sitzungen, Check-ins ansehen / erfassen |
| `forms:write` | Formulare verwalten (Lesezugriff ist im Schreibzugriff impliziert) |
| `content:read` / `content:write` | Website-Inhalte, Registrierungen, Streaming ansehen / bearbeiten |
| `messaging:read` / `messaging:write` | Nachrichten lesen; Schreiben erlaubt auch das Senden von SMS |
| `roles:read` / `roles:write` | Rollendefinitionen ansehen / bearbeiten |
| `settings:read` / `settings:write` | Kircheneinstellungen ansehen / bearbeiten (**erforderlich**, um Webhooks programmatisch zu registrieren) |
| `offline_access` | Erlaubt langlebige Refresh Token (nur OAuth-Flows — hat keine Wirkung auf API-Schlüssel) |

`write`-Scopes schließen den passenden `read`-Scope implizit ein. Server- und Domain-Admin-Berechtigungen werden absichtlich nicht als Scopes verfügbar gemacht — ein gescoptes Credential kann sich niemals zur Standortverwaltung eskalieren.

:::tip
Wenn Sie den Schlüssel verwenden, um Webhooks zu registrieren (z. B. für eine Zapier- oder Make-Integration), benötigt der Schlüssel `settings:write`. Ein Schlüssel mit nur `people:read` schlägt bei `POST /membership/webhooks` still mit 403 fehl.
:::

## Einen Schlüssel verwenden

Wie jedes Bearer-Token — jeder authentifizierte Endpunkt akzeptiert API-Schlüssel genau so wie JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Eine Anfrage, deren Schlüssel unzureichende Scopes hat, antwortet mit **403 Forbidden** in derselben Form, die jeder Fehler bei verweigerter Berechtigung verwendet.

## Schlüssel über die API verwalten

Alle Endpunkte liegen unter dem Pfad `/membership/apiKeys` des Membership-Moduls und erfordern ein JWT (kein API-Schlüssel) eines Kirchen-Admins mit **Einstellungen bearbeiten**.

| Methode & Pfad | Zweck |
|---|---|
| `GET /membership/apiKeys` | Listet die Schlüssel der Kirche auf (kein Geheimnis — nur `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste aller verfügbaren Scope-Namen — für eine UI zur Schlüsselerstellung |
| `POST /membership/apiKeys` | Erstellt einen neuen Schlüssel. Body: `{ "name": "...", "scopes": ["people:read"] }`. Die Antwort enthält den rohen `cak_…`-Schlüssel **einmalig**. |
| `DELETE /membership/apiKeys/:id` | Widerruft einen Schlüssel — wirkt sich auf die nächste Anfrage aus |

Ein widerrufener Schlüssel ist sofort weg — es gibt keine Übergangsfrist.

## Best Practices

- **Ein Schlüssel pro Integration.** Wenn etwas kompromittiert wird, widerrufen Sie einen einzelnen Schlüssel, ohne die anderen zu beeinträchtigen.
- **Erstellen Sie die engsten Scopes, die funktionieren.** Ein Google-Sheets-Export benötigt nur `people:read`, nicht `settings:write`.
- **Binden Sie den Schlüssel an ein Dienstkonto, nicht an ein echtes Teammitglied.** Wenn ein Teammitglied ausscheidet, endet dessen B1-Zugriff — und damit auch alle unter seiner Identität erstellten Schlüssel.
- **Speichern Sie Schlüssel in einem Secret-Manager** (den Umgebungsvariablen Ihres Hosting-Anbieters, AWS Secrets Manager usw.) — niemals in der Versionskontrolle.
- **Rotieren Sie Schlüssel**, wenn Sie eine Offenlegung vermuten: Erstellen Sie einen neuen Schlüssel, aktualisieren Sie die Integration und löschen Sie dann den alten.

## Unterschied zu OAuth

API-Schlüssel sind angemessen, wenn **Ihre Kirche die einzige ist, die die Integration nutzt**. Für einen Connector, der mit expliziter Zustimmung jeder einzelnen Kirche auf viele Kirchen zugreifen muss — wie eine SaaS-App, die in der gesamten B1-Community geteilt wird — verwenden Sie stattdessen [OAuth und Connected Apps](./connected-apps).

| | API-Schlüssel | OAuth |
|---|---|---|
| Wer installiert es | Ein Kirchen-Admin | Jeder Kirchen-Admin autorisiert die App |
| Auth-Header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Token-Lebensdauer | Bis widerrufen | Zugriff ≈ 7 Tage, Refresh ≈ 90 Tage |
| Am besten für | Interne Skripte, Zapier-/Make-/Sheets-Connectors | Multi-Tenant-Drittanbieter-Apps |
