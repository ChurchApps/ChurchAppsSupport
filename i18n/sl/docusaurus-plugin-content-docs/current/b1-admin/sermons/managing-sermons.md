---
title: "Upravljanje pridig"
---

# Upravljanje pridig

<div class="article-intro">

Stran Pridige prikazuje celotno zbirko vaših pridig. Tukaj lahko dodajate nove pridige, urejate obstoječe vnose in svojo vsebino razvrščate po seznamih predvajanja. Vsaka pridiga se lahko povezuje z videoposnetkom ali zvočnim zapisom, gostovanim na YouTubu, Vimeu, Facebooku ali na URL-ju po meri.

</div>

<div class="prereqs">
<h4>Pred začetkom</h4>

- Potrebujete dovoljenje **contentApi.streamingServices.edit**. Če nimate dostopa, glejte [Vloge in dovoljenja](../settings/roles-permissions.md).
- Ustvarite vsaj en [seznam predvajanja](playlists), v katerega boste razvrstili pridige
- Pripravite ID-je videoposnetkov ali URL-je z YouTuba, Vimea ali Facebooka

</div>

## Ogled zbirke pridig

1. V B1 Adminu odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Pridige** in kliknite **Pridige**.
2. Stran Pridige prikazuje vaše vnose v tabeli z **Seznamom predvajanja**, naslovom in **Datumom objave** za vsako pridigo. Za filtriranje seznama uporabite iskalno polje nad tabelo. Vaši seznami predvajanja so navedeni v plošči **Seznami predvajanja** ob tabeli.
3. Kliknite **Uredi** v vrstici katere koli pridige, da si ogledate ali uredite njene podrobnosti.

## Dodajanje pridige

1. Kliknite gumb **Dodaj pridigo** v zgornjem desnem kotu in v spustnem meniju izberite **Dodaj pridigo**.
2. Izberite **Seznam predvajanja**, na katerega želite dodeliti pridigo.
3. Izberite **Ponudnika videa** -- YouTube, Vimeo, Facebook ali URL po meri. Priporočamo YouTube, saj najbolje deluje s sistemom B1.
4. Vnesite ID videoposnetka ali URL in kliknite **Pridobi**. Pri YouTubu je ID videoposnetka niz znakov za `v=` v URL-ju YouTuba.
5. Ko kliknete **Pridobi**, se podrobnosti pridige samodejno uvozijo, vključno z datumom objave, trajanjem, naslovom, opisom in sličico.
6. Naredite želene spremembe in kliknite **Shrani**.

:::tip
Trajni URL za živi prenos lahko dodate tudi tako, da v spustnem meniju **Dodaj pridigo** izberete **Dodaj trajni URL za živi prenos**. To ustvari stalno povezavo z živim prenosom vašega YouTube kanala z uporabo vašega ID-ja kanala. Za več podrobnosti glejte [Živi prenos](live-streaming).
:::

## Urejanje pridige

1. Kliknite **Uredi** v vrstici katere koli pridige v zbirki, da odprete njene podrobnosti.
2. Po potrebi posodobite naslov, govornika, datum, opis, sličico ali povezave do medijev.
3. Kliknite **Shrani**, da uveljavite spremembe.

## Podrobnosti pridige

Vsak vnos pridige lahko vključuje:

- **Naslov** -- ime pridige, prikazano obiskovalcem
- **Govornik** -- kdo je imel pridigo
- **Datum** -- datum objave ali izvedbe
- **Opis** -- povzetek vsebine pridige
- **Sličica** -- predogledna slika, prikazana v vaši zbirki pridig
- **Povezave do videa/zvoka** -- URL-ji do medijev pridige na YouTubu, Vimeu, Facebooku ali na gostovanju po meri
- **URL zvočne datoteke (za podcast)** -- neposredna povezava do datoteke MP3/M4A za to pridigo. Prilepite URL ali kliknite **Naloži zvok**, da naložite datoteko, in polje se samodejno izpolni. V podcast vir so vključene samo pridige, pri katerih je nastavljeno to polje (ali neposredna povezava do video datoteke).

## Vaš podcast vir

Ko ima vsaj ena pridiga pripeto zvočno ali video datoteko, B1 Admin samodejno ustvari RSS vir podcasta za vašo cerkev -- ničesar vam ni treba vklopiti. Najdete ga v plošči **Podcast vir** pod seznamom pridig: kliknite ikono za kopiranje, da kopirate URL vira, nato pa ta URL oddajte v Apple Podcasts, Spotify ali kateri koli drug imenik podcastov.

:::info
Pridige, ki se povezujejo samo na vdelani predvajalnik (na primer z ID-jem videoposnetka na YouTubu ali Vimeu), se ne bodo prikazale v podcast viru -- aplikacije za podcaste potrebujejo neposredno datoteko za prenos. Za vključitev pridige dodajte **URL zvočne datoteke**.
:::

## Načrtovanje pridige za živi prenos

Po dodajanju pridige jo lahko načrtujete za predvajanje na strani živega prenosa:

1. V meniju Jump izberite **Pridige > Časi živega prenosa**.
2. Uredite bogoslužje in pod **Nastavitve videa** izberite svojo pridigo v spustnem meniju.
3. Pridiga se bo predvajala ob načrtovanem času bogoslužja.

:::info
Če želite več pridig uvoziti naenkrat namesto, da jih dodajate eno po eno, uporabite orodje [Množični uvoz](bulk-import), ki neposredno potegne videoposnetke iz vašega računa YouTube ali Vimeo.
:::

## Naslednji koraki

- [Seznami predvajanja](playlists) -- razvrstite pridige v serije
- [Živi prenos](live-streaming) -- nastavite urnik prenosov
- [Množični uvoz](bulk-import) -- uvozite več pridig naenkrat
