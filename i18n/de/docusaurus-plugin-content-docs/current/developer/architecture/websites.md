---
title: "Website-Routing und Multi-Site"
---

# Website-Routing und Multi-Site

<div class="article-intro">

Eine einzelne Kirche kann jetzt mehr als eine eigene Website bedienen, und jede kann auf einer `*.b1.church`-Subdomain oder auf einer vollständig benutzerdefinierten, kircheneigenen Domain leben. Diese Seite bildet die Routing-Schicht ab, die *unter* dem Builder sitzt: wie eine eingehende Anfrage eine Kirche **und** eine bestimmte Website auflöst, das Multi-Site-Datenmodell (das `siteId`-Sentinel, das jede bereits vorhandene Site unverändert rendert) und das benutzerdefinierte Domain-Edge – ein selbstverwalteter Caddy-Proxy auf EC2, der TLS beendet und jede Kirchendomain auf ihre `*.b1.church`-Upstream umschreibt. Für das, was tatsächlich rendert, sobald eine Anfrage zu einer Kirche aufgelöst wurde – den Seiten-/Abschnitt-/Element-Baum – siehe [Website Builder](./website-builder).

</div>

## Übersicht

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

Drei Regeln gelten über diese Schicht hinweg:

1. **Ein Sentinel hält alles rückwärts kompatibel.** `siteId = ''` ist die primäre Website. Jede Seite, jeder Block, jeder Link, jeder Global-Style und jede Domain-Reihe, die vor dieser Funktion existierte, trägt `''` und rendert genau wie zuvor. Eine *zweite* Website ist einfach eine Reihe von Zeilen mit einer nicht leeren `siteId`, und jeder Content-Endpoint, der ohne `?siteId=` aufgerufen wird, gibt die primäre Website – Byte-für-Byte die alte Anfrage – zurück.
2. **Die Auflösung ist Host-Label-basiert und konvergiert.** Eine `*.b1.church`-Subdomain routed nach ihrem Host-Label direkt; eine benutzerdefinierte Domain wird an der Caddy-Edge auf ihr `{sub}.b1.church`-Label umgeschrieben, bevor B1App sie sieht (mit einem Middleware-DB-Lookup, das einen `x-site`-Header als Fallback für jeden Raw-Custom-`Host` stempelt). Beide Pfade landen auf derselben `[sdSlug]`-Route und demselben `churches/lookup`-Aufruf, daher ist das nachgelagerte Rendering identisch.
3. **Die Caddy-Edge ist zustandslos über einer Wahrheitsquelle.** Benutzerdefinierte Domains enden bei einem selbstverwalteten Caddy-Proxy auf EC2, der jede Domain auf ihre `{sub}.b1.church`-Upstream umschreibt. Ein Domain-Save feuert einen einzelnen Best-Effort-`CaddyHelper.updateCaddy()`, und Caddy liest die `domains`-Tabelle auch direkt (die `authorize`- und `hostmap`-Endpoints unten). Die Tabelle ist autorisierend – ein unerreichbarer Caddy kann niemals einen Save fehlschlagen.

## Site-Auflösung

### `*.b1.church`-Subdomains

`B1App/next.config.mjs` schreibt eingehende Anfragen nach Host neu. Eine Host-Regel mit dem Muster `(?<subdomain>.*?)\..*` erfasst das **erste Label** des Hosts und schreibt `/` und `/:path*` in `/{subdomain}` – das `[sdSlug]`-App-Router-Segment. Also `grace.b1.church/about` wird zu `/grace/about`.

Innen `src/app/[sdSlug]/` ruft `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` auf. Die `ChurchController.getBySubDomain`-Antwort hat jetzt zwei Branches:

| Slug-Übereinstimmungen | Antwort | Bedeutung |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primäre Website dieser Kirche |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Eine **sekundäre Website** – der Controller fällt zu `sites` zurück, löst die besitzende Kirche auf und wiederholt den abgefragten Slug plus den zusätzlichen `siteId` |

Das zusätzliche `siteId` ist das einzige, das eine sekundäre Website-Anfrage von einer primären unterscheidet; alles andere in der Pipeline ist gemeinsam.

### Benutzerdefinierte Domains

Eine kircheneigene Domain endet beim **Caddy-Edge** (im Detail unten), die den `Host`-Header auf die Website's `{sub}.b1.church` vor dem Proxy zu B1App umschreibt. Also auf dem normalen Pfad empfängt B1App einen *internen* `*.b1.church`-Host und löst ihn nach Host-Label genau wie eine native Subdomain auf – das Middleware-DB-Lookup wird nie abgefeuert. `src/middleware.ts` läuft immer noch auf jeder Anfrage, aber mit einem immer aktiviertem Job und einem Fallback:

1. **Immer** – es **löscht jeden vom Client bereitgestellten `x-site`-Header**. Dieser Header ist Spoof-Umschreib-Eingabe und wird nur vertraut, wenn die Middleware ihn selbst setzt; das Entfernen ist der echte Job der Middleware hinter Caddy.
2. **Fallback, nur nicht-interner `Host`** – für einen Raw-Custom-Domain-`Host`, der B1App *ohne* Caddy's Umschreibung erreicht, ruft es `GET /membership/domains/public/lookup/{host}` auf und setzt, wenn das eine `subDomain` zurückgibt, `x-site: {subDomain}.b1.church`. Hinter Caddy ist dieser Branch inert, weil der `Host` bereits `*.b1.church` ist.

Interne Hosts – `localhost`, `b1.church` und die Suffixe `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` – überspringen das Lookup komplett (sie sind bereits gelöst nach Host-Label-Umschreibung oder sind Preview-/Deploy-Hosts).

Das Lookup selbst (`DomainRepo.loadByName`) Left-Joins `domains → churches` und `domains → sites` und gibt `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` zurück – die zugewiesene sekundäre Website's Subdomain, wenn die Domain auf eine zeigt, andernfalls der Kirche. Es entspricht zuerst dem exakten Host; wenn dieser Host mit `www.` begann und fehlschlug, versucht es **einmal** gegen den Bare Apex.

Zurück in `next.config.mjs` werden die `x-site`-Umschreib-Regeln **vor** den generischen Host-Regeln platziert, daher gewinnen sie. `x-site: grace.b1.church` → erstes Label `grace` → `[sdSlug] = grace`, und von dort aus ist die Auflösung identisch zum Subdomain-Pfad (gleich `churches/lookup`, gleich `siteId`).

:::info
Der `x-site`-Header ist von außen nicht vertraut. Die Middleware entfernt bedingungslos jeden eingehenden `x-site`, bevor sie optional seinen eigenen setzt, und die Umschreib-Regeln sehen nur den Middleware-gesetzten Wert – ein Client kann sich nicht selbst auf einen anderen Inhalt einer Kirche erzwingen, indem er einen Header sendet.
:::

Zwei operative Details zur Middleware:

- **Cache.** Das Ergebnis jedes Hosts (ein Hit *oder* ein bestätigtes Miss – niemals ein Netzwerkfehler) wird **10 Minuten** lang in einer In-Memory-`Map` pro serverless Isolate gecacht.
- **Matcher.** Der Matcher schließt absichtlich `/sitemap.xml`, `/robots.txt` und `/manifest.webmanifest` wieder ein. Sein erstes Muster schließt gepunktete Pfade aus, was diese Dateien sonst fallenlassen würde; sie werden hinzugefügt, damit die Pro-Kirchen-SEO-/PWA-Dateien einer benutzerdefinierten Domain auch den `x-site`-Header erhalten.
- **Kanonischer Header.** Für Kirchenseiten hängt die Middleware einen `Link: <{proto}://{host}{path}>; rel="canonical"`-Antwort-Header an, der den Host benennt, von dem die Seite tatsächlich bereitgestellt wurde – Subdomain oder benutzerdefinierte Domain (`helpers/canonicalLink.ts`). Es wird übersprungen bei nicht-Kirchenhosts (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) und auf `/mobile`, `/login`, `/logout` und den generierten Robots-/Sitemap-/Manifest-Dateien.

### Öffentliche Website deaktiviert

Eine Kirche kann **Öffentliche Website deaktivieren** in B1Admin (kirchenebenes Content-Setting `hidePublicSite = "true"`) aktivieren. Die Website bedient dann nur ihre internen Pfade:

- **B1App-Middleware** schlägt die Subdomain nach (`/membership/churches/lookup` dann `/content/settings/public/:churchId`) und leitet anonyme Anfragen für irgendeinen Pfad außerhalb der Allowlist auf `/login?returnUrl={path}{query}` um. Die Allowlist (`helpers/publicSite.ts`) ist `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` und die Manifest-/Robots-/Sitemap-Dateien. Nur bestätigte Antworten werden gecacht (60 Sekunden in Produktion, da der Admin's Revalidate-Aufruf diese Pro-Instanz-Map nicht löschen kann; uncached in Dev/Test). Ein API-Fehler bedient die Website statt alle auszusperren.
- **Angemeldete Mitglieder sehen die volle Website.** Eine Anfrage mit einem nicht abgelaufenen `jwt`-Cookie (die Middleware's `hasSession()` dekodiert die Nutzlast's `exp` ohne die Signatur zu überprüfen – das ist ein Soft-Gate, keine Zugriffscontrol) überspringt die Umleitung, daher kehrt ein Mitglied nach dem Anmelden auf die Seite zurück, die es anfordert, und sieht die normalen Seiten, eingebauten Seiten (Gruppen, Predigten usw.) und Header-Navigation. Die Seitenkomponenten und `Header` überprüfen selbst nicht mehr `hidePublicSite`.
- **`robots.txt`** lehnt alles ab, wie auf Noindex-Hosts.
- **API.** `GET /content/pages/public/:churchId` (die Sitemap-Seitenliste) gibt `[]` zurück, daher können anonyme Anrufer die Seiten nicht auflisten.

### `siteId`-Threading

`ConfigHelper` speichert die aufgelöste `siteId` auf ihrer pro-Anfrage `ConfigurationInterface` (gememoized mit React `cache()`) und hängt `?siteId=` an die Content-Aufrufe an, die sie und die Seitenkomponenten machen – **bedingt**: eine leere `siteId` (eine Primär-Kirchen-Subdomain) lässt den Parameter ganz weg. Die gethreadeten Endpoints sind der Seitenbaum (`/content/pages/:id/tree`), die öffentliche Seitenliste, die von der Sitemap verwendet wird (`/content/pages/public/:id`), Global-Styles (`/content/globalStyles/church/:id`), Nav-Links (`/content/links/church/:id`) und der Standalone-Footer-Block (`/content/blocks/public/footer/:id`). Auf dem normalen Render-Pfad kommt der Footer im Seitenbaum an (Abschnitte mit Tag `zone: "siteFooter"`), bereits mit `siteId` abgerufen, daher gibt es keine ungebundene Footer-Lücke.

Das Mitgliedschafts-Portal (B1App `mobile`) sitzt absichtlich außerhalb davon: `loadChurchAppearance.ts` löst die Kirche über `churches/lookup` auf, liest aber Kirchen-Level `/settings/public/{id}` und threadt niemals `siteId` – das Portal ist in v1 kirchenweit (siehe unten).

## Mehrere Websites pro Kirche

### Datenmodell

Die neue `membership.sites`-Tabelle ist absichtlich winzig:

| Spalte | Typ | Notizen |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Besitzende Kirche |
| `name` | `varchar(255)` | Anzeigename (z. B. „Español", „Youth") |
| `subDomain` | `varchar(45)` | **Eindeutiger Index** – globaler Namespace (unten) |

Die Website-Geltung ist dann eine einzelne Nullable-freie Spalte, die zu den Content- und Domain-Tabellen hinzugefügt wird:

| Tabelle (Modul) | Spalte | `''` bedeutet |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain bedient die primäre Website |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primäre Website – und auf **`blocks`**, `''` bedeutet zusätzlich *über alle Websites gemeinsam* |

Zwei Migrationen fügen dies alles ein (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Weil die Spalte zu `''` standardisiert, behält jede existierende Reihe heutiges Verhalten ohne Backfill.

**Globaler Subdomain-Namespace.** `sites.subDomain` teilt *einen* Namespace mit `churches.subDomain` – ein Website-Subdomain kann niemals mit einer Kirchen-Subdomain oder einer anderen Website kollidieren. Dies wird auf **beiden** Save-Pfaden erzwungen: `SiteController.save` lehnt einen Slug ab, der entweder `churches` oder `sites` trifft, und `ChurchController.validateSave` macht dasselbe umgekehrt. Ein eindeutiger Index auf `sites.subDomain` sichert es auf Datenbankebene ab.

**Seiten-Eindeutigkeit** verbreiterte sich von `(churchId, url)` zu `(churchId, siteId, url)`, daher können zwei Websites einer Kirche jeweils ihre eigene `/about` besitzen.

### Pro-Website-Content mit Fallbacks

Jeder Website-scoped Content **List/Tree** Endpoint nimmt ein optionales `?siteId=` (absent ⇒ `''` = primär): Seitenbaum / Liste / öffentlich, Blöcke Liste / nach-Typ / Footer, Links (Anon / gefiltert / alles) und Global-Styles. Abschnitte und Elemente sind *nicht* direkt scoped – sie erben durch ihre Eltern-Seite oder ihren Block.

Zwei Auflösungs-Ketten erledigen die interessante Arbeit:

- **Global-Styles – `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` gibt die Website's eigene Reihe zurück; wenn eine sekundäre Website keine hat, gibt sie die **primäre (`''`)-Reihe wie ist** zurück (die Primäre's `id`/`siteId` haltend, die der Client zum Copy-on-Write verwendet); wenn es auch keine primäre gibt, gibt `GlobalStyleController` eine hart-kodierte Standard-Palette/Schriften zurück.
- **Footer-Block – Website-spezifisch gewinnt, geteilt fällt zurück.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` gibt die geteilte (`''`) *und* Website-spezifische Reihen zurück; der Resolver wählt die Website's eigene Footer, wenn vorhanden, sonst die geteilte. Die gleiche Logik läuft sowohl in `TreeHelper.insertBlocks` (Seitenbaum) als auch im Standalone-`/content/blocks/public/footer/:churchId`-Endpoint.

### Website-Löschungs-Kaskade

`SiteController.delete` (gated auf die Membership-Einstellungen-Edit-Berechtigung) reißt eine sekundäre Website in drei Schritten ab:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadiert den ganzen Content, den die Website besitzt: ihre **Seiten** → ihre Abschnitte, Elemente, `pageHistory` und `posts`; ihre eigenen **Blöcke** → ihre Abschnitte, Elemente und `pageHistory`; ihre **Links** und **globalStyles**. Eine Wache weigert sich zu laufen für `''` – das Primär-/Shared-Sentinel wird niemals kaskadiert.
2. `DomainRepo.clearSiteId` **weist** die Website's Domains zurück zur Primären (`siteId → ''`) statt sie zu löschen, daher überlebt eine benutzerdefinierte Domain eine Website-Löschung.
3. Die `sites`-Reihe wird gelöscht und Caddy-Routen werden neu synchronisiert (Best-Effort).

### B1Admin-Oberfläche

| Fähigkeit | Wo | Mechanismus |
|-----------|-------|-----------|
| Website-Umschalter | `useSiteSelection` + `SiteSwitcher` (leer = "Hauptseite") | Liest einen `?site=`-URL-Param und threadt ihn als `?siteId=` in ContentApi-Aufrufe. Präsent auf den drei Website-**Listen**-Bereichen – **Seiten**, **Blöcke**, **Erscheinungsbild** – aber *nicht* den Seiten-/Block-Editoren, die `siteId` auf der Reihe tragen |
| Website-Create/Delete | `SitesDialog`, geöffnet vom Umschalter's "Manage websites…"-Eintrag | `POST /membership/sites` / `DELETE /membership/sites/:id` (Name + subDomain). Gated auf die Membership-Einstellungen-Edit-Berechtigung (`Permissions.settings.edit` Server-Seite; `Permissions.membershipApi.settings.edit` in B1Admin). **Nur Create/Delete – es gibt keine Rename-UI in v1** |
| Pro-Domain-Website-Zuordnung | `DomainSettingsEdit` unter Einstellungen→Domains | Ein Pro-Reihen-Website-Dropdown-Posts `siteId` pro Domain zu `/membership/domains`. Die Spalte blendet aus, wenn die API keine Websites gibt (älter Backend) |
| Copy-on-Write-Styles | `StylesManager.prepareForSave` | Wenn die geladene Global-Style-Reihe's `siteId` nicht der gewählten Website entspricht (d. h. die API hat die geerbte Primären als Fallback zurückgegeben), löscht sie die Primären's `id` und stempelt die aktuelle `siteId`, erzwingt einen **Insert** einer neuen Website-spezifischen Reihe statt die Primären zu überschreiben. Der gleiche Fork-on-Mismatch gilt zum Website-Footer-Block |

:::info
**Was bleibt kirchenweit in v1 (eine bewusste Scoping-Wahl, keine Datenmodell-Grenze):** der **Blog** (`BlogPage` hat keinen Umschalter und lädt `/posts` ohne `siteId`), die **Website-Widgets** (Announcement-Banner + Launcher), **Weiterleitungen**, das **Logo / GA4 / Kircheneinstellungen** und das **Mitgliedschafts-Portal** (B1App-Mobil). Beachten Sie, dies ist *nicht* „alles von Erscheinungsbild" – eine sekundäre Website's Global-Styles (Palette, Schriften, Typographie, Abstand, Nav, Custom-CSS) **sind** Pro-Website über den Copy-on-Write-Pfad oben; nur die Banner-/Launcher-/Weiterleitungs-/Logo-Unter-Panels der Appearance-Seite bleiben kirchenweit.
:::

## Benutzerdefinierte Domains: Caddy-Edge (statischer Config-Plan)

:::info
**Richtung revidiert 2026-07-02.** Ein früherer Plan, um benutzerdefinierte Domain-Hosting auf Vercel-verwaltete Domains zu verschieben, wurde **abgebrochen**, und der ganze Vercel-Domain-Registrierungs-Code (`VercelHelper`, seine `vercelToken`/`vercelProjectId`/`vercelTeamId` Env-Vars, SSM-Params und Health-Einträge) wurde aus der Api entfernt. Der selbstverwaltete **Caddy-Proxy auf EC2 bleibt** als permanenter Custom-Domain-Edge. Die einzige verbleibende Arbeit ist intern: das Austauschen von Caddy's *Runtime* Admin-API-Konfiguration für einen *statischen* Config, der Neustarts überlebt.
:::

### Der Edge

Jede benutzerdefinierte Kirchendomain zeigt DNS auf ein EC2-Kästchen – `3.23.251.61`, auch erreichbar als `proxy.b1.church`. B1Admin's Einstellungen→Domains-Bildschirm instruiert Kirchen, einen Apex `A → 3.23.251.61` oder einen `CNAME → proxy.b1.church` hinzuzufügen. Caddy beendet TLS mit einem Pro-Domain Let's Encrypt-Zertifikat, schreibt den `Host`-Header auf die Website's `{sub}.b1.church`-Upstream um und Reverse-Proxies zu B1App – die dann es nach Host-Label wie jede native Subdomain routed (siehe [Benutzerdefinierte Domains](#benutzerdefinierte-domains) oben).

Die Upstream-Abbildung kommt aus `DomainRepo.loadPairs`, deren Dial **COALESCEs die zugewiesene Website's Subdomain**, daher proxies eine Domain zur korrekten *sekundären* Website, fällt zurück zur Primären der Kirche:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*`-Reihen sind von der Map ausgeschlossen; Caddy bedient `www.{host}` über eine `302`-Umleitung zum Apex stattdessen.

### Zwei anonyme Endpoints füttern den Edge

`DomainController` exponiert zwei unauthentifizierte, schreibgeschützte Endpoints, die das Kästchen direkt konsumiert – anonym notwendig, da der Edge sie abfragt, bevor ein Kirchenkontext existiert:

| Endpoint | Gibt zurück | Rolle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200`, wenn die Domain – oder, für einen `www.`-Miss, sein Bare-Apex – in `domains` existiert; `404` andernfalls (einschließlich einem leeren `domain`) | Caddy's **On-Demand-TLS `ask`**: die Missbrauch-Kontrol, die entscheidet, ob ein Cert für eingehende SNI ausgestellt wird |
| `GET /membership/domains/hostmap` | `text/plain`, eine sortierte `{domain} {sub}.b1.church`-Linie pro routable Domain | Die Host→Upstream-Map-Datei, die das Kästchen auf einem Timer auferfrischt |

`authorize` benutzt `DomainRepo.loadByName` wieder (exakter Host, dann ein einzelner `www.`→Apex-Retry); `hostmap` benutzt `loadPairs` wieder – daher ist es Website-bewusst und `www.*`-ausgeschlossen, identisch zu den Proxy-Routen – und entfernt einfach das `:443`-Suffix.

### Domain-Save/Delete – ein Best-Effort-Push

`DomainController.save` schreibt die `domains`-Reihen und macht dann einen **einzelnen Best-Effort**-`CaddyHelper.updateCaddy()`-Aufruf, umwickelt in einem `try/catch`, der protokolliert (`console.error`) und schluckt; `delete` macht dasselbe (das auch einen Prior-Stale-Route-on-Delete-Bug behoben hat), wie auch sekundäre Website-Löschung (`SiteController.delete`). `updateCaddy` ist selbst durch ein **10-Sekunden**-Axios-Timeout begrenzt, daher kann ein unerreichbarer oder gestoppter Caddy niemals einen Domain-Save `500` machen – die `domains`-Tabelle ist die Wahrheitsquelle.

### Aktueller Status – statischer Config, kein Runtime-Status

Das Kästchen (Windows EC2 hinter der permanenten Elastic-IP) läuft Caddy aus einem **statischen Caddyfile**: On-Demand-TLS, dessen `ask` auf `/membership/domains/authorize` zeigt, plus eine Host→Upstream-Map-Datei, die alle 5 Minuten aus `/membership/domains/hostmap` durch einen geplanten Task auferfrischt wird, der in einem gewaltigen `caddy reload` endet. Config überlebt Neustarts mit Null-Runtime-Status – keinen Re-Priming-Tanz – und ein unbekannter SNI wird **TLS-verweigert** (kein Zertifikat wird für einen Host gemünzt, den `authorize` ablehnt), während ein autorisierter-aber-nicht-noch-gemappter Host (eine brandneue Domain innerhalb des Sync-Fensters) einen sauberen 404 bekommt. Neue Domains werden innerhalb von ~5 Minuten nach einem Save routbar; ihre Zertifikate werden bei erstem Hit gemünzt. Build/Setup, Operationen und feldgetestete Gotchas: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Legacy-Runtime-Push – Rollback-Pfad, ausstehend Löschung

`CaddyHelper` (Membership-Modul) kann immer noch Caddy über seine **Admin-API** bei `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; No-Op wenn ungesetzt; exponiert unter `ServerHealthController`'s Integrations-Gruppe) fahren: `updateCaddy()` PATCHEs ein vollständiges Routes-Array, und `initializeCaddy()` + die `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy`-Endpoints bauen einen Runtime-konfigurierten Server von Grund auf. Config dieses Modus lebte nur in Caddy's Speicher – die Restart-Amnesie dieser Architektur ersetzte. Die Maschinerie bleibt alleinig als der Rollback-Pfad und ist für Löschung geplant, sobald das statische Kästchen stabil war; der Best-Effort-`updateCaddy()`-Push beim Domain-Save/Delete ist eine harmlose No-Op gegen das statische Kästchen (seine Admin-API ist nur Localhost).

## Verwandte Seiten

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) – das Edge-Kästchen selbst: Fresh-Box-Setup, WinSW-Service, Map-Sync-Task und operative Gotchas
- [Website Builder](./website-builder) – der Seiten-/Abschnitt-/Element-Baum, Renderer, Blog, SEO und KI-Generierung (was rendert, sobald eine Anfrage zu einer Kirche/Website aufgelöst wurde)
- [Content Endpoints](../api/endpoints/content) – die REST-Oberfläche für Seiten, Blöcke, Links und Global-Styles, alle jetzt `?siteId=`-bewusst
- [B1App](../web-apps/b1-app) – die Next.js-App, die die Middleware und `[sdSlug]`-Routing hostet
- [Web-App-Bereitstellung](../deployment/web-apps) – wie B1App zu Vercel bereitgestellt wird
