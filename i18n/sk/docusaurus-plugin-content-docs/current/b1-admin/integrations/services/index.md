---
title: "Pripojené služby"
description: "Pripojte B1 Admin k Mailchimp, Donorbox, Subsplash, VOMO, Clearstream a ďalším nástrojom cez recepty Zapier alebo Make, s návodmi na nastavenie."
---

# Pripojené služby

<div class="article-intro">

Najrýchlejší spôsob, ako pripojiť B1 k inému nástroju pre cirkevné technológie, je zvyčajne recept v Zapier alebo Make. Nepotrebujete novú infraštruktúru B1 a pracovný postup hostuje tretia strana. Táto stránka obsahuje starostlivo vybraný zoznam služieb, o ktorých sme potvrdili, že sa dajú dnes prepojiť, s krátkym návodom na nastavenie, ktorý stačí skopírovať a vložiť, pre každú z nich.

</div>

## Na prvý pohľad

| Služba | Kategória | Most | Čo môžete prepojiť |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-mail | Zapier alebo Make | Synchronizovať nové osoby a darcov z B1 do publika Mailchimp |
| [Donorbox](./donorbox.md) | Dary | Zapier | Odosielať dary a darcov z Donorbox späť do B1 |
| [Subsplash](./subsplash.md) | Aplikácia / Dary | Zapier | Preberať dary a osoby zo Subsplash do B1 |
| [VOMO](./vomo.md) | Dobrovoľníctvo | Zapier | Synchronizovať prihlásenia dobrovoľníkov medzi skupinami B1 a projektmi VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Spustiť SMS správu Clearstream z udalostí B1; prijímať odpovede ako záznamy B1 |
| [Text In Church](./text-in-church.md) | SMS / Pracovné postupy | Zapier | Spúšťať pracovné postupy Text In Church z B1; prijímať údaje z Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier alebo Make | Odosielať SMS z ľubovoľnej udalosti B1 |
| [Checkr](./checkr.md) | Bezpečnostné previerky | Make | Spustiť previerku pri pridaní osoby do slúžiaceho tímu |

## Spoločné znaky všetkých týchto služieb

1. **Strana B1 pri prepojení je identická.** Vytvorte API kľúč s príslušnými oprávneniami v **B1Admin → Settings → Developer → API Keys**. Potom buď nechajte most zaregistrovať webhook pre spúšťač (Zapier a Make to robia automaticky a vyžaduje to `settings:write`), alebo volajte REST koncové body B1 z nasledujúcej akcie.
2. **Účtuje vám most, nie my.** ChurchApps je zadarmo. Zapier aj Make majú bezplatné úrovne, ktoré pokrývajú niekoľko receptov.
3. **Prepojenie môžete otestovať bez spustenia naživo.** Oba mosty majú tlačidlo „Test step", ktoré raz spustí spúšťač voči B1 a zobrazí štruktúru údajov skôr, než recept zapnete.

## Výber mosta

- **Zapier** je prívetivejší a má väčší katalóg aplikácií. Používajte ho ako predvolený, pokiaľ nie je problémom cena.
- **Make** je pri väčšom objeme lacnejší a má flexibilnejšiu logiku smerovania a filtrov. Používajte ho, keď jeden pracovný postup obsahuje rozvetvenie, podmienky alebo veľa krokov.
- **Webhooks by Zapier** (použitý v dokumente Mobile Message) je všeobecný adaptér, ktorý vám umožní odoslať POST na ľubovoľný HTTP koncový bod z Zapu, keď cieľ nie je plnohodnotná aplikácia Zapier.

Ak hľadáte niečo, čo nie je v tomto zozname, [REST API](/docs/developer/api) a [webhooky](/docs/developer/api/webhooks) B1 sú verejne dostupné. Jednorazový most môžete vytvoriť pomocou [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) za pár hodín.

## Čo tu nie je (a prečo)

Niekoľko populárnych nástrojov pre cirkevné technológie — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — dnes nemá publikovanú aplikáciu Zapier ani modul Make. Majú vlastné API, ale ich prepojenie s B1 je úloha vlastného kódu, nie receptu, preto do tohto zoznamu nepatria. Ak dodávateľ pridá aplikáciu Zapier alebo modul Make, pridáme dokument.

Tiež sme zámerne vynechali nástroje špecifické pre Planning Center-Services (hudba, prezentácie), konkurenčné produkty ChMS, migračných konzultantov a nástroje, ktoré iba čistia dáta špecifické pre PCO. Žiadny z nich nemá užitočnú cestu prepojenia s B1.

## Pozri tiež

- [Zapier (prehľad)](../zapier.md) — strana B1 každého receptu Zapier je identická; tento dokument ju popisuje raz
- [Make (prehľad)](../make.md) — to isté platí pre scenáre Make
- [Slack a Discord](../slack-discord.md) — upozornenia v chate bez akéhokoľvek mosta
- [Google Sheets](../google-sheets.md) — exporty na požiadanie
- [Webhooky (referencia pre vývojárov)](/docs/developer/api/webhooks) — katalóg udalostí, na ktorom sa spoliehajú všetky recepty
