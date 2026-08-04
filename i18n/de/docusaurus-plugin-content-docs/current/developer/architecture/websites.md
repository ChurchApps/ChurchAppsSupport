---
title: "Website-Routing & Multi-Site"
---

# Website-Routing & Multi-Site

<div class="article-intro">

Eine einzelne Gemeinde kann jetzt mehr als eine eigenständige Website bedienen, und jede kann auf einer `*.b1.church`-Subdomain oder auf einer vollständig individuellen, gemeindeeigenen Domain liegen. Diese Seite bildet die Routing-Schicht ab, die *unterhalb* des Builders sitzt: wie eine eingehende Anfrage zu einer Gemeinde **und** zu einer bestimmten Website aufgelöst wird, das Multi-Site-Datenmodell (der `siteId`-Sentinel, der jede bereits bestehende Website unverändert rendern lässt), und die Edge für individuelle Domains — ein selbstverwalteter Caddy-Proxy auf EC2, der TLS terminiert und jede Gemeinde-Domain auf ihr `*.b1.church`-Upstream umschreibt. Was tatsächlich gerendert wird, sobald eine Anfrage aufgelöst ist — der Seiten-/Abschnitts-/Element-Baum — siehe [Website-Builder](./website-builder).

</div>

## Überblick

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

Drei Regeln gelten über diese Schicht:

1. **Ein Sentinel hält alles rückwärtskompatibel.** `siteId = ''` ist die primäre Website. Jede Seite, jeder Block, jeder Link, jeder globale Style und jede Domain-Zeile, die vor dieser Funktion existierte, trägt `''` und rendert exakt wie zuvor. Eine *zweite* Website ist einfach eine Menge von Zeilen mit einer nicht leeren `siteId`, und jeder ohne `?siteId=` aufgerufene Content-Endpunkt liefert die primäre Website — byte-für-byte die alte Anfrage.
2. **Die Auflösung basiert auf Host-Labels und konvergiert.** Eine `*.b1.church`-Subdomain routet direkt nach ihrem Host-Label; eine individuelle Domain wird an der Caddy-Edge auf ihr `{sub}.b1.church`-Label umgeschrieben, bevor B1App sie sieht (mit einem Middleware-DB-Lookup, das als Fallback einen `x-site`-Header für jeden rohen individuellen `Host` setzt). Beide Zweige landen bei derselben `[sdSlug]`-Route und demselben `churches/lookup`-Aufruf, sodass das nachgelagerte Rendering identisch ist.
3. **Die Caddy-Edge ist zustandslos über eine einzige Quelle der Wahrheit.** Individuelle Domains terminieren an einem selbstverwalteten Caddy-Proxy auf EC2, der jede Domain auf ihr `{sub}.b1.church`-Upstream umschreibt. Ein Domain-Speichern löst einen einzelnen Best-Effort-`CaddyHelper.updateCaddy()` aus, und Caddy liest die `domains`-Tabelle auch direkt (die `authorize`- und `hostmap`-Endpunkte unten). Die Tabelle ist maßgeblich — ein nicht erreichbares Caddy kann ein Speichern niemals scheitern lassen.

## Website-Auflösung

### `*.b1.church`-Subdomains

`B1App/next.config.mjs` schreibt eingehende Anfragen nach Host um. Eine Host-Regel mit dem Muster `(?<subdomain>.*?)\..*` erfasst das **erste Label** des Hosts und schreibt `/` und `/:path*` in `/{subdomain}` um — das `[sdSlug]`-App-Router-Segment. So wird `grace.b1.church/about` zu `/grace/about`.

Innerhalb von `src/app/[sdSlug]/` ruft `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` auf. Die Antwort von `ChurchController.getBySubDomain` hat jetzt zwei Zweige:

| Slug entspricht | Antwort | Bedeutung |
|--------------|----------|-----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primäre Website dieser Gemeinde |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Eine **sekundäre Website** — der Controller fällt auf `sites` zurück, löst die besitzende Gemeinde auf und gibt den angefragten Slug plus die zusätzliche `siteId` zurück |

Diese zusätzliche `siteId` ist das Einzige, was eine Anfrage einer sekundären Website von einer primären unterscheidet; alles andere in der Pipeline ist gemeinsam genutzt.

### Individuelle Domains

Eine gemeindeeigene Domain terminiert an der **Caddy-Edge** (unten im Detail), die den `Host`-Header auf das `{sub}.b1.church` der Website umschreibt, bevor sie an B1App weitergeleitet wird. Auf dem normalen Pfad erhält B1App also einen *internen* `*.b1.church`-Host und löst ihn genau wie eine native Subdomain nach Host-Label auf — der DB-Lookup der Middleware feuert nie. `src/middleware.ts` läuft weiterhin bei jeder Anfrage, aber mit einer immer aktiven Aufgabe und einem Fallback:

1. **Immer** — er **löscht jeden vom Client gelieferten `x-site`-Header**. Dieser Header ist manipulierbare Umschreib-Eingabe und wird nur vertraut, wenn die Middleware selbst ihn setzt; ihn zu entfernen ist die eigentliche Aufgabe der Middleware hinter Caddy.
2. **Fallback, nur nicht-interner `Host`** — für einen rohen individuellen-Domain-`Host`, der B1App *ohne* Caddys Umschreibung erreicht, ruft sie `GET /membership/domains/public/lookup/{host}` auf und setzt, falls das eine `subDomain` liefert, `x-site: {subDomain}.b1.church`. Hinter Caddy ist dieser Zweig inert, weil der `Host` bereits `*.b1.church` ist.

Interne Hosts — `localhost`, `b1.church` und die Suffixe `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — überspringen den Lookup vollständig (sie sind bereits durch die Host-Label-Umschreibung aufgelöst oder sind Preview-/Deploy-Hosts).

Der Lookup selbst (`DomainRepo.loadByName`) verknüpft `domains → churches` und `domains → sites` per LEFT JOIN und liefert `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — die Subdomain der zugewiesenen sekundären Website, falls die Domain auf eine zeigt, sonst die der Gemeinde. Er trifft zuerst den exakten Host; wenn dieser Host mit `www.` begann und verfehlte, wiederholt er **einmal** gegen die nackte Apex-Domain.

Zurück in `next.config.mjs` sind die `x-site`-Umschreibregeln **vor** den generischen Host-Regeln platziert, sodass sie gewinnen. `x-site: grace.b1.church` → erstes Label `grace` → `[sdSlug] = grace`, und von dort ist die Auflösung identisch zum Subdomain-Pfad (derselbe `churches/lookup`, dieselbe `siteId`).

:::info
Der `x-site`-Header ist von außen nicht vertrauenswürdig. Die Middleware entfernt bedingungslos jeden eingehenden `x-site`, bevor sie optional ihren eigenen setzt, und die Umschreibregeln sehen nur je den von der Middleware gesetzten Wert — ein Client kann sich nicht durch Senden eines Headers auf den Content einer anderen Gemeinde zwingen.
:::

Zwei betriebliche Details zur Middleware:

- **Cache.** Das Ergebnis jedes Hosts (ein Treffer *oder* ein bestätigter Fehltreffer — niemals ein Netzwerkfehler) wird für **10 Minuten** in einer In-Memory-`Map` pro serverlosem Isolate zwischengespeichert.
- **Matcher.** Der Matcher schließt bewusst `/sitemap.xml`, `/robots.txt` und `/manifest.webmanifest` wieder ein. Sein erstes Muster schließt Pfade mit Punkten aus, was diese Dateien sonst herausfallen ließe; sie werden zurückgeholt, damit die pro-Gemeinde-SEO-/PWA-Dateien einer individuellen Domain ebenfalls den `x-site`-Header erhalten.

### `siteId`-Durchreichung

`ConfigHelper` speichert die aufgelöste `siteId` auf seinem pro-Anfrage-`ConfigurationInterface` (memoisiert mit React `cache()`) und hängt `?siteId=` an die Content-Aufrufe an, die es und die Seitenkomponenten machen — **bedingt**: eine leere `siteId` (eine primäre Gemeinde-Subdomain) lässt den Parameter ganz weg. Die durchgereichten Endpunkte sind der Seitenbaum (`/content/pages/:id/tree`), die für die Sitemap verwendete öffentliche Seitenliste (`/content/pages/public/:id`), globale Styles (`/content/globalStyles/church/:id`), Navigationslinks (`/content/links/church/:id`) und der eigenständige Footer-Block (`/content/blocks/public/footer/:id`). Auf dem normalen Render-Pfad kommt der Footer innerhalb des Seitenbaums an (Abschnitte mit `zone: "siteFooter"` markiert), bereits mit `siteId` abgerufen, sodass es keine unabgegrenzte Footer-Lücke gibt.

Das Mitgliederportal (B1App `mobile`) steht absichtlich außerhalb davon: `loadChurchAppearance.ts` löst die Gemeinde über `churches/lookup` auf, liest aber gemeindeweite `/settings/public/{id}` und reicht `siteId` niemals durch — das Portal ist in v1 gemeindeweit (siehe unten).

## Mehrere Websites pro Gemeinde

### Datenmodell

Die neue `membership.sites`-Tabelle ist bewusst winzig:

| Spalte | Typ | Anmerkungen |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Besitzende Gemeinde |
| `name` | `varchar(255)` | Anzeigename (z. B. „Español", „Youth") |
| `subDomain` | `varchar(45)` | **Eindeutiger Index** — globaler Namensraum (unten) |

Die Website-Skopierung ist dann eine einzelne, nullable-freie Spalte, die den Content- und Domain-Tabellen hinzugefügt wird:

| Tabelle (Modul) | Spalte | `''` bedeutet |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain bedient die primäre Website |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primäre Website — und bei **`blocks`** bedeutet `''` zusätzlich *über alle Websites hinweg geteilt* |

Zwei Migrationen fügen all das hinzu (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Weil die Spalte standardmäßig `''` ist, behält jede bestehende Zeile das heutige Verhalten ohne Backfill bei.

**Globaler Subdomain-Namensraum.** `sites.subDomain` teilt sich *einen* Namensraum mit `churches.subDomain` — eine Website-Subdomain kann nie mit einer Gemeinde-Subdomain oder der einer anderen Website kollidieren. Das wird auf **beiden** Speicherpfaden erzwungen: `SiteController.save` lehnt einen Slug ab, der entweder `churches` oder `sites` trifft, und `ChurchController.validateSave` tut dasselbe umgekehrt. Ein eindeutiger Index auf `sites.subDomain` untermauert das auf Datenbankebene.

**Die Eindeutigkeit von Seiten** wurde von `(churchId, url)` auf `(churchId, siteId, url)` erweitert, sodass zwei Websites einer Gemeinde jeweils ihre eigene `/about` besitzen können.

### Content pro Website, mit Fallbacks

Jeder website-skopierte Content-**Listen-/Baum**-Endpunkt akzeptiert ein optionales `?siteId=` (fehlt ⇒ `''` = primär): Seitenbaum / -liste / öffentlich, Blöcke-Liste / nach Typ / Footer, Links (anonym / gefiltert / alle) und globale Styles. Abschnitte und Elemente sind *nicht* direkt skopiert — sie erben über ihre übergeordnete Seite oder ihren Block.

Zwei Auflösungsketten leisten die interessante Arbeit:

- **Globale Styles — `Website → primär → Standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` liefert die eigene Zeile der Website; hat eine sekundäre Website keine, liefert es die **primäre (`''`) Zeile unverändert** (behält die `id`/`siteId` der primären, die der Client für Copy-on-Write nutzt); gibt es auch keine primäre, liefert `GlobalStyleController` eine fest codierte Standardpalette/-schriftarten.
- **Footer-Block — website-spezifisch gewinnt, geteilt fällt zurück.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` liefert die geteilten (`''`) *und* die website-spezifischen Zeilen; der Resolver wählt den eigenen Footer der Website, falls vorhanden, sonst den geteilten. Dieselbe Logik läuft sowohl in `TreeHelper.insertBlocks` (Seitenbaum) als auch im eigenständigen `/content/blocks/public/footer/:churchId`-Endpunkt.

### Kaskade beim Löschen einer Website

`SiteController.delete` (abgesichert durch die Membership-Berechtigung Settings→Edit) baut eine sekundäre Website in drei Schritten ab:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadiert allen Content, den die Website besitzt: ihre **Seiten** → deren Abschnitte, Elemente, `pageHistory` und `posts`; ihre eigenen **Blöcke** → deren Abschnitte, Elemente und `pageHistory`; ihre **Links** und **globalStyles**. Eine Schutzmaßnahme verweigert die Ausführung für `''` — der primäre/geteilte Sentinel wird nie kaskadiert.
2. `DomainRepo.clearSiteId` **weist** die Domains der Website der primären zu (`siteId → ''`), statt sie zu löschen, sodass eine individuelle Domain eine Website-Löschung überlebt.
3. Die `sites`-Zeile wird gelöscht, und die Caddy-Routen werden neu synchronisiert (Best-Effort).

### B1Admin-Oberfläche

| Fähigkeit | Wo | Mechanismus |
|-----------|-------|-----------|
| Website-Umschalter | `useSiteSelection` + `SiteSwitcher` (leer = „Hauptwebsite") | Liest einen `?site=`-URL-Parameter und reicht ihn als `?siteId=` in ContentApi-Aufrufe durch. Vorhanden auf den drei Website-**Listen**-Bereichen — **Seiten**, **Blöcke**, **Erscheinungsbild** — aber *nicht* den Seiten-/Block-Editoren, die `siteId` auf dem Datensatz tragen |
| Websites erstellen/löschen | `SitesDialog`, geöffnet über den Eintrag „Websites verwalten…" des Umschalters | `POST /membership/sites` / `DELETE /membership/sites/:id` (Name + Subdomain). Abgesichert durch die Membership-Berechtigung Settings→Edit (`Permissions.settings.edit` serverseitig; `Permissions.membershipApi.settings.edit` in B1Admin). **Nur Erstellen/Löschen — es gibt in v1 keine Umbenennen-UI** |
| Website-Zuweisung pro Domain | `DomainSettingsEdit` unter Settings→Domains | Ein Website-Dropdown pro Zeile sendet `siteId` pro Domain an `/membership/domains`. Die Spalte verbirgt sich, wenn die API keine Websites zurückgibt (älteres Backend) |
| Copy-on-Write-Styles | `StylesManager.prepareForSave` | Wenn die `siteId` der geladenen Global-Style-Zeile nicht mit der ausgewählten Website übereinstimmt (d. h. die API hat die geerbte primäre als Fallback zurückgegeben), verwirft es die `id` der primären und stempelt die aktuelle `siteId`, wodurch ein **Insert** einer neuen website-spezifischen Zeile erzwungen wird, statt die primäre zu überschreiben. Dieselbe Verzweigung bei Nichtübereinstimmung gilt für den Website-Footer-Block |

:::info
**Was in v1 gemeindeweit bleibt (eine bewusste Skopierungsentscheidung, keine Datenmodell-Grenze):** der **Blog** (`BlogPage` hat keinen Umschalter und lädt `/posts` ohne `siteId`), die **Website-Widgets** (Ankündigungsbanner + Launcher), **Weiterleitungen**, das **Logo / GA4 / Gemeindeeinstellungen** und das **Mitgliederportal** (B1App mobile). Beachte, dass das *nicht* „das gesamte Erscheinungsbild" bedeutet — die globalen Styles einer sekundären Website (Palette, Schriftarten, Typografie, Abstände, Navigation, individuelles CSS) **sind** über den obigen Copy-on-Write-Pfad pro Website; nur die Unterbereiche Banner/Launcher/Weiterleitungen/Logo der Erscheinungsbild-Seite bleiben gemeindeweit.
:::

## Individuelle Domains: Caddy-Edge (Plan mit statischer Konfiguration)

:::info
**Richtung überarbeitet am 02.07.2026.** Ein früherer Plan, das Hosting individueller Domains auf von Vercel verwaltete Domains zu verlagern, wurde **abgesagt**, und der gesamte Vercel-Domain-Registrierungscode (`VercelHelper`, seine `vercelToken`-/`vercelProjectId`-/`vercelTeamId`-Umgebungsvariablen, SSM-Parameter und Health-Einträge) wurde aus der Api entfernt. Der selbstverwaltete **Caddy-Proxy auf EC2 bleibt** als dauerhafte Edge für individuelle Domains. Die einzige verbleibende Arbeit ist intern: Caddys *Laufzeit*-Admin-API-Konfiguration gegen eine *statische* Konfiguration auszutauschen, die Neustarts übersteht.
:::

### Die Edge

Jede individuelle Gemeinde-Domain zeigt per DNS auf eine einzelne EC2-Box — `3.23.251.61`, auch erreichbar als `proxy.b1.church`. Der Settings→Domains-Bildschirm von B1Admin weist Gemeinden an, ein Apex `A → 3.23.251.61` oder ein `CNAME → proxy.b1.church` hinzuzufügen. Caddy terminiert TLS mit einem Let's-Encrypt-Zertifikat pro Domain, schreibt den `Host`-Header auf das `{sub}.b1.church`-Upstream der Domain um und leitet per Reverse-Proxy an B1App weiter — das es dann nach Host-Label routet wie jede native Subdomain (siehe [Individuelle Domains](#individuelle-domains) oben).

Die Upstream-Zuordnung kommt aus `DomainRepo.loadPairs`, dessen Wahl **die Subdomain der zugewiesenen Website per COALESCE** ermittelt, sodass eine Domain zur richtigen *sekundären* Website proxyt und auf die primäre der Gemeinde zurückfällt:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*`-Zeilen sind von der Zuordnung ausgeschlossen; Caddy bedient `www.{host}` stattdessen über eine `302`-Weiterleitung auf den Apex.

### Zwei anonyme Endpunkte speisen die Edge

`DomainController` stellt zwei nicht authentifizierte, schreibgeschützte Endpunkte bereit, die die Box direkt konsumiert — anonym aus Notwendigkeit, da die Edge sie abfragt, bevor irgendein Gemeindekontext existiert:

| Endpunkt | Liefert | Rolle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200`, wenn die Domain — oder bei einem `www.`-Fehltreffer ihre nackte Apex-Domain — in `domains` existiert; sonst `404` (einschließlich einer leeren `domain`) | Caddys **On-Demand-TLS-`ask`**: die Missbrauchskontrolle, die entscheidet, ob für eine eingehende SNI ein Zertifikat ausgestellt wird |
| `GET /membership/domains/hostmap` | `text/plain`, eine sortierte `{domain} {sub}.b1.church`-Zeile pro routbarer Domain | Die Host→Upstream-Zuordnungsdatei, die die Box auf einem Timer aktualisiert |

`authorize` nutzt `DomainRepo.loadByName` erneut (exakter Host, dann ein einmaliger `www.`→Apex-Retry); `hostmap` nutzt `loadPairs` erneut — ist also website-bewusst und `www.*`-ausgeschlossen, identisch zu den Proxy-Routen — und entfernt nur das `:443`-Suffix.

### Domain speichern/löschen — ein Best-Effort-Push

`DomainController.save` schreibt die `domains`-Zeilen und macht dann einen **einzelnen Best-Effort**-Aufruf von `CaddyHelper.updateCaddy()`, eingehüllt in ein `try/catch`, das protokolliert (`console.error`) und verschluckt; `delete` tut dasselbe (was auch einen früheren Bug mit veralteten Routen beim Löschen behob), ebenso das Löschen einer sekundären Website (`SiteController.delete`). `updateCaddy` selbst ist durch ein **10s**-Axios-Timeout begrenzt, sodass ein nicht erreichbares oder gestopptes Caddy niemals ein Domain-Speichern mit `500` scheitern lassen kann — die `domains`-Tabelle ist die maßgebliche Quelle.

### Aktueller Zustand — statische Konfiguration, kein Laufzeitzustand

Die Box (Windows EC2 hinter der dauerhaften Elastic IP) betreibt Caddy von einem **statischen Caddyfile**: On-Demand-TLS, dessen `ask` auf `/membership/domains/authorize` zeigt, plus eine Host→Upstream-Zuordnungsdatei, die alle 5 Minuten aus `/membership/domains/hostmap` durch eine geplante Aufgabe aktualisiert wird, die mit einem geordneten `caddy reload` endet. Die Konfiguration übersteht Neustarts mit null Laufzeitzustand — kein erneutes Aufwärm-Tänzchen — und eine unbekannte SNI wird **TLS-abgelehnt** (kein Zertifikat wird für einen Host geprägt, den `authorize` ablehnt), während ein autorisierter, aber noch nicht zugeordneter Host (eine brandneue Domain innerhalb des Sync-Fensters) ein sauberes 404 erhält. Neue Domains werden innerhalb von ~5 Minuten nach einem Speichern routbar; ihre Zertifikate werden beim ersten Treffer geprägt. Build/Setup, Betrieb und im Feld getestete Fallstricke: [Caddy-Proxy für individuelle Domains](../deployment/caddy-proxy).

### Legacy-Laufzeit-Push — Rollback-Pfad, zur Löschung vorgesehen

`CaddyHelper` (Membership-Modul) kann Caddy weiterhin über seine **Admin-API** unter `caddyHost:caddyPort` steuern (SSM `caddyHost`/`caddyPort`; No-op, wenn nicht gesetzt; sichtbar unter der Integrations-Gruppe von `ServerHealthController`): `updateCaddy()` PATCHt ein vollständiges Routen-Array, und `initializeCaddy()` + die Endpunkte `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bauen einen zur Laufzeit konfigurierten Server von Grund auf neu. Die Konfiguration dieses Modus lebte nur im Speicher von Caddy — die Neustart-Amnesie, die diese Architektur ersetzt hat. Die Maschinerie bleibt ausschließlich als Rollback-Pfad bestehen und ist zur Löschung vorgesehen, sobald sich die statische Box als stabil erwiesen hat; der Best-Effort-`updateCaddy()`-Push beim Domain-Speichern/-Löschen ist gegen die statische Box ein harmloses No-op (ihre Admin-API ist nur lokal erreichbar).

## Verwandte Seiten

- [Caddy-Proxy für individuelle Domains](../deployment/caddy-proxy) — die Edge-Box selbst: Ersteinrichtung, WinSW-Dienst, Zuordnungs-Sync-Aufgabe und betriebliche Fallstricke
- [Website-Builder](./website-builder) — der Seiten-/Abschnitts-/Element-Baum, Renderer, Blog, SEO und KI-Generierung (was gerendert wird, sobald eine Anfrage zu einer Gemeinde/Website aufgelöst ist)
- [Content-Endpunkte](../api/endpoints/content) — die REST-Oberfläche für Seiten, Blöcke, Links und globale Styles, jetzt alle `?siteId=`-bewusst
- [B1App](../web-apps/b1-app) — die Next.js-App, die die Middleware und das `[sdSlug]`-Routing hostet
- [Web-App-Deployment](../deployment/web-apps) — wie B1App auf Vercel bereitgestellt wird
