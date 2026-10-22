---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Xhuma i-ChatGPT kumininingwane ye-B1 yelibandla lakho bese uyibuta imibuto ngelulwimi loluvamile — iphendvula kusuka emarekhodini elibandla lakho lasebentako. Ungayicela nekutsi ikusite ngetintfo bekungatsatsa tinyatselo letinyenti ku-B1 Admin.

**Letinye tintfo longatibuta:**
- *"Ngikhombise wonkhe umuntfu lobekhona ngeliviki leledlule kodvwa angakafakwa kulicembu lelincane"*
- *"Hlanganisa iminikelo yalenyanga ngekwesikhwama"*
- *"Ngobani emalunga etfu lamasha futsi sebebalandzelele yini?"*
- *"Angati kutsi ngiyenta njani X ku-B1 — ungangihambisa ngayo yini?"*

</div>

<div class="prereqs">
<h4>Loko Lokudzingako</h4>

- **I-ChatGPT desktop app** ye-Mac nome Windows
- **Luhlelo lwe-ChatGPT lolukhokhelwako** (Plus nome lophakeme). Ema-akhawunti e-ChatGPT lamahhala angeke axhume ku-B1.
- **Kungena kwakho ku-B1** lokunemvumo yekuphatsa tilungiselelo telibandla (kuyadzingeka kwakha ikhiya). Awunayo? Cela umphatsi we-B1 welibandla lakho.

</div>

:::tip Kuyanconywa: linga i-Claude kucala — imahhala
I-[Claude](./claude) ixhuma ku-B1 **eluhlelweni lwayo lwamahhala** futsi ilungiselelwa ngaphansi kwemaminithi lali-3 — vele ungete i-B1 njenge-connector bese ungena nge-akhawunti yakho ye-B1. Akudzingeki khiya. Yindlela lelula kakhulu yekutsi libandla lakho lilinge i-AI ne-B1 ngaphambi kwekukhokhela nome yini.
:::

## Kuyilungiselela

Tikrini tingabukeka tehlukile kancane ku-version yakho ye-ChatGPT.

---

**Sinyatselo 1 — Yakha ikhiya yakho ye-B1**

Ikhiya yiyo levumela i-ChatGPT kutsi ingene ku-B1 ye*libandla lakho* — ucabange ngayo njengephasiwedi ye-ChatGPT kuphela.

1. Ngena ku-[B1 Admin](https://admin.b1.church) bese uya ku-[Settings → Developer](https://admin.b1.church/settings/developer).
2. Kuthebhu ye-**API Keys**, chofota **New API Key** bese uyicamba ngekutsi `ChatGPT`.
3. **Emkhawulo (Scopes):** khetsa loko i-ChatGPT lengakwenta. Indzawo ngayinye inelibhokisi le-**read** (kubuka kuphela) nelibhokisi le-**write** (kwenta lushintjo). Awuciniseki? Khetsa emabhokisi e-**read** kuphela kucala.
4. Chofota **Save**, bese u-**Copy** ikhiya (icala nge-`cak_`). Ikhonjiswa kanye kuphela.

---

**Sinyatselo 2 — Chofota libito lakho ekhoneni lelingentasi ngesencele ku-ChatGPT**

![Chofota libito lephrofayela yakho](/img/guides/chatgpt-mcp/01.png)

---

**Sinyatselo 3 — Chofota Settings**

![Chofota Settings kumenyu](/img/guides/chatgpt-mcp/02.png)

---

**Sinyatselo 4 — Chofota Plugins ku-sidebar lesencele**

![Chofota Plugins ngaphansi kwe-Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Sinyatselo 5 — Chofota ithebhu ye-MCPs**

![Chofota ithebhu ye-MCPs](/img/guides/chatgpt-mcp/04.png)

Utawubona lapha noma ngumaphi ema-MCP server sewuvele uwengetile.

---

**Sinyatselo 6 — Chofota Add → Add MCP server**

![Chofota Add bese u-Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Sinyatselo 7 — Gcwalisa lifomu bese uchofota Save**

![Lifomu le-Connect to a custom MCP](/img/guides/chatgpt-mcp/07.png)

Chofota **Streamable HTTP**, bese ugcwalisa:

| Indzawo | Loko lokufakako |
|---|---|
| **Name** | `B1 Church` (nome nobe nguliphi libito lolitsandzako) |
| **Type** | Chofota **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Kuyekele kungenalutfo |
| **Headers** | Chofota **+ Add header** → Key: `Authorization` → Value: bona ngentasi |

![Sibonelo lesigcwalisiwe lesikhombisa Authorization ku-Key ne-Bearer key ku-Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — ligama lelitsi Bearer, sikhala, bese ikhiya yakho

Chofota **Save**.

Kuphela loko! Buyela enkhulumeni bese ubuta intfo lefana *"Bantfu labangaki labakulelibandla letfu?"* bese i-ChatGPT itfola imphendvulo ngco ku-B1.

---

## Kuphephile Yini?

- I-ChatGPT ingabona kuphela imininingwane ye**libandla lakho**.
- Ingenta kuphela loko ikhiya yakho lekuvumelako — ikhiya lekhetswe kuyo emabhokisi e-**read** kuphela ingabuka kodvwa ingeke ishintje lutfo.
- Kuyicisha, sula ikhiya ku-B1 Admin ngaphansi kwe-**Settings → Developer**. Kufinyelela kuyema ngaso leso sikhatsi.

## Kubiza Malini?

Kuxhumana ne-B1 kumahhala — kuyincenye ye-ChurchApps. I-ChatGPT idzinga luhlelo lolukhokhelwako (Plus nome lophakeme) kuze ixhume; bona emanani e-OpenAI.

## Imininingwane Yetheknoloji

Lencenye lesele yalelikhasi ngeyebasebentisi labati ngetheknoloji kanye nebasiti be-AI. I-MCP server ye-B1 ikhona ku-`https://api.churchapps.org/mcp` (Streamable HTTP) futsi yemukela ikhiya ye-API njenge-header ye-`Authorization: Bearer cak_…`. Bona i-[MCP Server developer reference](/docs/developer/api/mcp).

### Custom GPT nge-Actions

I-Custom GPT ikuvumela kutsi wakhe umsiti lotinikele lelicembu lakho lonkhe lelingabelana ngawo — bavula linki bese bacala kubuta imibuto ngaphandle kwekulungiselela lutfo ngasohlangotsini lwabo. Idzinga i-akhawunti ye-ChatGPT Plus, Team, nome Enterprise kanye nemaminithi lacishe abe li-10.

#### 1. Yakha ikhiya ye-API

Landzela Sinyatselo 1 se-Kuyilungiselela lapha ngenhla nangabe ungakakwenti.

#### 2. Yakha i-Custom GPT

1. Ku-ChatGPT, chofota iphrofayela yakho → **My GPTs** → **Create a GPT**.
2. Shintjela kuthebhu ye-**Configure**, nika i-GPT libito (sibonelo "B1 Assistant") bese wengeta ticondziso:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Skrola uye ku-**Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** namatsisela ikhiya yakho `cak_…`
   - **Auth Type:** Bearer
   - Gcina.

4. Ebhokisini le-**Schema**, namatsisela le-OpenAPI spec yekucala:

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

5. Gcina i-action. Yihlole: *"bantfu labangaki labakulelibandla?"* — i-ChatGPT ibita `listPeople` bese iyaphendvula.
6. **Publish** i-GPT (Only me / Anyone with link / Organization) bese wabelana ngelinki nelicembu lakho.

#### 3. Kuyisebentisa

Nobe ngubani lonelinki angabuta imibuto ngelulwimi lwemvelo. Emkhawulo weikhiya usasebenta — ikhiya lefundza kuphela iyakwenqaba kubhala kungakhatsaleki kutsi i-schema ye-action itsini.

---

### Kuphepha nemkhawulo

- **Kwehlukanisa ngelibandla ngalinye.** Ikhiya ye-API ihambisana nelibandla linye kuphela. I-ChatGPT ayikwati kubona imininingwane yalamanye emabandla.
- **Kumelene nemvumo.** Ikhiya iphatse kuphela emkhawulo lowuniketile. Kususa umkhawulo (ngekusula nekwakha kabusha ikhiya) kucisha lokufinyelela ngekubita lokulandzelako.
- **Iyahocishwa ngaso leso sikhatsi.** Sula ikhiya ku-**Settings → Developer → API Keys** bese kufinyelela kuphela ngaso leso sikhatsi.
- **Kwabelana nge-Custom GPT kwabelana nemininingwane.** Wonkhe umuntfu lonekufinyelela ku-GPT angabona noma yini lekuvunyelwe ngumkhawulo weikhiya. Khetsa emkhawulo lomncane (sibonelo, shiya `donations:read`) kuma-GPT labelwana ngawo kabanti.
- **Umlandvo wekuhlola.** Noma ngumuphi lushintjo lolwentiwa nge-ChatGPT ludlula ku-audit log lefanako nekwentiwa ku-B1 Admin — kutfole ngaphansi kwe-**Settings → Audit Log**.

### Kulungisa tinkinga

**I-MCP connector itsi "Unauthorized" nome ikhombisa liphutsa le-401:** ikhiya yakho ye-API ayikho nome ayilungi. Vula tilungiselelo te-connector bese uhlola i-header ye-**Authorization**: inani kufanele libe ligama lelitsi `Bearer`, sikhala sinye, bese ikhiya yonkhe `cak_…` ngaphandle kwetikhala letengetiwe.

**I-ChatGPT itsi ayikwati kutfola imininingwane letsite:** kungenteka ikhiya ingenawo emkhawulo lofanele. Yakha ikhiya lensha ku-**Settings → Developer → API Keys** lenemkhawulo leyengetiwe bese ubuyeketa i-connector.

**I-action ye-Custom GPT ibuyisa 401:** kuphaneli yekucinisekisa ye-action, cinisekisa kutsi **Auth Type: Bearer** ikhetsiwe futsi ikhiya ayinalo ligama lelitsi `Bearer` (i-ChatGPT iyalengeta ngekwayo).

**I-action ye-Custom GPT ibuyisa 403:** ikhiya ayinawo umkhawulo waleyo endpoint. Yakha ikhiya lensha lenemkhawulo lofanele bese ubuyeketa i-GPT.

**I-schema ye-action iyalahlwa:** i-ChatGPT idzinga i-OpenAPI 3.1 lenalokungenani yinye i-`paths` kanye ne-URL ye-`servers`. Hlola i-YAML ku-[editor.swagger.io](https://editor.swagger.io) ngaphambi kwekuyinamatsisela.

## Lokuhambisana

- [API Keys](/docs/developer/api/api-keys) — luhlu loluphelele lwemkhawulo
- [MCP Server (developer reference)](/docs/developer/api/mcp) — imininingwane yeprothokholi kanye netinhlaka temathulusi
- [Claude](./claude) — umbono lofanako, wemamodeli e-Anthropic
- [REST API reference](/docs/developer/api/endpoints) — onkhe ema-endpoint langabitwa yi-action ye-Custom GPT
