---
title: "Integrations- und Erweiterungsschnittstellen"
---

# Integrations- und Erweiterungsschnittstellen

<div class="article-intro">

Alles, womit sich ein Drittanbieter verbinden kann, läuft über eine API und ein gemeinsames Berechtigungsmodell. Diese Seite ist die Übersicht: Sie nennt jede Integrationsschnittstelle, zeigt, wie sie zusammenhängen, und verweist auf die ausführliche Referenz jeder Schnittstelle. Wenn Sie etwas für B1 entwickeln, beginnen Sie hier, wählen Sie die passende Schnittstelle und folgen Sie dem Link zur Seite, die sie ausführlich beschreibt.

</div>

## Die Schnittstellen auf einen Blick

Es gibt sechs Wege hinein oder hinaus, und alle teilen dieselbe Authentifizierungsschicht:

- **[REST-API](../api/api-keys)** – die gesamte Produktoberfläche, aufrufbar mit einem Bearer-Token aus jeder Sprache.
- **[API-Schlüssel](../api/api-keys)** – das einfachste Zugangsdatum: ein Token `cak_…`, gebunden an eine Person in einer Kirche.
- **[OAuth 2.0 & verbundene Apps](../api/connected-apps)** – Zustimmung je Kirche für mandantenfähige Apps; stellt dasselbe JWT aus, das ein Benutzer erhält.
- **[Webhooks](../api/webhooks)** – signierte, dauerhaft zugestellte ausgehende Ereignisse.
- **[MCP-Server](../api/mcp)** – eine KI-orientierte Hülle über der REST-API unter `/mcp`.
- **[Inhaltsanbieter](../freeplay-content-provider)** – der eingehende Weg für externe Medienbibliotheken in FreePlay und die B1-Apps.

Alles außer den Inhaltsanbietern wird von einer einzigen zentralen API bereitgestellt (das Repository [Api](https://github.com/ChurchApps/Api)), deren Module unter festen Basispfaden eingebunden sind – `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` und `/mcp`.

## So greift alles ineinander

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

Drei Pfeile erzählen die ganze Geschichte: Ein Drittanbieter **ruft** mit einem Bearer-Token (API-Schlüssel oder OAuth-JWT, auch über `/mcp`) **ein**; die API **ruft** über signierte Webhooks **zurück**; und die Inhaltsanbieter sind der einzige **eingehende Inhaltsweg**, bei dem B1 selbst als OAuth-*Client* Medien aus einer externen Quelle abruft.

## Das gemeinsame Authentifizierungsmodell

Jedes Zugangsdatum – das Anmelde-JWT eines Benutzers, ein OAuth-Zugriffstoken oder ein API-Schlüssel – wird zum **gleichen `Principal`** aufgelöst und gleich geprüft. Es gibt keinen eigenen Authentifizierungsweg für Integrationen; ein eingeschränktes Zugangsdatum ist schlicht von einem Benutzer mit geringeren Rechten nicht zu unterscheiden.

### Aufbau des JWT

Die Zugriffstoken von B1 sind HS256-JWTs, die in `Api/src/modules/membership/auth/AuthenticatedUser.ts` erzeugt werden. Die Claims:

| Claim | Bedeutung |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Die Person hinter dem Token |
| `churchId` | Die einzige Kirche, in der dieses Token handelt – der Anker für die gesamte Datenbegrenzung |
| `personId` | Der Personendatensatz innerhalb dieser Kirche |
| `permissions` | Flaches Array von RBAC-Berechtigungszeichenketten (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppenmitgliedschaft bzw. Gruppenleitung für gruppenbezogene Prüfungen |
| `membershipStatus` | Gast oder Mitglied, für die Steuerung von Selbstbedienungsfunktionen |

Ein OAuth-Zugriffstoken hat exakt denselben Aufbau wie ein Anmelde-JWT – der einzige Unterschied ist, dass sein Array `permissions` vor dem Signieren durch die gewährten Scopes gefiltert wurde (`getCombinedApiJwt(...)`).

### Begrenzung auf eine Kirche

`churchId` ist ein Claim des Tokens, kein Parameter der Anfrage. Ein Zugangsdatum kann daher nie auf andere Kirchen zugreifen. Jede Repository-Abfrage filtert nach der `churchId` des Aufrufers; ein API-Schlüssel oder ein OAuth-Token ist bei der Ausstellung genau einer Kirche zugeordnet.

### Rollenberechtigungen an der Grenze

Controller sichern Aktionen mit `au.checkAccess(contentType, action)` gegen das Array `permissions` des Tokens ab. Scopes sind ein **Filter, niemals eine Gewährung** (`Api/src/shared/auth/Scopes.ts`): Der `SCOPE_CATALOG` ordnet jeden Scope (z. B. `people:read`, `donations:write`) den RBAC-Paaren zu, die er erlaubt, und `filterPermissionsByScopes()` schneidet dies bei jeder Auflösung mit den **aktuellen** Berechtigungen der Person. Daraus folgt:

- Wird eine Berechtigung in B1 Admin entzogen, endet der Zugriff des Zugangsdatums bei der nächsten Anfrage – Tokens weichen nie von der Rolle ab.
- Ein Scope kann Berechtigungen nur **entfernen**. Ein eingeschränktes Zugangsdatum kann daher nie zur Server- oder Domänenadministration aufsteigen; diese Berechtigungen sind bewusst keinem Scope zugeordnet.
- API-Schlüssel tragen das Präfix `cak_`. `CustomAuthProvider.getUser()` erkennt es, bildet einen Hash des Geheimnisses und löst bei jedem Aufruf die aktuelle RBAC der besitzenden Person neu auf.

Den vollständigen Katalog finden Sie unter [API-Schlüssel → Scopes](../api/api-keys#scopes).

## Überblick über die Schnittstellen

### REST-API

Die vollständige Produktoberfläche. Jeder authentifizierte Endpunkt akzeptiert im Header `Authorization: Bearer` entweder ein JWT oder einen API-Schlüssel `cak_…` – eine eigene Routentabelle nur für Schlüssel oder nur für OAuth gibt es nicht. Module und ihre Basispfade liegen unter `Api/src/modules/*`.

### API-Schlüssel

Ein persönliches Zugriffstoken `cak_<prefix>.<secret>`, erstellt unter **B1 Admin → Einstellungen → Entwickler → API-Schlüssel**. Gespeichert wird nur ein SHA-256-Hash; der Schlüssel selbst wird einmal angezeigt. Verwaltet unter `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Am besten geeignet für eigene Skripte einer Kirche und für Connectoren wie Zapier, Make und Google Tabellen. → **[API-Schlüssel](../api/api-keys)**

### OAuth 2.0 & verbundene Apps

Für mandantenfähige Apps, bei denen jede Kirche zustimmen muss. Implementiert in `Api/src/modules/membership/controllers/OAuthController.ts` unter `/membership/oauth`. Der Server unterstützt drei Grant-Typen:

- **Authorization Code** – `POST /oauth/authorize` (authentifiziert) liefert einen kurzlebigen Code; `POST /oauth/token` mit `grant_type=authorization_code` tauscht ihn gegen ein Zugriffs-JWT (ca. 7 Tage) und ein Refresh-Token (ca. 90 Tage). Öffentliche Clients ohne Geheimnis müssen PKCE verwenden (nur `S256`): eine `code_challenge` beim Autorisieren und den passenden `code_verifier` beim Token-Tausch.
- **Gerätecode** (RFC 8628) – `POST /oauth/device/authorize` stellt einen `user_code` aus; der Benutzer bestätigt ihn in B1 Admin (`/oauth/device/approve`); das Gerät fragt `/oauth/token` mit dem Grant Gerätecode ab. Gedacht für TVs, Kioske und CLIs ohne Browser.
- **Refresh-Token** – `grant_type=refresh_token` stellt ein neues Zugriffstoken aus; öffentliche Clients ohne Geheimnis können das Geheimnis weglassen.

Öffentliche Clients können sich außerdem mit `POST /oauth/register` selbst registrieren (dynamische Client-Registrierung nach RFC 7591). Sie erhalten eine `client_id` und kein Geheimnis, und ihre Redirect-URIs müssen `https` oder Loopback sein.

Eine **verbundene App** ist die Sicht einer gewährten Token-Zustimmung aus Sicht der Kirchenadministration; sie ist unter `/membership/oauth/connections` aufgelistet und widerrufbar. Der Controller bietet außerdem eine Brücke für OAuth-**Relay-Sitzungen** (`/oauth/relay/*`), mit der ein Gerät ohne Browser die Anmeldung bei einem *externen* Anbieter abschließen kann. → **[Verbundene Apps & OAuth](../api/connected-apps)**

### Webhooks

Die einzige ausgehende Schnittstelle. Eine Kirche abonniert einen öffentlichen HTTPS-Endpunkt für Ereignisse. Tritt eine passende Änderung ein, reichert `WebhookDispatcher.emit(churchId, event, payload)` Nutzlasten, die nur IDs enthalten, mit Anzeigenamen an (`personName`, `groupName`, `formName` – die Nachschlagen erfolgen erst, wenn ein Abonnement passt), protokolliert die Zustellung, und ein Hintergrundprozess sendet einen signierten JSON-Umschlag per POST mit Wiederholung und Backoff. Engine unter `Api/src/shared/webhooks/`, Verwaltung je Kirche unter `/membership/webhooks` (`WebhookController.ts`). Ein Feld `connectorType` formt den Körper für Slack und Discord um; der Connector `mailchimp` geht weiter und übernimmt den gesamten HTTP-Austausch (Methode, URL und Authentifizierung je Ereignis gegen die API von Mailchimp, Zugangsdaten verschlüsselt in `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP-Server

Eine KI-orientierte Hülle unter `/mcp` (`Api/src/modules/mcp/`). Drei generische Werkzeuge – `list_endpoints`, `describe_endpoint`, `api_call` – machen die gesamte REST-Oberfläche dynamisch für jeden MCP-Client verfügbar. Die Authentifizierung ist dasselbe Bearer-Token wie überall sonst. Für Clients, die sich per OAuth anmelden (claude.ai-Custom-Connectors), trägt eine 401-Antwort von `/mcp` einen Header `WWW-Authenticate`, der auf `/.well-known/oauth-protected-resource` verweist; `/.well-known/oauth-authorization-server` kündigt die Endpunkte `/membership/oauth`, die dynamische Registrierung, PKCE und die Zustimmungsseite `/oauth` in B1 Admin an (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` betritt den Express-Stack im selben Prozess, sodass alle Berechtigungs- und Kirchenbegrenzungen weiter gelten. → **[MCP-Server](../api/mcp)**

### Inhaltsanbieter

Der eingehende Inhaltsweg liegt im eigenen Paket `Packages/content-providers` (`@churchapps/content-providers`) und nicht in der API. Jeder Anbieter implementiert die Schnittstelle `IProvider` (`src/interfaces.ts`) – `browse`, `getPlaylist`, `getInstructions` sowie Hooks zur Authentifizierung – und registriert sich selbst in einer `Map` (`src/providers/registry.ts`). Hier ist **B1 der OAuth-Client**: Ein Anbieter deklariert einen `AuthType` von `none`, `oauth_pkce`, `device_flow` oder `form_login`, und die gemeinsamen Helfer (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) führen den clientseitigen Ablauf mit PKCE bzw. Gerätecode gegen die externe Quelle aus. Derzeit werden elf Anbieter mitgeliefert, darunter Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church und B1.church. Sie speisen FreePlay und die B1-Apps. → **[FreePlay-Inhaltsanbieter](../freeplay-content-provider)**

**Jahrespläne** nutzen diesen Weg. Ein Herausgeber von Lehrplänen (mit `lessons.edit`) pflegt in der Verwaltung von Lessons.church geordnete Abfolgen für Woche 1/2/3 (Tabellen `yearPlans` / `yearPlanWeeks` der LessonsApi, optional mit `startMonth` und je Woche einem `anchor` von `easter` oder `christmas`). `GET /yearPlans/public` der LessonsApi liefert aktive Pläne anonym und füllt Programm, Studie und Ort jeder Woche aus dem Lektionsbaum. Unter **B1 Admin → Dienste → Pläne → Lektion planen → Jahresplan anwenden** wird dieser Endpunkt genutzt; er schreibt je einbezogener Woche einen Plan der DoingApi (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Pläne mit `startMonth` ordnen verankerte Wochen dem gewählten Jahr zu (Ostern nach dem gregorianischen Osterdatum, Weihnachten als der Sonntag bis einschließlich 25. Dezember) und füllen die Zeiträume dazwischen; Pläne ohne `startMonth` bilden Woche N weiterhin auf `startDate + (N−1)×7` Tage ab. Wochen aus externen OLF-Anbietern oder mit unvollständigem Pfad werden beim Anwenden übersprungen. Kirchen bearbeiten die entstandenen Pläne wie alle anderen, und FreePlay spielt, was im Plan steht.

## Zusammenfassung

| Schnittstelle | Authentifizierung | Richtung | Ort der Umsetzung | Referenz |
|---|---|---|---|---|
| REST-API | `Bearer` mit JWT oder Schlüssel `cak_…` | Eingehend | `Api/src/modules/*` | [API-Schlüssel](../api/api-keys) |
| API-Schlüssel | Mit SHA-256 gehashtes Token `cak_` | Zugangsdatum | `Api/.../membership/controllers/ApiKeyController.ts` | [API-Schlüssel](../api/api-keys) |
| OAuth 2.0 / verbundene Apps | Authorization Code (PKCE) · Gerät · Refresh → JWT; dynamische Client-Registrierung | Eingehend | `Api/.../membership/controllers/OAuthController.ts` | [Verbundene Apps](../api/connected-apps) |
| Webhooks | Geheimnis je Hook, Signatur HMAC-SHA256 | Ausgehend | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-Server | `Bearer` mit JWT, OAuth-JWT (über `/.well-known` erkannt) oder Schlüssel `cak_…` | Eingehend (KI) | `Api/src/modules/mcp/` | [MCP-Server](../api/mcp) |
| Inhaltsanbieter | Je Anbieter: keine / OAuth PKCE / Gerät / Formular | Eingehender Inhalt | `Packages/content-providers/` | [Inhaltsanbieter](../freeplay-content-provider) |

## Fertige Connectoren

Statt alles von Grund auf zu bauen, liefert ChurchApps Connectoren auf Basis der oben genannten Schnittstellen:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** – ein Webhook-`connectorType` formt den Standardumschlag in eine Chatnachricht um; vollständig in B1 Admin konfiguriert, ohne Konto bei einem Drittanbieter.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** – ein `mailchimp`-connectorType, der Personen in eine Mailchimp-Zielgruppe synchronisiert und Gruppen- bzw. Listenmitgliedschaften auf Tags abbildet (`Api/src/shared/webhooks/MailchimpConnector.ts`). Anders als die Chat-Connectoren stellt er für jedes Ereignis eigene authentifizierte Anfragen (Anlegen/Aktualisieren, Archivieren, Tags) statt an eine von der Kirche angegebene URL zu senden; der API-Schlüssel und die Zielgruppen-ID liegen verschlüsselt in `webhooks.connectorConfig`. Einseitig, nur Standard-Platzhalter.
- **[Zapier](/docs/b1-admin/integrations/zapier)** und **[Make](/docs/b1-admin/integrations/make)** – lösen bei Webhook-Ereignissen aus und handeln über die REST-API; sie registrieren beim Einschalten eines Zaps bzw. Szenarios einen eigenen Webhook (erfordert einen Schlüssel mit `settings:write`). Der Quellcode der Zapier-App liegt im Repository `Integrations` unter `zapier/` (Zapier CLI, bereitgestellt mit `zapier push`).
- **[Google Tabellen](/docs/b1-admin/integrations/google-sheets)** – ein Add-on, das sich mit einem API-Schlüssel authentifiziert und Personen, Spenden, Gruppen und Anwesenheit auf Abruf exportiert.
- **[Claude](/docs/b1-admin/integrations/claude)** und **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** – MCP-Clients, die auf `/mcp` zeigen.

Für eigenen Code umhüllt **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) all dies: einen typisierten REST-Client, einen OAuth-Client (Authorization Code / Refresh / Gerät) und einen HMAC-Prüfer für Webhooks mit Express-Middleware.

## Verwandte Seiten

- [API-Schlüssel](../api/api-keys) – das einfachste Zugangsdatum und der Katalog der Scopes
- [Verbundene Apps & OAuth](../api/connected-apps) – mandantenfähige Zustimmungsabläufe
- [Webhooks](../api/webhooks) – das ausgehende Ereignissystem
- [MCP-Server](../api/mcp) – die KI-Integrationshülle
- [FreePlay-Inhaltsanbieter](../freeplay-content-provider) – ein eingehender Inhaltsquelle werden
- [Integrationen (für Endanwender)](/docs/b1-admin/integrations/) – Anleitungen zur Einrichtung fertiger Connectoren
