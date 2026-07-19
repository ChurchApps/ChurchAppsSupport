---
title: "Website-Routing & Multi-Site"
---

# Website-Routing & Multi-Site

<div class="article-intro">

Eine einzelne Kirche kann jetzt mehr als eine eigenständige Website bereitstellen, und jede kann entweder auf einer `*.b1.church`-Subdomain oder auf einer vollständig eigenen, kirchen­eigenen Domain laufen. Diese Seite bildet die Routing-Schicht ab, die *unterhalb* des Builders liegt: wie eine eingehende Anfrage zu einer Kirche **und** zu einer bestimmten Site aufgelöst wird, das Multi-Site-Datenmodell (das `siteId`-Sentinel, das dafür sorgt, dass jede bereits existierende Site unverändert weiterläuft), und die Custom-Domain-Kante — ein selbstverwalteter Caddy-Proxy auf EC2, der TLS terminiert und jede Kirchen-Domain auf ihr `*.b1.church`-Upstream umschreibt. Was tatsächlich gerendert wird, sobald eine Anfrage aufgelöst wurde — der Seiten-/Abschnitts-/Element-Baum — siehe [Website-Builder](./website-builder).

</div>

## Überblick

```
   grace.b1.church              www.gracechurch.org  (eigene Domain)
   (b1.church-Subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy-Kante — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminiert TLS (per-Domain LE-Zertifikat) │
          │             │  • schreibt Host → {sub}.b1.church um     │
          │             │  • reverse-proxied zu B1App                │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • immer: löscht jedes client-übergebene x-site (Anti-Spoof) │
   │  • interner *.b1.church-Host ⇒ Domains-Lookup bleibt inaktiv │
   │  • roher Custom-Host (umgeht Caddy) ⇒ Lookup → setzt x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → erstes Host-Label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   fädelt ?siteId= in jeden Content-Aufruf ein:   │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  Domain speichern/löschen (B1Admin Einstellungen→Domains → POST /membership/domains)
        └─ Best-Effort CaddyHelper.updateCaddy()  (abgesichert, nicht-fatal, 10s Timeout)
  Caddy liest die domains-Tabelle selbst über zwei anonyme Endpunkte:
        GET /membership/domains/authorize  — On-Demand-TLS `ask` (200 bekannt / 404 unbekannt)
        GET /membership/domains/hostmap    — Host→{sub}.b1.church-Map (5-Min-Refresh)
```

Drei Regeln gelten durchgängig für diese Schicht:

1. **Ein Sentinel hält alles abwärtskompatibel.** `siteId = ''` ist die primäre Site. Jede Page-, Block-, Link-, Global-Style- und Domain-Zeile, die vor diesem Feature existierte, trägt `''` und rendert exakt wie zuvor. Eine *zweite* Website ist einfach eine Menge von Zeilen mit einer nicht-leeren `siteId`, und jeder Content-Endpunkt, der ohne `?siteId=` aufgerufen wird, liefert die primäre Site zurück — Byte für Byte die alte Anfrage.
2. **Auflösung erfolgt anhand des Host-Labels und konvergiert.** Eine `*.b1.church`-Subdomain routet direkt über ihr Host-Label; eine eigene Domain wird an der Caddy-Kante auf ihr `{sub}.b1.church`-Label umgeschrieben, bevor B1App sie sieht (mit einem Middleware-DB-Lookup, der als Fallback für jeden rohen Custom-`Host` einen `x-site`-Header setzt). Beide Pfade landen auf derselben `[sdSlug]`-Route und demselben `churches/lookup`-Aufruf, sodass das nachgelagerte Rendering identisch ist.
3. **Die Caddy-Kante ist zustandslos über eine einzige Quelle der Wahrheit.** Eigene Domains terminieren an einem selbstverwalteten Caddy-Proxy auf EC2, der jede Domain auf ihr `{sub}.b1.church`-Upstream umschreibt. Ein Domain-Save löst einen einzigen Best-Effort-`CaddyHelper.updateCaddy()`-Aufruf aus, und Caddy liest die `domains`-Tabelle auch direkt (die unten beschriebenen `authorize`- und `hostmap`-Endpunkte). Die Tabelle ist maßgeblich — ein nicht erreichbares Caddy kann einen Save niemals scheitern lassen.

## Site-Auflösung

### `*.b1.church`-Subdomains

`B1App/next.config.mjs` schreibt eingehende Anfragen anhand des Hosts um. Eine Host-Regel mit dem Muster `(?<subdomain>.*?)\..*` erfasst das **erste Label** des Hosts und schreibt `/` sowie `/:path*` nach `/{subdomain}` um — das `[sdSlug]`-App-Router-Segment. Aus `grace.b1.church/about` wird also `/grace/about`.

Innerhalb von `src/app/[sdSlug]/` ruft `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` auf. Die Antwort von `ChurchController.getBySubDomain` hat jetzt zwei Zweige:

| Slug passt auf | Antwort | Bedeutung |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Primäre Site dieser Kirche |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Eine **sekundäre Site** — der Controller fällt zurück auf `sites`, löst die zugehörige Kirche auf und gibt den angefragten Slug plus die zusätzliche `siteId` zurück |

Diese zusätzliche `siteId` ist das Einzige, was eine Sekundär-Site-Anfrage von einer primären unterscheidet; alles andere in der Pipeline ist gemeinsam genutzt.

### Eigene Domains

Eine kircheneigene Domain terminiert an der **Caddy-Kante** (weiter unten im Detail), die den `Host`-Header auf das `{sub}.b1.church` der Site umschreibt, bevor sie zu B1App weiterproxied. Auf dem normalen Pfad erhält B1App also einen *internen* `*.b1.church`-Host und löst ihn genau wie eine native Subdomain über das Host-Label auf — der DB-Lookup der Middleware feuert nie. `src/middleware.ts` läuft weiterhin bei jeder Anfrage, aber mit einer immer-aktiven Aufgabe und einem Fallback:

1. **Immer** — sie **löscht jeden client-übergebenen `x-site`-Header**. Dieser Header ist spoofbare Rewrite-Eingabe und wird nur vertraut, wenn die Middleware ihn selbst setzt; ihn zu entfernen ist die eigentliche Aufgabe der Middleware hinter Caddy.
2. **Fallback, nur nicht-interner `Host`** — für einen rohen Custom-Domain-`Host`, der B1App *ohne* Caddys Umschreibung erreicht, ruft sie `GET /membership/domains/public/lookup/{host}` auf und setzt, falls das eine `subDomain` zurückliefert, `x-site: {subDomain}.b1.church`. Hinter Caddy ist dieser Zweig inaktiv, weil der `Host` bereits `*.b1.church` ist.

Interne Hosts — `localhost`, `b1.church` sowie die Suffixe `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — überspringen den Lookup vollständig (sie sind bereits durch das Host-Label-Rewrite aufgelöst oder sind Preview-/Deploy-Hosts).

Der Lookup selbst (`DomainRepo.loadByName`) verbindet `domains → churches` und `domains → sites` per Left-Join und liefert `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — die Subdomain der zugewiesenen sekundären Site, falls die Domain auf eine zeigt, andernfalls die der Kirche. Zuerst wird der exakte Host abgeglichen; begann dieser Host mit `www.` und schlug fehl, wird **einmal** gegen die reine Apex-Domain erneut versucht.

Zurück in `next.config.mjs` stehen die `x-site`-Rewrite-Regeln **vor** den generischen Host-Regeln, sodass sie gewinnen. `x-site: grace.b1.church` → erstes Label `grace` → `[sdSlug] = grace`, und von dort ist die Auflösung identisch zum Subdomain-Pfad (derselbe `churches/lookup`, dieselbe `siteId`).

:::info
Der `x-site`-Header ist von außen nicht vertrauenswürdig. Die Middleware entfernt jeden eingehenden `x-site` bedingungslos, bevor sie optional ihren eigenen setzt, und die Rewrite-Regeln sehen nur jemals den von der Middleware gesetzten Wert — ein Client kann sich durch Senden eines Headers nicht auf den Content einer anderen Kirche aufzwingen.
:::

Zwei Betriebsdetails zur Middleware:

- **Cache.** Das Ergebnis jedes Hosts (ein Treffer *oder* ein bestätigter Fehltreffer — nie ein Netzwerkfehler) wird **10 Minuten** lang in einer In-Memory-`Map` pro Serverless-Isolate zwischengespeichert.
- **Matcher.** Der Matcher schließt `/sitemap.xml`, `/robots.txt` und `/manifest.webmanifest` absichtlich wieder ein. Sein erstes Muster schließt gepunktete Pfade aus, was diese Dateien sonst ausschließen würde; sie werden wieder hinzugefügt, damit auch die per-Kirche-SEO-/PWA-Dateien einer eigenen Domain den `x-site`-Header erhalten.

### `siteId`-Durchreichung

`ConfigHelper` speichert die aufgelöste `siteId` in seinem per-Request `ConfigurationInterface` (memoized mit React `cache()`) und hängt `?siteId=` an die Content-Aufrufe an, die es selbst und die Seitenkomponenten tätigen — **bedingt**: eine leere `siteId` (eine primäre Kirchen-Subdomain) lässt den Parameter ganz weg. Die durchgereichten Endpunkte sind der Seitenbaum (`/content/pages/:id/tree`), die öffentliche Seitenliste für die Sitemap (`/content/pages/public/:id`), globale Styles (`/content/globalStyles/church/:id`), Nav-Links (`/content/links/church/:id`) und der eigenständige Footer-Block (`/content/blocks/public/footer/:id`). Auf dem normalen Render-Pfad kommt der Footer bereits innerhalb des Seitenbaums an (Abschnitte mit `zone: "siteFooter"` markiert), bereits mit `siteId` abgerufen, sodass es keine ungebundene Footer-Lücke gibt.

Das Mitglieder-Portal (B1App `mobile`) steht absichtlich außerhalb davon: `loadChurchAppearance.ts` löst die Kirche über `churches/lookup` auf, liest aber kirchen­weite `/settings/public/{id}` und fädelt niemals `siteId` durch — das Portal ist in v1 kirchen­weit (siehe unten).

## Mehrere Websites pro Kirche

### Datenmodell

Die neue Tabelle `membership.sites` ist absichtlich winzig:

| Spalte | Typ | Anmerkungen |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Besitzende Kirche |
| `name` | `varchar(255)` | Anzeigename (z. B. „Español“, „Youth“) |
| `subDomain` | `varchar(45)` | **Eindeutiger Index** — globaler Namensraum (siehe unten) |

Site-Scoping ist dann eine einzelne, nicht-null-freie Spalte, die den Content- und Domain-Tabellen hinzugefügt wird:

| Tabelle (Modul) | Spalte | `''` bedeutet |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain bedient die primäre Site |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Primäre Site — und bei **`blocks`** bedeutet `''` zusätzlich *über alle Sites hinweg geteilt* |

Zwei Migrationen fügen das alles hinzu (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Da die Spalte standardmäßig auf `''` steht, behält jede bestehende Zeile ihr heutiges Verhalten ohne Backfill bei.

**Globaler Subdomain-Namensraum.** `sites.subDomain` teilt sich *einen* Namensraum mit `churches.subDomain` — eine Site-Subdomain kann niemals mit einer Kirchen-Subdomain oder der einer anderen Site kollidieren. Das wird auf **beiden** Speicherpfaden erzwungen: `SiteController.save` lehnt einen Slug ab, der entweder auf `churches` oder `sites` trifft, und `ChurchController.validateSave` tut dasselbe umgekehrt. Ein eindeutiger Index auf `sites.subDomain` sichert das auf Datenbankebene ab.

**Eindeutigkeit von Pages** wurde von `(churchId, url)` auf `(churchId, siteId, url)` erweitert, sodass zwei Sites einer Kirche jeweils ihre eigene `/about` besitzen können.

### Site-spezifischer Content, mit Fallbacks

Jeder site-gebundene Content-**Listen-/Baum**-Endpunkt akzeptiert ein optionales `?siteId=` (fehlt ⇒ `''` = primär): Seitenbaum / -liste / öffentlich, Blöcke Liste / nach Typ / Footer, Links (anonym / gefiltert / alle) und globale Styles. Abschnitte und Elemente sind *nicht* direkt gescoped — sie erben über ihre übergeordnete Seite oder ihren Block.

Zwei Auflösungsketten übernehmen die interessante Arbeit:

- **Globale Styles — `Site → primär → Standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` liefert die eigene Zeile der Site zurück; hat eine sekundäre Site keine, liefert es die **primäre (`''`) Zeile unverändert** zurück (behält deren `id`/`siteId`, die der Client für Copy-on-Write nutzt); gibt es auch keine primäre, liefert `GlobalStyleController` eine fest codierte Standard-Palette/-Schriftarten. 
- **Footer-Block — site-spezifisch gewinnt, geteilt als Fallback.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` liefert sowohl die geteilte (`''`) *als auch* die site-spezifischen Zeilen zurück; der Resolver wählt den eigenen Footer der Site, falls vorhanden, sonst den geteilten. Dieselbe Logik läuft sowohl in `TreeHelper.insertBlocks` (Seitenbaum) als auch im eigenständigen `/content/blocks/public/footer/:churchId`-Endpunkt.

### Site-Löschkaskade

`SiteController.delete` (abgesichert über die membership-Berechtigung Einstellungen→Bearbeiten) baut eine sekundäre Site in drei Schritten ab:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaskadiert den gesamten Content, den die Site besitzt: ihre **Seiten** → deren Abschnitte, Elemente, `pageHistory` und `posts`; ihre eigenen **Blöcke** → deren Abschnitte, Elemente und `pageHistory`; ihre **Links** und **globalStyles**. Eine Schutzklausel verweigert die Ausführung für `''` — das primäre/geteilte Sentinel wird nie kaskadiert.
2. `DomainRepo.clearSiteId` **weist** die Domains der Site der primären Site wieder zu (`siteId → ''`), statt sie zu löschen, sodass eine eigene Domain eine Site-Löschung übersteht.
3. Die `sites`-Zeile wird gelöscht und die Caddy-Routen werden neu synchronisiert (Best-Effort).

### B1Admin-Oberfläche

| Funktion | Wo | Mechanismus |
|-----------|-------|-----------|
| Site-Umschalter | `useSiteSelection` + `SiteSwitcher` (leer = „Hauptwebsite“) | Liest einen `?site=`-URL-Parameter und reicht ihn als `?siteId=` in ContentApi-Aufrufe durch. Vorhanden auf den drei Site-**Listen**-Bereichen — **Seiten**, **Blöcke**, **Erscheinungsbild** — aber *nicht* in den Seiten-/Block-Editoren, die `siteId` am Datensatz tragen |
| Sites erstellen/löschen | `SitesDialog`, geöffnet über den Eintrag „Websites verwalten…“ im Umschalter | `POST /membership/sites` / `DELETE /membership/sites/:id` (Name + subDomain). Abgesichert über die membership-Berechtigung Einstellungen→Bearbeiten (`Permissions.settings.edit` serverseitig; `Permissions.membershipApi.settings.edit` in B1Admin). **Nur Erstellen/Löschen — es gibt in v1 keine Umbenennen-UI** |
| Per-Domain-Site-Zuweisung | `DomainSettingsEdit` unter Einstellungen→Domains | Ein Dropdown pro Zeile sendet `siteId` pro Domain an `/membership/domains`. Die Spalte wird ausgeblendet, wenn die API keine Sites zurückliefert (älteres Backend) |
| Copy-on-Write-Styles | `StylesManager.prepareForSave` | Wenn die `siteId` der geladenen Global-Style-Zeile nicht mit der ausgewählten Site übereinstimmt (d. h. die API hat die geerbte primäre Zeile als Fallback zurückgegeben), verwirft es die `id` der primären Zeile und prägt die aktuelle `siteId` ein, wodurch ein **Insert** einer neuen site-spezifischen Zeile erzwungen wird, statt die primäre zu überschreiben. Dieselbe Fork-bei-Abweichung-Logik gilt für den Site-Footer-Block |

:::info
**Was in v1 kirchen­weit bleibt (eine bewusste Scoping-Entscheidung, keine Einschränkung des Datenmodells):** der **Blog** (`BlogPage` hat keinen Umschalter und lädt `/posts` ohne `siteId`), die **Site-Widgets** (Ankündigungsbanner + Launcher), **Redirects**, das **Logo / GA4 / Kircheneinstellungen** und das **Mitglieder-Portal** (B1App mobile). Zu beachten: Das ist *nicht* „das gesamte Erscheinungsbild“ — die globalen Styles einer sekundären Site (Palette, Schriftarten, Typografie, Abstände, Navigation, Custom CSS) **sind** über den oben beschriebenen Copy-on-Write-Pfad per-Site; nur die Banner-/Launcher-/Redirects-/Logo-Unterbereiche der Erscheinungsbild-Seite bleiben kirchen­weit.
:::

## Eigene Domains: Caddy-Kante (Static-Config-Plan)

:::info
**Richtung überarbeitet am 2026-07-02.** Ein früherer Plan, das Hosting eigener Domains auf Vercel-verwaltete Domains umzustellen, wurde **abgesagt**, und der gesamte Vercel-Domain-Registrierungscode (`VercelHelper`, seine `vercelToken`/`vercelProjectId`/`vercelTeamId`-Umgebungsvariablen, SSM-Parameter und Health-Einträge) wurde aus der Api entfernt. Der selbstverwaltete **Caddy-Proxy auf EC2 bleibt** die dauerhafte Custom-Domain-Kante. Die einzige verbleibende Arbeit ist intern: den Wechsel von Caddys *Laufzeit*-Admin-API-Konfiguration auf eine *statische* Konfiguration, die Neustarts übersteht.
:::

### Die Kante

Jede eigene Kirchen-Domain zeigt per DNS auf eine einzige EC2-Box — `3.23.251.61`, auch erreichbar als `proxy.b1.church`. B1Admins Einstellungen→Domains-Bildschirm weist Kirchen an, eine Apex-`A → 3.23.251.61` oder einen `CNAME → proxy.b1.church` hinzuzufügen. Caddy terminiert TLS mit einem per-Domain-Let's-Encrypt-Zertifikat, schreibt den `Host`-Header auf das `{sub}.b1.church`-Upstream der Domain um und reverse-proxied zu B1App — das die Anfrage dann anhand des Host-Labels routet wie jede native Subdomain (siehe [Eigene Domains](#eigene-domains) oben).

Das Upstream-Mapping stammt aus `DomainRepo.loadPairs`, dessen Dial **die Subdomain der zugewiesenen Site per COALESCE bestimmt**, sodass eine Domain zur korrekten *sekundären* Site proxied, mit Rückfall auf die primäre Site der Kirche:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*`-Zeilen sind von der Map ausgeschlossen; Caddy bedient `www.{host}` stattdessen über eine `302`-Weiterleitung zum Apex.

### Zwei anonyme Endpunkte speisen die Kante

`DomainController` stellt zwei unauthentifizierte, nur lesende Endpunkte bereit, die die Box direkt konsumiert — anonym aus Notwendigkeit, da die Kante sie abfragt, bevor irgendein Kirchenkontext existiert:

| Endpunkt | Liefert | Rolle |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200`, falls die Domain — oder bei einem `www.`-Fehltreffer ihr reiner Apex — in `domains` existiert; sonst `404` (auch bei leerer `domain`) | Caddys **On-Demand-TLS-`ask`**: die Missbrauchskontrolle, die entscheidet, ob ein Zertifikat für eine eingehende SNI ausgestellt wird |
| `GET /membership/domains/hostmap` | `text/plain`, eine sortierte `{domain} {sub}.b1.church`-Zeile pro routbarer Domain | Die Host→Upstream-Map-Datei, die die Box regelmäßig auffrischt |

`authorize` nutzt `DomainRepo.loadByName` wieder (exakter Host, dann ein einzelner `www.`→Apex-Retry); `hostmap` nutzt `loadPairs` wieder — ist also site-bewusst und `www.*`-ausgeschlossen, identisch zu den Proxy-Routen — und entfernt nur das `:443`-Suffix.

### Domain speichern/löschen — ein Best-Effort-Push

`DomainController.save` schreibt die `domains`-Zeilen und macht dann einen **einzigen Best-Effort**-`CaddyHelper.updateCaddy()`-Aufruf, eingepackt in ein `try/catch`, das loggt (`console.error`) und schluckt; `delete` tut dasselbe (was auch einen früheren Bug mit veralteten Routen beim Löschen behoben hat), ebenso die Löschung sekundärer Sites (`SiteController.delete`). `updateCaddy` selbst ist durch ein **10s**-Axios-Timeout begrenzt, sodass ein nicht erreichbares oder gestopptes Caddy einen Domain-Save niemals mit `500` scheitern lassen kann — die `domains`-Tabelle ist die Quelle der Wahrheit.

### Aktueller Stand — statische Konfiguration, kein Laufzeit-Zustand

Die Box (Windows EC2 hinter der permanenten Elastic IP) betreibt Caddy über eine **statische Caddyfile**: On-Demand-TLS, dessen `ask` auf `/membership/domains/authorize` zeigt, plus eine Host→Upstream-Map-Datei, die alle 5 Minuten von `/membership/domains/hostmap` durch einen geplanten Task aufgefrischt wird, der mit einem sanften `caddy reload` endet. Die Konfiguration übersteht Neustarts mit null Laufzeit-Zustand — kein Re-Priming-Tanz — und eine unbekannte SNI wird **TLS-abgelehnt** (kein Zertifikat wird für einen Host geprägt, den `authorize` ablehnt), während ein autorisierter, aber noch nicht gemappter Host (eine brandneue Domain innerhalb des Sync-Fensters) ein sauberes 404 erhält. Neue Domains werden innerhalb von ~5 Minuten nach einem Save routbar; ihre Zertifikate werden beim ersten Zugriff geprägt. Build/Setup, Betrieb und im Feld gefundene Fallstricke: [Caddy-Custom-Domain-Proxy](../deployment/caddy-proxy).

### Legacy-Laufzeit-Push — Rollback-Pfad, zur Löschung vorgesehen

`CaddyHelper` (membership-Modul) kann Caddy weiterhin über seine **Admin-API** unter `caddyHost:caddyPort` steuern (SSM `caddyHost`/`caddyPort`; No-Op, wenn nicht gesetzt; sichtbar unter der Integrations-Gruppe von `ServerHealthController`): `updateCaddy()` PATCHt ein vollständiges Routen-Array, und `initializeCaddy()` + die Endpunkte `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bauen einen laufzeit-konfigurierten Server von Grund auf neu auf. Die Konfiguration dieses Modus lebte nur im Speicher von Caddy — das Neustart-Amnesie-Problem, das diese Architektur ersetzt hat. Die Mechanik bleibt ausschließlich als Rollback-Pfad bestehen und ist zur Löschung vorgesehen, sobald sich die statische Box als stabil erwiesen hat; der Best-Effort-`updateCaddy()`-Push beim Domain-Save/-Delete ist gegen die statische Box ein harmloses No-Op (ihre Admin-API ist nur lokal erreichbar).

## Verwandte Seiten

- [Caddy-Custom-Domain-Proxy](../deployment/caddy-proxy) — die Kanten-Box selbst: Einrichtung einer neuen Box, WinSW-Dienst, Map-Sync-Task und betriebliche Fallstricke
- [Website-Builder](./website-builder) — der Seiten-/Abschnitts-/Element-Baum, Renderer, Blog, SEO und KI-Generierung (was gerendert wird, sobald eine Anfrage zu einer Kirche/Site aufgelöst wurde)
- [Content-Endpunkte](../api/endpoints/content) — die REST-Oberfläche für Seiten, Blöcke, Links und globale Styles, jetzt alle `?siteId=`-bewusst
- [B1App](../web-apps/b1-app) — die Next.js-App, die die Middleware und das `[sdSlug]`-Routing hostet
- [Web-App-Deployment](../deployment/web-apps) — wie B1App auf Vercel deployt wird
