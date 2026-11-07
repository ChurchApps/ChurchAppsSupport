---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Повежите ChatGPT са подацима ваше цркве у B1 и постављајте му питања обичним језиком — одговара на основу живих евиденција ваше цркве. Можете га замолити и да помогне са задацима које би у B1 Admin требало извршити у више корака.

**Нека питања која можете поставити:**
- *"Прикажи ми све који су присуствовали прошле недеље, а нису додељени малој групи"*
- *"Сажми давања овог месеца по фонду"*
- *"Ко су наши најновији чланови и да ли смо их контактирали?"*
- *"Не могу да схватим како да урадим X у B1 — можеш ли да ме проведеш кроз то?"*

</div>

<div class="prereqs">
<h4>Шта вам треба</h4>

- **ChatGPT апликација за рачунар** за Mac или Windows
- **Плаћени ChatGPT план** (Plus или виши). Бесплатни ChatGPT налози не могу да се повежу са B1.
- **Ваша B1 пријава** са дозволом за управљање подешавањима цркве (потребно за прављење кључа). Немате је? Затражите је од администратора B1 у вашој цркви.

</div>

:::tip Препорука: прво probajte Claude — бесплатан је
[Claude](./claude) се повезује са B1 на **бесплатном плану** и подешава се за мање од 3 минута — само додајте B1 као конектор и пријавите се својим B1 налогом. Кључ није потребан. То је најлакши начин да ваша црква испроба AI уз B1 пре било каквог плаћања.
:::

## Подешавање

Екрани могу да изгледају нешто другачије у вашој верзији ChatGPT-а.

---

**Корак 1 — Направите свој B1 кључ**

Кључ је оно што омогућава ChatGPT-у приступ B1 вашој цркви — замислите га као лозинку само за ChatGPT.

1. Пријавите се на [B1 Admin](https://admin.b1.church) и идите на [Settings → Developer](https://admin.b1.church/settings/developer).
2. На картици **API Keys** кликните **New API Key** и назовите га `ChatGPT`.
3. **Дозволе (Scopes):** означите шта ChatGPT сме даради. Свака област има поље **read** (само читање) и поље **write** (прављење измена). Нисте сигурни? За почетак означите само поља **read**.
4. Кликните **Save**, па **Copy** да копирате кључ (почиње са `cak_`). Приказује се само једном.

---

**Корак 2 — Кликните на своје име у доњем левом углу ChatGPT-а**

![Кликните на свој профил](/img/guides/chatgpt-mcp/01.png)

---

**Корак 3 — Кликните на Settings**

![Кликните на Settings у менију](/img/guides/chatgpt-mcp/02.png)

---

**Корак 4 — Кликните на Plugins у левом бочном менију**

![Кликните на Plugins испод Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Корак 5 — Кликните на картицу MCPs**

![Кликните на картицу MCPs](/img/guides/chatgpt-mcp/04.png)

Овде ћете видети све MCP сервере које сте већ додали.

---

**Корак 6 — Кликните на Add → Add MCP server**

![Кликните на Add, па на Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Корак 7 — Попуните обрazac и кликните на Save**

![Образац за повезивање са прилагођеним MCP сервером](/img/guides/chatgpt-mcp/07.png)

Кликните **Streamable HTTP**, па попуните:

| Поље | Шта уписати |
|---|---|
| **Name** | `B1 Church` (или било које име које желите) |
| **Type** | Кликните **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Оставите празно |
| **Headers** | Кликните **+ Add header** → Key: `Authorization` → Value: погледајте испод |

![Попуњен пример са Authorization у пољу Key и Bearer кључем у пољу Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_vaskljuc` — реч Bearer, размак, па ваш кључ

Кликните **Save**.

То је то! Вратите се на ћаскање и питајте нешто као *"Колико људи има наша црква?"* — ChatGPT ће одговор узети директно из B1.

---

## Да ли је безбедно?

- ChatGPT може да види само податке **ваше цркве**.
- Може да уради само оно што ваш кључ дозвољава — кључ са означеним само **read** пољима може да гледа, али никада ништа не може да промени.
- Да бисте га искључили, обришите кључ у B1 Admin-у под **Settings → Developer**. Приступ одмах престаје.

## Колико кошта?

B1 веза је бесплатна — део је ChurchApps-а. ChatGPT захтева плаћени план (Plus или виши) за повезивање; погледајте OpenAI-јеве цене.

## Технички детаљи

Остатак ове странице намењен је техничким корисницима и AI асистентима. B1-ов MCP сервер налази се на `https://api.churchapps.org/mcp` (Streamable HTTP) и прихвата API кључ као заглавље `Authorization: Bearer cak_…`. Погледајте [MCP Server developer reference](/docs/developer/api/mcp).

### Прилагођени GPT са Actions

Прилагођени GPT омогућава да направите посебног асистента који цео ваш тим може да дели — отворе линк и почну да постављају питања без икаквог подешавања са своје стране. Потребан је ChatGPT Plus, Team или Enterprise налог и око 10 минута.

#### 1. Направите API кључ

Пратите Корак 1 из одељка Подешавање изнад ако већ нисте.

#### 2. Направите прилагођени GPT

1. У ChatGPT-у кликните на свој профил → **My GPTs** → **Create a GPT**.
2. Пређите на картицу **Configure**, дајте GPT-у име (нпр. „B1 Assistant") и додајте упутства:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Скролујте до **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** налепите свој `cak_…` кључ
   - **Auth Type:** Bearer
   - Сачувајте.

4. У поље **Schema** налепите ову почетну OpenAPI спецификацију:

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

5. Сачувајте акцију. Испробајте је: *"колико људи има у цркви?"* — ChatGPT позове `listPeople` и одговори.
6. **Објавите** GPT (Only me / Anyone with link / Organization) и поделите линк са тимом.

#### 3. Користите га

Свако ко има линк може да поставља питања природним језиком. Дозволе кључа и даље важе — кључ само за читање одбија измене, без обзира на то шта каже шема акције.

---

### Безбедност и ограничења

- **Изолација по цркви.** API кључ се односи само на једну цркву. ChatGPT не може да види податке других цркава.
- **Ограничено дозволама.** Кључ носи само дозволе које сте доделили. Уклањање дозволе (брисањем и поновним прављењем кључа) укида тај приступ при следећем позиву.
- **Одмах се опозива.** Обришите кључ у **Settings → Developer → API Keys** и приступ се одмах завршава.
- **Дељење прилагођеног GPT-а дели и податке.** Сви са приступом GPT-у могу да виде оно што дозвољавају дозволе кључа. За GPT-ове који се широко деле, пожељније су уже дозволе (нпр. изоставите `donations:read`).
- **Ревизијски запис.** Све измене направљене преко ChatGPT-а пролазе кроз исти ревизијски дневник као и радње у B1 Admin-у — пронађите их под **Settings → Audit Log**.

### Решавање проблема

**MCP конектор јавља „Unauthorized" или приказује грешку 401:** ваш API кључ недостаје или није тачан. Отворите подешавања конектора и проверите заглавље **Authorization**: вредност треба да буде реч `Bearer`, један размак, па цео `cak_…` кључ без додатних размака.

**ChatGPT каже да не може да нађе одређене податке:** кључ можда нема одговарајуће дозволе. Направите нови кључ под **Settings → Developer → API Keys** са додатним дозволама и ажурирајте конектор.

**Акција прилагођеног GPT-а враћа 401:** у панелу за аутентификацију акције проверите да је изабран **Auth Type: Bearer** и да кључ не садржи реч `Bearer` (ChatGPT је додаје аутоматски).

**Акција прилагођеног GPT-а враћа 403:** кључ нема дозволу за ту крајњу тачку. Направите нови кључ са исправним дозволама и ажурирајте GPT.

**Шема акције је одбијена:** ChatGPT захтева OpenAPI 3.1 са бар једним уносом у `paths` и `servers` URL-ом. Проверите YAML на [editor.swagger.io](https://editor.swagger.io) пре лепљења.

## Повезано

- [API Keys](/docs/developer/api/api-keys) — потпун преглед дозвола
- [MCP Server (developer reference)](/docs/developer/api/mcp) — детаљи протокола и шеме алата
- [Claude](./claude) — иста идеја, за Anthropic-ове моделе
- [REST API reference](/docs/developer/api/endpoints) — свака крајња тачка коју Custom GPT акција може да позове
