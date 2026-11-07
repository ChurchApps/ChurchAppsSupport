---
title: "Claude"
---

# Claude

<div class="article-intro">

Požiadajte Claude o informácie o vašom kostole jednoduchou slovenčinou a odpovie na základe vašich údajov v B1 — vrátane vašich lekcií a miestností pre deti vo FreePlay. Môžete sa spýtať otázky ako *„koľko prvonávštevníkov prišlo v nedeľu?“* alebo *„kto sa tento mesiac pridal do malej skupiny?“* — alebo ho požiadať o úlohy, napríklad *„pridaj na našu webovú stránku novú stránku s názvom Udalosti.“* Nastavenie trvá menej ako 3 minúty a nepotrebujete žiadne technické zručnosti ani inštaláciu softvéru.

</div>

<div class="prereqs">
<h4>Čo potrebujete</h4>

- **Účet Claude.** **Bezplatný plán funguje** — je to dobrý spôsob, ako si to vyskúšať. Bezplatné účty však majú denný limit správ a vyhľadávanie v B1 spotrebúva správy rýchlo, preto ak ho používate pravidelne, odporúčame **Claude Pro** (približne 20 USD mesačne).
- **Vaše prihlasovacie údaje do B1** — rovnaké, aké používate pre B1 Admin.

</div>

:::tip Odporúčané — môžete vyskúšať zadarmo
Claude je najjednoduchší spôsob, ako pripojiť B1 k umelej inteligencii, a funguje na **bezplatnom pláne** Claude — ideálny spôsob, ako si váš kostol môže vyskúšať túto možnosť skôr, než za niečo zaplatí.
:::

Existujú dva spôsoby pripojenia. **Možnosť 1 je najjednoduchšia** — nepotrebujete kľúč a nič nemusíte inštalovať.

## Možnosť 1 — Prihlásenie cez B1 (najjednoduchšie)

Funguje na webovej stránke Claude, v desktopovej aplikácii Claude a v aplikácii Claude pre telefón — nastavíte raz a funguje vo všetkých.

### Krok 1 — Otvorte nastavenia konektorov Claude

1. Choďte na [claude.ai](https://claude.ai) a prihláste sa (alebo si vytvorte bezplatný účet).
2. Kliknite na svoje meno v ľavom dolnom rohu a potom na **Settings** → **Connectors**.

### Krok 2 — Pridajte B1

1. Kliknite na **Add** a potom na **Add custom connector**.
2. **Name:** napíšte `B1`.
3. **URL:** vložte `https://api.churchapps.org/mcp`
4. Ostatné možnosti nechajte tak, ako sú, a kliknite na **Add**.

### Krok 3 — Prihláste sa do B1

1. Kliknite na **Connect**. Otvorí sa prihlasovacia stránka B1.
2. Prihláste sa svojím účtom B1. Ak patríte do viacerých kostolov, skontrolujte, či je v hornej časti zobrazený správny kostol.
3. B1 zobrazí, čo Claude žiada urobiť, a potvrdí, že budete presmerovaní späť na **claude.ai**. Kliknite na **Allow**.

Vrátite sa do Claude a B1 sa zobrazí ako pripojené.

### Krok 4 — Opýtajte sa niečo

Začnite **novú konverzáciu** a vyskúšajte napríklad:

- *„Koľko ľudí je v našom kostole?“*
- *„Vypíš aktívne skupiny.“*
- *„Zhrň tento mesiac dary podľa fondu.“*
- *„Kto sa pridal do kostola za posledných 30 dní?“*

Pri prvom použití sa Claude opýta na povolenie použiť B1 — kliknite na **Allow**.

## Možnosť 2 — Desktopové rozšírenie s kľúčom B1

Použite túto možnosť, ak chcete Claude dať kľúč s obmedzenými oprávneniami (napríklad iba na čítanie). Funguje v desktopovej aplikácii Claude pre Mac alebo Windows a na vytvorenie kľúča potrebujete oprávnenie spravovať nastavenia kostola v B1.

### Krok 1 — Získajte aplikáciu Claude

Stiahnite si aplikáciu Claude z [claude.com/download](https://claude.com/download), nainštalujte ju, otvorte a prihláste sa.

### Krok 2 — Vytvorte si kľúč B1

Kľúč umožňuje Claude prístup k B1 *vášho* kostola — predstavte si ho ako heslo výhradne pre Claude.

1. Prihláste sa do [B1 Admin](https://admin.b1.church) a choďte na [Settings → Developer](https://admin.b1.church/settings/developer).
2. Na karte **API Keys** kliknite na **New API Key**.
3. **Name:** napíšte `Claude`.
4. **Scopes:** zaškrtnite, čo smie Claude robiť. Každá oblasť má políčko **read** (iba čítanie) a políčko **write** (vykonávanie zmien). Nie ste si istí? Na začiatok zaškrtnite iba políčka **read** — neskôr môžete vytvoriť nový kľúč s väčším rozsahom.
5. Kliknite na **Save** a potom na **Copy**. Kľúč sa zobrazí iba raz, preto prejdite hneď na krok 3.

### Krok 3 — Pridajte B1 do Claude

1. [Stiahnite si rozšírenie B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dvakrát kliknite** na stiahnutý súbor (`b1-churchapps.mcpb`). Otvorí sa Claude a zobrazí **B1 (ChurchApps)**.
3. Kliknite na **Install**.
4. Keď sa vás opýta na **B1 API key**, vložte kľúč z kroku 2 a uložte ho.
5. **Úplne ukončite Claude** (Mac: **Cmd+Q** · Windows: pravým tlačidlom kliknite na ikonu Claude na paneli úloh → **Quit**) a potom ho znova otvorte.

Ak sa po dvojitom kliknutí Claude neotvorí, v aplikácii Claude choďte na **Settings → Extensions → Advanced settings → Install Extension…** a vyberte stiahnutý súbor. Potom začnite novú konverzáciu a opýtajte sa niečo.

:::tip Rozšírenie je už nainštalované?
Nemusíte nič robiť — FreePlay funguje cez to isté pripojenie. Jedinou výnimkou je verzia 1.1.0, ktorá žiadala e-mail a heslo do B1: ak ju chcete aktualizovať, stiahnite a znova nainštalujte rozšírenie. Váš kľúč zostane zachovaný.
:::

## Je to bezpečné?

- Claude vidí iba údaje **vášho kostola**.
- **Prihlásenie (Možnosť 1):** Claude nemôže urobiť viac, než môže urobiť váš vlastný prihlasovací účet B1. Prihlasovacia stránka B1 pred kliknutím na **Allow** uvádza všetko, čo Claude smie robiť.
- **S kľúčom (Možnosť 2):** Claude môže robiť iba to, čo kľúč v B1 povoľuje — kľúč iba s označenými políčkami **read** môže nahliadať, ale nikdy nemôže nič zmeniť. FreePlay funguje rovnako, pod tým istým kľúčom.
- **Ako to vypnúť:** v B1 Admin choďte na **Settings → Developer** a odvolajte aplikáciu v sekcii **Connected Apps** (Možnosť 1) alebo vymažte kľúč v sekcii **API Keys** (Možnosť 2). Prístup sa okamžite zruší. Môžete tiež kliknúť na **Disconnect** pri konektore B1 v Claude.

## Koľko to stojí?

Pripojenie k B1 je bezplatné — je súčasťou ChurchApps. Claude samotný má bezplatný plán; Claude Pro (približne 20 USD mesačne) vám poskytuje oveľa väčšie využitie. Pozrite si [claude.com/pricing](https://claude.com/pricing).

## Technické podrobnosti

Zvyšok tejto stránky je určený pre technicky zdatných používateľov a asistentov umelej inteligencie: rozsahy oprávnení, iné spôsoby pripojenia a fungovanie.

### Rozsahy oprávnení

Claude komunikuje s B1 cez **server Model Context Protocol (MCP)** zabudovaný do API B1 (`https://api.churchapps.org/mcp`). Každé volanie prechádza rovnakými pravidlami autentifikácie, oprávnení a viazania na kostol ako požiadavka z B1 Admin. Claude je obmedzený na **oprávnenia a rozsahy** API kľúča a nemá prístup k webhookom, administračným koncovým bodom OAuth ani k iným cestám vyhradeným pre prevádzkovateľa.

Bežné štartovacie sady rozsahov:

- **Asistent iba na čítanie:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Čítanie + pridávanie poznámok / úloh:** pridajte `people:write`
- **Úplný prevádzkový asistent:** pridajte príslušné `:write` rozsahy, ktoré chcete

Kľúč s `donations:read` umožňuje Claude zhrnúť dary, ale nemôže zaznamenať darček. Kľúč s `people:write` môže pridať osobu, ale nemôže vidieť dary. Pozrite si [API Keys](/docs/developer/api/api-keys), čo každý rozsah umožňuje.

### Iné spôsoby pripojenia

#### Claude Code (CLI)

V termináli:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

A to je všetko. V ľubovoľnej relácii Claude Code napíšte `/mcp`, aby ste potvrdili, že server `b1` je pripojený, a potom sa opýtajte Claude na čokoľvek o vašom kostole.

#### Claude Desktop — manuálna konfigurácia (pokročilé)

Ak nechcete používať rozšírenie, upravte konfiguračný súbor Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Pridajte záznam servera `b1`, ktorý sa pripája k B1 cez `mcp-remote` (vyžaduje [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Reštartujte Claude Desktop. Ponuka konektorov v poli na písanie správ v chate zobrazí `b1` s jeho nástrojmi.

#### Claude.ai (web) — vlastný konektor

Pozrite si **Možnosť 1** vyššie. Konektor používa OAuth 2.1: Claude zistí autorizačný server B1 z `https://api.churchapps.org/.well-known/oauth-protected-resource`, zaregistruje sa pomocou Dynamic Client Registration a prihlasuje sa pomocou PKCE. Na plánoch Team a Enterprise môže vlastník najprv pridať konektor pre organizáciu. Claude nežiada konkrétne rozsahy, takže potvrdzovacia stránka ponúka všetko, k čomu má prihlásený účet B1 prístup. Odvolajte ho v B1 Admin v sekcii **Settings → Developer → Connected Apps**.

### Ako to funguje

API B1 poskytuje jediný koncový bod MCP na adrese `/mcp`. Claude sa k nemu pripojí, autentifikuje sa vaším kľúčom `cak_…` a získa prístup k štyrom nástrojom:

| Nástroj | Čo robí |
|---|---|
| `list_endpoints` | Vypíše REST koncové body, ktoré Claude môže volať, a dá sa filtrovať podľa cesty. Používa sa na objavovanie. |
| `describe_endpoint` | Vráti stručný popis a príklad požiadavky/odpovede pre konkrétny koncový bod. |
| `api_call` | Skutočne vyvolá REST koncový bod v mene overeného používateľa. |
| `describe_page_builder` | Sprievodca vytváraním a úpravou stránok webu vášho kostola, ktorý Claude prečíta pred prácou s obsahom webu. |

Ide o rovnaký prístup `/membership/people`, `/giving/donations`, `/attendance/visits` atď., aký používa váš B1 Admin — platí každé autorizačné pravidlo. Koncové body FreePlay (lessons.church) sú uvedené pod `/lessons/*`; volania Claude na ne sa odosielajú do FreePlay ako ten istý používateľ, s rovnakými oprávneniami.

### Bezpečnosť a obmedzenia

- **Izolácia podľa kostola.** API kľúč patrí jednému kostolu. Claude nemá spôsob, ako vidieť údaje iných kostolov.
- **Obmedzenie oprávnení.** Ak v B1Admin odoberiete oprávnenie osobe, ktorá kľúč vytvorila, Claude ho pri ďalšom volaní okamžite stratí.
- **Možnosť odvolania.** Vymažte kľúč v **Settings → Developer → API Keys** a prístup Claude okamžite skončí.
- **Zoznam zakázaných.** Webhooky poskytovateľov, koncové body správy klientov OAuth a trasa `apiEmails` vyhradená pre prevádzkovateľa nie sú cez MCP volateľné.
- **Limit veľkosti odpovede.** Jedna odpoveď nástroja je obmedzená na 64 KB, aby dlhé zoznamy nepreťažili kontext Claude — v takomto prípade Claude spresní dotaz pomocou filtrov.
- **Auditná stopa.** Zmeny prechádzajú rovnakým auditným záznamom ako akcie v B1Admin; môžete ich preskúmať v **Settings → Audit Log**.

### Riešenie problémov

**Claude žiada e-mail a heslo do B1, aby mohol používať FreePlay:** máte verziu 1.1.0 desktopového rozšírenia. Ak ju chcete aktualizovať, stiahnite a znova nainštalujte — novšie verzie používajú iba váš kľúč.

**Claude hlási „Unauthorized“ alebo 401:** prístupový token chýba, je chybný alebo bol kľúč odvolaný. Ak ste použili rozšírenie, v Claude otvorte **Settings → Extensions → B1 (ChurchApps)** a kľúč vložte znova. Inak skontrolujte hlavičku `Authorization: Bearer cak_…` (dbajte na medzeru a na doslovné slovo `Bearer`).

**Volanie nástroja vráti 403:** API kľúč nemá rozsah pre daný koncový bod. Pridajte rozsah v **Settings → Developer → API Keys** (budete musieť vytvoriť nový kľúč — rozsahy sa nedajú zmeniť na mieste) a nový kľúč vložte do nastavení rozšírenia alebo do konfigurácie Claude.

**Claude nevie nájsť koncový bod:** požiadajte ho, aby zavolal `list_endpoints` s filtrom, napr. *„použi list_endpoints s filtrom 'donations' a nájdi správnu cestu“*. Inventár trás sa generuje zo živého API, takže všetko, čo viete zavolať pomocou `curl`, tam je.

**Lokálny vývoj:** nahraďte `https://api.churchapps.org/mcp` adresou `http://localhost:8084/mcp` — rovnaká autentifikácia, rovnaké nástroje.

## Súvisiace

- [API Keys](/docs/developer/api/api-keys) — úplný prehľad rozsahov
- [MCP Server (developer reference)](/docs/developer/api/mcp) — podrobnosti o protokole a schémy nástrojov
- [ChatGPT](./chatgpt) — rovnaká myšlienka, pre modely OpenAI
