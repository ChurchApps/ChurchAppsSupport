---
title: "Dokončanje prijave"
description: "Dokončajte kioskovo prijavo družine v aplikaciji B1 Checkin: omejitve sob, tiskanje nalepk, varnostne kode za prevzem otrok in kaj aplikacija naredi naprej."
---

# Dokončanje prijave

<div class="article-intro">

Ko pregledate svoje gospodinjstvo in po potrebi dodelite skupine, ste pripravljeni na dokončanje prijave. To je zadnji korak v delovnem toku kioska – aplikacija pošlje podatke o obisku, natisne nalepke in se ponastavi za naslednjo družino.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- [Pregledajte gospodinjstvo](./household-review.md) na zaslonu za pregled gospodinjstva
- [Dodelite skupine](./group-assignment.md) tistim članom družine, ki se morajo prijaviti v določen razred ali program
- Po želji [dodajte goste](./adding-guests.md), ki obiskujejo z vašo družino

</div>

## Kako se prijaviti

1. Na **zaslonu za pregled gospodinjstva** tapnite gumb **Prijava** na dnu zaslona.
2. Aplikacija pošlje podatke o obisku na strežnik in prikaže **zaslon uspeha** z zeleno kljukico in pozdravnim sporočilom.

To je vse, kar je potrebno. Obisk vaše družine je bil zabeležen.

Če se je kdo od izbranih oseb že prijavil na to bogoslužje danes, se najprej prikaže okno **Že prijavljen**, ki jih navede po imenih. Tapnite **Prijavi znova**, da shranite njihove nove izbire skupin, ali **Prekliči**, da se vrnete na zaslon gospodinjstva.

## Polne sobe in razmerja prostovoljcev

Če je vaša cerkev na sobah nastavila [varnostne omejitve](../../b1-admin/attendance/checkin-safety.md), strežnik pred shranjevanjem preveri:

- Če je izbrana soba **polna ali zaprta**, prijava ni uspela, aplikacija pa imenuje sobo, da lahko izberete drugo.
- Če ima termin bogoslužja [urnik prijav](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) in njegovo okno za prijavo trenutno ni odprto, je prijava v sobe tega termina prav tako zavrnjena. Zaslon **Prijava še ni mogoča** navede sobo z razlogom »prijava trenutno ni odprta«; tapnite **Spremeni sobe**, da izberete drugi termin ali skupino. (Termini, ki so že zaprti, so na [zaslonu gospodinjstva](./household-review.md) prikazani kot **Zaprto** in jih ni mogoče izbrati, zato to običajno vidite le, če se okno zapre med prijavo.)
- Gospodinjstvo, ki se je prijavilo na prejšnji termin bogoslužja, se lahko kasneje vrne in doda odprt termin, tudi potem, ko je prejšnje okno že zaprto. Njihove obstoječe prijave ostanejo shranjene in ne povzročijo zavrnitve nove prijave.
- Če je v otroški sobi premalo prostovoljcev glede na predpisano razmerje, aplikacija bodisi prikaže opozorilo, ki ga lahko potrdi član osebja, da nadaljuje, bodisi prijavo popolnoma blokira – odvisno od tega, kako je vaša cerkev nastavila uveljavljanje razmerij.

## Tiskanje nalepk

Če je nastavljen omrežni tiskalnik, aplikacija po prijavi samodejno natisne nalepke:

- **Imenske nalepke** se natisnejo za vsako osebo, ki je dodeljena skupini, kjer je omogočena nastavitev **Natisni imensko oznako**. Imenske nalepke vsebujejo ime osebe, dodelitev skupine ter podatke o alergijah in opombe, če so na voljo.
- **Listki za prevzem staršev** se natisnejo, kadar je katera od prijavljenih oseb v skupini, kjer je omogočena nastavitev **Prevzem staršev**. Osebe, prijavljene kot **Prostovoljec**, se preskočijo, zato varuh, ki služi v sobi za prevzem staršev, ne dobi listka za prevzem. Listek za prevzem navaja otroke, njihove skupine ter edinstveno **4-znakovno varnostno kodo**.

:::info
Enaka varnostna koda je prikazana tako na imenski nalepki otroka kot na listku za prevzem starša. Ob prevzemu prostovoljci ujemajo kode, da preverijo, ali prevzame vsakega otroka pravi odrasel.
:::

Varnostna koda je ustvarjena znova ob vsaki prijavi in uporablja samo soglasnike in števke (samoglasniki so izključeni, da ne nastanejo neprimerne besede).

:::warning
Če se nalepke ne natisnejo, odprite nastavitve skrbnika tako, da sedemkrat tapnete **logotip cerkve**, nato tapnite **Spremeni tiskalnik**, da preverite povezavo s tiskalnikom. Za korake za odpravljanje težav glejte [Nastavitev tiskalnika](../getting-started/printer-setup.md).
:::

## Kaj se zgodi po prijavi

- Če je tiskalnik nastavljen, aplikacija natisne vse nalepke in nato samodejno preklopi na **zaslon iskanja**, pripravljen za naslednjo družino.
- Če tiskalnik ni nastavljen, se aplikacija prav tako samodejno vrne na **zaslon iskanja**.

Ne glede na to ostane zaslon uspeha prikazan vsaj 6 sekund od trenutka, ko se pojavi (8 sekund, kadar praznuje dosežek obiskov nekoga), da lahko družine vidijo, da je prijava uspela. Če tiskanje traja dlje, se aplikacija vrne približno eno in pol sekundo po koncu tiskanja.

Za vrnitev na zaslon iskanja vam ni treba tapniti ničesar – aplikacija prehod opravi samodejno. Ko je zaslon prikazan nekaj trenutkov, ga lahko tapnete, da se takoj vrnete; tap v prvi sekundi in pol je prezrt, zato hiter dvojni tap na **Prijava** ne preskoči zaslona.

:::tip
Aplikacija se po vsaki prijavi popolnoma ponastavi, zato ni nevarnosti, da bi ena družina videla podatke druge družine.
:::

## Kaj se zabeleži

Ko tapnete **Prijava**, aplikacija za vsakega člana gospodinjstva, ki ima dodeljeno skupino, strežniku pošlje naslednje:

- **osebo**, ki se prijavlja
- **bogoslužje**, ki ga obiskuje
- **termin bogoslužja** in **skupino**, ki sta ji dodeljena

Ti podatki so prikazani v aplikaciji B1 Admin v razdelku Obisk, kjer lahko cerkveni skrbniki pregledujejo in upravljajo zapise o obisku. Podrobnosti najdete v [vodniku za skrbništvo prijav](../../b1-admin/attendance/check-in.md).
