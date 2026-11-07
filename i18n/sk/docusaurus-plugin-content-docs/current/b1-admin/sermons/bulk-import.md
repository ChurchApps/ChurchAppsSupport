---
title: "Hromadný import"
---

# Hromadný import

<div class="article-intro">

Stránka Hromadný import vám umožní rýchlo naplniť knižnicu kázní importom videí z YouTube alebo Vimeo. Ide o najrýchlejší spôsob, ako pridať existujúci obsah kázní, namiesto pridávania jedného videa za druhým.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete oprávnenie **contentApi.streamingServices.edit**. Ak k nemu nemáte prístup, pozrite si [Roly a oprávnenia](../settings/roles-permissions.md).
- Vytvorte aspoň jeden [playlist](playlists), do ktorého chcete kázne importovať
- Pripravte si ID vášho kanála YouTube alebo údaje o účte Vimeo

</div>

## Výber zdroja

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Kázne** a kliknite na **Kázne**. Kliknite na **Pridať kázeň** a z ponuky vyberte **Hromadný import**.
2. V časti **Vyberte zdroj importu** uvidíte dve možnosti:
   - **YouTube** -- Import videí z kanála YouTube
   - **Vimeo** -- Import videí z účtu Vimeo
3. Kliknite na možnosť platformy, kde sú vaše kázne uložené (alebo kliknite na **Importovať z YouTube** / **Importovať z Vimeo** pod jej popisom). Kliknutím na **Späť** v hornej časti stránky sa vrátite k výberu zdroja.

:::tip
Ak máte videá na oboch platformách, môžete sa kedykoľvek vrátiť a zdroj prepnúť.
:::

## Pred importom

Pred importom videí potrebujete aspoň jeden playlist, do ktorého ich zaradíte. Ak ste ešte nevytvorili žiadny playlist:

1. Vráťte sa na stránku **Kázne** a nájdite panel **Playlisty**.
2. Kliknite na **Vytvoriť prvý playlist** a vyplňte názov, popis, dátum zverejnenia a miniatúru.
3. Kliknite na **Uložiť** a potom sa vráťte na Hromadný import kliknutím na **Pridať kázeň** a výberom **Hromadný import**.

Podrobné pokyny na vytváranie a správu playlistov nájdete na stránke [Playlisty](playlists).

## Import videí

1. Po výbere YouTube alebo Vimeo zadajte do poľa **ID kanála YouTube** alebo **údaje o účte Vimeo**.
2. Kliknite na tlačidlo **Načítať**, aby sa načítali všetky dostupné videá z vášho kanála alebo účtu.
3. Po načítaní uvidíte zoznam všetkých videí so zaškrtávacími políčkami.
4. Zaškrtnite políčka pri videách, ktoré chcete importovať. Môžete vybrať všetky alebo konkrétne.
5. Voliteľne zapnite **Automaticky importovať nové videá**, aby sa budúce nahrávky automaticky pridávali do vašej knižnice.
6. Kliknite na rozbaľovací zoznam **Importovať do playlistu**, aby ste vybrali, do ktorého playlistu sa tieto videá majú pridať.
7. Kliknutím na tlačidlo **Importovať** dokončíte hromadný import.

Vaše videá sa naimportujú so všetkými podrobnosťami vrátane názvov, popisov, dátumov a miniatúr. Špeciálne znaky v názvoch a popisoch na YouTube, ako sú `&`, apostrofy a úvodzovky, sa zobrazia tak, ako boli napísané, a nie ako kódy typu `&amp;`.

:::info
Hromadný import je ideálny na začiatok, keď migrujete z inej platformy. Na pridávanie jednotlivých kázní do budúcnosti použite radšej stránku [Správa kázní](managing-sermons).
:::

## Ďalšie kroky

- [Správa kázní](managing-sermons) -- Úprava podrobností importovaných kázní
- [Playlisty](playlists) -- Vytváranie a správa sérií kázní
- [Živé streamovanie](live-streaming) -- Nastavenie živého streamovania vašich bohoslužieb
