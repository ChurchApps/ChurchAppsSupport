---
title: "Integrations- & Erweiterungsfläche"
---

# Integrations- & Erweiterungsfläche

<div class="article-intro">

Alles, was ein Drittanbieter anschließen kann, läuft über eine API und ein Autorisierungsmodell. Diese Seite ist die Landkarte: Sie benennt jede Integrationsfläche, zeigt, wie sie zusammenhängen, und verlinkt auf die detaillierte Referenz für jede einzelne. Wenn du gegen B1 entwickelst, fange hier an, um die richtige Tür zu wählen, und folge dann dem Link zur Seite, die sie im Detail dokumentiert.

</div>

## Die Flächen auf einen Blick

Es gibt sechs Wege hinein oder hinaus, und sie alle teilen sich dieselbe Auth-Schicht:

- **[REST-API](../api/api-keys)** — die gesamte Produktfläche, aufrufbar mit einem Bearer-Token aus jeder Sprache.
- **[API-Schlüssel](../api/api-keys)** — die einfachste Zugangsdaten-Art: ein `cak_…`-Token, gebunden an eine Person in einer Gemeinde.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — Zustimmung pro Gemeinde für mandantenfähige Apps; stellt dasselbe JWT aus, das ein Nutzer erhält.
- **[Webhooks](../api/webhooks)** — signierte, dauerhaft zugestellte ausgehende Ereignisse.
- **[MCP-Server](../api/mcp)** — ein KI-orientierter Wrapper über der REST-API unter `/mcp`.
- **[Content-Provider](../freeplay-content-provider)** — der eingehende Weg für externe Medienbibliotheken in FreePlay und die B1-Apps.

Alles außer den Content-Providern wird von einer einzigen monolithischen API bedient (das [Api](https://github.com/ChurchApps/Api)-Repository), deren Module unter stabilen Basispfaden eingehängt sind — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` und `/mcp`.

## Wie es zusammenpasst

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Drei Pfeile erzählen die ganze Geschichte: Ein Drittanbieter **ruft herein** mit einem Bearer-Token (API-Schlüssel oder OAuth-JWT, auch über `/mcp`); die API **ruft zurück hinaus** über signierte Webhooks; und Content-Provider sind der eine **eingehende Content**-Weg, bei dem B1 selbst der OAuth-*Client* ist, der Medien von einer externen Quelle abruft.

## Das gemeinsame Auth-Modell

Jede Zugangsdaten-Art — das Login-JWT eines Nutzers, ein OAuth-Access-Token oder ein API-Schlüssel — löst sich zum **gleichen `Principal`** auf und wird auf dieselbe Weise geprüft. Es gibt keinen separaten „Integrations-Auth"-Weg; eine mit Scopes versehene Zugangsdaten-Art ist von einem Nutzer mit geringeren Rechten schlicht nicht zu unterscheiden.

### JWT-Struktur

B1-Zugriffstoken sind HS256-JWTs, geprägt in `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Der Claim-Satz:

| Claim | Bedeutung |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Die Person hinter dem Token |
| `churchId` | Die einzige Gemeinde, innerhalb derer dieses Token agiert — der Anker für die gesamte Daten-Skopierung |
| `personId` | Der Personendatensatz innerhalb dieser Gemeinde |
| `permissions` | Flaches Array von RBAC-Berechtigungsstrings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppenmitgliedschaft / -leitung, für gruppenbezogene Prüfungen |
| `membershipStatus` | Gast vs. Mitglied, für Self-Service-Gating |

Ein OAuth-Access-Token hat byte-für-byte dieselbe Form wie ein Login-JWT — der einzige Unterschied ist, dass sein `permissions`-Array **vor dem Signieren durch die gewährten Scopes gefiltert wurde** (`getCombinedApiJwt(...)`).

### Skopierung pro Gemeinde

`churchId` ist ein Token-Claim, kein Anfrageparameter, sodass eine Zugangsdaten-Art niemals gemeindeübergreifend zugreifen kann. Jede Repository-Abfrage filtert nach der `churchId` des Aufrufers; ein API-Schlüssel oder OAuth-Token ist zum Zeitpunkt der Ausstellung an genau eine Gemeinde gebunden.

### Rollenbasierte Berechtigungen an der Grenze

Controller sichern Aktionen mit `au.checkAccess(contentType, action)` gegen das `permissions`-Array des Tokens ab. Scopes sind ein **Filter, niemals eine Gewährung** (`Api/src/shared/auth/Scopes.ts`): Der `SCOPE_CATALOG` bildet jeden Scope (z. B. `people:read`, `donations:write`) auf die RBAC-Paare ab, die er erlaubt, und `filterPermissionsByScopes()` schneidet das bei jeder Auflösung mit den *aktuellen* Berechtigungen der Person. Konsequenzen:

- Das Entziehen einer Berechtigung in B1Admin kappt den Zugriff der Zugangsdaten-Art bei der nächsten Anfrage — Token weichen niemals von der Rolle ab.
- Ein Scope kann Berechtigungen immer nur *entfernen*, sodass sich eine mit Scopes versehene Zugangsdaten-Art niemals zur Server-/Domänen-Administration hochstufen kann (diese Berechtigungen sind bewusst keinem Scope zugeordnet).
- API-Schlüssel tragen ein `cak_`-Präfix; `CustomAuthProvider.getUser()` verzweigt danach, hasht das Geheimnis und löst die aktuellen RBAC-Rechte der besitzenden Person bei jedem Aufruf neu auf.

Siehe [API-Schlüssel → Scopes](../api/api-keys#scopes) für den vollständigen Katalog.

## Flächenreferenz

### REST-API

Die vollständige Produktfläche. Jeder authentifizierte Endpunkt akzeptiert entweder ein JWT oder einen `cak_…`-API-Schlüssel im Header `Authorization: Bearer` — es gibt keine separate reine Schlüssel- oder reine OAuth-Routentabelle. Module und ihre Basispfade liegen unter `Api/src/modules/*`.

### API-Schlüssel

Ein persönliches `cak_<prefix>.<secret>`-Zugriffstoken, erstellt in **B1Admin → Einstellungen → Entwickler → API-Schlüssel**. Nur ein SHA-256-Hash wird gespeichert; der Rohschlüssel wird einmalig angezeigt. Verwaltet unter `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Am besten für die eigenen Skripte einer einzelnen Gemeinde und für Connectoren wie Zapier, Make und Google Sheets. → **[API-Schlüssel](../api/api-keys)**

### OAuth 2.0 & Connected Apps

Für mandantenfähige Apps, bei denen jede Gemeinde zustimmen muss. Implementiert in `Api/src/modules/membership/controllers/OAuthController.ts` unter `/membership/oauth`. Der Server unterstützt drei Grants:

- **Authorization Code** — `POST /oauth/authorize` (authentifiziert) liefert einen kurzlebigen Code; `POST /oauth/token` mit `grant_type=authorization_code` tauscht ihn gegen ein Access-JWT (≈ 7 Tage) plus ein Refresh-Token (≈ 90 Tage).
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` stellt einen `user_code` aus; der Nutzer genehmigt ihn in B1Admin (`/oauth/device/approve`); das Gerät pollt `/oauth/token` mit dem Device-Code-Grant. Für Fernseher, Kiosks und CLIs ohne Browser.
- **Refresh Token** — `grant_type=refresh_token` prägt ein neues Access-Token; öffentliche (geheimnislose) Clients können das Secret weglassen.

Eine **Connected App** ist die für Gemeinde-Admins sichtbare Ansicht eines gewährten Tokens, aufgelistet und widerrufbar unter `/membership/oauth/connections`. Der Controller hostet auch eine OAuth-**Relay-Session**-Brücke (`/oauth/relay/*`), die es einem browserlosen Gerät erlaubt, eine Anmeldung gegen einen *externen* Provider abzuschließen. → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

Die einzige ausgehende Fläche. Eine Gemeinde abonniert einen öffentlichen HTTPS-Endpunkt für Ereignisse; wenn eine passende Änderung eintritt, reichert `WebhookDispatcher.emit(churchId, event, payload)` reine ID-Payloads mit Anzeigenamen an (`personName`, `groupName`, `formName` — Lookups laufen erst, wenn ein Abo passt), zeichnet eine Zustellung auf, und ein Hintergrund-Worker sendet einen signierten JSON-Umschlag per POST mit Retry/Backoff und Neuzustellung. Engine unter `Api/src/shared/webhooks/`, CRUD pro Gemeinde unter `/membership/webhooks` (`WebhookController.ts`). Ein `connectorType`-Feld formt den Body für Slack/Discord um. → **[Webhooks](../api/webhooks)**

### MCP-Server

Ein KI-orientierter Wrapper unter `/mcp` (`Api/src/modules/mcp/`). Drei generische Tools — `list_endpoints`, `describe_endpoint`, `api_call` — legen die gesamte REST-Fläche dynamisch für jeden MCP-Client offen. Die Authentifizierung ist derselbe Bearer-Token wie überall sonst, und `api_call` betritt den Express-Stack in-process erneut, sodass jede Berechtigungs- und Gemeinde-Skopierungsregel weiterhin gilt. → **[MCP-Server](../api/mcp)**

### Content-Provider

Der eingehende Content-Weg, im separaten Paket `Packages/content-providers` (`@churchapps/content-providers`) statt in der API. Jeder Provider implementiert das `IProvider`-Interface (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus Auth-Hooks — und registriert sich selbst in einer `Map`-Registry (`src/providers/registry.ts`). Hier **ist B1 der OAuth-Client**: Ein Provider deklariert einen `AuthType` von `none`, `oauth_pkce`, `device_flow` oder `form_login`, und die gemeinsamen Helfer (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) führen die clientseitige PKCE-/Device-Flow-Logik gegen die externe Quelle aus. Elf Provider sind heute ausgeliefert — darunter Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church und B1.church — und speisen FreePlay und die B1-Apps. → **[FreePlay-Content-Provider](../freeplay-content-provider)**

## Zusammenfassung

| Fläche | Auth-Mechanismus | Richtung | Wo implementiert | Referenz |
|---|---|---|---|---|
| REST-API | `Bearer`-JWT oder `cak_…`-Schlüssel | Eingehend | `Api/src/modules/*` | [API-Schlüssel](../api/api-keys) |
| API-Schlüssel | SHA-256-gehashtes `cak_`-Token | Zugangsdaten | `Api/.../membership/controllers/ApiKeyController.ts` | [API-Schlüssel](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth-Code · Device · Refresh → JWT | Eingehend | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Geheimnis pro Hook, HMAC-SHA256-Signatur | Ausgehend | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-Server | `Bearer`-JWT oder `cak_…`-Schlüssel | Eingehend (KI) | `Api/src/modules/mcp/` | [MCP-Server](../api/mcp) |
| Content-Provider | Pro Provider: keine / OAuth PKCE / Device / Formular | Eingehender Content | `Packages/content-providers/` | [Content-Provider](../freeplay-content-provider) |

## Vorgefertigte Connectoren

Statt dass alle bei null anfangen, liefert ChurchApps Connectoren oberhalb der obigen Flächen aus:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — ein Webhook-`connectorType` formt den Standard-Umschlag in eine Chat-Nachricht um; vollständig in B1Admin konfiguriert, kein Drittanbieter-Konto.
- **[Zapier](/docs/b1-admin/integrations/zapier)** und **[Make](/docs/b1-admin/integrations/make)** — lösen bei Webhook-Ereignissen aus und agieren über die REST-API; sie registrieren ihren eigenen Webhook, wenn ein Zap/Szenario aktiviert wird (benötigt einen Schlüssel mit `settings:write`). Der Quellcode der Zapier-App liegt im `Integrations`-Repository unter `zapier/` (Zapier CLI, bereitgestellt mit `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — ein API-Schlüssel-authentifiziertes Add-on, das Personen/Spenden/Gruppen/Anwesenheit auf Anfrage exportiert.
- **[Claude](/docs/b1-admin/integrations/claude)** und **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP-Clients, die auf `/mcp` zeigen.

Für eigenen Code umhüllt **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) alles davon: ein typisierter REST-Client, ein OAuth-Client (Auth-Code/Refresh/Device-Flow) und ein HMAC-Webhook-Verifizierer mit Express-Middleware.

## Verwandte Seiten

- [API-Schlüssel](../api/api-keys) — die einfachste Zugangsdaten-Art und der Scope-Katalog
- [Connected Apps & OAuth](../api/connected-apps) — mandantenfähige Zustimmungsabläufe
- [Webhooks](../api/webhooks) — das ausgehende Ereignissystem
- [MCP-Server](../api/mcp) — der KI-Integrationswrapper
- [FreePlay-Content-Provider](../freeplay-content-provider) — selbst zur eingehenden Content-Quelle werden
- [Integrationen (Endnutzer)](/docs/b1-admin/integrations/) — Einrichtungsanleitungen für vorgefertigte Connectoren
