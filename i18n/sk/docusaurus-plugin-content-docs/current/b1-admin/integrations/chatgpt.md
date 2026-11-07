---
title: "ChatGPT"
description: "Pripojte ChatGPT k dátam vášho zboru v B1 pomocou API kľúča a kladte otázky o ľuďoch, daroch a účasti v B1 Admin v jednoduchom jazyku."
---

# ChatGPT

<div class="article-intro">

Pripojte ChatGPT k údajom vašej cirkvi v B1 a kladte mu otázky jednoduchým jazykom. Odpovedá na základe aktuálnych záznamov vašej cirkvi. Môžete ho tiež požiadať o pomoc s úlohami, ktoré by v B1 Admin vyžadovali viacero krokov.

**Niečo, čo sa môžete opýtať:**
- *„Ukáž mi všetkých, ktorí minulý týždeň prišli na bohoslužbu, ale zatiaľ nie sú zaradení do malej skupiny“*
- *„Zhrň tohtomesačné dary podľa fondu“*
- *„Kto sú naši najnovší členovia a nadviazali sme s nimi kontakt?“*
- *„Neviem, ako v B1 urobiť X. Môžeš ma previesť jednotlivými krokmi?“*

</div>

<div class="prereqs">
<h4>Čo potrebujete</h4>

- **Desktopovú aplikáciu ChatGPT** pre Mac alebo Windows
- **Platený plán ChatGPT** (Plus alebo vyšší). Bezplatné účty ChatGPT sa k B1 pripojiť nedajú.
- **Prihlasovacie údaje do B1** s oprávnením spravovať nastavenia cirkvi (potrebné na vytvorenie kľúča). Nemáte ich? Opýtajte sa správcu B1 vo vašej cirkvi.

</div>

:::tip Odporúčanie: najprv skúste Claude, je zadarmo
[Claude](./claude.md) sa pripája k B1 v **bezplatnom pláne** a nastavenie trvá menej ako 3 minúty. Stačí pridať B1 ako konektor a prihlásiť sa svojím účtom B1. Kľúč nie je potrebný. Je to najjednoduchší spôsob, ako môže vaša cirkev vyskúšať AI s B1, skôr než za niečo zaplatí.
:::

## Nastavenie

Obrazovky sa vo vašej verzii ChatGPT môžu mierne líšiť.

---

**Krok 1: Vytvorte si kľúč B1**

Kľúč je to, čo pustí ChatGPT do *vašej* cirkvi v B1. Predstavte si ho ako heslo určené len pre ChatGPT.

1. Prihláste sa do [B1 Admin](https://admin.b1.church) a prejdite na [Settings → Developer](https://admin.b1.church/settings/developer).
2. Na karte **API Keys** kliknite na **New API Key** a pomenujte ho `ChatGPT`.
3. **Scopes:** zaškrtnite, čo smie ChatGPT robiť. Každá oblasť má políčko **read** (iba čítanie) a políčko **write** (vykonávanie zmien). Nie ste si istí? Na začiatok zaškrtnite iba políčka **read**.
4. Kliknite na **Save** a potom na **Copy**, aby ste kľúč skopírovali. Začína sa na `cak_` a zobrazí sa iba raz.

---

**Krok 2: Kliknite na svoje meno v ľavom dolnom rohu ChatGPT**

![Kliknutie na názov profilu](/img/guides/chatgpt-mcp/01.png)

---

**Krok 3: Kliknite na Settings**

![Kliknutie na Settings v ponuke](/img/guides/chatgpt-mcp/02.png)

---

**Krok 4: V ľavom bočnom paneli kliknite na Plugins**

![Kliknutie na Plugins v sekcii Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Krok 5: Kliknite na kartu MCPs**

![Kliknutie na kartu MCPs](/img/guides/chatgpt-mcp/04.png)

Tu uvidíte všetky servery MCP, ktoré ste už pridali.

---

**Krok 6: Kliknite na Add → Add MCP server**

![Kliknutie na Add a potom na Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Krok 7: Vyplňte formulár a kliknite na Save**

![Formulár Connect to a custom MCP](/img/guides/chatgpt-mcp/07.png)

Kliknite na **Streamable HTTP** a potom vyplňte:

| Pole | Čo zadať |
|---|---|
| **Name** | `B1 Church` (alebo ľubovoľný názov) |
| **Type** | Kliknite na **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Nechajte prázdne |
| **Headers** | Kliknite na **+ Add header** → Key: `Authorization` → Value: pozri nižšie |

![Vyplnený príklad, v ktorom je Authorization v poli Key a Bearer kľúč v poli Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_vas_kluc`: slovo Bearer, medzera a váš kľúč

Kliknite na **Save**.

Hotovo! Vráťte sa do konverzácie a opýtajte sa niečo ako *„Koľko ľudí je v našej cirkvi?“* ChatGPT odpoveď načíta priamo z B1.

---

## Je to bezpečné?

- ChatGPT vidí iba údaje **vašej cirkvi**.
- Môže robiť iba to, čo váš kľúč povoľuje. Kľúč so zaškrtnutými iba políčkami **read** môže len prezerať a nikdy nič nezmení.
- Ak ho chcete vypnúť, vymažte kľúč v B1 Admin v **Settings → Developer**. Prístup sa okamžite zruší.

## Čo to stojí?

Pripojenie k B1 je zadarmo, pretože je súčasťou ChurchApps. ChatGPT na pripojenie vyžaduje platený plán (Plus alebo vyšší). Pozrite si cenník OpenAI.

## Technické detaily

Zvyšok tejto stránky je určený pre technických používateľov a AI asistentov. MCP server B1 beží na `https://api.churchapps.org/mcp` (Streamable HTTP) a API kľúč prijíma ako hlavičku `Authorization: Bearer cak_…`. Pozrite si [referenciu pre vývojárov: MCP Server](/docs/developer/api/mcp).

### Custom GPT s Actions

Custom GPT vám umožní vytvoriť vyhradeného asistenta, ktorého môže zdieľať celý tím. Členovia tímu otvoria odkaz a môžu začať klásť otázky bez akéhokoľvek nastavovania. Vyžaduje účet ChatGPT Plus, Team alebo Enterprise a približne 10 minút.

#### 1. Vytvorte API kľúč

Ak ste to ešte neurobili, postupujte podľa kroku 1 v časti Nastavenie vyššie.

#### 2. Vytvorte Custom GPT

1. V ChatGPT kliknite na svoj profil → **My GPTs** → **Create a GPT**.
2. Prepnite na kartu **Configure**, dajte GPT názov (napr. „B1 Assistant“) a pridajte pokyny:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Prejdite na **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** vložte svoj kľúč `cak_…`
   - **Auth Type:** Bearer
   - Uložte.

4. Do poľa **Schema** vložte tento počiatočný OpenAPI špecifikačný súbor:

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

5. Uložte akciu. Otestujte ju otázkou *„koľko ľudí je v cirkvi?“*. ChatGPT zavolá `listPeople` a odpovie.
6. **Publikujte** GPT (Only me / Anyone with link / Organization) a zdieľajte odkaz so svojím tímom.

#### 3. Používanie

Ktokoľvek s odkazom môže klásť otázky v prirodzenom jazyku. Rozsahy kľúča stále platia. Kľúč iba na čítanie odmietne zápisy bez ohľadu na to, čo hovorí schéma akcie.

---

### Bezpečnosť a obmedzenia

- **Izolácia podľa cirkvi.** API kľúč patrí iba jednej cirkvi. ChatGPT nemôže vidieť údaje iných cirkví.
- **Oprávnenia podľa rozsahu.** Kľúč nesie iba rozsahy, ktoré ste udelili. Odstránenie rozsahu (vymazaním a znovuvytvorením kľúča) ukončí daný prístup pri ďalšom volaní.
- **Okamžité odvolanie.** Vymažte kľúč v **Settings → Developer → API Keys** a prístup sa okamžite skončí.
- **Zdieľanie Custom GPT zdieľa aj údaje.** Každý, kto má prístup k GPT, môže vidieť všetko, čo rozsahy kľúča povoľujú. Pri široko zdieľaných GPT používajte užšie rozsahy (napr. vynechajte `donations:read`).
- **Auditná stopa.** Zmeny vykonané cez ChatGPT prechádzajú rovnakým auditným záznamom ako akcie v B1 Admin. Nájdete ich v **Settings → Audit Log**.

### Riešenie problémov

**Konektor MCP hlási „Unauthorized“ alebo zobrazuje chybu 401:** váš API kľúč chýba alebo je nesprávny. Otvorte nastavenia konektora a skontrolujte hlavičku **Authorization**. Hodnota má byť slovo `Bearer`, jedna medzera a potom celý kľúč `cak_…` bez ďalších medzier.

**ChatGPT hovorí, že niektoré údaje nenašiel:** kľúč možno nemá správne rozsahy. Vytvorte nový kľúč v **Settings → Developer → API Keys** s potrebnými ďalšími rozsahmi a aktualizujte konektor.

**Akcia Custom GPT vracia 401:** v paneli autentifikácie akcie overte, že je vybraný **Auth Type: Bearer** a že kľúč neobsahuje slovo `Bearer`, pretože ChatGPT ho pridá automaticky.

**Akcia Custom GPT vracia 403:** kľúč nemá rozsah pre daný endpoint. Vytvorte nový kľúč so správnymi rozsahmi a aktualizujte GPT.

**Schéma akcie je odmietnutá:** ChatGPT vyžaduje OpenAPI 3.1 s aspoň jedným záznamom `paths` a URL v `servers`. Pred vložením overte YAML na [editor.swagger.io](https://editor.swagger.io).

## Súvisiace

- [API Keys](/docs/developer/api/api-keys): úplný prehľad rozsahov
- [MCP Server (referencia pre vývojárov)](/docs/developer/api/mcp): podrobnosti protokolu a schémy nástrojov
- [Claude](./claude.md): to isté, ale pre modely Anthropic
- [REST API referencia](/docs/developer/api/endpoints): každý endpoint, ktorý môže volať Custom GPT akcia
