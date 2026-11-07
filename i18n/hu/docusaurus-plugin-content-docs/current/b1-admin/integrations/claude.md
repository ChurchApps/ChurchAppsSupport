---
title: "Claude"
---

# Claude

<div class="article-intro">

Kérdezd meg a Claude-ot egyházadról közérthető nyelven, és a válasz a B1 adataiból érkezik — beleértve a FreePlay-leckéidet és osztótermeidet is. Olyan kérdésekre is válaszol, mint *„hány új látogató jött vasárnap?”* vagy *„ki csatlakozott kiscsoporthoz ebben a hónapban?”* — de kérheted azt is, hogy végezzen el feladatokat, például *„adj hozzá egy új oldalt a weboldalunkhoz Események néven.”* A beállítás kevesebb mint 3 percet vesz igénybe, és nincs szükséged technikai tudásra vagy szoftver telepítésére.

</div>

<div class="prereqs">
<h4>Amire szükséged van</h4>

- **Claude-fiók.** Az **ingyenes csomag is működik** — remek módja a kipróbálásnak. Az ingyenes fiókoknak azonban van napi üzenetkorlátjuk, a B1-ben való keresés pedig gyorsan felemészti az üzeneteket, ezért rendszeres használat esetén a **Claude Pro** csomagot (kb. havi 20 USD) ajánljuk.
- **A B1 bejelentkezésed** — ugyanaz, amelyet a B1 Adminhoz használsz.

</div>

:::tip Ajánlott — ingyenesen kipróbálható
A Claude a legegyszerűbb módja annak, hogy a B1-et összekösd a mesterséges intelligenciával, és a Claude **ingyenes csomagjával** is működik — tökéletes lehetőség arra, hogy egyházad fizetés nélkül kipróbálja.
:::

Kétféleképpen kapcsolhatod össze. Az **1. lehetőség a legegyszerűbb** — nincs szükség kulcsra, és semmit sem kell telepíteni.

## 1. lehetőség — Bejelentkezés B1-gyel (a legegyszerűbb)

A Claude weboldalán, asztali alkalmazásában és mobilalkalmazásában is működik — egyszer beállítod, és mindegyiken elérhető lesz.

### 1. lépés — Nyisd meg a Claude csatlakozóbeállításait

1. Látogass el a [claude.ai](https://claude.ai) oldalra, és jelentkezz be (vagy hozz létre egy ingyenes fiókot).
2. Kattints a nevedre a bal alsó sarokban, majd válaszd a **Beállítások** → **Connectorok** menüpontot.

### 2. lépés — Add hozzá a B1-et

1. Kattints a **Hozzáadás** gombra, majd az **Egyéni connector hozzáadása** lehetőségre.
2. **Név:** írd be: `B1`.
3. **URL:** illeszd be: `https://api.churchapps.org/mcp`
4. A többi beállítást hagyd úgy, ahogy van, és kattints a **Hozzáadás** gombra.

### 3. lépés — Jelentkezz be a B1-be

1. Kattints a **Csatlakozás** gombra. Megnyílik a B1 bejelentkezési oldala.
2. Jelentkezz be a B1-fiókodba. Ha több egyházhoz is tartozol, ellenőrizd, hogy az oldal tetején a megfelelő egyház látszik-e.
3. A B1 felsorolja, mihez kér hozzáférést a Claude, és megerősíti, hogy a **claude.ai** oldalra fogsz visszatérni. Kattints az **Engedélyezés** gombra.

Visszakerülsz a Claude-ba, és a B1 csatlakoztatottként jelenik meg.

### 4. lépés — Kérdezz valamit

Indíts egy **új csevegést**, és próbáld ki például:

- *„Hányan vannak az egyházunkban?”*
- *„Sorold fel az aktív csoportjainkat.”*
- *„Foglald össze ebben a hónapban az adományokat alapok szerint.”*
- *„Ki csatlakozott az egyházhoz az elmúlt 30 napban?”*

Először a Claude engedélyt kér a B1 használatához — kattints az **Engedélyezés** gombra.

## 2. lehetőség — Asztali bővítmény B1-kulccsal

Ezt akkor használd, ha korlátozott jogosultságú kulcsot szeretnél adni a Claude-nak (például csak olvasási jogot). A Claude asztali alkalmazásában működik Mac vagy Windows gépen, a kulcs létrehozásához pedig jogosultság szükséges az egyházi beállítások kezeléséhez a B1-ben.

### 1. lépés — Szerezd be a Claude alkalmazást

Töltsd le a Claude alkalmazást a [claude.com/download](https://claude.com/download) oldalról, telepítsd, nyisd meg, és jelentkezz be.

### 2. lépés — Készíts B1-kulcsot

A kulcs teszi lehetővé, hogy a Claude hozzáférjen *a te* egyházad B1-adataihoz — gondolj rá úgy, mint egy jelszóra, amely kizárólag a Claude-nak szól.

1. Jelentkezz be a [B1 Adminba](https://admin.b1.church), és menj a [Beállítások → Fejlesztő](https://admin.b1.church/settings/developer) oldalra.
2. Az **API-kulcsok** fülön kattints az **Új API-kulcs** gombra.
3. **Név:** írd be: `Claude`.
4. **Hatókörök:** jelöld be, mit végezhet a Claude. Minden területen van egy **olvasás** jelölőnégyzet (csak megtekintés) és egy **írás** jelölőnégyzet (módosítás). Nem vagy biztos benne? Kezdésnek csak az **olvasás** négyzeteket jelöld be — később bármikor készíthetsz újabb kulcsot több jogosultsággal.
5. Kattints a **Mentés** gombra, majd a **Másolás** gombbal másold ki a kulcsot. Csak egyszer jelenik meg, ezért menj azonnal a 3. lépésre.

### 3. lépés — Add hozzá a B1-et a Claude-hoz

1. [Töltsd le a B1 bővítményt](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Kattints duplán** a letöltött fájlra (`b1-churchapps.mcpb`). A Claude megnyílik, és megjeleníti a **B1 (ChurchApps)** elemet.
3. Kattints a **Telepítés** gombra.
4. Amikor a **B1 API-kulcsot** kéri, illeszd be a 2. lépésben kimásolt kulcsot, és mentsd.
5. **Teljesen lépj ki a Claude-ból** (Mac: **Cmd+Q** · Windows: kattints jobb gombbal a Claude ikonjára a tálcán → **Kilépés**), majd nyisd meg újra.

Ha a duplakattintás nem nyitja meg a Claude-ot, a Claude-ban lépj a **Beállítások → Bővítmények → Speciális beállítások → Bővítmény telepítése…** menübe, és válaszd ki a letöltött fájlt. Ezután indíts új csevegést, és kérdezz valamit.

:::tip A bővítmény már telepítve van?
Nincs teendőd — a FreePlay ugyanazon a kapcsolaton keresztül működik. Az egyetlen kivétel az 1.1.0-s verzió, amely B1 e-mail címet és jelszót kért: a frissítéshez telepítsd újra a bővítményt. A kulcsod megmarad.
:::

## Biztonságos?

- A Claude csak **a te egyházad** adatait láthatja.
- **Bejelentkezéssel (1. lehetőség):** A Claude soha nem tehet többet, mint a saját B1-bejelentkezésed. A B1 bejelentkezési oldala az **Engedélyezés** gomb megnyomása előtt felsorolja mindazt, amit a Claude tehet.
- **Kulccsal (2. lehetőség):** A Claude csak azt teheti meg, amit a kulcs a B1-ben engedélyez. Az csak **olvasás** jelölőnégyzetekkel rendelkező kulcs esetén megtekinthet, de módosítani soha nem tud. A FreePlay ugyanígy működik, ugyanazzal a kulccsal.
- **Kikapcsolás:** A B1 Adminban menj a **Beállítások → Fejlesztő** oldalra, és a **Csatlakoztatott alkalmazások** alatt vond vissza az alkalmazás hozzáférését (1. lehetőség), vagy az **API-kulcsok** alatt töröld a kulcsot (2. lehetőség). A hozzáférés azonnal megszűnik. A Claude-ban a B1 connectoron a **Leválasztás** gombra is kattinthatsz.

## Mibe kerül?

A B1 csatlakozás ingyenes — a ChurchApps része. A Claude-nak van ingyenes csomagja; a Claude Pro (kb. havi 20 USD) sokkal több használatot tesz lehetővé. Lásd: [claude.com/pricing](https://claude.com/pricing).

## Technikai részletek

Az oldal többi része technikai felhasználóknak és AI-asszisztenseknek szól: hatókörök, más csatlakozási módok és a működés leírása.

### Hatókörök

A Claude a B1 API-ba épített **Model Context Protocol (MCP) szerveren** keresztül kommunikál a B1-gyel (`https://api.churchapps.org/mcp`). Minden hívás ugyanazokon a hitelesítési, jogosultsági és egyházhatárolási szabályokon megy keresztül, mint a B1 Adminból érkező kérés. A Claude az API-kulcs **jogosultságaira és hatóköreire** korlátozódik, és nem érheti el a webhookokat, az OAuth-adminisztrációs végpontokat vagy más, csak üzemeltetők számára elérhető útvonalakat.

Gyakori kezdő hatókör-készletek:

- **Csak olvasó asszisztens:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Olvasás + jegyzetek / feladatok hozzáadása:** add hozzá a `people:write` hatókört
- **Teljes működési asszisztens:** add hozzá a kívánt `:write` hatóköröket

Egy `donations:read` kulccsal a Claude összefoglalhatja az adományokat, de adományt nem rögzíthet. Egy `people:write` kulccsal személyt adhatsz hozzá, de az adományokat nem látja. Az egyes hatókörök engedélyezéseiről lásd: [API-kulcsok](/docs/developer/api/api-keys).

### Más csatlakozási módok

#### Claude Code (CLI)

Terminálban:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Ennyi. Bármely Claude Code munkamenetben írd be a `/mcp` parancsot, hogy megerősítsd: a `b1` szerver csatlakoztatva van, majd kérdezz bármit az egyházadról.

#### Claude Desktop — kézi konfiguráció (haladó)

Ha nem a bővítményt szeretnéd használni, szerkeszd a Claude Desktop konfigurációs fájlját:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Adj hozzá egy `b1` szerver-bejegyzést, amely az `mcp-remote` segítségével csatlakozik a B1-hez (ehhez [Node.js](https://nodejs.org) szükséges):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Indítsd újra a Claude Desktopot. A csevegőmező csatlakozómenüjében a `b1` és az eszközei jelennek meg.

#### Claude.ai (web) — egyéni connector

Lásd fent az **1. lehetőséget**. A connector OAuth 2.1-et használ: a Claude a `https://api.churchapps.org/.well-known/oauth-protected-resource` címről találja meg a B1 engedélyezési szerverét, dinamikus kliensregisztrációval (Dynamic Client Registration) regisztrálja magát, és PKCE-vel jelentkezik be. A Team és Enterprise csomagoknál előfordulhat, hogy a szervezet tulajdonosának először a szervezet számára kell hozzáadnia a connectort. A Claude nem kér konkrét hatóköröket, ezért a hozzájárulási oldal mindent felkínál, amit a bejelentkezett B1-fiók elérhet. A visszavonás a B1 Adminban: **Beállítások → Fejlesztő → Csatlakoztatott alkalmazások**.

### A működés

A B1 API egyetlen MCP-végpontot tesz elérhetővé a `/mcp` útvonalon. A Claude ehhez csatlakozik, a `cak_…` kulcsával hitelesíti magát, és négy eszközhöz kap hozzáférést:

| Eszköz | Mit csinál |
|---|---|
| `list_endpoints` | Listázza a REST-végpontokat, amelyeket a Claude meghívhat, elérési út szerint szűrhető. Felfedezésre szolgál. |
| `describe_endpoint` | Rövid összefoglalót és példa-kérést/választ ad egy adott végponthoz. |
| `api_call` | Ténylegesen meghív egy REST-végpontot a hitelesített felhasználó nevében. |
| `describe_page_builder` | Útmutató az egyházi weboldal oldalainak létrehozásához és szerkesztéséhez; a Claude ezt olvassa el, mielőtt weboldal-tartalmon dolgozik. |

Ez ugyanaz a `/membership/people`, `/giving/donations`, `/attendance/visits` stb. felület, amelyet a B1 Admin is használ — minden jogosultsági szabály azonosan vonatkozik rá. A FreePlay (lessons.church) végpontjai a `/lessons/*` alatt szerepelnek; a Claude ezekhez irányuló hívásait ugyanazon felhasználó nevében továbbítjuk a FreePlay felé, ugyanazokkal a jogosultságokkal.

### Biztonság és korlátok

- **Egyházankénti elkülönítés.** Az API-kulcs egyetlen egyházhoz tartozik. A Claude nem láthatja más egyházak adatait.
- **Jogosultsághoz kötött.** Ha a B1 Adminban eltávolítod a jogosultságot attól a személytől, aki a kulcsot létrehozta, a Claude a következő hívásnál azonnal elveszíti azt.
- **Visszavonható.** Töröld a kulcsot a **Beállítások → Fejlesztő → API-kulcsok** alatt, és a Claude hozzáférése azonnal megszűnik.
- **Tiltólista.** A szolgáltatói webhookok, az OAuth-kliensek adminisztrációs végpontjai és a csak üzemeltetők számára elérhető `apiEmails` útvonal nem hívható meg MCP-n keresztül.
- **Válaszméret-korlát.** Egy eszközválasz legfeljebb 64 KB lehet, hogy a hosszú listák ne töltsék meg a Claude kontextusát — ilyenkor a Claude szűrőkkel szűkíti a lekérdezést.
- **Audit-napló.** A módosítások ugyanazon az audit-naplón mennek keresztül, mint a B1 Adminból végzett műveletek; ezeket a **Beállítások → Audit-napló** alatt tekintheted meg.

### Hibaelhárítás

**A Claude B1 e-mail címet és jelszót kér a FreePlay használatához:** a asztali bővítmény 1.1.0-s verzióját használod. A frissítéshez telepítsd újra — az újabb verziók már csak a kulcsodat használják.

**A Claude „Unauthorized” vagy 401-es hibát jelez:** a bearer-token hiányzik, hibás, vagy a kulcsot visszavonták. Ha a bővítményt használtad, a Claude-ban nyisd meg a **Beállítások → Bővítmények → B1 (ChurchApps)** menüpontot, és illeszd be újra a kulcsot. Ellenkező esetben ellenőrizd az `Authorization: Bearer cak_…` fejlécet (figyelj a szóközre és a `Bearer` szó pontos írására).

**Egy eszközhívás 403-as hibát ad:** az API-kulcsnak nincs meg a szükséges hatóköre az adott végponthoz. Add hozzá a hatókört a **Beállítások → Fejlesztő → API-kulcsok** alatt (új kulcsot kell létrehoznod, mert a hatókörök utólag nem módosíthatók), és illeszd be az új kulcsot a bővítmény beállításaiba vagy a Claude konfigurációjába.

**A Claude nem találja a végpontot:** kérd meg, hogy hívja meg a `list_endpoints` eszközt szűrővel, pl. *„használd a list_endpoints eszközt a 'donations' szűrővel, és keresd meg a megfelelő elérési utat”*. Az útvonal-leltár az élő API-ból generálódik, így minden, amit `curl`-lel elérsz, benne van.

**Helyi fejlesztés:** cseréld a `https://api.churchapps.org/mcp` címet a `http://localhost:8084/mcp` címre — ugyanaz a hitelesítés, ugyanazok az eszközök.

## Kapcsolódó

- [API-kulcsok](/docs/developer/api/api-keys) — a teljes hatókör-referencia
- [MCP-szerver (fejlesztői referencia)](/docs/developer/api/mcp) — protokollrészletek és eszközsémák
- [ChatGPT](./chatgpt) — ugyanez az elv, az OpenAI modelljeihez
