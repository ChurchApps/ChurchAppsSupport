---
title: "Website-Routing & Mehrere Sites"
---

# Website-Routing & Mehrere Sites

<div class="article-intro">

Eine einzelne Kirche kann inzwischen mehr als eine eigenständige Website betreiben. Jede davon kann unter einer Subdomain `*.b1.church` oder unter einer vollständig eigenen Domain der Kirche liegen. Diese Seite beschreibt die Routing-Schicht *unterhalb* des Builders: wie eine eingehende Anfrage einer Kirche **und** einer bestimmten Site zugeordnet wird, das Datenmodell für mehrere Sites (der Platzhalter `siteId`, der jede bestehende Site unverändert rendern lässt) und die Kante für eigene Domains -- ein selbst verwalteter Caddy-Proxy auf EC2, der TLS beendet und jede Domain der Kirche auf ihren Upstream `*.b1.church` umschreibt. Was nach dem Auflösen einer Anfrage tatsächlich gerendert wird -- der Baum aus Seiten, Abschnitten und Elementen -- beschreibt [Website-Builder](./website-builder).

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

Drei Regeln gelten in dieser Schicht:

1. **Ein Platzhalter hält alles abwärtskompatibel.** `siteId = ''` ist die Hauptsite. Jede Seite, jeder Block, jeder Link, jeder globale Stil und jede Domain-Zeile, die es vor dieser Funktion gab, trägt `''` und rendert genau wie zuvor. Eine *zweite* Website ist einfach eine Menge von Zeilen mit einer nicht leeren `siteId`; ein Inhaltsendpunkt ohne `?siteId=` liefert die Hauptsite -- Byte für Byte die alte Anfrage.
2. **Die Auflösung beruht auf dem Host-Label und läuft zusammen.** Eine Subdomain `*.b1.church` wird direkt über ihr Host-Label geleitet; eine eigene Domain wird an der Caddy-Kante auf ihr Label `{sub}.b1.church` umgeschrieben, bevor B1App sie sieht (mit einer Datenbanksuche in der Middleware, die als Rückfall einen Header `x-site` setzt, falls ein roher eigener `Host` ankommt). Beide Wege landen auf derselben Route `[sdSlug]` und demselben Aufruf `churches/lookup`, sodass das weitere Rendern identisch ist.
3. **Die Caddy-Kante ist zustandslos gegenüber einer einzigen Quelle der Wahrheit.** Eigene Domains enden auf einem selbst verwalteten Caddy-Proxy auf EC2, der jede Domain auf ihren Upstream `{sub}.b1.church` umschreibt. Das Speichern einer Domain löst einen einzelnen best-effort-Aufruf `CaddyHelper.updateCaddy()` aus; Caddy liest außerdem die Tabelle `domains` direkt (die Endpunkte `authorize` und `hostmap` unten). Maßgeblich ist die Tabelle -- eine nicht erreichbare Caddy-Instanz kann ein Speichern nie scheitern lassen.

## Auflösung der Site

### Subdomains `*.b1.church`

`B1App/next.config.mjs` schreibt eingehende Anfragen anhand des Hosts um. Eine Host-Regel mit dem Muster `(?<subdomain>.*?)\..*` erfasst das **erste Label** des Hosts und schreibt `/` und `/:path*` nach `/{subdomain}` um -- das App-Router-Segment `[sdSlug]`. So wird `grace.b1.church/about` zu `/grace/about`.

Innerhalb von `src/app/[sdSlug]/` ruft `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` auf. Die Antwort von `ChurchController.getBySubDomain` hat nun zwei Zweige:

| Slug trifft | Antwort | Bedeutung |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hauptsite dieser Kirche |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Eine **zweite Site** -- der Controller greift auf `sites` zurück, ermittelt die zugehörige Kirche und gibt den abgefragten Slug sowie die zusätzliche `siteId` zurück |

Diese zusätzliche `siteId` ist das Einzige, was eine Anfrage an eine zweite Site von einer an die Hauptsite unterscheidet; alles Übrige in der Pipeline ist gemeinsam.

Ein Slug, der in keiner der beiden Tabellen vorkommt, liefert `{}` mit `200`. `ConfigHelper.load` behandelt eine Antwort ohne `id` als unbekannte Site und ruft `notFound()` von Next auf; eine unbekannte Subdomain erhält daher eine echte 404 statt dass alle folgenden Aufrufe nach `/…/undefined` fragen. Die Route der Builder-Seite baut ihren Baumpfad außerdem mit `pageTreePath()` (`src/helpers/pageTreePath.ts`), das den Slug URL-kodiert. So führt ein fehlerhafter Slug (Backslashes, Leerzeichen) zu einer 404 statt die `400` der API als 500 durchzureichen.

### Eigene Domains

Eine Domain der Kirche endet an der **Caddy-Kante** (unten beschrieben), die den Header `Host` auf das `{sub}.b1.church` der Site umschreibt, bevor an B1App weitergeleitet wird. Auf dem normalen Weg erhält B1App daher einen *internen* Host `*.b1.church` und löst ihn über das Host-Label genau wie eine eigene Subdomain auf -- die Datenbanksuche der Middleware wird nie ausgelöst. `src/middleware.ts` läuft dennoch bei jeder Anfrage, mit einer dauerhaften Aufgabe und einem Rückfall:

1. **Immer** -- Sie **löscht jeden vom Client gesendeten Header `x-site`**. Dieser Header ist manipulierbare Eingabe für das Umschreiben und wird nur dann vertraut, wenn die Middleware ihn selbst setzt. Ihn zu entfernen ist die eigentliche Aufgabe der Middleware hinter Caddy.
2. **Rückfall, nur bei nicht internem `Host`** -- Erreicht ein roher eigener `Host` B1App *ohne* das Umschreiben durch Caddy, ruft sie `GET /membership/domains/public/lookup/{host}` auf und setzt, falls ein `subDomain` zurückkommt, den Header `x-site: {subDomain}.b1.church`. Hinter Caddy ist dieser Zweig inaktiv, weil der `Host` bereits `*.b1.church` ist.

Interne Hosts -- `localhost`, `b1.church` sowie die Endungen `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` -- überspringen die Suche vollständig (sie werden bereits durch das Umschreiben des Host-Labels aufgelöst oder sind Vorschau- bzw. Deploy-Hosts).

Die Suche selbst (`DomainRepo.loadByName`) verknüpft `domains → churches` und `domains → sites` als Left Join und liefert `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` -- die Subdomain der zugewiesenen zweiten Site, falls die Domain auf eine solche zeigt, sonst die der Kirche. Zuerst wird der genaue Host geprüft; begann dieser mit `www.` und traf nicht, wird **einmal** gegen die nackte Apex-Domain wiederholt.

In `next.config.mjs` stehen die Umschreiberegeln für `x-site` **vor** den allgemeinen Host-Regeln und gewinnen daher. `x-site: grace.b1.church` → erstes Label `grace` → `[sdSlug] = grace`; von dort an ist die Auflösung identisch zum Subdomain-Weg (gleicher `churches/lookup`, gleiche `siteId`).

:::info
Der Header `x-site` wird von außen nicht vertraut. Die Middleware entfernt jeden eingehenden `x-site` bedingungslos, bevor sie optional ihren eigenen setzt; die Umschreiberegeln sehen nur den von der Middleware gesetzten Wert. Ein Client kann sich durch das Senden eines Headers nicht auf die Inhalte einer anderen Kirche schalten.
:::

Zwei betriebliche Details der Middleware:

- **Zwischenspeicher.** Das Ergebnis je Host (ein Treffer *oder* ein bestätigter Fehlschlag, nie ein Netzwerkfehler) wird **10 Minuten** in einer `Map` im Speicher gehalten, je Serverless-Isolat.
- **Matcher.** Der Matcher nimmt `/sitemap.xml`, `/robots.txt` und `/manifest.webmanifest` bewusst wieder auf. Sein erstes Muster schließt Pfade mit Punkt aus, was diese Dateien sonst herausfiltern würde; sie werden zurückgeholt, damit die SEO- und PWA-Dateien einer eigenen Domain ebenfalls den Header `x-site` erhalten.
- **Kanonischer Header.** Für Kirchenseiten hängt die Middleware einen Antwortheader `Link: <{proto}://{host}{path}>; rel="canonical"` an, der den Host nennt, unter dem die Seite tatsächlich ausgeliefert wurde -- Subdomain oder eigene Domain (`helpers/canonicalLink.ts`). Erreicht eine eigene Domain B1App über den [Caddy-Proxy](../deployment/caddy-proxy), ist der Host der Anfrage die Subdomain `{sub}.b1.church`. Deshalb nutzt die Middleware dann die Domain des Besuchers aus `X-Church-Host` -- jedoch erst, nachdem `/domains/public/lookup/{host}` bestätigt, dass diese Domain auf dieselbe Subdomain zeigt (`ownsSubdomain()`). Der kanonische Link, `robots.txt` und `sitemap.xml` nennen dann die eigene Domain statt der Subdomain `b1.church`. Auf Hosts ohne Kirche (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) sowie unter `/mobile`, `/login`, `/logout` und den erzeugten Dateien robots, sitemap und manifest wird dies übersprungen.

### Öffentliche Website deaktiviert

Eine Kirche kann in B1Admin **Öffentliche Website deaktivieren** einschalten (Inhaltseinstellung auf Kirchenebene `hidePublicSite = "true"`). Die Site liefert dann nur noch ihre Routen für Mitglieder aus:

- **Middleware von B1App** schlägt die Subdomain nach (`/membership/churches/lookup`, danach `/content/settings/public/:churchId`) und leitet anonyme Anfragen für jeden Pfad außerhalb der Liste erlaubter Pfade auf `/login?returnUrl={path}{query}` um. Die Liste erlaubter Pfade (`helpers/publicSite.ts`) umfasst `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` sowie die Dateien manifest, robots und sitemap. Nur bestätigte Antworten werden zwischengespeichert (in der Produktion 60 Sekunden, da der Aufruf zur Neuvalidierung aus der Verwaltung diese Karte je Instanz nicht leeren kann; in Entwicklung und Test ohne Zwischenspeicher). Ein Fehler der API liefert die Site aus, statt alle auszusperren.
- **Angemeldete Mitglieder sehen die volle Site.** Eine Anfrage mit einem nicht abgelaufenen Cookie `jwt` (die Funktion `hasSession()` der Middleware liest das Feld `exp` der Nutzlast, ohne die Signatur zu prüfen -- das ist eine weiche Sperre, keine Zugriffskontrolle) umgeht die Weiterleitung. Nach der Anmeldung kehrt ein Mitglied daher zu der Seite zurück, die es angefordert hat, und sieht die normalen Seiten, eingebaute Seiten (Gruppen, Predigten usw.) und die Navigation im Kopf. Die Seitenkomponenten und `Header` prüfen `hidePublicSite` nicht mehr selbst.
- **`robots.txt`** verbietet alles, wie auf Hosts mit noindex.
- **API.** `GET /content/pages/public/:churchId` (die Seitenliste der Sitemap) liefert `[]`, damit anonyme Aufrufer die Seiten nicht auflisten können.

### Weitergabe der `siteId`

`ConfigHelper` speichert die aufgelöste `siteId` in seiner `ConfigurationInterface` je Anfrage (mit React `cache()` gemerkt) und hängt `?siteId=` an die Inhaltsaufrufe an, die er selbst und die Seitenkomponenten ausführen -- **bedingt**: Eine leere `siteId` (Subdomain einer Hauptkirche) lässt den Parameter ganz weg. Die weitergereichten Endpunkte sind der Seitenbaum (`/content/pages/:id/tree`), die öffentliche Seitenliste für die Sitemap (`/content/pages/public/:id`), die globalen Stile (`/content/globalStyles/church/:id`), die Navigationslinks (`/content/links/church/:id`) und der eigenständige Fußblock (`/content/blocks/public/footer/:id`). Auf dem normalen Renderweg kommt der Fuß innerhalb des Seitenbaums (Abschnitte mit `zone: "siteFooter"`), der bereits mit `siteId` geladen wurde; es gibt also keine ungefilterte Lücke beim Fuß.

Der Mitgliederbereich der B1App (`mobile`) liegt bewusst außerhalb davon: `loadChurchAppearance.ts` löst die Kirche über `churches/lookup` auf, liest aber die Einstellungen auf Kirchenebene `/settings/public/{id}` und reicht `siteId` nie weiter -- der Mitgliederbereich ist in Version 1 kirchenweit (siehe unten).

## Mehrere Websites je Kirche

### Datenmodell

Die neue Tabelle `membership.sites` ist bewusst klein:

| Spalte | Typ | Hinweise |
|--------|------|----------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Besitzende Kirche |
| `name` | `varchar(255)` | Anzeigename (z. B. "Español", "Jugend") |
| `subDomain` | `varchar(45)` | **Eindeutiger Index** -- globaler Namensraum (siehe unten) |

Die Zuordnung zur Site ist dann eine einzige, nicht leere Spalte, die den Inhalts- und Domain-Tabellen hinzugefügt wird:

| Tabelle (Modul) | Spalte | `''` bedeutet |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Die Domain liefert die Hauptsite |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hauptsite -- und bei **`blocks`** zusätzlich *für alle Sites gemeinsam* |

Zwei Migrationen fügen all dies hinzu (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Da die Spalte standardmäßig `''` hat, behält jede bestehende Zeile das heutige Verhalten, ohne dass eine Nachpflege nötig ist.

**Globaler Namensraum für Subdomains.** `sites.subDomain` teilt sich *einen* Namensraum mit `churches.subDomain` -- eine Subdomain einer Site kann nie mit einer Subdomain einer Kirche oder einer anderen Site kollidieren. Das wird auf **beiden** Speicherwegen erzwungen: `SiteController.save` lehnt einen Slug ab, der in `churches` oder `sites` vorkommt, und `ChurchController.validateSave` tut dasselbe umgekehrt. Ein eindeutiger Index auf `sites.subDomain` sichert dies auf Datenbankebene ab.

**Eindeutigkeit der Seiten** wurde von `(churchId, url)` auf `(churchId, siteId, url)` erweitert, sodass zwei Sites einer Kirche je ihr eigenes `/about` besitzen können.

### Inhalte je Site mit Rückfällen

Jeder Endpunkt für Listen und Baum der Inhalte, die einer Site zugeordnet sind, nimmt ein optionales `?siteId=` entgegen (fehlt es, gilt `''` = Hauptsite): Seitenbaum, Seitenliste und öffentliche Seiten, Blocklisten, Blöcke nach Typ und Fuß, Links (anonym, gefiltert, alle) und globale Stile. Abschnitte und Elemente sind *nicht* direkt zugeordnet -- sie erben über ihre übergeordnete Seite oder ihren Block.

Zwei Auflösungsketten leisten die eigentliche Arbeit:

- **Globale Stile -- `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` liefert die eigene Zeile der Site; hat eine zweite Site keine, liefert es die **Zeile der Hauptsite (`''`) unverändert** (mit deren `id`/`siteId`, die der Client für das Kopieren beim Schreiben nutzt). Gibt es auch keine Hauptsite, liefert `GlobalStyleController` eine fest einprogrammierte Standardpalette und Standardschriften.
- **Fußblock -- die eigene Site gewinnt, gemeinsame fallen zurück.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` liefert die gemeinsamen Zeilen (`''`) *und* die eigenen Zeilen der Site; die Auflösung wählt den eigenen Fuß der Site, falls vorhanden, sonst den gemeinsamen. Dieselbe Logik läuft sowohl in `TreeHelper.insertBlocks` (Seitenbaum) als auch im eigenständigen Endpunkt `/content/blocks/public/footer/:churchId`.

### Kaskade beim Löschen einer Site

`SiteController.delete` (geschützt durch die Berechtigung Einstellungen→Bearbeiten im Mitgliedschaftsmodul) entfernt eine zweite Site in drei Schritten:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` löscht alle Inhalte, die der Site gehören: ihre **Seiten** samt Abschnitten, Elementen, `pageHistory` und `posts`; ihre eigenen **Blöcke** samt Abschnitten, Elementen und `pageHistory`; ihre **Links** und **globalStyles**. Eine Schutzprüfung verweigert den Lauf für `''` -- der Platzhalter für Hauptsite und gemeinsame Inhalte wird nie kaskadiert.
2. `DomainRepo.clearSiteId` **weist** die Domains der Site wieder der Hauptsite zu (`siteId → ''`), statt sie zu löschen, sodass eine eigene Domain das Löschen einer Site überlebt.
3. Die Zeile `sites` wird gelöscht, und die Caddy-Routen werden neu synchronisiert (best-effort).

### Oberfläche in B1Admin

| Funktion | Ort | Mechanismus |
|-----------|-------|-----------|
| Umschalter der Site | `useSiteSelection` + `SiteSwitcher` (leer = "Hauptwebsite") | Liest den URL-Parameter `?site=` und reicht ihn als `?siteId=` an die Aufrufe der ContentApi weiter. Vorhanden in den drei Listen des Bereichs Site -- **Seiten**, **Blöcke**, **Erscheinungsbild** -- aber nicht in den Editoren für Seiten und Blöcke, die `siteId` am Datensatz führen |
| Sites anlegen/löschen | `SitesDialog`, geöffnet über den Eintrag "Websites verwalten…" des Umschalters | `POST /membership/sites` / `DELETE /membership/sites/:id` (Name + subDomain). Geschützt durch die Berechtigung Einstellungen→Bearbeiten im Mitgliedschaftsmodul (serverseitig `Permissions.settings.edit`; in B1Admin `Permissions.membershipApi.settings.edit`). **Nur anlegen und löschen -- in Version 1 gibt es keine Oberfläche zum Umbenennen** |
| Zuordnung der Domain zur Site | `DomainSettingsEdit` unter Einstellungen→Domains | Eine Auswahl der Site je Zeile sendet `siteId` je Domain an `/membership/domains`. Die Spalte bleibt verborgen, wenn die API keine Sites liefert (ältere Backend-Version) |
| Kopieren beim Schreiben der Stile | `StylesManager.prepareForSave` | Stimmt die `siteId` der geladenen Zeile globaler Stile nicht mit der gewählten Site überein (die API hat also die geerbte Hauptsite als Rückfall geliefert), verwirft es die `id` der Hauptsite und setzt die aktuelle `siteId`, wodurch ein **Einfügen** einer neuen Zeile für die Site erzwungen wird, statt die Hauptsite zu überschreiben. Dieselbe Verzweigung bei Abweichung gilt für den Fußblock der Site |

:::info
**Was in Version 1 kirchenweit bleibt (eine bewusste Entscheidung zum Umfang, keine Grenze des Datenmodells):** der **Blog** (`BlogPage` hat keinen Umschalter und lädt `/posts` ohne `siteId`), die **Widgets der Site** (Ankündigungsbanner und Launcher), die **Weiterleitungen**, das **Logo, GA4 und die Einstellungen der Kirche** sowie der **Mitgliederbereich** (B1App mobile). Das heißt nicht "der gesamte Bereich Erscheinungsbild" -- die globalen Stile einer zweiten Site (Palette, Schriften, Typografie, Abstände, Navigation, eigenes CSS) **sind** über den oben beschriebenen Weg des Kopierens beim Schreiben je Site; nur die Unterbereiche Banner, Launcher, Weiterleitungen und Logo des Erscheinungsbilds bleiben kirchenweit.
:::

## Eigene Domains: Caddy-Kante (Plan mit statischer Konfiguration)

:::info
**Richtung geändert am 02.07.2026.** Ein früherer Plan, das Hosting eigener Domains auf von Vercel verwaltete Domains zu verlegen, wurde **verworfen**. Der gesamte Code zur Domain-Registrierung bei Vercel (`VercelHelper`, die Umgebungsvariablen `vercelToken`/`vercelProjectId`/`vercelTeamId`, die SSM-Parameter und die Einträge im Health-Check) wurde aus der API entfernt. Der selbst verwaltete **Caddy-Proxy auf EC2 bleibt** als dauerhafte Kante für eigene Domains. Die verbleibende Arbeit ist rein intern: Die *Laufzeit*-Konfiguration über die Admin-API von Caddy wird durch eine *statische* Konfiguration ersetzt, die Neustarts übersteht.
:::

### Die Kante

Jede eigene Domain einer Kirche zeigt per DNS auf eine EC2-Maschine -- `3.23.251.61`, auch unter `proxy.b1.church` erreichbar. Die Seite Einstellungen→Domains in B1Admin weist die Kirchen an, einen Apex-Eintrag `A → 3.23.251.61` oder einen `CNAME → proxy.b1.church` anzulegen. Caddy beendet TLS mit einem Let's-Encrypt-Zertifikat je Domain, schreibt den Header `Host` auf den Upstream `{sub}.b1.church` der Domain um und leitet per Reverse-Proxy an B1App weiter -- das die Anfrage dann wie jede eigene Subdomain über das Host-Label leitet (siehe oben [Eigene Domains](#eigene-domains)).

Die Zuordnung zum Upstream stammt von `DomainRepo.loadPairs`, dessen Wahl die **Subdomain der zugewiesenen Site per COALESCE** übernimmt, sodass eine Domain zur richtigen *zweiten* Site geleitet wird und sonst zur Hauptkirche:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Zeilen `www.*` sind aus der Abbildung ausgeschlossen; Caddy bedient `www.{host}` stattdessen mit einer Weiterleitung `302` auf den Apex.

### Zwei anonyme Endpunkte speisen die Kante

`DomainController` stellt zwei nicht authentifizierte, nur lesende Endpunkte bereit, die der Kasten direkt nutzt -- anonym aus Notwendigkeit, da die Kante sie abfragt, bevor irgendein Kontext der Kirche existiert:

| Endpunkt | Liefert | Aufgabe |
|----------|----------|---------|
| `GET /membership/domains/authorize?domain=` | `200`, wenn die Domain -- oder bei einem Treffer `www.` ihre nackte Apex-Domain -- in `domains` existiert; sonst `404` (auch bei leerer `domain`) | Der **On-Demand-TLS-`ask`** von Caddy: die Missbrauchskontrolle, die entscheidet, ob für einen eingehenden SNI ein Zertifikat ausgestellt wird |
| `GET /membership/domains/hostmap` | `text/plain`, eine sortierte Zeile `{domain} {sub}.b1.church` je routbarer Domain | Die Datei der Abbildung Host→Upstream, die der Kasten per Timer aktualisiert |

`authorize` nutzt `DomainRepo.loadByName` wieder (genauer Host, dann ein Wiederholungsversuch `www.`→Apex); `hostmap` nutzt `loadPairs` -- damit ist er site-bewusst und schließt `www.*` aus, genau wie die Proxy-Routen -- und entfernt nur das Suffix `:443`.

### Speichern und Löschen einer Domain -- ein best-effort-Aufruf

`DomainController.save` schreibt die Zeilen `domains` und löst danach einen **einzigen best-effort**-Aufruf `CaddyHelper.updateCaddy()` aus, eingefasst in ein `try/catch`, das protokolliert (`console.error`) und verschluckt. `delete` tut dasselbe (was außerdem einen früheren Fehler behob, bei dem beim Löschen veraltete Routen blieben), ebenso das Löschen einer zweiten Site (`SiteController.delete`). `updateCaddy` selbst ist durch ein Zeitlimit von **10 s** im Axios-Aufruf begrenzt. Eine nicht erreichbare oder angehaltene Caddy-Instanz kann daher nie ein Speichern der Domain mit `500` scheitern lassen -- die Tabelle `domains` ist die Quelle der Wahrheit.

### Aktueller Stand -- statische Konfiguration, kein Laufzeitzustand

Der Kasten (eine Windows-EC2-Maschine hinter der dauerhaften Elastic IP) betreibt Caddy mit einer **statischen Caddyfile**: TLS auf Abruf, dessen `ask` auf `/membership/domains/authorize` zeigt, plus eine Datei der Abbildung Host→Upstream, die alle 5 Minuten von `/membership/domains/hostmap` durch eine geplante Aufgabe aktualisiert wird; diese endet mit einem geordneten `caddy reload`. Die Konfiguration übersteht Neustarts ohne Laufzeitzustand -- ohne ein erneutes Vorbereiten -- und ein unbekannter SNI wird per **TLS abgewiesen** (für einen Host, den `authorize` ablehnt, wird kein Zertifikat erzeugt), während ein autorisierter, aber noch nicht abgebildeter Host (eine ganz neue Domain innerhalb des Synchronisationsfensters) eine saubere 404 erhält. Neue Domains sind innerhalb von etwa 5 Minuten nach dem Speichern routbar; ihre Zertifikate entstehen beim ersten Aufruf. Aufbau, Betrieb und in der Praxis erprobte Stolpersteine: [Caddy-Proxy für eigene Domains](../deployment/caddy-proxy).

### Alter Laufzeit-Push -- Rückfallpfad, zum Löschen vorgesehen

`CaddyHelper` (Modul Membership) kann Caddy weiterhin über dessen **Admin-API** unter `caddyHost:caddyPort` steuern (SSM `caddyHost`/`caddyPort`; ohne Wert ein No-op; angezeigt in der Gruppe Integrationen von `ServerHealthController`). `updateCaddy()` sendet per PATCH ein vollständiges Array von Routen, und `initializeCaddy()` sowie die Endpunkte `GET /membership/domains/caddy/init` und `GET /membership/domains/caddy` bauen einen zur Laufzeit konfigurierten Server von Grund auf neu. Die Konfiguration dieses Modus lag nur im Speicher von Caddy -- das Vergessen beim Neustart, das diese Architektur ersetzt hat. Die Mechanik bleibt ausschließlich als Rückfallpfad bestehen und ist zum Löschen vorgesehen, sobald der statische Kasten stabil läuft. Der best-effort-Push `updateCaddy()` beim Speichern/Löschen einer Domain ist gegenüber dem statischen Kasten ein harmloser No-op, da dessen Admin-API nur über localhost erreichbar ist.

## Verwandte Seiten

- [Caddy-Proxy für eigene Domains](../deployment/caddy-proxy) — die Kante selbst: Einrichtung einer neuen Maschine, der WinSW-Dienst, die Aufgabe zur Synchronisation der Abbildung und betriebliche Stolpersteine
- [Website-Builder](./website-builder) — der Baum aus Seiten, Abschnitten und Elementen, die Renderer, der Blog, SEO und die KI-Erzeugung (was gerendert wird, sobald eine Anfrage einer Kirche bzw. Site zugeordnet ist)
- [Content-Endpunkte](../api/endpoints/content) — die REST-Schnittstelle für Seiten, Blöcke, Links und globale Stile, die jetzt alle `?siteId=` berücksichtigen
- [B1App](../web-apps/b1-app) — die Next.js-App, die die Middleware und das Routing `[sdSlug]` betreibt
- [Deployment der Web-Apps](../deployment/web-apps) — wie B1App auf Vercel bereitgestellt wird
