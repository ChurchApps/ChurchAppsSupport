---
title: "Správa kázní"
---

# Správa kázní

<div class="article-intro">

Stránka Kázne zobrazuje celú vašu knižnicu kázní. Odtiaľto môžete pridávať nové kázne, upravovať existujúce záznamy a organizovať obsah podľa playlistov. Každá kázeň môže odkazovať na video alebo zvuk hostovaný na YouTube, Vimeo, Facebooku alebo vlastnej URL adrese.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Potrebujete oprávnenie **contentApi.streamingServices.edit**. Ak nemáte prístup, pozrite si [Roly a oprávnenia](../settings/roles-permissions.md).
- Vytvorte aspoň jeden [playlist](playlists), do ktorého budete kázne zaraďovať
- Majte pripravené ID videí alebo URL adresy z YouTube, Vimeo alebo Facebooku

</div>

## Zobrazenie knižnice kázní

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Kázne** a kliknite na **Kázne**.
2. Stránka Kázne zobrazuje vaše záznamy kázní v tabuľke so stĺpcami **Playlist**, názov a **Dátum publikácie**. Na filtrovanie zoznamu použite vyhľadávacie pole nad tabuľkou. Vaše playlisty sú uvedené na paneli **Playlisty** vedľa tabuľky.
3. Kliknutím na **Upraviť** pri ľubovoľnom riadku kázne zobrazíte alebo upravíte jej podrobnosti.

## Pridanie kázne

1. Kliknite na tlačidlo **Pridať kázeň** v pravom hornom rohu a v rozbaľovacej ponuke vyberte **Pridať kázeň**.
2. Vyberte **Playlist**, do ktorého chcete kázeň zaradiť.
3. Vyberte svojho **poskytovateľa videa** – YouTube, Vimeo, Facebook alebo Vlastná URL adresa. Odporúčame YouTube, pretože najlepšie funguje so systémom B1.
4. Zadajte ID videa alebo URL adresu a kliknite na **Načítať**. Pri YouTube je ID videa reťazec znakov za `v=` v URL adrese YouTube.
5. Po kliknutí na **Načítať** sa podrobnosti kázne automaticky importujú vrátane dátumu publikácie, dĺžky, názvu, popisu a náhľadového obrázka.
6. Vykonajte požadované zmeny a kliknite na **Uložiť**.

:::tip
Trvalú URL adresu živého prenosu môžete pridať aj výberom možnosti **Pridať trvalú URL adresu živého prenosu** v rozbaľovacej ponuke **Pridať kázeň**. Tým sa vytvorí stále prepojenie na živý prenos vášho kanála YouTube pomocou ID vášho kanála. Podrobnosti nájdete v časti [Živý prenos](live-streaming).
:::

## Úprava kázne

1. V knižnici kliknite na **Upraviť** pri ľubovoľnom riadku kázne a otvorte jej podrobnosti.
2. V prípade potreby upravte názov, kazateľa, dátum, popis, náhľadový obrázok alebo odkazy na médiá.
3. Kliknutím na **Uložiť** potvrdíte zmeny.

## Podrobnosti kázne

Každý záznam kázne môže obsahovať:

- **Názov** – názov kázne zobrazený návštevníkom
- **Kazateľ** – osoba, ktorá kázeň predniesla
- **Dátum** – dátum publikácie alebo prednesu
- **Popis** – zhrnutie obsahu kázne
- **Náhľadový obrázok** – náhľad zobrazený vo vašej knižnici kázní
- **Odkazy na video/zvuk** – URL adresy médií kázne na YouTube, Vimeo, Facebooku alebo vlastnom hostingu
- **URL adresa zvukového súboru (pre podcast)** – priamy odkaz na súbor MP3/M4A pre túto kázeň. Môžete vložiť URL adresu alebo kliknúť na **Nahrať zvuk**, nahrať súbor a pole sa vyplní automaticky. Do podcastového kanála sa zahrnú iba kázne, ktoré majú toto pole (alebo priamy odkaz na video súbor) vyplnené.

## Váš podcastový kanál

Ak má aspoň jedna kázeň pripojený zvukový alebo video súbor, B1 Admin automaticky vygeneruje RSS kanál podcastu pre vašu cirkev – nie je potrebné nič zapínať. Nájdete ho na paneli **Podcastový kanál** pod zoznamom kázní: kliknite na ikonu kopírovania a skopírujte URL adresu kanála, potom ju odošlite do Apple Podcasts, Spotify alebo iného podcastového adresára.

:::info
Kázne, ktoré odkazujú iba na vložený prehrávač (napríklad ID videa z YouTube alebo Vimeo), sa v podcastovom kanáli nezobrazia – podcastové aplikácie potrebujú priamy, stiahnuteľný mediálny súbor. Ak chcete kázeň zahrnúť, pridajte **URL adresu zvukového súboru**.
:::

## Naplánovanie kázne na živý prenos

Po pridaní kázne ju môžete naplánovať na vysielanie na stránke živého prenosu:

1. V ponuke Jump vyberte **Kázne > Časy živého prenosu**.
2. Upravte bohoslužbu a v časti **Nastavenia videa** vyberte svoju kázeň z rozbaľovacej ponuky.
3. Kázeň sa prehrá v naplánovanom čase bohoslužby.

:::info
Ak chcete naraz importovať viacero kázní namiesto ich pridávania po jednej, použite nástroj [Hromadný import](bulk-import), ktorý priamo stiahne videá z vášho účtu YouTube alebo Vimeo.
:::

## Ďalšie kroky

- [Playlisty](playlists) – usporiadajte kázne do seriálov
- [Živý prenos](live-streaming) – nastavte svoj harmonogram streamovania
- [Hromadný import](bulk-import) – importujte naraz viacero kázní
