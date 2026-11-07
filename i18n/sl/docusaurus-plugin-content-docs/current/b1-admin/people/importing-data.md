---
title: "Uvoz podatkov"
description: "Prenesite obstoječe osebe, skupine, prisotnost in evidence darov v B1 Admin z orodjem B1 Transfer ali kadar koli izvozite varnostno kopijo podatkov."
---

# Uvoz podatkov

<div class="article-intro">

Orodje B1 Transfer omogoča preprost prenos obstoječih podatkov v B1, ne glede na to, ali začenjate na novo s preglednico, selite iz druge platforme za upravljanje cerkve ali uvažate zapise o darovih. Z njim lahko podatke kadar koli tudi izvozite ali varnostno kopirate.

</div>

## Videoposnetek za usposabljanje

<YouTube id="G-VnhzACYIU" title="Uvoz baze oseb v B1" next="Iskanje oseb in ustvarjanje seznamov v B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete aktiven račun B1 Admin z dostopom do **Nastavitev**.
- Pred začetkom imejte podatke izvožene in pripravljene iz vašega prejšnjega sistema.
- To orodje je namenjeno začetni selitvi podatkov. Če že nekaj časa uporabljate B1, lahko ponovni uvoz ustvari podvojene zapise.

</div>

## Dostop do orodja za prenos

1. Prijavite se v **B1 Admin**.
2. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Nastavitve** in kliknite **Nastavitve**.
3. Kliknite povezavo **Uvoz/Izvoz** pod imenom vaše cerkve na vrhu levega menija nastavitev.
4. Orodje **B1 Transfer** se bo odprlo v novem zavihku na naslovu [transfer.b1.church](https://transfer.b1.church).

Orodje za prenos vas vodi skozi štiri korake: Vir, Predogled, Cilj in Zagon.

---

## 1. korak - Izberite vir

Izberite, od kod prihajajo vaši podatki. Na voljo je sedem možnosti:

- **B1 Database** — Neposredno prebere podatke iz vaše obstoječe cerkve v B1. Uporabno za varnostno kopijo ali pretvorbo podatkov v drug format. Za to možnost morate biti prijavljeni.
- **B1 Import Zip** — Datoteka zip v formatu B1. Uporablja se predvsem za obnovitev prejšnjega izvoza iz B1. Če naložite datoteko B1 Export Zip nazaj v **B1 Database**, se obnovi vse, kar izvoz vsebuje (glejte [Izvoz podatkov](./exporting-data.md#full-data-export-from-settings)). Če datoteke ni mogoče prebrati, orodje prikaže napako namesto da bi začelo znova.
- **Breeze Import Zip** — Datoteka zip z izvoženimi datotekami iz Breeze ChMS.
- **Planning Center Zip** — Datoteka zip ali CSV, izvožena iz Planning Center.
- **Custom CSV / Excel** — Katerakoli datoteka CSV ali Excel s podatki o osebah. Po nalaganju boste stolpce preslikali v polja B1, preden se uvoz nadaljuje.
- **Tithe.ly CSV** — Datoteka za izvoz oseb ali darov iz Tithe.ly (sprejeta sta formata CSV in Excel).
- **CCB / Pushpay CSV** — Izvozna datoteka CSV oseb ali darov iz Church Community Builder ali Pushpay.

Datoteko lahko povlečete in spustite v območje za nalaganje ali kliknete in poiščete datoteko na računalniku.

---

## 1b. korak - Preslikajte polja (samo za Custom CSV / Excel)

Če ste izbrali **Custom CSV / Excel**, vam bo orodje po nalaganju datoteke prikazalo zaslon za preslikavo polj, preden preide na predogled.

Vsak stolpec vaše datoteke je naveden skupaj z vzorčno vrednostjo. Za vsak stolpec v spustnem meniju izberite ustrezno polje B1. Orodje bo samodejno prepoznalo pogosta imena stolpcev, kot so „First Name“, „Email“ ali „Zip Code“, vendar morate pregledati vsako vrstico in popraviti vse, kar je orodje spregledalo.

Razpoložljiva polja B1 vključujejo:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix (ime, priimek, srednje ime, vzdevek, prikazno ime, naziv/predpona, pripona)
- Email, Home Phone, Mobile Phone, Work Phone (e-pošta, domači telefon, mobilni telefon, službeni telefon)
- Address Line 1, Address Line 2, City, State, Zip Code (naslov 1, naslov 2, mesto, regija, poštna številka)
- Birth Date, Anniversary, Gender, Marital Status, Membership Status (datum rojstva, obletnica, spol, zakonski stan, status članstva)
- Household/Family Name (ime gospodinjstva/družine)
- Group Name — osebo dodeli skupini po imenu
- **Custom Field (match by name)** — shrani stolpec v eno od [polj za osebe po meri](../settings/custom-fields.md) vaše cerkve. Pojavi se polje **B1 field name**, v katero je vpisana glava stolpca. Spremenite ga v ime polja, točno tako, kot je zapisano v B1 (velikost črk ni pomembna).
- **Form Answer (custom field)** — shrani vrednost tega stolpca kot polje po meri, pripeto k zapisu osebe. Če uporabite to možnost, vas bo orodje prosilo, da obrazcu dodelite ime.

Datumi so lahko v običajnih oblikah, kot je `9/17/1994`, in se samodejno pretvorijo. Pri poljih po meri polja Da/Ne sprejemajo vrednosti, kot so Yes, No, Y, N, True, False, 1 in 0, polja z več izbirami pa sprejmejo bodisi besedilo izbire bodisi njeno vrednost.

:::info
Polja za osebe po meri ustvarite v B1 Admin, preden začnete uvoz. Ko se uvoz konča, korak **Custom Fields** navede vse imena stolpcev, ki se ne ujemajo s poljem B1, in prešteje vrednosti, ki ne ustrezajo vrsti polja. Te vrednosti se preskočijo, preostali del uvoza pa se vseeno dokonča.
:::

Stolpce, ki jih ne želite uvoziti, lahko nastavite na **(Skip)**. Preden lahko nadaljujete, morate preslikati vsaj eno polje za ime (First Name ali Last Name).

Kliknite **Confirm Mapping & Import**, da nadaljujete na predogled.

---

## 2. korak - Predogled podatkov

Po nalaganju orodje prikaže predogled vsega, kar bo uvoženo. Z zavihki si oglejte vsako vrsto podatkov:

- **People** — Razvrščeno po gospodinjstvih, s fotografijami, če so vključene.
- **Groups** — Razvrščeno po kampusu, bogoslužju, času in kategoriji.
- **Attendance** — Datumi sej, skupine in števila obiskov.
- **Donations** — Serije, skladi, darovalci in zneski.
- **Forms** — Imena obrazcev in vrste vsebine.

Pred nadaljevanjem to natančno preglejte. Če se vam zdi karkoli narobe, kliknite **Start Over** in popravite izvorno datoteko.

---

## 3. korak - Izberite cilj

Izberite, kam želite, da gredo podatki:

- **B1 Database** — Uvozi neposredno v bazo podatkov vaše cerkve. Po izbiri te možnosti orodje prikaže končno število zapisov, ki bodo dodani. Za potrditev kliknite **Start Transfer**.
- **B1 Export Zip** — Prenese vaše podatke kot datoteko zip v formatu B1, ki jo lahko kasneje obnovite z **B1 Import Zip**. Dobro za varnostne kopije.
- **Breeze Export Zip** — Pretvori vaše podatke v format Breeze.
- **Planning Center Zip** — Pretvori vaše podatke v format Planning Center.

:::warning
Vir in cilj ne smeta biti v istem formatu. Če se ujemata, vas orodje opozori, da preprečite nenamerno podvajanje.
:::

---

## 4. korak - Zagon

Orodje obdela prenos in prikaže napredek za vsak korak:

- Kampusi, bogoslužja in časi
- Osebe
- Fotografije
- Skupine in člani skupin
- Darovi
- Obiski
- Obrazci, vprašanja, odgovori in oddaje obrazcev
- Polja po meri (če ste preslikali kakršne koli stolpce Custom Field)
- Stiskanje (samo za cilje v obliki datotek zip)

Kadar je cilj **B1 Database**, se kartica napredka imenuje **Import Progress** in se konča s sporočilom **Import Complete!** (ali **Import Completed with Errors**). Pri ciljih v obliki datotek zip imajo ista sporočila besedo **Export**.

:::info
Pri obnovitvi **B1 Import Zip** se zapisi, ki kažejo na nekaj, kar v datoteki ni več prisotno, preskočijo in uvoz se ne ustavi. To velja za članstva v skupinah oseb ali skupin, ki niso v datoteki zip, za obiske izbrisanih skupin ali oseb ter za povezave med skupinami in izbrisanimi časi bogoslužij. Seje obiskov, ki niso bile nikoli povezane s časom bogoslužja, se še vedno obnovijo. Prav tako se pri izvozu fotografija, ki je ni mogoče prenesti ali prebrati, izpusti, da korak **Photos** lahko nadaljuje.
:::

:::warning
Med izvajanjem prenosa ne zapirajte brskalnika. Počakajte, da vsi koraki prikažejo, da so zaključeni.
:::

---

## Priprava datoteke zip za uvoz iz Breeze

1. V Breeze pojdite v **Settings** in v levi stranski vrstici kliknite **Export**.
2. Izvozite tri ločene datoteke: **People**, **Tags** in **Contributions**.
3. Izberite vse tri datoteke, kliknite z desnim gumbom in jih stisnite v eno datoteko zip.
   - Na Macu: izberite datoteke, kliknite z desnim gumbom in izberite **Compress**.
   - Na računalniku PC: izberite datoteke, kliknite z desnim gumbom, izberite **Send to**, nato **Compressed (zipped) folder**.
4. Datoteko zip naložite z možnostjo **Breeze Import Zip** v 1. koraku.

Uvoz iz Breeze samodejno prenese osebe, skupine (oznake) in zapise o darovih.

---

## Priprava izvoza iz Planning Center

1. Prijavite se v Planning Center in odprite izdelek **People**.
2. V levi stranski vrstici kliknite **Lists** in ustvarite seznam, ki vključuje vse, ki jih želite prenesti. (Če že imate seznam vse svoje občine, uporabite tega.)
3. Odprite seznam in z možnostjo **export** prenesite osebe v datoteko **CSV**. Vključite polja, ki jih želite ohraniti – ime, e-pošto, telefon, naslov, datum rojstva, spol in status članstva se vse preslikajo v B1.
4. Če vam Planning Center da več datotek, jih izberite vse, kliknite z desnim gumbom in jih stisnite v eno datoteko zip.
   - Na Macu: izberite datoteke, kliknite z desnim gumbom in izberite **Compress**.
   - Na računalniku PC: izberite datoteke, kliknite z desnim gumbom, izberite **Send to**, nato **Compressed (zipped) folder**.
5. Datoteko CSV ali zip naložite z možnostjo **Planning Center Zip** v 1. koraku.

Po nalaganju nadaljujte na predogled in preverite, ali so vaše osebe in gospodinjstva pravilno prikazani, preden zaženete uvoz.

---

## Priprava izvoza iz Tithe.ly

1. V Tithe.ly izvozite podatke o **People** kot datoteko CSV ali Excel. Če želite uvoziti zapise o darovih, lahko izvozite tudi ločeno datoteko **Giving**.
2. Orodje bo na podlagi imen stolpcev samodejno zaznalo, ali datoteka vsebuje podatke o osebah ali darovih.
3. Datoteko naložite z možnostjo **Tithe.ly CSV** v 1. koraku.

:::info
Izvoze iz Tithe.ly lahko uvažate eno datoteko naenkrat. Če želite ločeno uvoziti osebe in darove, postopek ponovite dvakrat.
:::

---

## Priprava izvoza iz CCB ali Pushpay

1. V Church Community Builder ali Pushpay izvozite podatke o **People** kot datoteko CSV. Lahko izvozite tudi ločeno datoteko z darovi oz. prispevki.
2. Orodje bo na podlagi imen stolpcev samodejno zaznalo, ali datoteka vsebuje podatke o osebah ali darovih.
3. Datoteko naložite z možnostjo **CCB / Pushpay CSV** v 1. koraku.

---

## Po uvozu

Ko je prenos končan, si vzemite nekaj minut za preverjanje podatkov:

1. Odprite stran [People](../people/adding-people.md) in preglejte nekaj profilov.
2. Preverite, ali so imena, e-poštni naslovi, telefonske številke in naslovi pravilno uvoženi.
3. Preverite, ali so povezave v gospodinjstvih ohranjene. Vloga posamezne osebe v gospodinjstvu (Head, Spouse, Child ali Other) se prenese, če jo vir vsebuje: stolpec **householdRole** v datoteki B1 Import Zip, **Family Role** v Breeze ali Tithe.ly ter **Family Position** v CCB / Pushpay. Vloge, kot so „Head of Household“, „Primary“, „Wife“ ali „Son“, se pretvorijo v ustrezno vlogo v B1. Uvozi iz Planning Center ter iz Custom CSV / Excel nimajo stolpca za vloge, zato so te osebe nastavljene na **Other**. Vlogo lahko spremenite v gospodinjstvu osebe na strani [People](../people/adding-people.md#managing-households).
4. Preglejte uvožene skupine in zapise o darovih.

Če opazite težave, lahko posamezne profile uredite na strani People. Orodje za prenos lahko tudi znova zaženete, da [izvozite svoje podatke](exporting-data.md) kot varnostno kopijo.
