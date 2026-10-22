---
title: "Claude"
---

# Claude

<div class="article-intro">

Magtanong kay Claude tungkol sa iyong church gamit ang plain English at sasagot ito mula sa iyong B1 data. Mga tanong tulad ng *"ilang first-time visitors ang dumating noong Linggo?"* o *"sino ang sumali sa isang small group ngayong buwan?"* — o hilingin na gumawa ito ng mga bagay, tulad ng *"magdagdag ng bagong page sa aming website na tinatawag na Events."* Ang setup ay tumatagal ng wala pang 3 minuto at hindi mo kailangan ng anumang technical skills o software na i-install.

</div>

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- **Isang Claude account.** **Gumagana ang free plan** — magandang paraan para subukan ito. Pero may daily message limit ang free accounts, at mabilis gumamit ng messages ang paghahanap sa B1, kaya kung regular mo itong gagamitin, inirerekomenda namin ang **Claude Pro** (mga $20/month).
- **Ang iyong B1 login** — ang parehong ginagamit mo para sa B1 Admin.

</div>

:::tip Inirerekomenda — libreng subukan
Ang Claude ang pinakamadaling paraan para ikonekta ang B1 sa AI, at gumagana ito sa **free plan** ng Claude — perpektong paraan para subukan ito ng iyong church bago magbayad ng kahit ano.
:::

May dalawang paraan para kumonekta. **Ang Option 1 ang pinakamadali** — walang key at walang kailangang i-install.

## Option 1 — Mag-sign in gamit ang B1 (pinakamadali)

Gumagana ito sa Claude website, sa Claude desktop app, at sa Claude phone app — i-set up ito nang isang beses at nasa lahat na ito.

### Step 1 — Buksan ang connector settings ng Claude

1. Pumunta sa [claude.ai](https://claude.ai) at mag-sign in (o gumawa ng libreng account).
2. I-click ang iyong pangalan sa kaliwang ibabang sulok, pagkatapos ay **Settings** (Mga Setting) → **Connectors** (Mga Connector).

### Step 2 — Idagdag ang B1

1. I-click ang **Add** (Idagdag), pagkatapos ay **Add custom connector** (Magdagdag ng custom connector).
2. **Name** (Pangalan): i-type ang `B1`.
3. **URL:** i-paste ang `https://api.churchapps.org/mcp`
4. Iwanan ang ibang options gaya ng dati at i-click ang **Add** (Idagdag).

### Step 3 — Mag-sign in sa B1

1. I-click ang **Connect** (Kumonekta). Magbubukas ang isang B1 sign-in page.
2. Mag-log in gamit ang iyong B1 account. Kung kabilang ka sa higit sa isang church, tingnan kung ang tamang church ang nakapakita sa itaas.
3. Inililista ng B1 kung ano ang hinihinging gawin ni Claude at kinukumpirma nito na ibabalik ka sa **claude.ai**. I-click ang **Allow** (Payagan).

Nakabalik ka na sa Claude, at nakapakitang connected na ang B1.

### Step 4 — Magtanong ng kahit ano

Magsimula ng **bagong chat** at subukan:

- *"Ilang tao ang nasa aming church?"*
- *"I-list ang aming mga active groups."*
- *"I-summarize ang giving ngayong buwan ayon sa fund."*
- *"Sino ang sumali sa church sa nakaraang 30 araw?"*

Sa unang beses, hihingi ng permission si Claude na gamitin ang B1 — i-click ang **Allow**.

## Option 2 — Desktop extension na may B1 key

Gamitin ito kung mas gusto mong bigyan si Claude ng key na may limitadong permissions (halimbawa, tumingin lang). Gumagana ito sa Claude desktop app para sa Mac o Windows, at kailangan mo ng permission na mag-manage ng church settings sa B1 para gumawa ng key.

### Step 1 — Kunin ang Claude app

I-download ang Claude app mula sa [claude.com/download](https://claude.com/download), i-install ito, buksan, at mag-sign in.

### Step 2 — Gumawa ng iyong B1 key

Ang key ang nagpapapasok kay Claude sa B1 ng *iyong* church — isipin itong parang password na para lang kay Claude.

1. Mag-log in sa [B1 Admin](https://admin.b1.church) at pumunta sa [Settings → Developer](https://admin.b1.church/settings/developer).
2. Sa **API Keys** tab, i-click ang **New API Key**.
3. **Name:** i-type ang `Claude`.
4. **Scopes:** i-check kung ano ang puwedeng gawin ni Claude. Bawat area ay may **read** box (tumingin lang) at **write** box (gumawa ng mga pagbabago). Hindi sigurado? I-check lang muna ang mga **read** box — puwede kang gumawa ng bagong key na may mas maraming access mamaya.
5. I-click ang **Save**, pagkatapos ay i-**Copy** ang key. Isang beses lang ito ipinapakita, kaya dumiretso agad sa Step 3.

### Step 3 — Idagdag ang B1 kay Claude

1. [I-download ang B1 extension](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. Mag-**double-click** sa na-download na file (`b1-churchapps.mcpb`). Magbubukas ang Claude at ipapakita ang **B1 (ChurchApps)**.
3. I-click ang **Install**.
4. Kapag hiningi ang iyong **B1 API key**, i-paste ang key mula sa Step 2 at i-save.
5. **Isara nang tuluyan ang Claude** (Mac: **Cmd+Q** · Windows: i-right-click ang Claude icon sa taskbar → **Quit**) at buksan itong muli.

Kung hindi nabubuksan ng double-click ang Claude, pumunta sa **Settings → Extensions → Advanced settings → Install Extension…** sa Claude at piliin ang na-download na file. Pagkatapos ay magsimula ng bagong chat at magtanong ng kahit ano.

## Ligtas Ba Ito?

- Ang data lang ng **iyong church** ang nakikita ni Claude.
- **Naka-sign in (Option 1):** Hindi kailanman makakagawa si Claude ng higit pa sa kaya ng sarili mong B1 login. Inililista ng B1 sign-in page ang lahat ng puwedeng gawin ni Claude bago mo i-click ang **Allow** (Payagan).
- **May key (Option 2):** Ang kaya lang gawin ni Claude ay kung ano ang pinapayagan ng key — ang key na **read** boxes lang ang naka-check ay puwedeng tumingin pero hindi kailanman makakapagbago ng anuman.
- **Para i-off ito:** sa B1 Admin, pumunta sa **Settings → Developer** at i-revoke ang app sa ilalim ng **Connected Apps** (Option 1) o burahin ang key sa ilalim ng **API Keys** (Option 2). Titigil agad ang access. Puwede mo ring i-click ang **Disconnect** (Idiskonekta) sa B1 connector sa Claude.

## Magkano Ito?

Libre ang B1 connection — bahagi ito ng ChurchApps. May free plan ang Claude mismo; ang Claude Pro (mga $20/month) ay nagbibigay sa iyo ng mas maraming paggamit. Tingnan ang [claude.com/pricing](https://claude.com/pricing).

## Technical Details

Ang natitirang bahagi ng page na ito ay para sa mga technical users at AI assistants: scopes, iba pang paraan para kumonekta, at kung paano ito gumagana.

### Scopes

Nakikipag-usap si Claude sa B1 sa pamamagitan ng **Model Context Protocol (MCP) server** na naka-built in sa B1 API (`https://api.churchapps.org/mcp`). Bawat tawag ay dumadaan sa parehong auth, permission, at church-scoping rules tulad ng isang request mula sa B1 Admin. Limitado si Claude sa **permissions at scopes** ng API key, at hindi nito maaabot ang webhooks, OAuth admin endpoints, o iba pang operator-only paths.

Mga karaniwang starter scope sets:

- **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Read + add notes / tasks:** idagdag ang `people:write`
- **Full operational assistant:** idagdag ang mga katugmang `:write` scopes na gusto mo

Ang isang `donations:read` key ay nagbibigay-daan kay Claude na i-summarize ang giving pero hindi makakapag-record ng gift. Ang isang `people:write` key ay puwedeng magdagdag ng person pero hindi makikita ang donations. Tingnan ang [API Keys](/docs/developer/api/api-keys) para sa kung ano ang pinapayagan ng bawat scope.

### Iba pang paraan para kumonekta

#### Claude Code (CLI)

Sa isang terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Yan na. Sa loob ng anumang Claude Code session, i-type ang `/mcp` para kumpirmahin na konektado ang `b1` server, pagkatapos ay itanong kay Claude ang anumang tanong tungkol sa iyong church.

#### Claude Desktop — manual config (advanced)

Kung ayaw mong gamitin ang extension, i-edit ang config file ng Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Magdagdag ng `b1` server entry na nagbi-bridge sa B1 sa pamamagitan ng `mcp-remote` (nangangailangan ng [Node.js](https://nodejs.org)):

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

I-restart ang Claude Desktop. Ipapakita ng connector menu sa chat composer ang `b1` kasama ang mga tools nito.

#### Claude.ai (web) — Custom Connector

Tingnan ang **Option 1** sa itaas. Gumagamit ang connector ng OAuth 2.1: dinidiskubre ni Claude ang authorization server ng B1 mula sa `https://api.churchapps.org/.well-known/oauth-protected-resource`, nirerehistro nito ang sarili gamit ang Dynamic Client Registration, at nagsa-sign in ito gamit ang PKCE. Sa Team at Enterprise plans, maaaring kailanganin munang idagdag ng isang owner ang connector para sa organization. Hindi humihingi si Claude ng partikular na scopes, kaya iniaalok ng consent page ang lahat ng kayang i-access ng naka-sign in na B1 account. I-revoke ito sa ilalim ng **Settings → Developer → Connected Apps** sa B1 Admin.

### Paano ito gumagana

Ang B1 API ay naglalantad ng iisang MCP endpoint sa `/mcp`. Kumokonekta si Claude dito, nag-a-authenticate gamit ang iyong `cak_…` key, at nakakakuha ng access sa apat na tools:

| Tool | Ano ang ginagawa |
|---|---|
| `list_endpoints` | Naglilista ng REST endpoints na puwedeng tawagin ni Claude, filterable ayon sa path. Ginagamit para sa discovery. |
| `describe_endpoint` | Nagbabalik ng maikling summary at halimbawang request/response para sa isang specific endpoint. |
| `api_call` | Aktwal na nag-i-invoke ng isang REST endpoint bilang ang naka-authenticate na user. |
| `describe_page_builder` | Isang gabay sa pagbuo at pag-edit ng mga page ng website ng iyong church, na binabasa ni Claude bago magtrabaho sa website content. |

Ito ang parehong `/membership/people`, `/giving/donations`, `/attendance/visits` atbp. na surface na ginagamit ng iyong B1Admin — bawat authorization rule ay naa-apply nang pareho.

### Kaligtasan at mga limitasyon

- **Per-church isolation.** Ang API key ay tumutukoy sa iisang church. Walang paraan si Claude para makita ang data ng ibang churches.
- **Permission-scoped.** Kung tatanggalin mo ang isang permission mula sa taong gumawa ng key sa B1Admin, mawawala ito kay Claude sa susunod na tawag — kaagad.
- **Revocable.** Burahin ang key sa **Settings → Developer → API Keys** at matatapos kaagad ang access ni Claude.
- **Blocklist.** Ang provider webhooks, OAuth client admin endpoints, at ang operator-only `apiEmails` route ay hindi matatawag sa pamamagitan ng MCP.
- **Response size cap.** Ang isang tool response ay limitado sa 64 KB para hindi mapuno ng mahahabang listahan ang context ni Claude — paliliitin ni Claude ang query gamit ang filters kapag nangyari ito.
- **Audit trail.** Ang mutations ay dumadaan sa parehong audit log tulad ng B1Admin actions; puwede mong suriin ang mga ito sa ilalim ng **Settings → Audit Log**.

### Troubleshooting

**Nag-report si Claude ng "Unauthorized" o 401:** nawawala, malformed, o na-revoke na ang bearer token o key. Kung ginamit mo ang extension, buksan ang **Settings → Extensions → B1 (ChurchApps)** sa Claude at i-paste muli ang key. Kung hindi, muling suriin ang `Authorization: Bearer cak_…` header (tandaan ang space at ang literal na `Bearer`).

**Nagbabalik ng 403 ang isang tool call:** walang scope ang API key para sa endpoint na iyon. Idagdag ang scope sa **Settings → Developer → API Keys** (kailangan mong gumawa ng bagong key — hindi puwedeng baguhin ang scopes sa lugar) at i-paste ang bagong key sa settings ng extension o sa config ni Claude.

**Hindi mahanap ni Claude ang isang endpoint:** hilingin dito na tawagin ang `list_endpoints` na may filter, hal. *"gamitin ang list_endpoints na may filter na 'donations' para mahanap ang tamang path"*. Ang route inventory ay nabuo mula sa live API, kaya nandoon ang anumang maaabot mo gamit ang `curl`.

**Local development:** palitan ang `https://api.churchapps.org/mcp` ng `http://localhost:8084/mcp` — parehong auth, parehong tools.

## Kaugnay

- [API Keys](/docs/developer/api/api-keys) — buong scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details at tool schemas
- [ChatGPT](./chatgpt) — parehong ideya, para sa models ng OpenAI
