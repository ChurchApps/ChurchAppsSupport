---
title: "Návod: Nastavenie registrácie na podujatie"
description: "Nastavte formulár registrácie na udalosť v B1 Admin na zber údajov účastníkov a voliteľných platieb, vložte ho na web zboru a sledujte prihlášky."
---

# Nastavenie registrácie na podujatie

<div class="article-intro">

Vytvorte formulár na registráciu na podujatie, zbierajte údaje o účastníkoch a voliteľné platby, vložte ho na webovú stránku vašej cirkvi a spravujte prihlášky, ako prichádzajú. Na konci budete mať stránku na registráciu, ktorú môžete zdieľať pre ľubovoľné cirkevné podujatie.

</div>

:::info
**Dva spôsoby, ako riešiť registráciu na podujatie:** Tento návod popisuje **registráciu pomocou formulárov**, ktorá vám dáva úplnú kontrolu nad vlastnými poľami a zberom platieb. Pre jednoduchšie podujatia, kde potrebujete len sledovať, kto príde, použite **natívnu registráciu na podujatie**, ktorá je súčasťou kalendára -- pokyny na nastavenie nájdete v časti [Vytváranie kalendárov](../calendars/creating-calendars.md#enabling-event-registration). Natívna registrácia umožňuje členom prihlásiť sa priamo z [webovej stránky B1](../../b1-church/events/registering.md) a [mobilnej aplikácie](../../b1-mobile/events/registering.md) s evidenciou kapacity, časovými oknami a potvrdzovacími e-mailami.
:::

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet B1 Admin s administrátorským prístupom
- Na zber platieb: najprv [musí byť nastavený Stripe](../donations/online-giving-setup.md)

</div>

## Krok 1: Vytvorte samostatný formulár

Samostatné formuláre majú vlastnú verejnú adresu URL, ku ktorej má prístup ktokoľvek -- ideálne na registráciu na podujatie.

Postupujte podľa návodu [Vytváranie formulárov](../forms/creating-forms.md):

1. Prejdite do sekcie Formuláre a kliknite na Pridať formulár
2. Vyberte typ „Samostatný“ -- tým dostane váš formulár vlastnú verejnú adresu URL
3. Pomenujte ho podľa podujatia (napr. „Registrácia na mužský kongres“, „Prihláška na VBS“)

## Krok 2: Pridajte otázky

Vytvorte polia, ktoré potrebujete od registrujúcich osôb zbierať.

Postupujte podľa návodu [Vytváranie formulárov](../forms/creating-forms.md#adding-questions) a pridajte svoje otázky:

1. Prejdite na kartu Otázky a pridajte polia pre informácie, ktoré potrebujete: meno, e-mail, telefón, stravovacie obmedzenia, veľkosť tričká, núdzový kontakt a podobne.
2. Pre možnosti ako preferencie jedla alebo výber stretnutí použite Výber z viacerých možností

:::warning
Typ poľa Platba vyžaduje nakonfigurovaný Stripe. Ak ste ešte nenastavili online dary, pozrite si [Nastavenie online darov](../donations/online-giving-setup.md), skôr než pridáte polia na platbu.
:::

## Krok 3: Nakonfigurujte nastavenia formulára

Určite, kedy a ako bude registračný formulár dostupný.

1. Nastavte dátumy dostupnosti, ak má byť registrácia otvorená len obmedzený čas
2. Skopírujte verejnú adresu URL -- môžete ju zdieľať priamo
3. Pridajte členov formulára s rolou Správca alebo Iba na zobrazenie, aby pomohli spravovať prihlášky

## Krok 4: Vložte formulár na webovú stránku

Uľahčite nájdenie registračného formulára tým, že ho pridáte na webovú stránku vašej cirkvi.

Postupujte podľa návodu [Správa stránok](../website/managing-pages.md):

1. Vo webovom editore B1 pridajte na stránku novú sekciu a vyberte prvok Formulár
2. Zo zoznamu vyberte svoj registračný formulár

:::tip
Samostatnú adresu URL zdieľajte aj e-mailom, na sociálnych sieťach a v cirkevných spravodajcoch -- čím viac miest, kde je viditeľná, tým viac prihlášok získate.
:::

## Krok 5: Spravujte prihlášky

Sledujte registrácie, ako prichádzajú, a v prípade potreby exportujte údaje.

Postupujte podľa návodu [Správa prihlášok](../forms/managing-submissions.md):

1. Prihlášky prechádzajte, ako prichádzajú, na karte Prihlášky
2. Exportujte do CSV pre tabuľkové procesory, sledovanie počtu účastníkov alebo zdieľanie s koordinátormi podujatia

## Hotovo!

Vaša registrácia na podujatie je spustená. Zdieľajte odkaz, vložte ho na webovú stránku a sledujte prihlášky v B1 Admin. Keď podujatie skončí, exportujte konečný zoznam pre svoje záznamy.

## Súvisiace články

- [Vytváranie formulárov](../forms/creating-forms.md) — vytvárajte formuláre s rôznymi typmi polí
- [Správa prihlášok](../forms/managing-submissions.md) — prezerajte a exportujte odpovede z formulárov
- [Správa stránok](../website/managing-pages.md) — vkladajte formuláre na svoju webovú stránku
- [Nastavenie online darov](../donations/online-giving-setup.md) — potrebné pre polia na platbu
