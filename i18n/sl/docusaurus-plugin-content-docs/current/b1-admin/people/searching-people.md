---
title: "Iskanje oseb"
---

# Iskanje oseb

<div class="article-intro">

Stran **Osebe** prikazuje vaš cerkveni imenik kot iskalni seznam gospodinjstev ali kot razvrstljivo tabelo posameznikov. Hitro lahko najdete vsakega člana občine, prilagodite, katere podatke želite prikazati, in izvozite rezultate. Učinkovito iskanje je ključno za vsakodnevne naloge cerkvene uprave, kot so spremljanje obiskovalcev, priprava seznamov stikov in vodenje evidenc članov.

</div>

## Video o usposabljanju

<YouTube id="7Y-tN9RmnDQ" title="Iskanje oseb in ustvarjanje seznamov v B1" next="Polja po meri, množično urejanje in izvoz v B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete aktiven račun B1 Admin z dovoljenjem za ogled oseb. Če niste prepričani glede svoje ravni dostopa, si oglejte [Vloge in dovoljenja](roles-permissions.md).
- V vašem cerkvenem imeniku bi morale biti osebe. Če še niste dodali nobene osebe, si oglejte [Dodajanje oseb](adding-people.md) ali [Uvoz podatkov](importing-data.md).

</div>

## Gospodinjstva in tabelarični pogledi

Stran Osebe prikazuje vaš imenik po **gospodinjstvih**, razvrščenih po abecedi. Vsaka vrstica prikazuje fotografije gospodinjstva, njegovo ime (na primer »Družina Novak«) in imena vseh njegovih članov. Kliknite gospodinjstvo, če želite odpreti profil nosilca gospodinjstva, ali kliknite ime katerega koli člana, če želite odpreti profil te osebe. Število nad seznamom prikazuje, koliko gospodinjstev in oseb je prikazanih.

Za preklop med **Gospodinjstva** in **Tabela** uporabite stikalo **Prikaz kot** nad seznamom. Pogled **Tabela** prikazuje eno osebo v vsaki vrstici in je mesto, kjer lahko razvrščate podatke in izbirate stolpce (glejte spodaj). B1 si vašo izbiro zapomni na tej napravi.

V pogledu **Tabela** se status članstva vsake osebe prikaže pod njenim imenom, vsak od sedmih statusov pa ima svojo barvo, enako kot na profilu osebe. Osebe, katerih vloga v gospodinjstvu je nastavljena na **Otrok**, poleg statusa prikazujejo oznako **Otrok**. Da nekoga označite kot otroka, nastavite njegovo vlogo v [plošči gospodinjstva](./adding-people.md#managing-households) na njegovem profilu.

Stran privzeto naloži prvi del vašega imenika. Če imate več oseb, kliknite **Pokaži vse člane** pod seznamom, da naložite vse.

## Hitro iskanje

Polje **Poišči gospodinjstvo ali osebo** na vrhu strani Osebe vam omogoča iskanje članov v realnem času:

1. Kliknite **polje za iskanje** na vrhu strani Osebe.
2. Začnite tipkati ime.
3. Rezultati se bodo samodejno filtrirali, medtem ko tipkate (pride do kratkega zamika približno pol sekunde, da se iskanje ne sproži ob vsakem pritisku tipke).
4. Seznam pod poljem se posodobi in prikaže samo ujemajoče se rezultate.

Kliknite **Počisti** (pod poljem za iskanje), da ponastavite iskanje in ponovno prikažete celoten imenik.

:::tip
Ni vam treba pritisniti tipke Enter. Iskanje se izvede samodejno, ko nehate tipkati.
:::

## Razvrščanje rezultatov

V pogledu **Tabela** so osebe razvrščene po priimku, nato po imenu. Imenik lahko razvrstite drugače tako, da kliknete katero koli glavo stolpca:

1. Kliknite **glavo stolpca** (na primer **Ime** ali **E-pošta**), da razvrstite po tem stolpcu.
2. Ponovno kliknite isto glavo, da obrnete vrstni red razvrščanja.

Tako je enostavno najti osebe po abecedi, starosti ali po katerem koli drugem vidnem stolpcu.

## Prilagajanje stolpcev

Ni nujno, da so vsi podatki vidni hkrati. Izberete lahko, kateri stolpci se prikažejo v tabeli:

1. Kliknite ikono **Izberi stolpce** v glavi strani Osebe. (Stolpci veljajo za pogled **Tabela**.)
2. Označite ali odznačite stolpce, da jih prikažete ali skrijete. Na voljo so naslednji stolpci:
   - **Fotografija**
   - **Ime**
   - **E-pošta**
   - **Telefon**
   - **Naslov**
   - **Datum rojstva**
   - **Starost**
   - **Spol**
   - **Status članstva**
   - **Kampus**
   - **Datum dodajanja** -- kdaj je bil ustvarjen zapis osebe
3. Tabela se takoj posodobi glede na vaše izbire. Kliknite **Končano**, da zaprete pogovorno okno **Izberi stolpce**.

### Prikaz polj po meri kot stolpcev

Izbirnik stolpcev ima dva zavihka: **Standardni** vsebuje vgrajene stolpce, navedene zgoraj, **Po meri** pa vsebuje [polja po meri](../settings/custom-fields.md) vaše cerkve ter vprašanja iz morebitnih obrazcev za osebe. Označite polje po meri na zavihku **Po meri**, da ga dodate kot stolpec, in vrednost tega polja za vsako osebo se prikaže v tabeli. Vrednosti so prikazane enako kot na profilu osebe -- polja Da/Ne prikazujejo *Da* ali *Ne*, polja z izbiro med možnostmi prikazujejo oznako možnosti, datumi pa so prikazani kot kratki datumi. Osebe brez vrednosti za polje imajo prazno celico.

## Izvoz rezultatov iskanja

Trenutne rezultate iskanja lahko kadar koli prenesete kot datoteko CSV:

1. Uporabite morebitna iskanja ali filtre, ki jih želite.
2. Kliknite gumb **Izvozi** v glavi strani Osebe.
3. Datoteka CSV se bo prenesla v vaš računalnik, pripravljena za odpiranje v Excelu, Google Preglednicah ali katerem koli drugem programu za preglednice.

Za več podrobnosti o izvozu si oglejte [Izvoz podatkov](./exporting-data.md).

:::tip
Za naprednejša poizvedovanja -- na primer iskanje vseh, ki niso bili na bogoslužju v zadnjih treh mesecih -- poskusite funkcijo [Iskanje z umetno inteligenco](./ai-search.md), ki vam omogoča iskanje z vprašanji v običajnem jeziku.
:::

## Napredno iskanje

Napredno iskanje vam omogoča ustvarjanje natančnih filtrov s kombiniranjem pogojev. Odprite ga tako, da na strani Osebe kliknete **Napredno** pod poljem za iskanje, nato razširite kategorijo in označite polja, po katerih želite filtrirati (kliknete lahko na ime polja ali na njegovo potrditveno polje), pri čemer za vsako izberete operator in vrednost. Kategorije vključujejo **Imena**, **Demografija**, **Stik**, **Članstvo**, **Dejavnost** (darovi in obisk) ter **Polja po meri**.

Za iskanje novih oseb odprite **Članstvo** in označite **Datum dodajanja**. Privzeto je nastavljeno na **v zadnjih N dneh** z vrednostjo 30, zato lahko z enim klikom najdete vse, ki so bili dodani v zadnjem mesecu; število dni lahko spremenite ali preklopite na *enako / po / pred*, da izberete datum. Za **Datum rojstva** in **Obletnico** je prav tako na voljo možnost **v zadnjih N dneh**. Datum dodajanja se beleži samo za osebe, ustvarjene od konca oktobra 2026; pri osebah, dodanih prej, datum ni na voljo, zato jih ta filter ne najde.

Kategorija **Polja po meri** navaja [polja po meri](../settings/custom-fields.md) vaše cerkve -- polja, ki jih določite v nastavitvah za spremljanje lastnih podatkov (na primer datum poteka preverjanja preteklosti). Ponujeni operatorji ustrezajo vrsti vsakega polja: besedilna polja podpirajo *vsebuje / enako / se začne z / se konča z*, številska polja podpirajo primerjalne operatorje, datumska polja podpirajo *enako / po / pred*, polja Da/Ne in z izbiro med možnostmi pa vam omogočajo izbiro vrednosti. Vsako polje, po katerem lahko tukaj filtrirate, lahko shranite kot živ [seznam](./lists.md).

## Shranjevanje iskanj kot seznamov

Po izvedbi iskanja se v glavi strani Osebe prikaže gumb **Shrani kot seznam**. Kliknite ga, da shranite trenutno poizvedbo pod imenom in neobvezno kategorijo, tako da jo boste lahko v prihodnjih sejah takoj ponovno naložili. Za podrobnosti si oglejte [Shranjeni seznami](./lists.md).
