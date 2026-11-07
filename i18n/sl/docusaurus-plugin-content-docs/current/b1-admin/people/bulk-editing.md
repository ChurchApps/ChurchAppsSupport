---
title: "Množično urejanje oseb"
description: "Hkrati posodobite status članstva, zakonski stan, spol, odjavo, polja Da/Ne ali članstvo v skupinah za veliko oseb v B1 Admin."
---

# Množično urejanje oseb

<div class="article-intro">
Množično urejanje omogoča hkratno posodobitev več oseb, kar prihrani čas, ko želite isto spremembo uveljaviti za veliko posameznikov. V eni operaciji lahko posodobite stanje članstva, zakonski stan, spol, nastavitve odjave in članstvo v skupinah.
</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje za upravljanje podatkov o osebah. Podrobnosti najdete v razdelku [Vloge in dovoljenja](./roles-permissions.md).
- Osebe, ki jih želite urediti, morate že dodati ali uvoziti. Po potrebi glejte [Dodajanje oseb](./adding-people.md).
</div>

## Izbira oseb za množično urejanje

1. V programu B1 Admin pojdite na **People** (Osebe).
2. Z iskalnimi ali filtrirnimi orodji poiščite osebe, ki jih želite posodobiti.
3. Označite polja za izbor oseb.
   - V pogledu **Households** (Gospodinjstva) označitev gospodinjstva izbere vse njegove člane.
   - V pogledu **Table** (Tabela), ki ga preklopite s stikalom **View as** (Prikaži kot), lahko izbirate posamezne osebe.
   - Lahko pa s potrditvenim poljem nad seznamom izberete vse trenutno vidne osebe.
4. Ko izberete vsaj eno osebo, se nad seznamom prikaže vrstica s številom izbranih oseb ter gumba **Clear Selection** (Počisti izbor) in **Actions** (Dejanja).

:::tip
Če morate posodobiti veliko skupino oseb na podlagi določenih meril, uporabite funkcijo [AI iskanje](./ai-search.md) ali filtre, da najprej zožite seznam, nato pa izberite vse ustrezne osebe.
:::

## Razpoložljiva množična dejanja

Meni **Actions** (Dejanja) ponuja več možnosti:

### Posodobitev stanja članstva

Posodobite stanje članstva za vse izbrane osebe:

1. Kliknite **Actions** (Dejanja) → **Set Membership Status** (Nastavi stanje članstva).
2. Izberite novo stanje:
   - **Visitor** (Obiskovalec) -- Osebe, ki prvič ali občasno obiskujejo cerkev.
   - **Guest** (Gost) -- Gostje, na primer družine, prijavljene na prijavnem kiosku.
   - **Regular Attendee** (Redni obiskovalec) -- Pogosti obiskovalci, ki niso člani.
   - **Member** (Član) -- Uradni člani cerkve.
   - **Staff** (Osebje) -- Zaposleni v cerkvi.
   - **Inactive** (Neaktiven) -- Osebe, ki cerkve več ne obiskujejo.
   - **Deceased** (Preminul) -- Osebe, ki so umrle.
3. Izberite način posodobitve:
   - **Overwrite all** (Prepiši vse) -- Trenutno stanje nadomestite pri vseh izbranih osebah.
   - **Only update empty** (Posodobi samo prazne) -- Stanje nastavite samo osebam, ki ga nimajo.
4. Kliknite **Update** (Posodobi).

### Posodobitev zakonskega stanu

Množično posodobite zakonski stan:

1. Kliknite **Actions** (Dejanja) → **Set Marital Status** (Nastavi zakonski stan).
2. Izberite novo stanje:
   - **Unknown** (Neznano)
   - **Single** (Samski)
   - **Married** (Poročen)
   - **Divorced** (Ločen)
   - **Widowed** (Vdovec ali vdova)
3. Izberite, ali želite prepisati obstoječe vrednosti ali posodobiti samo prazna polja.
4. Kliknite **Update** (Posodobi).

### Posodobitev spola

Posodobite podatke o spolu za več oseb:

1. Kliknite **Actions** (Dejanja) → **Set Gender** (Nastavi spol).
2. Izberite vrednost:
   - **Unspecified** (Nedoločen)
   - **Male** (Moški)
   - **Female** (Ženski)
3. Izberite način posodobitve (prepiši vse ali samo prazna polja).
4. Kliknite **Update** (Posodobi).

### Posodobitev nastavitve odjave

Nadzorujte, ali so se osebe odjavile od sporočil:

1. Kliknite **Actions** (Dejanja) → **Set Directory Opt-Out** (Nastavi odjavo iz imenika).
2. Izberite:
   - **No** (Ne) -- Dovoli sporočila (odstrani odjavo).
   - **Yes** (Da) -- Onemogoči sporočila (nastavi odjavo).
3. Izberite način posodobitve.
4. Kliknite **Update** (Posodobi).

:::warning
Bodite previdni pri spreminjanju nastavitve odjave. Osebe, ki so se izrecno odjavile, ne bi smele prejemati sporočil, razen če so ponovno dale soglasje.
:::

### Nastavitev polja po meri

Za vse izbrane osebe hkrati nastavite vrednost polja po meri [Da/Ne](../settings/custom-fields.md):

1. Kliknite **Actions** (Dejanja) → **Set Custom Field** (Nastavi polje po meri).
2. Izberite polje po meri vrste Da/Ne, ki ga želite nastaviti.
3. Izberite vrednost (**Yes** (Da) ali **No** (Ne)), ki jo želite uveljaviti.
4. Kliknite **Update** (Posodobi).

:::info
Za to množično dejanje so na voljo samo polja po meri vrste Da/Ne. Za nastavitev drugih vrst polj uredite posamezno osebo.
:::

### Dodajanje v skupino

Vse izbrane osebe dodajte v eno ali več skupin:

1. Kliknite **Actions** (Dejanja) → **Add to Group** (Dodaj v skupino).
2. Poiščite in izberite skupino oziroma skupine, v katere želite dodati osebe.
3. Izberete lahko več skupin, nato pa bodo osebe dodane v vse izbrane skupine.
4. Kliknite **Add to Groups** (Dodaj v skupine).

Vsaka oseba bo dodana kot navaden član izbrane skupine. Pozneje lahko posameznike po potrebi imenujete za vodje skupine na strani [Člani skupine](../groups/group-members.md).

### Odstranitev iz skupine

Vse izbrane osebe odstranite iz ene ali več skupin:

1. Kliknite **Actions** (Dejanja) → **Remove from Group** (Odstrani iz skupine).
2. Poiščite in izberite skupino oziroma skupine, iz katerih želite odstraniti osebe.
3. Izberete lahko več skupin.
4. Kliknite **Remove from Groups** (Odstrani iz skupin).

:::info
To dejanje osebe odstrani samo iz navedenih skupin. Njihovih evidenc oseb ne izbriše.
:::

### Brisanje oseb

Izbrane osebe trajno izbrišite iz baze podatkov cerkve:

1. Kliknite **Actions** (Dejanja) → **Delete** (Izbriši).
2. Pogovorno okno **Delete Selected People** (Izbriši izbrane osebe) vas prosi, da potrdite, koliko oseb bo izbrisanih.
3. Kliknite **Delete** (Izbriši).

:::danger
Brisanje oseb je trajno in ga ni mogoče razveljaviti. Tako bodo odstranjeni vsi njihovi podatki, vključno z:
- osebnimi podatki,
- članstvom v skupinah,
- evidencami obiskov,
- zgodovino donacij,
- oddanimi obrazci.

To dejanje uporabite samo, če ste popolnoma prepričani, da želite te osebe odstraniti iz sistema.
:::

## Rezultati množičnega urejanja

Po končanem množičnem dejanju se prikaže povzetek, ki vključuje:

- **Total selected** (Skupaj izbranih) -- Koliko oseb je bilo vključenih v operacijo.
- **Successfully updated** (Uspešno posodobljeno) -- Koliko zapisov je bilo spremenjenih.
- **Failed** (Neuspešno) -- Zapisi, ki jih ni bilo mogoče posodobiti (če je to primerno).
- **Unchanged** (Nespremenjeno) -- Zapisi, ki niso potrebovali sprememb (na primer pri načinu »only update empty«).

Če posodobitve niso bile uspešne, se prikažejo podrobnosti o napakah s pojasnilom vzroka.

## Priporočene prakse

- **Začnite z majhnim obsegom** -- Najprej preizkusite množična dejanja na nekaj zapisih, da se prepričate, da spreminjate prave podatke.
- **Uporabljajte filtre** -- Pred izbiro oseb zožite seznam s filtri ali AI iskanjem, da posodabljate samo prave osebe.
- **Dvakrat preverite izbor** -- Pred uveljavitvijo množičnih sprememb preglejte izbrane osebe.
- **Uporabljajte način »only update empty«** -- Kadar želite dopolniti manjkajoče podatke, ne da bi prepisali obstoječe.
- **Dokumentirajte večje spremembe** -- Hranite zapiske o množičnih posodobitvah, da jih boste lahko pozneje preverili.
- **Usklajujte se s sodelavci** -- Obvestite druge skrbnike, kadar nameravate izvesti obsežne množične spremembe.

## Pogosti primeri uporabe

### Posodobitev novih članov

Po tečaju za člane vsem udeležencem posodobite stanje na Member (Član):

1. Poiščite osebe, ki so se udeležile tečaja.
2. Izberite jih vse.
3. Uporabite **Actions** (Dejanja) → **Set Membership Status** (Nastavi stanje članstva) → **Member** (Član).

### Organizacija malih skupin

Dodajte več oseb v novo malo skupino:

1. Poiščite osebe, ki jih želite vključiti v skupino.
2. Izberite jih.
3. Uporabite **Actions** (Dejanja) → **Add to Group** (Dodaj v skupino) in izberite malo skupino.

### Čiščenje podatkov

Dopolnite manjkajoči zakonski stan za poročene pare:

1. Filtrirajte osebe, ki so poročene (z uporabo podatkov o gospodinjstvu).
2. Izberite tiste, ki nimajo vpisanega zakonskega stanu.
3. Uporabite **Actions** (Dejanja) → **Set Marital Status** (Nastavi zakonski stan) → **Married** (Poročen) → **Only update empty** (Posodobi samo prazne).

## Sorodni članki

- [Iskanje oseb](./searching-people.md) -- Poiščite osebe za urejanje.
- [AI iskanje](./ai-search.md) -- Z naravnim jezikom poiščite določene skupine oseb.
- [Člani skupine](../groups/group-members.md) -- Upravljanje članstva v skupinah.
- [Izvoz podatkov](./exporting-data.md) -- Izvozite podatke o osebah pred množičnimi spremembami.
