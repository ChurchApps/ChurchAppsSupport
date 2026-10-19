---
title: "Website-Routing und Multi-Site"
---

# Website-Routing und Multi-Site

<div class="article-intro">

Eine einzelne Kirche kann jetzt mehr als eine eigenständige Website betreiben, und jede davon kann unter einer `*.b1.church`-Subdomain oder unter einer vollständig benutzerdefinierten, kircheneigenen Domain erreichbar sein. Diese Seite beschreibt die Routing-Ebene *unterhalb* des Builders: wie eine eingehende Anfrage sowohl einer Kirche als auch einer bestimmten Website zugeordnet wird, das Multi-Site-Datenmodell (der `siteId`-Platzhalter, der dafür sorgt, dass alle bereits bestehenden Websites unverändert angezeigt werden) und den Edge für benutzerdefinierte Domains – einen selbstverwalteten Caddy-Proxy auf EC2, der TLS terminiert und jede Kirchendomain auf ihren `*.b1.church`-Upstream umschreibt. Was nach der Zuordnung einer Anfrage tatsächlich gerendert wird – also den Baum aus Seiten, Abschnitten und Elementen – finden Sie unter [Website Builder](./website-builder).

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

Drei Regeln gelten in dieser Ebene durchgängig:

1. **Ein Platzhalter sorgt für Abwärtskompatibilität.** `siteId = ''` ist die Hauptwebsite. Jede Seite, jeder Block, jeder Link, jeder globale Stil und jede Domain-Zeile, die es vor dieser Funktion gab, trägt `''` und wird genau so gerendert wie bisher. Eine *zweite* Website ist einfach eine Menge von Zeilen mit einer nicht leeren `siteId`, und jeder Content-Endpunkt, der ohne `?siteId=` aufgerufen wird, liefert die Hauptwebsite – byte-genau die alte Anfrage.
2. **Die Zuordnung erfolgt über das Host-Label und konvergiert.** Eine `*.b1.church`-Subdomain wird direkt anhand ihres Host-Labels geroutet; eine benutzerdefinierte Domain wird an der Caddy-Kante auf ihr `{sub}.b1.church`-Label umgeschrieben, bevor B1App sie sieht (mit einer Datenbankabfrage in der Middleware, die als Fallback einen `x-site`-Header setzt, falls ein roher benutzerdefinierter `Host` ankommt). Beide Wege landen auf derselben `[sdSlug]`-Route und demselben `churches/lookup`-Aufruf, sodass das nachgelagerte Rendering identisch ist.
3. **Die Caddy-Kante ist zustandslos und beruht auf einer einzigen Quelle der Wahrheit.** Benutzerdefinierte Domains enden bei einem selbstverwalteten Caddy-Proxy auf EC2, der jede Domain auf ihren `{sub}.b1.church`-Upstream umschreibt. Beim Speichern einer Domain wird ein einzelner Best-Effort-Aufruf `CaddyHelper.updateCaddy()` ausgelöst, und Caddy liest außerdem direkt die Tabelle `domains` (über die unten beschriebenen Endpunkte `authorize` und `hostmap`). Die Tabelle ist maßgeblich – ein nicht erreichbarer Caddy kann niemals ein Speichern fehlschlagen lassen.

## Site-Zuordnung

### `*.b1.church`-Subdomains

`B1App/next.config.mjs` schreibt eingehende Anfragen anhand des Hosts um. Eine Host-Regel mit dem Muster `(?<subdomain>.*?)\..*` erfasst das **erste Label** des Hosts und schreibt `/` und `/:path*` in `/{subdomain}` um – das App-Router-Segment `[sdSlug]`. Aus `grace.b1.church/about` wird also `/grace/about`.

Innerhalb von `src/app/[sdSlug]/` ruft `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) `GET /membership/churches/lookup/?subDomain={sdSlug}` auf. Die Antwort von `ChurchController.getBySubDomain` hat nun zwei Zweige:

| Slug stimmt überein mit | Antwort | Bedeutung |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Hauptwebsite dieser Kirche |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Eine **zweite Website** – der Controller greift auf `sites` zurück, ermittelt die zugehörige Kirche und gibt den angefragten Slug zusammen mit der zusätzlichen `siteId` zurück |

Diese zusätzliche `siteId` ist das Einzige, was eine Anfrage an eine zweite Website von einer an die Hauptwebsite unterscheidet; alles andere in der Pipeline ist gemeinsam.

Ein Slug, der in keiner der beiden Tabellen vorkommt, liefert `{}` mit Status `200` zurück. `ConfigHelper.load` behandelt eine Antwort ohne `id` als unbekannte Website und ruft Next `notFound()` auf, sodass eine unbekannte Subdomain eine echte 404 erhält, statt dass alle folgenden Aufrufe nach `/…/undefined` fragen. Die Route für Builder-Seiten erstellt ihren Baumpfad außerdem mit `pageTreePath()` (`src/helpers/pageTreePath.ts`), das den Slug URL-kodiert. Ein fehlerhafter Slug (Backslashes, Leerzeichen) führt daher zu einer 404, statt den `400` der API als 500 durchzureichen.

### Benutzerdefinierte Domains {#custom-domains}

Eine kircheneigene Domain endet an der **Caddy-Kante** (weiter unten beschrieben), die den `Host`-Header auf das `{sub}.b1.church` der Website umschreibt, bevor an B1App weitergeleitet wird. Auf dem normalen Weg empfängt B1App also einen *internen* `*.b1.church`-Host und löst ihn anhand des Host-Labels genau wie eine native Subdomain auf – die Datenbankabfrage der Middleware wird nie ausgelöst. `src/middleware.ts` läuft trotzdem bei jeder Anfrage, hat aber eine ständige Aufgabe und einen Fallback:

1. **Immer** – sie **löscht jeden vom Client gesendeten `x-site`-Header**. Dieser Header ist manipulierbare Umschreibe-Eingabe und wird nur dann vertraut, wenn die Middleware ihn selbst setzt; ihn zu entfernen ist die eigentliche Aufgabe der Middleware hinter Caddy.
2. **Fallback, nur bei nicht-internem `Host`** – für einen rohen benutzerdefinierten `Host`, der B1App *ohne* Caddy-Umschreibung erreicht, wird `GET /membership/domains/public/lookup/{host}` aufgerufen, und falls dieser eine `subDomain` liefert, wird `x-site: {subDomain}.b1.church` gesetzt. Hinter Caddy ist dieser Zweig wirkungslos, weil der `Host` bereits `*.b1.church` ist.

Interne Hosts – `localhost`, `b1.church` sowie die Suffixe `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app` und `.vercel.app` – überspringen die Abfrage vollständig (sie werden bereits durch die Host-Label-Umschreibung aufgelöst oder sind Vorschau- bzw. Deployment-Hosts).

Die Abfrage selbst (`DomainRepo.loadByName`) führt einen Left Join von `domains → churches` und `domains → sites` aus und gibt `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` zurück – also die Subdomain der zugewiesenen zweiten Website, falls die Domain auf eine solche zeigt, andernfalls die der Kirche. Zuerst wird der exakte Host geprüft; beginnt dieser mit `www.` und findet keinen Treffer, wird **einmal** gegen die nackte Apex-Domain wiederholt.

Zurück in `next.config.mjs` stehen die `x-site`-Umschreiberegeln **vor** den allgemeinen Host-Regeln und haben daher Vorrang. `x-site: grace.b1.church` → erstes Label `grace` → `[sdSlug] = grace`, und ab hier ist die Zuordnung identisch mit dem Subdomain-Weg (gleicher `churches/lookup`-Aufruf, gleiche `siteId`).

:::info
Der `x-site`-Header ist von außen nicht vertrauenswürdig. Die Middleware entfernt jeden eingehenden `x-site`-Header bedingungslos, bevor sie optional ihren eigenen setzt, und die Umschreiberegeln sehen nur den von der Middleware gesetzten Wert – ein Client kann sich nicht durch das Senden eines Headers auf die Inhalte einer anderen Kirche schalten.
:::

Zwei betriebliche Details zur Middleware:

- **Cache.** Das Ergebnis für jeden Host (ein Treffer *oder* ein bestätigter Fehlschlag – niemals ein Netzwerkfehler) wird **10 Minuten** lang in einer In-Memory-`Map` pro Serverless-Isolate zwischengespeichert.
- **Matcher.** Der Matcher nimmt `/sitemap.xml`, `/robots.txt` und `/manifest.webmanifest` bewusst wieder auf. Sein erstes Muster schließt Pfade mit Punkt aus, was diese Dateien sonst herausfiltern würde; sie werden wieder hinzugefügt, damit die SEO- und PWA-Dateien einer Kirche auf einer benutzerdefinierten Domain ebenfalls den `x-site`-Header erhalten.
- **Kanonischer Header.** Bei Kirchenseiten hängt die Middleware einen Antwort-Header `Link: <{proto}://{host}{path}>; rel="canonical"` an, der den Host nennt, von dem die Seite tatsächlich ausgeliefert wurde – Subdomain oder benutzerdefinierte Domain (`helpers/canonicalLink.ts`). Auf Nicht-Kirchen-Hosts (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) sowie unter `/mobile`, `/login`, `/logout` und den generierten robots-, sitemap- und manifest-Dateien wird er übersprungen.

### Deaktivierte öffentliche Website

Eine Kirche kann in B1Admin die Option **Öffentliche Website deaktivieren** aktivieren (kircheneinstellung `hidePublicSite = "true"`). Die Website liefert dann nur noch ihre Routen für Mitglieder aus:

- **Die B1App-Middleware** sucht die Subdomain nach (`/membership/churches/lookup`, danach `/content/settings/public/:churchId`) und leitet anonyme Anfragen für jeden Pfad außerhalb der Erlaubnisliste auf `/login?returnUrl={path}{query}` um. Die Erlaubnisliste (`helpers/publicSite.ts`) umfasst `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` sowie die Manifest-, robots- und sitemap-Dateien. Nur bestätigte Antworten werden zwischengespeichert (in der Produktion 60 Sekunden, da der Revalidierungsaufruf des Admins diese instanzbezogene Map nicht leeren kann; in Entwicklung und Tests nicht zwischengespeichert). Ein API-Fehler liefert die Website aus, statt alle auszusperren.
- **Angemeldete Mitglieder sehen die vollständige Website.** Eine Anfrage mit einem nicht abgelaufenen `jwt`-Cookie (die Funktion `hasSession()` der Middleware liest das `exp`-Feld der Payload aus, ohne die Signatur zu prüfen – es handelt sich um eine weiche Sperre, nicht um eine Zugriffskontrolle) umgeht die Weiterleitung. Nach dem Anmelden kehrt ein Mitglied daher zu der Seite zurück, die es angefragt hat, und sieht die normalen Seiten, eingebauten Seiten (Gruppen, Predigten usw.) und die Kopfzeilen-Navigation. Die Seitenkomponenten und der `Header` prüfen `hidePublicSite` nicht mehr selbst.
- **`robots.txt`** untersagt alles, wie auf Hosts mit noindex.
- **API.** `GET /content/pages/public/:churchId` (die Seitenliste der Sitemap) gibt `[]` zurück, sodass anonyme Aufrufer die Seiten nicht auflisten können.

### Weitergabe von `siteId`

`ConfigHelper` speichert die aufgelöste `siteId` in seiner pro Anfrage gültigen `ConfigurationInterface` (mit React `cache()` gemerkt) und hängt `?siteId=` an die Content-Aufrufe an, die es und die Seitenkomponenten ausführen – **bedingt**: Eine leere `siteId` (eine Subdomain der Hauptkirche) lässt den Parameter ganz weg. Die Endpunkte mit Weitergabe sind der Seitenbaum (`/content/pages/:id/tree`), die öffentliche Seitenliste für die Sitemap (`/content/pages/public/:id`), globale Stile (`/content/globalStyles/church/:id`), Navigationslinks (`/content/links/church/:id`) und der eigenständige Footer-Block (`/content/blocks/public/footer/:id`). Auf dem normalen Renderpfad kommt der Footer innerhalb des Seitenbaums an (Abschnitte mit `zone: "siteFooter"`), der bereits mit `siteId` geladen wurde, sodass es keine Lücke ohne Website-Bezug gibt.

Das Mitgliederportal (B1App `mobile`) bleibt bewusst außen vor: `loadChurchAppearance.ts` ermittelt die Kirche über `churches/lookup`, liest aber die kircheneinstellungen unter `/settings/public/{id}` und gibt `siteId` nie weiter – das Portal gilt in Version 1 kirchenweit (siehe unten).

## Mehrere Websites pro Kirche

### Datenmodell

Die neue Tabelle `membership.sites` ist bewusst schlank:

| Spalte | Typ | Hinweise |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Besitzende Kirche |
| `name` | `varchar(255)` | Anzeigename (z. B. „Español“, „Youth“) |
| `subDomain` | `varchar(45)` | **Eindeutiger Index** – globaler Namensraum (siehe unten) |

Die Zuordnung von Inhalten zu einer Website erfolgt dann über eine einzige, nicht-nullbare Spalte, die den Content- und Domain-Tabellen hinzugefügt wird:

| Tabelle (Modul) | Spalte | `''` bedeutet |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain liefert die Hauptwebsite aus |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Hauptwebsite – und bei **`blocks`** bedeutet `''` zusätzlich *für alle Websites gemeinsam* |

Zwei Migrationen fügen all dies hinzu (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Da die Spalte standardmäßig `''` enthält, verhält sich jede bestehende Zeile weiterhin wie bisher, ohne dass eine Nachpflege nötig ist.

**Globaler Subdomain-Namensraum.** `sites.subDomain` teilt sich *einen* Namensraum mit `churches.subDomain` – eine Website-Subdomain kann niemals mit einer Kirchen-Subdomain oder der einer anderen Website kollidieren. Dies wird auf **beiden** Speicherpfaden erzwungen: `SiteController.save` weist einen Slug zurück, der in `churches` oder `sites` vorkommt, und `ChurchController.validateSave` tut dasselbe in umgekehrter Richtung. Ein eindeutiger Index auf `sites.subDomain` sichert dies auf Datenbankebene ab.

**Eindeutigkeit der Seiten** wurde von `(churchId, url)` auf `(churchId, siteId, url)` erweitert, damit zwei Websites einer Kirche jeweils ihre eigene `/about` besitzen können.

### Inhalte pro Website, mit Fallbacks

Jeder websitebezogene Endpunkt zum **Auflisten bzw. Abrufen des Baums** akzeptiert ein optionales `?siteId=` (fehlt es, gilt `''` = Hauptwebsite): Seiten-Baum, -Liste und -öffentlich, Blöcke (Liste, nach Typ, Footer), Links (anonym, gefiltert, alle) sowie globale Stile. Abschnitte und Elemente sind nicht direkt zugeordnet; sie erben die Zuordnung über ihre übergeordnete Seite bzw. ihren übergeordneten Block.

Zwei Auflösungsketten leisten die interessante Arbeit:

- **Globale Stile – `Website → Hauptwebsite → Standard`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` gibt die eigene Zeile der Website zurück; hat eine zweite Website keine, gibt sie die **Zeile der Hauptwebsite (`''`) unverändert** zurück (mit deren `id`/`siteId`, die der Client für das Kopieren beim Schreiben verwendet). Gibt es auch keine Hauptwebsite, liefert `GlobalStyleController` eine fest codierte Standardpalette und -schriften.
- **Footer-Block – websitespezifisch hat Vorrang, gemeinsamer dient als Fallback.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` gibt sowohl die gemeinsamen (`''`) als auch die websitespezifischen Zeilen zurück; der Resolver wählt den eigenen Footer der Website, falls vorhanden, andernfalls den gemeinsamen. Dieselbe Logik läuft sowohl in `TreeHelper.insertBlocks` (Seitenbaum) als auch im eigenständigen Endpunkt `/content/blocks/public/footer/:churchId`.

### Löschkaskade einer Website

`SiteController.delete` (abhängig von der Berechtigung „Einstellungen → Bearbeiten“ im Modul Mitgliedschaft) entfernt eine zweite Website in drei Schritten:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` löscht kaskadierend alle Inhalte, die die Website besitzt: ihre **Seiten** → deren Abschnitte, Elemente, `pageHistory` und `posts`; ihre eigenen **Blöcke** → deren Abschnitte, Elemente und `pageHistory`; ihre **Links** und **globalStyles**. Eine Schutzprüfung verweigert die Ausführung für `''` – der Platzhalter für Hauptwebsite bzw. gemeinsame Inhalte wird niemals kaskadiert.
2. `DomainRepo.clearSiteId` **weist** die Domains der Website wieder der Hauptwebsite zu (`siteId → ''`), statt sie zu löschen, sodass eine benutzerdefinierte Domain die Löschung einer Website überdauert.
3. Die Zeile in `sites` wird gelöscht und die Caddy-Routen werden neu synchronisiert (Best Effort).

### Oberfläche in B1Admin

| Funktion | Wo | Mechanismus |
|-----------|-------|-----------|
| Website-Umschalter | `useSiteSelection` + `SiteSwitcher` (leer = „Hauptwebsite“) | Liest einen URL-Parameter `?site=` und gibt ihn als `?siteId=` an ContentApi-Aufrufe weiter. Vorhanden in den drei Listenbereichen für Websites – **Seiten**, **Blöcke**, **Erscheinungsbild** – aber *nicht* in den Editoren für Seiten und Blöcke, die die `siteId` am Datensatz selbst führen |
| Websites anlegen/löschen | `SitesDialog`, geöffnet über den Eintrag „Websites verwalten…“ im Umschalter | `POST /membership/sites` / `DELETE /membership/sites/:id` (Name + subDomain). Abhängig von der Berechtigung „Einstellungen → Bearbeiten“ im Modul Mitgliedschaft (`Permissions.settings.edit` serverseitig; `Permissions.membershipApi.settings.edit` in B1Admin). **Nur Anlegen/Löschen – in Version 1 gibt es keine Umbenennung über die Oberfläche** |
| Zuweisung der Website pro Domain | `DomainSettingsEdit` unter Einstellungen → Domains | Eine Auswahlliste pro Zeile sendet `siteId` für jede Domain an `/membership/domains`. Die Spalte wird ausgeblendet, wenn die API keine Websites liefert (ältere Backend-Version) |
| Kopieren beim Schreiben für Stile | `StylesManager.prepareForSave` | Wenn die geladene globale Stilzeile eine `siteId` hat, die nicht der ausgewählten Website entspricht (d. h. die API hat die geerbte Hauptwebsite als Fallback geliefert), entfernt sie die `id` der Hauptwebsite und setzt die aktuelle `siteId`. Dadurch wird ein **Einfügen** einer neuen, websitespezifischen Zeile erzwungen, statt die Hauptwebsite zu überschreiben. Dieselbe Verzweigung bei Abweichung gilt für den Footer-Block der Website |

:::info
**Was in Version 1 kirchenweit bleibt (eine bewusste Entscheidung beim Umfang, keine Grenze des Datenmodells):** der **Blog** (`BlogPage` hat keinen Umschalter und lädt `/posts` ohne `siteId`), die **Website-Widgets** (Ankündigungsbanner und Launcher), **Weiterleitungen**, das **Logo / GA4 / die Kircheneinstellungen** sowie das **Mitgliederportal** (B1App mobile). Beachten Sie, dass dies *nicht* den gesamten Bereich „Erscheinungsbild“ betrifft – die globalen Stile einer zweiten Website (Palette, Schriften, Typografie, Abstände, Navigation, benutzerdefiniertes CSS) **sind** pro Website über den oben beschriebenen Pfad des Kopierens beim Schreiben; nur die Unterbereiche Banner/Launcher/Weiterleitungen/Logo der Seite „Erscheinungsbild“ bleiben kirchenweit.
:::

## Benutzerdefinierte Domains: Caddy-Kante (Plan mit statischer Konfiguration)

:::info
**Richtung geändert am 02.07.2026.** Ein früherer Plan, das Hosting benutzerdefinierter Domains auf von Vercel verwaltete Domains zu verlagern, wurde **verworfen**, und der gesamte Vercel-Code zur Domain-Registrierung (`VercelHelper`, seine Umgebungsvariablen `vercelToken`/`vercelProjectId`/`vercelTeamId`, SSM-Parameter und Health-Einträge) wurde aus der API entfernt. Der selbstverwaltete **Caddy-Proxy auf EC2 bleibt** als dauerhafte Kante für benutzerdefinierte Domains. Die einzige verbleibende Arbeit betrifft das Interne: die *Laufzeit*-Konfiguration von Caddy über die Admin-API durch eine *statische* Konfiguration zu ersetzen, die Neustarts überdauert.
:::

### Die Kante

Jede benutzerdefinierte Kirchendomain zeigt per DNS auf einen einzigen EC2-Server – `3.23.251.61`, auch unter `proxy.b1.church` erreichbar. Der Bildschirm „Einstellungen → Domains“ in B1Admin weist Kirchen an, einen Apex-Eintrag `A → 3.23.251.61` oder einen `CNAME → proxy.b1.church` anzulegen. Caddy terminiert TLS mit einem Let's-Encrypt-Zertifikat pro Domain, schreibt den `Host`-Header auf den `{sub}.b1.church`-Upstream der Domain um und leitet an B1App weiter – das die Anfrage dann anhand des Host-Labels wie jede native Subdomain zuordnet (siehe oben [Benutzerdefinierte Domains](#custom-domains)).

Die Zuordnung zum Upstream stammt von `DomainRepo.loadPairs`, dessen Ziel **die Subdomain der zugewiesenen Website per COALESCE** verwendet, sodass eine Domain an die richtige *zweite* Website weitergeleitet wird und andernfalls auf die Hauptwebsite der Kirche zurückfällt:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Zeilen mit `www.*` sind aus der Zuordnung ausgeschlossen; Caddy bedient `www.{host}` stattdessen über eine Weiterleitung mit `302` auf die Apex-Domain.

### Zwei anonyme Endpunkte speisen die Kante

`DomainController` stellt zwei nicht authentifizierte, rein lesende Endpunkte bereit, die der Server direkt nutzt – anonym aus Notwendigkeit, da die Kante sie abfragt, bevor es überhaupt einen Kontext der Kirche gibt:

| Endpunkt | Liefert | Aufgabe |
|----------|---------|---------|
| `GET /membership/domains/authorize?domain=` | `200`, wenn die Domain – oder bei einem Fehlschlag mit `www.` deren nackte Apex-Domain – in `domains` existiert; sonst `404` (auch bei einer leeren `domain`) | Caddys **`ask` für On-Demand-TLS**: die Missbrauchskontrolle, die entscheidet, ob für einen eingehenden SNI ein Zertifikat ausgestellt wird |
| `GET /membership/domains/hostmap` | `text/plain`, eine sortierte Zeile `{domain} {sub}.b1.church` pro routbarer Domain | Die Host-zu-Upstream-Zuordnungsdatei, die der Server per Timer aktualisiert |

`authorize` verwendet `DomainRepo.loadByName` wieder (exakter Host, danach ein einzelner Wiederholungsversuch mit `www.` → Apex); `hostmap` verwendet `loadPairs` wieder – ist also websitebezogen und schließt `www.*` aus, genau wie die Proxy-Routen – und entfernt lediglich das Suffix `:443`.

### Speichern/Löschen einer Domain – ein einziger Push nach bestem Bemühen

`DomainController.save` schreibt die Zeilen in `domains` und führt danach einen **einzigen Aufruf nach bestem Bemühen** von `CaddyHelper.updateCaddy()` aus, der in einen `try/catch` eingebettet ist, der protokolliert (`console.error`) und verschluckt; `delete` verfährt genauso (was außerdem einen früheren Fehler mit veralteten Routen beim Löschen behob), ebenso das Löschen einer zweiten Website (`SiteController.delete`). `updateCaddy` ist selbst durch ein Timeout von **10 s** bei Axios begrenzt, sodass ein nicht erreichbarer oder gestoppter Caddy niemals ein Speichern einer Domain mit `500` scheitern lassen kann – die Tabelle `domains` ist die Quelle der Wahrheit.

### Aktueller Stand – statische Konfiguration, kein Laufzeitzustand

Der Server (eine Windows-EC2-Instanz hinter der dauerhaften Elastic IP) führt Caddy mit einer **statischen Caddyfile** aus: On-Demand-TLS, dessen `ask` auf `/membership/domains/authorize` zeigt, sowie eine Datei mit der Zuordnung Host → Upstream, die alle 5 Minuten von `/membership/domains/hostmap` aktualisiert wird – durch eine geplante Aufgabe, die mit einem geordneten `caddy reload` endet. Die Konfiguration übersteht Neustarts ohne jeglichen Laufzeitzustand – kein erneutes Vorbereiten nötig – und ein unbekannter SNI wird **per TLS abgelehnt** (für einen Host, den `authorize` ablehnt, wird kein Zertifikat erstellt), während ein autorisierter, aber noch nicht zugeordneter Host (eine brandneue Domain innerhalb des Synchronisierungsfensters) eine saubere 404 erhält. Neue Domains sind innerhalb von etwa 5 Minuten nach dem Speichern erreichbar; ihre Zertifikate werden beim ersten Aufruf ausgestellt. Aufbau/Einrichtung, Betrieb und praxiserprobte Stolperfallen: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### Alter Laufzeit-Push – Rollback-Pfad, zur Löschung vorgesehen

`CaddyHelper` (Modul Mitgliedschaft) kann Caddy weiterhin über seine **Admin-API** unter `caddyHost:caddyPort` steuern (SSM `caddyHost`/`caddyPort`; ohne Wirkung, wenn nicht gesetzt; angezeigt in der Gruppe „Integrationen“ des `ServerHealthController`): `updateCaddy()` sendet per PATCH ein vollständiges Routen-Array, und `initializeCaddy()` sowie die Endpunkte `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` bauen einen laufzeitkonfigurierten Server von Grund auf neu. Die Konfiguration dieses Modus existierte nur im Speicher von Caddy – die Vergesslichkeit bei Neustarts, die diese Architektur ersetzt hat. Der Mechanismus bleibt ausschließlich als Rollback-Pfad erhalten und soll gelöscht werden, sobald der statische Server stabil läuft; der Best-Effort-Push `updateCaddy()` beim Speichern/Löschen einer Domain ist gegenüber dem statischen Server ein harmloser No-Op (dessen Admin-API nur über localhost erreichbar ist).

## Verwandte Seiten

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) – der Edge-Server selbst: Einrichtung auf einem neuen Server, WinSW-Dienst, Aufgabe zur Synchronisierung der Zuordnung und betriebliche Stolperfallen
- [Website Builder](./website-builder) – der Baum aus Seiten, Abschnitten und Elementen, Renderer, Blog, SEO und KI-Generierung (was gerendert wird, sobald eine Anfrage einer Kirche/Website zugeordnet ist)
- [Content Endpoints](../api/endpoints/content) – die REST-Schnittstelle für Seiten, Blöcke, Links und globale Stile, die jetzt alle `?siteId=` berücksichtigen
- [B1App](../web-apps/b1-app) – die Next.js-App, die die Middleware und das `[sdSlug]`-Routing bereitstellt
- [Web App Deployment](../deployment/web-apps) – wie B1App auf Vercel bereitgestellt wird
