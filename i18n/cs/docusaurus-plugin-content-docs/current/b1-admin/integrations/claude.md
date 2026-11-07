---
title: "Claude"
---

# Claude

<div class="article-intro">

Zeptejte se Claude na svůj sbor prostou češtinou a odpoví vám na základě dat z B1, včetně lekcí a učeben FreePlay. Ptát se můžete třeba na *„Kolik lidí z nové návštěvy přišlo minulou neděli?"* nebo *„Kdo se tento měsíc přidal do malé skupiny?"*, případně ho můžete požádat o úkol, například *„Přidej na náš web novou stránku s názvem Události."* Nastavení zabere méně než 3 minuty a k instalaci nepotřebujete žádné technické znalosti ani software.

</div>

<div class="prereqs">
<h4>Co potřebujete</h4>

- **Účet Claude.** **Bezplatný tarif funguje** a je dobrý způsob, jak to vyzkoušet. Bezplatné účty mají denní limit zpráv a vyhledávání v B1 jich spotřebuje hodně, takže pokud Claude budete používat pravidelně, doporučujeme **Claude Pro** (asi 20 USD měsíčně).
- **Vaše přihlašovací údaje do B1** — stejné, jaké používáte pro B1 Admin.

</div>

:::tip Doporučeno — vyzkoušejte zdarma
Claude je nejjednodušší způsob, jak propojit B1 s umělou inteligencí, a funguje na **bezplatném tarifu** Claude. Je to ideální způsob, jak může váš sbor vyzkoušet, než za cokoli zaplatí.
:::

Propojit to můžete dvěma způsoby. **Možnost 1 je nejjednodušší**, nevyžaduje žádný klíč ani instalaci.

## Možnost 1 — Přihlášení přes B1 (nejjednodušší)

Funguje na webu Claude, v desktopové aplikaci Claude i v mobilní aplikaci Claude. Nastavíte to jednou a platí to na všech zařízeních.

### Krok 1 — Otevřete nastavení konektorů Claude

1. Přejděte na [claude.ai](https://claude.ai) a přihlaste se (nebo si vytvořte bezplatný účet).
2. Klikněte na své jméno v levém dolním rohu a poté na **Settings** → **Connectors**.

### Krok 2 — Přidejte B1

1. Klikněte na **Add** a poté na **Add custom connector**.
2. **Name:** zadejte `B1`.
3. **URL:** vložte `https://api.churchapps.org/mcp`
4. Ostatní možnosti ponechte tak, jak jsou, a klikněte na **Add**.

### Krok 3 — Přihlaste se do B1

1. Klikněte na **Connect**. Otevře se přihlašovací stránka B1.
2. Přihlaste se svým účtem B1. Pokud patříte k více sborům, zkontrolujte, že je nahoře zobrazen ten správný.
3. B1 zobrazí, co Claude žádá, a potvrdí, že budete přesměrováni zpět na **claude.ai**. Klikněte na **Allow**.

Vrátíte se do Claude a B1 se zobrazí jako připojené.

### Krok 4 — Zeptejte se na něco

Začněte **novou konverzaci** a zkuste například:

- *„Kolik lidí je v našem sboru?"*
- *„Vypiš aktivní skupiny."*
- *„Shrň tento měsíc dary podle fondu."*
- *„Kdo se připojil ke sboru za posledních 30 dní?"*

Při prvním použití se Claude zeptá na oprávnění k používání B1. Klikněte na **Allow**.

## Možnost 2 — Desktopové rozšíření s klíčem B1

Použijte tuto možnost, pokud chcete Claude dát klíč s omezenými oprávněními (například pouze pro čtení). Funguje v desktopové aplikaci Claude pro Mac nebo Windows. Abyste klíč mohli vytvořit, potřebujete v B1 oprávnění ke správě nastavení sboru.

### Krok 1 — Získejte aplikaci Claude

Stáhněte aplikaci Claude z [claude.com/download](https://claude.com/download), nainstalujte ji, otevřete a přihlaste se.

### Krok 2 — Vytvořte klíč B1

Klíč umožňuje Claude přístup do B1 *vašeho* sboru. Představte si ho jako heslo jen pro Claude.

1. Přihlaste se do [B1 Admin](https://admin.b1.church) a přejděte na [Settings → Developer](https://admin.b1.church/settings/developer).
2. Na kartě **API Keys** klikněte na **New API Key**.
3. **Name:** zadejte `Claude`.
4. **Scopes:** zaškrtněte, co smí Claude dělat. U každé oblasti je políčko **read** (pouze čtení) a políčko **write** (provádění změn). Nejste si jistí? Zatím zaškrtněte jen políčka **read**. Později můžete vytvořit nový klíč s více oprávněními.
5. Klikněte na **Save** a poté na **Copy**. Klíč se zobrazí pouze jednou, proto pokračujte rovnou ke kroku 3.

### Krok 3 — Přidejte B1 do Claude

1. [Stáhněte rozšíření B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dvakrát klikněte** na stažený soubor (`b1-churchapps.mcpb`). Claude se otevře a zobrazí **B1 (ChurchApps)**.
3. Klikněte na **Install**.
4. Až se zeptá na váš **klíč API B1**, vložte klíč z kroku 2 a uložte.
5. **Zcela ukončete Claude** (Mac: **Cmd+Q** · Windows: pravým tlačítkem klikněte na ikonu Claude na hlavním panelu → **Quit**) a aplikaci znovu otevřete.

Pokud se Claude po dvojkliku neotevře, přejděte v Claude na **Settings → Extensions → Advanced settings → Install Extension…** a vyberte stažený soubor. Poté začněte novou konverzaci a na něco se zeptejte.

:::tip Rozšíření už máte nainstalované?
Není nutné nic dělat. FreePlay funguje přes stejné připojení. Jedinou výjimkou je verze 1.1.0, která vyžadovala e-mail a heslo do B1. Pro aktualizaci rozšíření si ho stáhněte a nainstalujte znovu. Váš klíč zůstane zachován.
:::

## Je to bezpečné?

- Claude vidí pouze data **vašeho sboru**.
- **Přihlášení (Možnost 1):** Claude nemůže dělat víc, než dovoluje vaše vlastní přihlášení do B1. Přihlašovací stránka B1 zobrazí všechno, co Claude smí dělat, dříve než kliknete na **Allow**.
- **S klíčem (Možnost 2):** Claude může dělat pouze to, co klíč v B1 povoluje. Klíč pouze s políčky **read** může data jen číst, nikdy nic nezmění. FreePlay funguje stejně, pod stejným klíčem.
- **Jak to vypnout:** v B1 Admin přejděte na **Settings → Developer** a odeberte aplikaci v sekci **Connected Apps** (Možnost 1), nebo klíč smažte v sekci **API Keys** (Možnost 2). Přístup se okamžitě zastaví. Můžete také kliknout na **Disconnect** u konektoru B1 v Claude.

## Kolik to stojí?

Připojení k B1 je zdarma, je součástí ChurchApps. Claude má bezplatný tarif. Claude Pro (asi 20 USD měsíčně) nabízí podstatně více možností využití. Podrobnosti najdete na [claude.com/pricing](https://claude.com/pricing).

## Technické podrobnosti

Zbytek této stránky je určen technicky zdatným uživatelům a asistentům AI: oprávnění (scopes), další způsoby připojení a princip fungování.

### Oprávnění (Scopes)

Claude komunikuje s B1 přes **server Model Context Protocol (MCP)** vestavěný do API B1 (`https://api.churchapps.org/mcp`). Každé volání prochází stejnými pravidly ověřování, oprávnění a omezení na sbor jako požadavek z B1 Admin. Claude je omezen na **oprávnění a scopes** klíče API a nemá přístup k webhookům, administračním endpointům OAuth ani jiným cestám určeným pouze pro provozovatele.

Běžné výchozí sady oprávnění:

- **Asistent pouze pro čtení:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Čtení + přidávání poznámek a úkolů:** přidejte `people:write`
- **Plný provozní asistent:** přidejte odpovídající oprávnění `:write`, která chcete povolit

Klíč s `donations:read` umožňuje Claude shrnout dary, ale nemůže zaznamenat žádný dar. Klíč s `people:write` může přidat osobu, ale nevidí dary. Co každé oprávnění umožňuje, najdete na stránce [API Keys](/docs/developer/api/api-keys).

### Jiné způsoby připojení

#### Claude Code (CLI)

V terminálu:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Hotovo. V libovolné relaci Claude Code napište `/mcp`, abyste ověřili, že je server `b1` připojen, a poté se Claude zeptejte na cokoli o vašem sboru.

#### Claude Desktop — ruční konfigurace (pokročilé)

Pokud nechcete používat rozšíření, upravte konfigurační soubor Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Přidejte položku serveru `b1`, která se k B1 připojí přes `mcp-remote` (vyžaduje [Node.js](https://nodejs.org)):

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

Restartujte Claude Desktop. V nabídce konektorů v poli pro zprávy se zobrazí `b1` se svými nástroji.

#### Claude.ai (web) — vlastní konektor

Viz **Možnost 1** výše. Konektor používá OAuth 2.1: Claude zjistí autorizační server B1 z adresy `https://api.churchapps.org/.well-known/oauth-protected-resource`, zaregistruje se pomocí Dynamic Client Registration a přihlašuje se pomocí PKCE. U tarifů Team a Enterprise může vlastník organizace nejprve konektor přidat za celou organizaci. Claude nevyžaduje konkrétní oprávnění, takže na souhlasové stránce se nabízí vše, k čemuž má přihlášený účet B1 přístup. Odvolat jej můžete v B1 Admin v sekci **Settings → Developer → Connected Apps**.

### Jak to funguje

API B1 nabízí jediný koncový bod MCP na adrese `/mcp`. Claude se k němu připojí, ověří se pomocí vašeho klíče `cak_…` a získá přístup ke čtyřem nástrojům:

| Nástroj | Co dělá |
|---|---|
| `list_endpoints` | Vypíše koncové body REST, které Claude může volat, a lze je filtrovat podle cesty. Slouží k vyhledávání. |
| `describe_endpoint` | Vrátí krátký popis a příklad požadavku a odpovědi pro konkrétní koncový bod. |
| `api_call` | Skutečně zavolá koncový bod REST jménem ověřeného uživatele. |
| `describe_page_builder` | Průvodce vytvářením a úpravou stránek webu vašeho sboru. Claude si ho přečte, než začne pracovat s obsahem webu. |

Jde o stejnou sadu endpointů `/membership/people`, `/giving/donations`, `/attendance/visits` atd., kterou používá B1Admin. Platí na ně stejná autorizační pravidla. Endpointy FreePlay (lessons.church) jsou uvedeny pod `/lessons/*`. Claude je volá přes FreePlay jako stejný uživatel se stejnými oprávněními.

### Bezpečnost a omezení

- **Izolace sborů.** Klíč API je přiřazen k jednomu sboru. Claude nemá možnost vidět data jiných sborů.
- **Omezení oprávněními.** Pokud v B1Admin odeberete oprávnění osobě, která klíč vytvořila, Claude o něj přijde při dalším volání, tedy okamžitě.
- **Odvolatelnost.** Klíč smažete v **Settings → Developer → API Keys** a přístup Claude okamžitě skončí.
- **Blokovaný seznam.** Webhooky poskytovatelů, administrační endpointy klientů OAuth a trasa `apiEmails`, určená pouze pro provozovatele, nejsou přes MCP volatelné.
- **Limit velikosti odpovědi.** Jedna odpověď nástroje je omezena na 64 KB, aby dlouhé seznamy nezaplnily kontext Claude. V takovém případě Claude dotaz zúží pomocí filtrů.
- **Auditní stopa.** Změny procházejí stejným auditním záznamem jako akce v B1Admin. Můžete je prohlédnout v **Settings → Audit Log**.

### Řešení potíží

**Claude žádá e-mail a heslo do B1 pro použití FreePlay:** máte verzi 1.1.0 desktopového rozšíření. Pro aktualizaci je stáhněte a nainstalujte znovu. Novější verze používají pouze váš klíč.

**Claude hlásí „Unauthorized" nebo 401:** token Bearer chybí, je neplatný, nebo byl klíč odvolán. Pokud jste použili rozšíření, otevřete v Claude **Settings → Extensions → B1 (ChurchApps)** a klíč znovu vložte. Jinak zkontrolujte hlavičku `Authorization: Bearer cak_…` (pozor na mezeru a na slovo `Bearer` přesně tak, jak je napsané).

**Nástroj vrátí 403:** klíč API nemá oprávnění pro daný endpoint. Oprávnění přidejte v **Settings → Developer → API Keys**. Musíte však vytvořit nový klíč, protože oprávnění nelze změnit zpětně. Nový klíč pak vložte do nastavení rozšíření nebo do konfigurace Claude.

**Claude nemůže najít endpoint:** požádejte ho, aby zavolal `list_endpoints` s filtrem, například *„použij list_endpoints s filtrem 'donations' a najdi správnou cestu"*. Seznam tras se generuje z živého API, takže vše, co lze zavolat přes `curl`, tam je.

**Lokální vývoj:** adresu `https://api.churchapps.org/mcp` nahraďte adresou `http://localhost:8084/mcp`. Ověřování i nástroje zůstávají stejné.

## Související

- [API Keys](/docs/developer/api/api-keys) — úplný přehled oprávnění
- [MCP Server (developer reference)](/docs/developer/api/mcp) — podrobnosti o protokolu a schémata nástrojů
- [ChatGPT](./chatgpt) — stejná myšlenka pro modely OpenAI
