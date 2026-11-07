---
title: "Izpiski o darovih"
---

# Izpiski o darovih

<div class="article-intro">

Ob koncu vsakega leta vaši donatorji potrebujejo povzetek svojih davčno odbitnih darov za svojo evidenco. B1 Admin omogoča, da te izpiske hkrati ustvarite za vse donatorje, s čimer prihranite ure ročnega dela.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Preverite, ali so vaši [skladi](funds.md) pravilno označeni kot **Davčno odbitni** -- na izpiskih se prikažejo le darovi za davčno odbitne sklade
- Poskrbite, da so vsi darovi [zabeleženi](recording-donations.md) in da so morebitne spletne transakcije [uvožene iz Stripe](stripe-import.md)

</div>

## Dostop do izpiskov o darovih

1. V **B1 Admin** odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu) in razširite **Donacije**.
2. Kliknite **Izpiski o darovih**. Odpre se stran **Skupinski izpiski o darovih**.

## Ustvarjanje izpiskov

1. V podoknu **Izberi leto** izberite **Leto** iz spustnega seznama. Izberete lahko tekoče leto ali katerega od pet prejšnjih let.
2. Stran naloži le darove, datirane v izbrano leto (od 1. januarja do 31. decembra), zato se odpre hitro, tudi če ima vaša cerkev dolgo zgodovino darov. Ko izberete drugo leto, se povzetek osveži z darovi tistega leta. Podokno **Povzetek** pod letom prikazuje statistiko za to leto, vključno z:
   - **Skupno število donatorjev** -- število ljudi, ki so darovali
   - **Skupno število donacij** -- število posameznih zapisov o darovih
   - **Skupni znesek** -- skupni denarni znesek vseh darov

## Prenos izpiskov

Podokno **Možnosti prenosa** vam ponuja dve možnosti za pošiljanje izpiskov donatorjem:

### Prenos kot datoteke CSV

V razdelku **Posamezne datoteke CSV** kliknite **Prenesi ZIP**, da prenesete datoteko ZIP, ki vsebuje posamezno datoteko CSV za vsakega donatorja. To je uporabno, če želite izpiske pošiljati posamezno po e-pošti ali jih uvoziti v drug sistem.

### Natisni vse izpiske

V razdelku **Tiskani izpiski** kliknite **Natisni vse** (gumb prikazuje število izpiskov), da v brskalniku odprete pregled za tisk izpiskov vseh donatorjev za izbrano leto. Nato uporabite funkcijo tiskanja brskalnika, da jih pošljete na tiskalnik. Vsak izpisek se začne na novi strani, tako da so pripravljeni za zlaganje in pošiljanje po pošti, izpiski pa so razvrščeni po priimku donatorja, nato po imenu.

Če ste naložili **Logotip za svetlo ozadje** pod [Spletna stran > Videz](../website/appearance.md), se ta natisne centriran na vrhu vsakega izpiska, nad naslovom izpiska. To velja tako za **Natisni vse** kot za izpisek posameznega donatorja, natisnjen iz njegovega zapisa.

:::tip
Izpiske ustvarite zgodaj v januarju, dokler so zapisi še sveži. Pred ustvarjanjem izpiskov dvakrat preverite, ali so vaši skladi pravilno označeni kot davčno odbitni -- vključeni so le darovi za davčno odbitne sklade.
:::

:::info
Izpiski o darovih vključujejo le darove, dodeljene skladom, pri katerih je omogočena nastavitev **Davčno odbitno**. Če sklad ni označen kot davčno odbiten, njegovi darovi se ne bodo prikazali na izpisku. To nastavitev lahko upravljate na strani [Skladi](funds.md).
:::

## Formati potrdil za Kanado, Avstralijo in Novo Zelandijo

Cerkve zunaj Združenih držav lahko preklopijo izpisek na uradno postavitev potrdila svoje države. Kliknite **Format izpiska** na vrhu strani Izpiski o darovih (ali pojdite v **Nastavitve** in odprite razdelek **Darovanje**) ter nastavite **Format izpiska** na **Kanada**, **Avstralija** ali **Nova Zelandija**, nato pa izpolnite polja, ki se prikažejo: vašo registracijsko številko (številko registracije CRA, ABN ali številko registracije dobrodelne organizacije na Novi Zelandiji), naslov vaše organizacije, ime osebe, pooblaščene za podpisovanje potrdil, in pri Kanadi mesto, kjer se potrdila izdajajo.

Izpiski nato vsebujejo besedilo, ki ga pričakuje vaš davčni organ (za Kanado "Uradno potrdilo za namene dohodnine" s sklicem na CRA), številko potrdila v obliki `LETO-DONORID`, upravičen znesek, ki upošteva le davčno odbitne sklade, ter ločeno vrstico za morebitne darove skladom, ki niso davčno odbitni. Donatorji vidijo enak blok potrdila, ko natisnejo svoj izpisek iz B1.church.

## Kaj člani vidijo v B1.church

Isti razdelek **Darovanje** v nastavitvah nadzoruje, kaj člani vidijo na svoji strani darovanja v B1.church:

- **Zgodovina darovanja članov** določa, katera leta lahko člani vidijo. **Vsa leta** je privzeto. **Do leta 2025** (ali katerega koli drugega leta) se ustavi pri tem letu, tako da člani ne morejo videti ali natisniti kasnejšega leta, dokler to ne dovolite. To uporabite, če želite zadržati tekoče leto, medtem ko dokončate popravke in vračila. **Skrito** popolnoma odstrani zgodovino darov, letne vsote in tiskanje izpiskov. Člani lahko še vedno dajejo.
- **Opomba k darovanju** je kratko sporočilo, prikazano na strani darovanja člana in v zgodovini darov ter natisnjeno na dnu vsakega izpiska o darovih, vključno z izpiski, ki jih natisnete tukaj. Uporabite jo za stvari, kot je vaša politika vračil.

Te nastavitve spreminjajo le to, kar člani vidijo. Kateri koli izpisek za katero koli leto še vedno lahko natisnete s te strani.

## Naslednji koraki

Če morate pred ustvarjanjem izpiskov preveriti podrobnosti o darovih, obiščite stran [Poročila o donacijah](donation-reports.md) ali preverite posamezne [serije](batches.md).
