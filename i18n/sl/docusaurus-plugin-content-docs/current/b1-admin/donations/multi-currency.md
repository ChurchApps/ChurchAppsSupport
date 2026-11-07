---
title: "Podpora za več valut"
description: "Beležite in poročajte o darovih v različnih valutah v B1 Admin, vključno z ročnim vnosom, spletnim darovanjem prek Stripe in pretvorbo skupnih vsot."
---

# Podpora za več valut

<div class="article-intro">

Funkcija več valut v B1 omogoča vaši cerkvi, da sprejema in spremlja darove v različnih valutah. To je še posebej uporabno za cerkve z mednarodnimi člani, misijonarji ali zbori v različnih državah.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje za upravljanje darov. Podrobnosti najdete v razdelku [Vloge in dovoljenja](../people/roles-permissions.md).
- Nastavite [spletno darovanje](./online-giving-setup.md) s Stripe, ki podpira transakcije v več valutah.
- Razumite računovodske potrebe vaše cerkve pri obravnavi več valut.

</div>

## Omogočanje več valut

Podpora za več valut je v B1 zdaj privzeto omogočena. Ko je omogočena:

- Člani lahko pri spletnem darovanju darujejo v svoji lokalni valuti
- Darove lahko ročno vnesete v katerikoli valuti
- Poročila o darovih prikazujejo zneske v njihovi izvirni valuti
- Stripe samodejno upravlja pretvorbo valut za spletno darovanje

## Podprte valute

Sistem podpira vse glavne svetovne valute, med njimi:

- **USD** -- ameriški dolar
- **EUR** -- evro
- **GBP** -- britanski funt
- **CAD** -- kanadski dolar
- **AUD** -- avstralski dolar
- **MXN** -- mehiški peso
- **BRL** -- brazilski real
- **INR** -- indijska rupija
- **CNY** -- kitajski juan
- **JPY** -- japonski jen
- In še mnoge druge...

Razpoložljive valute za spletno darovanje so odvisne od valut, ki jih podpira vaš račun Stripe.

## Vnos darov v različnih valutah

### Spletni darovi

Ko član daruje prek spleta s Stripe:

1. Na blagajni izbere svojo željeno valuto
2. Stripe obdela plačilo v tej valuti
3. Dar se v B1 zabeleži z zneskom v izvirni valuti
4. Stripe samodejno opravi morebitno potrebno pretvorbo valut v privzeto valuto vašega računa

### Ročni vnos

Če želite zabeležiti gotovinski ali čekovni dar v drugi valuti:

1. V B1 Admin se pomaknite do **Darovi > Skupine** in odprite skupino
2. Na vrhu strani skupine kliknite **Dodaj dar**
3. Iz spustnega seznama valut izberite valuto
4. Vnesite znesek v tej valuti
5. Dokončajte preostale podrobnosti daru
6. Kliknite **Shrani**

## Ogled darov v več valutah

### Poročila o darovih

Poročila o darovih prikazujejo zneske v njihovi izvirni valuti:

- Posamezni zapisi darov prikazujejo kodo valute (npr. "$100.00 USD")
- Skupni zneski se izračunajo ločeno za vsako valuto
- Filtrirate lahko po določenih valutah

### Pretvorjeni seštevki

Kjerkoli B1 prikaže en skupni seštevek -- kartice s ključnimi kazalniki darovanja, skupni seštevek skupine darov in skupni seštevek sklada -- se darovi, zabeleženi v valuti, ki ni privzeta valuta vaše cerkve, pretvorijo v valuto vaše cerkve po trenutnih menjalnih tečajih. Tako je seštevek ena smiselna številka in ne seštevanje nepodobnih valut. Pod seštevkom se prikaže opomba **Pretvorjeno po trenutnih menjalnih tečajih**, kadarkoli je bila uporabljena pretvorba. Posamezne postavke darov se še vedno prikazujejo v izvirni valuti.

### Izjave o darovanju

Pri ustvarjanju izjav o darovanju:

- Vsak dar se prikaže v svoji izvirni valuti
- Seštevki so razdeljeni po valutah
- Člani natančno vidijo, koliko so dali v vsaki valuti

## Integracija s Stripe

Za spletno darovanje Stripe obdeluje transakcije v več valutah:

- **Samodejna pretvorba** -- Stripe pretvori valute v privzeto valuto vašega računa
- **Menjalni tečaji** -- Stripe uporablja trenutne tržne menjalne tečaje
- **Provizije** -- Pretvorba valut lahko povzroči dodatne provizije Stripe
- **Valuta izplačila** -- Sredstva se nakazujejo v privzeti valuti vašega računa

:::info
V nadzorni plošči Stripe preverite trenutne pretvorbene tečaje in morebitne provizije, povezane s transakcijami v več valutah.
:::

## Računovodski vidiki

Pri delu z več valutami:

- **Vodenje evidence** -- Spremljajte izvirne zneske darov in valute za točno poročanje
- **Menjalni tečaji** -- Upoštevajte, da se tečaji Stripe lahko razlikujejo od tečajev vaše banke
- **Davčne potrdila** -- Glede poročanja o darovih v različnih valutah za davčne namene se posvetujte z računovodjo
- **Dodelitev sredstev** -- Darove lahko dodelite določenim skladom ne glede na valuto

## Priporočene prakse

- **Privzeta valuta** -- Kot privzeto za večino transakcij nastavite glavno valuto vaše cerkve
- **Jasna komunikacija** -- Darovalcem povejte, v kateri valuti darujejo med postopkom plačila
- **Dosledno poročanje** -- Skupni seštevki se vedno samodejno pretvorijo v valuto vaše cerkve; kadar potrebujete prikaz izvirnih zneskov, uporabite filter valute za posamezne darove
- **Redno usklajevanje** -- Usklajujte izplačila Stripe z evidenco darov ob upoštevanju pretvorb valut

## Omejitve

- Pretvorbo valut za obdelavo plačil izvaja Stripe, in sicer le za spletno darovanje; ročni darovi se zabeležijo tako, kot so vneseni, brez samodejne pretvorbe
- Zgodovinska poročila in posamezne postavke darov vedno prikazujejo izvirno valuto, v kateri je bil dar zabeležen
- Skupni seštevki (kartice s ključnimi kazalniki, seštevki skupin in skladov) se pretvorijo v valuto vaše cerkve po trenutnih menjalnih tečajih -- ti tečaji se lahko rahlo razlikujejo od tečajev vaše banke ali Stripe v trenutku, ko sredstva prispejo

## Sorodni članki

- [Nastavitev spletnega darovanja](./online-giving-setup.md) -- Nastavitev Stripe za sprejemanje darov
- [Beleženje darov](./recording-donations.md) -- Ročni vnos zapisov darov
- [Poročila o darovih](./donation-reports.md) -- Ustvarjanje in ogled povzetkov darov
- [Izjave o darovanju](./giving-statements.md) -- Ustvarjanje letnih izjav o darovanju
