---
title: "Claude"
---

# Claude

<div class="article-intro">

Magtanong kay Claude tungkol sa iyong simbahan sa simpleng Ingles, at sasagot ito gamit ang iyong datos sa B1. Mga tanong tulad ng *"ilan ang first-time visitors noong Linggo?"* o *"sino ang sumali sa small group ngayong buwan?"* — o hilingin mo na gumawa ito ng isang bagay, tulad ng *"magdagdag ng bagong pahina sa aming website na tinatawag na Events."* Wala pang 3 minuto ang pag-set up, at hindi mo kailangan ng anumang teknikal na kasanayan o software na i-install.

</div>

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- **Isang Claude account.** **Gumagana ang libreng plan** — magandang paraan para subukan. Gayunpaman, may araw-araw na limitasyon sa mensahe ang mga libreng account, at mabilis maubos ang mensahe kapag naghahanap ng impormasyon sa B1, kaya kung gagamitin mo ito nang madalas, inirerekomenda namin ang **Claude Pro** (mga $20 bawat buwan).
- **Ang iyong B1 login** — ang parehong ginagamit mo sa B1 Admin.

</div>

:::tip Inirerekomenda — libreng subukan
Ang Claude ang pinakamadaling paraan para ikonekta ang B1 sa AI, at gumagana ito sa **libreng plan** ng Claude — perpektong paraan para masubukan ito ng iyong simbahan bago magbayad ng anuman.
:::

May dalawang paraan para kumonekta. **Ang Option 1 ang pinakamadali** — walang susi at walang kailangang i-install.

## Option 1 — Mag-sign in gamit ang B1 (pinakamadali)

Gumagana ito sa website ng Claude, sa Claude desktop app, at sa Claude phone app — i-set up mo lang ito nang isang beses at available na ito sa lahat ng iyon.

### Hakbang 1 — Buksan ang connector settings ng Claude

1. Pumunta sa [claude.ai](https://claude.ai) at mag-sign in (o gumawa ng libreng account).
2. I-click ang pangalan mo sa kaliwang ibabang sulok, pagkatapos ay **Settings** → **Connectors**.

### Hakbang 2 — Idagdag ang B1

1. I-click ang **Add**, pagkatapos ay **Add custom connector**.
2. **Name:** i-type ang `B1`.
3. **URL:** i-paste ang `https://api.churchapps.org/mcp`
4. Iwan sa dating setting ang ibang opsyon at i-click ang **Add**.

### Hakbang 3 — Mag-sign in sa B1

1. I-click ang **Connect**. Magbubukas ang pahina ng B1 sign-in.
2. Mag-log in gamit ang iyong B1 account. Kung miyembro ka ng higit sa isang simbahan, tiyakin na tama ang simbahang nakalista sa itaas.
3. Ipapakita ng B1 kung ano ang hinihiling ng Claude na gawin, at kukumpirmahin na ibabalik ka sa **claude.ai**. I-click ang **Allow**.

Bumalik ka na sa Claude, at lalabas na connected ang B1.

### Hakbang 4 — Magtanong

Magbukas ng **bagong chat** at subukan ang:

- *"Ilan ang tao sa aming simbahan?"*
- *"Ilistahan ang aming mga aktibong group."*
- *"Ibuod ang giving ngayong buwan ayon sa fund."*
- *"Sino ang sumali sa simbahan sa nakalipas na 30 araw?"*

Sa unang pagkakataon, hihingi ang Claude ng pahintulot na gamitin ang B1 — i-click ang **Allow**.

## Option 2 — Desktop extension gamit ang B1 key

Gamitin ito kung mas gusto mong bigyan ang Claude ng susi na may limitadong pahintulot (halimbawa, view lang). Gumagana ito sa Claude desktop app para sa Mac o Windows, at kailangan mo ng pahintulot na pamahalaan ang church settings sa B1 para makagawa ng susi.

### Hakbang 1 — Kunin ang Claude app

I-download ang Claude app mula sa [claude.com/download](https://claude.com/download), i-install ito, buksan, at mag-sign in.

### Hakbang 2 — Gumawa ng iyong B1 key

Ang key ang nagbibigay-daan sa Claude na pumasok sa B1 ng *iyong* simbahan — isipin ito bilang password na para lang sa Claude.

1. Mag-log in sa [B1 Admin](https://admin.b1.church) at pumunta sa [Settings → Developer](https://admin.b1.church/settings/developer).
2. Sa tab na **API Keys**, i-click ang **New API Key**.
3. **Name:** i-type ang `Claude`.
4. **Scopes:** lagyan ng check ang mga bagay na maaaring gawin ng Claude. May **read** box (view lang) at **write** box (gumawa ng pagbabago) ang bawat lugar. Hindi sigurado? Lagyan muna ng check ang mga **read** box — maaari kang gumawa ng bagong key na may mas maraming pahintulot sa hinaharap.
5. I-click ang **Save**, pagkatapos ay **Copy** ang key. Isang beses lang ito ipinapakita, kaya diretso sa Hakbang 3.

### Hakbang 3 — Idagdag ang B1 sa Claude

1. [I-download ang B1 extension](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **I-double-click** ang na-download na file (`b1-churchapps.mcpb`). Bubukas ang Claude at ipapakita ang **B1 (ChurchApps)**.
3. I-click ang **Install**.
4. Kapag hiningi ang iyong **B1 API key**, i-paste ang key mula sa Hakbang 2 at i-save.
5. **Ganap na isara ang Claude** (Mac: **Cmd+Q** · Windows: i-right-click ang icon ng Claude sa taskbar → **Quit**) at buksan itong muli.

Kung hindi bumukas ang Claude sa double-click, pumunta sa **Settings → Extensions → Advanced settings → Install Extension…** sa Claude at piliin ang na-download na file. Pagkatapos, magbukas ng bagong chat at magtanong.

## Ligtas ba Ito?

- Makikita lang ng Claude ang datos ng **iyong simbahan**.
- **Naka-sign in (Option 1):** Hindi kailanman makakagawa ang Claude ng higit sa kayang gawin ng sarili mong B1 login. Ipinapakita ng B1 sign-in page ang lahat ng maaaring gawin ng Claude bago mo i-click ang **Allow**.
- **Gamit ang key (Option 2):** Magagawa lang ng Claude ang pinapayagan ng key — ang key na may **read** box lang ang nakalagay ay makakapag-view pero hindi kailanman makakapagbago ng anuman.
- **Para i-off ito:** sa B1 Admin, pumunta sa **Settings → Developer** at bawiin ang app sa ilalim ng **Connected Apps** (Option 1), o burahin ang key sa ilalim ng **API Keys** (Option 2). Agad na titigil ang access. Maaari mo ring i-click ang **Disconnect** sa B1 connector sa Claude.

## Magkano ang Gastos?

Libre ang koneksyon sa B1 — bahagi ito ng ChurchApps. Mayroong libreng plan ang Claude mismo; nagbibigay ang Claude Pro (mga $20 bawat buwan) ng mas maraming paggamit. Tingnan ang [claude.com/pricing](https://claude.com/pricing).

## Mga Teknikal na Detalye

Ang natitira sa pahinang ito ay para sa mga teknikal na gumagamit at AI assistant: mga scope, iba pang paraan ng pagkonekta, at kung paano ito gumagana.

### Mga Scope

Nakikipag-usap ang Claude sa B1 sa pamamagitan ng **Model Context Protocol (MCP) server** na naka-built-in sa B1 API (`https://api.churchapps.org/mcp`). Dumadaan ang bawat tawag sa parehong auth, permission, at church-scoping rules gaya ng request mula sa B1 Admin. Limitado ang Claude sa **mga pahintulot at scope** ng API key, at hindi nito maaabot ang webhooks, OAuth admin endpoints, o iba pang operator-only na daanan.

Mga karaniwang panimulang set ng scope:

- **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Read + magdagdag ng notes / tasks:** idagdag ang `people:write`
- **Buong operational assistant:** idagdag ang mga katugmang `:write` scope na gusto mo

Ang `donations:read` key ay nagbibigay-daan sa Claude na ibuod ang giving pero hindi makapagtala ng donasyon. Ang `people:write` key ay makakapagdagdag ng tao pero hindi makakakita ng donasyon. Tingnan ang [API Keys](/docs/developer/api/api-keys) para sa kung ano ang pinapayagan ng bawat scope.

### Iba pang paraan ng pagkonekta

#### Claude Code (CLI)

Sa terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Tapos na. Sa loob ng anumang Claude Code session, i-type ang `/mcp` para kumpirmahing connected ang `b1` server, pagkatapos magtanong ng kahit anong bagay tungkol sa iyong simbahan.

#### Claude Desktop — manual config (advanced)

Kung ayaw mong gamitin ang extension, i-edit ang config file ng Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Idagdag ang `b1` server entry na kumokonekta sa B1 sa pamamagitan ng `mcp-remote` (kailangan ng [Node.js](https://nodejs.org)):

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

I-restart ang Claude Desktop. Ipapakita ng connector menu sa chat composer ang `b1` kasama ang mga tool nito.

#### Claude.ai (web) — Custom Connector

Tingnan ang **Option 1** sa itaas. Gumagamit ang connector ng OAuth 2.1: nadidiskubre ng Claude ang authorization server ng B1 mula sa `https://api.churchapps.org/.well-known/oauth-protected-resource`, nagrerehistro ang sarili gamit ang Dynamic Client Registration, at nagsa-sign in gamit ang PKCE. Sa Team at Enterprise plans, maaaring kailanganin muna ng owner na idagdag ang connector para sa organisasyon. Hindi humihiling ang Claude ng partikular na mga scope, kaya ang consent page ay nag-aalok ng lahat ng maaaring i-access ng naka-sign in na B1 account. Bawiin ito sa ilalim ng **Settings → Developer → Connected Apps** sa B1 Admin.

### Paano ito gumagana

Naglalantad ang B1 API ng iisang MCP endpoint sa `/mcp`. Kumokonekta rito ang Claude, nag-a-authenticate gamit ang iyong `cak_…` key, at nakakakuha ng access sa apat na tool:

| Tool | Ano ang ginagawa nito |
|---|---|
| `list_endpoints` | Inililista ang mga REST endpoint na maaaring tawagin ng Claude, na maaaring i-filter ayon sa path. Ginagamit para sa pagtuklas. |
| `describe_endpoint` | Nagbabalik ng maikling buod at halimbawang request/response para sa isang partikular na endpoint. |
| `api_call` | Aktwal na tumatawag sa REST endpoint bilang naka-authenticate na user. |
| `describe_page_builder` | Gabay sa pagbuo at pag-edit ng mga pahina ng website ng iyong simbahan, na binabasa ng Claude bago gumawa sa nilalaman ng website. |

Ito ang parehong `/membership/people`, `/giving/donations`, `/attendance/visits` at iba pang surface na ginagamit ng B1 Admin — nalalapat nang magkapareho ang bawat panuntunan sa pahintulot.

### Kaligtasan at mga limitasyon

- **Hiwalay ang bawat simbahan.** Ang API key ay tumutukoy sa iisang simbahan. Walang paraan ang Claude na makakita ng datos ng ibang simbahan.
- **Nakabatay sa pahintulot.** Kung aalisin mo ang isang pahintulot mula sa taong gumawa ng key sa B1 Admin, mawawala ito sa Claude sa susunod nitong tawag — agad-agad.
- **Maaaring bawiin.** Burahin ang key sa **Settings → Developer → API Keys** at agad na magtatapos ang access ng Claude.
- **Blocklist.** Hindi matatawag sa pamamagitan ng MCP ang provider webhooks, OAuth client admin endpoints, at ang operator-only na `apiEmails` route.
- **Limitasyon sa laki ng response.** Ang isang tool response ay limitado sa 64 KB para hindi sumabog ang context ng Claude sa mahahabang listahan — magpapaliit ang Claude ng query gamit ang filters kapag nangyari ito.
- **Audit trail.** Dumadaan ang mga pagbabago sa parehong audit log ng mga aksyon sa B1 Admin; maaari mo itong suriin sa ilalim ng **Settings → Audit Log**.

### Pag-troubleshoot

**Nagsasabi ang Claude ng "Unauthorized" o 401:** nawawala, mali ang format, o binawi na ang bearer token. Kung gumamit ka ng extension, buksan ang **Settings → Extensions → B1 (ChurchApps)** sa Claude at i-paste muli ang key. Kung hindi, suriin muli ang `Authorization: Bearer cak_…` header (tandaan ang espasyo at ang literal na `Bearer`).

**Nagbabalik ng 403 ang isang tool call:** walang scope ang API key para sa endpoint na iyon. Idagdag ang scope sa **Settings → Developer → API Keys** (kailangan mong gumawa ng bagong key — hindi maaaring palitan ang scope nang hindi binabago ang key) at i-paste ang bagong key sa settings ng extension o sa config ng Claude.

**Hindi mahanap ng Claude ang isang endpoint:** hilingin dito na tumawag ng `list_endpoints` gamit ang filter, halimbawa *"gamitin ang list_endpoints na may filter na 'donations' para hanapin ang tamang path"*. Galing sa live API ang route inventory, kaya anumang maaaring ma-hit gamit ang `curl` ay nandoon.

**Lokal na development:** palitan ang `https://api.churchapps.org/mcp` ng `http://localhost:8084/mcp` — parehong auth, parehong tool.

## Kaugnay

- [API Keys](/docs/developer/api/api-keys) — kumpletong sanggunian ng scope
- [MCP Server (developer reference)](/docs/developer/api/mcp) — mga detalye ng protocol at tool schema
- [ChatGPT](./chatgpt) — katulad na ideya, para sa mga modelo ng OpenAI
