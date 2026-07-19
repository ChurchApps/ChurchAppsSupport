---
title: "Integrations- und Erweiterungsoberfläche"
---

# Integrations- und Erweiterungsoberfläche

<div class="article-intro">

Alles, worin sich ein Drittanbieter einklinken kann, läuft über eine API und ein Autorisierungsmodell. Diese Seite ist die Landkarte: Sie benennt jede Integrationsoberfläche, zeigt, wie sie zusammenhängen, und verlinkt auf die ausführliche Referenz für jede einzelne. Wenn Sie gegen B1 entwickeln, beginnen Sie hier, um die richtige Tür zu wählen, und folgen Sie dann dem Link zu der Seite, die sie im Detail dokumentiert.

</div>

## Die Oberflächen auf einen Blick

Es gibt sechs Wege hinein oder hinaus, und sie alle teilen sich dieselbe Auth-Schicht:

- **[REST API](../api/api-keys)** – die gesamte Produktoberfläche, aufrufbar mit einem Bearer-Token aus jeder Sprache heraus.
- **[API-Schlüssel](../api/api-keys)** – der einfachste Berechtigungsnachweis: ein `cak_…`-Token, gebunden an eine Person in einer Gemeinde.
- **[OAuth 2.0 & verbundene Apps](../api/connected-apps)** – Zustimmung je Gemeinde für Multi-Tenant-Apps; stellt denselben JWT aus, den auch ein Benutzer erhält.
- **[Webhooks](../api/webhooks)** – signierte, dauerhaft zugestellte ausgehende Ereignisse.
- **[MCP-Server](../api/mcp)** – ein KI-orientierter Wrapper über die REST-API unter `/mcp`.
- **[Content-Provider](../freeplay-content-provider)** – der eingehende Pfad für externe Medienbibliotheken in FreePlay und die B1-Apps.

Alles außer Content-Providern wird von einer einzigen monolithischen API bedient (dem [Api](https://github.com/ChurchApps/Api)-Repository), deren Module unter stabilen Basispfaden eingehängt sind — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` und `/mcp`.

## Wie alles zusammenpasst

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

Drei Pfeile erzählen die ganze Geschichte: Ein Drittanbieter **ruft herein** mit einem Bearer-Token (API-Schlüssel oder OAuth-JWT, auch über `/mcp`); die API **ruft zurück hinaus** über signierte Webhooks; und Content-Provider sind der eine **eingehende Content**-Pfad, bei dem B1 selbst der OAuth-*Client* ist, der Medien von einer externen Quelle abruft.

## Das gemeinsame Auth-Modell

Jeder Berechtigungsnachweis – der Login-JWT eines Benutzers, ein OAuth-Access-Token oder ein API-Schlüssel – wird zum **gleichen `Principal`** aufgelöst und auf dieselbe Weise geprüft. Es gibt keinen separaten „Integrations-Auth"-Pfad; ein mit Scopes versehener Berechtigungsnachweis ist schlicht nicht von einem Benutzer mit geringeren Rechten zu unterscheiden.

### JWT-Struktur

B1-Access-Tokens sind HS256-JWTs, die in `Api/src/modules/membership/auth/AuthenticatedUser.ts` erzeugt werden. Der Claim-Satz:

| Claim | Bedeutung |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Die Person hinter dem Token |
| `churchId` | Die einzelne Gemeinde, innerhalb derer dieses Token wirkt – der Anker für die gesamte Daten-Eingrenzung |
| `personId` | Der Personendatensatz innerhalb dieser Gemeinde |
| `permissions` | Flaches Array von RBAC-Berechtigungsstrings (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppenmitgliedschaft / -leitung, für gruppenbezogene Prüfungen |
| `membershipStatus` | Gast vs. Mitglied, für die Steuerung des Self-Service |

Ein OAuth-Access-Token hat byteweise dieselbe Form wie ein Login-JWT – der einzige Unterschied besteht darin, dass sein `permissions`-Array vor dem Signieren **durch die gewährten Scopes gefiltert** wurde (`getCombinedApiJwt(...)`).

### Eingrenzung je Gemeinde

`churchId` ist ein Token-Claim, kein Anfrageparameter, sodass ein Berechtigungsnachweis niemals über Gemeindegrenzen hinweg zugreifen kann. Jede Repository-Abfrage filtert nach der `churchId` des Aufrufers; ein API-Schlüssel oder OAuth-Token wird bei der Erstellung an genau eine Gemeinde gebunden.

### Rollenbasierte Berechtigungen an der Grenze

Controller sichern Aktionen mit `au.checkAccess(contentType, action)` gegen das `permissions`-Array des Tokens ab. Scopes sind ein **Filter, niemals eine Gewährung** (`Api/src/shared/auth/Scopes.ts`): Der `SCOPE_CATALOG` bildet jeden Scope (z. B. `people:read`, `donations:write`) auf die RBAC-Paare ab, die er erlaubt, und `filterPermissionsByScopes()` bildet bei jeder Auflösung die Schnittmenge damit und den *aktuellen* Berechtigungen der Person. Folgen:

- Das Widerrufen einer Berechtigung in B1Admin kappt den Zugriff des Berechtigungsnachweises bei der nächsten Anfrage – Tokens driften niemals von der Rolle ab.
- Ein Scope kann Berechtigungen immer nur *entfernen*, sodass ein mit Scopes versehener Berechtigungsnachweis niemals zur Server-/Domain-Administration aufsteigen kann (diese Berechtigungen sind bewusst keinem Scope zugeordnet).
- API-Schlüssel tragen ein `cak_`-Präfix; `CustomAuthProvider.getUser()` verzweigt danach, hasht das Geheimnis und löst die aktuellen RBAC-Rechte der zugehörigen Person bei jedem Aufruf neu auf.

Den vollständigen Katalog finden Sie unter [API-Schlüssel → Scopes](../api/api-keys#scopes).

## Oberflächen-Referenz

### REST API

Die vollständige Produktoberfläche. Jeder authentifizierte Endpunkt akzeptiert entweder einen JWT oder einen `cak_…`-API-Schlüssel im `Authorization: Bearer`-Header – es gibt keine separate, nur für Schlüssel oder nur für OAuth vorgesehene Routentabelle. Module und ihre Basispfade befinden sich unter `Api/src/modules/*`.

### API-Schlüssel

Ein persönliches `cak_<prefix>.<secret>`-Zugriffstoken, erstellt in **B1Admin → Einstellungen → Entwickler → API-Schlüssel**. Es wird nur ein SHA-256-Hash gespeichert; der Klartextschlüssel wird einmalig angezeigt. Verwaltet unter `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Am besten geeignet für eigene Skripte einer einzelnen Gemeinde und für Connectoren wie Zapier, Make und Google Sheets. → **[API-Schlüssel](../api/api-keys)**

### OAuth 2.0 & verbundene Apps

Für Multi-Tenant-Apps, bei denen jede Gemeinde zustimmen muss. Implementiert in `Api/src/modules/membership/controllers/OAuthController.ts` unter `/membership/oauth`. Der Server unterstützt drei Grant-Typen:

- **Authorization Code** – `POST /oauth/authorize` (authentifiziert) liefert einen kurzlebigen Code zurück; `POST /oauth/token` mit `grant_type=authorization_code` tauscht ihn gegen einen Access-JWT (≈ 7 Tage) sowie ein Refresh-Token (≈ 90 Tage) ein.
- **Device Code** (RFC 8628) – `POST /oauth/device/authorize` stellt einen `user_code` aus; der Benutzer bestätigt ihn in B1Admin (`/oauth/device/approve`); das Gerät fragt `/oauth/token` mit dem Device-Code-Grant ab. Für Fernseher, Kioske und CLIs ohne Browser.
- **Refresh Token** – `grant_type=refresh_token` erzeugt ein neues Access-Token; öffentliche (geheimnislose) Clients können das Secret weglassen.

Eine **verbundene App** ist die für Gemeinde-Administratoren sichtbare Ansicht eines gewährten Tokens, aufgelistet und widerrufbar unter `/membership/oauth/connections`. Der Controller stellt außerdem eine OAuth-**Relay-Session**-Brücke (`/oauth/relay/*`) bereit, die es einem browserlosen Gerät ermöglicht, eine Anmeldung bei einem *externen* Provider abzuschließen. → **[Verbundene Apps & OAuth](../api/connected-apps)**

### Webhooks

Die einzige ausgehende Oberfläche. Eine Gemeinde abonniert einen öffentlichen HTTPS-Endpunkt für Ereignisse; wenn eine passende Änderung eintritt, reichert `WebhookDispatcher.emit(churchId, event, payload)` reine ID-Payloads mit Anzeigenamen an (`personName`, `groupName`, `formName` – Lookups laufen erst, sobald ein Abonnement passt), erfasst eine Zustellung, und ein Hintergrund-Worker sendet einen signierten JSON-Umschlag per POST, mit Wiederholung/Backoff und erneuter Zustellung. Engine unter `Api/src/shared/webhooks/`, CRUD je Gemeinde unter `/membership/webhooks` (`WebhookController.ts`). Ein `connectorType`-Feld formt den Body für Slack / Discord um. → **[Webhooks](../api/webhooks)**

### MCP-Server

Ein KI-orientierter Wrapper unter `/mcp` (`Api/src/modules/mcp/`). Drei generische Tools – `list_endpoints`, `describe_endpoint`, `api_call` – legen die gesamte REST-Oberfläche dynamisch für jeden MCP-Client offen. Die Auth erfolgt über denselben Bearer-Token wie überall sonst, und `api_call` tritt in-process erneut in den Express-Stack ein, sodass jede Berechtigungs- und Gemeinde-Eingrenzungsregel weiterhin gilt. → **[MCP-Server](../api/mcp)**

### Content-Provider

Der eingehende Content-Pfad, im separaten Paket `Packages/content-providers` (`@churchapps/content-providers`) statt in der API. Jeder Provider implementiert die `IProvider`-Schnittstelle (`src/interfaces.ts`) – `browse`, `getPlaylist`, `getInstructions`, plus Auth-Hooks – und registriert sich selbst in einer `Map`-Registry (`src/providers/registry.ts`). Hier ist **B1 der OAuth-Client**: Ein Provider deklariert einen `AuthType` von `none`, `oauth_pkce`, `device_flow` oder `form_login`, und die gemeinsamen Hilfsfunktionen (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) führen clientseitig den PKCE-/Device-Flow gegen die externe Quelle aus. Heute sind elf Provider im Einsatz – darunter Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church und B1.church –, die FreePlay und die B1-Apps versorgen. → **[FreePlay Content-Provider](../freeplay-content-provider)**

## Zusammenfassung

| Oberfläche | Auth-Mechanismus | Richtung | Wo implementiert | Referenz |
|---|---|---|---|---|
| REST API | `Bearer`-JWT oder `cak_…`-Schlüssel | Eingehend | `Api/src/modules/*` | [API-Schlüssel](../api/api-keys) |
| API-Schlüssel | SHA-256-gehashtes `cak_`-Token | Berechtigungsnachweis | `Api/.../membership/controllers/ApiKeyController.ts` | [API-Schlüssel](../api/api-keys) |
| OAuth 2.0 / verbundene Apps | Auth Code · Device · Refresh → JWT | Eingehend | `Api/.../membership/controllers/OAuthController.ts` | [Verbundene Apps](../api/connected-apps) |
| Webhooks | Geheimnis je Webhook, HMAC-SHA256-Signatur | Ausgehend | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-Server | `Bearer`-JWT oder `cak_…`-Schlüssel | Eingehend (KI) | `Api/src/modules/mcp/` | [MCP-Server](../api/mcp) |
| Content-Provider | Je Provider: keine / OAuth PKCE / Device / Formular | Eingehender Content | `Packages/content-providers/` | [Content-Provider](../freeplay-content-provider) |

## Vorgefertigte Connectoren

Anstatt dass jeder von Grund auf neu baut, liefert ChurchApps Connectoren auf Basis der oben genannten Oberflächen:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** – ein Webhook-`connectorType` formt den Standard-Umschlag in eine Chat-Nachricht um; vollständig in B1Admin konfiguriert, kein Konto bei Dritten nötig.
- **[Zapier](/docs/b1-admin/integrations/zapier)** und **[Make](/docs/b1-admin/integrations/make)** – lösen bei Webhook-Ereignissen aus und agieren über die REST-API; sie registrieren ihren eigenen Webhook, sobald ein Zap/Szenario aktiviert wird (benötigt einen Schlüssel mit `settings:write`). Der Quellcode der Zapier-App liegt im `Integrations`-Repo unter `zapier/` (Zapier-CLI, bereitgestellt mit `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** – ein per API-Schlüssel authentifiziertes Add-on, das Personen / Spenden / Gruppen / Anwesenheit auf Abruf exportiert.
- **[Claude](/docs/b1-admin/integrations/claude)** und **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** – MCP-Clients, die auf `/mcp` zeigen.

Für eigenen Code kapselt **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) das alles: ein typisierter REST-Client, ein OAuth-Client (Auth-Code / Refresh / Device-Flow) und ein HMAC-Webhook-Verifizierer mit Express-Middleware.

## Verwandte Seiten

- [API-Schlüssel](../api/api-keys) – der einfachste Berechtigungsnachweis und der Scope-Katalog
- [Verbundene Apps & OAuth](../api/connected-apps) – Zustimmungsabläufe für Multi-Tenant-Umgebungen
- [Webhooks](../api/webhooks) – das ausgehende Ereignissystem
- [MCP-Server](../api/mcp) – der KI-Integrations-Wrapper
- [FreePlay Content-Provider](../freeplay-content-provider) – wie man eine eingehende Content-Quelle wird
- [Integrationen (Endbenutzer)](/docs/b1-admin/integrations/) – Einrichtungsanleitungen für vorgefertigte Connectoren
