---
title: "ChatGPT"
description: "Ikonekta ang ChatGPT sa datos ng B1 ng iyong simbahan gamit ang API key para makapagtanong ka nang nasa simpleng wika tungkol sa mga tao, giving, at attendance sa B1 Admin."
---

# ChatGPT

<div class="article-intro">

Ikonekta ang ChatGPT sa datos ng B1 ng iyong simbahan at magtanong dito sa simpleng wika — sumasagot ito mula sa mga live na talaan ng iyong simbahan. Maaari mo rin itong hilingang tumulong sa mga bagay na mangangailangan ng maraming hakbang sa B1 Admin.

**Ilang bagay na puwede mong itanong:**
- *"Ipakita mo sa akin ang lahat ng dumalo noong nakaraang linggo pero hindi pa naitatalaga sa isang small group"*
- *"Ibuod ang giving ngayong buwan kada pondo"*
- *"Sino ang pinakabagong mga miyembro natin at nakipag-ugnayan na ba tayo sa kanila?"*
- *"Hindi ko maintindihan kung paano gawin ang X sa B1 — puwede mo ba akong gabayan?"*

</div>

<div class="prereqs">
<h4>Ano ang Kailangan Mo</h4>

- **Ang ChatGPT desktop app** para sa Mac o Windows
- **Bayad na ChatGPT plan** (Plus o mas mataas). Hindi makakakonekta sa B1 ang libreng ChatGPT account.
- **Ang iyong B1 login** na may pahintulot na mamahala ng mga setting ng simbahan (kailangan para makagawa ng key). Wala ka nito? Tanungin ang administrator ng B1 ng iyong simbahan.

</div>

:::tip Inirerekomenda: subukan muna ang Claude — libre ito
Kumokonekta ang [Claude](./claude.md) sa B1 sa **libreng plan** nito at natatapos ang setup sa wala pang 3 minuto — idagdag lang ang B1 bilang connector at mag-sign in gamit ang iyong B1 account. Walang kailangang key. Ito ang pinakamadaling paraan para masubukan ng iyong simbahan ang AI kasama ang B1 bago magbayad ng anuman.
:::

## I-set Up Ito {#set-it-up}

Maaaring bahagyang magkaiba ang mga screen sa bersyon ng ChatGPT na gamit mo.

---

**Hakbang 1 — Gumawa ng iyong B1 key**

Ang key ang nagpapapasok sa ChatGPT sa B1 ng *iyong* simbahan — isipin itong parang password na para lang sa ChatGPT.

1. Mag-log in sa [B1 Admin](https://admin.b1.church) at pumunta sa [Settings → Developer](https://admin.b1.church/settings/developer).
2. Sa tab na **API Keys**, i-click ang **New API Key** at pangalanan itong `ChatGPT`.
3. **Scopes:** lagyan ng check kung ano ang puwedeng gawin ng ChatGPT. May kahon na **read** (tingin lang) at kahon na **write** (gumawa ng pagbabago) ang bawat lugar. Hindi ka sigurado? Lagyan muna ng check ang mga kahon na **read** lang para magsimula.
4. I-click ang **Save**, pagkatapos ay i-**Copy** ang key (nagsisimula ito sa `cak_`). Isang beses lang ito ipinapakita.

---

**Hakbang 2 — I-click ang pangalan mo sa kaliwang ibaba ng ChatGPT**

![I-click ang pangalan ng iyong profile](/img/guides/chatgpt-mcp/01.png)

---

**Hakbang 3 — I-click ang Settings**

![I-click ang Settings mula sa menu](/img/guides/chatgpt-mcp/02.png)

---

**Hakbang 4 — I-click ang Plugins sa kaliwang sidebar**

![I-click ang Plugins sa ilalim ng Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Hakbang 5 — I-click ang tab na MCPs**

![I-click ang tab na MCPs](/img/guides/chatgpt-mcp/04.png)

Makikita rito ang anumang MCP server na naidagdag mo na.

---

**Hakbang 6 — I-click ang Add → Add MCP server**

![I-click ang Add at pagkatapos ang Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Hakbang 7 — Punan ang form at i-click ang Save**

![Kumonekta sa custom MCP form](/img/guides/chatgpt-mcp/07.png)

I-click ang **Streamable HTTP**, pagkatapos ay punan ang:

| Field | Ano ang ilalagay |
|---|---|
| **Name** | `B1 Church` (o anumang pangalang gusto mo) |
| **Type** | I-click ang **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Iwanang blangko |
| **Headers** | I-click ang **+ Add header** → Key: `Authorization` → Value: tingnan sa ibaba |

![Halimbawang napunan na nagpapakita ng Authorization sa Key at Bearer key sa Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — ang salitang Bearer, isang space, at ang iyong key

I-click ang **Save**.

Tapos na! Bumalik sa isang chat at magtanong ng halimbawang *"Ilan ang tao sa simbahan natin?"* at kukunin ng ChatGPT ang sagot diretso mula sa B1.

---

## Ligtas Ba Ito? {#is-it-safe}

- Ang makikita lang ng ChatGPT ay ang datos ng **iyong simbahan**.
- Puwede lang nitong gawin ang pinapayagan ng iyong key — ang key na may mga kahon na **read** lang ang naka-check ay makakatingin lang at hindi makakagawa ng anumang pagbabago.
- Para i-off ito, burahin ang key sa B1 Admin sa ilalim ng **Settings → Developer**. Titigil agad ang access.

## Magkano ang Gastos? {#what-does-it-cost}

Libre ang koneksyon sa B1 — bahagi ito ng ChurchApps. Kailangan ng ChatGPT ng bayad na plan (Plus o mas mataas) para makakonekta; tingnan ang pricing ng OpenAI.

## Mga Teknikal na Detalye {#technical-details}

Ang natitira sa pahinang ito ay para sa mga teknikal na user at AI assistant. Nasa `https://api.churchapps.org/mcp` (Streamable HTTP) ang MCP server ng B1 at tinatanggap ang API key bilang header na `Authorization: Bearer cak_…`. Tingnan ang [MCP Server developer reference](/docs/developer/api/mcp).

### Custom GPT na may Actions {#custom-gpt-with-actions}

Sa pamamagitan ng Custom GPT, makakagawa ka ng nakalaang assistant na puwedeng gamitin ng buong team mo — magbubukas sila ng link at makakapagtanong agad nang walang setup sa panig nila. Kailangan nito ng account na ChatGPT Plus, Team, o Enterprise at mga 10 minuto.

#### 1. Gumawa ng API key {#1-create-an-api-key}

Sundin ang Hakbang 1 ng I-set Up Ito sa itaas kung hindi mo pa ito nagagawa.

#### 2. Buuin ang Custom GPT {#2-build-the-custom-gpt}

1. Sa ChatGPT, i-click ang iyong profile → **My GPTs** → **Create a GPT**.
2. Lumipat sa tab na **Configure**, bigyan ng pangalan ang GPT (hal. "B1 Assistant") at idagdag ang mga instruction:

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

4. Sa kahong **Schema**, i-paste ang panimulang OpenAPI spec na ito:

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. I-save ang action. Subukan ito: *"ilan ang tao sa simbahan?"* — tatawagin ng ChatGPT ang `listPeople` at sasagot.
6. **I-publish** ang GPT (Only me / Anyone with link / Organization) at ibahagi ang link sa iyong team.

#### 3. Gamitin ito {#3-use-it}

Sinumang may link ay puwedeng magtanong sa natural na wika. Nalalapat pa rin ang mga scope ng key — tatanggihan ng read-only na key ang anumang pagsulat, anuman ang sabihin ng action schema.

---

### Kaligtasan at mga limitasyon {#safety-and-limits}

- **Hiwalay ang bawat simbahan.** Isang simbahan lang ang tinutukoy ng API key. Hindi makikita ng ChatGPT ang datos ng ibang simbahan.
- **Nakabatay sa pahintulot.** Tanging ang mga scope na ibinigay mo ang dala ng key. Ang pag-alis ng scope (sa pamamagitan ng pagbura at paggawa muli ng key) ay puputol sa access na iyon sa susunod na tawag.
- **Agad na mababawi.** Burahin ang key sa **Settings → Developer → API Keys** at agad na titigil ang access.
- **Ang pagbabahagi ng Custom GPT ay nagbabahagi rin ng datos.** Makikita ng lahat ng may access sa GPT ang anumang pinapayagan ng scope ng key. Mas mainam na mas makitid na scope (hal. huwag isama ang `donations:read`) para sa mga GPT na malawakang ibinabahagi.
- **Audit trail.** Dumadaan ang anumang pagbabagong ginawa sa pamamagitan ng ChatGPT sa parehong audit log ng mga aksyon sa B1 Admin — hanapin ang mga ito sa ilalim ng **Settings → Audit Log**.

### Troubleshooting {#troubleshooting}

**Sinasabi ng MCP connector na "Unauthorized" o nagpapakita ng 401 error:** kulang o mali ang iyong API key. Buksan ang mga setting ng connector at tingnan ang header na **Authorization**: ang value ay dapat ang salitang `Bearer`, isang space, pagkatapos ang buong `cak_…` key na walang dagdag na space.

**Sinasabi ng ChatGPT na hindi nito mahanap ang ilang datos:** maaaring kulang ang mga scope ng key. Gumawa ng bagong key sa **Settings → Developer → API Keys** na may karagdagang scope at i-update ang connector.

**Nagbabalik ng 401 ang Custom GPT action:** sa authentication panel ng action, tiyaking napili ang **Auth Type: Bearer** at hindi kasama sa key ang salitang `Bearer` (idinadagdag ito ng ChatGPT nang awtomatiko).

**Nagbabalik ng 403 ang Custom GPT action:** walang scope ang key para sa endpoint na iyon. Gumawa ng bagong key na may tamang scope at i-update ang GPT.

**Tinatanggihan ang action schema:** kailangan ng ChatGPT ang OpenAPI 3.1 na may kahit isang entry sa `paths` at URL sa `servers`. I-validate ang YAML sa [editor.swagger.io](https://editor.swagger.io) bago i-paste.

## Kaugnay {#related}

- [API Keys](/docs/developer/api/api-keys) — kumpletong reference ng scope
- [MCP Server (developer reference)](/docs/developer/api/mcp) — mga detalye ng protocol at schema ng tool
- [Claude](./claude.md) — parehong ideya, para sa mga modelo ng Anthropic
- [REST API reference](/docs/developer/api/endpoints) — bawat endpoint na puwedeng tawagin ng isang Custom GPT action
