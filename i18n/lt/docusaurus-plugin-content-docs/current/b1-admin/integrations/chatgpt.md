---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Prijunkite ChatGPT prie savo bažnyčios B1 duomenų ir klauskite jo paprastais žodžiais — jis atsakys remdamasis tiesioginiais bažnyčios įrašais. Taip pat galite paprašyti padėti atlikti užduotis, kurioms B1 Admin reikėtų kelių žingsnių.

**Ko galite paklausti:**
- *„Parodyk visus, kurie praėjusią savaitę dalyvavo, bet dar nepriskirti jokiai mažajai grupei“*
- *„Apibendrink šio mėnesio aukas pagal fondą“*
- *„Kas yra mūsų naujausi nariai ir ar su jais jau susisiekėme?“*
- *„Nesuprantu, kaip B1 programoje atlikti X — ar gali pažingsniui paaiškinti?“*

</div>

<div class="prereqs">
<h4>Ko jums reikės</h4>

- **ChatGPT darbalaukio programa** Mac arba Windows sistemai
- **Mokama ChatGPT prenumerata** (Plus ar aukštesnė). Nemokamos ChatGPT paskyros negali prisijungti prie B1.
- **Jūsų B1 prisijungimas** su teise tvarkyti bažnyčios nustatymus (reikalinga raktui sukurti). Neturite? Kreipkitės į savo bažnyčios B1 administratorių.

</div>

:::tip Rekomenduojama: pirmiausia išbandykite Claude — jis nemokamas
[Claude](./claude) prisijungia prie B1 **nemokamame plane** ir nusistato mažiau nei per 3 minutes — tiesiog pridėkite B1 kaip jungtį ir prisijunkite su savo B1 paskyra. Rakto nereikia. Tai lengviausias būdas jūsų bažnyčiai išbandyti DI su B1 prieš mokant už bet ką.
:::

## Nustatymas

Ekranai jūsų ChatGPT versijoje gali atrodyti šiek tiek kitaip.

---

**1 žingsnis — sukurkite savo B1 raktą**

Raktas leidžia ChatGPT prisijungti prie *jūsų* bažnyčios B1 — laikykite jį tarsi slaptažodį tik ChatGPT.

1. Prisijunkite prie [B1 Admin](https://admin.b1.church) ir eikite į [Settings → Developer](https://admin.b1.church/settings/developer).
2. Skirtuke **API Keys** spustelėkite **New API Key** ir pavadinkite jį `ChatGPT`.
3. **Leidimai (Scopes):** pažymėkite, ką ChatGPT gali daryti. Kiekviena sritis turi langelį **read** (tik peržiūra) ir langelį **write** (keitimas). Nesate tikri? Pradžiai pažymėkite tik **read** langelius.
4. Spustelėkite **Save**, tada **Copy** nukopijuokite raktą (jis prasideda `cak_`). Jis rodomas tik vieną kartą.

---

**2 žingsnis — ChatGPT apatiniame kairiajame kampe spustelėkite savo vardą**

![Spustelėkite savo profilio vardą](/img/guides/chatgpt-mcp/01.png)

---

**3 žingsnis — spustelėkite Settings**

![Spustelėkite Settings meniu](/img/guides/chatgpt-mcp/02.png)

---

**4 žingsnis — kairiajame šoniniame meniu spustelėkite Plugins**

![Spustelėkite Plugins skiltyje Integrations](/img/guides/chatgpt-mcp/03.png)

---

**5 žingsnis — spustelėkite skirtuką MCPs**

![Spustelėkite skirtuką MCPs](/img/guides/chatgpt-mcp/04.png)

Čia matysite visus jau pridėtus MCP serverius.

---

**6 žingsnis — spustelėkite Add → Add MCP server**

![Spustelėkite Add, tada Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**7 žingsnis — užpildykite formą ir spustelėkite Save**

![Pasirinktinio MCP serverio prijungimo forma](/img/guides/chatgpt-mcp/07.png)

Spustelėkite **Streamable HTTP**, tada užpildykite:

| Laukas | Ką įvesti |
|---|---|
| **Name** | `B1 Church` (arba bet koks norimas pavadinimas) |
| **Type** | Spustelėkite **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Palikite tuščią |
| **Headers** | Spustelėkite **+ Add header** → Key: `Authorization` → Value: žr. žemiau |

![Užpildytas pavyzdys: Authorization lauke Key, o Value lauke Bearer ir raktas](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_jusu_raktas` — žodis Bearer, tarpas, tada jūsų raktas

Spustelėkite **Save**.

Štai ir viskas! Grįžkite į pokalbį ir paklauskite, pavyzdžiui, *„Kiek žmonių priklauso mūsų bažnyčiai?“* — ChatGPT atsakymą paims tiesiai iš B1.

---

## Ar tai saugu?

- ChatGPT mato tik **jūsų bažnyčios** duomenis.
- Jis gali daryti tik tai, ką leidžia jūsų raktas — raktas su pažymėtais tik **read** langeliais gali tik peržiūrėti ir niekada nieko nepakeis.
- Norėdami tai išjungti, B1 Admin ištrinkite raktą skiltyje **Settings → Developer**. Prieiga iš karto nutrūksta.

## Kiek tai kainuoja?

B1 jungtis nemokama — ji yra ChurchApps dalis. Prisijungimui prie ChatGPT reikalinga mokama prenumerata (Plus ar aukštesnė); žr. OpenAI kainas.

## Techninė informacija

Likusi šio puslapio dalis skirta techniniams vartotojams ir DI asistentams. B1 MCP serveris pasiekiamas adresu `https://api.churchapps.org/mcp` (Streamable HTTP) ir priima API raktą kaip `Authorization: Bearer cak_…` antraštę. Žr. [MCP Server developer reference](/docs/developer/api/mcp).

### Custom GPT su Actions

Custom GPT leidžia sukurti specialų asistentą, kuriuo gali naudotis visa jūsų komanda — jie atidaro nuorodą ir pradeda klausti be jokio papildomo nustatymo. Tam reikia ChatGPT Plus, Team ar Enterprise paskyros ir maždaug 10 minučių.

#### 1. Sukurkite API raktą

Jei dar to nepadarėte, atlikite 1 žingsnį iš skyrelio Nustatymas aukščiau.

#### 2. Sukurkite Custom GPT

1. ChatGPT spustelėkite savo profilį → **My GPTs** → **Create a GPT**.
2. Pereikite į skirtuką **Configure**, suteikite GPT pavadinimą (pvz., „B1 Assistant“) ir pridėkite instrukcijas:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Slinkite iki **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** įklijuokite savo `cak_…` raktą
   - **Auth Type:** Bearer
   - Išsaugokite.

4. Lauke **Schema** įklijuokite šią pradinę OpenAPI specifikaciją:

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

5. Išsaugokite veiksmą. Išbandykite: *„kiek žmonių priklauso bažnyčiai?“* — ChatGPT iškvies `listPeople` ir atsakys.
6. **Publikuokite** GPT (Only me / Anyone with link / Organization) ir pasidalykite nuoroda su komanda.

#### 3. Naudojimas

Kiekvienas, turintis nuorodą, gali užduoti klausimus natūralia kalba. Rakto leidimai vis tiek galioja — tik skaitymo raktas atmes bet kokius rašymo veiksmus, nepriklausomai nuo to, ką sako veiksmo schema.

---

### Saugumas ir apribojimai

- **Izoliacija pagal bažnyčią.** API raktas susietas tik su viena bažnyčia. ChatGPT negali matyti kitų bažnyčių duomenų.
- **Prieiga pagal leidimus.** Raktas turi tik jūsų suteiktus leidimus. Pašalinus leidimą (ištrynus ir vėl sukūrus raktą), ta prieiga nutrūksta kitame užklausos kartu.
- **Galima atšaukti akimirksniu.** Ištrinkite raktą **Settings → Developer → API Keys**, ir prieiga iš karto nutrūksta.
- **Custom GPT dalijimasis reiškia duomenų dalijimąsi.** Visi, turintys prieigą prie GPT, mato viską, ką leidžia rakto leidimai. Plačiai bendrinamiems GPT pirmenybę teikite siauresniems leidimams (pvz., neįtraukite `donations:read`).
- **Audito žurnalas.** Visi per ChatGPT atlikti pakeitimai įrašomi į tą patį audito žurnalą kaip ir B1 Admin veiksmai — rasite juos **Settings → Audit Log**.

### Trikčių šalinimas

**MCP jungtis rodo „Unauthorized“ arba 401 klaidą:** jūsų API rakto nėra arba jis neteisingas. Atidarykite jungties nustatymus ir patikrinkite **Authorization** antraštę: reikšmė turi būti žodis `Bearer`, vienas tarpas, tada visas `cak_…` raktas be papildomų tarpų.

**ChatGPT sako, kad negali rasti tam tikrų duomenų:** raktui gali trūkti reikiamų leidimų. Sukurkite naują raktą **Settings → Developer → API Keys** su papildomais leidimais ir atnaujinkite jungtį.

**Custom GPT veiksmas grąžina 401:** veiksmo autentifikavimo skydelyje patikrinkite, ar pasirinkta **Auth Type: Bearer**, ir ar raktas nebeturi žodžio `Bearer` (ChatGPT jį prideda automatiškai).

**Custom GPT veiksmas grąžina 403:** raktas neturi leidimo tam galutiniam taškui. Sukurkite naują raktą su tinkamais leidimais ir atnaujinkite GPT.

**Veiksmo schema atmetama:** ChatGPT reikalauja OpenAPI 3.1 su bent vienu `paths` įrašu ir `servers` URL. Prieš įklijuodami patikrinkite YAML adresu [editor.swagger.io](https://editor.swagger.io).

## Susiję

- [API Keys](/docs/developer/api/api-keys) — visas leidimų sąrašas
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protokolo detalės ir įrankių schemos
- [Claude](./claude) — tas pats principas, bet Anthropic modeliams
- [REST API reference](/docs/developer/api/endpoints) — visi galutiniai taškai, kuriuos gali kviesti Custom GPT veiksmas
