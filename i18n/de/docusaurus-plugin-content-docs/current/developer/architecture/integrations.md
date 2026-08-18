---
title: "Integrations- und Erweiterungsfläche"
---

# Integrations- und Erweiterungsfläche

<div class="article-intro">

Alles, was ein Drittanbieter einstöpseln kann, läuft durch eine API und ein Autorisierungsmodell. Diese Seite ist die Karte: Sie benennt jede Integrationsfläche, zeigt, wie sie sich verbinden, und verlinkt auf die detaillierte Referenz für jede. Wenn Sie gegen B1 aufbauen, beginnen Sie hier, um die richtige Tür zu wählen, dann folgen Sie dem Link zu der Seite, die sie ausführlich dokumentiert.

</div>

## Die Flächen auf einen Blick

Es gibt sechs Wege rein und raus, und sie alle teilen die gleiche Auth-Schicht:

- **[REST API](../api/api-keys)** – die ganze Produktfläche, aufrufbar mit einem Bearer-Token aus jeder Sprache.
- **[API-Schlüssel](../api/api-keys)** – die einfachste Anmeldedaten: ein `cak_…`-Token gebunden an eine Person in einer Kirche.
- **[OAuth 2.0 & Verbundene Apps](../api/connected-apps)** – Pro-Kirchen-Zustimmung für Multi-Tenant-Apps; gibt denselben JWT aus, den ein Benutzer erhält.
- **[Webhooks](../api/webhooks)** – signierte, dauerhaft-versendete ausgehende Ereignisse.
- **[MCP-Server](../api/mcp)** – ein KI-gerichteter Wrapper über die REST-API unter `/mcp`.
- **[Content-Provider](../freeplay-content-provider)** – der Eingangsweg für externe Medienbibliotheken in FreePlay und die B1-Apps.

Alles außer Content-Providern wird von einer einzigen monolithischen API bedient (das [Api](https://github.com/ChurchApps/Api)-Repository), dessen Module unter stabilen Basispfaden montieren – `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` und `/mcp`.

## Wie es zusammenpasst

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Drittanbieter-App   │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · Server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ Schlüssel ─┐             │  │
   │  · CLI / Scripts     │                          │  │   OAuth JWT ┴▶ Prinzipal        │  │
   │  · KI-Client (MCP)   │ ─── POST /mcp ──────────▶ │  │   Scopes Filter → Berechtigungen│  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API-Module: /membership /giving      │
             │        signiertes JSON POST            │  /attendance /content /messaging …    │
             │   (Person / Spende / Gruppe / …)      │                   │                    │
             └──────────── Webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher    │
                     (dauerhaft, HMAC-SHA256 signiert) └───────────────────────────────────────┘

   Externe Inhaltsquellen (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / Gerätefluss / keine   ──  B1 ist der OAuth *Client* hier  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1-Apps        (Eingangsinhalts-Weg)
```

Drei Pfeile erzählen die ganze Geschichte: ein Drittanbieter **ruft rein** mit einem Bearer-Token (API-Schlüssel oder OAuth JWT, einschließlich über `/mcp`); die API **ruft zurück raus** durch signierte Webhooks; und Content-Provider sind der einzige **Eingangsinhalts-**Weg, wo B1 selbst der OAuth *Client* ist, der Medien aus einer externen Quelle zieht.

## Das gemeinsame Auth-Modell

Jede Anmeldedaten – ein Benutzer-Login-JWT, ein OAuth-Zugangstoken oder ein API-Schlüssel – wird aufgelöst zu dem gleichen `Principal` und wird auf die gleiche Weise überprüft. Es gibt keinen separaten "Integrations-Auth"-Weg; eine begrenzte Anmeldedaten ist einfach nicht zu unterscheiden von einem Benutzer mit niedrigeren Berechtigungen.

### JWT-Struktur

B1-Zugangstoken sind HS256 JWTs, die in `Api/src/modules/membership/auth/AuthenticatedUser.ts` geprägt werden. Das Anspruchsset:

| Anspruch | Bedeutung |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Die Person hinter dem Token |
| `churchId` | Die einzelne Kirche, in der dieser Token wirkt – der Anker für alle Datenbescoping |
| `personId` | Der Personeneintrag in dieser Kirche |
| `permissions` | Flaches Array von RBAC-Berechtigung-Strings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppenmitgliedschaft / Leitung, für Gruppen-beschopingsabhängige Checks |
| `membershipStatus` | Gast vs. Mitglied, für Selbstbedienungs-Gating |

Ein OAuth-Zugangstoken ist Byte-für-Byte die gleiche Form wie ein Login-JWT – der einzige Unterschied ist, dass sein `permissions`-Array durch die gewährten Scopes **vor dem Signieren gefiltert wurde** (`getCombinedApiJwt(...)`).

### Pro-Kirchen-Beschoping

`churchId` ist ein Token-Anspruch, nicht ein Request-Parameter, sodass eine Anmeldedaten nie über Kirchen hinweg erreichen kann. Jede Repository-Abfrage filtert auf `churchId` des Aufrufers; ein API-Schlüssel oder OAuth-Token ist bei der Prägung genau an eine Kirche gebunden.

### Rollenbasierte Berechtigungen an der Grenze

Controller-Gating-Aktionen mit `au.checkAccess(contentType, action)` gegen das `permissions`-Array des Tokens. Scopes sind ein **Filter, nie ein Zuschuss** (`Api/src/shared/auth/Scopes.ts`): das `SCOPE_CATALOG` bildet jeden Scope (z. B. `people:read`, `donations:write`) auf die RBAC-Paare ab, die es zulässt, und `filterPermissionsByScopes()` schneidet das mit den *aktuellen* Berechtigungen der Person bei jeder Auflösung. Konsequenzen:

- Das Widerrufen einer Berechtigung in B1Admin schneidet den Zugriff der Anmeldedaten bei der nächsten Anfrage – Token weichen nie von der Rolle ab.
- Ein Scope kann nur Berechtigungen *entfernen*, sodass eine begrenzte Anmeldedaten niemals zu Server- / Domain-Administration erhöht werden kann (diese Berechtigungen sind absichtlich keinem Scope zugeordnet).
- API-Schlüssel tragen ein `cak_`-Präfix; `CustomAuthProvider.getUser()` verzweigt darauf, heißt das Geheimnis und löst die Live-RBAC der besitzenden Person bei jedem Aufruf erneut auf.

Siehe [API-Schlüssel → Scopes](../api/api-keys#scopes) für den vollständigen Katalog.

## Flächenreferenz

### REST-API

Die vollständige Produktfläche. Jeder authentifizierte Endpunkt akzeptiert entweder einen JWT oder einen `cak_…`-API-Schlüssel in der `Authorization: Bearer`-Kopfzeile – es gibt keine separate schlüsselbasierte oder OAuth-basierte Routentabelle. Module und ihre Basispfade leben unter `Api/src/modules/*`.

### API-Schlüssel

Ein `cak_<prefix>.<secret>`-Token für persönlichen Zugriff, erstellt in **B1Admin → Einstellungen → Entwickler → API-Schlüssel**. Nur ein SHA-256-Hash wird gespeichert; der Rohschlüssel wird einmal angezeigt. Verwaltet unter `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Beste für eigene Scripts einer einzigen Kirche und für Connectors wie Zapier, Make und Google Sheets. → **[API-Schlüssel](../api/api-keys)**

### OAuth 2.0 & Verbundene Apps

Für Multi-Tenant-Apps, die jede Kirche zustimmen müssen. Implementiert in `Api/src/modules/membership/controllers/OAuthController.ts` unter `/membership/oauth`. Der Server unterstützt drei Zuschüsse:

- **Autorisierungscode** – `POST /oauth/authorize` (authentifiziert) gibt einen kurzzeitigen Code zurück; `POST /oauth/token` mit `grant_type=authorization_code` tauscht ihn gegen einen Zugangs-JWT (≈ 7 Tage) plus einen Aktualisierungstoken (≈ 90 Tage).
- **Gerätecode** (RFC 8628) – `POST /oauth/device/authorize` gibt einen `user_code` aus; der Benutzer genehmigt ihn in B1Admin (`/oauth/device/approve`); das Gerät fragt `/oauth/token` mit der Gerätecodevergabe ab. Für Fernseher, Kiosks und CLIs ohne Browser.
- **Token aktualisieren** – `grant_type=refresh_token` prägt einen neuen Zugangstoken; öffentliche (geheime) Clients können das Geheimnis auslassen.

Eine **Verbundene App** ist die Kirchenadmin-Ansicht eines gewährten Tokens, aufgelistet und widerrufbar unter `/membership/oauth/connections`. Der Controller beherbergt auch eine OAuth-**Relaissitzungs**-Brücke (`/oauth/relay/*`), die einem gerätlosen Gerät ermöglicht, sich gegen einen *externen* Provider anzumelden. → **[Verbundene Apps & OAuth](../api/connected-apps)**

### Webhooks

Die einzige ausgehende Fläche. Eine Kirche abonniert einen öffentlichen HTTPS-Endpunkt zu Ereignissen; wenn eine Änderung auftritt, `WebhookDispatcher.emit(churchId, event, payload)` bereichert ID-einzigen Nutzlasten mit Anzeigenamen (`personName`, `groupName`, `formName` – Nachschlagungen laufen nur einmal pro Abonnement), zeichnet eine Lieferung auf, und ein Background-Worker POSTet eine signierte JSON-Umhüllung mit Wiederholung/Backoff und Wiederversendung. Engine unter `Api/src/shared/webhooks/`, Pro-Kirchen-CRUD unter `/membership/webhooks` (`WebhookController.ts`). Ein `connectorType`-Feld formt den Text für Slack / Discord um; der `mailchimp`-Connector geht weiter und besitzt den gesamten HTTP-Austausch (pro-Ereignis Methode/URL/Auth gegen Mailchimps API, Anmeldedaten AES-verschlüsselt in `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP-Server

Ein KI-gerichteter Wrapper unter `/mcp` (`Api/src/modules/mcp/`). Drei allgemeine Tools – `list_endpoints`, `describe_endpoint`, `api_call` – stellen die ganze REST-Fläche dynamisch jedem MCP-Client aus. Auth ist das gleiche Bearer-Token wie alles andere, und `api_call` tritt im In-Prozess in den Express-Stack erneut ein, sodass jede Berechtigung und Kirchenbescoping-Regel immer noch gilt. → **[MCP-Server](../api/mcp)**

### Content-Provider

Der Eingangsinhalts-Weg, im separaten Paket `Packages/content-providers` (`@churchapps/content-providers`) statt der API. Jeder Provider implementiert die `IProvider`-Schnittstelle (`src/interfaces.ts`) – `browse`, `getPlaylist`, `getInstructions`, plus Auth-Hooks – und registriert sich selbst in ein `Map`-Register (`src/providers/registry.ts`). Hier **ist B1 der OAuth-Client**: ein Provider deklariert einen `AuthType` von `none`, `oauth_pkce`, `device_flow` oder `form_login`, und die gemeinsamen Helfer (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) führen den Client-seitigen PKCE / Gerätefluss gegen die externe Quelle aus. Elf Provider versenden heute – darunter Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church und B1.church – Fütterung FreePlay und die B1-Apps. → **[FreePlay Content-Provider](../freeplay-content-provider)**

## Zusammenfassung

| Fläche | Auth-Mechanismus | Richtung | Wo implementiert | Referenz |
|---|---|---|---|---|
| REST-API | `Bearer` JWT oder `cak_…`-Schlüssel | Eingang | `Api/src/modules/*` | [API-Schlüssel](../api/api-keys) |
| API-Schlüssel | SHA-256-gehashtes `cak_`-Token | Anmeldedaten | `Api/.../membership/controllers/ApiKeyController.ts` | [API-Schlüssel](../api/api-keys) |
| OAuth 2.0 / Verbundene Apps | Auth-Code · Gerät · Aktualisierung → JWT | Eingang | `Api/.../membership/controllers/OAuthController.ts` | [Verbundene Apps](../api/connected-apps) |
| Webhooks | Pro-Hook-Geheimnis, HMAC-SHA256-Signatur | Ausgang | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-Server | `Bearer` JWT oder `cak_…`-Schlüssel | Eingang (KI) | `Api/src/modules/mcp/` | [MCP-Server](../api/mcp) |
| Content-Provider | Pro-Provider: keine / OAuth PKCE / Gerät / Formular | Eingangsinhalte | `Packages/content-providers/` | [Content-Provider](../freeplay-content-provider) |

## Vorgefertigte Connectors

Statt dass alle von vorne anfangen, versendet ChurchApps Connectors auf den oben genannten Flächen:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** – ein Webhook `connectorType` formt die Standard-Umhüllung in eine Chat-Nachricht um; vollständig in B1Admin konfiguriert, kein Drittanbieter-Konto.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** – ein `mailchimp`-connectorType, der Personen in eine Mailchimp-Audience synchronisiert und Gruppen-/Listenmitgliedschaft auf Tags abbildet (`Api/src/shared/webhooks/MailchimpConnector.ts`). Anders als die Chat-Connectors gibt es seine eigenen authentifizierten Anfragen pro Ereignis (Upsert/Archiv/Tag) statt zu einer Kirchen-bereitgestellten URL zu POSTen; der API-Schlüssel und die Audience-ID leben verschlüsselt in `webhooks.connectorConfig`. Unidirektional, nur Standard-Mergefelder.
- **[Zapier](/docs/b1-admin/integrations/zapier)** und **[Make](/docs/b1-admin/integrations/make)** – Trigger auf Webhook-Ereignissen und Handlung über die REST-API; sie registrieren ihren eigenen Webhook, wenn ein Zap/Szenario aktiviert wird (benötigt einen Schlüssel mit `settings:write`). Die Zapier-App-Quelle lebt im `Integrations`-Repo unter `zapier/` (Zapier CLI, bereitgestellt mit `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** – ein API-Schlüssel-authentifiziertes Add-on, das Personen / Spenden / Gruppen / Anwesenheit auf Anfrage exportiert.
- **[Claude](/docs/b1-admin/integrations/claude)** und **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** – MCP-Clients, die auf `/mcp` zeigen.

Für Ihren eigenen Code wraps **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) alles: ein typisierter REST-Client, ein OAuth-Client (Auth-Code / Aktualisierung / Gerätefluss) und ein HMAC-Webhook-Verifizierer mit Express-Middleware.

## Verwandte Seiten

- [API-Schlüssel](../api/api-keys) – die einfachste Anmeldedaten und der Scopes-Katalog
- [Verbundene Apps & OAuth](../api/connected-apps) – Multi-Tenant-Zustimmungsflüsse
- [Webhooks](../api/webhooks) – das ausgehende Ereignissystem
- [MCP-Server](../api/mcp) – der KI-Integrations-Wrapper
- [FreePlay Content-Provider](../freeplay-content-provider) – eine eingehende Inhaltsquelle werden
- [Integrationen (End-Benutzer)](/docs/b1-admin/integrations/) – vorgefertigte Connector-Konfigurationsanleitungen
