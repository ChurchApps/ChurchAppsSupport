---
title: "Plánovanie kalendára"
description: "Rozvrh týždenný či jednorazový v Kalendári FreePlay Admin: playlisty, servisné plány alebo priečinky poskytovateľov na skupinách obrazoviek, so zálohou predvolených slučiek."
---

# Plánovanie kalendára

<div class="article-intro">

Stránka **Kalendár** vo FreePlay Admin určuje, čo každá skupina obrazoviek prehráva a kedy. Pridajte plán pre playlist, plán bohoslužby alebo priečinok poskytovateľa a nastavte, aby sa opakoval každý týždeň alebo prehral jednorazovo. Ak nie je nič naplánované, prehrá sa predvolená slučka skupiny.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vytvorte aspoň jednu skupinu obrazoviek. Pozri [Správa obrazoviek a skupín](./managing-screens.md#screen-groups)
- [Vytvorte playlist](./building-playlists.md) alebo mať nastavený typ plánu v B1 Admin

</div>

## Čítanie kalendára

1. Prejdite na **Kalendár**.
2. Vyberte skupinu obrazoviek z kariet v hornej časti. Každá karta zobrazuje, koľko plánov má skupina.
3. Týždenné zobrazenie beží od pondelka do nedele, od 6:00 do 22:00. Červená čiara označuje aktuálny čas.
4. Pomocou šípok prejdite na predchádzajúci alebo nasledujúci týždeň, alebo kliknite na **Dnes** a vráťte sa na tento týždeň.

Podnadpis stránky zobrazuje časové pásmo, ktoré kalendár používa. Plány sa riadia časovým pásmom vašej cirkvi, ktoré nastavujete v B1 Admin v časti [Informácie o cirkvi](../../b1-admin/settings/church-settings.md#time-zone). Ak vaša cirkev nemá nastavené časové pásmo, FreePlay použije časové pásmo vášho kampusu. Kalendár a vaše televízory používajú rovnaké časové pásmo, takže blok umiestnený na 9:00 v kalendári sa prehrá o 9:00 na obrazovke, aj keď je váš počítač nastavený na iné časové pásmo.

Plány sú farebne odlíšené podľa typu. Legenda vysvetľuje farby:

- **Predvolená slučka** - Šrafované pozadie, zobrazuje sa za všetkým, keď má skupina predvolenú slučku
- **Playlist**
- **Plán bohoslužby**
- **Priečinok poskytovateľa**

Každý blok zobrazuje svoj názov. Vyššie bloky zobrazujú aj časy, či sa opakuje (**týždenne** alebo **jednorazovo**) a čo sa stane, keď sa skončí skôr.

## Nastavenie predvolenej slučky

Predvolená slučka sa prehráva na obrazovkách skupiny vždy, keď nie je nič naplánované.

1. Na stránke **Kalendár** kliknite v hlavičke na **Predvolená slučka…**. Ak je predvolená slučka už nastavená, tlačidlo zobrazuje **Predvolená slučka:** a za ňou názov playlistu.
2. Vyberte **Playlist** alebo vyberte **Žiadna — obrazovka stmavne**.
3. Kliknite na **Uložiť**.

## Pridanie plánu

Nový plán môžete začať troma spôsobmi:

- Kliknite na prázdne miesto v kalendári. Formulár sa otvorí s predvyplneným dňom a polhodinou.
- Kliknite na **Pridať plán** v hlavičke.
- Vyberte **Pridať plán** z paletového menu (**Ctrl+K** alebo **⌘K**).

Potom vyplňte formulár:

1. **Prehrať** - Vyberte, čo sa má prehrať:
   - **Playlisty** - Ľubovoľný playlist, ktorý ste vytvorili
   - **Plány bohoslužieb** - Typ plánu z B1 Admin, označený **(aktuálny plán)**. Obrazovka každý týždeň prehrá aktuálny plán pre daný typ plánu, vrátane lekcií Go Curriculum (aj prispôsobených), ktoré používajú prihlásenie Go prepojené s ministerstvom typu plánu
   - **Priečinok poskytovateľa…** - Otvorí **Vyberte priečinok poskytovateľa**. Prejdite na priečinok a kliknite na **Použiť tento priečinok**. Ak chcete neskôr vybrať iný priečinok, kliknite na **Zmeniť**
2. **Opakuje sa** - Vyberte dni v týždni, v ktoré sa tento plán prehráva. Pre jednorazový dátum zapnite **Jednorazovo** a vyberte **Dátum**.
3. **Začiatok** a **Koniec** - Časy, kedy sa plán začína a končí.
4. **Ak sa skončí skôr** - Čo urobiť, keď sa obsah minie pred koncovým časom:
   - **Opakovať do koncového času** - Začne znova od začiatku. Vhodné pre slučky na signalizáciu, oznámenia a odpočítavanie
   - **Tempo určuje lektor** - Snímky čakajú na diaľkové ovládanie lektora. Lekcia zostane na obrazovke aj po koncovom čase, až do poslednej snímky
   - **Prehrať raz, potom sa vrátiť k predvolenej slučke**
5. Pri opakujúcich sa plánoch nastavte **Začína** na prvý dátum. V časti **Končí** vyberte **Nikdy**, alebo vyberte **K dátumu** a zadajte **Dátum ukončenia**.
6. Kliknite na **Uložiť**.

:::info
**Tempo určuje lektor** nahradilo staršiu možnosť „podržať poslednú snímku“. Plány uložené s touto možnosťou sa teraz prehrávajú ako tempo určuje lektor.
:::

## Úprava alebo odstránenie plánu

1. Kliknite na blok plánu v kalendári.
2. Zmeňte ľubovoľné pole a kliknite na **Uložiť**, alebo kliknite na **Odstrániť** a plán odstráňte.

## Prekrývajúce sa plány

Ak sa dva plány prekrývajú, formulár zobrazí upozornenie: **Prekrýva sa s iným plánom. Vyhráva ten, ktorý začína neskôr.** Počas behu neskoršieho plánu ho obrazovky prehrávajú. Keď sa skončí, vrátia sa k skoršiemu plánu, ak ešte beží.

## Ako obrazovky preberajú zmeny

Spárované obrazovky stiahnu všetko naplánované na nasledujúcich 7 dní a samy kontrolujú zmeny. Po úprave kalendára sa k televízoru nemusíte dotýkať. Aby ste zistili, kedy má obrazovka všetko potrebné, pozrite si **Pripravené do** na [stránke Obrazovky](./managing-screens.md).

## Súvisiace články

- **[Vytváranie playlistov](./building-playlists.md)** - Vytvorte playlisty, ktoré plánujete
- **[Plánované prehrávanie v televízore](./scheduled-playback.md)** - Ako na televízore fungujú lekcie s tempom určeným lektorom a diaľkové ovládanie
- **[Správa obrazoviek a skupín](./managing-screens.md)** - Pridávanie skupín a kontrola sťahovania na každej obrazovke
- **[Ponechanie iba časti každej lekcie](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Skráťte každú naplánovanú lekciu v type plánu na časti, ktoré prehráva vaša miestnosť
