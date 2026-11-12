---
title: "Claude"
description: "Ikonekta ang B1 Admin sa Claude para makapagtanong ka tungkol sa attendance, giving, at mga grupo sa simpleng wika, na may opsyong mag-sign in at opsyong gumamit ng key na may limitadong pahintulot."
---

# Claude

<div class="article-intro">

Magtanong kay Claude tungkol sa iyong simbahan sa simpleng wika at sasagot ito mula sa iyong datos ng B1 — kasama ang iyong mga FreePlay lesson at classroom. Mga tanong tulad ng *"ilan ang first-time visitor noong Linggo?"* o *"sino ang sumali sa small group ngayong buwan?"* — o hilingan itong gumawa ng mga bagay, tulad ng *"magdagdag ng bagong pahina sa aming website na tinawag na Events."* Wala pang 3 minuto ang setup at hindi mo kailangan ng anumang teknikal na kasanayan o software para mag-install.

</div>

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- **Isang Claude account.** **Gumagana ang libreng plan** — magandang paraan para masubukan ito. Gayunpaman, may araw-araw na limitasyon sa mensahe ang mga libreng account, at mabilis maubos ang mga mensahe kapag naghahanap ng impormasyon sa B1, kaya kung gagamitin mo ito nang regular, inirerekomenda namin ang **Claude Pro** (mga $20/buwan).
- **Iyong B1 login** — ang parehong ginagamit mo sa B1 Admin.

</div>

:::tip Inirerekomenda — libreng subukan
Ang Claude ang pinakamadaling paraan para ikonekta ang B1 sa AI, at gumagana ito sa **libreng plan** ng Claude — perpektong paraan para masubukan ito ng iyong simbahan bago magbayad ng anuman.
:::

May dalawang paraan para kumonekta. **Ang Opsyon 1 ang pinakamadali** — walang key at walang kailangang i-install.

## Opsyon 1 — Mag-sign in gamit ang B1 (pinakamadali) {#option-1--sign-in-with-b1-easiest}

Gumagana ito sa website ng Claude, sa desktop app ng Claude, at sa phone app ng Claude — i-set up nang isang beses at nasa lahat na ng mga ito.

### Hakbang 1 — Buksan ang connector settings ng Claude {#step-1--open-claudes-connector-settings}

1. Pumunta sa [claude.ai](https://claude.ai) at mag-sign in (o gumawa ng libreng account).
2. I-click ang pangalan mo sa kaliwang ibaba, pagkatapos ay **Settings** → **Connectors**.

### Hakbang 2 — Idagdag ang B1 {#step-2--add-b1}

1. I-click ang **Add**, pagkatapos ay **Add custom connector**.
2. **Name:** i-type ang `B1`.
3. **URL:** i-paste ang `https://api.churchapps.org/mcp`
4. Iwan ang ibang opsyon at i-click ang **Add**.

### Hakbang 3 — Mag-sign in sa B1 {#step-3--sign-in-to-b1}

1. I-click ang **Connect**. Magbubukas ang pahina ng pag-sign in ng B1.
2. Mag-log in gamit ang iyong B1 account. Kung kabilang ka sa higit sa isang simbahan, tiyaking tama ang simbahang nakasaad sa pahina ("Would you like to access the following data from *your church*…").
3. Ililista ng B1 kung ano ang hinihingi ng Claude (**Everything your B1 account can access**), sasabihin na nagrehistro ang app sa sarili nito sa B1, at kukumpirmahing ibabalik ka sa **claude.ai**. I-click ang **Allow**.

Bumalik ka na sa Claude at makikita mong nakakonekta na ang B1.

### Hakbang 4 — Magtanong ng kahit ano {#step-4--ask-it-something}

Magsimula ng **bagong chat** at subukan:

- *"Ilan ang tao sa simbahan natin?"*
- *"Ilista ang aming mga aktibong grupo."*
- *"Ibuod ang giving ngayong buwan kada pondo."*
- *"Sino ang sumali sa simbahan sa nakalipas na 30 araw?"*

Sa unang pagkakataon, hihingi ang Claude ng pahintulot na gamitin ang B1 — i-click ang **Allow**.

## Opsyon 2 — Desktop extension na may B1 key {#option-2--desktop-extension-with-a-b1-key}

Gamitin ito kung mas gusto mong bigyan ang Claude ng key na may limitadong pahintulot (halimbawa, tingin lang). Gumagana ito sa desktop app ng Claude para sa Mac o Windows, at kailangan mo ng pahintulot na mamahala ng mga setting ng simbahan sa B1 para makagawa ng key.

### Hakbang 1 — Kunin ang Claude app {#step-1--get-the-claude-app}

I-download ang Claude app mula sa [claude.com/download](https://claude.com/download), i-install ito, buksan, at mag-sign in.

### Hakbang 2 — Gumawa ng iyong B1 key {#step-2--make-your-b1-key}

Ang key ang nagpapapasok sa Claude sa B1 ng *iyong* simbahan — isipin itong parang password na para lang sa Claude.

1. Mag-log in sa [B1 Admin](https://admin.b1.church) at pumunta sa [Settings → Developer](https://admin.b1.church/settings/developer).
2. Sa tab na **API Keys**, i-click ang **New API Key**.
3. **Name:** i-type ang `Claude`.
4. **Scopes:** lagyan ng check kung ano ang puwedeng gawin ng Claude. Karamihan ng lugar ay may kahon na **read** (tingin lang) at kahon na **write** (gumawa ng pagbabago); ang forms ay may **forms:write** lang. Hindi ka sigurado? Lagyan muna ng check ang mga kahon na **read** lang para magsimula — puwede kang gumawa ng bagong key na may mas maraming pahintulot sa hinaharap.
5. I-click ang **Save**, pagkatapos ay i-**Copy** ang key. Isang beses lang ito ipinapakita, kaya dumiretso sa Hakbang 3.

### Hakbang 3 — Idagdag ang B1 sa Claude {#step-3--add-b1-to-claude}

1. [I-download ang B1 extension](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **I-double-click** ang na-download na file (`b1-churchapps.mcpb`). Magbubukas ang Claude at ipapakita ang **B1 (ChurchApps)**.
3. I-click ang **Install**.
4. Kapag humingi ito ng iyong **B1 API key**, i-paste ang key mula sa Hakbang 2 at i-save.
5. **Isara nang buo ang Claude** (Mac: **Cmd+Q** · Windows: i-right-click ang icon ng Claude sa taskbar → **Quit**) at buksan itong muli.

Kung hindi bumukas ang Claude sa pag-double-click, pumunta sa **Settings → Extensions → Advanced settings → Install Extension…** sa Claude at piliin ang na-download na file. Pagkatapos, magsimula ng bagong chat at magtanong ng kahit ano.

:::tip Na-install mo na ang extension?
Wala ka nang kailangang gawin — gumagana ang FreePlay sa parehong koneksyon. Ang tanging eksepsyon ay ang bersyon 1.1.0, na humingi ng B1 email at password: i-download at i-install muli ang extension para mag-update. Mananatili ang iyong key.
:::

## Ligtas Ba Ito? {#is-it-safe}

- Ang makikita lang ng Claude ay ang datos ng **iyong simbahan**.
- **Naka-sign in (Opsyon 1):** Hindi kailanman makakagawa ang Claude ng higit sa kayang gawin ng sarili mong B1 login. Ipinapakita ng pahina ng pag-sign in ng B1 kung ano ang hinihingi ng Claude bago mo i-click ang **Allow**.
- **Gamit ang key (Opsyon 2):** Puwede lang gawin ng Claude ang pinapayagan ng key sa B1 — ang key na may mga kahon na **read** lang ang naka-check ay makakatingin lang at hindi makakagawa ng anumang pagbabago. Gumagana ang FreePlay sa parehong paraan, sa ilalim ng parehong key.
- **Para i-off ito:** sa B1 Admin, pumunta sa **Settings → Developer** at i-revoke ang app sa ilalim ng **Connected Apps** (Opsyon 1) o burahin ang key sa ilalim ng **API Keys** (Opsyon 2). Titigil agad ang access. Puwede mo ring i-click ang **Disconnect** sa B1 connector sa Claude.

## Magkano ang Gastos? {#what-does-it-cost}

Libre ang koneksyon sa B1 — bahagi ito ng ChurchApps. May libreng plan ang Claude mismo; ang Claude Pro (mga $20/buwan) ay nagbibigay ng mas maraming gamit. Tingnan ang [claude.com/pricing](https://claude.com/pricing).

## Mga Teknikal na Detalye {#technical-details}

Ang natitira sa pahinang ito ay para sa mga teknikal na user at AI assistant: mga scope, ibang paraan ng pagkonekta, at kung paano ito gumagana.

### Mga Scope {#scopes}

Nakikipag-usap ang Claude sa B1 sa pamamagitan ng **Model Context Protocol (MCP) server** na nakapaloob sa B1 API (`https://api.churchapps.org/mcp`). Dumadaan ang bawat tawag sa parehong auth, permission, at church-scoping na patakaran gaya ng request mula sa B1 Admin. Limitado ang Claude sa **mga pahintulot at scope** ng API key, at hindi nito maabot ang mga webhook ng payment provider, mga admin endpoint ng OAuth client, o mga endpoint ng pag-sign in at password.

Mga karaniwang starter na set ng scope:

- **Read-only na assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Read + magdagdag ng note / task:** idagdag ang `people:write`
- **Buong operational assistant:** idagdag ang mga katugmang `:write` scope na gusto mo

Ang key na may `donations:read` ay nagpapahintulot sa Claude na ibuod ang giving pero hindi makapagtala ng regalo. Ang key na may `people:write` ay makakapagdagdag ng tao pero hindi makakakita ng donasyon. Tingnan ang [API Keys](/docs/developer/api/api-keys) para sa kung ano ang pinapayagan ng bawat scope.

### Ibang Paraan ng Pagkonekta {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

Sa terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Tapos na iyon. Sa anumang session ng Claude Code, i-type ang `/mcp` para kumpirmahing nakakonekta ang `b1` server, pagkatapos ay magtanong ng kahit ano tungkol sa iyong simbahan.

#### Claude Desktop — manual na config (advanced) {#claude-desktop--manual-config-advanced}

Kung ayaw mong gamitin ang extension, i-edit ang config file ng Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Idagdag ang entry ng `b1` server na kumokonekta sa B1 sa pamamagitan ng `mcp-remote` (kailangan ng [Node.js](https://nodejs.org)):

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

#### Claude.ai (web) — Custom Connector {#claudeai-web--custom-connector}

Tingnan ang **Opsyon 1** sa itaas. Gumagamit ang connector ng OAuth 2.1: natutuklasan ng Claude ang authorization server ng B1 mula sa `https://api.churchapps.org/.well-known/oauth-protected-resource`, nagrerehistro ang sarili nito sa pamamagitan ng Dynamic Client Registration, at nag-sign in gamit ang PKCE. Sa mga Team at Enterprise plan, maaaring kailanganin ng owner na idagdag muna ang connector para sa organisasyon. Hindi humihingi ng partikular na scope ang Claude, kaya ang consent page ay nag-aalok ng lahat ng maaaring i-access ng naka-sign in na B1 account. I-revoke ito sa ilalim ng **Settings → Developer → Connected Apps** sa B1 Admin.

### Paano ito gumagana {#how-it-works}

Naglalantad ang B1 API ng iisang MCP endpoint sa `/mcp`. Kumokonekta rito ang Claude, nag-a-authenticate gamit ang iyong `cak_…` key, at nakakakuha ng access sa apat na tool:

| Tool | Ano ang ginagawa nito |
|---|---|
| `list_endpoints` | Inililista ang mga REST endpoint na puwedeng tawagin ng Claude, na maaaring i-filter ayon sa path. Ginagamit para sa pagtuklas. |
| `describe_endpoint` | Nagbabalik ng maikling buod at halimbawang request/response para sa isang partikular na endpoint. |
| `api_call` | Aktwal na tumatawag sa isang REST endpoint bilang naka-authenticate na user. |
| `describe_page_builder` | Gabay sa pagbuo at pag-edit ng mga pahina ng website ng iyong simbahan, na binabasa ng Claude bago ito magtrabaho sa nilalaman ng website. |

Ito ang parehong surface ng `/membership/people`, `/giving/donations`, `/attendance/visits` atbp. na ginagamit ng B1 Admin — nalalapat ang bawat patakaran sa pahintulot nang magkapareho. Nakalista sa ilalim ng `/lessons/*` ang mga endpoint ng FreePlay (lessons.church); ipinapasa ang mga tawag ng Claude sa FreePlay bilang parehong user, na may parehong pahintulot.

### Kaligtasan at mga limitasyon {#safety-and-limits}

- **Hiwalay ang bawat simbahan.** Isang simbahan lang ang tinutukoy ng API key. Walang paraan ang Claude para makita ang datos ng ibang simbahan.
- **Nakabatay sa pahintulot.** Kung aalisin mo ang isang pahintulot sa taong gumawa ng key sa B1Admin, mawawala ito sa Claude sa susunod na tawag — agad-agad.
- **Puwedeng bawiin.** Burahin ang key sa **Settings → Developer → API Keys** at agad na titigil ang access ng Claude.
- **Blocklist.** Hindi matatawag sa pamamagitan ng MCP ang mga endpoint ng webhook ng payment provider, mga admin endpoint ng OAuth client, at mga endpoint ng sign-in, registration, password, at two-factor.
- **Limitasyon sa laki ng response.** Hanggang 64 KB lang ang isang tool response para hindi masobrahan ang context ng Claude sa mahahabang listahan — kapag nangyari ito, pagliliitin ng Claude ang query gamit ang mga filter.
- **Audit trail.** Dumadaan sa parehong audit log ng mga aksyon sa B1Admin ang mga pagbabago; puwede mo itong suriin sa ilalim ng **Settings → Audit Log**.

### Troubleshooting {#troubleshooting}

**Humihingi ang Claude ng B1 email at password para sa FreePlay:** mayroon kang bersyon 1.1.0 ng desktop extension. I-download at i-install itong muli para mag-update — ang mas bagong bersyon ay gumagamit na lang ng iyong key.

**Nag-uulat ang Claude ng "Unauthorized" o 401:** kulang, mali ang format, o binawi na ang bearer token. Kung ginamit mo ang extension, buksan ang **Settings → Extensions → B1 (ChurchApps)** sa Claude at i-paste muli ang key. Kung hindi, tingnan muli ang header na `Authorization: Bearer cak_…` (tandaan ang space at ang literal na salitang `Bearer`).

**Nagbabalik ng 403 ang isang tool call:** walang scope ang API key para sa endpoint na iyon. Idagdag ang scope sa **Settings → Developer → API Keys** (kailangan mong gumawa ng bagong key — hindi maaaring palitan ang scope nang hindi binabago ang key) at i-paste ang bagong key sa settings ng extension o sa config ng Claude.

**Hindi mahanap ng Claude ang isang endpoint:** hilingan itong tawagin ang `list_endpoints` na may filter, hal. *"use list_endpoints with filter 'donations' to find the right path"*. Nabubuo ang route inventory mula sa live na API, kaya nandoon ang anumang maaabot mo gamit ang `curl`.

**Lokal na development:** palitan ang `https://api.churchapps.org/mcp` ng `http://localhost:8084/mcp` — parehong auth, parehong tool.

## Kaugnay {#related}

- [API Keys](/docs/developer/api/api-keys) — kumpletong reference ng scope
- [MCP Server (developer reference)](/docs/developer/api/mcp) — mga detalye ng protocol at schema ng tool
- [ChatGPT](./chatgpt.md) — parehong ideya, para sa mga modelo ng OpenAI
