---
title: "Prihlásenie do B1 Church Checkin"
sidebar_label: "Prihlásenie"
description: "Prihláste sa do kiosk aplikácie B1 Church Checkin, vyberte svoju cirkev a pochopte automatické prihlásenie, nastavenia správcu a odhlásenie na tablete na prihlasovanie."
---

# Prihlásenie

<div class="article-intro">

Predtým, než môžete kiosk použiť na prihlasovanie, sa musíte prihlásiť pomocou účtu ChurchApps, ktorý má prístup k vašej cirkvi. Táto stránka popisuje prvé prihlásenie, výber cirkvi, správanie automatického prihlásenia a spôsob odhlásenia.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Nainštalujte aplikáciu B1 Church Checkin na svoj tablet s Androidom (pozri [Začíname](./index.md))
- Pripravte si e-mailovú adresu a heslo k svojmu účtu ChurchApps
- Účet potrebuje oprávnenie **Checkin** (alebo **Edit Attendance**) vo vašej cirkvi. Správca ho pridá v B1 Admin v sekcii **Nastavenia > Roly** — pozri [Účty kiosku na prihlasovanie](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Prvé prihlásenie

1. Otvorte aplikáciu B1 Church Checkin. Po úvodnej obrazovke sa zobrazí prihlasovacia obrazovka s logom B1 Church Checkin.
2. Do prvého poľa zadajte svoju **e-mailovú adresu**.
3. Do druhého poľa zadajte svoje **heslo**.
4. Klepnite na tlačidlo **Prihlásiť sa**.

Aplikácia overí vaše prihlasovacie údaje a prihlási vás. Ak je e-mail alebo heslo nesprávne, v dolnej časti obrazovky sa zobrazí chybová správa.

Ak má účet zapnuté [dvojfaktorové prihlásenie](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikácia potom vyžiada kód. Zadajte 6-miestny kód z autentifikačnej aplikácie vlastníka účtu alebo jeden z jeho záložných kódov a znova klepnite na **Prihlásiť sa**. Tento kód potrebujete len pri prvom prihlásení; potom kiosk zostane prihlásený.

:::info
Ide o rovnaký e-mail a heslo, aké používate v B1 Admin alebo v ktoromkoľvek inom produkte ChurchApps. Na kiosk na prihlasovanie nepotrebujete samostatný účet.
:::

## Výber cirkvi

Po úspešnom prihlásení aplikácia načíta cirkvi, v ktorých má váš účet oprávnenie **Checkin** alebo **Edit Attendance**. Cirkvi, kde máte len iné oprávnenia, sa vynechajú. Ak nezostane žiadna, aplikácia zobrazí správu **Žiadny prístup k prihlasovaniu** a požiada vás, aby správca vašej cirkvi pridal oprávnenie Checkin do jednej z vašich rolí. Každá cirkev sa zobrazí ako karta s názvom cirkvi a logom (ak ste ho nastavili v B1 Admin).

- Ak je váš účet prepojený **iba s jednou cirkvou**, výberová obrazovka sa aj tak zobrazí. Klepnutím na svoju cirkev pokračujte.
- Ak je váš účet prepojený **s viacerými cirkvami**, klepnite na cirkev, ktorú má tento kiosk obsluhovať.

Po výbere cirkvi aplikácia načíta jej branding a nastavenia vzhľadu. Logo vašej cirkvi sa potom zobrazí v hlavičke na všetkých ďalších obrazovkách.

## Automatické prihlásenie pri ďalších návštevách

Po prvom úspešnom prihlásení si aplikácia na tablete uchová bezpečný prihlasovací token a vybranú cirkev. Vaše heslo neukladá. Pri ďalších spusteniach:

- Aplikácia vás znova prihlási pomocou uloženého tokenu.
- Ak ste predtým vybrali cirkev, obnoví tento výber a privedie vás priamo na **obrazovku bohoslužieb**.
- Ak uložené prihlásenie už nie je platné, aplikácia vás vráti na prihlasovaciu obrazovku, aby ste sa mohli znova prihlásiť.

:::tip
Keďže kiosk sa prihlasuje automaticky, prihlasovacie údaje zadávate len raz pri úvodnom nastavení. Potom stačí tablet zapnúť a je pripravený na použitie.
:::

## Nastavenia správcu

Nastavenia správcu sú zámerne skryté, aby členovia cirkvi, ktorí kiosk používajú, nemohli náhodne zmeniť konfiguráciu. Ak sa k nim chcete dostať:

1. Klepnite na **logo cirkvi** v hlavičke **sedemkrát** za sebou rýchlo (do dvoch sekúnd).
2. Ak je nastavený PIN kiosku, pri výzve zadajte PIN.
3. Otvorí sa obrazovka **Nastavenia správcu** s týmito možnosťami:
   - **Zmeniť bohoslužbu** — prepnutie vybraného času bohoslužby
   - **Zmeniť tlačiareň** — otvorenie [nastavení tlačiarne](./printer-setup.md), kde môžete vyhľadať a vybrať tlačiareň
   - **Nastaviť PIN správcu** (alebo **Zmeniť PIN správcu**, keď je už nastavený) — nastavenie alebo aktualizácia PIN kiosku, ktorý chráni prístup správcu
   - **Hromadná správa** — odoslanie textovej správy opatrovníkom každej prihlásenej domácnosti (pozri [Hromadná správa](../check-in/checking-out.md#emergency-broadcast))
   - **Režim obsadenej stanice** — prepínač, ktorý tejto stanici pridá odhlasovanie, vyvolávanie, opätovnú tlač a úpravu profilov (pozri [Odhlasovanie](../check-in/checking-out.md))
   - **Odhlásiť sa** — odhlásenie a návrat na prihlasovaciu obrazovku

   Klepnutím na **Späť na kiosk** sa vráťte k prihlasovaniu.

:::warning
Odhlásenie vymaže všetky uložené prihlasovacie údaje a výber cirkvi. Ak chcete kiosk znova použiť, budete musieť znova zadať e-mail a heslo. Odhláste sa, len keď potrebujete prepnúť účet alebo znova nakonfigurovať kiosk.
:::

## Ďalšie kroky

Po prihlásení môžete [nastaviť tlačiareň](./printer-setup.md) alebo prejsť priamo na [postup prihlasovania](../check-in/index.md).
