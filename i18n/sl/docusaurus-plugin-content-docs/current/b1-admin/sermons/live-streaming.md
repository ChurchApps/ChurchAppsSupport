---
title: "Časi in nastavitev prenosov v živo v B1 Admin"
sidebar_label: "Live Streaming"
description: "V B1 Admin načrtujte tedenske ali enkratne prenose v živo, nastavite klepet in čas zgodnjega predvajanja, povežite kanal YouTube ter odpravite težave z vdelavo."
---

# Live Streaming

<div class="article-intro">

Stran Live Stream Times vam omogoča, da nastavite urnik pretakanja vaše cerkve, upravljate čas bogoslužij in prilagodite izkušnjo gledalcev. Nastavite ponavljajoča se tedenska bogoslužja ali enkratne dogodke, konfigurirate nastavitve klepeta in videa ter nadzorujete, kdaj vaš prenos začne teči v živo.

</div>

## Video za usposabljanje

<YouTube id="tpEY-sEYW6A" title="Nastavitev živega pretakanja v B1" next="Prilagoditev aplikacije za člane vaše cerkve v B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje **contentApi.streamingServices.edit**. Če nimate dostopa, glejte [Vloge in dovoljenja](../settings/roles-permissions.md).
- Pripravite ID vašega kanala YouTube, če nameravate uporabljati samodejno živo pretakanje
- Dodajte vsaj eno [pridigo](./managing-sermons.md) ali trajni živi URL, ki bo služil kot vir pretakanja

</div>

Živo pretakanje upravljate na dveh straneh v razdelku **Pridige** v meniju Jump: **Live Stream Times** za upravljanje urnika živega pretakanja in **Settings** za konfiguriranje zavihkov na vaši strani za pretakanje.

## Upravljanje bogoslužij

### Dodajanje bogoslužja

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Pridige** in kliknite **Live Stream Times**.
2. Na vrhu strani kliknite gumb **Add Service**, da ustvarite novo načrtovano bogoslužje. Obstoječa bogoslužja so navedena v tabeli, ki prikazuje ime, čas, ponudnika in trajanje vsakega bogoslužja; za spremembo kliknite ikono za urejanje v vrstici.
3. Vnesite **Service Name** (na primer »Nedeljsko jutranje bogoslužje«).
4. Nastavite **Service Time** -- izberite dan in uro, ob kateri se bogoslužje začne.
5. Za redna tedenska bogoslužja nastavite **Recurs Weekly** na **Yes**, za enkratni dogodek pa na **No**.

### Konfiguracija nastavitev klepeta in videa

6. V razdelku **Chat Settings** nastavite, koliko minut pred bogoslužjem in po njem naj bo klepet omogočen. Tako si obiskovalci lahko začnejo pisati, preden se bogoslužje začne, in klepetajo tudi po njem.
7. V razdelku **Video Settings** nastavite, kako zgodaj naj se začne video prenos za odštevanje ali vsebino pred bogoslužjem. Klepet se odpre toliko minut *pred* zgodnejšim začetkom videa, zato čas, prikazan poleg nastavitve minut pred bogoslužjem za klepet, upošteva obe vrednosti. Na primer: pri bogoslužju ob 10.00 s 15 minutami klepeta pred bogoslužjem in 5-minutnim zgodnejšim začetkom se klepet odpre ob 9.40.
8. Iz spustnega seznama izberite, katero pridigo naj se predvaja:
   - **Latest Sermon** -- samodejno predvaja vaš najnovejši dodani video.
   - **Current Live Service** -- predvaja vaš trenutni živi prenos z YouTuba prek ID-ja vašega kanala.
   - Lahko izberete tudi katero koli določeno pridigo, ki ste jo že shranili.
9. Kliknite **Save**, da načrtujete bogoslužje.

:::info
Če je bogoslužje nastavljeno kot ponavljajoče, se bo vsak teden samodejno posodobilo. Ohrani isti lokalni čas, ko se začne ali konča poletni čas. Dodate lahko poljubno število bogoslužij. Obiskovalci bodo ob obisku vaše strani za pretakanje videli čas naslednjega načrtovanega bogoslužja.
:::

## Nastavitve strani za pretakanje

Če želite prilagoditi zavihke in povezave, ki se prikažejo ob vašem živem prenosu, v meniju Jump razširite **Pridige** in kliknite **Settings**. Stran **Stream Settings** prikazuje seznam vaših **Content Tabs**.

### Dodajanje zavihkov

1. Kliknite gumb **Add**, da na stran za živo pretakanje dodate nov zavihek.
2. Izberite **Link Type**: **External URL** za lastno povezavo ali enega od vnaprej oblikovanih zavihkov **Chat** ali **Prayer**.
3. Za zavihek Chat mu v polju **Tab Text** samo dajte ime in nastavitev je končana.
4. Za povezan zavihek vnesite ime zavihka, izberite ikono s klikom na gumb za ikono in vnesite URL.
5. Nastavljeni zavihki se bodo prikazali na strani za živo pretakanje, da bodo gledalci lahko dostopali do dodatnih virov in interaktivnih funkcij.

### Predogled vašega prenosa

Na strani **Live Stream Times** kliknite **View Your Stream** na vrhu strani, da si natančno ogledate, kako bo stran za živo pretakanje videti obiskovalcem, vključno z vašim logotipom, časi bogoslužij in nastavljenimi zavihki.

## Nastavitev vašega živega prenosa na YouTubu

Za povezavo vašega kanala YouTube za samodejno živo pretakanje:

1. Pojdite na **Pridige** in kliknite **Add Sermon**, nato izberite **Add Permanent Live URL**.
2. Ponudnik videa je privzeto **Current YouTube Live Stream**. Vnesite svoj **YouTube Channel ID**.
3. Dodajte naslov in opis, nato kliknite **Save**.
4. V **Live Stream Times** ustvarite bogoslužje in v spustnem seznamu pridig izberite svoj trajni živi URL.

:::tip
ID vašega kanala YouTube najdete v naprednih nastavitvah vašega kanala YouTube. Kopirajte vrednost **Channel ID**.
:::

## Prilagoditev barv in logotipa

Vaša stran za živo pretakanje uporablja nastavitve [videza](../website/appearance.md) vaše spletne strani:

- Za glavo se uporablja **svetla poudarna barva** s temnim besedilom.
- Za stransko vrstico se uporablja **temna poudarna barva** s svetlim besedilom.
- Na strani za pretakanje se prikaže vaš **Light Background Logo**. Uporabite sliko sprozornim ozadjem in razmerjem stranic 4:1.

Če želite to spremeniti, pojdite na **Website**, nato na **Appearance** in posodobite nastavitve [barvne palete](../website/appearance.md#color-palette) in [logotipa](../website/appearance.md#logo-and-branding).

## Dodajanje voditeljev pretakanja

Če želite članom ekipe omogočiti dostop do klepeta samo za voditelje poleg javnega klepeta:

1. V meniju Jump izberite **Settings > Roles**.
2. Kliknite gumb plus in izberite **Add Custom Role**.
3. Poimenujte vlogo »Streaming Host« in kliknite **Save**.
4. Kliknite novo vlogo, nato v razdelku Members kliknite **Add**, da dodate osebe.
5. Pomaknite se navzdol do **Edit Permissions**, razširite razdelek **Content** in označite **Host Chat**.

Ko se gostitelji prijavijo na stran za živo pretakanje, se poleg javnega klepeta prikaže zasebni zavihek **Host Chat** za pogovore samo za osebje med prenosom.

:::info
Za več podrobnosti o ustvarjanju vlog in upravljanju dovoljenj glejte [Vloge in dovoljenja](../settings/roles-permissions.md).
:::

## Odpravljanje težav

Če se vaš samodejni živi prenos na YouTubu ne prikazuje pravilno pri uporabi možnosti »Current YouTube Live Stream« z ID-jem vašega kanala, poskusite naslednje:

**Simptomi:**
- Vdelani živi prenos prikazuje »Video unavailable«
- Stran se naloži, vendar se video ne prikaže
- Neposredne vdelave YouTuba delujejo, samodejni živi prenos kanala pa ne

**Rešitev:**
Preverite svoj kanal YouTube za stare ali prihajajoče načrtovane žive prenose in jih izbrišite:

1. Pojdite v YouTube Studio.
2. Pomaknite se do **Content**, nato do **Live**.
3. Poiščite stare načrtovane žive prenose ali prihajajoče načrtovane prenose.
4. Izbrišite te stare ali načrtovane vnose živih prenosov.
5. Ponovno preizkusite stran za živo pretakanje.

:::warning
Samodejna vdelava živega prenosa kanala YouTube se lahko blokira, če je v vašem kanalu več načrtovanih ali preteklih vnosov živih prenosov. Z njihovim odstranjevanjem YouTube lahko pravilno prepozna in predvaja vaš trenutni živi prenos.
:::

**Dodatne zahteve:**
- Vaš živi prenos mora biti nastavljen na **Public** (ne Unlisted ali Private).
- Vdelava mora biti dovoljena v nastavitvah pretakanja v YouTubu.
- Prepričajte se, da uporabljate ponudnika **Current YouTube Live Stream** (z ID-jem kanala), ne ponudnika **YouTube** (z ID-jem videa).

## Naslednji koraki

- [Upravljanje pridig](./managing-sermons.md) -- dodajanje pridig v vašo knjižnico
- [Seznami predvajanja](./playlists.md) -- razvrščanje pridig v serije
