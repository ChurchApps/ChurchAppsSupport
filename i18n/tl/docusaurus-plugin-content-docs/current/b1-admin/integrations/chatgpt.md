---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Ikonekta ang ChatGPT ng OpenAI sa data ng B1 ng inyong parokya upang maaari ninyong itanong ang mga tanong tulad ng "sino ang hindi na umugnayan sa isang grupo sa quarter na ito?" o "ibuod ang pagbibigay para sa building fund sa buwan na ito" at magpatakbo ng ChatGPT upang direktang kunin ang mga sagot mula sa B1. Dalawang mga pathway ay sinusuportahan: isang **Custom GPT** na gumagana sa anumang ChatGPT Plus plan, at ang **MCP server** para sa developer tooling na sumusuporta dito.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang administrator ng parokya na may **Edit Settings** permission (upang makabuo ng isang API key)
- Isang **ChatGPT Plus, Pro, Team, o Enterprise** account (ang free tier ay hindi maaaring gumamit ng Custom GPTs o Connectors)
- Ang buong URL ng inyong B1 API — karaniwang `https://api.churchapps.org` para sa mga hosted na parokya, o ang inyong self-hosted Api host

</div>

## Piliin ang Tamang Pathway

| Pathway | Plan needed | Effort | Ano ang makukuha ninyo |
|---|---|---|---|
| **Custom GPT na may Actions** | ChatGPT Plus / Team / Enterprise | 10 minuto | Isang shareable GPT na tumatawag sa B1's REST API para sa sinumang miyembro ng koponan na gamitin |
| **MCP via OpenAI tooling** | Developer / Agent SDK / Pro Connectors | Marami pa | Kabuuang discovery sa pamamagitan ng MCP server, angkop sa coding tools at agent platforms |

Para sa karamihan ng mga parokya ang **Custom GPT** pathway ay ang tamang sagot — ito ay hindi nangangailangan ng developer setup, gumagana sa loob ng regular na ChatGPT app at mobile clients, at maaaring ibahagi sa inyong koponan. Ang MCP pathway ay inilalarawan sa ibaba para sa technical staff na gumagamit ng OpenAI's developer tools o agent platforms.

## Pathway A — Custom GPT na may Actions

Ito ay direktang nag-wire ng ChatGPT sa B1 REST API. Ang inyong Custom GPT ay magiging handa na magbasa at (opsyonal) magsulat ng mga record ng B1 sa pangalan ng sinumang gumagamit nito.

### 1. Lumikha ng isang API key

1. Sa B1Admin magpunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**, bigyan ito ng pangalan na `ChatGPT`, at pumili ng mga scope. Ang karaniwang starter sets:
   - **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Read + write:** idagdag ang matching `:write` scopes
3. I-save at kopyahin ang buong `cak_…` key.

Tingnan ang [API Keys](/docs/developer/api/api-keys) para sa buong listahan ng scope.

### 2. Bumuo ng Custom GPT

1. Sa ChatGPT, i-click ang inyong profile → **My GPTs** → **Create a GPT**.
2. Lumipat sa **Configure** tab at bigyan ng pangalan ang GPT (e.g. "B1 Assistant") at mga instruksyon tulad ng:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. I-scroll sa **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** `cak_<prefix>.<secret>`
   - **Auth Type:** Bearer
   - I-save.
4. Sa **Schema** box, mag-paste ng minimal OpenAPI spec na naglalarawan sa mga endpoint na gusto ninyong gamitin ng GPT. Isang starter na sumasaklaw sa karamihan ng common reads:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

   Palawakin ang schema na may higit pang mga endpoint kung kinakailangan — bawat authenticated route sa B1 ay tumatanggap ng parehong `cak_…` key. Ang [REST API reference](/docs/developer/api/endpoints) ay naglalista ng kung ano ang available.

5. I-save ang action. Subukan ito gamit ang isang prompt tulad ng *"ilang tao ang nasa parokya?"* — ang ChatGPT ay tatawagin ang `listPeople` at sumagot.
6. **Publish** ang GPT (Only me / Anyone with link / Organization) at ibahagi sa inyong koponan.

### 3. Gamitin ito

Ang sinumang ibahagi ninyo sa GPT ay maaaring magtanong ng natural-language questions — ang ChatGPT ay pipili ng tamang action, tatawagin ang B1, at sumagot. Ang mga scope ng key ay patuloy na nalalagay: isang read-only key ay magsasawalat ng mga write anuman ang action na tinukoy sa schema.

## Pathway B — MCP via OpenAI tooling

Ang B1 API ay may kasamang MCP server sa `/mcp` na maaaring gamitin ng anumang MCP-aware OpenAI tool — halimbawa ang [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), ang Responses API's MCP tool, o third-party agent platforms na kumkonsumo ng MCP servers.

I-authenticate gamit ang parehong `cak_…` key sa `Authorization: Bearer` header. Tatlong mga kagamitan ay nakalantad: `list_endpoints`, `describe_endpoint`, at `api_call`. Tingnan ang [MCP Server developer reference](/docs/developer/api/mcp) para sa protocol, transport, at tool schemas.

Ang ChatGPT's built-in na "Connectors" (Pro/Business/Enterprise) ay kasalukuyang inaasahan ang mga MCP servers na may tiyak na `search` at `fetch` tool shapes at OAuth-based authentication, na hindi nag-aadvertise ng B1 MCP server. Para sa ChatGPT sa loob ng consumer app, ang Custom GPT pathway sa itaas ay ang praktikal na pagpipilian.

## Safety at Limits

- **Per-church isolation.** Ang API key ay nagresolba sa isang parokya. Ang ChatGPT ay hindi makikita ang data ng ibang mga parokya.
- **Permission-scoped.** Kung alisin ninyo ang isang pahintulot mula sa taong nag-mint ng key, ang ChatGPT ay mawawalan nito sa susunod na tawag — agad.
- **Revocable.** Tanggalin ang key sa **Settings → Developer → API Keys** at ang access ng ChatGPT ay nagtatapos kaagad.
- **Ang pagbabahagi ng Custom GPT ay nagbabahagi ng data.** Ang sinumang may access sa GPT ay maaaring magtanong nito ng mga tanong at makita ang kung ano ang ang key ay may mga scope para. Limitahan ang pagbabahagi sa staff na dapat makita ang data, at mas gusto ang mas maliit na mga scope (e.g. omit `donations:read` para sa isang GPT na ibinabahagi ng malawak).
- **Audit trail.** Ang mutations ay dumadaan sa parehong audit log bilang B1Admin actions; suriin ang mga ito sa ilalim ng **Reports → Audit Log**.

## Gastos

Ang ChurchApps ay libre at open-source — ang API na tinatawag ng inyong Custom GPT ay bahagi ng API na tumatakbo na sa inyong parokya. Ang OpenAI ay nag-charge para sa ChatGPT usage ayon sa kanilang mga plano. Walang per-call cost mula sa ChurchApps.

## Troubleshooting

**Action returns 401:** ang bearer header ay hindi natatakda nang tama. Sa action's authentication panel siguraduhing **Auth Type: Bearer** ay pinili at ang halaga ng key ay hindi nagsasama ng salitang `Bearer` (ang ChatGPT ay nag-prepend nito para sa inyo).

**Action returns 403:** ang key ay walang scope para sa endpoint na iyon. Magtayo ng bagong key na may tamang mga scope at i-update ang GPT.

**Ang ChatGPT ay tumatawag ng maling action:** patiguin ang `summary` at `description` fields sa inyong OpenAPI schema upang ang modelo ay pumili ng tamang isa. Ang pagdaragdag ng mga halimbawang query sa mga instruksyon ng GPT ay tumutulong din.

**Ang action panel ay tinatanggihan ang schema:** ang ChatGPT ay nangangailangan ng OpenAPI 3.1 na may hindi bababa sa isang `paths` entry at isang `servers` URL. I-validate ang YAML sa anumang online OpenAPI validator bago i-paste.

**Local development:** ituro ang action's `servers` URL sa inyong local Api (e.g. `http://localhost:8084`) — ngunit tandaan na ang mga aksyon ng ChatGPT ay lamang tumatawag sa mga public URL, kaya para sa local testing gumamit ng isang tunnel tulad ng `ngrok` o tuklasin ang API nang direkta gamit ang `curl` upang kumpirmahin ang key muna.

## Related

- [API Keys](/docs/developer/api/api-keys) — buong reference ng scope
- [MCP Server (developer reference)](/docs/developer/api/mcp) — mga detalye ng protocol at tool schemas
- [Claude](./claude) — parehong idea, para sa mga modelo ng Anthropic
- [REST API reference](/docs/developer/api/endpoints) — bawat endpoint na maaaring tukuyin ng Custom GPT action
