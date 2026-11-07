---
title: "Dokončanje prijave"
description: "Dokončajte prijavo družine na kiosku v B1 Checkin, vključno z omejitvami sob, tiskanjem nalepk, varnostnimi kodami za prevzem in naslednjim korakom aplikacije."
---

# Dokončanje prijave

<div class="article-intro">

Ko pregledate svoje gospodinjstvo in po potrebi dodelite skupine, ste pripravljeni na dokončanje prijave. To je zadnji korak v delovnem toku na kiosku: aplikacija pošlje podatke o udeležbi, natisne nalepke in se ponastavi za naslednjo družino.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- [Preglejte svoje gospodinjstvo](./household-review.md) na zaslonu za pregled gospodinjstva
- [Dodelite skupine](./group-assignment.md) vsem družinskim članom, ki se morajo prijaviti v določen razred ali program
- Po želji [dodajte goste](./adding-guests.md), ki so na obisku pri vaši družini

</div>

## Kako se prijaviti

1. Na **zaslonu za pregled gospodinjstva** se dotaknite gumba **Prijava** na dnu zaslona.
2. Aplikacija pošlje podatke o udeležbi na strežnik in prikaže **zaslon za uspeh** z zeleno kljukico in pozdravnim sporočilom.

To je vse, kar je potrebno. Udeležba vaše družine je zabeležena.

## Polne sobe in razmerja prostovoljcev

Če je vaša cerkev na svojih sobah nastavila [varnostne omejitve](../../b1-admin/attendance/checkin-safety.md), jih strežnik preveri, preden shrani podatke:

- Če je izbrana soba **polna ali zaprta**, prijava ni uspešna in aplikacija navede sobo, da lahko izberete drugo.
- Če ima termin bogoslužja [urnik prijav](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) in njegovo okno za prijavo trenutno ni odprto, je prijava v sobe tega termina prav tako zavrnjena. Zaslon **Prijava še ni mogoča** prikaže sobo z razlogom »prijava trenutno ni odprta«; dotaknite se **Spremeni sobe**, da izberete drugi termin ali skupino. (Termini, ki so že zaprti, so na [zaslonu za gospodinjstvo](./household-review.md) označeni kot **Zaprto** in jih ni mogoče izbrati, zato boste to običajno videli le, če se okno zapre med samo prijavo.)
- Gospodinjstvo, ki se je prijavilo na prejšnji termin bogoslužja, se lahko kasneje vrne in doda odprt termin, tudi potem ko je prejšnje okno že zaprto. Njihove obstoječe prijave ostanejo shranjene in ne povzročijo, da bi bila nova prijava zavrnjena.
- Če v otroški sobi za svoje razmerje zmanjkuje **prostovoljcev**, aplikacija bodisi prikaže opozorilo, ki ga lahko potrdi član osebja, da nadaljuje, bodisi prijavo popolnoma blokira – odvisno od tega, kako je vaša cerkev nastavila uveljavljanje razmerij.

## Tiskanje nalepk

Če je nastavljen omrežni tiskalnik, aplikacija po prijavi samodejno natisne nalepke:

- **Nalepke z imenom** se natisnejo za vsako osebo, ki je dodeljena skupini, kjer je omogočena nastavitev **Natisni značko z imenom**. Nalepke z imenom vsebujejo ime osebe, dodelitev skupine ter podatke o alergijah in opombe, če so shranjeni.
- **Listki za prevzem s strani staršev** se natisnejo, kadar je katera koli prijavljena oseba v skupini, kjer je omogočena nastavitev **Prevzem s strani starša**. Osebe, prijavljene kot **Prostovoljec**, so izpuščene, zato pri prevzemu ne dobi listka za prevzem vzgojitelj, ki dela v sobi za prevzem s strani staršev. Listek za prevzem navaja otroke, njihove dodelitve skupin in edinstveno **4-znakovno varnostno kodo**.

:::info
Ista varnostna koda je navedena tako na otrokovi nalepki z imenom kot na staršev listku za prevzem. Ob prevzemu prostovoljci primerjajo kode, da preverijo, ali otroka prevzema pravi odrasli.
:::

Varnostna koda se ob vsaki prijavi ustvari na novo in vsebuje samo soglasnike in številke (samoglasniki so izključeni, da ne tvorijo neprimernih besed).

:::warning
Če se nalepke ne natisnejo, odprite nastavitve skrbnika tako, da se sedemkrat dotaknete **logotipa cerkve**, nato se dotaknite **Spremeni tiskalnik** in preverite povezavo s tiskalnikom. Korake za odpravljanje težav najdete v [namestitvi tiskalnika](../getting-started/printer-setup.md).
:::

## Kaj se zgodi po prijavi

- Če je tiskalnik nastavljen, aplikacija natisne vse nalepke in se nato samodejno vrne na **zaslon za iskanje**, pripravljena za naslednjo družino.
- Če tiskalnik ni nastavljen, se aplikacija prav tako samodejno vrne na **zaslon za iskanje**.

Ne glede na to ostane zaslon za uspeh prikazan vsaj 6 sekund od trenutka, ko se pojavi (8 sekund, kadar praznuje dosežek udeležbe nekoga), tako da družine vidijo, da je prijava uspela. Če tiskanje traja dlje, se aplikacija vrne približno pol sekunde po koncu tiskanja.

Za vrnitev na zaslon za iskanje vam ni treba ničesar pritisniti – aplikacija prehod opravi samodejno. Ko je zaslon prikazan nekaj trenutkov, se ga lahko dotaknete, da se takoj vrnete; dotik v prvi sekundi in pol je prezrt, tako da hitro dvojno dotikanje gumba **Prijava** ne preskoči zaslona.

:::tip
Aplikacija se po vsaki prijavi popolnoma ponastavi, zato ni nevarnosti, da bi ena družina videla podatke druge družine.
:::

## Kaj se zabeleži

Ko se dotaknete **Prijava**, aplikacija za vsakega člana gospodinjstva, ki ima dodeljeno skupino, na strežnik pošlje naslednje:

- **osebo**, ki se prijavlja
- **storitev**, ki jo obiskuje
- **termin bogoslužja** in **skupino**, v katero je dodeljena

Ti podatki se prikažejo v B1 Admin v razdelku Udeležba, kjer skrbniki cerkve lahko pregledujejo in upravljajo evidence udeležbe. Podrobnosti najdete v [vodniku za skrbništvo prijav](../../b1-admin/attendance/check-in.md).
