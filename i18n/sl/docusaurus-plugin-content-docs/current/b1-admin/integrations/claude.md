---
title: "Claude"
description: "Povežite B1 Admin s Claude in v preprostem jeziku sprašujte o prisotnosti, darovih in skupinah, z možnostjo prijave ali ključa z omejenimi dovoljenji."
---

# Claude

<div class="article-intro">

Claudu postavite vprašanje o svoji cerkvi v preprostem jeziku, in odgovoril vam bo na podlagi podatkov iz B1, vključno z vašimi lekcijami in razredi FreePlay. Lahko vprašate na primer *»Koliko prvoobiskovalcev je prišlo v nedeljo?«* ali *»Kdo se je ta mesec pridružil maloskupini?«*, ali pa ga prosite, naj nekaj naredi, na primer *»Dodaj novo stran na našo spletno mesto z imenom Dogodki.«* Nastavitev traja manj kot 3 minute, za namestitev pa ne potrebujete tehničnega znanja ali programske opreme.

</div>

<div class="prereqs">
<h4>Kaj potrebujete</h4>

- **Račun Claude.** **Brezplačni paket deluje** – dober način za preizkus. Brezplačni računi imajo pa dnevno omejitev sporočil, poizvedbe v B1 pa hitro porabijo sporočila, zato vam, če ga uporabljate redno, priporočamo **Claude Pro** (približno 20 $ na mesec).
- **Vaša prijava v B1** – ista, ki jo uporabljate za B1 Admin.

</div>

:::tip Priporočeno – brezplačen preizkus
Claude je najpreprostejši način za povezavo B1 z umetno inteligenco, deluje pa na **brezplačnem paketu** Claude – popoln način, da vaša cerkev preizkusi možnost, preden za kaj plača.
:::

Obstajata dva načina povezave. **Možnost 1 je najlažja** – ni ključa in ni treba nič namestiti.

## Možnost 1 — Prijava z B1 (najlažje)

Deluje na spletnem mestu Claude, v namizni aplikaciji Claude in v aplikaciji Claude za telefon – nastavite enkrat in deluje na vseh.

### 1. korak — Odprite nastavitve konektorjev za Claude

1. Pojdite na [claude.ai](https://claude.ai) in se prijavite (ali ustvarite brezplačen račun).
2. Kliknite svoje ime v spodnjem levem kotu, nato **Nastavitve** → **Konektorji**.

### 2. korak — Dodajte B1

1. Kliknite **Dodaj**, nato **Dodaj konektor po meri**.
2. **Ime:** vpišite `B1`.
3. **URL:** prilepite `https://api.churchapps.org/mcp`
4. Druge možnosti pustite, kot so, in kliknite **Dodaj**.

### 3. korak — Prijavite se v B1

1. Kliknite **Poveži**. Odpre se stran za prijavo v B1.
2. Prijavite se s svojim računom B1. Če ste član več cerkva, preverite, ali je na vrhu prikazana prava cerkev.
3. B1 prikaže, kaj Claude želi narediti, in potrdi, da vas bo vrnil na **claude.ai**. Kliknite **Dovoli**.

Vrnili se boste v Claude, B1 pa bo prikazan kot povezan.

### 4. korak — Vprašajte nekaj

Začnite **nov pogovor** in preizkusite na primer:

- *»Koliko ljudi je v naši cerkvi?«*
- *»Naštej naše aktivne skupine.«*
- *»Povzemi darovanja tega meseca po skladih.«*
- *»Kdo se je pridružil cerkvi v zadnjih 30 dneh?«*

Prvič vas Claude prosi za dovoljenje za uporabo B1 – kliknite **Dovoli**.

## Možnost 2 — Namizna razširitev s ključem B1

Uporabite to možnost, če želite Claudu dati ključ z omejenimi dovoljenji (na primer samo za branje). Deluje v namizni aplikaciji Claude za Mac ali Windows, za ustvarjanje ključa pa morate imeti dovoljenje za upravljanje nastavitev cerkve v B1.

### 1. korak — Pridobite aplikacijo Claude

Prenesite aplikacijo Claude s [claude.com/download](https://claude.com/download), jo namestite, odprite in se prijavite.

### 2. korak — Ustvarite svoj ključ B1

Ključ je tisto, kar Claudu omogoča dostop do B1 *vaše* cerkve – razmislite o njem kot o geslu samo za Claude.

1. Prijavite se v [B1 Admin](https://admin.b1.church) in pojdite na [Nastavitve → Razvijalec](https://admin.b1.church/settings/developer).
2. Na zavihku **API ključi** kliknite **Nov API ključ**.
3. **Ime:** vpišite `Claude`.
4. **Obseg:** označite, kaj sme Claude početi. Vsako področje ima potrditveno polje **branje** (samo ogled) in polje **pisanje** (spreminjanje). Niste prepričani? Za začetek označite samo polja **branje** – kasneje lahko ustvarite nov ključ z več dovoljenji.
5. Kliknite **Shrani**, nato **Kopiraj** ključ. Prikazan je samo enkrat, zato pojdite naravnost na 3. korak.

### 3. korak — Dodajte B1 v Claude

1. [Prenesite razširitev B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dvakrat kliknite** preneseno datoteko (`b1-churchapps.mcpb`). Claude se odpre in prikaže **B1 (ChurchApps)**.
3. Kliknite **Namesti**.
4. Ko vas vpraša za **ključ API B1**, prilepite ključ iz 2. koraka in shranite.
5. **Popolnoma zaprite Claude** (Mac: **Cmd+Q** · Windows: z desnim klikom na ikono Claude v opravilni vrstici → **Zapri**) in ga znova odprite.

Če dvojni klik ne odpre Claude, pojdite v Claudu na **Nastavitve → Razširitve → Dodatne nastavitve → Namesti razširitev…** in izberite preneseno datoteko. Nato začnite nov pogovor in nekaj vprašajte.

:::tip Razširitev je že nameščena?
Ni vam treba storiti ničesar – FreePlay deluje prek iste povezave. Edina izjema je različica 1.1.0, ki je zahtevala e-poštni naslov in geslo za B1: za posodobitev ponovno prenesite in namestite razširitev. Vaš ključ ostane.
:::

## Ali je varno?

- Claude lahko vidi samo podatke **vaše cerkve**.
- **Prijava (možnost 1):** Claude nikoli ne more narediti več, kot lahko naredi vaša lastna prijava v B1. Stran za prijavo v B1 pred klikom na **Dovoli** navede vse, kar sme Claude početi.
- **S ključem (možnost 2):** Claude lahko v B1 počne samo to, kar ključ dovoljuje – ključ samo z označenimi polji **branje** lahko samo gleda in ničesar ne more spremeniti. FreePlay deluje enako, prek istega ključa.
- **Izklop:** v B1 Admin pojdite na **Nastavitve → Razvijalec** in preklicajte aplikacijo pod **Povezane aplikacije** (možnost 1) ali izbrišite ključ pod **API ključi** (možnost 2). Dostop se takoj ustavi. Lahko pa kliknete tudi **Prekini povezavo** na konektorju B1 v Claudu.

## Koliko stane?

Povezava z B1 je brezplačna – del je ChurchApps. Claude sam ima brezplačen paket; Claude Pro (približno 20 $ na mesec) pa omogoča veliko več uporabe. Glejte [claude.com/pricing](https://claude.com/pricing).

## Tehnične podrobnosti

Preostanek te strani je namenjen tehničnim uporabnikom in pomočnikom z umetno inteligenco: obsegom, drugim načinom povezave in delovanju.

### Obsegi

Claude se z B1 pogovarja prek **strežnika Model Context Protocol (MCP)**, vgrajenega v API B1 (`https://api.churchapps.org/mcp`). Vsak klic poteka prek istih pravil za overjanje, dovoljenja in omejitev na cerkev kot zahtevek iz B1 Admin. Claude je omejen na **dovoljenja in obsege** API ključa in ne more dostopati do webhookov, skrbniških končnih točk OAuth ali drugih poti, namenjenih upravljavcem.

Pogosti začetni nabori obsegov:

- **Pomočnik samo za branje:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Branje + dodajanje opomb / nalog:** dodajte `people:write`
- **Poln operativni pomočnik:** dodajte ustrezne obsege `:write`, ki jih želite

Ključ `donations:read` omogoča Claudu, da povzame darovanja, ne more pa zabeležiti darila. Ključ `people:write` lahko doda osebo, ne more pa videti darovanj. Za to, kaj dovoljuje vsak obseg, glejte [API ključi](/docs/developer/api/api-keys).

### Drugi načini povezave

#### Claude Code (CLI)

V terminalu:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

To je vse. V kateri koli seji Claude Code vnesite `/mcp`, da potrdite, da je strežnik `b1` povezan, nato Claudu zastavite katero koli vprašanje o svoji cerkvi.

#### Namizni Claude — ročna nastavitev (napredno)

Če ne želite uporabljati razširitve, uredite datoteko nastavitev namiznega Claude:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Dodajte vnos strežnika `b1`, ki se povezuje z B1 prek `mcp-remote` (potrebujete [Node.js](https://nodejs.org)):

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

Znova zaženite namizni Claude. V meniju konektorjev v polju za sporočila v pogovoru se bo prikazal `b1` s svojimi orodji.

#### Claude.ai (splet) — konektor po meri

Glejte **možnost 1** zgoraj. Konektor uporablja OAuth 2.1: Claude odkrije overitveni strežnik B1 prek `https://api.churchapps.org/.well-known/oauth-protected-resource`, se registrira z dinamično registracijo odjemalca in se prijavi s PKCE. Pri paketih Team in Enterprise bo morda lastnik najprej dodal konektor za organizacijo. Claude ne zahteva posebnih obsegov, zato stran za soglasje ponudi vse, do česar ima dostop prijavljeni račun B1. Prekličete ga pod **Nastavitve → Razvijalec → Povezane aplikacije** v B1 Admin.

### Delovanje

API B1 ponuja en sam končno točko MCP na `/mcp`. Claude se nanjo poveže, overi z vašim ključem `cak_…` in dobi dostop do štirih orodij:

| Orodje | Kaj počne |
|---|---|
| `list_endpoints` | Našteje končne točke REST, ki jih Claude lahko kliče, po poti jih je mogoče filtrirati. Uporablja se za iskanje. |
| `describe_endpoint` | Vrne kratek povzetek in primer zahtevka/odgovora za določeno končno točko. |
| `api_call` | Dejansko kliče končno točko REST kot overjeni uporabnik. |
| `describe_page_builder` | Vodnik za ustvarjanje in urejanje strani vaše cerkvene spletne strani, ki ga Claude prebere, preden dela na vsebini spletne strani. |

To je isti nabor `/membership/people`, `/giving/donations`, `/attendance/visits` itd., ki ga uporablja vaš B1Admin – vsa pravila za dovoljenja veljajo enako. Končne točke FreePlay (lessons.church) so navedene pod `/lessons/*`; Claudovi klici zanje se posredujejo FreePlay kot isti uporabnik z enakimi dovoljenji.

### Varnost in omejitve

- **Ločenost po cerkvah.** API ključ je povezan z eno cerkvijo. Claude ne more videti podatkov drugih cerkva.
- **Omejitev dovoljenj.** Če osebi, ki je ustvarila ključ, v B1Admin odvzamete dovoljenje, ga Claude izgubi pri naslednjem klicu – takoj.
- **Preklic.** Izbrišite ključ pod **Nastavitve → Razvijalec → API ključi** in dostop Claude se takoj konča.
- **Seznam blokiranih.** Webhooki ponudnikov, končne točke za upravljanje odjemalcev OAuth in pot `apiEmails`, namenjena upravljavcem, prek MCP niso dosegljivi.
- **Omejitev velikosti odgovora.** En odgovor orodja je omejen na 64 KB, da dolgi seznami ne preobremenijo konteksta Claude – če se to zgodi, Claude poizvedbo zoži s filtri.
- **Revizijska sled.** Spremembe gredo prek istega dnevnika revizij kot dejanja v B1Admin; pregledate jih pod **Nastavitve → Dnevnik revizij**.

### Odpravljanje težav

**Claude za uporabo FreePlay zahteva e-poštni naslov in geslo za B1:** imate različico 1.1.0 namizne razširitve. Za posodobitev jo ponovno prenesite in namestite – novejše različice uporabljajo samo vaš ključ.

**Claude sporoča »Unauthorized« ali 401:** nosilni žeton manjka, je napačen ali je bil ključ preklican. Če ste uporabili razširitev, v Claudu odprite **Nastavitve → Razširitve → B1 (ChurchApps)** in znova prilepite ključ. Sicer ponovno preverite glavo `Authorization: Bearer cak_…` (pazite na presledek in na dobesedno besedo `Bearer`).

**Orodje vrne 403:** API ključ nima obsega za to končno točko. Dodajte obseg pod **Nastavitve → Razvijalec → API ključi** (ustvariti morate nov ključ – obsegov ni mogoče spremeniti na mestu) in novi ključ prilepite v nastavitve razširitve ali v nastavitve Claude.

**Claude ne najde končne točke:** prosite ga, naj pokliče `list_endpoints` s filtrom, npr. *»uporabi list_endpoints s filtrom 'donations', da poiščeš pravo pot«*. Seznam poti je ustvarjen iz žive API, zato je tam vse, do česar lahko dostopate s `curl`.

**Lokalni razvoj:** `https://api.churchapps.org/mcp` zamenjajte z `http://localhost:8084/mcp` – enaka overitev, ista orodja.

## Povezano

- [API ključi](/docs/developer/api/api-keys) — celoten referenčni seznam obsegov
- [Strežnik MCP (referenca za razvijalce)](/docs/developer/api/mcp) — podrobnosti protokola in sheme orodij
- [ChatGPT](./chatgpt.md) — enaka zamisel, za modele OpenAI
