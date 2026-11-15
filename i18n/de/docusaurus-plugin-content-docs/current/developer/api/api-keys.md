---
title: "API-Schlüssel"
description: "Erstelle, begrenze und widerrufe B1-API-Schlüssel in B1 Admin für Server-Skripte sowie Zapier-, Make- oder Google-Sheets-Konnektoren, ohne einen vollständigen OAuth-Ablauf."
---

# API-Schlüssel

<div class="article-intro">

API-Schlüssel (persönliche Zugriffstoken) sind der einfachste Weg, sich von einem serverseitigen Skript, einem Drittanbieter-Konnektor (Zapier, Make, Google Sheets) oder überall dort gegen die B1-API zu authentifizieren, wo ein vollständiger OAuth-Ablauf übertrieben wäre. Ein Schlüssel ist an eine bestimmte Person in einer bestimmten Gemeinde gebunden und erbt deren Berechtigungen, eingeschränkt durch eine optionale Menge von Scopes.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Ein Gemeindeadministrator mit der Berechtigung **Einstellungen bearbeiten** erstellt und verwaltet Schlüssel
- Der vollständige Schlüssel wird bei der Erstellung **einmalig** angezeigt -- speichere ihn sofort sicher
- Alle API-Anfragen müssen **HTTPS** verwenden

</div>

## Schlüsselformat {#key-format}

Ein B1-API-Schlüssel sieht so aus:

```
cak_<prefix>.<secret>
```

- `cak_` -- feste Kennung (das API-Schlüssel-Präfix, auf das die Authentifizierungsschicht prüft)
- `<prefix>` -- 8-stelliges öffentliches Suchsegment
- `<secret>` -- 48-stelliges Geheimnis; auf dem Server wird nur ein SHA-256-Hash gespeichert

Der vollständige Schlüssel wird dem Server im standardmäßigen Bearer-Header übergeben:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Die API-Authentifizierungsschicht leitet jedes Token, das mit `cak_` beginnt, an den API-Schlüssel-Pfad weiter, hasht das Geheimnis, sucht den Schlüssel anhand des Präfixes und ermittelt die aktuellen Berechtigungen der Person des Schlüssels. Das Entziehen einer Berechtigung in B1Admin wirkt daher bereits bei der nächsten Anfrage, und der Schlüssel gerät nie aus dem Gleichklang mit der Rolle.

## Einen Schlüssel erstellen (B1Admin) {#creating-a-key-b1admin}

1. Melde dich bei B1Admin als Benutzer mit der Berechtigung **Einstellungen bearbeiten** an.
2. Öffne **Einstellungen → Entwickler → API-Schlüssel**.
3. Klicke auf **Neuer API-Schlüssel**, vergib einen erkennbaren **Namen** (z. B. "Zapier -- Spendensynchronisation"), wähle mindestens einen **Scope**, den der Schlüssel haben soll, wähle optional ein Datum unter **Läuft ab** (leer lassen für einen Schlüssel, der nie abläuft), und klicke auf **Speichern**.
4. Der vollständige Schlüssel `cak_…` wird einmalig in einem Dialog angezeigt. Kopiere ihn in die Konfiguration deiner Integration, bevor du den Dialog schließt -- er kann später nicht mehr abgerufen werden. Du kannst jederzeit einen neuen Schlüssel erstellen.

## Scopes {#scopes}

Ein Scope **schränkt ein**, was ein Schlüssel tun kann -- er kann nie eine Berechtigung gewähren, die die zugrunde liegende Person nicht besitzt. Ohne Scopes hat der Schlüssel die vollständige Berechtigungsmenge der Person; B1Admin verlangt immer mindestens einen Scope, sodass ein Schlüssel ohne Scope nur über die API erstellt werden kann.

| Scope | Erlaubt |
|---|---|
| `people:read` / `people:write` | Personen, Haushalte und Gruppenmitglieder ansehen / bearbeiten |
| `groups:read` / `groups:write` | Gruppen und ihre Mitgliedschaft ansehen / bearbeiten |
| `donations:read` / `donations:write` | Spenden ansehen / erfassen |
| `attendance:read` / `attendance:write` | Anwesenheit, Sitzungen und Check-ins ansehen / erfassen |
| `forms:write` | Formulare verwalten (Leserechte sind im Schreibrecht enthalten) |
| `content:read` / `content:write` | Website-Inhalte, Anmeldungen und Streaming ansehen / bearbeiten |
| `messaging:read` / `messaging:write` | Nachrichten lesen; Schreibrecht erlaubt außerdem das Senden von SMS |
| `roles:read` / `roles:write` | Rollendefinitionen ansehen / bearbeiten |
| `settings:read` / `settings:write` | Gemeindeeinstellungen ansehen / bearbeiten (**erforderlich**, um Webhooks programmatisch zu registrieren) |
| `workflows:read` / `workflows:write` | Workflows und Aufgaben ansehen / Workflows ausführen und bearbeiten. Das Ausführen eines Workflows kann E-Mails und SMS senden, Webhooks auslösen und Gruppenmitgliedschaften ändern |
| `offline_access` | Langlebige Refresh-Token erlauben (nur OAuth-Abläufe -- hat bei API-Schlüsseln keine Wirkung) |

`write`-Scopes umfassen implizit den entsprechenden `read`-Scope. Server- und Domain-Administratorrechte werden bewusst nicht als Scopes angeboten -- ein eingeschränktes Zugangsdatum kann sich nie zur Website-Administration erheben.

:::tip
Wenn du den Schlüssel zum Registrieren von Webhooks verwenden willst (z. B. für eine Zapier- oder Make-Integration), braucht der Schlüssel `settings:write`. Ein Schlüssel mit nur `people:read` scheitert bei `POST /membership/webhooks` stillschweigend mit 403.
:::

## Einen Schlüssel verwenden {#using-a-key}

Wie bei jedem Bearer-Token -- jeder authentifizierte Endpunkt akzeptiert API-Schlüssel genauso wie JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Antwortet eine Anfrage mit einem Schlüssel, dessen Scopes nicht ausreichen, mit **403 Forbidden** -- im selben Format wie jeder andere Berechtigungsfehler.

## Schlüssel über die API verwalten {#managing-keys-via-the-api}

Alle Endpunkte liegen unter dem Pfad `/membership/apiKeys` des Membership-Moduls und erfordern ein JWT (keinen API-Schlüssel) eines Gemeindeadministrators mit **Einstellungen bearbeiten**.

| Methode und Pfad | Zweck |
|---|---|
| `GET /membership/apiKeys` | Listet die Schlüssel der Gemeinde auf (ohne Geheimnis -- nur `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste aller verfügbaren Scope-Namen -- für eine Oberfläche zum Erstellen von Schlüsseln |
| `POST /membership/apiKeys` | Erstellt einen neuen Schlüssel. Body: `{ "name": "...", "scopes": ["people:read"] }`. Die Antwort enthält den vollständigen `cak_…`-Schlüssel **einmalig**. |
| `DELETE /membership/apiKeys/:id` | Widerruft einen Schlüssel -- wirkt bei der nächsten Anfrage |

Ein widerrufener Schlüssel ist sofort ungültig -- es gibt keine Schonfrist.

## Bewährte Vorgehensweisen {#best-practices}

- **Ein Schlüssel pro Integration.** Wird etwas kompromittiert, widerrufst du nur einen Schlüssel, ohne die anderen zu unterbrechen.
- **Die engsten Scopes wählen, die funktionieren.** Ein Google-Sheets-Export braucht nur `people:read`, nicht `settings:write`.
- **Den Schlüssel an ein Dienstkonto binden, nicht an einen echten Mitarbeiter.** Verlässt ein Mitarbeiter die Gemeinde, endet sein B1-Zugang -- und mit ihm alle Schlüssel, die unter seiner Identität erstellt wurden.
- **Schlüssel in einem Geheimnis-Manager speichern** (Umgebungsvariablen deines Hosting-Anbieters, AWS Secrets Manager usw.) -- niemals in der Quellcodeverwaltung.
- **Schlüssel rotieren**, wenn du einen Verlust vermutest: einen neuen Schlüssel erstellen, die Integration aktualisieren und dann den alten löschen.

## Unterschied zu OAuth {#how-it-differs-from-oauth}

API-Schlüssel eignen sich, wenn **deine Gemeinde die einzige ist, die die Integration nutzt**. Für einen Konnektor, der auf viele Gemeinden zugreifen muss, wobei jede Gemeinde ausdrücklich zustimmt -- etwa eine SaaS-App, die in der B1-Gemeinschaft geteilt wird -- verwende stattdessen [OAuth und verbundene Apps](./connected-apps.md).

| | API-Schlüssel | OAuth |
|---|---|---|
| Wer installiert es | Ein Gemeindeadministrator | Jeder Gemeindeadministrator autorisiert die App |
| Auth-Header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Lebensdauer des Tokens | Bis zum Widerruf | Zugriff ca. 7 Tage, Refresh ca. 90 Tage |
| Am besten für | Interne Skripte, Zapier-/Make-/Sheets-Konnektoren | Mandantenfähige Drittanbieter-Apps |
