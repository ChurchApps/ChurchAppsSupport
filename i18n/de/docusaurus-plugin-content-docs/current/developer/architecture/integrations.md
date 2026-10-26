---
title: "Integrations- und Erweiterungsschnittstelle"
---

# Integrations- und Erweiterungsschnittstelle

<div class="article-intro">

Alles, was sich von Dritten anbinden lässt, läuft über eine API und ein gemeinsames Berechtigungsmodell. Diese Seite ist die Übersicht: Sie nennt jede Integrationsschnittstelle, zeigt, wie sie zusammenhängen, und verweist auf die ausführliche Referenz zu jeder einzelnen. Wenn Sie gegen B1 entwickeln, beginnen Sie hier, um den richtigen Zugang zu wählen, und folgen Sie dann dem Link zur Seite, die ihn ausführlich beschreibt.

</div>

## Die Schnittstellen im Überblick

Es gibt sechs Wege hinein oder hinaus, und alle teilen dieselbe Authentifizierungsschicht:

- **[REST-API](../api/api-keys)** – die gesamte Produktoberfläche, aufrufbar mit einem Bearer-Token aus jeder Sprache.
- **[API-Schlüssel](../api/api-keys)** – der einfachste Berechtigungsnachweis: ein `cak_…`-Token, das an genau eine Person in genau einer Kirche gebunden ist.
- **[OAuth 2.0 & verbundene Apps](../api/connected-apps)** – Einwilligung je Kirche für Apps mit mehreren Mandanten; stellt dasselbe JWT aus, das ein Benutzer erhält.
- **[Webhooks](../api/webhooks)** – signierte, dauerhaft zugestellte ausgehende Ereignisse.
- **[MCP-Server](../api/mcp)** – eine KI-orientierte Hülle über der REST-API unter `/mcp`.
- **[Content-Provider](../freeplay-content-provider)** – der eingehende Weg für externe Medienbibliotheken in FreePlay und die B1-Apps.

Alles außer den Content-Providern wird von einer einzigen monolithischen API bereitgestellt (das Repository [Api](https://github.com/ChurchApps/Api)), deren Module unter festen Basispfaden eingebunden sind – `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` und `/mcp`.

## So greift alles ineinander

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Drittanbieter-App   │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · Server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / Skripte     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · KI-Client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API-Module: /membership /giving      │
             │        signierter JSON-POST            │  /attendance /content /messaging …    │
             │   (Person / Spende / Gruppe / …)       │                   │                    │
             └──────────── Webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (dauerhaft, HMAC-SHA256-signiert) └───────────────────────────────────────┘

   Externe Inhaltsquellen (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / Gerätefluss / keiner   ──  hier ist B1 der OAuth-*Client*  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1-Apps        (eingehender Inhaltsweg)
```

Drei Pfeile erzählen die ganze Geschichte: Ein Dritter **ruft ein** mit einem Bearer-Token (API-Schlüssel oder OAuth-JWT, auch über `/mcp`); die API **ruft zurück** über signierte Webhooks; und Content-Provider sind der einzige **eingehende Inhaltsweg**, auf dem B1 selbst als OAuth-*Client* Medien aus einer externen Quelle abruft.

## Das gemeinsame Berechtigungsmodell

Jeder Berechtigungsnachweis – das Anmelde-JWT eines Benutzers, ein OAuth-Zugriffstoken oder ein API-Schlüssel – wird auf denselben **`Principal`** aufgelöst und auf dieselbe Weise geprüft. Es gibt keinen eigenen Pfad für die Authentifizierung von Integrationen; ein eingeschränkter Berechtigungsnachweis ist schlicht nicht von einem Benutzer mit geringeren Rechten zu unterscheiden.

### Aufbau des JWT

B1-Zugriffstoken sind HS256-JWTs, die in `Api/src/modules/membership/auth/AuthenticatedUser.ts` ausgestellt werden. Die Claims:

| Claim | Bedeutung |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Die Person hinter dem Token |
| `churchId` | Die einzige Kirche, in der dieses Token handelt – der Anker für die gesamte Datenabgrenzung |
| `personId` | Die Person innerhalb dieser Kirche |
| `permissions` | Flaches Array von RBAC-Berechtigungszeichenketten (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Gruppenzugehörigkeit bzw. Gruppenleitung für gruppenbezogene Prüfungen |
| `membershipStatus` | Gast oder Mitglied, für die Steuerung des Selbstservice |

Ein OAuth-Zugriffstoken hat exakt dieselbe Struktur wie ein Anmelde-JWT. Der einzige Unterschied: Sein Array `permissions` wurde **vor dem Signieren durch die gewährten Scopes gefiltert** (`getCombinedApiJwt(...)`).

### Abgrenzung je Kirche

`churchId` ist ein Claim im Token und kein Anfrageparameter, sodass ein Berechtigungsnachweis nie in andere Kirchen greifen kann. Jede Repository-Abfrage filtert nach der `churchId` des Aufrufers; ein API-Schlüssel oder OAuth-Token ist zum Zeitpunkt der Ausstellung genau einer Kirche zugeordnet.

### Rollenbasierte Berechtigungen an der Grenze

Controller steuern Aktionen mit `au.checkAccess(contentType, action)` gegen das Array `permissions` des Tokens. Scopes sind ein **Filter, niemals eine Gewährung** (`Api/src/shared/auth/Scopes.ts`): Der `SCOPE_CATALOG` ordnet jeden Scope (z. B. `people:read`, `donations:write`) den RBAC-Paaren zu, die er erlaubt, und `filterPermissionsByScopes()` schneidet dies bei jeder Auflösung mit den *aktuellen* Berechtigungen der Person. Daraus folgt:

- Wird eine Berechtigung in B1Admin entzogen, verliert der Berechtigungsnachweis den Zugriff bei der nächsten Anfrage – Tokens weichen nie von der Rolle ab.
- Ein Scope kann Berechtigungen nur *entfernen*; ein eingeschränkter Berechtigungsnachweis kann daher nie zu Server- oder Domänenadministration aufsteigen (diese Berechtigungen sind bewusst keinem Scope zugeordnet).
- API-Schlüssel tragen das Präfix `cak_`; `CustomAuthProvider.getUser()` verzweigt darauf, hasht das Geheimnis und löst bei jedem Aufruf die aktuellen RBAC-Rechte der zugehörigen Person neu auf.

Den vollständigen Scope-Katalog finden Sie unter [API-Schlüssel → Scopes](../api/api-keys#scopes).

## Referenz der Schnittstellen

### REST-API

Die vollständige Produktoberfläche. Jeder authentifizierte Endpunkt akzeptiert im Header `Authorization: Bearer` entweder ein JWT oder einen `cak_…`-API-Schlüssel – es gibt keine eigene Routentabelle nur für Schlüssel oder nur für OAuth. Module und ihre Basispfade liegen unter `Api/src/modules/*`.

### API-Schlüssel

Ein persönliches Zugriffstoken der Form `cak_<prefix>.<secret>`, erstellt in **B1Admin → Einstellungen → Entwickler → API-Schlüssel**. Gespeichert wird nur ein SHA-256-Hash; der Klartext-Schlüssel wird genau einmal angezeigt. Verwaltet unter `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Am besten geeignet für eigene Skripte einer einzelnen Kirche und für Anbindungen wie Zapier, Make und Google Sheets. → **[API-Schlüssel](../api/api-keys)**

### OAuth 2.0 & verbundene Apps

Für Apps mit mehreren Mandanten, die die Einwilligung jeder Kirche benötigen. Umgesetzt in `Api/src/modules/membership/controllers/OAuthController.ts` unter `/membership/oauth`. Der Server unterstützt drei Berechtigungstypen:

- **Authorization Code** – `POST /oauth/authorize` (authentifiziert) liefert einen kurzlebigen Code; `POST /oauth/token` mit `grant_type=authorization_code` tauscht ihn gegen ein Zugriffs-JWT (ca. 7 Tage) und ein Aktualisierungstoken (ca. 90 Tage). Clients ohne Geheimnis (öffentliche Clients) müssen PKCE verwenden (nur `S256`): ein `code_challenge` bei der Autorisierung und den passenden `code_verifier` beim Tausch des Tokens.
- **Device Code** (RFC 8628) – `POST /oauth/device/authorize` stellt einen `user_code` aus; die Person bestätigt ihn in B1Admin (`/oauth/device/approve`); das Gerät fragt über `/oauth/token` mit dem Device-Code-Verfahren ab. Gedacht für Fernseher, Kioske und CLIs ohne Browser.
- **Refresh Token** – `grant_type=refresh_token` stellt ein neues Zugriffstoken aus; öffentliche Clients ohne Geheimnis dürfen das Geheimnis weglassen.

Öffentliche Clients können sich auch selbst über `POST /oauth/register` registrieren (dynamische Client-Registrierung nach RFC 7591). Sie erhalten eine `client_id` ohne Geheimnis, und ihre Weiterleitungs-URIs müssen `https` oder Loopback sein.

Eine **verbundene App** ist die Ansicht eines gewährten Tokens für Kirchenadministratoren; sie wird unter `/membership/oauth/connections` aufgelistet und kann dort widerrufen werden. Der Controller stellt außerdem eine OAuth-**Relay-Sitzungsbrücke** (`/oauth/relay/*`) bereit, mit der ein Gerät ohne Browser die Anmeldung bei einem *externen* Anbieter abschließen kann. → **[Verbundene Apps & OAuth](../api/connected-apps)**

### Webhooks

Der einzige ausgehende Weg. Eine Kirche abonniert einen öffentlichen HTTPS-Endpunkt für Ereignisse; tritt eine passende Änderung ein, reichert `WebhookDispatcher.emit(churchId, event, payload)` Nutzlasten, die nur IDs enthalten, mit Anzeigenamen an (`personName`, `groupName`, `formName` – die Suchvorgänge laufen erst, wenn ein Abonnement passt), protokolliert eine Zustellung, und ein Hintergrund-Worker sendet einen signierten JSON-Umschlag per POST, mit Wiederholung und Backoff sowie erneuter Zustellung. Die Engine liegt unter `Api/src/shared/webhooks/`, die CRUD-Verwaltung je Kirche unter `/membership/webhooks` (`WebhookController.ts`). Ein Feld `connectorType` formt den Inhalt für Slack und Discord um; der Connector `mailchimp` geht weiter und übernimmt den gesamten HTTP-Austausch (Methode, URL und Authentifizierung je Ereignis gegenüber der Mailchimp-API; Zugangsdaten verschlüsselt in `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### MCP-Server

Eine KI-orientierte Hülle unter `/mcp` (`Api/src/modules/mcp/`). Drei generische Werkzeuge – `list_endpoints`, `describe_endpoint` und `api_call` – machen die gesamte REST-Oberfläche dynamisch für jeden MCP-Client verfügbar. Die Authentifizierung erfolgt mit demselben Bearer-Token wie überall sonst. Für Clients, die sich per OAuth anmelden (Benutzerdefinierte Connectors von claude.ai), enthält eine 401-Antwort von `/mcp` einen Header `WWW-Authenticate`, der auf `/.well-known/oauth-protected-resource` verweist; `/.well-known/oauth-authorization-server` kündigt die Endpunkte `/membership/oauth`, die dynamische Registrierung, PKCE und die Einwilligungsseite `/oauth` in B1Admin an (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` durchläuft den Express-Stack erneut im selben Prozess, sodass jede Berechtigungs- und Kirchenabgrenzungsregel weiterhin gilt. → **[MCP-Server](../api/mcp)**

### Content-Provider

Der eingehende Inhaltsweg, umgesetzt im eigenen Paket `Packages/content-providers` (`@churchapps/content-providers`) und nicht in der API. Jeder Provider implementiert das Interface `IProvider` (`src/interfaces.ts`) – `browse`, `getPlaylist`, `getInstructions` sowie Hooks für die Authentifizierung – und registriert sich selbst in einer `Map`-Registry (`src/providers/registry.ts`). Hier ist **B1 der OAuth-Client**: Ein Provider deklariert einen `AuthType` von `none`, `oauth_pkce`, `device_flow` oder `form_login`, und die gemeinsamen Hilfsfunktionen (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) führen auf Clientseite den PKCE- bzw. Gerätefluss gegenüber der externen Quelle aus. Derzeit werden elf Provider ausgeliefert – darunter Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church und B1.church –, die FreePlay und die B1-Apps mit Inhalten versorgen. → **[FreePlay-Content-Provider](../freeplay-content-provider)**

**Jahrespläne** laufen über diesen Weg. Ein Herausgeber von Lehrmaterial (mit `lessons.edit`) pflegt geordnete Abfolgen für Woche 1/2/3 im Lessons.church-Admin (Tabellen `yearPlans` / `yearPlanWeeks` in LessonsApi, mit optionalem `startMonth` und einem `anchor` je Woche: `easter` / `christmas`). `GET /yearPlans/public` in LessonsApi liefert aktive Pläne anonym aus und füllt Programm, Studie und Ort jeder Woche aus dem Lektionsbaum. B1Admin unter **Dienste → Pläne → Lektion planen → Jahresplan anwenden** nutzt diesen Endpunkt und schreibt je enthaltener Woche einen DoingApi-Plan (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Pläne mit `startMonth` ordnen verankerte Wochen dem gewählten Jahr zu (Ostern über die gregorianische Berechnung, Weihnachten als der Sonntag am oder vor dem 25. Dezember) und füllen die Zeiträume dazwischen auf; Pläne ohne `startMonth` ordnen Woche N weiterhin `startDate + (N−1)×7` Tage zu. Wochen aus externen OLF-Providern oder mit unvollständigem Pfad werden bei der Anwendung übersprungen; Kirchen bearbeiten die entstandenen Pläne wie alle anderen, und FreePlay spielt, was im Plan steht.

## Zusammenfassung

| Schnittstelle | Authentifizierung | Richtung | Umsetzung | Referenz |
|---|---|---|---|---|
| REST-API | `Bearer` JWT oder `cak_…`-Schlüssel | Eingehend | `Api/src/modules/*` | [API-Schlüssel](../api/api-keys) |
| API-Schlüssel | SHA-256-gehashtes `cak_`-Token | Berechtigungsnachweis | `Api/.../membership/controllers/ApiKeyController.ts` | [API-Schlüssel](../api/api-keys) |
| OAuth 2.0 / verbundene Apps | Auth-Code (PKCE) · Gerät · Refresh → JWT; dynamische Client-Registrierung | Eingehend | `Api/.../membership/controllers/OAuthController.ts` | [Verbundene Apps](../api/connected-apps) |
| Webhooks | Geheimnis je Hook, HMAC-SHA256-Signatur | Ausgehend | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP-Server | `Bearer` JWT, OAuth-JWT (über `/.well-known` ermittelt) oder `cak_…`-Schlüssel | Eingehend (KI) | `Api/src/modules/mcp/` | [MCP-Server](../api/mcp) |
| Content-Provider | Je Provider: keiner / OAuth PKCE / Gerät / Formular | Eingehender Inhalt | `Packages/content-providers/` | [Content-Provider](../freeplay-content-provider) |

## Vorgefertigte Connectors

Anstatt alles selbst zu bauen, bietet ChurchApps Connectors auf Grundlage der oben genannten Schnittstellen:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** – ein Webhook-`connectorType` formt den Standard-Umschlag in eine Chatnachricht um; vollständig in B1Admin konfiguriert, ohne eigenes Drittkonto.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** – ein `mailchimp`-connectorType, der Personen mit einer Mailchimp-Zielgruppe synchronisiert und Gruppen- bzw. Listenzugehörigkeiten Tags zuordnet (`Api/src/shared/webhooks/MailchimpConnector.ts`). Anders als die Chat-Connectors stellt er je Ereignis eigene authentifizierte Anfragen (Anlegen/Aktualisieren, Archivieren, Taggen), statt an eine von der Kirche angegebene URL zu senden; der API-Schlüssel und die Zielgruppen-ID liegen verschlüsselt in `webhooks.connectorConfig`. Nur eine Richtung, nur Standard-Zusammenführungsfelder.
- **[Zapier](/docs/b1-admin/integrations/zapier)** und **[Make](/docs/b1-admin/integrations/make)** – werden durch Webhook-Ereignisse ausgelöst und handeln über die REST-API; sie registrieren ihren eigenen Webhook, sobald ein Zap bzw. Szenario aktiviert wird (benötigt einen Schlüssel mit `settings:write`). Der Quellcode der Zapier-App liegt im Repository `Integrations` unter `zapier/` (Zapier CLI, bereitgestellt mit `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** – ein über API-Schlüssel authentifiziertes Add-on, das Personen, Spenden, Gruppen und Anwesenheit auf Abruf exportiert.
- **[Claude](/docs/b1-admin/integrations/claude)** und **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** – MCP-Clients, die auf `/mcp` zeigen.

Für eigenen Code kapselt **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) all dies: einen typisierten REST-Client, einen OAuth-Client (Auth-Code, Aktualisierung, Gerätefluss) und einen HMAC-Prüfer für Webhooks mit Express-Middleware.

## Verwandte Seiten

- [API-Schlüssel](../api/api-keys) – der einfachste Berechtigungsnachweis und der Scope-Katalog
- [Verbundene Apps & OAuth](../api/connected-apps) – Einwilligungsabläufe für mehrere Mandanten
- [Webhooks](../api/webhooks) – das System für ausgehende Ereignisse
- [MCP-Server](../api/mcp) – die KI-Integrationshülle
- [FreePlay-Content-Provider](../freeplay-content-provider) – Anbindung als eingehende Inhaltsquelle
- [Integrationen (für Endbenutzer)](/docs/b1-admin/integrations/) – Anleitungen zur Einrichtung vorgefertigter Connectors
