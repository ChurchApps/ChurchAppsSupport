---
title: "Integrácie"
---

# Integrácie

<div class="article-intro">

B1 sa prepája s nástrojmi, ktoré váš tím už používa. Pripojte Slack alebo Discord pre upozornenia pre zamestnancov, automatizujte pracovné postupy v Zapier alebo Make, alebo na požiadanie exportujte údaje do Google Sheets — bez platenia za samostatnú integračnú platformu a bez toho, aby ChurchApps hostil čokoľvek navyše. Každá integrácia beží na infraštruktúre tretej strany a s vaším kostolom komunikuje cez webhooky alebo REST API služby B1.

</div>

## Čo je k dispozícii

| Integrácia | Čo robí | Smer | Úsilie na nastavenie |
|---|---|---|---|
| **[Slack](./slack-discord)** | Posiela čitateľné upozornenia (nové osoby, dary, registrácie, …) do kanála Slack | B1 → Slack | 2 minúty |
| **[Discord](./slack-discord)** | To isté, v kanáli Discord | B1 → Discord | 2 minúty |
| **[Zapier](./zapier)** | Použite udalosti B1 ako spúšťače a akcie B1 v ktorejkoľvek z 7 000+ aplikácií Zapier | Obe | 5–10 min na Zap |
| **[Make](./make)** | Rovnaká myšlienka ako Zapier, v vizuálnom tvorcovi scenárov Make | Obe | 5–10 min na scenár |
| **[Google Sheets](./google-sheets)** | Na požiadanie exportujte Ľudí / Dary / Skupiny / Účasť do tabuľky | B1 → Tabuľka | 5 minút |
| **[Claude](./claude)** | Kladte otázky Claude od Anthropic o údajoch vášho kostola, obmedzené na vaše oprávnenia — vyskúšajte zadarmo, odporúčané | Obe | Menej ako 3 minúty |
| **[ChatGPT](./chatgpt)** | Rovnaká myšlienka s ChatGPT od OpenAI (vyžaduje platený plán ChatGPT) | Obe | 10 minút |
| **[Pripojené služby](./services/)** | Overené postupy pre Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Podľa služby | 5–10 min každá |

## Ako vybrať

- **Chcete len upozornenie v chate?** Použite **Slack** alebo **Discord** — nepotrebujete účet tretej strany ani Zap na údržbu. Nastavuje sa úplne v B1Admin.
- **Chcete niečo automatizovať naprieč aplikáciami** (napr. „keď niekto daruje, pridaj ho do môjho zoznamu Mailchimp a do Slack #dary“)? Použite **Zapier** alebo **Make**. Zapier je prívetivejší; Make je lacnejší vo veľkom meradle a má flexibilnejšiu logiku.
- **Potrebujete jednorazový výber údajov alebo naplánovaný report?** Použite **Google Sheets** — vložte API kľúč do bočného panela doplnku a kliknite na Export.
- **Chcete klásť otázky jednoduchou slovenčinou** („koľko prvonávštevníkov bolo minulú nedeľu?“, „zhrň dary za tento mesiac“)? Začnite s **[Claude](./claude)** — vyskúšať ho môžete zadarmo a nastavenie trvá menej ako 3 minúty. **[ChatGPT](./chatgpt)** funguje tiež s plateným plánom. Claude sa pripája prihlásením s vaším účtom B1; ChatGPT používa API kľúč B1.
- **Vytvárate vlastnú integráciu?** Nič z vyššie uvedeného — komunikujte priamo s [REST API](/docs/developer/api) pomocou [API kľúča](/docs/developer/api/api-keys), alebo prihláste server, ktorý ovládate, na [webhooky](/docs/developer/api/webhooks).

## Čo majú spoločné

Každá integrácia sa overuje pomocou **API kľúča B1**, ktorý sa vytvára v B1Admin v sekcii **Nastavenia → Vývojár → API kľúče**. Kľúč:

- Je viazaný na konkrétnu osobu vo vašom kostole a dedí jej oprávnenia
- Dá sa obmedziť pomocou **rozsahov** — napríklad export do Google Sheets potrebuje iba `people:read`, nie `settings:write`
- Dá sa kedykoľvek zrušiť, čím okamžite odoberie prístup integrácii bez ovplyvnenia ostatného

Niektoré konektory (Zapier, Make) tiež registrujú [webhook](/docs/developer/api/webhooks) v vašom mene, keď sa Zap alebo scenár zapne, a odstránia ho, keď Zap vypnete — URL adresu webhooku nespravujete sami.

:::tip
Aby Zapier a Make registrovali webhooky automaticky, API kľúč potrebuje rozsah **`settings:write`** (plus rozsahy zdrojov pre to, čoho sa integrácia týka). Kľúč len na čítanie funguje pre akcie a exporty, ale nie pre spúšťače.
:::

## Náklady

ChurchApps je zadarmo a s otvoreným zdrojovým kódom. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) a oficiálne konektory Zapier / Make / Google Sheets sú z našej strany tiež zadarmo. Tretie strany môžu účtovať poplatky za svoje vlastné platformy (Zapier aj Make majú štedré bezplatné úrovne; Slack, Discord a Google Sheets sú na tento účel zadarmo).

## Vytvorte si vlastné

Ak nič z vyššie uvedeného nevyhovuje, je otvorený každý povrch B1:

- **[REST API](/docs/developer/api)** — volajte B1 z ľubovoľného jazyka s hlavičkou `Authorization: Bearer cak_…`
- **[Webhooky](/docs/developer/api/webhooks)** — prihláste verejný HTTPS koncový bod na jeden alebo viac typov udalostí a prijímajte podpísané JSON údaje
- **[OAuth + Pripojené aplikácie](/docs/developer/api/connected-apps)** — ak vytvárate SaaS produkt, ktorý používa veľa kostolov

## Ďalšie kroky

- [Slack a Discord](./slack-discord) — posielanie upozornení do chatu
- [Zapier](./zapier) — pripojenie k 7 000+ aplikáciám
- [Make](./make) — vizuálna automatizácia pracovných postupov
- [Google Sheets](./google-sheets) — export do tabuliek
- [Claude](./claude) — pýtajte sa Claude od Anthropic na údaje vášho kostola
- [ChatGPT](./chatgpt) — pýtajte sa ChatGPT od OpenAI na údaje vášho kostola
- [Pripojené služby](./services/) — postupy pre jednotlivé služby (Mailchimp, Donorbox, Clearstream, …)
