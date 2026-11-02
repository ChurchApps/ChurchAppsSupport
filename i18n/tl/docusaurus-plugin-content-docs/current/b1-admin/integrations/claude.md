---
title: "Claude"
---

# Claude

<div class="article-intro">

Magtanong kay Claude tungkol sa iyong simbahan sa simpleng Ingles, at sasagot ito mula sa datos ng iyong B1 -- kasama ang iyong mga FreePlay lesson at classroom. Mga tanong gaya ng *"ilan ang first-time na bisita noong Linggo?"* o *"sino ang sumali sa maliit na grupo ngayong buwan?"* -- o hilingin dito na gumawa ng mga bagay, gaya ng *"magdagdag ng bagong pahina sa aming website na tinatawag na Events."* Wala pang 3 minuto ang setup, at hindi mo kailangan ng anumang teknikal na kasanayan o software na i-install.

</div>

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- **Isang Claude account.** **Gumagana ang libreng plan** -- magandang paraan para subukan ito. Gayunman, may araw-araw na limitasyon sa mensahe ang mga libreng account, at mabilis maubos ang mga mensahe kapag nagtatanong tungkol sa B1, kaya kung gagamitin mo ito nang regular, inirerekomenda namin ang **Claude Pro** (mga $20/buwan).
- **Ang iyong B1 login** -- ang parehong ginagamit mo sa B1 Admin.

</div>

:::tip Inirerekomenda -- libreng subukan
Ang Claude ang pinakamadaling paraan para ikonekta ang B1 sa AI, at gumagana ito sa **libreng plan** ng Claude -- perpektong paraan para subukan ito ng iyong simbahan bago magbayad ng anuman.
:::

May dalawang paraan para kumonekta. **Ang Opsyon 1 ang pinakamadali** -- walang key at walang kailangang i-install.

## Opsyon 1 -- Mag-sign in gamit ang B1 (pinakamadali)

Gumagana sa website ng Claude, sa Claude desktop app, at sa Claude phone app -- i-set up ito nang isang beses at nasa lahat ng ito na.

### Hakbang 1 -- Buksan ang connector settings ng Claude

1. Pumunta sa [claude.ai](https://claude.ai) at mag-sign in (o gumawa ng libreng account).
2. I-click ang iyong pangalan sa kaliwang ibaba, pagkatapos **Settings** → **Connectors**.

### Hakbang 2 -- Idagdag ang B1

1. I-click ang **Add**, pagkatapos **Add custom connector**.
2. **Name:** i-type ang `B1`.
3. **URL:** i-paste ang `https://api.churchapps.org/mcp`
4. Iwanan ang ibang opsyon gaya ng mga ito at i-click ang **Add**.

### Hakbang 3 -- Mag-sign in sa B1

1. I-click ang **Connect**. Magbubukas ang sign-in page ng B1.
2. Mag-log in gamit ang iyong B1 account. Kung kabilang ka sa higit sa isang simbahan, tiyaking tama ang simbahang nakalagay sa itaas.
3. Ipinapakita ng B1 kung ano ang hinihiling ng Claude na gawin, at kinukumpirma nitong ibabalik ka sa **claude.ai**. I-click ang **Allow**.

Bumalik ka na sa Claude, at ipinapakitang konektado na ang B1.

### Hakbang 4 -- Magtanong ng kahit ano

Magsimula ng **bagong chat** at subukan ang:

- *"Ilan ang tao sa aming simbahan?"*
- *"Ilista ang aming mga aktibong grupo."*
- *"Ibuod ang giving ngayong buwan ayon sa fund."*
- *"Sino ang sumali sa simbahan sa nakaraang 30 araw?"*

Sa unang pagkakataon, hihingi ang Claude ng pahintulot na gamitin ang B1 -- i-click ang **Allow**.

## Opsyon 2 -- Desktop extension na may B1 key

Gamitin ito kung mas gusto mong bigyan ang Claude ng key na may limitadong permiso (halimbawa, tingin lang). Gumagana ito sa Claude desktop app para sa Mac o Windows, at kailangan mo ng permiso para pamahalaan ang mga setting ng simbahan sa B1 para makagawa ng key.

### Hakbang 1 -- Kunin ang Claude app

I-download ang Claude app mula sa [claude.com/download](https://claude.com/download), i-install ito, buksan, at mag-sign in.

### Hakbang 2 -- Gumawa ng iyong B1 key

Ang key ang nagpapapasok sa Claude sa B1 ng *iyong* simbahan -- isipin ito na parang password na para lang sa Claude.

1. Mag-log in sa [B1 Admin](https://admin.b1.church) at pumunta sa [Settings → Developer](https://admin.b1.church/settings/developer).
2. Sa tab na **API Keys**, i-click ang **New API Key**.
3. **Name:** i-type ang `Claude`.
4. **Scopes:** lagyan ng check kung ano ang maaaring gawin ng Claude. Bawat lugar ay may kahong **read** (tingin lang) at kahong **write** (gumawa ng pagbabago). Hindi sigurado? Lagyan muna ng check ang mga kahong **read** para magsimula -- maaari kang gumawa ng bagong key na may mas maraming permiso sa hinaharap.
5. I-click ang **Save**, pagkatapos **Copy** ang key. Isang beses lang ito makikita, kaya dumiretso sa Hakbang 3.

### Hakbang 3 -- Idagdag ang B1 sa Claude

1. [I-download ang B1 extension](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **I-double-click** ang na-download na file (`b1-churchapps.mcpb`). Bubukas ang Claude at ipinapakita ang **B1 (ChurchApps)**.
3. I-click ang **Install**.
4. Kapag hiniling nito ang iyong **B1 API key**, i-paste ang key mula sa Hakbang 2 at i-save.
5. **Ganap na i-quit ang Claude** (Mac: **Cmd+Q** · Windows: i-right-click ang icon ng Claude sa taskbar → **Quit**) at buksan ulit ito.

Kung hindi nabubuksan ang Claude sa pag-double-click, pumunta sa **Settings → Extensions → Advanced settings → Install Extension…** sa Claude at piliin ang na-download na file. Pagkatapos, magsimula ng bagong chat at magtanong ng kahit ano.

:::tip Naka-install na ang extension?
Wala nang kailangang gawin -- gumagana ang FreePlay sa pamamagitan ng parehong koneksyon. Ang tanging eksepsyon ay ang bersyon 1.1.0, na humingi ng B1 email at password: i-download at i-install ulit ang extension para mag-update. Mananatili ang iyong key.
:::

## Ligtas Ba Ito?

- Ang Claude ay **datos ng iyong simbahan** lang ang nakikita.
- **Naka-sign in (Opsyon 1):** Hindi kailanman makakagawa ang Claude ng higit sa kayang gawin ng sarili mong B1 login. Ipinapakita ng sign-in page ng B1 ang lahat ng maaaring gawin ng Claude bago mo i-click ang **Allow**.
- **Gamit ang key (Opsyon 2):** Ang magagawa lang ng Claude sa B1 ay ang pinapayagan ng key -- ang key na may mga kahon na **read** lang na naka-check ay makakatingin lang at hindi kailanman makakapagbago ng anuman. Gumagana nang pareho ang FreePlay, sa ilalim ng parehong key.
- **Para i-off ito:** Sa B1 Admin, pumunta sa **Settings → Developer** at bawiin ang app sa ilalim ng **Connected Apps** (Opsyon 1) o burahin ang key sa ilalim ng **API Keys** (Opsyon 2). Agad titigil ang access. Maaari ka ring mag-click ng **Disconnect** sa B1 connector sa Claude.

## Magkano Ang Gastos?

Libre ang koneksyon sa B1 -- bahagi ito ng ChurchApps. Ang Claude mismo ay may libreng plan; ang Claude Pro (mga $20/buwan) ay nagbibigay ng mas maraming paggamit. Tingnan ang [claude.com/pricing](https://claude.com/pricing).

## Mga Teknikal na Detalye

Ang natitira sa pahinang ito ay para sa mga teknikal na user at AI assistant: mga scope, iba pang paraan ng pagkonekta, at kung paano ito gumagana.

### Mga Scope {#scopes}

Nakikipag-usap ang Claude sa B1 sa pamamagitan ng **Model Context Protocol (MCP) server** na nakapaloob sa B1 API (`https://api.churchapps.org/mcp`). Dumadaan ang bawat tawag sa parehong auth, permission, at church-scoping rule gaya ng request mula sa B1 Admin. Limitado ang Claude sa **mga permiso at scope** ng API key, at hindi nito maaabot ang mga webhook, OAuth admin endpoint, o iba pang operator-only na landas.

Mga karaniwang panimulang set ng scope:

- **Read-only na assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Read + magdagdag ng note / task:** idagdag ang `people:write`
- **Buong operational assistant:** idagdag ang mga katugmang `:write` scope na gusto mo

Ang key na may `donations:read` ay nagpapahintulot sa Claude na magbuod ng giving pero hindi makapagtala ng regalo. Ang key na may `people:write` ay makapagdaragdag ng tao pero hindi makakakita ng donasyon. Tingnan ang [API Keys](/docs/developer/api/api-keys) para sa kung ano ang pinapayagan ng bawat scope.

### Iba pang paraan ng pagkonekta

#### Claude Code (CLI)

Sa terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Tapos na. Sa loob ng anumang Claude Code session, i-type ang `/mcp` para kumpirmahing konektado ang `b1` server, pagkatapos magtanong ng kahit anong gustong malaman tungkol sa iyong simbahan.

#### Claude Desktop -- manual na config (advanced)

Kung mas gusto mong huwag gamitin ang extension, i-edit ang config file ng Claude Desktop:

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

#### Claude.ai (web) -- Custom Connector

Tingnan ang **Opsyon 1** sa itaas. Gumagamit ang connector ng OAuth 2.1: nadidiskubre ng Claude ang authorization server ng B1 mula sa `https://api.churchapps.org/.well-known/oauth-protected-resource`, nagpaparehistro sa sarili gamit ang Dynamic Client Registration, at nag-sign in gamit ang PKCE. Sa Team at Enterprise plan, maaaring kailanganin ng may-ari na idagdag muna ang connector para sa organisasyon. Hindi humihiling ang Claude ng partikular na scope, kaya ang consent page ay nag-aalok ng lahat ng maaaring i-access ng naka-sign in na B1 account. Bawiin ito sa ilalim ng **Settings → Developer → Connected Apps** sa B1 Admin.

### Paano ito gumagana

Naglalantad ang B1 API ng iisang MCP endpoint sa `/mcp`. Kumokonekta rito ang Claude, nag-a-authenticate gamit ang iyong `cak_…` key, at nakakakuha ng access sa apat na tool:

| Tool | Ano ang ginagawa nito |
|---|---|
| `list_endpoints` | Inililista ang mga REST endpoint na maaaring tawagan ng Claude, na maaaring i-filter ayon sa path. Ginagamit para sa discovery. |
| `describe_endpoint` | Nagbabalik ng maikling buod at halimbawang request/response para sa partikular na endpoint. |
| `api_call` | Aktwal na tinatawag ang isang REST endpoint bilang naka-authenticate na user. |
| `describe_page_builder` | Isang gabay sa paggawa at pag-e-edit ng mga pahina ng website ng iyong simbahan, na binabasa ng Claude bago gumawa sa nilalaman ng website. |

Ito ang parehong `/membership/people`, `/giving/donations`, `/attendance/visits` at iba pang surface na ginagamit ng B1 Admin -- lahat ng authorization rule ay nalalapat nang pareho. Nakalista sa ilalim ng `/lessons/*` ang mga FreePlay (lessons.church) endpoint; ipinapasa ang mga tawag ng Claude sa kanila sa FreePlay bilang parehong user, na may parehong permiso.

### Kaligtasan at mga limitasyon

- **Paghihiwalay bawat simbahan.** Iisang simbahan ang tinutukoy ng API key. Walang paraan ang Claude para makita ang datos ng ibang simbahan.
- **Nakabatay sa permiso.** Kung aalisin mo ang isang permiso sa taong gumawa ng key sa B1Admin, mawawala ito sa Claude sa susunod nitong tawag -- agad.
- **Maaaring bawiin.** Burahin ang key sa **Settings → Developer → API Keys** at agad magwawakas ang access ng Claude.
- **Blocklist.** Hindi maaaring tawagin sa pamamagitan ng MCP ang mga provider webhook, OAuth client admin endpoint, at ang operator-only na `apiEmails` route.
- **Limitasyon sa laki ng response.** Ang iisang tool response ay limitado sa 64 KB para hindi masira ang context ng Claude sa mahahabang listahan -- pipiliin ng Claude ang mas makitid na query gamit ang mga filter kapag nangyari ito.
- **Audit trail.** Dumadaan sa parehong audit log ng mga aksyon sa B1Admin ang mga pagbabago; maaari mo itong suriin sa ilalim ng **Settings → Audit Log**.

### Pag-troubleshoot

**Humihingi ang Claude ng B1 email at password para gamitin ang FreePlay:** mayroon kang bersyon 1.1.0 ng desktop extension. I-download at i-install ulit ito para mag-update -- ang mas bagong bersyon ay gumagamit lang ng iyong key.

**Nag-uulat ang Claude ng "Unauthorized" o 401:** nawawala, sira, o nabawi na ang bearer token. Kung gumamit ka ng extension, buksan ang **Settings → Extensions → B1 (ChurchApps)** sa Claude at i-paste ulit ang key. Kung hindi, suriin muli ang `Authorization: Bearer cak_…` header (bigyang pansin ang espasyo at ang literal na `Bearer`).

**Nagbabalik ng 403 ang isang tool call:** walang scope ang API key para sa endpoint na iyon. Idagdag ang scope sa **Settings → Developer → API Keys** (kailangan mong gumawa ng bagong key -- hindi mababago ang mga scope sa mismong key) at i-paste ang bagong key sa settings ng extension o sa config ng Claude.

**Hindi mahanap ng Claude ang isang endpoint:** hilingin dito na tawagan ang `list_endpoints` na may filter, halimbawa *"use list_endpoints with filter 'donations' to find the right path"*. Ang route inventory ay ginawa mula sa live API, kaya nandoon ang anumang maaabot mo gamit ang `curl`.

**Lokal na development:** palitan ang `https://api.churchapps.org/mcp` ng `http://localhost:8084/mcp` -- pareho ang auth, pareho ang mga tool.

## Kaugnay

- [API Keys](/docs/developer/api/api-keys) -- kumpletong sanggunian ng scope
- [MCP Server (developer reference)](/docs/developer/api/mcp) -- mga detalye ng protocol at schema ng tool
- [ChatGPT](./chatgpt) -- parehong ideya, para sa mga modelo ng OpenAI
