---
title: "Upravljanje strani"
---

# Upravljanje strani

<div class="article-intro">

Pogled Strani spletnega mesta je vaše osrednje mesto za ustvarjanje, urejanje in urejanje vseh strani na spletnem mestu vaše cerkve. Vsebino strani in navigacijo spletnega mesta lahko upravljate z enega zaslona.

</div>

<div class="prereqs">
<h4>Pred začetkom</h4>

- Dokončajte [Začetno nastavitev](initial-setup), da nastavite svojo domeno in osnovne nastavitve spletnega mesta
- Pripravite vsebino in slike. Najprej naložite medijske datoteke z upraviteljem [Datoteke](files).

</div>

:::info
Če ima vaša cerkev več kot eno spletno mesto (na primer ločena mesta za posamezne podružnice), uporabite preklopnik spletnih mest na vrhu pogleda Strani spletnega mesta, da preskočite med njimi. Vsako mesto ima svoje strani, navigacijo in nastavitve [videza](appearance).
:::

## Razumevanje vrst strani

Tabela **Strani** navaja vsako stran na vašem spletnem mestu po **Poti** in **Naslovu**. Obstajata dve vrsti strani:

- **Generirane** -- Strani, ki jih je sistem samodejno ustvaril na podlagi podatkov vaše cerkve (na primer stran Skupin, stran Pridig ali posamezna stran za vsako pridigo v vaši knjižnici). Te strani imajo značko **Generirano** in se samodejno posodabljajo, ko se podatki spremenijo.
- **Po meri** -- Strani, ki ste jih ustvarili sami, z lastno vsebino in postavitvijo.

Katero koli samodejno ustvarjeno stran lahko pretvorite v stran po meri, če želite popoln nadzor nad njeno vsebino in oblikovanjem. Kliknite **Pretvori** poleg generirane strani in potrdite.

## Dodajanje in urejanje strani

1. Kliknite gumb **Dodaj stran** v zgornjem desnem kotu pogleda Strani spletnega mesta.
2. Izberite vrsto strani (prazno ali predlogo) in ji dajte ime.
3. Kliknite **Uredi vsebino** poleg katere koli strani, da odprete [urejevalnik strani](page-editor), kjer lahko dodajate odseke, besedilo, slike in druge elemente.
4. Kliknite **Nastavitve strani** poleg strani, da posodobite naslov strani, pot URL in druge metapodatke.
5. Kliknite pot strani v stolpcu **Pot**, da odprete živo stran v novem zavihku in si ogledate, kako bo videti obiskovalcem.

:::tip
Za domačo stran nastavite pot URL samo na `/`. Za vse druge strani uporabite opisno pot, na primer `/about` ali `/contact`.
:::

### Nastavitve strani

Odprite **Nastavitve strani** na kateri koli strani, da nastavite:

- **Naslov in pot URL** -- Ime strani in njen naslov na vašem spletnem mestu.
- **Vidnost** -- Izberite, kdo lahko vidi stran: vsi, samo člani, samo osebje ali člani določenih skupin. To je hiter način za zaščito zasebne strani (na primer strani z viri za osebje) brez ločenega gesla.
- **Meta opis** -- Kratek povzetek, prikazan v rezultatih iskalnikov in predogledih povezav na družbenih omrežjih.
- **Preusmeritve** -- Usmerite staro pot URL na to stran, tako da povezave in zaznamki do ukinjene strani še vedno delujejo.

## Upravljanje navigacije

Plošča **Glavna navigacija** na desni strani pogleda Strani spletnega mesta prikazuje vaše navigacijske povezave. Te povezave nadzorujejo meni, ki ga vidijo obiskovalci vašega spletnega mesta.

1. Kliknite **Dodaj**, da ustvarite novo navigacijsko povezavo. Lahko kaže na katero koli stran vašega spletnega mesta ali na zunanji URL.
2. Za spremembo vrstnega reda povezav jih povlecite in spustite v želeni vrstni red. Povezave lahko tudi gnezdite pod nadrejeni element in tako ustvarite spustne menije.
3. Kliknite katero koli povezavo, da odprete njene **Nastavitve povezave**, kjer lahko spremenite besedilo, URL ali nadrejeno stran.
4. Če želite povezavo odstraniti iz navigacije, odprite njene **Nastavitve povezave** in kliknite **Izbriši**.

:::info
Odstranitev navigacijske povezave ne izbriše same strani. Stran še vedno obstaja in je dostopna neposredno prek svojega URL-ja -- le v meniju se ne bo prikazala.
:::

## Stikala za celotno spletno mesto

Pod povezavami na plošči **Glavna navigacija** sta dve stikali, ki veljata za celotno spletno mesto vaše cerkve:

- **Prikaži prijavo** -- Prikaže gumb **Prijava** v navigacijski vrstici vašega spletnega mesta.
- **Onemogoči javno spletno mesto** -- Izklopi javno spletno mesto. Uporabite, če vaša cerkev uporablja B1 samo za portal za člane, darovanje in prijave, glavno spletno mesto pa ima drugje.

### Kaj stori onemogočitev javnega spletnega mesta

Ko je **Onemogoči javno spletno mesto** vklopljeno:

- Vsaka javna stran, vključno z domačo stranjo in vašimi stranmi po meri, obiskovalce, ki niso prijavljeni, preusmeri na zaslon za prijavo. Po prijavi se vrnejo na stran, ki so jo zahtevali.
- Prijavljeni člani vidijo celotno spletno mesto kot običajno, vključno z navigacijo in vgrajenimi **generiranimi** stranmi (kot sta Skupine in Pridige). Generirane strani se ne prikazujejo več v tabeli Strani.
- Iskalnikom je sporočeno, naj spletnega mesta ne indeksirajo. Zemljevid spletnega mesta je prazen, datoteka `robots.txt` pa blokira vse indeksiranje.

Te povezave še vedno delujejo, tako da do njih lahko dostopajo člani in gostje:

- Prijava in odjava
- Portal za člane (vse pod `/mobile`)
- Povezave za [prijavo na dogodek](../guides/event-registration.md) in prijava gostov

Med izklopljenim javnim spletnim mestom se pod stikalom prikaže opozorilo. Za ponovno vrnitev vaših strani ponovno izklopite stikalo. Med onemogočenostjo spletnega mesta se nič ne izbriše.

:::info
Ta nastavitev velja za celotno cerkev. Če imate več kot eno spletno mesto, izklopi vsa, ne samo tistega, ki je izbran v preklopniku spletnih mest.
:::

## Nasveti za organizacijo spletnega mesta

- Glavna navigacija naj ima pet ali šest elementov, da obiskovalci hitro najdejo, kar iščejo.
- Za povezane podstrani uporabite gnezdene povezave (na primer spustni meni »O nas« s »Naša ekipa«, »Verovanja« in »Zgodovina«).
- Preverite navigacijo na telefonu, da se prepričate, da dobro deluje na manjših zaslonih.
- Dajte straneh jasna, opisna imena, ki obiskovalcem pomagajo razumeti, kaj bodo našli.

:::tip
Na svoje strani lahko dodate [obrazce](../forms/creating-forms.md), da zberete prijave, prošnje za molitev ali druge informacije od obiskovalcev.
:::

## Začetek s predlogo spletnega mesta

Če svoje spletno mesto gradite od začetka, ga lahko postavite s **predlogo spletnega mesta** namesto ustvarjanja strani eno za drugo. Predloga spletnega mesta ustvari niz vnaprej pripravljenih strani -- domov, o nas, povežite se, darujte in druge -- z označevalno vsebino in že povezanimi navigacijskimi povezavami.

1. Na zaslonu Strani kliknite gumb **Začni s predlogo** (poleg gumba **Dodaj stran**).
2. Prebrskajte razpoložljive predloge in kliknite eno, da si ogledate strukturo njenih strani.
3. Ko najdete tisto, ki vam je všeč, kliknite **Uporabi predlogo**.
4. Strani, ki še ne obstajajo, se ustvarijo in dodajo v vašo navigacijo. Obstoječe strani ostanejo nespremenjene.

Po uporabi predloge odprite vsako stran v [urejevalniku strani](page-editor) in zamenjajte označevalno besedilo in slike z dejansko vsebino vaše cerkve.

:::info
Predloge spletnih mest ustvarijo strukturo strani in navigacijo. Ne prepišejo barvne sheme ali pisav vašega spletnega mesta -- te upravlja [Videz](appearance).
:::

## Povečava slik

Ko obiskovalci kliknejo sliko na vašem spletnem mestu, se ta odpre v celozaslonskem prekrivnem oknu. Tako si ljudje lahko ogledajo fotografije v večji velikosti, ne da bi zapustili stran. Ni potrebna nobena konfiguracija -- povečava je samodejno omogočena za slike v vsebini vaših strani.

## Naslednji koraki

- [Začetna nastavitev](initial-setup) -- Navodila za nastavitev ob prvi uporabi
- [Uporaba urejevalnika strani](page-editor) -- Naučite se ustvarjati in oblikovati vsebino strani
- [Videz](appearance) -- Prilagodite vizualno temo vašega spletnega mesta
- [Datoteke](files) -- Naložite in upravljajte medijske datoteke za svoje strani
