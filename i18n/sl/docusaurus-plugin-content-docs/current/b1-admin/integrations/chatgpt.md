---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Povežite ChatGPT s podatki svoje cerkve v B1 in ga vprašajte v običajnem jeziku — odgovarja na podlagi vaših živih evidenc v cerkvi. Prosite ga lahko tudi, naj vam pomaga pri opravilih, ki bi v B1 Admin zahtevala več korakov.

**Nekaj stvari, ki jih lahko vprašate:**
- *"Pokaži mi vse, ki so bili prejšnji teden na srečanju, pa še niso bili dodeljeni skupini za male skupine"*
- *"Povzemi letošnje darove po skladih za ta mesec"*
- *"Kdo so naši najnovejši člani in ali smo jih že kontaktirali?"*
- *"Ne znam najti, kako v B1 narediti X — mi lahko pokažeš korak za korakom?"*

</div>

<div class="prereqs">
<h4>Kaj potrebujete</h4>

- **Namizno aplikacijo ChatGPT** za Mac ali Windows
- **Plačljiv paket ChatGPT** (Plus ali višji). Brezplačni računi ChatGPT se ne morejo povezati z B1.
- **Vašo prijavo v B1** z dovoljenjem za upravljanje nastavitev cerkve (potrebno za ustvarjanje ključa). Če je nimate, vprašajte skrbnika B1 v vaši cerkvi.

</div>

:::tip Priporočilo: najprej poskusite Claude — je brezplačen
[Claude](./claude) se z B1 poveže v **brezplačnem paketu** in se nastavi v manj kot 3 minutah — samo dodajte B1 kot konektor in se prijavite s svojim računom B1. Ključ ni potreben. To je najlažji način, da vaša cerkev preizkusi umetno inteligenco z B1, preden za kar koli plača.
:::

## Nastavitev

Zasloni se v vaši različici ChatGPT lahko nekoliko razlikujejo.

---

**1. korak — ustvarite svoj ključ B1**

Ključ je tisto, kar ChatGPT omogoča dostop do *B1 vaše cerkve* — razmišljajte o njem kot o geslu samo za ChatGPT.

1. Prijavite se v [B1 Admin](https://admin.b1.church) in pojdite na [Nastavitve → Razvijalec](https://admin.b1.church/settings/developer).
2. Na zavihku **API Keys** kliknite **New API Key** in ga poimenujte `ChatGPT`.
3. **Obsegi:** označite, kaj sme ChatGPT početi. Vsako področje ima polje **read** (samo ogled) in polje **write** (spreminjanje). Niste prepričani? Za začetek označite le polja **read**.
4. Kliknite **Save**, nato **Copy** za kopiranje ključa (začne se z `cak_`). Prikazan je samo enkrat.

---

**2. korak — kliknite svoje ime v spodnjem levem kotu ChatGPT**

![Kliknite svoje ime profila](/img/guides/chatgpt-mcp/01.png)

---

**3. korak — kliknite Settings (Nastavitve)**

![Kliknite Settings v meniju](/img/guides/chatgpt-mcp/02.png)

---

**4. korak — v levi stranski vrstici kliknite Plugins (Vtičniki)**

![Kliknite Plugins pod Integrations](/img/guides/chatgpt-mcp/03.png)

---

**5. korak — kliknite zavihek MCPs**

![Kliknite zavihek MCPs](/img/guides/chatgpt-mcp/04.png)

Tukaj boste videli vse strežnike MCP, ki ste jih že dodali.

---

**6. korak — kliknite Add → Add MCP server**

![Kliknite Add, nato Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**7. korak — izpolnite obrazec in kliknite Save**

![Obrazec za povezavo z lastnim strežnikom MCP](/img/guides/chatgpt-mcp/07.png)

Kliknite **Streamable HTTP**, nato izpolnite:

| Polje | Kaj vnesti |
|---|---|
| **Name** | `B1 Church` (ali poljubno ime) |
| **Type** | Kliknite **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Pustite prazno |
| **Headers** | Kliknite **+ Add header** → Key: `Authorization` → Value: glejte spodaj |

![Primer izpolnjenega polja: Authorization v Key in ključ Bearer v Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_vaš_ključ` — beseda Bearer, presledek in vaš ključ

Kliknite **Save**.

To je vse! Vrnite se v klepet in vprašajte nekaj takega kot *"Koliko ljudi je v naši cerkvi?"*, ChatGPT pa bo odgovor pridobil neposredno iz B1.

---

## Ali je varno?

- ChatGPT lahko vidi samo **podatke vaše cerkve**.
- Lahko naredi samo to, kar dovoljuje vaš ključ — ključ z označenimi samo poljami **read** lahko samo gleda, nikoli pa ničesar ne spremeni.
- Če ga želite izklopiti, izbrišite ključ v B1 Admin pod **Nastavitve → Razvijalec**. Dostop se ustavi takoj.

## Koliko stane?

Povezava z B1 je brezplačna — del je ChurchApps. ChatGPT za povezavo potrebuje plačljiv paket (Plus ali višji); cene si oglejte na strani OpenAI.

## Tehnične podrobnosti

Preostanek te strani je namenjen tehničnim uporabnikom in pomočnikom umetne inteligence. Strežnik MCP B1 je na naslovu `https://api.churchapps.org/mcp` (Streamable HTTP) in sprejme API ključ kot glavo `Authorization: Bearer cak_…`. Oglejte si [referenco za razvijalce strežnika MCP](/docs/developer/api/mcp).

### Custom GPT z Actions

Custom GPT vam omogoča ustvariti namenskega pomočnika, ki ga lahko deli vsa vaša ekipa — odprejo povezavo in začnejo zastavljati vprašanja brez kakršne koli nastavitve na svoji strani. Potrebujete račun ChatGPT Plus, Team ali Enterprise in približno 10 minut.

#### 1. Ustvarite API ključ

Če še niste, sledite 1. koraku v razdelku Nastavitev zgoraj.

#### 2. Zgradite Custom GPT

1. V ChatGPT kliknite svoj profil → **My GPTs** → **Create a GPT**.
2. Preklopite na zavihek **Configure**, dajte GPT-ju ime (npr. "B1 Assistant") in dodajte navodila:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Pomaknite se do **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** prilepite svoj ključ `cak_…`
   - **Auth Type:** Bearer
   - Shranite.

4. V polje **Schema** prilepite ta začetni specifikacijski dokument OpenAPI:

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

5. Shranite akcijo. Preizkusite jo: *"koliko ljudi je v cerkvi?"* — ChatGPT pokliče `listPeople` in odgovori.
6. **Objavite** GPT (Only me / Anyone with link / Organization) in delite povezavo s svojo ekipo.

#### 3. Uporaba

Kdor koli s povezavo lahko zastavlja vprašanja v naravnem jeziku. Obsegi ključa še vedno veljajo — ključ samo za branje zavrne vse spremembe, ne glede na to, kaj piše v shemi akcij.

---

### Varnost in omejitve

- **Ločenost po cerkvah.** API ključ pripada eni sami cerkvi. ChatGPT ne more videti podatkov drugih cerkva.
- **Omejitev z dovoljenji.** Ključ prenaša samo obsege, ki ste jih dodelili. Če obseg odstranite (z izbrisom in ponovno ustvaritvijo ključa), se ta dostop ukine pri naslednjem klicu.
- **Takojšen preklic.** Izbrišite ključ v **Nastavitve → Razvijalec → API Keys** in dostop se takoj konča.
- **Deljenje Custom GPT deli tudi podatke.** Vsi, ki imajo dostop do GPT-ja, lahko vidijo vse, kar dovoljujejo obsegi ključa. Za široko deljene GPT-je raje uporabite ožje obsege (npr. izpustite `donations:read`).
- **Revizijska sled.** Vse spremembe, narejene prek ChatGPT, gredo skozi isti dnevnik revizij kot dejanja v B1 Admin — najdete ga pod **Nastavitve → Dnevnik revizij**.

### Odpravljanje težav

**Konektor MCP sporoča "Unauthorized" ali kaže napako 401:** vaš API ključ manjka ali je napačen. Odprite nastavitve konektorja in preverite glavo **Authorization**: vrednost mora biti beseda `Bearer`, en presledek, nato celoten ključ `cak_…` brez dodatnih presledkov.

**ChatGPT sporoča, da ne more najti določenih podatkov:** ključ morda nima ustreznih obsegov. V **Nastavitve → Razvijalec → API Keys** ustvarite nov ključ z dodatnimi obsegi in posodobite konektor.

**Akcija Custom GPT vrne 401:** v panelu za avtentikacijo akcije preverite, ali je izbran **Auth Type: Bearer**, in ali ključ ne vsebuje besede `Bearer` (ChatGPT jo doda samodejno).

**Akcija Custom GPT vrne 403:** ključ nima obsega za to končno točko. Ustvarite nov ključ s pravilnimi obsegi in posodobite GPT.

**Shema akcije je zavrnjena:** ChatGPT zahteva OpenAPI 3.1 z vsaj enim vnosom `paths` in naslovom `servers`. Preden prilepite, preverite YAML na [editor.swagger.io](https://editor.swagger.io).

## Povezano

- [API ključi](/docs/developer/api/api-keys) — celoten seznam obsegov
- [Strežnik MCP (referenca za razvijalce)](/docs/developer/api/mcp) — podrobnosti protokola in sheme orodij
- [Claude](./claude) — isti koncept, za modele podjetja Anthropic
- [Referenca REST API](/docs/developer/api/endpoints) — vse končne točke, ki jih lahko kliče Custom GPT akcija
