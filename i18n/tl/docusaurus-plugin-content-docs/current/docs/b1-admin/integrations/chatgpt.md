---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Ikonekta ang OpenAI's ChatGPT sa datos ng iyong simbahan sa B1 at hayaan itong gumawa ng mabigat na gawain. Kapag nakonekta na, ang ChatGPT ay maaaring makita ang iyong live church records at tumulong sa iyo na makamit ang mga bagay na kung hindi ay magsasagawa ng maraming hakbang sa B1 Admin -- o na hindi mo kahit man alam kung paano gawin.

**Ang mga bagay na maaari mong tanungin na gawin:**
- *"I-setup ang Sunday School classrooms at ilagay ang bawat guro sa tamang kuwarto batay sa kanilang grupo"*
- *"Ipakita sa akin ang lahat ng dumalo noong nakaraang linggo ngunit hindi pa na-assign sa isang small group"*
- *"I-summarize ang binibigay ng buwan na ito ayon sa fund"*
- *"Sino ang aming mga pinakabagong miyembro at nag-follow up na ba tayo sa kanila?"*
- *"Hindi ako nakakaintindi kung paano gumawa ng X sa B1 -- maaari mo bang gabayan ako o gawin ito para sa akin?"*

Ang ChatGPT ay kumukuha ng mga sagot at kumikilos nang direkta mula sa iyong B1 data, na-scope lamang sa iyong simbahan.

:::tip Recommended: Claude Code
Para sa pinakasmoothest na MCP experience, ang [Claude Code](./claude) ay ang inirerekomendang kliyente -- ang setup ay tumatagal ng isang command at ito ay gumagana out of the box. Ang ChatGPT ay gumagana rin at ay isang napakahusay na pagpipilian kung ang iyong team ay gumagamit na nito.
:::

Dalawang landas ay sinusuportahan: ang **MCP Connector** (built-in sa ChatGPT) at isang **Custom GPT** para sa mga team na nais ng shareable assistant.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Isang church admin na may **Edit Settings** permission sa B1 Admin (kailangan upang lumikha ng isang API key)
- Isang **ChatGPT Plus, Pro, Team, o Enterprise** account

</div>

## Quick Setup Guide

Sundin ang mga hakbang na ito sa **ChatGPT desktop app** (Mac/Windows). Ang mga screen ay maaaring mukhang kaunting naiiba sa ibang bersyon.

---

**Step 1 — Una ay kunin ang iyong API key mula sa B1 Admin**

Bago humawak ng ChatGPT, lumikha ng isang API key sa B1 Admin upang mayroon kang handa na i-paste:

1. Magpunta sa **Settings → Developer → API Keys** sa B1 Admin
2. I-click ang **New API Key**, pangalanan ito ng `ChatGPT`, pumili ng iyong mga scope (magsimula ng `people:read`, `groups:read`, `attendance:read`, `donations:read`), at i-click ang **Save**
3. Kopyahin ang `cak_…` key -- ito ay ipinakita lamang minsan

---

**Step 2 — I-click ang iyong pangalan sa tuktok na sulok ng ChatGPT**

![Click your profile name](/img/guides/chatgpt-mcp/01.png)

---

**Step 3 — I-click ang Settings**

![Click Settings from the menu](/img/guides/chatgpt-mcp/02.png)

---

**Step 4 — I-click ang Plugins sa left sidebar**

![Click Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Step 5 — I-click ang MCPs tab**

![Click the MCPs tab](/img/guides/chatgpt-mcp/04.png)

Makikita mo ang anumang MCP servers na mayroon ka nang idadagdag dito.

---

**Step 6 — I-click ang Add → Add MCP server**

![Click Add then Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Step 7 — Punan ang form at i-click ang Save**

![Connect to a custom MCP form](/img/guides/chatgpt-mcp/07.png)

I-click ang **Streamable HTTP**, pagkatapos punan ng:

| Field | What to enter |
|---|---|
| **Name** | `B1 Church` (o anumang pangalan na gusto mo) |
| **Type** | I-click ang **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Iwanan ang blank |
| **Headers** | I-click ang **+ Add header** → Key: `Authorization` → Value: tingnan sa ibaba |

![Filled in example showing Authorization in Key and Bearer key in Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` -- ang salitang Bearer, isang puwang, pagkatapos ang iyong key

I-click ang **Save**.

Iyan na! Bumalik sa isang chat at magtanong ng isang bagay tulad ng *"Ilang tao ang nasa aming simbahan?"* at ang ChatGPT ay i-pull ang sagot nang direkta mula sa B1.

---

## Step 1 — Lumikha ng isang API Key sa B1 Admin

Ang bawat koneksyon sa B1 ay gumagamit ng isang API key na iyong ginawa. Ang key na ito ay nag-identify sa iyong simbahan, kumokontrol sa kung ano ang makikita ng ChatGPT, at maaaring i-revoke anumang oras.

1. Buksan ang **B1 Admin** at magpunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**.
3. Bigyan ng pangalan ang key -- `ChatGPT` ay gumagana nang mabuti.
4. Pumili ng mga scope (mga pahintulot) na dapat magkaroon ang ChatGPT. Isang magandang nagsisimulang set para sa isang read-only assistant:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. I-click ang **Save**.
6. Kopyahin ang buong key na lilitaw -- ito ay nagsisimula sa `cak_` at ipinapakita **isang pagkakataon lamang**. I-paste ito sa isang ligtas na lugar.

:::tip
Kung kailangan mo na i-revoke ang access ng ChatGPT, bumalik sa **Settings → Developer → API Keys** at i-delete ang key. Ang access ay nagtatapos kaagad.
:::

---

## Path A — ChatGPT MCP Connector (Recommended)

Ito ay ang pinakamadaling paraan upang kumonekta. Ang ChatGPT ay may isang built-in na "Connect to a custom MCP" dialog na gumagana nang direkta sa B1's MCP server -- walang Custom GPT na kailangan.

### What you need

- Ang iyong `cak_…` key mula sa Step 1

### Buksan ang MCP connector sa ChatGPT

Sa ChatGPT, magpunta sa **Settings → Plugins → MCPs** at i-click ang **Add → Add MCP server**.

### Punan ang dialog

I-click ang **Streamable HTTP**, pagkatapos gamitin ang mga value na ito:

| Field | Value |
|---|---|
| **Name** | `B1 Church` (o anumang pangalan na gusto mo) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Iwanan ang blank |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_yourprefix.yoursecret` |

Para sa Value field, i-type ang salitang `Bearer`, isang puwang, pagkatapos i-paste ang iyong key -- lahat sa parehong kahon. Halimbawa: `Bearer cak_prefix.secret`.

I-click ang **Save**.

### Magtanong ng ChatGPT ng isang bagay

Kapag nakonekta na, magtanong lamang sa plain language -- walang kailangang mga special commands:

- *"Ilang tao ang nasa aming simbahan?"*
- *"Sino ang sumali sa nakaraang 30 araw?"*
- *"Anong mga grupo ang aktibo ngayon?"*
- *"I-summarize ang binibigay ng buwan na ito ayon sa fund."*

Ang ChatGPT ay tatawagin ang B1 sa likod ng mga eksena at sasagot mula sa iyong live data.

---

## Path B — Custom GPT na may mga Aksyon

Ang isang Custom GPT ay nagpapahintulot sa iyo na lumikha ng isang dedicated assistant na ang buong team ay maaaring ibahagi -- bumubukas sila ng isang link at nagsisimulang magtanong nang walang setup sa kanilang dulo. Ito ay nangangailangan ng isang ChatGPT Plus, Team, o Enterprise account at humigit-kumulang 10 minuto.

### 1. Lumikha ng isang API key

Sundin ang Step 1 sa itaas kung hindi mo pa ginawa.

### 2. Bumuo ng Custom GPT

1. Sa ChatGPT, i-click ang iyong profile → **My GPTs** → **Create a GPT**.
2. Lumipat sa **Configure** tab, bigyan ng pangalan ang GPT (hal. "B1 Assistant") at magdagdag ng mga tagubilin:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. I-scroll sa **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** i-paste ang iyong `cak_…` key
   - **Auth Type:** Bearer
   - I-save.

4. Sa **Schema** box, i-paste ang starter OpenAPI spec na ito:

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

5. I-save ang aksyon. I-test ito: *"ilang tao ang nasa simbahan?"* -- Ang ChatGPT ay tumatawag ng `listPeople` at sumasagot.
6. **I-publish** ang GPT (Ako lamang / Sinuman na may link / Organization) at ibahagi ang link sa iyong team.

### 3. Gamitin ito

Sinuman na may link ay maaaring magtanong ng natural-language questions. Ang mga scope ng key ay patuloy na naaaplay -- isang read-only key ay tumutanggi ng writes anuman ang sinabi ng action schema.

---

## Safety at Limits

- **Per-church isolation.** Ang API key ay nalulutas sa isang simbahan lamang. Ang ChatGPT ay hindi makikita ang data ng ibang mga simbahan.
- **Permission-scoped.** Ang key ay dala lamang ang mga scope na iyong ibinigay. Ang pag-aalis ng isang scope (sa pamamagitan ng pag-delete at paglikha ulit ng key) ay pumupuksa ang access sa susunod na tawag.
- **Revocable nang kaagad.** I-delete ang key sa **Settings → Developer → API Keys** at ang access ay nagtatapos kaagad.
- **Ang pagbabahagi ng Custom GPT ay nagbabahagi ng data.** Ang lahat na may access sa GPT ay maaaring makita ang sinuman ay ang mga key's scopes ay nagbibigay-daan. Mas gusto ang mas maliit na mga scope (hal. isama ang `donations:read`) para sa mga GPTs na ibinabahagi nang malawak.
- **Audit trail.** Ang anumang pagbabago na ginawa sa pamamagitan ng ChatGPT ay dumadaan sa parehong audit log tulad ng B1 Admin actions -- hanapin ang mga ito sa ilalim ng **Reports → Audit Log**.

## Cost

Ang ChurchApps ay libre at open-source -- ang API na tinatawagan ng ChatGPT ay bahagi ng kung ano ang iyong simbahan na gumagana na. Ang OpenAI ay nag-charge para sa ChatGPT usage ayon sa kanilang sariling mga plano. Walang per-call cost mula sa ChurchApps.

## Troubleshooting

**Ang MCP connector ay nagsasabi ng "Unauthorized" o nagpapakita ng 401 error:** ang iyong API key ay nawawala o hindi tama. Buksan ang connector settings at suriin na ang key sa `Authorization:Bearer` argument ay ang buong `cak_…` value na walang dagdag na puwang.

**Ang ChatGPT ay nagsasabi na hindi nito makikita ang ilang data:** ang key ay maaaring walang tamang mga scope. Lumikha ng isang bagong key sa **Settings → Developer → API Keys** na may karagdagang mga scope at i-update ang connector.

**Ang `npx` command ay nababigo:** ang Node.js ay maaaring hindi na-install. I-download at i-install ito mula sa [nodejs.org](https://nodejs.org), pagkatapos ay subukan ang pag-save ng connector ulit.

**Ang Custom GPT action ay nagbabalik ng 401:** sa action's authentication panel kumpirmahin na ang **Auth Type: Bearer** ay pinili at ang key ay hindi kasama ang salitang `Bearer` (awtomatikong dinagdag ng ChatGPT).

**Ang Custom GPT action ay nagbabalik ng 403:** ang key ay walang scope para sa endpoint na iyon. Lumikha ng isang bagong key na may tamang mga scope at i-update ang GPT.

**Ang action schema ay tinatanggap:** ang ChatGPT ay nangangailangan ng OpenAPI 3.1 na may hindi bababa sa isang `paths` entry at isang `servers` URL. I-validate ang YAML sa [editor.swagger.io](https://editor.swagger.io) bago i-paste.

## Related

- [API Keys](/docs/developer/api/api-keys) -- buong scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) -- protocol details at tool schemas
- [Claude](./claude) -- parehong ideya, para sa Anthropic's models
- [REST API reference](/docs/developer/api/endpoints) -- bawat endpoint na ang isang Custom GPT action ay maaaring tawagin
