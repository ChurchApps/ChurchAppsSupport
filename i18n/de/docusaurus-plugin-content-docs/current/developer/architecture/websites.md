---
title: "Website-Routing und Multi-Site"
---

# Website-Routing und Multi-Site

<div class="article-intro">

Eine einzelne Gemeinde kann nun mehr als eine eigenständige Website betreiben, und jede davon kann auf einer Subdomain `*.b1.church` oder auf einer vollständig eigenen, der Gemeinde gehörenden Domain liegen. Diese Seite beschreibt die Routing-Schicht unterhalb des Builders: wie eine eingehende Anfrage sowohl einer Gemeinde als auch einer bestimmten Website zugeordnet wird, das Datenmodell für Multi-Site (der Platzhalter `siteId`, der alle bestehenden Websites unverändert weiter ausliefert) sowie den Edge für eigene Domains — ein selbstverwalteter Caddy-Proxy auf EC2, der TLS beendet und jede Domain der Gemeinde auf ihren Upstream `*.b1.church` umschreibt. Was nach der Auflösung einer Anfrage tatsächlich gerendert wird — der Baum aus Seiten, Abschnitten und Elementen —, beschreibt [Website-Builder](./website-builder).

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

Drei Grundregeln gelten in dieser Schicht:

1. **Ein Platzhalter sorgt für Abwärtskompatibilität.** `siteId = ''` ist die Hauptwebsite. Jede Seite, jeder Block, jeder Link, jeder globale Stil und jede Domain-Zeile, die es vor diesem Feature gab, trägt `''` und wird genau so gerendert wie bisher. Eine *zweite* Website ist einfach eine Menge von Zeilen mit einem nicht leeren `siteId`, und jeder Inhaltsendpunkt, der ohne `?siteId=` aufgerufen wird, liefert die Hauptwebsite — Byte für Byte dieselbe Anfrage wie früher.
2. **Die Auflösung erfolgt über das Host-Label und konvergiert.** Eine Subdomain `*.b1.church` wird direkt über ihr Host-Label geleitet; eine eigene Domain wird am Caddy-Edge auf ihr Label `{sub}.b1.church` umgeschrieben, bevor B1App sie sieht (mit einer Datenbankabfrage in der Middleware, die als Rückfall einen Header `x-site` setzt, falls ein roher eigener `Host` ohne Caddy ankommt). Beide Wege landen auf derselben Route `[sdSlug]` und demselben Aufruf `churches/lookup`, sodass das nachfolgende Rendern identisch ist.
3. **Der Caddy-Edge ist zustandslos über eine einzige Quelle der Wahrheit.** Eigene Domains enden auf einem selbstverwalteten Caddy-Proxy auf EC2, der jede Domain auf ihren Upstream `{sub}.b1.church` umschreibt. Das Speichern einer Domain löst einen einzigen Aufruf `CaddyHelper.updateCaddy()` mit bestmöglichem Bemühen aus, und Caddy liest außerdem die Tabelle `domains` direkt (die Endpunkte `authorize` und `hostmap` unten). Die Tabelle ist maßgeblich — ein nicht erreichbarer Caddy kann eine Speicherung nie zum Scheitern bringen.

## Auflösung der Website

### Subdomains `*.b1.church`

`B1App/next.config.mjs` schreibt eingehende Anfragen anhand des Hosts um. Eine Host-Regel mit dem Muster `(?<subdomain>.*?)\..*` erfasst das **erste Label** des Hosts und schreibt `/` und `/:path*` in `/{subdomain}` um — das App-Router-Segment `[sdSlug]`. So wird `grace.b1.church/about` zu `/grace/about`.

Innerhalb von `src/app/[sdSlug]/` ruft `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) den Endpunkt `GET /membership/churches/lookup/?subDomain={sdSlug}` auf. Die Antwort von `ChurchController.getBySubDomain` hat nun zwei Zweige:

| Slug passt zu | Antwort | Bedeutung |
|--------------|---------|-----------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hauptwebsite dieser Gemeinde |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Eine **zweite Website** — der Controller greift auf `sites` zurück, ermittelt die besitzende Gemeinde und gibt den angefragten Slug sowie das zusätzliche `siteId` zurück |

Dieses zusätzliche `siteId` ist das Einzige, was eine Anfrage an eine zweite Website von einer an die Hauptwebsite unterscheidet; alles Übrige in der Pipeline ist gemeinsam.

Ein Slug, der in keiner der beiden Tabellen vorkommt, liefert `{}` mit einem `200`. `ConfigHelper.load` behandelt eine Antwort ohne `id` als unbekannte Website und ruft `notFound()` von Next auf, sodass eine unbekannte Subdomain eine echte 404 erhält, statt dass alle späteren Aufrufe nach `/…/undefined` fragen. Die Route der Builder-Seite erstellt ihren Baumpfad außerdem mit `pageTreePath()` (`src/helpers/pageTreePath.ts`), das den Slug URL-kodiert; ein fehlerhafter Slug (Backslashes, Leerzeichen) liefert daher eine 404, statt die `400` der API als 500 weiterzureichen.

### Eigene Domains {#custom-domains}

Eine der Gemeinde gehörende Domain endet am **Caddy-Edge** (unten ausführlich beschrieben), der den Header `Host` auf die Subdomain `{sub}.b1.church` der Website umschreibt, bevor an B1App weitergeleitet wird. Im Normalfall erhält B1App also einen *internen* Host `*.b1.church` und löst ihn über das Host-Label genau wie eine eigene Subdomain auf — die Datenbankabfrage der Middleware greift nie. `src/middleware.ts` läuft dennoch bei jeder Anfrage, hat aber eine ständige Aufgabe und einen Rückfall:

1. **Immer** — sie **löscht jeden vom Client gesendeten Header `x-site`**. Dieser Header ist eine fälschbare Eingabe für das Umschreiben und wird nur dann vertraut, wenn die Middleware ihn selbst setzt; das Entfernen ist die eigentliche Aufgabe der Middleware hinter Caddy.
2. **Rückfall, nur bei einem nicht internen `Host`** — für einen rohen eigenen `Host`, der B1App ohne das Umschreiben durch Caddy erreicht, ruft sie `GET /membership/domains/public/lookup/{host}` auf und setzt bei einem zurückgegebenen `subDomain` den Header `x-site: {subDomain}.b1.church`. Hinter Caddy ist dieser Zweig wirkungslos, weil der `Host` bereits `*.b1.church` ist.

Interne Hosts — `localhost`, `b1.church` sowie die Suffixe `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — überspringen die Abfrage vollständig (sie sind bereits über das Umschreiben des Host-Labels aufgelöst oder es sind Vorschau- bzw. Deployment-Hosts).

Die Abfrage selbst (`DomainRepo.loadByName`) verbindet `domains → churches` und `domains → sites` als LEFT JOIN und liefert `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` — die Subdomain der zugewiesenen zweiten Website, falls die Domain auf eine solche zeigt, andernfalls die der Gemeinde. Zuerst wird der genaue Host geprüft; beginnt dieser Host mit `www.` und findet nichts, wird **einmal** die blanke Apex-Domain geprüft.

In `next.config.mjs stehen die Umschreibungsregeln für `x-site` **vor** den allgemeinen Host-Regeln, sodass sie Vorrang haben. `x-site: grace.b1.church` → erstes Label `grace` → `[sdSlug] = grace`, und von dort an ist die Auflösung identisch zum Pfad über die Subdomain (gleicher `churches/lookup`, gleiche `siteId`).

:::info
Der Header `x-site` ist von außen nicht vertrauenswürdig. Die Middleware entfernt jeden eingehenden Header `x-site` bedingungslos, bevor sie optional ihren eigenen setzt, und die Umschreibungsregeln sehen nur den von der Middleware gesetzten Wert — ein Client kann sich mit einem Header nicht auf die Inhalte einer anderen Gemeinde schalten.
:::

Zwei betriebliche Details der Middleware:

- **Cache.** Das Ergebnis jedes Hosts (ein Treffer *oder* ein bestätigter Fehlschlag — nie ein Netzwerkfehler) wird **10 Minuten** lang in einer `Map` im Speicher gehalten, je Serverless-Isolate.
- **Matcher.** Der Matcher nimmt `/sitemap.xml`, `/robots.txt` und `/manifest.webmanifest` bewusst wieder auf. Sein erstes Muster schließt Pfade mit Punkt aus, was diese Dateien sonst herausfiltern würde; sie werden daher wieder aufgenommen, damit eine eigene Domain ihre SEO-/PWA-Dateien der Gemeinde ebenfalls mit dem Header `x-site` erhält.
- **Kanonischer Header.** Für Seiten der Gemeinde hängt die Middleware eine Antwort-Header `Link: <{proto}://{host}{path}>; rel="canonical"` an, der den Host nennt, von dem die Seite tatsächlich ausgeliefert wurde — Subdomain oder eigene Domain (`helpers/canonicalLink.ts`). Erreicht eine eigene Domain B1App über den [Caddy-Proxy](../deployment/caddy-proxy), ist der Host der Anfrage die Subdomain `{sub}.b1.church`; daher verwendet die Middleware stattdessen die Domain des Besuchers aus `X-Church-Host` — jedoch erst, nachdem `/domains/public/lookup/{host}` bestätigt hat, dass diese Domain auf dieselbe Subdomain zeigt (`ownsSubdomain()`). Der kanonische Link, `robots.txt` und `sitemap.xml` nennen dann die eigene Domain statt der Subdomain `b1.church`. Auf Nicht-Gemeinde-Hosts (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) sowie bei `/mobile`, `/login`, `/logout` und den erzeugten Dateien robots/sitemap/manifest wird er übersprungen.

### Deaktivierte öffentliche Website

Eine Gemeinde kann in B1Admin **Disable Public Website** aktivieren (gemeindeweite Inhaltseinstellung `hidePublicSite = "true"`). Die Website liefert dann nur noch ihre Routen für Mitglieder aus:

- **Middleware von B1App** prüft die Subdomain (`/membership/churches/lookup`, dann `/content/settings/public/:churchId`) und leitet anonyme Anfragen auf jeden Pfad außerhalb der Erlaubnisliste nach `/login?returnUrl={path}{query}` um. Die Erlaubnisliste (`helpers/publicSite.ts`) umfasst `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` sowie die Dateien manifest/robots/sitemap. Nur bestätigte Antworten werden zwischengespeichert (60 Sekunden in der Produktion, da der Aufruf zum Neuladen aus der Administration die Map je Instanz nicht leeren kann; in Entwicklung und Test ohne Cache). Ein Fehler der API liefert die Website aus, statt alle auszusperren.
- **Angemeldete Mitglieder sehen die vollständige Website.** Eine Anfrage mit einem nicht abgelaufenen Cookie `jwt` (die Funktion `hasSession()` der Middleware liest das Feld `exp` der Nutzlast, ohne die Signatur zu prüfen — es ist eine weiche Schranke und keine Zugriffskontrolle) überspringt die Umleitung. Nach der Anmeldung kehrt ein Mitglied daher zu der Seite zurück, die es angefordert hat, und sieht die normalen Seiten, die eingebauten Seiten (Gruppen, Predigten usw.) und die Navigation im Header. Die Seitenkomponenten und `Header` prüfen `hidePublicSite` nicht mehr selbst.
- **`robots.txt`** verbietet alles, wie bei Hosts mit noindex.
- **API.** `GET /content/pages/public/:churchId` (die Seitenliste für die Sitemap) liefert `[]`, sodass anonyme Aufrufer die Seiten nicht auflisten können.

### Weitergabe von `siteId`

`ConfigHelper` speichert die aufgelöste `siteId` in seiner Konfiguration je Anfrage (`ConfigurationInterface`, mit React `cache()` zwischengespeichert) und hängt `?siteId=` an die Inhaltsaufrufe an, die er selbst und die Seitenkomponenten ausführen — **bedingt**: Eine leere `siteId` (eine Subdomain der Hauptgemeinde) lässt den Parameter vollständig weg. Die Endpunkte, die die `siteId` weitergeben, sind der Seitenbaum (`/content/pages/:id/tree`), die öffentliche Seitenliste für die Sitemap (`/content/pages/public/:id`), globale Stile (`/content/globalStyles/church/:id`), Navigationslinks (`/content/links/church/:id`) und der eigenständige Fußblock (`/content/blocks/public/footer/:id`). Im normalen Renderpfad kommt die Fußzeile innerhalb des Seitenbaums an (Abschnitte mit `zone: "siteFooter"`), bereits mit `siteId` abgerufen; es gibt daher keine ungescopte Lücke bei der Fußzeile.

Der Mitgliederbereich (B1App `mobile`) liegt bewusst außerhalb dieser Logik: `loadChurchAppearance.ts` löst die Gemeinde über `churches/lookup` auf, liest aber die gemeindeweiten Einstellungen über `/settings/public/{id}` und gibt niemals `siteId` weiter — der Mitgliederbereich gilt in Version 1 für die ganze Gemeinde (siehe unten).

## Mehrere Websites je Gemeinde

### Datenmodell

Die neue Tabelle `membership.sites` ist bewusst klein gehalten:

| Spalte | Typ | Hinweise |
|--------|------|----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Besitzende Gemeinde |
| `name` | `varchar(255)` | Anzeigename (z. B. „Español“, „Youth“) |
| `subDomain` | `varchar(45)` | **Eindeutiger Index** — globaler Namensraum (siehe unten) |

Die Zuordnung zu einer Website ist dann eine einzige, nicht leere Spalte, die den Tabellen für Inhalte und Domains hinzugefügt wird:

| Tabelle (Modul) | Spalte | `''` bedeutet |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Die Domain liefert die Hauptwebsite aus |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hauptwebsite — und bei **`blocks`** bedeutet `''` zusätzlich *für alle Websites gemeinsam* |

Zwei Migrationen fügen all dies hinzu (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Da der Standardwert der Spalte `''` ist, verhält sich jede bestehende Zeile wie bisher, ohne Nachtragen von Daten.

**Globaler Namensraum für Subdomains.** `sites.subDomain` teilt sich *einen* Namensraum mit `churches.subDomain` — eine Subdomain einer Website kann nie mit einer Subdomain einer Gemeinde oder einer anderen Website kollidieren. Dies wird auf **beiden** Speicherwegen erzwungen: `SiteController.save` lehnt einen Slug ab, der in `churches` oder `sites` vorkommt, und `ChurchController.validateSave` tut dasselbe in umgekehrter Richtung. Ein eindeutiger Index auf `sites.subDomain` sichert dies auf Datenbankebene ab.

**Eindeutigkeit der Seiten** wurde von `(churchId, url)` auf `(churchId, siteId, url)` erweitert, sodass zwei Websites einer Gemeinde jeweils ihr eigenes `/about` besitzen können.

### Inhalte je Website mit Ausweichlösungen

Jeder Endpunkt für Listen und Baumstrukturen mit Inhalten je Website nimmt ein optionales `?siteId=` entgegen (fehlt es, gilt `''` = Hauptwebsite): Seitenbaum, Liste und öffentliche Seiten, Blöcke (Liste, nach Typ, Fußzeile), Links (anonym, gefiltert, alle) sowie globale Stile. Abschnitte und Elemente sind nicht direkt zugeordnet; sie erben die Zuordnung über ihre übergeordnete Seite oder ihren Block.

Zwei Auflösungsketten leisten die eigentliche Arbeit:

- **Globale Stile — `Website → Hauptwebsite → Standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` liefert die eigene Zeile der Website; hat eine zweite Website keine, liefert es die **Zeile der Hauptwebsite (`''`) unverändert** (mit deren `id`/`siteId`, die der Client für das Kopieren beim Schreiben verwendet). Gibt es auch keine Hauptwebsite, liefert `GlobalStyleController` eine fest eingebaute Standardpalette und Standardschriften.
- **Fußzeilen-Block — die Fußzeile der Website hat Vorrang, gemeinsame dienen als Rückfall.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` liefert die gemeinsamen (`''`) *und* die websitespezifischen Zeilen; der Resolver nimmt die eigene Fußzeile der Website, falls vorhanden, andernfalls die gemeinsame. Dieselbe Logik läuft sowohl in `TreeHelper.insertBlocks` (Seitenbaum) als auch im eigenständigen Endpunkt `/content/blocks/public/footer/:churchId`.

### Kaskade beim Löschen einer Website

`SiteController.delete` (abhängig von der Berechtigung Settings→Edit des Membership-Moduls) entfernt eine zweite Website in drei Schritten:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` löscht kaskadenartig alle Inhalte, die der Website gehören: ihre **Seiten** samt Abschnitten, Elementen, `pageHistory` und `posts`; ihre eigenen **Blöcke** samt Abschnitten, Elementen und `pageHistory`; ihre **Links** und **globalStyles**. Eine Schutzprüfung verweigert den Lauf für `''` — die Sentinel-Zuordnung der Hauptwebsite bzw. der gemeinsamen Inhalte wird nie kaskadiert.
2. `DomainRepo.clearSiteId` **ordnet** die Domains der Website wieder der Hauptwebsite zu (`siteId → ''`), statt sie zu löschen; daher überlebt eine eigene Domain das Löschen einer Website.
3. Die Zeile `sites` wird gelöscht, und die Routen des Caddy-Edge werden neu synchronisiert (mit bestmöglichem Bemühen).

### Oberfläche in B1Admin

| Fähigkeit | Wo | Mechanismus |
|-----------|-----------|-----------|
| Umschalter der Website | `useSiteSelection` + `SiteSwitcher` (leer = „Main Website“) | Liest den URL-Parameter `?site=` und übergibt ihn als `?siteId=` an die Aufrufe der ContentApi. Vorhanden in den drei Listen des Bereichs Website — **Pages**, **Blocks**, **Appearance** —, aber *nicht* in den Editoren für Seiten und Blöcke, die `siteId` am Datensatz tragen |
| Websites anlegen/löschen | `SitesDialog`, geöffnet über den Eintrag „Manage websites…“ des Umschalters | `POST /membership/sites` / `DELETE /membership/sites/:id` (Name + subDomain). Abhängig von der Berechtigung Settings→Edit des Membership-Moduls (serverseitig `Permissions.settings.edit`; in B1Admin `Permissions.membershipApi.settings.edit`). **Nur Anlegen und Löschen — in Version 1 gibt es keine Oberfläche zum Umbenennen** |
| Zuordnung der Domain zu einer Website | `DomainSettingsEdit` unter Settings→Domains | Ein Auswahlfeld je Zeile sendet `siteId` für jede Domain an `/membership/domains`. Die Spalte bleibt verborgen, wenn die API keine Websites liefert (ältere Version des Backends) |
| Stile beim Kopieren beim Schreiben | `StylesManager.prepareForSave` | Weicht die `siteId` der geladenen Zeile globaler Stile von der gewählten Website ab (die API hat die geerbte Hauptwebsite als Rückfall geliefert), entfernt es die `id` der Hauptwebsite und setzt die aktuelle `siteId`. So wird eine **neue** websitespezifische Zeile eingefügt, statt die Hauptwebsite zu überschreiben. Dieselbe Verzweigung bei Abweichung gilt für den Fußzeilen-Block der Website |

:::info
**Was in Version 1 gemeindeweit bleibt (eine bewusste Entscheidung beim Umfang, keine Grenze des Datenmodells):** der **Blog** (`BlogPage` hat keinen Umschalter und lädt `/posts` ohne `siteId`), die **Widgets der Website** (Banner für Ankündigungen und Launcher), die **Weiterleitungen**, das **Logo / GA4 / die Einstellungen der Gemeinde** sowie der **Mitgliederbereich** (B1App mobile). Beachten Sie: Dies ist *nicht* „der gesamte Bereich Appearance“ — die globalen Stile einer zweiten Website (Palette, Schriften, Typografie, Abstände, Navigation, eigenes CSS) **sind** je Website über den oben beschriebenen Weg des Kopierens beim Schreiben; nur die Unterbereiche Banner/Launcher/Weiterleitungen/Logo des Bereichs Appearance bleiben gemeindeweit.
:::

## Eigene Domains: Caddy-Edge (Plan mit statischer Konfiguration)

:::info
**Richtung überarbeitet am 2026-07-02.** Ein früherer Plan, das Hosting eigener Domains auf von Vercel verwaltete Domains zu verlegen, wurde **verworfen**; der gesamte Code zur Registrierung von Domains bei Vercel (`VercelHelper`, seine Umgebungsvariablen `vercelToken`/`vercelProjectId`/`vercelTeamId`, die Parameter im SSM und die Einträge der Zustandsprüfung) wurde aus der Api entfernt. Der selbstverwaltete **Caddy-Proxy auf EC2 bleibt** als dauerhafter Edge für eigene Domains. Die einzige verbleibende Arbeit ist intern: die *laufzeitbasierte* Konfiguration über die Admin-API von Caddy durch eine *statische* Konfiguration zu ersetzen, die Neustarts übersteht.
:::

### Der Edge

Jede eigene Domain einer Gemeinde zeigt per DNS auf eine einzige EC2-Maschine — `3.23.251.61`, auch erreichbar als `proxy.b1.church`. Der Bildschirm Settings→Domains in B1Admin weist Gemeinden an, einen Apex-Eintrag `A → 3.23.251.61` oder einen `CNAME → proxy.b1.church` anzulegen. Caddy beendet TLS mit einem Let's-Encrypt-Zertifikat je Domain, schreibt den Header `Host` auf den Upstream `{sub}.b1.church` der Domain um und leitet an B1App weiter. B1App leitet die Anfrage dann wie jede eigene Subdomain über das Host-Label (siehe oben [Eigene Domains](#custom-domains)).

Die Zuordnung zum Upstream stammt aus `DomainRepo.loadPairs`, dessen Ziel (`dial`) die Subdomain der zugewiesenen Website mit COALESCE übernimmt, sodass eine Domain zur richtigen **zweiten** Website weitergeleitet wird und andernfalls auf die Hauptwebsite der Gemeinde zurückfällt:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Zeilen `www.*` sind aus der Zuordnung ausgeschlossen; Caddy bedient `www.{host}` über eine Weiterleitung `302` auf die Apex-Domain.

### Zwei anonyme Endpunkte speisen den Edge

`DomainController` stellt zwei nicht authentifizierte, nur lesende Endpunkte bereit, die die Maschine direkt verwendet — sie sind notwendigerweise anonym, da der Edge sie abfragt, bevor ein Kontext der Gemeinde existiert:

| Endpunkt | Liefert | Funktion |
|----------|----------|----------|
| `GET /membership/domains/authorize?domain=` | `200`, wenn die Domain — oder bei einem Fehlschlag mit `www.` deren blanke Apex-Domain — in `domains` existiert; sonst `404` (auch bei leerer `domain`) | Die **On-Demand-TLS-`ask`** von Caddy: die Missbrauchskontrolle, die entscheidet, ob für einen eingehenden SNI ein Zertifikat ausgestellt wird |
| `GET /membership/domains/hostmap` | `text/plain`, je routbarer Domain eine sortierte Zeile `{domain} {sub}.b1.church` | Die Datei der Zuordnung Host → Upstream, die die Maschine per Timer aktualisiert |

`authorize` verwendet `DomainRepo.loadByName` wieder (genauer Host, danach ein einzelner Versuch mit Umschreiben von `www.` auf die Apex-Domain); `hostmap` verwendet `loadPairs` wieder — daher berücksichtigt er die Zuordnung zur Website und schließt `www.*` aus, genau wie die Proxy-Routen — und entfernt nur das Suffix `:443`.

### Speichern/Löschen einer Domain — ein einziger Push mit bestmöglichem Bemühen

`DomainController.save` schreibt die Zeilen `domains` und löst danach einen **einzigen Aufruf mit bestmöglichem Bemühen** von `CaddyHelper.updateCaddy()` aus, eingeschlossen in ein `try/catch`, das protokolliert (`console.error`) und verschluckt; `delete` verfährt ebenso (was außerdem einen früheren Fehler behob, bei dem eine veraltete Route nach dem Löschen bestehen blieb), ebenso das Löschen einer zweiten Website (`SiteController.delete`). `updateCaddy` selbst ist durch ein Zeitlimit von **10 s** des Axios-Clients begrenzt, sodass ein nicht erreichbarer oder angehaltener Caddy eine Speicherung der Domain nie mit `500` scheitern lassen kann — die Tabelle `domains` ist die Quelle der Wahrheit.

### Aktueller Stand — statische Konfiguration, kein Laufzeitzustand

Die Maschine (eine Windows-EC2 hinter der dauerhaften Elastic IP) betreibt Caddy mit einer **statischen Caddyfile**: On-Demand-TLS, dessen `ask` auf `/membership/domains/authorize` zeigt, plus eine Datei der Zuordnung Host → Upstream, die alle 5 Minuten von `/membership/domains/hostmap` aktualisiert wird — durch eine geplante Aufgabe, die mit einem geordneten `caddy reload` endet. Die Konfiguration übersteht Neustarts ohne jeden Laufzeitzustand — kein erneutes Vorbereiten nötig — und ein unbekannter SNI wird **per TLS abgelehnt** (für einen Host, den `authorize` ablehnt, wird kein Zertifikat erzeugt), während ein autorisierter, aber noch nicht zugeordneter Host (eine brandneue Domain innerhalb des Synchronisierungsfensters) eine saubere 404 erhält. Neue Domains sind innerhalb von etwa 5 Minuten nach dem Speichern routbar; ihre Zertifikate werden beim ersten Aufruf ausgestellt. Aufbau, Betrieb und praxiserprobte Stolperfallen: [Caddy-Proxy für eigene Domains](../deployment/caddy-proxy).

### Älterer Laufzeit-Push — Rückfallpfad, zur Löschung vorgesehen

`CaddyHelper` (Modul membership) kann Caddy weiterhin über seine **Admin-API** unter `caddyHost:caddyPort` steuern (SSM `caddyHost`/`caddyPort`; ohne Wirkung, wenn nicht gesetzt; sichtbar in der Gruppe Integrations von `ServerHealthController`). `updateCaddy()` sendet per PATCH ein vollständiges Array von Routen, und `initializeCaddy()` sowie die Endpunkte `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bauen einen laufzeitkonfigurierten Server vollständig neu auf. Die Konfiguration dieses Modus lebte nur im Speicher von Caddy — die Gedächtnislosigkeit beim Neustart, die diese Architektur ersetzt hat. Der Mechanismus bleibt allein als Rückfallpfad bestehen und wird gelöscht, sobald die statische Maschine stabil läuft; der bestmöglich ausgeführte Push `updateCaddy()` beim Speichern/Löschen einer Domain ist gegenüber der statischen Maschine ein harmloser Leerlauf (deren Admin-API ist nur über localhost erreichbar).

## Verwandte Seiten

- [Caddy-Proxy für eigene Domains](../deployment/caddy-proxy) — die Edge-Maschine selbst: Einrichtung auf einer frischen Maschine, WinSW-Dienst, Synchronisierungsaufgabe für die Zuordnung und betriebliche Stolperfallen
- [Website-Builder](./website-builder) — der Baum aus Seiten, Abschnitten und Elementen, die Renderer, der Blog, SEO und die KI-Erzeugung (was gerendert wird, sobald eine Anfrage einer Gemeinde/Website zugeordnet ist)
- [Content-Endpunkte](../api/endpoints/content) — die REST-Schnittstelle für Seiten, Blöcke, Links und globale Stile, jetzt mit Unterstützung für `?siteId=`
- [B1App](../web-apps/b1-app) — die Next.js-App, die die Middleware und das Routing `[sdSlug]` beherbergt
- [Bereitstellung der Web-Apps](../deployment/web-apps) — wie B1App auf Vercel bereitgestellt wird
