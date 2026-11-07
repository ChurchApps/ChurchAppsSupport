---
title: "Slogi navigacije"
---

# Slogi navigacije

<div class="article-intro">

Prilagodite barve navigacijske vrstice vaše cerkvene spletne strani, da se ujemajo z vašo blagovno znamko. Barve lahko nastavite tako za trdne ozadje kot za prosojne prekrivne sloje, kar vam omogoča popoln nadzor nad videzom navigacije na različnih straneh.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje za upravljanje vaše cerkvene spletne strani. Podrobnosti najdete v razdelku [Vloge in dovoljenja](../people/roles-permissions.md).
- Pripravite barve svoje blagovne znamke, vključno s šestnajstiškimi kodami barv (npr. #03A9F4).
- Razumite razliko med trdnim in prosojnim slogom navigacije na vaši spletni strani.

</div>

## Razumevanje načinov navigacije

Navigacija vaše spletne strani se lahko prikaže v dveh različnih slogih, odvisno od strani:

- **Trdna navigacija** -- Navigacijska vrstica z barvnim ozadjem, običajno uporabljena na vsebinskih straneh
- **Prosojna navigacija** -- Navigacija, ki se prekriva z vsebino strani, običajno uporabljena na straneh s slikami v ospredju ali celozaslonskimi ozadji

Barve za oba načina lahko prilagajate neodvisno.

## Dostop do slogov navigacije

1. V aplikaciji B1 Admin odprite [meni za hitri skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu) in razširite **Website**
2. Kliknite **Appearance**
3. Na seznamu **Style Settings** kliknite **Navigation**

Urejevalnik **Navigation Styling** ima dve kartici: **Header (solid)** in **Header over hero (transparent)**.

## Nastavitev trdne navigacije

Trdna navigacija se prikaže z barvnim ozadjem za navigacijsko vrstico. Te nastavitve najdete na kartici **Header (solid)**. Prilagodite lahko:

### Barva ozadja

1. Preklopite stikalo **Override** za **Background color**
2. Kliknite izbirnik barv
3. Izberite želeno barvo ozadja
4. Privzeta barva je bela (#FFFFFF)

### Barva povezav

1. Preklopite stikalo **Override** za **Link color**
2. Izberite barvo za besedilo navigacijskih povezav
3. To vpliva na povezave v privzetem stanju
4. Privzeta barva je temno siva (#555555)

### Barva povezave ob premiku miške

1. Preklopite stikalo **Override** za **Link hover color**
2. Izberite barvo, v katero se povezave spremenijo, ko uporabnik premakne kazalec nanje
3. To omogoča vizualno povratno informacijo za klikljive povezave
4. Privzeta barva je svetlo modra (#03A9F4)

### Barva aktivne povezave

1. Preklopite stikalo **Override** za **Active link color**
2. Izberite barvo za povezavo trenutno aktivne strani
3. To uporabnikom pomaga vedeti, na kateri strani se nahajajo
4. Privzeta barva je svetlo modra (#03A9F4)

## Nastavitev prosojne navigacije

Prosojna navigacija se prekriva z vsebino vaše strani brez ozadja. Te nastavitve najdete na kartici **Header over hero (transparent)**. Prilagodite lahko:

### Barva povezav

1. Preklopite stikalo **Override** za **Link color**
2. Izberite barvo, ki se dobro kontrastira z ozadjem vaše strani
3. Pogosto so bele ali svetle barve najboljše na temnih ozadjih
4. Privzeta barva je temno siva (#555555)

### Barva povezave ob premiku miške

1. Preklopite stikalo **Override** za **Link hover color**
2. Izberite barvo stanja ob premiku miške
3. Poskrbite, da bo vidna na ozadju vaše strani
4. Privzeta barva je svetlo modra (#03A9F4)

### Barva aktivne povezave

1. Preklopite stikalo **Override** za **Active link color**
2. Izberite barvo kazalnika aktivne strani
3. Naj izstopa, vendar naj se hkrati ujema z vašo zasnovo
4. Privzeta barva je svetlo modra (#03A9F4)

:::info
Prosojna navigacija nima nastavitve barve ozadja, ker se prekriva neposredno z vsebino strani.
:::

## Shranjevanje sprememb

1. Ko nastavite barve, kliknite **Save Navigation**
2. Vaše spremembe se takoj uveljavijo na vaši živi spletni strani
3. Obiščite svojo spletno stran, da si oglejte navigacijo v obeh načinih

## Ponastavitev na privzete vrednosti

Če se želite vrniti na privzete barve:

1. Izklopite stikala **Override** za katere koli barve po meri
2. Kliknite **Save Navigation**
3. Navigacija se vrne na privzeto barvno shemo

Ali kliknite **Cancel**, da zavržete vse spremembe brez shranjevanja.

## Priporočene prakse

### Kontrast barv

- **Berljivost** -- Poskrbite, da imajo povezave dovolj kontrasta z ozadjem
- **Skladnost z WCAG** -- Za dostopnost si prizadevajte za kontrastno razmerje vsaj 4,5:1
- **Preizkusite oba načina** -- Predogledajte svojo stran s trdno in prosojno navigacijo

### Doslednost blagovne znamke

- **Uporabite barve svoje blagovne znamke** -- Uskladite jih z logotipom in temo spletne strani
- **Omejite paleto** -- Držite se 2 do 3 barv za enoten videz
- **Upoštevajte svoje slike** -- Če uporabljate prosojno navigacijo, jo preizkusite na tipičnih ozadjih strani

### Stanja ob premiku miške in aktivna stanja

- **Jasna povratna informacija** -- Poskrbite, da bodo stanja ob premiku miške očitno drugačna od privzetih povezav
- **Razlikujte aktivne strani** -- Uporabite izrazito barvo, da uporabniki vedo, kje se nahajajo
- **Gladki prehodi** -- Sistem samodejno animira spremembe barv

## Odpravljanje težav

### Barve ne izgledajo prav

- **Počistite predpomnilnik** -- Predpomnjenje brskalnika lahko prikazuje stare barve
- **Preverite šestnajstiške kode** -- Prepričajte se, da ste vnesli veljavne šestnajstiške kode barv
- **Preizkusite na različnih ozadjih** -- Barve so lahko videti drugače, odvisno od strani

### Navigacija ni vidna

- **Prosojni način** -- Če uporabljate prosojno navigacijo nad svetlimi slikami, je lahko temno besedilo slabo vidno
- **Rešitev** -- Prilagodite barve povezav ali uporabite temnejša ozadja strani
- **Alternativa** -- Dodajte rahlo senco ali prekrivni sloj ozadja za območje navigacije

## Tehnične podrobnosti

Slogi navigacije so shranjeni kot JSON in uporabljeni prek CSS spremenljivk:

- Spremembe začnejo veljati takoj, brez ponovne gradnje spletne strani
- Barve se uveljavijo za vse elemente navigacije
- Prepisovanje je neobvezno; nenastavljene barve uporabljajo privzete vrednosti teme

## Sorodni članki

- [Videz](./appearance.md) -- Prilagodite splošen videz in občutek svoje spletne strani
- [Upravljanje strani](./managing-pages.md) -- Ustvarite in uredite strani svoje spletne strani
- [Urejevalnik strani](./page-editor.md) -- Oblikujte postavitve in vsebino strani
