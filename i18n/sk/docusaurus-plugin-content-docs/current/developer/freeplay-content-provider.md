---
title: "Poskytovateľ obsahu pre FreePlay"
---

# Poskytovateľ obsahu pre FreePlay

<div class="article-intro">

FreePlay je mediálny prehrávač spoločnosti ChurchApps na streamovanie lekcií a ďalšieho video obsahu v telefónoch, tabletoch a televízoroch. Ak máte knižnicu obsahu lekcií a chcete ju sprístupniť vo FreePlay, tento návod obsahuje všetko, čo na to potrebujete.

</div>

## Branding

Pred začatím integrácie potrebujeme:

- **Logo** -- obrázok loga v pomere strán **16:9** (používa sa na kartách poskytovateľov v rozhraní FreePlay)
- **Názov značky** -- preferovaný názov vašej organizácie, ktorý sa zobrazí vo FreePlay

## Koncové body API

FreePlay komunikuje s vašou službou prostredníctvom malej sady koncových bodov REST. Pre každého poskytovateľa píšeme vlastný adaptér, takže presná štruktúra URL je flexibilná -- informácie uvedené nižšie sú však tým, čo potrebujeme.

### Autentifikácia

Vyberte model, ktorý zodpovedá vášmu obsahu:

| Model | Kedy použiť | Čo potrebujeme |
|-------|-------------|----------------|
| **Žiadny** | Verejný obsah, prihlásenie nie je potrebné | Nič -- katalógové koncové body voláme priamo |
| **OAuth (PKCE)** | Prihlásenie vo webe/mobilnej aplikácii | URL autorizácie, koncový bod na výmenu tokenov, ID klienta, rozsahy (scopes) |
| **Device Flow** | Odporúčané pre aplikácie na TV (používateľ zadá krátky kód na telefóne) | Koncový bod pre autorizáciu zariadenia, koncový bod na dopytovanie tokenov, ID klienta |

:::tip
Ak váš obsah vyžaduje autentifikáciu, autentifikačný koncový bod vráti **používateľský token**, ktorý FreePlay odovzdá koncovým bodom na prehliadanie a lekcie, aby overil prístup.
:::

### Prehliadanie / katalóg

Koncový bod (alebo sada koncových bodov), ktorý vracia **stromovú štruktúru priečinkov** so všetkými dostupnými lekciami.

- Môže ísť o **jedno volanie**, ktoré vráti celý strom, alebo o **viacero volaní**, pričom každé vráti jednu úroveň pri pohybe používateľa hlbšie.
- Každá položka v strome by mala obsahovať:

| Pole | Povinné | Popis |
|------|---------|-------|
| `id` | Áno | Jedinečný identifikátor priečinka |
| `name` | Áno | Zobrazovaný názov priečinka |
| `thumbnail` | Odporúčané | URL náhľadu v pomere strán **16:9** |

### Zoznam skladieb lekcie

Koncový bod, ktorý vracia **zoznam mediálnych súborov** pre jednu lekciu.

Každá položka v zozname by mala obsahovať:

| Pole | Povinné | Popis |
|------|---------|-------|
| `title` | Áno | Zobrazovaný názov mediálnej položky |
| `mediaType` | Áno | `video` alebo `image` |
| `url` | Áno | Priamy odkaz na stiahnutie súboru (pozri [Mediálne formáty](#media-formats) nižšie) |
| `thumbnail` | Odporúčané | Náhľadový obrázok položky |
| `duration` | Odporúčané | Trvanie v sekundách (pre videá) |

## Mediálne formáty

FreePlay sťahuje súbory priamo, preto musí mať každá mediálna položka **priamy odkaz** (bez vložených prehrávačov alebo presmerovaní na stránky).

| Typ | Akceptované formáty |
|-----|---------------------|
| Video | **MP4** (povinné pre prehrávanie na zariadeniach Apple a Android) |
| Obrázok | JPG, PNG alebo GIF |

## Poznámky

- **REST API vracajúce JSON** je typický spôsob integrácie, ale keďže pre každého poskytovateľa píšeme vlastný adaptér, dokážeme pracovať takmer s akýmkoľvek formátom API.
- Ak máte záujem stať sa poskytovateľom obsahu pre FreePlay, ozvite sa na [Slacku](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) alebo otvorte problém na [GitHube](https://github.com/ChurchApps/ChurchAppsSupport/issues).
