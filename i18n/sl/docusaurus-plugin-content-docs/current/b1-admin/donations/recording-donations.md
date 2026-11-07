---
title: "Beleženje donacij"
---

# Beleženje donacij

<div class="article-intro">

Donacije v B1 Admin beležite prek sistema paketov. Ustvarite paket, ki predstavlja zbiranje (na primer nedeljski dar), nato pa vanj dodajate posamezne donacije. Tako so zapisi o darovanjih urejeni in jih je lahko enostavno uskladiti.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite svoje [sklade](funds.md), da boste lahko donacije dodelili pravim kategorijam
- Ustvarite [paket](batches.md), v katerega boste vnesli donacije
- Preverite, ali so darovalci v vašem [imeniku oseb](../people/adding-people.md), da jih boste lahko poiskali pri vnosu darov
- Za vnos darov v paket potrebujete pravico **Uredi donacije** ali **Vnesi donacije** skupaj s pravico **Preglej donacije** (glejte [Kdo lahko spreminja paket](batches.md#who-can-change-a-batch))

</div>

## Ustvarjanje paketa in dodajanje donacij

1. V **B1 Admin** odprite [Hitri meni](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Donacije** in kliknite **Paketi**.
2. Na vrhu strani kliknite **Dodaj paket**.
3. Vnesite ime paketa (npr. „Nedeljski dar – 5. jan.“) in izberite datum. Kliknite **Shrani**.
4. Vaš novi paket se prikaže na seznamu z ničelno številom donacij in zneskom 0,00 $.
5. Kliknite **ime paketa**, da ga odprete.

## Vnos posameznih donacij

1. Na strani s podrobnostmi paketa je ob seznamu donacij prikazan vnosni panel za donacije. Pod **Izberi osebo ali anonimno** vpišite ime darovalca v iskalno polje, da ga poiščete, ali kliknite **Anonimno**. (Če kliknete **Dodaj donacijo** na vrhu strani, se premaknete na ta panel.)
2. Po izbiri osebe vnosni obrazec prikaže polja **Datum**, **Način** (Ček, Gotovina, Kartica ali Stvarno darilo), **Sklad**, **Opombe**, **Znesek** in **Št. čeka** (oziroma **Zadnje 4 številke** pri darilih s kartico ali **Predmet** za opis stvarnega darila). Kliknite **Spremeni** poleg imena darovalca, če želite izbrati drugo osebo.
3. Izpolnite podrobnosti in kliknite **Dodaj donacijo** (ali pritisnite Enter).
4. Donacija se doda na seznam donacij, obrazec pa se ponastavi, da lahko vnesete naslednjo.

:::info
Če je paket [zaprt](batches.md#closing-and-reopening-a-batch), so vnosni panel in povezave **Uredi** skrite za vsakogar, ki nima pravice **Uredi donacije**, na vrhu paketa pa je obvestilo, da je zaprt. Za ponovno odprtje prosite nekoga s pravico **Uredi donacije**.
:::

:::tip
Več donacij lahko hitro vnesete zapored, ne da bi zapustili stran paketa. Obrazec se po vsakem vnosu ponastavi, tako da lahko učinkovito obdelate sveženj čekov ali kuvert.
:::

## Uvoz donacij iz datoteke CSV {#importing-donations-from-a-csv-file}

Če so vaše donacije že v preglednici – na primer izvoz iz drugega sistema za darovanja ali seznam, ki ga pripravi ekipa za štetje – jih lahko uvozite v paket, namesto da bi vsako vnašali ročno.

1. Odprite paket in na vrhu strani kliknite **Uvozi CSV**. (Gumb se prikaže, če lahko spreminjate paket in ima vaša cerkev vsaj en [sklad](funds.md).)
2. Kliknite **Izberi datoteko CSV** in izberite svojo datoteko. Datoteka mora imeti vrstico z glavo, stolpci pa so lahko v poljubnem vrstnem redu:
   - **Znesek** (obvezno; deluje tudi `Total`) – Valutni simboli in vejice se prezrejo, zato je `$1,250.00` v redu. Znesek mora biti večji od nič.
   - **Datum** – Uporabite obliko, kot je `2026-10-25` ali `10/25/2026`. Če je prazen, se uporabi datum paketa.
   - **Sklad** – Ime sklada, ujemanje brez upoštevanja velikih in malih črk. Če je prazno, se uporabi vaš prvi sklad.
   - **Način** – **Ček**, **Gotovina**, **Kartica** ali **Stvarno darilo**. Če je prazno, se uporabi **Ček**.
   - **Št. čeka** – Številka čeka (ali drug podatek o plačilu).
   - **Opombe**
   - **E-pošta**, **Ime** ali **Ime** in **Priimek** – Uporabljeno za ujemanje darovalca z osebo v vaši bazi. Ime, zapisano kot „Novak, Janez“, se prebere kot „Janez Novak“.
3. Preglejte predogled. Vsaka vrstica prikazuje številko vrstice, darovalca iz datoteke, **Ujemanje**, sklad in znesek:
   - Ime osebe pomeni, da je bil darovalec ujet. B1 najprej išče po e-pošti, nato po natančnem imenu, in le če ustreza točno ena oseba.
   - **Ni najdeno – anonimno** pomeni, da ni bilo najdenega enoličnega ujemanja. Dar se uvozi kot anonimen, opombam pa se doda „Uvoženo kot:“ z imenom darovalca, da ga boste lahko pozneje dodelili.
   - Rdeče sporočilo, kot so **Neveljaven znesek**, **Neznan sklad**, **Neznan način** ali **Neveljaven datum**, pomeni, da bo ta vrstica preskočena. Popravite datoteko in jo znova izberite, da vrstico vključite.
4. Kliknite **Uvozi** (gumb prikaže, koliko vrstic bo uvoženih). Donacije se dodajo v paket.

:::tip
Po uvozu uporabite **Uredi** pri vsaki anonimni donaciji, da izberete pravo osebo. Opomba „Uvoženo kot:“ pove, kdo je bil v datoteki naveden kot darovalec.
:::

## Beleženje darila iz osebnega zapisa

Če želite zabeležiti posamezen dar brez odpiranja paketa, odprite zapis darovalca v razdelku **Osebe** in kliknite **Zabeleži dar** (v povzetku darovanj ali v pogledu darovanj osebe).

1. Nastavite **Datum** in **Znesek**.
2. Izberite **Sklad** in **Način** (Ček, Gotovina, Kartica ali Stvarno darilo) ter po potrebi vnesite **Št. čeka**, **Zadnje 4 številke** ali **Predmet** (za stvarna darila).
3. Po želji dodajte **Opombe**, nato kliknite **Shrani**.

Dar se shrani v paket za ta datum. Če paket za ta datum še ne obstaja, se samodejno ustvari in dobi ime po datumu.

## Razdelitev donacije med več skladov

Včasih en darovalec v eni transakciji da več skladom. Za to:

1. Pod vnosnim panelom kliknite povezavo **urejevalnik celotne donacije** (ali kliknite **Uredi** v vrstici obstoječe donacije).
2. V celotnem urejevalniku dodajte zneske različnim skladom. Skupni znesek se bo samodejno izračunal iz zneskov posameznih skladov.
3. Kliknite **Shrani**, da posodobite donacijo.

:::info
Razdelitev donacij med sklade je pogosta, kadar darovalec napiše en ček za več namenov, na primer splošni sklad in misijone.
:::

## Urejanje ali odstranjevanje donacij

Za urejanje donacije kliknite gumb **Uredi** v njeni vrstici v paketu. Spremenite lahko datum, znesek, sklad, način plačila (Ček, Gotovina, Kartica ali Stvarno darilo) ali katero koli drugo podrobnost. Pri stvarnem darilu urejevalnik polje z podrobnostmi označi kot **Predmet**, da lahko opišete, kaj je bilo darovano. Ko končate, kliknite **Shrani**.

:::tip
Vrstica pod imenom paketa na vrhu strani se samodejno posodablja in prikazuje datum paketa, število darov in skupni znesek, ko dodajate ali urejate vnose. To lahko uporabite za uskladitev z vašim depozitnim listom.
:::

## Vračilo donacije

Če je bil darovalec napačno zaračunan ali zahteva vrnitev denarja, lahko dokončano donacijo povrnete neposredno iz njenega urejevalnika – ni treba iti na nadzorno ploščo vašega plačilnega prehoda.

1. Odprite donacijo in kliknite **Uredi**.
2. Na dnu obrazca kliknite gumb **Povrni** poleg gumba Izbriši.
3. Potrdite pogovorno okno: „Ali želite v celoti povrniti to donacijo prek plačilnega prehoda? Tega dejanja ni mogoče razveljaviti.“

Donacija se v celoti povrne prek prvotnega plačilnega prehoda in se v vaših seznamih donacij označi kot **Povrnjeno**.

:::warning
Vračila so mogoča le v celoti – iz B1 Admin ni mogoče povrniti delnega zneska. Vračila tudi ni mogoče razveljaviti, ko je potrjeno.
:::

:::info
Gumb **Povrni** se prikaže le pri donacijah, ki so bile plačane na spletu (imajo transakcijo prek plačilnega prehoda) in so še vedno v stanju **Dokončano**. Ročno vnesene donacije (gotovina, ček) nimajo transakcije prek plačilnega prehoda, ki bi jo lahko povrnili – te uredite ali izbrišite.
:::

## Tiskanje potrdila za posamezen dar

Ko nekdo odda ček, plača dogodek ali majico ali pa obiskujoča organizacija prinese donacijo, lahko natisnete potrdilo samo za ta dar, namesto za celoten paket ali letni izpisek.

1. Odprite paket, ki vsebuje donacijo.
2. Kliknite **Potrdilo** ob **Uredi** v vrstici donacije. Lahko kliknete tudi **Potrdilo** na dnu obrazca Uredi donacijo.
3. Kliknite **Natisni** ali **Zapri**, da se vrnete nazaj.

Potrdilo uporablja enako postavitev kot izpisek darovanj: vaša cerkev in darovalec (ali „Anonimno“), datum in način darila, vsak sklad in znesek, opomba, vaša Opomba o darovanju ter uradni blok potrdila, če ste nastavili **Obliko izpiska** (glejte [Izpiski o darovanjih](giving-statements.md)). Številka potrdila v tem bloku je ID donacije.

:::info
Besedilo „brez blaga ali storitev“ se natisne le, če so vsi skladi pri daru označeni kot davčno odbitni. Če je kateri koli del darila šel v sklad, ki ni davčno odbitni, na primer kotizacija za dogodek ali nakup, potrdilo to besedilo izpusti, da se bere kot plačilo in ne kot dobrodelni dar.
:::

:::tip
Spletna darila samodejno prejmejo e-poštno zahvalo, zato je potrdilo večinoma uporabno za darila, ki jih vnesete ročno.
:::

## Naslednji koraki

- Preglejte svoje vnose z [Poročili o donacijah](donation-reports.md) in preverite njihovo točnost
- Ob koncu leta ustvarite [Izpiske o darovanjah](giving-statements.md) za svoje darovalce
