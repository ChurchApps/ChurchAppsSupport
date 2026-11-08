---
title: "Guía: Configurar el registro de eventos"
description: "Configure un formulario de registro de eventos en B1 Admin para recopilar datos de los asistentes y pagos opcionales, insértelo en el sitio web de su iglesia y haga seguimiento de las inscripciones."
---

I can't produce this translation as requested. The target language you specified is Slovak (`sk`), but the output above is in Spanish, so it doesn't meet your instructions. I should have produced Slovak, and I apologize for the error.

Here is the translation in Slovak:

---
title: "Sprievodca: Nastavenie registrácie na udalosť"
description: "Nastavte formulár na registráciu na udalosť v B1 Admin, zbierajte údaje o účastníkoch a voliteľné platby, vložte ho na webovú stránku vašej cirkvi a sledujte prihlásenia."
---

# Nastavenie registrácie na udalosť

<div class="article-intro">

Vytvorte formulár na registráciu na udalosť, zbierajte údaje o účastníkoch a voliteľné platby, vložte ho na webovú stránku vašej cirkvi a spravujte prihlášky podľa toho, ako prichádzajú. Na konci budete mať zdieľateľnú registračnú stránku pre akúkoľvek cirkevnú udalosť.

</div>

:::info
**Dva spôsoby spracovania registrácie na udalosť:** Tento sprievodca popisuje **registráciu prostredníctvom formulárov**, ktorá vám poskytuje úplnú kontrolu nad vlastnými poľami a zberom platieb. Pre jednoduchšie udalosti, kde potrebujete len sledovať, kto sa zúčastní, použite **natívnu registráciu na udalosti** vstavanú do kalendára -- pokyny na nastavenie nájdete v časti [Vytváranie kalendárov](../calendars/creating-calendars.md#enabling-event-registration). Natívna registrácia umožňuje členom prihlásiť sa priamo z [B1.church alebo aplikácie B1 App](../../b1-church/events/registering.md) so sledovaním kapacity, časovými oknami a potvrdzovacími e-mailami.
:::

<div class="prereqs">
<h4>Predtým, než začnete</h4>

- Účet B1 Admin s administrátorským prístupom
- Na zber platieb: najprv [musí byť nakonfigurovaný Stripe](../donations/online-giving-setup.md)

</div>

## Krok 1: Vytvorte samostatný formulár

Samostatné formuláre majú vlastnú verejnú URL adresu, ku ktorej má prístup ktokoľvek -- ideálne pre registráciu na udalosť.

Postupujte podľa sprievodcu [Vytváranie formulárov](../forms/creating-forms.md), aby ste:

1. Prešli do sekcie Formuláre a kliknuli na Pridať formulár
2. Vybrali typ „Stand Alone“ -- tým dostane váš formulár vlastnú verejnú URL adresu
3. Pomenovali ho podľa udalosti (napr. „Registrácia na mužské duchovné cvičenia“, „Prihláška na VBS“)

## Krok 2: Pridajte otázky

Vytvorte polia, ktoré potrebujete od registrujúcich osôb zhromaždiť.

Postupujte podľa sprievodcu [Vytváranie formulárov](../forms/creating-forms.md#adding-questions), aby ste pridali otázky:

1. Prejdite na kartu Otázky a pridajte polia pre informácie, ktoré potrebujete: meno, e-mail, telefón, stravovacie obmedzenia, veľkosť trička, núdzový kontakt atď.
2. Pre možnosti ako preferencie jedál alebo výber programu použite Výber z viacerých možností

:::warning
Typ poľa Platba vyžaduje nakonfigurovaný Stripe. Ak ste ešte nenastavili online darovanie, pozrite si [Nastavenie online darovania](../donations/online-giving-setup.md) predtým, než pridáte platobné polia.
:::

## Krok 3: Nastavte možnosti formulára

Určite, kedy a ako je váš registračný formulár dostupný.

1. Nastavte dátumy dostupnosti, ak má byť registrácia otvorená iba obmedzený čas
2. Skopírujte verejnú URL adresu -- môžete ju zdieľať priamo
3. Pridajte členov formulára s rolami Admin alebo Iba na zobrazenie, ktorí pomôžu spravovať prihlášky

## Krok 4: Vložte formulár na webovú stránku

Uľahčite nájdenie registračného formulára pridaním na webovú stránku vašej cirkvi.

Postupujte podľa sprievodcu [Správa stránok](../website/managing-pages.md), aby ste:

1. Vo webovom editore B1 pridali na stránku novú sekciu a vybrali prvok Formulár
2. Zo zoznamu vybrali svoj registračný formulár

:::tip
Samostatnú URL adresu zdieľajte aj e-mailom, na sociálnych sieťach a v cirkevných spravodajcoch -- čím viac miest, kde je viditeľná, tým viac prihlášok získate.
:::

## Krok 5: Spravujte prihlášky

Sledujte registrácie podľa toho, ako prichádzajú, a v prípade potreby exportujte údaje.

Postupujte podľa sprievodcu [Správa prihlášok](../forms/managing-submissions.md), aby ste:

1. Prehliadali odpovede podľa toho, ako prichádzajú, na karte Prihlášky
2. Exportovali do CSV pre tabuľkové procesory, sledovanie počtu účastníkov alebo zdieľanie s koordinátormi udalostí

## Hotovo!

Vaša registrácia na udalosť je spustená. Zdieľajte odkaz, vložte ho na svoju webovú stránku a sledujte prihlášky v B1 Admin. Po skončení udalosti exportujte konečný zoznam pre svoje záznamy.

## Súvisiace články

- [Vytváranie formulárov](../forms/creating-forms.md) -- vytvárajte formuláre s rôznymi typmi polí
- [Správa prihlášok](../forms/managing-submissions.md) -- prehliadajte a exportujte odpovede z formulárov
- [Správa stránok](../website/managing-pages.md) -- vkladajte formuláre na webovú stránku
- [Nastavenie online darovania](../donations/online-giving-setup.md) -- potrebné pre platobné polia
