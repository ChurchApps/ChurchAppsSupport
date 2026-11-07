---
title: "Připojené služby"
---

# Připojené služby

<div class="article-intro">

Nejrychlejším způsobem, jak propojit B1 s jiným nástrojem pro církevní techniku, bývá obvykle recept v Zapieru nebo Make. Nepotřebujete žádnou novou infrastrukturu B1 a pracovní postup hostuje třetí strana. Tato stránka je výběrem služeb, u kterých jsme ověřili, že je lze dnes propojit, a ke každé je krátký návod k nastavení, který stačí zkopírovat a vložit.

</div>

## Přehled

| Služba | Kategorie | Propojení | Co lze propojit |
|---|---|---|---|
| [Mailchimp](./mailchimp) | E-mail | Zapier nebo Make | Synchronizovat nové osoby a dárce z B1 do publika v Mailchimpu |
| [Donorbox](./donorbox) | Dary | Zapier | Předávat dary a dárce z Donorboxu zpět do B1 |
| [Subsplash](./subsplash) | Aplikace / dary | Zapier | Načítat dary a osoby ze Subsplash do B1 |
| [VOMO](./vomo) | Dobrovolnictví | Zapier | Synchronizovat přihlášky dobrovolníků mezi skupinami B1 a projekty VOMO |
| [Clearstream](./clearstream) | SMS | Zapier | Spouštět z událostí B1 textovou zprávu přes Clearstream; přijímané odpovědi ukládat jako záznamy v B1 |
| [Text In Church](./text-in-church) | SMS / pracovní postupy | Zapier | Spouštět pracovní postupy Text In Church z B1; přijímat data z Connect Card |
| [Mobile Message](./mobile-message) | SMS (Austrálie) | Webhooks by Zapier nebo Make | Odesílat SMS z libovolné události B1 |
| [Checkr](./checkr) | Bezúhonnostní prověrky | Make | Spustit bezúhonnostní prověrku, když se někdo připojí k servisnímu týmu |

## Co mají všechny tyto služby společné

1. **Nastavení na straně B1 je u všech stejné.** Vytvořte klíč API s правильnými oprávněními v **B1Admin → Settings → Developer → API Keys**. Pak buď necháte propojení zaregistrovat webhook pro spouštěč (Zapier a Make to dělají automaticky, vyžaduje `settings:write`), nebo z navazující akce zavoláte REST endpointy B1.
2. **Za propojení platíte vy, ne my.** ChurchApps je zdarma. Zapier i Make mají bezplatné úrovně, které pokryjí několik receptů.
3. **Propojení můžete vyzkoušet, aniž byste ho spustili naostro.** Oba nástroje mají tlačítko „Test step“, které jednou spustí událost v B1 a ukáže vám tvar dat dřív, než recept zapnete.

## Výběr propojení

- **Zapier** je přívětivější a má širší katalog aplikací. Použijte ho jako výchozí, pokud vám nevadí náklady.
- **Make** je levnější ve větším měřítku a nabízí pružnější směrování a filtrování. Použijte ho, když jeden pracovní postup obsahuje větvení, podmínky nebo mnoho kroků.
- **Webhooks by Zapier** (používaný v dokumentaci Mobile Message) je obecný adaptér, který umožňuje z Zapu odeslat POST na libovolný HTTP endpoint, pokud cíl není běžná aplikace Zapier.

Pokud hledáte něco, co na tomto seznamu není, jsou [REST API](/docs/developer/api) a [webhooky](/docs/developer/api/webhooks) B1 otevřené. Jednorázové propojení můžete postavit pomocí [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) během několika hodin.

## Co tu chybí (a proč)

Několik populárních nástrojů pro církevní techniku, mezi nimi Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck a MinistrySafe, dnes nemá publikovanou aplikaci pro Zapier ani modul pro Make. Mají vlastní API, ale propojení s B1 vyžaduje vlastní kód, nikoli recept, takže sem nepatří. Pokud dodavatel přidá aplikaci pro Zapier nebo modul pro Make, dokument doplníme.

Záměrně jsme vynechali nástroje specifické pro Planning Center Services (hudba, prezentace), konkurenční systémy ChMS, migrační konzultanty a nástroje, které pouze čistí data specifická pro PCO. Žádný z nich nemá k B1 užitečnou cestu propojení.

## Viz také

- [Zapier (přehled)](../zapier): nastavení na straně B1 je u každého receptu Zapier stejné, tento dokument ho popisuje jednou
- [Make (přehled)](../make): totéž pro scénáře v Make
- [Slack a Discord](../slack-discord): oznámení v chatu bez jakéhokoli propojení
- [Google Sheets](../google-sheets): exporty na vyžádání
- [Webhooky (referenční příručka pro vývojáře)](/docs/developer/api/webhooks): katalog událostí, na kterém se spoléhá každý recept
