---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Če vaša cerkev sprejema darila prek Donorboxa, osebe in izpiske pa vodi v B1, lahko Donorboxovi takojšnji sprožilci Zapiera ustvarijo ustrezne zapise o darilih v B1 in, če donator še ne obstaja, ustvarijo tudi novo osebo v B1. Ni ročnega usklajevanja in ni mesečnega izvoza.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun [Donorbox](https://donorbox.org) z vsaj eno kampanjo
- Račun [Zapier](https://zapier.com)
- Uporabnik B1Admin s pravico **Edit Settings**

</div>

## Kaj lahko povežete

| Smer | Sprožilec v Donorboxu | Dejanje v B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instant) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (recurring) | Find Person → Add Donation (use Plan id as note) |

Donorbox svoje sprožilce objavlja kot **takojšnje**, zato se sprožijo v nekaj sekundah po pravem darilu. Ni zamika zaradi poizvedovanja.

## Namestitev

### 1. Ustvarite ključ API za B1

V B1Admin: **Settings → Developer → API Keys → New API Key**. Območja (scopes):

- `people:read` za iskanje donatorja po e-pošti
- `people:write` za ustvarjanje, če je donator nov
- `donations:write` za beleženje darila

Sprožilci v tej smeri so Donorboxovi, ne B1, zato tu ne potrebujete `settings:write`.

### 2. Ustvarite Zap za »beleženje darila«

1. **Sprožilec**: Donorbox: New Donation. Povežite z Donorboxovim ključem API (v Donorboxu: *Account → Profile → API Settings*).
2. **Dejanje**: B1.church: Find Person. Donatorjev e-poštni naslov iz sprožilca povežite s poljem za iskanje *Email*.
3. **Dejanje**: Filter by Zapier (neobvezno): nadaljujte le, če donator ni bil najden, nato …
4. **Dejanje**: B1.church: Create Person. Povežite ime, priimek in e-pošto, da donator postane član, ne le zapis o darilu.
5. **Dejanje**: B1.church: Add Donation. Povežite:
   - Znesek → `data.amount`
   - Datum darila → datum darila iz sprožilca
   - Sklad → izberite sklad v B1, ki ustreza kampanji v Donorboxu (Zapier vam omogoča menjavo skladov na podlagi filtra ali koraka Formatter)
   - Način → »Online«
   - Opombe → ID transakcije v Donorboxu (uporabno pri usklajevanju)

Zap vklopite. Naslednje pravo darilo prek Donorboxa se samodejno prikaže v **B1Admin → Donations**.

## Pogosti recepti

### En Zap za vsak sklad

Če imate več kampanj v Donorboxu, ki ustrezajo ločenim skladom v B1, je najpreprosteje ustvariti en Zap za vsako kampanjo s filtrom *campaign* iz Donorboxa na vrhu. Tako je preslikava skladov fiksna in korak iskanja odpade.

### Obravnavajte posodobljena darila kot popravke

Sprožilec *New or Updated Donation* v Donorboxu se sproži tudi ob urejanju. Z korakom Zapier *Path* na `event_type` razvejite tok: »new« → Add Donation, »updated« → Find Donation + Update. Opomba: aplikacija B1 za Zapier trenutno nima dejanja Update Donation, zato za zdaj dogodke »updated« zabeležite v kanal Slack za ročni pregled.

### Sinhronizirajte spremembe ponavljajočih se načrtov v kanal Slack

- **Sprožilec**: Donorbox: New or Updated Plan
- **Dejanje**: Slack: Send Message v `#donations` (npr. »Načrt spremenjen: Sarahino mesečno darilo je zdaj 200 $«)

## Omejitve in opombe

- **Donatorje ujemajte po e-pošti.** Donorbox ne deli ID-ja osebe iz B1; edini trajni povezovalni ključ je e-pošta. Donatorji, ki dajejo z drugim e-poštnim naslovom, bodo ustvarili novo osebo v B1, zato naj jih mesečno usklajevanje poišče.
- **Vračila niso posebej prikazana.** Donorbox pošlje posodobitev statusa za isto darilo. Aplikacija B1 za Zapier trenutno nima dejanja *Update Donation*, zato je za zdaj zanesljiv način, da vračila zabeležite zunaj sistema in darilo ročno prilagodite.
- **Najprej preizkusite v peskovniku Donorboxa**, da se v produkcijskem B1 ne ustvarijo lažna darila. Donorbox ponuja poverilnice za testni način, ločene od pravih.

## Odpravljanje težav

- **Opozorilo »Person not found« ob vsakem zagonu**: to je v redu, če so koraki urejeni tako, da se *Create Person* izvede v veji, kjer oseba ni najdena. Če se korak Create Person sploh ne izvede, preverite, ali ima ključ API pravico `people:write`.
- **Znesek darila je 100-krat prevelik ali premajhen**: Donorbox v nekaterih različicah podatkov pošilja cente, v drugih pa dolarje. Če je potrebno, uporabite korak *Formatter by Zapier — Numbers* in delite s 100.
- **Podvojena darila iz enega darila**: Donorbox sproži tako *New Donation* kot *Updated Donation*. Filtrirajte na `event_type = "donation.succeeded"` ali ustvarite dva Zapa z neprekrivajočimi se filtri.

## Glejte tudi

- [Zapier (pregled)](../zapier): stran B1 pri vsakem receptu za Zapier
- [Subsplash](./subsplash): druga platforma za darila z aplikacijo za Zapier
- [Mailchimp](./mailchimp): povežite »novo darilo« z oznako v e-pošti
