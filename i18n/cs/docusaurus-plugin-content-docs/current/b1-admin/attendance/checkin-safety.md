---
title: "Bezpečnost při odbavení"
description: "Nastavte v B1 Admin bezpečnostní prvky pro děti: kapacitu místností, poměr dobrovolníků, seznamy důvěryhodných osob k vyzvednutí a SMS rodičům."
---

# Bezpečnost při odbavení

<div class="article-intro">

B1 obsahuje sadu ochranných prvků pro děti při odbavení: limity kapacity místností a poměr dobrovolníků k dětem, pokyny k věku a ročníku na kiosku, typy odbavení, které rozlišují členy, hosty a dobrovolníky, a seznam důvěryhodných osob pro vyzvednutí pro každou domácnost, který se ověřuje při odhlášení. Tato stránka popisuje, jak nastavit každou bezpečnostní funkci v B1 Admin.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte svou [strukturu docházky](setup.md) a [odbavovací kiosky](check-in.md)
- Místnosti jsou [skupiny](../groups/creating-groups.md) propojené s časy bohoslužeb — bezpečnostní nastavení níže se nacházejí u skupiny
- Upozornění rodičů a nouzové hromadné vysílání vyžadují připojeného poskytovatele SMS ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md), nebo Mutual Ministry)

</div>

## Kapacita místnosti a uzavření místnosti

Každá odbavovací místnost (skupina) může vynucovat vlastní limity. Otevřete skupinu, klikněte na **Upravit** a najděte sekci **Kapacita odbavení**:

- **Kapacita** -- Maximální počet osob, které mohou být současně odbaveny v této místnosti. Když je místnost plná, odbavení do ní je zablokováno a kiosek uvede, že místnost je plná.
- **Kapacita hostů** -- Volitelný samostatný limit počtu hostů, které místnost může pojmout.
- **Uzavřeno pro odbavení** -- Nastavte na **Ano**, aby se okamžitě zastavilo veškeré odbavování do této místnosti (například když je hodina zrušena nebo místnost není k dispozici). Odhlašování stále funguje.

## Poměr dobrovolníků

Stejná sekce **Kapacita odbavení** na skupině obsahuje pravidla pro obsazení:

- **Dětí na dobrovolníka** -- Maximální počet dětí, které může každý odbavený dobrovolník hlídat (např. 5 znamená jednoho dobrovolníka na pět dětí).
- **Minimální počet dobrovolníků** -- Nejmenší počet dobrovolníků, kteří musí být odbaveni, než mohou děti být odbaveny do místnosti.

Dobrovolníci se do těchto pravidel počítají, pokud se na kiosku odbaví s typem **Dobrovolník** (viz [Typy odbavení](#check-in-types) níže).

### Volba mezi upozorněním a blokováním

Jak přísně se poměry vynucují, je nastavení pro celý sbor:

1. V B1 Admin přejděte do **Nastavení** a otevřete sekci **Odbavení**.
2. Nastavte **Vynucování poměru dobrovolníků**:
   - **Upozornit (povolit s potvrzením)** -- Kiosek zobrazí upozornění, když je místnost nad poměrem nebo pod minimálním počtem dobrovolníků, a pracovník může potvrdit pokračování. Toto je výchozí nastavení.
   - **Blokovat (zabránit odbavení)** -- Odbavení do místnosti je odmítnuto, dokud není odbaveno dostatek dobrovolníků.

:::info
Kapacita a Uzavřeno pro odbavení jsou vždy pevné limity — volba upozornit/blokovat se týká pouze poměrů dobrovolníků.
:::

## Typy odbavení

Každé odbavení zaznamenává, zda je daná osoba **Člen**, **Host** nebo **Dobrovolník**. Typ se volí štítky na obrazovce domácnosti na kiosku (výchozí je Člen). Typy napájejí bezpečnostní pravidla — dobrovolníci zajišťují pokrytí poměru a hosté se započítávají do kapacity hostů místnosti.

## Pokyny k věku a ročníku pro místnosti

Každé místnosti můžete nastavit věkové nebo ročníkové hranice, aby kiosek rodiny navedl do vhodných místností:

- V nastavení skupiny použijte sekci **Věk a ročník** a nastavte minimální/maximální věk (roky a měsíce) a/nebo ročník pro místnost.
- Na kiosku se zvýrazní místnosti, do kterých dítě patří, a ztlumí se ty, do kterých nepatří. Ztlumenou místnost lze přesto zvolit po potvrzení pracovníkem — pokyny nikdy zcela neblokují.

Ročníky se přepínají v den **postupu do vyššího ročníku** vašeho sboru:

1. V B1 Admin přejděte do **Nastavení** a otevřete sekci **Postup do vyššího ročníku**.
2. Nastavte měsíc a den, kdy váš sbor žáky převádí do vyššího ročníku (například 1. srpna). Věk a ročník na kiosku se počítají k poslednímu datu postupu.

## Důvěryhodné a neoprávněné osoby pro vyzvednutí

Každá domácnost může mít seznam osob, které smějí — nebo nesmějí — vyzvedávat její děti.

1. Otevřete stránku osoby v **Lidé** a najděte kartu **Vyzvednutí**.
2. Klikněte na **Přidat**. Vyhledejte existující osobu, nebo přidejte někoho, kdo není v systému, zadáním jeho **Jména**, **Vztahu** a fotografie.
3. Nastavte **Stav**:
   - **Důvěryhodný** -- Při odhlašování se tato osoba zobrazí jako kartička s fotografií, na kterou lze klepnout, což umožňuje rychlé ověřené vyzvednutí.
   - **Neoprávněný** -- Pokud se někdo pokusí vyzvednout dítě pod tímto jménem, kiosek odhlášení zablokuje s varováním. Pracovník může zablokování přepsat a přepsání se zaznamená v záznamu docházky.

Kliknutím na štítek stavu osoby na kartě přepínáte mezi stavy Důvěryhodný a Neoprávněný.

:::tip
Přidávejte fotografie důvěryhodným osobám pro vyzvednutí, kdykoli je to možné — obrazovka odhlašování zobrazuje fotografii, aby dobrovolníci mohli vizuálně ověřit osobu, která stojí před nimi.
:::

## Upozornění rodičů a nouzové hromadné vysílání

Obě funkce odesílají textové zprávy prostřednictvím připojeného poskytovatele SMS vašeho sboru — není zabudovaná služba SMS, takže nejprve musí být nakonfigurován jeden z podporovaných poskytovatelů.

- **Upozornit rodiče** -- Z obrazovky odhlašování na obsazeném kiosku mohou pracovníci poslat SMS rodičům/zákonným zástupcům odbaveného dítěte (například „Prosím, přijďte do dětského pokoje“).
- **Nouzové hromadné vysílání** -- Z administrátorského nastavení kiosku mohou pracovníci najednou poslat SMS zákonným zástupcům každé odbavené domácnosti pro vybranou bohoslužbu. Odeslání vyžaduje napsat **EMERGENCY** pro potvrzení.

Osoby, které se odhlásily z textových zpráv, nebo které nemají v evidenci uvedené mobilní číslo, jsou automaticky přeskočeny — kiosek uvede, kolik zpráv bylo odesláno a kolik přeskočeno.

Podrobný postup na straně kiosku najdete v [Odhlášení a bezpečnost dětí](../../b1-checkin/check-in/checking-out.md).

## Související články

- [Odbavení](check-in.md) — nastavení kiosku a hardware
- [Odhlášení a bezpečnost dětí](../../b1-checkin/check-in/checking-out.md) — odhlašování na kiosku, ověřování vyzvednutí a postupy upozorňování
- [Vytváření skupin](../groups/creating-groups.md) — kde se nacházejí nastavení místností
- [Nastavení docházky](setup.md) — služby, časy bohoslužeb a přiřazení místností
- [Minimální věk pro soukromé zprávy](../settings/mobile-app.md#member-directory--messaging-settings) — blokuje nové soukromé konverzace s dětmi, zatímco zůstávají v adresáři
