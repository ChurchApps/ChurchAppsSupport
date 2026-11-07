---
title: "Prihlásenie"
---

# Prihlásenie

<div class="article-intro">

Skôr než môžete kiosk použiť na check-in, musíte sa prihlásiť pomocou účtu ChurchApps, ktorý má prístup k vašej cirkvi. Táto stránka popisuje prvé prihlásenie, výber cirkvi, správanie automatického prihlásenia a odhlásenie.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte B1 Church Checkin na svoj tablet s Androidom (pozri [Začíname](./index.md))
- Pripravte si e-mail a heslo k svojmu účtu ChurchApps
- Účet potrebuje oprávnenie **Checkin** (alebo **Edit Attendance**) vo vašej cirkvi. Správca ho pridá v B1 Admin v sekcii **Settings > Roles** — pozri [Účty kioskov pre check-in](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Prvé prihlásenie

1. Otvorte aplikáciu B1 Church Checkin. Po úvodnej obrazovke sa zobrazí prihlasovacia obrazovka s logom B1 Church Checkin.
2. Do prvého poľa zadajte svoju **e-mailovú adresu**.
3. Do druhého poľa zadajte svoje **heslo**.
4. Klepnite na tlačidlo **Login**.

Aplikácia overí vaše údaje a prihlási vás. Ak je e-mail alebo heslo nesprávne, v dolnej časti obrazovky sa zobrazí chybové hlásenie.

Ak má účet zapnuté [dvojfaktorové prihlásenie](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikácia potom vyžiada kód. Zadajte 6-miestny kód z autentifikačnej aplikácie vlastníka účtu alebo jeden z jeho záložných kódov a znova klepnite na **Login**. Kód potrebujete len pri tomto prvom prihlásení; potom kiosk zostane prihlásený.

:::info
Je to rovnaký e-mail a heslo, aké používate v B1 Admin alebo v ktoromkoľvek inom produkte ChurchApps. Pre kiosk na check-in nepotrebujete samostatný účet.
:::

## Výber cirkvi

Po úspešnom prihlásení aplikácia načíta cirkvi, v ktorých má váš účet oprávnenie **Checkin** alebo **Edit Attendance**. Cirkvi, v ktorých máte len iné oprávnenia, sa vynechajú. Ak nezostane žiadna, aplikácia zobrazí hlásenie **No check-in access** a požiada vás, aby ste nechali správcu cirkvi pridať oprávnenie Checkin k jednej z vašich rolí. Každá cirkev sa zobrazí ako karta s názvom cirkvi a logom (ak bolo nastavené v B1 Admin).

- Ak je váš účet prepojený **iba s jednou cirkvou**, výber cirkvi sa aj tak zobrazí. Na pokračovanie klepnite na svoju cirkev.
- Ak je váš účet prepojený **s viacerými cirkvami**, klepnite na cirkev, ktorú má tento kiosk obsluhovať.

Po výbere cirkvi aplikácia načíta nastavenia vzhľadu a značky tejto cirkvi. Logo vašej cirkvi sa bude zobrazovať v hlavičke na všetkých ďalších obrazovkách.

## Automatické prihlásenie pri ďalšom použití

Po prvom úspešnom prihlásení si aplikácia na tablete uchová bezpečný prihlasovací token a vašu vybranú cirkev. Vaše heslo neukladá. Pri ďalších spusteniach:

- Aplikácia vás prihlási späť pomocou uloženého tokenu.
- Ak ste predtým vybrali cirkev, obnoví tento výber a prenesie vás priamo na **obrazovku služieb**.
- Ak uložené prihlásenie už nie je platné, aplikácia vás vráti na prihlasovaciu obrazovku, aby ste sa mohli znova prihlásiť.

:::tip
Keďže sa kiosk prihlasuje automaticky, údaje musíte zadať len raz pri počiatočnom nastavení. Potom stačí tablet zapnúť a bude pripravený na použitie.
:::

## Nastavenia správcu

Nastavenia správcu sú zámerne skryté, aby členovia cirkvi, ktorí kiosk používajú, nemohli omylom zmeniť konfiguráciu. Ako sa k nim dostanete:

1. Sedemkrát rýchlo po sebe (do dvoch sekúnd) klepnite na **logo cirkvi** v hlavičke.
2. Ak je nastavený PIN kiosku, po výzve zadajte PIN.
3. Otvorí sa obrazovka **Admin Settings** s týmito možnosťami:
   - **Change Service** — zmena vybraného času služby
   - **Change Printer** — otvorenie [nastavení tlačiarne](./printer-setup), kde môžete vyhľadať a vybrať tlačiareň
   - **Set/Change PIN** — nastavenie alebo zmena PIN kiosku, ktorý chráni prístup správcu
   - **Logout** — odhlásenie a návrat na prihlasovaciu obrazovku

:::warning
Odhlásenie vymaže všetky uložené prihlasovacie údaje a výber cirkvi. Ak chcete kiosk znova použiť, musíte znova zadať e-mail a heslo. Odhlasujte sa len vtedy, keď potrebujete prepnúť účty alebo znova nakonfigurovať kiosk.
:::

## Ďalšie kroky

Po prihlásení môžete [nastaviť tlačiareň](./printer-setup) alebo prejsť priamo na [postup check-in](../check-in/).
