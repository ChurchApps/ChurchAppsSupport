---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Ikonekta ang ChatGPT sa B1 data ng iyong church at tanungin ito gamit ang plain English — sasagot ito mula sa iyong live church records. Puwede mo rin itong hilingin na tumulong sa mga bagay na aabutin ng maraming hakbang sa B1 Admin.

**Ilang bagay na puwede mong itanong:**
- *"Ipakita sa akin ang lahat ng dumalo noong nakaraang linggo pero hindi pa naka-assign sa isang small group"*
- *"I-summarize ang giving ngayong buwan ayon sa fund"*
- *"Sino ang aming mga pinakabagong members at na-follow up na ba namin sila?"*
- *"Hindi ko maintindihan kung paano gawin ang X sa B1 — puwede mo ba akong gabayan?"*

</div>

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- **Ang ChatGPT desktop app** para sa Mac o Windows
- **Isang bayad na ChatGPT plan** (Plus o mas mataas). Hindi makakakonekta sa B1 ang mga libreng ChatGPT account.
- **Ang iyong B1 login** na may permission na mag-manage ng church settings (kailangan para gumawa ng key). Wala ka nito? Magtanong sa B1 administrator ng iyong church.

</div>

:::tip Inirerekomenda: subukan muna ang Claude — libre ito
Ang [Claude](./claude) ay kumokonekta sa B1 sa **free plan** nito at nase-set up sa wala pang 3 minuto — idagdag lang ang B1 bilang connector at mag-sign in gamit ang iyong B1 account. Hindi kailangan ng key. Ito ang pinakamadaling paraan para masubukan ng iyong church ang AI kasama ang B1 bago magbayad ng kahit ano.
:::

## I-set Up Ito

Maaaring bahagyang iba ang hitsura ng mga screen sa iyong bersyon ng ChatGPT.

---

**Step 1 — Gumawa ng iyong B1 key**

Ang key ang nagpapapasok sa ChatGPT sa B1 ng *iyong* church — isipin itong parang password na para lang sa ChatGPT.

1. Mag-log in sa [B1 Admin](https://admin.b1.church) at pumunta sa [Settings → Developer](https://admin.b1.church/settings/developer).
2. Sa **API Keys** tab, i-click ang **New API Key** at pangalanan itong `ChatGPT`.
3. **Scopes:** i-check kung ano ang puwedeng gawin ng ChatGPT. Bawat area ay may **read** box (tumingin lang) at **write** box (gumawa ng mga pagbabago). Hindi sigurado? I-check lang muna ang mga **read** box.
4. I-click ang **Save**, pagkatapos ay i-**Copy** ang key (nagsisimula ito sa `cak_`). Isang beses lang ito ipinapakita.

---

**Step 2 — I-click ang iyong pangalan sa ibabang kaliwang sulok ng ChatGPT**

![I-click ang iyong profile name](/img/guides/chatgpt-mcp/01.png)

---

**Step 3 — I-click ang Settings**

![I-click ang Settings mula sa menu](/img/guides/chatgpt-mcp/02.png)

---

**Step 4 — I-click ang Plugins sa kaliwang sidebar**

![I-click ang Plugins sa ilalim ng Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Step 5 — I-click ang MCPs tab**

![I-click ang MCPs tab](/img/guides/chatgpt-mcp/04.png)

Makikita mo rito ang anumang MCP servers na naidagdag mo na.

---

**Step 6 — I-click ang Add → Add MCP server**

![I-click ang Add pagkatapos ay Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Step 7 — Punan ang form at i-click ang Save**

![Connect to a custom MCP form](/img/guides/chatgpt-mcp/07.png)

I-click ang **Streamable HTTP**, pagkatapos ay punan ang:

| Field | Ano ang ilalagay |
|---|---|
| **Name** | `B1 Church` (o anumang pangalan na gusto mo) |
| **Type** | I-click ang **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Iwanang blangko |
| **Headers** | I-click ang **+ Add header** → Key: `Authorization` → Value: tingnan sa ibaba |

![Halimbawang napunan na nagpapakita ng Authorization sa Key at Bearer key sa Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — ang salitang Bearer, isang space, pagkatapos ay ang iyong key

I-click ang **Save**.

Yan na! Bumalik sa isang chat at magtanong ng tulad ng *"Ilang tao ang nasa aming church?"* at kukunin ng ChatGPT ang sagot nang direkta mula sa B1.

---

## Ligtas Ba Ito?

- Ang data lang ng **iyong church** ang nakikita ng ChatGPT.
- Ang kaya lang nitong gawin ay kung ano ang pinapayagan ng iyong key — ang key na **read** boxes lang ang naka-check ay puwedeng tumingin pero hindi kailanman makakapagbago ng anuman.
- Para i-off ito, burahin ang key sa B1 Admin sa ilalim ng **Settings → Developer**. Titigil agad ang access.

## Magkano Ito?

Libre ang B1 connection — bahagi ito ng ChurchApps. Kailangan ng ChatGPT ng bayad na plan (Plus o mas mataas) para kumonekta; tingnan ang pricing ng OpenAI.

## Technical Details

Ang natitirang bahagi ng page na ito ay para sa mga technical users at AI assistants. Ang MCP server ng B1 ay nasa `https://api.churchapps.org/mcp` (Streamable HTTP) at tumatanggap ng API key bilang `Authorization: Bearer cak_…` header. Tingnan ang [MCP Server developer reference](/docs/developer/api/mcp).

### Custom GPT na may Actions

Ang Custom GPT ay nagbibigay-daan sa iyo na gumawa ng isang dedikadong assistant na puwedeng i-share ng buong team mo — bubuksan nila ang isang link at magsisimulang magtanong nang walang anumang setup sa kanilang panig. Nangangailangan ito ng ChatGPT Plus, Team, o Enterprise account at humigit-kumulang 10 minuto.

#### 1. Gumawa ng API key

Sundin ang Step 1 ng I-set Up Ito sa itaas kung hindi mo pa ito nagagawa.

#### 2. Buuin ang Custom GPT

1. Sa ChatGPT, i-click ang iyong profile → **My GPTs** → **Create a GPT**.
2. Lumipat sa **Configure** tab, bigyan ng pangalan ang GPT (hal. "B1 Assistant") at magdagdag ng instructions:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Mag-scroll sa **Actions** → **Create new action** → **Authentication**.
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

5. I-save ang action. Subukan ito: *"ilang tao ang nasa church?"* — tatawagin ng ChatGPT ang `listPeople` at sasagot.
6. I-**Publish** ang GPT (Only me / Anyone with link / Organization) at i-share ang link sa iyong team.

#### 3. Gamitin ito

Sinumang may link ay puwedeng magtanong gamit ang natural na wika. Naa-apply pa rin ang scopes ng key — tatanggihan ng read-only key ang writes anuman ang sinasabi ng action schema.

---

### Kaligtasan at mga limitasyon

- **Per-church isolation.** Ang API key ay tumutukoy sa iisang church lamang. Hindi makikita ng ChatGPT ang data ng ibang churches.
- **Permission-scoped.** Dala lang ng key ang scopes na ibinigay mo. Ang pagtanggal ng isang scope (sa pamamagitan ng pagbura at muling paggawa ng key) ay pumuputol sa access na iyon sa susunod na tawag.
- **Revocable kaagad.** Burahin ang key sa **Settings → Developer → API Keys** at matatapos kaagad ang access.
- **Ang pag-share ng Custom GPT ay pag-share ng data.** Lahat ng may access sa GPT ay makakakita ng anumang pinapayagan ng scopes ng key. Mas mabuting gumamit ng mas makitid na scopes (hal. huwag isama ang `donations:read`) para sa mga GPT na malawakang ini-share.
- **Audit trail.** Anumang pagbabagong ginawa sa pamamagitan ng ChatGPT ay dumadaan sa parehong audit log tulad ng B1 Admin actions — makikita ang mga ito sa ilalim ng **Settings → Audit Log**.

### Troubleshooting

**Sinasabi ng MCP connector ang "Unauthorized" o nagpapakita ng 401 error:** nawawala o mali ang iyong API key. Buksan ang connector settings at suriin ang **Authorization** header: ang value ay dapat ang salitang `Bearer`, isang space, pagkatapos ay ang buong `cak_…` key na walang dagdag na spaces.

**Sinasabi ng ChatGPT na hindi nito mahanap ang ilang data:** maaaring walang tamang scopes ang key. Gumawa ng bagong key sa **Settings → Developer → API Keys** na may karagdagang scopes at i-update ang connector.

**Nagbabalik ng 401 ang Custom GPT action:** sa authentication panel ng action, kumpirmahin na naka-select ang **Auth Type: Bearer** at hindi kasama sa key ang salitang `Bearer` (awtomatiko itong idinadagdag ng ChatGPT).

**Nagbabalik ng 403 ang Custom GPT action:** walang scope ang key para sa endpoint na iyon. Gumawa ng bagong key na may tamang scopes at i-update ang GPT.

**Tinatanggihan ang action schema:** nangangailangan ang ChatGPT ng OpenAPI 3.1 na may kahit isang `paths` entry at isang `servers` URL. I-validate ang YAML sa [editor.swagger.io](https://editor.swagger.io) bago i-paste.

## Kaugnay

- [API Keys](/docs/developer/api/api-keys) — buong scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details at tool schemas
- [Claude](./claude) — parehong ideya, para sa models ng Anthropic
- [REST API reference](/docs/developer/api/endpoints) — bawat endpoint na puwedeng tawagin ng isang Custom GPT action
