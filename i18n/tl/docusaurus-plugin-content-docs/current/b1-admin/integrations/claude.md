---
title: "Claude"
---

# Claude

<div class="article-intro">

Konektahan ang Anthropic's Claude sa iyong church's B1 data. Sa isang API key at ilang minuto ng setup, maaari kang magtanong sa Claude ng mga katanungan tulad ng "ilang first-time visitors ang dumating noong Linggo?" o "mag-draft ng thank-you email sa mga taong nag-donate sa building fund ngayong buwan" — at si Claude ay basahin ang mga sagot direkta mula sa iyong church's records, na limitado sa iyong mga permiso.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang church admin na may **Edit Settings** permission (upang lumikha ng isang API key)
- Isa sa: **Claude Code** (CLI / IDE extension), **Claude Desktop** (Mac/Windows), o isang **Claude Pro/Max/Team** account
- Ang buong URL ng iyong B1 API — karaniwang `https://api.churchapps.org` para sa hosted churches, o ang iyong self-hosted Api host

</div>

## Ano ang Makikita ng Claude

Nagsasalita ang Claude sa B1 sa pamamagitan ng **Model Context Protocol (MCP) server** na itinayo sa B1 API. Bawat tawag na ginagawa ng Claude ay tumatakbo sa pamamagitan ng parehong auth, permission, at church-scoping rules tulad ng isang request mula sa B1Admin — ibig sabihin:

- Nakikita lamang ng Claude ang data para sa **iyong** church
- Limitado sa anumang **permissions at scopes** na dala ng API key na ibinigay mo
- Hindi maabot ang webhooks, OAuth admin endpoints, o iba pang operator-only paths (ang mga ito ay blocklisted)

Ang isang `donations:read` key ay nagbibigay-daan sa Claude na i-summarize ang giving ngunit hindi maaaring mag-record ng gift. Ang isang `people:write` key ay maaaring magdagdag ng isang person ngunit hindi makikita ang donations. Piliin ang mga scopes na tumutugon sa trabaho.

## Setup

### 1. Lumikha ng isang API key

1. Sa B1Admin pumunta sa **Settings → Developer → API Keys**.
2. Mag-click ng **New API Key**, pangalanan ito `Claude`, at piliin ang mga scopes na dapat mayroon ang Claude. Mga karaniwang starter sets:
   - **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Read + add notes / tasks:** idagdag `people:write`
   - **Full operational assistant:** idagdag ang matching `:write` scopes na gusto mo
3. I-save. Ang buong `cak_…` key ay ipakita **minsan** lamang — kopyahin ito.

Tingnan ang [API Keys](/docs/developer/api/api-keys) para sa kung ano ang binibigyan-daan ng bawat scope.

### 2. Konektahan ang Claude

Piliin ang Claude client na ginagamit mo:

#### Claude Code (CLI)

Sa isang terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Yan na. Sa loob ng anumang Claude Code session, mag-type ng `/mcp` upang kumpirmahin na ang `b1` server ay konektado, pagkatapos itanong sa Claude ang anumang katanungan tungkol sa iyong church.

#### Claude Desktop

I-edit ang Claude Desktop's config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Magdagdag ng `b1` server entry. Ang mas bagong versions ng Claude Desktop ay nagsasalita ng HTTP MCP nang likas:

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

Kung ang iyong Claude Desktop version ay sumusuporta lamang sa stdio servers, mag-bridge sa pamamagitan ng `mcp-remote`:

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

I-restart ang Claude Desktop. Ang connector icon sa chat composer ay ipapakita `b1` kasama ang tatlong tools (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Custom Connector

Ang Claude.ai's "Add custom connector" feature ay nangangailangan ng OAuth, na hindi sinusuportahan ng B1 MCP server ngayon. Gamitin ang Claude Code o Claude Desktop sa halip.

### 3. Magtanong sa Claude ng isang bagay

Kapag nakonekta na, walang espesyal na syntax ang kailangan — ang Claude ay tuklasin kung ano ang available sa tulong ng real-time. Mga halimbawa:

- *"Ilang tao ang nasa aking church at ano ang mga active groups?"*
- *"I-summarize ang donations ngayong buwan ayon sa fund."*
- *"I-list ang mga taong dumalo sa 10am service noong nakaraang Linggo ngunit hindi napunta sa isang Wednesday group sa nakaraang 60 araw."*
- *"Mag-draft ng welcome email para sa apat na taong naidagdag ngayong linggo, addressed by first name."*

Sa likod ng eksena, tatawagin ng Claude ang MCP tools — una upang tuklasin ang tamang endpoint, pagkatapos upang makuha ang data — at sumagot sa plain language.

## Paano Ito Gumagana

Ang B1 API ay naglalantad ng isang solong MCP endpoint sa `/mcp`. Kumokonekta ang Claude dito, nag-authenticate gamit ang iyong `cak_…` key, at nakakakuha ng access sa tatlong tools:

| Tool | Ano ang ginagawa |
|---|---|
| `list_endpoints` | Naglilista ng REST endpoints na maaaring tawarang ng Claude, filterable ayon sa path. Ginagamit para sa discovery. |
| `describe_endpoint` | Nagbabalik ng isang maikling summary at isang halimbawang request/response para sa isang specific endpoint. |
| `api_call` | Aktwal na nag-invoke ng isang REST endpoint bilang ang naka-authenticate na user. |

Ito ang parehong `/membership/people`, `/giving/donations`, `/attendance/visits` atbp. surface na ginagamit ng iyong B1Admin — bawat authorization rule ay naaaplay ng pareho.

## Kaligtasan at Mga Limitasyon

- **Per-church isolation.** Ang API key ay nalulutas sa isang church. Walang paraan para makita ng Claude ang data ng ibang churches.
- **Permission-scoped.** Kung buburahin mo ang isang permission mula sa taong lumikha ng key sa B1Admin, mawawalan ang Claude nito sa susunod na tawag — kaagad.
- **Revocable.** Tanggalin ang key sa **Settings → Developer → API Keys** at ang access ng Claude ay matatapos kaagad.
- **Blocklist.** Ang provider webhooks, OAuth client admin endpoints, at ang operator-only `apiEmails` route ay hindi maaaring tawarang sa pamamagitan ng MCP.
- **Response size cap.** Ang isang solong tool response ay limitado sa 64 KB upang ang malalaking listas ay hindi makasira ng Claude's context — si Claude ay magpapaliit ng query gamit ang filters kapag nangyari ito.
- **Audit trail.** Ang mutations ay dumadaan sa parehong audit log tulad ng B1Admin actions; maaari mong suriin ang mga ito sa **Reports → Audit Log**.

## Halaga

Ang ChurchApps ay libre at open-source — ang MCP server ay bahagi ng API na na-run na ng iyong church. Ang Anthropic ay nag-charge para sa Claude usage ayon sa kanilang mga plano. Walang per-call cost mula sa ChurchApps.

## Troubleshooting

**Ang Claude ay nag-report ng "Unauthorized" o 401:** ang bearer token ay nawawala, malformed, o ang key ay na-revoke. Muling suriin ang `Authorization: Bearer cak_…` header (tandaan ang space at ang literal `Bearer`).

**Ang tool call ay nagbabalik ng 403:** ang API key ay walang scope para sa endpoint na iyon. Idagdag ang scope sa **Settings → Developer → API Keys** (kailangan mong lumikha ng bagong key — ang mga scopes ay hindi maaaring baguhin sa lugar) at i-update ang Claude's config.

**Ang Claude ay hindi mahanap ang endpoint:** ibigay ito upang tawarang `list_endpoints` na may filter, hal. *"gamitin ang list_endpoints na may filter 'donations' upang mahanap ang tamang path"*. Ang route inventory ay nabuo mula sa live API, kaya ang anumang maaari mong tawarang gamit ang `curl` ay nandoon.

**Local development:** baguhin ang `https://api.churchapps.org/mcp` para sa `http://localhost:8084/mcp` — parehong auth, parehong tools.

## Kaugnay

- [API Keys](/docs/developer/api/api-keys) — buong scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details at tool schemas
- [ChatGPT](./chatgpt) — parehong ideya, para sa OpenAI's models
