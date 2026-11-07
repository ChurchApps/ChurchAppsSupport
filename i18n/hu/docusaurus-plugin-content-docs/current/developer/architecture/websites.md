---
title: "Webhely-útvonalkezelés és több webhely"
description: "Hogyan képezi le a B1.church az aldomaineket és egyedi domaineket a megfelelő gyülekezetre vagy másodlagos oldalra, valamint az egyedi domainek TLS-ét kezelő Caddy edge-réteget."
---

# Webhely-útvonalkezelés és több webhely

<div class="article-intro">

Egy gyülekezet mostantól több, egymástól független webhelyet is üzemeltethet. Mindegyik elérhető egy `*.b1.church` aldomainen vagy egy teljesen egyedi, a gyülekezet tulajdonában lévő domainen. Ez az oldal a builder *alatt* működő útvonalkezelő réteget mutatja be: hogyan lesz egy beérkező kérésből gyülekezet **és** egy konkrét webhely, hogyan működik a több webhelyes adatmodell (a `siteId` őrszeme, amely minden korábbi webhelyet változatlanul megjelenítve tart), valamint az egyedi domainek peremrétegét: egy EC2-n futó, saját kezelésű Caddy proxyt, amely lezárja a TLS-t, és minden gyülekezeti domaint a hozzá tartozó `*.b1.church` upstreamre írja át. Arról, hogy mi jelenik meg, miután a kérés feloldódott — az oldal-, szakasz- és elemfáról — lásd: [Webhelyszerkesztő](./website-builder.md).

</div>

## Áttekintés

```
   grace.b1.church              www.gracechurch.org  (egyedi domain)
   (b1.church aldomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy peremréteg — EC2 3.23.251.61        │
          │             │             (proxy.b1.church)             │
          │             │  • lezárja a TLS-t (domainenkénti LE tanúsítvány) │
          │             │  • Host → {sub}.b1.church átírás          │
          │             │  • fordított proxy a B1App felé           │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • mindig: törli a kliens által küldött x-site fejlécet (hamisítás ellen) │
   │  • belső *.b1.church Host ⇒ a domain-keresés nem fut le    │
   │  • nyers egyedi Host (Caddy kihagyásával) ⇒ keresés → x-site beállítása │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → első címke → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   a ?siteId= paramétert minden tartalomhívásba továbbítja: │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain mentése/törlése (B1Admin Beállítások→Domainek → POST /membership/domains)
        └─ legjobb igyekezettel CaddyHelper.updateCaddy()  (becsomagolva, nem végzetes, 10 mp időkorlát)
  A Caddy maga olvassa a domains táblát két névtelen végponton keresztül:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 ismert / 404 ismeretlen)
        GET /membership/domains/hostmap    — host→{sub}.b1.church térkép (5 percenkénti frissítés)
```

Ebben a rétegben három szabály érvényesül:

1. **Egy őrszem biztosítja a visszafelé kompatibilitást.** A `siteId = ''` a fő webhelyet jelöli. Minden oldal, blokk, hivatkozás, globális stílus és domainsor, amely a funkció előtt létezett, `''` értéket hordoz, és pontosan úgy jelenik meg, mint korábban. A *második* webhely egyszerűen olyan sorok halmaza, amelyeknek nem üres `siteId` értéke van. Bármely tartalomvégpont, amelyet `?siteId=` nélkül hívnak meg, a fő webhelyet adja vissza — bitről bitre ugyanazt a választ, mint a régi kérés.
2. **Az útvonalfeloldás a host címkéjén alapul, és egy közös pontba fut össze.** Egy `*.b1.church` aldomain közvetlenül a host címkéje alapján routolódik; az egyedi domaint a Caddy peremrétegen még azelőtt `{sub}.b1.church` címkére írják át, hogy a B1App látná (a middleware adatbázis-keresése pedig `x-site` fejlécet állít be tartalék megoldásként minden nyers egyedi `Host` esetére). Mindkét ág ugyanarra a `[sdSlug]` útvonalra és ugyanarra a `churches/lookup` hívásra fut, így a további megjelenítés azonos.
3. **A Caddy peremréteg állapotmentes, egyetlen igazságforrás fölött.** Az egyedi domainek egy saját kezelésű Caddy proxynál zárulnak le az EC2-n, amely minden domaint a `{sub}.b1.church` upstreamre ír át. Domain mentésekor egyetlen, legjobb igyekezettel végrehajtott `CaddyHelper.updateCaddy()` hívás indul, a Caddy pedig közvetlenül is olvassa a `domains` táblát (lent ismertetett `authorize` és `hostmap` végpontok). A tábla az irányadó — egy elérhetetlen Caddy sosem teheti sikertelenné a mentést.

## Webhelyfeloldás

### `*.b1.church` aldomainek

A `B1App/next.config.mjs` host alapján írja át a beérkező kéréseket. Egy `(?<subdomain>.*?)\..*` mintájú host-szabály a host **első címkéjét** rögzíti, és a `/` és `/:path*` útvonalakat `/{subdomain}` formára írja át — ez a `[sdSlug]` App Router szegmens. Így a `grace.b1.church/about` címből `/grace/about` lesz.

A `src/app/[sdSlug]/` mappán belül a `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) meghívja a `GET /membership/churches/lookup/?subDomain={sdSlug}` végpontot. A `ChurchController.getBySubDomain` válaszának most két ága van:

| Az azonosító egyezik | Válasz | Jelentés |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Az adott gyülekezet fő webhelye |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Egy **másodlagos webhely** — a vezérlő a `sites` táblához fordul, feloldja a tulajdonos gyülekezetet, és visszaadja a lekérdezett azonosítót kiegészítve a `siteId` mezővel |

Ez az extra `siteId` az egyetlen dolog, amely megkülönbözteti a másodlagos webhely kérését a fő webhelyétől; minden más része a feldolgozásnak közös.

Ha az azonosító egyik táblával sem egyezik, a válasz `{}` lesz `200`-as státusszal. A `ConfigHelper.load` az `id` nélküli választ ismeretlen webhelyként kezeli, és meghívja a Next `notFound()` függvényét, így egy ismeretlen aldomain valódi 404-et kap, ahelyett hogy minden további hívás a `/…/undefined` útvonalat kérdezné le. A webhelyoldal útvonala a `pageTreePath()` (`src/helpers/pageTreePath.ts`) segítségével építi fel a fa elérési útját, amely URL-kódolja az azonosítót, így a hibás azonosító (fordított perjelekkel, szóközökkel) 404-et ad, nem pedig az API `400`-as hibájából lesz 500-as hiba.

### Egyedi domainek

Egy gyülekezet tulajdonában lévő domain a **Caddy peremrétegen** zárul le (lent részletezve), amely a `Host` fejlécet a webhely `{sub}.b1.church` címére írja át, mielőtt a B1App felé továbbítaná. Így a szokásos úton a B1App egy *belső* `*.b1.church` hostot kap, és azt pontosan úgy oldja fel a host címkéje alapján, mint egy natív aldomaint — a middleware adatbázis-keresése sosem fut le. A `src/middleware.ts` ugyan minden kérésnél lefut, de egy állandó feladata és egy tartalék funkciója van:

1. **Mindig** — **törli a kliens által küldött `x-site` fejlécet**. Ez a fejléc hamisítható átírási bemenet, és csak akkor bízunk benne, ha maga a middleware állította be; a törlés a middleware valódi feladata a Caddy mögött.
2. **Tartalék, csak nem belső `Host` esetén** — ha egy nyers egyedi domain `Host` érkezik a B1App-hoz a Caddy átírása nélkül, meghívja a `GET /membership/domains/public/lookup/{host}` végpontot, és ha az visszaad egy `subDomain` értéket, beállítja az `x-site: {subDomain}.b1.church` fejlécet. A Caddy mögött ez az ág inaktív, mert a `Host` már `*.b1.church`.

A belső hostok — `localhost`, `b1.church`, valamint a `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app` és `.vercel.app` végződések — teljesen kihagyják a keresést, mert a host-címke átírás már feloldotta őket, vagy előnézeti/telepítési hostok.

Maga a keresés (`DomainRepo.loadByName`) a `domains → churches` és a `domains → sites` táblákhoz csatol bal külső illesztéssel, és a `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` értéket adja vissza — vagyis a hozzárendelt másodlagos webhely aldomainjét, ha a domain arra mutat, különben a gyülekezetét. Először a pontos hostra illeszkedik; ha a host `www.`-vel kezdődött és nem talált, **egyszer** újrapróbálja a puszta apexen.

A `next.config.mjs`-ben az `x-site` átírási szabályok az általános host-szabályok **elé** kerülnek, így elsőbbséget élveznek. Az `x-site: grace.b1.church` → első címke `grace` → `[sdSlug] = grace`, és innentől a feloldás azonos az aldomain útvonallal (ugyanaz a `churches/lookup`, ugyanaz a `siteId`).

:::info
Az `x-site` fejléc kívülről nem megbízható. A middleware feltétel nélkül eltávolít minden bejövő `x-site` fejlécet, mielőtt opcionálisan beállítaná a sajátját, a átírási szabályok pedig csak a middleware által beállított értéket látják — a kliens nem kényszerítheti rá magát más gyülekezet tartalmára egy fejléc küldésével.
:::

A middleware két működési részletet érdemes ismerni:

- **Gyorsítótár.** Minden host eredményét (találatot *vagy* megerősített sikertelen keresést — hálózati hibát soha) **10 percig** tárolja egy memóriabeli `Map`-ben, szerverless izolációnként.
- **Illesztés.** Az illesztő szándékosan újra felveszi a `/sitemap.xml`, `/robots.txt` és `/manifest.webmanifest` útvonalakat. Az első minta kizárja a pontot tartalmazó útvonalakat, ami egyébként ezeket a fájlokat is kizárná; ezért visszakerülnek, hogy az egyedi domain gyülekezetenkénti SEO/PWA fájljai is megkapják az `x-site` fejlécet.
- **Kanonikus fejléc.** Gyülekezeti oldalak esetén a middleware egy `Link: <{proto}://{host}{path}>; rel="canonical"` válaszfejlécet fűz hozzá, amely megnevezi azt a hostot, ahonnan az oldal ténylegesen kiszolgálásra került — aldomain vagy egyedi domain (`helpers/canonicalLink.ts`). Amikor egy egyedi domain a [Caddy proxyn](../deployment/caddy-proxy.md) keresztül érkezik a B1App-hoz, a kérés hostja a `{sub}.b1.church` aldomain, ezért a middleware a látogató domainjét az `X-Church-Host` fejlécből veszi — de csak miután a `/domains/public/lookup/{host}` megerősítette, hogy ez a domain ugyanarra az aldomainre mutat (`ownsSubdomain()`). A kanonikus link, a `robots.txt` és a `sitemap.xml` ekkor már az egyedi domaint nevezi meg, nem a `b1.church` aldomaint. Nem gyülekezeti hostokon (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) és a `/mobile`, `/login`, `/logout` útvonalakon, valamint a generált robots/sitemap/manifest fájloknál kihagyja.

### Letiltott nyilvános webhely

A gyülekezet a B1Adminban bekapcsolhatja a **Nyilvános webhely letiltása** opciót (gyülekezeti szintű tartalombeállítás: `hidePublicSite = "true"`). A webhely ekkor csak a tagoknak szánt útvonalakat szolgálja ki:

- **A B1App middleware** megkeresi az aldomaint (`/membership/churches/lookup`, majd `/content/settings/public/:churchId`), és a fehérlistán kívüli útvonalakra érkező névtelen kéréseket `/login?returnUrl={path}{query}` címre irányítja. A fehérlista (`helpers/publicSite.ts`) a következőket tartalmazza: `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, valamint a manifest/robots/sitemap fájlok. Csak a megerősített válaszokat gyorsítótárazza (élesben 60 másodpercig, mert az adminból érkező újraérvényesítő hívás nem tudja törölni ezt a példányonkénti térképet; fejlesztésben és tesztben nincs gyorsítótár). Egy API-hiba esetén a webhely kiszolgálásra kerül, nem zárja ki a látogatókat.
- **A bejelentkezett tagok a teljes webhelyet látják.** Egy lejárat nélküli `jwt` sütit tartalmazó kérés (a middleware `hasSession()` függvénye a payload `exp` mezőjét aláírás-ellenőrzés nélkül dekódolja — ez puha kapu, nem hozzáférés-vezérlés) kihagyja az átirányítást, így bejelentkezés után a tag oda érkezik vissza, ahová eredetileg tartott, és látja a normál oldalakat, a beépített oldalakat (Csoportok, Igehirdetések stb.) és a fejléc navigációt. Az oldalkomponensek és a `Header` már nem ellenőrzik maguktól a `hidePublicSite` értéket.
- **A `robots.txt`** mindent tilt, ahogyan a noindex hostokon is.
- **API.** A `GET /content/pages/public/:churchId` (a sitemap oldallistája) `[]` értéket ad vissza, így a névtelen hívók nem listázhatják az oldalakat.

### A `siteId` továbbítása

A `ConfigHelper` a feloldott `siteId` értéket a kérésenkénti `ConfigurationInterface` objektumában tárolja (React `cache()` segítségével memoizálva), és hozzáfűzi a `?siteId=` paramétert azokhoz a tartalomhívásokhoz, amelyeket ő és az oldalkomponensek intéznek — **feltételesen**: egy üres `siteId` (fő gyülekezeti aldomain) esetén a paramétert teljesen elhagyja. Az érintett végpontok: az oldalfa (`/content/pages/:id/tree`), a sitemap által használt nyilvános oldallista (`/content/pages/public/:id`), a globális stílusok (`/content/globalStyles/church/:id`), a navigációs hivatkozások (`/content/links/church/:id`), és az önálló lábléc-blokk (`/content/blocks/public/footer/:id`). A szokásos megjelenítési úton a lábléc az oldalfában érkezik (a `zone: "siteFooter"` jelölésű szakaszokként), amelyet már `siteId`-vel kérdeztek le, így nincs olyan, szűrés nélküli lábléc-rés.

A tagi portál (B1App `mobile`) szándékosan kimarad ebből: a `loadChurchAppearance.ts` a `churches/lookup` végponton keresztül oldja fel a gyülekezetet, de a gyülekezeti szintű `/settings/public/{id}` végpontot olvassa, és sosem továbbítja a `siteId` értéket — a portál a 1. verzióban gyülekezet-szintű (lásd lent).

## Több webhely egy gyülekezetnek

### Adatmodell

Az új `membership.sites` tábla szándékosan kicsi:

| Oszlop | Típus | Megjegyzés |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | A tulajdonos gyülekezet |
| `name` | `varchar(255)` | Megjelenő név (pl. „Español”, „Youth”) |
| `subDomain` | `varchar(45)` | **Egyedi index** — globális névtér (lent) |

A webhelyhez tartozás egyetlen, nem nullázható oszlopként kerül a tartalom- és domain-táblákhoz:

| Tábla (modul) | Oszlop | A `''` jelentése |
|----------------|--------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | A domain a fő webhelyet szolgálja ki |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Fő webhely — a **`blocks`** táblánál a `''` ezen felül *minden webhely között megosztott* jelentést is hordoz |

Két migráció adja hozzá mindezt (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Mivel az oszlop alapértéke `''`, minden meglévő sor változatlanul viselkedik, nincs szükség visszatöltésre.

**Globális aldomain-névtér.** A `sites.subDomain` *egyetlen* névteret oszt meg a `churches.subDomain` mezővel — egy webhely aldomainje soha nem ütközhet gyülekezeti aldomainnel vagy egy másik webhely aldomainjével. Ezt **mindkét** mentési útvonal kikényszeríti: a `SiteController.save` elutasít minden azonosítót, amely a `churches` vagy a `sites` táblában már létezik, a `ChurchController.validateSave` pedig fordítva teszi ugyanezt. Az adatbázis-szintű védelmet a `sites.subDomain` egyedi indexe adja.

**Az oldalak egyediségi szabálya** `(churchId, url)`-ról `(churchId, siteId, url)`-ra bővült, így egy gyülekezet két webhelye is rendelkezhet saját `/about` oldallal.

### Webhelyenkénti tartalom, tartalék megoldásokkal

Minden webhelyhez kötött tartalom **lista-/fa-végpont** opcionális `?siteId=` paramétert fogad (hiánya esetén `''` = fő webhely): oldalfa / lista / nyilvános oldalak, blokkok listája / típus szerint / lábléc, hivatkozások (névtelen / szűrt / összes), és globális stílusok. A szakaszok és elemek nem kapcsolódnak közvetlenül webhelyhez — szülőjük (oldal vagy blokk) révén öröklik azt.

Két feloldási lánc végzi a érdekes munkát:

- **Globális stílusok — `webhely → fő → alapértelmezett`.** A `GlobalStyleRepo.loadForChurch(churchId, siteId)` a webhely saját sorát adja vissza; ha a másodlagos webhelynek nincs ilyenje, a **fő (`''`) sort adja vissza változtatás nélkül** (megtartva a fő sor `id`/`siteId` értékét, amit a kliens a másolás-íráshoz használ); ha fő sor sincs, a `GlobalStyleController` egy kódba égetett alapértelmezett színkészletet és betűtípusokat ad vissza.
- **Lábléc-blokk — a webhelyspecifikus nyer, a megosztott tartalékol.** A `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` visszaadja a megosztott (`''`) *és* a webhelyspecifikus sorokat; a feloldó a webhely saját láblécét választja, ha van, különben a megosztottat. Ugyanez a logika fut a `TreeHelper.insertBlocks` függvényben (oldalfa) és az önálló `/content/blocks/public/footer/:churchId` végpontban is.

### Webhelytörlési láncreakció

A `SiteController.delete` (a tagsági Beállítások→Szerkesztés jogosultsághoz kötve) három lépésben bontja le a másodlagos webhelyet:

1. A `ContentModuleGateway.deleteSiteContent(churchId, siteId)` kaszkádosan törli a webhelyhez tartozó tartalmat: annak **oldalait** → a szakaszaikat, elemeiket, `pageHistory` és `posts` bejegyzéseiket; a saját **blokkjait** → a szakaszaikat, elemeiket és `pageHistory` bejegyzéseiket; valamint a **hivatkozásait** és **globalStyles** bejegyzéseit. Egy védelem megakadályozza a futtatást `''` értékre — a fő/megosztott őrszemet soha nem törli a rendszer.
2. A `DomainRepo.clearSiteId` a webhely domainjeit **visszarendeli** a fő webhelyhez (`siteId → ''`), nem törli őket, így az egyedi domain túléli a webhely törlését.
3. A `sites` sor törlődik, a Caddy útvonalak pedig újraszinkronizálódnak (legjobb igyekezettel).

### B1Admin felület

| Képesség | Hol | Működés |
|-----------|-------|-----------|
| Webhelyváltó | `useSiteSelection` + `SiteSwitcher` (üres = „Fő webhely”) | Beolvassa a `?site=` URL-paramétert, és `?siteId=` formájában továbbítja a ContentApi hívásokba. A három webhelyes **listanézetben** érhető el — **Oldalak**, **Blokkok**, **Megjelenés** — de *nem* az oldal-/blokkszerkesztőkben, amelyek a `siteId` értéket a rekordon hordozzák |
| Webhely létrehozása/törlése | `SitesDialog`, a váltó „Webhelyek kezelése…” bejegyzéséből nyílik | `POST /membership/sites` / `DELETE /membership/sites/:id` (név + subDomain). A tagsági Beállítások→Szerkesztés jogosultsághoz kötött (`Permissions.settings.edit` a szerveren; `Permissions.membershipApi.settings.edit` a B1Adminban). **Csak létrehozás/törlés — az 1. verzióban nincs átnevezési felület** |
| Domain-webhely hozzárendelés | `DomainSettingsEdit` a Beállítások→Domainek alatt | Soronként egy webhely-legördülő menü domainenként elküldi a `siteId` értéket a `/membership/domains` végpontnak. Az oszlop elrejtődik, ha az API nem ad vissza webhelyeket (régebbi backend) |
| Másolás-íráson alapuló stílusok | `StylesManager.prepareForSave` | Ha a betöltött globális stílus-sor `siteId` értéke nem egyezik a kiválasztott webhellyel (azaz az API az örökölt fő sort adta tartalékként), eltávolítja a fő `id` értékét, és a jelenlegi `siteId` értéket írja be, így a rendszer a fő sor felülírása helyett egy új, webhelyspecifikus sort szúr be. Ugyanez az eltérés-elágazás vonatkozik a webhely láblécblokkjára is |

:::info
**Mi marad gyülekezet-szinten az 1. verzióban (tudatos hatókör-döntés, nem adatmodell-korlát):** a **blog** (a `BlogPage`-nek nincs váltója, és `siteId` nélkül tölti be a `/posts` végpontot), a **webhely-widgetek** (hírdetési sáv és indítógomb), az **átirányítások**, a **logó / GA4 / gyülekezeti beállítások**, és a **tagi portál** (B1App mobil). Ez *nem* az egész Megjelenés menüpont — egy másodlagos webhely globális stílusai (színkészlet, betűtípusok, tipográfia, térköz, navigáció, egyéni CSS) **webhelyenként külön vannak** a fenti másolás-íráson keresztül; csak a Megjelenés oldal sáv-, indítógomb-, átirányítási és logó-almenüi maradnak gyülekezet-szintűek.
:::

## Egyedi domainek: Caddy peremréteg (statikus konfigurációs terv)

:::info
**Irányváltás, 2026-07-02.** Egy korábbi terv, amely az egyedi domainek üzemeltetését Vercel által kezelt domainekre helyezte volna át, **visszavonásra került**, és minden Vercel-domain regisztrációs kódot (`VercelHelper`, a `vercelToken`/`vercelProjectId`/`vercelTeamId` környezeti változók, az SSM paraméterek és az állapotellenőrzési bejegyzések) eltávolítottak az Api-ból. Az EC2-n futó, saját kezelésű **Caddy proxy megmarad** állandó egyedi domain-peremrétegként. A még hátralévő munka belső jellegű: a Caddy *futásidejű* admin-API-s konfigurációját egy *statikus* konfigurációra cseréljük, amely túléli az újraindításokat.
:::

### A peremréteg

Minden egyedi gyülekezeti domain DNS-e egyetlen EC2 gépre mutat — `3.23.251.61`, amely `proxy.b1.church` néven is elérhető. A B1Admin Beállítások→Domainek képernyője arra utasítja a gyülekezeteket, hogy adjanak hozzá egy apex `A → 3.23.251.61` vagy egy `CNAME → proxy.b1.church` rekordot. A Caddy domainenkénti Let's Encrypt tanúsítvánnyal zárja le a TLS-t, a `Host` fejlécet a domain `{sub}.b1.church` upstreamjére írja át, és fordított proxyként továbbítja a B1App felé — amely ezután a host címkéje alapján routolja, mint bármely natív aldomaint (lásd fent: [Egyedi domainek](#egyedi-domainek)).

Az upstream-leképezést a `DomainRepo.loadPairs` adja, amelynek kapcsolódási célja **összefűzi a hozzárendelt webhely aldomainjét**, így a domain a megfelelő *másodlagos* webhelyre proxyzódik, különben a gyülekezet fő webhelyére:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

A `www.*` sorok kimaradnak a térképből; a Caddy a `www.{host}` kéréseket egy `302`-es átirányítással a apexre irányítja.

### Két névtelen végpont táplálja a peremréteget

A `DomainController` két hitelesítés nélküli, csak olvasható végpontot tesz elérhetővé, amelyeket a gép közvetlenül használ — azért névtelenek, mert a peremréteg ezeket már a gyülekezeti kontextus létrejötte előtt lekérdezi:

| Végpont | Visszaad | Szerep |
|----------|----------|--------|
| `GET /membership/domains/authorize?domain=` | `200`, ha a domain — vagy egy `www.` találat hiánya esetén annak puszta apexe — létezik a `domains` táblában; egyébként `404` (üres `domain` esetén is) | A Caddy **on-demand-TLS `ask`** végpontja: visszaélés-védelem, amely eldönti, hogy adjon-e tanúsítványt egy bejövő SNI-hoz |
| `GET /membership/domains/hostmap` | `text/plain`, soronként egy rendezett `{domain} {sub}.b1.church` sor minden útvonalra alkalmas domainhez | A host→upstream térképfájl, amelyet a gép időzítve frissít |

Az `authorize` a `DomainRepo.loadByName` függvényt használja (pontos host, majd egyszeri `www.`→apex újrapróbálkozás); a `hostmap` a `loadPairs` függvényt — így webhelyfüggő és a `www.*` sorokat kizárja, pontosan mint a proxy útvonalak —, és csak a `:443` végződést távolítja el.

### Domain mentése/törlése — egyetlen, legjobb igyekezettel végrehajtott küldés

A `DomainController.save` írja a `domains` sorokat, majd egyetlen, **legjobb igyekezettel végrehajtott** `CaddyHelper.updateCaddy()` hívást indít, amelyet egy `try/catch` blokk csomagol be: ez naplózza (`console.error`), majd elnyeli a hibát; a `delete` ugyanezt teszi (ezzel egy korábbi, törlés utáni elavult útvonal-hibát is javítottak), ahogyan a másodlagos webhely törlése (`SiteController.delete`) is. Az `updateCaddy` maga **10 másodperces** Axios időkorláttal rendelkezik, így egy elérhetetlen vagy leállt Caddy sosem okozhat `500`-as hibát a domain mentésekor — a `domains` tábla az igazságforrás.

### Jelenlegi állapot — statikus konfiguráció, nincs futásidejű állapot

A gép (egy Windows EC2 példány, állandó Elastic IP-vel) egy **statikus Caddyfile**-ból futtatja a Caddy-t: on-demand TLS, amelynek `ask` végpontja a `/membership/domains/authorize` útvonalra mutat, plusz egy host→upstream térképfájl, amelyet 5 percenként frissít a `/membership/domains/hostmap` végpontból egy ütemezett feladat, amely egy szabályos `caddy reload` paranccsal zárul. A konfiguráció újraindítások után is megmarad, futásidejű állapot nélkül — nincs szükség az újraindítás utáni „újrafeltöltési” procedúrára —, és egy ismeretlen SNI **TLS-elutasítást** kap (olyan hostra nem jön létre tanúsítvány, amelyet az `authorize` elutasít), míg egy engedélyezett, de még nem leképezett host (egy frissen hozzáadott domain a szinkronizációs ablakon belül) tiszta 404-et kap. Az új domainek körülbelül 5 percen belül válnak elérhetővé a mentés után; tanúsítványuk az első látogatáskor készül el. A telepítés, üzemeltetés és a terepen tapasztalt buktatók leírása: [Caddy egyedi domain proxy](../deployment/caddy-proxy.md).

### Örökölt futásidejű push — visszaállási útvonal, törlésre vár

A `CaddyHelper` (membership modul) még mindig képes a Caddy vezérlésére annak **admin API-ján** keresztül a `caddyHost:caddyPort` címen (SSM `caddyHost`/`caddyPort`; ha nincs beállítva, nem tesz semmit; a `ServerHealthController` Integrációk csoportjában jelenik meg): az `updateCaddy()` egy teljes útvonaltömböt PATCH-el, az `initializeCaddy()` és a `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` végpontok pedig nulláról építik újra a futásidőben konfigurált szervert. Ennek a módnak a konfigurációja csak a Caddy memóriájában élt — ez az az újraindítási „felejtés”, amelyet ez az architektúra kiváltott. A mechanizmus csak visszaállási útvonalként maradt meg, és törlésre van ütemezve, miután a statikus gép stabilnak bizonyult; a domain mentésekor/törlésekor történő, legjobb igyekezettel végrehajtott `updateCaddy()` küldés ártalmatlan no-op a statikus gépen (annak admin API-ja csak localhoston érhető el).

## Kapcsolódó oldalak

- [Caddy egyedi domain proxy](../deployment/caddy-proxy.md) — maga a peremgép: friss gép beállítása, WinSW szolgáltatás, a térképszinkronizáló feladat és az üzemeltetési buktatók
- [Webhelyszerkesztő](./website-builder.md) — az oldal-/szakasz-/elemfa, a megjelenítők, a blog, a SEO és az AI-generálás (ami akkor jelenik meg, amikor egy kérés már gyülekezetre/webhelyre oldódott fel)
- [Tartalom végpontok](../api/endpoints/content.md) — az oldalak, blokkok, hivatkozások és globális stílusok REST felülete, amely mind `?siteId=`-kompatibilis
- [B1App](../web-apps/b1-app.md) — a Next.js alkalmazás, amely a middleware-t és a `[sdSlug]` útvonalkezelést futtatja
- [Webalkalmazás telepítése](../deployment/web-apps.md) — a B1App Vercelre történő telepítésének módja
