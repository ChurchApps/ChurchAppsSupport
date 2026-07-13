---
title: "Claude"
---

# Claude

<div class="article-intro">

Xhuma i-Claude ye-Anthropic kumniningwane weBandla lakho le-B1. Ngeikhiya ye-API nemaminithi lambalwa ekulungiselela, ungabuta i-Claude imibuto lefana "bavakashi labangaki labeta kucala labefikile ngeSonto?" nome "bhala incwadzi yekubonga kubantfu labanikela esakhiweni lenyanga" — bese i-Claude ifundza timphendvulo mngoti kumarekhodi elibandla lakho, ngekwemvumo yakho.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Umphatsi welibandla lonemvumo ye-**Edit Settings** (kucalisa ikhiya ye-API)
- Lokunye kwaloku: **Claude Code** (CLI / IDE extension), **Claude Desktop** (Mac/Windows), nome i-akhawunti ye-**Claude Pro/Max/Team**
- I-URL lephelele ye-B1 API yakho — ngalokuvamile `https://api.churchapps.org` kumabandla lasekelwe, nome i-Api host yakho lotihostele wena

</div>

## Loko i-Claude Lengakubona

I-Claude ikhuluma ne-B1 ngekusebentisa i-**Model Context Protocol (MCP) server** lesakhelwe ngekhatsi kwe-B1 API. Onkhe kubitwa lokwentiwa yi-Claude kudlula emtsetfweni lofanako wekucinisekisa, imvumo, nekwehlukaniswa ngelibandla njengesicelo lesivela ku-B1Admin — lokusho kutsi i-Claude:

- Ibona kuphela imininingwane ye**libandla lakho**
- Ikhawulwe yi**mvumo nemkhawulo** lokuwo ikhiya ye-API loyinike yona
- Ayikwati kufinyelela ema-webhook, ema-endpoint emsunguli we-OAuth, nome tindlela tinye letimelene nemphatsi kuphela (talokho tivinjelwe)

Ikhiya ye-`donations:read` ivumela i-Claude kuhlanganisa umnikelo kepha ayikwati kubhala umnikelo. Ikhiya ye-`people:write` ingakwati kwengeta umuntfu kepha ayikwati kubona imininingwane yemnikelo. Khetsa emkhawulo lafanako nemsebenti.

## Kulungiselela

### 1. Yakha ikhiya ye-API

1. Ku-B1Admin hamba uye ku **Settings → Developer → API Keys**.
2. Chofota **New API Key**, uyicalise ngekutsi `Claude`, bese ukhetsa emkhawulo lokufanele i-Claude ibe nawo. Emasethi lavamile ekucala:
   - **Umsiti lofunda kuphela:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Kufunda + kwengeta emanothi / imisebenti:** ngeta `people:write`
   - **Umsiti losebentako ngekugcweleleko:** ngeta emkhawulo lafanako la-write lowafunako
3. Gcina. Ikhiya lephelele `cak_…` iyakhonjiswa **kanye kuphela** — uyikhopishe.

Bona [API Keys](/docs/developer/api/api-keys) kutsi ngunye ngunye wemkhawulo uvumelani.

### 2. Xhuma i-Claude

Khetsa umtsameli we-Claude lowusebentisako:

#### Claude Code (CLI)

Ku-terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Kuphela loko. Ngekhatsi kwaso sonkhe sigceme se-Claude Code, bhala `/mcp` kucinisekisa kutsi i-server ye-`b1` ixhunyiwe, bese ubuta i-Claude nome ngumuphi umbuto ngelibandla lakho.

#### Claude Desktop

Hlela lifayela le-config le-Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Ngeta indzawo ye-server ye-`b1`. Tinguqulo letinsha te-Claude Desktop tikhuluma i-HTTP MCP ngco:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

Nangabe inguqulo yakho ye-Claude Desktop isekela kuphela ema-server e-stdio, xhumana nge-`mcp-remote`:

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

Chala kabusha i-Claude Desktop. Sithombe se-connector ku-composer yenkulumo sitakhombisa `b1` lenemathulusi lamatsatfu (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Custom Connector

Sici se-Claude.ai se-"Add custom connector" sidzinga i-OAuth, lokungakasekelwa yi-B1 MCP server kwanamuhla. Sebentisa i-Claude Code nome i-Claude Desktop esikhundleni.

### 3. Buta i-Claude intfo lotsite

Nangabe sekuxhunyiwe, akukho luhlelo lolutsite loludzingekako — i-Claude iyatfola loko lokutfolakalako. Tibonelo:

- *"Bantfu labangaki labakulelibandla lami futsi maliphi emacembu lasebentako?"*
- *"Hlanganisa imnikelo yalenyanga ngekusebentisela indzawo yayo."*
- *"Nika luhlu lwebantfu lababekhona kusibonakaliso sango-10 ekuseni ngeSonto leledlule kepha abakabikho kucembu lango-Lwesitsatfu emalangeni langu-60 lengcile."*
- *"Bhala incwadzi yekwemukela yebantfu labane labengetiwe kulelisonto, ibhekiswe ngamagama abo wekucala."*

Ngemuva kwesigaba, i-Claude itabita emathulusi e-MCP — kucala kutfola indzawo lefanele, bese ithumba imininingwane — bese iphendvule ngelulwimi loluvamile.

## Kutsi Kusebenta Kanjani

I-B1 API ikhombisa indzawo yinye ye-MCP ku `/mcp`. I-Claude iyixhuma, icinisekise ngeikhiya yakho `cak_…`, bese itfola kufinyelela kumathulusi lamatsatfu:

| Ithulusi | Lokwentako |
|---|---|
| `list_endpoints` | Yenta luhlu lwema-endpoint e-REST langabitwa yi-Claude, angahlungwa ngendlela. Isetjentiswa kutfola. |
| `describe_endpoint` | Ibuyisa sifingqo lesifisha kanye nesibonelo sesicelo/simphendvulo se-endpoint lelitsite. |
| `api_call` | Ibita ngco i-endpoint ye-REST njengemsebentisi locinisekisiwe. |

Loku kufana ne `/membership/people`, `/giving/donations`, `/attendance/visits` njalonjalo lokusetjentiswa yi-B1Admin yakho — yonkhe imitsetfo yemvumo iyasebenta ngendlela lefanako.

## Kuphepha Nemkhawulo

- **Kwehlukanisa ngelibandla ngalinye.** Ikhiya ye-API isetjentiswa libandla linye kuphela. I-Claude ayinandlela yekubona imininingwane yalamanye emabandla.
- **Kumelene nemvumo.** Nangabe wasusa imvumo kulomuntfu lowacalisa ikhiya ku-B1Admin, i-Claude iyayilahlekelwa ngalesikhatsi lesilandzelako lokutawubitwa ngaso — ngalesikhatsi lesifanako.
- **Iyakwati kususwa.** Sula ikhiya ku **Settings → Developer → API Keys** bese kutfolakala kwe-Claude kuyaphela ngaso leso sikhatsi.
- **Luhlu lwekuvinjelwa.** Ema-webhook emsunguli, ema-endpoint emsunguli we-OAuth, kanye nendlela ye `apiEmails` lemelene nemphatsi kuphela abitwa nge-MCP.
- **Umkhawulo webukhulu bemphendvulo.** Simphendvulo sinye sethulusi sikhawulwe ku-64 KB kuze tinhlu letidze tingacinisi indzawo ye-Claude — i-Claude iyakwati kuncipisa umbuto ngemahlungo nangabe loku kwenteka.
- **Umlandvo wekuhlola.** Kushintja kudlula kulogu lofanako lwe-B1Admin; ungahlola ngaphansi kwe **Reports → Audit Log**.

## Tindleko

I-ChurchApps imahhala futsi ivulekile emtfombeni — i-MCP server yincenye ye-API lelibandla lakho seliyisebentisa. I-Anthropic ikhokhisa kusebentisa i-Claude ngekwemaplani ayo. Akukho tindleko ngakunye kubita lokuvela ku-ChurchApps.

## Kulungisa Tinkinga

**I-Claude ibika "Unauthorized" nome 401:** ithokheni ye-bearer ayikho, ayakhiwe kahle, nome ikhiya isusiwe. Hlola kabusha iHedha ye-`Authorization: Bearer cak_…` (caphela sikhala kanye negama lelitsi `Bearer`).

**Kubitwa kwethulusi kubuyisa i-403:** ikhiya ye-API ayinawo umkhawulo waleyo endpoint. Ngeta umkhawulo ku **Settings → Developer → API Keys** (utakudzinga kwakha ikhiya lensha — emkhawulo awakwati kushintjwa ngco) bese uhlela i-config ye-Claude.

**I-Claude ayikwati kutfola indzawo:** iyale kutsi ibite `list_endpoints` ngesihlungo, sibonelo *"sebentisa i-list_endpoints ngesihlungo 'donations' kutfola indlela lefanele"*. Luhlu lwendlela lwakhiwa kusuka ku-API lesetjentiswako, ngako-ke noma yini longayifinyelela nge-`curl` ikhona.

**Kutfutfukiswa kwasekhaya:** shintja `https://api.churchapps.org/mcp` ube `http://localhost:8084/mcp` — kucinisekiswa lokufanako, emathulusi lafanako.

## Lokuhambisana

- [API Keys](/docs/developer/api/api-keys) — luhlu loluphelele lwemkhawulo
- [MCP Server (developer reference)](/docs/developer/api/mcp) — imininingwane yeprothokholi kanye netifanelo temathulusi
- [ChatGPT](./chatgpt) — umbono lofanako, wemamodeli e-OpenAI
