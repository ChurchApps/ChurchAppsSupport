---
title: "Integrace"
---

# Integrace

<div class="article-intro">

B1 se propojí s nástroji, které váš tým již používá. Připojte Slack nebo Discord pro interní upozornění, automatizujte pracovní postupy v Zapier nebo Make, nebo na vyžádání exportujte data do Google Sheets. Nepotřebujete za to platit zvlášť za integrační platformu a ChurchApps nemusí hostovat nic navíc. Každá integrace běží na infrastruktuře třetí strany a s vaší církví komunikuje prostřednictvím webhooků nebo REST API B1.

</div>

## Co je k dispozici

| Integrace | Co dělá | Směr | Náročnost nastavení |
|---|---|---|---|
| **[Slack](./slack-discord)** | Posílá čitelná oznámení (nové osoby, dary, registrace, …) do kanálu Slack | B1 → Slack | 2 minuty |
| **[Discord](./slack-discord)** | Totéž, do kanálu Discord | B1 → Discord | 2 minuty |
| **[Zapier](./zapier)** | Používá události B1 jako spouštěče a akce B1 v kterékoli z více než 7 000 aplikací Zapier | Obousměrně | 5–10 min na jeden Zap |
| **[Make](./make)** | Stejná myšlenka jako Zapier, ve vizuálním tvůrci scénářů Make | Obousměrně | 5–10 min na jeden scénář |
| **[Google Sheets](./google-sheets)** | Na vyžádání exportuje osoby / dary / skupiny / docházku do tabulky | B1 → tabulka | 5 minut |
| **[Claude](./claude)** | Klade otázky Claude od Anthropic o údajích vaší církve v rozsahu vašich oprávnění — lze vyzkoušet zdarma, doporučeno | Obousměrně | Méně než 3 minuty |
| **[ChatGPT](./chatgpt)** | Totéž s ChatGPT od OpenAI (vyžaduje placený tarif ChatGPT) | Obousměrně | 10 minut |
| **[Propojené služby](./services/)** | Vybrané postupy pro Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Podle služby | 5–10 min na každou |

## Jak vybrat

- **Chcete jen upozornění v chatu?** Použijte **Slack** nebo **Discord**. Není potřeba účet třetí strany ani Zap ke správě. Nastavuje se zcela v B1Admin.
- **Chcete něco automatizovat napříč aplikacemi** (např. „když někdo daruje, přidej ho do mého seznamu Mailchimp a do Slack #donations“)? Použijte **Zapier** nebo **Make**. Zapier je přívětivější; Make je při větším objemu levnější a má flexibilnější logiku.
- **Potřebujete jednorázový výpis dat nebo pravidelný přehled?** Použijte **Google Sheets**. Vložte API klíč do postranního panelu doplňku a klikněte na Exportovat.
- **Chcete klást otázky prostým jazykem** („kolik prvních návštěvníků bylo minulou neděli?“, „shrň dary za tento měsíc“)? Začněte s **[Claude](./claude)**. Lze jej vyzkoušet zdarma a nastavení trvá méně než 3 minuty. **[ChatGPT](./chatgpt)** funguje také s placeným tarifem. Claude se připojí přihlášením pomocí vašeho účtu B1; ChatGPT používá API klíč B1.
- **Vytváříte vlastní integraci?** Žádná z výše uvedených. Komunikujte přímo s [REST API](/docs/developer/api) pomocí [API klíče](/docs/developer/api/api-keys), nebo přihlaste server, který ovládáte, k [webhookům](/docs/developer/api/webhooks).

## Společné vlastnosti

Každá integrace se ověřuje pomocí **API klíče B1**, který se vytváří v B1Admin v **Nastavení → Vývojář → API klíče**. Klíč:

- Je vázán na konkrétní osobu ve vaší církvi a dědí její oprávnění
- Lze jej omezit pomocí **rozsahů oprávnění**. Například export do Google Sheets potřebuje jen `people:read`, ne `settings:write`
- Lze jej kdykoli zrušit, čímž se okamžitě zablokuje přístup integrace, aniž by to ovlivnilo cokoli jiného

Některé konektory (Zapier, Make) také při zapnutí Zapu nebo scénáře zaregistrují [webhook](/docs/developer/api/webhooks) za vás a při jeho vypnutí jej odeberou. Adresu webhooku nespravujete sami.

:::tip
Aby Zapier a Make mohly webhooky registrovat automaticky, API klíč potřebuje rozsah **`settings:write`** (a také rozsahy zdrojů pro to, čeho se integrace dotýká). Klíč pouze pro čtení funguje pro akce a exporty, ale ne pro spouštěče.
:::

## Náklady

ChurchApps je zdarma a open-source. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) a oficiální konektory Zapier / Make / Google Sheets jsou z naší strany také zdarma. Třetí strany mohou účtovat za vlastní platformy (Zapier i Make mají velkorysé bezplatné tarify; Slack, Discord a Google Sheets jsou pro tento účel zdarma).

## Vytvoření vlastní integrace

Pokud nic z výše uvedeného nevyhovuje, je otevřen každý povrch B1:

- **[REST API](/docs/developer/api)** — volejte B1 z libovolného jazyka pomocí hlavičky `Authorization: Bearer cak_…`
- **[Webhooky](/docs/developer/api/webhooks)** — přihlaste veřejný HTTPS koncový bod k jednomu nebo více typům událostí a přijímejte podepsané datové zprávy ve formátu JSON
- **[OAuth + připojené aplikace](/docs/developer/api/connected-apps)** — pokud vytváříte SaaS produkt používaný mnoha církvemi

## Další kroky

- [Slack a Discord](./slack-discord) — posílejte oznámení do chatu
- [Zapier](./zapier) — připojte se k více než 7 000 aplikacím
- [Make](./make) — vizuální automatizace pracovních postupů
- [Google Sheets](./google-sheets) — export do tabulek
- [Claude](./claude) — ptejte se Claude od Anthropic na údaje vaší církve
- [ChatGPT](./chatgpt) — ptejte se ChatGPT od OpenAI na údaje vaší církve
- [Propojené služby](./services/) — postupy pro jednotlivé služby (Mailchimp, Donorbox, Clearstream, …)
