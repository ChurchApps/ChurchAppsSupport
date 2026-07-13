---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Xhuma i-ChatGPT ye-OpenAI kumniningwane weBandla lakho le-B1 kuze ukwati kubuta imibuto lefana "ngubani longakabi kulicembu kulelikota?" nome "hlanganisa umnikelo wesakhiwo lenyanga" bese i-ChatGPT ikhipha timphendvulo mngoti ku-B1. Kunetindlela letimbili letisekelwako: i-**Custom GPT** lesebenta kuloonkhe luhlelo lwe-ChatGPT Plus, kanye ne-**MCP server** yetitfulu tebadzali betinhlelo letiyisekelako.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Umphatsi welibandla lonemvumo yekufaka **Edit Settings** (kucalisa ikhiya ye-API)
- I-akhawunti ye-**ChatGPT Plus, Pro, Team, nome Enterprise** (ibanga lelisimahla alikwati kusebentisa ema-Custom GPT nome ema-Connector)
- I-URL lephelele ye-B1 API yakho — ngalokuvamile `https://api.churchapps.org` kumabandla lasekelwe, nome i-Api host yakho lotihostele wena

</div>

## Khetsa Indlela Lefanele

| Indlela | Luhlelo loludzingekako | Umzamo | Loyakutfola |
|---|---|---|---|
| **Custom GPT nge-Actions** | ChatGPT Plus / Team / Enterprise | Emaminithi lali-10 | I-GPT lengabelaneka lebita i-REST API ye-B1 kuwo wonkhe umsebenti lofuna kuyisebentisa |
| **MCP nge-emathulusi e-OpenAI** | Developer / Agent SDK / Pro Connectors | Kwengetiwe | Kutfolakala lokuphelele nge-MCP server, kufanele emathulusi ekubhala ikhodi netinkhundla te-agent |

Kumabandla lamanyenti indlela ye-**Custom GPT** ngiyona lefanele — ayidzingi kulungiselela kwemsunguli, isebenta ngekhatsi kwe-ChatGPT app leyavamile nema-client eselula, futsi ingabelaneka nelicembu lakho. Indlela ye-MCP ichaziwe ngentasi kubantfu labasebenta ngethekhnoloji labasebentisa emathulusi emsunguli e-OpenAI nome tinkhundla te-agent.

## Indlela A — Custom GPT nge-Actions

Loku kuxhuma i-ChatGPT ngekwenta ku-B1 REST API. I-Custom GPT yakho itawukwati kufundza futsi (nangabe kukhetsiwe) kubhala emarekhodi e-B1 esikhundleni salobonkhe lositasebentisako.

### 1. Yakha ikhiya ye-API

1. Ku-B1Admin, hamba uye ku **Settings → Developer → API Keys**.
2. Chofota **New API Key**, uyicalise ngekutsi `ChatGPT`, bese ukhetsa emkhawulo. Emasethi lavamile ekucala:
   - **Umsiti lofunda kuphela:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Kufunda + kubhala:** ngeta emkhawulo lafanako :write
3. Gcina bese ukhopisha yonkhe ikhiya `cak_…`.

Bona [API Keys](/docs/developer/api/api-keys) kuluhlu loluphelele lwemkhawulo.

### 2. Yakha i-Custom GPT

1. Ku-ChatGPT, chofota iphrofayela yakho → **My GPTs** → **Create a GPT**.
2. Shintjela ku-thebhu ye-**Configure** bese unika i-GPT ligama (sibonelo "B1 Assistant") netiyalo letifana:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Skrola uye ku **Actions** → **Create new action** → **Authentication**.
   - **Luhlobo lwekucinisekisa:** API Key
   - **API Key:** `cak_<prefix>.<secret>`
   - **Luhlobo lwe-Auth:** Bearer
   - Gcina.
4. Kubhokisi le-**Schema**, faka i-OpenAPI spec lencane lechaza ema-endpoint lofuna i-GPT isebentise. Sicalo lesihlanganisa kufundza lokuvamile kakhulu:

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

   Yandzisa i-schema ngema-endpoint lamanyenti nangabe kudzingeka — onkhe ema-route lacinisekisiwe ku-B1 asemukela lona ikhiya `cak_…`. I-[REST API reference](/docs/developer/api/endpoints) inikeza luhlu lwaloko lokutfolakalako.

5. Gcina lesento. Sihlole ngemibuto lefana *"bantfu labangaki labakulelibandla?"* — i-ChatGPT itakubita i-`listPeople` bese iphendvula.
6. **Shicilela** i-GPT (Kimi kuphela / Nome ngubani lonelinki / Inhlangano) bese wabelana nelicembu lakho.

### 3. Kuyisebentisa

Nobe ngubani losabelane naye nge-GPT angabuta imibuto ngelulwimi lolusetjentiswako nsuku zonkhe — i-ChatGPT ikhetsa sento lesifanele, ibite i-B1, iphendvule. Emkhawulo weikhiya asakasebenta: ikhiya lefunda kuphela iyalinqaba kubhala nanoma ngabe sento lesichaziwe ku-schema sitini.

## Indlela B — MCP nge-emathulusi e-OpenAI

I-B1 API ihlanganisa i-MCP server ku `/mcp` lengasetjentiswa ngunoma ngutulu lwe-OpenAI lolwati i-MCP — sibonelo [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), ithulusi le-MCP le-Responses API, nome tinkhundla te-agent temaphathi latsatfu ladla i-MCP servers.

Cinisekisa ngeleyo ikhiya `cak_…` kuhedha ye-`Authorization: Bearer`. Kunemathulusi lamatsatfu lakhonjiswako: `list_endpoints`, `describe_endpoint`, ne-`api_call`. Bona i-[MCP Server developer reference](/docs/developer/api/mcp) kuprothokholi, kutfutfukiswa, netifanelo temathulusi.

Ema-"Connector" langekhatsi e-ChatGPT (Pro/Business/Enterprise) njengamanje alindzele ema-MCP servers lanetimo letitsite te-`search` ne-`fetch` kanye nekucinisekiswa nge-OAuth, lokungakhonjiswa yi-B1 MCP server. Kuze-ChatGPT ngekhatsi kwe-app yebasebentisi, indlela ye-Custom GPT lengetulu iyona lesebentako.

## Kuphepha Nemkhawulo

- **Kwehlukanisa ngelibandla ngalinye.** Ikhiya ye-API isetjentiswa libandla linye kuphela. I-ChatGPT ayikwati kubona imininingwane yalamanye emabandla.
- **Kumelene nemvumo.** Nangabe wasusa imvumo kulomuntfu lowacalisa ikhiya, i-ChatGPT iyayilahlekelwa ngalesikhatsi lesilandzelako lokutawubitwa ngaso — ngalesikhatsi lesifanako.
- **Iyakwati kususwa.** Sula ikhiya ku **Settings → Developer → API Keys** bese kutfolakala kwe-ChatGPT kuyaphela ngaso leso sikhatsi.
- **Kwabelana nge-Custom GPT kwabelana nemininingwane.** Nobe ngubani lonelifikelelo ku-GPT angabuta imibuto abone konkhe leyikhiya inemvumo yakho. Yabelana kuphela nebasebenti labafanele babone loyo mniningwane, futsi ukhetse emkhawulo lamancane (sibonelo, ungahlanganisi `donations:read` ku-GPT leyabelenwe kabanti).
- **Umlandvo wekuhlola.** Kushintja kudlula kulogu lofanako lwe-B1Admin; buka ngaphansi kwe **Reports → Audit Log**.

## Tindleko

I-ChurchApps imahhala futsi ivulekile emtfombeni — i-API lebitwa yi-Custom GPT yakho iyincenye ye-API lelibandla lakho seliyisebentisa. I-OpenAI ikhokhisa kusebentisa i-ChatGPT ngekwemaplani abo. Akukho tindleko ngakunye kubita lokuvela ku-ChurchApps.

## Kulungisa Tinkinga

**I-Action ibuyisa i-401:** iHedha ye-bearer ayifakiwe kahle. Kuphaneli lekucinisekisa lesento, cinisekisa kutsi **Auth Type: Bearer** ikhetsiwe futsi ligama lelikhiya alihlanganisi ligama lelitsi `Bearer` (i-ChatGPT iyalifaka yona).

**I-Action ibuyisa i-403:** ikhiya ayinawo umkhawulo waleyo endpoint. Calisa ikhiya lensha lenemkhawulo lofanele bese uyayihlanganisa ku-GPT.

**I-ChatGPT ibita i-action lengakafaneli:** cinisa emafilidi e-`summary` ne-`description` ku-schema yakho ye-OpenAPI kuze imodeli ikhetse lokufanele. Kufaka imibuto yesibonelo etiyalweni te-GPT nako kuyasita.

**Iphaneli le-action iyayilahla i-schema:** i-ChatGPT idzinga i-OpenAPI 3.1 lenendzawo lengashi i-`paths` linye kanye ne-URL ye-`servers`. Hlola i-YAML kunoma nguluphi luhlelo lwekuhlola lwe-OpenAPI lolusevendlaleni ngaphambi kwekuyifaka.

**Kutfutfukiswa kwasekhaya:** khomba i-URL ye-`servers` ye-action ku-Api yakho yasekhaya (sibonelo `http://localhost:8084`) — kepha caphela kutsi ema-action e-ChatGPT abita kuphela ema-URL lasembikweni, ngako-ke kuhlolwa kwasekhaya sebentisa i-tunnel lefana ne-`ngrok` nome uphatse i-API ngco nge-`curl` kucinisekisa ikhiya kucala.

## Lokuhambisana

- [API Keys](/docs/developer/api/api-keys) — luhlu loluphelele lwemkhawulo
- [MCP Server (developer reference)](/docs/developer/api/mcp) — imininingwane yeprothokholi kanye netifanelo temathulusi
- [Claude](./claude) — umbono lofanako, wemamodeli e-Anthropic
- [REST API reference](/docs/developer/api/endpoints) — onkhe ema-endpoint langashaywa yi-Custom GPT action
