---
title: "Claude"
---

# Claude

<div class="article-intro">

Buta i-Claude ngelibandla lakho ngelulwimi loluvamile bese iphendvula ngekusebentisa imininingwane yakho ye-B1. Imibuto lefana *"bavakashi labangaki labeta kucala labefika ngeSonto?"* nome *"ngubani lojoyine licembu lelincane kulenyanga?"* — nome uyicele kutsi yente tintfo, lefana *"ngeta likhasi lelisha ku-website yetfu lelibitwa ngekutsi Events."* Kulungiselela kutsatsa ngaphansi kwemaminithi lali-3 futsi awudzingi lwati lwetheknoloji nome i-software lekufanele uyifake.

</div>

<div class="prereqs">
<h4>Loko Lokudzingako</h4>

- **I-akhawunti ye-Claude.** **Luhlelo lwamahhala luyasebenta** — yindlela lenhle yekuyilinga. Kodvwa ema-akhawunti lamahhala anemkhawulo wemilayeto ngelilanga, futsi kufuna tintfo ku-B1 kusebentisa imilayeto masinyane, ngako-ke nawuyisebentisa njalo sincoma i-**Claude Pro** (cishe $20/month).
- **Kungena kwakho ku-B1** — lokufanako nalokusebentisako ku-B1 Admin.

</div>

:::tip Kuyanconywa — kulinga kumahhala
I-Claude yindlela lelula kakhulu yekuxhuma i-B1 ku-AI, futsi isebenta **eluhlelweni lwamahhala** lwe-Claude — yindlela lephelele yekutsi libandla lakho liyilinge ngaphambi kwekukhokhela nome yini.
:::

Kunetindlela letimbili tekuxhuma. **Indlela 1 ilula kakhulu** — ayidzingi khiya futsi akukho lokufanele ukufake.

## Indlela 1 — Ngena nge-B1 (lelula kakhulu)

Isebenta ku-website ye-Claude, ku-Claude desktop app, naku-app ye-Claude yelucingo — yilungiselele kanye bese iba kuto tonkhe.

### Sinyatselo 1 — Vula tilungiselelo te-connector te-Claude

1. Hamba uye ku-[claude.ai](https://claude.ai) bese uyangena (nome wakhe i-akhawunti lemahhala).
2. Chofota libito lakho ekhoneni lelingentasi ngesencele, bese u-**Settings** (Tilungiselelo) → **Connectors** (Ema-connector).

### Sinyatselo 2 — Ngeta i-B1

1. Chofota **Add** (Ngeta), bese u-**Add custom connector** (Ngeta i-connector yakho).
2. **Name** (Ligama): bhala `B1`.
3. **URL:** namatsisela `https://api.churchapps.org/mcp`
4. Shiya letinye tinketfo njengoba tinjalo bese uchofota **Add** (Ngeta).

### Sinyatselo 3 — Ngena ku-B1

1. Chofota **Connect** (Xhuma). Kuvuleka likhasi lekungena le-B1.
2. Ngena nge-akhawunti yakho ye-B1. Nangabe ungewemabandla langetulu kwalinye, hlola kutsi libandla lelifanele likhonjiswa phetulu.
3. I-B1 ibala loko i-Claude lecela kukwenta futsi iyacinisekisa kutsi utawubuyiselwa ku-**claude.ai**. Chofota **Allow** (Vumela).

Sewubuyele ku-Claude, futsi i-B1 ikhombisa kutsi ixhunyiwe.

### Sinyatselo 4 — Yibute intfo

Cala **inkhulumo lensha** bese uzama:

- *"Bantfu labangaki labakulelibandla letfu?"*
- *"Nika luhlu lwemacembu etfu lasebentako."*
- *"Hlanganisa iminikelo yalenyanga ngekwesikhwama."*
- *"Ngubani lojoyine libandla emalangeni langu-30 lendlulile?"*

Ekucaleni, i-Claude icela imvumo yekusebentisa i-B1 — chofota **Allow** (Vumela).

## Indlela 2 — I-extension ye-desktop lenekhiya ye-B1

Sebentisa lena nangabe ukhetsa kunika i-Claude ikhiya lenemvumo lelinganiselwe (sibonelo, kubuka kuphela). Isebenta ku-Claude desktop app ye-Mac nome Windows, futsi udzinga imvumo yekuphatsa tilungiselelo telibandla ku-B1 kute wakhe ikhiya.

### Sinyatselo 1 — Tfola i-Claude app

Landza i-Claude app ku-[claude.com/download](https://claude.com/download), uyifake, uyivule, bese uyangena.

### Sinyatselo 2 — Yakha ikhiya yakho ye-B1

Ikhiya yiyo levumela i-Claude kutsi ingene ku-B1 ye*libandla lakho* — ucabange ngayo njengephasiwedi ye-Claude kuphela.

1. Ngena ku-[B1 Admin](https://admin.b1.church) bese uya ku-[Settings → Developer](https://admin.b1.church/settings/developer).
2. Kuthebhu ye-**API Keys**, chofota **New API Key**.
3. **Ligama (Name):** bhala `Claude`.
4. **Emkhawulo (Scopes):** khetsa loko i-Claude lengakwenta. Indzawo ngayinye inelibhokisi le-**read** (kubuka kuphela) nelibhokisi le-**write** (kwenta lushintjo). Awuciniseki? Khetsa emabhokisi e-**read** kuphela kucala — ungakha ikhiya lensha lenemvumo leyengetiwe ngemuva kwesikhatsi.
5. Chofota **Save**, bese u-**Copy** ikhiya. Ikhonjiswa kanye kuphela, ngako-ke hamba ngco uye eSinyatselweni 3.

### Sinyatselo 3 — Ngeta i-B1 ku-Claude

1. [Landza i-extension ye-B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Chofota kabili** lifayela lolilandzile (`b1-churchapps.mcpb`). I-Claude iyavuleka futsi ikhombise **B1 (ChurchApps)**.
3. Chofota **Install** (Faka).
4. Nayikucela i-**B1 API key** yakho, namatsisela ikhiya lesuka eSinyatselweni 2 bese uyagcina.
5. **Vala i-Claude ngalokuphelele** (Mac: **Cmd+Q** · Windows: chofota ngesekudla sithombe se-Claude ku-taskbar → **Quit**) bese uyayivula futsi.

Nangabe kuchofota kabili akuyivuli i-Claude, hamba uye ku-**Settings → Extensions → Advanced settings → Install Extension…** ku-Claude bese ukhetsa lifayela lolilandzile. Bese ucala inkhulumo lensha uyibute intfo.

## Kuphephile Yini?

- I-Claude ingabona kuphela imininingwane ye**libandla lakho**.
- **Nawungenile (Indlela 1):** I-Claude ingeke yente lokwengca loko kungena kwakho ku-B1 lokungakwenta. Likhasi lekungena le-B1 libala konkhe i-Claude lengakwenta ngaphambi kwekutsi uchofote **Allow** (Vumela).
- **Ngekhiya (Indlela 2):** I-Claude ingenta kuphela loko ikhiya lekuvumelako — ikhiya lekhetswe kuyo emabhokisi e-**read** kuphela ingabuka kodvwa ingeke ishintje lutfo.
- **Kuyicisha:** ku-B1 Admin hamba uye ku-**Settings → Developer** bese uhoxisa i-app ngaphansi kwe-**Connected Apps** (Indlela 1) nome usule ikhiya ngaphansi kwe-**API Keys** (Indlela 2). Kufinyelela kuyema ngaso leso sikhatsi. Ungaphindze uchofote **Disconnect** (Nqamula) ku-connector ye-B1 ku-Claude.

## Kubiza Malini?

Kuxhumana ne-B1 kumahhala — kuyincenye ye-ChurchApps. I-Claude ngekwayo inaluhlelo lwamahhala; i-Claude Pro (cishe $20/month) ikunika kusebentisa lokunyenti kakhulu. Bona [claude.com/pricing](https://claude.com/pricing).

## Imininingwane Yetheknoloji

Lencenye lesele yalelikhasi ngeyebasebentisi labati ngetheknoloji kanye nebasiti be-AI: emkhawulo (scopes), letinye tindlela tekuxhuma, nekutsi kusebenta kanjani.

### Emkhawulo (Scopes)

I-Claude ikhuluma ne-B1 ngekusebentisa i-**Model Context Protocol (MCP) server** lesakhelwe ngekhatsi kwe-B1 API (`https://api.churchapps.org/mcp`). Konkhe kubita kudlula emtsetfweni lofanako wekucinisekisa, imvumo, nekwehlukaniswa ngelibandla njengesicelo lesivela ku-B1 Admin. I-Claude ikhawulwe yi**mvumo nemkhawulo** weikhiya ye-API, futsi ayikwati kufinyelela ema-webhook, ema-endpoint emphatsi we-OAuth, nome tindlela letimelene nemphatsi kuphela.

Emasethi lavamile ekucala:

- **Umsiti lofundza kuphela:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Kufundza + kwengeta emanothi / imisebenti:** ngeta `people:write`
- **Umsiti losebentako ngalokugcwele:** ngeta emkhawulo lafanako la-`:write` lowafunako

Ikhiya ye-`donations:read` ivumela i-Claude kutsi ihlanganise iminikelo kodvwa ayikwati kubhala umnikelo. Ikhiya ye-`people:write` ingengeta umuntfu kodvwa ayikwati kubona iminikelo. Bona [API Keys](/docs/developer/api/api-keys) kutsi umkhawulo ngamunye uvumelani.

### Letinye tindlela tekuxhuma

#### Claude Code (CLI)

Ku-terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Kuphela loko. Ngekhatsi kwanoma nguyiphi i-session ye-Claude Code, bhala `/mcp` kucinisekisa kutsi i-server ye-`b1` ixhunyiwe, bese ubuta i-Claude noma nguwuphi umbuto ngelibandla lakho.

#### Claude Desktop — kulungiselela nge-config (kwalabatfutfukile)

Nangabe ungafuni kusebentisa i-extension, hlela lifayela le-config le-Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Ngeta indzawo ye-server ye-`b1` lexhuma ku-B1 nge-`mcp-remote` (idzinga [Node.js](https://nodejs.org)):

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

Vula kabusha i-Claude Desktop. Imenyu ye-connector ku-chat composer itakhombisa `b1` nemathulusi ayo.

#### Claude.ai (web) — Custom Connector

Bona **Indlela 1** ngenhla. I-connector isebentisa i-OAuth 2.1: i-Claude itfola i-authorization server ye-B1 ku-`https://api.churchapps.org/.well-known/oauth-protected-resource`, iyatibhalisa nge-Dynamic Client Registration, bese iyangena nge-PKCE. Eluhlelweni lwe-Team nelwe-Enterprise, umnikati angadzinga kucala kungeta i-connector yenhlangano. I-Claude ayiceli ema-scopes lacondzile, ngako likhasi lekuvuma linikela konkhe lokungafinyelelwa yi-akhawunti ye-B1 lengenile. Kuhoxise ngaphansi kwe-**Settings → Developer → Connected Apps** ku-B1 Admin.

### Kutsi kusebenta kanjani

I-B1 API ikhombisa i-endpoint yinye ye-MCP ku-`/mcp`. I-Claude iyaxhuma kuyo, iticinisekise ngeikhiya yakho `cak_…`, bese itfola kufinyelela kumathulusi lamane:

| Ithulusi | Lokwentako |
|---|---|
| `list_endpoints` | Yenta luhlu lwema-endpoint e-REST langabitwa yi-Claude, angahlungwa ngendlela (path). Isetjentiswa kutfola. |
| `describe_endpoint` | Ibuyisa sifingceto lesifisha kanye nesibonelo sesicelo/simphendvulo se-endpoint letsite. |
| `api_call` | Ibita ngempela i-endpoint ye-REST njengemsebentisi locinisekisiwe. |
| `describe_page_builder` | Umhlahlandlela wekwakha nekuhlela emakhasi e-website yelibandla lakho, lofundvwa yi-Claude ngaphambi kwekusebenta kulokucuketfwe kwe-website. |

Loku kufana ne-`/membership/people`, `/giving/donations`, `/attendance/visits` njalonjalo lokusetjentiswa yi-B1Admin yakho — yonkhe imitsetfo yemvumo isebenta ngendlela lefanako.

### Kuphepha nemkhawulo

- **Kwehlukanisa ngelibandla ngalinye.** Ikhiya ye-API ihambisana nelibandla linye. I-Claude ayinandlela yekubona imininingwane yalamanye emabandla.
- **Kumelene nemvumo.** Nangabe ususa imvumo kulomuntfu lowakha ikhiya ku-B1Admin, i-Claude iyayilahlekelwa ngekubita lokulandzelako — ngaso leso sikhatsi.
- **Iyakwati kuhocishwa.** Sula ikhiya ku-**Settings → Developer → API Keys** bese kufinyelela kwe-Claude kuphela ngaso leso sikhatsi.
- **Luhlu lwekuvimba.** Ema-webhook emhlinzeki, ema-endpoint emphatsi we-OAuth client, kanye nendlela ye-`apiEmails` lemelene nemphatsi kuphela akubiteki nge-MCP.
- **Umkhawulo webukhulu bemphendvulo.** Imphendvulo yinye yethulusi ikhawulwe ku-64 KB kuze tinhlu letindze tingagcwalisi ingcikitsi ye-Claude — i-Claude itawuncipisa umbuto ngemahlungo nangabe loku kwenteka.
- **Umlandvo wekuhlola.** Lushintjo ludlula ku-audit log lefanako nekwentiwa ku-B1Admin; ungakubuka ngaphansi kwe-**Settings → Audit Log**.

### Kulungisa tinkinga

**I-Claude ibika "Unauthorized" nome 401:** i-bearer token ayikho, ayakhiwe kahle, nome ikhiya ihocishiwe. Nangabe usebentise i-extension, vula **Settings → Extensions → B1 (ChurchApps)** ku-Claude bese unamatsisela ikhiya futsi. Ngaphandle kwaloko hlola kabusha i-header ye-`Authorization: Bearer cak_…` (caphela sikhala kanye negama lelitsi `Bearer`).

**Kubitwa kwethulusi kubuyisa 403:** ikhiya ye-API ayinawo umkhawulo waleyo endpoint. Ngeta umkhawulo ku-**Settings → Developer → API Keys** (utawudzinga kwakha ikhiya lensha — emkhawulo awakwati kushintjwa endzaweni) bese unamatsisela ikhiya lensha kutilungiselelo te-extension nome ku-config ye-Claude.

**I-Claude ayikwati kutfola i-endpoint:** yicele kutsi ibite `list_endpoints` ngesihlungo, sibonelo *"sebentisa list_endpoints ngesihlungo 'donations' kutfola indlela lefanele"*. Luhlu lwetindlela lwakhiwa kusuka ku-API lesebentako, ngako-ke noma yini longayifinyelela nge-`curl` ikhona.

**Kutfutfukiswa kwasekhaya:** shintja `https://api.churchapps.org/mcp` ube `http://localhost:8084/mcp` — kucinisekiswa lokufanako, emathulusi lafanako.

## Lokuhambisana

- [API Keys](/docs/developer/api/api-keys) — luhlu loluphelele lwemkhawulo
- [MCP Server (developer reference)](/docs/developer/api/mcp) — imininingwane yeprothokholi kanye netinhlaka temathulusi
- [ChatGPT](./chatgpt) — umbono lofanako, wemamodeli e-OpenAI
