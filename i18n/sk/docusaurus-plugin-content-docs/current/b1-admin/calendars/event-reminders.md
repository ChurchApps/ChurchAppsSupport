---
title: "Pripomienky udalostí"
---

# Pripomienky udalostí

<div class="article-intro">

Pripomienky udalostí automaticky upozornia správnych ľudí pred začiatkom udalosti -- napríklad: "Nezmeškajte to! Workshop o zdravotníctve začína zajtra o 9:00." Pripomienku nastavíte raz pri udalosti a B1 ju odošle načas cez push notifikácie, e-mail a, ak má vaša cirkev nastavené textové správy, aj ako SMS. Členovia si môžu vo svojich [Nastaveniach oznámení](../../b1-church/getting-started/notification-preferences) sami určiť, ktoré pripomienky chcú dostávať.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vytvorte udalosť, na ktorú chcete ľudí upozorniť (pozri [Vytváranie kalendárov](creating-calendars))
- Ak chcete osloviť registrovaných účastníkov, [zapnite registráciu](creating-calendars) pri udalosti
- Ak chcete osloviť celú skupinu, uistite sa, že udalosť patrí do [skupiny](../groups/creating-groups) s členmi

</div>

## Nastavenie pripomienky

Pripomienky nastavujete v sekcii **Pripomienky** udalosti.

- Pri **vytváraní novej udalosti** rozbaľte sekciu **Pripomienky** v editore udalostí ešte pred uložením.
- Pri **existujúcej udalosti** otvorte stránku **Podrobnosti registrácie** udalosti (zo sekcie **Registrácie**), kde môžete pridať alebo zmeniť pripomienku.

1. Zapnite **Povoliť pripomienky**.
2. Vyberte, **kedy** sa má odoslať. Môžete zvoliť až tri časy: **7 dní pred**, **3 dni pred**, **1 deň pred** a **V deň udalosti**.
3. Nastavte **čas dňa**, kedy sa má pripomienka odoslať (predvolene **9:00**, v [časovom pásme](../settings/church-settings.md#time-zone) vašej cirkvi).
4. Vyberte, **komu** sa má pripomienka poslať (pozri nižšie [Komu sa pripomienka posiela](#who-gets-reminded)).
5. Voliteľne pridajte **Správu**. Ak ju necháte prázdnu, použije sa predvolené znenie, alebo môžete napísať vlastné -- môžete použiť `{{eventTitle}}`, ktoré sa nahradí názvom udalosti.
6. Vyberte **Kanály**: **Push** notifikáciu, **E-mail** a, ak je vaša cirkev pripojená k [poskytovateľovi textových správ](../settings/church-settings.md#texting), aj **Textovú správu**.
7. Uložte udalosť.

Pri každej úprave vám **živý náhľad** zhruba ukáže, koľko ľudí dostane pripomienku, koľko účastníkov nemožno zastihnúť a kedy sa naplánovane odošle ďalšia pripomienka. Pred uložením tak môžete overiť, že pripomienka vyzerá správne.

## Komu sa pripomienka posiela

Nastavenie **Komu** určuje, komu sa pripomienka pošle:

- **Iba registrovaní** -- Všetci zaregistrovaní na udalosť, ktorí sú prepojení s osobným záznamom. Toto je predvolená voľba, keď má udalosť zapnutú registráciu, takže pripomienka pre malú registrovanú udalosť nikdy omylom nepôjde celej skupine.
- **Iba vedúci rodín / registrovaní** -- Jedna pripomienka na jednu registráciu (osoba, ktorá sa registrovala), a nie každému členovi rodiny uvedenému v registrácii.
- **Členovia skupiny** -- Všetci v skupine udalosti. Toto je predvolená voľba, keď udalosť nepoužíva registráciu.
- **Automaticky** -- Použije registrovaných, ak je registrácia zapnutá; inak skupinu.

:::info
Hostia pridaní len menom (bez prepojeného osobného záznamu) nemôžu dostať pripomienku, pretože neexistuje účet, zariadenie ani e-mail, kam by sa mohla poslať. Náhľad vám ukáže, koľko účastníkov do tejto skupiny patrí, aby ste nemali prekvapenie. Členovia, ktorí sa odhlásili z komunikácie, sú tiež preskočení.
:::

## Kedy sa pripomienky odosielajú

- Pripomienky sa odosielajú v **čase dňa, ktorý zvolíte**, podľa miestneho času vašej cirkvi, a to pri každom z vybraných časových posunov.
- Ak **zmeníte dátum alebo čas udalosti**, čakajúce pripomienky sa automaticky preplánujú -- pripomienku upravovať nemusíte.
- Ak **odstránite udalosť** (alebo zrušíte jeden výskyt opakovanej udalosti), jej čakajúce pripomienky sa automaticky zrušia.
- Opakované udalosti sa spracúvajú automaticky: každý nadchádzajúci výskyt dostane vlastnú pripomienku.

:::tip
Pripomienky sa odosielajú **najprv ako push notifikácie, s e-mailom ako záložným kanálom**. Ak má člen zapnuté push notifikácie, dostane push; ak nie, dostane namiesto toho e-mail. Členovia si kanály pre každý typ oznámenia vyberajú vo svojich [Nastaveniach oznámení](../../b1-church/getting-started/notification-preferences).
:::

## Textové pripomienky

Kanál **Text** sa zobrazí, len ak je vaša cirkev pripojená k poskytovateľovi textových správ. Textové správy idú cez poskytovateľa vašej cirkvi a každá môže cirkvi stáť peniaze. Posielajú sa okrem akejkoľvek push alebo e-mailovej pripomienky a len ľuďom, ktorí:

- zapnuli **Textové správy** vo svojich [Nastaveniach oznámení](../../b1-church/getting-started/notification-preferences), a
- majú vo svojom profile uvedené mobilné číslo.

Každá správa začína názvom vašej cirkvi, zmestí sa do jednej textovej správy a končí textom „Reply STOP to opt out.“ Kto odpovie STOP, prestane od vašej cirkvi dostávať textové správy. Aby sa odpovede STOP dostali do B1, vložte **URL adresu webhooku pre prichádzajúce správy (STOP)** z vašich [nastavení textových správ](../settings/church-settings.md#texting) do webhooku pre prichádzajúce správy u vášho poskytovateľa.

## Čo môžu členovia ovplyvniť

Pripomienky vždy rešpektujú [Nastavenia oznámení](../../b1-church/getting-started/notification-preferences) každého člena. Člen môže:

- vypnúť **Pripomienky udalostí** pre push, e-mail alebo textové správy, pričom ostatné oznámenia nechá zapnuté.
- zapnúť alebo vypnúť textové pripomienky voľbou **Textové správy**.
- nastaviť **tiché hodiny**, aby sa menej naliehavé oznámenia odložili na primeraný čas.

Vaše rozhodnutie nemôžete prepísať, ak sa člen odhlásil z pripomienok udalostí -- takto B1 zostáva v súlade s protispamovými pravidlami a členovia majú kontrolu nad svojou doručenou poštou.

## Pripomienky pre služby

Dobrovoľníci naplánovaní v pláne dostanú samostatnú **pripomienku služby** s detailmi plánu a, ak ešte neodpovedali, tlačidlá **Prijať / Odmietnuť** priamo v e-maile. Tieto pripomienky sa nastavujú pri type plánu, nie pri kalendárnej udalosti, a môžu sa odoslať aj textovou správou. Pozri [Pripomienky pre dobrovoľníkov](../serving/plans#volunteer-reminders) a [Nedeľní dobrovoľníci](../guides/sunday-volunteers), kde nájdete, ako fungujú plánovanie dobrovoľníkov a ich pripomienky.

## Ďalšie kroky

- [Nastavenia oznámení](../../b1-church/getting-started/notification-preferences) -- Čo môžu členovia ovládať
- [Sprievodca registráciou na udalosti](../guides/event-registration) -- Nastavte registráciu, aby sa pripomienky mohli dostať k účastníkom
- [Vytváranie kalendárov](creating-calendars) -- Späť na nastavenie kalendára
