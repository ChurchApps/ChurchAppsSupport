---
title: "Videz"
---

# Videz

<div class="article-intro">

Stran Videz vam omogoča prilagajanje splošnega videza in občutka vaše cerkvene spletne strani. Od barv in pisav do razmikov in lastne CSS kode lahko na enem mestu nadzirate vsak vizualni vidik svoje strani.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Dokončajte [začetno nastavitev](initial-setup) za svojo spletno stran
- Pripravite logotip svoje cerkve v formatu PNG s prosojnim ozadjem in razmerjem stranic 4:1
- Če imate obstoječ slogovni vodnik, poznajte barve svoje cerkve (šestnajstiške vrednosti)

</div>

## Dostop do nastavitev videza

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu) in razširite **Spletna stran**.
2. Kliknite **Videz**.
3. Stran **Slogi strani** se naloži. Kartica **Tema, pisave in noga** prikazuje seznam **Nastavitve sloga** na levi in predogled vzorčne strani na desni. Pod njo sta kartici **Obvestila in pripomočki** ter **Preusmeritve in analitika**.

## Paleta barv {#color-palette}

1. V plošči Nastavitve sloga kliknite **Paleta barv**.
2. Prikazali se bodo **Osnovne barve** (svetli, poudarjeni in temni odtenki) ter **Semantične barve** (Primarna, Sekundarna, Uspeh, Opozorilo in Napaka).
3. Kliknite katerikoli barvni vzorec, da odprete izbirnik barv. Povlecite izbiralnik ali vnesite šestnajstiško vrednost, da izberete barvo.
4. **Predogled kombinacij barv** prikazuje, kako se izbrane barve ujemajo med seboj.
5. Če želite hitro uporabiti vnaprej oblikovano barvno shemo, uporabite **Predlagane palete**.
6. Ko ste zadovoljni, kliknite **Shrani paleto**.

## Tipografija

1. V plošči Nastavitve sloga kliknite **Pisave**.
2. Kliknite gumb **Pisava za naslove** ali **Pisava za besedilo**, da odprete brskalnik pisav. Iščete lahko po imenu ali brskate po kategorijah, kot so Serif, Sans Serif, Display, Handwriting in Monospace. Lahko izberete tudi eno od **Priljubljenih kombinacij pisav**.
3. Kliknite **Shrani pisave**, da uveljavite svojo izbiro pisav.
4. Če želite prilagoditi velikostno hierarhijo za naslove od 1 do 4, kliknite **Lestvica tipografije** v plošči Nastavitve sloga. Za natančno nastavitev uporabite polja **Množitelj velikosti**, **Osnovna velikost** in **Višina vrstice**, nato kliknite **Shrani tipografijo**.

## Razmiki

1. V plošči Nastavitve sloga kliknite **Lestvica razmikov**.
2. Prilagodite vrednosti razmikov od **Zelo majhne** do **Zelo velike**. Praktični primeri prikazujejo, kako vsaka vrednost vpliva na postavitev.
3. Kliknite **Shrani razmike**, da uveljavite vrednosti na celotni spletni strani.

## Logotip in blagovna znamka {#logo-and-branding}

1. V plošči Nastavitve sloga kliknite **Logotip**.
2. Naložite **Logotip za svetlo ozadje** in **Logotip za temno ozadje**. Za najboljše rezultate uporabite slike s prosojnim ozadjem in razmerjem stranic 4:1.
3. Za predoglede povezav naložite **Sliko za družbena omrežja**, za ikono v zavihku brskalnika pa **Favicon**.
4. Kliknite **Shrani spremembe**. Naložene slike se ne shranijo, dokler jih ne shranite, zato vas bo brskalnik opozoril na neshranjene spremembe, če poskusite pred tem zapreti ali osvežiti zavihek.

:::tip
Za najboljše rezultate uporabite logotip v formatu PNG s prosojnim ozadjem. To zagotavlja, da je videti dobro tako na svetlih kot na temnih ozadjih na vaši spletni strani in v [mobilni aplikaciji](../settings/mobile-app.md).
:::

## Slogi navigacije

Prilagodite barve navigacijske vrstice spletne strani za polni in prosojni način:

1. V plošči Nastavitve sloga kliknite **Navigacija**.
2. Nastavite barve za **Glavo (polno)** in **Glavo nad hero sliko (prosojno)**.
3. Kliknite **Shrani navigacijo**, da uveljavite barve navigacije.

Za podrobna navodila glejte [Slogi navigacije](./navigation-styles.md).

## Obvestila in pripomočki

Pripomočki spletne strani se prikažejo na vsaki strani vaše spletne strani in lebdijo nad vsebino strani:

- **Pasica z obvestilom** -- Pasica na vrhu spletne strani, ki jo lahko zaprete, za časovno občutljiva sporočila, na primer za prihajajoči dogodek ali spremembo bogoslužja.
- **Zaganjalnik** -- Lebdeči gumb, ki odpre meni za hiter dostop, na primer do povezav za darovanje, prijavo ali ogled biltena.

1. Pod Nastavitvami sloga poiščite kartico **Obvestila in pripomočki**.
2. Vklopite pripomočke, ki jih želite, ter nastavite njihovo besedilo, povezave in barve.
3. Kliknite **Shrani**.

## Preusmeritve in analitika

Kartica **Preusmeritve in analitika** (pod Nastavitvami sloga) vsebuje dve nepovezani, a pogosto potrebni nastavitvi:

- **Analitika** -- Dodajte svoj **ID za merjenje GA4** (oblike `G-XXXXXXXXXX`), da spremljate obisk na svoji spletni strani. Isti ID spremlja tudi oglede strani v vaši cerkveni aplikaciji B1 (član­ski portal na `/mobile`, vključno z nameščeno aplikacijo). Ogledi so označeni z `display_mode` z vrednostjo `installed` ali `browser`, tako da lahko v Google Analytics ločite obiske nameščene aplikacije od obiskov v brskalniku.
- **Preusmeritve** -- Preslikajte staro pot URL-ja na novo, tako da povezave na stran, ki ste jo premaknili ali preimenovali, še vedno delujejo in ne vrnejo napake 404. Vnesite staro pot **Od** in novo pot **Do**, nato kliknite **Shrani**. Preusmeritev ima prednost tudi pred vgrajenimi stranmi B1 (`/sermons`, `/stream`, `/donate`, `/bible` in `/votd`), zato lahko ta naslov pošljete drugam, na primer na svojo stran s pridigami ali kanal YouTube. Preusmeritve ne preglasi stran, ki ste jo sami ustvarili na istem naslovu. Če želite, da se preusmeritev uporabi, najprej izbrišite to stran.

## Lastna CSS koda in JavaScript

1. V plošči Nastavitve sloga kliknite **CSS in Javascript**.
2. Dodajte **Lastno CSS kodo**, da prepišete privzete sloge za napredno prilagajanje.
3. Dodajte **Lastno HTML kodo** za sledilne kode ali druge skripte.
4. Uporabite razdelek **Pogosti primeri JavaScripta** za izseke, na primer za integracijo Google Analytics.

:::warning
Lastna CSS koda je zmogljiva, vendar lahko ob nepravilni uporabi pokvari postavitev vaše strani. Večina cerkva lahko doseže želeni videz z vgrajenimi nastavitvami barv, pisav in razmikov. Lastno CSS kodo uporabite le, če ste seznanjeni s spletnim razvojem.
:::

:::info
Vaša stran uveljavlja politiko varnosti vsebine (Content Security Policy), ki blokira vgrajene skripte iz katerega koli drugega vira. Polje **Lastna HTML koda** tukaj in [element HTML](page-editor#using-the-html-element) na posameznih straneh sta zaupanja vredni izjemi -- koda, ki jo tam shranite, se izvede tako, kot je, zato prilepite skripte le iz virov, ki jim zaupate (na primer sledilne kode za analitiko, klepetalne pripomočke in podobne vdelane vsebine).
:::

## Teme slogov

Če želite hitro izhodišče, vam **Predlagane palete** v razdelku Paleta barv ponudijo vnaprej pripravljene teme, ki z enim klikom nastavijo usklajene barve. Posamezne nastavitve lahko kadarkoli prilagodite tudi po uporabi teme.

## Naslednji koraki

- [Upravljanje strani](managing-pages) -- Ustvarjanje in urejanje strani vaše spletne strani
- [Datoteke](files) -- Nalaganje medijskih datotek za vašo spletno stran
