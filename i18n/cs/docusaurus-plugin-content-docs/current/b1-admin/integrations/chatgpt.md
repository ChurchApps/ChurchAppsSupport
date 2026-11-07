---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Připojte ChatGPT k datům vaší církve v B1 a ptejte se ho běžným jazykem — odpovídá z aktuálních záznamů vaší církve. Můžete ho také požádat o pomoc s úkoly, které by v B1 Admin vyžadovaly několik kroků.

**Něco, na co se můžete zeptat:**
- *„Ukaž mi všechny, kdo minulý týden přišli, ale nejsou přiřazeni k žádné malé skupině“*
- *„Shrň tento měsíc darování podle fondu“*
- *„Kdo jsou naši nejnovější členové a navázali jsme s nimi už kontakt?“*
- *„Nedaří se mi zjistit, jak v B1 udělat X — můžete mě provést postupem?“*

</div>

<div class="prereqs">
<h4>Co potřebujete</h4>

- **Aplikaci ChatGPT pro desktop** pro Mac nebo Windows
- **Placený tarif ChatGPT** (Plus nebo vyšší). Bezplatné účty ChatGPT se k B1 připojit nedají.
- **Přihlášení do B1** s oprávněním spravovat nastavení církve (potřebné k vytvoření klíče). Nemáte ho? Zeptejte se správce B1 ve vaší církvi.

</div>

:::tip Doporučeno: nejprve zkuste Claude — je zdarma
[Claude](./claude) se připojí k B1 v **bezplatném tarifu** a nastaví se za méně než 3 minuty — stačí přidat B1 jako konektor a přihlásit se svým účtem B1. Klíč není potřeba. Je to nejsnazší způsob, jak může vaše církev vyzkoušet AI s B1, než za cokoli zaplatí.
:::

## Nastavení

Obrazovky se ve vaší verzi ChatGPT mohou mírně lišit.

---

**Krok 1 — Vytvořte svůj klíč B1**

Klíč umožňuje ChatGPT přístup k *vaší* církvi v B1 — představte si ho jako heslo jen pro ChatGPT.

1. Přihlaste se do [B1 Admin](https://admin.b1.church) a přejděte na [Settings → Developer](https://admin.b1.church/settings/developer).
2. Na kartě **API Keys** klikněte na **New API Key** a pojmenujte ho `ChatGPT`.
3. **Scopes (oprávnění):** zaškrtněte, co smí ChatGPT dělat. Každá oblast má políčko **read** (pouze čtení) a políčko **write** (provádění změn). Nejste si jisti? Na začátku zaškrtněte jen políčka **read**.
4. Klikněte na **Save** a poté na **Copy**, čímž zkopírujete klíč (začíná `cak_`). Zobrazí se pouze jednou.

---

**Krok 2 — Klikněte na své jméno v levém dolním rohu ChatGPT**

![Klikněte na své jméno profilu](/img/guides/chatgpt-mcp/01.png)

---

**Krok 3 — Klikněte na Settings**

![Klikněte na Settings v nabídce](/img/guides/chatgpt-mcp/02.png)

---

**Krok 4 — V levém postranním panelu klikněte na Plugins**

![Klikněte na Plugins v sekci Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Krok 5 — Klikněte na kartu MCPs**

![Klikněte na kartu MCPs](/img/guides/chatgpt-mcp/04.png)

Zobrazí se zde všechny servery MCP, které jste již přidali.

---

**Krok 6 — Klikněte na Add → Add MCP server**

![Klikněte na Add a poté na Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Krok 7 — Vyplňte formulář a klikněte na Save**

![Formulář pro připojení vlastního serveru MCP](/img/guides/chatgpt-mcp/07.png)

Klikněte na **Streamable HTTP** a poté vyplňte:

| Pole | Co zadat |
|---|---|
| **Name** | `B1 Church` (nebo libovolný název) |
| **Type** | Klikněte na **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Nechte prázdné |
| **Headers** | Klikněte na **+ Add header** → Key: `Authorization` → Value: viz níže |

![Ukázkově vyplněný formulář: Authorization v poli Key a klíč Bearer v poli Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — slovo Bearer, mezera a váš klíč

Klikněte na **Save**.

Hotovo! Vraťte se do chatu a zeptejte se něčeho jako *„Kolik lidí je v naší církvi?“* a ChatGPT odpověď načte přímo z B1.

---

## Je to bezpečné?

- ChatGPT vidí pouze data **vaší církve**.
- Může dělat pouze to, co váš klíč povoluje — klíč se zaškrtnutými pouze políčky **read** může data jen prohlížet a nikdy nic nezmění.
- Chcete-li ho vypnout, smažte klíč v B1 Admin v sekci **Settings → Developer**. Přístup se okamžitě ukončí.

## Kolik to stojí?

Připojení k B1 je zdarma — je součástí ChurchApps. ChatGPT pro připojení vyžaduje placený tarif (Plus nebo vyšší); ceny najdete na stránce OpenAI.

## Technické podrobnosti

Zbytek této stránky je určen pro technické uživatele a AI asistenty. Server MCP v B1 je dostupný na `https://api.churchapps.org/mcp` (Streamable HTTP) a API klíč přijímá jako hlavičku `Authorization: Bearer cak_…`. Viz [referenční příručka pro vývojáře k serveru MCP](/docs/developer/api/mcp).

### Vlastní GPT s akcemi

Vlastní GPT vám umožní vytvořit specializovaného asistenta, který může sdílet celý váš tým — otevřou odkaz a začnou klást dotazy bez jakéhokoli nastavení. Vyžaduje účet ChatGPT Plus, Team nebo Enterprise a přibližně 10 minut.

#### 1. Vytvořte API klíč

Pokud jste tak ještě neudělali, postupujte podle kroku 1 v části Nastavení výše.

#### 2. Vytvořte vlastní GPT

1. V ChatGPT klikněte na svůj profil → **My GPTs** → **Create a GPT**.
2. Přepněte na kartu **Configure**, dejte GPT název (např. „B1 Assistant“) a přidejte instrukce:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Přejděte na **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** vložte svůj klíč `cak_…`
   - **Auth Type:** Bearer
   - Uložte.

4. Do pole **Schema** vložte tuto výchozí specifikaci OpenAPI:

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

5. Akci uložte. Otestujte ji dotazem: *„kolik lidí je v církvi?“* — ChatGPT zavolá `listPeople` a odpoví.
6. GPT **publikujte** (Only me / Anyone with link / Organization) a sdílejte odkaz se svým týmem.

#### 3. Použití

Každý, kdo má odkaz, může klást dotazy přirozeným jazykem. Oprávnění klíče se stále uplatňují — klíč pouze pro čtení odmítne zápisy bez ohledu na to, co říká schéma akce.

---

### Bezpečnost a omezení

- **Izolace podle církve.** API klíč patří pouze jedné církvi. ChatGPT nemůže vidět data jiných církví.
- **Omezení oprávněními.** Klíč nese pouze oprávnění, která jste udělili. Odebráním oprávnění (smazáním a vytvořením nového klíče) se tento přístup zruší při dalším volání.
- **Okamžité zrušení.** Smažte klíč v **Settings → Developer → API Keys** a přístup se okamžitě ukončí.
- **Sdílení vlastního GPT znamená sdílení dat.** Každý, kdo má k GPT přístup, uvidí vše, co oprávnění klíče povolují. U GPT sdílených široce dávejte přednost užším oprávněním (např. vynechte `donations:read`).
- **Auditní záznam.** Všechny změny provedené přes ChatGPT procházejí stejným auditním protokolem jako akce v B1 Admin — najdete je v **Settings → Audit Log**.

### Řešení potíží

**Konektor MCP hlásí „Unauthorized“ nebo zobrazuje chybu 401:** váš API klíč chybí nebo je nesprávný. Otevřete nastavení konektoru a zkontrolujte hlavičku **Authorization**: hodnota musí být slovo `Bearer`, jedna mezera a pak celý klíč `cak_…` bez dalších mezer.

**ChatGPT tvrdí, že určitá data nenajde:** klíč možná nemá správná oprávnění. V **Settings → Developer → API Keys** vytvořte nový klíč s dalšími oprávněními a aktualizujte konektor.

**Akce vlastního GPT vrací 401:** v panelu ověřování akce zkontrolujte, že je vybrán **Auth Type: Bearer** a že klíč neobsahuje slovo `Bearer` (ChatGPT ho přidá automaticky).

**Akce vlastního GPT vrací 403:** klíč nemá oprávnění pro tento koncový bod. Vytvořte nový klíč se správnými oprávněními a aktualizujte GPT.

**Schéma akce je odmítnuto:** ChatGPT vyžaduje OpenAPI 3.1 s alespoň jedním záznamem `paths` a adresou `servers`. Před vložením ověřte YAML na [editor.swagger.io](https://editor.swagger.io).

## Související

- [API Keys](/docs/developer/api/api-keys) — úplný přehled oprávnění
- [MCP Server (referenční příručka pro vývojáře)](/docs/developer/api/mcp) — podrobnosti protokolu a schémata nástrojů
- [Claude](./claude) — stejná myšlenka, pro modely Anthropic
- [Referenční příručka REST API](/docs/developer/api/endpoints) — všechny koncové body, které může volat akce vlastního GPT
